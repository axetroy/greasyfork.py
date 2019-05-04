// ==UserScript==
// @name        tree view for qwerty
// @name:ja     くわツリービュー
// @namespace   strangeworld
// @description あやしいわーるど＠みさおの投稿をツリーで表示できます。スタック表示の方にもいくつか機能を追加できます。
// @match       http://misao.on.arena.ne.jp/cgi-bin/bbs.cgi*
// @match       http://misao.mixh.jp/cgi-bin/bbs.cgi*
// @match       http://usamin.elpod.org/cgi-bin/swlog.cgi?b=*&s=*
// @grant       GM_setValue
// @grant       GM.setValue
// @grant       GM_getValue
// @grant       GM.getValue
// @grant       GM_deleteValue
// @grant       GM.deleteValue
// @grant       GM_listValues
// @grant       GM.listValues
// @grant       GM_xmlhttpRequest
// @grant       GM.xmlHttpRequest
// @grant       GM_openInTab
// @grant       GM.openInTab
// @grant       window.close
// @version     10.15
// @run-at      document-start
// @connect     misao.on.arena.ne.jp
// @connect     misao.mixh.jp
// ==/UserScript==
// zousan - A Lightning Fast, Yet Very Small Promise A+ Compliant Implementation
// https://github.com/bluejava/zousan
// Author: Glenn Crownover <glenn@bluejava.com> (http://www.bluejava.com)
// Version 2.3.3
// License: MIT

/* jshint asi: true, browser: true */
/* global setImmediate, console */

(function(global){

		"use strict";

		var
			STATE_PENDING,					// These are the three possible states (PENDING remains undefined - as intended)
			STATE_FULFILLED = "fulfilled",		// a promise can be in.  The state is stored
			STATE_REJECTED = "rejected",		// in this.state as read-only

			_undefined,						// let the obfiscator compress these down
			_undefinedString = "undefined";		// by assigning them to variables (debatable "optimization")

		// See http://www.bluejava.com/4NS/Speed-up-your-Websites-with-a-Faster-setTimeout-using-soon
		// This is a very fast "asynchronous" flow control - i.e. it yields the thread and executes later,
		// but not much later. It is far faster and lighter than using setTimeout(fn,0) for yielding threads.
		// Its also faster than other setImmediate shims, as it uses Mutation Observer and "mainlines" successive
		// calls internally.
		// WARNING: This does not yield to the browser UI loop, so by using this repeatedly
		// 		you can starve the UI and be unresponsive to the user.
		// This is an even FASTER version of https://gist.github.com/bluejava/9b9542d1da2a164d0456 that gives up
		// passing context and arguments, in exchange for a 25x speed increase. (Use anon function to pass context/args)
		var soon = (function() {

				var	fq = [], // function queue;
					fqStart = 0, // avoid using shift() by maintaining a start pointer - and remove items in chunks of 1024 (bufferSize)
					bufferSize = 1024

				function callQueue()
				{
					while(fq.length - fqStart) // this approach allows new yields to pile on during the execution of these
					{
						try { fq[fqStart]() } // no context or args..
						catch(err) { if(global.console) global.console.error(err) }
						fq[fqStart++] = _undefined	// increase start pointer and dereference function just called
						if(fqStart == bufferSize)
						{
							fq.splice(0,bufferSize);
							fqStart = 0;
						}
					}
				}

				// run the callQueue function asyncrhonously, as fast as possible
				var cqYield = (function() {

						// This is the fastest way browsers have to yield processing
						if(typeof MutationObserver !== _undefinedString)
						{
							// first, create a div not attached to DOM to "observe"
							var dd = document.createElement("div");
							var mo = new MutationObserver(callQueue);
							mo.observe(dd, { attributes: true });

							return function() { dd.setAttribute("a",0); } // trigger callback to
						}

						// if No MutationObserver - this is the next best thing - handles Node and MSIE
						if(typeof setImmediate !== _undefinedString)
							return function() { setImmediate(callQueue) }

						// final fallback - shouldn't be used for much except very old browsers
						return function() { setTimeout(callQueue,0) }
					})();

				// this is the function that will be assigned to soon
				// it takes the function to call and examines all arguments
				return function(fn) {

						// push the function and any remaining arguments along with context
						fq.push(fn);

						if((fq.length - fqStart) == 1) // upon adding our first entry, kick off the callback
							cqYield();
					};

			})();

		// -------- BEGIN our main "class" definition here -------------

		function Zousan(func)
		{
			//  this.state = STATE_PENDING;	// Inital state (PENDING is undefined, so no need to actually have this assignment)
			//this.c = [];			// clients added while pending.   <Since 1.0.2 this is lazy instantiation>

			// If a function was specified, call it back with the resolve/reject functions bound to this context
			if(func)
			{
				var me = this;
				try
				{
				func(
					function(arg) { me.resolve(arg) },	// the resolve function bound to this context.
					function(arg) { me.reject(arg) })	// the reject function bound to this context
				} catch(err) { me.reject(err) }
			}
		}

		Zousan.prototype = {	// Add 6 functions to our prototype: "resolve", "reject", "then", "catch", "finally" and "timeout"

				resolve: function(value)
				{
					if(this.state !== STATE_PENDING)
						return;

					if(value === this)
						return this.reject(new TypeError("Attempt to resolve promise with self"));

					var me = this; // preserve this

					if(value && (typeof value === "function" || typeof value === "object"))
					{
						try
						{
							var first = true; // first time through?
							var then = value.then;
							if(typeof then === "function")
							{
								// and call the value.then (which is now in "then") with value as the context and the resolve/reject functions per thenable spec
								then.call(value,
									function(ra) { if(first) { first=false; me.resolve(ra);}  },
									function(rr) { if(first) { first=false; me.reject(rr); } });
								return;
							}
						}
						catch(e)
						{
							if(first)
								this.reject(e);
							return;
						}
					}

					this.state = STATE_FULFILLED;
					this.v = value;

					if(me.c)
						soon(function() {
								for(var n=0, l=me.c.length;n<l;n++)
									resolveClient(me.c[n],value);
							});
				},

				reject: function(reason)
				{
					if(this.state !== STATE_PENDING)
						return;

					this.state = STATE_REJECTED;
					this.v = reason;

					var clients = this.c;
					if(clients)
						soon(function() {
								for(var n=0, l=clients.length;n<l;n++)
									rejectClient(clients[n],reason);
							});
					else
						if(!Zousan.suppressUncaughtRejectionError && global.console)
							global.console.log("You upset Zousan. Please catch rejections: ", reason,reason ? reason.stack : null)
				},

				then: function(onF,onR)
				{
					var p = new Zousan();
					var client = {y:onF,n:onR,p:p};

					if(this.state === STATE_PENDING)
					{
						 // we are pending, so client must wait - so push client to end of this.c array (create if necessary for efficiency)
						if(this.c)
							this.c.push(client);
						else
							this.c = [client];
					}
					else // if state was NOT pending, then we can just immediately (soon) call the resolve/reject handler
					{
						var s = this.state, a = this.v;
						soon(function() { // we are not pending, so yield script and resolve/reject as needed
								if(s === STATE_FULFILLED)
									resolveClient(client,a);
								else
									rejectClient(client,a);
							});
					}

					return p;
				},

				"catch": function(cfn) { return this.then(null,cfn); }, // convenience method
				"finally": function(cfn) { return this.then(cfn,cfn); }, // convenience method

				// new for 1.2  - this returns a new promise that times out if original promise does not resolve/reject before the time specified.
				// Note: this has no effect on the original promise - which may still resolve/reject at a later time.
				"timeout" : function(ms,timeoutMsg)
				{
					timeoutMsg = timeoutMsg || "Timeout"
					var me = this;
					return new Zousan(function(resolve,reject) {

							setTimeout(function() {
									reject(Error(timeoutMsg));	// This will fail silently if promise already resolved or rejected
								}, ms);

							me.then(function(v) { resolve(v) },		// This will fail silently if promise already timed out
									function(er) { reject(er) });		// This will fail silently if promise already timed out

						})
				}

			}; // END of prototype function list

		function resolveClient(c,arg)
		{
			if(typeof c.y === "function")
			{
				try {
						var yret = c.y.call(_undefined,arg);
						c.p.resolve(yret);
					}
				catch(err) { c.p.reject(err) }
			}
			else
				c.p.resolve(arg); // pass this along...
		}

		function rejectClient(c,reason)
		{
			if(typeof c.n === "function")
			{
				try
				{
					var yret = c.n.call(_undefined,reason);
					c.p.resolve(yret);
				}
				catch(err) { c.p.reject(err) }
			}
			else
				c.p.reject(reason); // pass this along...
		}

		// "Class" functions follow (utility functions that live on the Zousan function object itself)

		Zousan.resolve = function(val) { var z = new Zousan(); z.resolve(val); return z; }

		Zousan.reject = function(err) { var z = new Zousan(); z.reject(err); return z; }

		Zousan.all = function(pa)
		{
			var results = [ ], rc = 0, retP = new Zousan(); // results and resolved count

			function rp(p,i)
			{
				if(!p || typeof p.then !== "function")
					p = Zousan.resolve(p);
				p.then(
						function(yv) { results[i] = yv; rc++; if(rc == pa.length) retP.resolve(results); },
						function(nv) { retP.reject(nv); }
					);
			}

			for(var x=0;x<pa.length;x++)
				rp(pa[x],x);

			// For zero length arrays, resolve immediately
			if(!pa.length)
				retP.resolve(results);

			return retP;
		}

		// If this appears to be a commonJS environment, assign Zousan as the module export
		if(typeof module != _undefinedString && module.exports)		// jshint ignore:line
			module.exports = Zousan;	// jshint ignore:line

		// If this appears to be an AMD environment, define Zousan as the module export
		if(global.define && global.define.amd)
			global.define([], function() { return Zousan });

		// Make Zousan a global variable in all environments
		global.Zousan = Zousan;

		// make soon accessable from Zousan
		Zousan.soon = soon;

	})(typeof global != "undefined" ? global : this);	// jshint ignore:line
