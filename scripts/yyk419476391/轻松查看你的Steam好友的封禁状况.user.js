// ==UserScript==
// @name         轻松查看你的Steam好友的封禁状况
// @namespace    http://oldust.tk/
// @version      0.1
// @description  现在就看一下你好友的封禁状况！
// @author       TenmaHiltonWhat
// @match        https://steamcommunity.com/*/friends/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var friends=document.querySelectorAll(".friend_block_v2"),progress=document.createElement("div"),xmlHttp,queue=[],isProcessing=false,id,processed=0,banned=0,finished=false;if(XMLHttpRequest){xmlHttp=new XMLHttpRequest()}else{xmlHttp=new ActiveXObject("Microsoft.XMLHTTP")}document.querySelector(".profile_friends.title").innerHTML+="<span id='banned_status'>没有人被封禁</span>";var bS=document.querySelector("#banned_status");progress.style.cssText="position:fixed;width:0;height:5px;top:0;left:0;z-index:99999999;box-shadow:0 0 5px #66CCFF;background-color:#66CCFF;transition:width .3s ease-out,top .1s linear;border-top-right-radius:2.5px;border-bottom-right-radius:2.5px;";progress=document.body.appendChild(progress);xmlHttp.onreadystatechange=onRespd;for(var friend of friends){queue.push(friend.dataset.steamid)}function setStatus(a,b){if(b.error){console.log("%c发生了错误："+b.status);updateProgress();if(finished){updateProgress()}isProcessing=false;return}for(var c of friends){if(c.dataset.steamid==a){if(b.players[0].VACBanned){banned++}c.getElementsByClassName("friend_block_content")[0].innerHTML="<span style='color:"+(b.players[0].VACBanned?"red":"green")+";'>"+(b.players[0].VACBanned?b.players[0].DaysSinceLastBan+"天前被封禁一次":"无封禁记录")+"</span>"+c.getElementsByClassName("friend_block_content")[0].innerHTML}}updateProgress();if(finished){updateProgress()}isProcessing=false}function updateProgress(){var a=parseInt(progress.style.width.replace(/[^\d.]/g,""));progress.style.width=(a+document.body.clientWidth/friends.length)+"px";processed++}function onRespd(){if(xmlHttp.readyState==4){if(xmlHttp.status==200){var a=JSON.parse(xmlHttp.responseText);setStatus(a.players[0].SteamId,a)}else{var b=[error=true,status=xmlHttp.status];setStatus(null,b)}}}id=setInterval(function(){bS.innerHTML=((banned===0)?"没有人被封禁":"有<strong>"+banned+"</strong>人被封禁");if(isProcessing){return}xmlHttp.open("GET","https://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=301CBA93586C115F983FFB07DB2A86B5&steamids="+queue[0],true);xmlHttp.send(null);queue.shift();if(queue.length===0){clearInterval(id);finished=true;setTimeout(function(){progress.style.top="-5px";setTimeout(function(){document.body.removeChild(progress)},100)},2000)}isProcessing=true},500);window.onresize=function(){progress.style.width=(processed*(document.body.clientWidth/friends.length))+"px"}
})();