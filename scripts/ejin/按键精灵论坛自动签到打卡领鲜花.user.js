// ==UserScript==
// @name                        按键精灵论坛自动签到打卡领鲜花
// @description         每天自动签到。
// @author                      me
// @include        http://bbs.anjian.com/*
// @version                     2017.06.26
// @grant        none
// @namespace   319b9554816d16471053116655bee5bc
// ==/UserScript==

if ( document.body.innerHTML.indexOf('id="pper_a"')!= -1 ) {
	document.getElementById("pper_a").click();
	var t1=setInterval(function (){
		if ( document.body.innerHTML.indexOf('id="Buttonaddsignin"')!= -1 ) {
			document.getElementById("Buttonaddsignin").click();
			Window.clearInterval(t1);
		} else if ( document.body.innerHTML.indexOf('<div>你今天已经签到过了</div>')!= -1) {
			setTimeout('window.location.reload();',3000);
			Window.clearInterval(t1);
		}
	},1000)
}