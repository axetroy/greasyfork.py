// ==UserScript==
// @name         pixiv收藏整理②未分类列表
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        https://www.pixiv.net/bookmark.php?untagged=*
// @match        https://www.pixiv.net/bookmark.php?untagged=1&rest=show&p=*
// @grant        none
// @require    http://code.jquery.com/jquery-1.11.0.min.js  
// ==/UserScript==

(function() {
    'use strict';
    //alert("Hello World");
    //document.write("Hello World");
    // Your code here...
    
    var div01 = document.getElementsByClassName('display_editable_works');
    var div02 = div01[0].childNodes;
    var div03 = div02[0].childNodes;
    if (div03.length>0){
        for(var i=2;i<div03.length;i++){
            var image0 = div03[i];
            var href1 = image0.getElementsByTagName("a")[1];
            if (href1!=null){
                var url1 = href1.href;
                window.location.href = url1;
                break;
            }else{
                //alert("找不到图片地址！可能是因为已删除！");
            }
        }
    }else{
        alert("全部处理完毕！");
    }
})();