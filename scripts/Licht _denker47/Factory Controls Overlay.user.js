// ==UserScript==
// @name         Factory Controls Overlay
// @namespace    ??
// @version      1
// @description  Alternate Version
// @author       adasba and 325 Gerbils and Licht.
// @match        http://diep.io/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    window.onload = init;
    var mouseX, mouseY;

    function init() {
        if (window.Event) {
            document.captureEvents(Event.MOUSEMOVE);
        }
        document.onmousemove = getCursorXY;
    }

    function getCursorXY(e) {
        mouseX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
        mouseY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    }
    var c2 = document.createElement('canvas');
    c2.style = "position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:-1;";
    document.getElementsByTagName('body')[0].appendChild(c2);
    var ctx2 = c2.getContext('2d');

    var c = document.getElementById('canvas');
    var ctx = c.getContext('2d');
    c.style.opacity = 0;

    var i = 0;

    var depth = 6;

    c2.width = c.width;
    c2.height = c.height;

    window.addEventListener('resize', function () {
        c2.width = c.width;
        c2.height = c.height;
    }, false);

    var radius = [];
    var style = [];

    document.addEventListener('mousedown', function (e) {
        var button = e.button;
        if (button === 0) {
            radius[0] = c2.width * 0.17681239669;
            radius[1] = c2.width * 0.06545454545;
            style[0] = 'rgba(21,181,223,0.25)';
            style[1] = 'rgba(255,80,13,0.25)';
            }
        else if (button == 2) {
            radius[0] = c2.width * 0.16751239669;
            radius[1] = c2.width * 0.06545454545;
            style[0] = 'rgba(255,80,13,0.25)';
            style[1] = 'rgba(21,181,223,0.25)';
        }
    });

    function loop() {

        ctx2.clearRect(0, 0, c2.width, c2.height);
        ctx2.drawImage(c, 0, 0, c2.width, c2.height);

        var centerX = c2.width / 2;
        var centerY = c2.height / 2;

        ctx2.beginPath();
        ctx2.arc(mouseX, mouseY, radius[0], 0, 2 * Math.PI, false);
        ctx2.fillStyle = 'transparent';
        ctx2.fill();
        ctx2.lineWidth = 5;
        ctx2.strokeStyle = style[0];
        ctx2.stroke();

        ctx2.beginPath();
        ctx2.arc(mouseX, mouseY, radius[1], 0, 2 * Math.PI, false);
        ctx2.fillStyle = 'transparent';
        ctx2.fill();
        ctx2.lineWidth = 5;
        ctx2.strokeStyle = style[1];
        ctx2.stroke();

        requestAnimationFrame(loop);
    }
    loop();
})();