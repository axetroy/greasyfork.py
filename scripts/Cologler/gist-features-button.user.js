// ==UserScript==
// @name               gist-features-button
// @namespace          https://github.com/cologler/
// @version            1.2
// @description        add 'Raw (Newest)' and 'copy' to gist.
// @author             cologler
// @match              https://gist.github.com/*/*
// @match              https://app.gistboxapp.com/*
// @grant              GM_setClipboard
// @grant              GM_notification
// @grant              GM_xmlhttpRequest
// @connect            gist.githubusercontent.com
// @require            https://greasyfork.org/scripts/31694-ondom/code/OnDom.js
// ==/UserScript==

// this script was hosting on: https://greasyfork.org/zh-CN/scripts/29107

// just let type script work.
(function() { function require(){}; require("greasemonkey"); })();

(function() {
    'use strict';

    const NEWEST_BUTTON_TEXT = 'Raw (Newest)';
    const COPY_BUTTON_TEXT = 'copy';

    function getRawNewestUrl(url) {
        let m = url.match(/\/raw\/[0-9a-f]{40}\//);
        return url.replace(m[0], '/raw/');
    }

    function copyCode(url) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            onload: z => {
                if (z.status === 200) {
                    GM_setClipboard(z.responseText);
                    GM_notification({
                        text: 'copyed!'
                    });
                } else {
                    GM_notification({
                        text: 'error code: ' + z.status
                    });
                }
            }
        });
    }

    if (location.host === 'gist.github.com') {
        onDom('div.file-actions', z => {
            function cloneButton() {
                const newBtn = z.cloneNode(true);
                newBtn.style.marginRight = '6px';
                z.parentElement.insertBefore(newBtn, z.nextSibling);
                return newBtn;
            }

            if (z.children[0].innerText === 'Raw') {
                const rawUrl = z.children[0].href;

                { // Copy
                    const btn = cloneButton();
                    const a = btn.children[0];
                    a.addEventListener('click', e => {
                        copyCode(rawUrl);
                        return false;
                    });
                    a.removeAttribute('href');
                    a.innerText = COPY_BUTTON_TEXT;
                }

                { // Raw (Newest)
                    const btn = cloneButton();
                    const a = btn.children[0];
                    a.innerText = NEWEST_BUTTON_TEXT;
                    a.href = getRawNewestUrl(rawUrl);
                }
            }
        });
    } else if (location.host.endsWith('.gistboxapp.com')) {
        onDom('.gist-file-controls .btn-group', z => {
            if (z.children.length === 2) {
                let newNode = z.children[1].cloneNode(true);
                newNode.href = getRawNewestUrl(z.children[1].href);
                newNode.childNodes[2].textContent = NEWEST_BUTTON_TEXT;
                z.appendChild(newNode);
            }
        });
    }
})();