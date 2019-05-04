// ==UserScript==
// @name        Wanikani Self-Study Hide Info
// @namespace   rfindley
// @description Hide item info on the Level and Item screens for self-study.
// @version     1.0.1
// @include     /^https://www.wanikani.com/level/\d+$/
// @include     /^https://www.wanikani.com/(radicals|kanji|vocabulary)\?difficulty=.+$/
// @copyright   2018+, Robin Findley
// @license     MIT; http://opensource.org/licenses/MIT
// @run-at      document-end
// @grant       none
// ==/UserScript==

window.ss_hideinfo = {};

(function(gobj) {

    //===================================================================
    // Initialization of the Wanikani Open Framework.
    //-------------------------------------------------------------------
    var script_name = 'Self-Study Quiz';
    var wkof_version_needed = '1.0.17';
    if (!window.wkof) {
        if (confirm(script_name+' requires Wanikani Open Framework.\nDo you want to be forwarded to the installation instructions?'))
            window.location.href = 'https://community.wanikani.com/t/instructions-installing-wanikani-open-framework/28549';
        return;
    }
    if (wkof.version.compare_to(wkof_version_needed) === 'older') {
        if (confirm(script_name+' requires Wanikani Open Framework version '+wkof_version_needed+'.\nDo you want to be forwarded to the update page?'))
            window.location.href = 'https://greasyfork.org/en/scripts/38582-wanikani-open-framework';
        return;
    }

    wkof.include('Settings');
    wkof.ready('document, Settings')
    .then(load_settings)
    .then(install_interface);

    //========================================================================
    var btnbar, sections;
    function install_interface() {
        var html =
            '<div class="ss_hideinfo">'+
            '  <label>Self-study:</label>'+
            '  <div class="btn-group">'+
            '    <button class="btn enable" title="Enable/Disable self-study plugin"></button>'+
            '    <button class="btn quiz hidden" title="Open the quiz window">Quiz</button>'+
            '    <button class="btn shuffle" title="Shuffle the list of items below">Shuffle</button>'+
            '    <select class="btn mode" title="Select a self-study preset">'+
            '      <option value="jp2en">Japanese to English</option>'+
            '      <option value="en2jp">English to Japanese</option>'+
            '    </select>'+
            '    <select class="btn lockburn" title="Select a self-study preset">'+
            '      <option value="all">Show All Items</option>'+
            '      <option value="hideunlocked">Show Locked Only</option>'+
            '      <option value="hideunburned">Show Burned Only</option>'+
            '      <option value="hidelocked">Hide Locked</option>'+
            '      <option value="hideburned">Hide Burned</option>'+
            '      <option value="hidelockedburned">Hide Locked and Burned</option>'+
            '    </select>'+
            '  </div>'+
            '</div>';

        var css =
            '.ss_hideinfo {margin-left:20px; margin-bottom:10px; position:relative;}'+
            '.ss_hideinfo label {display:inline; vertical-align:middle; padding-right:4px; color:#999; font-family:"Open Sans","Helvetica Neue",Helvetica,Arial,sans-serif; text-shadow:0 1px 0 #fff;}'+
            '.ss_hideinfo select.btn {width:200px;}'+

            '.ss_hideinfo button.enable {width:55px;}'+
            'section[id^="level-"].ss_active .ss_hideinfo button.enable {background-color:#b3e6b3; background-image:linear-gradient(to bottom, #ecf9ec, #b3e6b3);}'+
            'section[id^="level-"].ss_active .ss_hideinfo button.enable:after {content:"ON";}'+
            'section[id^="level-"]:not(.ss_active) .ss_hideinfo button.enable:after {content:"OFF";}'+

            'section[id^="level-"].ss_active.ss_hidechar .character-item a span:not(.dummy) {opacity:0; transition:opacity ease-in-out 0.15s}'+
            'section[id^="level-"].ss_active.ss_hideread .character-item a li[lang="ja"] {opacity:0; transition:opacity ease-in-out 0.15s}'+
            'section[id^="level-"].ss_active.ss_hidemean .character-item a li:not([lang="ja"]) {opacity:0; transition:opacity ease-in-out 0.15s}'+
            'section[id^="level-"].ss_active.ss_hideburned .character-item.burned {display:none;}'+
            'section[id^="level-"].ss_active.ss_hidelocked .character-item.locked {display:none;}'+
            'section[id^="level-"].ss_active.ss_hideunburned .character-item:not(.burned) {display:none;}'+
            'section[id^="level-"].ss_active.ss_hideunlocked .character-item:not(.locked) {display:none;}'+

            'section[id^="level-"].ss_active .character-item:hover a span {opacity: initial !important; transition:opacity ease-in-out 0.05s !important;}'+
            'section[id^="level-"].ss_active .character-item:hover a li {opacity: initial !important; transition:opacity ease-in-out 0.05s !important;}'+

            '';

        $('head').prepend('<style>'+css+'</style>');
        sections = $('section[id^="level-"]');
        sections.prepend(html);

        btnbar = sections.find('.ss_hideinfo');
        btnbar.find('button.enable').on('click', toggle_enable);
        btnbar.find('button.quiz').on('click', open_quiz);
        btnbar.find('button.shuffle').on('click', shuffle);
        btnbar.find('select.mode').on('change', mode_changed);
        btnbar.find('select.lockburn').on('change', lockburn_changed);

        wkof.wait_state('ss_quiz', 'ready').then(function(){
            if (typeof ss_quiz.open === 'function')
                btnbar.find('button.quiz').removeClass('hidden');
        });

        toggle_enable(null, true /* no_toggle */);
        mode_changed();
        lockburn_changed();
        if (settings.enabled) shuffle();
    }

    //========================================================================
    var settings;
    function load_settings() {
        var default_settings = {
            enabled: false,
            mode: 'jp2en',
            lockburn: 'all',
        };
        return wkof.Settings.load('ss_hideinfo')
        .then(function(){
            settings = $.extend(true, {}, default_settings, wkof.settings.ss_hideinfo);
            settings = wkof.settings.ss_hideinfo;
        });
    }

    //========================================================================
    function save_settings() {
        wkof.Settings.save('ss_hideinfo');
    }

    //========================================================================
    function toggle_enable(e, no_toggle) {
        var enabled = settings.enabled;
        if (no_toggle !== true) enabled = !enabled;
        if (enabled)
            sections.addClass('ss_active');
        else
            sections.removeClass('ss_active');
        if (enabled !== settings.enabled) {
            settings.enabled = enabled;
            save_settings();
        }
    }

    //========================================================================
    function fisher_yates_shuffle(arr) {
        var i = arr.length, j, temp;
        if (i===0) return arr;
        while (--i) {
            j = Math.floor(Math.random()*(i+1));
            temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
        }
        return arr;
    }

    //========================================================================
    function shuffle(e) {
        var sec;
        if (e === undefined) {
            // Shuffle all
            $('section[id^="level-"]').each(function(){
                sec = $(this);
                sec.find('[class$="-character-grid"]').append(fisher_yates_shuffle(sec.find('.character-item').detach()));
            });
        } else {
            // Shuffle specific group
            var btn = $(e.currentTarget);
            sec = btn.closest('section[id^="level-"]');
            sec.find('[class$="-character-grid"]').append(fisher_yates_shuffle(sec.find('.character-item').detach()));
        }
    }

    //========================================================================
    function mode_changed(e) {
        if (e !== undefined) {
            var value = $(e.target).val();
            settings.mode = value;
            save_settings();
        } else {
            value = settings.mode;
        }
        btnbar.find('select.mode').val(value);
        sections.removeClass('ss_hidechar ss_hideread ss_hidemean');
        switch (value) {
            case 'jp2en':
                sections.addClass('ss_hidemean ss_hideread');
                break;

            case 'en2jp':
                sections.addClass('ss_hidechar ss_hideread');
                break;
        }
    }

    //========================================================================
    function lockburn_changed(e) {
        if (e !== undefined) {
            var value = $(e.target).val();
            settings.lockburn = value;
            save_settings();
        } else {
            value = settings.lockburn;
        }
        btnbar.find('select.lockburn').val(value);
        sections.removeClass('ss_hidelocked ss_hideburned ss_hideunlocked ss_hideunburned');
        switch (value) {
            case 'all':
                break;

            case 'hidelocked':
                sections.addClass('ss_hidelocked');
                break;

            case 'hideburned':
                sections.addClass('ss_hideburned');
                break;

            case 'hidelockedburned':
                sections.addClass('ss_hidelocked ss_hideburned');
                break;

            case 'hideunlocked':
                sections.addClass('ss_hideunlocked');
                break;

            case 'hideunburned':
                sections.addClass('ss_hideunburned');
                break;
        }
    }

    //========================================================================
    function open_quiz(e) {
        var btn = $(e.currentTarget);
        sec = btn.closest('section[id^="level-"]');
        var parts = sec.attr('id').split('-');
        var level = parts[1];
        var item_type = window.location.pathname.match(/^\/([a-z]+)/)[1];
        if (item_type === 'level') item_type = parts[2];
        var item_type_text = item_type;
        item_type_text[0] = item_type_text[0].toUpperCase();
        var title = 'Level '+level+' '+item_type_text;
        item_type = item_type.replace(/s$/g, '');

        var custom_options = {
            ipreset: {name: title, content: {
                wk_items: {enabled: true, filters: {
                    level: {enabled: true, value: level},
                    item_type: {enabled: true, value: item_type},
                }},
            }},
        };
        switch (settings.lockburn) {
            case 'all':
                break;

            case 'hidelocked':
                custom_options.ipreset.content.wk_items.filters.srs = {enabled:true,value:'1,2,3,4,5,6,7,8,9'};
                break;

            case 'hideburned':
                custom_options.ipreset.content.wk_items.filters.srs = {enabled:true,value:'-1,0,1,2,3,4,5,6,7,8'};
                break;

            case 'hidelockedburned':
                custom_options.ipreset.content.wk_items.filters.srs = {enabled:true,value:'1,2,3,4,5,6,7,8'};
                break;

            case 'hideunlocked':
                custom_options.ipreset.content.wk_items.filters.srs = {enabled:true,value:'-1,0'};
                break;

            case 'hideunburned':
                custom_options.ipreset.content.wk_items.filters.srs = {enabled:true,value:'9'};
                break;
        }

        if (settings.mode === 'en2jp' && item_type === 'vocabulary') {
            custom_options.qpreset = {
                name: 'English to Japanese',
                content: {
                    mean2read:true,
                }
            };
        } else {
            custom_options.qpreset = {
                name: 'Japanese to English',
                content: {
                    char2read:true,
                    char2mean:true,
                }
            };
        }
        ss_quiz.open(custom_options);
    }

})(window.ss_hideinfo);