(function () {
	'use strict';

	if (!window.Promise && typeof it == "undefined") {
		window.Promise = window.Zousan;

		if (!Promise.race) {
			Promise.race = function(promises) {
				return new Promise(function(resolve, reject) {
					promises.forEach(function(promise) {
						promise = promise.then ? promise : Promise.resolve(promise);
						promise.then(resolve).catch(reject);
					});
				})
			};
		}
	}

	if (!Object.assign) {
		Object.assign = function assign(target, _source) {
			var arguments$1 = arguments;

			for (var index = 1, key, src; index < arguments.length; ++index) {
				src = arguments$1[index];

				for (key in src) {
					if (Object.prototype.hasOwnProperty.call(src, key)) {
						target[key] = src[key];
					}
				}
			}

			return target
		};
	}

	if (!Object.values) {
		Object.values = function values(object) {
			var values = [];

			for (var key in object) {
				if (Object.prototype.hasOwnProperty.call(object, key)) {
					values.push(object[key]);
				}
			}

			return values
		};
	}

	if (!String.prototype.startsWith) {
		String.prototype.startsWith = function(start) {
			return this.lastIndexOf(start, 0) === 0
		};
	}
	if (!String.prototype.endsWith) {
		Object.defineProperty(String.prototype, "endsWith", {
			value: function(searchString, position) {
				var subjectString = this.toString();
				if (position === undefined || position > subjectString.length) {
					position = subjectString.length;
				}
				position -= searchString.length;
				var lastIndex = subjectString.indexOf(searchString, position);
				return lastIndex !== -1 && lastIndex === position
			},
		});
	}
	if (!String.prototype.includes) {
		String.prototype.includes = function() {
			return String.prototype.indexOf.apply(this, arguments) !== -1
		};
	}
	if (!String.prototype.trimRight) {
		String.prototype.trimRight = function() {
			return this.replace(/\s+$/, "")
		};
	}

	// element-closest | CC0-1.0 | github.com/jonathantneal/closest

	if (typeof Element.prototype.matches !== "function") {
		Element.prototype.matches =
			Element.prototype.msMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.oMatchesSelector ||
			function matches(selector) {
				var element = this;
				var elements = (
					element.document || element.ownerDocument
				).querySelectorAll(selector);
				var index = 0;

				while (elements[index] && elements[index] !== element) {
					++index;
				}

				return Boolean(elements[index])
			};
	}

	if (typeof Element.prototype.closest !== "function") {
		Element.prototype.closest = function closest(selector) {
			var element = this;

			while (element && element.nodeType === 1) {
				if (element.matches(selector)) {
					return element
				}

				element = element.parentNode;
			}

			return null
		};
	}

	if (typeof requestAnimationFrame !== "function") {
		window.requestAnimationFrame = function(callback) {
			setTimeout(callback, 16);
		};
	}

	if (!Array.prototype.find) {
		Array.prototype.find = function(predicate) {
			var found;
			this.some(function(value) {
				if (predicate(value)) {
					found = value;
					return true
				}
				return false
			});

			return found
		};
	}

	function NG(config) {
		var word = config.NGWord;
		var handle = config.NGHandle;
		var isInvalid = "";

		if (config.useNG) {
			if (handle) {
				try {
					this.handle = new RegExp(handle);
					this.handleg = new RegExp(handle, "g");
				} catch (e) {
					isInvalid += "NGワード(ハンドル)が不正です。";
				}
			}
			if (word) {
				try {
					this.word = new RegExp(word);
					this.wordg = new RegExp(word, "g");
				} catch (e) {
					isInvalid += "NGワード(本文)が不正です。";
				}
			}
		}

		this.message = isInvalid
			? ("<span>" + isInvalid + "NGワードを適用しませんでした</span>")
			: "";
		this.isEnabled = !!(this.word || this.handle);
	}

	var IS_FIREFOX = typeof InstallTrigger !== "undefined";
	var IS_GM = typeof GM_setValue === "function";
	var IS_GM4 = typeof GM !== "undefined";
	var IS_EXTENSION = !IS_GM && !IS_GM4;
	var IS_USAMIN =
		location.hostname === "usamin.elpod.org" ||
		(location.protocol === "file:" && /usamin/.test(location.pathname));

	var GMStorage = {
		load: function() {
			return new Promise(function (resolve) {
				var config = Object.create(null);
				var keys = GM_listValues();
				var i = keys.length;
				while (i--) {
					var key = keys[i];
					var value = GM_getValue(key);
					if (value != null) {
						config[key] = JSON.parse(value);
					} else {
						GM_deleteValue(key);
					}
				}

				resolve(config);
			})
		},
		remove: function(keyOrKeys) {
			return new Promise(function (resolve) {
				var keys = Array.isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys];
				keys.forEach(function (key) { return GM_deleteValue(key); });
				resolve();
			})
		},
		set: function(key, value) {
			return new Promise(function (resolve) {
				GM_setValue(key, JSON.stringify(value));
				resolve(value);
			})
		},
		setAll: function(items) {
			var this$1 = this;

			return new Promise(function (resolve) {
				for (var key in items) {
					this$1.set(key, items[key]);
				}
				resolve();
			})
		},
		clear: function() {
			return new Promise(function (resolve) {
				GM_listValues().forEach(GM_deleteValue);
				resolve();
			})
		},
		get: function(key) {
			return new Promise(function (resolve) {
				resolve(JSON.parse(GM_getValue(key, "null")));
			})
		},
	};

	var GM4Storage = {
		load: function() {
			var this$1 = this;

			return this.storage()
				.listValues()
				.then(function (keys) { return Promise.all(keys.map(function (key) { return this$1.storage().getValue(key); })).then(
						function (values) { return values.reduce(function (config, value, i) {
								if (value != null) {
									config[keys[i]] = JSON.parse(value);
								} else {
									this$1.remove(keys[i]);
								}

								return config
							}, Object.create(null)); }
					); }
				)
		},
		remove: function(keyOrKeys) {
			var this$1 = this;

			var keys = Array.isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys];
			return Promise.all(keys.map(function (key) { return this$1.storage().deleteValue(key); }))
		},
		set: function(key, value) {
			return this.storage()
				.setValue(key, JSON.stringify(value))
				.then(function () { return key; })
		},
		setAll: function(items) {
			var promises = [];
			for (var key in items) {
				promises.push(this.set(key, items[key]));
			}
			return Promise.all(promises)
		},
		clear: function() {
			var storage = this.storage();
			return storage.listValues().then(function (keys) { return keys.forEach(storage.deleteValue); })
		},
		get: function(key) {
			return this.storage()
				.getValue(key, "null")
				.then(JSON.parse)
		},
		storage: function() {
			return GM
		},
	};

	var ChromeStorage = {
		load: function() {
			var this$1 = this;

			return new Promise(function (resolve) {
				this$1.storage().get(null, resolve);
			})
		},
		remove: function(keyOrKeys) {
			var this$1 = this;

			return new Promise(function (resolve) { return this$1.storage().remove(keyOrKeys, resolve); })
		},
		set: function(key, value) {
			var this$1 = this;

			return new Promise(function (resolve) {
				var obj;

				return this$1.storage().set(( obj = {}, obj[key] = value, obj ), resolve);
			})
		},
		setAll: function(items) {
			var this$1 = this;

			return new Promise(function (resolve) { return this$1.storage().set(items, resolve); })
		},
		clear: function() {
			var this$1 = this;

			return new Promise(function (resolve) {
				this$1.storage().clear(resolve);
			})
		},
		get: function(key) {
			var this$1 = this;

			return new Promise(function (resolve) { return this$1.storage().get(key, function (item) { return resolve(item[key]); }); }
			)
		},
		storage: function() {
			return chrome.storage.local
		},
	};

	function getStorage() {
		return IS_GM ? GMStorage : IS_GM4 ? GM4Storage : ChromeStorage
	}

	function Config(config, storage) {
		Object.assign(this, config);
		this._storage = storage;
		this.init();
	}

	Config.prototype.treeMode = "tree-mode-ascii";
	Config.prototype.toggleTreeMode = false;
	Config.prototype.thumbnail = true;
	Config.prototype.thumbnailPopup = true;
	Config.prototype.popupAny = false;
	Config.prototype.popupMaxWidth = "";
	Config.prototype.popupMaxHeight = "";
	Config.prototype.popupBestFit = true;
	Config.prototype.threadOrder = "ascending";
	Config.prototype.NGHandle = "";
	Config.prototype.NGWord = "";
	Config.prototype.useNG = true;
	Config.prototype.NGCheckMode = false;
	Config.prototype.spacingBetweenMessages = false;
	Config.prototype.useVanishThread = true;
	Config.prototype.vanishedThreadIDs = [];
	Config.prototype.autovanishThread = false;
	Config.prototype.utterlyVanishNGThread = false;
	Config.prototype.useVanishMessage = false;
	Config.prototype.vanishedMessageIDs = [];
	Config.prototype.vanishMessageAggressive = false;
	Config.prototype.utterlyVanishMessage = false;
	/** NG完全非表示。名前に反してツリーでもスタックでも使う */
	Config.prototype.utterlyVanishNGStack = false;
	Config.prototype.deleteOriginal = true;
	Config.prototype.zero = true;
	Config.prototype.accesskeyReload = "R";
	Config.prototype.accesskeyV = "";
	Config.prototype.keyboardNavigation = false;
	Config.prototype.keyboardNavigationOffsetTop = "200";
	Config.prototype.viewMode = "t";
	Config.prototype.css = "";
	Config.prototype.linkAnimation = true;
	Config.prototype.shouki = true;
	Config.prototype.closeResWindow = false;
	Config.prototype.maxLine = "";
	Config.prototype.openLinkInNewTab = false;
	Config.prototype.characterEntity = true;

	function init() {
		this.ng = new NG(this);
	}

	/**
	 * @param {"Message"|"Thread"} type
	 * @param {string|[string]} id_or_ids
	 */
	var addID = function(type, id_or_ids) {
		var this$1 = this;

		var ids = Array.isArray(id_or_ids) ? id_or_ids : [id_or_ids];
		var target = "vanished" + type + "IDs";

		this[target] = ids.concat(this[target]);

		return this._storage.get(target).then(function (IDs) {
			IDs = Array.isArray(IDs) ? IDs : [];

			ids = ids.filter(function (id) { return IDs.indexOf(id) === -1; });

			IDs = IDs.concat(ids).sort(function (l, r) { return +r - l; });

			this$1[target] = IDs;
			return this$1._storage.set(target, IDs)
		})
	};
	var removeID = function(type, id) {
		var this$1 = this;

		var target = "vanished" + type + "IDs";
		return this._storage.get(target).then(function (ids) {
			ids = Array.isArray(ids) ? ids : [];
			var index = ids.indexOf(id);
			if (index !== -1) {
				ids.splice(index, 1);
				this$1[target] = ids;
				return ids.length
					? this$1._storage.set(target, ids)
					: this$1._storage.remove(target)
			} else {
				this$1[target] = ids;
			}
		})
	};
	var clearIDs = function(type) {
		var this$1 = this;

		var target = "vanished" + type + "IDs";
		return this._storage.remove(target).then(function () {
			this$1[target] = [];
		})
	};

	/** @param {string} id */
	var addVanishedMessage = function(id) {
		return this.addID("Message", id)
	};
	var removeVanishedMessage = function(id) {
		return this.removeID("Message", id)
	};
	var clearVanishedMessageIDs = function() {
		return this.clearIDs("Message")
	};

	/** @param {string} id */
	var addVanishedThread = function(id) {
		return this.addID("Thread", id)
	};
	var removeVanishedThread = function(id) {
		return this.removeID("Thread", id)
	};
	var clearVanishedThreadIDs = function() {
		return this.clearIDs("Thread")
	};
	var clear = function() {
		var this$1 = this;

		return this._storage.clear().then(function () {
			Object.assign(this$1, Config.prototype);
		})
	};
	var update = function(items) {
		var this$1 = this;

		Object.keys(items)
			.filter(function (key) { return typeof Config.prototype[key] === "undefined"; })
			.forEach(function (key) { return delete items[key]; });

		var itemsToSet = toMinimalConfig(items, items);

		var keysToRemove = Object.keys(items).filter(
			function (key) { return items[key] === Config.prototype[key]; }
		);

		return Promise.all([
			this._storage.setAll(itemsToSet),
			this._storage.remove(keysToRemove) ]).then(function () {
			Object.assign(this$1, items);
		})
	};

	var toMinimalJson = function() {
		return JSON.stringify(toMinimalConfig(this, Config.prototype))
	};

	var toMinimalConfig = function (config, keys) { return Object.keys(keys)
			.filter(function (key) { return config[key] !== Config.prototype[key]; })
			.reduce(function (ret, key) {
				ret[key] = config[key];
				return ret
			}, {}); };

	var isTreeView = function() {
		return this.viewMode === "t"
	};

	Config.prototype.isVanishedThread = function(id) {
		return this.useVanishThread && this.vanishedThreadIDs.indexOf(id) > -1
	};

	Object.assign(Config.prototype, {
		init: init,

		addVanishedMessage: addVanishedMessage,
		removeVanishedMessage: removeVanishedMessage,
		clearVanishedMessageIDs: clearVanishedMessageIDs,
		addVanishedThread: addVanishedThread,
		removeVanishedThread: removeVanishedThread,
		clearVanishedThreadIDs: clearVanishedThreadIDs,
		clear: clear,
		update: update,
		toMinimalJson: toMinimalJson,

		isTreeView: isTreeView,

		addID: addID,
		removeID: removeID,
		clearIDs: clearIDs,
	});

	Config.load = function() {
		var storage = getStorage();
		return storage
			.load(Config.prototype)
			.then(function (config) { return new Config(config, storage); })
	};

	// スレッドを完全にするのに使う
	var BothWaysLogSearch = {
		getLogParameterName: function(query) {
			return query.get("ff")
		},
		queryFor: function(query, ff) {
			var data = query.copy();
			data.ff = ff;
			return data
		},
	};

	// 小町のlogボタン専用
	// 投稿日以降のログもファイル名で検索する
	var FutureLogSearch = {
		getLogParameterName: function(query) {
			// 小町のlogボタンから来ているから、chk\d+\.datは一つしかない
			return Object.keys(query.q).find(function (key) { return /^chk\d+\.dat$/.test(key); })
		},
		queryFor: function(query, ff) {
			var data = query.copy();
			delete data[this.getLogParameterName(query)];
			data["chk" + ff] = "checked";

			return data
		},
	};

	var Query = function Query(search, hostname) {
		if ( search === void 0 ) search = location.search;
		if ( hostname === void 0 ) hostname = location.hostname;

		this.q = typeof search === "object" ? search : Query.parse(search);
		this.hostname = hostname;
	};
	Query.parse = function parse (search) {
		var obj = {},
			kvs = search.substring(1).split("&");
		kvs.forEach(function(kv) {
			obj[kv.split("=")[0]] = kv.split("=")[1];
		});
		return obj
	};
	Query.prototype.get = function get (key) {
		return this.q[key]
	};
	Query.prototype.set = function set (key, value) {
		this.q[key] = value;
	};

	// 過去ログにレスボタン・スレッドボタンがあるか？
	// sv=on 検索ボタンを押した時。
	// e=[logname].dat 日付のリンクをクリックした時。
	Query.prototype.shouldHaveValidPosts = function shouldHaveValidPosts () {
		return this.q.sv || (this.q.e && this.hasButtonsInSingleLogSearchMode())
	};
	/** @description 過去ログの選択画面(m=g)で日付のリンクをクリックした時に表示される投稿にレスボタンはついているか。 */
	Query.prototype.hasButtonsInSingleLogSearchMode = function hasButtonsInSingleLogSearchMode () {
		return (
			this.hostname === "misao.mixh.jp" ||
			this.hostname === "misao.on.arena.ne.jp"
		)
	};

	Query.prototype.isNormalMode = function isNormalMode () {
		return !this.q.m
	};

	Query.prototype.shouldMakeUrlsSearchLog = function shouldMakeUrlsSearchLog () {
		return this.isThreadSearchWithin1000() || this.isPosterSearchInLog()
	};
	//通常モードからスレッドボタンを押した場合
	Query.prototype.isThreadSearchWithin1000 = function isThreadSearchWithin1000 () {
		return this.q.m === "t" && !this.q.ff && /^\d+$/.test(this.q.s)
	};
	//検索窓→投稿者検索→★の結果の場合
	Query.prototype.isPosterSearchInLog = function isPosterSearchInLog () {
		return this.q.s && this.q.ff && this.q.m === "s"
	};

	//ツリーでログ補完するべきか
	Query.prototype.shouldFetch = function shouldFetch () {
		return this.shouldSearchLog() || isFromKomachi()
	};
	Query.prototype.shouldSearchLog = function shouldSearchLog () {
		return (
			this.q.m === "t" && /^\d+\.dat$/.test(this.q.ff) && /^\d+$/.test(this.q.s)
		)
	};

	Query.prototype.shouldSuggestLinkToLog = function shouldSuggestLinkToLog (posts) {
		return (
			this.isThreadSearchWithin1000() &&
			posts.every(function(post) {
				return !post.isOP()
			})
		)
	};

	//スタックでログ補完するべきか
	Query.prototype.shouldComplement = function shouldComplement (body) {
		return this.shouldSearchLog() && !this.hasOP(body)
	};
	Query.prototype.selectorForOP = function selectorForOP () {
		return 'a[name="' + this.q.s + '"]'
	};
	Query.prototype.hasOP = function hasOP (body) {
		return body.querySelector(this.selectorForOP())
	};

	Query.prototype.getLogMode = function getLogMode () {
		return this.q.sv ? FutureLogSearch : BothWaysLogSearch
	};
	Query.prototype.getTargetLogNameAsNumber = function getTargetLogNameAsNumber () {
		return +this.getLogMode()
			.getLogParameterName(this)
			.match(/\d+/)[0]
	};
	Query.prototype.copy = function copy () {
		return Object.assign({}, this.q)
	};
	Query.prototype.queryFor = function queryFor (ff) {
		return this.getLogMode().queryFor(this, ff)
	};
	Query.prototype.getLogName = function getLogName () {
		return this.getTargetLogNameAsNumber() + ".dat"
	};
	Query.prototype.logIsSavedDaily = function logIsSavedDaily () {
		return String(this.getTargetLogNameAsNumber()).length === 8
	};

	function isFromKomachi(
		referrer,
		search
	) {
		if ( referrer === void 0 ) referrer = document.referrer;
		if ( search === void 0 ) search = location.search;

		return (
			/^http:\/\/misao\.(?:mixh|on\.arena\.ne)\.jp\/c\/upload\.cgi/.test(
				referrer
			) &&
			/^\?chk\d+\.dat=checked&kwd=http:\/\/misao\.(?:mixh|on\.arena\.ne)\.jp\/c\/up\/misao\d+\.\w+&s1=0&e1=0&s2=24&e2=0&ao=a&tt=a&alp=checked&btn=checked(?:&g=checked)?&m=g&k=%82%A0&sv=on$/.test(
				search
			)
		)
	}

	var Stash = function Stash() {
		var area = (this.area = document.createElement("div"));
		area.id = "qtv-stash-area";
		area.hidden = true;
	};
	Stash.prototype.stash = function stash (buffer) {
		this.area.appendChild(buffer);
	};
	Stash.prototype.restore = function restore () {
		this.area.parentNode.removeChild(this.area);

		var range = document.createRange();
		range.selectNodeContents(this.area);
		return range.extractContents()
	};
	Stash.prototype.appendTo = function appendTo (node) {
		node.appendChild(this.area);
	};

	function Buffer(range) {
		var this$1 = this;
		if ( range === void 0 ) range = document.createRange();

		var buffer = (this.buffer = document.createDocumentFragment());

		this.marker = document.createComment("qtv-main-started");
		this.view = null;

		this.onProgress = function (lastChild) {
			if (lastChild !== this$1.marker) {
				range.setEndAfter(lastChild);
				buffer.appendChild(range.extractContents());
			}

			this$1.render();
		};

		/**
		 * @param {HTMLHRElement} hr
		 */
		this.onHr = function (hr) {
			hr.parentNode.insertBefore(this$1.marker, hr.nextSibling);

			range.setStartAfter(this$1.marker);
		};

		this.onLoaded = function () {
			this$1.wasLoaded = true;

			if (this$1.view) {
				this$1.render();
				return this$1.finish()
			} else {
				return this$1.flush()
			}
		};
	}
	Buffer.prototype.setView = function(view) {
		this.view = view;

		if (this.wasLoaded) {
			return this.rewind()
		}
	};
	Buffer.prototype.rewind = function() {
		this.buffer = this.stash.restore();

		this.render();
		return this.finish()
	};
	Buffer.prototype.render = function() {
		if (this.view && "render" in this.view) {
			this.view.render(this.buffer);
		}
	};
	Buffer.prototype.finish = function() {
		return this.view.finish(this.buffer)
	};
	Buffer.prototype.flush = function() {
		if (!this.marker.parentNode) {
			return
		}

		this.stash = new Stash();
		this.stash.stash(this.buffer);
		this.stash.appendTo(this.marker.parentNode);
	};
	Buffer.prototype.insertBefore = function(node) {
		this.marker.parentNode.insertBefore(node, this.marker);
	};

	function getBody() {
		return document.body
	}

	var delayPromise = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };

	function createDelayNotice (config, timeout) {
		if ( timeout === void 0 ) timeout = 700;

		var message = "設定読込待ち";
		var configIsLoaded = false;

		config.then(function () { return (configIsLoaded = true); });

		var popup = function() {
			if (configIsLoaded) {
				return
			}

			var notice = document.createElement("aside");
			notice.id = "qtv-status";
			notice.style.cssText =
				"position:fixed;top:0px;left:0px;background-color:black;color:white;z-index:1";
			notice.textContent = message;

			var body = getBody();

			body.insertBefore(notice, body.firstChild);

			var removeNotice = function () { return body.removeChild(notice); };

			config.then(removeNotice, removeNotice);
		};

		return {
			onHr: function () { return delayPromise(timeout).then(popup); },
			onLoaded: function () {
				message = "設定読込待ちかレンダリング中";
			},
		}
	}

	function doNothing() {}

	var find = Array.prototype.find;
	var isHR = function (node) { return node.nodeName === "HR"; };

	function findHr (mutations) {
		for (var i = 0; i < mutations.length; i++) {
			var mutation = mutations[i];
			if (mutation.target.nodeName === "BODY") {
				var element = find.call(mutation.addedNodes, isHR);
				if (element) {
					return element
				}
			}
		}
	}

	function ready(ref) {
		if ( ref === void 0 ) ref = {};
		var doc = ref.doc; if ( doc === void 0 ) doc = document;
		var capture = ref.capture; if ( capture === void 0 ) capture = false;

		return new Promise(function(resolve) {
			var readyState = doc.readyState;
			if (
				readyState === "complete" ||
				(readyState !== "loading" && !doc.documentElement.doScroll)
			) {
				resolve();
			} else {
				doc.addEventListener("DOMContentLoaded", resolve, {
					capture: capture,
					once: true,
				});
			}
		})
	}

	function getInfo () { return IS_GM
			? getGMInfo(GM_info)
			: IS_GM4
			? getGMInfo(GM.info)
			: {
					platform: "chrome",
					version: chrome.runtime.getManifest().version,
			  }; }

	var getGMInfo = function (info) { return ({
		platform: info.scriptHandler + info.version,
		version: info.script.version,
	}); };

	var e;
	function handleError(error) {
		if (e) {
			return
		}

		e = error;
		return ready()
			.then(getBody)
			.then(doHandle)
	}

	function doHandle(body) {
		var lineNumber = e.lineNumber || 0;

		var pre = document.createElement("pre");
		pre.class = "qtv-error";
		pre.innerHTML =
			'くわツリービューの処理を中断しました。表示出来なかった投稿があります。<a href="javascript:;">スタックトレースを表示する</a>';

		var dStackTrace = document.createElement("p");
		dStackTrace.style.display = "none";

		var stackTrace = "qtvstacktrace/";
		var info = getInfo();
		stackTrace += info.platform + "+" + info.version + "\n";

		var stack = e.stackTrace || e.stack || "";
		stackTrace += e.name + ": " + e.stackTrace + ":" + lineNumber + "\n" + stack;

		dStackTrace.textContent = stackTrace;

		pre.appendChild(dStackTrace);
		pre.addEventListener("click", showStackTrace);

		body.insertBefore(pre, body.firstChild);

		throw e
	}
	function showStackTrace(e) {
		e.target.parentNode.querySelector("p").style.display = null;
	}

	function Observer(loaded, doc) {
		var this$1 = this;
		if ( doc === void 0 ) doc = document;

		this.listeners = [];
		this.doc = doc;

		this.hr = null;

		var cleanupAfterError = function (e) {
			this$1.observer.disconnect();
			this$1.observer.observe = doNothing;

			handleError(e);
		};

		var fireEvent = function (event, arg) {
			try {
				for (var i = 0; i < this$1.listeners.length; i++) {
					var handler = this$1.listeners[i][event];
					if (handler) {
						var ret = handler(arg);
						if (ret && ret.catch) {
							ret.catch(cleanupAfterError);
						}
					}
				}
			} catch (e) {
				cleanupAfterError(e);
			}
		};

		this.processRecords = function (mutations, observer) {
			observer.disconnect();

			if (!this$1.hr) {
				this$1.hr = findHr(mutations);

				if (this$1.hr) {
					fireEvent("onHr", this$1.hr);
				}
			}

			if (this$1.hr) {
				fireEvent("onProgress", doc.body.lastChild);
			}

			this$1.observe();
		};

		this.observer = this.makeMutationObserver(this.processRecords);

		if (doc.body) {
			this.first = function () {
				this$1.hr = doc.body.querySelector("body > hr");

				if (this$1.hr) {
					fireEvent("onHr", this$1.hr);
					fireEvent("onProgress", doc.body.lastChild);
				}

				this$1.first = null;
			};
		}
		loaded.then(function () {
			this$1.observer.observe = doNothing;
			var records = this$1.observer.takeRecords();
			if (records.length) {
				console.error(records.length);
				this$1.processRecords(records, this$1.observer);
			}
			this$1.observer.disconnect();
			fireEvent("onLoaded");
		});
	}
	Observer.prototype.observe = function() {
		if (this.doc.body) {
			if (this.first) {
				this.first();
			}

			this.observer.observe(this.doc.body, {childList: true});
		} else {
			this.observer.observe(this.doc.documentElement, {
				childList: true,
				subtree: true,
			});
		}
	};
	Observer.prototype.addListener = function(listener) {
		this.listeners.push(listener);
	};

	Observer.prototype.makeMutationObserver = function(callback) {
		return new MutationObserver(callback)
	};

	function waitForDomContentLoaded () { return ready({capture: true}); }

	function ajax(ref) {
		if ( ref === void 0 ) ref = {};
		var type = ref.type; if ( type === void 0 ) type = "GET";
		var url = ref.url; if ( url === void 0 ) url = location.href;
		var data = ref.data; if ( data === void 0 ) data = {};

		url = url.replace(/#.*$/, "");

		for (var key in data) {
			url += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
		}

		url = url.replace(/[&?]{1,2}/, "?");

		return new Promise(function(resolve, reject) {
			var xhr = new XMLHttpRequest();

			xhr.open(type, url);
			xhr.overrideMimeType("text/html; charset=windows-31j");
			xhr.onload = function() {
				if (xhr.status === 200) {
					resolve(xhr.response);
				} else {
					reject(new Error(xhr.statusText));
				}
			};
			xhr.onerror = function() {
				reject(new Error("Network Error"));
			};
			xhr.send();
		})
	}

	function fetch (options) { return ajax(options)
			.then(wrapWithDiv)
			.catch(wrapErrorWithDiv); }

	function wrapWithDiv(html) {
		var div = document.createElement("div");
		div.innerHTML = html;
		return div
	}

	function wrapErrorWithDiv(error) {
		var div = document.createElement("div");
		div.textContent = error;
		return div
	}

	var fill = function (n) { return (n < 10 ? "0" + n : String(n)); };

	function breakDate (date) { return ({
		year: fill(date.getFullYear()),
		month: fill(date.getMonth() + 1),
		date: fill(date.getDate()),
	}); }

	var AfterFetch = {
		hasOP: function() {
			return true
		},
		run: function(_contaienr) {
			var after = this.concurrent();

			return after.then(function (afters) { return ({afters: afters, befores: []}); })
		},
	};

	var BothFetch = {
		hasOP: function(container) {
			return this.q.hasOP(container)
		},
		run: function(container) {
			var after = this.concurrent();
			var before = this.sequence(container);

			return Promise.all([after, before]).then(function (ref) {
				var afters = ref[0];
				var befores = ref[1];

				return ({
				afters: afters,
				befores: befores,
			});
			})
		},
	};

	/**
	 * @param {Query}
	 * @param {number}
	 */
	function Fetch(q, now) {
		if ( now === void 0 ) now = Date.now();

		this.q = q;
		this.now = now;

		Object.assign(this, q.get("sv") ? AfterFetch : BothFetch);
	}
	Fetch.prototype.getAfterDates = function() {
		var logDate = this.q.getTargetLogNameAsNumber();
		return this.getThese7Dates().filter(function (date) { return date > logDate; })
	};
	Fetch.prototype.getBeforeDates = function() {
		var logDate = this.q.getTargetLogNameAsNumber();
		return this.getThese7Dates().filter(function (date) { return date < logDate; })
	};
	Fetch.prototype.getThese7Dates = function() {
		var dates = [];
		var back = new Date(this.now);

		if (this.q.logIsSavedDaily()) {
			for (var i = 0; i < 7; i++) {
				var ref = breakDate(back);
				var year = ref.year;
				var month = ref.month;
				var date = ref.date;

				dates.push(year + month + date);

				back.setDate(back.getDate() - 1);
			}
		} else {
			for (var i$1 = 0; i$1 < 7; i$1++) {
				var ref$1 = breakDate(back);
				var year$1 = ref$1.year;
				var month$1 = ref$1.month;

				dates.push(year$1 + month$1);

				back.setMonth(back.getMonth() - 1);
			}
		}

		return dates
	};
	Fetch.prototype.fetch = function(date) {
		var ff = date + ".dat";

		return fetch({url: "bbs.cgi", data: this.q.queryFor(ff)}).then(function (div) {
			div.ff = ff;
			return div
		})
	};
	Fetch.prototype.sequence = function(container) {
		var this$1 = this;

		var divs = [];
		return this.getBeforeDates()
			.reduce(
				function (sequence, date) { return sequence.then(function (done) {
						if (done) {
							return done
						}

						return this$1.fetch(date).then(function (div) {
							divs.push(div);

							return this$1.hasOP(div)
						})
					}); },
				Promise.resolve(this.hasOP(container))
			)
			.then(function () { return divs; })
	};
	Fetch.prototype.concurrent = function() {
		return Promise.all(this.getAfterDates().map(this.fetch.bind(this)))
	};

	function Info() {
		var el = document.createElement("span");
		el.id = "info";

		return el
	}

	var div_ = document.createElement("div");

	/**
	 * @param {string} html
	 * @return {Element}
	 */
	function DOM(html) {
		var div = div_.cloneNode(false);
		div.innerHTML = html;
		return div.firstChild
	}

	function StackLog(config, q, body, view) {
		this.config = config;
		this.q = q;
		this.body = body;
		this.view = view;
	}
	StackLog.prototype = {
		container: function(info) {
			if ( info === void 0 ) info = new Info();

			if (!document.body) {
				throw new Error("no body")
			}

			var el = document.createElement("div");
			el.id = "container";
			el.appendChild(info);

			return {container: el, info: info}
		},
		shouldComplement: function() {
			return this.q.shouldComplement(this.body)
		},
		complement: function() {
			if (this.shouldComplement()) {
				var gui = this.container();
				var container = gui.container;
				var info = gui.info;

				info.innerHTML =
					"<strong>" + this.q.ff + "以外の過去ログを検索中...</strong>";
				this.body.insertBefore(container, this.body.firstChild);

				return this.makeFetch()
					.run(this.body)
					.then(this.addExtraLog.bind(this, container))
					.then(function() {
						info.textContent = "";
					})
			}
		},
		makeFetch: function() {
			return new Fetch(this.q)
		},
		addExtraLog: function(container, doms) {
			var view = this.view;
			var wrap = (function() {
				var wrap = view.wrapOne.bind(view);
				return function(f) {
					Array.prototype.forEach.call(f.querySelectorAll("a[name]"), wrap);
					return f
				}
			})();
			var f = document.createDocumentFragment();
			function append(html) {
				f.appendChild(DOM(html));
			}
			function format(f, div) {
				var numberOfPosts = div.querySelectorAll("a[name]").length;

				append("<h1>" + div.ff + "</h1>");

				if (numberOfPosts) {
					f.appendChild(wrap(div));
					append("<h3>" + numberOfPosts + "件見つかりました。</h3>");
				} else {
					append("<hr>");
					append("<h3>指定されたスレッドは見つかりませんでした。</h3><hr>");
				}

				return f
			}

			if (doms.befores.length) {
				append("<hr>");
			}

			f = doms.befores.reduceRight(format, f);

			append("<hr>");
			append(("<h1>" + (this.q.get("ff")) + "</h1>"));

			this.body.insertBefore(f, container.nextSibling);

			f = doms.afters.reduceRight(format, f);
			this.body.appendChild(f);
		},
	};

	function next (type) { return function (nodeName) { return function (node) {
		while ((node = node[type])) {
			if (node.nodeName === nodeName) {
				return node
			}
		}
	}; }; }

	var nextSibling = next("nextSibling");

	function memoize(fn) {
		var cache = {};
		return function (arg) {
			if (!cache.hasOwnProperty(arg)) {
				cache[arg] = fn(arg);
			}
			return cache[arg]
		}
	}

	function addEventListener (el, event, listener) {
		el.addEventListener(event, listener, false);
	}

	function GM_xmlhttpRequest$1 (options) { return GM_xmlhttpRequest(options); }

	var GM$1 = {
		xmlHttpRequest: function (options) { return GM.xmlHttpRequest(options); },
	};

	function checkAnimation (imgURL) { return new Promise(function (resolve, reject) {
			var options = {
				url: imgURL.replace(/\w+$/, "pch"),
				type: "HEAD",
				method: "HEAD",
				onload: function (response) { return resolve(response.status === 200); },
			};

			if (IS_GM4) {
				GM$1.xmlHttpRequest(options);
			} else if (IS_GM) {
				GM_xmlhttpRequest$1(options);
			} else if (IS_EXTENSION) {
				ajax(options).then(
					function () { return resolve(true); },
					function (e) { return (/Network Error/.test(e.message) ? reject(e) : resolve(false)); }
				);
			}
		}); }

	/** @type {function(string): function(HTMLElement): HTMLElement} */
	var nextElement = next("nextElementSibling");

	var nextFont = nextElement("FONT");
	var nextB = nextElement("B");
	var nextBlockquote = nextElement("BLOCKQUOTE");

	var mayHaveSmallerImage = /^http:\/\/misao\.(?:mixh|on\.arena\.ne)\.jp\/c\/up\/misao\d+\.\w+$/;

	var animation = function (href) {
		var mayHaveAnimation = /^(http:\/\/misao\.(?:mixh|on\.arena\.ne)\.jp\/c\/)up\/(misao0*\d+)\.(?:png|jpg)$/;
		var ref = mayHaveAnimation.exec(href) || [];
		var directory = ref[1];
		var id = ref[2];

		if (id) {
			return {
				id: id,
				href: (directory + "upload.cgi?m=A&id=" + (id.replace(/misao0*/, ""))),
			}
		}
	};

	var misao = /^http:\/\/misao\.(?:mixh|on\.arena\.ne)\.jp\/c\//;
	var imageReg = /\.(?:jpe?g|png|gif|bmp)$/;
	var videoReg = /^[^?#]+\.(?:webm|avi|mov|mp[4g]|wmv)(?:[?#]|$)/i;
	var audioReg = /^[^?#]+\.(?:mp3|m4a|wma|au|mid|wav)(?:[?#]|$)/i;

	var sites = [
		{
			name: "misao",
			prefix: misao,
			suffix: imageReg,
			small: function (href) { return mayHaveSmallerImage.test(href) ? href.replace(/up\//, "up/pixy_") : href; },
			animation: animation,
			strange: true,
		},
		{
			name: "misaoAudio",
			prefix: misao,
			suffix: audioReg,
			strange: true,
			embed: function (href) { return ("<audio controls preload src=\"" + href + "\"></audio>"); },
		},
		{
			name: "misaoVideo",
			prefix: misao,
			suffix: videoReg,
			strange: true,
			embed: function (href) { return ("<video controls preload loop src=\"" + href + "\"></video>"); },
		},
		{
			name: "imgur",
			prefix: /^https?:\/\/(?:i\.)?imgur\.com\/[^/]+$/,
			small: function small(href) {
				var original = href.replace(/^https?:\/\/(?:i\.)?/, "https:/i.");
				return original.replace(/\.\w+$/, "t$&")
			},
		},
		{
			name: "twimg",
			prefix: /^https?:\/\/pbs\.twimg\.com\/media\/[\w_-]+\.\w+/,
			suffix: /(?::(?:orig|large|medium|small|thumb))?$/,
			original: function original(href) {
				return this.replaceExtra(href, ":orig")
			},
			small: function small(href) {
				return this.replaceExtra(href, ":thumb")
			},
			replaceExtra: function replaceExtra(href, ext) {
				var ref = this.prefix.exec(href) || [];
				var hrefWithoutTag = ref[0];
				return hrefWithoutTag ? hrefWithoutTag + ext : ""
			},
		},
		{
			name: "anyImage",
			suffix: /^[^?#]+\.(?:jpe?g|png|gif|bmp)(?:[?#]|$)/i,
		},
		{
			name: "anyAudio",
			suffix: audioReg,
			embed: function (href) { return ("<audio controls preload src=\"" + href + "\"></audio>"); },
		},
		{
			name: "anyVideo",
			suffix: videoReg,
			embed: function (href) { return ("<video controls preload loop src=\"" + href + "\"></video>"); },
		} ];

	function toggle(e) {
		e.preventDefault();
		doToggle(e.target);
	}
	function doToggle(el) {
		var ref = el.dataset;
		var name = ref.name;
		var href = ref.href;
		var site = sites.find(function (site) { return site.name === name; });
		var a = nextElement("A")(el);
		if (el.classList.contains("embedded")) {
			a.parentNode.removeChild(a.nextElementSibling);
		} else {
			var media = DOM(site.embed(href));
			if (media.tagName === "VIDEO") {
				var metadata = el.nextElementSibling;
				if (!metadata.classList.contains("metadata")) {
					media.addEventListener("loadedmetadata", function () {
						var videoHeight = media.videoHeight;
						var videoWidth = media.videoWidth;
						metadata.insertAdjacentHTML(
							"beforebegin",
							("<span class=\"metadata\">[" + videoWidth + "x" + videoHeight + "]</span>")
						);
					});
				}
			}

			var text = el.closest(".text_tree-mode-ascii");
			var branch = text
				? text.querySelector(".a-tree:not(.spacer)").outerHTML
				: "";
			var div = DOM(("<div style=\"white-space: initial\">" + branch + "</div>"));

			div.appendChild(media);
			a.parentNode.insertBefore(div, a.nextSibling);
		}
		el.classList.toggle("embedded");
	}

	function Popup(config, image, body) {
		body = body || document.body;
		this.waitingMetadata = null;

		this.handleEvent = function(e) {
			var type = e.type;

			if (
				type === "keydown" &&
				!/^Esc(?:ape)?$/.test(e.key) &&
				e.keyIdentifier !== "U+001B"
			) {
				// not ESC
				return
			}
			if (type === "mouseout" && e.relatedTarget.closest(".popup")) {
				return
			}

			this.doHandleEvent();
		};

		this.doHandleEvent = function() {
			var popup = document.getElementById("image-view");
			if (popup) {
				popup.parentNode.removeChild(popup);
			}

			Array.prototype.slice
				.call(document.getElementsByClassName("popup"))
				.forEach(function(el) {
					el.classList.remove("popup");
				});

			this.removeEventListeners(body);

			if (this.waitingMetadata) {
				clearTimeout(this.waitingMetadata);
			}
		};

		this.addEventListeners = function() {
			this.toggleEventListeners("add");
		};
		this.removeEventListeners = function() {
			this.toggleEventListeners("remove");
		};
		this.toggleEventListeners = function(toggle) {
	["click", "keydown", "mouseout"].forEach(function(type) {
				body[toggle + "EventListener"](type, this);
			}, this);
		};

		function getRatio(natural, max) {
			if (/^\d+$/.test(max) && natural > max) {
				return +max / natural
			} else {
				return 1
			}
		}

		this.popup = function() {
			var isBestFit = config.popupBestFit;
			var viewport =
				document.compatMode === "BackCompat"
					? document.body
					: document.documentElement;
			var windowHeight = viewport.clientHeight;
			var windowWidth = viewport.clientWidth;
			var imageView = document.createElement("figure");
			imageView.id = "image-view";
			imageView.classList.add("popup");
			imageView.style.visibility = "hidden";
			imageView.innerHTML =
				'<figcaption><span id="percentage"></span>%</figcaption>';

			// bodyに追加することでimage-orientationが適用され
			// natural(Width|Height)以外の.*{[wW]idth|[hH]eight)が
			// EXIFのorientationが適用された値になる
			imageView.appendChild(image);
			body.appendChild(imageView);

			var width = image.offsetWidth;
			var height = image.offsetHeight;
			var marginHeight =
				Math.round(imageView.getBoundingClientRect().height) - height;
			var maxWidth = config.popupMaxWidth || (isBestFit ? windowWidth : width);
			var maxHeight =
				config.popupMaxHeight ||
				(isBestFit ? windowHeight - marginHeight : height);
			var ratio = Math.min(getRatio(width, maxWidth), getRatio(height, maxHeight));
			var percentage = Math.floor(ratio * 100);
			var bgcolor = ratio < 0.5 ? "red" : ratio < 0.9 ? "blue" : "green";
			// 丸めないと画像が表示されないことがある
			var imageHeight = Math.floor(height * ratio) || 1;
			var imageWidth = Math.floor(width * ratio) || 1;

			imageView.style.display = "none";
			image.height = imageHeight;
			image.width = imageWidth;

			imageView.querySelector("#percentage").textContent = percentage;

			imageView.style.cssText = "background-color: " + bgcolor;
		};

		this.waitAndOpen = function() {
			if (
				!image.complete &&
				image.naturalWidth === 0 &&
				image.naturalHeight === 0
			) {
				this.waitingMetadata = setTimeout(this.waitAndOpen.bind(this), 50);
			} else {
				this.waitingMetadata = null;
				this.popup();
			}
		};
	}

	function Preload(head) {
		if ( head === void 0 ) head = document.head;

		this.preloads = Object.create(null);
		this.head = head;

		var DOMTokenListSupports = function(tokenList, token) {
			if (!tokenList || !tokenList.supports) {
				return
			}
			try {
				return tokenList.supports(token)
			} catch (e) {
				if (e instanceof TypeError) {
					console.log("The DOMTokenList doesn't have a supported tokens list");
				} else {
					console.error("That shouldn't have happened");
				}
			}
		};
		this.isSupported = DOMTokenListSupports(
			document.createElement("link").relList,
			"preload"
		);
	}
	Preload.prototype.fetch = function(url) {
		if (!this.isSupported || this.isFetched(url)) {
			return
		}

		var link = Object.assign(document.createElement("link"), {
			rel: "preload",
			as: "image",
			href: url,
		});

		this.head.appendChild(link);
		this.preloads[url] = true;
	};
	Preload.prototype.isFetched = function(url) {
		return this.preloads[url]
	};

	function Embedder(
		config,
		preload,
		animationChecker
	) {
		if ( preload === void 0 ) preload = new Preload();
		if ( animationChecker === void 0 ) animationChecker = memoize(checkAnimation);

		this.config = config;
		this.preload = preload;

		/**
		 * @param {string} href
		 * @param {HTMLElement} container
		 */
		this.thumbnailLink = function(href, container) {
			var site = pickAppropriateSite(href);
			if (!site) {
				return
			}

			var original = site.original ? site.original(href) : href;

			var thumbnail = this.thumbnailHtml(original, href, site);

			if (config.linkAnimation) {
				var animation = site.animation ? site.animation(href) : null;
				if (animation) {
					this.checkAnimation(href, animation.id, container);

					thumbnail += animationHtml(animation);
				}
			}

			if (config.shouki && !site.embed) {
				thumbnail += shouki(original);
			}

			return thumbnail
		};

		var pickAppropriateSite = function (href) { return sites.find(
				function (ref) {
						var prefix = ref.prefix;
						var suffix = ref.suffix;
						var strange = ref.strange;

						return (strange ? true : config.popupAny) &&
					test(href, prefix) &&
					test(href, suffix);
				}
			); };

		var test = function (href, test) { return !test || test.test(href); };

		this.thumbnailHtml = function(original, href, site) {
			var small = this.small(href, site);
			if (small) {
				return a(original, thumbnailHtml(small))
			} else if (site.embed) {
				return ("[<a href = \"javascript:;\" class=\"embed\" data-name=\"" + (site.name) + "\" data-href=\"" + href + "\">埋</a>]")
			} else {
				return "[" + a(original, "■") + "]"
			}
		};
		this.small = function(href, site) {
			if (!site.small) {
				return
			}

			var small = site.small(href);
			if (!small) {
				return
			}

			if (href === small) {
				return href
			}

			if (!config.thumbnailPopup) {
				return small
			}

			this.preload.fetch(href);

			if (this.preload.isFetched(href)) {
				return small
			} else {
				return href
			}
		};
		var a = function (href, content) { return ("<a href=\"" + href + "\" target=\"link\" class=\"thumbnail\">" + content + "</a>"); };

		var thumbnailHtml = function (src) { return ("<img referrerpolicy=\"no-referrer\" class=\"thumbnail-img\" src=\"" + src + "\">"); };

		var animationHtml = function (ref) {
				var id = ref.id;
				var href = ref.href;

				return "<span class=\"animation " + id + "\">" +
			"[<a href=\"" + href + "\" target=\"link\">A</a><span class=\"unsure\">?</span>]" +
			"</span>";
		};

		var shouki = function (href) { return ("[<a href=\"https://images.google.com/searchbyimage?image_url=" + href + "\" target=\"link\">詳</a>]"); };

		this.checkAnimation = function (href, id, container) { return animationChecker(href)
				.then(function (isAnimation) { return (isAnimation ? ("." + id + " .unsure") : ("." + id)); })
				.then(function (selector) { return container.querySelector(selector); })
				.then(function (e) { return e.parentNode.removeChild(e); })
				.catch(doNothing); };

		/** ポップアップを消した時、カーソルがサムネイルの上にあるか */
		this.isClosedAboveThumbnail = function(e) {
			var relatedTarget = e.relatedTarget;

			//firefox:
			if (relatedTarget === null) {
				return true
			}

			//opera12
			if (relatedTarget instanceof HTMLBodyElement) {
				return true
			}

			//chrome
			if (
				relatedTarget.closest("#image-view") &&
				!document.getElementById("image-view")
			) {
				return true
			}
		};

		function setNote(a, text) {
			var note = a.nextElementSibling;
			// span.noteがない
			if (!note || !note.classList.contains("note")) {
				note = document.createElement("span");
				note.className = "note";

				a.parentNode.insertBefore(note, a.nextSibling);
			}

			note.textContent = text;
		}

		this.downloading = function(image, a) {
			var pending = true;
			var complete = function(success) {
				pending = false;
				if (success) {
					var note = a.nextElementSibling;
					if (note && note.classList.contains("note")) {
						note.parentNode.removeChild(note);
					}
				} else {
					setNote(a, "404?画像ではない？");
				}
			};

			image.addEventListener("load", complete.bind(null, true));
			image.addEventListener("error", complete.bind(null, false));

			setTimeout(function() {
				if (pending) {
					setNote(a, "ダウンロード中");
				}
			}, 100);
		};

		this.handleEvent = function(e) {
			if (this.isClosedAboveThumbnail(e)) {
				return
			}

			var a = e.currentTarget;

			// ポップアップからサムネイルに帰ってきた
			if (a.classList.contains("popup")) {
				return
			}

			var image = new Image();
			image.referrerPolicy = "no-referrer";

			this.downloading(image, a);

			image.classList.add("image-view-img");
			image.src = a.href;

			a.classList.add("popup");

			var popup = new Popup(config, image);
			popup.addEventListeners();
			popup.waitAndOpen();
		};
	}

	/** @param {HTMLElement} container */
	Embedder.prototype.register = function(container) {
		var as = container.querySelectorAll("a[target]");
		var has = false;
		for (var i = as.length - 1; i >= 0; i--) {
			var a = as[i];
			var thumbnail = this.thumbnailLink(a.href, container);
			if (thumbnail) {
				a.insertAdjacentHTML("beforebegin", thumbnail);
				has = true;
			}
		}
		if (has) {
			if (this.config.thumbnailPopup) {
				var thumbs = container.getElementsByClassName("thumbnail");
				for (var i$1 = thumbs.length - 1; i$1 >= 0; i$1--) {
					addEventListener(thumbs[i$1], "mouseover", this);
				}
			}
			var embeds = container.getElementsByClassName("embed");
			for (var i$2 = embeds.length - 1; i$2 >= 0; i$2--) {
				addEventListener(embeds[i$2], "click", toggle);
			}
		}
	};

	function markNG (reg) { return function (value) { return value.replace(reg, "<mark class='NGWordHighlight'>$&</mark>"); }; }

	var a = document.createElement("a");
	a.href = ">";
	var gt = a.outerHTML === '<a href=">"></a>';

	var replacer = function (match) {
		var href = match.replace(/"/g, "&quot;");
		if (gt) {
			href = href.replace(/&gt;/g, ">").replace(/&lt;/g, "<");
		}
		return ("<a href=\"" + href + "\" target=\"link\" rel=\"noreferrer noopener\">" + match + "</a>")
	};

	function relinkify(url) {
		return url.replace(
			/(?:https?|ftp|gopher|telnet|whois|news):\/\/[\x21-\x7e]+/gi,
			replacer
		)
	}

	var Post = function Post(id) {
		this.id = id;

		/** @type {Post} */
		this.parent = null;
		/** @type {Post} */
		this.child = null;
		/** @type {Post} */
		this.next = null;
		/** @type {boolean} */
		this.isNG = null;
	};

	Post.byID = function byID (l, r) {
		return +l.id - +r.id
	};
	Post.relinkify1stMatching = function relinkify1stMatching (_, url) {
		return relinkify(url)
	};
	Post.checkNG = function checkNG (ng, post) {
		var isNG = false;

		if (ng.word) {
			isNG = ng.word.test(post.text);
		}
		if (!isNG && ng.handle) {
			isNG = isNG || ng.handle.test(post.name);
			isNG = isNG || ng.handle.test(post.title);
		}

		post.isNG = isNG;

		return post
	};
	Post.wantsParent = function wantsParent (post) {
		return post.parentId
	};
	Post.isOrphan = function isOrphan (post) {
		return post.parent === null && post.parentId
	};
	Post.isRootCandidate = function isRootCandidate (post) {
		return post.parent === null
	};
	Post.mayHaveParent = function mayHaveParent (post) {
		return post.mayHaveParent()
	};
	Post.isClean = function isClean (post) {
		return !post.rejectLevel
	};

	Post.prototype.isOP = function isOP () {
		return this.id === this.threadId
	};
	Post.prototype.getText = function getText () {
		if (this.hasDefaultReference()) {
			return this.text.slice(0, this.text.lastIndexOf("\n\n")) //参考と空行を除去
		}

		return this.text
	};
	Post.prototype.hasDefaultReference = function hasDefaultReference () {
		var parent = this.parent;
		if (!parent) {
			return false
		}

		if (parent.date === this.parentDate) {
			return true
		}

		var ref =
			/^(\d+)\/(\d+)\/(\d+) \((月|火|水|木|金|土|日)\) (\d+):(\d+):(\d+)$/.exec(
				parent.date
			) || [];
			var _ = ref[0];
			var year = ref[1];
			var month = ref[2];
			var day = ref[3];
			var dow = ref[4];
			var hour = ref[5];
			var minute = ref[6];
			var second = ref[7];
		return (
			this.parentDate ===
			(year + "/" + month + "/" + day + "(" + dow + ")" + hour + "時" + minute + "分" + second + "秒")
		)
	};
	Post.prototype.computeQuotedText = function computeQuotedText () {
		var lines = this.text
			.replace(/&gt; &gt;.*\n/g, "")
			//target属性がないのは参考リンクのみ
			.replace(/<a href="[^"]+">参考：.*<\/a>/i, "")
			// <A href=¥S+ target=¥"link¥">(¥S+)<¥/A>
			.replace(
				/<a href="[^"]+" target="link"(?: rel="noreferrer noopener")?>([^<]+)<\/a>/gi,
				Post.relinkify1stMatching
			)
			.replace(/\n/g, "\n&gt; ");
		lines = ("&gt; " + lines + "\n")
			.replace(/\n&gt;[ \n\r\f\t]+\n/g, "\n")
			.replace(/\n&gt;[ \n\r\f\t]+\n$/, "\n");
		return lines
	};
	Post.prototype.textCandidate = function textCandidate () {
		var text = this.text
			.replace(/^&gt; (.*\n?)|^.*\n?/gm, "$1")
			.replace(/\n$/, "")
			.replace(/^[ \n\r\f\t]*$/gm, "$&\n$&");

		//TODO 引用と本文の間に一行開ける
		//text = text.replace(/((?:&gt; .*\n)+)(.+)/, "$1\n$2"); //replace(/^(?!&gt; )/m, "\n$&");

		return text // + "\n\n";
	};
	Post.prototype.textCandidateLooksValid = function textCandidateLooksValid () {
		return (
			this.getText()
				.replace(/^&gt; .*/gm, "")
				.trim() !== ""
		)
	};
	Post.prototype.dateCandidate = function dateCandidate () {
		return this.parentDate
	};
	Post.prototype.dateCandidateLooksValid = function dateCandidateLooksValid (candidate) {
		return /^\d{4}\/\d{2}\/\d{2}\(.\)\d{2}時\d{2}分\d{2}秒$/.test(candidate)
	};
	Post.prototype.hasQuote = function hasQuote () {
		return /^&gt; /m.test(this.text)
	};
	Post.prototype.mayHaveParent = function mayHaveParent () {
		return this.isRead && !this.isOP() && this.hasQuote()
	};
	Post.prototype.adoptAsEldestChild = function adoptAsEldestChild (childToBeAdopted) {
		var child = this.child;

		if (child) {
			childToBeAdopted.next = child;
		}

		this.child = childToBeAdopted;
		childToBeAdopted.parent = this;
	};
	Post.prototype.getKeyForOwnParent = function getKeyForOwnParent () {
		return this.parentId
	};

	Post.prototype.id = "";
	Post.prototype.title = " ";
	Post.prototype.name = "　";
	Post.prototype.date = "";
	Post.prototype.resButton = "";
	Post.prototype.threadButton = "";
	Post.prototype.threadId = "";
	Post.prototype.posterButton = "";
	Post.prototype.site = "";
	/** うさみん特有のボタン */
	Post.prototype.buttons = "";
	/**
	 * 親のid。string: 自然数の文字列。null: 親なし。undefined: 不明。
	 * @type {(undefined|?string)}
	 */
	Post.prototype.parentId = null;
	Post.prototype.parentDate = "";
	Post.prototype.text = "";

	Post.prototype.showAsIs = false;
	Post.prototype.rejectLevel = 0;
	Post.prototype.isRead = false;
	Post.prototype.textBonus = 2;
	Post.prototype.dateBonus = 100;

	var defaultExport = function defaultExport() {
		this.range = document.createRange();
	};
	defaultExport.prototype.extractContents = function extractContents (start, end) {
		this.range.setStartBefore(start);
		this.range.setEndAfter(end);
		return this.range.extractContents()
	};
	defaultExport.prototype.deleteContents = function deleteContents (start, end) {
		this.range.setStartBefore(start);
		this.range.setEndAfter(end);
		this.range.deleteContents();
	};
	defaultExport.prototype.surroundContents = function surroundContents (wrapper, start, end) {
		this.range.setStartBefore(start);
		this.range.setEndAfter(end);
		this.range.surroundContents(wrapper);
	};
	defaultExport.prototype.selectNodeContents = function selectNodeContents (node) {
		this.range.selectNodeContents(node);
	};

	defaultExport.prototype.createContextualFragment = function createContextualFragment (html) {
		return this.range.createContextualFragment(html)
	};

	/** @param {HTMLElement} anchor */
	function collectEssentialElements(anchor) {
		var header = nextFont(anchor);

		/** @type {HTMLElement} */
		var title = header.firstChild;
		var name = nextB(header);

		var info = nextFont(name);
		var date = info.firstChild;

		// レスボタン
		var resButton = info.firstElementChild;

		var posterButton, threadButton;
		var nextButton = resButton.nextElementSibling;

		// 投稿者検索ボタン？
		if (nextButton && nextButton.href.includes("?m=s")) {
			posterButton = nextButton;
			nextButton = nextButton.nextElementSibling;
		}

		// スレッドボタン？
		if (nextButton) {
			threadButton = nextButton;
		}

		var blockquote = nextBlockquote(info);
		/** @type {HTMLElement} */
		var pre = blockquote.firstElementChild;

		return {
			anchor: anchor,
			title: title,
			name: name,
			date: date,
			resButton: resButton,
			posterButton: posterButton,
			threadButton: threadButton,
			blockquote: blockquote,
			pre: pre,
		}
	}

	function collectElements(a) {
		var el = collectEssentialElements(a);

		return {
			el: el,
			name: el.name.innerHTML,
			title: el.title.innerHTML,
			text: el.pre.innerHTML,
			threadId: el.threadButton
				? /&s=([^&]+)/.exec(el.threadButton.href)[1]
				: el.anchor.name,
		}
	}

	function StackView(config, range) {
		if ( range === void 0 ) range = new defaultExport();

		this.range = range;
		this.original = document.createElement("div");
		this.original.className = "message original";
		this.embedder = new Embedder(config);

		this.showButtons = document.createElement("span");
		this.showButtons.className = "showOriginalButtons";

		this.range.selectNodeContents(this.original); // 引数は何でもいいが何かで上書きしないとopera12で<html>...</html>が返る
		this.vanishButton = this.range.createContextualFragment(
			'<a href="javascript:;" class="vanish">消</a>　 '
		);
		this.needToWrap =
			config.useVanishThread ||
			config.keyboardNavigation ||
			(window.Intl && Intl.v8BreakIterator); // or blink
		this.useThumbnail = config.thumbnail;
		this.utterlyVanishNGThread = config.utterlyVanishNGThread;
		this.utterlyVanishNGStack = config.utterlyVanishNGStack;
		this.nextComment = nextSibling("#comment");
		this.config = config;
		this.ng = config.ng;
		this.markNG = this.createMarkNG(config.ng);
	}
	StackView.prototype = {
		deleteMessage: function(post) {
			var el = post.el;
			var end = this.nextComment(el.blockquote);
			this.range.deleteContents(el.anchor, end);
		},

		wrapMessage: function(post) {
			var el = post.el;
			var wrapper = this.original.cloneNode(false);

			this.range.surroundContents(wrapper, el.anchor, el.blockquote);

			if (this.config.useVanishThread) {
				el.resButton.parentNode.insertBefore(
					this.vanishButton.cloneNode(true),
					el.threadButton
				);

				wrapper.dataset.threadId = post.threadId;
			}

			return wrapper
		},

		createMarkNG: function(ng) {
			var word = ng.wordg;
			var handle = ng.handleg;
			var markNGText = markNG(word);
			var markNGHeader = markNG(handle);

			return function(post) {
				var el = post.el;

				if (word) {
					el.pre.innerHTML = markNGText(post.text);
				}

				if (handle) {
					el.name.innerHTML = markNGHeader(post.name);
					el.title.innerHTML = markNGHeader(post.title);
				}
			}
		},

		wrapOne: function(a) {
			var post = collectElements(a);
			var buttons = [];

			if (this.vanish(post, buttons) === false) {
				return
			}

			if (this.vanishByNG(post, buttons) === false) {
				return
			}

			this.buildMessage(post, buttons);
			this.registerThumbnail(post);
		},

		buildMessage: function(post, buttons) {
			if (this.needToWrap || buttons.length) {
				var wrapper = this.wrapMessage(post);

				if (buttons.length) {
					wrapper.classList.add("hidden");
					// chromeのElement#insertAdjacentHTMLは親がDocumentFragmentのNodeを受け付けない
					// jsdomのテストは通るので注意
					var showOriginalButtons = document.createElement("span");
					showOriginalButtons.className = "showOriginalButtons";
					showOriginalButtons.innerHTML = buttons.join("");
					wrapper.parentNode.insertBefore(showOriginalButtons, wrapper);
				}
			}
		},
		vanish: function(post, buttons) {
			if (this.config.isVanishedThread(post.threadId)) {
				if (this.utterlyVanishNGThread) {
					this.deleteMessage(post);
					return false
				} else {
					buttons.push(
						'<a href="javascript:;" class="showThread">非表示解除</a> '
					);
				}
			}
		},

		vanishByNG: function(post, buttons) {
			var ng = this.ng;
			if (ng.isEnabled) {
				Post.checkNG(ng, post);

				if (post.isNG) {
					if (this.utterlyVanishNGStack) {
						this.deleteMessage(post);
						return false
					} else if (this.config.NGCheckMode) {
						this.markNG(post);
					} else {
						buttons.push('<a href="javascript:;" class="showNG">NG</a> ');
					}
				}
			}
		},

		registerThumbnail: function(post) {
			if (this.useThumbnail) {
				this.embedder.register(post.el.pre);
			}
		},
	};

	function clearVanishedIds(config, method, button) {
		return config[method]().then(function () {
			button.firstElementChild.innerHTML = "0";
		})
	}

	function loop (func, array) { return new Promise(function (resolve, reject) {
			var i = 0;
			var length = array.length

			;(function loop() {
				var t = Date.now();
				do {
					if (i === length) {
						resolve();
						return
					}

					try {
						func(array[i++]);
					} catch (e) {
						reject(e);
						return
					}
				} while (Date.now() - t < 20)
				setTimeout(loop, 0);
			})();
		}); }

	function on (el, event, selector, callback) {
		el.addEventListener(event, function (e) {
			if (e.target.closest(selector)) {
				if (callback.handleEvent) {
					callback.handleEvent(e);
				} else {
					callback(e);
				}
			}
		});
	}

	function addEventListener$1(config, body) {
		on(body, "click", ".showNG", Stack.showNG);
		on(body, "click", ".showThread", Stack.showThread.bind(null, config));
		on(
			body,
			"click",
			".clearVanishedThreadIDs",
			Stack.clearVanishedThreadIDs.bind(null, config)
		);
		on(body, "click", ".vanish", Stack.vanish.bind(null, config));
	}

	function accesskey(config, body) {
		var midoku = body.querySelector('input[name="midokureload"]');
		if (midoku) {
			midoku.accessKey = config.accesskeyReload;
			midoku.title = "ヽ(´ー｀)ノロード";
		}
	}

	function configButton(config, body) {
		var setup = body.querySelector('input[name="setup"]');
		if (setup) {
			var button =
				'　<a href="javascript:;" id="openConfig">★くわツリービューの設定★</a>';

			if (config.vanishedThreadIDs.length) {
				button +=
					' 非表示解除(<a class="clearVanishedThreadIDs" href="javascript:;"><span class="length">' +
					config.vanishedThreadIDs.length +
					"</span>スレッド</a>)";
			}

			if (config.ng.message) {
				button += " " + config.ng.message;
			}

			setup.insertAdjacentHTML("afterend", button);
		}
	}

	var Stack = {
		common: function(config, body) {
			addEventListener$1(config, body);
			configButton(config, body);
			accesskey(config, body);
		},
		showNG: function(e) {
			Stack.removeButtons(e.target.parentNode.nextElementSibling);
		},
		showThread: function(config, e) {
			e.preventDefault();

			var buttons = e.target.parentNode;
			var thisMessage = buttons.nextElementSibling;
			var id = thisMessage.dataset.threadId;
			var restore = Stack.savePosition(buttons);

			config.removeVanishedThread(id);

			for (var i = 0, list = document.querySelectorAll(".original"); i < list.length; i += 1) {
				var message = list[i];

				if (message.dataset.threadId === id) {
					if (message === thisMessage) {
						restore();
					}

					Stack.removeButtons(message);
				}
			}
		},
		clearVanishedThreadIDs: function(config, e) {
			e.preventDefault();
			return clearVanishedIds(config, "clearVanishedThreadIDs", e.target)
		},
		removeButtons: function(message) {
			var buttons = message.previousElementSibling;
			message.classList.remove("hidden");
			buttons.parentNode.removeChild(buttons);
		},
		vanish: function(config, e) {
			e.preventDefault();

			var message = e.target.closest(".original");
			var id = message.dataset.threadId;
			var data = e.target.classList.contains("revert")
				? Stack.doRevertVanish()
				: Stack.doVanish();
			var restore = Stack.savePosition(message);

			config[data.type + "VanishedThread"](id);

			Array.prototype.filter
				.call(document.querySelectorAll(".original"), function(message) {
					return message.dataset.threadId === id
				})
				.forEach(function(message) {
					message.classList.toggle("message");
					message.querySelector("blockquote").classList.toggle("hidden");

					var button = message.querySelector(".vanish");
					button.classList.toggle("revert");
					button.textContent = data.text;
				});

			restore();
		},
		doVanish: function() {
			return {
				text: "戻",
				type: "add",
			}
		},
		doRevertVanish: function() {
			return {
				text: "消",
				type: "remove",
			}
		},
		savePosition: function(element) {
			var top = element.getBoundingClientRect().top;
			return function restorePosition() {
				window.scrollTo(
					window.pageXOffset,
					window.pageYOffset + element.getBoundingClientRect().top - top
				);
			}
		},
		render: function(config, body, view) {
			if (
				config.keyboardNavigation ||
				config.thumbnail ||
				config.ng.isEnabled ||
				config.useVanishThread
			) {
				var anchors = body.querySelectorAll("body > a[name]");
				var wrap = view.wrapOne.bind(view);

				if (IS_FIREFOX) {
					try {
						var html = body.parentNode;

						html.removeChild(body);

						anchors.forEach(wrap);
					} finally {
						html.appendChild(body);
					}
				} else {
					return loop(wrap, anchors)
				}
			}
		},
		tweakFooter: function(config, container, opt_done) {
			if (this.needsToTweakFooter(config)) {
				var insertFooter = this.doTweakFooter(container);

				return Promise.resolve(opt_done).then(insertFooter)
			}
		},
		needsToTweakFooter: function(config) {
			return (
				(config.ng.isEnabled && config.utterlyVanishNGStack) ||
				(config.useVanishThread && config.utterlyVanishNGThread)
			)
		},
		doTweakFooter: function(container, range) {
			if ( range === void 0 ) range = new defaultExport();

			var i = container.querySelector("p i");

			if (!i) {
				return doNothing
			}

			var numPostsInfo = i.parentNode;

			var hr = nextElement("HR")(numPostsInfo);

			var insertionPoint = hr.nextSibling;

			var footer = range.extractContents(numPostsInfo, hr);

			return function insertBack() {
				if (!footer.querySelector('table input[name="pnext"]')) {
					return
				}

				footer.removeChild(numPostsInfo);
				insertionPoint.parentNode.insertBefore(footer, insertionPoint);
			}
		},
	};

	var StreamStackView = function StreamStackView(
		args,
		main,
		range
	) {
		if ( main === void 0 ) main = document.createElement("main");
		if ( range === void 0 ) range = new defaultExport();

		Object.assign(this, args);

		this.range = range;
		this.main = main;
		this.main.id = "qtv-stack";
	};
	StreamStackView.prototype.init = function init () {
		Stack.common(this.config, this.body);

		this.buffer.insertBefore(this.main);
	};
	StreamStackView.prototype.finish = function finish (buffer) {
		Stack.tweakFooter(this.config, buffer);

		this.body.appendChild(buffer);

		return Promise.resolve(this.log.complement()).then(this.done)
	};
	/**
		 * @param {DocumentFragment} fragment - fragmentの先頭は通常は空白。ログの一番先頭のみ<A>
		 */
	StreamStackView.prototype.render = function render (fragment) {
		var ref = this;
			var range = ref.range;
			var view = ref.view;
			var main = ref.main;
		var comment;

		while ((comment = StreamStackView.firstComment(fragment))) {
			/** @type {Text|HTMLAnchorElement} */
			var first = fragment.firstChild;
			var one = range.extractContents(first, comment);
			// 以下のように一つずつやるとO(n)
			// 一気に全部やるとO(n^2)
			// chrome57の時点で一気にやってもO(n)になってる
			view.wrapOne(one.querySelector("a[name]"));
			main.appendChild(one);
		}
	};
	StreamStackView.firstComment = function firstComment (fragment) {
		var first = fragment.firstChild;
		while (first) {
			if (first.nodeType === Node.COMMENT_NODE && first.nodeValue === " ") {
				return first
			}
			first = first.nextSibling;
		}

		return null
	};

	var ToggleOriginal = function ToggleOriginal(original) {
		this.toggle = document.createElement("div");
		this.appendButton();
		this.stack = this.createStackArea(original);
		this.toggle.appendChild(this.stack);
	};
	ToggleOriginal.prototype.getUI = function getUI () {
		return this.toggle
	};
	ToggleOriginal.prototype.createStackArea = function createStackArea (original) {
		var stack = document.createElement("div");
		stack.id = "qtv-stack";
		stack.hidden = true;
		stack.appendChild(original);

		return stack
	};
	ToggleOriginal.prototype.appendButton = function appendButton () {
			var this$1 = this;

		this.toggle.insertAdjacentHTML(
			"beforeend",
			'<div style="text-align:center"><a class="toggleOriginal" href="javascript:;">元の投稿の表示する(時間がかかることがあります)</a></div><hr>'
		);
		this.toggle
			.querySelector("a")
			.addEventListener("click", function (e) { return this$1.toggleOriginal(e); });
	};
	ToggleOriginal.prototype.toggleOriginal = function toggleOriginal (e, win) {
			if ( win === void 0 ) win = window;

		e.preventDefault();
		e.stopPropagation();
		this.stack.hidden = !this.stack.hidden;
		win.scrollTo(
			win.pageXOffset,
			e.target.getBoundingClientRect().top + win.pageYOffset
		);
	};

	var storageIsAvailable = function (type, win) {
		if ( win === void 0 ) win = window;

		// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Feature-detecting_localStorage
		try {
			var storage = win[type],
				x = "__storage_test__";
			storage.setItem(x, x);
			storage.removeItem(x);
			return true
		} catch (e) {
			return false
		}
	};

	var getStorage$1 = function (config) {
		if (IS_USAMIN) {
			return nullStorage
		}

		if (config.useVanishMessage && storageIsAvailable("localStorage")) {
			return localStorage
		}

		if (storageIsAvailable("sessionStorage")) {
			return sessionStorage
		}

		return nullStorage
	};
	var nullStorage = {
		getItem: function getItem() {
			return null
		},
		setItem: doNothing,
	};

	function makePosts(context) {
		var posts = IS_USAMIN ? makePostsUsamin(context) : makePostsKuzuha(context);

		sortByTime(posts);

		return posts
	}

	var makePostsKuzuha = function(context) {
		var posts = [];
		/** @type {HTMLAnchorElement[]}	 */
		var as = context.querySelectorAll("a[name]");

		for (var i = 0, len = as.length; i < len; i++) {
			var a = as[i];
			var el = collectEssentialElements(a);
			var post = new Post(a.name);
			posts.push(post);

			post.title = el.title.innerHTML;
			post.name = el.name.innerHTML;
			post.date = el.date.nodeValue.trim().slice(4); //「投稿日：」削除

			post.resButton = el.resButton.outerHTML;

			if (el.posterButton) {
				post.posterButton = el.posterButton.outerHTML;
			}

			if (el.threadButton) {
				post.threadButton = el.threadButton.outerHTML;
				post.threadId = /&amp;s=([^&"]+)/.exec(post.threadButton)[1];
			} else {
				var id = post.id;
				post.threadButton = post.resButton
					.replace("?m=f", "?m=t")
					.replace(/&amp;[udp]=[^&"]*/g, "")
					.replace(/(&amp;s=)\d+/, ("$1" + id))
					.replace(">■<", ">◆<");
				post.threadId = id;
			}

			var env = nextFont(el.pre);

			if (env) {
				post.env = env.firstChild.innerHTML; // font > i > env
			}

			var ref = breakdownPre(el.pre.innerHTML, post.id);
			var text = ref.text;
			var parentId = ref.parentId;
			var parentDate = ref.parentDate;

			post.text = text;
			if (parentId) {
				post.parentId = parentId;
				post.parentDate = parentDate;
			}
		}

		return posts
	};

	var makePostsUsamin = function(context) {
		var as = context.querySelectorAll("a[id]");
		var nextPre = nextElement("PRE");
		var nextFontOrB = function (node) {
			while ((node = node.nextElementSibling)) {
				var name = node.nodeName;
				if (name === "FONT" || name === "B") {
					return node
				}
			}
		};

		return Array.prototype.map.call(as, function (a) {
			var post = new Post(a.id);

			var header = nextFontOrB(a);
			if (header.size === "+1") {
				post.title = header.firstChild.innerHTML;
				header = nextFontOrB(header);
			}
			if (header.tagName === "B") {
				post.name = header.innerHTML;
				header = nextFontOrB(header);
			}

			var info = header;
			post.date = info.firstChild.nodeValue.trim();
			post.threadButton = info.firstElementChild.outerHTML;
			post.buttons = info.innerHTML
				.replace(/^[^<]+/, "")
				.replace(/[^>]*$/, "")
				.replace(/\s+/g, " ");
			post.site = info.lastChild.textContent;

			var pre = nextPre(info);

			var ref = breakdownPre(pre.innerHTML, post.id);
			var text = ref.text;
			var parentId = ref.parentId;
			var parentDate = ref.parentDate;

			post.text = text;
			if (parentId) {
				post.parentId = parentId;
				post.parentDate = parentDate;
			}

			return post
		})
	};

	var breakdownPre = function(html, id) {
		var assign;

		var parentId, parentDate;
		var text = html
			.replace(/<\/?font[^>]*>/gi, "")
			.replace(/\r\n?/g, "\n")
			.replace(/\n$/, "");

		if (text.includes("&lt;A")) {
			text = text.replace(
				//属性内の   "      <    >    は以下のようになる
				//chrome     &quot; &lt; &gt;
				//opera12    &quot; <    >
				//firefox56  &quot; <    >
				//古いfirefox %22    %3C  %3E
				/&lt;A href="<a href="(.*)(?:&quot;|%22)"( target="link"(?: rel="noreferrer noopener")?)>\1"<\/a>\2&gt;<a href="\1(?:&lt;\/A&gt;|<\/A>|%3C\/A%3E)"\2>\1&lt;\/A&gt;<\/a>/g,
				'<a href="$1" target="link">$1</a>'
			);
		}

		var candidate = text;

		var reference =
			/\n\n<a href="h[^"]+&amp;s=([1-9]\d*)&amp;r=[^"]+">参考：([^<]+)<\/a>$/.exec(
				text
			) || /\n\n<a href="#([1-9]\d*)">参考：([^<]+)<\/a>$/.exec(text);

		if (reference) {
	(assign = reference, parentId = assign[1], parentDate = assign[2]);
			if (+id <= parentId) {
				parentId = null;
			}
			text = text.slice(0, reference.index);
		}

		// リンク欄を使ったリンクを落とす
		var url = /\n\n<[^<]+<\/a>$/.exec(text);
		if (url) {
			text = text.slice(0, url.index);
		}

		// 自動リンクがオフかつURLみたいのがあったら
		if (!text.includes("<") && text.includes(":")) {
			// 自動リンクする
			candidate =
				relinkify(text) + (url ? url[0] : "") + (reference ? reference[0] : "");
		}

		candidate = candidate.replace(
			/target="link">/g,
			'target="link" rel="noreferrer noopener">'
		);

		return {
			text: candidate,
			parentId: parentId,
			parentDate: parentDate,
		}
	};

	// 新しいのが先
	var sortByTime = function(posts) {
		if (posts.length >= 2 && +posts[0].id < +posts[1].id) {
			posts.reverse();
		}
	};

	function createPostParent(config) {
		var storage;
		var data;
		var saveAsyncIfNeeded = function (posts) {
			if (!posts.length) {
				return
			}

			load();

			var changed;

			for (var i = 0; i < posts.length; i++) {
				var ref = posts[i];
				var id = ref.id;
				var parentId = ref.parentId;

				if (data.hasOwnProperty(id)) {
					continue
				}

				if (parentId && parentId.length > 20) {
					parentId = null;
				}

				data[id] = parentId;

				changed = true;
			}

			if (changed) {
				saveAsync(data);
			}
		};
		var load = function () {
			storage = storage || getStorage$1(config);

			data = data || JSON.parse(storage.getItem("postParent")) || {};
		};
		var saveAsync = function (data) { return setTimeout(save, 0, data); };
		var save = function (data) { return storage.setItem("postParent", JSON.stringify(data)); };

		var TEN_SECONDS_LATER = 10 * 1000;
		var cleanUpLater = function () { return setTimeout(cleanUp, TEN_SECONDS_LATER, data); };
		var cleanUp = function (data) {
			if (!data) {
				return
			}
			var ids = Object.keys(data);
			var limits = getLimits();
			if (ids.length <= limits.upper) {
				return
			}

			ids = ids.map(function (id) { return +id; }).sort(function (l, r) { return r - l; });

			if (data[ids[0]] === false) {
				ids.shift();
			}

			var saveData = {};
			var i = limits.lower;
			while (i--) {
				saveData[ids[i]] = data[ids[i]];
			}
			saveAsync(saveData);
		};
		var getLimits = function () {
			if (config.vanishMessageAggressive && config.useVanishMessage) {
				return {upper: 3500, lower: 3300}
			}
			if (config.useVanishMessage) {
				return {upper: 1500, lower: 1300}
			}
			return {upper: 500, lower: 300}
		};

		var get = function (id) {
			load();
			return data[id]
		};

		/**
		 * GhostPostが自身のIDを得るために子のMergedPostを渡す
		 */
		var findAsync = function (ref) {
			var id = ref.id;
			var threadId = ref.threadId;

			if (shouldFetch(id, threadId)) {
				return updateThread(threadId).then(function () { return get(id); })
			} else {
				return Promise.resolve(get(id))
			}
		};
		var isValidIds = function (childId, threadId) { return /^(?!0)\d+$/.test(threadId) && +threadId <= +childId; };
		var isActualStorage = function (storage) { return storage.removeItem; };
		var shouldFetch = function (childId, threadId) { return typeof data[childId] === "undefined" &&
			isActualStorage(storage) &&
			isValidIds(childId, threadId); };
		var updateThread = memoize(function (threadId) { return fetch({data: {m: "t", s: threadId}})
				.then(makePosts)
				.then(saveAsyncIfNeeded); }
		);

		return {
			saveAsyncIfNeeded: saveAsyncIfNeeded,
			get: get,
			findAsync: findAsync,
			cleanUpLater: cleanUpLater,
		}
	}

	function shouldMakeUrlsSearchLog(q, posts) {
		if (!q.shouldMakeUrlsSearchLog()) {
			return posts
		}
		function appendFF(post, target, ff) {
			post[target] = post[target].replace(/href="[^"]+/, "$&" + ff);
		}

		posts.forEach(function (post) {
			var ref = post.date.match(/\d+/g) || [];
			var year = ref[0];
			var month = ref[1];
			var day = ref[2];
			var ff = "&amp;ff=" + year + month + day + ".dat";
			appendFF(post, "threadButton", ff);
			if (post.resButton) {
				appendFF(post, "resButton", ff);
			}
			if (post.posterButton) {
				appendFF(post, "posterButton", ff);
			}
		});

		return posts
	}

	function checkNG(ng, posts) {
		for (var i = 0; i < posts.length; ++i) {
			Post.checkNG(ng, posts[i]);
		}
	}

	function excludeNg (posts) { return posts.filter(function (post) { return !post.isNG; }); }

	function shouldExclude (config) { return !config.autovanishThread && config.utterlyVanishNGStack; }

	function processNg(config, posts) {
		if (!config.ng.isEnabled) {
			return posts
		}

		checkNG(config.ng, posts);

		if (shouldExclude(config)) {
			return excludeNg(posts)
		}

		return posts
	}

	function fetch$1 (q, container) { return new Fetch(q).run(container); }

	/** @returns {Promise<[Post]>} */
	function complementMissingPostsFromLog(ref) {
		var q = ref.q;
		var gui = ref.gui;
		var container = ref.container;
		var posts = ref.posts;

		if (!q.shouldFetch()) {
			return Promise.resolve(posts)
		}

		gui.setInfoHtml(("<strong>" + (q.getLogName()) + "以外の過去ログを検索中...</strong>"));

		var makePostsAndConcat = function (posts, div) { return posts.concat( makePosts(div)); };

		return fetch$1(q, container).then(function (ref) {
			var afters = ref.afters;
			var befores = ref.befores;

			return afters.reduce(makePostsAndConcat, []).concat( posts,
			befores.reduce(makePostsAndConcat, []) );
		})
	}

	function identity (x) { return x; }

	var Posts = {
		checkCharacterEntity: function(config, state) {
			var post = state.post;

			state.hasCharacterEntity = /&amp;#(?:\d+|x[\da-fA-F]+);/.test(state.value);
			state.expandCharacterEntity =
				state.hasCharacterEntity &&
				(post.hasOwnProperty("characterEntity")
					? post.characterEntity
					: config.characterEntity);

			return state
		},
		characterEntity: function(state) {
			if (state.expandCharacterEntity) {
				var iter = document.createNodeIterator(
					state.value,
					NodeFilter.SHOW_TEXT,
					null,
					false
				); //operaは省略可能な第3,4引数も渡さないとエラーを吐く
				var node;
				while ((node = iter.nextNode())) {
					node.data = node.data.replace(
						/&#(\d+|x[0-9a-fA-F]+);/g,
						Posts.replaceCharacterEntity
					);
				}
			}

			return state
		},
		replaceCharacterEntity: function(str, p1) {
			return String.fromCharCode(p1[0] === "x" ? parseInt(p1.slice(1), 16) : p1)
		},
		makeText: function(state) {
			//終わりの空行引用は消してレスする人がいる
			//引用の各行に空白を追加する人がいる
			var post = state.post;
			var text = post.getText();
			var parent = post.parent ? post.parent.computeQuotedText() : "";

			if (post.showAsIs || post.isNG) {
				text = Posts.markQuote(text, parent);
			} else {
				if (text.startsWith(parent)) {
					text = text.slice(parent.length);
				} else {
					//整形して
					parent = Posts.trimRights(parent);
					text = Posts.trimRights(text);

					//もう一度
					if (text.startsWith(parent)) {
						text = text.slice(parent.length);
					} else {
						//深海式レスのチェック
						var parent2 = parent
							.split("\n")
							.filter(function(line) {
								return !line.startsWith("&gt; &gt; ")
							})
							.join("\n");
						if (text.startsWith(parent2)) {
							text = text.slice(parent2.length);
						} else {
							text = Posts.markQuote(text, parent);
						}
					}
				}

				//全角空白も\sになる
				//空白のみの投稿が空投稿になる
				text = text.trimRight().replace(/^\s*\n/, "");

				if (text.length === 0) {
					text = '<span class="note">(空投稿)</span>';
				}
			}

			state.value = text;

			return state
		},
		checkThumbnails: function(state) {
			state.mayHaveThumbnails = state.value.includes("<a");

			return state
		},
		putThumbnails: function(config) {
			if (!config.thumbnail) {
				return identity
			}

			var embedder = new Embedder(config);
			return function(state) {
				if (state.mayHaveThumbnails) {
					embedder.register(state.value);
				}

				return state
			}
		},
		checkNGIfRead: function(ng) {
			if (!ng.isEnabled) {
				return identity
			}

			return function(state) {
				var post = state.post;

				if (post.isRead) {
					Post.checkNG(ng, post);
				}

				return state
			}
		},
		markNG: function(reg) {
			if (!reg) {
				return identity
			}
			if (!reg.global) {
				throw new Error()
			}

			var markNGText = markNG(reg);

			return function(state) {
				if (state.post.isNG) {
					state.value = markNGText(state.value);
				}

				return state
			}
		},
		markNGHeader: function(reg) {
			if (reg && !reg.global) {
				throw new Error()
			}

			return markNG(reg)
		},
		markQuote: function(text, parent) {
			var parentLines = parent.split("\n");
			parentLines.pop();
			var lines = text.split("\n");
			var i = Math.min(parentLines.length, lines.length);

			while (i--) {
				lines[i] =
					'<span class="quote' +
					(parentLines[i] === lines[i] ? "" : " modified") +
					'">' +
					lines[i] +
					"</span>";
			}

			return lines.join("\n")
		},
		trimRights: function(string) {
			return string.replace(/^.+$/gm, function(str) {
				return str.trimRight()
			})
		},
		truncate: function(config, state) {
			var post = state.post;

			if (!config.maxLine || post.showAsIs) {
				return state
			}

			var text = state.value;
			var maxLine = +config.maxLine;
			var lines = text.split("\n");
			var length = lines.length;

			if (length > maxLine) {
				var truncation = post.hasOwnProperty("truncation")
					? post.truncation
					: true;
				var label;

				if (truncation) {
					lines[maxLine] = '<span class="truncation">' + lines[maxLine];
					text = lines.join("\n") + "\n</span>";
					label = "以下" + (length - maxLine) + "行省略";
				} else {
					text += "\n";
					label = "省略する";
				}

				text +=
					'(<a href="javascript:;" class="toggleTruncation note">' +
					label +
					"</a>)";
			}

			state.value = text;

			return state
		},
		prependExtension: function(state) {
			if (state.extension) {
				return state.extension.text(state)
			} else {
				return state
			}
		},
		createDText: function(treeMode) {
			var classes = "text text_" + treeMode;
			return function(state) {
				var post = state.post;

				var dText = document.createElement("div");
				dText.className = classes + (post.isRead ? " read" : "");
				dText.innerHTML = state.value;

				state.value = dText;

				return state
			}
		},
		hide: function(config) {
			var notCheckMode = !config.NGCheckMode;

			return function(state) {
				var post = state.post;

				state.hide = (post.isNG && notCheckMode) || post.rejectLevel;

				return state
			}
		},
	};

	function compose () {
		var fns = [], len = arguments.length;
		while ( len-- ) fns[ len ] = arguments[ len ];

		return function (x) { return fns.reduceRight(function (acc, fn) { return fn(acc); }, x); };
	}

	function AbstractPosts() {}
	AbstractPosts.prototype = {
		getContainer: function() {
			return this.el
		},
		render: function(roots, el) {
			if ( el === void 0 ) el = document.createElement("span");

			el.className = "messages";

			this.el = el;
			if (this.pre) {
				this.pre();
			}

			var maker = this.messageMaker();

			for (var i = 0, length = roots.length; i < length; i++) {
				this.doShowPosts(maker, roots[i], 1);
			}
			return this.el
		},
		doShowPosts: function(maker, post, depth) {
			var dm = maker(post, depth);
			var dc = this.getContainer(post, depth);
			dc.appendChild(dm);

			if (post.child) {
				this.doShowPosts(maker, post.child, depth + 1);
			}
			if (post.next) {
				this.doShowPosts(maker, post.next, depth);
			}
		},
		checker: function() {
			var config = this.config;
			var functions = [Posts.hide(config), Posts.checkNGIfRead(config.ng)];

			return compose.apply(null, functions)
		},
		text: function() {
			var config = this.config;
			var markNG = Posts.markNG(config.ng.wordg);
			var putThumbnails = Posts.putThumbnails(config);
			var truncate = Posts.truncate.bind(Posts, config);
			var checkCharacterEntity = Posts.checkCharacterEntity.bind(Posts, config);

			return compose(
				putThumbnails,
				Posts.characterEntity,
				Posts.createDText(this.mode),
				Posts.prependExtension,
				truncate,
				markNG,
				checkCharacterEntity,
				Posts.checkThumbnails,
				Posts.makeText
			)
		},
		div: function(clazz, content) {
			var el = document.createElement("div");

			el.className = clazz;
			el.innerHTML = content;

			return el
		},
		header: function() {
			var ng = this.config.ng;
			var markNGHeader = ng.handleg ? Posts.markNGHeader(ng.handleg) : identity;
			var classes = "message-header message-header_" + this.mode;

			return function(state) {
				var post = state.post;
				var title = post.title;
				var name = post.name;

				if (post.isNG) {
					title = markNGHeader(title);
					name = markNGHeader(name);
				}

				var header = this.headerContents(state, name, title);

				return this.div(classes, header)
			}.bind(this)
		},
		headerContents: function(state, name, title) {
			var post = state.post;
			var vanish =
				post.rejectLevel === 3
					? ' <a href="javascript:;" class="cancelVanishedMessage">非表示を解除</a>'
					: this.config.useVanishMessage
					? ' <a href="javascript:;" class="toggleMessage">消</a>'
					: "";

			var buttons = post.buttons
				? post.buttons
				: post.resButton +
				  vanish +
				  ifTruthy(state.hide, ' <a href="javascript:;" class="fold">畳む</a>') +
				  " " +
				  post.posterButton +
				  ifTruthy(
						state.hasCharacterEntity,
						' <a href="javascript:;" class="characterEntity' +
							(ifTruthy(state.expandCharacterEntity, " characterEntityOn") +
								'">文字参照</a>')
				  ) +
				  " " +
				  post.threadButton;

			return (
				(post.resButton || '<a target="link">■</a>').replace(
					/^<a/,
					'<a class="res"'
				) +
				'<span class="message-info">' +
				((title === "＞　" || title === " ") && name === "　"
					? ""
					: "<strong>" + title + "</strong> : <strong>" + name + "</strong> #") +
				post.date +
				"</span> " +
				buttons
			)
		},
		env: function(state) {
			if (!state.post.env) {
				return null
			}

			var env =
				'<span class="env">(' + state.post.env.replace(/<br>/, "/") + ")</span>";

			return this.div("extra extra_" + this.mode, this.doEnv(env, state))
		},
		doEnv: identity,
		message: function(header, text, env) {
			var el = document.createElement("div");

			el.appendChild(header);
			el.appendChild(text);

			if (env) {
				el.appendChild(env);
			}

			el.className = "message message_" + this.mode;

			return el
		},
		messageMaker: function() {
			var checker = this.checker();
			var text = this.text();
			var header = this.header();

			return function(post, depth) {
				var dMessage;

				var state = checker({
					post: post,
					value: null,
				});

				if (state.hide && !post.show) {
					dMessage = this.div(
						"showMessage showMessage_" + this.mode,
						this.unfoldButton(state)
					);
				} else {
					state = text(state);
					var dText = state.value;
					var dHeader = header(state);
					var dEnv = this.env(state);

					dMessage = this.message(dHeader, dText, dEnv);
				}

				if (this.config.spacingBetweenMessages) {
					this.setSpacer(dMessage, state.extension);
				}

				if (this.setMargin) {
					this.setMargin(dMessage, depth);
				}

				dMessage.id = post.id;
				dMessage.post = post;

				return dMessage
			}.bind(this)
		},
		unfoldButton: function(state) {
			var rejectLevel = state.post.rejectLevel;
			var reasons = [];

			if (rejectLevel) {
				reasons.push([null, "孫", "子", "個"][rejectLevel]);
			}

			if (state.post.isNG) {
				reasons.push("NG");
			}

			return (
				'<a class="showMessageButton" href="javascript:;">' +
				reasons.join(",") +
				"</a>"
			)
		},
	};

	function ifTruthy(predicate, yes) {
		return predicate ? yes : ""
	}

	function CssView(config) {
		this.config = config;
		this.mode = "tree-mode-css";
		this.containers = null;
		this.pre = function() {
			this.containers = [{dcontainer: this.el}];
		};

		this.border = function(depth) {
			return DOM(
				("<div class=\"messagesWithLine\"><div class=\"border\" style=\"left:" + (depth +
					0.5) + "rem\"></div><div class=\"messageAndChildrenButLast\"></div></div>")
			)
		};

		this.getContainer = function(post, depth) {
			var containers = this.containers;
			var container = containers[containers.length - 1];

			if ("lastChildID" in container && container.lastChildID === post.id) {
				containers.pop();
				container = containers[containers.length - 1];
			}

			var child = post.child;
			if (child && child.next) {
				var lastChild = child;
				do {
					lastChild = lastChild.next;
				} while (lastChild.next)

				var dout = this.border(depth);
				container.dcontainer.appendChild(dout);
				container = {lastChildID: lastChild.id, dcontainer: dout.lastChild};
				containers.push(container);
			}

			return container.dcontainer
		};

		this.setSpacer = function(el) {
			el.classList.add("spacing");
		};

		this.setMargin = function(el, depth) {
			el.style.marginLeft = depth + "rem";
		};
	}
	CssView.prototype = Object.create(AbstractPosts.prototype);

	function AsciiView(config) {
		this.config = config;
		this.mode = "tree-mode-ascii";
		var utterlyVanishMessage = config.utterlyVanishMessage;

		function wrapTree(tag, tree) {
			return ("<" + tag + " class=\"a-tree\">" + tree + "</" + tag + ">")
		}

		function computeExtension(post) {
			var tree = [];
			var parent = post;

			while ((parent = parent.parent)) {
				if (utterlyVanishMessage && parent.rejectLevel) {
					break
				}
				tree.push(parent.next ? "｜" : "　");
			}

			var init = tree.reverse().join("");
			var hasNext = post.next;
			var header = post.isOP() ? "　" : init + (hasNext ? "├" : "└");
			var text = init + (hasNext ? "｜" : "　") + (post.child ? "｜" : "　");

			return {header: header, text: text}
		}

		this.extension = function(state) {
			var extension = computeExtension(state.post);

			state.extension = {
				text: function(state) {
					state.value = state.value.replace(
						/^/gm,
						wrapTree("span", extension.text)
					);

					return state
				},
				header: function(header) {
					return wrapTree("span", extension.header) + header
				},
				env: function(env) {
					return wrapTree("span", extension.text) + env
				},
				spacer: function() {
					var div = wrapTree("div", extension.text);
					return div.replace(/class="/, "$&spacer ")
				},
			};

			return state
		};

		this.checker = function() {
			var checker = AbstractPosts.prototype.checker.call(this);

			return compose(
				this.extension,
				checker
			)
		};

		this.setSpacer = function(el, extension) {
			var spacer = DOM(extension.spacer());
			el.appendChild(spacer);

			var text = el.getElementsByClassName("text")[0];
			if (text) {
				text.insertBefore(spacer.cloneNode(true), text.firstChild);
			}
		};

		var headerContents = AbstractPosts.prototype.headerContents;
		var unfoldButton = AbstractPosts.prototype.unfoldButton;

		this.headerContents = function(state) {
			return state.extension.header(headerContents.apply(this, arguments))
		};

		this.unfoldButton = function(state) {
			return state.extension.header(unfoldButton(state))
		};

		this.doEnv = function(env, state) {
			return state.extension.env(env)
		};
	}
	AsciiView.prototype = Object.create(AbstractPosts.prototype);

	function createView (config, treeMode) {
			if ( treeMode === void 0 ) treeMode = config.treeMode;

			return new {
			"tree-mode-css": CssView,
			"tree-mode-ascii": AsciiView,
		}[treeMode](config);
	}

	function showThread(ref, view) {
		var config = ref.config;
		var el = ref.el;
		if ( view === void 0 ) view = createView(config);

		var mode = config.treeMode;
		var toggleTreeMode =
			mode === "tree-mode-css" && config.toggleTreeMode
				? '　<a href="javascript:;" class="toggleTreeMode">●</a>'
				: "";

		var vanishButtons = config.useVanishThread
			? {
					// class に revert がないが、分岐に使っているのは .NGThread なので気にしないでいい
					true: '　<a href="javascript:;" class="vanish">戻</a>',
					false: '　<a href="javascript:;" class="vanish">消</a>',
			  }
			: {true: "", false: ""};

		var makeThreadHtml = function (ref) {
			var thread = ref.thread;
			var number = ref.number;

			var button = thread.getThreadButton();
			var isVanished = thread.isVanished();
			return (
				"<pre data-thread-id=\"" + (thread.getID()) + "\" class=\"thread " + mode + " " + (isVanished ? "NGThread" : "") + "\">" +
				"<div class=\"thread-header\">" + button + "　更新日：" + (thread.getAppropriateDate()) + "　記事数：" + (number +
					toggleTreeMode +
					vanishButtons[isVanished]) + "　" + button + (thread.getSite()) + "</div>" +
				"<span class=\"messages\"></span></pre>"
			)
		};

		return function doShowThread(thread) {
			var roots = thread.computeRoots();
			var number = thread.getNumber(roots);

			if (!number) {
				return
			}

			var dthread = DOM(makeThreadHtml({thread: thread, number: number}));

			view.render(roots, dthread.lastChild);
			dthread.roots = roots;

			el.appendChild(dthread);
		}
	}

	function showThreads(config, gui, threads) {
		gui.setInfo(" - スレッド構築中");
		var el = gui.getContent();

		return loop(showThread({config: config, el: el}), threads)
	}

	function deleteFooter(container, howManyPosts) {
		var i = container.querySelector("p i");
		if (!i) {
			return
		}

		// <P><I><FONT size="-1">ここまでは、現在登録されている新着順1番目から1番目までの記事っぽい！</FONT></I></P>
		var numPostsInfo = i.parentNode; // === <P>
		var buttons = nextElement("TABLE")(numPostsInfo);
		var end;

		if (buttons && howManyPosts) {
			// ボタンを残す
			end = numPostsInfo;
		} else {
			// ボタンはないか、あるが0件の振りをするため消す
			end = nextElement("HR")(numPostsInfo);
		}

		deleteBetween(numPostsInfo, end);
	}

	function deleteBetween(start, end) {
		var range = document.createRange();

		range.setStartBefore(start);
		range.setEndAfter(end);

		range.deleteContents();
	}

	function suggestLinkToLog(ref) {
		var q = ref.q;
		var gui = ref.gui;
		var posts = ref.posts;
		var href = ref.href; if ( href === void 0 ) href = location.href;

		if (!posts) {
			throw new Error("no posts")
		}

		if (q.shouldSuggestLinkToLog(posts)) {
			var ref$1 = breakDate(new Date());
			var year = ref$1.year;
			var month = ref$1.month;
			var date = ref$1.date;
			var url = href + "&ff=" + year + month + date + ".dat";

			gui.appendExtraInfoHtml(
				(" <a id=\"hint\" href=\"" + url + "\">過去ログを検索する</a>")
			);
		}
	}

	function setPostCount(setPostCount, postLength) {
		var message;
		if (postLength) {
			message = postLength + "件取得";
		} else {
			message = "未読メッセージはありません。";
		}

		setPostCount(message);
	}

	function autovanishThread(config, gui, threads) {
		if (!config.autovanishThread) {
			return
		}

		var ids = threads.filter(function (thread) { return thread.isNG; }).map(function (thread) { return thread.getID(); });

		if (!ids.length) {
			return
		}

		return gui.showSaving(function () { return config.addVanishedThread(ids); })
	}

	var ImaginaryPostPrototype = {
		__proto__: Post.prototype,
		/**
		 * @param {Post} child
		 */
		setFields: function(child) {
			this.id = child.parentId;

			this.parent = null;
			this.next = null;
			this.isNG = null;

			this.threadId = child.threadId;
			this.threadButton = child.threadButton;

			this.parentId = this.isOP() ? null : undefined;

			if (this.id) {
				this.setResButton(child);
			}
		},
		calculate: function(property) {
			var value,
				child = this.child;
			var getCandidate = property + "Candidate";

			if (child.next) {
				var rank = Object.create(null),
					max = 0,
					candidate;
				var validates = getCandidate + "LooksValid";
				var bonus = this[property + "Bonus"];

				do {
					candidate = child[getCandidate]();
					rank[candidate] = ++rank[candidate] || 1;
					if (child[validates](candidate)) {
						rank[candidate] += bonus;
					}
				} while ((child = child.next))

				for (candidate in rank) {
					var number = rank[candidate];
					if (max < number) {
						max = +number;
						value = candidate;
					}
				}
			} else {
				value = child[getCandidate]();
			}

			return Object.defineProperty(this, property, {value: value})[property]
		},
		getText: function() {
			return this.text
		},
		isRead: true,
		setResButton: function(child) {
			this.resButton = child.resButton.replace(/(&amp;s=)\d+/, "$1" + this.id);
		},
		getKeyForOwnParent: function() {
			return this.parentId ? this.parentId : "parent of " + this.id
		},
	};
	Object.defineProperty(ImaginaryPostPrototype, "text", {
		get: function() {
			return this.calculate("text")
		},
	});

	function GhostPost(child) {
		this.setFields(child);
	}
	GhostPost.prototype = Object.create(ImaginaryPostPrototype);
	GhostPost.prototype.date = "？";
	GhostPost.prototype.getIdForcibly = function(postParent) {
		return postParent.findAsync(this.child)
	};

	function MergedPost(child) {
		this.setFields(child);
		this.name = child.title.replace(/^＞/, "");
	}
	MergedPost.prototype = Object.create(ImaginaryPostPrototype, {
		date: {
			get: function() {
				return this.calculate("date")
			},
		},
	});

	function makeParent(post) {
		if (post instanceof MergedPost) {
			return new GhostPost(post)
		} else if (post instanceof Post) {
			return new MergedPost(post)
		} else {
			throw new Error("should not be called")
		}
	}

	function Thread(config, postParent) {
		this.config = config;
		this.postParent = postParent;
		this.posts = [];
		this.isNG = false;
		this.allPosts = Object.create(null);
	}
	Thread.computeRejectLevelForRoot = function(
		vanishedMessageIDs,
		postParent,
		id,
		level
	) {
		if (!id || level === 0) {
			return 0
		}

		if (vanishedMessageIDs.indexOf(id) > -1) {
			return level
		}

		return Thread.computeRejectLevelForRoot(
			vanishedMessageIDs,
			postParent,
			postParent.get(id),
			level - 1
		)
	};
	Thread.inheritRejectLevel = function(vanishedMessageIDs, post, generation) {
		if (!post) {
			return
		}

		var rejectLevel = 0;

		if (vanishedMessageIDs.indexOf(post.id) > -1) {
			rejectLevel = 3;
		} else if (generation > 0) {
			rejectLevel = generation;
		}

		post.rejectLevel = rejectLevel;

		Thread.inheritRejectLevel(vanishedMessageIDs, post.child, rejectLevel - 1);
		Thread.inheritRejectLevel(vanishedMessageIDs, post.next, generation);
	};

	Thread.prototype = {
		addPost: function(post) {
			this.posts.push(post);
			this.allPosts[post.id] = post;

			if (post.isNG) {
				this.isNG = true;
			}
		},
		computeRoots: function() {
			var roots = this.computeRoots2();

			if (!this.config.useVanishMessage) {
				return roots
			}

			if (!this.shouldSetRejectLevel()) {
				return roots
			}

			this.setRejectLevel(roots);

			if (!this.config.utterlyVanishMessage) {
				return roots
			}

			return this.dropRejectedPosts(roots)
		},
		computeRoots2: function() {
			return this.computeRoots2ndPass(this.computeRoots1stPass())
		},
		computeRoots1stPass: function() {
			this.makeFamilyTree();

			var orphans = this.posts.filter(Post.isOrphan);

			this.connect(orphans);

			return this.getRootCandidates().sort(Post.byID)
		},
		makeFamilyTree: function() {
			this.posts.filter(Post.wantsParent).forEach(this.adopt, this);
		},
		connect: function(orphans) {
			orphans.forEach(this.makeParent, this);
			orphans.forEach(this.adopt, this);
		},
		getRootCandidates: function() {
			return Object.values(this.allPosts).filter(Post.isRootCandidate)
		},
		computeRoots2ndPass: function(roots) {
			var orphans = roots.filter(Post.mayHaveParent);

			orphans.forEach(this.readParentId, this);

			this.connect(orphans);

			return this.getRootCandidates().sort(this.byID)
		},
		readParentId: function(post) {
			post.parentId = this.postParent.get(post.id);
		},
		makeParent: function(orphan) {
			var key = orphan.getKeyForOwnParent();
			this.allPosts[key] = this.allPosts[key] || makeParent(orphan);
		},
		byID: function(l, r) {
			var lid = l.id ? l.id : l.child.id;
			var rid = r.id ? r.id : r.child.id;

			return lid - rid
		},
		adopt: function(post) {
			var parent = this.allPosts[post.getKeyForOwnParent()];
			if (!parent) {
				return
			}

			parent.adoptAsEldestChild(post);
		},
		shouldSetRejectLevel: function() {
			return this.getSmallestMessageID() <= this.getThreshold()
		},
		getThreshold: function() {
			return +this.config.vanishedMessageIDs[0]
		},
		getSmallestMessageID: function(keys) {
			if ( keys === void 0 ) keys = Object.keys;

			return keys(this.allPosts).sort(this.byNumber)[0]
		},
		byNumber: function(l, r) {
			return l - r
		},

		setRejectLevel: function(roots) {
			var vanishedMessageIDs = this.config.vanishedMessageIDs;
			var computeRejectLevelForRoot = Thread.computeRejectLevelForRoot;
			var postParent = this.postParent;

			for (var i = roots.length - 1; i >= 0; i--) {
				var root = roots[i];
				var child = root.child;
				var id = root.id;

				if (id) {
					root.rejectLevel = computeRejectLevelForRoot(
						vanishedMessageIDs,
						postParent,
						id,
						3
					);
				}

				if (child) {
					Thread.inheritRejectLevel(
						vanishedMessageIDs,
						child,
						root.rejectLevel - 1
					);
				}
			}

			return roots
		},
		dropRejectedPosts: function(roots) {
			var newRoots = [];
			function drop(post, isRoot) {
				if (!post) {
					return null
				}

				var child = drop(post.child, false);
				var next = drop(post.next, false);

				var isRead = post.isRead;
				if (!child && isRead) {
					return next
				}

				post.child = child;
				post.next = next;

				var rejectLevel = post.rejectLevel;
				if (isRoot && rejectLevel === 0) {
					newRoots.push(post);
				} else if (rejectLevel === 1 && child) {
					newRoots.push(child);
				}

				return rejectLevel === 3 ? next : post
			}

			for (var i = roots.length - 1; i >= 0; i--) {
				drop(roots[i], true);
			}

			return newRoots.sort(Post.byID)
		},
		getDate: function() {
			return this.posts[0].date
		},
		getAppropriateDate: function() {
			if (this.config.utterlyVanishMessage) {
				return this.posts.filter(Post.isClean)[0].date
			} else {
				return this.getDate()
			}
		},
		getNumber: function() {
			return this.posts.filter(Post.isClean).length
		},
		getID: function() {
			return this.posts[0].threadId
		},
		getThreadButton: function() {
			return this.posts[0].threadButton
		},
		getSite: function() {
			return this.posts[0].site
		},
		isVanished: function isVanished() {
			return this.config.isVanishedThread(this.getID())
		},
	};

	function makeThreads(config, postParent, posts) {
		var allThreads = Object.create(null);
		var threads = [];

		posts.forEach(function(post) {
			var id = post.threadId;
			var thread = allThreads[id];
			if (!thread) {
				thread = allThreads[id] = new Thread(config, postParent);
				threads.push(thread);
			}

			thread.addPost(post);
		});

		return threads
	}

	function sortThreads(config, threads) {
		if (config.threadOrder === "ascending") {
			threads.reverse();
		}
	}

	function excludeVanishedThreads (config, threads) { return config.utterlyVanishNGThread
			? threads.filter(function (thread) { return !thread.isVanished(); })
			: threads; }

	function buildAndShowThreads(ref) {
		var config = ref.config;
		var q = ref.q;
		var gui = ref.gui;
		var container = ref.container;
		var postParent = ref.postParent; if ( postParent === void 0 ) postParent = createPostParent(config);

		var posts = makePosts(container);

		var mPosts = complementMissingPostsFromLog({q: q, gui: gui, container: container, posts: posts});
		mPosts.then(function (posts) { return postParent.saveAsyncIfNeeded(posts); });
		mPosts = mPosts
			.then(function (posts) { return processNg(config, posts); })
			.then(function (posts) { return shouldMakeUrlsSearchLog(q, posts); });

		var gotAllowedToTweakContainer = mPosts.then(function (posts) { return deleteFooter(container, posts.length); }
		);

		var gotDone = mPosts.then(function (posts) {
			suggestLinkToLog({q: q, gui: gui, posts: posts});

			var threads = makeThreads(config, postParent, posts);

			autovanishThread(config, gui, threads);

			threads = excludeVanishedThreads(config, threads);

			sortThreads(config, threads);

			setPostCount(
				gui.setPostCount,
				threads.reduce(function (total, thread) { return total + thread.posts.length; }, 0)
			);

			gui.addEventListeners(config, postParent);

			var done = showThreads(config, gui, threads);

			done.then(function (done) { return postParent.cleanUpLater(done); });

			done.then(function (done) { return gui.clearInfo(done); });

			return done.then(function () { return posts; })
		});
		return {gotDone: gotDone, gotAllowedToTweakContainer: gotAllowedToTweakContainer}
	}

	function midokureload() {
		var midoku = document.querySelector('#form input[name="midokureload"]');
		if (midoku) {
			midoku.click();
		} else {
			location.reload();
		}
	}

	function clickQtvReload(form) {
		form.querySelector("#qtv-reload").click();
	}

	function reload() {
		var form = document.getElementById("form");
		if (!form) {
			location.reload();
			return
		}

		var reload = document.getElementById("qtv-reload");
		if (!reload) {
			form.insertAdjacentHTML(
				"beforeend",
				'<input type="submit" id="qtv-reload" name="reload" value="1" style="display:none;">'
			);
		}

		clickQtvReload(form);
	}

	function createReload (config) {
		var reload = '<input type="button" value="リロード" class="mattari">';

		if (!config.zero) {
			reload = reload.replace("mattari", "reload");
			reload += '<input type="button" value="未読" class="mattari">';
		}

		return reload
	}

	function focusV () {
		setTimeout(function() {
			document.getElementsByName("v")[0].focus();
		}, 50);
	}

	function getAccesskey(config) {
		var accesskey = config.accesskeyReload;
		return /^\w$/.test(accesskey) ? accesskey : "R"
	}

	function getCounterAndViewing(body) {
		var hr = body.getElementsByTagName("hr")[0];
		if (hr) {
			var font = hr.previousElementSibling;
			if (font && font.tagName === "FONT") {
				// eslint-disable-next-line
				// 2005/03/01 から counter（こわれにくさレベル4）　現在の参加者 : viewing名 (300秒以内)
				var ref = font.textContent.match(/[\d,]+/g) || [];
				var counter = ref[3];
				var viewing = ref[5];
				return (counter + " / " + viewing + " 名")
			}
		}

		return ""
	}

	function createTreeGuiContainer (config, body) {
		var el = document.createElement("div");
		el.id = "container";
		el.innerHTML =
			headerTemplate(config, body) +
			'<div id="content"></div><hr>' +
			footerTemplate(config);

		if (config.ng.message) {
			el.querySelector("#header").lastElementChild.insertAdjacentHTML(
				"beforebegin",
				config.ng.message
			);
		}

		//event
		var click = on.bind(null, el, "click");
		click(".reload", reload);
		click(".mattari", midokureload);
		click(".goToForm", focusV);
		addClearVanishEvent(config, click);

		var header = el.firstElementChild;
		var firstChildOfHeader = header.firstElementChild;
		var info = firstChildOfHeader.lastElementChild;
		var postcount = info.previousElementSibling;

		return {
			container: el,
			info: info,
			postcount: postcount,
			content: header.nextSibling,
			footer: el.lastChild,
		}
	}

	var addClearVanishEvent = function (config, click) {
	["Message", "Thread"].forEach(function (type) {
			var id = "clearVanished" + type + "IDs";
			click("#" + id, function (e) {
				e.preventDefault();
				clearVanishedIds(config, id, e.target);
			});
		});
	};

	function headerTemplate(config, body) {
		var reload$$1 = createReload(config);
		var accesskey = getAccesskey(config);
		var counterAndViewing = getCounterAndViewing(body);

		return ("\n\t\t<header id=\"header\">\n\t\t\t<span>\n\t\t\t\t" + (reload$$1.replace(
						'class="mattari"',
						("$& title=\"ヽ(´ー｀)ノロード\" accesskey=\"" + accesskey + "\"")
					)) + "\n\t\t\t\t" + counterAndViewing + "\n\t\t\t\t<span id=\"postcount\"></span>\n\t\t\t\t<span id=\"info\">ダウンロード中...</span>\n\t\t\t</span>\n\t\t\t<span>\n\t\t\t\t<a href=\"javascript:;\" id=\"openConfig\">設定</a>\n\t\t\t\t<a href=\"#link\">link</a>\n\t\t\t\t<a href=\"#form\" class=\"goToForm\">投稿フォーム</a>\n\t\t\t\t" + reload$$1 + "\n\t\t\t</span>\n\t\t</header>")
	}

	function footerTemplate(config) {
		var reload$$1 = createReload(config);
		var length = {
			Thread: config.vanishedThreadIDs.length,
			Message: config.vanishedMessageIDs.length,
		};
		var hidden = length.Thread || length.Message ? "" : "hidden";

		var count = function (type, text) { return ("<a id=\"clearVanished" + type + "IDs\" href=\"javascript:;\"><span class=\"count\">" + (length[type]) + "</span>" + text + "</a>"); };

		return ("\n\t\t<footer id=\"footer\">\n\t\t\t<span>\n\t\t\t\t" + reload$$1 + "\n\t\t\t</span>\n\t\t\t<span>\n\t\t\t\t<span class=\"clearVanishedButtons " + hidden + "\">\n\t\t\t\t\t非表示解除(" + (count("Thread", "スレッド")) + "/" + (count("Message", "投稿")) + ")\n\t\t\t\t</span>\n\t\t\t\t" + reload$$1 + "\n\t\t\t</span>\n\t\t</footer>")
	}

	function setText (node) { return function (text) {
		node.textContent = text;
	}; }

	function setHtml (element) { return function (html) {
		element.innerHTML = html;
	}; }

	function appendHtmlAfter (node) { return function (html) {
		node.insertAdjacentHTML("afterend", html);
	}; }

	function showSaving (config, footer) { return function (execute) {
		var buttons = footer.querySelector(".clearVanishedButtons");
		buttons.insertAdjacentHTML(
			"beforebegin",
			'<span class="savingVanishedThreadIDs">非表示スレッド保存中</span>'
		);

		return execute().then(function showSaved() {
			var saving = buttons.previousElementSibling;
			saving.parentNode.removeChild(saving);

			var threadLength = config.vanishedThreadIDs.length;

			if (threadLength) {
				buttons.querySelector(
					"#clearVanishedThreadIDs .count"
				).textContent = threadLength;
				buttons.classList.remove("hidden");
			}
		})
	}; }

	var HideMessage = {
		changeTextState: function() {
			this.text.style.display = "none";
		},
		changeButtonText: function() {
			this.button.textContent = "戻";
		},
		save: function() {
			this.config.addVanishedMessage(this.post.id);
		},
		setRejectLevel: function() {
			var post = this.post;
			post.previousRejectLevel = post.rejectLevel;
			post.rejectLevel = 3;
		},
		shouldProcess: function(post, rejectLevel) {
			return post.rejectLevel < rejectLevel
		},
		setChildRejectLevel: function(post, rejectLevel) {
			post.rejectLevel = rejectLevel;
		},
		processMarking: function(message) {
			if (!message.querySelector(".chainingHidden")) {
				message.firstElementChild.classList.add("chainingHidden");
			}
		},
	};

	var ShowMessage = {
		changeTextState: function() {
			this.text.style.display = null;
		},
		changeButtonText: function() {
			this.button.textContent = "消";
		},
		save: function() {
			this.config.removeVanishedMessage(this.post.id);
		},
		setRejectLevel: function() {
			var post = this.post;
			post.rejectLevel = post.previousRejectLevel;
		},
		shouldProcess: function(post, rejectLevel) {
			return post.rejectLevel <= rejectLevel
		},
		setChildRejectLevel: function(post, _rejectLevel) {
			post.rejectLevel = 0;
		},
		processMarking: function(message) {
			var mark = message.querySelector(".chainingHidden");
			if (mark) {
				mark.classList.remove("chainingHidden");
			}
		},
	};

	function ToggleMessage(config, postParent) {
		this.config = config;
		this.postParent = postParent;
	}
	ToggleMessage.prototype.handleEvent = function(e) {
		this.button = e.target;
		this.message = this.button.closest(".message");
		this.messages = this.message.closest(".messages");
		this.text = this.message.querySelector(".text");
		this.post = this.message.post;

		return this.execute()
	};
	ToggleMessage.prototype.execute = function() {
		return this.setIDToPost()
			.then(this.toggle.bind(this))
			.catch(this.error.bind(this))
	};
	ToggleMessage.prototype.toggle = function() {
		this.setRejectLevel();

		this.save();

		this.changeTextState();
		this.changeButtonState();

		this.setChildrensRejectLevel(this.post.child, 2);
	};
	ToggleMessage.prototype.changeButtonState = function() {
		this.toggleButtonState();
		this.changeButtonText();
	};
	ToggleMessage.prototype.toggleButtonState = function() {
		this.button.classList.toggle("revert");
	};
	ToggleMessage.prototype.isRevertButton = function() {
		return this.button.classList.contains("revert")
	};
	ToggleMessage.prototype.error = function(error) {
		this.button.parentNode.replaceChild(
			document.createTextNode(error.message),
			this.button
		);
	};
	ToggleMessage.prototype.setIDToPost = function() {
		var this$1 = this;

		return this.findPostID().then(function (id) {
			if (!id) {
				return Promise.reject(
					new Error(
						"最新1000件以内に存在しないため投稿番号が取得できませんでした。過去ログからなら消せるかもしれません"
					)
				)
			}

			if (id.length > 100) {
				return Promise.reject(new Error("この投稿は実在しないようです"))
			}

			this$1.post.id = id;
		})
	};
	ToggleMessage.prototype.findPostID = function() {
		var post = this.post;
		var id = post.id;
		if (id === undefined) {
			id = post.getIdForcibly(this.postParent);
		}

		return Promise.resolve(id)
	};
	ToggleMessage.prototype.setChildrensRejectLevel = function(post, rejectLevel) {
		if (post === null || rejectLevel === 0) {
			return
		}

		if (this.shouldProcess(post, rejectLevel)) {
			this.setChildRejectLevel(post, rejectLevel);

			var message = this.getTargetMessage(post);
			if (message) {
				this.processMarking(message);
			}
		}

		this.setChildrensRejectLevel(post.child, rejectLevel - 1);
		this.setChildrensRejectLevel(post.next, rejectLevel);
	};
	ToggleMessage.prototype.getTargetMessage = function(post) {
		return this.messages.querySelector(("[id=\"" + (post.id) + "\"]"))
	};

	function ToggleMessageDispatcher(config, postParent) {
		this.config = config;
		this.postParent = postParent;
	}
	ToggleMessageDispatcher.prototype.handleEvent = function(e) {
		e.preventDefault();

		var handler = this.makeHandler(e);

		return handler.handleEvent(e)
	};
	ToggleMessageDispatcher.prototype.makeHandler = function(e) {
		var handler = new ToggleMessage(this.config, this.postParent);

		if (e.target.classList.contains("revert")) {
			Object.assign(handler, ShowMessage);
		} else {
			Object.assign(handler, HideMessage);
		}

		return handler
	};

	function getTreeMode (node) {
		return node.closest(".tree-mode-css") ? "tree-mode-css" : "tree-mode-ascii"
	}

	function replace (config, change) { return function (e) {
		e.preventDefault();

		var message = e.target.closest(".message, .showMessage");
		var parent = message.parentNode;
		var post = message.post;
		var view = createView(config, getTreeMode(message));
		var maker = view.messageMaker();
		var depth = parseInt(message.style.marginLeft, 10);

		change(post);

		var newMessage = maker(post, depth);

		parent.replaceChild(newMessage, message);
	}; }

	function showAsIs (config) { return function (e) {
		function callback(post) {
			post.showAsIs = !post.showAsIs;
		}

		var target = e.target;
		var id = setTimeout(replace(config, callback), 500, e);
		var cancel = function() {
			clearTimeout(id);
			target.removeEventListener("mouseup", cancel);
			target.removeEventListener("mousemove", cancel);
		};

		target.addEventListener("mouseup", cancel);
		target.addEventListener("mousemove", cancel);
	}; }

	function toggleTreeMode (config) { return function (e) {
		e.preventDefault();

		var button = e.target;
		var thread = button.closest(".thread");

		thread.classList.toggle("tree-mode-css");
		thread.classList.toggle("tree-mode-ascii");

		var view = createView(config, getTreeMode(thread));
		var newMessages = view.render(thread.roots);

		thread.replaceChild(newMessages, thread.querySelector(".messages"));
	}; }

	function toggleThread (config) { return function (e) {
		var button = e.target;
		var thread = button.closest(".thread");
		var id = thread.dataset.threadId;
		var type, text;

		if (thread.classList.contains("NGThread")) {
			type = "remove";
			text = "消";
		} else {
			type = "add";
			text = "戻";
		}
		type += "VanishedThread";

		config[type](id);
		thread.classList.toggle("NGThread");
		button.textContent = text;
	}; }

	function addEventListeners(ref) {
		var config = ref.config;
		var postParent = ref.postParent;
		var el = ref.el;

		function click(selector, callback) {
			on(el, "click", selector, replace(config, callback));
		}

		click(".characterEntity", function(post) {
			post.characterEntity = !(post.hasOwnProperty("characterEntity")
				? post.characterEntity
				: config.characterEntity);
		});

		click(".showMessageButton", function(post) {
			post.show = true;
		});

		click(".cancelVanishedMessage", function(post) {
			config.removeVanishedMessage(post.id);
			delete post.rejectLevel;
		});

		click(".fold", function(post) {
			post.show = false;
		});

		on(el, "mousedown", ".message", showAsIs(config));

		click(".toggleTruncation", function(post) {
			post.truncation = post.hasOwnProperty("truncation")
				? !post.truncation
				: false;
		});

		if (config.useVanishMessage) {
			on(
				el,
				"click",
				".toggleMessage",
				new ToggleMessageDispatcher(config, postParent)
			);
		}

		on(el, "click", ".vanish", toggleThread(config));

		on(el, "click", ".toggleTreeMode", toggleTreeMode(config));
	}

	function createGui (config, body) {
		if ( body === void 0 ) body = document.body;

		var ref = createTreeGuiContainer(
			config,
			body
		);
		var container = ref.container;
		var info = ref.info;
		var postcount = ref.postcount;
		var content = ref.content;
		var footer = ref.footer;

		return {
			setInfo: setText(info),
			setInfoHtml: setHtml(info),
			clearInfo: function () { return setText(info)(""); },
			appendExtraInfoHtml: appendHtmlAfter(info),
			setPostCount: setText(postcount),
			getContent: function () { return content; },
			addEventListeners: function (config, postParent) { return addEventListeners({config: config, postParent: postParent, el: content}); },
			showSaving: showSaving(config, footer),
			prependToBody: function prependToBody() {
				body.insertBefore(container, body.firstChild);
			},
		}
	}

	function originalRange(container, range) {
		if ( range === void 0 ) range = document.createRange();

		var firstAnchor = container.querySelector("a[name]");
		if (!firstAnchor) {
			return range
		}

		var end = kuzuhaEnd(container);
		if (!end) {
			return range
		}

		var start = startNode(container, firstAnchor);

		range.setStartBefore(start);
		range.setEndAfter(end);

		return range
	}

	function startNode(container, firstAnchor) {
		var h1 = container.querySelector("h1");
		if (
			h1 &&
			h1.compareDocumentPosition(firstAnchor) & Node.DOCUMENT_POSITION_FOLLOWING
		) {
			return h1
		} else {
			return firstAnchor
		}
	}

	function kuzuhaEnd(container) {
		var last = container.lastChild;
		while (last) {
			var type = last.nodeType;
			if (
				(type === Node.COMMENT_NODE && last.nodeValue === " ") ||
				(type === Node.ELEMENT_NODE && last.nodeName === "H3")
			) {
				return last
			}

			last = last.previousSibling;
		}

		return null
	}

	var StreamTreeView = function StreamTreeView(args) {
		Object.assign(this, args);
		this.gui = createGui(this.config, this.body);
	};
	StreamTreeView.prototype.init = function init () {
		this.gui.prependToBody();
	};
	StreamTreeView.prototype.finish = function finish (buffer) {
			var this$1 = this;

		var ref = this;
			var config = ref.config;
			var gui = ref.gui;
			var q = ref.q;

		var ref$1 = buildAndShowThreads({
			config: config,
			q: q,
			gui: gui,
			container: buffer,
		});
			var gotDone = ref$1.gotDone;
			var gotAllowedToTweakContainer = ref$1.gotAllowedToTweakContainer;

		this.prepareToggleOriginal(buffer, gotDone);

		gotAllowedToTweakContainer.then(function () { return this$1.appendLeftovers(buffer); });

		return gotDone.then(this.done)
	};
	StreamTreeView.prototype.appendLeftovers = function appendLeftovers (buffer) {
		this.body.appendChild(buffer);
	};
	StreamTreeView.prototype.prepareToggleOriginal = function prepareToggleOriginal (buffer, done) {
		var range = originalRange(buffer);

		if (this.config.deleteOriginal) {
			range.deleteContents();
		} else {
			var original = range.extractContents();
			return Promise.all([original, done]).then(
				this.appendToggleOriginal.bind(this)
			)
		}
	};
	StreamTreeView.prototype.appendToggleOriginal = function appendToggleOriginal (ref) {
			var original = ref[0];
			var posts = ref[1];

		if (!original || !posts.length) {
			return
		}

		var toggle = new ToggleOriginal(original);
		this.buffer.insertBefore(toggle.getUI());
	};

	var createView$1 = function(ref) {
		var config = ref.config;
		var q = ref.q;
		var buffer = ref.buffer;
		var body = ref.body; if ( body === void 0 ) body = document.body;
		var done = ref.done;

		if (config.isTreeView()) {
			return new StreamTreeView({config: config, body: body, q: q, buffer: buffer, done: done})
		} else {
			var view = new StackView(config);
			var log = new StackLog(config, q, body, view);

			return new StreamStackView({config: config, body: body, buffer: buffer, view: view, log: log, done: done})
		}
	};

	function initView (ref) {
		var config = ref.config;
		var q = ref.q;
		var buffer = ref.buffer;
		var done = ref.done;

		var view = createView$1({config: config, q: q, buffer: buffer, done: done});
		view.init();
		return buffer.setView(view)
	}

	function getTitle() {
		return document.title
	}

	function sendMessageToRuntime(message) {
		chrome.runtime.sendMessage(message);
	}

	function CloseResWindow() {}
	CloseResWindow.prototype.close = function() {
		if (IS_EXTENSION) {
			sendMessageToRuntime({type: "closeTab"});
		} else {
			window.open("", "_parent");
			window.close();
		}
	};

	function shouldCloseWindow(config, title) {
		return config.closeResWindow && title.endsWith(" 書き込み完了")
	}

	function closeWindowIfNeeded (gotConfig) { return gotConfig.then(function (config) {
			var title = getTitle();
			if (shouldCloseWindow(config, title)) {
				new CloseResWindow().close();
			}
		}); }

	function streamMain (gotConfig, q, execute) {
		var loaded = waitForDomContentLoaded();
		var observer = new Observer(loaded);
		var notice = createDelayNotice(gotConfig);
		var buffer = new Buffer();

		observer.addListener({
			onHr: function () { return execute(function (config, done) { return initView({config: config, q: q, buffer: buffer, done: done}); }); },
			onLoaded: function () { return closeWindowIfNeeded(gotConfig); },
		});

		observer.addListener(notice);
		observer.addListener(buffer);

		observer.observe();
	}

	function deleteOriginal(config, body) {
		if (config.deleteOriginal) {
			originalRange(body).deleteContents();
		}
	}

	function detachBody () {
		var body = document.body;
		if (IS_FIREFOX) {
			document.documentElement.removeChild(body);
		}
		return body
	}

	function attachToDocumentElement (body) {
		if (IS_FIREFOX) {
			document.documentElement.appendChild(body);
		}
	}

	function tree(config, q) {
		var body = detachBody();
		try {
			var gui = createGui(config, body);

			var ref = buildAndShowThreads({
				config: config,
				q: q,
				gui: gui,
				container: body,
			});
			var gotDone = ref.gotDone;
			var gotAllowedToTweakContainer = ref.gotAllowedToTweakContainer;

			gotAllowedToTweakContainer.then(function () { return deleteOriginal(config, body); });

			gui.prependToBody();

			return gotDone
		} finally {
			attachToDocumentElement(body);
		}
	}

	function stack(config, q, body) {
		if ( body === void 0 ) body = document.body;

		Stack.common(config, body);

		var view = new StackView(config);
		var log = new StackLog(config, q, body, view);

		var complement = log.complement();
		var render = Stack.render(config, body, view);
		var tweakFooter = Stack.tweakFooter(config, body, render);

		return Promise.all([complement, render, tweakFooter])
	}

	function runProperView (config, q) { return (config.isTreeView() ? tree : stack)(config, q); }

	function endMain (gotConfig, q, execute) { return ready().then(function () {
			closeWindowIfNeeded(gotConfig);

			return execute(function (config, done) { return runProperView(config, q).then(done); })
		}); }

	function whenToExecute (win, isUsamin) {
		if ( win === void 0 ) win = window;
		if ( isUsamin === void 0 ) isUsamin = IS_USAMIN;

		return isUsamin ? endMain : win.MutationObserver ? streamMain : endMain
	}

	function tweak(body) {
		var v = body.querySelector("textarea");
		if (v) {
			v.focus(); // Firefox needs focus before setSelectionRange.
			v.scrollIntoView();
			// 内容を下までスクロール firefox, opera12
			v.setSelectionRange(v.textLength, v.textLength);
			// 内容を下までスクロール chrome
			v.scrollTop = v.scrollHeight;
		}
	}

	function tweakResWindow () { return ready()
			.then(getBody)
			.then(tweak); }

	var css = "\n.text {\n\twhite-space: pre-wrap;\n}\n.text, .extra {\n\tmin-width: 20rem;\n}\n.text_tree-mode-css, .extra_tree-mode-css {\n\tmargin-left: 1rem;\n}\n.env {\n\tfont-family: initial;\n\tfont-size: smaller;\n}\n\n.thread-header {\n\tbackground: #447733 none repeat scroll 0 0;\n\tborder-color: #669955 #225533 #225533 #669955;\n\tborder-style: solid;\n\tborder-width: 1px 2px 2px 1px;\n\tfont-size: 0.8rem;\n\tfont-family: normal;\n\tmargin-top: 0.8rem;\n\tpadding: 0;\n\twidth: 100%;\n}\n\n.message-header {\n\twhite-space: nowrap;\n}\n.message-header_tree-mode-css {\n\tfont-size: 0.85rem;\n\tfont-family: normal;\n}\n.message-info {\n\tfont-family: monospace;\n\tcolor: #87CE99;\n}\n\n.read, .quote {\n\tcolor: #CCB;\n}\nheader, footer {\n\tdisplay: flex;\n\tfont-size: 0.9rem;\n\tjustify-content: space-between;\n}\n.thread {\n\tmargin-bottom: 1rem;\n\toverflow: initial;\n}\n.modified {\n\tcolor: #FBB\n}\n.note, .characterEntityOn, .env {\n\tfont-style: italic;\n}\n.chainingHidden::after {\n\tcontent: \"この投稿も非表示になります\";\n\tfont-weight: bold;\n\tfont-style: italic;\n\tcolor: red;\n}\n.a-tree {\n\tfont-style: initial;\n\tvertical-align: top;\n}\n\n.messagesWithLine {\n\tdisplay: flex;\n\tflex-flow: row;\n}\n.border {\n\tborder-left: 1px solid #ADB;\n\ttop: 1rem;\n\tposition: relative;\n}\n.messageAndChildrenButLast {\n\tposition: relative;\n\tleft: -1px;\n}\n\n.thumbnail-img {\n\twidth: 80px;\n\tmax-height: 400px;\n\timage-orientation: from-image;\n}\n#image-view {\n\tposition: fixed;\n\ttop: 50%;\n\tleft: 50%;\n\ttransform: translate(-50%, -50%);\n\tbackground: #004040;\n\tcolor: white;\n\tfont-weight: bold;\n\tfont-style: italic;\n\tmargin: 0;\n\timage-orientation: from-image;\n}\n.image-view-img {\n\tbackground-color: white;\n}\n\n.focused {\n\tbox-shadow: 0px 0px 0px 2px yellow;\n}\n.truncation, .NGThread .messages, .hidden {\n\tdisplay: none;\n}\n.spacing {\n\tpadding-bottom: 1rem;\n}\n.spacer:first-child {\n\tdisplay: none;\n}\n";

	function applyCss(config) {
		document.head.insertAdjacentHTML(
			"beforeend",
			("<style>" + (css + config.css) + "</style>")
		);
	}

	function zero(config) {
		if (config.zero) {
			var d = document.getElementsByName("d")[0];
			if (d && d.value !== "0") {
				d.value = "0";
			}
		}
	}

	var id;
	function progress(after, controller, fun) {
		clearTimeout(id);
		var info = controller.$("#configInfo");
		info.textContent = "保存中";
		setTimeout(function () {
			fun().then(function () {
				info.textContent = after;
				id = setTimeout(function () {
					info.innerHTML = "";
				}, 5000);
			});
		});
	}

	function ConfigController(item) {
		var this$1 = this;

		this.item = item;
		var el = document.createElement("form");
		el.id = "config";
		this.el = el;

		var events = [
			"save",
			"clear",
			"close",
			"showExport",
			"showImport",
			"import",
			"clearVanishThread",
			"clearVanishMessage",
			"addToNGWord" ];
		for (var i = events.length - 1; i >= 0; i--) {
			var event = events[i];
			on(el, "click", "#" + event, this[event].bind(this));
		}

		on(el, "keyup", "#quote-input", this.quotemeta.bind(this));

		this.render();

		this.invalidRegExp = {}
		;["#NGWord", "#NGHandle"].forEach(function (target) {
			on(el, "input", target, this$1.validateRegExp.bind(this$1, target));
			this$1.validateRegExp(target);
		});

		if (this.isRegExpIsInvalid()) {
			this.showRegExpNotes();
		}
	}
	ConfigController.prototype = {
		/**
		 * @returns {HTMLElement}
		 */
		$: function(selector) {
			return this.el.querySelector(selector)
		},
		/** @returns {[HTMLElement]} */
		$$: function(selector) {
			return Array.prototype.slice.call(this.el.querySelectorAll(selector))
		},
		render: function() {
			this.el.innerHTML = this.template();
			if (IS_EXTENSION) {
				var close = this.$("#close");
				close.parentNode.removeChild(close);
			}
			this.restore();
		},
		template: function() {
			return '<style type="text/css">\
            <!--\
                li {\
                    list-style-type: none;\
                }\
                #configInfo {\
                    font-weight: bold;\
                    font-style: italic;\
                }\
                legend + ul {\
                    margin: 0 0 0 0;\
                }\
            -->\
            </style>\
            <fieldset>\
                <legend>設定</legend>\
                <fieldset>\
                    <legend>表示</legend>\
                    <ul>\
                        <li><label><input type="radio" name="viewMode" value="t">ツリー表示</label></li>\
                        <li><label><input type="radio" name="viewMode" value="s">スタック表示</label></li>\
                    </ul>\
                </fieldset>\
                <fieldset>\
                    <legend>共通</legend>\
                    <ul>\
                        <li><label><input type="checkbox" name="zero">常に0件リロード</label><em>（チェックを外しても「表示件数」は0のままなので手動で直してね）</em></li>\
                        <li><label>未読リロードに使うアクセスキー<input type="text" name="accesskeyReload" size="1"></label></li>\
                        <li><label>内容欄へのアクセスキー<input type="text" name="accesskeyV" size="1"></label></li>\
                        <li><label><input type="checkbox" name="keyboardNavigation">jkで移動、rでレス窓開く</label><em><a href="@GF@#keyboardNavigation">chrome以外の人は説明を読む</a></em></li>\
                        <ul>\
                            <li><label>上から<input type="text" name="keyboardNavigationOffsetTop" size="4">pxの位置に合わせる</label></li>\
                        </ul>\
                        <li><label><input type="checkbox" name="closeResWindow">書き込み完了した窓を閉じる</label> <em><a href="@GF@#close-tab-in-firefox">firefoxは説明を読むこと</a></em><li>\
                        <li><label><input type="checkbox" name="openLinkInNewTab">target属性の付いたリンクを常に新しいタブで開く</label></li>\
                    </ul>\
                </fieldset>\
                <fieldset>\
                    <legend>ツリーのみ</legend>\
                    <ul style="display:inline-block">\
                        <li><label><input type="checkbox" name="deleteOriginal">元の投稿を非表示にする</label>（高速化）</li>\
                        <li>スレッドの表示順\
                            <ul>\
                                <li><label><input type="radio" name="threadOrder" value="ascending">古→新</label></li>\
                                <li><label><input type="radio" name="threadOrder" value="descending">新→古</label></li>\
                            </ul>\
                        </li>\
                        <li>ツリーの表示に使うのは\
                            <ul>\
                                <li><label><input type="radio" name="treeMode" value="tree-mode-css">CSS</label></li>\
                                <li><label><input type="radio" name="treeMode" value="tree-mode-ascii">文字</label></li>\
                            </ul>\
                        </li>\
                        <li><label><input type="checkbox" name="spacingBetweenMessages">記事の間隔を開ける</label></li>\
                        <li><label><input type="text" name="maxLine" size="2">行以上は省略する</label></li>\
                        <li><label><input type="checkbox" name="characterEntity">数値文字参照を展開</label> <em>（&#数字;が置き換わる）</em></li>\
                        <li><label><input type="checkbox" name="toggleTreeMode">CSSツリー時にスレッド毎に一時的な文字/CSSの切り替えが出来るようにする</label></li>\
                    </ul>\
                    <fieldset style="display:inline-block">\
                        <legend>投稿非表示設定</legend>\
                        <ul>\
                            <li><label><input type="checkbox" name="useVanishMessage">投稿非表示機能を使う</label> <em>使う前に<a href="@GF@#vanish">投稿非表示機能の注意点</a>を読むこと。</em><li>\
                            <ul>\
                                <li><span id="vanishedMessageIDs"></span>個の投稿を非表示中<input type="button" value="クリア" id="clearVanishMessage"></li>\
                                <li><label><input type="checkbox" name="utterlyVanishMessage">完全に非表示</label></li>\
                                <li><label><input type="checkbox" name="vanishMessageAggressive">パラノイア</label></li>\
                            <ul>\
                        </ul>\
                    </fieldset>\
                </fieldset>\
                <fieldset>\
                    <legend>スレッド非表示設定</legend>\
                    <ul>\
                        <li><label><input type="checkbox" name="useVanishThread">スレッド非表示機能を使う</label><li>\
                        <ul>\
                            <li><span id="vanishedThreadIDs"></span>個のスレッドを非表示中<input type="button" value="クリア" id="clearVanishThread"></li>\
                            <li><label><input type="checkbox" name="utterlyVanishNGThread">完全に非表示</label></li>\
                            <li><label><input type="checkbox" name="autovanishThread">NGワードを含む投稿があったら、そのスレッドを自動的に非表示に追加する（ツリーのみ）</label></li>\
                        </ul>\
                    </ul>\
                </fieldset>\
                <fieldset>\
                    <legend>画像</legend>\
                    <ul>\
                        <li>\
                            <label><input type="checkbox" name="thumbnail">小町と退避の画像のサムネイルを表示</label>\
                            <ul>\
                                <li>\
                                    <label><input type="checkbox" name="thumbnailPopup">ポップアップ表示</label>\
                                    <ul>\
                                        <li><label><input type="checkbox" name="popupBestFit">画面サイズに合わせる</label></li>\
                                        <li><label>最大幅:<input type="text" name="popupMaxWidth" size="5">px </label><label>最大高:<input type="text" name="popupMaxHeight" size="5">px <em>画面サイズに合わせない時の設定。空欄で原寸表示</em></label></li>\
                                    </ul>\
                                </li>\
                                <li><label><input type="checkbox" name="linkAnimation">描画アニメがある場合にリンクする</label></li>\
                                <li><label><input type="checkbox" name="shouki">詳希(;ﾟДﾟ)</label></li>\
                            </ul>\
                        </li>\
                        <li><label><input type="checkbox" name="popupAny">小町と退避以外の画像も対象にする</label></li>\
                    </ul>\
                </fieldset>\
                <fieldset>\
                    <legend>NGワード</legend>\
                    <ul>\
                        <li><label><input type="checkbox" name="useNG">NGワードを使う</label>\
                        <p>指定には正規表現を使う。以下簡易説明。複数指定するには|(縦棒)で"区切る"（先頭や末尾につけてはいけない）。()?*+[]{}^$.の前には\\を付ける。</p>\
                        <li><table>\
                            <tr>\
                                <td><label for="NGHandle">ハンドル</label>\
                                <td><input id="NGHandle" type="text" name="NGHandle" size="30"><em>投稿者とメールと題名</em> <span id="NGHandleNote" style="display:none;"></span>\
                            <tr>\
                                <td><label for="NGWord">本文</label>\
                                <td><input id="NGWord" type="text" name="NGWord" size="30"> <span id="NGWordNote" style="display:none;"></span>\
                            <tr><td><td><input id="quote-input" type="text" size="15" value=""> よく分からん人はここにNGワードを一つづつ入力して追加ボタンだ\
                            <tr><td><td><input id="quote-output" type="text" size="15" readonly><input type="button" id="addToNGWord" value="本文に追加">\
                        </table>\
                        <li><label><input type="checkbox" name="NGCheckMode">NGワードを含む投稿を畳まず、NGワードをハイライトする</label>\
                        <li><label><input type="checkbox" name="utterlyVanishNGStack">完全非表示</label>\
                    </ul>\
                </fieldset>\
                <p>\
                    <label>追加CSS<br><textarea name="css" cols="70" rows="5"></textarea></label>\
                </p>\
                <fieldset>\
                    <legend>エクスポート／インポート</legend>\
                    <input type="button" id="showExport" value="エクスポート"/>\
                    <input type="button" id="showImport" value="インポート"/>\
                    <div class="export import" style="display:none">\
                        <textarea id="portArea" rows="5" cols="50"></textarea>\
                        <div class="import" style="display:none;flex-direction:column;align-items:flex-start">\
                            <input type="button" id="import" value="インポートする"/>\
                            <span class="import note"></span>\
                        </div>\
                    </div>\
                </fieldset>\
                <p style="display:flex;justify-content:space-between">\
                    <span>\
                        <input type="submit" id="save" accesskey="s" title="くわツリービューの設定を保存する" value="保存[s]">\
                        <input type="button" id="close" accesskey="c" title="くわツリービューの設定を閉じる" value="閉じる[c]">\
                        <span id="configInfo"></span>\
                    </span>\
                    <span>\
                        <input type="button" id="clear" value="デフォルトに戻す">\
                    </span>\
                </p>\
            </fieldset>'.replace(
				/@GF@/g,
				"https://greasyfork.org/scripts/1971-tree-view-for-qwerty"
			)
		},
		showExport: function showExport() {
			this.toggleXXport(".export", this.item.toMinimalJson());
		},
		showImport: function showImport() {
			this.toggleXXport(".import", "");
		},
		toggleXXport: function toggleXXport(showClass, text) {
			this.$$(".import, .export").forEach(function (el) { return (el.style.display = "none"); });
			this.$$(showClass).forEach(function (el) {
				el.style.display = "flex";
			});

			this.$("#portArea").value = text;
		},
		import: function import$1() {
			var this$1 = this;

			var text = this.$("#portArea").value.replace(/^\s+|\s+$/g, "");
			var note = this.$(".import.note");
			note.textContent = "";

			if (text === "") {
				return
			}

			try {
				var json = JSON.parse(text);
				progress("インポートしました。", this, function () { return this$1.item.update(json); });
			} catch (e) {
				note.textContent = "データが不正のため、インポート出来ませんでした。";
			}
		},
		quotemeta: function() {
			var output = this.$("#quote-output");
			var input = this.$("#quote-input");
			output.value = quotemeta(input.value);
		},
		addToNGWord: function() {
			var output = this.$("#quote-output").value;
			if (!output.length) {
				return
			}
			var word = this.$("#NGWord").value;
			if (word.length) {
				output = word + "|" + output;
			}
			this.$("#NGWord").value = output;
			this.$$("#quote-output, #quote-input").forEach(function(el) {
				el.value = "";
			});
		},
		validateRegExp: function(target) {
			var regexp = this.$(target).value;
			var note = this.$((target + "Note"));
			try {
				//chrome70くらい: new RegExpを使わないと、最適化(?)でnew RegExp(regexp)が削除されてしまい
				//文法にミスがあってもエラーが発生しない
				var a = new RegExp(regexp);
				note.textContent = "";
				this.invalidRegExp[target] = !a; // false
			} catch (e) {
				note.textContent = e.message;
				this.invalidRegExp[target] = true;
			}
		},
		save: function(e) {
			var this$1 = this;

			e.preventDefault();

			var items = this.parse();

			if (items) {
				progress("保存しました。", this, function () { return this$1.item.update(items); });
			}
		},
		parse: function() {
			if (this.isRegExpIsInvalid()) {
				this.explainNotToSave();
				this.showRegExpNotes();

				return
			}

			this.removeExplainNotToSave();

			var items = {};
			this.$$("input, select, textarea").forEach(function (el) {
				var k = el.name;
				var v = null;

				if (!k) {
					return
				}

				switch (el.type) {
					case "radio":
						if (el.checked) {
							v = el.value;
						}
						break
					case "text":
					case "textarea":
						v = el.value;
						break
					case "checkbox":
						v = el.checked;
						break
				}

				if (v !== null) {
					items[k] = v;
				}
			});

			return items
		},
		isRegExpIsInvalid: function() {
			var this$1 = this;

			return Object.keys(this.invalidRegExp).some(
				function (regexp) { return this$1.invalidRegExp[regexp]; }
			)
		},
		showRegExpNotes: function() {
			var this$1 = this;
	["#NGWordNote", "#NGHandleNote"].forEach(function (id$$1) {
				this$1.$(id$$1).style.display = null;
			});
		},
		explainNotToSave: function() {
			var explain = this.$("#explainDisabledSave");
			if (!explain) {
				this.$("#save").insertAdjacentHTML(
					"afterend",
					'<span id="explainDisabledSave">NGワードの正規表現が不正なので保存しませんでした</span>'
				);
			}
		},
		removeExplainNotToSave: function() {
			var explain = this.$("#explainDisabledSave");
			if (explain) {
				explain.parentNode.removeChild(explain);
			}
		},

		clear: function() {
			var this$1 = this;

			progress("デフォルトに戻しました。", this, function () { return this$1.item.clear().then(function () { return this$1.restore(); }); }
			);
		},

		close: function() {
			this.el.parentNode.removeChild(this.el);
			window.scrollTo(0, 0);
		},

		clearVanishThread: function() {
			var this$1 = this;

			progress("非表示に設定されていたスレッドを解除しました。", this, function () { return this$1.item.clearVanishedThreadIDs().then(function () {
					this$1.$("#vanishedThreadIDs").textContent = "0";
				}); }
			);
		},

		clearVanishMessage: function() {
			var this$1 = this;

			progress("非表示に設定されていた投稿を解除しました。", this, function () { return this$1.item.clearVanishedMessageIDs().then(function () {
					this$1.$("#vanishedMessageIDs").textContent = "0";
				}); }
			);
		},

		info: function(text) {
			clearTimeout(this.id);
			var info = this.$("#configInfo");
			info.textContent = text;
			this.id = setTimeout(function() {
				info.innerHTML = "";
			}, 5000);
		},

		restore: function restore() {
			var config = this.item;
			this.$("#vanishedThreadIDs").textContent = config.vanishedThreadIDs.length;
			this.$("#vanishedMessageIDs").textContent = config.vanishedMessageIDs.length;

			this.$$("input, select, textarea").forEach(function(el) {
				var name = el.name;
				if (!name) {
					return
				}
				switch (el.type) {
					case "radio":
						el.checked = config[name] === el.value;
						break
					case "text":
					case "textarea":
						el.value = config[name];
						break
					case "checkbox":
						el.checked = config[name];
						break
				}
			});
		},
	};

	var quotemeta = function(str) {
		return (str + "").replace(/([()[\]{}|*+.^$?\\])/g, "\\$1")
	};

	var defaultExport$1 = function defaultExport() {
		this.body = document.body;
	};
	defaultExport$1.prototype.prepend = function prepend (el) {
		this.body.insertBefore(el, this.body.firstChild);
	};

	function openConfig(config) {
		if (IS_EXTENSION) {
			sendMessageToRuntime({type: "openConfig"});
		} else if (!document.getElementById("config")) {
			new defaultExport$1().prepend(new ConfigController(config).el);
			window.scrollTo(0, 0);
		}
	}

	function tweakLink(config, a) {
		if (config.openLinkInNewTab && a.target === "link") {
			a.target = "_blank";
		}

		if (a.target) {
			a.rel += " noreferrer noopener";
		}
	}

	function addCommonEvents(config) {
		var body = getBody();
		on(body, "click", "#openConfig", function (e) {
			e.preventDefault();
			openConfig(config);
		});

		var delegateTweakLink = function (e) {
			tweakLink(config, e.target);
		};
		on(body, "mousedown", "a", delegateTweakLink);
		on(body, "keydown", "a", delegateTweakLink);
	}

	function setAccesskeyToV(config) {
		var accessKey = config.accesskeyV;
		if (accessKey.length === 1) {
			var v = document.getElementsByName("v")[0];
			if (v) {
				v.accessKey = accessKey;
				v.title = "内容";
			}
		}
	}

	function KeyboardNavigation(config, window) {
		if (!window) {
			throw new Error("missing window")
		}

		//同じキーでもkeypressとkeydownでe.whichの値が違うので注意
		var messages = document.getElementsByClassName("message");
		var focusedIndex = -1;

		var done = -1;

		this.isReloadableNow = function() {
			done = Date.now();
		};

		this.isValid = function(index) {
			return !!messages[index]
		};

		// jQuery 2系 jQuery.expr.filters.visibleより
		function isVisible(elem) {
			return (
				elem.offsetWidth > 0 ||
				elem.offsetHeight > 0 ||
				elem.getClientRects().length > 0
			)
		}
		function isHidden(elem) {
			return !isVisible(elem)
		}

		this.indexOfNextVisible = function(index, dir) {
			var el = messages[index];
			if (el && isHidden(el)) {
				return this.indexOfNextVisible(index + dir, dir)
			}
			return index
		};

		var isUpdateScheduled = false;
		this.updateIfNeeded = function() {
			if (isUpdateScheduled) {
				return
			}

			isUpdateScheduled = true;

			requestAnimationFrame(this.changeFocusedMessage);
		};
		this.changeFocusedMessage = function() {
			var m = messages[focusedIndex];
			var top = m.getBoundingClientRect().top;
			var x = window.pageXOffset;
			var y = window.pageYOffset;

			window.scrollTo(x, top + y - config.keyboardNavigationOffsetTop);

			var focused = document.getElementsByClassName("focused")[0];
			if (focused) {
				focused.classList.remove("focused");
			}
			m.classList.add("focused");

			isUpdateScheduled = false;
		};

		this.focus = function(dir) {
			var index = this.indexOfNextVisible(focusedIndex + dir, dir);
			if (this.isValid(index)) {
				focusedIndex = index;
				this.updateIfNeeded();
			} else if (dir === 1) {
				var now = Date.now();
				if (done >= 0 && now - done >= 500) {
					done = now;
					midokureload();
				}
			}
		};

		this.res = function() {
			var focused = document.querySelector(".focused");
			if (!focused) {
				return
			}

			var selector;
			if (focused.classList.contains("original")) {
				selector = "font > a:first-child";
			} else {
				selector = ".res";
			}

			var res = focused.querySelector(selector);
			if (res) {
				if (typeof GM_openInTab === "function") {
					GM_openInTab(res.href, false);
				} else if (typeof GM === "object" && GM.openInTab) {
					GM.openInTab(res.href, false);
				} else {
					window.open(res.href);
				}
			}
		};

		this.handleEvent = function(e) {
			switch (e.type) {
				case "keypress":
					this.move(e);
					break
				case "view is done":
					this.isReloadableNow();
					break
				default:
					throw new Error("should not reach here: " + e.type)
			}
		};

		this.move = function(e) {
			var target = e.target;

			if (
				/^(?:INPUT|SELECT|TEXTAREA)$/.test(target.nodeName) ||
				target.isContentEditable
			) {
				return
			}

			switch (e.which) {
				case 106: //j
					this.focus(1);
					break
				case 107: //k
					this.focus(-1);
					break
				case 114: //r
					this.res();
					break
				default:
			}
		};
	}
	KeyboardNavigation.prototype.registerToDocument = function(doc) {
		if ( doc === void 0 ) doc = document;

		doc.addEventListener("keypress", this, false);
		doc.addEventListener("view is done", this, false);
	};

	function registerKeyboardNavigation(config) {
		if (config.keyboardNavigation) {
			var keyboardNavigation = new KeyboardNavigation(config, window);
			keyboardNavigation.registerToDocument();
		}
	}

	function setID() {
		var form = document.forms[0];
		if (form) {
			form.id = "form";
			var fonts = form.getElementsByTagName("font");
			var link = fonts[fonts.length - 3];
			if (link) {
				link.id = "link";
			}
		}
	}

	function setup(config) {
		applyCss(config);
		zero(config);
		addCommonEvents(config);
		setAccesskeyToV(config);
		setID();

		registerKeyboardNavigation(config);
	}

	function shouldQuitHere (config, title) {
			if ( title === void 0 ) title = getTitle();

			return (IS_USAMIN && config.viewMode === "s") || title.endsWith(" 個人用環境設定");
	}

	// Promiseはキャンセルできないので、継続渡しにする
	function quitOrExecute (gotConfig) { return function (startRender) { return gotConfig.then(function (config) {
			if (shouldQuitHere(config)) {
				return
			}

			setup(config);

			if (IS_USAMIN) {
				config = Object.create(config);
				config.deleteOriginal = false;
				config.useVanishMessage = false;
				config.useVanishThread = false;
				config.autovanishThread = false;
			}

			return startRender(config, function () { return document.dispatchEvent(new Event("view is done")); }
			)
		}); }; }

	function main(location) {
		if ( location === void 0 ) location = window.location;

		var q = new Query(location.search, location.hostname);
		switch (q.get("m")) {
			case "f": //レス窓
				tweakResWindow();
				return
			case "l": //トピック一覧
			case "c": //個人用設定
				return
			case "g": //過去ログ
				if (!q.shouldHaveValidPosts()) {
					return
				}
		}

		var gotConfig = Config.load();
		var execute = quitOrExecute(gotConfig);

		var main = whenToExecute();

		new Promise(function (resolve) {
			resolve(main(gotConfig, q, execute));
		}).catch(handleError);
	}

	main();

}());
