// ==UserScript==
// @name         Enable Checkboxes in Github
// @namespace    timothy-b.com
// @version      1
// @description  Enables checkboxes in Github
// @author       Timothy Baumgartner
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @match        https://git/*
// @match        https://github.com/*
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */

    const inputElements = document.getElementsByTagName('input');
    for (let i = 0, n = inputElements.length; i < n; i++)
        if (inputElements[i].getAttribute('type') !== null && inputElements[i].getAttribute('type') == 'checkbox')
            inputElements[i].removeAttribute('disabled');

/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */