// ==UserScript==
// @name        Highligth visited episodes on animeid.io
// @description Highligth visited (red) episodes on animeid.io
// @description:en        Highligth visited episodes on animeid.io
// @namespace   animeid.io
// @include     http://animeid.io/Anime/*
// @include     https://animeid.io/Anime/*
// @version     1
// @grant    GM_addStyle
// ==/UserScript==

GM_addStyle ( "ul#episode_related li a:visited{background-color:#ffc119 ;color:#a23131}" );