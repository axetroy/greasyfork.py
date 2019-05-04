// ==UserScript==
// @name         Foes.io | FΓΣΠZΨ FΣΠΓΛΓ FΔZΣ FΨΓΣ
// @namespace    https://greasyfork.org/users/139500
// @version      ╳F╳F╳F╳F╳
// @description  【 Č͟͢͢͟E͟͢͢͟S͟͢͢͟K͟͢Y 】 ➜ 〖 ODSTRANĚNÍ ZBYTEČNOSTÍ 〗〖 DALŠÍ VYLEPŠENÍ 〗 【 E͟͢͢͟N͟͢͢͟G͟͢͢͟L͟͢͢͟I͟͢͢͟S͟͢H 】 ➜〖 REMOVING NEEDLESSNESS 〗〖 OTHER IMPROVEMENTS 〗
// @author       ?FΓΣΠZΨ�FΣΠΓΛΓ?FΔZΣ�FΨΓΣ?
// @match        http://foes.io/*
// @match        https://foes.io/*
// @icon         http://i.imgur.com/EVgFAYg.png
// ==/UserScript==

let foesVer = $('#linksContainer a').html(),
    removeSelectors = ['#adCard'],
    css = '#createContainer { display: none!important; }',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}

for ( let i = 0; i < removeSelectors.length; i++ ) {
    $(removeSelectors[i]).remove();
}

head.appendChild(style);
$('#linksContainer').html('<a href="./docs/versions.txt" target="_blank">' + foesVer + '</a>');

document.getElementById('gameName').innerHTML = 'FENRIR';

var myElement = document.querySelector("#nameInput");
myElement.style.backgroundColor = "#FF0000";
myElement.style.color = "#fff";