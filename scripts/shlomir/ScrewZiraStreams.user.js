// ==UserScript==
// @name         ScrewZiraStreams
// @namespace    http://srstreams.tk/
// @version      0.1
// @description  srstreams.tk search link on screwzira.com
// @author       SrStreams
// @match        *://*.screwzira.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.querySelectorAll("#FilmSecondaryTitle")
        .forEach
    (
        function callback(currentValue)
        {
            var el = currentValue.parentNode.querySelector(".sitemod-btn");
            if(el) currentValue.parentNode.removeChild(el);
            el=document.createElement("a");
            el.className="sitemod-btn btn btn-success roundAll";
            el.innerText="[ StReams ]";
            el.target="_blank";
            el.href="https://srstreams.herokuapp.com/?q="+currentValue.innerText.replace(/[^a-zA-Z ]/g, " ");
            currentValue.appendChild(el);
        }
    );
})();