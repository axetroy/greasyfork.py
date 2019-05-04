// ==UserScript==
// @name         WaniKani Notify
// @namespace    http://tampermonkey.net/
// @version      3.7
// @description  Popup notification when reviews are available
// @author       You
// @match        https://www.wanikani.com/dashboard
// @require      https://greasyfork.org/scripts/22751-wanikani-settings/code/WaniKani%20Settings.js?version=166555
// @grant        none
// ==/UserScript==

var notification;

(function() {
    'use strict';
// Hook into App Store
    //try { $('.app-store-menu-item').remove(); $('<li class="app-store-menu-item"><a href="https://community.wanikani.com/t/there-are-so-many-user-scripts-now-that-discovering-them-is-hard/20709">App Store</a></li>').insertBefore($('.navbar .dropdown-menu .nav-header:contains("Account")')); window.appStoreRegistry = window.appStoreRegistry || {}; window.appStoreRegistry[GM_info.script.uuid] = GM_info; localStorage.appStoreRegistry = JSON.stringify(appStoreRegistry); } catch (e) {}

    var settings_dialog;

        if (!window.wkof) {
        if (confirm('WaniKani Notify requires Wanikani Open Framework.\nDo you want to be forwarded to the installation instructions?'))
            window.location.href = 'https://community.wanikani.com/t/instructions-installing-wanikani-open-framework/28549';
        return;
    }

    if (!window.wkof) {
        alert('WK Notify requires Wanikani Open Framework.\nYou will now be forwarded to installation instructions.');
        window.location.href = 'https://community.wanikani.com/t/instructions-installing-wanikani-open-framework/28549';
        return;
    }

    var defaults = {
        notifyEnabled: true,
        notifyPushoverEnabled: false,
        notifyPushoverToken: '',
        notifyPushoverUser: ''
    };

    // Determine the correct object to use
    notification = window.Notification || window.mozNotification || window.webkitNotification;

    addStyle('#divNotifyLink.error {' +
        '  background-color: red;' +
        '}');
    // The user needs to allow this
    if ('undefined' === typeof notification)
        alert('Web notification not supported');
    else
        notification.requestPermission(function(permission){});

    doNotify();

    function install_menu() {
        wkof.Menu.insert_script_link({
            script_id: 'notify',
            name: 'notify',
            submenu:   'Settings',
            title:     'WaniKani Notify',
            on_click:  open_settings
        });
    }
    function open_settings() {
        settings_dialog.open();
    }
    function install_settings() {
        settings_dialog = new wkof.Settings({
            script_id: 'notify',
            name: 'notify',
            title: 'WaniKani Notify',
            on_save: process_settings,
            settings: {
                'notify_main': {type:'page',label:'Main',content:{
                //    'grp_detail': {type:'group',label:'Review Details',content:{
                        'notifyEnabled': {type:'checkbox', label:'Enabled', default: true}
                //    }}
                }},
                'notify_pushover': {type: 'page', label: 'Pushover', content: {
                    'notifyPushoverEnabled': {type: 'checkbox', label: 'Enabled', default: false},
                    'notifyPushoverToken': {type:'text', label:'Token', default:''},
                    'notifyPushoverUser': {type:'text', label:'User', default:''},
                }},
            }
        });
        settings_dialog.load().then(function(){
            wkof.settings.notify = $.extend(true, {}, defaults,wkof.settings.notify);
            settings_dialog.save();
            fetchData();
        });
    }

    function process_settings(){
        settings_dialog.save();
        console.log('Settings saved!');
    }

    function doNotify(){
        wkof.include('Apiv2, Menu, Settings');
        wkof.ready('Menu').then(install_menu);
        wkof.ready('Apiv2, Settings').then(install_settings);//.then(fetchData);
    }


    function fetchData() {
        var promises = [];
        promises.push(wkof.Apiv2.get_endpoint('summary'));
        Promise.all(promises).then(get_items);
    }

    function get_items(results) {
        if(wkof.settings.notify.notifyEnabled == false) return;
        getReviewTime(results[0]);
    }


    function getReviewTime(data){
        if(data.reviews[0].subject_ids.length > 0){
            Notify("WaniKani reviews available",data.reviews[0].subject_ids.length + " reviews available");
        } else {
            var next = Date.parse($.grep(data.reviews,function(item,value){return item.subject_ids.length > 0;})[0].available_at) -$.now() + 60000;
            console.log("Next check in " + (next / 60000) + " minutes");
            setTimeout(function() {
                fetchData();
            }, next);
        }
    }


    // A function handler
    function Notify(titleText, bodyText)
    {
        if ('undefined' === typeof notification)
            return false;       //Not supported....
        var noty = new notification(
            titleText, {
                body: bodyText,
                dir: 'auto', // or ltr, rtl
                lang: 'EN', //lang used within the notification.
                tag: 'notificationPopup', //An element ID to get/set the content
                //icon: 'https://cdn.wanikani.com/assets/default-v2/logo-site-no-color-1ff7dfc36ee98fd2de4aa6b24e3515f5.png', //The URL of an image to be used as an icon
                icon: $('.nav').find("[href='/dashboard']").eq(0).find('span').eq(0).css('background-image').replace('url("','').replace('")',''),
                clickToHide: true
            }
        );
        noty.onclick = function () {
            console.log('notification.Click');
        };
        noty.onerror = function () {
            console.log('notification.Error');
        };
        noty.onshow = function () {
            console.log('notification.Show');
        };
        noty.onclose = function () {
            console.log('notification.Close');
        };
        if(wkof.settings.notify.notifyPushoverEnabled == true){
            $.ajax({
                type     : "POST",
                url      : "https://api.pushover.net/1/messages.json",
                data     : {
                    token   : wkof.settings.notify.notifyPushoverToken,
                    user    : wkof.settings.notify.notifyPushoverUser,
                    message : bodyText,
                    title   : "WaniKani"
                }
            });
        }
        return true;
    }
})();