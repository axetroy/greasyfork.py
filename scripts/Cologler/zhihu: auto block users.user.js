// ==UserScript==
// @name                zhihu: auto block users
// @namespace           https://github.com/Cologler/
// @version             0.1.1
// @description         try to take over the world!
// @author              Cologler (skyoflw@gmail.com)
// @match               https://www.zhihu.com/
// @grant               GM_setValue
// @grant               GM_getValue
// @noframes
// @license             MIT
// @require             https://greasyfork.org/scripts/369577/code/event-emitter.js
// @require             https://greasyfork.org/scripts/369578/code/dom.js
// ==/UserScript==

// hosting on:

// let type script auto-completion work.
(function() { function require(){}; require("greasemonkey"); })();

(function() {
    'use strict';

    const BlockKeywords = GM_getValue('keywords', []);
    if (BlockKeywords.length === 0) {
        GM_setValue('keywords', []);
    }

    Dom.on('.Card.TopstoryItem', z => {
        const authorDescEl = z.querySelector('.Feed .FeedSource .AuthorInfo .AuthorInfo-detail');
        if (!authorDescEl) {
            return;
        }

        const authorDesc = authorDescEl.textContent;
        if (BlockKeywords.every(z => !authorDesc.includes(z))) {
            return;
        }

        const notInterestedBtn = z.querySelector('button.TopstoryItem-rightButton');
        if (!notInterestedBtn || notInterestedBtn.dataset.tooltip !== '不感兴趣') {
            return;
        }

        const authorName = z.querySelector('.AuthorInfo-head .Popover').textContent;
        console.debug(`blocking <${authorName}> since desc: <${authorDesc}>`);

        Dom.once('.TopstoryItem-uninterestTitle', x => {
            const ls = [];
            for (const btn of x.nextSibling.querySelectorAll('button.TopstoryItem-uninterestTag')) {
                if (btn.textContent.includes(authorName)) {
                    ls.push(btn.textContent);
                    btn.click();
                }
            }
            const commitBtn = x.previousElementSibling;
            if (commitBtn.classList.contains('is-active')) {
                commitBtn.click();
                console.debug(`blocked ${ls.join(' & ')}`);
            } else {
                console.debug(`commit button is not actived.`);
            }
        }, {
            element: z
        });

        notInterestedBtn.click();
    });
})();
