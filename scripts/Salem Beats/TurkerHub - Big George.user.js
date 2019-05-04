// ==UserScript==
// @name         TurkerHub - Big George
// @namespace    salembeats
// @version      6.1
// @description  Bye george.
// @author       Cuyler Stuwe (salembeats)
// @include      https://turkerhub.com/*
// @grant        none
// ==/UserScript==

let bigFlip = false;
let krakenIsBeingReleased = false;
let krakenId;

function loveEverything() {
    document.querySelectorAll("img[alt='Love']").forEach( (el) => { el.parentElement.click(); });
}

function loveSomethingRandom() {
    let allTheLoves = document.querySelectorAll("img[alt='Love']");
    let thingIndexToLove = Math.floor(Math.random()*(allTheLoves.length-1));
    allTheLoves[thingIndexToLove].click();
}

function stayInYourLaneSpider() {
    // document.querySelector(".spider_4").style.transform = "translateX(100px)";
    document.querySelector(".spider_4").style.position = "fixed";
    document.querySelector(".spider_4").style.left = "1550px";
}

function saySomethingNew() {
    let thingToSay;
    let sayWords = true;

    thingToSay = "My time is up. I will love a random post before I leave.";

    if(sayWords) {
        document.querySelector("#whatDoesTheSpiderSay").innerText = thingToSay;
    }
}

function randomColorComponent() {
    return Math.floor(Math.random()*255);
}

function sootheTheKraken() {
    clearInterval(krakenId);
    document.querySelector(".spider_4").style = ``;
    krakenIsBeingReleased = false;
    document.querySelector("#whatDoesTheSpiderSay").innerText = "k im relaxed now. but still plz no kill.";
}

function releaseTheKraken() {
    if(krakenIsBeingReleased) {return;}
    krakenIsBeingReleased = true;
    document.querySelector("#whatDoesTheSpiderSay").innerText = "HOLY SH%# U GOT AN ALERT";
    setTimeout(sootheTheKraken, 5000);

    krakenId = setInterval( function() {
        bigFlip = !bigFlip;
        if(bigFlip) {
            document.querySelector(".spider_4").style = `transform: scale(6); background: rgb(${randomColorComponent()}, ${randomColorComponent()}, ${randomColorComponent()}); transition: 0.3s all linear;`;
        }
        else {
            document.querySelector(".spider_4").style = `transform: scale(3) rotate(45deg); transition: 0.3s all linear;`;
        }

    }, 300);
}

(function main() {

    var spider = document.querySelector(".spider_4");

    if(spider) {
        loveSomethingRandom();
    }

    spider.insertAdjacentHTML("beforeend", `<svg style="left: 90px; z-index: ${Number.MAX_SAFE_INTEGER-1}"><polygon points="40,0 240,0 240,110 40,110" fill="#FFFFFF" /> <polygon points="0,0 40,0 40,40 0,0" fill="#FFFFFF" /></svg><div id='whatDoesTheSpiderSay' style='color: black; left: 150px; width: 160px; top:35px; pointer-events: none; z-index: ${Number.MAX_SAFE_INTEGER}'>plz dont kill me i hav family</div>`);
    spider.addEventListener("click", function() {
        document.querySelector("#whatDoesTheSpiderSay").innerText = "nooooooooo what will my family do without me";
    });



    let mutationObserver = new MutationObserver( function(mutations) {
        for(let mutation of mutations) {
            if(mutation.type === "childList") {
                for(let addedNode of mutation.addedNodes) {
                    if(addedNode.id === "StackAlerts") {releaseTheKraken();}
                }
            }
        }
    });

    mutationObserver.observe(document.body, {childList: true, attributes: true, subtree: true});

    setInterval(saySomethingNew, 8000);

    stayInYourLaneSpider();

})();