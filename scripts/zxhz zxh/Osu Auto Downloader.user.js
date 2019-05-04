// ==UserScript==
// @name        Osu Auto Downloader
// @namespace   zxhzxhz
// @description Auto download map from bloodcat.com mirror.
// @include     https://osu.ppy.sh/b/*
// @include     https://osu.ppy.sh/s/*
// @grant       none
// @version     none
// ==/UserScript==
var SongI = document.getElementsByClassName('beatmap_download_link')
//获取/s字符串
var songid = SongI[0].href
songid2 = songid.replace('https://osu.ppy.sh/d/', '')
//把获取到的带n（no video）参数删除
songid3 = songid2.replace('n', '')
//跳转血猫
path = '/s/' + songid3
if (!document.referrer) window.location = 'https://bloodcat.com/osu' + path
