// ==UserScript==
// @name         ByeBillyBye
// @namespace    http://tampermonkey.net/
// @version      0.0.2
// @description  Auto like, best ever!
// @author       gavelweb
// @match        https://www.instagram.com/*
// @grant        none
// ==/UserScript==


var arrUnfollow = [];
var arrFollow = [];

var popUpWindow = "pxaFn";
var secondPopUpWindow = "pxaFn";

var buttonGreyFollowing = "oF4XW sqdOP  L3NKy   _8A5w5   "; // oF4XW sqdOP  L3NKy   _8A5w5

var buttonBlueFollow = "oF4XW sqdOP  L3NKy      "; // oF4XW sqdOP  L3NKy

var newArr = buttonGreyFollowing.split(" ");
console.log(newArr + " First pass");
// console.log(newArr[6]+" First pass");
// newArr = buttonBlueFollow.split(" ");
// console.log(newArr+" Second pass");

// oF4XW,sqdOP,,L3NKy,,,_8A5w5,,, First pass
// oF4XW,sqdOP,,L3NKy,,,,,, Second pass
// [Finished in 0.865s]
console.log("here-----------1");
var firstRun = false;
var score = 0;
var scrooltobottom = 200;
window.addEventListener('DOMContentLoaded', function() {
  if (firstRun === "false") {
    console.log("here-----------2");
    var xEl = document.getElementsByClassName("-nal3 ");
    simulateCliks(allElements[i], 'click', score);
    firstRun == "true";
    console.log(firstRun+"-----------FR---");
  }
  console.log('window - DOMContentLoaded --------'); // 3rd
  function simulateCliks(el, evntType) {
    if (el.fireEvent) {
      el.fireEvent('on' + evntType);
    } else {
      var evObj = document.createEvent('Events');
      evObj.initEvent(evntType, true, false);
      el.dispatchEvent(evObj);
    }
  }
  //  <span class="glyphsSpriteHeart__filled__24__red_5 Szr5J">Unlike</span>
  //  <span class="glyphsSpriteHeart__outline__24__grey_9 Szr5J">Like</span>
  var allElements = []; //	Array of unliked things
  var likeButton = []; //	Array of buttons
  var scrooltobottom = 0;
  var fixedScrool = 100; //	scrool for 600 px
  var timerInt = 1000; //	6 sec
  setInterval(function() {
    console.log("here-----------3");
    allElements = document.getElementsByClassName("BW116");
    console.log("here-----------4");
    console.log(allElements+ "here-----------5");
      if (allElements[score].lastChild.innerHTML == "Follow") {
        simulateCliks(allElements[score].lastChild, 'click', score);
        console.log(score+"passed");
      }
    window.scrollTo(0, scrooltobottom);
    scrooltobottom = scrooltobottom + fixedScrool;
    console.log(score + "-- likes for this session");
    score++;
  }, timerInt);
});
