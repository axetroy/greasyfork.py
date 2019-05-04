// ==UserScript==
// @name         feederチャット - へた字変換スクリプト
// @author       You
// @namespace    https://www.x-feeder.info/
// @version      3.1
// @description  入力した文章をへた字に変換するボタンを[投稿]の右に追加します。
// @match        http*://*.x-feeder.info/*/
// @grant        none
// ==/UserScript==
(function () {
  'use strict';
    const array = [
        [ 'い' , "ɭ ɿ" ],
        [ 'う' , "੭ੇ" ],
        [ 'き' , "₹" ],
        [ 'く' , "ㄑ" ],
        [ 'け' , "ιϯ" ],
        [ 'さ' , "ㄜ" ],
        [ 'し' , "ᒐ" ],
        [ 'す' , "व" ],
        [ 'せ' , "ㄝ" ],
        [ 'ち' , "ㄘ" ],
        [ 'つ' , "⊃" ],
        [ 'っ' , "ᘄ" ],
        [ 'て' , "ح" ],
        [ 'と' , "೬" ],
        [ 'の' , "၈" ],
        [ 'ふ' , "৴ડેヽ" ],
        [ 'へ' , "ㄟ" ],
        [ 'も' , "ŧ" ],
        [ 'よ' , "꒭" ],
        [ 'ら' , "ʖˋ" ],
        [ 'り' , "၊၂" ],
        [ 'る' , "ʓ" ],
        [ 'れ' , "ૠ" ],
        [ 'ろ' , "Ʒ" ],
        [ 'ん' , "Խ"],
    ];
    const replace = (_letter) => {
        for(let i = 0; i < array.length; i++ ){
            if(_letter === array[i][0]) return array[i][1]
        }
        return _letter
    };
    const main = () => {
        const elm =  $('#' + activeForm)
        const str = elm.val()
        let rst = ''
         for (let i = 0; i < str.length; i++) {
              rst += replace(str[i])
          }
        elm.val(rst)
        $('#post_btn').focus()
    }
    $('<button>',{text:"へた字"}).click(main).prependTo($('#post_btn').parent())
})();