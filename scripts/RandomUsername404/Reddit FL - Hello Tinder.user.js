// ==UserScript==
// @name         Reddit FL - Hello Tinder
// @author       RandomUsername404
// @namespace    https://greasyfork.org/en/users/105361-randomusername404
// @version      0.8
// @description  Ajoute un bouton qui cache les top-comments qui ne parlent PAS de Tinder sur le FL de /r/france (Old Reddit).
// @run-at       document-start
// @include      https://old.reddit.com/r/france/*
// @grant        none
// @icon         https://i.imgtc.com/kAtByTB.png
// ==/UserScript==

var indexLastLinkMoreCmts;
var targetNode;
var config;
var callback;
var observer;
var bool;
var regex = new RegExp('(?:^|\\W)tinder|tinderette|okcupid|bumble|badoo|un date|mon date|adopte un mec|meetic|mon ex|mon copain|ma copine|ma femme|mon mari|ma fiancée|mon fiancé(?:$|\\W)');
var flair = " 🌘𝐙𝐙𝐙𝐙🌒";

window.onload = function() {
    if (document.getElementsByTagName("title")[0].innerHTML.includes("Forum Libre")) { //document.title non compatible avec tous les navigateurs

        // Au chargement de la page, surveillance désactivée
        bool = 0;

        // Création du bouton pour déclencher le masquage
        var btn = document.createElement("BUTTON");
        btn.innerHTML = 'Tinder <img src="https://svgur.com/i/CNH.svg" height="10px">';
        var zoneAjoutBtn = document.getElementsByClassName("panestack-title")[0];

        btn.style.float = "right";
        btn.style.marginLeft = "5px";
        btn.style.lineHeight = "12px";
        btn.style.backgroundImage = "linear-gradient(to top right, #e6457c, #fb8b3e)";
        btn.style.borderRadius = "5px";
        btn.style.fontWeight = "bold";
        btn.style.fontFamily = "inherit";

        zoneAjoutBtn.appendChild(btn);

        // Lorsque bouton pressé, active la surveillance et masque certains commentaires
        btn.onclick = function() {
            if (bool == 1) {
                bool = 0;
                observer.disconnect();
            } else {
                bool = 1;
                surveillance();
            }
            helloTinder();
        }
    }
}

// Surveillance si de nouveaux commentaires sont chargés
function surveillance() {
    indexLastLinkMoreCmts = document.getElementsByClassName("morechildren").length - 1;
    targetNode = document.getElementById((document.getElementsByClassName("morechildren")[indexLastLinkMoreCmts]).id);
    config = { attributes: false, childList: true, subtree: true };

    callback = function(mutationsList, observer) {
        for (var mutation of mutationsList) {
            if (mutation.type == 'childList') {
                // Si le bouton a été pressé, masque certains commentaires et reprend la surveillance
                if (bool == 1) {
                    setNewObserverAndHelloTinder();
                }
            }
        }
    };
    observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}

function setNewObserverAndHelloTinder() {
    observer.disconnect();
    setTimeout(function() {
        indexLastLinkMoreCmts = document.getElementsByClassName("morechildren").length - 1;
        targetNode = document.getElementById((document.getElementsByClassName("morechildren")[indexLastLinkMoreCmts]).id);
        helloTinder();
        observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    }, 1400);
}

function helloTinder() {
    var nbComments = document.getElementsByClassName("usertext").length;
    var compteur;

    for (compteur = 0; compteur < nbComments; compteur++) {
        var oneComment = document.getElementsByClassName("usertext")[compteur];
        var text = oneComment.parentElement.innerHTML.toLowerCase();

        // N'agit que sur les top commentaires
        if (!text.includes('data-event-action="parent"')) {

            // Si bouton a été pressé (et donc la surveillance activée), replie certains commentaires
            if (bool == 1) {
                if (text.search(regex) === -1) {
                    oneComment.parentElement.parentElement.classList.replace("noncollapsed", "collapsed");

                    // Evite d'afficher le flair plusieurs fois de suite sur le même commentaire lors de chargements
                    if (oneComment.previousSibling != null && !oneComment.previousSibling.innerHTML.includes(flair)) {
                        oneComment.previousSibling.append(flair);
                    }
                }
            }

            // Si bouton re-pressé, rétablit l'état précédent des commentaires
            else {
                if (oneComment.previousSibling != null && oneComment.previousSibling.innerHTML.includes(flair)) {
                    oneComment.parentElement.parentElement.classList.replace("collapsed", "noncollapsed");
                }
            }
        }
    }
}