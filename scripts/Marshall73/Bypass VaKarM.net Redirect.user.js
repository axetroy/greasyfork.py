// ==UserScript==
// @name       Bypass VaKarM.net Redirect
// @author     http://steamcommunity.com/id/marshall73401
// @version    0.1
// @description  Automaticly redirect VaKarM.net linkfilter
// @match      http://www.vakarm.net/out?link=*
// @namespace https://greasyfork.org/users/9274
// ==/UserScript==
 
window.location.href = window.location.href.replace("http://www.vakarm.net/out?link=", "");