// ==UserScript==
// @name         Bloble.io Mods Patch
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  antikick, press TAB = bots code, link you to who have your clan TAG, press E and set position to them, press X move to next commander, press E move to next base, press SHIFT to agroup 4 commanders.
// @author       You
// @match        http://bloble.io/*
// @grant        none
// @run-at       context-menu
// ==/UserScript==

//CHAT IS SELECTED OR NO
chatInput.onfocus=function(){chatInput.isFocused=true;};
chatInput.onblur=function(){chatInput.isFocused=false;};

//DELETE PLAYER
addEventListener("keydown", function(a) {
    if(chatInput.isFocused===false&&a.keyCode==46){
        if(selUnits.length!==0){
            local.emit('del',selUnits[0].owner);
        }
    }
});

//AGROUP UNITS
addEventListener("keydown", function(a) {
    if(chatInput.isFocused===false&&a.keyCode==16){
        if(selUnits.length==4&&selUnits.length!==0){
            var center = selUnitsMidPoint();
            var points = [];
            points.push({x:center[0],y:center[1],moving:false});
            points.push({x:center[0]+275,y:center[1]+275,moving:false});
            points.push({x:center[0]+275,y:center[1],moving:false});
            points.push({x:center[0],y:center[1]+275,moving:false});
            for(o=0,e=selUnits;o<e.length;++o){
                var closest = 1000000000;
                for(i=0,e=points;i<points.length;++i){
                    var d=UTILS.getDistance(e[i].x,e[i].y,selUnits[o].x,selUnits[o].y);
                    if(i!==4){
                        if(e[i].moving===false&&d<closest){
                            closest=d;
                            local.emit("5",points[i].x,points[i].y,[selUnits[o].id],0,0);
                            if(selUnits[o].owner==player.sid){socket.emit("5",UTILS.roundToTwo(points[i].x),UTILS.roundToTwo(points[i].y),[selUnits[o].id],0,0);}
                        }
                    }
                    else{
                        closest=d;
                        if(selUnits[o].owner==player.sid){socket.emit("5",UTILS.roundToTwo(points[i].x),UTILS.roundToTwo(points[i].y),[selUnits[o].id],0,0);}
                        local.emit("5",points[i].x,points[i].y,[selUnits[o].id],0,0);
                    }
                }
            }
        }
    }
});

//MOVE TO COMMANDERS
var lastUnit=0;
addEventListener("keydown", function(a) {
    if (chatInput.isFocused===false&&a.keyCode == 88) {
        if(unitsWithTag()!==0){
        for(i=lastUnit,e=units,h=e.length*2;i<h;++i){
            if(i==h){
                break;
            }
            if(i==e.length){
                i=0;
            }
            if(units[i]!==undefined){
                o=users[getUserBySID(units[i].owner)];
                if(o!==undefined&&o.sid!==player.sid&&o.name.startsWith(clanTag)&&units[i].shape=="star"){
                    selUnits=[];
                    camX = units[i].x-player.x;
                    camY = units[i].y-player.y;
                    selUnits.push(units[i]);
                    if(i==e.length){lastUnit=0;}
                    else{lastUnit=1+i;}
                    break;
                }
            }
        }}
    }
});

//MOVE TO ALLIES
var lastAlly=0;
addEventListener("keydown", function(a) {
    if (chatInput.isFocused===false&&a.keyCode == 69) {
        if(usersWithTag()!==0){
        for(i=lastAlly,e=users,h=e.length*2;i<h;++i){
            if(i==e.length){
                i=0;
            }
            if(i!==0&&users[i].sid!==player.sid&&users[i].name.startsWith(clanTag)){
                camX = users[i].x-player.x;
                camY = users[i].y-player.y;
                if(i==e.length){lastAlly=0;}
                else{lastAlly=1+i;}
                break;
            }
        }}
    }
});

