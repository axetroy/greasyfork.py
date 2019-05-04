// ==UserScript==
// @name        Odstraneni detekce blokovani reklam na doupe.cz
// @description:cs Prevence detekce blokace reklam na zive.cz (doupe).
// @namespace   monnef.tk
// @include     http://*.zive.cz/*
// @version     1
// @grant       none
// @author      monnef
// @description Prevence detekce blokace reklam na zive.cz (doupe).
// ==/UserScript==

$(window).off("AdBlockActive");
$(window).off("AdBlockDisabled");
