// NOTE: WORKING BOOKLET CODE FOR QUICKSTARTING THIS WILL COME SOON

// INTRODUCTION: How the Script works
// This Script Automatically bets on Dice at whatever multiplier you set on CSGOHandouts.
// This script features a maxbet with the option to reset and an on loss multiplier you can configure down below in the variables.
// on default the init bet is set to 0.01 aka the min value on the site. however you may suit this to your needs
// To start on the site and kickstart your strategy you may fill out surveys on the site or use my refferal code
// the reason this bot exists is for issues with afking the current house outo bet at CSGOHandouts.com.
// not only does the house bot stop at the slightest disconnection from the server.
// additionally the house bot may stop in a decend loose streak loosing you alot of money you would have usually made back.

// ----------------shameless Script Advertisement Time!---------------------

// this script does not scam or send me any coins, however i would greatly appreciate if you would use my refferal link
// which gives me a small bonus: https://csgohandouts.com/?r=59f4de9fbe97d302ed4c984d
// Additionally you may also support me by trying these sites using my Refferal code!
// (There is a Document of many ref codes in this git!)

// ----------------shameless Script Advertisement Time Over!----------------
 
// PROs of using the script:
// - The first and most important feature is that this bot makes sure you can sustain afk betting even with those small connection breaks
// - Another great factor is its great customizability, you can change basebet, multiplier on loss and maxbet however you like
// - Paired with this script you can find a strategy and script guide which i definatly recommend taking a look at
// - lots of ways to get requests into the mix! i try to  take many suggestions for strategys and new options/modes 
// and put them into the script, you may request them in this git!

// How to use the Script: Press F12 on CSGOHandouts.com/dice and go to console. if not selected select "top" in the dropdown
// after that simply compy and paste the following code. Alternatively you can see at the top of this script if there is a Booklet
// code available. 
//---------------------------COPY BELOW THIS LINE--------------------------------------
// ==UserScript==
// @name            Syrus - The CSGOHandouts Dice Script
// @description     An script that automates csgohandouts.com Dice Betting by with lots of customizability
// @namespace       automated@Kulltero
// @version         V1.0 - Initial Release
// @author          Kulltero
// @match           https://csgohandouts.com/
// @run-at          document-end
// @grant           none
// ==/UserScript==


// Time to customize your variables! if you need any help or further description visit 
// https://github.com/Kulltero/CSGO-Betting-Scripts/blob/master/CSGOHandouts%20Script%20Guide

// For the Mutlloss set it to 2 for Martingale and to 4.6 for my custom safe strat (See Link above!)
var init = 0.01 // this is your basebet. your bet the script of your choosing does on win/first: 0.01 is the min bet and 40000 is the max
var delay = 200; // Delay in milliseconds between bets, i recommend to adjust this if your connection/computer is slow
// NOTE: Dont Put the Delay Value at a value lower than 180 as that will only put more strain on the site and not do it any faster.
var maxBetValue = 40000 // a safe value which the script will never overpass. if this value is reached the bet is put back to basebet.
var MultLoss = 4.6 // you may change this to your liking/strategy but remember that this value you may break your strategy entirely
// unless you set it right.

 
// SCRIPT INITIALIZATION! - DONT TOUCH AFTER THIS POINT!!!!
var start = init;
var btRoll = document.getElementById("roll");
var tbBet = document.getElementById("bet");
var btOverUnder = document.getElementById("oddsOverUnder");
var rollUnder;
var loop = true;
var firstTime = true;
 alert("Syrus Has been Succesfully loaded and is ready for use! Good luck -Kulltero");
//--------------------------------------------------------------------------------------------
//------------------------------ DO NOT CHANGE AFTER THIS LINE--------------------------------
//--------------------------------------------------------------------------------------------
function checkOverUnder() {
    if ((btOverUnder.value).indexOf("<") != "0") {
        btOverUnder.click();
    }
rollUnder = parseInt((btOverUnder.value).replace(/[^\d.]/g,''));
}
 
// Create the interface
var menu = document.createElement('div');
menu.innerHTML = '' +
    '<div class="form-group">' +
    '<div class="text-center col-sm-8 col-sm-offset-4">' +
    '<p><a href="https://github.com/CSGOTECH/CSGOHandOuts-Automated-by-CSGO TECH"> Syrus - The CSGOHandouts Dice Bot <small>by Kulltero</small></a></p>' +
    '<input id="rollscript" type="button" value="| Start the Script |" onClick="startscript()">' +
    '<input id="rollscript" type="button" value="| End the Script |" onClick="endscript()">' +
    '</div>' +
    '</div>';
document.getElementsByClassName('form-horizontal')[0].appendChild(menu);

function startscript() {
    alert("Script started!\n - Base bet: " + init + "\n - Max bet: " + maxBetValue + "\n - Delay (ms): " + delay);
    loop = true;
    firstTime = false;
    checkOverUnder();
 
    function roll() {
        if (loop === true) {
            tbBet.value = start;
            btRoll.click();
            refreshIntervalId = setInterval(roll2, delay);
        }
    }
 
    function roll2() {
        var thestring = document.getElementById('roll').value;
        var thenumber = retnum(thestring);
        if (thenumber < rollUnder) {
            start = init;
        }
        if (thenumber > rollUnder) {
            start = (start * MultLoss).toFixed(2);
        }
        if (start > maxBetValue) {
            start = init;
        }
        btRoll.click();
        clearInterval(refreshIntervalId);
        roll();
    }
 
    function retnum(str) {
        var num = str.replace(/[^0-9]/g, '');
        var number = parseInt(num);
        return number;
    }
    roll();
}
 
function endscript() {
    loop = false;
}
 
function changebase() {
    n = init
    if (firstTime === true) {
        start = init;
    }
}
 
function changemax() {
    n = parseFloat(Math.floor(document.getElementById('goCoins').innerHTML).toFixed(2));
    maxBetValue = parseFloat(prompt("Please enter the new maximum bet", n));
}
 
function changedelay() {
    delay = parseInt(prompt("Please enter the new delay (milliseconds)", "200"));
}