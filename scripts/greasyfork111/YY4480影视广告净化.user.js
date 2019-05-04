// ==UserScript==
// @name         YY4480影视广告净化
// @namespace    http://tampermonkey.net/
// @version      1.8
// @description  去除YY4480影视广告
// @author       laohu
// @match        http://aaqqy.com/
// @match        http://aaxxy.com/*
// @match        http://aayyc.com/*
// @match        http://aaccy.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

var detailUrls = ["aaxxy.com", "aayyc.com", "aaccy.com"];
(function() {
    'use strict';
    clearAdvert();
    var t = setInterval(function () {
        clearAdvert();
    }, 50);

    function addHomeFrameOnLoadListener() {
        var iframe = document.querySelector(".warp .content iframe");
        if (iframe.attachEvent){
            iframe.attachEvent("onload", function(){
                clearRightUnuseUIModule(iframe.contentDocument);
            });
        } else {
            iframe.onload = function(){
                clearRightUnuseUIModule(iframe.contentDocument);
            };
        }
    }

    function clearAdvert() {
        if("aaqqy.com" == document.domain) {
            addHomeFrameOnLoadListener();
            clearHomeAdverts();
        } else if(detailUrls.indexOf(document.domain) != -1) {
            clearVideoDetailAdverts();
        }
    }

    function clearHomeAdverts() {
        if(document.body == null) {
            return;
        }
        var menu = document.body.children
        if(menu) {
            var dels = [];
            for(var i = 0; i < menu.length; i++) {
                var child = menu[i];
                if(child.nodeName == "SCRIPT") {
                    continue;
                }
                if(child.nodeName == "DIV" && (child.className === "menu" || child.className === "warp")) {
                    continue;
                }
                dels.push(child);
            }
            for(var j = 0; j < dels.length; j++) {
                dels[j].remove();
            }
        }
    }

    function clearRightUnuseUIModule(iframeDocument) {
        if(iframeDocument.body == null) {
            return;
        }
        var children = iframeDocument.body.children;
        var dels = [];
        for(var i = 0; i < children.length; i++) {
            var child = children[i];
            if(child.nodeName == "IFRAME" && child.src.indexOf("http://") != -1) {
                continue;
            }
            dels.push(child);
        }
        for(var j = 0; j < dels.length; j++) {
            dels[j].remove();
        }
    }

    function clearVideoDetailAdverts() {
        if(document.body == null) {
            return;
        }
        var children = document.body.children;
        var dels = [];
        for(var i = 0; i < children.length; i++) {
            var child = children[i];
            if(child.nodeName == "DIV" && child.id == "play-focus") {
                var flashDiv = child.querySelectorAll(".box");
                for(var f = 0; f < flashDiv.length; f++) {
                    flashDiv[f].remove();
                }
                continue;
            }
            if(child.nodeName == "DIV" && child.id == "header") {
                var skin = child.querySelector("#skin");
                var sign = child.querySelector("#sign");
                if(skin) skin.remove();
                if(sign) sign.remove();
                continue;
            }
            if(child.nodeName == "DIV" && (child.className == "ui-sponsor" || child.id == "content")) {
                var flashFrames = child.querySelectorAll("iframe");
                for(f = 0; f < flashFrames.length; f++) {
                    flashFrames[f].parentNode.remove();
                }
                var rates = child.querySelectorAll(".rating-box");
                for(f = 0; f < rates.length; f++) {
                    rates[f].remove();
                }
                var linksFocus = child.querySelector("#links-focus");
                var footer = child.querySelector(".footer");
                if(linksFocus) linksFocus.remove();
                if(footer) footer.remove();
                continue;
            }
            dels.push(child);
        }
        for(var j = 0; j < dels.length; j++) {
            dels[j].remove();
        }
    }
})();





