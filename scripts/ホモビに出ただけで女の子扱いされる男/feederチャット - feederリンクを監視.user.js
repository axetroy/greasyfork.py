// ==UserScript==
// @name         feederチャット - feederリンクを監視
// @author       aiueo700
// @version      0.2
// @description  feederリンクを監視して、もし人がいればそのページを別タブで開きます。@matchに監視する部屋を書いてください。監視される部屋ではありません。
// @match        https://www2.x-feeder.info/watch/
// @match        https://www2.x-feeder.info/monitor/
// @grant        none
// @namespace https://greasyfork.org/users/203557
// ==/UserScript==
( () => {
  'use strict'
    const LoadMusic = ( _url ) => {
        const elm = new Audio()
        elm.src = _url
        return elm
    }
    // const は 書き換えるとエラーになるので、この３行の中からコメントアウトを解除するのは必ず１行のみにしてください。ページにアクセスした直後は、音は鳴りません。
    const ALERT = LoadMusic('https://audiostock.jp/audio/160141/play') // シンニュウシャハッケン
    //const ALERT = LoadMusic('https://dova2.heteml.jp/dova/se/1025.mp3') // ビープ音
    //const ALERT = null // 音で知らせてほしくない場合は、この行のコメントアウトを解除して、上の二行をコメントアウトしてください。

    const wait = ( _elm , _func ) => {
        if ( _elm == null ) setTimeout( () => { wait( _elm , _func ) } , 1);
        else _func()
    }

    const already_done = []

    const getNumber = _order => {
        return Number($('.users_num')[ _order ].innerText)
    }
    const getURL = _order => {
        return $('.feeder_title')[ _order ].getElementsByTagName('a')[0].href
    }
    let finish_flag = true
    const main = () => {
        const FEEDER_LIST_NUMBER = $('.feeder_title').length
        for(let i = 0; i < FEEDER_LIST_NUMBER; i++){
            if(getNumber(i) === 0) continue
            const tish_url = getURL(i)
            if(~already_done.indexOf(tish_url)) continue
            already_done.push(tish_url)
            window.open(tish_url)
            if( ALERT ) ALERT.play()
        }
        finish_flag = true
    }
    setInterval(()=>{
        if( finish_flag ){
            $('#refresh_feeder_links_button').click()
            finish_flag = false
            wait( $('.feeder_title') , main )
        }
    },1000)
})();