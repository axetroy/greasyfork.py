// ==UserScript==
// @name        Sbx Dashboard 2017
// @namespace   SBES
// @version     0.2.3d
// @description Adds a Dashboard to the Swagbucks Account page
// @match       http://www.swagbucks.com/account/summary*
// @run-at      document-start
// @require http://cdn.jsdelivr.net/raphael/2.1.2/raphael-min.js
// @require https://cdn.rawgit.com/jashkenas/underscore/da996e665deb0b69b257e80e3e257c04fde4191c/underscore-min.js
// @grant       none
// @copyright   2014 eskodhi
// ==/UserScript==
/* Changelog
 *
 * 20190101 - Minor display fixes
 * 20170823 - Fix minor bugs: Dashboard/Collector bills button cosmetic, clicking previous button to dashboard would not work, updated mobile app list, changed daily mobile app to 20 points
 * ???????? - Fix code for new Swagbucks account summary page layout (author unknown)
 * 20160326 - Last version put out by eskodhi, all prior changes can be viewed at https://greasyfork.org/en/scripts/4829-sbx-dashboard/versions
 */

/*
 Sbx Dashboard - a userscript to make Swagbucks' ledger more user friendly
 Copyright (C) 2014 - eskodhi (eskodhi[at]gmail.com)

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

//# sourceMappingURL=underscore-min.map
/*jslint node: true */

