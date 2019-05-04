// ==UserScript==
// @name         Bloble.io Extreme Mod
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Zoom, Base Builder, InstaFind
// @author       TigerYT
// @match        http://bloble.io/*
// @grant        none
// ==/UserScript==

//BaseBuilder

window.UIList = window.UIList || [];
window.initFuncs = window.initFuncs || [];
window.statusItems = window.statusItems || [];


window.UIList.push({
    level: 0,
    x: 0,
    html: '<div onclick=buildGenerators()>Build Generators</div>'
}, {
    level: 0,
    x: 1,
    html: '<div onclick=walls()>Build Walls</div>'
}, {
    level: 0,
    x: 2,
    html: '<div onclick=buildHouses()>Build Offense</div>'
}, {
    level: 0,
    x: 4,
    html: '<div onclick=buildHybrid()>Build Hybrid</div>'
}, {
    level: 1,
    x: 0,
    html: '<div onclick=boulders()>Upgrade Boulders</div>'
}, {
    level: 1,
    x: 1,
    html: '<div onclick=spikes()>Upgrade Spikes</div>'
}, {
    level: 1,
    x: 2,
    html: '<div onclick=microGenerators()>Mico-Generators</div>'
}, {
    level: 1,
    x: 3,
    html: '<div onclick=powerPlants()>Upgrade Power Plants</div>'
}, {
    level: 2,
    x: 0,
    html: '<div onclick=sellGenerators()>Sell Generators</div>'
}, {
    level: 2,
    x: 1,
    html: '<div onclick=sellall()>Sell all</div>'
});

