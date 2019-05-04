// ==UserScript==
// @name         Github导航栏扩展
// @version      1.1
// @description  导航栏增加Discover, Trending, Topics
// @author       MyFaith
// @match        http://*.github.com/*
// @match        https://*.github.com/*
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @run-at       document-end
// @namespace https://greasyfork.org/users/8899
// ==/UserScript==

var $ = $ || window.$;
window.jQuery = $;

$(document).ready(function(){
    $('nav ul').append(`
    |
    <li>
        <a class="js-selected-navigation-item HeaderNavlink px-lg-2 py-2 py-lg-0" href="/discover">
            Discover
        </a>            
    </li>
    <li>
        <a class="js-selected-navigation-item HeaderNavlink px-lg-2 py-2 py-lg-0" href="/trending">
            Trending
        </a>            
    </li>
    <li>
        <a class="js-selected-navigation-item HeaderNavlink px-lg-2 py-2 py-lg-0" href="/topics">
            Topics
        </a>            
    </li>
    `);
});
