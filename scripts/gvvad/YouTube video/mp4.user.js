// ==UserScript==
// @name YouTube video/mp4
// @version 0.3
// @description Plays video in h.264 format.
// @author gvvad
// @run-at document-start
// @license GPL-3.0-only; http://www.gnu.org/licenses/gpl-3.0.txt
// @include *.youtube.com/*
// @noframes
// @namespace   https://greasyfork.org/users/100160
// ==/UserScript==
(function () {
    'use strict';

    function f(str) {
        let splt = str.split(",");
        for (let i = 0; i < splt.length; i++) {
            if (0 <= splt[i].indexOf("webm")) {
                splt.splice(i, 1);
                i--;
            }
        }
        return splt.join(",");
    }

    function a() {
        //remove webm formats from config var string
        this.ytplayer = this.ytplayer || {};
        Object.defineProperty(this.ytplayer, "config", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value || {};
                try {
                    this._data.args.adaptive_fmts = f(this._data.args.adaptive_fmts);
                    this._data.loaded = !1;
                } catch (e) {}
            },
            configurable: !0,
            enumerable: !0
        });
    }

    window.addEventListener("load", function () {
        let observer = new MutationObserver(function () {
            let mp = document.querySelector("div#movie_player");
            if (mp) {
                //Inject custom code
                mp._loadVideoByPlayerVars = mp.loadVideoByPlayerVars;
                mp.loadVideoByPlayerVars = function (a) {
                    a.adaptive_fmts = f(a.adaptive_fmts);
                    this._loadVideoByPlayerVars(a);
                };
                this.disconnect();
            }
        });
        observer.observe(document.body, { attributes: !1, childList: !0, characterData: !1 });
    });

    try {
        //Get Global window object
        let g = Function("return this")();
        a.call(g);
    } catch (e) {}
})();