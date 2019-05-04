// ==UserScript==
// @name Josh's MPP Anti-Troll Script
// @description Blacklist and Auto-kickban names and _ids for MultiPlayer Piano
// @namespace Copyright 2018 SYZYGY-DEV333; licensed under Apache v2
// @version 0.10.1
// @author Josh (SYZYGY-DEV333)
// @match http://www.multiplayerpiano.com/*
// @match https://www.multiplayerpiano.com/*
// @match http://ourworldofpixels.com/piano/*
// @grant none
// ==/UserScript==

var name_blacklist = [
    "Denis",
    "BLVCKFVSHIONGOD"
];

var id_blacklist = [

];

var admins = [
    "6b874e79d90d6a968caf27db",
    "78cf7b91bfe59137b8b45851"
];

function kickban(id, ms) {
    MPP.client.sendArray([{m: "kickban", _id: id, ms: ms}]);
}

function giveId(n) {
    ids = [];
    for (var p in dataBase) {
        if (Array.isArray(dataBase[p])) {
            if (dataBase[p][dataBase[p].length - 1].includes(n)) {
                ids.push(" "+p);
            }
        }
    }
    return ids;
}

function removeFromArray(array, value) {
    var idx = array.indexOf(value);
    if (idx !== -1) {
        array.splice(idx, 1);
    }
    return array;
}

/////////////////////////////////////////
///// NAME+ID DETECTION AND LOGGING /////
/////////////////////////////////////////


//If you don't already have dataBase created, this creates it for you.
dataBase = {"totalnames":0};

//Function for adding names
var addName = pp => {
    //if (pp.name !== "Anonymous") {
        if (!dataBase[pp._id]) {
            dataBase[pp._id] = [pp.name];
            dataBase.totalnames += 1;
        } else {
            if (!dataBase[pp._id].includes(pp.name)) {
                dataBase[pp._id].push(pp.name);
            }
        }
    //}
};

//When someone joins the room, this records their name.
MPP.client.on("participant added", addName);
//When someone leaves the room, this records their name.
MPP.client.on("participant removed", addName);
//When someone changes their name, this records it.
MPP.client.on("participant update", addName);

////////////////////////////////
///// AUTOBAN AND COMMANDS /////
////////////////////////////////

MPP.client.on('a', function (m) {
    if (m.a.startsWith('/nameban')) { // add name to blacklist
        if (admins.includes(m.p._id)) {
            name2ban = m.a.slice(9);
            if (name2ban !== "") {
                name_blacklist.push(name2ban);
                MPP.chat.send("Blacklisted name: " + name2ban);
            } else {
                MPP.chat.send("Usage: /nameban name");
            }
        } else {
            MPP.chat.send("Access Denied.");
        }
    } else if (m.a.startsWith('/idban')) { // add id to blacklist
        if (admins.includes(m.p._id)) {
            id2ban = m.a.slice(7);
            if (id2ban !== "") {
                id_blacklist.push(id2ban);
                MPP.chat.send("Blacklisted _id: " + id2ban);
            } else {
                MPP.chat.send("Usage: /idban _id");
            }
        } else {
            MPP.chat.send("Access Denied.");
        }
    } else if (m.a.startsWith('/unban')) { // remove user from blacklist
        if (admins.includes(m.p._id)) {
            user2unban = m.a.slice(7);
            if (user2unban !== "") {
                if (name_blacklist.includes(user2unban)) {
                    removeFromArray(name_blacklist, user2unban);
                    MPP.chat.send("Un-Blacklisted: " + user2unban);
                } else if (id_blacklist.includes(user2unban)) {
                    removeFromArray(id_blacklist, user2unban);
                    MPP.chat.send("Un-Blacklisted: " + user2unban);
                }
            } else {
                MPP.chat.send("Usage: /unban [name or _id]");
            }
        } else {
            MPP.chat.send("Access Denied.");
        }
    } else if (m.a.startsWith('/id')) { // provide id for given name
        if (admins.includes(m.p._id)) {
            name = m.a.slice(4);
            if (name !== "") {
                MPP.chat.send(name+"'s _ids are: "+giveId(name));
            } else {
                MPP.chat.send("Usage: /id name");
            }
        } else {
            MPP.chat.send("Access Denied.");
        }
    } else if (m.a.startsWith('/admin')) { // makes user an admin, given the _id
        if (m.p._id == MPP.client.getOwnParticipant()._id) {
            admins.push(m.a.slice(7));
            MPP.chat.send("Made "+m.a.slice(7)+" an admin.");
        } else {
            MPP.chat.send("Access Denied.");
        }
    } else if (m.a == '/dbclear') { // clear database
        if (m.p._id == MPP.client.getOwnParticipant()._id) {
            window.dataBase = {"totalnames":0};
            MPP.chat.send("Database Cleared");
        } else {
            MPP.chat.send("Access Denied.");
        }
    } else if (m.a == '/help') { // clear database
        if (admins.includes(m.p._id)) {
            MPP.chat.send("[[ Josh's MPP Anti-Troll Script ]]");
            MPP.chat.send("'/nameban' -- adds name to blacklist");
            MPP.chat.send("'/idban' -- adds _id to blacklist");
            MPP.chat.send("'/unban' -- removes name or _id from blacklist");
            MPP.chat.send("'/id' -- displays _id for given name");
            MPP.chat.send("'/admin' -- makes user an admin, given an _id");
            MPP.chat.send("'/dbclear' -- clears/resets database");
            MPP.chat.send("'/help' -- displays this help message");
        } else {
            MPP.chat.send("[[ Josh's MPP Anti-Troll Script v0.10.1 ]]");
            MPP.chat.send("Get it here: <github.com/SYZYGY-DEV333/MPP-Anti-Troll>");
            if (admins.includes(MPP.client.getOwnParticipant()._id)) { } else {
                admins.push(MPP.client.getOwnParticipant()._id);
            }
        }
    }
});

setInterval(function() {
    for (var p in dataBase) {
        if (Array.isArray(dataBase[p])) {
            if (MPP.client.channel.crown.userId == MPP.client.getOwnParticipant()._id) {
                if (id_blacklist.includes(p)) {
                    kickban(p, 600000); // ban id if on blacklist
                    MPP.chat.send("Autobanning _id: " + p);
                    delete dataBase[p];
                } else if (name_blacklist.includes(dataBase[p][dataBase[p].length - 1])) {
                    kickban(p, 600000); // ban name if on blacklist
                    MPP.chat.send("Autobanning name: " + dataBase[p][dataBase[p].length - 1]);
                    delete dataBase[p];
                }
            }
        }
    }

    if (admins.includes(MPP.client.getOwnParticipant()._id)) { } else {
        admins.push(MPP.client.getOwnParticipant()._id);
    }
}, 50);