function emit2() {
    socket.emit.apply(socket, arguments);
}
window.walls = function () {
    for (i = -3.14; i < 3.14; i += .108) emit2("1", i, 1e3, 1)
}
window.sellGenerators = window.sellGenerators || function () {
    for (var a = [], d = 0; d < units.length; ++d) {
        if (units[d].type === 0 && units[d].owner == player.sid) {
            var name = getUnitFromPath(units[d].uPath).name;
            (name === 'Generator' || name === 'Power Plant') && a.push(units[d].id)
        }
    }
    socket.emit("3", a)
}
window.sellhouses = function () {
    for (var a = [], d = 0; d < units.length; ++d) units[d].type === 0 && units[d].owner == player.sid && getUnitFromPath(units[d].uPath).name === 'House' && a.push(units[d].id);
    socket.emit("3", a)
}
window.sellwalls = function () {
    for (var a = [], d = 0; d < units.length; ++d) units[d].type === 3 && units[d].owner == player.sid && getUnitFromPath(units[d].uPath).name === 'Wall' && a.push(units[d].id);
    socket.emit("3", a)
}
window.sellinner = function () {
    for (var a = [], d = 0; d < units.length; ++d) {
        if (units[d].type === 0 && units[d].owner == player.sid) {
            a.push(units[d].id)
        }
    }
    socket.emit("3", a)
}
window.sellall = function () {
    for (var a = [], d = 0; d < units.length; ++d)(units[d].type === 3 || units[d].type === 2 || units[d].type === 0) && units[d].owner == player.sid && a.push(units[d].id);
    socket.emit("3", a)
}
window.boulders = window.boulders || function () {
    for (var i = 0; i < units.length; ++i) 3 == units[i].type && "circle" == units[i].shape && units[i].owner == player.sid && socket.emit("4", units[i].id, 0)
}
window.microGenerators = window.microGenerators || function () {
    for (var i = 0; i < units.length; ++i) 3 == units[i].type && "circle" == units[i].shape && units[i].owner == player.sid && socket.emit("4", units[i].id, 1)
}
window.spikes = window.spikes || function () {
    for (var i = 0; i < units.length; ++i) 3 == units[i].type && "hexagon" == units[i].shape && units[i].owner == player.sid && socket.emit("4", units[i].id, 0)
}
window.powerPlants = window.powerPlants || function () {
    for (var i = 0; i < units.length; ++i) 0 == units[i].type && "hexagon" == units[i].shape && units[i].owner == player.sid && socket.emit("4", units[i].id, 0)
}
window.rapid = window.rapid || function () {
    for (var i = 0; i < units.length; ++i) 0 == units[i].type && 1 == units[i].turretIndex && "circle" == units[i].shape && units[i].owner == player.sid && socket.emit("4", units[i].id, 0)
}
window.ranged = window.ranged || function () {
    for (var i = 0; i < units.length; ++i) 0 == units[i].type && 1 == units[i].turretIndex && "circle" == units[i].shape && units[i].owner == player.sid && socket.emit("4", units[i].id, 1)
}
window.antiTank = window.antiTank || function () {
    for (var i = 0; i < units.length; ++i) 0 == units[i].type && 4 == units[i].turretIndex && "circle" == units[i].shape && units[i].owner == player.sid && socket.emit("4", units[i].id, 1)
}
window.semiAuto = window.semiAuto || function () {
    for (var i = 0; i < units.length; ++i) 0 == units[i].type && 4 == units[i].turretIndex && "circle" == units[i].shape && units[i].owner == player.sid && socket.emit("4", units[i].id, 0)
}
window.gatlins = window.gatlins || function () {
    for (var i = 0; i < units.length; ++i) 0 == units[i].type && 2 == units[i].turretIndex && "circle" == units[i].shape && units[i].owner == player.sid && socket.emit("4", units[i].id, 0)
}
window.spotter = window.spotter || function () {
    for (var i = 0; i < units.length; ++i) 0 == units[i].type && 3 == units[i].turretIndex && "circle" == units[i].shape && units[i].owner == player.sid && socket.emit("4", units[i].id, 0)
};
window.build = function (instr) {
    instr.forEach((ins) => {
        emit2.apply({}, ins);
    })
}
window.buildHybrid = function () {
    window.build([["1", 3.13, 243.85, 5], ["1", 2.87, 246.85, 2], ["1", 2.62, 243.85, 5], ["1", 2.37, 246.85, 2], ["1", 2.11, 243.85, 5], ["1", 1.86, 246.85, 2], ["1", 1.6, 243.85, 5], ["1", 1.34, 246.85, 2], ["1", 1.08, 243.85, 5], ["1", 0.82, 246.85, 2], ["1", 0.56, 243.85, 5], ["1", 0.3, 246.85, 2], ["1", 0.04, 243.85, 5], ["1", -0.21, 246.85, 2], ["1", -0.46, 243.85, 5], ["1", -0.72, 246.85, 2], ["1", -0.98, 243.85, 5], ["1", -1.23, 246.85, 2], ["1", -1.49, 243.85, 5], ["1", -1.74, 246.85, 2], ["1", -1.99, 243.85, 5], ["1", -2.25, 246.85, 2], ["1", -2.51, 243.85, 5], ["1", -2.77, 246.85, 2], ["1", 2.77, 190.49, 2], ["1", 2.43, 187.99, 2], ["1", 1.96, 188.53, 2], ["1", 2.76, 130, 4], ["1", 2.28, 130, 4], ["1", 1.79, 130, 4], ["1", 1.28, 130, 4], ["1", 0.79, 130, 4], ["1", 0.28, 130, 4], ["1", -0.19, 130, 4], ["1", -0.67, 130, 4], ["1", -1.17, 130, 4], ["1", -1.64, 130, 4], ["1", -2.13, 130, 4], ["1", -2.61, 130, 4], ["1", -3.06, 138.27, 4], ["1", -2.94, 195.69, 2], ["1", -2.4, 183.33, 2], ["1", -1.91, 180.8, 2], ["1", -1.41, 182.01, 2], ["1", -0.94, 182.52, 2], ["1", -0.45, 180.37, 2], ["1", 0.04, 178.74, 2], ["1", 0.53, 177.22, 2], ["1", 1.03, 181.72, 2], ["1", 1.49, 184.1, 2]]);
}
window.buildHouses = function () {
    window.build([["1", -0.09, 245.4, 1], ["1", 0.16, 243.15, 1], ["1", 0.41, 243.84, 1], ["1", 0.67, 244.57, 1], ["1", 0.04, 183.15, 5], ["1", 0.39, 184.96, 2], ["1", 0.72, 184.99, 4], ["1", 0.92, 245.85, 4], ["1", -0.34, 245.85, 4], ["1", -0.34, 140, 7], ["1", -0.6, 245.85, 4], ["1", 0.25, 130, 4], ["1", -0.88, 130, 4], ["1", -1.37, 130, 4], ["1", -1.86, 130, 4], ["1", -2.36, 130, 4], ["1", -2.88, 130, 4], ["1", 2.85, 130, 4], ["1", 2.36, 130, 4], ["1", 1.85, 130, 4], ["1", 1.38, 130, 4], ["1", 0.9, 130, 4], ["1", 1.19, 245.85, 4], ["1", 1.46, 245.85, 4], ["1", 1.73, 245.85, 4], ["1", 2, 245.85, 4], ["1", 2.26, 245.85, 4], ["1", 2.52, 245.85, 4], ["1", 2.78, 245.85, 4], ["1", 3.04, 245.85, 4], ["1", -2.99, 245.85, 4], ["1", -2.74, 245.85, 4], ["1", -2.49, 245.85, 4], ["1", -2.24, 245.85, 4], ["1", -1.99, 245.85, 4], ["1", -1.74, 245.85, 4], ["1", -1.48, 245.85, 4], ["1", -1.23, 245.85, 4], ["1", -0.94, 245.85, 4], ["1", -0.72, 187.11, 4], ["1", -1.06, 186.05, 4], ["1", -1.53, 186.15, 4], ["1", -1.87, 191.23, 4], ["1", -2.21, 185.53, 4], ["1", -2.55, 184.19, 4], ["1", 1.07, 186.28, 4], ["1", 1.61, 184.13, 4], ["1", 2.07, 185.66, 4], ["1", 2.39, 192.03, 4], ["1", 2.71, 186.8, 4], ["1", 3.06, 185.93, 4]])
    //     window.build([["1", 0.24, 245.85, 4], ["1", 0.49, 245.85, 4], ["1", 0.74, 245.85, 4], ["1", -0.01, 245.85, 4], ["1", -0.26, 245.85, 4], ["1", -0.51, 245.85, 4], ["1", 1, 245.85, 4], ["1", 1.25, 245.85, 4], ["1", 1.5, 245.85, 4], ["1", 1.75, 245.85, 4], ["1", 2, 245.85, 4], ["1", 2.25, 245.85, 4], ["1", 2.5, 245.85, 4], ["1", 2.75, 245.85, 4], ["1", 3.01, 245.85, 4], ["1", -3.03, 245.85, 4], ["1", -3.01, 245.85, 4], ["1", -2.75, 245.85, 4], ["1", -2.49, 245.85, 4], ["1", -2.24, 245.85, 4], ["1", -1.98, 245.85, 4], ["1", -1.72, 245.85, 4], ["1", -1.46, 245.85, 4], ["1", -1.21, 245.85, 4], ["1", -0.96, 245.85, 4], ["1", -0.72, 203.14, 4], ["1", -0.39, 190.85, 4], ["1", -0.59, 130, 4], ["1", -0.05, 185.69, 4], ["1", 0.11, 130, 4], ["1", 0.31, 185.08, 5], ["1", 0.66, 187.02, 4], ["1", 1.02, 184.03, 4], ["1", 0.84, 130, 4], ["1", 1.36, 189.19, 4], ["1", 1.7, 186.55, 4], ["1", 1.44, 130, 4], ["1", 2.05, 186.48, 4], ["1", 1.92, 130, 4], ["1", 1.91, 130, 4], ["1", 2.38, 191.67, 4], ["1", 2.38, 130, 4], ["1", 2.71, 185.92, 4], ["1", 3.05, 185.84, 4], ["1", 2.87, 130, 4], ["1", -2.9, 188.9, 4], ["1", -2.57, 187.48, 4], ["1", -2.74, 130, 4], ["1", -2.24, 185.43, 4], ["1", -1.91, 186.44, 4], ["1", -2.07, 130, 4], ["1", -1.57, 190.81, 4], ["1", -1.58, 186.32, 4], ["1", -1.42, 130, 4], ["1", -1.24, 186.06, 4]]);
}
window.buildGenerators = function () {
    var arr = [["1", 3.11, 243.85, 3], ["1", -2.9, 243.85, 3], ["1", -2.63, 243.85, 3], ["1", -2.36, 243.85, 3], ["1", -2.06, 243.85, 3], ["1", -1.77, 243.85, 3], ["1", -1.5, 243.85, 3], ["1", -1.22, 243.85, 3], ["1", -0.94, 243.85, 3], ["1", -0.64, 243.85, 3], ["1", -0.36, 243.85, 3], ["1", -0.07, 243.85, 3], ["1", 0.2, 243.85, 3], ["1", 0.47, 243.85, 3], ["1", 0.76, 243.85, 3], ["1", 1.05, 243.85, 3], ["1", 1.35, 243.85, 3], ["1", 1.64, 243.85, 3], ["1", 1.92, 243.85, 3], ["1", 2.22, 243.85, 3], ["1", 2.49, 243.85, 3], ["1", 2.78, 243.85, 3], ["1", 3, 183.39, 3], ["1", -2.91, 178.82, 3], ["1", -2.5, 182.85, 3], ["1", -2.11, 178.92, 3], ["1", -1.72, 176.82, 3], ["1", -1.35, 177.59, 3], ["1", -0.98, 174.52, 3], ["1", -0.57, 179.76, 3], ["1", -0.19, 183.42, 3], ["1", 0.21, 176.37, 3], ["1", 0.63, 179.87, 3], ["1", 1.03, 175.57, 3], ["1", 1.43, 176.6, 3], ["1", 1.8, 181.19, 3], ["1", 2.19, 177.95, 3], ["1", 2.6, 178.66, 3]]
    window.build(arr);
}
window.makeUI = function () {
    if (window.hasMadeUI) return;
    window.hasMadeUI = true;
    window.statusItems.sort(function (a, b) {
        return a.order - b.order;
    })
    var levels = [];
    window.UIList.forEach((item) => {
        if (!levels[item.level]) levels[item.level] = [];
        levels[item.level].push(item)
    })

    levels = levels.filter((a) => {
        if (a) {
            a.sort(function (a, b) {
                return a.x - b.x;
            })
            return true;
        } else {
            return false;
        }
    })

    var headAppend = document.getElementsByTagName("head")[0],
        style = document.createElement("div");

    var toast = document.createElement('div');
    toast.id = "snackbar";
    var css = document.createElement('div');

    css.innerHTML = '<style>\n\
#snackbar {\n\
    visibility: hidden;\n\
    min-width: 250px;\n\
    margin-left: -125px;\n\
    background-color: rgba(40, 40, 40, 0.5);\n\
    color: #fff;\n\
    text-align: center;\n\
    border-radius: 4px;\n\
    padding: 10px;\n\
    font-family: "regularF";\n\
    font-size: 20px;\n\
    position: fixed;\n\
    z-index: 100;\n\
    left: 50%;\n\
    top: 30px;\n\
}\n\
#snackbar.show {\n\
    visibility: visible;\n\
    -webkit-animation: fadein 0.5s;\n\
    animation: fadein 0.5s;\n\
}\n\
#snackbar.hide {\n\
    visibility: visible;\n\
    -webkit-animation: fadeout 0.5s;\n\
    animation: fadeout 0.5s;\n\
}\n\
@-webkit-keyframes fadein {\n\
    from {top: 0; opacity: 0;}\n\
    to {top: 30px; opacity: 1;}\n\
}\n\
@keyframes fadein {\n\
    from {top: 0; opacity: 0;}\n\
    to {top: 30px; opacity: 1;}\n\
}\n\
@-webkit-keyframes fadeout {\n\
    from {top: 30px; opacity: 1;}\n\
    to {top: 0; opacity: 0;}\n\
}\n\
@keyframes fadeout {\n\
    from {top: 30px; opacity: 1;}\n\
    to {top: 0; opacity: 0;}\n\
}\n\
</style>'
    var height = levels.length * (14 + 19) + (levels.length - 1) * 7 + 15;
    style.innerHTML = "<style>\n\
#noobscriptUI, #noobscriptUI > div > div {\n\
    background-color:rgba(40,40,40,.5);\n\
    margin-left: 3px;\n\
    border-radius:4px;\n\
    pointer-events:all\n\
}\n\
#noobscriptUI {\n\
    top: -" + (height + 12) + "px;\n\
    transition: 1s;\n\
    margin-left:10px;\n\
    position:absolute;\n\
    padding-left:24px;\n\
    margin-top:9px;\n\
    padding-top:15px;\n\
    width:580px;\n\
    height: " + height + "px;\n\
    font-family:arial;\n\
    left:25%\n\
}\n\
#noobscriptUI:hover{\n\
    top:0px\n\
}\n\
#noobscriptUI > div > div {\n\
    color:#fff;\n\
    padding:7px;\n\
    height:19px;\n\
    display:inline-block;\n\
    cursor:pointer;\n\
    font-size:15px\n\
}\n\
</style>"

    headAppend.appendChild(style);
    headAppend.appendChild(css);


    var contAppend = document.getElementById("gameUiContainer"),
        menuA = document.createElement("div");

    var code = ['<div id="noobscriptUI">\n'];

    levels.forEach((items, i) => {
        code.push(i === 0 ? '    <div>\n' : '    <div style="margin-top:7px;">\n');
        items.forEach((el) => {
            code.push('        ' + el.html + '\n');
        })
        code.push('    </div>\n');
    })
    code.push('    <div id="confinfo" style="margin-top:4px; color: white; text-align: center; font-size: 10px; white-space:pre"></div>')
    code.push('</div>');

    menuA.innerHTML = code.join("");
    contAppend.insertBefore(menuA, contAppend.firstChild)
    contAppend.appendChild(toast)
    var toastTimeout = false;
    window.showToast = function (msg) {
        toast.textContent = msg;

        if (toastTimeout) clearTimeout(toastTimeout);
        else toast.className = "show";
        toastTimeout = setTimeout(function () {
            toast.className = 'hide'
            setTimeout(function () {
                toast.className = '';
            }, 400);
            toastTimeout = false;
        }, 3000);
    }
    window.statusBar = function () {
        var el = document.getElementById('confinfo');
        var text = [];

        window.statusItems.forEach((item, i) => {
            if (i !== 0) text.push('     ');
            if (item.name) text.push(item.name + ': ');
            text.push(item.value());
        })

        el.textContent = text.join('');
    }
    window.statusBar();

    window.initFuncs.forEach((func) => {
        func();
    })
}
setTimeout(() => {
    window.makeUI();
}, 1000)

