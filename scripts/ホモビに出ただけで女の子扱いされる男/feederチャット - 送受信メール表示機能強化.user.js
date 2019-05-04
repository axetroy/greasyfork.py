// ==UserScript==
// @name         feederチャット - 送受信メール表示機能強化
// @author       ナイナイ岡村
// @version      0.2
// @description  受信BOX 送信BOXボタンを強化します（メールの表示を拡大します）
// @match        *.x-feeder.info/*/
// @exclude      *.x-feeder.info/*/*/*
// @grant        none
// @namespace https://greasyfork.org/users/203557
// ==/UserScript==
( () => {
  'use strict'
    const Enlarge = () => {
        const A = document.getElementsByClassName("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable")[0]
        const B = document.getElementById('dialog_frame')
        const C = document.getElementById('message_view_frame')
        const W = $(window).width()
        const HD = $('#header').height()
        const H = $(window).height() - HD
        $(A).css({
            "height" : H ,
            "width" : W ,
            "top" : HD ,
            "left" : 0 ,
        })
        $(B).css({
            "height" : H ,
            "width" : W ,
        })
        $(C).css({
            "height" : H ,
            "width" : W ,
        })
        $("#message_view_frame > *").css({
            "width" : W ,
        })
        $(window).scrollTop(0)
    }
    const observe = () => {
        const PARENT_NODE = document.getElementById('message_view_frame')
        if ( PARENT_NODE == null ) setTimeout(observe, 1);
        else Enlarge()
    }
    $('#message_menu button').click(observe)
})();