// ==UserScript==
// @name         iTunes AppStore QR code
// @namespace    https://www.iplaysoft.com
// @version      0.81
// @description  Add QRCode to iTunes AppStore page.
// @author       X-Force
// @match        https://itunes.apple.com/*
// @grant        none
// @require      https://cdn.staticfile.org/qrious/4.0.2/qrious.min.js
// ==/UserScript==

(function() {
    var url = location.href.split('#')[0];
    //Story 下载标题图片
    var matchStory = url.match(/https?:\/\/itunes\.apple\.com\/.+?\/story\/id([0-9]+)/);
    if(matchStory!==null){
        var storyId = matchStory[1];
        console.log("dddd");
        var imgSrcset=document.getElementsByClassName("story__thumbnail")[0].children[0].srcset;
        if(imgSrcset!==null){
            var imgMatch=imgSrcset.match(/(https?:\/\/.+?.jpg)\s*/);
            if(imgMatch!==null && imgMatch[1]!==null){
                var imgUrl = imgMatch[1];
                imgUrl = imgUrl.replace(/\/(\d+)x(\d+)(\w+?)\.jpg/,"/0x3000$3.jpg");
                var myImgButton = document.createElement("div");
                myImgButton.innerHTML = '<a style="margin:20px auto;display:block" target="_blank" href="'+imgUrl+'">下载封面图片</a>';
                document.getElementsByClassName('story-header__cta')[0].appendChild(myImgButton);
            }
        }
    }
    //iTunes 页面增加 QR Code
    if(document.title.match("Mac App Store")==null && url.match("\/app\/")){
        var regex = /\/id([0-9]+)/;
        var match = url.match(regex);
        var id = null;
        if(match!==null){
            id = match[1];
        }
        if(id!==null){
            var xurl = "itmss://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id="+id+"&mt=8&at=10laHZ";
            var mydiv = document.createElement("div");
            var html = '<style>#xf_itunes_link{display: inline-block;padding: 8px 22px;background: #228fff;color: #fff;font-size: 16px;border-radius: 6px;}#xf_itunes_link:hover{text-decoration:none}</style>';
            html = html + '<a id="xf_itunes_link" href="'+xurl+'">在 iTunes 中查看</a>';
            html = html + '<canvas id="qrcode" style="position:absolute;right:2px;top:6px;width:270px;height:270px"></canvas>';
            mydiv.innerHTML = html;
            document.getElementsByClassName("product-header")[0].appendChild(mydiv);
            document.getElementsByClassName("product-hero")[0].style.position="relative";
            var qrious = new QRious({
                element: document.getElementById('qrcode'),
                value: url+'&at=10laHZ',
                size: 270
            });
            /* // @require https://greasyfork.org/scripts/373256-qrcode-js/code/QRCode-Js.js?version=636795
                var qrcode = new QRCode(document.getElementById("qrcode"), {
                text: url+'&at=10laHZ',
                width: 260,
                height: 260,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });*/

        }
    }
})();