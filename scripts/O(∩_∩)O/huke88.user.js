// ==UserScript==
// @name         huke88
// @namespace    google.com
// @version      0.13
// @description  就是看视频
// @author       有问题加群472260902
// @match        https://huke88.com/course/*
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @run-at       document-end
// ==/UserScript==
var Alpha_Script = {
    obtainHtml: function (options) {
        options = options || {};
        if (!options.url || !options.method) {
            throw new Error("参数不合法");
        }
        GM_xmlhttpRequest(options);
    },
    parseHeaders: function (headStr) {
        var o = {};
        var myregexp = /^([^:]+):(.*)$/img;
        var match = /^([^:]+):(.*)$/img.exec(headStr);
        while (match != null) {
            o[match[1].trim()] = match[2].trim();
            match = myregexp.exec(headStr);
        }
        return o;
    },
    getParam: function (dest, name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = dest.match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    },
    isArray: function (value) {
        return Object.prototype.toString.apply(value) === '[object Array]';
    }
};

GM_registerMenuCommand("重置虎课Token", setToken, "r");

var hukeAuthTokenName = '__hukeAuthToken__';
var token = GM_getValue(hukeAuthTokenName);

function setToken() {
    token = window.prompt("请输入你的token，不清楚请询问客服", "");
    if (token) {
        GM_setValue(hukeAuthTokenName, token);
    }
}

var layer_spec;
if (typeof layer != "undefined") {
    layer_spec = layer;
} else if (typeof hayer != "undefined") {
    layer_spec = hayer;
}

function toLogin() {
    $('#loginModal').removeClass('hide');
}

function login() {
    if (0 == Param.uid) {
        toLogin();
        return false;
    } else {
        return true;
    }
}


function videoPlay(confirm, callback) {
    var pass = login();
    if (!pass) {
        return;
    } else {
        {
            // rmCover();
            var html = '<div class="img-w75"><img src="' + Param.imgWin3Url + '"></div>';
            html += '<p class="fz16-c3">视频加载中，请等待..........</p>' +
                '<p class="fz16-c3">如果超过2分钟未加载成功，请联系客服</p>' +
                '<p class="fz16-c6">亲爱的会员，你每天可播放5次视频，请勿多次点击</p>';
            layer_spec.confirm(html,
                {
                    btn: ['再看看', '确认学习'],//按钮
                    btnColor: ['1', '2'] //按钮颜色 1白色 2黄色 3橙色
                }, function () {
                    layer_spec.closeAll();
                },
                function () {
                    layer_spec.closeAll();
                }
            );
        }
        Alpha_Script.obtainHtml({
            url: "http://data.zhaomd5.com/playUrl",
            method: 'POST',
            headers: {
                "Accept": "application/*",
                "Content-Type": "application/json;charset=UTF-8",
                "Referer": window.location.origin
            },
            data: JSON.stringify({
                uid: Param.uid,
                token: token,
                src: window.location.href,
                id: Param.video_id,
                exposure: Param.exposure,
                studySourceId: Param.studySourceId,
                confirm: confirm,
                async: false,
                "_csrf-frontend": $('meta[name="csrf-token"]').attr("content")
            }),
            responseType: 'json',
            onload: function (response) {
                layer_spec.closeAll();
                response = response.response;
                callback(response);

            }
        });
    }
}

function play1(response) {
    var clickTime = (new Date()).valueOf();
    var sendAlready = false;
    if ($.inArray(response.code, [1, 2, 3, 4, 5, 6]) !== -1 || (response.code && response.confirm === 1)) {
        rmCover();
        $('#huke88-video').unbind('click');
        $('#no-learn-reply-win-js').remove();
        $('#reply-publish-js').removeClass('hide');
        course.hasStudy = 1;
        $('#huke88-video img').remove();
        $("#huke88-video").hkPlayer({
            'playerVideoUrl': response.video_url,
            'error': function () {
                sendVideoPlayError(playerTypeForSend, (new Date()).valueOf());
                console.log('错误，请联系管理员');
            },
            'play': function () {
                $('#huke88-video-play').remove();
                $('#reply-tip').addClass('hide');
                if (playerTypeForSend == 'html5') {
                    var nowstate = playerCopyForSend.state();
                    if (nowstate == 1) {
                        if (!sendAlready) {
                            sendAlready = true;
                            // sendStatisticTime(playerTypeForSend, (new Date()).valueOf() - clickTime);
                        }
                    }
                } else {
                    if (!sendAlready) {
                        sendAlready = true;
                        // sendStatisticTime(playerTypeForSend, (new Date()).valueOf() - clickTime);
                    }
                }
            }, 'pause': function () {
                $('#reply-tip').removeClass('hide');
            },
            'lastTenSeconds': function () {
                newToNextVideo();
            }
        });
        if (Param.key.length) {
            var data = {
                uv: Param.uv_id,
                keyword: Param.key,
                videoId: Param.video_id
            };
            $.get(Config.searchPlayUrl, data);
        }
    } else if (response.msg.startsWith("no auth")) {
        layer_spec.closeAll();
        {
            // rmCover();
            var html = '<div class="img-w75"><img src="' + Param.imgWin3Url + '"></div>';
            html += '<p class="fz16-c3">你的账户未授权或已过期</p>' +
                '<p class="fz16-c3">请联系客服解决或者加群472260902</p>';
            layer_spec.confirm(html,
                {
                    btn: ['再看看', '确认'],//按钮
                    btnColor: ['1', '2'] //按钮颜色 1白色 2黄色 3橙色
                }, function () {
                    layer_spec.closeAll();
                },
                function () {
                    layer_spec.closeAll();
                }
            );
        }
    } else if (response.msg.startsWith("play times over")) {
        layer_spec.closeAll();
        {
            // rmCover();
            var html = '<div class="img-w75"><img src="' + Param.imgWin3Url + '"></div>';
            html += '<p class="fz16-c3">你当天的播放次数已用完</p>' +
                '<p class="fz16-c3">请隔天再试</p>' +
                '<p class="fz16-c6">亲爱的会员，你每天可播放5次视频，请勿多次点击</p>';
            layer_spec.confirm(html,
                {
                    btn: ['再看看', '确认'],//按钮
                    btnColor: ['1', '2'] //按钮颜色 1白色 2黄色 3橙色
                }, function () {
                    layer_spec.closeAll();
                },
                function () {
                    layer_spec.closeAll();
                }
            );
        }
    } else {
        unsafeWindow.iThink = 1;
        if (response.class === Param.lesssonLimitClass) {
            $(".qz-win").show();
            return false;
        }
        $("div[data-video-modal-id=" + response.code + "]").removeClass('hide');
    }
}

