// ==UserScript==
// @name		视频VIP替换
// @namespace	http://tampermonkey.net/
// @version		1.2
// @description	直接在视频页查看会员视频
// @author		You
// @match		*.iqiyi.com/v*
// @grant		none
// @run-at		document-start
// @require		https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    // 替换播放器
    function replace_original_player() {
        console.log('ready to replace');
        // 生成替换源
        var current_url = window.location.href;
        var request_url = '<iframe id="play_iframe" allowfullscreen="true" ' +
			'style="background-color: #dff0d8;" width="100%" height="100%" ' +
			'allowtransparency="true" frameborder="0" scrolling="no" ' +
			'src="http://api.baiyug.cn/vip/index.php?url=' + current_url + '"></iframe>';
		console.log(request_url);
		$('div.pw-video').empty().html(request_url);
        $(".J_play-underFrame").remove();
        $(".topNavWrap-player-tv").remove();
        $(".wrapper").remove();
        $(".footerN1214").remove();
    };

    function sleep(numberMillis) {
        var now = new Date();
        var exitTime = now.getTime() + numberMillis;
        while (true) {
            now = new Date();
            if (now.getTime() > exitTime)
                return;
        }
    }


    function clear_html(){
        $(".J_play-underFrame").remove();
        $(".topNavWrap-player-tv").remove();
        $(".wrapper").remove();
        $(".footerN1214").remove();
        $("body").css("background-color", "#292929");
        $('div.playerMain_bg').css("margin-top", "100px");
        var c = $(".vipFloatbgCls").length;      
        console.log(c);
        if(c == 1){
            $(".vipFloatbgCls").parent().remove();
        } else {
            setTimeout(function(){
                clear_html();
            }, 1000);
        }
    }

    setTimeout(function(){
		replace_original_player();
	}, 1000);

    setTimeout(function(){
		clear_html();
	}, 1000);



})();