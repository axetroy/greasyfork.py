// ==UserScript==
// @name         Barter.vg, Thumbnail
// @namespace    http://tampermonkey.net/
// @version      0.5.7
// @description  always show thumbnail of game
// @author       You
// @match        https://barter.vg/*
// @grant        none
// @run-at       document-end
// @nowrap
// ==/UserScript==
(function() {
    var STORAGE_KEY = "BarterToSteamThumbnailMaps";
    var inBundle = location.pathname.indexOf("/bundles/") == 0 || location.pathname.indexOf("/bundle/") == 0;
    var inGiveways = location.pathname.indexOf("/giveways/") == 0;
    var inBrowse = location.pathname.indexOf("/browse/") == 0;
    var inWishlist = location.pathname.indexOf("/w/") > 0;
    var inTradable = location.pathname.indexOf("/t/") > 0;
    var inBlacklist = location.pathname.indexOf("/b/") > 0;
    var inScrachpad = location.pathname.indexOf("/c/") > 0;
    var inLibrary = location.pathname.indexOf("/l/") > 0;
    var inOffer = location.pathname.indexOf("/o/") > 0;
    var inInfo = location.pathname.indexOf("/i/") == 0;
    var inTraded = location.pathname.indexOf("/d/") > 0;
    var inFulfilled = location.pathname.indexOf("/f/") > 0;
    var isMatching = location.pathname.indexOf("/m/") > 0;
    var isEditing = location.pathname.indexOf("/e/") > 0;
    var isTurnOffImage = false;
    var isTurnOffElement = document.querySelector(".platform a[href*='?filter=']");
    if (isTurnOffElement) {
        isTurnOffImage = isTurnOffElement.href.split(",")[3].indexOf("1") == 0;
    }

    console.log({
        w: inWishlist,
        t: inTradable,
        b: inBlacklist,
        c: inScrachpad,
        e: isEditing,
        isTurnOffImage: isTurnOffImage
    });

    var lazyLoading = [];

    var thumbnailsMap = {};
    var map = localStorage[STORAGE_KEY];
    if (map) {
        thumbnailsMap = JSON.parse(map);
    }

    // find in parant elements
    function closest(el, selector) {
        if (!document.documentElement.contains(el)) return null;
        do {
            if (el.matches(selector)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    }

    function makeThumbUrl(sid) {
        return "https://steamcdn-a.akamaihd.net/steam/apps/" + sid + "/capsule_184x69.jpg";
    }

    function makeHeaderUrl (sid) {
        return "https://steamcdn-a.akamaihd.net/steam/subs/" + sid + "/header_586x192.jpg";
    }

    function tMatching(e, bid, isSub) {
        var li = e.parentNode;
        var sid = thumbnailsMap[bid];
        if (sid) {
            var background = "url(" + makeThumbUrl(sid) + ")";
            if (isSub) {
                background = "url(" + makeHeaderUrl(sid) + "), " + background;
            }

            var bg = document.createElement("div");
            bg.setAttribute("isMutching", "");
            bg.style.backgroundImage = "url(--var-noimage)";
            li.insertBefore(bg, e.nextSibling);

            lazyLoading.push({
                element: bg,
                backgroundImage: background + ", url(--var-noimage)",
                rect: bg.getBoundingClientRect()
            });

            return;
        }

        var mm = document.querySelector("#mutualMatches");
        if (!mm) return;

        var m = mm.querySelectorAll(".listH a, .listW a");
        for (var j = 0; j < m.length; j++) {
            var a = m[j];
            var bid = a.href.match(/\d+/g)[0];
            if (thumbnailsMap[bid]) continue;

            var sid = thumbnailsMap[bid];
            var mbg = document.createElement("div");
            mbg.setAttribute("isMutching", "");
            mbg.style.backgroundImage = "url(--var-noimage)";
            a.appendChild(mbg);

            lazyLoading.push({
                element: mbg,
                backgroundImage: "url(" + makeThumbUrl(sid) + "), url(" + makeHeaderUrl(sid) + "), url(--var-noimage)",
                rect: mbg.getBoundingClientRect()
            });
        }
    }

    function tElse(e, sid, isSub) {
        if (e.href.indexOf("#") >= 0) return;

        var tr = closest(e, "tr");
        if (!tr) return;

        var td = tr.querySelector("td");
        if (!td) return;

        var className = inBundle ? "inBundle" : "isTurnOff";

        tr.setAttribute(className, "");
        td.setAttribute(className, "");

        var background = "url(" + makeThumbUrl(sid) + ")";
        if (isSub) {
            background = "url(" + makeHeaderUrl(sid) + "), " + background;
        }

        if (isSub && tr.className.indexOf("included") >= 0) {
            var e = tr.nextSibling;
            if (e) {
                var next = e.querySelector("[href*='/sub/']") || e.querySelector("[href*='/app/']");
                if (next) {
                    background += ", url(" + makeThumbUrl(next.href.match(/\d+/)[0]) + ")";
                }
            }
        }
        td.style.backgroundImage = "var(--url-noimage)";

        lazyLoading.push({
            element: td,
            backgroundImage: background + ", var(--url-noimage)",
            rect: td.getBoundingClientRect()
        });

        var bid = tr.querySelector("a[href^='https://barter.vg/i/']").href.match(/\d+/g)[0];
        thumbnailsMap[bid] = sid;
    }

    function tOffer(e, eid, isSub) {
        // console.log(e);
        if (e.href.indexOf("#") >= 0) return;

        var tr = closest(e, "tr");
        if (!tr) return;

        var td = tr.querySelector("td");
        if (!td) return;

        var background = "url(" + makeThumbUrl(eid) + ")";
        if (isSub) {
            background = "url(" + makeHeaderUrl(eid) + "), " + background;
        }

        var bg = document.createElement("div");
        bg.setAttribute("inOffer", "");
        // bg.style.backgroundImage = "var(--url-noimage)";
        td.appendChild(bg);

        lazyLoading.push({
            element: bg,
            backgroundImage: background + ", var(--url-noimage)",
            parent: closest(e, "div")
        });
    }

    var scrollTimer = 0;
    function onScroll(ev) {
        if (scrollTimer > 0) return;

        scrollTimer = setTimeout(function () {
            var item, scrollTop, clientHeight, itemTop, preloadingMargin;

            for (var i = 0; i < lazyLoading.length; i++) {
                item = lazyLoading[i];

                if (inOffer) {
                    if (ev.target != item.parent) continue;
                    scrollTop = ev.target.getBoundingClientRect().top;
                    clientHeight = ev.target.clientHeight;
                    itemTop = item.element.getBoundingClientRect().top;
                    preloadingMargin = 100;
                } else {
                    scrollTop = 0;
                    clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
                    itemTop = item.element.getBoundingClientRect().top;
                    preloadingMargin = 500;
                }

                if (scrollTop - preloadingMargin < itemTop && itemTop < scrollTop + clientHeight + preloadingMargin) {
                //if (itemTop < scrollTop + preloadingMargin) {
                    item.element.style.backgroundImage = item.backgroundImage;
                    // console.log(item.element.parentNode.innerText, scrollTop, clientHeight, itemTop);
                    lazyLoading.splice(i, 1);
                    i--;
                }
            }

            scrollTimer = 0;
        }, 50);
    }

    function main () {
        if (inInfo) {
            // save thumbnail map
            var bid = location.pathname.match(/\d+/)[0];
            var sid = document.querySelector(".platform a").pathname.match(/\d+/)[0];
            thumbnailsMap[bid] = sid;
        }

        var items;
        if (inBrowse) {
            items = document.querySelectorAll(".collection tr [href^='https://steamcommunity.com/my/gamecards/']");
        } else if (isMatching) {
            items = document.querySelectorAll(".matchcol li a[href^='https://barter.vg/i/']");
        } else {
            items = document.querySelectorAll(".collection tr [href^='https://store.steampowered.com/app/'], .collection tr [href^='https://store.steampowered.com/sub/']");
        }

        if (inBundle) {
            items = Array.prototype.slice.call(items).filter(function (el) {
                return !closest(el, "tr").querySelector("td label img");
            });
        }

        // console.log("items", items);

        for (var i = 0; i < items.length; i++) {
            var e = items[i];
            var eid = e.href.match(/\d+/g)[0];
            var isSubs = e.href.indexOf("/sub/") >= 0;

            if (inOffer) {
                tOffer(e, eid, isSubs);
            } else if (inTradable || inWishlist || inBlacklist || inScrachpad || inLibrary) {
                if (isMatching) {
                    tMatching(e, eid, isSubs);
                } else {
                    tElse(e, eid, isSubs);
                }
            } else if (inBrowse || inTraded || inFulfilled || inBundle) {
                tElse(e, eid, isSubs);
            }
        }

        // console.log("lazyLoading", lazyLoading);

        localStorage[STORAGE_KEY] = JSON.stringify(thumbnailsMap);

        if (inOffer) {
            document.querySelectorAll(".collection").forEach(function (el) {
                closest(el, "div").addEventListener("scroll", onScroll);
            });
        } else {
            window.addEventListener("scroll", onScroll);
            onScroll.call();
        }

        var style = document.createElement("style");
        style.innerHTML = (function () {/*
:root { --url-noimage: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALgAAABFCAIAAAB2XbtXAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTnU1rJkAAACtUlEQVR4Xu3U0XHCMBCEYVqhFkqhEwqhD8qgFSrIhjs0x8mQDc5M/PB/T5IsS0K3eHcDDAQFFoICC0GBhaDAQlBgISiwEBRYCAosBAUWggILQYGFoMBCUGAhKLAQFFgICiwEBRaCAgtBgYWgwEJQYCEosBAUWAgKLAQFFoICC0GBhaDAssWgXC6X3a4fTIPH4zE7d+fzWdPC4XDIUVu++UxrxtPT6bTf76M9LA6KBseLMz3N1cv6Qb8oHxSLW/y7jQZFhVdVsn/XgqJ2vVBN1hVn55e01/V6zc6DFtS4Ns3+nUYkOw+aE5OzX+iRTlXDoWO3X9G22KyNBiWuvtZPg+OK1Z7/dnql1sDXNgparS0Yp5r31Ry9vhgUpWReuSaDoKwSJWm3r8FRNjUWP/WffVReBUVb1EcRiDkocUhNbkf6DtrzR3FGUFYZmaj3WIOias2llc/u/U1QJIqtCRGIFpSYE+2YMCwu2xCUVVomolEHX305orrZsb0JihpxgNYdajh0vLpOm7lIr+i3VC1t27H1oIwK/VdQtKm2HlWv5ddb40iiaXorO0uRiihIDvFFWalmQuLGa1U0MpdWPrv390HRI00YCajl12BW/qE+XVxW6hyCskoLSnRrUNRY/HKoVNn6jfdBkTqhlrm2Qy28VpBoVwTlz7SgiEpVB9Wei6SqtLdMPwalGvvOh5Q2qODOKxOUPzPXQNet+62DKmS9cXU/+5zIZ0F5VeN6Kq2gU9VpatdzEpRV5qCIRtpglCGo2DlqyzefjXC8D0oEN0YaHVLvZucul75r59TkfPAsH2/JFs+EDSIosBAUWAgKLAQFFoICC0GBhaDAQlBgISiwEBRYCAosBAUWggILQYGFoMBCUGAhKLAQFFgICiwEBRaCAgtBgYWgwEJQYCEosBAUWAgKDLfbFwWyh3Z/cFGwAAAAAElFTkSuQmCC); }
.mh a, .mw a { display: inline-block; position: relative; }
.matchcol li { position: relative; }
.matchcol .showMoreArea { margin-top: 2px; }
.collection tr { position: relative; }
.collection td {
    z-index: 2;
    padding-top: .3em;
    padding-bottom: .3em;
    vertical-align: middle;
}
[isMutching] {
    position: absolute;
    width: 190px;
    left: 150px; top: 0; bottom: 0;
    z-index: -10;
    opacity: 0.5;
    background-repeat: no-repeat !important;
    background-position: left center !important;
    background-size: cover !important;
    height: 2em;
}
.collection td[inBundle] {
    width: unset;
    padding-left: 190px;
    background-position: 2px center !important;
    background-repeat: no-repeat !important;
    background-size: 184px auto !important;
}
.collection td[isTurnOff] {
    background-position: 2px center !important;
    background-repeat: no-repeat !important;
    padding-left: 190px;
    background-size: 184px auto !important;
}
div[inOffer] {
    position: absolute;
    width: 150px;
    right: 100px; top: 1px; bottom: 0;
    z-index: 1; pointer-events: none; opacity: 0.5;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    background-position: left center;
}
.collection th a:visited, .matchcol a:visited { color: #00f !important; }
#listEdit { z-index: 100; }"
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
        document.querySelector("head").appendChild(style);
    }
    main();
    // console.log("running thumbnail");    // Your code here...
})();