function play2(response) {
    var initStyle = function () {
        $('#huke88-video-play').remove();
        $(".unlogin-tip").addClass('hide');
        $(".login-and-study-dom").removeClass('hide');
        $('#huke88-video img').remove();
        $('.recommend-video').addClass('hide');
        $('.study-tips').addClass('hide');
    };
    //播放视频入口：有权限播放/确认学习
    if ($.inArray(response.code, [1, 2, 3, 4, 6]) !== -1 || (response.code && response.confirm === 1)) {
        rmCover();
        var totalState = false;
        initStyle();

        if (response.give_gold) {
            layer_spec.msg("学习新教程,恭喜获得10虎课币");
        }

        var clickTime = (new Date()).valueOf();
        var sendAlready = false;
        course.hasStudy = 1;

        var cachePlayTimePrefixKey = function () {
            return 'cookiePrefix';
        };
        var setCachePlayTime = function (video_id, time) {
            var cacheKeyPrefixKey = cachePlayTimePrefixKey();
            var cookieKey = cacheKeyPrefixKey + ':' + video_id;
            $.cookie(cookieKey, time);
        };
        var getCachePlayTime = function (video_id) {
            var val = 1;
            var cacheKeyPrefixKey = cachePlayTimePrefixKey();
            var cookieKey = cacheKeyPrefixKey + ':' + video_id;
            var cookieVal = $.cookie(cookieKey);
            if (typeof (cookieVal) !== 'undefined') {
                val = cookieVal - 20 > 0 ? cookieVal - 20 : 1;
            }
            return val;
        };
        var player = new Aliplayer({
            'id': 'huke88-video',
            "source": response.video_url,
            'width': '100%',
            'height': '100%',
            "autoplay": true,   //播放器是否自动播放，在移动端autoplay属性会失效。
            "showBuffer": true, //显示播放时缓冲图标，默认true。
            "controlBarVisibility": 'always', //控制面板的实现，默认为‘hover’，可选的值为：‘click’、‘hover’、‘always’。
            "showBarTime": 3000 //控制栏自动隐藏时间（ms）。
        });
        player.vsource = 'qn';
        //播放器初始化完毕事件
        player.on('ready', function (e) {
            var $target = $(e.target);
            var isHtml = $target.hasClass('prism-player');
            player.isHtml5 = isHtml;
            player.isFlash = !isHtml;

            // HTML5 宽屏 dom 和倍速
            if (player.isHtml5 && parseInt($target.find('.prism-width-screen').length) === 0) {
                var widthScreen = '' +
                    '<div class="prism-width-screen">宽屏</div>' +
                    '<div class="prism-speed">倍速</div>' +
                    '<div class="speed-box hide">' +
                    '<span data-bind-speed="2">2.0x</span>' +
                    '<span data-bind-speed="1.5">1.5x</span>' +
                    '<span data-bind-speed="1.25">1.25x</span>' +
                    '<span class="active" data-bind-speed="1">1.0x</span>' +
                    '<span data-bind-speed="0.75">0.75x</span></div>';
                var forward = '<div class="forward-15"></div>';
                $('.prism-controlbar').append(widthScreen);
                $('.prism-play-btn').after(forward);

                var speedBox = $target.find('div.speed-box');
                var speedBtn = $target.find('.prism-speed');
                var forward = $target.find('.forward-15');
                speedBtn.on('click', function (object) {
                    speedBox.toggleClass('hide');
                });
                speedBox.find('span').on('click', function () {
                    $(this).addClass('active').siblings('span').removeClass('active');
                    speedBox.toggleClass('hide');
                    var speed = $(this).attr('data-bind-speed');
                    player.setSpeed(speed);
                    if (speed == 1) {
                        speedBtn.html('正常');
                    } else {
                        speedBtn.html(speed + 'x');
                    }
                });
                forward.on('click', function () {
                    seek('+');
                });
            }
            if (player.isFlash) {
                var flashWidthScreen = '<div class="prism-width-screen-flash">宽屏</div>';
                $('#huke88-video').append(flashWidthScreen);
                $target.on('mousemove', function () {
                    $('.prism-width-screen-flash').removeClass('hide');
                });
            }

            //初始化推荐视频和学习即将结束 tips
            var recommendVideo = $('.recommend-video');
            if (recommendVideo.length) {
                var recommendVideoClone = recommendVideo.clone();
                $('#huke88-video').append(recommendVideoClone);
                recommendVideo.remove();
            }
            var studyTips = $('.study-tips');
            if (studyTips.length) {
                var studyTipsClone = studyTips.clone();
                $('#huke88-video').append(studyTipsClone);
                studyTipsClone.remove();
            }

            //初始化宽窄屏
            $('#wide-screen').removeClass('hide');
            $('#wide-screen,.prism-width-screen,.prism-width-screen-flash').unbind('click').on('click', function () {
                $('.video-body').toggleClass('width-screen');
            });
            $('div.prism-fullscreen-btn').on('click', function () {
                var isFullscreen = $(this).hasClass('fullscreen');
                var isIE11 = (/Trident\/7\./).test(navigator.userAgent);
                if (isFullscreen === false && isIE11) {
                    setTimeout(function () {
                        player.fullscreenService.requestFullScreen();
                    }, 300);
                }
            });
            var playEventFun = function (e) {
                var recommendVideo = $(e.target).find('.recommend-video');
                if (recommendVideo.length) {
                    recommendVideo.addClass('hide');
                }
                //评论小提示
                $('#reply-tip').addClass('hide');
                //发送统计时间
                if (!sendAlready) {
                    // if (isHtml === true) {
                    //     sendStatisticTime('html5', (new Date()).valueOf() - clickTime);
                    // } else {
                    //     sendStatisticTime('flash', (new Date()).valueOf() - clickTime);
                    // }
                    sendAlready = true;
                }
            };
            var pauseEventFun = function (e) {
                //发表评论小 TIPS
                var pauseTip = $('#reply-tip');
                if (!pauseTip.hasClass('beforePlayShow')) {
                    pauseTip.addClass('beforePlayShow');
                    if ($('.study-tips').hasClass('hide') === false) {
                        pauseTip.css('bottom', '106px');
                    }
                    pauseTip.removeClass('hide');
                }
            };
            var endedEventFun = function (e) {
                var $target = $(e.target);
                $('.recommend-video').removeClass('hide');
                $('.recommend-video .lazy').lazyload({threshold: 200});
                $target.find('.prism-speed').html('正常');
                $target.find('span[data-bind-speed="1"]').addClass('active').siblings('span').removeClass('active');
                console.log($target.find('span[data-bind-speed="1"]').length);
                player.setSpeed('1');
                player.pause();
            };
            var canplayEventFun = function (e) {
                if (totalState === false) {
                    totalState = true;
                    if (player.vsource === 'qn') {
                        new sendPlayState({
                            uid: 26200,
                            videoId: 2048,
                            playPattern: player.isFlash ? 'flash' : 'html5',
                            browser: checkBrowser(),
                            sourceQnState: '播放成功',
                            sourceTxState: '未使用',
                            playState: '播放成功'
                        });
                    } else {
                        new sendPlayState({
                            uid: 26200,
                            videoId: 2048,
                            playPattern: player.isFlash ? 'flash' : 'html5',
                            browser: checkBrowser(),
                            sourceQnState: '播放失败',
                            sourceTxState: '播放成功',
                            playState: '播放成功'
                        });
                    }
                }
            };
            var timeupdateEventFun = function (e) {
                var video_id = Param.video_id;
                var getCurrentTime = player.getCurrentTime();
                setCachePlayTime(video_id, getCurrentTime);

                //视频总时长
                var getDuration = player.getDuration();
                var studyTips = $('.study-tips');
                if ((getDuration - getCurrentTime) < 60 && studyTips.hasClass('isShow') === false) {
                    studyTips.removeClass('hide').addClass('isShow');
                }
            };
            var hideBarEventFun = function (e) {
                if (player.isFlash) {
                    $('.prism-width-screen-flash').addClass('hide');
                }
            };

            var completeSeekEventFun = function (e) {
                initStyle();
            };
            var requestFullScreenEventFun = function (e) {
                $('#reply-tip').addClass('hide');
            };
            //播放器播放事件
            player.on('play', playEventFun);
            //播放器暂停事件
            player.on('pause', pauseEventFun);
            //播放器播放完成事件
            player.on('ended', endedEventFun);
            //播放器隐藏控制栏事件
            player.on('hideBar', hideBarEventFun);
            //播放器缓冲事件
            player.on('waiting', function (e) {
            });
            player.on('canplay', canplayEventFun);
            //播放位置发生改变时触发，仅H5播放器
            player.on('timeupdate', timeupdateEventFun);
            player.on('completeSeek', completeSeekEventFun);
            player.on('requestFullScreen', requestFullScreenEventFun);
            /**
             * 控制播放快进快退
             * @param direction +:快进 else:快退
             */
            var seek = function (direction) {
                var getCurrentTime = player.getCurrentTime();
                var objective;
                if (direction === '+') {
                    var getDuration = player.getDuration(); //视频总时长
                    objective = getCurrentTime + 15 > getDuration ? getDuration : getCurrentTime + 15;
                } else {
                    objective = getCurrentTime - 15 > 0 ? getCurrentTime - 15 : 0;
                }
                player.seek(objective);
            };
            /**
             * 控制音量大小
             * @param direction
             */
            var setVolume = function (direction) {
                var getVolume = player.getVolume();
                var objective;
                if (direction === '+') {
                    objective = getVolume + 0.1 > 1 ? 1 : getVolume + 0.1;
                } else {
                    objective = getVolume - 0.1 > 0 ? getVolume - 0.1 : 0;
                }
                player.setVolume(objective);
            };
            /**
             * 切换视频的播放或者暂停的状态
             */
            var togglePlayOrPause = function () {
                var getStatus = player.getStatus();
                switch (getStatus) {
                    case 'playing':
                        player.pause();
                        break;
                    case 'pause':
                        player.play();
                        break;
                }
            };
            /**
             * 播放器全屏切换
             */
            var toggleFullscreen = function () {
                var getIsFullScreen = player.fullscreenService.getIsFullScreen();
                if (getIsFullScreen === false) {
                    player.fullscreenService.requestFullScreen();
                } else {
                    player.fullscreenService.cancelFullScreen();
                }
            };
            //键盘控制
            $(document).keydown(function (event) {
                var hasChecked = false;
                $('input,textarea').each(function (i) {
                    if ($(this).is(':focus')) {
                        hasChecked = true;
                    }
                });
                if (hasChecked === false) {
                    var preventDefaultKeyCode = [37, 38, 39, 40, 32];
                    var keyCode = parseInt(event.keyCode);
                    if ($.inArray(keyCode, preventDefaultKeyCode) !== -1) {
                        event.preventDefault();
                        switch (keyCode) {  //判断按键
                            case 37:    //左
                                seek('-');
                                break;
                            case 38:    //上
                                setVolume('+');
                                break;
                            case 39:    //右
                                seek('+');
                                break;
                            case 40:    //下
                                setVolume('-');
                                break;
                            case 32:    //空格
                                togglePlayOrPause();
                                break;
                            default:
                                break;
                        }
                    }
                }
            });
            if (player.isHtml5) {
                var time = null;
                //鼠标单击绑定
                $target.find('video').on('click', function () {
                    clearTimeout(time);
                    time = setTimeout(function () {
                        togglePlayOrPause();
                    }, 300);
                });
                $target.find('video').on('dblclick', function () {
                    // 取消上次延时未执行的方法
                    clearTimeout(time);
                    toggleFullscreen();
                });
            }
            if (player.isHtml5) {
                var video_id = Param.video_id;
                var seekTime = getCachePlayTime(video_id);
                // player.seek(seekTime);
            }

            player.play();
        });

        var errorEventFun = function (e) {
            var isHtml5 = $(e.target).hasClass('prism-player');
            if (player.vsource == 'qn') {
                if (isHtml5) {
                    if (e.paramData.error_code == 4006) {
                        var video_id = Param.video_id;
                        var seekTime = getCachePlayTime(video_id);
                        player.loadByUrl(response.video_url_tx, seekTime);
                    }
                } else {
                    player.dispose();
                    $('#huke88-video').empty();
                    player = new Aliplayer({
                        'id': 'huke88-video',
                        "source": response.video_url_tx,
                        'width': '100%',
                        'height': '100%',
                        "autoplay": true,   //播放器是否自动播放，在移动端autoplay属性会失效。
                        "showBuffer": true, //显示播放时缓冲图标，默认true。
                        "controlBarVisibility": 'hover', //控制面板的实现，默认为‘hover’，可选的值为：‘click’、‘hover’、‘always’。
                        "showBarTime": 3000 //控制栏自动隐藏时间（ms）。
                    });
                }
                player.vsource = 'tx';
            } else {
                if (isHtml5 && e.paramData.error_code == 4006 && player.vsource == 'tx' && totalState === false) {
                    totalState = true;
                    new sendPlayState({
                        uid: 26200,
                        videoId: 2048,
                        playPattern: player.isFlash ? 'flash' : 'html5',
                        browser: checkBrowser(),
                        sourceQnState: '播放失败',
                        sourceTxState: '播放失败',
                        playState: '播放失败'
                    });
                }
            }
        };
        //播放器播放错误事件
        player.on('error', errorEventFun);

        //统计播放
        if (Param.key.length) {
            var data = {
                uv: Param.uv_id,
                keyword: Param.key,
                videoId: Param.video_id
            };
            $.get(Config.searchPlayUrl, data);
        }
    } else if (response.msg.startsWith("no auth")) {
        layer_spec.closeAll();
        {
            // rmCover();
            var html = '<div class="img-w75"><img src="' + Param.imgWin3Url + '"></div>';
            html += '<p class="fz16-c3">你的账户未授权或已过期</p>' +
                '<p class="fz16-c3">请联系客服解决或者加群472260902</p>';
            layer_spec.confirm(html,
                {
                    btn: ['再看看', '确认'],//按钮
                    btnColor: ['1', '2'] //按钮颜色 1白色 2黄色 3橙色
                }, function () {
                    layer_spec.closeAll();
                },
                function () {
                    layer_spec.closeAll();
                }
            );
        }
    } else if (response.msg.startsWith("play times over")) {
        layer_spec.closeAll();
        {
            // rmCover();
            var html = '<div class="img-w75"><img src="' + Param.imgWin3Url + '"></div>';
            html += '<p class="fz16-c3">你当天的播放次数已用完</p>' +
                '<p class="fz16-c3">请隔天再试</p>' +
                '<p class="fz16-c6">亲爱的会员，你每天可播放5次视频，请勿多次点击</p>';
            layer_spec.confirm(html,
                {
                    btn: ['再看看', '确认'],//按钮
                    btnColor: ['1', '2'] //按钮颜色 1白色 2黄色 3橙色
                }, function () {
                    layer_spec.closeAll();
                },
                function () {
                    layer_spec.closeAll();
                }
            );
        }
    } else {
        iThink = 1;
        if (response.class === Param.lesssonLimitClass) {
            $(".qz-win").show();
            return false;
        }
        if (response.code == 5) {
            var html = '<div class="img-w75"><img src="' + Param.imgWin3Url + '"></div>';
            html += '<p class="fz16-c3">确认学习吗？</p><p class="fz16-c6">亲爱的虎课学员，你每天可免费学习一个教程</p>';
            html += '<p class="fz16-c6">成为VIP可无限学习</p>';
            html += '<p class="af70-l"><a onclick="entrance(5);buttonClickRecord(' + Param.courseLimitButtonType + ');" href="' + Url.payUrl + '" target="_blank">成为' + Param.vipName + 'VIP</a>';
            if (response.is_upgrade == 1) {
                html += '<a href="' + Url.upgradeUrl + '" class="upvip" target="_blank" onclick="entrance(5);buttonClickRecord(130);">升级全站通VIP</a>';
            }
            html += '</p>';
            layer_spec.confirm(html,
                {
                    btn: ['再看看', '确认学习'],//按钮
                    btnColor: ['1', '2'] //按钮颜色 1白色 2黄色 3橙色
                }, function () {
                    layer_spec.closeAll();
                },
                function () {
                    sure_study();
                    layer_spec.closeAll();
                }
            );
        } else {
            $("div[data-video-modal-id=" + response.code + "]").removeClass('hide');
        }
    }
}

