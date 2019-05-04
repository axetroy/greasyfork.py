// ==UserScript==
// @name         再见了百度知道和百家号搜索结果
// @namespace    http://tampermonkey.net/
// @home-url     https://greasyfork.org/zh-CN/scripts/371691
// @description  删除百度搜索结果的百度知道和百家号结果
// @version      0.11
// @include      http://www.baidu.com/*
// @include      https://www.baidu.com/*
// @author       vessl
// @grant        none
// @run-at       document-end
// ==/UserScript==



(function() {
    'use strict';
    
     $(document).on('DOMSubtreeModified',process);

    function process() {

        var results = document.getElementById('content_left');

            if(!results) return;

            for (var i =0; i < results.children.length; i++) {
              var mu=results.children[i].attributes.mu;
              if(mu&&mu.value.indexOf("https://www.baidu.com/s?tn=news")>=0){
                  results.children[i].parentNode.removeChild(results.children[i]);
                  continue;
              }
                var links = results.children[i].getElementsByClassName('c-showurl');
                if (links && links.length > 0) {
                    var link = links[0];
                    var text = link.innerText;
                    if (text && (text.indexOf('zhidao.baidu') > -1 || text.indexOf('baijia')) > -1){
                        results.children[i].parentNode.removeChild(results.children[i]);
                    }
                }
            }

    }
})();