// ==UserScript==
// @name         太平洋摄影部落及摄影论坛隐藏低分辨率图片
// @namespace    https://greasyfork.org/zh-CN/users/193133-pana
// @version      1.1
// @description  隐藏小于指定分辨率的图片
// @author       pana
// @include        http*://*.pconline.com.cn/photo/list_*
// @include        http*://*.pconline.com.cn/dc*
// @grant        none
// @require       https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    window.aMinWidth = 1920;
    window.aMinHeight = 1080;
    const old_url = location.href;
    var tipStr;
    var imgReady = (function() {
        var list = [];
        var intervalId = null;

        function tick() {
            for (let i = 0; i < list.length; i++) {
                list[i].end ? list.splice(i--, 1) : list[i]()
            }!list.length && stop()
        }
        function stop() {
            clearInterval(intervalId);
            intervalId = null
        }
        return function(url, ready, load, error) {
            var onReady, width, height, newWidth, newHeight;
            var img = new Image();
            img.src = url;
            if (img.complete) {
                load && load.call(img);
                return
            }
            width = img.width;
            height = img.height;
            img.onerror = function() {
                error && error.call(img);
                onReady.end = true;
                img = img.onload = img.onerror = null
            };
            onReady = function() {
                newWidth = img.width;
                newHeight = img.height;
                if (newWidth !== width || newHeight !== height) {
                    ready.call(img);
                    onReady.end = true;
                    img = img.onload = img.onerror = null;
                    load = false
                }
            };
            onReady();
            img.onload = function() {
                !onReady.end && onReady();
                load && load.call(img)
            };
            if (!onReady.end) {
                list.push(onReady);
                if (intervalId === null) {
                    intervalId = setInterval(tick, 40)
                }
            }
        }
    })();

    function hidePic(aWidth, aHeight, aCount) {
        if ($("div.picFrame").eq(aCount).css("display") !== 'none') {
            tipStr = '<p style="color:#B7B7B7">(该图片已隐藏。 Width: ' + aWidth + 'px, Height: ' + aHeight + 'px.)</p>';
            if ((aWidth !== 0) && (aWidth < window.aMinWidth)) {
                $("div.picFrame").eq(aCount).hide();
                $("div.picFrame").eq(aCount).after(tipStr)
            } else if ((aHeight !== 0) && (aHeight < window.aMinHeight)) {
                $("div.picFrame").eq(aCount).hide();
                $("div.picFrame").eq(aCount).after(tipStr)
            }
        }
    }
    function hideSpanPic(aSpanWidth, aSpanHeight, aSpanCount) {
        if ($(".post_main-pic").eq(aSpanCount).css("display") !== 'none') {
            tipStr = "(该图片已隐藏。 Width: " + aSpanWidth + "px, Height: " + aSpanHeight + "px.)";
            if ((aSpanWidth !== 0) && (aSpanWidth < window.aMinWidth)) {
                $(".post_main-pic").eq(aSpanCount).hide();
                $(".post_main-pic").eq(aSpanCount).before(tipStr)
            } else if ((aSpanHeight !== 0) && (aSpanHeight < window.aMinHeight)) {
                $(".post_main-pic").eq(aSpanCount).hide();
                $(".post_main-pic").eq(aSpanCount).before(tipStr)
            }
        }
    }
    function getOneImages(container, count) {
        let imgSrc = container.attr('oImg');
        imgReady(imgSrc, function() {
            hidePic(this.width, this.height, count)
        }, function() {
            hidePic(this.width, this.height, count)
        }, function() {
            console.log("加载错误")
        })
    }
    function getSpanImages(container, count) {
        let imgSpanSrc = container.attr("src2");
        if (imgSpanSrc === undefined) {
            imgSpanSrc = container.attr("src")
        }
        let switchReg = /_[^_]+\.(jpg|jpeg|png|bmp|gif)$/i;
        let switchNowReg = /_[^_]+\./i;
        let imgSwitchSrc = switchReg.exec(imgSpanSrc)[0];
        imgSwitchSrc = switchNowReg.exec(imgSwitchSrc)[0];
        let imgTrueSpanSrc = imgSpanSrc.replace(imgSwitchSrc, ".");
        imgReady(imgTrueSpanSrc, function() {
            hideSpanPic(this.width, this.height, count)
        }, function() {
            hideSpanPic(this.width, this.height, count)
        }, function() {
            console.log("加载错误")
        })
    }
    if (old_url.indexOf("dp.pconline.com.cn/photo/list_") !== -1) {
        let imgContainer = $(".aView");
        for (let i = 0; i < imgContainer.length; i++) {
            getOneImages(imgContainer.eq(i), i)
        }
    }
    if (old_url.indexOf("itbbs.pconline.com.cn/dc/") !== -1) {
        let imgSpan = $(".post_main-pic .LazyloadImg");
        for (let j = 0; j < imgSpan.length; j++) {
            getSpanImages(imgSpan.eq(j), j)
        }
    }
})();