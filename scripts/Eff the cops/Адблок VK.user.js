// ==UserScript==
// @name         Адблок VK
// @version      1.0.0
// @description  Адблок по определённым словам. Вы можете добавлять свои слова изменяя код!
// @authors      dimden (Eff the cops)
// @match        https://vk.com/feed
// @namespace    https://greasyfork.org/users/222541
// ==/UserScript==

setInterval(function(){
    for(var k in document.getElementsByClassName('wall_post_text')) {
        if(document.getElementsByClassName('wall_post_text')[k].innerHTML.includes("vk.cc") || document.getElementsByClassName('wall_post_text')[k].innerHTML.includes("Подробнее") || document.getElementsByClassName('wall_post_text')[k].innerHTML.includes("Подписаться") || document.getElementsByClassName('wall_post_text')[k].innerHTML.includes("Подписка") || document.getElementsByClassName('wall_post_text')[k].innerHTML.includes("Лайк") || document.getElementsByClassName('wall_post_text')[k].innerHTML.includes("Репост") || document.getElementsByClassName('wall_post_text')[k].innerHTML.includes("Не пропусти")) {
            document.getElementsByClassName('wall_post_text')[k].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
           }
    }
}, 200);
