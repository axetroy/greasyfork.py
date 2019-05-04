// ==UserScript==
// @name        AbemaTV, ニコニコ風コメントスクロール
// @description AbemaTVのコメントをスクリーン上に表示、またはニコニコ動画風にスクロールするスクリプト
// @namespace   https://greasyfork.org/users/1242
// @include     https://abema.tv/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @version     0.6.17
// @run-at      document-end
// @grant       GM_xmlhttpRequest
// @grant       exportFunction
// @icon        https://greasyfork.org/system/screenshots/screenshots/000/004/030/original/amebatv.png?1462005933
// ==/UserScript==
(function () {
    "use strict";
	
	// TODO: 0.6.13 jQueryを追加したので、内部の自作関数をjQueryのものに置き換える

    var window = typeof unsafeWindow == "undefined" ? window : unsafeWindow,
        document = window.document,
        GM_TAG = "[AbemaTV, ニコニコ風コメントスクロール]",
		APP_STORAGE_LASTREMIDERMOVE_TIME = GM_TAG + "[LastReminderMoveTime]",
        DEBUG = false;

    // 設定用の定数
    var FLOAT_LIMIT_MIN = 30,
        FLOAT_LIMIT_MAX = 1000,
        FLOAT_WIDTH_MIN = 50,
        FLOAT_WIDTH_MAX = 1000,
        SCROLL_FONTSIZE_MIN = 10,
        SCROLL_FONTSIZE_MAX = 200,
        SCROLL_SPEED_MIN = 1000,
        SCROLL_SPPED_MAX = 10000,
        SCROLL_LINE_MIN = 3,
        SCROLL_LINE_MAX = 100,
        SCROLL_FONT_OPACITY_MIN = 0,
        SCROLL_FONT_OPACITY_MAX = 1,
        FLOAT_FONTSIZE_MIN = 6,
        FLOAT_FONTSIZE_MAX = 100,
        COMMENT_LAOD_INTERVAL_MIN = 1000,
        COMMENT_LAOD_INTERVAL_MAX = 5000;

    // インスタンス作成
    var settings = new Settings(),
        loader = new CommentLoader(),
        floater = new CommentFloat(),
        scroller = new CommentScroll(),
        poster = new CommentPost(),
        schedule = new Schedule(),
        reminder = new Reminder(),
        zapping = new Zapping(),
        ng = new CommentNG();

    /**************************************
     *  汎用メソッド
     **************************************/
    // 関数をunsafeWindowにエクスポートする
    // Greasemonkey2.0から要素にイベントリスナ登録する際は必要
    function exportGMFunc(fn, name) {
        var fnName = name || fn.name;
        if (exportFunction) {
            exportFunction(fn, window, { defineAs: fnName });
        } else {
            window[fnName] = fn;
        }
        return window[fnName];
    }
    // ログ出力
    function log() {
        if (DEBUG) {
            var args = Array.prototype.concat.apply([GM_TAG], arguments);
            console && console.log.apply(console, args);
        }
    }
    // イベントリスナ登録
    function bind(events, callback, useCapture) {
        events = events.split(" ");
        for (var i = 0; i < events.length; i++) {
            if (this.addEventListener) {
                this.addEventListener(events[i], callback, useCapture);
            } else if (this.attachEvent) {
                this.attachEvent("on" + events[i], callback, useCapture);
            }
        }
        return this;
    }
    window.Element.prototype.bind = bind;
    window.Document.prototype.bind = bind;
    window.Window.prototype.bind = bind;
    // クラスがあるか否かを取得する
    var hasClass = window.Element.prototype.hasClass = function (className) {
        var tagClass = " " + this.className + " ";
        return tagClass.indexOf(" " + className + " ") >= 0;
    }
    // クラスを追加する
    var addClass = window.Element.prototype.addClass = function (className) {
        this.className = (this.className + " " + className).trim();
        return this;
    }
    // クラスを削除する
    var removeClass = window.Element.prototype.removeClass = function (className) {
        var tagClass = " " + this.className + " ";
        this.className = tagClass.replace(new RegExp(" " + className + " ", "gm"), "").trim();
        return this;
    }
    // HTMLエスケープ
    var escapeHtml = (function () {
        var maps = {
            '&': '&amp;',
            "'": '&#x27;',
            '`': '&#x60;',
            '"': '&quot;',
            '<': '&lt;',
            '>': '&gt;'
        };
        var reg = '[';
        for (var k in maps) {
            reg += maps[k];
        }
        reg += ']';
        reg = new RegExp(reg, 'gm');
        return function (str) {
            return str && str.replace ?
                str.replace(reg, function (match) {
                    return maps.hasOwnProperty(match) ? maps[match] : match
                })
            : "";
        }
    }());
    // 単数の要素を取得する
    function $(selector, element) {
        return (element || document).querySelector(selector);
    };
    // 複数の要素を取得する
    function $$(selector, element) {
        return (element || document).querySelectorAll(selector);
    };
    // 要素を作成する
    // @html html
    // @container 指定した要素に追加
    // @returns 作成した要素の配列
    function $e(html, container) {
        var holder = document.createElement("div");
        holder.innerHTML = html;
        var children = [];
        for (var i = 0; i < holder.childNodes.length; i++) {
            children.push(holder.childNodes[i]);
            if (container) {
                container.appendChild(holder.childNodes[i]);
            }
        }
        return children;
    }
    // 文字列マッピング
    function stringMap(target, maps) {
        var output = target;
        for (var k in maps) {
            output = output.replace("{" + k + "}", maps[k]);
        }
        return output;
    }
    // CSSを追加
    // @style スタイル
    function addStyle(style) {
        var tag = document.createElement("style");
        tag.innerHTML = style;
        document.getElementsByTagName("head")[0].appendChild(tag);
        return tag;
    }
    // 乱数を生成
    // @min 最小値
    // @max 最大値
    function getRandomInteger(min, max) {
        return Math.ceil(Math.random() * (max - min) + min);
    }
    /**************************************
     *  スクリプトの実装
     **************************************/
    // localStorage に保存した設定のラッパー
    function Settings() {
        var self = this;
        // 設定の初期値
        var Default = function () { }
        Default.prototype = {
            float: true,
            floatreverse: false,
            floatlimit: 50,
            floatwidth: 340,
			floatfontsize: 13,
			floatfontbold: false,
            scroll: true,
            scrollfontsize: 28,
			scrollfontopacity: 1,
            scrollspeed: 5000,
            scrollmaxline: 8,
            twitter: false,
            wheelzapping: false,
            ng: false,
            hiddentwitter: true,
            reminder: true,
            reminderauto: false,
            screenfix: false,
            font: null,
            commentloadinterval: 1200
        }
        var data;
        var handlers = {};
        // 登録したリスナへ設定変更された時に通知する
        // @key リスナを登録するキー
        // @callback リスナ
        this.addListener = function (key, callback) {
            if (!handlers[key]) {
                handlers[key] = [callback];
            } else {
                handlers[key].push(callback);
            }
        }
        // 設定を保存する
        this.save = function () {
            if (localStorage && localStorage.setItem) {
                localStorage.setItem(GM_TAG, JSON.stringify(data));
            }
        }
        // 設定を取得する
        // @key 取得する設定
        this.get = function (key) {
            try {
                if (!data) {
                    data = new Default();
                    if (localStorage && localStorage.getItem) {
                        var d = JSON.parse(localStorage.getItem(GM_TAG));
                        for (var k in d) {
                            if (typeof d[k] != "undefined") {
                                data[k] = d[k];
                            }
                        }
                    }
                }
                return data[key];
            } catch (ex) {
            }
        }
        // 設定を変更する
        // @key 設定するキー
        // @value 設定する値
        this.set = function (key, value) {
            try {
                data[key] = value;
                self.save();

                var h = handlers[key];
                if (h) {
                    for (var i = 0; i < h.length; i++) {
                        try {
                            h[i] && h[i](key, value);
                        } catch (ex) { }
                    }
                }
            } catch (ex) {
                log(ex);
            }
            return value;
        }
        // Range検証付きで設定を変更する
        // @key 設定するキー
        // @value 設定する値
        // @min Range検証の最小値
        // @max Range検証の最大値
        this.setRange = function (key, value, min, max) {
            if (min <= value && value <= max) {
                return self.set(key, value);
            } else {
                throw new RangeError(stringMap("{min}から{max}までの間でなければなりません", {
                    min: min,
                    max: max
                }));
            }
        }
        // setByCommand関数の返り値のオブジェクトを作成する
        // @value 設定しようとした値
        // @returnValue 現在の設定の値
        this._createSetByCommandResult = function (value, resultValue) {
            return {
                success: value === resultValue,
                value: value,
                resultValue: resultValue,
            }
        }
        // コマンドで設定を変更する
        // @returns 更新に成功したか否か
        this.setByCommand = function (command) {
            var args = command.split(" ");
            var key = args[0].substr(1).toLowerCase(), value, resultValue;

            switch (key) {
                // 真偽値の設定、on off で設定可能
                case "scroll":
                case "float":
                case "floatreverse":
				case "floatfontbold":
                case "twitter":
                case "wheelzapping":
                case "ng":
                case "hiddentwitter":
                case "reminder":
                case "reminderauto":
                case "screenfix":
                    if (args[1] == "on" || args[1] == "true") {
                        value = true;
                    } else if (args[1] == "off" || args[1] == "false") {
                        value = false;
                    } else {
                        value = !self.get(key);
                    }
                    resultValue = self.set(key, value);
                    break;
                    // Range検証付き整数設定
                case "floatlimit":
                    value = parseInt(args[1]);
                    resultValue = self.setRange(key, value, FLOAT_LIMIT_MIN, FLOAT_LIMIT_MAX);
                    break;
                case "floatwidth":
                    value = parseInt(args[1]);
                    resultValue = self.setRange(key, value, FLOAT_WIDTH_MIN, FLOAT_WIDTH_MAX);
                    break;
				case "floatfontsize":
				    value = parseInt(args[1]);
					resultValue = self.setRange(key, value, FLOAT_FONTSIZE_MIN, FLOAT_FONTSIZE_MAX);
					break;
                case "scrollspeed":
                    value = parseInt(args[1]);
                    resultValue = self.setRange(key, value, SCROLL_SPEED_MIN, SCROLL_SPPED_MAX);
                    break;
                case "scrollfontsize":
                    value = parseInt(args[1]);
                    resultValue = self.setRange(key, value, SCROLL_FONTSIZE_MIN, SCROLL_FONTSIZE_MAX);
                    break;
                case "scrollmaxline":
                    value = parseInt(args[1]);
                    resultValue = self.setRange(key, value, SCROLL_LINE_MIN, SCROLL_LINE_MAX);
                    break;
                case "scrollfontopacity":
                    value = parseFloat(args[1]);
                    resultValue = self.setRange(key, value, SCROLL_FONT_OPACITY_MIN, SCROLL_FONT_OPACITY_MAX);
                    break;
                case "commentloadinterval":
                    value = parseFloat(args[1]);
                    resultValue = self.setRange(key, value, COMMENT_LAOD_INTERVAL_MIN, COMMENT_LAOD_INTERVAL_MAX);
                    break;
                    // フォント設定
                case "font":
                    value = escapeHtml(args.slice(1).join(" ").replace(/:;\n\r/g, " "));
                    resultValue = self.set(key, value);
                    break;
                default:
                    throw new Error(stringMap("{key} は無効なコマンドです", { key: key }));
            }

            return self._createSetByCommandResult(value, resultValue);
        }
        // localStorageに保存された値を取得する
        this.getStateRaw = function () {
            if (localStorage && localStorage.getItem) {
                return localStorage.getItem(GM_TAG);
            }
        }
        // 指定された設定を取得する
        // 指定されなかった場合はすべての設定を取得する
        // @key 取得する設定を指定
        this.getState = function (key) {
            var keys, states = {};
            if (localStorage && localStorage.getItem) {
                if (key == null) {
                    keys = [
					"twitter",
					"hiddentwitter",
					"float",
					"floatreverse",
					"floatlimit",
					"floatwidth",
					"floatfontsize",
					"floatfontbold",
					"scroll",
					"scrollspeed",
					"scrollfontsize",
					"scrollmaxline",
					"scrollfontopacity",
					"ng",
					"font",
					"reminder",
					"reminderauto",
					"commentloadinterval",
					"wheelzapping",
					"screenfix"
                    ];
                } else {
                    keys = [key];
                }

                for (var i = 0; i < keys.length; i++) {
                    states[keys[i]] = self.get(keys[i]);
                }
            }
            return states;
        }
        // 初期化する
        this.init = function () {
            log("Settings.init()");
        }
        log("Settings()");
    }
    // コメント読み込みを実装
    function CommentLoader() {
        var self = this;
        var counter;
        var lastPostedTime = 0;
        var lastCount = 0;
        var lastLoadedTime = 0;
        var observeTimer = 0;

        this.COMMENT_API = "https://api.abema.io/v1/slots/{slotId}/comments?limit={limit}";
        this.commentInterval = 1200;
        this.slotId = null;
        this.lastSlotId = null;
        this.channel = null;
        this.lastChannel = null;
        this.enable = false;

        // 新着コメントの監視を開始する
        this.start = function () {
            self.enable = true;
            observeTimer = setInterval(self._observe, self.commentInterval);
        }
        // 新着コメントの監視を終了する
        this.stop = function () {
            self.enable = false;
            observeTimer = clearInterval(observeTimer);
        }
        // コメント取得の前にOPSTIONSメソッドでリクエストを送信する
        this._optionCommentsApi = function (slotId, callback) {
			// log("OPTIONS:", slotId);
            GM_xmlhttpRequest({
                url: stringMap(self.COMMENT_API, {
                    slotId: slotId,
                    limit: 20
                }),
                method: "OPTIONS",
                headers: {
                    "Access-Control-Request-Method": "GET",
                    "Access-Control-Request-Headers": "authorization,content-type",
                },
                onload: callback,
            });
        }
        // コメント取得のリクエストを送信する
        this._getCommentsApi = function (slotId, callback) {
			// log("_getCommentsApi()");
			
            GM_xmlhttpRequest({
                url: stringMap(self.COMMENT_API, {
                    slotId: slotId,
                    limit: 20
                }),
                method: "GET",
                headers: {
                    // ユーザー識別トークン
                    "Authorization": "bearer " + getAbmToken(),
                },
                onload: callback,
            });
        }
        // コメントを取得する
        this._loadComment = function (channel, slotId) {
			// log("_loadComment()", channel, slotId);
			
            lastLoadedTime = new Date().getTime();

            // コメント読み込み
            self._getCommentsApi(slotId, function (e) {
                // コメントを読み込む前にOPTIONSメソッドで一回叩く必要がある
                // 404が返ってきたら、初期化読み込み後に再度コメント読み込み
                if (e.status == 404) {
                    self._optionCommentsApi(slotId, function () {
                        self._getCommentsApi(slotId, function (e) {
                            self._onCommentLoaded(e, channel, slotId);
                        });
                    });
                } else {
                    self._onCommentLoaded(e, channel, slotId);
                }
            });
        }
        // コメントを取得した時に呼び出される
        this._onCommentLoaded = function (e, channel, slotId) {
            // log(e);
            try {
                if (!e || !e.responseText) return;
                var data = JSON.parse(e.responseText);
                if (!data || !data.comments) return;

                // 新しいコメントのインデックスが小さいので後ろから探索する
                for (var i = data.comments.length - 1; 0 <= i; i--) {
                    var c = data.comments[i];
                    if (lastPostedTime < c.createdAtMs) {
                        lastPostedTime = c.createdAtMs;
                        // log(c.message);
                        c.channel = channel;
                        c.slotId = slotId;
                        self.onLoaded(c);
                    }
                }
            } catch (ex) {
                log(ex);
            }
        }
        // 新着コメントを監視する
        this._observe = function () {
            if (!self.enable) return;
            // log("_observe()");

            try {
                var channel = self.channelId;
                var slotId = self.slotId || self.lastSlotId;

                // log("channel: " + channelId + ", slotId: " + slotId);

                // 放送ページでない
                if (channel == null || channel == "") return;
                if (!slotId) return;
                // チャンネル変更後CM
                if (channel != self.lastChannel && slotId == null) return;

                self.lastChannel = channel;
                self.lastSlotId = slotId;
				
				// WORNING:
				// コメント数を表示している要素の取得
				
				if (new Date().getTime() - lastLoadedTime <= self.commentInterval) {
                    return;
                }

                self._loadComment(channel, slotId);
            } catch (e) {
                log(e);
            }
        }
        // 初期化する
        this.init = function (options) {
            log("CommentLoader.init()");
            self.commentInterval = options.commentInterval;
        }
        this.onLoaded = null;
        log("CommentLoader()");
    }

    // コメントフロート表示を実装
    function CommentFloat() {
        var self = this;
        var lastSlotId = null;
		
		self.isEndOfScroll = true;
        self.enable = true;
        self.isReverse = false;
        self.container = null;
        self.limit = 50;
		self.fontsize = 12;
		self.fontbold = false;
        // コメントを追加する
        self.push = function (comment) {
            if (!self.enable) return;

            var isSlotIdChanged = lastSlotId != null && lastSlotId != comment.slotId;
            lastSlotId = comment.slotId;

			var EOS = self.isEndOfScroll;
            var container = self.container.firstChild;
			var $container = jQuery(container);
			
            // 除去
            if (self.limit <= container.childNodes.length) {
				if (self.isReverse) {
					var height = container.firstChild.offsetHeight;
                    // 昇順、先頭を除去
                    $container.children().first().remove();
					if (EOS) {
						$container.parent().animate({ scrollTop: container.offsetHeight + "px"}, 0);
					} else {
						$container.parent().animate({ scrollTop: "-=" + height + "px"}, 0);
					}
                } else {
                    // 降順、末尾を除去
					var height = container.lastChild.offsetHeight;
                    $container.children().last().remove();
					if (EOS) {
					 	$container.parent().animate({ scrollTop: 0 + "px" }, 0);
					} else {
						$container.parent().animate({ scrollTop: "+=" + height + "px"}, 0);
					}
                }
            }

            // 作成
            var commentElement = $e(stringMap('<span class="comment{isFirst}" channel="{channel}" cid="{id}">{message}</span>', {
                message: escapeHtml(comment.message),
                channel: escapeHtml(comment.channel),
                id: escapeHtml(comment.id),
                isFirst: isSlotIdChanged ? " isFirst" : ""
            }))[0];
            commentElement.commentObjct = comment;
			var $comment = jQuery(commentElement);
			
            if (self.isReverse) {
				// スクロールを完了
				if (EOS) {
					$container.stop(false, true);
				}
				// 事前に要素の高さを取得する
                // 昇順、末尾に追加
                $container.append($comment);
				// 末尾までスクロール
				if (EOS) {
					$container.parent().animate({ scrollTop: "+=" + (commentElement.offsetHeight + 1) + "px"}, 250);
				} else {
					log("false");
				}
            } else {
				// スクロールを完了
				if (EOS) {
					$container.stop(false, true);
				}
                // 降順、先頭に追加
                container.insertBefore(commentElement, container.firstChild);
				// 先頭までスクロール
				if (EOS) {
					$container
						.css({ marginTop: "-=" + commentElement.offsetHeight + "px" })
						.animate({ marginTop: "0px" }, 250);
				} else {
					// 上に要素が追加された分をスクロール
					container.parentNode.scrollTop += commentElement.offsetHeight;
				}
            }
        }
        // コメントを全て除去する
        self.clear = function () {
            while (self.container.firstChild) {
                self.container.removeChild(self.container.firstChild);
            }
        }
        // コメント一覧を上下反転する
        self.reverse = function () {
            var container = self.container;
			var $container = jQuery(container);
            var comments = Array.prototype.slice.call(container.childNodes).reverse();
            for (var i = 0; i < comments.length; i++) {
                container.appendChild(comments[i]);
            }
			
			if (self.isEndOfScroll) {
				if (self.isReverse) {
					$container.scrollTop(0);
				} else {
					$container.scrollTop(container.scrollHeight);
				}
			} else {
				$container.scrollTop(container.scrollHeight - $container.scrollTop());
			}
        }
        self.scroll = function (scrollTop) {
            self.container.scrollTop = scrollTop;
        }
		self.onWheel = function () {
			var container = self.container;
			var scrollTop = jQuery(self.container).scrollTop();
			if (self.isReverse) {
				self.isEndOfScroll = container.scrollHeight - container.clientHeight - 50 <= container.scrollTop;
			} else {
				self.isEndOfScroll = scrollTop < 50;
			}
		}
        // 初期化する
        var initilized = false;
        self.init = function (options) {
            log("CommentFloat.init()")
            if (!initilized) {
                initilized = true;
                addStyle("\
#floatComments { position: fixed; top: 44px; right: -20px; bottom: 115px;\
width: 340px; padding: 5px 50px 5px 5px;\
color: #fff; background: rgba(0,0,0,0.25); z-index: 8; overflow: auto;\
transition: width 0.1s ease-in-out; }\
#floatComments .comment { display: block; padding: 3px; overflow: hidden;\
border: 1px solid rgba(255,255,255,0.05); border-width: 0 0 1px 0; word-break: break-all; }\
#floatComments.reverse .comment { border-width: 1px 0 0 0; }\
#floatComments .comment:last-child { border: 0; }\
#floatComments .comment.isFirst { border-color: rgba(255,255,255,0.5); }\
#floatComments.disable { visibility: hidden; }\
#floatCommentsInner { position: relative; }\
");
                self.container = $e('<div id="floatComments"><div id="floatCommentsInner" class="inner"></div></div>', document.body)[0];

                if (!options.enable) {
                    self.container.addClass("disable");
                }
                if (options.reverse) {
                    self.container.addClass("reverse");
                    self.container.scrollTo(0, self.container.scrollHeight);
                }

                self.enable = options.enable;
                self.isReverse = options.isReverse;
                self.limit = options.limit;
                self.width = options.width;
				self.fontsize = options.fontsize;
				self.fontbold = options.fontbold;

                self.container.style.width = self.width + "px";
				self.container.style.fontSize = self.fontsize + "px";
				self.container.style.fontWieght = self.fontbold ? "bold" : "normal";

                self.scroll = exportGMFunc(self.scroll, "ANLS_CommentFloat_scroll");
                self.onWheel = exportGMFunc(self.onWheel, "ANLS_CommentFloat_onWheel");
                self.scroll(self.container.scrollHeight);
                if (options.font) {
                    self.container.style.fontFamily = options.font;
                }
				self.container.bind("wheel", self.onWheel);
            } else {
                self.container.style.display = "block";
            }
        }
        self.hide = function () {
            if (self.container) {
                self.container.style.display = "none";
                self.clear();
            }
        }
        log("CommentFloat()");
    }
    // コメントスクロール表示を実装
    function CommentScroll() {
        var self = this;
        var comments = new Array(); // 最大 *SCROLL_LINE_MAX* 行
        for (var i = 0; i < SCROLL_LINE_MAX; i++) {
            comments.push({ count: -1 });
        }
        this.container = null;
        this.maxLine = 8;
        this.speed = 5000;
        this.fontSize = 28;
		this.opaticy = 1;
        // コメントをスクロールする
        this.scroll = function (comment) {
            if (!self.enable) return;

            // 古いコメントは流さない
            // 本当は10秒くらいがいいが取りこぼしが出るので大きめに設定
            if (new Date().getTime() - comment.createdAtMs > 30000) {
                // log("old comment donot scroll", comment);
                return;
            }

            // コメントのハッシュタグを除去する
            comment.message = comment.message.replace(/[#＃♯].*$/g, "");

            // 同時に取得したコメントを縦一列にしないためのディレイ
            setTimeout(function () {
                // 要素の作成
                var c = $e(stringMap('<span class="comment" uid="{uid}">{message}</span>', {
                    message: escapeHtml(comment.message),
                    uid: escapeHtml(comment.id),
                }), self.container)[0];
                c.style.fontSize = self.fontSize + "px";
                c.style.lineHeight = self.fontSize * 1.1 + "px";
                c.addClass("scroll");

                var duration = self.speed;                                   // スクロールに要する時間
                var maxLine = self.maxLine;                                  // コメントの最大行
                var marginWidth = 50;                                        // 最後までスクロール仕切らないので余白を追加
                var bodyWidth = document.body.clientWidth;                   // BODYの横幅
                var commentWidth = c.clientWidth;                            // コメントの横幅
                var totalWidth = bodyWidth + commentWidth;                   // スクロールする総距離
                var pxpms = totalWidth / duration;                           // 1ms間にスクロールする距離
                var commentScrollDuration = commentWidth / pxpms;            // コメントのスクロールに要する時間
                var bodyScrollDuration = bodyWidth / pxpms;                  // BODYのスクロールに要する時間
                var marginScrollDuration = marginWidth / pxpms;              // マージンのスクロールに要する時間
                var now = new Date().getTime();                              // 現在時間
                var renderLine = 0;                                          // スクロールする行
                var renderOverride = false;                                  // 重ねて表示するか否か

                for (i = 0; i < maxLine; i++) {
                    // 初回
                    if (comments[i].count < 0) {
                        comments[i].count = 0;
                        renderLine = i;
                        break;
                    }
                        // 後のコメントの方が長い（速い）
                    else if (comments[i].commentWidth < commentWidth) {
                        // 画面左端でコメントが被らない
                        if (comments[i].scrollEndTime < now + bodyScrollDuration - marginScrollDuration) {
                            renderLine = i;
                            break;
                        }
                    }
                        // 後ろのコメントの方が短い（遅い）、画面右端でコメントが被らない
                    else if (comments[i].commentFullViewTime < now - marginScrollDuration) {
                        renderLine = i;
                        break;
                    }
                }

                // すべての行でコメントが被る
                renderOverride = maxLine == i;
                if (renderOverride) {
					// 行を半分ずらして、半透明に
                    renderLine = getRandomInteger(0, maxLine - 1) + 0.5;
                    c.style.opacity = self.opacity * 0.75;
                } else {
                    comments[renderLine].count++;
                    comments[renderLine].commentWidth = commentWidth;
                    comments[renderLine].scrollEndTime = now + duration;
                    comments[renderLine].commentFullViewTime = now + commentScrollDuration;
                    c.style.opacity = self.opacity;
                }

                c.style.transition = stringMap("left {0}ms linear", {
                    0: duration + marginScrollDuration
                });
                c.style.top = (renderLine * self.fontSize * 1.1 + 45) + "px";
                c.style.left = renderOverride
                    ? "-" + ((commentWidth + marginWidth) * 1.25) + "px"
                : "-" + (commentWidth + marginWidth) + "px";

                // 左端まで流れ終わった要素を除去する
                setTimeout(function () {
                    if (!renderOverride) {
                        comments[renderLine].count--;
                    }
                    self.container.removeChild(c);
                }, duration);
            }, getRandomInteger(0, 3) * 125);
        }
        var initilized = false;
        // 初期化する
        // @options 設定
        this.init = function (options) {
            log("CommentScroll.init()")
            if (!initilized) {
                initilized = true;
                addStyle("\
#scrollComments { position: absolute; top: 0; right: 0; left: 0; bottom: 0; overflow: hidden;\
font-size: 28px; font-weight: bold; color: #fff; pointer-events: none; }\
#scrollComments .comment { position: fixed; opacity: 0; left: 0; top: 0; z-index: 8;\
text-shadow: #000 1px 1px 1px; white-space: nowrap; pointer-events: none; }\
#scrollComments .comment.scroll { opacity: 1; left: 100%; }\
#scrollComments.disable { visibility: hidden; }\
");

                self.container = $e('<div id="scrollComments"></div>', document.body)[0];

                if (!options.enable) {
                    self.container.addClass("disable");
                }
                self.enable = options.enable;
                self.speed = options.speed;
                self.fontSize = options.fontSize;
                self.maxLine = options.maxLine;
				self.opacity = options.opacity;
                if (options.font) {
                    self.container.style.fontFamily = options.font;
                }
            } else {
                self.container.style.display = "block";
            }
        }
        // 非表示にする
        this.hide = function () {
            if (self.container) {
                self.container.style.display = "none";
            }
        }

        log("CommentScroll()");
    }
    // トーストを実装する
    function Toast() {
        var self = this;
        var toast;
        var showTimer;
		
        // トーストを開く（クラスのみ付加、実装はCSS）
        this.show = function (message, timeout) {
            toast.innerHTML = escapeHtml(message);
            toast.className = "toast shown";
            clearTimeout(showTimer);
			showTimer = setTimeout(function () {
                self.close();
            }, typeof timeout == "undefined" ? 5000 : timeout);
        }
        // トーストを閉じる（クラスのみ付加、実装はCSS）
        this.close = function () {
            clearTimeout(showTimer);
            toast.className = "toast";
        }
		// 
		this.onEnter = function () {
			log("onEnter");
			showTimer = clearTimeout(showTimer);
		}
		this.onLeave = function () {
			log("onLeave");
			showTimer = clearTimeout(showTimer);
			showTimer = setTimeout(function () {
                self.close();
            }, 3000);
		}
        // 初期化する
        this.init = function (container) {
            toast = $e('<span class="toast"></span>', container)[0];
			
            self.onEnter = exportGMFunc(self.onEnter, "GM_ANLCS_Toast_onEnter");
            self.onLeave = exportGMFunc(self.onLeave, "GM_ANLCS_Toast_onLeave");
			toast.bind("mousemove mouseenter", self.onEnter);
			toast.bind("mouseleave", self.onLeave);
        }
    }
    // コメント投稿機能を実装
    function CommentPost() {
        var self = this;
        var toast = new Toast();
        var form, commentField;
        var deactiveTimer = 0;

        this.container = null;
        this.COMMENT_LIMIT = 50;
        this.POST_API = "https://api.abema.io/v1/slots/{slotId}/comments";
        this.channelId = null;
        this.slotId = null;
        this.slotStartAt = Math.floor(Date.now() / 1000);
        this.isShare = false;

        // コメント投稿する
        // @message コメント内容、最大50文字
        this.post = function (message) {
            log(message);

            message = message.trim();
            if (message.indexOf("/") == 0) {
                /// コマンド
                try {
                    if (message == "/stateraw") {
                        /// staterawコマンド
                        toast.show(settings.getStateRaw(), 20000);
                    } else if (message.indexOf("/state") == 0) {
                        /// stateコマンド
                        var keys = message.split(" ");
                        var states = settings.getState(keys.length > 1 ? keys[1] : undefined);
                        var state = "";
                        for (var k in states) {
                            state += k + " = " + states[k] + "<br>";
                        }
                        toast.show(state, 20000);
                    } else if (message == "/ngconfig") {
                        /// ngconfigコマンド
                        ng.showConfig();
                    } else if (message == "/help") {
                        /// helpコマンド
                        self.showHelp();
                    } else {
                        /// その他のコマンド
                        var result = settings.setByCommand(message);
                        log(result)
                        if (result.success) {
                            if (result.resultValue === true) {
                                result.resultValue = "on";
                            }
                            if (result.resultValue === false) {
                                result.resultValue = "off";
                            }
                            toast.show(stringMap("設定しました ({resultValue})", result), 3000);
                        } else {
                            toast.show("設定に失敗しました", 5000);
                        }
                    }
                } catch (ex) {
                    toast.show(ex.message + "<br>/help でコマンドのヘルプを表示します。", 5000);
                }
            } else if (message.length > self.COMMENT_LIMIT) {
                toast.show(stringMap("コメントが文字数制限{limit}文字を超えています", {
                    limit: self.COMMENT_LIMIT
                }), 5000);
            } else {
                /// コメント
                self.slotId = self.slotId || lastSlotId;

                self._postComment(message, function (e) {
                    if (e.status == 200) {
                        try {
                            var response = JSON.parse(e.responseText);
                            if (response.id && response.createdAtMs) {
                                toast.show("コメント投稿に成功しました")
                                return;
                            }
                        } catch (ex) { }
                    }
                    toast.show("コメント投稿に失敗しました");
                });
            }
        }
        // APIを利用してコメントを投稿する
        // @message コメント内容
        // @callback コールバック関数
        this._postComment = function (message, callback) {
            // Twitterシェア
            var shareData = null;
            if (self.isShare) {
                shareData = {
                    twitter: getTwitterToken(),
                    elapsed: Math.floor(Date.now() / 1000) - self.slotStartAt,
                };
                if (!shareData.twitter) {
                    shareData = null;
                }
                log("shareDate:", shareData);
            }

            // API
            GM_xmlhttpRequest({
                url: stringMap(self.POST_API, {
                    slotId: self.slotId,
                }),
                data: JSON.stringify({
                    message: message,
                    share: shareData,
                }),
                method: "POST",
                headers: {
                    // ユーザー識別トークン
                    "Authorization": "bearer " + getAbmToken(),
                    "Content-Type": "application/json",
                },
                onload: callback,
                onerror: callback,
            })
        }
        // フォームがSubmitされたとき
        // コメントを投稿する
        this.onSubmit = function (e) {
            log("onSubmit()");
            self.post(e.target.message.value);
            e.target.message.value = "";

            return false;
        }
        // フォームにフォーカスされたとき
        // アクティブ化する
        this.onActive = function (e) {
            form.className = "active";
            clearTimeout(deactiveTimer);
            deactiveTimer = setTimeout(self.onDeactive, 5000);
        }
        // アクティブ化から時間経過
        // 非アクティブ化する
        this.onDeactive = function (e) {
            if (commentField.value.length == 0) {
                form.className = "";
            }
        }
        // フォームがKeyDownされたとき
        this.onFormKeydown = function (e) {
            // 上下キーを無効
            if (e.keyCode == 38 || e.keyCode == 40) {
                e.stopImmediatePropagation();
                e.preventDefault();
                e.stopPropagation();
            }
        }
        // コメントが入力されたとき
        this.onInput = function () {
            var remaing = self.COMMENT_LIMIT - commentField.value.length;
            if (remaing < 0) {
                commentField.value = commentField.value.substr(0, self.COMMENT_LIMIT);
                toast.show(stringMap("コメント文字数制限は{limit}文字です", {
                    limit: self.COMMENT_LIMIT
                }), 3000);
            } else if (remaing < 20) {
                toast.show(stringMap("残り{0}文字入力可能です", { 0: remaing }), 3000);
            }
        }
        // ヘルプをトーストで表示する
        this.showHelp = function () {
			var helps = {
				float: "コメント一覧の表示/非表示",
				floatreverse:"コメント一覧を逆順",
				floatlimit : "コメント一覧の最大表示数",
				floatwidth : "コメント一覧の横幅",
				floatfontsize: "コメント一覧のフォントサイズ",
				scroll : "スクロールコメントの表示/非表示",
				"scrollfontsize {font-size}" : "コメントのフォントサイズ (px)",
				"scrollfontopacity {opacity}" : "コメントの透明度 (px)",
				"scrollspeed {speed}" : "コメント速度 (1秒=1000)",
				"scrollmaxline {line}" : "コメントスクロールの最大行",
				commentloadinterval : "コメント読み込み間隔",
				"font {font}" : "コメントのフォント",
				ng : "コメントNG機能の有効/無効",
				ngconfig : "コメントNG機能の設定",
				twitter: "Twitterコメントの有効/無効",
				reminder : "予約番組通知の有効/無効",
				reminderauto : "予約番組へ自動移動の有効/無効",
				wheelzapping : "ホイールでチェンネル変更の有効/無効",				
			};
            var helpText = '\
<b>/float</b> : コメント一覧の表示/非表示<br>\
<b>/floatreverse </b> : コメント一覧を逆順<br>\
<b>/floatlimit</b> : コメント一覧の最大表示数<br>\
<b>/floatwidth</b> : コメント一覧の横幅<br>\
<b>/floatfontsize</b> : コメント一覧のフォントサイズ<br>\
<b>/scroll</b> : スクロールコメントの表示/非表示<br>\
<b>/scrollfontsize</b> {font-size} : <br>\
コメントのフォントサイズ (px)<br>\
<b>/scrollfontopacity</b> {opacity} : <br>\
コメントの透明度 (px)<br>\
<b>/scrollspeed</b> {speed} : <br>\
コメントスピード (1秒=1000)<br>\
<b>/scrollmaxline</b> {line} : <br>\
コメントスクロールの最大行<br>\
<b>/commentloadinterval</b> : コメント読み込み間隔<br>\
<b>/font</b> {font} : コメントのフォント<br>\
<b>/ng</b> : コメントNG機能の有効/無効<br>\
<b>/ngconfig</b> : コメントNG機能の設定<br>\
<b>/twitter</b> : Twitterコメントの有効/無効<br>\
<b>/reminder</b> : 予約番組通知の有効/無効<br>\
<b>/reminderauto</b> : 予約番組へ自動移動の有効/無効<br>\
<b>/wheelzapping</b> : <br>\
ホイールでチェンネル変更の有効/無効<br>';
            toast.show(helpText, 20000);
        }
        // 初期化する
        var initilized = false;
        this.init = function (options) {
            log("CommentPost.init()")
            if (!initilized) {
                initilized = true;
                self.isShare = options.isShare;
                addStyle("\
#CommentPost {\
position: absolute; bottom: 78px; right: 120px;\
z-index: 9; transition: opacity 0.1s ease-in-out; opacity: 0.01;\
}\
#CommentPost.active  { opacity: 1; }\
#CommentPost input {\
min-width: 320px; max-width: 540px; height: 25px; line-height: 25px; padding: 1px 25px 1px 5px;\
border: 2px solid #fff; background: rgba(255,255,255,0.2); color: #fff; font-size: 15px;\
}\
#CommentPost input:focus, #CommentPost input:active { background: rgba(0,0,0,0.4); }\
#CommentPost .toast { visibility: hidden; position: absolute; right: 0; bottom: 100%;\
border-radius: 12px; margin-bottom: 5px; padding: 2px 12px;\
max-height: 500px; overflow: auto; \
background: rgba(22,22,22,0.95); color: #fff; opacity: 0; transition: opacity 0.3s ease-in-out; }\
#CommentPost .toast.shown { visibility: visible !important; opacity: 1; }\
");
                self.container = form = $e('<form id="CommentPost" onSubmit="return false;">\
<input type="text" name="message" autocomplete="off" placeholder="コメント＆コマンド入力" />\
<span class="count"></span>\
</form>', document.body)[0];
                commentField = $("input", form);

                self.onSubmit = exportGMFunc(self.onSubmit, "GM_ANLCS_CommentPost_onSubmit");
                self.onFormKeydown = exportGMFunc(self.onFormKeydown, "GM_ANLCS_CommentPost_onFormKeydown");
                self.onActive = exportGMFunc(self.onActive, "GM_ANLCS_CommentPost_onActive");
                self.onDeactive = exportGMFunc(self.onDeactive, "GM_ANLCS_CommentPost_onDeactive");
                self.onInput = exportGMFunc(self.onInput, "GM_ANLCS_CommentPost_onInput");

                // コメント投稿
                form.bind("submit", self.onSubmit);
                // アクティブ化
                document.body.bind("mousemove", self.onActive);
                form.bind("keydown focus mousemove", self.onActive);
                // キーダウン
                form.bind("keydown", self.onFormKeydown);
                // コメント入力
                commentField.bind("keyup change", self.onInput);
                // トースト初期化
                toast.init(form);
            } else {
                form.style.display = "block";
            }

            var sideForm = $('[class^="TVContainer__right-comment-area"] form');
            $("textarea", sideForm).setAttribute("placeholder", "コメントを入力、設定コマンドは右下コメント欄へ");
        }
        // フォームを非表示にする
        this.hide = function () {
            if (form) {
                form.style.display = "none";
            }
        }

        log("CommentPost()");
    }
    // 拡張番組表を実装する
    // 番組表のチャンネルをHOVERしたときに
    // そのチャンネルの番組一覧を表示する
    function Schedule() {
        var self = this;
        var closeSidebarObserverTimer;
        var DAY_TIMES = 24 * 60 * 60 * 1000;
        var isScheduleLoading = false;
        var lastViewChannel = null;

        this.container = null;
        this.LOGO_URL = "https://hayabusa.io/abema/channels/logo/{channel}.w100.png";
        this.MEDIA_API = "https://api.abema.io/v1/media?dateFrom={from}&dateTo={to}";
        this.RESERVE_API = "https://api.abema.io/v1/viewing/reservations/slots/{slot}";
        this.RESERVE_GROUP_API = "https://api.abema.io/v1/viewing/reservations/slotGroups/{slot}";
        this.UNRESERVE_API = "https://api.abema.io/v1/viewing/reservations/slots/{slot}";
        this.UNRESERVE_GROUP_API = "https://api.abema.io/v1/viewing/reservations/slotGroups/{slot}";
        this.sendOptions = false;
        this.schedule = {}
        this.reminders = [];

        // Dateオブジェクトから年月日の文字列を返す
        this.getDateKey = function (dateObj) {
            try {
                var dateKey = "";
                dateKey += dateObj.getFullYear();
                dateKey += ("0" + (dateObj.getMonth() + 1)).slice(-2);
                dateKey += ("0" + dateObj.getDate()).slice(-2);
                return dateKey;
            } catch (ex) { log(ex) }
        }

        // ---------------
        // 番組情報
        // ---------------

        // 番組情報取得の前にOPSTIONSメソッドでリクエストを送信する
        // @from 番組表の取得開始日時
        // @to 番組表の取得終了日時
        // @callback コールバック関数
        this._options = function (from, to, callback) {
            GM_xmlhttpRequest({
                url: stringMap(self.MEDIA_API, {
                    from: from,
                    to: to
                }),
                method: "OPTIONS",
                headers: {
                    "Access-Control-Request-Method": "GET",
                    "Access-Control-Request-Headers": "authorization,content-type",
                },
                onload: callback,
            });
        }

        // 番組情報取得のリクエストを送信する
        // @from 番組表の取得開始日時
        // @to 番組表の取得終了日時
        // @callback コールバック関数
        this._get = function (from, to, callback) {
            GM_xmlhttpRequest({
                url: stringMap(self.MEDIA_API, {
                    from: from,
                    to: to,
                }),
                method: "GET",
                headers: {
                    // ユーザー識別トークン
                    "Authorization": "bearer " + getAbmToken(),
                },
                onload: callback,
            });
        }

        // 指定された日のチャンネルの拡張番組表を生成する
        // @returns 生成したか否か
        this._create = function (channelId, date) {
            var dateKey = self.getDateKey(date);
            var schedule = self.schedule[dateKey];

            if (!schedule) return false;

            // スロットを捜索
            var slots;
            for (var i = 0 ; i < schedule.channels.length; i++) {
                if (schedule.channels[i].id == channelId) {
                    slots = schedule.channelSchedules[i].slots;
                    break;
                }
            }

            if (!slots) return false;

            // 日付ヘッダーを挿入する
            $e(stringMap('<div class="header">{month}月{date}日</div>', {
                month: date.getMonth() + 1,
                date: date.getDate(),
            }), self.container);

            // リマインダを取得
            var reminders = self.reminders;

            // 番組一覧を生成する
            for (var j = 0; j < slots.length; j++) {
                var now = new Date();
                var startAt = new Date(slots[j].startAt * 1000); // sec => ms
                var endAt = new Date(slots[j].endAt * 1000);     // sec => ms
                var slotId = slots[j].id;
                var groupId = slots[j].slotGroup ? slots[j].slotGroup.id : "";
                // 予約済み
                var already = !!reminders.find(function (r) {
                    return r.slotId == slotId || r.slotId == groupId;
                });

                // 要素を作成する
                $e(stringMap('<div class="item {onair} {already}" channel="{channel}" slotId="{slotId}" group-slotId="{groupSlotId}">\
<span class="date">{startAt}-{endAt}</span><span class="title">{title}</span></div>', {
    title: slots[j].title,
    startAt: stringMap("{HH}:{MM}", {
        HH: ("0" + startAt.getHours()).slice(-2),
        MM: ("0" + startAt.getMinutes()).slice(-2)
    }),
    endAt: stringMap("{HH}:{MM}", {
        HH: ("0" + endAt.getHours()).slice(-2),
        MM: ("0" + endAt.getMinutes()).slice(-2)
    }),
    onair: startAt <= now && now < endAt ? "onair" : "",
    already: already ? "already" : "",
    channel: slots[j].channelId,
    slotId: slotId,
    groupSlotId: groupId,
}), self.container);
            }

            // 作成成功
            return true;
        };

        // チャンネルと日時を指定して拡張番組表を開く
        // @isAppend 常に作成された拡張番組表に追加で作成するか否か
        this.show = function (channelId, date, isAppend) {
            log("Schedule.show(): " + channelId + ", " + date);

            // スクロール位置を保存
            var scrollTop = self.container.scrollTop;

            if (isAppend) {
                // 次の日を読み込むボタンを除去する
                var nextElement = $(".next", self.container);
                if (nextElement) {
                    self.container.removeChild(nextElement);
                }
            } else {
                // 要素の中身を一掃する
                self.container.innerHTML = "";
            }

            var hasSlots = false;
            // 取得済みの番組一覧を生成する
            while (self._create(channelId, date)) {
                // 次の日
                date = new Date(date.getTime() + DAY_TIMES);
                hasSlots = true;
            }

            if (!hasSlots) return;

            // 次の日の番組があれば、読み込むボタンを生成する
            var dateKey = self.getDateKey(date);
            // 有効な番組日時リスト
            var availableDates;
            for (var key in self.schedule) {
                availableDates = self.schedule[key].availableDates;
                if (availableDates) break;
            }
            for (var i = 0 ; i < availableDates.length; i++) {
                // 次の日の番組表が取得可能
                if (availableDates[i] == dateKey) {
                    var next = $e(stringMap('<div class="next" next="{next}" channel="{channel}">次の日を表示</div>', {
                        next: date.getTime(),
                        channel: channelId,
                    }), self.container)[0];
                    next.bind("click", self.onShowNextDay);
                    break;
                }
            }

            // チャンネルロゴの表示
            self.container.style.backgroundImage = stringMap("url('" + self.LOGO_URL + "')", {
                channel: channelId
            });
            self.container.className = "shown";
            
            // スクロール位置を復元、スクロール位置調整
            if (scrollTop == 0) {
                var onair = $(".onair", schedule.container);
                schedule.container.scrollTo = onair.offsetTop - schedule.container.clientHeight / 2;
            } else {
                self.container.scrollTop = scrollTop;
            }
            // サイドバーの開閉を監視
            clearInterval(closeSidebarObserverTimer);
            closeSidebarObserverTimer = setInterval(function () {
                var list = $('[class*="right-v-channel-list"]')
                if (list.parentNode.className.indexOf("shown") < 0) {
                    self.onCloseDayProgram();
                }
            }, 250);
        }

        // 番組詳細ページを新しいタブで開く
        // @channelId チャンネルID
        // @slotId スロットID
        this.openDetails = function (channelId, slotId) {
            window.open(stringMap("http://abema.tv/channels/{channelId}/slots/{slotId}", {
                channelId: channelId,
                slotId: slotId,
            }), "details");
        }

        // ----------------------
        // 番組表ハンドラ
        // ----------------------

        // 次の日をクリックされたとき
        // 次の日の拡張番組表を表示する
        this.onShowNextDay = function (e) {
            // イベントの伝達を停止
            e.stopImmediatePropagation();
            e.preventDefault();
            e.stopPropagation();

            if (isScheduleLoading) return;
            var next = $(".next", self.container);
            next.className = "next loading";

            var channelId = next.getAttribute("channel");
            var nextTimes = parseInt(next.getAttribute("next"));
            var nextDate = new Date(nextTimes);
            var nextDateKey = self.getDateKey(nextDate);

            var schedule = self.schedule[nextDateKey];
            if (schedule) {
                self.show(channelId, nextDate, true);
            } else {
                isScheduleLoading = true;
                self._get(nextDateKey, nextDateKey, function (e) {
                    // log(e)
                    isScheduleLoading = false;
                    if (e.status == 200) {
                        try {
                            self.schedule[nextDateKey] = JSON.parse(e.responseText);
                            self.show(channelId, nextDate, true);
                        } catch (ex) {
                            log(ex);
                        }
                    }
                });
            }
        }

        // 番組表の番組をHOVERしたとき
        // チャンネルの拡張番組表を表示する
        this.onHoverProgram = function (e) {
            var logo = $("img[class*='logo']", e.target);
            if (!logo) return;

            var channelId = logo.getAttribute("alt");
            var today = new Date();
            var todayKey = self.getDateKey(today);

            if (self.schedule[todayKey]) {
                // 非同期で要素を作成
                setTimeout(function () {
                    self.show(channelId, today);
                });
            }
            lastViewChannel = channelId;
        }

        // 拡張番組表をクリックされたとき
        // 番組表を閉じる
        this.onCloseDayProgram = function () {
            clearInterval(closeSidebarObserverTimer);
            self.container.className = "";
        }

        // 放送中番組一覧ボタンをクリックされたとき
        // 今日の番組表を取得する
        this.onOpenProgram = function (e) {
            log("Schedule.onOpenProgram()")

            // 視聴予約リストを取得する
            reminder.getReminders(0, 100, false, function (reminders) {
                log("onOpenProgram.getReminders.onload");
                self.reminders = reminders.slots;
            });

            var today = new Date();
            var todayKey = self.getDateKey(today);

            // 今日の番組表がなければ
            if (!self.schedule[todayKey]) {
                isScheduleLoading = true;
                // 番組表取得のAPIの使用許可を得る
                self._options(todayKey, todayKey, function (e) {
                    // log(e)
                    // 番組表を取得する
                    self._get(todayKey, todayKey, function (e) {
                        // log(e)
                        if (e.status == 200) {
                            try {
                                self.schedule[todayKey] = JSON.parse(e.responseText);
                                // log(self.schedule);
                                if (lastViewChannel) {
                                    self.show(lastViewChannel, today);
                                }
                            } catch (ex) {
                                log("faild show schedule ?", ex);
                            }
                        }
                        isScheduleLoading = false;
                    });
                });
            }

            // 視聴中のチャンネルを中心にスクロールする
            var onair = $("[class*=styles__current]");
            var scrollTop = onair.offsetHeight / 2 + onair.offsetTop - document.body.scrollHeight / 2;
            onair.parentNode.parentNode.scrollTop = scrollTop;
        }

        // 拡張番組表の番組がクリックされたとき
        // 番組を予約する
        this.onReserve = function (e) {
            var slotId, item, channelId;

            // クリックされた番組を取得する
            if (hasClass.call(e.target, "item")) {
                item = e.target;
            } else if (hasClass.call(e.target.parentElement, "item")) {
                item = e.target.parentElement;
            }

            if (!item) return false;

            // イベント伝達停止
            e.stopPropagation();
            e.stopImmediatePropagation();
            e.preventDefault();

            // 番組のSlotID
            slotId = item.getAttribute("slotId");
            channelId = item.getAttribute("channel");

            if (!slotId) return false;

            if (hasClass.call(item, "onair")) {
                /// 放送中

                // 番組詳細ページを開く
                self.openDetails(channelId, slotId);
            } else if (hasClass.call(item, "already") || hasClass.call(item, "reserved")) {
                /// 予約済み

                // CTRLキーが押されているか
                if (e.ctrlKey == true || e.metaKey == true) {
                    // 予約を解除する
                    self.unreserve(slotId, false, function (success, errorCode) {
                        log("unreserve result:", success, errorCode);

                        item.className = "item";
                        addClass.call(item, success ? "unreserved" : errorCode);

                        // リマインダリストを更新
                        if (success) {
                            var index = self.reminders.findIndex(function (r) {
                                return r.slotId == slotId;
                            });
                            self.reminders.splice(index, 1);
                        }
                    });
                } else {
                    // 番組詳細ページを開く
                    self.openDetails(channelId, slotId);
                }
            } else {
                /// 予約なし

                // 予約する
                self.reserve(slotId, false, function (success, errorCode) {
                    log("reserve result:", success, errorCode);

                    item.className = "item";
                    addClass.call(item, success ? "reserved" : errorCode);

                    // リマインダリストを更新
                    if (success) {
                        self.reminders.push({ slotId: slotId })
                    }
                });
            }
        }

        // 番組の情報を取得する
        // @schedule 番組表
        // @channelId チャンネルID
        // @slotId 番組ID
        this.getSlot = function (schedule, channelId, slotId) {
            // スロットを捜索
            for (var i = 0 ; i < schedule.channels.length; i++) {
                if (schedule.channels[i].id == channelId) {
                    var slots = schedule.channelSchedules[i].slots;
                    for (var j = 0; slots.length; j++) {
                        if (slots[j].id == slotId) {
                            return slots[j];
                        }
                    }
                }
            }
        }

        this.getCurrentSlot = function (channelId, slotId, callback) {
            if (!callback) return;

            var today = new Date();
            var todayKey = self.getDateKey(today);
            var todaySchedule = self.schedule[todayKey];

            if (todaySchedule) {
                callback(self.getSlot(todaySchedule, channelId, slotId));
            } else {
                /// 今日の番組表がなければ、取得する

                isScheduleLoading = true;
                // OPTIONSメソッドで許可を得てから取得する
                self._options(todayKey, todayKey, function (e) {
                    self._get(todayKey, todayKey, function (e) {
                        if (e.status == 200) {
                            try {
                                todaySchedule = self.schedule[todayKey] = JSON.parse(e.responseText);
                                callback(self.getSlot(todaySchedule, channelId, slotId));
                            } catch (ex) {
                                log(ex);
                            }
                        }
                        isScheduleLoading = false;
                    });
                });
            }
        }

        // 視聴予約を解除する
        // @slotId 番組のSlotID、もしくは番組グループのSlotID
        // @isGroup 番組グループの予約を解除するか否か
        this.unreserve = function (slotId, isGroup, callback) {
            log("unreserve()", slotId, isGroup)

            // APIにリクエストを送って予約する
            GM_xmlhttpRequest({
                method: "DELETE",
                url: stringMap(isGroup ? self.RESERVE_GROUP_API : self.RESERVE_API, {
                    slot: slotId
                }),
                onload: function (response) {
                    log("unreserve.onload", response);
                    if (!callback) return;

                    if (response.status == 200) {
                        // 予約成功
                        return callback(true);
                    } else if (response.status == 409) {
                        // 予約済み
                        if (response.responseText.indexOf("already") != -1) {
                            return callback(false, "already");
                        }
                    }
                    // 予約失敗
                    return callback(false, "failed");
                },
                headers: {
                    // ユーザー識別トークン
                    "Authorization": "bearer " + getAbmToken(),
                }
            });
        }

        // 視聴予約を登録する
        // @slotId 番組のSlotID、もしくは番組グループのSlotID
        // @isGroup 番組グループの予約をするか否か
        this.reserve = function (slotId, isGroup, callback) {
            log("reserve()", slotId, isGroup)

            // APIにリクエストを送って予約する
            GM_xmlhttpRequest({
                method: "PUT",
                url: stringMap(isGroup ? self.RESERVE_GROUP_API : self.RESERVE_API, {
                    slot: slotId
                }),
                onload: function (response) {
                    log("reserve.onload", response);
                    if (!callback) return;

                    if (response.status == 200) {
                        // 予約成功
                        return callback(true);
                    } else if (response.status == 409) {
                        // 予約済み
                        if (response.responseText.indexOf("already") != -1) {
                            return callback(false, "already");
                        }
                    }
                    // 予約失敗
                    return callback(false, "failed");
                },
                headers: {
                    // ユーザー識別トークン
                    "Authorization": "bearer " + getAbmToken(),
                }
            });
        }

        var initilized = false;
        // 初期化する
        this.init = function () {
            log("Schedule.init()");
            if (!initilized) {
                initilized = true;

                addStyle("\
#gmSchedule { display: none; position: fixed; top: 0; right: -852px; bottom: 0; width: 852px; z-index: 9; overflow-y: scroll;\
background: #101010 no-repeat 280px 20px; opacity: 0; transition: opacity 0.2s ease-in, right 1s ease-in; color: #fff; }\
#gmSchedule.shown { display: block; opacity: 1; right: 0; }\
#gmSchedule.shown:after { display: block; content: ''; position: absolute; top: 0; left: 400px; bottom: 0; right: 0;\
background: #000; box-shadow: 0 0 8px #000; }\
#gmSchedule .item { display: flex; align-items: center; position: relative; padding: 1px 16px; box-sizeing: border-box; cursor: pointer; }\
#gmSchedule .item:before { display: none; content: ''; position: absolute; width: 14px; height: 14px;\
transform: rotate(-45deg); right: 90px; top: 100%; background: #6fb900; z-index: 9; }\
#gmSchedule .item:after { display: none; content: '視聴予約する'; position: absolute; padding: 5px; text-align: center;\
width: 120px; right: 5px; top: 100%; margin-top: 3px; background: #6fb900; z-index: 9; border-radius: 3px; }\
#gmSchedule .item.reserved { border-left: solid 5px red; padding-left: 11px; }\
#gmSchedule .item.reserved:before, #gmSchedule .item.reserved:after { background: red; }\
#gmSchedule .item.reserved:after { content: '予約完了！'; }\
#gmSchedule .item.failed:before, #gmSchedule .item.failed:after { background: #606060; }\
#gmSchedule .item.failed:after { content: '予約失敗;;'; }\
#gmSchedule .item.already { border-left: solid 5px red; padding-left: 11px; }\
#gmSchedule .item.already:before, #gmSchedule .item.already:after { background: red; }\
#gmSchedule .item.already:after { content: '予約済みです'; }\
#gmSchedule .item:hover:before, #gmSchedule .item:hover:after { display: block; }\
#gmSchedule .item:nth-child(2n+1) { background: #202020; }\
#gmSchedule .item, #gmSchedule .next, #gmSchedule .header { width: 400px; }\
#gmSchedule .item:last-child, #gmSchedule .next { margin-bottom: 15px; }\
#gmSchedule .item.onair { background: #606060; padding-left: 11px; border-left: solid 5px #6fb900; }\
#gmSchedule .item .date { display: block; color: #aaa; font-size: 11px; white-space: nowrap; }\
#gmSchedule .item .title { display: block; font-size: 13px; margin-left: 5px; }\
#gmSchedule .next { cursor: pointer; text-align: center; }\
#gmSchedule .header { text-align: center; margin: 15px 0 18px 0; }");

                self.onHoverProgram = exportGMFunc(self.onHoverProgram, "GM_ANLCS_Schedule_onHoverProgram");
                self.onOpenProgram = exportGMFunc(self.onOpenProgram, "GM_ANLCS_Schedule_onOpenProgram");
                self.onCloseDayProgram = exportGMFunc(self.onCloseDayProgram, "GM_ANLCS_Schedule_onCloseDayProgram");
                self.onShowNextDay = exportGMFunc(self.onShowNextDay, "GM_ANLCS_ScheduleonShowNextDay");
                self.onReserve = exportGMFunc(self.onReserve, "GM_ANLCS_Schedule_onReserve")

                self.container = $e('<div id="gmSchedule"></div>', document.body)[0];
                self.container.bind("click", self.onReserve);
                self.container.bind("click", self.onCloseDayProgram);
            }

            var openerButton = $$('[class^="styles__side"] [class*="box"] [class*="button"]')[1];
            openerButton && openerButton.bind("click", self.onOpenProgram);

            var programList = $('[class*="right-slide-base"]');
            programList && programList.bind("mouseover", self.onHoverProgram);
        }
        log("Schedule()")
    }
    // 予約した番組を通知する
    function Reminder() {
        var self = this;
        var observeTimer = 0;
        var dragTimer = 0;
        var POPUP_BEFORE_TIME = DEBUG ? 100 * 60 * 1000 : 2 * 60 * 1000,
        CLOSE_POPUP_TIME = DEBUG ? 100.2 * 60 * 1000 : 2.2 * 60 * 1000,
        OBSERVE_INTERVAL = DEBUG ? 20 * 1000 : 100 * 1000,
        AUTOMOVE_BEFORE_TIME = DEBUG ? 1000 : 30;

        self.OBSERVE_INTERVAL = 60 * 1000;
        self.API = "https://api.abema.io/v1/viewing/reservations/slots?limit={limit}&since={since}&withDataSet={withDataSet}";
        self.container = null;
        // 番組通知の有効無効
        self.enable = true;
        // 通知番組に自動で移動するか否か
        self.automove = false;
        // リマインダー
        self.slots = [];
        // 表示予定、表示中のポップアップを格納
        self.popups = {};

        // 通知ポップアップ
        self.ReminderPopup = function (slotId, programId, channelId, title, startAt, endAt) {
            var popup = this;
            // タイマー類
            popup.showTimer = 0;
            popup.closeTimer = 0;
            popup.agoTimer = 0;

            // メンバー
            popup.slotId = slotId;
            popup.programId = programId;
            popup.channelId = channelId;
            popup.title = title;
            popup.startAt = startAt;
            popup.endAt = endAt;
            popup.thumb = stringMap("https://hayabusa.io/abema/programs/{programId}/thumb001.w80.h45.jpg", {
                programId: programId,
            });
            popup.isHide = false;

            // 要素を作成
            popup.element = $e(stringMap('<a class="popup" href="/now-on-air/{channel}">\
<div class="title">{title}</div><img class="thumb" src="{thumb}" alt="" />\
<div class="time-container"><span class="line1">放送開始まで</span>\
<span class="line2"><span class="time"></span><span class="ext">秒</span></span>\
<span class="line3">放送中</span></div>\
</a>', {
    title: popup.title,
    time: Math.ceil((popup.startAt.getTime() - new Date().getTime()) / 1000),
    thumb: popup.thumb,
    channel: popup.channelId,
}), self.container)[0];

		popup.updateTime = function () {
				// 放送開始までの時間を算出する
				var startAgo = Math.ceil((popup.startAt.getTime() - new Date().getTime()) / 1000);
				$(".time", popup.element).innerHTML = startAgo;

				// log("ago:", self.automove, startAgo, AUTOMOVE_BEFORE_TIME, popup.isHide, popup.channelId, lastChannelId)
				
				if (startAgo <= 0) {
					if (lastChannelId == popup.channelId && !isHide) {
						popup.isHide = true;
						addClass.call(popup.element, "hide");
					} else {
						addClass.call(popup.element, "onair");
					}
				}
				if (self.automove && startAgo < AUTOMOVE_BEFORE_TIME &&
					!popup.isHide && popup.channelId != lastChannelId && lastChannelId != "") {
					try {
						// log("automove");
						
						var lastMoveTime = parseInt(localStorage[APP_STORAGE_LASTREMIDERMOVE_TIME]);
						
						log(lastMoveTime, new Date().getTime());
						// 連続で移動しないため
						if (lastMoveTime + 60 * 1000 > new Date().getTime()) {
							return;
						}
						localStorage[APP_STORAGE_LASTREMIDERMOVE_TIME] = new Date().getTime().toString();
						// log(localStorage[APP_STORAGE_LASTREMIDERMOVE_TIME]);
					} catch (ex) {
						//
					}
					
					window.location.href = "http://abema.tv/now-on-air/" + popup.channelId;
				}
			}

            // 表示する
            popup.onShow = function () {
                log("popup.onShow()");
                popup.updateTime();
                popup.showTimer = clearTimeout(popup.showTimer);
                addClass.call(popup.element, "shown");
                popup.agoTimer = setInterval(popup.updateTime, 1000);
                // 時間経過で閉じる
                popup.closeTimer = setTimeout(popup.onClose, CLOSE_POPUP_TIME);
            };

            // 閉じる
            popup.onClose = function () {
                popup.closeTimer = clearTimeout(popup.closeTimer);

                if (hasClass.call(popup, "shown")) {
                    removeClass.call(popup, "shown");
                }
                setTimeout(function () {
                    self.container.removeChild(popup.element);
                }, 1000);

                delete self.popups[popup.slotId];
            };

            // ドラッグ＆ドロップで予約を解除する
            var isMousedown = false;
            popup.onMousedown = function (e) {
                isMousedown = true;
                addClass.call(popup.element, "drag");
                dragTimer = clearTimeout(dragTimer);
                dragTimer = setTimeout(popup.onMouseup, 2000);
            }
            popup.onMouseup = function (e) {
                dragTimer = clearTimeout(dragTimer);
                isMousedown = false;
                removeClass.call(popup.element, "drag");
            }
            popup.onMouseout = function () {
                dragTimer = clearTimeout(dragTimer);
                if (isMousedown) {
                    schedule.unreserve(popup.slotId, false, function (suc) {
                        if (suc) {
                            popup.dispose();
                        } else {
                            popup.isHide = true;
                            popup.element.style.display = "none";
                        }
                    })
                }
            }
            // ---------

            // 外部から
            popup.dispose = function () {
                try {
                    popup.showTimer = clearTimeout(popup.showTimer);
                    popup.closeTimer = clearTimeout(popup.closeTimer);
                    popup.agoTimer = clearInterval(popup.agoTimer);
                    self.container.removeChild(popup.element);
                    delete self.popups[popup.slotId];
                } catch (ex) {

                }
            }

            popup.onMousedown = exportGMFunc(popup.onMousedown, "GM_ANCS_ReminderPopup.onMousedown");
            popup.onMouseup = exportGMFunc(popup.onMouseup, "GM_ANCS_ReminderPopup.onMouseup");
            popup.onMouseout = exportGMFunc(popup.onMouseout, "GM_ANCS_ReminderPopup.onMouseout");

            popup.element.bind("mousedown", popup.onMousedown);
            popup.element.bind("mouseup", popup.onMouseup);
            popup.element.bind("mouseleave", popup.onMouseout);


            // 番組開始前に通知する
            var diff = popup.startAt.getTime() - new Date().getTime();
            if (diff > 0) {
                popup.showTimer = setTimeout(popup.onShow, diff - POPUP_BEFORE_TIME);
            } else {
                setTimeout(function () {
                    popup.dispose();
                }, 500);
            }

            log("ReminderPopup()", popup);
        }

        // 予約した番組を取得する
        // @daysOffset 
        // @withDataSet 番組詳細を大事に取得する
        // @callback コールバック関数
        self.getReminders = function (daysOffset, limit, withDataSet, callback) {
            // log("Reminder.getReminders()");

            // daysOffsetに基づいて現在時刻から日付を変更する
            var since = new Date();
            if (daysOffset != null && daysOffset != 0) {
                since.setDate(since.getDate() + daysOffset);
                since.setHours(0);    // 0時
                since.setMinutes(0);  // 0分
                since.setSeconds(-1); // 1秒前
            }
            since = Math.ceil(since.getTime() / 1000);

            // URLを作成
            var requestUrl = stringMap(self.API, {
                limit: limit == null ? 100 : limit,
                since: since,
                withDataSet: withDataSet ? "true" : "false",
            });

            // OPTIONSメソッドでAPI利用の許可を得る
            GM_xmlhttpRequest({
                url: requestUrl,
                method: "OPTIONS",
                headers: {
                    "Access-Control-Request-Method": "GET",
                    "Access-Control-Request-Headers": "authorization,content-type",
                },
                onload: function (response) {
                    // log("getReminders.onload", response);
                    // APIで予約した番組取得する
                    GM_xmlhttpRequest({
                        url: requestUrl,
                        method: "GET",
                        headers: {
                            // ユーザー識別トークン
                            "Authorization": "bearer " + getAbmToken(),
                        },
                        onload: function (response) {
                            // log("getReminders.onload.onload", response)
                            if (response.status == 200) {
                                var reminders = JSON.parse(response.responseText);
                                log("reminders", reminders);
                                callback && callback(reminders);
                            }
                        }
                    });
                }
            })
        }

        // 通知を更新する
        self.updateReminders = function () {
            self.getReminders(0, 5, true, function (reminders) {
                if (!self.enable) return;

                var oldPopups = self.popups;
                var newPopups = {};

                var slots = reminders.dataSet.slots;
                for (var i = 0; i < slots.length; i++) {
                    var slotId = slots[i].id;
                    var programId = slots[i].displayProgramId;
                    var channelId = slots[i].channelId;
                    var title = slots[i].title;
                    var startAt = new Date(slots[i].startAt * 1000); // sec => ms
                    var endAt = new Date(slots[i].endAt * 1000);     // sec => ms
                    var thumbAt = slots[i].thumbversion;

                    if (oldPopups[slotId]) {
                        // すでに作成されていたら、参照する
                        newPopups[slotId] = oldPopups[slotId];
                        delete oldPopups[slotId];
                    } else {
                        // 新しい予約通知を作成する
                        newPopups[slotId] = new self.ReminderPopup(slotId, programId, channelId,
                            title, startAt, endAt, slots, thumbAt);
                    }
                }

                // 予約解除されていた通知を削除する
                for (var key in oldPopups) {
                    oldPopups[key].dispose();
                }

                self.popups = newPopups;
            });
        }

        var initilized = false;
        self.init = function (options) {
            if (initilized) return;
            initilized = true;

            log("Reminder.init()");

            addStyle("\
#gmReminder { position: fixed; bottom: 119px; left: 0; z-index: 4;  }\
#gmReminder .popup { display: none; position: relative; left: -250px; width: 220px; height: 0; padding: 8px 0 8px 12px; \
color: #fff; background: #000; border: solid 1px #808080; border-left: 0; text-decoration: none;\
transition: left 1.0s linear .3s, height .3s linear .0s, background .1s linear .0s;\
box-sizing: border-box; z-index: 13; overflow: hidden; }\
#gmReminder .popup.shown { display: block; left: 0; height: auto; margin-top: 5px; }\
#gmReminder .popup.shown:hover { background: #303030; }\
#gmReminder .popup.shown.drag:after { position: absolute; content: '画面へドロップで予約解除'; left: 0; top: 0;\
background: rgba(0,0,0,0.8); color: #fff; text-align: center; height: 100%; width: 100%;\
display: flex; flex-flow: column; justify-content: center; pointer-events: none; z-index: 14; }\
#gmReminder .popup .close:hover { background: #303030; }\
#gmReminder .popup .title { display: block; white-space: nowrap; overflow: hidden; \
text-overflow: ellipsis; margin-bottom: 5px; margin-right: 8px; font-size: 0.9em; }\
#gmReminder .popup .thumb { display: block; width: 80px; height: 40px; float: left; border: 0; }\
#gmReminder .popup .time-container { display: block; color: #afafaf; float: left; \
height: 45px; width: 126px; vertical-align: middle; text-align: center; }\
#gmReminder .popup .time-container .line1 { display: block; font-size: 0.9em; }\
#gmReminder .popup .time-container .line2 { display: block; }\
#gmReminder .popup .time-container .time { color: #fff; font-size: 1.5em; margin-right: 5px; }\
#gmReminder .popup .time-container .ext { color: #afafaf; font-size: 0.9em; }\
#gmReminder .popup .time-container .line3 { display: none; height: 45px; width: 126px;\
font-size: 1.5em; text-align: center; vertical-align: middle; color: #fff; }\
#gmReminder .popup.onair .time-container .line1 { display: none; }\
#gmReminder .popup.onair .time-container .line2 { display: none; }\
#gmReminder .popup.onair .time-container .line3 { display: table-cell; }\
#gmReminder .popup .time-container:after { clear: left; }\
#gmReminder .popup.hide { display: none; }\
");

            self.enable = options.enable;
            self.automove = options.automove;
            self.container = $e('<div id="gmReminder" />', document.body)[0];

            // 定期的にリマインダを読み込む
            observeTimer = setInterval(self.updateReminders, OBSERVE_INTERVAL);

            setTimeout(self.updateReminders, 5000);
        }
        log("Reminder()");
    }
    // マウスホイールでチャンネル変更を有効化/無効化
    function Zapping() {
        var self = this;
        this.enable = false;
        this.isOnAirPage = false;
        var initilized = false;
        this.init = function (options) {
            var overlap = $("[class*='style__overlap']");
            if (overlap) {
                overlap.bind("wheel mousewheel DOMMouseScroll", exportGMFunc(function (e) {

                    if (self.enable) {
                        e.stopImmediatePropagation();
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }, "GM_ANLCS_overlap_onMousewheel"), true);
            }
            if (!initilized) {
                initilized = true;
                self.enable = options.enable;
            }
        }
    }
    // コメントNG機能を実装
    function CommentNG() {
        var self = this;
        var NG_FILTER_ITEM = '<div class="item"><input type="text" class="ng" placeholder="NGワード / 正規表現" /><button class="button remove">削除</button></div>';
        this.filters = [];
        this.enable = false;
        this.container = null;
        this.setFilters = function (value) {
            var filters = [];
            if (Array.isArray(value)) {
                for (var i = 0; i < value.length; i++) {
                    if (self.isRegExp(value[i])) {
                        filters.push(new RegExp(value[i].slice(1, -1), "gm"));
                    } else if (value[i].length > 0) {
                        filters.push(value[i]);
                    }
                }
            }
            self.filters = filters;
        }
        // NGリストとマッチングする
        this.match = function (target) {
            log(target)
            log(self.filters)
            for (var i = 0 ; i < self.filters.length; i++) {
                if (self.filters[i].exec) {
                    if (target.match(self.filters[i])) {
                        return true;
                    }
                } else {
                    if (target.indexOf(self.filters[i]) >= 0) {
                        return true;
                    }
                }
            }
            return false;
        }
        // 設定画面を表示する
        this.showConfig = function () {
            var itemContainer = $(".list", self.container);
            itemContainer.innerHTML = "";

            var filters = settings.get("ngfilter");
            if (Array.isArray(filters)) {
                for (var i = 0 ; i < filters.length; i++) {
                    var item = $e(NG_FILTER_ITEM, itemContainer)[0];
                    $(".ng", item).value = filters[i];
                }
            }

            self.container.addClass("shown");
        }
        // フィルターが正規表現か判別する
        // @filter NGフィルター
        this.isRegExp = function (filter) {
            // 先頭と末尾にスラッシュがあったら、正規表現と判断する
            return filter.length >= 2 && filter.substr(0, 1) == "/" && filter.slice(-1) == "/";
        }
        // 設定を適用する
        this.onApplyConfig = function (ev) {
            var filters = [];
            var elements = $$(".ng", self.container);
            for (var i = 0; i < elements.length; i++) {
                var text = elements[i].value;
                if (self.isRegExp(text) || text.length >= 1) {
                    filters.push(text);
                }
            }
            settings.set("ngfilter", filters);
            self.setFilters(filters);

            self.container.removeClass("shown");
        }
        // 設定を閉じる
        this.onCancelConfig = function () {
            self.container.removeClass("shown");
        }
        // NGフィルタを除去する
        this.onRemoveItem = function (ev) {
            if (window.Element.prototype.hasClass.call(ev.target, "remove")) {
                $(".list", self.container).removeChild(ev.target.parentNode);
                return false;
            }
        }
        // NGフィルタを追加する
        this.onAddItem = function () {
            $e(NG_FILTER_ITEM, $(".list", self.container));
        }
        // NGフィルタのテストをする
        this.onTest = function () {
            var testComment = $(".test .text", self.container).value.toLowerCase();
            var ngWords = $$(".ng", self.container);
            for (var i = 0; i < ngWords.length; i++) {
                ngWords[i].removeClass("match");
				
                var word = ngWords[i].value;
                if (self.isRegExp(word)) {
                    if (testComment.match(new RegExp(word.slice(1, -1), "gm"))) {
                        ngWords[i].addClass("match");
                    }
                } else if (word.length >= 1) {
                    if (testComment.indexOf(word.toLowerCase()) >= 0) {
                        ngWords[i].addClass("match");
                    }
                }
            }
        }
        var initilized = false;
        // 初期化
        this.init = function (options) {
            if (!initilized) {
                initilized = true;
                addStyle('\
#NGConfig { display:none; position: fixed; bottom: 73px; right: 115px; z-index: 9;\
background: #101010; min-width: 310px; border-radius: 5px; padding: 12px; }\
#NGConfig.shown { display: block; }\
#NGConfig .list { max-height: 500px; overflow-y: auto; }\
#NGConfig .list .item { margin: 2px 0; }\
#NGConfig .list .item .ng { width: 200px; border: 0; padding: 0 3px; }\
#NGConfig .list .item .ng.match { background: yellow; }\
#NGConfig .test { margin: 5px; }\
#NGConfig .test .text { border: 0; padding: 0 3px; }\
#NGConfig .command { text-align: right; }\
#NGConfig .button { color: #fff; margin-left: 10px; }\
');
                self.onAddItem = exportGMFunc(self.onAddItem, "GM_NGFilter_onAddItem");
                self.onRemoveItem = exportGMFunc(self.onRemoveItem, "GM_NGFilter_onRemoveItem");
                self.onApplyConfig = exportGMFunc(self.onApplyConfig, "GM_NGFilter_onApplyItem");
                self.onCancelConfig = exportGMFunc(self.onCancelConfig, "GM_NGFilter_onCancelItem");
                self.onTest = exportGMFunc(self.onTest, "GM_NGFilter_onTest");
                self.container = $e('<div id="NGConfig">\
<div class="list"></div>\
<div class="test"><input type="text" class="text" placeholder="NGしたいコメント" /><button class="button done" title="NGワード/正規表現の動作テストをします">テスト</button></div>\
<div class="command"><button class="button add" title="新しいNGワード/正規表現を追加します">NGワード追加</button><button class="button apply" title="NG設定を保存します">適用</button><button class="button cancel">キャンセル</button></div>\
<div>', document.body)[0];
                $(".button.add", self.container).bind("click", self.onAddItem);
                $(".list", self.container).bind("click", self.onRemoveItem, true);
                $(".button.apply", self.container).bind("click", self.onApplyConfig);
                $(".button.cancel", self.container).bind("click", self.onCancelConfig);
                $(".button.done", self.container).bind("click", self.onTest);
                self.enable = options.enable;

                self.setFilters(options.filters);
            }
        }
		log("CommentNG()");
    }
    // 映像のアスペクト比を維持して全体を映す
    function screenFix() {
    	if (!enableScreenFix) return;
    	
        var screen = ($("object") || $("video")).parentNode,
            height = window.innerHeight,
            width = window.innerWidth,
            resizedWidth, resizedHeight;

        if (height < width * 9 / 16) {
            resizedHeight = height;
            resizedWidth = resizedHeight * 16 / 9;
        } else {
            resizedWidth = width;
            resizedHeight = resizedWidth * 9 / 16;
        }
        screen.style.height = resizedHeight + "px";
        screen.style.width = resizedWidth + "px";
        screen.style.left = (width - resizedWidth) / 2 + "px";
    }
    // Twitterパネルの表示/非表示切り替え
    function toggleTwitterPanel(isShow) {
        var target = $("[class*=styles__twitter-panel]");
        if (target) {
            target.style.zIndex = isShow ? "4" : "-1000";
        }
    }
    /**************************************
    *  AbemaTV用のの汎用メソッド
    **************************************/
    // DataLayerのイベント
    var events = {
        gtmJs: "gtm.js",
        gtmLoad: "gtm.load",
        linkClick: "gtm.linkClick",
        pageView: "pageview",
        changedWindowSize: "changedWindowSize",
        slotId: "metaData-slotId",
        isPlaying: "isPlaying",
    };
    // 最新のデータを取得する
    function getDataLayer(eventName) {
        var data = window.dataLayer;
        if (data) {
            for (var i = data.length - 1; i >= 0; i--) {
                if (data[i].event == eventName) {
                    return data[i];
                }
            }
        }
    }
    // AbemaTVのOAuthトークンを取得する
    function getAbmToken() {
        if (localStorage) {
            if (localStorage.getItem) {
                return localStorage.getItem("abm_token");
            } else {
                return localStorage["abm_token"];
            }
        }
    }
    // Twitter連携のOAuthトークンを取得する
    function getTwitterToken() {
        var token, tokenSecret;

        if (localStorage) {
            if (localStorage.getItem) {
                token = localStorage.getItem("abm_twitterToken");
                tokenSecret = localStorage.getItem("abm_twitterTokenSecret");
            } else {
                token = localStorage["abm_twitterToken"];
                tokenSecret = localStorage["abm_twitterTokenSecret"]
            }
            return {
                accessToken: token,
                accessTokenSecret: tokenSecret,
            }
        }
    }
    /****************************
    * 初期化
    ****************************/
    var initilized = false, enableScreenFix = false;
    // 放送ページを開かれたときに呼び出される
    function onOnAirPage(data) {
        log("onOnAirPage()", data);

        // loacalStorageラッパーの初期化
        settings.init();
        // コメントローダーの初期化
        loader.init({
            commentInterval: parseInt(settings.get("commentloadinterval"))
        });
        loader.channelId = data.channelId;
        loader.slotId = null;
        // コメント投稿の初期化
        poster.init({
            isShare: settings.get("twitter")
        });
        // コメントスクローラの初期化
        scroller.init({
            enable: settings.get("scroll"),
            speed: settings.get("scrollspeed"),
            fontSize: settings.get("scrollfontsize"),
            maxLine: settings.get("scrollmaxline"),
            font: settings.get("font"),
			opacity: parseFloat(settings.get("scrollfontopacity")),
        });
        // コメント一覧の初期化
        floater.init({
            enable: settings.get("float"),
            isReverse: settings.get("floatreverse"),
            limit: settings.get("floatlimit"),
            width: settings.get("floatwidth"),
            font: settings.get("font"),
			fontsize: settings.get("floatfontsize"),
			fontbold: settings.get("fontbold"),
        });
        // 番組表拡張の初期化
        schedule.init();
        // ザッピング無効の初期化
        zapping.isOnAirPage = true;
        zapping.init({
            enable: settings.get("wheelzapping")
        });
        // リマインダーを初期化
        reminder.init({
            enable: settings.get("reminder"),
            automove: settings.get("reminderauto"),
        });
        // コメントNGの初期化
        ng.init({
            enable: settings.get("ng"),
            filters: settings.get("ngfilter")
        });
        enableScreenFix = settings.get("screenfix");
        // Twitterパネル非表示設定適用
        toggleTwitterPanel(!settings.get("hiddentwitter"))

        if (!initilized) {
            initilized = true;

            loader.onLoaded = onCommentLoaded;
            settings.addListener("scroll", function (key, value) {
                scroller.enable = value;
                if (value) {
                    scroller.container.removeClass("disable");
                } else {
                    scroller.container.addClass("disable");
                }
            });
            settings.addListener("float", function (key, value) {
                floater.enable = value;
                if (value) {
                    floater.container.removeClass("disable");
                } else {
                    floater.container.addClass("disable");
                }
            });
            settings.addListener("floatreverse", function (key, value) {
                log(value)
                var oldValue = floater.isReverse;
                floater.isReverse = value;
                if (oldValue != value) {
                    floater.reverse();
                }
                if (value) {
                    floater.container.addClass("reverse");
                    container.scrollTo(0, container.scrollHeight);
                } else {
                    floater.container.removeClass("reverse");
                    container.scrollTo(0, 0);
                }
            });
            settings.addListener("floatlimit", function (key, value) {
                var container = floater.container;
                floater.limit = value;
                var overflowCount = container.childNodes.length - value;
                if (overflowCount > 0) {
                    for (var i = 0; i < overflowCount; i++) {
                        if (floater.isReverse) {
                            // 昇順
                            container.removeChild(container.firstChild);
                        } else {
                            // 降順
                            container.removeChild(container.lastChild);
                        }
                    }
                }
            });
            settings.addListener("floatwidth", function (key, value) {
                floater.container.style.width = value + "px";
                floater.width = value;
            });
			settings.addListener("floatfontsize", function (key, value) {
				floater.container.style.fontSize = value + "px";
				floater.fontsize = value;
			});
			settings.addListener("floatfontbold", function (key, value) {
				floater.container.style.fontWeight = value ? "bold": "normal";
				floater.fontbold = value;
			});
            settings.addListener("scrollfontsize", function (key, value) {
                scroller.fontSize = value;
            });
            settings.addListener("scrollspeed", function (key, value) {
                scroller.speed = value;
            });
            settings.addListener("twitter", function (key, value) {
                poster.isShare = value;
            });
            settings.addListener("font", function (key, value) {
                scroller.container.style.fontFamily = value;
                floater.container.style.fontFamily = value;
            });
			settings.addListener("scrollfontopacity", function (key, value) {
				scroller.opacity = value;
			});
            settings.addListener("scrollmaxline", function (key, value) {
                scroller.maxLine = value;
            });
            settings.addListener("wheelzapping", function (key, value) {
                zapping.enable = value;
            });
            settings.addListener("ng", function (key, value) {
                ng.enable = value;
            });
            settings.addListener("hiddentwitter", function (key, value) {
                toggleTwitterPanel(!value);
            });
            settings.addListener("reminder", function (key, value) {
                reminder.enable = value;
            });
            settings.addListener("reminderauto", function (key, value) {
                reminder.automove = value;
            });
            settings.addListener("screenfix", function (key, value) {
            	enableScreenFix = value;
            });
            settings.addListener("commentloadinterval", function (key, value) {
                loader.commentInterval = parseInt(value);
            });

            window.bind("resize", exportGMFunc(screenFix, "GM_ANLCS_screenFix"));
        }
        setTimeout(screenFix, 1000);

        log("end onOnAirPage()")
    }
    // コメントが読み込まれたときに呼び出される
    function onCommentLoaded(comment) {
        // log(comment)
        if (ng.enable && ng.match(comment.message)) {
            log("NG: " + comment.message);
            return;
        }
        try {
            floater && floater.push(comment);
        } catch (ex) {
            log(ex);
        }
        try {
            scroller && scroller.scroll(comment);
        } catch (ex) {
            log(ex);
        }
    }
    // SlotIDが変更されたときに呼び出される
    function onSlotIdChanged(data) {
        log("onSlotIdChanged(): ", data.slotId, data);

        var slotId = data.slotId;
        if (slotId) {
            loader.slotId = slotId;
            poster.slotId = slotId;

            if (!loader.enable) {
                loader.start();
            }

            schedule.getCurrentSlot(poster.channelId, slotId, function (slot) {
                log("slot info: ", slot);
                if (slot) {
                    poster.slotStartAt = slot.startAt;
                }
            });
        }

        toggleTwitterPanel(!settings.get("hiddentwitter"));
    }

    // チャンネルが変更されたときに呼び出される
    function onChannelChanged(data) {
        log("onChannelChanged(): " + data.channelId);

        loader.channelId = data.channelId;
        loader.slotId = null;

        poster.channelId = data.channelId;
        poster.slotId = null;
    }

    // 放送ページ以外を開かれたときに呼び出される
    function onOtherPage(data) {
        log("onOtherPage(): " + data.uri);
        loader.channelId = null;
        loader.slotId = null;
        if (loader.enable) {
            loader.stop();
        }
        zapping.isOnAirPage = false;
        // dispose
        poster.hide();
        scroller.hide();
        floater.hide();

        // リマインダーを初期化
        reminder.init({
            enable: settings.get("reminder"),
            automove: settings.get("reminderauto"),
        });
    }
    // ページ遷移の監視
    var lastChannelId = "";
    var lastSlotId = "";
	var lastPageUrl = "";
    setInterval(function () {
        try {
			var pageUrl = location.href;
			var pagePathname = location.pathname;
			
			if (lastPageUrl != pageUrl) {
				if (pagePathname.indexOf("/now-on-air/") >= 0) {
					var chanelId = pagePathname.replace("/now-on-air/", "");
					var data = {
						uri: pageUrl,
						channelId: chanelId
					};
					if (lastPageUrl.indexOf("/now-on-air/") >= 0) {
						onChannelChanged(data);
					} else {
						onOnAirPage(data);
					}
					
					lastChannelId = chanelId;
				} else {
					onOtherPage({
						uri: pageUrl,
					});
				}
				
				lastPageUrl = pageUrl;
				return;
			}
			// slotid
			var isPlayingData = getDataLayer(events.isPlaying);
			if (isPlayingData) {
				// slotid changed
				if (lastSlotId != isPlayingData.slotId) {
					log("slotid: " + isPlayingData.slotId);
					onSlotIdChanged(isPlayingData);
					lastSlotId = isPlayingData.slotId;
				}
			}
        } catch (ex) { log(ex) }
    }, 1234);
})();