// ==UserScript==
// @name         优书网傻逼屏蔽
// @namespace    http://www.lkong.net/home.php?mod=space&uid=516696
// @version      0.1
// @description  屏蔽傻逼
// @author       仙圣
// @match        *://www.yousuu.com/book/*
// @include      *://www.yousuu.com/book/*
// @icon         http://www.yousuu.com/favicon.ico
// ==/UserScript==


(function(){
//屏蔽词列表。
//屏蔽词的双引号为英文半角引号，逗号也是，请勿忘记加逗号。
    var blackList = [
       "我有一只哈士奇",

    ];

    var target = document.querySelectorAll("div.col-sm-6");
    console.log("屏蔽傻逼:");

    for (var i = 0;i < target.length; i++){
        if (target[i].querySelectorAll("span.media-heading")[0] != null){
            var node = target[i].querySelectorAll("span.media-heading")[0];

            for (var j = 0 ;j < blackList.length; j++){
                //用户名在黑名单中则删掉
                if (node.innerHTML.indexOf(blackList[j]) > -1){
                    target[i].remove();
                    console.log(node);
                }
            }
        }
    }

})();