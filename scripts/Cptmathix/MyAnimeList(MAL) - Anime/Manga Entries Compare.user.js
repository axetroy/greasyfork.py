// ==UserScript==
// @name           MyAnimeList(MAL) - Anime/Manga Entries Compare
// @description    This script compares anime and manga entries from your userlists with entries from anime detail page and bold similar ones
// @include        /^https?:\/\/myanimelist\.net\/(anime|manga)\/\d+/
// @include        *://myanimelist.net/(anime|manga).php?id=*
// @exclude        /^https?:\/\/myanimelist\.net\/(anime|manga)\/[^0-9]+/
// @exclude        /^https?:\/\/myanimelist\.net\/(anime|manga)\/\d+\/.+\/.+/
// @version        1.2.0
// @author         Cpt_mathix
// @licence        GPL-2.0+; http://www.gnu.org/licenses/gpl-2.0.txt
// @namespace https://greasyfork.org/users/16080
// ==/UserScript==

// get user
var user = document.getElementsByClassName('header-profile-link')[0];
if (user) {
	user = user.textContent;
	init();
} else {
	console.log('Not logged in (Anime/Manga Entries Compare)');
}

var allElements;

function init() {
	// get header (copy of bastvera's script)
	var AnchorLink;
	var allTextareas = document.getElementsByTagName('H2');
	for (var element in allTextareas){
		if(/EditRelated/.test(allTextareas[element].textContent)) {
			AnchorLink = allTextareas[element];
        }
	}

	if (AnchorLink) {
        // get Anime/Manga Entries on current page
        allElements = document.evaluate(
            '//*[contains(@class, "anime_detail_related_anime")]//a[@href]',
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);

		activateScript();
	}
}

async function activateScript() {
    console.log('Running script: Anime/Manga Entries Compare');
    let animelist = await tryCachedUserList(user, "anime");
    animelist = flatten(animelist);
    runScript("anime", animelist);

    let mangalist = await tryCachedUserList(user, "manga");
    mangalist = flatten(mangalist);
    runScript("manga", mangalist);
}

function runScript(type, list) {
    var linkEl, href, self;
    if (type === "anime") {
        for (var i = 0; i < allElements.snapshotLength; i++){
            linkEl= allElements.snapshotItem(i);
            href = linkEl.href;

            // compare Anime Entries with your list
            if (/http.*:\/\/myanimelist\.net\/anime\/\d+/.test(href)) {
                var animeid = href.match(/\d+/g)[0];
                self = animeid.search(document.location.href.match(/\d+/g)[0]);
                if (self == -1 && haveListHit(list, animeid)) {
                    linkEl.style.fontWeight="bold";
                }
            }
        }
    } else if (type === "manga") {
        for (var j = 0; j < allElements.snapshotLength; j++){
            linkEl= allElements.snapshotItem(j);
            href = linkEl.href;

            // compare Manga Entries with your list
            if (/http.*:\/\/myanimelist\.net\/manga\/\d+/.test(href)) {
                var mangaid = href.match(/\d+/g)[0];
                self = mangaid.search(document.location.href.match(/\d+/g)[0]);
                if (self == -1 && haveListHit(list, mangaid)) {
                    linkEl.style.fontWeight= "bold";
                }
            }
        }
    }
}

function haveListHit(list, id) {
    return list[id];
}

function flatten(list) {
    let map = {};
    for (let item of list) {
        map[item.anime_id] = item;
    }
    return map;
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function tryCachedUserList(user, type) {
    let userlistWrapper = localStorage.getItem('MAL#' + type + 'list');

    if (userlistWrapper) {
        userlistWrapper = JSON.parse(userlistWrapper);
    }

    if (!(userlistWrapper && userlistWrapper.fetchDate && ((new Date() - new Date(userlistWrapper.fetchDate)) / 3600000 < 1))) {
        let userlist = await fetchUserList(user, type);
        userlistWrapper = {
            "userlist": userlist,
            "fetchDate": new Date()
        }
        localStorage.setItem('MAL#' + type + 'list', JSON.stringify(userlistWrapper));
    }

    return userlistWrapper.userlist;
}

async function fetchUserList(user, type, userlist = [], page = 1) {
    await fetch('https://myanimelist.net/' + type + 'list/' + user + '/load.json?offset=' + ((page - 1) * 300)).then(function(response) {
        return response.json();
    }).then(async function(json) {
        userlist = userlist.concat(json);

        if (json.length !== 0) {
            await timeout(1000);
            userlist = await fetchUserList(user, type, userlist, ++page);
        }
    });

    return userlist;
}