// ==UserScript==
// @name         优书网刷屏用户屏蔽脚本
// @namespace    http://www.lkong.net/home.php?mod=space&uid=516696
// @version      0.1
// @description  如果有用户在小说评论页面使用“待看”、“mark”、“未看”等毫无营养的词大量刷屏，就可以复制他的ID到屏蔽词列表屏蔽他。
// @author       仙圣
// @match        *://www.yousuu.com/comments*
// @include      *://www.yousuu.com/comments*
// @icon         http://www.yousuu.com/favicon.ico
// ==/UserScript==


(function(){
//屏蔽词列表。
//屏蔽词的双引号为英文半角引号，逗号也是，请勿忘记加逗号。
    var blackList = [
        "franklin223",
    ];

    var target = document.querySelectorAll("li.ys-comments-left");
    console.log("优书网刷屏用户屏蔽:");

    for (var i = 0;i < target.length; i++){
        if (target[i].querySelectorAll("h5.media-heading>a")[0] != null){
            var node = target[i].querySelectorAll("h5.media-heading>a")[0];

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