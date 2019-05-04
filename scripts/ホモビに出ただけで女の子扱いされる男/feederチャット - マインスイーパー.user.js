// ==UserScript==
// @name         feederチャット - マインスイーパー
// @author       SNNN
// @version      1.06
// @description  resetボタンを押すとスタート。右クリック･･･旗の設置
// @match        *.x-feeder.info/*/
// @exclude      *.x-feeder.info/*/*/*
// @grant        none
// @namespace https://greasyfork.org/users/203557
// ==/UserScript==
( () => {
  'use strict'
    let g_l = 9
    let g_r = 9
    let g_randmine_num = 10
    function set_game(_mode){
    const FIT_WINDOW_MODE = _mode
    const ELEMENT_TO_ADD = FIT_WINDOW_MODE ? $('#wrapper') : $('#main_right')
    let MENU_HEIGHT
    let g_randmine_id_array // const
    let g_mass // const
    let g_mass_remain_num
    let g_END_flag = false
    let g_timer_elm
    let g_timer
    let g_timer_count
    let g_flag_count
    let g_flag_counter_elm

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
        constructor( _l , _r ) {
            this.m_id = _l + 'x' + _r
            this.m_l = {
                "isFirst" :   _l == 0 ? true : false ,
                "isEnd" : _l == g_l-1 ? true : false
            }
            this.m_r = {
                "isFirst" :   _r == 0 ? true : false ,
                "isEnd" : _r == g_r-1 ? true : false
            }
            this.m_isRandmine = false
            this.m_count = 0
            this.m_flag = false
            this.m_opened = false
        }

        m_open(){
            if( !g_randmine_id_array ) {
                massClass.s_set_randmine( this.m_id )
                start_time()
            }
            if( g_END_flag || this.m_flag || this.m_opened ) return
            if( arguments[0] && this.m_isRandmine ) return
            g_mass_remain_num--
            this.m_opened = true
            const this_elm = $( '#' + this.m_id )
            if(this.m_isRandmine) {
                GAMEOVER()
                this_elm.css('background' , 'red')
            }
            else {
                this_elm.attr('class' , 'mass_pushed_count_' + this.m_count)
                this_elm.attr('disabled' , 'disabled')
                if(this.m_count == 0){
                    this_elm.val('\u00A0')
                    const [ line , row ] = this.m_id.split('x').map((i)=>{return Number(i)})
                    if( ! this.m_l.isFirst ) g_mass[line - 1][row].m_open(true)
                    if( ! this.m_r.isFirst ) g_mass[line][row - 1].m_open(true)
                    if( ! this.m_l.isFirst && ! this.m_r.isFirst ) g_mass[line - 1][row - 1].m_open(true)
                    if( ! this.m_l.isEnd ) g_mass[line + 1][row].m_open(true)
                    if( ! this.m_r.isEnd ) g_mass[line][row + 1].m_open(true)
                    if( ! this.m_l.isEnd && ! this.m_r.isEnd ) g_mass[line + 1][row + 1].m_open(true)
                    if( ! this.m_l.isFirst && ! this.m_r.isEnd ) g_mass[line - 1][row + 1].m_open(true)
                    if( ! this.m_l.isEnd && ! this.m_r.isFirst ) g_mass[line + 1][row - 1].m_open(true)
                }
                else {
                    this_elm.val( this.m_count)
                }
            }
            const set_css = (() => {
                $('[class^="mass_pushed_count_"]').css('background' , '#dddddd')
                $('.mass_pushed_count_1').css('color' , 'blue')
                $('.mass_pushed_count_2').css('color' , 'green')
                $('.mass_pushed_count_3').css('color' , 'red')
                $('.mass_pushed_count_4').css('color' , 'navy')
                $('.mass_pushed_count_5').css('color' , 'brown')
                $('.mass_pushed_count_6').css('color' , 'cyan')
                $('.mass_pushed_count_7').css('color' , 'black')
                $('.mass_pushed_count_8').css('color' , 'gray')
            })()
            if(g_mass_remain_num == g_randmine_num) GAMECLEAR()
        }

        m_set_flag(){
            if(g_END_flag || this.m_opened) return false
            const this_elm = $( '#' + this.m_id )
            if(this.m_flag){
                this.m_flag = false
                this_elm.val('\u00A0')
                g_flag_count--
            }
            else{
                this.m_flag = true
                this_elm.val('🚩')
                g_flag_count++
            }
            g_flag_counter_elm.text(g_randmine_num - g_flag_count)
            return false
        }

        static s_set_randmine( _exclude_id ){
            const copy = []
            for(let i = 0; i < g_l; i++){
                for(let j = 0; j < g_r; j++){
                    if(g_mass[i][j].m_id === _exclude_id && g_randmine_num !== g_l * g_r) continue
                    copy.push( g_mass[i][j].m_id )
                }
            }
            g_randmine_id_array = []
            for(let i = 0; i < g_randmine_num; i++){
                const random_id = String(copy.splice(copy.indexOf(copy[Math.floor(Math.random()*copy.length)]),1))
                g_randmine_id_array.push(random_id)
                const vector = random_id.split('x').map((i)=>{return Number(i)})
                const [ line , row ] = vector
                const n = g_mass[line][row]
                n.m_isRandmine = true
                if( ! n.m_l.isFirst ) g_mass[line - 1][row].m_count++
                if( ! n.m_r.isFirst ) g_mass[line][row - 1].m_count++
                if( ! n.m_l.isFirst && ! n.m_r.isFirst ) g_mass[line - 1][row - 1].m_count++
                if( ! n.m_l.isEnd ) g_mass[line + 1][row].m_count++
                if( ! n.m_r.isEnd ) g_mass[line][row + 1].m_count++
                if( ! n.m_l.isEnd && ! n.m_r.isEnd ) g_mass[line + 1][row + 1].m_count++
                if( ! n.m_l.isFirst && ! n.m_r.isEnd ) g_mass[line - 1][row + 1].m_count++
                if( ! n.m_l.isEnd && ! n.m_r.isFirst ) g_mass[line + 1][row - 1].m_count++
            }
        }
    }

    const GAMEOVER = () => {
        if( g_END_flag ) return
        g_END_flag = true;
        for(let i = 0; i < g_randmine_num; i++){
            const this_elm = $( '#' + g_randmine_id_array[i] )
            this_elm.val('💥')
            this_elm.attr('disabled' , 'disabled')
            if( !this_elm.m_opened )this_elm.css('background' , '#dddddd')
            this_elm.css('color' , 'black')
        }
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

    const prepare_game = () => {
        g_timer_count = 0
        clearInterval(g_timer)
        g_l = Math.floor(Number($('#Minesweeper_line').val()))
        g_r = Math.floor(Number($('#Minesweeper_row').val()))
        g_randmine_num = Math.floor(Number($('#Minesweeper_randmine').val()))
        g_mass_remain_num = g_l * g_r
        if(g_mass_remain_num < g_randmine_num) return $('#Minesweeper_randmine').val( g_mass_remain_num )
        g_END_flag = false
        g_randmine_id_array = null
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
        g_flag_count = 0
        g_flag_counter_elm = add_show_status('right' , g_randmine_num - g_flag_count)
        g_mass = []
        const SIDE_LENGTH = get_mass_side_length()
        for(let i = 0; i < g_l; i++){
            g_mass.push([])
            const div = $('<div>')
            div.css('clear' , 'both')
            for(let j = 0; j < g_r; j++){
                const new_mass = new massClass( i , j )
                g_mass[i].push(new_mass)
                const mass = $( '<input>', {
                    'type' : 'button' ,
                    'id' : new_mass.m_id ,
                    'class' : 'mass_unpushed' ,
                    'value' : '\u00A0'
                })
                mass.bind('contextmenu', function(){ return new_mass.m_set_flag() } )
                mass.appendTo(div);
                mass.click(function(){new_mass.m_open()})
            }
            mass_holder.append(div);
        }
        $('.mass_unpushed').css({
            'width': SIDE_LENGTH ,
            'height': SIDE_LENGTH ,
            'font-size' : SIDE_LENGTH * 0.7 ,
            'font-family' : 'arial black' ,
            'background' : '#BDBDBD'
        })
    }

    const holder = $('<div>')
    holder.css({
        'background' : '#BDBDBD' ,
        'text-align' : 'center'
    })
    {
        const title = $('<div>' , {text : "　Minesweeper　"})
        title.css({
            "color" : "gray" ,
            'font-family' : 'fantasy' ,
            'font-size' : 28 ,
        })
        holder.append(title)
        holder.append('resetボタンを押すとスタート <br> 右クリック･･･旗の設置')
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

    add_input('行：','Minesweeper_line' , g_l , 20)
    add_input('列：','Minesweeper_row' , g_r , 20)
    add_input('地雷数：','Minesweeper_randmine', g_randmine_num , 60)

    const add_btn = (_name , _func , _do_not_append ) => {
        const btn = $('<button>',{ text : _name })
        btn.click(_func)
        if( ! _do_not_append )btn_holder.append(btn)
        btn_holder.append('　')
        return btn
    }
    const putRandmine = _rate => {
        g_l = Math.floor(Number($('#Minesweeper_line').val()))
        g_r = Math.floor(Number($('#Minesweeper_row').val()))
        const SIZE = g_l * g_r
        return $('#Minesweeper_randmine').val( Math.floor(_rate * SIZE) )
    }
    {
        const btn1 = add_btn('初級',()=>{ putRandmine( 10 / 81 ) } , true) // 参考：http://yukky-game.com/minesweeper/rule-asobikata/
        const btn2 = add_btn('中級',()=>{ putRandmine( 40 / 256 ) } , true)
        const btn3 = add_btn('上級',()=>{ putRandmine( 99 / 480 ) } , true)
        const local_holder = $('<div>')
        local_holder.append('地雷数：').append(btn1).append(btn2).append(btn3)
        btn_holder.append(local_holder)
    }
    add_btn('reset',prepare_game)
    add_btn('×',(()=>{mass_holder.empty()}))
    FIT_WINDOW_MODE ? add_btn('ミニ画面モード',(()=>{ holder.remove() ; set_game(false) })) : add_btn('大画面モード',(()=>{ holder.remove() ; set_game(true) }))
    holder.prependTo(ELEMENT_TO_ADD)
    MENU_HEIGHT = $(holder).height()
    }
     set_game(false)
})();