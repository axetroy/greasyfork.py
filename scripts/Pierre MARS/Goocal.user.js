// ==UserScript==
// @name       Goocal
// @version    0.10.2
// @description  Redesigning google calendar to make it cleaner and easier to use
// @author          cozen
// @include         https://calendar.google.com/*
// @include         http://calendar.google.com/*
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
// @grant           GM_addStyle
// @copyright  2012+, cozen
// @namespace https://greasyfork.org/fr/scripts/10742
// ==/UserScript==

window.addEventListener("load", init, false);
var titleCellToday = document.getElementsByClassName('st-dtitle-today'),
    alldays = document.getElementsByClassName("st-bg-table"),
    allTitleCellDays = document.getElementsByClassName("st-dtitle"),
    applogo = document.getElementsByClassName('applogo'),
    bBot = document.createElement('div'),
    bMid = document.createElement('div'),
    bTop = document.createElement('div'),
    burger = document.createElement('div'),
    gadgetcell = document.getElementById("gadgetcell"),
    gridcontainer = document.getElementById('gridcontainer'),
    head = document.head || document.getElementsByTagName('head')[0],
    leftOne = document.getElementById('gbq1'),
    lhSet = document.getElementsByClassName('gb_R'),
    lvHeader = document.getElementById('lvHeader'),
    mainbody = document.getElementById('mainbody'),
    mvDaynames = document.getElementsByClassName('mv-dayname'),
    navDateBar = document.getElementsByTagName("TD"),
    oneGoogBarBG = document.getElementsByClassName('gb_re'),
    rightOne = document.getElementById('onegoogbar').firstChild.firstChild.firstChild,
    robotoFont = document.createTextNode("@font-face {font-family: 'Roboto';font-style: normal;font-weight: 400;src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v15/CWB0XYA8bzo0kSThX0UTuA.woff2) format('woff2');unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;}*{font-family: 'Roboto' !important;}"),
    robotoStyle = document.createElement('style'),
    topLeftNavigation = document.getElementById('topLeftNavigation'),
    TopNavContainer = document.getElementById('topnav-container'),
    topRightNavigation = document.getElementById('topRightNavigation'),
    vrNav = document.getElementById('vr-nav'),
    tun = document.getElementById('t1'),
    wk = 0,
    wkDaynames = document.getElementsByClassName('wk-dayname');

var dateTop = topLeftNavigation.getElementsByClassName('date-top'),
    forwardButton = topLeftNavigation.getElementsByClassName('date-nav-next'),
    previousButton = topLeftNavigation.getElementsByClassName('date-nav-prev'),
    tableDate = topLeftNavigation.getElementsByClassName('nav-table'),
    todayButton = topLeftNavigation.getElementsByClassName('date-nav-today'),
    dpOff = topLeftNavigation.getElementsByClassName('date-picker-off');

function init() {
    
    /*===================================
    =            burger Menu            =
    ===================================*/
    burger.id = "burger";
    burger.className = "menu";
    bTop.id = "bTop";
    bMid.id = "bMiddle";
    bBot.id = "bBottom";
    burger.appendChild(bTop);
    burger.appendChild(bMid);
    burger.appendChild(bBot);

    burger.style.width = "48px";
    burger.style.height = "48px";
    burger.style.position = "absolute";
    burger.style.top = "0";
    burger.style.left = "0";
    burger.style.zIndex = "+11";

    bTop.style.position = "absolute";
    bTop.style.width = "50%";
    bTop.style.height = "2px";
    bTop.style.background = "#000";
    bTop.style.borderRadius = "2px";
    bTop.style.top = "17px";
    bTop.style.left = "50%";
    bTop.style.transform = "translateX(-50%)";
    bTop.style.transition = ".25s";

    bMid.style.position = "absolute";
    bMid.style.width = "50%";
    bMid.style.height = "2px";
    bMid.style.background = "#000";
    bMid.style.borderRadius = "2px";
    bMid.style.top = "23px";
    bMid.style.left = "50%";
    bMid.style.transform = "translateX(-50%)";
    bMid.style.transition = ".25s";

    bBot.style.position = "absolute";
    bBot.style.width = "50%";
    bBot.style.height = "2px";
    bBot.style.background = "#000";
    bBot.style.borderRadius = "2px";
    bBot.style.top = "29px";
    bBot.style.left = "50%";
    bBot.style.transform = "translateX(-50%)";
    bBot.style.transition = ".25s";

    mainbody.style.marginLeft = " 10px";

    burger.onclick = function openNav() {
        if (mainbody.classList.contains("opened")) {
            mainbody.classList.remove('opened');
            mainbody.style.marginLeft = "10px";
            bTop.style.transform = "translateX(-50%)";
            bBot.style.transform = "translateX(-50%)";
        } else {
            mainbody.className += " opened";
            mainbody.style.marginLeft = "184px";
            bTop.style.transform = "translateX(-89%) rotate(-45deg) scaleX(.5) translateY(3px)";
            bBot.style.transform = "translateX(-89%) rotate(45deg) scaleX(.5) translateY(-3px)";
        }
    };
    applogo[0].style.top = "0";
    applogo[0].style.left = "0";
    applogo[0].removeChild(applogo[0].firstChild);
    applogo[0].appendChild(burger);

    robotoStyle.type = 'text/css';
    robotoStyle.appendChild(robotoFont);
    head.appendChild(robotoStyle);

    /*=====  End of burger Menu  ======*/

    leftOne.insertBefore(applogo[0], leftOne.firstChild);
    rightOne.insertBefore(TopNavContainer, rightOne.firstChild);
    leftOne.removeChild(leftOne.lastChild);
    leftOne.style.minWidth = "60px";
    leftOne.style.maxWidth = "60px";
    TopNavContainer.style.position = "relative";
    TopNavContainer.style.display = "flex";

     /*========================================================
    =            Select view calendar type button            =
    ========================================================*/

    var views = document.createElement('div'),
        viewsSpan = document.createElement('span'),
        innerViewsSpan = document.createTextNode("\uD83D\uDCC5"),
        viewsButton = topRightNavigation.firstChild;
    views.id = "Vues";
    viewsSpan.id = "viewsSpan";
    viewsSpan.style.fontWeight = "normal";
    viewsSpan.style.fontSize = "16px";
    viewsSpan.appendChild(innerViewsSpan);
    views.appendChild(viewsSpan);
    viewsButton.className += " goog-imageless-button";
    viewsButton.setAttribute("role", "button");
    viewsButton.style.verticalAlign = "middle";
    viewsButton.removeChild(viewsButton.firstChild);
    add_Child(views, viewsButton, 0);
    viewsButton.insertBefore(views, viewsButton.firstChild);

    var i = viewsButton.childNodes.length - 1;
    while (i !== 0) {
        add_Child(views, viewsButton, 1);
        i--;
    }

    var viewsChildren = views.childNodes;
    for (var j = 0; j < viewsChildren.length; j++) {
        if (viewsChildren[j].nodeName == "DIV") {
            viewsChildren[j].style.display = "none";
        }
    }

    views.parentElement.style.position = "relative";
    views.parentElement.style.boxSizing = "border-box";
    views.parentElement.style.width = "72px";
    views.style.position = "absolute";
    views.style.zIndex = "+1";
    views.style.width = "100%";
    views.style.left = "0";
    views.style.top = "0";


    views.onclick = function() {
        var viewsChildren = views.childNodes;
        for (var j = 0; j < viewsChildren.length; j++) {
            if (viewsChildren[j].id !== 'viewsSpan') {
                if (viewsChildren[j].classList.contains("opened")) {
                    closeit(viewsChildren[j]);
                } else {
                    openit(viewsChildren[j]);
                }
            }
        }
    };
    /*=====  End of Select view calendar type button  ======*/

    mainStyle();

    /*======================================================
    =            initialization of the observer            =
    ======================================================*/

    var observer = new MutationObserver(function(mutations) {
        // For the sake of...observation...let's output the mutation to console to see how this all works
        mutations.forEach(function(mutation) {
            mainStyle();
        });
    });

    var observerConfig = {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
    };

    var gridListener = document.getElementById('calcontent');
    gridListener.style.marginRight = "10px";
    gadgetcell.style.marginRight = "10px";
    observer.observe(gridListener, observerConfig);

    /*=====  End of initialization of the observer  ======*/
}

/*=================================
=            FUNCTIONS            =
=================================*/

function mainStyle() {

    vrNav.style.display = "none";
    tun.style.width = "100%";
    tableDate[0].style.width = "100%";
    
    var trTableDate = tableDate[0].getElementsByTagName('TR');
    trTableDate[0].style.display = "flex";

    forwardButton[0].style.flex = "1";
    previousButton[0].style.flex = "1";
    todayButton[0].style.flex = "2";
    dpOff[0].style.flex = "10";

    if (lvHeader !== undefined) {
        lvHeader.style.background = '#FFF';
    }

    if (gridcontainer !== undefined) {
        gridcontainer.style.marginRight = '0';
    }

    if (titleCellToday[0] !== undefined) {
        var currWeek = titleCellToday[0].parentElement;
        for (var f = 0; f < currWeek.childNodes.length; f++) {
            if (currWeek.childNodes[f].classList.contains('st-dtitle-today')) {
                currWeek.childNodes[f].style.todayBorderTop = "1px solid #FF0000";
                currWeek.childNodes[f].style.boxShadow = "inset 0 2px 0 0 #FF0000";
            } else {
                currWeek.childNodes[f].style.todayBorderTop = "1px solid #FFAAAA";
                currWeek.childNodes[f].style.boxShadow = "inset 0 2px 0 0 #FFAAAA";
            }
        }
    }

    todayBorderLeft(titleCellToday);
    bgToday(titleCellToday);
    todayBorderLeft(document.getElementsByClassName("st-dtitle-next"));
    todayBorderLeft(document.getElementsByClassName("st-bg-today"));
    todayBorderLeft(document.getElementsByClassName("st-bg-next"));
    todayBorderTop(document.getElementsByClassName("st-dtitle-down"));
    bgToday(document.getElementsByClassName("st-bg-today"));

    for(var lh = 0; lh < lhSet.length; lh++) {
        lhSet[lh].style.lineHeight = "inherit";
    }

    if (alldays[wk] !== undefined) {
        while (alldays[wk].childElementCount > 0) {
            if (alldays[wk].childElementCount === 7) {
                alldays[wk].childNodes[5].style.backgroundColor = "#EEE";
                alldays[wk].childNodes[6].style.backgroundColor = "#EEE";
            }
            alldays = alldays[wk].childNodes;
        }
    }

    for (var wkTitleCell = 0; wkTitleCell < allTitleCellDays.length; wkTitleCell++) {
        if (((wkTitleCell + 1) / 7) === parseInt(((wkTitleCell + 1) / 7), 10)) {
            allTitleCellDays[wkTitleCell].style.backgroundImage = "linear-gradient(to bottom, #f5f5f5 0%, #ccc 100%)";
            allTitleCellDays[wkTitleCell - 1].style.backgroundImage = "linear-gradient(to bottom, #f5f5f5 0%, #ccc 100%)";
        }
    }

    topLeftNavigation.style.position = "relative";
    topLeftNavigation.style.left = "0";
    topLeftNavigation.style.display = "flex";
    topLeftNavigation.style.flexFlow = "row nowrap";
    topLeftNavigation.style.alignItems = "center";
    topLeftNavigation.style.flex= "3";
    topLeftNavigation.style.marginRight = "16px";
    topRightNavigation.style.flex = "1";
    topRightNavigation.style.position = "relative";

    dateTop[0].style.fontSize = "24px";
    dateTop[0].style.fontWeight = "bold";
    dateTop[0].style.textTransform = "capitalize";
    dateTop[0].style.textAlign = "center";

    for (var elem = 0; elem < oneGoogBarBG.length; elem++) {
        oneGoogBarBG[elem].style.background = "none";
    }

    for (var reorder = 0; reorder < navDateBar.length; reorder++) {
        if (navDateBar[reorder].id.substr(0, 7) == "dateBox" && navDateBar[reorder] == navDateBar[reorder].parentElement.lastChild) {
            navDateBar[reorder].parentElement.appendChild(navDateBar[reorder - 1]);
        }
    }

    colTitle(mvDaynames);
    colTitle(wkDaynames);
}

function colTitle(daynames) {
    for (var title = 0; title < daynames.length; title++) {
        daynames[title].style.fontWeight = "bold";
        daynames[title].style.fontSize = "18px";
        daynames[title].style.textTransform = "capitalize";
    }
}

function add_Child(parent, child, child_position) {
    for (var k = child_position; k < child.childNodes.length; k++) {
        parent.appendChild(child.childNodes[k]);
    }
}

function openit(element) {
    element.className += " opened";
    if (element.tagName == "div" || "article" || "aside" || "details" || "figcaption" || "figure" || "footer" || "header" || "hgroup" || "main" || "menu" || "nav" || "section" || "summary") {
        element.style.display = "block";
    }
}

function closeit(element) {
    element.classList.remove("opened");
    element.style.display = "none";
}


function todayBorderLeft(Cell) {
    for (var l = 0; l < Cell.length; l++) {
        Cell[l].style.borderLeftColor = "#F00";
    }
}

function todayBorderTop(Cell) {
    for (var m = 0; m < Cell.length; m++) {
        Cell[m].style.borderTopColor = "#F00";
    }
}

function bgToday(Cell) {
    for (var n = 0; n < Cell.length; n++) {
        Cell[n].style.backgroundColor = "#FDD";
    }
}


/*=====  End of FUNCTIONS  ======*/
