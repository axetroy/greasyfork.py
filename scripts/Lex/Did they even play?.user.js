// ==UserScript==
// @name         Did they even play?
// @namespace    https://www.steamgifts.com/user/lext
// @version      0.171
// @description  Show play stats on Steam Gifts winners pages. Adapted from kelnage's Do You Even Play, Bro? script.
// @author       Lex
// @match        *://www.steamgifts.com/giveaway/*/winners*
// @require      http://code.jquery.com/jquery-3.2.1.min.js
// @connect      api.steampowered.com
// @connect      store.steampowered.com
// @connect      steamdb.info
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// ==/UserScript==

(function() {
    'use strict';

    const PLAYTIME_URL = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/"; // takes a steamid and API key
    const ACHIEVEMENTS_URL = "https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/"; // takes a steamid, appid and API key
    const SG_USER_URL = "https://www.steamgifts.com/user/";
    const GAME_ACHIEVEMENTS_URL = "http://steamcommunity.com/profiles/$1/stats/$2/achievements/";

    const INVALIDATION_TIME = 30*60*1000; // 30 minute cache time
    const PLAYTIME_CACHE_KEY = "PLAYTIME_CACHE_KEY_";
    function getCachedPlaytime(steamID64, gameID) { return getCachedJSONValue(PLAYTIME_CACHE_KEY + encodeURIComponent(steamID64) + "_g" + encodeURIComponent(gameID)); }
    function setCachedPlaytime(steamID64, gameID, value) { cacheJSONValue(PLAYTIME_CACHE_KEY + encodeURIComponent(steamID64) + "_g" + encodeURIComponent(gameID), value); }
    const ACHIEVEMENTS_CACHE_KEY = "ACHIEVEMENTS_CACHE_KEY_";
    function getCachedAchievements(steamID64, gameID) { return getCachedJSONValue(ACHIEVEMENTS_CACHE_KEY + encodeURIComponent(steamID64) + "_g" + encodeURIComponent(gameID)); }
    function setCachedAchievements(steamID64, gameID, value) { cacheJSONValue(ACHIEVEMENTS_CACHE_KEY + encodeURIComponent(steamID64) + "_g" + encodeURIComponent(gameID), value); }
    const STEAMID_CACHE_KEY = "STEAMID_CACHE_";
    function getCachedSteamID(username) { return GM_getValue(STEAMID_CACHE_KEY + encodeURIComponent(username)); }
    function setCachedSteamID(username, steamID64) { GM_setValue(STEAMID_CACHE_KEY + encodeURIComponent(username), steamID64); }
    const SUBAPPIDS_CACHE_KEY = "SUBAPPIDS_CACHE_KEY_";
    function getCachedSubAppids(subid) { return GM_getValue(SUBAPPIDS_CACHE_KEY + encodeURIComponent(subid)); }
    function setCachedSubAppids(subid, appids) { GM_setValue(SUBAPPIDS_CACHE_KEY + encodeURIComponent(subid), appids); }
    const API_KEY_REGEXP = /[0-9A-Z]{32}/;

    var STEAM_API_KEY = GM_getValue("STEAM_API_KEY");

    function getCachedJSONValue(key) {
        try {
            let result = JSON.parse(GM_getValue(key));
            if ((new Date()).getTime() - result.UPDATE_TIME < INVALIDATION_TIME)
                return result;
        } catch (err) { }
    }

    function cacheJSONValue(key, value) {
        value.UPDATE_TIME = (new Date()).getTime();
        GM_setValue(key, JSON.stringify(value));
    }

    function fetchGamePlaytimes(steamID64, callback) {
        GM_xmlhttpRequest({
            "method": "GET",
            "url": PLAYTIME_URL + "?steamid=" + steamID64 + "&key=" + STEAM_API_KEY,
            "onload": function(response) {
                var playtimes;
                try {
                    playtimes = JSON.parse(response.responseText).response.games;
                } catch(err) { }
                callback(playtimes);
            }
        });
    }

    function fetchGamePlaytime(steamID64, appids, callback) {
        let cpts = appids.map((aid) => getCachedPlaytime(steamID64, aid)); // Cached Playtime Objects
        if (cpts.some((e) => e !== undefined)) // If any cached playtimes are valid, use cache
            callback(cpts.reduce((s, v) => s + (v === undefined ? 0 : v.playtime_forever), 0));
        else
            fetchGamePlaytimes(steamID64, function(games) {
                if (games === undefined)
                    return callback(-1); // Profile is private, so the games array is empty
                let totalPlaytime;
                for (let game of games) {
                    if (appids.indexOf(game.appid) !== -1) {
                        setCachedPlaytime(steamID64, game.appid, game);
                        totalPlaytime = (totalPlaytime || 0) + game.playtime_forever; // playtime in minutes
                    }
                }
                return callback(totalPlaytime);
            });
    }

    function fetchAchievementStats(steamID64, appid, callback) {
        const cachedAchievements = getCachedAchievements(steamID64, appid);
        if (cachedAchievements !== undefined)
            return callback(cachedAchievements);
        GM_xmlhttpRequest({
            "method": "GET",
            "url": `${ACHIEVEMENTS_URL}?appid=${appid}&steamid=${steamID64}&key=${STEAM_API_KEY}`,
            "onload": function(response) {
                let results = {"achieved": 0, "total": 0};
                try {
                    const data = JSON.parse(response.responseText);
                    results.achieved = data.playerstats.achievements.filter((a) => a.achieved == 1).length;
                    results.total = data.playerstats.achievements.length;
                } catch(err) { }
                setCachedAchievements(steamID64, appid, results);
                return callback(results);
            }
        });
    }

    function fetchSteamID(username, callback) {
        const cachedSteamID = getCachedSteamID(username);
        if (cachedSteamID !== undefined)
            return callback(cachedSteamID);
        GM_xmlhttpRequest({
            "method": "GET",
            "url": SG_USER_URL + username,
            "onload": function(response) {
                const steamID = $('a[data-tooltip="Visit Steam Profile"]', response.responseText).attr("href").match(/\d{17}/)[0];
                setCachedSteamID(username, steamID);
                callback(steamID);
            }
        });
    }

    function steamIDRetrieved(steamID, appids, heading) {
        const achUrl = GAME_ACHIEVEMENTS_URL.replace("$1", steamID).replace("$2", appids[0]);
        heading.find("p").after(`<div style="display:inline-block; margin-left:1em"><span><span class="DTEP_ACHIEVEMENTS"/><a href="${achUrl}"><span style="color:#4b72d4;text-decoration:underline">Achievements</span></a></span><span class="DTEP_PLAYTIME"/></div>`);

        fetchGamePlaytime(steamID, appids, function(playtime) {
            console.log(heading.find("a:first").text() + "   " + steamID);
            let err = msg => heading.find(".DTEP_PLAYTIME").parent().text(msg).css({'color':'crimson', "font-weight":"bold"});
            if (playtime === undefined) {
                const username = heading.find("a:first").text();
                const e = err("Game appears unactivated").attr("title", "Check their Steam profile to confirm, especially for DLCs").parent().append(
                    `<a style="color:#4b72d4;text-decoration:underline" target=_blank href="http://www.sgtools.info/nonactivated/${username}">sgtools activation checker</a>`);
                // Gift is not sent, so don't worry about it being not activated
                if (heading.parent('.table__row-inner-wrap').find(".table__gift-not-sent:not(.is-hidden)").length == 1)
                    e.css({'color':''});
            } else if (playtime == -1)
                err("Profile is private");
            else {
                const hours = +(playtime / 60).toFixed(2);
                heading.find(".DTEP_PLAYTIME").text(`, ${hours} hours total`);
                // Gift is not sent, but they already own it!
                if (heading.parent('.table__row-inner-wrap').find(".table__gift-not-sent:not(.is-hidden)").length == 1)
                    $("<span>WARNING: User already owns this game! </span>").css({'color':'red'}).prependTo(heading.find(".DTEP_ACHIEVEMENTS").parent());
            }
        });

        fetchAchievementStats(steamID, appids[0], function(achievements) {
            if (achievements.total === 0)
                heading.find(".DTEP_ACHIEVEMENTS").parent().text("Game has no achievements");
            else
                heading.find(".DTEP_ACHIEVEMENTS").text(achievements.achieved + " / " + achievements.total + " ");
        });
    }

    // Alt API from Steam (but missing deleted packages): http://store.steampowered.com/api/packagedetails?packageids=116814
    function fetchSubAppIds(subid, callback) {
        const cachedSubAppids = getCachedSubAppids(subid);
        if (cachedSubAppids !== undefined)
            return callback(cachedSubAppids);
        GM_xmlhttpRequest({
            "method": "GET",
            "url": "https://steamdb.info/sub/"+subid+"/apps/",
            "onload": function(response) {
                if (!response.responseText.includes("No package was found matching this SubID")) {
                    var appids = $(".app[data-appid]", response.responseText).map(function() {
                        return parseInt(this.getAttribute("data-appid"));
                    }).get();
                    setCachedSubAppids(subid, appids);
                    return callback(appids);
                }
                console.log("Could not get details for sub " + subid);
                callback();
            },
        });
    }

    function loopWinners(appids, isSubId) {
        if (isSubId === true)
            fetchSubAppIds(appids[0], loopWinners);
        else
            $("p.table__column__heading a").each(function(){
                var self = $(this);
                fetchSteamID(self.text(), (sid) => steamIDRetrieved(sid, appids, self.parents("div:first")));
            });
    }

    function addStatsToPage() {
        const steamGameUrl = $("div.featured__inner-wrap a.global__image-outer-wrap").attr('href');
        var appids = [ parseInt(steamGameUrl.match(/\/(\d+)/)[1]) ];
        loopWinners(appids, steamGameUrl.includes("/sub"));
    }

    function makeLink(e) {
        e.css("cursor", "pointer");
        e.mouseenter(function(){$(this).css("text-decoration", "underline");
            }).mouseleave(function(){$(this).css("text-decoration", "");});
    }

    if (STEAM_API_KEY === undefined) {
        var apiDiv = $(`<form><input id="DTEP_SteamApiKey" style="margin-left: 15px; width: 300px" type="text" value="STEAM_API_KEY_HERE"/>
<input style="float:left;" name="btnSubmit" type="button" value="Submit"></input></form>`);
        apiDiv.find("input[name='btnSubmit']").click(function(){
            const api_key = $("#DTEP_SteamApiKey").val();
            if (api_key.match(API_KEY_REGEXP)) {
                GM_setValue("STEAM_API_KEY", api_key);
                $(this).parent().text(" - API key set");
            } else
                alert("Error: Invalid API Key. Please try again.");
        });
        $("div.page__heading__breadcrumbs").append(apiDiv);
    } else {
        var apiDelDiv = $(`<div style="margin-left: 15px"><a>Delete API Key for Did they even play?</a></div>`);
        apiDelDiv.find("a").one("click", function(){
            $(this).parent().text("Deleted");
            GM_deleteValue("STEAM_API_KEY");
        });
        makeLink(apiDelDiv.find("a"));
        $("div.page__heading__breadcrumbs").append(apiDelDiv);
        addStatsToPage();
    }
})();