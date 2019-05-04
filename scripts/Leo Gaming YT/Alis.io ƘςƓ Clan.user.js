// ==UserScript==
// @name         Alis.io ƘςƓ Clan
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Clan extension made for ƘςƓ Clan by ๖ۣۜLєσ
// @author       ๖ۣۜLєσ
// @match        *://agarlist.com/*
// @match        *://alis.io/*
// @match       http://d.alis.io/*
// @run-at      document-end
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @run-at       document-start
// @grant        none
// @grant       GM_getResourceText
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_getResourceURL
// @grant       GM_xmlhttpRequest
// ==/UserScript==

var audio = new Audio("http://158.69.227.214:8041/;");
//Audio Players
//trap(Personal Favorite)  http://158.69.227.214:8041/;
//trap  http://91.121.157.114:8421/stream?icy=http
//trap  http://listen.radionomy.com/It-saTrapRadio?icy=http
//Reggaeton  http://162.247.76.193:7000/stream?icy=http

$(function(){
    $('title').html('ƘςƓ Clan ~ Alis.io');
    $('head').append('<style type="text/css">#choose-radio{background-color:#FFFFFF;padding: 5px 10px;border-radius:15px;cursor:pointer;text-align: center;width:100%;color:#212121;height:30px;font-weight:bold;}#nickname_container{padding-top:10px;}#theming .form-group.label-static label.control-label, .form-group.label-floating.is-focused label.control-label, .form-group.label-floating:not(.is-empty) label.control-label{top:-20px;}#team_container{padding-top:10px;float:left;}#hide-info{vertical-align:middle;margin:0;}#hide-info-text{margin:0;vertical-align:middle;}#hide-info-form{padding-left:5px;}.arrow-left, .arrow-right{border-top: 20px solid transparent; border-bottom: 20px solid transparent;}.arrow-left{left: 34px; top: 55px;border-right: 20px solid #000;}.arrow-right{right: 34px; top: 55px;border-left: 20px solid #000;}.nav2{opacity: .3;}#preview-img, #preview-img-area{width: 150px; height: 150px;}input#volume {width:95%;margin-top:5px;margin-left:2%;-webkit-appearance: none !important;background:#FFFFFF;height:2px;margin-bottom:20px;}input#volume::-webkit-slider-thumb {-webkit-appearance: none !important;background:url(https://dimgg.000webhostapp.com/circleW.png) no-repeat;height:12px;width:12px;}</style><link rel="shortcut icon" href="https://i.imgur.com/a7QYxyI.png">');
    $('.card-signup>.content').append('<center style="padding-top:10px;"><script src="https://apis.google.com/js/platform.js"></script><div class="g-ytsubscribe" data-channelid="UC01uPhx0NdBFodv1TN_kL8w" data-layout="default" data-theme="dark" data-count="default"></div></center>');
    $('form>.card-nav-tabs>.content').append('<div id="extension-div"><img style="margin-left:-20px;"src="https://dimgg.000webhostapp.com/stop.png" width="100%" id="audio-player-stop"></img><img style="margin-left:-20px;"src="https://dimgg.000webhostapp.com/play.png" width="100%" id="audio-player-play"></img><input id="volume" type="range" min="0" max="100" value="50" /></div>');
    $('#audio-player-stop').hide();
    $('#audio-player-play').click(function(){$(this).hide();$('#audio-player-stop').show();audio.play();});
    $('#audio-player-stop').click(function(){$(this).hide();$('#audio-player-play').show();audio.pause();});
    $('#volume').change(function(){audio.volume = parseFloat(this.value / 100);});
    $('a[href=#theming]').click(function(){$('#extension-div').hide();});
    $('a[href=#settings]').click(function(){$('#extension-div').hide();});
    $('a[href=#home]').click(function(){$('#extension-div').delay(150).fadeIn(250);});
    $('.skin').parent().attr('class', 'col-sm-12');
    $('#team_name').val('kcg');
    $('#team_container').parent().attr('class', 'col-sm-12');
    $('#nickname_container>.control-label').css('padding-left','15px');
    $('#nickname_container').addClass('col-sm-9').css('float','right');
    $('body').on('keydown keyup',function(e){
        var color = e.type=="keydown";
        if(e.which==192){
            respawn();
        }
    });
});
setInterval(function(){
    $('img[src="/assets/img/adblocker.png"]').remove();
    $('#ad_bottom').remove();
    $('.content>.text-center>.tab-pane>div#ad_main').remove();
}, 500);

