// ==UserScript==
// @name         Agar io script by HeadshoT ♥
// @namespace    HeadshoT
// @version      1
// @description  By HeadshoT
// @author       HeadshoT
// @match        http://agar.io/
// @grant        none
// ==/UserScript==
'use strict';

//presets
setShowMass(true); // Show your mass
setDarkTheme(true); // Enable Dark theme by default
$("#nick").val("⎝♥HeadshoT♥⎠"); // SET  yYOUR NAME - / MAIS TON NOM ICI

//v1
//Press a will fire upto 8 feeds
/*$(document).on('keydown',function(e){
if(e.keyCode == 69){
for(var i = 0; i<8; i++){
$("body").trigger($.Event("keydown", { keyCode: 87}));
$("body").trigger($.Event("keyup", { keyCode: 87}));
}
}
})
*/

//v2
//Press a will fire upto 8 feeds
/*$(document).on('keyup',function(e){
if(e.keyCode == 69){
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
//Press Q will fire upto 20 feeds
/*var interval;
var theSwitch = false;
$(document).on('keyup',function(e){
if(e.keyCode == 69){
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
    if(e.keyCode == 69){
        console.log('keydown 69, switchy '+switchy);
        if(switchy){
            return;
        }
        switchy = true;
        interval = setInterval(function() {
            console.log('firing');
            $("body").trigger($.Event("keydown", { keyCode: 87}));
            $("body").trigger($.Event("keyup", { keyCode: 87}));
        }, 3);//increase this number to make it fire them out slower
    }
})

$(document).on('keyup',function(e){
    console.log('keyup e.keyCode="'+e.keyCode+'"');
    if(e.keyCode == 69){
        console.log('stop firing');
        switchy = false;
        clearInterval(interval);
        return;
    }
})