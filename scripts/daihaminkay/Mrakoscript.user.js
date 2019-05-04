// ==UserScript==
// @name         Mrakoscript
// @namespace    https://mrakopedia.org
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://mrakopedia.org/wiki/*
// @grant        none
// ==/UserScript==

/*
Automated, visual and slow version of the below: would reload the random page until finds the high-rated article
*/

let isScrolling = false;

function scrollController(buttonElem){
    if(isScrolling){
        buttonElem.innerHTML = "<b>Включить<br>прокрутку</b>";
        isScrolling = false;
    } else {
        buttonElem.innerHTML = "<b>Выключить<br>прокрутку</b>";
        isScrolling = true;
        autoScroll();
    }
}

function autoScroll() {
    window.scrollBy(0,1);
    if(isScrolling){
        scrolldelay = setTimeout(autoScroll,40);
    }
}

function seeInTheFuture(godnota, attempts = 0) {
    let req = new XMLHttpRequest();
    req.open('GET', 'https://mrakopedia.org/wiki/%D0%A1%D0%BB%D1%83%D0%B6%D0%B5%D0%B1%D0%BD%D0%B0%D1%8F:%D0%A1%D0%BB%D1%83%D1%87%D0%B0%D0%B9%D0%BD%D0%B0%D1%8F_%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D0%B0', true);
    req.onreadystatechange = () => {
        if (req.readyState === 4){
            if (req.status === 200) {
                let body = document.createElement("html");
                body.innerHTML = req.response;
                let newRank = Number(body.querySelector("#w4g_rb_area-1").firstElementChild.textContent.split("/")[0]);
                if(newRank < 70){
                    console.log(attempts);
                    if(attempts){
                        godnota.innerHTML = `<b>Найти годноту (Просмотрено: ${attempts})</b>`;
                    }
                    seeInTheFuture(godnota, ++attempts);
                } else {
                    window.location = req.responseURL;
                }
            } else if(req.status > 400){
                alert("Ошибка на сервере, попробуйте еще раз");
            }
        }
    };
    req.send();
}

function decentify() {
    //Moving ranking to the top
    let rankBar = document.getElementById("rating_box-1");
    let rankText = document.getElementById("w4g_rb_area-1");
    let heading = document.getElementById("contentSub");
    rankBar.style = "float: right";
    rankText.style = "text-align: right";
    heading.appendChild(rankText);
    heading.appendChild(rankBar);
    
    let menu = document.querySelectorAll(".pBody")[2].firstElementChild;
    let mainList = document.querySelectorAll(".pBody")[1];
    let body = mainList.firstElementChild;
    
    mainList.style = "width: 92vw";
    
    let godnotaItem = document.createElement("li");
    let godnota = document.createElement("a");
    godnota.onclick = () => seeInTheFuture(godnota);
    godnota.innerHTML = "<b>Найти годноту</b>";
    godnotaItem.appendChild(godnota);
    
    let scrollItem = document.createElement("li");
    let scroller = document.createElement("button");
    scroller.onclick = () => scrollController(scroller);
    scroller.style = "position: fixed; background-color: white; float: right; width: 150px; height: 50px; font-size: 14pt; text-align: center";
    scroller.innerHTML = "<b>Включить<br>прокрутку</b>";
    scrollItem.appendChild(scroller);
    
    window.onkeydown = function(e){
        if(e.keyCode == 32){
            e.preventDefault();
            scrollController(scroller);
        }
    };
    
    menu.appendChild(godnotaItem);
    body.appendChild(scrollItem);
}

decentify();