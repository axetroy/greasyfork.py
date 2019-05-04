// ==UserScript==
// @name        Ebay - Remove listings with multiple prices
// @namespace   ebay_remove_price_range_listings
// @description Removes those annoying price range listings from search results
// @include     /^https://www\.ebay\.com/sch/i\.html.*$/
// @include     /^https://www\.ebay\.(..)/sch/i\.html.*$/
// @include     /^https://www\.ebay\.co\.(..)/sch/i\.html.*$/
// @include     /^https://www\.ebay\.com\.(..)/sch/i\.html.*$/
// @author      Jous
// @grant       none
// @license     Unlicense; http://unlicense.org/
// @version     1.1.2
// ==/UserScript==



  var searchParams = new URLSearchParams(location.search);
  if (!searchParams.has('_sop') || !searchParams.has('_ipg') || !searchParams.has('LH_BIN')) {

    searchParams.set('_sop','15') // sort by "Price & Shipping: lowest first"
    searchParams.set('_ipg','200') // show 200 results
    searchParams.set('LH_BIN','1') // remove auction items
    location.replace(location.toString().replace(location.search, '') + '?' + searchParams.toString())

  } else {
    var tags = null;
    var count = 0;

    // Remove multi-price products for new layout
    tags = document.querySelectorAll(".prRange");

    Array.prototype.forEach.call(tags, function(elem) {
      var removeElement = elem.parentNode.parentNode.parentNode.parentNode;
      removeElement.parentNode.removeChild(removeElement);
      count++;
    });
    
    // Remove multi-price products for old layout
    tags = document.querySelectorAll(".DEFAULT");

    Array.prototype.forEach.call(tags, function(elem) {
      var removeElement = elem.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
      removeElement.parentNode.removeChild(removeElement);
      count++;
    });

    // Show to user how many products were removed
    var infoMsg = document.createElement("div");
    infoMsg.appendChild(document.createTextNode(count + " price range listings were"));  
    infoMsg.appendChild(document.createElement("br"));
    infoMsg.appendChild(document.createTextNode("removed. (had wrong products)"));  
    infoMsg.style.position = "absolute";
    infoMsg.style.top = "40px";
    infoMsg.style.left = "10px";
    infoMsg.style.padding = "10px";
    infoMsg.style.backgroundColor = "#ccc";
    document.body.appendChild(infoMsg);
  }