//InstaFind

var gotoUsers = [];
var gotoIndex = 0;
window.overrideSocketEvents = window.overrideSocketEvents || [];
window.chatCommands = window.chatCommands || {};

window.chatCommands.find = function(split) {
    var name = split.slice(1).join(' ');
    if (name == '') {
        addChat('Please specify a username', 'Client')
        return;
    }
    window.goto(name)
}
window.overrideSocketEvents.push({
    name: "l",
    description: "Leaderboard Insta Find override",
    func: function(a) {
        var d = "",
            c = 1,
            b = 0;
        for (; b < a.length;) {
            d += "<div class='leaderboardItem' onclick=goto2(" + a[b] + ");><div style='display:inline-block;float:left;' class='whiteText'>" + c + ".</div> <div class='" + (player && a[b] == player.sid ? "leaderYou" : "leader") + "'>" + a[b + 1] + "</div><div class='scoreText'>" + a[b + 2] + "</div></div>", c++, b += 3;
        }
        leaderboardList.innerHTML = d;
    }
})
leaderboardList.style.pointerEvents = 'auto';
chatListWrapper.style.pointerEvents = 'auto';

window.goto = function(username) {
    gotoUsers = users.filter((user) => {
        return user.name === username
    });
    gotoIndex = 0;
    if (gotoUsers[0]) {
        camX = gotoUsers[0].x - player.x;
        camY = gotoUsers[0].y - player.y;
    }
    addChat(gotoUsers.length + ' users found with the name ' + username, 'Client');
    return gotoUsers.length;
}
window.goto2 = function(id, go) {
    gotoUsers = users.filter((user) => {
        return user.sid === id;
    });
    gotoIndex = 0;
    if (!go && gotoUsers[0]) {
        camX = gotoUsers[0].x - player.x;
        camY = gotoUsers[0].y - player.y;
    }
    return gotoUsers.length;
}

