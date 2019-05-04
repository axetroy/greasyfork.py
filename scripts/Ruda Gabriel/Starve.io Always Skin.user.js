// ==UserScript==
// @name         Starve.io Always Skin
// @namespace    https://pastebin.com/cyWp1cpw
// @version      1.0.9
// @homepage     http://bit.ly/YxuRd
// @supportURL   https://greasyfork.org/pt-BR/scripts/33345-starve-io-always-skin/feedback
// @description  Always Show Skin, Without Share
// @author       Ruda Gabriel
// @run-at       document-end
// @match        *://starve.io/*
// @icon         http://starve.io/img/favicon.png
// @require      http://code.jquery.com/jquery-1.12.4.min.js
// ==/UserScript==

//If you are Redistributing, please give credits to the author: Ruda Gabriel

setInterval(function(){
    if (document.getElementById("bbback")!==null) {
        document.getElementById("bbback").setAttribute("id","back");
        document.getElementById("back").style="box-shadow: 0px; 5px; #593109; color: #FFFFFF; font-family: 'Baloo Paaji'; margin-bottom: 17px; margin-top: 5px; margin-right: 15px; margin-left: 15px; padding-right: 35px; padding-left: 35px; font-size: 20px; text-align: center; border-radius: 8px; background-color: #854b10; cursor: pointer; display: inline-block;";
    }
    if (document.getElementById("tttwitter")!==null) {
        document.getElementById("tttwitter").setAttribute("id","twitter");
        document.getElementById("twitter").style="border-radius: 7px; background-color: rgb(27, 149, 224); cursor: pointer;";
    }
    if (document.getElementById("fffacebook")!==null) {
        document.getElementById("fffacebook").setAttribute("id","facebook");
        document.getElementById("facebook").style="border-radius: 7px; background-color: rgb(66, 103, 178); cursor: pointer;";
    }
    if (document.getElementById('back')!==null){
        document.getElementById('back').onclick = function(){
            document.getElementById("choose_skin").style.display="inline-block";
        };
    }
    function disp(){
        if(document.getElementById('loading').style.display=="none"===false){
            window.setTimeout(disp, 10);
        }else{
            if($('#share_skins').length>0){
                document.getElementById('share_skins').remove();
                document.getElementById("choose_skin").style.display="inline-block";
            }
        }
    }
    disp();
},100);
return (setInterval);