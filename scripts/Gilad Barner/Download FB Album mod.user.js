// ==UserScript==
// @name          Download FB Album mod
// @author        indream
// @version       0.16.6.1
// @description   Download Facebook & Instagram Album by One Click.
// @namespace     DownAlbum
// @grant         unsafeWindow
// @grant         GM_xmlhttpRequest
// @include       htt*://*.facebook.com/*
// @include       htt*://*.facebook.com/*/*
// @include       htt*://instagram.com/*
// @include       htt*://*.instagram.com/*
// @include       htt*://twitter.com/*
// @include       htt*://weibo.com/p/*/album*
// @include       htt*://*.weibo.com/*
// @include       htt*://www.pinterest.com/*
// @include       htt*://ask.fm/*
// @exclude       htt*://*static*.facebook.com*
// @exclude       htt*://*channel*.facebook.com*
// @exclude       htt*://developers.facebook.com/*
// @exclude       htt*://upload.facebook.com/*
// @exclude       htt*://*onnect.facebook.com/*
// @exclude       htt*://*acebook.com/connect*
// @exclude       htt*://*.facebook.com/plugins/*
// @exclude       htt*://*.facebook.com/l.php*
// @exclude       htt*://*.facebook.com/ai.php*
// @exclude       htt*://*.facebook.com/extern/*
// @exclude       htt*://*.facebook.com/pagelet/*
// @exclude       htt*://api.facebook.com/static/*
// @exclude       htt*://*.facebook.com/contact_importer/*
// @exclude       htt*://*.facebook.com/ajax/*
// @exclude       htt*://www.facebook.com/places/map*_iframe.php*
// @exclude       https://www.facebook.com/xti.php
// @exclude       https://*.ak.facebook.com/*
// @exclude       https://www.facebook.com/ajax/pagelet/generic.php/*
// @exclude       https://www.facebook.com/*/plugins/*
// @exclude       https://www.facebook.com/xti.php*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==


debugger;
$('.wrapper').css("max-width","1200px!important");
$('li').css({
  "line-height": "23px!important",
  "margin-bottom": "10px!important"
})