window.gotoLeft = function() {
    if (!gotoUsers.length) return;

    if (camX == gotoUsers[gotoIndex].x - player.x && camY == gotoUsers[gotoIndex].y - player.y) {
        if (gotoIndex <= 0) gotoIndex = gotoUsers.length;
        gotoIndex--;
    }
    camX = gotoUsers[gotoIndex].x - player.x;
    camY = gotoUsers[gotoIndex].y - player.y;
}

window.gotoRight = function() {
    if (!gotoUsers.length) return;

    if (camX == gotoUsers[gotoIndex].x - player.x && camY == gotoUsers[gotoIndex].y - player.y) {
        if (gotoIndex >= gotoUsers.length - 1) gotoIndex = -1;
        gotoIndex++;
    }
    camX = gotoUsers[gotoIndex].x - player.x;
    camY = gotoUsers[gotoIndex].y - player.y;
}

window.addChat = function(msg, from, color) {
    color = color || "#fff";
    var b = document.createElement("li");
    b.className = "chatother";
    b.innerHTML = '<span style="color:' + color + '">[' + from + ']</span> <span class="chatText">' + msg + "</span>";
    10 < chatList.childNodes.length && chatList.removeChild(chatList.childNodes[0]);
    chatList.appendChild(b)
}

window.resetCamera = function() { // Override
    camX = camXS = camY = camYS = 0;
    cameraKeys = {
        l: 0,
        r: 0,
        u: 0,
        d: 0
    }

    if (socket && window.overrideSocketEvents && window.overrideSocketEvents.length) {
        window.overrideSocketEvents.forEach((item) => {
            socket.removeAllListeners(item.name)
            socket.on(item.name, item.func);

        });

    }
}

window.addChatLine = function(a, d, c) {
    if (player) {
        var b = getUserBySID(a);
        if (c || 0 <= b) {
            var g = c ? "SERVER" : users[b].name;
            c = c ? "#fff" : playerColors[users[b].color] ? playerColors[users[b].color] : playerColors[0];
            player.sid == a && (c = "#fff");
            b = document.createElement("li");
            b.className = player.sid == a ? "chatme" : "chatother";

            b.innerHTML = '<span style="color:' + c + '" onclick=goto2(' + a + ');>[' + g + ']</span> <span class="chatText">' + d + "</span>";
            10 < chatList.childNodes.length && chatList.removeChild(chatList.childNodes[0]);
            chatList.appendChild(b)
        }
    }
}

window.addEventListener("keyup", function(a) {
    a = a.keyCode ? a.keyCode : a.which;
    if (a === 190) {
        window.gotoRight()
    } else if (a === 188) {
        window.gotoLeft();
    }

});

//Zoom

var scroll = 0;

mainCanvas.addEventListener ? (window.addEventListener("mousewheel", zoom, !1),
                               mainCanvas.addEventListener("DOMMouseScroll", zoom, !1)) : window.attachEvent("onmousewheel", zoom);

