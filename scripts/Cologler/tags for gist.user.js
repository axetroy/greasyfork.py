// ==UserScript==
// @name               tags for gist
// @namespace          https://github.com/cologler/
// @version            0.1.1.5
// @description        add tags support for gist.
// @author             cologler (skyoflw@gmail.com)
// @match              https://gist.github.com/*
// @grant              GM_setValue
// @grant              GM_getValue
// @noframes
// @license            MIT
// @require            https://greasyfork.org/scripts/31694/code/OnDom.js
// ==/UserScript==

// this script was hosting on: https://gist.github.com/Cologler/b39e348b64c6140d2fcfcf7ee6c1f503
// this script was hosting on: https://greasyfork.org/scripts/32990

// just let type script work.
(function() { function require(){}; require("greasemonkey"); })();

(function() {
    'use strict';

    const KEY_TAGS = 'tags';
    const RECENTLY_MAX_COUNT = 20;
    const SUGGESTS_MAX_COUNT = 30;

    const userLogins = Array.from(document.querySelectorAll('meta'))
        .filter(z => z.name === 'user-login');
    if (userLogins.length === 0) {
        // not login.
        // this script on work on login.
        return;
    }
    const userName = userLogins[0].content;
    if (location.href !== 'https://gist.github.com/' && !location.href.includes(userName)) {
        return;
    }

    class Settings {
        constructor() {
            Object.defineProperties(this, {
                tags: {
                    get: () => GM_getValue(KEY_TAGS, []),
                    set: val => GM_setValue(KEY_TAGS, val)
                }
            });
        }
    }
    const settings = new Settings();

    function getQueryUrl(tag) {
        const url = '/search?utf8=✓&q=' + encodeURIComponent(`user:${userName} #${tag}`);
        return url;
    }

    function renderTagsSearchSuggests() {
        onDom('.gist-quicksearch-result-header', z => {
            const group = z.parentElement;
            const quicksearch = group.parentElement;
            if (z.innerText !== 'Yours') {
                return;
            }
            const searchText = document.querySelector('.header-search-input').value;
            if (!searchText) {
                return;
            }
            const id = 'e93a529b-9e5e-4ab9-99e1-ba1f30e94cf3';
            let suggests = quicksearch.querySelector('#' + id);
            if (!suggests) {
                suggests = group.cloneNode(true);
                suggests.id = id;
                suggests.querySelector('.gist-quicksearch-result-header').innerText = 'Tags';
                group.parentElement.appendChild(suggests);
            }
            const hits = suggests.querySelector('.gist-quicksearch-hits');
            const tags = settings.tags.filter(x => ('#' + x).includes(searchText)).slice(0, SUGGESTS_MAX_COUNT);
            if (tags.length === 0) {
                hits.innerHTML = '<span class="gist-quicksearch-no-results">No results.</span>';
            } else {
                hits.innerHTML = '';
                tags.forEach(x => {
                    const a = document.createElement('a');
                    a.classList.add('select-menu-item');
                    a.addEventListener('mouseenter', () => {
                        quicksearch.querySelectorAll('.navigation-focus').forEach(c => {
                            c.classList.remove('navigation-focus');
                        });
                        a.classList.add('navigation-focus');
                    });
                    a.addEventListener('mouseleave', () => a.classList.remove('navigation-focus'));
                    a.style.paddingLeft = '8px';
                    a.href = getQueryUrl(x);
                    const doc = document.createElement('h4');
                    doc.innerText = x;
                    a.appendChild(doc);
                    hits.appendChild(a);
                });
            }
        });
    }

    function renderRecentlyTags() {
        function createTagElement(tag, input) {
            const btn = document.createElement('a');
            btn.classList.add('btn', 'btn-sm');
            btn.innerText = tag;
            btn.style.margin = '3px';
            btn.addEventListener('click', () => {
                if (input.value.indexOf(tag) < 0) {
                    if (input.value) {
                        input.value += (' #' + tag);
                    }
                    else {
                        input.value = '#' + tag;
                    }
                }
            });
            return btn;
        }

        function parseTags(inputText) {
            const m = inputText.match(/#[^ ]+([ ]|$)/g);
            if (m) {
                return m.map(z => z.substr(1).replace(' ', ''));
            } else {
                return [];
            }
        }

        onDom('.input-contrast', z => {
            { // for save
                if (z.id === 'new_comment_field') {
                    return;
                }

                const oldValue = z.value;
                const oldTags = new Set(parseTags(oldValue));
                [
                    ...document.querySelectorAll('.js-gist-create'),
                    ...document.querySelectorAll('button.btn-primary'),
                ].forEach(x => {
                    x.addEventListener('click', () => {
                        if (z.value != oldValue) { // changed.
                            const set = new Set();
                            const tags = [];
                            [...parseTags(z.value), ...settings.tags].forEach(x => {
                                if (!set.has(x)) {
                                    set.add(x);
                                    tags.push(x);
                                }
                            });
                            settings.tags = tags;
                        }
                    });
                });
            }

            { // for read
                const tags = settings.tags.slice(0, RECENTLY_MAX_COUNT);
                const div = document.createElement('div');
                div.style.marginTop = '6px';
                div.style.height = '34px';
                div.style.overflow = 'hidden';
                const doc = document.createElement('p');
                doc.innerText = 'Recently tags:';
                doc.style.margin = 'initial';
                doc.style.marginRight = '10px';
                doc.style.display = 'inline-block';
                doc.style.verticalAlign = 'middle';
                div.appendChild(doc);
                tags.forEach(x => {
                    div.appendChild(createTagElement(x, z));
                });
                z.parentElement.insertBefore(div, z.nextElementSibling);
            }
        });
    }

    function renderTagsList() {
        return; // not impl
        onDom('.gist-content-wrapper', z => {
            const panel = document.createElement('div');
            panel.style.position = 'absolute';
            panel.style.marginLeft = '1480px';
            const tags = settings.tags;
            tags.sort();
            tags.forEach(x => {
                const a = document.createElement('a');
                a.style.display = 'block';
                a.href = getQueryUrl(x);
                const doc = document.createElement('h4');
                doc.innerText = x;
                a.appendChild(doc);
                panel.appendChild(a);
            });
            z.insertBefore(panel, z.querySelector('.gisthead').nextElementSibling);
        });
    }

    // render global.
    renderTagsSearchSuggests();

    // render spec.
    if (location.href === 'https://gist.github.com/') {
        renderRecentlyTags();
    } else if (/^https:\/\/gist\.github\.com\/[^\/]+\/[0-9a-f]{20}(?:[0-9a-f]{12})?(\/edit)?$/.test(location.href)) {
        renderRecentlyTags();
    }

    {
        let match = location.href.match(/^https:\/\/gist\.github\.com\/([^?\/]+)(?:$|public$|secret$)/);
        if (match && match[1] === userName) { // current user page
            renderTagsList();
        }
    }
})();