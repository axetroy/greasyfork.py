// ==UserScript==
// @name         JVC-UP
// @namespace    http://www.jeuxvideo.com/forums/*
// @version      1.01
// @description  Bot qui permet de UP et de supprimer automatiquement un message sur topic à l'infini
// @author       iErcan
// @match        http://www.jeuxvideo.com/forums/*.htm
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
 var url = window.location.href; // l'url actuel
 var msg = ["salut.", "bonjour.", "coucou."]; // changer cette variable par le message que vous voulez

 function random(min, max) {
     return Math.floor(Math.random() * (max - min)) + min;
 }

function getCurrentPage(){
    let _page = undefined;
    document.getElementsByClassName("bloc-liste-num-page")[0].childNodes.forEach( (page) => {

        if (page.className === "page-active") { _page=page.innerText; return; }

    })
    return _page;
}

 setInterval(function() {
     var pseudo = document.getElementsByClassName("account-pseudo")[0].innerText;
     var lastMessageIndex =  document.getElementsByClassName("xXx bloc-pseudo-msg text-user").length - 1; // index du dernier message sur la page
     var lastMessage = document.getElementsByClassName("txt-msg  text-enrichi-forum ")[lastMessageIndex].innerText; // dernier message de la page
     var lastMessageAuthor = document.getElementsByClassName("xXx bloc-pseudo-msg text-user")[lastMessageIndex].innerText;  // dernier auteur de la page
     var currentPage = getCurrentPage();





     console.log(currentPage);
     console.log(lastMessageIndex);
     if (lastMessageAuthor != pseudo || currentPage === "1" && lastMessageIndex === 0) {//si l'auteur du dernier message != notre pseudo on poste || ou si le dernier message === le message de l'auteur on poste
         document.getElementsByClassName('area-editor')[0].value = msg[random(0, msg.length)];
         document.getElementsByClassName("btn btn-poster-msg datalayer-push")[0].click();
     } else if (lastMessageAuthor === pseudo) {
       if (currentPage != "1" || currentPage === "1" && lastMessageIndex > 0) {
          document.getElementsByClassName("picto-msg-croix")[document.getElementsByClassName("picto-msg-croix").length-1].click()
       }
     }
 }, 5500);


    
    
 
    
    // Your code here...
})();