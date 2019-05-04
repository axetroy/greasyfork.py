// ==UserScript==
// @name BackToTop
// @version      1
// @namespace Violentmonkey Scripts
// @grant none
// @description  Adds a back tp top link on every website.
// @author       Vorticalbox
// ==/UserScript==
document.body.id="vboxtop";
var div = document.createElement('div');
document.body.appendChild(div);
div.innerHTML = '<a href="#vboxtop">Back to top</a>';
div.style.position = "fixed"
div.style.left = "95%"
div.style.bottom = "0"