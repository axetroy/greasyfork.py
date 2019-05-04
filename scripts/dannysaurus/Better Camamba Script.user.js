// ==UserScript==
// @name        Better Camamba Script
// @name:de     Better Camamba Skript
// @namespace   dannysaurus.camamba
// @include     http://www.camamba.com/*
// @include     https://www.camamba.com/*
// @include         http://www.de.camamba.com/*
// @include         https://www.de.camamba.com/*
// @version         1.3.2
// @license         MIT License
// @grant           none
// @description     Auto veeward, hot links, sort friendslist and user search and more.
// @description:de  Auto veeward, Hotlink, sortiere Freundesliste und User Suchergebnise and mehr
// ==/UserScript==

/*
 Pending Feature requests:
 - Pensive Pariah: filter out all statuses that say "<name> has visited your profile>"
 */

// Shared Utils
function isGerman() {
    return window.location.hostname.indexOf("de.camamba.com") >= 0;
}

function localizeUri(uriDefault) {
    var uriLocalized = uriDefault;

    if (isGerman()) {
        uriLocalized = uriLocalized.replace("//www.camamba.com", "//www.de.camamba.com");
        uriLocalized = uriLocalized.replace(".php", "_de.php");
    }

    return uriLocalized;
}

function sortArrayByProp (array, propertyName) {
    array.sort(function (a, b) {
        var compareResult, isUndefinedA, isUndefinedB;
        var cmpA, cmpB;
        isUndefinedA = !(a.hasOwnProperty(propertyName));
        isUndefinedB = !(b.hasOwnProperty(propertyName));
        if (isUndefinedA && isUndefinedB) {
            compareResult = 0;
        } else if (isUndefinedA) {
            compareResult = 1;
            cmpB = b[propertyName];
        } else if (isUndefinedB) {
            compareResult = -1;
            cmpA = a[propertyName];
        } else {
            cmpA = a[propertyName];
            cmpB = b[propertyName];
            if (typeof cmpA === "string") {
                compareResult = cmpA.toLowerCase().localeCompare(cmpB.toLowerCase());
            } else {
                if (cmpA < cmpB) {
                    compareResult = -1;
                } else if (cmpA > cmpB) {
                    compareResult = 1;
                } else {
                    compareResult = 0;
                }
            }
        }
        return compareResult;
    });
    return array;
}

function getLastSeenMinutes (onlineTxt) {
    var onlineInfo, onlineValue, onlineUnit;
    onlineInfo = /.*?(\d{1,3})\s(Minuten|Stunden|Tagen|minutes|hours|days)/g.exec(onlineTxt);
    onlineValue = onlineInfo && onlineInfo.length >= 2 ? onlineInfo[1] : 0;
    onlineUnit = onlineInfo && onlineInfo.length >= 3 ? onlineInfo[2] : "";
    onlineValue *= (function (unit) {
        var mul = {};
        mul["minutes"] = mul["Minuten"] = 1;
        mul["hours"] = mul["Stunden"] = 60;
        mul["days"] = mul["Tagen"] = 60 * 24;
        return mul[unit] || 0;
    })(onlineUnit);
    return onlineValue;
}

function Parent(element) {
    this.domEl = element;
}
Parent.prototype = {
    constructor: Parent,
    insertFirst: function (newEl) {
        var parent = this.domEl;
        var firstChild = parent.firstChild;
        if (firstChild) {
            parent.insertBefore(newEl, firstChild);
        } else {
            parent.appendChild(newEl);
        }
    },
    insertLast: function (newEl) {
        this.domEl.appendChild(newEl);
    },
    removeChildren: function () {
        while (this.domEl.firstChild) {
            this.domEl.removeChild(this.domEl.firstChild);
        }
    }
};

function Button(parameters) {
    var description = parameters.description;
    var callback = parameters.callback;
    var className = parameters.className || "";
    var btn = document.createElement("input");
    btn.setAttribute("value", description);
    btn.setAttribute("type", "button");
    btn.setAttribute("class", className);
    btn.addEventListener("click", callback, false);
    return btn;
}

