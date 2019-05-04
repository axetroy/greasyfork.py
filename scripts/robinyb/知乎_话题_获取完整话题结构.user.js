// ==UserScript==
// @name        知乎_话题_获取完整话题结构
// @namespace   zhihu
// @include     https://www.zhihu.com/topic/*/organize/entire
// @version     3
// @grant       none
// @description 知乎_话题_每隔1毫秒点击“加载更多”和“显示子话题”
// ==/UserScript==

function clickitem() {
    var items = document.getElementsByName("load");
    var i;
    var itemSel = 0;
    for (i = 0; i < items.length; i++) {
        if (itemSel === 0) {
            itemSel = items[i];
            continue;
        }
        if (itemSel.offsetLeft > items[i].offsetLeft) {
            itemSel = items[i];
            continue;
        } else if (itemSel.offsetLeft == items[i].offsetLeft){
            if (itemSel.text == "显示子话题" && items[i].text == "加载更多") {
                itemSel = items[i];
            }
        }
    }
    itemSel.click();
}
setInterval(clickitem, 1);