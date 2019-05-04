// ==UserScript==
// @name           Virtonomica: Избавляемся от страшных картинок в новом дизайне
// @author         BioHazard
// @version        1.00
// @namespace      Virtonomica
// @description    Бережем свои глазки и не видим эти страшилки
// @include        /^https?:\/\/virtonomic.\.\w+\/\w+\/main\/company\/view\/\d+\/finance_report(|\/graphical)$/
// @include        /^https?:\/\/virtonomic.\.\w+\/\w+\/main\/company\/view\/\d+\/dashboard$/
// ==/UserScript==

(function() {
    'use strict';

    //убираем картинки из дашборда
    if(~location.href.search(/^https?:\/\/virtonomic.\.\w+\/\w+\/main\/company\/view\/\d+\/dashboard$/)){
        document.querySelector('.item.item-w100').style='display: none';
    }

    //прячем предложения получить наличные на странице финансового отчета
    if(~location.href.search(/^https?:\/\/virtonomic.\.\w+\/\w+\/main\/company\/view\/\d+\/finance_report(|\/graphical)$/)){
        document.querySelector('.bonus_block').style='display: none';
    }
})(window);