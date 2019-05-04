// ==UserScript==
// @name         feederチャット - 文字カラー指定の見え方を変更
// @author       ゲームハック研究所の管理人
// @homepage     https://www1.x-feeder.info/javascript/
// @namespace    https://www.x-feeder.info/
// @version      1.0
// @description  このスクリプトをONにするだけで、文字の色が変更されていても設定された色に強制的に変更します。
// @match        http*://*.x-feeder.info/*
// @exclude      none
// @grant        none
// ==/UserScript==
(function () {
  'use strict';

    const LETTER_COLOR = "000000";//設定したい文字の色（16進数）

    const REG = RegExp('(?=<span style="color: #[0-9A-F]{6};">)(?!<span style="color: #' + LETTER_COLOR + ';">)');
    const IDIOM = '<span style="color: #' + LETTER_COLOR + ';">'

    setInterval(function(){
        var elm = document.getElementById( "feed_list" );
        var elm_c = elm.innerHTML;
        var judge = REG.test(elm_c);
        if(judge){
            elm.innerHTML = elm_c.replace( /<span style="color: #[0-9A-F]{6};">/g, IDIOM );
        }
    }, 500);
})();