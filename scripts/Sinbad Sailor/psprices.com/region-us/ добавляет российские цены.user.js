// ==UserScript==
// @name         psprices.com/region-us/ добавляет российские цены
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  На амеркианском регионе psprices.com/region-us/ добавляет российские цены под играми.
// @author       You
// @match        https://psprices.com/region-us/*
// @grant        none
// ==/UserScript==
//window.onload = function() {
    
(function() {
    'use strict';
    
    function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
    
    
    var moneyrub;
    
    var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22USDRUB%22&format=xml&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=', true);

// If specified, responseType must be empty string or "document"
xhr.responseType = 'document';

// overrideMimeType() can be used to force the response to be parsed as XML
xhr.overrideMimeType('text/xml');

xhr.onload = function () {
  //if (xhr.readyState === xhr.DONE) {
   // if (xhr.status === 200) {
      console.log(xhr.response);
      moneyrub = xhr.responseXML.getElementsByTagName("Rate")[0].childNodes[0].nodeValue;
        console.log('Курс рубля - ' + moneyrub);
    //}
  //}
    
    
    var allelements = document.getElementsByClassName('content__game_card__price').length;
    console.log('Количество всех элементов на странице - ' + allelements);
    
for (var i = 0; i < allelements; i++) {
        var spanclass = document.getElementsByClassName('content__game_card__price')[i];
    var elem2 = spanclass.getAttribute('content');
    console.log(i +' - ' +elem2);
    //var moneyslice = parseFloat(elem2.substr(1));
    //console.log(moneyslice);
    //var money$ = parseFloat(moneyslice);
    var moneyconv = Math.round(elem2*moneyrub);
    console.log('Цена в рублях по курсу - '+ moneyconv);
    document.getElementsByClassName('content__game_card__price')[i].innerHTML += '|<b> ₽' +moneyconv +'</b>';
   
}
   //sleep(1000);
    
};

xhr.send();
    
})();

//};