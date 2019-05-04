// ==UserScript==
// @name			玛雅BT种子下载去除弹窗广告
// @namespace   40c3ed83e9c7f608d44946a6ffd7a053
// @description		去除玛雅网网盘下载时的弹窗
// @author			me
// @include		http://*/link.php?ref=*
// @version			2016.09.08
// @grant        none
// ==/UserScript==


if ( document.body.innerHTML.indexOf("Characteristic Code") != -1 ){
	(function(){
		var f = document.getElementsByTagName('form');
		if (f) {
			f[0].setAttribute('onSubmit', '');
		}
	})();
}