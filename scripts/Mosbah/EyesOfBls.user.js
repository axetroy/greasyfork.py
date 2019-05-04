// ==UserScript==
// @name         EyesOfBls
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  OtpReceiver
// @author       MegaBOuSsOl
// @match        https://algeria.blsspainvisa.com/book_appointment.php
// @grant        none
// ==/UserScript==


document.querySelector("#IDBodyPanelapp > div.popup-appCloseIcon").click();
/*Alarm*/
var OTP=setInterval(function(){
   if ((document.querySelector('#reponse_div').outerHTML).indexOf('Token validation Failed') > -1) {location.reload();}
else if ((document.querySelector('#reponse_div').outerHTML).indexOf('Token validation Failed') == -1)
{document.querySelector("#em_tr > div.col-sm-6 > abbr > input").click();}
    else {clearInterval(OTP);}
},
3000);