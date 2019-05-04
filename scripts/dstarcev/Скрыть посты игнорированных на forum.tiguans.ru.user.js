// ==UserScript==
// @name         Скрыть посты игнорированных на forum.tiguans.ru
// @description  Скрипт полностью скрывает посты игнорированных пользователей, которые по умолчанию просто свёрнуты
// @match        http://forum.tiguans.ru/*
// @require http://code.jquery.com/jquery-latest.js
// @namespace https://greasyfork.org/users/36351
// @version 0.0.1.20160331143757
// ==/UserScript==

(function() {
    'use strict';
    jQuery("a:contains('Удалить пользователя из списка игнорирования')")
        .closest('div.page')
        .parent()
        .remove();
    
    jQuery("td.alt1 b:contains('списке игнорирования')")
        .closest('tr')
        .each(function() {
            $(this).prev().remove();
            $(this).remove();
        });
    
})();