function zoom(a) {
    a = window.event || a;
    a.preventDefault();
    a.stopPropagation();
    scroll = Math.max(-1, Math.min(1, a.wheelDelta || -a.detail))
    if (scroll == -1) { //zoom out
        if (maxScreenHeight < 10000) {
            (maxScreenHeight += 250, maxScreenWidth += 250, resize());
            scroll = 0
        }
    }

    if (scroll == 1) { //zoom in
        if (maxScreenHeight > 1000) {
            (maxScreenHeight -= 250, maxScreenWidth -= 250, resize())
            scroll = 0
        }
    }
}

mainCanvas.onkeydown = function(event) {
    var k = event.keyCode ? event.keyCode : event.which;
    if (k == 70) { // F to zoom out
        if (maxScreenHeight < 10000) {
            (maxScreenHeight += 250, maxScreenWidth += 250, resize());
        }
    }
    if (k == 67) {// C to zoom in
        if (maxScreenHeight > 1000) {
            (maxScreenHeight -= 250, maxScreenWidth -= 250, resize())
        }

    }

    {if(65==a||37==a)cameraKeys.l=0,updateCameraInput();if(68==a||39==a)cameraKeys.r=0,updateCameraInput();if(87==a||38==a)cameraKeys.u=0,updateCameraInput();if(83==a||40==a)cameraKeys.d=0,updateCameraInput();if(32==a){var d=unitList.indexOf(activeUnit);sendUnit(d)}void 0!=upgrInputsToIndex["k"+a]&&toggleActiveUnit(upgrInputsToIndex["k"+a]);46==a&&selUnits.length&&sellSelUnits();84==a&&toggleChat("none"==chatListWrapper.style.display);
     27==a&&(toggleActiveUnit(),disableSelUnit(),showSelector=!1);82==a&&(camY=camX=0)}};mainCanvas.onkeydown=function(a){a=a.keyCode?a.keyCode:a.which;socket&&player&&!player.dead&&(65!=a&&37!=a||cameraKeys.l||(cameraKeys.l=-1,cameraKeys.r=0,updateCameraInput()),68!=a&&39!=a||cameraKeys.r||(cameraKeys.r=1,cameraKeys.l=0,updateCameraInput()),87!=a&&38!=a||cameraKeys.u||(cameraKeys.u=-1,cameraKeys.d=0,updateCameraInput()),83!=a&&40!=a||cameraKeys.d||(cameraKeys.d=1,cameraKeys.u=0,updateCameraInput()))}

addEventListener("keydown", function(a) {
    if (a.keyCode == 77){
        for(i=0;i<users.length;++i){
            if(users[i].name.startsWith("[G]")&&users[i].name !== player.name){
                camX = users[i].x-player.x;
                camY = users[i].y-player.y;
            }
        }
    }
});// ==UserScript==
// @name         Bloble.io Commander Factory Build
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  1 = 1st generators layer, 4 = 2nd generators layer, 2 = Simple turrets, 5 = Upgrade rangeds, 8 = Upgrade spotters, 3 = Walls, 6 = Upgrade boulders, 9 = Upgrade spikes, C = Move to commander.
// @author       You
// @match        http://bloble.io/*
// @grant        none
// ==/UserScript==

addEventListener("keydown", function(a) {
    if (a.keyCode == 97){
        for(i=-3.14;i<=3.14;i+=0.5233){
            socket.emit("1",i,132,3);
        }
    }
    if (a.keyCode == 100){
        for(i=-2.965;i<=3.14;i+=0.3488){
            socket.emit("1",i,243.85,3);
        }
    }
    if (a.keyCode == 103){
        for(i=0;i<units.length;++i){
            if(0===units[i].type&&"hexagon"==units[i].shape&&units[i].owner==player.sid){
                socket.emit("4",units[i].id,0);
            }
        }
    }
    if (a.keyCode == 98){
        for(i=-3.14;i<=3.14;i+=0.3488){
            socket.emit("1",i,194,2);
        }
    }
    if (a.keyCode == 101){
        for(i=0;i<units.length;++i){
            if(0===units[i].type&&1==units[i].turretIndex&&"circle"==units[i].shape&&units[i].owner==player.sid){
                socket.emit("4",units[i].id,1);
             }
        }
    }
    if (a.keyCode == 104){
        for(i=0;i<units.length;++i){
            if(0===units[i].type&&3==units[i].turretIndex&&"circle"==units[i].shape&&units[i].owner==player.sid){
                socket.emit("4",units[i].id,0);
            }
        }
    }
    if (a.keyCode == 99){
        for(i=-3.14;i<3.14;i+=0.216){
            socket.emit("1",i,1e3,1);
        }
    }
    if (a.keyCode == 102){
        for(i=0;i<units.length;++i){
            if(3==units[i].type&&"circle"==units[i].shape&&units[i].owner==player.sid){
                socket.emit("4",units[i].id,0);
            }
        }
    }
    if (a.keyCode == 105){
        for(i=0;i<units.length;++i){
            if(3==units[i].type&&"hexagon"==units[i].shape&&units[i].owner==player.sid){
                socket.emit("4",units[i].id,0);
            }
        }
    }
    if (a.keyCode == 67){
        for(i=0;i<units.length;++i){
            if(1==units[i].type&&"star"==units[i].shape&&units[i].owner==player.sid){
                camX = units[i].x-player.x;
                camY = units[i].y-player.y;
            }
        }
    }
});
// ==UserScript==
// @name         Bloble.io Commander Factory Build
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  1 = 1st generators layer, 4 = 2nd generators layer, 2 = Simple turrets, 5 = Upgrade rangeds, 8 = Upgrade spotters, 3 = Walls, 6 = Upgrade boulders, 9 = Upgrade spikes, C = Move to commander.
// @author       You
// @match        http://bloble.io/*
// @grant        none
// ==/UserScript==

