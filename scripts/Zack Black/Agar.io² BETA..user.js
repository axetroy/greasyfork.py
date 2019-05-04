// ==UserScript==
// If you would change this keep the copyright and add Edited version.
// If you would change this keep the copyright and add Edited version.
// @name         Agar.io² BETA.
// @namespace    Agar.io² BETA.
// @version      BETA.
// @description  Macros,music and FPS counter in vanilla mode.
// @author       by ZAKO ZCK .
// @match        http://agar.io/*
// @grant        GM_xmlhttpRequest
// If you would change this keep the copyright and add Edited version.
// If you would change this keep the copyright and add Edited version.
// ==/UserScript==
(function() {
    var amount = 6;
    var duration = 50; //ms

    var overwriting = function(evt) {
        if (evt.keyCode === 16) { // KEY_SHIFT
            for (var i = 0; i < amount; ++i) {
                setTimeout(function() {
                    window.onkeydown({keyCode: 32}); // KEY_SPACE
                    window.onkeyup({keyCode: 32});
                }, i * duration);
            }
        }
    };

    window.addEventListener('keydown', overwriting);
})();
//v1
//Press a will fire upto 8 feeds
/*$(document).on('keydown',function(e){
if(e.keyCode == 87){
for(var i = 0; i<8; i++){
$("body").trigger($.Event("keydown", { keyCode: 87}));
$("body").trigger($.Event("keyup", { keyCode: 87}));
}
}
})
*/

//v2
//Press a will fire upto 8 feeds
/*$(document).on('keyup',function(e){
if(e.keyCode == 87){
var count = 0;
var interval = setInterval(function() {
if(count > 7){
clearInterval(interval);
return;
}
count++
console.log('firing')
$("body").trigger($.Event("keydown", { keyCode: 87}));
$("body").trigger($.Event("keyup", { keyCode: 87}));
}, 50);
}
})*/

//v3
//Press W will fire upto 20 feeds
/*var interval;
var theSwitch = false;
$(document).on('keyup',function(e){
if(e.keyCode == 87){
var count = 0;
if(theSwitch){
theSwitch = false;
clearInterval(interval);
return;
}
theSwitch = true;
interval = setInterval(function() {
if(count > 20){ //Change this number if you want more
theSwitch = false;
clearInterval(interval);
return;
}
count++
console.log('firing')
$("body").trigger($.Event("keydown", { keyCode: 87}));
$("body").trigger($.Event("keyup", { keyCode: 87}));
}, 10);//increase this number to make it fire them out slower
}
})*/

//v4
//Hold a down and it will keep firing untill you take your finger off!
console.log('called');
var interval;
var switchy = false;
$(document).on('keydown',function(e){
console.log('keydown e.keyCode="'+e.keyCode+'"');
if(e.keyCode == 87){
console.log('keydown 87, switchy '+switchy);
if(switchy){
return;
}
switchy = true;
interval = setInterval(function() {
console.log('firing');
$("body").trigger($.Event("keydown", { keyCode: 87}));
$("body").trigger($.Event("keyup", { keyCode: 87}));
}, 3);//increase this number to make it fire them out slower
}
})

