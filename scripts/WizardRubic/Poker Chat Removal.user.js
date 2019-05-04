// ==UserScript==
// @name         Poker Chat Removal
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world! i mean remove the poker beta chat
// @author       WizardRubic
// @match        *.torn.com/*
// @grant        none
// ==/UserScript==



(function() {
    'use strict';
    var chatNode;
    var mutationConfig = { attributes: true, childList: true, subtree: true };
    var collectionOfChats;
    // Callback function to re-hide the chat node anytime it respawns
    var callback = function(mutationsList) {
        console.log("test message");
        collectionOfChats = document.getElementsByClassName("chat-box-title_out6E");
        for(var mutation of mutationsList) {
            for(var index = collectionOfChats.length-1; index>=0; index--) {
                if(collectionOfChats[index].title == "Poker Beta") {
                    collectionOfChats[index].parentElement.style.display = "none";
                }
            }
        }
    };
    // Remove the poker chat upon page load and set a reference to the big chat node
    collectionOfChats = document.getElementsByClassName("chat-box-title_out6E");
    for(var index = collectionOfChats.length-1; index>=0; index--) {
        if(collectionOfChats[index].title == "Poker Beta") {
            collectionOfChats[index].parentElement.style.display = "none";
            chatNode = collectionOfChats[index].parentNode.parentNode.parentNode;
        }
    }
    // Create an observer to watch the poker chat for respawn attempts
    var observer = new MutationObserver(callback);
    observer.observe(chatNode, mutationConfig);
})();


