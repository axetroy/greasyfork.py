// ==UserScript==
// @name           Virtonomica: отображение сумм с разделителями в подсказке к полю ввода
// @version        1.1
// @include        http*://*virtonomic*.*/*
// @description    Добавляет в поля ввода всплывающую подсказку с форматированными числами
// @author         cobra3125
// @namespace      virtonomica
// ==/UserScript==

var run = function() {

  var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
  $ = win.$;

  
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  function updateTitle(editor){
    editor.attr('title', formatter.format(editor.val()));
  }

  $("input[name]").mouseenter(function(){
    var input = $(this);
    if(input.attr('name').toLowerCase().indexOf('price') >= 0 || input.attr('name').toLowerCase().indexOf('sum') >= 0){
      updateTitle($(this)); 
    }
  });
}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
}