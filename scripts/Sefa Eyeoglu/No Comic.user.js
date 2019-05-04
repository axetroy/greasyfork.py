// ==UserScript==
// @name         No Comic
// @namespace    https://scrumplex.net/
// @version      0.2
// @description  Never see Comic Sans again!
// @author       Scrumplex
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function addJQuery(callback) {
        var script = document.createElement("script");
        script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
        script.addEventListener('load', function() {
            var script = document.createElement("script");
            script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
            document.body.appendChild(script);
        }, false);
        document.body.appendChild(script);
    }

    function main() {
        var timer = function() {
            jQ("*").each(function(index, elem) {
                elem = jQ(elem);
                if(elem.css("font-family").toLowerCase().indexOf("comic") !== -1) {
                    elem.css({"font-family": "inherit"});
                }
            });
        };
        timer();
        setInterval(timer, 2000);
    }

    addJQuery(main);
})();