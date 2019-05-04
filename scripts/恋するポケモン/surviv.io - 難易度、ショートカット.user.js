// ==UserScript==
// @name         surviv.io - 難易度、ショートカット
// @name:en      surviv.io - difficulty and shortcut
// @author       恋するポケモン（恋ポケ）
// @homepage     https://www1.x-feeder.info/script_test_room/
// @namespace https://www.x-feeder.info/
// @version      2.5
// @description  広告のブロック、surviv.ioの難易度変更ボタンやのショートカットボタンを追加します。
// @description:en Add ad block, surviv.io's difficulty change button and shortcut button.
// @match http*://*surviv2.io*
// @match http*://*2dbattleroyale.com*
// @match http*://*2dbattleroyale.org*
// @match http*://*piearesquared.info*
// @match http*://*thecircleisclosing.com*
// @match http*://*surviv.io*
// @grant        none
// ==/UserScript==
(function () {
  'use strict';
function delAds(eID){
    if (document.getElementById(eID)){
        document.getElementById(eID).remove();
    }
}
setInterval(function() {
    delAds("main-med-rect-blocked");
    delAds("surviv-io_300x250");
    delAds("surviv-io_728x90");
    document.getElementById("ad-block-left").getElementsByTagName("script").remove();
},1000);

setTimeout(function(){
let thebaba = document.getElementById("ui-map-wrapper");
let thecocuk = document.createElement("div");
    thecocuk.innerHTML = '<div id="moji" style="margin-left: 200px; color: black; font-size:30px;">Local Mode Play</div>';
    thebaba.appendChild(thecocuk);
    thebaba.insertBefore(thebaba.firstChild, thecocuk);
},0);

    function hide(_elm){
        _elm.style.display ='none';}

    function show(_elm){
        _elm.style.display ='block';}

var testTimer1;
function startTimer1(){
testTimer1=setInterval(function(){
hide(document.getElementById("ui-map-info"));
hide(document.getElementById("ui-upper-center"));
hide(document.getElementById("ui-spec-counter"));
hide(document.getElementById("ui-bottom-center-1"));
hide(document.getElementById("ui-bottom-center-2"));
hide(document.getElementById("ui-lower-center"));
hide(document.getElementById("ui-team-indicators"));
}, 500);
};
function stopTimer1(){
clearInterval(testTimer1);
};

var testTimer2;
function startTimer2(){
testTimer2=setInterval(function(){
show(document.getElementById("ui-map-info"));
show(document.getElementById("ui-upper-center"));
show(document.getElementById("ui-spec-counter"));
show(document.getElementById("ui-bottom-center-1"));
show(document.getElementById("ui-bottom-center-2"));
show(document.getElementById("ui-lower-center"));
show(document.getElementById("ui-team-indicators"));
}, 500);
};
function stopTimer2(){
clearInterval(testTimer2);
};

    function main(){
    hide(document.getElementById("ui-health-counter"));//HPバー
    hide(document.getElementById("ui-current-clip"));//残りの装弾数
    hide(document.getElementById("ui-map-info"));//ガスタイマー
    hide(document.getElementById("ui-leaderboard-alive"));//生存数
    hide(document.getElementById("ui-leaderboard").getElementsByClassName('ui-leaderboard-header')[0]);//生存の文字
    hide(document.getElementById("ui-kill-counter"));//kill数
    hide(document.getElementById("ui-kill-counter-wrapper").getElementsByClassName("ui-kill-counter-header")[0]);//kill数文字
    hide(document.getElementById("ui-top-left"));//teamHP
    hide(document.getElementById("ui-boost-counter"));//アドレナリンバー
    hide(document.getElementById("btn-game-quit"));//試合から撤退ボタン
    hide(document.getElementById("ui-killfeed-contents"));//右上のメッセージ
    hide(document.getElementById("ui-team-indicators"));//チームの居場所
    };

    var NewButton1 = document.createElement("button");
  NewButton1.setAttribute("id", "Local_Mode");
  NewButton1.setAttribute("class", "btn-green btn-darken menu-option");
  NewButton1.innerHTML = "Hard Mode：OFF";
  NewButton1.style.color = "blue";
  NewButton1.style.backgroundColor = "white";
  NewButton1.style.borderButtom = "2px solid rgb(96, 96, 96)";
  NewButton1.style.boxShadow = "rgb(96, 96, 96) 0px -2px inset";
  window.myFunc = function () {
  main();
  startTimer1();
  stopTimer2();
  document.getElementById("moji").innerHTML = "Hard Mode Play";
  document.getElementById("moji").style.color = "#FF0000";
  hide(document.getElementById("Local_Mode"));
  show(document.getElementById("Hard_Mode"));
  hide(document.getElementById("MLocal_Mode"));
  hide(document.getElementById("MHocal_Mode"));
  };
NewButton1.addEventListener('click', window.myFunc);
  document.getElementById("btn-start-solo").parentNode.appendChild(NewButton1);
var reference1 = document.getElementById('btn-start-solo');
reference1.parentNode.insertBefore(NewButton1, reference1);

    function mained(){
    show(document.getElementById("ui-health-counter"));//HPバー
    show(document.getElementById("ui-current-clip"));//残りの装弾数
    show(document.getElementById("ui-map-info"));//がす
    show(document.getElementById("ui-leaderboard-alive"));//生存数
    show(document.getElementById("ui-leaderboard").getElementsByClassName('ui-leaderboard-header')[0]);//生存の文字
    show(document.getElementById("ui-kill-counter"));//kill数
    show(document.getElementById("ui-kill-counter-wrapper").getElementsByClassName("ui-kill-counter-header")[0]);//kill数文字
    show(document.getElementById("ui-top-left"));//teamHP
    document.getElementById("ui-boost-counter").style = "opacity: 0;";//アドレナリンバー
    show(document.getElementById("btn-game-quit"));//試合から撤退ボタン
    show(document.getElementById("ui-killfeed-contents"));//右上のメッセージ
    show(document.getElementById("ui-team-indicators"));//チームの居場所
    };

    var NewButton2 = document.createElement("button");
  NewButton2.setAttribute("id", "Hard_Mode");
  NewButton2.setAttribute("class", "btn-green btn-darken menu-option");
  NewButton2.innerHTML = "Hard Mode：ON";
  NewButton2.style.color = "yellow";
  NewButton2.style.backgroundColor = "red";
  NewButton2.style.borderBottom = "2px solid rgb(85, 0, 0)";
  NewButton2.style.boxShadow = "rgb(85, 0, 0) 0px -2px inset";
  window.myFunc = function () {
  mained();
  startTimer2();
  stopTimer1();
  document.getElementById("moji").innerHTML = "Local Mode Play";
  document.getElementById("moji").style.color = "#000000";
  hide(document.getElementById("Hard_Mode"));
  show(document.getElementById("Local_Mode"));
  show(document.getElementById("MLocal_Mode"));
  hide(document.getElementById("MHocal_Mode"));
  };
NewButton2.addEventListener('click', window.myFunc);
  document.getElementById("btn-start-solo").parentNode.appendChild(NewButton2);
var reference2 = document.getElementById('btn-start-solo');
reference2.parentNode.insertBefore(NewButton2, reference2);

    var NewButton3 = document.createElement("button");
  NewButton3.setAttribute("id", "MLocal_Mode");
  NewButton3.setAttribute("class", "btn-green btn-darken menu-option");
  NewButton3.innerHTML = "Maximum Hard Mode：OFF";
  NewButton3.style.color = "blue";
  NewButton3.style.backgroundColor = "white";
  NewButton3.style.borderButtom = "2px solid rgb(96, 96, 96)";
  NewButton3.style.boxShadow = "rgb(96, 96, 96) 0px -2px inset";
  window.myFunc = function () {
  document.getElementById("moji").innerHTML = "Maximum Hard Mode Play";
  document.getElementById("moji").style.color = "#FF0000";
  hide(document.getElementById("ui-game"));
  hide(document.getElementById("Local_Mode"));
  hide(document.getElementById("Hard_Mode"));
  hide(document.getElementById("MLocal_Mode"));
  show(document.getElementById("MHard_Mode"));
  };
NewButton3.addEventListener('click', window.myFunc);
  document.getElementById("btn-start-solo").parentNode.appendChild(NewButton3);
var reference3 = document.getElementById('btn-start-solo');
reference3.parentNode.insertBefore(NewButton3, reference3);

    var NewButton4 = document.createElement("button");
  NewButton4.setAttribute("id", "MHard_Mode");
  NewButton4.setAttribute("class", "btn-green btn-darken menu-option");
  NewButton4.innerHTML = "Maximum Hard Mode：ON";
  NewButton4.style.color = "yellow";
  NewButton4.style.backgroundColor = "red";
  NewButton4.style.borderBottom = "2px solid rgb(85, 0, 0)";
  NewButton4.style.backgroundColor = "red";
  NewButton4.style.boxShadow = "rgb(85, 0, 0) 0px -2px inset";
  window.myFunc = function () {
  document.getElementById("moji").innerHTML = "Local Mode Play"();
  document.getElementById("moji").style.color = "#000000";
  show(document.getElementById("ui-game"));
  show(document.getElementById("Local_Mode"));
  hide(document.getElementById("Hard_Mode"));
  show(document.getElementById("MLocal_Mode"));
  hide(document.getElementById("MHard_Mode"));
  };
NewButton4.addEventListener('click', window.myFunc);
  document.getElementById("btn-start-solo").parentNode.appendChild(NewButton4);
var reference4 = document.getElementById('btn-start-solo');
reference4.parentNode.insertBefore(NewButton4, reference4);

function DUO(){
document.getElementById("btn-create-team").click();
setTimeout(function(){
document.getElementById("btn-team-queue-duo").click();
document.getElementById("btn-team-fill-none").click();
document.getElementById("btn-start-team").click();
},750);
};

var NewButton5 = document.createElement("button");
  NewButton5.setAttribute("id", "solo_duo");
  NewButton5.setAttribute("class", "btn-green btn-darken menu-option");
  NewButton5.innerHTML = "solo:duo";
  NewButton5.style.display = "inline-block";
  NewButton5.style.width = "50%";
  NewButton5.style.backgroundColor = "rgb(255, 30, 30)";
  NewButton5.style.borderBottom = "2px solid rgb(255, 0, 0)";
  NewButton5.style.boxShadow = "rgb(255, 0, 0) 0px -2px inset";
  window.myFunc = function () {
DUO();
  };
NewButton5.addEventListener('click', window.myFunc);
  document.getElementById("btn-start-solo").parentNode.appendChild(NewButton5);
var reference5 = document.getElementById('btn-start-solo');
reference5.parentNode.insertBefore(NewButton5, reference5);

function SQUAD(){
document.getElementById("btn-create-team").click();
setTimeout(function(){
document.getElementById("btn-team-queue-squad").click();
document.getElementById("btn-team-fill-none").click();
document.getElementById("btn-start-team").click();
},750);
};

var NewButton6 = document.createElement("button");
  NewButton6.setAttribute("id", "solo_squad");
  NewButton6.setAttribute("class", "btn-green btn-darken menu-option");
  NewButton6.innerHTML = "solo:squad";
  NewButton6.style.display = "inline-block";
  NewButton6.style.width = "50%";
  NewButton6.style.backgroundColor = "rgb(150, 0, 0)";
  NewButton6.style.borderBottom = "2px solid rgb(100, 0, 0)";
  NewButton6.style.boxShadow = "rgb(100, 0, 0) 0px -2px inset";
  window.myFunc = function () {
SQUAD();
  };
NewButton6.addEventListener('click', window.myFunc);
  document.getElementById("btn-start-solo").parentNode.appendChild(NewButton6);
var reference6 = document.getElementById('btn-start-solo');
reference6.parentNode.insertBefore(NewButton6, reference6);

hide(document.getElementById("Hard_Mode"));
hide(document.getElementById("MHard_Mode"));
hide(document.getElementById("start-bottom-left"));
hide(document.getElementById("start-bottom-middle"));
document.getElementById("ad-block-left").insertBefore(document.getElementById("solo_squad"), document.getElementById("ad-block-left").firstChild);
document.getElementById("ad-block-left").insertBefore(document.getElementById("solo_duo"), document.getElementById("ad-block-left").firstChild);
document.getElementById("ad-block-left").insertBefore(document.getElementById("MLocal_Mode"), document.getElementById("ad-block-left").firstChild);
document.getElementById("ad-block-left").insertBefore(document.getElementById("MHard_Mode"), document.getElementById("ad-block-left").firstChild);
document.getElementById("ad-block-left").insertBefore(document.getElementById("Local_Mode"), document.getElementById("ad-block-left").firstChild);
document.getElementById("ad-block-left").insertBefore(document.getElementById("Hard_Mode"), document.getElementById("ad-block-left").firstChild);
})();