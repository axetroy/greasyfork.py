// ==UserScript==
// @name         QQ空间动态自动点赞
// @description  点赞首页上的所有动态
// @namespace    https://greasyfork.org/users/197529
// @version      0.6
// @author       kkocdko
// @include      *://user.qzone.qq.com/*
// @noframes
// ==/UserScript==

function addButton(showText, callBack) {
    var button = document.createElement('button');
    button.style = 'float:left;margin:5px 10px 0 0;padding:0 9px;height:31px;border:0;background:#eee;';
    button.addEventListener('click', callBack);
    button.innerText = showText;
    var topBar = document.querySelector('#QZ_Toolbar_Container').querySelector('.top-fix-wrap');
    topBar.insertBefore(button, topBar.firstElementChild);
}

Date.timeNow = () => {
    function toDigit(number, length, isSuffix) {
        return isSuffix ? (number + '000').substr(0, length) : ('000' + number).substr(-length, length);
    }

    var date = new Date();
    var timeStr = toDigit(date.getHours(), 2, false) + ':' + toDigit(date.getMinutes(), 2, false) + ':' + toDigit(date.getSeconds(), 2, false) + '.' + toDigit(date.getMilliseconds(), 3, true);
    return timeStr;
};

function deleteElement(elecment) {
    elecment.parentNode.removeChild(elecment);
}

function likeAll() {
    var likeButtons = document.querySelectorAll('.qz_like_btn_v3');
    likeButtons.forEach(item => {
        if (item.classList.length < 3) {
            item.click();
            var logContent = 'Click like at ' + Date.timeNow();
            console.log('%c' + logContent, 'color:rgb(0,120,215)');
        }
    });
}

addButton('Refresh & like', () => {
    setInterval(() => {
        likeAll();
        setTimeout(document.querySelectorAll('#feed_friend_refresh').click(), 5000);
    }, 30000);
});

addButton('Scroll & like', () => {
    setInterval(() => {
        likeAll();
        scrollTo(0, document.documentElement.scrollHeight);
    }, 500);
});

addButton('Like all', () => likeAll());