// ==UserScript==
// @name        Search in Douban
// @namespace   https://greasyfork.org/users/50045
// @include     https://www.themoviedb.org/*
// @include     http://www.themoviedb.org/*
// @description Searches the douban page from themoviedb, better using Chinese language
// @version     1
// @grant       none
// ==/UserScript==

var x = document.getElementsByClassName('title') [0];

var htm = x.innerHTML;

var myRegexp = /<a.*?>(.*?)</m;
var m = myRegexp.exec(htm);
var movie = m[1];
console.log(movie);
x.appendChild(document.createElement('BR'));
x.appendChild(document.createElement('BR'));
var s;
s = document.createElement('A');
s.target = '_blank';
s.text = 'Search in 豆瓣';
s.href = 'https://movie.douban.com/subject_search?search_text=' + movie;
x.appendChild(s);
