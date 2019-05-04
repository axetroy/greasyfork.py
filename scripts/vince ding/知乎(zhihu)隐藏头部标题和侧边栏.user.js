// ==UserScript==
// @name  知乎(zhihu)隐藏头部标题和侧边栏
// @namespace  vince.zhihu
// @include *://zhihu.com
// @include *://www.zhihu.com/*
// @include *://zhuanlan.zhihu.com/*
// @include *://promotion.zhihu.com/*
// @description:zh-cn 隐藏知乎(zhihu)的头部固定标题和右侧固定侧边栏，显示全部回复
// @version 2.2.4
// @description 隐藏知乎(zhihu)的头部固定标题和右侧固定侧边栏，显示全部回复
// ==/UserScript==

function showAllReply(){
    var isall=document.querySelector(".QuestionMainAction");
    if(isall){
        isall.click();
    }
}
function handlePage(){
        var css,
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
        css = `.AppHeader{ position: unset!important; }
               .Question-sideColumn,.Profile-sideColumn,.Layout-titleImage--normal .TitleImage{display:none!important;}
               .TitleImage-image--full{height:150px!important;background-position:bottom!important;}
               .Layout-main{width:98%!important;margin-left:15px!important;}
               .Question-main,.Question-mainColumn,.Topstory-container,.TopstoryMain,.Profile-mainColumn,.Topstory-mainColumn{width:100%!important;}
               .RichText img,.RichContent img{max-width:90%!important;}`;

    style.type = 'text/css';
    if (style.styleSheet){
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
}
function startScript(){
    showAllReply();
    handlePage();
    var topscon=document.getElementsByClassName("Topstory-mainColumn");
    if(topscon){
        for ( idx = 0; idx < topscon.length; idx++) {
            if(topscon[idx].nextSibling){
                topscon[idx].nextSibling.style.display='none';
            }
        }
    }

}
startScript();