// ==UserScript==
// @name         cldmine
// @namespace    http://your.homepage/
// @version      0.3
// @description  enter something useful
// @author       You
// @match        https://cldmine.com/mining
// @grant        none
// ==/UserScript==

var mineUsdButton = document.getElementsByTagName('input')[4];
var mineBtcButton = document.getElementsByTagName('input')[7];
var mineLtcButton = document.getElementsByTagName('input')[10];
var mineDogeButton = document.getElementsByTagName('input')[13];


var usdPerHour,  btcPerHour, btcPrice, ltcPrice, dogePerHour, dogePrice;

UpdatePrices();

function UpdatePrices() {
    usdPerHour = parseFloat(document.getElementById('1').childNodes[3].childNodes[9].childNodes[1].childNodes[1].innerHTML);
    btcPerHour = parseFloat(document.getElementById('3').childNodes[3].childNodes[9].childNodes[1].childNodes[1].innerHTML);
    btcPrice = parseFloat(document.getElementById('3').childNodes[3].childNodes[11].childNodes[1].childNodes[1].innerHTML);
     //document.getElementById('3').childNodes[3].childNodes[9].childNodes[1].childNodes[1].innerHTML = btcPerHour * btcPrice * 24 + " usd per day";
    ltcPerHour = parseFloat(document.getElementById('4').childNodes[3].childNodes[9].childNodes[1].childNodes[1].innerHTML);
    ltcPrice = parseFloat(document.getElementById('4').childNodes[3].childNodes[11].childNodes[1].childNodes[1].innerHTML);
    dogePerHour = parseFloat(document.getElementById('5').childNodes[3].childNodes[9].childNodes[1].childNodes[1].innerHTML);
    dogePrice = parseFloat(document.getElementById('5').childNodes[3].childNodes[11].childNodes[1].childNodes[1].innerHTML);
    
    btcPerHourInUSD = btcPerHour * btcPrice;
    ltcPerHourInUSD = ltcPerHour * ltcPrice;
    dogePerHourInUSD = dogePerHour * dogePrice;
    
    priceArray = [usdPerHour, btcPerHourInUSD, ltcPerHourInUSD, dogePerHourInUSD];
    priceArray.sort();
    highestPayout = priceArray[3];
    if (highestPayout == usdPerHour) {if (mineUsdButton.value == "Mining") mineUsdButton.click();}
    else if (highestPayout == btcPerHourInUSD) {if (mineBtcButton.value == "Mining") mineBtcButton.click();}
    else if (highestPayout == ltcPerHourInUSD) {if (mineLtcButton.value == "Mining") mineLtcButton.click();}
    else if (highestPayout == dogePerHourInUSD) {if (mineDogeButton.value == "Mining") mineDogeButton.click();}
    
    //console.log(priceArray[3]);
    //console.log("mining btc makes " + btcPerHour * btcPrice + " per hour");
    //console.log("mining ltc makes " + ltcPerHour * ltcPrice + " per hour"); 
    //console.log("mining doge makes " + dogePerHour * dogePrice + " per hour"); 
    
    //alert("usd=" + usdPerHour + " usd per hour\n" + "btc=" + btcPerHour * btcPrice + " usd per hour\n" + "ltc=" + ltcPerHour * ltcPrice + " usd per hour" + "doge=" + dogePerHour * dogePrice + " usd per hour");

    console.log("usd=" + usdPerHour + " usd per hour\n" + "btc=" + btcPerHour * btcPrice + " usd per hour\n" + "ltc=" + ltcPerHour * ltcPrice + " usd per hour\n" + "doge=" + dogePerHour * dogePrice + " usd per hour")

setTimeout(function(){ location.reload(); }, 120000); // run every 2 minutes (120000 ms)
setTimeout(function(){ UpdatePrices(); }, 120000); // run every 2 minutes (120000 ms)
}