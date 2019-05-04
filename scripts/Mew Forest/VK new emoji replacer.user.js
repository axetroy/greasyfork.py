// ==UserScript==
// @name         VK new emoji replacer
// @description  Заменяет некоторые старые эмодзи на новые на vk.com
// @version      0.2.1
// @author       MewForest
// @match        *://*vk.com/*
// @namespace    http://ext.redleaves.ru
// @grant        none
// @namespace https://greasyfork.org/users/31125
// ==/UserScript==

(function () {
	// Arrive.js
	// source: https://greasyfork.org/scripts/21845-arrive-js/code/Arrivejs.js?version=139217
	var Arrive = function (e, t, n) {
		"use strict";

		function r(e, t, n) {
			l.addMethod(t, n, e.unbindEvent), l.addMethod(t, n, e.unbindEventWithSelectorOrCallback), l.addMethod(t, n, e.unbindEventWithSelectorAndCallback)
		}

		function i(e) {
			e.arrive = f.bindEvent, r(f, e, "unbindArrive"), e.leave = d.bindEvent, r(d, e, "unbindLeave")
		}
		if (e.MutationObserver && "undefined" != typeof HTMLElement) {
			var o = 0,
				l = function () {
					var t = HTMLElement.prototype.matches || HTMLElement.prototype.webkitMatchesSelector || HTMLElement.prototype.mozMatchesSelector || HTMLElement.prototype.msMatchesSelector;
					return {
						matchesSelector: function (e, n) {
							return e instanceof HTMLElement && t.call(e, n)
						},
						addMethod: function (e, t, n) {
							var r = e[t];
							e[t] = function () {
								return n.length == arguments.length ? n.apply(this, arguments) : "function" == typeof r ? r.apply(this, arguments) : void 0
							}
						},
						callCallbacks: function (e) {
							for (var t, n = 0; t = e[n]; n++) t.callback.call(t.elem)
						},
						checkChildNodesRecursively: function (e, t, n, r) {
							for (var i, o = 0; i = e[o]; o++) n(i, t, r) && r.push({
								callback: t.callback,
								elem: i
							}), i.childNodes.length > 0 && l.checkChildNodesRecursively(i.childNodes, t, n, r)
						},
						mergeArrays: function (e, t) {
							var n, r = {};
							for (n in e) r[n] = e[n];
							for (n in t) r[n] = t[n];
							return r
						},
						toElementsArray: function (t) {
							return "undefined" == typeof t || "number" == typeof t.length && t !== e || (t = [t]), t
						}
					}
				}(),
				c = function () {
					var e = function () {
						this._eventsBucket = [], this._beforeAdding = null, this._beforeRemoving = null
					};
					return e.prototype.addEvent = function (e, t, n, r) {
						var i = {
							target: e,
							selector: t,
							options: n,
							callback: r,
							firedElems: []
						};
						return this._beforeAdding && this._beforeAdding(i), this._eventsBucket.push(i), i
					}, e.prototype.removeEvent = function (e) {
						for (var t, n = this._eventsBucket.length - 1; t = this._eventsBucket[n]; n--) e(t) && (this._beforeRemoving && this._beforeRemoving(t), this._eventsBucket.splice(n, 1))
					}, e.prototype.beforeAdding = function (e) {
						this._beforeAdding = e
					}, e.prototype.beforeRemoving = function (e) {
						this._beforeRemoving = e
					}, e
				}(),
				a = function (t, r) {
					var i = new c,
						o = this,
						a = {
							fireOnAttributesModification: !1
						};
					return i.beforeAdding(function (n) {
						var i, l = n.target;
						n.selector, n.callback, (l === e.document || l === e) && (l = document.getElementsByTagName("html")[0]), i = new MutationObserver(function (e) {
							r.call(this, e, n)
						});
						var c = t(n.options);
						i.observe(l, c), n.observer = i, n.me = o
					}), i.beforeRemoving(function (e) {
						e.observer.disconnect()
					}), this.bindEvent = function (e, t, n) {
						t = l.mergeArrays(a, t);
						for (var r = l.toElementsArray(this), o = 0; o < r.length; o++) i.addEvent(r[o], e, t, n)
					}, this.unbindEvent = function () {
						var e = l.toElementsArray(this);
						i.removeEvent(function (t) {
							for (var r = 0; r < e.length; r++)
								if (this === n || t.target === e[r]) return !0;
							return !1
						})
					}, this.unbindEventWithSelectorOrCallback = function (e) {
						var t, r = l.toElementsArray(this),
							o = e;
						t = "function" == typeof e ? function (e) {
							for (var t = 0; t < r.length; t++)
								if ((this === n || e.target === r[t]) && e.callback === o) return !0;
							return !1
						} : function (t) {
							for (var i = 0; i < r.length; i++)
								if ((this === n || t.target === r[i]) && t.selector === e) return !0;
							return !1
						}, i.removeEvent(t)
					}, this.unbindEventWithSelectorAndCallback = function (e, t) {
						var r = l.toElementsArray(this);
						i.removeEvent(function (i) {
							for (var o = 0; o < r.length; o++)
								if ((this === n || i.target === r[o]) && i.selector === e && i.callback === t) return !0;
							return !1
						})
					}, this
				},
				u = function () {
					function e(e) {
						var t = {
							attributes: !1,
							childList: !0,
							subtree: !0
						};
						return e.fireOnAttributesModification && (t.attributes = !0), t
					}

					function t(e, t) {
						e.forEach(function (e) {
							var n = e.addedNodes,
								i = e.target,
								o = [];
							null !== n && n.length > 0 ? l.checkChildNodesRecursively(n, t, r, o) : "attributes" === e.type && r(i, t, o) && o.push({
								callback: t.callback,
								elem: node
							}), l.callCallbacks(o)
						})
					}

					function r(e, t, r) {
						if (l.matchesSelector(e, t.selector) && (e._id === n && (e._id = o++), -1 == t.firedElems.indexOf(e._id))) {
							if (t.options.onceOnly) {
								if (0 !== t.firedElems.length) return;
								t.me.unbindEventWithSelectorAndCallback.call(t.target, t.selector, t.callback)
							}
							t.firedElems.push(e._id), r.push({
								callback: t.callback,
								elem: e
							})
						}
					}
					var i = {
						fireOnAttributesModification: !1,
						onceOnly: !1,
						existing: !1
					};
					f = new a(e, t);
					var c = f.bindEvent;
					return f.bindEvent = function (e, t, n) {
						"undefined" == typeof n ? (n = t, t = i) : t = l.mergeArrays(i, t);
						var r = l.toElementsArray(this);
						if (t.existing) {
							for (var o = [], a = 0; a < r.length; a++)
								for (var u = r[a].querySelectorAll(e), s = 0; s < u.length; s++) o.push({
									callback: n,
									elem: u[s]
								});
							if (t.onceOnly && o.length) return n.call(o[0].elem);
							setTimeout(l.callCallbacks, 1, o)
						}
						c.call(this, e, t, n)
					}, f
				},
				s = function () {
					function e(e) {
						var t = {
							childList: !0,
							subtree: !0
						};
						return t
					}

					function t(e, t) {
						e.forEach(function (e) {
							var r = e.removedNodes,
								i = (e.target, []);
							null !== r && r.length > 0 && l.checkChildNodesRecursively(r, t, n, i), l.callCallbacks(i)
						})
					}

					function n(e, t) {
						return l.matchesSelector(e, t.selector)
					}
					var r = {};
					d = new a(e, t);
					var i = d.bindEvent;
					return d.bindEvent = function (e, t, n) {
						"undefined" == typeof n ? (n = t, t = r) : t = l.mergeArrays(r, t), i.call(this, e, t, n)
					}, d
				},
				f = new u,
				d = new s;
			t && i(t.fn), i(HTMLElement.prototype), i(NodeList.prototype), i(HTMLCollection.prototype), i(HTMLDocument.prototype), i(Window.prototype);
			var v = {};
			return r(f, v, "unbindAllArrive"), r(d, v, "unbindAllLeave"), v
		}
	}(window, "undefined" == typeof jQuery ? null : jQuery, void 0);

	// Emoji replace function with Arrive.js
	function replaceEmoji(oldEmoji, newEmoji) {
		document.body.arrive(oldEmoji, {
			fireOnAttributesModification: false,
			existing: true
		}, function () {
			this.outerHTML = newEmoji;
		});
	}
	// Emoji updater for Tab / adding emoji dialog
	function changeEmojiTab(emojiTab, emoji_sprite_class, emoji_a_class, pngEmoji) {
		try {
			emojiTab.classList.remove(emoji_sprite_class);
			emojiTab.classList.remove(emoji_a_class);
			emojiTab.style.backgroundImage = "url('data:image/png;base64," + pngEmoji + "')";
			emojiTab.style.backgroundSize = "16px";
			emojiTab.style.backgroundPosition = "0px 0px";
		} catch (err) {
			console.log("No emoji in quick add");
		}
		try {
			var emojiTab2 = document.querySelectorAll('i[emoji="' + emoji_i_class + '"]')[1];
			emojiTab2.classList.remove(emoji_sprite_class);
			emojiTab2.classList.remove(emoji_a_class);
			emojiTab2.style.backgroundImage = "url('data:image/png;base64," + pngEmoji + "')";
			emojiTab2.style.backgroundSize = "16px";
			emojiTab2.style.backgroundPosition = "0px 0px";
		} catch (err) {
			console.log("No emoji in simple adding");
		}
	}
	// Specify function for replacing only showed emoji
	function emojiTabReplacer(emoji_sprite_class, emoji_a_class, emoji_i_class, pngEmoji) {
		if (chkObject('.emoji_smile_on') == true) {
			var emojiTab = document.querySelector('i[emoji="' + emoji_i_class + '"]');
			changeEmojiTab(emojiTab, emoji_sprite_class, emoji_a_class, pngEmoji);
		}
	}
	// Checker if emoji in dialog
	function chkObject(elem) {
		return (document.querySelector(elem)) ? true : false;
	}

    // < Run main script here >

    // Replace "Smiling Face" to new on page (20.12 edit);
	var pngEmoji = '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';
	var oldEmoji = ':not(.im_editable):not(.fc_editable):not(#post_field):not(#wpe_text):not(.reply_field):not([contenteditable="true"]) > img[src="/emoji/e/e298ba.png"]';
	var newEmoji = '<img class="emoji" alt="☺" src="data:image/png;base64, ' + pngEmoji + '">';
	replaceEmoji(oldEmoji, newEmoji);

    // Replace "Smiling Face" to new on Tab dialog  (new vk.com edit);

	var emoji_sprite_class = 'e298ba';
	var emoji_i_class = '@e298ba';
	var emoji_a_class = '@e298ba';
    var png_emoji = pngEmoji;

	var timer_emoji1 = setInterval(emojiTabReplacer(emoji_sprite_class, emoji_a_class, emoji_i_class, png_emoji), 500);

})();
