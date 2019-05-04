// ==UserScript==
// @name         Potwierdzenie wyjścia 
// @namespace    KROKIk
// @version      1
// @description  Niepozwala na niepożądane opuszczenie strony
// @author       KROKIk
// @match        http://vertix.io/*
// @grant        none
// ==/UserScript==

window.onbeforeunload = function(){
  return 'Czy na pewno chcesz opuścić stronę?';
};

