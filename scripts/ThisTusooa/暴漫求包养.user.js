// ==UserScript==
// @name        暴漫求包养
// @description 添加一个求包养的链接
// @namespace   mailto:tusooa@vista.aero
// @include     http://baozoumanhua.com/users/*
// @version     2014.5.10.14.48
// @grant       none
// ==/UserScript==
+ function addFeedArticle() {
    //var login = (document.getElementsByClassName('login')) [0];
    //var menu = document.getElementById('profile-dropdown');
    //var userId = (menu.getElementsByClassName('articles_count')) [0].href;
    //alert(userId);
    //var currentURL = window.location.href;
    var userNav = document.getElementsByClassName('user-nav') [0];
    var userBar = userNav.getElementsByTagName('li');
    if (userBar.length == 7) {
        //alert('own page');
        var entryList = document.getElementById('entry-list-ul');
        var articles = entryList.getElementsByClassName('entry-item');
        //alert('length:'+articles.length);
        for (var x = 0, len = articles.length; x < len; x++) {
            var meta = ((articles[x].getElementsByClassName('info')) [0].getElementsByClassName('meta')) [0];
            if (meta.getElementsByClassName('pending') .length > 0 || meta.getElementsByClassName('private') .length > 0) {
                //alert('article pending');
                var feed = document.createElement('li');
                feed.innerHTML = '<a href="#" class="re_fed_article" data-n="#re_fed_form">求包养</a>';
                (meta.getElementsByClassName('xl')) [0].appendChild(feed);
            }
        }
    }
}();