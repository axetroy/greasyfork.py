// ==UserScript==
// @name                   github-blocker
// @name:zh-CN             github-blocker
// @namespace              https://github.com/cologler/github-blocker
// @version                1.0.0.1
// @description            block github user.
// @description:zh-CN      屏蔽某些国产 github 伸手党用户.
// @author                 cologler
// @match                  https://github.com/*/*
// @grant                  GM_setValue
// @grant                  GM_getValue
// @grant                  GM_deleteValue
// @grant                  GM_info
// @grant                  GM_addStyle
// @grant                  GM_unregisterMenuCommand
// @grant                  GM_registerMenuCommand
// @grant                  GM_getResourceText
// @require                https://greasyfork.org/scripts/31497-styleswitcher/code/StyleSwitcher.js
// @resource               css-def    https://gist.github.com/Cologler/7891df3378eb77e2c908d76f43ba73e1/raw/github-blocker.def.css
// @resource               css-full    https://gist.github.com/Cologler/7891df3378eb77e2c908d76f43ba73e1/raw/github-blocker.full.css

// ==/UserScript==

(function() {
    'use strict';

    // style
    let sw = new StyleSwitcher();
    sw.addStyle('def', GM_getResourceText('css-def'));
    sw.addStyle('full', GM_getResourceText('css-full'));
    sw.load();

    // start script
    let KEY_TOKEN = 'token';
    let KEY_CACHE = 'cache';

    function buildTokenSaveButton(el) {
        let tk = el.querySelector('.token').innerHTML;
        let div = el.querySelector('.BtnGroup');
        // create button
        let a = document.createElement('a');
        a.addEventListener('click', function(ev) {
            console.log('Github-Blocker: saving token to ' + tk);
            GM_setValue(KEY_TOKEN, tk);
        });
        a.innerText = 'use for Github-Blocker';
        div.children[0].classList.forEach(function(z) {
            a.classList.add(z);
        });
        div.insertBefore(a, div.firstChild);
    }

    if (location.href == 'https://github.com/settings/tokens') {
        let tks = document.querySelectorAll('.access-token.new-token');
        if (tks.length == 1) {
            buildTokenSaveButton(tks[0]);
        }
        return;
    }

    if (/https:\/\/github.com\/settings/.test(location.href)) return;

    let token = GM_getValue(KEY_TOKEN, null);
    if (token === null) return;

    let resolveItems = function (blockeds, root) {
        if (root === null) root = document;
        if (root.querySelectorAll) {
            let cn = 'blocked-user';
            if (/^https:\/\/github.com\/.+\/.+\/issues$/.test(window.location.href)) {
                let rows = document.querySelectorAll('.js-issue-row');
                rows.forEach(function (row) {
                    if (row.classList.contains(cn)) return;
                    if (blockeds.has('https://github.com/' + row.querySelector('.opened-by a').innerText)) {
                        row.classList.add(cn);
                    }
                });
            } else if (/^https:\/\/github.com\/[^\/]+\/[^\/]+\/issues\/\d+$/.test(window.location.href)) {
                let comments = document.querySelectorAll('.timeline-comment-wrapper.js-comment-container');
                comments.forEach(function (cmt) {
                    if (cmt.classList.contains(cn)) return;
                    if (blockeds.has(cmt.children[0].href)) {
                        cmt.classList.add(cn);
                    }
                });
            }
        }
    };

    var handleBlackedElements = function(elements) {
        let cn = 'blocked-user';
        for (var i = 0; i < elements.length; i++) {
            let e = elements[i];
            if (!e.classList.contains(cn)) {
                e.classList.add(cn);
            }
        }
    };

    // datetime
    var now = new Date().getTime();
    var oldCacheJson = GM_getValue(KEY_CACHE, null);
    /* cache {
        time=new Date().getTime();
        etag = '';
        pages = [
            [0] = {
                etag = ;
                data = [.., ..,];
                nexturl = '';
            };
        ]
    */
    var cache = {
        pages: []
    };
    var useCache = function(c, node = null) {
        cache = c;
        var blockeds = new Set();
        for (var i = 0; i < c.pages.length; i++) {
            var page = c.pages[i];
            for (var j = 0; j < page.data.length; j++) {
                blockeds.add(page.data[j]);
            }
        }
        window._blocked_users = blockeds;
        resolveItems(blockeds, node);
    };
    var updateAndUseCache = function(c, node = null) {
        c.time = new Date().getTime();
        GM_setValue(KEY_CACHE, c);
        useCache(c, node);
    };
    var cache_old = null;
    if (oldCacheJson !== null) {
        if (typeof oldCacheJson === 'string') {
            cache_old = JSON.parse(oldCacheJson);
        } else {
            cache_old = oldCacheJson;
        }
        if (now - cache_old.time < 60 * 1000 && false) { // 1 min
            useCache(cache_old);
            return;
        }
    }

    window.addEventListener('DOMNodeInserted', function (e) {
        useCache(cache, e.target);
    });

    var buildUrl = function(index) {
        return 'https://api.github.com/user/blocks?page=' + (index + 1).toString();
    };
    var startRequest = function(index, url) {
        var page_old = null;
        if (cache_old !== null) {
            page_old = cache_old.pages[index] || null;
        }
        var req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            if (req.readyState == 4) {
                var page = null;
                if (req.status == 200) {
                    var a = { etag:3 };
                    page = {
                        data: [],
                        etag: req.getResponseHeader('Etag'),
                        nexturl: null
                    };
                    var result = JSON.parse(req.responseText);
                    for (var i = 0; i < result.length; i++) {
                        page.data[i] = result[i].html_url;
                    }
                    var nexturl = buildUrl(index + 1);
                    var link = req.getResponseHeader('Link');
                    if (link !== null && link.indexOf(nexturl) >= 0) {
                        page.nexturl = nexturl;
                    }
                } else if (req.status == 304) {
                    page = page_old;
                } else { // use old cache.
                    useCache(cache_old);
                    return;
                }
                if (page !== null) {
                    cache.pages[index] = page;
                    if (page.nexturl !== null) {
                        startRequest(index + 1, page.nexturl);
                    } else {
                        updateAndUseCache(cache);
                    }
                }
            }
        };
        req.open('GET', url);
        req.setRequestHeader('Authorization', 'token ' + token);
        req.setRequestHeader('Accept', 'application/vnd.github.giant-sentry-fist-preview+json');
        if (page_old !== null && page_old.etag !== null) {
            req.setRequestHeader('If-None-Match', page_old.etag);
        }
        req.send();
    };
    startRequest(0, 'https://api.github.com/user/blocks');
})();
