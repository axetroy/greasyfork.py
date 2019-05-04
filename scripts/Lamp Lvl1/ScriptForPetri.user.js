// ==UserScript==
// @name         ScriptForPetri
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       Laaamp
// @match        http://petridish.pw/ru/
// @grant        none
// ==/UserScript==
//Enloy

(function() {

var amount = 4;

var duration = 70; //ms

var overwriting = function(evt) {

if (evt.keyCode === 83) { // KEY_S

for (var i = 0; i < amount; ++i) {

setTimeout(function() {

window.onkeydown({keyCode: 32}); // KEY_space

window.onkeyup({keyCode: 32});

}, i * duration);

}

}

};

window.addEventListener('keydown', overwriting);

})();

console.log('called');

var interval;

var switchy = false;

$(document).on('keydown',function(e){

console.log('keydown e.keyCode="'+e.keyCode+'"');

if(e.keyCode == 81){

console.log('keydown 81, switchy '+switchy);

if(switchy){

return;

}

switchy = true;

interval = setInterval(function() {

console.log('firing');

$("body").trigger($.Event("keydown", { keyCode: 87}));

$("body").trigger($.Event("keyup", { keyCode: 87}));

}, 10);//increase this number to make it fire them out slower

}

})

$(document).on('keyup',function(e){

console.log('keyup e.keyCode="'+e.keyCode+'"');

if(e.keyCode == 81){

console.log('stop firing');

switchy = false;

clearInterval(interval);

return;

}

})