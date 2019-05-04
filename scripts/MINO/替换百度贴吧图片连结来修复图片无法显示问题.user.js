// ==UserScript==
// @name Replace tieba images src
// @name:zh-TW 替換百度貼吧圖片連結來修復圖片無法顯示問題
// @name:zh-CN 替换百度贴吧图片连结来修复图片无法显示问题
// @namespace Replace tieba images src
// @description 一個簡單替換圖片src的腳本來修復貼吧圖片顯示問題
// @description:zh-tw 一個簡單替換圖片src的腳本來修復貼吧圖片顯示問題
// @description:zh-cn 一个简单替换图片src的脚本来修复贴吧图片显示问题
// @include      http*://tieba.baidu.com/*
// @exclude      http*://tieba.baidu.com/
// @exclude      http*://tieba.baidu.com/index.html
// @grant none
// @run-at       document-end
// @license      MIT License
// @version 0.0.1.20190123182851
// ==/UserScript==
// 
(function(){
  /**
   * debug mode
   * @type {Boolean}
   */
  var debug = false;
  /**
   * retry times
   * @type {Number}
   */
  var retry = 10;
  /**
   * retry interval time
   * @type {Number} millisecond
   */
  var intervalTime = 500;
  
  const replaceImage = () => {
    if (debug) console.log('replacing....');
    let count = 0;
    Array(...document.querySelectorAll('img')).map( x => {
      let src = null;
      let thumbnail = false;
      if(x.src && x.src.startsWith('https://imgsa')) {
        src = x.src
      }
      if(x.dataset.hasOwnProperty('original') && x.dataset.original.startsWith('https://imgsa')) {
        src = x.dataset.original;
        thumbnail = true;
      }
      if (src) {
        x.src = src.replace(/^https?:\/\/imgsa/gm, 'https://imgsrc');
        if (thumbnail) {
          x.dataset.original = x.src;
          x.setAttribute('bpic', x.getAttribute('bpic').replace(/^https?:\/\/imgsa/gm, 'https://imgsrc'));
        }
        count++;
      }
    })
    if (debug) console.log(`${count} images replaced done`);
    return count;
  }
  
  const listener = () => {
    let count = 0;
    replaceImage();
    
    if (debug) console.log('Interval start');

    let t = setInterval(() => {
      if(debug) console.log(`retry times: ${count}`);
      if(count > retry || replaceImage() > 0) { 
        clearInterval(t)
        if (debug) console.log('Interval stop');
      }
      count++;
     }, intervalTime);
  };
  
  history.pushState = listener
  
  listener();
})()