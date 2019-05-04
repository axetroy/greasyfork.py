// ==UserScript==
// @name         moomoo.io LITE MOD
// @version      1
// @description  Lightning fast MooMoo.io Mod
// @author       EuphoricPenguin
// @match        http://moomoo.io/*
// @match        https://moomoo.io/*
// @require      http://code.jquery.com/jquery-1.12.4.min.js
// @grant        GM_registerMenuCommand
// @connect      moomoo.io
// @icon         http://i.cubeupload.com/FtHUVM.jpg
// @namespace    https://greasyfork.org/users/136533
// ==/UserScript==

$('#youtuberOf').remove();
var commands = [{caption : 'MooMoo Hack Net Discord',execute : function () {go('https://discord.gg/pRBJ2C9');}}],
    moomooVer = $('#linksContainer2 .menuLink').html(),
    removeSelectors = ['#youtuberOf', '#linksContainer1', '#downloadButtonContainer', '#promoImgHolder', '#followText', '#adCard', '.menuHeader:nth-child(5)', '.menuHeader:nth-child(6)', '.menuText', '#___ytsubscribe_0', '#twitterFollow', '#guideCard', '#linksContainer2', '#partyButton', '#joinPartyButton'],
    head = document.head || document.getElementsByTagName('head')[0],
    css = '#rightCardHolder {display: block!important;}',
    style = document.createElement('style'),
    ws,
    myID,
    hasApple = true,
    f = 0,
    aV = [0,0],
    rZe = 0;

style.type = 'text/css';
if (style.styleSheet){
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}

for ( let i = 0; i < removeSelectors.length; i++ ) {
    $(removeSelectors[i]).remove();
}

head.appendChild(style);
$('#linksContainer2').html('<a href="./docs/versions.txt" target="_blank" class="menuLink">' + moomooVer + '</a>');

WebSocket.prototype.oldSend = WebSocket.prototype.send;
WebSocket.prototype.send = function(m){
    this.oldSend(m);
    console.log(m);
    if (!ws){
        ws = this;
        socketFound(this);
    }
};

function socketFound(socket){
    socket.addEventListener('message', function(message){
        handleMessage(message);
    });
}

function addCommands (cmd) {
    if (typeof GM_registerMenuCommand != 'undefined') {
        GM_registerMenuCommand(cmd.caption, cmd.execute);
    }
}
function registerCommands () {
    commands.forEach(function (cmd) {
        addCommands(cmd);
    });
}

function go(url) {
    var win = window.open(url, '_blank');
    if (win) {
        win.focus();
    }
}

function parseWSMsg(s){
    if (s.indexOf("42") === -1) return -1;
    var o = s.substring(s.indexOf("["));
    return JSON.parse(o);
}

function heal(){
    console.log("healing");
    if (hasApple){
        if (!haveApple()){
            heal();
            return;
        }
        else ws.send("42[\"5\",0,null]");
    }
    else ws.send("42[\"5\",1,null]");
    ws.send("42[\"4\",1,null]");
}

function isElementVisible(e) {
    return (e.offsetParent !== null);
}

function haveApple(){
    if (hasApple) hasApple = isElementVisible(document.getElementById("actionBarItem10"));
    return hasApple;
}

function handleMessage(m){
    var info = parseWSMsg(m.data);

    if (info[0] == "1" && !myID){
        console.log('GOT ID: ' + info[1]);
        myID =  info[1];
    }

    if (info[0] === "10" && info[1] === myID && info[2] !== 100){
        var random = Math.random() * (0.5 - 0.3) + 0.3 * 1000;
        setTimeout(function(){
            heal();
        }, random);
    }
}

function revertTitle(){
    f++;
    setTimeout(function(){
        f--;
        if (!f) {
            document.title = "Moo Moo";
        }
    }, 1500);
}
registerCommands();