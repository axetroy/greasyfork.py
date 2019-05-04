// ==UserScript==
// @name        Real Estate Com Au List Price
// @version     4
// @description Adds the hidden list price to the detailed listings
// @namespace   http://code.spits.id.au/
// @include     http://www.realestate.com.au/property-*
// @grant       none
// ==/UserScript==

(function () {
  p = $("li.price").find("p.priceText,p.contactAgent").first();
  lpText = LMI.Data.ireData.listPrice.toLocaleString("en-US");
  p.text(p.text() + " (list price $" + lpText + ")");
})();
