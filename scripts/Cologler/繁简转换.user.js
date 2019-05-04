// ==UserScript==
// @name                convert chinese simplified and traditional
// @name:zh-CN          繁简转换
// @namespace           https://github.com/cologler/
// @version             0.2.2
// @description         auto switch chinese simplified or traditional.
// @description:zh-CN   自动繁简转换
// @author              cologler
// @include             *
// @exclude             https://gist.github.com/Cologler/d125f56c48904079946752184060f09b*
// @license             MIT
// @grant               GM_getValue
// @grant               GM_setValue
// @grant               GM_deleteValue
// @grant               GM_listValues
// @grant               GM_addValueChangeListener
// @grant               GM_removeValueChangeListener
// @grant               GM_getResourceText
// @grant               GM_registerMenuCommand
// @grant               GM_unregisterMenuCommand
// @require             https://greasyfork.org/scripts/370079/code/value.js
// @require             https://greasyfork.org/scripts/370084/code/i18n.js
// @require             https://cdn.jsdelivr.net/quicksettings/latest/quicksettings.min.js
// @resource            sc  https://gist.githubusercontent.com/Cologler/d125f56c48904079946752184060f09b/raw/sc.txt
// @resource            tc  https://gist.githubusercontent.com/Cologler/d125f56c48904079946752184060f09b/raw/tc.txt
// ==/UserScript==

// base on:                 https://greasyfork.org/scripts/24300
// hosting on Gist:         https://gist.github.com/Cologler/d125f56c48904079946752184060f09b
// hosting on GreasyFork:   https://greasyfork.org/scripts/32324

// just let type script work.
(function() { function require(){}; require("greasemonkey"); })();

