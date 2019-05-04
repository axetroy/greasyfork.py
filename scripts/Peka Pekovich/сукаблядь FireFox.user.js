// ==UserScript==
// @name         сукаблядь FireFox
// @version      0.16-testing
// @description  K P A C U B O
// @author      xxxVADIK_666xxx
// @include     https://yoba.vg:1337/*
// @namespace https://greasyfork.org/users/38515
// ==/UserScript==
interval = setInterval(function(){
$("span.userMessageBody:contains('сукаблядь'),div.userMessageBody:contains('сукаблядь')").html(function (_, html) {
     return html.replace(/сукаблядь/g,"<img class='emoticon' src='https://i.imgur.com/yuN7sBZ.png' title='сукаблядь' alt='сукаблядь' />")
});
},69);