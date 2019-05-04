// ==UserScript==
// @name         Diep Crosshair Pointer
// @namespace    https://discord.gg/BwqMNRn
// @version      0.1
// @description  Turns the Diep cursor into a crosshair.
// @author       Lucario ? ∝ x²#9656
// @match        http://diep.io/*
// ==/UserScript==


document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    let crosshair = setInterval(function(){
        if (document.getElementById("canvas")){
            document.getElementById("canvas").style.cursor = "crosshair";
        }
    }, 1000); //The interval is necessary since Diep.io sometimes changes it back on the start screen and (maybe) death screen.
  }
};