$(document).on('keyup',function(e){
console.log('keyup e.keyCode="'+e.keyCode+'"');
if(e.keyCode == 87){
console.log('stop firing');
switchy = false;
clearInterval(interval);
return;
}
})
function pressW() {
	var oEvent = document.createEvent('KeyboardEvent');
	var k = 87;
	// Chromium Hack
	Object.defineProperty(oEvent, 'keyCode', {
	            get : function() {
	                return this.keyCodeVal;
	            }
	});     
	Object.defineProperty(oEvent, 'which', {
	            get : function() {
	                return this.keyCodeVal;
	            }
	});     

	if (oEvent.initKeyboardEvent) {
	    oEvent.initKeyboardEvent("keydown", true, true, document.defaultView, false, false, false, false, k, k);
	} else {
	    oEvent.initKeyEvent("keydown", true, true, document.defaultView, false, false, false, false, k, 0);
	}

	oEvent.keyCodeVal = k;

	if (oEvent.keyCode !== k) {
	    console.log("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
	}
	document.dispatchEvent(oEvent);

	var oEvent = document.createEvent('KeyboardEvent');
	// Chromium Hack
	Object.defineProperty(oEvent, 'keyCode', {
	            get : function() {
	                return this.keyCodeVal;
	            }
	});     
	Object.defineProperty(oEvent, 'which', {
	            get : function() {
	                return this.keyCodeVal;
	            }
	});     

	if (oEvent.initKeyboardEvent) {
	    oEvent.initKeyboardEvent("keyup", true, true, document.defaultView, false, false, false, false, k, k);
	} else {
	    oEvent.initKeyEvent("keyup", true, true, document.defaultView, false, false, false, false, k, 0);
	}

	oEvent.keyCodeVal = k;

	if (oEvent.keyCode !== k) {
	    console.log("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
	}	
	document.dispatchEvent(oEvent);
}
window.pressW = pressW;
document.onkeypress = function(e) {
	e = e || window.event;
	if (e.keyCode == 102) {
		for (var i = 0; i<7; i++) {
			setTimeout(pressW, i * 80);
		}
	} else if (e.keyCode == 103) {
		for (var i = 0; i<50; i++) {
			setTimeout(pressW, i * 40);
		}
	} else if (e.keyCode == 104) {
		for (var i = 0; i<400; i++) {
			setTimeout(pressW, i * 5);
		}
	}
}
var lastEdit = 1462520006443;
var respawnLoop = null, ejectorLoop = null, randomMoveLoop = null;
var overlayClosed = false, spectatorMode = false;
var profileSettings = {};
var holdingKey = {};




        $('#instructions')
			.html('<div style="text-align: center;"><strong>Instructions</strong>Move your mouse to control your cell<br>Press <b>Space</b> to split<br>Press <b>W</b> to eject some mass</div><hr style="margin: 10px 0px;">')
			.append('<div><strong>IN GAME SHORTCUTS!....</strong><span><b>W</b> Macro fast feed.</span><span><b>F</b> 7:W"s throw a Virus</span><span><b>SHIFT</b> Split into 16.</span><span> <b>Q</b>Double split/Popsplit.</div>')
			.after('<div class="modInfo-toggler" style="font-size: 75%; float: right; margin-bottom: 6px !important;">ZAKO ZCK © contact me Skype:ZAKO ZCK  .</div>');
		$('#instructions div').css({ 'color': '#333060', 'padding': '0px 10px', 'font-size': '12px', 'margin': '12px 0px' });
		$('#instructions strong').css({ 'color': '#89cff0', 'display': 'block', 'margin-bottom': '6px', 'text-align': 'center', 'font-size': '16px' });
		$('#instructions b').css({ 'background-color': '#333', 'color': '#00ffff', 'padding': '1px 5px', 'border-radius': '3px', 'min-width': '20px', 'display': 'inline-block', 'margin': '1px 0px', 'text-align': 'center' });
		$('#instructions span').css({ 'display': 'inline-block', 'width': '150px' });
  		$('footer.tosBox.left').removeClass('left').addClass('gamemodes').css({ 'position': 'absolute', 'bottom': '32px', 'right': '0px', 'font-size': '12px', 'background-color': '#3071A9', 'border-radius': '15px 0px 0px 15px', 'padding-left': '18px' });
		$('footer.tosBox.right').removeClass('right').addClass('tos').css({ 'position': 'absolute', 'bottom': '2px', 'right': '0px', 'font-size': '12px', 'background-color': '#3071A9', 'border-radius': '15px 0px 0px 15px', 'padding-left': '18px' })
			.after('<footer class="donate" style="position: absolute; bottom: -2px; right: 300px;"><form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="NTT7MENAFBRQL"><input type="image" src="https://www.paypal.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"><img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" alt="PayPal button" border="0"></footer>')
			.after('<footer class="tosBox homepage" style="position: absolute; bottom: 0px; left: 100px; background-color: #ff6633; border-radius: 5px 5px 0px 0px;"><a href="https://greasyfork.org/fr/scripts/21244-agar-io-beta" target="_blank"><B>Homepage/Update</B></a></footer>');
		$('footer a').css('color', '#000000');

$('#instructions').prepend('<div align="midlle" id="Radio" class="RadioClass" style="display: block;margin-right:65px"><audio style="margin-midlle: 3px" controls="" src="http://192.99.0.170:5529/;"><a href="music.html" target="radio" align="midlle">');
document.getElementsByTagName('h2')[0].innerHTML = '<h2 id="agarTitle" style="font-weight:600;"></strong>Agar.io²</h2>';
 
(function() {
  var UPDATE_DELAY = 700;

  var lastUpdate = 0;
  var frames = 0;

  var displayElement = document.createElement("div");
  displayElement.style.padding = "5px";
  displayElement.style.font = "16px Arial";
  displayElement.style.display = "block";
  displayElement.style.position = "fixed";
  displayElement.style.top = "0px";
  displayElement.style.left = "0px";
  displayElement.textContent = "Calculating...";
  document.body.appendChild(displayElement);

  function cssColorToRGB(color) {
    var values;

    if (color.startsWith("rgba")) {
      values = color.substring(5, color.length - 1).split(",");
    } else if (color.startsWith("rgb")) {
      values = color.substring(4, color.length - 1).split(",");
    } else if (color.startsWith("#") && color.length === 4) {
      values = [];
      values[0] = "" + parseInt("0x" + color.substr(1, 1));
      values[1] = "" + parseInt("0x" + color.substr(2, 1));
      values[2] = "" + parseInt("0x" + color.substr(3, 1));
    } else if (color.startsWith("#") && color.length === 7) {
      values = [];
      values[0] = "" + parseInt("0x" + color.substr(1, 2));
      values[1] = "" + parseInt("0x" + color.substr(3, 2));
      values[2] = "" + parseInt("0x" + color.substr(5, 2));
    } else {
      return {r : 255, g : 255, b : 255};
    }

    return {
      r : Number(values[0]),
      g : Number(values[1]),
      b : Number(values[2])
    };
  }

  function getInvertedRGB(values) {
    return "rgb(" + (255 - values.r) + "," + (255 - values.g) + ","
      + (255 - values.b) + ")";
  }

  function getOpaqueRGB(values) {
    return "rgba(" + values.r + "," + values.g + "," + values.b + ",0.7)";
  }

  function updateCounter() {
    var bgColor = getComputedStyle(document.body, null).getPropertyValue(
      "background-color");
    var bgColorValues = cssColorToRGB(bgColor);
    var textColor = getInvertedRGB(bgColorValues);
    var displayBg = getOpaqueRGB(bgColorValues);
    displayElement.style.color = textColor;
    displayElement.style.background = displayBg;

    var now = Date.now();
    var elapsed = now - lastUpdate;
    if (elapsed < UPDATE_DELAY) {
      ++frames;
    } else {
      var fps = Math.round(frames / (elapsed / 1000));
      displayElement.textContent = fps + " FPS";
      frames = 0;
      lastUpdate = now;
    }

    requestAnimationFrame(updateCounter);
  }

  lastUpdate = Date.now();
  requestAnimationFrame(updateCounter);
})();
window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);
var Feed = false;
var Dingus = false;
var imlost = 25;
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_e'> Press <b>E</b> or <b>4</b> to split 4x</span></span></center>";
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_3'> Press <b>3</b> to split 3x</span></span></center>";
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_d'> Press <b>D</b> or <b>2</b> to split 2x</span></span></center>";
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_q'> Press and hold <b>Q</b> for macro feed</span></span></center>";
load();
function load() {
    if (document.getElementById("overlays").style.display!="none") {
        document.getElementById("settings").style.display = "block";
        if (document.getElementById('showMass').checked) {document.getElementById('showMass').click();}
        document.getElementById('showMass').click();
        if (document.getElementById('darkTheme').checked) {document.getElementById('darkTheme').click();}
        document.getElementById('darkTheme').click();
    } else {
        setTimeout(load, 100);
    }
}
function keydown(event) {
    if (event.keyCode == 87) {
        Feed = true;
        setTimeout(fukherriteindapussie, imlost);
    } // Tricksplit
    if (event.keyCode == 16) {
        ilikedick();
        setTimeout(ilikedick, imlost);
        setTimeout(ilikedick, imlost*2);
        setTimeout(ilikedick, imlost*3);
    } // Doublesplit
    if (event.keyCode == 81) {
        ilikedick();
        setTimeout(ilikedick, imlost);
    } // Split
    if (event.keyCode == 49) {
        ilikedick();
    }
}
function ilikedick() {
    $("body").trigger($.Event("keydown", { keyCode: 32}));
    $("body").trigger($.Event("keyup", { keyCode: 32}));
}