//播放视频function
function play3(response) {
    //登陆状态
    if (login() === false) {
        return false;
    }

    //播放视频入口：有权限播放/确认学习
    if ($.inArray(response.code, [1, 2, 3, 4, 6]) !== -1 || (response.code && response.confirm === 1)) {
        $('#huke88-video').unbind('click');
        $('#no-learn-reply-win-js').remove();
        $('#reply-publish-js').removeClass('hide');
        course.hasStudy = 1;
        $(".unlogin-tip").addClass('hide');
        $(".login-and-study-dom").removeClass('hide');
        if (response.give_gold) {
            hayer.msg("学习新教程,恭喜获得10虎课币");
        }

        $('#huke88-video img').remove();
        $('#huke88-video-play').remove();
        var tx = response.video_url_tx;
        // var tx = "http://og9dz2jqu.cvoda.com/Zmlyc3R2b2RiOldlYiBEZXZlbG9wbWVudCBJbiAyMDE3IC0gQSBQcmFjdGljYWwgR3VpZGUtOWhES2ZCS3VYakkubWt2_q00000001.m3u8";
        var qn = response.video_url;
        // var qn = "http://og9dz2jqu.cvoda.com/Zmlyc3R2b2RiOldlYiBEZXZlbG9wbWVudCBJbiAyMDE3IC0gQSBQcmFjdGljYWwgR3VpZGUtOWhES2ZCS3VYakkubWt2_q00000001.m3u8";

        //判断用什么播放器
        var selectPlayer = function () {
            var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
            var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
            var isIE = window.ActiveXObject || "ActiveXObject" in window;
            var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
            var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
            var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
            var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1 && !isEdge; //判断Chrome浏览器
            if (isIE) {
                var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                reIE.test(userAgent);
                var fIEVersion = parseFloat(RegExp["$1"]);
                if (userAgent.indexOf('MSIE 6.0') != -1 || fIEVersion == 7 || fIEVersion == 8 || fIEVersion == 9 || fIEVersion == 10) {
                    return 'flash';
                } else if (userAgent.toLowerCase().match(/rv:([\d.]+)\) like gecko/)) {
                    return "flash   ";
                } else {
                    return 'flash';
                }
            }
            if (isFF || isOpera || isSafari || isChrome || isEdge) {
                return "html5";
            }
        };

        if (selectPlayer() == 'html5') {
            var videoHtml = '<video id="my-video" style="width: 100%; height: 100%;" class="video-js"></video><div id="msg" class="hide"></div>';
            $('#huke88-video').prepend(videoHtml);

            var getPlayerUrl = function () {
                if (cookieLine === undefined) {
                    if (useQnState !== 1) {
                        useQn = 1;
                        currentLine = 'qn';
                        return {line: qn, title: 'qn'};
                    } else {
                        useTx = 1;
                        currentLine = 'tx';
                        return {line: tx, title: 'tx'};
                    }
                } else {
                    if (cookieLine === 'qn') {
                        if (useQnState !== 1) {
                            useQn = 1;
                            currentLine = 'qn';
                            return {line: qn, title: 'qn'};
                        } else {
                            useTx = 1;
                            currentLine = 'tx';
                            return {line: tx, title: 'tx'};
                        }
                    } else {
                        if (useTxState !== 1) {
                            useTx = 1;
                            currentLine = 'tx';
                            return {line: tx, title: 'tx'};
                        } else {
                            useQn = 1;
                            currentLine = 'qn';
                            return {line: qn, title: 'qn'};
                        }
                    }
                }
            };
            var retryNum = 0;                           // 重新拉流次数
            var maxRetryNum = 8;                            // 最大重新拉流次数

            var Component = neplayer.lib.getComponent("Component");

            var errorElement = document.createElement("div");
            neplayer.lib.dom.addClass(errorElement, "error");
            var ErrorComponent = neplayer.lib.extend(Component, {});
            var errorComponent = new ErrorComponent(null, {el: errorElement});

            var clRecomend = $('.recommend-video').clone();
            var recommendElement = clRecomend[0];
            var RecommendComponent = neplayer.lib.extend(Component, {});
            var recommendComponent = new RecommendComponent(null, {el: recommendElement});

            var clStudyEnd = $('.study-tips').clone();
            var studyEndElement = clStudyEnd[0];
            var StudyEndComponent = neplayer.lib.extend(Component, {});
            var studyEndComponent = new StudyEndComponent(null, {el: studyEndElement});
            $('.recommend-video,.study-tips').remove();

            var LineComponent = neplayer.lib.extend(Component, {
                createEl: function () {
                    var div = document.createElement('div');
                    div.setAttribute('class', 'tool-line');

                    var lineDiv = document.createElement('div');

                    var lineSpan1 = document.createElement('span');
                    lineSpan1.innerHTML = '线路一';
                    lineSpan1.setAttribute('data-source', qn);
                    var lineSpan2 = document.createElement('span');
                    lineSpan2.innerHTML = '线路二';
                    lineSpan2.setAttribute('data-source', tx);
                    lineDiv.appendChild(lineSpan1);
                    lineDiv.appendChild(lineSpan2);
                    lineDiv.setAttribute('class', 'hide');

                    var button = document.createElement("button");
                    button.innerHTML = "线路";
                    div.appendChild(button);
                    div.appendChild(lineDiv);
                    return div;
                }
            });
            var lineComponent = new LineComponent();
            var lineComponentEl = lineComponent.el_;
            $(lineComponentEl).find('button').on('click', function () {
                $(this).siblings('div').toggleClass('hide');
            });
            $(lineComponentEl).on('mouseleave', function () {
                $(this).find('div').addClass('hide');
            });
            $(lineComponentEl).find('span').on('click', function () {
                var source = $(this).attr('data-source');
                var html = $(this).html();
                $(lineComponentEl).find('button').html(html);
                $(this).parent('div').toggleClass('hide');

                var currentPosition = myPlayer.getCurrentPosition();
                myPlayer.reset();
                myPlayer.setDataSource([{type: "application/x-mpegURL", src: source}]);
                myPlayer.seekTo(currentPosition);
                myPlayer.play();
            });

            var SpeedComponent = neplayer.lib.extend(Component, {
                createEl: function () {
                    var div = document.createElement('div');
                    div.setAttribute('class', 'tool-speed');

                    var speedDiv = document.createElement('div');

                    var speedSpan2 = document.createElement('span');
                    speedSpan2.innerHTML = '2x';
                    speedSpan2.setAttribute('data-speed', 2.0);

                    var speedSpan1_5 = document.createElement('span');
                    speedSpan1_5.innerHTML = '1.5x';
                    speedSpan1_5.setAttribute('data-speed', 1.5);

                    var speedSpan1_2_5 = document.createElement('span');
                    speedSpan1_2_5.innerHTML = '1.25x';
                    speedSpan1_2_5.setAttribute('data-speed', 1.25);

                    var speedSpan1 = document.createElement('span');
                    speedSpan1.innerHTML = '1x';
                    speedSpan1.setAttribute('data-speed', 1.0);

                    var speedSpan0_75 = document.createElement('span');
                    speedSpan0_75.innerHTML = '0.75x';
                    speedSpan0_75.setAttribute('data-speed', 0.75);

                    speedDiv.appendChild(speedSpan2);
                    speedDiv.appendChild(speedSpan1_5);
                    speedDiv.appendChild(speedSpan1_2_5);
                    speedDiv.appendChild(speedSpan1);
                    speedDiv.appendChild(speedSpan0_75);
                    speedDiv.setAttribute('class', 'hide');

                    var button = document.createElement("button");
                    button.innerHTML = "倍速";
                    div.appendChild(button);
                    div.appendChild(speedDiv);
                    return div;
                }
            });
            var speedComponent = new SpeedComponent();
            var speedComponentEl = speedComponent.el_;
            $(speedComponentEl).find('button').on('click', function () {
                $(this).siblings('div').toggleClass('hide');
            });
            $(speedComponentEl).on('mouseleave', function () {
                $(speedComponentEl).find('div').addClass('hide');
            });
            $(speedComponentEl).find('span').on('click', function () {
                var _this = $(this);
                var speed = _this.attr('data-speed');
                var html = _this.html();

                $(speedComponentEl).find('button').html(html);
                _this.parent('div').addClass('hide');

                var video = document.getElementById('my-video_html5_api') || document.getElementById('my-video_Html5_api');
                video.playbackRate = speed;
            });

            var WideScreenComponent = neplayer.lib.extend(Component, {
                createEl: function () {
                    var button = document.createElement("button");
                    button.innerHTML = "宽屏";
                    button.classList.add('wide-screen');
                    return button;
                }
            });
            var wideScreenComponent = new WideScreenComponent();
            var wideScreenComponentEl = wideScreenComponent.el_;
            $(wideScreenComponentEl).on('click', function () {
                myPlayer.exitFullscreen();
                var _this = $(this);
                var html = _this.html();
                var video_body = $('div.video-body');
                if (html === '宽屏') {
                    video_body.addClass('wider-screen');
                    _this.html('窄屏');
                } else {
                    video_body.removeClass('wider-screen');
                    _this.html('宽屏');
                }
                myPlayer.resize('100%', '100%');
            });

            var myPlayer = neplayer('my-video', {
                "bigPlayButton": false,
                "controlBar": {
                    'currentTimeDisplay': true,
                    'durationDisplay': true,
                    'remainingTimeDisplay': false,
                    'liveDisplay': false
                },
                "errorDisplay": false,
                "streamTimeoutTime": 20000, //拉流超时时间，默认30s
                "controls": true, //是否显示控制条
                "preload": "auto",
                "loop": false, //是否循环播放
                "techOrder": ["html5", "flash"], //优先使用的播放模式
                "autoplay": true //是否自动播放(ios不支持自动播放)
            }, function () {
                myPlayer.corePlayer.addChild(errorComponent, {});
                myPlayer.corePlayer.addChild(recommendComponent, {});
                myPlayer.corePlayer.addChild(studyEndComponent, {});
                myPlayer.corePlayer.controlBar.addChild(lineComponent, {}, 9);
                myPlayer.corePlayer.controlBar.addChild(speedComponent, {}, 7);
                myPlayer.corePlayer.controlBar.addChild(wideScreenComponent, {}, 6);
                myPlayer.setDataSource([{type: "application/x-mpegURL", src: getPlayerUrl().line}]);
                myPlayer.play();

                var playVideoHistoryTimeHidden = 0;
                var playTimeFifty = setInterval(function () {
                    if ($(".play-video-time").length !== 0) {
                        if (parseInt(playVideoHistoryTimeHidden) >= 15) {
                            $(".play-video-time").remove();
                            clearInterval(playTimeFifty);
                            return false;
                        }
                        if ($(".play-video-time").hasClass('hide') == false) {
                            playVideoHistoryTimeHidden = parseInt(playVideoHistoryTimeHidden) + 3;
                        }
                    }
                }, 3000);
                var progressControl = function (d, t, n) {
                    var b = 0;
                    var st = setInterval(
                        function () {
                            if ($(d).css('opacity') == '0') {
                                $('div.play-video-time').css({'bottom': '0px'});
                            } else {
                                $('div.play-video-time').css({'bottom': '40px'});
                            }
                            b++;
                            if (b > n) {
                                clearInterval(st);
                            }
                        }, t);

                };
                progressControl('.vjs-control-bar', 100, 150);
                $(document).keydown(function (event) {
                    var hasChecked = false;
                    $('input,textarea').each(function (i) {
                        if ($(this).is(':focus')) {
                            hasChecked = true;
                        }
                    });
                    if (hasChecked === false) {
                        var currentTime = myPlayer.getCurrentPosition();
                        var volume = myPlayer.getVolume();

                        var preventDefaultKeyCode = [37, 38, 39, 40, 32];
                        var keyCode = parseInt(event.keyCode);
                        if ($.inArray(keyCode, preventDefaultKeyCode) !== -1) {
                            event.preventDefault();
                            if (keyCode === 38) {    //上
                                myPlayer.setVolume(volume + 0.1);
                            }

                            if (keyCode === 40) {    //下
                                myPlayer.setVolume(volume - 0.1);
                            }

                            if (keyCode === 37) {    //左
                                myPlayer.seekTo(currentTime - 5000);
                            }

                            if (keyCode === 39) {    //右
                                myPlayer.seekTo(currentTime + 5000);
                            }

                            if (keyCode === 32) {    //空格
                                var isPaused = $('button.vjs-play-control').hasClass('vjs-paused');
                                if (isPaused) {
                                    myPlayer.play();
                                } else {
                                    myPlayer.pause();
                                }
                            }
                        }
                    }
                });
            });

            myPlayer.on("canplay", function () {
                errorElement.style.display = "none";
                $('#msg').addClass('hide').css('z-index', -1);

                if (currentLine === 'qn') {
                    $.cookie('setting_line', 'qn', {expires: 3});
                    useQnState = 2;
                } else {
                    $.cookie('setting_line', 'tx', {expires: 3});
                    useTxState = 2;
                }

                if (sendStatiscs === 0) {
                    sendStatiscs = 1;
                    (new PlayVideoStatistics({
                        'category': Param.category,
                        'pid': guid,
                        'pn': 1,
                        'pr': 1,
                        'qn': useQn === 1 ? useQnState : 3,
                        'tx': useTx === 1 ? useTxState : 3,
                        'ua': ua,
                        'uid': Param.uid,
                        'vid': Param.video_id,
                        'error_code': 0,
                        'error_msg': '正常播放'
                    })).push();
                }
            });
            myPlayer.on("play", function () {
                $('#reply-tip').addClass('beforePlayShow').addClass('hide');
            });
            myPlayer.on("waiting", function () {
                console.log('waiting');
            });
            myPlayer.on('ratechange', function () {
                var video = document.getElementById('my-video_html5_api') || document.getElementById('my-video_Html5_api');
                var currentPlayBackRate = video.playbackRate;
                $.cookie('play_speed', currentPlayBackRate, {expires: 15});
            });
            myPlayer.on('loadeddata', function () {
                var play_speed = $.cookie('play_speed');
                if (play_speed !== undefined) {
                    var video = document.getElementById('my-video_html5_api') || document.getElementById('my-video_Html5_api');
                    video.playbackRate = play_speed;
                    $('div.tool-speed button').html(play_speed + 'x');
                }
                startUpPlayVideoTime(myPlayer, 'h5');

                var volume = myPlayer.getVolume();
                myPlayer.setVolume(volume);
            });
            myPlayer.on("progress", function () {
                var leftTime = (myPlayer.getDuration() - myPlayer.getCurrentPosition()) / 1000;
                if (Param.isVip == 0 && showEndPop) {
                    if (leftTime <= 60) {
                        $('.study-tips').removeClass('hide');
                        showEndPop = false;
                    }
                }
            });
            myPlayer.onPlayState(1, function () {
                $('.recommend-video').addClass('hide');
            });
            myPlayer.onPlayState(2, function () {
                //暂停弹窗（只第一次点击暂停时出现）
                var pauseTip = $('#reply-tip');
                if (!pauseTip.hasClass('beforePlayShow')) {
                    pauseTip.removeClass('hide');
                    pauseTip.addClass('beforePlayShow');
                } else {
                    if (!pauseTip.hasClass('hasShow')) {
                        pauseTip.removeClass('hide');
                        pauseTip.addClass('hasShow');
                    }
                }
                commentTip();
            });
            myPlayer.onPlayState(3, function () {
                $('.recommend-video').removeClass('hide');
                $('.recommend-video .lazy').lazyload({threshold: 200});
            });
            myPlayer.onError(function (err) {
                var errCode = err.errCode;
                var errMsg = err.errMsg;
                if (retryNum < maxRetryNum) {
                    retryNum = retryNum + 1;
                    myPlayer.refresh();
                    myPlayer.play();
                } else {
                    if (useQnState === 1 && useTxState === 1) {
                        $('#msg').addClass('hide').css('z-index', -1);
                        errorElement.innerHTML = '播放错误，请联系客服!';
                        errorElement.style.display = "block";
                        if (sendStatiscs === 0) {
                            sendStatiscs = 1;
                            (new PlayVideoStatistics({
                                'category': Param.category,
                                'pid': guid,
                                'pn': 1,
                                'pr': 2,
                                'qn': useQn === 1 ? useQnState : 3,
                                'tx': useTx === 1 ? useTx : 3,
                                'ua': ua,
                                'uid': Param.uid,
                                'vid': Param.video_id,
                                'error_code': errCode,
                                'error_msg': errMsg
                            })).push();
                        }
                    } else {
                        if (currentLine === 'qn') {
                            useQnState = 1;
                        } else {
                            useTxState = 1;
                        }
                        myPlayer.setDataSource([{type: "application/x-mpegURL", src: getPlayerUrl().line}]);
                        myPlayer.play();
                    }
                }
            });
        } else {
            var videoHtml = '<div id="my-video" style="width: 100%; height: 100%;" class="video-js"></div>';
            $('#huke88-video').prepend(videoHtml);

            var videoObject = {
                playerID: 'ckplayerId',//播放器ID，第一个字符不能是数字，用来在使用多个播放器时监听到的函数将在所有参数最后添加一个参数用来获取播放器的内容
                container: '#my-video', //容器的ID或className
                variable: 'player', //播放函数名称
                loaded: 'ckXLoadedHandler', //当播放器加载后执行的函数
                loop: false, //播放结束是否循环播放
                autoplay: true, //是否自动播放
                debug: false, //是否开启调试模式
                player: true, //强制使用player
                flashplayer: true, //强制使用player
                video: qn
            };
            player = new ckplayer(videoObject);
            startUpPlayVideoTime(player, 'flash');
        }

        //当日播放第三个播放展示分享弹窗
        if (Param.today_study_nums >= 2) {
            show_share_win();
        }
        sendSearchPlayStatistics(1);
    } else {
        iThink = 1;

        //##invite_free_60
        /*if( response.code==14 ){
            layer.confirm('<div class="img-w75"><img src="'+Param.imgWin1Url+'"></div><p class="fz16-c6">您的学习次数已经达到上限</p><p class="fz16-c6">你可以通过邀请好友注册解锁更多学习次数</p>',
            {
                btn: ['获取免费学习次数','赞助成为VIP'],//按钮
                btnColor: ['2','2'] //按钮颜色 1白色 2黄色 3橙色
            },function(){
                window.open(response.inviteUrl);
                layer.closeAll();
            },function(){
                window.open(Url.payUrl);
                layer.closeAll();
            }
           );
        } else if( response.code==15 ){
            layer.confirm('<div class="img-w75"><img src="'+Param.imgWin2Url+'"></div><p class="fz16-c3">确认学习吗？</p><p class="fz16-c6">您的免费学习剩余<span class="cf70">'+response.free_num+'</span>次</p><p class="fz16-c6">你可以通过邀请好友注册解锁更多学习次数</p><p class="af70-l"><a href="'+Url.payUrl+'" target="_blank">我要成为VIP</a></p>',
            {
                btn: ['确认学习','获取免费学习次数'],//按钮
                btnColor: ['1','3'] //按钮颜色 1白色 2黄色 3橙色
            },function(){
                sure_study();
                layer.closeAll();
            },function(){
                window.open(response.inviteUrl);
                layer.closeAll();
            }
            );
        }else{
            $("div[data-video-modal-id=" + response.code + "]").removeClass('hide');
        }*/
        if (response.code == 5) {
            var html = '<div class="img-w75"><img src="' + Param.imgWin3Url + '"></div>';
            html += '<p class="fz16-c3">确认学习吗？</p><p class="fz16-c6">亲爱的虎课学员，你每天可免费学习一个教程</p>';
            html += '<p class="fz16-c6">成为VIP可无限学习</p>';
            html += '<p class="af70-l"><a onclick="entrance(5);buttonClickRecord(' + Param.courseLimitButtonType + ');" href="' + Url.payUrl + '" target="_blank">成为' + Param.vipName + 'VIP</a>';
            if (response.is_upgrade == 1) {
                html += '<a href="' + Url.upgradeUrl + '" class="upvip" target="_blank" onclick="entrance(5);buttonClickRecord(130);">升级全站通VIP</a>';
            }
            html += '</p>';
            hayer.confirm(html, {
                    btn: ['再看看', '确认学习'], //按钮
                    btnColor: ['1', '2'] //按钮颜色 1白色 2黄色 3橙色
                }, function () {
                    hayer.closeAll();
                },
                function () {
                    sure_study();
                    hayer.closeAll();
                }
            );
        } else {
            var playPopup = $("div[data-video-modal-id=" + response.code + "]");
            playPopup.removeClass('hide');
            if (response.code === 11) {
                playPopup.find('.notice-red').html(response.limit_num);
            }

            sendSearchPlayStatistics(2);
        }
    }
}

