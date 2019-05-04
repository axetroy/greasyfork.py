// ==UserScript==
// @name         隐藏知乎广告
// @namespace    https://github.com/mougua
// @version      0.1.1.1
// @description  喵桑统治世界！
// @author       喵桑
// @match        https://www.zhihu.com/*
// @grant        none
// ==/UserScript==
function getElementsByClassName(n) {
    var classElements = [],allElements = document.getElementsByTagName('*');
    for (var i=0; i< allElements.length; i++ ) {
        //console.log(allElements[i].className);
        if (allElements[i].className == n ) {
            classElements[classElements.length] = allElements[i];
        }
    }
    return classElements;
}

function hideAds(url) {
    if (url.indexOf('batch') < 0) {
        return;
    }
    var ads = getElementsByClassName('Card TopstoryItem TopstoryItem--advertCard');
    for (var i=0; i<ads.length; i++) {
        ads[i].style.display = "none";
    }
    ads = getElementsByClassName('Card Banner');
    for (var j=0; j<ads.length; j++) {
        ads[j].style.display = "none";
    }
}

(function(open) {

    XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
        this.addEventListener("readystatechange", function() {
            hideAds(url);
        }, false);
        open.call(this, method, url, async, user, pass);
    };
})(XMLHttpRequest.prototype.open);

