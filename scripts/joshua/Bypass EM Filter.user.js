// ==UserScript==
// @name         Bypass EM Filter
// @namespace    http://devesu.com
// @version      0.1
// @description  cunt
// @author       Eris
// @match        https://epicmafia.com/topic/*
// @grant        none
// ==/UserScript==



(function() {
    'use strict';

    var button = $('#create_post > p.submit.cfix > input');
    var msg = $('#create_msg'); 
    var mapping = {
         cunt:"c\u00adunt",
         dipshit:"d\u00adipshit",
         fag:"f\u00adag",
         faggot: "f\u00adaggot",
         fuck: "f\u00aduck",
         shit: "s\u00adhit",
         bitch: "b\u00aditch"
    };
    
    var re = new RegExp(Object.keys(mapping).join("|"),"gi"); 
    
    button.click(function (e) { 
        msg.val(msg.val().replace(re, function(m) { 
            return mapping[m];
        }));
    }); 
    
})();