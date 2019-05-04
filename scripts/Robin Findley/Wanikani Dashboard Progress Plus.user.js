// ==UserScript==
// @name        Wanikani Dashboard Progress Plus
// @namespace   rfindley
// @description Display detailed level progress.
// @version     2.0.7
// @include     https://www.wanikani.com/dashboard
// @include     https://www.wanikani.com/
// @copyright   2018+, Robin Findley
// @license     MIT; http://opensource.org/licenses/MIT
// @run-at      document-end
// @grant       none
// ==/UserScript==

window.dpp = {};

(function(gobj) {

    //===================================================================
    // Initialization of the Wanikani Open Framework.
    //-------------------------------------------------------------------
    var script_name = 'Dashboard Progress Plus';
    var wkof_version_needed = '1.0.27';
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

    wkof.include('ItemData, Menu, Settings');
    wkof.ready('document,ItemData,Menu,Settings').then(load_settings).then(startup);

    //========================================================================
    // Global variables
    //-------------------------------------------------------------------
    var settings, settings_dialog;

    //========================================================================
    // Load the script settings.
    //-------------------------------------------------------------------
    function load_settings() {
        var defaults = {
            time_format: '12hour',
            visible_items: 'all',
            progress_rings: 'all',
            hover_details: 'all',
            locked_position: 'first',
            show_90percent: true,
            show_item_name: true,
            pass_mark: 'check',
            compact_display: true,
        };
        return wkof.Settings.load('dpp', defaults).then(function(data){
            settings = wkof.settings.dpp;
        });
    }

    //========================================================================
    // Startup
    //-------------------------------------------------------------------
    function startup() {
        install_css();
        install_menu();
        init_ui();

        wkof.ItemData.get_items({
            wk_items:{
                options:{
                    assignments:true,
                    review_statistics:true
                },
                filters:{
                    level:'+0',
                    item_type:'radical,kanji',
                }
            }
        })
        .then(process_items);
    }

    //========================================================================
    // Interface customization
    //-------------------------------------------------------------------
    var progress_image =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJwAAAAnCAYAAAD6tSH7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccll'+
        'PAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+ID'+
        'x4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8w'+
        'Mi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbn'+
        'MjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5z'+
        'OnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb2'+
        '0veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyNjY0MTY4NzY1RUFFNDExOUE4OERFMDQ5OThDNEVFNiIgeG1wTU06'+
        'RG9jdW1lbnRJRD0ieG1wLmRpZDo5RTk5NUIzQ0VFRTQxMUU0QUZFNzgxMEQwMDQwMzgwMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5RTk5NU'+
        'IzQkVFRTQxMUU0QUZFNzgxMEQwMDQwMzgwMCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpE'+
        'ZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkVEQkNDNzgxNzBFREU0MTE5QjJFQzRERDc3QUZGN0I5IiBzdFJlZjpkb2N1bWVudE'+
        'lEPSJ4bXAuZGlkOjI2NjQxNjg3NjVFQUU0MTE5QTg4REUwNDk5OEM0RUU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBt'+
        'ZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+U3W7wQAAAkVJREFUeNrsXLFOwzAUdCpYqy5dqgp16Y7UmW7wA3wECz+Uj2BiKxudkdhZqqpi6YK6MoT3VF'+
        'egiqZNMPa95E66DJEtXf1enFzt56woChcQuQuLO2oLpjNHuNdxRJMBlWx6YcIx2aLeY8Ix2aLeywJ/w50Lu8K+cCgcCcfCHsB3Utu05YgJGDrhfoMO'+
        '4KVwIhwkDGqbtMHOdjESbocL4ZVnBhLUpmqDfbXGTLgdroU3/hWCEtSmaaNp+IEn4aNwA/ix3RRtsKYhlUt9Fs6EBWBgm6IN0jR0Ej+xc9C/Faxrg0'+
        'w2B7DSoAP3DhrYJmjjSsMelsIX0KBa10bTcACvwg/QwFrVRtNQgpXwDTSolrXRNJRg4XBhURtNwwlPqwOeSaxqo2k4gDVwUK1qo2kowQY4qBa1wZqG'+
        'M5CB+3Tx1yb/iv1t4ff+dyDqo2kwhG7gdjG00TQYRj9wu5jaaBoMYhi4XSxtNA1GMQrcLoY2rjQYnt3GJ7YdR57ljmmjaTAIrSk4tZCl59sjaKNpMA'+
        'itJZhU7DPx/VC00TQYghatVK2WGvh+CNogv+NSFNFYgBas3LrqVVIKHdAHt92Zm0obTYMhTN22Oiqr2T/z/aeJtbW2ENrazFalFK8Mus45CzjT1dXW'+
        '2kJodINQt9j42Ot17rlMoI2F0GAIdZzCMWjBi9Yg6LbwVSRtNA2JEfrAmDrQGgTdFr7wibd231uM/uOgncafnoSM3LUHrT49iQmXPvloGphw7Us2zn'+
        'BMNpoGJlxzk00vXwIMAERrvuh7OTAxAAAAAElFTkSuQmCC';

    //                        Apprentice,Guru,Master,Enlightened,Burned,Locked
    var srs_radical_colors = '#00aaff,#b69acd,#9aa5cf,#a3c3d3,#999999,#00aaff';
    var srs_kanji_colors = '#ff00aa,#b69acd,#9aa5cf,#a3c3d3,#999999,#ff00aa';

    //========================================================================
    // CSS Styling
    //-------------------------------------------------------------------
    var progress_css =
        '.dpp-progress {background-position:39px 0px;background-repeat:no-repeat;background-image: url("##progress_image##");}'+
        '.progression .lattice-single-character li {padding-top:3px;padding-bottom:3px;margin-top:2px;position:relative;overflow:visible;}'+
        '.progression[data-pass-mark="dot"] .lattice-single-character li > a[data-passed="true"]:after {content:"\uf111";font-family:FontAwesome;font-size:7px;position:absolute;top:-11px;left:31px;z-index:1;color:#7f7;text-shadow:0px 1px 6px #000;}'+
        '.progression[data-pass-mark="check"] .lattice-single-character li > a[data-passed="true"]:after {content:"\uf00c";font-family:FontAwesome;font-size:12px;position:absolute;top:-10px;left:28px;z-index:1;color:#7f7;text-shadow:0px 1px 6px #000;}'+
        '.pct90 {background:#e7e7e7;}'+
        '.pct90_left {border-top-left-radius:50%;border-bottom-left-radius:50%;padding-left:3px;}'+
        '.pct90_right {border-top-right-radius:50%;border-bottom-right-radius:50%;padding-right:3px;}'+

        // Radical colors
        '.radicals-progress .lattice-single-character .dpp-progress[data-srs-lvl="0"] {background-color:#00aaff;}'+
        '.radicals-progress .lattice-single-character .dpp-progress[data-srs-lvl="1"] {background-color:#00aaff;}'+
        '.radicals-progress .lattice-single-character .dpp-progress[data-srs-lvl="2"] {background-color:#00aaff;}'+
        '.radicals-progress .lattice-single-character .dpp-progress[data-srs-lvl="3"] {background-color:#00aaff;}'+
        '.radicals-progress .lattice-single-character .dpp-progress[data-srs-lvl="4"] {background-color:#00aaff;}'+
        '.radicals-progress .lattice-single-character .dpp-progress[data-srs-lvl="5"] {background-color:#b69acd;}'+
        '.radicals-progress .lattice-single-character .dpp-progress[data-srs-lvl="6"] {background-color:#b69acd;}'+
        '.radicals-progress .lattice-single-character .dpp-progress[data-srs-lvl="7"] {background-color:#9aa5cf;}'+
        '.radicals-progress .lattice-single-character .dpp-progress[data-srs-lvl="8"] {background-color:#a3c3d3;}'+
        '.radicals-progress .lattice-single-character .dpp-progress[data-srs-lvl="9"] {background-color:#999999;}'+

        // Kanji colors
        '.kanji-progress .lattice-single-character .dpp-progress[data-srs-lvl="0"] {background-color:#ff00aa;}'+
        '.kanji-progress .lattice-single-character .dpp-progress[data-srs-lvl="1"] {background-color:#ff00aa;}'+
        '.kanji-progress .lattice-single-character .dpp-progress[data-srs-lvl="2"] {background-color:#ff00aa;}'+
        '.kanji-progress .lattice-single-character .dpp-progress[data-srs-lvl="3"] {background-color:#ff00aa;}'+
        '.kanji-progress .lattice-single-character .dpp-progress[data-srs-lvl="4"] {background-color:#ff00aa;}'+
        '.kanji-progress .lattice-single-character .dpp-progress[data-srs-lvl="5"] {background-color:#b69acd;}'+
        '.kanji-progress .lattice-single-character .dpp-progress[data-srs-lvl="6"] {background-color:#b69acd;}'+
        '.kanji-progress .lattice-single-character .dpp-progress[data-srs-lvl="7"] {background-color:#9aa5cf;}'+
        '.kanji-progress .lattice-single-character .dpp-progress[data-srs-lvl="8"] {background-color:#a3c3d3;}'+
        '.kanji-progress .lattice-single-character .dpp-progress[data-srs-lvl="9"] {background-color:#999999;}'+

        // Progress rings
        '.dpp-progress[data-srs-lvl="0"] {background-position:-117px 0px;}'+
        '.dpp-progress[data-srs-lvl="1"] {background-position:39px 0px;}'+
        '.dpp-progress[data-srs-lvl="2"] {background-position:0px 0px;}'+
        '.dpp-progress[data-srs-lvl="3"] {background-position:-39px 0px;}'+
        '.dpp-progress[data-srs-lvl="4"] {background-position:-78px 0px;}'+
        '.dpp-progress[data-srs-lvl="5"] {background-position:39px 0px;}'+
        '.dpp-progress[data-srs-lvl="6"] {background-position:39px 0px;}'+
        '.progression[data-progress-rings="all"] .dpp-progress[data-srs-lvl="6"] {background-position:-39px 0px;}'+
        '.dpp-progress[data-srs-lvl="7"] {background-position:39px 0px;}'+
        '.dpp-progress[data-srs-lvl="8"] {background-position:39px 0px;}'+
        '.dpp-progress[data-srs-lvl="9"] {background-position:39px 0px;}'+
        '.lattice-single-character li.dpp-noshow {width:0px;display:none;}'+

        '.progression[data-show-item-name="false"] .lattice-single-character li>a {color:rgba(0,0,0,0);text-shadow:0 0 0 rgba(0,0,0,0);}'+

        // Compact settings
        'body .progression.dpp_compact {padding-top:4px;padding-bottom:4px;}'+
        'body .progression.dpp_compact .chart {display:none;margin:0px;}'+
        'body .progression.dpp_compact h3 {font-size:14px;margin:4px;}'+
        'body .progression.dpp_compact hr {margin:0px;}'+
        'body .progression.dpp_compact .lattice-single-character {background-image:none;margin:0px 0px 5px 0px;}'+
        'body .progression.dpp_compact .lattice-single-character>div:first-child {display:none;margin:0px;}'+
        'body .progression.dpp_compact .lattice-single-character ul {display:block;margin:0px;}';

    //========================================================================
    // Install stylesheet.
    //-------------------------------------------------------------------
    function install_css() {
        var css = progress_css.replace(/##progress_image##/g, progress_image);
        $('head').append('<style>'+css+'</style>');
    }

    //========================================================================
    // Install menu link
    //-------------------------------------------------------------------
    function install_menu() {
		// Set up menu item to open script.
		wkof.Menu.insert_script_link({name:'dpp',submenu:'Settings',title:'Dashboard Progress Plus',on_click:open_settings});
    }

    //========================================================================
    // Initialize the user interface.
    //-------------------------------------------------------------------
    function init_ui() {
        if (settings.compact_display) {
            $('.progression').addClass('dpp_compact');
            $('.progression .lattice-single-character ul').css('display','');
        } else {
            $('.progression').removeClass('dpp_compact');
        }
        $('.progression').attr('data-pass-mark', settings.pass_mark);
        $('.progression').attr('data-progress-rings', settings.progress_rings);
        $('.progression').attr('data-show-item-name', settings.show_item_name);
    }

    //========================================================================
    // Open the settings dialog
    //-------------------------------------------------------------------
    function open_settings() {
        var config = {
            script_id: 'dpp',
            title: 'Dashboard Progress Plus',
            on_save: settings_saved,
            content: {
                time_format: {type:'dropdown', label:'Time Format', default:'12hour', content:{'12hour':'12-hour','24hour':'24-hour'}, hover_tip:'Display time in 12 or 24-hour format.'},
                visible_items: {type:'dropdown', label:'Visible Items', default:'all', content:{all:'All Items',appr_only:'Apprentice Only'}, hover_tip:'Choose which items to show.'},
                progress_rings: {type:'dropdown', label:'Show Progress Rings', default:'all', content:{all:'Apprentice + Guru',appr_only:'Apprentice Only'}, hover_tip:'Choose which progress rings to show.'},
                pass_mark: {type:'dropdown', label:'"Passed" Mark', default:'dot', content:{check:'Check',dot:'Dot',none:'None'}, hover_tip:'Show a "passed" mark on items that have been Guru\'d\nincluding if they have dropped back to apprentice.'},
                hover_details: {type:'dropdown', label:'Hover Details', default:'all', content:{all:'Item + Pass Date + Next Review',item_next:'Item + Next Review',passed_next:'Pass Date + Next Review',next_review:'Next Review Only'}, hover_tip:'Choose which details to show in the hover pop-up.'},
                locked_position: {type:'dropdown', label:'Locked Item Position', default:'first', content:{first:'First',last:'Last'}, hover_tip:'Choose where locked items are placed.'},
                show_90percent: {type:'checkbox', label:'Show 90% Bracket', default:true, hover_tip:'Show the bracket around 90% of items.'},
                show_item_name: {type:'checkbox', label:'Show Item Name', default:true, hover_tip:'Show item names in circles.'},
                compact_display: {type:'checkbox', label:'Compact Display', default:true, hover_tip:'Enable compact display mode.'},
            }
        };
        var settings_dialog = new wkof.Settings(config);
        settings_dialog.open();
    }

    //========================================================================
    // Handler for when user clicks 'Save' in the settings window.
    //-------------------------------------------------------------------
    function settings_saved(new_settings) {
        settings = new_settings;
        init_ui();
        populate_item_info('radical');
        populate_item_info('kanji');
    }

    //========================================================================
    // Populate level info from API.
    //-------------------------------------------------------------------
    function process_items(data) {
        gobj.items = wkof.ItemData.get_index(data, 'item_type');

        populate_item_info('radical');
        populate_item_info('kanji');
    }

    //========================================================================
    // Populate level info from API.
    //-------------------------------------------------------------------
    function populate_item_info(itype) {
        var ul;
        if (itype === 'radical') {
            ul = $('.radicals-progress .lattice-single-character>ul');
        } else {
            ul = $('.kanji-progress .lattice-single-character>ul');
        }
        var items = wkof.ItemData.get_index(gobj.items[itype], 'subject_id');

        // Populate item data.
        ul.children().each(function(idx, li){
            var subject_id = li.attributes.id.value.split('-')[1];
            var item = items[subject_id];
            li = $(li);
            var a = li.find('>a');

            li.removeAttr('style'); // WK sometimes puts "display:none" here.
            a.addClass('dpp-progress');

            // Populate 'data-srs-lvl', which is a styling selector.
            var srs = (item.assignments ? item.assignments.srs_stage : 0); // 0 == locked
            a.attr('data-srs-lvl', srs);

            if (!a.attr('data-dpp-hover-backup'))
                a.attr('data-dpp-hover-backup', a.attr('data-original-title'));

            // Populate the next review date.
            var next = [];
            var date;
            if (item.assignments && item.assignments.available_at) {
                if (item.assignments.passed) {
                    a.attr('data-passed', 'true');
                    if (settings.hover_details === 'all' || settings.hover_details === 'passed_next') {
                        if (item.assignments.passed_at)
                            date = formatDate(new Date(item.assignments.passed_at), false /* is_next_date */);
                        else
                            date = 'A long time ago...';
                        next.push('<span style="font-size:75%;font-weight:bold;">Passed: '+date+'</span>');
                    }
                }
                if (item.assignments.srs_stage == 9) {
                    if (settings.hover_details === 'all' || settings.hover_details === 'passed_next') {
                        date = formatDate(new Date(item.assignments.burned_at), false /* is_next_date */);
                        next.push('<span style="font-size:75%;font-weight:bold;">Burned: '+date+'</span>');
                    } else {
                        next.push('<span style="font-size:75%;font-weight:bold;">Burned!</span>');
                    }
                } else {
                    date = formatDate(new Date(item.assignments.available_at), true /* is_next_date */);
                    next.push('<span style="font-size:75%;font-weight:bold;">Next: '+date+'</span>');
                }
            } else {
                next.push('<span style="font-size:75%;font-weight:bold;">Locked!</span>');
            }

            // Populate remaining data for popup window.
            var percent = 0;
            var correct;
            var total;
            if (settings.hover_details === 'all' || settings.hover_details === 'item_next')
                a.attr('data-original-title', a.attr('data-dpp-hover-backup')+'<br>'+next.join('<br>'));
            else
                a.attr('data-original-title', next.join('<br>'));
            if (itype==='radicals') {
                if (item.review_statistics) {
                    correct = item.review_statistics.meaning_correct;
                    total = correct + item.review_statistics.meaning_incorrect;
                    if (total > 0) percent = Math.floor(100.0*correct/total);
                }
            } else {
                if (item.review_statistics) {
                    correct = item.review_statistics.meaning_correct + item.review_statistics.reading_correct;
                    total = correct + item.review_statistics.meaning_incorrect + item.review_statistics.reading_incorrect;
                    if (total > 0) percent = Math.floor(100.0*correct/total);
                }
            }
            a.attr('data-content', '<div class="progress"><div class="bar full" style="width: '+Math.max(percent,15)+'%;">'+percent+'%</div></div>');
            try {
                a.data('popover').options.content = null;
            } catch(e) {}
            if (settings.hide_circle_content) a.html('&nbsp;');
        });

        // Sort items by srs level, then review date, then meaning.
        var li_arr = ul.children();
        var srs_locked = (settings.locked_position === 'first' ? 0 : 10);
        li_arr.sort(function(a,b){
            a = items[a.attributes.id.value.split('-')[1]];
            b = items[b.attributes.id.value.split('-')[1]];
            var a_passed = (a && a.assignments && a.assignments.passed);
            var b_passed = (b && b.assignments && b.assignments.passed);
            if (!a_passed && b_passed) return -1;
            if (a_passed && !b_passed) return 1;
            var a_srs = (a && a.assignments && a.assignments.srs_stage ? a.assignments.srs_stage : srs_locked);
            var b_srs = (b && b.assignments && b.assignments.srs_stage ? b.assignments.srs_stage : srs_locked);
            if (a_srs < b_srs) return -1;
            if (a_srs > b_srs) return 1;
            var a_avail = (a && a.assignments && a.assignments.available_at ?
                           new Date(a.assignments.available_at).getTime() : Number.MAX_SAFE_INTEGER);
            var b_avail = (b && b.assignments && b.assignments.available_at ?
                           new Date(b.assignments.available_at).getTime() : Number.MAX_SAFE_INTEGER);
            if (a_avail < b_avail) return 1;
            if (a_avail > b_avail) return -1;
            if (a.data.slug < b.data.slug) return -1;
            if (a.data.slug > b.data.slug) return 1;
            return 0;
        });
        li_arr.detach().appendTo(ul);

        $('.progression .lattice-single-character ul>li').removeClass('dpp-noshow pct90_left pct90 pct90_right');
        if (settings.visible_items !== 'all') {
            for (var srslvl=5; srslvl<=9; srslvl++) {
                $('.dpp-progress[data-srs-lvl="'+srslvl+'"]').parent().addClass('dpp-noshow');
            }
        }
        if (settings.show_90percent) {
            // Add marker at 90%, indicating when level will be complete.
            // First, make sure there are at least 10% of items left.
            var idx90 = Math.floor(li_arr.length * 0.1);
            var len = ul.children(':not(.dpp-noshow)').length;
            if (idx90 < len) {
                ul.children().eq(idx90).addClass('pct90_left');
                ul.children().slice(idx90).addClass('pct90');
                ul.children(':not(.dpp-noshow)').last().addClass('pct90_right');
            }
        }
    }

    //========================================================================
    // Print date in pretty format.
    //-------------------------------------------------------------------
    function formatDate(d, is_next_date){
        var s = '';
        var now = new Date();
        var YY = d.getFullYear(),
            MM = d.getMonth(),
            DD = d.getDate(),
            hh = d.getHours(),
            mm = d.getMinutes(),
            one_day = 24*60*60*1000;

        if (is_next_date && d < now) return "Available Now";
        var same_day = ((YY == now.getFullYear()) && (MM == now.getMonth()) && (DD == now.getDate()) ? 1 : 0);

        //    If today:  "Today 8:15pm"
        //    otherwise: "Wed, Apr 15, 8:15pm"
        if (same_day) {
            s += 'Today ';
        } else {
            s += ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()]+', '+
                ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][MM]+' '+DD+', ';
        }
        if (settings.time_format === '24hour')
            s += ('0'+hh).slice(-2)+':'+('0'+mm).slice(-2);
        else
            s += (((hh+11)%12)+1)+':'+('0'+mm).slice(-2)+['am','pm'][Math.floor(d.getHours()/12)];

        // Append "(X days)".
        if (is_next_date && !same_day) {
            var days = (Math.floor((d.getTime()-d.getTimezoneOffset()*60*1000)/one_day)-Math.floor((now.getTime()-d.getTimezoneOffset()*60*1000)/one_day));
            if (days) s += ' ('+days+' day'+(days>1?'s':'')+')';
        }

        return s;
    }

})(window.dpp);
