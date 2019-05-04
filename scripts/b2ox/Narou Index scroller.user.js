// ==UserScript==
// @name         Narou Index scroller
// @namespace    http://ncode.syosetu.com/
// @version      0.5
// @description  小説家になろうの目次で前後の章に移動するアイコンをつける
// @author       b2ox
// @match        https://ncode.syosetu.com/*
// @grant        none
// ==/UserScript==

{
    const chapters = $('div.index_box > div.chapter_title')
    const n = chapters.length
    chapters.each((i,elm) => {
        const nav = $('<span>')
        const _up = $('<span>').text('⇧').attr('title','前章へ移動').css('cursor','pointer').click(() => {$('#ct'+(i-1))[0].scrollIntoView();window.scrollBy(0,-20);})
        const _down = $('<span>').text('⇩').attr('title','次章へ移動').css('cursor','pointer').click(() => {$('#ct'+(i+1))[0].scrollIntoView();window.scrollBy(0,-20);})
        if (i>0) nav.append(_up)
        if (i<n-1) nav.append(_down)
        $(elm).attr('id','ct'+i).prepend(nav)
    })
}
