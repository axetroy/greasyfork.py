// ==UserScript==
// @name        GN_MoveEventCalc
// @namespace   Gradient
// @description Расчет прибыли для сопровождения караванов
// @include     /^https{0,1}:\/\/((www|qrator)\.heroeswm\.ru|178\.248\.235\.15)\/move_event\.php/
// @version     1.0.1
// @grant       none
// ==/UserScript==

//----------------------------------------------------------------------------//

"use strict";

//----------------------------------------------------------------------------//

(function(){  // wrapper start
  
//----------------------------------------------------------------------------//
  
var select = null;
prepare_page();
  
//----------------------------------------------------------------------------//

function prepare_page(){
  draw_difference_column();
  select = document.querySelector('select[name="sec_id"]');
  select.addEventListener('change', start_work);
}
  
//----------------------------------------------------------------------------//
  
function draw_difference_column(){
  var img_td = document.querySelector('img[src*="move_event.jpg"]');
  var needed_trs = img_td.parentNode.parentNode.lastChild.firstChild.firstChild.childNodes;  
  
  for(var i = 0, e = needed_trs.length; i < e; ++i){
    var childs = needed_trs[i].childNodes;
    var anchor_column = childs[childs.length - 2];
    
    if(!i){
      var header = anchor_column.cloneNode(true);
      header.textContent = 'Разница на 1 т. (зависит от сектора)';
      anchor_column.parentNode.insertBefore(header, anchor_column.nextSibling);
      continue;
    }

    var content = anchor_column.cloneNode(true);
    content.textContent = '';
    anchor_column.parentNode.insertBefore(content, anchor_column.nextSibling);
  } 
}
  
//----------------------------------------------------------------------------//
 
function start_work(){
  var selected = +select.options[select.selectedIndex].value;
  var products = fill_products_table(selected);
  
  if(!products) //empty option
    return;
  
  var res = parse_caravan_table(products);

  if(!res)
    return;

  var profit = 0;
  
  products.forEach(function(current){
    profit += (current.sell_price - current.buy_price)*current.count;
  });

  var input = document.getElementById('GN_MoveEventProfitInput');
  
  if(!input){
    input = document.createElement('input');
    input.id = 'GN_MoveEventProfitInput';
    input.type = 'text';
    input.style.width = '200px';
    input.setAttribute('disabled', '');
    
    res.caravan.parentNode.insertBefore(input, res.caravan.nextSibling);
    res.caravan.parentNode.insertBefore(document.createElement('br'), input.nextSibling);
  }
  
  input.value = 'Сумма прибыли: ' + profit.toFixed(0) + (res.has_errors ? ', есть ошибки при парсинге' : '');
}
  
//----------------------------------------------------------------------------//
  
function parse_caravan_table(products){
  var unload = document.querySelector('input[value="unload"]');

  if(!unload)
    return null;

  var caravan = unload.parentNode.parentNode.querySelector('table');
  var tds = caravan.querySelectorAll('td');
  
  var unknown = false;

  for(var i = 0; i < tds.length; i += 2){
    var img = tds[i].firstChild.getAttribute('src');
    
    var product = get_product(products, img);
    
    if(!product){
      unknown = true;
      continue;
    }
      
    product.count = +tds[i+1].textContent;
    console.log('test' + product.count)
  }

  return { caravan: caravan, has_errors: unknown };
}
  
//----------------------------------------------------------------------------//
  
function fill_products_table(selected){

  var img_td = document.querySelector('img[src*="move_event.jpg"]');
  
  var needed_trs = img_td.parentNode.parentNode.lastChild.firstChild.firstChild.childNodes;
  var products = [];

  for(var i = 1; i < needed_trs.length; ++i){ // 0 - header
    var childs = needed_trs[i].childNodes;
    var diff_column = childs[childs.length - 2];
    
    if(!selected){
      diff_column.textContent = '';
      continue;
    }

    var img        = childs[0];
    var weight     = childs[1];
    var buy_price  = childs[2];
    var sell_price = childs[3 + selected - 1];

    var weight_n     = weight.textContent.replace(',', '');
    var buy_price_n  = buy_price.textContent.replace(',', '');
    var sell_price_n = sell_price.textContent.replace(',', '');
    var img_src      = img.firstChild.getAttribute('src');

    var difference = (+sell_price_n - +buy_price_n)/+weight_n;
    diff_column.textContent = difference.toFixed(2);
    
    products.push({img: img_src, weight: weight_n, buy_price: buy_price_n, sell_price: sell_price_n, count: 0});
  }
  
  return products.length > 0 ? products : null;
}
  
//----------------------------------------------------------------------------//
  
function get_product(array_, img){
  var product = null;
  
  array_.forEach(function(current){
    if(current.img == img)
      product = current;
  });

  return product;
}
  
//----------------------------------------------------------------------------//
  
})();  // wrapper end

//----------------------------------------------------------------------------//