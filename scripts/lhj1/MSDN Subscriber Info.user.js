// ==UserScript==
// ==UserScript==
// @name        MSDN Subscriber Info
// @namespace   MSDN Subscriber Info
// @description View MSDN Subscription Information
// @author      sleiqx@PCBeta
// @match       https://msdn.microsoft.com/*/subscriptions/downloads/*
// @match       https://msdn.microsoft.com/subscriptions/securedownloads/*
// @version     0.2
// @grant       none
// ==/UserScript==
(function() {
    'use strict';
    $('#SubMigratedMessageArea').remove();
    setTimeout( function(){
        $('#DownloadsArea').show();
    }, 1 * 1000 );
})();