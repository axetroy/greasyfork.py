// ==UserScript==
// @name               gist: Raw (Newest) button
// @namespace          https://github.com/cologler/
// @version            0.1.4
// @description        add 'Raw (Newest)' button to gist.
// @author             Cologler
// @match              https://gist.github.com/*/*
// @connect            gist.githubusercontent.com
// @noframes
// @license            MIT
// @require            https://greasyfork.org/scripts/369577/code/event-emitter.js
// @require            https://greasyfork.org/scripts/369578/code/dom.js
// ==/UserScript==

// hosting on: https://gist.github.com/Cologler/c7c2deaf2a70bdebfe93f0bf797c369c
// hosting on: https://greasyfork.org/scripts/369858

// just let type script work.
(function() { function require(){}; require("greasemonkey"); })();

if (typeof Components === 'undefined') {
    var Components = {};
}

(function() {
    'use strict';

    const ComponentName = 'gist: Raw (Newest) button';

    Components[ComponentName] = (function() {

        function getRawNewestUrl(url) {
            let m = url.match(/\/raw\/[0-9a-f]{40}\//);
            return url.replace(m[0], '/raw/');
        }

        function addNewestRawButton(cloneSrc, url) {
            const namespace = cloneSrc.parentElement[GM_info.script.namespace] = cloneSrc.parentElement[GM_info.script.namespace] || {};
            if (namespace.newestraw) {
                return;
            }
            namespace.newestraw = true;
          
            const newBtn = cloneSrc.cloneNode(true);
            newBtn.style.marginRight = '6px';
            const a = newBtn.querySelector('a');
            a.textContent = 'Raw (Newest)';
            a.href = getRawNewestUrl(url);
            
            cloneSrc.parentElement.insertBefore(newBtn, cloneSrc.nextSibling);
        }

        function main() {
            if (location.hostname === 'gist.github.com') {
                Dom.on('div.file-actions', z => {
                    const link = z.querySelector('a');
                    if (link && link.textContent === 'Raw') {
                        const url = link.href;
                        addNewestRawButton(z, url);
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
