// ==UserScript==
// @name         淘宝&天猫,产品大图地址提取
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  ""
// @author       You
// @match        https://detail.tmall.com/item.htm?*
// @match        http://detail.tmall.com/item.htm?*
// @match        https://item.taobao.com/item.htm?*
// @match        http://item.taobao.com/item.htm?*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var J_UlThumb = null;
    if(!document.getElementById("J_Social") && !document.getElementById("J_DetailMeta")){
      return true;
    }
    if(window.location.href.indexOf('taobao.com') > 0){
        J_UlThumb = document.getElementById("J_Social").getElementsByTagName('ul')[0];
        var li =  document.createElement("li");li.className = "tb-social-split";
        J_UlThumb.appendChild(li);
    }else{
        J_UlThumb = document.getElementById("J_DetailMeta").children[0].children[1].children[2];
    }
    var li2 =  document.createElement("li");
    li2.className = "text";
    var a = document.createElement("a");
    a.onclick = function(){
       var url = document.getElementById("J_ImgBooth").src;
       var del_right = url.indexOf(".jpg");
       url = url.substring(0,del_right) + ".jpg";
       window.open(url);
    };
    a.innerText = "打开图片";
    a.href = "javascript:void(0)";
    if(window.location.href.indexOf('taobao.com') > 0){
      li2.appendChild(a);
      J_UlThumb.appendChild(li2);
    }else{
      J_UlThumb.appendChild(a);
    }
    // Your code here...
})();