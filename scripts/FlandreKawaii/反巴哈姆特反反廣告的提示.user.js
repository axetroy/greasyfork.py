// ==UserScript==
// @name        反巴哈姆特反反廣告的提示
// @description 反巴哈姆特(含動畫瘋)反反廣告的提示及反文章列表廣告
// @namespace   https://github.com/FlandreDaisuki
// @author      FlandreDaisuki
// @include     https://*gamer.com.tw/*
// @version     2.1.1
// @run-at      document-start
// @grant       none
// ==/UserScript==
/* 可以讓已經包月的人不要看到這個嘛 森77 */

// 動畫瘋開頭跳出
// alert('由於擋廣告插件會影響播放器運作，如果您有安裝，請您將 gamer.com.tw / bahamut.com.tw 網域加入白名單或考慮關閉插件，動畫瘋感謝您的支持！')

let BAHA_ANIME = {};
const noop = () => {};

Object.defineProperty(window, 'BAHA_ANIME', {
  get(){
    return BAHA_ANIME;
  },
  set(a){
    a.prototype.antiBlock = noop;
    BAHA_ANIME = a;
  },
  configurable: true,
});

// 全站黃警告
// 我們了解您不想看到廣告的心情⋯ 若您願意支持巴哈姆特永續經營，請將 gamer.com.tw 加入廣告阻擋工具的白名單中，謝謝 !【教學】

if (localStorage.admercyblocks) {
  localStorage.admercyblocks = Infinity;
}

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'interactive') {
    const a = document.querySelector('.alert-close');
    if (a) {
      a.parentElement.remove();
    }
  }
});

// 文章列表廣告
// 巴哈你也太硬來了吧wwww 廢到笑

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'interactive') {
    [...document.querySelectorAll('.b-list_ad')]
      .forEach(ad => ad.parentElement.remove());
  }
});
