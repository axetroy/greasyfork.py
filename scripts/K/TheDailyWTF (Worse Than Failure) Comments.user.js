// ==UserScript==
// @name        TheDailyWTF (Worse Than Failure) Comments
// @namespace   namespace
// @description:en Script to show authors' HTML comments on thedailywtf.com
// @include     http://thedailywtf.com/*
// @version     1
// @grant       none
// @description Script to show authors' HTML comments on thedailywtf.com
// ==/UserScript==

var author = document
  .getElementsByClassName("author")[0]
  .getElementsByTagName("h4")[0]
  .innerHTML;

var title = "<strong>" +author + "</strong>: ";

var article = document.getElementsByClassName("article-body")[0];
var newArticleHTML = article.innerHTML;

while(newArticleHTML.search("<!--") > -1) {
  newArticleHTML = newArticleHTML
   .replace("<!--", "<em style='background-color: lightgrey; font-size: 0.7em;'>(" + title)
   .replace("-->", ")</em>"); 
}

article.innerHTML = newArticleHTML;