// define levels of hackery
var playerSettings = {
    "normal": {
        "speed": 1,
        "maxCells": 32,
        "maxSize": 1500,
        "isToxic": 0,
        "ignoreBorders": 0,
        "decayRate": 0.002,
        "staticDecay": 0,
    },
    "slow": {
        "speed": 0.00001,
        "recombineTime": 0,
        "maxCells": 1,
        "maxSize": 1700,
        "decayRate": -0.0001,
        "staticDecay": 1,
        "isToxic": 0,
        "ignoreBorders": 1,
        "viewBaseX": 10000,
        "viewBaseY": 10000,
        "startMass": 4000,
    },
    "fast": {
        "speed": 10,
        "recombineTime": 0,
        "maxCells": 1,
        "maxSize": 7000,
        "decayRate": -0.02,
        "staticDecay": 1,
        "isToxic": 1,
        "ignoreBorders": 1,
        "viewBaseX": 10000,
        "viewBaseY": 10000,
        "startMass": 30000,
    }
};

/* Complete list of available per-player detail settings:
# grep -roP "playerDetails\..+(\s+)" . | cut -d ' ' -f 1 | grep -oP playerDetails.+ | tr -d ');,' | sort | uniq
playerDetails.decayModifier - internal game mode use, changes do nothing
playerDetails.decayRate - only used if staticDecay is 1. values from 0.9 (extremely fast decay) to -1 (extremely fast growth)
playerDetails.dynamicDecay - internal game use, changes do nothing
playerDetails.hasToxicWall - razors gayest invention yet
playerDetails.ignoreBorders - can go outside map borders
playerDetails.isAdmin - enables/disables the use of hacks
playerDetails.isToxic - makes players toxic feed shrink eaters
playerDetails.isTroll - only used pre-connect to determine trollability of player
playerDetails.maxCells - number of cells player can be split into
playerDetails.maxSize - max size in RADIUS of cell, not mass
playerDetails.nameColor - array of RGB colors, can not be altered in game
playerDetails.nameColor.b - blue
playerDetails.nameColor.g - green
playerDetails.nameColor.r - red
playerDetails.recombineTime - how quickly can this player recombine, 30 is slow, 0 is instant
playerDetails.scoreDivisor - internal only, changes do nothing.
ejectSize, ejectSizeLoss, ejectDistance all pretty self explanatory
playerDetails.speed - how fast is the player, 1 for normal, 10 for very fast
playerDetails.startMass - starting size in cell mass
playerDetails.startSize - starting size in cell radius
playerDetails.staticDecay - off by default, uses dynamic decay formula based on total server mass. 1 for enabled a constant decay rate
playerDetails.sub - SUBJECT of json web token, used to identify their account across games
playerDetails.totalScore - internal to track last total score of the player
playerDetails.validFrom - internal only used during connection and token vlidation
playerDetails.viewBaseX - 1920 default, 10000 for massive view
playerDetails.viewBaseY - 1080 default, 10000 for massive view
You can do /set playerID settingName newValue to alter an individual players value above
Or you can do /playerDetails playerID to see their current values for all of these in console
*/
/* List of server-wide changes:
Coming soon...
*/
// Counter to roll through levels of hackery (index = nextHack modulous hackCount)
var nextHack = 1;

// Mass toggle values
var massToggle = [2000,18000];
var nextMass = 1;

// Add the dom elements we want to display information in
$(function() {
    // Fix the max length for the skin url box
    $("#skinurl").attr('maxlength','600');
    // Add the hack div to the overlay2 div
    $('#overlays2').append('<div id="hackdiv" style="position: absolute; top: 40px; left: 19px; color: #fff;"></div>');
    // add player id, target id, status, and hotkeys to the hack div
    $('#hackdiv').append('Your Player ID: <span style="font-weight: bold;" id="yourplayerid"></span><br>');
    $('#hackdiv').append('Hack Target ID: <span style="font-weight: bold;" id="targetplayerid"></span><br>');
    $('#hackdiv').append('Status: <span style="font-weight: bold;" id="hackstatus"></span><br>');
    $('#hackdiv').append('<div id="hackkeys" style="font-size: 12px; line-height: 15px;"></div>');
    // add the hackkeys list to the hackkeys div
    $('#hackkeys').append('<b>Hotkeys:</b><ul id="hackkeylist" style="list-style: none; padding-left: 15px;"></ul>');
    // add each of the hotkeys to the hackkey list
    $('#hackkeylist').append('<li><b>LEFT CLICK</b> to target player</li>');
    //$('#hackkeylist').append('<li><b>MIDDLE CLICK</b> to target ALL OTHER players</li>');
    $('#hackkeylist').append('<li><b>1</b> toggle hacks low/medium/ghauf<br>');
    $('#hackkeylist').append('<li><b>2</b> teleport target(s) to mouse<br>');
    $('#hackkeylist').append('<li><b>3</b> toggle target(s) mass big/small<br>');
    $('#hackkeylist').append('<li><b>4</b> spawn virus at mouse<br>');
    $('#hackkeylist').append('<li><b>5</b> kill target(s)<br>');
    $('#hackkeylist').append('<li><b>/</b> send chat & commands</li>');
// make greeb sad
    $("iframe").remove();
    $("video").remove();
    $("#ad_main").remove();
});

