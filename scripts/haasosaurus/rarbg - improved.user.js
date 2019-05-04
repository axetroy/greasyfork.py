// ==UserScript==
// @name         rarbg - improved
// @namespace    sansoo
// @version      1.0
// @description  rarbg search input focus and improved category links
// @author       sansoo
// @match        http://*rarbg.to/*
// @match        https://*rarbg.to/*
// @match        http://*rarbg.com/*
// @match        https://*rarbg.com/*
// @match        http://*rarbgaccessed.org/*
// @match        https://*rarbgaccessed.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var elem = document.getElementById("searchinput");
    if(typeof elem !== 'undefined' && elem !== null) {
        var query = document.querySelector("#searchinput");
        if (query) {
            query.setAttribute("tabindex", "-1");
        }

        document.getElementById("searchinput").removeAttribute("onclick");
        document.getElementById("searchinput").removeAttribute("onfocus");
        document.getElementById("searchinput").removeAttribute("onblur");
        document.getElementById('searchinput').focus();
        var searchval = document.getElementById('searchinput').getAttribute("value");
        if (searchval != "") {
            document.getElementById('searchinput').setAttribute("value", searchval + " ");
        }
        else {
            document.getElementById('searchinput').setAttribute("value", " ");
        }
    }

    var linklist = document.getElementsByClassName("tdlinkfull2");
    for (var i = 0; i < linklist.length; i++) {
        var tmphref = linklist[i].href;
        if (i == 0) {
            linklist[i].href = tmphref + "?order=seeders&by=DESC";
        }
        else if (i == 1 || i == 2 || i == 3) {
            linklist[i].href = tmphref + "&search=1080&order=seeders&by=DESC";
        }
        else {
            linklist[i].href = tmphref + "&order=seeders&by=DESC";
        }
    }
})();