setTimeout(function () {
    $("#huke88-video").unbind('click');
    $("#download-case-js").unbind('click');
    $("#download-source-js").unbind('click');
    $("#see-other-content").unbind('click');

    var playedJust = false;
    $("#huke88-video").bind('click', function () {
        if (playedJust) {
            return false;
        } else {
            playedJust = true;
            setTimeout(function () {
                playedJust = false;
            }, 5000);
        }
        // if ($("#huke88-video").hkPlayer) {
        //     videoPlay(0, play1);
        // } else if (Aliplayer) {
        //     $('#huke88-video').unbind('click');
        //     videoPlay(0, play2);
        // }
        $('#huke88-video').unbind('click');
        videoPlay(0, play3);
    });
    $("#download-source-js").on('click', function () {
        var pass = login();
        if (!pass) {
            return;
        } else {
            download(1, 0);
        }
    });
    $("#download-case-js").on('click', function () {
        var pass = login();
        if (!pass) {
            return;
        } else {
            download(2, 0);
        }
    });
    $('#see-other-content').on('click', function () {
        var pass = login();
        if (!pass) {
            return;
        } else {
            getVideoContent(0);
        }
    });
}, 500);


function download(type, confirm) {
    var pass = login();
    if (!pass) {
        return;
    } else {
        Alpha_Script.obtainHtml({
            url: "http://data.zhaomd5.com/download",
            method: 'POST',
            headers: {
                "Accept": "application/*",
                "Content-Type": "application/json;charset=UTF-8",
                "Referer": window.location.origin
            },
            data: JSON.stringify({
                uid: Param.uid,
                token: token,
                src: window.location.href,
                id: Param.video_id,
                type: type,
                studySourceId: Param.studySourceId,
                confirm: confirm,
                "_csrf-frontend": $('meta[name="csrf-token"]').attr("content")
            }),
            responseType: 'json',
            onload: function (response) {
                rmCover();
                response = response.response;
                if ($.inArray(response.code, [1, 2, 3, 4, 5]) !== -1 || (response.code && response.confirm === 1)) {
                    new downloadFiles(response.download_url);
                    course.hasStudy = 1;
                    $('#no-learn-reply-win-js').remove();
                    $('#reply-publish-js').removeClass('hide');
                } else {
                    unsafeWindow.iThink = type + 1;
                    $("div[data-video-modal-id=" + response.code + "]").removeClass('hide');
                }
            }
        });
    }
}


