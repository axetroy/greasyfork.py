// ==UserScript==
// @name          MLG Web Design
// @match *://*/*
// @description   Turn websites you visit in a hypnotic mess only true 360° quickscopers can use.
// @namespace ad48
// @version 0.69b
// @grant none
// @include       *://*/*
// @run-at        document-start
// ==/UserScript==
  setInterval(function(){
    var h3s = document.body.getElementsByTagName("*");
     var h2s = document.body.getElementsByTagName("h1");
       var h1s = document.body.getElementsByTagName("h1");
       var ps = document.body.getElementsByTagName("p");
    for(i = 0; i < h3s.length; i++) {
      if(!h3s[i].getAttribute("canRot") || h3s[i].getAttribute("canRot")=="null") {
       if(Math.random()>0.911) {
        h3s[i].setAttribute("canRot","true");
       }
        else {
           h3s[i].setAttribute("canRot","false");
        }
      }
      if(!h3s[i].getAttribute("canPos") || h3s[i].getAttribute("canPos")=="null") {
       if(Math.random()>0.81) {
        h3s[i].setAttribute("canPos","true");
       }
        else {
           h3s[i].setAttribute("canPos","false");
        }
      }
      h3s[i].style.color="hsl("+(Math.random()*360).toString()+",100%,50%)";
      if((h3s[i].style.position=="relative" || h3s[i].style.position=="" || h3s[i].style.position=="null") && h3s[i].outerText!=""&& h3s[i].childElementCount==0) {
       if(h3s[i].getAttribute("canRot")=="true") {
        if(!h3s[i].getAttribute("rotX") || h3s[i].getAttribute("rotX")=="null") {
          h3s[i].setAttribute("rotX",Math.random()*360);
        }
        else {
          while(parseInt(h3s[i].getAttribute("rotX"))>360) {
             h3s[i].setAttribute("rotX",(parseInt(h3s[i].getAttribute("rotX"))-360).toString());
          }
          h3s[i].setAttribute("rotX",(parseInt(h3s[i].getAttribute("rotX"))+4.2).toString());
        }
         h3s[i].style.transform="rotateZ("+h3s[i].getAttribute("rotX")+"deg)";
        }
        if(h3s[i].getAttribute("canPos")=="true") {
        h3s[i].style.left=(Math.random()*12.24).toString()+"px";
        h3s[i].style.top=(Math.random()*12.24).toString()+"px";
      }
      }
    }
  }, 69);