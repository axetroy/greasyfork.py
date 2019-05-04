// ==UserScript==
// @name         防掉线刷新助手
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  定期ajax刷新你的网页，防止你被session过期掉线。如果你登录的系统session过期很快，那么这将是神器。
// @author       lnwazg
// @match        *://*/*
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    var url = location.href;
    console.log("[LoginOnlinePlugin "+curentTime()+"] "+url+" 防掉线外挂已启用！");
    
    function get(url){
        console.log("[LoginOnlinePlugin "+curentTime()+"] request url="+url);
        var xmlHttpReq = null;
        if (window.ActiveXObject){
            xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }else if (window.XMLHttpRequest){
            xmlHttpReq = new XMLHttpRequest();
        }
        xmlHttpReq.open("GET", url, true);
        xmlHttpReq.onreadystatechange = function(){
            if (xmlHttpReq.readyState == 4)
            {
                if (xmlHttpReq.status == 200)
                {
                    var result = xmlHttpReq.responseText;
                    console.log("[LoginOnlinePlugin "+curentTime()+"] 刷新成功！")
                }
            }
        };
        xmlHttpReq.send(null);
    }
    //对global的污染会造成奇怪的问题，因此千万不要随意为global的prototype增删方法
    //作为辅助插件，更要有这样的职业操守。
    function curentTime()
    {
        return new Date().toLocaleString();
    }
    var interval = 1000 * 120; //刷新间隔
    var req = function(){get(url);}
    setInterval(req, interval);
})();