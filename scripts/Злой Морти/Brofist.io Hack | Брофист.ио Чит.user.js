// ==UserScript==
// @name         Brofist.io Hack | Брофист.ио Чит
// @namespace    Brofist.io Hack
// @version      3.5.4
// @description  Hack Hide And Seek Brofist.io
// @author       Andranik Yeritsya(Злой Морти)
// @match        http://brofist.io/*
// @grant        none
// ==/UserScript==
document.onkeydown=function(e){
    var kc=e.keyCode;
    if(kc==109){
  mode.player.gpData.p.gravityScale=-1.5;
  mode.player.gpData.p.collisionResponse=0;
    }
 if(kc==107){
  mode.player.gpData.p.collisionResponse=0;
    }
};
document.onkeyup=function(e){
    var kc=e.keyCode;
    if(kc==109){
  mode.player.gpData.p.gravityScale=1;
  mode.player.gpData.p.collisionResponse=1;
    }
 if(kc==107){
  mode.player.gpData.p.collisionResponse=1;
    }
};