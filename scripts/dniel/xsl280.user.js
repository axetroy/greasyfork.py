// ==UserScript==
// @name         xsl280
// @namespace    http://xsl280.com/
// @version      1.1
//@require       http://*.xsl280.com/js/jquery.js
// @description  28游戏N余几，投注同选功能
// @author       蓝天碧海；QQ：86886306
// @match        http://*.xsl280.com/game/?g*
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
         var heard = document.head.getElementsByTagName("title")[1];
         heard.parentNode.insertBefore(script, heard);
                  
}  
    loadScriptString('$.fn.extend({AMakeit:function(varabool){for(i=0;i<varabool.length;i++){if(varabool[i]){$("#"+cbids[i]).attr("checked",true);$("#"+tbids[i]).attr("value",astandmoney[i])}}$.fn.AUpdateMoney();if(varabool[varabool.length-1].indexOf("mClear")!=-1){for(i=0;i<varabool.length;i++){$("#"+cbids[i]).removeAttr("checked");$("#"+tbids[i]).attr("value","")}$.fn.AUpdateMoney()}else if(varabool[varabool.length-1].indexOf("mOpside")!=-1){for(i=0;i<varabool.length;i++){if(varabool[i]){$("#"+cbids[i]).attr("checked",true);$("#"+tbids[i]).attr("value",astandmoney[i])}else{$("#"+cbids[i]).removeAttr("checked");$("#"+tbids[i]).attr("value","")}}$.fn.AUpdateMoney()}}});$.fn.extend({AOpside:function(){var abool=new Array();for(i=0;i<anum.length;i++){if($("#"+cbids[i]).attr("checked")){abool.push(false)}else{abool.push(true)}}abool.push("mOpside");$.fn.AMakeit(abool)}});$.fn.extend({AClearAll:function(){var abool=new Array();for(i=0;i<anum.length;i++){abool.push(false)}abool.push("mClear");$.fn.AMakeit(abool)}});');
    })();