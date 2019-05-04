// ==UserScript==
// @name         Hat macros
// @version      3.0
// @description  change hats quickly
// @author       unknown
// @match        http://moomoo.io/*
// @match        http://dev.moomoo.io/*
// @match        http://sandbox.moomoo.io/*
// @match        *://*.moomoo.io/*
// @require      http://code.jquery.com/jquery-1.12.4.min.js
// @grant        none
// @connect      moomoo.io
// @namespace    https://greasyfork.org/en/users/150424
// ==/UserScript==

function revertTitle(){
    f++;
    setTimeout(function(){
        f--;
        if (!f) {
            document.title = "Moo Moo";
        }
    }, 1500);
}

(function() {

var aV = [0,0];
var hZ =
    [
        [53, "Turret Hat"],
        [40, "Tank Gear"],
        [12, "Booster Hat"],
        [6, "Soldier Helmet"],
        [13, "Medic Hat"],
        [26, "Bushido"],
        [11, "Spike Gear"],
        [20, "Samurai"],
        [56, "Assassin Gear"]
    ];
var rZe = 0;

function hF(ki){
	if(aV[0] === 0){
		storeEquip(hZ[ki][0]);
		document.title = hZ[ki][1];
		aV[1] = 90;
	} else {
		storeBuy(hZ[ki][0]);
		aV[0] = 0;
		aV[1] = 180;
		document.title = "Bought";
	}
}

document.addEventListener('keydown', function(kfc) {
    if(!$(':focus').length) {
        switch (kfc.keyCode) {
            case 186: aV[0] = 1; aV[1] = 300; document.title = "Buying...."; kfc.preventDefault(); break;
            case 222: if(aV[0] === 1){aV[1] = 120; document.title = "Not buying....";} aV[0] = 0; kfc.preventDefault(); break;
            case 76: storeEquip(0); kfc.preventDefault(); break; // None [l]
            case 191: hF(0); kfc.preventDefault(); break; // Turret Hat [/]
            case 16: hF(1); kfc.preventDefault(); break; // Tank Gear [shift]
            case 188: hF(2); kfc.preventDefault(); break; // Booster [,]
            case 77: hF(3); kfc.preventDefault(); break; // Soldier [m]
            case 78: hF(4); kfc.preventDefault(); break; // Medic [n]
            case 66: hF(5); kfc.preventDefault(); break; // Bushido [b]
            case 75: hF(6); kfc.preventDefault(); break; // Spike [k]
            case 74: hF(7); kfc.preventDefault(); break; // Samurai [j]
            case 73000: hF(8); kfc.preventDefault(); break; // Assassin Gear [i]
        }
	}
});

function tK(){
	aV[1]--;
	letThereBeLight();
}

function letThereBeLight(){
	if(aV[1] === 0){
		rZe = Math.floor(Math.random()*vs.length-0.00001);
		if(rZe < 0){
			rZe = 0;
		}
		document.title = vs[rZe];
	}
}

setInterval(tK, 1000/60);
})();

