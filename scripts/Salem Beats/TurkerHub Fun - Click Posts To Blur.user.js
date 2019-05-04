// ==UserScript==
// @name         TurkerHub Fun - Click Posts To Blur
// @namespace    salembeats
// @version      1.3
// @description  Just messing around with CSS filters and pretending I'm doing something useful.
// @author       You
// @include      https://turkerhub.com/threads/*/*
// @grant        GM_getValue
// @grant        GM_setValue
// @icon         https://i.imgur.com/zQoYqAM.gif
// ==/UserScript==

function getLiParentOf(element) {
    var nextParent = event.target.parentElement;

    while(nextParent) {
        if(nextParent.nodeName === "LI" && nextParent.classList && nextParent.classList.contains("message")) {break;}
        nextParent = nextParent.parentElement;
    }

    return nextParent;
}

function isLiHiddenByScript(messageLi) {
    return (GM_getValue(messageLi.id) === "hide");
}

function hideMessageByLi(messageLi) {
    GM_setValue(messageLi.id, "hide");

    messageLi.style.filter = "blur(3px)";
    messageLi.style.transform = "scale(0.5) rotate(5deg)";
    messageLi.style.transition = "0.3s cubic-bezier(.78,-0.81,.31,1.9)";
}

function showMessageByLi(messageLi) {
    GM_setValue(messageLi.id, "display");

    messageLi.style.filter = "";
    messageLi.style.transform = "";
}

document.body.addEventListener("click", event => {
    var message = getLiParentOf(event.target);

    if(message) {
        if(isLiHiddenByScript(message)) {
            showMessageByLi(message);
        }
        else {
            hideMessageByLi(message);
        }
    }
});

Array.from( document.querySelectorAll("li.message") )
    .forEach( message => {
    if(isLiHiddenByScript(message)) {
        hideMessageByLi(message);
    }
});