// ==UserScript==
// @name         BilibiliTimer - B站H5播放器全屏下实时显示当前系统时间和播放进度
// @version      3.0.4
// @description  B站H5播放器全屏模式下实时显示当前系统时间和播放进度
// @author       AnnAngela
// @namespace    https://greasyfork.org/users/129402
// @mainpage     https://greasyfork.org/zh-CN/scripts/30367-bilibilitimer
// @supportURL   https://greasyfork.org/zh-CN/scripts/30367-bilibilitimer/feedback
// @license      GNU General Public License v3.0 or later
// @compatible   chrome
// @match        *://www.bilibili.com/video/av*
// @match        *://www.bilibili.com/watchlater*
// @match        *://www.bilibili.com/html/*layer.htm*
// @match        *://www.bilibili.com/blackboard/*layer.htm*
// @match        *://www.bilibili.com/bangumi/play/*
// @match        *://live.bilibili.com/*
// @run-at       document-start
// @grant        unsafeWindow
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @icon         data:image/png;base64,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
// @icon64       data:image/png;base64,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
// ==/UserScript==

(function() {
    'use strict';
    /* 防止重复加载 */
    if (unsafeWindow.BilibiliTimer) return;

    var multiValueKeys = ['exclude', 'grant', 'include', 'match', 'require', 'resource'];
    var booleanValueKeys = ['noframes'];
    var script = { scriptMetaStr: GM_info.scriptMetaStr };
    GM_info.scriptMetaStr.split(/\n+/).forEach(function(str) {
        var string = str.replace(/^\s*\/\/\s*/, '');
        var _temp = string.match(/^@([a-z\d:-]+) +(.+)$/i);
        if (!_temp) return;
        var key = _temp[1],
            value = _temp[2].trim();
        if (multiValueKeys.includes(key)) {
            if (script[key]) {
                script[key].push(value);
            } else {
                script[key] = [value];
            }
        } else if (booleanValueKeys.includes(key)) {
            script[key] = true;
        } else {
            script[key] = value;
        }
    });

    var bilibiliTimerHelper = {
        window: undefined,
        openWin: function(win) {
            var self = this;
            if (self.window) return self.window.focus();
            var doc = win.document;
            var w = win.innerWidth || doc.docElement.clientWidth || doc.body.clientWidth,
                h = win.innerHeight || doc.docElement.clientHeight || doc.body.clientHeight;
            self.window = win.open("about:blank", "bilibiliTimerSetting", "location=1,scrollbars=1,channelmode=1,width=800,height=400,left=" + (w * 0.5 - 500) + ",top=" + (h * 0.5 - 200));
            setTimeout(function() {
                self.window.document.title = script.name + " 设置页面";
                self.window.document.body.innerHTML = '<h1>' + script.name + ' 设置页面</h1><ul><li><input id="SystemTime" type="checkbox"><label for="SystemTime">显示系统时间</label></li><li><input id="Track" type="checkbox"><label for="Track">显示当前进度</label></li><li><input id="BufferTime" type="checkbox"><label for="BufferTime">显示加载进度/缓冲质量</label></li><li><input id="CurrentPageAndWatchlater" type="checkbox"><label for="CurrentPageAndWatchlater">显示当前分页或稍后再看信息</label></li><li><input id="AutoHide" type="checkbox"><label for="AutoHide">无操作时自动隐藏</label></li></ul><div style="margin-top:1em;"><button id="save">保存</button></div>';
                self.window.document.body.style.padding = "2em";
                win.BilibiliTimer.setting.on.forEach(function(set) {
                    (self.window.document.querySelector('#' + set) || {}).checked = true;
                });
                if (GM_getValue('autoHidden')) self.window.document.querySelector("#AutoHide").checked = true;
                self.window.document.querySelector('#save').addEventListener('click', function() {
                    var setting = {
                        on: [],
                        off: [],
                    }
                    Array.from(self.window.document.querySelectorAll("input")).forEach(function(ele) {
                        if (ele.id !== "AutoHide") setting[ele.checked ? "on" : "off"].push(ele.id);
                        else {
                            GM_setValue('autoHidden', ele.checked);
                        }
                    });
                    GM_setValue("setting", setting);
                    if (!self.window.document.querySelector("#saveSuccessfull")) {
                        var saveSuccessfull = self.window.document.createElement("span");
                        saveSuccessfull.id = "saveSuccessfull";
                        saveSuccessfull.style.marginLeft = "2em";
                        saveSuccessfull.style.transition = "opacity 1s ease-in-out";
                        saveSuccessfull.innerText = "保存成功！";
                        saveSuccessfull.dataset.removeTime = new Date().getTime() + 3000;
                        self.window.document.querySelector("#save").after(saveSuccessfull);
                        win.BilibiliTimer && win.BilibiliTimer.restart && win.BilibiliTimer.restart("Setting Update", null);
                    } else {
                        self.window.document.querySelector("#saveSuccessfull").removeTime = new Date().getTime() + 3000;
                        if (+self.window.document.querySelector("#saveSuccessfull").dataset.removeTime < new Date().getTime()) {
                            self.window.document.querySelector("#saveSuccessfull").style.opacity = "1";
                        }
                    }
                });
                self.window.setInterval(function() {
                    if (self.window.document.querySelector("#saveSuccessfull")) {
                        if (+self.window.document.querySelector("#saveSuccessfull").dataset.removeTime < new Date().getTime()) {
                            if (+self.window.document.querySelector("#saveSuccessfull").dataset.removeTime > new Date().getTime() - 4000) {
                                self.window.document.querySelector("#saveSuccessfull").style.opacity = "0";
                            } else {
                                self.window.document.querySelector("#saveSuccessfull").remove();
                            }
                        }
                    }
                }, 100);
                self.window.focus();
                self.window.addEventListener("beforeunload", function() {
                    self.window = undefined;
                });
            }, 0);

        },
        closeWin: function() {
            if (this.window) this.window.close();
        }
    };
    unsafeWindow.addEventListener("beforeunload", function() {
        bilibiliTimerHelper.closeWin();
    });

    unsafeWindow.BilibiliTimerUninit = false;
    unsafeWindow.BilibiliTimer = {};
    var code = function code() {
        if (unsafeWindow.BilibiliTimerUninit || !unsafeWindow.jQuery) return false;
        if (!String.prototype.includes) String.prototype.includes = function includes(s) {
            return this.indexOf(s) !== -1;
        };
        unsafeWindow.BilibiliTimer = {};
        unsafeWindow.BilibiliTimer._loop_count = 0;
        unsafeWindow.BilibiliTimer.date = function bilibiliPlayerDate() {
            var _date = new Date();
            ['getDate', 'getFullYear', 'getHours', 'getMilliseconds', 'getMinutes', 'getMonth', 'getSeconds', 'getTime', 'getUTCDate', 'getUTCFullYear', 'getUTCHours', 'getUTCMilliseconds', 'getUTCMinutes', 'getUTCMonth', 'getUTCSeconds', 'getYear'].forEach(function(key) {
                _date[key] = function() {
                    var result = Date.prototype[key].apply(_date, arguments);
                    if (key.includes('Month')) result++;
                    if (typeof result === 'number' && (result + '').length === 1) return '0' + result;
                    else return result + '';
                };
            });
            return _date;
        };
        try {
            unsafeWindow.BilibiliTimer.isEmbedded = location.host === 'www.bilibili.com' && ['/blackboard/html5player.html', '/blackboard/player.html'].includes(location.pathname) && top !== window && top.location.host.includes('bilibili.com');
        } catch (_) {
            unsafeWindow.BilibiliTimer.isEmbedded = false;
        }
        unsafeWindow.BilibiliTimer.realWindow = unsafeWindow.BilibiliTimer.isEmbedded ? top : window;
        unsafeWindow.BilibiliTimer.isNewPlayPage = (location.pathname.match(/\/video\/av(\d+)/) || [0, -1])[1] !== -1 && parseInt((document.cookie.match(/stardustvideo=(-?[0-9]+)/i) || [0, '-1'])[1]) > 0 || ((location.pathname.match(/\/bangumi\/play\/ep(\d+)/) || [0, -1])[1] !== -1 && document.cookie.includes('stardustpgcv') && document.cookie.match(/stardustpgcv=(\-?\d+)/)[1] === "0606");
        unsafeWindow.BilibiliTimer.isNewBangumiPlayPage = (location.pathname.match(/\/bangumi\/play\/ep(\d+)/) || [0, -1])[1] !== -1 && document.cookie.includes('stardustpgcv') && document.cookie.match(/stardustpgcv=(\-?\d+)/)[1] === "0606";
        unsafeWindow.BilibiliTimer.isLive = function bilibiliIsLive(a, b) {
            return location.host === 'live.bilibili.com' ? a !== undefined ? a : true : b !== undefined ? b : false;
        };
        unsafeWindow.BilibiliTimer.selector = unsafeWindow.BilibiliTimer.isLive({
            container: '.bilibili-live-player-video-area',
            controller: '.bilibili-live-player-video-controller',
            fullscreenSendbar: null,
            settingButton: '.attention-btn-ctnr > .left-part.dp-i-block.pointer.p-relative[role="button"]',
            autoHideCheck: null,
            pageTitle: null,
            watchlaterPageTitle: null,
            watchlaterVideoTitle: null,
            bangumiTitle: null,
            bangumiPartTitle: null,
        }, {
            container: '.bilibili-player-video-wrap',
            controller: '.bilibili-player-video-control',
            fullscreenSendbar: '.bilibili-player-video-sendbar.active',
            settingButton: unsafeWindow.BilibiliTimer.isNewPlayPage ? '#arc_toolbar_report > .ops, #toolbar_module' : '.bgray-btn-wrap .bgray-btn.show',
            autoHideCheck: '.bilibili-player-no-cursor',
            pageTitle: unsafeWindow.BilibiliTimer.isNewPlayPage ? '.cur-list .on' : '#v_multipage .item.on',
            watchlaterPageTitle: '.bilibili-player-auxiliary-area .bilibili-player-watchlater-part-item[data-state-play=true] .bilibili-player-watchlater-plist-chapter',
            watchlaterVideoTitle: '.bilibili-player-auxiliary-area .bilibili-player-watchlater-item[data-state-play=true] .bilibili-player-watchlater-info-title',
            bangumiTitle: unsafeWindow.BilibiliTimer.isNewPlayPage ? '#h1_module' : '#app .bangumi-info .info-title > a > h2',
            bangumiPartTitle: unsafeWindow.BilibiliTimer.isNewPlayPage ? '#eplist_module .ep-item.cursor' : '#app .bangumi-info .bangumi-list-wrapper .episode-list .episode-item.on',
        });
        unsafeWindow.BilibiliTimer.selector.fullscreen = (function() {
            try {
                unsafeWindow.document.querySelector(":fullscreen"); // Let's try the standard selector
                return ":fullscreen";
            } catch (e) {
                // Just keep going
            }
            try {
                unsafeWindow.document.querySelector(":-webkit-full-screen"); // Maybe we should try webkit prefix
                return ":-webkit-full-screen";
            } catch (e) {
                // Just keep going
            }
            try {
                unsafeWindow.document.querySelector(":-moz-full-screen"); // Or firefox prefix
                return ":-moz-full-screen";
            } catch (e) {
                // Just keep going
            }
            try {
                unsafeWindow.document.querySelector(":-ms-fullscreen"); // Why you still using IE¿
                return ":-ms-fullscreen";
            } catch (e) {
                // Well, I think we should give up
                console.error("BilibiliTimer: Believe it or not, there's no selector which can bring us the fullscreen node.");
                if (unsafeWindow.BilibiliTimer && unsafeWindow.BilibiliTimer.uninit) unsafeWindow.BilibiliTimer.uninit();
                unsafeWindow.BilibiliTimerUninit = true;
            }
        })();
        unsafeWindow.BilibiliTimer.classList = unsafeWindow.BilibiliTimer.isLive({
            timer: 'bilibili-live-player-video-info-container',
            closeButton: 'bilibili-live-player-video-info-close',
            panel: 'bilibili-live-player-video-info-panel',
            restartButton: 'live-icon-reload',
            settingButton: 'left-part dp-i-block pointer p-relative live-skin-highlight-bg BilibiliTimerSettingButton BilibiliTimerSettingButton-live',
        }, {
            timer: 'bilibili-player-video-info-container',
            closeButton: 'bilibili-player-video-info-close',
            panel: 'bilibili-player-video-info-panel',
            restartButton: 'bilibili-player-iconfont icon-24repeaton',
            settingButton: unsafeWindow.BilibiliTimer.isNewPlayPage ? 'BilibiliTimerSettingButton' : 'bgray-btn show BilibiliTimerSettingButton',
        });
        unsafeWindow.BilibiliTimer.setting = GM_getValue("setting", {
            on: ["SystemTime", "Track", "BufferTime", "CurrentPageAndWatchlater", "Watchlater"],
            off: [],
        });
        $("body").attr("data-bilibiliTimerSettingOn", unsafeWindow.BilibiliTimer.setting.on.join(","));
        unsafeWindow.BilibiliTimer.closeButtonText = unsafeWindow.BilibiliTimer.isLive('x', '[x]');
        unsafeWindow.BilibiliTimer.globallock = false;
        unsafeWindow.BilibiliTimer.widthSet = false;
        unsafeWindow.BilibiliTimer.onResizing = 0;
        if (unsafeWindow.BilibiliTimer.selector.autoHideCheck) unsafeWindow.BilibiliTimer.mousemoveCount = 0;
        unsafeWindow.BilibiliTimer.getControllerTop = function BilibiliTimerGetControllerTop() {
            var controller = $(unsafeWindow.BilibiliTimer.selector.controller);
            if (controller.closest('.mode-miniscreen')[0]) return $(window).height();
            var _top = $(window).height() - controller.height();
            var fullscreenSendbar = $(unsafeWindow.BilibiliTimer.selector.fullscreenSendbar);
            if (fullscreenSendbar[0]) _top -= fullscreenSendbar.outerHeight(true);
            return _top;
        };
        $(window).on('resize.BilibiliTimer', function() {
            try {
                unsafeWindow.BilibiliTimer.onResizing = 1;
            } catch (e) { /* */ }
        });
        $(document).on({
            'mousemove.BilibiliTimer': function(e) {
                if (unsafeWindow.BilibiliTimer && unsafeWindow.BilibiliTimer.timer) {
                    if (unsafeWindow.BilibiliTimer.onMousedown) {
                        var maxTop = unsafeWindow.BilibiliTimer.getControllerTop() - unsafeWindow.BilibiliTimer.timer.outerHeight() - 10;
                        var maxLeft = $(window).width() - unsafeWindow.BilibiliTimer.timer.outerWidth() - 10;
                        unsafeWindow.BilibiliTimer.timer.css({
                            left: Math.max(Math.min(unsafeWindow.BilibiliTimer.timer.data('baseOffset').left + e.clientX, maxLeft), 10),
                            top: Math.max(Math.min(unsafeWindow.BilibiliTimer.timer.data('baseOffset').top + e.clientY, maxTop), 10),
                        });
                        unsafeWindow.getSelection().removeAllRanges();
                    }
                    if (unsafeWindow.BilibiliTimer.selector.autoHideCheck) unsafeWindow.BilibiliTimer.mousemoveCount = 0;
                }
            },
            'mouseup.BilibiliTimer': function(e) {
                if (unsafeWindow.BilibiliTimer && unsafeWindow.BilibiliTimer.timer && unsafeWindow.BilibiliTimer.onMousedown) {
                    unsafeWindow.BilibiliTimer.onMousedown = false;
                    GM_setValue('offset', {
                        top: unsafeWindow.BilibiliTimer.timer.css('top'),
                        left: unsafeWindow.BilibiliTimer.timer.css('left'),
                    });
                }
            },
        });
        unsafeWindow.BilibiliTimer.template = {};
        var timer = unsafeWindow.BilibiliTimer.template.timer = $('<div/>');
        timer.attr('id', 'BilibiliTimer').addClass(unsafeWindow.BilibiliTimer.classList.timer);
        var closeButton = unsafeWindow.BilibiliTimer.template.closeButton = $('<a/>');
        closeButton.text(unsafeWindow.BilibiliTimer.closeButtonText).attr({
            href: 'javascript:void(0);',
            id: 'BilibiliTimerCloseButton',
        });
        closeButton.addClass(unsafeWindow.BilibiliTimer.classList.closeButton);
        var restartButton = unsafeWindow.BilibiliTimer.template.restartButton = $('<a/>');
        restartButton.attr({
            href: 'javascript:void(0);',
            id: 'BilibiliTimerRestartButton',
            title: '如果发现浮窗出现问题，\n例如无法正常拖动，无法正常显示时间等，\n请点击该按钮重建浮窗尝试修复！',
        });
        restartButton.addClass(unsafeWindow.BilibiliTimer.classList.closeButton).addClass(unsafeWindow.BilibiliTimer.classList.restartButton);
        var panel = unsafeWindow.BilibiliTimer.template.panel = $('<div/>');
        panel.addClass(unsafeWindow.BilibiliTimer.classList.panel);
        panel.append('<div class="info-line" id="BilibiliTimerSystemTime"><span class="info-title">系统时间：</span><span class="info-data" id="BilibiliTimerNowTime"> - </span></div>');
        panel.append(unsafeWindow.BilibiliTimer.isLive('<div class="info-line" id="BilibiliTimerTrack"><span class="info-title">缓冲质量：</span><span class="info-data">当前缓冲时长 <span id="BilibiliTimerVideoBufferedTimeRange"> - </span>s</span></div>', '<div class="info-line" id="BilibiliTimerTrack"><span class="info-title">播放进度：</span><span class="info-data"><span id="BilibiliTimerVideoTime"> - </span>（已播放<span id="BilibiliTimerVideoTimePercents"> - </span>%）</span></div><div class="info-line" id="BilibiliTimerBufferTime"><span class="info-title">加载进度：</span><span class="info-data"><span id="BilibiliTimerVideoBufferedTime"> - </span>（剩余缓冲时长<span id="BilibiliTimerVideoBufferedTimeRange"> - </span>s，已缓冲<span id="BilibiliTimerVideoBufferedTimePercents"> - </span>%）</span></div><div class="info-line" id="BilibiliTimerCurrentPageAndWatchlater" style="display: none;"><span class="info-title" id="BilibiliTimerTitleDescription">当前分页：</span><span class="info-data" id="BilibiliTimerTitle"> - </span></div>'));
        var settingButton = unsafeWindow.BilibiliTimer.template.settingButton = $(unsafeWindow.BilibiliTimer.isNewPlayPage && !unsafeWindow.BilibiliTimer.isNewBangumiPlayPage ? '<span/>' : '<div/>');
        settingButton.addClass(unsafeWindow.BilibiliTimer.classList.settingButton);
        settingButton.css(unsafeWindow.BilibiliTimer.isLive('width', unsafeWindow.BilibiliTimer.isNewPlayPage ? 'width' : 'height'), 'auto');
        settingButton.html("BilibiliTimer 设置");
        unsafeWindow.BilibiliTimer.init = function BilibiliTimerInit() {
            if (unsafeWindow.BilibiliTimerUninit) return false;
            if (!$(unsafeWindow.BilibiliTimer.selector.container)[0] && ++unsafeWindow.BilibiliTimer._loop_count > 150) return unsafeWindow.BilibiliTimer.uninit();
            unsafeWindow.BilibiliTimer.onResizing = 0;
            unsafeWindow.BilibiliTimer.widthSet = false;
            unsafeWindow.BilibiliTimer.timer = unsafeWindow.BilibiliTimer.template.timer.clone();
            unsafeWindow.BilibiliTimer.closeButton = unsafeWindow.BilibiliTimer.template.closeButton.clone();
            unsafeWindow.BilibiliTimer.restartButton = unsafeWindow.BilibiliTimer.template.restartButton.clone();
            unsafeWindow.BilibiliTimer.panel = unsafeWindow.BilibiliTimer.template.panel.clone();
            unsafeWindow.BilibiliTimer.settingButton = unsafeWindow.BilibiliTimer.template.settingButton.clone();
            unsafeWindow.BilibiliTimer.timer.append(unsafeWindow.BilibiliTimer.closeButton).append(unsafeWindow.BilibiliTimer.restartButton).append(unsafeWindow.BilibiliTimer.panel);
            var title = null,
                description = null;
            if ($(unsafeWindow.BilibiliTimer.selector.pageTitle)[0]) {
                var link = $(unsafeWindow.BilibiliTimer.selector.pageTitle).children('a:visible').clone();
                if (unsafeWindow.BilibiliTimer.isNewPlayPage) link.find('.s1').text(link.find('.s1').text().replace('P', '') + '、');
                title = link.text().trim().replace(/^(\d+)、/, '$1/' + $(unsafeWindow.BilibiliTimer.selector.pageTitle).parent().children().length + '：');
            } else if ($(unsafeWindow.BilibiliTimer.selector.watchlaterPageTitle)[0]) {
                description = '当前分页：<div id="BilibiliTimerTitleDescriptionLabel">（稍后再看）</div>';
                title = ($(unsafeWindow.BilibiliTimer.selector.watchlaterVideoTitle).closest('li').index() + 1) + '/' + $(unsafeWindow.BilibiliTimer.selector.watchlaterVideoTitle).closest('li').parent().children().length + '：' + $(unsafeWindow.BilibiliTimer.selector.watchlaterVideoTitle).text() + '<br>' + ($(unsafeWindow.BilibiliTimer.selector.watchlaterPageTitle).closest('li').index() + 1) + '/' + $(unsafeWindow.BilibiliTimer.selector.watchlaterPageTitle).closest('li').parent().children().length + '：' + $(unsafeWindow.BilibiliTimer.selector.watchlaterPageTitle).text();
            } else if ($(unsafeWindow.BilibiliTimer.selector.watchlaterVideoTitle)[0]) {
                description = '当前视频：<div id="BilibiliTimerTitleDescriptionLabel">（稍后再看）</div>';
                title = ($(unsafeWindow.BilibiliTimer.selector.watchlaterVideoTitle).closest('li').index() + 1) + '/' + $(unsafeWindow.BilibiliTimer.selector.watchlaterVideoTitle).closest('li').parent().children().length + '：' + $(unsafeWindow.BilibiliTimer.selector.watchlaterVideoTitle).text();
            } else if ($(unsafeWindow.BilibiliTimer.selector.bangumiTitle)[0]) {
                description = '当前番剧：';
                title = $(unsafeWindow.BilibiliTimer.selector.bangumiTitle).text();
                if ($(unsafeWindow.BilibiliTimer.selector.bangumiPartTitle)[0]) {
                    var cloneNode = $(unsafeWindow.BilibiliTimer.selector.bangumiPartTitle).clone();
                    if (!unsafeWindow.BilibiliTimer.isNewPlayPage) cloneNode.find('.ep-index').text(cloneNode.find('.ep-index').text() + '：');
                    else {
                        title = title.replace('：' + cloneNode.text().trim(), '');
                        cloneNode.text(cloneNode.text().trim().replace(/^(第\d+话) /, '$1：'));
                    }
                    title += '<br>' + '（' + cloneNode.text() + '）';
                }
            }
            if (title) unsafeWindow.BilibiliTimer.timer.find('#BilibiliTimerTitle').html(title).parent().removeAttr('style');
            if (description) unsafeWindow.BilibiliTimer.timer.find('#BilibiliTimerTitleDescription').html(description);
            (function loop(BilibiliTimer, $) {
                if (BilibiliTimer.isNewPlayPage && [
                        $('#arc_toolbar_report > .ops > .like').text(),
                        $('#arc_toolbar_report > .ops > .coin, #toolbar_module .coin-info span').text(),
                        $('#arc_toolbar_report > .ops > .collect').text(),
                    ].includes('--')) {
                    return setTimeout(loop, 200, BilibiliTimer, $);
                }
                $('.BilibiliTimerSettingButton').remove();
                $(BilibiliTimer.realWindow.document.querySelector(BilibiliTimer.selector.settingButton))[BilibiliTimer.isNewPlayPage ? 'append' : 'before'](BilibiliTimer.settingButton);
                if (unsafeWindow.BilibiliTimer.isLive()) {
                    $(BilibiliTimer.realWindow.document.querySelector(BilibiliTimer.selector.settingButton)).css("border-radius", "unset");
                    BilibiliTimer.settingButton.css("border-radius", "4px 0 0 4px");
                }
            })(unsafeWindow.BilibiliTimer, $);
            unsafeWindow.BilibiliTimer.timer.on('mousedown', function(e) {
                var baseX = Math.max(e.clientX, 0);
                var baseY = Math.max(e.clientY, 0);
                var baseOffsetX = Math.max(parseInt(unsafeWindow.BilibiliTimer.timer.css('left')), 0);
                var baseOffsetY = Math.max(parseInt(unsafeWindow.BilibiliTimer.timer.css('top')), 0);
                unsafeWindow.BilibiliTimer.timer.data("baseOffset", {
                    left: baseOffsetX - baseX,
                    top: baseOffsetY - baseY,
                });
                unsafeWindow.BilibiliTimer.onMousedown = true;
            });
            unsafeWindow.BilibiliTimer.closeButton.on('click', function() {
                unsafeWindow.BilibiliTimer.globallock = true;
                unsafeWindow.BilibiliTimer.timer.dequeue().clearQueue().css('opacity', '0').delay(370).queue(function() {
                    timer.hide().dequeue();
                });
            });
            unsafeWindow.BilibiliTimer.restartButton.on('click', function() {
                unsafeWindow.BilibiliTimer.restart('User order', "");
            });
            unsafeWindow.BilibiliTimer.settingButton.on('click', function() {
                bilibiliTimerHelper.openWin(unsafeWindow);
            });
            if (!GM_getValue('offset')) {
                unsafeWindow.BilibiliTimer.timer.css({
                    left: 'auto',
                    right: '10px',
                    top: '10px',
                });
            } else unsafeWindow.BilibiliTimer.timer.css(GM_getValue('offset'));
            $(unsafeWindow.BilibiliTimer.selector.container).append(unsafeWindow.BilibiliTimer.timer);
            $(window).resize();
        };
        unsafeWindow.BilibiliTimer.globalWatcher = function BilibiliTimerGlobalWatcher() {
            if (unsafeWindow.BilibiliTimerUninit) return false;
            var timer = unsafeWindow.BilibiliTimer.timer;
            if (!timer || !timer[0]) {
                unsafeWindow.BilibiliTimer.init();
                return;
            }
            if ($('object#player_placeholder, object#player_object')[0]) {
                unsafeWindow.BilibiliTimer.uninit();
                return;
            }
            if (!timer.closest('body')[0]) {
                unsafeWindow.BilibiliTimer.restart('Timer did not exist in document.body', timer.closest('body')[0]);
                return;
            }
            if (unsafeWindow.BilibiliTimer.realWindow.document.querySelector(unsafeWindow.BilibiliTimer.selector.fullscreen)) {
                if (GM_getValue('autoHidden') && (unsafeWindow.BilibiliTimer.selector.autoHideCheck ? $(unsafeWindow.BilibiliTimer.selector.autoHideCheck)[0] : unsafeWindow.BilibiliTimer.mousemoveCount >= 3)) unsafeWindow.BilibiliTimer.autoHidden = true;
                else unsafeWindow.BilibiliTimer.autoHidden = false;
                if (!unsafeWindow.BilibiliTimer.globallock && !unsafeWindow.BilibiliTimer.autoHidden) {
                    if (!timer.is(':visible') || timer.css("opacity") !== "1") {
                        timer.dequeue().clearQueue().show().css('opacity', '1');
                    }
                    if (unsafeWindow.BilibiliTimer.onResizing === 2) {
                        unsafeWindow.BilibiliTimer.onResizing = 0;
                        var maxTop = unsafeWindow.BilibiliTimer.getControllerTop() - timer.outerHeight() - 10;
                        var maxLeft = $(window).width() - timer.outerWidth() - 10;
                        timer.animate({
                            left: Math.max(Math.min(parseInt(timer.css('left')), maxLeft), 10),
                            top: Math.max(Math.min(parseInt(timer.css('top')), maxTop), 10),
                        }, 370);
                        GM_setValue('offset', {
                            top: timer.css('top'),
                            left: timer.css('left'),
                        });
                    } else if (unsafeWindow.BilibiliTimer.onResizing === 1) {
                        unsafeWindow.BilibiliTimer.onResizing = 2;
                    }
                    var date = unsafeWindow.BilibiliTimer.date();
                    timer.find('#BilibiliTimerNowTime').text(date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
                    if (!unsafeWindow.BilibiliTimer.widthSet) unsafeWindow.BilibiliTimer.widthCalc();
                }
            } else {
                unsafeWindow.BilibiliTimer.onResizing = 0;
                unsafeWindow.BilibiliTimer.globallock = false;
                timer.dequeue().clearQueue().css('opacity', '0').delay(370).queue(function() {
                    timer.hide().dequeue();
                });
            }
            var video = $('video')[0];
            if (!video) {
                unsafeWindow.BilibiliTimer.restart('No Video', null);
                return;
            }
            if (!video.dataset.isTrusted) {
                video.dataset.isTrusted = "true";
                video.addEventListener('timeupdate', unsafeWindow.BilibiliTimer.videoPlayListener);
                video.addEventListener('progress', unsafeWindow.BilibiliTimer.videoProgressListener);
            }
            if ((timer.find('#BilibiliTimerVideoTimePercents').text() + timer.find('#BilibiliTimerVideoBufferedTimeRange').text() + timer.find('#BilibiliTimerVideoTime').text()).includes('-')) {
                unsafeWindow.BilibiliTimer.videoPlayListener({
                    target: video[0],
                });
                unsafeWindow.BilibiliTimer.videoProgressListener({
                    target: video[0],
                });
            }
        };
        unsafeWindow.BilibiliTimer.autoHideWatcher = function BilibiliTimerAutoHideWatcher() {
            if (!GM_getValue('autoHidden')) return;
            if (unsafeWindow.BilibiliTimer.selector.autoHideCheck ? $(unsafeWindow.BilibiliTimer.selector.autoHideCheck)[0] : unsafeWindow.BilibiliTimer.mousemoveCount >= 3) {
                unsafeWindow.BilibiliTimer.autoHidden = true;
                unsafeWindow.BilibiliTimer.timer.dequeue().clearQueue().css('opacity', '0').delay(370).queue(function() {
                    timer.hide().dequeue();
                });
            }
            if (unsafeWindow.BilibiliTimer.selector.autoHideCheck) unsafeWindow.BilibiliTimer.mousemoveCount++;
        };
        unsafeWindow.BilibiliTimer.lazyWatcher = function BilibiliTimerLazyWatcher() {
            if (!unsafeWindow.BilibiliTimer || !unsafeWindow.BilibiliTimer.timer) return;
            var timer = unsafeWindow.BilibiliTimer.timer;
            if (unsafeWindow.BilibiliTimer.timer.find('.info-line').width() > unsafeWindow.BilibiliTimer.timer.width()) unsafeWindow.BilibiliTimer.widthCalc();
            var flag, node;
            if ($(unsafeWindow.BilibiliTimer.selector.pageTitle)[0]) {
                if (!timer.find('#BilibiliTimerTitleDescription')[0]) {
                    flag = 'TitleDescription unset';
                    node = timer.find('#BilibiliTimerTitleDescription')[0];
                } else if (timer.is(':visible') && timer.find('#BilibiliTimerTitleDescription').is(':hidden')) {
                    flag = 'TitleDescription invisible';
                    node = timer.find('#BilibiliTimerTitleDescription')[0];
                }
            } else if ($(unsafeWindow.BilibiliTimer.selector.watchlaterPageTitle)[0] || $(unsafeWindow.BilibiliTimer.selector.watchlaterVideoTitle)[0]) {
                if (!timer.find('#BilibiliTimerTitleDescriptionLabel')[0]) {
                    flag = 'TitleDescriptionLabel unset';
                    node = timer.find('#BilibiliTimerTitleDescriptionLabel')[0];
                } else if (timer.is(':visible') && timer.find('#BilibiliTimerTitleDescriptionLabel').is(':hidden')) {
                    flag = 'TitleDescriptionLabel invisible';
                    node = timer.find('#BilibiliTimerTitleDescriptionLabel')[0];
                }
            } else if ($(unsafeWindow.BilibiliTimer.selector.bangumiTitle)[0]) {
                if (!timer.text().includes('当前番剧：')) {
                    flag = 'TitleDescriptionLabel did not include bangumi';
                    node = timer.find('#BilibiliTimerTitleDescription')[0];
                } else if (!timer.text().includes('话：')) {
                    flag = 'bangumiPartTitle is not correct';
                    node = timer.find('#BilibiliTimerTitle')[0];
                }
            } else if (!$('.' + unsafeWindow.BilibiliTimer.classList.settingButton.split(' ').join('.'))[0]) {
                flag = 'SettingButton no found';
                node = undefined;
            }
            if (flag) {
                unsafeWindow.BilibiliTimer.restart(flag, node);
                return;
            }
        };
        unsafeWindow.BilibiliTimer.widthCalc = function BilibiliTimerWidthCalc() {
            if (!unsafeWindow.BilibiliTimer || !unsafeWindow.BilibiliTimer.timer) return;
            var timer = unsafeWindow.BilibiliTimer.timer;
            var maxWidth = 0;
            timer.find('.info-line').each(function() {
                if ($(this).css('height', 'unset').height() === 0) return;
                var width = 0,
                    maxHeight = 0;
                $(this).css('height', 'unset').children().each(function() {
                    width += $(this).outerWidth(true);
                    var _height = $(this).height();
                    if ($(this).find('#BilibiliTimerTitleDescriptionLabel')[0]) _height += $(this).find('#BilibiliTimerTitleDescriptionLabel').height();
                    if (maxHeight < _height) maxHeight = _height;
                });
                if (maxWidth < width) maxWidth = width;
                $(this).height(maxHeight);
            });
            timer.width(maxWidth);
            unsafeWindow.BilibiliTimer.widthSet = true;
            $(window).resize();
        };
        unsafeWindow.BilibiliTimer.timeParse = function BilibiliTimerTimeParse(time) {
            time = parseInt(time);
            var sec = time % 60,
                min = (time - sec) / 60;
            if (sec < 10) sec = '0' + sec;
            return min + ':' + sec;
        };
        unsafeWindow.BilibiliTimer.videoPlayListener = function BilibiliTimerVideoPlayListener(e) {
            if (!e.target) return;
            var video = e.target;
            var curTime = video.currentTime || 0;
            var durTime = video.duration || 0;
            if (!curTime && !durTime) return;
            if (!unsafeWindow.BilibiliTimer || !unsafeWindow.BilibiliTimer.timer) return;
            var timer = unsafeWindow.BilibiliTimer.timer;
            timer.find('#BilibiliTimerVideoTime').text(unsafeWindow.BilibiliTimer.timeParse(curTime) + '/' + unsafeWindow.BilibiliTimer.timeParse(durTime));
            if (timer.find('#BilibiliTimerVideoBufferedTime')[0]) {
                var end;
                try {
                    end = video.buffered.end(video.buffered.length - 1);
                } catch (_) {
                    try {
                        end = video.buffered.end(0);
                    } catch (_) {
                        return;
                    }
                }
                if (timer.find('#BilibiliTimerVideoBufferedTime').text() === ' - ') $(video).trigger('progress');
                timer.find('#BilibiliTimerVideoBufferedTimeRange').text((end - curTime).toFixed(0));
            }
            timer.find('#BilibiliTimerVideoTimePercents').text((curTime * 100 / durTime).toFixed(2));
        };
        unsafeWindow.BilibiliTimer.videoProgressListener = function BilibiliTimerVideoProgressListener(e) {
            if (!e.target) return;
            var video = e.target;
            var curTime = video.currentTime || 0;
            var durTime = video.duration || 0;
            if (!curTime && !durTime) return;
            if (!unsafeWindow.BilibiliTimer || !unsafeWindow.BilibiliTimer.timer) return;
            var timer = unsafeWindow.BilibiliTimer.timer;
            if (timer.find('#BilibiliTimerVideoBufferedTimeRange')[0]) {
                video = e.target;
                var end;
                try {
                    end = video.buffered.end(video.buffered.length - 1);
                } catch (_) {
                    try {
                        end = video.buffered.end(0);
                    } catch (_) {
                        return;
                    }
                }
                if (timer.find('#BilibiliTimerVideoBufferedTimeRange').text() === ' - ') unsafeWindow.BilibiliTimer.widthSet = false;
                if (timer.find('#BilibiliTimerVideoTime').text() === ' - ') $(video).trigger('timeupdate');
                timer.find('#BilibiliTimerVideoBufferedTime').text(unsafeWindow.BilibiliTimer.timeParse(end));
                unsafeWindow.BilibiliTimer.timer.find('#BilibiliTimerVideoBufferedTimeRange').text((end - video.currentTime).toFixed(0));
                timer.find('#BilibiliTimerVideoBufferedTimePercents').text((end * 100 / video.duration).toFixed(2));
            }
            timer.find('#BilibiliTimerVideoTimePercents').text((curTime * 100 / durTime).toFixed(2));
        };
        unsafeWindow.BilibiliTimer.start = function BilibiliTimerStart() {
            if (unsafeWindow.BilibiliTimerUninit) return false;
            if (location.host === 'bangumi.bilibili.com') return false;
            if (!unsafeWindow.BilibiliTimer.interval) unsafeWindow.BilibiliTimer.interval = {};
            if (!unsafeWindow.BilibiliTimer.interval.globalWatcher) unsafeWindow.BilibiliTimer.interval.globalWatcher = unsafeWindow.setInterval(unsafeWindow.BilibiliTimer.globalWatcher, 100);
            if (!unsafeWindow.BilibiliTimer.interval.autoHideWatcher) unsafeWindow.BilibiliTimer.interval.autoHideWatcher = unsafeWindow.setInterval(unsafeWindow.BilibiliTimer.autoHideWatcher, 1e3);
            if (!unsafeWindow.BilibiliTimer.interval.lazyWatcher) unsafeWindow.BilibiliTimer.interval.lazyWatcher = unsafeWindow.setInterval(unsafeWindow.BilibiliTimer.lazyWatcher, 5e3);
            try {
                var video = $('video');
                setTimeout(function() {
                    unsafeWindow.BilibiliTimer.videoPlayListener({
                        target: video[0],
                    });
                    unsafeWindow.BilibiliTimer.videoProgressListener({
                        target: video[0],
                    });
                }, 100);
            } catch (_) {
                return;
            }
        };
        unsafeWindow.BilibiliTimer.restart = function BilibiliTimerRestart(reason, node) {
            for (var i in unsafeWindow.BilibiliTimer.interval) {
                if (unsafeWindow.BilibiliTimer.interval[i]) unsafeWindow.clearInterval(unsafeWindow.BilibiliTimer.interval[i]);
            }
            $('.BilibiliTimerSettingButton').remove();
            if (unsafeWindow.BilibiliTimerUninit) return false;
            var timer = $('#BilibiliTimer');
            if (timer[0]) {
                timer.dequeue().clearQueue().css('opacity', '0').delay(370).queue(function() {
                    unsafeWindow.BilibiliTimer.rebuild(reason, node);
                    timer.hide().dequeue();
                });
            } else unsafeWindow.BilibiliTimer.rebuild(reason, node);
        };
        unsafeWindow.BilibiliTimer.rebuild = function BilibiliTimerRebuild(reason, node) {
            console.groupCollapsed('BilibiliTimerRebuildTrace:', reason, node);
            console.trace();
            console.groupEnd();
            unsafeWindow.BilibiliTimer = undefined;
            $('#BilibiliTimer').remove();
            if (unsafeWindow.BilibiliTimerUninit) return false;
            setTimeout(function() {
                code();
            }, 0);
        };
        unsafeWindow.BilibiliTimer.uninit = function BilibiliTimerUninit() {
            for (var i in unsafeWindow.BilibiliTimer.interval) {
                if (unsafeWindow.BilibiliTimer.interval[i]) unsafeWindow.clearInterval(unsafeWindow.BilibiliTimer.interval[i]);
            }
            $('.BilibiliTimerSettingButton').remove();
            $('#BilibiliTimer').remove();
            unsafeWindow.BilibiliTimer = undefined;
            unsafeWindow.BilibiliTimerUninit = true;
        };
        unsafeWindow.BilibiliTimer.start();
    };
    var css = [
        "#BilibiliTimer {",
        "    cursor: move;",
        "    display: block;",
        "    transition-property: opacity, width;",
        "    transition-duration: .37s;",
        "    transition-timing-function: initial;",
        "    transition-delay: initial;",
        "}",
        ".bilibili-player-no-cursor #BilibiliTimer {",
        "    opacity: .73;",
        "    cursor: none;",
        "}",
        "#BilibiliTimer .info-title {",
        "    width: 6em;",
        "    margin: 0;",
        "}",
        "#BilibiliTimer .info-data {",
        "    max-width: 25em;",
        "    white-space: normal;",
        "    vertical-align: top;",
        "}",
        "#BilibiliTimerCloseButton.bilibili-live-player-video-info-close {",
        "    color: rgb(0, 0, 0);",
        "    padding: 0px;",
        "    height: 15px;",
        "    background: rgb(221, 221, 221);",
        "    width: 1em;",
        "    text-align: center;",
        "    top: 8px;",
        "}",
        "#BilibiliTimerRestartButton {",
        "    top: auto;",
        "    bottom: 10px;",
        "}",
        ".BilibiliTimerSettingButton-live {",
        "    -webkit-text-emphasis-color: white;",
        "    -webkit-text-fill-color: white;",
        "    -webkit-text-stroke-color: white;",
        "    background-color: rgb(35, 173, 229);",
        "    border: 0 solid white;",
        "    border-width: 0 1px;",
        "    caret-color: white;",
        "    color: white;",
        "    column-rule-color: white;",
        "    height: 22px;",
        "    line-height: 22px;",
        "    outline-color: white;",
        "    perspective-origin: 33px 11px;",
        "    text-align: center;",
        "    text-decoration: none solid white;",
        "    text-decoration-color: white;",
        "    transform-origin: 33px 11px;",
        "    vertical-align: middle;",
        "    padding: 0 .25em;",
        "}",
        ".bgray-btn-wrap .BilibiliTimer-hr {",
        "    border-style: inset;",
        "    border-width: 1px;",
        "    margin: 0.5em auto;",
        "    overflow: hidden;",
        "}",
        "#BilibiliTimerTitleDescription {",
        "    height: 100%;",
        "    position: relative;",
        "}",
        "#BilibiliTimerTitleDescriptionLabel {",
        "    width: 100%;",
        "    top: 50%;",
        "    left: 0;",
        "    position: absolute;",
        "}",
        ".bgray-btn.show.BilibiliTimerSettingButton {",
        "    writing-mode: tb;",
        "    padding: 7px 8px;",
        "    width: 14px;",
        "}",
        ".BilibiliTimerSettingButton {",
        "    user-select: none;",
        "}",
        "#arc_toolbar_report > .ops > .more > .more-ops-list {",
        "    width: auto;",
        "}",
        "#arc_toolbar_report > .ops > .more > .more-ops-list .BilibiliTimerSettingButton {",
        "    padding: 0 1em;",
        "}",
        "#toolbar_module .BilibiliTimerSettingButton {",
        "    display: block;",
        "    float: left;",
        "    height: 24px;",
        "    margin-left: 12px;",
        "    cursor: pointer;",
        "    line-height: 24px;",
        "    font-size: 14px;",
        "    color: #505050;",
        "}",
        "body:not([data-bilibilitimersettingon*=\"SystemTime\"]) #BilibiliTimerSystemTime,",
        "body:not([data-bilibilitimersettingon*=\"Track\"]) #BilibiliTimerTrack,",
        "body:not([data-bilibilitimersettingon*=\"BufferTime\"]) #BilibiliTimerBufferTime,",
        "body:not([data-bilibilitimersettingon*=\"CurrentPageAndWatchlater\"]) #BilibiliTimerCurrentPageAndWatchlater {",
        "    height: 0!important;",
        "    overflow: hidden;",
        "    width: 0;",
        "}",
    ].join('\n');
    var c;
    c = unsafeWindow.setInterval(function() {
        if (!unsafeWindow.jQuery) return false;
        if (!unsafeWindow.document.querySelector('.bilibili-live-player-video-area, .bilibili-player-video-wrap') || !unsafeWindow.document.querySelector('.bilibili-live-player-video-area, .bilibili-player-video-wrap').querySelector('video')) return;
        if (unsafeWindow.BilibiliTimerUninit || unsafeWindow.BilibiliTimer.start) return unsafeWindow.clearInterval(c);
        if (/^https:\/\/www\.bilibili\.com\/video\/av\d+/i.test(location.href) && parseInt((unsafeWindow.document.cookie.match(/stardustvideo=(-?\d+)/) || [0, '-1'])[1]) > 0) {
            if ([
                    unsafeWindow.document.querySelector('#arc_toolbar_report > .ops > .like') ? unsafeWindow.document.querySelector('#arc_toolbar_report > .ops > .like').innerText : '--',
                    unsafeWindow.document.querySelector('#arc_toolbar_report > .ops > .coin') ? unsafeWindow.document.querySelector('#arc_toolbar_report > .ops > .coin').innerText : '--',
                    unsafeWindow.document.querySelector('#arc_toolbar_report > .ops > .collect') ? unsafeWindow.document.querySelector('#arc_toolbar_report > .ops > .collect').innerText : '--',
                ].includes('--')) return false;
        }
        unsafeWindow.console.info('%c' + script.name + '@' + script.version + ' by ' + script.author + ' is running!', "padding: 34px 66px 34px 66px; line-height: 64px; background:url('" + script.icon64 + "') top left no-repeat; background-position-y: 4px;");
        GM_addStyle(css);
        code();
    }, 100);
})();