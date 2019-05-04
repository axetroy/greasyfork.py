// ==UserScript==
// @name        Amazon Wishlist Export
// @namespace   https://greasyfork.org/en/users/11592-max-starkenburg
// @description Save a local copy of the items in your Amazon.com Wishlist
// @include     http*://*.amazon.*/gp/registry/wishlist/*
// @version     1.1
// @grant       none
// ==/UserScript==

var items = [], totalPages;

var url = document.URL;
// If you're looking at somebody else's list and it doesn't have the list identifier in the expected way, get it another way
if (url.indexOf("&cid=") > -1) { // "cid" itself doesn't seem to be that list's ID
  url = document.querySelector(".wl-friend-list.selected a").href; // I'm pretty sure this only is an issue on others' lists
}
url = url.substring(0,url.lastIndexOf("/") + 1);

// Get the items for the rest of the pages in the list
var pagination = document.getElementsByClassName("a-pagination");

if (pagination.length > 0) {
  var pageLinks = pagination[0].getElementsByTagName("li");
  totalPages = parseInt(pageLinks[pageLinks.length - 2].textContent); // second to last list item (before "next ->")
} else {
  totalPages = 1;
}

// This ajax function iterated over various times since an asynchronous request return the correct results 
// and a single synchronous request was freezing the browser.
var data = "Title\tAuthor(s) and Format\tItem URL\n";
function getPages(i) {
  if (i < totalPages) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url + '?page=' + (i + 1), true); // get the corresponding page's HTML
    xhr.onload = function() {
      getItems(xhr.responseText, i);
    }
    xhr.send();
  } else {
    // If we're done getting all the pages' items, create a TSV file and offer it for download
    for (var i=0; i < items.length; i++) {
      data = data + items[i].title + "\t" + items[i].authorAndFormat + "\t" + items[i].itemURL + "\n";
    }
    document.getElementById("gm-spinner").setAttribute("style","display: none;");
    data = data.replace(/&#8203;/g,""); // for some reason there's a bunch of these characters in here
    // The following code thanks to Stack Overflow user zanetu at http://stackoverflow.com/a/34148831/5285945
    var a = document.createElement("a");
    a.href = "data:text/tab-separated-values;charset=utf-8," + encodeURIComponent(data);
    // Get this specific list's name (since users can have multiple lists) and append it to the download file
    var listName = document.querySelector(".wl-friend-list.selected span, .wl-list.selected span").firstChild.textContent.trim().replace(/[^A-Za-z0-9]/g,"");
    a.download = "AmazonWishlist-" + listName + ".tsv";
    document.getElementsByTagName("body")[0].appendChild(a);
    a.click();
  }
}

// Replicate an Amazon button
var button = document.createElement("span");
button.className = "a-button a-button-primary";
button.setAttribute("style","cursor: pointer; float: right; margin-top: 1em;");
button.innerHTML = '<span class="a-button-inner"><span class="a-button-text">Export this wishlist as a TSV file</span></span>'
var head = document.getElementById("wl-list-info");
head.insertBefore(button, head.firstChild);

// On clicking the button, go get all the items on the different pages
button.addEventListener("click", function() {
  button.className += " a-button-disabled";
  var spinner = document.createElement("img");
  spinner.src = "https://images-na.ssl-images-amazon.com/images/G/01/amazonui/loading/loading-2x-gray._V1_.gif";
  spinner.id = "gm-spinner";
  spinner.setAttribute("style","float: right;")
  button.parentNode.insertBefore(spinner, button.nextSibling);
  getPages(0);
});

function getItems(responseText, i) {
  // Capture the item's title, and author info if it's there.
  // Some extra consideration given if it's not a linked element (e.g. a manually added item).
  // Todo: other fields such as item quantity, comments, etc.
  var itemsRegEx = / id="itemName[^>]+"([^>]+)">([^<]+)<\/(?:a|span)>[^>]+(?:<\/h5>|<a[^<]+<\/a>)([^<]*)</gm;
  // The following loop is based on that by htw at http://stackoverflow.com/a/844049/752122
  while (item = itemsRegEx.exec(responseText)) {
    var itemInfo = {};
    var itemURL = item[1].trim();
    if (itemURL.indexOf("/") == 0) {
      itemURL = location.protocol + "//" + location.host + itemURL;
    } else {
      itemURL = "";
    }
    itemInfo.itemURL = itemURL;
    itemInfo.title = item[2].trim();
    itemInfo.authorAndFormat = item[3].trim();
    items.push(itemInfo);
  }
  getPages(i+1);
}