// ==UserScript==
// @name        Notification Notifier attempt
// @namespace   Boar
// @description 1st attempt, dear god what am I trying
// @include      *://www.thetechgame.com/*
// @exclude     http://www.thetechgame.com/Members_Shout.html
// @version     1.3
// @grant       none
// ==/UserScript==

$(document).ready(function() {
    
    var title = $('title').html();
    
    setInterval(function() {
        var noti = $('#top_notifications').html();
        var notinum = noti.split(' ');
        var num1 = notinum[0];
       
        if (num1 > 0)
        {
            document.title = '(' + num1 + ') ' + title;
        }
        
        else
        {
            document.title = title;
        }   
        
    },3000);                
});

