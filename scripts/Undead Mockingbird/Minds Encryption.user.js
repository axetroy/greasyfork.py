// ==UserScript==
// @name         Minds Encryption
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Encrypt and decrypt messages on Minds on the fly.
// @author       Undead Mockingbird
// @match        https://www.minds.com/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js
// @grant        none
// ==/UserScript==

/************************************************
 * HOW TO USE  HOW TO USE  HOW TO USE  HOW TO USE
 ************************************************
 * Encrypt a message on minds by ending it with
 * two slashes and then hitting space.
 *
 * Messages that have been encrypted with the
 * the same password will be automatically
 * decrypted and appear in red.
 */

// CONFIG: Insert your password here.
var password = "adfaldskfjlkadsf";
/////////////////////////////////////

// Replace any messages we manage to decrypt.
function decryptDiscordMessages(password) {
    setTimeout(function(){decryptDiscordMessages(password)}, 10);
    var nodes = document.querySelectorAll('.m-commentBubble__message, .m-mature-message-content');

    for (var i = nodes.length; i--;) {
        if (nodes[i].__decrypted != undefined) continue;
        nodes[i].__decrypted = true;

        var text = nodes[i].innerText;
        if (text.endsWith('(edited)')) {
            text = text.slice(0, -'(edited)'.length);
        }
        var decrypted = CryptoJS.AES.decrypt(text, password);
        if (decrypted == "") continue;
        try {
            var message = decrypted.toString(CryptoJS.enc.Utf8);
            if (message == "") continue;
            nodes[i].innerHTML = '<div style="color:red">' + message + '</div>';
        } catch (error) {}
    }
}
decryptDiscordMessages(password);

function registerMessageHook() {
    setTimeout(registerMessageHook, 50);
    var targetNode = document.getElementsByClassName('m-editor')[0];
    if (targetNode == undefined) return;

    targetNode.onkeydown = function(e){
        var message = targetNode.textContent;
        if (message.endsWith('//') && e.keyCode == 32) {
            message = message.slice(0, -2);
            console.log(message);
            var cypher = CryptoJS.AES.encrypt(message, password);
            targetNode.textContent = cypher;
            return false;
        }
    };
}
registerMessageHook();

function registerMessageHook2() {
    setTimeout(registerMessageHook2, 50);
    var targetNode = document.getElementById('message');
    if (targetNode == undefined) return;

    targetNode.onkeydown = function(e){
        var message = targetNode.value;
        if (message.endsWith('//') && e.keyCode == 32) {
            message = message.slice(0, -2);
            console.warn(message);
            var cypher = CryptoJS.AES.encrypt(message, password);
            targetNode.value = cypher;
        }
    };
}
registerMessageHook2();
