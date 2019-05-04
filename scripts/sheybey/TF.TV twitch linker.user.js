// ==UserScript==
// @name            TF.TV twitch linker
// @namespace       epi
// @include         http://www.teamfortress.tv/*
// @version         1.1
// @grant           none
// @description:en  Make twitch sidebar links go directly to twitch.tv.
// @description Make twitch sidebar links go directly to twitch.tv.
// ==/UserScript==

(function () {
    "use strict";
    var re = /^\/stream\/(.+)$/;
    Array.prototype.forEach.call(
        document.querySelectorAll("#sidebar-right .module-item"),
        function (link) {
            link.setAttribute(
                "href",
                link.getAttribute("href").replace(
                    re,
                    "https://twitch.tv/$1"
                )
            );
            link.setAttribute("target", "_blank");
        }
    );
}());
