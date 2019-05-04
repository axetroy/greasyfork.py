// ==UserScript==
// @name         开源中国动弹图片预览
// @namespace    https://blog.huijiewei.com/
// @version      0.6
// @description  开源中国网站动弹图片大图预览
// @author       Huijie Wei
// @match        *://www.oschina.net/tweets*
// @require      https://cdn.bootcss.com/slick-carousel/1.9.0/slick.min.js
// @require      https://cdn.bootcss.com/slick-lightbox/0.2.12/slick-lightbox.js
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
 
  function addCSS(url) {
    var link = window.document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    document.getElementsByTagName("HEAD")[0].appendChild(link);
  }
  
  addCSS('https://cdn.bootcss.com/slick-carousel/1.9.0/slick.min.css');
  addCSS('https://cdn.bootcss.com/slick-carousel/1.9.0/slick-theme.min.css');
  addCSS('https://cdn.bootcss.com/slick-lightbox/0.2.12/slick-lightbox.css');
  
  $('#tweetList').slickLightbox({
    itemSelector: '.wrapper > a',
    src: function(elm) {
      return $(elm).find('img').data('bigImg');
    }
  });
})();

