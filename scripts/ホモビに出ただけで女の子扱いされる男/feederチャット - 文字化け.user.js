// ==UserScript==
// @name         feederチャット - 文字化け
// @author       驥守坤蜈郁ｼｩ
// @version      0.2
// @description  ボタンを押すと文字化けにさせる。変換方式は、utf-8でエンコードしたものをShift_JISにデコードしたもの
// @match        *.x-feeder.info/*/
// @exclude      *.x-feeder.info/*/*/*
// @grant        none
// @namespace https://greasyfork.org/users/203557
// ==/UserScript==
( () => {
  'use strict'
    const LoadScript = ( _url ) => {
        const elm = document.createElement("script")
        elm.src = _url
        return elm
    }
    document.body.appendChild( LoadScript( 'https://raw.githubusercontent.com/inexorabletash/text-encoding/master/lib/encoding.js' ) )
    const main = () => {
        const elm =  $('#' + activeForm)
        const str = elm.val()
        const rst = new TextDecoder("sjis").decode( new TextEncoder("utf-8").encode(str) )
        elm.val(rst)
        $('#post_btn').focus();
    }
    $('<button>',{text:"文字化け"}).click(main).appendTo($('#post_btn').parent())
})();