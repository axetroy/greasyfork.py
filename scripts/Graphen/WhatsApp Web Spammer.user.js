// ==UserScript==
// @name         WhatsApp Web Spammer
// @namespace    graphen
// @version      2.2.1
// @description  Adds a button to repeatedly send the same message in a certain interval.
// @author       Dan6erbond, Graphen
// @match        https://web.whatsapp.com/*
// @icon         https://i.imgur.com/C6GToWK.png
// @grant        none
// ==/UserScript==

/* jshint esversion: 6 */
(function() {
  'use strict';

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

var repeatingSpamFunction = null;
var message = '';
var input = null;

document.addEventListener("click", createSpamButton);
document.addEventListener("keyup", editSpamButton);

function createSpamButton () {
  input = document.querySelector('._2S1VP');
  if (document.getElementById('spamButton')) {
    //console.log("WA Spam: #spamButton already present.");
    return;
  }
  var composeBar = document.querySelector('._3pkkz');
  if (!composeBar) {
    //console.log("WA Spam: composeBar not found.");
    return;
  }

  var spamButton = document.createElement('button');
  spamButton.setAttribute("id", "spamButton");
  spamButton.innerHTML = 'SPAM';
  spamButton.style.fontSize = '100%';
  spamButton.style.padding = '10px 0';
  spamButton.style.margin = '0px 45px 5px 10px';
  insertAfter(spamButton, composeBar.lastChild.previousSibling);

  editSpamButton();
}

function editSpamButton(){
  var spamButton = document.getElementById('spamButton');
  if (!input.innerHTML && message === '') {
    spamButton.style.cursor = 'not-allowed';
    spamButton.style.color = '#D3D3D3';
    spamButton.onclick = void(0);
  } else {
    spamButton.style.cursor = 'pointer';
    spamButton.style.color = '#039be5';
    spamButton.onclick = function() {
      doSpam(this);
    };
  }
}

function doSpam(element) {
  if (element.innerHTML === 'SPAM') {
    if (!input.innerHTML) {
      window.alert('Please enter a text to be spammed before using the spam button.');
      return;
    }
    var interval = 1000 * parseInt(prompt('Please enter spam-interval in seconds:', '3'));
    if (!interval) {
      element.innerHTML = 'SPAM';
      //console.log('WA Spam: Cancelled.');
      return;
    }
    message = input.innerHTML;
    element.innerHTML = 'STOP';
    sendMessage(); // start immediately
    repeatingSpamFunction = window.setInterval(function(){
      sendMessage();
    }, interval);
  } else {
    window.clearInterval(repeatingSpamFunction);
    message= '';
    element.innerHTML = 'SPAM';
  }
  editSpamButton();
}

function sendMessage () {
  var evt = new Event('input', {
    bubbles: true
  });
  input.innerHTML = message;
  input.dispatchEvent(evt);

  document.getElementsByClassName('_35EW6')[0].click(); // click send button
}

})();
