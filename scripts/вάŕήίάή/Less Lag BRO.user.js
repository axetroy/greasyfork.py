// ==UserScript==
// @name         Less Lag BRO
// @namespace    QWERTYUIOP
// @version      0.2
// @description  When you press 'Caps Lock', the gui will be removed.Then when you let go it will be removed until you press caps lock again.
// @author       /u/вάŕήίάή
// @match        *://*.diep.io/*
// ==/UserScript==

// Script made by /u/вάŕήίάή

document.addEventListener('keydown',function(event){
    if(event.keyCode==20){
        input.set_convar("ren_ui", true);
    }
});

document.addEventListener('keyup',function(event){
    if(event.keyCode==20){
        input.set_convar("ren_ui", false);
    }
});
