// ==UserScript==
// @name         Pixiv Decrement
// @namespace    https://greasyfork.org/en/users/50-couchy
// @version      20150708
// @homepageURL  https://greasyfork.org/en/scripts/9979-pixiv-decrement
// @supportURL   https://greasyfork.org/en/scripts/9979-pixiv-decrement
// @description  A light-weight script for pixiv AJAX browsing
// @author       Couchy
// @match        http://www.pixiv.net/search.php?*
// @match        http://www.pixiv.net/member_illust.php?id=*
// @grant        none
// ==/UserScript==

var globalIllustData = {};

var nextPagePending = false;
var nextPageNumber = 2;
var pageFinder = /&p=([0-9])+/;
var firstPageURL = document.location.href.replace(pageFinder, "");
if (pageFinder.test(document.location.href)) {
    nextPageNumber = parseInt(document.location.href.match(pageFinder)[1]) + 1;
}

var showPreviewTimeout = null;
var hidePreviewTimeout = null;
var ugoiraPlayer = null;

var mainContainer = document.querySelector(".column-search-result") || document.querySelector("._image-items").parentNode;

var previewBox = document.createElement("div");
var sizeDetector = document.createElement("iframe");
var infoBar = document.createElement("div");
var imageContent = document.createElement("div");

previewBox.setAttribute("style", "position:absolute; z-index:100; top: 0px; left: 0px; max-width: " + mainContainer.offsetWidth + "px; background-color: #e4e7ee; border: 2px solid #0069b1; visibility: hidden; display: table;");
sizeDetector.setAttribute("style", "position: absolute; width: 100%; height: 100%; border: 0; z-index: -100;");
infoBar.setAttribute("style", "width: 100%; padding: 3px; box-sizing: border-box;");
imageContent.setAttribute("style", "width: 100%; box-sizing: border-box;");

previewBox.appendChild(sizeDetector);
previewBox.appendChild(infoBar);
previewBox.appendChild(imageContent);
document.body.appendChild(previewBox);

