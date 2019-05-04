// ==UserScript==
// @name         feederチャット - TDN表記変換スクリプト
// @author       You
// @namespace    https://www.x-feeder.info/
// @version      0.3
// @description  入力した文章をTDN表記に変換するボタンを[投稿]の右に追加します。(平仮名と片仮名のみ)
// @match        http*://*.x-feeder.info/*/
// @grant        none
// ==/UserScript==
( () => {
  'use strict'
    const katakana_to_hiragana = (_str) => {
        return _str.replace(/[\u30a1-\u30f6]/g, (match) => {
            const chr = match.charCodeAt(0) - 0x60
            return String.fromCharCode(chr)
        })
    }
    const hiragana_to_TDN = (_str)=>{
        return _str
        .replace(/じゅう/g,'J')
        .replace(/[わをゎ]|うぃ|うぇ/g,'W')
        .replace(/[っー]/g,'')
        .replace(/あ/g,'A')
        .replace(/[いゐ]/g,'I')
        .replace(/う/g,'U')
        .replace(/[えゑ]/g,'E')
        .replace(/お/g,'O')
        .replace(/[ゔヴ](ぁ|)/g,'V')
        .replace(/[かきくけこ]/g,'K')
        .replace(/[さしすせそ]/g,'S')
        .replace(/[たつてと]/g,'T')
        .replace(/ち/g,'C')
        .replace(/[なにぬねのん]/g,'N')
        .replace(/[はひへほ]/g,'H')
        .replace(/ふ/g,'F')
        .replace(/[まみむめも]/g,'M')
        .replace(/じ([ゃゅょ]|)/g,'J')
        .replace(/[らりるれろ]/g,'R')
        .replace(/[やゆよゃゅょぁぃぅぇぉ]/g,'Y')
        .replace(/[がぎぐげご]/g,'G')
        .replace(/[ざずぜぞ]/g,'Z')
        .replace(/[だぢづでど]/g,'D')
        .replace(/[ばびぶべぼ]/g,'B')
        .replace(/[ぱぴぷぺぽ]/g,'P')
    }
    const main = () => {
        const elm =  $('#' + activeForm)
        const str = elm.val()
        elm.val(hiragana_to_TDN(katakana_to_hiragana(str)))
        $('#post_btn').focus()
    }
    $('<button>',{text:"TDN表記"}).click(main).prependTo($('#post_btn').parent())
})();