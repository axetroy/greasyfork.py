// ==UserScript==
// @name         URL-Preview
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  链接预览,支持站内预览 支持谷歌、国内外大部分视频、社交网站 不支持豆瓣、推特、知乎、苹果
// @author       papipapipia<suningyo@gmail.com>
// @match        http://*/*
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    var style = {
        top:150,//顶部
        right:0,//右边 如果要左边可以 left:0,
        height:600,//高度
        width:700//宽度
    };
    //不清楚怎么改就不要动它

    function wUrl(url)
    {
        var urlItem = [
            "taobao.com",
            "jd.com",
            "tudou.com",
            "youku.com",
            "v.qq.com",
            "www.iqiyi.com",
            "www.sohu.com",
            "weibo.com",
            "www.bilibili.com",
            "zhidao.baidu.com",
            "tieba.baidu.com"
        ];
        urlItem.forEach(function(a){
            if(url.match(a) != null) url = url.replace(/http:\/\//, "https://");
        });
        return url;
    }
    //这里放支持https但搜索引擎抓的还是http的域名(部分),可以评论提交域名我会定时更新

    function bUrl(url)
    {
        var b;
        var urlItem = [
            "zhihu.com",
            "douban.com",
            "google.",
            "icloud.com",
            "apple.com",
            "github.com"
        ];
        urlItem.forEach(function(a){
            if(url.match(a) != null) b = 1;
        });
        return b;
    }
    //这里放会跳出/不支持iframe的域名

    function show_confirm(title,url)
    {
        var r = confirm("标题:" + title + "\n链接:" + url + "\n不支持预览,点击确定在新窗口打开");
        if (r == true)
        {
            window.open(url);
        }
    }

    function newBox()
    {
        var nav = document.getElementsByTagName("body")[0];
        var newLink = document.createElement('iframe');
        newLink.setAttribute("class","Preview-Box");
        newLink.setAttribute("style","right: " + style.right + "px;display: none;position: fixed;top: " + style.top + "px;z-index: 999;border: 0;height: " + style.height + "px;width: " + style.width + "px;");
        nav.appendChild(newLink);
    }
    newBox();

    var showBox = document.querySelector(".Preview-Box");
    function Preview(value, index, ar)
    {
        var valueUrl = value.href;
        var httpsUrl = wUrl(valueUrl);
        if(httpsUrl) valueUrl = httpsUrl;
        var valueText = value.innerText;
        var valueIndex = valueUrl.match(/https:\/\/(.*?)/g);
        if(valueText && valueUrl && valueIndex != null && valueUrl != "#")
        {
            //console.log(valueUrl);
            if(valueText.length > 5)
            {//用来预览搜索引擎的结果还是很方便的 但只支持https
                var vUrl = bUrl(valueUrl);
                if(vUrl != 1)
                {
                    value.innerHTML = "<img src='https://piccdn.freejishu.com/images/2017/08/21/qeZaI.png' height='15' width='15' />" + valueText;
                }
                value.addEventListener('mouseover', function(){
                    //console.log(valueUrl);
                    if(vUrl == 1)
                    {
                        if(window.location.host.indexOf("google.") > -1) show_confirm(valueText,valueUrl);
                    }
                    else
                    {
                        showBox.style.display = "";
                        if(valueUrl != showBox.src) showBox.src = valueUrl;
                    }
                }, false);

                showBox.addEventListener('mouseout', function(){
                    showBox.style.display = "none";
                    showBox.sandbox = "allow-scripts";
                    showBox.security = "";
                }, false);
            }
        }
    }
    //不是不想写写百度的 是百度的搜索结果太*****懒得写

    var allhref = document.getElementsByTagName("a");
    var a = Array.prototype.slice.call(allhref);
    a.forEach(Preview);
})();