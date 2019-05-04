// ==UserScript==
// @name     Ebay Collection only warning
// @namespace  CollectionOnlyFilter
// @version  0.2
// @description  Makes the postage background red and adds text "Collection Only" to submit button. Tested on Firefox 58 & Chrome 63
// @include      https://www.ebay.co.uk/itm/*
// ==/UserScript==

var x = document.getElementById("fShippingSvc"); 
if(x.innerHTML.indexOf("Free collection in person") != -1)
{
  x.parentElement.parentElement.parentElement.parentElement.parentElement.style.backgroundColor = "#fc7272";
  document.getElementById('bidBtn_btn').innerHTML += " (Collection Only)";
  
}
