// ==UserScript==
// @name         Agar macro Tricksplit Triplesplit and Doublesplit
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  Faster feeding, Triplesplit, Doublesplit & Tricksplit !
// @author       hyp3rphp
// @match        http://abs0rb.me/*
// @match        http://agar.io/*
// @match        http://agarabi.com/*
// @match        http://agarly.com/*
// @match        http://en.agar.bio/*
// @match        http://agar.pro/*
// @match        http://agar.biz/*
// @grant        none
// ==/UserScript==
(function() {
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_e'> Press <b>D</b> to Doublesplit, Press <b>T</b> to Tricksplit & Press <b>F</b> to freeze !</span></span></center>";
document.getElementById("instructions").innerHTML += "<center><span class='text-muted'><span data-itr='instructions_q'> <strong>hyp3rphp</strong>!</b></span></span></center>";
window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);
    window.addEventListener('keydown', overwriting);
})();
    function pressW() {
	var oEvent = document.createEvent('KeyboardEvent');
	var k = 87;

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
	if (e.keyCode == 87) {
		for (var i = 0; i<7; i++) {
			setTimeout(pressW, i * 80);
		}
    }
}
window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var EjectDown = false;

var speed = 10000; //in ms

function keydown(event) {
    if (event.keyCode == 87 && EjectDown === false) { // key W
        EjectDown = true;
        setTimeout(eject, speed);
    }
}

function keyup(event) {
    if (event.keyCode == 87) { // key W
        EjectDown = false;
    }
}

function eject() {
    if (EjectDown) {
        window.onkeydown({keyCode: 87}); // key W
        window.onkeyup({keyCode: 87});
        setTimeout(eject, speed);
    }
}

function split() {
    $("body").trigger($.Event("keydown", { keyCode: 32})); //key space
    $("body").trigger($.Event("keyup", { keyCode: 32})); //jquery is required for split to work
}
//tricks start.
var Feed = false;
var Dingus = false;
var imlost = 25;
function keydown(event) {
    if (event.keyCode == 81) {
        Feed = true;
        setTimeout(fukherriteindapussie, imlost);
    }
    if (event.keyCode == 51 || event.keyCode == 65) {
        ilikedick();
        setTimeout(ilikedick, imlost);
        setTimeout(ilikedick, imlost*2);
    }
    if (event.keyCode == 68 || event.keyCode == 50) {
        ilikedick();
        setTimeout(ilikedick, imlost);
}
    if (event.keyCode == 84 || event.keyCode == 52) { //( ͡° ͜ʖ ͡°)
        ilikedick();
        setTimeout(ilikedick, imlost);
        setTimeout(ilikedick, imlost*2);
        setTimeout(ilikedick, imlost*3);
    }
function ilikedick() {
    $("body").trigger($.Event("keydown", { keyCode: 32}));
    $("body").trigger($.Event("keyup", { keyCode: 32}));
}
}