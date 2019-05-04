// ==UserScript==
// @name         Redirect New Unity Asset Store Links to Old Unity Asset Store
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  This new Unity Asset Store is annoying...
// @author       You
// @include      https://www.assetstore.unity*
// @include      https://assetstore.unity*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    //"packages" is used by the new Asset Store, where it is "content" on the old Asset Store.
    if(document.URL.includes("packages")) {
        window.location.href = "https://www.assetstore.unity3d.com/en/?stay#!/content/" + document.URL.substr(document.URL.lastIndexOf("-") + 1, document.URL.length);
    } else if(document.URL == "https://assetstore.unity.com/") {
        window.location.href = "https://www.assetstore.unity3d.com/en/?stay";
    }
})();