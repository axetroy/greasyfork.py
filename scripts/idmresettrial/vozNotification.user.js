// ==UserScript==
// @name         vozNotification
// @version      2018.09.11.01
// @description  Tính năng: Gửi thông báo tới người được quote, thông báo khi có bài mới trong chủ đề đánh dấu, khi người khác quote bài, và kèm theo âm báo.
// @author       idmresettrial
// @namespace    idmresettrial
// @grant        GM_getResourceURL
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery.touchswipe/1.6.18/jquery.touchSwipe.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery.textcomplete/1.8.0/jquery.textcomplete.min.js
// @resource     soundURL http://bit.ly/vozNotificattionSound
// @resource     logoURL https://i.imgur.com/5l2ozMo.png
// @resource     logoURL2 http://bit.ly/vozNotificationDesktopLogo
// @icon         https://i.imgur.com/5l2ozMo.png
// @include      /^https?://forums\.voz\.vn/.*$/
// @connect      forums.voz.vn
// @run-at       document-start
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);
// Do not run on frames or iframes
if (window.top !== window.self) {
    return;
}
var noNewPMconfirm = '<script>function confirm(str) {return 0;} </script>';
$('head').append(noNewPMconfirm);
document.addEventListener('DOMContentLoaded', function () {

    var username = $('body').find('strong:contains("Welcome") a').html();
    var str_array_1to20 = '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]';

    if (typeof username !== "undefined") {

        var userid = $('body').find('strong:contains("Welcome") a').attr('href').match(/[0-9]+/) [0];
        var sQuery = (parseInt(GM_getValue('optHashtag', 0)) === 1) ? ('#notify' + userid)  : username;
        var DB_postID = parseInt(GM_getValue('DB_postID', 0));

        // emoticons table
        var emoticons = [":sweat:", ":chaymau:", ":go:", ":shame:", ":canny:", ":sogood:", ":sexy:", ":byebye:", ":look_down:", ":stick:", ":adore:", ":nosebleed:", ":beauty:", ":gach:", ":\">", ":sosad:", ":surrender:", ":pudency:", ":dribble:", ":waaaht:", ":oh:", ":((", ":aboom:", "^:)^", ":shot:", ":hungry:", ":rap:", ":hang:", ":*", ":ops:", ":)", ":plaster:", ":tire:", ":badsmell:", ":brick:", ":kool:", ":hell_boy:", ":lmao:", ":bye:", ":phone:", ":sure:", ":ot:", ":flame:", ":bang:", ":sad:", ":hug:", ":fix:", ":amazed:", "-_-", ":shitty:", ":what:", ":cheers:", ":theft:", ":spam:", ":ah:", ":rofl:", ":baffle:", ":choler:", ":doubt:", ":capture:", ":confident:", ":smoke:", ":D", ":matrix:", ":haha:", ":hehe:", ":spiderman:", ":angry:", ":sos:", ":mage:", ":boss:", ":dreaming:", ":-s", ":bike:", ":misdoubt:", ":shit:", ":lovemachine:", ":runrun:", ":loveyou:", ":stupid:", ":ban:", ":doublegun:", ":boom:", ":lol:", ":welcome:", ":please:", ":puke:", ":shoot1:", ":no:", ":yes:", ":Birthday:", ":band:", ":winner:", ":+1:", ":grin:", ":frown:", ":mad:", ":p", ":embrass:", ":confused:", ";)", ":rolleyes:", ":cool:", ":eek:"];
        var imgs = ["/images/smilies/Off/sweat.gif", "/images/smilies/Off/nosebleed.gif", "/images/smilies/Off/go.gif", "/images/smilies/Off/shame.gif", "/images/smilies/Off/canny.gif", "/images/smilies/Off/feel_good.gif", "/images/smilies/Off/sexy_girl.gif", "/images/smilies/Off/byebye.gif", "/images/smilies/Off/look_down.gif", "/images/smilies/Off/burn_joss_stick.gif", "/images/smilies/Off/adore.gif", "/images/smilies/Off/nosebleed.gif", "/images/smilies/Off/beauty.gif", "images/smilies/brick.png", "/images/smilies/Off/embarrassed.gif", "/images/smilies/Off/too_sad.gif", "/images/smilies/Off/surrender.gif", "/images/smilies/Off/pudency.gif", "/images/smilies/Off/dribble.gif", "/images/smilies/Off/waaaht.gif", "/images/smilies/Off/oh.gif", "/images/smilies/Off/cry.gif", "/images/smilies/Off/after_boom.gif", "/images/smilies/Off/lay.gif", "/images/smilies/Off/beat_shot.gif", "/images/smilies/Off/hungry.gif", "/images/smilies/Off/rap.gif", "/images/smilies/Off/hang.gif", "/images/smilies/Off/sweet_kiss.gif", "/images/smilies/Off/ops.gif", "/images/smilies/Off/smile.gif", "/images/smilies/Off/beat_plaster.gif", "/images/smilies/Off/tire.gif", "/images/smilies/Off/bad_smelly.gif", "/images/smilies/Off/beat_brick.gif", "/images/smilies/Off/cool.gif", "/images/smilies/Off/hell_boy.gif", "/images/smilies/Off/lmao.gif", "/images/smilies/Off/bye.gif", "/images/smilies/Off/phone.gif", "/images/smilies/Off/sure.gif", "/images/smilies/Off/ot.gif", "/images/smilies/Off/flame.gif", "/images/smilies/Off/bang.gif", "/images/smilies/Off/sad.gif", "/images/smilies/Off/hug.gif", "/images/smilies/Off/fix.gif", "/images/smilies/Off/amazed.gif", "/images/smilies/Off/sleep.gif", "/images/smilies/Off/shit.gif", "/images/smilies/Off/what.gif", "/images/smilies/Off/cheers.gif", "/images/smilies/Off/theft.gif", "/images/smilies/Off/spam.gif", "/images/smilies/Off/ah.gif", "/images/smilies/Off/rofl.gif", "/images/smilies/Off/baffle.gif", "/images/smilies/Off/choler.gif", "/images/smilies/Off/doubt.gif", "/images/smilies/Off/capture.gif", "/images/smilies/Off/confident.gif", "/images/smilies/Off/smoke.gif", "/images/smilies/Off/big_smile.gif", "/images/smilies/Off/matrix.gif", "/images/smilies/Off/haha.gif", "/images/smilies/Off/hehe.gif", "/images/smilies/Off/spiderman.gif", "/images/smilies/Off/angry.gif", "/images/smilies/Off/sos.gif", "/images/smilies/Off/mage.gif", "/images/smilies/Off/boss.gif", "/images/smilies/Off/still_dreaming.gif", "/images/smilies/Off/confuse.gif", "/images/smilies/Off/bike.gif", "/images/smilies/Off/misdoubt.gif", "/images/smilies/emos/shit.gif", "/images/smilies/emos/lovemachine.gif", "/images/smilies/Off/runrun.gif", "/images/smilies/emos/loveyou.gif", "/images/smilies/emos/stupid.gif", "/images/smilies/Off/bann.gif", "/images/smilies/emos/doublegun.gif", "/images/smilies/emos/boom.gif", "/images/smilies/emos/lol.gif", "/images/smilies/Off/welcome.gif", "/images/smilies/Off/please.gif", "/images/smilies/emos/puke.gif", "/images/smilies/emos/shoot1.gif", "/images/smilies/emos/no.gif", "/images/smilies/emos/yes.gif", "/images/smilies/emos/Birthday.gif", "/images/smilies/emos/band.gif", "/images/smilies/emos/winner.gif", "http://www.google.com/+1/button/images/icon.png", "/images/smilies/biggrin.gif", "/images/smilies/frown.gif", "/images/smilies/mad.gif", "/images/smilies/tongue.gif", "/images/smilies/redface.gif", "/images/smilies/confused.gif", "/images/smilies/wink.gif", "/images/smilies/rolleyes.gif", "/images/smilies/cool.gif", "/images/smilies/eek.gif"];

        clearFirstLaunch();

        add_style();
        add_SettingMenu();
        add_QuickSearch();

        sync_last20viewedQuotes();
        QuoteViewMonitor();
        subThreadsViewMonitor();
        tabFocusMonitor();

        setTimeout(function () {
            getUserNotifications();
            QuoteSearch();
            clickThreadTitleGoUnread();
            waitSendQuoteMsg();
            detectQuoteMsg();
        }, 1000);

        quickQuote();
        smartTyping();
        hotkey();
        enableLogout();
    }

    function enableLogout()
    {
        $('a[href^="login.php?do=logout"]').click(function () {
            window.location.href = $(this).attr('href');
        });
    }

    function clearFirstLaunch()
    {
        if (GM_getValue("firstlaunch", 1)) {
            GM_setValue("firstlaunch", 0);
            setTimeout(function() { showMsg("#otherMsg", "vozNotification: let a new world begin, now and here...", 5000); }, 5000);
        }
    }

    function clickThreadTitleGoUnread() {
        var url = /(subscription|usercp|forumdisplay)\.php/i;
        if (url.test(window.location.href) === true && parseInt(GM_getValue('optGoUnread', '1'))) {
            $('a[id^="thread_title_"]').each(function () {
                $(this).attr('href', $(this).attr('href') + '&goto=newpost');
            });
        }
    }
    function getUserNotifications() {
        var newPM = [];
        var newThread = [];
        var optSubThreadsCheck = (parseInt(GM_getValue("optSubThreadsCheck", 0)) === 1);

        $.ajax({
            url: 'usercp.php',
            type: 'GET',
            cache: false,
            success: function (data) {

                newPM.last = GM_getValue('newPrivateMessages', '');
                newPM.title = $(data).find('a[href^="private.php?do=showpm&pmid="]:first strong').text();
                newPM.url = $(data).find('a[href^="private.php?do=showpm&pmid="]:first').attr('href');
                newPM.pmid = (newPM.title.length) ? parseInt(newPM.url.match(/pmid=([0-9]+)/) [1])  : 0;

                newThread.title = "";

                if (!optSubThreadsCheck) {
                    newThread.last = GM_getValue('newSubscribedThreads', '');
                    newThread.title = $(data).find('a[id^="thread_title_"]:first').text();
                    newThread.url = $(data).find('a[id^="thread_title_"]:first').attr('href') + '&goto=newpost';
                    gotData();
                } else {

                    var subThreads = GM_getValue('subThreads',{});
                    var subThreadsList = GM_getValue('subThreadsList',[]); // list subscribed threads in a list in which the last thread checked is located at latest position

                    if (Object.keys(subThreads).length) {

                        var checkThread = subThreadsList[0];

                        subThreadsList.splice(0, 1);
                        subThreadsList.push(checkThread);
                        GM_setValue('subThreadsList', subThreadsList);
                        // enter page to check
                        (function() {
                            var thread = subThreads[checkThread];
                            var pageURL = "showthread.php?p={p}#post{p}".replace(/{p}/g, thread.lastViewedPost);
                            $.ajax({
                                url: pageURL,
                                type: 'GET',
                                cache: false,
                                success: function (data) {
                                    var currentPage = $(data).find('.voz-post-message');
                                    var bottomPost = $(currentPage[currentPage.length - 1]).attr('id').match(/\d+/)[0];

                                    var pageInfo = $(data).find('div.pagenav > table > tbody > tr > td.vbmenu_control');
                                    pageInfo = pageInfo.length? pageInfo[0].innerHTML.match(/(\d+) of (\d+)/) : [null, 1, 1];
                                    pageInfo = [ pageInfo[1], pageInfo[2] ];

                                    if ( parseInt(thread["lastViewedPost"]) < parseInt(bottomPost) ) {
                                        var newPost = parseInt($(data).find('a[id="postcount' + thread["lastViewedPost"] + '"] strong').html().match(/\d+/)) + 1;
                                        newPost = $(data).find('a[id^="postcount"][name="' + newPost + '"]').attr("id").match(/\d+/)[0];

                                        newThread.title = thread.title;
                                        newThread.url = "https://forums.voz.vn/showthread.php?p={p}#post{p}".replace(/{p}/g, newPost);
                                        subThreads[checkThread]["url"] = newThread.url;
                                        subThreads[checkThread]["new"] = true;
                                    } else {
                                        if ( parseInt(pageInfo[0]) < parseInt(pageInfo[1]) ) {
                                            newThread.title = thread.title;
                                            newThread.url = "https://forums.voz.vn/showthread.php?t=" + checkThread + "&page=" + (parseInt(pageInfo[0])+1);
                                            subThreads[checkThread]["url"] = newThread.url;
                                            subThreads[checkThread]["new"] = true;
                                        } else {
                                            subThreads[checkThread]["new"] = false;
                                        }
                                    }
                                    GM_setValue('subThreads',subThreads);
                                    gotData();
                                }
                            });
                        })();

                    } else { console.log('Nothing to see'); }

                }

                function gotData() {

                    if (newPM.title.length) {

                        var divID = '#newPrivateMessages';
                        if (newPM.title.indexOf('Bạn được nhắc đến ở thread:') === 0 && (/\[post=[0-9]+\]/).test(newPM.title)) {
                            var postID = parseInt(newPM.title.match(/\[post=([0-9]+)\]/) [1]);
                            if (wasThisQuoteViewed(postID) && false) {
                                divID = null;
                                deleteMsg(newPM.pmid);
                            } else {
                                divID = '#newQuote';
                                newPM.title = newPM.title.replace(/\s\s+/gi," ");
                            }
                        }
                        if (divID !== null) {
                            showMsg(divID, [ newPM.url, newPM.title ], 0);
                        }
                    }
                    if (newThread.title.length) {
                        showMsg('#newSubscribedThreads', [ newThread.url, newThread.title ], 0);
                    } else $('#newSubscribedThreads').hide("slide", {duration: 'right'});

                    GM_setValue('newPrivateMessages', newPM.pmid);
                    GM_setValue('newSubscribedThreads', newThread.title);
                }
            }
        });
        setTimeout(function () {
            getUserNotifications();
        }, optSubThreadsCheck? 5000 : 60000);
    }
    function waitSendQuoteMsg() {
        var firstClickSubmit = 1;
        $('form[name="vbform"],form#message_form').submit(function (event) {
            var clicked = $('input[type="submit"]:focus');
            var postMsg = $('form[name="vbform"] textarea').val();
            var optSendQuoteMsg = (parseInt(GM_getValue('optSendQuoteMsg', '1')) === 1);
            var optHideIMG = (parseInt(GM_getValue('optHideIMG', '1')) === 1);
            if (clicked.attr('name') === 'sbutton') {
                if (window.location.href.indexOf('https://forums.voz.vn/private.php') === - 1) {
                    if (optSendQuoteMsg || optHideIMG) {
                        var sendTo = [
                        ];
                        var quoteTag = /(\[QUOTE=|@)([^;:]+)[;:]/gi;
                        var quotePerson = quoteTag.exec(postMsg);
                        var quoteTags = /\[quote[^]*?\[\/quote\]/gi;
                        var quoteHaveImg = quoteTags.test(postMsg);
                        while (quotePerson !== null) {
                            if (sendTo.indexOf(quotePerson[2]) === - 1) {
                                sendTo.push(quotePerson[2]);
                            }
                            quotePerson = quoteTag.exec(postMsg);
                        }
                        if (sendTo.length || quoteHaveImg) {
                            if (firstClickSubmit) {
                                event.preventDefault();
                                var html = '<div id="beforeSubmit" style="display:none; margin-top:10px"></div>';
                                clicked.parent().parent().append(html);
                                if (quoteHaveImg && optHideIMG) {
                                    $('#beforeSubmit').append('<span>Không hiện ảnh trong trích dẫn: </span>');
                                    $('#beforeSubmit').append('<input type="checkbox" name="hideIMG" checked>');
                                    $('#beforeSubmit').append('<br>');
                                }
                                if (sendTo.length && optSendQuoteMsg) {
                                    $('#beforeSubmit').append('<span>Gửi thông báo quote bài tới: </span>');
                                    $('#beforeSubmit').append('');
                                    var autoCheck = (parseInt(GM_getValue('optQuotedChecked', '0')) === 1) ? ' checked' : '';
                                    $.each(sendTo, function (index, value) {
                                        $('#beforeSubmit').append('<label for="' + value + '"><input type="checkbox" name="sendTo[]" id="' + value + '" value="' + value + '"' + autoCheck + '>' + value + '</label> ');
                                    });
                                }
                                $('#beforeSubmit').show('blind', 200);
                                firstClickSubmit = 0;
                            } else {
                                var hideIMGchecked = $('input[name="hideIMG"]:checked');
                                var sendToChecked = $('input[name="sendTo[]"]:checked');
                                if (sendToChecked.length) {
                                    var sendTo = [
                                    ];
                                    sendToChecked.each(function () {
                                        sendTo.push($(this).attr('value'));
                                    });
                                    GM_setValue('prepareQuoteMsg', sendTo.join(';'));
                                }
                                // remove [img] inside [quote]

                                if (hideIMGchecked.length) {
                                    quoteTags = postMsg.match(quoteTags);
                                    $.each(quoteTags, function (i, quoteTag) {
                                        var quoteTag0 = quoteTag;
                                        quoteTag = quoteTag.replace(/\[img\]/gi, '\n').replace(/\[\/img\]/gi, ' (ảnh)\n');
                                        postMsg = postMsg.replace(quoteTag0, quoteTag);
                                    });
                                }
                                // insert hashtag

                                if (parseInt(GM_getValue('optHashtag', 0)) === 1) {
                                    var hashtagBBcode = new RegExp('(\n)*\\[COLOR="Gray"\\]' + sQuery + '\\[\\/COLOR\\]', 'gi');
                                    if (hashtagBBcode.test(postMsg)) {
                                        postMsg = postMsg.replace(hashtagBBcode, '');
                                    }
                                    postMsg += '\n[COLOR="Gray"]' + sQuery + '[/COLOR]';
                                }
                                // update text editor before submiting

                                $('form[name="vbform"] textarea').val(postMsg);
                            }
                        }
                    }
                } else {
                    // when clicking submit button at private.php page
                    var lastSendMsg = new Date().getTime();
                    GM_setValue('lastSendMsg', lastSendMsg);
                }
            }
            return;
        });
        if (GM_getValue('prepareQuoteMsg', null) !== null) {
            if ($('td.tcat:contains("The following errors occurred with your submission:")').length === 0) {
                var post = window.location.href.match(/post([0-9]+)/) [1];
                var title = 'Bạn được nhắc đến ở thread: ' + $('td[class="navbar"] strong').text().replace(/\s\s+/gi," ") + '[post=' + post + ']';
                var msg = '[B]Xem chi tiết: ' + 'https://forums.voz.vn/showthread.php?p=' + post + '#post' + post + '[/B]';
                msg += '\n__________________';
                msg += '\n[I]Đây là thông báo tự động tạo bởi [URL="http://bit.ly/vozNotification"]vozNotification[/URL]. Xin vui lòng không reply lại tin này -.-[/I]';
                var QuoteMsgList = JSON.parse(GM_getValue('QuoteMsgList', '[]'));
                QuoteMsgList.push({
                    sendTo: GM_getValue('prepareQuoteMsg'),
                    title: title,
                    msg: msg
                });
                GM_setValue('QuoteMsgList', JSON.stringify(QuoteMsgList));
            }
            GM_setValue('prepareQuoteMsg', null);
        }
        if (JSON.parse(GM_getValue('QuoteMsgList', '[]')).length) {
            processQuoteMsgList();
        }
    }
    function processQuoteMsgList() {
        if (JSON.parse(GM_getValue('QuoteMsgList', '[]')).length) {
            var lastSendMsg = GM_getValue('lastSendMsg', 0);
            var now = new Date().getTime();
            var QuoteMsgList = JSON.parse(GM_getValue('QuoteMsgList'));
            var sendMe = QuoteMsgList[0];
            if ((now - lastSendMsg) > 60000) {
                sendMsg(sendMe.sendTo, sendMe.title, sendMe.msg);
                QuoteMsgList.splice(0, 1);
                GM_setValue('QuoteMsgList', JSON.stringify(QuoteMsgList));
                setTimeout(function () {
                    processQuoteMsgList();
                }, 60000);
            } else {
                var wait = (60000 - (now - lastSendMsg));
                showMsg('#otherMsg', 'Đang đợi gửi thông báo quote...', wait);
                setTimeout(function () {
                    processQuoteMsgList();
                }, wait);
            }
        }
    }
    function detectQuoteMsg() {
        $('a[href^="private.php?do=showpm&pmid"]:contains("Bạn được nhắc đến ở thread:")').each(function () {
            var filter = /\[post=([0-9]+)\]/;
            if (filter.test($(this).html())) {
                var postID = $(this).html().match(filter) [1];
                $(this).html($(this).html().replace(filter, ''));
                $(this).attr('href', $(this).attr('href') + '&post=' + postID);
            }
        });
        $('#vozNotification a, a[href^="private.php"][href*="post="]').click(function (e) {
            e.preventDefault();
            var url = $(this).attr('href');
            if (url.indexOf('private.php') === 0) {
                if (url.indexOf('post=') !== - 1) {
                    var pmid = $(this).attr('href').match(/pmid=([0-9]+)/) [1];
                    var postID = url.match(/post=([0-9]+)/) [1];
                    var url = 'showthread.php?p=' + postID + '#post' + postID;
                    deleteMsg(pmid);
                }
            } else {
                if ($(this).html().indexOf('Bạn được nhắc đến ở thread: ') === 0) {
                    var last20quotes = JSON.parse(GM_getValue('last20quotes', '[]'));
                    last20quotes[0].unRead = - 1;
                    GM_setValue('last20quotes', JSON.stringify(last20quotes));
                }
            }
            $(this).parent().parent().hide('slide', {
                direction: 'right'
            }, 500, function () {
                window.location.href = url;
            });
        });
    }
    function deleteMsg(pmid) {
        var data = {
            do : 'managepm',
            dowhat: 'delete',
            securitytoken: unsafeWindow.SECURITYTOKEN
        };
        data['pm[' + pmid + ']'] = true;
        $.ajax({
            type: 'POST',
            url: 'private.php?do=managepm&amp;dowhat=delete&amp;pmid=' + pmid,
            data: data,
            success: function () {
            }
        });
    }
    function sendMsg(sendTo, title, msg) {
        GM_xmlhttpRequest({
            method: 'POST',
            url: '/private.php?do=insertpm&pmid=',
            data: 'recipients=' + sendTo + '&title=' + title + '&message=' + msg + '&savecopy=0&signature=0&parseurl=1&securitytoken=' + unsafeWindow.SECURITYTOKEN + '&do=insertpm&sbutton=Submit+Message',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function (data) {
                data = data.responseText;
                var lastSendMsg = new Date().getTime();
                GM_setValue('lastSendMsg', lastSendMsg);
                var msg = $(data).find('.tcat:contains("The following errors occurred with your submission:")').length ? 'Không thể gửi thông báo' : 'Đã gửi thông báo cho người được quote biết';
                showMsg('#otherMsg', msg, 2000);
            }
        });
    }
    function showMsg(id, str, hide) {

        if ($('#vozNotification').length === 0) {
            $('body').append('<div id="vozNotification"></div>');
            $('#vozNotification').append('<div class="floatRight"><div class="showMsg" id="newPrivateMessages"></div></div>');
            $('#vozNotification').append('<div class="floatRight"><div class="showMsg" id="newQuote"></div></div>');
            $('#vozNotification').append('<div class="floatRight"><div class="showMsg" id="newSubscribedThreads"></div></div>');
            $('#vozNotification').append('<div class="floatRight"><div class="showMsg" id="otherMsg"></div></div>');
        }

        if (id === '#otherMsg') {
            $(id).html(str);
        } else {
            var logoURL = GM_getResourceURL('logoURL');
            var info = '<div class="logoWrapper"><a id="tinmoi" href="usercp.php"><img id="logo" class="vozNotification" src="' + logoURL + '"></a></div>';
            var accesskey = {
                '#newPrivateMessages': 'm',
                '#newQuote': 'q',
                '#newSubscribedThreads': 't'
            };
            if (id === "#newQuote") {
                var filter = /\[post=([0-9]+)\]/;
                if (filter.test(str[1])) {
                    var postID = str[1].match(filter) [1];
                    str[0] += '&post=' + postID;
                    str[1] = str[1].replace(/\[post=([0-9]+)\]/,"");
                }
            }
            $(id).html(info + '<div class="titleWrapper"><a accesskey="' + accesskey[id] + '" href="' + str[0] + '">' + str[1] + '</a>' +
                       '<div class="button" >[x]</div>'
                       + '</div>');
        }

        // In-site Notification

        $(id).hide('slide', {direction: 'right'}, 500, function() {
            $(this).show('slide', {
                direction: 'right'
            }, 500, function () {

                detectQuoteMsg();

                if (!document.hidden) setDesktopNotifyTime(0);

                $('#vozNotification .button').click(function () {
                    $("#" + $(this).parent().parent().attr('id')).hide('slide', {direction: 'right'});
                });

                if (hide > 0) {
                    setTimeout(function () {
                        $(id).stop().hide('slide', {
                            direction: 'right'
                        }, 500);
                    }, hide);
                }
            });
        });

        // Desktop Notification
        if (document.hidden && parseInt(GM_getValue('optNotifyDesktop', '1')) && id !== "#otherMsg" ) {
            var desktop_notify_time = JSON.parse(GM_getValue("desktop_notify_time", '{"msg": 0, "sound": 0}'));
            var delta_time = { msg: Date.now() - desktop_notify_time.msg, sound: Date.now() - desktop_notify_time.sound };

            if ( delta_time.msg >= 0 ) {
                setDesktopNotifyTime(delta_time.sound < 0);
                showMsg2(str[1], str[0], id, (delta_time.sound >= 0));
            }
        }

        // Notify on document's title
        if (parseInt(GM_getValue('optNotifyTitle', '1'))) {
            $('head').append('<link rel="icon" href="' + GM_getResourceURL('logoURL') + '" type="image/png">');
            $(window).on('beforeunload', function () {
                $('head').append('<link rel="icon" href="/favicon.ico" type="image/ico">');
                return undefined;
            });
        }
    }

    function showMsg2(title, url, id, withSound) {
        // Creating desktop notification when tab has lost focus
        function createMsg2(msg) {

            // sound
            if ( withSound && parseInt(GM_getValue('optSound', '1')) ) {
                var audio = document.createElement("audio");
                audio.setAttribute("src",GM_getResourceURL('soundURL').replace("data:application;base64","data:audio/mp3;base64"));
                audio.play();
            }

            var n = new Notification(msg.title, msg.option);

            n.onclick = function() {
                n.close();
                window.focus();
                //$(id).find('a').click();
            };
            setTimeout(n.close.bind(n),15000);
        }

        //msg = {title: "", option: { tag: id, body: title, url: url, icon: GM_getResourceURL('logoURL') } };
        msg = {title: "@"+username+":", option: { tag: "#vozNotification", body: "Bạn có thông báo mới chưa xem.", url: url, icon: GM_getValue('desktopLogo', "") || GM_getResourceURL('logoURL2') } };

        if (!("Notification" in window)) {
            //console.log("vozNotification: This browser does not support system notifications");
        }

        else if (Notification.permission === "granted") {
            createMsg2(msg);
        }

        else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                if (permission === "granted") {
                    createMsg2(msg);
                }
            });
        }
    }    

    function setDesktopNotifyTime(keepSoundTime) {
        try {
            var now = Date.now();
            var desktop_notify_time = JSON.parse(GM_getValue("desktop_notify_time", '{"msg": 0, "sound": 0}'));
            GM_setValue("desktop_notify_time", JSON.stringify({
                msg: now+300000,
                sound: keepSoundTime ? desktop_notify_time.sound : now+900000
            }));
        } catch (err) { console.log(err); }
    }

    function add_SettingMenu() {
        var thongbao = $('td.vbmenu_control a[href="faq.php"]');
        thongbao.attr('id', 'thongbao');
        thongbao.attr('rel', 'thongbao');
        thongbao.html('Thông báo');
        var html = '<div class="vbmenu_popup" id="thongbao_menu" style="display:none;margin-top:3px" align="left">';
        html += '<table cellpadding="4" cellspacing="1" border="0" style="min-width:200px;">';
        html += '<tr><td class="thead">Tùy chọn vozNotification</td></tr>';
        html += '<tr>';
        html += '<td class="vbmenu_option" title="nohilite">Dùng hashtag để nhận thông báo quote:&nbsp;<div style="float:right;"><input type="radio" name="optHashtag" id="optHashtag1" value=1 /><label for="optHashtag1">bật</label><input type="radio" id="optHashtag0" name="optHashtag" value=0 /><label for="optHashtag0">tắt</label></div></td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td class="vbmenu_option" title="nohilite">Âm báo:&nbsp;<div style="float:right;"><input type="radio" name="optSound" id="optSound1" value=1 /><label for="optSound1">bật</label><input type="radio" id="optSound0" name="optSound" value=0 /><label for="optSound0">tắt</label></div></td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td class="vbmenu_option" title="nohilite">Thông báo ở thanh tiêu đề:&nbsp;<div style="float:right;"><input type="radio" name="optNotifyTitle" id="optNotifyTitle1" value=1 /><label for="optNotifyTitle1">bật</label><input type="radio" id="optNotifyTitle0" name="optNotifyTitle" value=0 /><label for="optNotifyTitle0">tắt</label></div></td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td class="vbmenu_option" title="nohilite">Thông báo trên desktop khi tab ẩn :&nbsp;<div style="float:right;"><input class="bginput" id="txtDesktopLogo" size="20" type="text" placeholder="Nhập URL ảnh"><input id="btn_set_desktopLogo" class="button" value="Đặt ảnh" type="button"><input type="radio" name="optNotifyDesktop" id="optNotifyDesktop1" value=1 /><label for="optNotifyDesktop1">bật</label><input type="radio" id="optNotifyDesktop0" name="optNotifyDesktop" value=0 /><label for="optNotifyDesktop0">tắt</label></div></td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td class="vbmenu_option" title="nohilite">Gửi thông báo quote bài:&nbsp;<div style="float:right;"><input type="radio" name="optSendQuoteMsg" id="optSendQuoteMsg1" value=1 /><label for="optSendQuoteMsg1">bật</label><input type="radio" name="optSendQuoteMsg" id="optSendQuoteMsg0" value=0 /><label for="optSendQuoteMsg0">tắt</label></div></td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td class="vbmenu_option" title="nohilite">Không hiện ảnh trong trích dẫn:&nbsp;<div style="float:right;"><input type="radio" name="optHideIMG" id="optHideIMG1" value=1 /><label for="optHideIMG1">bật</label><input type="radio" name="optHideIMG" id="optHideIMG0" value=0 /><label for="optHideIMG0">tắt</label></div></td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td class="vbmenu_option" title="nohilite">Đến bài chưa đọc đầu tiên khi click tiêu đề:&nbsp;<div style="float:right;"><input type="radio" name="optGoUnread" id="optGoUnread1" value=1 /><label for="optGoUnread1">bật</label><input type="radio" name="optGoUnread" id="optGoUnread0" value=0 /><label for="optGoUnread0">tắt</label></div></td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td class="vbmenu_option" title="nohilite">Tự kiểm tra bài mới trong thớt đã theo dõi:&nbsp;<div style="float:right;">[ <a href="https://forums.voz.vn/usercp.php?app=vozNotification">Quản lý</a> ]<input type="radio" name="optSubThreadsCheck" id="optSubThreadsCheck1" value=1 /><label for="optSubThreadsCheck1">bật</label><input type="radio" name="optSubThreadsCheck" id="optSubThreadsCheck0" value=0 /><label for="optSubThreadsCheck0">tắt</label></div></td>';
        html += '</tr>';        
        html += '<tr>';
        html += '<td class="vbmenu_option" title="nohilite">Đồng bộ thông báo quote tới post ID:&nbsp;<div style="float:right;"><input class="bginput" id="txtDB_postID" size="10" type="text"><input id="btn_set_DB_postID" class="button" value="OK" type="button">&nbsp;<input id="btn_about_DB_postID" class="button" value="?" type="button"></div></td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td class="vbmenu_option" title="nohilite"><div style="float:right;">Tự tích vào người được quote:&nbsp;<input type="radio" name="optQuotedChecked" id="optQuotedChecked1" value=1 /><label for="optQuotedChecked1">bật</label><input type="radio" name="optQuotedChecked" id="optQuotedChecked0" value=0 /><label for="optQuotedChecked0">tắt</label></div>' +
            '<div style="float:right;">Max-width của thông báo:&nbsp;<input class="bginput" id="txtNotifyWidth" size="10" type="text"><input id="btn_set_NotifyWidth" class="button" value="OK" type="button">&nbsp;</div></td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td class="vbmenu_option" title="nohilite"><div id="reset_factory">Khôi phục cài đặt gốc</div></td>';
        html += '</tr>';
        html += '</table>';
        html += '</div>';
        $('body').append(html);
        thongbao.parent().append('<script type="text/javascript"> vbmenu_register("thongbao"); </script>');
        $('#thongbao_menu input[name^="opt"]').each(function () {
            value0 = ($(this).attr('name') === 'optHashtag' || $(this).attr('name') === 'optQuotedChecked' || $(this).attr('name') === 'optSubThreadsCheck') ? 0 : 1;
            $(this).filter('[value=' + GM_getValue($(this).attr('name'), value0) + ']').attr('checked', '1');
        });
        $('#thongbao_menu input[name^="opt"]').click(function () {
            GM_setValue($(this).attr('name'), $(this).val());
        });
        $('#thongbao_menu #btn_set_DB_postID').click(function () {
            GM_setValue('DB_postID', $('#txtDB_postID').val());
            alert('Thông báo quote sẽ được đồng bộ vào post ID ' + $('#txtDB_postID').val());
            location.reload();
        });
        $('#thongbao_menu #btn_about_DB_postID').click(function () {
            var DB_post = GM_getValue('DB_postID', 0);
            if (DB_post > 0) window.open('https://forums.voz.vn/showpost.php?p=' + DB_post);
            else alert('Nhập 1 postID của bạn để thực hiện đồng bộ qua post này.\nNội dung post đó sẽ bị xóa.');
        });
        $('#thongbao_menu input[id="txtDB_postID"]').val(GM_getValue('DB_postID', 0));
        $('#reset_factory').click(function () {
            reset_factory();
        });
        $('#thongbao_menu input[id^="optHashtag"]').click(function () {
            GM_setValue('last20quotes', '[]');
            location.reload();
        });

        $('#thongbao_menu #btn_set_NotifyWidth').click(function () {
            GM_setValue('NotifyWidth', $('#txtNotifyWidth').val());
            location.reload();
        });
        $('#thongbao_menu input[id="txtNotifyWidth"]').val(GM_getValue('NotifyWidth', 300));

        $('#thongbao_menu #btn_set_desktopLogo').click(function () {
            GM_setValue('desktopLogo', $('#txtDesktopLogo').val());
            showMsg2("", "", "test", parseInt(GM_getValue('optSound', '1')) );
        });
        $('#thongbao_menu input[id="txtDesktopLogo"]').val(GM_getValue('desktopLogo', ""));
    }
    function add_style() {
        $('head').append('<style>' +
                         '#vozNotification {float:right; position:fixed; top:0px; right:20px; font-weight:normal; cursor:pointer;}' +
                         '.showMsg {display:none; padding: 5px; margin: 5px; background:rgba(255, 255, 255, 0.9); border: 1px solid #e1e1e1;}' +
                         '.showMsg a:link, .showMsg a:hover, .showMsg a:visited {font-weight: 700; color: #000; outline: none;}' +
                         '.floatRight {clear:both; float:right}' +
                         '#otherMsg {color: #000}' +
                         '#reset_factory {color: #FF0000;}' +
                         '#logo.vozNotification {width:35px;}' +
                         '#vozNotification .logoWrapper {display:inline-block; vertical-align:middle; width:40px}' +
                         '#vozNotification .titleWrapper {display:inline-block; vertical-align:middle; max-width:' + GM_getValue('NotifyWidth', 300) + 'px}' +
                         '#vozNotification .button { font-size:10px; color:gray; float: right; margin-top: 5px;}' +
                         '</style>');
    }
    function QuoteSearch(retry=1) {
        var delay = window.location.href.indexOf("search.php") > -1 ? 5000 : 0;
        setTimeout(function() {

            if (GM_getValue('last20quotes', '[]') !== '[]') {
                var last20quotes = JSON.parse(GM_getValue('last20quotes', '[]'));
                if (wasThisQuoteViewed(last20quotes[0].postID)) {
                    last20quotes[0].unRead = - 1;
                }
                if (last20quotes[0].unRead === - 1) {
                    last20quotes.splice(0, 1);
                    GM_setValue('last20quotes', JSON.stringify(last20quotes));
                    QuoteSearch(retry);
                } else {
                    var showMe = last20quotes[0];
                    showMe.title = 'Bạn được nhắc đến ở thread: ' + showMe.threadTitle;
                    showMe.url = 'https://forums.voz.vn/showthread.php?p=' + showMe.postID + '#post' + showMe.postID + '&newQuoteClicked';
                    showMsg('#newQuote', [ showMe.url, showMe.title ], 0, showMe.unRead);
                    if (last20quotes[0].unRead === 1) {
                        last20quotes[0].unRead = 0;
                        GM_setValue('last20quotes', JSON.stringify(last20quotes));
                    }
                }
            } else {
                retry -= 1;
                if (retry < 0) {
                    // wait a minute to retry
                    setTimeout(function () {
                        QuoteSearch();
                    }, 60000);
                } else {
                    GM_xmlhttpRequest({
                        url: "/search.php?do=process",
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: $.param({
                            s: '',
                            securitytoken: unsafeWindow.SECURITYTOKEN,
                            do : 'process',
                            searchthreadid: '',
                            query: sQuery,
                            titleonly: 0,
                            searchuser: '',
                            starteronly: 0,
                            exactname: 1,
                            'prefixchoice[]': '',
                            replyless: 0,
                            replylimit: 0,
                            searchdate: 0,
                            beforeafter: 'after',
                            sortby: 'lastpost',
                            order: 'descending',
                            showposts: 1,
                            'forumchoice[]': 0,
                            childforums: 1,
                            dosearch: 'Search Now',
                            saveprefs: 1
                        }),
                        onload: function (data) {
                            data = data.responseText;
                            var foundQuote = $(data).find('span.smallfont:contains("Showing results")').length ? 1 : 0;
                            if (foundQuote === 0) {
                                setTimeout(function () {
                                    QuoteSearch(retry);
                                }, 5000);
                            } else {
                                // connected successfully
                                var quoteDetect = $(data).find('div.smallfont:contains("Posted By")').filter(':not(:contains("' + username + '"))');
                                if (quoteDetect.length) {
                                    var quotes = quoteDetect.parent().parent().parent().parent();
                                    var last20quotes = [
                                    ];
                                    $.each(quotes, function (index, quote) {
                                        var quote = $(quote);
                                        var threadTitle = quote.find('a strong').text();
                                        var postID = parseInt(quote.find('em a').attr('href').match(/#post([0-9]+)/) [1]);
                                        if (!wasThisQuoteViewed(postID)) {
                                            last20quotes[last20quotes.length] = {
                                                threadTitle: threadTitle,
                                                postID: postID,
                                                unRead: 1
                                            };
                                        }
                                    });
                                    if (last20quotes.length) {

                                        // notify just the latest quote if this is the first got data

                                        if ( GM_getValue("first_time_gotQuoteData", 1) ) {
                                            var last20viewedQuotes = [];
                                            for (var i = 1; i < last20quotes.length; i++) {
                                                last20viewedQuotes[last20viewedQuotes.length] = last20quotes[last20quotes.length - i].postID;
                                            }
                                            var tmp = last20viewedQuotes.length;
                                            for (var i = 20; i > tmp; i--) {
                                                last20viewedQuotes.splice(0, 0, i);
                                            }
                                            GM_setValue('last20viewedQuotes', JSON.stringify(last20viewedQuotes));
                                            GM_setValue("first_time_gotQuoteData", 0);
                                            QuoteViewMonitor();
                                        }
                                        last20quotes.reverse();
                                        GM_setValue('last20quotes', JSON.stringify(last20quotes));
                                    }
                                    setTimeout(function () {
                                        QuoteSearch(retry);
                                    }, 5000);
                                }
                            }
                        }
                    });
                }
            }
        }, delay); // setTimeout
    }
    // end QuoteSearch()

    function QuoteViewMonitor() {
        var last20viewedQuotes = JSON.parse(GM_getValue('last20viewedQuotes', str_array_1to20));
        var update_me = 0;
        var postHaveQuote = $('div[id^="post_message_"]:contains("' + sQuery + '")');
        var newQuoteClicked = (location.href.indexOf('&newQuoteClicked') !== - 1);
        if (postHaveQuote.length || newQuoteClicked) {
            var cached_avatars = JSON.parse(GM_getValue("cached_avatars","[[],[]]"));
            var update_cached_avatars = false;

            postHaveQuote.each(function () {
                var postID = parseInt($(this).attr('id').match(/[0-9]+/));
                var postBy = $('div[id="postmenu_' + postID + '"] a.bigusername').html();
                if ((postID > last20viewedQuotes[0]) && (last20viewedQuotes.indexOf(postID) === - 1) && (postBy !== username)) {
                    last20viewedQuotes.splice(0, 1, postID);
                    last20viewedQuotes.sort(function (a, b) {
                        return a - b;
                    });
                    update_me = 1;
                }

                // if that user has an avatar
                var avatar = $('img[alt="' + postBy + '\'s Avatar"]').attr("src");
                if (avatar && (postBy !== username)) {
                    if (cached_avatars[0].indexOf(postBy) === -1) {
                        if (cached_avatars[0].length >= 30) {
                            cached_avatars[0] = cached_avatars[0].slice(1, cached_avatars[0].length);
                            cached_avatars[1] = cached_avatars[1].slice(1, cached_avatars[1].length);
                        }

                        cached_avatars[0].push(postBy);
                        cached_avatars[1].push(avatar);

                        update_cached_avatars = true;
                    } else if (cached_avatars[1][cached_avatars[0].indexOf(postBy)] !== avatar) {
                        // update new avatar of that user to cached_avatars
                        cached_avatars[1][cached_avatars[0].indexOf(postBy)] = avatar;
                        update_cached_avatars = true;
                    }
                }
            });

            if (update_cached_avatars) GM_setValue("cached_avatars", JSON.stringify(cached_avatars));
        }
        // in case post was deleted

        if (newQuoteClicked) {
            var postID = parseInt(location.href.match(/[0-9]+/));
            if ((postID > last20viewedQuotes[0]) && (last20viewedQuotes.indexOf(postID) === - 1)) {
                last20viewedQuotes.splice(0, 1, postID);
                last20viewedQuotes.sort(function (a, b) {
                    return a - b;
                });
                update_me = 1;
            }
        }
        if (update_me) {
            GM_setValue('last20viewedQuotes', JSON.stringify(last20viewedQuotes));
            if (DB_postID > 0) update_last20viewedQuotes_to_server(); // sync to cloud if you want
        }
    }

    function wasThisQuoteViewed(id) {
        var last20viewedQuotes = JSON.parse(GM_getValue('last20viewedQuotes', str_array_1to20));
        return (last20viewedQuotes.indexOf(id) !== - 1 || id < last20viewedQuotes[0]) ? 1 : 0;
    }
    function subThreadsViewMonitor() {
        var subThreadInfo = $('#threadtools_menu a[href^="subscription.php?do="]');
        var subThreads = GM_getValue('subThreads',{});
        var subThreadsList = GM_getValue('subThreadsList',[]);

        if (subThreadInfo.length) {

            var currentThread = subThreadInfo.attr("href").match(/\d+/)[0];

            if (subThreadInfo.attr("href").indexOf("addsubscription") > -1) {

                if (subThreadsList.indexOf(currentThread) > -1) {
                    // auto delete thread in sub list
                    delete subThreads[currentThread];
                    subThreadsList.splice(subThreadsList.indexOf(currentThread), 1);
                }

            } else {

                if (subThreadsList.indexOf(currentThread) === -1) {
                    // auto add thread in sub list
                    subThreadsList.push(currentThread);
                    subThreads[currentThread] = {title: $('a img[src="images/misc/navbits_finallink_ltr.gif"]').parent().next().html().match(/\n\s*(\S.*)\n/)[1], url: ('https://forums.voz.vn/showthread.php?t='+currentThread), lastViewedPost: 0};
                }
                var currentPage = $('a[id^="postcount"]');
                var currentPost = $(currentPage[currentPage.length-1]).attr("href").match(/p=(\d+)&/)[1];

                if ( parseInt(currentPost) > parseInt( subThreads[currentThread]["lastViewedPost"] ) ) {
                    subThreads[currentThread]["lastViewedPost"] = parseInt(currentPost);
                    subThreads[currentThread]["url"] = "https://forums.voz.vn/showthread.php?p={p}#post{p}".replace(/{p}/g, currentPost);
                }
            }

            GM_setValue("subThreads", subThreads);
            GM_setValue("subThreadsList", subThreadsList);

        }

        // usercp page
        override_userCP();
        function override_userCP() {
            if (window.location.href === "https://forums.voz.vn/usercp.php?app=vozNotification") {
                var content = $('td table.tborder[width="100%"]').parent();
                var template = '<table class="tborder vozNotification subThreadsCP" cellpadding="6" cellspacing="1" border="0" width="100%" align="center">' +
                    '<thead><tr><td class="tcat" colspan="5"><a style="float:right" href="#top"><img id="collapseimg_usercp_vozNotification" src="images/buttons/collapse_tcat.gif" alt="" border="0"></a><span>vozNotification > New Subcribed Threads<span class="normal"></span></td></tr></thead>' +
                    '<tbody id="collapseobj_usercp_subthreads" style="">' +
                    '{{data}}' +
                    '</tbody>' +
                    '';
                var data = ["",""];

                for (i=0; i<subThreadsList.length; i++) {
                    var link = subThreads[subThreadsList[i]]["url"];
                    if (typeof link === "undefined") link = 'https://forums.voz.vn/showthread.php?t=' + subThreadsList[i];

                    var title = subThreads[subThreadsList[i]]["title"];

                    var boldNew = subThreads[subThreadsList[i]]["new"];
                    if (typeof boldNew === "undefined") boldNew = false;

                    boldNew = boldNew? ' style="font-weight:bold"' : "";

                    data[boldNew? 0:1] += '<tr><td class="alt1"><img src="images/statusicon/thread_dot_new.gif" border=""></td>';
                    data[boldNew? 0:1] += '<td class="alt1"><a href="{{link}}"{{boldNew}}>{{title}}</a></td><td class="alt1"><a class="vozNotification unSub" id="{{threadID}}" href="#">Ngừng theo dõi</a></td>'.replace("{{link}}", link).replace("{{title}}", title).replace("{{boldNew}}", boldNew).replace("{{threadID}}", subThreadsList[i]);
                    data[boldNew? 0:1] += '</tr>';
                }
                content.html(template.replace("{{data}}",data.join("")));
                $("a.vozNotification.unSub").on("click", function(e) {
                    e.preventDefault();
                    var currentThread = $(e.target).attr("id");
                    delete subThreads[currentThread];
                    subThreadsList.splice(subThreadsList.indexOf(currentThread), 1);
                    GM_setValue("subThreads", subThreads);
                    GM_setValue("subThreadsList", subThreadsList);
                    override_userCP();
                });
            }
        }
    }

    function tabFocusMonitor() {
        $(document).on("visibilitychange", function() {
            setDesktopNotifyTime(0);
        });
    }

    function update_last20viewedQuotes_to_server() {

        var code = GM_getValue('last20viewedQuotes', str_array_1to20);
        GM_setValue('last20quotes', '[]');
        $.ajax({
            url: 'editpost.php?do=updatepost&p=' + DB_postID,
            type: 'POST',
            data: {
                message: '[code]' + 'vozNotification.last20viewedQuotes=' + code + '[/code]',
                'do': 'updatepost',
                p: DB_postID,
                securitytoken: unsafeWindow.SECURITYTOKEN
            },
            success: function () {
                //console.log('update_last20viewedQuotes_to_server(): sent ', code);
            }
        });

    }

    function sync_last20viewedQuotes() {
        if (DB_postID > 0) {
            $.ajax({
                url: 'showpost.php?p=' + DB_postID,
                type: 'GET',
                cache: false,
                success: function (server_value) {
                    var server_value = $(server_value).find('#post_message_' + DB_postID).html();
                    server_value = server_value.match(/last20viewedQuotes\=(\[[^\]]*\])/);
                    server_value = (server_value === null) ? [
                    ] : server_value;
                    if (server_value.length === 2) {
                        server_value = JSON.parse(server_value[1]);
                        var last20viewedQuotes = JSON.parse(GM_getValue('last20viewedQuotes', str_array_1to20));
                        var update_me = [
                            0,
                            0
                        ];
                        $.each(server_value, function (i, val) {
                            var postID = val;
                            if ((postID > last20viewedQuotes[0]) && (last20viewedQuotes.indexOf(postID) === - 1)) {
                                last20viewedQuotes.splice(0, 1, postID);
                                last20viewedQuotes.sort(function (a, b) {
                                    return a - b;
                                });
                                update_me[0] = 1;
                            }
                        });
                        for (var i = 0; i < last20viewedQuotes.length; i++) {
                            if (last20viewedQuotes[i] === server_value[i]) update_me[1]++;
                        }
                        update_me = update_me[0] || (update_me[1] !== last20viewedQuotes.length);
                        if (update_me) {
                            GM_setValue('last20viewedQuotes', JSON.stringify(last20viewedQuotes));
                            update_last20viewedQuotes_to_server();
                        }
                    } else {
                        update_last20viewedQuotes_to_server();
                    }
                }
            });
        }
    }
    function reset_factory() {

        GM_setValue = function() {}; // lock database

        var keys = GM_listValues();
        for (var i = 0; i < keys.length; i++) {
            GM_deleteValue(keys[i]);
        }

        $("#vozNotification").remove();
        showMsg("#otherMsg", "Khôi phục cài đặt gốc thành công.", 1000);
        setTimeout( function() { location.href = "https://forums.voz.vn/"; }, 2000);

    }

    function quickQuote() {

        function getPost(id)
        {
            var url = "newreply.php?do=newreply&p=" + id;
            $.ajax({
                url: url,
                type: 'GET',
                cache: false,
                success: function (data) {
                    document.cookie="vbulletin_multiquote=";
                    $('img[src*="images/buttons/multiquote_on.gif"]').attr("src","images/buttons/multiquote_off.gif");
                    data = $(data).find("#vB_Editor_001_textarea").val();
                    $('#vB_Editor_QR_textarea').val(data).focus();
                }
            });
        }

        function getSelectionCoords(win) {
            win = win || window;
            var doc = win.document;
            var sel = doc.selection, range, rects, rect;
            var x = 0, y = 0;
            if (sel) {
                if (sel.type != "Control") {
                    range = sel.createRange();
                    range.collapse(true);
                    x = range.boundingLeft;
                    y = range.boundingTop;
                }
            } else if (win.getSelection) {
                sel = win.getSelection();
                if (sel.rangeCount) {
                    range = sel.getRangeAt(0).cloneRange();
                    if (range.getClientRects) {
                        range.collapse(true);
                        rects = range.getClientRects();
                        if (rects.length > 0) {
                            rect = rects[0];
                        }
                        x = rect.left;
                        y = rect.top;
                    }
                    // Fall back to inserting a temporary element
                    if (x == 0 && y == 0) {
                        var span = doc.createElement("span");
                        if (span.getClientRects) {
                            // Ensure span has dimensions and position by
                            // adding a zero-width space character
                            span.appendChild( doc.createTextNode("\u200b") );
                            range.insertNode(span);
                            rect = span.getClientRects()[0];
                            x = rect.left;
                            y = rect.top;
                            var spanParent = span.parentNode;
                            spanParent.removeChild(span);

                            // Glue any broken text nodes back together
                            spanParent.normalize();
                        }
                    }
                }
            }
            return { x: x, y: y };
        }

        function getSelectionText() {
            return window.getSelection().toString();
        }

        $('table[id^="post"]').each(function() {
            var poster = $(this).find('a.bigusername').html();
            var postID = $(this).attr('id').replace("post","");
            $(this).find('img[alt="Reply With Quote"]').parent().parent().append('<a class="vozNotification quoteBtn" href="#" postid="' + postID + '" poster="' + poster + '"><img src="images/buttons/quote.gif" alt="Quick Quote" border="0" title="Reply With Quote"></a>');
        });

        GM_addStyle(".vozNotification.quoteBtn.hey{display:inline-block!important;margin:0 5px!important;padding:0 5px!important;background:#f1f1f1!important;border:1px solid #cdcdcd!important;border-radius:3px!important;color:#333!important;font-size:10px!important;text-decoration:none!important}.vozNotification.quoteBtn.hey:hover{background:#dadada!important}");
        $('.voz-bbcode-quote').each(function() {
            var view_quote = $(this).find('img[alt="View Post"]');
            if (view_quote.length) {
                var postID = view_quote.parent().attr("href").match(/p=(\d+)/)[1];
                view_quote.parent().parent().append('<a class="vozNotification quoteBtn hey" href="#" postid="' + postID + '" poster="' + "" + '">Quote</a>');
            }
        });

        $('.vozNotification.quoteBtn').on('click', function(e) {
            e.preventDefault();
            var postID = $(this).attr('postid');
            $("html, body").animate({ scrollTop: $(document).height()-850 }, 500, "swing", function() {
                $('#vB_Editor_QR_textarea').val("Đợi tí...");
                getPost(postID);
            });
        });

        // selectively quote
        $("body").append('<div class="vozNotification sQuote">Quote</div>');
        GM_addStyle(".vozNotification.sQuote{position:absolute;display:none;line-height:30px;vertical-align:middle;padding:2px 5px;font-size:20px;color:#fff;background:rgba(0,0,0,.8);cursor:pointer}.vozNotification.sQuote:after{content:'';position:absolute;top:100%;left:50%;margin-left:-5px;width:0;height:0;border-top:solid 5px rgba(0,0,0,.8);border-left:solid 5px transparent;border-right:solid 5px transparent}.vozNotification.hiddenText{font-size:0px;}");

        var quote_str = "";

        $("body").on("mousedown", function(e) {
            $(".vozNotification.sQuote").fadeOut("fast");
        });

        $(".voz-post-message").one("mousedown", function() {
            $(this).find('.inlineimg, a[target="_blank"]').each(function() {
                var el = $(this);
                var el_type = el.prop("nodeName");
                switch (el_type) {
                    case "IMG":
                        var src = el.attr("src"); var i = imgs.indexOf(src);
                        el.before('<span class="vozNotification hiddenText">' + (i>-1 ? emoticons[i] : src) + '</span>');
                        break;

                    case "-":
                        // nothing here
                        break;
                }
            });
        });

        $("body").on("click", ".vozNotification.sQuote", function() {
            $('#vB_Editor_QR_textarea').val( ($('#vB_Editor_QR_textarea').val() + "\n" + quote_str).trim() + "\n");
            $("html, body").animate({ scrollTop: $(document).height()-850 }, 500, "swing", function() {
                $('#vB_Editor_QR_textarea').focus();
            });
        });

        $(".voz-post-message").on("mouseup", function(e) {
            var postid = $(this).attr("id").replace("post_message_", "");
            var post = $("#post" + postid);

            setTimeout(function() {

                var selected = getSelectionText();

                if (selected.length) {
                    var poster = post.find("a.bigusername").html();

                    var is_quote = $(e.target).closest(".voz-bbcode-quote");
                    if (is_quote.attr("class") === "voz-bbcode-quote") {
                        poster = "";
                    }
                    if  (poster !== "") {

                        quote_str = "[QUOTE=" + poster + ";" + postid + "]" + selected + "[/QUOTE]";

                        var selPos = getSelectionCoords();
                        selPos = { top: selPos.y+window.scrollY, left: selPos.x+window.scrollX };

                        $('.vozNotification.sQuote').css({
                            left: selPos.left + "px",
                            top: (selPos.top - 40) + "px"
                        }).fadeIn("fast");

                    }
                }
            }, 500);
        });
    }

    function add_QuickSearch() {

        GM_addStyle('#qsDataWrapper {max-height: 500px; overflow-y: auto;} .qsResult {display: block; margin: 0px 5px; padding: 5px 5px; text-decoration: none !important;} .qsResult:hover {background: #23497C !important; color: #fff !important;} #qsBg {position: fixed; top: 0; left: 0; background: rgba(0,0,0,0.6); z-index: 7000; width: 100%; height: 100%; display: none;} .qsCat {color: #999 !important;} .qsHotkey {display: none; float:right; border: 1px solid #000; text-align: center; margin-right: 5px} #qsHotkeyHint {background: #efefef;}');

        String.prototype.rfilter = function() {
            return this.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        };

        function bodauTiengViet(str) {
            str = str.toString().toLowerCase();
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
            str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
            str = str.replace(/đ/g, "d");
            return str;
        }

        var subThreads = GM_getValue("subThreads", []);
        var fList={1:{title:"Đại sảnh /f1"},3:{title:"Thắc mắc & Góp ý /f3/Đại sảnh"},26:{title:"Tin tức iNet /f26/Đại sảnh"},27:{title:"Review sản phẩm /f27/Đại sảnh"},5:{title:"Máy tính để bàn /f5"},6:{title:"Overclocking & Cooling /f6/Máy tính để bàn"},151:{title:"Modding /f151/Máy tính để bàn"},25:{title:"AMD /f25/Máy tính để bàn"},24:{title:"Intel /f24/Máy tính để bàn"},7:{title:"Mainboard & Memory /f7/Máy tính để bàn"},8:{title:"Đồ họa máy tính /f8/Máy tính để bàn"},9:{title:"Phần cứng chung /f9/Máy tính để bàn"},30:{title:"Thiết bị ngoại vi & Phụ kiện /f30/Máy tính để bàn"},13:{title:"Phần mềm /f13/Máy tính để bàn"},14:{title:"Download /f14/Phần mềm"},148:{title:"Phát triển Phần mềm /f148/Phần mềm"},15:{title:"Trường đua /f15/Máy tính để bàn"},230:{title:"Games /f230"},254:{title:"Garena - Liên Quân Mobile /f254/Games"},233:{title:"Pokemon GO /f233/Games"},237:{title:"Overwatch /f237/Games"},241:{title:"Hearthstone /f241/Games"},179:{title:"Liên Minh Huyền Thoại /f179/Games"},104:{title:"Sản phẩm công nghệ /f104"},47:{title:"Máy tính xách tay /f47/Sản phẩm công nghệ"},108:{title:"Các sản phẩm Apple /f108/Sản phẩm công nghệ/ios/dien thoai"},112:{title:"Máy tính chuyên dụng /f112/Sản phẩm công nghệ"},32:{title:"Thiết bị di động /f32/Sản phẩm công nghệ/android/dien thoai"},10:{title:"Đồ điện tử & Thiết bị gia dụng /f10/Sản phẩm công nghệ"},31:{title:"Multimedia /f31/Sản phẩm công nghệ"},40:{title:"Giao lưu Doanh nghiệp & Người dùng (theo Alphabet) /f40/dell/hoanghamobile/saiback/wd/o cung/we can do"},16:{title:"Khu vui chơi giải trí /f16"},17:{title:"Chuyện trò linh tinh™ /f17/Khu vui chơi giải trí"},207:{title:"Các món ăn chơi /f207/Khu vui chơi giải trí"},18:{title:"Trưng cầu dân ý /f18/Khu vui chơi giải trí"},33:{title:"Điểm báo /f33/Khu vui chơi giải trí"},84:{title:"Khu thương mại - Mua và Bán /f84"},68:{title:"Máy tính để bàn /f68/Khu thương mại - Mua và Bán"},72:{title:"Máy tính xách tay /f72/Khu thương mại - Mua và Bán"},76:{title:"Điện thoại di động /f76/Khu thương mại - Mua và Bán"},80:{title:"Các thiết bị công nghệ khác /f80/Khu thương mại - Mua và Bán"}};

        var searchArr = [subThreads, fList];

        var target = $('td.alt2 div.smallfont a[href="private.php"]').parent().parent().parent();
        var searchBox = '<td class="alt2"><div id="qsBg"></div><div id="qsWrapper"><div id="qsInput" style="position: relative; display: inline-block; z-index: 7001"><input accesskey="g" id="quickSearch" type="search" placeholder="Quick search, Alt+G..."><div id="qsDataWrapper" style="position: absolute; width:100%; background: #fff"></div></div></div></td>';

        target.before(searchBox);
        $('#quickSearch').focus(function() {
            $(this).animate({width: '350px'}, 500);
            $("#qsBg").show();
        });
        $("body").on("click", function (e) {
            if (!$(e.target).is($("#quickSearch"))) {
                $("#quickSearch").val("");
                $("#qsDataWrapper").html("");
                $("#quickSearch").animate({width: '200px'}, 500);
                $("#qsBg").hide();
            }
        });

        var hotkey_mode = false;
        var qsHotkeyHint = ["Ấn và thả Ctrl để dùng hotkey", "Ấn số tương ứng để mở nhanh link"];
        var keypressed = "", hotkey_length = 0, datalist_length = 0;
        $("#quickSearch").on("keydown", function (e) {
            // event.which = 17 => Ctrl
            if (e.which === 17) {
                hotkey_mode = true; keypressed = ""; hotkey_length = (datalist_length-1).toString().length;
                $("#qsHotkeyHint").html(qsHotkeyHint[1]);
                $(".qsHotkey").show();
            } else {
                if (48 <= e.which && e.which <= 57 && hotkey_mode && datalist_length) {
                    keypressed += String.fromCharCode(e.which);
                    if (keypressed.length === hotkey_length) {
                        hotkey_mode = false;
                        $("#qsHotkeyHint").html(qsHotkeyHint[0]);
                        $(".qsHotkey").hide();
                        if (Number(keypressed) < datalist_length) $(".qsHotkey:eq(" + Number(keypressed) + ")").parent()[0].click();
                    }
                    return false;
                } else {
                    hotkey_mode = false;
                    $(".qsHotkeyHint").html(qsHotkeyHint[0]);
                    $(".qsHotkey").hide();
                }
            }
        });

        function pad (str, max) {
            str = str.toString();
            return str.length < max ? pad("0" + str, max) : str;
        }
        $('#quickSearch').on('input', function(e) {

            if (hotkey_mode) return;

            var search = bodauTiengViet(this.value.rfilter()).split(/\s+/).filter(function(n) {return n!=="";});
            var datalist = ""; datalist_length = 0;

            if (search.length) {
                var r = ''; //(?=.*\bjack\b)(?=.*\bjames)
                for (var s=0; s<search.length; s++) {
                    r += '(?=.*' + search[s] + ')';
                }

                var fa = [];
                for (var si=0; si<searchArr.length; si++) {
                    for (var sj in searchArr[si]) {
                        var p = new RegExp(r,'i');
                        var ot = searchArr[si][sj].title;
                        var t = bodauTiengViet(ot);

                        if (p.test(t)) {
                            p = new RegExp("(" + search.join("|") + ")", "gi");

                            while ((m = p.exec(t)) !== null) {
                                var f=ot.substring(m.index,m.index+m[0].length).rfilter();
                                if (fa.indexOf(f) < 0) fa.push(f);
                            }
                            var url = (si===0)? searchArr[si][sj].url : ("forumdisplay.php?f=" + sj);
                            var title = (si===0)? ot.replace(new RegExp(fa.join("|"), "g"), function(match, index) { return "<u>" + match + "</u>"; }) : "<span class=qsCat>[Forum] </span>"+ot.replace(/\/.+$/g,"");
                            datalist += '<a class="qsResult" href="' + url + '">' + '<span class="qsHotkey">' + datalist_length + '</span>' + title + "</a>"; datalist_length++;
                        }
                    }
                }

                $("#qsDataWrapper").html((datalist.length? "<div id=qsHotkeyHint>" + qsHotkeyHint[0] + "</div>" : "") + datalist);
                $(".qsHotkey").each(function() {
                    $(this).html(pad($(this).html(), (datalist_length-1).toString().length));
                });

            }
        });

    }

    function smartTyping() {
        if ( $('form[name="vbform"]').length === 0 ) return;

        GM_addStyle(".textcomplete-dropdown{border:1px solid #ddd;color:#000;background-color:#fff;max-height:300px;overflow-y:auto;}.textcomplete-dropdown li{border-top:1px solid #ddd;padding:2px 5px}.textcomplete-dropdown li:first-child{border-top:none}.textcomplete-dropdown .active,.textcomplete-dropdown li:hover{background-color:#6eb7db}.textcomplete-dropdown{list-style:none;padding:0;margin:0}.textcomplete-dropdown a:hover{cursor:pointer;color:#000;text-decoration:none}.textcomplete-items-wrapper{display:table;width:100%;min-height:32px}.textcomplete-items-wrapper div{display:table-cell;vertical-align:middle}.textcomplete-item-img{width:40px}.textcomplete-item-img img{max-width:32px;max-height:32px}.textcomplete-item-value{}");

        // username table
        var usernames = ["idmresettrial"];
        var avatars = ["customavatars/avatar1447221_22.gif"];
        var u_got = [];
        var cached_u_got = JSON.parse(GM_getValue("cached_u_got","[[],[]]"));
        var thread_id = $('input[name="url"], input[name="searchthreadid"], input[name="t"]').attr("value").match(/(?:t=){0,1}(\d+)/)[1];
        var is_in_cached_u_got = (cached_u_got[0].indexOf(thread_id) >= 0);
        var cached_avatars = JSON.parse(GM_getValue("cached_avatars","[[],[]]"));

        $(".bigusername").each(function() {
            var u = $(this);
            var username = u.text();
            var avatar = $('img[src^="customavatars/avatar' + u.attr("href").match(/u=(.*)$/i)[1] + '"]').filter(":first").attr("src") || "https://cdn3.iconfinder.com/data/icons/general-icons-set-1/100/13_profile-32.png";

            if (usernames.indexOf(username) === -1) {
                usernames.push(username);
                avatars.push(avatar);
            }
        });

        $('textarea').textcomplete([
            // emoticon
            {
                match: /(^|\s):(\S*)$/,
                search: function (term, callback) {
                    callback($.map(emoticons, function (emo) {
                        return emo.toLowerCase().indexOf(term.toLowerCase()) !== -1 ? emo : null;
                    }));
                },
                template: function (value) {
                    return ('<div class="textcomplete-items-wrapper"><div class="textcomplete-item-img"><img src="{img_url}" /></div><div class="textcomplete-item-value">{value}</div></div>').replace("{img_url}", imgs[emoticons.indexOf(value)]).replace("{value}", value);
                },
                replace: function (value) {
                    return " " + value + " ";
                }
            },
            // username
            {
                match: /(^|\s)@(\S*)$/,
                search: function (term, callback) {

                    if (!is_in_cached_u_got) {
                        $.ajax({
                            url: 'misc.php?do=whoposted&t=' + thread_id,
                            type: 'GET',
                            success: function (data) {

                                u_got = $(data).find('a[href^="member.php?u="]:lt(30)');
                                u_got = $.map(u_got, function(v) { return $(v).text(); });

                                if (cached_u_got[0].length >= 30) {
                                    cached_u_got[0] = cached_u_got[0].slice(1, cached_u_got[0].length);
                                    cached_u_got[1] = cached_u_got[1].slice(1, cached_u_got[1].length);
                                }
                                cached_u_got[0].push(thread_id);
                                cached_u_got[1].push(u_got);
                                GM_setValue("cached_u_got", JSON.stringify(cached_u_got));
                                is_in_cached_u_got = true;
                            }
                        });
                    }

                    u_got = cached_u_got[1][cached_u_got[0].indexOf(thread_id)] || [];

                    $.each(cached_avatars[0], function (i, v) {
                        if (u_got.indexOf(v) === -1) u_got.push(v);
                    });

                    $.each(u_got, function (i, u) {
                        if (usernames.indexOf(u) === -1) {
                            usernames.push(u);
                            avatars.push(cached_avatars[0].indexOf(u)>-1 ? cached_avatars[1][cached_avatars[0].indexOf(u)] : "https://cdn3.iconfinder.com/data/icons/general-icons-set-1/100/13_profile-32.png");
                        }
                    });

                    callback($.map(usernames, function (u) {
                        return u.toLowerCase().indexOf(term.toLowerCase()) !== -1 ? u : null;
                    }));
                },
                template: function (value) {
                    return ('<div class="textcomplete-items-wrapper"><div class="textcomplete-item-img"><img src="{img_url}" /></div><div class="textcomplete-item-value">{value}</div></div>').replace("{img_url}", avatars[usernames.indexOf(value)]).replace("{value}", value);
                },
                replace: function (value) {
                    return " @" + value + "; ";
                }
            }
        ], {maxCount: 999});
        document.addEventListener('paste', function (e) {
            e.preventDefault();
            var clipboard = e.clipboardData.getData("Text");

            clipboard = clipboard.replace(/(http[^ ]+?(?:jpg|png|gif))(?!["\[])/gi, "[IMG]$1[/IMG]");//.replace(/(\[\/?img\]){2,}/gi, "$1");

            $('textarea[name="message"]').insertAtCaret(clipboard);
        });

    }

    function hotkey() {

        var ignore = ["TEXTAREA", "INPUT"];

        function nav(type) {
            if ($(".fancybox-is-open").length) return;

            var linkHotkey = ["prev", "next", "notify.thread", "notify.quote", "notify.message", "usercp"];
            var selector = ['.pagenav a[rel="prev"]', '.pagenav a[rel="next"]', '#newSubscribedThreads .titleWrapper a', '#newQuote .titleWrapper a', '#newPrivateMessages .titleWrapper a', 'a[href="usercp.php"]'];
            var index = linkHotkey.indexOf(type);
            if (index > -1) {
                var link = $(selector[index]);
                if (link.length) link[0].click();
            }
        }

        $(document).on("keyup", function (e) {
            if (e.ctrlKey || ignore.indexOf(e.target.tagName) > -1) return;

            var keyCoded = e.originalEvent.keyCode;

            var type = (function() {
                if (keyCoded == 37 || keyCoded == 66)
                    return "prev";
                else if (keyCoded == 39 || keyCoded == 78)
                    return "next";
                else if (keyCoded == 84)
                    return "notify.thread";
                else if (keyCoded == 77)
                    return "notify.message";
                else if (keyCoded == 81)
                    return "notify.quote";
                else if (keyCoded == 76)
                    return "usercp";
            })();

            if (type !== undefined) nav(type);
        });

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $("body").swipe({
                //Generic swipe handler for all directions
                swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                    if (ignore.indexOf(event.target.tagName) > -1) return;

                    var type = (function() {
                        if (direction === "left" && distance > 300)
                            return "prev";
                        else if (direction === "right" && distance > 300)
                            return "next";
                    })();
                    if (type !== undefined) nav(type);
                }
            });
        }
    }


    // Insert text into textarea at cursor position
    $.fn.insertAtCaret = function(myValue) {
        return this.each(function() {
            var me = this;
            if (document.selection) { // IE
                me.focus();
                sel = document.selection.createRange();
                sel.text = myValue;
                me.focus();
            } else if (me.selectionStart || me.selectionStart == '0') { // Real browsers
                var startPos = me.selectionStart, endPos = me.selectionEnd, scrollTop = me.scrollTop;
                me.value = me.value.substring(0, startPos) + myValue + me.value.substring(endPos, me.value.length);
                me.focus();
                me.selectionStart = startPos + myValue.length;
                me.selectionEnd = startPos + myValue.length;
                me.scrollTop = scrollTop;
            } else {
                me.value += myValue;
                me.focus();
            }
        });
    };

}); // The end