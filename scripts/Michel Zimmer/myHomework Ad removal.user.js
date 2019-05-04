// ==UserScript==
// @name         myHomework Ad removal
// @namespace    https://www.mzimmer.net/
// @version      1.0.1
// @description  Removes ads on myhomework.com and and allows display of third column
// @author       Michel Zimmer <mzimmer@uni-bremen.de> (https://www.mzimmer.net)
// @match        https://myhomeworkapp.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $("body").removeClass("hasAds");
    $(".ads-col").hide();
})();
