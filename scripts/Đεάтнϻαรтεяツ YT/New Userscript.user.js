// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://gota.io/web/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
})();var fillz = CanvasRenderingContext2D.prototype.fill;
    CanvasRenderingContext2D.prototype.fill = function(){
        var arguments_ = arguments;
        this.strokeStyle = this.fillStyle;
        this.lineWidth = '15';
        strokez.apply(this, arguments_);
    };
    var strokez = CanvasRenderingContext2D.prototype.stroke;
    CanvasRenderingContext2D.prototype.stroke = function(){
        var arguments_ = arguments;
        strokez.apply(this, arguments_);
    };
