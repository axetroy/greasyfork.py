// ==UserScript==
// @name         搶慈濟大學通識課
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://linuxweb.tcust.edu.tw/st/tad/stsel.php*
// @match        http://203.64.35.175/st/tad/stsel.php*
//@require https://code.jquery.com/jquery-3.3.1.min.js
// @grant        none
//@run-at  document-end
// ==/UserScript==


(function() {
    'use strict';
        var r= $('<input type="button" id="r" value="搶身心殘障照護"/>');
    var a = $('<input type="button" id="a"  value="搶創新護理"/>');
    var b = $('<input type="button" id="b" value="搶情緒管理"/>');
        $("form>table").prepend(r);
    $("form>table").prepend(a);
    $("form>table").prepend(b);

     $('#r').click(function(){
  grab('N1SP6A')
 });

         $('#a').click(function(){
  grab('N1826A')
 });
         $('#b').click(function(){
  grab('N16Q6A')
 });

    //每0.1秒執行一次
setTimeout(function(){
    LoopExcute();
}, 100);

})();
function grab(subId){
    $("select[name='fmSubjId1']").val(subId);
    document.fmEdit.fmSubjId0.value = subId;
    console.log('目前選中的選修課ID:'+subId);
    document.fmEdit.OpType.value="加選";
    document.fmEdit.action="stsel.php?subId="+subId;
    document.fmEdit.submit();
}

function LoopExcute(){
    //從url的query string取得參數
  var selectValue = location.search.split('subId=')[1]
    if(selectValue!=''&&selectValue!=undefined){
     document.fmEdit.fmSubjId0.value = selectValue;
    console.log('目前選中的選修課ID:'+selectValue);
    document.fmEdit.OpType.value="加選";
    document.fmEdit.action="stsel.php?subId="+selectValue;;
    document.fmEdit.submit();
    }
}

