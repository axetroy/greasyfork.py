// ==UserScript==
// @name         Threads Watchlist
// @namespace    superiorSilicon
// @version      1.4
// @description  Adds a list of threads that you "watch"
// @author       superiorSilicon
// @include      *worldwidetorrents.me*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      https://greasyfork.org/scripts/35440-jsmodal/code/jsModal.js?version=231892
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// ==/UserScript==

// DO NOT EDIT SCRIPT UNLESS YOU KNOW WHAT YOU'RE DOING..

// == SETTINGS == //
var notifyVolume, notifySource, notifyAudio, activityCheckInterval, notifTime; //Declaring Setting Variables
// Getting setting values from the DB
notifyVolume = GM_getValue('notSound_WT') != null ? GM_getValue('notSound_WT') : 50;
notifySource = GM_getValue('audioSrc_WT') != null ? GM_getValue('audioSrc_WT') : 'https://k003.kiwi6.com/hotlink/deewhztt1h/arpeggio.mp3';
notifyAudio = GM_getValue('useAudio_WT') != null ? GM_getValue('useAudio_WT') : true;
activityCheckInterval = GM_getValue('activity_WT') != null ? GM_getValue('activity_WT') : 10;
notifTime = GM_getValue('notiTime_WT') != null ? GM_getValue('notiTime_WT') : 15;
// == !SETTINGS == //


// == GLOBAL VARIABLES == // DO NOT TOUCH THE PART BELOW THIS
var topicName, topicId, category, categoryId, containsThreads, threadExists, threadListName, threadList, pageTitle; //Declaring variables
threadList = []; //Creates an array called 'threadList'
pageTitle = document.title;

//Adds all list values to a separate object-array
$.each(GM_listValues(), function() {
    var thisString = this.toString();
    var matchString = thisString.match(/(thread)-.*-posts/g);
    var matchString2 = thisString.match(/.*\_WT/g);
    if (!matchString && !matchString2) {
        var listItem = {
            threadListName: thisString
        };
        threadList.push(listItem);
    }
});
if (/.*worldwidetorrents\.me\/forums.php\?action\=viewtopic.*/g.test(window.location.href)) { //Checks if the page is a thread
    topicName = $('.myFrame-caption h3 > center').html().split(/.*\&gt\; /g)[1]; //Gets name of the thread
    topicId = window.location.href.split(/.*id\=/g)[1].split(/&page.*/g)[0].replace('#', ''); //Gets topicid of the thread
    category = $('.myFrame-caption h3 > center').html().split(/\&gt\;.*/g)[0]; //Gets the category of the thread
    categoryId = $('a[href*="forums.php?action=viewforum&forumid="]').attr('href').split(/forums.php\?action=viewforum&forumid=/g)[1]; //Gets the forumid of the category
    threadListName = 'thread-' + topicId; //Initializes the threadListName variable
    //Checks whether the thread exists in the list
    for (var i = 0; i < threadList.length; i++) {
        if (threadList[i].threadListName == threadListName) {
            threadExists = true;
        }
    }
}
containsThreads = Boolean(GM_listValues().length > 0); //Checks if the list contains any threads

function Notify(body, title, tag, threadLink) { //Function for firing notifications. Use by calling Notify(params)
    var options = {
        body: body,
        tag: tag
    };
    var n = new Notification(title, options);
    setTimeout(n.close.bind(n), notifTime * 1000);
    n.onclick = function(event) {
        event.preventDefault();
        window.open(threadLink, '_blank');
    }
}

//Notification Audio Element
if (notifyAudio) {
    var threadNotifAudio = document.createElement('audio'); //Creates audio element
    threadNotifAudio.src = notifySource;
    threadNotifAudio.preload = 'auto';
    threadNotifAudio.volume = notifyVolume / 100;
}
// == !GLOBAL VARIABLES == // DO NOT TOUCH THE PART ABOVE THIS


