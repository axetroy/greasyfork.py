// ==UserScript==
// @name       高亮页面nofollow  SEO相关
// @namespace  wwww.jsbx.space
// @version    1.2
// @description  高亮页面中的nofollow超链接
// @match      *://*/*
// @copyright  2017,www.liaoboacheng.com
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.js
// ==/UserScript==

(function(){
    'use strict';
    $(function(){
       var links = $('a');
       links.each(function(){
           var link = $(this);
           if(link.attr('rel')==='nofollow'){
               link.css('color','#0c9');
               link.css('border','1px dashed black');
               link.css('border-radius','2px');
           }
       });
    });
})();