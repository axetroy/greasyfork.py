// ==UserScript==
// @name         feederチャット - 電卓
// @author       ドラフト１位
// @version      0.4
// @description  TDN電卓
// @match        *.x-feeder.info/*/
// @exclude      *.x-feeder.info/*/*/*
// @grant        none
// @namespace https://greasyfork.org/users/203557
// ==/UserScript==
( () => {
  'use strict'
    const ELEMENT_TO_ADD = $('#main_right')
    let g_input_elm
    let g_result_elm
    const evaluate = () => {
        const val = g_input_elm.val()
        g_result_elm.text('error')
        g_result_elm.css('color' , 'red')
        const result = eval(val)
        g_result_elm.text(result)
        g_result_elm.css('color' , 'black')
    }
    const holder = $('<div>')
    holder.css('background' , '#BDBDBD')
    {
        const title = $('<div>' , {text : "電卓"})
        title.css({
            "color" : "gray" ,
            'font-family' : 'fantasy' ,
            'font-size' : 28 ,
            'text-align' : 'center'
        })
        holder.append(title)
    }
    const add_elm = ( _name , _type ) => {
        const span = $('<div>',{text : _name})
        holder.append(span)
        const elm = $('<' + _type + '>')
        span.append(elm)
        return elm
    }
    g_input_elm = add_elm( '計算式：' , 'input' )
    g_input_elm.attr('placeholder','Enterで計算')
    g_input_elm.keypress( (e) => { e.key == 'Enter' ? evaluate() : null } )
    g_result_elm = add_elm( '結果：' , 'span' )
    holder.prependTo(ELEMENT_TO_ADD)
})();