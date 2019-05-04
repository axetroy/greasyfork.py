// ==UserScript==
// @name         Wikipediaで他言語版のリンクをh1の隣に持ってくる
// @namespace    https://github.com/unarist/
// @version      0.1
// @description  Add link for InterWikis into h1 tag
// @match        https://*.wikipedia.org/wiki/*
// @grant        none
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==

var langs = ['ja', 'en', 'it'];
var titleFilters = {
    ja: /^.+?: /
};

var currentLang = window.location.host.substr(0, 2);
var titleFilter = titleFilters[currentLang] || / [-–] .+?$/;

langs.map(function (lang) {
    if (lang === currentLang) return $();
    
    var link = $('.interwiki-' + lang + ' a');
    var elem, title;
    if(link.length > 0) {
        elem = link.clone();
        title = link.attr('title').replace(titleFilter, '');
    } else {
        elem = $('<span>');
        title = '-';
    }
    return elem.text(lang + ': ' + title);
}).forEach(function (elem) {
    elem.css({
        fontSize: 'small',
        marginLeft: '1em'
    })
    .appendTo('h1');
});