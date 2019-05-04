// ==UserScript==
// @name         Выключить комментарии VK
// @version      1.0.0
// @description  Выключение комментариев в Вконтакте.  Я сам создал для себя этот скрипт, потому-что уже надоели эти глупые комментарии. 
// @authors      dimden (Eff the cops)
// @match        https://vk.com/feed
// @namespace https://greasyfork.org/users/222541
// ==/UserScript==

setInterval(function(){
    for(var k in document.getElementsByClassName('replies_list _replies_list')) {
        if(document.getElementsByClassName('replies_list _replies_list')[k].childElementCount !== 0 ) {
            document.getElementsByClassName('replies_list _replies_list')[k].firstChild.remove();
        }
    }
},200);