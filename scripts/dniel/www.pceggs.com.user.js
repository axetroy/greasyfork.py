// ==UserScript==
// @name         www.pceggs.com
// @namespace    https://www.pceggs.com
// @version      1.0
// @description  28游戏N余几，投注同选功能
// @author       蓝天碧海；QQ：86886306
// @match        http://www.pceggs.com/play/pg28Insert.aspx?LID*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    function loadScriptString(code) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    try {
        script.appendChild(document.createTextNode(code));
    } catch (ex) {
        script.text = code;
    }      
        var heard = document.head.getElementsByTagName("style")[0];
        heard.parentNode.insertBefore(script, heard);       
    }      
      loadScriptString('$(document).ready(function(){function adsbut(){$(".img_bt1").click(function(){var i=$(this).attr("attr");$(this).css("background-image","url(/img/pg28/img_bt2.gif)");setValue(i);getAllpceggs()}).hover(function(){$(this).css("color","#FF6600")},function(){$(this).css("color","#515151")})}$(".img_bt1").unbind("click");$(".img_bt1").bind("click",function(){adsbut()});function setValue(num){if(num==39){clear();num=Math.floor(Math.random()*6+1);num=parseInt(num)}SetModeId=num;for(var i=0;i<mode[num].length;i++){var id_num=mode[num][i];var id_name="#txt"+mode[num][i];if(!$(id_name).attr("readonly")){$(id_name).val(nub[id_num]);$(id_name).parent().prev("td").children("input").attr("checked",true)}}}})');
})();