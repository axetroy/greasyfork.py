// ==UserScript==
// @name         每日签到 deepss.org
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  daily checkIn on deepss.org
// @author       superfun
// @match        https://www.deepss.org/user*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

$().ready( function(){
    setTimeout(function(){
        $('.gt_holder').css("display","block");
        $('.gt_holder').css("opacity","1");
    },1000)
    
} )