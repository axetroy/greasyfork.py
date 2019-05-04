// ==UserScript==
// @name         知乎zhihu当前问题回答者列表
// @namespace    http://tampermonkey.net/
// @version      1.0.7
// @description  问题回答者列表 支持跳转到答案
// @description  [zhihu] [list] [location]
// @require      https://cdn.bootcss.com/gator/1.2.4/gator.min.js
// @author       You
// @match        https://www.zhihu.com/question/*
// @grant        none
// ==/UserScript==
function init() {
    "use strict";
    var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };

    function _toConsumableArray(e) {
        if (Array.isArray(e)) {
            for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
            return n
        }
        return Array.from(e)
    }
    var jsPanel = {
        version: "4.2.1",
        date: "2018-09-14 13:11",
        ajaxAlwaysCallbacks: [],
        autopositionSpacing: 4,
        closeOnEscape: void document.addEventListener("keydown", function(e) {
            "Escape" !== e.key && "Esc" !== e.code && 27 !== e.keyCode || jsPanel.getPanels(function() {
                return this.classList.contains("jsPanel")
            }).some(function(e) {
                return !!e.options.closeOnEscape && (e.close(), !0)
            })
        }, !1),
        defaults: {
            boxShadow: 3,
            container: document.body,
            contentSize: {
                width: "400px",
                height: "200px"
            },
            dragit: {
                cursor: "move",
                handles: ".jsPanel-headerlogo, .jsPanel-titlebar, .jsPanel-ftr",
                opacity: .8,
                disableOnMaximized: !0
            },
            header: !0,
            headerTitle: "jsPanel",
            headerControls: "all",
            iconfont: !1,
            maximizedMargin: 0,
            minimizeTo: "default",
            paneltype: "standard",
            position: "center",
            resizeit: {
                handles: "n, e, s, w, ne, se, sw, nw",
                minWidth: 128,
                minHeight: 128
            },
            theme: "default"
        },
        defaultSnapConfig: {
            sensitivity: 70,
            trigger: "panel"
        },
        error: void(window.jsPanelError || (window.jsPanelError = function(e) {
            this.name = "jsPanelError", this.message = e || "", this.stack = (new Error).stack
        }, window.jsPanelError.prototype = Object.create(Error.prototype), window.jsPanelError.prototype.constructor = window.jsPanelError)),
        extensions: {},
        globalCallbacks: !1,
        icons: {
            close: '<svg class="jsPanel-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28"><path fill="currentColor" d="M17.75 16l9.85-9.85c0.5-0.5 0.5-1.3 0-1.75-0.5-0.5-1.3-0.5-1.75 0l-9.85 9.85-9.85-9.9c-0.5-0.5-1.3-0.5-1.75 0-0.5 0.5-0.5 1.3 0 1.75l9.85 9.9-9.9 9.85c-0.5 0.5-0.5 1.3 0 1.75 0.25 0.25 0.55 0.35 0.9 0.35s0.65-0.1 0.9-0.35l9.85-9.85 9.85 9.85c0.25 0.25 0.55 0.35 0.9 0.35s0.65-0.1 0.9-0.35c0.5-0.5 0.5-1.3 0-1.75l-9.9-9.85z"></path></svg>',
            maximize: '<svg class="jsPanel-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28"><path fill="currentColor" d="M27.55 3.9h-22.6c-0.55 0-1 0.45-1 1v22.3c0 0.55 0.45 1 1 1h22.55c0.55 0 1-0.45 1-1v-22.3c0.050-0.55-0.4-1-0.95-1zM5.95 26.15v-18h20.55v18h-20.55z"></path></svg>',
            normalize: '<svg class="jsPanel-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28"><path fill="currentColor" d="M27.9 3.75h-18.8c-0.4 0-0.75 0.35-0.75 0.75v4.3c0 0.1 0 0.2 0.050 0.3h-4.2c-0.55 0-1 0.45-1 1v17.4c0 0.55 0.45 1 1 1h17.65c0.55 0 1-0.45 1-1v-3.7c0.050 0 0.1 0.050 0.2 0.050h4.9c0.4 0 0.75-0.35 0.75-0.75v-18.6c-0.050-0.4-0.4-0.75-0.8-0.75zM5.2 26.5v-12.95c0.050 0 0.1 0 0.15 0h15.4c0.050 0 0.1 0 0.15 0v12.95h-15.7zM27.15 22.35h-4.15c-0.050 0-0.15 0-0.2 0.050v-12.3c0-0.55-0.45-1-1-1h-12c0.050-0.1 0.050-0.2 0.050-0.3v-3.55h17.3v17.1z"></path></svg>',
            minimize: '<svg class="jsPanel-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28"><path fill="currentColor" d="M27.3 28.5h-22.6c-0.85 0-1.5-0.65-1.5-1.5s0.65-1.5 1.5-1.5h22.55c0.85 0 1.5 0.65 1.5 1.5s-0.65 1.5-1.45 1.5z"></path></svg>',
            smallifyrev: '<svg class="jsPanel-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28"><path fill="currentColor" d="M15.95 23.2c0 0 0 0 0 0-0.35 0-0.65-0.15-0.9-0.35l-11.7-11.9c-0.5-0.5-0.5-1.3 0-1.75 0.5-0.5 1.3-0.5 1.75 0l10.85 10.95 10.9-10.8c0.5-0.5 1.3-0.5 1.75 0s0.5 1.3 0 1.75l-11.75 11.7c-0.25 0.25-0.55 0.4-0.9 0.4z"></path></svg>',
            smallify: '<svg class="jsPanel-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28"><path fill="currentColor" d="M28.65 20.85l-11.8-11.65c-0.5-0.5-1.3-0.5-1.75 0l-11.75 11.85c-0.5 0.5-0.5 1.3 0 1.75 0.25 0.25 0.55 0.35 0.9 0.35 0.3 0 0.65-0.1 0.9-0.35l10.85-10.95 10.9 10.8c0.5 0.5 1.3 0.5 1.75 0 0.5-0.5 0.5-1.3 0-1.8z"></path></svg>'
        },
        idCounter: 0,
        isIE: navigator.appVersion.match(/Trident/),
        mdbthemes: ["secondary", "elegant", "stylish", "unique", "special"],
        pointerdown: "ontouchend" in window ? ["touchstart", "mousedown"] : ["mousedown"],
        pointermove: "ontouchend" in window ? ["touchmove", "mousemove"] : ["mousemove"],
        pointerup: "ontouchend" in window ? ["touchend", "mouseup"] : ["mouseup"],
        polyfills: ([Element.prototype, Document.prototype, DocumentFragment.prototype].forEach(function(e) {
            e.append = e.append || function() {
                var e = Array.prototype.slice.call(arguments),
                    t = document.createDocumentFragment();
                e.forEach(function(e) {
                    var n = e instanceof Node;
                    t.appendChild(n ? e : document.createTextNode(String(e)))
                }), this.appendChild(t)
            }
        }), window.Element && !Element.prototype.closest && (Element.prototype.closest = function(e) {
            var t = (this.document || this.ownerDocument).querySelectorAll(e),
                n = void 0,
                o = this;
            do {
                for (n = t.length; --n >= 0 && t.item(n) !== o;);
            } while (n < 0 && (o = o.parentElement));
            return o
        }), window.NodeList && !NodeList.prototype.forEach && (NodeList.prototype.forEach = function(e, t) {
            t = t || window;
            for (var n = 0; n < this.length; n++) e.call(t, this[n], n, this)
        }), Object.assign || Object.defineProperty(Object, "assign", {
            enumerable: !1,
            configurable: !0,
            writable: !0,
            value: function(e) {
                if (null == e) throw new TypeError("Cannot convert first argument to object");
                for (var t = Object(e), n = 1; n < arguments.length; n++) {
                    var o = arguments[n];
                    if (null != o) {
                        o = Object(o);
                        for (var a = Object.keys(Object(o)), i = 0, r = a.length; i < r; i++) {
                            var s = a[i],
                                l = Object.getOwnPropertyDescriptor(o, s);
                            void 0 !== l && l.enumerable && (t[s] = o[s])
                        }
                    }
                }
                return t
            }
        }), function() {
            if ("function" == typeof window.CustomEvent) return !1;

            function e(e, t) {
                t = t || {
                    bubbles: !1,
                    cancelable: !1,
                    detail: void 0
                };
                var n = document.createEvent("CustomEvent");
                return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n
            }
            e.prototype = window.Event.prototype, window.CustomEvent = e
        }(), String.prototype.endsWith || (String.prototype.endsWith = function(e, t) {
            return t < this.length ? t |= 0 : t = this.length, this.substr(t - e.length, e.length) === e
        }), void(String.prototype.startsWith || (String.prototype.startsWith = function(e, t) {
            return this.substr(t || 0, e.length) === e
        }))),
        themes: ["default", "primary", "info", "success", "warning", "danger"],
        ziBase: 100,
        addScript: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "text/javascript",
                n = arguments[2],
                o = document.createElement("script");
            o.onload = n, o.src = e, o.type = t, document.head.appendChild(o)
        },
        ajax: function ajax(obj, ajaxConfig) {
            var objIsPanel = void 0;
            "object" === (void 0 === obj ? "undefined" : _typeof(obj)) && obj.classList.contains("jsPanel") ? objIsPanel = !0 : (objIsPanel = !1, "string" == typeof obj && (obj = document.querySelector(obj)));
            var conf = ajaxConfig,
                configDefaults = {
                    method: "GET",
                    async: !0,
                    user: "",
                    pwd: "",
                    done: function() {
                        objIsPanel ? obj.content.innerHTML = this.responseText : obj.innerHTML = this.responseText
                    },
                    autoresize: !0,
                    autoreposition: !0
                },
                config = void 0;
            if ("string" == typeof conf) config = Object.assign({}, configDefaults, {
                url: encodeURI(conf),
                evalscripttags: !0
            });
            else {
                if ("object" !== (void 0 === conf ? "undefined" : _typeof(conf)) || !conf.url) return console.info("XMLHttpRequest seems to miss the request url!"), obj;
                config = Object.assign({}, configDefaults, conf), config.url = encodeURI(conf.url), !1 === config.async && (config.timeout = 0, config.withCredentials && (config.withCredentials = void 0), config.responseType && (config.responseType = void 0))
            }
            var xhr = new XMLHttpRequest;
            return xhr.onreadystatechange = function() {
                if (4 === xhr.readyState) {
                    if (200 === xhr.status) {
                        if (config.done.call(xhr, obj), config.evalscripttags) {
                            var scripttags = xhr.responseText.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gi);
                            scripttags && scripttags.forEach(function(tag) {
                                var js = tag.replace(/<script\b[^>]*>/i, "").replace(/<\/script>/i, "").trim();
                                eval(js)
                            })
                        }
                    } else config.fail && config.fail.call(xhr, obj);
                    if (config.always && config.always.call(xhr, obj), objIsPanel) {
                        var oContentSize = obj.options.contentSize;
                        if ("string" == typeof oContentSize && oContentSize.match(/auto/i)) {
                            var parts = oContentSize.split(" "),
                                sizes = Object.assign({}, {
                                    width: parts[0],
                                    height: parts[1]
                                });
                            config.autoresize && obj.resize(sizes), obj.classList.contains("jsPanel-contextmenu") || config.autoreposition && obj.reposition()
                        } else if ("object" === (void 0 === oContentSize ? "undefined" : _typeof(oContentSize)) && ("auto" === oContentSize.width || "auto" === oContentSize.height)) {
                            var _sizes = Object.assign({}, oContentSize);
                            config.autoresize && obj.resize(_sizes), obj.classList.contains("jsPanel-contextmenu") || config.autoreposition && obj.reposition()
                        }
                    }
                    jsPanel.ajaxAlwaysCallbacks.length && jsPanel.ajaxAlwaysCallbacks.forEach(function(e) {
                        e.call(obj, obj)
                    })
                }
            }, xhr.open(config.method, config.url, config.async, config.user, config.pwd), xhr.timeout = config.timeout || 0, config.withCredentials && (xhr.withCredentials = config.withCredentials), config.responseType && (xhr.responseType = config.responseType), config.beforeSend && config.beforeSend.call(xhr), config.data ? xhr.send(config.data) : xhr.send(null), obj
        },
        calcColors: function(e) {
            var t = this.color(e),
                n = this.lighten(e, .81),
                o = this.darken(e, .5),
                a = this.perceivedBrightness(e) <= .556 ? "#ffffff" : "#000000",
                i = this.perceivedBrightness(n) <= .556 ? "#ffffff" : "#000000",
                r = this.perceivedBrightness(o) <= .556 ? "#000000" : "#ffffff";
            return [t.hsl.css, n, o, a, i, r]
        },
        color: function(e) {
            var t = e.toLowerCase(),
                n = void 0,
                o = void 0,
                a = void 0,
                i = void 0,
                r = void 0,
                s = void 0,
                l = void 0,
                c = void 0,
                d = void 0,
                f = {},
                p = /^rgba?\(([0-9]{1,3}),([0-9]{1,3}),([0-9]{1,3}),?(0|1|0\.[0-9]{1,2}|\.[0-9]{1,2})?\)$/gi,
                h = /^hsla?\(([0-9]{1,3}),([0-9]{1,3}%),([0-9]{1,3}%),?(0|1|0\.[0-9]{1,2}|\.[0-9]{1,2})?\)$/gi,
                u = {
                    aliceblue: "f0f8ff",
                    antiquewhite: "faebd7",
                    aqua: "0ff",
                    aquamarine: "7fffd4",
                    azure: "f0ffff",
                    beige: "f5f5dc",
                    bisque: "ffe4c4",
                    black: "000",
                    blanchedalmond: "ffebcd",
                    blue: "00f",
                    blueviolet: "8a2be2",
                    brown: "a52a2a",
                    burlywood: "deb887",
                    cadetblue: "5f9ea0",
                    chartreuse: "7fff00",
                    chocolate: "d2691e",
                    coral: "ff7f50",
                    cornflowerblue: "6495ed",
                    cornsilk: "fff8dc",
                    crimson: "dc143c",
                    cyan: "0ff",
                    darkblue: "00008b",
                    darkcyan: "008b8b",
                    darkgoldenrod: "b8860b",
                    darkgray: "a9a9a9",
                    darkgrey: "a9a9a9",
                    darkgreen: "006400",
                    darkkhaki: "bdb76b",
                    darkmagenta: "8b008b",
                    darkolivegreen: "556b2f",
                    darkorange: "ff8c00",
                    darkorchid: "9932cc",
                    darkred: "8b0000",
                    darksalmon: "e9967a",
                    darkseagreen: "8fbc8f",
                    darkslateblue: "483d8b",
                    darkslategray: "2f4f4f",
                    darkslategrey: "2f4f4f",
                    darkturquoise: "00ced1",
                    darkviolet: "9400d3",
                    deeppink: "ff1493",
                    deepskyblue: "00bfff",
                    dimgray: "696969",
                    dimgrey: "696969",
                    dodgerblue: "1e90ff",
                    firebrick: "b22222",
                    floralwhite: "fffaf0",
                    forestgreen: "228b22",
                    fuchsia: "f0f",
                    gainsboro: "dcdcdc",
                    ghostwhite: "f8f8ff",
                    gold: "ffd700",
                    goldenrod: "daa520",
                    gray: "808080",
                    grey: "808080",
                    green: "008000",
                    greenyellow: "adff2f",
                    honeydew: "f0fff0",
                    hotpink: "ff69b4",
                    indianred: "cd5c5c",
                    indigo: "4b0082",
                    ivory: "fffff0",
                    khaki: "f0e68c",
                    lavender: "e6e6fa",
                    lavenderblush: "fff0f5",
                    lawngreen: "7cfc00",
                    lemonchiffon: "fffacd",
                    lightblue: "add8e6",
                    lightcoral: "f08080",
                    lightcyan: "e0ffff",
                    lightgoldenrodyellow: "fafad2",
                    lightgray: "d3d3d3",
                    lightgrey: "d3d3d3",
                    lightgreen: "90ee90",
                    lightpink: "ffb6c1",
                    lightsalmon: "ffa07a",
                    lightseagreen: "20b2aa",
                    lightskyblue: "87cefa",
                    lightslategray: "789",
                    lightslategrey: "789",
                    lightsteelblue: "b0c4de",
                    lightyellow: "ffffe0",
                    lime: "0f0",
                    limegreen: "32cd32",
                    linen: "faf0e6",
                    magenta: "f0f",
                    maroon: "800000",
                    mediumaquamarine: "66cdaa",
                    mediumblue: "0000cd",
                    mediumorchid: "ba55d3",
                    mediumpurple: "9370d8",
                    mediumseagreen: "3cb371",
                    mediumslateblue: "7b68ee",
                    mediumspringgreen: "00fa9a",
                    mediumturquoise: "48d1cc",
                    mediumvioletred: "c71585",
                    midnightblue: "191970",
                    mintcream: "f5fffa",
                    mistyrose: "ffe4e1",
                    moccasin: "ffe4b5",
                    navajowhite: "ffdead",
                    navy: "000080",
                    oldlace: "fdf5e6",
                    olive: "808000",
                    olivedrab: "6b8e23",
                    orange: "ffa500",
                    orangered: "ff4500",
                    orchid: "da70d6",
                    palegoldenrod: "eee8aa",
                    palegreen: "98fb98",
                    paleturquoise: "afeeee",
                    palevioletred: "d87093",
                    papayawhip: "ffefd5",
                    peachpuff: "ffdab9",
                    peru: "cd853f",
                    pink: "ffc0cb",
                    plum: "dda0dd",
                    powderblue: "b0e0e6",
                    purple: "800080",
                    rebeccapurple: "639",
                    red: "f00",
                    rosybrown: "bc8f8f",
                    royalblue: "4169e1",
                    saddlebrown: "8b4513",
                    salmon: "fa8072",
                    sandybrown: "f4a460",
                    seagreen: "2e8b57",
                    seashell: "fff5ee",
                    sienna: "a0522d",
                    silver: "c0c0c0",
                    skyblue: "87ceeb",
                    slateblue: "6a5acd",
                    slategray: "708090",
                    slategrey: "708090",
                    snow: "fffafa",
                    springgreen: "00ff7f",
                    steelblue: "4682b4",
                    tan: "d2b48c",
                    teal: "008080",
                    thistle: "d8bfd8",
                    tomato: "ff6347",
                    turquoise: "40e0d0",
                    violet: "ee82ee",
                    wheat: "f5deb3",
                    white: "fff",
                    whitesmoke: "f5f5f5",
                    yellow: "ff0",
                    yellowgreen: "9acd32"
                };
            return u[t] && (t = u[t]), null !== t.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/gi) ? (t = t.replace("#", ""), t.length % 2 == 1 ? (n = String(t.substr(0, 1)) + t.substr(0, 1), o = String(t.substr(1, 1)) + t.substr(1, 1), a = String(t.substr(2, 1)) + t.substr(2, 1), f.rgb = {
                r: parseInt(n, 16),
                g: parseInt(o, 16),
                b: parseInt(a, 16)
            }, f.hex = "#" + n + o + a) : (f.rgb = {
                r: parseInt(t.substr(0, 2), 16),
                g: parseInt(t.substr(2, 2), 16),
                b: parseInt(t.substr(4, 2), 16)
            }, f.hex = "#" + t), d = this.rgbToHsl(f.rgb.r, f.rgb.g, f.rgb.b), f.hsl = d, f.rgb.css = "rgb(" + f.rgb.r + "," + f.rgb.g + "," + f.rgb.b + ")") : t.match(p) ? (l = p.exec(t), f.rgb = {
                css: t,
                r: l[1],
                g: l[2],
                b: l[3]
            }, f.hex = this.rgbToHex(l[1], l[2], l[3]), d = this.rgbToHsl(l[1], l[2], l[3]), f.hsl = d) : t.match(h) ? (i = (l = h.exec(t))[1] / 360, r = l[2].substr(0, l[2].length - 1) / 100, s = l[3].substr(0, l[3].length - 1) / 100, c = this.hslToRgb(i, r, s), f.rgb = {
                css: "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")",
                r: c[0],
                g: c[1],
                b: c[2]
            }, f.hex = this.rgbToHex(f.rgb.r, f.rgb.g, f.rgb.b), f.hsl = {
                css: "hsl(" + l[1] + "," + l[2] + "," + l[3] + ")",
                h: l[1],
                s: l[2],
                l: l[3]
            }) : (f.hex = "#f5f5f5", f.rgb = {
                css: "rgb(245,245,245)",
                r: 245,
                g: 245,
                b: 245
            }, f.hsl = {
                css: "hsl(0,0%,96.08%)",
                h: 0,
                s: "0%",
                l: "96.08%"
            }), f
        },
        createPanelTemplate: function() {
            var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
                t = document.createElement("div");
            return t.className = "jsPanel", e && ["close", "maximize", "normalize", "minimize", "smallify", "smallifyrev"].forEach(function(e) {
                t.setAttribute("data-btn" + e, "enabled")
            }), t.innerHTML = '<div class="jsPanel-hdr">\n                                <div class="jsPanel-headerbar">\n                                    <div class="jsPanel-headerlogo"></div>\n                                    <div class="jsPanel-titlebar">\n                                        <span class="jsPanel-title"></span>\n                                    </div>\n                                    <div class="jsPanel-controlbar">\n                                        <div class="jsPanel-btn jsPanel-btn-smallify">' + this.icons.smallify + '</div>\n                                        <div class="jsPanel-btn jsPanel-btn-smallifyrev">' + this.icons.smallifyrev + '</div>\n                                        <div class="jsPanel-btn jsPanel-btn-minimize">' + this.icons.minimize + '</div>\n                                        <div class="jsPanel-btn jsPanel-btn-normalize">' + this.icons.normalize + '</div>\n                                        <div class="jsPanel-btn jsPanel-btn-maximize">' + this.icons.maximize + '</div>\n                                        <div class="jsPanel-btn jsPanel-btn-close">' + this.icons.close + '</div>\n                                    </div>\n                                </div>\n                                <div class="jsPanel-hdr-toolbar"></div>\n                            </div>\n                            <div class="jsPanel-content"></div>\n                            <div class="jsPanel-minimized-box"></div>\n                            <div class="jsPanel-ftr"></div>', t
        },
        createMinimizedTemplate: function() {
            var e = document.createElement("div");
            return e.className = "jsPanel-replacement", e.innerHTML = '<div class="jsPanel-hdr">\n                                <div class="jsPanel-headerbar">\n                                    <div class="jsPanel-headerlogo"></div>\n                                    <div class="jsPanel-titlebar">\n                                        <span class="jsPanel-title"></span>\n                                    </div>\n                                    <div class="jsPanel-controlbar">\n                                        <div class="jsPanel-btn jsPanel-btn-normalize">' + this.icons.normalize + '</div>\n                                        <div class="jsPanel-btn jsPanel-btn-maximize">' + this.icons.maximize + '</div>\n                                        <div class="jsPanel-btn jsPanel-btn-close">' + this.icons.close + "</div>\n                                    </div>\n                                </div>\n                            </div>", e
        },
        createSnapArea: function(e, t, n) {
            var o = document.createElement("div"),
                a = e.parentElement;
            o.className = "jsPanel-snap-area jsPanel-snap-area-" + t, "lt" === t || "rt" === t || "rb" === t || "lb" === t ? (o.style.width = n + "px", o.style.height = n + "px") : "ct" === t || "cb" === t ? o.style.height = n + "px" : "lc" !== t && "rc" !== t || (o.style.width = n + "px"), a !== document.body && (o.style.position = "absolute"), document.querySelector(".jsPanel-snap-area.jsPanel-snap-area-" + t) || e.parentElement.appendChild(o)
        },
        darken: function(e, t) {
            var n = this.color(e).hsl,
                o = parseFloat(n.l),
                a = o - o * t + "%";
            return "hsl(" + n.h + "," + n.s + "," + a + ")"
        },
        dragit: function(e) {
            var t, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                o = void 0,
                a = Object.assign({}, this.defaults.dragit, n),
                i = void 0,
                r = new CustomEvent("jspaneldragstart", {
                    detail: e.id
                }),
                s = new CustomEvent("jspaneldrag", {
                    detail: e.id
                }),
                l = new CustomEvent("jspaneldragstop", {
                    detail: e.id
                });
            return a.grid && Array.isArray(a.grid) && 1 === a.grid.length && (a.grid[1] = a.grid[0]), t = this.pOcontainment(a.containment), e.querySelectorAll(a.handles).forEach(function(n) {
                n.style.touchAction = "none", n.style.cursor = a.cursor, jsPanel.pointerdown.forEach(function(l) {
                    n.addEventListener(l, function(n) {
                        if (n.preventDefault(), n.button && n.button > 0) return !1;
                        if (!n.target.closest(".jsPanel-ftr-btn")) {
                            e.controlbar.style.pointerEvents = "none", e.content.style.pointerEvents = "none";
                            var l = window.getComputedStyle(e),
                                c = parseFloat(l.left),
                                d = parseFloat(l.top),
                                f = n.touches ? n.touches[0].clientX : n.clientX,
                                p = n.touches ? n.touches[0].clientY : n.clientY,
                                h = e.parentElement,
                                u = h.getBoundingClientRect(),
                                m = window.getComputedStyle(h),
                                g = 0;
                            i = function(n) {
                                if (n.preventDefault(), !o) {
                                    if (document.dispatchEvent(r), e.style.opacity = a.opacity, e.snapped && a.snap.resizeToPreSnap && e.currentData.beforeSnap) {
                                        e.resize(e.currentData.beforeSnap.width + " " + e.currentData.beforeSnap.height);
                                        var i = e.getBoundingClientRect(),
                                            l = f - (i.left + i.width),
                                            b = i.width / 2;
                                        l > -b && (g = l + b)
                                    }
                                    a.start && jsPanel.processCallbacks(e, a.start, !1, {
                                        left: c,
                                        top: d
                                    }), jsPanel.front(e), e.snapped = !1
                                }
                                if (o = 1, a.disableOnMaximized && "maximized" === e.status) return !1;
                                var y = void 0,
                                    v = void 0,
                                    w = void 0,
                                    j = void 0,
                                    P = void 0,
                                    z = void 0,
                                    C = void 0,
                                    x = void 0,
                                    E = void 0,
                                    S = void 0,
                                    T = n.touches ? n.touches[0].clientX : n.clientX,
                                    L = n.touches ? n.touches[0].clientY : n.clientY,
                                    k = window.getComputedStyle(e);
                                if (h === document.body) {
                                    var F = e.getBoundingClientRect();
                                    E = window.innerWidth - parseInt(m.borderLeftWidth, 10) - parseInt(m.borderRightWidth, 10) - (F.left + F.width), S = window.innerHeight - parseInt(m.borderTopWidth, 10) - parseInt(m.borderBottomWidth, 10) - (F.top + F.height)
                                } else E = parseInt(m.width, 10) - parseInt(m.borderLeftWidth, 10) - parseInt(m.borderRightWidth, 10) - (parseInt(k.left, 10) + parseInt(k.width, 10)), S = parseInt(m.height, 10) - parseInt(m.borderTopWidth, 10) - parseInt(m.borderBottomWidth, 10) - (parseInt(k.top, 10) + parseInt(k.height, 10));
                                y = parseFloat(k.left), w = parseFloat(k.top), P = E, C = S, a.snap && ("panel" === a.snap.trigger ? v = Math.pow(y, 2) : "pointer" === a.snap.trigger && (y = T, v = Math.pow(T, 2), w = L, P = window.innerWidth - T, C = window.innerHeight - L), j = Math.pow(w, 2), z = Math.pow(P, 2), x = Math.pow(C, 2));
                                var q = Math.sqrt(v + j),
                                    A = Math.sqrt(v + x),
                                    O = Math.sqrt(z + j),
                                    M = Math.sqrt(z + x),
                                    R = Math.abs(y - P) / 2,
                                    W = Math.abs(w - C) / 2,
                                    I = Math.sqrt(v + Math.pow(W, 2)),
                                    B = Math.sqrt(j + Math.pow(R, 2)),
                                    H = Math.sqrt(z + Math.pow(W, 2)),
                                    D = Math.sqrt(x + Math.pow(R, 2));
                                if (window.getSelection().removeAllRanges(), document.dispatchEvent(s), a.axis && "x" !== a.axis || (e.style.left = c + (T - f) + g + "px"), a.axis && "y" !== a.axis || (e.style.top = d + (L - p) + "px"), a.grid) {
                                    var $ = parseFloat(k.left),
                                        N = parseFloat(k.top),
                                        X = $ % a.grid[0],
                                        Y = N % a.grid[1];
                                    X < a.grid[0] / 2 ? e.style.left = $ - X + "px" : e.style.left = $ + (a.grid[0] - X) + "px", Y < a.grid[1] / 2 ? e.style.top = N - Y + "px" : e.style.top = N + (a.grid[1] - Y) + "px"
                                }
                                if (a.containment || 0 === a.containment) {
                                    var _ = void 0,
                                        V = void 0;
                                    if (e.options.container === document.body) _ = window.innerWidth - parseFloat(k.width) - t[1], V = window.innerHeight - parseFloat(k.height) - t[2];
                                    else {
                                        var U = parseFloat(m.borderLeftWidth) + parseFloat(m.borderRightWidth),
                                            Z = parseFloat(m.borderTopWidth) + parseFloat(m.borderBottomWidth);
                                        _ = u.width - parseFloat(k.width) - t[1] - U, V = u.height - parseFloat(k.height) - t[2] - Z
                                    }
                                    parseFloat(e.style.left) <= t[3] && (e.style.left = t[3] + "px"), parseFloat(e.style.top) <= t[0] && (e.style.top = t[0] + "px"), parseFloat(e.style.left) >= _ && (e.style.left = _ + "px"), parseFloat(e.style.top) >= V && (e.style.top = V + "px")
                                }
                                if (a.drag && jsPanel.processCallbacks(e, a.drag, !1, {
                                        left: y,
                                        top: w,
                                        right: P,
                                        bottom: C
                                    }), a.snap) {
                                    var G = a.snap.sensitivity,
                                        J = h === document.body ? window.innerWidth / 8 : u.width / 8,
                                        K = h === document.body ? window.innerHeight / 8 : u.height / 8;
                                    e.snappableTo = !1, jsPanel.removeSnapAreas(e), q < G ? (e.snappableTo = "left-top", !1 !== a.snap.snapLeftTop && jsPanel.createSnapArea(e, "lt", G)) : A < G ? (e.snappableTo = "left-bottom", !1 !== a.snap.snapLeftBottom && jsPanel.createSnapArea(e, "lb", G)) : O < G ? (e.snappableTo = "right-top", !1 !== a.snap.snapRightTop && jsPanel.createSnapArea(e, "rt", G)) : M < G ? (e.snappableTo = "right-bottom", !1 !== a.snap.snapRightBottom && jsPanel.createSnapArea(e, "rb", G)) : w < G && B < J ? (e.snappableTo = "center-top", !1 !== a.snap.snapCenterTop && jsPanel.createSnapArea(e, "ct", G)) : y < G && I < K ? (e.snappableTo = "left-center", !1 !== a.snap.snapLeftCenter && jsPanel.createSnapArea(e, "lc", G)) : P < G && H < K ? (e.snappableTo = "right-center", !1 !== a.snap.snapRightCenter && jsPanel.createSnapArea(e, "rc", G)) : C < G && D < J && (e.snappableTo = "center-bottom", !1 !== a.snap.snapCenterBottom && jsPanel.createSnapArea(e, "cb", G))
                                }
                            }, jsPanel.pointermove.forEach(function(e) {
                                document.addEventListener(e, i)
                            })
                        }
                    })
                }), jsPanel.pointerup.forEach(function(t) {
                    document.addEventListener(t, function() {
                        jsPanel.pointermove.forEach(function(e) {
                            document.removeEventListener(e, i)
                        }), document.body.style.overflow = "inherit", jsPanel.removeSnapAreas(e), o && (document.dispatchEvent(l), e.style.opacity = 1, o = void 0, e.saveCurrentPosition(), a.snap && ("left-top" === e.snappableTo ? jsPanel.snapPanel(e, a.snap.snapLeftTop) : "center-top" === e.snappableTo ? jsPanel.snapPanel(e, a.snap.snapCenterTop) : "right-top" === e.snappableTo ? jsPanel.snapPanel(e, a.snap.snapRightTop) : "right-center" === e.snappableTo ? jsPanel.snapPanel(e, a.snap.snapRightCenter) : "right-bottom" === e.snappableTo ? jsPanel.snapPanel(e, a.snap.snapRightBottom) : "center-bottom" === e.snappableTo ? jsPanel.snapPanel(e, a.snap.snapCenterBottom) : "left-bottom" === e.snappableTo ? jsPanel.snapPanel(e, a.snap.snapLeftBottom) : "left-center" === e.snappableTo && jsPanel.snapPanel(e, a.snap.snapLeftCenter), a.snap.callback && e.snappableTo && "function" == typeof a.snap.callback && a.snap.callback.call(e, e), e.snappableTo && a.snap.repositionOnSnap && e.repositionOnSnap(e.snappableTo)), a.stop && jsPanel.processCallbacks(e, a.stop, !1, {
                            left: parseFloat(e.style.left),
                            top: parseFloat(e.style.top)
                        })), e.controlbar.style.pointerEvents = "inherit", e.content.style.pointerEvents = "inherit"
                    })
                }), a.disable && (n.style.pointerEvents = "none")
            }), e
        },
        emptyNode: function(e) {
            for (; e.firstChild;) e.removeChild(e.firstChild);
            return e
        },
        extend: function(e) {
            if ("[object Object]" === Object.prototype.toString.call(e))
                for (var t in e) e.hasOwnProperty(t) && (this.extensions[t] = e[t])
        },
        fetch: function(e) {
            function t(t) {
                return e.apply(this, arguments)
            }
            return t.toString = function() {
                return e.toString()
            }, t
        }(function(obj) {
            var conf = obj.options.contentFetch,
                confDefaults = {
                    bodyMethod: "text",
                    evalscripttags: !0,
                    autoresize: !0,
                    autoreposition: !0,
                    done: function(e, t) {
                        e.content.innerHTML = t
                    }
                };
            conf = "string" == typeof conf ? Object.assign({
                resource: obj.options.contentFetch
            }, confDefaults) : Object.assign(confDefaults, conf);
            var fetchInit = conf.fetchInit || {};
            conf.beforeSend && conf.beforeSend.call(obj, obj), fetch(conf.resource, fetchInit).then(function(e) {
                if (e.ok) return e[conf.bodyMethod]();
                throw new Error("Network response was not ok.")
            }).then(function(response) {
                if (conf.done.call(obj, obj, response), conf.evalscripttags) {
                    var scripttags = response.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gi);
                    scripttags && scripttags.forEach(function(tag) {
                        var js = tag.replace(/<script\b[^>]*>/i, "").replace(/<\/script>/i, "").trim();
                        eval(js)
                    })
                }
                var oContentSize = obj.options.contentSize;
                if (conf.autoresize || conf.autoreposition)
                    if ("string" == typeof oContentSize && oContentSize.match(/auto/i)) {
                        var parts = oContentSize.split(" "),
                            sizes = Object.assign({}, {
                                width: parts[0],
                                height: parts[1]
                            });
                        conf.autoresize && obj.resize(sizes), obj.classList.contains("jsPanel-contextmenu") || conf.autoreposition && obj.reposition()
                    } else if ("object" === (void 0 === oContentSize ? "undefined" : _typeof(oContentSize)) && ("auto" === oContentSize.width || "auto" === oContentSize.height)) {
                    var _sizes2 = Object.assign({}, oContentSize);
                    conf.autoresize && obj.resize(_sizes2), obj.classList.contains("jsPanel-contextmenu") || conf.autoreposition && obj.reposition()
                }
            }).catch(function(e) {
                console.error("There has been a problem with your fetch operation: " + e.message)
            })
        }),
        front: function(e) {
            if ("minimized" === e.status) "maximized" === e.statusBefore ? e.maximize() : e.normalize();
            else {
                var t = Array.prototype.slice.call(document.querySelectorAll(".jsPanel-standard")).map(function(e) {
                    return e.style.zIndex
                });
                Math.max.apply(Math, _toConsumableArray(t)) > e.style.zIndex && (e.style.zIndex = jsPanel.zi.next()), this.resetZi()
            }
            this.getPanels().forEach(function(e, t) {
                var n = e.content.querySelector(".jsPanel-iframe-overlay");
                if (t > 0) {
                    if (e.content.querySelector("iframe") && !n) {
                        var o = document.createElement("div");
                        o.className = "jsPanel-iframe-overlay", e.content.appendChild(o)
                    }
                } else n && e.content.removeChild(n)
            })
        },
        getPanels: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {
                return this.classList.contains("jsPanel-standard")
            };
            return Array.prototype.slice.call(document.querySelectorAll(".jsPanel")).filter(function(t) {
                return e.call(t, t)
            }).sort(function(e, t) {
                return t.style.zIndex - e.style.zIndex
            })
        },
        hslToRgb: function(e, t, n) {
            var o = void 0,
                a = void 0,
                i = void 0;
            if (0 === t) o = a = i = n;
            else {
                var r = function(e, t, n) {
                        return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + 6 * (t - e) * n : n < .5 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e
                    },
                    s = n < .5 ? n * (1 + t) : n + t - n * t,
                    l = 2 * n - s;
                o = r(l, s, e + 1 / 3), a = r(l, s, e), i = r(l, s, e - 1 / 3)
            }
            return [Math.round(255 * o), Math.round(255 * a), Math.round(255 * i)]
        },
        lighten: function(e, t) {
            var n = this.color(e).hsl,
                o = parseFloat(n.l),
                a = o + (100 - o) * t + "%";
            return "hsl(" + n.h + "," + n.s + "," + a + ")"
        },
        perceivedBrightness: function(e) {
            var t = this.color(e).rgb;
            return t.r / 255 * .2627 + t.g / 255 * .678 + t.b / 255 * .0593
        },
        pOcontainer: function(e, t) {
            if (e) {
                var n = void 0;
                if ("string" == typeof e ? n = document.querySelector(e) : 1 === e.nodeType ? n = e : e.length && (n = e[0]), n && 1 === n.nodeType) return n
            }
            var o = new window.jsPanelError("NO NEW PANEL CREATED!\nThe container to append the panel to does not exist or a container was not specified!");
            try {
                throw o
            } catch (e) {
                t && t.call(e, e)
            }
            return o
        },
        pOcontainment: function(e) {
            if ("number" == typeof e) return [e, e, e, e];
            if (Array.isArray(e)) {
                if (1 === e.length) return [e[0], e[0], e[0], e[0]];
                if (2 === e.length) return e.concat(e);
                3 === e.length && (e[3] = e[1])
            }
            return e
        },
        pOsize: function(e, t) {
            var n = t || this.defaults.contentSize,
                o = e.parentElement;
            if ("string" == typeof n) {
                var a = n.trim().split(" ");
                (n = {}).width = a[0], 2 === a.length ? n.height = a[1] : n.height = a[0]
            } else n.width && !n.height ? n.height = n.width : n.height && !n.width && (n.width = n.height);
            if (String(n.width).match(/^[0-9.]+$/gi)) n.width += "px";
            else if ("string" == typeof n.width && n.width.endsWith("%"))
                if (o === document.body) n.width = window.innerWidth * (parseFloat(n.width) / 100) + "px";
                else {
                    var i = window.getComputedStyle(o),
                        r = parseFloat(i.borderLeftWidth) + parseFloat(i.borderRightWidth);
                    n.width = (parseFloat(i.width) - r) * (parseFloat(n.width) / 100) + "px"
                } else "function" == typeof n.width && (n.width = n.width.call(e, e), "number" == typeof n.width ? n.width += "px" : "string" == typeof n.width && n.width.match(/^[0-9.]+$/gi) && (n.width += "px"));
            if (String(n.height).match(/^[0-9.]+$/gi)) n.height += "px";
            else if ("string" == typeof n.height && n.height.endsWith("%"))
                if (o === document.body) n.height = window.innerHeight * (parseFloat(n.height) / 100) + "px";
                else {
                    var s = window.getComputedStyle(o),
                        l = parseFloat(s.borderTopWidth) + parseFloat(s.borderBottomWidth);
                    n.height = (parseFloat(s.height) - l) * (parseFloat(n.height) / 100) + "px"
                } else "function" == typeof n.height && (n.height = n.height.call(e, e), "number" == typeof n.height ? n.height += "px" : "string" == typeof n.height && n.height.match(/^[0-9.]+$/gi) && (n.height += "px"));
            return n
        },
        pOposition: function(e) {
            var t = e.match(/\b[a-z]{4,6}-{1}[a-z]{3,6}\b/i),
                n = e.match(/down|up|right([^-]|$)|left([^-]|$)/i),
                o = e.match(/[+-]?\d?\.?\d+([a-z%]{2,4}\b|%?)/gi),
                a = void 0;
            return a = t ? {
                my: t[0].toLowerCase(),
                at: t[0].toLowerCase()
            } : {
                my: "center",
                at: "center"
            }, n && (a.autoposition = n[0].toLowerCase()), o && (o.forEach(function(e, t) {
                e.match(/^[+-]?[0-9]*$/) && (o[t] += "px"), o[t] = o[t].toLowerCase()
            }), 1 === o.length ? (a.offsetX = o[0], a.offsetY = o[0]) : (a.offsetX = o[0], a.offsetY = o[1])), a
        },
        position: function(e, t) {
            var n = void 0,
                o = void 0,
                a = void 0,
                i = {
                    left: 0,
                    top: 0
                },
                r = 0,
                s = 0,
                l = 0,
                c = 0,
                d = {
                    my: "center",
                    at: "center",
                    of: "window",
                    offsetX: "0px",
                    offsetY: "0px"
                },
                f = {
                    width: document.documentElement.clientWidth,
                    height: window.innerHeight
                },
                p = pageXOffset,
                h = pageYOffset;
            if (n = "string" == typeof e ? document.querySelector(e) : e, !t) return n.style.opacity = 1, n;
            var u = n.getBoundingClientRect();
            o = "string" == typeof t ? Object.assign({}, d, jsPanel.pOposition(t)) : Object.assign({}, d, t);
            var m = n.parentElement,
                g = window.getComputedStyle(m),
                b = m.getBoundingClientRect(),
                y = m.tagName.toLowerCase();
            if (o.of && "window" !== o.of && ("function" == typeof o.of && (o.of = o.of()), a = "string" == typeof o.of ? document.querySelector(o.of) : o.of), "function" == typeof o.my && (o.my = o.my()), "function" == typeof o.at && (o.at = o.at()), o.my.match(/^center-top$|^center$|^center-bottom$/i) ? r = u.width / 2 : o.my.match(/right/i) && (r = u.width), o.my.match(/^left-center$|^center$|^right-center$/i) ? s = u.height / 2 : o.my.match(/bottom/i) && (s = u.height), "body" === y && "window" === o.of) o.at.match(/^center-top$|^center$|^center-bottom$/i) ? l = f.width / 2 : o.at.match(/right/i) && (l = f.width), o.at.match(/^left-center$|^center$|^right-center$/i) ? c = f.height / 2 : o.at.match(/bottom/i) && (c = f.height), i.left = l - r - parseFloat(g.borderLeftWidth), i.top = c - s - parseFloat(g.borderTopWidth), n.style.position = "fixed";
            else if ("body" === y && "window" !== o.of) {
                var v = a.getBoundingClientRect();
                l = o.at.match(/^center-top$|^center$|^center-bottom$/i) ? v.width / 2 + v.left + p : o.at.match(/right/i) ? v.width + v.left + p : v.left + p, c = o.at.match(/^left-center$|^center$|^right-center$/i) ? v.height / 2 + v.top + h : o.at.match(/bottom/i) ? v.height + v.top + h : v.top + h, i.left = l - r - parseFloat(g.borderLeftWidth), i.top = c - s - parseFloat(g.borderTopWidth)
            } else if ("body" === y || "window" !== o.of && o.of) {
                if ("body" !== y && m.contains(a)) {
                    var w = a.getBoundingClientRect();
                    l = o.at.match(/^center-top$|^center$|^center-bottom$/i) ? w.left - b.left + w.width / 2 : o.at.match(/right/i) ? w.left - b.left + w.width : w.left - b.left, c = o.at.match(/^left-center$|^center$|^right-center$/i) ? w.top - b.top + w.height / 2 : o.at.match(/bottom/i) ? w.top - b.top + w.height : w.top - b.top, i.left = l - r - parseFloat(g.borderLeftWidth), i.top = c - s - parseFloat(g.borderTopWidth)
                }
            } else {
                var j = parseFloat(g.borderLeftWidth) + parseFloat(g.borderRightWidth),
                    P = parseFloat(g.borderTopWidth) + parseFloat(g.borderBottomWidth);
                o.at.match(/^center-top$|^center$|^center-bottom$/i) ? l = b.width / 2 - j / 2 : o.at.match(/right/i) && (l = b.width - j), o.at.match(/^left-center$|^center$|^right-center$/i) ? c = b.height / 2 - P / 2 : o.at.match(/bottom/i) && (c = b.height - P), i.left = l - r, i.top = c - s
            }
            if (o.autoposition && o.my === o.at && ["left-top", "center-top", "right-top", "left-bottom", "center-bottom", "right-bottom"].indexOf(o.my) >= 0) {
                "function" == typeof o.autoposition && (o.autoposition = o.autoposition());
                var z = o.my + "-" + o.autoposition.toLowerCase();
                n.classList.add(z);
                var C = Array.prototype.slice.call(document.querySelectorAll("." + z)),
                    x = C.indexOf(n);
                C.length > 1 && ("down" === o.autoposition ? C.forEach(function(e, t) {
                    t > 0 && t <= x && (i.top += C[--t].getBoundingClientRect().height + jsPanel.autopositionSpacing)
                }) : "up" === o.autoposition ? C.forEach(function(e, t) {
                    t > 0 && t <= x && (i.top -= C[--t].getBoundingClientRect().height + jsPanel.autopositionSpacing)
                }) : "right" === o.autoposition ? C.forEach(function(e, t) {
                    t > 0 && t <= x && (i.left += C[--t].getBoundingClientRect().width + jsPanel.autopositionSpacing)
                }) : "left" === o.autoposition && C.forEach(function(e, t) {
                    t > 0 && t <= x && (i.left -= C[--t].getBoundingClientRect().width + jsPanel.autopositionSpacing)
                }))
            }
            if (i.left += "px", i.top += "px", n.style.left = i.left, n.style.top = i.top, o.offsetX && ("function" == typeof o.offsetX && (o.offsetX = o.offsetX()), "number" == typeof o.offsetX ? n.style.left = "calc(" + i.left + " + " + o.offsetX + "px)" : n.style.left = "calc(" + i.left + " + " + o.offsetX + ")", i.left = window.getComputedStyle(n).left), o.offsetY && ("function" == typeof o.offsetY && (o.offsetY = o.offsetY()), "number" == typeof o.offsetY ? n.style.top = "calc(" + i.top + " + " + o.offsetY + "px)" : n.style.top = "calc(" + i.top + " + " + o.offsetY + ")", i.top = window.getComputedStyle(n).top), o.minLeft) {
                "function" == typeof o.minLeft && (o.minLeft = o.minLeft());
                var E = parseFloat(i.left);
                "number" == typeof o.minLeft && (o.minLeft += "px"), n.style.left = o.minLeft, E > parseFloat(window.getComputedStyle(n).left) && (n.style.left = E + "px"), i.left = window.getComputedStyle(n).left
            }
            if (o.maxLeft) {
                "function" == typeof o.maxLeft && (o.maxLeft = o.maxLeft());
                var S = parseFloat(i.left);
                "number" == typeof o.maxLeft && (o.maxLeft += "px"), n.style.left = o.maxLeft, S < parseFloat(window.getComputedStyle(n).left) && (n.style.left = S + "px"), i.left = window.getComputedStyle(n).left
            }
            if (o.maxTop) {
                "function" == typeof o.maxTop && (o.maxTop = o.maxTop());
                var T = parseFloat(i.top);
                "number" == typeof o.maxTop && (o.maxTop += "px"), n.style.top = o.maxTop, T < parseFloat(window.getComputedStyle(n).top) && (n.style.top = T + "px"), i.top = window.getComputedStyle(n).top
            }
            if (o.minTop) {
                "function" == typeof o.minTop && (o.minTop = o.minTop());
                var L = parseFloat(i.top);
                "number" == typeof o.minTop && (o.minTop += "px"), n.style.top = o.minTop, L > parseFloat(window.getComputedStyle(n).top) && (n.style.top = L + "px"), i.top = window.getComputedStyle(n).top
            }
            if ("function" == typeof o.modify) {
                var k = o.modify.call(i, i);
                n.style.left = k.left, n.style.top = k.top
            }
            return n.style.opacity = 1, n.style.left = window.getComputedStyle(n).left, n.style.top = window.getComputedStyle(n).top, n
        },
        processCallbacks: function(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "some",
                o = arguments[3];
            if ("function" == typeof t && (t = [t]), n) return t[n](function(t) {
                if ("function" == typeof t) return t.call(e, e, o)
            });
            t.forEach(function(t) {
                t.call(e, e, o)
            })
        },
        rgbToHsl: function(e, t, n) {
            e /= 255, t /= 255, n /= 255;
            var o = Math.max(e, t, n),
                a = Math.min(e, t, n),
                i = void 0,
                r = void 0,
                s = (o + a) / 2;
            if (o === a) i = r = 0;
            else {
                var l = o - a;
                switch (r = s > .5 ? l / (2 - o - a) : l / (o + a), o) {
                    case e:
                        i = (t - n) / l + (t < n ? 6 : 0);
                        break;
                    case t:
                        i = (n - e) / l + 2;
                        break;
                    case n:
                        i = (e - t) / l + 4
                }
                i /= 6
            }
            return {
                css: "hsl(" + (i *= 360) + "," + (r = 100 * r + "%") + "," + (s = 100 * s + "%") + ")",
                h: i,
                s: r,
                l: s
            }
        },
        rgbToHex: function(e, t, n) {
            var o = Number(e).toString(16),
                a = Number(t).toString(16),
                i = Number(n).toString(16);
            return 1 === o.length && (o = "0" + o), 1 === a.length && (a = "0" + a), 1 === i.length && (i = "0" + i), "#" + o + a + i
        },
        removeSnapAreas: function(e) {
            document.querySelectorAll(".jsPanel-snap-area").forEach(function(t) {
                e.parentElement && e.parentElement.removeChild(t)
            })
        },
        resetZi: function() {
            this.zi = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : jsPanel.ziBase;
                return {
                    next: function() {
                        return e++
                    }
                }
            }(), Array.prototype.slice.call(document.querySelectorAll(".jsPanel-standard")).sort(function(e, t) {
                return e.style.zIndex - t.style.zIndex
            }).forEach(function(e) {
                e.style.zIndex = jsPanel.zi.next()
            })
        },
        resizeit: function(e) {
            var t, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                o = Object.assign({}, this.defaults.resizeit, n),
                a = e.parentElement,
                i = a.tagName.toLowerCase(),
                r = "function" == typeof o.maxWidth ? o.maxWidth() : o.maxWidth || 1e4,
                s = "function" == typeof o.maxHeight ? o.maxHeight() : o.maxHeight || 1e4,
                l = "function" == typeof o.minWidth ? o.minWidth() : o.minWidth,
                c = "function" == typeof o.minHeight ? o.minHeight() : o.minHeight,
                d = void 0,
                f = void 0,
                p = void 0,
                h = void 0,
                u = new CustomEvent("jspanelresizestart", {
                    detail: e.id
                }),
                m = new CustomEvent("jspanelresize", {
                    detail: e.id
                }),
                g = new CustomEvent("jspanelresizestop", {
                    detail: e.id
                });
            return t = this.pOcontainment(o.containment), o.handles.split(",").forEach(function(t) {
                var n = document.createElement("DIV");
                n.className = "jsPanel-resizeit-handle jsPanel-resizeit-" + t.trim(), n.style.zIndex = 90, e.append(n)
            }), e.querySelectorAll(".jsPanel-resizeit-handle").forEach(function(n) {
                jsPanel.pointerdown.forEach(function(g) {
                    n.addEventListener(g, function(n) {
                        if (n.preventDefault(), n.button && n.button > 0) return !1;
                        e.content.style.pointerEvents = "none";
                        var g = e.getBoundingClientRect(),
                            b = a.getBoundingClientRect(),
                            y = window.getComputedStyle(a, null),
                            v = parseInt(y.borderLeftWidth, 10),
                            w = parseInt(y.borderTopWidth, 10),
                            j = y.getPropertyValue("position"),
                            P = n.clientX || n.touches[0].clientX,
                            z = n.clientY || n.touches[0].clientY,
                            C = g.width,
                            x = g.height,
                            E = n.target.classList,
                            S = g.left,
                            T = g.top,
                            L = 1e4,
                            k = 1e4,
                            F = 1e4,
                            q = 1e4;
                        "body" !== i && (S = g.left - b.left + a.scrollLeft, T = g.top - b.top + a.scrollTop), "body" === i && t ? (L = document.documentElement.clientWidth - g.left, F = document.documentElement.clientHeight - g.top, k = g.width + g.left, q = g.height + g.top) : t && ("static" === j ? (L = b.width - g.left + v, F = b.height + b.top - g.top + w, k = g.width + (g.left - b.left) - v, q = g.height + (g.top - b.top) - w) : (L = a.clientWidth - (g.left - b.left) + v, F = a.clientHeight - (g.top - b.top) + w, k = g.width + (g.left - b.left) - v, q = e.clientHeight + (g.top - b.top) - w)), t && (k -= t[3], q -= t[0], L -= t[1], F -= t[2]);
                        var A = window.getComputedStyle(e),
                            O = parseFloat(A.width) - g.width,
                            M = parseFloat(A.height) - g.height,
                            R = parseFloat(A.left) - g.left,
                            W = parseFloat(A.top) - g.top;
                        a !== document.body && (R += b.left, W += b.top), d = function(t) {
                            f || (document.dispatchEvent(u), o.start && jsPanel.processCallbacks(e, o.start, !1, {
                                width: C,
                                height: x
                            }), jsPanel.front(e)), f = 1, document.dispatchEvent(m), (E.contains("jsPanel-resizeit-e") || E.contains("jsPanel-resizeit-se") || E.contains("jsPanel-resizeit-ne")) && ((p = C + (t.clientX || t.touches[0].clientX) - P + O) >= L && (p = L), p >= r ? p = r : p <= l && (p = l), e.style.width = p + "px"), (E.contains("jsPanel-resizeit-s") || E.contains("jsPanel-resizeit-se") || E.contains("jsPanel-resizeit-sw")) && ((h = x + (t.clientY || t.touches[0].clientY) - z + M) >= F && (h = F), h >= s ? h = s : h <= c && (h = c), e.style.height = h + "px"), (E.contains("jsPanel-resizeit-w") || E.contains("jsPanel-resizeit-nw") || E.contains("jsPanel-resizeit-sw")) && ((p = C + P - (t.clientX || t.touches[0].clientX) + O) <= r && p >= l && p <= k && (e.style.left = S + (t.clientX || t.touches[0].clientX) - P + R + "px"), p >= k && (p = k), p >= r ? p = r : p <= l && (p = l), e.style.width = p + "px"), (E.contains("jsPanel-resizeit-n") || E.contains("jsPanel-resizeit-nw") || E.contains("jsPanel-resizeit-ne")) && ((h = x + z - (t.clientY || t.touches[0].clientY) + M) <= s && h >= c && h <= q && (e.style.top = T + (t.clientY || t.touches[0].clientY) - z + W + "px"), h >= q && (h = q), h >= s ? h = s : h <= c && (h = c), e.style.height = h + "px"), window.getSelection().removeAllRanges();
                            var n = window.getComputedStyle(e),
                                a = {
                                    left: parseFloat(n.left),
                                    top: parseFloat(n.top),
                                    right: parseFloat(n.right),
                                    bottom: parseFloat(n.bottom),
                                    width: parseFloat(n.width),
                                    height: parseFloat(n.height)
                                };
                            o.resize && jsPanel.processCallbacks(e, o.resize, !1, a)
                        }, jsPanel.pointermove.forEach(function(e) {
                            document.addEventListener(e, d, !1)
                        }), window.addEventListener("mouseout", function(e) {
                            null === e.relatedTarget && jsPanel.pointermove.forEach(function(e) {
                                document.removeEventListener(e, d, !1)
                            })
                        }, !1)
                    })
                })
            }), jsPanel.pointerup.forEach(function(t) {
                document.addEventListener(t, function(t) {
                    if (jsPanel.pointermove.forEach(function(e) {
                            document.removeEventListener(e, d, !1)
                        }), t.target.classList && t.target.classList.contains("jsPanel-resizeit-handle")) {
                        var n = void 0,
                            a = void 0,
                            i = t.target.className;
                        if (i.match(/jsPanel-resizeit-nw|jsPanel-resizeit-w|jsPanel-resizeit-sw/i) && (n = !0), i.match(/jsPanel-resizeit-nw|jsPanel-resizeit-n|jsPanel-resizeit-ne/i) && (a = !0), o.grid && Array.isArray(o.grid)) {
                            1 === o.grid.length && (o.grid[1] = o.grid[0]);
                            var r = parseFloat(e.style.width),
                                s = parseFloat(e.style.height),
                                l = r % o.grid[0],
                                c = s % o.grid[1],
                                p = parseFloat(e.style.left),
                                h = parseFloat(e.style.top),
                                u = p % o.grid[0],
                                m = h % o.grid[1];
                            l < o.grid[0] / 2 ? e.style.width = r - l + "px" : e.style.width = r + (o.grid[0] - l) + "px", c < o.grid[1] / 2 ? e.style.height = s - c + "px" : e.style.height = s + (o.grid[1] - c) + "px", n && (u < o.grid[0] / 2 ? e.style.left = p - u + "px" : e.style.left = p + (o.grid[0] - u) + "px"), a && (m < o.grid[1] / 2 ? e.style.top = h - m + "px" : e.style.top = h + (o.grid[1] - m) + "px")
                        }
                    }
                    f && (e.content.style.pointerEvents = "inherit", document.dispatchEvent(g), f = void 0, e.saveCurrentDimensions(), e.saveCurrentPosition(), o.stop && jsPanel.processCallbacks(e, o.stop, !1, {
                        width: parseFloat(e.style.width),
                        height: parseFloat(e.style.height)
                    })), e.content.style.pointerEvents = "inherit"
                }, !1)
            }), o.disable && e.querySelectorAll(".jsPanel-resizeit-handle").forEach(function(e) {
                e.style.pointerEvents = "none"
            }), e
        },
        setClass: function(e, t) {
            return t.split(" ").forEach(function(t) {
                return e.classList.add(t)
            }), e
        },
        remClass: function(e, t) {
            return t.split(" ").forEach(function(t) {
                return e.classList.remove(t)
            }), e
        },
        setStyle: function(e, t) {
            for (var n in t)
                if (t.hasOwnProperty(n)) {
                    var o = String(n).replace(/-\w/gi, function(e) {
                        return e.substr(-1).toUpperCase()
                    });
                    e.style[o] = t[n]
                }
            return e
        },
        snapPanel: function(e, t) {
            if (e.currentData.beforeSnap = {
                    width: e.currentData.width,
                    height: e.currentData.height
                }, t && "function" == typeof t) t.call(e, e, e.snappableTo);
            else if (!1 !== t) {
                var n = [0, 0];
                if (e.options.dragit.snap.containment && e.options.dragit.containment) {
                    var o = this.pOcontainment(e.options.dragit.containment),
                        a = e.snappableTo;
                    a.startsWith("left") ? n[0] = o[3] : a.startsWith("right") && (n[0] = -o[1]), a.endsWith("top") ? n[1] = o[0] : a.endsWith("bottom") && (n[1] = -o[2])
                }
                e.reposition(e.snappableTo + " " + n[0] + " " + n[1]), e.snapped = e.snappableTo
            }
        },
        create: function() {
            var e = this,
                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                n = arguments[1];
            jsPanel.zi || (jsPanel.zi = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : jsPanel.ziBase;
                return {
                    next: function() {
                        return e++
                    }
                }
            }());
            var o = void 0;
            t.config ? delete(t = Object.assign({}, this.defaults, t.config, t)).config : t = Object.assign({}, this.defaults, t), t.id ? "function" == typeof t.id && (t.id = t.id()) : t.id = "jsPanel-" + (jsPanel.idCounter += 1);
            var a = document.getElementById(t.id);
            if (null !== a) {
                a.classList.contains("jsPanel") && a.front();
                var i = new window.jsPanelError("NO NEW PANEL CREATED!\nAn element with the ID <" + t.id + "> already exists in the document.");
                try {
                    throw i
                } catch (e) {
                    n && n.call(e, e)
                }
                return console.error(i.name + ":", i.message)
            }
            var r = this.pOcontainer(t.container, n);
            if (r && r.message) return console.error(r.name + ":", r.message);
            t.maximizedMargin = this.pOcontainment(t.maximizedMargin), t.dragit && (["start", "drag", "stop"].forEach(function(e) {
                t.dragit[e] ? "function" == typeof t.dragit[e] && (t.dragit[e] = [t.dragit[e]]) : t.dragit[e] = []
            }), t.dragit.snap && ("object" === _typeof(t.dragit.snap) ? t.dragit.snap = Object.assign({}, this.defaultSnapConfig, t.dragit.snap) : t.dragit.snap = this.defaultSnapConfig)), t.resizeit && ["start", "resize", "stop"].forEach(function(e) {
                t.resizeit[e] ? "function" == typeof t.resizeit[e] && (t.resizeit[e] = [t.resizeit[e]]) : t.resizeit[e] = []
            }), ["onbeforeclose", "onbeforemaximize", "onbeforeminimize", "onbeforenormalize", "onbeforesmallify", "onbeforeunsmallify", "onclosed", "onfronted", "onmaximized", "onminimized", "onnormalized", "onsmallified", "onstatuschange", "onunsmallified"].forEach(function(e) {
                t[e] ? "function" == typeof t[e] && (t[e] = [t[e]]) : t[e] = []
            }), t.headerRemove && (t.header = !1);
            var s = t.template ? t.template : this.createPanelTemplate();
            s.options = t, s.status = "initialized", s.currentData = {}, s.header = s.querySelector(".jsPanel-hdr"), s.headerbar = s.header.querySelector(".jsPanel-headerbar"), s.titlebar = s.header.querySelector(".jsPanel-titlebar"), s.headerlogo = s.headerbar.querySelector(".jsPanel-headerlogo"), s.headertitle = s.headerbar.querySelector(".jsPanel-title"), s.controlbar = s.headerbar.querySelector(".jsPanel-controlbar"), s.headertoolbar = s.header.querySelector(".jsPanel-hdr-toolbar"), s.content = s.querySelector(".jsPanel-content"), s.footer = s.querySelector(".jsPanel-ftr"), s.snappableTo = !1, s.snapped = !1;
            var l = new CustomEvent("jspanelloaded", {
                    detail: t.id
                }),
                c = new CustomEvent("jspanelbeforeclose", {
                    detail: t.id
                }),
                d = new CustomEvent("jspanelclosed", {
                    detail: t.id
                }),
                f = new CustomEvent("jspanelstatuschange", {
                    detail: t.id
                }),
                p = new CustomEvent("jspanelbeforenormalize", {
                    detail: t.id
                }),
                h = new CustomEvent("jspanelnormalized", {
                    detail: t.id
                }),
                u = new CustomEvent("jspanelbeforemaximize", {
                    detail: t.id
                }),
                m = new CustomEvent("jspanelmaximized", {
                    detail: t.id
                }),
                g = new CustomEvent("jspanelbeforeminimize", {
                    detail: t.id
                }),
                b = new CustomEvent("jspanelminimized", {
                    detail: t.id
                }),
                y = new CustomEvent("jspanelbeforesmallify", {
                    detail: t.id
                }),
                v = new CustomEvent("jspanelsmallified", {
                    detail: t.id
                }),
                w = new CustomEvent("jspanelsmallifiedmax", {
                    detail: t.id
                }),
                j = new CustomEvent("jspanelbeforeunsmallify", {
                    detail: t.id
                }),
                P = new CustomEvent("jspanelfronted", {
                    detail: t.id
                }),
                z = s.querySelector(".jsPanel-btn-close"),
                C = s.querySelector(".jsPanel-btn-maximize"),
                x = s.querySelector(".jsPanel-btn-normalize"),
                E = s.querySelector(".jsPanel-btn-smallify"),
                S = s.querySelector(".jsPanel-btn-smallifyrev"),
                T = s.querySelector(".jsPanel-btn-minimize");
            z && jsPanel.pointerup.forEach(function(e) {
                z.addEventListener(e, function(e) {
                    if (e.preventDefault(), e.button && e.button > 0) return !1;
                    s.close()
                })
            }), C && jsPanel.pointerup.forEach(function(e) {
                C.addEventListener(e, function(e) {
                    if (e.preventDefault(), e.button && e.button > 0) return !1;
                    s.maximize()
                })
            }), x && jsPanel.pointerup.forEach(function(e) {
                x.addEventListener(e, function(e) {
                    if (e.preventDefault(), e.button && e.button > 0) return !1;
                    s.normalize()
                })
            }), E && jsPanel.pointerup.forEach(function(e) {
                E.addEventListener(e, function(e) {
                    if (e.preventDefault(), e.button && e.button > 0) return !1;
                    s.smallify()
                })
            }), S && jsPanel.pointerup.forEach(function(e) {
                S.addEventListener(e, function(e) {
                    if (e.preventDefault(), e.button && e.button > 0) return !1;
                    s.unsmallify()
                })
            }), T && jsPanel.pointerup.forEach(function(e) {
                T.addEventListener(e, function(e) {
                    if (e.preventDefault(), e.button && e.button > 0) return !1;
                    s.minimize()
                })
            });
            var L = jsPanel.extensions;
            for (var k in L) L.hasOwnProperty(k) && (s[k] = L[k]);
            if (s.addToolbar = function(e, t, n) {
                    if ("header" === e ? e = s.headertoolbar : "footer" === e && (e = s.footer), "string" == typeof t) e.innerHTML = t;
                    else if (Array.isArray(t)) t.forEach(function(t) {
                        "string" == typeof t ? e.innerHTML += t : e.append(t)
                    });
                    else if ("function" == typeof t) {
                        var o = t.call(s, s);
                        "string" == typeof o ? e.innerHTML = o : e.append(o)
                    } else e.append(t);
                    return e.classList.add("active"), n && n.call(s, s), s
                }, s.applyBuiltInTheme = function(e) {
                    return s.classList.add("jsPanel-theme-" + e.color), s.header.classList.add("jsPanel-theme-" + e.color), e.filling && (s.content.style.background = "", s.content.classList.add("jsPanel-content-" + e.filling)), t.headerToolbar || (s.content.style.background = "", s.content.style.borderTop = "1px solid " + s.headertitle.style.color), s
                }, s.applyArbitraryTheme = function(e) {
                    return s.style.backgroundColor = e.colors[0], s.header.style.backgroundColor = e.colors[0], [".jsPanel-headerlogo", ".jsPanel-title", ".jsPanel-hdr-toolbar"].forEach(function(t) {
                        s.querySelector(t).style.color = e.colors[3]
                    }, s), s.querySelectorAll(".jsPanel-controlbar .jsPanel-btn").forEach(function(t) {
                        t.style.color = e.colors[3]
                    }), t.headerToolbar ? jsPanel.setStyle(s.headertoolbar, {
                        boxShadow: "0 0 1px " + e.colors[3] + " inset",
                        width: "calc(100% + 4px)",
                        marginLeft: "-1px"
                    }) : s.content.style.borderTop = "1px solid " + e.colors[3], "filled" === e.filling ? (s.content.style.backgroundColor = e.colors[0], s.content.style.color = e.colors[3]) : "filledlight" === e.filling && (s.content.style.backgroundColor = e.colors[1]), s
                }, s.applyBootstrapTheme = function(e) {
                    var t = e.bstheme,
                        n = $.fn.button.Constructor.VERSION[0];
                    if ("4" === n ? s.classList.add("bg-" + t) : (["panel", "panel-" + t].forEach(function(e) {
                            s.classList.add(e)
                        }), s.header.classList.add("panel-heading")), "mdb" === e.bs) {
                        var o = t + "-color";
                        e.mdbStyle && (o += "-dark"), s.classList.add(o)
                    }
                    var a = void 0;
                    a = "4" === n ? window.getComputedStyle(s).backgroundColor.replace(/\s+/g, "") : window.getComputedStyle(s.header).backgroundColor.replace(/\s+/g, "");
                    var i = jsPanel.calcColors(a);
                    return s.header.style.color = i[3], e.filling ? s.setTheme(a + " " + e.filling) : s.setTheme(a), s
                }, s.applyThemeBorder = function(e) {
                    var n = t.border.split(" ");
                    if (s.style.borderWidth = n[0], s.style.borderStyle = n[1], s.style.borderColor = n[2], e.bs) {
                        var o = void 0;
                        o = "transparent" === window.getComputedStyle(s.header).backgroundColor ? window.getComputedStyle(s).backgroundColor.replace(/\s+/g, "") : window.getComputedStyle(s.header).backgroundColor.replace(/\s+/g, ""), n[2] ? s.style.borderColor = n[2] : s.style.borderColor = o
                    } else -1 === jsPanel.themes.indexOf(e.color) && (n[2] ? s.style.borderColor = n[2] : s.style.borderColor = e.colors[0]);
                    return s
                }, s.autopositionRemaining = function() {
                    var e = void 0;
                    ["left-top-down", "left-top-right", "center-top-down", "right-top-down", "right-top-left", "left-bottom-up", "left-bottom-right", "center-bottom-up", "right-bottom-up", "right-bottom-left"].forEach(function(t) {
                        s.classList.contains(t) && (e = t)
                    }), e && t.container.querySelectorAll("." + e).forEach(function(e) {
                        e.reposition()
                    })
                }, s.borderRadius = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 5,
                        t = "string" == typeof e ? e : e + "px",
                        n = s.header.style,
                        o = s.content.style,
                        a = s.footer.style;
                    return s.style.borderRadius = t, s.querySelector(".jsPanel-hdr") ? (n.borderTopLeftRadius = t, n.borderTopRightRadius = t) : (o.borderTopLeftRadius = t, o.borderTopRightRadius = t), s.querySelector(".jsPanel-ftr.active") ? (a.borderBottomLeftRadius = t, a.borderBottomRightRadius = t) : (o.borderBottomLeftRadius = t, o.borderBottomRightRadius = t), s
                }, s.calcSizeFactors = function() {
                    var e = window.getComputedStyle(s);
                    if (t.container === document.body) s.hf = parseFloat(s.style.left) / (document.body.clientWidth - parseFloat(s.style.width)), s.vf = parseFloat(s.style.top) / (window.innerHeight - parseFloat(e.height));
                    else {
                        var n = s.parentElement.getBoundingClientRect();
                        s.hf = parseFloat(s.style.left) / (n.width - parseFloat(s.style.width)), s.vf = parseFloat(s.style.top) / (n.height - parseFloat(e.height))
                    }
                }, s.clearTheme = function(e) {
                    return jsPanel.themes.concat(jsPanel.mdbthemes).forEach(function(e) {
                        ["panel", "jsPanel-theme-" + e, "panel-" + e, e + "-color"].forEach(function(e) {
                            s.classList.remove(e)
                        }), s.header.classList.remove("panel-heading", "jsPanel-theme-" + e)
                    }, s), s.headertitle.classList.remove("panel-title"), s.content.classList.remove("panel-body", "jsPanel-content-filled", "jsPanel-content-filledlight"), s.footer.classList.remove("panel-footer"), jsPanel.setStyle(s, {
                        backgroundColor: "",
                        borderWidth: "",
                        borderStyle: "",
                        borderColor: ""
                    }), jsPanel.setStyle(s.content, {
                        background: "",
                        border: ""
                    }), jsPanel.setStyle(s.headertoolbar, {
                        boxShadow: "",
                        width: "",
                        marginLeft: ""
                    }), s.header.style.background = "", Array.prototype.slice.call(s.controlbar.querySelectorAll(".jsPanel-icon")).concat([s.headerlogo, s.headertitle, s.headertoolbar, s.content]).forEach(function(e) {
                        e.style.color = ""
                    }), e && e.call(s, s), s
                }, s.close = function(e) {
                    var n = function() {
                        var n = t.id;
                        if (o && window.clearTimeout(o), s.closeChildpanels(), s.parentElement && s.parentElement.removeChild(s), document.querySelector("#" + n)) return !1;
                        s.removeMinimizedReplacement(), document.dispatchEvent(d), e && e.call(n, n), t.onclosed && jsPanel.processCallbacks(s, t.onclosed, "every"), s.autopositionRemaining()
                    };
                    if (document.dispatchEvent(c), t.onbeforeclose && t.onbeforeclose.length > 0 && !jsPanel.processCallbacks(s, t.onbeforeclose)) return s;
                    t.animateOut ? (t.animateIn && jsPanel.remClass(s, t.animateIn), jsPanel.setClass(s, t.animateOut), s.addEventListener("animationend", function() {
                        n()
                    })) : n()
                }, s.closeChildpanels = function(e) {
                    return s.getChildpanels().forEach(function(e) {
                        return e.close()
                    }), e && e.call(s, s), s
                }, s.contentRemove = function(e) {
                    return jsPanel.emptyNode(s.content), e && e.call(s, s), s
                }, s.createMinimizedReplacement = function() {
                    var e = jsPanel.createMinimizedTemplate(),
                        n = window.getComputedStyle(s.headertitle).color,
                        o = t.iconfont,
                        a = e.querySelector(".jsPanel-controlbar");
                    return e.style.backgroundColor = "transparent" === window.getComputedStyle(s.header).backgroundColor ? window.getComputedStyle(s).backgroundColor : window.getComputedStyle(s.header).backgroundColor, e.id = s.id + "-min", e.querySelector(".jsPanel-headerbar").replaceChild(s.headerlogo.cloneNode(!0), e.querySelector(".jsPanel-headerlogo")), e.querySelector(".jsPanel-titlebar").replaceChild(s.headertitle.cloneNode(!0), e.querySelector(".jsPanel-title")), e.querySelector(".jsPanel-title").style.color = n, a.style.color = n, s.setIconfont(o, e), "enabled" === s.dataset.btnnormalize ? jsPanel.pointerup.forEach(function(t) {
                        e.querySelector(".jsPanel-btn-normalize").addEventListener(t, function() {
                            s.normalize()
                        })
                    }) : a.querySelector(".jsPanel-btn-normalize").style.display = "none", "enabled" === s.dataset.btnmaximize ? jsPanel.pointerup.forEach(function(t) {
                        e.querySelector(".jsPanel-btn-maximize").addEventListener(t, function() {
                            s.maximize()
                        })
                    }) : a.querySelector(".jsPanel-btn-maximize").style.display = "none", "enabled" === s.dataset.btnclose ? jsPanel.pointerup.forEach(function(t) {
                        e.querySelector(".jsPanel-btn-close").addEventListener(t, function() {
                            s.close()
                        })
                    }) : a.querySelector(".jsPanel-btn-close").style.display = "none", e
                }, s.dragit = function(e) {
                    var n = Object.assign({}, jsPanel.defaults.dragit, t.dragit),
                        o = s.querySelectorAll(n.handles);
                    return "disable" === e ? o.forEach(function(e) {
                        e.style.pointerEvents = "none"
                    }) : o.forEach(function(e) {
                        e.style.pointerEvents = "auto"
                    }), s
                }, s.front = function(e) {
                    var n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    return jsPanel.front(s), document.dispatchEvent(P), e && e.call(s, s), t.onfronted && n && jsPanel.processCallbacks(s, t.onfronted, "every"), s
                }, s.getChildpanels = function() {
                    return Array.prototype.slice.call(s.content.querySelectorAll(".jsPanel"))
                }, s.getThemeDetails = function(e) {
                    var t = e.toLowerCase().replace(/ /g, ""),
                        n = {
                            color: !1,
                            colors: !1,
                            filling: !1,
                            bs: !1,
                            bstheme: !1
                        };
                    if ("filled" === t.substr(-6, 6) ? (n.filling = "filled", n.color = t.substr(0, t.length - 6)) : "filledlight" === t.substr(-11, 11) ? (n.filling = "filledlight", n.color = t.substr(0, t.length - 11)) : (n.filling = "", n.color = t), n.colors = jsPanel.calcColors(n.color), n.color.match("-")) {
                        var o = n.color.split("-");
                        n.bs = o[0], n.bstheme = o[1], n.mdbStyle = o[2] || void 0
                    }
                    return n
                }, s.isChildpanel = function() {
                    var e = s.closest(".jsPanel-content");
                    return !!e && e.parentElement
                }, s.maximize = function(e) {
                    if (t.onbeforemaximize && t.onbeforemaximize.length > 0 && !jsPanel.processCallbacks(s, t.onbeforemaximize)) return s;
                    document.dispatchEvent(u);
                    var n = s.parentElement,
                        o = t.maximizedMargin;
                    return n === document.body ? (s.style.width = document.documentElement.clientWidth - o[1] - o[3] + "px", s.style.height = document.documentElement.clientHeight - o[0] - o[2] + "px", s.style.left = o[3] + "px", s.style.top = o[0] + "px", t.position.fixed || (s.style.left = window.pageXOffset + o[3] + "px", s.style.top = window.pageYOffset + o[0] + "px")) : (s.style.width = n.clientWidth - o[1] - o[3] + "px", s.style.height = n.clientHeight - o[0] - o[2] + "px", s.style.left = o[3] + "px", s.style.top = o[0] + "px"), s.removeMinimizedReplacement(), s.status = "maximized", s.setControls([".jsPanel-btn-maximize", ".jsPanel-btn-smallifyrev"]), jsPanel.front(s), document.dispatchEvent(m), document.dispatchEvent(f), t.onstatuschange && jsPanel.processCallbacks(s, t.onstatuschange, "every"), e && e.call(s, s), t.onmaximized && jsPanel.processCallbacks(s, t.onmaximized, "every"), s
                }, s.minimize = function(e) {
                    if ("minimized" === s.status) return s;
                    if (t.onbeforeminimize && t.onbeforeminimize.length > 0 && !jsPanel.processCallbacks(s, t.onbeforeminimize)) return s;
                    if (document.dispatchEvent(g), !document.getElementById("jsPanel-replacement-container")) {
                        var n = document.createElement("div");
                        n.id = "jsPanel-replacement-container", document.body.append(n)
                    }
                    if (s.style.left = "-9999px", s.statusBefore = s.status, s.status = "minimized", document.dispatchEvent(b), document.dispatchEvent(f), t.onstatuschange && jsPanel.processCallbacks(s, t.onstatuschange, "every"), t.minimizeTo) {
                        var o = s.createMinimizedReplacement(),
                            a = void 0,
                            i = void 0,
                            r = void 0;
                        "default" === t.minimizeTo ? document.getElementById("jsPanel-replacement-container").append(o) : "parentpanel" === t.minimizeTo ? (a = (r = (i = s.closest(".jsPanel-content").parentElement).querySelectorAll(".jsPanel-minimized-box"))[r.length - 1]).append(o) : "parent" === t.minimizeTo ? ((a = (i = s.parentElement).querySelector(".jsPanel-minimized-container")) || ((a = document.createElement("div")).className = "jsPanel-minimized-container", i.append(a)), a.append(o)) : document.querySelector(t.minimizeTo).append(o)
                    }
                    return e && e.call(s, s), t.onminimized && jsPanel.processCallbacks(s, t.onminimized, "every"), s
                }, s.normalize = function(e) {
                    return "normalized" === s.status ? s : t.onbeforenormalize && t.onbeforenormalize.length > 0 && !jsPanel.processCallbacks(s, t.onbeforenormalize) ? s : (document.dispatchEvent(p), s.style.width = s.currentData.width, s.style.height = s.currentData.height, s.style.left = s.currentData.left, s.style.top = s.currentData.top, s.removeMinimizedReplacement(), s.status = "normalized", s.setControls([".jsPanel-btn-normalize", ".jsPanel-btn-smallifyrev"]), jsPanel.front(s), document.dispatchEvent(h), document.dispatchEvent(f), t.onstatuschange && jsPanel.processCallbacks(s, t.onstatuschange, "every"), e && e.call(s, s), t.onnormalized && jsPanel.processCallbacks(s, t.onnormalized, "every"), s)
                }, s.removeMinimizedReplacement = function() {
                    var e = document.getElementById(s.id + "-min");
                    return e && e.parentElement.removeChild(e), s
                }, s.reposition = function() {
                    for (var e = arguments.length, n = Array(e), o = 0; o < e; o++) n[o] = arguments[o];
                    var a = t.position,
                        i = !0,
                        r = void 0;
                    return n.forEach(function(e) {
                        "string" == typeof e || "object" === (void 0 === e ? "undefined" : _typeof(e)) ? a = e : "boolean" == typeof e ? i = e : "function" == typeof e && (r = e)
                    }), jsPanel.position(s, a), i && s.saveCurrentPosition(), r && r.call(s, s), s
                }, s.repositionOnSnap = function(e) {
                    var n = "0",
                        o = "0",
                        a = jsPanel.pOcontainment(t.dragit.containment);
                    t.dragit.snap.containment && ("left-top" === e ? (n = a[3], o = a[0]) : "right-top" === e ? (n = -a[1], o = a[0]) : "right-bottom" === e ? (n = -a[1], o = -a[2]) : "left-bottom" === e ? (n = a[3], o = -a[2]) : "center-top" === e ? (n = a[3] / 2 - a[1] / 2, o = a[0]) : "center-bottom" === e ? (n = a[3] / 2 - a[1] / 2, o = -a[2]) : "left-center" === e ? (n = a[3], o = a[0] / 2 - a[2] / 2) : "right-center" === e && (n = -a[1], o = a[0] / 2 - a[2] / 2)), jsPanel.position(s, e), jsPanel.setStyle(s, {
                        left: "calc(" + s.style.left + " + " + n + "px)",
                        top: "calc(" + s.style.top + " + " + o + "px)"
                    })
                }, s.resize = function() {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    var o = window.getComputedStyle(s),
                        a = {
                            width: o.width,
                            height: o.height
                        },
                        i = !0,
                        r = void 0;
                    t.forEach(function(e) {
                        "string" == typeof e ? a = e : "object" === (void 0 === e ? "undefined" : _typeof(e)) ? a = Object.assign(a, e) : "boolean" == typeof e ? i = e : "function" == typeof e && (r = e)
                    });
                    var l = jsPanel.pOsize(s, a);
                    return s.style.width = l.width, s.style.height = l.height, i && s.saveCurrentDimensions(), r && r.call(s, s), s
                }, s.resizeit = function(e) {
                    var t = s.querySelectorAll(".jsPanel-resizeit-handle");
                    return "disable" === e ? t.forEach(function(e) {
                        e.style.pointerEvents = "none"
                    }) : t.forEach(function(e) {
                        e.style.pointerEvents = "auto"
                    }), s
                }, s.saveCurrentDimensions = function() {
                    var e = window.getComputedStyle(s);
                    s.currentData.width = e.width, "normalized" === s.status && (s.currentData.height = e.height)
                }, s.saveCurrentPosition = function() {
                    var e = window.getComputedStyle(s);
                    s.currentData.left = e.left, s.currentData.top = e.top
                }, s.setControls = function(e, t) {
                    return s.header.querySelectorAll(".jsPanel-btn").forEach(function(e) {
                        e.style.display = "block"
                    }), e.forEach(function(e) {
                        var t = s.controlbar.querySelector(e);
                        t && (t.style.display = "none")
                    }), t && t.call(s, s), s
                }, s.setControlStatus = function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "enable",
                        n = arguments[2];
                    if ("disable" === t) {
                        if ("removed" !== s.getAttribute("data-btn" + e)) {
                            s.setAttribute("data-btn" + e, "disabled");
                            var o = s.controlbar.querySelector(".jsPanel-btn-" + e);
                            o.style.pointerEvents = "none", o.style.opacity = .4, o.style.cursor = "default"
                        }
                    } else if ("enable" === t) {
                        if ("removed" !== s.getAttribute("data-btn" + e)) {
                            s.setAttribute("data-btn" + e, "enabled");
                            var a = s.controlbar.querySelector(".jsPanel-btn-" + e);
                            a.style.pointerEvents = "auto", a.style.opacity = 1, a.style.cursor = "pointer"
                        }
                    } else if ("remove" === t) {
                        var i = s.controlbar.querySelector(".jsPanel-btn-" + e);
                        s.controlbar.removeChild(i), s.setAttribute("data-btn" + e, "removed")
                    }
                    return n && n.call(s, s), s
                }, s.setHeaderControls = function(e) {
                    var n = ["close", "maximize", "normalize", "minimize", "smallify", "smallifyrev"],
                        o = t.headerControls;
                    return "string" == typeof o ? "none" === o ? n.forEach(function(e) {
                        s.setControlStatus(e, "remove")
                    }) : "closeonly" === o && n.forEach(function(e) {
                        "close" !== e && s.setControlStatus(e, "remove")
                    }) : n.forEach(function(e) {
                        o[e] && s.setControlStatus(e, o[e])
                    }), e && e.call(s, s), s
                }, s.setHeaderLogo = function(e, t) {
                    var n = [s.headerlogo],
                        o = document.querySelector("#" + s.id + "-min");
                    return o && n.push(o.querySelector(".jsPanel-headerlogo")), "string" == typeof e ? "<" !== e.substr(0, 1) ? n.forEach(function(t) {
                        jsPanel.emptyNode(t);
                        var n = document.createElement("img");
                        n.src = e, t.append(n)
                    }) : n.forEach(function(t) {
                        t.innerHTML = e
                    }) : n.forEach(function(t) {
                        jsPanel.emptyNode(t), t.append(e)
                    }), n.forEach(function(e) {
                        e.querySelectorAll("img").forEach(function(e) {
                            e.style.maxHeight = getComputedStyle(s.headerbar).height
                        })
                    }), t && t.call(s, s), s
                }, s.setHeaderRemove = function(e) {
                    return s.removeChild(s.header), s.content.classList.add("jsPanel-content-noheader"), ["close", "maximize", "normalize", "minimize", "smallify", "smallifyrev"].forEach(function(e) {
                        s.setAttribute("data-btn" + e, "removed")
                    }), e && e.call(s, s), s
                }, s.setHeaderTitle = function(e, t) {
                    var n = [s.headertitle],
                        o = document.querySelector("#" + s.id + "-min");
                    return o && n.push(o.querySelector(".jsPanel-title")), "string" == typeof e ? n.forEach(function(t) {
                        t.innerHTML = e
                    }) : "function" == typeof e ? n.forEach(function(t) {
                        jsPanel.emptyNode(t), t.innerHTML = e()
                    }) : n.forEach(function(t) {
                        jsPanel.emptyNode(t), t.append(e)
                    }), t && t.call(s, s), s
                }, s.setIconfont = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : s,
                        n = arguments[2];
                    if (!1 !== e) {
                        var o = void 0,
                            a = void 0;
                        if ("bootstrap" === e || "glyphicon" === e) o = ["glyphicon glyphicon-remove", "glyphicon glyphicon-fullscreen", "glyphicon glyphicon-resize-full", "glyphicon glyphicon-minus", "glyphicon glyphicon-chevron-down", "glyphicon glyphicon-chevron-up"];
                        else if ("fa" === e || "far" === e || "fal" === e || "fas" === e) o = [e + " fa-window-close", e + " fa-window-maximize", e + " fa-window-restore", e + " fa-window-minimize", e + " fa-chevron-down", e + " fa-chevron-up"];
                        else if ("material-icons" === e) o = [e, e, e, e, e, e], a = ["close", "fullscreen", "fullscreen_exit", "call_received", "expand_more", "expand_less"], t.controlbar.querySelectorAll(".jsPanel-btn").forEach(function(e) {
                            e.style.padding = "6px 0 8px 0"
                        });
                        else {
                            if (!Array.isArray(e)) return t;
                            o = ["custom-control-icon " + e[5], "custom-control-icon " + e[4], "custom-control-icon " + e[3], "custom-control-icon " + e[2], "custom-control-icon " + e[1], "custom-control-icon " + e[0]]
                        }
                        t.querySelectorAll(".jsPanel-controlbar .jsPanel-btn").forEach(function(e) {
                            jsPanel.emptyNode(e).innerHTML = "<span></span>"
                        }), Array.prototype.slice.call(t.querySelectorAll(".jsPanel-controlbar .jsPanel-btn > span")).reverse().forEach(function(t, n) {
                            t.className = o[n], "material-icons" === e && (t.textContent = a[n])
                        })
                    }
                    return n && n.call(t, t), t
                }, s.setRtl = function() {
                    [s.header, s.headerbar, s.titlebar, s.controlbar, s.headertoolbar, s.footer].forEach(function(e) {
                        e.classList.add("jsPanel-rtl")
                    }), [s.headertitle, s.headertoolbar, s.content, s.footer].forEach(function(e) {
                        e.dir = "rtl", t.rtl.lang && (e.lang = t.rtl.lang)
                    })
                }, s.setSize = function() {
                    if (t.panelSize) {
                        var e = jsPanel.pOsize(s, t.panelSize);
                        s.style.width = e.width, s.style.height = e.height
                    } else if (t.contentSize) {
                        var n = jsPanel.pOsize(s, t.contentSize);
                        s.content.style.width = n.width, s.content.style.height = n.height, s.style.width = n.width, s.content.style.width = "100%"
                    }
                    return s
                }, s.setTheme = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : t.theme,
                        n = arguments[1];
                    if (s.clearTheme(), "none" === e) return s.style.backgroundColor = "#fff", s;
                    var o = s.getThemeDetails(e);
                    return o.bs ? s.applyBootstrapTheme(o) : -1 !== jsPanel.themes.indexOf(o.color) ? s.applyBuiltInTheme(o) : s.applyArbitraryTheme(o), t.border ? s.applyThemeBorder(o) : (s.style.borderWidth = "", s.style.borderStyle = "", s.style.borderColor = ""), n && n.call(s, s), s
                }, s.smallify = function(e) {
                    if ("smallified" === s.status || "smallifiedmax" === s.status) return s;
                    if (t.onbeforesmallify && t.onbeforesmallify.length > 0 && !jsPanel.processCallbacks(s, t.onbeforesmallify)) return s;
                    document.dispatchEvent(y), "normalized" === s.status && s.saveCurrentDimensions(), s.style.overflow = "hidden";
                    var n = window.getComputedStyle(s),
                        o = parseFloat(window.getComputedStyle(s.headerbar).height);
                    s.style.height = parseFloat(n.borderTopWidth) + parseFloat(n.borderBottomWidth) + o + "px", "normalized" === s.status ? (s.setControls([".jsPanel-btn-normalize", ".jsPanel-btn-smallify"]), s.status = "smallified", document.dispatchEvent(v), document.dispatchEvent(f), t.onstatuschange && jsPanel.processCallbacks(s, t.onstatuschange, "every")) : "maximized" === s.status && (s.setControls([".jsPanel-btn-maximize", ".jsPanel-btn-smallify"]), s.status = "smallifiedmax", document.dispatchEvent(w), document.dispatchEvent(f), t.onstatuschange && jsPanel.processCallbacks(s, t.onstatuschange, "every"));
                    var a = s.querySelectorAll(".jsPanel-minimized-box");
                    return a[a.length - 1].style.display = "none", e && e.call(s, s), t.onsmallified && jsPanel.processCallbacks(s, t.onsmallified, "every"), s
                }, s.unsmallify = function(e) {
                    if ("smallified" === s.status || "smallifiedmax" === s.status) {
                        if (t.onbeforeunsmallify && t.onbeforeunsmallify.length > 0 && !jsPanel.processCallbacks(s, t.onbeforeunsmallify)) return s;
                        document.dispatchEvent(j), s.style.overflow = "visible", jsPanel.front(s), "smallified" === s.status ? (s.style.height = s.currentData.height, s.setControls([".jsPanel-btn-normalize", ".jsPanel-btn-smallifyrev"]), s.status = "normalized", document.dispatchEvent(h), document.dispatchEvent(f), t.onstatuschange && jsPanel.processCallbacks(s, t.onstatuschange, "every")) : "smallifiedmax" === s.status ? s.maximize() : "minimized" === s.status && s.normalize();
                        var n = s.querySelectorAll(".jsPanel-minimized-box");
                        n[n.length - 1].style.display = "flex", e && e.call(s, s), t.onunsmallified && jsPanel.processCallbacks(s, t.onunsmallified, "every")
                    }
                    return s
                }, s.id = t.id, s.classList.add("jsPanel-" + t.paneltype), "standard" === t.paneltype && (s.style.zIndex = this.zi.next()), r.append(s), s.front(!1, !1), s.setTheme(t.theme), t.boxShadow && s.classList.add("jsPanel-depth-" + t.boxShadow), t.header) {
                if (t.headerLogo && s.setHeaderLogo(t.headerLogo), s.setIconfont(t.iconfont), s.setHeaderTitle(t.headerTitle), s.setHeaderControls(), "auto-show-hide" === t.header) {
                    var F = t.theme.split("-"),
                        q = "jsPanel-depth-" + t.boxShadow,
                        A = "bg-",
                        O = void 0;
                    F[1] && (A += F[1]), F[2] && (O = F[1] + "-color-" + F[2]), s.header.style.opacity = 0, "bootstrap" !== F[0] && "mdb" !== F[0] || (this.remClass(s, A), "mdb" === F[0] && this.remClass(s, O)), s.style.backgroundColor = "transparent", this.remClass(s, q), this.setClass(s.content, q), s.header.addEventListener("mouseenter", function() {
                        s.header.style.opacity = 1, "bootstrap" !== F[0] && "mdb" !== F[0] || (jsPanel.setClass(s, A), "mdb" === F[0] && jsPanel.setClass(s, O)), jsPanel.setClass(s, q), jsPanel.remClass(s.content, q)
                    }), s.header.addEventListener("mouseleave", function() {
                        s.header.style.opacity = 0, "bootstrap" !== F[0] && "mdb" !== F[0] || (jsPanel.remClass(s, A), "mdb" === F[0] && jsPanel.remClass(s, O)), jsPanel.remClass(s, q), jsPanel.setClass(s.content, q)
                    })
                }
            } else s.setHeaderRemove();
            if (t.headerToolbar && s.addToolbar(s.headertoolbar, t.headerToolbar), t.footerToolbar && s.addToolbar(s.footer, t.footerToolbar), t.borderRadius && s.borderRadius(t.borderRadius), t.content && ("function" == typeof t.content ? t.content.call(s, s) : "string" == typeof t.content ? s.content.innerHTML = t.content : s.content.append(t.content)), t.contentAjax && this.ajax(s, t.contentAjax), t.contentFetch && this.fetch(s), t.contentOverflow) {
                var M = t.contentOverflow.split(" ");
                1 === M.length ? s.content.style.overflow = M[0] : 2 === M.length && (s.content.style.overflowX = M[0], s.content.style.overflowY = M[1])
            }
            if (t.rtl && s.setRtl(), s.setSize(), s.status = "normalized", t.position || "cursor" !== t.position ? this.position(s, t.position) : s.style.opacity = 1, document.dispatchEvent(h), s.calcSizeFactors(), t.animateIn && (s.addEventListener("animationend", function() {
                    e.remClass(s, t.animateIn)
                }), this.setClass(s, t.animateIn)), t.syncMargins) {
                var R = this.pOcontainment(t.maximizedMargin);
                t.dragit && (t.dragit.containment = R, t.dragit.snap && (t.dragit.snap.containment = !0)), t.resizeit && (t.resizeit.containment = R)
            }
            if (t.dragit ? (this.dragit(s, t.dragit), s.addEventListener("jspaneldragstop", function(e) {
                    e.detail === s.id && s.calcSizeFactors()
                }, !1)) : s.titlebar.style.cursor = "default", t.resizeit) {
                this.resizeit(s, t.resizeit);
                var W = void 0;
                s.addEventListener("jspanelresizestart", function(e) {
                    e.detail === s.id && (W = s.status)
                }, !1), s.addEventListener("jspanelresizestop", function(e) {
                    e.detail === s.id && ("smallified" === W || "smallifiedmax" === W || "maximized" === W) && parseFloat(s.style.height) > parseFloat(window.getComputedStyle(s.header).height) && (s.setControls([".jsPanel-btn-normalize", ".jsPanel-btn-smallifyrev"]), s.status = "normalized", document.dispatchEvent(h), document.dispatchEvent(f), t.onstatuschange && jsPanel.processCallbacks(s, t.onstatuschange, "every"), s.calcSizeFactors())
                }, !1)
            }
            if (s.saveCurrentDimensions(), s.saveCurrentPosition(), t.setStatus) {
                var I = t.setStatus;
                if ("smallifiedmax" === I) s.maximize().smallify();
                else if ("smallified" === I) s.smallify();
                else {
                    var B = I.substr(0, I.length - 1);
                    s[B]()
                }
            }
            return t.autoclose && (o = window.setTimeout(function() {
                s && s.close()
            }, t.autoclose)), this.pointerdown.forEach(function(e) {
                s.addEventListener(e, function(e) {
                    e.target.closest(".jsPanel-btn-close") || e.target.closest(".jsPanel-btn-minimize") || "standard" !== t.paneltype || s.front()
                }, !1)
            }), t.onwindowresize && window.addEventListener("resize", function(e) {
                if (e.target === window) {
                    var n = t.onwindowresize,
                        o = s.status,
                        a = window.getComputedStyle(s.parentElement);
                    "maximized" === o && !0 === n ? s.maximize() : "normalized" !== o && "smallified" !== o && "maximized" !== o || ("function" == typeof n ? n.call(s, e, s) : (s.style.left = (r = void 0, (r = t.container === document.body ? (document.body.clientWidth - parseFloat(s.style.width)) * s.hf : (parseFloat(a.width) - parseFloat(s.style.width)) * s.hf) <= 0 ? 0 : r + "px"), s.style.top = (i = void 0, (i = t.container === document.body ? (window.innerHeight - parseFloat(s.currentData.height)) * s.vf : (parseFloat(a.height) - parseFloat(s.currentData.height)) * s.vf) <= 0 ? 0 : i + "px")))
                }
                var i, r
            }, !1), this.pointerup.forEach(function(e) {
                s.addEventListener(e, function() {
                    s.content.style.pointerEvents = "inherit"
                })
            }), this.globalCallbacks && (Array.isArray(this.globalCallbacks) ? this.globalCallbacks.forEach(function(e) {
                e.call(s, s)
            }) : this.globalCallbacks.call(s, s)), t.callback && (Array.isArray(t.callback) ? t.callback.forEach(function(e) {
                e.call(s, s)
            }) : t.callback.call(s, s)), n && n.call(s, s), document.dispatchEvent(l), s
        }
    };

    window.jsPanel = jsPanel

    let css = `.jsPanel{border:0;box-sizing:border-box;vertical-align:baseline;font-family:"Open Sans","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:400;display:flex;flex-direction:column;opacity:0;overflow:visible;position:absolute;top:0;z-index:100}.jsPanel .jsPanel-hdr{border:0;box-sizing:border-box;vertical-align:baseline;font-family:"Open Sans","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:400;font-size:1rem;display:flex;flex-direction:column;flex-shrink:0}.jsPanel .jsPanel-content{border:0;box-sizing:border-box;vertical-align:baseline;font-family:"Open Sans","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:400;background:#fff;color:#000;font-size:1rem;position:relative;overflow-x:hidden;overflow-y:auto;flex-grow:1}.jsPanel .jsPanel-content pre{color:inherit}.jsPanel .jsPanel-ftr{flex-direction:row;justify-content:flex-end;flex-wrap:nowrap;align-items:center;border-top:1px solid #e0e0e0;display:none;box-sizing:border-box;font-size:1rem;height:auto;background:#f5f5f5;font-weight:400;color:#000;overflow:hidden}.jsPanel .jsPanel-ftr.active{display:flex;flex-shrink:0}.jsPanel .jsPanel-ftr.active>*{margin:3px 8px}.jsPanel .jsPanel-ftr.panel-footer{padding:0}.jsPanel-hdr-toolbar,.jsPanel-headerbar{font-size:1rem}.jsPanel-headerbar{box-sizing:border-box;display:flex;flex-direction:row;flex-wrap:nowrap;align-items:center}.jsPanel-headerbar img{vertical-align:middle;max-height:38px}.jsPanel-titlebar{display:flex;align-items:center;flex:1 1 0px;cursor:move;height:100%;overflow:hidden}.jsPanel-titlebar .jsPanel-title{font-family:"Open Sans","Helvetica Neue",Helvetica,Arial,sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:1rem;font-variant:small-caps;font-weight:400;line-height:1.5;margin:0 5px 0 8px;min-width:0}.jsPanel-titlebar .jsPanel-title small{font-size:70%;color:inherit}.jsPanel-titlebar.jsPanel-rtl{flex-direction:row-reverse}.jsPanel-controlbar{display:flex;align-items:center;touch-action:none}.jsPanel-controlbar div span:hover,.jsPanel-controlbar div svg:hover{opacity:.6}.jsPanel-controlbar .jsPanel-btn{cursor:pointer;touch-action:none;padding:6px 8px 8px 3px}.jsPanel-controlbar .jsPanel-btn span{vertical-align:middle;padding:0 4px 0 2px}.jsPanel-controlbar .jsPanel-btn span.glyphicon{padding:0 2px}.jsPanel-controlbar .jsPanel-btn svg.jsPanel-icon{vertical-align:middle}.jsPanel-controlbar .jsPanel-btn-normalize,.jsPanel-controlbar .jsPanel-btn-smallifyrev{display:none}.jsPanel-hdr-toolbar{display:none;width:auto;height:auto;font-size:1rem}.jsPanel-hdr-toolbar.active{box-sizing:border-box;display:flex;flex-direction:row;flex-wrap:nowrap;align-items:center}.jsPanel-hdr-toolbar.active>*{margin:3px 8px}.jsPanel-controlbar.jsPanel-rtl,.jsPanel-hdr-toolbar.jsPanel-rtl,.jsPanel-headerbar.jsPanel-rtl{flex-direction:row-reverse}.jsPanel-hdr-toolbar.active.jsPanel-rtl{padding:7px 0 10px 0}.jsPanel-ftr.jsPanel-rtl{flex-direction:row}#jsPanel-replacement-container,.jsPanel-minimized-box,.jsPanel-minimized-container{display:flex;flex-flow:row wrap-reverse;background:transparent none repeat scroll 0 0;bottom:0;height:auto;left:0;position:fixed;width:auto;z-index:9998}#jsPanel-replacement-container .jsPanel-replacement,.jsPanel-minimized-box .jsPanel-replacement,.jsPanel-minimized-container .jsPanel-replacement{display:flex;align-items:center;width:200px;height:40px;margin:1px 1px 0 0;z-index:9999}#jsPanel-replacement-container .jsPanel-replacement .jsPanel-hdr,.jsPanel-minimized-box .jsPanel-replacement .jsPanel-hdr,.jsPanel-minimized-container .jsPanel-replacement .jsPanel-hdr{flex-grow:1;min-width:0;padding:0}#jsPanel-replacement-container .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo,.jsPanel-minimized-box .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo,.jsPanel-minimized-container .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo{max-width:50%;overflow:hidden}#jsPanel-replacement-container .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo img,.jsPanel-minimized-box .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo img,.jsPanel-minimized-container .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo img{max-width:100px;max-height:38px}#jsPanel-replacement-container .jsPanel-replacement .jsPanel-titlebar,.jsPanel-minimized-box .jsPanel-replacement .jsPanel-titlebar,.jsPanel-minimized-container .jsPanel-replacement .jsPanel-titlebar{cursor:default;min-width:0}#jsPanel-replacement-container .jsPanel-replacement .jsPanel-btn.jsPanel-btn-normalize,.jsPanel-minimized-box .jsPanel-replacement .jsPanel-btn.jsPanel-btn-normalize,.jsPanel-minimized-container .jsPanel-replacement .jsPanel-btn.jsPanel-btn-normalize{display:block}.jsPanel-minimized-box,.jsPanel-minimized-container{position:absolute;width:100%;overflow:hidden}.flexOne{display:flex;flex-flow:row wrap}.jsPanel-resizeit-handle{display:block;font-size:.1px;position:absolute;touch-action:none}.jsPanel-resizeit-handle.jsPanel-resizeit-n{cursor:n-resize;height:12px;left:9px;top:-5px;width:calc(100% - 18px)}.jsPanel-resizeit-handle.jsPanel-resizeit-e{cursor:e-resize;height:calc(100% - 18px);right:-9px;top:9px;width:12px}.jsPanel-resizeit-handle.jsPanel-resizeit-s{bottom:-9px;cursor:s-resize;height:12px;left:9px;width:calc(100% - 18px)}.jsPanel-resizeit-handle.jsPanel-resizeit-w{cursor:w-resize;height:calc(100% - 18px);left:-9px;top:9px;width:12px}.jsPanel-resizeit-handle.jsPanel-resizeit-ne{cursor:ne-resize;height:18px;right:-9px;top:-9px;width:18px}.jsPanel-resizeit-handle.jsPanel-resizeit-se{bottom:-9px;cursor:se-resize;height:18px;right:-9px;width:18px}.jsPanel-resizeit-handle.jsPanel-resizeit-sw{bottom:-9px;cursor:sw-resize;height:18px;left:-9px;width:18px}.jsPanel-resizeit-handle.jsPanel-resizeit-nw{cursor:nw-resize;height:18px;left:-9px;top:-9px;width:18px}.jsPanel-drag-overlay{width:100%;height:100%;position:absolute;left:0;top:0}.jsPanel-depth-1{box-shadow:0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23)}.jsPanel-depth-2{box-shadow:0 10px 20px rgba(0,0,0,.19),0 6px 6px rgba(0,0,0,.23)}.jsPanel-depth-3{box-shadow:0 14px 28px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.22)}.jsPanel-depth-4{box-shadow:0 19px 38px rgba(0,0,0,.3),0 15px 12px rgba(0,0,0,.22)}.jsPanel-depth-5{box-shadow:0 24px 48px rgba(0,0,0,.3),0 20px 14px rgba(0,0,0,.22)}.jsPanel-snap-area{position:fixed;background:#000;opacity:.2;border:1px solid silver;box-shadow:0 14px 28px rgba(0,0,0,.5),0 10px 10px rgba(0,0,0,.5);z-index:9999}.jsPanel-snap-area-lb,.jsPanel-snap-area-lc,.jsPanel-snap-area-lt{left:0}.jsPanel-snap-area-cb,.jsPanel-snap-area-ct{left:37.5%}.jsPanel-snap-area-rb,.jsPanel-snap-area-rc,.jsPanel-snap-area-rt{right:0}.jsPanel-snap-area-ct,.jsPanel-snap-area-lt,.jsPanel-snap-area-rt{top:0}.jsPanel-snap-area-lc,.jsPanel-snap-area-rc{top:37.5%}.jsPanel-snap-area-cb,.jsPanel-snap-area-lb,.jsPanel-snap-area-rb{bottom:0}.jsPanel-snap-area-cb,.jsPanel-snap-area-ct{width:25%}.jsPanel-snap-area-lc,.jsPanel-snap-area-rc{height:25%}.jsPanel-snap-area-lt{border-bottom-right-radius:100%}.jsPanel-snap-area-rt{border-bottom-left-radius:100%}.jsPanel-snap-area-rb{border-top-left-radius:100%}.jsPanel-snap-area-lb{border-top-right-radius:100%}.jsPanel-connector-left-bottom,.jsPanel-connector-left-top,.jsPanel-connector-right-bottom,.jsPanel-connector-right-top{width:12px;height:12px;position:absolute;border-radius:50%}.jsPanel-connector-bottom,.jsPanel-connector-left,.jsPanel-connector-right,.jsPanel-connector-top{width:0;height:0;position:absolute;border:12px solid transparent}.jsPanel-connector-left-top{left:calc(100% - 6px);top:calc(100% - 6px)}.jsPanel-connector-right-top{left:-6px;top:calc(100% - 6px)}.jsPanel-connector-right-bottom{left:-6px;top:-6px}.jsPanel-connector-left-bottom{left:calc(100% - 6px);top:-6px}.jsPanel-connector-top{left:calc(50% - 12px);top:100%}.jsPanel-connector-right{left:-24px;top:calc(50% - 12px)}.jsPanel-connector-bottom{left:calc(50% - 12px);top:-24px}.jsPanel-connector-left{left:100%;top:calc(50% - 12px)}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){#jsPanel-replacement-container .jsPanel-replacement .jsPanel-titlebar{max-width:105px}}.jsPanel.card.card-inverse,.jsPanel.panel-danger,.jsPanel.panel-default,.jsPanel.panel-info,.jsPanel.panel-primary,.jsPanel.panel-success,.jsPanel.panel-warning{box-shadow:0 0 6px rgba(0,33,50,.1),0 7px 25px rgba(17,38,60,.4)}.jsPanel.panel{margin:0}.jsPanel-hdr.panel-heading{border-bottom:none;padding:0}.jsPanel-title.panel-title .small,.jsPanel-title.panel-title small{font-size:75%}.jsPanel.card.card-inverse{box-shadow:0 0 6px rgba(0,33,50,.1),0 7px 25px rgba(17,38,60,.4)}.card-default{background:#f5f5f5}.card-danger>.jsPanel-content.jsPanel-content-filled,.card-info>.jsPanel-content.jsPanel-content-filled,.card-primary>.jsPanel-content.jsPanel-content-filled,.card-success>.jsPanel-content.jsPanel-content-filled,.card-warning>.jsPanel-content.jsPanel-content-filled{background:0 0;color:#f5f5f5}.card-default>.jsPanel-content.jsPanel-content-filled{background:0 0;color:#000}@keyframes jsPanelFadeIn{from{opacity:0}to{opacity:1}}.jsPanelFadeIn{opacity:0;animation:jsPanelFadeIn ease-in 1;animation-fill-mode:forwards;animation-duration:.6s}@keyframes jsPanelFadeOut{from{opacity:1}to{opacity:0}}.jsPanelFadeOut{animation:jsPanelFadeOut ease-in 1;animation-fill-mode:forwards;animation-duration:.6s}@keyframes modalBackdropFadeIn{from{opacity:0}to{opacity:.65}}.jsPanel-modal-backdrop{animation:modalBackdropFadeIn ease-in 1;animation-fill-mode:forwards;animation-duration:750ms;background:#000;position:fixed;top:0;left:0;width:100%;height:100%}@keyframes modalBackdropFadeOut{from{opacity:.65}to{opacity:0}}.jsPanel-modal-backdrop-out{animation:modalBackdropFadeOut ease-in 1;animation-fill-mode:forwards;animation-duration:.4s}.jsPanel-modal-backdrop-multi{background:rgba(0,0,0,.15)}.jsPanel-content .jsPanel-iframe-overlay{position:absolute;top:0;width:100%;height:100%;background:0 0}.jsPanel-theme-default{background-color:#cfd8dc;border-color:#cfd8dc}.jsPanel-theme-default>.jsPanel-hdr *{color:#000}.jsPanel-theme-default>.jsPanel-hdr .jsPanel-hdr-toolbar{border-top:1px solid #90a4ae}.jsPanel-theme-default>.jsPanel-content{border-top:1px solid #90a4ae}.jsPanel-theme-default>.jsPanel-content.jsPanel-content-filled{background-color:#cfd8dc;border-top:1px solid #90a4ae}.jsPanel-theme-default>.jsPanel-content.jsPanel-content-filledlight{background-color:#eceff1}.jsPanel-theme-primary{background-color:#2196f3;border-color:#2196f3}.jsPanel-theme-primary>.jsPanel-hdr *{color:#fff}.jsPanel-theme-primary>.jsPanel-hdr .jsPanel-hdr-toolbar{border-top:1px solid #42a5f5}.jsPanel-theme-primary>.jsPanel-content{border-top:1px solid #42a5f5}.jsPanel-theme-primary>.jsPanel-content.jsPanel-content-filled{background-color:#2196f3;border-top:1px solid #42a5f5;color:#fff}.jsPanel-theme-primary>.jsPanel-content.jsPanel-content-filledlight{background-color:#bbdefb;color:#000}.jsPanel-theme-info{background-color:#29b6f6;border-color:#29b6f6}.jsPanel-theme-info>.jsPanel-hdr *{color:#fff}.jsPanel-theme-info>.jsPanel-hdr .jsPanel-hdr-toolbar{border-top:1px solid #4fc3f7}.jsPanel-theme-info>.jsPanel-content{border-top:1px solid #4fc3f7}.jsPanel-theme-info>.jsPanel-content.jsPanel-content-filled{background-color:#29b6f6;border-top:1px solid #4fc3f7;color:#fff}.jsPanel-theme-info>.jsPanel-content.jsPanel-content-filledlight{background-color:#e1f5fe;color:#000}.jsPanel-theme-success{background-color:#4caf50;border-color:#4caf50}.jsPanel-theme-success>.jsPanel-hdr *{color:#fff}.jsPanel-theme-success>.jsPanel-hdr .jsPanel-hdr-toolbar{border-top:1px solid #81c784}.jsPanel-theme-success>.jsPanel-content.jsPanel-content-filled{background-color:#4caf50;border-top:1px solid #81c784;color:#fff}.jsPanel-theme-success>.jsPanel-content.jsPanel-content-filledlight{background-color:#e8f5e9;color:#000}.jsPanel-theme-warning{background-color:#ffc107;border-color:#ffc107}.jsPanel-theme-warning>.jsPanel-hdr *{color:#000}.jsPanel-theme-warning>.jsPanel-hdr .jsPanel-hdr-toolbar{border-top:1px solid #ffd54f}.jsPanel-theme-warning>.jsPanel-content.jsPanel-content-filled{background-color:#ffc107;border-top:1px solid #ffd54f;color:#000}.jsPanel-theme-warning>.jsPanel-content.jsPanel-content-filledlight{background-color:#fff3e0;color:#000}.jsPanel-theme-danger{background-color:#ff3d00;border-color:#ff3d00}.jsPanel-theme-danger>.jsPanel-hdr *{color:#fff}.jsPanel-theme-danger>.jsPanel-hdr .jsPanel-hdr-toolbar{border-top:1px solid #ff6e40}.jsPanel-theme-danger>.jsPanel-content.jsPanel-content-filled{background-color:#ff3d00;border-top:1px solid #ff6e40;color:#fff}.jsPanel-theme-danger>.jsPanel-content.jsPanel-content-filledlight{background-color:#ff9e80;color:#000}.jsPanel-content.jsPanel-content-noheader{border:none!important}body{-ms-overflow-style:scrollbar}`
    css = css + `.jsPanel .VagueImage { display: none !important; }`

    let _style = document.createElement('style')
    _style.innerHTML = css
    _style.type = "text/css"
    document.head.appendChild(_style)
}

