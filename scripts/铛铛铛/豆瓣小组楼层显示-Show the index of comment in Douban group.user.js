// ==UserScript==
// @name         豆瓣小组楼层显示-Show the index of comment in Douban group
// @namespace    https://github.com/DragonCat1
// @version      0.0.1
// @license      MIT
// @description  用了之后Duang～豆瓣小组就能显示楼层了
// @author       铛铛铛铛铛/https://www.douban.com/people/48915223
// @copyright    1991-2018,铛铛铛铛铛-Dragoncat
// @match        https://www.douban.com/group/topic/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const style=`
#comments .comment-item:before{
content:attr(data-index);
position: absolute;
right: 12px;
bottom: 20px;
font-size: 24px;
font-style: italic;
color: #b4c1bb;
}
`
    const styleEle = document.createElement('style')
    styleEle.type='text/css'
    styleEle.innerHTML =style
    document.head.appendChild(styleEle)
    const allItems = document.querySelectorAll('#comments .comment-item')
    const urlqs = new URLSearchParams(location.search)
    const start = urlqs.get('start')-0||0
    allItems.forEach((ele,index)=>{
        ele.dataset.index=`#${start+index+1}`
    })

})();