// ==UserScript==
// @name         Watch2Gether
// @namespace    http://tampermonkey.net/
// @version      1.6.08
// @description  Change video player to full browser width/height, removing chat, removed blue tabs.
// @author       Kalila Violette
// @match        https://www.watch2gether.com/rooms/*
// @grant        none
// ==/UserScript==

$("#userbar-chat").remove();
$("div.ui.container").removeClass("container");
$("#player.w2g-player").css("width","100%");
setInterval(ResizeBackground,100);
function ResizeBackground() {
    if ($('body').hasClass('top-search')){
        $("#player.w2g-player").css("max-height","0vh");
    }
    else{

        $("#player.w2g-player").css("max-height","100vh");
    }
}
$("#player-video.w2g-bind-layout").css("max-height","96vh");
$("#player-chat-row").css("max-height","9999px");
$("#w2g-greatrow").remove();
$("a.cast-icon.item.plus-click").remove();

$("div.ui.topbar-search.w2g-bind-apps").css("width","100%");

$("div.client-footer").remove();
$("#search-tab").css("padding-bottom","0px");
$("a.bottom-sticker.feedback-sticker").remove();
$("span.bottom-sticker.intro-sticker.start-intro").remove();
$("a.bottom-sticker.chromeext-sticker.browser-extension-install").remove();

$("div.topbar").css("padding-top","0px");
$("div.topbar").css("padding-bottom","0px");
$("div.topbar").css("min-height","0px");
$("div.topbar-search.w2g-bind-apps").css("padding-left","0px");

//$("div.right.icon.menu").remove();

//$("div.w2g-dropdown").css("height","250px");
//$("div.w2g-dropdown").css("overflow","unset");
//$("div.dd-item").css("margin-top","50px");
//$("div.dd-item.player-volume").css("height","250px");
//$("div.vertical-slider").css("height","250px");


//$("input.slider").css("width","238px");
//$("input.slider").css("padding-top","0px");
//$("input.slider").css("margin-top","87px");