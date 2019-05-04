// ==UserScript==
// @name         虎牙免登换清晰度
// @namespace    http://tampermonkey.net/
// @version      0.31
// @description  虎牙免登陆切换清晰度,增加弹幕屏蔽关键词（在原屏蔽按钮后面）,直播页面按热度排序。
// @author       Hugo16
// @match        www.huya.com/*
// @grant        GM_addStyle
// @run-at       document-end
// @require      http://code.jquery.com/jquery-1.7.2.min.js
// @namespace    https://greasyfork.org/users/238424
// ==/UserScript==

(function () {
    'use strict';

    let nowIbitrate;
    takeNowIbitrate(false);
    setTimeout(() => {
        autoChange();
    }, 301e3);

    // 添加屏蔽界面
    var blockWordsWrap = $('<div class="block-mask-wrap"><div id="block-mask"></div><div id="blockWrap"><div id="bWtop"><input id="blockWord"/><button id="blockBtn">屏蔽</button></div><div id="wordsWrap"><ul></ul></div></div></div>');
    $("body").append(blockWordsWrap);
    blockWordsWrap.hide();
    var blockShowBtn = $("<i class='room-chat-tool room-chat-tool-blockWords' id='J_roomChatIconBlockWords1' title='免登录屏蔽'></i>");
    findElement("J_roomChatIconBlockWords",function(){
        $("#J_roomChatIconBlockWords").after(blockShowBtn);
        blockShowBtn.on("click",function(){
            blockWordsWrap.show();
        })
        $("#block-mask").on("click",function(){
            blockWordsWrap.hide();
        })
    })

    // 读取屏蔽词
    var blockWords = readBlockWords();
    // 添加屏蔽词
    $("#blockBtn").on("click",function(){
        var word = $("#blockWord").val().toLocaleUpperCase();
        if(word!=""){
            blockWords.push(word);
            $("#wordsWrap ul").append("<li><span class='keyWords'>"+word+"</span><span class='cancelBtn'>取消屏蔽<span></li>");
        }
        writeBlockWords(blockWords);
    });
    // 删除屏蔽词
    $("#wordsWrap ul").on("click","li span.cancelBtn",function(event){
        var target = $(event.target);
        var word = target.prev().text();
        target.parent().remove();
        blockWords = $.grep(blockWords, function(value) {
            return value != word;
        });
        writeBlockWords(blockWords);
    })


    // 检测新弹幕
    window.onload = function(){
        $("#danmudiv").bind("DOMNodeInserted", function(){
            var item = $(this).children("div:last");
            var text = item.children("span").text();
            if(compareStr(text,blockWords)){
                //item.remove();
                console.log(item.children("span").html(""))
            }
        });
    }

    // 热度排序
    sort();
})();

function takeNowIbitrate(notRecord) {
    if (document.querySelector("li[ibitrate='500']") !== null) {
        nowIbitrate = $('ul.player-videotype-list > li.on');
        changeEventRate(notRecord);
        return;
    }
    else {
        setTimeout(function () {
            takeNowIbitrate();
        }, 500);
    }
}

function autoChange() {
    setTimeout(() => {
        if (document.querySelector('#player-login-tip-wrap') != null) {
            $('#player-login-tip-wrap').remove();
            changeRate();
            takeNowIbitrate(true);
            changeEventLine();
            return;
        }
        else {
            autoChange();
        }
    }, 500);
}

function changeEventRate(notRecord) {
    $(".player-videotype-list li").click(function (e) {
        nowIbitrate = $(this);
        if (notRecord) {
            changeRate();
        }
    });
}

function changeEventLine() {
    $('.player-videoline-list li').on('click', () => {
        vplayer.vcore.reqBitRate(nowIbitrate.attr("iBitRate"), true);
        changeEventRate(true);
    })
}

function changeRate() {
    vplayer.vcore.reqBitRate(nowIbitrate.attr("iBitRate"), true);
    $('ul.player-videotype-list > li.on').removeClass('on');
    nowIbitrate.addClass('on');
    $('span.player-videotype-cur').text(nowIbitrate.text());
}



