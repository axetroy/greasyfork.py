// ==UserScript==
// @name         Acorn Refresh Script
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  Automatically refresh your website
// @author       Megrez Lu <lujiajing1126@gmail.com>
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @match        https://acorn.utoronto.ca/sws/welcome.do*
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */
    const reload = () => { location.reload(); };
    unsafeWindow._task = setInterval( () => { reload(); }, 1000 * 60 * 1.5);
/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */