// ==UserScript==
// @name         京东E卡余额
// @namespace    https://greasyfork.org/en/users/22079-hntee
// @version      0.1
// @description  查看当前页面所有E卡的余额
// @author       You
// @match        https://mygiftcard.jd.com/giftcard/bindingClosedList.action*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var prices = $('#detailPage > tbody td:nth-child(4)')
    .map(function (index, c) {
		var price = c.textContent.substring(1); // remove ￥
		return parseFloat(price);
	});

    var sum = Array.from(prices).reduce((a, b) => a + b, 0);

    var anchor = $('#card02 > div.mt');

    var el = $("<div/>");
    el.css("display","block");
    el.text("总余额："+sum);

    anchor.append(el);

})();