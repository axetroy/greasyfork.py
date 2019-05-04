// ==UserScript==
// @name         Namasha
// @namespace    https://www.namasha.com
// @version      2.15
// @description  Press F1 to download a video , higher quality is in priority
// @author       Am.A
// @include /https://www.namasha.com
// ==/UserScript==
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "HEAD", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    //var f = fetch(theUrl, {method: "GET",credentials: 'omit'});
    //console.log(f.status);
    return xmlHttp.status/100 == 2;
}


(function () {
    'use strict';
    document.addEventListener('keydown', function(event){
        if(event.key == "F1") {
            var server = document.getElementsByClassName("jw-preview jw-reset")[0].getAttribute("style");
            var string = server.match(/https:.*\.jpg/)[0].match(/preview\/.*-/)[0];
            server = server.match(/https\:\/\/s\d*/)[0];
            server = server.replace("https://s","");//Server number is now gotten
            string = string.replace("preview/","");
            string = string.match(/\d*-/)[0];
            string = string.replace("-","");//Address is now gotten
            if(httpGet("https://s"+server+".namasha.com/dash/"+string+"/1080p_dashinit")){
                string = "https://s"+server+".namasha.com/dash/"+string+"/1080p_dashinit";
            }else if(httpGet("https://s"+server+".namasha.com/dash/"+string+"/720p_dashinit")){
                string = "https://s"+server+".namasha.com/dash/"+string+"/720p_dashinit";
            }else if(httpGet("https://s"+server+".namasha.com/dash/"+string+"/360p_dashinit")){
                string = "https://s"+server+".namasha.com/dash/"+string+"/360p_dashinit";
            }else if(httpGet("https://s"+server+".namasha.com/dash/"+string+"/240p_dashinit")){
                string = "https://s"+server+".namasha.com/dash/"+string+"/240p_dashinit";
            }else if(httpGet("https://s"+server+".namasha.com/dash/"+string+"/144p_dashinit")){
                string = "https://s"+server+".namasha.com/dash/"+string+"/144p_dashinit";
            }else if(httpGet("https://s"+server+".namasha.com/videos/"+string+".mp4")){
                string = "https://s"+server+".namasha.com/videos/"+string+".mp4";
            } else {
                alert(httpGet("https://s"+server+".namasha.com/videos/"+string+".mp4"));
                return;
            }
            window.location.assign(string);
            alert('Done');
        }
    } );

}) ();