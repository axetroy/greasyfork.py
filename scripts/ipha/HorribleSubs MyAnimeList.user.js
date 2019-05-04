// ==UserScript==
// @name        HorribleSubs MyAnimeList
// @namespace   http://tampermonkey.net/
// @version     1.2.0
// @description Adds MyAnimeList links for each show in release list
// @author      ipha
// @license     WTFPL
// @match       https://horriblesubs.info/
// @connect     myanimelist.net
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @grant       GM_setValue
// @grant       GM_getValue
// ==/UserScript==


// Watch for changes on release list
var mutationConfig = {
    attributes: false,
    childList: true,
    subtree: false
};

function mutationCallback(mutationsList) {
    for (var mutation of mutationsList) {
        if (mutation.type == 'childList') {
            addBadges();
        }
    }
}

var observer = new MutationObserver(mutationCallback);
observer.observe(document.querySelector('.latest-releases'), mutationConfig);

// Time to keep cached URLs
// Two weeks in ms
const CACHE_VALID_TIME = 1000 * 60 * 60 * 24 * 14;

// Save URL and timestamp in cache
function setCache(name, url) {
    GM_setValue(name, [url, Date.now()]);
}

// Fetch URL from cache
function getCache(name) {
    var cache = GM_getValue(name, undefined)
    if(cache && ((Date.now() - cache[1]) < CACHE_VALID_TIME)) {
        return cache[0];
    } else {
        return undefined;
    }
}

// Search MAL for 'name'. Returns first result of type 'TV'
// TODO: This probably doesn't work for OVAs
function fetchLink(name, callback) {
    var ret = GM_xmlhttpRequest({
        method: "GET",
        responseType: "json",
        url: "https://myanimelist.net/search/prefix.json?type=anime&keyword=" + encodeURIComponent(name),
        onload: function(res) {
            var items = res.response.categories[0].items;
            for(var item in items) {
                if(items[item].payload.media_type == "TV") {
                    setCache(name, items[item].url);
                    callback(items[item].url);
                    break;
                }
            }
            // No TV result found, return first result
            setCache(name, items[0].url);
            callback(items[0].url);
        }
    });
}

// Add MAL badge next to release resolutions
function addBadges() {
    // var time = Date.now()
    document.querySelectorAll('.latest-releases ul > li .latest-releases-res').forEach(function(item) {
        if(item.lastElementChild.textContent != "MAL") {
            var name = item.closest("a").childNodes[1].nodeValue.replace(" - ", "");
            var s = document.createElement("span");
            var a = document.createElement("a");
            s.appendChild(a);
            a.append("MAL");
            s.classList.add("badge");
            s.classList.add("badge-mal");
            a.classList.add("badge");
            s.addEventListener("click", MALClick);
            item.appendChild(s);

            var cachedURL = getCache(name);
            if(cachedURL) {
                // console.log("Cache hit for:", name);
                a.href = cachedURL;
                // console.log(Date.now() - time);
            } else {
                // console.log("Cache miss for:", name);
                fetchLink(name, function(url) {
                    a.href = url;
                    // console.log(Date.now() - time);
                });
            }
        }
    });
}

// Stop actions from other userscripts
function MALClick(event) {
    event.stopPropagation();
}

// Fix link styles
// TODO: Fix hover background
GM_addStyle('a.badge { margin: 0px; padding: 3px 7px; color: #FFFFFF; background-color: unset !important; }');
GM_addStyle('a.badge:hover { color: #6B6B6B; }');
GM_addStyle('.badge-mal { margin: 0px; padding: 0px; }');

// Sometimes the list before the observer is set up
addBadges();