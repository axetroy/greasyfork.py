// ==UserScript==
// @name        auto_ref_thaieibvn
// @description auto ref = thaieibvn
// @namespace   *
// @version      0.2
// @include     **

// @grant       none

// ==/UserScript==
function doText() {
   var url =window.location.href; 
   if (url.indexOf('?ref=thaieibvn')==-1 && url.length<30){
     window.location.assign(url+'/?ref=thaieibvn');
    //alert( );
   } 

}

doText();
//var myInterval = setInterval(doText, 500);

