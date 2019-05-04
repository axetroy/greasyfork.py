// ==UserScript==
// @name         New Userscript000
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
})();function addStyleSheet(style){
  var getHead = document.getElementsByTagName("HEAD")[0];
  var cssNode = window.document.createElement( 'style' );
  var elementStyle= getHead.appendChild(cssNode);
  elementStyle.innerHTML = style;
  return elementStyle;
}

//Custom Font, Logo and Minimap 
addStyleSheet('@import url(https://fonts.googleapis.com/css?family=Ubuntu);');  
GM_addStyle('* #logo {background-image: url("http://i.imgur.com/IxxRbwB.png");}'); 
GM_addStyle('* #minimap-canvas {background-image: url("http://i.imgur.com/n9zeMiT.png");}'); 
GM_addStyle('*{font-family: Ubuntu;}');
GM_addStyle('* .coordinates {font-family: Ubuntu;}');
GM_addStyle('* #leaderboard-panel {font-size: 24px;}');

var fillTextz = CanvasRenderingContext2D.prototype.fillText;
CanvasRenderingContext2D.prototype.fillText = function(){
    var argumentz = arguments;
    if(this.canvas.id == 'leaderboard-canvas'){
    this.font = 'bold 15px Ubuntu';
    }
    if(this.canvas.id == 'minimap-canvas'){
    this.font = 'bold 15px Ubuntu';
    }
    if(this.canvas.id == 'party-canvas'){
    this.font = 'bold 15px Ubuntu';
    }
    fillTextz.apply(this, arguments);
};
