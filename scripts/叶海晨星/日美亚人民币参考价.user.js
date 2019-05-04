// ==UserScript==
// @name         日美亚人民币参考价
// @namespace    amazon_叶海晨星
// @version      0.5
// @description  依据设定的汇率为日美亚添加人民币参考价
// @author       You
// @match        *://www.amazon.com/*
// @match        *://www.amazon.co.jp/*
// @require		 https://code.jquery.com/jquery-latest.js
// @run-at		 document-end
// @icon         http://www.amazon.com/favicon.ico
// ==/UserScript==

//日元兑换人民币
var JPYCNY = 0.05911;
//美元兑换人民币
var USDCNY = 6.6245;
//是否为日亚
var isJapan = true;
var isGoods = true;
if (document.domain == "www.amazon.com") isJapan = false;
if (document.location.href.indexOf("/s/") > 0) isGoods = false;


//获取商品价格
function getPrice(jq) {
	//日亚 或 商品页面
	if (isJapan || isGoods) return jq.text().substr(1).trim().replace(/,/g, '');
	//美亚
	var whole = jq.find("span.a-price-whole").text();
	var fraction = jq.find("span.a-price-fraction").text();
	if (typeof (fraction) == "undefined") {
		return whole + "00";
	} else {
		return (whole + fraction);
	}
}

//转换为人民币价格
function toRMB(num) {
	//日亚
	if (isJapan) return num * JPYCNY;
	//美亚
	return num * USDCNY;
}

//给页面添加人民币价格
function append2page(jq) {
	console.log(jq);
	var price = toRMB(getPrice(jq)).toFixed(2);
	console.log(typeof (price));
	if (price != "NaN") jq.append("<span class='a-size-small a-color-secondary'>    ￥" + price + " </span>");
}

if (isJapan || isGoods) {
	$("span.a-color-price").each(function () {
		append2page($(this));
	});
} else {
	$("span.a-price").each(function () {
		append2page($(this));
	});
}