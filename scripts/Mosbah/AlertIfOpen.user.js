// ==UserScript==
// @name         AlertIfOpen
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  AlertWhenBlsOpen
// @author       MegGaBOuSsOl
// @match        https://algeria.blsspainvisa.com/book_appointment.php
// @grant        God
// ==/UserScript==

/*GunIf*/
var gun=setInterval(function(){
    if ((document.body.innerText).indexOf('APPOINTMENT DATES ARE NOT ') == -1) { new Audio('https://www.soundjay.com/mechanical/sounds/machine-gun-02.mp3').play();clearInterval(gun);}
},
1000);