// ==UserScript==
// @name         NGA显示踩
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  nga上显示顶和踩的数量，还有不完善的地方。论坛道友写的，提交到油猴
// @author       You
// @match        https://bbs.ngacn.cc/read.php*
// @grant        none
// @include /^https?://(bbs\.ngacn\.cc|nga\.178\.com|bbs\.nga\.cn)/.+/
// ==/UserScript==
for (var key in commonui.postArg.data){
	var ll = document.getElementById('postcontentandsubject'+key);
	if(ll === null)
		{
            ll= document.getElementById('postcommentcontentandsubject'+key);
        }
	if(ll===null){
		ll= document.getElementById('postcomment_'+key);
	}
	il = ll.getElementsByClassName('white');
	for (var i = 0; i < il.length; i++){
		if(il[i].getAttribute('title') == '支持'){
			var span = document.createElement('span');
			span.innerHTML='赞:'+commonui.postArg.data[key].score+'  踩:'+commonui.postArg.data[key].score_2;
			var par=il[i].parentNode;
			par.insertBefore(span,il[i]);
		}
	}
}