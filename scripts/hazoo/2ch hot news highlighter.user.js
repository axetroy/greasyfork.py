// ==UserScript==
// @name 2ch hot news highlighter
// @description highlights popular news on the main site page
// @namespace hk.2ch
// @match *://2ch.hk/*
// @match *://2ch.pm/*
// @grant   GM_getValue
// @grant   GM_setValue
// @version 1.1
// ==/UserScript==

(function() {
  'use strict';
   
  const defaultCount = 10;
  
  let newsEl = document.querySelector('#news');
  
  if (newsEl != null) {
    newsEl.addEventListener('DOMSubtreeModified', () => {
            
      const news = readElements();      
      news.sort((a,b) => b.posts - a.posts);
      
      const length = Math.min(getNewsCount(), news.length);
      const colors = generateColors(length);
      
      highlightNews(news, length);
      
      function readElements() {
        return [...document.querySelectorAll('#news li')].map((li) => { 
          return {
            el: li,
            posts: li.querySelector('.news-posts-count').innerHTML.slice(1, -1)
          }
        });
      }
      
      function getNewsCount() {
        let count = GM_getValue('news');
        
        if (!Number.isInteger(count) || count <= 0) {
          count = defaultCount;
          GM_setValue('news', defaultCount);
        }
        return count;
      }
      
      function generateColors(nums) {
        const inc = 255 / (nums + 1);
        let colors = [];
        for(var i = 0; i < nums; i++) {
          colors[i] =  `rgb(${(255 - inc * i)}, 0, ${(inc * i)})`;
        }
        return colors;
      }
    
      function highlightNews(news, len) {
        for(let i = 0; i < len; i++){
          let style = news[i].el.querySelector('.fa-newspaper-o').style;
          style.backgroundColor = colors[i];
          style.color = 'rgba(0,0,0,0)';
          news[i].el.title = i + 1;
        }
      }

    }, false);
  }
})();