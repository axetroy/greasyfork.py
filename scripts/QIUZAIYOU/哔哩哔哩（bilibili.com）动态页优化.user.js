// ==UserScript==
// @name               哔哩哔哩（bilibili.com）动态页优化
// @namespace          http://asifadeaway.com/
// @version            0.61
// @icon               https://static.hdslb.com/images/favicon.ico
// @description        1.哔哩哔哩动态页导航样式优化。2.默认显示"投稿视频"内容。
// @author             QIUZAIYOU
// @match              http*://t.bilibili.com/*
// @grant              none
// @require            https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// ==/UserScript==
/*——默认显示"投稿视频"内容开始——*/
$(function () {
    $(".tab-bar .tab a").removeClass("selected");
    $(".tab-bar > div:nth-child(3) > a:nth-child(1)").addClass("selected");
    $(".tab-bar .line").css("transform", "translateX(172px)");
    var url = $(location).attr('href');
    var indexHtml='https://t.bilibili.com/pages/nav/index';
    var voteHtml=/https:\/\/t.bilibili.com\/vote\/h5\/index\/#\/result\?vote_id=.*/i;
    var lotteryHtml=/https:\/\/t.bilibili.com\/lottery\/h5\/index\/#\/result\?business_id=.*/i;
    function OpenDongTai() {
        if (url == indexHtml || voteHtml.test(url) || lotteryHtml.test(url) ){
            return false; //不影响BiliBili首页导航栏动态悬浮窗、动态页里投票及互动抽奖页内容显示
            }
            else if (url != 'https://t.bilibili.com/?tab=8') {
            window.location.href = "https://t.bilibili.com/?tab=8";
        }
        else {
            return false;
        }
    }
    OpenDongTai();
});
/*——默认显示"投稿视频"内容结束——*/

/*——横排样式开始——*/

//横排置顶样式且导航栏置顶显示
$(function () {
    var a = $('.tab-bar'),
        b = a.offset(),
        d = $('.tab-bar .tab'),
        e = $('.tab-bar .tab .tab-text'); //返回或设置导航栏相对于文档的偏移(位置)
    //加个屏幕滚动事件，c是滚动条相当于文档最顶端的距离
    $(document).on('scroll', function () {
        var c = $(document).scrollTop();
        //当滚动的屏幕距离大于等于导航栏本身离最顶端的距离时（判断条件）给它加样式
        if (b.top <= c) {
            d.css({
                textAlign: 'center',
                margin: '0 auto',
            });
            e.css('lineHeight', '40px');
            a.css({
                position: 'fixed',
                width: '632px',
                top: '0',
                margin: '0 auto',
                zIndex: '915049',
                height: '40px',
                lineHeight: '40px'
            });
        }
        else {
            d.css({
                margin: '',
                textAlign: ''
            });
            e.css('lineHeight', '');
            a.css({
                position: '',
                width: '',
                top: '',
                margin: '',
                zIndex: '',
                height: '',
                lineHeight: ''
            });
        }
    });

});
