// ==UserScript==
// @name         feederチャット - 指定した時間に投稿
// @author       ゲームハック研究所の管理人
// @homepage     https://www1.x-feeder.info/javascript/
// @namespace    https://www.x-feeder.info/
// @version      0.1
// @description  スクリプト使用者のPCがfeederサーバー上の現在時刻よりも数秒遅れている場合がある。そのときは、引いた時刻を入力する。
// @match        http*://*.x-feeder.info/*
// @grant        none
// ==/UserScript==
(function () {
'use strict';

var g_flag = null;

    function get_time(){//現在時刻を返す
        var jikan= new Date();
var hour = jikan.getHours();
var minute = jikan.getMinutes();
var second = jikan.getSeconds();
return ( hour + ':' + minute + ':' + second );
}
    function write(_text){//書き込み
document.getElementById( "post_form_single" ).value = _text ;
document.getElementById( "post_form_multi" ).value = _text ;
document.getElementById("post_btn").click();
};

function main1_input(){
    var time = prompt('投稿したい時間を「:」で区切って入力してください。');
    if(time == null || time == '')return false;
    var sentence = prompt('発言内容を入力してください。');
    if(sentence == null || sentence == '')return false;
    g_flag = true;
    main2_loop(time , sentence);
    return alert('開始します。')
};

    function main2_loop(time , sentence){
var loop = setInterval(
    function(){
        if(time == get_time()){
            g_flag = false;
            write(sentence);
        }
        if(g_flag != true) clearInterval(loop);
    },1000)
    };

    var NewButton = document.createElement("button");
    NewButton.setAttribute("id", "to_time_btn");
    NewButton.innerHTML = "タイマー";
    document.getElementById("post_btn").parentNode.appendChild(NewButton);
    $('#to_time_btn').click(function(){//idを押したときに発火するイベント
         main1_input();
    });

})();