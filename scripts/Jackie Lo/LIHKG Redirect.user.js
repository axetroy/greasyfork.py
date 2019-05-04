// ==UserScript==
// @name         LIHKG Redirect
// @version      1
// @description  redirect to browser friendly lihkg
// @include   /.*lihkg\.com/.*/
// @author       Kbob
// @namespace https://greasyfork.org/users/84842
// ==/UserScript==
(function(){
	if(document.location.href.indexOf("lihkg.com") >= 0){
		window.location.replace(window.location.protocol + "//" + window.location.host.replace("com", "na.cx") + window.location.pathname);
	}
})();