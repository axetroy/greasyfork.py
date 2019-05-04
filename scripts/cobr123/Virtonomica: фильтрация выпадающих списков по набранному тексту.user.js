// ==UserScript==
// @name           Virtonomica: фильтрация выпадающих списков по набранному тексту
// @version        1.9
// @include        http*://*virtonomic*.*/*
// @description    Заменяет все выпадающие списки на фильтруемые
// @author         cobra3125
// @namespace      virtonomica
// ==/UserScript==

var run = function() {

  var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
  $ = win.$;


  function main(){
    $('select:has(option[class~="geocombo"]) > option:nth-child(1)').each(function(){
      var option = $(this);
      if(option.text() == ''){
        option.text("Все");
      }
    });
    $('option[value="all"]').each(function(){
      var option = $(this);
      if(option.text() == ''){
        option.text("Все");
      }
    });
    $('option[class~="geocombo"]').attr('style','background-position: 100% 50%;');
    $('select[name!="level"][name!="data[level]"] > option:nth-child(20)').parent().filter(':visible').chosen({
      inherit_select_classes: true
      ,search_contains: true
      ,include_group_label_in_selected: true
    });
  }
  function addJS() {
    var css = document.createElement("script");
    css.setAttribute("type", "text/javascript");
    css.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/chosen/1.5.1/chosen.jquery.min.js");
    css.addEventListener('load', function () {
      main();
    }, false);
    document.body.appendChild(css);
  }

  function addCss() {
    var css = document.createElement("link");
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("type", "text/css");
    css.setAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/chosen/1.5.1/chosen.min.css");
    css.addEventListener('load', function () {
      addJS();
    }, false);
    document.body.appendChild(css);
  }

  addCss();
}

if(window.top == window) {
  var script = document.createElement("script");
  script.textContent = '(' + run.toString() + ')();';
  document.documentElement.appendChild(script);
}