// ==UserScript==
// @name         feederチャット - 自動挨拶
// @author       イキスギた男
// @homepage     https://www1.x-feeder.info/javascript/
// @namespace    https://www.x-feeder.info/
// @version      1.3
// @description  このスクリプトをONにするだけで、入退室を検知したとき自動で挨拶してくれます。
// @match        http*://*.x-feeder.info/*/
// @exclude
// @grant        none
// ==/UserScript==
(function () {
  'use strict'
    const Hello = "こんです。"//入室に対する挨拶
    const SeeYou = "ﾉｼです。"//退室に対する挨拶
    const WelcomeBack = "おかえり。" // おかえり
    /* 挨拶しない人の名前リスト */
    const NG_LIST =
`
名無し
カリスマ
かつまる
`
    .split('\n')

    const say = ( _text ) => {
        const elm = $('#' + activeForm)
        if(elm.val().length) return // 入力中なら自動挨拶をしない
        elm.val(_text)
        $("#post_btn").click()
    }
    const array = []
    let log
    const make_greeting = () => {//挨拶を作る
        const str = $($('.join_and_leave')[0]).text()
        if(log === str) return null
        log = str
        const separate_position = str.lastIndexOf('さんが')
        const name = str.slice(1,separate_position)
        if(NG_LIST.indexOf(name) !== -1) return null
        const name2 = name + 'さん、'
        const access = str.slice(separate_position,str.lastIndexOf('しました'))
        if(access.indexOf("入室") !== -1){
            if( array.indexOf(name) === -1 ){
                array.push(name)
                return name2 + Hello
            }
            return name2 + WelcomeBack
        }
        else return name2 + SeeYou
    }
    const main = () => {
        const greet = make_greeting()
        if( greet ) say(greet)
    }
    setInterval( main , 2000);
})()