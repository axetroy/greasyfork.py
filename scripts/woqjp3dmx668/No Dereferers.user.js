// ==UserScript==
// @name         No Dereferers
// @namespace    https://greasyfork.org/users/4300
// @version      1.1.3
// @description  Remove Dereferers from Links
// @include      *
// @author       CODYQX4
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$(document).ready(function()
{
    $("a").each(function()
    {
        // Get Link URL
        var href = $(this).attr("href");
        if (href !== undefined)
        {
            // Remove Referers
            if (getBaseURL().indexOf("airvpn.org") != -1 && href.indexOf("/external_link/?url=") !== -1)
            {
                href = getResolvedURL(href, window.location.href);
                href = href.replace(/http?s:\/\/(www.|)airvpn.org\/external_link\/\?url\=/, "");
                href = decodeURIComponent(href);
            }
            else if (href.indexOf("anonym.to") !== -1)
            {
                href = href.replace(/https?:\/\/(www.|)anonym\.to\/\?/, "");
            }
            else if (href.indexOf("anonymz.com") !== -1)
            {
                href = href.replace(/https?:\/\/(www.|)anonymz\.com\/\?/, "");
            }
            else if (href.indexOf("derefer.it") !== -1)
            {
                href = href.replace(/https?:\/\/(www.|)derefer\.it\//, "");
            }
            else if (href.indexOf("hidemyass.com") !== -1)
            {
                href = href.replace(/https?:\/\/(www.|)hidemyass\.com\/\?/, "");
            }
            // Replace URL
            $(this).attr("href", href);
        }
    });
});

// Get Base URL
function getBaseURL()
{
    return location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/";
}

// Resolve URLs
function getResolvedURL(url, base_url)
{
    var doc = document;
    var old_base = doc.getElementsByTagName('base')[0];
    var old_href = old_base && old_base.href;
    var doc_head = doc.head || doc.getElementsByTagName('head')[0];
    var our_base = old_base || doc_head.appendChild(doc.createElement('base'));
    var resolver = doc.createElement('a');
    var resolved_url;

    our_base.href = base_url;
    resolver.href = url;
    resolved_url = resolver.href; // browser magic at work here

    if (old_base) old_base.href = old_href;
    else doc_head.removeChild(our_base);
    return resolved_url;
}
