// ==UserScript==
// @name         blockerino the ad blockerino blockerino
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  shows how to use babel compiler
// @author       justrunmyscripts
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @match        http://*.deviantart.com/*
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
    /* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */

    // Your code here...
    $.noConflict();
    jQuery(document).ready(()=>{
        console.log('blockerino the ad blockerino blockerino');
        jQuery('#block-notice').remove();
    });

    /* jshint ignore:start */
]]></>).toString();
                  var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */