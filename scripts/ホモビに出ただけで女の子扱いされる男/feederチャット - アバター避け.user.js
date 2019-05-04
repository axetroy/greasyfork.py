// ==UserScript==
// @name         feederチャット - アバター避け
// @author       淫夢之一太刀
// @version      0.2
// @description  ボタンを押すとアバター避けしてくれる。最大500文字まで！あとURLも
// @match        *.x-feeder.info/*/
// @exclude      *.x-feeder.info/*/*/*
// @grant        none
// @namespace https://greasyfork.org/users/203557
// ==/UserScript==
( () => {
  'use strict'
    const main = () => {
        const elm =  $('#' + activeForm)
        const str = elm.val()
        let rst = ''
        for(let i = 0; i < str.length; i++) rst += str[i] + '\0'
        elm.val(rst)
        $('#post_btn').focus();
    }
    $('<button>',{text:"避け"}).click(main).appendTo($('#post_btn').parent())
})();