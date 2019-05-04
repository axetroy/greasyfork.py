// ==UserScript==
// @name         imgpix.net
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Skip to the image
// @author       Yksok
// @match        http://imgpix.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $("#continuetoimage").find(".button").click();
})();