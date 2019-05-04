// ==UserScript==
// @name          ChangeColor
// @version       0.2
// @description   A fast way to change any element's background color
// @namespace https://greasyfork.org/users/28433
// ==/UserScript==

var mx = 100, my = 100; //Mouse position

var cmode = false;
var circle = document.createElement("div");
circle.id = "ChangeColorMousePointer";
circle.style.width = "40px";
circle.style.height = "40px";
circle.style.border = "1px solid black";
circle.style.borderRadius = "999px";
circle.style.MozBorderRadius = "999px";
circle.style.WebkitBorderRadius = "999px";
circle.style.position = "absolute";
circle.style.zIndex = "999999";
circle.style.background = "none";
circle.style.pointerEvents = "none";
circle.onclick = function(e){
  e.preventDefault();
};

document.body.appendChild(circle);

//Adding the function to all elements
var elements = document.getElementsByTagName("*");
for(var i = 0;i < elements.length;i++){
  elements[i].addEventListener('click', function(elem){
    if(cmode){
      elem.preventDefault();
      var color = prompt("Enter color: ", elem.target.style.backgroundColor);
      if(color != ""){
        elem.target.style.backgroundColor = color;
      }
      cmode = false;
    }
  });
}

document.body.onkeyup = function(e){
  if(e.which == 67 && e.shiftKey){
    if(!cmode) cmode = true;
    console.log("Color mode");
  }
};

document.body.onmousemove = function(e){
  mx = e.clientX;
  my = e.clientY;
}

setInterval(function(){
  if(cmode){
    circle.style.display = "block";
    circle.style.top = (my - 25) + "px";
    circle.style.left = (mx - 25) + "px";
  }
  else{
    circle.style.display = "none";
  }
}, 10);
