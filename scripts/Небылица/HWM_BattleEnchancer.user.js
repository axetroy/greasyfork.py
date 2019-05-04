// ==UserScript==
// @name         HWM_BattleEnchancer
// @namespace    Небылица
// @version      0.5
// @description  Улучшения функционала боёв
// @author       Небылица
// @include      /^https{0,1}:\/\/((www|qrator)\.heroeswm\.ru|178\.248\.235\.15)\/war\.php/
// ==/UserScript==

(function() {
    "use strict";

    // Вспомогательные функции
    function loadingTimeoutWrapper(){ // Обёртка под ожидание прогрузки
        var finishBattleCloseButton = document.getElementById("finish_battle_close");

        if (finishBattleCloseButton !== null){
            // сдвиг кнопки закрытия окошка с результатами боя
            finishBattleCloseButton.style.margin = "5px 10px 0px 0px";
            finishBattleCloseButton.style.height = "32px";
            finishBattleCloseButton.style.width = "32px";
        } else{
            window.setTimeout(function(){loadingTimeoutWrapper();}, 250);
        }
    }


    // Обёртка под ожидание прогрузки
    loadingTimeoutWrapper();
})();