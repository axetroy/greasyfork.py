// ==UserScript==
// @name           Yandex视频横屏插件
// @name:en        Yandex Video Player Horizontal Screen Plug-in
// @description    移动端Yandex浏览器看视频全屏时强制为横屏观看(安卓已经过测试运行，ios并未测试)
// @description:en Yandex browser is set to play horizontally when viewing full-screen video. This is for Android, and IOS is not tested.
// @version        1.2.5
// @author         L.Xavier
// @namespace      https://greasyfork.org/zh-CN/users/128493
// @match          *://*/*
// @grant          none
// @run-at         document-end
// @note           功能说明:1.全屏下强制为横屏观看，支持重力感应切换方向(需要设备支持)。2.添加双击全屏功能。一些网站全屏按钮无法使视频进入全屏模式(例如m.bilibili.com)，新增在视频播放状态下，双击全屏(支持双击退出全屏)。该功能需要关闭yandex浏览器的"忽略网站的禁止字体缩放请求"功能，不关闭双击会缩放网页。3.竖屏模式。有些视频更适宜在竖屏状态下观看，新增摇一摇切换竖屏，再次摇一摇换回横屏(需要设备支持)。
// @v1.1.0        2019-01-01 - 1.添加竖屏模式。有些视频更适宜在竖屏状态下观看，全屏状态下，手机竖直摆放时会重新回到竖屏模式。2.添加双击全屏功能。一些网站全屏按钮无法使视频进入全屏模式(例如m.bilibili.com)，新增在视频播放状态下，双击全屏(支持双击退出全屏)。该功能需要关闭yandex浏览器的"忽略网站的禁止字体缩放请求"功能，不关闭双击会缩放网页。
// @v1.1.1        2019-01-02 - 优化了代码逻辑
// @v1.1.2        2019-01-12 - Yandex浏览器版本18.11.1(安卓自2018年12月26日，版本号979)，切换竖屏会退出全屏状态，暂时取消竖屏模式，其他保持不变。不是该版本浏览器，有竖屏观看需要的可以安装本脚本历史版本1.1.1。
// @v1.2.1        2019-02-01 - 重写了一部分代码，使之使用更加人性化。重新添加竖屏观看模式。使用方法，摇一摇切换竖屏观看，再摇一摇可换回横屏观看(可调节灵敏度，SHAKE_THRESHOLD参数，越小越灵敏)。火狐浏览器(安卓)使用该版本，除了双击全屏，其他功能正常。
// @v1.2.2        2019-02-03 - 防止误操作，摇一摇调整为全屏下执行。
// @v1.2.3        2019-02-04 - 修复了摇一摇短时间内可能触发两次的问题。
// @v1.2.4        2019-02-09 - 修复了后加载视频，某些功能可能需要多次点击才能生效的问题。
// @v1.2.5        2019-02-13 - 调整视频标签查找逻辑和事件方法，添加了更新说明。
// ==/UserScript==
(function() {
    'use strict';
    var oriHway="landscape-primary",oriHgamma=0,oriHbeta=0,isLock=true;

    function orientationHandler(event) {
        oriHgamma=Math.round(event.gamma);
        oriHbeta=Math.abs(Math.round(event.beta));
        if((oriHbeta<45 && Math.abs(oriHgamma)>25) || (oriHbeta>135 && Math.abs(oriHgamma)>25)){
            oriHway=((oriHgamma>25 && oriHbeta<45) || (oriHgamma<-25 && oriHbeta>135)) ? "landscape-secondary" : "landscape-primary";
        }
        if(isLock){screen.orientation.lock(oriHway);}
    }

    var SHAKE_THRESHOLD = 18000;//摇一摇灵敏度，越小越灵敏
    var last_update = 0,diffTime=0,speed=0;
    var x=0, y=0, z=0, last_x = 0, last_y = 0, last_z = 0;
    var acceleration=null,curTime=null,cdTimer=null,isReady=true;
    function readyOK(){isReady=true;}

    function deviceMotionHandler(eventData) {
        if(document.webkitFullscreenElement && isReady){
            acceleration =eventData.accelerationIncludingGravity;
            curTime = new Date().getTime();
            if ((curTime-last_update)> 10) {
                diffTime = curTime -last_update;
                last_update = curTime;
                x = acceleration.x;
                y = acceleration.y;
                z = acceleration.z;
                speed = Math.abs(x +y + z - last_x - last_y - last_z) / diffTime * 10000;
                if (speed > SHAKE_THRESHOLD) {
                    clearTimeout(cdTimer);
                    if(isLock){
                        isLock=false;
                        screen.orientation.lock("portrait-primary");
                    }
                    else{
                        isLock=true;
                        screen.orientation.lock(oriHway);
                    }
                    isReady=false;
                    cdTimer=setTimeout(readyOK,1000);
                }
                last_x = x;
                last_y = y;
                last_z = z;
            }
        }
    }

    var videoEle=document.getElementsByTagName("video");
    var videoplay=null,vNum=0,vi=0;
    function setVideo(e){videoplay=this;}

    function dblfull(){
        if(videoplay!=null){
            if(document.webkitFullscreenElement){videoplay.webkitExitFullscreen();}
            else{videoplay.webkitRequestFullScreen();}
        }
    }

    function getVideoPlay() {
        if(videoEle.length>vNum){
            if(vNum==0){
                if (window.DeviceOrientationEvent) {window.addEventListener("deviceorientation", orientationHandler, false);}
                else{screen.orientation.lock(oriHway);}
                document.body.addEventListener("dblclick",dblfull,false);
                if (window.DeviceMotionEvent) {window.addEventListener('devicemotion',deviceMotionHandler,false);}
            }
            for(vi=0;vi<videoEle.length;vi++){
                videoEle[vi].addEventListener("playing",setVideo,false);
            }
            vNum=videoEle.length;
        }
    }

    setInterval(getVideoPlay,1000);
    
})();
