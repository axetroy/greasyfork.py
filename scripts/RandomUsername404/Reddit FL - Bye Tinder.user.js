// ==UserScript==
// @name         Reddit FL - Bye Tinder
// @author       RandomUsername404
// @namespace    https://greasyfork.org/en/users/105361-randomusername404
// @version      0.9
// @description  Cache les top-comments qui parlent de Tinder sur le FL de /r/france (Old Reddit).
// @run-at       document-start
// @include      https://old.reddit.com/r/france/*
// @grant        none
// @icon         https://i.imgtc.com/Fz9pURU.png
// ==/UserScript==

var indexLastLinkMoreCmts;
var targetNode;
var config;
var callback;
var observer;
var regex = new RegExp('(?:^|\\W)tinder|tinderette|bumble|badoo|un date|mon date(?:$|\\W)');
var flair = " 💗𝐓𝐈𝐍𝐃𝐄𝐑💗";

window.onload = function() {
    if (document.getElementsByTagName("title")[0].innerHTML.includes("Forum Libre")) { //document.title non compatible avec tous les navigateurs
        byeTinder();

        // Surveillance si de nouveaux commentaires sont chargés
        indexLastLinkMoreCmts = document.getElementsByClassName("morechildren").length - 1;
        targetNode = document.getElementById((document.getElementsByClassName("morechildren")[indexLastLinkMoreCmts]).id);
        config = { attributes: false, childList: true, subtree: true };

        callback = function(mutationsList, observer) {
            for (var mutation of mutationsList) {
                if (mutation.type == 'childList') {
                    setNewObserverAndByeTinder();
                }
            }
        };
        observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    }
}

function setNewObserverAndByeTinder() {
    observer.disconnect();
    setTimeout(function() {
        indexLastLinkMoreCmts = document.getElementsByClassName("morechildren").length - 1;
        targetNode = document.getElementById((document.getElementsByClassName("morechildren")[indexLastLinkMoreCmts]).id);
        byeTinder();
        observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    }, 1000);
}

function byeTinder() {
    var nbComments = document.getElementsByClassName("usertext").length;
    var compteur;

    for (compteur = 0; compteur < nbComments; compteur++) {
        var oneComment = document.getElementsByClassName("usertext")[compteur];
        var text = oneComment.parentElement.innerHTML.toLowerCase();
        //text = text.replace(/[^ -~]+/g, "");

        // N'agit que sur les top commentaires
        if (!text.includes('data-event-action="parent"')) {
            if (text.search(regex) !== -1) {
                oneComment.parentElement.parentElement.classList.replace("noncollapsed", "collapsed");

                // Evite d'afficher le flair plusieurs fois de suite sur le même commentaire lors de chargements
                if (!oneComment.previousSibling.innerHTML.includes(flair)) {
                    oneComment.previousSibling.append(flair);
                }
            }
        }
    }
}