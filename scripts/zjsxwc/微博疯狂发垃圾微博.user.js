
// ==UserScript==
// @name         微博疯狂发垃圾微博
// @namespace    http://tampermonkey.net/
// @version      0.02
// @description  测试学习如何用油猴发微博
// @author       zjsxwc
// @match        https://weibo.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// @icon         https://weibo.com/favicon.ico
// ==/UserScript==

(function () {
	console.log("jquery ready");
    repeatChar = function (char, times) {
        var result = "";
        for (var i = 0; i< times; i++) {
            result += char;
        }
        return result;
    }
    send = function send(){
        var btn1 = $('[action-data="title=有什么新鲜事想告诉大家?"]')[0];
        console.log(btn1);
        if (!btn1) {
            return;
        }
        btn1.click();

        setTimeout(function(){
            var text = $('[node-type="textEl"]')[0];
            console.log(text);
            if (!text) {
                return;
            }

            text.value = repeatChar('我',1800) + Math.random();
            text.dispatchEvent(new Event('focus'));

            setTimeout(function(){
                var btn3 = $('[node-type="submit"]')[0];
                console.log(btn3);
                if (!btn3) {
                    return;
                }
                btn3.click();
                setTimeout(function(){location.reload();},500);
            },300);

        },300);

    }
    setInterval(send,1000);

})();