// ==UserScript==
// @name       Evan J Helper
// @version    0.1
// @description  Makes the URL a google search link
// @match      https://s3.amazonaws.com/mturk_bulk*
// @require    https://code.jquery.com/jquery-latest.min.js
// @copyright  2014+, Tjololo
// @namespace https://greasyfork.org/users/710
// ==/UserScript==

var elem = $("p:eq(2)>b");
console.log(elem);
var url = elem.text();
var google = "https://www.google.com/?gws_rd=ssl#q=inurl:"+url+"+news";
elem.html("<a href="+google+">"+url+"</a>");