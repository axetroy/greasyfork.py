// ==UserScript==
// @name         LL-Trimax-Gota.io-UPDATE.V8
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  No Lag God Extension!
// @description  E - 16 Split -|- Q - Triple Split -|- D - Double Split |- R - Pop Split
// @author       Trimax#1k
// @match        http://gota.io/web/*
// @grant        GM_addStyle
// @contributor  Trimax
// @icon         https://i.imgur.com/eFhHQDo.png
// @downloadURL
// ==/UserScript==

function addStyleSheet(style){
    var getHead = document.getElementsByTagName("HEAD")[0];
    var cssNode = window.document.createElement( 'style' );
    var elementStyle= getHead.appendChild(cssNode);
    elementStyle.innerHTML = style;
    return elementStyle;
}

//Custom Font, Logo and Minimap
addStyleSheet('@import url(https://fonts.googleapis.com/css?family=Ubuntu);');
GM_addStyle('* #logo {background-image: url("https://i.imgur.com/eFhHQDo.png");}');
GM_addStyle('* #minimap-canvas {background-image: url("http://ka3boura.tn/mini-map.png");}');
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

//Custom Borders
GM_addStyle('* .main-panel {border: solid 3px rgba(99, 97, 95, 0.5)}');
GM_addStyle('* .main-panel {border-radius: 5px}');
GM_addStyle('* .main-panel {box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.52)}');
GM_addStyle('* .gota-btn {border-radius: 15px}');
GM_addStyle('* .main-bottom-stats {border-radius: 5px}');
GM_addStyle('* #popup-party {border-radius: 5px}');
GM_addStyle('* #popup-party {border-width: 2px}');
GM_addStyle('* #popup-party {box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.25)}');
GM_addStyle('* #popup-login {border-radius: 5px}');
GM_addStyle('* #popup-login {border-width: 2px}');
GM_addStyle('* #popup-login {box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.25)}');
GM_addStyle('* .login-input {border-radius: 0px}');
GM_addStyle('* #chat-input {border-radius: 0 0 0px 0px}');
GM_addStyle('* .ui-pane {box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.52)}');
GM_addStyle('* #chat-container {border-radius: 5px 5px 0px 0px}');
GM_addStyle('* .main-bottom-stats {box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.52)}');
document.getElementById("leaderboard-panel").style.borderRadius = "9px";
document.getElementById("leaderboard-panel").style.borderWidth = "4px";
document.getElementById("leaderboard-panel").style.boxShadow = "0px 0px 0px transparent";
document.getElementById("score-panel").style.borderRadius = "9px";
document.getElementById("score-panel").style.borderWidth = "4px";
document.getElementById("score-panel").style.boxShadow = "0px 0px 0px transparent";
document.getElementById("minimap-panel").style.borderRadius = "9px";
document.getElementById("minimap-panel").style.borderWidth = "4px";
document.getElementById("minimap-panel").style.boxShadow = "0px 0px 0px transparent";
document.getElementById("party-panel").style.borderRadius = "9px";
document.getElementById("party-panel").style.borderWidth = "4px";
document.getElementById("party-panel").style.boxShadow = "0px 0px 0px transparent";

//Miscellaneous UI Changing code
GM_addStyle('* #chat-panel {width: 300px}');
GM_addStyle('* #chat-panel {height: 195px}');
GM_addStyle('* #chat-input {font-weight: bold}');
GM_addStyle('* .stext {margin-top: 2px}');
GM_addStyle('* .stext {margin-bottom: 2px}');
GM_addStyle('* #name-box {font-weight: bold}');
GM_addStyle('* .server-row:hover {font-size: 16px}');
GM_addStyle('* .server-row:hover {font-weight: bold}');
GM_addStyle('* .server-row {transition: all 0.2s}');
GM_addStyle('* .gota-btn:hover {filter: hue-rotate(25deg)}');
GM_addStyle('* .gota-btn:hover {box-shadow: 0px 0px 0px rgba(10,10,10,10)}');
GM_addStyle('* .main-panel {background: #000000}');
GM_addStyle('* .bottom-btn {margin-bottom: 3px}');
GM_addStyle('* #main {width: 1025px; background-color: transparent; border: none;}');
GM_addStyle('* #main-content {width: 305px; height: 490px; margin-top: 80px;}');
GM_addStyle('* #main-side {height: 490px; margin-top: 80px;}');
GM_addStyle('* #main-left {margin-top: 80px; margin-right: 11px; margin-left: -16px; height: 300px;}');
GM_addStyle('* .keybinds-btn {background: white; border: 1.5px solid black; border-radius: 15px; color: black; font-weight: bold}');
GM_addStyle('* .keybinds-table {background: #333; border-radius: 5px; padding: 12px;}');

//Social Media Button Removal
$(".main-bottom-links").replaceWith("");

//Script Version Indicator
var maincontent = document.getElementById("main-content");
var ffscversion = document.createElement("div");
ffscversion.innerHTML = 'Subscribe to 『LL』 Trimax<br>http://www.youtube.com/c/TrimaxYT ';
ffscversion.id = '『LL』 Trimax-Script';
maincontent.appendChild(ffscversion);
document.getElementById("『LL』 Trimax-Script").style.cssText = "text-align:center;font-size:18px;color:red;";

