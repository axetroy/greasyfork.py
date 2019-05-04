// ==UserScript==
// @name         Draggable
// @             version 0.2
// @version 0.0.1.20160126215709
// @namespace https://greasyfork.org/users/28433
// @description Drag around any elements
// ==/UserScript==

var AllElements = document.getElementsByTagName("*");
var html = document.getElementsByTagName("html");
var selected = "";

var dmode = false;

var tempclick = "";

document.body.addEventListener("keyup", function(e){
    if(e.shiftKey && e.ctrlKey) {
      if(e.which == 88) {
        if(!dmode){
          dmode = true;
          console.log("Dragging mode");
        }
      }
    }
});


for(var i = 0;i < AllElements.length;i++){
    var element = AllElements[i];
    element.addEventListener('mousedown', press);
    element.addEventListener('mouseup', release);
    element.addEventListener('mousemove', move);
    element.addEventListener('mouseover', over);
    element.addEventListener('mouseout', out);
}

function press(e){
    if(selected == "" && dmode){
        tempclick = e.target.onclick;
        e.target.onclick = null;
        var elem = e.target;
        selected = elem;
    }
}

function move(e){
  if(e.target.nodeName != "body" && e.target.nodeName != "html"){
      if(selected != "" && dmode){
          selected.style.position = "absolute";
          selected.style.top = (e.clientY - (selected.offsetHeight / 2)) + "px";
          selected.style.left = (e.clientX - (selected.offsetWidth / 2))  + "px";
      }
  }
}

function release(e){
  if(dmode){
    selected.style.boxShadow = "initial";
    selected.style.cursor = "initial";
    selected = "";
    dmode = false;
    setTimeout(function(){ e.target.onclick = tempclick; }, 100);
  }
}

function over(e){
  if(dmode){
    e.target.style.boxShadow = "0px 0px 5px lime";
    e.target.style.cursor = "grab";
  }
}

function out(e){
  if(dmode){
    e.target.style.boxShadow = "initial";
    e.target.style.cursor = "initial";
  }
}
