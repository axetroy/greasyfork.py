// ==UserScript==
// @name         MyAnimeList(MAL) - PM Enhancement Suite
// @version      1.0.7
// @description  Change the message layout to that of the comment section.
// @author       Cpt_mathix
// @match        *://myanimelist.net/mymessages.php*
// @grant        GM_getValue
// @grant        GM_setValue
// @namespace https://greasyfork.org/users/16080
// ==/UserScript==

var messages;
var url = document.location.href;
if (url.indexOf("go=read") > -1 && url.indexOf("threadid") > -1) {
    messages = document.querySelector('#content > div > div > div > table');
    init();
} else if (url.indexOf("go=send") > -1 && url.indexOf("threadid") > -1) {
    messages = document.querySelector('#content > div > div > table');
    init();
}

function init() {
    messages.setAttribute("cellspacing", "0");

    var count = 0;
    var elements = messages.querySelectorAll('tbody > tr:nth-child(n)');

    for (var i = 0; i < elements.length; i++) {
        var time = elements[i].querySelector('td:nth-child(1)').textContent;
        var name = elements[i].querySelector('td:nth-child(2)').textContent.replace(':','');
        var link = elements[i].querySelector('td:nth-child(2)').innerHTML.replace(/:|ml8|mr8/g,'');
        var text = elements[i].querySelector('td:nth-child(3)').innerHTML;

        var id;
        if (GM_getValue(name) === undefined) {
            id = getUserId(name);
            GM_setValue(name, id);
        } else {
            id = GM_getValue(name);
        }

        count++;
        elements[i].innerHTML = changeStyle(time, name, link, text, count, id);

        if (count == 1) {
            count = -1;
        }
    }
    messages.setAttribute("table-layout", "fixed");
    messages.setAttribute("style", "width:" + messages.parentNode.style.width);

    var images = messages.querySelectorAll("img");
    for (var j = 0; j < images.length; j++) {
        images[j].onload = function(el) {
            if (el.target.width > 744) {
                el.target.width = 744;
            }
        };
    }
}

function changeStyle(time, name, link, text, bgColor, userid) {
    var strVar = "";
    strVar += "<tr width=\"810px\" class=\"borderClass bgColor" + bgColor + "\">";
    strVar += "		<td valign=\"top\" width=\"60\" class=\"borderClass bgColor" + bgColor + "\" style=\"border: 0;\"><div class=\"picSurround\">";
    strVar += " 		<a href=\"\/profile\/" + name + "\"><img src=\"https:\/\/myanimelist.cdn-dena.com\/images\/userimages\/thumbs\/" + userid + "_thumb.jpg\" border=\"0\"><\/a><\/div><\/td>";
    strVar += "		<td class=\"borderClass bgColor" + bgColor + "\" align=\"left\" style=\"border: 0;\" valign=\"top\">";
    strVar += "			<div>";
    strVar += "				<div><a href=\"\/profile\/" + name + "\">" + link + "<\/a> <small><span style=\"font-weight: normal;\"> | " + time + "<\/span><\/small><\/div>";
    strVar += "				<div class=\"spaceit\">" + text + "<\/div>";
    strVar += "			<\/div>";
    strVar += "		<\/td>";
    strVar += "<\/tr>";

    return strVar;
}

function getUserId(name) {
    var xhr = new XMLHttpRequest();
    var url = '/malappinfo.php?u=' + name + '&status=all&type=manga';
    xhr.open("GET", url, false);
    xhr.setRequestHeader('Content-Type', 'text/xml');
    xhr.send();
    var xmlDocument = xhr.responseXML;
    if (xmlDocument !== null) {
        return xmlDocument.getElementsByTagName('user_id')[0].textContent;
    } else {
        return false;
    }
}

