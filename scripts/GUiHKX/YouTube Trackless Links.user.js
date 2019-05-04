// ==UserScript==
// @name YouTube Trackless Links
// @description Removes the "/redirect" URL tracker in the description of YouTube videos
// @version 2018.10.15
// @author guihkx
// @match https://*.youtube.com/*
// @license MIT; https://opensource.org/licenses/MIT
// @run-at document-start
// @namespace https://github.com/guihkx
// @icon https://s.ytimg.com/yts/img/favicon_48-vflVjB_Qk.png
// @homepageURL https://github.com/guihkx/user-scripts
// @supportURL https://github.com/guihkx/user-scripts/issues
// ==/UserScript==

var polymer_disabled, id, desc_selector, desc_node;

polymer_disabled = is_polymer_disabled();
id = setInterval(wait_for_yt_description, 500);

function wait_for_yt_description()
{
    "use strict";

    var event_name;

    if(polymer_disabled) {
        desc_selector = "p#eow-description";
        event_name = "spfdone";
    }
    else {
        desc_selector = "#description yt-formatted-string";
        event_name = "yt-page-data-updated";
    }
    // Description node
    desc_node = document.querySelector(desc_selector);

    if(desc_node !== null) {
        clearInterval(id);
        fix_urls_in_description();

        document.addEventListener(event_name, fix_urls_in_description);
    }
}

function is_polymer_disabled()
{
    "use strict";

    var is_disabled, cookie_prefs;

    is_disabled = get_query_string("disable_polymer", window.location);

    if(is_disabled === "true" || is_disabled === "1") {
        return true;
    }
    cookie_prefs = get_yt_cookie("PREF");

    // f6=8 or f6=9 -> Classic/Legacy/SPF YouTube is enabled
    if(/f6=[89]/.test(cookie_prefs)) {
        return true;
    }
    return false;
}

function fix_urls_in_description()
{
    "use strict";

    var anchors, total, i, anchor, url, redir_url, fixed_url;

    desc_node = document.querySelector(desc_selector);

    if(desc_node === null) {
        // Not a video
        return;
    }
    anchors = desc_node.getElementsByTagName("a");
    total = anchors.length;

    for(i = 0; i < total; i++) {
        anchor = anchors[i];
        url = anchor.href;

        // Ignore hashtags
        if(anchor.innerText[0] === "#") {
            continue;
        }
        if(anchor.pathname === "/redirect") {
            redir_url = get_query_string("q", anchor);

            if(redir_url !== null) {
                fixed_url = redir_url.trim();
                anchor.href = fixed_url;
                anchor.innerText = fixed_url;
            }
            else {
                console.error("[YTTL] Unable to extract URL from /redirect: " + anchor);
            }
        }
        // It's an URL within the YouTube domain
        else {
            anchor.innerText = url;
        }
    }
}

function get_query_string(name, obj_url)
{
    "use strict";

    var re, matches;

    re = new RegExp("[?&]" + name + "=([^&#]*)");
    matches = obj_url.search.match(re);

    return (matches === null) ? null : decodeURIComponent(matches[1]);
}

function get_yt_cookie(name)
{
    "use strict";

    var cookie, re, matches;

    cookie = "; " + document.cookie;

    re = new RegExp("; " + name + "=([^;]*)");
    matches = cookie.match(re);

    return (matches === null) ? null : matches[1];
}

