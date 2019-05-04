// ==UserScript==
// @name         feederチャット - Google翻訳
// @author       You
// @namespace    https://www.x-feeder.info/
// @version      0.5
// @description  入力した文章を翻訳するボタンを[投稿]の右に追加します。
// @match        http*://*.x-feeder.info/*/
// @grant        none
// ==/UserScript==
( () => {
  'use strict'
    const translate = (a, b, c = "auto") => {
    return new Promise((d, f) => {
      const e = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + c + "&tl=" + b + "&dt=t&q=" + encodeURI(a);
      fetch(e).then((a) => {
        a.json().then((a) => {
            let sum=''
            for(let i = 0; i < a[0].length; i++){
                sum += a[0][i][0]
            }
           d(sum)
        }).catch((a) => {
          f(a)
        })
      }).catch((a) => {
        f(a)
      })
    })
  }
    const main = (language) => {
        const elm =  $('#' + activeForm)
        const str = elm.val()
        translate( str, language ).then( result => {
            elm.val(result)
        } )
        $('#post_btn').focus()
    }
    $('<div>',{text:'Google翻訳'}).prependTo($('#post_btn').parent())
    .append($('<button>',{text:"日本語"}).click(()=>{main('ja')}))
    .append($('<button>',{text:"英語"}).click(()=>{main('en')}))
    .append($('<button>',{text:"韓国語"}).click(()=>{main('ko')}))
    .append($('<button>',{text:"中国語"}).click(()=>{main('zh-CN')}))
    .append($('<button>',{text:"ロシア語"}).click(()=>{main('ru')}))
    .append($('<button>',{text:"アラビア語"}).click(()=>{main('ar')}))
    .append($('<button>',{text:"アムハラ語"}).click(()=>{main('am')}))
    .append($('<button>',{text:"エスペラント語"}).click(()=>{main('eo')}))
    //.append($('<button>',{text:"アゼルバイジャン語"}).click(()=>{main('az')}))
})();