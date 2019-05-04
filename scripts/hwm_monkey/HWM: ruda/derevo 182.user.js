// ==UserScript==
// @name         HWM: ruda/derevo 182
// @version      1.3.5
// @author       rudaderevo
// @include      https://www.heroeswm.ru/auction_new_lot.php
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @description  На странице "Выставить лот" добавляет снизу две кнопки, руда182 / дерево182 и автозаполняет при клике
// @namespace https://greasyfork.org/users/237404
// ==/UserScript==

(function (undefined) {

$('<center id=ruda_cover></center>').appendTo('body');

function hwm_monkey_sell( item, count, price, duration ){
    $('select[name="item"] option').attr('selected',false);
    $('select[name="item"] option[value="'+item+'"]').attr('selected','selected');
    $('input#count').val(count);
    $('input[name="price"]').val(price);
    $('select[name="duration"]').val(duration);
}

// руда
div1 = $('<div style="display:inline-block;"></div>').appendTo('#ruda_cover')
$('<div><button>Руда 182</button></div>').appendTo(div1).click(function(){
    hwm_monkey_sell( 'ore', 50, 182, 8 )
});
$('<div><button>Руда 183</button></div>').appendTo(div1).click(function(){
    hwm_monkey_sell( 'ore', 50, 183, 8 )
});

// дерево
div1 = $('<div style="display:inline-block;"></div>').appendTo('#ruda_cover')
$('<div><button>Дерево 182</button></div>').appendTo(div1).click(function(){
    hwm_monkey_sell( 'wood', 50, 182, 8 )
});
$('<div><button>Дерево 183</button></div>').appendTo(div1).click(function(){
    hwm_monkey_sell( 'wood', 50, 183, 8 )
});

}());