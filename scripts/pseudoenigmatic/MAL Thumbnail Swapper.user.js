// ==UserScript==
// @name        MAL Thumbnail Swapper
// @namespace   pseudoenigmatic@hotmail.com
// @description Increases the size of thumbnails on MAL by swapping them out with their original file
// Credits to Blender and Brock Adams on StackOverflow for the skeleton
// @include     http://myanimelist.net/manga*
// @include     http://myanimelist.net/anime*
// @include     http://myanimelist.net/profile*
// @include     http://myanimelist.net/character*
// @include     http://myanimelist.net/people*
// @version     1.05
// @grant       none
// ==/UserScript==

var tags = document.getElementsByTagName('img');
var nwidth = "48";

for (var i = 0; i < tags.length; i++) {

if(tags[i].src.indexOf('t.jpg') >= 0){
  tags[i].src = tags[i].src.replace('t.jpg', '.jpg');
  tags[i].width = nwidth;
}else if(tags[i].src.indexOf('v.jpg') >= 0){
  tags[i].src = tags[i].src.replace('v.jpg', '.jpg');
  tags[i].width = nwidth;
}else if(tags[i].src.indexOf('questionmark') >= 0){
  tags[i].width = nwidth;
}
  
}