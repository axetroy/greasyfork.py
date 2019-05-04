// ==UserScript==
// @name         Выключить репост-рекламу VK
// @version      1.0.0
// @description  Удаляет всю рекламу с репостами, потому-что обычные адблоки не могут увидеть такую рекламу.
// @authors      dimden (Eff the cops)
// @match        https://vk.com/feed
// @namespace https://greasyfork.org/users/222541
// ==/UserScript==

setInterval(function(){
    for(var k in document.getElementsByClassName('copy_quote')) {
        document.getElementsByClassName('copy_quote')[k].parentElement.parentElement.parentElement.parentElement.parentElement.remove();
    }
},200);