addEventListener("keydown", function(a) {
    if (a.keyCode == 97){
        for(i=-3.14;i<=3.14;i+=0.5233){
            socket.emit("1",i,132,3);
        }
    }
    if (a.keyCode == 100){
        for(i=-2.965;i<=3.14;i+=0.3488){
            socket.emit("1",i,243.85,3);
        }
    }
    if (a.keyCode == 103){
        for(i=0;i<units.length;++i){
            if(0===units[i].type&&"hexagon"==units[i].shape&&units[i].owner==player.sid){
                socket.emit("4",units[i].id,0);
            }
        }
    }
    if (a.keyCode == 98){
        for(i=-3.14;i<=3.14;i+=0.3488){
            socket.emit("1",i,194,2);
        }
    }
    if (a.keyCode == 101){
        for(i=0;i<units.length;++i){
            if(0===units[i].type&&1==units[i].turretIndex&&"circle"==units[i].shape&&units[i].owner==player.sid){
                socket.emit("4",units[i].id,1);
             }
        }
    }
    if (a.keyCode == 104){
        for(i=0;i<units.length;++i){
            if(0===units[i].type&&3==units[i].turretIndex&&"circle"==units[i].shape&&units[i].owner==player.sid){
                socket.emit("4",units[i].id,0);
            }
        }
    }
    if (a.keyCode == 99){
        for(i=-3.14;i<3.14;i+=0.216){
            socket.emit("1",i,1e3,1);
        }
    }
    if (a.keyCode == 102){
        for(i=0;i<units.length;++i){
            if(3==units[i].type&&"circle"==units[i].shape&&units[i].owner==player.sid){
                socket.emit("4",units[i].id,0);
            }
        }
    }
    if (a.keyCode == 105){
        for(i=0;i<units.length;++i){
            if(3==units[i].type&&"hexagon"==units[i].shape&&units[i].owner==player.sid){
                socket.emit("4",units[i].id,0);
            }
        }
    }
    if (a.keyCode == 67){
        for(i=0;i<units.length;++i){
            if(1==units[i].type&&"star"==units[i].shape&&units[i].owner==player.sid){
                camX = units[i].x-player.x;
                camY = units[i].y-player.y;
            }
        }
    }
});
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
// ==UserScript==

// @name         Bloble.io NoobScript V3 QuickSelect Fragment

// @namespace    http://tampermonkey.net/

// @version      1.0

// @description  A fragment of code from NoobScript V3 - The quick troops selector. Press q for selecting all but commander, e for selecting everything, and c for selecting the commander.

// @author       NoobishHacker

// @match        http://bloble.io/*

// @grant        none

// ==/UserScript==

window.addEventListener("keyup", function(a) {

    a = a.keyCode ? a.keyCode : a.which;

​

    if (a === 81) { // All troops except commander

        selUnits = [];

        units.forEach((unit) => {

            if (unit.owner === player.sid && unit.type === 1) {

                if (!unit.info) unit.info = getUnitFromPath(unit.uPath);

                unit.info.name !== 'Commander' && selUnits.push(unit)

​

            }

        });

        selUnitType = "Unit";

    } else if (a === 69) { // Everything

        selUnits = [];

        units.forEach((unit) => {

            if (unit.owner === player.sid && unit.type === 1) {

                if (!unit.info) unit.info = getUnitFromPath(unit.uPath);

                selUnits.push(unit)

            }

        });

        selUnitType = "Unit";

    } else if (a === 67) { // Commander

        selUnits = [];

        units.every((unit) => {

            if (unit.owner === player.sid && unit.type === 1) {

                if (!unit.info) unit.info = getUnitFromPath(unit.uPath);

                if (unit.info.name === 'Commander') {

                    selUnits.push(unit)

                    return false;

                }

            }

            return true;

        });

        selUnitType = "Unit";

    }

});
// ==UserScript==

// @name      Bloble.io Clones

// @namespace http://tampermonkey.net/

// @Version 0.2

// @description Anonymous Asks

// @author Snow Ask

// @match http://bloble.io/*

// @grant none

// @my org https://goo.gl/wUcTJ6

// @run-at context-menu

// @version 0.0.1.20180416200937

// ==/UserScript==

​

// Clones

