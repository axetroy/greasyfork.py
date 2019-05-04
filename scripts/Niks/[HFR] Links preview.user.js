// ==UserScript==
// @name         [HFR] Links preview
// @namespace    http://tampermonkey.net/
// @version      0.14
// @description  Previsualise le contenu des liens dans les posts
// @icon         http://reho.st/self/40f387c9f48884a57e8bbe05e108ed4bd59b72ce.png
// @author       Garath_
// @connect      *
// @include      https://forum.hardware.fr/forum2.php*
// @include      https://forum.hardware.fr/hfr/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

var auSurvol = true;
var links = document.querySelectorAll("td.messCase2 > div[id^='para'] > p > a.cLink, table.spoiler a.cLink" );

function truncate(str, n)
{
    var isTooLong = str.length > n,
    s_ = isTooLong ? str.substr(0,n-1) : str;
    //s_ = isTooLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
    return isTooLong ? s_ + '...' : s_;
}

function linkify(text) {
    var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;\(\)]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '">lien</a>';
    });
}

function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

function getAsin(url) {
    var asinRegex = /(?:[/dp/]|$)([A-Z0-9]{10})/;
    try {
        var match = asinRegex.exec(url);
        return match[1];
    }
    catch(error) {
        return false;
    }
}

function format(txt, link) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(txt, 'text/html');

    const metas = xmlDoc.getElementsByTagName('meta');
    var des = "";
    var title = "";
    var image = "";
    var site = "";
    var resolve = false;


    for (let i = 0; i < metas.length; i++) {
        if ( (metas[i].getAttribute('property') === "og:description")
            || (metas[i].getAttribute('name') === "og:description")
            || (metas[i].getAttribute('name') === "twitter:description")
            || (metas[i].getAttribute('name') === "description")
            || (metas[i].getAttribute('name') === "Description") ) {
            des = metas[i].getAttribute('content');
        }
        if (metas[i].getAttribute('property') === "og:title") {
            title = metas[i].getAttribute('content');
        }
        if ( (metas[i].getAttribute('property') === "og:image")
            ||(metas[i].getAttribute('name') === "og:image")
            ||(metas[i].getAttribute('name') === "twitter:image")) {
            image = metas[i].getAttribute('content');
            if (!image.includes("http")) {
                image = "http://" + extractHostname(link.href) + image;
            }
        }
        if (metas[i].getAttribute('property') === "og:site_name") {
            site = metas[i].getAttribute('content');
        }
    }

    if (title === "") {
        var t = xmlDoc.getElementsByTagName('title')[0];
        if (t) {
            title = t.innerText;
        }
    }

    if (site === "") {
        site = extractHostname(link.href);
    }

    // Traitement spécial pour ces connards d'amazon
    if (site.includes("amazon")) {
        if (image == "") {
            try {
                image = xmlDoc.getElementById("imgTagWrapperId").firstElementChild.getAttribute("data-old-hires");
            }
            catch(error) {
                var asin = getAsin(link.href);
                if (asin) {
                    image = "http://images.amazon.com/images/P/" + asin + "._PE30_PI_SCMZZZZZZZ_.jpg";
                }
            }
        }
    }

    var newLink = document.createElement("div");
    newLink.style.cssText = "background-color: white; margin-bottom: 5px; border:1px; border-style:solid; border-color:#C0C0C0; border-radius:5px; padding: 5px; overflow:hidden; max-width:550px; box-shadow: 0px 5px 15px #888888;"

    if (image) {
        var img = document.createElement("img");
        img.setAttribute("src", image);
        img.style.cssText = "float:left; margin-right:3px; max-height:100px; max-width:100px";
        newLink.appendChild(img);

        resolve = true;
    }

    if (title) {
        var a = document.createElement("a");
        a.setAttribute("href", link.href);
        a.setAttribute("target", "_blank");
        a.style.cssText = "color: black; font-weight: 550; font-size: 10px;";
        a.appendChild(document.createTextNode(title));
        newLink.appendChild(a);
    }

    if (site) {
        newLink.appendChild(document.createElement("br"));
        var s = document.createElement("span");
        s.style.cssText = "color: #808080; font-size: 0.8em;"
        s.appendChild(document.createTextNode(site));
        newLink.appendChild(s);
    }

    if (des) {
        if (des.localeCompare(title) != 0) {
            newLink.appendChild(document.createElement("br"));
            newLink.appendChild(document.createElement("br"));
            var desc = document.createElement("div");
            if (image) {
                desc.style.cssText = "margin-left: 103px;";
            }
            desc.style.cssText += "text-align: justify;";
            desc.innerHTML += linkify(truncate(des, 300));
            newLink.appendChild(desc);

            resolve = true;
        }
    }

    if (resolve) {
        if (!link.innerText.includes("http")) {
            var sp = document.createElement("span");
            sp.appendChild(document.createTextNode(link.innerText));
            link.parentNode.insertBefore(sp, link);
        }
        return newLink;
    }
    else {
        return document.createElement("div");
    }
}

function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
}

function requestContentOnMouse() {
    var link = this;
    requestContent(link);
}

function requestContent(link) {
    var throbber = "https://reho.st/self/dac55ec424cfc42fd04392c6d7b984ee4dd9d4be.png";

    if ((link.firstElementChild == null) && !link.getAttribute("checked")) {
        var img = document.createElement("img");
        img.setAttribute("src", throbber);
        link.appendChild(img);
    }

    makeRequest(link, img);
}

function makeRequest(link, throbber) {
     GM_xmlhttpRequest({
        method: "GET",
        url: link.href,
        mozAnon: true,
        anonymous: true,
        onload: function(response) {
            var newLink = format(response.responseText, link);
            if (newLink.innerHTML != "") {
                link.parentNode.replaceChild(newLink, link);
            }
            else {
                link.removeChild(throbber);
                link.setAttribute("checked", "true");
            }
        }
    });
}

function filter(link) {
    try {
        if (link.firstChild.nodeName == "IMG") {
            return false;
        }
        else if (link.href.includes("forum.hardware.fr")) {
            return false;
        }
        else {
            return true;
        }
    }
    catch(error) {
        return true;
    }
}

if (auSurvol) {
     for(let link of links) {
         if (filter(link)) {
             link.addEventListener("mouseover", requestContentOnMouse, false);
         }
     }
}
else {
    window.addEventListener('scroll', function(e) {
    for(let link of links) {
        if (filter(link) && isScrolledIntoView(link)) {
               requestContent(link);
        }
    }
});
}

