// ==UserScript==
// @name         TheGuardian Football Fixture Simplifier
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  hides some British leauges/cups for those who aren't interested in them
// @author       PLH
// @match        https://www.theguardian.com/football/fixtures
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...

var hideThem = function(){var links = document.links;
    var length = links.length;
    for (var i = 0; i < length; i++) {
    if (links[i].href =='https://www.theguardian.com/football/leaguetwofootball'
        || links[i].href =='https://www.theguardian.com/football/scottishcup'
    || links[i].href =='https://www.theguardian.com/football/scottish-premiership'
    || links[i].href =='https://www.theguardian.com/football/scottish-championship'
    || links[i].href =='https://www.theguardian.com/football/leagueonefootball'
    || links[i].href ==   'https://www.theguardian.com/football/championship'
    || links[i].href ==   'https://www.theguardian.com/football/scottish-league-two'
    || links[i].href ==   'https://www.theguardian.com/football/scottish-league-one')
        {links[i].parentElement.parentElement.parentElement.parentElement.style.display = 'none';
             }}
                      ;};
    hideThem();
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('('+ hideThem +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
//waitForKeyElements('.football-matches',hideThem, false);
    var button=document.getElementsByClassName('matches-nav')[0];
    button.setAttribute("onclick", "setTimeout(function(){var links = document.links; var length = links.length; for (var i = 0; i < length; i++) {if (links[i].href =='https://www.theguardian.com/football/leaguetwofootball' || links[i].href =='https://www.theguardian.com/football/scottishcup'  || links[i].href =='https://www.theguardian.com/football/scottish-premiership' || links[i].href =='https://www.theguardian.com/football/scottish-championship'    || links[i].href =='https://www.theguardian.com/football/leagueonefootball'    || links[i].href ==   'https://www.theguardian.com/football/championship'    || links[i].href ==   'https://www.theguardian.com/football/scottish-league-two'    || links[i].href ==   'https://www.theguardian.com/football/scottish-league-one')        {links[i].parentElement.parentElement.parentElement.parentElement.style.display = 'none';      }}   ;},800)");
})();


