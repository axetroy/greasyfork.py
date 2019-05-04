// ==UserScript==
// @name        Virtonomica: убирает из списка предприятия в отпуске
// @description Убирает из списка предприятия в отпуске на странице Управление - Персонал
// @author 		cobra3125
// @namespace   virtonomica
// @version 	1.0
// @include 	http*://*virtonomica.*/*/main/company/view/*/unit_list/employee
// ==/UserScript==

var run = function() {

  var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
  $ = win.$;


  var svBtn = '<input id="removeRowInHoliday" type="button" value="Убрать из списка предприятия в отпуске">';
  $('table.list').first().before(svBtn);

  $('#removeRowInHoliday').click( function(){
    $('table.list > tbody > tr:has(td):has(td):has(a):has(div[class="in-holiday"])').remove();
  });
}

if(window.top == window) {
  var script = document.createElement("script");
  script.textContent = '(' + run.toString() + ')();';
  document.documentElement.appendChild(script);
}