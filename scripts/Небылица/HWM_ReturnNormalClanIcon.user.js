// ==UserScript==
// @name         HWM_ReturnNormalClanIcon
// @namespace    Небылица
// @version      1.12
// @description  Возврат стандартного (не праздничного) значка #823
// @author       Небылица
// @include      /^https{0,1}:\/\/((www|qrator)\.heroeswm\.ru|178\.248\.235\.15)\/.+/
// @exclude      /^https{0,1}:\/\/((www|qrator)\.heroeswm\.ru|178\.248\.235\.15)\/(login|war|cgame|frames|chat|chatonline|ch_box|chat_line|ticker|chatpost)\.php.*/
// ==/UserScript==

(function() {
    "use strict";

    // получаем все картинки на странице
    var icons = document.getElementsByTagName("img");

    // запускаем по ним цикл
    var i,
        maxI = icons.length;
    for (i=0;i<maxI;i++){
        // если видим значок котов, то меняем его на нашу версию
        if (icons[i].src.indexOf("/i_clans/l_823.gif") !== -1){
            icons[i].src = "data:image/gif;base64,R0lGODlhFAAPAKoDAP5TAcplAADZAP///wAAAAAAAAAAAAAAACH5BAkLAAQAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAFAAPAAADOEi63P4LSAndvJVRtXXkgBaKRNeYl0lGgtSOIlymNLYEwYTXKr7TOdWsFkRJfkekTJcqSgaZKCEBACH5BAkLAAQALAIAAQAQAA0AAAMqSLoK/oy96WKrC4NsL6mYRUHdIzjnFo3sGATP226v7JIz7OpOzfI9yiABACH5BAkLAAQALAIAAQAQAA0AAAMrSLrQ3iuSR6VlQGV9Z4bQRTmdIzTnFo3sGATO22av7JIeC7t7U+uUXmOQAAAh+QQJCwAEACwCAAEAEAANAAADKki6Cv6MveliqwuDbC+pmEVB3SM45xaN7BgEz9tur+ySM+zqTs3yPcogAQA7";
        }
    }
})();