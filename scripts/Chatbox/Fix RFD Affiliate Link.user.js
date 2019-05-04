// ==UserScript==
// @name         Fix RFD Affiliate Link
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  A 20 minutes attempt to fix RFD Affliated Link
// @author       Chatbox
// @match        forums.redflagdeals.com/*/*
// @match        www.redflagdeals.com/deal/*/*
// @grant        none
// ==/UserScript==

//Credit to https://www.sitepoint.com/get-url-parameters-with-javascript/ for the getAllUrlParams function.

(function() {

    function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i=0; i<arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // in case params look like: list[]=thing1&list[]=thing2
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1,-1);
        return '';
      });

      // set parameter value (use 'true' if empty)
      var paramValue = typeof(a[1])==='undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      //paramValue = paramValue.toLowerCase();

      // if parameter name already exists
      if (obj[paramName]) {
        // convert value to array (if still string)
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        // if no array index number specified...
        if (typeof paramNum === 'undefined') {
          // put the value on the end of the array
          obj[paramName].push(paramValue);
        }
        // if array index number specified...
        else {
          // put the value at that index number
          obj[paramName][paramNum] = paramValue;
        }
      }
      // if param name doesn't exist yet, set it
      else {
        obj[paramName] = paramValue;
      }
    }
  }

  return obj;
}
    'use strict';

    var els;
    var lnk;
    var title;
    var i;

    els = document.getElementsByTagName("a");

    for(i=0;i<els.length;i++) {
        lnk = els[i];

        if("RedFlagDeals.com Affiliate Link" == lnk.getAttribute("title")) {
            var url;
            var val;
            var parms;
            parms = getAllUrlParams(lnk.getAttribute("href"));
            val = parms.url;

            if(val == null || val == undefined) {
                val = parms.murl;

                if(val == null || val == undefined) {
                    val = parms.location;

                    if(val == null || val == undefined) {
                        val = parms.u;
                    }
                }
            }

            if(val != undefined) {
              lnk.setAttribute("href", decodeURIComponent( val ));
            }
        }
    }

})();

