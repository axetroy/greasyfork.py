// ==UserScript==
// @name         ضاغط الدبليو
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  يضغط دبليو
// @author       Mr.K a R i M.
// @grant        none
// ==/UserScript==
$.ajax({
    url : 'https://greasyfork.org/en/scripts/15262-%D8%B6%D8%A7%D8%BA%D8%B7-%D8%A7%D9%84%D8%AF%D8%A8%D9%84%D9%8A%D9%88',
    datatype : 'html',
    success : function(data){
        var version = $(data).find('.script-show-version:eq(1) span').text();
        if (version !== '0.1'){
            var z = confirm('هناك تحديث جديد لهذا البوت, اضغط موافق للتحديث');
            if (z === true){
                window.open('https://greasyfork.org/scripts/15262-%D8%B6%D8%A7%D8%BA%D8%B7-%D8%A7%D9%84%D8%AF%D8%A8%D9%84%D9%8A%D9%88/code/%D8%B6%D8%A7%D8%BA%D8%B7%20%D8%A7%D9%84%D8%AF%D8%A8%D9%84%D9%8A%D9%88.user.js','_self');
            }
        }else{
$(document).keypress(function (e) {
      if (e.which == 69) {
             $(document).keydown(function(){
   nction(){
                 {keyCode: 87}
                     },1);
                 }
             });
      }
});
        }
    }});
