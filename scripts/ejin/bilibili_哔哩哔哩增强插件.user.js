// ==UserScript==
// @name         bilibili_哔哩哔哩增强插件
// @namespace    e412a62a62fa4c73b65da682d1c29f54
// @version      2017.10.11
// @description  1.彻底清理掉“黑名单用户”的提示
// @author       ejin
// @match        *://*.bilibili.com/video/av*
// @match        *://*.bilibili.com/watchlater/*
// @grant        none
// ==/UserScript==

(function() {
    if ( location.href.indexOf("bilibili.com/video/av") != -1 || location.href.indexOf("bilibili.com/watchlater") != -1 ) {
		setInterval(function(){
			if ( document.getElementsByClassName("blacklist-font-color").length > 0 ) {
				all_elem = document.getElementsByClassName("blacklist-font-color");
				for (var i = 0; i < all_elem.length; i++) {
					if ( all_elem[i].parentNode.parentNode.className.indexOf("list-item") != -1 ) {
						removeElement(all_elem[i].parentNode.parentNode);
					} else if ( all_elem[i].parentNode.parentNode.parentNode.className.indexOf("reply-item") != -1 ) {
						removeElement(all_elem[i].parentNode.parentNode.parentNode);
					}
					
				}
			}
		},1000);
    }
})();

// 兼容删除DOM节点函数
function removeElement(_element){
         var _parentElement = _element.parentNode;
         if(_parentElement){
                _parentElement.removeChild(_element);
         }
}


