// ==UserScript==
// @name         OPAC图书馆搜索一键展开馆藏
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  用于OPAC图书馆系统，搜索页展开馆藏
// @author       mscststs
// @match        http://opac.*.edu.cn*/opac/openlink.php*
// @include       *opac/openlink.php*
// @include       */openlink.php*
// @grant        none
// ==/UserScript==


//用于一键展开馆藏，方便记录书目

(function() {
    'use strict';
    
    var ddiv = $('#content > div:nth-child(1) > div:nth-child(1) > p');
    var vipBtn = '<a id="OneKeyBtn"class="btn btn-primary">展开馆藏</a>';
    ddiv.append(vipBtn);
     $('#OneKeyBtn').on('click',function(){
         document.body.innerHTML+="<style>.prompt{display:block !important;}</style>";
        $('li > p > a.tooltip').mouseover();
    });
})();
