// ==UserScript==
// @name       Steam linkfilter redirect
// @namespace  http://www.infilel.com/
// @version    0.1
// @description  Automaticly redirect to get rid of linkfilter
// @match      https://steamcommunity.com/linkfilter/?url=*
// @copyright  2014+, Infilel
// ==/UserScript==
 
window.location.href = window.location.href.replace("https://steamcommunity.com/linkfilter/?url=", "");