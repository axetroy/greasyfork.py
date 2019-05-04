// ==UserScript==
// @name         HitboxTV Homepage Video Pauser
// @namespace    https://twitter.com/BitOBytes
// @version      0.3
// @description  HitboxTV has implemented a video on their homepage that automatically plays. Let's stop that. Like... Now.
// @author       https://twitter.com/BitOBytes
// @match        http://www.hitbox.tv/
// @grant        none
// ==/UserScript==

window.onload = function () {
    setTimeout(init, 1000);
};

var init = function () {
    'use strict';
    var controls = document.getElementById('playerControls');
    if (controls && controls !== null) {
        var pause = controls.childNodes.item(0);
        if (pause && pause !== null && pause.className === 'pause') {
            pause.click();
            return;
        }
    }
    setTimeout(init, 1000);
};