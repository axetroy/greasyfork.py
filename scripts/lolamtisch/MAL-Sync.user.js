// ==UserScript==
// @name MAL-Sync
// @namespace https://greasyfork.org/users/92233
// @description Integrates MyAnimeList/AniList/Kitsu into various sites, with auto episode tracking.
// @version 0.4.15
// @author lolamtisch@gmail.com
// @license GPL-3.0
// @iconURL https://raw.githubusercontent.com/lolamtisch/MALSync/master/assets/icons/icon128.png
// @grant GM_xmlhttpRequest
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_deleteValue
// @grant GM_listValues
// @grant GM_addStyle
// @grant GM_getResourceText
// @grant GM.xmlHttpRequest
// @grant GM.getValue
// @grant GM.setValue
// @match *://myanimelist.net/anime/*
// @match *://myanimelist.net/manga/*
// @match *://myanimelist.net/animelist/*
// @match *://myanimelist.net/mangalist/*
// @match *://myanimelist.net/anime.php?id=*
// @match *://myanimelist.net/manga.php?id=*
// @match *://myanimelist.net/character/*
// @match *://myanimelist.net/people/*
// @match *://myanimelist.net/search/*
// @match *://anilist.co/*
// @match *://kitsu.io/*
// @match *://kissanime.ru/Anime/*
// @match *://kissanime.to/Anime/*
// @match *://kissmanga.com/Manga/*
// @match *://*.9anime.to/watch/*
// @match *://*.9anime.is/watch/*
// @match *://*.9anime.ru/watch/*
// @match *://*.9anime.ch/watch/*
// @match *://*.9anime.nl/watch/*
// @match *://*.9anime.live/watch/*
// @match *://*.crunchyroll.com/*
// @match *://www.masterani.me/anime/info/*
// @match *://www.masterani.me/anime/watch/*
// @match *://*.mangadex.org/manga/*
// @match *://*.mangadex.org/title/*
// @match *://*.mangadex.org/chapter/*
// @match *://mangarock.com/*
// @match *://*.gogoanime.tv/*
// @match *://*.gogoanime.io/*
// @match *://*.gogoanime.in/*
// @match *://*.gogoanime.se/*
// @match *://*.gogoanime.sh/*
// @match *://*.gogoanimes.co/*
// @match *://*.anime4you.one/show/1/aid/*
// @match *://*.branitube.org/assistir/*
// @match *://*.branitube.org/animes/*
// @match *://*.www.turkanime.tv/video/*
// @match *://*.www.turkanime.tv/anime/*
// @match *://twist.moe/*
// @match *://app.emby.media/*
// @match *://app.plex.tv/*
// @match *://www.netflix.com/*
// @match *://otakustream.tv/anime/*
// @match *://otakustream.tv/movie/*
// @match *://animepahe.com/play/*
// @match *://animepahe.com/anime/*
// @match *://animeflv.net/anime/*
// @match *://animeflv.net/ver/*
// @match *://jkanime.net/*
// @match *://*.openload.co/*
// @match *://*.streamango.com/*
// @match *://*.mp4upload.com/*
// @match *://*.mcloud.to/*
// @match *://*.prettyfast.to/*
// @match *://*.rapidvideo.com/*
// @match *://*.static.crunchyroll.com/*
// @match *://*.vidstreaming.io/*
// @match *://*.xstreamcdn.com/*
// @match *://*.oload.tv/*
// @match *://*.mail.ru/*
// @match *://*.myvi.ru/*
// @match *://*.sibnet.ru/*
// @match *://*.tune.pk/*
// @match *://*.vimple.ru/*
// @match *://*.href.li/*
// @match *://*.vk.com/*
// @match *://*.cloudvideo.tv/*
// @match *://*.fembed.net/*
// @match *://*.fembed.com/*
// @match *://*.youpload.co/*
// @match *://*.yourupload.com/*
// @match *://*.vidlox.me/*
// @match *://*.kwik.cx/*
// @match *://*.mega.nz/*
// @match *://*.animeflv.net/*
// @match *://*.hqq.tv/*
// @match *://*.jkanime.net/*
// @match *://*.ok.ru/*
// @match *://*.novelplanet.me/*
// @exclude *myanimelist.net/anime/season*
// @exclude *crunchyroll.com/
// @exclude *crunchyroll.com
// @exclude *crunchyroll.com/acct*
// @exclude *crunchyroll.com/anime*
// @exclude *crunchyroll.com/comics*
// @exclude *crunchyroll.com/edit*
// @exclude *crunchyroll.com/email*
// @exclude *crunchyroll.com/forum*
// @exclude *crunchyroll.com/home*
// @exclude *crunchyroll.com/inbox*
// @exclude *crunchyroll.com/library*
// @exclude *crunchyroll.com/login*
// @exclude *crunchyroll.com/manga*
// @exclude *crunchyroll.com/newprivate*
// @exclude *crunchyroll.com/news*
// @exclude *crunchyroll.com/notifications*
// @exclude *crunchyroll.com/order*
// @exclude *crunchyroll.com/outbox*
// @exclude *crunchyroll.com/pm*
// @exclude *crunchyroll.com/search*
// @exclude *crunchyroll.com/store*
// @exclude *crunchyroll.com/user*
// @exclude *crunchyroll.com/videos*
// @exclude *crunchyroll.com/affiliate_iframeplayer*
// @exclude *gogoanime*.*/
// @exclude *gogoanime*.*/*.html
// @exclude *gogoanime*.*/anime-List*
// @exclude *://jkanime.net/
// @exclude *://jkanime.net/letra/*
// @exclude *://jkanime.net/buscar/*
// @exclude *://jkanime.net/terminos-condiciones/
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @resource material.css https://code.getmdl.io/1.3.0/material.indigo-pink.min.css
// @resource materialFont.css https://fonts.googleapis.com/icon?family=Material+Icons
// @resource material.js https://greasyfork.org/scripts/377924-material-design-lite-mal-sync/code/material-design-lite%20MAL-Sync.js?version=671593
// @run-at document_start
// @connect myanimelist.net
// @connect kissanimelist.firebaseio.com
// @connect graphql.anilist.co
// @connect *
// ==/UserScript==

var i18n = {"Search":"Search","Show":"Show","Help":"Help","Update":"Update","Reset":"Reset","Loading":"Loading","Select":"Select","Yes":"Yes","No":"No","NothingFound":"Nothing Found","Not_Found":"Not Found!","NoEntries":"No Entries","fullscreen":"fullscreen","close":"close","All":"All","Package_Description":"Integrates MyAnimeList/AniList/Kitsu into various sites, with auto episode tracking.","UI_Status":"Status:","UI_Status_watching_anime":"Watching","UI_Status_watching_manga":"Reading","UI_Status_Completed":"Completed","UI_Status_OnHold":"On-Hold","UI_Status_Dropped":"Dropped","UI_Status_planTo_anime":"Plan to Watch","UI_Status_planTo_manga":"Plan to Read","UI_Episode":"Episode:","UI_Volume":"Volume:","UI_Chapter":"Chapter:","UI_Score":"Your Score:","UI_Score_Not_Rated":"Not rated","UI_Score_Masterpiece":"(10) Masterpiece","UI_Score_Great":"(9) Great","UI_Score_VeryGood":"(8) Very Good","UI_Score_Good":"(7) Good","UI_Score_Fine":"(6) Fine","UI_Score_Average":"(5) Average","UI_Score_Bad":"(4) Bad","UI_Score_VeryBad":"(3) Very Bad","UI_Score_Horrible":"(2) Horrible","UI_Score_Appalling":"(1) Appalling","syncPage_flashm_resumeMsg":"Resume at $1","syncPage_flashm_sync_anime":"Update $1 to episode $2","syncPage_flashm_sync_manga":"Update $1 to chapter $2","syncPage_flashm_sync_undefined_undo":"Undo","syncPage_flashm_sync_undefined_wrong":"Wrong?","syncPage_flashm_failded":"Update failed","syncPage_flashConfirm_complete":"Set as completed?","syncPage_flashConfirm_start_anime":"Start watching?","syncPage_flashConfirm_start_manga":"Start reading?","syncPage_flashConfirm_Anime_Correct":"Is \"$1\" correct?","syncPage_malObj_addAnime":"Add to $1","syncPage_malObj_nextEp_anime":"Episode $1","syncPage_malObj_nextEp_manga":"Chapter $1","syncPage_flashConfirm_offsetHandler_1":"A possible Episode offset of $1 was detected. Is that correct? ","anilistClass_authentication":"Token saved you can close this page now","kitsuClass_authentication_text":"To login with Kitsu, you need to enter your account's e-mail and password.<br>Your credentials are not stored on your computer or anywhere else.<br>They are directly sent to Kitsu. Only the returned access token is saved.<br>","kitsuClass_authentication_Password":"Password","kitsuClass_authentication_Login":"Login","kitsuClass_authentication_Success":"Token saved you can close this page now","kitsuClass_authentication_Wrong":"Credentials wrong","bookmarksItem_Days":"Days","bookmarksItem_Day":"Day","bookmarksItem_Hours":"Hours","bookmarksItem_Hour":"Hour","bookmarksItem_mins":"mins","prediction_Episode":"Next episode estimated in $1","prediction_Airing":"Airing in $1","correction_Offset":"Episode Offset","correction_Offset_text":"Input the episode offset, if an anime has 12 episodes, but uses the numbers 0-11 rather than 1-12, you simply type \" +1 \" in the episode offset.","correction_WrongUrl":"Only change this URL if it points to the wrong anime page on MAL.","correction_Search":"Correction Search","correction_Search_text":"This field is for finding an anime, when you need to correct the \"MyAnimeList URL\" shown above.<br>To make a search, simply begin typing the name of an anime, and a list with results will automatically appear as you type.","correction_NoMal":"If the Anime/Manga can't be found on MAL","correction_NoEntry":"No entry on MyAnimeList","correction_NewOffset":"New Offset ($1) set.","correction_OffsetReset":"Offset reset","correction_NewUrl":"New URL '$1' set.","correction_NewUrlReset":"MyAnimeList URL reset","overview_Continue_anime":"Continue watching","overview_Continue_manga":"Continue reading","overview_Next_Episode_anime":"Next Episode","overview_Next_Episode_manga":"Next Chapter","overview_Resume_Episode_anime":"Resume Episode","overview_Resume_Episode_manga":"Resume Chapter","overview_EditDetails":"Edit Details","overview_Characters":"Characters","overview_OpeningTheme":"Opening Theme:","overview_EndingTheme":"Ending Theme:","search_Type":"Type:","search_Score":"Score:","search_Year":"Year:","settings_General":"General","settings_Mode":"Mode","settings_Authenticate":"Authenticate","settings_Animesync":"Anime sync","settings_Animesync_Video":"Video","settings_Animesync_Instant":"Instant","settings_Animesync_Manual":"Manual","settings_Mangasync":"Manga sync","settings_AutoTracking_Video":"Update on $1% of video progress","settings_AutoTracking_Instant":"Delay instant autotracking by $1 seconds","settings_StreamingSite":"Streaming Site Links","settings_StreamingSite_text":"If disabled, the streaming site will no longer appear in an animes sidebar on MyAnimeList/AniList/Kitsu.","settings_Thumbnails":"Thumbnails","settings_Thumbnails_text":"The option is for resizing the thumbnails on MyAnimeList.<br>Like thumbnails for characters, people, recommendations, etc.","settings_Thumbnails_Large":"Large","settings_Thumbnails_Medium":"Medium","settings_Thumbnails_Small":"Small","settings_Thumbnails_Default":"MAL Default","settings_FriendScore":"Friend scores on detail page","settings_epPredictions":"Estimate episode number","settings_malTags":"Use Tags/Notes","settings_malTags_Text":"If enabled: On your MyAnimeList/Anilist Anime List and the bookmark list in miniMAL, an icon-link will be added to the last used streaming site you were using to watch an anime.<br>Simply click the icon to continue watching the anime.","settings_malContinue":"Continue watching links","settings_malResume":"Resume watching links","settings_miniMAL_floatButtonStealth":"Stealth floating menu button","settings_miniMAL_floatButtonHide":"Hide miniMAL floating menu button","settings_miniMAL_autoCloseMinimal":"Clicking outside closes miniMAL","settings_miniMAL_Display":"Display to the","settings_miniMAL_Display_Left":"Left","settings_miniMAL_Display_Right":"Right","settings_miniMAL_Height":"Height (px / %)","settings_miniMAL_Width":"Width (px / %)","settings_Shortcuts":"Shortcuts","settings_miniMAL_Open":"Open miniMAL","settings_miniMAL_NotSet":"Not Set","settings_Shortcuts_Skip_Forward":"Skips the opening","settings_Shortcuts_Skip_Backward":"Jump back to opening's beginning","settings_introSkip":"Set opening skip length ($1 Seconds)","settings_UpdateCheck":"Update Check","settings_UpdateCheck_Text":"Checks for new episodes in the background.","settings_Interval":"Interval","settings_Interval_Off":"Off","settings_Notifications":"Notifications","settings_Debugging":"Debugging","settings_ETC":"ETC","settings_Userscriptmode":"Userscript mode","settings_Userscriptmode_Text":"Disables the content script. This makes it possible to have the extension and userscript enabled at the same time.","settings_StrictCookies":"Strict Cookies","settings_StrictCookies_Text":"This option adds Firefox Multi-Account Containers support. Make sure to restart the browser after enabling this option","settings_ClearCache":"Clear Cache","updateCheck_Refresh":"Refresh","updateCheck_StartCheck":"Start Check","updateCheck_NotificationCheck":"Notification Check","updateCheck_Episode":"Episode","updateCheck_Message":"Message","updateCheck_NotificationHistory":"Notification History","minimalApp_Overview":"Overview","minimalApp_Reviews":"Reviews","minimalApp_Recommendations":"Recommendations","minimalApp_Settings":"Settings","minimalClass_Popup":"Please allow pop-ups for this website","minimalClass_versionMsg":"Updated to version $1 $2CHANGELOG</a>]","minimalClass_versionMsg_Text_1":"Thanks for installing MAL-Sync","minimalClass_versionMsg_Text_2":"Having Questions?","minimalClass_versionMsg_Text_3":"Open Source Code:","minimalClass_versionMsg_Text_4":"uBlock users please subscribe to this filter list!<br>This fixes some problems like broken images","Anilist_Authenticate":"Please Authenticate <a target=\"_blank\" href=\"https://anilist.co/api/v2/oauth/authorize?client_id=1487&response_type=token\">Here</a>","Emby_Authenticate":"MAL-Sync needs an emby api key to work. More infos <a href=\"https://github.com/MediaBrowser/Emby/wiki/Api-Key-Authentication#creating-an-api-key\" target=\"_blank\">Here</a>"}
!function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.l = !0, module.exports;
    }
    __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            enumerable: !0,
            get: getter
        });
    }, __webpack_require__.r = function(exports) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(exports, "__esModule", {
            value: !0
        });
    }, __webpack_require__.t = function(value, mode) {
        if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
        if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
        var ns = Object.create(null);
        if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
            enumerable: !0,
            value: value
        }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
            return value[key];
        }.bind(null, key));
        return ns;
    }, __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module.default;
        } : function() {
            return module;
        };
        return __webpack_require__.d(getter, "a", getter), getter;
    }, __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 78);
}([ function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    var userscriptLegacy = __webpack_require__(36), __awaiter = function(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator.throw(value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : new P(function(resolve) {
                    resolve(result.value);
                }).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    const requestUserscriptLegacy = {
        xhr(method, url) {
            return __awaiter(this, void 0, void 0, function*() {
                return new Promise((resolve, reject) => {
                    var request = {
                        method: method,
                        url: url,
                        synchronous: !1,
                        headers: [],
                        data: null,
                        onload: function(response) {
                            console.log(response);
                            var responseObj = {
                                finalUrl: response.finalUrl,
                                responseText: response.responseText,
                                status: response.status
                            };
                            resolve(responseObj);
                        }
                    };
                    "object" == typeof url && (request.url = url.url, request.headers = url.headers, 
                    request.data = url.data), GM_xmlhttpRequest(request);
                });
            });
        }
    };
    var settings = __webpack_require__(37);
    __webpack_require__.d(__webpack_exports__, "storage", function() {
        return storage;
    }), __webpack_require__.d(__webpack_exports__, "request", function() {
        return request;
    }), __webpack_require__.d(__webpack_exports__, "settings", function() {
        return userscript_settings;
    }), __webpack_require__.d(__webpack_exports__, "type", function() {
        return type;
    });
    var storage = userscriptLegacy.a, request = requestUserscriptLegacy, userscript_settings = settings.a, type = "userscript";
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "log", function() {
        return log;
    }), __webpack_require__.d(__webpack_exports__, "error", function() {
        return error;
    }), __webpack_require__.d(__webpack_exports__, "info", function() {
        return info;
    });
    var log = Function.prototype.bind.call(console.log, console, "%cMAL-Sync", "background-color: #2e51a2; color: white; padding: 2px 10px; border-radius: 3px;"), error = Function.prototype.bind.call(console.error, console, "%cMAL-Sync", "background-color: #8f0000; color: white; padding: 2px 10px; border-radius: 3px;"), info = Function.prototype.bind.call(console.info, console, "%cMAL-Sync", "background-color: wheat; color: black; padding: 2px 10px; border-radius: 3px;");
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), function(j, api, con, utils) {
        __webpack_require__.d(__webpack_exports__, "urlPart", function() {
            return urlPart;
        }), __webpack_require__.d(__webpack_exports__, "urlParam", function() {
            return urlParam;
        }), __webpack_require__.d(__webpack_exports__, "getBaseText", function() {
            return getBaseText;
        }), __webpack_require__.d(__webpack_exports__, "favicon", function() {
            return favicon;
        }), __webpack_require__.d(__webpack_exports__, "watching", function() {
            return watching;
        }), __webpack_require__.d(__webpack_exports__, "planTo", function() {
            return planTo;
        }), __webpack_require__.d(__webpack_exports__, "episode", function() {
            return episode;
        }), __webpack_require__.d(__webpack_exports__, "syncRegex", function() {
            return syncRegex;
        }), __webpack_require__.d(__webpack_exports__, "status", function() {
            return status;
        }), __webpack_require__.d(__webpack_exports__, "getselect", function() {
            return getselect;
        }), __webpack_require__.d(__webpack_exports__, "absoluteLink", function() {
            return absoluteLink;
        }), __webpack_require__.d(__webpack_exports__, "urlChangeDetect", function() {
            return urlChangeDetect;
        }), __webpack_require__.d(__webpack_exports__, "changeDetect", function() {
            return changeDetect;
        }), __webpack_require__.d(__webpack_exports__, "waitUntilTrue", function() {
            return waitUntilTrue;
        }), __webpack_require__.d(__webpack_exports__, "getUrlFromTags", function() {
            return getUrlFromTags;
        }), __webpack_require__.d(__webpack_exports__, "setUrlInTags", function() {
            return setUrlInTags;
        }), __webpack_require__.d(__webpack_exports__, "setResumeWaching", function() {
            return setResumeWaching;
        }), __webpack_require__.d(__webpack_exports__, "getResumeWaching", function() {
            return getResumeWaching;
        }), __webpack_require__.d(__webpack_exports__, "setContinueWaching", function() {
            return setContinueWaching;
        }), __webpack_require__.d(__webpack_exports__, "getContinueWaching", function() {
            return getContinueWaching;
        }), __webpack_require__.d(__webpack_exports__, "handleMalImages", function() {
            return handleMalImages;
        }), __webpack_require__.d(__webpack_exports__, "getMalToKissArray", function() {
            return getMalToKissArray;
        }), __webpack_require__.d(__webpack_exports__, "getTooltip", function() {
            return getTooltip;
        }), __webpack_require__.d(__webpack_exports__, "epPredictionUI", function() {
            return epPredictionUI;
        }), __webpack_require__.d(__webpack_exports__, "timeDiffToText", function() {
            return timeDiffToText;
        }), __webpack_require__.d(__webpack_exports__, "canHideTabs", function() {
            return canHideTabs;
        }), __webpack_require__.d(__webpack_exports__, "epPrediction", function() {
            return epPrediction;
        }), __webpack_require__.d(__webpack_exports__, "statusTag", function() {
            return statusTag;
        }), __webpack_require__.d(__webpack_exports__, "notifications", function() {
            return notifications;
        }), __webpack_require__.d(__webpack_exports__, "timeCache", function() {
            return timeCache;
        }), __webpack_require__.d(__webpack_exports__, "flashm", function() {
            return flashm;
        }), __webpack_require__.d(__webpack_exports__, "flashConfirm", function() {
            return flashConfirm;
        }), __webpack_require__.d(__webpack_exports__, "lazyload", function() {
            return lazyload;
        }), __webpack_require__.d(__webpack_exports__, "elementInViewport", function() {
            return elementInViewport;
        });
        var __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = Promise))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator.throw(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        function urlPart(url, part) {
            try {
                return url.split("/")[part].split("?")[0];
            } catch (e) {
                return;
            }
        }
        function urlParam(url, name) {
            var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(url);
            return null == results ? null : decodeURI(results[1]) || 0;
        }
        function getBaseText(element) {
            var text = element.text();
            return element.children().each(function() {
                text = text.replace(j.$(this).text(), "");
            }), text;
        }
        function favicon(domain) {
            return -1 !== domain.indexOf("animeheaven") ? "http://animeheaven.eu/favicon.ico" : "https://www.google.com/s2/favicons?domain=" + domain;
        }
        function watching(type) {
            return "manga" == type ? "Reading" : "Watching";
        }
        function planTo(type) {
            return "manga" == type ? "Plan to Read" : "Plan to Watch";
        }
        function episode(type) {
            return "manga" == type ? api.storage.lang("UI_Chapter") : api.storage.lang("UI_Episode");
        }
        var status, syncRegex = /(^settings\/.*|^resume\/.*|^continue\/.*|^.*\/Offset$|^updateCheckTime$|^tempVersion$)/;
        function getselect(data, name) {
            var temp = data.split('name="' + name + '"')[1].split("</select>")[0];
            if (!(temp.indexOf('selected="selected"') > -1)) return "";
            temp = temp.split("<option");
            for (var i = 0; i < temp.length; ++i) if (temp[i].indexOf('selected="selected"') > -1) return temp[i].split('value="')[1].split('"')[0];
        }
        function absoluteLink(url, domain) {
            return void 0 === url ? url : (url.startsWith("http") || ("/" !== url.charAt(0) && (url = "/" + url), 
            url = domain + url), url);
        }
        function urlChangeDetect(callback) {
            var currentPage = window.location.href;
            return setInterval(function() {
                currentPage != window.location.href && (currentPage = window.location.href, callback());
            }, 1e3);
        }
        function changeDetect(callback, func) {
            var currentPage = func();
            return setInterval(function() {
                var temp = func();
                void 0 !== temp && currentPage != temp && (currentPage = func(), callback());
            }, 1e3);
        }
        function waitUntilTrue(condition, callback) {
            var Interval = null;
            return Interval = setInterval(function() {
                condition() && (clearInterval(Interval), callback());
            }, 1e3);
        }
        function getUrlFromTags(tags) {
            if (api.settings.get("malTags")) return /malSync::[\d\D]+::/.test(tags) ? atobURL(tags.split("malSync::")[1].split("::")[0]) : /last::[\d\D]+::/.test(tags) ? atobURL(tags.split("last::")[1].split("::")[0]) : void 0;
            function atobURL(encoded) {
                try {
                    return atob(encoded);
                } catch (e) {
                    return encoded;
                }
            }
        }
        function setUrlInTags(url, tags) {
            if (!api.settings.get("malTags")) return tags;
            var addition = "malSync::" + btoa(url) + "::";
            return tags = /(last|malSync)::[\d\D]+::/.test(tags) ? tags.replace(/(last|malSync)::[^\^]*?::/, addition) : tags + "," + addition;
        }
        function setResumeWaching(url, ep, type, id) {
            return __awaiter(this, void 0, void 0, function*() {
                return api.storage.set("resume/" + type + "/" + id, {
                    url: url,
                    ep: ep
                });
            });
        }
        function getResumeWaching(type, id) {
            return __awaiter(this, void 0, void 0, function*() {
                if (api.settings.get("malResume")) return api.storage.get("resume/" + type + "/" + id);
            });
        }
        function setContinueWaching(url, ep, type, id) {
            return __awaiter(this, void 0, void 0, function*() {
                return api.storage.set("continue/" + type + "/" + id, {
                    url: url,
                    ep: ep
                });
            });
        }
        function getContinueWaching(type, id) {
            return __awaiter(this, void 0, void 0, function*() {
                if (api.settings.get("malContinue")) return api.storage.get("continue/" + type + "/" + id);
            });
        }
        function handleMalImages(url) {
            return -1 !== url.indexOf("questionmark") ? api.storage.assetUrl("questionmark.gif") : url;
        }
        function getMalToKissArray(type, id) {
            return __awaiter(this, void 0, void 0, function*() {
                return new Promise((resolve, reject) => {
                    var url = "https://kissanimelist.firebaseio.com/Data2/Mal" + type + "/" + id + "/Sites.json";
                    api.request.xhr("GET", url).then(response => __awaiter(this, void 0, void 0, function*() {
                        var json = j.$.parseJSON(response.responseText);
                        for (var pageKey in json) {
                            var page = json[pageKey];
                            if (api.settings.get(pageKey)) for (var streamKey in page) {
                                var stream = page[streamKey], streamUrl = "https://kissanimelist.firebaseio.com/Data2/" + stream + "/" + encodeURIComponent(streamKey) + ".json", cache = yield api.storage.get("MalToKiss/" + stream + "/" + encodeURIComponent(streamKey), null);
                                if (void 0 !== cache) var streamJson = cache; else {
                                    var streamRespose = yield api.request.xhr("GET", streamUrl);
                                    streamJson = j.$.parseJSON(streamRespose.responseText);
                                    api.storage.set("MalToKiss/" + stream + "/" + encodeURIComponent(streamKey), streamJson);
                                }
                                "Crunchyroll" == pageKey && (streamJson.url = streamJson.url + "?season=" + streamKey), 
                                json[pageKey][streamKey] = streamJson;
                            } else con.log(pageKey + " is deactivated"), delete json[pageKey];
                        }
                        con.log("Mal2Kiss", json), resolve(json);
                    }));
                });
            });
        }
        function getTooltip(text, style = "", direction = "top") {
            var rNumber = Math.floor(1e3 * Math.random() + 1);
            return '<div id="tt' + rNumber + '" class="icon material-icons" style="font-size:16px; line-height: 0; color: #7f7f7f; padding-bottom: 20px; padding-left: 3px; ' + style + '">contact_support</div>  <div class="mdl-tooltip mdl-tooltip--' + direction + ' mdl-tooltip--large" for="tt' + rNumber + '">' + text + "</div>";
        }
        function epPredictionUI(malid, type = "anime", callback) {
            return __awaiter(this, void 0, void 0, function*() {
                utils.epPrediction(malid, function(pre) {
                    return __awaiter(this, void 0, void 0, function*() {
                        pre || callback(!1);
                        var updateCheckTime = yield api.storage.get("updateCheckTime"), aniCache = yield api.storage.get("mal/" + malid + "/aniSch"), elCache = void 0;
                        if (void 0 !== updateCheckTime && updateCheckTime && "0" != updateCheckTime && (elCache = yield api.storage.get("updateCheck/" + type + "/" + malid)), 
                        !1 !== pre || void 0 !== elCache) {
                            var UI = {
                                tag: "",
                                text: "",
                                color: "",
                                colorStyle: "",
                                tagEpisode: !1,
                                prediction: pre,
                                aniCache: aniCache,
                                elCache: elCache
                            }, airing = pre.airing, episode = pre.episode;
                            if (void 0 !== aniCache) {
                                var timestamp = 1e3 * aniCache.nextEpTime;
                                if (Date.now() < timestamp) {
                                    episode = aniCache.currentEp;
                                    var delta = (timestamp - Date.now()) / 1e3;
                                    pre.diffDays = Math.floor(delta / 86400), delta -= 86400 * pre.diffDays, pre.diffHours = Math.floor(delta / 3600) % 24, 
                                    delta -= 3600 * pre.diffHours, pre.diffMinutes = Math.floor(delta / 60) % 60, delta -= 60 * pre.diffMinutes;
                                } else Date.now() - timestamp < 864e5 && (episode = aniCache.currentEp + 1);
                            }
                            void 0 !== elCache && void 0 === elCache.error && (elCache.finished || (airing = !0), 
                            elCache.newestEp && "" != elCache.newestEp && void 0 !== elCache.newestEp && (episode = elCache.newestEp, 
                            UI.color = "red")), "" != UI.color && (UI.colorStyle = "background-color: #00ff0057;"), 
                            airing ? (pre.airing && (UI.text = api.storage.lang("prediction_Episode", [ pre.diffDays + "d " + pre.diffHours + "h " + pre.diffMinutes + "m" ])), 
                            episode && (UI.tag = '<span class="mal-sync-ep-pre" title="' + UI.text + '">[<span style="' + UI.colorStyle + ';">' + episode + "</span>]</span>", 
                            UI.tagEpisode = episode)) : pre && (UI.text = '<span class="mal-sync-ep-pre">', 
                            UI.text += api.storage.lang("prediction_Airing", [ 7 * pre.diffWeeks + pre.diffDays + "d " + pre.diffHours + "h " + pre.diffMinutes + "m " ]), 
                            UI.text += "</span>"), callback(UI);
                        }
                    });
                });
            });
        }
        function timeDiffToText(delta) {
            var text = "";
            delta /= 1e3;
            var diffDays = Math.floor(delta / 86400);
            delta -= 86400 * diffDays, diffDays && (text += diffDays + "d ");
            var diffHours = Math.floor(delta / 3600) % 24;
            delta -= 3600 * diffHours, diffHours && diffDays < 2 && (text += diffHours + "h ");
            var diffMinutes = Math.floor(delta / 60) % 60;
            return delta -= 60 * diffMinutes, diffMinutes && !diffDays && diffHours < 3 && (text += diffMinutes + "min "), 
            text;
        }
        function canHideTabs() {
            return "undefined" != typeof browser && void 0 !== browser.tabs.hide;
        }
        function epPrediction(malId, callback) {
            return __awaiter(this, void 0, void 0, function*() {
                if (api.settings.get("epPredictions")) {
                    var timestamp = yield api.storage.get("mal/" + malId + "/release");
                    if (void 0 !== timestamp) {
                        var airing = 1, episode = 0;
                        if (Date.now() < timestamp && (airing = 0), airing) var delta = Math.abs(Date.now() - timestamp) / 1e3; else delta = Math.abs(timestamp - Date.now()) / 1e3;
                        var diffWeeks = Math.floor(delta / 604800);
                        delta -= 604800 * diffWeeks, airing && (delta = 604800 - delta);
                        var diffDays = Math.floor(delta / 86400);
                        delta -= 86400 * diffDays;
                        var diffHours = Math.floor(delta / 3600) % 24;
                        delta -= 3600 * diffHours;
                        var diffMinutes = Math.floor(delta / 60) % 60;
                        delta -= 60 * diffMinutes, airing && (episode = diffWeeks - (new Date().getFullYear() - new Date(timestamp).getFullYear()), 
                        ++episode > 50 && (episode = 0));
                        var maxEp = yield api.storage.get("mal/" + malId + "/release");
                        if (void 0 === maxEp || episode < maxEp) return void callback({
                            timestamp: timestamp,
                            airing: airing,
                            diffWeeks: diffWeeks,
                            diffDays: diffDays,
                            diffHours: diffHours,
                            diffMinutes: diffMinutes,
                            episode: episode
                        });
                    }
                    callback(!1);
                }
            });
        }
        function statusTag(status, type, id) {
            var info = {
                anime: {
                    1: {
                        class: "watching",
                        text: "CW",
                        title: "Watching"
                    },
                    2: {
                        class: "completed",
                        text: "CMPL",
                        title: "Completed"
                    },
                    3: {
                        class: "on-hold",
                        text: " HOLD",
                        title: "On-Hold"
                    },
                    4: {
                        class: "dropped",
                        text: "DROP",
                        title: "Dropped"
                    },
                    6: {
                        class: "plantowatch",
                        text: "PTW",
                        title: "Plan to Watch"
                    }
                },
                manga: {
                    1: {
                        class: "reading",
                        text: "CR",
                        title: "Reading"
                    },
                    2: {
                        class: "completed",
                        text: "CMPL",
                        title: "Completed"
                    },
                    3: {
                        class: "on-hold",
                        text: " HOLD",
                        title: "On-Hold"
                    },
                    4: {
                        class: "dropped",
                        text: "DROP",
                        title: "Dropped"
                    },
                    6: {
                        class: "plantoread",
                        text: "PTR",
                        title: "Plan to Read"
                    }
                }
            };
            if ($.each([ 1, 2, 3, 4, 6 ], function(i, el) {
                info.anime[info.anime[el].title] = info.anime[el], info.manga[info.manga[el].title] = info.manga[el];
            }), status) {
                var tempInfo = info[type][status];
                return ` <a href="https://myanimelist.net/ownlist/${type}/${id}/edit?hideLayout=1" title="${tempInfo.title}" class="Lightbox_AddEdit button_edit ${tempInfo.class}">${tempInfo.text}</a>`;
            }
            return !1;
        }
        function notifications(url, title, message, iconUrl = "") {
            var messageObj = {
                type: "basic",
                title: title,
                message: message,
                iconUrl: iconUrl
            };
            con.log("Notification", url, messageObj), api.storage.get("notificationHistory").then(history => {
                void 0 === history && (history = []), history.length >= 10 && history.shift(), history.push({
                    url: url,
                    title: messageObj.title,
                    message: messageObj.message,
                    iconUrl: messageObj.iconUrl,
                    timestamp: Date.now()
                }), api.storage.set("notificationHistory", history);
            });
            try {
                return chrome.notifications.create(url, messageObj);
            } catch (e) {
                con.error(e);
            }
        }
        function timeCache(key, dataFunction, ttl) {
            return __awaiter(this, void 0, void 0, function*() {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function*() {
                    var value = yield api.storage.get(key);
                    if (void 0 !== value && new Date().getTime() < value.timestamp) resolve(value.data); else {
                        var result = yield dataFunction();
                        api.storage.set(key, {
                            data: result,
                            timestamp: new Date().getTime() + ttl
                        }).then(() => {
                            resolve(result);
                        });
                    }
                }));
            });
        }
        function flashm(text, options) {
            j.$("#flash-div-top").length || (api.storage.addStyle('.flashinfo{                    transition: max-height 2s;                 }                 .flashinfo:hover{                    max-height:5000px !important;                    z-index: 2147483647;                 }                 .flashinfo .synopsis{                    transition: max-height 2s, max-width 2s ease 2s;                 }                 .flashinfo:hover .synopsis{                    max-height:9999px !important;                    max-width: 500px !important;                    transition: max-height 2s;                 }                 #flashinfo-div{                  z-index: 2;                  transition: 2s;                 }                 #flashinfo-div:hover, #flashinfo-div.hover{                  z-index: 2147483647;                 }                                  #flash-div-top, #flash-div-bottom, #flashinfo-div{                    font-family: "Helvetica","Arial",sans-serif;                    color: white;                    font-size: 14px;                    font-weight: 400;                    line-height: 17px;                 }                 #flash-div-top h2, #flash-div-bottom h2, #flashinfo-div h2{                    font-family: "Helvetica","Arial",sans-serif;                    color: white;                    font-size: 14px;                    font-weight: 700;                    line-height: 17px;                    padding: 0;                    margin: 0;                 }                 #flash-div-top a, #flash-div-bottom a, #flashinfo-div a{                    color: #DF6300;                 }'), 
            j.$("body").after('<div id="flash-div-top" style="text-align: center;pointer-events: none;position: fixed;top:-5px;width:100%;z-index: 2147483647;left: 0;"></div>        <div id="flash-div-bottom" style="text-align: center;pointer-events: none;position: fixed;bottom:0px;width:100%;z-index: 2147483647;left: 0;"><div id="flash" style="display:none;  background-color: red;padding: 20px; margin: 0 auto;max-width: 60%;          -webkit-border-radius: 20px;-moz-border-radius: 20px;border-radius: 20px;background:rgba(227,0,0,0.6);"></div></div>        <div id="flashinfo-div" style="text-align: center;pointer-events: none;position: fixed;bottom:0px;width:100%;left: 0;">')), 
            con.log("[Flash] Message:", text);
            var colorF = "#323232";
            if (void 0 !== options && void 0 !== options.error && options.error) colorF = "#3e0808";
            var flashdiv = "#flash-div-bottom";
            void 0 !== options && void 0 !== options.position && options.position && (flashdiv = "#flash-div-" + options.position);
            var messClass = "flash";
            if (void 0 !== options && void 0 !== options.type && options.type) {
                var tempClass = "type-" + options.type;
                j.$(flashdiv + " ." + tempClass + ", #flashinfo-div ." + tempClass).removeClass(tempClass).fadeOut({
                    duration: 1e3,
                    queue: !1,
                    complete: function() {
                        j.$(this).remove();
                    }
                }), messClass += " " + tempClass;
            }
            var mess = '<div class="' + messClass + '" style="display:none;">        <div style="display:table; pointer-events: all; padding: 14px 24px 14px 24px; margin: 0 auto; margin-top: 5px; max-width: 60%; -webkit-border-radius: 20px;-moz-border-radius: 20px;border-radius: 2px;color: white;background:' + colorF + '; ">          ' + text + "        </div>      </div>";
            if (void 0 !== options && void 0 !== options.hoverInfo && options.hoverInfo) {
                mess = '<div class="' + (messClass += " flashinfo") + '" style="display:none; max-height: 5000px; overflow: hidden;"><div style="display:table; pointer-events: all; margin: 0 auto; margin-top: -2px; max-width: 60%; -webkit-border-radius: 20px;-moz-border-radius: 20px;border-radius: 2px;color: white;background:' + colorF + '; position: relative;"><div style="max-height: 60vh; overflow-y: auto; padding: 14px 24px 14px 24px;">' + text + "</div></div></div>", 
                j.$("#flashinfo-div").addClass("hover");
                var flashm = j.$(mess).appendTo("#flashinfo-div");
                void 0 !== options && void 0 !== options.minimized && options.minimized && flashm.css("max-height", "8px");
            } else flashm = j.$(mess).appendTo(flashdiv);
            return void 0 !== options && void 0 !== options.permanent && options.permanent ? flashm.slideDown(800) : void 0 !== options && void 0 !== options.hoverInfo && options.hoverInfo ? flashm.slideDown(800).delay(4e3).queue(function() {
                j.$("#flashinfo-div").removeClass("hover"), flashm.css("max-height", "8px");
            }) : flashm.slideDown(800).delay(4e3).slideUp(800, () => {
                j.$(this).remove();
            }), flashm;
        }
        function flashConfirm(message, type, yesCall = (() => {}), cancelCall = (() => {})) {
            return __awaiter(this, void 0, void 0, function*() {
                return new Promise(function(resolve, reject) {
                    var flasmessage = flashm(message = '<div style="text-align: center;">' + message + '</div><div style="display: flex; justify-content: space-around;"><button class="Yes" style="background-color: transparent; border: none; color: rgb(255,64,129);margin-top: 10px; cursor:pointer;">OK</button><button class="Cancel" style="background-color: transparent; border: none; color: rgb(255,64,129);margin-top: 10px; cursor:pointer;">CANCEL</button></div>', {
                        permanent: !0,
                        position: "top",
                        type: type
                    });
                    flasmessage.find(".Yes").click(function(evt) {
                        j.$(evt.target).parentsUntil(".flash").remove(), resolve(!0), yesCall();
                    }), flasmessage.find(".Cancel").click(function(evt) {
                        j.$(evt.target).parentsUntil(".flash").remove(), resolve(!1), cancelCall();
                    });
                });
            });
        }
        !function(status) {
            status[status.watching = 1] = "watching", status[status.completed = 2] = "completed", 
            status[status.onhold = 3] = "onhold", status[status.dropped = 4] = "dropped", status[status.planToWatch = 6] = "planToWatch";
        }(status || (status = {}));
        var lazyloaded = !1, lazyimages = new Array();
        function lazyload(doc, scrollElement = ".mdl-layout__content") {
            function loadImage(el, fn) {
                if (!j.$(el).is(":visible")) return !1;
                if (j.$(el).hasClass("lazyBack")) j.$(el).css("background-image", "url(" + el.getAttribute("data-src") + ")").removeClass("lazyBack"); else {
                    var img = new Image(), src = el.getAttribute("data-src");
                    img.onload = function() {
                        el.parent ? el.parent.replaceChild(img, el) : el.src = src, fn && fn();
                    }, img.src = src;
                }
            }
            for (var i = 0; i < lazyimages.length; i++) $(lazyimages[i]).addClass("init");
            lazyimages = new Array();
            var query = doc.find("img.lazy.init, .lazyBack.init"), processScroll = function() {
                for (var i = 0; i < lazyimages.length; i++) utils.elementInViewport(lazyimages[i], 600) && loadImage(lazyimages[i], function() {
                    lazyimages.splice(i, i);
                }), $(lazyimages[i]).length || lazyimages.splice(i, i);
            };
            for (i = 0; i < query.length; i++) lazyimages.push(query[i]), $(query[i]).removeClass("init");
            processScroll(), lazyloaded || (lazyloaded = !0, doc.find(scrollElement).scroll(function() {
                processScroll();
            }));
        }
        function elementInViewport(el, horizontalOffset = 0) {
            var rect = el.getBoundingClientRect();
            return rect.top >= 0 && rect.left >= 0 && rect.top - horizontalOffset <= (window.innerHeight || document.documentElement.clientHeight);
        }
    }.call(this, __webpack_require__(3), __webpack_require__(0), __webpack_require__(1), __webpack_require__(2));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "$", function() {
        return $;
    });
    var $ = jQuery;
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    function normalizeComponent(scriptExports, render, staticRenderFns, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
        var hook, options = "function" == typeof scriptExports ? scriptExports.options : scriptExports;
        if (render && (options.render = render, options.staticRenderFns = staticRenderFns, 
        options._compiled = !0), functionalTemplate && (options.functional = !0), scopeId && (options._scopeId = "data-v-" + scopeId), 
        moduleIdentifier ? (hook = function(context) {
            (context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (context = __VUE_SSR_CONTEXT__), 
            injectStyles && injectStyles.call(this, context), context && context._registeredComponents && context._registeredComponents.add(moduleIdentifier);
        }, options._ssrRegister = hook) : injectStyles && (hook = shadowMode ? function() {
            injectStyles.call(this, this.$root.$options.shadowRoot);
        } : injectStyles), hook) if (options.functional) {
            options._injectStyles = hook;
            var originalRender = options.render;
            options.render = function(h, context) {
                return hook.call(context), originalRender(h, context);
            };
        } else {
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [ hook ];
        }
        return {
            exports: scriptExports,
            options: options
        };
    }
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return normalizeComponent;
    });
}, function(module, exports) {
    module.exports = function(useSourceMap) {
        var list = [];
        return list.toString = function() {
            return this.map(function(item) {
                var content = function(item, useSourceMap) {
                    var content = item[1] || "", cssMapping = item[3];
                    if (!cssMapping) return content;
                    if (useSourceMap && "function" == typeof btoa) {
                        var sourceMapping = (sourceMap = cssMapping, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */"), sourceURLs = cssMapping.sources.map(function(source) {
                            return "/*# sourceURL=" + cssMapping.sourceRoot + source + " */";
                        });
                        return [ content ].concat(sourceURLs).concat([ sourceMapping ]).join("\n");
                    }
                    var sourceMap;
                    return [ content ].join("\n");
                }(item, useSourceMap);
                return item[2] ? "@media " + item[2] + "{" + content + "}" : content;
            }).join("");
        }, list.i = function(modules, mediaQuery) {
            "string" == typeof modules && (modules = [ [ null, modules, "" ] ]);
            for (var alreadyImportedModules = {}, i = 0; i < this.length; i++) {
                var id = this[i][0];
                "number" == typeof id && (alreadyImportedModules[id] = !0);
            }
            for (i = 0; i < modules.length; i++) {
                var item = modules[i];
                "number" == typeof item[0] && alreadyImportedModules[item[0]] || (mediaQuery && !item[2] ? item[2] = mediaQuery : mediaQuery && (item[2] = "(" + item[2] + ") and (" + mediaQuery + ")"), 
                list.push(item));
            }
        }, list;
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(api, utils, con) {
        __webpack_require__.d(__webpack_exports__, "e", function() {
            return translateList;
        }), __webpack_require__.d(__webpack_exports__, "a", function() {
            return accessToken;
        }), __webpack_require__.d(__webpack_exports__, "b", function() {
            return errorHandling;
        }), __webpack_require__.d(__webpack_exports__, "d", function() {
            return malToKitsu;
        }), __webpack_require__.d(__webpack_exports__, "c", function() {
            return kitsuSlugtoKitsu;
        }), __webpack_require__.d(__webpack_exports__, "f", function() {
            return userId;
        });
        var _templates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12), __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = Promise))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator.throw(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        function translateList(aniStatus, malStatus = null) {
            var list = {
                current: 1,
                planned: 6,
                completed: 2,
                dropped: 4,
                on_hold: 3
            };
            return null != malStatus ? Object.keys(list).find(key => list[key] === malStatus) : list[aniStatus];
        }
        function accessToken() {
            return api.settings.get("kitsuToken");
        }
        function errorHandling(res, silent = !1) {
            void 0 !== res.errors && res.errors.forEach(error => {
                switch (parseInt(error.status)) {
                  case 401:
                  case 403:
                    throw silent || utils.flashm(_templates__WEBPACK_IMPORTED_MODULE_0__.a.noLogin, {
                        error: !0,
                        type: "error"
                    }), error.message;

                  case 404:
                    silent || utils.flashm("kitsu: " + error.title, {
                        error: !0,
                        type: "error"
                    });
                    break;

                  default:
                    throw silent || utils.flashm("kitsu: " + error.title, {
                        error: !0,
                        type: "error"
                    }), error.message;
                }
            });
        }
        function malToKitsu(malid, type) {
            return api.request.xhr("Get", {
                url: "https://kitsu.io/api/edge/mappings?filter[externalSite]=myanimelist/" + type + "&filter[externalId]=" + malid + "&include=item&fields[item]=id",
                headers: {
                    "Content-Type": "application/vnd.api+json",
                    Accept: "application/vnd.api+json"
                }
            }).then(response => {
                return JSON.parse(response.responseText);
            });
        }
        function kitsuSlugtoKitsu(kitsuSlug, type) {
            return api.request.xhr("Get", {
                url: "https://kitsu.io/api/edge/" + type + "?filter[slug]=" + kitsuSlug + "&page[limit]=1&include=mappings",
                headers: {
                    "Content-Type": "application/vnd.api+json",
                    Accept: "application/vnd.api+json"
                }
            }).then(response => {
                for (var res = JSON.parse(response.responseText), malId = NaN, k = 0; k < res.included.length; k++) {
                    var mapping = res.included[k];
                    if ("mappings" == mapping.type && mapping.attributes.externalSite === "myanimelist/" + type) {
                        malId = mapping.attributes.externalId, res.included.splice(k, 1);
                        break;
                    }
                }
                return {
                    res: res,
                    malId: malId
                };
            });
        }
        function userId() {
            return __awaiter(this, void 0, void 0, function*() {
                var userId = yield api.storage.get("kitsuUserId");
                return void 0 !== userId ? userId : api.request.xhr("Get", {
                    url: "https://kitsu.io/api/edge/users?filter[self]=true",
                    headers: {
                        Authorization: "Bearer " + accessToken(),
                        "Content-Type": "application/vnd.api+json",
                        Accept: "application/vnd.api+json"
                    }
                }).then(response => {
                    var res = JSON.parse(response.responseText);
                    if (con.log(res), !res.data.length || "undefined" == res.data[0]) throw utils.flashm(_templates__WEBPACK_IMPORTED_MODULE_0__.a.noLogin, {
                        error: !0,
                        type: "error"
                    }), "Not authentificated";
                    return api.storage.set("kitsuUserId", res.data[0].id), res.data[0].id;
                });
            });
        }
    }).call(this, __webpack_require__(0), __webpack_require__(2), __webpack_require__(1));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(api, utils, con) {
        function translateList(aniStatus, malStatus = null) {
            var list = {
                CURRENT: 1,
                PLANNING: 6,
                COMPLETED: 2,
                DROPPED: 4,
                PAUSED: 3,
                REPEATING: 1
            };
            return null != malStatus ? Object.keys(list).find(key => list[key] === malStatus) : list[aniStatus];
        }
        function accessToken() {
            return api.settings.get("anilistToken");
        }
        function errorHandling(res, silent = !1) {
            void 0 !== res.errors && res.errors.forEach(error => {
                switch (error.status) {
                  case 400:
                    silent || utils.flashm(api.storage.lang("Anilist_Authenticate"), {
                        error: !0,
                        type: "error"
                    });
                    break;

                  case 404:
                    silent || utils.flashm("anilist: " + error.message, {
                        error: !0,
                        type: "error"
                    });
                    break;

                  default:
                    throw silent || utils.flashm("anilist: " + error.message, {
                        error: !0,
                        type: "error"
                    }), error.message;
                }
            });
        }
        function aniListToMal(anilistId, type) {
            var variables = {
                id: anilistId,
                type: type.toUpperCase()
            };
            return api.request.xhr("POST", {
                url: "https://graphql.anilist.co",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                data: JSON.stringify({
                    query: "\n  query ($id: Int, $type: MediaType) {\n    Media (id: $id, type: $type) {\n      id\n      idMal\n    }\n  }\n  ",
                    variables: variables
                })
            }).then(response => {
                var res = JSON.parse(response.responseText);
                return con.log(res), errorHandling(res), res.data.Media.idMal;
            });
        }
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return translateList;
        }), __webpack_require__.d(__webpack_exports__, "a", function() {
            return accessToken;
        }), __webpack_require__.d(__webpack_exports__, "c", function() {
            return errorHandling;
        }), __webpack_require__.d(__webpack_exports__, "b", function() {
            return aniListToMal;
        });
    }).call(this, __webpack_require__(0), __webpack_require__(2), __webpack_require__(1));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(api) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return entryClass;
        }), __webpack_require__.d(__webpack_exports__, "b", function() {
            return userList;
        });
        var _MyAnimeList_entryClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10), _MyAnimeList_userList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11), _AniList_entryClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(26), _AniList_userList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(27), _Kitsu_entryClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(28), _Kitsu_userList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(29);
        function getSyncMode() {
            return api.settings.get("syncMode");
        }
        function entryClass(url, miniMAL = !1, silent = !1) {
            var syncMode = getSyncMode();
            return "MAL" == syncMode ? new _MyAnimeList_entryClass__WEBPACK_IMPORTED_MODULE_0__.a(url, miniMAL) : "ANILIST" == syncMode ? new _AniList_entryClass__WEBPACK_IMPORTED_MODULE_2__.a(url, miniMAL, silent) : new _Kitsu_entryClass__WEBPACK_IMPORTED_MODULE_4__.a(url, miniMAL, silent);
        }
        function userList(status = 1, localListType = "anime", callbacks, username = null, offset = 0, templist = []) {
            var syncMode = getSyncMode();
            return "MAL" == syncMode ? _MyAnimeList_userList__WEBPACK_IMPORTED_MODULE_1__.b(status, localListType, callbacks, username, offset, templist) : "ANILIST" == syncMode ? _AniList_userList__WEBPACK_IMPORTED_MODULE_3__.a(status, localListType, callbacks, username, offset, templist) : _Kitsu_userList__WEBPACK_IMPORTED_MODULE_5__.a(status, localListType, callbacks, username, offset, templist);
        }
    }).call(this, __webpack_require__(0));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "b", function() {
        return pages;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return pageSearch;
    });
    var _Kissanime_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39), _Kissmanga_main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(40), _nineAnime_main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(41), _Crunchyroll_main__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(42), _Masterani_main__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(43), _Mangadex_main__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(44), _Mangarock_main__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(45), _Gogoanime_main__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(46), _Anime4you_main__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(47), _Branitube_main__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(48), _Turkanime_main__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(49), _Twistmoe_main__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(50), _Emby_main__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(51), _Plex_main__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(52), _Netflix_main__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(53), _Otakustream_main__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(54), _animepahe_main__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(55), _Animeflv_main__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(56), _Jkanime_main__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(57);
    const pages = {
        Kissanime: _Kissanime_main__WEBPACK_IMPORTED_MODULE_0__.a,
        Kissmanga: _Kissmanga_main__WEBPACK_IMPORTED_MODULE_1__.a,
        nineAnime: _nineAnime_main__WEBPACK_IMPORTED_MODULE_2__.a,
        Crunchyroll: _Crunchyroll_main__WEBPACK_IMPORTED_MODULE_3__.a,
        Masterani: _Masterani_main__WEBPACK_IMPORTED_MODULE_4__.a,
        Mangadex: _Mangadex_main__WEBPACK_IMPORTED_MODULE_5__.a,
        Mangarock: _Mangarock_main__WEBPACK_IMPORTED_MODULE_6__.a,
        Gogoanime: _Gogoanime_main__WEBPACK_IMPORTED_MODULE_7__.a,
        Anime4you: _Anime4you_main__WEBPACK_IMPORTED_MODULE_8__.a,
        Branitube: _Branitube_main__WEBPACK_IMPORTED_MODULE_9__.a,
        Turkanime: _Turkanime_main__WEBPACK_IMPORTED_MODULE_10__.a,
        Twistmoe: _Twistmoe_main__WEBPACK_IMPORTED_MODULE_11__.a,
        animeflv: _Animeflv_main__WEBPACK_IMPORTED_MODULE_17__.a,
        Jkanime: _Jkanime_main__WEBPACK_IMPORTED_MODULE_18__.a,
        Emby: _Emby_main__WEBPACK_IMPORTED_MODULE_12__.a,
        Plex: _Plex_main__WEBPACK_IMPORTED_MODULE_13__.a,
        Netflix: _Netflix_main__WEBPACK_IMPORTED_MODULE_14__.a,
        Otakustream: _Otakustream_main__WEBPACK_IMPORTED_MODULE_15__.a,
        animepahe: _animepahe_main__WEBPACK_IMPORTED_MODULE_16__.a
    }, pageSearch = {
        Crunchyroll: {
            name: "Crunchyroll",
            type: "anime",
            domain: "www.crunchyroll.com",
            searchUrl: titleEncoded => "http://www.crunchyroll.com/search?q=" + titleEncoded
        },
        Netflix: {
            name: "Netflix",
            type: "anime",
            domain: "www.netflix.com",
            searchUrl: titleEncoded => "https://www.netflix.com/search?q=" + titleEncoded
        },
        nineAnime: {
            name: "9Anime",
            type: "anime",
            domain: "9anime.to",
            googleSearchDomain: "9anime.to/watch",
            searchUrl: titleEncoded => "https://www1.9anime.to/search?keyword=" + titleEncoded
        },
        Otakustream: {
            name: "Otakustream",
            type: "anime",
            domain: "otakustream.tv",
            searchUrl: titleEncoded => "https://otakustream.tv/?s=" + titleEncoded
        },
        Kissanime: {
            name: "Kissanime",
            type: "anime",
            domain: "kissanime.ru",
            searchUrl: titleEncoded => "",
            completeSearchTag: (title, linkContent) => '<form class="mal_links" target="_blank" action="https://kissanime.ru/Search/Anime" style="display: inline;" id="kissanimeSearch" method="post" _lpchecked="1"><a href="#" class="submitKissanimeSearch" onclick="document.getElementById(\'kissanimeSearch\').submit(); return false;">' + linkContent + '</a><input type="hidden" id="keyword" name="keyword" value="' + title + '"/></form>'
        },
        Gogoanime: {
            name: "Gogoanime",
            type: "anime",
            domain: "www.gogoanime.in",
            searchUrl: titleEncoded => "http://gogoanimes.co/search.html?keyword=" + titleEncoded
        },
        Turkanime: {
            name: "Turkanime",
            type: "anime",
            domain: "www.turkanime.tv/",
            searchUrl: titleEncoded => "https://www.google.com/search?q=" + titleEncoded + "+site:turkanime.tv/anime/",
            googleSearchDomain: "turkanime.tv/anime/"
        },
        animeflv: {
            name: "animeflv",
            type: "anime",
            domain: "animeflv.net",
            searchUrl: titleEncoded => "https://animeflv.net/browse?q=" + titleEncoded
        },
        Jkanime: {
            name: "Jkanime",
            type: "anime",
            domain: "jkanime.net",
            searchUrl: titleEncoded => "https://jkanime.net/buscar/" + titleEncoded + "/1/"
        },
        Mangadex: {
            name: "Mangadex",
            type: "manga",
            domain: "mangadex.org",
            searchUrl: titleEncoded => "https://mangadex.org/quick_search/" + titleEncoded
        },
        Mangarock: {
            name: "Mangarock",
            type: "manga",
            domain: "mangarock.com",
            searchUrl: titleEncoded => "https://mangarock.com/search?q=" + titleEncoded
        },
        Kissmanga: {
            name: "Kissmanga",
            type: "manga",
            domain: "kissmanga.com",
            searchUrl: titleEncoded => "",
            completeSearchTag: (title, linkContent) => '<form class="mal_links" target="_blank" action="https://kissmanga.com/Search/Manga" style="display: inline;" id="kissanimeSearch" method="post" _lpchecked="1"><a href="#" class="submitKissanimeSearch" onclick="document.getElementById(\'kissanimeSearch\').submit(); return false;">' + linkContent + '</a><input type="hidden" id="keyword" name="keyword" value="' + title + '"/></form>'
        },
        AniList: {
            name: "AniList",
            type: "anime",
            domain: "anilist.co",
            searchUrl: titleEncoded => "https://anilist.co/search/anime?sort=SEARCH_MATCH&search=" + titleEncoded
        },
        AniListManga: {
            name: "AniList",
            type: "manga",
            domain: "anilist.co",
            searchUrl: titleEncoded => "https://anilist.co/search/manga?sort=SEARCH_MATCH&search=" + titleEncoded
        }
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(utils, con, api, j) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return entryClass;
        });
        var __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = Promise))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator.throw(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        class entryClass {
            constructor(url, miniMAL = !1) {
                this.url = url, this.miniMAL = miniMAL, this.name = "", this.totalEp = NaN, this.addAnime = !1, 
                this.login = !1, this.wrong = !1, this.pending = !1, this.renderNoImage = !0, this.id = utils.urlPart(url, 4), 
                this.type = utils.urlPart(url, 3);
            }
            init() {
                return this.update();
            }
            getDisplayUrl() {
                return this.url;
            }
            getMalUrl() {
                return this.getDisplayUrl();
            }
            update() {
                var editUrl = "https://myanimelist.net/ownlist/" + this.type + "/" + this.id + "/edit?hideLayout";
                return con.log("Update MAL info", editUrl), api.request.xhr("GET", editUrl).then(response => {
                    if (response.finalUrl.indexOf("myanimelist.net/login.php") > -1 || response.responseText.indexOf("Unauthorized") > -1) return this.login = !1, 
                    void con.error("User not logged in");
                    this.login = !0, this.animeInfo = this.getObject(response.responseText);
                });
            }
            getEpisode() {
                return "manga" == this.type ? this.animeInfo[".add_manga[num_read_chapters]"] : this.animeInfo[".add_anime[num_watched_episodes]"];
            }
            setEpisode(ep) {
                ep + "" == "" && (ep = 0), "manga" == this.type && (this.animeInfo[".add_manga[num_read_chapters]"] = parseInt(ep + "")), 
                this.animeInfo[".add_anime[num_watched_episodes]"] = parseInt(ep + "");
            }
            getVolume() {
                return "manga" == this.type && this.animeInfo[".add_manga[num_read_volumes]"];
            }
            setVolume(ep) {
                "manga" != this.type ? con.error("You cant set Volumes for animes") : this.animeInfo[".add_manga[num_read_volumes]"] = ep;
            }
            getStatus() {
                return "manga" == this.type ? this.animeInfo[".add_manga[status]"] : this.animeInfo[".add_anime[status]"];
            }
            setStatus(status) {
                "manga" == this.type && (this.animeInfo[".add_manga[status]"] = status), this.animeInfo[".add_anime[status]"] = status;
            }
            getScore() {
                return "manga" == this.type ? this.animeInfo[".add_manga[score]"] : this.animeInfo[".add_anime[score]"];
            }
            setScore(score) {
                "manga" == this.type && (this.animeInfo[".add_manga[score]"] = score), this.animeInfo[".add_anime[score]"] = score;
            }
            getRewatching() {
                return "manga" == this.type ? this.animeInfo[".add_manga[is_rereading]"] : this.animeInfo[".add_anime[is_rewatching]"];
            }
            setRewatching(rewatching) {
                "manga" == this.type && (this.animeInfo[".add_manga[is_rereading]"] = rewatching), 
                this.animeInfo[".add_anime[is_rewatching]"] = rewatching;
            }
            setCompletionDateToNow() {
                var Datec = new Date();
                "" === this.animeInfo[".add_anime[finish_date][day]"] || "" === this.animeInfo[".add_manga[finish_date][day]"] ? ("manga" == this.type && (this.animeInfo[".add_manga[finish_date][year]"] = Datec.getFullYear(), 
                this.animeInfo[".add_manga[finish_date][month]"] = Datec.getMonth() + 1, this.animeInfo[".add_manga[finish_date][day]"] = Datec.getDate()), 
                this.animeInfo[".add_anime[finish_date][year]"] = Datec.getFullYear(), this.animeInfo[".add_anime[finish_date][month]"] = Datec.getMonth() + 1, 
                this.animeInfo[".add_anime[finish_date][day]"] = Datec.getDate()) : con.error("Completion date already set");
            }
            setStartingDateToNow() {
                var Datec = new Date();
                "" === this.animeInfo[".add_anime[start_date][day]"] || "" === this.animeInfo[".add_manga[start_date][day]"] ? ("manga" == this.type && (this.animeInfo[".add_manga[start_date][year]"] = Datec.getFullYear(), 
                this.animeInfo[".add_manga[start_date][month]"] = Datec.getMonth() + 1, this.animeInfo[".add_manga[start_date][day]"] = Datec.getDate()), 
                this.animeInfo[".add_anime[start_date][year]"] = Datec.getFullYear(), this.animeInfo[".add_anime[start_date][month]"] = Datec.getMonth() + 1, 
                this.animeInfo[".add_anime[start_date][day]"] = Datec.getDate()) : con.info("Start date already set");
            }
            getStreamingUrl() {
                var tags = this.animeInfo[".add_anime[tags]"];
                return "manga" == this.type && (tags = this.animeInfo[".add_manga[tags]"]), utils.getUrlFromTags(tags);
            }
            setStreamingUrl(url) {
                var tags = this.animeInfo[".add_anime[tags]"];
                "manga" == this.type && (tags = this.animeInfo[".add_manga[tags]"]), tags = utils.setUrlInTags(url, tags), 
                "manga" != this.type ? this.animeInfo[".add_anime[tags]"] = tags : this.animeInfo[".add_manga[tags]"] = tags;
            }
            getRating() {
                return __awaiter(this, void 0, void 0, function*() {
                    return new Promise((resolve, reject) => {
                        var url = "";
                        url = "anime" == this.type ? "https://myanimelist.net/includes/ajax.inc.php?t=64&id=" + this.id : "https://myanimelist.net/includes/ajax.inc.php?t=65&id=" + this.id, 
                        api.request.xhr("GET", url).then(response => {
                            try {
                                resolve(response.responseText.split("Score:</span>")[1].split("<")[0]);
                            } catch (e) {
                                con.error("Could not get rating", e), reject();
                            }
                        });
                    });
                });
            }
            setResumeWaching(url, ep) {
                return __awaiter(this, void 0, void 0, function*() {
                    return utils.setResumeWaching(url, ep, this.type, this.id);
                });
            }
            getResumeWaching() {
                return __awaiter(this, void 0, void 0, function*() {
                    return utils.getResumeWaching(this.type, this.id);
                });
            }
            setContinueWaching(url, ep) {
                return __awaiter(this, void 0, void 0, function*() {
                    return utils.setContinueWaching(url, ep, this.type, this.id);
                });
            }
            getContinueWaching() {
                return __awaiter(this, void 0, void 0, function*() {
                    return utils.getContinueWaching(this.type, this.id);
                });
            }
            getImage() {
                return __awaiter(this, void 0, void 0, function*() {
                    return api.request.xhr("GET", this.url).then(response => {
                        var data = response.responseText, image = "";
                        try {
                            image = data.split("js-scrollfix-bottom")[1].split('<img src="')[1].split('"')[0];
                        } catch (e) {
                            console.log("[mal.ts] Error:", e);
                        }
                        return image;
                    });
                });
            }
            clone() {
                const copy = new this.constructor();
                return Object.assign(copy, this), copy.animeInfo = Object.assign({}, this.animeInfo), 
                copy;
            }
            sync() {
                var status = utils.status;
                return new Promise((resolve, reject) => {
                    var This = this, url = "https://myanimelist.net/ownlist/" + this.type + "/" + this.id + "/edit";
                    if (this.pending) utils.flashm("This " + this.type + " is currently pending approval. It can´t be saved to mal for now"); else {
                        if (this.addAnime) {
                            var imgSelector = "malSyncImg" + this.id, flashConfirmText = `\n          ${api.storage.lang("syncPage_flashConfirm_Anime_Correct", [ this.name ])}\n          <br>\n          <img id="${imgSelector}" style="\n            height: 200px;\n            min-height: 200px;\n            min-width: 144px;\n            border: 1px solid;\n            margin-top: 10px;\n            display: inline;\n          " src="" />\n          <br>\n          \x3c!--<a style="margin-left: -2px;" target="_blank" href="https://github.com/lolamtisch/MALSync/wiki/Troubleshooting#myanimeentry-entry-is-not-correct">[How to correct entries]</a>--\x3e\n        `;
                            return This.miniMAL && (flashConfirmText = `\n                    Add "${this.name}" to MAL?`), 
                            "anime" == this.type ? (url = "https://myanimelist.net/ownlist/anime/add?selected_series_id=" + this.id, 
                            utils.flashConfirm(flashConfirmText, "add", function() {
                                continueCall();
                            }, function() {
                                wrongCall();
                            })) : (url = "https://myanimelist.net/ownlist/manga/add?selected_manga_id=" + this.id, 
                            utils.flashConfirm(flashConfirmText, "add", function() {
                                continueCall();
                            }, function() {
                                wrongCall();
                            })), void (This.miniMAL || (this.getImage().then(image => {
                                j.$("#" + imgSelector).attr("src", image);
                            }), j.$(".Yes").text(api.storage.lang("Yes")), j.$(".Cancel").text(api.storage.lang("No"))));
                        }
                        var watchCounter = ".add_anime[num_watched_times]", rewatchText = "Rewatch Anime?", rewatchFinishText = "Finish rewatching?";
                        "manga" == this.type && (watchCounter = ".add_manga[num_read_times]", rewatchText = "Reread Manga?", 
                        rewatchFinishText = "Finish rereading?"), this.getStatus() != status.completed || 1 !== this.getEpisode() || 1 === this.totalEp || 1 === this.getRewatching() ? this.getStatus() != status.completed || this.getEpisode() !== this.totalEp || 1 !== this.getRewatching() ? continueCall() : utils.flashConfirm(rewatchFinishText, "add", () => {
                            this.setRewatching(0), "" === this.animeInfo[watchCounter] ? this.animeInfo[watchCounter] = 1 : this.animeInfo[watchCounter] = parseInt(this.animeInfo[watchCounter]) + 1, 
                            continueCall();
                        }, function() {
                            continueCall();
                        }) : utils.flashConfirm(rewatchText, "add", () => {
                            this.setRewatching(1), continueCall();
                        }, function() {
                            con.log("Rewatching denial");
                        });
                    }
                    function wrongCall() {
                        if (This.wrong = !0, !This.miniMAL) {
                            var miniButton = j.$("button.open-info-popup");
                            "none" != miniButton.css("display") ? miniButton.click() : (miniButton.click(), 
                            miniButton.click());
                        }
                    }
                    function continueCall() {
                        var parameter = "";
                        j.$.each(This.animeInfo, function(index, value) {
                            "." == index.toString().charAt(0) && (".add_anime[is_rewatching]" !== index && ".add_manga[is_rereading]" !== index || 0 !== parseInt(value)) && (parameter += encodeURIComponent(index.toString().substring(1)) + "=" + encodeURIComponent(value) + "&");
                        }), con.log("[SET] URL:", url), con.log("[SET] Object:", This.animeInfo), api.request.xhr("POST", {
                            url: url,
                            data: parameter,
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            }
                        }).then(response => {
                            response.responseText.indexOf("Successfully") >= 0 ? (con.log("Update Succeeded"), 
                            resolve()) : (con.error("Update failed"), reject());
                        });
                    }
                });
            }
            getObject(data) {
                var anime, getselect = utils.getselect;
                if (void 0 === data.split('<form name="')[1] && (-1 !== this.url.indexOf("/manga/") || -1 !== this.url.indexOf("/anime/"))) throw new Error("MAL is down or otherwise giving bad data");
                return this.addAnime = !1, this.pending = !1, "anime" == this.type ? ((anime = {})[".csrf_token"] = data.split("'csrf_token'")[1].split("'")[1].split("'")[0], 
                data.indexOf("Add Anime") > -1 && (this.addAnime = !0), data.indexOf("pending approval") > -1 && (this.pending = !0), 
                data = data.split('<form name="')[1].split("</form>")[0], this.totalEp = parseInt(data.split('id="totalEpisodes">')[1].split("<")[0]), 
                this.name = data.split('<a href="')[1].split('">')[1].split("<")[0], anime[".anime_id"] = parseInt(data.split('name="anime_id"')[1].split('value="')[1].split('"')[0]), 
                anime[".aeps"] = parseInt(data.split('name="aeps"')[1].split('value="')[1].split('"')[0]), 
                anime[".astatus"] = parseInt(data.split('name="astatus"')[1].split('value="')[1].split('"')[0]), 
                anime[".add_anime[status]"] = parseInt(getselect(data, "add_anime[status]")), data.split('name="add_anime[is_rewatching]"')[1].split(">")[0].indexOf('checked="checked"') >= 0 && (anime[".add_anime[is_rewatching]"] = 1), 
                anime[".add_anime[num_watched_episodes]"] = parseInt(data.split('name="add_anime[num_watched_episodes]"')[1].split('value="')[1].split('"')[0]), 
                isNaN(anime[".add_anime[num_watched_episodes]"]) && (anime[".add_anime[num_watched_episodes]"] = ""), 
                anime[".add_anime[score]"] = getselect(data, "add_anime[score]"), anime[".add_anime[start_date][month]"] = getselect(data, "add_anime[start_date][month]"), 
                anime[".add_anime[start_date][day]"] = getselect(data, "add_anime[start_date][day]"), 
                anime[".add_anime[start_date][year]"] = getselect(data, "add_anime[start_date][year]"), 
                anime[".add_anime[finish_date][month]"] = getselect(data, "add_anime[finish_date][month]"), 
                anime[".add_anime[finish_date][day]"] = getselect(data, "add_anime[finish_date][day]"), 
                anime[".add_anime[finish_date][year]"] = getselect(data, "add_anime[finish_date][year]"), 
                anime[".add_anime[tags]"] = data.split('name="add_anime[tags]"')[1].split(">")[1].split("<")[0], 
                anime[".add_anime[priority]"] = getselect(data, "add_anime[priority]"), anime[".add_anime[storage_type]"] = getselect(data, "add_anime[storage_type]"), 
                anime[".add_anime[storage_value]"] = data.split('name="add_anime[storage_value]"')[1].split('value="')[1].split('"')[0], 
                anime[".add_anime[num_watched_times]"] = data.split('name="add_anime[num_watched_times]"')[1].split('value="')[1].split('"')[0], 
                anime[".add_anime[rewatch_value]"] = getselect(data, "add_anime[rewatch_value]"), 
                anime[".add_anime[comments]"] = data.split('name="add_anime[comments]"')[1].split(">")[1].split("<")[0], 
                anime[".add_anime[is_asked_to_discuss]"] = getselect(data, "add_anime[is_asked_to_discuss]"), 
                "" == anime[".add_anime[is_asked_to_discuss]"] && (anime[".add_anime[is_asked_to_discuss]"] = 0), 
                anime[".add_anime[sns_post_type]"] = getselect(data, "add_anime[sns_post_type]"), 
                anime[".submitIt"] = data.split('name="submitIt"')[1].split('value="')[1].split('"')[0], 
                con.log("[GET] Object:", anime), anime) : ((anime = {})[".csrf_token"] = data.split("'csrf_token'")[1].split("'")[1].split("'")[0], 
                data.indexOf("Add Manga") > -1 && (this.addAnime = !0), data.indexOf("pending approval") > -1 && (this.pending = !0), 
                data = data.split('<form name="')[1].split("</form>")[0], this.totalEp = parseInt(data.split('id="totalChap">')[1].split("<")[0]), 
                this.totalVol = parseInt(data.split('id="totalVol">')[1].split("<")[0]), this.name = data.split('<a href="')[1].split('">')[1].split("<")[0], 
                anime[".entry_id"] = parseInt(data.split('name="entry_id"')[1].split('value="')[1].split('"')[0]), 
                anime[".manga_id"] = parseInt(data.split('name="manga_id"')[1].split('value="')[1].split('"')[0]), 
                anime.volumes = parseInt(data.split('id="volumes"')[1].split('value="')[1].split('"')[0]), 
                anime.mstatus = parseInt(data.split('id="mstatus"')[1].split('value="')[1].split('"')[0]), 
                anime[".add_manga[status]"] = parseInt(getselect(data, "add_manga[status]")), data.split('name="add_manga[is_rereading]"')[1].split(">")[0].indexOf('checked="checked"') >= 0 && (anime[".add_manga[is_rereading]"] = 1), 
                anime[".add_manga[num_read_volumes]"] = parseInt(data.split('name="add_manga[num_read_volumes]"')[1].split('value="')[1].split('"')[0]), 
                isNaN(anime[".add_manga[num_read_volumes]"]) && (anime[".add_manga[num_read_volumes]"] = ""), 
                anime[".add_manga[num_read_chapters]"] = parseInt(data.split('name="add_manga[num_read_chapters]"')[1].split('value="')[1].split('"')[0]), 
                isNaN(anime[".add_manga[num_read_chapters]"]) && (anime[".add_manga[num_read_chapters]"] = ""), 
                anime[".add_manga[score]"] = getselect(data, "add_manga[score]"), anime[".add_manga[start_date][month]"] = getselect(data, "add_manga[start_date][month]"), 
                anime[".add_manga[start_date][day]"] = getselect(data, "add_manga[start_date][day]"), 
                anime[".add_manga[start_date][year]"] = getselect(data, "add_manga[start_date][year]"), 
                anime[".add_manga[finish_date][month]"] = getselect(data, "add_manga[finish_date][month]"), 
                anime[".add_manga[finish_date][day]"] = getselect(data, "add_manga[finish_date][day]"), 
                anime[".add_manga[finish_date][year]"] = getselect(data, "add_manga[finish_date][year]"), 
                anime[".add_manga[tags]"] = data.split('name="add_manga[tags]"')[1].split(">")[1].split("<")[0], 
                anime[".add_manga[priority]"] = getselect(data, "add_manga[priority]"), anime[".add_manga[storage_type]"] = getselect(data, "add_manga[storage_type]"), 
                anime[".add_manga[num_retail_volumes]"] = data.split('name="add_manga[num_retail_volumes]"')[1].split('value="')[1].split('"')[0], 
                anime[".add_manga[num_read_times]"] = data.split('name="add_manga[num_read_times]"')[1].split('value="')[1].split('"')[0], 
                anime[".add_manga[reread_value]"] = getselect(data, "add_manga[reread_value]"), 
                anime[".add_manga[comments]"] = data.split('name="add_manga[comments]"')[1].split(">")[1].split("<")[0], 
                anime[".add_manga[is_asked_to_discuss]"] = getselect(data, "add_manga[is_asked_to_discuss]"), 
                "" == anime[".add_manga[is_asked_to_discuss]"] && (anime[".add_manga[is_asked_to_discuss]"] = 0), 
                anime[".add_manga[sns_post_type]"] = getselect(data, "add_manga[sns_post_type]"), 
                anime[".submitIt"] = data.split('name="submitIt"')[1].split('value="')[1].split('"')[0], 
                con.log("[GET] Object:", anime), anime);
            }
        }
    }).call(this, __webpack_require__(2), __webpack_require__(1), __webpack_require__(0), __webpack_require__(3));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(con, utils, api) {
        function userList(status = 1, localListType = "anime", callbacks, username = null, offset = 0, templist = []) {
            if (con.log("[UserList]", "username: " + username, "status: " + status, "offset: " + offset), 
            null == username) return callback = function(usernameTemp) {
                0 == usernameTemp ? (utils.flashm("Please log in on <a target='_blank' href='https://myanimelist.net/login.php'>MyAnimeList!<a>"), 
                void 0 !== callbacks.fullListCallback && callbacks.fullListCallback([]), void 0 !== callbacks.finishCallback && callbacks.finishCallback()) : userList(status, localListType, callbacks, usernameTemp, offset, templist);
            }, void api.request.xhr("GET", "https://myanimelist.net/editlist.php?hideLayout").then(response => {
                var username = !1;
                try {
                    username = response.responseText.split('USER_NAME = "')[1].split('"')[0];
                } catch (e) {}
                con.log("[Username]", username), callback(username);
            });
            var callback, url = "https://myanimelist.net/" + localListType + "list/" + username + "/load.json?offset=" + offset + "&status=" + status;
            api.request.xhr("GET", url).then(response => {
                var data = JSON.parse(response.responseText);
                if (data = prepareData(data, localListType), void 0 !== callbacks.singleCallback) {
                    data.length || callbacks.singleCallback(!1, 0, 0);
                    for (var i = 0; i < data.length; i++) callbacks.singleCallback(data[i], i + offset + 1, data.length + offset);
                }
                void 0 !== callbacks.fullListCallback && (templist = templist.concat(data)), data.length > 299 ? void 0 !== callbacks.continueCall ? callbacks.continueCall(function() {
                    userList(status, localListType, callbacks, username, offset + 300, templist);
                }) : userList(status, localListType, callbacks, username, offset + 300, templist) : (void 0 !== callbacks.fullListCallback && callbacks.fullListCallback(templist), 
                void 0 !== callbacks.finishCallback && callbacks.finishCallback());
            });
        }
        function prepareData(data, listType) {
            for (var newData = [], i = 0; i < data.length; i++) {
                var el = data[i];
                "anime" === listType ? newData.push({
                    uid: el.anime_id,
                    malId: el.anime_id,
                    type: listType,
                    title: el.anime_title,
                    url: "https://myanimelist.net" + el.anime_url,
                    watchedEp: el.num_watched_episodes,
                    totalEp: el.anime_num_episodes,
                    image: el.anime_image_path,
                    tags: el.tags,
                    airingState: el.anime_airing_status
                }) : newData.push({
                    uid: el.manga_id,
                    malId: el.manga_id,
                    type: listType,
                    title: el.manga_title,
                    url: "https://myanimelist.net" + el.manga_url,
                    watchedEp: el.num_read_chapters,
                    totalEp: el.manga_num_chapters,
                    image: el.manga_image_path,
                    tags: el.tags,
                    airingState: el.anime_airing_status
                });
            }
            return newData;
        }
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return userList;
        }), __webpack_require__.d(__webpack_exports__, "a", function() {
            return prepareData;
        });
    }).call(this, __webpack_require__(1), __webpack_require__(2), __webpack_require__(0));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return kitsu;
    });
    const kitsu = {
        shortName: "Kitsu",
        score: "Kitsu Score:",
        noLogin: 'Please Authenticate <a target="_blank" href="https://kitsu.io/404?mal-sync=authentication">Here</a>'
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(api) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return providerTemplates;
        });
        var _MyAnimeList_templates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(61), _AniList_templates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(62), _Kitsu_templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
        function providerTemplates() {
            var syncMode = api.settings.get("syncMode");
            return "MAL" == syncMode ? _MyAnimeList_templates__WEBPACK_IMPORTED_MODULE_0__.a : "ANILIST" == syncMode ? _AniList_templates__WEBPACK_IMPORTED_MODULE_1__.a : _Kitsu_templates__WEBPACK_IMPORTED_MODULE_2__.a;
        }
    }).call(this, __webpack_require__(0));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(utils, j, api, con) {
        var timer, _minimalApp_settings_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(69), _minimalApp_overview_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71), _minimalApp_recommendations_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(68), _minimalApp_bookmarks_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(72), _minimalApp_search_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(32), _minimalApp_updateCheck_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(74), _minimalApp_reviews_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(70), _provider_provider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8), ignoreCurrentTab = !0, ignoreNullBase = !1, popupStorage_fetch = function() {
            return JSON.parse(localStorage.getItem("VUE-MAL-SYNC") || "[]");
        }, popupStorage_save = function(state) {
            localStorage.setItem("VUE-MAL-SYNC", JSON.stringify(state));
        };
        __webpack_exports__.a = {
            components: {
                overviewVue: _minimalApp_overview_vue__WEBPACK_IMPORTED_MODULE_1__.a,
                recommendationsVue: _minimalApp_recommendations_vue__WEBPACK_IMPORTED_MODULE_2__.a,
                reviewsVue: _minimalApp_reviews_vue__WEBPACK_IMPORTED_MODULE_6__.a,
                bookmarksVue: _minimalApp_bookmarks_vue__WEBPACK_IMPORTED_MODULE_3__.a,
                searchVue: _minimalApp_search_vue__WEBPACK_IMPORTED_MODULE_4__.a,
                updateCheckVue: _minimalApp_updateCheck_vue__WEBPACK_IMPORTED_MODULE_5__.a,
                settingsVue: _minimalApp_settings_vue__WEBPACK_IMPORTED_MODULE_0__.a
            },
            data: () => ({
                tabs: {
                    overview: {
                        title: "overview",
                        scroll: 0
                    },
                    reviews: {
                        title: "reviews",
                        scroll: 0
                    },
                    recommendations: {
                        title: "recommendations",
                        scroll: 0
                    },
                    settings: {
                        title: "settings",
                        scroll: 0
                    },
                    bookmarks: {
                        title: "bookmarks",
                        scroll: 0,
                        state: 1,
                        type: "anime"
                    },
                    search: {
                        title: "search",
                        scroll: 0,
                        type: "anime",
                        keyword: ""
                    },
                    updateCheck: {
                        title: "updateCheck",
                        scroll: 0
                    }
                },
                keyword: "",
                currentTab: "settings",
                renderUrl: "",
                renderObj: null,
                history: [],
                baseFallback: "",
                page: null
            }),
            computed: {
                base: function() {
                    return this.page ? this.page.malObj ? this.page.malObj.url : (this.renderUrl = "", 
                    "") : this.baseFallback;
                },
                renderMalUrl: function() {
                    return null !== this.renderObj ? this.renderObj.getMalUrl() : null;
                },
                showReviewAndRecom: function() {
                    return null !== this.renderMalUrl || null === this.renderObj;
                },
                utils: function() {
                    return utils;
                },
                backbutton: function() {
                    return this.history.length > 0;
                },
                backbuttonSearchStyle: function() {
                    return this.backbutton ? {
                        "margin-left": "-17px"
                    } : {
                        "margin-left": "-57px"
                    };
                },
                backbuttonBookStyle: function() {
                    return this.backbutton ? {
                        left: "40px"
                    } : {
                        left: "0px"
                    };
                },
                popOver: function() {
                    return this.currentTab === this.tabs.bookmarks.title || (this.currentTab === this.tabs.search.title || this.currentTab === this.tabs.updateCheck.title);
                },
                navigation: function() {
                    return !this.popOver && !this.onlySettings;
                },
                onlySettings: function() {
                    return "" === this.renderUrl;
                },
                bookIcon: function() {
                    j.$(this.$el);
                    return "bookmarks" === this.currentTab ? this.onlySettings ? "settings" : "collections_bookmark" : "book";
                }
            },
            mounted: function() {
                if (this.isPopup()) {
                    var state = popupStorage_fetch();
                    void 0 !== state && void 0 !== state.currentTab && (ignoreNullBase = !0, this.setCurrent(state));
                }
            },
            updated: function() {
                this.isPopup() && popupStorage_save(this.getCurrent(this.currentTab));
            },
            watch: {
                renderUrl: function(url, oldUrl) {
                    this.renderObj = null;
                    var tempRenderObj = new _provider_provider__WEBPACK_IMPORTED_MODULE_7__.a(url);
                    tempRenderObj.init().then(() => {
                        this.renderObj = tempRenderObj;
                    });
                },
                currentTab: function(tab, oldtab) {
                    this.tabs[oldtab].scroll = this.getScroll(), this.$nextTick(() => {
                        this.setScroll(this.tabs[tab].scroll);
                    }), ignoreCurrentTab ? ignoreCurrentTab = !1 : (this.currentTab === this.tabs.bookmarks.title && this.history.push(this.getCurrent(oldtab)), 
                    this.currentTab === this.tabs.search.title && this.history.push(this.getCurrent(oldtab)), 
                    this.currentTab === this.tabs.updateCheck.title && this.history.push(this.getCurrent(oldtab)));
                },
                keyword: function(keyword) {
                    "" !== keyword ? this.selectTab("search") : this.selectTab("overview");
                },
                base: function(base, oldBase) {
                    if (base !== oldBase) {
                        for (;this.history.length > 0; ) this.history.pop();
                        this.fill(base, !0);
                    }
                }
            },
            methods: {
                lang: api.storage.lang,
                selectTab(selectedTab) {
                    !this.onlySettings || "overview" !== selectedTab && "reviews" !== selectedTab && "recommendations" !== selectedTab || (selectedTab = "settings"), 
                    con.log("Tab Changed", selectedTab), this.currentTab = selectedTab;
                },
                getScroll() {
                    return j.$(this.$el).find(".mdl-layout__content").first().scrollTop();
                },
                setScroll(scroll) {
                    return j.$(this.$el).find(".mdl-layout__content").first().scrollTop(scroll);
                },
                isPopup: () => !!j.$("#Mal-Sync-Popup").length,
                fill(url, isBase = !1) {
                    j.$(this.$el);
                    return null == url ? (this.isPopup() && this.selectTab("bookmarks"), !1) : /^https:\/\/myanimelist.net\/(anime|manga)\/\d+/i.test(url) || /^https:\/\/kitsu.io\/(anime|manga)\/.+/i.test(url) || /^https:\/\/anilist.co\/(anime|manga)\/\d+/i.test(url) ? (isBase || this.history.push(this.getCurrent(this.currentTab)), 
                    this.renderUrl = url, this.currentTab = "overview", !0) : (this.isPopup() && this.selectTab("bookmarks"), 
                    !1);
                },
                fillBase(url) {
                    con.log("Fill Base", url, this.history), ignoreNullBase && null === url || (this.baseFallback = url), 
                    "" === url && (this.renderUrl = url);
                },
                setPage(page) {
                    this.page = page, void 0 === this.page.malObj && this.$set(this.page, "malObj", void 0);
                },
                backbuttonClick() {
                    con.log("History", this.history), this.history.length > 0 && this.setCurrent(this.history.pop());
                },
                bookClick() {
                    j.$(this.$el);
                    "book" !== this.bookIcon ? this.selectTab("overview") : this.selectTab("bookmarks");
                },
                keywordSet() {
                    clearTimeout(timer), timer = setTimeout(() => {
                        this.tabs.search.keyword = this.keyword;
                    }, 300);
                },
                getCurrent(tab, url = this.renderUrl) {
                    return {
                        renderUrl: url,
                        currentTab: tab,
                        tabData: j.$.extend(!0, {}, this.tabs[tab])
                    };
                },
                setCurrent(historyElement) {
                    con.log("Set Current", historyElement), void 0 !== historyElement.tabData.keyword && (this.keyword = historyElement.tabData.keyword), 
                    this.tabs[historyElement.currentTab] = historyElement.tabData, this.renderUrl = historyElement.renderUrl, 
                    this.currentTab !== historyElement.currentTab && (ignoreCurrentTab = !0), this.currentTab = historyElement.currentTab;
                }
            }
        };
    }).call(this, __webpack_require__(2), __webpack_require__(3), __webpack_require__(0), __webpack_require__(1));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(api, con, j) {
        var _components_settingsCheckbox_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(76), _components_settingsNumberInput_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(77), _components_tooltip_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(31), _correction_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(75);
        __webpack_exports__.a = {
            components: {
                correction: _correction_vue__WEBPACK_IMPORTED_MODULE_3__.a,
                tooltip: _components_tooltip_vue__WEBPACK_IMPORTED_MODULE_2__.a,
                checkbox: _components_settingsCheckbox_vue__WEBPACK_IMPORTED_MODULE_0__.a,
                numberInput: _components_settingsNumberInput_vue__WEBPACK_IMPORTED_MODULE_1__.a
            },
            props: {
                page: {
                    type: Object,
                    default: null
                }
            },
            mounted: function() {
                api.request.xhr("GET", "https://kissanimelist.firebaseio.com/Data2/Notification/Contributer.json").then(response => {
                    try {
                        this.contributer = JSON.parse(response.responseText.replace(/(^"|"$)/gi, "").replace(/\\"/g, '"'));
                    } catch (e) {
                        return void con.error("Contributer Could not be retieved", e);
                    }
                    con.log("Contributer", contr);
                }), "webextension" == api.type && j.$("#Mal-Sync-Popup").length && chrome.commands.getAll(commands => {
                    con.info("Commands", commands);
                    var tempCommands = commands.reduce(function(total, current) {
                        return total[current.name] = current, total;
                    }, {});
                    this.commands = tempCommands;
                });
            },
            methods: {
                lang: api.storage.lang,
                myOpen: function() {
                    this.isOpen = !this.isOpen;
                }
            },
            data: function() {
                return {
                    contributer: [],
                    isOpen: !1,
                    options: api.settings.options,
                    commands: null,
                    version: {
                        link: `https://malsync.lolamtisch.de/changelog#${api.storage.version()}`,
                        img: `https://img.shields.io/badge/Changelog-${api.storage.version()}-green.svg?style=flat-square&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAtxQTFRFAAAARj1Hw158LyQzRDRBVF54Ew0ZXqvnIx4labLsQEFTdsD7ZpPC////VE1SNCg3Nik7PS1CSzBKWjRXczBXjjBUsTZd0WuILSUyMiU2MiI2Nyc9dypNoClRbC5INTQ+YXKMMCQ7PyQ/WitFKx4vFxchT16CRStIPSY6TSQ6jjhScb33TViCpCROni9VYKzqTlN+qDBZXK3sYi5JXbHyQzNGXLLzTTZOW6/wQC5EX67sNSw7Y67qWa3vLCUzMCo1uc3fXq3rWa/yLCgxSEdKZa7nV6rrWrDyKCEsMzA1aLDpYbLyYbj6SUJgPj5VLy87e8D6csP+c8r/d9L/fNT+esnydLbgcKfOa5vDdJ/MQi5GSjFLTTFOYi9PWS1NUS9OTTFPRzFLSDJMTTBMXjBPaS5NZzBVgTdjczVfbjVhXjVaTjRTQzJMSzRNTzVOTzNLai1ShzJcjjNdiDNeejRhbDVhWzZbSzRRQzFKQjJKUDNMiyxPYy9UlzBfyDBlpjJgcjJbajNfXDVaTDNRPzBHPTBHVDJNrDBZxSpaV1aBajBZkDNipzNjnTNjdDJdYzJcXDRZTzRQPzFHRzJHZTJNcS9MZ2WUcS9VcDNdezRgcjJeezNgZTNaTjNRRDFLQzJJQjNHQjJGWDJLUjJKYoK4cS5NWTFTWzRaWDJVbjRbWDNVSzNQRjJMUTRLSTVHSzRJjjZbfDdZYqXlhEZwVS5MSzRUVTNUczVbTjJRSTNOUDRMSTNLQTJISTNGczZUXjVRWrH0W3+1Ri9OSDJSSzNSTDNTRzJRRzNRSTNNQzJLPzFKPjJGPjFCOSw/W67vTWOORi5NSjJRSzNVTDRURTJRQTBNQTFKQzJKPjFINSw9XKrpSVyIQCxLRS9QRjJSQjJPRzRQUTROQjBFLyc1W6rrS22ePTRVQSxLSjNVSzZYTzZWUTJPOSw+Z778YqPWWnGcV1F/UkZxT0Nm////ch6M6QAAAFp0Uk5TAAAAAAAAAAAAAAAAAAABKH2/3+bIjTgFCm7a/f7nhRILifn9nRJx+v6JBC3b6UV//aPB3OTz5/bL3Y6oNuLuTAGA/ZsIEp79shwRhervmxwFQqDd+frjqksImWc25wAAAAFiS0dEDfa0YfUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEbSURBVBjTARAB7/4AAAABDg8QERITFBUWFwIAAAAAAxgZGhtaW1xdHB0eHwQAAAUgISJeX2BhYmNkZSMkJQYAACYnZmdoaWprbG1ubygpKgArLHBxcnN0dXZ3eHl6ey0uAC8wfH1+f4CBgoOEhYaHiDEAMomKi4yNjo+QkZKSk5SVMwA0lpeYmZqbnJ2en6ChoqM1ADakpaanqKmqq6ytrq+wsTcAOLKztLW2t7i5uru8vb6/OQA6wMHCw8TFxsfIycrLzM07ADw9zs/Q0dLT1NXW19jZPj8AQEFC2tvc3d7U3+Dh4uNDRAAHRUZH5OXm5+jp6uvsSEkIAAAJSktM7e7v8PHyTU5PCgAAAAALUFFSU1RVVldYWQwNAEGXdELuOiRkAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTA1LTE2VDEzOjM2OjI0KzAwOjAwK9TuQgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wNS0xNlQxMzozNjoyNCswMDowMFqJVv4AAABGdEVYdHNvZnR3YXJlAEltYWdlTWFnaWNrIDYuNy44LTkgMjAxNC0wNS0xMiBRMTYgaHR0cDovL3d3dy5pbWFnZW1hZ2ljay5vcmfchu0AAAAAGHRFWHRUaHVtYjo6RG9jdW1lbnQ6OlBhZ2VzADGn/7svAAAAGHRFWHRUaHVtYjo6SW1hZ2U6OmhlaWdodAAxOTIPAHKFAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADE5MtOsIQgAAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTUyNjQ3Nzc4NGTqj8oAAAAPdEVYdFRodW1iOjpTaXplADBCQpSiPuwAAABWdEVYdFRodW1iOjpVUkkAZmlsZTovLy9tbnRsb2cvZmF2aWNvbnMvMjAxOC0wNS0xNi82ODRlZmQxYzBmMTdmMzAxMjIzMWFmNzQ4YzhmYjJjYy5pY28ucG5nP6GaiQAAAABJRU5ErkJggg==`
                    }
                };
            }
        };
    }).call(this, __webpack_require__(0), __webpack_require__(1), __webpack_require__(3));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(api) {
        __webpack_exports__.a = {
            props: {
                option: {
                    type: String
                }
            },
            computed: {
                value: {
                    get: function() {
                        return api.settings.get(this.option);
                    },
                    set: function(value) {
                        api.settings.set(this.option, value);
                    }
                }
            }
        };
    }).call(this, __webpack_require__(0));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(api) {
        __webpack_exports__.a = {
            props: {
                option: {
                    type: String
                },
                min: {
                    type: Number,
                    default: 0
                },
                max: {
                    type: Number,
                    default: 999
                },
                step: {
                    type: Number,
                    default: 1
                }
            },
            computed: {
                value: {
                    get: function() {
                        return api.settings.get(this.option);
                    },
                    set: function(value) {
                        "" !== value && null !== value && value >= this.min && value <= this.max && (api.settings.set(this.option, value), 
                        this.$emit("changed", value));
                    }
                }
            }
        };
    }).call(this, __webpack_require__(0));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(api, j, utils) {
        var _components_tooltip_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31), _search_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(32);
        __webpack_exports__.a = {
            components: {
                tooltip: _components_tooltip_vue__WEBPACK_IMPORTED_MODULE_0__.a,
                searchVue: _search_vue__WEBPACK_IMPORTED_MODULE_1__.a
            },
            props: {
                page: {
                    type: Object,
                    default: null
                }
            },
            data: function() {
                return {
                    malUrl: "",
                    searchType: this.page.page.type,
                    searchKeyword: "",
                    options: api.settings.options
                };
            },
            watch: {
                url: function(url) {
                    this.malUrl = this.url;
                },
                wrong: function(wrong) {
                    wrong && (this.$parent.$parent.currentTab = "settings");
                }
            },
            mounted: function() {
                this.malUrl = this.url, j.$(this.$el).closest("html").find("head").click();
                var This = this;
                j.$(this.$el).on("click", ".searchItem", function(e) {
                    e.preventDefault(), This.submit(j.$(this).attr("href"));
                }), this.wrong && (this.$parent.$parent.currentTab = "settings");
            },
            computed: {
                title: function() {
                    return void 0 !== this.page.malObj ? this.page.malObj.name : "Not Found";
                },
                url: function() {
                    return void 0 !== this.page.malObj ? this.page.malObj.url : "";
                },
                wrong: function() {
                    return !(void 0 === this.page || void 0 === this.page.malObj || !this.page.malObj.wrong);
                },
                offset: {
                    get: function() {
                        var offset = this.page.getOffset();
                        return 0 === offset ? "" : offset;
                    },
                    set: function(offset) {
                        null !== offset && ("" !== offset ? (this.page.setOffset(offset), utils.flashm(api.storage.lang("correction_NewOffset", [ offset ]))) : (this.page.setOffset("0"), 
                        utils.flashm(api.storage.lang("correction_OffsetReset"))));
                    }
                }
            },
            methods: {
                lang: api.storage.lang,
                submit: function(malUrl) {
                    var toDatabase = !1;
                    void 0 !== this.page.page.database && confirm("Submit database correction request?") && (toDatabase = "correction"), 
                    this.$set(this.page, "malObj", void 0), this.page.setCache(malUrl, toDatabase), 
                    utils.flashm(api.storage.lang("correction_NewUrl", [ malUrl ]), !1), this.page.handlePage();
                },
                noMal: function() {
                    this.submit("");
                },
                reset: function() {
                    this.page.deleteCache(), this.$set(this.page, "malObj", void 0), utils.flashm(api.storage.lang("correction_NewUrlReset"), !1), 
                    this.page.handlePage();
                },
                update: function() {
                    this.submit(this.malUrl);
                }
            }
        };
    }).call(this, __webpack_require__(0), __webpack_require__(3), __webpack_require__(2));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(j, api) {
        __webpack_require__(8);
        var _bookmarksItem_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);
        __webpack_exports__.a = {
            components: {
                bookmarksItem: _bookmarksItem_vue__WEBPACK_IMPORTED_MODULE_1__.a
            },
            data: function() {
                return {
                    items: [],
                    loading: !0
                };
            },
            props: {
                type: {
                    type: String,
                    default: "anime"
                },
                keyword: {
                    type: String,
                    default: ""
                }
            },
            mounted: function() {
                this.load();
            },
            activated: function() {
                this.$nextTick(() => {
                    j.$(this.$el).closest("html").find("head").click();
                });
            },
            watch: {
                keyword: function(type) {
                    this.load();
                },
                type: function(type) {
                    this.load();
                }
            },
            methods: {
                lang: api.storage.lang,
                load: function() {
                    this.loading = !0, api.request.xhr("GET", "https://myanimelist.net/search/prefix.json?type=" + this.type + "&keyword=" + this.keyword + "&v=1").then(response => {
                        this.loading = !1;
                        var searchResults = j.$.parseJSON(response.responseText);
                        this.items = searchResults.categories[0].items;
                    });
                }
            }
        };
    }).call(this, __webpack_require__(3), __webpack_require__(0));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(utils, api) {
        __webpack_require__(8);
        __webpack_exports__.a = {
            data: function() {
                return {
                    prediction: void 0,
                    resumeUrl: null,
                    continueUrl: null
                };
            },
            props: {
                item: {
                    type: Object
                }
            },
            mounted: async function() {
                if (void 0 === this.item.resume) {
                    var resumeUrl = null, continueUrl = null, id = this.item.malId, type = this.item.type, resumeUrlObj = await utils.getResumeWaching(type, id), continueUrlObj = await utils.getContinueWaching(type, id), curEp = parseInt(this.item.watchedEp.toString());
                    void 0 !== continueUrlObj && continueUrlObj.ep === curEp + 1 ? continueUrl = continueUrlObj.url : void 0 !== resumeUrlObj && resumeUrlObj.ep === curEp && (resumeUrl = resumeUrlObj.url), 
                    this.resumeUrl = resumeUrl, this.continueUrl = continueUrl;
                }
                void 0 === this.prediction && (this.setPrediction(), setInterval(() => {
                    this.setPrediction();
                }, 6e4));
            },
            watch: {
                prediction: function() {
                    this.$parent.sortByPrediction();
                }
            },
            computed: {
                imageHi: function() {
                    var imageHi = this.item.image, regexDimensions = /\/r\/\d*x\d*/g;
                    return regexDimensions.test(imageHi) && (imageHi = imageHi.replace(/v.jpg$/g, ".jpg").replace(regexDimensions, "")), 
                    imageHi;
                },
                barTotal: function() {
                    return this.prediction && this.prediction.tagEpisode && !this.hasTotalEp ? this.prediction.tagEpisode > this.item.watchedEp ? Math.ceil(1.2 * this.prediction.tagEpisode) : Math.ceil(1.2 * this.item.watchedEp) : this.item.totalEp;
                },
                hasTotalEp: function() {
                    return 0 !== parseInt(this.item.totalEp);
                },
                progress: function() {
                    return "width: " + this.item.watchedEp / this.barTotal * 100 + "%; max-width: 100%;";
                },
                predictionBar: function() {
                    var predictionProgress = this.prediction.tagEpisode / this.barTotal * 100, color = "orange";
                    return "" !== this.prediction.color && (color = this.prediction.color), "width: " + predictionProgress + "%; background-color: " + color;
                },
                streamUrl: function() {
                    return utils.getUrlFromTags(this.item.tags);
                },
                preTexter: function() {
                    var pre = this.prediction.prediction, diffDays = pre.diffDays, diffHours = pre.diffHours, diffMinutes = pre.diffMinutes;
                    diffDays > 1 && diffHours > 12 && diffDays++;
                    var text = "";
                    return diffDays > 1 ? text + diffDays + " " + api.storage.lang("bookmarksItem_Days") : (1 === diffDays && (text += diffDays + " " + api.storage.lang("bookmarksItem_Day") + " "), 
                    diffHours > 1 ? text + diffHours + " " + api.storage.lang("bookmarksItem_Hours") : (1 === diffHours && (text += diffHours + " " + api.storage.lang("bookmarksItem_Hour") + " "), 
                    text + diffMinutes + " " + api.storage.lang("bookmarksItem_mins")));
                }
            },
            methods: {
                lang: api.storage.lang,
                favicon: function(domain) {
                    return utils.favicon(domain);
                },
                assetUrl: function(asset) {
                    return api.storage.assetUrl(asset);
                },
                setPrediction: function() {
                    utils.epPredictionUI(this.item.malId, this.item.type, prediction => {
                        this.prediction = prediction;
                    });
                }
            }
        };
    }).call(this, __webpack_require__(2), __webpack_require__(0));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(utils, api, j, con) {
        var _provider_provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
        __webpack_exports__.a = {
            data: function() {
                return {
                    xhr: "",
                    imageTemp: null,
                    mal: {
                        resumeUrl: null,
                        continueUrl: null
                    },
                    kiss2mal: {},
                    related: [],
                    prediction: null,
                    utils: utils
                };
            },
            props: {
                renderObj: {
                    type: Object,
                    default: null
                }
            },
            watch: {
                renderObj: async function(renderObj) {
                    this.xhr = "", this.mal.resumeUrl = null, this.mal.continueUrl = null, this.kiss2mal = {}, 
                    this.related = [], this.prediction = null, this.imageTemp = null, null != renderObj && (null !== renderObj.getMalUrl() ? (api.request.xhr("GET", renderObj.getMalUrl()).then(response => {
                        this.xhr = response.responseText, this.related = this.getRelated(), this.updateStatusTags();
                    }), this.mal.resumeUrl = await renderObj.getResumeWaching(), this.mal.continueUrl = await renderObj.getContinueWaching(), 
                    renderObj.getMalUrl().split("").length > 3 && (utils.getMalToKissArray(renderObj.type, renderObj.id).then(links => {
                        this.kiss2mal = links;
                    }), utils.epPredictionUI(renderObj.id, renderObj.type, prediction => {
                        this.prediction = prediction;
                    }))) : this.xhr = " ", void 0 !== this.renderObj.renderNoImage && this.renderObj.renderNoImage || (this.imageTemp = await this.renderObj.getImage()));
                }
            },
            computed: {
                editUrl: function() {
                    return this.renderObj.id ? `https://myanimelist.net/ownlist/${this.renderObj.type}/${this.renderObj.id}/edit` : null;
                },
                malStatus: {
                    get: function() {
                        return this.renderObj ? 0 === this.renderObj.getScore() ? 1 : this.renderObj.getStatus() : null;
                    },
                    set: function(value) {
                        this.renderObj && this.renderObj.setStatus(value);
                    }
                },
                malEpisode: {
                    get: function() {
                        return this.renderObj ? this.renderObj.addAnime ? null : this.renderObj.getEpisode() : null;
                    },
                    set: function(value) {
                        this.renderObj && this.renderObj.setEpisode(value);
                    }
                },
                malVolume: {
                    get: function() {
                        return this.renderObj ? this.renderObj.addAnime ? null : this.renderObj.getVolume() : null;
                    },
                    set: function(value) {
                        this.renderObj && this.renderObj.setVolume(value);
                    }
                },
                malScore: {
                    get: function() {
                        return this.renderObj ? 0 === this.renderObj.getScore() ? "" : this.renderObj.getScore() : null;
                    },
                    set: function(value) {
                        this.renderObj && this.renderObj.setScore(value);
                    }
                },
                statistics: function() {
                    var stats = "";
                    try {
                        var statsBlock = this.xhr.split("<h2>Statistics</h2>")[1].split("<h2>")[0], tempHtml = j.$.parseHTML(statsBlock), statsHtml = '<ul class="mdl-list mdl-grid mdl-grid--no-spacing mdl-cell mdl-cell--12-col" style="display: flex; justify-content: space-around;">';
                        j.$.each(j.$(tempHtml).filter("div").slice(0, 5), function(index, value) {
                            statsHtml += '<li class="mdl-list__item mdl-list__item--two-line" style="padding: 0; padding-left: 10px; padding-right: 3px; min-width: 18%;">', 
                            statsHtml += '<span class="mdl-list__item-primary-content">', statsHtml += "<span>", 
                            statsHtml += j.$(value).find(".dark_text").text(), statsHtml += "</span>", statsHtml += '<span class="mdl-list__item-sub-title">', 
                            statsHtml += null != j.$(value).find("span[itemprop=ratingValue]").height() ? j.$(value).find("span[itemprop=ratingValue]").text() : j.$(value).clone().children().remove().end().text(), 
                            statsHtml += "</span>", statsHtml += "</span>", statsHtml += "</li>";
                        }), stats = statsHtml += "</ul>";
                    } catch (e) {
                        console.log("[iframeOverview] Error:", e);
                    }
                    return stats;
                },
                displayUrl: function() {
                    return null != this.renderObj ? this.renderObj.getDisplayUrl() : this.renderObj.url;
                },
                image: function() {
                    var image = "";
                    try {
                        image = this.xhr.split("js-scrollfix-bottom")[1].split('<img src="')[1].split('"')[0];
                    } catch (e) {
                        console.log("[iframeOverview] Error:", e);
                    }
                    try {
                        null !== this.imageTemp && "" !== this.imageTemp && (image = this.imageTemp);
                    } catch (e) {
                        console.log("[iframeOverview] Error:", e);
                    }
                    return image;
                },
                title: function() {
                    var title = "";
                    try {
                        title = this.xhr.split('itemprop="name">')[1].split("<")[0];
                    } catch (e) {
                        console.log("[iframeOverview] Error:", e);
                    }
                    try {
                        title = this.renderObj.name;
                    } catch (e) {
                        console.log("[iframeOverview] Error:", e);
                    }
                    return title;
                },
                description: function() {
                    var description = "";
                    try {
                        description = this.xhr.split('itemprop="description">')[1].split("</span")[0];
                    } catch (e) {
                        console.log("[iframeOverview] Error:", e);
                    }
                    return description;
                },
                altTitle: function() {
                    var altTitle = "";
                    try {
                        altTitle = (altTitle = (altTitle = (altTitle = this.xhr.split("<h2>Alternative Titles</h2>")[1].split("<h2>")[0]).replace(/spaceit_pad/g, 'mdl-chip" style="margin-right: 5px;')).replace(/<\/span>/g, '</span><span class="mdl-chip__text">')).replace(/<\/div>/g, "</span></div>");
                    } catch (e) {
                        console.log("[iframeOverview] Error:", e);
                    }
                    return altTitle;
                },
                streaming: function() {
                    var streamhtml = null, malObj = this.renderObj;
                    if (null == malObj) return null;
                    var streamUrl = malObj.getStreamingUrl();
                    return void 0 !== streamUrl && (streamhtml = `\n          <div class="data title progress" style="display: inline-block; position: relative; top: 2px; margin-left: -2px;">\n            <a class="stream mdl-button mdl-button--colored mdl-js-button mdl-button--raised" title="${streamUrl.split("/")[2]}" target="_blank" style="margin: 0px 5px; color: white;" href="${streamUrl}">\n              <img src="${utils.favicon(streamUrl.split("/")[2])}" style="padding-bottom: 3px; padding-right: 6px; margin-left: -3px;">${api.storage.lang("overview_Continue_" + malObj.type)}\n            </a>`, 
                    con.log("Resume", this.mal.resumeUrl, "Continue", this.mal.continueUrl), void 0 !== this.mal.continueUrl && this.mal.continueUrl && this.mal.continueUrl.ep === malObj.getEpisode() + 1 ? streamhtml += `<a class="nextStream mdl-button mdl-button--colored mdl-js-button mdl-button--raised" title="${api.storage.lang("overview_Next_Episode_" + malObj.type)}" target="_blank" style="margin: 0px 5px 0px 0px; color: white;" href="${this.mal.continueUrl.url}">\n              <img src="${api.storage.assetUrl("double-arrow-16px.png")}" width="16" height="16" style="padding-bottom: 3px; padding-right: 6px; margin-left: -3px;">${api.storage.lang("overview_Next_Episode_" + malObj.type)}\n            </a>` : void 0 !== this.mal.resumeUrl && this.mal.resumeUrl && this.mal.resumeUrl.ep === malObj.getEpisode() && (streamhtml += `<a class="resumeStream mdl-button mdl-button--colored mdl-js-button mdl-button--raised" title="${api.storage.lang("overview_Resume_Episode_" + malObj.type)}" target="_blank" style="margin: 0px 5px 0px 0px; color: white;" href="${this.mal.resumeUrl.url}">\n              <img src="${api.storage.assetUrl("arrow-16px.png")}" width="16" height="16" style="padding-bottom: 3px; padding-right: 6px; margin-left: -3px;">${api.storage.lang("overview_Resume_Episode_" + malObj.type)}\n            </a>`), 
                    streamhtml += "</div>\n        "), streamhtml;
                },
                characters: function() {
                    var charArray = [];
                    try {
                        var characterBlock = this.xhr.split("detail-characters-list")[1].split("</h2>")[0], charHtml = j.$.parseHTML('<div class="detail-characters-list ' + characterBlock);
                        j.$.each(j.$(charHtml).find(":not(td) > table"), (index, value) => {
                            index || 1;
                            var regexDimensions = /\/r\/\d*x\d*/g, charImg = j.$(value).find("img").first().attr("data-src");
                            charImg = regexDimensions.test(charImg) ? charImg.replace(regexDimensions, "") : "https://myanimelist.cdn-dena.com/images/questionmark_23.gif", 
                            charImg = utils.handleMalImages(charImg), charArray.push({
                                img: charImg,
                                html: j.$(value).find(".borderClass .spaceit_pad").first().parent().html()
                            });
                        });
                    } catch (e) {
                        console.log("[iframeOverview] Error:", e);
                    }
                    return charArray;
                },
                info: function() {
                    var html = "";
                    try {
                        var infoBlock = this.xhr.split("<h2>Information</h2>")[1].split("<h2>")[0], infoData = j.$.parseHTML(infoBlock), infoHtml = '<ul class="mdl-grid mdl-grid--no-spacing mdl-list mdl-cell mdl-cell--12-col">';
                        j.$.each(j.$(infoData).filter("div"), (index, value) => {
                            infoHtml += '<li class="mdl-list__item mdl-list__item--three-line mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet">', 
                            infoHtml += '<span class="mdl-list__item-primary-content">', infoHtml += "<span>", 
                            infoHtml += j.$(value).find(".dark_text").text(), infoHtml += "</span>", infoHtml += '<span class="mdl-list__item-text-body">', 
                            j.$(value).find(".dark_text").remove(), infoHtml += j.$(value).html(), infoHtml += "</span>", 
                            infoHtml += "</span>", infoHtml += "</li>";
                        }), infoHtml += this.externalLinks, html += '<div class="mdl-grid mdl-grid--no-spacing mdl-cell mdl-cell--12-col mdl-shadow--4dp info-block mdl-grid malClear">' + (infoHtml += "</ul>") + "</div>";
                    } catch (e) {
                        console.log("[iframeOverview] Error:", e);
                    }
                    return html;
                },
                externalLinks: function() {
                    var html = "";
                    try {
                        var infoBlock = this.xhr.split("<h2>External Links</h2>")[1].split("</div>")[0] + "</div>", infoData = j.$.parseHTML(infoBlock), infoHtml = "";
                        infoHtml += '<li class="mdl-list__item mdl-list__item--three-line mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet">', 
                        infoHtml += '<span class="mdl-list__item-primary-content">', infoHtml += "<span>", 
                        infoHtml += "External Links", infoHtml += "</span>", infoHtml += '<span class="mdl-list__item-text-body">', 
                        j.$.each(j.$(infoData).find("a"), (index, value) => {
                            index && (infoHtml += ", "), infoHtml += '<a href="' + j.$(value).attr("href") + '">' + j.$(value).text() + "</a>";
                        }), infoHtml += "</span>", infoHtml += "</span>", html = infoHtml += "</li>";
                    } catch (e) {
                        console.log("[iframeOverview] Error:", e);
                    }
                    return html;
                },
                openingSongs: function() {
                    var openingSongs = [];
                    try {
                        var openingBlock = "<div>" + this.xhr.split('opnening">')[1].split("</div>")[0] + "</div>", openingData = j.$.parseHTML(openingBlock);
                        openingSongs = j.$.map(j.$(openingData).find(".theme-song"), j.$.text);
                    } catch (e) {
                        console.log("[iframeOverview] Error:", e);
                    }
                    return openingSongs;
                },
                endingSongs: function() {
                    var endingSongs = [];
                    try {
                        var endingBlock = "<div>" + this.xhr.split(' ending">')[1].split("</div>")[0] + "</div>", endingData = j.$.parseHTML(endingBlock);
                        endingSongs = j.$.map(j.$(endingData).find(".theme-song"), j.$.text);
                    } catch (e) {
                        console.log("[iframeOverview] Error:", e);
                    }
                    return endingSongs;
                }
            },
            methods: {
                lang: api.storage.lang,
                malSync: function() {
                    this.renderObj.sync().then(function() {
                        utils.flashm("Updated");
                    }, function() {
                        utils.flashm("Update failed", {
                            error: !0
                        });
                    });
                },
                getMal2KissFavicon: function(streams) {
                    try {
                        return utils.favicon(streams[Object.keys(streams)[0]].url.split("/")[2]);
                    } catch (e) {
                        return con.error(e), "";
                    }
                },
                getRelated: function() {
                    var el = [];
                    try {
                        var relatedBlock = this.xhr.split("Related ")[1].split("</h2>")[1].split("<h2>")[0], related = j.$.parseHTML(relatedBlock);
                        j.$.each(j.$(related).filter("table").find("tr"), function(index, value) {
                            var links = [];
                            j.$(value).find(".borderClass").last().find("a").each(function(index, value) {
                                links.push({
                                    url: j.$(value).attr("href"),
                                    title: j.$(value).text(),
                                    statusTag: ""
                                });
                            }), el.push({
                                type: j.$(value).find(".borderClass").first().text(),
                                links: links
                            });
                        });
                    } catch (e) {
                        console.log("[iframeOverview] Error:", e);
                    }
                    return el;
                },
                updateStatusTags: async function() {
                    for (var relatedKey in this.related) {
                        var relate = this.related[relatedKey];
                        for (var linkKey in relate.links) {
                            var link = relate.links[linkKey], url = utils.absoluteLink(link.url, "https://myanimelist.net");
                            if (void 0 !== url) {
                                var tag = await utils.timeCache("MALTAG/" + url, async function() {
                                    var malObj = Object(_provider_provider__WEBPACK_IMPORTED_MODULE_0__.a)(url, !0, !0);
                                    return await malObj.init(), utils.statusTag(malObj.getStatus(), malObj.type, malObj.id);
                                }, 36e5);
                                tag && (this.related[relatedKey].links[linkKey].statusTag = tag);
                            }
                        }
                    }
                }
            }
        };
    }).call(this, __webpack_require__(2), __webpack_require__(0), __webpack_require__(3), __webpack_require__(1));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(j, api) {
        __webpack_require__(8);
        __webpack_exports__.a = {
            data: function() {
                return {
                    xhr: ""
                };
            },
            props: {
                url: {
                    type: String,
                    default: ""
                },
                state: {
                    type: Boolean,
                    default: !1
                }
            },
            updated: function() {
                var minimal = j.$(this.$el);
                minimal.find(".js-similar-recommendations-button").addClass("nojs").click(function() {
                    j.$(this).parent().find(".more").toggle();
                }), minimal.find(".js-toggle-recommendation-button").addClass("nojs").click(function() {
                    var revID = j.$(this).attr("data-id");
                    minimal.find("#recommend" + revID).css("display", "initial"), j.$(this).remove();
                }), minimal.find("#malRecommendations .more .borderClass").addClass("mdl-shadow--2dp").css("padding", "10px"), 
                minimal.find(".lazyload").each(function() {
                    j.$(this).attr("src", j.$(this).attr("data-src"));
                });
            },
            watch: {
                url: async function(url) {
                    this.xhr = "", this.state && api.request.xhr("GET", this.url + "/userrecs").then(response => {
                        this.xhr = response.responseText;
                    });
                },
                state: async function(state) {
                    state && "" === this.xhr && api.request.xhr("GET", this.url + "/userrecs").then(response => {
                        this.xhr = response.responseText;
                    });
                }
            },
            computed: {
                recommendations: function() {
                    try {
                        var recommendationsBlock = this.xhr.split("Make a recommendation</a>")[1].split("</h2>")[1].split('<div class="mauto')[0], htmlT = j.$.parseHTML(recommendationsBlock), recommendationsHtml = "";
                        j.$.each(j.$(htmlT).filter(".borderClass"), (index, value) => {
                            recommendationsHtml += '<div class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet mdl-shadow--4dp mdl-grid">', 
                            recommendationsHtml += '<div class="mdl-card__media" style="background-color: transparent; margin: 8px;">', 
                            recommendationsHtml += j.$(value).find(".picSurround").html(), recommendationsHtml += "</div>", 
                            recommendationsHtml += '<div class="mdl-cell" style="flex-grow: 100;">', recommendationsHtml += '<div class="">', 
                            j.$(value).find(".button_edit, .button_add, td:eq(1) > div:eq(1) span").remove(), 
                            recommendationsHtml += j.$(value).find("td:eq(1) > div:eq(1)").html(), recommendationsHtml += "</div>", 
                            recommendationsHtml += '<div class="">', j.$(value).find('a[href^="/dbchanges.php?go=report"]').remove(), 
                            recommendationsHtml += j.$(value).find(".borderClass").html(), recommendationsHtml += "</div>", 
                            recommendationsHtml += '<div class="">', recommendationsHtml += void 0 !== j.$(value).find(".spaceit").html() ? j.$(value).find(".spaceit").html() : "", 
                            recommendationsHtml += '<div class="more" style="display: none;">', recommendationsHtml += j.$(value).find("td:eq(1) > div").last().html(), 
                            recommendationsHtml += "</div>", recommendationsHtml += "</div>", recommendationsHtml += "</div>", 
                            recommendationsHtml += "</div>";
                        }), recommendationsHtml += "";
                    } catch (e) {
                        console.log("[iframeRecommendations] Error:", e);
                    }
                    return recommendationsHtml;
                }
            },
            methods: {
                lang: api.storage.lang
            }
        };
    }).call(this, __webpack_require__(3), __webpack_require__(0));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(j, api) {
        var timer, _provider_provider_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8), _bookmarksItem_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);
        __webpack_exports__.a = {
            components: {
                bookmarksItem: _bookmarksItem_vue__WEBPACK_IMPORTED_MODULE_1__.a
            },
            data: function() {
                return {
                    items: [],
                    loading: !0
                };
            },
            props: {
                listType: {
                    type: String,
                    default: "anime"
                },
                state: {
                    type: Number,
                    default: 1
                }
            },
            mounted: function() {
                this.load();
            },
            activated: function() {
                this.$nextTick(() => {
                    j.$(this.$el).closest("html").find("head").click();
                });
            },
            watch: {
                listType: function(type) {
                    this.load();
                },
                state: function(state) {
                    this.load();
                }
            },
            methods: {
                lang: api.storage.lang,
                load: function() {
                    this.loading = !0, _provider_provider_ts__WEBPACK_IMPORTED_MODULE_0__.b(this.state, this.listType, {
                        fullListCallback: async list => {
                            this.loading = !1, this.items = list;
                        }
                    });
                },
                sortByPrediction: function() {
                    1 !== this.state && "1" !== this.state || (clearTimeout(timer), timer = setTimeout(() => {
                        var This = this, normalItems = [], preItems = [], watchedItems = [];
                        function sortItems(a, b) {
                            var vueA = This.$refs[a.uid][0], vueB = This.$refs[b.uid][0], preA = 99999999, preB = preA;
                            return vueA.prediction && vueA.prediction.prediction && (preA = 1440 * vueA.prediction.prediction.diffDays + 60 * vueA.prediction.prediction.diffHours + vueA.prediction.prediction.diffMinutes), 
                            vueB.prediction && vueB.prediction.prediction && (preB = 1440 * vueB.prediction.prediction.diffDays + 60 * vueB.prediction.prediction.diffHours + vueB.prediction.prediction.diffMinutes), 
                            preA - preB;
                        }
                        this.items.forEach(item => {
                            var vue = this.$refs[item.uid][0];
                            vue.prediction && vue.prediction.prediction ? item.watchedEp < vue.prediction.tagEpisode ? preItems.push(item) : watchedItems.push(item) : normalItems.push(item);
                        }), preItems = preItems.sort(sortItems).reverse(), watchedItems = watchedItems.sort(sortItems), 
                        this.items = preItems.concat(watchedItems, normalItems), this.$nextTick(() => {
                            j.$(this.$el).closest(".mdl-layout__content").first().scroll();
                        });
                    }, 50));
                }
            }
        };
    }).call(this, __webpack_require__(3), __webpack_require__(0));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(api, con, utils) {
        var interva, _provider_provider_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
        __webpack_exports__.a = {
            data: function() {
                return {
                    items: [],
                    history: []
                };
            },
            props: {
                listType: {
                    type: String,
                    default: "anime"
                }
            },
            mounted: function() {
                this.load(), interva = setInterval(() => {
                    this.load();
                }, 5e3);
            },
            destroyed: function() {
                clearInterval(interva);
            },
            watch: {
                listType: function(type) {
                    this.load();
                }
            },
            methods: {
                lang: api.storage.lang,
                load: function() {
                    _provider_provider_ts__WEBPACK_IMPORTED_MODULE_0__.b(1, this.listType, {
                        fullListCallback: async list => {
                            for (var i = 0; i < list.length; i++) {
                                var el = list[i], episode = "", error = "", trColor = "";
                                con.log("el", el);
                                var elCache = await api.storage.get("updateCheck/" + this.listType + "/" + el.malId);
                                con.log("elCache", elCache), void 0 !== elCache && (episode = elCache.newestEp + "/" + el.totalEp, 
                                trColor = "orange", elCache.finished && (error = "finished", trColor = "green"), 
                                void 0 !== elCache.error && (error = elCache.error, trColor = "red")), el.episode = episode, 
                                el.trColor = trColor, el.error = error;
                            }
                            this.items = list;
                        }
                    }), api.storage.get("notificationHistory").then(history => {
                        history.forEach(entry => {
                            var timeDiff = Date.now() - entry.timestamp;
                            timeDiff = utils.timeDiffToText(timeDiff), timeDiff += "ago", entry.timeDiff = timeDiff;
                        }), this.history = history.reverse();
                    });
                },
                deleteItem(item) {
                    var delPath = "updateCheck/" + this.listType + "/" + item.id;
                    con.log("delete", delPath, item), api.storage.remove(delPath), item.trColor = "black";
                },
                notificationTest() {
                    utils.notifications("https://malsync.lolamtisch.de/", "MyAnimeList-Sync", "by lolamtisch", "https://cdn.myanimelist.net/images/anime/5/65187.jpg");
                },
                startCheck() {
                    chrome.alarms.create("updateCheckNow", {
                        when: Date.now() + 1e3
                    }), utils.flashm("Check started");
                }
            }
        };
    }).call(this, __webpack_require__(0), __webpack_require__(1), __webpack_require__(2));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(j, api) {
        __webpack_require__(8);
        __webpack_exports__.a = {
            data: function() {
                return {
                    xhr: ""
                };
            },
            props: {
                url: {
                    type: String,
                    default: ""
                },
                state: {
                    type: Boolean,
                    default: !1
                }
            },
            updated: function() {
                var minimal = j.$(this.$el);
                minimal.find(".js-toggle-review-button").addClass("nojs").click(function() {
                    var revID = j.$(this).attr("data-id");
                    minimal.find("#review" + revID).css("display", "initial"), minimal.find("#revhelp_output_" + revID).remove(), 
                    j.$(this).remove();
                }), minimal.find(".mb8 a").addClass("nojs").click(function() {
                    var revID = j.$(this).attr("onclick").split("j.$('")[1].split("'")[0];
                    minimal.find(revID).toggle();
                });
            },
            watch: {
                url: async function(url) {
                    this.xhr = "", this.state && api.request.xhr("GET", this.url + "/reviews").then(response => {
                        this.xhr = response.responseText;
                    });
                },
                state: async function(state) {
                    state && "" === this.xhr && api.request.xhr("GET", this.url + "/reviews").then(response => {
                        this.xhr = response.responseText;
                    });
                }
            },
            computed: {
                reviews: function() {
                    var html = "";
                    try {
                        var reviews = this.xhr.split("Reviews</h2>")[1].split("<h2>")[0], reviewsData = j.$.parseHTML(reviews), reviewsHtml = "";
                        j.$.each(j.$(reviewsData).filter(".borderDark"), (index, value) => {
                            reviewsHtml += '<div class="mdl-cell mdl-cell--12-col mdl-shadow--4dp">', reviewsHtml += '<div class="mdl-card__supporting-text mdl-card--border" style="color: black;">', 
                            j.$(value).find(".spaceit > div").css("max-width", "60%"), reviewsHtml += j.$(value).find(".spaceit").first().html(), 
                            reviewsHtml += "</div>", reviewsHtml += '<div class="mdl-card__supporting-text" style="color: black;">', 
                            j.$(value).find(".textReadability, .textReadability > span").contents().filter(function() {
                                return 3 === this.nodeType && j.$.trim(this.nodeValue).length;
                            }).wrap('<p style="margin:0;padding=0;"/>'), j.$(value).find("br").css("line-height", "10px"), 
                            reviewsHtml += j.$(value).find(".textReadability").html(), reviewsHtml += "</div>", 
                            reviewsHtml += "</div>";
                        }), html = reviewsHtml += "";
                    } catch (e) {
                        console.log("[iframeReview] Error:", e);
                    }
                    return html;
                }
            },
            methods: {
                lang: api.storage.lang
            }
        };
    }).call(this, __webpack_require__(3), __webpack_require__(0));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(utils, con, api, j) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return entryClass;
        });
        var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7), __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = Promise))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator.throw(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        class entryClass {
            constructor(url, miniMAL = !1, silent = !1) {
                this.url = url, this.miniMAL = miniMAL, this.silent = silent, this.aniId = NaN, 
                this.name = "", this.totalEp = NaN, this.addAnime = !1, this.login = !1, this.wrong = !1, 
                this.displayUrl = "", this.type = utils.urlPart(url, 3), void 0 !== url && url.indexOf("myanimelist.net") > -1 ? this.id = utils.urlPart(url, 4) : void 0 !== url && url.indexOf("anilist.co") > -1 ? (this.id = NaN, 
                this.aniId = utils.urlPart(url, 4)) : this.id = NaN;
            }
            init() {
                return this.update();
            }
            getDisplayUrl() {
                return "" !== this.displayUrl && null != this.displayUrl ? this.displayUrl : this.url;
            }
            getMalUrl() {
                return isNaN(this.id) ? null : "https://myanimelist.net/" + this.type + "/" + this.id + "/" + encodeURIComponent(this.name);
            }
            update() {
                con.log("Update AniList info", this.id ? "MAL: " + this.id : "AniList: " + this.aniId);
                var selectId = this.id, selectQuery = "idMal";
                isNaN(this.id) && (selectId = this.aniId, selectQuery = "id");
                var query = `\n    query ($id: Int, $type: MediaType) {\n      Media (${selectQuery}: $id, type: $type) {\n        id\n        idMal\n        siteUrl\n        episodes\n        chapters\n        volumes\n        averageScore\n        coverImage{\n          large\n        }\n        title {\n          userPreferred\n        }\n        mediaListEntry {\n          status\n          progress\n          progressVolumes\n          score(format: POINT_10)\n          repeat\n          notes\n        }\n      }\n    }\n    `, variables = {
                    id: selectId,
                    type: this.type.toUpperCase()
                };
                return api.request.xhr("POST", {
                    url: "https://graphql.anilist.co",
                    headers: {
                        Authorization: "Bearer " + _helper__WEBPACK_IMPORTED_MODULE_0__.a(),
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    data: JSON.stringify({
                        query: query,
                        variables: variables
                    })
                }).then(response => {
                    var res = JSON.parse(response.responseText);
                    con.log(res), this.login = !0, _helper__WEBPACK_IMPORTED_MODULE_0__.c(res, this.silent), 
                    this.animeInfo = res.data.Media, this.aniId = this.animeInfo.id, isNaN(this.id) && this.animeInfo.idMal && (this.id = this.animeInfo.idMal), 
                    this.displayUrl = this.animeInfo.siteUrl, this.addAnime = !1, null === this.animeInfo.mediaListEntry && (this.addAnime = !0, 
                    this.animeInfo.mediaListEntry = {
                        notes: "",
                        progress: 0,
                        progressVolumes: 0,
                        repeat: 0,
                        score: 0,
                        status: "PLANNING"
                    }), this.name = this.animeInfo.title.userPreferred, this.totalEp = this.animeInfo.episodes ? this.animeInfo.episodes : this.animeInfo.chapters, 
                    null == this.totalEp && (this.totalEp = 0), void 0 !== this.animeInfo.volumes && (this.totalVol = this.animeInfo.volumes, 
                    null == this.totalVol && (this.totalVol = 0));
                });
            }
            getEpisode() {
                return this.animeInfo.mediaListEntry.progress;
            }
            setEpisode(ep) {
                ep + "" == "" && (ep = 0), this.animeInfo.mediaListEntry.progress = parseInt(ep + "");
            }
            getVolume() {
                return "manga" == this.type && this.animeInfo.mediaListEntry.progressVolumes;
            }
            setVolume(ep) {
                "manga" != this.type ? con.error("You cant set Volumes for animes") : this.animeInfo.mediaListEntry.progressVolumes = ep;
            }
            getStatus() {
                return this.addAnime ? 0 : _helper__WEBPACK_IMPORTED_MODULE_0__.d(this.animeInfo.mediaListEntry.status);
            }
            setStatus(status) {
                "REPEATING" == this.animeInfo.mediaListEntry.status && 1 == parseInt(status.toString()) || (this.animeInfo.mediaListEntry.status = _helper__WEBPACK_IMPORTED_MODULE_0__.d(status, parseInt(status.toString())));
            }
            getScore() {
                return 0 === this.animeInfo.mediaListEntry.score ? "" : this.animeInfo.mediaListEntry.score;
            }
            setScore(score) {
                "" === score && (score = 0), this.animeInfo.mediaListEntry.score = score;
            }
            getRewatching() {
                return "REPEATING" == this.animeInfo.mediaListEntry.status ? 1 : 0;
            }
            setRewatching(rewatching) {
                1 == rewatching && (this.animeInfo.mediaListEntry.status = "REPEATING");
            }
            setCompletionDateToNow() {}
            setStartingDateToNow() {}
            getStreamingUrl() {
                var tags = this.animeInfo.mediaListEntry.notes;
                return utils.getUrlFromTags(tags);
            }
            setStreamingUrl(url) {
                var tags = this.animeInfo.mediaListEntry.notes;
                tags = utils.setUrlInTags(url, tags), this.animeInfo.mediaListEntry.notes = tags;
            }
            getRating() {
                return __awaiter(this, void 0, void 0, function*() {
                    return null == this.animeInfo.averageScore ? "N/A" : this.animeInfo.averageScore;
                });
            }
            setResumeWaching(url, ep) {
                return __awaiter(this, void 0, void 0, function*() {
                    return utils.setResumeWaching(url, ep, this.type, this.id);
                });
            }
            getResumeWaching() {
                return __awaiter(this, void 0, void 0, function*() {
                    return utils.getResumeWaching(this.type, this.id);
                });
            }
            setContinueWaching(url, ep) {
                return __awaiter(this, void 0, void 0, function*() {
                    return utils.setContinueWaching(url, ep, this.type, this.id);
                });
            }
            getContinueWaching() {
                return __awaiter(this, void 0, void 0, function*() {
                    return utils.getContinueWaching(this.type, this.id);
                });
            }
            getImage() {
                return __awaiter(this, void 0, void 0, function*() {
                    return this.animeInfo.coverImage.large;
                });
            }
            clone() {
                const copy = new this.constructor();
                return Object.assign(copy, this), copy.animeInfo = Object.assign({}, this.animeInfo), 
                copy.animeInfo.mediaListEntry = Object.assign({}, this.animeInfo.mediaListEntry), 
                copy;
            }
            sync() {
                var status = utils.status;
                return new Promise((resolve, reject) => {
                    var This = this;
                    this.type, this.id;
                    if (this.addAnime) {
                        var imgSelector = "malSyncImg" + this.id, flashConfirmText = `\n          ${api.storage.lang("syncPage_flashConfirm_Anime_Correct", [ this.name ])}\n          <br>\n          <img id="${imgSelector}" style="\n            height: 200px;\n            min-height: 200px;\n            min-width: 144px;\n            border: 1px solid;\n            margin-top: 10px;\n            display: inline;\n          " src="" />\n          <br>\n          \x3c!--<a style="margin-left: -2px;" target="_blank" href="https://github.com/lolamtisch/MALSync/wiki/Troubleshooting#myanimeentry-entry-is-not-correct">[How to correct entries]</a>--\x3e\n        `;
                        return This.miniMAL && (flashConfirmText = `\n                    Add "${this.name}" to AniList?`), 
                        "anime" == this.type ? ("https://myanimelist.net/ownlist/anime/add?selected_series_id=" + this.id, 
                        utils.flashConfirm(flashConfirmText, "add", function() {
                            continueCall();
                        }, function() {
                            wrongCall();
                        })) : ("https://myanimelist.net/ownlist/manga/add?selected_manga_id=" + this.id, 
                        utils.flashConfirm(flashConfirmText, "add", function() {
                            continueCall();
                        }, function() {
                            wrongCall();
                        })), void (This.miniMAL || (this.getImage().then(image => {
                            j.$("#" + imgSelector).attr("src", image);
                        }), j.$(".Yes").text(api.storage.lang("Yes")), j.$(".Cancel").text(api.storage.lang("No"))));
                    }
                    var watchCounter = ".add_anime[num_watched_times]", rewatchText = "Rewatch Anime?", rewatchFinishText = "Finish rewatching?";
                    function wrongCall() {
                        if (This.wrong = !0, !This.miniMAL) {
                            var miniButton = j.$("button.open-info-popup");
                            "none" != miniButton.css("display") ? miniButton.click() : (miniButton.click(), 
                            miniButton.click());
                        }
                    }
                    function continueCall() {
                        var variables = {
                            mediaId: This.aniId,
                            status: This.animeInfo.mediaListEntry.status,
                            progress: This.animeInfo.mediaListEntry.progress,
                            scoreRaw: 10 * This.animeInfo.mediaListEntry.score,
                            notes: This.animeInfo.mediaListEntry.notes
                        };
                        con.log("[SET] Object:", variables), api.request.xhr("POST", {
                            url: "https://graphql.anilist.co",
                            headers: {
                                Authorization: "Bearer " + _helper__WEBPACK_IMPORTED_MODULE_0__.a(),
                                "Content-Type": "application/json",
                                Accept: "application/json"
                            },
                            data: JSON.stringify({
                                query: "\n          mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int, $scoreRaw: Int, $notes: String) {\n            SaveMediaListEntry (mediaId: $mediaId, status: $status, progress: $progress, scoreRaw: $scoreRaw, notes: $notes) {\n              id\n              status\n              progress\n            }\n          }\n        ",
                                variables: variables
                            })
                        }).then(response => {
                            var res = JSON.parse(response.responseText);
                            con.log(res), _helper__WEBPACK_IMPORTED_MODULE_0__.c(res, This.silent), con.log("Update Succeeded"), 
                            resolve();
                        });
                    }
                    "manga" == this.type && (watchCounter = ".add_manga[num_read_times]", rewatchText = "Reread Manga?", 
                    rewatchFinishText = "Finish rereading?"), this.getStatus() != status.completed || 1 !== this.getEpisode() || 1 === this.totalEp || 1 === this.getRewatching() ? this.getStatus() != status.completed || this.getEpisode() !== this.totalEp || 1 !== this.getRewatching() ? continueCall() : utils.flashConfirm(rewatchFinishText, "add", () => {
                        this.setRewatching(0), "" === this.animeInfo[watchCounter] ? this.animeInfo[watchCounter] = 1 : this.animeInfo[watchCounter] = parseInt(this.animeInfo[watchCounter]) + 1, 
                        continueCall();
                    }, function() {
                        continueCall();
                    }) : utils.flashConfirm(rewatchText, "add", () => {
                        this.setRewatching(1), continueCall();
                    }, function() {
                        continueCall();
                    });
                });
            }
        }
    }).call(this, __webpack_require__(2), __webpack_require__(1), __webpack_require__(0), __webpack_require__(3));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(con, utils, api) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return userList;
        });
        var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
        function userList(status = 1, localListType = "anime", callbacks, username = null, offset = 0, templist = []) {
            offset < 1 && (offset = 1);
            var callback, anilist = !1;
            if (status = parseInt(status.toString()), void 0 !== callbacks.anilist && (anilist = !0), 
            con.log("[UserList][AniList]", "username: " + username, "status: " + status, "offset: " + offset), 
            null == username) return callback = function(usernameTemp) {
                0 == usernameTemp ? (utils.flashm("Please log in on <a target='_blank' href='https://myanimelist.net/login.php'>MyAnimeList!<a>"), 
                void 0 !== callbacks.fullListCallback && callbacks.fullListCallback([]), void 0 !== callbacks.finishCallback && callbacks.finishCallback()) : userList(status, localListType, callbacks, usernameTemp, offset, templist);
            }, void api.request.xhr("POST", {
                url: "https://graphql.anilist.co",
                headers: {
                    Authorization: "Bearer " + _helper__WEBPACK_IMPORTED_MODULE_0__.a(),
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                data: JSON.stringify({
                    query: "\n  query {\n    Viewer {\n      name\n      id\n    }\n  }\n  ",
                    variables: []
                })
            }).then(response => {
                var res = JSON.parse(response.responseText);
                con.log(res), _helper__WEBPACK_IMPORTED_MODULE_0__.c(res), callback(res.data.Viewer.name);
            });
            var query = "\n    query ($page: Int, $userName: String, $type: MediaType, $status: MediaListStatus, $sort: [MediaListSort] ) {\n      Page (page: $page, perPage: 100) {\n        pageInfo {\n          hasNextPage\n        }\n        mediaList (status: $status, type: $type, userName: $userName, sort: $sort) {\n          status\n          progress\n          progressVolumes\n          notes\n          media {\n            siteUrl\n            id\n            idMal\n            episodes\n            chapters\n            volumes\n            averageScore\n            coverImage{\n              large\n            }\n            title {\n              userPreferred\n            }\n          }\n        }\n      }\n    }\n    ";
            anilist && (query = "\n      query ($page: Int, $userName: String, $type: MediaType, $status: MediaListStatus, $sort: [MediaListSort]) {\n        Page (page: $page, perPage: 100) {\n          pageInfo {\n            hasNextPage\n          }\n          mediaList (status: $status, type: $type, userName: $userName, sort: $sort) {\n            progress\n            media {\n              id\n              idMal\n            }\n          }\n        }\n      }\n      ");
            var variables = {
                page: offset,
                userName: username,
                type: localListType.toUpperCase(),
                status: _helper__WEBPACK_IMPORTED_MODULE_0__.d(parseInt(status.toString()), parseInt(status.toString())),
                sort: "UPDATED_TIME_DESC"
            };
            1 !== status && (variables.sort = null), api.request.xhr("POST", {
                url: "https://graphql.anilist.co",
                headers: {
                    Authorization: "Bearer " + _helper__WEBPACK_IMPORTED_MODULE_0__.a(),
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                data: JSON.stringify({
                    query: query,
                    variables: variables
                })
            }).then(response => {
                var res = JSON.parse(response.responseText);
                con.log(res), _helper__WEBPACK_IMPORTED_MODULE_0__.c(res);
                var data = res.data.Page.mediaList;
                if (data = anilist ? function(data, listType) {
                    for (var newData = [], i = 0; i < data.length; i++) {
                        var el = data[i];
                        newData.push({
                            malid: el.media.idMal,
                            id: el.media.id,
                            watchedEp: el.progress
                        });
                    }
                    return newData;
                }(data) : function(data, listType) {
                    for (var newData = [], i = 0; i < data.length; i++) {
                        var el = data[i];
                        if ("anime" === listType) var tempData = {
                            uid: el.media.id,
                            malId: el.media.idMal,
                            type: listType,
                            title: el.media.title.userPreferred,
                            url: el.media.siteUrl,
                            watchedEp: el.progress,
                            totalEp: el.media.episodes,
                            image: el.media.coverImage.large,
                            tags: el.notes,
                            airingState: el.anime_airing_status
                        }; else var tempData = {
                            uid: el.media.id,
                            malId: el.media.idMal,
                            type: listType,
                            title: el.media.title.userPreferred,
                            url: el.media.siteUrl,
                            watchedEp: el.progress,
                            totalEp: el.media.chapters,
                            image: el.media.coverImage.large,
                            tags: el.notes,
                            airingState: el.anime_airing_status
                        };
                        null == tempData.totalEp && (tempData.totalEp = 0), newData.push(tempData);
                    }
                    return newData;
                }(data, localListType), void 0 !== callbacks.singleCallback) {
                    data.length || callbacks.singleCallback(!1, 0, 0);
                    for (var i = 0; i < data.length; i++) callbacks.singleCallback(data[i], i + offset + 1, data.length + offset);
                }
                void 0 !== callbacks.fullListCallback && (templist = templist.concat(data)), res.data.Page.pageInfo.hasNextPage ? void 0 !== callbacks.continueCall ? callbacks.continueCall(function() {
                    userList(status, localListType, callbacks, username, offset + 1, templist);
                }) : userList(status, localListType, callbacks, username, offset + 1, templist) : (void 0 !== callbacks.fullListCallback && callbacks.fullListCallback(templist), 
                void 0 !== callbacks.finishCallback && callbacks.finishCallback());
            });
        }
    }).call(this, __webpack_require__(1), __webpack_require__(2), __webpack_require__(0));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(utils, con, api, j) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return entryClass;
        });
        var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6), __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = Promise))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator.throw(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        class entryClass {
            constructor(url, miniMAL = !1, silent = !1) {
                this.url = url, this.miniMAL = miniMAL, this.silent = silent, this.kitsuSlug = "", 
                this.kitsuId = NaN, this.name = "", this.totalEp = NaN, this.addAnime = !1, this.login = !1, 
                this.wrong = !1, this.type = utils.urlPart(url, 3), void 0 !== url && url.indexOf("myanimelist.net") > -1 ? this.id = utils.urlPart(url, 4) : void 0 !== url && url.indexOf("kitsu.io") > -1 ? (this.id = NaN, 
                this.kitsuSlug = utils.urlPart(url, 4)) : this.id = NaN;
            }
            init() {
                return this.update();
            }
            getDisplayUrl() {
                return "https://kitsu.io/" + this.type + "/" + this.animeI().attributes.slug;
            }
            getMalUrl() {
                return isNaN(this.id) ? null : "https://myanimelist.net/" + this.type + "/" + this.id + "/" + encodeURIComponent(this.name);
            }
            listI() {
                return this.animeInfo.data[0];
            }
            animeI() {
                return this.animeInfo.included[0];
            }
            update() {
                return __awaiter(this, void 0, void 0, function*() {
                    if (con.log("Update Kitsu info", this.id ? "MAL: " + this.id : "Kitsu: " + this.kitsuSlug), 
                    isNaN(this.id)) {
                        var kitsuSlugRes = yield _helper__WEBPACK_IMPORTED_MODULE_0__.c(this.kitsuSlug, this.type);
                        this.kitsuId = kitsuSlugRes.res.data[0].id, this.id = kitsuSlugRes.malId;
                    }
                    if (isNaN(this.kitsuId)) {
                        var kitsuRes = yield _helper__WEBPACK_IMPORTED_MODULE_0__.d(this.id, this.type);
                        try {
                            this.kitsuId = kitsuRes.data[0].relationships.item.data.id;
                        } catch (e) {
                            con.error("Not found", e), this.silent || utils.flashm("Kitsu: Not found", {
                                error: !0,
                                type: "not found"
                            });
                        }
                    }
                    return api.request.xhr("GET", {
                        url: "https://kitsu.io/api/edge/library-entries?filter[user_id]=" + (yield _helper__WEBPACK_IMPORTED_MODULE_0__.f()) + "&filter[kind]=" + this.type + "&filter[" + this.type + "_id]=" + this.kitsuId + "&page[limit]=1&page[limit]=1&include=" + this.type + "&fields[" + this.type + "]=slug,titles,averageRating,posterImage," + ("anime" == this.type ? "episodeCount" : "chapterCount,volumeCount"),
                        headers: {
                            Authorization: "Bearer " + _helper__WEBPACK_IMPORTED_MODULE_0__.a(),
                            "Content-Type": "application/vnd.api+json",
                            Accept: "application/vnd.api+json"
                        },
                        data: {}
                    }).then(response => {
                        var res = JSON.parse(response.responseText);
                        con.log(res), this.login = !0, _helper__WEBPACK_IMPORTED_MODULE_0__.b(res, this.silent), 
                        this.animeInfo = res, this.addAnime = !1, this.animeInfo.data.length || (this.addAnime = !0, 
                        this.animeInfo.data[0] = {
                            attributes: {
                                notes: "",
                                progress: 0,
                                volumesOwned: 0,
                                reconsuming: !1,
                                reconsumeCount: !1,
                                ratingTwenty: null,
                                status: "planned"
                            }
                        }, this.animeInfo.included = void 0 !== kitsuRes ? kitsuRes.included : kitsuSlugRes.res.data), 
                        NaN === this.getEpisode() && this.setEpisode(0), this.setScore(this.getScore()), 
                        this.name = this.animeI().attributes.titles.en, void 0 !== this.name && this.name || (this.name = this.animeI().attributes.titles.en_jp), 
                        void 0 !== this.name && this.name || (this.name = this.animeI().attributes.titles.ja_jp), 
                        this.totalEp = this.animeI().attributes.episodeCount ? this.animeI().attributes.episodeCount : this.animeI().attributes.chapterCount, 
                        null == this.totalEp && (this.totalEp = 0), void 0 !== this.animeI().attributes.volumeCount && (this.totalVol = this.animeI().attributes.volumeCount, 
                        null == this.totalVol && (this.totalVol = 0));
                    });
                });
            }
            getEpisode() {
                return this.listI().attributes.progress;
            }
            setEpisode(ep) {
                ep + "" == "" && (ep = 0), this.listI().attributes.progress = parseInt(ep + "");
            }
            getVolume() {
                return "manga" == this.type && this.listI().attributes.volumesOwned;
            }
            setVolume(ep) {
                "manga" != this.type ? con.error("You cant set Volumes for animes") : this.listI().attributes.volumesOwned = ep;
            }
            getStatus() {
                return this.addAnime ? 0 : _helper__WEBPACK_IMPORTED_MODULE_0__.e(this.listI().attributes.status);
            }
            setStatus(status) {
                this.listI().attributes.status = _helper__WEBPACK_IMPORTED_MODULE_0__.e(status, parseInt(status.toString()));
            }
            getScore() {
                var score = this.listI().attributes.ratingTwenty / 2;
                return 0 === score ? "" : score;
            }
            setScore(score) {
                this.listI().attributes.ratingTwenty = 0 != score || "" !== score ? 2 * score : null;
            }
            getRewatching() {
                return this.listI().attributes.reconsuming ? 1 : 0;
            }
            setRewatching(rewatching) {
                this.listI().attributes.reconsuming = 1 == rewatching;
            }
            setCompletionDateToNow() {}
            setStartingDateToNow() {}
            getStreamingUrl() {
                var tags = this.listI().attributes.notes;
                return utils.getUrlFromTags(tags);
            }
            setStreamingUrl(url) {
                var tags = this.listI().attributes.notes;
                tags = utils.setUrlInTags(url, tags), this.listI().attributes.notes = tags;
            }
            getRating() {
                return __awaiter(this, void 0, void 0, function*() {
                    return null == this.animeI().attributes.averageRating ? "N/A" : this.animeI().attributes.averageRating + "%";
                });
            }
            setResumeWaching(url, ep) {
                return __awaiter(this, void 0, void 0, function*() {
                    return utils.setResumeWaching(url, ep, this.type, this.id);
                });
            }
            getResumeWaching() {
                return __awaiter(this, void 0, void 0, function*() {
                    return utils.getResumeWaching(this.type, this.id);
                });
            }
            setContinueWaching(url, ep) {
                return __awaiter(this, void 0, void 0, function*() {
                    return utils.setContinueWaching(url, ep, this.type, this.id);
                });
            }
            getContinueWaching() {
                return __awaiter(this, void 0, void 0, function*() {
                    return utils.getContinueWaching(this.type, this.id);
                });
            }
            getImage() {
                return __awaiter(this, void 0, void 0, function*() {
                    return this.animeI().attributes.posterImage.large;
                });
            }
            clone() {
                const copy = new this.constructor();
                return Object.assign(copy, this), copy.animeInfo = Object.assign({}, this.animeInfo), 
                copy.animeInfo.data = Object.assign({}, this.animeInfo.data), copy.animeInfo.data[0] = Object.assign({}, this.animeInfo.data[0]), 
                copy.animeInfo.data[0].attributes = Object.assign({}, this.animeInfo.data[0].attributes), 
                copy;
            }
            sync() {
                var status = utils.status;
                return new Promise((resolve, reject) => {
                    var This = this;
                    this.type, this.id;
                    if (this.addAnime) {
                        var imgSelector = "malSyncImg" + this.id, flashConfirmText = `\n          ${api.storage.lang("syncPage_flashConfirm_Anime_Correct", [ this.name ])}\n          <br>\n          <img id="${imgSelector}" style="\n            height: 200px;\n            min-height: 200px;\n            min-width: 144px;\n            border: 1px solid;\n            margin-top: 10px;\n            display: inline;\n          " src="" />\n          <br>\n          \x3c!--<a style="margin-left: -2px;" target="_blank" href="https://github.com/lolamtisch/MALSync/wiki/Troubleshooting#myanimeentry-entry-is-not-correct">[How to correct entries]</a>--\x3e\n        `;
                        return This.miniMAL && (flashConfirmText = `\n                    Add "${this.name}" to Kitsu?`), 
                        "anime" == this.type ? ("https://myanimelist.net/ownlist/anime/add?selected_series_id=" + this.id, 
                        utils.flashConfirm(flashConfirmText, "add", function() {
                            continueCall();
                        }, function() {
                            wrongCall();
                        })) : ("https://myanimelist.net/ownlist/manga/add?selected_manga_id=" + this.id, 
                        utils.flashConfirm(flashConfirmText, "add", function() {
                            continueCall();
                        }, function() {
                            wrongCall();
                        })), void (This.miniMAL || (this.getImage().then(image => {
                            j.$("#" + imgSelector).attr("src", image);
                        }), j.$(".Yes").text(api.storage.lang("Yes")), j.$(".Cancel").text(api.storage.lang("No"))));
                    }
                    var watchCounter = ".add_anime[num_watched_times]", rewatchText = "Rewatch Anime?", rewatchFinishText = "Finish rewatching?";
                    function wrongCall() {
                        if (This.wrong = !0, !This.miniMAL) {
                            var miniButton = j.$("button.open-info-popup");
                            "none" != miniButton.css("display") ? miniButton.click() : (miniButton.click(), 
                            miniButton.click());
                        }
                    }
                    function continueCall() {
                        return __awaiter(this, void 0, void 0, function*() {
                            var variables = {
                                data: {
                                    attributes: {
                                        notes: This.listI().attributes.notes,
                                        progress: This.listI().attributes.progress,
                                        volumesOwned: This.listI().attributes.volumesOwned,
                                        reconsuming: This.listI().attributes.reconsuming,
                                        reconsumeCount: This.listI().attributes.reconsumeCount,
                                        ratingTwenty: This.listI().attributes.ratingTwenty,
                                        status: This.listI().attributes.status
                                    },
                                    type: "library-entries"
                                }
                            };
                            if (This.addAnime) {
                                updateUrl = "https://kitsu.io/api/edge/library-entries/";
                                variables.data.relationships = {
                                    [This.type]: {
                                        data: {
                                            type: This.type,
                                            id: This.kitsuId
                                        }
                                    },
                                    user: {
                                        data: {
                                            type: "users",
                                            id: yield _helper__WEBPACK_IMPORTED_MODULE_0__.f()
                                        }
                                    }
                                };
                                post = "POST";
                            } else {
                                var updateUrl = "https://kitsu.io/api/edge/library-entries/" + This.listI().id;
                                variables.data.id = This.listI().id;
                                var post = "PATCH";
                            }
                            con.log("[SET] Object:", variables), api.request.xhr(post, {
                                url: updateUrl,
                                headers: {
                                    Authorization: "Bearer " + _helper__WEBPACK_IMPORTED_MODULE_0__.a(),
                                    "Content-Type": "application/vnd.api+json",
                                    Accept: "application/vnd.api+json"
                                },
                                data: JSON.stringify(variables)
                            }).then(response => {
                                var res = JSON.parse(response.responseText);
                                con.log(res), _helper__WEBPACK_IMPORTED_MODULE_0__.b(res, This.silent), con.log("Update Succeeded"), 
                                resolve();
                            });
                        });
                    }
                    "manga" == this.type && (watchCounter = ".add_manga[num_read_times]", rewatchText = "Reread Manga?", 
                    rewatchFinishText = "Finish rereading?"), this.getStatus() != status.completed || 1 !== this.getEpisode() || 1 === this.totalEp || 1 === this.getRewatching() ? this.getStatus() != status.completed || this.getEpisode() !== this.totalEp || 1 !== this.getRewatching() ? continueCall() : utils.flashConfirm(rewatchFinishText, "add", () => {
                        this.setRewatching(0), "" === this.animeInfo[watchCounter] ? this.animeInfo[watchCounter] = 1 : this.animeInfo[watchCounter] = parseInt(this.animeInfo[watchCounter]) + 1, 
                        continueCall();
                    }, function() {
                        continueCall();
                    }) : utils.flashConfirm(rewatchText, "add", () => {
                        this.setRewatching(1), continueCall();
                    }, function() {
                        continueCall();
                    });
                });
            }
        }
    }).call(this, __webpack_require__(2), __webpack_require__(1), __webpack_require__(0), __webpack_require__(3));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(con, api) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return userList;
        });
        var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6), __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = Promise))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator.throw(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        function userList(status = 1, localListType = "anime", callbacks, username = null, offset = 0, templist = []) {
            return __awaiter(this, void 0, void 0, function*() {
                var statusPart = "", sorting = "";
                return 7 !== (status = parseInt(status.toString())) && (1 === status && (sorting = "&sort=-progressed_at"), 
                statusPart = "&filter[status]=" + (status = _helper__WEBPACK_IMPORTED_MODULE_0__.e(status, status))), 
                username = yield _helper__WEBPACK_IMPORTED_MODULE_0__.f(), con.log("[UserList][Kitsu]", "user: " + username, "status: " + status, "offset: " + offset), 
                api.request.xhr("GET", {
                    url: "https://kitsu.io/api/edge/library-entries?filter[user_id]=" + (yield _helper__WEBPACK_IMPORTED_MODULE_0__.f()) + statusPart + "&filter[kind]=" + localListType + "&page[offset]=" + offset + "&page[limit]=50" + sorting + "&include=" + localListType + "," + localListType + ".mappings," + localListType + ".mappings.item&fields[" + localListType + "]=slug,titles,averageRating,posterImage," + ("anime" == localListType ? "episodeCount" : "chapterCount,volumeCount"),
                    headers: {
                        Authorization: "Bearer " + _helper__WEBPACK_IMPORTED_MODULE_0__.a(),
                        "Content-Type": "application/vnd.api+json",
                        Accept: "application/vnd.api+json"
                    },
                    data: {}
                }).then(response => {
                    var res = JSON.parse(response.responseText);
                    con.log(res), _helper__WEBPACK_IMPORTED_MODULE_0__.b(res);
                    var data = function(data, listType) {
                        for (var newData = [], i = 0; i < data.data.length; i++) {
                            var list = data.data[i], el = data.included[i], name = el.attributes.titles.en;
                            void 0 !== name && name || (name = el.attributes.titles.en_jp), void 0 !== name && name || (name = el.attributes.titles.ja_jp);
                            for (var malId = NaN, k = 0; k < data.included.length; k++) {
                                var mapping = data.included[k];
                                if ("mappings" == mapping.type && mapping.attributes.externalSite === "myanimelist/" + listType && mapping.relationships.item.data.id == el.id) {
                                    malId = mapping.attributes.externalId, data.included.splice(k, 1);
                                    break;
                                }
                            }
                            if ("anime" === listType) var tempData = {
                                malId: malId,
                                uid: el.id,
                                kitsuSlug: el.attributes.slug,
                                type: listType,
                                title: name,
                                url: "https://kitsu.io/" + listType + "/" + el.attributes.slug,
                                watchedEp: list.attributes.progress,
                                totalEp: el.attributes.episodeCount,
                                image: el.attributes.posterImage.large,
                                tags: list.attributes.notes,
                                airingState: el.anime_airing_status
                            }; else var tempData = {
                                malId: malId,
                                uid: el.id,
                                kitsuSlug: el.attributes.slug,
                                type: listType,
                                title: name,
                                url: "https://kitsu.io/" + listType + "/" + el.attributes.slug,
                                watchedEp: list.attributes.progress,
                                totalEp: el.attributes.chapterCount,
                                image: el.attributes.posterImage.large,
                                tags: list.attributes.notes,
                                airingState: el.anime_airing_status
                            };
                            null == tempData.totalEp && (tempData.totalEp = 0), newData.push(tempData);
                        }
                        return newData;
                    }(res, localListType);
                    if (con.error(data), void 0 !== callbacks.singleCallback) {
                        data.length || callbacks.singleCallback(!1, 0, 0);
                        for (var i = 0; i < data.length; i++) callbacks.singleCallback(data[i], i + offset + 1, data.length + offset);
                    }
                    void 0 !== callbacks.fullListCallback && (templist = templist.concat(data)), res.meta.count > offset + 50 ? void 0 !== callbacks.continueCall ? callbacks.continueCall(function() {
                        userList(status, localListType, callbacks, username, offset + 50, templist);
                    }) : userList(status, localListType, callbacks, username, offset + 50, templist) : (void 0 !== callbacks.fullListCallback && callbacks.fullListCallback(templist), 
                    void 0 !== callbacks.finishCallback && callbacks.finishCallback());
                });
            });
        }
    }).call(this, __webpack_require__(1), __webpack_require__(0));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(con) {
        var inter;
        function getPlayerTime(callback) {
            clearInterval(inter), inter = setInterval(function() {
                for (var players = document.getElementsByTagName("video"), i = 0; i < players.length; i++) {
                    var player = players[i], duration = player.duration, current = player.currentTime;
                    if (duration && duration > 60) {
                        var item = {
                            current: current,
                            duration: duration
                        };
                        con.info(window.location.href, item), callback(item, player);
                        break;
                    }
                }
            }, 1e3);
        }
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return getPlayerTime;
        });
    }).call(this, __webpack_require__(1));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var render = function() {
        var _h = this.$createElement, _c = this._self._c || _h;
        return _c("div", [ _c("div", {
            staticClass: "icon material-icons",
            staticStyle: {
                "font-size": "16px",
                "line-height": "0",
                color: "#7f7f7f",
                "padding-bottom": "20px",
                "padding-left": "3px"
            },
            style: this.tagStyle,
            attrs: {
                id: this.id
            }
        }, [ this._v("\n    contact_support\n  ") ]), this._v(" "), _c("div", {
            staticClass: "mdl-tooltip mdl-tooltip--large",
            class: this.directionClass,
            attrs: {
                for: this.id
            }
        }, [ this._t("default") ], 2) ]);
    };
    render._withStripped = !0;
    var components_tooltipvue_type_script_lang_js_ = {
        data: function() {
            return {
                number: Math.floor(1e3 * Math.random() + 1)
            };
        },
        props: {
            direction: {
                type: String,
                default: "top"
            },
            tagStyle: {
                type: String,
                default: ""
            }
        },
        computed: {
            id: function() {
                return "tt-" + this.number;
            },
            directionClass: function() {
                return "mdl-tooltip--" + this.direction;
            }
        }
    }, componentNormalizer = __webpack_require__(4), component = Object(componentNormalizer.a)(components_tooltipvue_type_script_lang_js_, render, [], !1, null, null, null);
    component.options.__file = "src/minimal/minimalApp/components/tooltip.vue";
    __webpack_exports__.a = component.exports;
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var render = function() {
        var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
        return _c("div", [ _c("div", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: _vm.loading,
                expression: "loading"
            } ],
            staticClass: "mdl-progress mdl-js-progress mdl-progress__indeterminate",
            staticStyle: {
                width: "100%",
                position: "absolute"
            },
            attrs: {
                id: "loadMalSearchPop"
            }
        }), _vm._v(" "), _vm._t("default"), _vm._v(" "), _c("div", {
            staticClass: "mdl-grid"
        }, [ _vm.loading || _vm.items.length ? _vm._e() : _c("span", {
            staticClass: "mdl-chip",
            staticStyle: {
                margin: "auto",
                "margin-top": "16px",
                display: "table"
            }
        }, [ _c("span", {
            staticClass: "mdl-chip__text"
        }, [ _vm._v(_vm._s(_vm.lang("NoEntries"))) ]) ]), _vm._v(" "), _vm._l(_vm.items, function(item) {
            return _c("a", {
                key: item.id,
                staticClass: "mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet mdl-shadow--2dp mdl-grid searchItem",
                staticStyle: {
                    cursor: "pointer"
                },
                attrs: {
                    href: item.url
                }
            }, [ _c("img", {
                staticStyle: {
                    margin: "-8px 0px -8px -8px",
                    height: "100px",
                    width: "64px",
                    "background-color": "grey"
                },
                attrs: {
                    src: item.image_url
                }
            }), _vm._v(" "), _c("div", {
                staticClass: "mdl-cell",
                staticStyle: {
                    "flex-grow": "100",
                    cursor: "pointer",
                    "margin-top": "0",
                    "margin-bottom": "0"
                }
            }, [ _c("span", {
                staticStyle: {
                    "font-size": "20px",
                    "font-weight": "400",
                    "line-height": "1"
                }
            }, [ _vm._v(_vm._s(item.name)) ]), _vm._v(" "), _c("p", {
                staticStyle: {
                    "margin-bottom": "0",
                    "line-height": "20px",
                    "padding-top": "3px"
                }
            }, [ _vm._v(_vm._s(_vm.lang("search_Type")) + " " + _vm._s(item.payload.media_type)) ]), _vm._v(" "), _c("p", {
                staticStyle: {
                    "margin-bottom": "0",
                    "line-height": "20px"
                }
            }, [ _vm._v(_vm._s(_vm.lang("search_Score")) + " " + _vm._s(item.payload.score)) ]), _vm._v(" "), _c("p", {
                staticStyle: {
                    "margin-bottom": "0",
                    "line-height": "20px"
                }
            }, [ _vm._v(_vm._s(_vm.lang("search_Year")) + " " + _vm._s(item.payload.start_year)) ]) ]) ]);
        }) ], 2) ], 2);
    };
    render._withStripped = !0;
    var minimalApp_searchvue_type_script_lang_js_ = __webpack_require__(19).a, componentNormalizer = __webpack_require__(4), component = Object(componentNormalizer.a)(minimalApp_searchvue_type_script_lang_js_, render, [], !1, null, null, null);
    component.options.__file = "src/minimal/minimalApp/search.vue";
    __webpack_exports__.a = component.exports;
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var render = function() {
        var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
        return _c("div", {
            staticClass: "mdl-cell mdl-cell--2-col mdl-cell--4-col-tablet mdl-cell--6-col-phone mdl-shadow--2dp mdl-grid bookEntry",
            staticStyle: {
                position: "relative",
                height: "293px",
                padding: "0",
                width: "210px"
            },
            attrs: {
                title: _vm.prediction && _vm.prediction.text
            }
        }, [ _c("div", {
            staticClass: "data title",
            staticStyle: {
                "background-color": "#cdcdcd",
                width: "100%",
                position: "relative",
                "padding-top": "5px"
            }
        }, [ _c("div", {
            staticStyle: {
                position: "absolute",
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
                overflow: "hidden"
            }
        }, [ _c("clazy-load", {
            staticStyle: {
                position: "absolute",
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
                overflow: "hidden"
            },
            attrs: {
                src: _vm.imageHi,
                margin: "200px 0px",
                threshold: .1,
                ratio: .1
            }
        }, [ _c("img", {
            attrs: {
                src: _vm.imageHi,
                width: "100%"
            }
        }) ]) ], 1), _vm._v(" "), _vm.prediction && _vm.prediction.text ? _c("div", {
            staticClass: "mdl-shadow--2dp",
            staticStyle: {
                position: "absolute",
                top: "0",
                right: "0",
                "background-color": "rgba(255, 255, 255, 0.9)",
                padding: "0px 5px",
                margin: "5px 0",
                "text-align": "center"
            }
        }, [ _vm._v("\n      " + _vm._s(_vm.preTexter) + "\n    ") ]) : _vm._e(), _vm._v(" "), _c("a", {
            staticStyle: {
                position: "absolute",
                top: "0",
                left: "0",
                right: "0",
                bottom: "0"
            },
            attrs: {
                href: _vm.item.url
            }
        }), _vm._v(" "), _c("span", {
            staticClass: "mdl-shadow--2dp",
            staticStyle: {
                position: "absolute",
                bottom: "0",
                display: "inline-flex",
                "background-color": "rgba(255, 255, 255, 0.9)",
                "padding-top": "5px",
                "align-items": "center",
                "justify-content": "space-between",
                left: "0",
                right: "0",
                "padding-right": "8px",
                "padding-left": "8px",
                "padding-bottom": "8px"
            }
        }, [ _c("a", {
            staticStyle: {
                color: "black",
                "text-decoration": "none"
            },
            attrs: {
                href: _vm.item.url
            }
        }, [ _vm._v("\n        " + _vm._s(_vm.item.title) + "\n      ") ]), _vm._v(" "), _c("div", {
            staticClass: "mdl-progress",
            staticStyle: {
                position: "absolute",
                top: "-4px",
                left: "0"
            },
            attrs: {
                id: "p1"
            }
        }, [ _c("div", {
            staticClass: "progressbar bar bar1",
            style: _vm.progress
        }), _vm._v(" "), _vm.hasTotalEp ? _c("div", {
            staticClass: "bufferbar bar bar2",
            staticStyle: {
                width: "calc(100% + 1px)"
            }
        }) : _vm._e(), _vm._v(" "), _vm.prediction && _vm.prediction.tagEpisode ? _c("div", {
            staticClass: "predictionbar bar kal-ep-pre",
            style: _vm.predictionBar
        }) : _vm._e(), _vm._v(" "), _c("div", {
            staticClass: "auxbar bar bar3",
            staticStyle: {
                width: "0%"
            }
        }) ]), _vm._v(" "), _c("div", {
            staticClass: "data progress mdl-chip mdl-chip--contact mdl-color--indigo-100",
            staticStyle: {
                float: "right",
                "line-height": "20px",
                height: "20px",
                "padding-right": "4px",
                "margin-left": "5px"
            }
        }, [ _c("div", {
            staticClass: "link mdl-chip__contact mdl-color--primary mdl-color-text--white",
            staticStyle: {
                "line-height": "20px",
                height: "20px",
                "margin-right": "0"
            },
            attrs: {
                title: "[" + _vm.item.watchedEp + "/" + _vm.item.totalEp + "]"
            }
        }, [ _vm._v(_vm._s(_vm.item.watchedEp)) ]), _vm._v(" "), _vm.streamUrl ? _c("a", {
            staticClass: "mal-sync-stream",
            staticStyle: {
                margin: "0 5px"
            },
            attrs: {
                title: _vm.streamUrl.split("/")[2],
                target: "_blank",
                href: _vm.streamUrl
            }
        }, [ _c("img", {
            attrs: {
                src: _vm.favicon(_vm.streamUrl.split("/")[2])
            }
        }) ]) : _vm._e(), _vm._v(" "), _vm.continueUrl ? _c("a", {
            staticClass: "nextStream",
            staticStyle: {
                margin: "0 5px 0 0",
                color: "#BABABA"
            },
            attrs: {
                title: _vm.lang("overview_Continue_" + _vm.item.type),
                target: "_blank",
                href: _vm.continueUrl
            }
        }, [ _c("img", {
            attrs: {
                src: _vm.assetUrl("double-arrow-16px.png"),
                width: "16",
                height: "16"
            }
        }) ]) : _vm._e(), _vm._v(" "), _vm.resumeUrl ? _c("a", {
            staticClass: "resumeStream",
            staticStyle: {
                margin: "0 5px 0 0",
                color: "#BABABA"
            },
            attrs: {
                title: _vm.lang("overview_Resume_Episode_" + _vm.item.type),
                target: "_blank",
                href: _vm.resumeUrl
            }
        }, [ _c("img", {
            attrs: {
                src: _vm.assetUrl("arrow-16px.png"),
                width: "16",
                height: "16"
            }
        }) ]) : _vm._e() ]) ]) ]) ]);
    };
    render._withStripped = !0;
    var minimalApp_bookmarksItemvue_type_script_lang_js_ = __webpack_require__(20).a, componentNormalizer = __webpack_require__(4), component = Object(componentNormalizer.a)(minimalApp_bookmarksItemvue_type_script_lang_js_, render, [], !1, null, null, null);
    component.options.__file = "src/minimal/minimalApp/bookmarksItem.vue";
    __webpack_exports__.a = component.exports;
}, function(module, exports) {
    var g;
    g = function() {
        return this;
    }();
    try {
        g = g || new Function("return this")();
    } catch (e) {
        "object" == typeof window && (g = window);
    }
    module.exports = g;
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(global, setImmediate) {
        var emptyObject = Object.freeze({});
        function isUndef(v) {
            return null == v;
        }
        function isDef(v) {
            return null != v;
        }
        function isTrue(v) {
            return !0 === v;
        }
        function isPrimitive(value) {
            return "string" == typeof value || "number" == typeof value || "symbol" == typeof value || "boolean" == typeof value;
        }
        function isObject(obj) {
            return null !== obj && "object" == typeof obj;
        }
        var _toString = Object.prototype.toString;
        function isPlainObject(obj) {
            return "[object Object]" === _toString.call(obj);
        }
        function isRegExp(v) {
            return "[object RegExp]" === _toString.call(v);
        }
        function isValidArrayIndex(val) {
            var n = parseFloat(String(val));
            return n >= 0 && Math.floor(n) === n && isFinite(val);
        }
        function isPromise(val) {
            return isDef(val) && "function" == typeof val.then && "function" == typeof val.catch;
        }
        function toString(val) {
            return null == val ? "" : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
        }
        function toNumber(val) {
            var n = parseFloat(val);
            return isNaN(n) ? val : n;
        }
        function makeMap(str, expectsLowerCase) {
            for (var map = Object.create(null), list = str.split(","), i = 0; i < list.length; i++) map[list[i]] = !0;
            return expectsLowerCase ? function(val) {
                return map[val.toLowerCase()];
            } : function(val) {
                return map[val];
            };
        }
        var isBuiltInTag = makeMap("slot,component", !0), isReservedAttribute = makeMap("key,ref,slot,slot-scope,is");
        function remove(arr, item) {
            if (arr.length) {
                var index = arr.indexOf(item);
                if (index > -1) return arr.splice(index, 1);
            }
        }
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        function hasOwn(obj, key) {
            return hasOwnProperty.call(obj, key);
        }
        function cached(fn) {
            var cache = Object.create(null);
            return function(str) {
                return cache[str] || (cache[str] = fn(str));
            };
        }
        var camelizeRE = /-(\w)/g, camelize = cached(function(str) {
            return str.replace(camelizeRE, function(_, c) {
                return c ? c.toUpperCase() : "";
            });
        }), capitalize = cached(function(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }), hyphenateRE = /\B([A-Z])/g, hyphenate = cached(function(str) {
            return str.replace(hyphenateRE, "-$1").toLowerCase();
        });
        var bind = Function.prototype.bind ? function(fn, ctx) {
            return fn.bind(ctx);
        } : function(fn, ctx) {
            function boundFn(a) {
                var l = arguments.length;
                return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
            }
            return boundFn._length = fn.length, boundFn;
        };
        function toArray(list, start) {
            start = start || 0;
            for (var i = list.length - start, ret = new Array(i); i--; ) ret[i] = list[i + start];
            return ret;
        }
        function extend(to, _from) {
            for (var key in _from) to[key] = _from[key];
            return to;
        }
        function toObject(arr) {
            for (var res = {}, i = 0; i < arr.length; i++) arr[i] && extend(res, arr[i]);
            return res;
        }
        function noop(a, b, c) {}
        var no = function(a, b, c) {
            return !1;
        }, identity = function(_) {
            return _;
        };
        function looseEqual(a, b) {
            if (a === b) return !0;
            var isObjectA = isObject(a), isObjectB = isObject(b);
            if (!isObjectA || !isObjectB) return !isObjectA && !isObjectB && String(a) === String(b);
            try {
                var isArrayA = Array.isArray(a), isArrayB = Array.isArray(b);
                if (isArrayA && isArrayB) return a.length === b.length && a.every(function(e, i) {
                    return looseEqual(e, b[i]);
                });
                if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
                if (isArrayA || isArrayB) return !1;
                var keysA = Object.keys(a), keysB = Object.keys(b);
                return keysA.length === keysB.length && keysA.every(function(key) {
                    return looseEqual(a[key], b[key]);
                });
            } catch (e) {
                return !1;
            }
        }
        function looseIndexOf(arr, val) {
            for (var i = 0; i < arr.length; i++) if (looseEqual(arr[i], val)) return i;
            return -1;
        }
        function once(fn) {
            var called = !1;
            return function() {
                called || (called = !0, fn.apply(this, arguments));
            };
        }
        var SSR_ATTR = "data-server-rendered", ASSET_TYPES = [ "component", "directive", "filter" ], LIFECYCLE_HOOKS = [ "beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "beforeDestroy", "destroyed", "activated", "deactivated", "errorCaptured", "serverPrefetch" ], config = {
            optionMergeStrategies: Object.create(null),
            silent: !1,
            productionTip: !1,
            devtools: !1,
            performance: !1,
            errorHandler: null,
            warnHandler: null,
            ignoredElements: [],
            keyCodes: Object.create(null),
            isReservedTag: no,
            isReservedAttr: no,
            isUnknownElement: no,
            getTagNamespace: noop,
            parsePlatformTagName: identity,
            mustUseProp: no,
            async: !0,
            _lifecycleHooks: LIFECYCLE_HOOKS
        }, unicodeLetters = "a-zA-Z·À-ÖØ-öø-ͽͿ-῿‌-‍‿-⁀⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�";
        function def(obj, key, val, enumerable) {
            Object.defineProperty(obj, key, {
                value: val,
                enumerable: !!enumerable,
                writable: !0,
                configurable: !0
            });
        }
        var bailRE = new RegExp("[^" + unicodeLetters + ".$_\\d]");
        var _isServer, hasProto = "__proto__" in {}, inBrowser = "undefined" != typeof window, inWeex = "undefined" != typeof WXEnvironment && !!WXEnvironment.platform, weexPlatform = inWeex && WXEnvironment.platform.toLowerCase(), UA = inBrowser && window.navigator.userAgent.toLowerCase(), isIE = UA && /msie|trident/.test(UA), isIE9 = UA && UA.indexOf("msie 9.0") > 0, isEdge = UA && UA.indexOf("edge/") > 0, isIOS = (UA && UA.indexOf("android"), 
        UA && /iphone|ipad|ipod|ios/.test(UA) || "ios" === weexPlatform), isFF = (UA && /chrome\/\d+/.test(UA), 
        UA && /phantomjs/.test(UA), UA && UA.match(/firefox\/(\d+)/)), nativeWatch = {}.watch, supportsPassive = !1;
        if (inBrowser) try {
            var opts = {};
            Object.defineProperty(opts, "passive", {
                get: function() {
                    supportsPassive = !0;
                }
            }), window.addEventListener("test-passive", null, opts);
        } catch (e) {}
        var isServerRendering = function() {
            return void 0 === _isServer && (_isServer = !inBrowser && !inWeex && void 0 !== global && (global.process && "server" === global.process.env.VUE_ENV)), 
            _isServer;
        }, devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
        function isNative(Ctor) {
            return "function" == typeof Ctor && /native code/.test(Ctor.toString());
        }
        var _Set, hasSymbol = "undefined" != typeof Symbol && isNative(Symbol) && "undefined" != typeof Reflect && isNative(Reflect.ownKeys);
        _Set = "undefined" != typeof Set && isNative(Set) ? Set : function() {
            function Set() {
                this.set = Object.create(null);
            }
            return Set.prototype.has = function(key) {
                return !0 === this.set[key];
            }, Set.prototype.add = function(key) {
                this.set[key] = !0;
            }, Set.prototype.clear = function() {
                this.set = Object.create(null);
            }, Set;
        }();
        var warn = noop, uid = 0, Dep = function() {
            this.id = uid++, this.subs = [];
        };
        Dep.prototype.addSub = function(sub) {
            this.subs.push(sub);
        }, Dep.prototype.removeSub = function(sub) {
            remove(this.subs, sub);
        }, Dep.prototype.depend = function() {
            Dep.target && Dep.target.addDep(this);
        }, Dep.prototype.notify = function() {
            var subs = this.subs.slice();
            for (var i = 0, l = subs.length; i < l; i++) subs[i].update();
        }, Dep.target = null;
        var targetStack = [];
        function pushTarget(target) {
            targetStack.push(target), Dep.target = target;
        }
        function popTarget() {
            targetStack.pop(), Dep.target = targetStack[targetStack.length - 1];
        }
        var VNode = function(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
            this.tag = tag, this.data = data, this.children = children, this.text = text, this.elm = elm, 
            this.ns = void 0, this.context = context, this.fnContext = void 0, this.fnOptions = void 0, 
            this.fnScopeId = void 0, this.key = data && data.key, this.componentOptions = componentOptions, 
            this.componentInstance = void 0, this.parent = void 0, this.raw = !1, this.isStatic = !1, 
            this.isRootInsert = !0, this.isComment = !1, this.isCloned = !1, this.isOnce = !1, 
            this.asyncFactory = asyncFactory, this.asyncMeta = void 0, this.isAsyncPlaceholder = !1;
        }, prototypeAccessors = {
            child: {
                configurable: !0
            }
        };
        prototypeAccessors.child.get = function() {
            return this.componentInstance;
        }, Object.defineProperties(VNode.prototype, prototypeAccessors);
        var createEmptyVNode = function(text) {
            void 0 === text && (text = "");
            var node = new VNode();
            return node.text = text, node.isComment = !0, node;
        };
        function createTextVNode(val) {
            return new VNode(void 0, void 0, void 0, String(val));
        }
        function cloneVNode(vnode) {
            var cloned = new VNode(vnode.tag, vnode.data, vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
            return cloned.ns = vnode.ns, cloned.isStatic = vnode.isStatic, cloned.key = vnode.key, 
            cloned.isComment = vnode.isComment, cloned.fnContext = vnode.fnContext, cloned.fnOptions = vnode.fnOptions, 
            cloned.fnScopeId = vnode.fnScopeId, cloned.asyncMeta = vnode.asyncMeta, cloned.isCloned = !0, 
            cloned;
        }
        var arrayProto = Array.prototype, arrayMethods = Object.create(arrayProto);
        [ "push", "pop", "shift", "unshift", "splice", "sort", "reverse" ].forEach(function(method) {
            var original = arrayProto[method];
            def(arrayMethods, method, function() {
                for (var args = [], len = arguments.length; len--; ) args[len] = arguments[len];
                var inserted, result = original.apply(this, args), ob = this.__ob__;
                switch (method) {
                  case "push":
                  case "unshift":
                    inserted = args;
                    break;

                  case "splice":
                    inserted = args.slice(2);
                }
                return inserted && ob.observeArray(inserted), ob.dep.notify(), result;
            });
        });
        var arrayKeys = Object.getOwnPropertyNames(arrayMethods), shouldObserve = !0;
        function toggleObserving(value) {
            shouldObserve = value;
        }
        var Observer = function(value) {
            var src;
            this.value = value, this.dep = new Dep(), this.vmCount = 0, def(value, "__ob__", this), 
            Array.isArray(value) ? (hasProto ? (src = arrayMethods, value.__proto__ = src) : function(target, src, keys) {
                for (var i = 0, l = keys.length; i < l; i++) {
                    var key = keys[i];
                    def(target, key, src[key]);
                }
            }(value, arrayMethods, arrayKeys), this.observeArray(value)) : this.walk(value);
        };
        function observe(value, asRootData) {
            var ob;
            if (isObject(value) && !(value instanceof VNode)) return hasOwn(value, "__ob__") && value.__ob__ instanceof Observer ? ob = value.__ob__ : shouldObserve && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue && (ob = new Observer(value)), 
            asRootData && ob && ob.vmCount++, ob;
        }
        function defineReactive$$1(obj, key, val, customSetter, shallow) {
            var dep = new Dep(), property = Object.getOwnPropertyDescriptor(obj, key);
            if (!property || !1 !== property.configurable) {
                var getter = property && property.get, setter = property && property.set;
                getter && !setter || 2 !== arguments.length || (val = obj[key]);
                var childOb = !shallow && observe(val);
                Object.defineProperty(obj, key, {
                    enumerable: !0,
                    configurable: !0,
                    get: function() {
                        var value = getter ? getter.call(obj) : val;
                        return Dep.target && (dep.depend(), childOb && (childOb.dep.depend(), Array.isArray(value) && function dependArray(value) {
                            for (var e = void 0, i = 0, l = value.length; i < l; i++) (e = value[i]) && e.__ob__ && e.__ob__.dep.depend(), 
                            Array.isArray(e) && dependArray(e);
                        }(value))), value;
                    },
                    set: function(newVal) {
                        var value = getter ? getter.call(obj) : val;
                        newVal === value || newVal != newVal && value != value || getter && !setter || (setter ? setter.call(obj, newVal) : val = newVal, 
                        childOb = !shallow && observe(newVal), dep.notify());
                    }
                });
            }
        }
        function set(target, key, val) {
            if (Array.isArray(target) && isValidArrayIndex(key)) return target.length = Math.max(target.length, key), 
            target.splice(key, 1, val), val;
            if (key in target && !(key in Object.prototype)) return target[key] = val, val;
            var ob = target.__ob__;
            return target._isVue || ob && ob.vmCount ? val : ob ? (defineReactive$$1(ob.value, key, val), 
            ob.dep.notify(), val) : (target[key] = val, val);
        }
        function del(target, key) {
            if (Array.isArray(target) && isValidArrayIndex(key)) target.splice(key, 1); else {
                var ob = target.__ob__;
                target._isVue || ob && ob.vmCount || hasOwn(target, key) && (delete target[key], 
                ob && ob.dep.notify());
            }
        }
        Observer.prototype.walk = function(obj) {
            for (var keys = Object.keys(obj), i = 0; i < keys.length; i++) defineReactive$$1(obj, keys[i]);
        }, Observer.prototype.observeArray = function(items) {
            for (var i = 0, l = items.length; i < l; i++) observe(items[i]);
        };
        var strats = config.optionMergeStrategies;
        function mergeData(to, from) {
            if (!from) return to;
            for (var key, toVal, fromVal, keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from), i = 0; i < keys.length; i++) "__ob__" !== (key = keys[i]) && (toVal = to[key], 
            fromVal = from[key], hasOwn(to, key) ? toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal) && mergeData(toVal, fromVal) : set(to, key, fromVal));
            return to;
        }
        function mergeDataOrFn(parentVal, childVal, vm) {
            return vm ? function() {
                var instanceData = "function" == typeof childVal ? childVal.call(vm, vm) : childVal, defaultData = "function" == typeof parentVal ? parentVal.call(vm, vm) : parentVal;
                return instanceData ? mergeData(instanceData, defaultData) : defaultData;
            } : childVal ? parentVal ? function() {
                return mergeData("function" == typeof childVal ? childVal.call(this, this) : childVal, "function" == typeof parentVal ? parentVal.call(this, this) : parentVal);
            } : childVal : parentVal;
        }
        function mergeHook(parentVal, childVal) {
            var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [ childVal ] : parentVal;
            return res ? function(hooks) {
                for (var res = [], i = 0; i < hooks.length; i++) -1 === res.indexOf(hooks[i]) && res.push(hooks[i]);
                return res;
            }(res) : res;
        }
        function mergeAssets(parentVal, childVal, vm, key) {
            var res = Object.create(parentVal || null);
            return childVal ? extend(res, childVal) : res;
        }
        strats.data = function(parentVal, childVal, vm) {
            return vm ? mergeDataOrFn(parentVal, childVal, vm) : childVal && "function" != typeof childVal ? parentVal : mergeDataOrFn(parentVal, childVal);
        }, LIFECYCLE_HOOKS.forEach(function(hook) {
            strats[hook] = mergeHook;
        }), ASSET_TYPES.forEach(function(type) {
            strats[type + "s"] = mergeAssets;
        }), strats.watch = function(parentVal, childVal, vm, key) {
            if (parentVal === nativeWatch && (parentVal = void 0), childVal === nativeWatch && (childVal = void 0), 
            !childVal) return Object.create(parentVal || null);
            if (!parentVal) return childVal;
            var ret = {};
            for (var key$1 in extend(ret, parentVal), childVal) {
                var parent = ret[key$1], child = childVal[key$1];
                parent && !Array.isArray(parent) && (parent = [ parent ]), ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [ child ];
            }
            return ret;
        }, strats.props = strats.methods = strats.inject = strats.computed = function(parentVal, childVal, vm, key) {
            if (!parentVal) return childVal;
            var ret = Object.create(null);
            return extend(ret, parentVal), childVal && extend(ret, childVal), ret;
        }, strats.provide = mergeDataOrFn;
        var defaultStrat = function(parentVal, childVal) {
            return void 0 === childVal ? parentVal : childVal;
        };
        function mergeOptions(parent, child, vm) {
            if ("function" == typeof child && (child = child.options), function(options, vm) {
                var props = options.props;
                if (props) {
                    var i, val, res = {};
                    if (Array.isArray(props)) for (i = props.length; i--; ) "string" == typeof (val = props[i]) && (res[camelize(val)] = {
                        type: null
                    }); else if (isPlainObject(props)) for (var key in props) val = props[key], res[camelize(key)] = isPlainObject(val) ? val : {
                        type: val
                    };
                    options.props = res;
                }
            }(child), function(options, vm) {
                var inject = options.inject;
                if (inject) {
                    var normalized = options.inject = {};
                    if (Array.isArray(inject)) for (var i = 0; i < inject.length; i++) normalized[inject[i]] = {
                        from: inject[i]
                    }; else if (isPlainObject(inject)) for (var key in inject) {
                        var val = inject[key];
                        normalized[key] = isPlainObject(val) ? extend({
                            from: key
                        }, val) : {
                            from: val
                        };
                    }
                }
            }(child), function(options) {
                var dirs = options.directives;
                if (dirs) for (var key in dirs) {
                    var def$$1 = dirs[key];
                    "function" == typeof def$$1 && (dirs[key] = {
                        bind: def$$1,
                        update: def$$1
                    });
                }
            }(child), !child._base && (child.extends && (parent = mergeOptions(parent, child.extends, vm)), 
            child.mixins)) for (var i = 0, l = child.mixins.length; i < l; i++) parent = mergeOptions(parent, child.mixins[i], vm);
            var key, options = {};
            for (key in parent) mergeField(key);
            for (key in child) hasOwn(parent, key) || mergeField(key);
            function mergeField(key) {
                var strat = strats[key] || defaultStrat;
                options[key] = strat(parent[key], child[key], vm, key);
            }
            return options;
        }
        function resolveAsset(options, type, id, warnMissing) {
            if ("string" == typeof id) {
                var assets = options[type];
                if (hasOwn(assets, id)) return assets[id];
                var camelizedId = camelize(id);
                if (hasOwn(assets, camelizedId)) return assets[camelizedId];
                var PascalCaseId = capitalize(camelizedId);
                return hasOwn(assets, PascalCaseId) ? assets[PascalCaseId] : assets[id] || assets[camelizedId] || assets[PascalCaseId];
            }
        }
        function validateProp(key, propOptions, propsData, vm) {
            var prop = propOptions[key], absent = !hasOwn(propsData, key), value = propsData[key], booleanIndex = getTypeIndex(Boolean, prop.type);
            if (booleanIndex > -1) if (absent && !hasOwn(prop, "default")) value = !1; else if ("" === value || value === hyphenate(key)) {
                var stringIndex = getTypeIndex(String, prop.type);
                (stringIndex < 0 || booleanIndex < stringIndex) && (value = !0);
            }
            if (void 0 === value) {
                value = function(vm, prop, key) {
                    if (!hasOwn(prop, "default")) return;
                    var def = prop.default;
                    0;
                    if (vm && vm.$options.propsData && void 0 === vm.$options.propsData[key] && void 0 !== vm._props[key]) return vm._props[key];
                    return "function" == typeof def && "Function" !== getType(prop.type) ? def.call(vm) : def;
                }(vm, prop, key);
                var prevShouldObserve = shouldObserve;
                toggleObserving(!0), observe(value), toggleObserving(prevShouldObserve);
            }
            return value;
        }
        function getType(fn) {
            var match = fn && fn.toString().match(/^\s*function (\w+)/);
            return match ? match[1] : "";
        }
        function isSameType(a, b) {
            return getType(a) === getType(b);
        }
        function getTypeIndex(type, expectedTypes) {
            if (!Array.isArray(expectedTypes)) return isSameType(expectedTypes, type) ? 0 : -1;
            for (var i = 0, len = expectedTypes.length; i < len; i++) if (isSameType(expectedTypes[i], type)) return i;
            return -1;
        }
        function handleError(err, vm, info) {
            if (vm) for (var cur = vm; cur = cur.$parent; ) {
                var hooks = cur.$options.errorCaptured;
                if (hooks) for (var i = 0; i < hooks.length; i++) try {
                    if (!1 === hooks[i].call(cur, err, vm, info)) return;
                } catch (e) {
                    globalHandleError(e, cur, "errorCaptured hook");
                }
            }
            globalHandleError(err, vm, info);
        }
        function invokeWithErrorHandling(handler, context, args, vm, info) {
            var res;
            try {
                (res = args ? handler.apply(context, args) : handler.call(context)) && !res._isVue && isPromise(res) && res.catch(function(e) {
                    return handleError(e, vm, info + " (Promise/async)");
                });
            } catch (e) {
                handleError(e, vm, info);
            }
            return res;
        }
        function globalHandleError(err, vm, info) {
            if (config.errorHandler) try {
                return config.errorHandler.call(null, err, vm, info);
            } catch (e) {
                e !== err && logError(e, null, "config.errorHandler");
            }
            logError(err, vm, info);
        }
        function logError(err, vm, info) {
            if (!inBrowser && !inWeex || "undefined" == typeof console) throw err;
            console.error(err);
        }
        var timerFunc, isUsingMicroTask = !1, callbacks = [], pending = !1;
        function flushCallbacks() {
            pending = !1;
            var copies = callbacks.slice(0);
            callbacks.length = 0;
            for (var i = 0; i < copies.length; i++) copies[i]();
        }
        if ("undefined" != typeof Promise && isNative(Promise)) {
            var p = Promise.resolve();
            timerFunc = function() {
                p.then(flushCallbacks), isIOS && setTimeout(noop);
            }, isUsingMicroTask = !0;
        } else if (isIE || "undefined" == typeof MutationObserver || !isNative(MutationObserver) && "[object MutationObserverConstructor]" !== MutationObserver.toString()) timerFunc = void 0 !== setImmediate && isNative(setImmediate) ? function() {
            setImmediate(flushCallbacks);
        } : function() {
            setTimeout(flushCallbacks, 0);
        }; else {
            var counter = 1, observer = new MutationObserver(flushCallbacks), textNode = document.createTextNode(String(counter));
            observer.observe(textNode, {
                characterData: !0
            }), timerFunc = function() {
                counter = (counter + 1) % 2, textNode.data = String(counter);
            }, isUsingMicroTask = !0;
        }
        function nextTick(cb, ctx) {
            var _resolve;
            if (callbacks.push(function() {
                if (cb) try {
                    cb.call(ctx);
                } catch (e) {
                    handleError(e, ctx, "nextTick");
                } else _resolve && _resolve(ctx);
            }), pending || (pending = !0, timerFunc()), !cb && "undefined" != typeof Promise) return new Promise(function(resolve) {
                _resolve = resolve;
            });
        }
        var seenObjects = new _Set();
        function traverse(val) {
            !function _traverse(val, seen) {
                var i, keys;
                var isA = Array.isArray(val);
                if (!isA && !isObject(val) || Object.isFrozen(val) || val instanceof VNode) return;
                if (val.__ob__) {
                    var depId = val.__ob__.dep.id;
                    if (seen.has(depId)) return;
                    seen.add(depId);
                }
                if (isA) for (i = val.length; i--; ) _traverse(val[i], seen); else for (keys = Object.keys(val), 
                i = keys.length; i--; ) _traverse(val[keys[i]], seen);
            }(val, seenObjects), seenObjects.clear();
        }
        var normalizeEvent = cached(function(name) {
            var passive = "&" === name.charAt(0), once$$1 = "~" === (name = passive ? name.slice(1) : name).charAt(0), capture = "!" === (name = once$$1 ? name.slice(1) : name).charAt(0);
            return {
                name: name = capture ? name.slice(1) : name,
                once: once$$1,
                capture: capture,
                passive: passive
            };
        });
        function createFnInvoker(fns, vm) {
            function invoker() {
                var arguments$1 = arguments, fns = invoker.fns;
                if (!Array.isArray(fns)) return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler");
                for (var cloned = fns.slice(), i = 0; i < cloned.length; i++) invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
            }
            return invoker.fns = fns, invoker;
        }
        function updateListeners(on, oldOn, add, remove$$1, createOnceHandler, vm) {
            var name, cur, old, event;
            for (name in on) cur = on[name], old = oldOn[name], event = normalizeEvent(name), 
            isUndef(cur) || (isUndef(old) ? (isUndef(cur.fns) && (cur = on[name] = createFnInvoker(cur, vm)), 
            isTrue(event.once) && (cur = on[name] = createOnceHandler(event.name, cur, event.capture)), 
            add(event.name, cur, event.capture, event.passive, event.params)) : cur !== old && (old.fns = cur, 
            on[name] = old));
            for (name in oldOn) isUndef(on[name]) && remove$$1((event = normalizeEvent(name)).name, oldOn[name], event.capture);
        }
        function mergeVNodeHook(def, hookKey, hook) {
            var invoker;
            def instanceof VNode && (def = def.data.hook || (def.data.hook = {}));
            var oldHook = def[hookKey];
            function wrappedHook() {
                hook.apply(this, arguments), remove(invoker.fns, wrappedHook);
            }
            isUndef(oldHook) ? invoker = createFnInvoker([ wrappedHook ]) : isDef(oldHook.fns) && isTrue(oldHook.merged) ? (invoker = oldHook).fns.push(wrappedHook) : invoker = createFnInvoker([ oldHook, wrappedHook ]), 
            invoker.merged = !0, def[hookKey] = invoker;
        }
        function checkProp(res, hash, key, altKey, preserve) {
            if (isDef(hash)) {
                if (hasOwn(hash, key)) return res[key] = hash[key], preserve || delete hash[key], 
                !0;
                if (hasOwn(hash, altKey)) return res[key] = hash[altKey], preserve || delete hash[altKey], 
                !0;
            }
            return !1;
        }
        function normalizeChildren(children) {
            return isPrimitive(children) ? [ createTextVNode(children) ] : Array.isArray(children) ? function normalizeArrayChildren(children, nestedIndex) {
                var res = [];
                var i, c, lastIndex, last;
                for (i = 0; i < children.length; i++) isUndef(c = children[i]) || "boolean" == typeof c || (lastIndex = res.length - 1, 
                last = res[lastIndex], Array.isArray(c) ? c.length > 0 && (isTextNode((c = normalizeArrayChildren(c, (nestedIndex || "") + "_" + i))[0]) && isTextNode(last) && (res[lastIndex] = createTextVNode(last.text + c[0].text), 
                c.shift()), res.push.apply(res, c)) : isPrimitive(c) ? isTextNode(last) ? res[lastIndex] = createTextVNode(last.text + c) : "" !== c && res.push(createTextVNode(c)) : isTextNode(c) && isTextNode(last) ? res[lastIndex] = createTextVNode(last.text + c.text) : (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex) && (c.key = "__vlist" + nestedIndex + "_" + i + "__"), 
                res.push(c)));
                return res;
            }(children) : void 0;
        }
        function isTextNode(node) {
            return isDef(node) && isDef(node.text) && !1 === node.isComment;
        }
        function resolveInject(inject, vm) {
            if (inject) {
                for (var result = Object.create(null), keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject), i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    if ("__ob__" !== key) {
                        for (var provideKey = inject[key].from, source = vm; source; ) {
                            if (source._provided && hasOwn(source._provided, provideKey)) {
                                result[key] = source._provided[provideKey];
                                break;
                            }
                            source = source.$parent;
                        }
                        if (!source) if ("default" in inject[key]) {
                            var provideDefault = inject[key].default;
                            result[key] = "function" == typeof provideDefault ? provideDefault.call(vm) : provideDefault;
                        } else 0;
                    }
                }
                return result;
            }
        }
        function resolveSlots(children, context) {
            if (!children || !children.length) return {};
            for (var slots = {}, i = 0, l = children.length; i < l; i++) {
                var child = children[i], data = child.data;
                if (data && data.attrs && data.attrs.slot && delete data.attrs.slot, child.context !== context && child.fnContext !== context || !data || null == data.slot) (slots.default || (slots.default = [])).push(child); else {
                    var name = data.slot, slot = slots[name] || (slots[name] = []);
                    "template" === child.tag ? slot.push.apply(slot, child.children || []) : slot.push(child);
                }
            }
            for (var name$1 in slots) slots[name$1].every(isWhitespace) && delete slots[name$1];
            return slots;
        }
        function isWhitespace(node) {
            return node.isComment && !node.asyncFactory || " " === node.text;
        }
        function normalizeScopedSlots(slots, normalSlots, prevSlots) {
            var res;
            if (slots) {
                if (slots._normalized) return slots._normalized;
                if (slots.$stable && prevSlots && prevSlots !== emptyObject && 0 === Object.keys(normalSlots).length) return prevSlots;
                for (var key in res = {}, slots) slots[key] && "$" !== key[0] && (res[key] = normalizeScopedSlot(normalSlots, key, slots[key]));
            } else res = {};
            for (var key$1 in normalSlots) key$1 in res || (res[key$1] = proxyNormalSlot(normalSlots, key$1));
            return slots && Object.isExtensible(slots) && (slots._normalized = res), def(res, "$stable", !slots || !!slots.$stable), 
            res;
        }
        function normalizeScopedSlot(normalSlots, key, fn) {
            var normalized = function() {
                var res = arguments.length ? fn.apply(null, arguments) : fn({});
                return (res = res && "object" == typeof res && !Array.isArray(res) ? [ res ] : normalizeChildren(res)) && 0 === res.length ? void 0 : res;
            };
            return fn.proxy && Object.defineProperty(normalSlots, key, {
                get: normalized,
                enumerable: !0,
                configurable: !0
            }), normalized;
        }
        function proxyNormalSlot(slots, key) {
            return function() {
                return slots[key];
            };
        }
        function renderList(val, render) {
            var ret, i, l, keys, key;
            if (Array.isArray(val) || "string" == typeof val) for (ret = new Array(val.length), 
            i = 0, l = val.length; i < l; i++) ret[i] = render(val[i], i); else if ("number" == typeof val) for (ret = new Array(val), 
            i = 0; i < val; i++) ret[i] = render(i + 1, i); else if (isObject(val)) if (hasSymbol && val[Symbol.iterator]) {
                ret = [];
                for (var iterator = val[Symbol.iterator](), result = iterator.next(); !result.done; ) ret.push(render(result.value, ret.length)), 
                result = iterator.next();
            } else for (keys = Object.keys(val), ret = new Array(keys.length), i = 0, l = keys.length; i < l; i++) key = keys[i], 
            ret[i] = render(val[key], key, i);
            return isDef(ret) || (ret = []), ret._isVList = !0, ret;
        }
        function renderSlot(name, fallback, props, bindObject) {
            var nodes, scopedSlotFn = this.$scopedSlots[name];
            scopedSlotFn ? (props = props || {}, bindObject && (props = extend(extend({}, bindObject), props)), 
            nodes = scopedSlotFn(props) || fallback) : nodes = this.$slots[name] || fallback;
            var target = props && props.slot;
            return target ? this.$createElement("template", {
                slot: target
            }, nodes) : nodes;
        }
        function resolveFilter(id) {
            return resolveAsset(this.$options, "filters", id) || identity;
        }
        function isKeyNotMatch(expect, actual) {
            return Array.isArray(expect) ? -1 === expect.indexOf(actual) : expect !== actual;
        }
        function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
            var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
            return builtInKeyName && eventKeyName && !config.keyCodes[key] ? isKeyNotMatch(builtInKeyName, eventKeyName) : mappedKeyCode ? isKeyNotMatch(mappedKeyCode, eventKeyCode) : eventKeyName ? hyphenate(eventKeyName) !== key : void 0;
        }
        function bindObjectProps(data, tag, value, asProp, isSync) {
            if (value) if (isObject(value)) {
                var hash;
                Array.isArray(value) && (value = toObject(value));
                var loop = function(key) {
                    if ("class" === key || "style" === key || isReservedAttribute(key)) hash = data; else {
                        var type = data.attrs && data.attrs.type;
                        hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
                    }
                    var camelizedKey = camelize(key);
                    key in hash || camelizedKey in hash || (hash[key] = value[key], isSync && ((data.on || (data.on = {}))["update:" + camelizedKey] = function($event) {
                        value[key] = $event;
                    }));
                };
                for (var key in value) loop(key);
            } else ;
            return data;
        }
        function renderStatic(index, isInFor) {
            var cached = this._staticTrees || (this._staticTrees = []), tree = cached[index];
            return tree && !isInFor ? tree : (markStatic(tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, null, this), "__static__" + index, !1), 
            tree);
        }
        function markOnce(tree, index, key) {
            return markStatic(tree, "__once__" + index + (key ? "_" + key : ""), !0), tree;
        }
        function markStatic(tree, key, isOnce) {
            if (Array.isArray(tree)) for (var i = 0; i < tree.length; i++) tree[i] && "string" != typeof tree[i] && markStaticNode(tree[i], key + "_" + i, isOnce); else markStaticNode(tree, key, isOnce);
        }
        function markStaticNode(node, key, isOnce) {
            node.isStatic = !0, node.key = key, node.isOnce = isOnce;
        }
        function bindObjectListeners(data, value) {
            if (value) if (isPlainObject(value)) {
                var on = data.on = data.on ? extend({}, data.on) : {};
                for (var key in value) {
                    var existing = on[key], ours = value[key];
                    on[key] = existing ? [].concat(existing, ours) : ours;
                }
            } else ;
            return data;
        }
        function resolveScopedSlots(fns, hasDynamicKeys, res) {
            res = res || {
                $stable: !hasDynamicKeys
            };
            for (var i = 0; i < fns.length; i++) {
                var slot = fns[i];
                Array.isArray(slot) ? resolveScopedSlots(slot, hasDynamicKeys, res) : slot && (slot.proxy && (slot.fn.proxy = !0), 
                res[slot.key] = slot.fn);
            }
            return res;
        }
        function bindDynamicKeys(baseObj, values) {
            for (var i = 0; i < values.length; i += 2) {
                var key = values[i];
                "string" == typeof key && key && (baseObj[values[i]] = values[i + 1]);
            }
            return baseObj;
        }
        function prependModifier(value, symbol) {
            return "string" == typeof value ? symbol + value : value;
        }
        function installRenderHelpers(target) {
            target._o = markOnce, target._n = toNumber, target._s = toString, target._l = renderList, 
            target._t = renderSlot, target._q = looseEqual, target._i = looseIndexOf, target._m = renderStatic, 
            target._f = resolveFilter, target._k = checkKeyCodes, target._b = bindObjectProps, 
            target._v = createTextVNode, target._e = createEmptyVNode, target._u = resolveScopedSlots, 
            target._g = bindObjectListeners, target._d = bindDynamicKeys, target._p = prependModifier;
        }
        function FunctionalRenderContext(data, props, children, parent, Ctor) {
            var contextVm, this$1 = this, options = Ctor.options;
            hasOwn(parent, "_uid") ? (contextVm = Object.create(parent))._original = parent : (contextVm = parent, 
            parent = parent._original);
            var isCompiled = isTrue(options._compiled), needNormalization = !isCompiled;
            this.data = data, this.props = props, this.children = children, this.parent = parent, 
            this.listeners = data.on || emptyObject, this.injections = resolveInject(options.inject, parent), 
            this.slots = function() {
                return this$1.$slots || normalizeScopedSlots(data.scopedSlots, this$1.$slots = resolveSlots(children, parent)), 
                this$1.$slots;
            }, Object.defineProperty(this, "scopedSlots", {
                enumerable: !0,
                get: function() {
                    return normalizeScopedSlots(data.scopedSlots, this.slots());
                }
            }), isCompiled && (this.$options = options, this.$slots = this.slots(), this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots)), 
            options._scopeId ? this._c = function(a, b, c, d) {
                var vnode = createElement(contextVm, a, b, c, d, needNormalization);
                return vnode && !Array.isArray(vnode) && (vnode.fnScopeId = options._scopeId, vnode.fnContext = parent), 
                vnode;
            } : this._c = function(a, b, c, d) {
                return createElement(contextVm, a, b, c, d, needNormalization);
            };
        }
        function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
            var clone = cloneVNode(vnode);
            return clone.fnContext = contextVm, clone.fnOptions = options, data.slot && ((clone.data || (clone.data = {})).slot = data.slot), 
            clone;
        }
        function mergeProps(to, from) {
            for (var key in from) to[camelize(key)] = from[key];
        }
        installRenderHelpers(FunctionalRenderContext.prototype);
        var componentVNodeHooks = {
            init: function(vnode, hydrating) {
                if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
                    var mountedNode = vnode;
                    componentVNodeHooks.prepatch(mountedNode, mountedNode);
                } else {
                    (vnode.componentInstance = function(vnode, parent) {
                        var options = {
                            _isComponent: !0,
                            _parentVnode: vnode,
                            parent: parent
                        }, inlineTemplate = vnode.data.inlineTemplate;
                        isDef(inlineTemplate) && (options.render = inlineTemplate.render, options.staticRenderFns = inlineTemplate.staticRenderFns);
                        return new vnode.componentOptions.Ctor(options);
                    }(vnode, activeInstance)).$mount(hydrating ? vnode.elm : void 0, hydrating);
                }
            },
            prepatch: function(oldVnode, vnode) {
                var options = vnode.componentOptions;
                !function(vm, propsData, listeners, parentVnode, renderChildren) {
                    0;
                    var hasDynamicScopedSlot = !!(parentVnode.data.scopedSlots && !parentVnode.data.scopedSlots.$stable || vm.$scopedSlots !== emptyObject && !vm.$scopedSlots.$stable), needsForceUpdate = !!(renderChildren || vm.$options._renderChildren || hasDynamicScopedSlot);
                    vm.$options._parentVnode = parentVnode, vm.$vnode = parentVnode, vm._vnode && (vm._vnode.parent = parentVnode);
                    if (vm.$options._renderChildren = renderChildren, vm.$attrs = parentVnode.data.attrs || emptyObject, 
                    vm.$listeners = listeners || emptyObject, propsData && vm.$options.props) {
                        toggleObserving(!1);
                        for (var props = vm._props, propKeys = vm.$options._propKeys || [], i = 0; i < propKeys.length; i++) {
                            var key = propKeys[i], propOptions = vm.$options.props;
                            props[key] = validateProp(key, propOptions, propsData, vm);
                        }
                        toggleObserving(!0), vm.$options.propsData = propsData;
                    }
                    listeners = listeners || emptyObject;
                    var oldListeners = vm.$options._parentListeners;
                    vm.$options._parentListeners = listeners, updateComponentListeners(vm, listeners, oldListeners), 
                    needsForceUpdate && (vm.$slots = resolveSlots(renderChildren, parentVnode.context), 
                    vm.$forceUpdate());
                    0;
                }(vnode.componentInstance = oldVnode.componentInstance, options.propsData, options.listeners, vnode, options.children);
            },
            insert: function(vnode) {
                var vm, context = vnode.context, componentInstance = vnode.componentInstance;
                componentInstance._isMounted || (componentInstance._isMounted = !0, callHook(componentInstance, "mounted")), 
                vnode.data.keepAlive && (context._isMounted ? ((vm = componentInstance)._inactive = !1, 
                activatedChildren.push(vm)) : activateChildComponent(componentInstance, !0));
            },
            destroy: function(vnode) {
                var componentInstance = vnode.componentInstance;
                componentInstance._isDestroyed || (vnode.data.keepAlive ? function deactivateChildComponent(vm, direct) {
                    if (direct && (vm._directInactive = !0, isInInactiveTree(vm))) return;
                    if (!vm._inactive) {
                        vm._inactive = !0;
                        for (var i = 0; i < vm.$children.length; i++) deactivateChildComponent(vm.$children[i]);
                        callHook(vm, "deactivated");
                    }
                }(componentInstance, !0) : componentInstance.$destroy());
            }
        }, hooksToMerge = Object.keys(componentVNodeHooks);
        function createComponent(Ctor, data, context, children, tag) {
            if (!isUndef(Ctor)) {
                var baseCtor = context.$options._base;
                if (isObject(Ctor) && (Ctor = baseCtor.extend(Ctor)), "function" == typeof Ctor) {
                    var asyncFactory;
                    if (isUndef(Ctor.cid) && void 0 === (Ctor = function(factory, baseCtor) {
                        if (isTrue(factory.error) && isDef(factory.errorComp)) return factory.errorComp;
                        if (isDef(factory.resolved)) return factory.resolved;
                        if (isTrue(factory.loading) && isDef(factory.loadingComp)) return factory.loadingComp;
                        var owner = currentRenderingInstance;
                        if (!isDef(factory.owners)) {
                            var owners = factory.owners = [ owner ], sync = !0, forceRender = function(renderCompleted) {
                                for (var i = 0, l = owners.length; i < l; i++) owners[i].$forceUpdate();
                                renderCompleted && (owners.length = 0);
                            }, resolve = once(function(res) {
                                factory.resolved = ensureCtor(res, baseCtor), sync ? owners.length = 0 : forceRender(!0);
                            }), reject = once(function(reason) {
                                isDef(factory.errorComp) && (factory.error = !0, forceRender(!0));
                            }), res = factory(resolve, reject);
                            return isObject(res) && (isPromise(res) ? isUndef(factory.resolved) && res.then(resolve, reject) : isPromise(res.component) && (res.component.then(resolve, reject), 
                            isDef(res.error) && (factory.errorComp = ensureCtor(res.error, baseCtor)), isDef(res.loading) && (factory.loadingComp = ensureCtor(res.loading, baseCtor), 
                            0 === res.delay ? factory.loading = !0 : setTimeout(function() {
                                isUndef(factory.resolved) && isUndef(factory.error) && (factory.loading = !0, forceRender(!1));
                            }, res.delay || 200)), isDef(res.timeout) && setTimeout(function() {
                                isUndef(factory.resolved) && reject(null);
                            }, res.timeout))), sync = !1, factory.loading ? factory.loadingComp : factory.resolved;
                        }
                        factory.owners.push(owner);
                    }(asyncFactory = Ctor, baseCtor))) return function(factory, data, context, children, tag) {
                        var node = createEmptyVNode();
                        return node.asyncFactory = factory, node.asyncMeta = {
                            data: data,
                            context: context,
                            children: children,
                            tag: tag
                        }, node;
                    }(asyncFactory, data, context, children, tag);
                    data = data || {}, resolveConstructorOptions(Ctor), isDef(data.model) && function(options, data) {
                        var prop = options.model && options.model.prop || "value", event = options.model && options.model.event || "input";
                        (data.attrs || (data.attrs = {}))[prop] = data.model.value;
                        var on = data.on || (data.on = {}), existing = on[event], callback = data.model.callback;
                        isDef(existing) ? (Array.isArray(existing) ? -1 === existing.indexOf(callback) : existing !== callback) && (on[event] = [ callback ].concat(existing)) : on[event] = callback;
                    }(Ctor.options, data);
                    var propsData = function(data, Ctor, tag) {
                        var propOptions = Ctor.options.props;
                        if (!isUndef(propOptions)) {
                            var res = {}, attrs = data.attrs, props = data.props;
                            if (isDef(attrs) || isDef(props)) for (var key in propOptions) {
                                var altKey = hyphenate(key);
                                checkProp(res, props, key, altKey, !0) || checkProp(res, attrs, key, altKey, !1);
                            }
                            return res;
                        }
                    }(data, Ctor);
                    if (isTrue(Ctor.options.functional)) return function(Ctor, propsData, data, contextVm, children) {
                        var options = Ctor.options, props = {}, propOptions = options.props;
                        if (isDef(propOptions)) for (var key in propOptions) props[key] = validateProp(key, propOptions, propsData || emptyObject); else isDef(data.attrs) && mergeProps(props, data.attrs), 
                        isDef(data.props) && mergeProps(props, data.props);
                        var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor), vnode = options.render.call(null, renderContext._c, renderContext);
                        if (vnode instanceof VNode) return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options);
                        if (Array.isArray(vnode)) {
                            for (var vnodes = normalizeChildren(vnode) || [], res = new Array(vnodes.length), i = 0; i < vnodes.length; i++) res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options);
                            return res;
                        }
                    }(Ctor, propsData, data, context, children);
                    var listeners = data.on;
                    if (data.on = data.nativeOn, isTrue(Ctor.options.abstract)) {
                        var slot = data.slot;
                        data = {}, slot && (data.slot = slot);
                    }
                    !function(data) {
                        for (var hooks = data.hook || (data.hook = {}), i = 0; i < hooksToMerge.length; i++) {
                            var key = hooksToMerge[i], existing = hooks[key], toMerge = componentVNodeHooks[key];
                            existing === toMerge || existing && existing._merged || (hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge);
                        }
                    }(data);
                    var name = Ctor.options.name || tag;
                    return new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ""), data, void 0, void 0, void 0, context, {
                        Ctor: Ctor,
                        propsData: propsData,
                        listeners: listeners,
                        tag: tag,
                        children: children
                    }, asyncFactory);
                }
            }
        }
        function mergeHook$1(f1, f2) {
            var merged = function(a, b) {
                f1(a, b), f2(a, b);
            };
            return merged._merged = !0, merged;
        }
        var SIMPLE_NORMALIZE = 1, ALWAYS_NORMALIZE = 2;
        function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
            return (Array.isArray(data) || isPrimitive(data)) && (normalizationType = children, 
            children = data, data = void 0), isTrue(alwaysNormalize) && (normalizationType = ALWAYS_NORMALIZE), 
            function(context, tag, data, children, normalizationType) {
                if (isDef(data) && isDef(data.__ob__)) return createEmptyVNode();
                isDef(data) && isDef(data.is) && (tag = data.is);
                if (!tag) return createEmptyVNode();
                0;
                Array.isArray(children) && "function" == typeof children[0] && ((data = data || {}).scopedSlots = {
                    default: children[0]
                }, children.length = 0);
                normalizationType === ALWAYS_NORMALIZE ? children = normalizeChildren(children) : normalizationType === SIMPLE_NORMALIZE && (children = function(children) {
                    for (var i = 0; i < children.length; i++) if (Array.isArray(children[i])) return Array.prototype.concat.apply([], children);
                    return children;
                }(children));
                var vnode, ns;
                if ("string" == typeof tag) {
                    var Ctor;
                    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag), vnode = config.isReservedTag(tag) ? new VNode(config.parsePlatformTagName(tag), data, children, void 0, void 0, context) : data && data.pre || !isDef(Ctor = resolveAsset(context.$options, "components", tag)) ? new VNode(tag, data, children, void 0, void 0, context) : createComponent(Ctor, data, context, children, tag);
                } else vnode = createComponent(tag, data, context, children);
                return Array.isArray(vnode) ? vnode : isDef(vnode) ? (isDef(ns) && function applyNS(vnode, ns, force) {
                    vnode.ns = ns;
                    "foreignObject" === vnode.tag && (ns = void 0, force = !0);
                    if (isDef(vnode.children)) for (var i = 0, l = vnode.children.length; i < l; i++) {
                        var child = vnode.children[i];
                        isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && "svg" !== child.tag) && applyNS(child, ns, force);
                    }
                }(vnode, ns), isDef(data) && function(data) {
                    isObject(data.style) && traverse(data.style);
                    isObject(data.class) && traverse(data.class);
                }(data), vnode) : createEmptyVNode();
            }(context, tag, data, children, normalizationType);
        }
        var target, currentRenderingInstance = null;
        function ensureCtor(comp, base) {
            return (comp.__esModule || hasSymbol && "Module" === comp[Symbol.toStringTag]) && (comp = comp.default), 
            isObject(comp) ? base.extend(comp) : comp;
        }
        function isAsyncPlaceholder(node) {
            return node.isComment && node.asyncFactory;
        }
        function getFirstComponentChild(children) {
            if (Array.isArray(children)) for (var i = 0; i < children.length; i++) {
                var c = children[i];
                if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) return c;
            }
        }
        function add(event, fn) {
            target.$on(event, fn);
        }
        function remove$1(event, fn) {
            target.$off(event, fn);
        }
        function createOnceHandler(event, fn) {
            var _target = target;
            return function onceHandler() {
                null !== fn.apply(null, arguments) && _target.$off(event, onceHandler);
            };
        }
        function updateComponentListeners(vm, listeners, oldListeners) {
            target = vm, updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm), 
            target = void 0;
        }
        var activeInstance = null;
        function setActiveInstance(vm) {
            var prevActiveInstance = activeInstance;
            return activeInstance = vm, function() {
                activeInstance = prevActiveInstance;
            };
        }
        function isInInactiveTree(vm) {
            for (;vm && (vm = vm.$parent); ) if (vm._inactive) return !0;
            return !1;
        }
        function activateChildComponent(vm, direct) {
            if (direct) {
                if (vm._directInactive = !1, isInInactiveTree(vm)) return;
            } else if (vm._directInactive) return;
            if (vm._inactive || null === vm._inactive) {
                vm._inactive = !1;
                for (var i = 0; i < vm.$children.length; i++) activateChildComponent(vm.$children[i]);
                callHook(vm, "activated");
            }
        }
        function callHook(vm, hook) {
            pushTarget();
            var handlers = vm.$options[hook], info = hook + " hook";
            if (handlers) for (var i = 0, j = handlers.length; i < j; i++) invokeWithErrorHandling(handlers[i], vm, null, vm, info);
            vm._hasHookEvent && vm.$emit("hook:" + hook), popTarget();
        }
        var queue = [], activatedChildren = [], has = {}, waiting = !1, flushing = !1, index = 0;
        var currentFlushTimestamp = 0, getNow = Date.now;
        function flushSchedulerQueue() {
            var watcher, id;
            for (currentFlushTimestamp = getNow(), flushing = !0, queue.sort(function(a, b) {
                return a.id - b.id;
            }), index = 0; index < queue.length; index++) (watcher = queue[index]).before && watcher.before(), 
            id = watcher.id, has[id] = null, watcher.run();
            var activatedQueue = activatedChildren.slice(), updatedQueue = queue.slice();
            index = queue.length = activatedChildren.length = 0, has = {}, waiting = flushing = !1, 
            function(queue) {
                for (var i = 0; i < queue.length; i++) queue[i]._inactive = !0, activateChildComponent(queue[i], !0);
            }(activatedQueue), function(queue) {
                var i = queue.length;
                for (;i--; ) {
                    var watcher = queue[i], vm = watcher.vm;
                    vm._watcher === watcher && vm._isMounted && !vm._isDestroyed && callHook(vm, "updated");
                }
            }(updatedQueue), devtools && config.devtools && devtools.emit("flush");
        }
        inBrowser && getNow() > document.createEvent("Event").timeStamp && (getNow = function() {
            return performance.now();
        });
        var uid$2 = 0, Watcher = function(vm, expOrFn, cb, options, isRenderWatcher) {
            this.vm = vm, isRenderWatcher && (vm._watcher = this), vm._watchers.push(this), 
            options ? (this.deep = !!options.deep, this.user = !!options.user, this.lazy = !!options.lazy, 
            this.sync = !!options.sync, this.before = options.before) : this.deep = this.user = this.lazy = this.sync = !1, 
            this.cb = cb, this.id = ++uid$2, this.active = !0, this.dirty = this.lazy, this.deps = [], 
            this.newDeps = [], this.depIds = new _Set(), this.newDepIds = new _Set(), this.expression = "", 
            "function" == typeof expOrFn ? this.getter = expOrFn : (this.getter = function(path) {
                if (!bailRE.test(path)) {
                    var segments = path.split(".");
                    return function(obj) {
                        for (var i = 0; i < segments.length; i++) {
                            if (!obj) return;
                            obj = obj[segments[i]];
                        }
                        return obj;
                    };
                }
            }(expOrFn), this.getter || (this.getter = noop)), this.value = this.lazy ? void 0 : this.get();
        };
        Watcher.prototype.get = function() {
            var value;
            pushTarget(this);
            var vm = this.vm;
            try {
                value = this.getter.call(vm, vm);
            } catch (e) {
                if (!this.user) throw e;
                handleError(e, vm, 'getter for watcher "' + this.expression + '"');
            } finally {
                this.deep && traverse(value), popTarget(), this.cleanupDeps();
            }
            return value;
        }, Watcher.prototype.addDep = function(dep) {
            var id = dep.id;
            this.newDepIds.has(id) || (this.newDepIds.add(id), this.newDeps.push(dep), this.depIds.has(id) || dep.addSub(this));
        }, Watcher.prototype.cleanupDeps = function() {
            for (var i = this.deps.length; i--; ) {
                var dep = this.deps[i];
                this.newDepIds.has(dep.id) || dep.removeSub(this);
            }
            var tmp = this.depIds;
            this.depIds = this.newDepIds, this.newDepIds = tmp, this.newDepIds.clear(), tmp = this.deps, 
            this.deps = this.newDeps, this.newDeps = tmp, this.newDeps.length = 0;
        }, Watcher.prototype.update = function() {
            this.lazy ? this.dirty = !0 : this.sync ? this.run() : function(watcher) {
                var id = watcher.id;
                if (null == has[id]) {
                    if (has[id] = !0, flushing) {
                        for (var i = queue.length - 1; i > index && queue[i].id > watcher.id; ) i--;
                        queue.splice(i + 1, 0, watcher);
                    } else queue.push(watcher);
                    waiting || (waiting = !0, nextTick(flushSchedulerQueue));
                }
            }(this);
        }, Watcher.prototype.run = function() {
            if (this.active) {
                var value = this.get();
                if (value !== this.value || isObject(value) || this.deep) {
                    var oldValue = this.value;
                    if (this.value = value, this.user) try {
                        this.cb.call(this.vm, value, oldValue);
                    } catch (e) {
                        handleError(e, this.vm, 'callback for watcher "' + this.expression + '"');
                    } else this.cb.call(this.vm, value, oldValue);
                }
            }
        }, Watcher.prototype.evaluate = function() {
            this.value = this.get(), this.dirty = !1;
        }, Watcher.prototype.depend = function() {
            for (var i = this.deps.length; i--; ) this.deps[i].depend();
        }, Watcher.prototype.teardown = function() {
            if (this.active) {
                this.vm._isBeingDestroyed || remove(this.vm._watchers, this);
                for (var i = this.deps.length; i--; ) this.deps[i].removeSub(this);
                this.active = !1;
            }
        };
        var sharedPropertyDefinition = {
            enumerable: !0,
            configurable: !0,
            get: noop,
            set: noop
        };
        function proxy(target, sourceKey, key) {
            sharedPropertyDefinition.get = function() {
                return this[sourceKey][key];
            }, sharedPropertyDefinition.set = function(val) {
                this[sourceKey][key] = val;
            }, Object.defineProperty(target, key, sharedPropertyDefinition);
        }
        function initState(vm) {
            vm._watchers = [];
            var opts = vm.$options;
            opts.props && function(vm, propsOptions) {
                var propsData = vm.$options.propsData || {}, props = vm._props = {}, keys = vm.$options._propKeys = [];
                vm.$parent && toggleObserving(!1);
                var loop = function(key) {
                    keys.push(key);
                    var value = validateProp(key, propsOptions, propsData, vm);
                    defineReactive$$1(props, key, value), key in vm || proxy(vm, "_props", key);
                };
                for (var key in propsOptions) loop(key);
                toggleObserving(!0);
            }(vm, opts.props), opts.methods && function(vm, methods) {
                vm.$options.props;
                for (var key in methods) vm[key] = "function" != typeof methods[key] ? noop : bind(methods[key], vm);
            }(vm, opts.methods), opts.data ? function(vm) {
                var data = vm.$options.data;
                isPlainObject(data = vm._data = "function" == typeof data ? function(data, vm) {
                    pushTarget();
                    try {
                        return data.call(vm, vm);
                    } catch (e) {
                        return handleError(e, vm, "data()"), {};
                    } finally {
                        popTarget();
                    }
                }(data, vm) : data || {}) || (data = {});
                var keys = Object.keys(data), props = vm.$options.props, i = (vm.$options.methods, 
                keys.length);
                for (;i--; ) {
                    var key = keys[i];
                    0, props && hasOwn(props, key) || (c = void 0, 36 !== (c = (key + "").charCodeAt(0)) && 95 !== c && proxy(vm, "_data", key));
                }
                var c;
                observe(data, !0);
            }(vm) : observe(vm._data = {}, !0), opts.computed && function(vm, computed) {
                var watchers = vm._computedWatchers = Object.create(null), isSSR = isServerRendering();
                for (var key in computed) {
                    var userDef = computed[key], getter = "function" == typeof userDef ? userDef : userDef.get;
                    0, isSSR || (watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions)), 
                    key in vm || defineComputed(vm, key, userDef);
                }
            }(vm, opts.computed), opts.watch && opts.watch !== nativeWatch && function(vm, watch) {
                for (var key in watch) {
                    var handler = watch[key];
                    if (Array.isArray(handler)) for (var i = 0; i < handler.length; i++) createWatcher(vm, key, handler[i]); else createWatcher(vm, key, handler);
                }
            }(vm, opts.watch);
        }
        var computedWatcherOptions = {
            lazy: !0
        };
        function defineComputed(target, key, userDef) {
            var shouldCache = !isServerRendering();
            "function" == typeof userDef ? (sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef), 
            sharedPropertyDefinition.set = noop) : (sharedPropertyDefinition.get = userDef.get ? shouldCache && !1 !== userDef.cache ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop, 
            sharedPropertyDefinition.set = userDef.set || noop), Object.defineProperty(target, key, sharedPropertyDefinition);
        }
        function createComputedGetter(key) {
            return function() {
                var watcher = this._computedWatchers && this._computedWatchers[key];
                if (watcher) return watcher.dirty && watcher.evaluate(), Dep.target && watcher.depend(), 
                watcher.value;
            };
        }
        function createGetterInvoker(fn) {
            return function() {
                return fn.call(this, this);
            };
        }
        function createWatcher(vm, expOrFn, handler, options) {
            return isPlainObject(handler) && (options = handler, handler = handler.handler), 
            "string" == typeof handler && (handler = vm[handler]), vm.$watch(expOrFn, handler, options);
        }
        var uid$3 = 0;
        function resolveConstructorOptions(Ctor) {
            var options = Ctor.options;
            if (Ctor.super) {
                var superOptions = resolveConstructorOptions(Ctor.super);
                if (superOptions !== Ctor.superOptions) {
                    Ctor.superOptions = superOptions;
                    var modifiedOptions = function(Ctor) {
                        var modified, latest = Ctor.options, sealed = Ctor.sealedOptions;
                        for (var key in latest) latest[key] !== sealed[key] && (modified || (modified = {}), 
                        modified[key] = latest[key]);
                        return modified;
                    }(Ctor);
                    modifiedOptions && extend(Ctor.extendOptions, modifiedOptions), (options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)).name && (options.components[options.name] = Ctor);
                }
            }
            return options;
        }
        function Vue(options) {
            this._init(options);
        }
        function initExtend(Vue) {
            Vue.cid = 0;
            var cid = 1;
            Vue.extend = function(extendOptions) {
                extendOptions = extendOptions || {};
                var Super = this, SuperId = Super.cid, cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
                if (cachedCtors[SuperId]) return cachedCtors[SuperId];
                var name = extendOptions.name || Super.options.name;
                var Sub = function(options) {
                    this._init(options);
                };
                return (Sub.prototype = Object.create(Super.prototype)).constructor = Sub, Sub.cid = cid++, 
                Sub.options = mergeOptions(Super.options, extendOptions), Sub.super = Super, Sub.options.props && function(Comp) {
                    var props = Comp.options.props;
                    for (var key in props) proxy(Comp.prototype, "_props", key);
                }(Sub), Sub.options.computed && function(Comp) {
                    var computed = Comp.options.computed;
                    for (var key in computed) defineComputed(Comp.prototype, key, computed[key]);
                }(Sub), Sub.extend = Super.extend, Sub.mixin = Super.mixin, Sub.use = Super.use, 
                ASSET_TYPES.forEach(function(type) {
                    Sub[type] = Super[type];
                }), name && (Sub.options.components[name] = Sub), Sub.superOptions = Super.options, 
                Sub.extendOptions = extendOptions, Sub.sealedOptions = extend({}, Sub.options), 
                cachedCtors[SuperId] = Sub, Sub;
            };
        }
        function getComponentName(opts) {
            return opts && (opts.Ctor.options.name || opts.tag);
        }
        function matches(pattern, name) {
            return Array.isArray(pattern) ? pattern.indexOf(name) > -1 : "string" == typeof pattern ? pattern.split(",").indexOf(name) > -1 : !!isRegExp(pattern) && pattern.test(name);
        }
        function pruneCache(keepAliveInstance, filter) {
            var cache = keepAliveInstance.cache, keys = keepAliveInstance.keys, _vnode = keepAliveInstance._vnode;
            for (var key in cache) {
                var cachedNode = cache[key];
                if (cachedNode) {
                    var name = getComponentName(cachedNode.componentOptions);
                    name && !filter(name) && pruneCacheEntry(cache, key, keys, _vnode);
                }
            }
        }
        function pruneCacheEntry(cache, key, keys, current) {
            var cached$$1 = cache[key];
            !cached$$1 || current && cached$$1.tag === current.tag || cached$$1.componentInstance.$destroy(), 
            cache[key] = null, remove(keys, key);
        }
        !function(Vue) {
            Vue.prototype._init = function(options) {
                var vm = this;
                vm._uid = uid$3++, vm._isVue = !0, options && options._isComponent ? function(vm, options) {
                    var opts = vm.$options = Object.create(vm.constructor.options), parentVnode = options._parentVnode;
                    opts.parent = options.parent, opts._parentVnode = parentVnode;
                    var vnodeComponentOptions = parentVnode.componentOptions;
                    opts.propsData = vnodeComponentOptions.propsData, opts._parentListeners = vnodeComponentOptions.listeners, 
                    opts._renderChildren = vnodeComponentOptions.children, opts._componentTag = vnodeComponentOptions.tag, 
                    options.render && (opts.render = options.render, opts.staticRenderFns = options.staticRenderFns);
                }(vm, options) : vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm), 
                vm._renderProxy = vm, vm._self = vm, function(vm) {
                    var options = vm.$options, parent = options.parent;
                    if (parent && !options.abstract) {
                        for (;parent.$options.abstract && parent.$parent; ) parent = parent.$parent;
                        parent.$children.push(vm);
                    }
                    vm.$parent = parent, vm.$root = parent ? parent.$root : vm, vm.$children = [], vm.$refs = {}, 
                    vm._watcher = null, vm._inactive = null, vm._directInactive = !1, vm._isMounted = !1, 
                    vm._isDestroyed = !1, vm._isBeingDestroyed = !1;
                }(vm), function(vm) {
                    vm._events = Object.create(null), vm._hasHookEvent = !1;
                    var listeners = vm.$options._parentListeners;
                    listeners && updateComponentListeners(vm, listeners);
                }(vm), function(vm) {
                    vm._vnode = null, vm._staticTrees = null;
                    var options = vm.$options, parentVnode = vm.$vnode = options._parentVnode, renderContext = parentVnode && parentVnode.context;
                    vm.$slots = resolveSlots(options._renderChildren, renderContext), vm.$scopedSlots = emptyObject, 
                    vm._c = function(a, b, c, d) {
                        return createElement(vm, a, b, c, d, !1);
                    }, vm.$createElement = function(a, b, c, d) {
                        return createElement(vm, a, b, c, d, !0);
                    };
                    var parentData = parentVnode && parentVnode.data;
                    defineReactive$$1(vm, "$attrs", parentData && parentData.attrs || emptyObject, null, !0), 
                    defineReactive$$1(vm, "$listeners", options._parentListeners || emptyObject, null, !0);
                }(vm), callHook(vm, "beforeCreate"), function(vm) {
                    var result = resolveInject(vm.$options.inject, vm);
                    result && (toggleObserving(!1), Object.keys(result).forEach(function(key) {
                        defineReactive$$1(vm, key, result[key]);
                    }), toggleObserving(!0));
                }(vm), initState(vm), function(vm) {
                    var provide = vm.$options.provide;
                    provide && (vm._provided = "function" == typeof provide ? provide.call(vm) : provide);
                }(vm), callHook(vm, "created"), vm.$options.el && vm.$mount(vm.$options.el);
            };
        }(Vue), function(Vue) {
            var dataDef = {
                get: function() {
                    return this._data;
                }
            }, propsDef = {
                get: function() {
                    return this._props;
                }
            };
            Object.defineProperty(Vue.prototype, "$data", dataDef), Object.defineProperty(Vue.prototype, "$props", propsDef), 
            Vue.prototype.$set = set, Vue.prototype.$delete = del, Vue.prototype.$watch = function(expOrFn, cb, options) {
                if (isPlainObject(cb)) return createWatcher(this, expOrFn, cb, options);
                (options = options || {}).user = !0;
                var watcher = new Watcher(this, expOrFn, cb, options);
                if (options.immediate) try {
                    cb.call(this, watcher.value);
                } catch (error) {
                    handleError(error, this, 'callback for immediate watcher "' + watcher.expression + '"');
                }
                return function() {
                    watcher.teardown();
                };
            };
        }(Vue), function(Vue) {
            var hookRE = /^hook:/;
            Vue.prototype.$on = function(event, fn) {
                var vm = this;
                if (Array.isArray(event)) for (var i = 0, l = event.length; i < l; i++) vm.$on(event[i], fn); else (vm._events[event] || (vm._events[event] = [])).push(fn), 
                hookRE.test(event) && (vm._hasHookEvent = !0);
                return vm;
            }, Vue.prototype.$once = function(event, fn) {
                var vm = this;
                function on() {
                    vm.$off(event, on), fn.apply(vm, arguments);
                }
                return on.fn = fn, vm.$on(event, on), vm;
            }, Vue.prototype.$off = function(event, fn) {
                var vm = this;
                if (!arguments.length) return vm._events = Object.create(null), vm;
                if (Array.isArray(event)) {
                    for (var i$1 = 0, l = event.length; i$1 < l; i$1++) vm.$off(event[i$1], fn);
                    return vm;
                }
                var cb, cbs = vm._events[event];
                if (!cbs) return vm;
                if (!fn) return vm._events[event] = null, vm;
                for (var i = cbs.length; i--; ) if ((cb = cbs[i]) === fn || cb.fn === fn) {
                    cbs.splice(i, 1);
                    break;
                }
                return vm;
            }, Vue.prototype.$emit = function(event) {
                var cbs = this._events[event];
                if (cbs) {
                    cbs = cbs.length > 1 ? toArray(cbs) : cbs;
                    for (var args = toArray(arguments, 1), info = 'event handler for "' + event + '"', i = 0, l = cbs.length; i < l; i++) invokeWithErrorHandling(cbs[i], this, args, this, info);
                }
                return this;
            };
        }(Vue), function(Vue) {
            Vue.prototype._update = function(vnode, hydrating) {
                var vm = this, prevEl = vm.$el, prevVnode = vm._vnode, restoreActiveInstance = setActiveInstance(vm);
                vm._vnode = vnode, vm.$el = prevVnode ? vm.__patch__(prevVnode, vnode) : vm.__patch__(vm.$el, vnode, hydrating, !1), 
                restoreActiveInstance(), prevEl && (prevEl.__vue__ = null), vm.$el && (vm.$el.__vue__ = vm), 
                vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode && (vm.$parent.$el = vm.$el);
            }, Vue.prototype.$forceUpdate = function() {
                this._watcher && this._watcher.update();
            }, Vue.prototype.$destroy = function() {
                var vm = this;
                if (!vm._isBeingDestroyed) {
                    callHook(vm, "beforeDestroy"), vm._isBeingDestroyed = !0;
                    var parent = vm.$parent;
                    !parent || parent._isBeingDestroyed || vm.$options.abstract || remove(parent.$children, vm), 
                    vm._watcher && vm._watcher.teardown();
                    for (var i = vm._watchers.length; i--; ) vm._watchers[i].teardown();
                    vm._data.__ob__ && vm._data.__ob__.vmCount--, vm._isDestroyed = !0, vm.__patch__(vm._vnode, null), 
                    callHook(vm, "destroyed"), vm.$off(), vm.$el && (vm.$el.__vue__ = null), vm.$vnode && (vm.$vnode.parent = null);
                }
            };
        }(Vue), function(Vue) {
            installRenderHelpers(Vue.prototype), Vue.prototype.$nextTick = function(fn) {
                return nextTick(fn, this);
            }, Vue.prototype._render = function() {
                var vnode, vm = this, ref = vm.$options, render = ref.render, _parentVnode = ref._parentVnode;
                _parentVnode && (vm.$scopedSlots = normalizeScopedSlots(_parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots)), 
                vm.$vnode = _parentVnode;
                try {
                    currentRenderingInstance = vm, vnode = render.call(vm._renderProxy, vm.$createElement);
                } catch (e) {
                    handleError(e, vm, "render"), vnode = vm._vnode;
                } finally {
                    currentRenderingInstance = null;
                }
                return Array.isArray(vnode) && 1 === vnode.length && (vnode = vnode[0]), vnode instanceof VNode || (vnode = createEmptyVNode()), 
                vnode.parent = _parentVnode, vnode;
            };
        }(Vue);
        var patternTypes = [ String, RegExp, Array ], builtInComponents = {
            KeepAlive: {
                name: "keep-alive",
                abstract: !0,
                props: {
                    include: patternTypes,
                    exclude: patternTypes,
                    max: [ String, Number ]
                },
                created: function() {
                    this.cache = Object.create(null), this.keys = [];
                },
                destroyed: function() {
                    for (var key in this.cache) pruneCacheEntry(this.cache, key, this.keys);
                },
                mounted: function() {
                    var this$1 = this;
                    this.$watch("include", function(val) {
                        pruneCache(this$1, function(name) {
                            return matches(val, name);
                        });
                    }), this.$watch("exclude", function(val) {
                        pruneCache(this$1, function(name) {
                            return !matches(val, name);
                        });
                    });
                },
                render: function() {
                    var slot = this.$slots.default, vnode = getFirstComponentChild(slot), componentOptions = vnode && vnode.componentOptions;
                    if (componentOptions) {
                        var name = getComponentName(componentOptions), include = this.include, exclude = this.exclude;
                        if (include && (!name || !matches(include, name)) || exclude && name && matches(exclude, name)) return vnode;
                        var cache = this.cache, keys = this.keys, key = null == vnode.key ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : "") : vnode.key;
                        cache[key] ? (vnode.componentInstance = cache[key].componentInstance, remove(keys, key), 
                        keys.push(key)) : (cache[key] = vnode, keys.push(key), this.max && keys.length > parseInt(this.max) && pruneCacheEntry(cache, keys[0], keys, this._vnode)), 
                        vnode.data.keepAlive = !0;
                    }
                    return vnode || slot && slot[0];
                }
            }
        };
        !function(Vue) {
            var configDef = {
                get: function() {
                    return config;
                }
            };
            Object.defineProperty(Vue, "config", configDef), Vue.util = {
                warn: warn,
                extend: extend,
                mergeOptions: mergeOptions,
                defineReactive: defineReactive$$1
            }, Vue.set = set, Vue.delete = del, Vue.nextTick = nextTick, Vue.observable = function(obj) {
                return observe(obj), obj;
            }, Vue.options = Object.create(null), ASSET_TYPES.forEach(function(type) {
                Vue.options[type + "s"] = Object.create(null);
            }), Vue.options._base = Vue, extend(Vue.options.components, builtInComponents), 
            function(Vue) {
                Vue.use = function(plugin) {
                    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);
                    if (installedPlugins.indexOf(plugin) > -1) return this;
                    var args = toArray(arguments, 1);
                    return args.unshift(this), "function" == typeof plugin.install ? plugin.install.apply(plugin, args) : "function" == typeof plugin && plugin.apply(null, args), 
                    installedPlugins.push(plugin), this;
                };
            }(Vue), function(Vue) {
                Vue.mixin = function(mixin) {
                    return this.options = mergeOptions(this.options, mixin), this;
                };
            }(Vue), initExtend(Vue), function(Vue) {
                ASSET_TYPES.forEach(function(type) {
                    Vue[type] = function(id, definition) {
                        return definition ? ("component" === type && isPlainObject(definition) && (definition.name = definition.name || id, 
                        definition = this.options._base.extend(definition)), "directive" === type && "function" == typeof definition && (definition = {
                            bind: definition,
                            update: definition
                        }), this.options[type + "s"][id] = definition, definition) : this.options[type + "s"][id];
                    };
                });
            }(Vue);
        }(Vue), Object.defineProperty(Vue.prototype, "$isServer", {
            get: isServerRendering
        }), Object.defineProperty(Vue.prototype, "$ssrContext", {
            get: function() {
                return this.$vnode && this.$vnode.ssrContext;
            }
        }), Object.defineProperty(Vue, "FunctionalRenderContext", {
            value: FunctionalRenderContext
        }), Vue.version = "2.6.6";
        var isReservedAttr = makeMap("style,class"), acceptValue = makeMap("input,textarea,option,select,progress"), mustUseProp = function(tag, type, attr) {
            return "value" === attr && acceptValue(tag) && "button" !== type || "selected" === attr && "option" === tag || "checked" === attr && "input" === tag || "muted" === attr && "video" === tag;
        }, isEnumeratedAttr = makeMap("contenteditable,draggable,spellcheck"), isValidContentEditableValue = makeMap("events,caret,typing,plaintext-only"), convertEnumeratedValue = function(key, value) {
            return isFalsyAttrValue(value) || "false" === value ? "false" : "contenteditable" === key && isValidContentEditableValue(value) ? value : "true";
        }, isBooleanAttr = makeMap("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,translate,truespeed,typemustmatch,visible"), xlinkNS = "http://www.w3.org/1999/xlink", isXlink = function(name) {
            return ":" === name.charAt(5) && "xlink" === name.slice(0, 5);
        }, getXlinkProp = function(name) {
            return isXlink(name) ? name.slice(6, name.length) : "";
        }, isFalsyAttrValue = function(val) {
            return null == val || !1 === val;
        };
        function genClassForVnode(vnode) {
            for (var data = vnode.data, parentNode = vnode, childNode = vnode; isDef(childNode.componentInstance); ) (childNode = childNode.componentInstance._vnode) && childNode.data && (data = mergeClassData(childNode.data, data));
            for (;isDef(parentNode = parentNode.parent); ) parentNode && parentNode.data && (data = mergeClassData(data, parentNode.data));
            return function(staticClass, dynamicClass) {
                if (isDef(staticClass) || isDef(dynamicClass)) return concat(staticClass, stringifyClass(dynamicClass));
                return "";
            }(data.staticClass, data.class);
        }
        function mergeClassData(child, parent) {
            return {
                staticClass: concat(child.staticClass, parent.staticClass),
                class: isDef(child.class) ? [ child.class, parent.class ] : parent.class
            };
        }
        function concat(a, b) {
            return a ? b ? a + " " + b : a : b || "";
        }
        function stringifyClass(value) {
            return Array.isArray(value) ? function(value) {
                for (var stringified, res = "", i = 0, l = value.length; i < l; i++) isDef(stringified = stringifyClass(value[i])) && "" !== stringified && (res && (res += " "), 
                res += stringified);
                return res;
            }(value) : isObject(value) ? function(value) {
                var res = "";
                for (var key in value) value[key] && (res && (res += " "), res += key);
                return res;
            }(value) : "string" == typeof value ? value : "";
        }
        var namespaceMap = {
            svg: "http://www.w3.org/2000/svg",
            math: "http://www.w3.org/1998/Math/MathML"
        }, isHTMLTag = makeMap("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"), isSVG = makeMap("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view", !0), isReservedTag = function(tag) {
            return isHTMLTag(tag) || isSVG(tag);
        };
        function getTagNamespace(tag) {
            return isSVG(tag) ? "svg" : "math" === tag ? "math" : void 0;
        }
        var unknownElementCache = Object.create(null);
        var isTextInputType = makeMap("text,number,password,search,email,tel,url");
        function query(el) {
            if ("string" == typeof el) {
                var selected = document.querySelector(el);
                return selected || document.createElement("div");
            }
            return el;
        }
        var nodeOps = Object.freeze({
            createElement: function(tagName, vnode) {
                var elm = document.createElement(tagName);
                return "select" !== tagName ? elm : (vnode.data && vnode.data.attrs && void 0 !== vnode.data.attrs.multiple && elm.setAttribute("multiple", "multiple"), 
                elm);
            },
            createElementNS: function(namespace, tagName) {
                return document.createElementNS(namespaceMap[namespace], tagName);
            },
            createTextNode: function(text) {
                return document.createTextNode(text);
            },
            createComment: function(text) {
                return document.createComment(text);
            },
            insertBefore: function(parentNode, newNode, referenceNode) {
                parentNode.insertBefore(newNode, referenceNode);
            },
            removeChild: function(node, child) {
                node.removeChild(child);
            },
            appendChild: function(node, child) {
                node.appendChild(child);
            },
            parentNode: function(node) {
                return node.parentNode;
            },
            nextSibling: function(node) {
                return node.nextSibling;
            },
            tagName: function(node) {
                return node.tagName;
            },
            setTextContent: function(node, text) {
                node.textContent = text;
            },
            setStyleScope: function(node, scopeId) {
                node.setAttribute(scopeId, "");
            }
        }), ref = {
            create: function(_, vnode) {
                registerRef(vnode);
            },
            update: function(oldVnode, vnode) {
                oldVnode.data.ref !== vnode.data.ref && (registerRef(oldVnode, !0), registerRef(vnode));
            },
            destroy: function(vnode) {
                registerRef(vnode, !0);
            }
        };
        function registerRef(vnode, isRemoval) {
            var key = vnode.data.ref;
            if (isDef(key)) {
                var vm = vnode.context, ref = vnode.componentInstance || vnode.elm, refs = vm.$refs;
                isRemoval ? Array.isArray(refs[key]) ? remove(refs[key], ref) : refs[key] === ref && (refs[key] = void 0) : vnode.data.refInFor ? Array.isArray(refs[key]) ? refs[key].indexOf(ref) < 0 && refs[key].push(ref) : refs[key] = [ ref ] : refs[key] = ref;
            }
        }
        var emptyNode = new VNode("", {}, []), hooks = [ "create", "activate", "update", "remove", "destroy" ];
        function sameVnode(a, b) {
            return a.key === b.key && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && function(a, b) {
                if ("input" !== a.tag) return !0;
                var i, typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type, typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
                return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
            }(a, b) || isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error));
        }
        function createKeyToOldIdx(children, beginIdx, endIdx) {
            var i, key, map = {};
            for (i = beginIdx; i <= endIdx; ++i) isDef(key = children[i].key) && (map[key] = i);
            return map;
        }
        var directives = {
            create: updateDirectives,
            update: updateDirectives,
            destroy: function(vnode) {
                updateDirectives(vnode, emptyNode);
            }
        };
        function updateDirectives(oldVnode, vnode) {
            (oldVnode.data.directives || vnode.data.directives) && function(oldVnode, vnode) {
                var key, oldDir, dir, isCreate = oldVnode === emptyNode, isDestroy = vnode === emptyNode, oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context), newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context), dirsWithInsert = [], dirsWithPostpatch = [];
                for (key in newDirs) oldDir = oldDirs[key], dir = newDirs[key], oldDir ? (dir.oldValue = oldDir.value, 
                dir.oldArg = oldDir.arg, callHook$1(dir, "update", vnode, oldVnode), dir.def && dir.def.componentUpdated && dirsWithPostpatch.push(dir)) : (callHook$1(dir, "bind", vnode, oldVnode), 
                dir.def && dir.def.inserted && dirsWithInsert.push(dir));
                if (dirsWithInsert.length) {
                    var callInsert = function() {
                        for (var i = 0; i < dirsWithInsert.length; i++) callHook$1(dirsWithInsert[i], "inserted", vnode, oldVnode);
                    };
                    isCreate ? mergeVNodeHook(vnode, "insert", callInsert) : callInsert();
                }
                dirsWithPostpatch.length && mergeVNodeHook(vnode, "postpatch", function() {
                    for (var i = 0; i < dirsWithPostpatch.length; i++) callHook$1(dirsWithPostpatch[i], "componentUpdated", vnode, oldVnode);
                });
                if (!isCreate) for (key in oldDirs) newDirs[key] || callHook$1(oldDirs[key], "unbind", oldVnode, oldVnode, isDestroy);
            }(oldVnode, vnode);
        }
        var emptyModifiers = Object.create(null);
        function normalizeDirectives$1(dirs, vm) {
            var i, dir, res = Object.create(null);
            if (!dirs) return res;
            for (i = 0; i < dirs.length; i++) (dir = dirs[i]).modifiers || (dir.modifiers = emptyModifiers), 
            res[getRawDirName(dir)] = dir, dir.def = resolveAsset(vm.$options, "directives", dir.name);
            return res;
        }
        function getRawDirName(dir) {
            return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join(".");
        }
        function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
            var fn = dir.def && dir.def[hook];
            if (fn) try {
                fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
            } catch (e) {
                handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
            }
        }
        var baseModules = [ ref, directives ];
        function updateAttrs(oldVnode, vnode) {
            var opts = vnode.componentOptions;
            if (!(isDef(opts) && !1 === opts.Ctor.options.inheritAttrs || isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs))) {
                var key, cur, elm = vnode.elm, oldAttrs = oldVnode.data.attrs || {}, attrs = vnode.data.attrs || {};
                for (key in isDef(attrs.__ob__) && (attrs = vnode.data.attrs = extend({}, attrs)), 
                attrs) cur = attrs[key], oldAttrs[key] !== cur && setAttr(elm, key, cur);
                for (key in (isIE || isEdge) && attrs.value !== oldAttrs.value && setAttr(elm, "value", attrs.value), 
                oldAttrs) isUndef(attrs[key]) && (isXlink(key) ? elm.removeAttributeNS(xlinkNS, getXlinkProp(key)) : isEnumeratedAttr(key) || elm.removeAttribute(key));
            }
        }
        function setAttr(el, key, value) {
            el.tagName.indexOf("-") > -1 ? baseSetAttr(el, key, value) : isBooleanAttr(key) ? isFalsyAttrValue(value) ? el.removeAttribute(key) : (value = "allowfullscreen" === key && "EMBED" === el.tagName ? "true" : key, 
            el.setAttribute(key, value)) : isEnumeratedAttr(key) ? el.setAttribute(key, convertEnumeratedValue(key, value)) : isXlink(key) ? isFalsyAttrValue(value) ? el.removeAttributeNS(xlinkNS, getXlinkProp(key)) : el.setAttributeNS(xlinkNS, key, value) : baseSetAttr(el, key, value);
        }
        function baseSetAttr(el, key, value) {
            if (isFalsyAttrValue(value)) el.removeAttribute(key); else {
                if (isIE && !isIE9 && "TEXTAREA" === el.tagName && "placeholder" === key && "" !== value && !el.__ieph) {
                    var blocker = function(e) {
                        e.stopImmediatePropagation(), el.removeEventListener("input", blocker);
                    };
                    el.addEventListener("input", blocker), el.__ieph = !0;
                }
                el.setAttribute(key, value);
            }
        }
        var attrs = {
            create: updateAttrs,
            update: updateAttrs
        };
        function updateClass(oldVnode, vnode) {
            var el = vnode.elm, data = vnode.data, oldData = oldVnode.data;
            if (!(isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class)))) {
                var cls = genClassForVnode(vnode), transitionClass = el._transitionClasses;
                isDef(transitionClass) && (cls = concat(cls, stringifyClass(transitionClass))), 
                cls !== el._prevClass && (el.setAttribute("class", cls), el._prevClass = cls);
            }
        }
        var len, str, chr, index$1, expressionPos, expressionEndPos, klass = {
            create: updateClass,
            update: updateClass
        }, validDivisionCharRE = /[\w).+\-_$\]]/;
        function parseFilters(exp) {
            var c, prev, i, expression, filters, inSingle = !1, inDouble = !1, inTemplateString = !1, inRegex = !1, curly = 0, square = 0, paren = 0, lastFilterIndex = 0;
            for (i = 0; i < exp.length; i++) if (prev = c, c = exp.charCodeAt(i), inSingle) 39 === c && 92 !== prev && (inSingle = !1); else if (inDouble) 34 === c && 92 !== prev && (inDouble = !1); else if (inTemplateString) 96 === c && 92 !== prev && (inTemplateString = !1); else if (inRegex) 47 === c && 92 !== prev && (inRegex = !1); else if (124 !== c || 124 === exp.charCodeAt(i + 1) || 124 === exp.charCodeAt(i - 1) || curly || square || paren) {
                switch (c) {
                  case 34:
                    inDouble = !0;
                    break;

                  case 39:
                    inSingle = !0;
                    break;

                  case 96:
                    inTemplateString = !0;
                    break;

                  case 40:
                    paren++;
                    break;

                  case 41:
                    paren--;
                    break;

                  case 91:
                    square++;
                    break;

                  case 93:
                    square--;
                    break;

                  case 123:
                    curly++;
                    break;

                  case 125:
                    curly--;
                }
                if (47 === c) {
                    for (var j = i - 1, p = void 0; j >= 0 && " " === (p = exp.charAt(j)); j--) ;
                    p && validDivisionCharRE.test(p) || (inRegex = !0);
                }
            } else void 0 === expression ? (lastFilterIndex = i + 1, expression = exp.slice(0, i).trim()) : pushFilter();
            function pushFilter() {
                (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim()), lastFilterIndex = i + 1;
            }
            if (void 0 === expression ? expression = exp.slice(0, i).trim() : 0 !== lastFilterIndex && pushFilter(), 
            filters) for (i = 0; i < filters.length; i++) expression = wrapFilter(expression, filters[i]);
            return expression;
        }
        function wrapFilter(exp, filter) {
            var i = filter.indexOf("(");
            if (i < 0) return '_f("' + filter + '")(' + exp + ")";
            var name = filter.slice(0, i), args = filter.slice(i + 1);
            return '_f("' + name + '")(' + exp + (")" !== args ? "," + args : args);
        }
        function baseWarn(msg, range) {
            console.error("[Vue compiler]: " + msg);
        }
        function pluckModuleFunction(modules, key) {
            return modules ? modules.map(function(m) {
                return m[key];
            }).filter(function(_) {
                return _;
            }) : [];
        }
        function addProp(el, name, value, range, dynamic) {
            (el.props || (el.props = [])).push(rangeSetItem({
                name: name,
                value: value,
                dynamic: dynamic
            }, range)), el.plain = !1;
        }
        function addAttr(el, name, value, range, dynamic) {
            (dynamic ? el.dynamicAttrs || (el.dynamicAttrs = []) : el.attrs || (el.attrs = [])).push(rangeSetItem({
                name: name,
                value: value,
                dynamic: dynamic
            }, range)), el.plain = !1;
        }
        function addRawAttr(el, name, value, range) {
            el.attrsMap[name] = value, el.attrsList.push(rangeSetItem({
                name: name,
                value: value
            }, range));
        }
        function addDirective(el, name, rawName, value, arg, isDynamicArg, modifiers, range) {
            (el.directives || (el.directives = [])).push(rangeSetItem({
                name: name,
                rawName: rawName,
                value: value,
                arg: arg,
                isDynamicArg: isDynamicArg,
                modifiers: modifiers
            }, range)), el.plain = !1;
        }
        function prependModifierMarker(symbol, name, dynamic) {
            return dynamic ? "_p(" + name + ',"' + symbol + '")' : symbol + name;
        }
        function addHandler(el, name, value, modifiers, important, warn, range, dynamic) {
            var events;
            (modifiers = modifiers || emptyObject).right ? dynamic ? name = "(" + name + ")==='click'?'contextmenu':(" + name + ")" : "click" === name && (name = "contextmenu", 
            delete modifiers.right) : modifiers.middle && (dynamic ? name = "(" + name + ")==='click'?'mouseup':(" + name + ")" : "click" === name && (name = "mouseup")), 
            modifiers.capture && (delete modifiers.capture, name = prependModifierMarker("!", name, dynamic)), 
            modifiers.once && (delete modifiers.once, name = prependModifierMarker("~", name, dynamic)), 
            modifiers.passive && (delete modifiers.passive, name = prependModifierMarker("&", name, dynamic)), 
            modifiers.native ? (delete modifiers.native, events = el.nativeEvents || (el.nativeEvents = {})) : events = el.events || (el.events = {});
            var newHandler = rangeSetItem({
                value: value.trim(),
                dynamic: dynamic
            }, range);
            modifiers !== emptyObject && (newHandler.modifiers = modifiers);
            var handlers = events[name];
            Array.isArray(handlers) ? important ? handlers.unshift(newHandler) : handlers.push(newHandler) : events[name] = handlers ? important ? [ newHandler, handlers ] : [ handlers, newHandler ] : newHandler, 
            el.plain = !1;
        }
        function getBindingAttr(el, name, getStatic) {
            var dynamicValue = getAndRemoveAttr(el, ":" + name) || getAndRemoveAttr(el, "v-bind:" + name);
            if (null != dynamicValue) return parseFilters(dynamicValue);
            if (!1 !== getStatic) {
                var staticValue = getAndRemoveAttr(el, name);
                if (null != staticValue) return JSON.stringify(staticValue);
            }
        }
        function getAndRemoveAttr(el, name, removeFromMap) {
            var val;
            if (null != (val = el.attrsMap[name])) for (var list = el.attrsList, i = 0, l = list.length; i < l; i++) if (list[i].name === name) {
                list.splice(i, 1);
                break;
            }
            return removeFromMap && delete el.attrsMap[name], val;
        }
        function getAndRemoveAttrByRegex(el, name) {
            for (var list = el.attrsList, i = 0, l = list.length; i < l; i++) {
                var attr = list[i];
                if (name.test(attr.name)) return list.splice(i, 1), attr;
            }
        }
        function rangeSetItem(item, range) {
            return range && (null != range.start && (item.start = range.start), null != range.end && (item.end = range.end)), 
            item;
        }
        function genComponentModel(el, value, modifiers) {
            var ref = modifiers || {}, number = ref.number, valueExpression = "$$v";
            ref.trim && (valueExpression = "(typeof $$v === 'string'? $$v.trim(): $$v)"), number && (valueExpression = "_n(" + valueExpression + ")");
            var assignment = genAssignmentCode(value, valueExpression);
            el.model = {
                value: "(" + value + ")",
                expression: JSON.stringify(value),
                callback: "function ($$v) {" + assignment + "}"
            };
        }
        function genAssignmentCode(value, assignment) {
            var res = function(val) {
                if (val = val.trim(), len = val.length, val.indexOf("[") < 0 || val.lastIndexOf("]") < len - 1) return (index$1 = val.lastIndexOf(".")) > -1 ? {
                    exp: val.slice(0, index$1),
                    key: '"' + val.slice(index$1 + 1) + '"'
                } : {
                    exp: val,
                    key: null
                };
                str = val, index$1 = expressionPos = expressionEndPos = 0;
                for (;!eof(); ) isStringStart(chr = next()) ? parseString(chr) : 91 === chr && parseBracket(chr);
                return {
                    exp: val.slice(0, expressionPos),
                    key: val.slice(expressionPos + 1, expressionEndPos)
                };
            }(value);
            return null === res.key ? value + "=" + assignment : "$set(" + res.exp + ", " + res.key + ", " + assignment + ")";
        }
        function next() {
            return str.charCodeAt(++index$1);
        }
        function eof() {
            return index$1 >= len;
        }
        function isStringStart(chr) {
            return 34 === chr || 39 === chr;
        }
        function parseBracket(chr) {
            var inBracket = 1;
            for (expressionPos = index$1; !eof(); ) if (isStringStart(chr = next())) parseString(chr); else if (91 === chr && inBracket++, 
            93 === chr && inBracket--, 0 === inBracket) {
                expressionEndPos = index$1;
                break;
            }
        }
        function parseString(chr) {
            for (var stringQuote = chr; !eof() && (chr = next()) !== stringQuote; ) ;
        }
        var target$1, RANGE_TOKEN = "__r", CHECKBOX_RADIO_TOKEN = "__c";
        function createOnceHandler$1(event, handler, capture) {
            var _target = target$1;
            return function onceHandler() {
                null !== handler.apply(null, arguments) && remove$2(event, onceHandler, capture, _target);
            };
        }
        var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);
        function add$1(name, handler, capture, passive) {
            if (useMicrotaskFix) {
                var attachedTimestamp = currentFlushTimestamp, original = handler;
                handler = original._wrapper = function(e) {
                    if (e.target === e.currentTarget || e.timeStamp >= attachedTimestamp || 0 === e.timeStamp || e.target.ownerDocument !== document) return original.apply(this, arguments);
                };
            }
            target$1.addEventListener(name, handler, supportsPassive ? {
                capture: capture,
                passive: passive
            } : capture);
        }
        function remove$2(name, handler, capture, _target) {
            (_target || target$1).removeEventListener(name, handler._wrapper || handler, capture);
        }
        function updateDOMListeners(oldVnode, vnode) {
            if (!isUndef(oldVnode.data.on) || !isUndef(vnode.data.on)) {
                var on = vnode.data.on || {}, oldOn = oldVnode.data.on || {};
                target$1 = vnode.elm, function(on) {
                    if (isDef(on[RANGE_TOKEN])) {
                        var event = isIE ? "change" : "input";
                        on[event] = [].concat(on[RANGE_TOKEN], on[event] || []), delete on[RANGE_TOKEN];
                    }
                    isDef(on[CHECKBOX_RADIO_TOKEN]) && (on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []), 
                    delete on[CHECKBOX_RADIO_TOKEN]);
                }(on), updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context), 
                target$1 = void 0;
            }
        }
        var svgContainer, events = {
            create: updateDOMListeners,
            update: updateDOMListeners
        };
        function updateDOMProps(oldVnode, vnode) {
            if (!isUndef(oldVnode.data.domProps) || !isUndef(vnode.data.domProps)) {
                var key, cur, elm = vnode.elm, oldProps = oldVnode.data.domProps || {}, props = vnode.data.domProps || {};
                for (key in isDef(props.__ob__) && (props = vnode.data.domProps = extend({}, props)), 
                oldProps) isUndef(props[key]) && (elm[key] = "");
                for (key in props) {
                    if (cur = props[key], "textContent" === key || "innerHTML" === key) {
                        if (vnode.children && (vnode.children.length = 0), cur === oldProps[key]) continue;
                        1 === elm.childNodes.length && elm.removeChild(elm.childNodes[0]);
                    }
                    if ("value" === key || cur !== oldProps[key]) if ("value" === key) {
                        elm._value = cur;
                        var strCur = isUndef(cur) ? "" : String(cur);
                        shouldUpdateValue(elm, strCur) && (elm.value = strCur);
                    } else if ("innerHTML" === key && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
                        (svgContainer = svgContainer || document.createElement("div")).innerHTML = "<svg>" + cur + "</svg>";
                        for (var svg = svgContainer.firstChild; elm.firstChild; ) elm.removeChild(elm.firstChild);
                        for (;svg.firstChild; ) elm.appendChild(svg.firstChild);
                    } else elm[key] = cur;
                }
            }
        }
        function shouldUpdateValue(elm, checkVal) {
            return !elm.composing && ("OPTION" === elm.tagName || function(elm, checkVal) {
                var notInFocus = !0;
                try {
                    notInFocus = document.activeElement !== elm;
                } catch (e) {}
                return notInFocus && elm.value !== checkVal;
            }(elm, checkVal) || function(elm, newVal) {
                var value = elm.value, modifiers = elm._vModifiers;
                if (isDef(modifiers)) {
                    if (modifiers.number) return toNumber(value) !== toNumber(newVal);
                    if (modifiers.trim) return value.trim() !== newVal.trim();
                }
                return value !== newVal;
            }(elm, checkVal));
        }
        var domProps = {
            create: updateDOMProps,
            update: updateDOMProps
        }, parseStyleText = cached(function(cssText) {
            var res = {}, propertyDelimiter = /:(.+)/;
            return cssText.split(/;(?![^(]*\))/g).forEach(function(item) {
                if (item) {
                    var tmp = item.split(propertyDelimiter);
                    tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
                }
            }), res;
        });
        function normalizeStyleData(data) {
            var style = normalizeStyleBinding(data.style);
            return data.staticStyle ? extend(data.staticStyle, style) : style;
        }
        function normalizeStyleBinding(bindingStyle) {
            return Array.isArray(bindingStyle) ? toObject(bindingStyle) : "string" == typeof bindingStyle ? parseStyleText(bindingStyle) : bindingStyle;
        }
        var emptyStyle, cssVarRE = /^--/, importantRE = /\s*!important$/, setProp = function(el, name, val) {
            if (cssVarRE.test(name)) el.style.setProperty(name, val); else if (importantRE.test(val)) el.style.setProperty(hyphenate(name), val.replace(importantRE, ""), "important"); else {
                var normalizedName = normalize(name);
                if (Array.isArray(val)) for (var i = 0, len = val.length; i < len; i++) el.style[normalizedName] = val[i]; else el.style[normalizedName] = val;
            }
        }, vendorNames = [ "Webkit", "Moz", "ms" ], normalize = cached(function(prop) {
            if (emptyStyle = emptyStyle || document.createElement("div").style, "filter" !== (prop = camelize(prop)) && prop in emptyStyle) return prop;
            for (var capName = prop.charAt(0).toUpperCase() + prop.slice(1), i = 0; i < vendorNames.length; i++) {
                var name = vendorNames[i] + capName;
                if (name in emptyStyle) return name;
            }
        });
        function updateStyle(oldVnode, vnode) {
            var data = vnode.data, oldData = oldVnode.data;
            if (!(isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style))) {
                var cur, name, el = vnode.elm, oldStaticStyle = oldData.staticStyle, oldStyleBinding = oldData.normalizedStyle || oldData.style || {}, oldStyle = oldStaticStyle || oldStyleBinding, style = normalizeStyleBinding(vnode.data.style) || {};
                vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;
                var newStyle = function(vnode, checkChild) {
                    var styleData, res = {};
                    if (checkChild) for (var childNode = vnode; childNode.componentInstance; ) (childNode = childNode.componentInstance._vnode) && childNode.data && (styleData = normalizeStyleData(childNode.data)) && extend(res, styleData);
                    (styleData = normalizeStyleData(vnode.data)) && extend(res, styleData);
                    for (var parentNode = vnode; parentNode = parentNode.parent; ) parentNode.data && (styleData = normalizeStyleData(parentNode.data)) && extend(res, styleData);
                    return res;
                }(vnode, !0);
                for (name in oldStyle) isUndef(newStyle[name]) && setProp(el, name, "");
                for (name in newStyle) (cur = newStyle[name]) !== oldStyle[name] && setProp(el, name, null == cur ? "" : cur);
            }
        }
        var style = {
            create: updateStyle,
            update: updateStyle
        }, whitespaceRE = /\s+/;
        function addClass(el, cls) {
            if (cls && (cls = cls.trim())) if (el.classList) cls.indexOf(" ") > -1 ? cls.split(whitespaceRE).forEach(function(c) {
                return el.classList.add(c);
            }) : el.classList.add(cls); else {
                var cur = " " + (el.getAttribute("class") || "") + " ";
                cur.indexOf(" " + cls + " ") < 0 && el.setAttribute("class", (cur + cls).trim());
            }
        }
        function removeClass(el, cls) {
            if (cls && (cls = cls.trim())) if (el.classList) cls.indexOf(" ") > -1 ? cls.split(whitespaceRE).forEach(function(c) {
                return el.classList.remove(c);
            }) : el.classList.remove(cls), el.classList.length || el.removeAttribute("class"); else {
                for (var cur = " " + (el.getAttribute("class") || "") + " ", tar = " " + cls + " "; cur.indexOf(tar) >= 0; ) cur = cur.replace(tar, " ");
                (cur = cur.trim()) ? el.setAttribute("class", cur) : el.removeAttribute("class");
            }
        }
        function resolveTransition(def$$1) {
            if (def$$1) {
                if ("object" == typeof def$$1) {
                    var res = {};
                    return !1 !== def$$1.css && extend(res, autoCssTransition(def$$1.name || "v")), 
                    extend(res, def$$1), res;
                }
                return "string" == typeof def$$1 ? autoCssTransition(def$$1) : void 0;
            }
        }
        var autoCssTransition = cached(function(name) {
            return {
                enterClass: name + "-enter",
                enterToClass: name + "-enter-to",
                enterActiveClass: name + "-enter-active",
                leaveClass: name + "-leave",
                leaveToClass: name + "-leave-to",
                leaveActiveClass: name + "-leave-active"
            };
        }), hasTransition = inBrowser && !isIE9, TRANSITION = "transition", ANIMATION = "animation", transitionProp = "transition", transitionEndEvent = "transitionend", animationProp = "animation", animationEndEvent = "animationend";
        hasTransition && (void 0 === window.ontransitionend && void 0 !== window.onwebkittransitionend && (transitionProp = "WebkitTransition", 
        transitionEndEvent = "webkitTransitionEnd"), void 0 === window.onanimationend && void 0 !== window.onwebkitanimationend && (animationProp = "WebkitAnimation", 
        animationEndEvent = "webkitAnimationEnd"));
        var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : function(fn) {
            return fn();
        };
        function nextFrame(fn) {
            raf(function() {
                raf(fn);
            });
        }
        function addTransitionClass(el, cls) {
            var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
            transitionClasses.indexOf(cls) < 0 && (transitionClasses.push(cls), addClass(el, cls));
        }
        function removeTransitionClass(el, cls) {
            el._transitionClasses && remove(el._transitionClasses, cls), removeClass(el, cls);
        }
        function whenTransitionEnds(el, expectedType, cb) {
            var ref = getTransitionInfo(el, expectedType), type = ref.type, timeout = ref.timeout, propCount = ref.propCount;
            if (!type) return cb();
            var event = type === TRANSITION ? transitionEndEvent : animationEndEvent, ended = 0, end = function() {
                el.removeEventListener(event, onEnd), cb();
            }, onEnd = function(e) {
                e.target === el && ++ended >= propCount && end();
            };
            setTimeout(function() {
                ended < propCount && end();
            }, timeout + 1), el.addEventListener(event, onEnd);
        }
        var transformRE = /\b(transform|all)(,|$)/;
        function getTransitionInfo(el, expectedType) {
            var type, styles = window.getComputedStyle(el), transitionDelays = (styles[transitionProp + "Delay"] || "").split(", "), transitionDurations = (styles[transitionProp + "Duration"] || "").split(", "), transitionTimeout = getTimeout(transitionDelays, transitionDurations), animationDelays = (styles[animationProp + "Delay"] || "").split(", "), animationDurations = (styles[animationProp + "Duration"] || "").split(", "), animationTimeout = getTimeout(animationDelays, animationDurations), timeout = 0, propCount = 0;
            return expectedType === TRANSITION ? transitionTimeout > 0 && (type = TRANSITION, 
            timeout = transitionTimeout, propCount = transitionDurations.length) : expectedType === ANIMATION ? animationTimeout > 0 && (type = ANIMATION, 
            timeout = animationTimeout, propCount = animationDurations.length) : propCount = (type = (timeout = Math.max(transitionTimeout, animationTimeout)) > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null) ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0, 
            {
                type: type,
                timeout: timeout,
                propCount: propCount,
                hasTransform: type === TRANSITION && transformRE.test(styles[transitionProp + "Property"])
            };
        }
        function getTimeout(delays, durations) {
            for (;delays.length < durations.length; ) delays = delays.concat(delays);
            return Math.max.apply(null, durations.map(function(d, i) {
                return toMs(d) + toMs(delays[i]);
            }));
        }
        function toMs(s) {
            return 1e3 * Number(s.slice(0, -1).replace(",", "."));
        }
        function enter(vnode, toggleDisplay) {
            var el = vnode.elm;
            isDef(el._leaveCb) && (el._leaveCb.cancelled = !0, el._leaveCb());
            var data = resolveTransition(vnode.data.transition);
            if (!isUndef(data) && !isDef(el._enterCb) && 1 === el.nodeType) {
                for (var css = data.css, type = data.type, enterClass = data.enterClass, enterToClass = data.enterToClass, enterActiveClass = data.enterActiveClass, appearClass = data.appearClass, appearToClass = data.appearToClass, appearActiveClass = data.appearActiveClass, beforeEnter = data.beforeEnter, enter = data.enter, afterEnter = data.afterEnter, enterCancelled = data.enterCancelled, beforeAppear = data.beforeAppear, appear = data.appear, afterAppear = data.afterAppear, appearCancelled = data.appearCancelled, duration = data.duration, context = activeInstance, transitionNode = activeInstance.$vnode; transitionNode && transitionNode.parent; ) context = (transitionNode = transitionNode.parent).context;
                var isAppear = !context._isMounted || !vnode.isRootInsert;
                if (!isAppear || appear || "" === appear) {
                    var startClass = isAppear && appearClass ? appearClass : enterClass, activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass, toClass = isAppear && appearToClass ? appearToClass : enterToClass, beforeEnterHook = isAppear && beforeAppear || beforeEnter, enterHook = isAppear && "function" == typeof appear ? appear : enter, afterEnterHook = isAppear && afterAppear || afterEnter, enterCancelledHook = isAppear && appearCancelled || enterCancelled, explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);
                    0;
                    var expectsCSS = !1 !== css && !isIE9, userWantsControl = getHookArgumentsLength(enterHook), cb = el._enterCb = once(function() {
                        expectsCSS && (removeTransitionClass(el, toClass), removeTransitionClass(el, activeClass)), 
                        cb.cancelled ? (expectsCSS && removeTransitionClass(el, startClass), enterCancelledHook && enterCancelledHook(el)) : afterEnterHook && afterEnterHook(el), 
                        el._enterCb = null;
                    });
                    vnode.data.show || mergeVNodeHook(vnode, "insert", function() {
                        var parent = el.parentNode, pendingNode = parent && parent._pending && parent._pending[vnode.key];
                        pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb && pendingNode.elm._leaveCb(), 
                        enterHook && enterHook(el, cb);
                    }), beforeEnterHook && beforeEnterHook(el), expectsCSS && (addTransitionClass(el, startClass), 
                    addTransitionClass(el, activeClass), nextFrame(function() {
                        removeTransitionClass(el, startClass), cb.cancelled || (addTransitionClass(el, toClass), 
                        userWantsControl || (isValidDuration(explicitEnterDuration) ? setTimeout(cb, explicitEnterDuration) : whenTransitionEnds(el, type, cb)));
                    })), vnode.data.show && (toggleDisplay && toggleDisplay(), enterHook && enterHook(el, cb)), 
                    expectsCSS || userWantsControl || cb();
                }
            }
        }
        function leave(vnode, rm) {
            var el = vnode.elm;
            isDef(el._enterCb) && (el._enterCb.cancelled = !0, el._enterCb());
            var data = resolveTransition(vnode.data.transition);
            if (isUndef(data) || 1 !== el.nodeType) return rm();
            if (!isDef(el._leaveCb)) {
                var css = data.css, type = data.type, leaveClass = data.leaveClass, leaveToClass = data.leaveToClass, leaveActiveClass = data.leaveActiveClass, beforeLeave = data.beforeLeave, leave = data.leave, afterLeave = data.afterLeave, leaveCancelled = data.leaveCancelled, delayLeave = data.delayLeave, duration = data.duration, expectsCSS = !1 !== css && !isIE9, userWantsControl = getHookArgumentsLength(leave), explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);
                0;
                var cb = el._leaveCb = once(function() {
                    el.parentNode && el.parentNode._pending && (el.parentNode._pending[vnode.key] = null), 
                    expectsCSS && (removeTransitionClass(el, leaveToClass), removeTransitionClass(el, leaveActiveClass)), 
                    cb.cancelled ? (expectsCSS && removeTransitionClass(el, leaveClass), leaveCancelled && leaveCancelled(el)) : (rm(), 
                    afterLeave && afterLeave(el)), el._leaveCb = null;
                });
                delayLeave ? delayLeave(performLeave) : performLeave();
            }
            function performLeave() {
                cb.cancelled || (!vnode.data.show && el.parentNode && ((el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode), 
                beforeLeave && beforeLeave(el), expectsCSS && (addTransitionClass(el, leaveClass), 
                addTransitionClass(el, leaveActiveClass), nextFrame(function() {
                    removeTransitionClass(el, leaveClass), cb.cancelled || (addTransitionClass(el, leaveToClass), 
                    userWantsControl || (isValidDuration(explicitLeaveDuration) ? setTimeout(cb, explicitLeaveDuration) : whenTransitionEnds(el, type, cb)));
                })), leave && leave(el, cb), expectsCSS || userWantsControl || cb());
            }
        }
        function isValidDuration(val) {
            return "number" == typeof val && !isNaN(val);
        }
        function getHookArgumentsLength(fn) {
            if (isUndef(fn)) return !1;
            var invokerFns = fn.fns;
            return isDef(invokerFns) ? getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns) : (fn._length || fn.length) > 1;
        }
        function _enter(_, vnode) {
            !0 !== vnode.data.show && enter(vnode);
        }
        var patch = function(backend) {
            var i, j, cbs = {}, modules = backend.modules, nodeOps = backend.nodeOps;
            for (i = 0; i < hooks.length; ++i) for (cbs[hooks[i]] = [], j = 0; j < modules.length; ++j) isDef(modules[j][hooks[i]]) && cbs[hooks[i]].push(modules[j][hooks[i]]);
            function removeNode(el) {
                var parent = nodeOps.parentNode(el);
                isDef(parent) && nodeOps.removeChild(parent, el);
            }
            function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
                if (isDef(vnode.elm) && isDef(ownerArray) && (vnode = ownerArray[index] = cloneVNode(vnode)), 
                vnode.isRootInsert = !nested, !function(vnode, insertedVnodeQueue, parentElm, refElm) {
                    var i = vnode.data;
                    if (isDef(i)) {
                        var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
                        if (isDef(i = i.hook) && isDef(i = i.init) && i(vnode, !1), isDef(vnode.componentInstance)) return initComponent(vnode, insertedVnodeQueue), 
                        insert(parentElm, vnode.elm, refElm), isTrue(isReactivated) && function(vnode, insertedVnodeQueue, parentElm, refElm) {
                            for (var i, innerNode = vnode; innerNode.componentInstance; ) if (innerNode = innerNode.componentInstance._vnode, 
                            isDef(i = innerNode.data) && isDef(i = i.transition)) {
                                for (i = 0; i < cbs.activate.length; ++i) cbs.activate[i](emptyNode, innerNode);
                                insertedVnodeQueue.push(innerNode);
                                break;
                            }
                            insert(parentElm, vnode.elm, refElm);
                        }(vnode, insertedVnodeQueue, parentElm, refElm), !0;
                    }
                }(vnode, insertedVnodeQueue, parentElm, refElm)) {
                    var data = vnode.data, children = vnode.children, tag = vnode.tag;
                    isDef(tag) ? (vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode), 
                    setScope(vnode), createChildren(vnode, children, insertedVnodeQueue), isDef(data) && invokeCreateHooks(vnode, insertedVnodeQueue), 
                    insert(parentElm, vnode.elm, refElm)) : isTrue(vnode.isComment) ? (vnode.elm = nodeOps.createComment(vnode.text), 
                    insert(parentElm, vnode.elm, refElm)) : (vnode.elm = nodeOps.createTextNode(vnode.text), 
                    insert(parentElm, vnode.elm, refElm));
                }
            }
            function initComponent(vnode, insertedVnodeQueue) {
                isDef(vnode.data.pendingInsert) && (insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert), 
                vnode.data.pendingInsert = null), vnode.elm = vnode.componentInstance.$el, isPatchable(vnode) ? (invokeCreateHooks(vnode, insertedVnodeQueue), 
                setScope(vnode)) : (registerRef(vnode), insertedVnodeQueue.push(vnode));
            }
            function insert(parent, elm, ref$$1) {
                isDef(parent) && (isDef(ref$$1) ? nodeOps.parentNode(ref$$1) === parent && nodeOps.insertBefore(parent, elm, ref$$1) : nodeOps.appendChild(parent, elm));
            }
            function createChildren(vnode, children, insertedVnodeQueue) {
                if (Array.isArray(children)) for (var i = 0; i < children.length; ++i) createElm(children[i], insertedVnodeQueue, vnode.elm, null, !0, children, i); else isPrimitive(vnode.text) && nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
            }
            function isPatchable(vnode) {
                for (;vnode.componentInstance; ) vnode = vnode.componentInstance._vnode;
                return isDef(vnode.tag);
            }
            function invokeCreateHooks(vnode, insertedVnodeQueue) {
                for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) cbs.create[i$1](emptyNode, vnode);
                isDef(i = vnode.data.hook) && (isDef(i.create) && i.create(emptyNode, vnode), isDef(i.insert) && insertedVnodeQueue.push(vnode));
            }
            function setScope(vnode) {
                var i;
                if (isDef(i = vnode.fnScopeId)) nodeOps.setStyleScope(vnode.elm, i); else for (var ancestor = vnode; ancestor; ) isDef(i = ancestor.context) && isDef(i = i.$options._scopeId) && nodeOps.setStyleScope(vnode.elm, i), 
                ancestor = ancestor.parent;
                isDef(i = activeInstance) && i !== vnode.context && i !== vnode.fnContext && isDef(i = i.$options._scopeId) && nodeOps.setStyleScope(vnode.elm, i);
            }
            function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
                for (;startIdx <= endIdx; ++startIdx) createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, !1, vnodes, startIdx);
            }
            function invokeDestroyHook(vnode) {
                var i, j, data = vnode.data;
                if (isDef(data)) for (isDef(i = data.hook) && isDef(i = i.destroy) && i(vnode), 
                i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode);
                if (isDef(i = vnode.children)) for (j = 0; j < vnode.children.length; ++j) invokeDestroyHook(vnode.children[j]);
            }
            function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
                for (;startIdx <= endIdx; ++startIdx) {
                    var ch = vnodes[startIdx];
                    isDef(ch) && (isDef(ch.tag) ? (removeAndInvokeRemoveHook(ch), invokeDestroyHook(ch)) : removeNode(ch.elm));
                }
            }
            function removeAndInvokeRemoveHook(vnode, rm) {
                if (isDef(rm) || isDef(vnode.data)) {
                    var i, listeners = cbs.remove.length + 1;
                    for (isDef(rm) ? rm.listeners += listeners : rm = function(childElm, listeners) {
                        function remove$$1() {
                            0 == --remove$$1.listeners && removeNode(childElm);
                        }
                        return remove$$1.listeners = listeners, remove$$1;
                    }(vnode.elm, listeners), isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data) && removeAndInvokeRemoveHook(i, rm), 
                    i = 0; i < cbs.remove.length; ++i) cbs.remove[i](vnode, rm);
                    isDef(i = vnode.data.hook) && isDef(i = i.remove) ? i(vnode, rm) : rm();
                } else removeNode(vnode.elm);
            }
            function findIdxInOld(node, oldCh, start, end) {
                for (var i = start; i < end; i++) {
                    var c = oldCh[i];
                    if (isDef(c) && sameVnode(node, c)) return i;
                }
            }
            function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index, removeOnly) {
                if (oldVnode !== vnode) {
                    isDef(vnode.elm) && isDef(ownerArray) && (vnode = ownerArray[index] = cloneVNode(vnode));
                    var elm = vnode.elm = oldVnode.elm;
                    if (isTrue(oldVnode.isAsyncPlaceholder)) isDef(vnode.asyncFactory.resolved) ? hydrate(oldVnode.elm, vnode, insertedVnodeQueue) : vnode.isAsyncPlaceholder = !0; else if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) vnode.componentInstance = oldVnode.componentInstance; else {
                        var i, data = vnode.data;
                        isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch) && i(oldVnode, vnode);
                        var oldCh = oldVnode.children, ch = vnode.children;
                        if (isDef(data) && isPatchable(vnode)) {
                            for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
                            isDef(i = data.hook) && isDef(i = i.update) && i(oldVnode, vnode);
                        }
                        isUndef(vnode.text) ? isDef(oldCh) && isDef(ch) ? oldCh !== ch && function(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
                            for (var oldKeyToIdx, idxInOld, vnodeToMove, oldStartIdx = 0, newStartIdx = 0, oldEndIdx = oldCh.length - 1, oldStartVnode = oldCh[0], oldEndVnode = oldCh[oldEndIdx], newEndIdx = newCh.length - 1, newStartVnode = newCh[0], newEndVnode = newCh[newEndIdx], canMove = !removeOnly; oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx; ) isUndef(oldStartVnode) ? oldStartVnode = oldCh[++oldStartIdx] : isUndef(oldEndVnode) ? oldEndVnode = oldCh[--oldEndIdx] : sameVnode(oldStartVnode, newStartVnode) ? (patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx), 
                            oldStartVnode = oldCh[++oldStartIdx], newStartVnode = newCh[++newStartIdx]) : sameVnode(oldEndVnode, newEndVnode) ? (patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx), 
                            oldEndVnode = oldCh[--oldEndIdx], newEndVnode = newCh[--newEndIdx]) : sameVnode(oldStartVnode, newEndVnode) ? (patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx), 
                            canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm)), 
                            oldStartVnode = oldCh[++oldStartIdx], newEndVnode = newCh[--newEndIdx]) : sameVnode(oldEndVnode, newStartVnode) ? (patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx), 
                            canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm), 
                            oldEndVnode = oldCh[--oldEndIdx], newStartVnode = newCh[++newStartIdx]) : (isUndef(oldKeyToIdx) && (oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)), 
                            isUndef(idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)) ? createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, !1, newCh, newStartIdx) : sameVnode(vnodeToMove = oldCh[idxInOld], newStartVnode) ? (patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx), 
                            oldCh[idxInOld] = void 0, canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)) : createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, !1, newCh, newStartIdx), 
                            newStartVnode = newCh[++newStartIdx]);
                            oldStartIdx > oldEndIdx ? addVnodes(parentElm, isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue) : newStartIdx > newEndIdx && removeVnodes(0, oldCh, oldStartIdx, oldEndIdx);
                        }(elm, oldCh, ch, insertedVnodeQueue, removeOnly) : isDef(ch) ? (isDef(oldVnode.text) && nodeOps.setTextContent(elm, ""), 
                        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)) : isDef(oldCh) ? removeVnodes(0, oldCh, 0, oldCh.length - 1) : isDef(oldVnode.text) && nodeOps.setTextContent(elm, "") : oldVnode.text !== vnode.text && nodeOps.setTextContent(elm, vnode.text), 
                        isDef(data) && isDef(i = data.hook) && isDef(i = i.postpatch) && i(oldVnode, vnode);
                    }
                }
            }
            function invokeInsertHook(vnode, queue, initial) {
                if (isTrue(initial) && isDef(vnode.parent)) vnode.parent.data.pendingInsert = queue; else for (var i = 0; i < queue.length; ++i) queue[i].data.hook.insert(queue[i]);
            }
            var isRenderedModule = makeMap("attrs,class,staticClass,staticStyle,key");
            function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
                var i, tag = vnode.tag, data = vnode.data, children = vnode.children;
                if (inVPre = inVPre || data && data.pre, vnode.elm = elm, isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) return vnode.isAsyncPlaceholder = !0, 
                !0;
                if (isDef(data) && (isDef(i = data.hook) && isDef(i = i.init) && i(vnode, !0), isDef(i = vnode.componentInstance))) return initComponent(vnode, insertedVnodeQueue), 
                !0;
                if (isDef(tag)) {
                    if (isDef(children)) if (elm.hasChildNodes()) if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
                        if (i !== elm.innerHTML) return !1;
                    } else {
                        for (var childrenMatch = !0, childNode = elm.firstChild, i$1 = 0; i$1 < children.length; i$1++) {
                            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                                childrenMatch = !1;
                                break;
                            }
                            childNode = childNode.nextSibling;
                        }
                        if (!childrenMatch || childNode) return !1;
                    } else createChildren(vnode, children, insertedVnodeQueue);
                    if (isDef(data)) {
                        var fullInvoke = !1;
                        for (var key in data) if (!isRenderedModule(key)) {
                            fullInvoke = !0, invokeCreateHooks(vnode, insertedVnodeQueue);
                            break;
                        }
                        !fullInvoke && data.class && traverse(data.class);
                    }
                } else elm.data !== vnode.text && (elm.data = vnode.text);
                return !0;
            }
            return function(oldVnode, vnode, hydrating, removeOnly) {
                if (!isUndef(vnode)) {
                    var elm, isInitialPatch = !1, insertedVnodeQueue = [];
                    if (isUndef(oldVnode)) isInitialPatch = !0, createElm(vnode, insertedVnodeQueue); else {
                        var isRealElement = isDef(oldVnode.nodeType);
                        if (!isRealElement && sameVnode(oldVnode, vnode)) patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly); else {
                            if (isRealElement) {
                                if (1 === oldVnode.nodeType && oldVnode.hasAttribute(SSR_ATTR) && (oldVnode.removeAttribute(SSR_ATTR), 
                                hydrating = !0), isTrue(hydrating) && hydrate(oldVnode, vnode, insertedVnodeQueue)) return invokeInsertHook(vnode, insertedVnodeQueue, !0), 
                                oldVnode;
                                elm = oldVnode, oldVnode = new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], void 0, elm);
                            }
                            var oldElm = oldVnode.elm, parentElm = nodeOps.parentNode(oldElm);
                            if (createElm(vnode, insertedVnodeQueue, oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm)), 
                            isDef(vnode.parent)) for (var ancestor = vnode.parent, patchable = isPatchable(vnode); ancestor; ) {
                                for (var i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](ancestor);
                                if (ancestor.elm = vnode.elm, patchable) {
                                    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) cbs.create[i$1](emptyNode, ancestor);
                                    var insert = ancestor.data.hook.insert;
                                    if (insert.merged) for (var i$2 = 1; i$2 < insert.fns.length; i$2++) insert.fns[i$2]();
                                } else registerRef(ancestor);
                                ancestor = ancestor.parent;
                            }
                            isDef(parentElm) ? removeVnodes(0, [ oldVnode ], 0, 0) : isDef(oldVnode.tag) && invokeDestroyHook(oldVnode);
                        }
                    }
                    return invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch), vnode.elm;
                }
                isDef(oldVnode) && invokeDestroyHook(oldVnode);
            };
        }({
            nodeOps: nodeOps,
            modules: [ attrs, klass, events, domProps, style, inBrowser ? {
                create: _enter,
                activate: _enter,
                remove: function(vnode, rm) {
                    !0 !== vnode.data.show ? leave(vnode, rm) : rm();
                }
            } : {} ].concat(baseModules)
        });
        isIE9 && document.addEventListener("selectionchange", function() {
            var el = document.activeElement;
            el && el.vmodel && trigger(el, "input");
        });
        var directive = {
            inserted: function(el, binding, vnode, oldVnode) {
                "select" === vnode.tag ? (oldVnode.elm && !oldVnode.elm._vOptions ? mergeVNodeHook(vnode, "postpatch", function() {
                    directive.componentUpdated(el, binding, vnode);
                }) : setSelected(el, binding, vnode.context), el._vOptions = [].map.call(el.options, getValue)) : ("textarea" === vnode.tag || isTextInputType(el.type)) && (el._vModifiers = binding.modifiers, 
                binding.modifiers.lazy || (el.addEventListener("compositionstart", onCompositionStart), 
                el.addEventListener("compositionend", onCompositionEnd), el.addEventListener("change", onCompositionEnd), 
                isIE9 && (el.vmodel = !0)));
            },
            componentUpdated: function(el, binding, vnode) {
                if ("select" === vnode.tag) {
                    setSelected(el, binding, vnode.context);
                    var prevOptions = el._vOptions, curOptions = el._vOptions = [].map.call(el.options, getValue);
                    if (curOptions.some(function(o, i) {
                        return !looseEqual(o, prevOptions[i]);
                    })) (el.multiple ? binding.value.some(function(v) {
                        return hasNoMatchingOption(v, curOptions);
                    }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions)) && trigger(el, "change");
                }
            }
        };
        function setSelected(el, binding, vm) {
            actuallySetSelected(el, binding, vm), (isIE || isEdge) && setTimeout(function() {
                actuallySetSelected(el, binding, vm);
            }, 0);
        }
        function actuallySetSelected(el, binding, vm) {
            var value = binding.value, isMultiple = el.multiple;
            if (!isMultiple || Array.isArray(value)) {
                for (var selected, option, i = 0, l = el.options.length; i < l; i++) if (option = el.options[i], 
                isMultiple) selected = looseIndexOf(value, getValue(option)) > -1, option.selected !== selected && (option.selected = selected); else if (looseEqual(getValue(option), value)) return void (el.selectedIndex !== i && (el.selectedIndex = i));
                isMultiple || (el.selectedIndex = -1);
            }
        }
        function hasNoMatchingOption(value, options) {
            return options.every(function(o) {
                return !looseEqual(o, value);
            });
        }
        function getValue(option) {
            return "_value" in option ? option._value : option.value;
        }
        function onCompositionStart(e) {
            e.target.composing = !0;
        }
        function onCompositionEnd(e) {
            e.target.composing && (e.target.composing = !1, trigger(e.target, "input"));
        }
        function trigger(el, type) {
            var e = document.createEvent("HTMLEvents");
            e.initEvent(type, !0, !0), el.dispatchEvent(e);
        }
        function locateNode(vnode) {
            return !vnode.componentInstance || vnode.data && vnode.data.transition ? vnode : locateNode(vnode.componentInstance._vnode);
        }
        var platformDirectives = {
            model: directive,
            show: {
                bind: function(el, ref, vnode) {
                    var value = ref.value, transition$$1 = (vnode = locateNode(vnode)).data && vnode.data.transition, originalDisplay = el.__vOriginalDisplay = "none" === el.style.display ? "" : el.style.display;
                    value && transition$$1 ? (vnode.data.show = !0, enter(vnode, function() {
                        el.style.display = originalDisplay;
                    })) : el.style.display = value ? originalDisplay : "none";
                },
                update: function(el, ref, vnode) {
                    var value = ref.value;
                    !value != !ref.oldValue && ((vnode = locateNode(vnode)).data && vnode.data.transition ? (vnode.data.show = !0, 
                    value ? enter(vnode, function() {
                        el.style.display = el.__vOriginalDisplay;
                    }) : leave(vnode, function() {
                        el.style.display = "none";
                    })) : el.style.display = value ? el.__vOriginalDisplay : "none");
                },
                unbind: function(el, binding, vnode, oldVnode, isDestroy) {
                    isDestroy || (el.style.display = el.__vOriginalDisplay);
                }
            }
        }, transitionProps = {
            name: String,
            appear: Boolean,
            css: Boolean,
            mode: String,
            type: String,
            enterClass: String,
            leaveClass: String,
            enterToClass: String,
            leaveToClass: String,
            enterActiveClass: String,
            leaveActiveClass: String,
            appearClass: String,
            appearActiveClass: String,
            appearToClass: String,
            duration: [ Number, String, Object ]
        };
        function getRealChild(vnode) {
            var compOptions = vnode && vnode.componentOptions;
            return compOptions && compOptions.Ctor.options.abstract ? getRealChild(getFirstComponentChild(compOptions.children)) : vnode;
        }
        function extractTransitionData(comp) {
            var data = {}, options = comp.$options;
            for (var key in options.propsData) data[key] = comp[key];
            var listeners = options._parentListeners;
            for (var key$1 in listeners) data[camelize(key$1)] = listeners[key$1];
            return data;
        }
        function placeholder(h, rawChild) {
            if (/\d-keep-alive$/.test(rawChild.tag)) return h("keep-alive", {
                props: rawChild.componentOptions.propsData
            });
        }
        var isNotTextNode = function(c) {
            return c.tag || isAsyncPlaceholder(c);
        }, isVShowDirective = function(d) {
            return "show" === d.name;
        }, Transition = {
            name: "transition",
            props: transitionProps,
            abstract: !0,
            render: function(h) {
                var this$1 = this, children = this.$slots.default;
                if (children && (children = children.filter(isNotTextNode)).length) {
                    0;
                    var mode = this.mode;
                    0;
                    var rawChild = children[0];
                    if (function(vnode) {
                        for (;vnode = vnode.parent; ) if (vnode.data.transition) return !0;
                    }(this.$vnode)) return rawChild;
                    var child = getRealChild(rawChild);
                    if (!child) return rawChild;
                    if (this._leaving) return placeholder(h, rawChild);
                    var id = "__transition-" + this._uid + "-";
                    child.key = null == child.key ? child.isComment ? id + "comment" : id + child.tag : isPrimitive(child.key) ? 0 === String(child.key).indexOf(id) ? child.key : id + child.key : child.key;
                    var data = (child.data || (child.data = {})).transition = extractTransitionData(this), oldRawChild = this._vnode, oldChild = getRealChild(oldRawChild);
                    if (child.data.directives && child.data.directives.some(isVShowDirective) && (child.data.show = !0), 
                    oldChild && oldChild.data && !function(child, oldChild) {
                        return oldChild.key === child.key && oldChild.tag === child.tag;
                    }(child, oldChild) && !isAsyncPlaceholder(oldChild) && (!oldChild.componentInstance || !oldChild.componentInstance._vnode.isComment)) {
                        var oldData = oldChild.data.transition = extend({}, data);
                        if ("out-in" === mode) return this._leaving = !0, mergeVNodeHook(oldData, "afterLeave", function() {
                            this$1._leaving = !1, this$1.$forceUpdate();
                        }), placeholder(h, rawChild);
                        if ("in-out" === mode) {
                            if (isAsyncPlaceholder(child)) return oldRawChild;
                            var delayedLeave, performLeave = function() {
                                delayedLeave();
                            };
                            mergeVNodeHook(data, "afterEnter", performLeave), mergeVNodeHook(data, "enterCancelled", performLeave), 
                            mergeVNodeHook(oldData, "delayLeave", function(leave) {
                                delayedLeave = leave;
                            });
                        }
                    }
                    return rawChild;
                }
            }
        }, props = extend({
            tag: String,
            moveClass: String
        }, transitionProps);
        function callPendingCbs(c) {
            c.elm._moveCb && c.elm._moveCb(), c.elm._enterCb && c.elm._enterCb();
        }
        function recordPosition(c) {
            c.data.newPos = c.elm.getBoundingClientRect();
        }
        function applyTranslation(c) {
            var oldPos = c.data.pos, newPos = c.data.newPos, dx = oldPos.left - newPos.left, dy = oldPos.top - newPos.top;
            if (dx || dy) {
                c.data.moved = !0;
                var s = c.elm.style;
                s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)", s.transitionDuration = "0s";
            }
        }
        delete props.mode;
        var platformComponents = {
            Transition: Transition,
            TransitionGroup: {
                props: props,
                beforeMount: function() {
                    var this$1 = this, update = this._update;
                    this._update = function(vnode, hydrating) {
                        var restoreActiveInstance = setActiveInstance(this$1);
                        this$1.__patch__(this$1._vnode, this$1.kept, !1, !0), this$1._vnode = this$1.kept, 
                        restoreActiveInstance(), update.call(this$1, vnode, hydrating);
                    };
                },
                render: function(h) {
                    for (var tag = this.tag || this.$vnode.data.tag || "span", map = Object.create(null), prevChildren = this.prevChildren = this.children, rawChildren = this.$slots.default || [], children = this.children = [], transitionData = extractTransitionData(this), i = 0; i < rawChildren.length; i++) {
                        var c = rawChildren[i];
                        if (c.tag) if (null != c.key && 0 !== String(c.key).indexOf("__vlist")) children.push(c), 
                        map[c.key] = c, (c.data || (c.data = {})).transition = transitionData; else ;
                    }
                    if (prevChildren) {
                        for (var kept = [], removed = [], i$1 = 0; i$1 < prevChildren.length; i$1++) {
                            var c$1 = prevChildren[i$1];
                            c$1.data.transition = transitionData, c$1.data.pos = c$1.elm.getBoundingClientRect(), 
                            map[c$1.key] ? kept.push(c$1) : removed.push(c$1);
                        }
                        this.kept = h(tag, null, kept), this.removed = removed;
                    }
                    return h(tag, null, children);
                },
                updated: function() {
                    var children = this.prevChildren, moveClass = this.moveClass || (this.name || "v") + "-move";
                    children.length && this.hasMove(children[0].elm, moveClass) && (children.forEach(callPendingCbs), 
                    children.forEach(recordPosition), children.forEach(applyTranslation), this._reflow = document.body.offsetHeight, 
                    children.forEach(function(c) {
                        if (c.data.moved) {
                            var el = c.elm, s = el.style;
                            addTransitionClass(el, moveClass), s.transform = s.WebkitTransform = s.transitionDuration = "", 
                            el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
                                e && e.target !== el || e && !/transform$/.test(e.propertyName) || (el.removeEventListener(transitionEndEvent, cb), 
                                el._moveCb = null, removeTransitionClass(el, moveClass));
                            });
                        }
                    }));
                },
                methods: {
                    hasMove: function(el, moveClass) {
                        if (!hasTransition) return !1;
                        if (this._hasMove) return this._hasMove;
                        var clone = el.cloneNode();
                        el._transitionClasses && el._transitionClasses.forEach(function(cls) {
                            removeClass(clone, cls);
                        }), addClass(clone, moveClass), clone.style.display = "none", this.$el.appendChild(clone);
                        var info = getTransitionInfo(clone);
                        return this.$el.removeChild(clone), this._hasMove = info.hasTransform;
                    }
                }
            }
        };
        Vue.config.mustUseProp = mustUseProp, Vue.config.isReservedTag = isReservedTag, 
        Vue.config.isReservedAttr = isReservedAttr, Vue.config.getTagNamespace = getTagNamespace, 
        Vue.config.isUnknownElement = function(tag) {
            if (!inBrowser) return !0;
            if (isReservedTag(tag)) return !1;
            if (tag = tag.toLowerCase(), null != unknownElementCache[tag]) return unknownElementCache[tag];
            var el = document.createElement(tag);
            return tag.indexOf("-") > -1 ? unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement : unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
        }, extend(Vue.options.directives, platformDirectives), extend(Vue.options.components, platformComponents), 
        Vue.prototype.__patch__ = inBrowser ? patch : noop, Vue.prototype.$mount = function(el, hydrating) {
            return function(vm, el, hydrating) {
                var updateComponent;
                return vm.$el = el, vm.$options.render || (vm.$options.render = createEmptyVNode), 
                callHook(vm, "beforeMount"), updateComponent = function() {
                    vm._update(vm._render(), hydrating);
                }, new Watcher(vm, updateComponent, noop, {
                    before: function() {
                        vm._isMounted && !vm._isDestroyed && callHook(vm, "beforeUpdate");
                    }
                }, !0), hydrating = !1, null == vm.$vnode && (vm._isMounted = !0, callHook(vm, "mounted")), 
                vm;
            }(this, el = el && inBrowser ? query(el) : void 0, hydrating);
        }, inBrowser && setTimeout(function() {
            config.devtools && devtools && devtools.emit("init", Vue);
        }, 0);
        var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g, regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g, buildRegex = cached(function(delimiters) {
            var open = delimiters[0].replace(regexEscapeRE, "\\$&"), close = delimiters[1].replace(regexEscapeRE, "\\$&");
            return new RegExp(open + "((?:.|\\n)+?)" + close, "g");
        });
        var klass$1 = {
            staticKeys: [ "staticClass" ],
            transformNode: function(el, options) {
                options.warn;
                var staticClass = getAndRemoveAttr(el, "class");
                staticClass && (el.staticClass = JSON.stringify(staticClass));
                var classBinding = getBindingAttr(el, "class", !1);
                classBinding && (el.classBinding = classBinding);
            },
            genData: function(el) {
                var data = "";
                return el.staticClass && (data += "staticClass:" + el.staticClass + ","), el.classBinding && (data += "class:" + el.classBinding + ","), 
                data;
            }
        };
        var decoder, style$1 = {
            staticKeys: [ "staticStyle" ],
            transformNode: function(el, options) {
                options.warn;
                var staticStyle = getAndRemoveAttr(el, "style");
                staticStyle && (el.staticStyle = JSON.stringify(parseStyleText(staticStyle)));
                var styleBinding = getBindingAttr(el, "style", !1);
                styleBinding && (el.styleBinding = styleBinding);
            },
            genData: function(el) {
                var data = "";
                return el.staticStyle && (data += "staticStyle:" + el.staticStyle + ","), el.styleBinding && (data += "style:(" + el.styleBinding + "),"), 
                data;
            }
        }, he_decode = function(html) {
            return (decoder = decoder || document.createElement("div")).innerHTML = html, decoder.textContent;
        }, isUnaryTag = makeMap("area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr"), canBeLeftOpenTag = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source"), isNonPhrasingTag = makeMap("address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track"), attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/, dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/, ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + unicodeLetters + "]*", qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")", startTagOpen = new RegExp("^<" + qnameCapture), startTagClose = /^\s*(\/?)>/, endTag = new RegExp("^<\\/" + qnameCapture + "[^>]*>"), doctype = /^<!DOCTYPE [^>]+>/i, comment = /^<!\--/, conditionalComment = /^<!\[/, isPlainTextElement = makeMap("script,style,textarea", !0), reCache = {}, decodingMap = {
            "&lt;": "<",
            "&gt;": ">",
            "&quot;": '"',
            "&amp;": "&",
            "&#10;": "\n",
            "&#9;": "\t",
            "&#39;": "'"
        }, encodedAttr = /&(?:lt|gt|quot|amp|#39);/g, encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g, isIgnoreNewlineTag = makeMap("pre,textarea", !0), shouldIgnoreFirstNewline = function(tag, html) {
            return tag && isIgnoreNewlineTag(tag) && "\n" === html[0];
        };
        function decodeAttr(value, shouldDecodeNewlines) {
            var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
            return value.replace(re, function(match) {
                return decodingMap[match];
            });
        }
        var warn$2, delimiters, transforms, preTransforms, postTransforms, platformIsPreTag, platformMustUseProp, platformGetTagNamespace, onRE = /^@|^v-on:/, dirRE = /^v-|^@|^:/, forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, stripParensRE = /^\(|\)$/g, dynamicArgRE = /^\[.*\]$/, argRE = /:(.*)$/, bindRE = /^:|^\.|^v-bind:/, modifierRE = /\.[^.]+/g, slotRE = /^v-slot(:|$)|^#/, lineBreakRE = /[\r\n]/, whitespaceRE$1 = /\s+/g, decodeHTMLCached = cached(he_decode), emptySlotScopeToken = "_empty_";
        function createASTElement(tag, attrs, parent) {
            return {
                type: 1,
                tag: tag,
                attrsList: attrs,
                attrsMap: makeAttrsMap(attrs),
                rawAttrsMap: {},
                parent: parent,
                children: []
            };
        }
        function parse(template, options) {
            warn$2 = options.warn || baseWarn, platformIsPreTag = options.isPreTag || no, platformMustUseProp = options.mustUseProp || no, 
            platformGetTagNamespace = options.getTagNamespace || no;
            var isReservedTag = options.isReservedTag || no;
            (function(el) {
                return !!el.component || !isReservedTag(el.tag);
            }), transforms = pluckModuleFunction(options.modules, "transformNode"), preTransforms = pluckModuleFunction(options.modules, "preTransformNode"), 
            postTransforms = pluckModuleFunction(options.modules, "postTransformNode"), delimiters = options.delimiters;
            var root, currentParent, stack = [], preserveWhitespace = !1 !== options.preserveWhitespace, whitespaceOption = options.whitespace, inVPre = !1, inPre = !1;
            function closeElement(element) {
                if (trimEndingWhitespace(element), inVPre || element.processed || (element = processElement(element, options)), 
                stack.length || element === root || root.if && (element.elseif || element.else) && addIfCondition(root, {
                    exp: element.elseif,
                    block: element
                }), currentParent && !element.forbidden) if (element.elseif || element.else) el = element, 
                (prev = function(children) {
                    var i = children.length;
                    for (;i--; ) {
                        if (1 === children[i].type) return children[i];
                        children.pop();
                    }
                }(currentParent.children)) && prev.if && addIfCondition(prev, {
                    exp: el.elseif,
                    block: el
                }); else {
                    if (element.slotScope) {
                        var name = element.slotTarget || '"default"';
                        (currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
                    }
                    currentParent.children.push(element), element.parent = currentParent;
                }
                var el, prev;
                element.children = element.children.filter(function(c) {
                    return !c.slotScope;
                }), trimEndingWhitespace(element), element.pre && (inVPre = !1), platformIsPreTag(element.tag) && (inPre = !1);
                for (var i = 0; i < postTransforms.length; i++) postTransforms[i](element, options);
            }
            function trimEndingWhitespace(el) {
                if (!inPre) for (var lastNode; (lastNode = el.children[el.children.length - 1]) && 3 === lastNode.type && " " === lastNode.text; ) el.children.pop();
            }
            return function(html, options) {
                for (var last, lastTag, stack = [], expectHTML = options.expectHTML, isUnaryTag$$1 = options.isUnaryTag || no, canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no, index = 0; html; ) {
                    if (last = html, lastTag && isPlainTextElement(lastTag)) {
                        var endTagLength = 0, stackedTag = lastTag.toLowerCase(), reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp("([\\s\\S]*?)(</" + stackedTag + "[^>]*>)", "i")), rest$1 = html.replace(reStackedTag, function(all, text, endTag) {
                            return endTagLength = endTag.length, isPlainTextElement(stackedTag) || "noscript" === stackedTag || (text = text.replace(/<!\--([\s\S]*?)-->/g, "$1").replace(/<!\[CDATA\[([\s\S]*?)]]>/g, "$1")), 
                            shouldIgnoreFirstNewline(stackedTag, text) && (text = text.slice(1)), options.chars && options.chars(text), 
                            "";
                        });
                        index += html.length - rest$1.length, html = rest$1, parseEndTag(stackedTag, index - endTagLength, index);
                    } else {
                        var textEnd = html.indexOf("<");
                        if (0 === textEnd) {
                            if (comment.test(html)) {
                                var commentEnd = html.indexOf("--\x3e");
                                if (commentEnd >= 0) {
                                    options.shouldKeepComment && options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3), 
                                    advance(commentEnd + 3);
                                    continue;
                                }
                            }
                            if (conditionalComment.test(html)) {
                                var conditionalEnd = html.indexOf("]>");
                                if (conditionalEnd >= 0) {
                                    advance(conditionalEnd + 2);
                                    continue;
                                }
                            }
                            var doctypeMatch = html.match(doctype);
                            if (doctypeMatch) {
                                advance(doctypeMatch[0].length);
                                continue;
                            }
                            var endTagMatch = html.match(endTag);
                            if (endTagMatch) {
                                var curIndex = index;
                                advance(endTagMatch[0].length), parseEndTag(endTagMatch[1], curIndex, index);
                                continue;
                            }
                            var startTagMatch = parseStartTag();
                            if (startTagMatch) {
                                handleStartTag(startTagMatch), shouldIgnoreFirstNewline(startTagMatch.tagName, html) && advance(1);
                                continue;
                            }
                        }
                        var text = void 0, rest = void 0, next = void 0;
                        if (textEnd >= 0) {
                            for (rest = html.slice(textEnd); !(endTag.test(rest) || startTagOpen.test(rest) || comment.test(rest) || conditionalComment.test(rest) || (next = rest.indexOf("<", 1)) < 0); ) textEnd += next, 
                            rest = html.slice(textEnd);
                            text = html.substring(0, textEnd);
                        }
                        textEnd < 0 && (text = html), text && advance(text.length), options.chars && text && options.chars(text, index - text.length, index);
                    }
                    if (html === last) {
                        options.chars && options.chars(html);
                        break;
                    }
                }
                function advance(n) {
                    index += n, html = html.substring(n);
                }
                function parseStartTag() {
                    var start = html.match(startTagOpen);
                    if (start) {
                        var end, attr, match = {
                            tagName: start[1],
                            attrs: [],
                            start: index
                        };
                        for (advance(start[0].length); !(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute)); ) attr.start = index, 
                        advance(attr[0].length), attr.end = index, match.attrs.push(attr);
                        if (end) return match.unarySlash = end[1], advance(end[0].length), match.end = index, 
                        match;
                    }
                }
                function handleStartTag(match) {
                    var tagName = match.tagName, unarySlash = match.unarySlash;
                    expectHTML && ("p" === lastTag && isNonPhrasingTag(tagName) && parseEndTag(lastTag), 
                    canBeLeftOpenTag$$1(tagName) && lastTag === tagName && parseEndTag(tagName));
                    for (var unary = isUnaryTag$$1(tagName) || !!unarySlash, l = match.attrs.length, attrs = new Array(l), i = 0; i < l; i++) {
                        var args = match.attrs[i], value = args[3] || args[4] || args[5] || "", shouldDecodeNewlines = "a" === tagName && "href" === args[1] ? options.shouldDecodeNewlinesForHref : options.shouldDecodeNewlines;
                        attrs[i] = {
                            name: args[1],
                            value: decodeAttr(value, shouldDecodeNewlines)
                        };
                    }
                    unary || (stack.push({
                        tag: tagName,
                        lowerCasedTag: tagName.toLowerCase(),
                        attrs: attrs,
                        start: match.start,
                        end: match.end
                    }), lastTag = tagName), options.start && options.start(tagName, attrs, unary, match.start, match.end);
                }
                function parseEndTag(tagName, start, end) {
                    var pos, lowerCasedTagName;
                    if (null == start && (start = index), null == end && (end = index), tagName) for (lowerCasedTagName = tagName.toLowerCase(), 
                    pos = stack.length - 1; pos >= 0 && stack[pos].lowerCasedTag !== lowerCasedTagName; pos--) ; else pos = 0;
                    if (pos >= 0) {
                        for (var i = stack.length - 1; i >= pos; i--) options.end && options.end(stack[i].tag, start, end);
                        stack.length = pos, lastTag = pos && stack[pos - 1].tag;
                    } else "br" === lowerCasedTagName ? options.start && options.start(tagName, [], !0, start, end) : "p" === lowerCasedTagName && (options.start && options.start(tagName, [], !1, start, end), 
                    options.end && options.end(tagName, start, end));
                }
                parseEndTag();
            }(template, {
                warn: warn$2,
                expectHTML: options.expectHTML,
                isUnaryTag: options.isUnaryTag,
                canBeLeftOpenTag: options.canBeLeftOpenTag,
                shouldDecodeNewlines: options.shouldDecodeNewlines,
                shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
                shouldKeepComment: options.comments,
                outputSourceRange: options.outputSourceRange,
                start: function(tag, attrs, unary, start$1) {
                    var ns = currentParent && currentParent.ns || platformGetTagNamespace(tag);
                    isIE && "svg" === ns && (attrs = function(attrs) {
                        for (var res = [], i = 0; i < attrs.length; i++) {
                            var attr = attrs[i];
                            ieNSBug.test(attr.name) || (attr.name = attr.name.replace(ieNSPrefix, ""), res.push(attr));
                        }
                        return res;
                    }(attrs));
                    var el, element = createASTElement(tag, attrs, currentParent);
                    ns && (element.ns = ns), "style" !== (el = element).tag && ("script" !== el.tag || el.attrsMap.type && "text/javascript" !== el.attrsMap.type) || isServerRendering() || (element.forbidden = !0);
                    for (var i = 0; i < preTransforms.length; i++) element = preTransforms[i](element, options) || element;
                    inVPre || (!function(el) {
                        null != getAndRemoveAttr(el, "v-pre") && (el.pre = !0);
                    }(element), element.pre && (inVPre = !0)), platformIsPreTag(element.tag) && (inPre = !0), 
                    inVPre ? function(el) {
                        var list = el.attrsList, len = list.length;
                        if (len) for (var attrs = el.attrs = new Array(len), i = 0; i < len; i++) attrs[i] = {
                            name: list[i].name,
                            value: JSON.stringify(list[i].value)
                        }, null != list[i].start && (attrs[i].start = list[i].start, attrs[i].end = list[i].end); else el.pre || (el.plain = !0);
                    }(element) : element.processed || (processFor(element), function(el) {
                        var exp = getAndRemoveAttr(el, "v-if");
                        if (exp) el.if = exp, addIfCondition(el, {
                            exp: exp,
                            block: el
                        }); else {
                            null != getAndRemoveAttr(el, "v-else") && (el.else = !0);
                            var elseif = getAndRemoveAttr(el, "v-else-if");
                            elseif && (el.elseif = elseif);
                        }
                    }(element), function(el) {
                        null != getAndRemoveAttr(el, "v-once") && (el.once = !0);
                    }(element)), root || (root = element), unary ? closeElement(element) : (currentParent = element, 
                    stack.push(element));
                },
                end: function(tag, start, end$1) {
                    var element = stack[stack.length - 1];
                    stack.length -= 1, currentParent = stack[stack.length - 1], closeElement(element);
                },
                chars: function(text, start, end) {
                    if (currentParent && (!isIE || "textarea" !== currentParent.tag || currentParent.attrsMap.placeholder !== text)) {
                        var el, res, child, children = currentParent.children;
                        if (text = inPre || text.trim() ? "script" === (el = currentParent).tag || "style" === el.tag ? text : decodeHTMLCached(text) : children.length ? whitespaceOption ? "condense" === whitespaceOption && lineBreakRE.test(text) ? "" : " " : preserveWhitespace ? " " : "" : "") "condense" === whitespaceOption && (text = text.replace(whitespaceRE$1, " ")), 
                        !inVPre && " " !== text && (res = function(text, delimiters) {
                            var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
                            if (tagRE.test(text)) {
                                for (var match, index, tokenValue, tokens = [], rawTokens = [], lastIndex = tagRE.lastIndex = 0; match = tagRE.exec(text); ) {
                                    (index = match.index) > lastIndex && (rawTokens.push(tokenValue = text.slice(lastIndex, index)), 
                                    tokens.push(JSON.stringify(tokenValue)));
                                    var exp = parseFilters(match[1].trim());
                                    tokens.push("_s(" + exp + ")"), rawTokens.push({
                                        "@binding": exp
                                    }), lastIndex = index + match[0].length;
                                }
                                return lastIndex < text.length && (rawTokens.push(tokenValue = text.slice(lastIndex)), 
                                tokens.push(JSON.stringify(tokenValue))), {
                                    expression: tokens.join("+"),
                                    tokens: rawTokens
                                };
                            }
                        }(text, delimiters)) ? child = {
                            type: 2,
                            expression: res.expression,
                            tokens: res.tokens,
                            text: text
                        } : " " === text && children.length && " " === children[children.length - 1].text || (child = {
                            type: 3,
                            text: text
                        }), child && children.push(child);
                    }
                },
                comment: function(text, start, end) {
                    if (currentParent) {
                        var child = {
                            type: 3,
                            text: text,
                            isComment: !0
                        };
                        0, currentParent.children.push(child);
                    }
                }
            }), root;
        }
        function processElement(element, options) {
            var el, ref;
            !function(el) {
                var exp = getBindingAttr(el, "key");
                if (exp) {
                    el.key = exp;
                }
            }(element), element.plain = !element.key && !element.scopedSlots && !element.attrsList.length, 
            (ref = getBindingAttr(el = element, "ref")) && (el.ref = ref, el.refInFor = function(el) {
                for (var parent = el; parent; ) {
                    if (void 0 !== parent.for) return !0;
                    parent = parent.parent;
                }
                return !1;
            }(el)), function(el) {
                var slotScope;
                "template" === el.tag ? (slotScope = getAndRemoveAttr(el, "scope"), el.slotScope = slotScope || getAndRemoveAttr(el, "slot-scope")) : (slotScope = getAndRemoveAttr(el, "slot-scope")) && (el.slotScope = slotScope);
                var slotTarget = getBindingAttr(el, "slot");
                slotTarget && (el.slotTarget = '""' === slotTarget ? '"default"' : slotTarget, el.slotTargetDynamic = !(!el.attrsMap[":slot"] && !el.attrsMap["v-bind:slot"]), 
                "template" === el.tag || el.slotScope || addAttr(el, "slot", slotTarget, function(el, name) {
                    return el.rawAttrsMap[":" + name] || el.rawAttrsMap["v-bind:" + name] || el.rawAttrsMap[name];
                }(el, "slot")));
                if ("template" === el.tag) {
                    var slotBinding = getAndRemoveAttrByRegex(el, slotRE);
                    if (slotBinding) {
                        0;
                        var ref = getSlotName(slotBinding), name = ref.name, dynamic = ref.dynamic;
                        el.slotTarget = name, el.slotTargetDynamic = dynamic, el.slotScope = slotBinding.value || emptySlotScopeToken;
                    }
                } else {
                    var slotBinding$1 = getAndRemoveAttrByRegex(el, slotRE);
                    if (slotBinding$1) {
                        0;
                        var slots = el.scopedSlots || (el.scopedSlots = {}), ref$1 = getSlotName(slotBinding$1), name$1 = ref$1.name, dynamic$1 = ref$1.dynamic, slotContainer = slots[name$1] = createASTElement("template", [], el);
                        slotContainer.slotTarget = name$1, slotContainer.slotTargetDynamic = dynamic$1, 
                        slotContainer.children = el.children.filter(function(c) {
                            if (!c.slotScope) return c.parent = slotContainer, !0;
                        }), slotContainer.slotScope = slotBinding$1.value || emptySlotScopeToken, el.children = [], 
                        el.plain = !1;
                    }
                }
            }(element), function(el) {
                "slot" === el.tag && (el.slotName = getBindingAttr(el, "name"));
            }(element), function(el) {
                var binding;
                (binding = getBindingAttr(el, "is")) && (el.component = binding);
                null != getAndRemoveAttr(el, "inline-template") && (el.inlineTemplate = !0);
            }(element);
            for (var i = 0; i < transforms.length; i++) element = transforms[i](element, options) || element;
            return function(el) {
                var i, l, name, rawName, value, modifiers, syncGen, isDynamic, list = el.attrsList;
                for (i = 0, l = list.length; i < l; i++) {
                    if (name = rawName = list[i].name, value = list[i].value, dirRE.test(name)) if (el.hasBindings = !0, 
                    (modifiers = parseModifiers(name.replace(dirRE, ""))) && (name = name.replace(modifierRE, "")), 
                    bindRE.test(name)) name = name.replace(bindRE, ""), value = parseFilters(value), 
                    (isDynamic = dynamicArgRE.test(name)) && (name = name.slice(1, -1)), modifiers && (modifiers.prop && !isDynamic && "innerHtml" === (name = camelize(name)) && (name = "innerHTML"), 
                    modifiers.camel && !isDynamic && (name = camelize(name)), modifiers.sync && (syncGen = genAssignmentCode(value, "$event"), 
                    isDynamic ? addHandler(el, '"update:"+(' + name + ")", syncGen, null, !1, 0, list[i], !0) : (addHandler(el, "update:" + camelize(name), syncGen, null, !1, 0, list[i]), 
                    hyphenate(name) !== camelize(name) && addHandler(el, "update:" + hyphenate(name), syncGen, null, !1, 0, list[i])))), 
                    modifiers && modifiers.prop || !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name) ? addProp(el, name, value, list[i], isDynamic) : addAttr(el, name, value, list[i], isDynamic); else if (onRE.test(name)) name = name.replace(onRE, ""), 
                    (isDynamic = dynamicArgRE.test(name)) && (name = name.slice(1, -1)), addHandler(el, name, value, modifiers, !1, 0, list[i], isDynamic); else {
                        var argMatch = (name = name.replace(dirRE, "")).match(argRE), arg = argMatch && argMatch[1];
                        isDynamic = !1, arg && (name = name.slice(0, -(arg.length + 1)), dynamicArgRE.test(arg) && (arg = arg.slice(1, -1), 
                        isDynamic = !0)), addDirective(el, name, rawName, value, arg, isDynamic, modifiers, list[i]);
                    } else addAttr(el, name, JSON.stringify(value), list[i]), !el.component && "muted" === name && platformMustUseProp(el.tag, el.attrsMap.type, name) && addProp(el, name, "true", list[i]);
                }
            }(element), element;
        }
        function processFor(el) {
            var exp;
            if (exp = getAndRemoveAttr(el, "v-for")) {
                var res = function(exp) {
                    var inMatch = exp.match(forAliasRE);
                    if (!inMatch) return;
                    var res = {};
                    res.for = inMatch[2].trim();
                    var alias = inMatch[1].trim().replace(stripParensRE, ""), iteratorMatch = alias.match(forIteratorRE);
                    iteratorMatch ? (res.alias = alias.replace(forIteratorRE, "").trim(), res.iterator1 = iteratorMatch[1].trim(), 
                    iteratorMatch[2] && (res.iterator2 = iteratorMatch[2].trim())) : res.alias = alias;
                    return res;
                }(exp);
                res && extend(el, res);
            }
        }
        function addIfCondition(el, condition) {
            el.ifConditions || (el.ifConditions = []), el.ifConditions.push(condition);
        }
        function getSlotName(binding) {
            var name = binding.name.replace(slotRE, "");
            return name || "#" !== binding.name[0] && (name = "default"), dynamicArgRE.test(name) ? {
                name: name.slice(1, -1),
                dynamic: !0
            } : {
                name: '"' + name + '"',
                dynamic: !1
            };
        }
        function parseModifiers(name) {
            var match = name.match(modifierRE);
            if (match) {
                var ret = {};
                return match.forEach(function(m) {
                    ret[m.slice(1)] = !0;
                }), ret;
            }
        }
        function makeAttrsMap(attrs) {
            for (var map = {}, i = 0, l = attrs.length; i < l; i++) map[attrs[i].name] = attrs[i].value;
            return map;
        }
        var ieNSBug = /^xmlns:NS\d+/, ieNSPrefix = /^NS\d+:/;
        function cloneASTElement(el) {
            return createASTElement(el.tag, el.attrsList.slice(), el.parent);
        }
        var modules$1 = [ klass$1, style$1, {
            preTransformNode: function(el, options) {
                if ("input" === el.tag) {
                    var typeBinding, map = el.attrsMap;
                    if (!map["v-model"]) return;
                    if ((map[":type"] || map["v-bind:type"]) && (typeBinding = getBindingAttr(el, "type")), 
                    map.type || typeBinding || !map["v-bind"] || (typeBinding = "(" + map["v-bind"] + ").type"), 
                    typeBinding) {
                        var ifCondition = getAndRemoveAttr(el, "v-if", !0), ifConditionExtra = ifCondition ? "&&(" + ifCondition + ")" : "", hasElse = null != getAndRemoveAttr(el, "v-else", !0), elseIfCondition = getAndRemoveAttr(el, "v-else-if", !0), branch0 = cloneASTElement(el);
                        processFor(branch0), addRawAttr(branch0, "type", "checkbox"), processElement(branch0, options), 
                        branch0.processed = !0, branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra, 
                        addIfCondition(branch0, {
                            exp: branch0.if,
                            block: branch0
                        });
                        var branch1 = cloneASTElement(el);
                        getAndRemoveAttr(branch1, "v-for", !0), addRawAttr(branch1, "type", "radio"), processElement(branch1, options), 
                        addIfCondition(branch0, {
                            exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
                            block: branch1
                        });
                        var branch2 = cloneASTElement(el);
                        return getAndRemoveAttr(branch2, "v-for", !0), addRawAttr(branch2, ":type", typeBinding), 
                        processElement(branch2, options), addIfCondition(branch0, {
                            exp: ifCondition,
                            block: branch2
                        }), hasElse ? branch0.else = !0 : elseIfCondition && (branch0.elseif = elseIfCondition), 
                        branch0;
                    }
                }
            }
        } ];
        var isStaticKey, isPlatformReservedTag, baseOptions = {
            expectHTML: !0,
            modules: modules$1,
            directives: {
                model: function(el, dir, _warn) {
                    _warn;
                    var value = dir.value, modifiers = dir.modifiers, tag = el.tag, type = el.attrsMap.type;
                    if (el.component) return genComponentModel(el, value, modifiers), !1;
                    if ("select" === tag) !function(el, value, modifiers) {
                        var code = 'var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return ' + (modifiers && modifiers.number ? "_n(val)" : "val") + "});";
                        code = code + " " + genAssignmentCode(value, "$event.target.multiple ? $$selectedVal : $$selectedVal[0]"), 
                        addHandler(el, "change", code, null, !0);
                    }(el, value, modifiers); else if ("input" === tag && "checkbox" === type) !function(el, value, modifiers) {
                        var number = modifiers && modifiers.number, valueBinding = getBindingAttr(el, "value") || "null", trueValueBinding = getBindingAttr(el, "true-value") || "true", falseValueBinding = getBindingAttr(el, "false-value") || "false";
                        addProp(el, "checked", "Array.isArray(" + value + ")?_i(" + value + "," + valueBinding + ")>-1" + ("true" === trueValueBinding ? ":(" + value + ")" : ":_q(" + value + "," + trueValueBinding + ")")), 
                        addHandler(el, "change", "var $$a=" + value + ",$$el=$event.target,$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");if(Array.isArray($$a)){var $$v=" + (number ? "_n(" + valueBinding + ")" : valueBinding) + ",$$i=_i($$a,$$v);if($$el.checked){$$i<0&&(" + genAssignmentCode(value, "$$a.concat([$$v])") + ")}else{$$i>-1&&(" + genAssignmentCode(value, "$$a.slice(0,$$i).concat($$a.slice($$i+1))") + ")}}else{" + genAssignmentCode(value, "$$c") + "}", null, !0);
                    }(el, value, modifiers); else if ("input" === tag && "radio" === type) !function(el, value, modifiers) {
                        var number = modifiers && modifiers.number, valueBinding = getBindingAttr(el, "value") || "null";
                        addProp(el, "checked", "_q(" + value + "," + (valueBinding = number ? "_n(" + valueBinding + ")" : valueBinding) + ")"), 
                        addHandler(el, "change", genAssignmentCode(value, valueBinding), null, !0);
                    }(el, value, modifiers); else if ("input" === tag || "textarea" === tag) !function(el, value, modifiers) {
                        var type = el.attrsMap.type, ref = modifiers || {}, lazy = ref.lazy, number = ref.number, trim = ref.trim, needCompositionGuard = !lazy && "range" !== type, event = lazy ? "change" : "range" === type ? RANGE_TOKEN : "input", valueExpression = "$event.target.value";
                        trim && (valueExpression = "$event.target.value.trim()"), number && (valueExpression = "_n(" + valueExpression + ")");
                        var code = genAssignmentCode(value, valueExpression);
                        needCompositionGuard && (code = "if($event.target.composing)return;" + code), addProp(el, "value", "(" + value + ")"), 
                        addHandler(el, event, code, null, !0), (trim || number) && addHandler(el, "blur", "$forceUpdate()");
                    }(el, value, modifiers); else if (!config.isReservedTag(tag)) return genComponentModel(el, value, modifiers), 
                    !1;
                    return !0;
                },
                text: function(el, dir) {
                    dir.value && addProp(el, "textContent", "_s(" + dir.value + ")", dir);
                },
                html: function(el, dir) {
                    dir.value && addProp(el, "innerHTML", "_s(" + dir.value + ")", dir);
                }
            },
            isPreTag: function(tag) {
                return "pre" === tag;
            },
            isUnaryTag: isUnaryTag,
            mustUseProp: mustUseProp,
            canBeLeftOpenTag: canBeLeftOpenTag,
            isReservedTag: isReservedTag,
            getTagNamespace: getTagNamespace,
            staticKeys: function(modules) {
                return modules.reduce(function(keys, m) {
                    return keys.concat(m.staticKeys || []);
                }, []).join(",");
            }(modules$1)
        }, genStaticKeysCached = cached(function(keys) {
            return makeMap("type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap" + (keys ? "," + keys : ""));
        });
        function optimize(root, options) {
            root && (isStaticKey = genStaticKeysCached(options.staticKeys || ""), isPlatformReservedTag = options.isReservedTag || no, 
            function markStatic$1(node) {
                node.static = function(node) {
                    if (2 === node.type) return !1;
                    if (3 === node.type) return !0;
                    return !(!node.pre && (node.hasBindings || node.if || node.for || isBuiltInTag(node.tag) || !isPlatformReservedTag(node.tag) || function(node) {
                        for (;node.parent; ) {
                            if ("template" !== (node = node.parent).tag) return !1;
                            if (node.for) return !0;
                        }
                        return !1;
                    }(node) || !Object.keys(node).every(isStaticKey)));
                }(node);
                if (1 === node.type) {
                    if (!isPlatformReservedTag(node.tag) && "slot" !== node.tag && null == node.attrsMap["inline-template"]) return;
                    for (var i = 0, l = node.children.length; i < l; i++) {
                        var child = node.children[i];
                        markStatic$1(child), child.static || (node.static = !1);
                    }
                    if (node.ifConditions) for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
                        var block = node.ifConditions[i$1].block;
                        markStatic$1(block), block.static || (node.static = !1);
                    }
                }
            }(root), function markStaticRoots(node, isInFor) {
                if (1 === node.type) {
                    if ((node.static || node.once) && (node.staticInFor = isInFor), node.static && node.children.length && (1 !== node.children.length || 3 !== node.children[0].type)) return void (node.staticRoot = !0);
                    if (node.staticRoot = !1, node.children) for (var i = 0, l = node.children.length; i < l; i++) markStaticRoots(node.children[i], isInFor || !!node.for);
                    if (node.ifConditions) for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) markStaticRoots(node.ifConditions[i$1].block, isInFor);
                }
            }(root, !1));
        }
        var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/, fnInvokeRE = /\([^)]*?\);*$/, simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/, keyCodes = {
            esc: 27,
            tab: 9,
            enter: 13,
            space: 32,
            up: 38,
            left: 37,
            right: 39,
            down: 40,
            delete: [ 8, 46 ]
        }, keyNames = {
            esc: [ "Esc", "Escape" ],
            tab: "Tab",
            enter: "Enter",
            space: [ " ", "Spacebar" ],
            up: [ "Up", "ArrowUp" ],
            left: [ "Left", "ArrowLeft" ],
            right: [ "Right", "ArrowRight" ],
            down: [ "Down", "ArrowDown" ],
            delete: [ "Backspace", "Delete", "Del" ]
        }, genGuard = function(condition) {
            return "if(" + condition + ")return null;";
        }, modifierCode = {
            stop: "$event.stopPropagation();",
            prevent: "$event.preventDefault();",
            self: genGuard("$event.target !== $event.currentTarget"),
            ctrl: genGuard("!$event.ctrlKey"),
            shift: genGuard("!$event.shiftKey"),
            alt: genGuard("!$event.altKey"),
            meta: genGuard("!$event.metaKey"),
            left: genGuard("'button' in $event && $event.button !== 0"),
            middle: genGuard("'button' in $event && $event.button !== 1"),
            right: genGuard("'button' in $event && $event.button !== 2")
        };
        function genHandlers(events, isNative) {
            var prefix = isNative ? "nativeOn:" : "on:", staticHandlers = "", dynamicHandlers = "";
            for (var name in events) {
                var handlerCode = genHandler(events[name]);
                events[name] && events[name].dynamic ? dynamicHandlers += name + "," + handlerCode + "," : staticHandlers += '"' + name + '":' + handlerCode + ",";
            }
            return staticHandlers = "{" + staticHandlers.slice(0, -1) + "}", dynamicHandlers ? prefix + "_d(" + staticHandlers + ",[" + dynamicHandlers.slice(0, -1) + "])" : prefix + staticHandlers;
        }
        function genHandler(handler) {
            if (!handler) return "function(){}";
            if (Array.isArray(handler)) return "[" + handler.map(function(handler) {
                return genHandler(handler);
            }).join(",") + "]";
            var isMethodPath = simplePathRE.test(handler.value), isFunctionExpression = fnExpRE.test(handler.value), isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, ""));
            if (handler.modifiers) {
                var code = "", genModifierCode = "", keys = [];
                for (var key in handler.modifiers) if (modifierCode[key]) genModifierCode += modifierCode[key], 
                keyCodes[key] && keys.push(key); else if ("exact" === key) {
                    var modifiers = handler.modifiers;
                    genModifierCode += genGuard([ "ctrl", "shift", "alt", "meta" ].filter(function(keyModifier) {
                        return !modifiers[keyModifier];
                    }).map(function(keyModifier) {
                        return "$event." + keyModifier + "Key";
                    }).join("||"));
                } else keys.push(key);
                return keys.length && (code += function(keys) {
                    return "if(!$event.type.indexOf('key')&&" + keys.map(genFilterCode).join("&&") + ")return null;";
                }(keys)), genModifierCode && (code += genModifierCode), "function($event){" + code + (isMethodPath ? "return " + handler.value + "($event)" : isFunctionExpression ? "return (" + handler.value + ")($event)" : isFunctionInvocation ? "return " + handler.value : handler.value) + "}";
            }
            return isMethodPath || isFunctionExpression ? handler.value : "function($event){" + (isFunctionInvocation ? "return " + handler.value : handler.value) + "}";
        }
        function genFilterCode(key) {
            var keyVal = parseInt(key, 10);
            if (keyVal) return "$event.keyCode!==" + keyVal;
            var keyCode = keyCodes[key], keyName = keyNames[key];
            return "_k($event.keyCode," + JSON.stringify(key) + "," + JSON.stringify(keyCode) + ",$event.key," + JSON.stringify(keyName) + ")";
        }
        var baseDirectives = {
            on: function(el, dir) {
                el.wrapListeners = function(code) {
                    return "_g(" + code + "," + dir.value + ")";
                };
            },
            bind: function(el, dir) {
                el.wrapData = function(code) {
                    return "_b(" + code + ",'" + el.tag + "'," + dir.value + "," + (dir.modifiers && dir.modifiers.prop ? "true" : "false") + (dir.modifiers && dir.modifiers.sync ? ",true" : "") + ")";
                };
            },
            cloak: noop
        }, CodegenState = function(options) {
            this.options = options, this.warn = options.warn || baseWarn, this.transforms = pluckModuleFunction(options.modules, "transformCode"), 
            this.dataGenFns = pluckModuleFunction(options.modules, "genData"), this.directives = extend(extend({}, baseDirectives), options.directives);
            var isReservedTag = options.isReservedTag || no;
            this.maybeComponent = function(el) {
                return !!el.component || !isReservedTag(el.tag);
            }, this.onceId = 0, this.staticRenderFns = [], this.pre = !1;
        };
        function generate(ast, options) {
            var state = new CodegenState(options);
            return {
                render: "with(this){return " + (ast ? genElement(ast, state) : '_c("div")') + "}",
                staticRenderFns: state.staticRenderFns
            };
        }
        function genElement(el, state) {
            if (el.parent && (el.pre = el.pre || el.parent.pre), el.staticRoot && !el.staticProcessed) return genStatic(el, state);
            if (el.once && !el.onceProcessed) return genOnce(el, state);
            if (el.for && !el.forProcessed) return genFor(el, state);
            if (el.if && !el.ifProcessed) return genIf(el, state);
            if ("template" !== el.tag || el.slotTarget || state.pre) {
                if ("slot" === el.tag) return function(el, state) {
                    var slotName = el.slotName || '"default"', children = genChildren(el, state), res = "_t(" + slotName + (children ? "," + children : ""), attrs = el.attrs || el.dynamicAttrs ? genProps((el.attrs || []).concat(el.dynamicAttrs || []).map(function(attr) {
                        return {
                            name: camelize(attr.name),
                            value: attr.value,
                            dynamic: attr.dynamic
                        };
                    })) : null, bind$$1 = el.attrsMap["v-bind"];
                    !attrs && !bind$$1 || children || (res += ",null");
                    attrs && (res += "," + attrs);
                    bind$$1 && (res += (attrs ? "" : ",null") + "," + bind$$1);
                    return res + ")";
                }(el, state);
                var code;
                if (el.component) code = function(componentName, el, state) {
                    var children = el.inlineTemplate ? null : genChildren(el, state, !0);
                    return "_c(" + componentName + "," + genData$2(el, state) + (children ? "," + children : "") + ")";
                }(el.component, el, state); else {
                    var data;
                    (!el.plain || el.pre && state.maybeComponent(el)) && (data = genData$2(el, state));
                    var children = el.inlineTemplate ? null : genChildren(el, state, !0);
                    code = "_c('" + el.tag + "'" + (data ? "," + data : "") + (children ? "," + children : "") + ")";
                }
                for (var i = 0; i < state.transforms.length; i++) code = state.transforms[i](el, code);
                return code;
            }
            return genChildren(el, state) || "void 0";
        }
        function genStatic(el, state) {
            el.staticProcessed = !0;
            var originalPreState = state.pre;
            return el.pre && (state.pre = el.pre), state.staticRenderFns.push("with(this){return " + genElement(el, state) + "}"), 
            state.pre = originalPreState, "_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ",true" : "") + ")";
        }
        function genOnce(el, state) {
            if (el.onceProcessed = !0, el.if && !el.ifProcessed) return genIf(el, state);
            if (el.staticInFor) {
                for (var key = "", parent = el.parent; parent; ) {
                    if (parent.for) {
                        key = parent.key;
                        break;
                    }
                    parent = parent.parent;
                }
                return key ? "_o(" + genElement(el, state) + "," + state.onceId++ + "," + key + ")" : genElement(el, state);
            }
            return genStatic(el, state);
        }
        function genIf(el, state, altGen, altEmpty) {
            return el.ifProcessed = !0, function genIfConditions(conditions, state, altGen, altEmpty) {
                if (!conditions.length) return altEmpty || "_e()";
                var condition = conditions.shift();
                return condition.exp ? "(" + condition.exp + ")?" + genTernaryExp(condition.block) + ":" + genIfConditions(conditions, state, altGen, altEmpty) : "" + genTernaryExp(condition.block);
                function genTernaryExp(el) {
                    return altGen ? altGen(el, state) : el.once ? genOnce(el, state) : genElement(el, state);
                }
            }(el.ifConditions.slice(), state, altGen, altEmpty);
        }
        function genFor(el, state, altGen, altHelper) {
            var exp = el.for, alias = el.alias, iterator1 = el.iterator1 ? "," + el.iterator1 : "", iterator2 = el.iterator2 ? "," + el.iterator2 : "";
            return el.forProcessed = !0, (altHelper || "_l") + "((" + exp + "),function(" + alias + iterator1 + iterator2 + "){return " + (altGen || genElement)(el, state) + "})";
        }
        function genData$2(el, state) {
            var data = "{", dirs = function(el, state) {
                var dirs = el.directives;
                if (!dirs) return;
                var i, l, dir, needRuntime, res = "directives:[", hasRuntime = !1;
                for (i = 0, l = dirs.length; i < l; i++) {
                    dir = dirs[i], needRuntime = !0;
                    var gen = state.directives[dir.name];
                    gen && (needRuntime = !!gen(el, dir, state.warn)), needRuntime && (hasRuntime = !0, 
                    res += '{name:"' + dir.name + '",rawName:"' + dir.rawName + '"' + (dir.value ? ",value:(" + dir.value + "),expression:" + JSON.stringify(dir.value) : "") + (dir.arg ? ",arg:" + (dir.isDynamicArg ? dir.arg : '"' + dir.arg + '"') : "") + (dir.modifiers ? ",modifiers:" + JSON.stringify(dir.modifiers) : "") + "},");
                }
                if (hasRuntime) return res.slice(0, -1) + "]";
            }(el, state);
            dirs && (data += dirs + ","), el.key && (data += "key:" + el.key + ","), el.ref && (data += "ref:" + el.ref + ","), 
            el.refInFor && (data += "refInFor:true,"), el.pre && (data += "pre:true,"), el.component && (data += 'tag:"' + el.tag + '",');
            for (var i = 0; i < state.dataGenFns.length; i++) data += state.dataGenFns[i](el);
            if (el.attrs && (data += "attrs:" + genProps(el.attrs) + ","), el.props && (data += "domProps:" + genProps(el.props) + ","), 
            el.events && (data += genHandlers(el.events, !1) + ","), el.nativeEvents && (data += genHandlers(el.nativeEvents, !0) + ","), 
            el.slotTarget && !el.slotScope && (data += "slot:" + el.slotTarget + ","), el.scopedSlots && (data += function(el, slots, state) {
                var needsForceUpdate = Object.keys(slots).some(function(key) {
                    var slot = slots[key];
                    return slot.slotTargetDynamic || slot.if || slot.for || containsSlotChild(slot);
                });
                if (!needsForceUpdate) for (var parent = el.parent; parent; ) {
                    if (parent.slotScope && parent.slotScope !== emptySlotScopeToken) {
                        needsForceUpdate = !0;
                        break;
                    }
                    parent = parent.parent;
                }
                return "scopedSlots:_u([" + Object.keys(slots).map(function(key) {
                    return genScopedSlot(slots[key], state);
                }).join(",") + "]" + (needsForceUpdate ? ",true" : "") + ")";
            }(el, el.scopedSlots, state) + ","), el.model && (data += "model:{value:" + el.model.value + ",callback:" + el.model.callback + ",expression:" + el.model.expression + "},"), 
            el.inlineTemplate) {
                var inlineTemplate = function(el, state) {
                    var ast = el.children[0];
                    0;
                    if (ast && 1 === ast.type) {
                        var inlineRenderFns = generate(ast, state.options);
                        return "inlineTemplate:{render:function(){" + inlineRenderFns.render + "},staticRenderFns:[" + inlineRenderFns.staticRenderFns.map(function(code) {
                            return "function(){" + code + "}";
                        }).join(",") + "]}";
                    }
                }(el, state);
                inlineTemplate && (data += inlineTemplate + ",");
            }
            return data = data.replace(/,$/, "") + "}", el.dynamicAttrs && (data = "_b(" + data + ',"' + el.tag + '",' + genProps(el.dynamicAttrs) + ")"), 
            el.wrapData && (data = el.wrapData(data)), el.wrapListeners && (data = el.wrapListeners(data)), 
            data;
        }
        function containsSlotChild(el) {
            return 1 === el.type && ("slot" === el.tag || el.children.some(containsSlotChild));
        }
        function genScopedSlot(el, state) {
            var isLegacySyntax = el.attrsMap["slot-scope"];
            if (el.if && !el.ifProcessed && !isLegacySyntax) return genIf(el, state, genScopedSlot, "null");
            if (el.for && !el.forProcessed) return genFor(el, state, genScopedSlot);
            var slotScope = el.slotScope === emptySlotScopeToken ? "" : String(el.slotScope), fn = "function(" + slotScope + "){return " + ("template" === el.tag ? el.if && isLegacySyntax ? "(" + el.if + ")?" + (genChildren(el, state) || "undefined") + ":undefined" : genChildren(el, state) || "undefined" : genElement(el, state)) + "}", reverseProxy = slotScope ? "" : ",proxy:true";
            return "{key:" + (el.slotTarget || '"default"') + ",fn:" + fn + reverseProxy + "}";
        }
        function genChildren(el, state, checkSkip, altGenElement, altGenNode) {
            var children = el.children;
            if (children.length) {
                var el$1 = children[0];
                if (1 === children.length && el$1.for && "template" !== el$1.tag && "slot" !== el$1.tag) {
                    var normalizationType = checkSkip ? state.maybeComponent(el$1) ? ",1" : ",0" : "";
                    return "" + (altGenElement || genElement)(el$1, state) + normalizationType;
                }
                var normalizationType$1 = checkSkip ? function(children, maybeComponent) {
                    for (var res = 0, i = 0; i < children.length; i++) {
                        var el = children[i];
                        if (1 === el.type) {
                            if (needsNormalization(el) || el.ifConditions && el.ifConditions.some(function(c) {
                                return needsNormalization(c.block);
                            })) {
                                res = 2;
                                break;
                            }
                            (maybeComponent(el) || el.ifConditions && el.ifConditions.some(function(c) {
                                return maybeComponent(c.block);
                            })) && (res = 1);
                        }
                    }
                    return res;
                }(children, state.maybeComponent) : 0, gen = altGenNode || genNode;
                return "[" + children.map(function(c) {
                    return gen(c, state);
                }).join(",") + "]" + (normalizationType$1 ? "," + normalizationType$1 : "");
            }
        }
        function needsNormalization(el) {
            return void 0 !== el.for || "template" === el.tag || "slot" === el.tag;
        }
        function genNode(node, state) {
            return 1 === node.type ? genElement(node, state) : 3 === node.type && node.isComment ? (comment = node, 
            "_e(" + JSON.stringify(comment.text) + ")") : "_v(" + (2 === (text = node).type ? text.expression : transformSpecialNewlines(JSON.stringify(text.text))) + ")";
            var text, comment;
        }
        function genProps(props) {
            for (var staticProps = "", dynamicProps = "", i = 0; i < props.length; i++) {
                var prop = props[i], value = transformSpecialNewlines(prop.value);
                prop.dynamic ? dynamicProps += prop.name + "," + value + "," : staticProps += '"' + prop.name + '":' + value + ",";
            }
            return staticProps = "{" + staticProps.slice(0, -1) + "}", dynamicProps ? "_d(" + staticProps + ",[" + dynamicProps.slice(0, -1) + "])" : staticProps;
        }
        function transformSpecialNewlines(text) {
            return text.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
        }
        new RegExp("\\b" + "do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,super,throw,while,yield,delete,export,import,return,switch,default,extends,finally,continue,debugger,function,arguments".split(",").join("\\b|\\b") + "\\b"), 
        new RegExp("\\b" + "delete,typeof,void".split(",").join("\\s*\\([^\\)]*\\)|\\b") + "\\s*\\([^\\)]*\\)");
        function createFunction(code, errors) {
            try {
                return new Function(code);
            } catch (err) {
                return errors.push({
                    err: err,
                    code: code
                }), noop;
            }
        }
        function createCompileToFunctionFn(compile) {
            var cache = Object.create(null);
            return function(template, options, vm) {
                (options = extend({}, options)).warn;
                delete options.warn;
                var key = options.delimiters ? String(options.delimiters) + template : template;
                if (cache[key]) return cache[key];
                var compiled = compile(template, options);
                var res = {}, fnGenErrors = [];
                return res.render = createFunction(compiled.render, fnGenErrors), res.staticRenderFns = compiled.staticRenderFns.map(function(code) {
                    return createFunction(code, fnGenErrors);
                }), cache[key] = res;
            };
        }
        var baseCompile, div, ref$1 = (baseCompile = function(template, options) {
            var ast = parse(template.trim(), options);
            !1 !== options.optimize && optimize(ast, options);
            var code = generate(ast, options);
            return {
                ast: ast,
                render: code.render,
                staticRenderFns: code.staticRenderFns
            };
        }, function(baseOptions) {
            function compile(template, options) {
                var finalOptions = Object.create(baseOptions), errors = [], tips = [];
                if (options) for (var key in options.modules && (finalOptions.modules = (baseOptions.modules || []).concat(options.modules)), 
                options.directives && (finalOptions.directives = extend(Object.create(baseOptions.directives || null), options.directives)), 
                options) "modules" !== key && "directives" !== key && (finalOptions[key] = options[key]);
                finalOptions.warn = function(msg, range, tip) {
                    (tip ? tips : errors).push(msg);
                };
                var compiled = baseCompile(template.trim(), finalOptions);
                return compiled.errors = errors, compiled.tips = tips, compiled;
            }
            return {
                compile: compile,
                compileToFunctions: createCompileToFunctionFn(compile)
            };
        })(baseOptions), compileToFunctions = (ref$1.compile, ref$1.compileToFunctions);
        function getShouldDecode(href) {
            return (div = div || document.createElement("div")).innerHTML = href ? '<a href="\n"/>' : '<div a="\n"/>', 
            div.innerHTML.indexOf("&#10;") > 0;
        }
        var shouldDecodeNewlines = !!inBrowser && getShouldDecode(!1), shouldDecodeNewlinesForHref = !!inBrowser && getShouldDecode(!0), idToTemplate = cached(function(id) {
            var el = query(id);
            return el && el.innerHTML;
        }), mount = Vue.prototype.$mount;
        Vue.prototype.$mount = function(el, hydrating) {
            if ((el = el && query(el)) === document.body || el === document.documentElement) return this;
            var options = this.$options;
            if (!options.render) {
                var template = options.template;
                if (template) if ("string" == typeof template) "#" === template.charAt(0) && (template = idToTemplate(template)); else {
                    if (!template.nodeType) return this;
                    template = template.innerHTML;
                } else el && (template = function(el) {
                    if (el.outerHTML) return el.outerHTML;
                    var container = document.createElement("div");
                    return container.appendChild(el.cloneNode(!0)), container.innerHTML;
                }(el));
                if (template) {
                    0;
                    var ref = compileToFunctions(template, {
                        outputSourceRange: !1,
                        shouldDecodeNewlines: shouldDecodeNewlines,
                        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
                        delimiters: options.delimiters,
                        comments: options.comments
                    }, this), render = ref.render, staticRenderFns = ref.staticRenderFns;
                    options.render = render, options.staticRenderFns = staticRenderFns;
                }
            }
            return mount.call(this, el, hydrating);
        }, Vue.compile = compileToFunctions, __webpack_exports__.a = Vue;
    }).call(this, __webpack_require__(34), __webpack_require__(117).setImmediate);
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(j) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return userscriptLegacy;
        });
        var __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = Promise))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator.throw(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        const userscriptLegacy = {
            set(key, value) {
                return __awaiter(this, void 0, void 0, function*() {
                    GM_setValue(key, value);
                });
            },
            get(key) {
                return __awaiter(this, void 0, void 0, function*() {
                    return GM_getValue(key);
                });
            },
            remove(key) {
                return __awaiter(this, void 0, void 0, function*() {
                    GM_deleteValue(key);
                });
            },
            list() {
                return __awaiter(this, void 0, void 0, function*() {
                    var reverseArray = {};
                    return j.$.each(GM_listValues(), function(index, cache) {
                        reverseArray[cache] = index;
                    }), reverseArray;
                });
            },
            addStyle(css) {
                return __awaiter(this, void 0, void 0, function*() {
                    GM_addStyle(css);
                });
            },
            version: () => GM_info.script.version,
            lang(selector, args) {
                var message = i18n[selector];
                if (void 0 !== args) for (var argIndex = 0; argIndex < args.length; argIndex++) message = message.replace("$" + (argIndex + 1), args[argIndex]);
                return message;
            },
            assetUrl: filename => "https://raw.githubusercontent.com/lolamtisch/MALSync/master/assets/assets/" + filename,
            injectCssResource(res, head) {
                head.append(j.$("<style>").attr("rel", "stylesheet").attr("type", "text/css").html(GM_getResourceText(res)));
            },
            injectjsResource(res, head) {
                var s = document.createElement("script");
                s.text = GM_getResourceText(res), s.onload = function() {
                    this.remove();
                }, head.get(0).appendChild(s);
            },
            updateDom(head) {
                var s = document.createElement("script");
                s.text = "\n        document.getElementsByTagName('head')[0].onclick = function(e){\n          try{\n            componentHandler.upgradeDom();\n          }catch(e){\n            console.log(e);\n            setTimeout(function(){\n              componentHandler.upgradeDom();\n            },500);\n          }\n        }", 
                s.onload = function() {
                    this.remove();
                }, head.get(0).appendChild(s);
            }
        };
    }).call(this, __webpack_require__(3));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(api, con) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return settingsObj;
        });
        var __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = Promise))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator.throw(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        }, settingsObj = {
            options: {
                autoTrackingModeanime: "video",
                autoTrackingModemanga: "instant",
                forceEn: !1,
                userscriptMode: !1,
                syncMode: "MAL",
                delay: 0,
                videoDuration: 85,
                malTags: !0,
                malContinue: !0,
                malResume: !0,
                epPredictions: !0,
                posLeft: "left",
                miniMALonMal: !1,
                floatButtonStealth: !1,
                floatButtonHide: !1,
                autoCloseMinimal: !1,
                outWay: !0,
                miniMalWidth: "500px",
                miniMalHeight: "90%",
                malThumbnail: 100,
                friendScore: !0,
                SiteSearch: !0,
                "9anime": !0,
                Crunchyroll: !0,
                Gogoanime: !0,
                Kissanime: !0,
                Masterani: !0,
                Animeheaven: !0,
                Twistmoe: !0,
                Anime4you: !0,
                Kissmanga: !0,
                Mangadex: !0,
                Mangarock: !0,
                Netflix: !0,
                introSkip: 85,
                updateCheckNotifications: !0,
                anilistToken: "",
                kitsuToken: ""
            },
            init: function() {
                return __awaiter(this, void 0, void 0, function*() {
                    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function*() {
                        for (var key in this.options) {
                            var store = yield api.storage.get("settings/" + key);
                            void 0 !== store && (this.options[key] = store);
                        }
                        con.log("Settings", this.options), resolve(this);
                    }));
                });
            },
            get: function(name) {
                return this.options[name];
            },
            set: function(name, value) {
                if (this.options.hasOwnProperty(name)) return this.options[name] = value, api.storage.set("settings/" + name, value);
                con.error(name + " is not a defined option");
            },
            getAsync: function(name) {
                return __awaiter(this, void 0, void 0, function*() {
                    var value = yield api.storage.get("settings/" + name);
                    return void 0 === value && void 0 !== typeof this.options[name] ? this.options[name] : value;
                });
            }
        };
    }).call(this, __webpack_require__(0), __webpack_require__(1));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(j, utils, api, con) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return syncPage;
        });
        var _pages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9), _provider_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8), _minimal_iframe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(58), _provider_templates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13), _utils_player__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(30), __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = Promise))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator.throw(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        class syncPage {
            constructor(url) {
                if (this.url = url, this.curState = void 0, this.tempPlayer = void 0, this.UILoaded = !1, 
                this.page = this.getPage(url), null == this.page) throw new Error("Page could not be recognized");
            }
            init() {
                var This = this;
                j.$(document).ready(function() {
                    Object(_minimal_iframe__WEBPACK_IMPORTED_MODULE_2__.a)(This);
                }), this.page.init(this);
            }
            getPage(url) {
                for (var key in _pages__WEBPACK_IMPORTED_MODULE_0__.b) {
                    var page = _pages__WEBPACK_IMPORTED_MODULE_0__.b[key];
                    if (j.$.isArray(page.domain)) for (var k in page.domain) {
                        var singleDomain = page.domain[k];
                        if (checkDomain(singleDomain)) return page.domain = singleDomain, page;
                    } else if (checkDomain(page.domain)) return page;
                    function checkDomain(domain) {
                        return url.indexOf(utils.urlPart(domain, 2).split(".").slice(-2, -1)[0] + ".") > -1;
                    }
                }
                return null;
            }
            setVideoTime(item, timeCb) {
                var syncDuration = api.settings.get("videoDuration"), progress = item.current / (item.duration * (syncDuration / 100)) * 100;
                j.$("#malSyncProgress").length && (progress < 100 ? (j.$(".ms-progress").css("width", progress + "%"), 
                j.$("#malSyncProgress").removeClass("ms-loading").removeClass("ms-done")) : (j.$("#malSyncProgress").addClass("ms-done"), 
                j.$(".flash .sync").click())), this.handleVideoResume(item, timeCb);
            }
            handleVideoResume(item, timeCb) {
                if (void 0 !== this.curState && void 0 !== this.curState.identifier && void 0 !== this.curState.episode) {
                    var This = this, localSelector = this.curState.identifier + "/" + this.curState.episode;
                    if (void 0 !== this.curState.videoChecked && this.curState.videoChecked) this.curState.videoChecked > 1 && (con.info("Set Resume", item.current), 
                    localStorage.setItem(localSelector, item.current), this.curState.videoChecked = !0, 
                    setTimeout(() => {
                        this.curState.videoChecked = 2;
                    }, 1e4)); else {
                        var localItem = localStorage.getItem(localSelector);
                        if (con.info("Resume", localItem), null !== localItem && parseInt(localItem) - 30 > item.current && parseInt(localItem) > 30) {
                            j.$("#MALSyncResume").length || j.$("#MALSyncResume").parent().parent().remove();
                            for (var resumeTimeString, resumeTime = Math.round(parseInt(localItem)), delta = resumeTime, minutes = Math.floor(delta / 60), sec = (delta -= 60 * minutes) + ""; sec.length < 2; ) sec = "0" + sec;
                            resumeTimeString = minutes + ":" + sec;
                            var resumeMsg = utils.flashm('<button id="MALSyncResume" class="sync" style="margin-bottom: 2px; background-color: transparent; border: none; color: rgb(255,64,129);cursor: pointer;">' + api.storage.lang("syncPage_flashm_resumeMsg", [ resumeTimeString ]) + '</button><br><button class="resumeClose" style="background-color: transparent; border: none; color: white;margin-top: 10px;cursor: pointer;">Close</button>', {
                                permanent: !0,
                                error: !1,
                                type: "resume",
                                minimized: !1,
                                position: "top"
                            });
                            resumeMsg.find(".sync").on("click", function() {
                                timeCb(resumeTime), This.curState.videoChecked = 2, j.$(this).parent().parent().remove();
                            }), resumeMsg.find(".resumeClose").on("click", function() {
                                This.curState.videoChecked = 2, j.$(this).parent().parent().remove();
                            });
                        } else setTimeout(() => {
                            this.curState.videoChecked = 2;
                        }, 15e3);
                        this.curState.videoChecked = !0;
                    }
                }
            }
            handlePage(curUrl = window.location.href) {
                return __awaiter(this, void 0, void 0, function*() {
                    var state;
                    this.curState = void 0;
                    var This = this;
                    if (this.url = curUrl, this.loadUI(), this.page.isSyncPage(this.url)) state = {
                        title: this.page.sync.getTitle(this.url),
                        identifier: this.page.sync.getIdentifier(this.url)
                    }, this.offset = yield api.storage.get(this.page.name + "/" + state.identifier + "/Offset"), 
                    state.episode = +parseInt(this.page.sync.getEpisode(this.url) + "") + parseInt(this.getOffset()), 
                    void 0 !== this.page.sync.getVolume && (state.volume = this.page.sync.getVolume(this.url)), 
                    "anime" == this.page.type && Object(_utils_player__WEBPACK_IMPORTED_MODULE_4__.a)((item, player) => {
                        this.tempPlayer = player, this.setVideoTime(item, time => {
                            if (void 0 !== player) return void 0 !== time ? (player.play(), void (player.currentTime = time)) : void 0;
                            con.error("No player Found");
                        });
                    }), con.log("Sync", state); else {
                        if (void 0 === this.page.overview) return void con.log("No overview definition");
                        state = {
                            title: this.page.overview.getTitle(this.url),
                            identifier: this.page.overview.getIdentifier(this.url)
                        }, this.offset = yield api.storage.get(this.page.name + "/" + state.identifier + "/Offset"), 
                        con.log("Overview", state);
                    }
                    this.curState = state;
                    var malUrl = yield this.getMalUrl(state.identifier, state.title, this.page);
                    if (null === malUrl) j.$("#MalInfo").text(api.storage.lang("Not_Found")), con.log("Not on mal"); else if (malUrl) {
                        if (con.log("MyAnimeList", malUrl), this.malObj = Object(_provider_provider__WEBPACK_IMPORTED_MODULE_1__.a)(malUrl), 
                        yield this.malObj.init(), this.oldMalObj = this.malObj.clone(), this.fillUI(), !this.malObj.login) return void utils.flashm(Object(_provider_templates__WEBPACK_IMPORTED_MODULE_3__.a)().noLogin, {
                            error: !0,
                            type: "error"
                        });
                        if (this.page.isSyncPage(this.url)) if (yield this.handleAnimeUpdate(state)) {
                            if (con.log("Start Sync (" + api.settings.get("delay") + " Seconds)"), "instant" === api.settings.get("autoTrackingMode" + this.page.type)) setTimeout(() => {
                                sync();
                            }, 1e3 * api.settings.get("delay")); else {
                                var message = '<button class="sync" style="margin-bottom: 8px; background-color: transparent; border: none; color: rgb(255,64,129);margin-top: 10px;cursor: pointer;">' + api.storage.lang("syncPage_flashm_sync_" + This.page.type, [ Object(_provider_templates__WEBPACK_IMPORTED_MODULE_3__.a)().shortName, state.episode ]) + "</button>", options = {
                                    hoverInfo: !0,
                                    error: !0,
                                    type: "update",
                                    minimized: !1
                                };
                                "video" === api.settings.get("autoTrackingMode" + this.page.type) && "anime" == this.page.type && (message = '\n                <div id="malSyncProgress" class="ms-loading" style="background-color: transparent; position: absolute; top: 0; left: 0; right: 0; height: 4px;">\n                  <div class="ms-progress" style="background-color: #2980b9; width: 0%; height: 100%; transition: width 1s;"></div>\n                </div>\n              ' + message, 
                                options = {
                                    hoverInfo: !0,
                                    error: !1,
                                    type: "update",
                                    minimized: !0
                                }), utils.flashm(message, options).find(".sync").on("click", function() {
                                    j.$(".flashinfo").remove(), sync();
                                }), con.log("overviewUrl", This.page.sync.getOverviewUrl(This.url)), void 0 !== This.page.sync.nextEpUrl && con.log("nextEp", This.page.sync.nextEpUrl(This.url));
                            }
                            function sync() {
                                if (This.malObj.setResumeWaching(This.url, state.episode), void 0 !== This.page.sync.nextEpUrl) {
                                    var continueWatching = This.page.sync.nextEpUrl(This.url);
                                    continueWatching && -1 == continueWatching.indexOf("undefined") && This.malObj.setContinueWaching(continueWatching, state.episode + 1);
                                }
                                This.syncHandling(!0);
                            }
                        } else con.log("Nothing to Sync");
                    } else j.$("#MalInfo").text(api.storage.lang("NothingFound")), con.log("Nothing found");
                });
            }
            syncHandling(hoverInfo = !1) {
                var This = this;
                return this.malObj.sync().then(function() {
                    var message = This.malObj.name, split = "<br>", totalVol = This.malObj.totalVol;
                    0 == totalVol && (totalVol = "?");
                    var totalEp = This.malObj.totalEp;
                    if (0 == totalEp && (totalEp = "?"), void 0 === This.oldMalObj || This.malObj.getStatus() != This.oldMalObj.getStatus()) {
                        var statusString = "";
                        switch (parseInt(This.malObj.getStatus())) {
                          case 1:
                            statusString = api.storage.lang("UI_Status_watching_" + This.page.type);
                            break;

                          case 2:
                            statusString = api.storage.lang("UI_Status_Completed");
                            break;

                          case 3:
                            statusString = api.storage.lang("UI_Status_OnHold");
                            break;

                          case 4:
                            statusString = api.storage.lang("UI_Status_Dropped");
                            break;

                          case 6:
                            statusString = api.storage.lang("UI_Status_planTo_" + This.page.type);
                        }
                        message += split + statusString, split = " | ";
                    }
                    if ("manga" != This.page.type || void 0 !== This.oldMalObj && This.malObj.getVolume() == This.oldMalObj.getVolume() || (message += split + api.storage.lang("UI_Volume") + " " + This.malObj.getVolume() + "/" + totalVol, 
                    split = " | "), void 0 !== This.oldMalObj && This.malObj.getEpisode() == This.oldMalObj.getEpisode() || (message += split + api.storage.lang("UI_Episode") + " " + This.malObj.getEpisode() + "/" + totalEp, 
                    split = " | "), (void 0 === This.oldMalObj || This.malObj.getScore() != This.oldMalObj.getScore() && "" != This.malObj.getScore()) && (message += split + api.storage.lang("UI_Score") + " " + This.malObj.getScore(), 
                    split = " | "), hoverInfo) {
                        void 0 !== This.oldMalObj && (message += '\n              <br>\n              <button class="undoButton" style="background-color: transparent; border: none; color: rgb(255,64,129);margin-top: 10px;cursor: pointer;">\n                ' + api.storage.lang("syncPage_flashm_sync_undefined_undo") + '\n              </button>\n              <button class="wrongButton" style="background-color: transparent; border: none; color: rgb(255,64,129);margin-top: 10px;cursor: pointer;">\n                ' + api.storage.lang("syncPage_flashm_sync_undefined_wrong") + "\n              </button>");
                        var flashmItem = utils.flashm(message, {
                            hoverInfo: !0,
                            type: "update"
                        });
                        flashmItem.find(".undoButton").on("click", function() {
                            this.closest(".flash").remove(), This.malObj = This.oldMalObj, This.oldMalObj = void 0, 
                            This.syncHandling();
                        }), flashmItem.find(".wrongButton").on("click", function() {
                            if (This.malObj.wrong = !0, !This.malObj.miniMAL) {
                                var miniButton = j.$("button.open-info-popup");
                                "none" != miniButton.css("display") ? miniButton.click() : (miniButton.click(), 
                                miniButton.click());
                            }
                        });
                    } else utils.flashm(message);
                    This.fillUI();
                }).catch(function(e) {
                    con.error(e), utils.flashm(api.storage.lang("syncPage_flashm_failded"), {
                        error: !0
                    });
                });
            }
            handleAnimeUpdate(state) {
                return __awaiter(this, void 0, void 0, function*() {
                    var status = utils.status;
                    if (this.malObj.getEpisode() >= state.episode && (this.malObj.getStatus() != status.completed || 1 !== state.episode || 1 === this.malObj.totalEp || 1 === this.malObj.getRewatching())) return !1;
                    if (this.malObj.setEpisode(state.episode), this.malObj.setStreamingUrl(this.page.sync.getOverviewUrl(this.url)), 
                    this.malObj.setStartingDateToNow(), this.malObj.getStatus() !== status.completed && parseInt(state.episode) === this.malObj.totalEp && 0 != parseInt(state.episode) && (yield utils.flashConfirm(api.storage.lang("syncPage_flashConfirm_complete"), "complete"))) return this.malObj.setStatus(status.completed), 
                    this.malObj.setCompletionDateToNow(), !0;
                    if (this.malObj.getStatus() !== status.watching && this.malObj.getStatus() !== status.completed && state.status !== status.completed) {
                        if (!(yield utils.flashConfirm(api.storage.lang("syncPage_flashConfirm_start_" + this.page.type), "start"))) return !1;
                        this.malObj.setStatus(status.watching);
                    }
                    return !0;
                });
            }
            fillUI() {
                if (j.$(".MalLogin").css("display", "initial"), j.$("#AddMalDiv").remove(), j.$("#malRating").attr("href", this.malObj.getDisplayUrl()), 
                this.malObj.getRating().then(rating => {
                    j.$("#malRating").text(rating);
                }), !this.malObj.login) return j.$(".MalLogin").css("display", "none"), j.$("#MalData").css("display", "flex"), 
                j.$("#MalInfo").text(""), void j.$("#malRating").after("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id='LoginMalDiv'>" + Object(_provider_templates__WEBPACK_IMPORTED_MODULE_3__.a)().noLogin + "</span>");
                if (this.malObj.addAnime) {
                    j.$(".MalLogin").css("display", "none"), j.$("#malRating").after("<span id='AddMalDiv'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='#' id='AddMal' onclick='return false;'>" + api.storage.lang("syncPage_malObj_addAnime", [ Object(_provider_templates__WEBPACK_IMPORTED_MODULE_3__.a)().shortName ]) + "</a></span>");
                    var This = this;
                    j.$("#AddMal").click(function() {
                        This.malObj.setStatus(6), This.syncHandling().then(() => This.malObj.update()).then(() => {
                            This.fillUI();
                        });
                    });
                } else j.$("#malTotal, #malTotalCha").text(this.malObj.totalEp), 0 == this.malObj.totalEp && j.$("#malTotal, #malTotalCha").text("?"), 
                j.$("#malTotalVol").text(this.malObj.totalVol), 0 == this.malObj.totalVol && j.$("#malTotalVol").text("?"), 
                j.$("#malEpisodes").val(this.malObj.getEpisode()), j.$("#malVolumes").val(this.malObj.getVolume()), 
                j.$("#malStatus").val(this.malObj.getStatus()), j.$("#malUserRating").val(this.malObj.getScore());
                j.$("#MalData").css("display", "flex"), j.$("#MalInfo").text(""), j.$("#malEpisodes, #malVolumes").trigger("input");
                try {
                    this.handleList(!0);
                } catch (e) {
                    con.error(e);
                }
            }
            handleList(searchCurrent = !1, reTry = 0) {
                if (j.$(".mal-sync-active").removeClass("mal-sync-active"), void 0 !== this.page.overview && void 0 !== this.page.overview.list) {
                    var epList = this.getEpList();
                    if (void 0 !== epList && epList.length > 0) {
                        this.offsetHandler(epList);
                        var elementUrl = this.page.overview.list.elementUrl;
                        con.log("Episode List", j.$.map(epList, function(val, i) {
                            return void 0 !== val ? elementUrl(val) : "-";
                        })), void 0 !== this.page.overview.list.handleListHook && this.page.overview.list.handleListHook(this.malObj.getEpisode(), epList);
                        var curEp = epList[this.malObj.getEpisode()];
                        if (void 0 !== curEp && curEp) curEp.addClass("mal-sync-active"); else if (this.malObj.getEpisode() && searchCurrent && reTry < 10 && void 0 !== this.page.overview.list.paginationNext) {
                            con.log("Pagination next");
                            var This = this;
                            this.page.overview.list.paginationNext() && setTimeout(function() {
                                reTry++, This.handleList(!0, reTry);
                            }, 500);
                        }
                        var nextEp = epList[this.malObj.getEpisode() + 1];
                        if (void 0 !== nextEp && nextEp && !this.page.isSyncPage(this.url)) {
                            var message = '<a href="' + elementUrl(nextEp) + '">' + api.storage.lang("syncPage_malObj_nextEp_" + this.page.type, [ this.malObj.getEpisode() + 1 ]) + "</a>";
                            utils.flashm(message, {
                                hoverInfo: !0,
                                type: "nextEp"
                            });
                        }
                    }
                }
            }
            getEpList() {
                var This = this;
                if (void 0 !== this.page.overview && void 0 !== this.page.overview.list) {
                    var elementEp = this.page.overview.list.elementEp, elementArray = [];
                    return this.page.overview.list.elementsSelector().each(function(index, el) {
                        try {
                            var elEp = parseInt(elementEp(j.$(el)) + "") + parseInt(This.getOffset());
                            elementArray[elEp] = j.$(el);
                        } catch (e) {
                            con.info(e);
                        }
                    }), elementArray;
                }
            }
            offsetHandler(epList) {
                if (this.page.overview.list.offsetHandler && (void 0 === this.offset || "0" === this.offset)) for (var i = 0; i < epList.length; ++i) if (void 0 !== epList[i]) {
                    if (con.log("Offset", i), i > 1) {
                        var calcOffset = 1 - i;
                        utils.flashConfirm(api.storage.lang("syncPage_flashConfirm_offsetHandler_1", [ calcOffset ]), "offset", () => {
                            this.setOffset(calcOffset);
                        }, () => {
                            this.setOffset(0);
                        });
                    }
                    return;
                }
            }
            cdn() {}
            getMalUrl(identifier, title, page) {
                return __awaiter(this, void 0, void 0, function*() {
                    var url, This = this, cache = yield api.storage.get(this.page.name + "/" + identifier + "/Mal", null);
                    if (void 0 !== cache) return con.log("Cache", this.page.name + "/" + identifier, cache), 
                    cache;
                    if (void 0 !== page.database) {
                        var firebaseVal = yield (url = "https://kissanimelist.firebaseio.com/Data2/" + page.database + "/" + encodeURIComponent(function(title) {
                            if (window.location.href.indexOf("crunchyroll.com") > -1) return encodeURIComponent(title.toLowerCase().split("#")[0]).replace(/\./g, "%2E");
                            return title.toLowerCase().split("#")[0].replace(/\./g, "%2E");
                        }(identifier)).toLowerCase() + "/Mal.json", con.log("Firebase", url), api.request.xhr("GET", url).then(response => {
                            if (con.log("Firebase response", response.responseText), "null" === response.responseText || response.responseText.indexOf("error") > -1) return !1;
                            var returnUrl = "";
                            return returnUrl = "Not-Found" == response.responseText.split('"')[1] ? null : "https://myanimelist.net/" + page.type + "/" + response.responseText.split('"')[1] + "/" + response.responseText.split('"')[3], 
                            This.setCache(returnUrl, !1, identifier), returnUrl;
                        }));
                        if (!1 !== firebaseVal) return firebaseVal;
                    }
                    var malSearchVal = yield function() {
                        var url = "https://myanimelist.net/" + page.type + ".php?q=" + encodeURI(title);
                        return con.log("malSearch", url), api.request.xhr("GET", url).then(response => {
                            if ("null" === response.responseText || response.responseText.indexOf("  error ") > -1) return !1;
                            try {
                                var link = response.responseText.split('<a class="hoverinfo_trigger" href="')[1].split('"')[0];
                                return This.setCache(link, !0, identifier), link;
                            } catch (e) {
                                con.error(e);
                                try {
                                    return link = response.responseText.split('class="picSurround')[1].split("<a")[1].split('href="')[1].split('"')[0], 
                                    This.setCache(link, !0, identifier), link;
                                } catch (e) {
                                    return con.error(e), !1;
                                }
                            }
                        });
                    }();
                    return !1 !== malSearchVal && malSearchVal;
                });
            }
            setCache(url, toDatabase, identifier = null) {
                null == identifier && (identifier = this.page.isSyncPage(this.url) ? this.page.sync.getIdentifier(this.url) : this.page.overview.getIdentifier(this.url)), 
                api.storage.set(this.page.name + "/" + identifier + "/Mal", url), this.databaseRequest(url, toDatabase, identifier);
            }
            databaseRequest(malurl, toDatabase, identifier, kissurl = null) {
                if (void 0 !== this.page.database && toDatabase) {
                    null == kissurl && (kissurl = this.page.isSyncPage(this.url) ? this.page.sync.getOverviewUrl(this.url) : this.url);
                    var param = {
                        Kiss: kissurl,
                        Mal: malurl
                    };
                    "correction" == toDatabase && (param.newCorrection = !0);
                    var url = "https://kissanimelist.firebaseio.com/Data2/Request/" + this.page.database + "Request.json";
                    api.request.xhr("POST", {
                        url: url,
                        data: JSON.stringify(param)
                    }).then(response => {
                        "null" === response.responseText || response.responseText.indexOf("error") > -1 ? con.error("[DB] Send to database:", response.responseText) : con.log("[DB] Send to database:", param);
                    });
                }
            }
            deleteCache() {
                var getIdentifier;
                getIdentifier = this.page.isSyncPage(this.url) ? this.page.sync.getIdentifier : this.page.overview.getIdentifier, 
                api.storage.remove(this.page.name + "/" + getIdentifier(this.url) + "/Mal");
            }
            getOffset() {
                return void 0 === this.offset ? 0 : this.offset;
            }
            setOffset(value) {
                return __awaiter(this, void 0, void 0, function*() {
                    var getIdentifier;
                    this.offset = value, this.page.isSyncPage(this.url) ? getIdentifier = this.page.sync.getIdentifier : (getIdentifier = this.page.overview.getIdentifier, 
                    this.handleList());
                    var returnValue = api.storage.set(this.page.name + "/" + getIdentifier(this.url) + "/Offset", value);
                    return void 0 !== this.malObj && api.storage.remove("updateCheck/" + this.malObj.type + "/" + this.malObj.id), 
                    returnValue;
                });
            }
            loadUI() {
                if (!this.UILoaded) {
                    this.UILoaded = !0;
                    var wrapStart = '<span style="display: inline-block;">', ui = '<p id="malp">';
                    if (ui += '<span id="MalInfo">' + api.storage.lang("Loading") + "</span>", ui += '<span id="MalData" style="display: none; justify-content: space-between; flex-wrap: wrap;">', 
                    ui += wrapStart, ui += '<span class="info">' + api.storage.lang("search_Score") + " </span>", 
                    ui += '<a id="malRating" style="min-width: 30px;display: inline-block;" target="_blank" href="">____</a>', 
                    ui += "</span>", ui += wrapStart = '<span style="display: inline-block; display: none;" class="MalLogin">', 
                    ui += '<span class="info">' + api.storage.lang("UI_Status") + " </span>", ui += '<select id="malStatus">', 
                    ui += '<option value="1" >' + api.storage.lang("UI_Status_watching_" + this.page.type) + "</option>", 
                    ui += '<option value="2" >' + api.storage.lang("UI_Status_Completed") + "</option>", 
                    ui += '<option value="3" >' + api.storage.lang("UI_Status_OnHold") + "</option>", 
                    ui += '<option value="4" >' + api.storage.lang("UI_Status_Dropped") + "</option>", 
                    ui += '<option value="6" >' + api.storage.lang("UI_Status_planTo_" + this.page.type) + "</option>", 
                    ui += "</select>", ui += "</span>", "anime" == this.page.type) {
                        var middle = "";
                        middle += wrapStart, middle += '<span class="info">' + api.storage.lang("UI_Episode") + " </span>", 
                        middle += '<span style=" text-decoration: none; outline: medium none;">', middle += '<input id="malEpisodes" value="0" type="text" size="1" maxlength="4">', 
                        middle += '/<span id="malTotal">0</span>', middle += "</span>", middle += "</span>";
                    } else {
                        middle = "";
                        middle += wrapStart, middle += '<span class="info">' + api.storage.lang("UI_Volume") + " </span>", 
                        middle += '<span style=" text-decoration: none; outline: medium none;">', middle += '<input id="malVolumes" value="0" type="text" size="1" maxlength="4">', 
                        middle += '/<span id="malTotalVol">0</span>', middle += "</span>", middle += "</span>", 
                        middle += wrapStart, middle += '<span class="info">' + api.storage.lang("UI_Chapter") + " </span>", 
                        middle += '<span style=" text-decoration: none; outline: medium none;">', middle += '<input id="malEpisodes" value="0" type="text" size="1" maxlength="4">', 
                        middle += '/<span id="malTotalCha">0</span>', middle += "</span>", middle += "</span>";
                    }
                    ui += middle, ui += wrapStart, ui += '<span class="info">' + api.storage.lang("UI_Score") + "</span>", 
                    ui += '<select id="malUserRating"><option value="">' + api.storage.lang("UI_Score_Not_Rated") + "</option>", 
                    ui += '<option value="10" >' + api.storage.lang("UI_Score_Masterpiece") + "</option>", 
                    ui += '<option value="9" >' + api.storage.lang("UI_Score_Great") + "</option>", 
                    ui += '<option value="8" >' + api.storage.lang("UI_Score_VeryGood") + "</option>", 
                    ui += '<option value="7" >' + api.storage.lang("UI_Score_Good") + "</option>", ui += '<option value="6" >' + api.storage.lang("UI_Score_Fine") + "</option>", 
                    ui += '<option value="5" >' + api.storage.lang("UI_Score_Average") + "</option>", 
                    ui += '<option value="4" >' + api.storage.lang("UI_Score_Bad") + "</option>", ui += '<option value="3" >' + api.storage.lang("UI_Score_VeryBad") + "</option>", 
                    ui += '<option value="2" >' + api.storage.lang("UI_Score_Horrible") + "</option>", 
                    ui += '<option value="1" >' + api.storage.lang("UI_Score_Appalling") + "</option>", 
                    ui += "</select>", ui += "</span>", ui += "</span>", ui += "</p>";
                    '<p class="headui" style="float: right; margin: 0; margin-right: 10px">', "", "</p>";
                    '<button class="open-info-popup mdl-button" style="display:none; margin-left: 6px;">MAL</button>', 
                    this.page.isSyncPage(this.url) ? void 0 !== this.page.sync.uiSelector && this.page.sync.uiSelector(j.$(ui)) : void 0 !== this.page.overview && this.page.overview.uiSelector(j.$(ui));
                    var This = this;
                    j.$("#malEpisodes, #malVolumes, #malUserRating, #malStatus").change(function() {
                        This.buttonclick();
                    }), j.$("#malEpisodes, #malVolumes").on("input", function() {
                        var el = j.$(this), numberlength = el.val().toString().length;
                        numberlength < 1 && (numberlength = 1);
                        var numberWidth = 7.7 * numberlength + 3;
                        el.css("width", numberWidth + "px");
                    }).trigger("input");
                }
            }
            buttonclick() {
                this.malObj.setEpisode(j.$("#malEpisodes").val()), j.$("#malVolumes").length && this.malObj.setVolume(j.$("#malVolumes").val()), 
                this.malObj.setScore(j.$("#malUserRating").val()), this.malObj.setStatus(j.$("#malStatus").val()), 
                this.syncHandling().then(() => this.malObj.update()).then(() => {
                    this.fillUI();
                });
            }
        }
    }).call(this, __webpack_require__(3), __webpack_require__(2), __webpack_require__(0), __webpack_require__(1));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(utils, j, con, api) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return Kissanime;
        });
        const Kissanime = {
            name: "kissanime",
            domain: "http://kissanime.ru",
            database: "Kissanime",
            type: "anime",
            isSyncPage: function(url) {
                return !(void 0 === utils.urlPart(url, 5) || !j.$("#centerDivVideo").length);
            },
            sync: {
                getTitle: function(url) {
                    return j.$("#navsubbar a").first().text().replace("Anime", "").replace("information", "").trim();
                },
                getIdentifier: function(url) {
                    return utils.urlPart(url, 4);
                },
                getOverviewUrl: function(url) {
                    return url.split("/").slice(0, 5).join("/");
                },
                getEpisode: function(url) {
                    var episodePart = utils.urlPart(url, 5), temp = [];
                    return null !== (temp = (episodePart = episodePart.replace(/1080p/i, " ").replace(/720p/i, " ")).match(/[e,E][p,P][i,I]?[s,S]?[o,O]?[d,D]?[e,E]?\D?\d{3}/)) && (episodePart = temp[0]), 
                    null === (temp = episodePart.match(/\d{3}/)) ? (temp = episodePart.match(/\d{2,}\-/), 
                    episodePart = null === temp ? 1 : temp[0]) : episodePart = temp[0], episodePart;
                },
                nextEpUrl: function(url) {
                    return url.replace(/\/[^\/]*$/, "") + "/" + j.$("#selectEpisode option:selected").next().val();
                }
            },
            overview: {
                getTitle: function() {
                    return j.$(".bigChar").first().text();
                },
                getIdentifier: function(url) {
                    return Kissanime.sync.getIdentifier(url);
                },
                uiSelector: function(selector) {
                    selector.insertAfter(j.$(".bigChar").first());
                },
                list: {
                    offsetHandler: !0,
                    elementsSelector: function() {
                        return j.$(".listing tr");
                    },
                    elementUrl: function(selector) {
                        return utils.absoluteLink(selector.find("a").first().attr("href"), Kissanime.domain);
                    },
                    elementEp: function(selector) {
                        var url = Kissanime.overview.list.elementUrl(selector);
                        return /_ED/.test(url) ? NaN : Kissanime.sync.getEpisode(url);
                    }
                }
            },
            init(page) {
                if ("Just a moment..." == document.title) return con.log("loading"), void page.cdn();
                api.storage.addStyle(__webpack_require__(79).toString()), j.$(document).ready(function() {
                    page.handlePage();
                });
            }
        };
    }).call(this, __webpack_require__(2), __webpack_require__(3), __webpack_require__(1), __webpack_require__(0));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(utils, j, con, api) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return Kissmanga;
        });
        const Kissmanga = {
            name: "kissmanga",
            domain: "http://kissmanga.com",
            database: "Kissmanga",
            type: "manga",
            isSyncPage: function(url) {
                return void 0 !== utils.urlPart(url, 5);
            },
            sync: {
                getTitle: function(url) {
                    return j.$("#navsubbar a").first().text().replace("Manga", "").replace("information", "").trim();
                },
                getIdentifier: function(url) {
                    return utils.urlPart(url, 4);
                },
                getOverviewUrl: function(url) {
                    return url.split("/").slice(0, 5).join("/");
                },
                getEpisode: function(url) {
                    var episodePart = utils.urlPart(url, 5), temp = episodePart.match(/[c,C][h,H][a,A]?[p,P]?[t,T]?[e,E]?[r,R]?\D?\d+/);
                    return null === temp ? null === (temp = (episodePart = episodePart.replace(/[V,v][o,O][l,L]\D?\d+/, "")).match(/\d{3}/)) ? (temp = episodePart.match(/\d+/), 
                    episodePart = null === temp ? 0 : temp[0]) : episodePart = temp[0] : episodePart = temp[0].match(/\d+/)[0], 
                    episodePart;
                },
                getVolume: function(url) {
                    try {
                        url = (url = url.match(/[V,v][o,O][l,L]\D?\d{3}/)[0]).match(/\d+/)[0].slice(-3);
                    } catch (e) {
                        return;
                    }
                    return url;
                }
            },
            overview: {
                getTitle: function() {
                    return j.$(".bigChar").first().text();
                },
                getIdentifier: function(url) {
                    return Kissmanga.sync.getIdentifier(url);
                },
                uiSelector: function(selector) {
                    selector.insertAfter(j.$(".bigChar").first());
                },
                list: {
                    offsetHandler: !0,
                    elementsSelector: function() {
                        return j.$(".listing tr");
                    },
                    elementUrl: function(selector) {
                        return utils.absoluteLink(selector.find("a").first().attr("href"), Kissmanga.domain);
                    },
                    elementEp: function(selector) {
                        var url = Kissmanga.overview.list.elementUrl(selector);
                        return /_ED/.test(url) ? NaN : Kissmanga.sync.getEpisode(url);
                    }
                }
            },
            init(page) {
                if ("Just a moment..." == document.title) return con.log("loading"), void page.cdn();
                api.storage.addStyle(__webpack_require__(81).toString()), j.$(document).ready(function() {
                    page.handlePage();
                });
            }
        };
    }).call(this, __webpack_require__(2), __webpack_require__(3), __webpack_require__(1), __webpack_require__(0));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(j, utils, api, con) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return nineAnime;
        });
        const nineAnime = {
            name: "9anime",
            domain: "https://9anime.to",
            database: "9anime",
            type: "anime",
            isSyncPage: function(url) {
                return !0;
            },
            sync: {
                getTitle: function(url) {
                    return j.$("h1.title").text();
                },
                getIdentifier: function(url) {
                    return (url = url.split("/")[4].split("?")[0]).indexOf(".") > -1 && (url = url.split(".")[1]), 
                    url;
                },
                getOverviewUrl: function(url) {
                    return url.split("/").slice(0, 5).join("/");
                },
                getEpisode: function(url) {
                    return parseInt(j.$(".servers .episodes a.active").attr("data-base"));
                },
                nextEpUrl: function(url) {
                    return nineAnime.domain + j.$(".servers .episodes a.active").parent("li").next().find("a").attr("href");
                },
                uiSelector: function(selector) {
                    j.$('<div class="widget info"><div class="widget-body"> <p id="malp">' + selector.html() + "</p></div></div>").insertBefore(j.$(".widget.info").first());
                }
            },
            overview: {
                getTitle: function(url) {
                    return "";
                },
                getIdentifier: function(url) {
                    return "";
                },
                uiSelector: function(selector) {},
                list: {
                    offsetHandler: !1,
                    elementsSelector: function() {
                        return j.$(".episodes.range a");
                    },
                    elementUrl: function(selector) {
                        return utils.absoluteLink(selector.attr("href"), nineAnime.domain);
                    },
                    elementEp: function(selector) {
                        return selector.attr("data-base");
                    }
                }
            },
            init(page) {
                api.storage.addStyle(__webpack_require__(83).toString()), utils.waitUntilTrue(function() {
                    return j.$(".servers").length;
                }, function() {
                    con.info("Start check"), page.handlePage(), utils.urlChangeDetect(function() {
                        con.info("Check"), page.handlePage();
                    });
                });
            }
        };
    }).call(this, __webpack_require__(3), __webpack_require__(2), __webpack_require__(0), __webpack_require__(1));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(j, utils, con, api) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return Crunchyroll;
        });
        const Crunchyroll = {
            name: "Crunchyroll",
            domain: "http://www.crunchyroll.com",
            database: "Crunchyroll",
            type: "anime",
            isSyncPage: function(url) {
                return !(void 0 === url.split("/")[4] || !j.$("#showmedia_video").length);
            },
            sync: {
                getTitle: function(url) {
                    return Crunchyroll.sync.getIdentifier(urlHandling(url));
                },
                getIdentifier: function(url) {
                    var script = j.$("#template_body script")[1].innerHTML;
                    return script = script.split("mediaMetadata =")[1].split('"name":"')[1].split(" -")[0], 
                    script = JSON.parse('"' + script.replace('"', '\\"') + '"');
                },
                getOverviewUrl: function(url) {
                    return urlHandling(url).split("/").slice(0, 4).join("/") + "?season=" + Crunchyroll.sync.getIdentifier(urlHandling(url));
                },
                getEpisode: function(url) {
                    return episodeHelper(url, j.$("h1.ellipsis").text().replace(j.$("h1.ellipsis > a").text(), "").trim());
                },
                nextEpUrl: function(url) {
                    return Crunchyroll.domain + j.$(".collection-carousel-media-link-current").parent().next().find(".link").attr("href");
                }
            },
            overview: {
                getTitle: function(url) {
                    return Crunchyroll.overview.getIdentifier(urlHandling(url));
                },
                getIdentifier: function(url) {
                    if (j.$(".season-dropdown").length > 1) throw new Error("MAL-Sync does not support multiple seasons");
                    return j.$(".season-dropdown").length ? j.$(".season-dropdown").first().text() : j.$("#source_showview h1 span").text();
                },
                uiSelector: function(selector) {
                    selector.insertBefore(j.$("#tabs").first());
                },
                list: {
                    offsetHandler: !0,
                    elementsSelector: function() {
                        return j.$("#showview_content_videos .list-of-seasons .group-item a");
                    },
                    elementUrl: function(selector) {
                        return utils.absoluteLink(selector.attr("href"), Crunchyroll.domain);
                    },
                    elementEp: function(selector) {
                        return episodeHelper(urlHandling(Crunchyroll.overview.list.elementUrl(selector)), selector.find(".series-title").text().trim());
                    }
                }
            },
            init(page) {
                if ("Just a moment..." == document.title) return con.log("loading"), void page.cdn();
                api.storage.addStyle(__webpack_require__(85).toString()), page.setCacheTemp = page.setCache, 
                page.setCache = function(url, toDatabase, identifier = null) {
                    this.page.isSyncPage(this.url) && this.setCacheTemp(url, toDatabase, identifier);
                }, page.databaseRequestTemp = page.databaseRequest, page.databaseRequest = function(malurl, toDatabase, identifier, kissurl = null) {
                    this.databaseRequestTemp(malurl, toDatabase, identifier, this.url + "?.." + encodeURIComponent(identifier.toLowerCase().split("#")[0]).replace(/\./g, "%2E"));
                }, j.$(document).ready(function() {
                    if (j.$(".season-dropdown").length > 1) {
                        j.$(".season-dropdown").append('<span class="exclusivMal" style="float: right; margin-right: 20px; color: #0A6DA4;" onclick="return false;">MAL</span>'), 
                        j.$(".exclusivMal").click(function(evt) {
                            j.$("#showview_content").before('<div><a href="' + page.url.split("?")[0] + '">Show hidden seasons</a></div>');
                            var thisparent = j.$(evt.target).parent();
                            j.$(".season-dropdown").not(thisparent).siblings().remove(), j.$(".season-dropdown").not(thisparent).remove(), 
                            j.$(".portrait-grid").css("display", "block").find("li.group-item img.landscape").each(function() {
                                void 0 === j.$(this).attr("src") && j.$(this).attr("src", j.$(this).attr("data-thumbnailUrl"));
                            }), j.$(".exclusivMal").remove(), page.handlePage();
                        });
                        var season = new RegExp("[?&]season=([^&#]*)").exec(page.url);
                        null != season && null != (season = season[1] || null) && (season = decodeURIComponent(decodeURI(season)), 
                        j.$('.season-dropdown[title="' + season + '" i] .exclusivMal').first().click());
                    } else page.handlePage();
                });
            }
        };
        function urlHandling(url) {
            var langslug = j.$("#home_link, #logo_beta a").first().attr("href");
            return "/" == langslug ? url : url.replace(langslug, "");
        }
        function episodeHelper(url, episodeText) {
            var episodePart = utils.urlPart(urlHandling(url), 4);
            try {
                /\d+\.\d+/.test(episodeText) && (episodePart = "episode" + episodeText.match(/\d+\.\d+/)[0]);
            } catch (e) {
                con.error(e);
            }
            var temp = [];
            return temp = episodePart.match(/[e,E][p,P][i,I]?[s,S]?[o,O]?[d,D]?[e,E]?\D?\d+/), 
            temp = (episodePart = null !== temp ? temp[0] : "").match(/\d+/), episodePart = null === temp ? 1 : temp[0];
        }
    }).call(this, __webpack_require__(3), __webpack_require__(2), __webpack_require__(1), __webpack_require__(0));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(j, utils, api) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return Masterani;
        });
        const Masterani = {
            name: "Masterani",
            domain: "https://www.masterani.me",
            database: "Masterani",
            type: "anime",
            isSyncPage: function(url) {
                return "watch" === url.split("/")[4];
            },
            sync: {
                getTitle: function(url) {
                    return j.$(".info h1").text().trim();
                },
                getIdentifier: function(url) {
                    return utils.urlPart(url, 5);
                },
                getOverviewUrl: function(url) {
                    return utils.absoluteLink(j.$(".info a").first().attr("href"), Masterani.domain);
                },
                getEpisode: function(url) {
                    return parseInt(utils.urlPart(url, 6));
                },
                nextEpUrl: function(url) {
                    var nexUrl = Masterani.domain + j.$("#watch .anime-info .actions a").last().attr("href");
                    if (Masterani.isSyncPage(nexUrl)) return nexUrl;
                }
            },
            overview: {
                getTitle: function(url) {
                    return Masterani.sync.getIdentifier(url).replace(/^\d*-/, "");
                },
                getIdentifier: function(url) {
                    return Masterani.sync.getIdentifier(url);
                },
                uiSelector: function(selector) {
                    selector.prependTo(j.$("#stats").first());
                },
                list: {
                    offsetHandler: !1,
                    elementsSelector: function() {
                        return j.$(".episodes .thumbnail");
                    },
                    elementUrl: function(selector) {
                        return utils.absoluteLink(selector.find("a").first().attr("href"), Masterani.domain);
                    },
                    elementEp: function(selector) {
                        return Masterani.sync.getEpisode(Masterani.overview.list.elementUrl(selector));
                    },
                    paginationNext: function() {
                        var el = j.$(".pagination .item").last();
                        return !el.hasClass("disabled") && (el[0].click(), !0);
                    }
                }
            },
            init(page) {
                api.storage.addStyle(__webpack_require__(87).toString()), utils.waitUntilTrue(function() {
                    return j.$("#stats,#watch").length;
                }, function() {
                    page.handlePage(), j.$(".ui.toggle.checkbox, .pagination.menu").click(function() {
                        setTimeout(function() {
                            page.handleList();
                        }, 500);
                    });
                });
            }
        };
    }).call(this, __webpack_require__(3), __webpack_require__(2), __webpack_require__(0));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(j, utils, con, api) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return Mangadex;
        });
        const Mangadex = {
            name: "Mangadex",
            domain: "https://www.mangadex.org",
            database: "Mangadex",
            type: "manga",
            isSyncPage: function(url) {
                return "chapter" === url.split("/")[3];
            },
            sync: {
                getTitle: function(url) {
                    return j.$(".manga-link, a.manga_title").text().trim();
                },
                getIdentifier: function(url) {
                    return utils.urlPart(Mangadex.sync.getOverviewUrl(url), 4);
                },
                getOverviewUrl: function(url) {
                    return utils.absoluteLink(j.$("a.manga-link, a.manga_title").first().attr("href"), Mangadex.domain);
                },
                getEpisode: function(url) {
                    var chapterId = url.split("/")[4], curOption = j.$('#jump-chapter option[value="' + chapterId + '"], #jump_chapter option[value="' + chapterId + '"]');
                    if (curOption.length) {
                        var temp = curOption.text().trim().match(/(ch\.|chapter)\D?\d+/i);
                        if (null !== temp) return function(string) {
                            if (!string) return "";
                            if (!isNaN(parseInt(string))) return string;
                            var temp = [];
                            if (temp = string.match(/(ch\.|chapter)\D?\d+/i), console.log(temp), null !== temp && (string = temp[0], 
                            null !== (temp = string.match(/\d+/)))) return temp[0];
                            return "";
                        }(temp[0]);
                    }
                    return NaN;
                },
                getVolume: function(url) {
                    var chapterId = url.split("/")[4], curOption = j.$('#jump-chapter option[value="' + chapterId + '"], #jump_chapter option[value="' + chapterId + '"]');
                    if (curOption.length) {
                        var temp = curOption.text().trim().match(/(vol\.|volume)\D?\d+/i);
                        if (null !== temp && null !== (temp = temp[0].match(/\d+/))) return parseInt(temp[0]);
                    }
                    return 0;
                }
            },
            overview: {
                getTitle: function() {
                    return j.$(".card-header").first().text().trim();
                },
                getIdentifier: function(url) {
                    return utils.urlPart(url, 4);
                },
                uiSelector: function(selector) {
                    j.$(".container .card .edit.row > * > .row").first().after('<div class="row m-0 py-1 px-0 border-top"><div class="col-lg-3 col-xl-2 strong">MyAnimeList:</div><div class="col-lg-9 col-xl-10 kal-ui"></div></div>'), 
                    selector.appendTo(j.$(".container .card .kal-ui").first());
                },
                list: {
                    offsetHandler: !1,
                    elementsSelector: function() {
                        return j.$(".chapter-container > .row:not(:first-of-type) .chapter-row");
                    },
                    elementUrl: function(selector) {
                        return utils.absoluteLink(selector.find("a").first().attr("href"), Mangadex.domain);
                    },
                    elementEp: function(selector) {
                        return selector.attr("data-chapter");
                    }
                }
            },
            init(page) {
                if ("Just a moment..." == document.title) return con.log("loading"), void page.cdn();
                api.storage.addStyle(__webpack_require__(89).toString()), j.$(".card-header").length ? j.$(document).ready(function() {
                    page.handlePage();
                }) : (con.info("Waiting"), utils.waitUntilTrue(function() {
                    return Mangadex.sync.getOverviewUrl("");
                }, function() {
                    con.info("Start"), page.handlePage();
                    var tempChapterId = utils.urlPart(window.location.href, 4);
                    utils.urlChangeDetect(function() {
                        var newTempChapterId = utils.urlPart(window.location.href, 4);
                        tempChapterId !== newTempChapterId ? (tempChapterId = newTempChapterId, con.info("Check"), 
                        page.handlePage()) : con.info("Nothing to do");
                    });
                })), j.$(document).ready(function() {
                    switch ($("#theme_id").val()) {
                      case "2":
                      case "4":
                      case "6":
                      case "7":
                        $("body").addClass("MALSyncDark");
                    }
                });
            }
        };
    }).call(this, __webpack_require__(3), __webpack_require__(2), __webpack_require__(1), __webpack_require__(0));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(utils, j, con, api) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return Mangarock;
        });
        const Mangarock = {
            name: "Mangarock",
            domain: "https://mangarock.com",
            database: "Mangarock",
            type: "manga",
            isSyncPage: function(url) {
                return void 0 !== utils.urlPart(url, 5);
            },
            sync: {
                getTitle: function(url) {
                    return j.$('a[href*="' + Mangarock.overview.getIdentifier(url) + '"]').text().trim();
                },
                getIdentifier: function(url) {
                    return Mangarock.overview.getIdentifier(url);
                },
                getOverviewUrl: function(url) {
                    return url.split("/").slice(0, 5).join("/");
                },
                getEpisode: function(url) {
                    return con.log(j.$("option:contains('Chapter')").first().parent().find(":selected").text()), 
                    EpisodePartToEpisode(j.$("option:contains('Chapter')").first().parent().find(":selected").text());
                },
                getVolume: function(url) {
                    return 0;
                }
            },
            overview: {
                getTitle: function() {
                    return j.$("h1").first().text().trim();
                },
                getIdentifier: function(url) {
                    return utils.urlPart(url, 4).replace(/mrs-serie-/i, "");
                },
                uiSelector: function(selector) {
                    selector.insertBefore($("#chapters-list").first());
                },
                list: {
                    offsetHandler: !1,
                    elementsSelector: function() {
                        return j.$('[data-test="chapter-table"] tr');
                    },
                    elementUrl: function(selector) {
                        return utils.absoluteLink(selector.find("a").first().attr("href"), Mangarock.domain);
                    },
                    elementEp: function(selector) {
                        return EpisodePartToEpisode(selector.find("a").text());
                    }
                }
            },
            init(page) {
                function start() {
                    /manga/i.test(utils.urlPart(page.url, 3)) ? Mangarock.isSyncPage(page.url) ? utils.waitUntilTrue(function() {
                        return Mangarock.sync.getTitle(page.url);
                    }, function() {
                        page.handlePage();
                    }) : j.$(document).ready(function() {
                        var waitTimeout = !1;
                        utils.waitUntilTrue(function() {
                            return con.log("visibility", j.$("#page-content .col-lg-8 .lazyload-placeholder:visible").length), 
                            !j.$("#page-content .col-lg-8 .lazyload-placeholder:visible").length || waitTimeout;
                        }, function() {
                            page.handlePage();
                        }), setTimeout(function() {
                            waitTimeout = !0;
                        }, 1e3);
                    }) : con.log("Not a manga page!");
                }
                api.storage.addStyle(__webpack_require__(91).toString()), start(), utils.urlChangeDetect(function() {
                    page.url = window.location.href, page.UILoaded = !1, $("#flashinfo-div, #flash-div-bottom, #flash-div-top").remove(), 
                    start();
                });
            }
        };
        function EpisodePartToEpisode(string) {
            if (!string) return "";
            if (!isNaN(parseInt(string))) return string;
            var temp = [];
            if (temp = (string = string.replace(/(campaign|battle)/i, "Chapter")).match(/Chapter\ \d+/i), 
            con.log(temp), null !== temp) {
                if (null !== (temp = (string = temp[0]).match(/\d+/))) return temp[0];
            } else {
                var tempString = string.replace(/vol(ume)?.?\d+/i, "");
                if (null !== (temp = (tempString = tempString.replace(/:.+/i, "")).match(/\d+/i)) && 1 === temp.length) return temp[0];
            }
            return "";
        }
    }).call(this, __webpack_require__(2), __webpack_require__(3), __webpack_require__(1), __webpack_require__(0));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(utils, j, api, con) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return Gogoanime;
        });
        const Gogoanime = {
            name: "Gogoanime",
            domain: [ "https://gogoanimes.co", "https://gogoanime.tv" ],
            database: "Gogoanime",
            type: "anime",
            isSyncPage: function(url) {
                return "category" !== utils.urlPart(url, 3);
            },
            sync: {
                getTitle: function(url) {
                    return j.$(".anime-info a").first().text().trim();
                },
                getIdentifier: function(url) {
                    return utils.urlPart(url, 3).split("-episode")[0];
                },
                getOverviewUrl: function(url) {
                    return url.split("/").slice(0, 3).join("/") + "/category/" + Gogoanime.sync.getIdentifier(url);
                },
                getEpisode: function(url) {
                    return utils.urlPart(url, 3).split("episode-")[1];
                },
                nextEpUrl: function(url) {
                    return Gogoanime.domain + j.$(".anime_video_body_episodes_r a").last().attr("href");
                }
            },
            overview: {
                getTitle: function(url) {
                    return Gogoanime.overview.getIdentifier(url);
                },
                getIdentifier: function(url) {
                    return utils.urlPart(url, 4);
                },
                uiSelector: function(selector) {
                    selector.prependTo(j.$(".anime_info_body").first());
                },
                list: {
                    offsetHandler: !1,
                    elementsSelector: function() {
                        return j.$("#episode_related a");
                    },
                    elementUrl: function(selector) {
                        return utils.absoluteLink(selector.attr("href").replace(/^ /, ""), Gogoanime.domain);
                    },
                    elementEp: function(selector) {
                        var url = Gogoanime.overview.list.elementUrl(selector);
                        return Gogoanime.sync.getEpisode(url);
                    },
                    paginationNext: function() {
                        var next = !1, nextReturn = !1;
                        return j.$(j.$("#episode_page a").get().reverse()).each(function(index, el) {
                            if (next && !nextReturn) return el.click(), void (nextReturn = !0);
                            j.$(el).hasClass("active") && (next = !0);
                        }), nextReturn;
                    }
                }
            },
            init(page) {
                function start() {
                    Gogoanime.domain = window.location.protocol + "//" + window.location.hostname, page.handlePage(), 
                    j.$("#episode_page").click(function() {
                        setTimeout(function() {
                            page.handleList();
                        }, 500);
                    });
                }
                api.storage.addStyle(__webpack_require__(93).toString()), Gogoanime.isSyncPage(page.url) ? j.$(document).ready(function() {
                    start();
                }) : (con.log("noSync"), utils.waitUntilTrue(function() {
                    return j.$("#episode_related").length;
                }, function() {
                    start();
                }));
            }
        };
    }).call(this, __webpack_require__(2), __webpack_require__(3), __webpack_require__(0), __webpack_require__(1));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(j, utils, con, api) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return Anime4you;
        });
        const Anime4you = {
            name: "Anime4you",
            domain: "https://www.anime4you.one",
            database: "Anime4you",
            type: "anime",
            isSyncPage: function(url) {
                return "epi" === url.split("/")[7];
            },
            sync: {
                getTitle: function(url) {
                    return j.$(".titel").text().replace(j.$(".titel h5").text(), "").trim();
                },
                getIdentifier: function(url) {
                    return parseInt(utils.urlPart(url, 6)).toString();
                },
                getOverviewUrl: function(url) {
                    return Anime4you.domain + "/show/1/aid/" + Anime4you.sync.getIdentifier(url);
                },
                getEpisode: function(url) {
                    return parseInt(utils.urlPart(url, 8));
                },
                nextEpUrl: function(url) {
                    return Anime4you.domain + j.$(".vidplayer .forward a").first().attr("href");
                },
                uiSelector: function(selector) {
                    selector.insertAfter(j.$("#beschreibung > p").first());
                }
            },
            overview: {
                getTitle: function(url) {
                    return Anime4you.sync.getTitle(url);
                },
                getIdentifier: function(url) {
                    return Anime4you.sync.getIdentifier(url);
                },
                uiSelector: function(selector) {
                    Anime4you.sync.uiSelector(selector);
                },
                list: {
                    offsetHandler: !1,
                    elementsSelector: function() {
                        return j.$(".episoden li");
                    },
                    elementUrl: function(selector) {
                        return utils.absoluteLink(selector.find("a").first().attr("href"), Anime4you.domain);
                    },
                    elementEp: function(selector) {
                        return Anime4you.sync.getEpisode(Anime4you.overview.list.elementUrl(selector));
                    }
                }
            },
            init(page) {
                if ("Just a moment..." == document.title) return con.log("loading"), void page.cdn();
                api.storage.addStyle(__webpack_require__(95).toString()), j.$(document).ready(function() {
                    page.handlePage();
                });
            }
        };
    }).call(this, __webpack_require__(3), __webpack_require__(2), __webpack_require__(1), __webpack_require__(0));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(j, utils, api) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return Branitube;
        });
        const Branitube = {
            name: "Branitube",
            domain: "https://branitube.org",
            type: "anime",
            isSyncPage: function(url) {
                return "assistir" === url.split("/")[3];
            },
            sync: {
                getTitle: function(url) {
                    return j.$(".infosAtulEpisodio .nomeAnime").text();
                },
                getIdentifier: function(url) {
                    return utils.urlPart(url, 4);
                },
                getOverviewUrl: function(url) {
                    return Branitube.domain + "/animes/" + Branitube.sync.getIdentifier(url);
                },
                getEpisode: function(url) {
                    return parseInt(utils.urlPart(url, 6));
                },
                nextEpUrl: function(url) {
                    return utils.absoluteLink(j.$('[title^="Proximo Episodio"]').first().attr("href"), Branitube.domain);
                }
            },
            overview: {
                getTitle: function(url) {
                    return j.$(".nameAnime").text();
                },
                getIdentifier: function(url) {
                    return Branitube.sync.getIdentifier(url);
                },
                uiSelector: function(selector) {
                    j.$('<div class="animeResult" style="margin-bottom: 10px; padding: 12px"> <p id="malp">' + selector.html() + "</p></div>").prependTo(j.$(".theUpdates .contentLastUpdatesEps").first());
                },
                list: {
                    offsetHandler: !1,
                    elementsSelector: function() {
                        return j.$(".imgefeito > .episodio");
                    },
                    elementUrl: function(selector) {
                        return utils.absoluteLink(selector.find("a.episodioImages").first().attr("href"), Branitube.domain);
                    },
                    elementEp: function(selector) {
                        return Branitube.sync.getEpisode(Branitube.overview.list.elementUrl(selector));
                    }
                }
            },
            init(page) {
                api.storage.addStyle(__webpack_require__(97).toString()), j.$(document).ready(function() {
                    page.handlePage();
                });
            }
        };
    }).call(this, __webpack_require__(3), __webpack_require__(2), __webpack_require__(0));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(j, utils, con, api) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return Turkanime;
        });
        const Turkanime = {
            name: "Turkanime",
            domain: "http://www.turkanime.tv",
            type: "anime",
            isSyncPage: function(url) {
                return "video" === url.split("/")[3];
            },
            sync: {
                getTitle: function(url) {
                    return j.$(".breadcrumb a").first().text().trim();
                },
                getIdentifier: function(url) {
                    return Turkanime.overview.getIdentifier(Turkanime.sync.getOverviewUrl(url));
                },
                getOverviewUrl: function(url) {
                    return utils.absoluteLink(j.$(".breadcrumb a").first().attr("href"), Turkanime.domain);
                },
                getEpisode: function(url) {
                    return getEpisode(Turkanime.sync.getIdentifier(url), Turkanime.overview.getIdentifier(url));
                },
                nextEpUrl: function(url) {
                    if (j.$('.panel-footer a[href^="video"]').last().attr("href") != j.$('.panel-footer a[href^="video"]').first().attr("href")) return utils.absoluteLink(j.$('.panel-footer a[href^="video"]').last().attr("href"), Turkanime.domain);
                }
            },
            overview: {
                getTitle: function(url) {
                    return j.$("#detayPaylas .panel-title").first().text().trim();
                },
                getIdentifier: function(url) {
                    return utils.urlPart(url, 4);
                },
                uiSelector: function(selector) {
                    selector.prependTo(j.$("#detayPaylas .panel-body").first());
                },
                list: {
                    offsetHandler: !1,
                    elementsSelector: function() {
                        return j.$(".list.menum > li");
                    },
                    elementUrl: function(selector) {
                        return utils.absoluteLink(selector.find("a").last().attr("href").replace(/^\/\//, "http://"), Turkanime.domain);
                    },
                    elementEp: function(selector) {
                        var url = Turkanime.overview.list.elementUrl(selector);
                        return getEpisode(Turkanime.overview.getIdentifier(window.location.href), Turkanime.overview.getIdentifier(url));
                    }
                }
            },
            init(page) {
                if ("Just a moment..." == document.title) return con.log("loading"), void page.cdn();
                api.storage.addStyle(__webpack_require__(99).toString()), j.$(document).ready(function() {
                    Turkanime.isSyncPage(page.url) ? page.handlePage() : utils.waitUntilTrue(function() {
                        return j.$(".list.menum").length;
                    }, function() {
                        page.handlePage();
                    });
                });
            }
        };
        function getEpisode(selector, episodeSelector) {
            var diff = episodeSelector.replace(selector, "").replace(/-/g, ":");
            con.log("getEpisode", selector, episodeSelector, diff);
            var temp = diff.match(/\d+/);
            return null === temp ? 0 : parseInt(temp[0]);
        }
    }).call(this, __webpack_require__(3), __webpack_require__(2), __webpack_require__(1), __webpack_require__(0));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(j, utils, api, con) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return Twistmoe;
        });
        const Twistmoe = {
            name: "Twistmoe",
            domain: "https://twist.moe",
            database: "Twistmoe",
            type: "anime",
            isSyncPage: function(url) {
                return !0;
            },
            sync: {
                getTitle: function(url) {
                    return j.$(".series-title").text().trim();
                },
                getIdentifier: function(url) {
                    return utils.urlPart(url, 4);
                },
                getOverviewUrl: function(url) {
                    return Twistmoe.domain + "/a/" + Twistmoe.sync.getIdentifier(url) + "/1";
                },
                getEpisode: function(url) {
                    return parseInt(utils.urlPart(url, 5));
                },
                nextEpUrl: function(url) {
                    return utils.absoluteLink(j.$(".episode-list .current").first().parent().next().find("a").attr("href"), Twistmoe.domain);
                },
                uiSelector: function(selector) {
                    selector.insertAfter(j.$(".information").first());
                }
            },
            overview: {
                getTitle: function(url) {
                    return "";
                },
                getIdentifier: function(url) {
                    return "";
                },
                uiSelector: function(selector) {
                    return "";
                },
                list: {
                    offsetHandler: !1,
                    elementsSelector: function() {
                        return j.$(".episode-list li");
                    },
                    elementUrl: function(selector) {
                        return utils.absoluteLink(selector.find("a").first().attr("href"), Twistmoe.domain);
                    },
                    elementEp: function(selector) {
                        return Twistmoe.sync.getEpisode(Twistmoe.overview.list.elementUrl(selector));
                    }
                }
            },
            init(page) {
                function start() {
                    "a" == utils.urlPart(page.url, 3).toLowerCase() ? page.handlePage() : con.log("Not an anime page!");
                }
                api.storage.addStyle(__webpack_require__(101).toString()), j.$(document).ready(function() {
                    start(), utils.urlChangeDetect(function() {
                        page.url = window.location.href, page.UILoaded = !1, $("#flashinfo-div, #flash-div-bottom, #flash-div-top").remove(), 
                        start();
                    });
                });
            }
        };
    }).call(this, __webpack_require__(3), __webpack_require__(2), __webpack_require__(0), __webpack_require__(1));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(api, con, utils, j) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return Emby;
        });
        var __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = Promise))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator.throw(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        }, item = void 0;
        function getApiKey() {
            return __awaiter(this, void 0, void 0, function*() {
                return api.storage.get("emby_Api_Key");
            });
        }
        function setApiKey(key) {
            return __awaiter(this, void 0, void 0, function*() {
                return api.storage.set("emby_Api_Key", key);
            });
        }
        function getBase() {
            return __awaiter(this, void 0, void 0, function*() {
                return api.storage.get("emby_Base");
            });
        }
        function setBase(key) {
            return __awaiter(this, void 0, void 0, function*() {
                return api.storage.set("emby_Base", key);
            });
        }
        function checkApi(page) {
            return __awaiter(this, void 0, void 0, function*() {
                var videoEl = $("video");
                if (videoEl.length) {
                    $("html").addClass("miniMAL-hide");
                    var url = videoEl.attr("src");
                    if (con.log(url), /blob\:/i.test(url)) var apiBase = yield getBase(), itemId = yield function() {
                        return __awaiter(this, void 0, void 0, function*() {
                            return new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    resolve();
                                }, 1e4);
                            }).then(() => apiCall("/Sessions").then(response => {
                                con.error(response);
                                var data = JSON.parse(response.responseText);
                                con.log(data);
                                for (var i = 0; i < data.length; i++) {
                                    var sess = data[i];
                                    if (void 0 !== sess.NowPlayingItem) return con.log(sess.NowPlayingItem), sess.NowPlayingItem.Id;
                                }
                            }));
                        });
                    }(), apiKey = yield getApiKey(); else {
                        apiBase = url.split("/").splice(0, 4).join("/"), itemId = utils.urlPart(url, 5), 
                        apiKey = yield getApiKey();
                        setBase(apiBase);
                    }
                    var reqUrl = apiBase + "/Items?ids=" + itemId + "&api_key=" + apiKey;
                    con.log("reqUrl", reqUrl, "base", apiBase, "apiKey", apiKey), api.request.xhr("GET", reqUrl).then(response => {
                        var data = JSON.parse(response.responseText);
                        return item = data.Items[0], reqUrl = apiBase + "/Genres?Ids=" + item.SeriesId + "&api_key=" + apiKey, 
                        con.log(data), api.request.xhr("GET", reqUrl);
                    }).then(response => {
                        var genres = JSON.parse(response.responseText);
                        con.log("genres", genres);
                        for (var i = 0; i < genres.Items.length; i++) {
                            if ("Anime" === genres.Items[i].Name) {
                                con.info("Anime detected"), page.url = window.location.origin + "/#!/itemdetails.html?id=" + itemId, 
                                page.handlePage(page.url), $("html").removeClass("miniMAL-hide");
                                break;
                            }
                        }
                    });
                }
            });
        }
        function urlChange(page) {
            return __awaiter(this, void 0, void 0, function*() {
                if ($("html").addClass("miniMAL-hide"), -1 !== window.location.href.indexOf("id=")) {
                    var reqUrl = "/Items?ids=" + utils.urlParam(window.location.href, "id");
                    apiCall(reqUrl).then(response => {
                        var data = JSON.parse(response.responseText);
                        switch (data.Items[0].Type) {
                          case "Season":
                            con.log("Season", data), item = data.Items[0], apiCall(reqUrl = "/Genres?Ids=" + item.SeriesId).then(response => {
                                var genres = JSON.parse(response.responseText);
                                con.log("genres", genres);
                                for (var i = 0; i < genres.Items.length; i++) {
                                    if ("Anime" === genres.Items[i].Name) {
                                        con.info("Anime detected"), page.handlePage(), $("html").removeClass("miniMAL-hide");
                                        break;
                                    }
                                }
                            });
                            break;

                          case "Series":
                            con.log("Series", data);
                            break;

                          default:
                            con.log("Not recognized", data);
                        }
                    });
                }
            });
        }
        function testApi() {
            return __awaiter(this, void 0, void 0, function*() {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function*() {
                    var base = yield getBase();
                    void 0 !== base && "" !== base || (con.info("No base"), base = yield function() {
                        return __awaiter(this, void 0, void 0, function*() {
                            return new Promise((resolve, reject) => {
                                utils.waitUntilTrue(function() {
                                    return j.$("*[data-url]").length;
                                }, function() {
                                    var base = j.$("*[data-url]").first().attr("data-url").split("/").splice(0, 4).join("/");
                                    con.log("Base Found", base), resolve(base);
                                });
                            });
                        });
                    }()), setBase(base), apiCall("/System/Info", null, base).then(response => 200 !== response.status ? (con.error("Not Authenticated"), 
                    setBase(""), reject(), !1) : (resolve(), !0));
                }));
            });
        }
        function apiCall(url, apiKey = null, base = null) {
            return __awaiter(this, void 0, void 0, function*() {
                if (null === apiKey && (apiKey = yield getApiKey()), null === base && (base = yield getBase()), 
                -1 !== url.indexOf("?")) var pre = "&"; else pre = "?";
                return url = base + url + pre + "api_key=" + apiKey, con.log("Api Call", url), api.request.xhr("GET", url);
            });
        }
        const Emby = {
            name: "Emby",
            domain: "http://app.emby.media",
            type: "anime",
            isSyncPage: function(url) {
                return "Episode" === item.Type;
            },
            sync: {
                getTitle: function(url) {
                    return item.SeriesName + (item.ParentIndexNumber > 1 ? " Season " + item.ParentIndexNumber : "");
                },
                getIdentifier: function(url) {
                    return void 0 !== item.SeasonId ? item.SeasonId : void 0 !== item.SeriesId ? item.SeriesId : item.Id;
                },
                getOverviewUrl: function(url) {
                    return Emby.domain + "/#!/itemdetails.html?id=" + Emby.sync.getIdentifier(url);
                },
                getEpisode: function(url) {
                    return item.IndexNumber;
                }
            },
            overview: {
                getTitle: function(url) {
                    return item.SeriesName + (item.IndexNumber > 1 ? " Season " + item.IndexNumber : "");
                },
                getIdentifier: function(url) {
                    return item.Id;
                },
                uiSelector: function(selector) {
                    selector.appendTo(j.$(".page:not(.hide) .detailSection").first());
                }
            },
            init(page) {
                api.storage.addStyle(__webpack_require__(103).toString()), testApi().catch(() => (con.info("Not Authenticated"), 
                function askForApiKey() {
                    return __awaiter(this, void 0, void 0, function*() {
                        return new Promise((resolve, reject) => {
                            var msg = utils.flashm(`<p>${api.storage.lang("Emby_Authenticate")}</p>\n      <p><input id="MS-ApiKey" type="text" placeholder="Please enter the Api Key here" style="width: 100%;"></p>\n      <div style="display: flex; justify-content: space-around;">\n        <button class="Yes" style="background-color: transparent; border: none; color: rgb(255,64,129);margin-top: 10px; cursor:pointer;">OK</button>\n        <button class="Cancel" style="background-color: transparent; border: none; color: rgb(255,64,129);margin-top: 10px; cursor:pointer;">CANCEL</button>\n      </div>\n      `, {
                                position: "bottom",
                                permanent: !0,
                                type: "getApi"
                            });
                            msg.find(".Yes").click(function(evt) {
                                var api = j.$("#MS-ApiKey").val();
                                con.info("api", api), setApiKey(api), j.$(evt.target).parentsUntil(".flash").remove(), 
                                testApi().then(() => {
                                    resolve(!0);
                                }).catch(() => __awaiter(this, void 0, void 0, function*() {
                                    utils.flashm("Could not Authenticate"), yield askForApiKey(), resolve(!0);
                                }));
                            }), msg.find(".Cancel").click(function(evt) {
                                j.$(evt.target).parentsUntil(".flash").remove(), reject(!1);
                            });
                        });
                    });
                }())).then(() => {
                    con.info("Authenticated"), utils.changeDetect(() => {
                        page.UILoaded = !1, $("#flashinfo-div, #flash-div-bottom, #flash-div-top").remove(), 
                        checkApi(page);
                    }, () => {
                        var src = $("video").first().attr("src");
                        return void 0 === src ? "NaN" : src;
                    }), utils.urlChangeDetect(function() {
                        -1 === window.location.href.indexOf("video") && -1 === window.location.href.indexOf("#dlg") && ($("#flashinfo-div, #flash-div-bottom, #flash-div-top, #malp").remove(), 
                        page.UILoaded = !1, urlChange(page));
                    }), j.$(document).ready(function() {
                        utils.waitUntilTrue(function() {
                            return j.$(".page").length;
                        }, function() {
                            urlChange(page);
                        });
                    }), document.addEventListener("fullscreenchange", function() {
                        window.fullScreen || window.innerWidth == screen.width && window.innerHeight == screen.height ? $("html").addClass("miniMAL-Fullscreen") : $("html").removeClass("miniMAL-Fullscreen");
                    });
                });
            }
        };
    }).call(this, __webpack_require__(0), __webpack_require__(1), __webpack_require__(2), __webpack_require__(3));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(api, utils, con, j) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return Plex;
        });
        var __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = Promise))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator.throw(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        }, item = void 0;
        function urlChange(page, curUrl = window.location.href, player = !1) {
            return __awaiter(this, void 0, void 0, function*() {
                $("html").addClass("miniMAL-hide");
                var path = utils.urlParam(curUrl, "key");
                path && -1 !== path.indexOf("metadata") && function(url, apiKey = null, base = null) {
                    return __awaiter(this, void 0, void 0, function*() {
                        if (null === apiKey && (apiKey = yield function() {
                            return __awaiter(this, void 0, void 0, function*() {
                                return api.storage.get("Plex_Api_Key");
                            });
                        }()), null === base && (base = yield function() {
                            return __awaiter(this, void 0, void 0, function*() {
                                return api.storage.get("Plex_Base");
                            });
                        }()), -1 !== url.indexOf("?")) var pre = "&"; else var pre = "?";
                        return url = base + url + pre + "X-Plex-Token=" + apiKey, con.log("Api Call", url), 
                        api.request.xhr("GET", {
                            url: url,
                            headers: {
                                Accept: "application/json"
                            }
                        });
                    });
                }(decodeURIComponent(path)).then(response => {
                    if (200 !== response.status) return con.error("No Api Key"), void $("html").addClass("noApiKey");
                    try {
                        var data = JSON.parse(response.responseText);
                    } catch (e) {
                        return con.error(e), void $("html").addClass("noApiKey");
                    }
                    if (/(anime|asian)/i.test(data.MediaContainer.librarySectionTitle)) switch ((item = data.MediaContainer.Metadata[0]).type) {
                      case "show":
                        con.log("Show", data), utils.waitUntilTrue(function() {
                            return j.$('[data-qa-id="preplayMainTitle"]').length;
                        }, function() {
                            page.UILoaded = !1, page.handlePage(curUrl), $("html").removeClass("miniMAL-hide");
                        });
                        break;

                      case "episode":
                        con.log("Episode", data), player && (page.handlePage(curUrl), $("html").removeClass("miniMAL-hide"));
                        break;

                      default:
                        con.log("Not recognized", data);
                    } else con.info("!Not an Anime!");
                });
            });
        }
        const Plex = {
            name: "Plex",
            domain: "http://app.plex.tv",
            type: "anime",
            isSyncPage: function(url) {
                return "episode" === item.type;
            },
            sync: {
                getTitle: function(url) {
                    return item.grandparentTitle + (item.parentIndex > 1 ? " Season " + item.parentIndex : "");
                },
                getIdentifier: function(url) {
                    return void 0 !== item.parentKey ? item.parentKey.split("/")[3] : void 0 !== item.grandparentKey ? item.grandparentKey.split("/")[3] : item.key.split("/")[3];
                },
                getOverviewUrl: function(url) {
                    return Plex.domain + $('[class^="AudioVideoPlayerView"] [class*="MetadataPosterTitle"][data-qa-id="metadataTitleLink"]').first().attr("href");
                },
                getEpisode: function(url) {
                    return item.index;
                }
            },
            overview: {
                getTitle: function(url) {
                    return item.title;
                },
                getIdentifier: function(url) {
                    return item.key.split("/")[3];
                },
                uiSelector: function(selector) {
                    selector.insertAfter(j.$('[data-qa-id="preplayMainTitle"]').first());
                }
            },
            init(page) {
                api.storage.addStyle(__webpack_require__(105).toString()), utils.changeDetect(() => {
                    var href = $("[download]").attr("href"), apiBase = href.split("/").splice(0, 3).join("/"), apiKey = utils.urlParam(href, "X-Plex-Token");
                    con.info("Set Api", apiBase, apiKey), function(key) {
                        __awaiter(this, void 0, void 0, function*() {
                            return api.storage.set("Plex_Api_Key", key);
                        });
                    }(apiKey), function(key) {
                        __awaiter(this, void 0, void 0, function*() {
                            return api.storage.set("Plex_Base", key);
                        });
                    }(apiBase), $("html").removeClass("noApiKey");
                }, () => {
                    return $("[download]").length;
                }), utils.urlChangeDetect(function() {
                    $('[class^="AudioVideoPlayerView"] [class*="MetadataPosterTitle"] [data-qa-id="metadataTitleLink"]').length || urlChange(page);
                }), j.$(document).ready(function() {
                    $('[class^="AudioVideoPlayerView"] [class*="MetadataPosterTitle"] [data-qa-id="metadataTitleLink"]').length || urlChange(page);
                }), utils.changeDetect(() => {
                    page.UILoaded = !1, $("#flashinfo-div, #flash-div-bottom, #flash-div-top").remove();
                    var metaUrl = $('[class^="AudioVideoPlayerView"] [class*="MetadataPosterTitle"] [data-qa-id="metadataTitleLink"]').first().attr("href");
                    void 0 !== metaUrl && urlChange(page, Plex.domain + metaUrl, !0);
                }, () => {
                    var src = $('[class^="AudioVideoPlayerView"] [class*="MetadataPosterTitle"] [data-qa-id="metadataTitleLink"]').first().attr("href");
                    return void 0 === src ? "NaN" : src;
                }), document.addEventListener("fullscreenchange", function() {
                    window.fullScreen || window.innerWidth == screen.width && window.innerHeight == screen.height ? $("html").addClass("miniMAL-Fullscreen") : $("html").removeClass("miniMAL-Fullscreen");
                });
            }
        };
    }).call(this, __webpack_require__(0), __webpack_require__(2), __webpack_require__(1), __webpack_require__(3));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(utils, api, con, j) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return Netflix;
        });
        var ident = void 0, genres = [ "2797624", "7424", "67614", "2653", "587", "625", "79307", "9302", "79488", "452", "79448", "11146", "79440", "3063", "79543", "79427", "10695", "2729", "79329", "79572", "64256", "2951909" ];
        const Netflix = {
            name: "Netflix",
            domain: "https://www.netflix.com",
            database: "Netflix",
            type: "anime",
            isSyncPage: function(url) {
                return !0;
            },
            sync: {
                getTitle: function(url) {
                    return j.$(".ellipsize-text h4").text().trim();
                },
                getIdentifier: function(url) {
                    return ident;
                },
                getOverviewUrl: function(url) {
                    return Netflix.domain + "/title/" + Netflix.sync.getIdentifier(url);
                },
                getEpisode: function(url) {
                    var temp = j.$(".ellipsize-text span").first().text().trim().match(/\d+$/);
                    return null !== temp ? parseInt(temp[0]) : 1;
                }
            },
            init(page) {
                function ready() {
                    $("#flashinfo-div, #flash-div-bottom, #flash-div-top, #malp").remove(), $("html").addClass("miniMAL-hide"), 
                    "watch" == utils.urlPart(window.location.href, 3) && utils.waitUntilTrue(function() {
                        return j.$(".ellipsize-text").length;
                    }, function() {
                        !function(page) {
                            var videoId = utils.urlPart(window.location.href, 4), reqUrl = Netflix.domain + "/title/" + videoId;
                            api.request.xhr("GET", reqUrl).then(response => {
                                con.log(response);
                                var anime = !1;
                                genres.forEach(function(genre) {
                                    -1 !== response.responseText.indexOf('"genres","' + genre + '"') && (anime = !0);
                                }), anime ? (ident = utils.urlPart(response.finalUrl, 4), page.handlePage(), $("html").removeClass("miniMAL-hide")) : con.info("No Anime");
                            });
                        }(page);
                    });
                }
                api.storage.addStyle(__webpack_require__(107).toString()), j.$(document).ready(function() {
                    ready();
                }), utils.urlChangeDetect(function() {
                    ready();
                });
            }
        };
    }).call(this, __webpack_require__(2), __webpack_require__(0), __webpack_require__(1), __webpack_require__(3));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(j, utils, api) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return Otakustream;
        });
        const Otakustream = {
            name: "Otakustream",
            domain: "https://otakustream.tv",
            type: "anime",
            isSyncPage: function(url) {
                return "movie" === url.split("/")[3] || void 0 !== url.split("/")[5] && "" != url.split("/")[5];
            },
            sync: {
                getTitle: function(url) {
                    return "movie" === url.split("/")[3] ? Otakustream.overview.getTitle(url) : j.$("#breadcrumbs a").last().text().trim();
                },
                getIdentifier: function(url) {
                    return utils.urlPart(url, 4).toLowerCase();
                },
                getOverviewUrl: function(url) {
                    return url.split("/").slice(0, 5).join("/");
                },
                getEpisode: function(url) {
                    var EpText = utils.urlPart(url, 5), temp = EpText.match(/-\d+/);
                    return null !== temp && (EpText = temp[0]), null === (temp = EpText.match(/\d+/)) ? 1 : parseInt(temp[0]);
                },
                nextEpUrl: function(url) {
                    return utils.absoluteLink(j.$(".navigation-right").first().attr("href"), Otakustream.domain);
                }
            },
            overview: {
                getTitle: function(url) {
                    return j.$(".breadcrumb_last").text().trim();
                },
                getIdentifier: function(url) {
                    return Otakustream.sync.getIdentifier(url);
                },
                uiSelector: function(selector) {
                    selector.insertAfter(j.$(".single-details h1").first());
                },
                list: {
                    offsetHandler: !1,
                    elementsSelector: function() {
                        return j.$(".ep-list li");
                    },
                    elementUrl: function(selector) {
                        return utils.absoluteLink(selector.find("a").first().attr("href"), Otakustream.domain);
                    },
                    elementEp: function(selector) {
                        return Otakustream.sync.getEpisode(Otakustream.overview.list.elementUrl(selector));
                    }
                }
            },
            init(page) {
                api.storage.addStyle(__webpack_require__(109).toString()), j.$(document).ready(function() {
                    page.handlePage();
                });
            }
        };
    }).call(this, __webpack_require__(3), __webpack_require__(2), __webpack_require__(0));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(j, utils, api) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return animepahe;
        });
        const animepahe = {
            name: "animepahe",
            domain: "https://animepahe.com",
            type: "anime",
            isSyncPage: function(url) {
                return "play" === url.split("/")[3];
            },
            sync: {
                getTitle: function(url) {
                    return j.$(".theatre-info h1 a").first().text();
                },
                getIdentifier: function(url) {
                    return utils.urlPart(url, 4);
                },
                getOverviewUrl: function(url) {
                    return animepahe.domain + "/anime/" + animepahe.sync.getIdentifier(url);
                },
                getEpisode: function(url) {
                    return j.$(".theatre-info h1")[0].childNodes[2].textContent.replace(/[^0-9\.]+/g, "");
                },
                nextEpUrl: function(url) {
                    return animepahe.domain + j.$(".sequel a").first().attr("href");
                },
                uiSelector: function(selector) {
                    selector.insertAfter(j.$(".anime-season"));
                }
            },
            overview: {
                getTitle: function(url) {
                    return utils.getBaseText(j.$(".title-wrapper h1").first()).trim();
                },
                getIdentifier: function(url) {
                    return utils.urlPart(url, 4);
                },
                uiSelector: function(selector) {
                    selector.insertAfter(j.$(".anime-detail"));
                },
                list: {
                    offsetHandler: !1,
                    elementsSelector: function() {
                        return j.$(".episode-list .episode");
                    },
                    elementUrl: function(selector) {
                        return animepahe.domain + selector.find("a").first().attr("href");
                    },
                    elementEp: function(selector) {
                        return selector.find(".episode-number").first().text().replace(selector.find(".episode-number > *").text(), "");
                    }
                }
            },
            init(page) {
                api.storage.addStyle(__webpack_require__(111).toString()), animepahe.isSyncPage(page.url) ? j.$(document).ready(function() {
                    page.handlePage();
                }) : utils.waitUntilTrue(function() {
                    return animepahe.overview.list.elementsSelector();
                }, function() {
                    page.handlePage();
                });
            }
        };
    }).call(this, __webpack_require__(3), __webpack_require__(2), __webpack_require__(0));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(j, utils, api, con) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return animeflv;
        });
        const animeflv = {
            name: "animeflv",
            domain: "https://animeflv.net",
            type: "anime",
            isSyncPage: function(url) {
                return !!j.$("h2.SubTitle").length;
            },
            sync: {
                getTitle: function(url) {
                    return j.$("h1.Title").text().split(" Episodio")[0].trim();
                },
                getIdentifier: function(url) {
                    return utils.urlPart(animeflv.domain + j.$(".fa-th-list").attr("href"), 4) + "/" + utils.urlPart(animeflv.domain + j.$(".fa-th-list").attr("href"), 5);
                },
                getOverviewUrl: function(url) {
                    return animeflv.domain + j.$(".fa-th-list").attr("href");
                },
                getEpisode: function(url) {
                    return parseInt(j.$("h2.SubTitle").text().replace("Episodio ", "").trim());
                },
                nextEpUrl: function(url) {
                    return animeflv.domain + j.$(".fa-chevron-right").attr("href");
                },
                uiSelector: function(selector) {
                    selector.insertAfter(j.$(".CapOptns"));
                }
            },
            overview: {
                getTitle: function(url) {
                    return j.$("h2.Title").text();
                },
                getIdentifier: function(url) {
                    return utils.urlPart(url, 4) + "/" + utils.urlPart(url, 5);
                },
                uiSelector: function(selector) {
                    selector.insertAfter(j.$(".Description"));
                },
                list: {
                    offsetHandler: !1,
                    elementsSelector: function() {
                        var url = window.location.href;
                        document.body.insertAdjacentHTML("afterbegin", '<div id="MALSync" class="MALSync" style="display: none;"><ul id="MALSyncUl" class="MALSyncUl"></ul></div>');
                        var idMALSync = document.getElementById("MALSyncUl"), html = document.body.innerHTML, scriptEps = /<script>\s\s   var([^]*?)<\/script>/g.exec(html);
                        if (null != scriptEps && null != (scriptEps = scriptEps[1] || null)) {
                            var eps = scriptEps.toString().match(/\[([^\[\]]{0,10},{0,10})\]/g);
                            null != eps && eps.forEach(element => {
                                if (null != idMALSync) {
                                    var Url = animeflv.domain + "/ver/" + element.split(",")[1].replace("]", "") + "/" + utils.urlPart(url, 5) + "-" + element.split(",")[0].replace("[", ""), Episodio = element.split(",")[0].replace("[", "");
                                    idMALSync.innerHTML += '<li><a href="' + Url + '" epi="' + Episodio + '"></a> </li>';
                                }
                            });
                        }
                        return j.$(".MALSync a");
                    },
                    elementUrl: function(selector) {
                        return utils.absoluteLink(selector.attr("href"), animeflv.domain);
                    },
                    elementEp: function(selector) {
                        return selector.attr("epi");
                    },
                    handleListHook: function(epi, epilist) {
                        if (epi++, epilist.length - 1 >= epi) {
                            var cover = j.$(".AnimeCover img").attr("src"), name = j.$(".Container h2").text(), epiAct = '<li class="fa-play-circle Next"><a href="' + epilist[epi][0].toString() + '"><figure><img src="' + cover + '" alt=""></figure><h3 class="Title">' + name + "</h3><p>Episodio " + epi + '</p><span style="position: absolute; top: 0; bottom: 0; margin: auto; right: 20px; line-height: 30px; font-size: 16px; font-weight: 700; height: 30px;">Siguiente Episodio</span></a></li>';
                            j.$(".Main .ListCaps").prepend(epiAct);
                        }
                    }
                }
            },
            init(page) {
                if (api.storage.addStyle(__webpack_require__(113).toString()), "Just a moment..." == document.title) return con.log("loading"), 
                void page.cdn();
                j.$(document).ready(function() {
                    page.handlePage();
                });
            }
        };
    }).call(this, __webpack_require__(3), __webpack_require__(2), __webpack_require__(0), __webpack_require__(1));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(utils, j, api) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return Jkanime;
        });
        var check = 0;
        const Jkanime = {
            name: "Jkanime",
            domain: "https://jkanime.net/",
            type: "anime",
            isSyncPage: function(url) {
                return 1 != isNaN(parseInt(utils.urlPart(url, 4)));
            },
            sync: {
                getTitle: function(url) {
                    return j.$(".video-header h1").text().split(" - ")[0];
                },
                getIdentifier: function(url) {
                    return utils.urlPart(url, 3);
                },
                getOverviewUrl: function(url) {
                    return j.$(".vnav-list").attr("href");
                },
                getEpisode: function(url) {
                    return j.$(".video-header h1").text().split(" - ")[1];
                },
                nextEpUrl: function(url) {
                    var nextUrl = j.$(".vnav-right").attr("href");
                    if ("#" != nextUrl) return nextUrl;
                },
                uiSelector: function(selector) {
                    selector.insertAfter(j.$(".server-box"));
                }
            },
            overview: {
                getTitle: function(url) {
                    return j.$(".sinopsis-box h2").text();
                },
                getIdentifier: function(url) {
                    return utils.urlPart(url, 3);
                },
                uiSelector: function(selector) {
                    selector.insertAfter(j.$(".sinopsis-links"));
                },
                list: {
                    offsetHandler: !1,
                    elementsSelector: function() {
                        document.body.insertAdjacentHTML("afterbegin", '<div id="MALSync" class="MALSync" style="display: none;"><ul id="MALSyncUl" class="MALSyncUl"></ul></div>');
                        for (var idMALSync = document.getElementById("MALSyncUl"), lastEps = j.$(".navigation a").last().text().split("-")[1].trim(), i = 1; i < lastEps; i++) null != idMALSync && (idMALSync.innerHTML += '<li><a href="' + document.URL + i + '" epi="' + i + '"></a> </li>');
                        return j.$(".MALSync a");
                    },
                    elementUrl: function(selector) {
                        return utils.absoluteLink(selector.attr("href"), Jkanime.domain);
                    },
                    elementEp: function(selector) {
                        return selector.attr("epi");
                    },
                    handleListHook: function(epi, epilist) {
                        if (epi++, epilist.length >= epi) {
                            if (0 == check) {
                                for (var buttons = j.$(".navigation a"), i = 0; i < buttons.length; i++) buttons[i].text.split("-")[0].split() <= epi && buttons[i].text.split("-")[1].split() >= epi && buttons[i].click();
                                check = 1;
                            }
                            setTimeout(function() {
                                j.$("#episodes-content .cap-post").each(function(i, obj) {
                                    obj.innerText.split(" ")[1] == epi && (j.$("#episodes-content .cap-post").eq(i).addClass("mal-sync-active"), 
                                    0 == check && j.$("#episodes-content .cap-post:eq(" + i + ")").find("i").first().remove());
                                });
                            }, 500);
                        }
                    }
                }
            },
            init(page) {
                api.storage.addStyle(__webpack_require__(115).toString()), j.$(document).ready(function() {
                    page.handlePage();
                }), j.$(".navigation a").click(function() {
                    1 == check && page.handleList();
                });
            }
        };
    }).call(this, __webpack_require__(2), __webpack_require__(3), __webpack_require__(0));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(j, api, con) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return initIframeModal;
        });
        var minimalObj, _minimalClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59);
        function initIframeModal(page) {
            var posLeft = api.settings.get("posLeft"), miniMalWidth = api.settings.get("miniMalWidth"), miniMalHeight = api.settings.get("miniMalHeight");
            if (!j.$("#info-popup").length) {
                api.storage.addStyle(".modal-content-kal.fullscreen{width: 100% !important;height: 100% !important; bottom: 0 !important;" + posLeft + ": 0 !important;}      .modal-content-kal{-webkit-transition: all 0.5s ease; -moz-transition: all 0.5s ease; -o-transition: all 0.5s ease; transition: all 0.5s ease;}      .floatbutton:hover {background-color:rgb(63,81,181) !important;}      .floatbutton:hover div {background-color:white;}      .floatbutton div {background-color:black;-webkit-transition: all 0.5s ease;-moz-transition: all 0.5s ease;-o-transition: all 0.5s ease;transition: all 0.5s ease;}      .floatbutton {       z-index: 9999;display: none; position:fixed; bottom:40px; right:40px; border-radius: 50%; font-size: 24px; height: 56px; margin: auto; min-width: 56px; width: 56px; padding: 0; overflow: hidden; background: rgba(158,158,158,.2); box-shadow: 0 1px 1.5px 0 rgba(0,0,0,.12), 0 1px 1px 0 rgba(0,0,0,.24); line-height: normal; border: none;       font-weight: 500; text-transform: uppercase; letter-spacing: 0; will-change: box-shadow; transition: box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1); outline: none; cursor: pointer; text-decoration: none; text-align: center; vertical-align: middle; padding: 16px;      }      .mdl-button{       background: #3f51b5; color: #fff;box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);       border: none; border-radius: 2px;      }      .floatbutton.stealth {        background: rgba(158,158,158,.03);      }      .floatbutton.stealth .open-info-popup{        visibility: hidden;      }      .floatbutton.floatHide{        visibility: hidden !important;      }");
                var position = "max-width: 100%; max-height: 100%; min-width: 500px; min-height: 300px; width: " + miniMalWidth + "; height: " + miniMalHeight + "; position: absolute; bottom: 0%; " + posLeft + ": 0%";
                j.$(window).width() < 500 && (position = "width: 100vw; height: 100%; position: absolute; top: 0%; " + posLeft + ": 0%");
                var material = '<dialog class="modal-kal" id="info-popup" style="pointer-events: none;display: none; position: fixed;z-index: 9999;left: 0;top: 0;bottom: 0;width: 100%; height: 100%; background-color: transparent; padding: 0; margin: 0; border: 0;">';
                material += '<div id="modal-content" class="modal-content-kal" Style="pointer-events: all; background-color: #f9f9f9; margin: 0; ' + position + '">', 
                material += "</div>", material += "</dialog>", j.$("body").after(material);
                var additionalClasses = "";
                api.settings.get("floatButtonStealth") && (additionalClasses += "stealth "), api.settings.get("floatButtonHide") && (additionalClasses += "floatHide ");
                var floatbutton = '<button class="open-info-popup floatbutton ' + additionalClasses + '" style="">';
                floatbutton += '<i class="my-float open-info-popup" style="margin-top:22px;"><div class="open-info-popup" style="width: 100%; height: 4px; margin-bottom: 15%;"></div><div class="open-info-popup" style="width: 100%; height: 4px; margin-bottom: 15%;"></div><div class="open-info-popup" style="width: 100%; height: 4px"></div></i></button>', 
                j.$("#info-popup").after(floatbutton), j.$(".open-info-popup").show(), api.settings.get("autoCloseMinimal") && j.$(".modal-kal").css("pointer-events", "initial"), 
                document.addEventListener("click", function(e) {
                    j.$(e.target).hasClass("open-info-popup") && (con.log("Open miniMAL"), "none" == j.$("#info-popup").css("display") ? (document.getElementById("info-popup").style.display = "block", 
                    j.$(".floatbutton").fadeOut(), j.$("#info-iframe").length ? void 0 !== minimalObj && void 0 !== page.malObj && (minimalObj.fillBase(page.malObj.url), 
                    minimalObj.setPageSync(page)) : function(page) {
                        var iframe = document.createElement("iframe");
                        iframe.setAttribute("id", "info-iframe"), iframe.setAttribute("style", "height:100%;width:100%;border:0;display:block;"), 
                        iframe.onload = function() {
                            var head = j.$("#info-iframe").contents().find("head");
                            api.storage.injectjsResource("material.js", head), api.storage.updateDom(head), 
                            api.storage.injectCssResource("material.css", head), api.storage.injectCssResource("materialFont.css", head), 
                            setTimeout(function() {
                                minimalObj = new _minimalClass__WEBPACK_IMPORTED_MODULE_0__.a(j.$("#info-iframe").contents().find("html")), 
                                void 0 !== page && (void 0 !== page.malObj ? minimalObj.fillBase(page.malObj.url) : minimalObj.fillBase(null), 
                                minimalObj.setPageSync(page));
                            }, 200);
                        }, document.getElementById("modal-content").appendChild(iframe), j.$("#modal-content").append('<div class="kal-tempHeader" style="position:  absolute; width: 100%; height:  103px; background-color: rgb(63,81,181); "></div>'), 
                        j.$("#info-iframe").length && "block" == j.$("#info-iframe").css("display") || (j.$("#info-popup").remove(), 
                        alert("The miniMAL iframe could not be loaded.\nThis could be caused by an AdBlocker."));
                    }(page)) : (document.getElementById("info-popup").style.display = "none", j.$(".floatbutton").fadeIn())), 
                    j.$(e.target).hasClass("modal-kal") && (document.getElementById("info-popup").style.display = "none", 
                    j.$(".floatbutton").fadeIn());
                });
            }
        }
    }).call(this, __webpack_require__(3), __webpack_require__(0), __webpack_require__(1));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(j, utils, api, con) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return minimal;
        });
        var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35), _minimalApp_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(73), vue_clazy_load__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(60), __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = Promise))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator.throw(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        vue__WEBPACK_IMPORTED_MODULE_0__.a.use(vue_clazy_load__WEBPACK_IMPORTED_MODULE_2__);
        class minimal {
            constructor(minimal) {
                this.minimal = minimal, this.history = [], this.minimal.find("body").append('<div id="minimalApp"></div>'), 
                this.minimalVue = new vue__WEBPACK_IMPORTED_MODULE_0__.a({
                    el: this.minimal.find("#minimalApp").get(0),
                    render: h => h(_minimalApp_vue__WEBPACK_IMPORTED_MODULE_1__.a)
                }), this.minimal.find("head").append('<base href="https://myanimelist.net/">'), 
                this.uiListener(), this.injectCss(), this.loadSettings(), this.updateDom();
            }
            uiListener() {
                var modal = document.getElementById("info-popup"), This = this;
                this.minimal.on("click", ".mdl-layout__content a", function(e) {
                    if ("_blank" !== j.$(this).attr("target") && !j.$(this).hasClass("nojs")) {
                        e.preventDefault();
                        var url = utils.absoluteLink(j.$(this).attr("href"), "https://myanimelist.net");
                        if (!This.fill(url)) {
                            var win = window.open(url, "_blank");
                            win ? win.focus() : alert(api.storage.lang("minimalClass_Popup"));
                        }
                    }
                }), this.minimal.find("#close-info-popup").click(function() {
                    This.isPopup() ? window.close() : (modal.style.display = "none", j.$(".floatbutton").fadeIn());
                }), this.minimal.find("#material-fullscreen").click(function() {
                    j.$(".modal-content-kal.fullscreen").length ? (j.$(".modal-content-kal").removeClass("fullscreen"), 
                    j.$(this).find("i").text("fullscreen")) : (j.$(".modal-content-kal").addClass("fullscreen"), 
                    j.$(this).find("i").text("fullscreen_exit"));
                });
            }
            isPopup() {
                return !!j.$("#Mal-Sync-Popup").length;
            }
            updateDom() {
                this.minimal.find("head").click();
            }
            injectCss() {
                this.minimal.find("head").append(j.$("<style>").html(__webpack_require__(120).toString()));
            }
            fill(url) {
                return this.minimalVue.$children[0].fill(url);
            }
            fillBase(url) {
                return this.minimalVue.$children[0].fillBase(url);
            }
            setPageSync(page) {
                this.minimalVue.$children[0].setPage(page);
            }
            loadSettings() {
                var This = this;
                this.minimal.find("#posLeft").val(api.settings.get("posLeft")), this.minimal.find("#posLeft").change(function() {
                    api.settings.set("posLeft", j.$(this).val()), j.$("#modal-content").css("right", "auto").css("left", "auto").css(j.$(this).val(), "0");
                }), this.minimal.find("#autoTrackingModeanime").val(api.settings.get("autoTrackingModeanime")), 
                this.minimal.find("#autoTrackingModeanime").change(function() {
                    api.settings.set("autoTrackingModeanime", j.$(this).val());
                }), this.minimal.find("#autoTrackingModemanga").val(api.settings.get("autoTrackingModemanga")), 
                this.minimal.find("#autoTrackingModemanga").change(function() {
                    api.settings.set("autoTrackingModemanga", j.$(this).val());
                }), this.minimal.find("#miniMalWidth").on("input", function() {
                    var miniMalWidth = This.minimal.find("#miniMalWidth").val();
                    null !== miniMalWidth && ("" === miniMalWidth && (miniMalWidth = "30%", utils.flashm("Width reset")), 
                    api.settings.set("miniMalWidth", miniMalWidth)), j.$("#modal-content").css("width", miniMalWidth);
                }), this.minimal.find("#syncMode").change(function() {
                    var value = j.$(this).val();
                    api.settings.set("syncMode", value);
                }), this.minimal.find("#syncMode").val(api.settings.get("syncMode")).change(), this.minimal.find("#miniMalHeight").on("input", function() {
                    var miniMalHeight = This.minimal.find("#miniMalHeight").val();
                    null !== miniMalHeight && ("" === miniMalHeight && (miniMalHeight = "90%", utils.flashm("Height reset")), 
                    api.settings.set("miniMalHeight", miniMalHeight)), j.$("#modal-content").css("height", miniMalHeight);
                }), this.minimal.find("#malThumbnail").val(api.settings.get("malThumbnail")), this.minimal.find("#malThumbnail").change(function() {
                    api.settings.set("malThumbnail", This.minimal.find("#malThumbnail").val());
                }), this.minimal.find("#clearCache").click(function() {
                    return __awaiter(this, void 0, void 0, function*() {
                        var cacheArray = yield api.storage.list(), deleted = 0;
                        j.$.each(cacheArray, function(index, cache) {
                            utils.syncRegex.test(index) || (api.storage.remove(index), deleted++);
                        }), utils.flashm("Cache Cleared [" + deleted + "]");
                    });
                }), "webextension" == api.type && this.minimal.find(".option-extension").show(), 
                "webextension" == api.type && this.isPopup() && this.minimal.find(".option-extension-popup").show(), 
                "webextension" == api.type && this.isPopup() && (chrome.alarms.get("updateCheck", a => {
                    if (con.log(a), interval = 0, void 0 !== a) {
                        var interval = a.periodInMinutes;
                        this.minimal.find(".updateCheckEnable").show();
                    }
                    if (this.minimal.find("#updateCheckTime").val(interval), interval) {
                        function setUpdateCheckLast() {
                            api.storage.get("updateCheckLast").then(updateCheckTime => {
                                if (!isNaN(updateCheckTime)) {
                                    var delta = Math.abs(updateCheckTime - Date.now()), text = utils.timeDiffToText(delta);
                                    "" != text && (text += "ago", $("#updateCheckAgo").text(text));
                                }
                            });
                        }
                        setUpdateCheckLast(), setInterval(function() {
                            setUpdateCheckLast();
                        }, 6e4);
                    }
                }), this.minimal.find("#updateCheckTime").change(() => {
                    var updateCheckTime = this.minimal.find("#updateCheckTime").val();
                    api.storage.set("updateCheckTime", updateCheckTime), 0 != updateCheckTime && "0" != updateCheckTime ? (this.minimal.find(".updateCheckEnable").show(), 
                    chrome.alarms.create("updateCheck", {
                        periodInMinutes: parseInt(updateCheckTime)
                    }), utils.canHideTabs() || chrome.permissions.request({
                        permissions: [ "webRequest", "webRequestBlocking" ],
                        origins: chrome.runtime.getManifest().optional_permissions.filter(permission => "webRequest" != permission && "webRequestBlocking" != permission && "cookies" != permission)
                    }, function(granted) {
                        con.log("optional_permissions", granted);
                    }), chrome.alarms.create("updateCheckNow", {
                        when: Date.now() + 1e3
                    })) : (this.minimal.find(".updateCheckEnable").hide(), chrome.alarms.clear("updateCheck"));
                }), this.minimal.find("#updateCheck").show()), this.minimal.find("#updateCheckUi").click(() => {
                    this.minimalVue.$children[0].selectTab("updateCheck");
                });
                try {
                    "webextension" == api.type && chrome.permissions.contains({
                        permissions: [ "cookies" ]
                    }, result => {
                        result && (this.minimal.find("#strictCookies")[0].checked || this.minimal.find("#strictCookies").trigger("click")), 
                        this.minimal.find("#strictCookies").change(() => {
                            this.minimal.find("#strictCookies")[0].checked ? (con.log("strictCookies checked"), 
                            chrome.permissions.request({
                                permissions: [ "webRequest", "webRequestBlocking", "cookies" ],
                                origins: []
                            }, function(granted) {
                                con.log("optional_permissions", granted);
                            })) : (con.log("strictCookies not checked"), chrome.permissions.remove({
                                permissions: [ "cookies" ],
                                origins: []
                            }, function(remove) {
                                con.log("optional_permissions_remove", remove);
                            }));
                        });
                    });
                } catch (e) {
                    con.error(e);
                }
                api.storage.get("tempVersion").then(version => {
                    var versionMsg = "";
                    version != api.storage.version() && (versionMsg = api.storage.lang("minimalClass_versionMsg", [ api.storage.version(), '[<a class="close" target="_blank" href="https://malsync.lolamtisch.de/changelog#' + api.storage.version() + '">' ])), 
                    con.log(version), void 0 === version && (versionMsg = '\n            <div style="\n              text-align: left;\n              margin-left: auto;\n              margin-right: auto;\n              display: inline-block;\n              padding: 10px 15px;\n              background-color: #3d4e9a;\n              margin-top: -5px;\n            ">\n              <span style="text-decoration: underline; font-size: 15px;">' + api.storage.lang("minimalClass_versionMsg_Text_1") + `</span><br>\n              <br>\n              ${api.storage.lang("minimalClass_versionMsg_Text_4")}<br>\n              <a target="_blank" href="https://github.com/Karmesinrot/Anifiltrs#anifiltrs">\n                <img alt="Filter List" src="https://img.shields.io/badge/ublock-Anifiltrs-800900.svg?style=flat-square">\n              </a><br>\n              <br>\n\n\n              ` + api.storage.lang("minimalClass_versionMsg_Text_2") + '<br>\n              <a target="_blank" href="https://discordapp.com/invite/cTH4yaw">\n                <img alt="Discord" src="https://img.shields.io/discord/358599430502481920.svg?style=flat-square&amp;logo=discord&amp;label=Discord&amp;colorB=7289DA">\n              </a><br>\n              <a target="_blank" href="https://github.com/lolamtisch/MALSync/issues">\n                <img alt="Github Issues" src="https://img.shields.io/github/issues/lolamtisch/MALSync.svg?style=flat-square&amp;logo=github&amp;logoColor=white">\n              </a><br>\n              <br>\n              ' + api.storage.lang("minimalClass_versionMsg_Text_3") + '<br>\n              <a target="_blank" href="https://github.com/lolamtisch/MALSync">\n                <img alt="Github" src="https://img.shields.io/github/last-commit/lolamtisch/malsync.svg?style=flat-square&amp;logo=github&amp;logoColor=white&amp;label=Github">\n              </a>\n            </div>\n          '), 
                    "" != versionMsg && this.flashm(versionMsg, function() {
                        api.storage.set("tempVersion", api.storage.version());
                    });
                });
            }
            searchMal(keyword, type = "all", selector, callback) {
                var This = this;
                this.minimal.find(selector).html(""), api.request.xhr("GET", "https://myanimelist.net/search/prefix.json?type=" + type + "&keyword=" + keyword + "&v=1").then(response => {
                    var searchResults = j.$.parseJSON(response.responseText);
                    this.minimal.find(selector).append('<div class="mdl-grid">          <select name="myinfo_score" id="searchListType" class="inputtext mdl-textfield__input mdl-cell mdl-cell--12-col" style="outline: none; background-color: white; border: none;">            <option value="anime">Anime</option>            <option value="manga">Manga</option>          </select>        </div>'), 
                    this.minimal.find("#searchListType").val(type), this.minimal.find("#searchListType").change(function(event) {
                        This.searchMal(keyword, This.minimal.find("#searchListType").val(), selector, callback);
                    }), j.$.each(searchResults, (i, value) => {
                        j.$.each(value, (i, value) => {
                            j.$.each(value, (i, value) => {
                                "object" == typeof value && j.$.each(value, (i, value) => {
                                    void 0 !== value.name && This.minimal.find(selector + " > div").append('<a class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet mdl-shadow--2dp mdl-grid searchItem" href="' + value.url + '" style="cursor: pointer;">                  <img src="' + value.image_url + '" style="margin: -8px 0px -8px -8px; height: 100px; width: 64px; background-color: grey;"></img>                  <div style="flex-grow: 100; cursor: pointer; margin-top: 0; margin-bottom: 0;" class="mdl-cell">                    <span style="font-size: 20px; font-weight: 400; line-height: 1;">' + value.name + '</span>                    <p style="margin-bottom: 0; line-height: 20px; padding-top: 3px;">' + api.storage.lang("search_Type") + " " + value.payload.media_type + '</p>                    <p style="margin-bottom: 0; line-height: 20px;">' + api.storage.lang("search_Score") + " " + value.payload.score + '</p>                    <p style="margin-bottom: 0; line-height: 20px;">' + api.storage.lang("search_Year") + " " + value.payload.start_year + "</p>                  </div>                  </a>");
                                });
                            });
                        });
                    }), callback();
                });
            }
            flashm(text, closefn = function() {}) {
                var mess = `\n      <div style="\n        background-color: #3f51b5;\n        text-align: center;\n        padding: 5px 24px;\n        color: white;\n        border-top: 1px solid #fefefe;\n      ">\n        ${text}\n        <i class="material-icons close" style="\n          float: right;\n          font-size: 24px;\n          margin-top: -2px;\n          margin-right: -24px;\n          margin-bottom: -5px;\n        ">close</i>\n      </div>\n    `, flashmDiv = j.$(mess).appendTo(this.minimal.find(".mdl-layout"));
                return flashmDiv.find(".close").click(function() {
                    flashmDiv.slideUp(100, function() {
                        flashmDiv.remove(), closefn();
                    });
                }), flashmDiv;
            }
        }
    }).call(this, __webpack_require__(3), __webpack_require__(2), __webpack_require__(0), __webpack_require__(1));
}, function(module, exports, __webpack_require__) {
    var factory;
    "undefined" != typeof self && self, factory = function() {
        return function(modules) {
            var installedModules = {};
            function __webpack_require__(moduleId) {
                if (installedModules[moduleId]) return installedModules[moduleId].exports;
                var module = installedModules[moduleId] = {
                    i: moduleId,
                    l: !1,
                    exports: {}
                };
                return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
                module.l = !0, module.exports;
            }
            return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
            __webpack_require__.d = function(exports, name, getter) {
                __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
                    configurable: !1,
                    enumerable: !0,
                    get: getter
                });
            }, __webpack_require__.n = function(module) {
                var getter = module && module.__esModule ? function() {
                    return module.default;
                } : function() {
                    return module;
                };
                return __webpack_require__.d(getter, "a", getter), getter;
            }, __webpack_require__.o = function(object, property) {
                return Object.prototype.hasOwnProperty.call(object, property);
            }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 0);
        }([ function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            }), __webpack_require__.d(__webpack_exports__, "install", function() {
                return install;
            }), __webpack_require__.d(__webpack_exports__, "VueClazyLoad", function() {
                return VueClazyLoad;
            });
            var ClazyLoadComponent = {
                name: "ClazyLoad",
                props: {
                    tag: {
                        type: String,
                        default: "div"
                    },
                    src: {
                        type: String,
                        required: !0
                    },
                    element: String,
                    threshold: {
                        type: [ Array, Number ],
                        default: function() {
                            return [ 0, .5, 1 ];
                        }
                    },
                    ratio: {
                        type: Number,
                        default: .4,
                        validator: function(value) {
                            return value > 0 && value <= 1;
                        }
                    },
                    margin: {
                        type: String,
                        default: "0px"
                    },
                    crossorigin: {
                        type: String,
                        default: null,
                        validator: function(value) {
                            return "anonymous" === value || "use-credentials" === value;
                        }
                    },
                    loadedClass: {
                        type: String,
                        default: "loaded"
                    },
                    loadingClass: {
                        type: String,
                        default: "loading"
                    },
                    errorClass: {
                        type: String,
                        default: null
                    }
                },
                data: function() {
                    return {
                        loaded: !1,
                        observer: null,
                        errored: !1
                    };
                },
                methods: {
                    load: function() {
                        var _this = this;
                        if (this.$emit("loading"), this.observer.disconnect(), !this.loaded) {
                            var img = new Image();
                            img.addEventListener("load", function() {
                                _this.loaded = !0, _this.$emit("load"), _clear();
                            }), img.addEventListener("error", function(event) {
                                _this.errored = !0, _this.$emit("error", event), _clear();
                            });
                            var _clear = function() {
                                img = null, _this.observer = null;
                            };
                            null !== this.crossorigin && (img.crossOrigin = this.crossorigin), img.src = this.src;
                        }
                    },
                    observe: function() {
                        var _this2 = this, options = {
                            threshold: this.threshold,
                            root: this.element ? document.querySelector(this.element) : null,
                            rootMargin: this.margin
                        };
                        this.observer = new IntersectionObserver(function(entries) {
                            entries[0].intersectionRatio >= _this2.ratio && _this2.load();
                        }, options), this.observer.observe(this.$el);
                    }
                },
                render: function(h) {
                    var elementClass = this.loaded ? this.loadedClass : this.loadingClass;
                    return h(this.tag, {
                        class: this.errored && this.errorClass ? this.errorClass : elementClass
                    }, [ this.loaded ? this.$slots.default || this.$slots.image : this.$slots.placeholder ]);
                },
                mounted: function() {
                    this.$nextTick(this.observe);
                }
            }, install = function(Vue) {
                Vue.component("clazy-load", ClazyLoadComponent);
            }, VueClazyLoad = ClazyLoadComponent;
            __webpack_exports__.default = {
                install: install
            };
        } ]);
    }, module.exports = factory();
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return mal;
    });
    const mal = {
        shortName: "MAL",
        score: "MAL Score:",
        noLogin: "Please log in on <a target='_blank' href='https://myanimelist.net/login.php'>MyAnimeList!<a>"
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(api) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return anilist;
        });
        const anilist = {
            shortName: "AniList",
            score: "AniList Score:",
            noLogin: api.storage.lang("Anilist_Authenticate")
        };
    }).call(this, __webpack_require__(0));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(utils, con, api) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return myanimelistClass;
        });
        var _pages_pages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9), _provider_MyAnimeList_entryClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10), _provider_MyAnimeList_userList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11), __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = Promise))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator.throw(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        class myanimelistClass {
            constructor(url) {
                if (this.url = url, this.page = null, this.id = null, this.type = null, this.username = null, 
                url.indexOf("myanimelist.net/anime.php") > -1) {
                    var urlTemp = "/anime/" + utils.urlParam(this.url, "id");
                    window.history.replaceState(null, null, urlTemp), this.url = utils.absoluteLink(urlTemp, "https://myanimelist.net");
                }
                if (url.indexOf("myanimelist.net/manga.php") > -1) {
                    urlTemp = "/manga/" + utils.urlParam(this.url, "id");
                    window.history.replaceState(null, null, urlTemp), this.url = utils.absoluteLink(urlTemp, "https://myanimelist.net");
                }
                var urlpart = utils.urlPart(this.url, 3);
                "anime" != urlpart && "manga" != urlpart || (this.page = "detail", this.id = utils.urlPart(this.url, 4), 
                this.type = urlpart), "animelist" != urlpart && "mangalist" != urlpart || (this.page = "bookmarks", 
                this.type = urlpart.substring(0, 5), this.username = utils.urlPart(this.url, 4)), 
                "character" == urlpart && (this.page = "character"), "people" == urlpart && (this.page = "people"), 
                "search" == urlpart && (this.page = "search");
            }
            init() {
                switch (con.log(this), this.page) {
                  case "detail":
                    this.thumbnails(), this.setEpPrediction(), this.streamingUI(), this.malToKiss(), 
                    this.siteSearch(), this.related(), this.friendScore(), this.relatedTag(), setInterval(() => {
                        this.setEpPrediction();
                    }, 6e4);
                    break;

                  case "bookmarks":
                    var This = this;
                    $(document).ready(function() {
                        $("#mal_cs_powered").length ? This.page = "classic" : This.page = "modern", This.init();
                    });
                    break;

                  case "modern":
                  case "classic":
                    this.bookmarks();
                    break;

                  case "character":
                  case "people":
                    this.relatedTag();

                  case "search":
                    this.thumbnails();
                    break;

                  default:
                    con.log("This page has no scipt");
                }
            }
            thumbnails() {
                if (con.log("Lazyloaded Images"), !(this.url.indexOf("/pics") > -1 || this.url.indexOf("/pictures") > -1 || "0" == api.settings.get("malThumbnail"))) {
                    var height = parseInt(api.settings.get("malThumbnail")), width = Math.floor(height / 144 * 100), surHeight = height + 4, surWidth = width + 4;
                    api.storage.addStyle(".picSurround img:not(.noKal){height: " + height + "px !important; width: " + width + "px !important;}"), 
                    api.storage.addStyle(".picSurround img.lazyloaded.kal{width: auto !important;}"), 
                    api.storage.addStyle(".picSurround:not(.noKal) a{height: " + surHeight + "px; width: " + surWidth + "px; overflow: hidden; display: flex; justify-content: center;}");
                    var loaded = 0;
                    try {
                        $(window).load(function() {
                            overrideLazyload();
                        });
                    } catch (e) {
                        con.info(e);
                    }
                    try {
                        window.onload = function() {
                            overrideLazyload();
                        };
                    } catch (e) {
                        con.info(e);
                    }
                    try {
                        document.onload = function() {
                            overrideLazyload();
                        };
                    } catch (e) {
                        con.info(e);
                    }
                    try {
                        $(document).ready(function() {
                            overrideLazyload();
                        });
                    } catch (e) {
                        con.info(e);
                    }
                }
                function overrideLazyload() {
                    if (!loaded) {
                        loaded = 1;
                        for (var tags = document.querySelectorAll(".picSurround img:not(.kal)"), url = "", i = 0; i < tags.length; i++) {
                            var regexDimensions = /\/r\/\d*x\d*/g;
                            url = tags[i].hasAttribute("data-src") ? tags[i].getAttribute("data-src") : tags[i].getAttribute("src"), 
                            regexDimensions.test(url) || /voiceactors.*v.jpg$/g.test(url) || -1 !== url.indexOf("questionmark") ? ((url = utils.handleMalImages(url)).indexOf("100x140") > -1 || (tags[i].setAttribute("data-src", url), 
                            url = url.replace(/v.jpg$/g, ".jpg"), tags[i].setAttribute("data-srcset", url.replace(regexDimensions, "")), 
                            tags[i].classList.add("lazyload")), tags[i].classList.add("kal")) : (tags[i].closest(".picSurround").classList.add("noKal"), 
                            tags[i].classList.add("kal"), tags[i].classList.add("noKal"));
                        }
                    }
                }
            }
            bookmarksHDimages() {
                for (var tags = document.querySelectorAll('img[src*="/96x136/"]'), i = 0; i < tags.length; i++) {
                    var url = tags[i].getAttribute("src");
                    tags[i].setAttribute("src", url.replace(/\/r\/\d*x\d*/g, ""));
                }
            }
            setEpPrediction() {
                con.log("setEpPrediction"), utils.epPredictionUI(this.id, this.type, function(prediction) {
                    prediction && (con.log(prediction), $(".mal-sync-pre-remove, .mal-sync-ep-pre").remove(), 
                    $("#addtolist").prev().before('<div class="mal-sync-pre-remove">' + prediction.text + "</div>"), 
                    $('[id="curEps"], [id="totalChaps"]').before(prediction.tag + " "));
                });
            }
            malToKiss() {
                return __awaiter(this, void 0, void 0, function*() {
                    con.log("malToKiss"), utils.getMalToKissArray(this.type, this.id).then(links => {
                        var html = "";
                        for (var pageKey in links) {
                            var page = links[pageKey], tempHtml = "", tempUrl = "";
                            for (var streamKey in page) {
                                var stream = page[streamKey];
                                tempHtml += '<div class="mal_links"><a target="_blank" href="' + stream.url + '">' + stream.title + "</a></div>", 
                                tempUrl = stream.url;
                            }
                            html += '<h2 id="' + pageKey + 'Links" class="mal_links"><img src="' + utils.favicon(tempUrl.split("/")[2]) + '"> ' + pageKey + '<span title="' + pageKey + '" class="remove-mal-sync" style="float: right; font-weight: 100; line-height: 2; cursor: pointer; color: grey;">x</span></h2>', 
                            html += tempHtml, html += '<br class="mal_links" />';
                        }
                        $(document).ready(function() {
                            $('h2:contains("Information")').before(html), $(".remove-mal-sync").click(function() {
                                var key = $(this).attr("title");
                                api.settings.set(key, !1), location.reload();
                            });
                        });
                    });
                });
            }
            siteSearch() {
                if (api.settings.get("SiteSearch")) {
                    var This = this;
                    $(document).ready(function() {
                        con.log("Site Search"), $('h2:contains("Information")').before('<h2 id="mal-sync-search-links" class="mal_links">Search</h2><div class="MALSync-search"><a>[Show]</a></div><br class="mal_links" />'), 
                        api.storage.addStyle("#AniList.mal_links img{background-color: #898989;}"), $(".MALSync-search").one("click", () => {
                            $(".MALSync-search").remove();
                            var title = $("#contentWrapper > div:first-child span").text(), titleEncoded = encodeURI(title), html = "", imgStyle = "position: relative; top: 4px;";
                            for (var key in _pages_pages__WEBPACK_IMPORTED_MODULE_0__.a) {
                                var page = _pages_pages__WEBPACK_IMPORTED_MODULE_0__.a[key];
                                if (page.type === This.type) {
                                    var linkContent = `<img style="${imgStyle}" src="${utils.favicon(page.domain)}"> ${page.name}`;
                                    if (void 0 === page.completeSearchTag) var link = `<a target="_blank" href="${page.searchUrl(titleEncoded)}">\n              ${linkContent}\n            </a>`; else link = page.completeSearchTag(title, linkContent);
                                    var googleSeach = "";
                                    void 0 !== page.googleSearchDomain && (googleSeach = `<a target="_blank" href="https://www.google.com/search?q=${titleEncoded}+site:${page.googleSearchDomain}">\n              <img style="${imgStyle}" src="${utils.favicon("google.com")}">\n            </a>`), 
                                    html += `<div class="mal_links" id="${key}" style="padding: 1px 0;">\n              ${link}\n              ${googleSeach}\n          </div>`;
                                }
                            }
                            $("#mal-sync-search-links").after(html);
                        });
                    });
                }
            }
            streamingUI() {
                return __awaiter(this, void 0, void 0, function*() {
                    con.log("Streaming UI");
                    var malObj = new _provider_MyAnimeList_entryClass__WEBPACK_IMPORTED_MODULE_1__.a(this.url);
                    yield malObj.init();
                    var streamUrl = malObj.getStreamingUrl();
                    void 0 !== streamUrl && $(document).ready(function() {
                        return __awaiter(this, void 0, void 0, function*() {
                            $(".h1 span").first().after(`\n        <div class="data title progress" id="mal-sync-stream-div" style="display: inline-block; position: relative; top: 2px;">\n          <a class="mal-sync-stream" title="${streamUrl.split("/")[2]}" target="_blank" style="margin: 0 0;" href="${streamUrl}">\n            <img src="${utils.favicon(streamUrl.split("/")[2])}">\n          </a>\n        </div>`);
                            var resumeUrlObj = yield malObj.getResumeWaching(), continueUrlObj = yield malObj.getContinueWaching();
                            con.log("Resume", resumeUrlObj, "Continue", continueUrlObj), void 0 !== continueUrlObj && continueUrlObj.ep === malObj.getEpisode() + 1 ? $("#mal-sync-stream-div").append(`<a class="nextStream" title="${api.storage.lang("overview_Continue_" + malObj.type)}" target="_blank" style="margin: 0 5px 0 0; color: #BABABA;" href="${continueUrlObj.url}">\n              <img src="${api.storage.assetUrl("double-arrow-16px.png")}" width="16" height="16">\n            </a>`) : void 0 !== resumeUrlObj && resumeUrlObj.ep === malObj.getEpisode() && $("#mal-sync-stream-div").append(`<a class="resumeStream" title="${api.storage.lang("overview_Resume_Episode_" + malObj.type)}" target="_blank" style="margin: 0 5px 0 0; color: #BABABA;" href="${resumeUrlObj.url}">\n              <img src="${api.storage.assetUrl("arrow-16px.png")}" width="16" height="16">\n            </a>`);
                        });
                    });
                });
            }
            bookmarks() {
                con.log("Bookmarks [" + this.username + "][" + this.page + "]");
                var This = this;
                if ("modern" == this.page) var book = {
                    bookReady: function(callback) {
                        utils.waitUntilTrue(function() {
                            return "none" == $("#loading-spinner").css("display");
                        }, function() {
                            callback(Object(_provider_MyAnimeList_userList__WEBPACK_IMPORTED_MODULE_2__.a)($.parseJSON($(".list-table").attr("data-items")), This.type));
                        });
                    },
                    getElement: function(malUrl) {
                        return $('.list-item a[href^="' + malUrl + '"]').parent().parent(".list-table-data");
                    },
                    streamingSelector: ".data.title .link",
                    cleanTags: function() {
                        $(".tags span a").each(function(index) {
                            void 0 !== utils.getUrlFromTags($(this).text()) && $(this).parent().remove();
                        });
                    },
                    predictionPos(element, tag) {
                        element.find(".data.progress span, .data.chapter span").first().after(tag);
                    }
                }; else {
                    if ("classic" != this.page) return void con.error("Bookmark type unknown");
                    book = {
                        bookReady: function(callback) {
                            var tType = "anime";
                            null !== This.type && (tType = This.type), Object(_provider_MyAnimeList_userList__WEBPACK_IMPORTED_MODULE_2__.b)(7, tType, {
                                fullListCallback: function(list) {
                                    callback(list);
                                }
                            }, This.username);
                        },
                        getElement: function(malUrl) {
                            return $('a[href^="' + malUrl + '"]');
                        },
                        streamingSelector: "span",
                        cleanTags: function() {
                            $('span[id^="tagLinks"] a').each(function(index) {
                                void 0 !== utils.getUrlFromTags($(this).text()) && $(this).remove();
                            });
                        },
                        predictionPos(element, tag) {
                            element.parent().parent().find('span[id^="epText"] a span, span[id^="chap"]').first().after(tag);
                        }
                    };
                }
                book.bookReady(function(data) {
                    This.bookmarksHDimages(), $.each(data, function(index, el) {
                        return __awaiter(this, void 0, void 0, function*() {
                            var streamUrl = utils.getUrlFromTags(el.tags), malUrl = el.url.replace("https://myanimelist.net", "");
                            con.log(malUrl);
                            var id = el.malId, type = el.type;
                            if (void 0 !== streamUrl) {
                                var element = book.getElement(malUrl);
                                element.find(book.streamingSelector).after(`\n            <a class="mal-sync-stream" title="${streamUrl.split("/")[2]}" target="_blank" style="margin: 0 0;" href="${streamUrl}">\n              <img src="${utils.favicon(streamUrl.split("/")[2])}">\n            </a>`);
                                var resumeUrlObj = yield utils.getResumeWaching(type, id), continueUrlObj = yield utils.getContinueWaching(type, id), curEp = parseInt(el.watchedEp);
                                con.log("Resume", resumeUrlObj, "Continue", continueUrlObj), void 0 !== continueUrlObj && continueUrlObj.ep === curEp + 1 ? element.find(".mal-sync-stream").after(`<a class="nextStream" title="Continue watching" target="_blank" style="margin: 0 5px 0 0; color: #BABABA;" href="${continueUrlObj.url}">\n                <img src="${api.storage.assetUrl("double-arrow-16px.png")}" width="16" height="16">\n              </a>`) : void 0 !== resumeUrlObj && resumeUrlObj.ep === curEp && element.find(".mal-sync-stream").after(`<a class="resumeStream" title="Resume watching" target="_blank" style="margin: 0 5px 0 0; color: #BABABA;" href="${resumeUrlObj.url}">\n                <img src="${api.storage.assetUrl("arrow-16px.png")}" width="16" height="16">\n              </a>`);
                            }
                            utils.epPredictionUI(id, type, function(prediction) {
                                if (prediction) {
                                    var element = book.getElement(malUrl);
                                    book.predictionPos(element, prediction.tag);
                                }
                            });
                        });
                    }), book.cleanTags();
                });
            }
            related() {
                $(document).ready(function() {
                    $(".anime_detail_related_anime a").each(function() {
                        var el = $(this), url = utils.absoluteLink(el.attr("href"), "https://myanimelist.net");
                        void 0 !== url && utils.timeCache("MALTAG/" + url, function() {
                            return __awaiter(this, void 0, void 0, function*() {
                                var malObj = new _provider_MyAnimeList_entryClass__WEBPACK_IMPORTED_MODULE_1__.a(url);
                                return yield malObj.init(), utils.statusTag(malObj.getStatus(), malObj.type, malObj.id);
                            });
                        }, 36e5).then(function(tag) {
                            tag && el.after(tag);
                        });
                    });
                });
            }
            relatedTag() {
                var This = this;
                $(document).ready(function() {
                    $("a.button_edit").each(function() {
                        var el = $(this), href = $(this).attr("href"), type = utils.urlPart(href, 4), id = utils.urlPart(href, 5), state = el.attr("title");
                        if (void 0 !== state && state) {
                            var tag = utils.statusTag(state, type, id);
                            "detail" == This.page ? el.parent().find("> a").first().after(tag) : el.parent().parent().find("> a").after(tag), 
                            el.remove();
                        }
                    });
                });
            }
            friendScore() {
                api.settings.get("friendScore") && $(document).ready(function() {
                    var position = $("h2:contains(Reviews)");
                    if (position.length) {
                        var overview = $("#horiznav_nav li a").first();
                        if (overview.is("#horiznav_nav li a.horiznav_active")) {
                            var url = overview.attr("href");
                            void 0 !== url && url && (url = utils.absoluteLink(url, "https://myanimelist.net"), 
                            api.request.xhr("GET", url + "/stats").then(response => {
                                var friendHead = $("a[name=members]", $(response.responseText).children());
                                if (friendHead) {
                                    var friendBody = friendHead.nextAll();
                                    friendBody.length > 1 && friendBody.find('a:contains("All Members")').length && (position.before(friendHead).before(friendBody).before("<br>"), 
                                    $('a:contains("All Members")').after(' | <span id="mal-sync-removeFriends" title="remove" style="cursor: pointer; color: #1d439b;">X</span>'), 
                                    $("#mal-sync-removeFriends").click(function() {
                                        api.settings.set("friendScore", !1), location.reload();
                                    }));
                                }
                            }));
                        }
                    }
                });
            }
        }
    }).call(this, __webpack_require__(2), __webpack_require__(1), __webpack_require__(0));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(utils, api, con) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return anilistClass;
        });
        var _provider_AniList_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7), _pages_pages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9), _provider_AniList_entryClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(26), _provider_AniList_userList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(27), __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = Promise))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator.throw(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        class anilistClass {
            constructor(url) {
                this.url = url, this.page = null, this.tempAnimelist = null, this.tempMangalist = null, 
                utils.changeDetect(() => {
                    this.url = window.location.href, this.init();
                }, () => {
                    if (null !== this.page && "bookmarks" == this.page.page && $(".lists").length) return $(".lists").first().height();
                    var ogUrl = $('meta[property="og:url"]').attr("content");
                    return void 0 !== ogUrl && ogUrl.split("/").length > 4 ? ogUrl.split("/").slice(0, 6).join("/") : ogUrl = window.location.href;
                }), this.url.indexOf("access_token=") > -1 && this.init(), api.storage.addStyle(__webpack_require__(122).toString());
            }
            init() {
                this.url.indexOf("access_token=") > -1 && this.authentication();
                var urlpart = utils.urlPart(this.url, 3);
                "anime" != urlpart && "manga" != urlpart || (this.page = {
                    page: "detail",
                    id: utils.urlPart(this.url, 4),
                    malid: NaN,
                    type: urlpart
                }, this.siteSearch(), this.streamingUI(), _provider_AniList_helper__WEBPACK_IMPORTED_MODULE_0__.b(this.page.id, this.page.type).then(malid => {
                    this.page.malid = malid, con.log("page", this.page), this.malToKiss();
                }));
                var urlpart4 = utils.urlPart(this.url, 5);
                "animelist" != urlpart4 && "mangalist" != urlpart4 || (this.page = {
                    page: "bookmarks",
                    type: urlpart4.substring(0, 5)
                }, this.bookmarks());
            }
            authentication() {
                var tokens = /access_token=[^&]+/gi.exec(this.url);
                if (null != tokens && void 0 !== tokens[0] && tokens[0]) {
                    var token = tokens[0].toString().replace(/access_token=/gi, "");
                    con.log("Token Found", token), api.settings.set("anilistToken", token).then(() => {
                        $(document).ready(function() {
                            $(".page-content .container").html('\n            <div style="text-align: center; margin-top: 50px; background-color: white; border: 1px solid lightgrey; padding: 10px;">\n              <h1>MAL-Sync</h1>\n              <br>\n              ' + api.storage.lang("anilistClass_authentication") + "\n            </div>\n          ");
                        });
                    });
                }
            }
            getMalUrl() {
                return __awaiter(this, void 0, void 0, function*() {
                    var urlpart = utils.urlPart(this.url, 3);
                    if ("anime" == urlpart || "manga" == urlpart) {
                        var aniListId = utils.urlPart(this.url, 4);
                        return _provider_AniList_helper__WEBPACK_IMPORTED_MODULE_0__.b(aniListId, urlpart).then(malId => malId ? "https://myanimelist.net/" + urlpart + "/" + malId + "/" + utils.urlPart(this.url, 5) : "");
                    }
                    return "";
                });
            }
            malToKiss() {
                con.log("malToKiss"), $(".mal_links").remove(), utils.getMalToKissArray(this.page.type, this.page.malid).then(links => {
                    var html = "";
                    for (var pageKey in links) {
                        var page = links[pageKey], tempHtml = "", tempUrl = "";
                        for (var streamKey in page) {
                            var stream = page[streamKey];
                            tempHtml += `\n          <div class="mal_links" style="margin-top: 5px;">\n            <a target="_blank" href="${stream.url}">\n              ${stream.title}\n            </a>\n          </div>`, 
                            tempUrl = stream.url;
                        }
                        html += `\n          <div id="${pageKey}Links" class="mal_links" style="\n            background: rgb(var(--color-foreground));\n            border-radius: 3px;\n            display: block;\n            padding: 8px 12px;\n            width: 100%;\n            margin-bottom: 16px;\n            font-size: 1.2rem;\n\n          ">\n            <img src="${utils.favicon(tempUrl.split("/")[2])}">\n            <span style="font-weight: 500; line-height: 16px; vertical-align: middle;">${pageKey}</span>\n            <span title="${pageKey}" class="remove-mal-sync" style="float: right; cursor: pointer;">x</span>\n            ${tempHtml}\n          </div>`;
                    }
                    $(document).ready(function() {
                        $(".sidebar .data").before(html), $(".remove-mal-sync").click(function() {
                            var key = $(this).attr("title");
                            api.settings.set(key, !1), location.reload();
                        });
                    });
                });
            }
            siteSearch() {
                if (api.settings.get("SiteSearch")) {
                    var This = this;
                    $(document).ready(function() {
                        con.log("Site Search"), $("#mal-sync-search-links").remove(), $(".sidebar .data").before('\n        <div id="mal-sync-search-links" style="\n            background: rgb(var(--color-foreground));\n            border-radius: 3px;\n            display: block;\n            padding: 8px 12px;\n            width: 100%;\n            margin-bottom: 16px;\n            font-size: 1.2rem;\n        ">\n          <span style="font-weight: 500; line-height: 16px; vertical-align: middle;">' + api.storage.lang("Search") + '</span>\n          <div class="MALSync-search"><a>[' + api.storage.lang("Show") + ']</a></div><br class="mal_links" />\n        </div>\n      '), 
                        api.storage.addStyle("#AniList.mal_links img{background-color: #898989;}"), $(".MALSync-search").one("click", () => {
                            var title = $('meta[property="og:title"]').attr("content"), titleEncoded = encodeURI(title), html = "", imgStyle = "position: relative; top: 0px;";
                            for (var key in _pages_pages__WEBPACK_IMPORTED_MODULE_1__.a) {
                                var page = _pages_pages__WEBPACK_IMPORTED_MODULE_1__.a[key];
                                if (page.type === This.page.type) {
                                    var linkContent = `<img style="${imgStyle}" src="${utils.favicon(page.domain)}"> ${page.name}`;
                                    if (void 0 === page.completeSearchTag) var link = `<a target="_blank" href="${page.searchUrl(titleEncoded)}">\n              ${linkContent}\n            </a>`; else link = page.completeSearchTag(title, linkContent);
                                    var googleSeach = "";
                                    void 0 !== page.googleSearchDomain && (googleSeach = `<a target="_blank" href="https://www.google.com/search?q=${titleEncoded}+site:${page.googleSearchDomain}">\n              <img style="${imgStyle}" src="${utils.favicon("google.com")}">\n            </a>`), 
                                    html += `<div class="mal_links" id="${key}" style="padding: 1px 0;">\n              ${link}\n              ${googleSeach}\n          </div>`;
                                }
                            }
                            $(".MALSync-search").html(html);
                        });
                    });
                }
            }
            streamingUI() {
                return __awaiter(this, void 0, void 0, function*() {
                    con.log("Streaming UI"), $("#mal-sync-stream-div").remove();
                    var malObj = new _provider_AniList_entryClass__WEBPACK_IMPORTED_MODULE_2__.a(this.url);
                    yield malObj.init();
                    var streamUrl = malObj.getStreamingUrl();
                    void 0 !== streamUrl && $(document).ready(function() {
                        return __awaiter(this, void 0, void 0, function*() {
                            $("h1").first().append(`\n        <div class="data title progress" id="mal-sync-stream-div" style="margin-top: -2px; display: inline-block; position: relative; top: 2px;">\n          <a class="mal-sync-stream" title="${streamUrl.split("/")[2]}" target="_blank" style="margin: 0 0;" href="${streamUrl}">\n            <img src="${utils.favicon(streamUrl.split("/")[2])}">\n          </a>\n        </div>`);
                            var resumeUrlObj = yield malObj.getResumeWaching(), continueUrlObj = yield malObj.getContinueWaching();
                            con.log("Resume", resumeUrlObj, "Continue", continueUrlObj), void 0 !== continueUrlObj && continueUrlObj.ep === malObj.getEpisode() + 1 ? $("#mal-sync-stream-div").append(`<a class="nextStream" title="${api.storage.lang("overview_Continue_" + malObj.type)}" target="_blank" style="margin: 0 5px 0 0; color: #BABABA;" href="${continueUrlObj.url}">\n              <img src="${api.storage.assetUrl("double-arrow-16px.png")}" width="16" height="16">\n            </a>`) : void 0 !== resumeUrlObj && resumeUrlObj.ep === malObj.getEpisode() && $("#mal-sync-stream-div").append(`<a class="resumeStream" title="${api.storage.lang("overview_Resume_Episode_" + malObj.type)}" target="_blank" style="margin: 0 5px 0 0; color: #BABABA;" href="${resumeUrlObj.url}">\n              <img src="${api.storage.assetUrl("arrow-16px.png")}" width="16" height="16">\n            </a>`);
                        });
                    });
                });
            }
            bookmarks() {
                var This = this;
                $(document).ready(() => {
                    if ($(".list-entries .entry, .list-entries .entry-card").not(".malSyncDone").each((index, el) => {
                        $(el).addClass("malSyncDone");
                        var streamUrl = utils.getUrlFromTags($(el).find(".notes").first().attr("label"));
                        if (void 0 !== streamUrl) {
                            con.log(streamUrl), $(el).find(".title a").first().after(`\n            <a class="mal-sync-stream mal-rem" title="${streamUrl.split("/")[2]}" target="_blank" style="margin: 0 0; max-height: 14px;" href="${streamUrl}">\n              <img src="${utils.favicon(streamUrl.split("/")[2])}">\n            </a>`);
                            var label = $(el).find(".notes").first().attr("label");
                            void 0 !== label && ("" === (label = label.replace(/(malSync|last)::[\d\D]+::/, "").replace(/#,/, "")).trim() || "," === label.trim() ? $(el).find(".notes").first().css("visibility", "hidden") : $(el).find(".notes").first().attr("label", label));
                        }
                    }), "anime" == this.page.type) {
                        if (null != this.tempAnimelist) return void fullListCallback(this.tempAnimelist);
                    } else if (null != this.tempMangalist) return void fullListCallback(this.tempMangalist);
                    function fullListCallback(list) {
                        con.log(list), $.each(list, (index, en) => __awaiter(this, void 0, void 0, function*() {
                            if (con.log("en", en), void 0 !== en.malid && null !== en.malid && en.malid) {
                                var element = $('.entry:not(.malSyncDone2) a[href^="/' + This.page.type + "/" + en.id + '/"], .entry-card:not(.malSyncDone2) a[href^="/' + This.page.type + "/" + en.id + '/"]').first().parent();
                                con.log(element), element.parent().addClass("malSyncDone2");
                                var resumeUrlObj = yield utils.getResumeWaching(This.page.type, en.malid), continueUrlObj = yield utils.getContinueWaching(This.page.type, en.malid), curEp = en.watchedEp;
                                con.log("Resume", resumeUrlObj, "Continue", continueUrlObj), void 0 !== continueUrlObj && continueUrlObj.ep === curEp + 1 ? element.prepend(`<a class="nextStream mal-rem" title="Continue watching" target="_blank" style="margin: -2px 5px 0 0; color: #BABABA;" href="${continueUrlObj.url}">\n                  <img src="${api.storage.assetUrl("double-arrow-16px.png")}" width="16" height="16">\n                </a>`) : void 0 !== resumeUrlObj && resumeUrlObj.ep === curEp && element.prepend(`<a class="resumeStream mal-rem" title="Resume watching" target="_blank" style="margin: -2px 5px 0 0; color: #BABABA;" href="${resumeUrlObj.url}">\n                  <img src="${api.storage.assetUrl("arrow-16px.png")}" width="16" height="16">\n                </a>`), 
                                utils.epPredictionUI(en.malid, This.page.type, prediction => {
                                    prediction && element.parent().find(".progress").append(prediction.tag);
                                });
                            }
                        }));
                    }
                    Object(_provider_AniList_userList__WEBPACK_IMPORTED_MODULE_3__.a)(1, this.page.type, {
                        anilist: !0,
                        fullListCallback: list => {
                            "anime" == this.page.type ? this.tempAnimelist = list : this.tempMangalist = list, 
                            fullListCallback(list);
                        }
                    });
                });
            }
        }
    }).call(this, __webpack_require__(2), __webpack_require__(0), __webpack_require__(1));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(utils, api, con) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return kitsuClass;
        });
        var _pages_pages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9), _provider_Kitsu_entryClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28), _provider_Kitsu_userList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29), __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = Promise))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator.throw(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        class kitsuClass {
            constructor(url) {
                this.url = url, this.page = null, this.same = !1, this.tempAnimelist = null, this.tempMangalist = null;
                var oldUrl = window.location.href.split("/").slice(0, 5).join("/");
                utils.changeDetect(() => {
                    if (this.same = !1, null !== this.page && "detail" == this.page.page) {
                        var tempUrl = window.location.href.split("/").slice(0, 5).join("/");
                        tempUrl === oldUrl && (this.same = !0), oldUrl = tempUrl;
                    }
                    this.url = window.location.href, this.init();
                }, () => null !== this.page && "bookmarks" == this.page.page && $(".library-content").length ? $(".library-content").first().height() : window.location.href), 
                $(document).ready(() => {
                    utils.waitUntilTrue(function() {
                        return $(".global-container").length;
                    }, () => {
                        this.init();
                    });
                }), api.storage.addStyle(__webpack_require__(124).toString());
            }
            init() {
                return __awaiter(this, void 0, void 0, function*() {
                    this.url.indexOf("?mal-sync=authentication") > -1 && this.authentication();
                    var urlpart = utils.urlPart(this.url, 3);
                    if ("anime" == urlpart || "manga" == urlpart) {
                        if (this.same && void 0 !== this.page && "undefined" !== this.page.malObj) return void this.streamingUI();
                        var malObj = new _provider_Kitsu_entryClass__WEBPACK_IMPORTED_MODULE_1__.a(this.url);
                        yield malObj.init(), this.page = {
                            page: "detail",
                            id: malObj.kitsuId,
                            malid: malObj.id,
                            type: urlpart,
                            malObj: malObj
                        }, con.log("page", this.page), this.streamingUI(), this.siteSearch(), this.malToKiss();
                    }
                    if ("library" == utils.urlPart(this.url, 5)) {
                        var type = "anime";
                        "manga" == utils.urlParam(this.url, "media") && (type = "manga"), this.page = {
                            page: "bookmarks",
                            type: type
                        }, con.log("page", this.page), this.bookmarks();
                    }
                });
            }
            authentication() {
                $(document).ready(function() {
                    $("body").after('\n        <div id="mal-sync-login" style="text-align: center; margin-top: 50px; background-color: white; border: 1px solid lightgrey; padding: 10px; max-width: 600px; margin-left: auto; margin-right: auto;">\n          <h1>MAL-Sync</h1>\n          <br>\n          <p style="text-align: left;">\n            ' + api.storage.lang("kitsuClass_authentication_text") + '\n          </p>\n          <div class="modal-content">\n            <input type="email" id="email" placeholder="Email" required>\n            <input type="password" id="pass" name="password" placeholder="' + api.storage.lang("kitsuClass_authentication_Password") + '" required>\n          </div>\n          <div class="form-cta" style="margin-top: 30px;">\n            <button class="btn button--primary" type="submit" id="mal-sync-button">\n              ' + api.storage.lang("kitsuClass_authentication_Login") + "\n            </button>\n          </div>\n        </div>\n      "), 
                    $("#mal-sync-login #mal-sync-button").click(function() {
                        $("#mal-sync-login #mal-sync-button").attr("disabled", "disabled"), $.ajax({
                            type: "POST",
                            url: "https://kitsu.io/api/oauth/token",
                            data: "grant_type=password&username=" + encodeURIComponent($("#mal-sync-login #email").val()) + "&password=" + encodeURIComponent($("#mal-sync-login #pass").val()),
                            success: function(result) {
                                var token = result.access_token;
                                con.info("token", token), api.settings.set("kitsuToken", token).then(() => {
                                    $("#mal-sync-login").html("<h1>MAL-Sync</h1><br>" + api.storage.lang("kitsuClass_authentication_Success"));
                                });
                            },
                            error: function(result) {
                                try {
                                    if (con.error(result), $("#mal-sync-login #mal-sync-button").prop("disabled", !1), 
                                    "invalid_grant" == result.responseJSON.error) return void utils.flashm(api.storage.lang("kitsuClass_authentication_Wrong"));
                                    utils.flashm(result.responseJSON.error_description);
                                } catch (e) {
                                    con.error(e), utils.flashm(result.responseText);
                                }
                            }
                        });
                    }), utils.waitUntilTrue(function() {
                        return $("body h1").length;
                    }, () => {
                        $("body h1").remove();
                    });
                });
            }
            getMalUrl() {
                return __awaiter(this, void 0, void 0, function*() {
                    return null !== this.page && "detail" == this.page.page && this.page.malid ? "https://myanimelist.net/" + this.page.type + "/" + this.page.malid + "/" + utils.urlPart(this.url, 5) : "";
                });
            }
            streamingUI() {
                return __awaiter(this, void 0, void 0, function*() {
                    con.log("Streaming UI"), $("#mal-sync-stream-div").remove();
                    var malObj = this.page.malObj, streamUrl = malObj.getStreamingUrl();
                    void 0 !== streamUrl && $(document).ready(function() {
                        return __awaiter(this, void 0, void 0, function*() {
                            $(".media--title h3").first().after(`\n        <div class="data title progress" id="mal-sync-stream-div" style="display: inline-block; position: relative; top: -4px; display: inline;">\n          <a class="mal-sync-stream" title="${streamUrl.split("/")[2]}" target="_blank" style="margin: 0 0;" href="${streamUrl}">\n            <img src="${utils.favicon(streamUrl.split("/")[2])}">\n          </a>\n        </div>`);
                            var resumeUrlObj = yield malObj.getResumeWaching(), continueUrlObj = yield malObj.getContinueWaching();
                            con.log("Resume", resumeUrlObj, "Continue", continueUrlObj), void 0 !== continueUrlObj && continueUrlObj.ep === malObj.getEpisode() + 1 ? $("#mal-sync-stream-div").append(`<a class="nextStream" title="${api.storage.lang("overview_Continue_" + malObj.type)}" target="_blank" style="margin: 0 5px 0 0; color: #BABABA;" href="${continueUrlObj.url}">\n              <img src="${api.storage.assetUrl("double-arrow-16px.png")}" width="16" height="16">\n            </a>`) : void 0 !== resumeUrlObj && resumeUrlObj.ep === malObj.getEpisode() && $("#mal-sync-stream-div").append(`<a class="resumeStream" title="${api.storage.lang("overview_Resume_Episode_" + malObj.type)}" target="_blank" style="margin: 0 5px 0 0; color: #BABABA;" href="${resumeUrlObj.url}">\n              <img src="${api.storage.assetUrl("arrow-16px.png")}" width="16" height="16">\n            </a>`);
                        });
                    });
                });
            }
            malToKiss() {
                con.log("malToKiss"), $(".mal_links").remove(), utils.getMalToKissArray(this.page.type, this.page.malid).then(links => {
                    var html = "";
                    for (var pageKey in links) {
                        var page = links[pageKey], tempHtml = "", tempUrl = "";
                        for (var streamKey in page) {
                            var stream = page[streamKey];
                            tempHtml += `\n          <div class="mal_links" style="margin-top: 5px;">\n            <a target="_blank" href="${stream.url}">\n              ${stream.title}\n            </a>\n          </div>`, 
                            tempUrl = stream.url;
                        }
                        html += `\n          <div id="${pageKey}Links" class="mal_links library-state with-header" style="\n            background: rgb(var(--color-foreground));\n            border-radius: 3px;\n            display: block;\n            padding: 8px 12px;\n            width: 100%;\n            font-size: 12px;\n\n          ">\n            <img src="${utils.favicon(tempUrl.split("/")[2])}">\n            <span style="font-weight: 500; line-height: 16px; vertical-align: middle;">${pageKey}</span>\n            <span title="${pageKey}" class="remove-mal-sync" style="float: right; cursor: pointer;">x</span>\n            ${tempHtml}\n          </div>`;
                    }
                    $(document).ready(function() {
                        $("#mal-sync-search-links").length ? $("#mal-sync-search-links").first().after(html) : $(".where-to-watch-widget, .library-state").first().after(html), 
                        $(".remove-mal-sync").click(function() {
                            var key = $(this).attr("title");
                            api.settings.set(key, !1), location.reload();
                        });
                    });
                });
            }
            siteSearch() {
                if (api.settings.get("SiteSearch")) {
                    var This = this;
                    $(document).ready(function() {
                        con.log("Site Search"), $("#mal-sync-search-links").remove(), $(".where-to-watch-widget, .library-state").first().after('\n        <div id="mal-sync-search-links" style="\n            background: rgb(var(--color-foreground));\n            border-radius: 3px;\n            display: block;\n            padding: 8px 12px;\n            width: 100%;\n            font-size: 12px;\n        " class="library-state with-header">\n          <span style="font-weight: 500; line-height: 16px; vertical-align: middle;">' + api.storage.lang("Search") + '</span>\n          <div class="MALSync-search"><a>[' + api.storage.lang("Show") + "]</a></div>\n        </div>\n      "), 
                        api.storage.addStyle("#AniList.mal_links img{background-color: #898989;}"), $(".MALSync-search").one("click", () => {
                            var title = $('meta[property="og:title"]').attr("content"), titleEncoded = encodeURI(title), html = "", imgStyle = "position: relative; top: 0px;";
                            for (var key in _pages_pages__WEBPACK_IMPORTED_MODULE_0__.a) {
                                var page = _pages_pages__WEBPACK_IMPORTED_MODULE_0__.a[key];
                                if (page.type === This.page.type) {
                                    var linkContent = `<img style="${imgStyle}" src="${utils.favicon(page.domain)}"> ${page.name}`;
                                    if (void 0 === page.completeSearchTag) var link = `<a target="_blank" href="${page.searchUrl(titleEncoded)}">\n              ${linkContent}\n            </a>`; else link = page.completeSearchTag(title, linkContent);
                                    var googleSeach = "";
                                    void 0 !== page.googleSearchDomain && (googleSeach = `<a target="_blank" href="https://www.google.com/search?q=${titleEncoded}+site:${page.googleSearchDomain}">\n              <img style="${imgStyle}" src="${utils.favicon("google.com")}">\n            </a>`), 
                                    html += `<div class="mal_links" id="${key}" style="padding: 1px 0;">\n              ${link}\n              ${googleSeach}\n          </div>`;
                                }
                            }
                            $(".MALSync-search").html(html);
                        });
                    });
                }
            }
            bookmarks() {
                var This = this;
                $(document).ready(() => {
                    if ("anime" == this.page.type) {
                        if (null != this.tempAnimelist) return void fullListCallback(this.tempAnimelist);
                    } else if (null != this.tempMangalist) return void fullListCallback(this.tempMangalist);
                    function fullListCallback(list) {
                        var cover = !0;
                        $(".library-list tbody tr").length && (cover = !1), con.log(list), $.each(list, (index, en) => __awaiter(this, void 0, void 0, function*() {
                            if (con.log("en", en), void 0 !== en.malId && null !== en.malId && en.malId) {
                                var element = $('.library-grid-popover:not(.malSyncDone2) a[href^="/' + This.page.type + "/" + en.kitsuSlug + '"], .library-list tbody tr:not(.malSyncDone2) a[href^="/' + This.page.type + "/" + en.kitsuSlug + '"]').first().parent().parent().parent();
                                con.log(element), element.addClass("malSyncDone2");
                                var streamUrl = utils.getUrlFromTags(en.tags);
                                void 0 !== streamUrl && (con.log(streamUrl), cover ? element.prepend(`\n                  <a class="mal-sync-stream mal-rem" title="${streamUrl.split("/")[2]}" target="_blank" style="margin: 0 0; z-index: 22; position:absolute; left: 0px; top: 0px; background-color: #ffffff5c; padding: 0 5px 3px 5px;" href="${streamUrl}">\n                    <img src="${utils.favicon(streamUrl.split("/")[2])}">\n                  </a>`) : element.find(".title-wrapper").append(`\n                  <a class="mal-sync-stream mal-rem" title="${streamUrl.split("/")[2]}" target="_blank" style="padding: 0 5px;" href="${streamUrl}">\n                    <img src="${utils.favicon(streamUrl.split("/")[2])}">\n                  </a>`));
                                var resumeUrlObj = yield utils.getResumeWaching(This.page.type, en.malId), continueUrlObj = yield utils.getContinueWaching(This.page.type, en.malId), curEp = en.watchedEp;
                                con.log("Resume", resumeUrlObj, "Continue", continueUrlObj), void 0 !== continueUrlObj && continueUrlObj.ep === curEp + 1 ? cover ? element.prepend(`<a class="nextStream mal-rem" title="Continue watching" target="_blank" style="color: #BABABA; z-index: 22; position:absolute; top: 0px; left: 26px; background-color: #ffffff5c; padding: 0 5px 3px 5px;" href="${continueUrlObj.url}">\n                    <img src="${api.storage.assetUrl("double-arrow-16px.png")}" width="16" height="16">\n                  </a>`) : element.find(".title-wrapper").append(`<a class="nextStream mal-rem" title="Continue watching" target="_blank" style="padding: 0;" href="${continueUrlObj.url}">\n                    <img src="${api.storage.assetUrl("double-arrow-16px.png")}" width="16" height="16">\n                  </a>`) : void 0 !== resumeUrlObj && resumeUrlObj.ep === curEp && (cover ? element.prepend(`<a class="resumeStream mal-rem" title="Resume watching" target="_blank" style="color: #BABABA; z-index: 22; position:absolute; top: 0px; left: 26px; background-color: #ffffff5c; padding: 0 5px 3px 5px;" href="${resumeUrlObj.url}">\n                    <img src="${api.storage.assetUrl("arrow-16px.png")}" width="16" height="16">\n                  </a>`) : element.find(".title-wrapper").append(`<a class="resumeStream mal-rem" title="Resume watching" target="_blank" style="padding: 0;" href="${resumeUrlObj.url}">\n                    <img src="${api.storage.assetUrl("arrow-16px.png")}" width="16" height="16">\n                  </a>`)), 
                                utils.epPredictionUI(en.malId, This.page.type, prediction => {
                                    prediction && element.parent().find(".entry-unit, .progress-cell > span:last-of-type").append(prediction.tag);
                                });
                            }
                        }));
                    }
                    Object(_provider_Kitsu_userList__WEBPACK_IMPORTED_MODULE_2__.a)(1, this.page.type, {
                        fullListCallback: list => {
                            "anime" == this.page.type ? this.tempAnimelist = list : this.tempMangalist = list, 
                            fullListCallback(list);
                        }
                    });
                });
            }
        }
    }).call(this, __webpack_require__(2), __webpack_require__(0), __webpack_require__(1));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(api, con) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return scheduleUpdate;
        });
        var __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = Promise))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator.throw(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        function scheduleUpdate() {
            return __awaiter(this, void 0, void 0, function*() {
                yield function() {
                    return __awaiter(this, void 0, void 0, function*() {
                        return api.request.xhr("GET", "https://myanimelist.net/anime/season/schedule").then(response => __awaiter(this, void 0, void 0, function*() {
                            console.groupCollapsed("MyAnimeList Scheduler"), con.log("Recived");
                            var found = 0, parsed = $.parseHTML(response.responseText), se = ".js-seasonal-anime-list-key-";
                            se = se + "monday, " + se + "tuesday ," + se + "wednesday ," + se + "thursday ," + se + "friday ," + se + "saturday ," + se + "sunday";
                            var seasons = $(parsed).find(se).find(".seasonal-anime");
                            seasons.length && (yield function() {
                                return __awaiter(this, void 0, void 0, function*() {
                                    var cacheArray = yield api.storage.list(), deleted = 0;
                                    $.each(cacheArray, function(index, cache) {
                                        /^mal\/[^\/]+\/(release|eps|aniSch)$/.test(index) && (api.storage.remove(index), 
                                        deleted++);
                                    }), con.log("Cache Cleared [" + deleted + "]");
                                });
                            }()), seasons.each(function() {
                                if ($(this).find(".info .remain-time").text().match(/\w+\ \d+.\ \d+,\ \d+:\d+\ \(JST\)/i)) {
                                    var malId = $(this).find("a.link-title").attr("href").split("/")[4], jpdate = $(this).find(".info .remain-time").text().trim(), day = jpdate.split(" ")[1].replace(",", "").trim(), month = jpdate.split(" ")[0].trim();
                                    month = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(month) / 3 + 1;
                                    var year = jpdate.split(" ")[2].replace(",", "").trim(), time = jpdate.split(" ")[3].trim(), minute = time.split(":")[1], hour = time.split(":")[0], timestamp = function(year, month, day, hour, minute, second) {
                                        return new Date(Date.UTC(year, month - 1, day, hour, minute, second)).getTime() - 324e5;
                                    }(year, month, day, hour, minute, 0);
                                    con.log(malId, timestamp), api.storage.set("mal/" + malId + "/release", timestamp);
                                    var episode = $(this).find(".eps a span").last().text();
                                    episode.match(/^\d+/) && api.storage.set("mal/" + malId + "/eps", parseInt(episode.match(/^\d+/)[0]));
                                }
                                found++;
                            }), con.log("Schedule updated (" + found + ")"), console.groupEnd();
                        }));
                    });
                }(), yield function anilistScheduler(page = 0) {
                    return __awaiter(this, void 0, void 0, function*() {
                        var variables = {
                            page: page
                        };
                        return api.request.xhr("POST", {
                            url: "https://graphql.anilist.co",
                            headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json"
                            },
                            data: JSON.stringify({
                                query: "\n    query($page: Int){\n      Page(page: $page, perPage: 50){\n        pageInfo{\n          hasNextPage\n        }\n        media (type: ANIME, status: RELEASING) {\n          id\n          idMal\n          nextAiringEpisode{\n            episode\n            airingAt\n          }\n        }\n      }\n    }\n  ",
                                variables: variables
                            })
                        }).then(response => {
                            console.groupCollapsed("Anilist Scheduler " + page);
                            var res = JSON.parse(response.responseText);
                            if (void 0 !== res.errors) return con.log("Anilist api limit", res), void setTimeout(function() {
                                anilistScheduler(page);
                            }, 6e4);
                            if (void 0 === res.data.Page.media) throw "anilistScheduler empty";
                            return con.log(res.data.Page.pageInfo), res.data.Page.media.forEach(function(el) {
                                var malId = el.idMal;
                                if (malId && "null" !== malId && null != malId && null != el.nextAiringEpisode && el.nextAiringEpisode.episode > 1) {
                                    var elObj = {
                                        aniId: el.id,
                                        currentEp: el.nextAiringEpisode.episode - 1,
                                        nextEpTime: el.nextAiringEpisode.airingAt
                                    };
                                    con.log(elObj), api.storage.set("mal/" + malId + "/aniSch", elObj);
                                }
                            }), con.log(res), console.groupEnd(), res.data.Page.pageInfo.hasNextPage ? anilistScheduler(page + 1) : void 0;
                        });
                    });
                }();
            });
        }
    }).call(this, __webpack_require__(0), __webpack_require__(1));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(api, j, con, utils) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return firebaseNotification;
        });
        var __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = Promise))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator.throw(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        function firebaseNotification() {
            return __awaiter(this, void 0, void 0, function*() {
                var schedule = yield api.storage.get("timestampUpdate/firebaseNotification");
                (void 0 === schedule || j.$.now() - schedule > 6e5) && (!function checkNotifications() {
                    con.log("checkNotifications");
                    api.request.xhr("GET", "https://kissanimelist.firebaseio.com/Data2/Notification/Current.json").then(response => __awaiter(this, void 0, void 0, function*() {
                        var current = parseInt(JSON.parse(response.responseText));
                        if (isNaN(current)) con.error("Could not read current Notification number"); else {
                            con.log("Current Notification", current);
                            var last = parseInt(yield api.storage.get("firebaseNotification")), next = last + 1;
                            if (null == typeof last || isNaN(last)) return void api.storage.set("firebaseNotification", current);
                            if (current >= next) {
                                var notificationUrl = "https://kissanimelist.firebaseio.com/Data2/Notification/list/N" + next + ".json";
                                api.request.xhr("GET", notificationUrl).then(response => __awaiter(this, void 0, void 0, function*() {
                                    var message = JSON.parse(response.responseText);
                                    "null" != message && null != message ? j.$(document).ready(function() {
                                        var flashm = utils.flashm('<div style="text-align: left;">' + message + '</div><button class="okChangelog" style="background-color: transparent; border: none; color: rgb(255,64,129);margin-top: 10px;cursor: pointer;">Close</button>', {
                                            permanent: !0,
                                            position: "top"
                                        });
                                        flashm.find(".okChangelog").click(function() {
                                            flashm.remove(), api.storage.set("firebaseNotification", next).then(function() {
                                                checkNotifications();
                                            });
                                        });
                                    }) : (con.info("Notification empty", response.responseText), api.storage.set("firebaseNotification", next).then(function() {
                                        checkNotifications();
                                    }));
                                }));
                            } else con.log("No new notifications");
                        }
                    }));
                }(), api.storage.set("timestampUpdate/firebaseNotification", j.$.now()));
            });
        }
    }).call(this, __webpack_require__(0), __webpack_require__(3), __webpack_require__(1), __webpack_require__(2));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var render = function() {
        var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
        return _c("div", {
            staticClass: "page-content malClear",
            attrs: {
                id: "malRecommendations"
            }
        }, [ _c("div", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: "" == _vm.xhr,
                expression: "xhr == ''"
            } ],
            staticClass: "mdl-progress mdl-js-progress mdl-progress__indeterminate",
            staticStyle: {
                width: "100%",
                position: "absolute"
            },
            attrs: {
                id: "loadOverview"
            }
        }), _vm._v(" "), _c("span", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: "" != _vm.xhr && "" == _vm.recommendations,
                expression: "xhr != '' && recommendations == ''"
            } ],
            staticClass: "mdl-chip",
            staticStyle: {
                margin: "auto",
                "margin-top": "16px",
                display: "table"
            }
        }, [ _c("span", {
            staticClass: "mdl-chip__text"
        }, [ _vm._v(_vm._s(_vm.lang("NothingFound"))) ]) ]), _vm._v(" "), "" != _vm.xhr ? _c("div", {
            staticClass: "mdl-grid",
            domProps: {
                innerHTML: _vm._s(_vm.recommendations)
            }
        }) : _vm._e() ]);
    };
    render._withStripped = !0;
    var minimalApp_recommendationsvue_type_script_lang_js_ = __webpack_require__(22).a, componentNormalizer = __webpack_require__(4), component = Object(componentNormalizer.a)(minimalApp_recommendationsvue_type_script_lang_js_, render, [], !1, null, null, null);
    component.options.__file = "src/minimal/minimalApp/recommendations.vue";
    __webpack_exports__.a = component.exports;
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var render = function() {
        var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
        return _c("ul", {
            staticClass: "demo-list-control mdl-list",
            staticStyle: {
                margin: "0px",
                padding: "0px"
            }
        }, [ _c("div", {
            staticClass: "mdl-grid"
        }, [ _c("div", {
            staticClass: "mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet mdl-shadow--4dp",
            staticStyle: {
                display: "none"
            },
            attrs: {
                id: "page-config"
            }
        }), _vm._v(" "), _vm.page && _vm.page.UILoaded ? _c("correction", {
            attrs: {
                page: _vm.page
            }
        }) : _vm._e(), _vm._v(" "), _c("div", {
            staticClass: "mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet mdl-shadow--4dp"
        }, [ _c("div", {
            staticClass: "mdl-card__title mdl-card--border"
        }, [ _c("h2", {
            staticClass: "mdl-card__title-text"
        }, [ _vm._v(_vm._s(_vm.lang("settings_General"))) ]) ]), _vm._v(" "), _c("li", {
            staticClass: "mdl-list__item"
        }, [ _c("span", {
            staticClass: "mdl-list__item-primary-content"
        }, [ _vm._v("\n          " + _vm._s(_vm.lang("settings_Mode")) + "\n        ") ]), _vm._v(" "), _vm._m(0) ]), _vm._v(" "), "ANILIST" == _vm.options.syncMode ? _c("li", {
            staticClass: "mdl-list__item"
        }, [ _c("span", {
            staticClass: "mdl-list__item-primary-content"
        }, [ _vm._v("\n          AniList\n        ") ]), _vm._v(" "), _c("span", {
            staticClass: "mdl-list__item-secondary-action"
        }, [ _c("a", {
            attrs: {
                target: "_blank",
                href: "https://anilist.co/api/v2/oauth/authorize?client_id=1487&response_type=token"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_Authenticate"))) ]) ]) ]) : _vm._e(), _vm._v(" "), "KITSU" == _vm.options.syncMode ? _c("li", {
            staticClass: "mdl-list__item"
        }, [ _c("span", {
            staticClass: "mdl-list__item-primary-content"
        }, [ _vm._v("\n          Kitsu\n        ") ]), _vm._v(" "), _c("span", {
            staticClass: "mdl-list__item-secondary-action"
        }, [ _c("a", {
            attrs: {
                target: "_blank",
                href: "https://kitsu.io/404?mal-sync=authentication"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_Authenticate"))) ]) ]) ]) : _vm._e(), _vm._v(" "), _c("li", {
            staticClass: "mdl-list__item"
        }, [ _c("span", {
            staticClass: "mdl-list__item-primary-content"
        }, [ _vm._v("\n          " + _vm._s(_vm.lang("settings_Animesync")) + "\n        ") ]), _vm._v(" "), _c("span", {
            staticClass: "mdl-list__item-secondary-action"
        }, [ _c("select", {
            staticClass: "inputtext mdl-textfield__input",
            staticStyle: {
                outline: "none"
            },
            attrs: {
                name: "myinfo_score",
                id: "autoTrackingModeanime"
            }
        }, [ _c("option", {
            attrs: {
                value: "video"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_Animesync_Video"))) ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "instant"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_Animesync_Instant"))) ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "manual"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_Animesync_Manual"))) ]) ]) ]) ]), _vm._v(" "), _c("li", {
            staticClass: "mdl-list__item"
        }, [ _c("span", {
            staticClass: "mdl-list__item-primary-content"
        }, [ _vm._v("\n          " + _vm._s(_vm.lang("settings_Mangasync")) + "\n        ") ]), _vm._v(" "), _c("span", {
            staticClass: "mdl-list__item-secondary-action"
        }, [ _c("select", {
            staticClass: "inputtext mdl-textfield__input",
            staticStyle: {
                outline: "none"
            },
            attrs: {
                name: "myinfo_score",
                id: "autoTrackingModemanga"
            }
        }, [ _c("option", {
            attrs: {
                value: "instant"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_Animesync_Instant"))) ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "manual"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_Animesync_Manual"))) ]) ]) ]) ]), _vm._v(" "), _c("numberInput", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: "video" == _vm.options.autoTrackingModeanime || "video" == _vm.options.autoTrackingModemanga,
                expression: "options.autoTrackingModeanime == 'video' || options.autoTrackingModemanga == 'video'"
            } ],
            attrs: {
                option: "videoDuration",
                min: 10,
                max: 99
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_AutoTracking_Video", [ _vm.options.videoDuration ]))) ]), _vm._v(" "), _c("numberInput", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: "instant" == _vm.options.autoTrackingModeanime || "instant" == _vm.options.autoTrackingModemanga,
                expression: "options.autoTrackingModeanime == 'instant' || options.autoTrackingModemanga == 'instant'"
            } ],
            attrs: {
                option: "delay"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_AutoTracking_Instant", [ _vm.options.delay ]))) ]) ], 1), _vm._v(" "), _c("div", {
            staticClass: "mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet mdl-shadow--4dp"
        }, [ _c("div", {
            staticClass: "mdl-card__title mdl-card--border"
        }, [ _c("h2", {
            staticClass: "mdl-card__title-text"
        }, [ _vm._v(_vm._s(_vm.lang("settings_StreamingSite"))) ]), _vm._v(" "), _c("tooltip", [ _vm._v(_vm._s(_vm.lang("settings_StreamingSite_text"))) ]) ], 1), _vm._v(" "), _c("checkbox", {
            attrs: {
                option: "SiteSearch"
            }
        }, [ _vm._v(_vm._s(_vm.lang("Search"))) ]), _vm._v(" "), _c("checkbox", {
            attrs: {
                option: "Kissanime"
            }
        }, [ _vm._v("KissAnime") ]), _vm._v(" "), _c("checkbox", {
            attrs: {
                option: "Masterani"
            }
        }, [ _vm._v("MasterAnime") ]), _vm._v(" "), _c("checkbox", {
            attrs: {
                option: "9anime"
            }
        }, [ _vm._v("9anime") ]), _vm._v(" "), _c("checkbox", {
            attrs: {
                option: "Crunchyroll"
            }
        }, [ _vm._v("Crunchyroll") ]), _vm._v(" "), _c("checkbox", {
            attrs: {
                option: "Netflix"
            }
        }, [ _vm._v("Netflix") ]), _vm._v(" "), _c("checkbox", {
            attrs: {
                option: "Gogoanime"
            }
        }, [ _vm._v("Gogoanime") ]), _vm._v(" "), _c("checkbox", {
            attrs: {
                option: "Twistmoe"
            }
        }, [ _vm._v("twist.moe") ]), _vm._v(" "), _c("checkbox", {
            attrs: {
                option: "Anime4you"
            }
        }, [ _vm._v("Anime4You (Ger)") ]), _vm._v(" "), _c("checkbox", {
            attrs: {
                option: "Kissmanga"
            }
        }, [ _vm._v("KissManga") ]), _vm._v(" "), _c("checkbox", {
            attrs: {
                option: "Mangadex"
            }
        }, [ _vm._v("MangaDex") ]), _vm._v(" "), _c("checkbox", {
            attrs: {
                option: "Mangarock"
            }
        }, [ _vm._v("Mangarock") ]) ], 1), _vm._v(" "), _c("div", {
            staticClass: "mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet mdl-shadow--4dp"
        }, [ _vm._m(1), _vm._v(" "), _c("li", {
            staticClass: "mdl-list__item"
        }, [ _c("span", {
            staticClass: "mdl-list__item-primary-content"
        }, [ _vm._v("\n          " + _vm._s(_vm.lang("settings_Thumbnails")) + "\n          "), _c("tooltip", [ _c("span", {
            domProps: {
                innerHTML: _vm._s(_vm.lang("settings_Thumbnails_text"))
            }
        }) ]) ], 1), _vm._v(" "), _c("span", {
            staticClass: "mdl-list__item-secondary-action"
        }, [ _c("select", {
            staticClass: "inputtext mdl-textfield__input",
            staticStyle: {
                outline: "none"
            },
            attrs: {
                name: "myinfo_score",
                id: "malThumbnail"
            }
        }, [ _c("option", {
            attrs: {
                value: "144"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_Thumbnails_Large"))) ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "100"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_Thumbnails_Medium"))) ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "60"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_Thumbnails_Small"))) ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "0"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_Thumbnails_Default"))) ]) ]) ]) ]), _vm._v(" "), _c("checkbox", {
            attrs: {
                option: "friendScore"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_FriendScore"))) ]) ], 1), _vm._v(" "), _c("div", {
            staticClass: "mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet mdl-shadow--4dp"
        }, [ _vm._m(2), _vm._v(" "), _c("checkbox", {
            attrs: {
                option: "epPredictions"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_epPredictions"))) ]), _vm._v(" "), _c("checkbox", {
            attrs: {
                option: "malTags"
            }
        }, [ _vm._v("\n        " + _vm._s(_vm.lang("settings_malTags")) + "\n        "), _c("tooltip", {
            attrs: {
                direction: "bottom"
            }
        }, [ _c("span", {
            domProps: {
                innerHTML: _vm._s(_vm.lang("settings_malTags_Text"))
            }
        }) ]) ], 1), _vm._v(" "), _c("checkbox", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: _vm.options.malTags,
                expression: "options.malTags"
            } ],
            attrs: {
                option: "malContinue"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_malContinue"))) ]), _vm._v(" "), _c("checkbox", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: _vm.options.malTags,
                expression: "options.malTags"
            } ],
            attrs: {
                option: "malResume"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_malResume"))) ]) ], 1), _vm._v(" "), _c("div", {
            staticClass: "mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet mdl-shadow--4dp"
        }, [ _vm._m(3), _vm._v(" "), _c("checkbox", {
            attrs: {
                option: "floatButtonStealth"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_miniMAL_floatButtonStealth"))) ]), _vm._v(" "), _c("checkbox", {
            attrs: {
                option: "floatButtonHide"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_miniMAL_floatButtonHide"))) ]), _vm._v(" "), _c("checkbox", {
            attrs: {
                option: "autoCloseMinimal"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_miniMAL_autoCloseMinimal"))) ]), _vm._v(" "), _c("li", {
            staticClass: "mdl-list__item"
        }, [ _c("span", {
            staticClass: "mdl-list__item-primary-content"
        }, [ _vm._v("\n          " + _vm._s(_vm.lang("settings_miniMAL_Display")) + "\n        ") ]), _vm._v(" "), _c("span", {
            staticClass: "mdl-list__item-secondary-action"
        }, [ _c("select", {
            staticClass: "inputtext mdl-textfield__input",
            staticStyle: {
                outline: "none"
            },
            attrs: {
                name: "myinfo_score",
                id: "posLeft"
            }
        }, [ _c("option", {
            attrs: {
                value: "left"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_miniMAL_Display_Left"))) ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "right"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_miniMAL_Display_Right"))) ]) ]) ]) ]), _vm._v(" "), _c("li", {
            staticClass: "mdl-list__item",
            staticStyle: {
                display: "inline-block",
                width: "49%"
            }
        }, [ _c("div", {
            staticClass: "mdl-textfield mdl-js-textfield mdl-textfield--floating-label",
            staticStyle: {
                width: "100%"
            }
        }, [ _c("input", {
            staticClass: "mdl-textfield__input",
            attrs: {
                type: "text",
                step: "1",
                id: "miniMalHeight"
            },
            domProps: {
                value: _vm.options.miniMalHeight
            }
        }), _vm._v(" "), _c("label", {
            staticClass: "mdl-textfield__label",
            attrs: {
                for: "miniMalHeight"
            }
        }, [ _vm._v("\n            " + _vm._s(_vm.lang("settings_miniMAL_Height")) + "\n          ") ]) ]) ]), _vm._v(" "), _c("li", {
            staticClass: "mdl-list__item",
            staticStyle: {
                display: "inline-block",
                width: "50%"
            }
        }, [ _c("div", {
            staticClass: "mdl-textfield mdl-js-textfield mdl-textfield--floating-label",
            staticStyle: {
                width: "100%"
            }
        }, [ _c("input", {
            staticClass: "mdl-textfield__input",
            attrs: {
                type: "text",
                step: "1",
                id: "miniMalWidth"
            },
            domProps: {
                value: _vm.options.miniMalWidth
            }
        }), _vm._v(" "), _c("label", {
            staticClass: "mdl-textfield__label",
            attrs: {
                for: "miniMalWidth"
            }
        }, [ _vm._v("\n            " + _vm._s(_vm.lang("settings_miniMAL_Width")) + "\n          ") ]) ]) ]) ], 1), _vm._v(" "), _vm.commands ? _c("div", {
            staticClass: "mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet mdl-shadow--4dp"
        }, [ _c("div", {
            staticClass: "mdl-card__title mdl-card--border"
        }, [ _c("h2", {
            staticClass: "mdl-card__title-text"
        }, [ _vm._v(_vm._s(_vm.lang("settings_Shortcuts"))) ]) ]), _vm._v(" "), _c("li", {
            staticClass: "mdl-list__item"
        }, [ _c("span", {
            staticClass: "mdl-list__item-primary-content"
        }, [ _vm._v("\n          " + _vm._s(_vm.lang("settings_miniMAL_Open")) + "\n        ") ]), _vm._v(" "), _c("span", {
            staticClass: "mdl-list__item-secondary-action"
        }, [ _vm._v("\n          " + _vm._s(_vm.commands._execute_browser_action.shortcut) + "\n          "), _vm.commands._execute_browser_action.shortcut ? _vm._e() : _c("span", [ _c("a", {
            attrs: {
                href: "https://github.com/lolamtisch/MALSync/wiki/Shortcuts",
                target: "_blank"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_miniMAL_NotSet"))) ]) ]) ]) ]), _vm._v(" "), _c("li", {
            staticClass: "mdl-list__item"
        }, [ _c("span", {
            staticClass: "mdl-list__item-primary-content"
        }, [ _vm._v("\n          " + _vm._s(_vm.commands.intro_skip_forward.description) + "\n        ") ]), _vm._v(" "), _c("span", {
            staticClass: "mdl-list__item-secondary-action"
        }, [ _vm._v("\n          " + _vm._s(_vm.commands.intro_skip_forward.shortcut) + "\n          "), _vm.commands.intro_skip_forward.shortcut ? _vm._e() : _c("span", [ _c("a", {
            attrs: {
                href: "https://github.com/lolamtisch/MALSync/wiki/Shortcuts",
                target: "_blank"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_miniMAL_NotSet"))) ]) ]) ]) ]), _vm._v(" "), _c("li", {
            staticClass: "mdl-list__item"
        }, [ _c("span", {
            staticClass: "mdl-list__item-primary-content"
        }, [ _vm._v("\n          " + _vm._s(_vm.commands.intro_skip_backward.description) + "\n        ") ]), _vm._v(" "), _c("span", {
            staticClass: "mdl-list__item-secondary-action"
        }, [ _vm._v("\n          " + _vm._s(_vm.commands.intro_skip_backward.shortcut) + "\n          "), _vm.commands.intro_skip_backward.shortcut ? _vm._e() : _c("span", [ _c("a", {
            attrs: {
                href: "https://github.com/lolamtisch/MALSync/wiki/Shortcuts",
                target: "_blank"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_miniMAL_NotSet"))) ]) ]) ]) ]), _vm._v(" "), _c("numberInput", {
            attrs: {
                option: "introSkip",
                min: 5
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_introSkip", [ _vm.options.introSkip ]))) ]) ], 1) : _vm._e(), _vm._v(" "), _c("div", {
            staticClass: "mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet mdl-shadow--4dp",
            staticStyle: {
                display: "none"
            },
            attrs: {
                id: "updateCheck"
            }
        }, [ _c("div", {
            staticClass: "mdl-card__title mdl-card--border"
        }, [ _c("h2", {
            staticClass: "mdl-card__title-text"
        }, [ _vm._v(_vm._s(_vm.lang("settings_UpdateCheck"))) ]), _vm._v(" "), _c("tooltip", [ _vm._v("\n          " + _vm._s(_vm.lang("settings_UpdateCheck_Text")) + "\n        ") ]), _vm._v(" "), _c("div", {
            staticStyle: {
                "margin-left": "auto"
            },
            attrs: {
                id: "updateCheckAgo"
            }
        }) ], 1), _vm._v(" "), _c("li", {
            staticClass: "mdl-list__item"
        }, [ _c("span", {
            staticClass: "mdl-list__item-primary-content"
        }, [ _vm._v("\n          " + _vm._s(_vm.lang("settings_Interval")) + "\n        ") ]), _vm._v(" "), _c("span", {
            staticClass: "mdl-list__item-secondary-action"
        }, [ _c("select", {
            staticClass: "inputtext mdl-textfield__input",
            staticStyle: {
                outline: "none"
            },
            attrs: {
                name: "updateCheckTime",
                id: "updateCheckTime"
            }
        }, [ _c("option", {
            attrs: {
                value: "0"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_Interval_Off"))) ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "60"
            }
        }, [ _vm._v("1h") ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "240"
            }
        }, [ _vm._v("4h") ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "720"
            }
        }, [ _vm._v("12h") ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "1440"
            }
        }, [ _vm._v("24h") ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "2880"
            }
        }, [ _vm._v("48h") ]) ]) ]) ]), _vm._v(" "), _c("span", {
            staticClass: "updateCheckEnable",
            staticStyle: {
                display: "none"
            }
        }, [ _c("checkbox", {
            attrs: {
                option: "updateCheckNotifications"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_Notifications"))) ]) ], 1), _vm._v(" "), _c("li", {
            staticClass: "mdl-list__item updateCheckEnable",
            staticStyle: {
                display: "none"
            }
        }, [ _c("button", {
            staticClass: "mdl-button mdl-js-button mdl-button--raised mdl-button--colored",
            attrs: {
                type: "button",
                id: "updateCheckUi"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_Debugging"))) ]) ]) ]), _vm._v(" "), _c("div", {
            staticClass: "mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet mdl-shadow--4dp"
        }, [ _c("div", {
            staticClass: "mdl-card__title mdl-card--border"
        }, [ _c("h2", {
            staticClass: "mdl-card__title-text"
        }, [ _vm._v(_vm._s(_vm.lang("settings_ETC"))) ]) ]), _vm._v(" "), _c("checkbox", {
            attrs: {
                option: "forceEn"
            }
        }, [ _vm._v("Force english") ]), _vm._v(" "), _c("span", {
            staticClass: "option-extension",
            staticStyle: {
                display: "none"
            }
        }, [ _c("checkbox", {
            attrs: {
                option: "userscriptMode"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_Userscriptmode"))), _c("tooltip", {
            attrs: {
                direction: "bottom"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_Userscriptmode_Text"))) ]) ], 1) ], 1), _vm._v(" "), _c("span", {
            staticClass: "option-extension-popup",
            staticStyle: {
                display: "none"
            }
        }, [ _c("checkbox", {
            attrs: {
                option: "strictCookies"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_StrictCookies"))), _c("tooltip", [ _vm._v(_vm._s(_vm.lang("settings_StrictCookies_Text"))) ]) ], 1) ], 1), _vm._v(" "), _c("li", {
            staticClass: "mdl-list__item"
        }, [ _c("button", {
            staticClass: "mdl-button mdl-js-button mdl-button--raised mdl-button--colored",
            attrs: {
                type: "button",
                id: "clearCache"
            }
        }, [ _vm._v(_vm._s(_vm.lang("settings_ClearCache"))) ]) ]) ], 1), _vm._v(" "), _c("div", {
            staticClass: "mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet mdl-shadow--4dp",
            class: {
                open: _vm.isOpen
            },
            attrs: {
                id: "contributer"
            },
            on: {
                click: function($event) {
                    return _vm.myOpen();
                }
            }
        }, [ _vm._l(_vm.contributer, function(contributerGroup, group) {
            return _c("div", {
                staticClass: "inline-block"
            }, [ _c("div", {
                staticClass: "group"
            }, [ _vm._v(_vm._s(group)) ]), _vm._v(" "), _vm._l(contributerGroup, function(contr) {
                return _c("div", {
                    staticClass: "inline-block"
                }, [ _c("div", {
                    staticClass: "user"
                }, [ _c("div", {
                    staticClass: "image align-middle"
                }, [ contr.gif ? _c("clazy-load", {
                    attrs: {
                        src: contr.gif
                    }
                }, [ _c("img", {
                    staticClass: "lazy init gif",
                    attrs: {
                        src: contr.gif
                    }
                }) ]) : _vm._e(), _vm._v(" "), _c("clazy-load", {
                    attrs: {
                        src: contr.image
                    }
                }, [ _c("img", {
                    staticClass: "lazy init",
                    attrs: {
                        src: contr.image
                    }
                }) ]) ], 1), _vm._v(" "), _c("div", {
                    staticClass: "text align-middle"
                }, [ _c("div", {
                    staticClass: "name",
                    style: "color:" + contr.color,
                    attrs: {
                        title: contr.name
                    }
                }, [ _vm._v("\n                " + _vm._s(contr.name) + "\n              ") ]), _vm._v(" "), contr.subText ? _c("div", {
                    staticClass: "subtext"
                }, [ _vm._v(_vm._s(contr.subText)) ]) : _vm._e() ]) ]) ]);
            }) ], 2);
        }), _vm._v(" "), _vm._m(4), _vm._v(" "), _c("a", {
            staticClass: "discord",
            attrs: {
                rel: "noreferrer",
                href: "https://discordapp.com/invite/cTH4yaw"
            }
        }, [ _c("div", {
            staticStyle: {
                height: "20px",
                margin: "-15px",
                "margin-top": "15px",
                background: "-webkit-linear-gradient(top, #ffffff 0%,#738bd7 74%)"
            }
        }), _vm._v(" "), _c("clazy-load", {
            staticStyle: {
                background: "linear-gradient(to bottom, #738bd7 0%,#738bd7 64%,#697ec4 64%,#697ec4 100%)",
                "background-color": "#697ec4",
                position: "relative",
                overflow: "hidden",
                "margin-left": "-15px",
                "margin-right": "-15px",
                "margin-bottom": "-15px",
                "margin-top": "15px"
            },
            attrs: {
                src: "https://discordapp.com/api/guilds/358599430502481920/widget.png?style=banner3"
            }
        }, [ _c("img", {
            staticStyle: {
                margin: "auto",
                display: "block"
            },
            attrs: {
                src: "https://discordapp.com/api/guilds/358599430502481920/widget.png?style=banner3"
            }
        }) ]) ], 1) ], 2), _vm._v(" "), _c("div", {
            staticClass: "mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet mdl-shadow--4dp"
        }, [ _c("li", {
            staticClass: "mdl-list__item"
        }, [ _c("div", {
            staticStyle: {
                "line-height": "30px"
            }
        }, [ _c("clazy-load", {
            attrs: {
                tag: "a",
                rel: "noreferrer",
                href: _vm.version.link,
                src: _vm.version.img
            }
        }, [ _c("img", {
            attrs: {
                src: _vm.version.img
            }
        }), _vm._v(" "), _c("span", {
            attrs: {
                slot: "placeholder"
            },
            slot: "placeholder"
        }, [ _vm._v("\n              " + _vm._s(_vm.lang("Loading")) + "\n            ") ]) ]), _vm._v(" "), _c("br"), _vm._v(" "), _c("clazy-load", {
            attrs: {
                tag: "a",
                rel: "noreferrer",
                href: "https://discordapp.com/invite/cTH4yaw",
                src: "https://img.shields.io/discord/358599430502481920.svg?style=flat-square&logo=discord&label=Chat%20%2F%20Support&colorB=7289DA"
            }
        }, [ _c("img", {
            attrs: {
                src: "https://img.shields.io/discord/358599430502481920.svg?style=flat-square&logo=discord&label=Chat%20%2F%20Support&colorB=7289DA"
            }
        }), _vm._v(" "), _c("span", {
            attrs: {
                slot: "placeholder"
            },
            slot: "placeholder"
        }, [ _vm._v("\n              " + _vm._s(_vm.lang("Loading")) + "\n            ") ]) ]), _vm._v(" "), _c("br"), _vm._v(" "), _c("clazy-load", {
            attrs: {
                tag: "a",
                rel: "noreferrer",
                href: "https://github.com/lolamtisch/MALSync",
                src: "https://img.shields.io/github/last-commit/lolamtisch/malsync.svg?style=flat-square&logo=github&logoColor=white&label=Github"
            }
        }, [ _c("img", {
            attrs: {
                src: "https://img.shields.io/github/last-commit/lolamtisch/malsync.svg?style=flat-square&logo=github&logoColor=white&label=Github"
            }
        }), _vm._v(" "), _c("span", {
            attrs: {
                slot: "placeholder"
            },
            slot: "placeholder"
        }, [ _vm._v("\n              " + _vm._s(_vm.lang("Loading")) + "\n            ") ]) ]), _vm._v(" "), _c("br"), _vm._v(" "), _c("clazy-load", {
            attrs: {
                tag: "a",
                rel: "noreferrer",
                href: "https://github.com/lolamtisch/MALSync/issues",
                src: "https://img.shields.io/github/issues/lolamtisch/MALSync.svg?style=flat-square&logo=github&logoColor=white"
            }
        }, [ _c("img", {
            attrs: {
                src: "https://img.shields.io/github/issues/lolamtisch/MALSync.svg?style=flat-square&logo=github&logoColor=white"
            }
        }), _vm._v(" "), _c("span", {
            attrs: {
                slot: "placeholder"
            },
            slot: "placeholder"
        }, [ _vm._v("\n              " + _vm._s(_vm.lang("Loading")) + "\n            ") ]) ]), _vm._v(" "), _c("br"), _vm._v(" "), _c("clazy-load", {
            attrs: {
                tag: "a",
                rel: "noreferrer",
                href: "https://chrome.google.com/webstore/detail/mal-sync/kekjfbackdeiabghhcdklcdoekaanoel?hl=en",
                src: "https://img.shields.io/badge/Chrome-Download-brightgreen.svg?style=flat-square&label=Chrome&logo=google%20chrome&logoColor=white"
            }
        }, [ _c("img", {
            attrs: {
                src: "https://img.shields.io/badge/Chrome-Download-brightgreen.svg?style=flat-square&label=Chrome&logo=google%20chrome&logoColor=white"
            }
        }), _vm._v(" "), _c("span", {
            attrs: {
                slot: "placeholder"
            },
            slot: "placeholder"
        }, [ _vm._v("\n              " + _vm._s(_vm.lang("Loading")) + "\n            ") ]) ]), _vm._v(" "), _c("br"), _vm._v(" "), _c("clazy-load", {
            attrs: {
                tag: "a",
                rel: "noreferrer",
                href: "https://addons.mozilla.org/en-US/firefox/addon/mal-sync",
                src: "https://img.shields.io/badge/Firefox-Download-brightgreen.svg?style=flat-square&label=Firefox&logo=mozilla%20firefox&logoColor=white"
            }
        }, [ _c("img", {
            attrs: {
                src: "https://img.shields.io/badge/Firefox-Download-brightgreen.svg?style=flat-square&label=Firefox&logo=mozilla%20firefox&logoColor=white"
            }
        }), _vm._v(" "), _c("span", {
            attrs: {
                slot: "placeholder"
            },
            slot: "placeholder"
        }, [ _vm._v("\n              " + _vm._s(_vm.lang("Loading")) + "\n            ") ]) ]), _vm._v(" "), _c("br"), _vm._v(" "), _c("clazy-load", {
            attrs: {
                tag: "a",
                rel: "noreferrer",
                href: "https://greasyfork.org/de/scripts/372847-mal-sync",
                src: "https://img.shields.io/badge/Userscript-Download-brightgreen.svg?style=flat-square&label=Userscript&logo=javascript&logoColor=white"
            }
        }, [ _c("img", {
            attrs: {
                src: "https://img.shields.io/badge/Userscript-Download-brightgreen.svg?style=flat-square&label=Userscript&logo=javascript&logoColor=white"
            }
        }), _vm._v(" "), _c("span", {
            attrs: {
                slot: "placeholder"
            },
            slot: "placeholder"
        }, [ _vm._v("\n              " + _vm._s(_vm.lang("Loading")) + "\n            ") ]) ]) ], 1) ]) ]) ], 1) ]);
    };
    render._withStripped = !0;
    var minimalApp_settingsvue_type_script_lang_js_ = __webpack_require__(15).a, componentNormalizer = __webpack_require__(4), component = Object(componentNormalizer.a)(minimalApp_settingsvue_type_script_lang_js_, render, [ function() {
        var _h = this.$createElement, _c = this._self._c || _h;
        return _c("span", {
            staticClass: "mdl-list__item-secondary-action"
        }, [ _c("select", {
            staticClass: "inputtext mdl-textfield__input",
            staticStyle: {
                outline: "none"
            },
            attrs: {
                name: "myinfo_score",
                id: "syncMode"
            }
        }, [ _c("option", {
            attrs: {
                value: "MAL"
            }
        }, [ this._v("MyAnimeList") ]), this._v(" "), _c("option", {
            attrs: {
                value: "ANILIST"
            }
        }, [ this._v("AniList") ]), this._v(" "), _c("option", {
            attrs: {
                value: "KITSU"
            }
        }, [ this._v("Kitsu") ]) ]) ]);
    }, function() {
        var _h = this.$createElement, _c = this._self._c || _h;
        return _c("div", {
            staticClass: "mdl-card__title mdl-card--border"
        }, [ _c("h2", {
            staticClass: "mdl-card__title-text"
        }, [ this._v("MyAnimeList") ]) ]);
    }, function() {
        var _h = this.$createElement, _c = this._self._c || _h;
        return _c("div", {
            staticClass: "mdl-card__title mdl-card--border"
        }, [ _c("h2", {
            staticClass: "mdl-card__title-text"
        }, [ this._v("MyAnimeList / AniList / Kitsu") ]) ]);
    }, function() {
        var _h = this.$createElement, _c = this._self._c || _h;
        return _c("div", {
            staticClass: "mdl-card__title mdl-card--border"
        }, [ _c("h2", {
            staticClass: "mdl-card__title-text"
        }, [ this._v("miniMAL") ]) ]);
    }, function() {
        var _h = this.$createElement, _c = this._self._c || _h;
        return _c("div", {
            staticClass: "user pop"
        }, [ _c("div", {
            staticClass: "image align-middle"
        }, [ _c("i", {
            staticClass: "material-icons",
            staticStyle: {
                color: "white",
                padding: "4px 4px",
                cursor: "pointer"
            }
        }, [ this._v("\n            arrow_right_alt\n          ") ]) ]) ]);
    } ], !1, null, null, null);
    component.options.__file = "src/minimal/minimalApp/settings.vue";
    __webpack_exports__.a = component.exports;
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var render = function() {
        var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
        return _c("div", {
            staticClass: "page-content malClear",
            attrs: {
                id: "malReviews"
            }
        }, [ _c("div", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: "" == _vm.xhr,
                expression: "xhr == ''"
            } ],
            staticClass: "mdl-progress mdl-js-progress mdl-progress__indeterminate",
            staticStyle: {
                width: "100%",
                position: "absolute"
            },
            attrs: {
                id: "loadOverview"
            }
        }), _vm._v(" "), _c("span", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: "" != _vm.xhr && "" == _vm.reviews,
                expression: "xhr != '' && reviews == ''"
            } ],
            staticClass: "mdl-chip",
            staticStyle: {
                margin: "auto",
                "margin-top": "16px",
                display: "table"
            }
        }, [ _c("span", {
            staticClass: "mdl-chip__text"
        }, [ _vm._v(_vm._s(_vm.lang("NothingFound"))) ]) ]), _vm._v(" "), "" != _vm.xhr ? _c("div", {
            staticClass: "mdl-grid",
            domProps: {
                innerHTML: _vm._s(_vm.reviews)
            }
        }) : _vm._e() ]);
    };
    render._withStripped = !0;
    var minimalApp_reviewsvue_type_script_lang_js_ = __webpack_require__(25).a, componentNormalizer = __webpack_require__(4), component = Object(componentNormalizer.a)(minimalApp_reviewsvue_type_script_lang_js_, render, [], !1, null, null, null);
    component.options.__file = "src/minimal/minimalApp/reviews.vue";
    __webpack_exports__.a = component.exports;
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var render = function() {
        var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
        return _c("div", {
            staticClass: "page-content"
        }, [ _c("div", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: "" == _vm.xhr,
                expression: "xhr == ''"
            } ],
            staticClass: "mdl-progress mdl-js-progress mdl-progress__indeterminate",
            staticStyle: {
                width: "100%",
                position: "absolute"
            },
            attrs: {
                id: "loadOverview"
            }
        }), _vm._v(" "), "" != _vm.xhr ? _c("div", {
            staticClass: "mdl-grid"
        }, [ _c("div", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: _vm.statistics,
                expression: "statistics"
            } ],
            staticClass: "mdl-cell mdl-cell--1-col mdl-cell--8-col-tablet mdl-cell--6-col-phone mdl-shadow--4dp stats-block malClear",
            staticStyle: {
                "min-width": "120px"
            },
            domProps: {
                innerHTML: _vm._s(_vm.statistics)
            }
        }), _vm._v(" "), _c("div", {
            staticClass: "mdl-grid mdl-cell mdl-shadow--4dp coverinfo malClear",
            staticStyle: {
                display: "block",
                "flex-grow": "100",
                "min-width": "70%"
            }
        }, [ _c("div", {
            staticClass: "mdl-card__media mdl-cell mdl-cell--2-col",
            staticStyle: {
                "background-color": "transparent",
                float: "left",
                "padding-right": "16px"
            }
        }, [ _c("clazy-load", {
            staticClass: "malImage malClear",
            staticStyle: {
                width: "100%",
                height: "auto"
            },
            attrs: {
                src: _vm.image
            }
        }, [ _c("img", {
            staticStyle: {
                height: "auto",
                width: "100%"
            },
            attrs: {
                src: _vm.image
            }
        }) ]) ], 1), _vm._v(" "), _c("div", {
            staticClass: "mdl-cell mdl-cell--12-col"
        }, [ _c("a", {
            staticClass: "mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect malClear malLink",
            staticStyle: {
                float: "right"
            },
            attrs: {
                href: _vm.displayUrl,
                target: "_blank"
            }
        }, [ _c("i", {
            staticClass: "material-icons"
        }, [ _vm._v("open_in_new") ]) ]), _vm._v(" "), _c("h1", {
            staticClass: "malTitle mdl-card__title-text malClear",
            staticStyle: {
                "padding-left": "0px",
                overflow: "visible"
            },
            domProps: {
                innerHTML: _vm._s(_vm.title)
            }
        }), _vm._v(" "), _c("div", {
            staticClass: "malAltTitle mdl-card__supporting-text malClear",
            staticStyle: {
                padding: "10px 0 0 0px",
                overflow: "visible"
            },
            domProps: {
                innerHTML: _vm._s(_vm.altTitle)
            }
        }) ]), _vm._v(" "), _c("div", {
            staticClass: "malDescription malClear mdl-cell mdl-cell--10-col",
            staticStyle: {
                overflow: "hidden"
            }
        }, [ _c("p", {
            staticStyle: {
                color: "black"
            },
            domProps: {
                innerHTML: _vm._s(_vm.description)
            }
        }), _vm._v(" "), _c("div", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: _vm.streaming,
                expression: "streaming"
            } ],
            staticClass: "mdl-card__actions mdl-card--border",
            staticStyle: {
                "padding-left": "0"
            },
            domProps: {
                innerHTML: _vm._s(_vm.streaming)
            }
        }) ]) ]), _vm._v(" "), _c("div", {
            staticClass: "mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-shadow--4dp data-block mdl-grid mdl-grid--no-spacing malClear"
        }, [ _vm.prediction && _vm.prediction.prediction.airing ? _c("li", {
            staticClass: "mdl-list__item",
            staticStyle: {
                width: "100%"
            }
        }, [ _vm._v(_vm._s(_vm.prediction.text)) ]) : _vm._e(), _vm._v(" "), _c("table", {
            attrs: {
                border: "0",
                cellpadding: "0",
                cellspacing: "0",
                width: "100%"
            }
        }, [ _c("tbody", [ _c("li", {
            staticClass: "mdl-list__item mdl-list__item--three-line",
            staticStyle: {
                width: "100%"
            }
        }, [ _c("span", {
            staticClass: "mdl-list__item-primary-content"
        }, [ _c("span", [ _vm._v(_vm._s(_vm.lang("UI_Status")) + " ") ]), _vm._v(" "), _c("span", {
            staticClass: "mdl-list__item-text-body"
        }, [ _c("select", {
            directives: [ {
                name: "model",
                rawName: "v-model",
                value: _vm.malStatus,
                expression: "malStatus"
            } ],
            staticClass: "inputtext js-anime-status-dropdown mdl-textfield__input",
            staticStyle: {
                outline: "none"
            },
            attrs: {
                disabled: !this.renderObj,
                name: "myinfo_status",
                id: "myinfo_status"
            },
            on: {
                change: function($event) {
                    var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
                        return o.selected;
                    }).map(function(o) {
                        return "_value" in o ? o._value : o.value;
                    });
                    _vm.malStatus = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
                }
            }
        }, [ _c("option", {
            attrs: {
                selected: "selected",
                value: "1"
            }
        }, [ _vm._v(_vm._s(_vm.lang("UI_Status_watching_" + _vm.renderObj.type))) ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "2"
            }
        }, [ _vm._v(_vm._s(_vm.lang("UI_Status_Completed"))) ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "3"
            }
        }, [ _vm._v(_vm._s(_vm.lang("UI_Status_OnHold"))) ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "4"
            }
        }, [ _vm._v(_vm._s(_vm.lang("UI_Status_Dropped"))) ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "6"
            }
        }, [ _vm._v(_vm._s(_vm.lang("UI_Status_planTo_" + _vm.renderObj.type))) ]) ]) ]) ]) ]), _vm._v(" "), _c("li", {
            staticClass: "mdl-list__item mdl-list__item--three-line",
            staticStyle: {
                width: "100%"
            }
        }, [ _c("span", {
            staticClass: "mdl-list__item-primary-content"
        }, [ _c("span", [ _vm._v(_vm._s(_vm.utils.episode(_vm.renderObj.type))) ]), _vm._v(" "), _c("span", {
            staticClass: "mdl-list__item-text-body"
        }, [ _c("input", {
            directives: [ {
                name: "model",
                rawName: "v-model",
                value: _vm.malEpisode,
                expression: "malEpisode"
            } ],
            staticClass: "inputtext mdl-textfield__input",
            staticStyle: {
                width: "35px",
                display: "inline-block"
            },
            attrs: {
                disabled: !this.renderObj,
                type: "text",
                id: "myinfo_watchedeps",
                name: "myinfo_watchedeps",
                size: "3",
                value: "6"
            },
            domProps: {
                value: _vm.malEpisode
            },
            on: {
                input: function($event) {
                    $event.target.composing || (_vm.malEpisode = $event.target.value);
                }
            }
        }), _vm._v(" / "), _vm.prediction ? _c("span", {
            domProps: {
                innerHTML: _vm._s(_vm.prediction.tag)
            }
        }) : _vm._e(), _vm._v(" "), _vm.renderObj && _vm.renderObj.totalEp ? _c("span", {
            attrs: {
                id: "curEps"
            }
        }, [ _vm._v(_vm._s(_vm.renderObj.totalEp)) ]) : _c("span", [ _vm._v("?") ]) ]), _vm._v(" "), _vm._m(0) ]) ]), _vm._v(" "), _c("li", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: "manga" == _vm.renderObj.type,
                expression: "renderObj.type == 'manga'"
            } ],
            staticClass: "mdl-list__item mdl-list__item--three-line",
            staticStyle: {
                width: "100%"
            }
        }, [ _c("span", {
            staticClass: "mdl-list__item-primary-content"
        }, [ _c("span", [ _vm._v(_vm._s(_vm.lang("UI_Volume"))) ]), _vm._v(" "), _c("span", {
            staticClass: "mdl-list__item-text-body"
        }, [ _c("input", {
            directives: [ {
                name: "model",
                rawName: "v-model",
                value: _vm.malVolume,
                expression: "malVolume"
            } ],
            staticClass: "inputtext mdl-textfield__input",
            staticStyle: {
                width: "35px",
                display: "inline-block"
            },
            attrs: {
                disabled: !this.renderObj,
                type: "text",
                id: "myinfo_volumes",
                name: "myinfo_volumes",
                size: "3",
                value: "6"
            },
            domProps: {
                value: _vm.malVolume
            },
            on: {
                input: function($event) {
                    $event.target.composing || (_vm.malVolume = $event.target.value);
                }
            }
        }), _vm._v(" / "), _vm.renderObj && _vm.renderObj.totalVol ? _c("span", {
            attrs: {
                id: "curVolumes"
            }
        }, [ _vm._v(_vm._s(_vm.renderObj.totalVol)) ]) : _c("span", [ _vm._v("?") ]) ]), _vm._v(" "), _vm._m(1) ]) ]), _vm._v(" "), _c("li", {
            staticClass: "mdl-list__item mdl-list__item--three-line",
            staticStyle: {
                width: "100%"
            }
        }, [ _c("span", {
            staticClass: "mdl-list__item-primary-content"
        }, [ _c("span", [ _vm._v(_vm._s(_vm.lang("UI_Score")) + " ") ]), _vm._v(" "), _c("span", {
            staticClass: "mdl-list__item-text-body"
        }, [ _c("select", {
            directives: [ {
                name: "model",
                rawName: "v-model",
                value: _vm.malScore,
                expression: "malScore"
            } ],
            staticClass: "inputtext mdl-textfield__input",
            staticStyle: {
                outline: "none"
            },
            attrs: {
                disabled: !this.renderObj,
                name: "myinfo_score",
                id: "myinfo_score"
            },
            on: {
                change: function($event) {
                    var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
                        return o.selected;
                    }).map(function(o) {
                        return "_value" in o ? o._value : o.value;
                    });
                    _vm.malScore = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
                }
            }
        }, [ _c("option", {
            attrs: {
                value: "",
                selected: "selected"
            }
        }, [ _vm._v(_vm._s(_vm.lang("UI_Score_Not_Rated"))) ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "10"
            }
        }, [ _vm._v(_vm._s(_vm.lang("UI_Score_Masterpiece"))) ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "9"
            }
        }, [ _vm._v(_vm._s(_vm.lang("UI_Score_Great"))) ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "8"
            }
        }, [ _vm._v(_vm._s(_vm.lang("UI_Score_VeryGood"))) ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "7"
            }
        }, [ _vm._v(_vm._s(_vm.lang("UI_Score_Good"))) ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "6"
            }
        }, [ _vm._v(_vm._s(_vm.lang("UI_Score_Fine"))) ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "5"
            }
        }, [ _vm._v(_vm._s(_vm.lang("UI_Score_Average"))) ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "4"
            }
        }, [ _vm._v(_vm._s(_vm.lang("UI_Score_Bad"))) ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "3"
            }
        }, [ _vm._v(_vm._s(_vm.lang("UI_Score_VeryBad"))) ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "2"
            }
        }, [ _vm._v(_vm._s(_vm.lang("UI_Score_Horrible"))) ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "1"
            }
        }, [ _vm._v(_vm._s(_vm.lang("UI_Score_Appalling"))) ]) ]) ]) ]) ]), _vm._v(" "), _c("li", {
            staticClass: "mdl-list__item",
            staticStyle: {
                width: "100%"
            }
        }, [ _vm.renderObj && _vm.renderObj.addAnime ? _c("input", {
            staticClass: "inputButton btn-middle flat js-anime-update-button mdl-button mdl-js-button mdl-button--raised mdl-button--accent",
            staticStyle: {
                "margin-right": "5px"
            },
            attrs: {
                type: "button",
                name: "myinfo_submit",
                value: "Add",
                "data-upgraded": ",MaterialButton",
                disabled: !_vm.renderObj
            },
            on: {
                click: function($event) {
                    return _vm.malSync();
                }
            }
        }) : _c("input", {
            staticClass: "inputButton btn-middle flat js-anime-update-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored",
            staticStyle: {
                "margin-right": "5px"
            },
            attrs: {
                type: "button",
                name: "myinfo_submit",
                value: _vm.lang("Update"),
                "data-upgraded": ",MaterialButton",
                disabled: !_vm.renderObj
            },
            on: {
                click: function($event) {
                    return _vm.malSync();
                }
            }
        }), _vm._v(" "), _vm.editUrl && _vm.renderObj ? _c("small", [ _c("a", {
            attrs: {
                href: _vm.editUrl,
                target: "_blank"
            }
        }, [ _vm._v(_vm._s(_vm.lang("overview_EditDetails"))) ]) ]) : _vm._e() ]) ]) ]) ]), _vm._v(" "), _c("div", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: _vm.related.length,
                expression: "related.length"
            } ],
            staticClass: "mdl-grid mdl-grid--no-spacing mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-shadow--4dp related-block alternative-list mdl-grid malClear"
        }, [ _c("ul", {
            staticClass: "mdl-list"
        }, _vm._l(_vm.related, function(relatedType) {
            return _c("li", {
                staticClass: "mdl-list__item mdl-list__item--two-line"
            }, [ _c("span", {
                staticClass: "mdl-list__item-primary-content"
            }, [ _c("span", [ _vm._v("\n              " + _vm._s(relatedType.type) + "\n            ") ]), _vm._v(" "), _c("span", {
                staticClass: "mdl-list__item-sub-title"
            }, _vm._l(relatedType.links, function(link) {
                return _c("div", [ _c("a", {
                    attrs: {
                        href: link.url
                    }
                }, [ _vm._v(_vm._s(link.title)) ]), _vm._v(" "), _c("span", {
                    domProps: {
                        innerHTML: _vm._s(link.statusTag)
                    }
                }) ]);
            }), 0) ]) ]);
        }), 0) ]), _vm._v(" "), _c("div", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: _vm.kiss2mal && Object.keys(_vm.kiss2mal).length,
                expression: "kiss2mal && Object.keys(kiss2mal).length"
            } ],
            staticClass: "mdl-grid mdl-grid--no-spacing mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-shadow--4dp mdl-grid alternative-list stream-block malClear"
        }, [ _c("ul", {
            staticClass: "mdl-list stream-block-inner"
        }, _vm._l(_vm.kiss2mal, function(streams, page) {
            return _c("li", {
                staticClass: "mdl-list__item mdl-list__item--three-line"
            }, [ _c("span", {
                staticClass: "mdl-list__item-primary-content"
            }, [ _c("span", [ _c("img", {
                staticStyle: {
                    "padding-bottom": "3px"
                },
                attrs: {
                    src: _vm.getMal2KissFavicon(streams)
                }
            }), _vm._v("\n              " + _vm._s(page) + "\n            ") ]), _vm._v(" "), _c("span", {
                staticClass: "mdl-list__item-text-body",
                attrs: {
                    id: "KissAnimeLinks"
                }
            }, _vm._l(streams, function(stream) {
                return _c("div", {
                    staticClass: "mal_links"
                }, [ _c("a", {
                    attrs: {
                        target: "_blank",
                        href: stream.url
                    }
                }, [ _vm._v(_vm._s(stream.title)) ]) ]);
            }), 0) ]) ]);
        }), 0) ]), _vm._v(" "), _c("div", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: _vm.characters.length > 0,
                expression: "characters.length > 0"
            } ],
            staticClass: "mdl-grid mdl-grid--no-spacing mdl-cell mdl-cell--12-col mdl-shadow--4dp characters-block mdl-grid malClear"
        }, [ _c("div", {
            staticClass: "mdl-card__actions clicker"
        }, [ _c("h1", {
            staticClass: "mdl-card__title-text",
            staticStyle: {
                float: "left"
            }
        }, [ _vm._v(_vm._s(_vm.lang("overview_Characters"))) ]) ]), _vm._v(" "), _c("div", {
            staticClass: "mdl-grid mdl-card__actions mdl-card--border",
            staticStyle: {
                "justify-content": "space-between"
            },
            attrs: {
                id: "characterList"
            }
        }, [ _vm._l(_vm.characters, function(character) {
            return _c("div", [ _c("div", {
                staticClass: "mdl-grid",
                staticStyle: {
                    width: "126px"
                }
            }, [ _c("clazy-load", {
                staticStyle: {
                    width: "100%",
                    height: "auto"
                },
                attrs: {
                    src: character.img,
                    margin: "200px 0px",
                    threshold: .1,
                    ratio: .1
                }
            }, [ _c("img", {
                staticStyle: {
                    height: "auto",
                    width: "100%"
                },
                attrs: {
                    src: character.img
                }
            }) ]), _vm._v(" "), _c("div", {
                domProps: {
                    innerHTML: _vm._s(character.html)
                }
            }) ], 1) ]);
        }), _vm._v(" "), _vm._l(10, function(n) {
            return _c("div", {
                staticClass: "listPlaceholder",
                staticStyle: {
                    height: "0"
                }
            }, [ _c("div", {
                staticClass: "mdl-grid",
                staticStyle: {
                    width: "126px"
                }
            }) ]);
        }) ], 2) ]), _vm._v(" "), _vm.openingSongs.length || _vm.endingSongs.length ? _c("div", {
            staticClass: "mdl-grid mdl-cell mdl-cell--12-col mdl-shadow--4dp info-block mdl-grid malClear"
        }, [ _vm.openingSongs.length ? _c("li", {
            staticClass: "mdl-list__item mdl-list__item--three-line mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet",
            staticStyle: {
                padding: "0",
                height: "auto"
            }
        }, [ _c("span", {
            staticClass: "mdl-list__item-primary-content",
            staticStyle: {
                height: "auto"
            }
        }, [ _c("span", [ _vm._v(_vm._s(_vm.lang("overview_OpeningTheme"))) ]), _vm._v(" "), _c("span", {
            staticClass: "mdl-list__item-text-body",
            staticStyle: {
                height: "auto"
            }
        }, _vm._l(_vm.openingSongs, function(openingSong) {
            return _c("span", {
                staticStyle: {
                    display: "block",
                    color: "rgb(255,64,129)"
                }
            }, [ _vm._v("\n                " + _vm._s(openingSong) + "\n              ") ]);
        }), 0) ]) ]) : _vm._e(), _vm._v(" "), _vm.endingSongs.length ? _c("li", {
            staticClass: "mdl-list__item mdl-list__item--three-line mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet",
            staticStyle: {
                padding: "0",
                height: "auto"
            }
        }, [ _c("span", {
            staticClass: "mdl-list__item-primary-content",
            staticStyle: {
                height: "auto"
            }
        }, [ _c("span", [ _vm._v(_vm._s(_vm.lang("overview_EndingTheme"))) ]), _vm._v(" "), _c("span", {
            staticClass: "mdl-list__item-text-body",
            staticStyle: {
                height: "auto"
            }
        }, _vm._l(_vm.endingSongs, function(endingSong) {
            return _c("span", {
                staticStyle: {
                    display: "block",
                    color: "rgb(255,64,129)"
                }
            }, [ _vm._v("\n                " + _vm._s(endingSong) + "\n              ") ]);
        }), 0) ]) ]) : _vm._e() ]) : _vm._e(), _vm._v(" "), _c("div", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: _vm.info,
                expression: "info"
            } ],
            staticClass: "mdl-grid mdl-grid--no-spacing mdl-cell mdl-cell--12-col mdl-shadow--4dp info-block mdl-grid malClear",
            domProps: {
                innerHTML: _vm._s(_vm.info)
            }
        }) ]) : _vm._e() ]);
    };
    render._withStripped = !0;
    var minimalApp_overviewvue_type_script_lang_js_ = __webpack_require__(21).a, componentNormalizer = __webpack_require__(4), component = Object(componentNormalizer.a)(minimalApp_overviewvue_type_script_lang_js_, render, [ function() {
        var _h = this.$createElement, _c = this._self._c || _h;
        return _c("a", {
            staticClass: "js-anime-increment-episode-button",
            attrs: {
                href: "javascript:void(0)",
                target: "_blank"
            }
        }, [ _c("i", {
            staticClass: "fa fa-plus-circle ml4"
        }) ]);
    }, function() {
        var _h = this.$createElement, _c = this._self._c || _h;
        return _c("a", {
            staticClass: "js-anime-increment-episode-button",
            attrs: {
                href: "javascript:void(0)",
                target: "_blank"
            }
        }, [ _c("i", {
            staticClass: "fa fa-plus-circle ml4"
        }) ]);
    } ], !1, null, null, null);
    component.options.__file = "src/minimal/minimalApp/overview.vue";
    __webpack_exports__.a = component.exports;
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var render = function() {
        var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
        return _c("div", [ _c("div", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: _vm.loading,
                expression: "loading"
            } ],
            staticClass: "mdl-progress mdl-js-progress mdl-progress__indeterminate",
            staticStyle: {
                width: "100%",
                position: "absolute"
            },
            attrs: {
                id: "loadMalSearchPop"
            }
        }), _vm._v(" "), _vm._t("default"), _vm._v(" "), _vm.loading || _vm.items.length ? _vm._e() : _c("span", {
            staticClass: "mdl-chip",
            staticStyle: {
                margin: "auto",
                "margin-top": "16px",
                display: "table"
            }
        }, [ _c("span", {
            staticClass: "mdl-chip__text"
        }, [ _vm._v(_vm._s(_vm.lang("NoEntries"))) ]) ]), _vm._v(" "), _c("div", {
            staticClass: "mdl-grid",
            staticStyle: {
                "justify-content": "space-around"
            },
            attrs: {
                id: "malList"
            }
        }, [ _vm._l(_vm.items, function(item) {
            return [ _c("bookmarksItem", {
                key: item.uid,
                ref: item.uid,
                refInFor: !0,
                attrs: {
                    item: item
                }
            }) ];
        }), _vm._v(" "), _vm._l(10, function(n) {
            return _c("div", {
                staticClass: "listPlaceholder mdl-cell mdl-cell--2-col mdl-cell--4-col-tablet mdl-cell--6-col-phone mdl-shadow--2dp mdl-grid ",
                staticStyle: {
                    cursor: "pointer",
                    height: "0px",
                    padding: "0",
                    width: "210px",
                    "margin-top": "0",
                    "margin-bottom": "0",
                    visibility: "hidden"
                }
            });
        }) ], 2) ], 2);
    };
    render._withStripped = !0;
    var minimalApp_bookmarksvue_type_script_lang_js_ = __webpack_require__(23).a, componentNormalizer = __webpack_require__(4), component = Object(componentNormalizer.a)(minimalApp_bookmarksvue_type_script_lang_js_, render, [], !1, null, null, null);
    component.options.__file = "src/minimal/minimalApp/bookmarks.vue";
    __webpack_exports__.a = component.exports;
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var render = function() {
        var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
        return _c("div", {
            class: {
                "pop-over": !_vm.navigation
            },
            staticStyle: {
                height: "100%"
            },
            attrs: {
                id: "material"
            }
        }, [ _c("div", {
            staticClass: "mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-tabs"
        }, [ _c("header", {
            staticClass: "mdl-layout__header",
            staticStyle: {
                "min-height": "0"
            }
        }, [ _c("button", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: _vm.backbutton,
                expression: "backbutton"
            } ],
            staticClass: "mdl-layout__drawer-button",
            staticStyle: {
                display: "none"
            },
            attrs: {
                id: "backbutton"
            },
            on: {
                click: function($event) {
                    return _vm.backbuttonClick();
                }
            }
        }, [ _c("i", {
            staticClass: "material-icons"
        }, [ _vm._v("arrow_back") ]) ]), _vm._v(" "), _c("div", {
            staticClass: "mdl-layout__header-row"
        }, [ _c("button", {
            staticClass: "mdl-button mdl-js-button mdl-button--icon mdl-layout__drawer-button",
            style: _vm.backbuttonBookStyle,
            attrs: {
                id: "book"
            },
            on: {
                click: function($event) {
                    return _vm.bookClick();
                }
            }
        }, [ _c("i", {
            staticClass: "material-icons md-48 bookIcon"
        }, [ _vm._v(_vm._s(_vm.bookIcon)) ]) ]), _vm._v(" "), _c("div", {
            staticClass: "mdl-textfield mdl-js-textfield mdl-textfield--expandable",
            class: {
                "is-dirty": _vm.currentTab == _vm.tabs.search.title
            },
            staticStyle: {
                "margin-left": "-57px",
                "margin-top": "3px",
                "padding-left": "40px"
            },
            style: _vm.backbuttonSearchStyle,
            attrs: {
                id: "SearchButton"
            }
        }, [ _vm._m(0), _vm._v(" "), _c("div", {
            staticClass: "mdl-textfield__expandable-holder"
        }, [ _c("input", {
            directives: [ {
                name: "model",
                rawName: "v-model",
                value: _vm.keyword,
                expression: "keyword"
            } ],
            staticClass: "mdl-textfield__input",
            attrs: {
                type: "text",
                id: "headMalSearch"
            },
            domProps: {
                value: _vm.keyword
            },
            on: {
                keyup: function($event) {
                    return _vm.keywordSet();
                },
                input: function($event) {
                    $event.target.composing || (_vm.keyword = $event.target.value);
                }
            }
        }), _vm._v(" "), _c("label", {
            staticClass: "mdl-textfield__label",
            attrs: {
                for: "headMalSearch"
            }
        }) ]) ]), _vm._v(" "), _vm._m(1), _vm._v(" "), _vm._m(2) ]), _vm._v(" "), _c("div", {
            staticClass: "mdl-layout__tab-bar mdl-js-ripple-effect"
        }, [ _c("a", {
            staticClass: "mdl-layout__tab",
            class: {
                "is-active": _vm.currentTab == _vm.tabs.overview.title
            },
            on: {
                click: function($event) {
                    return _vm.selectTab(_vm.tabs.overview.title);
                }
            }
        }, [ _vm._v(_vm._s(_vm.lang("minimalApp_Overview"))) ]), _vm._v(" "), _c("a", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: _vm.showReviewAndRecom,
                expression: "showReviewAndRecom"
            } ],
            staticClass: "mdl-layout__tab reviewsTab",
            class: {
                "is-active": _vm.currentTab == _vm.tabs.reviews.title
            },
            on: {
                click: function($event) {
                    return _vm.selectTab(_vm.tabs.reviews.title);
                }
            }
        }, [ _vm._v(_vm._s(_vm.lang("minimalApp_Reviews"))) ]), _vm._v(" "), _c("a", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: _vm.showReviewAndRecom,
                expression: "showReviewAndRecom"
            } ],
            staticClass: "mdl-layout__tab recommendationTab",
            class: {
                "is-active": _vm.currentTab == _vm.tabs.recommendations.title
            },
            on: {
                click: function($event) {
                    return _vm.selectTab(_vm.tabs.recommendations.title);
                }
            }
        }, [ _vm._v(_vm._s(_vm.lang("minimalApp_Recommendations"))) ]), _vm._v(" "), _c("a", {
            staticClass: "mdl-layout__tab settingsTab",
            class: {
                "is-active": _vm.currentTab == _vm.tabs.settings.title
            },
            on: {
                click: function($event) {
                    return _vm.selectTab(_vm.tabs.settings.title);
                }
            }
        }, [ _vm._v(_vm._s(_vm.lang("minimalApp_Settings"))) ]) ]) ]), _vm._v(" "), _c("main", {
            staticClass: "mdl-layout__content",
            staticStyle: {
                height: "100%"
            }
        }, [ _c("section", {
            staticClass: "mdl-layout__tab-panel",
            class: {
                "is-active": _vm.currentTab == _vm.tabs.overview.title
            },
            attrs: {
                id: "fixed-tab-1"
            }
        }, [ _c("overviewVue", {
            attrs: {
                renderObj: _vm.renderObj
            }
        }) ], 1), _vm._v(" "), _c("section", {
            staticClass: "mdl-layout__tab-panel",
            class: {
                "is-active": _vm.currentTab == _vm.tabs.reviews.title
            },
            attrs: {
                id: "fixed-tab-2"
            }
        }, [ _c("reviewsVue", {
            attrs: {
                url: _vm.renderMalUrl,
                state: _vm.currentTab == _vm.tabs.reviews.title
            }
        }) ], 1), _vm._v(" "), _c("section", {
            staticClass: "mdl-layout__tab-panel",
            class: {
                "is-active": _vm.currentTab == _vm.tabs.recommendations.title
            },
            attrs: {
                id: "fixed-tab-3"
            }
        }, [ _c("recommendationsVue", {
            attrs: {
                url: _vm.renderMalUrl,
                state: _vm.currentTab == _vm.tabs.recommendations.title
            }
        }) ], 1), _vm._v(" "), _c("section", {
            staticClass: "mdl-layout__tab-panel",
            class: {
                "is-active": _vm.popOver
            },
            attrs: {
                id: "fixed-tab-4"
            }
        }, [ _c("keep-alive", [ _vm.currentTab == _vm.tabs.bookmarks.title ? _c("bookmarksVue", {
            attrs: {
                state: _vm.tabs.bookmarks.state,
                listType: _vm.tabs.bookmarks.type
            }
        }, [ _c("div", {
            staticClass: "mdl-grid",
            staticStyle: {
                "justify-content": "space-around"
            },
            attrs: {
                id: "malList"
            }
        }, [ _c("select", {
            directives: [ {
                name: "model",
                rawName: "v-model",
                value: _vm.tabs.bookmarks.type,
                expression: "tabs.bookmarks.type"
            } ],
            staticClass: "inputtext mdl-textfield__input mdl-cell mdl-cell--12-col",
            staticStyle: {
                outline: "none",
                "background-color": "white",
                border: "none"
            },
            attrs: {
                name: "myinfo_score",
                id: "userListType"
            },
            on: {
                change: function($event) {
                    var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
                        return o.selected;
                    }).map(function(o) {
                        return "_value" in o ? o._value : o.value;
                    });
                    _vm.$set(_vm.tabs.bookmarks, "type", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
                }
            }
        }, [ _c("option", {
            attrs: {
                value: "anime"
            }
        }, [ _vm._v("Anime") ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "manga"
            }
        }, [ _vm._v("Manga") ]) ]), _vm._v(" "), _c("select", {
            directives: [ {
                name: "model",
                rawName: "v-model",
                value: _vm.tabs.bookmarks.state,
                expression: "tabs.bookmarks.state"
            } ],
            staticClass: "inputtext mdl-textfield__input mdl-cell mdl-cell--12-col",
            staticStyle: {
                outline: "none",
                "background-color": "white",
                border: "none"
            },
            attrs: {
                name: "myinfo_score",
                id: "userListState"
            },
            on: {
                change: function($event) {
                    var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
                        return o.selected;
                    }).map(function(o) {
                        return "_value" in o ? o._value : o.value;
                    });
                    _vm.$set(_vm.tabs.bookmarks, "state", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
                }
            }
        }, [ _c("option", {
            attrs: {
                value: "7"
            }
        }, [ _vm._v(_vm._s(_vm.lang("All"))) ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "1",
                selected: ""
            }
        }, [ _vm._v(_vm._s(_vm.lang("UI_Status_watching_" + _vm.tabs.bookmarks.type))) ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "2"
            }
        }, [ _vm._v(_vm._s(_vm.lang("UI_Status_Completed"))) ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "3"
            }
        }, [ _vm._v(_vm._s(_vm.lang("UI_Status_OnHold"))) ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "4"
            }
        }, [ _vm._v(_vm._s(_vm.lang("UI_Status_Dropped"))) ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "6"
            }
        }, [ _vm._v(_vm._s(_vm.lang("UI_Status_planTo_" + _vm.tabs.bookmarks.type))) ]) ]) ]) ]) : _vm._e(), _vm._v(" "), _vm.currentTab == _vm.tabs.search.title ? _c("searchVue", {
            attrs: {
                keyword: _vm.tabs.search.keyword,
                type: _vm.tabs.search.type
            }
        }, [ _c("div", {
            staticClass: "mdl-grid",
            staticStyle: {
                "justify-content": "space-around"
            }
        }, [ _c("select", {
            directives: [ {
                name: "model",
                rawName: "v-model",
                value: _vm.tabs.search.type,
                expression: "tabs.search.type"
            } ],
            staticClass: "inputtext mdl-textfield__input mdl-cell mdl-cell--12-col",
            staticStyle: {
                outline: "none",
                "background-color": "white",
                border: "none"
            },
            attrs: {
                name: "myinfo_score",
                id: "userListType"
            },
            on: {
                change: function($event) {
                    var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
                        return o.selected;
                    }).map(function(o) {
                        return "_value" in o ? o._value : o.value;
                    });
                    _vm.$set(_vm.tabs.search, "type", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
                }
            }
        }, [ _c("option", {
            attrs: {
                value: "anime"
            }
        }, [ _vm._v("Anime") ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "manga"
            }
        }, [ _vm._v("Manga") ]) ]) ]) ]) : _vm._e() ], 1), _vm._v(" "), _vm.currentTab == _vm.tabs.updateCheck.title ? _c("updateCheckVue") : _vm._e() ], 1), _vm._v(" "), _c("section", {
            staticClass: "mdl-layout__tab-panel",
            class: {
                "is-active": _vm.currentTab == _vm.tabs.settings.title
            },
            attrs: {
                id: "fixed-tab-5"
            }
        }, [ _c("div", {
            staticClass: "page-content malClear",
            attrs: {
                id: "malConfig"
            }
        }, [ _c("settingsVue", {
            attrs: {
                page: _vm.page
            }
        }) ], 1) ]) ]) ]) ]);
    };
    render._withStripped = !0;
    var minimal_minimalAppvue_type_script_lang_js_ = __webpack_require__(14).a, componentNormalizer = __webpack_require__(4), component = Object(componentNormalizer.a)(minimal_minimalAppvue_type_script_lang_js_, render, [ function() {
        var _h = this.$createElement, _c = this._self._c || _h;
        return _c("label", {
            staticClass: "mdl-button mdl-js-button mdl-button--icon",
            attrs: {
                for: "headMalSearch"
            }
        }, [ _c("i", {
            staticClass: "material-icons"
        }, [ this._v("search") ]) ]);
    }, function() {
        var _h = this.$createElement, _c = this._self._c || _h;
        return _c("button", {
            staticClass: "mdl-button mdl-js-button mdl-button--icon mdl-layout__drawer-button",
            staticStyle: {
                left: "initial",
                right: "40px"
            },
            attrs: {
                id: "material-fullscreen"
            }
        }, [ _c("i", {
            staticClass: "material-icons md-48"
        }, [ this._v("fullscreen") ]) ]);
    }, function() {
        var _h = this.$createElement, _c = this._self._c || _h;
        return _c("button", {
            staticClass: "mdl-button mdl-js-button mdl-button--icon mdl-layout__drawer-button",
            staticStyle: {
                left: "initial",
                right: "0"
            },
            attrs: {
                id: "close-info-popup"
            }
        }, [ _c("i", {
            staticClass: "material-icons close"
        }, [ this._v("close") ]) ]);
    } ], !1, null, null, null);
    component.options.__file = "src/minimal/minimalApp.vue";
    __webpack_exports__.a = component.exports;
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var render = function() {
        var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
        return _c("div", [ _c("button", {
            staticClass: "mdl-button mdl-js-button mdl-button--primary refresh-updateCheck",
            on: {
                click: function($event) {
                    return _vm.load();
                }
            }
        }, [ _vm._v("\n    " + _vm._s(_vm.lang("updateCheck_Refresh")) + "\n  ") ]), _vm._v(" "), _c("button", {
            staticClass: "mdl-button mdl-js-button mdl-button--accent startCheck-updateCheck",
            on: {
                click: function($event) {
                    return _vm.startCheck();
                }
            }
        }, [ _vm._v("\n    " + _vm._s(_vm.lang("updateCheck_StartCheck")) + "\n  ") ]), _vm._v(" "), _c("button", {
            staticClass: "mdl-button mdl-js-button mdl-button--accent notification-updateCheck",
            on: {
                click: function($event) {
                    return _vm.notificationTest();
                }
            }
        }, [ _vm._v("\n    " + _vm._s(_vm.lang("updateCheck_NotificationCheck")) + "\n  ") ]), _vm._v(" "), _c("select", {
            directives: [ {
                name: "model",
                rawName: "v-model",
                value: _vm.listType,
                expression: "listType"
            } ],
            staticClass: "typeSelect-updateCheck",
            staticStyle: {
                float: "right"
            },
            on: {
                change: function($event) {
                    var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
                        return o.selected;
                    }).map(function(o) {
                        return "_value" in o ? o._value : o.value;
                    });
                    _vm.listType = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
                }
            }
        }, [ _c("option", {
            attrs: {
                value: "anime"
            }
        }, [ _vm._v("Anime") ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "manga"
            }
        }, [ _vm._v("Manga") ]) ]), _vm._v(" "), _c("table", {
            staticClass: "mdl-data-table mdl-js-data-table mdl-data-table__cell--non-numeric mdl-shadow--2dp"
        }, [ _c("tr", [ _c("th", {
            staticClass: "mdl-data-table__cell--non-numeric"
        }), _vm._v(" "), _c("th", [ _vm._v(_vm._s(_vm.lang("updateCheck_Episode"))) ]), _vm._v(" "), _c("th", [ _vm._v(_vm._s(_vm.lang("updateCheck_Message"))) ]) ]), _vm._v(" "), _vm._l(_vm.items, function(item) {
            return _c("tr", {
                key: item.id,
                style: {
                    backgroundColor: item.trColor
                }
            }, [ _c("th", {
                staticClass: "mdl-data-table__cell--non-numeric"
            }, [ _c("button", {
                staticClass: "mdl-button mdl-js-button mdl-button--icon delete-updateCheck",
                on: {
                    click: function($event) {
                        return _vm.deleteItem(item);
                    }
                }
            }, [ _c("i", {
                staticClass: "material-icons"
            }, [ _vm._v("delete") ]) ]), _vm._v(" "), _c("a", {
                staticStyle: {
                    color: "black"
                },
                attrs: {
                    href: item.url
                }
            }, [ _vm._v("\n          " + _vm._s(item.title) + "\n        ") ]) ]), _vm._v(" "), _c("th", [ _vm._v(_vm._s(item.episode)) ]), _vm._v(" "), _c("th", [ _vm._v(_vm._s(item.error)) ]) ]);
        }) ], 2), _vm._v(" "), _c("div", {
            staticClass: "history"
        }, [ _c("h3", [ _vm._v(_vm._s(_vm.lang("updateCheck_NotificationHistory"))) ]), _vm._v(" "), _vm._l(_vm.history, function(historyItem) {
            return _c("a", {
                key: historyItem.id,
                staticClass: "mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet mdl-shadow--2dp mdl-grid",
                staticStyle: {
                    "text-decoration": "none !important",
                    color: "black"
                },
                attrs: {
                    href: historyItem.url
                }
            }, [ _c("img", {
                staticStyle: {
                    margin: "-8px 0px -8px -8px",
                    height: "100px",
                    width: "64px",
                    "background-color": "grey"
                },
                attrs: {
                    src: historyItem.iconUrl
                }
            }), _vm._v(" "), _c("div", {
                staticClass: "mdl-cell",
                staticStyle: {
                    "flex-grow": "100",
                    cursor: "pointer",
                    "margin-top": "0",
                    "margin-bottom": "0"
                }
            }, [ _c("span", {
                staticStyle: {
                    "font-size": "20px",
                    "font-weight": "400",
                    "line-height": "1"
                }
            }, [ _vm._v(_vm._s(historyItem.title)) ]), _vm._v(" "), _c("p", {
                staticStyle: {
                    "margin-bottom": "0",
                    "line-height": "20px",
                    "padding-top": "3px"
                }
            }, [ _vm._v(_vm._s(historyItem.message)) ]), _vm._v(" "), _c("p", {
                staticStyle: {
                    "margin-bottom": "0",
                    "line-height": "20px"
                }
            }, [ _vm._v(_vm._s(historyItem.timeDiff)) ]) ]) ]);
        }) ], 2) ]);
    };
    render._withStripped = !0;
    var minimalApp_updateCheckvue_type_script_lang_js_ = __webpack_require__(24).a, componentNormalizer = __webpack_require__(4), component = Object(componentNormalizer.a)(minimalApp_updateCheckvue_type_script_lang_js_, render, [], !1, null, null, null);
    component.options.__file = "src/minimal/minimalApp/updateCheck.vue";
    __webpack_exports__.a = component.exports;
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var render = function() {
        var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
        return _c("div", {
            staticClass: "mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet mdl-shadow--4dp",
            style: _vm.wrong ? "border: 1px solid red;" : ""
        }, [ _c("div", {
            staticClass: "mdl-card__title mdl-card--border"
        }, [ _c("h2", {
            staticClass: "mdl-card__title-text"
        }, [ _vm._v("\n        " + _vm._s(_vm.title) + "\n      ") ]), _vm._v(" "), _c("a", {
            staticStyle: {
                "margin-left": "auto"
            },
            attrs: {
                href: "https://github.com/lolamtisch/MALSync/wiki/Troubleshooting"
            }
        }, [ _vm._v(_vm._s(_vm.lang("Help"))) ]) ]), _vm._v(" "), _c("div", {
            staticClass: "mdl-list__item"
        }, [ _c("div", {
            staticClass: "mdl-textfield mdl-js-textfield mdl-textfield--floating-label",
            staticStyle: {
                width: "100%"
            }
        }, [ _c("input", {
            directives: [ {
                name: "model",
                rawName: "v-model",
                value: _vm.offset,
                expression: "offset"
            } ],
            staticClass: "mdl-textfield__input",
            staticStyle: {
                "padding-right": "18px"
            },
            attrs: {
                type: "number",
                step: "1",
                id: "malOffset"
            },
            domProps: {
                value: _vm.offset
            },
            on: {
                input: function($event) {
                    $event.target.composing || (_vm.offset = $event.target.value);
                }
            }
        }), _vm._v(" "), _c("label", {
            staticClass: "mdl-textfield__label",
            attrs: {
                for: "malOffset"
            }
        }, [ _vm._v(_vm._s(_vm.lang("correction_Offset"))) ]) ]), _vm._v(" "), _c("tooltip", {
            staticStyle: {
                float: "right",
                "margin-bottom": "-17px"
            },
            attrs: {
                direction: "left"
            }
        }, [ _vm._v("\n        " + _vm._s(_vm.lang("correction_Offset_text")) + "\n      ") ]) ], 1), _vm._v(" "), _c("div", {
            staticClass: "mdl-list__item",
            staticStyle: {
                "padding-bottom": "0",
                "padding-top": "0"
            }
        }, [ _c("div", {
            staticClass: "mdl-textfield mdl-js-textfield mdl-textfield--floating-label",
            staticStyle: {
                width: "100%"
            }
        }, [ _c("input", {
            directives: [ {
                name: "model",
                rawName: "v-model",
                value: _vm.malUrl,
                expression: "malUrl"
            } ],
            staticClass: "mdl-textfield__input",
            staticStyle: {
                "padding-right": "18px"
            },
            attrs: {
                type: "text",
                id: "malUrlInput"
            },
            domProps: {
                value: _vm.malUrl
            },
            on: {
                input: function($event) {
                    $event.target.composing || (_vm.malUrl = $event.target.value);
                }
            }
        }), _vm._v(" "), _c("label", {
            staticClass: "mdl-textfield__label",
            staticStyle: {
                color: "rgb(63,81,181)",
                "font-size": "12px",
                top: "4px",
                visibility: "visible"
            },
            attrs: {
                for: "malUrlInput"
            }
        }, [ _vm._v("MyAnimeList"), "MAL" !== _vm.options.syncMode ? _c("span", {
            staticStyle: {
                "text-transform": "lowercase"
            }
        }, [ _vm._v("/" + _vm._s(_vm.options.syncMode)) ]) : _vm._e(), _vm._v(" Url") ]) ]), _vm._v(" "), _c("tooltip", {
            staticStyle: {
                float: "right",
                "margin-bottom": "-17px"
            },
            attrs: {
                direction: "left"
            }
        }, [ _vm._v("\n        " + _vm._s(_vm.lang("correction_WrongUrl")) + "\n      ") ]) ], 1), _vm._v(" "), _c("div", {
            staticClass: "mdl-list__item",
            staticStyle: {
                "padding-bottom": "0",
                "padding-top": "0"
            }
        }, [ _c("div", {
            staticClass: "mdl-textfield mdl-js-textfield mdl-textfield--floating-label",
            staticStyle: {
                width: "100%"
            }
        }, [ _c("label", {
            staticClass: "mdl-textfield__label",
            attrs: {
                for: "malSearch"
            }
        }, [ _vm._v("\n          " + _vm._s(_vm.lang("correction_Search")) + "\n        ") ]), _vm._v(" "), _c("input", {
            directives: [ {
                name: "model",
                rawName: "v-model",
                value: _vm.searchKeyword,
                expression: "searchKeyword"
            } ],
            staticClass: "mdl-textfield__input",
            staticStyle: {
                "padding-right": "18px"
            },
            attrs: {
                type: "text",
                id: "malSearch"
            },
            domProps: {
                value: _vm.searchKeyword
            },
            on: {
                input: function($event) {
                    $event.target.composing || (_vm.searchKeyword = $event.target.value);
                }
            }
        }) ]), _vm._v(" "), _c("tooltip", {
            staticStyle: {
                float: "right",
                "margin-bottom": "-17px"
            },
            attrs: {
                direction: "left"
            }
        }, [ _c("span", {
            domProps: {
                innerHTML: _vm._s(_vm.lang("correction_Search_text"))
            }
        }) ]) ], 1), _vm._v(" "), _vm._m(0), _vm._v(" "), _c("div", {
            staticClass: "mdl-list__item"
        }, [ _c("button", {
            staticClass: "mdl-button mdl-js-button mdl-button--raised mdl-button--colored",
            attrs: {
                id: "malSubmit"
            },
            on: {
                click: function($event) {
                    return _vm.update();
                }
            }
        }, [ _vm._v(_vm._s(_vm.lang("Update"))) ]), _vm._v(" "), _c("button", {
            staticClass: "mdl-button mdl-js-button mdl-button--raised mdl-button--accent",
            staticStyle: {
                "margin-left": "5px"
            },
            attrs: {
                id: "malReset"
            },
            on: {
                click: function($event) {
                    return _vm.reset();
                }
            }
        }, [ _vm._v(_vm._s(_vm.lang("Reset"))) ]), _vm._v(" "), _c("button", {
            staticClass: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect",
            staticStyle: {
                "margin-left": "auto",
                float: "right"
            },
            attrs: {
                id: "malNotOnMal",
                title: _vm.lang("correction_NoMal")
            },
            on: {
                click: function($event) {
                    return _vm.noMal();
                }
            }
        }, [ _vm._v("No MAL") ]) ]), _vm._v(" "), _c("searchVue", {
            directives: [ {
                name: "show",
                rawName: "v-show",
                value: _vm.searchKeyword,
                expression: "searchKeyword"
            } ],
            attrs: {
                keyword: _vm.searchKeyword,
                type: _vm.searchType
            }
        }, [ _c("div", {
            staticClass: "mdl-grid",
            staticStyle: {
                "justify-content": "space-around"
            }
        }, [ _c("select", {
            directives: [ {
                name: "model",
                rawName: "v-model",
                value: _vm.searchType,
                expression: "searchType"
            } ],
            staticClass: "inputtext mdl-textfield__input mdl-cell mdl-cell--12-col",
            staticStyle: {
                outline: "none",
                "background-color": "white",
                border: "none"
            },
            attrs: {
                name: "myinfo_score",
                id: "userListType"
            },
            on: {
                change: function($event) {
                    var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
                        return o.selected;
                    }).map(function(o) {
                        return "_value" in o ? o._value : o.value;
                    });
                    _vm.searchType = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
                }
            }
        }, [ _c("option", {
            attrs: {
                value: "anime"
            }
        }, [ _vm._v("Anime") ]), _vm._v(" "), _c("option", {
            attrs: {
                value: "manga"
            }
        }, [ _vm._v("Manga") ]) ]), _vm._v(" "), _c("a", {
            staticClass: "mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet mdl-shadow--2dp mdl-grid searchItem nojs",
            staticStyle: {
                cursor: "pointer"
            },
            attrs: {
                href: ""
            }
        }, [ _c("div", {
            staticStyle: {
                margin: "-8px 0px -8px -8px",
                height: "100px",
                width: "64px",
                "background-color": "grey"
            }
        }), _vm._v(" "), _c("div", {
            staticClass: "mdl-cell",
            staticStyle: {
                "flex-grow": "100",
                cursor: "pointer",
                "margin-top": "0",
                "margin-bottom": "0"
            }
        }, [ _c("span", {
            staticStyle: {
                "font-size": "20px",
                "font-weight": "400",
                "line-height": "1"
            }
        }, [ _vm._v("\n            " + _vm._s(_vm.lang("correction_NoEntry"))) ]), _vm._v(" "), _c("p", {
            staticStyle: {
                "margin-bottom": "0",
                "line-height": "20px",
                "padding-top": "3px"
            }
        }, [ _vm._v("\n            " + _vm._s(_vm.lang("correction_NoMal"))) ]) ]) ]) ]) ]) ], 1);
    };
    render._withStripped = !0;
    var minimalApp_correctionvue_type_script_lang_js_ = __webpack_require__(18).a, componentNormalizer = __webpack_require__(4), component = Object(componentNormalizer.a)(minimalApp_correctionvue_type_script_lang_js_, render, [ function() {
        var _h = this.$createElement, _c = this._self._c || _h;
        return _c("div", {
            staticClass: "mdl-list__item",
            staticStyle: {
                "min-height": "0",
                "padding-bottom": "0",
                "padding-top": "0"
            }
        }, [ _c("div", {
            staticClass: "malResults",
            attrs: {
                id: "malSearchResults"
            }
        }) ]);
    } ], !1, null, null, null);
    component.options.__file = "src/minimal/minimalApp/correction.vue";
    __webpack_exports__.a = component.exports;
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var render = function() {
        var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
        return _c("li", {
            staticClass: "mdl-list__item"
        }, [ _c("span", {
            staticClass: "mdl-list__item-primary-content"
        }, [ _vm._t("default") ], 2), _vm._v(" "), _c("span", {
            staticClass: "mdl-list__item-secondary-action"
        }, [ _c("label", {
            staticClass: "mdl-switch mdl-js-switch mdl-js-ripple-effect",
            attrs: {
                for: _vm.option
            }
        }, [ _c("input", {
            directives: [ {
                name: "model",
                rawName: "v-model",
                value: _vm.value,
                expression: "value"
            } ],
            staticClass: "mdl-switch__input",
            attrs: {
                type: "checkbox",
                id: _vm.option
            },
            domProps: {
                checked: Array.isArray(_vm.value) ? _vm._i(_vm.value, null) > -1 : _vm.value
            },
            on: {
                change: function($event) {
                    var $$a = _vm.value, $$el = $event.target, $$c = !!$$el.checked;
                    if (Array.isArray($$a)) {
                        var $$i = _vm._i($$a, null);
                        $$el.checked ? $$i < 0 && (_vm.value = $$a.concat([ null ])) : $$i > -1 && (_vm.value = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
                    } else _vm.value = $$c;
                }
            }
        }) ]) ]) ]);
    };
    render._withStripped = !0;
    var components_settingsCheckboxvue_type_script_lang_js_ = __webpack_require__(16).a, componentNormalizer = __webpack_require__(4), component = Object(componentNormalizer.a)(components_settingsCheckboxvue_type_script_lang_js_, render, [], !1, null, null, null);
    component.options.__file = "src/minimal/minimalApp/components/settingsCheckbox.vue";
    __webpack_exports__.a = component.exports;
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var render = function() {
        var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
        return _c("li", {
            staticClass: "mdl-list__item"
        }, [ _c("span", {
            staticClass: "mdl-list__item-primary-content"
        }, [ _vm._t("default") ], 2), _vm._v(" "), _c("span", {
            staticClass: "mdl-list__item-secondary-action"
        }, [ _c("div", {
            staticClass: "mdl-textfield mdl-js-textfield",
            staticStyle: {
                "min-width": "35px",
                "max-width": "35px",
                width: "100%",
                padding: "0"
            }
        }, [ _c("input", {
            directives: [ {
                name: "model",
                rawName: "v-model",
                value: _vm.value,
                expression: "value"
            } ],
            staticClass: "mdl-textfield__input",
            staticStyle: {
                "text-align": "center"
            },
            attrs: {
                type: "number",
                step: _vm.step,
                min: _vm.min,
                max: _vm.max,
                id: _vm.option
            },
            domProps: {
                value: _vm.value
            },
            on: {
                input: function($event) {
                    $event.target.composing || (_vm.value = $event.target.value);
                }
            }
        }) ]) ]) ]);
    };
    render._withStripped = !0;
    var components_settingsNumberInputvue_type_script_lang_js_ = __webpack_require__(17).a, componentNormalizer = __webpack_require__(4), component = Object(componentNormalizer.a)(components_settingsNumberInputvue_type_script_lang_js_, render, [], !1, null, null, null);
    component.options.__file = "src/minimal/minimalApp/components/settingsNumberInput.vue";
    __webpack_exports__.a = component.exports;
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), function(con, api, j) {
        var _pages_syncPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38), _myanimelist_myanimelistClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(63), _anilist_anilistClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(64), _kitsu_kitsuClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(65), _utils_scheduler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(66), _utils_firebaseNotification__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(67), _utils_player__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(30), __awaiter = function(thisArg, _arguments, P, generator) {
            return new (P || (P = Promise))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator.throw(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : new P(function(resolve) {
                        resolve(result.value);
                    }).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        };
        function main() {
            if (window.location.href.indexOf("myanimelist.net") > -1) new _myanimelist_myanimelistClass__WEBPACK_IMPORTED_MODULE_1__.a(window.location.href).init(); else if (window.location.href.indexOf("anilist.co") > -1) new _anilist_anilistClass__WEBPACK_IMPORTED_MODULE_2__.a(window.location.href); else if (window.location.href.indexOf("kitsu.io") > -1) new _kitsu_kitsuClass__WEBPACK_IMPORTED_MODULE_3__.a(window.location.href); else {
                try {
                    if (function() {
                        try {
                            return window.self !== window.top;
                        } catch (e) {
                            return !0;
                        }
                    }()) throw "iframe";
                    var page = new _pages_syncPage__WEBPACK_IMPORTED_MODULE_0__.a(window.location.href);
                } catch (e) {
                    return con.info(e), void Object(_utils_player__WEBPACK_IMPORTED_MODULE_6__.a)(function(item) {
                        api.storage.set("iframePlayer", item);
                    });
                }
                page.init(), api.storage.set("iframePlayer", "null"), setInterval(function() {
                    return __awaiter(this, void 0, void 0, function*() {
                        var item = yield api.storage.get("iframePlayer");
                        void 0 !== item && "null" != item && (page.setVideoTime(item, function(time) {}), 
                        api.storage.set("iframePlayer", "null"));
                    });
                }, 2e3);
            }
            Object(_utils_firebaseNotification__WEBPACK_IMPORTED_MODULE_5__.a)();
        }
        console.log("%cMAL-Sync", "font-size: 40px; padding-bottom: 3px; color: white; text-shadow: -1px -1px #2e51a2, 1px -1px #2e51a2, -1px 1px #2e51a2, 1px 1px #2e51a2, 2px 2px #2e51a2, 3px 3px #2e51a2;", "Version: " + api.storage.version()), 
        api.settings.init().then(() => {
            main(), function() {
                __awaiter(this, void 0, void 0, function*() {
                    var schedule = yield api.storage.get("timestampUpdate/release");
                    (void 0 === schedule || j.$.now() - schedule > 3456e5) && (yield Object(_utils_scheduler__WEBPACK_IMPORTED_MODULE_4__.a)(), 
                    api.storage.set("timestampUpdate/release", j.$.now()));
                });
            }();
        });
    }.call(this, __webpack_require__(1), __webpack_require__(0), __webpack_require__(3));
}, function(module, exports, __webpack_require__) {
    var result = __webpack_require__(80);
    module.exports = "string" == typeof result ? result : result.toString();
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(5)(!1)).push([ module.i, '#malStatus,\n#malTotal,\n#malEpisodes,\n#malUserRating,\n#malRating,\n#malVolumes,\n#malTotalVol,\n#malTotalCha,\n#AddMal {\n  color: #d5f406;\n}\n.mal-sync-active {\n  background-color: #002966;\n}\n#malp select option {\n  background-color: #111111;\n}\n#malp #malStatus,\n#malp #malUserRating,\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  font-size: inherit;\n  font-family: inherit;\n  background: transparent;\n  border-width: 1px;\n  border-color: grey;\n  text-decoration: none;\n  outline: medium none;\n  border-width: 0px;\n  height: auto;\n  padding: 0;\n  margin: 0;\n  line-height: 1;\n}\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  text-align: center;\n  border-bottom-width: 1px;\n}\n#malp #malEpisodes:focus,\n#malp #malVolumes:focus,\n#malp #malEpisodes:focus {\n  border-color: #d5f406;\n}\n#malSyncProgress.ms-loading {\n  height: 4px;\n  width: 100%;\n  position: relative;\n  overflow: hidden;\n  background-color: #ddd;\n}\n#malSyncProgress.ms-loading:before {\n  display: block;\n  position: absolute;\n  content: "";\n  left: -200px;\n  width: 200px;\n  height: 4px;\n  background-color: #2980b9;\n  animation: loading 2s linear infinite;\n}\n@keyframes loading {\n  from {\n    left: -200px;\n    width: 30%;\n  }\n  50% {\n    width: 30%;\n  }\n  70% {\n    width: 70%;\n  }\n  80% {\n    left: 50%;\n  }\n  95% {\n    left: 120%;\n  }\n  to {\n    left: 100%;\n  }\n}\n#malSyncProgress.ms-done .ms-progress {\n  width: 100% !important;\n  background-color: #ff4081 !important;\n  transition: background-color 1s !important;\n}\n#footer {\n  z-index: 2;\n}\n#malp #malStatus,\n#malp #malUserRating,\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  height: auto !important;\n}\n', "" ]);
}, function(module, exports, __webpack_require__) {
    var result = __webpack_require__(82);
    module.exports = "string" == typeof result ? result : result.toString();
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(5)(!1)).push([ module.i, '#malStatus,\n#malTotal,\n#malEpisodes,\n#malUserRating,\n#malRating,\n#malVolumes,\n#malTotalVol,\n#malTotalCha,\n#AddMal {\n  color: #72cefe;\n}\n.mal-sync-active {\n  background-color: #002966;\n}\n#malp select option {\n  background-color: #111111;\n}\n#malp #malStatus,\n#malp #malUserRating,\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  font-size: inherit;\n  font-family: inherit;\n  background: transparent;\n  border-width: 1px;\n  border-color: grey;\n  text-decoration: none;\n  outline: medium none;\n  border-width: 0px;\n  height: auto;\n  padding: 0;\n  margin: 0;\n  line-height: 1;\n}\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  text-align: center;\n  border-bottom-width: 1px;\n}\n#malp #malEpisodes:focus,\n#malp #malVolumes:focus,\n#malp #malEpisodes:focus {\n  border-color: #72cefe;\n}\n#malSyncProgress.ms-loading {\n  height: 4px;\n  width: 100%;\n  position: relative;\n  overflow: hidden;\n  background-color: #ddd;\n}\n#malSyncProgress.ms-loading:before {\n  display: block;\n  position: absolute;\n  content: "";\n  left: -200px;\n  width: 200px;\n  height: 4px;\n  background-color: #2980b9;\n  animation: loading 2s linear infinite;\n}\n@keyframes loading {\n  from {\n    left: -200px;\n    width: 30%;\n  }\n  50% {\n    width: 30%;\n  }\n  70% {\n    width: 70%;\n  }\n  80% {\n    left: 50%;\n  }\n  95% {\n    left: 120%;\n  }\n  to {\n    left: 100%;\n  }\n}\n#malSyncProgress.ms-done .ms-progress {\n  width: 100% !important;\n  background-color: #ff4081 !important;\n  transition: background-color 1s !important;\n}\n#footer {\n  z-index: 2;\n}\n', "" ]);
}, function(module, exports, __webpack_require__) {
    var result = __webpack_require__(84);
    module.exports = "string" == typeof result ? result : result.toString();
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(5)(!1)).push([ module.i, '#malStatus,\n#malTotal,\n#malEpisodes,\n#malUserRating,\n#malRating,\n#malVolumes,\n#malTotalVol,\n#malTotalCha,\n#AddMal {\n  color: #694ba1;\n}\n.mal-sync-active {\n  background-color: #002966;\n}\n#malp select option {\n  background-color: #111111;\n}\n#malp #malStatus,\n#malp #malUserRating,\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  font-size: inherit;\n  font-family: inherit;\n  background: transparent;\n  border-width: 1px;\n  border-color: grey;\n  text-decoration: none;\n  outline: medium none;\n  border-width: 0px;\n  height: auto;\n  padding: 0;\n  margin: 0;\n  line-height: 1;\n}\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  text-align: center;\n  border-bottom-width: 1px;\n}\n#malp #malEpisodes:focus,\n#malp #malVolumes:focus,\n#malp #malEpisodes:focus {\n  border-color: #694ba1;\n}\n#malSyncProgress.ms-loading {\n  height: 4px;\n  width: 100%;\n  position: relative;\n  overflow: hidden;\n  background-color: #ddd;\n}\n#malSyncProgress.ms-loading:before {\n  display: block;\n  position: absolute;\n  content: "";\n  left: -200px;\n  width: 200px;\n  height: 4px;\n  background-color: #2980b9;\n  animation: loading 2s linear infinite;\n}\n@keyframes loading {\n  from {\n    left: -200px;\n    width: 30%;\n  }\n  50% {\n    width: 30%;\n  }\n  70% {\n    width: 70%;\n  }\n  80% {\n    left: 50%;\n  }\n  95% {\n    left: 120%;\n  }\n  to {\n    left: 100%;\n  }\n}\n#malSyncProgress.ms-done .ms-progress {\n  width: 100% !important;\n  background-color: #ff4081 !important;\n  transition: background-color 1s !important;\n}\n#MalData select option {\n  background-color: white;\n}\nbody.dark #MalData select option {\n  background-color: #1c1b26 !important;\n}\n#malp {\n  margin: 0;\n}\n', "" ]);
}, function(module, exports, __webpack_require__) {
    var result = __webpack_require__(86);
    module.exports = "string" == typeof result ? result : result.toString();
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(5)(!1)).push([ module.i, '#malStatus,\n#malTotal,\n#malEpisodes,\n#malUserRating,\n#malRating,\n#malVolumes,\n#malTotalVol,\n#malTotalCha,\n#AddMal {\n  color: white;\n}\n.mal-sync-active {\n  background-color: #b2d1ff !important;\n}\n#malp select option {\n  background-color: #111111;\n}\n#malp #malStatus,\n#malp #malUserRating,\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  font-size: inherit;\n  font-family: inherit;\n  background: transparent;\n  border-width: 1px;\n  border-color: grey;\n  text-decoration: none;\n  outline: medium none;\n  border-width: 0px;\n  height: auto;\n  padding: 0;\n  margin: 0;\n  line-height: 1;\n}\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  text-align: center;\n  border-bottom-width: 1px;\n}\n#malp #malEpisodes:focus,\n#malp #malVolumes:focus,\n#malp #malEpisodes:focus {\n  border-color: white;\n}\n#malSyncProgress.ms-loading {\n  height: 4px;\n  width: 100%;\n  position: relative;\n  overflow: hidden;\n  background-color: #ddd;\n}\n#malSyncProgress.ms-loading:before {\n  display: block;\n  position: absolute;\n  content: "";\n  left: -200px;\n  width: 200px;\n  height: 4px;\n  background-color: #2980b9;\n  animation: loading 2s linear infinite;\n}\n@keyframes loading {\n  from {\n    left: -200px;\n    width: 30%;\n  }\n  50% {\n    width: 30%;\n  }\n  70% {\n    width: 70%;\n  }\n  80% {\n    left: 50%;\n  }\n  95% {\n    left: 120%;\n  }\n  to {\n    left: 100%;\n  }\n}\n#malSyncProgress.ms-done .ms-progress {\n  width: 100% !important;\n  background-color: #ff4081 !important;\n  transition: background-color 1s !important;\n}\n#malp {\n  background-color: #555;\n  padding: 10px 7px 5px 7px;\n}\n#malp span {\n  color: white;\n}\n#malp select > * {\n  background-color: #555 !important;\n}\n', "" ]);
}, function(module, exports, __webpack_require__) {
    var result = __webpack_require__(88);
    module.exports = "string" == typeof result ? result : result.toString();
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(5)(!1)).push([ module.i, '#malStatus,\n#malTotal,\n#malEpisodes,\n#malUserRating,\n#malRating,\n#malVolumes,\n#malTotalVol,\n#malTotalCha,\n#AddMal {\n  color: white;\n}\n.mal-sync-active {\n  background-color: #002966;\n}\n#malp select option {\n  background-color: #111111;\n}\n#malp #malStatus,\n#malp #malUserRating,\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  font-size: inherit;\n  font-family: inherit;\n  background: transparent;\n  border-width: 1px;\n  border-color: grey;\n  text-decoration: none;\n  outline: medium none;\n  border-width: 0px;\n  height: auto;\n  padding: 0;\n  margin: 0;\n  line-height: 1;\n}\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  text-align: center;\n  border-bottom-width: 1px;\n}\n#malp #malEpisodes:focus,\n#malp #malVolumes:focus,\n#malp #malEpisodes:focus {\n  border-color: white;\n}\n#malSyncProgress.ms-loading {\n  height: 4px;\n  width: 100%;\n  position: relative;\n  overflow: hidden;\n  background-color: #ddd;\n}\n#malSyncProgress.ms-loading:before {\n  display: block;\n  position: absolute;\n  content: "";\n  left: -200px;\n  width: 200px;\n  height: 4px;\n  background-color: #2980b9;\n  animation: loading 2s linear infinite;\n}\n@keyframes loading {\n  from {\n    left: -200px;\n    width: 30%;\n  }\n  50% {\n    width: 30%;\n  }\n  70% {\n    width: 70%;\n  }\n  80% {\n    left: 50%;\n  }\n  95% {\n    left: 120%;\n  }\n  to {\n    left: 100%;\n  }\n}\n#malSyncProgress.ms-done .ms-progress {\n  width: 100% !important;\n  background-color: #ff4081 !important;\n  transition: background-color 1s !important;\n}\n', "" ]);
}, function(module, exports, __webpack_require__) {
    var result = __webpack_require__(90);
    module.exports = "string" == typeof result ? result : result.toString();
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(5)(!1)).push([ module.i, '#malStatus,\n#malTotal,\n#malEpisodes,\n#malUserRating,\n#malRating,\n#malVolumes,\n#malTotalVol,\n#malTotalCha,\n#AddMal {\n  color: inherit;\n}\n.mal-sync-active {\n  background-color: #cee1ff;\n}\n#malp select option {\n  background-color: #111111;\n}\n#malp #malStatus,\n#malp #malUserRating,\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  font-size: inherit;\n  font-family: inherit;\n  background: transparent;\n  border-width: 1px;\n  border-color: grey;\n  text-decoration: none;\n  outline: medium none;\n  border-width: 0px;\n  height: auto;\n  padding: 0;\n  margin: 0;\n  line-height: 1;\n}\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  text-align: center;\n  border-bottom-width: 1px;\n}\n#malp #malEpisodes:focus,\n#malp #malVolumes:focus,\n#malp #malEpisodes:focus {\n  border-color: inherit;\n}\n#malSyncProgress.ms-loading {\n  height: 4px;\n  width: 100%;\n  position: relative;\n  overflow: hidden;\n  background-color: #ddd;\n}\n#malSyncProgress.ms-loading:before {\n  display: block;\n  position: absolute;\n  content: "";\n  left: -200px;\n  width: 200px;\n  height: 4px;\n  background-color: #2980b9;\n  animation: loading 2s linear infinite;\n}\n@keyframes loading {\n  from {\n    left: -200px;\n    width: 30%;\n  }\n  50% {\n    width: 30%;\n  }\n  70% {\n    width: 70%;\n  }\n  80% {\n    left: 50%;\n  }\n  95% {\n    left: 120%;\n  }\n  to {\n    left: 100%;\n  }\n}\n#malSyncProgress.ms-done .ms-progress {\n  width: 100% !important;\n  background-color: #ff4081 !important;\n  transition: background-color 1s !important;\n}\n#malp {\n  margin: 0;\n}\n#malp span {\n  color: inherit;\n}\n#malp select > * {\n  background-color: white !important;\n}\n@media only screen and (max-width: 1440px) {\n  #malp .MalLogin {\n    width: 100%;\n  }\n}\n.MALSyncDark #MalData select option {\n  background-color: black !important;\n}\n', "" ]);
}, function(module, exports, __webpack_require__) {
    var result = __webpack_require__(92);
    module.exports = "string" == typeof result ? result : result.toString();
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(5)(!1)).push([ module.i, '#malStatus,\n#malTotal,\n#malEpisodes,\n#malUserRating,\n#malRating,\n#malVolumes,\n#malTotalVol,\n#malTotalCha,\n#AddMal {\n  color: black;\n}\n.mal-sync-active {\n  background-color: #cee1ff !important;\n}\n#malp select option {\n  background-color: #111111;\n}\n#malp #malStatus,\n#malp #malUserRating,\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  font-size: inherit;\n  font-family: inherit;\n  background: transparent;\n  border-width: 1px;\n  border-color: grey;\n  text-decoration: none;\n  outline: medium none;\n  border-width: 0px;\n  height: auto;\n  padding: 0;\n  margin: 0;\n  line-height: 1;\n}\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  text-align: center;\n  border-bottom-width: 1px;\n}\n#malp #malEpisodes:focus,\n#malp #malVolumes:focus,\n#malp #malEpisodes:focus {\n  border-color: black;\n}\n#malSyncProgress.ms-loading {\n  height: 4px;\n  width: 100%;\n  position: relative;\n  overflow: hidden;\n  background-color: #ddd;\n}\n#malSyncProgress.ms-loading:before {\n  display: block;\n  position: absolute;\n  content: "";\n  left: -200px;\n  width: 200px;\n  height: 4px;\n  background-color: #2980b9;\n  animation: loading 2s linear infinite;\n}\n@keyframes loading {\n  from {\n    left: -200px;\n    width: 30%;\n  }\n  50% {\n    width: 30%;\n  }\n  70% {\n    width: 70%;\n  }\n  80% {\n    left: 50%;\n  }\n  95% {\n    left: 120%;\n  }\n  to {\n    left: 100%;\n  }\n}\n#malSyncProgress.ms-done .ms-progress {\n  width: 100% !important;\n  background-color: #ff4081 !important;\n  transition: background-color 1s !important;\n}\n#malp {\n  background-color: #fff;\n  padding: 20px;\n  border-radius: 2px;\n  -webkit-box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.14);\n  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.14);\n  margin-bottom: 20px;\n  position: relative;\n}\n#malp span {\n  color: black;\n}\n#malp select > * {\n  background-color: white !important;\n}\n@media only screen and (max-width: 1320px) {\n  #malp .MalLogin {\n    width: 100%;\n  }\n}\n', "" ]);
}, function(module, exports, __webpack_require__) {
    var result = __webpack_require__(94);
    module.exports = "string" == typeof result ? result : result.toString();
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(5)(!1)).push([ module.i, '#malStatus,\n#malTotal,\n#malEpisodes,\n#malUserRating,\n#malRating,\n#malVolumes,\n#malTotalVol,\n#malTotalCha,\n#AddMal {\n  color: #ffc119;\n}\n.mal-sync-active {\n  background-color: #002966 !important;\n}\n#malp select option {\n  background-color: #111111;\n}\n#malp #malStatus,\n#malp #malUserRating,\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  font-size: inherit;\n  font-family: inherit;\n  background: transparent;\n  border-width: 1px;\n  border-color: grey;\n  text-decoration: none;\n  outline: medium none;\n  border-width: 0px;\n  height: auto;\n  padding: 0;\n  margin: 0;\n  line-height: 1;\n}\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  text-align: center;\n  border-bottom-width: 1px;\n}\n#malp #malEpisodes:focus,\n#malp #malVolumes:focus,\n#malp #malEpisodes:focus {\n  border-color: #ffc119;\n}\n#malSyncProgress.ms-loading {\n  height: 4px;\n  width: 100%;\n  position: relative;\n  overflow: hidden;\n  background-color: #ddd;\n}\n#malSyncProgress.ms-loading:before {\n  display: block;\n  position: absolute;\n  content: "";\n  left: -200px;\n  width: 200px;\n  height: 4px;\n  background-color: #2980b9;\n  animation: loading 2s linear infinite;\n}\n@keyframes loading {\n  from {\n    left: -200px;\n    width: 30%;\n  }\n  50% {\n    width: 30%;\n  }\n  70% {\n    width: 70%;\n  }\n  80% {\n    left: 50%;\n  }\n  95% {\n    left: 120%;\n  }\n  to {\n    left: 100%;\n  }\n}\n#malSyncProgress.ms-done .ms-progress {\n  width: 100% !important;\n  background-color: #ff4081 !important;\n  transition: background-color 1s !important;\n}\n#malp * {\n  font-size: 13px;\n}\n', "" ]);
}, function(module, exports, __webpack_require__) {
    var result = __webpack_require__(96);
    module.exports = "string" == typeof result ? result : result.toString();
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(5)(!1)).push([ module.i, '#malStatus,\n#malTotal,\n#malEpisodes,\n#malUserRating,\n#malRating,\n#malVolumes,\n#malTotalVol,\n#malTotalCha,\n#AddMal {\n  color: white;\n}\n.mal-sync-active {\n  background-color: #002966;\n}\n#malp select option {\n  background-color: #111111;\n}\n#malp #malStatus,\n#malp #malUserRating,\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  font-size: inherit;\n  font-family: inherit;\n  background: transparent;\n  border-width: 1px;\n  border-color: grey;\n  text-decoration: none;\n  outline: medium none;\n  border-width: 0px;\n  height: auto;\n  padding: 0;\n  margin: 0;\n  line-height: 1;\n}\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  text-align: center;\n  border-bottom-width: 1px;\n}\n#malp #malEpisodes:focus,\n#malp #malVolumes:focus,\n#malp #malEpisodes:focus {\n  border-color: white;\n}\n#malSyncProgress.ms-loading {\n  height: 4px;\n  width: 100%;\n  position: relative;\n  overflow: hidden;\n  background-color: #ddd;\n}\n#malSyncProgress.ms-loading:before {\n  display: block;\n  position: absolute;\n  content: "";\n  left: -200px;\n  width: 200px;\n  height: 4px;\n  background-color: #2980b9;\n  animation: loading 2s linear infinite;\n}\n@keyframes loading {\n  from {\n    left: -200px;\n    width: 30%;\n  }\n  50% {\n    width: 30%;\n  }\n  70% {\n    width: 70%;\n  }\n  80% {\n    left: 50%;\n  }\n  95% {\n    left: 120%;\n  }\n  to {\n    left: 100%;\n  }\n}\n#malSyncProgress.ms-done .ms-progress {\n  width: 100% !important;\n  background-color: #ff4081 !important;\n  transition: background-color 1s !important;\n}\n.mal-sync-active a {\n  background-color: #72abff !important;\n}\n#flashinfo-div {\n  z-index: 100 !important;\n}\n#malp #malVolumes,\n#malp #malEpisodes {\n  float: none;\n  display: inline-block;\n  border-radius: 0;\n}\n', "" ]);
}, function(module, exports, __webpack_require__) {
    var result = __webpack_require__(98);
    module.exports = "string" == typeof result ? result : result.toString();
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(5)(!1)).push([ module.i, '#malStatus,\n#malTotal,\n#malEpisodes,\n#malUserRating,\n#malRating,\n#malVolumes,\n#malTotalVol,\n#malTotalCha,\n#AddMal {\n  color: white;\n}\n.mal-sync-active {\n  background-color: #bbbbbb;\n}\n#malp select option {\n  background-color: #111111;\n}\n#malp #malStatus,\n#malp #malUserRating,\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  font-size: inherit;\n  font-family: inherit;\n  background: transparent;\n  border-width: 1px;\n  border-color: grey;\n  text-decoration: none;\n  outline: medium none;\n  border-width: 0px;\n  height: auto;\n  padding: 0;\n  margin: 0;\n  line-height: 1;\n}\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  text-align: center;\n  border-bottom-width: 1px;\n}\n#malp #malEpisodes:focus,\n#malp #malVolumes:focus,\n#malp #malEpisodes:focus {\n  border-color: white;\n}\n#malSyncProgress.ms-loading {\n  height: 4px;\n  width: 100%;\n  position: relative;\n  overflow: hidden;\n  background-color: #ddd;\n}\n#malSyncProgress.ms-loading:before {\n  display: block;\n  position: absolute;\n  content: "";\n  left: -200px;\n  width: 200px;\n  height: 4px;\n  background-color: #2980b9;\n  animation: loading 2s linear infinite;\n}\n@keyframes loading {\n  from {\n    left: -200px;\n    width: 30%;\n  }\n  50% {\n    width: 30%;\n  }\n  70% {\n    width: 70%;\n  }\n  80% {\n    left: 50%;\n  }\n  95% {\n    left: 120%;\n  }\n  to {\n    left: 100%;\n  }\n}\n#malSyncProgress.ms-done .ms-progress {\n  width: 100% !important;\n  background-color: #ff4081 !important;\n  transition: background-color 1s !important;\n}\n#malp {\n  color: white;\n}\n#flash-div-top button,\n#flash-div-bottom button,\n#flashinfo-div button {\n  background: none;\n  box-shadow: none;\n  -moz-box-shadow: none;\n  -webkit-box-shadow: none;\n}\n#flash-div-top .undoButton,\n#flash-div-bottom .undoButton,\n#flashinfo-div .undoButton {\n  margin-left: auto;\n  margin-right: auto;\n}\n', "" ]);
}, function(module, exports, __webpack_require__) {
    var result = __webpack_require__(100);
    module.exports = "string" == typeof result ? result : result.toString();
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(5)(!1)).push([ module.i, '#malStatus,\n#malTotal,\n#malEpisodes,\n#malUserRating,\n#malRating,\n#malVolumes,\n#malTotalVol,\n#malTotalCha,\n#AddMal {\n  color: black;\n}\n.mal-sync-active {\n  background-color: #0066ff;\n}\n#malp select option {\n  background-color: #111111;\n}\n#malp #malStatus,\n#malp #malUserRating,\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  font-size: inherit;\n  font-family: inherit;\n  background: transparent;\n  border-width: 1px;\n  border-color: grey;\n  text-decoration: none;\n  outline: medium none;\n  border-width: 0px;\n  height: auto;\n  padding: 0;\n  margin: 0;\n  line-height: 1;\n}\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  text-align: center;\n  border-bottom-width: 1px;\n}\n#malp #malEpisodes:focus,\n#malp #malVolumes:focus,\n#malp #malEpisodes:focus {\n  border-color: black;\n}\n#malSyncProgress.ms-loading {\n  height: 4px;\n  width: 100%;\n  position: relative;\n  overflow: hidden;\n  background-color: #ddd;\n}\n#malSyncProgress.ms-loading:before {\n  display: block;\n  position: absolute;\n  content: "";\n  left: -200px;\n  width: 200px;\n  height: 4px;\n  background-color: #2980b9;\n  animation: loading 2s linear infinite;\n}\n@keyframes loading {\n  from {\n    left: -200px;\n    width: 30%;\n  }\n  50% {\n    width: 30%;\n  }\n  70% {\n    width: 70%;\n  }\n  80% {\n    left: 50%;\n  }\n  95% {\n    left: 120%;\n  }\n  to {\n    left: 100%;\n  }\n}\n#malSyncProgress.ms-done .ms-progress {\n  width: 100% !important;\n  background-color: #ff4081 !important;\n  transition: background-color 1s !important;\n}\n', "" ]);
}, function(module, exports, __webpack_require__) {
    var result = __webpack_require__(102);
    module.exports = "string" == typeof result ? result : result.toString();
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(5)(!1)).push([ module.i, '#malStatus,\n#malTotal,\n#malEpisodes,\n#malUserRating,\n#malRating,\n#malVolumes,\n#malTotalVol,\n#malTotalCha,\n#AddMal {\n  color: white;\n}\n.mal-sync-active {\n  background-color: #002966;\n}\n#malp select option {\n  background-color: #111111;\n}\n#malp #malStatus,\n#malp #malUserRating,\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  font-size: inherit;\n  font-family: inherit;\n  background: transparent;\n  border-width: 1px;\n  border-color: grey;\n  text-decoration: none;\n  outline: medium none;\n  border-width: 0px;\n  height: auto;\n  padding: 0;\n  margin: 0;\n  line-height: 1;\n}\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  text-align: center;\n  border-bottom-width: 1px;\n}\n#malp #malEpisodes:focus,\n#malp #malVolumes:focus,\n#malp #malEpisodes:focus {\n  border-color: white;\n}\n#malSyncProgress.ms-loading {\n  height: 4px;\n  width: 100%;\n  position: relative;\n  overflow: hidden;\n  background-color: #ddd;\n}\n#malSyncProgress.ms-loading:before {\n  display: block;\n  position: absolute;\n  content: "";\n  left: -200px;\n  width: 200px;\n  height: 4px;\n  background-color: #2980b9;\n  animation: loading 2s linear infinite;\n}\n@keyframes loading {\n  from {\n    left: -200px;\n    width: 30%;\n  }\n  50% {\n    width: 30%;\n  }\n  70% {\n    width: 70%;\n  }\n  80% {\n    left: 50%;\n  }\n  95% {\n    left: 120%;\n  }\n  to {\n    left: 100%;\n  }\n}\n#malSyncProgress.ms-done .ms-progress {\n  width: 100% !important;\n  background-color: #ff4081 !important;\n  transition: background-color 1s !important;\n}\n#malp {\n  margin-top: 1rem;\n  border-top: 0 solid hsla(0, 0%, 100%, 0.05);\n  border-width: 1px 0;\n  font-size: 14px;\n  padding: 10px 5px 0;\n  padding-top: 1rem;\n}\n#malp select {\n  display: inline-block;\n  width: auto;\n}\n#malp input {\n  display: inline-block;\n}\n.my-float.open-info-popup {\n  height: 100%;\n  width: 100%;\n  margin: 0 !important;\n}\n', "" ]);
}, function(module, exports, __webpack_require__) {
    var result = __webpack_require__(104);
    module.exports = "string" == typeof result ? result : result.toString();
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(5)(!1)).push([ module.i, '#malStatus,\n#malTotal,\n#malEpisodes,\n#malUserRating,\n#malRating,\n#malVolumes,\n#malTotalVol,\n#malTotalCha,\n#AddMal {\n  color: inherit;\n}\n.mal-sync-active {\n  background-color: #002966;\n}\n#malp select option {\n  background-color: #111111;\n}\n#malp #malStatus,\n#malp #malUserRating,\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  font-size: inherit;\n  font-family: inherit;\n  background: transparent;\n  border-width: 1px;\n  border-color: grey;\n  text-decoration: none;\n  outline: medium none;\n  border-width: 0px;\n  height: auto;\n  padding: 0;\n  margin: 0;\n  line-height: 1;\n}\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  text-align: center;\n  border-bottom-width: 1px;\n}\n#malp #malEpisodes:focus,\n#malp #malVolumes:focus,\n#malp #malEpisodes:focus {\n  border-color: inherit;\n}\n#malSyncProgress.ms-loading {\n  height: 4px;\n  width: 100%;\n  position: relative;\n  overflow: hidden;\n  background-color: #ddd;\n}\n#malSyncProgress.ms-loading:before {\n  display: block;\n  position: absolute;\n  content: "";\n  left: -200px;\n  width: 200px;\n  height: 4px;\n  background-color: #2980b9;\n  animation: loading 2s linear infinite;\n}\n@keyframes loading {\n  from {\n    left: -200px;\n    width: 30%;\n  }\n  50% {\n    width: 30%;\n  }\n  70% {\n    width: 70%;\n  }\n  80% {\n    left: 50%;\n  }\n  95% {\n    left: 120%;\n  }\n  to {\n    left: 100%;\n  }\n}\n#malSyncProgress.ms-done .ms-progress {\n  width: 100% !important;\n  background-color: #ff4081 !important;\n  transition: background-color 1s !important;\n}\n.miniMAL-Fullscreen .open-info-popup.floatbutton,\n.miniMAL-hide .open-info-popup.floatbutton,\n.miniMAL-Fullscreen #flashinfo-div,\n.miniMAL-hide #flashinfo-div,\n.miniMAL-Fullscreen #flash-div-bottom,\n.miniMAL-hide #flash-div-bottom,\n.miniMAL-Fullscreen #flash-div-top,\n.miniMAL-hide #flash-div-top {\n  display: none !important;\n}\n#malp {\n  max-width: 700px;\n}\n', "" ]);
}, function(module, exports, __webpack_require__) {
    var result = __webpack_require__(106);
    module.exports = "string" == typeof result ? result : result.toString();
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(5)(!1)).push([ module.i, '#malStatus,\n#malTotal,\n#malEpisodes,\n#malUserRating,\n#malRating,\n#malVolumes,\n#malTotalVol,\n#malTotalCha,\n#AddMal {\n  color: inherit;\n}\n.mal-sync-active {\n  background-color: #002966;\n}\n#malp select option {\n  background-color: #111111;\n}\n#malp #malStatus,\n#malp #malUserRating,\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  font-size: inherit;\n  font-family: inherit;\n  background: transparent;\n  border-width: 1px;\n  border-color: grey;\n  text-decoration: none;\n  outline: medium none;\n  border-width: 0px;\n  height: auto;\n  padding: 0;\n  margin: 0;\n  line-height: 1;\n}\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  text-align: center;\n  border-bottom-width: 1px;\n}\n#malp #malEpisodes:focus,\n#malp #malVolumes:focus,\n#malp #malEpisodes:focus {\n  border-color: inherit;\n}\n#malSyncProgress.ms-loading {\n  height: 4px;\n  width: 100%;\n  position: relative;\n  overflow: hidden;\n  background-color: #ddd;\n}\n#malSyncProgress.ms-loading:before {\n  display: block;\n  position: absolute;\n  content: "";\n  left: -200px;\n  width: 200px;\n  height: 4px;\n  background-color: #2980b9;\n  animation: loading 2s linear infinite;\n}\n@keyframes loading {\n  from {\n    left: -200px;\n    width: 30%;\n  }\n  50% {\n    width: 30%;\n  }\n  70% {\n    width: 70%;\n  }\n  80% {\n    left: 50%;\n  }\n  95% {\n    left: 120%;\n  }\n  to {\n    left: 100%;\n  }\n}\n#malSyncProgress.ms-done .ms-progress {\n  width: 100% !important;\n  background-color: #ff4081 !important;\n  transition: background-color 1s !important;\n}\n.miniMAL-Fullscreen .open-info-popup.floatbutton,\n.miniMAL-hide .open-info-popup.floatbutton,\n.miniMAL-Fullscreen #flashinfo-div,\n.miniMAL-hide #flashinfo-div,\n.miniMAL-Fullscreen #flash-div-bottom,\n.miniMAL-hide #flash-div-bottom,\n.miniMAL-Fullscreen #flash-div-top,\n.miniMAL-hide #flash-div-top {\n  display: none !important;\n}\n#malp {\n  max-width: 700px;\n  margin: 0;\n}\n.noApiKey [data-qa-id="moreButton"] {\n  background-color: red;\n}\n', "" ]);
}, function(module, exports, __webpack_require__) {
    var result = __webpack_require__(108);
    module.exports = "string" == typeof result ? result : result.toString();
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(5)(!1)).push([ module.i, '#malStatus,\n#malTotal,\n#malEpisodes,\n#malUserRating,\n#malRating,\n#malVolumes,\n#malTotalVol,\n#malTotalCha,\n#AddMal {\n  color: white;\n}\n.mal-sync-active {\n  background-color: #002966;\n}\n#malp select option {\n  background-color: #111111;\n}\n#malp #malStatus,\n#malp #malUserRating,\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  font-size: inherit;\n  font-family: inherit;\n  background: transparent;\n  border-width: 1px;\n  border-color: grey;\n  text-decoration: none;\n  outline: medium none;\n  border-width: 0px;\n  height: auto;\n  padding: 0;\n  margin: 0;\n  line-height: 1;\n}\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  text-align: center;\n  border-bottom-width: 1px;\n}\n#malp #malEpisodes:focus,\n#malp #malVolumes:focus,\n#malp #malEpisodes:focus {\n  border-color: white;\n}\n#malSyncProgress.ms-loading {\n  height: 4px;\n  width: 100%;\n  position: relative;\n  overflow: hidden;\n  background-color: #ddd;\n}\n#malSyncProgress.ms-loading:before {\n  display: block;\n  position: absolute;\n  content: "";\n  left: -200px;\n  width: 200px;\n  height: 4px;\n  background-color: #2980b9;\n  animation: loading 2s linear infinite;\n}\n@keyframes loading {\n  from {\n    left: -200px;\n    width: 30%;\n  }\n  50% {\n    width: 30%;\n  }\n  70% {\n    width: 70%;\n  }\n  80% {\n    left: 50%;\n  }\n  95% {\n    left: 120%;\n  }\n  to {\n    left: 100%;\n  }\n}\n#malSyncProgress.ms-done .ms-progress {\n  width: 100% !important;\n  background-color: #ff4081 !important;\n  transition: background-color 1s !important;\n}\n.miniMAL-Fullscreen .open-info-popup.floatbutton,\n.miniMAL-hide .open-info-popup.floatbutton,\n.miniMAL-Fullscreen #flashinfo-div,\n.miniMAL-hide #flashinfo-div,\n.miniMAL-Fullscreen #flash-div-bottom,\n.miniMAL-hide #flash-div-bottom,\n.miniMAL-Fullscreen #flash-div-top,\n.miniMAL-hide #flash-div-top {\n  display: none !important;\n}\n', "" ]);
}, function(module, exports, __webpack_require__) {
    var result = __webpack_require__(110);
    module.exports = "string" == typeof result ? result : result.toString();
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(5)(!1)).push([ module.i, '#malStatus,\n#malTotal,\n#malEpisodes,\n#malUserRating,\n#malRating,\n#malVolumes,\n#malTotalVol,\n#malTotalCha,\n#AddMal {\n  color: inherit;\n}\n.mal-sync-active {\n  background-color: #002966;\n}\n#malp select option {\n  background-color: #111111;\n}\n#malp #malStatus,\n#malp #malUserRating,\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  font-size: inherit;\n  font-family: inherit;\n  background: transparent;\n  border-width: 1px;\n  border-color: grey;\n  text-decoration: none;\n  outline: medium none;\n  border-width: 0px;\n  height: auto;\n  padding: 0;\n  margin: 0;\n  line-height: 1;\n}\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  text-align: center;\n  border-bottom-width: 1px;\n}\n#malp #malEpisodes:focus,\n#malp #malVolumes:focus,\n#malp #malEpisodes:focus {\n  border-color: inherit;\n}\n#malSyncProgress.ms-loading {\n  height: 4px;\n  width: 100%;\n  position: relative;\n  overflow: hidden;\n  background-color: #ddd;\n}\n#malSyncProgress.ms-loading:before {\n  display: block;\n  position: absolute;\n  content: "";\n  left: -200px;\n  width: 200px;\n  height: 4px;\n  background-color: #2980b9;\n  animation: loading 2s linear infinite;\n}\n@keyframes loading {\n  from {\n    left: -200px;\n    width: 30%;\n  }\n  50% {\n    width: 30%;\n  }\n  70% {\n    width: 70%;\n  }\n  80% {\n    left: 50%;\n  }\n  95% {\n    left: 120%;\n  }\n  to {\n    left: 100%;\n  }\n}\n#malSyncProgress.ms-done .ms-progress {\n  width: 100% !important;\n  background-color: #ff4081 !important;\n  transition: background-color 1s !important;\n}\n.mal-sync-active a {\n  background-color: #72abff !important;\n}\n#MalData select option {\n  background-color: white;\n}\nbody.darkmode #MalData select option {\n  background-color: #3b3e45 !important;\n}\n', "" ]);
}, function(module, exports, __webpack_require__) {
    var result = __webpack_require__(112);
    module.exports = "string" == typeof result ? result : result.toString();
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(5)(!1)).push([ module.i, '#malStatus,\n#malTotal,\n#malEpisodes,\n#malUserRating,\n#malRating,\n#malVolumes,\n#malTotalVol,\n#malTotalCha,\n#AddMal {\n  color: black;\n}\n.mal-sync-active {\n  background-color: #002966;\n}\n#malp select option {\n  background-color: #111111;\n}\n#malp #malStatus,\n#malp #malUserRating,\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  font-size: inherit;\n  font-family: inherit;\n  background: transparent;\n  border-width: 1px;\n  border-color: grey;\n  text-decoration: none;\n  outline: medium none;\n  border-width: 0px;\n  height: auto;\n  padding: 0;\n  margin: 0;\n  line-height: 1;\n}\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  text-align: center;\n  border-bottom-width: 1px;\n}\n#malp #malEpisodes:focus,\n#malp #malVolumes:focus,\n#malp #malEpisodes:focus {\n  border-color: black;\n}\n#malSyncProgress.ms-loading {\n  height: 4px;\n  width: 100%;\n  position: relative;\n  overflow: hidden;\n  background-color: #ddd;\n}\n#malSyncProgress.ms-loading:before {\n  display: block;\n  position: absolute;\n  content: "";\n  left: -200px;\n  width: 200px;\n  height: 4px;\n  background-color: #2980b9;\n  animation: loading 2s linear infinite;\n}\n@keyframes loading {\n  from {\n    left: -200px;\n    width: 30%;\n  }\n  50% {\n    width: 30%;\n  }\n  70% {\n    width: 70%;\n  }\n  80% {\n    left: 50%;\n  }\n  95% {\n    left: 120%;\n  }\n  to {\n    left: 100%;\n  }\n}\n#malSyncProgress.ms-done .ms-progress {\n  width: 100% !important;\n  background-color: #ff4081 !important;\n  transition: background-color 1s !important;\n}\nsection.main .content-wrapper .theatre .theatre-info {\n  margin-bottom: 1rem;\n}\n#flashinfo-div {\n  z-index: 99999 !important;\n}\n#malp,\n#malTotal,\n#AddMalDiv,\n#AddMal {\n  color: #999 !important;\n}\n#malStatus,\n#malUserRating,\n#malEpisodes {\n  background: transparent !important;\n  color: #d5015b !important;\n}\n#malStatus option,\n#malUserRating option,\n#malEpisodes option {\n  background: black !important;\n  color: #d5015b !important;\n}\n#malRating {\n  color: #d5015b !important;\n}\n.mal-sync-active .episode-label-wrap {\n  background-color: #002966;\n  background-color: #002966ba;\n}\n', "" ]);
}, function(module, exports, __webpack_require__) {
    var result = __webpack_require__(114);
    module.exports = "string" == typeof result ? result : result.toString();
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(5)(!1)).push([ module.i, '#malStatus,\n#malTotal,\n#malEpisodes,\n#malUserRating,\n#malRating,\n#malVolumes,\n#malTotalVol,\n#malTotalCha,\n#AddMal {\n  color: #694ba1;\n}\n.mal-sync-active {\n  background-color: #002966;\n}\n#malp select option {\n  background-color: #111111;\n}\n#malp #malStatus,\n#malp #malUserRating,\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  font-size: inherit;\n  font-family: inherit;\n  background: transparent;\n  border-width: 1px;\n  border-color: grey;\n  text-decoration: none;\n  outline: medium none;\n  border-width: 0px;\n  height: auto;\n  padding: 0;\n  margin: 0;\n  line-height: 1;\n}\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  text-align: center;\n  border-bottom-width: 1px;\n}\n#malp #malEpisodes:focus,\n#malp #malVolumes:focus,\n#malp #malEpisodes:focus {\n  border-color: #694ba1;\n}\n#malSyncProgress.ms-loading {\n  height: 4px;\n  width: 100%;\n  position: relative;\n  overflow: hidden;\n  background-color: #ddd;\n}\n#malSyncProgress.ms-loading:before {\n  display: block;\n  position: absolute;\n  content: "";\n  left: -200px;\n  width: 200px;\n  height: 4px;\n  background-color: #2980b9;\n  animation: loading 2s linear infinite;\n}\n@keyframes loading {\n  from {\n    left: -200px;\n    width: 30%;\n  }\n  50% {\n    width: 30%;\n  }\n  70% {\n    width: 70%;\n  }\n  80% {\n    left: 50%;\n  }\n  95% {\n    left: 120%;\n  }\n  to {\n    left: 100%;\n  }\n}\n#malSyncProgress.ms-done .ms-progress {\n  width: 100% !important;\n  background-color: #ff4081 !important;\n  transition: background-color 1s !important;\n}\n#MalData select option {\n  background-color: white;\n}\nbody.dark #MalData select option {\n  background-color: #1c1b26 !important;\n}\n#malp {\n  margin: 0;\n}\n#malp .info {\n  display: block;\n}\n#malp #malEpisodes {\n  display: inline-block;\n  border: 0;\n  padding: 0;\n  margin-bottom: 4px;\n}\n#malp select {\n  margin-left: -3px !important;\n}\n', "" ]);
}, function(module, exports, __webpack_require__) {
    var result = __webpack_require__(116);
    module.exports = "string" == typeof result ? result : result.toString();
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(5)(!1)).push([ module.i, '#malStatus,\n#malTotal,\n#malEpisodes,\n#malUserRating,\n#malRating,\n#malVolumes,\n#malTotalVol,\n#malTotalCha,\n#AddMal {\n  color: white;\n}\n.mal-sync-active {\n  background-color: #002966;\n}\n#malp select option {\n  background-color: #111111;\n}\n#malp #malStatus,\n#malp #malUserRating,\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  font-size: inherit;\n  font-family: inherit;\n  background: transparent;\n  border-width: 1px;\n  border-color: grey;\n  text-decoration: none;\n  outline: medium none;\n  border-width: 0px;\n  height: auto;\n  padding: 0;\n  margin: 0;\n  line-height: 1;\n}\n#malp #malEpisodes,\n#malp #malVolumes,\n#malp #malEpisodes {\n  text-align: center;\n  border-bottom-width: 1px;\n}\n#malp #malEpisodes:focus,\n#malp #malVolumes:focus,\n#malp #malEpisodes:focus {\n  border-color: white;\n}\n#malSyncProgress.ms-loading {\n  height: 4px;\n  width: 100%;\n  position: relative;\n  overflow: hidden;\n  background-color: #ddd;\n}\n#malSyncProgress.ms-loading:before {\n  display: block;\n  position: absolute;\n  content: "";\n  left: -200px;\n  width: 200px;\n  height: 4px;\n  background-color: #2980b9;\n  animation: loading 2s linear infinite;\n}\n@keyframes loading {\n  from {\n    left: -200px;\n    width: 30%;\n  }\n  50% {\n    width: 30%;\n  }\n  70% {\n    width: 70%;\n  }\n  80% {\n    left: 50%;\n  }\n  95% {\n    left: 120%;\n  }\n  to {\n    left: 100%;\n  }\n}\n#malSyncProgress.ms-done .ms-progress {\n  width: 100% !important;\n  background-color: #ff4081 !important;\n  transition: background-color 1s !important;\n}\n.mal-sync-active a {\n  background-color: #72abff !important;\n}\n#flashinfo-div {\n  z-index: 100 !important;\n}\n#malp #malVolumes,\n#malp #malEpisodes {\n  float: none;\n  display: inline-block;\n  border-radius: 0;\n}\n#MalData {\n  display: initial !important;\n}\n.cap-header:visited {\n  color: #fff !important;\n}\n', "" ]);
}, function(module, exports, __webpack_require__) {
    (function(global) {
        var scope = void 0 !== global && global || "undefined" != typeof self && self || window, apply = Function.prototype.apply;
        function Timeout(id, clearFn) {
            this._id = id, this._clearFn = clearFn;
        }
        exports.setTimeout = function() {
            return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
        }, exports.setInterval = function() {
            return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
        }, exports.clearTimeout = exports.clearInterval = function(timeout) {
            timeout && timeout.close();
        }, Timeout.prototype.unref = Timeout.prototype.ref = function() {}, Timeout.prototype.close = function() {
            this._clearFn.call(scope, this._id);
        }, exports.enroll = function(item, msecs) {
            clearTimeout(item._idleTimeoutId), item._idleTimeout = msecs;
        }, exports.unenroll = function(item) {
            clearTimeout(item._idleTimeoutId), item._idleTimeout = -1;
        }, exports._unrefActive = exports.active = function(item) {
            clearTimeout(item._idleTimeoutId);
            var msecs = item._idleTimeout;
            msecs >= 0 && (item._idleTimeoutId = setTimeout(function() {
                item._onTimeout && item._onTimeout();
            }, msecs));
        }, __webpack_require__(118), exports.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== global && global.setImmediate || this && this.setImmediate, 
        exports.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== global && global.clearImmediate || this && this.clearImmediate;
    }).call(this, __webpack_require__(34));
}, function(module, exports, __webpack_require__) {
    (function(global, process) {
        !function(global, undefined) {
            "use strict";
            if (!global.setImmediate) {
                var registerImmediate, html, channel, messagePrefix, onGlobalMessage, nextHandle = 1, tasksByHandle = {}, currentlyRunningATask = !1, doc = global.document, attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
                attachTo = attachTo && attachTo.setTimeout ? attachTo : global, "[object process]" === {}.toString.call(global.process) ? registerImmediate = function(handle) {
                    process.nextTick(function() {
                        runIfPresent(handle);
                    });
                } : !function() {
                    if (global.postMessage && !global.importScripts) {
                        var postMessageIsAsynchronous = !0, oldOnMessage = global.onmessage;
                        return global.onmessage = function() {
                            postMessageIsAsynchronous = !1;
                        }, global.postMessage("", "*"), global.onmessage = oldOnMessage, postMessageIsAsynchronous;
                    }
                }() ? global.MessageChannel ? ((channel = new MessageChannel()).port1.onmessage = function(event) {
                    runIfPresent(event.data);
                }, registerImmediate = function(handle) {
                    channel.port2.postMessage(handle);
                }) : doc && "onreadystatechange" in doc.createElement("script") ? (html = doc.documentElement, 
                registerImmediate = function(handle) {
                    var script = doc.createElement("script");
                    script.onreadystatechange = function() {
                        runIfPresent(handle), script.onreadystatechange = null, html.removeChild(script), 
                        script = null;
                    }, html.appendChild(script);
                }) : registerImmediate = function(handle) {
                    setTimeout(runIfPresent, 0, handle);
                } : (messagePrefix = "setImmediate$" + Math.random() + "$", onGlobalMessage = function(event) {
                    event.source === global && "string" == typeof event.data && 0 === event.data.indexOf(messagePrefix) && runIfPresent(+event.data.slice(messagePrefix.length));
                }, global.addEventListener ? global.addEventListener("message", onGlobalMessage, !1) : global.attachEvent("onmessage", onGlobalMessage), 
                registerImmediate = function(handle) {
                    global.postMessage(messagePrefix + handle, "*");
                }), attachTo.setImmediate = function(callback) {
                    "function" != typeof callback && (callback = new Function("" + callback));
                    for (var args = new Array(arguments.length - 1), i = 0; i < args.length; i++) args[i] = arguments[i + 1];
                    var task = {
                        callback: callback,
                        args: args
                    };
                    return tasksByHandle[nextHandle] = task, registerImmediate(nextHandle), nextHandle++;
                }, attachTo.clearImmediate = clearImmediate;
            }
            function clearImmediate(handle) {
                delete tasksByHandle[handle];
            }
            function runIfPresent(handle) {
                if (currentlyRunningATask) setTimeout(runIfPresent, 0, handle); else {
                    var task = tasksByHandle[handle];
                    if (task) {
                        currentlyRunningATask = !0;
                        try {
                            !function(task) {
                                var callback = task.callback, args = task.args;
                                switch (args.length) {
                                  case 0:
                                    callback();
                                    break;

                                  case 1:
                                    callback(args[0]);
                                    break;

                                  case 2:
                                    callback(args[0], args[1]);
                                    break;

                                  case 3:
                                    callback(args[0], args[1], args[2]);
                                    break;

                                  default:
                                    callback.apply(undefined, args);
                                }
                            }(task);
                        } finally {
                            clearImmediate(handle), currentlyRunningATask = !1;
                        }
                    }
                }
            }
        }("undefined" == typeof self ? void 0 === global ? this : global : self);
    }).call(this, __webpack_require__(34), __webpack_require__(119));
}, function(module, exports) {
    var cachedSetTimeout, cachedClearTimeout, process = module.exports = {};
    function defaultSetTimout() {
        throw new Error("setTimeout has not been defined");
    }
    function defaultClearTimeout() {
        throw new Error("clearTimeout has not been defined");
    }
    function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) return setTimeout(fun, 0);
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) return cachedSetTimeout = setTimeout, 
        setTimeout(fun, 0);
        try {
            return cachedSetTimeout(fun, 0);
        } catch (e) {
            try {
                return cachedSetTimeout.call(null, fun, 0);
            } catch (e) {
                return cachedSetTimeout.call(this, fun, 0);
            }
        }
    }
    !function() {
        try {
            cachedSetTimeout = "function" == typeof setTimeout ? setTimeout : defaultSetTimout;
        } catch (e) {
            cachedSetTimeout = defaultSetTimout;
        }
        try {
            cachedClearTimeout = "function" == typeof clearTimeout ? clearTimeout : defaultClearTimeout;
        } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
        }
    }();
    var currentQueue, queue = [], draining = !1, queueIndex = -1;
    function cleanUpNextTick() {
        draining && currentQueue && (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, 
        queue.length && drainQueue());
    }
    function drainQueue() {
        if (!draining) {
            var timeout = runTimeout(cleanUpNextTick);
            draining = !0;
            for (var len = queue.length; len; ) {
                for (currentQueue = queue, queue = []; ++queueIndex < len; ) currentQueue && currentQueue[queueIndex].run();
                queueIndex = -1, len = queue.length;
            }
            currentQueue = null, draining = !1, function(marker) {
                if (cachedClearTimeout === clearTimeout) return clearTimeout(marker);
                if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) return cachedClearTimeout = clearTimeout, 
                clearTimeout(marker);
                try {
                    cachedClearTimeout(marker);
                } catch (e) {
                    try {
                        return cachedClearTimeout.call(null, marker);
                    } catch (e) {
                        return cachedClearTimeout.call(this, marker);
                    }
                }
            }(timeout);
        }
    }
    function Item(fun, array) {
        this.fun = fun, this.array = array;
    }
    function noop() {}
    process.nextTick = function(fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
        queue.push(new Item(fun, args)), 1 !== queue.length || draining || runTimeout(drainQueue);
    }, Item.prototype.run = function() {
        this.fun.apply(null, this.array);
    }, process.title = "browser", process.browser = !0, process.env = {}, process.argv = [], 
    process.version = "", process.versions = {}, process.on = noop, process.addListener = noop, 
    process.once = noop, process.off = noop, process.removeListener = noop, process.removeAllListeners = noop, 
    process.emit = noop, process.prependListener = noop, process.prependOnceListener = noop, 
    process.listeners = function(name) {
        return [];
    }, process.binding = function(name) {
        throw new Error("process.binding is not supported");
    }, process.cwd = function() {
        return "/";
    }, process.chdir = function(dir) {
        throw new Error("process.chdir is not supported");
    }, process.umask = function() {
        return 0;
    };
}, function(module, exports, __webpack_require__) {
    var result = __webpack_require__(121);
    module.exports = "string" == typeof result ? result : result.toString();
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(5)(!1)).push([ module.i, "#material .mdl-card__supporting-text {\n  width: initial;\n}\n.mdl-layout__header .mdl-textfield__label:after {\n  background-color: red !important;\n}\n.alternative-list .mdl-list {\n  max-width: 100%;\n  margin: 0;\n  padding: 0;\n}\n.alternative-list .mdl-list__item {\n  height: auto;\n}\n.alternative-list .mdl-list__item-primary-content {\n  height: auto !important;\n}\n.alternative-list .mdl-list__item-primary-content a {\n  display: inline-block;\n}\n.alternative-list .mdl-list__item-text-body {\n  height: auto !important;\n}\n.coverinfo .mdl-chip {\n  height: auto;\n}\n.coverinfo .mdl-chip .mdl-chip__text {\n  white-space: normal;\n  line-height: 24px;\n}\n.mdl-layout__content {\n  scrollbar-width: thin;\n}\n.mdl-layout__content::-webkit-scrollbar {\n  width: 10px !important;\n  background-color: #F5F5F5;\n}\n.mdl-layout__content::-webkit-scrollbar-thumb {\n  background-color: #c1c1c1 !important;\n}\na {\n  text-decoration: none;\n}\n.mdl-layout__tab-panel a:hover {\n  text-decoration: underline;\n}\n.mdl-cell {\n  background-color: #fefefe;\n}\n#material.simple-header .mdl-layout__header .mdl-layout__tab-bar-container {\n  display: none;\n}\n.newEp {\n  position: absolute;\n  background-color: #dedede;\n  height: 25px;\n  width: 29px;\n  top: 3px;\n  right: -4px;\n  background-repeat: no-repeat;\n  background-position: 4px 3px;\n  background-image: url(https://github.com/google/material-design-icons/blob/master/social/1x_web/ic_notifications_none_black_18dp.png?raw=true);\n}\n.searchItem {\n  text-decoration: none !important;\n  color: black;\n}\n#material .mdl-layout__tab {\n  cursor: pointer;\n}\n#material.settings-only .mdl-layout__header .mdl-layout__tab-bar-container,\n#material.pop-over .mdl-layout__header .mdl-layout__tab-bar-container {\n  display: none;\n}\n#material.settings-only #fixed-tab-5.mdl-layout__tab-panel {\n  display: block !important;\n}\n#characterList .loading {\n  background-color: #cdcdcd;\n  min-height: 196px;\n}\n.malImage.loading {\n  background-color: #cdcdcd;\n  padding-bottom: 133.33%;\n}\n#Mal-Sync-Popup #material-fullscreen {\n  display: none !important;\n}\n#Mal-Sync-Popup .settings-only #book.open .bookIcon {\n  display: none;\n}\n#Mal-Sync-Popup .settings-only #book.open .settingsIcon {\n  display: block !important;\n}\n#material a.button_edit {\n  text-decoration: none;\n  background-color: #efefef;\n  border-bottom: 1px solid #ebebeb;\n  font-size: 10px;\n  line-height: 1em;\n  margin: 0;\n  opacity: 1;\n  padding: 2px 4px;\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: all;\n  transition-property: all;\n  -webkit-transition-timing-function: ease-in-out;\n  transition-timing-function: ease-in-out;\n  display: inline-block;\n  font-family: Avenir, lucida grande, tahoma, verdana, arial, sans-serif;\n  height: 9px;\n}\n#material a.button_edit.reading,\n#material a.button_edit.watching {\n  background-color: #2db039;\n  color: #fff;\n}\n#material a.button_edit.reading:hover,\n#material a.button_edit.watching:hover {\n  opacity: 0.7;\n}\n#material a.button_edit.plantoread,\n#material a.button_edit.plantowatch {\n  background-color: #c3c3c3;\n  color: #fff;\n}\n#material a.button_edit.plantoread:hover,\n#material a.button_edit.plantowatch:hover {\n  opacity: 0.7;\n}\n#material a.button_edit.completed {\n  background-color: #26448f;\n  color: #fff;\n}\n#material a.button_edit.completed:hover {\n  opacity: 0.7;\n}\n#material a.button_edit.on-hold {\n  background-color: #f1c83e;\n  color: #fff;\n}\n#material a.button_edit.dropped {\n  background-color: #a12f31;\n  color: #fff;\n}\n#material a.button_edit.dropped:hover {\n  opacity: 0.7;\n}\n#material #contributer {\n  padding: 15px;\n  padding-bottom: 0;\n}\n#material #contributer .group {\n  display: none;\n  text-transform: uppercase;\n  font-size: 12px;\n  padding: 5px 0px;\n  font-weight: bold;\n  color: #707070;\n  opacity: 0;\n  -webkit-transition: 1s;\n  -o-transition: 1s;\n  transition: 1s;\n}\n#material #contributer .user {\n  height: 40px;\n  display: inline-block;\n  white-space: nowrap;\n  overflow: hidden;\n}\n#material #contributer .user .image {\n  position: relative;\n  vertical-align: middle!important;\n  display: inline-block;\n  height: 32px;\n  width: 32px;\n  margin-right: 10px;\n  border-radius: 50%;\n  overflow: hidden;\n  border: 1px solid #e0e0e0;\n}\n#material #contributer .user .image .gif {\n  position: absolute;\n  display: none;\n}\n#material #contributer .user .text {\n  vertical-align: middle!important;\n  display: none;\n  line-height: 100%;\n}\n#material #contributer .user.pop .image {\n  background-color: #3f51b5;\n}\n#material #contributer .discord {\n  display: none;\n}\n#material #contributer .inline-block {\n  display: inline-block;\n}\n#material #contributer.open {\n  padding-bottom: 15px;\n}\n#material #contributer.open .group {\n  opacity: 1;\n  display: block;\n}\n#material #contributer.open .user {\n  display: block;\n}\n#material #contributer.open .user .image .gif {\n  display: block;\n}\n#material #contributer.open .user .text {\n  display: inline-block;\n}\n#material #contributer.open .user.pop {\n  display: none;\n}\n#material #contributer.open .discord {\n  display: block;\n}\n#material #contributer.open .inline-block {\n  display: block;\n}\n", "" ]);
}, function(module, exports, __webpack_require__) {
    var result = __webpack_require__(123);
    module.exports = "string" == typeof result ? result : result.toString();
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(5)(!1)).push([ module.i, ".site-theme-dark .nextStream img,\n.entry-card .nextStream img,\n.site-theme-dark .resumeStream img,\n.entry-card .resumeStream img {\n  filter: invert(100%);\n}\n.entry-card .mal-sync-stream {\n  position: absolute;\n  max-height: 17px !important;\n  left: 7px;\n  top: -17px;\n  background: rgba(var(--color-overlay), 0.8);\n  border-radius: 100% 100% 0 0;\n}\n.entry-card .mal-sync-stream img {\n  padding: 5px;\n  padding-top: 7px;\n}\n.entry-card .nextStream,\n.entry-card .resumeStream {\n  position: absolute;\n  max-height: 17px !important;\n  right: 7px;\n  top: -15px;\n  margin-right: 0px !important;\n  background: rgba(var(--color-overlay), 0.8);\n  border-radius: 100% 100% 0 0;\n}\n.entry-card .nextStream img,\n.entry-card .resumeStream img {\n  margin: 5px;\n  margin-top: 7px;\n}\n", "" ]);
}, function(module, exports, __webpack_require__) {
    var result = __webpack_require__(125);
    module.exports = "string" == typeof result ? result : result.toString();
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(5)(!1)).push([ module.i, "", "" ]);
} ]);