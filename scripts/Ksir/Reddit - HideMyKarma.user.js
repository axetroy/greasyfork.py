// ==UserScript==
// @name         Reddit - HideMyKarma
// @namespace    http://ksir.pw/
// @version      0.7
// @description  Hide a users comment and post karma
// @author       Kain (ksir.pw)
// @match        *://*.reddit.com/*
// @icon         https://www.google.com/s2/favicons?domain=www.reddit.com
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @grant        none
// @run-at       document-start
// ==/UserScript==


// Case Sensitive. Change this to your username
var username = "";


function hideMyKarma(){
    // Hide Post & Karma points
    var $sp = $($(".sitetable")[0]);
    var $st = $(".author:contains('" + username + "')").closest('.tagline');
    $st.find('.score.unvoted').hide(); $sp.find('.score.unvoted').hide();
    $st.find('.score.likes').hide(); $sp.find('.score.likes').hide();
    $st.find('.score.dislikes').hide(); $sp.find('.score.dislikes').hide();
    // Hide points on profiles
    $(".Post__username:contains('" + username + "')").parent().each(function(i,v){
        $(v).html($(v).html().replace(/• (.*) point(s|)/gi, ''));
    });
}

if(username == ""){
    alert("Reddit - HideMyKarma: Username has not been set.");
} else {
    window.onload = hideMyKarma;
    setInterval(hideMyKarma, 50);
}
