// ==UserScript==
// @name         WaniKani Fast Abridged Wrong/Multiple Answer
// @namespace    http://tampermonkey.net/
// @version      4.1
// @description  try to take over the world!
// @author       You
// @match        https://www.wanikani.com/review/session
// @match        https://www.wanikani.com/
// @match        https://www.wanikani.com/dashboard
// @grant        none
// ==/UserScript==

window.wk_fawa = {};

var wrongCountFAWA;
(function(global) {
    'use strict';
    // Hook into App Store
    // try { $('.app-store-menu-item').remove(); $('<li class="app-store-menu-item"><a href="https://community.wanikani.com/t/there-are-so-many-user-scripts-now-that-discovering-them-is-hard/20709">App Store</a></li>').insertBefore($('.navbar .dropdown-menu .nav-header:contains("Account")')); window.appStoreRegistry = window.appStoreRegistry || {}; window.appStoreRegistry[GM_info.script.uuid] = GM_info; localStorage.appStoreRegistry = JSON.stringify(appStoreRegistry); } catch (e) {}

    if (!window.wkof) {
        if (confirm('WaniKani Fast Abridged Wrong/Multiple Answer requires Wanikani Open Framework.\nDo you want to be forwarded to the installation instructions?'))
            window.location.href = 'https://community.wanikani.com/t/instructions-installing-wanikani-open-framework/28549';
        return;
    }

    var settings_dialog;
    var defaults = {
        alwaysShow: false,
        alwaysShowOnlyMultiple: false,
        dontShowWrong: false,
        correctColor: "#88cc00",
        incorrectColor: "#ff0033",
        customColor: false
    };

    wrongCountFAWA = $.jStorage.get("wrongCount");
    if(window.location.pathname == "/" || window.location.pathname == "/dashboard"){
        wkof.include('Apiv2, Menu, Settings');
        wkof.ready('Menu').then(install_menu);
        wkof.ready('Settings').then(install_settings);
    } else {
        wkof.include('Apiv2, Settings');
        wkof.ready('Settings').then(install_settings).then(function(){
            $('#user-response').after("<div id='divCorrect' class='hidden'><span id='lblCorrect' type='text' style='display: none;' disabled></span></div>");
            if(1 == 1){
            }
            $.jStorage.listenKeyChange('currentItem', function (key, action) {
                if (action === 'updated') {
                    $('#lblCorrect').text('');
                    $('#divCorrect').addClass('hidden');
                }
            });
            $.jStorage.listenKeyChange('questionCount', function (key, action) {
                if(wrongCountFAWA != $.jStorage.get("wrongCount"))
                {
                    wrongCountFAWA = $.jStorage.get("wrongCount");
                    if(wkof.settings.fawa.dontShowWrong != true){
                        showCorrect(0);
                    }
                }
                else {
                    if (action === 'updated' && $.jStorage.get("questionCount") > 0 && wkof.settings.fawa.alwaysShow == true) {
                        showCorrect(1);
                    }
                }
            });
        });
    }

    function install_menu() {
        wkof.Menu.insert_script_link({
            script_id: 'fawa',
            name: 'fawa',
            submenu:   'Settings',
            title:     'Fast Abridged Wrong/Multiple Answer',
            on_click:  open_settings
        });
    }
    function open_settings() {
        settings_dialog.open();
    }
    function install_settings() {
        settings_dialog = new wkof.Settings({
            script_id: 'fawa',
            name: 'fawa',
            title: 'Fast Abridged Wrong/Multiple Answer',
            on_save: process_settings,
            settings: {
				'grp_main': {
                    type:'group',
                    label:'Main',
                    content:{
                        'alwaysShow': {type:'checkbox',label:'Always Show Correct Answers',default:defaults.alwaysShow,on_change:alwaysShowChanged},
                        'alwaysShowOnlyMultiple': {type:'checkbox',label:'&nbsp;&nbsp;&nbsp;(Only if multiple answers)',default:defaults.alwaysShowOnlyMultiple},
                        'dontShowWrong': {type:'checkbox',label:'&nbsp;&nbsp;&nbsp;(Don\'t show wrongs)',default:defaults.dontShowWrong}
                    }
                },
                'grp_colors':{
                    type: 'group',
                    label: 'colors',
                    content: {
                        'customColor': {type:'checkbox',label:'Custom Colors',default:defaults.customColor,on_change:customColorsChanged},
                        'correctColor': {type:'color',label:'Correct',default:defaults.correctColor},
                        'incorrectColor': {type:'color',label:'Incorrect',default:defaults.incorrectColor},
                    }
                }
            }
        });
        settings_dialog.load().then(function(){
            wkof.settings.fawa = $.extend(true, {}, defaults, wkof.settings.fawa);
            addStyle('#divCorrect.hidden {' +
                     '  display: none !important;' +
                     '}' +
                     '#divCorrect {' +
                     '  width: 100%; !important;' +
                     '  display:table; !important;' +
                     '}' +
                     '#lblCorrect {' +
                     '  height: ' + $('#answer-form input[type=text]').css('height') + ' !important;' +
                     '  min-height: ' + $('#answer-form input[type=text]').css('height') + ' !important;' +
                     '  display:table-cell !important;' +
                     '  vertical-align:middle; !important;' +
                     '  font-family: ' + $('#user-response').css('font-family') + ';' +
                     '  font-size: ' + $('#user-response').css('font-size') + ';' +
                     '  color: #fff; !important;' +
                     '  -webkit-text-fill-color: #fff; !important;' +
                     '  text-shadow: ' + ($(window).width() < 767 ? '1px 1px 0 rgba(0,0,0,0.2);' : '2px 2px 0 rgba(0,0,0,0.2);') + ' !important;' +
                     '  -webkit-transition: background-color 0.1s ease-in; !important;' +
                     '  -moz-transition: background-color 0.1s ease-in; !important;' +
                     '  -o-transition: background-color 0.1s ease-in; !important;' +
                     '  transition: background-color 0.1s ease-in; !important;' +
                     '  opacity: 1 !important;' +
                     '}' +
                     '#answer-form fieldset.correct #divCorrect {' +
                     ' background-color: ' + (wkof.settings.fawa.customColor == true ? wkof.settings.fawa.correctColor : '#88cc00') + ' !important;' +
                     '}' +
                     '#answer-form fieldset.incorrect #divCorrect {' +
                     ' background-color: ' + (wkof.settings.fawa.customColor == true ? wkof.settings.fawa.incorrectColor : '#f03') + '!important;' +
                     '}');
        });
    }
    function alwaysShowChanged(){
        if($(this).prop('checked') == false){
            $('#fawa_alwaysShowOnlyMultiple').attr('disabled','disabled');
            $('#fawa_alwaysShowOnlyMultiple').prop("checked",false);
            $('#fawa_alwaysShowOnlyMultiple').closest('.row').css('display','none');
            $('#fawa_dontShowWrong').attr('disabled','disabled');
            $('#fawa_dontShowWrong').prop("checked",false);
            $('#fawa_dontShowWrong').closest('.row').css('display','none');
        } else {
            $('#fawa_alwaysShowOnlyMultiple').removeAttr('disabled');
            $('#fawa_alwaysShowOnlyMultiple').closest('.row').css('display','block');
            $('#fawa_dontShowWrong').removeAttr('disabled');
            $('#fawa_dontShowWrong').closest('.row').css('display','block');
        }
    }
    function customColorsChanged(){
        if($(this).prop('checked') == false){
            $('#fawa_grp_colors .row:gt(0)').css('display','none');
        } else {
            $('#fawa_grp_colors .row:gt(0)').css('display','block');
        }
    }
    function process_settings(){
        settings_dialog.save();
        console.log('Settings saved!');
    }

    function showBar(mode){//0=wrong, 1=right
        $('#lblCorrect').css('display','block');
    }

    function showCorrect(mode){
        switch($('#question-type h1').text().toLowerCase()){
            case "vocabulary reading":
                if(mode === 1 && wkof.settings.fawa.alwaysShowOnlyMultiple == true && $.jStorage.get("currentItem").kana.length === 1) return;
                showBar(mode);
                $('#lblCorrect').text($.jStorage.get("currentItem").kana.join(", "));
                $('#divCorrect').removeClass('hidden');
                break;
            case "vocabulary meaning":
            case "kanji meaning":
            case "radical name":
                if(mode === 1 && wkof.settings.fawa.alwaysShowOnlyMultiple == true && ($.jStorage.get("currentItem").en.length + $.jStorage.get("currentItem").syn.length) === 1) return;
                showBar(mode);
                $('#lblCorrect').text($.jStorage.get("currentItem").en.join(", "));
                if($.jStorage.get("currentItem").syn.join(", ").length > 0){
                    $('#lblCorrect').text($('#lblCorrect').text() + ', ' + $.jStorage.get("currentItem").syn.join(", "));
                }
                $('#divCorrect').removeClass('hidden');
                break;
            case "kanji reading":
                switch($.jStorage.get("currentItem").emph.toLowerCase()){
                    case "onyomi":
                        if(mode === 1 && wkof.settings.fawa.alwaysShowOnlyMultiple == true && $.jStorage.get("currentItem").on.length === 1) return;
                        showBar(mode);
                        $('#lblCorrect').text($.jStorage.get("currentItem").on.join(", "));
                        $('#divCorrect').removeClass('hidden');
                        break;
                    case "kunyomi":
                        if(mode === 1 && wkof.settings.fawa.alwaysShowOnlyMultiple == true && $.jStorage.get("currentItem").kun.length === 1) return;
                        showBar(mode);
                        $('#lblCorrect').text($.jStorage.get("currentItem").kun.join(", "));
                        $('#divCorrect').removeClass('hidden');
                        break;
                }
                break;
        }
    }

    function addStyle(aCss) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (head) {
            style = document.createElement('style');
            style.setAttribute('type', 'text/css');
            style.textContent = aCss;
            head.appendChild(style);
            return style;
        }
        return null;
    }
})(window.wk_fawa);