// Wrapper to send commands
function sendHack(command) {
    //console.log('SENDING: ' + command);
    unsafeWindow.sendChat(command);
}

// Wrapper to send commands targeting to player(s)
function sendTargetHack(command, targets, params) {
    // If params is an array, join it with spaces
    if (Array.isArray(params)) {
        params = params.join(' ');
    }
    // if the targets are an array, send it to multiple targets
    if (Array.isArray(targets)) {
        for(var target in targets) {
            sendHack('/' + command + ' ' + targets[target] + ' ' + params);
        }
    } else {
        sendHack('/' + command + ' ' + targets + ' ' + params);
    }
}
unsafeWindow.sendHack = function (command, params) { sendTargetHack(command, JSON.parse($('#targetplayerid').html()), params); };

// helper for console fuckery
unsafeWindow.setAll = function(key, value) {
    // Get the json targets on our target player id list
    var targets = JSON.parse($('#targetplayerid').html());
    sendTargetHack('set', targets, [ key, value ]);
};

// Update our player ID every few seconds
var updateMyID = setInterval(function(){
    sendHack('/getmyid');
}, 10 * 1000);

// Keypress handler
function keydown(event) {
    //console.log(event); // for debugging
    // Do not process keypress events NOT on the body element itself
    if(event.target.nodeName != "BODY") {
       return;
    }
    var command = '';

    // if we dont know our player id, request it
    if (!$('#yourplayerid').html()) {
        sendHack('/getmyid');
    }

    // This is ` or ~ key
    if (event.keyCode == 192) {
        $('#hackstatus').html('Set target = self');
        $('#targetplayerid').html(JSON.stringify($('#yourplayerid').html()));
    }

    // if the target ID is not defined, no commands will work
    if (!$('#targetplayerid').html()) {
        $('#hackstatus').html('target not set');
        return;
    }

    // Get the json targets on our target player id list
    var targets = JSON.parse($('#targetplayerid').html());
    /*
    // IF the targets list is an array of players, make sure our id is not in the target list
    if (Array.isArray(targets)) {
        var myID = parseInt($('#yourplayerid').html());
        var myIndex = targets.indexOf(myID);
        if (myIndex) {
            targets.splice( myIndex, 1 );
        }
    }*/
    // This is 1 key, toggle between hacks
    if (event.keyCode == 49) {
        // calculate index of hacks to apply
        var hackIndex = nextHack % Object.keys(playerSettings).length;
        var hackKey = Object.keys(playerSettings)[hackIndex];
        var settings = playerSettings[hackKey];
        // apply hacks
        for (var k in settings) {
            sendTargetHack('set', targets, [ k, settings[k] ]);
        }
        // set next hack to the next index
        nextHack++;
        $('#hackstatus').html('set target hacks to: ' + hackKey);
    }

    // 2 key, teleport to mouse location
    if (event.keyCode == 50) {
        sendTargetHack('teleport', targets, [ mouseX, mouseY ]);
        $('#hackstatus').html('teleported target');
    }

    // 3 key, toggle mass hack 2k/18k
    if (event.keyCode == 51) {
        var massKey = nextMass % massToggle.length;
        sendTargetHack('mass', targets ,massToggle[massKey]);
        $('#hackstatus').html('mass set to ' + massToggle[massKey]);
        nextMass++;
    }

    // 4 key, spawns virus cluster at mouse location
    if (event.keyCode == 52) {
        var sizes = [100, 200, 300, 500, 700, 900, 1000, 1300, 1600, 1900, 2200, 2500, 2800, 3000, 3100];
        sizes.forEach(function(size) {
            command = "/virus " + mouseX + " " + mouseY + " " + size;
            sendHack(command);
        });
        $('#hackstatus').html('spawned virus cluster');
    }

    // 5 key, kill target(s)
    if (event.keyCode == 53) {
        sendTargetHack('kill', targets, '');
        $('#hackstatus').html('killed target player(s)');
        nextMass++;
    }
}

