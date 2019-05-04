// ==UserScript==
// @name         Fix Collapse Button on /r/DoctorWho (old Reddit)
// @version      0.2
// @namespace    https://greasyfork.org/en/users/105361-randomusername404
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @run-at       document-start
// @description  Move the collapse button back where it's supposed to be on /r/DoctorWho.
// @author       RandomUsername404
// @match        https://old.reddit.com/r/doctorwho/comments/*/*/
// @grant        none
// @icon         https://b.thumbs.redditmedia.com/L9ZqY1Wmvy9qDCcxhQuoVMGlCjD6Vgfqht-5xE5NGCk.png
// ==/UserScript==

$(document).ready(function() {   
    $('.commentarea .comment a.expand').css('position', 'unset');
})();