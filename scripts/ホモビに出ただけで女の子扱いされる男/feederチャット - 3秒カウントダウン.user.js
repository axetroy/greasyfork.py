// ==UserScript==
// @name         feederチャット - 3秒カウントダウン
// @author       ゲームハック研究所の管理人
// @homepage     https://www1.x-feeder.info/javascript/
// @namespace    https://www.x-feeder.info/
// @version      3.0
// @description  3秒間カウントダウンするボタンを投稿ボタンの右に追加します。
// @match        http*://*.x-feeder.info/*/
// @require https://greasyfork.org/scripts/373658-feeder-chat-library/code/feeder-chat-library.js?version=641471
// @grant        none
// ==/UserScript==
(function () {
  'use strict';
    let Count3_flag = false;
    const main = () => {
        if(Count3_flag == true)return 0;
        Count3_flag = true;
    let num = 3 ;
    const Auto_count = setInterval(function(){
        if(num<=0){
            document.getElementById("is_special").click();
            const alert_function_copy = window.confirm;
            window.confirm = isNaN;
            feeder.say('START');
            window.confirm = alert_function_copy;
            clearInterval(Auto_count);
            Count3_flag = false;
        }
        else{
        feeder.say(num);
        num--;
        }
    }, 1000);
    }
    feeder.add.right("3秒カウント", () => {main();});
})();