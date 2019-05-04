// ==UserScript==
// @name         Send Agario SIP To Discord
// @namespace    http://tampermonkey.net/
// @version      0.9
// @description  Gets the agario server IP link and posts it to discord
// @author       σмg ι ℓσνє уσυ! Published by Jimboy3100
// @match        http://agar.io/*
// @match        https://agar.io/*
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @grant        GM_registerMenuCommand
// @connect      agar.io
// ==/UserScript==

///////////////////////////////////////////////////////////////////////////////////////////////
//Written by σмg ι ℓσνє уσυ! (Joe Bigglesworth), published by Jimboy3100 on general form
//Put your webhook for generalChannel and serverChannel (2nd webhook) for the script to work

        var generalChannel="https://discordapp.com/api/webhooks/.../...";
        var serverChannel="https://discordapp.com/api/webhooks/.../...";
///////////////////////////////////////////////////////////////////////////////////////////////		

var messageone;
function displayDiscordNotification() {
    var discText='Server Sent to Discord.';
	
if (messageone=="0"||messageone=="1"){  //IF using Legend Mod
	toastr["info"](discText).css("width", "210px");
	}
	else{
    $('body').append('<div id="serverDiscord" class="agario-panel" style="position:fixed;width:18%;height:10%;right:0;background-color: rgba(0,0,255,0.5);z-index:100;"><div style="float: center;color: white;"><h3>'+discText+'</h2></div></div>');
    setTimeout(function () {
        $('#serverDiscord').remove();
    }, 3000);
	}
}

var previousUrl = "";

function popAgarURL( fun ) {
    var a = WebSocket.prototype.send;
    window.__WS_send = WebSocket.prototype.send;
    WebSocket.prototype.send = function(b) {
        //debugger;
        try {
            var c = /((?:[0-9]{1,3}(?:\.|\-)){1,3}[0-9]{1,3})(?:.*?)?(\:[0-9]{1,5})/,
                d = c.exec(this.url);
         //ogario support
		 if (messageone=="0"||messageone=="1"){  //IF using Legend Mod
			var serverlinks= window.location.href +" :Agario Token";
			}
		else{
			var serverlinks="http://agar.io/?sip="+d[1].replace(/-/g,'.')+d[2]+" = regular"+"\r\n"+"http://agar.io/a?sip="+d[1].replace(/-/g,'.')+d[2]+" = ogario"+"\r\n";
		}  
        //ally support
        //    var serverlinks="http://agar.io/?sip="+d[1].replace(/-/g,'.')+d[2]+" = regular";
        //    if( $('#btn-dc-input').length )         // use this if you are using id to check
        //   {
        //        serverlinks += "\r\n"+$('#btn-dc-input')[0].value+" = Ally"+"\r\n";
        //    }
            fun( serverlinks );
        } catch (e) {
            console.log('exception: '+e.message);
        }
        try {
            a.apply(this, [b]);
            WebSocket.prototype.send = a;
        } catch (e) {
            window.__WS_send.apply(this, [b]);
            WebSocket.prototype.send = window.__WS_send;
        }
    };
}

function postToDiscord(discordUrl,isGeneralChannel) {
    popAgarURL( function( serverlinks ) {
        //hack to prevent strange post duplication bug
        if (previousUrl!=discordUrl) {
            // Sending and receiving data in JSON format using POST mothod
            //
            var xhr = new XMLHttpRequest();
            var url = discordUrl;
            console.log('discord url: ' + url);
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var json = JSON.parse(xhr.responseText);
                    console.log(json.email + ", " + json.password);
                }
            };
            var nick = $.find('#nick');
            //  console.log('nick: '+nick[0].value);
            var discordMsg="\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\r\n"+"Poster: "+nick[0].value+"\r\n\r\n"+serverlinks;
            if (isGeneralChannel) {
                discordMsg+="\r\nAlso posted in #serverlinks";
            }

            var data = JSON.stringify({"content":discordMsg});
            //var data = JSON.stringify({"content":serverlinks});
            xhr.send(data);
            console.log('Formatted Serverlinks:');
            console.log(serverlinks);
        }
        previousUrl=discordUrl;
    });
}


(function() {
    'use strict';
    setTimeout(function(){
        var a = $.find('#agario-main-buttons');
        var buttonclass = $(a[0].children).find('button')[1].getAttribute('class');
        


        var r = $('<button/>',
                  {
            text: 'Post Server IP to Discord',
            class: 'btn btn-play btn-primary btn-needs-server'
        });
        r[0].onclick = function () {

            postToDiscord(serverChannel,false);
            postToDiscord(generalChannel,true);
            displayDiscordNotification();
        };

        a[0].append($('<br/>')[0]);
        a[0].append(r[0]);
        a[0].append($('<br/>')[0]);
        // menu function
        GM_registerMenuCommand('Post Agar Server IP to Discord', function() {
            postToDiscord(serverChannel,false);
            postToDiscord(generalChannel,true);            
            displayDiscordNotification();
        }, 'r');
    },5000);

})();