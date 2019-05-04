// ==UserScript==
// @name           BEATRICE
// @namespace      Mana
// @description    Citation
// @version        0.0.1
// @include        http://www.jeuxvideo.com
// @include        http://www.jeuxvideo.com/*
// @include        http://*.forumjv.com
// @include        http://*.forumjv.com/*
// @copyright      2009-2012 Luthien Sofea Elanesse
// @copyright      <jeuxvideo.nyu@gmail.com>
// ==/UserScript==

(function () {
	"use strict";
	var beatrice;
	
	function defaultOptions(key) {
		var data;
		data = {
			citation:true,
			baseIcone:"b64"
		};
		return data[key];
	}
	function option(key) {
		switch (key) {
		case "name":
			return "Beatrice";
		case "description":
			return "I can talk in red !!!";
		case "codeName":
			return "BEATRICE";
		case "saveMode":
			return "local";
		default:
			return defaultOptions(key);
		}
	}
	function Reminder(object) {	// To prevent multiple load of the same data
		var data, key;
		data = {};
		this.get = function get(key) {
			if (object && !data.hasOwnProperty(key)) {
				data[key] = object.get(key);
			}
			return data[key];
		};
		this.set = function set(key, value) {
			data[key] = value;
			if (object) return object.set(key, value);
		};
		this.del = function del(key) {
			delete data[key];
			if (object) return object.del(key);
		};
		this.has = function has(key) {
			return data.hasOwnProperty(key);
		};
		this.unload = function unload(key) {
			delete data[key];
		};
		if (object) {
			this.list = function list() {
				return object.list();
			};
		}
	}
	function SystemObject(mode) {
		var save;
		save = {};
		save.storage = function SaveStorage(storage) {
			this.get = function get(key) {
				return storage.getItem(key);
			};
			this.set = function set(key, value) {
				return storage.setItem(key, value);
			};
			this.del = function del(key) {
				return storage.removeItem(key);
			};
			this.list = function list() {
				var ans, i;
				ans = [];
				for (i = 0; i < storage.length; i += 1) {
					ans.push(storage.key(i));
				}
				return ans;
			};
		};
		save.cookie = function SaveCookie(doc, timeout, path) {
			if (!path) {
				path = "/";
			}
			this.get = function readCookie(key) {
				var list, i, c;
				key = encodeURIComponent(key) + "=";
				list = doc.cookie.split(';');
				for(i=0; i < list.length; i += 1) {
					c = list[i];
					while (c.charAt(0)==' ') 
						c = c.slice(1);
					if (c.indexOf(key) == 0) 
						return decodeURIComponent(c.slice(key.length));
				}
				return null;
			};
			this.set = function createCookie(name, value, time) {
				var date, expires;
				if (!time) {
					time = timeout;
				}
				expires = "";
				if (time) {
					date = new Date();
					date.setTime(date.getTime() + time);
					expires = "; expires="+date.toGMTString();
				}
				doc.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=" + path;
			};
			this.del = function eraseCookie(name) {
				this.set(name, "", -1);
			};
			this.list = function list() {
				var list, i, key, ans;
				ans = [];
				list = doc.cookie.split(";");
				for (i = 0; i < list.length; i += 1) {
					key = list[i].split("=")[0];
					if (key) {
						while (key.charAt(0) === " ") 
							key = key.slice(1);
						ans.push(decodeURIComponent(key));
					}
				}
				return ans;
			};
		};
		switch (mode) {
		default:
		case "local":
			this.save = new Reminder(new save.storage(localStorage));
			break;
		case "session":
			this.save = new Reminder(new save.storage(sessionStorage));
			break;
		case "cookie":
			this.save = new Reminder(new save.cookie(document, 365 * 24 * 60 * 60 * 1000, "/"));
			break;
		}
		
	};
	function GetObject(doc) {
		this.id = function getId(id) {
			return doc.getElementById(id);
		};
		this.name = function getName(name) {
			return doc.getElementsByName(name);
		};
		this.className = function getClassName(className, ref) {
			if (ref) return ref.getElementsByClassName(className);
			return doc.getElementsByClassName(className);
		};
		this.tag = function getTag(tag, ref) {
			if (ref && ref.getElementsByTagName) return ref.getElementsByTagName(tag);
			return doc.getElementsByTagName(tag);
		};
	};
	function CreateObject(doc) {
		this.element = function element(tag, options) {
			var bloc, key;
			bloc = doc.createElement(tag);
			if (options) {
				for (key in options) {
					if (options.hasOwnProperty(key)) {
						bloc.setAttribute(key, options[key]);
					}
				}
			}
			return bloc;
		};
		this.text = function text(texte) {
			return doc.createTextNode(texte);
		};
		this.input = function input(type, options) {
			if (!options) options = {};
			options.type = type;
			return this.element("input", options);
		};
		this.img = function img(src, options) {
			if (!options) options = {};
			options.src = src;
			return this.element("img", options);
		};
		this.link = function (link, options) {
			if (!options) options = {};
			options.href = link;
			return this.element("a", options);
		};
		this.script = function script(content, options) {
			var bloc;
			if (!options) options = {};
			options.type = "text/javascript";
			bloc = this.element("script", options);
			bloc.appendChild(this.text(content));
			return bloc;
		};
		this.style = function style(content, options) {
			var bloc;
			if (!options) options = {};
			options.type = "text/css";
			bloc = this.element("style", options);
			bloc.appendChild(this.text(content));
			return bloc;
		};
	}
	function Reg(regexp, option) {
		var reg;
		if (option) {
			reg = new RegExp(regexp, option);
		} else {
			reg = new RegExp(regexp);
		}
		this.exec = function exec(exp) {
			var data = reg.exec(exp);
			if (data !== null) {
				data.push(RegExp.rightContext);
				data.push(data.shift());
				data.unshift(RegExp.leftContext);
			}
			return data;
		};
		this.test = function test(exp) {
			return (this.exec(exp) !== null);
		};
		return this;
	}	
	function Url(href) {
		var apply, readOptions, writeOptions, getDomain, reWrite;
		getDomain = function getDomain(url) {
			var data, i, test;
			data = url.hostname.split(".");
			if (new Reg("^[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}$").test(url.hostname)) {
				test = true;
				for (i = 0; test && i < data.length; i += 1) {
					data[i] = parseInt(data[i], 10);
					test = (data[i] >= 0 && data[i] < 256);
				}
				if (test) {
					url.ip = true;
					return data;
				}
			}
			url.server = [];
			while (data.length > 2) {
				url.server.push(data.shift());
			}
			return data.join(".");
		};
		writeOptions = function writeOptions(options) {
			var ans, key;
			ans = [];
			if (options) {
				for (key in options) {
					if (options.hasOwnProperty(key)) {
						ans.push(encodeURIComponent(key) + "=" + encodeURIComponent(options[key]));
					}
				}
			}
			return (ans.length > 0) ? "?" + ans.join("&") : "";
		};
		readOptions = function readOptions(options) {
			var data, temp;
			data = {};
			if (options) {
				options = options.slice(1).split("&");
				while (options.length > 0) {
					temp = options.shift().split("=");
					data[decodeURIComponent(temp.shift())] = decodeURIComponent(temp.join("="));
				}
			}
			return data;
		};
		apply = function apply(url) {
			var data;
			data = new Reg("^([^:/]+):/*([^:/?#]+)(?::([^/?#]+))?(/[^?#]*)?(\\?[^#]+)?(#.*)?$").exec(href);
			if (data) {
				url.correct = true;
				url.protocol = data[1];
				url.hostname = data[2];
				url.domain = getDomain(url);
				url.port = data[3] ? parseInt(data[3], 10) : "";
				url.host = url.port ? url.hostname + ":" + url.port : url.hostname;
				url.path = data[4] ? data[4].slice(1).split("/") : [];	// First char always /
				url.options = readOptions(data[5]);
				url.ancre = data[6] ? data[6].slice(1) : "";
			} else {
				url.correct = false;
				url.href = href;
			}
		};
		this.alter = function alter() {
			var key, newRef;
			if (this.correct) {
				newRef = this.protocol;
				switch (this.protocol) {
				case "file":
					newRef += ":///";
					break;
				case "http":
				case "https":
				case "ftp":
				default:
					newRef += "://";
					break;
				}
				newRef += this.hostname;
				newRef += this.port ? ":" + this.port : "";
				newRef += (this.path && this.path.length > 0) ? "/" + this.path.join("/") : "";
				newRef += writeOptions(this.options);
				newRef += (this.ancre && this.ancre.length > 0) ? "#" + this.ancre : "";
			} else {
				newRef = this.href;
			}
			for (key in this) {
				if (typeof(this[key]) !== "function") {
					delete this[key];
				}
			}
			href = newRef;
			apply(this);
			return this;
		};
		this.clone = function clone() {
			return new Url(href);
		};
		this.info = function info() {
			var ans, key;
			ans = [this.toString(), ""];
			for (key in this) {
				if (typeof(this[key]) !== "function") {
					if (key === "options") {
						ans.push(key + " : " + writeOptions(this[key]));
					} else {
						ans.push(key + " : " + this[key]);
					}
				}
			}
			return ans.join("\n");
		};
		this.toString = function toString() {
			return href;
		};
		apply(this);
	}
	function Where(href) {
		var url, apply, interpret, clean, describe;
		interpret = function interpret(where) {
			var writeJVCFormat;
			if (where.correct) {
				writeJVCFormat = function writeJVCFormat() {
					return [where.mode, where.forum, where.topic, where.page, where.hash, where.index, where.search, where.query].join("-") + ".htm";
				};
				switch (where.node) {
				case "jvc":
					switch (where.type) {
					case "home":
						where.path = [];
						break;
					case "forums":
					case "commentaires":
						where.path = [where.type, writeJVCFormat()];
						break;
					case "profil":
						where.path = [where.type, where.pseudo + ".html"];
						break;
					case "cgi-bin":
						//window.alert("Non géré");	//TODO
						break;
					case "kick_user":
						where.path = ["cgi-bin", where.type + ".cgi"];
						break;
					case "avertir_moderateur":
						where.path = ["cgi-bin", where.type + ".cgi"];
						break;
					case "moncompte":
						//window.alert("Non géré");	//TODO
						break;
					case "messages-prives":
						//window.alert("Non géré");	//TODO
						break;
					}
					break;
				case "forumjv":
					switch (where.type) {
					case "cgi-bin":
						//window.alert("Non géré");	//TODO
						break;
					default:
						where.path = [writeJVCFormat()];
						break;
					}
					break;
				case "dtc":
					switch (where.type) {
					case "one":
						where.path = [where.page + ".html"];
						break;
					}
					break;
				}
			}
		};
		describe = function describe(data) {
			var key, ans;
			ans = [];
			for (key in data) {
				if (data.hasOwnProperty(key)) {
					ans.push(key + ":" + data[key]);
				}
			}
			return ans
		};
		apply = function apply(where) {
			var analyseJVCFormat, data;
			if (where.correct) {
				if (where.protocol === "file" || where.hostname === "127.0.0.1" || where.hostname === "localhost") {
					where.local = true;
				}
				analyseJVCFormat = function analyseJVCFormat(format) {
					var data;
					data = new Reg("^([0-9]+)-([0-9]+)-([0-9]+)-([0-9]+)-([A-Za-z0-9]+)-([0-9]+)-([0-9]+)-(.+)\\.htm$").exec(format);
					if (data) {
						where.mode = parseInt(data[1], 10);
						where.forum = parseInt(data[2], 10);
						where.topic = parseInt(data[3], 10);
						where.page = parseInt(data[4], 10);
						where.hash = data[5];
						where.index = parseInt(data[6], 10);
						where.search = parseInt(data[7], 10);
						where.query = data[8];
					}
				};
				switch (where.domain) {
				case "jeuxvideo.com":
					where.node = "jvc";
					if (where.server.join(".") === "m") {
						where.mobile = true;
					}
					if (where.path.length === 0 || (where.path.length === 1 && where.path[0] === "")) {
						where.type = "home";
					} else {
						where.type = where.path[0].toLowerCase();
						switch (where.type) {
						case "forums":
						case "commentaires":
							analyseJVCFormat(where.path.join("/").slice(where.type.length + 1));
							break;
						case "profil":
							data = new Reg("^([^.]+)\\.html$").exec(where.path[where.path.length - 1]);
							if (data) {
								where.pseudo = data[1];
							}
							break;
						case "cgi-bin":
							if (where.path.length === 3 && where.path[1] === "jvforums") {
								switch (where.path[2].toLowerCase()) {
								case "kick_user.cgi":
									where.type = "kick_user";
									break;
								case "avertir_moderateur.cgi":
									where.type = "avertir_moderateur";
									break;
								}
							}
							break;
						case "moncompte":
							break;
						case "messages-prives":
							break;
						}
					}
					break;
				case "forumjv.com":
					where.node = "forumjv";
					where.forumName = where.server.join(".");
					where.type = url.path[0].toLowerCase();
					switch (where.type) {
					case "cgi-bin":
						break;
					default:
						where.type = "forums";
						analyseJVCFormat(where.path.join("/"));
						break;
					}
					break;
				case "danstonchat.com":
					where.node = "dtc";
					if (where.path.length === 0 || where.path[0] === "") {
						where.type = "home";
					} else {
						data = new Reg("^([0-9]+).html$").exec(where.path[0]);
						if (data) {
							where.type = "one";
							where.page = parseInt(data[1], 10);
						} else {
							where.type = "other";
						}
					}
				}
			}
		};
		clean = function clean(where, state) {
			var key;
			for (key in url) {
				if (typeof(url[key]) !== "function") {
					if (state) {
						where[key] = url[key];
					} else {
						url[key] = where[key];
						delete where[key];
					}
				}
			}
			if (!state) {
				for (key in where) {
					if (typeof(url[key]) !== "function") {
						delete where[key];
					}
				}
			}
		};
		this.alter = function alter() {
			interpret(this);
			clean(this, false);
			url.alter();
			href = url.toString();
			clean(this, true);
			apply(this);
			return this;
		};
		url = new Url(href);
		clean(this, true);
		apply(this);
		this.clone = function clone() {
			return new Where(href);
		};
		this.info = function info() {
			var ans, key;
			ans = [url.info(), ""];
			for (key in this) {
				if (!url.hasOwnProperty(key) && typeof(this[key]) !== "function") {
					if (typeof(this[key]) === "object") {
						ans.push(key + " : " + describe(this[key]));
					} else {
						ans.push(key + " : " + this[key]);
					}
				}
			}
			return ans.join("\n");
		};
		this.toString = function toString() {
			return url.toString();
		};
	}
	function formatInt(val, n) {
		val = val.toString();
		while (val.length < n) {
			val = "0" + val;
		}
		return val;
	}
	function inList(val, list) {
		var i;
		for (i = 0; i < list.length; i += 1) {
			if (val === list[i]) {
				return i;
			}
		}
		return -1;
	}
	function getUserAgentDetails(userAgent) {
		var data, addBrowser, browserList, tryBrowser;
		data = {};
		browserList = [];
		addBrowser = function addBrowser(name, reg) {
			browserList.push({name:name, reg:reg});
		};
		data.toString = function toString() {
			var ans = [];
			if (this.browser) ans.push("browser : " + this.browser + (this.browser_version ? " " + this.browser_version : ""));
			return ans.join("\n");
		};
		tryBrowser = function tryBrowser() {
			var temp;
			data.browser = [];
			data.browser_version = [];
			
			addBrowser("ABrowse", "ABrowse ([-A-Za-z0-9.+]+)");
			addBrowser("Acoo Browser", "Acoo Browser");
			addBrowser("America Online Browser", "America Online Browser ([-A-Za-z0-9.+]+)");
			addBrowser("AOL", "AOL ([-A-Za-z0-9.+]+)");
			addBrowser("Arora", "Arora/([-A-Za-z0-9.+]+)");
			addBrowser("Avant Browser", "Avant Browser");
			addBrowser("Beonex", "Beonex/([-A-Za-z0-9.+]+)");
			addBrowser("BonEcho", "BonEcho/([-A-Za-z0-9.+]+)");
			addBrowser("Browzar", "Browzar");
			addBrowser("Camino", "Camino/([-A-Za-z0-9.+]+)");
			addBrowser("Charon", "Charon");
			addBrowser("Cheshire", "Cheshire/([-A-Za-z0-9.+]+)");
			addBrowser("Chimera", "Chimera/([-A-Za-z0-9.+]+)");
			addBrowser("Chrome", "Chrome/([-A-Za-z0-9.+]+)");
			addBrowser("CometBird", "CometBird/([-A-Za-z0-9.+]+)");
			addBrowser("Comodo_Dragon", "Comodo_Dragon/([-A-Za-z0-9.+]+)");
			addBrowser("Conkeror", "Conkeror/([-A-Za-z0-9.+]+)");
			addBrowser("Crazy Browser", "Crazy Browser ([-A-Za-z0-9.+]+)");
			addBrowser("Cyberdog", "Cyberdog/([-A-Za-z0-9.+]+)");
			addBrowser("Deepnet Explorer", "Deepnet Explorer ([-A-Za-z0-9.+]+)");
			addBrowser("DeskBrowse", "DeskBrowse/([-A-Za-z0-9.+]+)");
			addBrowser("Dillo", "Dillo/([-A-Za-z0-9.+]+)");
			addBrowser("Dooble", "Dooble/([-A-Za-z0-9.+]+)");
			addBrowser("Element Browser", "Element Browser ([-A-Za-z0-9.+]+)");
			addBrowser("Elinks", "Elinks(?:/| \\()([-A-Za-z0-9.+~]+)");
			addBrowser("Enigma Browser", "Enigma Browser");
			addBrowser("Epiphany", "Epiphany/([-A-Za-z0-9.+]+)");
			addBrowser("Escape", "Escape ([-A-Za-z0-9.+]+)");
			addBrowser("Firebird", "Firebird/([-A-Za-z0-9.+]+)");
			addBrowser("Firefox", "Firefox(?:/([-A-Za-z0-9.+]+))?");
			addBrowser("Fireweb Navigator", "Fireweb Navigator/([-A-Za-z0-9.+]+)");
			addBrowser("Flock", "Flock/([-A-Za-z0-9.+]+)");
			addBrowser("Fluid", "Fluid/([-A-Za-z0-9.+]+)");
			addBrowser("Galaxy", "Galaxy/([-A-Za-z0-9.+]+)");
			addBrowser("Galeon", "Galeon/([-A-Za-z0-9.+]+)");
			addBrowser("GranParadiso", "GranParadiso/([-A-Za-z0-9.+]+)");
			addBrowser("GreenBrowser", "GreenBrowser");
			addBrowser("Hana", "Hana/([-A-Za-z0-9.+]+)");
			addBrowser("HotJava", "HotJava/([-A-Za-z0-9.+]+)");
			addBrowser("IBM WebExplorer", "IBM WebExplorer */([-A-Za-z0-9.+]+)");
			addBrowser("IBrowse", "IBrowse ([-A-Za-z0-9.+]+)");
			addBrowser("iCab", "iCab[/ ]([-A-Za-z0-9.+]+)");
			addBrowser("Iceape", "Iceape/([-A-Za-z0-9.+]+)");
			addBrowser("IceCat", "IceCat/([-A-Za-z0-9.+]+)");
			addBrowser("Iceweasel", "Iceweasel(?:/([-A-Za-z0-9.+]+))?");
			addBrowser("iNet Browser", "iNet Browser ([-A-Za-z0-9.+]+)");
			addBrowser("Internet Explorer", "MSIE ([-A-Za-z0-9.+]+)");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			addBrowser("", "");
			
			while (browserList.length > 0) {
				temp = browserList.shift();
				if (temp.reg && new RegExp(temp.reg, "i").test(userAgent)) {
					data.browser.push(temp.name);
					data.browser_version.push(RegExp.$1);
				}
			}
		};
		
		tryBrowser();
		
		return data;
	}
	function Icone(id, alt, url, b64) {
		this.toString = function toString() {
			return "[Icone " + this.id + "]";
		};
		this.id = id;
		this.alt = alt;
		this.url = url;
		this.b64 = b64;
		return this;
	}
	
	function launch(mother, key) {
		var i;
		if (arguments.length === 1 || (key !== undefined && mother[key] !== undefined && mother[key].init !== undefined)) {
			if (arguments.length === 1) {
				mother = {root:mother};
				key = option("codeName");
				mother[key] = mother.root;
				delete mother.root;
				mother[key].key = [key];
				mother[key].$ = mother[key];
			} else {
				mother[key]._ = mother;
				mother[key].key = [];
				for (i = 0; i < mother.key.length; i += 1) {
					mother[key].key.push(mother.key[i]);
				}
				mother[key].key.push(key);
				if (mother.$) {
					mother[key].$ = mother.$;
				} else {
					mother[key].$ = mother;
				}
			}
			mother[key].toString = function toString() {
				return "[" + this.key.join(">") + "]";
			};
			mother[key].name = function name(id) {
				return this.key.join("_") + "_" + id;
			};
			return mother[key].init();
		}
	}

	beatrice = {};
	beatrice.init = function init() {
		var body, div, icones, time, a, i;
		time = new Date().getTime();
		this.doc = document;
		if (this.doc) {
			this.get = new GetObject(this.doc);
		}
		if (this.get) {
			this.head = this.get.tag("head")[0];
			this.body = this.get.tag("body")[0];
			body = this.body;
		}
		if (this.head && this.body) {
			this.system = new SystemObject(option("saveMode"));
			this.create = new CreateObject(this.doc);
			this.loc = new Where(location.href);
		}
		if (body && this.create) {
			icones = this.remindBaseIcones();
			this.icone = function icone(id) {
				var ico = icones.get(id);
				if (ico) return ico[option("baseIcone")];
			};
			this.iconeName = function iconeName(id) {
				var ico = icones.get(id);
				if (ico) return ico.alt;
			};
			this.create.icone = function icone(id, options) {
				var ico = icones.get(id);
				if (ico) {
					if (!options) options = {};
					options.alt = ico.alt;
					return this.img(ico[option("baseIcone")], options);
				}
			};
			this.root = this[this.loc.node];
			if (launch(this, this.loc.node)) {
				time = new Date().getTime() - time;
				div = this.create.element("div", {style:"font-size:x-small;"});
				div.appendChild(this.create.text(time + " ms"));
				body.appendChild(div);
				return true;
			}
		}
	};
	beatrice.remindBaseIcones = function remindBaseIcones() {
		var define, remind, list;
		remind = new Reminder();
		list = [];
		define = function define(icone) {
			remind.set(icone.id, icone);
			list.push(icone.id);
		};
		
		this.iconeList = list;
		
		define(new Icone("grayC", "[C]", "[server]/icones/grayc.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9kBHAQVNbhFrDsAAADcSURBVCjPhZEtroZADABnN9tA9gBoFBrJRVAozGI4CwfAcyiOQHA4fvcJAh+IFyqbaTttlXPO8xFt2yoAA5Bl2Rfv27ZVBmBZljtbVdWLapqGNE1xznkDsK4rAHVdA1CWJQBaa8IwJI5jbo0LvmKaJpIkwVqL1hqt9Q9+agDs+44xBhFBKcW2bT+47/sXPAwD1lrCMLxzIoL+d33v8f59VeWc85fzPM90XfcCiqJARAiC4NR4jsrznHEcz05KISJEUUQQBCiAZ/fjOFjX9VY4jgMRwVp7wlfB1xv/ANJJU6cQluBaAAAAAElFTkSuQmCC"));
		
		return remind;
	};
	beatrice.style = new Reminder();
	beatrice.script = new Reminder();
	beatrice.insertStyle = function insertStyle(key) {
		var id, style;
		id = this.name("style_" + key);
		if (!this.get.id(id)) {
			style = this.style.get(key);
			if (style) {
				this.head.appendChild(this.create.style(style, {id:id}));
			}
		}
	};
	beatrice.insertScript = function insertScript(key) {
		var id, script;
		id = this.name("script_" + key);
		if (!this.get.id(id)) {
			script = this.script.get(key);
			if (script) {
				this.head.appendChild(this.create.script(script, {id:id}));
			}
		}
	};
	beatrice.initStyles = function initStyles() {
		this.$.style.set("button", (function () {return "" +
			".button {cursor:pointer;}" + "\n" +
		"";}()));
	};
	beatrice.initScripts = function initStyles() {
		this.$.script.set("saveGet", function saveGet(key) {
			return localStorage.getItem(key);
		});
		this.$.script.set("saveSet", function saveSet(key, value) {
			return localStorage.setItem(key, value);
		});
		this.$.script.set("saveDel", function saveDel(key) {
			return localStorage.removeItem(key);;
		});
		
		this.insertScript("saveGet");
		this.insertScript("saveSet");
		this.insertScript("saveDel");
	};
	
	beatrice.jvc = {};
	beatrice.jvc.init = function init() {
		this.$.initStyles();
		this.$.initScripts();
		return launch(this, this.$.loc.type);
	};
	
	beatrice.jvc.message = {};
	beatrice.jvc.message.init = function init() {
		this.initStyles();
		this.initScripts();
		return true;
	};
	beatrice.jvc.message.initStyles = function initStyles() {
	};
	beatrice.jvc.message.initScripts = function initStyles() {
		this.$.script.set("citer_message", function citer_message(element, saveGet, saveSet) {
			var pseudo, date, ancre, content, citation, key, old;
			pseudo = element.getAttribute("pseudo");
			date = element.getAttribute("date");
			ancre = element.getAttribute("ancre");
			content = element.getAttribute("citation"); 
			key = element.getAttribute("key"); 
			if (key && content && pseudo && date) {
				citation = "# " + pseudo + "\n";
				citation += "# " + "Posté le " + date + "\n";
				citation += content + "\n";
				if (ancre) {
					citation += "# " + ancre + "\n";
				}
				if (citation && confirm("Voulez-vous citer le message suivant ?\n" + citation)) {
					old = saveGet(key);
					if (old) {
						citation = old + "\n\n" + citation;
					}
					saveSet(key, citation);
				}
			}
		});
	};
	beatrice.jvc.message.parse = function parse(key) {
		var value, temp, i;
		if (this.data) {
			if (!this.data.hasOwnProperty(key)) {
				value = null;
				switch(key) {
				case "id":
					temp = this.parse("div");
					if (temp) {
						value = temp.id;
					}
					break;
				case "ul":
					temp = this.parse("div");
					if (temp) {
						value = this.$.get.tag("ul", temp)[0];
					}
					break;
				case "bloc_pseudo":
				case "bloc_date":
				case "bloc_post":
				case "bloc_ancre":
				case "bloc_suite_sujet":
					temp = this.parse("ul");
					if (temp) {
						temp = this.$.get.tag("li", temp);
						for (i = 0; i < temp.length; i += 1) {
							this.data["bloc_" + temp[i].className] = temp[i];
						}
						value = this.data[key];
					}
					break;
				case "strong":
					temp = this.parse("bloc_pseudo");
					if (temp) {
						value = this.$.get.tag("strong", temp)[0];
					}
					break;
				case "pseudo":
					temp = this.parse("strong");
					if (temp && temp.childNodes.length === 1) {
						value = temp.childNodes[0].nodeValue;
					}
					break;
				case "isMod":
					temp = this.parse("strong");
					if (temp) {
						value = (temp.clasName === "moderateur");
					}
					break;
				case "link_profil":
				case "link_mod":
					temp = this.parse("bloc_pseudo");
					if (temp) {
						temp = this.$.get.tag("a", temp);
						this.data["link_profil"] = temp[temp.length - 1];
						if (temp.length > 1) {
							this.data["link_mod"] = temp[0];
						}
						value = this.data[key];
					}
					break;
				case "link_kick":
				case "link_ddb":
					temp = this.parse("bloc_date");
					if (temp) {
						temp = this.$.get.tag("a", temp);
						this.data["link_ddb"] = temp[temp.length - 1];
						if (temp.length > 1) {
							this.data["link_kick"] = temp[0];
						}
						value = this.data[key];
					}
					break;
				case "date_text":
				case "mobile":
				case "jour":
				case "mois":
				case "année":
				case "heure":
				case "minute":
				case "seconde":
					temp = this.parse("bloc_date");
					if (temp) {
						temp = new Reg("(Posté )?le (([0-9]+) ([^ ]+) ([0-9]+) à ([0-9]+):([0-9]+):([0-9]+))").exec(temp.innerHTML.split("\n").join(""));
						if (temp) {
							this.data["date_text"] = temp[2];
							this.data["mobile"] = (temp[1] === undefined);
							this.data["jour"] = parseInt(temp[3], 10);
							this.data["mois"] = temp[4];
							this.data["année"] = parseInt(temp[5], 10);
							this.data["heure"] = parseInt(temp[6], 10);
							this.data["minute"] = parseInt(temp[7], 10);
							this.data["seconde"] = parseInt(temp[8], 10);
						}
						value = this.data[key];
					}
					break;
				case "link_ancre":
					temp = this.parse("bloc_ancre");
					if (temp) {
						value = this.$.get.tag("a", temp)[0];
					}
					break;
				case "profil":
				case "mod":
				case "kick":
				case "ddb":
				case "ancre":
					temp = this.parse("link_" + key);
					if (temp) {
						value = temp.href;
					}
					break;
				case "url_profil":
				case "url_mod":
				case "url_kick":
				case "url_ddb":
				case "url_ancre":
					temp = this.parse(key.split("_").pop());
					if (temp) {
						value = new Where(temp);
					}
					break;
				default:
					break;
				}
				this.data[key] = value;
			}
			return this.data[key];
		}
	};
	beatrice.jvc.message.exec = function exec(div, i) {
		this.data = {div:div, i:i};
		if (option("citation")) this.citer();
		return this.data;
	};
	beatrice.jvc.message.citer = function citer() {
		var post, child, i, pseudo, date, ancre, citation, icone, bloc;
		bloc = this.parse("bloc_pseudo");
		post = this.parse("bloc_post");
		if (bloc && post) {
			pseudo = this.parse("pseudo");
			date = this.parse("date_text");
			ancre = this.parse("ancre");
			citation = "";
			child = post.childNodes;
			for (i = 0; i < child.length; i += 1) {
				switch (child[i].nodeType) {
				case Node.ELEMENT_NODE:
					switch (child[i].tagName.toLowerCase()) {
					case "br":
						citation += "\n";
						break;
					case "a":
						citation += child[i].href;
						break;
					case "img":
						citation += child[i].alt;
						break;
					default:
						break;
					}
					break;
				case Node.TEXT_NODE:
					citation += child[i].nodeValue.split("\n").join("");
					break;
				case Node.ATTRIBUTE_NODE:
				case Node.CDATA_SECTION_NODE:
				case Node.ENTITY_REFERENCE_NODE:
				case Node.ENTITY_NODE:
				case Node.PROCESSING_INSTRUCTION_NODE:
				case Node.COMMENT_NODE:
				case Node.DOCUMENT_NODE:
				case Node.DOCUMENT_TYPE_NODE:
				case Node.DOCUMENT_FRAGMENT_NODE:
				case Node.NOTATION_NODE:
				default:
					break;
				}
			}
			this.$.insertStyle("button");
			this.$.insertScript("citer_message");
			if (!ancre) ancre = "";
			icone = this.$.create.icone("grayC", {title:"Citer ce message ?", class:"button", pseudo:pseudo, date:date, ancre:ancre, citation:citation, onclick:"citer_message(this, saveGet, saveSet);", key:this.$.name("jvc_citation")});
			bloc.appendChild(icone);
			bloc.appendChild(this.$.create.text("\n"));
		}
	};
	
	beatrice.jvc.form = {};
	beatrice.jvc.form.init = function init() {
		this.initStyles();
		this.initScripts();
		return true;
	};
	beatrice.jvc.form.initStyles = function initStyles() {
	};
	beatrice.jvc.form.initScripts = function initStyles() {
		this.$.script.set("citer_form", function citer_form(element, saveGet, saveDel) {
			var key, citation;
			key = element.getAttribute("key");
			if (key) {
				citation = saveGet(key);
				if (citation) {
					saveDel(key);
					if (element.value) {
						element.value += "\n\n" + citation;
					} else {
						element.value = citation;
					}
				}
			}
		});
	};
	beatrice.jvc.form.parse = function parse(key) {
		var value, temp, i;
		if (this.data) {
			if (!this.data.hasOwnProperty(key)) {
				value = null;
				switch(key) {
				case "textarea":
					temp = this.$.get.id("newmessage");
					if (temp) {
						value = temp;
					}
					break;
				default:
					break;
				}
				this.data[key] = value;
			}
			return this.data[key];
		}
	};
	beatrice.jvc.form.exec = function exec(form) {
		this.data = {form:form};
		if (option("citation")) this.citer();
		return this.data;
	};
	beatrice.jvc.form.citer = function citer() {
		var post, focus
		post = this.parse("textarea");
		if (post) {
			focus = post.getAttribute("onfocus");
			if (!focus) {
				focus = "";
			} else {
				if (focus[focus.length - 1] !== ";") {
					focus += ";";
				}
			}
			this.$.insertScript("citer_form");
			focus += "citer_form(this, saveGet, saveDel);";
			post.setAttribute("onfocus", focus);
			post.setAttribute("key", this.$.name("jvc_citation"));
		}
	};
	
	beatrice.jvc.forums = {};
	beatrice.jvc.forums.init = function init() {
		return launch(this, this.$.loc.mode);
	};
	
	beatrice.jvc.forums[0] = {};
	beatrice.jvc.forums[0].init = function init() {
		var answer, form, data;
		form = this.$.get.id("post");
		if (form) {
			if (launch(this.$.root, "form")) {
				data = this.$.root.form.exec(form);
				answer = true;
			}
		}
		return answer;
	};
	
	beatrice.jvc.forums[1] = {};
	beatrice.jvc.forums[1].init = function init() {
		var answer, data, i, ul, col;
		col = this.$.get.id("col1");
		if (col) {
			if (launch(this.$.root, "message")) {
				ul = this.$.get.tag("ul", col);
				for (i = 0; i < ul.length; i += 1) {
					data = this.$.root.message.exec(ul[i].parentNode, i);
				}
				answer = true;
			}
		}
		return answer;
	};
	
	beatrice.jvc.forums[3] = {};
	beatrice.jvc.forums[3].init = function init() {
		var answer, data, i, ul, col, form;
		col = this.$.get.id("col1");
		if (col) {
			launch(this.$.root, "message");
			ul = this.$.get.tag("ul", col);
			for (i = 0; i < ul.length; i += 1) {
				data = this.$.root.message.exec(ul[i].parentNode, i);
			}
			answer = true;
		}
		form = this.$.get.id("post");
		if (form) {
			if (launch(this.$.root, "form")) {
				data = this.$.root.form.exec(form);
				answer = true;
			}
		}
		return answer;
	};
	
	beatrice.forumjv = {};
	beatrice.forumjv.init = function init() {
		var ref, i;
		this.$.initStyles();
		this.$.initScripts();
		ref = this.$.jvc.forums;
		for (i = 0; i < 4; i += 1) {
			this[i] = ref[i];
		}
		return launch(this, this.$.loc.mode);
	};
	
	beatrice.forumjv.message = beatrice.jvc.message;
	beatrice.forumjv.form = beatrice.jvc.form;
	
	setTimeout(function () {launch(beatrice);}, 1);
}());