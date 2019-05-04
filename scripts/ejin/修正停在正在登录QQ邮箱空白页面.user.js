// ==UserScript==
// @name       修正停在正在登录QQ邮箱空白页面
// @namespace   6abad3515bdbc777c8aca122353cdbee
// @version    2017.9.18
// @description  从QQ面板进入QQ邮箱，不知何故常常停在正在登录QQ邮箱的白屏页面
// @match      https://mail.qq.com/cgi-bin/login?*&Fun=clientread*
// ==/UserScript==
 
(function () {
        var scriptstr=document.getElementsByTagName("script")[1].text;
        var restr=" + parent.getSid()";
        if ( document.title="妈拉个逼的正在登录QQ邮箱" && scriptstr.indexOf(restr) != -1 ){
                // 记录最近出现问题的时间
				localStorage.LastErrorDate=new Date().getDate();
				eval(scriptstr.replace(restr,""));
        }
})()