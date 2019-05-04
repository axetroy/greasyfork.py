// ==UserScript==
// @name           OWF Chat
// @namespace           OWF Chat
// @author         den78
// @description    Chatango for Owfans.com
// @version    1.2
// @include    http://www.owfans.com/*
// @icon        http://i.imgur.com/lVgaF94.gif
// ==/UserScript==
 
function async_load() {
    s.id = "cid0020000085957087918";
    s.src = (window.location.href.indexOf('file:///') > -1 ? 'http:' : '') + '//st.chatango.com/js/gz/emb.js';
    s.style.cssText = "width:600px;height:500px;";
    s.async = true;
    s.text = '{"handle":"owfans","arch":"js","styles":{"a":"1f1f1f","b":100,"c":"33ff33","d":"cccccc","e":"101010","f":71,"g":"f6f6f4","h":"171717","j":"ffffff","k":"666666","l":"252525","m":"ffffff","n":"dddddd","p":"15","q":"1f1f1f","r":100,"pos":"br","cv":1,"cvbg":"252525","cvfg":"a0c55f","cvw":75,"cvh":30}}';
    (document.head||document.documentElement).appendChild(s);
}
var s = document.createElement('script');
if (s.async == undefined) {
    if (window.addEventListener) {
        addEventListener('load', async_load, false);
    } else if (window.attachEvent) {
        attachEvent('onload', async_load);
    }
} else {
    async_load();
}