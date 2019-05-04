// ==UserScript==
// @name         Fix navigation with filtering in Slickdeals classic view
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Slickdeals forum navigation was broken early October 2017 when filtering used in Classic view. This is a fix.
// @author       Panker
// @include      https://slickdeals.net/forums/*
// @grant        none
// ==/UserScript==

$(document).ready(function() {
    var searchableStr   = document.URL + '&';

    var vote      = searchableStr.match (/[\?\&]vote=([^\&\#]+)[\&\#]/i);
    var sort      = searchableStr.match (/[\?\&]sort=([^\&\#]+)[\&\#]/i);
    var order     = searchableStr.match (/[\?\&]order=([^\&\#]+)[\&\#]/i);
    var daysprune = searchableStr.match (/[\?\&]daysprune=([^\&\#]+)[\&\#]/i);

    var filters = document.querySelectorAll('.include');
  
    for(var j = 0; j < filters.length; j++)
    {
        if (!daysprune && filters[j].getAttribute("daysprune"))
            daysprune = ["", filters[j].getAttribute("daysprune")];
                
        if (!vote && filters[j].getAttribute("vote"))
            vote = ["", filters[j].getAttribute("vote")];
    }
 
    var anchors = document.querySelectorAll('.search_pagenav');
  
    for(var i = 0; i < anchors.length; i++)
    {
        if (anchors[i].href)
        {
            if (vote)
                anchors[i].href = anchors[i].href.replace( /php\?/i , "php?vote="+vote[1]+"&" );
            if (order)
                anchors[i].href = anchors[i].href.replace( /php\?/i , "php?order="+order[1]+"&" );
            if (daysprune)
                anchors[i].href = anchors[i].href.replace( /php\?/i , "php?daysprune="+daysprune[1]+"&" );
        }
    }
});
