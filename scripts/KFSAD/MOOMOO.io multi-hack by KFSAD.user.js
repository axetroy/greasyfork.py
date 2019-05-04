// ==UserScript==
// @name         MOOMOO.io multi-hack by KFSAD
// @namespace    -
// @version      8.0
// @description  Autoheal,autobull(insta-kill)
// @author       KFSAD
// @match        *://moomoo.io/*
// @match        http://dev.moomoo.io/*
// @grant        none
// @require https://greasyfork.org/scripts/368273-msgpack/code/msgpack.js?version=598723
// ==/UserScript==

const autoHealSpeed = 150; //Bigger number = SLOWER autoheal; fastest is 0

const START_SSWX = [4, 132, 164, 116, 121, 112, 101, 2, 164, 100, 97, 116, 97, 147, 161, 52, 1, 192, 167, 111, 112, 116, 105, 111, 110, 115, 129, 168, 99, 111, 109, 112, 114, 101, 115, 115, 195, 163, 110, 115, 112, 161, 47];
const END_SSWX = [4, 132, 164, 116, 121, 112, 101, 2, 164, 100, 97, 116, 97, 147, 161, 52, 0, 192, 167, 111, 112, 116, 105, 111, 110, 115, 129, 168, 99, 111, 109, 112, 114, 101, 115, 115, 195, 163, 110, 115, 112, 161, 47];
const TAKEOUT = [4, 132, 164, 116, 121, 112, 101, 2, 164, 100, 97, 116, 97, 147, 161, 53, 15, 212, 0, 0, 167, 111, 112, 116, 105, 111, 110, 115, 129, 168, 99, 111, 109, 112, 114, 101, 115, 115, 195, 163, 110, 115, 112, 161, 47];
const APPLE = [4, 132, 164, 116, 121, 112, 101, 2, 164, 100, 97, 116, 97, 147, 161, 53, 0, 212, 0, 0, 167, 111, 112, 116, 105, 111, 110, 115, 129, 168, 99, 111, 109, 112, 114, 101, 115, 115, 195, 163, 110, 115, 112, 161, 47];
const COOKIE = [4, 132, 164, 116, 121, 112, 101, 2, 164, 100, 97, 116, 97, 147, 161, 53, 1, 212, 0, 0, 167, 111, 112, 116, 105, 111, 110, 115, 129, 168, 99, 111, 109, 112, 114, 101, 115, 115, 195, 163, 110, 115, 112, 161, 47];
const PIZZA = [97, 117, 116, 111, 115, 112, 101, 101, 100]
var currentHat = 0;
var currentAccessory = 0;
var IN_PROCESS = false;
var justDied = false;
var recentHealth = 100;
var ws;
var MYID;
var hasApple = true;
var foodInHand = false;
var autoheal = true;
var autobull = true;
var STATE = 0;
var msgpack5 = msgpack;
var inThisProcess = false;
var allMooMooObjects = {};
var bowWorked = true;
var myCLAN = null;
var myPlayer;
var nearestPlayerAngle = 0;
document.timeTween = 130;

var playersNear = [];

var player = function(id, x, y, clan){
    this.id = id;
    this.x = x;
    this.y = y;
    this.clan = clan;
}



document.title = "(KFSAD`s hack)";


function encodeSEND(json){
    let OC = msgpack5.encode(json);
        var aAdd = Array.from(OC);
        aAdd.unshift(4);
        return new Uint8Array(aAdd).buffer;
}


function bullHelmet2(status){
    console.log(status);
    var dataTemplate = {"data":[], "options":{"compress":false}, "nsp": "/", "type": 2};
    if (!status.includes("m")){
        dataTemplate["data"] = ["13", 0, status == "on" ? 7  : currentHat, 0];
    } else {
        if (currentAccessory == 11){
            console.log("HERE2");
            dataTemplate["data"] = ["13", 0, status == "mOn" ? 11: 0, 1];
        } else {
             console.log("HERE");
             dataTemplate["data"] = ["13", 0, currentAccessory, 1];
        }
    }
    console.log(dataTemplate["data"]);
    let encoded = encodeSEND(dataTemplate);
    return encoded;
}


