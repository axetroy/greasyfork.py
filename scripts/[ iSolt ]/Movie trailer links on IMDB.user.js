// ==UserScript==
// @name        Movie trailer links on IMDB
// @namespace   imdb.Movies.trailer.links
// @description Provides links to Yotube trailer while Browsing IMDB Movie pages
// @include     *imdb.com*
// @version     1.0
// @grant        none
// ==/UserScript==

var ratingWidget = document.getElementById("ratingWidget");
var title = ratingWidget.getElementsByTagName("strong")[0];
var overview = document.getElementById("titleYear");
var span = document.createElement("span");

overview.appendChild(span);

var link = document.createElement("a");link.innerHTML = "<img src=https://i.imgur.com/YUGI7FI.png height=16 width=16>";
link.setAttribute("target","_blank");
link.setAttribute("href","https://www.youtube.com/results?search_query=" + encodeURIComponent(title.textContent + " trailer"));
span.appendChild(document.createTextNode(' | '));
span.appendChild(link);