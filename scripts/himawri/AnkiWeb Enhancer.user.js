// ==UserScript==
// @name         AnkiWeb Enhancer
// @namespace    http://www.kanojo.de/ankiweb/
// @version      0.1
// @description  Make AnkiWeb behave somewhat like Anki Desktop
// @author       Eefi
// @match        https://ankiuser.net/study/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // adapted from https://stackoverflow.com/questions/3219758/detect-changes-in-the-dom/14570614#14570614
    var observeDOM = (function(){
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

        return function(obj, callback){
            if( MutationObserver ){
                // define a new observer
                var obs = new MutationObserver(function(mutations, observer){
                    callback();
                });
                // have the observer observe foo for changes in children
                obs.observe( obj, { childList:true, subtree:true, attributes:true });
            }
        };
    })();

    var getCardId = function() {
        var editButton = document.getElementById('leftStudyMenu').children[0];
        var onClickString = editButton.attributes.onclick.value;
        var cardId = /\d+/g.exec(onClickString)[0];
        return cardId;
    };

    var currentCard = "0";

    var play = function() {
        var playButtons = document.getElementsByClassName('jp-play');
        var playButton = playButtons[playButtons.length - 1];
        playButton.click();
    };

    var cardChanged = function() {
        console.log('something changed');
        var cardId = getCardId();
        if (currentCard !== cardId) {
            currentCard = cardId;
            $("#_player_1").bind($.jPlayer.event.ready, function() {
                console.log('ready');
                play();
            });
            console.log('click');
        }
    };

    var init = function() {
        var card = document.getElementById('qa_box');
        console.log('DOM loaded');
        observeDOM(card, function() {
            cardChanged();
        });
        window.onkeyup = function(e) {
            var key = e.keyCode ? e.keyCode : e.which;
            console.log('keypress: ' + key);
            if (key == 32) { // space
                document.getElementById('ansbuta').click();
            } else if (key == 49) { // 1
                document.getElementById('ease1').click();
            } else if (key == 50) { // 2
                document.getElementById('ease2').click();
            } else if (key == 51) { // 3
                document.getElementById('ease3').click();
            } else if (key == 52) { // 4
                document.getElementById('ease4').click();
            } else if (key == 82) { // R
                play();
            }
        }
    };

    if (document.readyState == "complete" || document.readyState == "loaded" || document.readyState == "interactive") {
        console.log("Already Loaded");
        init();
    } else {
        document.addEventListener("DOMContentLoaded", function(event) {
            console.log("Just Loaded");
            init();
        });
    }

})();