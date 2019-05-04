// ==UserScript==
// @name         Did_you_mean...?
// @namespace    none
// @version      9069.69
// @description  Inspired by the google search in Ted 2. Asks you if you actually mean to write a defined "message" that redirects to a defined "link". Both message and link can be changed. This script will ONLY change the suggestion in GOOGLE search, not Bing or any other. This is made only for fun :)
// @author       Jijel
// @include      https://www.google.*/search*
// @include      http://www.google.*/search*
// @license      Please credit me if you redistribute it. :)
// @compatible   chrome
// @grant        none
// ==/UserScript==

//first of all if script doesn't work, try changing @match from "https://www.google.ro/search*" to "http://www.google.ro/search*" 
//script tested in chrome only. Firefox works only if there is no real suggestion, no idea why, maybe someone figures out why and can change it.

var message = "black cocks?"; //change to your desired "suggestion"
var link = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; //change to your desired redirect link (can you recognize this link without clicking it? :D)

//load elements with classes spell and spell_orig
var spell_list = document.getElementsByClassName("spell");
var spell_orig_list = document.getElementsByClassName("spell_orig");
var suggestion_exists=false; //this is used to check if there is already a suggestion

if (spell_list.length > 2) suggestion_exists=true;

//pretty clear
if (suggestion_exists) {
    //remove little suggestion (in my case there was the main suggestion and a little one under it, we remove the little one)
    for (var i=0; i<spell_orig_list.length; i++)
        if (spell_orig_list[i].id == '') {
            spell_orig_list[i].remove();
            i--;
        }
    
    //change the main suggestion
    for (var i=0; i<spell_list.length; i++) {
        if (spell_list[i].nodeName == 'SPAN' && spell_list[i].id == '')
            spell_list[i].innerHTML = "Did you mean ";
        else if (spell_list[i].nodeName == 'A' && spell_list[i].id == '') {
            spell_list[i].innerHTML = message;
            spell_list[i].href = link;
        }
    }
    
    //there is a <br> that makes it look ugly, it gets removed here
    var br_list = document.getElementsByTagName("br"); 
    var done=false;
    for (var i=0; i<br_list.length && !done; i++)
        if (br_list[i].parentNode.className == 'sp_cnt card-section') {
            br_list[i].remove();
            done=true;
        }
}
//pretty clear
else {
    //there is no suggestion so we get the elements with class .med
    //google puts the suggestion in a div that is of class .med
    //the first div with this class on any google search page is the one we need
    var med = document.getElementsByClassName("med");
    //look at the code below, it talks for itself
    var new_div = document.createElement("div");
    var new_p = document.createElement("p");
    //this class is needed to make it look like a "real" suggestion
    new_p.className = "sp_cnt card-section";
    
    var new_span = document.createElement("span");
    var new_a = document.createElement("a");
    var new_br = document.createElement("br");
    
    //same as for new_p, class needed to make it look "real"
    new_span.className = "spell";
    new_a.className = "spell";
    
    //here we actually set the suggestion
    new_span.innerHTML = "Did you mean ";
    new_a.innerHTML = message;
    new_a.href = link;
    
    //append the span, a and br tags to the p tag
    new_p.appendChild(new_span);
    new_p.appendChild(new_a);
    new_p.appendChild(new_br);
    
    //append the p tag to the new div
    new_div.appendChild(new_p);
    
    //this is a line that will be shown under the suggestion after a <br>
    var new_hr = document.createElement("hr");
    new_hr.className = "rgsep _l4";
    
    //append everything to the div .med
    med[0].appendChild(new_div);
    med[0].appendChild(new_hr);
}