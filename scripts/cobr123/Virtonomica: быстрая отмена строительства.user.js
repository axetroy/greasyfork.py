// ==UserScript==
// @name           Virtonomica: быстрая отмена строительства
// @description    Позволяет быстро отменять строительство подразделения без дополнительных окон
// @namespace      virtonomica
// @version        1.0
// @include        http*://*virtonomic*.*/*/main/company/view/*/unit_list/building
// ==/UserScript==

var run = function() {

  var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
  $ = win.$;

  var confirmed = false;
  $("table[class^='unit-list-'] > tbody > tr > td[class] > a").each( function() {
    var row = $(this).parent().parent();
    var link = $(this);
    var delBtn = $('<a href="#"><img width=16 height=16 alt="Отменить быстро" src="/img/del.gif"/></a>');

    delBtn.click(function() {
      if(!confirmed && !confirm('Отменить строительство подразделения?')) {
        return false;
      }
      confirmed = true;

      var svPostUrl = link.attr('href').replace("main/unit/view","main/unit/close");
      var data = {};
      data['unit_cancel_build'] = '1';
      //console.log("data = " + JSON.stringify(data));
      //console.log("svPostUrl = " + svPostUrl);
      $.post( svPostUrl, data )
        .done(function() {
        console.log( "success" );
        row.hide();
        //window.location = window.location.href;
      })
        .fail(function() {
        console.log( "error" );
      });
      //$.post( href3, { close_unit: "Закрыть предприятие" } );
      return false;
    });
    $(this).append(delBtn);
  });

}

var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);