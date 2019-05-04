// ==UserScript==
// @name         百度云盘HTML5视频倍速播放
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  百度云盘视频播放器增加倍速播放功能
// @author       arthur
// @match        http://pan.baidu.com/*
// @match        https://pan.baidu.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

/*
 提示字体设置：找到下面代码中，按住说明修改值即可，找到fontSize。

 快捷键说明：

 播放时间定位：
 方向键右→：快进3秒
 方向键左←：后退3秒
 按键F：下一帧
 按键D：上一帧

 音量调节：
 方向键上↑：音量升高 1%
 方向键下↓：音量降低 1%

 播放速度调节：
 按键C：加速播放 +0.1
 按键X：减速播放 -0.1
 按键Z：正常速度播放

 图像参数调节：
 按键E：亮度增加%
 按键W：亮度减少%
 按键T：对比度增加%
 按键R：对比度减少%
 按键U：饱和度增加%
 按键Y：饱和度减少%
 按键O：色相增加 1 度
 按键I：色相减少 1 度
 按键K：模糊增加 1 px
 按键J：模糊减少 1 px
 按键Q：图像复位

 画面调节：
 按键S：画面旋转 90 度
 按键回车：进入全屏（只支持部分网站 B站，油管），还想增加什么网站的话，和我反馈一下！

 兼容性问题：可以使用组合键临时停用插件，例如 播放/暂停 默认为空格键，那么使用Ctrl+space(空格键)即可暂停使用一次插件。
 */

