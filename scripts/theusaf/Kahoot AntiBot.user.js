// ==UserScript==
// @name         Kahoot AntiBot
// @namespace    http://tampermonkey.net/
// @version      2.2.6
// @description  Remove all bots from a kahoot game.
// @author       theusaf
// @match        *://play.kahoot.it/*
// @grant        none
// @run-at       document_start
// ==/UserScript==

if(window.fireLoaded){
  throw "page is loaded";
}
window.stop(); //stop loading and save data from the page.
window.url = window.location.href;
window.version = new XMLHttpRequest();
window.version.open("GET",`https://play.kahoot.it/shared/theme/config.js?${Date.now()}`);
window.version.send();
window.version.onload = ()=>{
  var kV = window.version.response.split("'")[1];
  var player = new XMLHttpRequest();
  player.open("GET","https://play.kahoot.it/js/player.min.js?v=" + kV);
  player.send();
  player.onload = ()=>{
    var playerScript = player.response.replace("i.onMessage=function(e,t){","i.onMessage=function(e,t){window.globalMessageListener(e,t);");
    playerScript = playerScript.replace("i.namerator","(()=>{console.log(\"namerator\" + i.namerator);window.isUsingNamerator=i.namerator;return i.namerator;})()");
    var boots = new XMLHttpRequest();
    boots.open("GET","https://play.kahoot.it/js/bootstrap.js");
    boots.send();
    boots.onload = ()=>{
      var patch = boots.response.replace(",$script([\"js/player.min.js?v\"+kahoot.version],function(){angular.bootstrap(document,[\"app\"])});",";");
      var page = new XMLHttpRequest();
      page.open("GET",window.url);
      page.send();
      page.onload = ()=>{
        const code = `window.setupAntibot = ()=>{
            const percent = 0.6;
            var waterMark = document.createElement("p");
            waterMark.innerText = "v2.2.6 @theusaf";
            waterMark.style = "position: fixed; bottom: 100px; right: 100px; font-size: 1em";
            document.body.append(waterMark);
            window.isUsingNamerator = false;
            window.cachedUsernames = [];
            window.confirmedPlayers = [];
            var messageId = 0;
            var clientId = null;
            var pin = null;
            function similarity(s1, s2) {
                if(!s2){
                    return 0;
                }
                if(s1){
                    if(!isNaN(s2) && !isNaN(s1) && s1.length == s2.length){
                        return 1;
                    }
                }
                if(window.isUsingNamerator){
                    let caps = s2.length - s2.replace(/[A-Z]/g, '').length;
                    if(caps !== 2){ /*has less than 2 or more than 2 capitals*/
                        return -1;
                    }
                    if (s2.substr(0,1).replace(/[A-Z]/g,'').length === 1){ /*first char is not a capital*/
                        return -1;
                    }
                    if (s2.substr(1,2).replace(/[A-Z]/g,'').length != 2){ /*next few char have capitals*/
                        return -1;
                    }
                    if(s2.substr(s2.length - 2,2).replace(/[A-Z]/g,'').length !== 2){ /*last few char have a capital*/
                        return -1;
                    }
                    if(s2.replace(/[a-z]/ig,'').length > 0){ /*has non-letter chars*/
                        return -1;
                    }
                }
                if(!s1){
                    return;
                }
                s1 = s1.toLowerCase();
                s2 = s2.toLowerCase();
                var longer = s1;
                var shorter = s2;
                if (s1.length < s2.length) {
                    longer = s2;
                    shorter = s1;
                }
                var longerLength = longer.length;
                if (longerLength == 0) {
                    return 1.0;
                }
                return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
            }
            function editDistance(s1, s2) {
                s1 = s1.toLowerCase();
                s2 = s2.toLowerCase();

                var costs = new Array();
                for (var i = 0; i <= s1.length; i++) {
                    var lastValue = i;
                    for (var j = 0; j <= s2.length; j++) {
                        if (i == 0){
                            costs[j] = j;
                        }
                        else {
                            if (j > 0) {
                                var newValue = costs[j - 1];
                                if (s1.charAt(i - 1) != s2.charAt(j - 1)){
                                    newValue = Math.min(Math.min(newValue, lastValue),costs[j]) + 1;
                                }
                    costs[j - 1] = lastValue;
                                lastValue = newValue;
                            }
                        }
                    }
                    if (i > 0){
                        costs[s2.length] = lastValue;
                    }
                }
                return costs[s2.length];
            }
            function setup(){
                var launch_button = document.querySelectorAll("[data-functional-selector=\\\"launch-button\\\"]")[0];
                if(launch_button){
                    console.warn("launch button found!");
                }else{
                    setTimeout(setup,1000);
                }
            }
            setup();
            function createKickPacket(id){
                messageId++;
                return [{
                    channel: "/service/player",
                    clientId: clientId,
                    id: String(Number(messageId)),
                    data: {
                        cid: String(id),
                        content: JSON.stringify({
                            kickCode: 1,
                            quizType: "quiz"
                        }),
                        gameid: pin,
                        host: "play.kahoot.it",
                        id: 10,
                        type: "message"
                    }
                }];
            }
            function determineEvil(player,socket){
                if(window.cachedUsernames.length == 0){
                    if(similarity(null,player.name) == -1){
                        var packet = createKickPacket(player.cid);
                        socket.send(JSON.stringify(packet));
                        console.warn(\`Bot \${player.name} has been banished\`);
                        throw "Bot banned. Dont add";
                    }
                    window.cachedUsernames.push({name: player.name, id: player.cid, time: 10, banned: false});
                }else{
                    var removed = false;
                    for(var i in window.cachedUsernames){
                        if(window.confirmedPlayers.includes(window.cachedUsernames[i].name)){
                            continue;
                        }
                        if(similarity(window.cachedUsernames[i].name,player.name) == -1){
                            removed = true;
                            var packet1 = createKickPacket(player.cid);
                            socket.send(JSON.stringify(packet1));
                            console.warn(\`Bot \${player.name} has been banished\`);
                            throw "Bot banned. Dont add";
                        }
                        if(similarity(window.cachedUsernames[i].name,player.name) >= percent){
                            removed = true;
                            var packet1 = createKickPacket(player.cid);
                            socket.send(JSON.stringify(packet1));
                            if(!window.cachedUsernames[i].banned){
                                var packet2 = createKickPacket(window.cachedUsernames[i].id);
                                window.cachedUsernames[i].banned = true;
                                window.cachedUsernames[i].time = 10;
                                socket.send(JSON.stringify(packet2));
                            }
                            console.warn(\`Bots \${player.name} and \${window.cachedUsernames[i].name} have been banished\`);
                            throw "Bot banned. Dont add";
                        }
                    }
                    if(!removed){
                        window.cachedUsernames.push({name: player.name, id: player.cid, time: 10, banned: false});
                    }
                }
            }
            var timer = setInterval(function(){
                for(let i in window.cachedUsernames){
                    if(window.cachedUsernames[i].time <= 0 && !window.cachedUsernames[i].banned && !window.confirmedPlayers.includes(window.cachedUsernames[i].name)){
                        window.confirmedPlayers.push(window.cachedUsernames[i].name);
                        continue;
                    }
                    if(window.cachedUsernames[i].time <= -20){
                        window.cachedUsernames.splice(i,1);
                        continue;
                    }
                    window.cachedUsernames[i].time--;
                }
            },1000);
            window.globalMessageListener = function(e,t){
                /*console.log(e); from testing: e is the websocket*/
                var data = JSON.parse(t.data)[0];
                /*console.log(data);*/
                messageId = data.id ? data.id : messageId;
                /*if the message is the first message, which contains important clientid data*/
                if(data.id == 1){
                    clientId = data.clientId;
                }
                /*if the message contains the pin*/
                if(data.id == 3){
                    pin = Number(data.subscription.split("r/")[1]);
                }
                /*if the message is a player join message*/
                if(data.data ? data.data.type == "joined" : false){
                    console.warn("determining evil...");
                    determineEvil(data.data,e);
                }
            }
        }`;
        var changed = page.response.replace("js/bootstrap.js","data:text/plain,null");
        changed = changed.split("</body>");
        changed = `${changed[0]}<script type="text/javascript">${patch+playerScript+code};angular.bootstrap(document,["app"]);window.setupAntibot();window.fireLoaded = true;</script></body>${changed[1]}`;
        document.open();
        document.write(changed);
        document.close();
      };
    };
  };
};
