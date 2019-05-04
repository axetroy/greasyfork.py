// ==UserScript==
// @name         豆瓣小组话题快速预览-douban group topic fast preview
// @namespace    https://github.com/DragonCat1
// @version      0.5.5
// @license      MIT
// @description  可以在豆瓣小组列表页面快速预览帖子内容，无须再打开新窗口
// @author       铛铛铛铛铛/https://www.douban.com/people/48915223
// @copyright    1991-2018,铛铛铛铛铛-Dragoncat
// @match        https://www.douban.com/group/*
// @exclude      https://www.douban.com/group/*/new_topic
// @exclude      https://www.douban.com/group/people/*/
// @exclude      https://www.douban.com/group/people/*/joins
// @exclude      https://www.douban.com/group/explore*
// @exclude      https://www.douban.com/group/search*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    const isTopicPage = location.pathname.match(/\/group\/topic/)
    const style = document.createElement("style")
    style.type = "text/css"
    if(!isTopicPage){
        style.innerHTML = `
::-webkit-scrollbar {
width: 10px;
height: 10px;
}
::-webkit-scrollbar-thumb {
background: #656565;
box-shadow: inset 0 0 5px rgba(0,0,0,.1);
}
::-webkit-scrollbar-thumb:hover {
background: #323232;
}
::-webkit-scrollbar-track {
background: #ededed;
box-shadow: inset 0 0 5px rgba(0,0,0,.1);
}
a:visited {
    color: #666;
}
a:hover {
    color: #fff;
}
#wrapper{
margin:0;
width: 100%;
box-sizing: border-box;
}
#group-info .group-desc {
    width: auto;
}
table.olt tr:not(.th):hover,table.olt tr:not(.th).active{
cursor: pointer;
background: #ffe2cd;
}
.grid-16-8 .article{
padding-right: 10px;

}
#iframe-wrapper{
width: -webkit-fill-available;
height: -webkit-fill-available;
margin:0 305px 0 686px;
top:0;
}
#priview{
width: -webkit-fill-available;
height: -webkit-fill-available;
background: #fefefe;
border: none;
box-shadow: 0 0 2px #00000038;
}
`
        document.head.appendChild(style)
        const grid = document.querySelector('.grid-16-8')
        const article = document.querySelector('.article')
        const iframe = document.createElement("iframe")
        const iframeWrapper = document.createElement("div")
        const trs = document.querySelectorAll('table.olt tr:not(.th)')
        let timer
        let prevTr
        iframeWrapper.id = "iframe-wrapper"
        iframe.srcdoc = '<style>p{color:#bbb;font-style:italic;font-size:12px;}a{color: #0f959d;text-decoration: none;}a:hover{color:red;}</style><p>/*话题快速预览 © <a href="https://www.douban.com/people/48915223/">铛铛铛铛铛</a>*/</p><p>Tips:<br/>因为豆瓣的原因，在预览里发表回应不会刷新页面，但实际是发表成功的</p>'
        iframe.id = "priview"
        iframe.sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-modals"
        iframeWrapper.appendChild(iframe)
        grid.insertBefore(iframeWrapper, document.querySelector('.extra'))
        trs.forEach(tr => {
            //tr.onmouseenter = function () {
            //   changeClass(tr)
            //    if(timer) clearTimeout(timer)
            //    timer = setTimeout(()=>{
            //       loadContent(tr)
            //     },100)
            // }
            tr.onclick = function () {
                changeClass(tr)
                loadContent(tr)
            }
        })
        article.tabIndex=1
        article.addEventListener("keydown",e=>{
            if([38,40].includes(e.keyCode)){
                e.preventDefault()
                const curTr = document.querySelector('table.olt tr:not(.th).active') || document.querySelector('table.olt tr:not(.th)')
                let nextTr
                if(e.keyCode===38){
                    nextTr = curTr.previousElementSibling || curTr
                }
                else if(e.keyCode===40){
                    nextTr = curTr.nextElementSibling || curTr

                }
                changeClass(nextTr)
                loadContent(nextTr)
            }

        })
        window.addEventListener("scroll", function () {
            changepos()
        })
        changepos()
        function changeClass(tr){
            if (prevTr) prevTr.classList.remove('active')
            prevTr = tr
            tr.classList.add('active')
        }
        function loadContent(tr){
            iframe.removeAttribute('srcdoc')
            iframe.src = tr.querySelector('a').href
        }
        function changepos() {
            if (document.documentElement.scrollTop > document.querySelector(".article").offsetTop) {
                iframeWrapper.style.position = "fixed"
            }
            else {
                iframeWrapper.style.position = "relative"
            }
        }
    }
    else{
        style.innerHTML = `
::-webkit-scrollbar {
width: 10px;
height: 10px;
}
::-webkit-scrollbar-thumb {
background: #656565;
box-shadow: inset 0 0 5px rgba(0,0,0,.1);
}
::-webkit-scrollbar-thumb:hover {
background: #323232;
}
::-webkit-scrollbar-track {
background: #ededed;
box-shadow: inset 0 0 5px rgba(0,0,0,.1);
}
`
        document.head.appendChild(style)
    }
})();