// Get target cell ID
function getClosestCellID(X, Y) {
    $('#hackstatus').html('searching for cell id near mouse ' + X + ',' + Y);
    var cells = unsafeWindow.allCells;

    // Loop through all the cells and extract JUST the players
    var playerCells = [];
    for (var i in cells) {
        var playerCell = cells[i];
        // Ignore food pellets & tiny cells
        if (playerCell.isFood || playerCell.size < 35) {
            continue;
        }
        // F is old agarplus obfuscated isVirus flag
        if (playerCell.f || playerCell.isVirus) {
            continue;
        }
        // Calculate the x and y distances
        var distx = playerCell.x - X;
        var disty = playerCell.y - Y;
        // calculates distance between two X,Y points
        var distance = Math.sqrt( Math.pow(distx, 2) + Math.pow(disty, 2) );
        // save our player cell info
        var razorCell = {};
        razorCell.id = i;
        razorCell.name = playerCell.name;
        razorCell.distance = distance;
        razorCell.size = playerCell.size;
        razorCell.x = playerCell.x;
        razorCell.y = playerCell.y;
        playerCells.push(razorCell);
    }
    // Sort the cells by distance ascending
    playerCells.sort(function (a, b) { return a.distance - b.distance; });
    //console.log('closest player identified: ');
    //console.table(playerCells.slice(0, 1));
    if (playerCells.length) {
        return playerCells[0].id;
    } else {
        return 0;
    }
}

// left Mouse click handler
function leftMouseClick()
{
    var cellid = getClosestCellID(mouseX, mouseY);
    if (cellid) {
        $('#hackstatus').html('requested player id of cell ' + cellid);
        var cell = unsafeWindow.allCells[cellid];
        if(cell.extra && cell.extra.pid) {
            $('#targetplayerid').html(JSON.stringify(cell.extra.pid));
            $('#hackstatus').html('target player switched to ' + $('#targetplayerid').html());
        } else {
            $('#hackstatus').html('unable to get player id of cell ' + cellid);
        }
    }else{
        $('#hackstatus').html('could not get closest cell id');
    }
}
// middle Mouse click handler
function middleMouseClick()
{
    $('#hackstatus').html('setting target to all CELL IDs');
    // make sure to update the player list when doing this
    playerlist = [];
    command = "/playerlist";
    sendHack(command);
    setTimeout(function() {
        var playerIDs = [];
        for (var key in playerlist) {
            // Skip adding OURSELVES to the middle mouse click list
            if(playerlist[key].id == $('#yourplayerid').html()) {
                continue;
            }
            playerIDs.push(playerlist[key].id);
        }
        if (playerIDs.length) {
            $('#targetplayerid').html(JSON.stringify(playerIDs));
        } else {
            $('#hackstatus').html('Error updating player IDs');
        }
    }, 600);
}

// Add the event listener for key press events
$("body").keydown(keydown);
//window.addEventListener('keyup', keyup);
$("#overlays2").on('mousedown', function(event) {
    //console.log("mouse click event on overlays2 " + event.which);
    //console.log(event);
    if( event.which == 1 ) {
        //event.preventDefault();
        leftMouseClick();
    }
    if( event.which == 2 ) {
        event.preventDefault();
        //middleMouseClick();
    }
});

// global vars to keep stuff in for reference
playerlist = [];
commandlist = [];
playerdetails = [];

// handle server responses to our queries
onMultiChat = function(user, message) {
    if(user == 'SERVER' && message[0] == '/') {
        // remove the leading / and split command at the ": " response
        var split = message.slice(1, message.length).split(': ');
        var command = split[0];
        // remove the command we saved and recombine the array for parsing
        split.splice(0,1);
        var response = split.join().trim();
        // we got an OK response from a command
        if(command == 'ok') { return; }
        // We got our ID back from the server
        if(command == 'playerid') {
            $('#yourplayerid').html(response);
            return;
        }
        // List of supported commands
        if(command == 'commands') {
            commandlist = JSON.parse(response);
            console.log(commandlist);
            return;
        }
        // We got a list of all players from the server
        if(command == 'playerlist') {
            playerlist = JSON.parse(response);
            console.table(playerlist);
            return;
        }
        // We got the servers current configuration
        if(command == 'config') {
            config = JSON.parse(response);
            console.log(config);
            return;
        }
        // We got playerDetails for a client
        if(command == 'playerdetails') {
            playerdetails = JSON.parse(response);
            console.log(playerdetails);
            return;
        }
        console.log('UNHANDLED COMMAND: ' + command);
        console.log(response);
    }
};