function ImgLink(parameters) {
    var src = parameters.src;
    var href = parameters.href;
    var target = parameters.target;
    var style = parameters.style;
    var img = document.createElement("img");
    var link = document.createElement("a");

    img.setAttribute("src", src);
    if (style) {
        img.setAttribute("style", style);
    }

    link.setAttribute("href", href);
    if (target) {
        link.setAttribute("target", target);
    }

    link.appendChild(img);
    return link;
}

function Select() {
    var selectList, option, i, prop;
    selectList = document.createElement("select");
    selectList.setAttribute("class", "smallselect");
    for (i = 0; i <= arguments.length - 1; i++) {
        if (typeof arguments[i] === "function") {
            var callback = arguments[i];
            selectList.addEventListener("change", function (e) {
                callback(this.value);
            });
        } else {
            for (prop in arguments[i]) {
                option = document.createElement("option");
                option.value = prop;
                option.text = arguments[i][prop];
                selectList.add(option);
            }
        }
    }
    selectList.callback = callback;
    return selectList;
}

var browser, site, routes;

browser = (function () {
    function getURLParameter(paramName) {
        return decodeURIComponent((new RegExp('[?|&]' + paramName + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    }

    // sets query-param and reloads page
    function setURLParameter(paramName, paramValue) {
        var uri = window.location.href;
        var re = new RegExp("([?&])" + paramName + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            uri = uri.replace(re, '$1' + paramName + "=" + paramValue + '$2');
        }
        else {
            uri = uri + separator + paramName + "=" + paramValue;
        }
        window.location.href = uri;
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i <= ca.length - 1; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    return {
        GetUrlParam: getURLParameter,
        SetUrlParam: setURLParameter,
        GetCookie: getCookie,
        SetCookie: setCookie
    };
})();

// Modules
site = {
    profile: {}, search: {}, profileCuphist: {}, profileView: {}
};

site.profile.addLinks = function () {
    function CupLink(id, height) {
        var heightStyle = (height) ? "height:" + height + "px;" : "";
        var cuphistLink = localizeUri("http://www.camamba.com/profile_cup_hist.php");
        var img = document.createElement("img");
        var link = document.createElement("a");

        img.setAttribute("border", "0");
        img.setAttribute("alt", "award number " + id);
        img.setAttribute("src", "/gfx/cups/" + id + ".png");
        img.setAttribute("style", heightStyle + " padding: 2px 4px; vertical-align: bottom;");

        link.setAttribute("href", cuphistLink + "?c=" + id);
        link.setAttribute("target", "_blank");
        link.appendChild(img);

        return link;
    }

    var mirago = new Parent(document.getElementById("mirago"));
    var actionHeaderLeft = new Parent(document.getElementsByClassName("alignMR")[0]);
    var actionHeaderRight = new Parent(document.getElementsByClassName("alignML")[0]);
    var links = {
        sheep: new CupLink(29),
        search: new ImgLink(
            {
                src: "/gfx/layoutSearch.png",
                href: localizeUri("http://www.camamba.com/search.php?nick=&gender=any&page=0"),
                target: "_blank",
                style: "height: 72px; padding: 2px 4px; vertical-align: bottom;"
            }
        ),
        mail: new ImgLink(
            {
                src: "/gfx/signupMail.png",
                href: localizeUri("http://www.camamba.com/mailv2.php"),
                target: "_blank",
                style: "height: 72px; padding: 2px 4px; vertical-align: bottom;"
            }
        )
    };

    // creates links left and right from "start chatting now";
    actionHeaderLeft.removeChildren();
    actionHeaderLeft.insertFirst(links.search);
    actionHeaderLeft.insertLast(links.mail);
    actionHeaderRight.insertFirst(links.sheep);
};

site.search.sortUser = function () {
    function UserInfo(userTable) {
        var infoRow;
        var divPremiumReal;
        var links;
        var linkViewProfile, linkRoom, linkLocation;
        var i;

        var genderAgeTxt, onlineTxt;
        var genderAgeInfo;
        var offlineMinutes;

        infoRow = userTable.getElementsByTagName("td")[1];
        divPremiumReal = infoRow.getElementsByTagName("div")[0];

        links = infoRow.getElementsByTagName("a");
        for (i = 0; i <= links.length - 1; i++) {
            if (links[i].href.indexOf("javascript:openProfile") === 0) {
                linkViewProfile = links[i];
            } else if (links[i].href.indexOf("javascript:openChat") === 0) {
                linkRoom = links[i];
            } else if (links[i].href.indexOf("javascript:openMap") === 0) {
                linkLocation = links[i];
            }
        }

        genderAgeTxt = linkViewProfile.nextSibling.nextSibling.textContent;
        genderAgeInfo = /(male|female|couple),\s(\d{1,3})/g.exec(genderAgeTxt);
        onlineTxt = linkViewProfile.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.textContent;
        offlineMinutes = getLastSeenMinutes(onlineTxt);
        // User als früher werten, wenn sie in einem Raum sind
        if (!offlineMinutes) {
            offlineMinutes = linkRoom ? -2 : -1;
        }

        this.UserTable = userTable;
        this.Name = linkViewProfile.getElementsByClassName("xltext")[0].textContent;
        this.Gender = genderAgeInfo[1];
        this.Age = parseInt(genderAgeInfo[2]);
        this.OfflineMinutes = parseInt(offlineMinutes);
        if (linkRoom) {
            this.Room = linkRoom.innerHTML;
        }
        if (linkLocation) {
            var distanceParse = /\s-\s(\d{1,2}),?(\d{0,3})/.exec(linkLocation.nextSibling.textContent || "");
            if (distanceParse[1]) {
                this.Distance = distanceParse[1];
            }
            if (distanceParse[2]) {
                this.Distance += distanceParse[2];
            }
        }
        if (this.Distance) {
            this.Distance = parseInt(this.Distance);
        }
    }

    UserInfo.prototype.removeFromParent = function () {
        return (this.UserTable.parentNode) ? this.UserTable.parentNode.removeChild(this.UserTable) : false;
    };

    function updateUsers(selectsArray) {
        var i;
        for (i = selectsArray.length - 1; i >= 0; i--) {
            tdMain.Users.sortBy(selectsArray[i].value);
            tdMain.Update();
        }
    }


    var tdMain;
    var miragoDiv, sortByDiv;
    var label, select;
    var sortSelect;
    var i;
    var searchLink, searchImg;

    tdMain = document.getElementsByClassName("mainContentTD")[0];
    tdMain.NavBar = tdMain.lastElementChild;
    tdMain.Users = (function () {
        var users = [];
        var userTables = document.querySelectorAll("table.searchNormal, table.searchSuper");
        for (var i = 0; i <= userTables.length - 1; i++) {
            var userInfo = new UserInfo(userTables[i]);
            users.push(userInfo);
        }
        users.sortBy = function(propertyName) {
            sortArrayByProp(users, propertyName);
        };
        return users;
    })();
    tdMain.Update = function () {
        var self = this;
        this.removeChild(this.NavBar);
        this.Users.forEach(function (user) {
            user.removeFromParent();
            self.appendChild(user.UserTable);
        });
        this.appendChild(this.NavBar);
    };

    miragoDiv = document.getElementsByTagName("form")[0];
    sortByDiv = document.createElement("div");
    console.log(miragoDiv);
    console.log(sortByDiv);

    sortSelect = [];
    for (i = 1; i <= 3; i++) {
        label = document.createElement("STRONG");
        label.innerHTML = (i === 1)
            ? "Sort By:&nbsp;"
            : "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then By:&nbsp;";
        select = new Select({
            None: "",
            Age: "Age",
            Distance: "Distance",
            Gender: "Gender",
            Name: "Name",
            Room: "Room",
            OfflineMinutes: "Seen Online"
        }, function () {
            var selectSuper, selectCur;
            var i, j, k;
            for (i = sortSelect.length - 1; i >= 1; i--) {
                selectCur = sortSelect[i];
                browser.SetCookie("searchSortSelect" + i, selectCur.value, 365);
                for (j = 0; j <= selectCur.options.length - 1; j++) {
                    selectCur.options[j].disabled = false;
                }
                for (j = i - 1; j >= 0; j--) {
                    selectSuper = sortSelect[j];
                    if (selectSuper.value) {
                        if (selectSuper.selectedIndex === selectCur.selectedIndex) {
                            for (k = i; k <= sortSelect.length - 1; k++) {
                                sortSelect[k].selectedIndex = 0;
                            }
                        }
                        selectCur.options[selectSuper.selectedIndex].disabled = true;
                    }
                }
            }
            browser.SetCookie("searchSortSelect0", sortSelect[0].value, 365);
            updateUsers(sortSelect);
        });
        sortByDiv.appendChild(label);
        sortByDiv.appendChild(select);
        sortSelect.push(select);
    }
    searchImg = document.getElementsByTagName("img")[2];
    searchImg.parentNode.appendChild(new ImgLink({
        src: "/gfx/layoutSearch.png",
        href: localizeUri("http://www.camamba.com/search.php?nick=&gender=any&page=0"),
        target: "_self",
        style: ""
    }));
    searchImg.parentNode.removeChild(searchImg);
    sortSelect[0].value = browser.GetCookie("searchSortSelect0") || "OfflineMinutes";
    sortSelect[1].value = browser.GetCookie("searchSortSelect1") || "Gender";
    sortSelect[2].value = browser.GetCookie("searchSortSelect2") || "Name";
    sortSelect[0].callback();
    miragoDiv.appendChild(sortByDiv);
    updateUsers(sortSelect);
};

site.profileCuphist.prevnext = function () {
    //Camamba stuff
    var camambaCup = (function () {
        Object.defineProperty(this, '_currentCupId', {
            get: function () {
                return browser.GetUrlParam("c");
            },
            set: function (value) {
                browser.SetUrlParam("c", value);
            }
        });
        return {
            get Id() {
                return _currentCupId;
            },
            set Id(value) {
                if (value != _currentCupId) {
                    browser.SetUrlParam("c", value);
                }
            }
        };
    })();

    // define Buttons
    var btnClassname = "";

    var btnNext = new Button({
        description: ">", callback: function () {
            camambaCup.Id++;
        }, className: btnClassname
    });

    var btnNext10 = new Button({
        description: ">>", callback: function () {
            var id = camambaCup.Id;
            if (id % 10 === 0) {
                camambaCup.Id++;
            }
            camambaCup.Id = Math.round(id / 10 + 1) * 10;
        }, className: btnClassname
    });

    var btnPrev = new Button({
        description: "<", callback: function () {
            camambaCup.Id--;
        }, className: btnClassname
    });

    var btnPrev10 = new Button({
        description: "<<", callback: function () {
            var id = camambaCup.Id;
            if (id % 10 === 0) {
                camambaCup.Id--;
            }
            camambaCup.Id = Math.round(id / 10 - 1) * 10;
        }, className: btnClassname
    });

    //avoid user to skip below 1
    if (camambaCup.Id <= 10) {
        btnPrev10.disabled = true;
        if (camambaCup.Id <= 1) {
            btnPrev.disabled = true;
        }
    }

    //insert Buttons in DOM of page
    var injectEl = new Parent(document.getElementsByTagName('table')[0]);
    injectEl.insertFirst(btnNext10);
    injectEl.insertFirst(btnNext);
    injectEl.insertFirst(btnPrev);
    injectEl.insertFirst(btnPrev10);
};

site.profileView.autoVeeward = function () {
    // creates a numeric selection spinner
    function Spinner(labelText, id, value, min, max, step, callback) {
        var div = document.createElement("div");
        var label = document.createElement("label");
        label.setAttribute("for", id);
        label.setAttribute("class", "smalltext");
        label.innerHTML = labelText;
        var spinner = document.createElement("input");
        spinner.setAttribute("type", "number");
        spinner.setAttribute("min", min);
        spinner.setAttribute("max", max);
        spinner.setAttribute("step", step);
        spinner.setAttribute("value", value);
        spinner.setAttribute("class", "smallselect");
        spinner.setAttribute("style", "width: 30px;");
        spinner.setAttribute("id", id);
        spinner.addEventListener("change", function () {
            callback(this);
        });
        div.appendChild(spinner);
        div.appendChild(label);
        return div;
    }

    // creates a Timer to run a chronjob
    function Timer(waitMilliSec, callback) {
        this.id = null;
        this.startTimeMilliSec = null;
        this.waitMilliSec = waitMilliSec;
        this.callback = callback;
    }

    Timer.prototype = {
        constructor: Timer,
        start: function () {
            this.stop();
            this.startTimeMilliSec = (new Date()).getTime();
            this.id = setTimeout(this.callback, this.waitMilliSec);
        },
        stop: function () {
            if (this.id !== null) {
                clearTimeout(this.id);
                this.id = null;
            }
        },
        get timeRemainingMilliSec() {
            var timeRemaining = this.waitMilliSec;
            if (this.id !== null) {
                timeRemaining = this.waitMilliSec - ((new Date()).getTime() - this.startTimeMilliSec);
            }
            return timeRemaining;
        },
        set timeRemainingMilliSec(value) {
            this.waitMilliSec = value;
        },
        isRunning: function () {
            return (this.id !== null && this.timeRemainingMilliSec > 0);
        }
    };

    // toggles autoVee On / Off for the current user
    function switchAutoVee() {
        if (config.User.IsEnabled(user.UId)) {
            config.User.Disable();
            timerReload.stop();
            timerTrySend.stop();
            btnAutoVee.Disable();
            updateInfo();
        } else {
            config.User.Enable();
            timerTrySend.callback();
            btnAutoVee.Enable();
            updateInfo();
        }
    }

    // shows information about the coming action of the script, on the page frequently
    function updateInfo() {
        var infoText;
        var waitNextActionMs = 0;
        if (timerTrySend.isRunning()) {
            waitNextActionMs = timerTrySend.timeRemainingMilliSec;
        } else if (timerReload.isRunning()) {
            waitNextActionMs = timerReload.timeRemainingMilliSec;
        }

        timerUpdateInfo.waitMilliSec = (waitNextActionMs > 60 * 1000) ? 60 * 1000 : 1000;
        if (config.User.IsEnabled(user.UId)) {
            infoText = "Gonna try to send " + veewards.SelectedName;
            infoText += " to your lovely friend " + user.Name;
            infoText += " in " + Math.round(waitNextActionMs / (60 * 1000)) + " minutes.";
            timerUpdateInfo.start();
        } else {
            infoText = "Autovee is disabled for " + user.Name;
        }
        paraInfo.innerHTML = infoText;
    }


    // settings, persisted in cookies
    var config = (function () {
        // Enable autoveewarding for user or disable it
        var _user = {
            get UId() {
                return browser.GetCookie("autoVeeUid") || "853353";
            }, // 853353=Amber
            set UId(value) {
                browser.SetCookie("autoVeeUid", value, 365);
            },

            get Veeward() {
                return browser.GetCookie("autoVeeVeeward");
            },
            set Veeward(value) {
                browser.SetCookie("autoVeeVeeward", value, 365);
            },
            Disable: function () {
                this.UId = -1;
            },
            Enable: function () {
                this.UId = user.UId;
                this.Veeward = veewards.Selected;
            },
            IsEnabled: function (uid) {
                var isEnabled;
                if (uid) {
                    isEnabled = this.UId == user.UId;
                } else {
                    isEnabled = this.UId != -1;
                }
                return isEnabled;
            }
        };
        // timeouts till next action
        var _waitMilliSec = {
            get AfterSuccess() {
                return browser.GetCookie("waitMilliSecAfterSuccess") || 1000 * 60 * 60 * 4.5;
            },
            set AfterSuccess(value) {
                browser.SetCookie("waitMilliSecAfterSuccess", value, 365);
            },
            get IfNoVeeward() {
                return browser.GetCookie("waitMilliIfNoVeeward") || 1000 * 60 * 60 * 3;
            },
            set IfNoVeeward(value) {
                browser.SetCookie("waitMilliIfNoVeeward", value, 365);
            }
        };
        return {
            User: _user,
            WaitMilliSec: _waitMilliSec
        };
    })();

    // user info
    var user = {
        get UId() {
            return browser.GetUrlParam("uid");
        },
        get Name() {
            return document.getElementsByClassName('profname')[0].innerHTML;
        }
    };

    // managing veewards
    var veewards = {
        get Left() {
            return document.getElementById("maysend").innerHTML;
        },
        get Selected() {
            return document.getElementById('veesend').selectedIndex;
        },
        set Selected(value) {
            document.getElementById('veesend').selectedIndex = value;
            document.getElementById('veesend').disabled = false;
        },
        get SelectedName() {
            return document.getElementById('veesend')[this.Selected].innerHTML;
        },
        sendVee: function () {
            var success = false;
            if (this.Left >= 1) {
                sendVee();
                success = true;
            }
            return success;
        }
    };


    // Creating DOM Elements for button and info about next action
    var paraInfo = document.createElement('P');
    var btnAutoVee = new Button({description: "", callback: switchAutoVee});
    btnAutoVee.setAttribute('id', "gmDisable");
    btnAutoVee.setAttribute('class', 'submit');
    btnAutoVee.Enable = function () {
        btnAutoVee.setAttribute('value', "Stop autosend " + veewards.SelectedName);
    };
    btnAutoVee.Disable = function () {
        btnAutoVee.setAttribute('value', "Start autosend " + veewards.SelectedName);
    };
    var tableProfile = document.getElementsByClassName('profiletable')[0];
    tableProfile.appendChild(paraInfo);
    tableProfile.appendChild(btnAutoVee);

    veewards.Selected = config.User.Veeward;

    //scheduling reloading of page after successful sent
    var timerReload = new Timer(config.WaitMilliSec.AfterSuccess, function () {
        if (config.User.IsEnabled(user.UId)) {
            location.reload(true);
        }
    });
    //scheduling next try of sending a veeward
    var timerTrySend = new Timer(config.WaitMilliSec.IfNoVeeward, function () {
        if (config.User.IsEnabled(user.UId)) {
            if (!veewards.sendVee()) {
                timerReload.stop();
                timerTrySend.start();
            } else {
                timerTrySend.stop();
                timerReload.start();
            }
        }
    });

    // scheduling update of informing user about next action of the script
    var timerUpdateInfo = new Timer(1000, function () {
        updateInfo();
    });
    timerUpdateInfo.start();


    // kick off auto veewarding if enabled
    if (config.User.IsEnabled(user.UId)) {
        switchAutoVee();
        switchAutoVee();
    } else {
        btnAutoVee.Disable();
    }

    document.getElementById('veesend').addEventListener('change', function () {
        if (config.User.IsEnabled(user.UId)) {
            config.User.Veeward = veewards.Selected;
            btnAutoVee.Enable();
            updateInfo();
        } else {
            btnAutoVee.Disable();
        }
    }, false);

    var selectTimeWaitAfterSuccessMin = Math.round(config.WaitMilliSec.AfterSuccess / (1000 * 60) / 5) * 5;
    var selectTimeWaitAfterSuccessMax = selectTimeWaitAfterSuccessMin + 120;
    var selectTimeWaitAfterSuccess = new Spinner("Sleep period after veewards sent successfully (minutes)", "selectTimeWaitAfterSuccess",
        selectTimeWaitAfterSuccessMin, selectTimeWaitAfterSuccessMin, selectTimeWaitAfterSuccessMax, 5,
        function (el) {
            config.WaitMilliSec.AfterSuccess = el.value * 1000 * 60;
            timerTrySend.stop();
            timerReload.stop();
            timerReload.waitMilliSec = el.value * 1000 * 60;
            timerReload.start();
            timerUpdateInfo.start();
            updateInfo();
        }
    );

    var selectTimeWaitIfNoVeewardMin = Math.round(config.WaitMilliSec.IfNoVeeward / (1000 * 60));
    var selectTimeWaitIfNoVeewardMax = selectTimeWaitIfNoVeewardMin + 60;
    var selectTimeWaitIfNoVeeward = new Spinner("Retry period when no veeward available (minutes)", "selectTimeWaitIfNoVeeward",
        selectTimeWaitIfNoVeewardMin, selectTimeWaitIfNoVeewardMin, selectTimeWaitIfNoVeewardMax, 1,
        function (el) {
            config.WaitMilliSec.IfNoVeeward = el.value * 1000 * 60;
            timerReload.stop();
            timerTrySend.stop();
            timerTrySend.waitMilliSec = el.value * 1000 * 60;
            timerTrySend.start();
            timerUpdateInfo.start();
            updateInfo();
        }
    );

    tableProfile.appendChild(selectTimeWaitAfterSuccess);
    tableProfile.appendChild(selectTimeWaitIfNoVeeward);
};

site.profileView.removeFlashAutoplay = function () {
    function removeAutoplay (element, isRemove) {
        var search = /\autoplay=\d/gi;
        var replace = isRemove ? "autoplay=0" : "autoplay=1";
        var attribute;

        attribute = { "PARAM" : "value", "EMBED" : "src", "OBJECT" : "data" }[element.nodeName];
        if (attribute && element[attribute]) {
            element[attribute] = element[attribute].replace(search, replace);
        }
        return element;
    }

    function makeAutoplay (doMake) {
        flashObjects = document.getElementsByTagName("object");
        if (flashObjects) {
            for (i = 0; i <= flashObjects.length - 1; i++) {
                flashObjects[i] = removeAutoplay(flashObjects[i], !doMake);
                flashChildren = flashObjects[i].childNodes;
                if (flashChildren) {
                    for (j = 0; j <= flashChildren.length - 1; j++) {
                        flashChildren[j] = removeAutoplay(flashChildren[j], !doMake);
                    }
                }
            }
        }
    }

    var settings;
    var flashObjects, flashChildren;
    var i, j;
    var btnContainer, label, checkBox;

    settings = {
        get isAutoplay() {
            var result = false;
            if (browser.GetCookie("isFlashAutoplay")) {
                result = browser.GetCookie("isFlashAutoplay") === "true";
            }
            return  result;
        },
        set isAutoplay(value) {
            browser.SetCookie("isFlashAutoplay", value ? "true" : "false", 365);
        }
    };

    if (!settings.isAutoplay) {
        makeAutoplay(false);
    }

    btnContainer = document.getElementsByClassName("noFrame")[0].firstElementChild.firstElementChild.firstElementChild;
    label = document.createElement("LABEL");
    label.textContent = "Flash Autoplay";
    label.setAttribute("for", "flash-autoplay");
    label.setAttribute("class", "menuItem");
    checkBox = document.createElement("INPUT");
    checkBox.setAttribute("id", "flash-autoplay");
    checkBox.type = "checkbox";
    checkBox.checked = settings.isAutoplay;
    checkBox.addEventListener ("click", function() {
        settings.isAutoplay = checkBox.checked;
        makeAutoplay(settings.isAutoplay);
        //console.log(settings.isAutoplay);
    }, false);

    btnContainer.appendChild(document.createElement("TD"));
    btnContainer.lastChild.appendChild(checkBox);
    btnContainer.lastChild.appendChild(label);
};

site.profile.friendsFilter = function () {
    function stripWrappedHeight(isToggle) {
        var doExpand;
        if (typeof isExpanded === "undefined") {
            Object.defineProperty(this, "isExpanded",{
                get : function() {
                    var cookie =  browser.GetCookie("profileIsExpanded");
                    return (!cookie || cookie == "true");
                },
                set : function(value) {
                    browser.SetCookie("profileIsExpanded", value ? "true" : "false", 365);
                }
            });
        }
        if (isToggle) {
            doExpand = !isExpanded;
        } else {
            doExpand = isExpanded;
        }
        [
            "friends",
            "friends_mcontentwrapper",
            "friends_scrollwrapper",
            "friends_vscrollerbase",
            "eventlist",
            "eventlist_mcontentwrapper",
            "eventlist_scrollwrapper",
            "eventlist_vscrollerbase"
        ].forEach(function (wrapperId) {
                var contentWrapper;
                var style;
                contentWrapper = document.getElementById(wrapperId);
                if (doExpand) {
                    style = contentWrapper.getAttribute("style");
                    contentWrapper.setAttribute("style-notExpanded", style);
                    contentWrapper.setAttribute("style", style.replace(/height:.+?;\s?/,""));
                } else {
                    style = contentWrapper.getAttribute("style-notExpanded");
                    if (style) {
                        contentWrapper.setAttribute("style", style);
                    }
                }
            });
        isExpanded = doExpand;
        return doExpand;
    }

    function UserInfo(userDiv) {
        var links;
        var linkViewProfile, linkRoom;
        var i;

        links = userDiv.getElementsByTagName("a");
        for (i = 0; i <= links.length - 1; i++) {
            links[i];
            if (links[i].href.indexOf("javascript:openProfile") === 0) {
                linkViewProfile = links[i];
            } else if (links[i].href.indexOf("javascript:openChat") === 0) {
                linkRoom = links[i];
            }
        }

        if (linkRoom && linkRoom.nextSibling.nextSibling) {
            this.LastSeen = getLastSeenMinutes(linkRoom.nextSibling.nextSibling.textContent);
        } else if (linkRoom) {
            this.LastSeen = -2;
        } else {
            this.LastSeen = -1;
        }

        this.UserDiv = userDiv;
        this.Name = linkViewProfile.childNodes[0].innerHTML;
        if (linkRoom) {
            this.Room = linkRoom.innerHTML;
        }
    }

    var self, newFriendRequestsOriginal;
    var expandBtn, firstEventBtn;
    var buttonsBelowListTable, buttonsBelowListParent;
    self = this;


    // Erweitert newFriendRequests(). Methode wird aufgerufen, wenn friendscontent vollständig geladen wurde
    newFriendRequestsOriginal = window.newFriendRequests;
    window.newFriendRequests = function () {
        var userDivs;
        var users;
        var i;
        var friendsContent;
        var sortSelect, sortSelection, label;
        var selectContainer;

        newFriendRequestsOriginal(window.friendMode);
        if (window.friendMode == "online" || window.friendMode == "offline") {
            friendsContent = document.getElementById("fcontent");
            // create sort Selection
            sortSelection = {
                choices : function () {
                    return {
                        "online" : { Name : "Name", Room: "Room" },
                        "offline" : { Name : "Name", LastSeen: "Seen Online" }
                    }[window.friendMode];
                },
                get choice() { return browser.GetCookie("friendsSort" + window.friendMode) || "Name"; },
                set choice(value) { browser.SetCookie("friendsSort" + window.friendMode, value, 365); }
            };
            sortSelect = new Select(sortSelection.choices(), function () {
                sortSelection.choice = sortSelect.value;
                sortArrayByProp(users, sortSelect.value);
                users.forEach(function (user) {
                    friendsContent.removeChild(user.UserDiv);
                    friendsContent.appendChild(user.UserDiv);
                });
            });
            sortSelect.value = sortSelection.choice;

            label = document.createElement("STRONG");
            label.innerHTML = "Sort By:&nbsp;";

            // inject Select in DOM
            selectContainer = document.getElementById("sdoing").parentNode.nextSibling.nextSibling;
            while (selectContainer.firstChild) {
                selectContainer.removeChild(selectContainer.firstChild);
            }
            selectContainer.style = "text-align: left;";
            selectContainer.appendChild(label);
            selectContainer.appendChild(sortSelect);

            // parsing friends info
            users = [];
            userDivs = friendsContent.getElementsByClassName("psmallbox2");
            for (i = 0; i <= userDivs.length - 1; i++) {
                users.push(new UserInfo(userDivs[i]));
            }

            // sort friends
            sortArrayByProp(users, sortSelect.value);
            users.forEach(function (user) {
                friendsContent.removeChild(user.UserDiv);
                friendsContent.appendChild(user.UserDiv);
            });
        }
    };

    firstEventBtn = document.getElementsByClassName("eventbutton")[0];

    expandBtn = new Button({
        description: "",
        callback: function () {
            if (stripWrappedHeight(true)) {
                expandBtn.setAttribute("value", "⏫");
            } else {
                expandBtn.setAttribute("value", "⏬");
            }
        },
        className: "tinybuttonFlip"
    });
    firstEventBtn.parentNode.appendChild(expandBtn);

    setTimeout(function () {
        if (stripWrappedHeight()) {
            expandBtn.setAttribute("value", "⏫");
        } else {
            expandBtn.setAttribute("value", "⏬");
        }
    }, 1500);

    window.reloadFriends();
};

//Run  Modules
routes = {
    profile: function () {
//        site.profile.addLinks();
        site.profile.friendsFilter();
    },
    profile_cup_hist: function () {
        site.profileCuphist.prevnext();
    },
    profile_view: function () {
        site.profileView.removeFlashAutoplay();
        if (browser.GetUrlParam("m") == "start") {
            site.profileView.autoVeeward();
        }
    },
    mailv2: function () {
        startNewConvo();
    },
    search: function () {
        site.search.sortUser();
    }
};
var urlRoute = /^\/(.+?)(?:_de)?\.php.*/g.exec(location.pathname)[1];
routes[urlRoute] && routes[urlRoute]();