function VCodeDialog(refreshVCode, confirmClick) {

var dialog, shadow;

​

    function createDialog() {

        var screenWidth = document.body.clientWidth;

        var dialogLeft = screenWidth > 520 ? (screenWidth - 520) / 2 : 0;

        var $dialog_div = $('<div class="dialog" id="dialog-vcode" style="width:520px;top:0px;bottom:auto;left:' + dialogLeft + 'px;right:auto;display:none;visibility:visible;z-index:52"></div>');

        var $dialog_header = $('<div class="dialog-header"><h3><span class="dialog-header-title"><em class="select-text">提示</em></span></h3></div>');

        var $dialog_control = $('<div class="dialog-control"><span class="dialog-icon dialog-close icon icon-close"><span class="sicon">x</span></span></div>');

        var $dialog_body = $('<div class="dialog-body"></div>');

        var $dialog_body_div = $('<div style="text-align:center;padding:22px"></div>');

        var $dialog_body_download_verify = $('<div class="download-verify" style="margin-top:10px;padding:0 28px;text-align:left;font-size:12px;"></div>');

        var $dialog_verify_body = $('<div class="verify-body">请输入验证码：</div>');

        var $dialog_input = $('<input id="dialog-input" type="text" style="padding:3px;width:85px;height:23px;border:1px solid #c6c6c6;background-color:white;vertical-align:middle;" class="input-code" maxlength="4">');

        var $dialog_img = $('<img id="dialog-img" class="img-code" style="margin-left:10px;vertical-align:middle;" alt="点击换一张" src="" width="100" height="30">');

        var $dialog_refresh = $('<a href="javascript:void(0)" style="text-decoration:underline;" class="underline">换一张</a>');

        var $dialog_err = $('<div id="dialog-err" style="padding-left:84px;height:18px;color:#d80000" class="verify-error"></div>');

        var $dialog_footer = $('<div class="dialog-footer g-clearfix"></div>');

        var $dialog_confirm_button = $('<a class="g-button g-button-blue" data-button-id="" data-button-index href="javascript:void(0)" style="padding-left:36px"><span class="g-button-right" style="padding-right:36px;"><span class="text" style="width:auto;">确定</span></span></a>');

        var $dialog_cancel_button = $('<a class="g-button" data-button-id="" data-button-index href="javascript:void(0);" style="padding-left: 36px;"><span class="g-button-right" style="padding-right: 36px;"><span class="text" style="width: auto;">取消</span></span></a>');

​

        $dialog_header.append($dialog_control);

        $dialog_verify_body.append($dialog_input).append($dialog_img).append($dialog_refresh);

        $dialog_body_download_verify.append($dialog_verify_body).append($dialog_err);

        $dialog_body_div.append($dialog_body_download_verify);

        $dialog_body.append($dialog_body_div);

        $dialog_footer.append($dialog_confirm_button).append($dialog_cancel_button);

        $dialog_div.append($dialog_header).append($dialog_body).append($dialog_footer);

        $('body').append($dialog_div);

​

        $dialog_div.dialogDrag();

​

        $dialog_control.click(dialogControl);

        $dialog_img.click(refreshVCode);

        $dialog_refresh.click(refreshVCode);

        $dialog_input.keypress(function (event) {

            if (event.which == 13)

                confirmClick();

        });

        $dialog_confirm_button.click(confirmClick);

        $dialog_cancel_button.click(dialogControl);

        $dialog_input.click(function () {

            $('#dialog-err').text('');

        });

        return $dialog_div;

    }

​

    this.open = function (vcode) {

        if (vcode)

            $('#dialog-img').attr('src', vcode.img);

        dialog.show();

        shadow.show();

    }

    this.close = function () {

        dialogControl();

    }

    dialog = createDialog();

    shadow = $('div.dialog-shadow');

​

    function dialogControl() {

        $('#dialog-img', dialog).attr('src', '');

        $('#dialog-err').text('');

        dialog.hide();

        shadow.hide();

    }

}

​// ==UserScript==
// @name         bloble.io by:༺ڳฟ༻ by- (ɪթ)אַאַฬℌสԂʑʑאַאַ
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Full Completed Hacker/ Bloble.io
// @author       (ɪթ)אַאַฬℌสԂʑʑאַאַ
// @match        http://bloble.io/*
// @grant        none
// ==/UserScript==

var headAppend=document.getElementsByTagName("head")[0],style=document.createElement("div");style.innerHTML="<style>#upgradeScriptCont,.buttonClass{background-color:rgba(40,40,40,.5);margin-left: 3px;border-radius:4px;pointer-events:all}#upgradeScriptCont{top: -138px;transition: 1s;margin-left:10px;position:absolute;padding-left:24px;margin-top:9px;padding-top:15px;width:530px;height:128px;font-family:arial;left:28%}#upgradeScriptCont:hover{top:0px}.buttonClass{color:#fff;padding:7px;height:19px;display:inline-block;cursor:pointer;font-size:15px}.hoverMessage{color: white;font-size: 14px;position: relative;left: 457px;bottom: 2px;pointer-events: none;}</style>",headAppend.appendChild(style);var contAppend=document.getElementById("gameUiContainer"),menuA=document.createElement("div");menuA.innerHTML="<div id=upgradeScriptCont><div id=layer1><div id=walls class=buttonClass onclick=walls()>Buy Walls</div><div id=upgradeBoulders class=buttonClass onclick=boulders()>Upgrade Boulders</div><div id=upgradeSpikes class=buttonClass onclick=spikes()>Upgrade Spikes</div><div id=upgradeGen class=buttonClass onclick=powerPlants()>Upgrade Power Plants</div></div><div id=layer2 style=margin-top:7px;margin-left:7px><div id=walls class=buttonClass onclick=generators()>Buy Generators</div><div id=upgradeBoulders class=buttonClass onclick=rapid()>Upgrade Rapid</div><div id=upgradeSpikes class=buttonClass onclick=ranged()>Upgrade Ranged</div><div id=upgradeGen class=buttonClass onclick=antiTank()>Upgrade anti-tank</div></div><div id=layer3 style=margin-top:7px;margin-left:-16px><div id=walls class=buttonClass onclick=gatlins()>Upgrade Gatlins</div><div id=upgradeBoulders class=buttonClass onclick=spotter()>Upgrade spotter</div><div id=upgradeMicro class=buttonClass onclick=microGenerators()>Upgrade Micro-Gen</div><div id=upgradeSpikes class=buttonClass onclick=semiAuto()>Upgrade Semi-auto</div></div><span class=hoverMessage>Hover over</span></div>",contAppend.insertBefore(menuA,contAppend.firstChild),window.walls=function(){for(i=-3.14;i<3.14;i+=.108)socket.emit("1",i,1e3,1)},window.generators=function(){for(i=-3.14;i<3.14;i+=.075)socket.emit("1",i,132,3)},window.boulders=function(){for(i=0;i<units.length;++i)3==units[i].type&&"circle"==units[i].shape&&units[i].owner==player.sid&&socket.emit("4",units[i].id,0)},window.microGenerators=function(){for(i=0;i<units.length;++i)3==units[i].type&&"circle"==units[i].shape&&units[i].owner==player.sid&&socket.emit("4",units[i].id,1)},window.spikes=function(){for(i=0;i<units.length;++i)3==units[i].type&&"hexagon"==units[i].shape&&units[i].owner==player.sid&&socket.emit("4",units[i].id,0)},window.powerPlants=function(){for(i=0;i<units.length;++i)0==units[i].type&&"hexagon"==units[i].shape&&units[i].owner==player.sid&&socket.emit("4",units[i].id,0)},window.rapid=function(){for(i=0;i<units.length;++i)0==units[i].type&&1==units[i].turretIndex&&"circle"==units[i].shape&&units[i].owner==player.sid&&socket.emit("4",units[i].id,0)},window.ranged=function(){for(i=0;i<units.length;++i)0==units[i].type&&1==units[i].turretIndex&&"circle"==units[i].shape&&units[i].owner==player.sid&&socket.emit("4",units[i].id,1)},window.antiTank=function(){for(i=0;i<units.length;++i)0==units[i].type&&4==units[i].turretIndex&&"circle"==units[i].shape&&units[i].owner==player.sid&&socket.emit("4",units[i].id,1)},window.semiAuto=function(){for(i=0;i<units.length;++i)0==units[i].type&&4==units[i].turretIndex&&"circle"==units[i].shape&&units[i].owner==player.sid&&socket.emit("4",units[i].id,0)},window.gatlins=function(){for(i=0;i<units.length;++i)0==units[i].type&&2==units[i].turretIndex&&"circle"==units[i].shape&&units[i].owner==player.sid&&socket.emit("4",units[i].id,0)},window.spotter=function(){for(i=0;i<units.length;++i)0==units[i].type&&3==units[i].turretIndex&&"circle"==units[i].shape&&units[i].owner==player.sid&&socket.emit("4",units[i].id,0)};
setInterval(updatePlayer,90000);
function updatePlayer(){
    socket.emit("2",0,0);
    socket.emit("2",Math.round(camX),Math.round(camY));
}

