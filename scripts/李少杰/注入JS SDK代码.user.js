// ==UserScript==
// @name         注入JS SDK代码
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @grant        none
// ==/UserScript==
/* jshint -W097 */
//'use strict';

// Your code here...

var _vds = _vds || [];
window._vds = _vds;
(function(){
    _vds.push(['setAccountId', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx']);
    (function() {
        var vds = document.createElement('script');
        vds.type='text/javascript';
        vds.async = true;
        vds.src = "//dn-growing.qbox.me/vds-gate.js";
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(vds, s);
    })();
})();


console.log("my UA :"+navigator.userAgent);