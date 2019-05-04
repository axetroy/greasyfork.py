// ==UserScript==
// @name          Virtonomica:Убираем бонусный комплект
// @namespace    Virtonomica: Убираем комплект
// @version 	   1.1
// @description   Убираем комплект с главной стр
// @include      http://virtonomic*.*/*/main/company/view/*/unit_list


// ==/UserScript==

var run = function() {

    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    $ = win.$;
  $("div.assetbox").remove()

  
   }
  if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
}