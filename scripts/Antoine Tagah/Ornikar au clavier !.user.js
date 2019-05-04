// ==UserScript==
// @name         Ornikar au clavier ! 
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Permet une gestion au clavier des séries ornikar
// @author       You
// @match        https://www.ornikar.com/code/series/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var authorizedLetters = 'abcd1234wx'; 
    $('body').on('keyup', function (ev) { 
        var letter = String.fromCharCode(ev.which).toLowerCase(); 
        
        if(letter==1){letter='a';}
        if(letter==2){letter='b';}
        if(letter==3){letter='c';}
        if(letter==4){letter='d';}
        
        if(letter!='w' && letter!='x'){
        if (authorizedLetters.indexOf(letter) > -1) { 
            $('#answer-' + letter).click(); 
       } 
        }
         if(letter=='w'){ $('button:contains("précédente"):nth-child(2)').click();}
         if(letter=='x'){$('button:contains("suivante")').click();}
        
    });
})();