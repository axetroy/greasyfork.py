// ==UserScript==
// @name        暴漫回复 ctrl enter
// @description 按下C-RET(a.k.a Ctrl Enter)来回复一篇暴漫
// @namespace   mailto:tusooa@vista.aero
// @include     http://baozou.com/articles/*
// @include     http://*.baozou.com/articles/*
// @include     http://baozoumanhua.com/articles/*
// @include     http://*.baozoumanhua.com/articles/*
// @version     2014.10.30.23.19
// @grant       none
// ==/UserScript==
function handleCtrlEnter(e) {
    e = e || window.event;
    // 提供对回复评论的支持。
    if (e.target.nodeName == 'TEXTAREA' && e.target.getAttribute('class') == 'comment_input') {
        //alert('here'); 
        if (e.ctrlKey && e.keyCode == 13) {
            ((e.target.parentNode.parentNode.getElementsByClassName('upload_pic')) [0].getElementsByClassName('comment_submit')) [0].click();
        }
    }
}
document.addEventListener('keyup', handleCtrlEnter, false);
