// ==UserScript==
// @name         Убираем рекламу из ленты на Одноклассники
// @namespace    ok.ru
// @version      6.1
// @description  Надоело видеть блоки рекламы по середине страницы? Тогда смело установи скрипт, убирает блоки с Промо, Реклама, эпиляция, Омоложение, Bарикоз и.т.д.
// @author       drakulaboy
// @icon        http://i.imgur.com/wEsWOox.png
// @include      *ok.ru*
// @require     http://code.jquery.com/jquery-2.1.1.min.js
// ==/UserScript==
(function() {
    'use strict';

   var waitForEl = function(selector, callback) {
  if (jQuery(selector).length) {
    callback();
  } else {
    setTimeout(function() {
      waitForEl(selector, callback);
    }, 1000);
  }
};

waitForEl("div.feed-list > div", function() {
   var exclude = ['Реклама',
                  'промо',
                  'Промо',
                  'Зомби-магия',
                  'возможности в игре',
                  'прoблeмы выпaдения вoлос',
                  'выпaдения вoлос',
                  'выпaдaния вoлос',
                  'banerator.net',
                  'flirchi.com',
                  'Промо',
                  'Покер с одноклассниками',
                  'MMORPG',
                  'пpoблeм с cycтaвами',
                  'Игра 16+',
                  'жиросжигáтель',
                  'лишний вес',
                  'СУПЕРСКУЮ ГРУДЬ ЗА МЕСЯЦ!',
                  'c сyставаʍи',
                  'Зомбикам',
                  'потенцию',
                  'tricovel.com',
                  'bethowen.ru',
                  'акции',
                  'spravky.ru',
                  'эпиляци',
                  'омоложение',
                  'варикоз',
                  'зрелые женщины',
                  'получай бонусы',
                  'Квартиры в Новой Москве',
                  'Зайди в нашу игру',
                  'Сыграем в покер',
                  'Сорви большой куш',
                  'покер',
                  'Не будь одинок',
                  'Таглит',
                  't.mail.ru'];
    exclude.forEach(function(i){
     $('div.feed-list > div:contains(' + i + ')').hide();
                               });
});
})();
console.log("нету рекламы");