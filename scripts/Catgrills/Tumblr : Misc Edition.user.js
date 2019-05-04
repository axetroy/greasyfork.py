// ==UserScript==
// @name            Tumblr : Misc Edition
// @namespace       tumblr
// @version         1.0.1
// @description     Add a button to toggle the post buttons and remove the "#" character in the tags
// @include         https://www.tumblr.com/*
// @icon            https://image.flaticon.com/icons/png/512/145/145811.png
// @grant           none
// ==/UserScript==

var dash = document.getElementById('new_post_buttons');
if(dash) {
    var header = document.getElementById('tabs_outer_container');
    var trigger = document.createElement('button');
    trigger.id = 'trigger-btn';
    var text_trigger = document.createTextNode('MENU');
    trigger.appendChild(text_trigger);
    header.appendChild(trigger);
    var value = false;
    trigger.onclick = function() {
        if(value == false) {
            value = true;
            dash.style.bottom = '-20px';
        }
        else if(value == true) {
            value = false;
            dash.style.bottom = '-120px';
        }
    };
}

var tag = document.getElementsByClassName('post_tag');
for(var i=0; i < tag.length; i++) {
   tag[i].innerHTML = tag[i].innerHTML.replace('#','');
}