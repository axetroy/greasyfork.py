// ==UserScript==
// @name         神社御所老司机
// @namespace    http://www.ocrosoft.com/?p=1005
// @version      1.4
// @description  "老司机传说"-基础版。
// @author       ocrosoft
// @match        https://blog.reimu.net/*
// @match        *://*.hacg.li/*
// @match        *://*.hacg.lol/*
// @match        *://*.hacg.red/*
// @match        *://*.hacg.fi/*
// @icon         http://www.ocrosoft.com/lsj.png
// @require      http://code.jquery.com/jquery-2.1.4.min.js
// @grant        unsafeWindow
// ==/UserScript==
unsafeWindow.eve = Event;
function addattention(){//添加提示，建议升级到老司机传说
    var dv = document.createElement("div");
    dv.innerHTML = '您可能错误安装了"老司机传说"的精简版，请点击此处升级，升级完成后删除/关闭本脚本。\n若实在不想升级并体验更多功能请到代码中删除提示。';
    dv.style.background="#59c3db";dv.style.position="fixed";dv.style.heght=50;
    dv.style.zIndex=99999;dv.style.textAlign="center";dv.id="attention";
    dv.style.color="#fff";dv.style.cursor="pointer";
    var page = document.getElementsByTagName("header")[0];
    if(location.href.indexOf('hacg')==-1)page = document.getElementsByTagName("body")[0];
    page.insertBefore(dv,page.firstChild);
    $("#attention").click(function () {
        window.open("https://greasyfork.org/scripts/22747-%E8%80%81%E5%8F%B8%E6%9C%BA%E4%BC%A0%E8%AF%B4/code/%E8%80%81%E5%8F%B8%E6%9C%BA%E4%BC%A0%E8%AF%B4.user.js");
        $("#attention").remove();
    });
    document.getElementById("attention").style.width=page.offsetWidth+"px";
}
(function() {
    var href=location.href;
    addattention();//如果实在不想升级，删除这行就不会提示了。！！！！！！！
    if(href.indexOf('hacg')==-1){
        var pre = document.getElementsByTagName('pre');
        for(var rmi=0;rmi<pre.length;rmi++)
            if (pre[rmi]) pre[rmi].style.display = 'block';
    }
    else{
        var aaa=$(".entry-title a");
        for(var j=0;j<aaa.length;j++){
            var ax=aaa[j];
            var dir=ax.href.indexOf(':');
            ax.href="https"+ax.href.substring(dir);
        }
        var toogle = document.getElementsByClassName('toggle-box')[0];
        if (toogle) toogle.style.display = 'block';
        var oldDriver = document.getElementsByClassName('entry-content')[0];
        var childDriver = oldDriver.childNodes;
        for (var i = childDriver.length - 1; i >= 0; i--){
            var takeMe = childDriver[i].textContent.match(/(\w{40})|(([A-Za-z0-9]{2,39})( ?)[\u4e00-\u9fa5 ]{2,}( ?)+(\w{2,37})\b)/g);
            if (takeMe){
                for (j = 0; j < takeMe.length; ++j){
                    //console.log(takeMe[j]);
                    var has = takeMe[j].toString().replace(/(\s|[\u4e00-\u9fa5])+/g, '').trim();
                    if (has.length >= 40){
                        var fuel = "<a href='magnet:?xt=urn:btih:" + has + "'>老司机链接</a>"+"("+has+")";
                        childDriver[i].innerHTML = childDriver[i].innerHTML.toString().replace(takeMe[j], fuel);
                    }
                }
            }
        }
    }
})();