//Custom Crosshair
GM_addStyle ('* body {cursor: url(http://i.imgur.com/inmtCDl.png)16 16, auto;}');

//Hide food toggle
document.addEventListener('keydown', function(e) {
    var key = e.keyCod || e.which;
    switch (key) {case 45: document.getElementById("cHideFood").click();}});

//Disable coordinates
if (document.getElementById('cHideCoordinates').checked === false) {
    document.getElementById('cHideCoordinates').click();
}

function addStyleSheet(style){
    var getHead = document.getElementsByTagName("HEAD")[0];
    var cssNode = window.document.createElement( 'style' );
    var elementStyle= getHead.appendChild(cssNode);
    elementStyle.innerHTML = style;
    return elementStyle;
}

//Border Removal
document.getElementById("leaderboard-panel").style.borderRadius = "0";
document.getElementById("leaderboard-panel").style.borderWidth = "0px";
document.getElementById("leaderboard-panel").style.boxShadow = "0px 0px 0px black";
document.getElementById("score-panel").style.borderRadius = "0";
document.getElementById("score-panel").style.borderWidth = "0px";
document.getElementById("score-panel").style.boxShadow = "0px 0px 0px black";
document.getElementById("minimap-panel").style.borderRadius = "0";
document.getElementById("minimap-panel").style.borderWidth = "0px";
document.getElementById("minimap-panel").style.boxShadow = "0px 0px 0px black";
document.getElementById("minimap-panel").style.marginBottom = "3px";
document.getElementById("party-panel").style.borderRadius = "0";
document.getElementById("party-panel").style.borderWidth = "0px";
document.getElementById("party-panel").style.boxShadow = "0px 0px 0px black";

//Panel Borders
GM_addStyle('* .main-panel {border: solid 3px rgba(99, 97, 95, 0.5)}');
GM_addStyle('* .main-panel {border-radius: 0px}');
GM_addStyle('* .main-panel {box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.52)}');
GM_addStyle('* .gota-btn {border-radius: 15px}');
GM_addStyle('* .main-bottom-stats {border-radius: 5px}');
GM_addStyle('* #popup-party {border-radius: 0px}');
GM_addStyle('* #popup-party {box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.25)}');
GM_addStyle('* #popup-login {border-radius: 0px}');
GM_addStyle('* #popup-login {box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.25)}');
GM_addStyle('* .login-input {border-radius: 0px}');
GM_addStyle('* #chat-input {border-radius: 0 0 0px 0px}');
GM_addStyle('* .ui-pane {box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.52)}');


//Social Media Buttons Removal
$(".main-bottom-links").replaceWith("");

//Instructions
var maincontent = document.getElementById("main-content");
var version = document.createElement("div");
version.innerHTML = 'E - 16 Split -|- Q - Triple Split -|- D - Double Split |- R - Pop Split ';
version.id = 'instructions';
maincontent.appendChild(version);
document.getElementById("instructions").style.textAlign = "center";
document.getElementById("instructions").style.fontSize = "12px";
document.getElementById("instructions").style.color = "white";

//Ad Remove
$("#main-rb").replaceWith("");
GM_addStyle ('* #main {left: 350px;}');

//Custom Cursor
GM_addStyle ('* body {cursor: crosshair;}');

//Double Split
(function() {
    var amount = 2;
    var duration = 5;

    var overwriting = function(evt) {
        if (evt.keyCode === 68) {
            for (var i = 0; i < amount; ++i) {
                setTimeout(function() {
                    window.onkeydown({keyCode: 32});
                    window.onkeyup({keyCode: 32});
                }, i * duration);
            }
        }
    };

    window.addEventListener('keydown', overwriting);
})();

//Triple Split Macro
(function() {
    var amount = 3;
    var duration = 5;

    var overwriting = function(evt) {
        if (evt.keyCode === 81) {
            for (var i = 0; i < amount; ++i) {
                setTimeout(function() {
                    window.onkeydown({keyCode: 32});
                    window.onkeyup({keyCode: 32});
                }, i * duration);
            }
        }
    };

    window.addEventListener('keydown', overwriting);
})();

//16 Split Macro
(function() {
    var amount = 4;
    var duration = 5;

    var overwriting = function(evt) {
        if (evt.keyCode === 69) {
            for (var i = 0; i < amount; ++i) {
                setTimeout(function() {
                    window.onkeydown({keyCode: 32});
                    window.onkeyup({keyCode: 32});
                }, i * duration);
            }
        }
    };

    window.addEventListener('keydown', overwriting);
})();

//Pop Split
(function() {
    var amount = 2;
    var duration = 120;

    var overwriting = function(evt) {
        if (evt.keyCode === 82) {
            for (var i = 0; i < amount; ++i) {
                setTimeout(function() {
                    window.onkeydown({keyCode: 32});
                    window.onkeyup({keyCode: 32});
                }, i * duration);
            }
        }
    };

    window.addEventListener('keydown', overwriting);
})();