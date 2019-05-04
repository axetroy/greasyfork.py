// ==UserScript==
// @name         买趣吧淘宝优惠券
// @namespace    https://greasyfork.org/users/208628
// @version      0.1.3
// @description  点击买趣吧查券自动跳转到淘宝商品天猫商品对应的买趣吧领券页面，优惠购物说省就省!
// @author       HoldPc
// @include http*://item.taobao.com/*
// @include http*://detail.tmall.com/*
// @include http*://chaoshi.detail.tmall.com/*
// @include http*://detail.tmall.hk/*
// @include http*://detail.liangxinyao.com/*
// @include http*://detail.yao.95095.com/*
// @grant        none
// ==/UserScript==
function run(){
	var searchPrefix="http://maiqubuy.swlte.com/?r=searchlist&kwd=";
	var link=location.href;
	var realLink=getRealLink(link);
	console.log(realLink);
	var isTb=location.host==='item.taobao.com';
	var isTm=location.host==='detail.tmall.com';
	var isCs=location.host==='chaoshi.detail.tmall.com';
	var isHk=location.host==='detail.tmall.hk';
	var isLXY=location.host==='detail.liangxinyao.com';
	var isYao=location.host==='detail.yao.95095.com';
	var targetLink=searchPrefix+encodeURIComponent(realLink);
	var block;
	if(isTb){
		block=document.querySelector('.tb-title');
	}
	else{
		block=document.querySelector('.tb-detail-hd');
	}
	var br=document.createElement('br');
	var mamaLink=document.createElement('a');
	mamaLink.href=targetLink;
    mamaLink.href = mamaLink.href.replace('detail.liangxinyao.com', 'detail.tmall.com');
	mamaLink.href = mamaLink.href.replace('detail.yao.95095.com', 'detail.tmall.com');
	mamaLink.target='_blank';
	mamaLink.innerText='买趣吧查券';
	block.appendChild(mamaLink);
}

function getRealLink(longLink){
	var n=longLink.indexOf('?');
	if (n>0) {
		var params=longLink.substr(n+1).split('&');
		for (var i in params){
			var param=params[i];
			if (param.indexOf('id=')===0) {
				return longLink.substr(0,n+1)+param;
			}
		}
	}
}
run();