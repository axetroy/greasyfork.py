// ==UserScript==
// @name           YinyuetaiH5
// @author         hyk
// @namespace      bengda@outlook.com
// @description    免积分，免登录，既可观看、下载高清MV
// @version        1.3.6
// @create         2016-03-28
// @include        http*://v.yinyuetai.com/video/*
// @copyright      2016+, hyk
// @grant		   GM_addStyle
// @grant		   GM_xmlhttpRequest
// @run-at         document-start
// @icon		   http://www.yinyuetai.com/favicon.ico
// ==/UserScript==
//======== start =================//
var Yyt = function () {
    var resResult = new RegExp(/http:\/\/v\.yinyuetai\.com\/video\/(\d+).*|http:\/\/v\.yinyuetai\.com\/video\/h5\/(\d+).*/, 'g').exec(window.location.href);
    this.Vid = resResult[1] || resResult[2];
    /*支持会员视频*/
    this.api = 'http://www.yinyuetai.com/insite/get-video-info?json=true&videoId=' + this.Vid;
    this.wrapper = '#Yyt_user_script_' + Date.now();
    setTimeout(function () {
        this.initView();
    }.bind(this), 1000);
    this.style();
};
Yyt.prototype.initView = function () {
    var $this = this;
    GM_xmlhttpRequest({
        url: $this.api,
        method: 'get',
        onload: function (y) {
            var r = JSON.parse(y.responseText);
            var aVideoUrlModels = r.videoInfo.coreVideoInfo.videoUrlModels;
            $this.data = aVideoUrlModels;
            var YytELe = document.createElement('p');
            var videoUrlEle = aVideoUrlModels.map(function (item, i) {
                return '<a href="' + item.videoUrl + '" class="vUrl vUrl_' + item.qualityLevel + '">' + item.qualityLevelName + '</a>';
            });
            YytELe.setAttribute('id', $this.wrapper.split('#') [1]);
            YytELe.innerHTML = '<div class="Yyt_user_script_wrapper">' + videoUrlEle.join('') + '</div>';
            document.getElementsByClassName("title-info")[0].appendChild(YytELe);
            $this.initEvent();
        }
    });
};
Yyt.prototype.initEvent = function () {
    var $this = this;
    var timer = null;
    var tickerCount = 0;
    timer = setInterval(function () {
        tickerCount++;
        if (unsafeWindow.$ || unsafeWindow.jQuery) {
            var $ = unsafeWindow.jQuery;
            var targetEle = $('#vPlay');
            if (targetEle.find('.vp-resolution-menu-ul li') && targetEle.find('.vp-resolution-menu-ul li').length > 0) {
                var sh = $this.data.filter(function (item) {return item.qualityLevel === 'sh'; });
                if (sh.length > 0) {
                    var shEle = $('<li data-url="' + (sh[0].videoUrl) + '" class="vp-resolution-menu-li" data-index="' + (targetEle.find('.vp-resolution-menu-ul li').length) + '"><span class="vp-resolution-menu-li-text">' + (sh[0].qualityLevelName) + '</span></li>');
                    targetEle.find('.vp-resolution-menu-ul').prepend(shEle);
                    targetEle.find('.vp-resolution-menu').css('top', '-' + (targetEle.find('.vp-resolution-menu-ul li').length * 30) + 'px');
                    document.querySelectorAll('.vp-resolution-menu-ul li') [0].addEventListener('click', function (e) {
                        var currentTime = document.querySelector('#video').currentTime;
                        targetEle.find('.vp-resolution-basebar-text').text($(this).text());
                        $('#video').attr('src', $(this).data('url'));
                        document.querySelector('#video').currentTime = currentTime;
                    });
                }
                targetEle.find('.vp-resolution-menu-ul li').first().trigger('click');
                clearInterval(timer);
            }
        }
        if (tickerCount >= 20) clearInterval(timer);
    }, 300);
};
Yyt.prototype.style = function () {
    var css = this.wrapper + '{font-size: 16px;width: 100%;height: 100%;background-color: #eee;}'
    + this.wrapper + ' .Yyt_user_script_wrapper{display: flex;font-size: 16px;width: 100%;height: 100%;background-color: #27d5bf;}'
    + this.wrapper + ' .Yyt_user_script_wrapper .vUrl{font-size: 1em;text-align: center;text-decoration: none;color: #222;line-height: 24px;border-right: 1px solid #444;flex: 1;}'
    + this.wrapper + ' .Yyt_user_script_wrapper .vUrl:last-child{border-right: none;}'
    + this.wrapper + ' .Yyt_user_script_wrapper .vUrlvisited{color: #666;}'
    + this.wrapper + ' .Yyt_user_script_wrapper .vUrl:hover{text-decoration: underline;color: #444;}';
    GM_addStyle(css);
};
new Yyt();