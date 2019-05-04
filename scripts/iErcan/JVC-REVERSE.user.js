// ==UserScript==
// @name         JVC-REVERSE
// @namespace    http://www.jeuxvideo.com/forums/*.html
// @version      0.5
// @description  reverse tous vos messages JVC car vous faites parti de l'elite.
// @author       iErcan
// @match        http://www.jeuxvideo.com/forums/*.htm
// @grant        none
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// ==/UserScript==

(function() {
    'use strict';
// ==UserScript==
// @name         JVC-REVERSE
// @namespace    http://www.jeuxvideo.com/forums/*.html
// @version      0.4
// @description  reverse tous vos messages JVC car vous faites parti de l'elite.
// @author       iErcan
// @match        http://www.jeuxvideo.com/forums/*.htm
// @grant        none
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// ==/UserScript==

(function() {
    'use strict';
 function reverse(e){return e.split("").reverse().join("")}for(var i=0;i<document.getElementsByClassName("txt-msg  text-enrichi-forum ").length;i++)if("blockquote-jv"!=document.getElementsByClassName("txt-msg  text-enrichi-forum ")[i].children[0].className)for(var j=0;j<document.getElementsByClassName("txt-msg  text-enrichi-forum ")[i].children.length;j++)"."===document.getElementsByClassName("txt-msg  text-enrichi-forum ")[i].children[j].innerText[0]&&(document.getElementsByClassName("txt-msg  text-enrichi-forum ")[i].children[j].innerText=reverse(document.getElementsByClassName("txt-msg  text-enrichi-forum ")[i].children[j].innerText));else for(var j=0;j<document.getElementsByClassName("txt-msg  text-enrichi-forum ")[i].children.length;j++)"."===document.getElementsByClassName("txt-msg  text-enrichi-forum ")[i].children[j].innerText[0]&&(document.getElementsByClassName("txt-msg  text-enrichi-forum ")[i].children[j].innerText=reverse(document.getElementsByClassName("txt-msg  text-enrichi-forum ")[i].children[j].innerText));$(".text-editor").append("<span class='btn btn-actu-new-list-forum' id='reverse'> REVERSE </span>"),$(document).ready(function(){$("#reverse").on("click",function(){var e=$("#message_topic").val(),t=reverse(e);$("#message_topic").val("."+t+"\n \n JVC-REVERSE : https://greasyfork.org/fr/scripts/32771-jvc-reverse")})});
    
    
    
    
    
    
    
    
    
    
    
    
})();
    
    
    
    
    
    
    
    
    
    
    
})();