// ==UserScript==
// @name         Agarplus.io/Gota
// @namespace    YOLO
// @version      1.2.2
// @description  Gota.io script
// @author       freebie - (editied by Christian)
// @match        http://gota.io/web/*
// @grant        GM_addStyle
// @contributor  pussi
// ==/UserScript==

spike.src = "http://i.imgur.com/9h5l8WR.png";
 
spike_mother.src = "https://3.bp.blogspot.com/-v7ske0vYsvI/V1n0QXZBhlI/AAAAAAAACoQ/_7ZKdQJVnFk8wx8duBPeOjyzPHKd82vGgCLcB/s320/zen5.png";
 
GM_addStyle('* #logo {background-image: url("http://i.imgur.com/ehoqATC.png");}');
 
addStyleSheet('@import url(https://fonts.googleapis.com/css?family=Ubuntu);');
 
GM_addStyle('* @font-face {font-family: "Ubuntu"; src: url("https://fonts.googleapis.com/css?family=Ubuntu");}');
GM_addStyle('* .coordinates {font-family: Ubuntu;}');
GM_addStyle('* #leaderboard-panel {font-size: 25px;}');

var fillTextz = CanvasRenderingContext2D.prototype.fillText;
CanvasRenderingContext2D.prototype.fillText = function(){
    var argumentz = arguments;
    if(this.canvas.id == 'leaderboard-canvas'){
    this.font = 'bold 13px Ubuntu';
    }
    if(this.canvas.id == 'minimap-canvas'){
    this.font = 'bold 15px Ubuntu';
    }
    if(this.canvas.id == 'party-canvas'){
    this.font = 'bold 12px Ubuntu';
    }
    fillTextz.apply(this, arguments);
};
    
function addStyleSheet(style){
  var getHead = document.getElementsByTagName("HEAD")[0];
  var cssNode = window.document.createElement( 'style' );
  var elementStyle= getHead.appendChild(cssNode);
  elementStyle.innerHTML = style;
  return elementStyle;
}
//DoubleSplit(Press Q)
(function() {
var amount = 2;
var duration = 1; //ms

var overwriting = function(evt) {
if (evt.keyCode === 81) { // KEY_Q
for (var i = 0; i < amount; ++i) {
setTimeout(function() {
window.onkeydown({keyCode: 32}); // KEY_space
window.onkeyup({keyCode: 32});
}, i * duration);
}
}
};

window.addEventListener('keydown', overwriting);
})();

//Triple(Press E)
(function() {
var amount = 3;
var duration = 1; //ms

var overwriting = function(evt) {
if (evt.keyCode === 69) { // KEY_E
for (var i = 0; i < amount; ++i) {
setTimeout(function() {
window.onkeydown({keyCode: 32}); // KEY_space
window.onkeyup({keyCode: 32});
}, i * duration);
}
}
};

window.addEventListener('keydown', overwriting);
})();

//16xSplit (Press Q)
(function() {
var amount = 4;
var duration = 1; //ms

var overwriting = function(evt) {
if (evt.keyCode === 16) { // KEY_SHIFT
for (var i = 0; i < amount; ++i) {
setTimeout(function() { 
window.onkeydown({keyCode: 32}); // KEY_space
window.onkeyup({keyCode: 32});
}, i * duration);
}
}
};

window.addEventListener('keydown', overwriting);
})();

//LineSplitKey
document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '82') {
    player.mouseRawX = canvas.width / 2;
    player.mouseRawY = canvas.height / 2;
    }
}



//Custom Crosshair
GM_addStyle ('* body {cursor: crosshair;}');

//Version
var maincontent = document.getElementById("main-content");
  var ffscversion = document.createElement("div");
  ffscversion.innerHTML = "Version: 1.2.2 || By Christian " + "<br> Q -Double Split , E - TripleSplit , Shift - TrickSplit , R - LineSplit </br>" + "<br> F - Hide/Show Mass </br>";
  ffscversion.id = 'ffecscript';
  maincontent.appendChild(ffscversion);
