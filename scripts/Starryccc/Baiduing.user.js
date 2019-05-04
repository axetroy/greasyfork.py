// ==UserScript==
// @name         Baiduing
// @namespace    Starry
// @version      1.8
// @description  替换百度首页背景为bing每日壁纸
// @author       Starry
// @grant        GM_xmlhttpRequest
// @connect      cn.bing.com
// @include      *://www.baidu.com/
// @include      *://www.baidu.com/home*
// @include      *://www.baidu.com/?tn=*
// @include      *://www.baidu.com/index.php*
// ==/UserScript==

(function() {
    'use strict';

    //工具栏 登录与未登录元素名称不同，分开处理
    if (document.getElementById("s_top_wrap")) {
        var isLogin = true;
        document.getElementById("s_top_wrap").style.background = "rgba(30,30,30,0.3)";
        document.getElementById("s_top_wrap").style.border = "none";
        document.getElementsByClassName("s_bri")[0].style.borderBottom = "none";
        document.getElementsByClassName("s-skin")[0].style.color = "#ddd";
        document.getElementsByClassName("s-msg")[0].style.color = "#ddd";
        document.getElementsByClassName("s-lite")[0].style.color = "#ddd";
        for (var i = 0; i<8; i++){
            document.getElementById("u_sp").children[i].style.color = "#ddd";
        }
    } else {
        try {
            document.getElementById("u1").style.background = "rgba(30,30,30,0.3)";
            document.getElementById("u1").style.marginTop = "0";
            document.getElementById("u1").style.height = "32px";
            for (var j = 0; j<6; j++){
                document.getElementsByClassName("mnav")[j].style.lineHeight = "32px";
                document.getElementsByClassName("mnav")[j].style.color = "#fff"
            }
            document.getElementsByClassName("lb")[1].style.lineHeight = "32px";
            document.getElementsByClassName("lb")[1].style.color = "#fff"
            document.getElementsByClassName("pf")[1].style.lineHeight = "32px";
            document.getElementsByClassName("pf")[1].style.color = "#fff"
            document.getElementsByClassName("bri")[0].style.marginRight = "0px";
            document.getElementsByClassName("bri")[0].style.right = "0px";
            document.getElementsByClassName("bri")[0].style.borderBottom = "none";
            document.getElementsByClassName("bri")[0].style.width = "86px";
            document.getElementsByClassName("bri")[0].style.height = "32px";
            document.getElementsByClassName("bri")[0].style.lineHeight = "32px";
        } catch (e) {
            console.log(e);
        }
    }

    //logo
    if (document.getElementById("s_lg_img")) {
        var logoSrc = document.getElementById("s_lg_img").src;
        var imgName = logoSrc.substring(logoSrc.lastIndexOf("/")+1,logoSrc.length); //从最后一个"/"号+1的位置开始截取字符串
        var imgType = imgName.toLowerCase().split('.');
        if ((imgType[1]) != "png"){
            document.getElementById("s_lg_img").src = "data:image/png;base64,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";
        }
    } else if (document.getElementsByClassName("index-logo-src")[0]){
        document.getElementsByClassName("index-logo-src")[0].src = "data:image/png;base64,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";
    }

    //搜索框
    if (document.getElementById("s_kw_wrap")) {
        document.getElementById("s_kw_wrap").style.opacity = "0.7";
    } else if (document.getElementsByClassName("s_ipt_wr")[0]){
        document.getElementsByClassName("s_ipt_wr")[0].style.opacity = "0.7";
    }

    //开启显示频道的背景色
    if (document.getElementById("s_mancard_main")) {
        document.getElementById("s_mancard_main").style.background = "#fff";
    }
    if (document.getElementById("s_menu_mine")) {
        document.getElementById("s_menu_mine").style.marginLeft = "-1px";
    }

    //按钮
    document.getElementById("su").style.borderBottom = "none";
    document.getElementById("su").style.boxShadow = "none";
    if (isLogin == true) {
        document.getElementById("su").style.height = "39px";
    }

    //历史记录框
    document.getElementById("kw").onclick = function(){
        setTimeout(function () {
            var historyBox = document.getElementsByClassName("bdsug bdsugbg")[0];
            if (historyBox){
                historyBox.style.background = "rgba(255, 255, 255, 0.7)";
                historyBox.style.border = "none";
                historyBox.style.boxShadow = "0px";
                historyBox.style.width = "532px"
                historyBox.style.marginLeft = "1px";
                historyBox.children[1].style.background = "none";
            }
        }, 100);
    }

    //隐藏底部信息
    if (document.getElementById("bottom_container")) {
        document.getElementById("bottom_container").style.display = "none";
    } else {
        try {
            document.getElementById("qrcode").style.display = "none";
            document.getElementById("ftCon").style.display = "none";
        } catch (e) {
            console.log(e);
        }
    }

    //获取Bing壁纸链接
    GM_xmlhttpRequest({
        method: 'GET',
        url: "http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&pid=hp&video=1&n=1",
        onload: function(result) {
            var jsonData = null;
            try {
                jsonData = JSON.parse(result.responseText);
                var imgUrl = jsonData.images[0].url;
                var bingText = jsonData.images[0].copyright;
                var bingBgImg = "https://cn.bing.com"+imgUrl;
                console.log("Bing壁纸链接：" + bingBgImg);
                document.body.style.background = "url(\""+bingBgImg+"\")";
                document.getElementById("bingBgText").innerHTML = bingText;
            }catch (e) {
                console.log(e);
            }
        }
    });

    /* 添加Bing图片的信息 */
    var infoDiv = document.createElement("div");
    infoDiv.style.height = "40px";
    infoDiv.style.width = "auto";
    infoDiv.style.bottom = "8px";
    infoDiv.style.position = "fixed";
    infoDiv.style.background = "rgba(30,30,30,0.5)";
    infoDiv.style.color = "#fff";
    infoDiv.style.textAlign = "left";
    infoDiv.style.lineHeight = "40px";
    infoDiv.id = "bingBgInfo";
    var element = document.getElementById("head");
    element.appendChild(infoDiv);

    var infoDiv2 = document.createElement("div");
    infoDiv2.style.height = "40px";
    infoDiv2.style.width = "8px";
    infoDiv2.style.background = "rgba(150, 150, 150, 0.6)";
    infoDiv2.style.position = "absolute";
    var element2 = document.getElementById("bingBgInfo");
    element2.appendChild(infoDiv2);

    var p = document.createElement("p");
    p.style.paddingLeft = "20px";
    p.style.paddingRight = "15px";
    p.style.fontSize = "16px";
    p.style.color= "rgba(220,220,220,0.8)";
    p.id = "bingBgText";
    var element3 = document.getElementById("bingBgInfo");
    element3.appendChild(p);
    /* 添加Bing图片的信息 */

    //还原样式

    var checkOninputState = true;
    var resetStyle = false;
    if (checkOninputState = true){
        document.getElementById("kw").oninput = function(){
            if (document.getElementById("s_top_wrap")) {
                if (window.getComputedStyle(document.getElementById("s_top_wrap")).display == "none") {
                    resStyle();
                }
            } else if (window.getComputedStyle(document.getElementById("u1")).display == "none") {
                resStyle();
            }
            checkOninputState = false;
        }
    }

    function resStyle(){
        if (document.getElementById("s_kw_wrap")) {
            document.getElementById("s_kw_wrap").style.opacity = "1";
        }
        document.getElementById("bingBgInfo").style.display = "none";
        document.body.style.background = "none";
        if (document.getElementsByClassName("bdsug bdsugbg")[0]){
            document.getElementsByClassName("bdsug bdsugbg")[0].style.cssText = "background:#fff;border:1px solid #ccc;width:535;margin_left:0px";
        }
        document.getElementById("su").style.height = "34px";
    }

})();