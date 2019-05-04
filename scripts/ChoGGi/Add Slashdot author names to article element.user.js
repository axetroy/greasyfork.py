// ==UserScript==
// @name        Add Slashdot author names to article element
// @namespace   ChoGGi
// @description Sticks the name of the author further up the post to allow css to hide articles by certain authors
// @include     http://slashdot.org/
// @version     0.1
// @grant       none
// ==/UserScript==
/*
css rule example
#firehoselist>article[authorname="Bennett Haselton"],
#firehoselist>article[authorname="Douchebag"]
{
display: none ;
}
*/
"use strict";

var articleList = document.getElementById("firehoselist").childNodes;

for (var i = 0; i < articleList.length; i++){

  try {
    var username = articleList[i].childNodes[5].firstElementChild.firstElementChild;
    if (username.getAttribute("href").search(/^\/~/) != -1)
      articleList[i].setAttribute("authorname",username.innerHTML);
  }catch(e){}

}
