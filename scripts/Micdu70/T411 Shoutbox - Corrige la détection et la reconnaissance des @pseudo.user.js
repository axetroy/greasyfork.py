// ==UserScript==
// @name         T411 Shoutbox - Corrige la détection et la reconnaissance des @pseudo
// @namespace    www.t411.ch
// @version      1.3.1
// @description  Corrige et remplace tous les @pseudo présents dans les messages en lien cliquable vers leur profil
// @author       Micdu70
// @include      http://www.t411.al/chati/*
// @include      https://www.t411.al/chati/*
// @grant        none
// ==/UserScript==
function CheckUsername() {
    document.getElementById('messages').addEventListener('DOMNodeInserted', function (event) {
        if (event.target.parentNode.id == 'messages') {
            var element = document.getElementsByClassName(event.target.className)[0];
            var message = element.getElementsByTagName('p')[0];
            var message0 = message.innerHTML;
            if (message0.indexOf('<a href="/users/profile') !== -1) {
                var username = message0.split('>')[1];
                if (username.charAt(0) == '@') {
                    username = username.replace(/\s/, '');
                    var follow = message0.substr(message0.indexOf('</a>'));
                    message0 = username + follow;
                }
            }
            var re = /(@([a-zA-Z0-9_-]+))/g;
            var message1 = message0.replace(re, '<a href="/users/profile/$2" target="_blank">$1</a>');
            message.innerHTML = message1;
        }
    }
                                                        );
}
CheckUsername();