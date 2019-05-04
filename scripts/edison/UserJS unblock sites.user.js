// ==UserScript==
// @name UserJS unblock sites
// @description My first crossbrowser userscript
// @author Mr_Mig
// @license MIT
// @version 1.0
// @namespace https://greasyfork.org/users/6356
// ==/UserScript==  
(function(window, undefined ) {
 
        // normalized window
        var w;
        if (unsafeWindow != "undefined"){
                w = unsafeWindow
        } else {
                w = window;    
        }
 	
	    // do not run in frames
        if (w.self != w.top){
                return;
        }
 	 	var str 	= document.documentElement.innerHTML;
    	var blocked = "Access to this site was blocked by system administrator";
     	if (str.indexOf(blocked)>-1){
            var href = w.location.href;
            Nach=href.indexOf("/",7);
            var strNach	=href.substring(0,Nach)
            var strKon	=href.substring(Nach)
            w.location.href=strNach+".prx2.unblocksit.es"+strKon;
            //w.location.href="http://www.google.com/search?q=cache:"+href
         }
    	if (str.indexOf("The website cannot be found")>-1){
            var href = w.location.href;
            Nach=href.indexOf("/",7);
            var strNach	=href.substring(0,Nach)
            var strKon	=href.substring(Nach)
            //w.location.href=strNach+".prx2.unblocksit.es"+strKon;
            w.location.href="http://www.google.com/search?q=cache:"+href
         }
    
    
})(window);
