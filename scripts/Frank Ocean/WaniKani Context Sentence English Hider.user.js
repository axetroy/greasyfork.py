// ==UserScript==
// @name         WaniKani Context Sentence English Hider
// @namespace    https://www.wanikani.com/
// @version      0.1
// @description  Hides the english translation of the japanese context sentences for vocabulary.
// @author       You
// @include      /^https?://www\.wanikani\.com/.*$/
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */

    GM_addStyle(`
        .context-sentence-group p:nth-child(2) { opacity: 0; }
        .context-sentence-group p:nth-child(2):hover { opacity: 1; }
    `);

/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */