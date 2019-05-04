// ==UserScript==
// https://greasyfork.org/scripts/26513-mangaupdates-cover-preview/
// @name        mangaupdates Cover Preview
// @namespace   szMangaupdatesCoverPreview
// @include     https://www.mangaupdates.com/*
// @include     http://www.mangaupdates.com/*
// @version     1.3.3
// @description Previews covers in mangaupdates.com when hovering over hyperlinks that lead to novel pages.
// @grant       GM_xmlhttpRequest
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
// @run-at   	document-end
// @require     http://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @license     http://creativecommons.org/licenses/by-nc-sa/4.0/
// ==/UserScript==
const MAXCACHEAGE = 24 * 60 * 60 * 1000; // Max Age before Cached data gets overridden with current data. Max Age is 24 hour in milliseconds  //days * h * min  * sec * ms
var STYLESHEETHIJACKFORBACKGROUND = ""; //if unknown set empty ""; classname without leading dot
var STYLESHEETHIJACKFORTITLE = ""; //if unknown set empty ""; classname without leading dot
const DEFAULTTITLEBACKGROUNDCOLOR = '#aac'; //if no hijack class style available use plain color
const DEFAULTBACKGROUNDCOLOR = '#ccc'; //if no hijack class style available use plain color

const SELECTOR1 = 'div.col-6 a, div.p-1 a, div.p-2 a'; //index/readinglist pages/author
const SELECTOR2 = ''; //individual serie pages recommendation titles
const PREDIFINEDNATIVTITLE = "Click for series info, Series Info"; //forum, index
const INDIVIDUALPAGETEST = /series\.html\?id\=[0-9]*$/;
const IMAGELINKCONTAINERS = '.sContent'; //instead of single element class name with dot
const IMAGEBLOCKER = "www.mangaupdates.com/images/stat_increase.gif, www.mangaupdates.com/images/stat_decrease.gif"; //tested with string.match(). no need for prefixed http https in url. Can even be just the file name
const CONTAINERNUMBER = 0;
const preloadUrlRequests = true;
const preloadImages = false;
//^^^^	frontend settings over this line	^^^^

const DEBUGLOG = false; //de-/activate console.log();
const HASERROR = true;
const RE = /\s*,\s*/; //Regex for split and remove empty spaces
var defaultHeight = "400px";
var IMAGEBLOCKERARRAY = IMAGEBLOCKER.split(RE);
var PREDIFINEDNATIVTITLEARRAY = PREDIFINEDNATIVTITLE.split(RE)
var onHover = false;
var currentTitelHover;
var windowCached = $(window);
var concatenatedSelectors = $(concatSelector());
var style = 1;
var popover;

//http://stackoverflow.com/questions/1215392/how-to-quickly-and-conveniently-disable-all-console-log-statements-in-my-code
var logger = function () {
    var oldConsoleLog = null;
    var pub = {};

    pub.enableLogger = function enableLogger() {
        if (oldConsoleLog === null)
            return;

        window.console.log = oldConsoleLog;
    };

    pub.disableLogger = function disableLogger() {
        oldConsoleLog = console.log;
        window.console.log = function () { };
    };

    return pub;
} ();

$(document).ready(
    function () {
        if (DEBUGLOG)
            logger.enableLogger();
        else
            logger.disableLogger();
    }
);

//get value from key. Decide if timestamp is older than MAXCACHEAGE than look for new image
function GM_getCachedValue(key) {
    var currentTime = Date.now();
    var rawCover = GM_getValue(key, null);
    if (!rawCover) {
        return null;
    }
    var coverData;
    try { //is json parseable data? if not delete for refreshing
        coverData = JSON.parse(rawCover);
        if (!(coverData.url && coverData.cachedTime)) //has same variable definitions?
        {
            GM_deleteValue(key);
            return null;
        }
    } catch (e) {
        GM_deleteValue(key);
        return null;
    }


    var measuredTimedifference = currentTime - coverData.cachedTime;
    if (measuredTimedifference < MAXCACHEAGE)
        return coverData.url;
    else {
        GM_deleteValue(key);
        return null;
    }
    var imageUrl = coverData.url;
    return imageUrl;
}

//set value and currenttime for key
function GM_setCachedValue(key, value) {
    var coverData = {
        url: value,
        cachedTime: Date.now()
    };
    GM_setValue(key, JSON.stringify(coverData));
}

function inBlocklist(link, targetArray) {
    if (targetArray)
        if (targetArray.length > 0)
            for (let i = 0; i < targetArray.length; i++)
                if (targetArray[i] !== "")
                    if (link.match(targetArray[i]))
                        return true;
    return false;
}

function concatSelector() {
    var result;
    if (SELECTOR1)
        result = SELECTOR1;
    if (SELECTOR2) {
        if (SELECTOR1) //in case selector1 is missing
            result += ', ';
        result += SELECTOR2;
    }

    return result;
}

// popupPositioning function
jQuery.fn.popupPos = function (event, element, style) {
    var offsetToBottomBorderY = 5; //offset to bottom border
    var offsetToRightBorderX = 5; //offset to right border
    var X, Y;
    var hoveredSelectedPosX, hoveredSelectedPosY;
    var distanceToBottom, distanceToRight;
    let computedFontSize = parseInt(window.getComputedStyle(element.parents()[0]).fontSize);

    //console.log(computedFontSize);

    //Initialising variables (multiple usages)
    var scrollTop = windowCached.scrollTop();
    var scrollLeft = windowCached.scrollLeft();
    var elementPopup = $(this);
    var elementParentOffset = element.parents().offset();
    var elementParentOuterHeight = element.parents().outerHeight();
    var elementParentOuterWidth = element.parents().outerWidth();
    var elementOffset = element.offset();
    var elementOuterHeight = element.outerHeight();
    var elementOuterWidth = element.outerWidth();
    var elementRect = element[0].getBoundingClientRect();
    var elementParentRect = element.parents()[0].getBoundingClientRect();
    if (style == 1) //index: position next to parent table cell (SELECTOR1)
    {
        hoveredSelectedPosX = elementParentOffset.left + elementParentOuterWidth; //link position + tablecell width; + elementOuterWidth;
        hoveredSelectedPosY = elementParentOffset.top + computedFontSize; //link position + tablecell height; + elementOuterHeight;
        //console.log("height " + elementParentOuterHeight  + ' - ' + elementOuterHeight);
    } else if (style == 2) //recommendations: position next to link height and parent (SELECTOR2) width
    {
        hoveredSelectedPosX = elementParentOffset.left + elementParentOuterWidth; //elementOffset.left + elementOuterWidth;
        hoveredSelectedPosY = elementOffset.top + elementOuterHeight;
    } else { //position to mouse hover position
        hoveredSelectedPosX = event.pageX; // + offsetToRightBorderX;
        hoveredSelectedPosY = event.pageY; // + offsetToBottomBorderY;
    }
    X = hoveredSelectedPosX;
    Y = hoveredSelectedPosY;

    // Distance to the right
    distanceToRight = windowCached.width() - (X - scrollLeft);
    // Tooltip too close to the right?
    if (distanceToRight < elementPopup.outerWidth())
        X += distanceToRight - elementPopup.outerWidth();

    // Distance to the bottom
    distanceToBottom = windowCached.height() - (Y - scrollTop);
    // Tooltip too close to the bottom?
    if (distanceToBottom < elementPopup.outerHeight()) //(offsetToBottomBorderY + elementPopup.outerHeight())
        Y += distanceToBottom - elementPopup.outerHeight() + computedFontSize;
    //offsetToRightBorderX
    //offsetToBottomBorderY

    //console.log("Distance to the bottom " + distanceToBottom+" elementPopupHeight " +elementPopup.outerHeight()+ "\nDistance to the right " + distanceToRight+ " elementPopupouterWidth " +elementPopup.outerWidth());
    //Tooltip over top border?
    //if(Y + offsetToBottomBorderY < scrollTop) Y = scrollTop + offsetToBottomBorderY;
    //if(X + offsetToRightBorderX < scrollLeft) X = scrollLeft + offsetToRightBorderX;
    this.css('top', Y + 'px');
    this.css('left', X + 'px');
    popover.show();
    //console.log("final popup position "+X+' # '+Y);
    return this;
};

//.wpb_wrapper a = title links on individual seriepage
$(SELECTOR2).mouseenter(function (e) {
    style = 2;
});
//td a = links in table cells (index and group page)
$(SELECTOR1).mouseenter(function (e) {
    style = 1;
});

function loadImgUrl(elementUrl) {
    // Create new promise with the Promise() constructor;
    // This has as its argument a function
    // with two parameters, resolve and reject
    return new Promise(function (resolve, reject) {
        let retrievedImgLink = GM_getCachedValue(elementUrl);
        if (retrievedImgLink !== null) {
            resolve(retrievedImgLink);
        } else {
            $.ajax({
                url: elementUrl,
                type: "GET",
                dataType: 'text'
            }).done(function (data) {
                let html = data.replace(/src=/g, 'data-src='); //block resources loading when DOM gets opened
                try {
                    var imagelinks = $(html).find(IMAGELINKCONTAINERS).find('img');

                    var imagelink = imagelinks[CONTAINERNUMBER].getAttribute("data-src");
                    console.log('init ' + imagelink);
                    GM_setCachedValue(elementUrl, imagelink); //cache imageurl link
                    resolve(imagelink);
                } catch (error) {
                    showPopupLoadingSpinner(serieTitle, 1);
                    reject(elementUrl);
                }

            })
                .fail(function (xhr) {
                    console.log('error', xhr);
                });
        }
    });
}

main();

function main() {
    function uniq(a) {
        return Array.from(new Set(a));
    }

    if (preloadUrlRequests) {
        var getNovelLinks = function () {
            const links = Array.from(
                document.querySelectorAll('a[href*="' + INDIVIDUALPAGETEST + '"]')
            );

            return links;
        };
        const links = getNovelLinks();
        const novelUrlList = links.map(function (el) {
            // console.log('novelUrlList ' + el.href);
            return el.href;
        });

        const uniqueNovelUrlList = uniq(novelUrlList);
        const imageUrlList = uniqueNovelUrlList.map(function (elementUrl) {
            loadImgUrl(elementUrl)
                .then(function (imgUrl) {
                    if (preloadImages) {
                        let img = document.createElement("img"); //put img into dom. Let the image preload in background
                        img.src = imgUrl;
                        console.log("onpageload cache init " + imgUrl);
                    }
                }, function (Error) {
                    console.log(Error + ' failed to fetch ' + elementUrl);
                });
            // console.log("imageUrlList " + elementUrl);
        });
    }
    //circle spinner from http://codepen.io/Beaugust/pen/DByiE
    //add additional stylesheet for "@keyframe spin" into head after document finishes loading
    //@keyframes spin is used for the loading spinner

    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = 'body {}';
    document.getElementsByTagName('head')[0].appendChild(style);
    this.stylesheet = document.styleSheets[document.styleSheets.length - 1];

    try {
        this.stylesheet.insertRule(`
@keyframes spin {
100% {
transform: rotate(360deg);
}
}`, this.stylesheet.cssRules.length);
    } catch (e) {
        alert('error');
    }
}
windowCached.on('load', function () {
    function styleSheetContainsClass(f) {
        var localDomainCheck = '^http://' + document.domain;
        //console.log("Domain check with: " + localDomainCheck);
        var hasStyle = false;
        var stylename = '.' + f;
        var fullStyleSheets = document.styleSheets;
        // console.log("start styleSheetContainsClass " + stylename);
        if (fullStyleSheets) {
            for (let i = 0; i < fullStyleSheets.length - 1; i++) {
                //console.log("loop fullStyleSheets " + stylename);
                let styleSheet = fullStyleSheets[i];
                //if(styleSheet != null)
                {
                    if (styleSheet.href !== null) //https://gold.xitu.io/entry/586c67c4ac502e12d631836b "However since FF 3.5 (or thereabouts) you don't have access to cssRules collection when the file is hosted on a different domain" -> Access error for Firefox based browser. script error not continuing
                        if (styleSheet.href.match(localDomainCheck)) {
                            if (styleSheet.cssRules) {
                                for (let rulePos = 0; rulePos < styleSheet.cssRules.length - 1; rulePos++) {

                                    if (styleSheet.cssRules[rulePos] !== undefined) {
                                        // console.log("styleSheet.cssRules[rulePos] "+ stylename);
                                        if (styleSheet.cssRules[rulePos].selectorText) {
                                            if (styleSheet.cssRules[rulePos].selectorText == stylename) {
                                                console.log('styleSheet class has been found - style: ' + stylename);
                                                hasStyle = true; //break;
                                                return hasStyle;
                                            }
                                        } // else console.log("undefined styleSheet.cssRules[rulePos] "+ stylename);
                                    }
                                    // else console.log("loop undefined styleSheet.cssRules[rulePos] "+ stylename);
                                }
                            } //else console.log("undefined styleSheet.cssRules "+ stylename);
                        }
                    //console.log("stylesheet url " + styleSheet.href);
                } //else console.log("undefined styleSheet "+ stylename);
                if (hasStyle) break;
            }
        } //else console.log("undefined fullStyleSheets "+ stylename);

        console.log("styleSheet class has not been found - style: " + stylename);
        return hasStyle;
    }
    if (STYLESHEETHIJACKFORBACKGROUND !== "")
        if (!styleSheetContainsClass(STYLESHEETHIJACKFORBACKGROUND))
            STYLESHEETHIJACKFORBACKGROUND = "";
    if (STYLESHEETHIJACKFORTITLE !== "")
        if (!styleSheetContainsClass(STYLESHEETHIJACKFORTITLE))
            STYLESHEETHIJACKFORTITLE = "";

    $('body').append('<div ID="popover" ' + stylesheetForBackground() + '></div>');
    popover = $('#popover');
    popover.css('position', 'absolute');
    popover.css('z-index', '10');
    popover.css('box-shadow', '0px 0px 5px #7A7A7A');
});


function stylesheetForTitle() {
    if (STYLESHEETHIJACKFORTITLE !== "")
        return 'class="' + STYLESHEETHIJACKFORTITLE + '" style="display:inline-block;width:100%;text-align:center !important"';
    else
        return 'style="background-color:' + DEFAULTTITLEBACKGROUNDCOLOR + ';display:inline-block;width:100%;text-align:center !important"';
}

function stylesheetForBackground() {
    if (STYLESHEETHIJACKFORBACKGROUND !== "")
        return 'class="' + STYLESHEETHIJACKFORBACKGROUND + '" style="display:flex !important;flex-direction: column; align-items:center;pointer-events:none; width:auto; height:auto; max-width:100%; max-height:100%;"';
    else
        return 'style="background-color:' + DEFAULTBACKGROUNDCOLOR + ';display:flex !important;flex-direction: column; align-items:center;pointer-events:none; width:auto; height:auto; max-width:100%; max-height:100%;"';
}

//when selected link is entered load imageurl and write popover content
concatenatedSelectors.mouseenter(function (e) {
    var element = $(this);
    var Href = element.attr('href');

    if (Href.search(INDIVIDUALPAGETEST) != -1) //only trigger for links that point to serie pages
    {
        let refreshPopover = function (title, link) {
			/*	clear popup
			 *	append title and image into popup
			 *	when img loading is finished reposition (popupPos) to element/border
			 */
            if (currentTitelHover == title) //popup only gets refreshed when currentTitelHover == title
            {
                popover.empty();
                if (inBlocklist(link, IMAGEBLOCKERARRAY)) {
                    popover.append('<div ' + stylesheetForTitle() + '>' + title + '</div>Blocked Image<br />No Cover Image<br />Unwanted Image');
                    popover.popupPos(e, element, style);
                } else {
                    popover.append('<div ' + stylesheetForTitle() + '>' + title + '</div><img src="' + link + '" style="margin:5px; width:auto; height:' + defaultHeight + ' !important; max-width:100%;min-height:0; max-height:100% !important; align-items: stretch;align-self: stretch;object-fit: contain;"></img>');
                    $('#popover img').on('load', function () {
                        //console.log(Href + "onload is executed"); // for testing purposes
                        if (onHover) //is mouse still hovering over same title after loading finishes?
                            popover.popupPos(e, element, style);
                    });
                }
            }
        };

        //popup loading spinner
        var showPopupLoadingSpinner = function (title, error = false) {
            popover.empty();
            if (error)
                popover.append('<div ' + stylesheetForTitle() + '>' + title + '</div><div style="position: relative;width:150px; height:150px;color:#000;display: flex; justify-content: center; flex-direction: column; text-align: center;">imagecontainer setting is invalid</div>');
            else
                popover.append('<div ' + stylesheetForTitle() + '>' + title + '</div><div style="position: relative;width:150px; height:150px;color:#fff;display: flex; justify-content: center; flex-direction: column; text-align: center;">Loading image<div style="z-index: -100;position:absolute;top:0;left:0;background-color:#000; box-sizing: border-box; width: 150px; height: 150px; border-radius: 100%; border: 10px solid rgba(255, 255, 255, 0.2); border-top-color: #FFF; animation: spin 1s infinite linear;"></div></div>');
            popover.popupPos(e, element, style);
        };


        //async wait until image is loaded before refreshing popup
        var ajaxLoadImageUrlAndShowPopup = function (elementUrl, title) {
            loadImgUrl(elementUrl)
                .then(function (imgUrl) {
                    let img = document.createElement("img"); //put img into dom. Let the image preload in background
                    img.src = imgUrl;
                    img.onload = () => {
                        console.log("imgurl " + imgUrl);
                        refreshPopover(title, imgUrl); //popup only gets refreshed when currentTitelHover == serieTitle      
                        // GM_setCachedValue(elementUrl, imgUrl); //cache imageurl link
                        console.log(elementUrl + " url has been found and is written to temporary cache.\n" + imgUrl + ' successfully cached.'); // for testing purposes                      
                    };
                }, function (Error) {
                    console.log(Error + ' failed to fetch ' + elementUrl);
                });

        };


        onHover = true;

        var shortSerieTitle = element.text(); //get linkname

        //move native title to custom data attribute. Suppress nativ title
        if (!element.attr('datatitle')) {
            element.attr('datatitle', element.attr('title'));
            element.removeAttr('title');
        }

        var serieTitle = element.attr('datatitle'); //try to get nativ title if available from datatitle
        if (!serieTitle) //has no set nativ long title -> use (available shortend) linkname
            serieTitle = shortSerieTitle;
        else //no need to run check if it is already shortSerieTitle
            if(inBlocklist(serieTitle, PREDIFINEDNATIVTITLEARRAY)) //if datatitle in blocklist -> get linkname/shortSerieTitle
            //if (serieTitle.match(PREDIFINEDNATIVTITLE)) //catch on individual serie page nativ title begins with "Recommended by" x people -> use linkname
                serieTitle = shortSerieTitle;

        currentTitelHover = serieTitle; //mark which titel is currently hovered

		/* var retrievedImgLink = GM_getCachedValue(Href); //was imageurl cached?
		 if (retrievedImgLink) {
		     refreshPopover(serieTitle, retrievedImgLink); //popup only gets refreshed when currentTitelHover == serieTitle
		     console.log(retrievedImgLink + ' on the page ' + Href + " has been found and retrieved from the cache."); // for testing purposes
		 }
		 else*/
        {
            showPopupLoadingSpinner(serieTitle);
            ajaxLoadImageUrlAndShowPopup(Href, serieTitle);
        }
    }
});

//hide and empty popup when mouse is not over title
concatenatedSelectors.mouseleave(function () { //close popup when mouse leaves titlelink
    //popover.empty();
    popover.hide();
    onHover = false;
});

$(document).mouseleave(function () { //force close when mouse is outside window and previous mouseleave does not get called
    popover.hide();
    onHover = false;
});

windowCached.blur(function () { //chrome fix -> force close when mouse is outside window alt + tab
    popover.hide();
    onHover = false;
});