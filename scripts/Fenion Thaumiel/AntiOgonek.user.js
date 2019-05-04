// ==UserScript==
// @name         AntiOgonek
// @namespace    https://github.com/Fenion/AntiOgonek
// @version      2.7.4
// @description  Иммитация показа рекламы
// @author       Fenion
// @match        *.anidub.com/*
// @grant        unsafeWindow
// ==/UserScript==


(function () {
    'use strict'

	console.log("AntiOgonek");
	var w = unsafeWindow || window;
	var ads = document.getElementById(w.bname + w.brrand);
	var adcheck = document.getElementById('xNnEPSDaIzHQ');
    var bg = document.body.getElementsByTagName('div')[0];
    if(!adcheck) {
       	console.log("adcheck");
       	let adcheck = document.createElement('div');
       	adcheck.style.display = "none";
       	adcheck.id = ("xNnEPSDaIzHQ");
        document.body.appendChild(adcheck);
        console.log(adcheck);
    }
    ads.remove();
    bg.setAttribute('style', 'background: url("https://online.anidub.com/templates/Anidub_online/img/bg_1.jpg") center top repeat scroll rgb(0, 25, 48); min-width: 1200px;');
    //w.ogonek = (function (){return true;})();
})();
