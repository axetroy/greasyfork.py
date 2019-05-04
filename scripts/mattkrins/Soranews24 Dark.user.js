// ==UserScript==
// @name         Soranews24 Dark
// @description  Stop your eyes from bleeding
// @version      1.5
// @author       Matt Krins
// @namespace    https://gist.github.com/mattkrins
// @icon         https://s2.wp.com/wp-content/themes/vip/rocketnews-en/img/pts_logo.png
// @homepageURL  https://gist.github.com/mattkrins/d06c7504bf92efe933b50dc3b9308573
// @match        *://soranews24.com/*
// @grant        none
// @copyright 2018, mattkrins (https://gist.github.com/mattkrins/)
// @license MIT
// ==/UserScript==

(function() {
    'use strict';
    // Header
    document.getElementById("container").style.backgroundImage = "url('https://i.imgur.com/Q12f9JP.png')";
    // Content
    document.getElementById("content").style.backgroundImage = "url('https://i.imgur.com/ncpuh4m.png')";
    document.getElementById("content").style.backgroundRepeat = "repeat-y";
    document.getElementById("content").style.backgroundPosition = "8px";
    document.getElementById("content").style.padding = "0";
    // Body
    document.body.style.background = "none";
    document.body.style.backgroundColor = "#181818";
    document.body.style.backgroundImage = "url('https://i.imgur.com/JytZTrQ.jpg')";
    document.body.style.backgroundPosition = "center top";
    document.body.style.backgroundRepeat = "no-repeat";
})();