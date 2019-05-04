// ==UserScript==
// @name         评教助手
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Zjm
// @match        http://zhjw.scu.edu.cn/student/teachingEvaluation/teachingEvaluation/evaluationPage
// @grant unsafeWindow
// ==/UserScript==



(function() {
    'use strict';
console.log('开始');
var selects = document.getElementsByClassName('header smaller lighter grey');
var newButton = document.createElement("oneClick");
newButton.innerHTML = "<button id='pingjiao'>一键评教</button>";
    console.log('设置点击事件');
selects[0].appendChild(newButton);
    $('#pingjiao').click(function(){
    one_click();
});

    console.log('设置点击事件');
function one_click(){
        console.log('初始化……');
    $('#RemainM').html('0');
    $('#RemainS').html('1');
    var choices = new Array();
    for(var i=36; i<=42;i++){
        choices[i-36] = '00000000' + i.toString();
    }
    for(var ii=82; ii<=88;ii++){
        choices[ii-73] = '00000000' + ii.toString();
    }
    for(var iii=96; iii<=99;iii++){
        choices[iii-80] = '00000000' + iii.toString();
    }
    for(var iiii=100; iiii<=102;iiii++){
        choices[iiii-80] = '0000000' + iiii.toString();
    }
    for(var iiiii=28; iiiii<=33;iiiii++){
        choices[iiiii-5] = '00000000' + iiiii.toString();
    }
    console.log('开始选择……');
    for(var j = 0;j<choices.length;j++){
        console.log(choices[j]);
        var selects = document.getElementsByName(choices[j]);
        console.log(selects.length);
        for (var iiiiii=0; iiiiii<selects.length; iiiiii++){
            console.log(selects[iiiiii].value);
            if (selects[iiiiii].value=='10_1') {
                console.log('match!');
                selects[iiiiii].checked= true;
                break;
            }
        };
    }
    selects =document.getElementsByName('zgpj');
    selects[0].value='很好的老师';
    console.log('一秒后点击按钮……');
    $("oneclick").remove();
    setTimeout("document.getElementById('buttonSubmit').onclick()", 1000);
}
})();