// ==UserScript==
// @name         Github PR Status Style
// @namespace    http://tampermonkey.net/
// @version      0.2.0
// @description  Adds simple styles to github PR review status
// @author       bmatto
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @resource     githubPRStyles https://gist.githubusercontent.com/bmatto/c17fda5d0a765f3e342bbe4c56dc47a3/raw/de5484b38ca9e000a49504bcec140ef5f801bc8d/github_pr_status_styles.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @match        http://*/*
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */

    // Your code here...
    const styles = GM_getResourceText('githubPRStyles');

    GM_addStyle(styles);
/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */