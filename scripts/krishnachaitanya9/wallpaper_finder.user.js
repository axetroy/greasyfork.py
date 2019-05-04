// ==UserScript==
// @name         wallpaper_finder
// @namespace    http://your.homepage/
// @version      1.0
// @description Website Navigator With Arrow Key Press
// @match      http://wallpaperswide.com/*
// ==/UserScript==
function next_page_number(){
k = window.location.href;
var urlarray = k.split('/');
var lastitem = urlarray.pop();
number = parseInt(lastitem);
number += 1;
lastitem = number.toString();
return lastitem;}
function do_next_activity(){
q = window.location.href;
if ( next_page_number() != "NaN"){
if ( next_page_number() <= 10){q = q.substring(0, q.length - 1);}
    else if ( next_page_number() > 10 &&  next_page_number() <= 100 ){
        q = q.substring(0, q.length - 2);
    } else{
        q = q.substring(0, q.length - 3);
       } final_url = q.concat(next_page_number()); } else{
           q = q.substring(0, q.length - 5);
           final_url = q.concat("/page/2");
       }

window.open(final_url,"_self");
}
function previous_page_number() {
k = window.location.href;
var urlarray = k.split('/');
var lastitem = urlarray.pop();
number = parseInt(lastitem);
number -= 1;
lastitem = number.toString();
return lastitem; }

function present_page_number() {
k = window.location.href;
var urlarray = k.split('/');
var lastitem = urlarray.pop();
number = parseInt(lastitem);
lastitem = number.toString();
return lastitem; }


function do_previous_activity(){
    if ( previous_page_number() != "NaN"){
q = window.location.href;   
if ( parseInt(present_page_number()) <= 9){q = q.substring(0, q.length - 1);}
   else if ( present_page_number() >= 10 &&  present_page_number() <= 99 ){
        q = q.substring(0, q.length - 2);
    } else {
        q = q.substring(0, q.length - 3);
    } 
final_url = q.concat(previous_page_number());
window.open(final_url,"_self");
    }
}

window.addEventListener("keydown", checkKeyPressed, false);
 
function checkKeyPressed(e) {
    if (e.keyCode == "39") {       
       do_next_activity();
    }
    if (e.keyCode == "37") {        
       do_previous_activity();
    }
}
