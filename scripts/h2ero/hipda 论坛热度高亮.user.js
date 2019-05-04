// ==UserScript==
// @name        hipda 论坛热度高亮
// @description:zh-cn  hipda论坛热度高亮
// @namespace   www.joyk.com/dig
// @include     https://www.hi-pda.com/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @grant       none
// ==/UserScript==
var m = function (f) {
    return f.toString().split('\n').slice(1, - 1).join('\n');
}
loadCss = function () {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = m(function () { /*
           #postlist{border: 1px solid #ccc;}
            #nav, #nav a {
               color: #000000;
            }
            body{
               background:#fff;
            }
            .postauthor .profile, .postbottom {
               display:none;
            }
            .t_msgfontfix {
               min-height:0px !important;
            }
            body{
               margin: 0 auto;
                width: 960px;
            }
            .wrap, #nav{
               width:100%;
            }
            a:visited{
                  color:#aaa;
            }
            div#header div.wrap h2{
                  display:none;
            }
            .main{border:1px #ccc solid;}
          */
    });
    var head = document.querySelector('head')
    head.appendChild(style);
};
loadCss();
$(function () {
    
    $('.threadlist tr').each(function () {
        var num = parseInt($('.nums strong', this).text());
        if (num > 20) {
            $(this).css('background', '#FFEBEB')
        }
        if (num > 50) {
            $(this).css('background', '#FFCDCD')
        }
        if (num > 100) {
            $(this).css('background', '#FBAAAA')
        }
        $(this).attr('target', '_blank');
    });
});
