// ==UserScript==
// @name         b站稍后再看链接替换
// @version      0.3
// @description  稍后再看链接替换
// @author       dyxlike
// @match        https://www.bilibili.com/watchlater/
// @grant        none
// @namespace https://github.com/dyxcloud
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    console.log("hello bbb");


setTimeout(() => {
    var elements = document.getElementsByTagName('a');
    for(var i = 0; i < elements.length; i++){
        //console.log(elements[i].getAttribute("href"));
        var str = elements[i].getAttribute("href");
        if(str!=null&&str.indexOf("/watchlater/#") != -1 ){
            console.log("geted!!"+str);
            str = str.replace(/\/watchlater\/#/,"");
            elements[i].setAttribute('href', str);
            elements[i].setAttribute('target', "_blank");
        }
    }
}, 3*1000);

})();