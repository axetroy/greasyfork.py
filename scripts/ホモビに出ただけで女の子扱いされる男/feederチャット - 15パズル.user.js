// ==UserScript==
// @name         feederチャット - 15パズル
// @author       TNOK
// @version      1.06
// @description  15パズルができる。ルールは、左から右に数字が並べばクリアです！
// @match        *.x-feeder.info/*/
// @exclude      *.x-feeder.info/*/*/*
// @grant        none
// @namespace https://greasyfork.org/users/203557
// ==/UserScript==
( () => {
  'use strict'
    let g_l = 4
    let g_r = 4
    let g_shuffle_num = 114514
    function set_game(_mode){
    const FIT_WINDOW_MODE = _mode
    const ELEMENT_TO_ADD = FIT_WINDOW_MODE ? $('#wrapper') : $('#main_right')
    let MENU_HEIGHT
    const NULL_VALUE = '\u00A0'
    let g_mass // const
    let g_empty_mass // const
    let g_empty_mass_elm // const
    let g_END_flag = false
    let g_timer_elm
    let g_timer
    let g_timer_count
    let g_counter_count
    let g_counter_elm

    const get_mass_side_length = () => {
        if( ! FIT_WINDOW_MODE ) return ELEMENT_TO_ADD.width() / g_r
        const W = $(window).width() - ( $(mass_holder).offset().left ) * 2
        const H = $(window).height() - MENU_HEIGHT - $('#header').height()
        const a = W / g_r
        const b = H / g_l
        return a < b ? a : b
    }

    const start_time = () => {
        g_timer = setInterval(()=>{
            if(g_END_flag) clearInterval(g_timer)
            else {
                g_timer_count++
                const second = ( '00' + g_timer_count % 60 ).slice( -2 )
                const minute = Math.floor(g_timer_count / 60)
                g_timer_elm.text(minute+':'+second)
            }
        },1000)
    }

    class massClass {
        constructor( _id ) {
            this.m_id = _id
            this.m_val = _id
        }
        m_swap(){
            const past = g_empty_mass
            const copy = past.m_val
            past.m_val = this.m_val
            this.m_val = copy
            g_empty_mass = this
            return past
        }
        m_AdjoinUp(){
            const t = this.m_id
            const up = t - g_r
            if( 0 <= up ) return up
            return null
        }
        m_AdjoinUnder(){
            const t = this.m_id
            const under = t + g_r
            const SIZE = g_l * g_r
            if( under < SIZE ) return under
            return null
        }
        m_AdjoinLeft(){
            const t = this.m_id
            const left = t - 1
            if( 0 <= left && left % g_r != g_r - 1 ) return left
            return null
        }
        m_AdjoinRight(){
            const t = this.m_id
            const right = t + 1
            const SIZE = g_l * g_r
            if( right < SIZE && right % g_r != 0 ) return right
            return null
        }
        m_isAdjoin(){
            const n = g_empty_mass
            const up = n.m_AdjoinUp()
            const under = n.m_AdjoinUnder()
            const left = n.m_AdjoinLeft()
            const right = n.m_AdjoinRight()
            const t = this.m_id
            return t === up || t === under || t === left || t === right
        }
        m_isCorrect(){
            return this.m_id === this.m_val
        }
    }

    const judge = ( _mass_class_array ) => {
        const SIZE = g_l * g_r
        for(let i = 0; i < SIZE; i++){
            if(!_mass_class_array[i].m_isCorrect()) return false
        }
        return true
    }

    const prepare_game = () => {
        g_timer_count = 0
        clearInterval(g_timer)
        g_l = Math.floor(Number($('#15puzzle_line').val()))
        g_r = Math.floor(Number($('#15puzzle_row').val()))
        const SIZE = g_l * g_r
        g_shuffle_num = Math.floor(Number($('#15puzzle_shuffle').val()))
        g_END_flag = false
        mass_holder.empty()
        const add_show_status = ( _position , _text ) => {
            const elm = $('<span>')
            elm.css({
                'background' : 'black' ,
                "color" : "red" ,
                'font-size' : 15 ,
                'float' : _position ,
                'padding' : '0 1em'
            })
            mass_holder.append(elm)
            elm.text( _text )
            return elm
        }
        g_timer_elm = add_show_status('left' , '0:00')
        g_counter_count = 0
        g_counter_elm = add_show_status('right' , g_counter_count)
        g_mass = []
        for(let i = 0; i < SIZE; i++) g_mass.push( new massClass( i ) )
        g_empty_mass = g_mass[ SIZE - 1]
        if(SIZE !== 1){
        for(let i = 0; i < g_shuffle_num; i++){
            const n = g_empty_mass
            const up = n.m_AdjoinUp()
            const under = n.m_AdjoinUnder()
            const left = n.m_AdjoinLeft()
            const right = n.m_AdjoinRight()
            const ch = []
            if(up != null) ch.push(up)
            if(under != null) ch.push(under)
            if(left != null) ch.push(left)
            if(right != null) ch.push(right)
            const rd = Number(ch[Math.floor(Math.random()*ch.length)])
            g_mass[rd].m_swap()
        }
        }
        const SIDE_LENGTH = get_mass_side_length()
        for(let i = 0; i < g_l; i++){
            const div = $('<div>')
            div.css('clear' , 'both')
            for(let j = 0; j < g_r; j++){
                const now_mass = g_mass[i * g_r + j]
                const new_mass_elm = $( '<input>', {
                    'type' : 'button' ,
                    'class' : '15puzzle_mass',
                    value : now_mass.m_val + 1
                })
                new_mass_elm.css('color' , ( now_mass.m_val === now_mass.m_id) ? 'black' : 'gray')
                new_mass_elm.prop('disabled' , false)
                if( now_mass == g_empty_mass) {
                    g_empty_mass_elm = new_mass_elm
                    new_mass_elm.prop('disabled' , true)
                }
                new_mass_elm.click( function(){
                    if(g_END_flag) return
                    if( !now_mass.m_isAdjoin() ) return
                    g_counter_elm.text( ++g_counter_count )
                    const past = now_mass.m_swap()
                    new_mass_elm.attr('value' , NULL_VALUE)
                    new_mass_elm.css('background' , '#dddddd')
                    new_mass_elm.prop('disabled' , true)
                    g_empty_mass_elm.attr('value' , past.m_val + 1)
                    g_empty_mass_elm.css('color' , (past.m_val === past.m_id) ? 'black' : 'gray')
                    g_empty_mass_elm.css('background' , '#BDBDBD')
                    g_empty_mass_elm.prop('disabled' , false)
                    g_empty_mass_elm = new_mass_elm
                    if(judge(g_mass)) return GAMECLEAR()
                } )
                new_mass_elm.appendTo(div);
            }
         mass_holder.append(div);
        }
        $('.15puzzle_mass').css({
            'width': SIDE_LENGTH ,
            'height': SIDE_LENGTH ,
            'font-size' : SIDE_LENGTH * 0.7 ,
            'font-family' : 'arial black' ,
            'background' : '#BDBDBD' ,
        })
        g_empty_mass_elm.css('background' , '#dddddd')
        g_empty_mass_elm.attr('value' , NULL_VALUE)
        if(judge(g_mass)) return GAMECLEAR()
        start_time()
    }

    const GAMECLEAR = () => {
        if( g_END_flag ) return
        g_END_flag = true;
        const message = $('<div>' , {text : "GAME CLEAR"})
        message.css({
            "color" : "red" ,
            'font-family' : 'Impact' ,
            'font-size' : 28 ,
        })
        mass_holder.prepend(message)
    }

    const holder = $('<div>')
    holder.css({
        'background' : '#BDBDBD' ,
        'text-align' : 'center'
    })
    {
        const title = $('<div>' , {text : "　15パズル　"})
        title.css({
            "color" : "gray" ,
            'font-family' : 'fantasy' ,
            'font-size' : 28 ,
        })
        holder.append(title)
        holder.append('すべてのマスが黒文字になればクリア（適当）')
    }

    const btn_holder = $('<div>')
    holder.append(btn_holder)
    const mass_holder = $('<div>')
    holder.append(mass_holder)

    const add_input = (_name, _id, _default_value , _input_width) => {
        const span = $('<span>',{text : _name})
        const input = $('<input>', { "id": _id, "width": _input_width , "value": _default_value });
        span.append(input)
        span.append('　')
        btn_holder.append(span)
        input.keypress( (e) => { e.key == 'Enter' ? prepare_game() : null } )
    }

    add_input('行:','15puzzle_line' , g_l , 20)
    add_input('列:','15puzzle_row' , g_r , 20)
    add_input('シャッフル回数:','15puzzle_shuffle' , g_shuffle_num , 60)

    const add_btn = (_name, _func) => {
        const btn = $('<button>',{ text : _name })
        btn.click(_func)
        btn_holder.append(btn)
        btn_holder.append('　')
    }

    add_btn('reset',prepare_game)
    add_btn('×',(()=>{mass_holder.empty()}))
    FIT_WINDOW_MODE ? add_btn('ミニ画面モード',(()=>{ holder.remove() ; set_game(false) })) : add_btn('大画面モード',(()=>{ holder.remove() ; set_game(true) }))
    holder.prependTo(ELEMENT_TO_ADD)
    MENU_HEIGHT = $(holder).height()
    }
     set_game(false)
})();