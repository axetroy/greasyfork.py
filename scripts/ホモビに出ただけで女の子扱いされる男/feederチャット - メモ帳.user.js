// ==UserScript==
// @name         feederチャット - メモ帳
// @author       ウーレサセバトミサタ
// @version      1.919
// @description  メモ帳を追加します。ブラウザを閉じても内容は半永久的に残ります。
// @match        *.x-feeder.info/*/
// @exclude      *.x-feeder.info/*/*/*
// @grant        none
// @namespace https://greasyfork.org/users/203557
// ==/UserScript==
( () => {
  'use strict' /*   { 'title' : タイトル ,  'content' : 中身 }   */
    const ELEMENT_TO_ADD = $('#main_right')
    const ELEMENT_WIDTH = ELEMENT_TO_ADD.width()
    const PUNCT_LETTER = '\0'
    const Encode = ( _array ) => {
        let str = ''
        for(let i = 0; i < _array.length; i++){
            str += String( _array[i].title ) + PUNCT_LETTER
            str += String( _array[i].content ) + PUNCT_LETTER
        }
        return str
    }
    const Decode = ( _str ) => {
        if( ! _str ) return null
        const ar = _str.split(PUNCT_LETTER)
        const ar2 = []
        for(let i = 0; i < ar.length - 1; i = i + 2){
            ar2.push({
                'title' : ar[ i ] ,
                'content' : ar[ i + 1 ]
            })
        }
        return ar2
    }
    let g_memo = Decode( window.localStorage.room_memo )
    if( ! g_memo ) g_memo = []
    const Save = () => {
        window.localStorage.room_memo = Encode( g_memo )
    }
    const holder = $('<div>').css('background' , '#BDBDBD')
    $('<div>' , {text : "メモ帳"}).css({
        "color" : "gray" ,
        'font-size' : 28 ,
        'text-align' : 'center'
    }).appendTo(holder)
    const select_holder = $('<div>').appendTo(holder)
    const btn_holder = $('<div>').appendTo(holder)
    const memo_holder = $('<div>').appendTo(holder)
    const add_btn = ( _name , _func , _toAppendElm ) => {
        const btn = $('<button>',{ text : _name })
        btn.click( _func )
        _toAppendElm.append(btn).append('　')
        return btn
    }
    const START_PAGE = -1
    const update_select = () => {
        select_holder.empty()
        const select_elm = $('<select>').css('width' , ELEMENT_WIDTH)
        $('<option>' , {
            value : START_PAGE ,
            text : 'ここからメモを選んでください'
        }).appendTo(select_elm)
        for(let i = 0; i < g_memo.length; i++) {
            $('<option>' , {
                value : i ,
                text : g_memo[i].title
            }).appendTo(select_elm)
        }
        select_elm.change( ()=>{ change_Read_mode( Number(select_elm.val()) ) } )
        select_holder.prepend(select_elm)
    }
    const change_Read_mode = ( _order ) => {
        memo_holder.empty()
        if( _order === START_PAGE ) {
            $('<div>' , { text : 'ここにタイトルが表示されます' }).css("color" , "gray" ).appendTo(memo_holder).css("border-bottom","1px dashed gray")
            $('<div>' , { text : 'ここに本文が表示されます' }).css("color" , "gray" ).appendTo(memo_holder)
        }
        else {
            $('<div>' , { text : g_memo[ _order ].title }).appendTo(memo_holder).css("border-bottom","1px dashed gray")
            const ar = g_memo[ _order ].content.split('\n')
            for(let i = 0; i < ar.length; i++){
                $('<div>' , { text : ar[i] }).append('<br>').appendTo(memo_holder)
            }
        }
        memo_holder.css({
            "border-top" : "1px dashed gray" ,
            "border-bottom" : "1px dashed gray"
        })
        btn_holder.empty()
        add_btn( '新規作成' , ()=>{ change_NewEdit_mode( _order ) }, btn_holder )
        if( _order === START_PAGE ) return
        add_btn( '編集' , ()=>{ change_Edit_mode( _order ) } , btn_holder )
        add_btn( '削除' , ()=>{ if(confirm('本当に削除しますか？') ) delete_memo( _order ) }, btn_holder )
    }
    const delete_memo = ( _order ) => {
        const array = []
        for(let i = 0; i < g_memo.length; i++) if( i != _order ) array.push( g_memo[i] )
        g_memo = array
        Save()
        update_select()
        change_Read_mode( g_memo.length - 1 )
    }
    const change_Edit_mode = ( _order ) => {
        memo_holder.empty()
        const title_elm = $('<input>' , { value : g_memo[ _order ].title }).css({'width' : ELEMENT_WIDTH , 'box-sizing' : 'border-box'}).appendTo(memo_holder)
        title_elm.attr('placeholder','メモのタイトルを入力')
        const content_elm = $('<textarea>' , { text : g_memo[ _order ].content }).css({'width' : ELEMENT_WIDTH , 'box-sizing' : 'border-box'}).appendTo(memo_holder)
        content_elm.attr('placeholder','本文を入力（Enterで改行）')
        const adjust = () => { content_elm.height( title_elm.height() * content_elm.val().split('\n').length ) }
        adjust()
        content_elm.keyup( (e) => { adjust() } )
        btn_holder.empty()
        add_btn( '保存' , ()=>{
            const title_val = title_elm.val()
            const content_val = content_elm.val()
            if( title_val.length === 0 || content_val.length === 0 ) return alert( '空欄があります' )
            g_memo[ _order ].title = title_val
            g_memo[ _order ].content = content_val
            Save()
            update_select()
            change_Read_mode( _order )
        }, btn_holder )
        add_btn( 'キャンセル' , ()=>{ change_Read_mode( _order ) }, btn_holder )
    }
    const change_NewEdit_mode = ( _latest_order ) => {
        memo_holder.empty()
        const title_elm = $('<input>').css({'width' : ELEMENT_WIDTH , 'box-sizing' : 'border-box'}).appendTo(memo_holder)
        title_elm.attr('placeholder','メモのタイトルを入力')
        const content_elm = $('<textarea>').css({'width' : ELEMENT_WIDTH , 'box-sizing' : 'border-box'}).appendTo(memo_holder)
        content_elm.attr('placeholder','本文を入力（Enterで改行）')
        const adjust = () => { content_elm.height( title_elm.height() * content_elm.val().split('\n').length ) }
        adjust()
        content_elm.keyup( (e) => { adjust() } )
        btn_holder.empty()
        add_btn( '保存' , ()=>{
            const title_val = title_elm.val()
            const content_val = content_elm.val()
            if( title_val.length === 0 || content_val.length === 0 ) return alert( '空欄があります' )
            g_memo.push({
                'title' : title_val ,
                'content' : content_val
            })
            Save()
            update_select()
            change_Read_mode( g_memo.length - 1 )
        }, btn_holder )
        add_btn( 'キャンセル' , ()=>{ change_Read_mode( _latest_order ) }, btn_holder )
    }
    update_select()
    change_Read_mode( START_PAGE )
    holder.prependTo(ELEMENT_TO_ADD)
})();