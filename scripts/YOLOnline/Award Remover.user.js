// ==UserScript==
// @name        Award Remover
// @author      YOLOnline (uid=1369647)
// @namespace   
// @description This userscript removes all the awards from showthread.php
// @include     *hackforums.net/showthread.php*
// @version     1.0
// @grant       none
// ==/UserScript==

// extract all post_author_info from the page
var authorInfos = document.getElementsByClassName('post_author_info');

// calculate now many post_author_info are on the page
var authorInfosLength = authorInfos.length;

for (i = 0; i < authorInfosLength; i++) {
  
  var postAuthorInfo = document.getElementsByClassName('post_author_info')[i];
    
  if (typeof postAuthorInfo.getElementsByTagName('span')[0] != 'undefined' ) {
    
    var emptyVar = postAuthorInfo.getElementsByTagName('span')[0];
    emptyVar.innerHTML = ''; 
    
  }  
  
}