document.getElementById("ffecscript").style.textAlign = "center";
document.getElementById("ffecscript").style.fontSize = "12px";
document.getElementById("ffecscript").style.color = "white";

//social buttons remove
$(".main-bottom-links").replaceWith("");

//Border Removal
document.getElementById("leaderboard-panel").style.borderRadius = "0";
document.getElementById("leaderboard-panel").style.borderWidth = "0px"; 
document.getElementById("leaderboard-panel").style.boxShadow = "0px 0px 0px black";
document.getElementById("score-panel").style.borderRadius = "4px";
document.getElementById("score-panel").style.borderWidth = "0px"; 
document.getElementById("score-panel").style.boxShadow = "0px 2px 0px gray";
document.getElementById("minimap-panel").style.borderRadius = "0";
document.getElementById("minimap-panel").style.borderWidth = "0px"; 
document.getElementById("minimap-panel").style.boxShadow = "0px 0px 0px white";
document.getElementById("minimap-panel").style.marginBottom = "3px";
document.getElementById("party-panel").style.borderRadius = "0";
document.getElementById("party-panel").style.borderWidth = "0px"; 
document.getElementById("party-panel").style.boxShadow = "0px 0px 0px black";

//Custom Borders
GM_addStyle('* .main-panel {border: solid 3px rgba(99, 97, 95, 0.5)}');
GM_addStyle('* .main-panel {border-radius: 0px}');
GM_addStyle('* .main-panel {box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.52)}');
GM_addStyle('* .gota-btn {border-radius: 15px}');
GM_addStyle('* .main-bottom-stats {border-radius: 7px}');
GM_addStyle('* #popup-party {border-radius: 0px}');
GM_addStyle('* #popup-party {box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.25)}');
GM_addStyle('* #popup-login {border-radius: 0px}');
GM_addStyle('* #popup-login {box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.25)}');
GM_addStyle('* .login-input {border-radius: 2px}');
GM_addStyle('* #chat-input {border-radius: 0 0 0px 0px}');
GM_addStyle('* .ui-pane {box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.52)}');

//Miscellaneous UI Changing code
GM_addStyle('* #chat-panel {width: 300px}');
GM_addStyle('* #chat-panel {height: 195px}');
GM_addStyle('* #chat-input {font-weight: bold}');
GM_addStyle('* .stext {margin-top: 2px}');
GM_addStyle('* .stext {margin-bottom: 2px}');

//For LeaderBoard
var fz = "Â Â Â Agarplus.io";

//LeaderBoard
$(".lh").replaceWith(fz);

$("#main-rb").replaceWith("Cunt");
GM_addStyle ('* #main {left: 350px;}');

$("#btnforums").replaceWith("Fuck");
GM_addStyle ('* #main {left: 350px;}');

//Score Panel
setInterval(function() {   
  document.getElementById("score-panel").innerText = "â€Score: " + player.score + "â€" + "â€" + "\nâ€Cells: " + player.myCells.length + "/16" + "â€" + "\nâ€Rainbow: F2 \nâ€Alpha: F4 \nâ€Zoom: ~ \n â€" + "Edited By Cristianâ€";
}, 100);
//Keypress
document.addEventListener('keydown', function(e) {
        var key = e.keyCode || e.which;
        switch (key) {
            case 113:
                if (player.rainbow === false) {
                    player.rainbow = true;
} else {
   player.rainbow = false;
}
        }
    });

document.addEventListener('keydown', function(e) {
        var key = e.keyCode || e.which;
        switch (key) {
            case 115:
                if (settings.alpha === 1) {
                    settings.alpha = 0.4;
} else {
   settings.alpha = 1;
}
        }
    });

document.addEventListener('keydown', function(e) {
        var key = e.keyCod || e.which;
        switch (key) {
            case 192:            
                    player.mouseZoom = player.mouseZoom - 0.1;
        }
    });

document.addEventListener('keydown', function(e) {
        var key = e.keyCode || e.which;
        switch (key) {
            case 70:
                if (options.cHideFood === true) {
                    options.cHideFood = false;
} else {
   options.cHideFood = true;
}
        }
    });