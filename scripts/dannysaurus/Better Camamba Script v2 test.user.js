// ==UserScript==
// @name            Better Camamba Script v2 test
// @name:de         Better Camamba Skript v2 test
// @namespace       dannysaurus.camamba
// @include         http://www.camamba.com/*
// @include         https://www.camamba.com/*
// @include         http://www.de.camamba.com/*
// @include         https://www.de.camamba.com/*
// @connect         camamba.com
// @version         0.2
// @license         MIT License
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
// @grant           GM_listValues
// @grant           GM_xmlhttpRequest
// @grant           GM_addStyle
// @require         https://greasyfork.org/scripts/22752-object-utils/code/object-utils.js
// @require         https://greasyfork.org/scripts/20131-html-utils/code/html-utils.js
// @require         https://greasyfork.org/scripts/20132-camamba-utils/code/camamba-utils.js
// @description     Test the fetching of infos about online users from the the "/search.php" page
// @description:de  Test the fetching of infos about online users from the the "/search.php" page
// ==/UserScript==
//GM_addStyle(".user-uname { font-weight: bold; !important}");
GM_addStyle('.user-uname { font-weight: bold; }');
var htmlUtils = LIB.htmlUtils;
var cmUtils = LIB.camambaUtils;

/**
 * creates a table row
 * @param {string} cellTagname - <code>"TD"</code> or <code>"TH"</code>
 * @param {string[]} textElements - content text of the cells
 * @param {string[]} [classNames] - content of class-attributes in same order as <code>textElements</code>
 * @param {string[]} [ids] - content of id-attributes in same order as <code>textElements</code>
 * @return {Element} TR element
 */
var tableRow = function (cellTagname, textElements, classNames, ids) {
    var tr = htmlUtils.Element("TR");

    for (var i = 0; i <= textElements.length - 1; i++) {
        var txt = textElements[i] || "";
        var id = (ids && i <= ids.length - 1) ? ids[i] : undefined;
        var className = (classNames && i <= classNames.length - 1) ? classNames[i] : undefined;

        var td = htmlUtils.Element(cellTagname, id, className);
        td.appendChildren(document.createTextNode(txt));
        tr.appendChildren(td);
    }
    return tr;
};

var watchUserIds = [];

// Page specific modules
if (cmUtils.pageInfo.route === 'profile') {
        var classNames = ["user-uname", "user-customname", "user-age", "user-gender", "user-place", "user-distance", "user-room", "user-customnote", "user-isreal", "user-ispremium", "user-issuper", "user-uid"];
    var classNamesHead = [];
    var classNamesData = [];
    classNames.forEach(function(className) {
        classNamesHead.push(className + " usertable-head");
        classNamesData.push(className + " usertable-data");
    });
    var trHead = function() {
        return tableRow("TH", ["user", "name", "age", "gender", "location", "distance in km", "room", "note", "real", "premium", "super", "uid"], classNamesHead);
    };
    var trData = function(user) {
        var location = user.location;
        var online = user.online;
        var tr = tableRow("TD", [
            user.uname, user.name, user.age, user.gender,
            location.place, location.distanceInKm, online.roomName, user.note,
            user.isReal, user.isPremium, user.isSuper, user.uid
        ], classNamesData);
        tr.id = "uid" + user.uid;
        return tr;
    };

    var createUserTable = function() {
        var tbody = { male: htmlUtils.Element("TBODY"), other: htmlUtils.Element("TBODY") };
        tbody.male.appendChildren(trHead());
        tbody.other.appendChildren(trHead());

        var search = new cmUtils.UserSearch();
        search.queryObject.isOnline = true;
        search.queryObject.gender = "any";

        var users = [];
        var formerResult = {};
        search.execute(function(result, isLastPage) {
            Object.keys(result).forEach(function(uid) {
                if (!(formerResult[uid])) { // ignore duplicate entry (last entry of previous page)
                    users.push(result[uid]);
                }
            });

            if (isLastPage) {
                formerResult = {};
                [
                    function(user) { return user.name || user.uname },
                    function(user) { return user.online.roomId; }
                ].forEach(function(getProp) {
                    users.forEach(function(user, idx) { user.idx = idx; }); // indexing for a stable sort
                    users.sort(function(a, b) {
                        var propA = getProp(a), propB = getProp(b);
                        if (propA && (!propB || propA < propB)) { return - 1; }
                        if (propB && (!propA || propA > propB)) { return 1; }
                        return a.idx - b.idx;
                    });
                });

                var formerRoom = { male: "", other: "" };
                users.forEach(function(user) {
                    indexUserInWatchlist = watchUserIds.indexOf(user.uid);
                    if (indexUserInWatchlist >= 0) {
                        window.alert(user.uname + " is online.");
                        watchUserIds.splice(indexUserInWatchlist, 1);
                    }
                    var gender = user.gender === "male" ? "male" : "other";
                    if (formerRoom[gender] && formerRoom[gender] !== user.online.roomId) {
                        tbody[gender].appendChildren(tableRow("TR", [""]));
                        tbody[gender].appendChildren(tableRow("TR", [""]));
                    }
                    tbody[gender].appendChildren(trData(user));
                    formerRoom[gender] = user.online.roomId;
                });
            } else {
                formerResult = result;
            }
        });
        var userTable = { };
        var userTableInDom = { };
        ["male", "other"].forEach(function(gender) {
            var table = userTable[gender] = htmlUtils.Element("TABLE", "table-usersearch-" + gender);
            table.appendChildren(tbody[gender]);
            var tableInDom = userTableInDom[gender] = document.getElementById("table-usersearch-" + gender);
            if (tableInDom) {
                tableInDom.parentNode.replaceChild(table.domElement, tableInDom);
            } else {
                if (gender === "male") {
                    table.addAsLastChild(document.getElementById("relativeLayoutContainer"));
                } else {
                    table.addAsFirstChild(document.getElementById("relativeLayoutContainer"));
                }
            }
        }, this);
    };

    createUserTable();
    setInterval(function() {
        createUserTable();
    },  45000); // refresh periodically after 45 seconds
}