(function () {
    'use strict';
    var html_player_enhance = {
        fontSize: 20,//请输入您希望提示的文字大小(px)，默认值(浏览器默认)为 0,直接输入数字即可！
        isBaiduPan: function () {
            //百度盘h5播放器
            if(location.hostname==="pan.baidu.com"){
                return true;
            }
            return false;
        },
        fullScreen: false,
        baiduPlayer: function () {
            return {
                player: videojs.getPlayers("video-player"),
                get playbackRate(){
                    return this.player.html5player.tech_.playbackRate();
                },
                set playbackRate(playbackRate){
                    this.player.html5player.tech_.setPlaybackRate(playbackRate);
                },
                get currentTime(){
                    return this.player.html5player.tech_.currentTime();
                },
                set currentTime(currentTime){
                    this.player.html5player.tech_.setCurrentTime(currentTime);
                },
                get paused(){
                    return this.player.html5player.tech_.paused();
                },
                get volume(){
                    return this.player.html5player.tech_.volume();
                },
                set volume(volume){
                    return this.player.html5player.tech_.setVolume(volume);
                },

                pause: function(){
                    this.player.html5player.tech_.pause();
                },
                play: function(){
                    this.player.html5player.tech_.play();
                },
                enterFullScreen: function(){
                    this.player.html5player.tech_.enterFullScreen();
                },
                exitFullScreen: function(){
                    this.player.html5player.tech_.exitFullScreen();
                },
            }
        },
        player: function () {
            var _this = html_player_enhance;
            //百度盘h5播放器
            if(_this.isBaiduPan()){
                return _this.baiduPlayer();
            }
            return document.querySelector('video');
        },
        playerDiv: function () {
            return document.querySelector('div.video-main');
        },
        tips: function (str) {
            var style = document.querySelector('#html_player_enhance_tips').style;
            document.querySelector('#html_player_enhance_tips').innerText = str;
            for (var i = 0; i < 3; i++) {
                if (this.on_off[i]) clearTimeout(this.on_off[i]);
            }
            style.display = "block";
            this.on_off[0] = setTimeout(function () {
                style.opacity = 1;
            }, 50);
            this.on_off[1] = setTimeout(function () {
                style.opacity = 0;
            }, 2000);
            this.on_off[2] = setTimeout(function () {
                style.display = "none";
            }, 2800);
        },
        on_off: new Array(3),
        rotate: 0,
        fps: 30,
        filter: {
            key: new Array(5),
            setup: function () {
                var _this = html_player_enhance;
                var view = "brightness({0}) contrast({1}) saturate({2}) hue-rotate({3}deg) blur({4}px)";
                for (var i = 0; i < 5; i++) {
                    view = view.replace("{" + i + "}", String(this.key[i]));
                    this.key[i] = Number(this.key[i]);
                }
                html_player_enhance.playerDiv().style.WebkitFilter = view;
            },
            reset: function () {
                this.key[0] = 1;
                this.key[1] = 1;
                this.key[2] = 1;
                this.key[3] = 0;
                this.key[4] = 0;
                this.setup();
            }
        },
        settips: function () {
            var tips = document.createElement('div');
            this.playerDiv().parentNode.appendChild(tips);
            tips.setAttribute("id", "html_player_enhance_tips");
            tips.setAttribute("style", "position: absolute;z-index: 999999;padding: 10px;background: rgba(0,0,0,0.8);color:white;top: 50%;left: 50%;transform: translate(-50%,-50%);transition: all 500ms ease;opacity: 0;display: none; -webkit-font-smoothing: subpixel-antialiased;font-family: 'microsoft yahei', Verdana, Geneva, sans-serif;-webkit-user-select: none;");
            if (this.fontSize !== 0) {
                tips.style.fontSize = this.fontSize + "px";
            }
        },
        _isFoucs:false,
        isFoucs: function () {
            this.playerDiv().onmouseover = function () {
                html_player_enhance._isFoucs=true;
            };
            this.playerDiv().onmouseout = function () {
                html_player_enhance._isFoucs=false;
            };
        },
        button: function (event) {
            var _this = html_player_enhance;

            //防止组合键冲突
            if (event.altKey || event.ctrlKey || event.shiftKey) return;
            if (!_this.isBaiduPan() && !_this._isFoucs) return;
            event.stopPropagation();
            event.preventDefault();

            var player;
            player = _this.player();

            //方向键右→：快进3秒
            if (event.keyCode === 39) {
                _this.player().currentTime += 3;
                _this.tips("快进：3秒");
            }
            //方向键左←：后退3秒
            if (event.keyCode === 37) {
                _this.player().currentTime -= 3;
                _this.tips("后退：3秒");
            }
            //方向键上↑：音量升高 1%
            if (event.keyCode === 38) {
                if (_this.player().volume < 1) {
                    _this.player().volume += 0.01;
                }
                _this.player().volume = _this.player().volume.toFixed(2);
                _this.tips("音量：" + parseInt(_this.player().volume * 100) + "%");
            }
            //方向键下↓：音量降低 1%
            if (event.keyCode === 40) {
                if (_this.player().volume > 0) {
                    _this.player().volume -= 0.01;
                }
                _this.player().volume = _this.player().volume.toFixed(2);
                _this.tips("音量：" + parseInt(_this.player().volume * 100) + "%");
            }
            //空格键：暂停/播放
            if (event.keyCode === 32) {
                if (_this.player().paused) {
                    _this.player().play();
                    _this.tips("播放");
                } else {
                    _this.player().pause();
                    _this.tips("暂停");
                }
            }
            //按键X：减速播放 -0.1
            if (event.keyCode === 88) {
                if (_this.player().playbackRate > 0) {
                    _this.player().playbackRate -= 0.1;
                    _this.player().playbackRate = _this.player().playbackRate.toFixed(1);
                    _this.tips("播放速度：" + _this.player().playbackRate + "倍");
                }
            }
            //按键C：加速播放 +0.1
            if (event.keyCode === 67) {
                if (_this.player().playbackRate < 16) {
                    _this.player().playbackRate += 0.1;
                    _this.player().playbackRate = _this.player().playbackRate.toFixed(1);
                    _this.tips("播放速度：" + _this.player().playbackRate + "倍");
                }
            }
            //按键Z：正常速度播放
            if (event.keyCode === 90) {
                _this.player().playbackRate = 1;
                _this.tips("播放速度：1倍");
            }
            //按键F：下一帧
            if (event.keyCode == 70) {
                if (!_this.player().paused) _this.player().pause();
                _this.player().currentTime += Number(1 / _this.fps);
                _this.tips("定位：下一帧");
            }
            //按键D：上一帧
            if (event.keyCode == 68) {
                if (!_this.player().paused) _this.player().pause();
                _this.player().currentTime -= Number(1 / _this.fps);
                _this.tips("定位：上一帧");
            }
            //按键E：亮度增加%
            if (event.keyCode == 69) {
                if (_this.filter.key[0] > 1) {
                    _this.filter.key[0] += 1;
                } else {
                    _this.filter.key[0] += 0.1;
                }
                _this.filter.key[0] = _this.filter.key[0].toFixed(2);
                _this.filter.setup();
                _this.tips("图像亮度增加：" + parseInt(_this.filter.key[0] * 100) + "%");
            }
            //按键W：亮度减少%
            if (event.keyCode == 87) {
                if (_this.filter.key[0] > 0) {
                    if (_this.filter.key[0] > 1) {
                        _this.filter.key[0] -= 1;
                    } else {
                        _this.filter.key[0] -= 0.1;
                    }
                    _this.filter.key[0] = _this.filter.key[0].toFixed(2);
                    _this.filter.setup();
                }
                _this.tips("图像亮度减少：" + parseInt(_this.filter.key[0] * 100) + "%");
            }
            //按键T：对比度增加%
            if (event.keyCode == 84) {
                if (_this.filter.key[1] > 1) {
                    _this.filter.key[1] += 1;
                } else {
                    _this.filter.key[1] += 0.1;
                }
                _this.filter.key[1] = _this.filter.key[1].toFixed(2);
                _this.filter.setup();
                _this.tips("图像对比度增加：" + parseInt(_this.filter.key[1] * 100) + "%");
            }
            //按键R：对比度减少%
            if (event.keyCode == 82) {
                if (_this.filter.key[1] > 0) {
                    if (_this.filter.key[1] > 1) {
                        _this.filter.key[1] -= 1;
                    } else {
                        _this.filter.key[1] -= 0.1;
                    }
                    _this.filter.key[1] = _this.filter.key[1].toFixed(2);
                    _this.filter.setup();
                }
                _this.tips("图像对比度减少：" + parseInt(_this.filter.key[1] * 100) + "%");
            }
            //按键U：饱和度增加%
            if (event.keyCode == 85) {
                if (_this.filter.key[2] > 1) {
                    _this.filter.key[2] += 1;
                } else {
                    _this.filter.key[2] += 0.1;
                }
                _this.filter.key[2] = _this.filter.key[2].toFixed(2);
                _this.filter.setup();
                _this.tips("图像饱和度增加：" + parseInt(_this.filter.key[2] * 100) + "%");
            }
            //按键Y：饱和度减少%
            if (event.keyCode == 89) {
                if (_this.filter.key[2] > 0) {
                    if (_this.filter.key[2] > 1) {
                        _this.filter.key[2] -= 1;
                    } else {
                        _this.filter.key[2] -= 0.1;
                    }
                    _this.filter.key[2] = _this.filter.key[2].toFixed(2);
                    _this.filter.setup();
                }
                _this.tips("图像饱和度减少：" + parseInt(_this.filter.key[2] * 100) + "%");
            }
            //按键O：色相增加 1 度
            if (event.keyCode == 79) {
                _this.filter.key[3] += 1;
                _this.filter.setup();
                _this.tips("图像色相增加：" + _this.filter.key[3] + "度");
            }
            //按键I：色相减少 1 度
            if (event.keyCode == 73) {
                _this.filter.key[3] -= 1;
                _this.filter.setup();
                _this.tips("图像色相减少：" + _this.filter.key[3] + "度");
            }
            //按键K：模糊增加 1 px
            if (event.keyCode == 75) {
                _this.filter.key[4] += 1;
                _this.filter.setup();
                _this.tips("图像模糊增加：" + _this.filter.key[4] + "PX");
            }
            //按键J：模糊减少 1 px
            if (event.keyCode == 74) {
                if (_this.filter.key[4] > 0) {
                    _this.filter.key[4] -= 1;
                    _this.filter.setup();
                }
                _this.tips("图像模糊减少：" + _this.filter.key[4] + "PX");
            }
            //按键Q：图像复位
            if (event.keyCode == 81) {
                _this.filter.reset();
                _this.tips("图像属性：复位");
            }
            //按键S：画面旋转 90 度
            if (event.keyCode == 83) {
                _this.rotate += 90;
                if (_this.rotate % 360 === 0) _this.rotate = 0;
                _this.player().style.transform = "rotate(" + _this.rotate + "deg)";
                _this.tips("画面旋转：" + _this.rotate + "度");
            }
            //按键回车，进入全屏，支持仅部分网站(B站，油管)
            if(event.keyCode == 13){
                if(location.hostname==="www.bilibili.com"){
                    if(document.querySelector('[data-text="进入全屏"]')) {
                        document.querySelector('[data-text="进入全屏"]').click();
                    }
                }
                if(location.hostname==="www.youtube.com"){
                    if(document.querySelector('[class="ytp-fullscreen-button ytp-button"]')) {
                        document.querySelector('[class="ytp-fullscreen-button ytp-button"]').click();
                    }
                }
                if(_this.isBaiduPan()){
                    if(_this.fullScreen){
                        _this.player().exitFullScreen();
                        _this.fullScreen = false;
                    }else{
                        _this.player().enterFullScreen();
                        _this.fullScreen = true;
                    }
                }
            }
        },
        init: function () {
            if (document.querySelectorAll('#html_player_enhance_tips').length > 1) {
                document.querySelector('#html_player_enhance_tips').parentNode.removeChild(document.querySelectorAll('#html_player_enhance_tips')[1]);
            }
            // 百度盘视频窗口检测
            if ((document.querySelectorAll('video').length === 1 || document.querySelectorAll('div.video-main').length === 1) && document.querySelectorAll('#html_player_enhance_tips').length === 0) {
                if (!this.load) {
                    var _this = html_player_enhance;
                    this.load = true;
                    setTimeout(function () {
                        console.log("检测到HTML5视频！");
                        console.log(!_this.load);
                        _this.load = false;
                        _this.filter.reset();
                        _this.settips();
                        _this.isFoucs();
                        document.onkeydown = _this.button;
                    }, 1000);
                }
            }
        },
        load: false
    };
    html_player_enhance.init();
    document.addEventListener('DOMNodeInserted', function () {
        html_player_enhance.init();
    });
})();