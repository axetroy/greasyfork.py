// ==UserScript==
// @name        التحويل إلى وضع المشاهدة الآمنة
// @namespace   التحويل إلى وضع المشاهدة الآمنة
// @description تحول المستخدم إختيارياً من إلى وضع المشاهدة الآمنة
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*
// @include     http://m.youtube.com/*
// @include     https://m.youtube.com/*
// @version     1
// ==/UserScript==
var unsafeWindow = unsafeWindow || null,
    wnd = unsafeWindow || window,
    doc = wnd.document,
    result = /v=([^&]+)(?:&.*)*/i.exec(doc.location.search);

if(result)
{
    if(!wnd.sessionStorage.getItem("__cleanYTPrompted") && wnd.confirm("هل تريد التحول إلى وضع المشاهدة الآمنة؟"))
        wnd.location.href = "https://www.youtube.com/embed/" + result[1] + "?vq=tiny&rel=0";

    wnd.sessionStorage.setItem("__cleanYTPrompted", true);
}