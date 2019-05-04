// ==UserScript==
// @name         Bubble Mouse + FPS Meter
// @info         ---
// @description  Lewoklik = "Spacja", Prawoklik = "E", Dodatkowo : Licznik FPS
// @namespace    Bubble Mouse + Extension !
// @version      Beta !
// @icon         https://s22.postimg.org/ylgmshr1t/Bez_nazwy.png
// @author       <<< LokowanyTM >>>
// @match        http://bubble.am/*
// @grant        none
// @noframes
// ==/UserScript==

(function() {
(function() {
  var UPDATE_DELAY = 700;

  var lastUpdate = 0;
  var frames = 0;

  var displayElement = document.createElement("div");
  displayElement.style.padding = "3px";
  displayElement.style.font = "16px Impact";
  displayElement.style.display = "initial";
  displayElement.style.position = "fixed";
  displayElement.style.top = "645px";
  displayElement.style.left = "650px";
  displayElement.textContent = "Wczytywanie...";
  document.body.appendChild(displayElement);

  function cssColorToRGB(color) {
    var values;

    if (color.startsWith("rgba")) {
      values = color.substring(1, color.length - 1).split(",");
    } else if (color.startsWith("rgb")) {
      values = color.substring(1, color.length - 1).split(",");
    } else if (color.startsWith("#") && color.length === 4) {
      values = [];
      values[0] = "" + parseInt("0x" + color.substr(1, 1));
      values[1] = "" + parseInt("0x" + color.substr(2, 1));
      values[2] = "" + parseInt("0x" + color.substr(3, 1));
    } else if (color.startsWith("#") && color.length === 7) {
      values = [];
      values[0] = "" + parseInt("0x" + color.substr(1, 2));
      values[1] = "" + parseInt("0x" + color.substr(3, 2));
      values[2] = "" + parseInt("0x" + color.substr(5, 2));
    } else {
      return {r : 100, g : 100, b : 100};
    }

    return {
      r : Number(values[0]),
      g : Number(values[1]),
      b : Number(values[2])
    };
  }

  function getInvertedRGB(values) {
    return "rgb(" + (100 - values.r) + "," + (100 - values.g) + ","
      + (100 - values.b) + ")";
  }

  function getOpaqueRGB(values) {
    return "rgba(" + values.r + "," + values.g + "," + values.b + ",0.7)";
  }

  function updateCounter() {
    var bgColor = getComputedStyle(document.body, null).getPropertyValue(
      "background-color");
    var bgColorValues = cssColorToRGB(bgColor);
    var textColor = getInvertedRGB(bgColorValues);
    var displayBg = getOpaqueRGB(bgColorValues);
    displayElement.style.color = textColor;
    displayElement.style.background = displayBg;

    var now = Date.now();
    var elapsed = now - lastUpdate;
    if (elapsed < UPDATE_DELAY) {
      ++frames;
    } else {
      var fps = Math.round(frames / (elapsed / 1000));
        displayElement.textContent = fps + " FPS";
      frames = 0;
      lastUpdate = now;
    }

    requestAnimationFrame(updateCounter);
  }

  lastUpdate = Date.now();
  requestAnimationFrame(updateCounter);
})();
function load(url, success) {
    var script = document.createElement("script");
    script.setAttribute("src", url);

    script.addEventListener("load", function () {
        var callback = document.createElement("script");
        callback.textContent = "(" + success + ")();";
        document.body.appendChild(callback);
    });

    document.body.appendChild(script);
}
function bind_mouse_buttons() {
var interval;
var switchy = false;
    $(document).on("contextmenu", function (event) {
        event.preventDefault();
    });
    $(document).on('mousedown',function(event){
        function key(type, char) {
            return $.Event(type, { keyCode: char.charCodeAt(0) });
        }

        switch (event.which) {
            case 1: // Lewy Przycisk Myszy
                $("body").trigger(key("keydown", " "));
                $("body").trigger(key("keyup", " "));
                break;
            case 3: // Prawy Przycisk Myszy
				  if(switchy){
				 return;
				  }
				  switchy = false;
				  interval = setInterval(function() {
				  $("body").trigger($.Event("keydown", { keyCode: 87}));
				  if(!document.URL.match(/gota\.io/g)){
				  $("body").trigger($.Event("keyup", { keyCode: 87}));
				  }
				  }, 3);
               break;
        }
    });
var sm=false;
$(document).on('mouseup',function(e){switchy = false;if(document.URL.match(/gota\.io/g)){$("body").trigger($.Event("keyup", { keyCode: 87}));}clearInterval(interval);return;})
document.getElementById("canvas").addEventListener("mousewheel", function(event) {
if(sm==false){
}});}
var c=0;
function countClick(){
if(c==0){load("https://code.jquery.com/ui/1.12.0/jquery-ui.js", bind_mouse_buttons);}
c++;
}
if(document.getElementsByClassName('btn btn-play-guest btn-success btn-needs-server')[0] && document.URL.match(/agar\.io/g)){
document.getElementsByClassName('btn btn-play-guest btn-success btn-needs-server')[0].addEventListener("click",countClick , false);
}
if(document.getElementsByClassName('btn btn-play btn-primary btn-needs-server')[0]  && document.URL.match(/agar\.io/g)){
document.getElementsByClassName('btn btn-play btn-primary btn-needs-server')[0].addEventListener("click",countClick , false);
}
if(document.getElementById('playBtn') && (document.URL.match(/bubble\.am/g))){
document.getElementById('playBtn').addEventListener("click",countClick , false);
}
if(document.getElementById('btn-play') && document.URL.match(/gota\.io/g)){
document.getElementById('btn-play').addEventListener("click",countClick , false);
}

if(localStorage.getItem("")==1){document.getElementById('').checked=true;}

document.body.style.cursor="url(''), auto;";
})();