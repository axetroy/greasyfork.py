// ==UserScript==
// @name       Ebay Collection only filter v2
// @namespace  CollectionOnlyFilter
// @version    0.3
// @description  Hides all collection only listings. tested on Firefox 58 & Chrome 63
// @include      https://www.ebay.co.uk/*
// ==/UserScript==

//span.s-item__delivery-options
var elements = document.body.querySelectorAll("span.ship"); 

for (var i = 0; i < elements.length; i++) 
{
     if(elements[i].innerHTML.search(/Collection only: Free/) != -1)
    {
      elements[i].parentElement.parentElement.parentElement.style.display = "none";
    }
};

elements = document.body.querySelectorAll("span.s-item__delivery-options"); 

for (var i = 0; i < elements.length; i++) 
{
     if(elements[i].innerHTML.search(/Collection in person/) != -1)
    {
      elements[i].parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "none";
    }
};