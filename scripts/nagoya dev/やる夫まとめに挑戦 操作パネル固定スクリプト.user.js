// ==UserScript==
// @name        やる夫まとめに挑戦 操作パネル固定スクリプト
// @namespace   http://devdev.nagoya/
// @include     http://n-yaruomatome.sakura.ne.jp/blog/*
// @version     1
// @description まとめブログの外観を変更します。
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// ==/UserScript==
$(function () 
{
    $(document).ready(function () 
    {
        $('.blogbox').eq(0).css({
            "position" : "fixed", "right" : "3px", "top" : "20%", "background" : "#FFF", "width" : "150px"
        });
        $('.blogbox span:not(.child)').css({
            "display" : "block", "width" : "80px", "margin-bottom" : "8px"
        });
        if ( $('.blogbox #slide a').eq(0).css('display') != 'none')
        {
            $('.blogbox #slide a').eq(0).css({
                "display" : "block", "width" : "80px", "margin-bottom" : "8px"
            });
        }
        else 
        {
            $('.blogbox #slide a').eq(0).css({
                "display" : "block"
            });
            $('.blogbox #slide a').eq(0).css({
                "display" : "none", "width" : "80px", "margin-bottom" : "8px"
            });
        }
        if ( $('.blogbox #slide a').eq(1).css('display') != 'none')
        {
            $('.blogbox #slide a').eq(1).css({
                "display" : "block", "width" : "80px", "margin-bottom" : "8px"
            });
        }
        else 
        {
            $('.blogbox #slide a').eq(1).css({
                "display" : "block"
            });
            $('.blogbox #slide a').eq(1).css({
                "display" : "none", "width" : "80px", "margin-bottom" : "8px"
            });
        }
        var style = '';
        style += '<style type="text/css" id="StyleId">';
        style += '#slide a { display:block;  }';
        style += '#sidehead {width:150px; margin:0; padding:3px; white-space: normal; font-size:13px;}';
        style += '</style>';
        $('head').append(style);
        $('.blogbox').eq(0).prepend('<span id="sidehead"></span>') $('#sidehead').text($('h1.entry-title').eq(0).text());
        $('#slide-p a').trigger('click');
    });
});