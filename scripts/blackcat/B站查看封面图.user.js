// ==UserScript==
// @name         B站查看封面图
// @namespace    http://tampermonkey.net/
// @version      0.2.8
// @description  添加了一个可查看当前视频页面封面图的按钮，默认是透明的，鼠标移动上去便可显现出来，位置在首页那一栏与视频标题那一栏中间的空白处的左侧位置
// @author       Blackcat
// @include      *://www.bilibili.com/video/av*
// @include      *://bangumi.bilibili.com/anime/*
// @include      *://www.bilibili.com/bangumi/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    if (!window.jQuery) {
        // 若还未加载jQuery, 则监听
        var jQuery;
        Object.defineProperty(window, 'jQuery', {
            configurable: true, enumerable: true, set: function set(v) {
                jQuery = v;
                mainCover(); // 设置jQuery后, 立即注入
            }, get: function get() {
                return jQuery;
            }
        });
    } else {
        mainCover();
    }

    function mainCover() {
        $(function () {
            if ($('.cover_image').length == "0") {
                //判断是否为番剧页面（无封面图片标签）
                //2018更新，部分普通(非番剧)页面也没有图片标签
                if ($("meta[itemprop=\"image\"]").length !== 0) {
                    console.log("itemprop");
                    var imageurl = $("meta[itemprop=\"image\"]").attr("content");
                    imageurl = isHttpsImg(imageurl);
                    console.log(imageurl);
                    var img = $('<img src=' + imageurl + ' class=\'cover_image\'>');
                    $('body').append(img);
                    if (window.location.host === "www.bilibili.com") {
                        coverImg($('body'));
                    } else {
                        //bangumi.bilibili.com
                        coverImg($('body'));
                    }
                    return;
                } else if ($("meta[property=\"og:image\"]").length !== 0) {
                    console.log("property");
                    var imageurl = $("meta[property=\"og:image\"]").attr("content");
                    imageurl = isHttpsImg(imageurl);
                    console.log(imageurl);
                    var imgp = $('<img src=' + imageurl + ' class=\'cover_image\'>');
                    $('body').append(imgp);
                    if (window.location.host === "www.bilibili.com") {
                        coverImg($('body'));
                    } else {
                        //bangumi.bilibili.com
                        coverImg($('body'));
                    }
                    return;
                }
                //end
                var bangumiId;
                if (window.location.host === "www.bilibili.com") {
                    if (window.location.hash === "") {
                        bangumiId = window.location.pathname.replace(/[^0-9]+/g, '');
                    } else {
                        bangumiId = window.location.hash.replace(/[^0-9]+/g, '');
                    }
                } else {
                    bangumiId = location.hash.replace(/[^0-9]+/g, '');
                }
                //console.log(bangumiId);
                //获取番剧ID（非视频ID）
                if (!bangumiId) {
                    //不存在番剧视频ID时（番剧介绍页面）返回
                    return;
                }
                console.log("接口：" + 'https://bangumi.bilibili.com/web_api/episode/' + bangumiId + '.json');
                $.ajax({
                    url: 'https://bangumi.bilibili.com/web_api/episode/' + bangumiId + '.json',
                    type: 'GET',
                    dataType: 'json',
                    success: function success(data) {
                        var coverUrl = data.result.currentEpisode.cover; //获取封面图图片地址
                        coverUrl = isHttpsImg(coverUrl);
                        console.log(coverUrl);
                        var img = $('<img src=' + coverUrl + ' class=\'cover_image\'>'); //创建封面图标签
                        $('body').append(img);
                        if (window.location.host === "www.bilibili.com") {
                            coverImg($('body'));
                        } else {
                            //bangumi.bilibili.com
                            coverImg($('body'));
                        }
                    },
                    error: function error(data) {
                        console.log("请求发生错误", data);
                    }
                });
            } else {
                console.log("已有");
                coverImg($('body'));
            }
        });
    }

    function coverImg(obj) {
        $('.cover_image').css({ //设置封面图样式，属性与事件
            "position": "absolute",
            'left': '20px',
            'top': '260px',
            'height': '150px',
            'z-index': '1000',
            'display': 'none',
            'cursor': 'pointer'
        }).attr({
            'title': '点击在新页面中查看原图'
        }).bind({
            'click': function click() {
                window.open($(this).attr('src'));
            }
        });
        //var url=$('.cover_image').eq(0).attr('src');    //获取封面图图片地址
        var imgbtn = $('<div class="imgbtn">\u5C01\u9762\u56FE\u7247\u663E\u793A</div>'); //创建按钮
        imgbtn.css({ //设置按钮样式与事件
            "position": "absolute",
            'left': '20px',
            'top': '230px',
            'color': '#fff',
            'background': 'pink',
            'height': '24',
            'width': '120',
            'text-align': 'center',
            'line-height': '24px',
            'cursor': 'pointer',
            'border-radius': '12px',
            'z-index': '10000',
            'user-select': 'none',
            'opacity': '0'
        }).bind({
            'click': function click() {
                if ($('.cover_image').css('display') == 'none') {
                    $('.cover_image').css('display', 'block');
                    $(this).html('封面图片显示');
                } else {
                    $('.cover_image').css('display', 'none');
                    $(this).html('封面图片隐藏');
                }
            },
            'mouseenter': function mouseenter() {
                $(this).css({
                    'opacity': '1'
                });
            },
            'mouseleave': function mouseleave() {
                if ($('.cover_image').css('display') == 'none') {
                    $(this).css({
                        'opacity': '0'
                    });
                }
            }
        });
        obj.append(imgbtn);
    }

    //
    //判断https图片是否存在,存在返回https的链接避免混合内容
    function isHttpsImg(pathImg) {
        //先判断B站返回的图片链接是否为相对路径
        if (pathImg.substr(0, 4) !== "http") {
            return pathImg; //相对链接直接返回
        }
        //绝对路径
        if (pathImg.substr(0, 5) !== "https") {
            //不是https协议
            var httpsUrl = "https" + pathImg.substr(4);
            var xmlHttp;
            if (window.ActiveXObject) {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            } else if (window.XMLHttpRequest) {
                xmlHttp = new XMLHttpRequest();
            }
            xmlHttp.open("Get", httpsUrl, false);
            xmlHttp.send();
            if (xmlHttp.status === 404) {
                //不存在，返回原链接
                console.log("http");
                return pathImg;
            } else {
                //存在
                console.log("https");
                return httpsUrl;
            }
        }
        //是https直接返回
        return pathImg;
    }
    // Your code here...
})();