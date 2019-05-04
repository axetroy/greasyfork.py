// ==UserScript==
// @name        iks:virtonomica Заказ на все свои
// @namespace   virtonomica
// @description При нажатии на зеленую машинку позволяет без лишних кликов выставить заказ на все свои юниты
// @include     http*://*virtonomica*/*/window/unit/supply/multiple/vendor:*/product:*/brandname:*
// @version     0.02
// @grant       none
// ==/UserScript==

var run = function(){
  $ = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window).$;

  $('table.list > tbody > tr:first > th:first').append('<input id="unit_all" class="unit" type="checkbox" style="float:left">'
                                                       +'<input name="unit_all" disabled value="0" style="width: 80px; float:left; margin-left:5px" type="text">');
  $('#unit_all').change(function(){
    if( $(this).prop("checked") ) {
      $('input[type="checkbox"]').attr('checked', 'checked');
      $('input[type="text"]').removeAttr('disabled').val(1);
      $('input.button115[type="submit"]').removeAttr('disabled');
    } else {
      $('input[type="checkbox"]').removeAttr('checked');
      $('input[type="text"]').attr('disabled', 'disabled');
      $('input.button115[type="submit"]').attr('disabled', 'disabled');
    }
  });
  
  $('input[name="unit_all"]').bind("change keyup input click", function() {
    $('input[type="text"]:not(:disabled)').val( parseInt( $(this).val().replace(/[^0-9]/g, '') ) | 0 );
    $('input.button115[type="submit"]').removeAttr('disabled');
  });
}

if(window.top == window) {
    $('head').append( '<script type="text/javascript"> (' + run.toString() + ')(); </script>' );
}