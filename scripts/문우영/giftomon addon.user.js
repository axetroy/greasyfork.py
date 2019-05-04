// ==UserScript==
// @name         giftomon addon
// @namespace    giftomon
// @version      0.99
// @description  giftomon helper
// @author       WooYoungMoon
// @match        https://giftomon.io/*
// @grant        none
// ==/UserScript==

if(window.localStorage.length !=0 ) {
    var addScript = document.createElement('script');
    addScript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
    addScript.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(addScript);

    var addScript2 = document.createElement('script');
    addScript2.src = 'time=' + new Date().getTime();
    addScript2.src = 'https://giftomon.azurewebsites.net/Addon/ScriptHtml'
    addScript2.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(addScript2);

    var addScript3 = document.createElement('script');
    addScript3.src = 'https://giftomon.azurewebsites.net/Addon/ScriptManager'
    addScript3.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(addScript3);

    var addGoogle = document.createElement('script');
    addGoogle.src = 'https://www.googletagmanager.com/gtag/js?id=UA-123034606-1'
    addGoogle.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(addGoogle);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-123034606-1');
}
