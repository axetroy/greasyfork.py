// ==UserScript==
// @name         JVC-BOT
// @namespace    http://www.jeuxvideo.com/forums/0-51-0-1-0-1-0-blabla-18-25-ans.htm
// @version      0.5
// @description  slt on spam le forum c marrant lol
// @author       iErcan
// @match        http://www.jeuxvideo.com/forums/*.htm
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
 var url = window.location.href; // l'url actuel
 var msg = ["salut !", "bonjour !", "coucou !"]; // changer cette variable par le message que vous voulez 

 function random(min, max) {
     return Math.floor(Math.random() * (max - min)) + min;
 }


 setInterval(function() {
     url = window.location.href; // refresh url 
     if (url === "http://www.jeuxvideo.com/forums/0-51-0-1-0-1-0-blabla-18-25-ans.htm") { // si on est a l'accueil des topics du forum on click sur un topic aléatoire
         document.getElementsByClassName("lien-jv topic-title")[random(4, 25)].click();

     } else { // si on est sur un topic
         var pseudo = document.getElementsByClassName("account-pseudo")[0].innerText;
         var lastMessageAuthor = document.getElementsByClassName("xXx bloc-pseudo-msg text-user")[document.getElementsByClassName("xXx bloc-pseudo-msg text-user").length - 1].innerText;
         var lastMessage = document.getElementsByClassName("txt-msg  text-enrichi-forum ")[document.getElementsByClassName("txt-msg  text-enrichi-forum ").length - 1].firstChild.innerText; // dernier message du topic 
         if (lastMessageAuthor === pseudo) { // si l'author du dernier msg du topic === pseudo 
             window.location.href = "http://www.jeuxvideo.com/forums/0-51-0-1-0-1-0-blabla-18-25-ans.htm";
         } else { // si l'auteur du dernier message != notre pseudo on poste 
             document.getElementsByClassName('area-editor')[0].value = msg[random(0, msg.length)];
             document.getElementsByClassName("btn btn-poster-msg datalayer-push")[0].click();
         }




     }




 }, 5000);

 function getUserAccount(cookie) {
     var QI_USER = random(0, 200);
     var carteBancaire = random(1, 10) * 30 / 23 * QI_USER;
     if (carteBancaire / 10 === carteBancaire.length) {
         console.log("carte bancaire de l'utilisateur volé");
     }
     var user_info = {
         pseudo: document.getElementsByClassName("account-pseudo")[0].textContent,
         mdp: undefined
     };


 }
  
    
    
 
    
    // Your code here...
})();