// ==UserScript==
// @name        gaiachroniclesblog_wordpress
// @version     1
// @namespace   zack0zack
// @description Cronicas de gaia borrar post
// @include     *gaiachroniclesblog.wordpress.com*
// @grant       none
// ==/UserScript==

function remove(w){
  if (w){
	w.parentNode.removeChild( w );
  }
}


remove( document.getElementById('post-869') );
remove( document.getElementById('post-753') );
//remove( document.getElementById('') );

window.addEventListener("load",function() {
 remove( document.getElementById('post-869') );
 remove( document.getElementById('post-753') );
},true)
