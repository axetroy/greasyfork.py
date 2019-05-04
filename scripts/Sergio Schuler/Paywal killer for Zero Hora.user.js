// ==UserScript==
// @name       Paywal killer for Zero Hora
// @namespace  http://zh.clicrbs.com.br/*
// @version    0.1
// @description  Blocks the paywal from Zero Hora
// @include      http://zh.clicrbs.com.br/*
// @copyright  2014+, Sergio H. Schuler
// ==/UserScript==

function kill(elementName){
    var elementInQuestion = document.getElementById(elementName);
    elementInQuestion.parentNode.removeChild(elementInQuestion);
}

function changeInLineStyle() {
   	document.getElementsByTagName("BODY")[0].style.overflow="scroll"; 
}

window.onload = kill("paywall-wrapper");
window.onload = window.setTimeout(changeInLineStyle,1000);