WebSocket.prototype.oldSend = WebSocket.prototype.send;
WebSocket.prototype.send = function(m){
    if (!ws){
        document.ws = this;

        document.send = function (sender){
            var dtmp = {"data":[], "options":{"compress":false}, "nsp": "/", "type": 2};
            var dt50 = dtmp;
            dt50["data"]=sender;
            document.ws.send(encodeSEND(dt50));
        }

        ws = this;
        console.log("WS SET");
        socketFound(this);
    }


      if (inThisProcess){
            console.log(new Uint8Array(m));
            this.oldSend(m);
            return;
        }
    let x = new Uint8Array(m);
    //console.log(x);
    let x_arr_SSX = Array.from(x);
    if (x_arr_SSX.length === 43 && autobull){
         if (x_arr_SSX.every( (num, idx) => START_SSWX[idx]==num )){
             console.log("started swing");
             IN_PROCESS = true;
             this.oldSend(bullHelmet2("on"));
             this.oldSend(bullHelmet2("mOff"));
         } else if (x_arr_SSX.every( (num, idx) => END_SSWX[idx]==num ) ){
             console.log("ended swing");
             this.oldSend(bullHelmet2("off"));
             this.oldSend(bullHelmet2("mOn"));
             IN_PROCESS = false;
         }
    }



    this.oldSend(m);
    /*let usageArray = Array.from(new Uint8Array(m));
    if (usageArray.length == 45){
        if (usageArray[16] == 0 || usageArray[16] == 1) foodInHand = false;
        console.log(`Food in hand: null{foodInHand}`);

    };*/
    let realData = msgpack5.decode(x.slice(1 , x.length));
    //console.log("sent");
     if(realData.data[0]!="2")    console.log(realData.data);
    //console.log(new Date().getTime());
    if (realData.data[0]=="1"){
      console.log("user respawned");
       for (var elem of Object.values(allMooMooObjects)){
           console.log(elem);
          elem.style.opacity = 1;
        }
       justDied = false;
    } else if (realData.data[0]=="13"){
        console.log("In Hat Part");
        console.log(realData);
        console.log(IN_PROCESS);
        console.log(realData.data);
        console.log("test");
        if (!IN_PROCESS && realData.data.length == 4 && realData.data[3]==0 &&realData.data[1]==0){
            currentHat = realData.data[2];
            console.log("Changed hat to " + currentHat);

        } else if (!IN_PROCESS && realData.data.length == 4 && realData.data[3]==1 &&realData.data[1]==0){
            currentAccessory = realData.data[2];
            console.log("Changed accessory to " + currentAccessory);
        }

    }
    console.log("test2");
};


function socketFound(socket){
    socket.addEventListener('message', function(message){
        handleMessage(message);
    });
}

function isElementVisible(e) {
    return (e.offsetParent !== null);
}



function heal(){
    if (recentHealth>=100) return;
    console.log(recentHealth);
    console.log(`HERE I AM IN THE HEAL FUNC with null{hasApple}`);
    var dataTemplate = {"data":[], "options":{"compress":false}, "nsp": "/", "type": 2};
    if (hasApple){
        if (!haveApple()){
            heal();
            return;
        }
        else { //User has apple
            var data2 = dataTemplate;
            data2['data'] = ["5", 0, null];
            ws.send(encodeSEND(data2));

        }
    }
    else { //User has cookie
        console.log('user has cookie');
            var data2 = dataTemplate;
            data2['data'] = ["5", 1, null];
            ws.send(encodeSEND(data2));
    }
    dataTemplate["data"]=["4", 1, null];
    let encoded = encodeSEND(dataTemplate);
    ws.send(encoded);

    recentHealth += hasApple ? 20 : 40;

}

