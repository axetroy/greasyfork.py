// ==UserScript==
// @name         隐藏煎蛋上的OOXX数
// @namespace    http://jandan.net/
// @version      0.2
// @description  在点击段子、妹子图、无聊图的OOXX之前，隐藏OOXX数
// @author       水西瓜
// @match        http://jandan.net/duan
// @match        http://jandan.net/ooxx
// @match        http://jandan.net/pic
// @match        https://jandan.net/duan
// @match        https://jandan.net/ooxx
// @match        https://jandan.net/pic
// @match        http://jandan.net/duan/*
// @match        http://jandan.net/ooxx/*
// @match        http://jandan.net/pic/*
// @match        https://jandan.net/duan/*
// @match        https://jandan.net/ooxx/*
// @match        https://jandan.net/pic/*
// @grant        none
// ==/UserScript==

(function() {
    $('.comment-like, .comment-unlike').next('span').attr('style','display:none');
    $(".comment-like, .comment-unlike").click(function() {
        $(this).closest('.jandan-vote').find('span').attr('style','display:');
    });
})();