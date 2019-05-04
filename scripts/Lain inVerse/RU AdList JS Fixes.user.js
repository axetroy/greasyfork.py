// ==UserScript==
// @name         RU AdList JS Fixes
// @namespace    ruadlist_js_fixes
// @version      20190417.0
// @description  try to take over the world!
// @author       lainverse & dimisa
// @supportURL   https://greasyfork.org/en/scripts/19993-ru-adlist-js-fixes/feedback
// @match        *://*/*
// @exclude      *://auth.wi-fi.ru/*
// @exclude      *://*.alfabank.ru/*
// @exclude      *://alfabank.ru/*
// @exclude      *://*.unicreditbanking.net/*
// @exclude      *://unicreditbanking.net/*
// @exclude      *://*.telegram.org/*
// @exclude      *://telegram.org/*
// @grant        unsafeWindow
// @grant        window.close
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    let win = (unsafeWindow || window);

    // MooTools are crazy enough to replace standard browser object window.Document: https://mootools.net/core
    // Occasionally their code runs before my script on some domains and causes all kinds of havoc.
    let _Document = Object.getPrototypeOf(HTMLDocument.prototype);
    let _Element = Object.getPrototypeOf(HTMLElement.prototype);
    // dTree 2.05 in some cases replaces Node object
    let _Node = Object.getPrototypeOf(_Element);
    let _console = {};
    for (let name in win.console) _console[name] = console[name];
    Object.defineProperty(win.console, 'clear', { value: () => null });

    // http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
    let isOpera = (!!window.opr && !!window.opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
        isChrome = !!window.chrome && !!window.chrome.webstore,
        isSafari =
        Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 ||
        (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window.safari || window.safari.pushNotification);
    let isFirefox = 'InstallTrigger' in win;
    let inIFrame = (win.self !== win.top);
    let _getAttribute = Function.prototype.call.bind(_Element.getAttribute),
        _setAttribute = Function.prototype.call.bind(_Element.setAttribute),
        _removeAttribute = Function.prototype.call.bind(_Element.removeAttribute);
    let _document = win.document,
        _de = _document.documentElement,
        _appendChild = _Document.appendChild.bind(_de),
        _removeChild = _Document.removeChild.bind(_de),
        _createElement = _Document.createElement.bind(_document),
        _querySelector = _Document.querySelector.bind(_document),
        _querySelectorAll = _Document.querySelectorAll.bind(_document);

    if (isFirefox && // Exit on image pages in Fx
        _document.constructor.prototype.toString() === '[object ImageDocumentPrototype]')
        return;

    // NodeList and HTMLCollection iterator polyfill
    // required for old versions of Safari and Chrome 49 (last available for WinXP)
    // https://jakearchibald.com/2014/iterators-gonna-iterate/
    if (!NodeList.prototype[Symbol.iterator])
        NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
    if (!HTMLCollection.prototype[Symbol.iterator])
        HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

    // Wrapper to run scripts designed to override objects available to other scripts
    // Required in old versions of Firefox (<58) or when running with Greasemonkey
    let skipLander = true;
    try {
        skipLander = !(isFirefox && ('StopIteration' in win || GM.info.scriptHandler === 'Greasemonkey'));
    } catch(ignore){}
    let batchLand = [];
    let batchPrepend = [];
    let _APIString = 'let win = window, _console = {}; for (let name in win.console) _console[name] = console[name]; '+
        'let _document = win.document, _Document = Object.getPrototypeOf(HTMLDocument.prototype),'+
        ' _Element = Object.getPrototypeOf(HTMLElement.prototype), _Node = Object.getPrototypeOf(_Element);';
    let landScript = (f, pre) => {
        let script = _createElement('script');
        script.textContent = `(()=>{${_APIString}${(
            (pre.length > 0 ? pre.join(';') : '')
        )};(${f.join(')();(')})();})();`;
        _appendChild(script);
        _removeChild(script);
    };
    let scriptLander = f => f();
    if (!skipLander) {
        scriptLander = (func, ...prepend) => {
            prepend.forEach(
                x => batchPrepend.includes(x) ? null : batchPrepend.push(x)
            );
            batchLand.push(func);
        };
        _document.addEventListener(
            'DOMContentLoaded', () => void (scriptLander = (f, ...prep) => landScript([f], prep)), false
        );
    }

    function nullTools(opts) {
        let nt = this;
        opts = opts || {};
        let log = (...args) => opts.log && _console.log(...args);
        let warn = (...args) => _console.warn(...args);
        let trace = (...args) => (opts.log || opts.trace) && warn(...args);

        nt.destroy = function(o, destroy) {
            if (!opts.destroy && !destroy && o instanceof Object)
                return;
            log('cleaning', o);
            try {
                for (let item in o) {
                    if (item instanceof Object)
                        nt.destroy(item);
                    delete o[item];
                }
            } catch (e) {
                log('Error in object destructor', e);
            }
        };

        nt.define = function(obj, prop, val, enumerable = true) {
            try {
                Object.defineProperty(
                    obj, prop, {
                        get: () => val,
                        set: v => {
                            if (v !== val) {
                                log(`set ${prop} of`, obj, 'to', v);
                                nt.destroy(v);
                            }
                        },
                        enumerable: enumerable
                    }
                );
            } catch (err) {
                _console.log(`Unable to redefine "${prop}" in `, obj, err);
            }
        };
        nt.proxy = function(obj, missingFuncParentName, missingFuncValue) {
            return new Proxy(
                obj, {
                    get: (t, p) => {
                        if (p in t)
                            return t[p];
                        if (typeof p === 'symbol') {
                            if (p === Symbol.toPrimitive)
                                t[p] = function(hint) {
                                    if (hint === 'string')
                                        return Object.prototype.toString.call(this);
                                    return `[missing toPrimitive] ${name} ${hint}`;
                                };
                            else {
                                t[p] = void 0;
                                _console.warn('Missing', p, missingFuncParentName ? `in ${missingFuncParentName}` : '', '>>', t[p]);
                            }
                            return t[p];
                        }
                        if (missingFuncParentName) {
                            t[p] = nt.func(missingFuncValue, `${missingFuncParentName}.${p}`);
                            return t[p];
                        }
                        _console.warn(`Missing ${p} in`, t);
                    },
                    set: (t, p, v) => {
                        if (v !== t[p]) {
                            log(`set ${p} of`, t, 'to', v);
                            nt.destroy(v);
                        }
                        return true;
                    }
                }
            );
        };
        nt.func = (val, name = '', force_log = false) => nt.proxy((...args) => {
            (force_log ? warn : trace)(`call ${name}(`, ...args,`) return`, val);
            return val;
        });
    }

    // Debug function, lists all unusual window properties
    function getStrangeObjectsList() {
        _console.warn('Strangers list start');
        let _toString = Function.prototype.call.bind(Function.prototype.toString);
        let _skip = 'frames/self/window/webkitStorageInfo'.split('/');
        for (let n in win) {
            let val = win[n];
            if (val && !_skip.includes(n) && (win !== window && val !== window[n] || win === window) &&
                (!(val instanceof Function) ||
                 val instanceof Function &&
                 !(new RegExp (`^function\\s(${n})?\\(\\)[\\s\\r\\n]*\\{[\\s\\r\\n]*\\[native\\scode\\][\\s\\r\\n]*\\}$`)).test(_toString(val))))
                _console.log(`${n} =`, val);
        }
        _console.warn('Strangers list end');
    }

    // Creates and return protected style (unless protection is manually disabled).
    // Protected style will re-add itself on removal and remaind enabled on attempt to disable it.
    function createStyle(rules, props, skip_protect) {
        props = props || {};
        props.type = 'text/css';

        function _protect(style) {
            if (skip_protect)
                return;

            Object.defineProperty(style, 'sheet', {
                value: null,
                enumerable: true
            });
            Object.defineProperty(style, 'disabled', {
                get: () => true, //pretend to be disabled
                set: () => undefined,
                enumerable: true
            });
            (new MutationObserver(
                (ms) => _removeChild(ms[0].target)
            )).observe(style, { childList: true });
        }


        function _create() {
            let style = _appendChild(_createElement('style'));
            Object.assign(style, props);

            function insertRules(rule) {
                if (rule.forEach)
                    rule.forEach(insertRules);
                else try {
                    style.sheet.insertRule(rule, 0);
                } catch (e) {
                    _console.error(e);
                }
            }

            insertRules(rules);
            _protect(style);

            return style;
        }

        let style = _create();
        if (skip_protect)
            return style;

        (new MutationObserver(
            function(ms) {
                let m, node;
                let createStyleInANewThread = resolve => setTimeout(
                    resolve => resolve(_create()),
                    0, resolve
                );
                let setStyle = st => void(style = st);
                for (m of ms) for (node of m.removedNodes)
                    if (node === style)
                        (new Promise(createStyleInANewThread))
                            .then(setStyle);
            }
        )).observe(_de, { childList: true });

        return style;
    }

    // Fake objects of advertisement networks to break their workflow
    // Popular adblock detector
    function deployFABStub(root) {
        let nt = new nullTools();
        if (!('fuckAdBlock' in root)) {
            let FuckAdBlock = function(options) {
                let self = this;
                self._options = {
                    checkOnLoad: false,
                    resetOnEnd: false,
                    checking: false
                };
                self.setOption = function(opt, val) {
                    if (val)
                        self._options[opt] = val;
                    else
                        Object.assign(self._options, opt);
                };
                if (options)
                    self.setOption(options);

                self._var = { event: {} };
                self.clearEvent = function() {
                    self._var.event.detected = [];
                    self._var.event.notDetected = [];
                };
                self.clearEvent();

                self.on = function(detected, fun) {
                    self._var.event[detected?'detected':'notDetected'].push(fun);
                    return self;
                };
                self.onDetected = function(cb) {
                    return self.on(true, cb);
                };
                self.onNotDetected = function(cb) {
                    return self.on(false, cb);
                };
                self.emitEvent = function() {
                    for (let fun of self._var.event.notDetected)
                        fun();
                    if (self._options.resetOnEnd)
                        self.clearEvent();
                    return self;
                };
                self._creatBait = () => null;
                self._destroyBait = () => null;
                self._checkBait = function() {
                    setTimeout((() => self.emitEvent()), 1);
                };
                self.check = function() {
                    self._checkBait();
                    return true;
                };

                let callback = function() {
                    if (self._options.checkOnLoad)
                        setTimeout(self.check, 1);
                };
                root.addEventListener('load', callback, false);
            };
            nt.define(root, 'FuckAdBlock', FuckAdBlock);
            nt.define(root, 'fuckAdBlock', new FuckAdBlock({
                checkOnLoad: true,
                resetOnEnd: true
            }));
        }
    }
    // new version of fAB adapting to fake API
    // scriptLander(() => deployFABStub(win), nullTools); // so it's disabled by default for now

    scriptLander(() => {
        let nt = new nullTools();

        // CoinHive miner stub. Continuous 100% CPU load can easily kill some CPU with overheat.
        if (!('CoinHive' in win))
            if (location.hostname !== 'cnhv.co') {
                // CoinHive stub for cases when it doesn't affect site functionality
                let CoinHiveConstructor = function() {
                    _console.warn('Fake CoinHive miner created.');
                    this.setThrottle = nt.func(null);
                    this.start = nt.func(null);
                    this.on = nt.func(null);
                    this.getHashesPerSecond = nt.func(Infinity);
                    this.getTotalHashes = nt.func(Infinity);
                    this.getAcceptedHashes = nt.func(Infinity);
                };
                let CoinHiveStub = nt.proxy({
                    Anonymous: CoinHiveConstructor,
                    User: CoinHiveConstructor,
                    Token: CoinHiveConstructor,
                    JobThread: nt.func(null),
                    Res: nt.func(null),
                    IF_EXCLUSIVE_TAB: false,
                    CONFIG: nt.proxy({})
                });
                nt.define(win, 'CoinHive', CoinHiveStub);
            } else {
                // CoinHive wrapper to fool sites which expect it to actually work and return results
                let CoinHiveObject;
                Object.defineProperty(win, 'CoinHive', {
                    set: function(obj) {
                        if ('Token' in obj) {
                            _console.log('[CoinHive] Token wrapper applied.');
                            let _Token = obj.Token.bind(obj);
                            obj.Token = function(siteKey, goal, params) {
                                let _goal = goal;
                                goal = goal > 256 ? 256 : goal;
                                _console.log(`[CoinHive] Original goal: ${_goal}, new smaller goal ${goal}.`);
                                _console.log(`With smaller goals server may return 'invalid_goal' error and stop working.`);
                                let miner = _Token(siteKey, goal, params);
                                miner.setThrottle(0.99);
                                miner.setThrottle = () => null;
                                let _start = miner.start.bind(miner);
                                miner.start = function() {
                                    let res = _start(window.CoinHive.FORCE_EXCLUSIVE_TAB);
                                    return res;
                                };
                                let _getTotalHashes = miner.getTotalHashes;
                                miner.getTotalHashes = function() {
                                    return Math.trunc(_getTotalHashes.call(this) / goal * _goal);
                                };
                                let __emit = miner._emit;
                                miner._emit = function(state, props) {
                                    let _self = this;
                                    _console.log('[CoinHive] state:', state, props);
                                    if (state === 'job')
                                        setTimeout(() => {
                                            _self.stop();
                                            _self._emit('accepted', { hashes: goal });
                                        }, 1000);
                                    return __emit.apply(_self, arguments);
                                };
                                let _on = miner.on.bind(miner);
                                miner.on = function(type, callback) {
                                    if (type === 'accepted') {
                                        _console.log('[CoinHive] "accepted" callback wrapper applied.');
                                        let _callback = callback;
                                        callback = function(params) {
                                            _console.log('[CoinHive] "accepted" callback is called, imitating original goal being reached.');
                                            params.hashes = _goal;
                                            return _callback.apply(this, arguments);
                                        };
                                        miner.stop();
                                    }
                                    return _on(type, callback);
                                };
                                return miner;
                            };
                        }
                        CoinHiveObject = obj;
                    },
                    get: () => CoinHiveObject
                });
            }

        // VideoJS player wrapper
        VideoJS: {
            let _videojs = win.videojs || void 0;
            Object.defineProperty(win, 'videojs', {
                get: () => _videojs,
                set: f => {
                    if (f === _videojs)
                        return true;
                    _console.log('videojs =', f);
                    _videojs = new Proxy(f, {
                        apply: (tgt, ths, args) => {
                            _console.log('videojs(', ...args, ')');
                            let params = args[1];
                            if (params) {
                                if (params.hasAd)
                                    params.hasAd = false;
                                if (params.autoplay)
                                    params.autoplay = false;
                                if (params.plugins && params.plugins.vastClient)
                                    delete params.plugins.vastClient;
                            }
                            let res = tgt.apply(ths, args);
                            if (res && res.seed)
                                res.seed = () => null;
                            _console.log('player = ', res);
                            return res;
                        }
                    });
                }
            });
        }

        // Set a little trap for BodyClick ads
        Object.defineProperty(win, '__BC_domain', {
            set: () => { throw 'BodyClick trap' }
        });

        // Yandex API (ADBTools, Metrika)
        let hostname = location.hostname;
        if (// Thank you, Greasemonkey, now I have to check for this. -_-
            location.protocol === 'about:' ||
            // Google likes to define odd global variables like Ya
            hostname.startsWith('google.') || hostname.includes('.google.') ||
            // Also, Yandex uses their Ya object for a lot of things on their pages and
            // wrapping it may cause problems. It's better to skip it in some cases.
            ((hostname.startsWith('yandex.') || hostname.includes('.yandex.')) &&
             /^\/((yand)?search|images)/i.test(location.pathname) && !hostname.startsWith('news.')) ||
            // Also skip on these following sites since they use
            // code minification which generated global Ya variable.
            hostname.endsWith('chatango.com') || hostname.endsWith('github.io') ||
            hostname.endsWith('grimtools.com') || hostname.endsWith('poeplanner.com'))
            return;

        let YaProps = new Set();
        function setObfuscatedProperty(Ya, rootProp, obj, name) {
            if (YaProps.has(rootProp))
                return;
            _console.warn(`Ya.${rootProp} = Ya.${name}`);
            nt.define(Ya, rootProp, Ya[name]);
            YaProps.add(rootProp);
            for (let prop in obj)
                delete obj[prop];
            for (let prop in Ya[name])
                obj[prop] = Ya[name][prop];
        }
        function onObfuscatedProperty (Ya, rootProp, obj) {
            if ('AdvManager' in obj || 'isAllowedRepeatAds' in obj) {
                setObfuscatedProperty(Ya, rootProp, obj, 'Context');
                return Ya.Context;
            }
            if ('create' in obj && 'createAdaptive' in obj && 'createScroll' in obj) {
                setObfuscatedProperty(Ya, rootProp, obj, 'adfoxCode');
                return Ya.adfoxCode;
            }
            return new Proxy(obj, {
                set: (tgt, prop, val) => {
                    if (prop === 'AdvManager' || prop === 'isAllowedRepeatAds') {
                        setObfuscatedProperty(Ya, rootProp, obj, 'Context');
                        return true;
                    }
                    if (prop === 'create' && 'createAdaptive' in obj && 'createScroll' in obj ||
                        prop === 'createScroll' && 'create' in obj && 'createAdaptive' in obj ||
                        prop === 'createAdaptive' && 'create' in obj && 'createScroll' in obj) {
                        setObfuscatedProperty(Ya, rootProp, obj, 'adfoxCode');
                        return true;
                    }
                    tgt[prop] = val;
                    return true;
                },
                get: (tgt, prop) => {
                    if (prop === 'AdvManager' && !(prop in tgt)) {
                        _console.warn(`Injected missing ${prop} in Ya.${rootProp}.`);
                        tgt[prop] = Ya.Context[prop];
                    }
                    return tgt[prop];
                }
            });
        }
        let Rum = {};
        [
            '__timeMarks', '_timeMarks', '__deltaMarks', '_deltaMarks',
            '__defRes', '_defRes', '__defTimes', '_defTimes', '_vars',
            'commonVars'
        ].forEach(name => void(Rum[name] = []));
        [
            'getSettings', 'getVarsList'
        ].forEach(name => void(Rum[name] = nt.func([], `Ya.Rum.${name}`)));
        [
            ['ajaxStart', 0], ['ajaxComplete', 0],
            ['enabled', true], ['_tti', null],
            ['vsChanged', false], ['vsStart', 'visible']
        ].forEach(([prop, val]) => void(Rum[prop] = val));
        Rum = nt.proxy(Rum, 'Ya.Rum', null);
        let Ya = new Proxy({}, {
            set: function(tgt, prop, val) {
                if (val === tgt[prop])
                    return true;
                if (prop === 'Rum') {
                    nt.define(tgt, prop, Rum);
                    YaProps.add(prop);
                    Object.assign(val, Rum);
                }
                if (YaProps.has(prop)) {
                    _console.log(`Ya.${prop} \u2260`, val);
                    return true;
                }
                if (val instanceof Object && prop !== '__inline_params__')
                    val = onObfuscatedProperty(Ya, prop, val);
                tgt[prop] = val;
                _console.log(`Ya.${prop} =`, val);
                return true;
            },
            get: (tgt, prop) => tgt[prop]
        });
        let callWithParams = function(f) {
            f.call(this, Ya.__inline_params__ || {});
            Ya.__inline_params__ = null;
        };
        nt.define(Ya, 'callWithParams', callWithParams);
        nt.define(Ya, 'PerfCounters', nt.proxy({
            __cacheEvents: []
        }, 'Ya.PerfCounters', null));
        nt.define(Ya, '__isSent', true);
        nt.define(Ya, 'confirmUrl', '');
        nt.define(Ya, 'Direct', nt.proxy({}, 'Ya.Direct', null));
        nt.define(Ya, 'mediaCode', nt.proxy({
            create: function() {
                if (inIFrame) {
                    _console.log('Removed body of ad-frame.');
                    _document.documentElement.removeChild(_document.body);
                }
            }
        }, 'Ya.mediaCode', null));
        let extra = nt.proxy({
            extra: nt.proxy({ match: 0, confirm: '', src: '' }),
            id: 0, percent: 100, threshold: 1
        });
        nt.define(Ya, '_exp', nt.proxy({
            id: 0, coin: 0,
            choose: nt.func(extra),
            get: (prop) => extra.hasOwnProperty(prop) ? extra[prop] : null,
            getId: nt.func(0),
            defaultVersion: extra,
            getExtra: nt.func(extra.extra),
            getDefaultExtra: nt.func(extra.extra),
            versions: [extra]
        }));
        nt.define(Ya, 'c', nt.func(null));
        nt.define(Ya, 'ADBTools', function(){
            this.getCurrentState = nt.func(true);
            return nt.proxy(this, 'Ya.ADBTools', null);
        });
        nt.define(Ya, 'AdDetector', nt.proxy({}, 'Ya.AdDetector', null));
        let definePr = o => {
            Object.defineProperty(o, 'pr', {
                get: () => Math.floor(Math.random() * 1e6) + 1,
                set: () => true
            });
        };
        let adfoxCode = {
            forcedDirectLoadingExp: nt.proxy({ isLoadingTurnedOn: false, isExp: false }),
            isLoadingTurnedOn: false,
            xhrExperiment: nt.proxy({ isXhr: true, isControl: true }),
            _: []
        };
        definePr(adfoxCode);
        [
            'clearSession', 'create', 'createAdaptive', 'createScroll',
            'destroy', 'moduleLoad', 'reload', 'setModule'
        ].forEach(name => void(adfoxCode[name] = nt.func(null, `Ya.adfoxCode.${name}`)));
        nt.define(Ya, 'adfoxCode', nt.proxy(adfoxCode, 'Ya.adfoxCode', null));
        let managerForAdfox = {
            loaderVersion: 1,
            isCurrrencyExp: true,
            isReady: nt.func(true, 'Ya.headerBidding.managerForAdfox.isReady'),
            getRequestTimeout: nt.func(300 + Math.floor(Math.random()*100), 'Ya.headerBidding.managerForAdfox.getRequestTimeout')
        };
        let headerBidding = nt.proxy({
            setSettings: opts => {
                if (!(opts && opts.adUnits))
                    return null;
                let ids = [];
                for (let unit of opts.adUnits)
                    ids.push(unit.code);
                createStyle(`#${ids.join(', #')} { display: none !important }`);
            },
            pushAdUnits: nt.func(null, 'Ya.headerBidding.pushAdUnits'),
            managerForAdfox: nt.proxy(managerForAdfox, 'Ya.headerBidding.managerForAdfox', null)
        });
        definePr(headerBidding);
        nt.define(Ya, 'headerBidding', headerBidding);

        let AdvManager = function() {
            this.render = function(o) {
                if (!o.renderTo)
                    return;
                let placeholder = _document.getElementById(o.renderTo);
                if (!placeholder)
                    return _console.warn('Ya.AdvManager.render call w/o placeholder', o);
                let parent = placeholder.parentNode;
                placeholder.style = 'display:none!important';
                parent.style = (parent.getAttribute('style')||'') + 'height:auto!important';
                // fix for Yandex TV pages
                if (location.hostname.startsWith('tv.yandex.')) {
                    let sibling = placeholder.previousSibling;
                    if (sibling && sibling.classList && sibling.classList.contains('tv-spin'))
                        sibling.style.display = 'none';
                }
            };
            this.constructor = Object;
            return nt.proxy(this, 'Ya.AdvManager', null);
        };
        let _Ya_Context_undefined_count = {};
        nt.define(Ya, 'Context', new Proxy({
            __longExperiment: null,
            _callbacks: nt.proxy([]),
            _asyncModeOn: true,
            _init: nt.func(null),
            _load_callbacks: nt.proxy([]),
            processCallbacks: nt.func(null),
            isAllowedRepeatAds: nt.func(null),
            isNewLoader: nt.func(false),
            AdvManager: new AdvManager(),
            AdvManagerStatic: nt.func({})
        }, {
            get: (ctx, prop) => {
                if (prop in ctx)
                    return ctx[prop];
                if (prop in _Ya_Context_undefined_count)
                    _Ya_Context_undefined_count[prop]++;
                else {
                    _Ya_Context_undefined_count[prop] = 1;
                    _console.warn(`Mising '${prop}' in Ya.Context`);
                }
                if (_Ya_Context_undefined_count[prop] >= 5) {
                    _console.warn(`Ya.Context.${prop} = Ya.Context.AdvManager`);
                    ctx[prop] = ctx.AdvManager;
                }
            },
            set: () => true
        }));
        let Metrika = function Metrika(x) {
            this._ecommerce = '';
            if (x && 'id' in x)
                this.id = x.id;
            else
                this.id = 0;
            return nt.proxy(this, 'Ya.Metrika', null);
        };
        Metrika.counters = () => Ya._metrika.counters;
        nt.define(Ya, 'Metrika', Metrika);
        nt.define(Ya, 'Metrika2', Metrika);
        let counter = new Ya.Metrika();
        nt.define(Ya, '_metrika', nt.proxy({
            counter: counter,
            counters: [counter],
            hitParam: {},
            counterNum: 0,
            hitId: 0,
            v: 1,
            i: 0,
            _globalMetrikaHitId: 0,
            getCounters: null,
            dataLayer: null,
            f1: null
        }));
        nt.define(Ya, '_globalMetrikaHitId', 0);
        counter = {};
        [
            'stringifyParams','_getVars',
            'getUid','getUrl','getHash'
        ].forEach(name => void(counter[name] = nt.func('', `Ya.counter.${name}`)));
        nt.define(Ya, 'counter', nt.proxy(counter, 'Ya.counter', null));
        nt.define(Ya, 'jserrors', []);
        nt.define(Ya, 'onerror', nt.func(null, 'Ya.onerror'));
        let error_on_access = false;
        if ('Ya' in win)
            try {
                _console.log('Found existing Ya object:', win.Ya);
                for (let prop in win.Ya)
                    Ya[prop] = win.Ya[prop];
            } catch(ignore) {
                error_on_access = true;
            }
        if (!error_on_access && // some people don't know how to export only necessary stuff into global context
            location.hostname !== 'material.io') { // so, here is an exception for one of such cases
            for (let prop in Ya)
                if (prop !== '__inline_params__')
                    YaProps.add(prop);
            nt.define(win, 'Ya', Ya);
        } else
            _console.log('Looks like window.Ya blocked with error-on-access scriptlet.');
        // Yandex.Metrika callbacks
        let yandex_metrika_callbacks = [];
        _document.addEventListener(
            'DOMContentLoaded', () => {
                yandex_metrika_callbacks.forEach((f) => f && f.call(window));
                yandex_metrika_callbacks.length = 0;
                yandex_metrika_callbacks.push = (f) => setTimeout(f, 0);
            }, false
        );
        nt.define(win, 'yandex_metrika_callbacks', yandex_metrika_callbacks);
    }, nullTools, createStyle);

    if (!isFirefox) {
        // scripts for non-Firefox browsers
        // https://greasyfork.org/scripts/14720-it-s-not-important
        unimptt: {
            // BigInt were implemented in Chrome 67 which also support
            // proper user styles and doesn't need this fix anymore.
            if ((isChrome || isOpera) && 'BigInt' in win)
                break unimptt;

            let imptt = /((display|(margin|padding)(-top|-bottom)?)\s*:[^;!]*)!\s*important/ig,
                ret_b = (a,b) => b,
                _toLowerCase = String.prototype.toLowerCase,
                protectedNodes = new WeakSet(),
                log = false;

            let logger = function() {
                if (log)
                    _console.log('Some page elements became a bit less important.');
                log = false;
            };

            let unimportanter = function(node) {
                let style = (node.nodeType === _Node.ELEMENT_NODE) ?
                    _getAttribute(node, 'style') : null;

                if (!style || !imptt.test(style) || node.style.display === 'none' ||
                    (node.src && node.src.startsWith('chrome-extension:'))) // Web of Trust IFRAME and similar
                    return false; // get out if we have nothing to do here

                protectedNodes.add(node);
                _setAttribute(node, 'style', style.replace(imptt, ret_b));
                log = true;
            };

            (new MutationObserver(
                function(mutations) {
                    setTimeout(
                        function(ms) {
                            let m, node;
                            for (m of ms) for (node of m.addedNodes)
                                unimportanter(node);
                            logger();
                        }, 0, mutations
                    );
                }
            )).observe(_document, {
                childList : true,
                subtree : true
            });

            _Element.setAttribute = function setAttribute(name, value) {
                '[native code]';
                let replaced = value;
                if (name && _toLowerCase.call(name) === 'style' && protectedNodes.has(this))
                    replaced = value.replace(imptt, ret_b);
                log = (replaced !== value);
                logger();
                return _setAttribute(this, ...arguments);
            };

            win.addEventListener (
                'load', () => {
                    for (let imp of _document.querySelectorAll('[style*="!"]'))
                        unimportanter(imp);
                    logger();
                }, false
            );
        }

        // Naive ABP Style protector
        if ('ShadowRoot' in win) {
            let _removeChild = Function.prototype.call.bind(_Node.removeChild);
            let _appendChild = Function.prototype.call.bind(_Node.appendChild);
            let createShadow = () => _createElement('shadow');
            // Prevent adding fake content entry point
            _Node.appendChild = function appendChild(child) {
                if (this instanceof ShadowRoot &&
                    child instanceof HTMLContentElement)
                    return _appendChild(this, createShadow());
                return _appendChild(this, ...arguments);
            };
            {
                let _shadowSelector = Function.prototype.call.bind(ShadowRoot.prototype.querySelector);
                let _innerHTML = Object.getOwnPropertyDescriptor(ShadowRoot.prototype, 'innerHTML');
                let _parentNode = Object.getOwnPropertyDescriptor(_Node, 'parentNode');
                if (_innerHTML && _parentNode) {
                    let _set = Function.prototype.call.bind(_innerHTML.set);
                    let _getParent = Function.prototype.call.bind(_parentNode.get);
                    _innerHTML.configurable = false;
                    _innerHTML.set = function() {
                        _set(this, ...arguments);
                        let content = _shadowSelector(this, 'content');
                        if (content) {
                            let parent = _getParent(content);
                            _removeChild(parent, content);
                            _appendChild(parent, createShadow());
                        }
                    };
                }
                Object.defineProperty(ShadowRoot.prototype, 'innerHTML', _innerHTML);
            }
            // Locate and apply extra protection to a style on top of what ABP does
            let style;
            (new Promise(
                function(resolve, reject) {
                    let getStyle = () => _querySelector('::shadow style');
                    style = getStyle();
                    if (style)
                        return resolve(style);
                    let intv = setInterval(
                        function() {
                            style = getStyle();
                            if (!style)
                                return;
                            intv = clearInterval(intv);
                            return resolve(style);
                        }, 0
                    );
                    _document.addEventListener(
                        'DOMContentLoaded', () => {
                            if (intv)
                                clearInterval(intv);
                            style = getStyle();
                            return style ? resolve(style) : reject();
                        }, false
                    );
                }
            )).then(
                function(style) {
                    let emptyArr = [],
                        nullStr = {
                            get: () => '',
                            set: () => undefined
                        };
                    let shadow = style.parentNode;
                    Object.defineProperties(shadow, {
                        childElementCount: { value: 0 },
                        styleSheets: { value: emptyArr },
                        firstChild: { value: null },
                        firstElementChild: { value: null },
                        lastChild: { value: null },
                        lastElementChild: { value: null },
                        childNodes: { value: emptyArr },
                        children: { value: emptyArr },
                        innerHTML: { value: nullStr },
                    });
                    Object.defineProperties(style, {
                        innerHTML: { value: nullStr },
                        textContent: { value: nullStr },
                        ownerDocument: { value: null },
                        parentNode: {value: null },
                        previousElementSibling: { value: null },
                        previousSibling: { value: null },
                        disabled: { get: () => true, set: () => null }
                    });
                    Object.defineProperties(style.sheet, {
                        deleteRule: { value: () => null },
                        disabled: { get: () => true, set: () => null },
                        cssRules: { value: emptyArr },
                        rules: { value: emptyArr }
                    });
                }
            ).catch(()=>null);
            _Node.removeChild = function removeChild(child) {
                if (child === style)
                    return;
                return _removeChild(this, ...arguments);
            };
        }
    }

    if (/^https?:\/\/(mail\.yandex\.|music\.yandex\.|news\.yandex\.|(www\.)?yandex\.[^/]+\/(yand)?search[/?])/i.test(win.location.href) ||
        /^https?:\/\/tv\.yandex\./i.test(win.location.href)) {
        // https://greasyfork.org/en/scripts/809-no-yandex-ads
        let yadWord = /Яндекс.Директ/i,
            adWords = /Реклама|Ad/i;
        let _querySelector = _document.querySelector.bind(_document),
            _querySelectorAll = _document.querySelectorAll.bind(_document),
            _getAttribute = Function.prototype.call.bind(_Element.getAttribute),
            _setAttribute = Function.prototype.call.bind(_Element.setAttribute);
        // Function to attach an observer to monitor dynamic changes on the page
        let pageUpdateObserver = (func, obj, params) => {
            if (obj)
                (new MutationObserver(func))
                    .observe(obj, (params || { childList:true, subtree:true }));
        };
        // Short name for parentNode.removeChild and setAttribute style to display:none
        let remove = (node) => {
            if (!node || !node.parentNode)
                return false;
            _console.log('Removed node.');
            node.parentNode.removeChild(node);
        };
        let hide = (node) => {
            if (!node)
                return false;
            _console.log('Hid node.');
            _setAttribute(node, 'style', 'display:none!important');
        };
        // Yandex search ads in Google Chrome
        if ('attachShadow' in _Element) {
            let _attachShadow = _Element.attachShadow;
            _Element.attachShadow = function() {
                let node = this,
                    root = _attachShadow.apply(node, arguments);
                pageUpdateObserver(
                    (ms) => {
                        for (let m of ms) if (m.addedNodes.length)
                            if (adWords.test(root.textContent))
                                remove(node.closest('.serp-item'));
                    }, root
                );
                return root;
            };
        }
        // Yandex Mail ads
        if (location.hostname.startsWith('mail.')) {
            let nt = new nullTools();
            let wrap = vl => {
                if (!vl)
                    return vl;
                _console.log('Daria =', vl);
                nt.define(vl, 'AdBlock', nt.proxy({
                    detect: nt.func(new Promise(() => null), 'Daria.AdBlock.detect'),
                    enabled: false
                }));
                nt.define(vl, 'AdvPresenter', nt.proxy({
                    _config: nt.proxy({
                        banner: false,
                        done: false,
                        line: true
                    })
                }));
                if (vl.Config) {
                    delete vl.Config.adBlockDetector;
                    delete vl.Config['adv-url'];
                    delete vl.Config.cryprox;
                    if (vl.Config.features) {
                        delete vl.Config.features.web_adloader_with_cookie_cache;
                        delete vl.Config.features.web_ads;
                        delete vl.Config.features.web_ads_mute;
                    }
                    vl.Config.mayHaveAdv = false;
                }
                return vl;
            };
            let _Daria = wrap(win.Daria);
            if (_Daria)
                _console.log('Wrapped already existing object "Daria".');
            Object.defineProperty(win, 'Daria', {
                get: () => _Daria,
                set: vl => {
                    if (vl === _Daria)
                        return;
                    _Daria = wrap(vl);
                }
            });
        }
        // prevent/defuse adblock detector
        setInterval(() => {
            localStorage.ic = '';
            localStorage._mt__data = '';
        }, 100);
        let yp_keepCookieParts = /\.(sp|ygo|ygu)\./; // ygo = city id; ygu = detect city automatically
        let _doc_proto = ('cookie' in _Document) ? _Document : Object.getPrototypeOf(_document);
        let _cookie = Object.getOwnPropertyDescriptor(_doc_proto, 'cookie');
        if (_cookie) {
            let _set_cookie = Function.prototype.call.bind(_cookie.set);
            _cookie.set = function(value) {
                if (/^(mda=|yp=|ys=|yabs-|__|bltsr=)/.test(value))
                    // remove value, set expired
                    if (!value.startsWith('yp=')) {
                        value = value.replace(/^([^=]+=)[^;]+/,'$1').replace(/(expires=)[\w\s\d,]+/,'$1Thu, 01 Jan 1970 00');
                        _console.log('expire cookie', value.match(/^[^=]+/)[0]);
                    } else {
                        let parts = value.split(';');
                        let values = parts[0].split('#').filter(part => yp_keepCookieParts.test(part));
                        if (values.length)
                            values[0] = values[0].replace(/^yp=/, '');
                        let res = `yp=${values.join('#')}`;
                        _console.log(`set cookie ${res}, dropped ${parts[0].replace(res,'')}`);
                        parts[0] = res;
                        value = parts.join(';');
                    }
                return _set_cookie(this, value);
            };
            Object.defineProperty(_doc_proto, 'cookie', _cookie);
        }
        // other ads
        _document.addEventListener(
            'DOMContentLoaded', () => {

                {
                    // Generic ads removal and fixes
                    let node = _querySelector('.serp-header');
                    if (node)
                        node.style.marginTop = '0';
                    for (node of _querySelectorAll(
                        '.serp-adv__head + .serp-item,'+
                        '#adbanner,'+
                        '.serp-adv,'+
                        '.b-spec-adv,'+
                        'div[class*="serp-adv__"]:not(.serp-adv__found):not(.serp-adv__displayed)'
                    )) remove(node);
                }
                // Search ads
                function removeSearchAds() {
                    for (let node of _querySelectorAll('.serp-item'))
                        if (_getAttribute(node, 'role') === 'complementary' ||
                            adWords.test((node.querySelector('.label')||{}).textContent))
                            hide(node);
                }
                // News ads
                function removeNewsAds() {
                    let node, block, items, mask, classes,
                        masks = [
                            { class: '.ads__wrapper', regex: /[^,]*?,[^,]*?\.ads__wrapper/ },
                            { class: '.ads__pool', regex: /[^,]*?,[^,]*?\.ads__pool/ }
                        ];
                    for (node of _querySelectorAll('style[nonce]')) {
                        classes = node.innerText.replace(/\{[^}]+\}+/ig, '|').split('|');
                        for (block of classes) for (mask of masks)
                            if (block.includes(mask.class)) {
                                block = block.match(mask.regex)[0];
                                items = _querySelectorAll(block);
                                for (item of items)
                                    remove(items[0]);
                            }
                    }
                }
                // Music ads
                function removeMusicAds() {
                    for (let node of _querySelectorAll('.ads-block'))
                        remove(node);
                }
                // News fixes
                function removePageAdsClass() {
                    if (_document.body.classList.contains("b-page_ads_yes")) {
                        _document.body.classList.remove("b-page_ads_yes");
                        _console.log('Page ads class removed.');
                    }
                }
                // TV fixes
                function removeTVAds() {
                    for (let node of _querySelectorAll('div[class^="_"][data-reactid] > div'))
                        if (yadWord.test(node.textContent) || node.querySelector('iframe:not([src])')) {
                            if (node.offsetWidth) {
                                let pad = _document.createElement('div');
                                _setAttribute(pad, 'style', `width:${node.offsetWidth}px`);
                                node.parentNode.appendChild(pad);
                            }
                            remove(node);
                        }
                }

                if (location.hostname.startsWith('music.')) {
                    pageUpdateObserver(removeMusicAds, _querySelector('.sidebar'));
                    removeMusicAds();
                } else if (location.hostname.startsWith('news.')) {
                    pageUpdateObserver(removeNewsAds, _document.body);
                    pageUpdateObserver(removePageAdsClass, _document.body, { attributes:true, attributesFilter:['class'] });
                    removeNewsAds();
                    removePageAdsClass();
                } else if (location.hostname.startsWith('tv.')) {
                    pageUpdateObserver(removeTVAds, _document.body);
                    removeTVAds();
                } else if (!location.hostname.startsWith('mail.')) {
                    pageUpdateObserver(removeSearchAds, _querySelector('.main__content'));
                    removeSearchAds();
                }
            }
        );
    }

    // Yandex Raven stub (some monitoring sub-system)
    function yandexRavenStub() {
        let nt = new nullTools();
        nt.define(win, 'Raven', nt.proxy({
            context: f => f(),
            config: nt.func(nt.proxy({
                install: nt.func(null, 'Raven.config().install()')
            }, 'Raven.config()', null), 'Raven.config')
        }, 'Raven', null));
    }

    // Generic Yandex Scripts
    if (/^https?:\/\/([^.]+\.)*yandex\.[^/]+/i.test(win.location.href)) {
        // remove banner on the start page
        selectiveCookies();
        scriptLander(() => {
            let nt = new nullTools({log: false, trace: true});
            let AwapsJsonAPI_Json = function(...args) {
                _console.log('>> new AwapsJsonAPI.Json(', ...args, ')');
            };
            [
                'setID', 'addImageContent', 'sendCounts',
                'drawBanner', 'bannerIsInvisible', 'expand', 'refreshAd'
            ].forEach(name => void(AwapsJsonAPI_Json.prototype[name] = nt.func(null, `AwapsJsonAPI.Json.${name}`)));
            AwapsJsonAPI_Json.prototype.checkBannerVisibility = nt.func(true, 'AwapsJsonAPI.Json.checkBannerVisibility');
            AwapsJsonAPI_Json.prototype.addIframeContent = nt.proxy(function(...args) {
                try {
                    let frame = args[1][0].parentNode;
                    frame.parentNode.removeChild(frame);
                    _console.log(`Removed banner placeholder.`);
                } catch(ignore) {
                    _console.log(`Can't locate frame object to remove.`);
                }
            });
            AwapsJsonAPI_Json.prototype.getHTML = nt.func('', 'AwapsJsonAPI.Json.getHTML');
            AwapsJsonAPI_Json.prototype = nt.proxy(AwapsJsonAPI_Json.prototype);
            AwapsJsonAPI_Json = nt.proxy(AwapsJsonAPI_Json);
            if ('AwapsJsonAPI' in win) {
                _console.log('Oops! AwapsJsonAPI already defined.');
                let f = win.AwapsJsonAPI.Json;
                win.AwapsJsonAPI.Json = AwapsJsonAPI_Json;
                if (f && f.prototype)
                    f.prototype = AwapsJsonAPI_Json.prototype;
            } else
                nt.define(win, 'AwapsJsonAPI', nt.proxy({
                    Json: AwapsJsonAPI_Json
                }));

            let parseExport = x => {
                if (!x)
                    return x;
                // remove banner placeholder
                if (x.banner && x.banner.cls) {
                    let _parent = `.${x.banner.cls.banner__parent}`;
                    _document.addEventListener('DOMContentLoaded', () => {
                        for (let banner of _document.querySelectorAll(_parent)) {
                            _setAttribute(banner, 'style', 'display:none!important');
                            _console.log('Hid banner placeholder.');
                        }
                    }, false);
                }

                // remove banner data and some other stuff
                delete x.banner;
                delete x.consistency;
                delete x['i-bannerid'];
                delete x['i-counter'];
                delete x['promo-curtain'];

                // remove parts of ga-counter (complete removal break "ТВ Онлайн")
                if (x['ga-counter'] && x['ga-counter'].data) {
                    x['ga-counter'].data.id = 0;
                    delete x['ga-counter'].data.ether;
                    delete x['ga-counter'].data.iframeSrc;
                    delete x['ga-counter'].data.iframeSrcEx;
                }

                return x;
            };
            // Yandex banner on main page and some other things
            let _home = win.home,
                _home_set = !!_home;
            Object.defineProperty(win, 'home', {
                get: () => _home,
                set: vl => {
                    if (!_home_set && vl === _home)
                        return;
                    _home_set = false;
                    _console.log('home =', vl);
                    let _home_export = parseExport(vl.export);
                    Object.defineProperty(vl, 'export', {
                        get: () => _home_export,
                        set: vl => {
                            _home_export = parseExport(vl);
                        }
                    });
                    _home = vl;
                }
            });
            // adblock circumvention on some Yandex domains (weather in particular)
            yandexRavenStub();
        }, nullTools, selectiveCookies, yandexRavenStub, 'let _setAttribute = Function.prototype.call.bind(_Element.setAttribute)');

        if ('attachShadow' in _Element) {
            let fakeRoot = () => ({
                firstChild: null,
                appendChild: () => null,
                querySelector: () => null,
                querySelectorAll: () => null
            });
            _Element.createShadowRoot = fakeRoot;
            let shadows = new WeakMap();
            let _attachShadow = Object.getOwnPropertyDescriptor(_Element, 'attachShadow');
            _attachShadow.value = function() {
                return shadows.set(this, fakeRoot()).get(this);
            };
            Object.defineProperty(_Element, 'attachShadow', _attachShadow);
            let _shadowRoot = Object.getOwnPropertyDescriptor(_Element, 'shadowRoot');
            _shadowRoot.set = () => null;
            _shadowRoot.get = function() {
                return shadows.has(this) ? shadows.get(this) : void 0;
            };
            Object.defineProperty(_Element, 'shadowRoot', _shadowRoot);
        }

        // Disable banner styleSheet (on main page)
        document.addEventListener('DOMContentLoaded', () => {
            for (let sheet of document.styleSheets)
                try {
                    for (let rule of sheet.cssRules)
                        if (rule.cssText.includes(' 728px 90px')) {
                            rule.parentStyleSheet.disabled = true;
                            _console.log('Disabled banner styleSheet:', rule.parentStyleSheet);
                        }
                } catch(ignore) {}
        }, false);

        // Partially based on https://greasyfork.org/en/scripts/22737-remove-yandex-redirect
        let selectors = (
            'A[onmousedown*="/jsredir"],'+
            'A[data-vdir-href],'+
            'A[data-counter]'
        );
        let removeTrackingAttributes = function(link) {
            link.removeAttribute('onmousedown');
            if (link.hasAttribute('data-vdir-href')) {
                link.removeAttribute('data-vdir-href');
                link.removeAttribute('data-orig-href');
            }
            if (link.hasAttribute('data-counter')) {
                link.removeAttribute('data-counter');
                link.removeAttribute('data-bem');
            }
        };
        let removeTracking = function(scope) {
            if (scope instanceof Element)
                for (let link of scope.querySelectorAll(selectors))
                    removeTrackingAttributes(link);
        };
        _document.addEventListener('DOMContentLoaded', (e) => removeTracking(e.target));
        (new MutationObserver(
            function(ms) {
                let m, node;
                for (m of ms) for (node of m.addedNodes)
                    if (node instanceof HTMLAnchorElement && node.matches(selectors))
                        removeTrackingAttributes(node);
                    else
                        removeTracking(node);
            }
        )).observe(_de, { childList: true, subtree: true });
    }

    // https://greasyfork.org/en/scripts/21937-moonwalk-hdgo-kodik-fix v0.8 (adapted)
    _document.addEventListener(
        'DOMContentLoaded', function() {
            let log = name => _console.log(`Player FIX: Detected ${name} player in ${location.href}`);
            function removeVast (data) {
                if (data && typeof data === 'object') {
                    let keys = Object.getOwnPropertyNames(data);
                    let isVast = name => /vast|clickunder/.test(name);
                    if (!keys.some(isVast))
                        return data;
                    for (let key of keys)
                        if (typeof data[key] === 'object' && key !== 'links') {
                            _console.log(`Removed data.${key}`, data[key]);
                            delete data[key];
                        }
                    if (data.chain) {
                        let need = [],
                            drop = [],
                            links = data.chain.split('.');
                        for (let link of links)
                            if (!isVast(link))
                                need.push(link);
                            else
                                drop.push(link);
                        _console.log('Dropped from the chain:', ...drop);
                        data.chain = need.join('.');
                    }
                }
                return data;
            }

            if ('video_balancer_options' in win && 'event_callback' in win) {
                log('Moonwalk');
                if (video_balancer_options.adv)
                    removeVast(video_balancer_options.adv);
                if ('_mw_adb' in win)
                    Object.defineProperty(win, '_mw_adb', {
                        get: () => false,
                        set: () => true
                    });
            } else if (win.startKodikPlayer !== void 0) {
                log('Kodik');
                // skip attempt to block access to HD resolutions
                let chainCall = new Proxy({}, { get: () => () => chainCall });
                if ($ && $.prototype && $.prototype.addClass) {
                    let $addClass = $.prototype.addClass;
                    $.prototype.addClass = function (className) {
                        if (className === 'blocked')
                            return chainCall;
                        return $addClass.apply(this, arguments);
                    };
                }
                // remove ad links from the metadata
                let _ajax = win.$.ajax;
                win.$.ajax = (params, ...args) => {
                    if (params.success) {
                        let _s = params.success;
                        params.success = (data, ...args) => _s(removeVast(data), ...args);
                    }
                    return _ajax(params, ...args);
                }
            } else if (win.getnextepisode && win.uppodEvent) {
                log('Share-Serials.net');
                scriptLander(
                    function() {
                        let _setInterval = win.setInterval,
                            _setTimeout = win.setTimeout,
                            _toString = Function.prototype.call.bind(Function.prototype.toString);
                        win.setInterval = function(func) {
                            if (func instanceof Function && _toString(func).includes('_delay')) {
                                let intv = _setInterval.call(
                                    this, function() {
                                        _setTimeout.call(
                                            this, function(intv) {
                                                clearInterval(intv);
                                                let timer = _document.querySelector('#timer');
                                                if (timer)
                                                    timer.click();
                                            }, 100, intv);
                                        func.call(this);
                                    }, 5
                                );

                                return intv;
                            }
                            return _setInterval.apply(this, arguments);
                        };
                        win.setTimeout = function(func) {
                            if (func instanceof Function && _toString(func).includes('adv_showed'))
                                return _setTimeout.call(this, func, 0);
                            return _setTimeout.apply(this, arguments);
                        };
                    }
                );
            } else if ('ADC' in win) {
                log('vjs-creatives plugin in');
                let replacer = (obj) => {
                    for (let name in obj)
                        if (obj[name] instanceof Function)
                            obj[name] = () => null;
                };
                replacer(win.ADC);
                replacer(win.currentAdSlot);
            }
            UberVK: {
                if (!inIFrame)
                    break UberVK;
                let oddNames = 'HD' in win &&
                    !Object.getOwnPropertyNames(win).every(n => !n.startsWith('_0x'));
                if (!oddNames)
                    break UberVK;
                log('UberVK');
                XMLHttpRequest.prototype.open = () => {
                    throw 404;
                };
            }
        }, false
    );

    // Applies wrapper function on the current page and all newly created same-origin iframes
    // This is used to prevent trick which allows to get fresh page API through newly created same-origin iframes
    function deepWrapAPI(wrapper) {
        let wrapped = new WeakSet(),
            _get_contentWindow = () => null,
            log = (...args) => false && _console.log(...args);
        let wrapAPI = root => {
            if (!root || wrapped.has(root))
                return;
            wrapped.add(root);
            try {
                wrapper(root instanceof HTMLIFrameElement ? _get_contentWindow(root) : root);
                log('Wrapped API in', (root === win) ? "main window." : root);
            } catch(e) {
                log('Failed to wrap API in', (root === win) ? "main window." : root, '\n', e);
            }
        };

        // wrap API on contentWindow access
        let _apply = Function.prototype.apply;
        let _contentWindow = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'contentWindow');
        _get_contentWindow = _apply.bind(_contentWindow.get);
        _contentWindow.get = function() {
            wrapAPI(this);
            return _get_contentWindow(this);;
        };
        Object.defineProperty(HTMLIFrameElement.prototype, 'contentWindow', _contentWindow);

        // wrap API on contentDocument access
        let _contentDocument = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'contentDocument');
        let _get_contentDocument = _apply.bind(_contentDocument.get);
        _contentDocument.get = function() {
            wrapAPI(this);
            return _get_contentDocument(this);
        };
        Object.defineProperty(HTMLIFrameElement.prototype, 'contentDocument', _contentDocument);

        // manual children objects traverser to avoid issues
        // with calling querySelectorAll on wrong types of objects
        let _nodeType = _apply.bind(Object.getOwnPropertyDescriptor(_Node, 'nodeType').get);
        let _childNodes = _apply.bind(Object.getOwnPropertyDescriptor(_Node, 'childNodes').get);
        let _ELEMENT_NODE = _Node.ELEMENT_NODE;
        let _DOCUMENT_FRAGMENT_NODE = _Node.DOCUMENT_FRAGMENT_NODE
        let wrapFrames = root => {
            if (_nodeType(root) !== _ELEMENT_NODE && _nodeType(root) !== _DOCUMENT_FRAGMENT_NODE)
                return; // only process nodes which may contain an IFRAME or be one
            if (root instanceof HTMLIFrameElement) {
                wrapAPI(root);
                return;
            }
            for (let child of _childNodes(root))
                wrapFrames(child);
        };

        // wrap API in a newly appended iframe objects
        let _appendChild = _apply.bind(Node.prototype.appendChild);
        Node.prototype.appendChild = function appendChild() {
            '[native code]';
            let res = _appendChild(this, arguments);
            wrapFrames(arguments[0]);
            return res;
        };

        // wrap API in iframe objects created with innerHTML of element on page
        let _innerHTML = Object.getOwnPropertyDescriptor(_Element, 'innerHTML');
        let _set_innerHTML = _apply.bind(_innerHTML.set);
        _innerHTML.set = function() {
            _set_innerHTML(this, arguments);
            if (_document.contains(this))
                wrapFrames(this);
        };
        Object.defineProperty(_Element, 'innerHTML', _innerHTML);

        wrapAPI(win);
    }

    // piguiqproxy.com / zmctrack.net circumvention and onerror callback prevention
    scriptLander(
        () => {
            // onerror callback blacklist
            let masks = [],
                //blockAll = /(^|\.)(rutracker-org\.appspot\.com)$/,
                isBlocked = url => masks.some(mask => mask.test(url));// || blockAll.test(location.hostname);
            for (let filter of [// blacklist
                // global
                '/adv/www/',
                // adservers
                '||185.87.50.147^',
                '||10root25.website^', '||24video.xxx^',
                '||adlabs.ru^', '||adspayformymortgage.win^', '||amgload.net^', '||aviabay.ru^',
                '||bgrndi.com^', '||brokeloy.com^',
                '||cdnjs-aws.ru^','||cnamerutor.ru^',
                '||directadvert.ru^', '||dsn-fishki.ru^', '||docfilms.info^', '||dreadfula.ru^',
                '||et-cod.com^', '||et-code.ru^', '||etcodes.com^',
                '||franecki.net^', '||film-doma.ru^',
                '||free-torrent.org^', '||free-torrent.pw^',
                '||free-torrents.org^', '||free-torrents.pw^',
                '||game-torrent.info^', '||gocdn.ru^',
                '||hdkinoshka.com^', '||hghit.com^', '||hindcine.net^',
                '||kinotochka.net^', '||kinott.com^', '||kinott.ru^',
                '||klcheck.com^', '||kuveres.com^',
                '||lepubs.com^', '||luxadv.com^', '||luxup.ru^', '||luxupcdna.com^',
                '||marketgid.com^', '||mebablo.com^', '||mixadvert.com^', '||mxtads.com^',
                '||nickhel.com^',
                '||oconner.biz^', '||oconner.link^', '||octoclick.net^', '||octozoon.org^',
                '||pigiuqproxy.com^', '||piguiqproxy.com^', '||pkpojhc.com^',
                '||psma01.com^', '||psma02.com^', '||psma03.com^',
                '||rcdn.pro^', '||recreativ.ru^', '||redtram.com^', '||regpole.com^',
                '||rootmedia.ws^', '||ruttwind.com^', '||rutvind.com^',
                '||skidl.ru^', '||smi2.net^', '||smcheck.org^',
                '||torvind.com^', '||traffic-media.co^', '||trafmag.com^', '||trustjs.net^', '||ttarget.ru^',
                '||u-dot-id-adtool.appspot.com^', '||utarget.ru^',
                '||webadvert-gid.ru^', '||webadvertgid.ru^',
                '||xxuhter.ru^',
                '||yuiout.online^',
                '||zmctrack.net^', '||zoom-film.ru^'])
                masks.push(new RegExp(
                    filter.replace(/([\\/[\].+?(){}$])/g, '\\$1')
                    .replace(/\*/g, '.*?')
                    .replace(/\^(?!$)/g,'\\.?[^\\w%._-]')
                    .replace(/\^$/,'\\.?([^\\w%._-]|$)')
                    .replace(/^\|\|/,'^(ws|http)s?:\\/+([^/.]+\\.)*?'),
                    'i'));
            // main script
            deepWrapAPI(root => {
                let _call = root.Function.prototype.call,
                    _defineProperty = root.Object.defineProperty,
                    _getOwnPropertyDescriptor = root.Object.getOwnPropertyDescriptor;
                onerror: {
                    // 'onerror' handler for scripts from blacklisted sources
                    let scriptMap = new WeakMap();
                    let _Reflect_apply = root.Reflect.apply,
                        _HTMLScriptElement = root.HTMLScriptElement,
                        _HTMLImageElement = root.HTMLImageElement;
                    let _get_tagName = _call.bind(_getOwnPropertyDescriptor(root.Element.prototype, 'tagName').get),
                        _get_scr_src = _call.bind(_getOwnPropertyDescriptor(_HTMLScriptElement.prototype, 'src').get),
                        _get_img_src = _call.bind(_getOwnPropertyDescriptor(_HTMLImageElement.prototype, 'src').get);
                    let _get_src = node => {
                        if (node instanceof _HTMLScriptElement)
                            return _get_scr_src(node);
                        if (node instanceof _HTMLImageElement)
                            return _get_img_src(node);
                        return void 0
                    };
                    let _onerror = _getOwnPropertyDescriptor(root.HTMLElement.prototype, 'onerror'),
                        _set_onerror = _call.bind(_onerror.set);
                    _onerror.get = function() {
                        return scriptMap.get(this) || null;
                    };
                    _onerror.set = function(callback) {
                        if (typeof callback !== 'function') {
                            scriptMap.delete(this);
                            _set_onerror(this, callback);
                            return;
                        }
                        scriptMap.set(this, callback);
                        _set_onerror(this, function() {
                            let src = _get_src(this);
                            if (isBlocked(src)) {
                                _console.warn(`Blocked "onerror" callback from ${_get_tagName(this)}: ${src}`);
                                return;
                            }
                            _Reflect_apply(scriptMap.get(this), this, arguments);
                        });
                    };
                    _defineProperty(root.HTMLElement.prototype, 'onerror', _onerror);
                }
                // Simplistic WebSocket wrapper for Maxthon and Firefox before v58
                WSWrap: { // once again seems required in Google Chrome and similar browsers due to zmctrack.net -_-
                    if (true /*/Maxthon/.test(navigator.appVersion) ||
                        'InstallTrigger' in win && 'StopIteration' in win*/) {
                        let _ws = _getOwnPropertyDescriptor(root, 'WebSocket');
                        if (!_ws)
                            break WSWrap;
                        _ws.value = new Proxy(_ws.value, {
                            construct: (ws, args) => {
                                if (isBlocked(args[0])) {
                                    _console.log('Blocked WS connection:', args[0]);
                                    return {};
                                }
                                return new ws(...args);
                            }
                        });
                        _defineProperty(root, 'WebSocket', _ws);
                    }
                }
                untrustedClick: {
                    // Block popular method to open a new window in Google Chrome by dispatching a custom click
                    // event on a newly created anchor with _blank target. Untrusted events must not open new windows.
                    let _dispatchEvent = _call.bind(root.EventTarget.prototype.dispatchEvent);
                    root.EventTarget.prototype.dispatchEvent = function dispatchEvent(e) {
                        if (!e.isTrusted && e.type === 'click' && e.constructor.name === 'MouseEvent' &&
                            !this.parentNode && this.tagName === 'A' && this.target[0] === '_') {
                            _console.log('Blocked dispatching a click event on a parentless anchor:', this);
                            return;
                        }
                        return _dispatchEvent(this, ...arguments);
                    };
                }
                // XHR Wrapper
                let _proto = void 0;
                try {
                    _proto = root.XMLHttpRequest.prototype;
                } catch(ignore) {
                    return;
                };
                // blacklist of domains where all third-party requests are ignored
                let ondomains = /(^|[/.@])oane\.ws($|[:/])/i;
                // highly suspicious URLs
                let suspicious = /^(https?:)?\/\/(?!rutube\.ru[:/])(csp-)?([a-z0-9]{6}){1,2}\.ru\//i;
                let on_get_ban = /^(https?:)?\/\/(?!rutube\.ru[:/])(csp-)?([a-z0-9]{6}){1,2}\.ru\/([a-z0-9/]{40,}|[a-z0-9]{8,}|ad\/banner\/.+|show\/\?\d+=\d+&.+)$/i;
                let on_post_ban = /^(https?:)?\/\/(?!rutube\.ru[:/])(csp-)?([a-z0-9]{6}){1,2}\.ru\/([a-z0-9]{6,})$/i;
                let yandex_direct = /^(https?:)?\/\/([^.]+\.)??yandex(\.[a-z]{2,3}){1,2}\/((images|weather)\/[a-z0-9/_-]{40,}|jstracer?|j?clck\/.*|set\/s\/rsya-tag-users\/data(\?.*)?|static\/main\.js(\?.*)?)$/i;
                let more_y_direct = /^(https?:)?\/\/([^.]+\.)??(24smi\.org|(echo\.msk|kakprosto|liveinternet|razlozhi)\.ru)\/(.{290,}|[a-z0-9/_-]{100,})$/i;
                let whitelist = /^(https?:)?\/\/yandex\.ru\/yobject$/;
                let fabPatterns = /\/fuckadblock/i;

                let blockedUrls = new Set();
                function checkRequest(fname, method, url) {
                    if ((isBlocked(url) ||
                         ondomains.test(location.hostname) && !ondomains.test(url) ||
                         method !== 'POST' && on_get_ban.test(url) ||
                         method === 'POST' && on_post_ban.test(url) ||
                         yandex_direct.test(url) || more_y_direct.test(url)) && !whitelist.test(url)) {
                        if (!blockedUrls.has(url)) // don't repeat log if the same URL were blocked more than once
                            _console.warn(`Blocked ${fname} ${method} request:`, url);
                        blockedUrls.add(url);
                        return true;
                    }
                    if (suspicious.test(url))
                        _console.warn(`Suspicious ${fname} ${method} request:`, url);
                    return false;
                }

                // workaround for a broken weather mini-map on Yandex
                let skip_xhr_check = false;
                if (root.location.hostname.startsWith('yandex.') &&
                    root.location.pathname.startsWith('/pogoda/') ||
                    root.location.hostname.endsWith('.kakprosto.ru'))
                    skip_xhr_check = true;

                let xhrStopList = new WeakSet();
                let _open = root.Function.prototype.apply.bind(_proto.open);
                _proto.open = function open() {
                    '[native code]';
                    return !skip_xhr_check && checkRequest('xhr', ...arguments) ?
                        (xhrStopList.add(this), void 0) : _open(this, arguments);
                };
                ['send', 'setRequestHeader', 'getAllResponseHeaders'].forEach(
                    name => {
                        let func = _proto[name];
                        _proto[name] = function(...args) {
                            return xhrStopList.has(this) ? null : func.apply(this, args);
                        };
                    }
                );
                // simulate readyState === 1 for blocked requests
                let _readyState = Object.getOwnPropertyDescriptor(_proto, 'readyState');
                let _get_readyState = root.Function.prototype.apply.bind(_readyState.get);
                _readyState.get = function() {
                    return xhrStopList.has(this) ? 1 : _get_readyState(this, arguments);
                }
                Object.defineProperty(_proto, 'readyState', _readyState);

                let _fetch = root.Function.prototype.apply.bind(root.fetch);
                root.fetch = function fetch() {
                    '[native code]';
                    let url = arguments[0];
                    let method = arguments[1] ? arguments[1].method : void 0;
                    if (arguments[0] instanceof Request) {
                        method = url.method;
                        url = url.url;
                    }
                    if (checkRequest('fetch', method, url))
                        return new Promise(() => null);
                    return _fetch(root, arguments);
                };

                let _script_src = Object.getOwnPropertyDescriptor(root.HTMLScriptElement.prototype, 'src');
                let _script_src_set = root.Function.prototype.apply.bind(_script_src.set);
                let _dispatchEvent = root.Function.prototype.call.bind(root.EventTarget.prototype.dispatchEvent);
                _script_src.set = function(src) {
                    if (fabPatterns.test(src)) {
                        _console.warn(`Blocked set script.src request:`, src);
                        deployFABStub(root);
                        setTimeout(() => {
                            let e = root.document.createEvent('Event');
                            e.initEvent('load', false, false);
                            _dispatchEvent(this, e);
                        }, 0);
                        return;
                    }
                    return checkRequest('set', 'script.src', src) || _script_src_set(this, arguments);
                };
                Object.defineProperty(root.HTMLScriptElement.prototype, 'src', _script_src);

                let adregain_pattern = /ggg==" alt="advertisement"/;
                if (root.self !== root.top) { // in IFrame
                    let _write = Function.prototype.call.bind(root.document.write);
                    root.document.write = function write(text, ...args) {
                        "[native code]";
                        if (adregain_pattern.test(text)) {
                            _console.log('Skipped AdRegain frame.');
                            return _write(this, '');
                        }
                        return _write(this, text, ...args);
                    };
                }
            });

            win.stop = () => {
                _console.warn('window.stop() ...y tho?');
                for (let sheet of _document.styleSheets)
                    if (sheet.disabled) {
                        sheet.disabled = false;
                        _console.log('Re-enabled:', sheet);
                    }
            }
        }, deepWrapAPI
    );

    // === Helper functions ===

    // function to search and remove nodes by content
    // selector - standard CSS selector to define set of nodes to check
    // words - regular expression to check content of the suspicious nodes
    // params - object with multiple extra parameters:
    //   .log - display log in the console
    //   .hide - set display to none instead of removing from the page
    //   .parent - parent node to remove if content is found in the child node
    //   .siblings - number of simling nodes to remove (excluding text nodes)
    let scRemove = (node) => node.parentNode.removeChild(node);
    let scHide = function(node) {
        let style = _getAttribute(node, 'style') || '',
            hide = ';display:none!important;';
        if (style.indexOf(hide) < 0)
            _setAttribute(node, 'style', style + hide);
    };

    function scissors (selector, words, scope, params) {
        let logger = (...args) => { if (params.log) _console.log(...args) };
        if (!scope.contains(_document.body))
            logger('[s] scope', scope);
        let remFunc = (params.hide ? scHide : scRemove),
            iterFunc = (params.siblings > 0 ? 'nextElementSibling' : 'previousElementSibling'),
            toRemove = [],
            siblings;
        for (let node of scope.querySelectorAll(selector)) {
            // drill up to a parent node if specified, break if not found
            if (params.parent) {
                let old = node;
                node = node.closest(params.parent);
                if (node === null || node.contains(scope)) {
                    logger('[s] went out of scope with', old);
                    continue;
                }
            }
            logger('[s] processing', node);
            if (toRemove.includes(node))
                continue;
            if (words.test(node.innerHTML)) {
                // skip node if already marked for removal
                logger('[s] marked for removal');
                toRemove.push(node);
                // add multiple nodes if defined more than one sibling
                siblings = Math.abs(params.siblings) || 0;
                while (siblings) {
                    node = node[iterFunc];
                    if (!node) break; // can't go any further - exit
                    logger('[s] adding sibling node', node);
                    toRemove.push(node);
                    siblings -= 1;
                }
            }
        }
        let toSkip = [];
        for (let node of toRemove)
            if (!toRemove.every(other => other === node || !node.contains(other)))
                toSkip.push(node);
        if (toRemove.length)
            logger(`[s] proceeding with ${params.hide?'hide':'removal'} of`, toRemove, `skip`, toSkip);
        for (let node of toRemove) if (!toSkip.includes(node))
            remFunc(node);
    }

    // function to perform multiple checks if ads inserted with a delay
    // by default does 30 checks withing a 3 seconds unless nonstop mode specified
    // also does 1 extra check when a page completely loads
    // selector and words - passed dow to scissors
    // params - object with multiple extra parameters:
    //   .log - display log in the console
    //   .root - selector to narrow down scope to scan;
    //   .observe - if true then check will be performed continuously;
    // Other parameters passed down to scissors.
    function gardener(selector, words, params) {
        let logger = (...args) => { if (params.log) _console.log(...args) };
        params = params || {};
        logger(`[gardener] selector: '${selector}' detector: ${words} options: ${JSON.stringify(params)}`);
        let scope;
        let globalScope = [_de];
        let domLoaded = false;
        let getScope = root => root ? _de.querySelectorAll(root) : globalScope;
        let onevent = e => {
            logger(`[gardener] cleanup on ${Object.getPrototypeOf(e)} "${e.type}"`);
            for (let node of scope)
                scissors(selector, words, node, params);
        };
        let repeater = n => {
            if (!domLoaded && n) {
                setTimeout(repeater, 500, n - 1);
                scope = getScope(params.root);
                if (!scope) // exit if the root element is not present on the page
                    return 0;
                onevent({type: 'Repeater'});
            }
        };
        repeater(20);
        _document.addEventListener(
            'DOMContentLoaded', (e) => {
                domLoaded = true;
                // narrow down scope to a specific element
                scope = getScope(params.root);
                if (!scope) // exit if the root element is not present on the page
                    return 0;
                logger('[g] scope', scope);
                // add observe mode if required
                if (params.observe) {
                    let params = { childList:true, subtree: true };
                    let observer = new MutationObserver(
                        function(ms) {
                            for (let m of ms)
                                if (m.addedNodes.length)
                                    onevent(m);
                        }
                    );
                    for (let node of scope)
                        observer.observe(node, params);
                    logger('[g] observer enabled');
                }
                onevent(e);
            }, false);
        // wait for a full page load to do one extra cut
        win.addEventListener('load', onevent, false);
    }

    // wrap popular methods to open a new tab to catch specific behaviours
    function createWindowOpenWrapper(openFunc) {
        let _createElement = _Document.createElement,
            _appendChild = _Element.appendChild,
            fakeNative = (f) => (f.toString = () => `function ${f.name}() { [native code] }`);

        let nt = new nullTools();
        fakeNative(openFunc);

        let parser = _createElement.call(_document, 'a');
        let openWhitelist = (url, parent) => {
            parser.href = url;
            return parser.hostname === 'www.imdb.com' || parser.hostname === 'www.kinopoisk.ru' ||
                parent.hostname === 'radikal.ru' && url === void 0;
        };

        let redefineOpen = (root) => {
            if ('open' in root) {
                let _open = root.open.bind(root);
                nt.define(root, 'open', (...args) => {
                    if (openWhitelist(args[0], location)) {
                        _console.log('Whitelisted popup:', ...args);
                        return _open(...args);
                    }
                    return openFunc(...args);
                });
            }
        };
        redefineOpen(win);

        function createElement() {
            '[native code]';
            let el = _createElement.apply(this, arguments);
            // redefine window.open in first-party frames
            if (el instanceof HTMLIFrameElement || el instanceof HTMLObjectElement)
                el.addEventListener('load', (e) => {
                    try {
                        redefineOpen(e.target.contentWindow);
                    } catch(ignore) {}
                }, false);
            return el;
        }
        fakeNative(createElement);

        let redefineCreateElement = (obj) => {
            for (let root of [obj.document, _Document]) if ('createElement' in root)
                nt.define(root, 'createElement', createElement);
        };
        redefineCreateElement(win);

        // wrap window.open in newly added first-party frames
        _Element.appendChild = function appendChild() {
            '[native code]';
            let el = _appendChild.apply(this, arguments);
            if (el instanceof HTMLIFrameElement)
                try {
                    redefineOpen(el.contentWindow);
                    redefineCreateElement(el.contentWindow);
                } catch(ignore) {}
            return el;
        };
        fakeNative(_Element.appendChild);
    }

    // Function to catch and block various methods to open a new window with 3rd-party content.
    // Some advertisement networks went way past simple window.open call to circumvent default popup protection.
    // This funciton blocks window.open, ability to restore original window.open from an IFRAME object,
    // ability to perform an untrusted (not initiated by user) click on a link, click on a link without a parent
    // node or simply a link with piece of javascript code in the HREF attribute.
    function preventPopups() {
        // call sandbox-me if in iframe and not whitelisted
        if (inIFrame) {
            win.top.postMessage({ name: 'sandbox-me', href: win.location.href }, '*');
            return;
        }

        scriptLander(() => {
            let nt = new nullTools({log:true});
            let open = (...args) => {
                '[native code]';
                _console.warn('Site attempted to open a new window', ...args);
                return {
                    document: nt.proxy({
                        write: nt.func({}, 'write'),
                        writeln: nt.func({}, 'writeln')
                    }),
                    location: nt.proxy({})
                };
            };

            createWindowOpenWrapper(open);

            _console.log('Popup prevention enabled.');
        }, nullTools, createWindowOpenWrapper);
    }

    // Helper function to close background tab if site opens itself in a new tab and then
    // loads a 3rd-party page in the background one (thus performing background redirect).
    function preventPopunders() {
        // create "close_me" event to call high-level window.close()
        let eventName = `close_me_${Math.random().toString(36).substr(2)}`;
        let callClose = () => {
            _console.log('close call');
            window.close();
        };
        window.addEventListener(eventName, callClose, true);

        scriptLander(() => {
            // get host of a provided URL with help of an anchor object
            // unfortunately new URL(url, window.location) generates wrong URL in some cases
            let parseURL = _document.createElement('A');
            let getHost = url => {
                parseURL.href = url;
                return parseURL.hostname
            };
            // site went to a new tab and attempts to unload
            // call for high-level close through event
            let closeWindow = () => window.dispatchEvent(new CustomEvent(eventName, {}));
            // check is URL local or goes to different site
            let isLocal = (url) => {
                if (url === location.pathname || url === location.href)
                    return true; // URL points to current pathname or full address
                let host = getHost(url);
                let site = location.hostname;
                return host !== '' && // URLs with unusual protocol may have empty 'host'
                    (site === host || site.endsWith(`.${host}`) || host.endsWith(`.${site}`));
            };

            let _open = window.open.bind(window);
            let open = (...args) => {
                '[native code]';
                let url = args[0];
                if (url && isLocal(url))
                    window.addEventListener('beforeunload', closeWindow, true);
                return _open(...args);
            };

            createWindowOpenWrapper(open);

            _console.log("Background redirect prevention enabled.");
        }, `let eventName="${eventName}"`, nullTools, createWindowOpenWrapper);
    }

    // Mix between check for popups and popunders
    // Significantly more agressive than both and can't be used as universal solution
    function preventPopMix() {
        if (inIFrame) {
            win.top.postMessage({ name: 'sandbox-me', href: win.location.href }, '*');
            return;
        }

        // create "close_me" event to call high-level window.close()
        let eventName = `close_me_${Math.random().toString(36).substr(2)}`;
        let callClose = () => {
            _console.log('close call');
            window.close();
        };
        window.addEventListener(eventName, callClose, true);

        scriptLander(() => {
            let _open = window.open,
                parseURL = _document.createElement('A');
            // get host of a provided URL with help of an anchor object
            // unfortunately new URL(url, window.location) generates wrong URL in some cases
            let getHost = (url) => {
                parseURL.href = url;
                return parseURL.host;
            };
            // site went to a new tab and attempts to unload
            // call for high-level close through event
            let closeWindow = () => {
                _open(window.location,'_self');
                window.dispatchEvent(new CustomEvent(eventName, {}));
            };
            // check is URL local or goes to different site
            function isLocal(url) {
                let loc = window.location;
                if (url === loc.pathname || url === loc.href)
                    return true; // URL points to current pathname or full address
                let host = getHost(url),
                    site = loc.host;
                if (host === '')
                    return false; // URLs with unusual protocol may have empty 'host'
                if (host.length > site.length)
                    [site, host] = [host, site];
                return site.includes(host, site.length - host.length);
            }

            // add check for redirect for 5 seconds, then disable it
            function checkRedirect() {
                window.addEventListener('beforeunload', closeWindow, true);
                setTimeout(closeWindow=>window.removeEventListener('beforeunload', closeWindow, true), 5000, closeWindow);
            }

            function open(url, name) {
                '[native code]';
                if (url && isLocal(url) && (!name || name === '_blank')) {
                    _console.warn('Suspicious local new window', arguments);
                    checkRedirect();
                    return _open.apply(this, arguments);
                }
                _console.warn('Blocked attempt to open a new window', arguments);
                return {
                    document: {
                        write: () => {},
                        writeln: () => {}
                    }
                };
            }

            function clickHandler(e) {
                let link = e.target,
                    url = link.href||'';
                if (e.targetParentNode && e.isTrusted || link.target !== '_blank') {
                    _console.log('Link', link, 'were created dinamically, but looks fine.');
                    return true;
                }
                if (isLocal(url) && link.target === '_blank') {
                    _console.log('Suspicious local link', link);
                    checkRedirect();
                    return;
                }
                _console.log('Blocked suspicious click on a link', link);
                e.stopPropagation();
                e.preventDefault();
            }

            createWindowOpenWrapper(open, clickHandler);

            _console.log("Mixed popups prevention enabled.");
        }, `let eventName="${eventName}"`, createWindowOpenWrapper);
    }
    // External listener for case when site known to open popups were loaded in iframe
    // It will sandbox any iframe which will send message 'forbid.popups' (preventPopups sends it)
    // Some sites replace frame's window.location with data-url to run in clean context
    if (!inIFrame) window.addEventListener(
        'message', function(e) {
            if (!e.data || e.data.name !== 'sandbox-me' || !e.data.href)
                return;
            let src = e.data.href;
            for (let frame of _document.querySelectorAll('iframe'))
                if (frame.contentWindow === e.source) {
                    if (frame.hasAttribute('sandbox')) {
                        if (!frame.sandbox.contains('allow-popups'))
                            return; // exit frame since it's already sandboxed and popups are blocked
                        // remove allow-popups if frame already sandboxed
                        frame.sandbox.remove('allow-popups');
                    } else
                        // set sandbox mode for troublesome frame and allow scripts, forms and a few other actions
                        // technically allowing both scripts and same-origin allows removal of the sandbox attribute,
                        // but to apply content must be reloaded and this script will re-apply it in the result
                        frame.setAttribute('sandbox','allow-forms allow-scripts allow-presentation allow-top-navigation allow-same-origin');
                    _console.log('Disallowed popups from iframe', frame);

                    // reload frame content to apply restrictions
                    if (!src) {
                        src = frame.src;
                        _console.log('Unable to get current iframe location, reloading from src', src);
                    } else
                        _console.log('Reloading iframe with URL', src);
                    frame.src = 'about:blank';
                    frame.src = src;
                }
        }, false
    );

    let evalPatternYandex = /{exports:{},id:r,loaded:!1}|containerId:(.|\r|\n)+params:/;
    let evalPatternGeneric = /_0x|location\s*?=|location.href\s*?=|location.assign\(|open\(/i;
    function selectiveEval(...patterns) {
        if (patterns.length === 0)
            patterns.push(evalPatternGeneric);
        scriptLander(() => {
            let _eval_def = Object.getOwnPropertyDescriptor(win, 'eval');
            if (!_eval_def || !_eval_def.value) {
                _console.warn('Unable to wrap window.eval.', _eval_def);
                return;
            }
            let _eval_val = _eval_def.value;
            _eval_def.value = function(...args) {
                if (patterns.some(pattern => pattern.test(args[0]))) {
                    _console.warn(`Skipped eval of ${args[0].slice(0, 512)}\u2026`);
                    return null;
                }
                try {
                    return _eval_val.apply(this, args);
                } catch(e) {
                    _console.log('Crash source:', args[0]);
                    throw e;
                }
            };
            Object.defineProperty(win, 'eval', _eval_def);
        }, `let patterns = [${patterns}];`);
    }

    // hides cookies by pattern and attempts to remove them if they already set
    // also prevents setting new versions of such cookies
    function selectiveCookies(scPattern = '', scPaths = []) {
        scriptLander(() => {
            let patterns = scPattern.split('|');
            if (patterns[0] !== ';default') {
                // Google Analytics cookies
                patterns.push('_g(at?|id)|__utm[a-z]');
                // Yandex ABP detection cookies
                patterns.push('bltsr|blcrm');
            } else
                patterns.shift();
            let blacklist = new RegExp(`(^|;\\s?)(${patterns.join('|')})($|=)`);
            if (isFirefox && scPaths.length)
                scPaths = scPaths.map(path => `${path}/`);
            scPaths.push('/');
            let _doc_proto = ('cookie' in _Document) ? _Document : Object.getPrototypeOf(_document);
            let _cookie = Object.getOwnPropertyDescriptor(_doc_proto, 'cookie');
            if (_cookie) {
                let _set_cookie = Function.prototype.call.bind(_cookie.set);
                let _get_cookie = Function.prototype.call.bind(_cookie.get);
                let expireDate = 'Thu, 01 Jan 1970 00:00:01 UTC';
                let expireAge = '-99999999';
                let expireBase = `=;expires=${expireDate};Max-Age=${expireAge}`;
                let expireAttempted = {};
                // expire is called from cookie getter and doesn't know exact parameters used to set cookies present there
                // so, it will use path=/ by default if scPaths wasn't set and attempt to set cookies on all parent domains
                let expire = (cookie, that) => {
                    let domain = that.location.hostname.split('.'),
                        name = cookie.replace(/=.*/,'');
                    scPaths.forEach(path =>_set_cookie(that, `${name}${expireBase};path=${path}`));
                    while (domain.length > 1) {
                        try {
                            scPaths.forEach(
                                path => _set_cookie(that, `${name}${expireBase};domain=${domain.join('.')};path=${path}`)
                            );
                        } catch(e) { _console.warn(e); }
                        domain.shift();
                    }
                    expireAttempted[name] = true;
                    _console.log('Removing existing cookie:', cookie);
                };
                // skip setting unwanted cookies
                _cookie.set = function(value) {
                    if (blacklist.test(value)) {
                        _console.warn('Ignored cookie:', value);
                        // try to remove same cookie if it already exists using exact values from the set string
                        if (blacklist.test(_get_cookie(this))) {
                            let parts = value.split(/;\s?/),
                                name = parts[0].replace(/=.*/,''),
                                newParts = [`${name}=`, `expires=${expireDate}`, `Max-Age=${expireAge}`],
                                skip = [name, 'expires', 'Max-Age'];
                            for (let part of parts)
                                if (!skip.includes(part.replace(/=.*/,'')))
                                    newParts.push(part);
                            try {
                                _set_cookie(this, newParts.join(';'));
                            } catch(e) { _console.warn(e); }
                            _console.log('Removing existing cookie:', name);
                        }
                        return;
                    }
                    return _set_cookie(this, value);
                };
                // hide unwanted cookies from site
                _cookie.get = function() {
                    let res = _get_cookie(this);
                    if (blacklist.test(res)) {
                        let stack = [];
                        for (let cookie of res.split(/;\s?/))
                            if (!blacklist.test(cookie))
                                stack.push(cookie);
                            else {
                                let name = cookie.replace(/=.*/,'');
                                if (expireAttempted[name]) {
                                    _console.log('Unable to expire:', cookie);
                                    expireAttempted[name] = false;
                                }
                                if (!(name in expireAttempted))
                                    expire(cookie, this);
                            }
                        res = stack.join('; ');
                    }
                    return res;
                };
                Object.defineProperty(_doc_proto, 'cookie', _cookie);
                _console.log('Active cookies:', win.document.cookie);
            }
        }, `let scPattern = "${scPattern}", scPaths = ${JSON.stringify(scPaths)}, isFirefox = ${isFirefox};`);
    }

    /*{ // simple toString wrapper, might be useful to prevent detection
        '[native code]';
        let _toString = Function.prototype.apply.bind(Function.prototype.toString);
        let baseText = Function.prototype.toString.toString();
        let protect = new WeakSet();
        protect.add(_Document.createElement);
        protect.add(_Node.appendChild);
        protect.add(_Node.removeChild);
        win.Function.prototype.toString = function() {
            if (protect.has(this))
                return baseText.replace('toString', this.name);
            return _toString(this);
        };
        protect.add(Function.prototype.toString);
    }*/

    // Locates a node with specific text in Russian
    // Uses table of substitutions for similar letters
    let selectNodeByTextContent = (()=> {
        let subs = {
            // english & greek
            'А': 'AΑ', 'В': 'BΒ', 'Г':'Γ',
            'Е': 'EΕ', 'З': '3',  'К':'KΚ',
            'М': 'MΜ', 'Н': 'HΗ', 'О':'OΟ',
            'П': 'Π',  'Р': 'PΡ', 'С':'C',
            'Т': 'T',  'Ф': 'Φ',  'Х':'XΧ'
        }
        let regExpBuilder = text => new RegExp(
            text.toUpperCase()
            .split('')
            .map(function(e){
                return `${e in subs ? `[${e}${subs[e]}]` : (e === ' ' ? '\\s+' : e)}[\u200b\u200c\u200d]*`;
            })
            .join(''),
            'i');
        let reMap = {};
        return (re, opts = { root: _document.body }) => {
            if (!re.test) {
                if (!reMap[re])
                    reMap[re] = regExpBuilder(re);
                re = reMap[re];
            }

            for (let child of opts.root.children)
                if (re.test(child.textContent)) {
                    if (opts.shallow)
                        return child;
                    opts.root = child;
                    return selectNodeByTextContent(re, opts) || child;
                }
        }
    })();

    // webpackJsonp filter
    function webpackJsonpFilter(blacklist) {
        let _apply = Reflect.apply;
        let _toString = Function.prototype.call.bind(Function.prototype.toString);
        function wrapPush(webpack) {
            let _push = webpack.push.bind(webpack);
            Object.defineProperty(webpack, 'push', {
                get: () => _push,
                set: vl => {
                    _push = new Proxy(vl, {
                        apply: (push, obj, args) => {
                            wrapper: {
                                if (!(args[0] instanceof Array))
                                    break wrapper;
                                let mainName;
                                if (args[0][2] instanceof Array && args[0][2][0] instanceof Array)
                                    mainName = args[0][2][0][0];
                                let funs = args[0][1];
                                if (!(funs instanceof Object && !(funs instanceof Array)))
                                    break wrapper;
                                for (let name in funs) {
                                    if (typeof funs[name] !== 'function')
                                        continue;
                                    if (blacklist.test(_toString(funs[name])) && name !== mainName)
                                        funs[name] = () => _console.log(`Skip webpack ${name}`);
                                }
                            }
                            _console.log('webpack.push()');
                            return _apply(push, obj, args);
                        }
                    });
                    return true;
                }
            });
            return webpack
        }
        let _webpackJsonp = wrapPush([]);
        Object.defineProperty(win, 'webpackJsonp', {
            get: () => _webpackJsonp,
            set: vl => {
                if (vl === _webpackJsonp)
                    return;
                _console.log('new webpackJsonp', vl);
                _webpackJsonp = wrapPush(vl);
                return true;
            }
        });
    }

    // === Scripts for specific domains ===

    let scripts = {};
    // prevent popups and redirects block
    // Popups
    scripts.preventPopups = {
        other: [
            'biqle.ru',
            'chaturbate.com',
            'dfiles.ru',
            'eporner.eu',
            'hentaiz.org',
            'mirrorcreator.com',
            'online-multy.ru',
            'radikal.ru', 'rumedia.ws',
            'tapehub.tech', 'thepiratebay.org',
            'unionpeer.com',
            'zippyshare.com'
        ],
        now: preventPopups
    };
    // Popunders (background redirect)
    scripts.preventPopunders = {
        other: [
            'lostfilm-online.ru',
            'mediafire.com', 'megapeer.org', 'megapeer.ru',
            'perfectgirls.net'
        ],
        now: preventPopunders
    };
    // PopMix (both types of popups encountered on site)
    scripts['openload.co'] = {
        other: ['oload.tv', 'oload.info'],
        now: () => {
            let nt = new nullTools();
            nt.define(win, 'CNight', win.CoinHive);
            if (location.pathname.startsWith('/embed/')) {
                nt.define(win, 'BetterJsPop', {
                    add: ((a, b) => _console.warn('BetterJsPop.add', a, b)),
                    config: ((o) => _console.warn('BetterJsPop.config', o)),
                    Browser: { isChrome: true }
                });
                nt.define(win, 'isSandboxed', nt.func(null));
                nt.define(win, 'adblock', false);
                nt.define(win, 'adblock2', false);
            } else preventPopMix();
        }
    };
    scripts['turbobit.net'] = preventPopMix;

    scripts['tapochek.net'] = () => {
        // workaround for moradu.com/apu.php load error handler script, not sure which ad network is this
        let _appendChild = Object.getOwnPropertyDescriptor(_Node, 'appendChild');
        let _appendChild_value = _appendChild.value;
        _appendChild.value = function appendChild(node) {
            if (this === _document.body)
                if ((node instanceof HTMLScriptElement || node instanceof HTMLStyleElement) &&
                    /^https?:\/\/[0-9a-f]{15}\.com\/\d+(\/|\.css)$/.test(node.src) ||
                    node instanceof HTMLDivElement && node.style.zIndex > 900000 &&
                    node.style.backgroundImage.includes('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'))
                    throw '...eenope!';
            return _appendChild_value.apply(this, arguments);
        };
        Object.defineProperty(_Node, 'appendChild', _appendChild);

        // disable window focus tricks and changing location
        let focusHandlerName = /\WfocusAchieved\(/
        let _toString = Function.prototype.call.bind(Function.prototype.toString);
        let _setInterval = win.setInterval;
        win.setInterval = (...args) => {
            if (args.length && focusHandlerName.test(_toString(args[0]))) {
                _console.log('skip setInterval for', ...args);
                return -1;
            }
            return _setInterval(...args);
        };
        let _addEventListener = win.addEventListener;
        win.addEventListener = function(...args) {
            if (args.length && args[0] === 'focus' && focusHandlerName.test(_toString(args[1]))) {
                _console.log('skip addEventListener for', ...args);
                return void 0;
            }
            return _addEventListener.apply(this, args);
        };

        // generic popup prevention
        preventPopups();
    };

    scripts['rustorka.com'] = {
        other: ['rustorka.club', 'rustorka.lib', 'rustorka.net'],
        now: () => {
            selectiveEval(evalPatternGeneric, /antiadblock/);
            selectiveCookies('adblock|u_count|gophp|st2|st3', ['/forum']);
            scriptLander(() => {
                // wrap window.open to catch a popup if it triggers
                win.open = (...args) => {
                    _console.warn(`Site attempted to open "${args[0]}" in a new window.`);
                    location.replace(location.href);
                    return null;
                };
                window.addEventListener('DOMContentLoaded', () => {
                    let link = void 0;
                    _document.body.addEventListener('mousedown', e => {
                        link = e.target.closest('a, select, #fancybox-title-wrap');
                    }, false);
                    let _open = window.open.bind(window);
                    let _getAttribute = Function.prototype.call.bind(_Element.getAttribute);
                    win.open = (...args) => {
                        let url = args[0];
                        if (link instanceof HTMLAnchorElement) {
                            // third-party post links
                            let href = _getAttribute(link, 'href');
                            if (link.classList.contains('postLink') &&
                                !link.matches(`a[href*="${location.hostname}"]`) &&
                                (href === url || link.href === url))
                                return _open(...args);
                            // onclick # links
                            if (href === '#' && /window\.open/.test(_getAttribute(link, 'onclick')))
                                return _open(...args);
                            // force local links to load in the current window
                            if (href[0] === '/' || href.startsWith('./') || href.includes(`//${location.hostname}/`))
                                location.assign(href);
                        }
                        // list of image hostings under upload picture button (new comment)
                        if (link instanceof HTMLSelectElement &&
                            !url.includes(location.hostname) &&
                            link.value === url)
                            return _open(...args);
                        // open screenshot in a new window
                        if (link instanceof HTMLSpanElement &&
                            link.id === 'fancybox-title-wrap')
                            return _open(...args);
                        // looks like tabunder
                        if (link === null && url === location.href)
                            location.replace(url); // reload current page
                        // other cases
                        _console.warn(`Site attempted to open "${url}" in a new window. Source: `, link);
                        return {};
                    };
                }, true);
            }, nullTools)
        }
    };

    // = other ======================================================================================
    scripts['1tv.ru'] = {
        other: ['mediavitrina.ru'],
        now: () => scriptLander(() => {
            let nt = new nullTools();
            nt.define(win, 'EUMPAntiblockConfig', nt.proxy({url: '//www.1tv.ru/favicon.ico'}));
            let disablePlugins = {
                'antiblock': false,
                'stat1tv': false
            };
            let _EUMPConfig = void 0;
            let _EUMPConfig_set = x => {
                if (x.plugins) {
                    x.plugins = x.plugins.filter(plugin => (plugin in disablePlugins) ? !(disablePlugins[plugin] = true) : true);
                    _console.warn(`Player plugins: active [${x.plugins}], disabled [${Object.keys(disablePlugins).filter(x => disablePlugins[x])}]`);
                }
                _EUMPConfig = x;
            };
            if ('EUMPConfig' in win)
                _EUMPConfig_set(win.EUMPConfig);
            Object.defineProperty(win, 'EUMPConfig', {
                enumerable: true,
                get: () => _EUMPConfig,
                set: _EUMPConfig_set
            });
        }, nullTools)
    };

    scripts['24smi.org'] = () => selectiveCookies('has_adblock');

    scripts['2picsun.ru'] = {
        other: [
            'pics2sun.ru', '3pics-img.ru'
        ],
        now: () => {
            Object.defineProperty(navigator, 'userAgent', {value: 'googlebot'});
        }
    };

    scripts['4pda.ru'] = {
        now: () => {
            // https://greasyfork.org/en/scripts/14470-4pda-unbrender
            let isForum = location.pathname.startsWith('/forum/'),
                remove = node => (node && node.parentNode.removeChild(node)),
                hide = node => (node && (node.style.display = 'none'));

            // clean a page
            window.addEventListener(
                'DOMContentLoaded', function() {
                    let width = () => window.innerWidth || _de.clientWidth || _document.body.clientWidth || 0;
                    let height = () => window.innerHeight || _de.clientHeight || _document.body.clientHeight || 0;

                    HeaderAds: {
                        // hide ads above HEADER
                        let header = _document.querySelector('.drop-search');
                        if (!header) {
                            _console.warn('Unable to locate header element');
                            break HeaderAds;
                        }
                        header = header.parentNode.parentNode;
                        for (let itm of header.parentNode.children)
                            if (itm !== header)
                                hide(itm);
                            else break;
                    }

                    if (isForum) {
                        let itm = _document.querySelector('#logostrip');
                        if (itm)
                            remove(itm.parentNode.nextSibling);
                        // clear background in the download frame
                        if (location.pathname.startsWith('/forum/dl/')) {
                            let setBackground = node => _setAttribute(
                                node,
                                'style', (_getAttribute(node, 'style') || '') +
                                ';background-color:#4ebaf6!important'
                            );
                            setBackground(_document.body);
                            for (let itm of _document.querySelectorAll('body > div'))
                                if (!itm.querySelector('.dw-fdwlink, .content') && !itm.classList.contains('footer'))
                                    remove(itm);
                                else
                                    setBackground(itm);
                        }
                        // exist from DOMContentLoaded since the rest is not for forum
                        return;
                    }

                    FixNavMenu: {
                        // restore DevDB link in the navigation
                        let itm = _document.querySelector('#nav li a[href$="/devdb/"]')
                        if (!itm) {
                            _console.warn('Unable to locate navigation menu');
                            break FixNavMenu;
                        }
                        itm.closest('li').style.display = 'block';
                        // hide ad link from the navigation
                        hide(_document.querySelector('#nav li a[data-dotrack]'));
                    }
                    SidebarAds: {
                        // remove ads from sidebar
                        let aside = _document.querySelectorAll('[class]:not([id]) > [id]:not([class]) > :first-child + :last-child');
                        if (!aside.length) {
                            _console.warn('Unable to locate sidebar');
                            break SidebarAds;
                        }
                        let post;
                        for (let side of aside) {
                            _console.log('Processing potential sidebar:', side);
                            for (let itm of Array.from(side.children)) {
                                post = itm.classList.contains('post');
                                if (itm.querySelector('iframe') && !post)
                                    remove(itm);
                                if (itm.querySelector('script, a[target="_blank"] > img') && !post || !itm.children.length)
                                    hide(itm);
                            }
                        }
                    }

                    _document.body.setAttribute('style', (_document.body.getAttribute('style')||'')+';background-color:#E6E7E9!important');

                    let extra = 'background-image:none!important;background-color:transparent!important',
                        fakeStyles = new WeakMap(),
                        styleProxy = {
                            get: (target, prop) => fakeStyles.get(target)[prop] || target[prop],
                            set: function(target, prop, value) {
                                let fakeStyle = fakeStyles.get(target);
                                ((prop in fakeStyle) ? fakeStyle : target)[prop] = value;
                                return true;
                            }
                        };
                    for (let itm of _document.querySelectorAll('[id]:not(A), A')) {
                        if (!(itm.offsetWidth > 0.95 * width() &&
                              itm.offsetHeight > 0.85 * height()))
                            continue;
                        if (itm.tagName !== 'A') {
                            fakeStyles.set(itm.style, {
                                'backgroundImage': itm.style.backgroundImage,
                                'backgroundColor': itm.style.backgroundColor
                            });

                            try {
                                Object.defineProperty(itm, 'style', {
                                    value: new Proxy(itm.style, styleProxy),
                                    enumerable: true
                                });
                            } catch (e) {
                                _console.log('Unable to protect style property.', e);
                            }

                            _setAttribute(itm, 'style', `${(_getAttribute(itm, 'style') || '')};${extra}`);
                        }
                        if (itm.tagName === 'A')
                            _setAttribute(itm, 'style', 'display:none!important');
                    }
                }
            );
        }
    };

    scripts['adhands.ru'] = () => scriptLander(() => {
        let nt = new nullTools();
        try {
            let _adv;
            Object.defineProperty(win, 'adv', {
                get: () => _adv,
                set: (v) => {
                    _console.log('Blocked advert on adhands.ru.');
                    nt.define(v, 'advert', '');
                    _adv = v;
                }
            });
        } catch (ignore) {
            if (!win.adv)
                _console.log('Unable to locate advert on adhands.ru.');
            else {
                _console.log('Blocked advert on adhands.ru.');
                nt.define(win.adv, 'advert', '');
            }
        }
    }, nullTools);

    scripts['all-episodes.tv'] = () => {
        let nt = new nullTools();
        nt.define(win, 'perX1', 2);
        createStyle('#advtss, #ad3, a[href*="/ad.admitad.com/"] { display:none!important }');
    };

    scripts['allhentai.ru'] = () => {
        selectiveEval();
        preventPopups();
        scriptLander(() => {
            let _onerror = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'onerror');
            if (!_onerror)
                return;
            _onerror.set = (...args) => _console.log(args[0].toString());
            Object.defineProperty(HTMLElement.prototype, 'onerror', _onerror);
        });
    };

    scripts['allmovie.pro'] = {
        other: ['rufilmtv.org'],
        dom: function() {
            // pretend to be Android to make site use different played for ads
            if (isSafari)
                return;
            Object.defineProperty(navigator, 'userAgent', {
                get: function(){
                    return 'Mozilla/5.0 (Linux; Android 4.1.1; Nexus 7 Build/JRO03D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Safari/535.19';
                },
                enumerable: true
            });
        }
    };

    scripts['anidub-online.ru'] = {
        other: ['anime.anidub.com', 'online.anidub.com'],
        dom: function() {
            if (win.ogonekstart1)
                win.ogonekstart1 = () => _console.log("Fire in the hole!");
        },
        now: () => createStyle([
            '.background {background: none!important;}',
            '.background > script + div,'+
            '.background > script ~ div:not([id]):not([class]) + div[id][class]'+
            '{display:none!important}'
        ])
    };

    scripts['audioportal.su'] = {
        now: () => createStyle('#blink2 { display: none !important }'),
        dom: () => {
            let links = _document.querySelectorAll('a[onclick*="clickme("]');
            if (!links) return;
            for (let link of links)
                clickme(link);
        }
    };

    scripts['avito.ru'] = () => selectiveCookies('abp|cmtchd|crookie|is_adblock');

    scripts['di.fm'] = () => scriptLander(() => {
        let log = false;
        // wrap global app object to catch registration of specific modules
        let _di = void 0;
        Object.defineProperty(win, 'di', {
            get: () => _di,
            set: vl => {
                if (vl === _di)
                    return;
                log && _console.log('di =', vl);
                _di = new Proxy(vl, {
                    set: (di, name, vl) => {
                        if (vl === di[name])
                            return true;
                        if (name === 'app') {
                            log && _console.log('di.app =', vl);
                            if ('module' in vl)
                                vl.module = new Proxy(vl.module, {
                                    apply: (module, that, args) => {
                                        if (/Wall|Banner|Detect|WebplayerApp\.Ads/.test(args[0])) {
                                            let name = args[0];
                                            log && _console.warn('wrap', name, 'module');
                                            if (typeof args[1] === 'function')
                                                args[1] = new Proxy(args[1], {
                                                    apply: (fun, that, args) => {
                                                        if (args[0]) // module object
                                                            args[0].start = () => _console.log('Skipped start of', name);
                                                        return Reflect.apply(fun, that, args);
                                                    }
                                                });
                                        }// else log && _console.log('loading module', args[0]);
                                        if (args[0] === 'Modals') {
                                            log && _console.warn('wrap', name, 'module');
                                            if (typeof args[1] === 'function')
                                                args[1] = new Proxy(args[1], {
                                                    apply: (fun, that, args) => {
                                                        if ('commands' in args[1] && 'setHandlers' in args[1].commands &&
                                                            !Object.hasOwnProperty.call(args[1].commands, 'setHandlers')) {
                                                            let _commands = args[1].commands;
                                                            _commands.setHandlers = new Proxy(_commands.setHandlers, {
                                                                apply: (fun, that, args) => {
                                                                    for (let name in args[0])
                                                                        if (name === 'modal:streaminterrupt' ||
                                                                            name === 'modal:midroll')
                                                                            args[0][name] = () => _console.log('Skipped', name, 'window');
                                                                    delete _commands.setHandlers;
                                                                    return Reflect.apply(fun, that, args);
                                                                }
                                                            });
                                                        }
                                                        return Reflect.apply(fun, that, args);
                                                    }
                                                });
                                        }
                                        return Reflect.apply(module, that, args);
                                    }
                                });
                        }
                        di[name] = vl;
                        return true;
                    }
                });
            }
        });
        // don't send errorception logs
        Object.defineProperty(win, 'onerror', {
            set: vl => log && _console.warn('Skipped global onerror callback', vl)
        });
    });

    scripts['draug.ru'] = {
        other: ['vargr.ru'],
        now: () => scriptLander(() => {
            if (location.pathname === '/pop.html')
                win.close();
            createStyle([
                '#timer_1 { display: none !important }',
                '#timer_2 { display: block !important }'
            ]);
            let _contentWindow = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'contentWindow');
            let _get_contentWindow = Function.prototype.apply.bind(_contentWindow.get);
            _contentWindow.get = function() {
                let res = _get_contentWindow(this);
                if (res.location.href === 'about:blank')
                    res.document.write = (...args) => _console.log('Skipped iframe.write(', ...args, ')');
                return res;
            };
            Object.defineProperty(HTMLIFrameElement.prototype, 'contentWindow', _contentWindow);
        }),
        dom: () => {
            let list = _querySelectorAll('div[id^="yandex_rtb_"], .adsbygoogle');
            list.forEach(node => _console.log('Removed:', node.parentNode.parentNode.removeChild(node.parentNode)));
        }
    };

    scripts['drive2.ru'] = () => {
        selectiveCookies();
        gardener('.c-block:not([data-metrika="recomm"]),.o-grid__item', />Реклама<\//i);
        scriptLander(() => {
            let _d2 = void 0;
            Object.defineProperty(win, 'd2', {
                get: () => _d2,
                set: o => {
                    if (o === _d2)
                        return true;
                    _d2 = new Proxy(o, {
                        set: (tgt, prop, val) => {
                            if (['brandingRender', 'dvReveal', '__dv'].includes(prop))
                                val = () => null;
                            tgt[prop] = val;
                            return true;
                        }
                    });
                }
            });
        });
    };

    scripts['echo.msk.ru'] = () => {
        selectiveCookies();
        selectiveEval(evalPatternYandex, /^document\.write/, /callAdblock/);
    }

    scripts['fastpic.ru'] = () => {
        let nt = new nullTools();
        // Had to obfuscate property name to avoid triggering anti-obfuscation on greasyfork.org -_- (Exception 403012)
        nt.define(win, `_0x${'4955'}`, []);
    };

    scripts['fishki.net'] = () => {
        scriptLander(() => {
            let nt = new nullTools();
            let fishki = {};
            nt.define(fishki, 'adv', nt.proxy({
                afterAdblockCheck: nt.func(null),
                refreshFloat: nt.func(null)
            }));
            nt.define(fishki, 'is_adblock', false);
            nt.define(win, 'fishki', fishki);
        }, nullTools);
        gardener('.drag_list > .drag_element, .list-view > .paddingtop15, .post-wrap', /543769|Новости\sпартнеров|Полезная\sреклама/);
    };

    scripts['friends.in.ua'] = () => scriptLander(() => {
        Object.defineProperty(win, 'need_warning', {
            get: () => 0, set: () => null
        });
    });

    scripts['gidonline.club'] = () => createStyle('.tray > div[style] {display: none!important}');

    scripts['hdgo.cc'] = {
        other: ['46.30.43.38', 'couber.be'],
        now: () => (new MutationObserver(
            (ms) => {
                let m, node;
                for (m of ms) for (node of m.addedNodes)
                    if (node.tagName instanceof HTMLScriptElement && _getAttribute(node, 'onerror') !== null)
                        node.removeAttribute('onerror');
            }
        )).observe(_document.documentElement, { childList:true, subtree: true })
    };

    scripts['gismeteo.ru'] = {
        other: ['gismeteo.by', 'gismeteo.kz', 'gismeteo.ua'],
        now: () => {
            selectiveCookies('ab_[^=]*|redirect|_gab');
            gardener('div > script', /AdvManager/i, { observe: true, parent: 'div' })
        }
    };

    scripts['hdrezka.ag'] = () => {
        Object.defineProperty(win, 'ab', { value: false, enumerable: true });
        gardener('div[id][onclick][onmouseup][onmousedown]', /onmouseout/i);
    };

    scripts['hqq.tv'] = () => scriptLander(() => {
        // disable anti-debugging in hqq.tv player
        let isObfuscated = text => /[^a-z0-9]([a-z0-9]{1,2}\.[a-z0-9]{1,2}\(|[a-z0-9]{4}\.[a-z]\(\d+\)|[a-z0-9]\[[a-z0-9]{1,2}\]\[[a-z0-9]{1,2}\])/i.test(text);
        deepWrapAPI(root => {
            // skip obfuscated stuff and a few other calls
            let _setInterval = root.setInterval,
                _setTimeout = root.setTimeout,
                _toString = root.Function.prototype.call.bind(root.Function.prototype.toString);
            root.setInterval = (...args) => {
                let fun = args[0];
                if (fun instanceof Function) {
                    let text = _toString(fun),
                        skip = text.includes('check();') || isObfuscated(text);
                    _console.warn('setInterval', text, 'skip', skip);
                    if (skip) return -1;
                }
                return _setInterval.apply(this, args);
            };
            let wrappedST = new WeakSet();
            root.setTimeout = (...args) => {
                let fun = args[0];
                if (fun instanceof Function) {
                    let text = _toString(fun),
                        skip = fun.name === 'check' || isObfuscated(text);
                    if (!wrappedST.has(fun)) {
                        _console.warn('setTimeout', text, 'skip', skip);
                        wrappedST.add(fun);
                    }
                    if (skip) return;
                }
                return _setTimeout.apply(this, args);
            };
            // skip 'debugger' call
            let _eval = root.eval;
            root.eval = text => {
                if (typeof text === 'string' && text.includes('debugger;')) {
                    _console.warn('skip eval', text);
                    return;
                }
                _eval(text);
            };
            // Prevent RegExpt + toString trick
            let _proto = void 0;
            try {
                _proto = root.RegExp.prototype;
            } catch(ignore) {
                return;
            }
            let _RE_tS = Object.getOwnPropertyDescriptor(_proto, 'toString');
            let _RE_tSV = _RE_tS.value || _RE_tS.get();
            Object.defineProperty(_proto, 'toString', {
                enumerable: _RE_tS.enumerable,
                configurable: _RE_tS.configurable,
                get: () => _RE_tSV,
                set: val => _console.warn('Attempt to change toString for', this, 'with', _toString(val))
            });
        });
    }, deepWrapAPI);

    scripts['hideip.me'] = {
        now: () => scriptLander(() => {
            let _innerHTML = Object.getOwnPropertyDescriptor(_Element, 'innerHTML');
            let _set_innerHTML = _innerHTML.set;
            let _innerText = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'innerText');
            let _get_innerText = _innerText.get;
            let div = _document.createElement('div');
            _innerHTML.set = function(...args) {
                _set_innerHTML.call(div, args[0].replace('i','a'));
                if (args[0] && /[рp][еe]кл/.test(_get_innerText.call(div))||
                    /(\d\d\d?\.){3}\d\d\d?:\d/.test(_get_innerText.call(this)) ) {
                    _console.log('Anti-Adblock killed.');
                    return true;
                }
                _set_innerHTML.apply(this, args);
            };
            Object.defineProperty(_Element, 'innerHTML', _innerHTML);
            Object.defineProperty(win, 'adblock', {
                get: () => false,
                set: () => null,
                enumerable: true
            });
            let _$ = {};
            let _$_map = new WeakMap();
            let _gOPD = Object.getOwnPropertyDescriptor(Object, 'getOwnPropertyDescriptor');
            let _val_gOPD = _gOPD.value;
            _gOPD.value = function(...args) {
                let _res = _val_gOPD.apply(this, args);
                if (args[0] instanceof Window && (args[1] === '$' || args[1] === 'jQuery')) {
                    delete _res.get;
                    delete _res.set;
                    _res.value = win[args[1]];
                }
                return _res;
            };
            Object.defineProperty(Object, 'getOwnPropertyDescriptor', _gOPD);
            let getJQWrap = (n) => {
                let name = n;
                return {
                    enumerable: true,
                    get: () => _$[name],
                    set: x => {
                        if (_$_map.has(x)) {
                            _$[name] = _$_map.get(x);
                            return true;
                        }
                        if (x === _$.$ || x === _$.jQuery) {
                            _$[name] = x;
                            return true;
                        }
                        _$[name] = new Proxy(x, {
                            apply: (t, o, args) => {
                                let _res = t.apply(o, args);
                                if (_$_map.has(_res.is))
                                    _res.is = _$_map.get(_res.is);
                                else {
                                    let _is = _res.is;
                                    _res.is = function(...args) {
                                        if (args[0] === ':hidden')
                                            return false;
                                        return _is.apply(this, args);
                                    };
                                    _$_map.set(_is, _res.is);
                                }
                                return _res;
                            }
                        });
                        _$_map.set(x, _$[name]);
                        return true;
                    }
                };
            };
            Object.defineProperty(win, '$', getJQWrap('$'));
            Object.defineProperty(win, 'jQuery', getJQWrap('jQuery'));
            let _dP = Object.defineProperty;
            Object.defineProperty = function(...args) {
                if (args[0] instanceof Window && (args[1] === '$' || args[1] === 'jQuery'))
                    return void 0;
                return _dP.apply(this, args);
            };
        })
    };

    scripts['igra-prestoloff.cx'] = () => scriptLander(() => {
        let nt = new nullTools();
        /*jslint evil: true */ // yes, evil, I know
        let _write = _document.write.bind(_document);
        /*jslint evil: false */
        nt.define(_document, 'write', t => {
            let id = t.match(/jwplayer\("(\w+)"\)/i);
            if (id && id[1])
                return _write(`<div id="${id[1]}"></div>${t}`);
            return _write('');
        });
    });

    scripts['imageban.ru'] = () => { Object.defineProperty(win, 'V7x1J', { get: () => null }); };

    scripts['inoreader.com'] = () => scriptLander(() => {
        let i = setInterval(() => {
            if ('adb_detected' in win) {
                win.adb_detected = () => adb_not_detected();
                clearInterval(i);
            }
        }, 10);
        _document.addEventListener('DOMContentLoaded', () => clearInterval(i), false);
    });

    scripts['ivi.ru'] = () => {
        let _xhr_open = win.XMLHttpRequest.prototype.open;
        win.XMLHttpRequest.prototype.open = function(method, url, ...args) {
            if (typeof url === 'string')
                if (url.endsWith('/track'))
                    return;
            return _xhr_open.call(this, method, url, ...args);
        };
        let _responseText = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, 'responseText');
        let _responseText_get = _responseText.get;
        _responseText.get = function() {
            if (this.__responseText__)
                return this.__responseText__;
            let res = _responseText_get.apply(this, arguments);
            let o;
            try {
                if (res)
                    o = JSON.parse(res);
            } catch(ignore) {};
            let changed = false;
            if (o && o.result) {
                if (o.result instanceof Array &&
                    'adv_network_logo_url' in o.result[0]) {
                    o.result = [];
                    changed = true;
                }
                if (o.result.show_adv) {
                    o.result.show_adv = false;
                    changed = true;
                }
            }
            if (changed) {
                _console.log('changed response >>', o);
                res = JSON.stringify(o);
            }
            this.__responseText__ = res;
            return res;
        };
        Object.defineProperty(XMLHttpRequest.prototype, 'responseText', _responseText);
    };

    scripts['kinopoisk.ru'] = () => {
        selectiveCookies('cmtchd|crookie|kpunk');
        // set no-branding body style and adjust other blocks on the page
        let style = [
            '.app__header.app__header_margin-bottom_brand, #top { margin-bottom: 20px !important }',
            '.app__branding { display: none !important}'
        ];
        if (location.hostname === 'www.kinopoisk.ru' && !location.pathname.startsWith('/games/'))
            style.push('html:not(#id), body:not(#id), .app-container { background: #d5d5d5 url(/images/noBrandBg.jpg) 50% 0 no-repeat !important }');
        createStyle(style);
        // catch branding and other things
        let _KP = void 0;
        Object.defineProperty(win, 'KP', {
            get: () => _KP,
            set: val => {
                if (_KP === val)
                    return true;
                _KP = new Proxy(val, {
                    set: (kp, name, val) => {
                        if (name === 'branding') {
                            kp[name] = new Proxy({ weborama: {} }, {
                                get: (kp, name) => name in kp ? kp[name] : '',
                                set: () => true
                            });
                            return true;
                        }
                        if (name === 'config')
                            val = new Proxy(val, {
                                set: (cfg, name, val) => {
                                    if (name === 'anContextUrl')
                                        return true;
                                    if (name === 'adfoxEnabled' || name === 'hasBranding')
                                        val = false;
                                    if (name === 'adfoxVideoAdUrls')
                                        val = {flash:{}, html:{}};
                                    cfg[name] = val;
                                    return true;
                                }
                            });
                        kp[name] = val;
                        return true;
                    }
                });
                _console.log('KP =', val);
            }
        });
        // skip branding and some other junk
        if (!('advBlock' in win))
            Object.defineProperty(win, 'advBlock', {
                get: () => () => null,
                set: () => true
            });
        // skip timeout check for blocked requests
        let _setTimeout = Function.prototype.apply.bind(win.setTimeout);
        let _toString = Function.prototype.apply.bind(Function.prototype.toString);
        win.setTimeout = function(...args) {
            if (args[1] === 100) {
                let str = _toString(args[0]);
                if (str.endsWith('{a()}') || str.endsWith('{n()}'))
                    return;
            }
            return _setTimeout(this, args);
        };
    };

    scripts['korrespondent.net'] = {
        now: () => scriptLander(() => {
            let nt = new nullTools();
            nt.define(win, 'holder', function(id) {
                let div = _document.getElementById(id);
                if (!div)
                    return;
                if (div.parentNode.classList.contains('col__sidebar')) {
                    div.parentNode.appendChild(div);
                    div.style.height = '300px';
                }
            });
        }, nullTools),
        dom: () => {
            for (let frame of _document.querySelectorAll('.unit-side-informer > iframe'))
                frame.parentNode.style.width = '1px';
        }
    };

    scripts['liveinternet.ru'] = () => selectiveEval(evalPatternYandex);

    scripts['mail.ru'] = {
        other: ['ok.ru', 'sportmail.ru'],
        now: () => {
            selectiveCookies('act|testcookie');
            scriptLander(() => {
                // setTimeout filter
                let pattern = /advBlock/i;
                let _toString = Function.prototype.call.bind(Function.prototype.toString);
                let _setTimeout = Function.prototype.apply.bind(win.setTimeout);
                win.setTimeout = function setTimeout(...args) {
                    let text = _toString(args[0]);
                    if (pattern.test(text)) {
                        _console.warn('Skipped setTimeout:', text);
                        return;
                    }// else if (!text.includes('checkLoaded()'))
                    //   _console.warn(text, args[1]);
                    return _setTimeout(this, args);
                };

                let nt = new nullTools();
                // Trick to prevent mail.ru from removing 3rd-party styles
                nt.define(Object.prototype, 'restoreVisibility', nt.func(null), false);
                // _mimic check
                nt.define(win, '_mimic', false);
                // ads on okminigames.mail.ru (opened in iframe)
                nt.define(win, 'MrgContext', nt.proxy({
                    version: null
                }, 'MrgContext'));
                // Disable some of their counters
                nt.define(win, 'rb_counter', nt.func(null, 'rb_counter'));
                if (location.hostname === 'e.mail.ru')
                    nt.define(win, 'aRadar', nt.func(null, 'aRadar'));
                else
                    nt.define(win, 'createRadar', nt.func(nt.func(null, 'aRadar'), 'createRadar'));

                // Disable page scrambler on mail.ru to let extensions easily block ads there
                let logger = {
                    apply: (target, thisArg, args) => {
                        let res = target.apply(thisArg, args);
                        _console.log(`${target._name}(`, ...args, `)\n>>`, res);
                        return res;
                    }
                };

                function wrapLocator(locator) {
                    if ('setup' in locator) {
                        let _setup = locator.setup;
                        locator.setup = function(o) {
                            if ('enable' in o) {
                                o.enable = false;
                                _console.log('Disable mimic mode.');
                            }
                            if ('links' in o) {
                                o.links = [];
                                _console.log('Call with empty list of sheets.');
                            }
                            return _setup.call(this, o);
                        };
                        locator.insertSheet = () => false;
                        locator.wrap = () => false;
                    }
                    try {
                        let names = [];
                        for (let name in locator)
                            if (locator[name] instanceof Function && name !== 'transform') {
                                locator[name]._name = "locator." + name;
                                locator[name] = new Proxy(locator[name], logger);
                                names.push(name);
                            }
                        _console.log(`[locator] wrapped properties: ${names.length ? names.join(', ') : '[empty]'}`);
                    } catch(e) {
                        _console.log(e);
                    }
                    return locator;
                }

                function defineLocator(root) {
                    let _locator = root.locator;
                    let wrapLocatorSetter = vl => _locator = wrapLocator(vl);
                    let loc_desc = Object.getOwnPropertyDescriptor(root, 'locator');
                    if (!loc_desc || loc_desc.set !== wrapLocatorSetter)
                        try {
                            Object.defineProperty(root, 'locator', {
                                set: wrapLocatorSetter,
                                get: () => _locator
                            });
                        } catch (err) {
                            _console.log('Unable to redefine "locator" object!!!', err);
                        }
                    if (loc_desc.value)
                        _locator = wrapLocator(loc_desc.value);
                }

                {
                    let missingCheck = {
                        get: (obj, name) => {
                            if (!(name in obj))
                                _console.warn(obj, 'missing:', name);
                            return obj[name];
                        }
                    };
                    // wow, Mail.ru can't just keep base Array functionality alone >_<
                    let _reduce = Function.prototype.call.bind(Array.prototype.reduce);
                    let skipLog = (name, ret) => (...args) => (_console.log(`Skip ${name}(`, ...args, ')'), ret);
                    let createSkipLogObject = (baseName, list) => _reduce(
                        list,
                        (acc, cur) => (acc[cur] = skipLog(`${baseName}.${cur}`), acc),
                        {}
                    );
                    let _apply = Reflect.apply;
                    let redefiner = {
                        apply: (target, thisArg, args) => {
                            let res = void 0;
                            let warn = false;
                            let name = target._name;
                            if (name === 'mrg-smokescreen/Welter')
                                res = {
                                    isWelter: () => true,
                                    wrap: skipLog(`${name}.wrap`)
                                };
                            if (name === 'mrg-smokescreen/StyleSheets')
                                res = createSkipLogObject(name, ['update', 'remove', 'insert', 'setup']);
                            if (name === 'mrg-honeypot/main' ||
                                name === 'mrg-smokescreen/Honeypot')
                                res = { check: skipLog(`${name}.check`, false) };
                            if (name.startsWith('advert/rb/slot')) {
                                res = createSkipLogObject(name, ['get', 'getHTML', 'createBlock', 'onRedirect']);
                                res.slot = '0';
                            }
                            if (name.startsWith('OK/banners/'))
                                res = createSkipLogObject(name, ['activate', 'deactivate', 'onHooksReady', 'subscribeToEvents']);
                            if (name === 'advert/adman/adman') {
                                res = createSkipLogObject(name, ['deleteRBParams', 'getBlock', 'init', 'refresh', 'setForceMimic', 'setRBParams']);
                                let features = { siteZones: {}, slots: {} };
                                [
                                    'expId', 'siteId', 'mimicEndpoint', 'mimicPartnerId', 'immediateFetchTimeout', 'delayedFetchTimeout'
                                ].forEach(name => void (features[name] = null));
                                res.getFeatures = skipLog('advert/adman/adman.getFeatures', features);
                            }
                            if (name.startsWith('adv/'))
                                res = createSkipLogObject(name, ['create', 'logError', 'rb', 'sendCounter', 'top']);
                            if (name === 'app/banners')
                                res = createSkipLogObject(name, ['create', 'createRunTime', 'startLoad', 'load']);
                            if (name === 'right-banners')
                                res = createSkipLogObject(name, ['create']);
                            if (name === 'mimic/mimic') {
                                res = createSkipLogObject(name, ['createRunTime']);
                                res.prototype = Function.prototype;
                            }
                            if (name === 'mimic/right-column')
                                res = createSkipLogObject(name, []);
                            // mimic/css/mimic must load or https://my.mail.ru/apps/ breaks
                            if (name.startsWith('mimic/css/') && name !== 'mimic/css/mimic')
                                res = {};
                            if (res) {
                                Object.defineProperty(res, Symbol.toStringTag, {
                                    get: () => `Skiplog object for ${name}`
                                });
                                Object.defineProperty(res, Symbol.toPrimitive, {
                                    value: function(hint) {
                                        if (hint === 'string')
                                            return Object.prototype.toString.call(this);
                                        return `[missing toPrimitive] ${name} ${hint}`;
                                    }
                                });
                                res = new Proxy(res, missingCheck);
                            } else {
                                res = _apply(target, thisArg, args);
                                warn = true;
                            }
                            if (name === 'mimic')
                                res = new Proxy(res, {
                                    construct: (...args) => {
                                        function wrap(o) {
                                            if ('locator' in o)
                                                defineLocator(o);
                                            for (let name in o)
                                                if (typeof o[name] === 'object' && name !== 'locator')
                                                    wrap(o[name]);
                                            return o;
                                        }
                                        let res = wrap(Reflect.construct(...args));
                                        _console.warn('new mimic', res);
                                        return res;
                                    }
                                });
                            if (name === 'mrg-smokescreen/Utils')
                                res.extend = function(...args) {
                                    let res = {
                                        enable: false,
                                        match: [],
                                        links: []
                                    };
                                    _console.log(`${name}.extend(`, ...args, ') >>', res );
                                    return res;
                                };
                            if (name === 'advert/RB') {
                                res.getSlots = () => [];
                                res.load._name = name + '.load';
                                res.load = new Proxy(res.load, redefiner);
                            }
                            _console[warn?'warn':'log'](name, '(',...args,')\n>>', res);
                            return res;
                        }
                    };

                    let advModuleNamesStartWith = /^(mrg-(context|honeypot)|adv\/)/;
                    let advModuleNamesGeneric = /advert|banner|mimic|smoke/i;
                    let otherModuleNames = [];
                    let printCollectedLog = () => {
                        if (otherModuleNames.length) {
                            // sort list and remove duplicates
                            otherModuleNames = [...new Set(otherModuleNames)].sort();
                            _console.log(`Define:\n${otherModuleNames.join('\n')}`);
                            otherModuleNames = [];
                        }
                    };
                    win.addEventListener('load', () => {
                        printCollectedLog();
                        let cnt = 0;
                        let i = setInterval(() => {
                            otherModuleNames.length ? cnt = 0 : cnt++;
                            cnt >= 5 && clearInterval(i);
                            printCollectedLog();
                        }, 1000);
                    }, false);
                    let wrapAdFuncs = {
                        apply: (target, thisArg, args) => {
                            let module = args[0];
                            if (typeof module === 'string')
                                if ((advModuleNamesStartWith.test(module) ||
                                     advModuleNamesGeneric.test(module)) &&
                                    // fix for e.mail.ru in Fx56 and below, looks like Proxy is quirky there
                                    !module.startsWith('patron.v2.')) {
                                    let fun = args[args.length-1];
                                    fun._name = module;
                                    args[args.length-1] = new Proxy(fun, redefiner);
                                } else otherModuleNames.push(module);
                            return _apply(target, thisArg, args);
                        }
                    };
                    let wrapDefine = def => {
                        if (!def)
                            return;
                        _console.log('define =', def);
                        def = new Proxy(def, wrapAdFuncs);
                        def._name = 'define';
                        return def;
                    };
                    let _define = wrapDefine(win.define);
                    Object.defineProperty(win, 'define', {
                        get: () => _define,
                        set: x => {
                            if (_define === x)
                                return true;
                            _define = wrapDefine(x);
                            return true;
                        }
                    });
                }

                let _honeyPot;
                function defineDetector(mr) {
                    let __ = mr._ || {};
                    let setHoneyPot = o => {
                        if (!o || o === _honeyPot) return;
                        _console.log('[honeyPot]', o);
                        _honeyPot = function() {
                            this.check = new Proxy(() => {
                                __.STUCK_IN_POT = false;
                                return false;
                            }, logger);
                            this.check._name = 'honeyPot.check';
                            this.destroy = () => null;
                        };
                    };
                    if ('honeyPot' in mr)
                        setHoneyPot(mr.honeyPot);
                    else
                        Object.defineProperty(mr, 'honeyPot', {
                            get: () => _honeyPot,
                            set: setHoneyPot
                        });

                    __ = new Proxy(__, {
                        get: (t, p) => t[p],
                        set: (t, p, v) => {
                            _console.log(`mr._.${p} =`, v);
                            t[p] = v;
                            return true;
                        }
                    });
                    mr._ = __;
                }

                function defineAdd(mr) {
                    let _add;
                    let addWrapper = {
                        apply: (tgt, that, args) => {
                            let module = args[0];
                            if (typeof module === 'string' && module.startsWith('ad')) {
                                _console.log('Skip module:', module);
                                return;
                            }
                            if (typeof module === 'object' && module.name.startsWith('ad'))
                                _console.log('Loaded module:', module);
                            return logger.apply(tgt, that, args);
                        }
                    };
                    let setMrAdd = v => {
                        if (!v) return;
                        v._name = 'mr.add';
                        v = new Proxy(v, addWrapper);
                        _add = v;
                    };
                    if ('add' in mr)
                        setMrAdd(mr.add);
                    Object.defineProperty(mr, 'add', {
                        get: () => _add,
                        set: setMrAdd
                    });

                }

                let _mr_wrapper = vl => {
                    defineLocator(vl.mimic ? vl.mimic : vl);
                    defineDetector(vl);
                    defineAdd(vl);
                    return vl;
                };
                if ('mr' in win) {
                    _console.log('Found existing "mr" object.');
                    win.mr = _mr_wrapper(win.mr);
                } else {
                    let _mr = void 0;
                    Object.defineProperty(win, 'mr', {
                        get: () => _mr,
                        set: vl => { _mr = _mr_wrapper(vl) },
                        configurable: true
                    });
                    let _defineProperty = Function.prototype.apply.bind(Object.defineProperty);
                    Object.defineProperty = function defineProperty(o, name, conf) {
                        if (name === 'mr' && o instanceof Window) {
                            _console.warn('Object.defineProperty(', ...arguments, ')');
                            conf.set(_mr_wrapper(conf.get()));
                        }
                        if ((name === 'honeyPot' || name === 'add') && _mr === o && conf.set)
                            return;
                        return _defineProperty(this, arguments);
                    };
                }

                // smokyTools wrapper for news.mail.ru
                nt.define(win, 'smokyTools', nt.proxy({
                    getDict: nt.func(nt.proxy({}, 'smokyTools.getDict', null), 'smokyTools.getDict'),
                    CSS: nt.func(nt.proxy({}, 'smokyTools.CSS', null), 'smokyTools.CSS')
                }, 'smokyTools', null));
                nt.define(win, 'smoky', nt.func(null, 'smoky'));
                nt.define(win, 'smokySingleElement', nt.func(null, 'smokySingleElement'));
                nt.define(win, 'smokyByClass', nt.func(null, 'smokyByClass'));
                // other things
                nt.define(win, 'getAdvTargetParam', nt.func(null, 'getAdvTargetParam'));
                nt.define(win, 'rb_banner', nt.func(null, 'rb_banner'));
                nt.define(win, 'rb_tadq', nt.func(null, 'rb_tadq'));
                nt.define(win, 'rb_bannerClick', nt.func(null, 'rb_bannerClick'));
            }, nullTools);
        }
    };

    scripts['oms.matchat.online'] = () => scriptLander(() => {
        let _rmpGlobals = void 0;
        Object.defineProperty(win, 'rmpGlobals', {
            get: () => _rmpGlobals,
            set: x => {
                if (x === _rmpGlobals)
                    return true;
                _rmpGlobals = new Proxy(x, {
                    get: (obj, name) => {
                        if (name === 'adBlockerDetected')
                            return false;
                        return obj[name];
                    },
                    set: (obj, name, val) => {
                        if (name === 'adBlockerDetected')
                            _console.warn('rmpGlobals.adBlockerDetected =', val)
                        else
                            obj[name] = val;
                        return true;
                    }
                });
            }
        });
    });

    scripts['megogo.net'] = {
        now: () => {
            let nt = new nullTools();
            nt.define(win, 'adBlock', false);
            nt.define(win, 'showAdBlockMessage', nt.func(null));
        }
    };

    scripts['n-torrents.org'] = () => scriptLander(() => {
        let _$ = void 0;
        Object.defineProperty(win, '$', {
            get: () => _$,
            set: vl => {
                _$ = vl;
                if (!vl.fn)
                    return true;
                let _videoPopup = vl.fn.videoPopup;
                Object.defineProperty(vl.fn, 'videoPopup', {
                    get: () => _videoPopup,
                    set: vl => {
                        if (vl === _videoPopup)
                            return true;
                        _videoPopup = new Proxy(vl, {
                            apply: (fun, obj, args) => {
                                let opts = args[0];
                                if (opts) {
                                    opts.adv = '';
                                    opts.duration = 0;
                                }
                                return Reflect.apply(fun, obj, args);
                            }
                        });
                        return true;
                    }
                });
                return true
            }
        });
    });

    scripts['naruto-base.su'] = () => gardener('div[id^="entryID"],.block', /href="http.*?target="_blank"/i);

    scripts['newdeaf-online.net'] = {
        dom: () => {
            let adNodes = _document.querySelectorAll('.ads');
            if (!adNodes)
                return;
            let getter = x => {
                let val = x;
                return () => (_console.warn('read .ads', name, val), val);
            };
            let setter = x => _console.warn('skip write .ads', name, x);
            for (let adNode of adNodes)
                for (let name of ['innerHTML'])
                    Object.defineProperty(adNode, name, {
                        get: getter(ads[name]),
                        set: setter
                    });
        }
    };

    scripts['overclockers.ru'] = {
        dom: () => scriptLander(() => {
            let killed = () => _console.warn('Anti-Adblock killed.');
            if ('$' in win)
                win.$ = new Proxy($, {
                    apply: (tgt, that, args) => {
                        let res = tgt.apply(that, args);
                        if (res[0] && res[0] === _document.body) {
                            res.html = killed;
                            res.empty = killed;
                        }
                        return res;
                    }
                });
        })
    };
    scripts['forums.overclockers.ru'] = {
        now: () => {
            createStyle('.needblock {position: fixed; left: -10000px}');
            Object.defineProperty(win, 'adblck', {
                get: () => 'no',
                set: () => undefined,
                enumerable: true
            });
        }
    };

    scripts['pb.wtf'] = {
        other: ['piratbit.org', 'piratbit.ru'],
        dom: () => {
            // line above topic content and images in the slider in the header
            let remove = node => (_console.log('removed', node), node.parentNode.removeChild(node));
            for (let el of _document.querySelectorAll('.release-block-img a, #page_content a')) {
                if (location.hostname === el.hostname &&
                    /^\/(\w{3}|exit)\/[\w=/]{20,}$/.test(el.pathname)) {
                    remove(el.closest('div, tr'));
                    continue;
                }
                // ads in the topic header in case filter above wasn't enough
                let parent = el.closest('tr');
                if (parent) {
                    let span = (parent.querySelector('span') || {}).textContent;
                    span && span.startsWith('YO!') && remove(parent);
                }
            }
            // casino ad button in random places
            for (let el of _document.querySelectorAll('.btn-group')) {
                el = el.parentNode;
                if (el.tagName === 'CENTER')
                    remove(el.parentNode);
            }
            // ads in comments
            let el = _document.querySelector('thead + tbody[id^="post_"] + tbody[class*=" "]');
            if (el && el.parentNode.children[2] == el)
                remove(el);
        }
    };

    scripts['pikabu.ru'] = () => gardener('.story', /story__author[^>]+>ads</i, {root: '.inner_wrap', observe: true});

    scripts['peka2.tv'] = () => {
        let bodyClass = 'body--branding';
        let checkNode = node => {
            for (let className of node.classList)
                if (className.includes('banner') || className === bodyClass) {
                    _removeAttribute(node, 'style');
                    node.classList.remove(className);
                    for (let attr of Array.from(node.attributes))
                        if (attr.name.startsWith('advert'))
                            _removeAttribute(node, attr.name);
                }
        };
        (new MutationObserver(ms => {
            let m, node;
            for (m of ms) for (node of m.addedNodes)
                if (node instanceof HTMLElement)
                    checkNode(node);
        })).observe(_de, {childList: true, subtree: true});
        (new MutationObserver(ms => {
            for (let m of ms)
                checkNode(m.target);
        })).observe(_de, {attributes: true, subtree: true, attributeFilter: ['class']});
    };

    scripts['qrz.ru'] = {
        now: () => {
            let nt = new nullTools();
            nt.define(win, 'ab', false);
            nt.define(win, 'tryMessage', nt.func(null));
        }
    };

    scripts['razlozhi.ru'] = {
        now: () => {
            let nt = new nullTools();
            nt.define(win, 'cadb', false);
            for (let func of ['createShadowRoot', 'attachShadow'])
                if (func in _Element)
                    _Element[func] = function(){
                        return this.cloneNode();
                    };
        }
    };

    scripts['rbc.ru'] = {
        other: ['autonews.ru', 'rbcplus.ru', 'sportrbc.ru'],
        now: () => {
            selectiveCookies('adb_on');
            let _RA = void 0;
            let setArgs = {
                'showBanners': true,
                'showAds': true,
                'banners.staticPath': '',
                'paywall.staticPath': '',
                'banners.dfp.config': [],
                'banners.dfp.pageTargeting': () => null,
            };
            Object.defineProperty(win, 'RA', {
                get: () => _RA,
                set: vl => {
                    _console.log('RA =', vl);
                    if ('repo' in vl) {
                        _console.log('RA.repo =', vl.repo);
                        vl.repo = new Proxy(vl.repo, {
                            set: (o, name, val) => {
                                if (name === 'banner') {
                                    _console.log(`RA.repo.${name} =`, val);
                                    val = new Proxy(val, {
                                        get: (o, name) => {
                                            let res = o[name];
                                            if (typeof o[name] === 'function') {
                                                res = () => null;
                                                res.toString = o[name].toString.bind(o[name]);
                                            }
                                            if (name === 'isInited')
                                                res = true;
                                            _console.warn(`get RA.repo.banner.${name}`, res);
                                            return res;
                                        }
                                    });
                                }
                                o[name] = val;
                                return true;
                            }
                        });
                    } else
                        _console.log('Unable to locate RA.repo');
                    _RA = new Proxy(vl, {
                        set: (o, name, val) => {
                            if (name === 'config') {
                                _console.log('RA.config =', val);
                                if ('set' in val) {
                                    val.set = new Proxy(val.set, {
                                        apply: (set, that, args) => {
                                            let name = args[0];
                                            if (name in setArgs)
                                                args[1] = setArgs[name];
                                            if (name in setArgs || name === 'checkad')
                                                _console.log('RA.config.set(', ...args, ')');
                                            return Reflect.apply(set, that, args);
                                        }
                                    });
                                    val.set('showAds', true); // pretend ads already were shown
                                }
                            }
                            o[name] = val;
                            return true;
                        }
                    });
                }
            });
            Object.defineProperty(win, 'bannersConfig', {
                get: () => [], set: () => null
            });
            // pretend there is a paywall landing on screen already
            let pwl = _document.createElement('div');
            pwl.style.display = 'none';
            pwl.className = 'js-paywall-landing';
            _document.documentElement.appendChild(pwl);
            // detect and skip execution of one of the ABP detectors
            let _setTimeout = Function.prototype.apply.bind(win.setTimeout);
            let _toString = Function.prototype.call.bind(Function.prototype.toString);
            win.setTimeout = function setTimeout() {
                if (typeof arguments[0] === 'function') {
                    let fts = _toString(arguments[0]);
                    if (/\.length\s*>\s*0\s*&&/.test(fts) && /:hidden/.test(fts)) {
                        _console.log('Skipped setTimout(', fts, arguments[1], ')');
                        return;
                    }
                }
                return _setTimeout(this, arguments);
            };
            // hide banner placeholders
            createStyle('[data-banner-id], .banner__container, .banners__yandex__article { display: none !important }');
        },
        dom: () => {
            // hide sticky banner place at the top of the page
            for (let itm of _document.querySelectorAll('.l-sticky'))
                if (itm.querySelector('.banner__container__link'))
                    itm.style.display = 'none';
        }
    };

    scripts['rp5.ru'] = {
        other: ['rp5.by', 'rp5.kz', 'rp5.ua'],
        now: () => {
            Object.defineProperty(win, 'sContentBottom', {
                get: () => '',
                set: () => true
            });
        },
        dom: () => {
            let node = selectNodeByTextContent('Разместить текстовое объявление', { root: _de.querySelector('#content-wrapper'), shallow: true });
            if (node)
                node.style.display = 'none';
        }
    };

    scripts['rutube.ru'] = () => scriptLander(() => {
        let _parse = JSON.parse;
        let _skip_enabled = false;
        JSON.parse = (...args) => {
            let res = _parse(...args),
                log = false;
            if (!res)
                return res;
            // parse player configuration
            if ('appearance' in res || 'video_balancer' in res) {
                log = true;
                if (res.appearance) {
                    if ('forbid_seek' in res.appearance && res.appearance.forbid_seek)
                        res.appearance.forbid_seek = false;
                    if ('forbid_timeline_preview' in res.appearance && res.appearance.forbid_timeline_preview)
                        res.appearance.forbid_timeline_preview = false;
                }
                _skip_enabled = !!res.remove_unseekable_blocks;
                //res.advert = [];
                delete res.advert;
                //for (let limit of res.limits)
                //    limit.limit = 0;
                delete res.limits;
                //res.yast = null;
                //res.yast_live_online = null;
                delete res.yast;
                delete res.yast_live_online;
                Object.defineProperty(res, 'stat', {
                    get: () => [],
                    set: () => true,
                    enumerable: true
                });
            }

            // parse video configuration
            if ('video_url' in res) {
                log = true;
                if (res.cuepoints && !_skip_enabled)
                    for (let point of res.cuepoints) {
                        point.is_pause = false;
                        point.show_navigation = true;
                        point.forbid_seek = false;
                    }
            }

            if (log)
                _console.log('[rutube]', res);
            return res;
        };
    });

    scripts['simpsonsua.com.ua'] = {
        other: ['simpsonsua.tv'],
        now: () => scriptLander(() => {
            let _addEventListener = _Document.addEventListener;
            _document.addEventListener = function(event, callback) {
                if (event === 'DOMContentLoaded' && callback.toString().includes('show_warning'))
                    return;
                return _addEventListener.apply(this, arguments);
            };
            let nt = new nullTools();
            nt.define(win, 'need_warning', 0);
        }, nullTools)
    };

    scripts['smotretanime.ru'] = () => scriptLander(() => {
        deepWrapAPI(root => {
            let _pause = root.Function.prototype.call.bind(root.Audio.prototype.pause);
            let _addEventListener = root.Function.prototype.call.bind(root.Element.prototype.addEventListener);
            let stopper = e => _pause(e.target);
            root.Audio = new Proxy(root.Audio, {
                construct: (audio, args) => {
                    let res = new audio(...args);
                    _addEventListener(res, 'play', stopper, true);
                    return res;
                }
            });
            _createElement = root.Document.prototype.createElement;
            root.Document.prototype.createElement = function createElement() {
                let res = _createElement.apply(this, arguments);
                if (res instanceof HTMLAudioElement)
                    _addEventListener(res, 'play', stopper, true);
                return res;
            };
        });
    }, deepWrapAPI);

    scripts['spaces.ru'] = () => {
        gardener('div:not(.f-c_fll) > a[href*="spaces.ru/?Cl="]', /./, { parent: 'div' });
        gardener('.js-banner_rotator', /./, { parent: '.widgets-group' });
    };

    scripts['spam-club.blogspot.co.uk'] = () => {
        let _clientHeight = Object.getOwnPropertyDescriptor(_Element, 'clientHeight'),
            _clientWidth = Object.getOwnPropertyDescriptor(_Element, 'clientWidth');
        let wrapGetter = (getter) => {
            let _getter = getter;
            return function() {
                let _size = _getter.apply(this, arguments);
                return _size ? _size : 1;
            };
        };
        _clientHeight.get = wrapGetter(_clientHeight.get);
        _clientWidth.get = wrapGetter(_clientWidth.get);
        Object.defineProperty(_Element, 'clientHeight', _clientHeight);
        Object.defineProperty(_Element, 'clientWidth', _clientWidth);
        let _onload = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'onload'),
            _set_onload = _onload.set;
        _onload.set = function() {
            if (this instanceof HTMLImageElement)
                return true;
            _set_onload.apply(this, arguments);
        };
        Object.defineProperty(HTMLElement.prototype, 'onload', _onload);
    };

    scripts['sport-express.ru'] = () => gardener('.js-relap__item',/>Реклама\s+<\//, {root:'.container', observe: true});

    scripts['sports.ru'] = {
        other: ['tribuna.com'],
        now: () => {
            // extra functionality: shows/hides panel at the top depending on scroll direction
            createStyle([
                '.user-panel__fixed { transition: top 0.2s ease-in-out!important; }',
                '.user-panel-up { top: -40px!important }'
            ], {id: 'userPanelSlide'}, false);
            scriptLander(() => {
                yandexRavenStub();
                webpackJsonpFilter(/AdBlockDetector|addBranding|_desktop\/banners\/|loadPlista/);
            }, nullTools, yandexRavenStub);
        },
        dom: () => {
            (function lookForPanel() {
                let panel = _document.querySelector('.user-panel__fixed');
                if (!panel)
                    setTimeout(lookForPanel, 100);
                else
                    window.addEventListener(
                        'wheel', function(e) {
                            if (e.deltaY > 0 && !panel.classList.contains('user-panel-up'))
                                panel.classList.add('user-panel-up');
                            else if (e.deltaY < 0 && panel.classList.contains('user-panel-up'))
                                panel.classList.remove('user-panel-up');
                        }, false
                    );
            })();
        }
    };
    scripts['stealthz.ru'] = {
        dom: () => {
            // skip timeout
            let $ = _document.querySelector.bind(_document);
            let [timer_1, timer_2] = [$('#timer_1'), $('#timer_2')];
            if (!timer_1 || !timer_2)
                return;
            timer_1.style.display = 'none';
            timer_2.style.display = 'block';
        }
    };

    scripts['xatab-repack.net'] = {
        other: ['rg-mechanics.org'],
        now: () => scriptLander(() => {
            Object.defineProperty(win, 'blocked', {
                set: () => { throw 'and unlooked for.'; }
            });
        }, nullTools)
    };

    scripts['xittv.net'] = () => scriptLander(() => {
        let logNames = ['setup', 'trigger', 'on', 'off', 'onReady', 'onError', 'getConfig', 'addPlugin', 'getAdBlock'];
        let skipEvents = ['adComplete', 'adSkipped', 'adBlock', 'adRequest', 'adMeta', 'adImpression', 'adError', 'adTime', 'adStarted', 'adClick'];
        let _jwplayer = void 0;
        Object.defineProperty(win, 'jwplayer', {
            get: () => _jwplayer,
            set: x => {
                _jwplayer = new Proxy(x, {
                    apply: (fun, that, args) => {
                        let res = fun.apply(that, args);
                        res = new Proxy(res, {
                            get: (obj, name) => {
                                if (logNames.includes(name) && obj[name] instanceof Function)
                                    return new Proxy(obj[name], {
                                        apply: (fun, that, args) => {
                                            if (name === 'setup') {
                                                let o = args[0];
                                                if (o)
                                                    delete o.advertising;
                                            }
                                            if (name === 'on' || name === 'trigger') {
                                                let events = typeof args[0] === 'string' ? args[0].split(" ") : null;
                                                if (events.length === 1 && skipEvents.includes(events[0]))
                                                    return res;
                                                if (events.length > 1) {
                                                    let names = [];
                                                    for (let event of events)
                                                        if (!skipEvents.includes(event))
                                                            names.push(event);
                                                    if (names.length > 0)
                                                        args[0] = names.join(" ");
                                                    else
                                                        return res;
                                                }
                                            }
                                            let subres = fun.apply(that, args);
                                            _console.warn(`jwplayer().${name}(`, ...args, `) >>`, res);
                                            return subres;
                                        }
                                    });
                                return obj[name];
                            }
                        });
                        return res;
                    }
                });
                _console.log('jwplayer =', x);
            }
        });
    });

    scripts['yap.ru'] = {
        other: ['yaplakal.com'],
        now: () => {
            gardener('form > table[id^="p_row_"]:nth-of-type(2)', /member1438|Administration/);
            gardener('.icon-comments', /member1438|Administration|\/go\/\?http/, {parent:'tr', siblings:-2});
        }
    };

    scripts['rambler.ru'] = {
        other: ['championat.com', 'gazeta.ru', 'lenta.ru', 'media.eagleplatform.com', 'quto.ru', 'rns.online'],
        now: () => {
            selectiveCookies('detect_count');
            scriptLander(() => {
                // Prevent autoplay
                if (!('EaglePlayer' in win)) {
                    let _EaglePlayer = void 0;
                    Object.defineProperty(win, 'EaglePlayer', {
                        enumerable: true,
                        get: () => _EaglePlayer,
                        set: x => {
                            if (x === _EaglePlayer)
                                return true;
                            _EaglePlayer = new Proxy(x, {
                                construct: (targ, args) => {
                                    let player = new targ(...args);
                                    if (!player.options) {
                                        _console.log('EaglePlayer: no options', EaglePlayer);
                                        return player;
                                    }
                                    Object.defineProperty(player.options, 'autoplay', {
                                        get: () => false,
                                        set: () => true
                                    });
                                    Object.defineProperty(player.options, 'scroll', {
                                        get: () => false,
                                        set: () => true
                                    });
                                    return player;
                                }
                            });
                        }
                    });
                    let _setAttribute = Function.prototype.apply.bind(_Element.setAttribute);
                    let isAutoplay = /^autoplay$/i;
                    _Element.setAttribute = function setAttribute(name) {
                        if (!this._stopped && isAutoplay.test(name)) {
                            _console.log('Prevented assigning autoplay attribute.');
                            return null;
                        }
                        return _setAttribute(this, arguments);
                    };
                } else {
                    _console.log('EaglePlayer function already exists.');
                    if (inIFrame) {
                        let _setAttribute = Function.prototype.apply.bind(_Element.setAttribute);
                        let isAutoplay = /^autoplay$/i;
                        _Element.setAttribute = function setAttribute(name) {
                            if (!this._stopped && isAutoplay.test(name)) {
                                _console.log('Prevented assigning autoplay attribute.');
                                this._stopped = true;
                                this.play = () => {
                                    _console.log('Prevented attempt to force-start playback.');
                                    delete this.play;
                                };
                                return null;
                            }
                            return _setAttribute(this, arguments);
                        };
                    }
                }
                if (location.hostname.endsWith('.media.eagleplatform.com'))
                    return;
                let nt = new nullTools();
                // Adblock Detector
                let _hidden = void 0;
                let ABD_user = {};
                [
                    'getOrSetUid', 'getSyncFPruid', 'getRuid',
                    'updateDetectCount', 'getSplitCookies'
                ].forEach(name => void(ABD_user[name] = nt.func(null, `ABD.user.${name}`)));
                Object.defineProperty(win, 'QW50aS1BZEJsb2Nr', {
                    set: vl => {
                        for (let name in vl) delete vl[name];
                        nt.define(vl, 'Detector', nt.proxy({
                            getBlockingStatus: () => new Promise(),
                            blockingDetectors: [],
                            baitURLPrefix: '',
                            commonRules: []
                        }));
                        nt.define(vl, 'isAdBlockFlag', '');
                        nt.define(vl, 'ruid', '');
                        nt.define(vl, 'user', nt.proxy(ABD_user));
                        _console.log('Found Adblock Detector.');
                        _hidden = vl;
                    },
                    get: () => _hidden
                });
                // some logging
                yandexRavenStub();
                // prevent ads from loading
                let blockPatterns = /\[[a-z]{1,4}\("0x[\da-f]+"\)\]|\.(rnet\.plus|24smi\.net|infox\.sg|lentainform\.com)\//i;
                let _toString = Function.prototype.call.bind(Function.prototype.toString);
                let _setTimeout = Function.prototype.apply.bind(win.setTimeout);
                win.setTimeout = function(f) {
                    //_console.log('setTimeout', ...arguments);
                    if (blockPatterns.test(_toString(f))) {
                        _console.warn('Stopped setTimeout for:', _toString(f).slice(0,100), '\u2026');
                        return null;
                    };
                    return _setTimeout(this, arguments);
                };
                // fake global Adf object
                let Adf_banner = {};
                let autoresolvePromise = () => new Promise(r => r({status: true}));
                [
                    'reloadssp', 'sspScroll', 'sspRich', 'ssp', 'init'
                ].forEach(name => void(Adf_banner[name] = nt.proxy(autoresolvePromise)));
                let Adf_util = {
                    stack: nt.func(null, 'Adf.util.stack')
                };
                nt.define(win, 'Adf', nt.proxy({
                    banner: nt.proxy(Adf_banner),
                    util: nt.proxy(Adf_util),
                }));
                nt.define(win, 'AdfProxy', nt.proxy(Adf_banner));
                // extra script to remove partner news on gazeta.ru
                if (!location.hostname.includes('gazeta.ru'))
                    return;
                (new MutationObserver(
                    (ms) => {
                        let m, node, header;
                        for (m of ms) for (node of m.addedNodes)
                            if (node instanceof HTMLDivElement && node.matches('.sausage')) {
                                header = node.querySelector('.sausage-header');
                                if (header && /новости\s+партн[её]ров/i.test(header.textContent))
                                    node.style.display = 'none';
                            }
                    }
                )).observe(_document.documentElement, { childList:true, subtree: true });
            }, `let inIFrame = ${inIFrame}`, nullTools, yandexRavenStub)
        }
    };

    scripts['reactor.cc'] = {
        other: ['joyreactor.cc', 'pornreactor.cc'],
        now: () => {
            selectiveEval();
            scriptLander(() => {
                let nt = new nullTools();
                win.open = function(){
                    throw new Error('Redirect prevention.');
                };
                nt.define(win, 'Worker', function(){});
                nt.define(win, 'JRCH', win.CoinHive);
            }, nullTools);
        },
        click: function(e) {
            let node = e.target;
            if (node.nodeType === _Node.ELEMENT_NODE &&
                node.style.position === 'absolute' &&
                node.style.zIndex > 0)
                node.parentNode.removeChild(node);
        },
        dom: function() {
            let tid = void 0;
            function probe() {
                let node = selectNodeByTextContent('блокировщик рекламы');
                if (!node) return;
                while (node.parentNode.offsetHeight < 750 && node !== _document.body)
                    node = node.parentNode;
                _setAttribute(node, 'style', 'background:none!important');
                // stop observer
                if (!tid) tid = setTimeout(() => this.disconnect(), 1000);
            }
            (new MutationObserver(probe))
                .observe(_document, { childList:true, subtree:true });
        }
    };

    scripts['auto.ru'] = () => {
        let words = /Реклама|Яндекс.Директ|yandex_ad_/;
        let userAdsListAds = (
            '.listing-list > .listing-item,'+
            '.listing-item_type_fixed.listing-item'
        );
        let catalogAds = (
            'div[class*="layout_catalog-inline"],'+
            'div[class$="layout_horizontal"]'
        );
        let otherAds = (
            '.advt_auto,'+
            '.sidebar-block,'+
            '.pager-listing + div[class],'+
            '.card > div[class][style],'+
            '.sidebar > div[class],'+
            '.main-page__section + div[class],'+
            '.listing > tbody'
        );
        gardener(userAdsListAds, words, {root:'.listing-wrap', observe:true});
        gardener(catalogAds, words, {root:'.catalog__page,.content__wrapper', observe:true});
        gardener(otherAds, words);
    };

    scripts['rsload.net'] = {
        load: () => {
            let dis = _document.querySelector('label[class*="cb-disable"]');
            if (dis)
                dis.click();
        },
        click: e => {
            let t = e.target;
            if (t && t.href && (/:\/\/\d+\.\d+\.\d+\.\d+\//.test(t.href)))
                t.href = t.href.replace('://','://rsload.net:rsload.net@');
        }
    };

    let domain;
    // add alternative domain names if present and wrap functions into objects
    for (let name in scripts) {
        if (scripts[name] instanceof Function)
            scripts[name] = { now: scripts[name] };
        for (domain of (scripts[name].other||[])) {
            if (domain in scripts)
                _console.log('Error in scripts list. Script for', name, 'replaced script for', domain);
            scripts[domain] = scripts[name];
        }
        delete scripts[name].other;
    }
    // look for current domain in the list and run appropriate code
    domain = _document.domain;
    while (domain.includes('.')) {
        if (domain in scripts) for (let when in scripts[domain])
            switch(when) {
                case 'now':
                    scripts[domain][when]();
                    break;
                case 'dom':
                    _document.addEventListener('DOMContentLoaded', scripts[domain][when], false);
                    break;
                default:
                    _document.addEventListener (when, scripts[domain][when], false);
            }
        domain = domain.slice(domain.indexOf('.') + 1);
    }

    // Batch script lander
    if (!skipLander)
        landScript(batchLand, batchPrepend);

    { // JS Fixes Tools Menu
        let openOptions = function() {
            let ovl = _createElement('div'),
                inner = _createElement('div');
            ovl.style = (
                'position: fixed;'+
                'top:0; left:0;'+
                'bottom: 0; right: 0;'+
                'background: rgba(0,0,0,0.85);'+
                'z-index: 2147483647;'+
                'padding: 5em'
            );
            inner.style = (
                'background: whitesmoke;'+
                'font-size: 10pt;'+
                'color: black;'+
                'padding: 1em'
            );
            inner.textContent = 'JS Fixes Tools';
            inner.appendChild(_createElement('br'));
            inner.appendChild(_createElement('br'));
            ovl.addEventListener(
                'click', function(e) {
                    if (e.target === ovl) {
                        ovl.parentNode.removeChild(ovl);
                        e.preventDefault();
                    }
                    e.stopPropagation();
                }, false
            );

            let sObjBtn = _createElement('button');
            sObjBtn.onclick = getStrangeObjectsList;
            sObjBtn.textContent = 'Print (in console) list of unusual window properties';
            inner.appendChild(_createElement('br'));
            inner.appendChild(sObjBtn);

            _document.body.appendChild(ovl);
            ovl.appendChild(inner);
        };

        // monitor keys pressed for Ctrl+Alt+Shift+J > s > f code
        let opPos = 0, opKey = ['KeyJ','KeyS','KeyF'];
        _document.addEventListener(
            'keydown', function(e) {
                if ((e.code === opKey[opPos] || e.location) &&
                    (!!opPos || e.altKey && e.ctrlKey && e.shiftKey)) {
                    opPos += e.location ? 0 : 1;
                    e.stopPropagation();
                    e.preventDefault();
                } else
                    opPos = 0;
                if (opPos === opKey.length) {
                    opPos = 0;
                    openOptions();
                }
            }, false
        );
    }
})();