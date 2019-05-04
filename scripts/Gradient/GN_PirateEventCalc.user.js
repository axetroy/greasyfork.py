// ==UserScript==
// @name        GN_PirateEventCalc
// @namespace   Gradient
// @description Расчет прибыли на пиратском ивенте
// @include     /^https{0,1}:\/\/((www|qrator)\.heroeswm\.ru|178\.248\.235\.15)\/pirate_event\.php/
// @version     1.0.1
// ==/UserScript==

//----------------------------------------------------------------------------//

"use strict";

//----------------------------------------------------------------------------//

(function(){  // wrapper start
  
//----------------------------------------------------------------------------//

start_work();
  
//----------------------------------------------------------------------------//
 
function start_work(){
  var products = parse_products_table();

  if(!products)
    return;

  var res = parse_shipment_table(products);

  if(!res)
    return;

  var profit = 0;
  
  products.forEach(function(current){
    profit += (current.sell_price - current.buy_price)*current.count;
  });

  var input = document.createElement('input');
  input.type        = 'text';
  input.style.width = '200px';
  input.setAttribute('disabled', '');
  input.value = 'Сумма прибыли: ' + profit.toFixed(0) + (res.has_errors ? ', есть ошибки при парсинге' : '');

  res.shipment.parentNode.insertBefore(input, res.shipment.nextSibling);
  res.shipment.parentNode.insertBefore(document.createElement('br'), input.nextSibling);
}
  
//----------------------------------------------------------------------------//
  
function parse_shipment_table(products){
  var unload = document.querySelector('input[value="unload"]');

  if(!unload)
    return null;
  
  var shipment = unload.parentNode.previousSibling;
  var tds = shipment.querySelectorAll('td');
  
  var unknown = false;

  for(var i = 0, e = tds.length; i < e; i += 2){
    var img = tds[i].firstChild.getAttribute('src');
    
    var product = get_product(products, img);
    
    if(!product){
      unknown = true;
      continue;
    }
      
    product.count = +tds[i+1].textContent;
  }

  return { shipment: shipment, has_errors: unknown };
}
  
//----------------------------------------------------------------------------//
  
function parse_products_table(){
  var img_td = document.querySelector('img[src*="pirate_event.jpg"]');

  if(!img_td)
    return null;
  
  var needed_trs = img_td.parentNode.parentNode.lastChild.firstChild.firstChild.childNodes;
  
  var products = [];

  for(var i = 0, e = needed_trs.length; i < e; ++i){
    var img        = needed_trs[i].childNodes[0];
    var weight     = needed_trs[i].childNodes[1];
    var buy_price  = needed_trs[i].childNodes[2];
    var sell_price = needed_trs[i].childNodes[3];

    var weight_n     = +weight.textContent.replace(',', '');
    var buy_price_n  = +buy_price.textContent.replace(',', '');
    var sell_price_n = +sell_price.textContent.replace(',', '');

    if(isNaN(weight_n) || isNaN(buy_price_n) || isNaN(sell_price_n)){
      var header = sell_price.cloneNode(true);
      header.textContent = 'Разница на 1 тонну груза';
      sell_price.parentNode.insertBefore(header, sell_price.nextSibling);
      continue;
    }
    
    var img_src = img.firstChild.getAttribute('src');

    var content = sell_price.cloneNode(true);
    img = content.querySelector('img');

    if(img){
      var difference = (+sell_price_n - +buy_price_n)/+weight_n;

      img.parentNode.nextSibling.textContent = difference.toFixed(2);
    }
    else
      content.textContent = 'Error';

    sell_price.parentNode.insertBefore(content, sell_price.nextSibling);
    
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