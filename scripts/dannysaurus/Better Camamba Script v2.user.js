// ==UserScript==
// @name            Better Camamba Script v2
// @name:de         Better Camamba Skript v2
// @namespace       dannysaurus.camamba
// @include         http://www.camamba.com/*
// @include         https://www.camamba.com/*
// @include         http://www.de.camamba.com/*
// @include         https://www.de.camamba.com/*
// @connect         camamba.com
// @version         1.5
// @license         MIT License
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
// @grant           GM_listValues
// @grant           GM_xmlhttpRequest
// @require         https://greasyfork.org/scripts/20131-html-utils/code/html-utils.js?version=132590
// @require         https://greasyfork.org/scripts/20132-camamba-utils/code/camamba-utils.js?version=134620
// @description     make notes about users
// @description:de  Notizen über User speichern
// ==/UserScript==
/* todo: sync data cross browsers (e.g. Dropbox, Skydrive or Google Drive) */

// Page specific modules
({
profile_view : function() { // http://www.camamba.com/profile_view.php
    switch (Page.url.getQueryParamValue("m")) { // identify opened Tab
        case 'start': // Tab is 'Home'
            // update name of the user which is logged in
            var curUserId = Page.url.getQueryParamValue("uid");
            var curUser = new User(curUserId);
            curUser.uname = document.getElementsByClassName('profname')[0].innerHTML;
            curUser.save();
            break;
        default: break;
    }
},
profile : function() { // http://www.camamba.com/profile.php
    // get current user which is logged in
    var curUserId = window.localStorage.LSt;
    var curUser = new User(curUserId);
    var nameInTitle = /camamba:\s(.+)$/i.exec(document.title);
    if (nameInTitle.length === 2) {
        // update name
        curUser.uname = nameInTitle[1];
        curUser.save();
    }
    // create select with all stored users
    var allUsers = User.prototype.loadAllUsers();
    var elSelectUsers = HtmlFactory.newSelectUsers(allUsers, 'bcs-user');
    var elLblUser = HtmlFactory.newLabel('bcs-user','User ');
    /** @returns {User} The current selected user */
    var selUser = function() { return elSelectUsers.selectedUser(); };

    // create buttons 'forget', 'save' and 'view profile'
    var elBtnUserForget = HtmlFactory.newButtonTiny(function() {
        if (selUser().uid !== curUser.uid && elSelectUsers.length >= 2) {
            if (window.confirm('Forget about ' + selUser().name + '?')) {
                selUser().remove();
                elSelectUsers.users = User.prototype.loadAllUsers();
                updatefields();
            }
        }
    }, 'forget');
    elBtnUserForget.className = elBtnUserForget.className + ' alignTL';
    var elCbUser = HtmlFactory.newCheckbox(function() {
        elSelectUsers.isShowGivenNames = elCbUser.checked;
    });
    var elBtnUserSave = HtmlFactory.newButtonSmall(function() {
        selUser().name = elTxtName.value;
        selUser().note = elTxtNote.value;
        selUser().save();
    }, 'save');
    var elBtnOpenProfile = HtmlFactory.newButtonSmall(function () {
        selUser().openProfilePage(true);
    }, "view profile");

    // name
    var elTxtName = HtmlFactory.newInput(24, selUser().name, 'bcs-name text');
    var elLblName = HtmlFactory.newLabel('bcs-name','Name: ');
    var elBtnNameClear = HtmlFactory.newButtonTiny(function() {
        selUser().name = '';
        elTxtName.value = selUser().name;
    }, 'clear');

    // note (describtion) about user
    var elTxtNote = HtmlFactory.newTextArea(3, 400, selUser().note, 'bcs-note text');
    elTxtNote.style = 'width:132px';
    var elLblNote = HtmlFactory.newLabel('bcs-note','Note: ');
    var elBtnNoteClear = HtmlFactory.newButtonTiny(function() {
        elTxtNote.value = selUser().note = '';
    }, 'clear');

    var updatefields = function() {
        elTxtName.value = selUser().name;
        elTxtNote.value = selUser().note;
    };
    elSelectUsers.setOnChangeKeyUpFocus(function() {
        updatefields();
        elSelectUsers.users = User.prototype.loadAllUsers();
    });

    // inject HTML elements into DOM
    var elRoot = HtmlFactory.newDiv(),
        elDivSelect = HtmlFactory.newDiv(),
        elDivUserBtns = HtmlFactory.newDiv(),
        elDivUserName = HtmlFactory.newDiv(),
        elDivNote = HtmlFactory.newDiv();

    elRoot.addAsOnlyChild(document.getElementsByClassName('alignMR')[0]);
    elRoot.appendChildren(elDivSelect,elDivUserName, elDivNote, elDivUserBtns);

    elDivSelect.appendChildren(elLblUser, elSelectUsers, elCbUser ,elBtnUserForget);
    elDivUserBtns.appendChildren(elBtnUserSave, elBtnOpenProfile);
    elDivUserName.appendChildren(elLblName, elTxtName, elBtnNameClear);
    elDivNote.appendChildren(elLblNote, elTxtNote, elBtnNoteClear);
},
webcam_window_v4 : function() {
    document.addEventListener('mousewheel', function(e) {
        if(e.ctrlKey) {
            e.preventDefault();
        }
    });
},
search : function() {
    //'http://www.camamba.com/search.php?gender=any&online=1&page=0'
}
}[Page.route] || function(){
    console.info('route is not defined:', Page.route);
})();