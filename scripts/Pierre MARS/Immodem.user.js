// ==UserScript==
// @name         Immodem
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  try to take over the world!
// @author       coz3n
// @match        https://immodem.poste-immo.intra.laposte.fr/*
// @grant        none
// ==/UserScript==

let obsconf = { childList: true },
    url = [],
    css = document.createTextNode("@font-face{font-family:Roboto;font-style:normal;font-weight:400;src:local('Roboto Regular'),local('Roboto-Regular'),url(https://themes.googleusercontent.com/static/fonts/roboto/v11/2UX7WLTfW3W8TclTUvlFyQ.woff) format('woff')}html{box-sizing:border-box;overflow:hidden}*{font-family:roboto}*,:after,:before{box-sizing:inherit}body{padding:0;height:100vh}h4{font-size:16px}#page-content-wrapper,#wrapper,body{height:100vh}#wrapper{overflow-y:auto;overflow-x:hidden}#sidebar-wrapper{overflow:hidden}.container-fluid{height:100%}div vertilize-container{justify-content:space-between}#wrap{display:-webkit-flex;display:-moz-flex;display:-ms-flex;display:-o-flex;display:flex;flex-flow:row nowrap;justify-content:space-around}.entete{width:100%;height:48px;text-align:center;font-size:1.5em;color:#fff;text-shadow:0 1px 0 #aaa;margin:0;padding:0}.bucket{padding:24px 8px 8px;margin:0 10px;display:flex;background:#ddd;height:80vh;overflow-y:scroll;flex-flow:row wrap;flex:1 1 100%;justify-content:space-between;align-items:flex-start;align-content:flex-start;max-width:20vw}.bucket>div{width:100%!important}.taskCard{border-radius:2px!important;border:none;box-shadow:0 1px 2px 0 rgba(0,0,0,.5);transition:box-shadow .25s linear;height:auto!important}.taskCard:hover{box-shadow:0 2px 4px 1px rgba(0,0,0,.5)}.taskInfos{font-size:12px}p{margin-bottom:6px}[id=\"Validation CP\"]{order:0}#Réalisation{order:1}[id=\"Validation technique\"]{order:2}[id=\"Réception de la demande\"]{order:3}::-webkit-scrollbar{width:8px}::-webkit-scrollbar-thumb{background:#666;border-radius:16px}::-webkit-scrollbar-track{background:#ddd;width:12px}"),
    initLaunch,
    buckets = {
            "Validation CP" : [],
            "Réalisation" : [],
            "Validation technique" : [],
            "Réception de la demande" : []
        },
    sessionVal = localStorage.getItem("user_session");

console.log(sessionVal);

let observer = new MutationObserver(function(mutations) {
    // console.log("observer", mutations);
    // For the sake of...observation...let's output the mutation to console to see how this all works
    mutations.forEach(function(mutation) {
        let cards = document.getElementsByClassName('taskCard');
        if (cards) {
            for (let card = 0; card < cards.length; card++) {
                let step = cards[card].getElementsByClassName("label-info")[0];
                if (step) {
                    let bucket;
                    if (step.innerHTML == "Validation CdP") {
                        bucket = document.getElementById("Validation CP");
                    } else {
                        bucket = document.getElementById(step.innerHTML);
                    }

                    if (bucket) {
                        bucket.appendChild(cards[card].parentElement);
                    } else {
                        //console.log("Il n'y a pas de de bucket pour ranger : ", cards[card]);
                        return
                    }
                }
            }
        }
    });
});


(function() {
    let origOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
        // console.log('request started!');
        // console.log(this);
        this.addEventListener('load', function() {
            if (url == "/web/app.php/cartTasks/loadList/Family") {
                console.log("chargement de la liste", this);
            } else if (url == "/web/app.php/cartTasks/loadTasks/1963") {
                console.log("réception des cartes", this);
                initLaunch = setTimeout(init(this.responseText), 200);
            };
        });
        origOpen.apply(this, arguments);
    };
})();

function init() {
    console.log(JSON.parse(arguments[0]));

    let wrap = document.querySelectorAll("[vertilize-container]")[0],
        nav = document.querySelectorAll("[role=\"navigation\"]")[0],
        style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(css);
    document.head.appendChild(style);

    if (nav) {
        nav.parentElement.removeChild(nav);
    }

    if (!wrap) {
        clearTimeout(initLaunch);
        initLaunch = setTimeout(init(), 1000);
    } else {
        wrap.id = "wrap";
        let cards = wrap.children;
        for (let i = 0; i < cards.length; i++) {
            console.log("Une nouvelle carte : ", cards[i]);
            let label;
            if (cards[i].getElementsByClassName("itemStep")[0].firstElementChild.innerHTML == "Validation CdP") {
                label = "Validation CP";
            } else {
                label = cards[i].getElementsByClassName("itemStep")[0].firstElementChild.innerHTML;
            }
            if (buckets[label]) {
                buckets[label].push(cards[i]);
            } else {
                buckets[label] = [];
                buckets[label].push(cards[i]);
            }
        }
        makeEnv(buckets, wrap);
        observer.observe(wrap, obsconf);
    }
}


function makeEnv(buckets, wrap) {
    //    console.log(el);
    let step = Object.keys(buckets);
    for (let i = 0; i < step.length; i++) {
        let bucket = document.createElement("div"),
            entete = document.createElement('h2');
        bucket.classList.add('bucket');
        bucket.id = step[i];
        entete.innerHTML = step[i];
        entete.classList = "entete";
        bucket.appendChild(entete);
        for (let j = 0; j < buckets[step[i]].length; j++) {
            bucket.appendChild(buckets[step[i]][j]);
        }
        //console.log(bucket);
        wrap.appendChild(bucket);
    }
    modCards();
}

function modCards() {
    let taskInfos = document.getElementsByClassName('taskInfos');
    for (let i = 0; i < taskInfos.length; i++) {
        let att = taskInfos[i].innerHTML.split(" : ");
        taskInfos[i].innerHTML = "<b>" + att[0] + "</b> : " + att[1];
    }
}