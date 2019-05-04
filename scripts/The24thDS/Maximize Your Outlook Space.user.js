// ==UserScript==
// @name         Maximize Your Outlook Space
// @namespace    http://tampermonkey.net/
// @version      3.1
// @description  Remove right ads column, admail from the Other inbox and Upgrade button
// @author       The24thDS
// @include        http*://outlook.live.*/*
// @grant        none
// @require http://code.jquery.com/jquery-3.2.1.min.js
// ==/UserScript==

$(document).ready(function(){
    window.setInterval(function(){
      $(".mnkcvmImptYPIG0m29FJh, ._1K0cujP_EBzCd77bTesW1q, ._17iUbYyCmTHZsaTImr3-6_").css("display","none");
    }, 10);
    }
);