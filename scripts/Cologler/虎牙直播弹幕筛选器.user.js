// ==UserScript==
// @name                huya-filter
// @name:zh-CN          虎牙直播弹幕筛选器
// @namespace           https://github.com/cologler/
// @version             0.6.1
// @description         filter huya
// @description:zh-CN   筛选掉你讨厌的弹幕内容
// @author              cologler
// @match               http*://www.huya.com/*
// @grant               unsafeWindow
// @grant               GM_addStyle
// @grant               GM_registerMenuCommand
// @grant               GM_getValue
// @grant               GM_setValue
// @grant               GM_deleteValue
// @grant               GM_listValues
// @grant               GM_addValueChangeListener
// @grant               GM_removeValueChangeListener
// @require             https://greasyfork.org/scripts/369577/code/event-emitter.js
// @require             https://greasyfork.org/scripts/369578/code/dom.js
// @require             https://cdn.jsdelivr.net/quicksettings/latest/quicksettings.min.js
// @require             https://cdn.jsdelivr.net/gh/Cologler/monkey-in-zoo-javascript@v0.1.5/src/value.js
// @require             https://cdn.jsdelivr.net/npm/lokijs@1.5.5/build/lokijs.min.js
// ==/UserScript==

(function() {
    'use strict';

    function log(m) {
        console.log(m);
    }

    const config = {
        debug: false,
        recordHistory: false,
    };
    Object.defineProperty(config, 'blockReport', value.of('block-report', true).cache().asPropertyDescriptor());

    function logTextResult(isBlocked, text) {
        if (config.debug) {
            const msg = `HYF : %c${isBlocked ? "BLOCK" : "PASS "}: ${text}`;
            const style = isBlocked ? 'color: red' : 'color: green';
            console.debug(msg, style);
        }
    }

    function logAdded(type, value) {
        if (config.debug) {
            const msg = `added ${type}: ${value}`;
            console.debug(msg);
        }
    }

    class StringMatcher {
        constructor(filter) {
            let d = filter.data.strings.concat(filter.data.keywords).concat(filter.data.chars);
            this.data = new Set(d);
        }

        test(e) {
            return this.data.has(e);
        }
    }

    class CharMatcher {
        constructor(filter) {
            this.data = new Set(filter.data.chars);
        }

        has(ch) {
            return this.data.has(ch);
        }

        test(e) {
            if (e.length == 0) return false;
            let ch = e[0];
            if (!this.data.has(ch)) return false;
            for (let i = 1; i < e.length; i++) {
                if (e[i] != ch) {
                    return false;
                }
            }
            return true;
        }
    }

    class KeywordMatcher {
        constructor(filter) {
            this.data = filter.data.keywords.slice();
        }

        test(e) {
            for (let i = 0; i < this.data.length; i++) {
                if (e.indexOf(this.data[i]) > -1){
                    return true;
                }
            }
            return false;
        }
    }

    class RegexpMatcher {
        constructor(filter) {
            this.data = [];
            let s = this;
            filter.data.regexps.forEach(function (e) {
                s.add(new RegExp(e));
            });
        }

        test(e) {
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].test(e)){
                    return true;
                }
            }
            return false;
        }

        add(re) {
            this.data.push(re);
        }
    }

    class Cache {
        constructor(c) {
            this.capacity = c;
            this.set = new Set();
            this.data = [];
        }

        has(e) {
            return this.set.has(e);
        }

        push(e) {
            let s = this.set.size;
            this.set.add(e);
            if (this.set.size == s) return false;
            this.data.push(e);

            if (this.data.length > this.capacity) {
                let item = this.data.shift();
                if (item !== undefined) {
                    this.set.delete(item);
                }
            }
        }

        clear() {
            this.set.clear();
            this.data = [];
        }
    }

    const updatedEvent = new EventEmitter();
    const db = new loki('loki.json')

    class Filter {
        constructor() {
            this.reload();
            this._enable = true;
            this._history = db.addCollection('history');
        }

        get history() {
            return this._history;
        }

        isDisabled() {
            return !this._enable;
        }

        enable() {
            this._enable = true;
        }

        disable() {
            this._enable = false;
        }

        _onUpdated() {
            if (this.filtered) {
                this.filtered.clear();
            }
            if (this.unfiltered) {
                this.unfiltered.clear();
            }
            updatedEvent.emit();
            this.save();
        }

        reload() {
            this.data = GM_getValue('data', null);
            if (this.data === null) {
                this.data = {
                    strings : [],
                    chars : [],
                    keywords : [],
                    regexps : []
                };
                this.save();
            }
            this.stringMatcher = new StringMatcher(this);
            this.charMatcher = new CharMatcher(this);
            this.keywordMatcher = new KeywordMatcher(this);
            this.regexpMatcher = new RegexpMatcher(this);

            this.filtered = new Cache(1024);
            this.unfiltered = new Cache(1024);
        }

        save() {
            GM_setValue('data', this.data);
        }

        testcore(content) {
            if (this.stringMatcher.test(content)) return true;
            if (this.charMatcher.test(content)) return true;
            if (this.keywordMatcher.test(content)) return true;
            if (this.regexpMatcher.test(content)) return true;
            return false;
        }

        test(content) {
            if (this.unfiltered.has(content)) return false;
            if (this.filtered.has(content)) return true;
            let result = this.testcore(content);
            if (result) {
                this.filtered.push(content);
            } else {
                this.unfiltered.push(content);
            }
            return result;
        }

        addString(e) {
            if (typeof(e) == 'string') {
                if (!this.stringMatcher.test(e)) {
                    this.data.strings.push(e);
                    this.stringMatcher = new StringMatcher(this);
                    this._onUpdated();
                    logAdded('string', e);
                    return true;
                }
                log('already exists.');
            }
            return false;
        }

        addChar(e) {
            if (typeof(e) == 'string' && e.length == 1) {
                if (!this.charMatcher.has(e)) {
                    this.data.chars.push(e);
                    this.charMatcher = new CharMatcher(this);
                    this._onUpdated();
                    logAdded('char', e);
                    return true;
                }
                log('already exists.');
            }
            return false;
        }

        addKeyword(e) {
            if (typeof(e) == 'string') {
                if (!this.keywordMatcher.test(e)) {
                    this.data.keywords.push(e);
                    this.keywordMatcher = new KeywordMatcher(this);
                    this._onUpdated();
                    logAdded('keyword', e);
                    return true;
                }
                log('already exists.');
            }
            return false;
        }

        addRegexp(e) {
            let re = e;
            if (typeof(e) == 'string') {
                re = new RegExp(e);
            }
            if (re instanceof RegExp) {
                let s = e.source;
                if (this.data.regexps.indexOf(s) < 0) {
                    this.data.regexps.push(s);
                    this.regexpMatcher.add(re);
                    this._onUpdated();
                    logAdded('regexp', s);
                    return true;
                }
                log('already exists.');
            }
            return false;
        }
    }

    const filter = new Filter();
    unsafeWindow.filter = filter;

    function test(e) {
        try {
            return filter.test(e);
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const BlockedClassName = 'huya-filter-blocked';

    GM_addStyle(`.${BlockedClassName} {
        display: none;
    }`);

    const cb = d => {
        const names = ['.danmu-item', '.danmu-tv-item-small'];

        for (const queryName of names) {
            Dom.on(queryName, z => {
                if (filter.isDisabled()) {
                    return;
                }
                const text = z.textContent;

                const isBlocked = test(text);
                if (isBlocked) {
                    z.classList.add(BlockedClassName);
                    setTimeout(() => {
                        z.classList.remove(BlockedClassName);
                    }, 16000);
                }
                logTextResult(isBlocked, text);
            }, {
                element: d
            });

            updatedEvent.on(() => {
                if (filter.isDisabled()) {
                    return;
                }
                d.querySelectorAll(queryName).forEach(z => {
                    const text = z.textContent;
                    const isBlocked = test(text);
                    if (isBlocked) {
                        z.classList.add(BlockedClassName);
                        setTimeout(() => {
                            z.classList.remove(BlockedClassName);
                        }, 16000);
                    } else {
                        z.classList.remove(BlockedClassName);
                    }
                    logTextResult(isBlocked, text);
                });
            });
        }
    };

    Dom.once('#danmudiv', cb);
    Dom.once('#danmudiv2', cb);
    Dom.on('.dlg.miniDlg', d => {
        const msg = d.querySelector('.reportMsg-msg');
        if (msg && config.blockReport) {
            const text = msg.textContent;
            /** @type {HTMLAnchorElement} */
            const btn = d.querySelector('.dlg-ft').children[0];
            btn.addEventListener('click', () => {
                filter.addString(text);
            });
        }
    });

    const ignoreTypes = [
        'tit-h-send', // 送礼
        'msg-nobleEnter', // 进入直播间
        'msg-sys', // 系统公告
    ];
    Dom.on('.J_msg>div', div => {
        if (!config.recordHistory) {
            return;
        }

        if (ignoreTypes.some(z => div.classList.contains(z))) {
            return;
        }

        const user = div.querySelector('.name');
        if (!user) {
            return;
        }
        const msg = div.querySelector('.msg');
        if (!msg) {
            return;
        }

        const data = {
            type: 'msg',
            klsn: div.className,
            user: user.textContent,
            msg: msg.textContent,
        };
        filter.history.insert(data);
    });

    // setting panels

    function createSettingPanel() {
        const settings = QuickSettings.create(100, 100, 'huya-filter', null);
        settings.addBoolean('屏蔽举报的内容', config.blockReport, e => {
            config.blockReport = e;
        });
        settings.addBoolean('调试', config.debug, e => {
            config.debug = e;
        });
        settings.addBoolean('记录历史', config.recordHistory, e => {
            config.recordHistory = e;
        });
        return settings;
    }

    let SettingPanel = null;
    GM_registerMenuCommand('选项 <huya-filter>', () => {
        if (SettingPanel) {
            SettingPanel.toggleVisibility();
        } else {
            SettingPanel = createSettingPanel();
        }
    });

    // ensure not cover SettingPanel
    Dom.once('.room-hd', d => {
        d.style.zIndex = '0';
    });
    Dom.once('.room-player-wrap', d => {
        d.style.zIndex = '0';
    });
})();