(function() {
    'use strict';

    const DBNAME = '__storage_zhihu_lista__'

    let sidebar
    let Store = {}
    Store.cache = {}
    Store.set = function(v) {
        let newdata = Object.assign(Store.cache || {}, v)
        window.localStorage.setItem(DBNAME, JSON.stringify(newdata))
    }
    Store.refresh = function() {
        var d = window.localStorage.getItem(DBNAME)
        if (d) {
            Store.cache = JSON.parse(d)
        }
    }
    let DB = {}
    DB.setRecord = function() {
        console.log('setrecord')
        let k = window.location.origin + window.location.pathname
        let o = new URLSearchParams(window.location.search)
        let p = o.get('page')
        if (p) {
            Store.set({
                [k]: {
                    page: p,
                    url: window.location.href
                }
            })
        }
    }
    DB.getRecord = function() {
        let k = window.location.origin + window.location.pathname
        var d = Store.cache
        if (d && d[k] && d[k].url) {
            return d[k]
        }
        return null
    }

    window.onbeforeunload = function(e) {
        DB.setRecord()
    }


    class MySidebar extends HTMLElement {
        constructor() {
            super()
                // Attach a shadow root to the element.
            let shadowRoot = this.attachShadow({
                mode: 'open'
            });
            shadowRoot.innerHTML = `
      <style>
        :host {  display: block; position: fixed; left: 0; top: 50%; width: 140px; transform: translate(0, -50%); z-index: 1000; }
        :host img.logoa { max-width: 50px }
        :host .preview {display: none; position: absolute; left: 100%; top: 0; background: #fff; padding: 15px;  overflow: auto; z-index: 1000;
    max-height: 100%;   box-shadow: 1px 1px 10px 1px #ccc;
    margin-left: 15px;  min-width: 570px; max-width: 70vw; }
         :host .preview:empty { padding: 0 }
        :host .item {margin-bottom: 10px;}
        :host .VagueImage  { display: none; }
        :host .go { cursor: pointer; border: 1px solid #ccc; width: 80px; margin-top: 10px; }
        :host .go:hover { color: blue }
      </style>
      <div style="    max-height: 70vh;
      overflow: auto;">
      </div>
     <div class="preview"></div>
     <div class="record"></div>
      <slot></slot>
    `;
            var self = this
            this._shadowRoot = shadowRoot
            Gator(shadowRoot).on('click', '.go', function(e) {
                //console.log('clicked on', this);
                var d = this.dataset
                if (d && _anwsers && _anwsers[d.index]) {
                    _anwsers[d.index].scrollIntoView(true)
                    var doc = document.documentElement;
                    var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
                    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
                    window.scrollTo(left, top - 60)
                }
                return false;
            });

            Gator(document.body).on('click', function(e) {
                if (!self.isEqualNode(e.target) || !self.contains(e.target)) {
                    self._shadowRoot.children[2].innerHTML = ''
                }
            })

            Gator(shadowRoot).on('click', '.spreview', function(e) {
                var d = this.dataset
                if (d && _anwsers && _anwsers[d.index]) {
                    //self._shadowRoot.children[2].style.top = (e.clientY - self._top) + 'px'
                    let _html = _anwsers[d.index].innerHTML.replace(/<noscript>/g, '').replace(/<\/noscript>/g, '')
                        //.replace(/_b.jpg/g, '_hd.jpg')
                        //self._shadowRoot.children[2].innerHTML = _html

                    jsPanel.create({
                        container: document.body,
                        headerTitle: d.title,
                        contentSize: '750 550',
                        position: 'center',
                        content: _html,
                        dragit: {
                            containment: [10]
                        }
                    })

                    //html2canvas(_anwsers[d.index].querySelector('.RichContent')).then(function(canvas) {
                    //    self._shadowRoot.children[2].appendChild(canvas);
                    //}).catch(function(e) {
                    //    console.error(e)
                    //})
                }
            })

            let r = DB.getRecord()
            if (r) {
                //console.log('record', r)
                shadowRoot.querySelector('.record').innerHTML = `<a href="${r.url}">上次关闭标签位置${r.page}页</a>`
            }

        }
        getSelfTop() {
            let _style = getComputedStyle(this)
            let top = parseFloat(_style.top) - parseFloat(_style.height) / 2
            this._top = top
        }
        renderItems(arr) {
            this._a = document.querySelector('#QuestionAnswers-answers')
            let str = (obj = {}, index) => {
                return `<div class="item" data-index="${index}"><div style="display: flex; position: relative;">
    <img class="logoa" src="${obj.img}">
    <div>${obj.title}</div>
<a class="item-a"  data-index="${index}" href="${obj.link}" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%;" target="_blank"></a>
</div><div class="go" data-index="${index}">go ${index}</div><div class="spreview" data-title="${obj.title}" data-index="${index}">preview</div></div>`
            }
            let _s = ''
            arr.forEach((v, index) => {
                _s = _s + str(v, index)
            })
            this._shadowRoot.children[1].innerHTML = _s
            this.getSelfTop()
        }
    }
    customElements.define('my-sidebar', MySidebar);

    let _anwsers = []

    function clear() {
        let anwsers = document.querySelectorAll('.AnswerItem')
        if (anwsers) {
            if (_anwsers.length === anwsers.length) {
                return
            }
            _anwsers = anwsers
            anwsers = Array.prototype.slice.call(anwsers)
            window._anwsers = anwsers
            sidebar.renderItems(
                anwsers.map(v => {
                    let avatar = v.querySelector('.AuthorInfo .Avatar')
                    if (avatar) {
                        return {
                            img: avatar ? avatar.getAttribute('src') : '',
                            title: avatar ? avatar.getAttribute('alt') : '',
                            link: v.querySelector('.UserLink.AuthorInfo-avatarWrapper a') ? v.querySelector('.UserLink.AuthorInfo-avatarWrapper a').getAttribute('href') : ''
                        }
                    } else {
                        return {}
                    }
                }).filter(v => v.img)
            )
        }
    }

    function detect() {
        setTimeout(() => {
            var listnode = document.querySelector('#QuestionAnswers-answers > .Card > .ListShortcut > .List')
            if (!listnode) {
                setTimeout(() => {
                    detect()
                }, 3000)
            } else {
                sidebar = new MySidebar()
                document.body.appendChild(sidebar)
                var targetNode = listnode.children[1];
                var config = {
                    attributes: false,
                    childList: true,
                    subtree: true
                };

                var callback = function(mutationsList) {
                    for (var mutation of mutationsList) {
                        //                console.log(mutation)
                        if (mutation.type == 'childList') {
                            if (
                                (mutation.addedNodes && mutation.addedNodes.length > 0) ||
                                (mutation.removedNodes && mutation.removedNodes.length > 0)
                            ) {
                                clear()
                            }
                        }
                    }
                };

                var observer = new MutationObserver(callback);

                observer.observe(document.querySelector('#QuestionAnswers-answers'), config);


                clear()
            }
        }, 300)
    }

    Store.refresh()

    init()

    detect()
})();