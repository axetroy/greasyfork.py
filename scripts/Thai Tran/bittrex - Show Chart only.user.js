// ==UserScript==
// @name         bittrex - Show Chart only 
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Thai Tran
// @match        https://bittrex.com/Market/Index?MarketName=*
// @grant        none
// ==/UserScript==

var u = document.location.href.replace('Index?','MarketStandardChart?') ;
alert('url = '+ u); //https://bittrex.com/Market/Index?MarketName=BTC-BCC

document.location = u;
//https://bittrex.com/market/MarketStandardChart?marketName=BTC-BCC
