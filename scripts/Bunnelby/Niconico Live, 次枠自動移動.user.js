// ==UserScript==
// @name        Niconico Live, 次枠自動移動
// @description ニコニコ生放送の参加コミュニティの次枠移動を可能にします。放送履歴が公開されているコミュニティのタイムシフト次枠移動も可能。
// @namespace   https://greasyfork.org/users/1242
// @include     http://live.nicovideo.jp/watch/*
// @include     http://live2.nicovideo.jp/watch/*
// @include     https://secure.nicovideo.jp/payment/registration*
// @version     1.3.2
// @grant       GM_xmlhttpRequest
// @grant       unsafeWindow
// @run-at      document-end
// ==/UserScript==
(function () {
    "use strict";

    var GMUnsafeKey = "GM_次枠自動移動",
        DEBUG = false;

    function contentEval(source) {
        if ('function' == typeof source) {
            source = '(' + source + ')();'
        }

        // script要素を生成する
        var script = document.createElement('script');
        script.setAttribute("type", "application/javascript");
        script.textContent = source;

        // ページにscript要素を挿入し、スクリプトが実行されたらすぐに要素を取り除く
        document.body.appendChild(script);
        document.body.removeChild(script);
    }

    function exportGMFunc(fn, name) {
        exportFunction(fn,
            (unsafeWindow || window)[GMUnsafeKey], {
            defineAs: name || fn.name
        });
    }

    unsafeWindow[GMUnsafeKey] = cloneInto({}, unsafeWindow || window, { cloneFunctions: true });

    // GM_xmlhttpRequestWrapper
    exportGMFunc(function (url, onload) {
        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            onload: function (x) { onload(cloneInto(x, unsafeWindow || window, { cloneFunctions: true })) },
            onerror: function (x) { onerror(x) },
            ontimeout: function (x) { ontimeout(x);}
        });
    }, "GM_xmlhttpRequest");

    // unsafeWindow eval
    contentEval(function () {
        var DEBUG = false,
            GMUnsafeKey = "GM_次枠自動移動",
            GM_xmlhttpRequest = window[GMUnsafeKey].GM_xmlhttpRequest,
            $;
        var NOTIFYBOX_URL = "http://live2.nicovideo.jp/nicolive/papi/api/relive/notifybox.content?rows=50&page=1";

        function log() {
            if (DEBUG) {
                var array = [];
                for (var i = 0; i < arguments.length; i++) {
                    array.push(arguments[i]);
                }
                return console.log.apply(console, array);
            }
        }

        // ページで処理を分岐
        var loc = document.location;
        var isLivePage = (loc.host == 'live.nicovideo.jp') && loc.pathname.indexOf('/watch/') != -1;
        var isBetaLivePage = (loc.host == 'live2.nicovideo.jp') && loc.pathname.indexOf('/watch/') != -1;
        var isNiceBoatPage = loc.search.indexOf('sec=nicolive_oidashi') != -1;

        if (isLivePage || isBetaLivePage) {
            $ = window.jQuery;
            if (!$ && window.jQueries) {
                for (var v in window.jQueries) {
                    $ = window.jQueries[v];
                }
            }
            if ($) {
                $(window).bind("load", watchPageLoaded);
            } else {
                log("$ is not found")
            }
        } else if (isNiceBoatPage) {
            // 一般会員が追い出されたら放送ページヘ戻る
            history.back();
        }

        // 放送ページが読み込まれた時に実行される
        function watchPageLoaded() {
            log("watchPageLoaded()", $);
            try {
                var liveInfo = {
                    communityId: null,
                    liveId: null,
                    startTime: null,
                },
                isEnable,
                timer;

                // -------------
                // 放送情報を取り出す
                // -------------

                // 番組IDからIDのみを取得する
                function parseLvNumber(lv) {
                    return parseInt(lv.substr(2), 10);
                }

                // コミュニティID、チャンネルIDを含むURLからIDを取得する
                // @src コミュニティID、チャンネルIDを含むURL
                function parseCommunityId(text) {
                    var m = text.match(/(ch|co)\d+/);
                    return m ? m[0] : null;
                }

                // 番組IDを含むURLからIDを取得する
                // @url 番組IDを含むURL
                function parseLiveId(url) {
                    var m = url.match(/lv\d+/);
                    return m ? m[0] : null;
                }

                // 放送開始時間を含む文字列から放送開始時間を取得する
                function parseStartTime(datetime) {
                    var m = datetime.match(/(\d{4})\/(\d{2})\/(\d{2}).*(\d{2})[\:：](\d{2})/);
                    if (m) {
                        for (var i = 1; i < m.length; i++) {
                            m[i] = parseInt(m[i], 10);
                        }
                        return new Date(new Date(m[1], m[2] - 1, m[3], m[4], m[5]).getTime());
                    } else {
                        return null;
                    }
                }

                // ---------
                // 現在の放送情報を取得する
                // ---------

                // 番組ＩＤを取得する
                function getLiveId() {
                    return parseLiveId(document.location.href);
                }

                // 番組開始時間を取得する
                function getStartTime() {
                    if (isLivePage) {
                        return parseStartTime($('#description_tab_view .information').text());
                    }
                    if (isBetaLivePage) {
                        return parseStartTime($(".program-start-time").text());
                    }
                }

                // コミュニティID、チャンネルIDを取得する
                function getCommunityId() {
                    // http://icon.nimg.jp/community/s/***/co***.jpg?***
                    // http://icon.nimg.jp/channel/s/ch***.jpg?***
                    if (isLivePage) {
                        var id = $('.commu_name').attr('href');
                        if (!id) {
                            id = $(".thumb_area img").attr("src");
                        }
                        return parseCommunityId(id);
                    }
                    if (isBetaLivePage) {
                        return parseCommunityId($(".program-community-name").attr("href"));
                    }
                }

                // observe() を実行する間隔の秒数を取得する
                // 番組経過時間によって変更する
                function getTimeout() {
                    var diff = new Date().getTime() - startTime.getTime();
                    log(diff);
                    var min = Math.round(diff / 60000);
                    if (min <= 28) {
                        return 30 * 1000;
                    } else if (min <= 32) {
                        return 6 * 1000;
                    } else if (min <= 35) {
                        return 10 * 1000;
                    } else if (min <= 597) {
                        return 30 * 1000;
                    } else if (min <= 602) {
                        return 10 * 1000;
                    } else {
                        return 30 * 1000;
                    }
                }

                // タイムシフトを捜索する
                function searchTs(url) {
                    log("searchTs()")
                    // 捜索先のURL作成
                    if (typeof url != "string") {
                        url = "http://com.nicovideo.jp/live_archives/";
                        var id = getCommunityId();
                        if (id.indexOf("co") != -1) {
                            url += id;
                        }
                        if (id.indexOf("ch") != -1) {
                            url = "http://ch.nicovideo.jp/" + id + "/live";
                            window.open(url, "archives");
                            return;
                        }
                    }
                    log("searchTs:", url);
                    // アーカイブページを取得する
                    GM_xmlhttpRequest(url, function (response) {
                        // 放送履歴を取得する
                        var items = $(".liveItem", response.responseText);
                        items = $.map(items, function (item) {
                            var $liveTitle = $(".liveTitle", item);
                            var title = $liveTitle.text();
                            var liveId = parseLiveId($liveTitle.attr("href"));
                            var caster = $(".liveBroadcaster", item).text().trim().slice(4, -2);
                            var startTime = parseStartTime($(".liveDate", item).text().replace(/[\n\r\s]/gm, ""));
                            var hasTimeshift = !!$(".timeshiftButton_pc_disabled", item);

                            return {
                                title: title,
                                liveId: liveId,
                                caster: caster,
                                startTime: startTime,
                                hasTimeshift: hasTimeshift,
                            }
                        });
                        log("archives:", items);

                        // 次のアーカイブページ
                        var $next = $(".next", response.responseText);

                        var startTime = getStartTime();
                        var liveId = getLiveId();
                        var nextIsTarget = false;

                        for (var i = items.length - 1; i >= 0; i--) {
                            if (nextIsTarget && items[i].hasTimeshift) {
                                onFoundTs(items[i]);
                                return;
                            }
                            if (items[i].liveId == liveId) {
                                nextIsTarget = true;
                                continue;
                            }
                        }

                        // ページ内の一番古い放送が七日以内かつ次ページがあれば
                        // 次ページを捜索する
                        var diff = startTime.getTime() - items[items.length - 1].startTime.getTime();
                        if (diff < 60 * 60 * 24 * 7 && $next) {
                            searchTs($next.attr("href"))
                        } else {
                            onFoundTs();
                        }
                    });
                }

                // 参加コニュニティの放送中番組一覧（Notifybox）を捜索する
                // @callback (番組の要素、番組ID、放送者ID)を引数に持つ関数
                function eachNotifybox(callback) {
                    if (!callback) {
                        return;
                    }
                    GM_xmlhttpRequest(NOTIFYBOX_URL,
                        function (response) {
                            var notify = JSON.parse(response.responseText);
                            log(notify)
                            if (notify.meta.status == 200) {
                                var favorites = notify.data.notifybox_content;
                                for (var i = 0; i < favorites.length; i++) {
                                    var f = favorites[i];
                                    callback(parseCommunityId(f.thumbnail_url), "lv" + f.id);
                                }
                            }
                        }
                    );
                }

                // -------
                // 次枠監視
                // -------

                // observe() の実行を予約する
                function setObserve(toIsEnable) {
                    if (toIsEnable) {
                        isEnable = true;
                        timer = clearTimeout(timer);
                        timer = setTimeout(observe, 0);
                    } else {
                        isEnable = false;
                        timer = clearTimeout(timer);
                    }
                    $('#auto_next').updateToggleText();
                }

                // 放送ページのコニュニティの次の放送がないか監視する
                function observe() {
                    if (!isEnable) {
                        return;
                    }
                    log('observe()');
                    try {
                        // 現在の放送の情報を取得
                        startTime = getStartTime();
                        communityId = getCommunityId();
                        liveId = getLiveId();
                        log('videoInfo', startTime, communityId, liveId);

                        if (!startTime || !communityId || !liveId) {
                            return;
                        }
                        var liveIdInt = parseInt(liveId.substr(2), 10);
                        eachNotifybox(function (co, lv) {
                            log("favorites:", co, lv);
                            if (co && lv && communityId == co && liveIdInt < parseInt(lv.substr(2), 10)) {
                                window.location.href = 'http://live.nicovideo.jp/watch/' + lv + '?auto';
                                return false;
                            }
                        });
                    } catch (ex) {
                        log('observe error!');
                        log(ex);
                    }

                    // 次の実行まで待機する
                    timer = setTimeout(observe, getTimeout());
                }

                // ---------
                // UI
                // ---------

                // 画面下メニュー（UtilityMenu）に追加する
                $.fn.appendToUtilityMenu = function () {
                    log("appendToUtilityMenu()")
                    return this.each(function () {
                        if (isLivePage) {
                            $('<li />').append($(this)).appendTo('#watch_player_bottom_box .utilty_menu');
                        } else if (isBetaLivePage) {
                            $("<span />").append($(this)).appendTo("#player")
                        }
                    });
                };

                // トグル切り替え
                $.fn.updateToggleText = function () {
                    log("updateToggleText()");
                    if (isEnable) {
                        $(this).css({
                            backgroundColor: 'rgba(255,255,0,0.3)',
                            fontWeight: 'bold',
                            textShadow: '0 0 0'
                        }).text('次枠移動');
                    } else {
                        $(this).css({
                            backgroundColor: '',
                            fontWeight: '',
                            textShadow: ''
                        }).text('次枠移動');
                    }
                    return this;
                };

                // TSが見つかったら呼び出す
                // @ts: TSオブジェクト
                function onFoundTs(ts) {
                    log("found ts:", ts);
                    if (ts) {
                        $('#next_ts')
                            .attr("href", '/watch/' + ts.liveId + '?next_ts')
                            .text(ts.title + '（放送者: ' + ts.caster.trim() + "）");
                    } else {
                        log("ts not found !!");
                    }
                }

                log("before $autoNext");
                // 次枠自動移動のメニューを追加
                var $autoNext = $('<a />')
                    .attr({
                        id: 'auto_next',
                        href: 'javascript:void(0)'
                    })
                    .updateToggleText()
                    .click(function () {
                        setObserve(!isEnable);
                    })
                    .appendToUtilityMenu();

                log("before $nextTs");
                // 次タイムシフト取得のメニューを追加
                var $nextTs = $('<a />')
                    .attr({
                        id: 'next_ts',
                        href: 'javascript:void(0)',
                    })
                    .text('次のタイムシフトを探す')
                    .on("click", searchTs)
                    .appendToUtilityMenu();

                // --------
                // ページ移動時に自動実行
                // --------

                // コニュニティ放送で監視を開始する
                setObserve(window.location.search == '?auto');

                // 自動で次のタイムシフトを捜索する
                if (location.search == '?next_ts') {
                    $('#next_ts').click();
                }

                log('loaded watch page');
            } catch (ex) {
                log(ex);
            }
        }
    });
})();