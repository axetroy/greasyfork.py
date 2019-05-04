// ==UserScript==
// @name         BilibiliCover - 获取并显示B站视频封面
// @version      3.4.8
// @description  获取并显示B站视频封面
// @author       AnnAngela
// @namespace    https://greasyfork.org/users/129402
// @mainpage     https://greasyfork.org/zh-CN/scripts/33411-bilibilicover
// @supportURL   https://greasyfork.org/zh-CN/scripts/33411-bilibilicover/feedback
// @license      GNU General Public License v3.0 or later
// @compatible   chrome
// @compatible   firefox
// @compatible   opera
// @compatible   safari
// @match        *://www.bilibili.com/video/av*
// @match        *://www.bilibili.com/watchlater*
// @match        *://www.bilibili.com/bangumi/play/*
// @match        *://live.bilibili.com/*
// @run-at       document-start
// @grant        unsafeWindow
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_xmlhttpRequest
// @noframes
// @icon         data:image/png;base64,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
// @icon64       data:image/png;base64,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
// ==/UserScript==
unsafeWindow.addEventListener('load', function() {
    var LF = String.fromCharCode(10),
        XX = String.fromCharCode(47);
    var response;

    function getConfig() {
        return GM_getValue('style', 'image') === 'button' ? 'button' : 'image';
    }
    GM_setValue('style', getConfig());
    var helper = {
        Uri: (function() {
            var class2type = {
                "[object Boolean]": "boolean",
                "[object Number]": "number",
                "[object String]": "string",
                "[object Function]": "function",
                "[object Array]": "array",
                "[object Date]": "date",
                "[object RegExp]": "regexp",
                "[object Object]": "object",
                "[object Error]": "error"
            };
            var toString = class2type.toString;

            var $ = {
                type: function(obj) {
                    if (obj == null) { // jshint ignore:line
                        return obj + "";
                    }
                    return typeof obj === "object" || typeof obj === "function" ?
                        class2type[toString.call(obj)] || "object" :
                        typeof obj;
                }
            };

            function isArraylike(obj) {
                var length = "length" in obj && obj.length,
                    type = $.type(obj);
                if (type === "function" || $.isWindow(obj)) {
                    return false;
                }
                if (obj.nodeType === 1 && length) {
                    return true;
                }
                return type === "array" || length === 0 ||
                    typeof length === "number" && length > 0 && (length - 1) in obj;
            }

            function encode(s) {
                return encodeURIComponent(s)
                    .replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28')
                    .replace(/\)/g, '%29').replace(/\*/g, '%2A')
                    .replace(/%20/g, '+');
            }

            function cat(pre, val, post, raw) {
                if (val === undefined || val === null || val === '') {
                    return '';
                }
                return pre + (raw ? val : encode(val)) + post;
            }
            Object.assign($, {
                isWindow: function(obj) {
                    return obj != null && obj == obj.window; // jshint ignore:line
                },
                isPlainObject: function(obj) {
                    var key;
                    if (!obj || $.type(obj) !== "object" || obj.nodeType || $.isWindow(obj)) {
                        return false;
                    }
                    try {
                        if (obj.constructor &&
                            !hasOwn.call(obj, "constructor") &&
                            !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                            return false;
                        }
                    } catch (e) {
                        return false;
                    }
                    if (support.ownLast) {
                        for (key in obj) {
                            return hasOwn.call(obj, key);
                        }
                    }
                    for (key in obj) {}
                    return key === undefined || hasOwn.call(obj, key);
                },
                each: function(obj, callback, args) {
                    var value,
                        i = 0,
                        length = obj.length,
                        isArray = isArraylike(obj);
                    if (args) {
                        if (isArray) {
                            for (; i < length; i++) {
                                value = callback.apply(obj[i], args);
                                if (value === false) {
                                    break;
                                }
                            }
                        } else {
                            for (i in obj) {
                                value = callback.apply(obj[i], args);
                                if (value === false) {
                                    break;
                                }
                            }
                        }
                    } else {
                        if (isArray) {
                            for (; i < length; i++) {
                                value = callback.call(obj[i], i, obj[i]);
                                if (value === false) {
                                    break;
                                }
                            }
                        } else {
                            for (i in obj) {
                                value = callback.call(obj[i], i, obj[i]);
                                if (value === false) {
                                    break;
                                }
                            }
                        }
                    }
                    return obj;
                }
            });
            var parser = {
                    strict: /^(?:([^:\/?#]+):)?(?:\/\/(?:(?:([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?([^:\/?#]*)(?::(\d*))?)?((?:[^?#\/]*\/)*[^?#]*)(?:\?([^#]*))?(?:\#(.*))?/,
                    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?(?:(?:([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?([^:\/?#]*)(?::(\d*))?((?:\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?[^?#\/]*)(?:\?([^#]*))?(?:\#(.*))?/
                },
                properties = ['protocol', 'user', 'password', 'host', 'port', 'path', 'query', 'fragment'];
            var UriRelative = function(documentLocation) {
                var getDefaultUri = (function() {
                    var href, uri;
                    return function() {
                        var hrefCur = typeof documentLocation === 'string' ? documentLocation : documentLocation();
                        if (href === hrefCur) {
                            return uri;
                        }
                        href = hrefCur;
                        uri = new Uri(href);
                        return uri;
                    };
                }());

                function Uri(uri, options) {
                    var prop, defaultUri = getDefaultUri();
                    options = typeof options === 'object' ? options : {
                        strictMode: !!options
                    };
                    Object.assign(options, {
                        strictMode: false,
                        overrideKeys: false
                    });
                    if (uri !== undefined && uri !== null && uri !== '') {
                        if (typeof uri === 'string') {
                            this.parse(uri, options);
                        } else if (typeof uri === 'object') {
                            for (prop in uri) {
                                if (uri.hasOwnProperty(prop)) {
                                    if (Array.isArray(uri[prop]) || $.isPlainObject(uri[prop])) {
                                        this[prop] = $.extend(true, {}, uri[prop]);
                                    } else {
                                        this[prop] = uri[prop];
                                    }
                                }
                            }
                            if (!this.query) {
                                this.query = {};
                            }
                        }
                    } else {
                        return defaultUri.clone();
                    }
                    if (!this.protocol) {
                        this.protocol = defaultUri.protocol;
                    }
                    if (!this.host) {
                        this.host = defaultUri.host;
                        if (!this.port) {
                            this.port = defaultUri.port;
                        }
                    }
                    if (this.path && this.path[0] !== '/') {
                        //console.error('Bad constructor arguments', JSON.stringify(uri), JSON.stringify(options), new Error().stack);
                    }
                    if (!(this.protocol && this.host && this.path)) {
                        //console.error('Bad constructor arguments', JSON.stringify(uri), JSON.stringify(options), new Error().stack);
                    }
                }
                Uri.encode = function(s) {
                    return encodeURIComponent(s).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
                };
                Uri.decode = function(s) {
                    return decodeURIComponent(s.replace(/\+/g, '%20'));
                };
                Uri.prototype = {
                    parse: function(str, options) {
                        var q, matches, uri = this,
                            hasOwn = Object.prototype.hasOwnProperty;
                        matches = parser[options.strictMode ? 'strict' : 'loose'].exec(str);
                        $.each(properties, function(i, property) {
                            uri[property] = matches[i + 1];
                        });
                        q = {};
                        if (uri.query) {
                            uri.query.replace(/(?:^|&)([^&=]*)(?:(=)([^&]*))?/g, function($0, $1, $2, $3) {
                                var k, v;
                                if ($1) {
                                    k = Uri.decode($1);
                                    v = ($2 === '' || $2 === undefined) ? null : Uri.decode($3);
                                    if (options.overrideKeys || !hasOwn.call(q, k)) {
                                        q[k] = v;
                                    } else {
                                        if (typeof q[k] === 'string') {
                                            q[k] = [q[k]];
                                        }
                                        if (Array.isArray(q[k])) {
                                            q[k].push(v);
                                        }
                                    }
                                }
                            });
                        }
                        uri.query = q;
                    },
                    getUserInfo: function() {
                        return cat('', this.user, cat(':', this.password, ''));
                    },
                    getHostPort: function() {
                        return this.host + cat(':', this.port, '');
                    },
                    getAuthority: function() {
                        return cat('', this.getUserInfo(), '@') + this.getHostPort();
                    },
                    getQueryString: function() {
                        var args = [];
                        $.each(this.query, function(key, val) {
                            var k = Uri.encode(key),
                                vals = Array.isArray(val) ? val : [val];
                            $.each(vals, function(i, v) {
                                if (v === null) {
                                    args.push(k);
                                } else {
                                    args.push(k + '=' + Uri.encode(v));
                                }
                            });
                        });
                        return args.join('&');
                    },
                    getRelativePath: function() {
                        return this.path + cat('?', this.getQueryString(), '', true) + cat('#', this.fragment, '');
                    },
                    toString: function() {
                        return this.protocol + '://' + this.getAuthority() + this.getRelativePath();
                    },
                    clone: function() {
                        return new Uri(this);
                    },
                    extend: function(parameters) {
                        $.extend(this.query, parameters);
                        return this;
                    }
                };
                return Uri;
            };
            return UriRelative(function() {
                return location.href;
            });
        })(),
        coverImage: function coverImage(url) {
            /* 本函数来自 https://greasyfork.org/zh-CN/scripts/30714-获取哔哩哔哩视频的封面图片-get-bilibili-cover-image/code?version=202372 特此感谢*/
            var coverImageBigUrl = url;
            // 去除url中的裁剪标识
            if (url.indexOf("@") > -1) {
                //处理以@做裁剪标识的url
                coverImageBigUrl = url.split("@")[0];
            }
            if (url.indexOf("jpg_") > -1) {
                //处理以_做裁剪标识的url
                coverImageBigUrl = url.split("jpg_")[0] + "jpg";
            }
            if (url.indexOf("png_") > -1) {
                //处理以_做裁剪标识的url
                coverImageBigUrl = url.split("png_")[0] + "png";
            }
            if (url.indexOf("/320_200/") > -1) {
                //有时裁剪标识是在后缀名之前的 目前主要发现的是“番剧”板块的列表里有，但尚不清楚其他地方的情况
                coverImageBigUrl = url.replace("/320_200", "");
            }
            if (coverImageBigUrl.substring(0, 2) === XX + XX) coverImageBigUrl = "https:" + coverImageBigUrl;
            else if (coverImageBigUrl.substring(0, 5) === "http:") coverImageBigUrl = coverImageBigUrl.replace("http:", "https:");
            return coverImageBigUrl;
        },
        window: undefined,
        openWin: function(win, src) {
            if (this.window) this.setImg(src);
            else {
                var self = this,
                    doc = win.document;
                var w = win.innerWidth || doc.docElement.clientWidth || doc.body.clientWidth,
                    h = win.innerHeight || doc.docElement.clientHeight || doc.body.clientHeight;
                self.window = window.open("about:blank", "bilibiliCover", "location=1,scrollbars=1,channelmode=1,width=" + w * 0.8 + ",height=" + h * 0.95 + ",left=" + w * 0.1 + ",top=" + h * 0.1);
                setTimeout(function() {
                    self.window.document.title = "BilibiliCover - 封面获取窗口";
                    self.window.document.body.innerHTML = '<div style="text-align: start;">视频封面地址：</div><textarea readonly="readonly" style="width: 100%; height: 1.1em; font-size: 24px; box-sizing: content-box; overflow: hidden; background-color: white; color: initial;"></textarea><hr><img src="' + src + '" style="max-width: 100%; height: auto; min-height: 300px;"><p id="realsize" style="text-align: center;"></p>';
                    self.window.document.body.innerHTML += "<style> a { cursor: pointer; background-position: center right;background-repeat: no-repeat;background-image: -webkit-linear-gradient(transparent, transparent), url(data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2210%22%20height%3D%2210%22%3E%3Cg%20transform%3D%22translate%28-826.429%20-698.791%29%22%3E%3Crect%20width%3D%225.982%22%20height%3D%225.982%22%20x%3D%22826.929%22%20y%3D%22702.309%22%20fill%3D%22%23fff%22%20stroke%3D%22%2306c%22%2F%3E%3Cg%3E%3Cpath%20d%3D%22M831.194%20698.791h5.234v5.391l-1.571%201.545-1.31-1.31-2.725%202.725-2.689-2.689%202.808-2.808-1.311-1.311z%22%20fill%3D%22%2306f%22%2F%3E%3Cpath%20d%3D%22M835.424%20699.795l.022%204.885-1.817-1.817-2.881%202.881-1.228-1.228%202.881-2.881-1.851-1.851z%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E); background-image: linear-gradient(transparent, transparent), url(data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2210%22%20height%3D%2210%22%3E%3Cg%20transform%3D%22translate%28-826.429%20-698.791%29%22%3E%3Crect%20width%3D%225.982%22%20height%3D%225.982%22%20x%3D%22826.929%22%20y%3D%22702.309%22%20fill%3D%22%23fff%22%20stroke%3D%22%2306c%22%2F%3E%3Cg%3E%3Cpath%20d%3D%22M831.194%20698.791h5.234v5.391l-1.571%201.545-1.31-1.31-2.725%202.725-2.689-2.689%202.808-2.808-1.311-1.311z%22%20fill%3D%22%2306f%22%2F%3E%3Cpath%20d%3D%22M835.424%20699.795l.022%204.885-1.817-1.817-2.881%202.881-1.228-1.228%202.881-2.881-1.851-1.851z%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E); padding-right: 13px; } </style>";
                    self.window.document.body.innerHTML += '<p style="display: flex; flex-wrap: nowrap; justify-content: space-around;"><a target="_blank" id="baidu">Baidu识图搜索</a><a target="_blank" id="google">Google识图搜索</a></p>';
                    self.window.document.body.innerHTML += '<hr><p style="text-align: center;">设置： 选择主站旧版视频播放页封面获取按钮样式为<select id="buttonStyle"><option value="image">播放器右下方图片</option><option value="button">播放器右上方按钮</option></select>';
                    self.window.document.body.style.textAlign = "center";
                    self.window.document.querySelector('[value="' + getConfig() + '"]').selected = true;
                    self.window.document.querySelector('#buttonStyle').addEventListener('change', function(e) {
                        GM_setValue('style', this.value === 'button' ? 'button' : 'image');
                        if (self.window.isDeclared !== true) {
                            var span = self.window.document.createElement('span');
                            span.style.color = "green";
                            span.style.marginLeft = '1em';
                            span.innerText = "保存成功！请刷新源页面！";
                            this.after(span);
                            self.window.isDeclared = true;
                        }
                    });
                    self.setImg(src);
                    var t = self.window.document.querySelector("textarea");
                    t.addEventListener("mouseup", function(e) {
                        if (e.which !== 1) return;
                        var selection = self.window.getSelection();
                        if (selection.toString() !== "") return;
                        this.focus();
                        this.select();
                    });
                    self.window.document.querySelector("#google").addEventListener("click", function() {
                        window.open('https://www.google.com/searchbyimage?encoded_image=&image_content=&filename=&hl=zh-CN&image_url=' + encodeURIComponent(t.value), "_blank").focus();
                    });
                    var link = self.window.document.querySelector("#baidu");
                    link.addEventListener("click", function() {
                        link.innerText = "搜索中……";
                        GM_xmlhttpRequest({
                            url: "https://graph.baidu.com/upload?tn=pc&from=pc&image_source=PC_UPLOAD_URL&image=" + encodeURIComponent(t.value),
                            method: "GET",
                            onerror: function(detail) {
                                self.window.alert('百度识图搜索失败：网络故障\n' + detail);
                                link.innerText = "Baidu识图搜索";
                            },
                            onload: function(res) {
                                console.info('BilibiliCover', 'BaiduNetworkResponse', res, JSON.parse(res.response));
                                try {
                                    response = JSON.parse(res.responseText);
                                } catch (e) {
                                    response = false;
                                }
                                if (!response) {
                                    self.window.alert('百度识图搜索失败：返回数据无法识别\n' + res.responseText);
                                    link.innerText = "Baidu识图搜索";
                                    return;
                                }
                                if (!response.data || !response.data.url) {
                                    self.window.alert('百度识图搜索失败：返回数据格式错误\n' + res.responseText);
                                    link.innerText = "Baidu识图搜索";
                                    return;
                                }
                                window.open(response.data.url, "_blank").focus();
                                link.innerText = "Baidu识图搜索";
                            }
                        });
                    })
                    self.window.addEventListener("beforeunload", function() {
                        self.window = undefined;
                    });
                    self.window.focus();
                    self.window.addEventListener('resize', function() {
                        self.resize();
                    });
                    self.resize();
                }, 0);
            }
        },
        resize: function resize() {
            if (!this.window) return;
            var self = this;
            var collection = this.window.document.querySelectorAll("body > *:not(img):not(style)"),
                totalHeight = 0;
            Array.from(collection).forEach(function(t) {
                totalHeight += self.getRealHeight(t);
            });
            this.window.document.querySelector("body > img").style.maxHeight = "calc(100vh - " + totalHeight + "px)";
        },
        getRealHeight: function getRealHeight(ele) {
            var style = (this.window || window).getComputedStyle(ele);
            var realHeight = 0;
            ['marginTop', 'paddingTop', 'height', 'paddingBottom', 'marginBottom'].forEach(function(p) {
                var v = style[p];
                if (/^\d/.test(v)) realHeight += parseFloat(v);
            });
            return realHeight;
        },
        setImg: function setImg(src) {
            if (!this.window) return;
            var self = this;
            var img = this.window.document.querySelector("img");
            this.window.document.querySelector("img").src = src;
            this.window.document.querySelector("textarea").value = src;
            this.setNaturalSize(img, this.window.document.querySelector("#realsize"));
            this.window.focus();
        },
        setNaturalSize: function setNaturalSize(img, node) {
            var self = this;
            if (img.naturalWidth > 0 && img.naturalHeight > 0) node.innerText = "(" + img.naturalWidth + "×" + img.naturalHeight + ")";
            else setTimeout(function() {
                self.setNaturalSize(img, node);
            }, 100);
        },
        closeWin: function focusWin() {
            if (this.window) this.window.close();
        }
    };
    var body = unsafeWindow.document.body,
        html = unsafeWindow.document.documentElement;
    var innerWidth = unsafeWindow.innerWidth;
    var scrollbarWidth = 0;
    switch ("scroll") {
        case getComputedStyle(body).overflowY:
            scrollbarWidth = innerWidth - body.clientWidth;
            break;

        case getComputedStyle(html).overflowY:
            scrollbarWidth = innerWidth - html.clientWidth;
            break;

        default:
            var backup = body.style.overflowY;
            body.style.overflowY = "scroll";
            scrollbarWidth = unsafeWindow.innerWidth - body.clientWidth;
            body.style.overflowY = backup;
    }
    var url = new helper.Uri();
    var doc = unsafeWindow.document;
    if (unsafeWindow.location.host.includes("www.bilibili.com"))(function loop() {
        var IS_ORIGIN_VIDEO = true;
        var IS_NEW_BANGUMI = false;
        var stardust = doc.cookie.includes('stardustvideo') && +doc.cookie.match(/stardustvideo=(\-?\d+)/)[1] > 0;
        var aid = (url.path.match(/\/video\/av(\d+)/) || [0, -1])[1];
        if (aid === -1) {
            stardust = doc.cookie.includes('stardustpgcv') && doc.cookie.match(/stardustpgcv=(\-?\d+)/)[1] === "0606";
            if (stardust && (url.path.match(/\/bangumi\/play\/ep(\d+)/) || [0, -1])[1] !== -1) {
                IS_NEW_BANGUMI = true;
            }
            IS_ORIGIN_VIDEO = false;
        }
        var style = doc.querySelector('#bilibiliCoverStyle') || doc.createElement('style');
        style.innerText = ".bilibiliCoverHidden { display: none !important }";
        style.id = "bilibiliCoverStyle";
        if (style.parentElement !== doc.body) doc.body.appendChild(style);
        var img = doc.createElement("img");
        img.addEventListener('error', function(e) {
            var args = Array.from(arguments);
            args.unshift('BilibiliCover');
            args.unshift('NetworkError');
            console.error.apply(console, args);
            var s = new helper.Uri(img.src);
            s.query.t = new Date().getTime();
            img.src = s;
        });
        if (IS_ORIGIN_VIDEO && stardust || IS_NEW_BANGUMI) {
            var plw = doc.querySelector('#arc_toolbar_report > .ops, #toolbar_module');
            if (!plw || [
                    (plw.querySelector('.like') || {}).innerText,
                    plw.querySelector('.coin, .coin-info span').innerText,
                    (plw.querySelector('.collect') || {}).innerText
                ].includes('--')) return setTimeout(loop, 100);
            var button = doc.createElement(IS_NEW_BANGUMI ? 'div' : 'span');
            button.title = "获取封面";
            button.innerHTML = '<i class="' + (IS_NEW_BANGUMI ? 'iconfont icon-play" style="display: inline-block; vertical-align: top; width: 24px; height: 24px; line-height: 24px; font-size: 24px; color: #757575; margin-right: 4px; text-align: center;"></i>' : 'van-icon-info_playnumber"></i>') + (IS_NEW_BANGUMI ? '<span style="display: inline-block; vertical-align: top; width: 62px; height: 24px; line-height: 24px; font-size: 14px; color: #505050;">获取封面</span>' : '获取封面');
            if (IS_NEW_BANGUMI) button.setAttribute('style', 'display: block; float: left; height: 24px; margin-left: 12px; cursor: pointer;');
            if (plw.querySelector('.more')) plw.insertBefore(button, plw.querySelector('.more'));
            else plw.appendChild(button);
            button.addEventListener("click", function() {
                var src = img.src;
                if (src) helper.openWin(window, src, 1);
            });
            style.innerText += ".video-toolbar .ops .app { margin-right: 12px; }";
            img.id = "cover_img";
            doc.body.appendChild(img);
            img.style.position = 'absolute';
            img.style.top = '-99999px';
            img.style.left = '0';
            img.style.zIndex = '99999';
            img.style.border = '1px black solid';
            img.style.opacity = '0';
            img.style.transition = 'opacity .13s linear';
            img.style.display = "none";
            var code = null;
            button.addEventListener('mouseover', function(e) {
                if (code) {
                    clearTimeout(code);
                    code = null;
                }
                img.style.display = "block";
                var X = 0,
                    Y = 0,
                    W = 0;
                var p = button;
                do {
                    X += p.offsetTop;
                    Y += p.offsetLeft;
                    p = p.offsetParent;
                } while (p !== doc.body);
                var style = unsafeWindow.getComputedStyle(button);
                X += parseInt(style.marginTop) + parseInt(style.height) + parseInt(style.marginBottom) + 10;
                Y += parseInt(style.marginLeft) + parseInt(style.width) + parseInt(style.marginRight) + 10;
                W = (unsafeWindow.innerWidth - Y - 30) / 2;
                if (W > img.naturalWidth) W = img.naturalWidth;
                img.style.top = X - W * img.naturalHeight / img.naturalWidth - 10 + 'px';
                img.style.left = Y + 'px';
                img.style.width = W + 'px';
                img.style.opacity = '1';
            });
            button.addEventListener('mouseleave', function() {
                if (code) {
                    clearTimeout(code);
                    code = null;
                }
                img.style.opacity = '0';
                code = setTimeout(function() {
                    img.style.top = '-99999px';
                    code = null;
                }, 130);
            });
        } else {
            var plw = doc.querySelector(".player-box, .bangumi-player, .view-later-module .video-box-module > .bili-wrapper"),
                bgray = plw ? plw.querySelector('.bgray-btn-wrap') : undefined;
            if (!plw || !bgray) return setTimeout(loop, 100);
            var button = doc.createElement('div');
            button.classList.add('bgray-btn');
            button.classList.add('show');
            button.style.height = "auto";
            button.innerText = "获取视频封面";
            button.addEventListener("click", function() {
                var src = img.src;
                if (src) helper.openWin(window, src);
            });
            bgray.appendChild(button);
            bgray.style.zIndex = '2';
            (getConfig() === 'button' ? img : button).classList.add('bilibiliCoverHidden');
            img.addEventListener("click", function() {
                var src = this.src;
                if (src) helper.openWin(window, src);
            });
            var sbw = scrollbarWidth;
            img.id = "cover_img";
            img.style.display = "none";
            img.style.position = "absolute";
            img.style.cursor = "pointer";
            plw.appendChild(img);

            function calc() {
                var bsn = Array.from(plw.children).filter(function(ele, i) {
                    return plw.children[i - 1] && ele.nodeName !== "IMG" && /(?:_{2})?bofqi/i.test(plw.children[i - 1].id);
                })[0];
                if (!bsn) {
                    return setTimeout(function() {
                        calc();
                    }, 100);
                }
                var ofs = getComputedStyle(bsn);
                var ofl = parseInt(ofs.width) + parseInt(ofs.marginLeft) + parseInt(ofs.paddingLeft) + parseInt(ofs.borderLeftWidth),
                    ofb = parseInt(ofs.height) + parseInt(ofs.marginTop) + parseInt(ofs.paddingTop) + parseInt(ofs.borderTopWidth),
                    wdt = ofs.width;
                var w = window.innerWidth || doc.docElement.clientWidth || doc.body.clientWidth;
                img.style.left = "calc(" + ofl + "px + 1em)";
                img.style.bottom = "calc(" + ofb + "px + 1em)";
                img.style.width = "calc(" + w + "px / 2 - " + wdt + " / 2 - 2em - " + sbw / 2 + "px)";
                img.style.display = "block";
            }
            calc();
            img.title = "此处是本视频封面大图！" + LF + LF + "右键菜单可复制图片大图地址，" + LF + "左键单击可在新窗口查看大图！";
            window.addEventListener("resize", function() {
                calc();
            });
        }
        var running = false;
        var err = function err() {
            var args = Array.from(arguments);
            args.unshift('BilibiliCover');
            args.unshift('NetworkError:');
            console.error.apply(console, args);
            img.alt = args.map(function(e) { return JSON.stringify(e); }).join('\n');
            running = false;
        };
        setInterval(function() {
            if (IS_ORIGIN_VIDEO) {
                var aidDetected = new helper.Uri().path.match(/\/video\/av(\d+)/)[1];
                if ((aidDetected !== aid || !img.src) && !running) {
                    aid = aidDetected;
                    running = true;
                    GM_xmlhttpRequest({
                        url: "https://api.bilibili.com/x/web-interface/search/type?search_type=video&keyword=av" + aid,
                        method: "GET",
                        onerror: function() {
                            err.apply(undefined, arguments);
                        },
                        onload: function(res) {
                            console.info('BilibiliCover', 'NetworkResponse', res, JSON.parse(res.response));
                            try {
                                response = JSON.parse(res.responseText);
                            } catch (e) {
                                response = false;
                            }
                            if (!response) {
                                err('Unable to parse response');
                                return;
                            }
                            var data = response.data.result;
                            if (!Array.isArray(data)) {
                                err('Backend returns incompatible data(' + (typeof data) + ')');
                                return;
                            }
                            var cover;
                            data.forEach(function(info) {
                                if (info.id === +aid && info.pic) cover = helper.coverImage(info.pic);
                            });
                            if (cover) {
                                img.src = cover;
                            } else {
                                err('Unable to get the cover picture url');
                            }
                            running = false;
                        }
                    });
                }
            } else {
                try {
                    img.src = helper.coverImage(doc.querySelector("#bofqi .bilibili-player-watchlater-item[data-state-play=true] .bilibili-player-watchlater-cover-cell img, .bangumi-info-wrapper .info-cover img, #media_module > a > img").src);
                    // clearInterval(loop_code);
                    img.removeAttribute('alt');
                } catch (_) {
                    console.info("bilibiliCover:", "no img");
                    img.alt = "bilibiliCover: no img";
                }
            }
        }, 100);
    })();
    else if (unsafeWindow.location.host.includes("live.bilibili.com"))(function loop() {
        var link = unsafeWindow.document.createElement("div");
        var error = function(detail) {
            link.innerHTML = '<span style="color: red">封面获取失败=。=（+' + detail + '）</span>';
            var args = Array.from(arguments);
            args.unshift('BilibiliCover');
            args.unshift('NetworkError');
            console.error.apply(console, args);
        };
        var roomid = unsafeWindow.location.pathname.match(/^\/(?:blanc\/)?(\d+)/)[1];
        var userName = (((unsafeWindow.document.querySelector('.room-owner-username') || {}).href || '').match(/\d+/) || [])[0];
        if (roomid) {
            GM_xmlhttpRequest({
                url: "https://api.bilibili.com/x/web-interface/search/type?search_type=live&keyword=" + roomid,
                method: "GET",
                onerror: error,
                onload: function(res) {
                    var container = unsafeWindow.document.querySelector(".seeds-wrap");
                    if (!container) return setTimeout(loop, 100);
                    link.style.display = "inline-block";
                    link.style.marginLeft = link.style.marginRight = "1em";
                    link.innerHTML = '<a href="javascript:void(0);" style="color: #23ade5;">查看封面</a>';
                    container.insertBefore(link, container.firstChild);
                    link.querySelector("a").addEventListener("click", function() {
                        console.info('BilibiliCover', 'NetworkResponse', res, JSON.parse(res.response));
                        try {
                            response = JSON.parse(res.responseText);
                        } catch (e) {
                            response = false;
                        }
                        if (!response) error('无法解析后端返回数据', res); //
                        var cover;
                        var data = response.data && response.data.result;
                        if (!Array.isArray(data.live_room) || !Array.isArray(data.live_user)) {
                            error('后端返回数据格式错误', response);
                            return;
                        }
                        if (data.live_room) data.live_room.forEach(function(info) {
                            if ([info.short_id, info.roomid].indexOf(+roomid) !== -1 && info.user_cover) cover = helper.coverImage(info.user_cover);
                        });
                        if (cover) {
                            helper.openWin(unsafeWindow, cover);
                        } else error('无法获取封面地址，请在主播开播时重试（如已开播则可能是主播未设置封面）', response);
                    });
                }
            });
        }
    })();
    window.addEventListener("beforeunload", function() {
        helper.closeWin();
    });
});