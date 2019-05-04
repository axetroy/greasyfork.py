// ==UserScript==
// @name         feederチャット - キリ番ゲッター
// @author       GO is GOD
// @namespace    https://www.x-feeder.info/
// @version      6.66
// @description  ゲットするキリ番の種類：ゾロ目、先頭以外全て0の数字(3桁以上)
// @match        *.x-feeder.info/*/
// @require      https://greasyfork.org/scripts/373658-feeder-chat-library/code/feeder-chat-library.js?version=667590
// @grant        none
// ==/UserScript==
(() => {
  'use strict';

    let g_flag = false // "true"にすると最初から停止した状態になる

    const ZOROME = new RegExp("^([1-9])\\1\\1+$");//ゾロ目 (3桁以上) 例:5555
    const KAMI1 = new RegExp("^([1-9])00+$");//上1桁以外全て0 (3桁以上) 例:5000
    const SIMO4 = new RegExp("0000$")//下4桁までが0 例:120000

    let top_num_log = 0

    const main = () => {
        if( g_flag ) return
        const top_num = feeder.id.top()
        if(top_num <= top_num_log) return
        top_num_log = top_num

        const next_num = top_num + 1
        if(ZOROME.test(next_num)) feeder.say(`ゾロ目の${next_num}を取りました！`)
        else if(KAMI1.test(next_num)) feeder.say(`上1桁以外全て0の${next_num}を取りました！`)
        else if(SIMO4.test(next_num)) feeder.say(`下4桁までが0の${next_num}を取りました！`)
    }

    setInterval(main,10)

    const PARENT_NODE = $("#header:first-child")
    const btn = $('<button>').prependTo( PARENT_NODE )
    const set_css = () => {
        if( g_flag ) {
            btn.text('キリ番ゲッター停止中')
            btn.css("background" , 'gray')
            btn.css("color" , 'black')
        } else {
            btn.text("キリ番ゲッター稼働中")
            btn.css("background" , 'red')
            btn.css("color" , 'yellow')
        }
    }
    btn.click(()=>{
        g_flag = g_flag ? false : true
        set_css()
    })
    set_css()
})();