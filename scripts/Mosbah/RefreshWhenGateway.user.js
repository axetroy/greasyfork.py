// ==UserScript==
// @name         RefreshWhenGateway
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  InvokeFamilyAndFamilyMember!
// @author       MegaBOuSs
// @match        https://algeria.blsspainvisa.com/book_appointment.php
// @grant        God
// ==/UserScript==
/*Gateway*/
setTimeout(function(){if((document.body.innerText).indexOf('Gateway') > -1){location.reload();}}, 100)