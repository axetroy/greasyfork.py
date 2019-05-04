// ==UserScript==
// @name         Aliexpress min price
// @namespace    https://greasyfork.org/en/scripts/374715-aliexpress-min-price
// @version      0.1
// @description  Update minimum available price
// @author       Mateusz Kula
// @match        *.aliexpress.com/*
// @grant GM_registerMenuCommand
// @grant GM_xmlhttpRequest
// @homepageURL     https://kulam.pl
// @supportURL      https://kulam.pl/kontakt

// ==/UserScript==

var displaySwitch=true; //show min price [true/false]
var replaceSwitch=false; //replace aliexpress min price [true/false]
var alertSwitch=true; //show min price and quantity, [true/false]


if(alertSwitch || displaySwitch)
{
var first=true;
for(var counter=0;counter<skuProducts.length;counter++)
{
	if(+skuProducts[counter].skuVal.availQuantity>0)
    {if(first)//set first available item price as min
        {
			if(skuProducts[0].skuVal.actSkuMultiCurrencyCalPrice>0)
					var price='actSkuMultiCurrencyCalPrice';
				 else
					var price='skuMultiCurrencyCalPrice';

			var mini=+skuProducts[counter].skuVal[price]; var quantity=+skuProducts[counter].skuVal.availQuantity; first=false;
		}
		else
        {
			if(+skuProducts[counter].skuVal[price]<=mini)//found lower/the same price price
            {
				if(+skuProducts[counter].skuVal[price]<mini)//lower price
            	{ mini=+skuProducts[counter].skuVal[price]; quantity=+skuProducts[counter].skuVal.availQuantity;}
				else//same price
           		{quantity+=+skuProducts[counter].skuVal.availQuantity;}
            }
       }
    }
}
}
if(displaySwitch && +mini>0)
{
        if(replaceSwitch)
            document.querySelector('.p-price-detail .p-price > span:nth-child(1)').innerHTML =mini;
		else
			document.querySelector('.p-price-detail .p-symbol').innerHTML ='['+mini+'] '+document.querySelector('.p-price-detail .p-symbol').innerHTML;
}


GM_registerMenuCommand('Ali min price', function find () {
if(alertSwitch)
{
	if(first==true)
		alert("not found")
	else
		alert("minimal price: "+mini+ "\nquantity: "+quantity);
}

}, 'q');
