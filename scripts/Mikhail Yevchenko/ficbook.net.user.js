// ==UserScript==
// @name        ficbook.net
// @namespace   ficbook.net
// @description Скрипт для фильтрации авторов и фанфиков на ficbook.net
// @include     /^https?:\/\/ficbook.net(/.*|)$/
// @version     1
// @grant       none
// ==/UserScript==

(function () {
    
    function createCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = '; expires=' + date.toGMTString();
        } else
            var expires = '';
        document.cookie = name + '=' + value + expires + '; path=/';
    }
    
    function readCookie(name) {
        var nameEQ = name + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function eraseCookie(name) {
        createCookie(name, '', -1);
    }

    var bannedAuthorsCookieName = "_userscript_banned_authors";
    //eraseCookie(bannedAuthorsCookieName);
    var bannedAuthors = {};
    var bannedAuthorsCookie = readCookie(bannedAuthorsCookieName);

    if (bannedAuthorsCookie !== null) {
        bannedAuthorsCookie.split(",").forEach(function (id) {
            bannedAuthors[id] = true;
        });
    }

    console.log("Banned authors:", bannedAuthors);

    var bannedFicsCookieName = "_userscript_banned_fics";
    //eraseCookie(bannedFicsCookieName);
    var bannedFics = {};
    var bannedFicsCookie = readCookie(bannedFicsCookieName);

    if (bannedFicsCookie !== null) {
        bannedFicsCookie.split(",").forEach(function (id) {
            bannedFics[id] = true;
        });
    }

    console.log("Banned fics:", bannedFics);

    function banAuthor(id) {
        if (bannedAuthors[id]) {
            return;
        }

        bannedAuthors[id] = true;
        if (bannedAuthorsCookie === null) {
            bannedAuthorsCookie = id;
        } else {
            bannedAuthorsCookie += "," + id;
        }

        createCookie(bannedAuthorsCookieName, bannedAuthorsCookie, 365 * 20);
    }

    function banFic(id) {
        if (bannedFics[id]) {
            return;
        }

        bannedFics[id] = true;
        if (bannedFicsCookie === null) {
            bannedFicsCookie = id;
        } else {
            bannedFicsCookie += "," + id;
        }

        createCookie(bannedFicsCookieName, bannedFicsCookie, 365 * 20);
    }

    function deleteBanned(element) {
        console.log("Removing HTML section for #");

        while (element !== null) {
            if (element.getAttribute("class") === "fanfic-thumb-block") {
                console.log("Section for ", element, "found:", element);
                element.parentNode.removeChild(element);
                console.log("Removed");
                //e.style.display="none";
                //e.setAttribute("style", "display:none");
                return;
            }

            element = element.parentNode;
        }

        if (element === null) {
            console.log("Can't delete section for ", element);
            return;
        }
    }

    function initialize(addButtons) {
        //var links = document.links;
        var links = document.querySelectorAll("A");
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (/^\/authors\/\d+$/.test(href)) {
                var authorId = href.substring("/authors/".length);

                if (bannedAuthors[authorId]) {
                    console.log("Banned:", authorId);
                    deleteBanned(link, authorId);
                    continue;
                }

                if (addButtons) {
                    var e = $("<span> </span><small>(<a href=\"#\">в топку</a>)</small>");
                    e.click({author: authorId, link: link}, function (ev) {
                        if (confirm("Точно?")) {
                            banAuthor(ev.data.author);
                            deleteBanned(ev.data.link);
                            initialize(false);
                        }
                        ev.preventDefault();
                    });
                    e.insertAfter($(link));

                    console.log("Author ban link added: " + authorId);
                }
            }
            else if (/^\/readfic\/\d+$/.test(href)) {
                var ficId = href.substring("/readfic/".length);
                
                if (bannedFics[ficId]) {
                    console.log("Banned fic:", ficId);
                    deleteBanned(link);
                    continue;
                }

                if (addButtons) {
                    var e = $("<span> </span><small>(<a href=\"#\">в топку</a>)</small>");
                    e.click({fic: ficId, link: link}, function (ev) {
                        if (confirm("Точно?")) {
                            banFic(ev.data.fic);
                            //deleteBanned(ev.data.link);
                            initialize(false);
                        }
                        ev.preventDefault();
                    });
                    e.insertAfter($(link));

                    console.log("Fic ban link added:", link);
                }

            }
        }

    }
    initialize(true);

    console.log('My ficbook.net userscript executed');
})();
