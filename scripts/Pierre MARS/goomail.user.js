// ==UserScript==
// @name         goomail
// @namespace    https://greasyfork.org/fr/scripts/16549
// @version      0.6
// @description  Skin for gmail
// @author       cozen
// @include      https://mail.google.com/*
// @include      http://mail.google.com/*
// @grant        none
// ==/UserScript==

window.onload = function() {
    var burger = document.createElement('div'),
        bTop = document.createElement('div'),
        bMid = document.createElement('div'),
        bBot = document.createElement('div'),
        logoRemover = document.getElementById('gbq1');

    while (logoRemover !== null && logoRemover.firstChild !== null) {
        logoRemover.removeChild(logoRemover.firstChild);
    }

    burger.id = "burger";
    burger.className = "menu";
    bTop.id = "bTop";
    bMid.id = "bMiddle";
    bBot.id = "bBottom";
    burger.appendChild(bTop);
    burger.appendChild(bMid);
    burger.appendChild(bBot);

    burger.style.width = "48px";
    burger.style.height = "48px";
    burger.style.position = "absolute";
    burger.style.top = "8px";
    burger.style.left = "16px";
    burger.style.zIndex = "+11";

    bTop.style.position = "absolute";
    bTop.style.width = "50%";
    bTop.style.height = "2px";
    bTop.style.background = "#000";
    bTop.style.borderRadius = "2px";
    bTop.style.top = "17px";
    bTop.style.left = "50%";
    bTop.style.transform = "translateX(-50%)";
    bTop.style.transition = ".25s";

    bMid.style.position = "absolute";
    bMid.style.width = "50%";
    bMid.style.height = "2px";
    bMid.style.background = "#000";
    bMid.style.borderRadius = "2px";
    bMid.style.top = "23px";
    bMid.style.left = "50%";
    bMid.style.transform = "translateX(-50%)";
    bMid.style.transition = ".25s";

    bBot.style.position = "absolute";
    bBot.style.width = "50%";
    bBot.style.height = "2px";
    bBot.style.background = "#000";
    bBot.style.borderRadius = "2px";
    bBot.style.top = "29px";
    bBot.style.left = "50%";
    bBot.style.transform = "translateX(-50%)";
    bBot.style.transition = ".25s";

    var navbar = document.getElementsByClassName("nH oy8Mbf nn aeN");
    if (navbar.length == 1) {

        var navComp = document.getElementsByClassName('aj5 J-KU-Jg'),
            mainBody = document.getElementsByTagName("body");

        mainBody[0].insertBefore(navbar[0], mainBody[0].firstChild);
        mainBody[0].insertBefore(burger, mainBody[0].firstChild);
        navComp[0].style.bottom = "0";
        navbar[0].style.background = "#FFF";
        navbar[0].style.borderRadius = "2px";
        navbar[0].style.boxSizing = "border-box";
        navbar[0].style.height = "auto";
        navbar[0].style.left = "-" + (parseInt(navbar[0].style.width, 10) + 12) + "px";
        navbar[0].style.position = "absolute";
        navbar[0].style.top = "0";
        navbar[0].style.transition = ".25s";
        navbar[0].style.zIndex = "+10";

        burger.onclick = function openNav() {
            if (navbar[0].classList.contains("opened")) {
                navbar[0].classList.remove('opened');
                var hidenav = parseInt(navbar[0].style.width, 10) + 12;
                navbar[0].style.left = "-" + hidenav + "px";
                bTop.style.transform = "translateX(-50%)";
                bBot.style.transform = "translateX(-50%)";
            } else {
                navbar[0].className += " opened";
                navbar[0].style.left = "12px";
                navbar[0].style.top = "12px";
                navbar[0].style.height = "auto";
                navbar[0].style.paddingTop = "32px";
                navbar[0].style.boxShadow = "2px 2px 4px rgba(0,0,0,.75)";
                bTop.style.transform = "translateX(-89%) rotate(-45deg) scaleX(.5) translateY(3px)";
                bBot.style.transform = "translateX(-89%) rotate(45deg) scaleX(.5) translateY(-3px)";
            }
        };

        var newMail = document.getElementsByClassName('T-I J-J5-Ji T-I-KE L3');
        if (typeof newMail[0] == Node) {
            mainBody[0].insertBefore(newMail[0], mainBody[0].firstChild);
            newMail[0].style.position = "absolute";
            newMail[0].style.bottom = "8px";
            newMail[0].style.right = "16px";
            newMail[0].style.zIndex = "+12";
        }
    }
    //############################################################################################ ROLES LIST ##################################################################################
    var table = [
            [],
            []
        ],
        roles = [],
        objets = [],
        ElementsWithRole = document.querySelectorAll("[role]");

    for (var i = ElementsWithRole.length - 1; i >= 0; i--) {
        var objRole = ElementsWithRole[i].tagName,
            libelle = ElementsWithRole[i].getAttribute('role');
        if (roles[libelle] === undefined) {
            roles[libelle] = 1;
            objets[objRole] = libelle;
        }
        roles[libelle] += 1;
        objets[objRole] += " " + libelle;
        table = [roles, objets];

        if (libelle == "tablist") {
            ElementsWithRole[i].style.background = "#FFF";
        }
    }

    console.log(table);
    //############################################################################################ ROLES LIST ##################################################################################




    //############################################################################################ SYTLES ######################################################################################

    var changement = new MutationObserver(function(changes) {
        changes.forEach(function(change) {
            if (change.type == 'attributes') {
//                console.log(change.target);
//                console.log(change);
//                console.log(change.target.style.width);
                change.target.style.width = '100%';
                change.target.parentNode.style.float = 'none';
            }
        });
    });

    var observerConfig = {
        attributes: true
    };

    var widthInit = document.getElementsByClassName('nH nn');
    for (var e = widthInit.length - 1; e >= 0; e--) {
        if (widthInit[e] !== null && widthInit[e].classList.length == 2) {
            var w = parseInt(widthInit[e].style.width, 10);
            if (w > 20) {
                console.log(w);
                console.log(widthInit[e]);
                widthInit[e].parentNode.style.float = "none";
                widthInit[e].style.width = '100%';
                changement.observe(widthInit[e], observerConfig);
            }
        }
    }

    var docHead = document.head || document.getElementsByTagName('head')[0],
        customStyles = document.createElement('style');
    customStyles.type = 'text/css';

    var innerStyles = document.createTextNode(
        "@font-face {" +
        "font-family: 'Roboto'; font-style: normal; font-weight: 400;" +
        "src: local('Roboto Regular')," +
        "local('Roboto-Regular')," +
        "url(http: //themes.googleusercontent.com/static/fonts/roboto/v11/2UX7WLTfW3W8TclTUvlFyQ.woff) format('woff');}" +
        " *{" +
        "font-family: 'Roboto', 'Lato', 'Open Sans', sans-serif !important;" +
        "text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased;}"
    );
    customStyles.appendChild(innerStyles);
    docHead.appendChild(customStyles);

    //############################################################################################ MUTATION OBSERVERS ##########################################################################
    // var observer = new MutationObserver(function(mutations) {
    //     mutations.forEach(function(mutation) {
    //         console.log('Mutation type: ' + mutation.type);
    //         if (mutation.type == 'childList') {
    //             if (mutation.addedNodes.length >= 1) {
    //                 if (mutation.addedNodes[0].nodeName != '#text') {
    //                     console.log('Added ' + mutation.addedNodes[0].tagName + ' tag.');
    //                 }
    //             } else if (mutation.removedNodes.length >= 1) {
    //                 console.log('Removed ' + mutation.removedNodes[0].tagName + ' tag.');
    //             }
    //         } else if (mutation.type == 'attributes') {
    //             console.log('Modified ' + mutation.attributeName + ' attribute.');
    //         }
    //     });
    // });
    //
    // var observerConfig = {
    //     attributes: true,
    //     childList: true,
    //     characterData: true
    // };

    // // Listen to all changes to body and child nodes
    // var targetNode = document.body;
    // observer.observe(targetNode, observerConfig);
    //############################################################################################ MUTATION OBSERVERS ##########################################################################

};
