// ==UserScript==
// @name         知乎收藏显示答案链接
// @namespace    http://tampermonkey.net/
// @version      2
// @description  share answer from collection
// @author       l120
// @match        https://www.zhihu.com/collection/*
// @grant        none
// ==/UserScript==
var items = document.getElementsByClassName("zm-item")
var items_len=items.length
for(var i=0;i<items_len;i++){
    var item=items[i]
    if(item.getAttribute("data-type")=="Answer"){
        var dot = document.createElement("span")
        dot.innerText=" • "
        dot.setAttribute("class","zg-bull")
        var he=document.createElement("a")
        he.innerText="答案链接"
        he.setAttribute("href","https://zhihu.com"+item.children[1].children[0].children[0].getAttribute("href"))
        var inserlist=item.getElementsByClassName("zm-meta-panel")[0]
        inserlist.insertBefore(dot,inserlist.lastElementChild)
        inserlist.insertBefore(he,inserlist.lastElementChild)
    }
}