// Additional CSS stuff
$.ajax({
    url: 'https://raw.githubusercontent.com/utveckla/jsModal/master/css/jsmodal-dark.css',
    type: 'GET',
    dataType: 'text',
    success: function(data) {
        $('head').append('<style id="jsModal-style">' + data.replace("url('../images/jsmodal/modal-close.png')", "url('https://raw.githubusercontent.com/utveckla/jsModal/master/images/jsmodal/modal-close.png')") + '</style>');
        $('head').append('<style id="watchlist-style"> #settingsContainer { font-size: 1.4rem; font-family: "Inconsolata", monospace; } #audioSource { font-size: 1.2rem !important; padding: 5px !important } #settingsContainer div { margin-top: 5px; margin-bottom: 5px } #settingsButtonContainer button[type="button"] { margin: 5px; cursor: pointer; border: 0; padding: 10px; font-size: 1rem }' +
            ' #settingsButtonContainer button { border-radius: 1px } #settingsButtonContainer { display: flex; justify-content: flex-end } .primaryButton { background: #12a7e0; color: white } #resetSettings { background: red; color: white }' +
            ' .primaryButton:hover { -webkit-box-shadow: 0px 0px 4px 2px rgba(12, 124, 225, 0.88); -moz-box-shadow: 0px 0px 4px 2px rgba(12, 124, 225, 0.88); box-shadow: 0px 0px 4px 2px rgba(12, 124, 225, 0.88); }' +
            ' #resetSettings:hover { -webkit-box-shadow: 0px 0px 4px 2px rgba(191, 21, 23, 0.88); -moz-box-shadow: 0px 0px 4px 2px rgba(191, 21, 23, 0.88); box-shadow: 0px 0px 4px 2px rgba(191, 21, 23, 0.88); } </style>' +
            ' #watchlist-notifications { cursor: pointer } #watchlist-notifications:hover { color: gray; } ');
        $('head').append(`<style id="watchlist-volume-style">
        input[type='range'] {
            -webkit-appearance: none !important;
            height: 5px;
            border-color: transparent;
            background: #d7d7d7;
            margin-top: -5px;
        }
        input[type='range']::-webkit-fill-lower {
            background: #2a2a2a;
        }
        input[type='range']::-webkit-fill-upper {
            background: #7b7b7b;
        }
        input[type='range']::-moz-range-track {
            border: none;
            background: #6b6b6b;
        }
        input[type='range']::-webkit-slider-thumb {
            -webkit-appearance: none !important;
            background: #4d626f;
            height: 15px;
            width: 15px;
	        border-radius: 100%;
	        cursor: pointer;
        }
        input[type='range']::-moz-range-thumb {
            background: #4d626f;
            height: 15px;
            width: 15px;
	        border-radius:  100%;
	        cursor: pointer;
        }
        input[type='range']::-ms-thumb {
            -webkit-appearance: none !important;
            background: #4d626f;
            height: 15px;
            width:  15px;
	        border-radius:  100%;
            cursor: pointer;
        }
        div#notif-header {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
        }
        #cl-h {
            font-size: 1.3rem;
            cursor: pointer;
        }
        #modal-container {
            position: fixed !important;
        }
        </style>`);
    }
});