function getVideoContent(confirm) {
    Alpha_Script.obtainHtml({
        url: "http://data.zhaomd5.com/videoContent",
        method: 'POST',
        headers: {
            "Accept": "application/*",
            "Content-Type": "application/json;charset=UTF-8",
            "Referer": window.location.origin
        },
        data: JSON.stringify({
            uid: Param.uid,
            token: token,
            src: window.location.href,
            id: Param.video_id,
            studySourceId: Param.studySourceId,
            confirm: confirm,
            "_csrf-frontend": $('meta[name="csrf-token"]').attr("content")
        }),
        responseType: 'json',
        onload: function (response) {
            rmCover();
            response = response.response;
            if ($.inArray(response.code, [1, 2, 3, 4]) !== -1 || (response.code && response.confirm === 1)) {
                $('.course-wrap').html(response.content);
                $('#reply-publish-js').removeClass('hide');
                $('.comment-wrap-content').removeClass('hide');
                $("#see-other-content").addClass('hide');
                course.hasStudy = 1;
            } else {
                unsafeWindow.iThink = 4;
                if (response.code == 5) {
                    var html = '<div class="img-w75"><img src="' + Param.imgWin3Url + '"></div>';
                    html += '<p class="fz16-c3">确认学习吗？</p><p class="fz16-c6">亲爱的虎课学员，你每天可免费学习一个教程</p>';
                    html += '<p class="fz16-c6">成为VIP可无限学习</p>';
                    html += '<p class="af70-l"><a onclick="entrance(5);buttonClickRecord(' + Param.courseLimitButtonType + ');" href="' + Url.payUrl + '" target="_blank">成为' + Param.vipName + 'VIP</a>';
                    if (response.is_upgrade == 1) {
                        html += '<a href="' + Url.upgradeUrl + '" class="upvip" target="_blank" onclick="entrance(5);buttonClickRecord(130);">升级全站通VIP</a>';
                    }
                    html += '</p>';
                    layer_spec.confirm(html,
                        {
                            btn: ['再看看', '确认学习'],//按钮
                            btnColor: ['1', '2'] //按钮颜色 1白色 2黄色 3橙色
                        }, function () {
                            layer_spec.closeAll();
                        },
                        function () {
                            sure_study();
                            layer_spec.closeAll();
                        }
                    );
                } else {
                    $("div[data-video-modal-id=" + response.code + "]").removeClass('hide');
                }
            }
        }
    });
}

function rmCover() {
    $('div[id^=learn-win-js]').remove();
    $('div[id^=layui-layer_spec]').remove();
    $('div[id^=vip-win-js]').remove();
    $('div[id^=no-vip-win-js]').remove();
    $('div[id^=limit-ip-win-js]').remove();
    $('div[id^=limit-win-js]').remove();
    $('div[id^=limit-source-win-js]').remove();
    $('div[id^=limit-material-win-js]').remove();
    $('div[id^=limit-source-win-js]').remove();
    $('div[id^=no-learn-reply-win-js]').remove();
}