var scroll = 0;
 
mainCanvas.addEventListener ? (window.addEventListener("mousewheel", zoom, !1),
mainCanvas.addEventListener("DOMMouseScroll", zoom, !1)) : window.attachEvent("onmousewheel", zoom);
 
function zoom(a) {
    a = window.event || a;
    a.preventDefault();
    a.stopPropagation();
    scroll = Math.max(-1, Math.min(1, a.wheelDelta || -a.detail))
    if (scroll == -1) { //zoom out
        if (maxScreenHeight < 10000000) {
            (maxScreenHeight += 255, maxScreenWidth += 250000, resize());
            scroll = 0
        }
    }
 
    if (scroll == 1) { //zoom in
        if (maxScreenHeight > 100) {
            (maxScreenHeight -= 255, maxScreenWidth -= 25000, resize())
            scroll = 0
        }
    }
}
 
mainCanvas.onkeydown = function(event) {
    var k = event.keyCode ? event.keyCode : event.which;
    if (k == 70) { // F to zoom out
        if (maxScreenHeight < 100000000) {
            (maxScreenHeight += 255, maxScreenWidth += 250000, resize());
        }
    }
    if (k == 67) {// C to zoom in
        if (maxScreenHeight > 100) {
            (maxScreenHeight -= 255, maxScreenWidth -= 25000, resize())
        }
 
    }

    {if(65==a||37==a)cameraKeys.l=0,updateCameraInput();if(68==a||39==a)cameraKeys.r=0,updateCameraInput();if(87==a||38==a)cameraKeys.u=0,updateCameraInput();if(83==a||40==a)cameraKeys.d=0,updateCameraInput();if(32==a){var d=unitList.indexOf(activeUnit);sendUnit(d)}void 0!=upgrInputsToIndex["k"+a]&&toggleActiveUnit(upgrInputsToIndex["k"+a]);46==a&&selUnits.length&&sellSelUnits();84==a&&toggleChat("none"==chatListWrapper.style.display);
27==a&&(toggleActiveUnit(),disableSelUnit(),showSelector=!1);82==a&&(camY=camX=0)}};mainCanvas.onkeydown=function(a){a=a.keyCode?a.keyCode:a.which;socket&&player&&!player.dead&&(65!=a&&37!=a||cameraKeys.l||(cameraKeys.l=-1,cameraKeys.r=0,updateCameraInput()),68!=a&&39!=a||cameraKeys.r||(cameraKeys.r=1,cameraKeys.l=0,updateCameraInput()),87!=a&&38!=a||cameraKeys.u||(cameraKeys.u=-1,cameraKeys.d=0,updateCameraInput()),83!=a&&40!=a||cameraKeys.d||(cameraKeys.d=1,cameraKeys.u=0,updateCameraInput()))}
 


setInterval(updatePlayer,9999999999);
function updatePlayer(){
    socket.emit("2",0,0);
    socket.emit("2",Math.round(camX),Math.round(camY));
}
addEventListener("keydown", function(a) {
    if (a.keyCode == 51) { //Generators
         for(i=-3.14;i<=2.36;i+=0.050){
              socket.emit("1",i,132,3);
       }
    }
    if (a.keyCode == 54) { //Armory
         socket.emit("1",UTILS.roundToTwo(2.75),UTILS.roundToTwo(175),7);
    }
    if (a.keyCode == 52) { //Houses
         for(i=-3.134;i<=2.492;i+=0.04620){
            socket.emit("1",i,194,4);
         }
    }

    if (a.keyCode == 50) {//Turrets
         socket.emit("1",2.75,245.75,2);socket.emit("1",2.50,245,2);socket.emit("1",3,245,2);
         for(i=-2.98;i<=2.2;i+=0.3235){
            socket.emit("1",i,245,2);
         }
    }
    if (a.keyCode == 49) {//Walls
         for(i=-3.14;i<3.14;i+=0.216){
             socket.emit("1",i,1e3,1);
         }
    }
    if (a.keyCode == 55) {//Barracks
        socket.emit("1",0.32,310,8);
        socket.emit("1",-0.98,310,8);
        socket.emit("1",1.61,310,8);
        socket.emit("1",-2.27,310,8);
    }
});

addEventListener("keydown", function(a) {
    if (a.keyCode == 77){
        for(i=0;i<users.length;++i){
            if(users[i].name.startsWith("[G]")&&users[i].name !== player.name){
                 camX = users[i].x-player.x;
                 camY = users[i].y-player.y;
            }
        }
   }
});