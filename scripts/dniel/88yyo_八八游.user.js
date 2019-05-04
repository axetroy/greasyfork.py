// ==UserScript==
// @name         88yyo_八八游
// @namespace    http://88yyo.com/
// @version      1.2
// @description  28游戏N余几，投注同选功能
// @author       蓝天碧海；QQ：86886306
// @match        https://88yyo.com/index.php?m=game*
// @grant        none
// ==/UserScript==
(function () {
   'use strict';
var Nums=new Array(3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18);
function loadScriptString(code) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    try {
        script.appendChild(document.createTextNode(code));
    } catch (ex) {
        script.text = code;
    }
    document.body.appendChild(script);
}
    loadScriptString('function mInsert(varabool){for(i=0;i<varabool.length;i++){if(varabool[i]){$("#Chk"+(i+stNum)).prop("checked",true);$("#Num"+(i+stNum)).prop("value",aPoint[i])}}updPoints();if(varabool[varabool.length-1].indexOf("mClear")!=-1){for(i=0;i<varabool.length;i++){$("#Chk"+(i+stNum)).prop("checked",false);$("#Num"+(i+stNum)).prop("value","")}updPoints()}else if(varabool[varabool.length-1].indexOf("mOpside")!=-1){for(i=0;i<varabool.length;i++){if(varabool[i]){$("#Chk"+(i+stNum)).prop("checked",true);$("#Num"+(i+stNum)).prop("value",aPoint[i])}else{$("#Chk"+(i+stNum)).prop("checked",false);$("#Num"+(i+stNum)).prop("value","")}}updPoints()}}function mOpside(){var abool=new Array();for(i=0;i<Nums.length;i++){if($("#Chk"+(i+stNum)).prop("checked")){abool.push(false)}else{abool.push(true)}}abool.push("mOpside");mInsert(abool)}function mClear(){var abool=new Array();for(i=0;i<Nums.length;i++){abool.push(false)}abool.push("mClear");mInsert(abool)}');


})();