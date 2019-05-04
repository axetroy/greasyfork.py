// ==UserScript==
// @name       Ultimate Guitar show all favorites + random favorite button
// @version    0.4
// @description  Automatically shows all your favorites on Ultimate Guitar favorites page and adds a button to open a random favorite in a new tab
// @include      http://my.ultimate-guitar.com/main.php?mode=favorites*
// @include      https://www.ultimate-guitar.com/user/mytabs
// @copyright  Aviem Zur
// @namespace https://greasyfork.org/users/14514
// ==/UserScript==

clickAllBtn = function() {
    unclickedAllBtn = document.evaluate("//div[@class='_1ckKA kRvt3' and text()='All']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    if (unclickedAllBtn !== null) {
        unclickedAllBtn.click();
    }
};

addRandomBtn = function() {
    var favorites = document.evaluate("//div[@class='_7Ivu3']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).children;

    randomBtn = document.createElement("DIV");
    randomBtn.innerText = "Random";
    randomBtn.classList.add("_2Htyr");
    randomBtn.id = "randomBtn";
    randomBtn.style.backgroundColor  = "#534e65";
    randomBtn.onclick = function() {
        randomFav = favorites[Math.floor((Math.random()*favorites.length))];
        randomFavHref = randomFav.children[0].children[1].children[0].children[0].children[0].children[0].href;
        var win = window.open(randomFavHref, '_blank');
        win.focus();
    };
    document.evaluate("//div[text()='Bass']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).parentNode.appendChild(randomBtn);
};

window.addEventListener('load', function() { clickAllBtn(); addRandomBtn(); });