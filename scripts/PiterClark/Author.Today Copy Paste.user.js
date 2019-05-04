// ==UserScript==
// @name         Author.Today Copy Paste
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://author.today/reader/*
// @grant        none
// ==/UserScript==

getTextPage = () => {
    let text = '';
    let title = null;
    b = document.getElementsByClassName('text-container')[0].children;
    for(let a of b) {
        if(a.tagName.toLowerCase() === 'p' && a.innerHTML) {
            text+=`<p>${a.innerHTML}</p>`;
        }
        if(a.tagName.toLowerCase() === 'h2') { title = a.innerHTML; }
    }
    return openWindow(text? text : getTextInDiv(b), title);
};

openWindow = (text, title) => {
    let html = `<h2>${title? title: ''}</h2>${text}`;
    window.open('','','width=800, height=500')
        .document.write(html);
};

getTextInDiv = (elements) => {
    let text = '';
    for(let el of elements) {
        if(el.tagName.toLowerCase() === 'div' && !el.getAttribute('class')) {
            text += `<p>${el.children[0].innerHTML.replace(/(<span).*?(span>)/g, '')}</p>`;
        }
    }
    return text;
};

function createElement() {
    let d = document.getElementsByClassName('navbar-left')[0],
    a = document.createElement('a');
    a.innerHTML = 'Копировать текст';
    a.setAttribute('href', '#');
    a.setAttribute('onclick', 'getTextPage();');
    a.setAttribute('class', 'btn btn-brd');
    d.appendChild(a);
}

(function(){
    createElement();
})();