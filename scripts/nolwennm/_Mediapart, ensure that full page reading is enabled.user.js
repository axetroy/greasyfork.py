// ==UserScript==
// @name        _Mediapart, ensure that full page reading is enabled
// @match       *://*.mediapart.fr/*
// @run-at      document-start
// @grant       none
// @description a script to force mediapart articles to be displayed in full page instead of having pagination
// @version 0.0.1.20171110122150
// @namespace https://greasyfork.org/users/158718
// ==/UserScript==

  var UrlPathToUse  = window.location.pathname;
  var oldUrlPath  = window.location.href;

  /*--- Test that "onglet=full" is at end of URL*/

  if ( ! /onglet=full$/.test(oldUrlPath) ) {


      var newURL  = window.location.protocol + "//"
                  + window.location.host
                  + UrlPathToUse + "?onglet=full"
                  + window.location.hash
                  ;
      /*-- replace() puts the good page in the history instead of the
        bad page.
      */
      window.location.replace (newURL); 
  }