// ==UserScript==
// @name        КанобуРу фильтр новостей на главной
// @description Скрипт позволяет указать типы новостей, по тегам, и они спрячутся
// @description:en This is russian script for russian site. Functionality: Filtering news on main page by tagnames.
// @namespace   ru.kanobu.YDogg
// @include     http://kanobu.ru/
// @version     1.002
// @grant       none
// ==/UserScript==
document.addEventListener('DOMContentLoaded', function (event) {

    var mpage = document.getElementById("mainpage-news");
    var news = document.querySelector('.news-list');
    var feature = document.querySelector(".page-feature-main");
    var itemsCount = 0;

    //Перечислить все ненавистные тэги (с маленькой буквы)
    var blocked = [
        'комиксы',
        'киберспорт',
        'косплей',
        'партнерский материал',
        'фигурки',
        'рестлинг',
        'реклама',
        'the international 2017',
        'игра престолов'
    ];

    function hideSomeShit() {
        var newsItems = news.getElementsByTagName('li');
        for (var i = 0; i < newsItems.length; i++) {
            var clss = newsItems[i].classList;
            var tag;
            if (!clss.contains("longread-list-item")) {
                //tag = newsItems[i].childNodes[1].childNodes[3].childNodes[1].childNodes[0];
                tag = newsItems[i].querySelector("span.news-info-category-main");
                //alert(tag.innerHTML);
            } else {
                tag = newsItems[i].querySelector(".longread-info--type");
            }
            if (!!tag) {
                var txt = String.toLowerCase(tag.innerHTML);

                if (blocked.indexOf(txt) >= 0) {
                    newsItems[i].style.display = 'none';
                }
            }
        }
    }
    
    mpage.style.paddingTop = "40px"; //Вернуть отступ
    feature.style.display = "none"; //Убрать фичер
    
    //Фильтровать постоянно
    setInterval(function(){
        var items = news.getElementsByTagName('li');
        if (itemsCount!==items.length){
            hideSomeShit();
        }
        itemsCount = items.length;
    }, 50);
});