$(document).ready(function() {
    $('.w3-card-2.w3-round.w3-white.w3-padding-large').first().attr('id', 'profInfoTab'); //Adds an id to the profile box
    var wt_SidebarLink = '<hr><p><i class="fa fa-eye w3-margin-right fa-fw w3-text-theme"></i><a href="#" id="threadsWatched">Watched Threads</a>&nbsp;<b>(<a href="#" id="watchlist-notifications">0</a>)</b></p>'; //Main sidebar links
    var wt_Settings = '<p><i class="fa fa-cog w3-margin-right fa-fw w3-text-theme"></i><a href="#" id="watchlistSettings">Watchlist Settings</a></p>'; //Main sidebar links
    var wt_AddSidebar = '<p id="thread-add"><i class="fa fa-plus-square fa-fw w3-text-theme w3-margin-right"></i><a href="#" id="addThread">Watch This Thread</a></p>'; //Add thread link sidebar
    var wt_RemoveSidebar = '<p id="thread-remove"><i class="fa fa-minus-square fa-fw w3-text-theme w3-margin-right"></i><a href="#" id="removeThread">Stop Watching Thread</a></p>'; //Remove thread link sidebar
    $('#profInfoTab p:last').after(jQuery(wt_SidebarLink)); //Adds the links to the sidebar
    $('#profInfoTab p:last').after(jQuery(wt_Settings)); //Adds the settings to the sidebar

    if (/.*worldwidetorrents\.me\/forums.php\?action\=viewtopic.*/g.test(window.location.href)) { //Tests the location
        if (threadExists) {
            $('#profInfoTab p:last').after(jQuery(wt_RemoveSidebar)); //Adds the "Add Thread" links to sidebar
        } else {
            $('#profInfoTab p:last').after(jQuery(wt_AddSidebar)); //Adds the "Add Thread" links to sidebar
        }
    }

    $('#threadsWatched').click(function() { //"Watched Threads" click event
        var modalContent = '<h2>Watched Threads</h2><hr><br><table align="center" id="threadsTable" class="w3-table w3-striped w3-bordered w3-card-4"><tbody><tr class="tableHead"><th class="w3-centered" height="5" width="600">Thread Name</th><th height="5">Category</th><th heigth="5">Delete</th></tr></tbody></tbody></table><br><hr><p style="font-size: 1.05rem">Created by <span style="text-shadow: 0 0 10px gray;">superiorSilicon</span>&nbsp;|&nbsp;Check out my other scripts <a href="https://greasyfork.org/en/users/111016-superiorsilicon" target="_blank">here</a>.</p>';
        Modal.open({ //Modal constructor
            content: containsThreads ? modalContent : '<h2>Watched Threads</h2><hr>Nothing to see here right now. Add threads to the list to see them.', //Modal content
            draggable: false //Modal draggable boolean
        });
        for (var i = 0; i < threadList.length; i++) {
            var thread = GM_getValue(threadList[i].threadListName); //Gets the thread elements from the DB
            $('#threadsTable tbody').append(thread); //Appends the thread elements to the table
        }
        $('.threadremove a[id*="remove-"]').click(function() {
            GM_deleteValue($(this).attr('id').split(/remove\-/g)[1]); //Deletes the thread element from the DB
            window.location.reload(false); //Reloads the window
        });
        $('#modal-container').attr('style', 'visibility: visible; width: auto; height: auto; top: 20px; left: 250px;');
    });

    $('#watchlistSettings').click(function() {
        Modal.open({
            content: `<h2>Watchlist Settings</h2><span>Created by superiorSilicon</span>
<hr>
<div id="settingsContainer">
    <div id="audioCheckContainer">
        <span>Use Notification Audio:&nbsp;</span><input checked title="Check this box to use notification audio or not." type="checkbox" id="audioCheck">
    </div>
    <div id="audioSourceContainer">
<span>Notification Audio URL:&nbsp;</span>
<input type="text" id="audioSource" value="${notifySource}" title="Input the URL of the notification audio.">
    </div>
    <div id="activityIntervalContainer">
        <span>New activity check interval:&nbsp;</span><input title="Interval between each check for new activity. Defaults to 5 seconds. Values allowed: Between 5 to 25" type="number" id="activityInterval" value="${activityCheckInterval}" min="5" minlength="1" max="25" maxlength="2"><span>seconds</span>
    </div>
    <div id="notificationTimeContainer">
<span>Notification On-Screen Time:&nbsp;</span>
<input type="number" id="notificationTime" value="${notifTime}" min="5" minlength="1" max="25"
    maxlength="2" title="The time for which the notification stays on the screen. Defaults to 10 seconds. Values allowed: Between 5 to 25 seconds"><span>seconds</span>
    </div>
    <div id="notificationSoundContainer">
        <span>Notification Sound Volume:&nbsp;</span><input title="The volume of the notification sound. Defaults to 50%. Values allowed: Between 0% to 100%" type="range" value="${notifyVolume}" id="notifyVolumeRange" style="margin-right: 10px;"><input title="The volume of the notification sound. Defaults to 50%. Values allowed: Between 0% to 100%" type="number" id="notificationVolume" value="` + notifyVolume + `" min="0" max="100" minlength="1" maxlength="3"><span>%</span >
    </div>
</div>
<hr>
<div id="settingsButtonContainer">
    <div id="previewButtonContainer" style="margin-right: auto">
        <button title="Preview The Notification" type="button" id="previewNotif" class="primaryButton">Preview</button>
    </div>
    <div id="resetButtonContainer">
        <button title="Resets all the settings" type="button" id="resetSettings">Reset</button>
    </div>
    <div id="saveButtonContainer">
        <button title="Saves the settings" type="button" id="saveSettings" class="primaryButton">Save</button>
    </div>
    <div id="applyButtonContainer">
        <button title="Saves the settings and reloads the page" type="button" id="applySettings" class="primaryButton">Save &amp; Apply</button>
    </div>
</div>`,
            draggable: false
        });
        if (notifyAudio === true) {
            document.getElementById('audioCheck').checked = true;
        } else {
            document.getElementById('audioCheck').checked = false;
        }
        $('#modal-container').attr('style', 'visibility: visible; width: auto; height: auto; top: 20px; left: 30%;');
        $('#saveSettings').click(function() {
            GM_setValue('useAudio_WT', document.getElementById('audioCheck').checked === true ? true : false);
            GM_setValue('audioSrc_WT', $('#audioSource').val());
            GM_setValue('activity_WT', $('#activityInterval').val());
            GM_setValue('notiTime_WT', $('#notificationTime').val());
            GM_setValue('notSound_WT', $('#notificationVolume').val());
        });
        $('#applySettings').click(function() {
            GM_setValue('useAudio_WT', document.getElementById('audioCheck').checked === true ? true : false);
            GM_setValue('audioSrc_WT', $('#audioSource').val());
            GM_setValue('activity_WT', $('#activityInterval').val());
            GM_setValue('notiTime_WT', $('#notificationTime').val());
            GM_setValue('notSound_WT', $('#notificationVolume').val());
            window.location.reload(false);
        });
        $('#resetSettings').click(function() {
            GM_setValue('useAudio_WT', true);
            GM_setValue('audioSrc_WT', 'http://k003.kiwi6.com/hotlink/deewhztt1h/arpeggio.mp3');
            GM_setValue('activity_WT', '5');
            GM_setValue('notiTime_WT', '10');
            GM_setValue('notSound_WT', '50');
            window.location.reload(false);
        });
        $('#previewNotif').click(function() {
            let previewNotif = new Notification('Notification Preview', {
                body: 'Previewing the current notification settings',
                tag: 'preview-notification'
            });
            threadNotifAudio.volume = document.getElementById('notificationVolume').value / 100;
            threadNotifAudio.play();
        });
        $('#notifyVolumeRange').change(function() {
            $('#notificationVolume').val($('#notifyVolumeRange').val());
        });
        $('#notificationVolume').change(function() {
            $('#notifyVolumeRange').val(document.getElementById('notificationVolume').value);
        });
    });

    $('#removeThread').click(function() {
        GM_deleteValue(threadListName); //Deletes the thread element from the DB
        window.location.reload(false); //Reloads the window
    });

    $('#addThread').click(function() {
        var entryName = 'thread-' + topicId; //Initializes the entryName variable
        var threadEntry = '<tr id="thread-' + topicId + '">' +
            '<td><a title="' + topicName + '" target="_blank" href="/forums.php?action=viewtopic&topicid=' + topicId + '&page=last">' + topicName + '</a></td>' +
            '<td><a target="_blank" href="/forums.php?action=viewforum&forumid=' + categoryId + '">' + category + '</a></td>' +
            '<td style="text-align: center;" class="threadremove"><a title="Remove Thread" href="#" id="remove-' + entryName + '"><span class="btn btn-default"><span class="glyphicon glyphicon-remove" style="color: #E25041 !important;"></span></span></a></td></tr>'; //Formatting the thread element
        GM_setValue(entryName, threadEntry); //Setting the thread element in the DB
        window.location.reload(false); //Reloading the window
    });

    var notifHistoryArr = [];

    function checkActivity() {
        var notificationsCount = $('#watchlist-notifications').html();
        for (var thread of threadList) { //Iterates on the thread list
            let url = 'https://worldwidetorrents.me/forums.php?action=viewtopic&topicid=' + thread.threadListName.split(/thread-/g)[1] + '&page=last';
            let name = thread.threadListName;
            notificationsCount = parseInt(notificationsCount);
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'html',
                success: function(data) {
                    let postsNumber = data.match(/.f-post/g).length; //Gets the number of posts
                    let oldValue = GM_getValue(name + '-posts'); //Gets the number of posts stored in DB
                    let threadName = GM_getValue(name).split(/\<tr id\=\"thread-.*\"\>\<td\>\<a title\=\"/g)[1].split(/\" target\=.*/g)[0];
                    if (postsNumber !== 0 && postsNumber != oldValue) { //Compares the two numbers
                        notificationsCount = notificationsCount + 1;
                        var threadId = GM_getValue(name).split(/\<tr id\=\"thread-/g)[1].split(/\"\>.*/g)[0];
                        $('#watchlist-notifications').html(notificationsCount);
                        Notify('New activity on ' + threadName, 'Thread Notification', name + '-notification', url + '#last'); //Runs the Notify function to push notifications.
                        threadNotifAudio.play(); //Plays notification sound
                        notifHistoryArr.push(`<tr class="notif-${threadId}"><td><a title="${threadName}" target="_blank" href="${url+'#last'}">${threadName}</a></td><td>${new Date()}</td></tr>`);
                    }
                    GM_setValue(name + '-posts', postsNumber); //Sets a new number of posts in DB
                }
            });
        }
        if (notificationsCount >= 1) {
            document.title = '(' + notificationsCount + ') ' + pageTitle;
        } else {
            document.title = pageTitle;
        }
    }

    $('#watchlist-notifications').click(function() {
        Modal.open({
            content: `<div id="notif-header"><h2>Notifications History</h2><span id="cl-h" title="Clear Notification History"><span class="glyphicon glyphicon-remove" style="color: #E25041 !important;"></span></span></div><hr><table align="center" id="notifHistoryTable" class="w3-table w3-striped w3-bordered w3-card-4"><tbody><tr class="tableHead"><th class="w3-centered" height="5" width="300">Thread Name</th><th class="w3-centered" height="5" width="200">Date & Time</th></tr></tbody></table>`
        });
        for (var notif of notifHistoryArr) {
            $('#notifHistoryTable tbody').append(notif);
        }
        $('#modal-container').attr('style', 'visibility: visible; width: auto; height: auto; top: 20px; left: 24.5% !important;');
        $('#cl-h').click(function() {
            $('#notifHistoryTable tbody').html(`<tr class="tableHead"><th class="w3-centered" height="5" width="300">Thread Name</th><th class="w3-centered" height="5" width="200">Date & Time</th></tr>`);
            $('#watchlist-notifications').html('0');
        });
        if (parseInt($('#watchlist-notifications').html()) == 0) {
            $('#notifHistoryTable tbody').html(`<tr class="tableHead"><th class="w3-centered" height="5" width="300">Thread Name</th><th class="w3-centered" height="5" width="200">Date & Time</th></tr>`);
        }
    });

    checkActivity(); //Runs activity function
    setInterval(checkActivity, activityCheckInterval * 1000); //Checks activity every 'n' seconds
});