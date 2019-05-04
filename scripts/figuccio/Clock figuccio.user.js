// ==UserScript==
// @name        Clock figuccio
// @description clock ore minuti secondi
// @version     1.1.1
// @include     *
// @author      figuccio
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_registerMenuCommand
// @icon        data:image/gif;base64,R0lGODlhEAAQAKECABEREe7u7v///////yH5BAEKAAIALAAAAAAQABAAAAIplI+py30Bo5wB2IvzrXDvaoFcCIBeeXaeSY4tibqxSWt2RuWRw/e+UQAAOw==
// @namespace https://greasyfork.org/users/237458
// ==/UserScript==
function updateClock() {
  let date = new Date();
// parametri per la lingua:
 //   'ITA'   'ING'   'FRA'     'SPA'     'POR'
 // ITALIANO INGLESE FRANCESE  SPAGNOLO PORTOGHESE
  let time = date.toLocaleString('it',{
      hour:'numeric',minute:'numeric',second:'numeric',
      day:'numeric',year:'numeric',month:'long',weekday:'long',
  });
  node.innerHTML = time;
}

let node = document.createElement('div');
function setStyles(styles) {
  styles.forEach(style => node.style.setProperty(style.name, style.value));
}
setStyles([
{ name: 'position', value: 'fixed'},{ name: 'bottom', value: '' },
{ name: 'top', value: '0' },{ name: 'background-color', value: 'red' },
{ name: 'color', value: 'white' },{ name: 'z-index', value: '99999' },
{ name:'padding-top', value:'5px'},{ name:'padding-right',value:'5px'},{ name:'padding-bottom',value:'5px'},{ name:'padding-left',value:'5px'},
{ name: 'border-radius', value: '10px' },{ name: 'border', value: '2px solid blue' },
{ name: 'margin',value: '0px  12cm' },{ name: 'font',value:'Arial'},{ name: 'font-size', value: '16px'},
{ name: 'cursor', value: 'move' },
]);

document.body.appendChild(node);
setInterval(() => updateClock(), 1000);
              //effetti speciali
node.addEventListener("mouseover", function( event ) {
    // evidenzia il bersaglio del mouseover
    event.target.style.color = "orange";
    event.target.style.background = "green";
    event.target.style.border= "solid black";
// ripristinare il colore dopo un breve ritardo
    setTimeout(function() {
    event.target.style.color = "white";
    event.target.style.background = "red";
    event.target.style.border = "solid blue";
    }, 7000);
  }, false);


  //nasconde orario al click del mouse per 9secondi
node.addEventListener("click", function( event ) {
event.target.style.display= "none";

setTimeout(function() {
      event.target.style.display= "block";
    }, 9000);

  }, false);




