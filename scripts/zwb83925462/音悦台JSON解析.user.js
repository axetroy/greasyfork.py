// ==UserScript==
// @name            音悦台JSON解析
// @namespace        https://zhang18.top
// @version          0.3
// @description      点击MV标题右边的JSON即可跳转至JSON页面
// @author          ZLOE
// @match           http*://v.yinyuetai.com/video/*
// @runat           document-end
// @grant           GM_download
// ==/UserScript==

(function() {
    'use strict';
    var YYTjson =document.createElement("span");
    YYTjson.setAttribute("class","op-list");
    YYTjson.innerHTML="&#160;&#160;&#160;&#160;&#160;&#160;"+"JSON".link("http://www.yinyuetai.com/insite/get-video-info?json=true&videoId="+videoId)+"<hr />";
    YYTjson.children[0].style.color="#7e7e7e";
    YYTjson.children[0].style.fontSize="16px";
    YYTjson.title=videoId;
    YYTjson.onmouseout=function(){YYTjson.children[0].style.color="#7e7e7e";}
    YYTjson.onmouseover=function(){YYTjson.children[0].style.color="#020202";}
    document.getElementsByClassName("operation")[0].appendChild(YYTjson);
})();