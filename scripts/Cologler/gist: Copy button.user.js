// ==UserScript==
// @name               gist: Copy button
// @namespace          https://github.com/cologler/
// @version            0.1.3
// @description        add 'Copy' button to gist.
// @author             Cologler
// @match              https://gist.github.com/*/*
// @grant              GM_setClipboard
// @grant              GM_notification
// @grant              GM_xmlhttpRequest
// @connect            gist.githubusercontent.com
// @noframes
// @license            MIT
// @require            https://greasyfork.org/scripts/369577/code/event-emitter.js
// @require            https://greasyfork.org/scripts/369578/code/dom.js
// ==/UserScript==

// hosting on: https://gist.github.com/Cologler/7aaf8afd134dec2cfc599404667e4a96
// hosting on: https://greasyfork.org/scripts/369857

// just let type script work.
(function() { function require(){}; require("greasemonkey"); })();

if (typeof Components === 'undefined') {
    var Components = {};
}

(function() {
    'use strict';

    const ComponentName = 'gist: Copy button';

    Components[ComponentName] = (function() {

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

        function addCopyButton(cloneSrc, url) {
            const namespace = cloneSrc.parentElement[GM_info.script.namespace] = cloneSrc.parentElement[GM_info.script.namespace] || {};
            if (namespace.copy) {
                return;
            }
            namespace.copy = true;
          
            const newBtn = cloneSrc.cloneNode(true);
            newBtn.style.marginRight = '6px';
            const a = newBtn.querySelector('a');
            a.textContent = 'Copy';
            a.addEventListener('click', () => {
                copyCode(url);
                return false;
            });
            a.removeAttribute('href');
            
            cloneSrc.parentElement.insertBefore(newBtn, cloneSrc.nextSibling);
        }

        function main() {
            if (location.hostname === 'gist.github.com') {
                Dom.on('div.file-actions', z => {
                    const link = z.querySelector('a');
                    if (link && link.textContent === 'Raw') {
                        const url = link.href;
                        addCopyButton(z, url);
                    }
                });
            }
        }

        return {
            name: ComponentName,
            main,
        };
    })();

    if (GM_info.script.name === ComponentName) {
        Components[ComponentName].main();
    }
})();
