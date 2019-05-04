// ==UserScript==
// @name        Arrêt Sur Image QRCode
// @namespace   arretsurimageqrcode
// @description Regardez Arrêt sur Image via l'application Dailymotion de votre smartphone !
// @include     http://www.arretsurimages.net/*
// @version     1
// @grant       none
// ==/UserScript==


$("iframe").each(function(i) {
    createQrCode($(this));  
});

$("object").each(function(i) {
    createQrCode($(this).find("embed"));
});

function createQrCode(obj) {
    if(obj.attr("src")) {
        var link = obj.attr("src").replace("embed/","").replace("swf/","video/").split('?')[0];
        if (/dailymotion.com\//i.test(link)) {
            $("<a href='"+link+"'><img src='https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl="+link+"'></img></a>").insertAfter(obj);  
        }
    }
}