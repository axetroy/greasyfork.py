// ==UserScript==
// @name         Instagram-native-player
// @namespace    Kenya-West
// @version      0.3
// @description  This little script replaces Instagram's player with the native one built in browser
// @author       Kenya-West
// @include      *instagram.com*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    window.onload = getRid;
    window.addEventListener('popstate', getRid);
    window.addEventListener('hashchange', getRid);

    //a hook for a url path change
    var _wr = function (type) {
        var orig = history[type];
        return function () {
            var rv = orig.apply(this, arguments);
            var e = new Event(type);
            e.arguments = arguments;
            window.dispatchEvent(e);
            return rv;
        };
    };
    history.pushState = _wr('pushState'), history.replaceState = _wr('replaceState'); //Chrome only feature... perhaps

    window.addEventListener('replaceState', function (e) {
        getRid();
    });

    function getRid() {
        if (document.querySelector("._c2kdw")) document.querySelector("._c2kdw").remove();
        if (document.querySelector("._80v0r")) document.querySelector("._80v0r").remove();
        if (document.querySelector("._7thjo")) document.querySelector("._7thjo").remove();
        if (document.querySelector("._j12ff")) document.querySelector("._j12ff").remove();
        if (document.querySelector("._sajt6")) document.querySelector("._sajt6").remove();

        var video = document.querySelector("._l6uaz");
        if (video && video.hasAttribute("controls")) {
            video.removeAttribute("controls");
        } else if (video) {
            video.setAttribute("controls", "controls");
        }
        video.play();

        console.log("Successfully replaced Instagram videoplayer with a native one"); //production::enable
    }

})();