// ==UserScript==
// @name         Predator Stack 5 reload
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://diep.io/
// @grant        none
// ==/UserScript==

setTimeout(function(t,c,d)
           {c=onkeydown;d=onkeyup;onkeydown=function(e,k)
           {k=e.keyCode||e.which||event;if(k>47&&k<56&&e.shiftKey)
           {r=k-48;!function(g){g(0);g(200-r*23);g(1450-r*100);g(2050-150*r);g(2850-187*r);}(t);}else c(e)};onkeyup=function(e,k){k=e.keyCode||e.which||event;if(k<48||k>55||!e.shiftKey)d(e)};console.log("Pred Auto Bullet Stack Mod Innitiated!")},4000,function(t){setTimeout(function(i){i.keyDown(69);i.keyUp(69);},t,input)})
