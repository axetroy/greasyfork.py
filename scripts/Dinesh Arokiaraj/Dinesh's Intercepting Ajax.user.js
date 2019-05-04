// ==UserScript==

// @name          Dinesh's Intercepting Ajax

// @namespace     http://www.webmonkey.com

// @description   An example Greasemonkey script that intercepts every ajax call.

// @include       *

// @version 0.0.1.20151001051228
// ==/UserScript==
unsafeWindow.$('body').ajaxSuccess (
    function (event, requestData)
    {
        alert("Dinesh");
        console.log (requestData.responseText);
    }
);