function handleMessage(m){
    let td = new Uint8Array(m.data);
//      console.log(td);
    //console.log(td);
    //console.log(td.slice(98,-1));
    var info = msgpack5.decode(td.slice(1, td.length)).data;
   //console.log("received");
    //console.log(new Date().getTime());
    if(!info) return;
     if (inThisProcess){
        doNewSend(["2", nearestPlayerAngle]);
      }
//    doNewSend(["2", 0.45]);
    if (info[0]=="3"){ //player update
        playersNear = [];
        var locInfoNow = info[1];
        //console.log(locInfoNow);
        for (var i=0;i<locInfoNow.length/13;i++){
            var playerData = locInfoNow.slice(13*i, 13*i+13);
            if (playerData[0]==MYID){
                myCLAN = playerData[7];
                myPlayer = new player(playerData[0], playerData[1], playerData[2], playerData[7]);
                continue
            }
            if (playerData[7]===null || playerData[7] != myCLAN){
                 var locPlayer = new player(playerData[0], playerData[1], playerData[2], playerData[7]);
                 playersNear.push(locPlayer);
            }

        }
         var nearestPlayerPosition = playersNear.sort( (a,b) => pdist(a, myPlayer) - pdist(b, myPlayer) );
           var nearestPlayer = nearestPlayerPosition[0];
           if (nearestPlayer){
               nearestPlayerAngle = Math.atan2( nearestPlayer.y-myPlayer.y, nearestPlayer.x-myPlayer.x);
           }

    }

    if (info[0]=="6"){
        var locInfo = info[1];
        if (locInfo[locInfo.length-1].toString() == MYID){ //Object created
        if (window.innerWidth >= 770){
            var itemID = `actionBarItem${locInfo[locInfo.length-2]+13}`;
            var imgURL = document.getElementById(itemID).style.backgroundImage.toString().match(/url\("(.+)?(?=")/)[1];
            console.log(imgURL);
            let mapDisplay = document.getElementById("mapDisplay").getBoundingClientRect();
            let mapSize = [14365, 14365];
            let boxSize = [130, 130];
            let targets = [locInfo[1], locInfo[2]].map(item => (130*item)/14365);
            let x = targets[0] + mapDisplay.x - 6;
            let y = targets[1] + mapDisplay.y - 6;
            let newTarget = document.createElement("div");
            newTarget.style = `background-image: url("${imgURL}"); background-size: 12px 12px; width:12px; height:12px; position:absolute; left: ${x}px; top:${y}px; z-index:100`;
            newTarget.className = "mapTarget";
            document.getElementsByTagName("body")[0].appendChild(newTarget);
            allMooMooObjects[locInfo[0]] = newTarget;

        }
    }
    }

    if (info[0]=="12"){
       if (Object.keys(allMooMooObjects).includes(info[1].toString())){
            allMooMooObjects[info[1]].remove();
      }
    }

//    console.log("-------------")
    if (info[0] == "1" && !MYID){
        MYID =  info[1];
    }


    if (info[0] == "18" && info[4]=="1200") {
        console.log(info);
      bowWorked = true;
    }

    if (info[0] == "10" && info[1] == MYID && autoheal){
          console.log("doing stuff");
        console.log(info);
        if (info[2] < 100 && info[2] > 0){
       recentHealth = info[2];
       console.log("RECEIVED:");
        console.log(info);
        //recentHealth += hasApple ? 20 : 40;
       console.log("heal notif sent");
       setTimeout( () => {
           heal();
       }, 150);
        } else if (info[2] > 0) {
            console.log("done healing");
            recentHealth = 100;
            if (foodInHand){
               console.log("okay bad thing happened");
             var dataTemplate5 = {"type": 2, "data":[], "options":{"compress":false}, "nsp": "/"};
             dataTemplate5["data"]=["5", 0, null];
             let encoded5 = encodeSEND(dataTemplate5);
             ws.send(encoded5);
                console.log("corrected bad thing");
            }

        } else {
            hasApple = true; //You've died tragically in combat; back to the apple for you!
            console.log("Setting has apple to true from here");
        }
    }
    else if(info[0] == "11"){
        console.log("doing death");
        for (var elem of Object.values(allMooMooObjects)){
           console.log(elem);
          elem.style.opacity = 0;
        }
        hasApple = true;
        justDied = true;
        recentHealth = 100;

    }

}

