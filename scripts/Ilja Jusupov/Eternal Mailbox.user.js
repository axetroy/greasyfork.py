// ==UserScript==
// @name         Eternal Mailbox
// @icon         https://10minutemail.net/cdn/images/Icon-72@2x.png
// @namespace    x4_em
// @version      0.2.1
// @description  Automatically adds 10 minutes
// @author       x4fab
// @match        https://10minutemail.net/
// @license      CC0
// @grant        none
// ==/UserScript==

setInterval(function(){
    if ($('#time').text().split(':')[0] < 3){
        $('[href="more.html"]')[0].click();
    }
}, 1e3);