// 寻找元素
function findElement(name,func){
    if(document.getElementById(name)|| document.getElementsByClassName(name)){
        func();
    }
    else{
        setTimeout(function(){findDanmuDiv(func)},500);
    }
}

// 比较屏蔽词
function compareStr(str,strArr){
    for(var i=0;i<strArr.length;i++){
        if(str.toLocaleUpperCase().indexOf(strArr[i])>=0){
            console.log(strArr[i] + ":" + str);
            return true;
        }
    }
    return false;
}

// 读取屏蔽词
function readBlockWords(){
    var cookieIndex = document.cookie.indexOf('huyaBlock=')
    var words = [];
    // 读取屏蔽词
    if (cookieIndex>-1) {
        var star = document.cookie.indexOf('huyaBlock=')+10;
        var temp;
        if(document.cookie.indexOf(";",star)>-1){
            temp = document.cookie.slice(star, (document.cookie.indexOf(";",star)));
        }
        else{
            temp = document.cookie.slice(star);
        }
        if(temp!=""){
            words = temp.split(',');
        }
    }
    else {
        document.cookie = 'huyaBlock=';
    }
    for(var i=0;i<words.length;i++){
        $("#wordsWrap ul").append("<li><span class='keyWords'>"+words[i]+"</span><span class='cancelBtn'>取消屏蔽<span></li>");
    }
    return words;
}

// 写入屏蔽词
function writeBlockWords(blockWords){
    var words = blockWords.join(",");
    document.cookie = "huyaBlock="+words;
}

// 热度排序
function sort() {

    setTimeout(() => {
        let fHot = document.getElementsByClassName("js-num");
        if (fHot[0].innerHTML != "") {
            console.log(fHot);
            let lists = document.getElementById("js-live-list");
            if (!lists) {
                return;
            }

            let arr = new Array();

            let list = lists.children;
            for (let i = 0; i < list.length; i++) {
                let hot = list[i].getElementsByClassName("js-num")[0].innerText;
                if (hot.indexOf("万") != -1) {
                    hot = hot.replace(/万/, "") * 1 * 10000;
                }
                else if (hot.indexOf("亿") != -1) {
                    hot = hot.replace(/亿/, "") * 1 * 100000000;
                }
                arr.push([list[i], hot])
            }

            arr.sort(function (a, b) {
                return b[1] - a[1];
            })

            lists.innerHTML = "";
            for (let j = 0; j < arr.length; j++) {
                lists.appendChild(arr[j][0]);
            }
        }
        else {
            sort();
        }

    }, 10);

}


GM_addStyle(".block-mask-wrap { width: 100%; height: 100%;top:0;position:absolute;z-index:99999}"
            + "#block-mask { width: 100%; height: 100%; background: #000; opacity: .5;}"
            + "#blockWrap { width: 500px; height: 500px;top:50%;left:50%;margin:-250px 0 0 -250px; background: white;opacity:1; position: absolute; bottom: 0; border-top: 1px solid #80808042; padding: 10px;border-radius:3px; }"
            + "#bWtop { display: flex;height:30px;margin-bottom:3px}"
            + "#blockWord { width: 70%; margin-right: 3%;}"
            + "#blockBtn { width: 20%}"
            + "#wordsWrap { overflow: auto;height:calc(100% - 33px)}"
            + "#wordsWrap>ul>li { display: flex;height:35px;align-items: center;padding-left:3px;color:#808080b5;}"
            + "#wordsWrap>ul>li:nth-child(Odd) { background:#8080804f;}"
            + "#wordsWrap>ul>li:hover { background:#f49f0fb3;color:white;}"
            + "#wordsWrap>ul>li>span:nth-child(1) { width: 354px; margin-right: 15px;}"
            + "#wordsWrap>ul>li>span:nth-child(2) { width:20%;text-align:center;cursor:pointer}");