(function() {
    'use strict';

    const MODE_NONE = 0;
    const MODE_SIMPLIFIED = 1;
    const MODE_TRADITIONAL = 2;

    /**
     * @typedef {MODE_NONE|MODE_SIMPLIFIED|MODE_TRADITIONAL} Mode
     */

    const defMode = value.of('def-mode', MODE_NONE);
    function getSite() {
        return value.of('sites', {}).then(location.hostname, defMode.get());
    }
    let site = getSite();
    defMode.onChanged(() => site = getSite());

    const i18nr = new i18n.Resolver();
    const DescMap = {
        [MODE_NONE]: {
            '': 'disable convert',
            'zh': '關閉繁簡轉換',
            'zh-cn': '关闭繁简转换'
        },
        [MODE_SIMPLIFIED]: {
            '': 'convert to simplified',
            'zh': '自動轉成簡體',
            'zh-cn': '自动转成简体'
        },
        [MODE_TRADITIONAL]: {
            '': 'convert to traditional',
            'zh': '自動轉成繁體',
            'zh-cn': '自动转成繁体'
        },
        'options': {
            '': 'options <chinese convert>',
            'zh': '選項 <繁簡轉換>',
            'zh-cn': '选项 <繁简转换>'
        },
        'default': {
            '': 'default',
            'zh': '默認',
            'zh-cn': '默认'
        }
    };

    let stMap = null;
    let tsMap = null;
    function ensureMapped() {
        if (stMap !== null && tsMap !== null) {
            return;
        }
        let scStr = GM_getResourceText('sc');
        let tcStr = GM_getResourceText('tc');
        stMap = {};
        tsMap = {};
        console.assert(scStr.length === tcStr.length);
        for (let i = 0; i < scStr.length; i++) {
            let s = scStr[i];
            let t = tcStr[i];
            stMap[s] = t;
            tsMap[t] = s;
        }
    }
    function cc(str, simplify) {
        if (!str) {
            return '';
        }
        ensureMapped();
        let ret = '';
        let map = simplify ? tsMap : stMap;
        for (let i = 0; i < str.length; i++) {
            let ch = str[i];
            ret += map[ch] || ch;
        }
        return ret;
    }

    const OriginSymbol = Symbol('origin');

    /**
     * @typedef Origin
     * @prop {string} text
     * @prop {Mode} mode current display mode
     */

    /**
     * @param {Text} node
     * @param {Mode} mode
     */
    function visitTextNode(node, mode) {
        if (node.textContent) {
            /** @type {Origin|undefined} */
            let origin = node[OriginSymbol];
            if (!origin) { // no init
                if (mode === MODE_NONE) {
                    return;
                }
                node[OriginSymbol] = origin = {
                    text: node.textContent,
                    mode: MODE_NONE
                };
            }

            if (origin.mode !== mode) {
                let tt = null; // translation text
                if (mode === MODE_NONE) {
                    tt = origin.text;
                } else {
                    tt = cc(origin.text, mode === 1);
                }
                if (tt !== node.textContent) {
                    node.textContent = tt;
                }
            }
        }
    }

    const IGNORE_TAGS = new Set(['pre']);

    /**
     * @param {HTMLElement} node
     * @param {Mode} mode
     */
    function visitElement(node, mode) {
        if (IGNORE_TAGS.has(node.tagName.toLowerCase())) {
            return;
        }

        if (node.childNodes) {
            node.childNodes.forEach(z => visitNode(z, mode));
        }
    }

    /**
     * @param {Node} node
     * @param {Mode} mode
     */
    function visitNode(node, mode) {
        switch (node.nodeType) {
            case Node.TEXT_NODE: return visitTextNode(node, mode);
            case Node.ELEMENT_NODE: return visitElement(node, mode);
        }
    }

    function visitNodeRoot(node) {
        if (node.nodeType !== Node.TEXT_NODE) {
            visitNode(node, site.get());
        }
    }

    let observer = null;
    function init() {
        let requireCC = false;

        if (site.get() === MODE_NONE) {
            if (observer) {
                observer.disconnect();
                observer = null;
                requireCC = true;
            }
        } else {
            observer = new MutationObserver(mrs => {
                mrs.forEach(mr => {
                    mr.addedNodes.forEach(visitNodeRoot);
                });
            });
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            requireCC = true;
        }

        registerCommand();

        if (requireCC) {
            document.head.querySelectorAll('title').forEach(visitNodeRoot);
            visitNode(document.body, site.get());
        }
    }

    let cmdId = null;
    function registerCommand() {
        if (window.top !== window) { // iframe
            return;
        }

        if (cmdId !== null) {
            GM_unregisterMenuCommand(cmdId);
        }

        let mode = site.get();
        mode = (mode + 1) % 3;
        const caption = i18nr.resolve(DescMap[mode]);
        cmdId = GM_registerMenuCommand(caption, () => {
            site.set(mode);
            init();
        });
    }

    const DropDownModesTable = [
        {
            label: i18nr.resolve(DescMap[MODE_NONE]),
            value: { v: MODE_NONE } // there a bug in quicksettings, value cannot be 0.
        }, {
            label: i18nr.resolve(DescMap[MODE_SIMPLIFIED]),
            value: { v: MODE_SIMPLIFIED }
        }, {
            label: i18nr.resolve(DescMap[MODE_TRADITIONAL]),
            value: { v: MODE_TRADITIONAL }
        },
    ];

    function addDropDown(settings, title, selected, cb) {
        const adding = DropDownModesTable.filter(z => z.value.v === selected);
        adding.push(...DropDownModesTable.filter(z => z.value.v !== selected));
        settings.addDropDown(title, adding, cb);
    }

    (() => {
        let settings = null;
        const optionTitle = i18nr.resolve(DescMap['options']);
        GM_registerMenuCommand(optionTitle, () => {
            if (settings) {
                settings.destroy();
                settings = null;
            } else {

                settings = QuickSettings.create(500, 50, optionTitle);
                // default
                addDropDown(settings, i18nr.resolve(DescMap['default']), defMode.get(), z => {
                    defMode.set(z.value.v);
                    init();
                });
                // hostname
                addDropDown(settings, location.hostname, site.get(), z => {
                    site.set(z.value.v);
                    init();
                });
            }
        });
    })();

    init();
})();
