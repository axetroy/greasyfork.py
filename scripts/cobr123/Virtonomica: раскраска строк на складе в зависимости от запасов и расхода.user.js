// ==UserScript==
// @name           Virtonomica: раскраска строк на складе в зависимости от запасов и расхода
// @version        1.6
// @include        http*://*virtonomic*.*/*/main/unit/view/*
// @description    Сравниваются текущий приход (реально обеспеченный запасами поставщиков), текущий объем заказов и запасы на самом складе. Если, например, при текущий объемах отгрузки/закупок/запасов товара станет не хватать через 10 пересчетов, то строка товара подсвечивается желтым цветом, если через 2 - оранжевым, если уже недопоставка - красным. И наоборот, если на складе запасов более чем на 30 пересчетов - подсвечивается зеленым. 
// @author         cobra3125
// @namespace      virtonomica
// ==/UserScript==

var run = function() {
  //ждем заполнения .bg-image скриптом
  $( document ).ready(function() {

    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    $ = win.$;

    function toNumber(spSum){
      return parseFloat(spSum.replace('$','').replace(/\s+/g,''),10);
    }
    var src = $('.bg-image').attr('class'); 

    if (/\w*virtonomic\w*\.\w+\/\w+\/main\/unit\/view\/\d+$/.test(window.location)) {
      if(src.indexOf("warehouse") > 0){
        $('table.grid > tbody > tr:has(td)').each(function() {
          var row = $(this);
          if($('> td', row).length >= 7) {
            //На складе
            var stock = toNumber($('> td:nth-child(2)', row).text());
            //Отгрузки по контрактам
            var sell = toNumber($('> td:nth-child(6)', row).text());
            //Закупки по контрактам
            var buy = toNumber($('> td:nth-child(7)', row).text());


            if (stock + (buy - sell) < 0){
              //если уже недопоставка - красным
              row.attr('style', 'background-color:HotPink');
            } else if (stock + (buy - sell) * 2 < 0){
              //если через 2 - оранжевым
              row.attr('style', 'background-color:GoldenRod');
            } else if (stock + (buy - sell) * 30 > 0){
              //если на складе запасов более чем на 30 пересчетов - подсвечивается зеленым.
              row.attr('style', 'background-color:LightGreen');
            } else {
              //Если станет не хватать через 10 пересчетов, то строка товара подсвечивается желтым цветом
              row.attr('style', 'background-color:Yellow');
            }
          }
        });
      }
    }
  });
}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
}