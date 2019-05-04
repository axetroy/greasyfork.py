// ==UserScript==
// @name    Кто поёт на Одноклассники в верхнюю закладку
// @version 1.0
// @description Показывает имя исполнителя и песня на таб (закладку) сайта
// @author  drakulaboy
// @namespace   ok
// @include     *ok.ru*
// @include     *ok.ru/music*
// @icon        http://i.imgur.com/wEsWOox.png
// @require     http://code.jquery.com/jquery-2.1.1.min.js
// ==/UserScript==

$(document).ready(function() {
    $(".toolbar_nav_a.toolbar_nav_a__audio").click(function(t) {
        $(document).ready(function() {
            setTimeout(function() {
                setInterval(function() {
                    var oldTitle = "";
                    var myobj = document.getElementsByClassName("mus_player_seek-artist ellip");
                    for (var i = 0; i < myobj.length; i++) {
                        var song = myobj[i].innerText;
                        if (song != oldTitle) {
                            oldTitle = song;
                        }
                        document.title = song;
                    }
                }, 1000);

            }, 4000);
        });
    });
});
