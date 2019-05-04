// ==UserScript==
// @name        Osu Auto Downloader 2
// @namespace   zxhzxhz
// @description Back to osu! official website if download is not available on bloodcat.
// @include     https://bloodcat.com/osu/*
// @grant       none
// @version     none
// ==/UserScript==
//跳转后判断是否存在图包
body = document.getElementsByTagName('body') [0]
var text = body.firstChild.data
result = window.location.hostname == 'bloodcat.com' || text == '* File not found or inaccessable!'
if (result)
{
  window.location = 'https://osu.ppy.sh/d/' + window.location.pathname.replace('/osu/s/', '')
}