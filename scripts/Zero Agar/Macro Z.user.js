// *************
// NOTICE TO YOU
// ****************************************************************************************************
// This script is for my subscribers or people who watched my tutorials.
// Specifically made to support my tutorial and I'm offering it as is.
// If you don't like the keys I have setup then modify it to your liking.
// Please don't ask me to make you one or make different keys. To change
// keys it's easy. I labeled them for you, you just need to change the key mapping
// for java script. Also, when you put this on your site, you don't need Tampermonkey
// or any other Script Extension. Thank you for watching and supporting my channel.
// ******************************************************************************************************
// AND WHY DO I STRUGGLE TO GET SUBS? BECAUSE I DO'T MAKE STUPID VIDEOS AND CALL THEM EPIC POP SPLIT,
// EPIC TEAM TROLL, EPIC 128K MASS FROM EPIC VANISH SPLIT FROM ANOTHER EPIC BULLSHIT CLICK BAIT!!!!!!!!!
// *******************************************************************************************************

// ==UserScript==
// @name         Macro Z
// @version      1.3
// @description  Press & hold W for macro feed, Press A to split 2x, Press S to plit 16x.
// @author       kien io?
// @match        http://zapphy.epizy.com/*
// @match        PUT YOUR SITE LINK HERE
// @grant        none
// @run-at       document-end
// @namespace https://greasyfork.org/users/139051
// ==/UserScript==

// User input.
window.addEventListener("keydown", keydown);
window.addEventListener("keyup", keyup);

//Load macros
var canFeed = false;
var canSplit = false;
function keydown(event) {
switch (event.keyCode) {
case NUMERO: //Macro Sebar
          canFeed = true;
          feed();
          break;
case NUMERO: //Marco Doblespit
          split();
          setTimeout(split, 40);
          break;
  }
}

//When a player lets go of S stop splitting
function keyup(event) {
  if (event.keyCode == NUMERO DE "MACRO DE X16")
      canSplit = false;

}

//When a player lets go of W stop feeding
function keyup(event) {
  if (event.keyCode == NUMERO DE "MACRO SEBAR")
      canFeed = false;
}

//Alias for W key
function feed() {
  if (canFeed) {
      window.onkeydown({keyCode: 87});
      window.onkeyup({keyCode: 87});
      setTimeout(feed, 0);
  }
}

//Alias for SPACE
function split() {
  $("body").trigger($.Event("keydown", { keyCode: 32}));
  $("body").trigger($.Event("keyup", { keyCode: 32}));
}
(function() {
    var amount = 6;
    var duration = 30; //ms

    var overwriting = function(evt) {
        if (evt.keyCode === NUMERO) { // TECLA X16
            for (var i = 0; i < amount; ++i) {
                setTimeout(function() {
                    window.onkeydown({keyCode: 32}); // KEY_SPACE
                    window.onkeyup({keyCode: 32});
                }, i * duration);
            }
        }
    };
    window.addEventListener('keydown', overwriting);
})();