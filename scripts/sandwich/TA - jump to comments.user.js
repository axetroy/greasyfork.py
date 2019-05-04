// ==UserScript==
// @name        TA - jump to comments
// @description	clicking view comments on a solution takes you directly to the comments
// @namespace   tastysandwich
// @include     http*://*trueachievements.com/viewcomment.aspx?commentid=*#vch
// @version     0.1
// @grant       none
// ==/UserScript==

var comments = document.querySelectorAll("tr.comments");
comments[0].scrollIntoView();