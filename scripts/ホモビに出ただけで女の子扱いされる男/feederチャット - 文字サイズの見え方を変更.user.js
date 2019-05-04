// ==UserScript==
// @name         feederチャット - 文字サイズの見え方を変更
// @author       ゲームハック研究所の管理人
// @homepage     https://www1.x-feeder.info/javascript/
// @namespace    https://www.x-feeder.info/
// @version      1.0
// @description  このスクリプトをONにするだけで、文字の大きさが変更されていても設定された大きさに強制的に変更します。
// @match        *.x-feeder.info/*/
// @exclude      *.x-feeder.info/*/*/*
// @exclude      none
// @grant        none
// ==/UserScript==
(function () {
  'use strict';

    const LETTER_SIZE = "14";//設定したい文字の大きさ

    const REG = RegExp('(?=<span style="font-size: [0-9]*px;">)(?!<span style="font-size: ' + LETTER_SIZE + 'px;">)');
    const IDIOM = '<span style="font-size: ' + LETTER_SIZE + 'px;">'

    setInterval(function(){
        const elm = document.getElementById( "feed_list" );
        const elm_c = elm.innerHTML;
        const judge = REG.test(elm_c);
        if(judge){
            elm.innerHTML = elm_c.replace( /<span style="font-size: [0-9]*px;">/g, IDIOM );
        }
    }, 500);
})();