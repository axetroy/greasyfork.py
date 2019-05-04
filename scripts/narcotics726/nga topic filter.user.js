// ==UserScript==
// @name         nga topic filter
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  filter out topics you dont want to see
// @author       narcotics726
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @match        http://*/*
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
    /* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */

    // Your code here...
const filterRun = function () {
    const rows = document.querySelectorAll('#topicrows .topicrow');
    let index = 0;
    rows.forEach((row) => {
        const oddOneTwo = index % 2 + 1;
        row.classList.remove('row1');
        row.classList.remove('row2');
        let cate = row.querySelector('.titleadd2>a');
        if (!cate) {
            cate = '';
        } else {
            cate = cate.innerHTML;
        }

        if (cate.includes('绝地求生')) {
            row.style = ('display: none');
            row.setAttribute('hidden', 'hidden');
        } else {
            row.classList.add('row' + oddOneTwo);
            index += 1;
        }
    });
};
window.onload = function () {
    const container = document.querySelector('#topicrows');
    const observer = new MutationObserver((muts) => {
        filterRun();
    });

    observer.observe(container, {childList: true});

    filterRun();

};

    /* jshint ignore:start */
]]></>).toString();
                  var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */