// ==UserScript==
// @name         Diep.io Background Image
// @namespace    Mega_Mewthree
// @version      0.0.1
// @description  Set a background image for Diep.io.
// @author       Mega_Mewthree
// @match        http://diep.io
// @match        http://diep.io/*
// @match        https://diep.io
// @match        https://diep.io/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

/*
Configure the background image by setting the backgroundImageURL variable (after the copyright notice).

Discord server: https://nebula.mooo.info/discord-invite
GitHub: https://github.com/Mega-Mewthree/Diep.io-Background-Image

For a higher success rate:
Go to Tampermonkey Settings, set Config Mode to Advanced, and then scroll down to Experimental and set Inject Mode to Instant.
*/

/*
MIT License

Copyright (c) 2019 Mega-Mewthree

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

(() => {
    const backgroundImageURL = "https://i.imgur.com/9rlX0gI.jpg"; // Should be https, not http

    const background = {
        ready: false,
        image: new Image()
    };

    background.image.src = backgroundImageURL;
    background.image.onload = function () {
        background.ready = true;
    };

    // Get the native functions
    let _fillText = CanvasRenderingContext2D.prototype.fillText;
    let _fillRect = CanvasRenderingContext2D.prototype.fillRect;
    let _alert = window.alert;
    let _toString = Function.prototype.toString;

    // Create seperate hooked versions for them
    let fillText = function () {
        if (arguments[0] == "You're using an adblocker, please consider disabling it to support the game") {
            arguments[0] = "";
        }
        return _fillText.apply(this, arguments);
    };
    let fillRect = function () {
        if (arguments[2] > 1000 && arguments[3] > 1000 && background.ready){
            this.fillStyle = "rgba(0,0,0,0)";
            this.setTransform(1, 0, 0, 1, 0, 0);
            this.drawImage(background.image, 0, 0, this.canvas.width, this.canvas.height);
        }
        return _fillRect.apply(this, arguments);
    };
    let alert = function () {
        return _alert.call(this, "Extension detection was triggered. Please refresh.");
    };
    let toString = function () {
        if (this == CanvasRenderingContext2D.prototype.fillText) return _toString.call(_fillText);
        if (this == CanvasRenderingContext2D.prototype.fillRect) return _toString.call(_fillRect);
        if (this == window.alert) return _toString.call(_alert);
        if (this == Function.prototype.toString) return _toString.call(_toString);
        return _toString.call(this);
    };

    // Override the prototypes of the default functions
    fillText.__proto__ = _fillText.prototype;
    fillText.prototype = _fillText.prototype;
    fillRect.__proto__ = _fillRect.prototype;
    fillRect.prototype = _fillRect.prototype;
    toString.__proto__ = _toString.prototype;
    toString.prototype = _toString.prototype;

    // Set the hooks
    CanvasRenderingContext2D.prototype.fillText = fillText;
    CanvasRenderingContext2D.prototype.fillRect = fillRect;
    window.alert = alert;
    Function.prototype.toString = toString;

    document.currentScript && document.currentScript.remove();
})();