//ANTI KICK
setInterval(updatePlayer,90000);
function updatePlayer(){
    socket.emit("2",0,0);
    socket.emit("2",Math.round(camX),Math.round(camY));
}

//GET BOTS CODE
addEventListener("keydown", function(a) {
    if (chatInput.isFocused===false&&a.keyCode == 9) {
        alert('node . '+socket.io.uri+' '+player.sid+' '+clanTag+'SOLDIER'+' 0');
    }
});

var script = document.createElement('script');
script.type = "text/javascript";
script.innerHTML = (<><![CDATA[

//FUNCTIONS
function usersWithTag(){
    if(users.lenght!==0){
    for(o=[],i=0,e=users;i<e.length;++i){
        if(users[i].sid!==player.sid&&users[i].name.startsWith(clanTag)){
            o.push(users[i]);
        }
    }
    return o.length;
    }
    else{
        return 0;
        }
}
function unitsWithTag(){
    if(units.length){
    for(o=[],i=0,e=units;i<e.length;++i){
        h=users[getUserBySID(e[i].owner)];
        if(h!==undefined&&e[i].shape=="star"&&h.name.startsWith(clanTag)){
            o.push(e[i]);
        }
    }
    return o.length;
    }
    else{
    return 0;
    }
}
//RANDOM VARIABLES
    chatInput.isFocused = false;
    var cameraSpd=5;
    var ScreenHeight=5000;
    var ScreenWidth=5000;
    var maxScreenHeight=5000;
    var maxScreenWidth=5000;
    resize();
    var currentAlly=0;
//CLAN TAG
    var clanTag = prompt('Clan tag:');

//CONNECT TO BOTS
    var local = connectLocal();
    function connectLocal(){
        const locallIo = io;
        return locallIo.connect('http://localhost:8080');
    }

//SELECT COMMANDER BOTS
    function toggleSelUnit(){if(player&&!activeUnit&&units){var a=(player.x||0)-maxScreenWidth/2+camX,d=(player.y||0)-maxScreenHeight/2+camY,c=player.x-a+targetDst*MathCOS(targetDir)+camX,b=player.y-d+targetDst*MathSIN(targetDir)+camY;disableSelUnit();var g=4>=MathABS(c-mouseStartX+(b-mouseStartY)),e=!1;activeBase=null;if(g)for(var h=0;h<users.length;++h)if(0<=users[h].size-UTILS.getDistance(c,b,users[h].x-a,users[h].y-d)){activeBase=users[h];forceUnitInfoUpdate=!0;break}if(!activeBase){activeBase=null;
    for(h=0;h<units.length;++h)if(users[getUserBySID(units[h].owner)]!==undefined&&users[getUserBySID(units[h].owner)].name.startsWith(clanTag)===true||units[h].owner==player.sid)if(g){if(0<=units[h].size-UTILS.getDistance(c,b,units[h].x-a,units[h].y-d)){selUnits.push(units[h]);var f=getUnitFromPath(selUnits[0].uPath);f&&(selUnits[0].info=f,"Unit"==f.typeName&&(e=!0));break}}else UTILS.pointInRect(units[h].x-a,units[h].y-d,mouseStartX,mouseStartY,c-mouseStartX,b-mouseStartY)&&(selUnits.push(units[h]),f=getUnitFromPath(selUnits[selUnits.length-1].uPath))&&(selUnits[selUnits.length-1].info=f,"Unit"==f.typeName&&(e=!0));
    if(selUnits.length){for(h=selUnits.length-1;0<=h;--h)e&&"Tower"==selUnits[h].info.typeName?selUnits.splice(h,1):e||"Unit"!=selUnits[h].info.typeName||selUnits.splice(h,1);selUnitType=e?"Unit":"Tower";150<selUnits.length&&(selUnits.length=150)}}updateSelUnitViews()}}

//CREATE NEW SOLDIER
addEventListener("keydown", function(a) {
    if (chatInput.isFocused===false&&a.keyCode == 107) {
        local.emit("create");
    }
});

//MOVE COMMANDER BOTS
    function moveSelUnits(){
        if(selUnits.length){
        var a=player.x+targetDst*MathCOS(targetDir)+camX,d=player.y+targetDst*MathSIN(targetDir)+camY,c=1;
            if(c&&1<selUnits.length)
                for(var b=0;b<users.length;++b)if(UTILS.pointInCircle(a,d,users[b].x,users[b].y,users[b].size)){
                    c=0;break}var g=-1;if(c)for(b=0;b<units.length;++b)if(units[b].onScreen&&units[b].owner!=player.sid&&UTILS.pointInCircle(a,d,units[b].x,units[b].y,units[b].size)){
                        c=0;g=units[b].id;break}1==selUnits.length&&(c=0);
            if(selUnits.length==1){
            for(var e=[],b=0;b<selUnits.length;++b){e.push(selUnits[b].id)
        if(selUnits[b].owner==player.sid){socket.emit("5",UTILS.roundToTwo(a),UTILS.roundToTwo(d),e,c,g);}local.emit("5",a,d,e,c,g);}}
        if(selUnits.length>1){
            var p = selUnitsMidPoint();
            for(var e=[],b=0;b<selUnits.length;++b){
            e=[selUnits[b].id];
            var x= selUnits[b].x-p[0];
            var y= selUnits[b].y-p[1];
        if(selUnits[b].owner==player.sid){socket.emit("5",UTILS.roundToTwo(a+x),UTILS.roundToTwo(d+y),e,c,g);}local.emit("5",a+x,d+y,e,c,g);}}}}

//MID POS BETWEN UNITS
    function selUnitsMidPoint(){
        x=0;
        y=0;
        for(i=0,a=selUnits;i<a.length;++i){
            y=selUnits[i].y+y;
            x=selUnits[i].x+x;
        }
        return [x/a.length,y/a.length];
    }

//LINE TO ALLIES
    function playersLinked(a,d){
        if(a.sid==player.sid&&d.name.startsWith(clanTag)){
           return true;
        }
     }

//UPGRAD GAME LOOP
updateGameLoop=function(a){if(player&&gameData){updateTarget();if(gameState&&mapBounds){if(camXS||camYS)camX+=camXS*cameraSpd*a,camY+=camYS*cameraSpd*a;player.x+camX<mapBounds[0]?camX=mapBounds[0]-player.x:player.x+camX>mapBounds[0]+mapBounds[2]&&(camX=mapBounds[0]+mapBounds[2]-player.x);player.y+camY<mapBounds[1]?camY=mapBounds[1]-player.y:player.y+camY>mapBounds[1]+mapBounds[3]&&(camY=mapBounds[1]+mapBounds[3]-player.y);
currentTime-lastCamSend>=sendFrequency&&(lastCamX!=camX||lastCamY!=camY)&&(lastCamX=camX,lastCamY=camY,lastCamSend=currentTime,socket.emit("2",Math.round(camX),Math.round(camY)))}renderBackground(outerColor);var d=(player.x||0)-maxScreenWidth/2+camX,c=(player.y||0)-maxScreenHeight/2+camY;mapBounds&&(mainContext.fillStyle=backgroundColor,mainContext.fillRect(mapBounds[0]-d,mapBounds[1]-c,mapBounds[2],mapBounds[3]));for(var b,g,e=0;e<units.length;++e)b=units[e],b.interpDst&&(g=b.interpDst*a*.015,b.interX+=
g*MathCOS(b.interpDir),b.interY+=g*MathSIN(b.interpDir),b.interpDst-=g,.1>=b.interpDst&&(b.interpDst=0,b.interX=b.interpDstS*MathCOS(b.interpDir),b.interY=b.interpDstS*MathSIN(b.interpDir))),b.speed&&(updateUnitPosition(b),b.x+=b.interX||0,b.y+=b.interY||0);var h,f;if(gameState)if(activeUnit){h=player.x-d+targetDst*MathCOS(targetDir)+camX;f=player.y-c+targetDst*MathSIN(targetDir)+camY;var k=UTILS.getDirection(h,f,player.x-d,player.y-c);0==activeUnit.type?(b=UTILS.getDistance(h,f,player.x-d,player.y-
c),b-activeUnit.size<player.startSize?(h=player.x-d+(activeUnit.size+player.startSize)*MathCOS(k),f=player.y-c+(activeUnit.size+player.startSize)*MathSIN(k)):b+activeUnit.size>player.buildRange-.15&&(h=player.x-d+(player.buildRange-activeUnit.size-.15)*MathCOS(k),f=player.y-c+(player.buildRange-activeUnit.size-.15)*MathSIN(k))):1==activeUnit.type||2==activeUnit.type?(h=player.x-d+(activeUnit.size+player.buildRange)*MathCOS(k),f=player.y-c+(activeUnit.size+player.buildRange)*MathSIN(k)):3==activeUnit.type&&
(b=UTILS.getDistance(h,f,player.x-d,player.y-c),b-activeUnit.size<player.startSize?(h=player.x-d+(activeUnit.size+player.startSize)*MathCOS(k),f=player.y-c+(activeUnit.size+player.startSize)*MathSIN(k)):b+activeUnit.size>player.buildRange+2*activeUnit.size&&(h=player.x-d+(player.buildRange+activeUnit.size)*MathCOS(k),f=player.y-c+(player.buildRange+activeUnit.size)*MathSIN(k)));activeUnitDir=k;activeUnitDst=UTILS.getDistance(h,f,player.x-d,player.y-c);activeUnit.dontPlace=!1;mainContext.fillStyle=
outerColor;if(0==activeUnit.type||2==activeUnit.type||3==activeUnit.type)for(e=0;e<units.length;++e)if(1!=units[e].type&&units[e].owner==player.sid&&0<=activeUnit.size+units[e].size-UTILS.getDistance(h,f,units[e].x-d,units[e].y-c)){mainContext.fillStyle=redColor;activeUnit.dontPlace=!0;break}renderCircle(h,f,activeUnit.range?activeUnit.range:activeUnit.size+30,mainContext,!0)}else if(selUnits.length)for(e=0;e<selUnits.length;++e)mainContext.fillStyle=outerColor,1<selUnits.length?renderCircle(selUnits[e].x-
d,selUnits[e].y-c,selUnits[e].size+25,mainContext,!0):renderCircle(selUnits[e].x-d,selUnits[e].y-c,selUnits[e].range?selUnits[e].range:selUnits[e].size+25,mainContext,!0);else activeBase&&(mainContext.fillStyle=outerColor,renderCircle(activeBase.x-d,activeBase.y-c,activeBase.size+50,mainContext,!0));if(selUnits.length)for(mainContext.strokeStyle=targetColor,e=0;e<selUnits.length;++e)selUnits[e].gatherPoint&&renderDottedCircle(selUnits[e].gatherPoint[0]-d,selUnits[e].gatherPoint[1]-c,30,mainContext);
for(e=0;e<users.length;++e)if(b=users[e],!b.dead){mainContext.lineWidth=1.2*outlineWidth;mainContext.strokeStyle=indicatorColor;isOnScreen(b.x-d,b.y-c,b.buildRange)&&(mainContext.save(),mainContext.translate(b.x-d,b.y-c),mainContext.rotate(playerBorderRot),renderDottedCircle(0,0,b.buildRange,mainContext),renderDottedCircle(0,0,b.startSize,mainContext),mainContext.restore());b.spawnProt&&(mainContext.strokeStyle=redColor,mainContext.save(),mainContext.translate(b.x-d,b.y-c),mainContext.rotate(playerBorderRot),
renderDottedCircle(0,0,b.buildRange+140,mainContext),mainContext.restore());for(var m=0;m<users.length;++m)e<m&&!users[m].dead&&(mainContext.strokeStyle=b.spawnProt||users[m].spawnProt?redColor:indicatorColor,playersLinked(b,users[m])&&(true==true||isOnScreen((b.x+users[m].x)/2-d,(b.y+users[m].y)/2-c,0))&&(g=UTILS.getDirection(b.x,b.y,users[m].x,users[m].y),renderDottedLine(b.x-(b.buildRange+lanePad+(b.spawnProt?140:0))*MathCOS(g)-d,b.y-(b.buildRange+
lanePad+(b.spawnProt?140:0))*MathSIN(g)-c,users[m].x+(users[m].buildRange+lanePad+(users[m].spawnProt?140:0))*MathCOS(g)-d,users[m].y+(users[m].buildRange+lanePad+(users[m].spawnProt?140:0))*MathSIN(g)-c,mainContext)))}mainContext.strokeStyle=darkColor;mainContext.lineWidth=1.2*outlineWidth;for(e=0;e<units.length;++e)b=units[e],b.layer||(b.onScreen=!1,isOnScreen(b.x-d,b.y-c,b.size)&&(b.onScreen=!0,renderUnit(b.x-d,b.y-c,b.dir,b,playerColors[b.color],mainContext)));for(e=0;e<units.length;++e)b=units[e],
1==b.layer&&(b.onScreen=!1,isOnScreen(b.x-d,b.y-c,b.size)&&(b.onScreen=!0,renderUnit(b.x-d,b.y-c,b.dir,b,playerColors[b.color],mainContext)));mainContext.fillStyle=bulletColor;for(e=bullets.length-1;0<=e;--e){b=bullets[e];if(b.speed&&(b.x+=b.speed*a*MathCOS(b.dir),b.y+=b.speed*a*MathSIN(b.dir),UTILS.getDistance(b.sX,b.sY,b.x,b.y)>=b.range)){bullets.splice(e,1);continue}isOnScreen(b.x-d,b.y-c,b.size)&&renderCircle(b.x-d,b.y-c,b.size,mainContext)}mainContext.strokeStyle=darkColor;mainContext.lineWidth=
1.2*outlineWidth;for(e=0;e<users.length;++e)b=users[e],!b.dead&&isOnScreen(b.x-d,b.y-c,b.size)&&(renderPlayer(b,b.x-d,b.y-c,mainContext),"unknown"!=b.name&&(tmpIndx=b.name+"-"+b.size,20<=b.size&&b.nameSpriteIndx!=tmpIndx&&(b.nameSpriteIndx=tmpIndx,b.nameSprite=renderText(b.name,b.size/4)),b.nameSprite&&mainContext.drawImage(b.nameSprite,b.x-d-b.nameSprite.width/2,b.y-c-b.nameSprite.height/2,b.nameSprite.width,b.nameSprite.height)));if(selUnits.length)for(e=selUnits.length-1;0<=e;--e)selUnits[e]&&
0>units.indexOf(selUnits[e])&&disableSelUnit(e);activeUnit&&renderUnit(h,f,k,activeUnit,playerColors[player.color],mainContext);showSelector&&(mainContext.fillStyle="rgba(0, 0, 0, 0.1)",h=player.x-d+targetDst*MathCOS(targetDir)+camX,f=player.y-c+targetDst*MathSIN(targetDir)+camY,mainContext.fillRect(mouseStartX,mouseStartY,h-mouseStartX,f-mouseStartY));playerBorderRot+=a/5600;hoverUnit?toggleUnitInfo(hoverUnit):activeBase?toggleUnitInfo(activeBase,activeBase.sid==player.sid):activeUnit?toggleUnitInfo(activeUnit):
1==selUnits.length?toggleUnitInfo(selUnits[0].info,!0):toggleUnitInfo()}};

]]></>).toString();
document.getElementsByTagName('head')[0].appendChild(script);
