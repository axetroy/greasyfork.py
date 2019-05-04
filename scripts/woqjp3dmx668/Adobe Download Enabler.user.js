// ==UserScript==
// @name         Adobe Download Enabler
// @namespace    https://greasyfork.org/users/4300
// @version      1.0.1
// @description  Enable Direct Download of Adobe Creative Cloud applications.
// @include      *
// @author       CODYQX4
// @grant        none
// ==/UserScript==

// ProDesignTools Link Rewriter - Go Direct to Adobe
var links = document.querySelectorAll('a[href*="http://prodesigntools.com/trials"]');
var text, i;
for (i = 0; i < links.length; i++)
{
    text = links[i].href.replace('http://prodesigntools.com/', '');
    text = text.replace('trials2/', 'http://trials3.adobe.com/');
    text = text.replace('trials3/', 'http://trials3.adobe.com/');
    links[i].href = text;
}

// Check for Required Cookie if on Adobe
if (window.location.host.indexOf("adobe.com") > -1)
{
    var cookie = getCookie("MM_TRIALS");
    if (cookie === "")
    {
        // Set Cookie and Refresh Page
        document.cookie = "MM_TRIALS=1;path=/;domain=adobe.com";
        location.reload(true);
    }
}

// Get Cookie Helper Function
function getCookie(cname)
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++)
    {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return "";
}