function pdist(player1, player2){
      return Math.sqrt( (player2.y-player1.y)**2 + (player2.x-player1.x)**2 )
}

function haveApple(){
    console.log("Im being used and justDied is:" + justDied);
    if (justDied){
        hasApple = true;
        return true;
    }
    if (hasApple) hasApple = isElementVisible(document.getElementById("actionBarItem13"));
    return hasApple;
}


function doNewSend(sender){
    var dtmp = {"data":[], "options":{"compress":false}, "nsp": "/", "type": 2};
    var dt50 = dtmp;
    dt50["data"]=sender;
    ws.send(encodeSEND(dt50));
}

document.addEventListener('keypress', (e)=>{
   if (e.keyCode == 116 && document.activeElement.id.toLowerCase() !== 'chatbox'){
       STATE+=1;
       let coreIndex = STATE%4;
       let truthArray = [ [1,2].includes(coreIndex), [0,1].includes(coreIndex)];
       autobull = truthArray[0];
       autoheal = truthArray[1];
       document.title = "Heal " + (autoheal ? "ON" : "OFF") + " / Bull Hat " + (autobull ? "ON" : "OFF");
   } else if (e.keyCode == 102 && document.activeElement.id.toLowerCase() !== 'chatbox') {
        var dataTemplate = {"data":[], "options":{"compress":false}, "nsp": "/", "type": 2};
        var data50 = dataTemplate;
        data50["data"]=["5", 15, 0];
        ws.send(encodeSEND(data50));
        var data51 = dataTemplate;
        data51["data"]=["4", 1, null];
        let encoded2 = encodeSEND(data51);
        ws.send(encoded2);
        dataTemplate["data"]=["4",0, null];
        let encoded = encodeSEND(dataTemplate);
        ws.send(encoded);
   } else if (e.keyCode == 114 && document.activeElement.id.toLowerCase() !== 'chatbox') {
       console.log(currentAccessory);
       var ctime = new Date().getTime();
       console.log(inThisProcess)
       if (!inThisProcess){
       console.log("got in");
       inThisProcess = true
        IN_PROCESS = true;
       doNewSend(["13", 0, 7, 0]);
          if (currentAccessory == 11){
               doNewSend(["13", 0, 0, 1]);
           }
       doNewSend(["5", 5, true]);
       console.log("Starting at 0");


       setTimeout( () => {
           doNewSend(["2", nearestPlayerAngle]);
           doNewSend(["4", 1, null]); //If we're perfect, we only send this once
           console.log(`Sending swing at ${new Date().getTime() - ctime}`);
           ctime = new Date().getTime();
       }, 20);



       setTimeout( () => {
           doNewSend(["2", nearestPlayerAngle]);
           doNewSend(["5", 11, true]);
           console.log(`Changed weapon at ${new Date().getTime() - ctime}`);
           ctime = new Date().getTime();
       }, document.timeTween); //120-140?




       setTimeout( () => {
           doNewSend(["4", 0, null]);
           doNewSend(["13", 0, currentHat, 0]);
           if (currentAccessory == 11){
                doNewSend(["13", 0, currentAccessory, 1]);
                    }
           doNewSend(["5", 5, true]);
           console.log(`Finished at  ${new Date().getTime() - ctime}`);
           ctime = new Date().getTime();
       }, 600);

        setTimeout( () => {
          if (bowWorked){
          doNewSend(["5", 11, true]);
        }
       }, 730);

        setTimeout( () => {
          if (bowWorked){
          doNewSend(["4", 1, null]);
        }
       }, 840);

      setTimeout( () => {
           if (bowWorked){
          doNewSend(["4", 0, null]);
        }
       }, 950);

      setTimeout( () => {
          inThisProcess = false;
          if (bowWorked){
         doNewSend(["5", 5, true]);
         bowWorked = false;
         IN_PROCESS = false;
       }
        IN_PROCESS = false;
       }, 1060);

    //if it worked, fire, if it didn't dont fire
       }

//IT WORKS ON AND OFF
//    WTF ??!?!?

   }
});