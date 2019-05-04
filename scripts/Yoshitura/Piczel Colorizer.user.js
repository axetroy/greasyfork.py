// ==UserScript==
// @name         Piczel Colorizer
// @namespace    https://greasyfork.org/en/scripts/17583-piczel-colorizer
// @version      0.7
// @description  Floof
// @author       Yoshitura
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @include https://piczel.tv/chat/*
// @include https://piczel.tv/watch/*


// ==/UserScript==

// default settings
var piczel_dbackground = "#282828";
var piczel_dhover = "#444444";
var piczel_dtext = "#EEEEEE";
//

// user vars
var piczel_background = piczel_dbackground;
var piczel_hover = piczel_dhover;
var piczel_text = piczel_dtext;
//


//load settings
function updateSettings(mode){
    console.log('Refloofing settings...');
    if(GM_getValue('piczel_background') && !mode){
        piczel_background = GM_getValue('piczel_background');
        piczel_hover = GM_getValue('piczel_hover');
        piczel_text = GM_getValue('piczel_text');
    } else {
        GM_setValue('piczel_background',piczel_background);
        GM_setValue('piczel_text',piczel_text);
        GM_setValue('piczel_hover',piczel_hover);
    }
}
//

unsafeWindow.piczel_changeColor = function(ctype){
    var labelText = "";
    var labelValue = "";
    var promptData = "";
    switch(ctype){
        case 0:
            labelText = "Please enter new background color (type default for default color)";
            labelValue = piczel_background;
            break;
        case 1:
            labelText = "Please enter new text color (type default for default color)";
            labelValue = piczel_text;
            break;
        case 2:
            labelText = "Please enter new hover color (type default for default color)";
            labelValue = piczel_hover;
            break;
    }

    if(promptData = prompt(labelText,labelValue)){
        if(checkColor(promptData)){
            switch(ctype){
                case 0:
                    if(promptData.toLowerCase()=="default") {
                        piczel_background = piczel_dbackground;
                    } else {
                        piczel_background = promptData;
                    }
                    break;
                case 1:
                    if(promptData.toLowerCase()=="default") {
                        piczel_text = piczel_dtext;
                    } else {
                        piczel_text = promptData;
                    }

                    break;
                case 2:
                    if(promptData.toLowerCase()=="default") {
                        piczel_hover = piczel_dhover;
                    } else {
                        piczel_hover = promptData;
                    }
                    break;
            }
        }
    }
    piczel_updateColors(1);
}

function checkColor(color){
    if((color.length==7 && color.indexOf('#')==0)|| color.toLowerCase()=="default"){
        return true;
    } else {
        alert('Invalid value! Use only HEX!');
        return false;
    }
}

var piczel_buttons = document.getElementsByClassName('overlay-buttons');

var piczel_button1 = document.createElement('a');
piczel_button1.innerHTML = "<b>T</b>";
piczel_button1.setAttribute('title','Change text color');
piczel_button1.setAttribute('class','popout-chat');
piczel_button1.setAttribute('href','javascript:void(0)');
piczel_button1.setAttribute('onclick','piczel_changeColor(1)');
piczel_button1.setAttribute('style','margin-left:5px');

var piczel_button2 = document.createElement('a');
piczel_button2.innerHTML = "<b>B</b>";
piczel_button2.setAttribute('title','Change background color');
piczel_button2.setAttribute('class','popout-chat');
piczel_button2.setAttribute('href','javascript:void(0)');
piczel_button2.setAttribute('onclick','piczel_changeColor(0)');
piczel_button2.setAttribute('style','margin-left:5px');

var piczel_button3 = document.createElement('a');
piczel_button3.innerHTML = "<b>H</b>";
piczel_button3.setAttribute('title','Change hover color');
piczel_button3.setAttribute('class','popout-chat');
piczel_button3.setAttribute('href','javascript:void(0)');
piczel_button3.setAttribute('onclick','piczel_changeColor(2)');
piczel_button3.setAttribute('style','margin-left:5px');

piczel_buttons[0].appendChild(piczel_button1);
piczel_buttons[0].appendChild(piczel_button2);
piczel_buttons[0].appendChild(piczel_button3);


function piczel_updateColors(mode){
    updateSettings(mode);
    GM_addStyle(".message-pane-wrapper,.message-form-wrapper,.message-form-wrapper .field{background-color: "+piczel_background+";} .message-pane li:hover{background-color: "+piczel_hover+";} .message-pane-wrapper,.chat-container #candy .message-form input[type='text'],.stream-beta .sidebar .chat #candy .message-form input[type='text'],#candy a,.color-1,.color-2,.color-3,.color-4,.color-5,.color-6,.color-7,.color-8{color:"+piczel_text+";} ");
}
piczel_updateColors(0);