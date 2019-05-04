// ==UserScript==
// @name         surviv.io - 縛りプレイ
// @author       ゲームハック研究所の管理人
// @homepage     https://www1.x-feeder.info/javascript/
// @namespace    https://www.x-feeder.info/
// @version      0.2
// @description  このスクリプトをONにするだけで、surviv.ioの難易度を上げることができます。
// @match        http*://surviv.io
// @match        http*://surviv2.io/
// @match        http*://2dbattleroyale.com/
// @grant        none
// ==/UserScript==
(function () {
  'use strict';
    function hide(_elm){
        _elm.style.display ='none';
    }
    hide(document.getElementById("ui-health-counter"));//HPバー
    hide(document.getElementById("ui-current-clip"));//残りの装弾数
    hide(document.getElementById("ui-gas-icon"));//ガスアイコン
    hide(document.getElementById("ui-gas-timer"));//ガスタイマー
    hide(document.getElementById("ui-leaderboard-alive"));//生存数
    hide(document.getElementById("ui-leaderboard").getElementsByClassName('ui-leaderboard-header')[0]);//生存の文字
    hide(document.getElementById("ui-kill-counter"));//kill数
    hide(document.getElementById("ui-kill-counter-wrapper").getElementsByClassName("ui-kill-counter-header")[0]);//kill数文字
    hide(document.getElementById("ui-top-left"));//teamHP
    hide(document.getElementById("ui-boost-counter"));//アドレナリンバー
    //hide(document.getElementById("ui-medical-interactive"));//回復手段
})();