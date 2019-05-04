// ==UserScript==
// @name        baidu_netdisk_autoCodeInput|百度网盘自动登录
// @namespace   Chang_way_enjoying
// @description 在百度云盘的界面里自动填写密码
// @include     http://pan.baidu.com/share/init?*
// @include     http://yun.baidu.com/share/init?*
// @version     0.1.1_2016-05-19
// @grant       unsafeWindow
// @require     https://cdn.bootcss.com/jquery/2.2.3/jquery.min.js
// @run-at      document-start
// ==/UserScript==
$((function(){
    var re =  /^[a-z0-9]{4}$/i;     //
    var codeInput = '#accessCode';     //input
    var sb = '#submitBtn';      //
    var hash = location.hash.slice(1);
    if (hash && hash.length===4){
        $(codeInput).val(hash);
        $(sb).click();
    }else{
        if (msg_warning){
            msg_warning("没有查询到验证码");
        }
    }
}));