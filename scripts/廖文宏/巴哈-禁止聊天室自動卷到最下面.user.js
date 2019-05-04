// ==UserScript==
// @name        巴哈-禁止聊天室自動卷到最下面
// @namespace   巴哈-禁止聊天室自動卷到最下面
// @include     https://haha.gamer.com.tw*
// @version     1.00
// @grant       none
// @description:zh-tw 巴哈-禁止聊天室自動卷到最下面.
// ==/UserScript==

/*
 *
 * 說明：禁止巴哈姆特電腦版的哈哈姆特聊天室，有人回覆就自動卷到最下面的現象
 * 作者：hbl917070（深海異音）
 * 最後修改日期：2017-10-25
 * 作者小屋：https://home.gamer.com.tw/homeindex.php?owner=hbl917070
 *
 */



var style_48763 = document.createElement("style");
style_48763.innerHTML=`
.message-scoller{
    overflow-y: initial !important;
    height: initial !important;
}
.message-content{
    overflow-y: auto !important;
}
#message-scoller_forum{
    overflow-y: initial !important;
    height: initial !important;
}
`;
document.body.appendChild(style_48763);

