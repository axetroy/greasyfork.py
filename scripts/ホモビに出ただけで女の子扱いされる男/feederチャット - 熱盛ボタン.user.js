// ==UserScript==
// @name         feederチャット - 熱盛ボタン
// @author       報道ステーション
// @version      0.03
// @description  熱盛と出てしまうボタンを追加
// @match        *.x-feeder.info/*/
// @exclude      *.x-feeder.info/*/*/*
// @grant        none
// @namespace https://greasyfork.org/users/203557
// ==/UserScript==
( () => {
  'use strict';
    let g_btn_elm
    const LoadMusic = ( _url ) => {
        const elm = new Audio()
        elm.src = _url
        return elm
    }
    const ar = []
    ar.push(LoadMusic('https://atsumori.orangeliner.net/src/atsumori_std.wav'))
    ar.push(LoadMusic('https://atsumori.orangeliner.net/src/atsumori_long.wav'))
    const apologize_SE_elm = LoadMusic('https://atsumori.orangeliner.net/src/apologize.wav')
    const LoadImage = ( _url ) => {
        const elm = document.createElement("img");
        elm.src = _url
        return elm
    }
    const ATSUMORI_GIF_elm = LoadImage('https://www1.x-feeder.info/____/pictures/PIC_2nSn7W.gif')
    const rand = ( _LessThan ) => { // 0 ~ ( _LessThan - 1 )
        return Math.floor(Math.random() * _LessThan)
    }
    const Atsumori = () => {
        g_btn_elm.prop('disabled', true)
        g_btn_elm.css('filter' , 'grayscale(100%)')
        ar[ rand ( ar.length ) ].play()
        setTimeout(()=>{ apologize_SE_elm.play() }, 1000)
        $(ATSUMORI_GIF_elm).appendTo('body')
        $(ATSUMORI_GIF_elm).css({
            'left' : rand( $(window).width() - $(ATSUMORI_GIF_elm).width() ) ,
            'top' : rand( $(window).height() - $(ATSUMORI_GIF_elm).height() ) ,
            'position' : 'fixed',
        })
        setTimeout(()=>{
            ATSUMORI_GIF_elm.remove()
            g_btn_elm.prop('disabled', false)
            g_btn_elm.css('filter' , 'grayscale(0%)')
        },2000)
    }
    const holder = $('#post_btn').parent()
    {
        g_btn_elm = $('<button>' , {text : "熱盛"})
        g_btn_elm.css({
            "background" : "white" ,
            "color" : "#f4440c" ,
            'border-color' : "#f4440c" ,
            'font-weight' : 900 ,
        })
        g_btn_elm.click( function(){ Atsumori() } )
        holder.append(g_btn_elm)
    }
})();