function require(condition, callback) {
    if (condition() !== true) {
        setTimeout(function() {
            require(condition, callback);
        }, 50);
    } else {
        callback();
    }
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
var watchXMLHttpRequest = true;

function suppress(someFunc, howLong, callback) {
    var times_called = 0;
    return function() {
        if (times_called != howLong) {
            console.log('a call to a suppressed function was made');
            
            callback(times_called, howLong, someFunc);
            times_called++;
            return;
        }
        return someFunc.apply(this, arguments);
    };
}


var open = window.XMLHttpRequest.prototype.open,
    send = window.XMLHttpRequest.prototype.send,
    onReadyStateChange;

function openReplacement(method, url, async, user, password) {
    var syncMode = async !== false ? 'async' : 'sync';
    console.warn(
        'Preparing ' +
        syncMode +
        ' HTTP request : ' +
        method +
        ' ' +
        url
    );
    return open.apply(this, arguments);
}

function sendReplacement(data) {
    console.warn('Sending HTTP request data : ', data);
    
    if(this.onreadystatechange) {
        this._onreadystatechange = this.onreadystatechange;
    }
    this.onreadystatechange = onReadyStateChangeReplacement;
    
    return send.apply(this, arguments);
}

function onReadyStateChangeReplacement() {
    console.warn('HTTP request ready state changed : ' + this.readyState);
    
    var concerned = false, self = this, fullArgs = arguments;
    if (this.responseURL.indexOf('cmd=sb-acct-ledger') != -1 && this.readyState == 4 && watchXMLHttpRequest === true) {
        concerned = true;
    }
    
    if(this._onreadystatechange) {
        return (concerned === false || watchXMLHttpRequest !== true ) ? this._onreadystatechange.apply(this, arguments) : (function() {
            var result = self._onreadystatechange.apply(self, fullArgs);
            var data = parseLdgrCmd(self.responseText);
            
            require(function() {
                return SBES.account.dashboard !== undefined;
            }, function() {
                SBES.account.dashboard.initialize(data);
                watchXMLHttpRequest = false;
            });
            return result;
        })();
    }
}

window.XMLHttpRequest.prototype.open = openReplacement;
window.XMLHttpRequest.prototype.send = sendReplacement;


function parseLdgrCmd(response) {
    var emptyData = [];
    if (response.substr(0, 2) == "1|") {
        var idxL = response.indexOf("@");
        var lifeSB = response.substr(2, idxL);
        var data = eval("(" + response.substr(idxL + 3) + ")");
        return data;
    }
    return emptyData;
}

require(function() {
    return window.jQuery !== undefined;
}, function() {
});


// Global namespace
var SBES = window.SBES = {
    account: {}
};


// App configuration
var valid_options = {
    hide_empty: [true, false],
    format: ['money', 'swagbucks'],
    sort: ['alpha', 'num'],
    order: ['asc', 'desc'],
    show_progress: [true, false]
},
    defaults = {
        hide_empty: true,
        format: 'swagbucks',
        sort: 'alpha',
        order: 'desc', // Doesn't work yet, sry
        show_controls: true,
        show_progress: true,
        theme: 'Minimal'
    },
    app_label = 'sbes_account',
    icons = { opened: '-', closed: '+', empty: ' ' },
    sb_settings = SBES.account.settings = new SBESStoredOptions(app_label+'_settings', defaults);

// APP IDENTIFIERS
var MOBILE_APP_IDS = [18],
    REFERRAL_IDS = [2],
    DAILY_IDS = [100,15],
    ENCRAVE_IDS = [22],
    SURVEY_IDS = [12,17],
    PURCHASES_IDS = [5,6],
    WATCHED_IDS = [16,26],
    OTHER_IDS = [];

// App Maximums (in SB)
// *CHANGE*
var APP_MAXES = {
    "EntertaiNow":  4,
    "SB Watch":     10,
    "SB Mobile - Watch":  10,
    "Sportly":      4,
    "MovieCli.ps":  4,
    "Indymusic":    4,
    "Lifestylz":    4
};


SbxDashboard.getInstance = function(forContainer) {
    if (typeof SbxDashboard.instance == 'undefined') {
        SbxDashboard.instance = new SbxDashboard(forContainer);
    }
    return SbxDashboard.instance;
};


// Some times the data takes a while to load, so let's just add the dash to the DOM
require(function() {
    return document.getElementById('pageHeaderContainer') !== null;
}, function() {
    var ldgr = document.getElementById('pageHeaderContainer');
    var dashboard = SbxDashboard.getInstance(ldgr);
    SBES.account.dashboard = dashboard;
});

// Let's get this show on the road...
function SbxDashboard($ldgrCont, options) {
    this.options = $.extend({}, {
        auto_run: true,
        dashboard_id: 'dashboard',
        dashboard_tab_id: 'dashboardTab'
    }, options);
    
    this.data = {
        ALL_RECORDS: {},
        ALL_CATEGORIES: []
    };
    this.sections = [];
    
    this.$ldgrCont = $($ldgrCont);
    this.$navigation = $('#pageHeaderButtons');
    this.flags = {
        init: false,
        hooked: false,
        built: false,
        rendered: false
    };
    
    // build our container
    this.$dashboard = $('<section></section>')
    //.css('display', 'none')
    .attr('id', this.options.dashboard_id)
    .html('<div id="dashboard-overlay" style="display: none"><div class="sbes-options-container"><div class="sbes-options-header"><h3>Account Dashboard Configuration</h3><div class="sbes-toolbar"><a href="#" id="sbes-close-options">Close</a></div></div><div class="sbes-options"><div class="radio"><span class="setting">Display unit:</span><label><input id="option-format-swagbucks" name="sbes_score_units" type="radio" value="swagbucks">Swagbucks</label><label><input id="option-format-money" name="sbes_score_units" type="radio" value="money">Dollars</label></div><div class="radio"><span class="setting">Sorting:</span><label><input id="option-sort-alpha" name="sbes_sort" type="radio" value="alpha">Offer name</label><label><input id="option-sort-num" name="sbes_sort" type="radio" value="num">Reward amount</label></div><div class="radio"><span class="setting">Sort Order:</span><label><input id="option-order-asc" name="sbes_order" type="radio" value="asc">Asc</label><label><input id="option-order-desc" name="sbes_order" type="radio" value="desc">Desc</label></div><div class="checkbox"><label><span class="setting">Hide empty sections</span></label><input id="option-hide-empty" name="sbes_hide_empty" type="checkbox"></div><div class="checkbox"><label><span class="setting">Show Mobile App Progress</span></label><input id="option-show-progress" name="sbes_show_progress" type="checkbox"></div><div class="dropdown"><label><span class="setting">Dashboard Theme</span></label><select class="form-control" name="sbes_theme"><option>Default</option><option>Minimal</option></select></div></div></div><div id="dashboard-overlay-bg"></div></div><div class="sbes-dashboard-header"><div class="sbes-toolbar"><a href="#" id="sbes-ui-expand-all">Expand All</a> | <a href="#" id="sbes-ui-collapse-all">Collapse All</a> | <a href="#" id="sbes-options-link">Options</a></div></div>');
    
    this.$tab = $('<button></button>')
    .attr('id', this.options.dashboard_tab_id)
    .addClass('sbCta sbColor1')
    .attr('style', 'float: left; width: 11rem; padding: .6rem 0; border: .1rem solid #69b8d6;')
    .text('Dashboard');
    
    var self = this;
    Object.defineProperty(this, 'selected', {
        get: function() {
            return this.$tab.hasClass('sbBgColor1');
        },
        set: function(value) {
            if (value !== true && value !== false) return;
            if (value === true) {
                this.$tab.addClass('sbBgColor1').removeClass('sbColor1');
            }
            if (value === false) {
                this.$tab.removeClass('sbBgColor1').addClass('sbColor1');
            }
        }
    });
    
    this.build();
}

SbxDashboard.prototype.buildLayout = function() {
    if (this.flags.built === true) {
        return;
    }  
    
    this.build();
    
    this.flags.built = true;
};

SbxDashboard.prototype.initialize = function(data) {
    if (this.flags.initialized === true) {
        return;
    }
    
    if (this.flags.built !== true) {
        this.build();
    }
    
    
    // load the previous tab first
    this.loadPreviousTab();
    
    this.render(data);
    
    this.hookData();
    
    this.flags.initialized = true;
};

SbxDashboard.prototype.loadPreviousTab = function() {       
     // reselect the previously selected tab only on first render
     var prev_tab_id = localStorage.getItem(app_label + '_dashboard_selected_tab') || this.$navigation.find('.sbBgColor1').attr('id');
     debug('Previously selected tab found was: ', prev_tab_id);
     $(document.getElementById(prev_tab_id)).click();
     return prev_tab_id;
}

/**
* Re-render the dashboard when the user has updated the data
*/
SbxDashboard.prototype.hookData = function() {
    var hooked = false,
        self = this;

    function arr_same(curArr, newArr) {
        if (!$.isArray(curArr) || !$.isArray(newArr)) {
            return false;
        }
        
        if (newArr.length != curArr.length ) {
            return false;
        }
        
        var results = newArr.filter(function(el, idx) {
            return curArr[idx] == el;
        });
        
        return newArr.length == results.length;
    }
    
    function hook(object, property, initial, runOnFirst) {
        runOnFirst = (runOnFirst === undefined) ? 1 : runOnFirst;
        if (hooked) return;
        
        var newProp ='_' + property;
        
        // set the new prop to initial value
        object[newProp] = object[property];
        
        try {
            Object.defineProperty(object, property, {
                get: function () {
                    return object[newProp];
                },
                set: function (value) {
                    var changed = !arr_same(object[newProp], value);
                    
                    
                    if (object[newProp] === initial && !runOnFirst) {
                        debug('"' + newProp + '" was set to', value, ' but runOnFirst was false');
                    }
                    if (object[newProp] === undefined && runOnFirst || (object[newProp] !== undefined)) {
                        console.log('calling render because "', property,'" was set');
                        console.log('Was changed:', changed);
                        debug('object property "' + property + '" was changed from:', object[newProp], ' to:', value);
                        
                        
                        console.log('Is dashboard tab selected:',self.selected);
                        self.render(value);
                        //                        } else {
                        //                            console.log('did not render because the dashboard tab was not selected');
                        //                        }
                    }
                    //} else {
                    //                                console.log('property has not changed');
                    //                            }
                    object[newProp] = value;
                    
                }
            });
            hooked = true;
        }
        catch (e) {}
    }
    debug('Attempting to hook into window.myData...');
    hook(window, 'myData', window.myData, false);
    
    if (hooked) {
        debug("SUCCESS! Hooked into window.myData");
        return;
    }
    debug('FAILED! Could not hook into myData');
    
    // Hook into the lstPage object's data property
    debug('Attempting to hook into lstPage.data...');
    hook(window.lstPage, 'data', myData, true);
    
    if (!hooked) {
        throw new TypeError();
    } else {
        debug('SUCCESS! Hooked into lstPage.data');
    }
};


SbxDashboard.prototype.requestData = function(allHistory) {            
/*    
    // request the initial data
    $.get("/?cmd=sb-acct-ledger&allTime=false&sid=" + Math.random(), function(response) {
        if (response.substr(0, 2) == "1|") {
            var idxL = response.indexOf("@");
            var lifeSB = response.substr(2, idxL);
            var myData = JSON.parse(response.substr(idxL + 3).replace(new RegExp("'", 'g'), '"'));
            var test = eval("(" + response.substr(idxL + 3) + ")");
            console.log('rendering after manually sending ajax');
            
        }
    });
  */  
};

/**
* Loads the given data into ALL_RECORDS
* @param someData
*/
SbxDashboard.prototype.loadData = function(someData) {
    var self = this;
    
    // merge the initial mobile data into this data
    var merged_data = this.getEmptyData().concat(someData);
    
    // Loop through all the records and build a usable array with the label, the value and the category id for each record
    var label, category, date, reward, record, dailies = [], rename;
    $.each(merged_data, function (id, data) {
        
        // 12 - Surveys
        // 15 - Bonus Offers
        // 18 - Mobile Apps
        // 22 - Encrave
        // 100* - Dailies
        rename = true;
        category = data[0];
        date = data[1];
        reward = data[3];
        label = (data[5] || 'Unknown');
        if (category == 14) {
            label = "Play";
        }
        if (category == 1) {
            label = "Search";
        }

        
        // if this is a encrave, let's see if is a daily for the day
        if (label.indexOf("Daily+Crave") != -1 || label.indexOf("NOSO") != -1 || label.indexOf("Daily Poll") != -1 || label.indexOf("Toolbar") != -1) {
            if (data[0] == 22 && dailies.indexOf(data[1]) == -1 && data[3] === 1) {
                dailies.push(date);
                category = 100;
                label = "Daily Crave";
                rename = false;
            }
            if (data[0] == 15) {
                category = 100;
                rename = false;
            }
        }
        
        if (rename) {
            // now format the label
            label = fn_format_label(label, category);
        }
        
        // Finally, build the record
        record = {category: category, date: date, points: data[3], note: data[5]};
        
        if (self.data.ALL_RECORDS === undefined) {
            self.data.ALL_RECORDS = {};
        }
        
        if (self.data.ALL_RECORDS[label] === undefined) {
            self.data.ALL_RECORDS[label] = record;
            self.data.ALL_RECORDS[label].date = [record.date];
        } else {
            self.data.ALL_RECORDS[label].points = self.data.ALL_RECORDS[label].points + data[3];
            self.data.ALL_RECORDS[label].date.push(date);
        }
        
        if (self.data.ALL_CATEGORIES.indexOf(category) == -1) {
            self.data.ALL_CATEGORIES.push(category);
        }
    });
    
    // Build the list of categories referred to as Others
    OTHER_IDS = $.grep(self.data.ALL_CATEGORIES, function(app) {
        return (MOBILE_APP_IDS.concat(REFERRAL_IDS, DAILY_IDS, ENCRAVE_IDS, SURVEY_IDS, PURCHASES_IDS, WATCHED_IDS).indexOf(app) == -1);
    });
    
    this.data.OTHER_IDS = OTHER_IDS;
    
};
            
SbxDashboard.prototype.clear = function(clearData) {
    debug('clear() -> Cleaning things up');
    if (clearData === true) {
        debug('Removing data as well');
        this.data = {
            ALL_RECORDS: {},
            ALL_CATEGORIES: []
        };
    }
    this.sections = [];
    this.getSections().html('');
};

SbxDashboard.prototype.build = function() {
    if (this.flags.built === true) return;
    
    // We usually need a reference to this
    var self = this;
    
    // Add the dashboard to the page
    this.$dashboard.appendTo(this.$ldgrCont.parent());
    
    // Add our tab to the page
    this.$navigation.append(this.$tab);
    
    // Prepare the overlay
    this.overlay = new SbxDashboardOverlay(this);
    
    $(this.overlay).bind('settingsChanged', function() {
        self.render();
    });
    
    // Unload the Dashboard tab when a different tab gets clicked
//    $('button', this.$navigation).live('click', function() {
        // Remembered the selected tab
//        fn_record_tab($(this));
//    });
    
    
    $('button', this.$navigation).live('click', function() {
        if (this.id == self.$tab[0].id) {
            return;
        }
        debug('a non-dashboard tab was clicked');
        
        // hide the dashboard
        self.$dashboard.removeClass();
        
        // mark our tab as unselected
        self.selected = false;
        
        if (this.id == "pageHeaderButtonLedger") {
            document.getElementById('tableView').className = "active";
        } else { // pageHeaderButtonCollectorBill was clicked
            document.getElementById('collectorBills').className = "active";
        }
        this.className = this.className.replace('sbColor1','sbBgColor1');
        if (sb_settings.show_controls) {
            var c = $('.contListControl');
            $('#ledgerContL').prepend(c);
        }
    });
    
    var initialRenderDone=false;
    // register the handler with the window
    this.$tab.click(function(event) {
        debug('the Dashboard tab was clicked');
        event.preventDefault();
        
        self.$dashboard.siblings('section').removeClass('active');
        self.$dashboard.addClass('active');
        
        //if (initialRenderDone === false) {
            //self.render();
            //initialRenderDone = true;
        //}
        
        if (sb_settings.show_controls) {
            var c = $('.contListControl'); $('#dashboard').prepend(c);
        }
        
        // Mark our tab as selected
        $('button', self.$navigation).removeClass('sbBgColor1').addClass('sbColor1');
        self.selected = true;
        debug('Dashboard tab selected?', self.selected);
    });
    
    // Append CSS/Themes
    if (typeof this.themes == 'undefined') {
        this.themes = [];
    }
    
    this.themes.push({
        name: 'Default',
        //    css: '@-webkit-keyframes animate-stripes{to{background-position:0 0}from{background-position:44px 0}}@-moz-keyframes animate-stripes{to{background-position:0 0}from{background-position:36px 0}}.ui-progress-bar{-moz-border-radius:25px;-o-border-radius:25px;-ms-border-radius:25px;-khtml-border-radius:25px;background:-moz-linear-gradient(#949daa 0,#abb2bc 100%);background:-o-linear-gradient(#949daa 0,#abb2bc 100%);background:-ms-linear-gradient(#949daa 0,#abb2bc 100%);-moz-box-shadow:inset 0 1px 2px 0 rgba(0,0,0,.5),0 1px 0 0 #fff;-o-box-shadow:inset 0 1px 2px 0 rgba(0,0,0,.5),0 1px 0 0 #fff}.ui-progress-bar.blue .ui-progress{background-color:#339BB9!important;border:1px solid #287a91}.ui-progress-bar.error .ui-progress{background-color:#C43C35!important;border:1px solid #9c302a}.ui-progress-bar.warning .ui-progress{background-color:#D9B31A!important;border:1px solid #ab8d15}.ui-progress-bar.success .ui-progress{background-color:#57A957!important;border:1px solid #458845}.ui-progress-bar.transition .ui-progress{-moz-transition:background-color .5s ease-in,border-color 1.5s ease-out,box-shadow 1.5s ease-out;-o-transition:background-color .5s ease-in,border-color 1.5s ease-out,box-shadow 1.5s ease-out}.ui-progress-bar .ui-progress{height:23px;-moz-border-radius:25px;-webkit-border-radius:25px;-o-border-radius:25px;-ms-border-radius:25px;-khtml-border-radius:25px;border-radius:25px;-moz-background-size:36px 36px;background-color:#74d04c}.ui-progress-bar .ui-progress span.ui-label{-moz-font-smoothing:antialiased;-webkit-font-smoothing:antialiased;-o-font-smoothing:antialiased;-ms-font-smoothing:antialiased;-khtml-font-smoothing:antialiased;font-smoothing:antialiased;font-size:13px;position:absolute;right:0;line-height:23px;padding-right:12px;color:rgba(0,0,0,.6);text-shadow:rgba(255,255,255,.45) 0 1px 0;white-space:nowrap}.ui-progress-bar .ui-progress span.ui-label b{font-weight:700}div#dashboard{border:0 solid #ddd;clear:both;overflow:hidden}div#dashboard h3{padding:1em 0 .7em 1em}div.app-sections{border:1px solid #ddd;border-top:0}div.app-section{overflow:auto}div.app-section h4{margin:0;cursor:pointer;padding:0 0 0 8px;font-weight:700;font-size:12px;line-height:28px;text-align:left;color:#353535;border:1px solid #CBCBCB;border-left:0;border-right:0}div.app-section h4:hover{color:#316CB1}div.app-section.empty h4{color:#aaa;cursor:default}span.section-name{padding-left:1em}span.section-visual-state{padding-left:.5em}div.app-section.minimized div.scores-container{display:none}div.scores-container{overflow:hidden;cursor:default!important}div.offer-reward{width:90px;float:left;border:1px solid #ddd;margin:1em;padding:0;text-align:center;background-color:#FFF;position:relative}div.offer-reward:hover span.app-name{background-color:#316CB1;color:#FFF;padding-top:1px}div.offer-reward:hover span.offer-points{font-weight:700}div.offer-reward span.app-name{color:#FAFAFA;background-color:#316CB1;padding:.2em;height:2.5em;display:block;font-size:12px}span.section-rewards{float:right;width:5em;background-color:#303030;color:#A4C554;text-align:center;font-size:1.25em}span.app-name.single-line{line-height:2.5em;padding-top:1px}span.offer-points{font-size:1.4em;display:block;padding:1em 0 .5em;overflow:hidden}div#dashboard-overlay{position:absolute;margin-top:-60px}div#dashboard-overlay-bg{background-color:#FFF;opacity:.7;z-index:200;position:absolute}div.sbes-options{padding:0 2em 2em}.sbes-options-container{position:relative;background-color:#FFF;float:right;z-index:205;margin-top:60px}div.sbes-dashboard-header{overflow:hidden}div.sbes-options-header{overflow:hidden;border-bottom:1px solid #DDD}div.sbes-options-header h3{float:left}div.sbes-toolbar{padding:1em;float:right}div.sbes-toolbar a{background-color:#fff;color:#275DA3;border-bottom:0 none;cursor:pointer;height:26px}span.setting{width:10em;display:inline-block;font-weight:700;padding-right:1em;text-align:right}.sbes-options-input{margin:0;padding:0}input#option-hide-empty{margin-left:2px}.checkbox,.radio{position:relative;display:block;min-height:20px;margin-top:10px;margin-bottom:10px}.btn{display:inline-block;padding:6px 12px;margin-bottom:0;font-size:14px;font-weight:400;line-height:1.42857143;text-align:center;white-space:nowrap;vertical-align:middle;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-image:none;border:1px solid transparent;border-radius:4px}.btn-default{color:#333;background-color:#fff;border-color:#ccc}.btn:focus,.btn:hover{color:#333;text-decoration:none}.btn-default.active,.btn-default:active,.btn-default:focus,.btn-default:hover,.open>.dropdown-toggle.btn-default{color:#333;background-color:#e6e6e6;border-color:#adadad}.sbes-options-container{-webkit-box-shadow:1px 1px 5px 0 rgba(50,50,50,.75);-moz-box-shadow:1px 1px 5px 0 rgba(50,50,50,.75);box-shadow:1px 1px 5px 0 rgba(50,50,50,.75);padding:.5em;font-size:.9em}span.offer-progress{font-size:12px;position:absolute;right:-15px;top:-8px;background-color:#A4C554;color:#40561F;padding:3px 5px;font-weight:700;-webkit-border-radius:10px;-moz-border-radius:10px;border-radius:10px}.app-progressbar{position:relative}span.app-name{z-index:5;position:relative}.app-progressbar .ui-progress-bar{position:absolute;width:100%;top:0;z-index:0}span.offer-progress.maxed-out{background-color:#b31217;border-radius:10px;padding:3px 8px;font-weight:700;font-size:11px;color:#FFF}',
        css: '#dashboard{display:none}#dashboard.active{display:block}#pageHeaderButtonCollectorBill{border-radius:0 0 0 0;}#dashboardTab{border-radius:0 .4rem .4rem 0;}div#dashboard{border:0 solid #ddd;clear:both;overflow:hidden}div#dashboard h3{padding:1em 0 .7em 1em}div.app-sections{border:1px solid #ddd;border-top:0}div.app-section{overflow:auto}div.app-section h4{margin:0;cursor:pointer;padding:0 0 0 8px;font-weight:700;font-size:12px;line-height:28px;text-align:left;color:#353535;border:1px solid #CBCBCB;border-left:0;border-right:0}div.app-section h4:hover{color:#316CB1}div.app-section.empty h4{color:#aaa;cursor:default}span.section-name{padding-left:1em}span.section-visual-state{padding-left:.5em}div.app-section.minimized div.scores-container{display:none}div.scores-container{overflow:hidden;cursor:default!important}div.offer-reward{width:90px;float:left;border:1px solid #ddd;margin:1em;padding:0;text-align:center;background-color:#FFF;position:relative}div.offer-reward:hover span.app-name{background-color:#316CB1;color:#FFF}div.offer-reward:hover span.offer-points{font-weight:700}div.offer-reward span.app-name{color:#FAFAFA;background-color:#316CB1;padding:.2em;height:2.5em;display:block;font-size:12px}span.section-rewards{float:right;width:5em;background-color:#303030;color:#A4C554;text-align:center;font-size:1.25em}span.app-name.single-line{line-height:2.5em;padding-top:.2em}span.offer-points{font-size:1.4em;display:block;padding:1em 0 .5em;overflow:hidden}div#dashboard-overlay{position:absolute;margin-top:-60px}div#dashboard-overlay-bg{background-color:#FFF;opacity:.7;z-index:200;position:absolute}div.sbes-options{padding:0 2em 2em}.sbes-options-container{position:relative;background-color:#FFF;float:right;z-index:205;margin-top:60px}div.sbes-dashboard-header{overflow:hidden}div.sbes-options-header{overflow:hidden;border-bottom:1px solid #DDD}div.sbes-options-header h3{float:left}div.sbes-toolbar{padding:1em;float:right}div.sbes-toolbar a{background-color:#fff;color:#275DA3;border-bottom:0 none;cursor:pointer;height:26px}span.setting{width:10em;display:inline-block;font-weight:700;padding-right:1em;text-align:right}.sbes-options-input{margin:0;padding:0}input#option-hide-empty{margin-left:2px}.checkbox,.radio{position:relative;display:block;min-height:20px;margin-top:10px;margin-bottom:10px}.btn{display:inline-block;padding:6px 12px;margin-bottom:0;font-size:14px;font-weight:400;line-height:1.42857143;text-align:center;white-space:nowrap;vertical-align:middle;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-image:none;border:1px solid transparent;border-radius:4px}.btn-default{color:#333;background-color:#fff;border-color:#ccc}.btn:focus,.btn:hover{color:#333;text-decoration:none}.btn-default.active,.btn-default:active,.btn-default:focus,.btn-default:hover,.open>.dropdown-toggle.btn-default{color:#333;background-color:#e6e6e6;border-color:#adadad}.sbes-options-container{-webkit-box-shadow:1px 1px 5px 0 rgba(50,50,50,.75);-moz-box-shadow:1px 1px 5px 0 rgba(50,50,50,.75);box-shadow:1px 1px 5px 0 rgba(50,50,50,.75);padding:.5em;font-size:.9em}span.offer-progress{font-size:12px;position:absolute;right:-15px;top:-8px;background-color:#A4C554;color:#40561F;padding:3px 5px;font-weight:700;-webkit-border-radius:10px;-moz-border-radius:10px;border-radius:10px}.app-progressbar{position:relative}span.app-name{z-index:5;position:relative;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.app-progressbar .ui-progress-bar{position:absolute;width:100%;top:0;z-index:0}span.offer-progress.maxed-out{background-color:#b31217;border-radius:10px;padding:3px 8px;font-weight:700;font-size:11px;color:#FFF}',
        onBuildOffer: function(section, data, idx) {
            
            var element = $('<div class="offer-reward" ><span class="offer-points">' + fn_format_score(data.points) +
                            '</span><span class="app-name" title="' + data.app +'">' + data.app + '</span> </div>');
            
            var end = $('#dateRangeInput1').val();
            var start = $('#dateRangeInput2').val();
            if (MOBILE_APP_IDS.indexOf(data.category) != -1) {
                if (start == end && sb_settings.show_progress) {
                    var max = APP_MAXES[data.app];
                    var percent =  Math.floor((data.points / max) * 1e2);
                    var progress = data.points + " / " + max;
                    
                    var $span = $('<span class="offer-progress"></span>');
                    
                    
                    if (data.points == max) {
                        $span.addClass('maxed-out');
                        $span.text('MAX');
                    } else {
                        $span.text(progress);
                    }
                    element.prepend($span);
                }
            }
            return element;
        }
    });
    
    this.themes.push({
        name: 'Minimal',
        css: '#dashboard{display:none}#dashboard.active{display:block}#pageHeaderButtonCollectorBill{border-radius:0 0 0 0;}#dashboardTab{border-radius:0 .4rem .4rem 0;}div#dashboard{border:0 solid #ddd;clear:both;overflow:hidden}div#dashboard h3{padding:1em 0 .7em 1em}div.app-sections{border:1px solid #ddd;border-top:0}div.app-section{overflow:auto}div.app-section h4{margin:0;cursor:pointer;padding:0 0 0 8px;font-weight:700;font-size:12px;line-height:28px;text-align:left;color:#353535;border:1px solid #CBCBCB;border-left:0;border-right:0}div.app-section h4:hover{color:#316CB1}div.app-section.empty h4{color:#aaa;cursor:default}span.section-name{padding-left:1em}span.section-visual-state{padding-left:.5em}div.app-section.minimized div.scores-container{display:none}div.scores-container{overflow:hidden;cursor:default!important}div.offer-reward{width:110px;float:left;margin:1em .5em;padding:0;position:relative}div.offer-reward span.app-name{color:#777;display:block;font-size:.8em;line-height:.8em;text-align:left;text-transform:uppercase;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}span.section-rewards{float:right;width:5em;background-color:#303030;color:#A4C554;text-align:center;font-size:1.25em}span.app-name.single-line{line-height:2.5em;padding-top:.2em}span.offer-points{font-size:1.4em;display:block;overflow:hidden;text-align:left;color:#333}div#dashboard-overlay{position:absolute;margin-top:-60px}div#dashboard-overlay-bg{background-color:#FFF;opacity:.7;z-index:200;position:absolute}div.sbes-options{padding:0 2em 2em}.sbes-options-container{position:relative;background-color:#FFF;float:right;z-index:205;margin-top:60px}div.sbes-dashboard-header{overflow:hidden}div.sbes-options-header{overflow:hidden;border-bottom:1px solid #DDD}div.sbes-options-header h3{float:left}div.sbes-toolbar{padding:1em;float:right}div.sbes-toolbar a{background-color:#fff;color:#275DA3;border-bottom:0 none;cursor:pointer;height:26px}span.setting{width:10em;display:inline-block;font-weight:700;padding-right:1em;text-align:right}.sbes-options-input{margin:0;padding:0}input#option-hide-empty{margin-left:2px}.checkbox,.radio{position:relative;display:block;min-height:20px;margin-top:10px;margin-bottom:10px}.btn{display:inline-block;padding:6px 12px;margin-bottom:0;font-size:14px;font-weight:400;line-height:1.42857143;text-align:center;white-space:nowrap;vertical-align:middle;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-image:none;border:1px solid transparent;border-radius:4px}.btn-default{color:#333;background-color:#fff;border-color:#ccc}.btn:focus,.btn:hover{color:#333;text-decoration:none}.btn-default.active,.btn-default:active,.btn-default:focus,.btn-default:hover,.open>.dropdown-toggle.btn-default{color:#333;background-color:#e6e6e6;border-color:#adadad}.sbes-options-container{-webkit-box-shadow:1px 1px 5px 0 rgba(50,50,50,.75);-moz-box-shadow:1px 1px 5px 0 rgba(50,50,50,.75);box-shadow:1px 1px 5px 0 rgba(50,50,50,.75);padding:.5em;font-size:.9em}span.offer-progress{font-size:12px;position:absolute;right:-15px;top:-8px;background-color:#A4C554;color:#40561F;padding:3px 5px;font-weight:700;-webkit-border-radius:10px;-moz-border-radius:10px;border-radius:10px}.app-progressbar{position:relative}span.app-name{z-index:5;position:relative}.app-progressbar .ui-progress-bar{position:absolute;width:100%;top:0;z-index:0}span.offer-progress.maxed-out{background-color:#b31217;border-radius:10px;padding:3px 8px;font-weight:700;font-size:11px;color:#FFF}#mobile-apps .offer-reward{display:none}.gauge{display:inline-block}',
        onRender: function() {
            var mobile_apps = this.pickSortedApps(MOBILE_APP_IDS);
            $.each(mobile_apps, function(id, app) {
                var g = new JustGage({
                    id: 'mobile-app-'+id,
                    value: app.points,
                    min: 0,
                    max: APP_MAXES[app.app],
                    title: app.app,
                    textRenderer: function(displayValue) {
                        return fn_format_score(displayValue);
                    },
                    humanFriendly: function( value, decimals) {
                        console.log(decimals);
                        return value;
                    },
                    levelColors: ['ff0000', 'ffa500', 'ffff00', '00ff00'],
                    levelColorsGradient: true
                });
            });
        },
        onBuildOffer: function(section, data, idx) {
            var element;
            if (section.id == 'mobile-apps') {
                element = $('<div class="gauge" id="mobile-app-" style="width:117px; height:120px;"></div>');
                element.attr('id', 'mobile-app-' + idx );
            } else {
                element = $('<div class="offer-reward"><span class="app-name" title="' + data.app + '">' + data.app +
                            '</span><span class="offer-points">' + fn_format_score(data.points) + '</span></div>');
            }
            return element;
        }
    });
    
    // define the theme getter
    Object.defineProperty(this, 'currentTheme', {
        get: function () {
            return _.findWhere(self.themes, {name: sb_settings.theme });
        }
    });
    
    
    // Append the no data banner
    var $nodata = $(".alertLedgerNoData").clone();
    this.$dashboard.append($nodata);
    
    // Finally, flag the dashboard as having been built
    this.flags.built = true;
};

SbxDashboard.prototype.render = function(newData, saveData) {
    // Flag as rendering
    this.flags.rendering = true;
    
    if (this.flags.render_count === undefined) {
        this.flags.render_count = 0;
    }
    
    if (newData) {
        
        if (saveData === false || saveData === undefined) {
            this.clear(true);
        }
        // Load the new data
        this.loadData(newData);
    } else {
        this.clear(false);
    }
    
    
    fn_apply_css(this.currentTheme.css, true);
    this.buildSection('Mobile Apps', MOBILE_APP_IDS);
    this.buildSection('Referrals', REFERRAL_IDS);
    this.buildSection('Daily Points', DAILY_IDS);
    this.buildSection('Encraves', ENCRAVE_IDS);
    this.buildSection('Swagbucks Watch', WATCHED_IDS, { minimized: "true" });
    this.buildSection('Surveys', SURVEY_IDS);
    this.buildSection('Reward Store Purchases', PURCHASES_IDS);
    this.buildSection('Other Offers', OTHER_IDS);
    this.renderSections();
    
    
    
    if ($.isFunction(this.currentTheme.onRender)) {
        this.currentTheme.onRender.call(this);
    }
    
    
    $(this).trigger('rendered');
    debug('render complete');
    this.flags.render_count++;
    this.flags.rendering = false;
    
    
};

SbxDashboard.prototype.getEmptyData = function() {
    var data = [];
    var intToday = parseInt(this.yyyymmdd());
    var strToday = this.yyyymmdd();
    
    for (var app in APP_MAXES) {
        data.push([18, intToday, strToday, 0, "0", app]);
    }
    return data;
};


SbxDashboard.prototype.yyyymmdd = function() {
    var d = new Date();
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = d.getDate().toString();
    return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // string
};

SbxDashboard.prototype.getSections = function() {
    var $sections = $('div.app-sections', this.$dashboard);
    if ($sections.length === 0) {
        $sections = $('<div class="app-sections"></div>');
    }
    return $sections;
};

SbxDashboard.prototype.buildSection = function(sectionHeader, section_category_ids, opts) {
    
    var self = this;
    var section = {};
    var sectionSortedApps = this.pickSortedApps(section_category_ids);
    
    if (sectionSortedApps.length === 0 && sb_settings.hide_empty) {
        return;
    }
    
    section.apps = sectionSortedApps;
    section.header = sectionHeader;
    section.categories = section_category_ids;
    section.offers = [];
    
    // First thing we need is the slug
    section.id = slugify(sectionHeader);
    var _MINIMIZED = '_minimized',    
        // options
        options = $.extend({}, {
            showTotals: true,
            weight: 0,
            minimized: "false"
        }, opts),
    
        // now we can check if this section has previous settings
        isMinimized = JSON.parse(localStorage.getItem(section.id + _MINIMIZED) || (options.minimized !== undefined ? options.minimized : "false")),
        current_state = (section.apps.length === 0 ? 'empty' : (isMinimized ? 'closed' : 'opened')),
        // Dom element's we'll be using
        offer, section_total;
    
    
    var section_html = '<div class="app-section"><h4 class="section-header bg-gradient"><span class="section-visual-state"></span> <span class="section-name"></span><span class="section-rewards"></span></h4><div class="scores-container"></div></div>',
        $section = $(section_html),
        $header = $('h4', $section),
        $icon_span = $('.section-visual-state', $header),
        $header_span = $('.section-name', $header),
        $reward_span = $('.section-rewards', $header),
        $scores = $('.scores-container', $section);
    
    
    $section.attr('id', section.id);
    
    // Add classes
    if (isMinimized) {
        $section.addClass('minimized');
    }
    
    $header_span.text(section.header);
    
    // Append the total points if desired
    if (options.showTotals) {
        section_total = section.apps.length=== 0 ? 0 : section.apps.map(function (data) {
            return data.points;
        }).reduce(function (total, i) {
            return total + i;
        });
        
        $reward_span.text(fn_format_score(section_total));
    }
    
    // Prefix header with the proper icon
    if (section.apps.length=== 0) {
        current_state = 'empty';
        $section.addClass('empty');
    }
    $icon_span.text(icons[current_state]);
    
    var elements = section.apps.map(function(data, idx) {
        return self.buildOffer(section, data, idx);
    }).reduce(function(prev, curr) {
        return prev.add(curr);
    }, $());
    
    elements.appendTo($scores);
    
    if (section.apps.length) {        
        // Bind some animation handlers to make things pretty
        if (section_category_ids.indexOf(18) == -1) {
            $header.click(function () {
                fn_header_click.call(this, icons);
            });
        }
    }
    this.sections.push({
        html: $section,
        weight: options.weight
    });
    return $section;
};

SbxDashboard.prototype.buildOffer = function(section, data, idx) {
    var single_line_limit = 15,
        max_length = 14,
        is_single_line = (data.app <= single_line_limit),
        element;
    
    if (is_single_line === false) {
        is_single_line = data.app.slice(0,-3).length <= max_length;
    }
    
    
    // This changes with the theme
    
    if ($.isFunction(this.currentTheme.onBuildOffer)) {
        element = this.currentTheme.onBuildOffer(section, data, idx);
    }
    
    
    //            if (is_single_line) {
    $('.app-name', element).addClass('single-line');
    //            }
    
    element.mouseenter(function() {
        $(this).addClass('hover');
    }).mouseleave(function() { $(this).removeClass('hover'); });
    
    return element;
}

SbxDashboard.prototype.renderSections = function() {
    // First, let's get get our container
    var $sections = this.getSections();
    
    // Render the sections by weight
    this.sections.sort(function(a,b) { return ( a.weight > b.weight ? 1 : (a.weight < b.weight ? -1 : 0)); });
    
    var n_sections = this.sections.length, section, i;
    for (i=0; i < n_sections; i++) {
        section = this.sections[i];
        $sections.append(section.html);
    }
    
    $sections.appendTo(this.$dashboard);
    
};

function fn_record_tab() {
    // try to echo the selected tab
    var selected_id = $('#pageHeaderButtons').find('.sbBgColor1').attr('id');
    localStorage.setItem(app_label+'_dashboard_selected_tab', selected_id);
}

// Setups up events and such which are necessary for the overlay
function SbxDashboardOverlay(sbxDashboard) {
    this.$overlay = $('#dashboard-overlay', sbxDashboard.$dashboard);
    this.sbxDashboard = sbxDashboard;
    this.bindHandlers();
    this.realizeSettings();
}

SbxDashboardOverlay.prototype.bindHandlers = function() {
    var self = this;
    
    // Tie the settings form to the storage
    $('input[name=sbes_score_units]', this.$overlay).change(function() {
        sb_settings.format = $('input[name=sbes_score_units]:checked').val();
    });
    $('input[name=sbes_sort]', this.$overlay).change(function() {
        sb_settings.sort = $('input[name=sbes_sort]:checked').val();
    });
    $('input[name=sbes_order]', this.$overlay).change(function() {
        sb_settings.order = $('input[name=sbes_order]:checked').val();
    });
    $('input[name=sbes_hide_empty]', this.$overlay).change(function() {
        sb_settings.hide_empty = $(this).prop('checked');
    });
    $('input[name=sbes_show_progress]', this.$overlay).change(function() {
        sb_settings.show_progress = $(this).prop('checked');
    });
    $('select[name=sbes_theme]', this.$overlay).change(function() {
        sb_settings.theme = $('option:selected', this).text();
    });
    
    $(this.sbxDashboard).bind('rendered', function() {
        if (self.active === true) {
            // re-render the overlay
            self.renderOverlay();
        }
    });
    
    
    // bind the overlay close button
    $('a#sbes-close-options', this.$overlay).click(function (event) {
        event.preventDefault();
        
        self.$overlay.hide();
        self.active = false;
        $(self).trigger('settingsChanged');
    });
    
    // Watch the options link
    $('a#sbes-options-link').click(function( event ) {
        event.preventDefault();
        self.active = true;
        
        self.renderOverlay();
    });
    
    // Watch the Expand all and Collapse all links
    $('#sbes-ui-collapse-all').click(function(e) {
        e.preventDefault();
        $('.scores-container').parents('.app-section').each(function() {
            var $header = $('h4', this);
            if (this.id == "mobile-apps") return;
            fn_header_click.call($header, icons, 'closed');
            
        });
    });
    
    $('#sbes-ui-expand-all').click(function(e) {
        e.preventDefault();
        $('.scores-container').parents('.app-section').each(function() {
            var $header = $('h4', this);
            fn_header_click.call($header, icons, 'opened');
        });
    });
};

// Does whatever is necessary to get the overlay ready to be displayed
SbxDashboardOverlay.prototype.renderOverlay = function() {
    
    // prep the overlay dimensions
    var overlay = $('#dashboard-overlay');
    var bg = $('#dashboard-overlay-bg');
    
    overlay.height(overlay.parent().height());
    overlay.width(overlay.parent().width());
    
    bg.height(overlay.height());
    bg.width(overlay.width());
    
    overlay.show();
};

// Apply sb_settings to the overlay form
SbxDashboardOverlay.prototype.realizeSettings = function(settings) {
    settings = settings || sb_settings;
    $("#option-format-" + settings.format).prop('checked', true);
    $("#option-sort-" + settings.sort).prop('checked', true);
    $("#option-order-" + settings.order).prop('checked', true);
    $("#option-hide-empty").prop('checked', settings.hide_empty);
    $("#option-show-progress").prop('checked', settings.show_progress);
};

// Function to apply custom CSS
var myStyle;
function fn_apply_css(css, replace) {
    var head, style, newStyle = true;
    
    head = document.getElementsByTagName('head')[0];
    if (!head) {
        return;
    }
    
    if (replace === true) {
        // do we have a style to replace?
        if (myStyle !== undefined) {
            newStyle = false;
            style = myStyle;
        } else {
            newStyle = true;
        }
    }
    
    if (newStyle) {
        style = document.createElement('style');
    }
    style.type = 'text/css';
    style.innerHTML = css;
    
    // These are taken dynamically from swagbucks' CDN
    var images = {
        gradient: (function () { var c, t = $('<th class="table-sortable"></th>'); t.appendTo($('body')); c=t.css('background-image'); t.remove();return c;})()
    };
    
    style.innerHTML += 'div.app-section h4 { background-image: '+ images.gradient +'}';
    
    if (newStyle) {
        head.appendChild(style);
        
        // store it as myStyle
        myStyle = style;
    }
    
    // Adjust Collector Bill button border style
    document.getElementById('pageHeaderButtonCollectorBill').style.borderRadius = "0";
    
    
}

SbxDashboard.prototype.pickSortedApps = function(arrayOfCategories) {
    return this.getSortedApps(this.pickApps(arrayOfCategories));
};

/**
* Picks the records belonging to categories defined in arrayOfCategoryIds
* @param arrayOfCategories
* @returns {*}
*/
SbxDashboard.prototype.pickApps = function(categoryIds) {
    var a = _.pick(this.data.ALL_RECORDS, function(record, key) {
        return categoryIds.indexOf(record.category) != -1;
    });
    return a;
};

/**
* Sorts the given plucked app data
*
* @param somePickedApps
* @returns {Array}
*/
SbxDashboard.prototype.getSortedApps = function(somePickedApps) {
    var sortable = [];
    for (var someApp in somePickedApps) {
        // somePickedApps[someApp] already has "app", its just called "note"
        sortable.push($.extend({}, somePickedApps[someApp], { category_label: someApp, app: someApp }));
    }
    
    if (sortable.length === 0) {
        return [];
    }
    
    // Sort the apps
    var sorted = _.sortBy(sortable, function (obj) {
        var sortVal;
        switch (sb_settings.sort) {
            default:
            case "alpha":
                sortVal = obj.app.toLowerCase();
                break;
            case "num":
                sortVal = Math.abs(obj.points);
                break;
        }
        return sortVal;
    });
    
    if (sb_settings.order == "desc") {
        sorted.reverse();
    }
    
    return sorted;
};


/**
* Cleans up app labels a bit
*
* If it finds the needle (key) in the app label, it replaces it (w/ the value).
*
* This needs to get fixed so that it works on more apps. It doesn't make sense
* to have some of the logic here and some of it in loadData().
*
* @param someApp
* @returns
*/
function fn_format_label(label, category) {
    'use strict';
    var aliases = {
        "Fail/Over": "Fail/Over Quota",
        "Jun Group": "Jun Group",
        "Daily Finance": "Encrave",
        "SurveySpecial": "Survey Sp. Offers",
        "Email": "Email Offers",
        "SB Offers": "",
        "SVN: ": ""
    };

    $.each(aliases, function replaceAliases(needle, replacement) {
        if (label.indexOf(needle) !== -1) {
            label = replacement;
            return false;
        }
    });

    if (category === 16) {
        label = "Online Videos";
    }

    // Clean labels for surveys
    if (category === 12) {
        if (label.indexOf('Disqualification') >= 0) {
            label = 'Disqualified';
        }
        if (label.indexOf('Over Quota') >= 0) {
            label = 'Over Quota';
        }
        label = label.replace('Dashboard - ', '');
        label = label.replace('Dashboard -', '');
        label = label.replace('- Disqualification', '');
        label = label.replace('- Complete', '');
    }
    return label;
}

function fn_header_click(icons, forced) {
    var self = this,
        curr_icon = $(this).text()[0],
        $scores = $(self).parent().find('.scores-container'),
        section_id = $(this).parents('.app-section').attr('id'),
        MINIMIZED = section_id + '_minimized',
        ico = (curr_icon == icons.opened ? icons.closed : icons.opened);
    
    if (forced && icons.hasOwnProperty(forced)) {
        ico = icons[forced];
        
        if (curr_icon == ico || curr_icon == icons.empty) {
            return;
        }
    }
    
    if (ico != icons.empty) {
        // we are minimizing
        localStorage.setItem(MINIMIZED, ( ico == icons.closed ));
    }
    
    // change the icon
    var changeIcon = function () {
        $('.section-visual-state', self).text(ico);
    };
    
    if (ico == icons.closed) {
        // needs to be closed
        $scores.slideUp(changeIcon);
    } else {
        $scores.slideDown(changeIcon);
    }
}

function fn_format_score(value) {
    var format = sb_settings.format;
    if (valid_options.format.indexOf(format) == -1) {
        format = defaults.format;
    }
    
    if (format == "money") {
        return fn_format_money(value, 1/100, true);
    }
    
    return value;
}
function fn_format_money(value, units, withSign) {
    withSign = Boolean(withSign) || false;
    var ret = (value * units).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return withSign ? "$" + ret : ret;
}

function debug() {
    var timestamp = new Date().toJSON();
    console.log.apply(console, ['[ ' + timestamp + ' ] Sbx Dashboard :: '].concat($.makeArray(arguments)));
}

function error() {
    var timestamp = new Date().toJSON();
    console.error.apply(console, ['[ ' + timestamp + ' ] Sbx Dashboard :: '].concat($.makeArray(arguments)));
}

function slugify(Text) {
    return Text
    .toLowerCase()
    .replace(/ /g,'-')
    .replace(/[^\w-]+/g,'');
}

function SBESStoredOptions(prefix, defaults) {
    this.options = [];
    this.prefix = prefix.slice(-1) == '_' ? prefix : prefix + '_';
    
    var self = this;
    for (var property in defaults) {
        if (!defaults.hasOwnProperty(property)) {
            continue;
        }
        
        this.options.push(property);
        
        (function(key) {
            Object.defineProperty(self, key, {
                get: function() {
                    return onPropertyGet(key);
                },
                set: function(value) {
                    return onPropertySet(key, value, this[key]);
                }
            });
            
        })(property);
    }
    
    function onPropertyGet(key) {
        // last place to look is the defaults array
        var value = defaults[key];
        var item = self.prefix + key;
        
        // we'd prefer it to be something the user has locally
        if (localStorage.getItem(item)) {
            value = JSON.parse(localStorage.getItem(item));
        }
        
        return value;
    }
    
    function onPropertySet(key, value, old_value) {
        localStorage.setItem(self.prefix + key, JSON.stringify(value));
        return value;
    }
    
    this.clear = function() {
        var n_options = this.options.length,
            option;
        
        for (var i=0; i < n_options; i++) {
            option = this.options[i];
            localStorage.removeItem(this.prefix+option);
        }
    };
}



// Once the data is loaded, the fun can begin
require(function(){
    // we don't really need the dash to have been loaded but it gives for a nice UX
    var condition = window.myData !== undefined && document.getElementById('dashboard') !== null;
    return condition;
}, function() {
    // Apply the custom CSS rules
    
    
});

            
            
            
            
            
/**
 * JustGage - this is work-in-progress, unreleased, unofficial code, so it might not work top-notch :)
 * Check http://www.justgage.com for official releases
 * Licensed under MIT.
 * @author Bojan Djuricic (@Toorshia)
 *
 * LATEST UPDATES
 *
 * -----------------------------
 * March 16, 2014.
 * -----------------------------
     * fix - https://github.com/toorshia/justgage/issues/112
 * 
 * -----------------------------
 * February 16, 2014.
 * -----------------------------
     * fix - https://github.com/toorshia/justgage/issues/102

 * -----------------------------
 * April 25, 2013.
 * -----------------------------
     * use HTML5 data-* attributes of the DOM Element to render the gauge (which overrides the constructor options).

 * -----------------------------
 * April 18, 2013.
 * -----------------------------
     * parentNode - use this instead of id, to attach gauge to node which is outside of DOM tree - https://github.com/toorshia/justgage/issues/48
     * width - force gauge width
     * height - force gauge height

 * -----------------------------
 * April 17, 2013.
 * -----------------------------
     * fix - https://github.com/toorshia/justgage/issues/49

 * -----------------------------
 * April 01, 2013.
 * -----------------------------
     * fix - https://github.com/toorshia/justgage/issues/46

 * -----------------------------
 * March 26, 2013.
 * -----------------------------
     * customSectors - define specific color for value range (0-10 : red, 10-30 : blue etc.)

 * -----------------------------
 * March 23, 2013.
 * -----------------------------
     * counter - option to animate value  in counting fashion
     * fix - https://github.com/toorshia/justgage/issues/45

 * -----------------------------
 * March 13, 2013.
 * -----------------------------
     * refresh method - added optional 'max' parameter to use when you need to update max value

 * -----------------------------
 * February 26, 2013.
 * -----------------------------
     * decimals - option to define/limit number of decimals when not using humanFriendly or customRenderer to display value
     * fixed a missing parameters bug when calling generateShadow()  for IE < 9

 * -----------------------------
 * December 31, 2012.
 * -----------------------------
     * fixed text y-position for hidden divs - workaround for Raphael <tspan> 'dy' bug - https://github.com/DmitryBaranovskiy/raphael/issues/491
     * 'show' parameters, like showMinMax are now 'hide' because I am lame developer - please update these in your setups
     * Min and Max labels are now auto-off when in donut mode
     * Start angle in donut mode is now 90
     * donutStartAngle - option to define start angle for donut

 * -----------------------------
 * November 25, 2012.
 * -----------------------------
     * Option to define custom rendering function for displayed value

 * -----------------------------
 * November 19, 2012.
 * -----------------------------
     * Config.value is now updated after gauge refresh

 * -----------------------------
 * November 13, 2012.
 * -----------------------------
     * Donut display mode added
     * Option to hide value label
     * Option to enable responsive gauge size
     * Removed default title attribute
     * Option to accept min and max defined as string values
     * Option to configure value symbol
     * Fixed bad aspect ratio calculations
     * Option to configure minimum font size for all texts
     * Option to show shorthand big numbers (human friendly)
     */

 JustGage = function(config) {

  var obj = this;

  // Helps in case developer wants to debug it. unobtrusive
  if (config === null || config ===  undefined) {
      console.log('* justgage: Make sure to pass options to the constructor!');
      return false;
  }

  var node;

  if (config.id !== null && config.id !== undefined) {
    node= document.getElementById(config.id);
      if (!node) {
        console.log('* justgage: No element with id : %s found', config.id);
        return false;
    }
  } else if (config.parentNode !== null && config.parentNode !== undefined) {
    node = config.parentNode;
  } else {
      console.log('* justgage: Make sure to pass the existing element id or parentNode to the constructor.');
      return false;
  }

  var dataset = node.dataset ? node.dataset : {};

  // configurable parameters
  obj.config =
  {
    // id : string
    // this is container element id
    id : config.id,

    // parentNode : node object
    // this is container element
    parentNode : obj.kvLookup('parentNode', config, dataset, null),

    // width : int
    // gauge width
    width : obj.kvLookup('width', config, dataset, null),

    // height : int
    // gauge height
    height : obj.kvLookup('height', config, dataset, null),

    // title : string
    // gauge title
    title : obj.kvLookup('title', config, dataset, ""),

    // titleFontColor : string
    // color of gauge title
    titleFontColor : obj.kvLookup('titleFontColor', config, dataset,  "#999999"),

    // value : float
    // value gauge is showing
    value : obj.kvLookup('value', config, dataset, 0, 'float'),

    // valueFontColor : string
    // color of label showing current value
    valueFontColor : obj.kvLookup('valueFontColor', config, dataset, "#010101"),

    // symbol : string
    // special symbol to show next to value
    symbol : obj.kvLookup('symbol', config, dataset, ''),

    // min : float
    // min value
    min : obj.kvLookup('min', config, dataset, 0, 'float'),

    // max : float
    // max value
    max : obj.kvLookup('max', config, dataset, 100, 'float'),

    // humanFriendlyDecimal : int
    // number of decimal places for our human friendly number to contain
    humanFriendlyDecimal : obj.kvLookup('humanFriendlyDecimal', config, dataset, 0),

    // textRenderer: func
    // function applied before rendering text
    textRenderer  : obj.kvLookup('textRenderer', config, dataset, null),

    // gaugeWidthScale : float
    // width of the gauge element
    gaugeWidthScale : obj.kvLookup('gaugeWidthScale', config, dataset, 1.0),

    // gaugeColor : string
    // background color of gauge element
    gaugeColor : obj.kvLookup('gaugeColor', config, dataset, "#edebeb"),

    // label : string
    // text to show below value
    label : obj.kvLookup('label', config, dataset, ''),

    // labelFontColor : string
    // color of label showing label under value
    labelFontColor : obj.kvLookup('labelFontColor', config, dataset, "#b3b3b3"),

    // shadowOpacity : int
    // 0 ~ 1
    shadowOpacity : obj.kvLookup('shadowOpacity', config, dataset, 0.2),

    // shadowSize: int
    // inner shadow size
    shadowSize : obj.kvLookup('shadowSize', config, dataset, 5),

    // shadowVerticalOffset : int
    // how much shadow is offset from top
    shadowVerticalOffset : obj.kvLookup('shadowVerticalOffset', config, dataset, 3),

    // levelColors : string[]
    // colors of indicator, from lower to upper, in RGB format
    levelColors : obj.kvLookup('levelColors', config, dataset, [ "#a9d70b", "#f9c802", "#ff0000" ], 'array', ','),

    // startAnimationTime : int
    // length of initial animation
    startAnimationTime : obj.kvLookup('startAnimationTime', config, dataset, 700),

    // startAnimationType : string
    // type of initial animation (linear, >, <,  <>, bounce)
    startAnimationType : obj.kvLookup('startAnimationType', config, dataset, '>'),

    // refreshAnimationTime : int
    // length of refresh animation
    refreshAnimationTime : obj.kvLookup('refreshAnimationTime', config, dataset, 700),

    // refreshAnimationType : string
    // type of refresh animation (linear, >, <,  <>, bounce)
    refreshAnimationType : obj.kvLookup('refreshAnimationType', config, dataset, '>'),

    // donutStartAngle : int
    // angle to start from when in donut mode
    donutStartAngle : obj.kvLookup('donutStartAngle', config, dataset, 90),

    // valueMinFontSize : int
    // absolute minimum font size for the value
    valueMinFontSize : obj.kvLookup('valueMinFontSize', config, dataset, 16),

    // titleMinFontSize
    // absolute minimum font size for the title
    titleMinFontSize : obj.kvLookup('titleMinFontSize', config, dataset, 10),

    // labelMinFontSize
    // absolute minimum font size for the label
    labelMinFontSize : obj.kvLookup('labelMinFontSize', config, dataset, 10),

    // minLabelMinFontSize
    // absolute minimum font size for the minimum label
    minLabelMinFontSize : obj.kvLookup('minLabelMinFontSize', config, dataset, 10),

    // maxLabelMinFontSize
    // absolute minimum font size for the maximum label
    maxLabelMinFontSize : obj.kvLookup('maxLabelMinFontSize', config, dataset, 10),

    // hideValue : bool
    // hide value text
    hideValue : obj.kvLookup('hideValue', config, dataset, false),

    // hideMinMax : bool
    // hide min and max values
    hideMinMax : obj.kvLookup('hideMinMax', config, dataset, false),

    // hideInnerShadow : bool
    // hide inner shadow
    hideInnerShadow : obj.kvLookup('hideInnerShadow', config, dataset, false),

    // humanFriendly : bool
    // convert large numbers for min, max, value to human friendly (e.g. 1234567 -> 1.23M)
    humanFriendly : obj.kvLookup('humanFriendly', config, dataset, false),

    // noGradient : bool
    // whether to use gradual color change for value, or sector-based
    noGradient : obj.kvLookup('noGradient', config, dataset, false),

    // donut : bool
    // show full donut gauge
    donut : obj.kvLookup('donut', config, dataset, false),

    // relativeGaugeSize : bool
    // whether gauge size should follow changes in container element size
    relativeGaugeSize : obj.kvLookup('relativeGaugeSize', config, dataset, false),

    // counter : bool
    // animate level number change
    counter : obj.kvLookup('counter', config, dataset, false),

    // decimals : int
    // number of digits after floating point
    decimals : obj.kvLookup('decimals', config, dataset, 0),

    // customSectors : [] of objects
    // number of digits after floating point
    customSectors : obj.kvLookup('customSectors', config, dataset, []),

    // formatNumber: boolean
    // formats numbers with commas where appropriate
    formatNumber : obj.kvLookup('formatNumber', config, dataset, false)
  };

  // variables
  var
  canvasW,
  canvasH,
  widgetW,
  widgetH,
  aspect,
  dx,
  dy,
  titleFontSize,
  titleX,
  titleY,
  valueFontSize,
  valueX,
  valueY,
  labelFontSize,
  labelX,
  labelY,
  minFontSize,
  minX,
  minY,
  maxFontSize,
  maxX,
  maxY;

  // overflow values
  if (obj.config.value > obj.config.max) obj.config.value = obj.config.max;
  if (obj.config.value < obj.config.min) obj.config.value = obj.config.min;
  obj.originalValue = obj.kvLookup('value', config, dataset, -1, 'float');

  // create canvas
  if (obj.config.id !== null && (document.getElementById(obj.config.id)) !== null) {
    obj.canvas = Raphael(obj.config.id, "100%", "100%");
  } else if (obj.config.parentNode !== null) {
    obj.canvas = Raphael(obj.config.parentNode, "100%", "100%");
  }

  if (obj.config.relativeGaugeSize === true) {
    obj.canvas.setViewBox(0, 0, 200, 150, true);
  }

  // canvas dimensions
  if (obj.config.relativeGaugeSize === true) {
    canvasW = 200;
    canvasH = 150;
  } else if (obj.config.width !== null && obj.config.height !== null) {
    canvasW = obj.config.width;
    canvasH = obj.config.height;
  } else if (obj.config.parentNode !== null) {
    obj.canvas.setViewBox(0, 0, 200, 150, true);
    canvasW = 200;
    canvasH = 150;
  } else {
    canvasW = getStyle(document.getElementById(obj.config.id), "width").slice(0, -2) * 1;
    canvasH = getStyle(document.getElementById(obj.config.id), "height").slice(0, -2) * 1;
  }

  // widget dimensions
  if (obj.config.donut === true) {

    // DONUT *******************************

    // width more than height
    if(canvasW > canvasH) {
      widgetH = canvasH;
      widgetW = widgetH;
    // width less than height
  } else if (canvasW < canvasH) {
    widgetW = canvasW;
    widgetH = widgetW;
      // if height don't fit, rescale both
      if(widgetH > canvasH) {
        aspect = widgetH / canvasH;
        widgetH = widgetH / aspect;
        widgetW = widgetH / aspect;
      }
    // equal
  } else {
    widgetW = canvasW;
    widgetH = widgetW;
  }

    // delta
    dx = (canvasW - widgetW)/2;
    dy = (canvasH - widgetH)/2;

    // title
    titleFontSize = ((widgetH / 8) > 10) ? (widgetH / 10) : 10;
    titleX = dx + widgetW / 2;
    titleY = dy + widgetH / 11;

    // value
    valueFontSize = ((widgetH / 6.4) > 16) ? (widgetH / 5.4) : 18;
    valueX = dx + widgetW / 2;
    if(obj.config.label !== '') {
      valueY = dy + widgetH / 1.85;
    } else {
      valueY = dy + widgetH / 1.7;
    }

    // label
    labelFontSize = ((widgetH / 16) > 10) ? (widgetH / 16) : 10;
    labelX = dx + widgetW / 2;
    labelY = valueY + labelFontSize;

    // min
    minFontSize = ((widgetH / 16) > 10) ? (widgetH / 16) : 10;
    minX = dx + (widgetW / 10) + (widgetW / 6.666666666666667 * obj.config.gaugeWidthScale) / 2 ;
    minY = labelY;

    // max
    maxFontSize = ((widgetH / 16) > 10) ? (widgetH / 16) : 10;
    maxX = dx + widgetW - (widgetW / 10) - (widgetW / 6.666666666666667 * obj.config.gaugeWidthScale) / 2 ;
    maxY = labelY;

  } else {
    // HALF *******************************

    // width more than height
    if(canvasW > canvasH) {
      widgetH = canvasH;
      widgetW = widgetH * 1.25;
      //if width doesn't fit, rescale both
      if(widgetW > canvasW) {
        aspect = widgetW / canvasW;
        widgetW = widgetW / aspect;
        widgetH = widgetH / aspect;
      }
    // width less than height
  } else if (canvasW < canvasH) {
    widgetW = canvasW;
    widgetH = widgetW / 1.25;
      // if height don't fit, rescale both
      if(widgetH > canvasH) {
        aspect = widgetH / canvasH;
        widgetH = widgetH / aspect;
        widgetW = widgetH / aspect;
      }
    // equal
  } else {
    widgetW = canvasW;
    widgetH = widgetW * 0.75;
  }

    // delta
    dx = (canvasW - widgetW)/2;
    dy = (canvasH - widgetH)/2;

    // title
    titleFontSize = ((widgetH / 8) > obj.config.titleMinFontSize) ? (widgetH / 10) : obj.config.titleMinFontSize;
    titleX = dx + widgetW / 2;
    titleY = dy + widgetH / 6.4;

    // value
    valueFontSize = ((widgetH / 6.5) > obj.config.valueMinFontSize) ? (widgetH / 6.5) : obj.config.valueMinFontSize;
    valueX = dx + widgetW / 2;
    valueY = dy + widgetH / 1.275;

    // label
    labelFontSize = ((widgetH / 16) > obj.config.labelMinFontSize) ? (widgetH / 16) : obj.config.labelMinFontSize;
    labelX = dx + widgetW / 2;
    labelY = valueY + valueFontSize / 2 + 5;

    // min
    minFontSize = ((widgetH / 16) > obj.config.minLabelMinFontSize) ? (widgetH / 16) : obj.config.minLabelMinFontSize;
    minX = dx + (widgetW / 10) + (widgetW / 6.666666666666667 * obj.config.gaugeWidthScale) / 2 ;
    minY = labelY;

    // max
    maxFontSize = ((widgetH / 16) > obj.config.maxLabelMinFontSize) ? (widgetH / 16) : obj.config.maxLabelMinFontSize;
    maxX = dx + widgetW - (widgetW / 10) - (widgetW / 6.666666666666667 * obj.config.gaugeWidthScale) / 2 ;
    maxY = labelY;
  }

  // parameters
  obj.params  = {
    canvasW : canvasW,
    canvasH : canvasH,
    widgetW : widgetW,
    widgetH : widgetH,
    dx : dx,
    dy : dy,
    titleFontSize : titleFontSize,
    titleX : titleX,
    titleY : titleY,
    valueFontSize : valueFontSize,
    valueX : valueX,
    valueY : valueY,
    labelFontSize : labelFontSize,
    labelX : labelX,
    labelY : labelY,
    minFontSize : minFontSize,
    minX : minX,
    minY : minY,
    maxFontSize : maxFontSize,
    maxX : maxX,
    maxY : maxY
  };

  // var clear
  canvasW, canvasH, widgetW, widgetH, aspect, dx, dy, titleFontSize, titleX, titleY, valueFontSize, valueX, valueY, labelFontSize, labelX, labelY, minFontSize, minX, minY, maxFontSize, maxX, maxY = null;

  // pki - custom attribute for generating gauge paths
  obj.canvas.customAttributes.pki = function (value, min, max, w, h, dx, dy, gws, donut) {

    var alpha, Ro, Ri, Cx, Cy, Xo, Yo, Xi, Yi, path;

    if (donut) {
      alpha = (1 - 2 * (value - min) / (max - min)) * Math.PI;
      Ro = w / 2 - w / 7;
      Ri = Ro - w / 6.666666666666667 * gws;

      Cx = w / 2 + dx;
      Cy = h / 1.95 + dy;

      Xo = w / 2 + dx + Ro * Math.cos(alpha);
      Yo = h - (h - Cy) - Ro * Math.sin(alpha);
      Xi = w / 2 + dx + Ri * Math.cos(alpha);
      Yi = h - (h - Cy) - Ri * Math.sin(alpha);

      path = "M" + (Cx - Ri) + "," + Cy + " ";
      path += "L" + (Cx - Ro) + "," + Cy + " ";
      if (value > ((max - min) / 2)) {
        path += "A" + Ro + "," + Ro + " 0 0 1 " + (Cx + Ro) + "," + Cy + " ";
      }
      path += "A" + Ro + "," + Ro + " 0 0 1 " + Xo + "," + Yo + " ";
      path += "L" + Xi + "," + Yi + " ";
      if (value > ((max - min) / 2)) {
        path += "A" + Ri + "," + Ri + " 0 0 0 " + (Cx + Ri) + "," + Cy + " ";
      }
      path += "A" + Ri + "," + Ri + " 0 0 0 " + (Cx - Ri) + "," + Cy + " ";
      path += "Z ";

      return { path: path };

    } else {
      alpha = (1 - (value - min) / (max - min)) * Math.PI;
      Ro = w / 2 - w / 10;
      Ri = Ro - w / 6.666666666666667 * gws;

      Cx = w / 2 + dx;
      Cy = h / 1.25 + dy;

      Xo = w / 2 + dx + Ro * Math.cos(alpha);
      Yo = h - (h - Cy) - Ro * Math.sin(alpha);
      Xi = w / 2 + dx + Ri * Math.cos(alpha);
      Yi = h - (h - Cy) - Ri * Math.sin(alpha);

      path = "M" + (Cx - Ri) + "," + Cy + " ";
      path += "L" + (Cx - Ro) + "," + Cy + " ";
      path += "A" + Ro + "," + Ro + " 0 0 1 " + Xo + "," + Yo + " ";
      path += "L" + Xi + "," + Yi + " ";
      path += "A" + Ri + "," + Ri + " 0 0 0 " + (Cx - Ri) + "," + Cy + " ";
      path += "Z ";

      return { path: path };
    }

    // var clear
    alpha, Ro, Ri, Cx, Cy, Xo, Yo, Xi, Yi, path = null;
  };

  // gauge
  obj.gauge = obj.canvas.path().attr({
      "stroke": "none",
      "fill": obj.config.gaugeColor,
      pki: [
        obj.config.max,
        obj.config.min,
        obj.config.max,
        obj.params.widgetW,
        obj.params.widgetH,
        obj.params.dx,
        obj.params.dy,
        obj.config.gaugeWidthScale,
        obj.config.donut
      ]
  });

  // level
  obj.level = obj.canvas.path().attr({
    "stroke": "none",
    "fill": getColor(obj.config.value, (obj.config.value - obj.config.min) / (obj.config.max - obj.config.min), obj.config.levelColors, obj.config.noGradient, obj.config.customSectors),
    pki: [
      obj.config.min,
      obj.config.min,
      obj.config.max,
      obj.params.widgetW,
      obj.params.widgetH,
      obj.params.dx,
      obj.params.dy,
      obj.config.gaugeWidthScale,
      obj.config.donut
    ]
  });
  if(obj.config.donut) {
    obj.level.transform("r" + obj.config.donutStartAngle + ", " + (obj.params.widgetW/2 + obj.params.dx) + ", " + (obj.params.widgetH/1.95 + obj.params.dy));
  }

  // title
  obj.txtTitle = obj.canvas.text(obj.params.titleX, obj.params.titleY, obj.config.title);
  obj.txtTitle.attr({
    "font-size":obj.params.titleFontSize,
    "font-weight":"bold",
    "font-family":"Arial",
    "fill":obj.config.titleFontColor,
    "fill-opacity":"1"
  });
  setDy(obj.txtTitle, obj.params.titleFontSize, obj.params.titleY);

  // value
  obj.txtValue = obj.canvas.text(obj.params.valueX, obj.params.valueY, 0);
  obj.txtValue.attr({
    "font-size":obj.params.valueFontSize,
    "font-weight":"bold",
    "font-family":"Arial",
    "fill":obj.config.valueFontColor,
    "fill-opacity":"0"
  });
  setDy(obj.txtValue, obj.params.valueFontSize, obj.params.valueY);

  // label
  obj.txtLabel = obj.canvas.text(obj.params.labelX, obj.params.labelY, obj.config.label);
  obj.txtLabel.attr({
    "font-size":obj.params.labelFontSize,
    "font-weight":"normal",
    "font-family":"Arial",
    "fill":obj.config.labelFontColor,
    "fill-opacity":"0"
  });
  setDy(obj.txtLabel, obj.params.labelFontSize, obj.params.labelY);

  // min
  obj.txtMinimum = obj.config.min;
  if ( obj.config.textRenderer ) {
      obj.txtMinimum = obj.config.textRenderer( obj.config.min );
  } else if ( obj.config.humanFriendly ) {
    obj.txtMinimum = humanFriendlyNumber( obj.config.min, obj.config.humanFriendlyDecimal );
  } else if ( obj.config.formatNumber ) {
    obj.txtMinimum = formatNumber( obj.config.min );
  }
  obj.txtMin = obj.canvas.text(obj.params.minX, obj.params.minY, obj.txtMinimum);
  obj.txtMin.attr({
    "font-size":obj.params.minFontSize,
    "font-weight":"normal",
    "font-family":"Arial",
    "fill":obj.config.labelFontColor,
    "fill-opacity": (obj.config.hideMinMax || obj.config.donut)? "0" : "1"
  });
  setDy(obj.txtMin, obj.params.minFontSize, obj.params.minY);

  // max
  obj.txtMaximum = obj.config.max;
  if ( obj.config.textRenderer ) {
    obj.txtMaximum = obj.config.textRenderer( obj.config.max );
  } else if( obj.config.formatNumber ) {
    obj.txtMaximum = formatNumber( obj.txtMaximum );
  } else if( obj.config.humanFriendly ) {
    obj.txtMaximum = humanFriendlyNumber( obj.config.max, obj.config.humanFriendlyDecimal );
  }
  obj.txtMax = obj.canvas.text(obj.params.maxX, obj.params.maxY, obj.txtMaximum);
  obj.txtMax.attr({
    "font-size":obj.params.maxFontSize,
    "font-weight":"normal",
    "font-family":"Arial",
    "fill":obj.config.labelFontColor,
    "fill-opacity": (obj.config.hideMinMax || obj.config.donut)? "0" : "1"
  });
  setDy(obj.txtMax, obj.params.maxFontSize, obj.params.maxY);

  var defs = obj.canvas.canvas.childNodes[1];
  var svg = "http://www.w3.org/2000/svg";

  if (ie !== 'undefined' && ie < 9 ) {
    // VML mode - no SVG & SVG filter support
  }
  else if (ie !== 'undefined') {
    onCreateElementNsReady(function() {
      obj.generateShadow(svg, defs);
    });
  } else {
    obj.generateShadow(svg, defs);
  }

  // var clear
  defs, svg = null;

  // set value to display
  if(obj.config.textRenderer) {
    obj.originalValue = obj.config.textRenderer(obj.originalValue);
  } else if(obj.config.humanFriendly) {
    obj.originalValue = humanFriendlyNumber( obj.originalValue, obj.config.humanFriendlyDecimal ) + obj.config.symbol;
  } else if(obj.config.formatNumber) {
    obj.originalValue = formatNumber(obj.originalValue) + obj.config.symbol;
  } else {
    obj.originalValue = (obj.originalValue * 1).toFixed(obj.config.decimals) + obj.config.symbol;
  }

  if(obj.config.counter === true) {
    //on each animation frame
    eve.on("raphael.anim.frame." + (obj.level.id), function() {
      var currentValue = obj.level.attr("pki");
      if(obj.config.textRenderer) {
        obj.txtValue.attr("text", obj.config.textRenderer(Math.floor(currentValue[0])));
      } else if(obj.config.humanFriendly) {
        obj.txtValue.attr("text", humanFriendlyNumber( Math.floor(currentValue[0]), obj.config.humanFriendlyDecimal ) + obj.config.symbol);
      } else if(obj.config.formatNumber) {
        obj.txtValue.attr("text", formatNumber(Math.floor(currentValue[0])) + obj.config.symbol);
      } else {
        obj.txtValue.attr("text", (currentValue[0] * 1).toFixed(obj.config.decimals) + obj.config.symbol);
      }
      setDy(obj.txtValue, obj.params.valueFontSize, obj.params.valueY);
      currentValue = null;
    });
    //on animation end
    eve.on("raphael.anim.finish." + (obj.level.id), function() {
      obj.txtValue.attr({"text" : obj.originalValue});
      setDy(obj.txtValue, obj.params.valueFontSize, obj.params.valueY);
    });
  } else {
    //on animation start
    eve.on("raphael.anim.start." + (obj.level.id), function() {
      obj.txtValue.attr({"text" : obj.originalValue});
      setDy(obj.txtValue, obj.params.valueFontSize, obj.params.valueY);
    });
  }

  // animate gauge level, value & label
  obj.level.animate({
    pki: [
      obj.config.value,
      obj.config.min,
      obj.config.max,
      obj.params.widgetW,
      obj.params.widgetH,
      obj.params.dx,
      obj.params.dy,
      obj.config.gaugeWidthScale,
      obj.config.donut
    ]
  }, obj.config.startAnimationTime, obj.config.startAnimationType);
  obj.txtValue.animate({"fill-opacity":(obj.config.hideValue)?"0":"1"}, obj.config.startAnimationTime, obj.config.startAnimationType);
  obj.txtLabel.animate({"fill-opacity":"1"}, obj.config.startAnimationTime, obj.config.startAnimationType);
};

//
// tiny helper function to lookup value of a key from two hash tables
// if none found, return defaultvalue
//
// key: string
// tablea: object
// tableb: DOMStringMap|object
// defval: string|integer|float|null
// datatype: return datatype
// delimiter: delimiter to be used in conjunction with datatype formatting
//
JustGage.prototype.kvLookup = function(key, tablea, tableb, defval, datatype, delimiter) {
  var val = defval;
  var canConvert = false;
  if (!(key === null || key === undefined)) {
      if (tableb !== null && tableb !== undefined && typeof tableb === "object" && key in tableb) {
          val = tableb[key];
          canConvert = true;
      } else if (tablea !== null && tablea !== undefined && typeof tablea === "object" && key in tablea) {
          val = tablea[key];
          canConvert = true;
      } else {
          val = defval;
      }
      if (canConvert === true) {
          if (datatype !== null && datatype !== undefined) {
              switch(datatype) {
                  case 'int':
                    val = parseInt(val, 10);
                    break;
                  case 'float':
                    val = parseFloat(val);
                    break;
                  default:
                    break;
              }
          }
      }
  }
  return val;
};

/** Refresh gauge level */
JustGage.prototype.refresh = function(val, max) {

  var obj = this;
  var displayVal, color, max = max || null;

  // set new max
  if(max !== null) {
    obj.config.max = max;

    obj.txtMaximum = obj.config.max;
    if( obj.config.humanFriendly ) {
      obj.txtMaximum = humanFriendlyNumber( obj.config.max, obj.config.humanFriendlyDecimal );
    } else if( obj.config.formatNumber ) {
      obj.txtMaximum = formatNumber( obj.config.max );
    }
    obj.txtMax.attr({"text" : obj.txtMaximum});
    setDy(obj.txtMax, obj.params.maxFontSize, obj.params.maxY);
  }

  // overflow values
  displayVal = val;
  if ((val * 1) > (obj.config.max * 1)) {val = (obj.config.max * 1);}
  if ((val * 1) < (obj.config.min * 1)) {val = (obj.config.min * 1);}

  color = getColor(val, (val - obj.config.min) / (obj.config.max - obj.config.min), obj.config.levelColors, obj.config.noGradient, obj.config.customSectors);

  if(obj.config.textRenderer) {
    displayVal = obj.config.textRenderer(displayVal);
  } else if( obj.config.humanFriendly ) {
    displayVal = humanFriendlyNumber( displayVal, obj.config.humanFriendlyDecimal ) + obj.config.symbol;
  } else if( obj.config.formatNumber ) {
    displayVal = formatNumber((displayVal * 1).toFixed(obj.config.decimals)) + obj.config.symbol;
  } else {
    displayVal = (displayVal * 1).toFixed(obj.config.decimals) + obj.config.symbol;
  }
  obj.originalValue = displayVal;
  obj.config.value = val * 1;

  if(!obj.config.counter) {
    obj.txtValue.attr({"text":displayVal});
    setDy(obj.txtValue, obj.params.valueFontSize, obj.params.valueY);
  }

  obj.level.animate({
    pki: [
      obj.config.value,
      obj.config.min,
      obj.config.max,
      obj.params.widgetW,
      obj.params.widgetH,
      obj.params.dx,
      obj.params.dy,
      obj.config.gaugeWidthScale,
      obj.config.donut
    ],
    "fill":color
  },  obj.config.refreshAnimationTime, obj.config.refreshAnimationType);

  // var clear
  obj, displayVal, color, max = null;
};

/** Generate shadow */
JustGage.prototype.generateShadow = function(svg, defs) {

  var obj = this;
  var gaussFilter, feOffset, feGaussianBlur, feComposite1, feFlood, feComposite2, feComposite3;

  // FILTER
  gaussFilter = document.createElementNS(svg,"filter");
  gaussFilter.setAttribute("id","inner-shadow");
  defs.appendChild(gaussFilter);

  // offset
  feOffset = document.createElementNS(svg,"feOffset");
  feOffset.setAttribute("dx", 0);
  feOffset.setAttribute("dy", obj.config.shadowVerticalOffset);
  gaussFilter.appendChild(feOffset);

  // blur
  feGaussianBlur = document.createElementNS(svg,"feGaussianBlur");
  feGaussianBlur.setAttribute("result","offset-blur");
  feGaussianBlur.setAttribute("stdDeviation", obj.config.shadowSize);
  gaussFilter.appendChild(feGaussianBlur);

  // composite 1
  feComposite1 = document.createElementNS(svg,"feComposite");
  feComposite1.setAttribute("operator","out");
  feComposite1.setAttribute("in", "SourceGraphic");
  feComposite1.setAttribute("in2","offset-blur");
  feComposite1.setAttribute("result","inverse");
  gaussFilter.appendChild(feComposite1);

  // flood
  feFlood = document.createElementNS(svg,"feFlood");
  feFlood.setAttribute("flood-color","black");
  feFlood.setAttribute("flood-opacity", obj.config.shadowOpacity);
  feFlood.setAttribute("result","color");
  gaussFilter.appendChild(feFlood);

  // composite 2
  feComposite2 = document.createElementNS(svg,"feComposite");
  feComposite2.setAttribute("operator","in");
  feComposite2.setAttribute("in", "color");
  feComposite2.setAttribute("in2","inverse");
  feComposite2.setAttribute("result","shadow");
  gaussFilter.appendChild(feComposite2);

  // composite 3
  feComposite3 = document.createElementNS(svg,"feComposite");
  feComposite3.setAttribute("operator","over");
  feComposite3.setAttribute("in", "shadow");
  feComposite3.setAttribute("in2","SourceGraphic");
  gaussFilter.appendChild(feComposite3);

  // set shadow
  if (!obj.config.hideInnerShadow) {
    obj.canvas.canvas.childNodes[2].setAttribute("filter", "url(#inner-shadow)");
    obj.canvas.canvas.childNodes[3].setAttribute("filter", "url(#inner-shadow)");
  }

  // var clear
  gaussFilter, feOffset, feGaussianBlur, feComposite1, feFlood, feComposite2, feComposite3 = null;

};

/** Get color for value */
function getColor(val, pct, col, noGradient, custSec) {

  var no, inc, colors, percentage, rval, gval, bval, lower, upper, range, rangePct, pctLower, pctUpper, color;
  var noGradient = noGradient || custSec.length > 0;

  if(custSec.length > 0) {
    for(var i = 0; i < custSec.length; i++) {
      if(val > custSec[i].lo && val <= custSec[i].hi) {
        return custSec[i].color;
      }
    }
  }

  no = col.length;
  if (no === 1) return col[0];
  inc = (noGradient) ? (1 / no) : (1 / (no - 1));
  colors = [];
  for (i = 0; i < col.length; i++) {
    percentage = (noGradient) ? (inc * (i + 1)) : (inc * i);
    rval = parseInt((cutHex(col[i])).substring(0,2),16);
    gval = parseInt((cutHex(col[i])).substring(2,4),16);
    bval = parseInt((cutHex(col[i])).substring(4,6),16);
    colors[i] = { pct: percentage, color: { r: rval, g: gval, b: bval  } };
  }

  if(pct === 0) {
    return 'rgb(' + [colors[0].color.r, colors[0].color.g, colors[0].color.b].join(',') + ')';
  }

  for (var j = 0; j < colors.length; j++) {
    if (pct <= colors[j].pct) {
      if (noGradient) {
        return 'rgb(' + [colors[j].color.r, colors[j].color.g, colors[j].color.b].join(',') + ')';
      } else {
        lower = colors[j - 1];
        upper = colors[j];
        range = upper.pct - lower.pct;
        rangePct = (pct - lower.pct) / range;
        pctLower = 1 - rangePct;
        pctUpper = rangePct;
        color = {
          r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
          g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
          b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
        };
        return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
      }
    }
  }

}

/** Fix Raphael display:none tspan dy attribute bug */
function setDy(elem, fontSize, txtYpos) {
  if ((!ie || ie > 9) && elem.node.firstChild.attributes.dy) {
    elem.node.firstChild.attributes.dy.value = 0;
  }
}

/** Random integer  */
function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**  Cut hex  */
function cutHex(str) {
  return (str.charAt(0)=="#") ? str.substring(1,7):str;
}

/**  Human friendly number suffix - From: http://stackoverflow.com/questions/2692323/code-golf-friendly-number-abbreviator */
function humanFriendlyNumber( n, d ) {
  var p, d2, i, s;

  p = Math.pow;
  d2 = p(10, d);
  i = 7;
  while( i ) {
    s = p(10,i--*3);
    if( s <= n ) {
     n = Math.round(n*d2/s)/d2+"KMGTPE"[i];
   }
 }
 return n;
}

/** Format numbers with commas - From: http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript */
function formatNumber(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

/**  Get style  */
function getStyle(oElm, strCssRule){
  var strValue = "";
  if(document.defaultView && document.defaultView.getComputedStyle){
    strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
  }
  else if(oElm.currentStyle){
    strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
      return p1.toUpperCase();
    });
    strValue = oElm.currentStyle[strCssRule];
  }
  return strValue;
}

/**  Create Element NS Ready  */
function onCreateElementNsReady(func) {
  if (document.createElementNS !== undefined) {
    func();
  } else {
    setTimeout(function() { onCreateElementNsReady(func); }, 100);
  }
}

/**  Get IE version  */
// ----------------------------------------------------------
// A short snippet for detecting versions of IE in JavaScript
// without resorting to user-agent sniffing
// ----------------------------------------------------------
// If you're not in IE (or IE version is less than 5) then:
// ie === undefined
// If you're in IE (>=5) then you can determine which version:
// ie === 7; // IE7
// Thus, to detect IE:
// if (ie) {}
// And to detect the version:
// ie === 6 // IE6
// ie > 7 // IE8, IE9 ...
// ie < 9 // Anything less than IE9
// ----------------------------------------------------------
// UPDATE: Now using Live NodeList idea from @jdalton
var ie = (function(){

  var undef,
  v = 3,
  div = document.createElement('div'),
  all = div.getElementsByTagName('i');

  while (
    div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
    all[0]
    );
    return v > 4 ? v : undef;
}());
