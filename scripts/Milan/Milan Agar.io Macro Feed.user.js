// ==UserScript==
// @name         Milan Agar.io Macro Feed
// @namespace    Macro feed!
// @version      699999.0
// @description  Xeno loves to eat dick in his spare time
// @author       Milan
// @match        http://agar.io/
// @grant        none
// ==/UserScript==

//v1
//Satan xposed for being cunt
/*$(document).on('keydown',function(e){
if(e.keyCode == 87){
for(var i = 0; i<8; i++){
$("body").trigger($.Event("keydown", { keyCode: 87}));
$("body").trigger($.Event("keyup", { keyCode: 87}));
}
}
})
*/

//v2
//Paka x Story sex tape will be released tomorrow
/*$(document).on('keyup',function(e){
if(e.keyCode == 87){
var count = 0;
var interval = setInterval(function() {
if(count > 7){
clearInterval(interval);
return;
}
count++
console.log('firing')
$("body").trigger($.Event("keydown", { keyCode: 87}));
$("body").trigger($.Event("keyup", { keyCode: 87}));
}, 50);
}
})*/

//v3
//Astro x Paka x Story coming Winter 2016
/*var interval;
var theSwitch = false;
$(document).on('keyup',function(e){
if(e.keyCode == 87){
var count = 0;
if(theSwitch){
theSwitch = false;
clearInterval(interval);
return;
}
theSwitch = true;
interval = setInterval(function() {
if(count > 20){ //Change this number if you want more
theSwitch = false;
clearInterval(interval);
return;
}
count++
console.log('firing')
$("body").trigger($.Event("keydown", { keyCode: 87}));
$("body").trigger($.Event("keyup", { keyCode: 87}));
}, 10);//increase this number to make it fire them out slower
}
})*/

//v4
//Hold a down and it will keep firing untill you take your finger off!
console.log('called');
var interval;
var switchy = false;
$(document).on('keydown',function(e){
console.log('keydown e.keyCode="'+e.keyCode+'"');
if(e.keyCode == 87){
console.log('keydown 87, switchy '+switchy);
if(switchy){
return;
}
switchy = true;
interval = setInterval(function() {
console.log('firing');
$("body").trigger($.Event("keydown", { keyCode: 87}));
$("body").trigger($.Event("keyup", { keyCode: 87}));
}, 5);//increase this number to make it fire them out slower
}
})

$(document).on('keyup',function(e){
console.log('keyup e.keyCode="'+e.keyCode+'"');
if(e.keyCode == 87){
console.log('stop firing');
switchy = false;
clearInterval(interval);
return;
}