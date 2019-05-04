// ==UserScript==
// @name           Avito price filter
// @namespace      avitojs
// @include        https://www.avito.ru/*
// @version        1
// @grant          none
// @description:ru Фильтр цен для Avito.ru
// @description Фильтр цен для Avito.ru
// ==/UserScript==

if ($('#pre-filters').length > 0) showPriceFilter();

function showPriceFilter(){
  var pmin_match = /pmin=(\d+)/.exec(window.location.search);
  var pmax_match = /pmax=(\d+)/.exec(window.location.search);
  var pmin_val = '';
  var pmax_val = '';
  if (pmin_match && pmin_match[1] !== undefined) pmin_val = pmin_match[1];
  if (pmax_match && pmax_match[1] !== undefined) pmax_val = pmax_match[1];
  var pmin = '<input size="5" class="param-number-filed" placeholder="от" name="pmin" value="'+pmin_val+'">';
  var pmax = '<input size="5" class="param-number-filed" placeholder="до" name="pmax" value="'+pmax_val+'">';
  $('#pre-filters').append('<span style="margin-left:10px">цена&nbsp;&nbsp;'+pmin+'&nbsp;&mdash;&nbsp;'+pmax+'&nbsp;руб.</span>');
}