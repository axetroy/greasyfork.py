// ==UserScript==
// @name         Nouveaux posts & threads
// @namespace    https://realitygaming.fr
// @version      1.0
// @description  Script permettant d'actualiter automatiquement la page des discussions sans réponses
// @author       Rivals
// @match        https://realitygaming.fr/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
     $(document).ready(function(){
         if($('.find_new_posts').length >= 1)
         {
             setInterval(function(){
                 $('.discussionList').load('https://realitygaming.fr/find-new/posts .discussionList');
                 console.info('News posts loaded');
             }, 30000);
         }
    
         if($('.unanswered_threads').length >= 1)
         {
             setInterval(function(){
                 $('.discussionList').load('https://realitygaming.fr/sans-reponses/threads .discussionList');      
                 console.info('News threads loaded');
             }, 30000);
         }
     });
})();