function getThumbnails(pageURL, callback) {
    if (typeof callback !== "function") {
        callback = function(x) {};
    }
    var xhr = new XMLHttpRequest();
    xhr.open("GET", pageURL);
    xhr.onload = function() {
        var div = null;
        var thumbnailMatch = xhr.responseText.match(/(<ul class="_image-items[^]*?<\/ul>)(<\/section>|<\/div>)/);
        if (thumbnailMatch !== null) {
            div = document.createElement("div");
            div.innerHTML = thumbnailMatch[1];
        }
        callback(div);
    };
    xhr.onerror = function() {
        callback(null);
    };
    xhr.send();
}

function getIllustData(thumbnailContainer, callback) {
    if (typeof callback !== "function") {
        callback = function(x) {};
    }
    var thumbnails = thumbnailContainer.getElementsByClassName("work");
    var illustIds = [];
    for (var i = 0; i < thumbnails.length; i++) {
        illustIds.push(thumbnails[i].getAttribute("href").match(/[0-9]+/));
    }
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://www.pixiv.net/rpc/index.php?mode=get_illust_detail_by_ids&illust_ids=" + illustIds.join());
    xhr.onload = function() {
        var illustData = null;
        try {
            var json = JSON.parse(xhr.responseText);
            if (json.error === false) {
                illustData = json.body;
            } else {
                console.error(json.message || "Pixiv-- API is dead?");
            }
        } catch (err) {
            console.error(err);
        } finally {
            callback(illustData);
        }
    };
    xhr.onerror = function() {
        callback(null);
    };
    xhr.send();
}

function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
    while (element) {
        xPosition += element.offsetLeft;
        yPosition += element.offsetTop;
        element = element.offsetParent;
    }
    return {
        x: xPosition,
        y: yPosition
    };
}

var mainContainerPos = getPosition(mainContainer);
function repositionPreviewbox() {
    var previewBoxLeft = parseInt(previewBox.style.left);
    var overlap = (previewBoxLeft + previewBox.offsetWidth) - (mainContainerPos.x + mainContainer.offsetWidth);
    if (overlap > 0) {
        previewBox.style.left = (previewBoxLeft - overlap) + "px";
    }
}
sizeDetector.contentWindow.addEventListener("resize", repositionPreviewbox, false);

function showPreview(workContainer) {
    var data = globalIllustData[workContainer.getElementsByClassName("work")[0].getAttribute("href").match(/[0-9]+/)];
    if (data === undefined) {
        return;
    }
    var bookmarks = (workContainer.getElementsByClassName("bookmark-count").length > 0) ? parseInt(workContainer.getElementsByClassName("bookmark-count")[0].textContent) : -1;
    var pages = parseInt(data.illust_page_count);
    infoBar.innerHTML = '' +
        '<a href="/member_illust.php?mode=medium&illust_id=' + data.illust_id + '" class="title" style="font-weight: bold; margin-right: 5px;">' + data.illust_title + '</a>' +
        '(<a href="/member_illust.php?id=' + data.user_id + '" class="user ui-profile-popup" title="' + data.user_name + '" data-user_id="' + data.user_id + '" data-user_name="' + data.user_name + '">' + data.user_name + '</a>)' +
        ((bookmarks > -1)  ? ('<a href="/bookmark_detail.php?illust_id=' + data.illust_id + '" class="bookmark-count _ui-tooltip" data-tooltip="' + (new Number(bookmarks)).toLocaleString() + ' Bookmark' + (bookmarks === 1 ? "" : "s") + '" style="margin-left: 5px;"><i class="_icon sprites-bookmark-badge"></i>' + bookmarks + '</a>') : '');
    var actionLink = document.createElement("a");
    actionLink.setAttribute("style", "margin-left: 5px;");
    infoBar.appendChild(actionLink);

    if (data.ugoira_meta !== null) { //ugoira
        actionLink.textContent = "[Download Zip]";
        actionLink.setAttribute("href", data.url.ugoira600x600);
        imageContent.innerHTML = '<div class="_ugoku-illust-player-container"><div class="wrapper"><div class="_spinner"></div><div class="player toggle"></div></div></div>';
        ugoiraPlayer = new pixiv.UgokuIllustPlayer(imageContent.firstElementChild, JSON.parse(data.ugoira_meta), {
            autoStart: true,
            autoSize: true
        });
    } else if (pages > 1) {
        actionLink.textContent = "[View Manga]";
        actionLink.setAttribute("href", "/member_illust.php?mode=manga&illust_id=" + data.illust_id);
        var isOldManga = (data.url["240mw"].indexOf("_240mw.") !== -1);
        var thumbnailurl = isOldManga ? data.url["240mw"].replace("_240mw.", "_240mw_p0.") : workContainer.getElementsByClassName("_thumbnail")[0].getAttribute("src");
        var bigurl = isOldManga ? data.url.big.replace(/\.(.{3,4})$/, "_p0.$1") : data.url.big;
        var html = "";
        for (var i = 0; i < pages; i++) {
            html += '<a href="' + bigurl.replace("_p0", "_p" + i) + '""><img src="' + thumbnailurl.replace("_p0", "_p" + i) + '" style="border: 1px solid #e4e7ee; max-width: 150px; max-height: 150px;"/></a>';
        }
        imageContent.innerHTML = html;
    } else {
        actionLink.textContent = "[View Full]";
        actionLink.setAttribute("href", data.url.big);
        imageContent.innerHTML = '<a href="' + data.url.big + '"><img src="' + data.url.m + '"/></a>';
    }
    var pos = getPosition(workContainer.getElementsByClassName("work")[0]);
    previewBox.style.top = pos.y + "px";
    previewBox.style.left = pos.x + "px";
    repositionPreviewbox();
    previewBox.style.visibility = "visible";
}

function hidePreview() {
    previewBox.style.visibility = "hidden";
    if (ugoiraPlayer !== null) {
        ugoiraPlayer.dispose();
        ugoiraPlayer = null;
    }
}

function addListeners() {
    mainContainer.addEventListener("mouseover", function(e) {
        var el = e.target;
        if (el.getAttribute("class") === "_layout-thumbnail") {
            e.stopPropagation();
            showPreviewTimeout = setTimeout(function() {
                showPreview(el.parentNode.parentNode);
            }, 1000);
        }
    }, false);

    mainContainer.addEventListener("mouseout", function(e) {
        var el = e.target;
        if (el.getAttribute("class") === "_layout-thumbnail") {
            e.stopPropagation();
            clearTimeout(showPreviewTimeout);
        }
    }, false);

    previewBox.addEventListener("mouseout", function(e) {
        hidePreviewTimeout = setTimeout(hidePreview, 1000);
    }, true);

    previewBox.addEventListener("mouseover", function(e) {
        clearTimeout(hidePreviewTimeout);
    }, true);

    window.addEventListener("scroll", function(e) {
        var scrollHeight = document.documentElement.scrollHeight;
        var clientHeight = document.documentElement.clientHeight;
        var scrollPos = window.pageYOffset;
        if (!nextPagePending && ((scrollHeight - (scrollPos + clientHeight)) < 100)) {
            nextPagePending = true;
            var nextPageURL = firstPageURL + "&p=" + nextPageNumber;
            getThumbnails(nextPageURL, function(thumbnailContainer) {
                if (thumbnailContainer !== null) {
                    getIllustData(thumbnailContainer, function(illustData) {
                        if (illustData !== null) {
                            for (var id in illustData) {
                                globalIllustData[id] = illustData[id];
                            }
                            var pageNumberStamp = document.createElement("a");
                            pageNumberStamp.setAttribute("style", "top: 0px; left: 0px;");
                            pageNumberStamp.setAttribute("href", nextPageURL);
                            pageNumberStamp.textContent = "Page " + nextPageNumber;
                            thumbnailContainer.insertBefore(pageNumberStamp, thumbnailContainer.firstElementChild);
                            mainContainer.appendChild(thumbnailContainer);
                            nextPageNumber++;
                        } else {
                            console.error("Pixiv-- Couldn't get illustData");
                        }
                        nextPagePending = false;
                    });
                } else {
                    console.error("Pixiv-- couldn't get thumbnailContainer");
                    nextPagePagePending = false;
                }
            });
        }
    }, false);
    
    window.addEventListener("beforeunload", function(e){
        clearTimeout(showPreviewTimeout);
    }, false);
}

getIllustData(mainContainer, function(illustData) {
    if (illustData !== null) {
        for (var id in illustData) {
            globalIllustData[id] = illustData[id];
        }
        addListeners();
    }
});