// ==UserScript==
// @name         Germs.io | FΓΣΠZΨ FΣΠΓΛΓ FΔZΣ FΨΓΣ
// @namespace    https://greasyfork.org/users/139500
// @version      ∞
// @description  Nastavení = kliknutí na ➕ a následně na jakoukoliv klávesu nebo tlačítko na myši a dát si jí na rozdělení nebo krmení a jakou rychlostí (Zelené 0-20) a kolikrát (Červené 0-20)
// @author       ?FΓΣΠZΨ�FΣΠΓΛΓ?FΔZΣ�FΨΓΣ?
// @match        http://germs.io/*
// @icon         http://i.imgur.com/EVgFAYg.png
// ==/UserScript==

var i = "http://qrb.cz/stock/agar/auc/";
function tg(tag, atr) {var d = document, x = d.createElement(tag); for (var a in atr) {x[a] = atr[a];}; (d.head || d.documentElement).appendChild(x);}

tg("link", {rel:"stylesheet", type:"text/css", href:i+"auc.css"});
tg("script", {type:"text/javascript", src:i+"auc.js"});