// ==UserScript==
// @name         WaniKani Vocab-Kanji Hover
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  try to take over the world!
// @author       You
// @match        https://www.wanikani.com/review/session
// @match        https://www.wanikani.com/
// @match        https://www.wanikani.com/dashboard
// @require      https://greasyfork.org/scripts/369353-jigen-s-other-stuff/code/Jigen's%20other%20stuff.js?version=604095
// @require      https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js?version=115012
// @grant        none
// ==/UserScript==

window.wk_VocabKanjiHover = {};

var wkItemData;
(function(global) {
    'use strict';
    jigen.checkWKOF('WaniKani Vocab-Kanji Hover');

    var wrongCount = 0;
    var settings_dialog;
    var defaults = {
        autoToolTip: false,
        autoToolTipOnlyIncorrect: false
    };
    var wkHoverDebug = false;

    $('head').append('<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" type="text/css" />');

    wkItemData = '';

    if(window.location.pathname == "/" || window.location.pathname == "/dashboard"){
        wkof.include('ItemData, Menu, Settings');
        wkof.ready('Menu').then(install_menu);
        wkof.ready('Settings').then(install_settings);
        wkof.ready('ItemData').then(fetch_items);
    } else {
        wkof.include('ItemData, Settings');
        wkof.ready('Settings').then(install_settings);
        wkof.ready('ItemData').then(fetch_items);
    }

    function install_menu() {
        wkof.Menu.insert_script_link({
            script_id: 'wkvkh',
            name: 'wkvkh',
            submenu:   'Settings',
            title:     'WaniKani Vocab-Kanji Hover',
            on_click:  open_settings
        });
    }
    function open_settings() {
        settings_dialog.open();
    }
    function install_settings() {
        settings_dialog = new wkof.Settings({
            script_id: 'wkvkh',
            name: 'wkvkh',
            title: 'WaniKani Vocab-Kanji Hover',
            on_save: process_settings,
            settings: {
                'autoToolTip': {type:'checkbox',label:'Auto Tooltip',default:defaults.autoToolTip},
                'autoToolTipOnlyIncorrect': {type:'checkbox',label:'  (only on incorrect)',default:defaults.autoToolTipOnlyIncorrect}
            }
        });
        settings_dialog.load().then(function(){
            wkof.settings.wkvkh = $.extend(true, {}, defaults, wkof.settings.wkvkh);
        });
    }
    function process_settings(){
        settings_dialog.save();
        if(wkHoverDebug) console.log('Settings saved!');
    }

    function fetch_items() {
        var items_config = {
            wk_items: {
                filters: {
                    item_type: {value:['kanji']},
                    level: {value:'1 - -1'},
                //has_burned: {value: false}
			}}
        };
        
        if(wkHoverDebug) console.log("Starting vocab hover");
        wkof.ItemData.get_items(items_config).then(process_items).then(waitForKeyElements ("#question .vocabulary", startHover));
    }

    function process_items(items) {
        wkItemData = items;
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

    function startHover(){
        if(wkHoverDebug) console.log("Starting vocab hover core");
        $('#question .vocabulary').append($('<div>',{id: 'vocabDiv'}));
        addStyle('#question .vocabulary span {' +
                ' display: none;' +
                '} ' +
                '#question .vocabulary span.show {' +
                ' display: initial;' +
                '} ' +
                '#question .kanji div {' +
                ' display: none;' +
                '} ' +
                '#question .radical div {' +
                ' display: none;' +
                '}');
        $.jStorage.listenKeyChange('currentItem', function (key, action) {
            if(wkof.settings.wkvkh.autoToolTip){
                $('.tooltip').tooltip("close");
            }
            if (action === 'updated') {
                updateQuestion();
            }
        });
        $.jStorage.listenKeyChange('questionCount', function (key, action) {
            if(wkof.settings.wkvkh.autoToolTip){
                if((wkof.settings.wkvkh.autoToolTipOnlyIncorrect && wrongCount != $.jStorage.get('wrongCount')) || !wkof.settings.wkvkh.autoToolTipOnlyIncorrect){
                    $('#question .vocabulary .tooltip').tooltip( "open" );
                }
            }
            wrongCount = $.jStorage.get('wrongCount');
        });
        updateQuestion();
    }

    function updateQuestion(){
        if(wkHoverDebug) console.log("Updating Question");
        if($('#question .vocabulary').length == 1){
            var pieces = $('#question .vocabulary span').html().split('');
            if(wkHoverDebug) console.log("Clearing vocab");
            $('#vocabDiv').html('');
            $.each(pieces,function(item,value){
                if(wkHoverDebug) console.log("Get item from data: " + value);
                var item2 = jQuery.grep(wkItemData, function( a ) {
                    return a.data.characters === value;
                });
                if(item2[0] != undefined){
                    if(wkHoverDebug) console.log("Obtained data.  Apending Question: " + value);
                    var meanings = [];
                    $.each(item2[0].data.meanings,function(item,value){
                        meanings.push(value.meaning);
                    });
                    $('#vocabDiv').append($('<span>',{
                        text: value,
                        title: $('#question-type').hasClass('meaning') ? (wkof.settings.wkvkh.autoToolTip ? meanings.join(",<br/>") : meanings.join(", ")) : '',
                        lang: 'ja',
                        style: "cursor: pointer;",
                        class: 'tooltip show'
                    }));
                } else {
                    if(wkHoverDebug) console.log("Failed to obtain data.  Apending Question: " + value);
                    $('#vocabDiv').append($('<span>',{
                        text: value,
                        lang: 'ja',
                        style: "cursor: pointer;",
                        class: 'show'
                    }));
                }
            });
            if(wkHoverDebug) console.log("Creating Tooltip");
                $('#question .vocabulary .tooltip:even').tooltip({
                    position: {
                        my: "center center-20",
                        at: "center bottom",
                        using: function( position, feedback ) {
                            $( this ).css( position );
                            $( "<div>" )
                                .appendTo( this );
                        }
                    },
                    content: function () {
                        return $(this).prop('title');
                    }
                });
                $('#question .vocabulary .tooltip:odd').tooltip({
                    position: {
                        my: "center center " + (wkof.settings.wkvkh.autoToolTip ? "+" : "-") + "20",
                        at: "center " + (wkof.settings.wkvkh.autoToolTip ? "top" : "bottom"),
                        using: function( position, feedback ) {
                            $( this ).css( position );
                            $( "<div>" )
                                .appendTo( this );
                        }
                    },
                    content: function () {
                        return $(this).prop('title');
                    }
                });
        }
    }

})(window.wk_VocabKanjiHover);