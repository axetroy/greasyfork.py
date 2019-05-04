// ==UserScript==
// @name            32P Torrent Marker
// @name:en         32P Torrent Marker
// @namespace       043fe7eabab38a5df8a999030799ebcf
// @description     Mark torrents based on statistics.  This version was used to test out the 32p Ajax APIs
// @author          Mordred (original WCD ver), Stoic, btx, Raven, Hecate
// @include         https://*32pag.es/*
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant           GM_getValue
// @grant           GM_deleteValue
// @grant           GM_xmlhttpRequest
// @grant           GM_registerMenuCommand
// @grant           GM_addStyle
// @grant           GM_log
// @version         1.3.1
// @date            2017-02-04
// ==/UserScript==

// TODO: full_update and fullUpdateStarted should be re-enabled as needed depending on version changes. Disabling due to lots of updates recently

(function() {

    /* yes I know these three functions are also defined below. There are scoping issues at play here. */
    function GM_getLSValue(key, defaultValue) {
        var value = window.localStorage.getItem(key);
        if (value === null) { value = defaultValue; }
        return value;
    }

    function GM_setLSValue(key, value) {
        window.localStorage.setItem(key, value);
    }

    function GM_deleteLSValue(key) {
        window.localStorage.removeItem(key);
    }


    function main() {
        if (typeof GM_addStyle == 'undefined') {
            function GM_addStyle(css) {
                $("<style type='text/css'>" + css + "</style>").appendTo('head');
            }
        }
        if (typeof GM_log == 'undefined') {
            function GM_log(message) {
                console.log(message);
            }
        }

        var GROUP_SNATCHED = 'font-style:italic; font-weight:bolder; text-decoration:underline;';
        var T_SNATCHED = "color: #E5B244 !important; text-decoration:line-through !important; display:inline; background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAQwAAAEMBuP1yoAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGUSURBVCiRdZC7S1txGIaf3+8cw0krNl5D8ZLGy2KoWgexFpqpElHBLFECFToU/wDr5lKh3RU6FAuFkkXRDg4uMRSKULBQi6LiBTVggtc0UROTNMlxkUAw+db3eXn5HjHitL7q7ijzaAapkefSaR0EXMcy5/O+U4eY/dC+8eJpWXM+GMC3W4OxohlT7AeBYNCnFhtVcyF446iIrv53NDTZ2N/rZXV67LksBEcTGVLmARqabACETgNUGi+SBQvLh/U4nG8BiITDHKx8xvxIT0uAzUAR/jM9C//xa3QPjSOEAGDBM0FXfQQAGYkiRa2bh23v8e085jiUQnviorrGAsBP7zwtpjXuuqjb/2ofuHrcSCmxtXbiXZzD0TcIwMlxkNDWNxqtIrsuW6r80ZnJYVZ/L6MoCo7+wWy4NPeRDmss5zepGaRubzwhvj6B59MYl5EwAIvfv/CsfPOeDDWeSF8B5ZZKnTr9L96vb0iV2im58mKyKDnw5fX/fTHqtr5+2VYxpSpkFSeTGQyGXOOxeOZm6de58xb9E4VgNHk7awAAAABJRU5ErkJggg==') top right no-repeat; padding:0 16px 0 0;";
        var UPLOADED = "color: #63b708 !important; text-decoration:line-through !important; display:inline; background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAATwAAAE8BY4r91wAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFQSURBVCiRvY6/SwIBHMU/etr5o0zLQbTFCMqOBMmlycElJAxa2vwT3KLJNncbw1FbEqNZgsChJVM8CRpSpEEIkrg4TYesQTr0cIiG3vj5vvd9z8A6foJcscgykxoBPQQW+JziXZrU2DexSRaJ4NTxC9w3buZe5+jsdcA2cVvBx4CMESdb6OS6dZGMJSldlPBee9F1goddoz7kqDlIbCdIHaeQJIlMKoO77NbbDAIhjnBiB7A+WIkvxcmeZjWHtCGhPCvIdZmhZziGCj2tUWyKREYR8md5/XfSJ2mi9ihiS9TYOPgB5roZ+UnGF/SRO89phuJlEX/YT6PVQCgLoI65CQArqAcqKio8Qn/Q14LKu0J7rQ2BiQndn8Y/6P+DplmwWqlScBQAqFQqM4MGDrkjQFgjPbA1bVOm/mof5ifAPUUDIXaQyGHB8quNb7xQJfYNdP5dvnQNb1cAAAAASUVORK5CYII=') top right no-repeat; padding:0 16px 0 0;";
        var LEECHING = "color: #F70000 !important; display:inline; background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAATwAAAE8BY4r91wAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFWSURBVCiRvZA9SAJhHIcfz4MusAb74hCKzMaiGgIVgsBQhDCpUdoapWhtDPcInApBXBsSt2gLagiKxPUwgkyhK8GhE+vehvI406CpZ/w/7//j9zqWYDIOpyMwxB+4B+0YYnIUjlZgti3egYKiYEoSAJJpsmoYyN9+DjxvcCCpMGOf+AzcBoME8nkC+Tw3fj8vP7ZOQ0SmBxOqSigUAqCQyXR5Bzikv+Tqxf83WhlzTieXHg+uvj4W3G7rgTI4SEpVUZxOFisV1k3zS2ShVgJxDWLZ6xW6rouf6LouQj6fuAJRApGFmnVqP7BdLrMViyGEsDa2Wi02IxGSmsbAbxl9QjB/d8dhKmXVkokEa8UiU7ZhHRnbxBsN9tNpguEwV+fnDJ+d4W82uz/nFR6AUXtxt1plZ2ODccNgr17vatLgwhEHfxhyLlDs8hHkMfiQoePGJ6idQPQT2NF6REfuIV4AAAAASUVORK5CYII=') center right no-repeat; padding:0 16px 0 0;";
        var SEEDING = 'font-style:italic; text-decoration:none !important;';
        var BOOKMARKED = "background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAATwAAAE8BY4r91wAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEVSURBVCiR3ZA/S8MAEMV/sQkNOliIQtFiEApFi6Ht5jcQF5eCU4cuHV1E9Cu4OXVxyOAXcJQu7VoQLaGg2H8aoSBEYghiSJviYlyMEBx92713797dCZBbB+0SFhVi4XUAt3sibJ5DXgPQtDuyWTWyvd9/wjA2gMwqeGcipLZCsVRS0fXTSGO1eoxhhFV6Zy7eej8g/NXIfzA6joNpPv9qFKPIIAgolw9wXZ9WS0eW5XiJtdoJzaZCu61SqRxGJiageASpBYBCYcJw+Ei9buJ5CiAxGn0wm/WwbZdORwoPeU9Abh+WVwCSyWsajTcsK/M9eTqdp9u9x/cfGI/XvtjBlQDFbchfgCyDJcHSJPodoWa/wM3uJ1AgVOKAVmQZAAAAAElFTkSuQmCC') center right no-repeat; padding:0 16px 0 0;";

        var HEADER_STYLE = '.sBoxTitle { color: white; } .sBoxTitle:visited { color: white; } .sboxTitleVersion { color: red; } .sboxTitleVersion:visited { color: red; }';
        var AUTO_UPDATE_INTERVAL = 20; /* minutes */
        var STATUS_BOX_YOFFSET = 20; /* pixels */
        //We use the beta script
        var scriptVersion = GM_info.script.version;
        $('body').attr('tmscriptvers',scriptVersion);

        var global_updateFreq = GM_getLSValue('update_freq', AUTO_UPDATE_INTERVAL);
        var global_hideStatusBox = GM_getLSValue('box_hidden', 'false');
        var global_SB_YOffset = GM_getLSValue('box_yoffset', STATUS_BOX_YOFFSET);
        ['style_tsnatched', 'style_uploaded', 'style_leeching', 'style_bookmarked'].forEach(function(tkey) {
            var tval = window.localStorage.getItem(tkey);
            if ((tval !== null) && (tval.includes('whatimg')) && (tval.includes('baconbits'))) {
                GM_deleteLSValue(tkey);
            }
        });

        /* Inject CSS style */
        var style_groupsnatched = GM_getLSValue('style_groupsnatched', GROUP_SNATCHED);

        var style_tsnatched = GM_getLSValue('style_tsnatched', T_SNATCHED);
        var style_uploaded = GM_getLSValue('style_uploaded', UPLOADED);
        var style_leeching = GM_getLSValue('style_leeching', LEECHING);
        var style_seeding = GM_getLSValue('style_seeding', SEEDING);
        var style_bookmarked = GM_getLSValue('style_bookmarked', BOOKMARKED);
        // Get stylesheet BG color
        var tm32p_bg_style = $("#content").css("background-color");
        var tm32p_menu_bg_color = tm32p_bg_style == 'rgba(0, 0, 0, 0)' ? 'rgb(0, 0, 0)' : tm32p_bg_style;

        GM_addStyle('.group_snatched { ' + style_groupsnatched + ' }');
        GM_addStyle('.tm32p_snatched { ' + style_tsnatched + ' }');
        GM_addStyle('.tm32p_uploaded { ' + style_uploaded + ' }');
        GM_addStyle('.tm32p_leeching { ' + style_leeching + ' }');
        GM_addStyle('.tm32p_seeding { ' + style_seeding + ' }');
        GM_addStyle('.tm32p_bookmark { ' + style_bookmarked + ' }');
        GM_addStyle(HEADER_STYLE);
        GM_addStyle(".tm32p_menu { background-color: " + tm32p_menu_bg_color + "; position: fixed; z-index: 500; font-family: Arial, sans-serif; font-size: 11px !important; }");
        GM_addStyle(".tm32p_button { cursor: pointer; margin-left:12px; float:right; -webkit-box-shadow:inset 0px 1px 0px 0px #ffffff; box-shadow:inset 0px 1px 0px 0px #ffffff; background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #343536), color-stop(1, #a3a3a3) ); background:-moz-linear-gradient( center top, #343536 5%, #a3a3a3 100% ); filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#343536', endColorstr='#a3a3a3'); background-color:#343536; -webkit-border-radius:6px; border-radius:6px; border:1px solid #a1a1a1; display:inline-block; color:#a8a8a8; font-family:arial; font-size:15px; font-weight:bold; padding:4px 6px; text-decoration:none; text-shadow:1px 1px 0px #575757; }");
        GM_addStyle(".tm32p_button:hover { background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #a3a3a3), color-stop(1, #343536) ); background:-moz-linear-gradient( center top, #a3a3a3 5%, #343536 100% ); filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#a3a3a3', endColorstr='#343536'); background-color:#a3a3a3; }");
        GM_addStyle(".tm32p_button:active { position:relative; top:1px; }");
        GM_addStyle(".tm32p_sm_button { cursor: pointer; margin-right:5px; -webkit-box-shadow:inset 0px 1px 0px 0px #ffffff; box-shadow:inset 0px 1px 0px 0px #ffffff; background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #343536), color-stop(1, #a3a3a3) ); background:-moz-linear-gradient( center top, #343536 5%, #a3a3a3 100% ); filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#343536', endColorstr='#a3a3a3'); background-color:#343536; -webkit-border-radius:3px; border-radius:3px; border:1px solid #a1a1a1; display:inline-block; color:#a8a8a8; font-family:arial; font-size: 10px; font-weight:bold; padding:3px 6px; text-decoration:none; text-shadow:1px 1px 0px #575757; }");
        GM_addStyle(".tm32p_sm_button:hover { background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #a3a3a3), color-stop(1, #343536) ); background:-moz-linear-gradient( center top, #a3a3a3 5%, #343536 100% ); filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#a3a3a3', endColorstr='#343536'); background-color:#a3a3a3; }");
        GM_addStyle(".tm32p_sm_button:active { position:relative; top:1px; }");
        GM_addStyle(".tm32p_subItem { margin: 0px 5px 0px 25px; }");
        GM_addStyle(".tm32p_numeric { padding: 2px !important; font-size: 9pt !important; }");
        GM_addStyle('.tm32p_header { color:#ffffff !important; font-size: 10pt; margin: 5px 0; }'); //padding: 5px 0px; }');
        GM_addStyle('input.tm32p_text { width: 68% !important; margin-right:10px; padding: 2px !important; font-size: 9pt !important; }');
        GM_addStyle('.tm32p_small_text { font-size: 10px; }');
        GM_addStyle('.tm32p_link { margin-left:3px; margin-right:3px; }');
        GM_addStyle('.tm32p_class { display: inline-block; width:93px; margin-left:25px; margin-bottom:9px; font-size:8pt;}');
        GM_addStyle('.tm32p_leftCol { width:50%; height:auto; display:table-cell; padding: 10px 0px 10px; }');
        GM_addStyle('.tm32p_rightCol { width:auto; height:auto; display:table-cell; padding: 10px 0px 10px; }');

        function log(text) {
            GM_log(text);
        }

        /* Throttled proxy */
        function Proxy(url_base, delay) {
            var last_req = new Date(0);
            var queue = [];
            var processing = false;

            return {
                get: function(req) {
                    var now = new Date();
                    queue.push(req);
                    if (!processing) {
                        /* Race condition: atomic test and set would be appropriate here, to ensure thread safety (is it a problem?) */
                        processing = true;
                        var diff = last_req.getTime() + delay - now.getTime();
                        if (diff > 0) {
                            var that = this;
                            window.setTimeout(function() {
                                that.process_queue();
                            }, diff);
                        } else {
                            this.process_queue();
                        }
                    }
                },

                process_queue: function() {
                    var req = queue.shift();
                    this.do_request(req);
                    processing = (queue.length > 0);
                    if (processing) {
                        var that = this;
                        window.setTimeout(function() {
                            that.process_queue();
                        }, delay);
                    }
                },

                do_request: function(req) {
                    last_req = new Date();
                    var timer;
                    var req_timed_out = false; /* We cannot abort a request, so we need keep track of whether it timed out */
                    var ajax_settings = {};

                    /* Create timeout handler */
                    timer = window.setTimeout(function() {
                        /* Race condition: what if the request returns successfully now? */
                        req_timed_out = true;
                        if (req.error) { req.error(null, 'Network timeout'); }
                    }, req.timeout || 20000);

                    ajax_settings = {
                        url: req['url'] || "/",
                        data: req['data'] || {},
                        dataType: req['dataType'] || 'html',
                        method: req.method || 'GET',
                        headers: {
                            'Accept': req.accept || 'text/xml'
                        },
                        success: function(data, textStatus, jqHR) {
                            window.clearTimeout(timer);
                            if (!req_timed_out) {
                                if (req.success) {
                                    req.success(data);
                                }
                            }
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            window.clearTimeout(timer);
                            if (!req_timed_out) {
                                if (req.error) {
                                    req.error(jqXHR, textStatus, errorThrown);
                                }
                            }
                        }
                    };
                    $.ajax(ajax_settings);
                }
            };
        }

        /* Simple rounding (extracted from jQuery Corner) */
        jQuery.fn.rounding = function(radius) {
            radius = radius || "10px";
            return this.each(function(i) {
                //log ("IsMoz = " + $.browser.mozilla + " Agent: '" + navigator.userAgent + "' Version:"+ $.browser.version);
                $(this).css('-webkit-border-radius', radius);
                $(this).css('border-radius', radius);
            });
        };

        /* Global status area - feel free to reuse in your own scripts :)
       Requires jQuery and the round extension above. */
        function StatusBox(title, newVersion) {
            /* Setup status area */
            var status_area = $('#tm32p_greasemonkey_status_area').eq(0);
            if (status_area.length === 0) {
                var statWidth = '20%';
                if (window.innerWidth < 1340) {
                    statWidth = 268;
                }
                status_area = $('<div id="tm32p_greasemonkey_status_area"></div>').css({
                    'position': 'fixed',
                    'margin': global_SB_YOffset.toString() + 'px 20px',
                    'width': statWidth,
                    'z-index': 499
                });
                var boxPos = GM_getLSValue("box_position", "top_right");
                if (boxPos == "bottom_right") {
                    status_area.css({
                        'bottom': '0',
                        'right': '0'
                    });
                } else if (boxPos == "top_left") {
                    status_area.css({
                        'top': '0',
                        'left': '0'
                    });
                } else if (boxPos == "bottom_left") {
                    status_area.css({
                        'bottom': '0',
                        'left': '0'
                    });
                } else {
                    status_area.css({
                        'top': '0',
                        'right': '0'
                    });
                }
                $('body').append(status_area);
            }

            /* Create box */
            var box = $('<div id="status_content_area"></div>').hide();
            box.css({
                'color': 'white',
                'background-color': tm32p_menu_bg_color,
                'opacity': 0.75,
                'margin': '0 0 10px 0',
                'padding': '10px 10px 20px 10px'
            }).rounding();
            box.append($('<div>' + title + '</div>').css({
                'font-weight': 'bold'
            }));

            /* Create contents area */
            var contents = $('<div></div>');
            box.append(contents);

            var timer = null;
            var timeout = 0;
            var inhibit_fade = false;

            function set_visible(visible) {
                if (visible && box.is(':hidden')) box.fadeIn(500);
                else if (!visible && box.is(':visible')) box.fadeOut(500);
            }

            function clear_timer() {
                if (timer) {
                    window.clearTimeout(timer);
                    timer = null;
                }
            }

            function set_timer() {
                if (!timer && timeout > 0) {
                    timer = window.setTimeout(function() {
                        clear_timer();
                        set_visible(false);
                    }, timeout);
                }
            }

            function update_timer(t) {
                clear_timer();
                timeout = t;
                if (!inhibit_fade) set_timer();
            }

            function set_inhibit_fade(inhibit) {
                inhibit_fade = inhibit;
                if (!inhibit_fade) {
                    set_timer();
                } else clear_timer();
            }

            /* Register event handlers */
            box.mouseenter(function(event) {
                set_inhibit_fade(true);
                $(this).fadeTo(500, 0.8);
            });

            box.mouseleave(function(event) {
                set_inhibit_fade(false);
                $(this).fadeTo(500, 0.5);
            });

            box.click(function(event) {
                clear_timer();
                $(this).unbind('mouseenter');
                $(this).unbind('mouseleave');
                set_visible(false);
            });

            /* Append to global status area */
            status_area.append(box);

            return {
                contents: function() {
                    return contents;
                },

                show: function(t) {
                    if ((global_hideStatusBox != 'true') || (/32pag\.es\/torrents\.php.type/.test(document.URL))) {
                        t = t || 0;
                        update_timer(t);
                        set_visible(true);
                    }
                },

                hide: function() {
                    clear_timer();
                    set_visible(false);
                }
            };
        }

        function doOptionsMenu() {
            var options_menu = $('#tm32p_options_menu').eq(0);
            if (options_menu.length === 0) {
                var optHeight = 570;
                var optWidth = 820;
                options_menu = $('<div id="tm32p_options_menu" class="tm32p_menu"></div>').css({
                    'top': window.innerHeight,
                    'left': '50%',
                    'margin-left': -optWidth * 0.5,
                    'width': optWidth,
                    'height': "auto",
                    'background-color': '#444',
                }).hide().rounding();
                var spacer_div = $('<div></div>').css({
                    'padding': '5px 0 0 30px'
                });
                var css_div = $('<div></div>').css({
                    'width': '95%',
                    'height': 'auto',
                    'margin': '0px 10px',
                    'padding': '15px 15px 20px 15px',
                    'background-color': '#444',
                    'border-radius': '6px 6px 0 0',
                    'color': '#ffffff' //,'overflow': 'hidden'
                });
                var refreshHeader = $('<h3 class="tm32p_header">Update Frequency</h3>');
                var refreshInput = $('<input class="tm32p_subItem tm32p_numeric" type="text" name="interval" maxlength="3">Interval between updates in minutes (minimum of 10)<br>').css({
                    'text-align': 'right',
                    'width': '20px'
                });
                var columns_div = $('<div></div>').css({
                    'width': '100%',
                    'margin-top': '-18px',
                    'display': 'table'
                });
                var leftColumn = $('<div class="tm32p_leftCol"></div>');
                leftColumn.append(refreshHeader);
                leftColumn.append(refreshInput);

                var hideHeader = $('<h3 class="tm32p_header">Visibility</h3>');
                var check_box_hide = $('<input class="tm32p_subItem" type="checkbox" name="visibility">Show the status box on all pages<br>');
                var explanation_div = $('<div class="tm32p_small_text tm32p_subItem">The status box will always appear on \'/torrents.php?type=...\' and whenever a script update is available.</div>');
                leftColumn.append(hideHeader);
                leftColumn.append(check_box_hide);
                leftColumn.append(explanation_div);

                var positionHeader = $('<h3 class="tm32p_header">Status Box Position</h3>');
                var radio_button_tl = $('<input class="tm32p_subItem" type="radio" name="location" id="top_left"/>Top Left<br>');
                var radio_button_tr = $('<input class="tm32p_subItem" type="radio" name="location" id="top_right"/>Top Right<br>');
                var radio_button_bl = $('<input class="tm32p_subItem" type="radio" name="location" id="bottom_left"/>Bottom Left<br>');
                var radio_button_br = $('<input class="tm32p_subItem" type="radio" name="location" id="bottom_right"/>Bottom Right<br>');
                var rightColumn = $('<div class="tm32p_rightCol"></div>');
                rightColumn.append(positionHeader);
                rightColumn.append(radio_button_tl);
                rightColumn.append(radio_button_tr);
                rightColumn.append(radio_button_bl);
                rightColumn.append(radio_button_br);

                var offsetHeader = $('<h3 class="tm32p_header">Status Box Y-Offset</h3>');
                var offsetInput = $('<input class="tm32p_subItem tm32p_numeric" type="text" name="yOffset" maxlength="3">The offset in pixels from the top or bottom of the window<br>').css({
                    'text-align': 'right',
                    'width': '20px'
                });
                rightColumn.append(offsetHeader);
                rightColumn.append(offsetInput);
                columns_div.append(leftColumn);
                columns_div.append(rightColumn);
                spacer_div.append(columns_div);
                css_div.append(spacer_div);

                var full_div = $('<div></div>');

                var styleHeader = $('<h3 class="tm32p_header">Link Style Settings</h3>');
                full_div.append(styleHeader);
                var sampleText = $('<span class="tm32p_class"></span><a href="#" id="sample_gsnatched">Sample Group Snatched Torrent Link</a><br>');
                sampleText.click(function() {
                    return false;
                });
                var snatchedInput = $('<span class="tm32p_class">.group_snatched</span><input class="tm32p_text" type="text" id="input_gsnatched" value="' + style_groupsnatched + '">');
                var applyLink = $('<span class="tm32p_sm_button">Test</span>');
                applyLink.click(function() {
                    ApplyStyle('sample_gsnatched', 'input_gsnatched');
                    return false;
                });
                var defaultLink = $('<span class="tm32p_sm_button">Default</span>');
                defaultLink.click(function() {
                    SetStyle('sample_gsnatched', GROUP_SNATCHED);
                    $("input[id='input_gsnatched']").val(GROUP_SNATCHED);
                    return false;
                });
                full_div.append(sampleText);
                full_div.append(snatchedInput);
                full_div.append(applyLink);
                full_div.append(defaultLink);

                sampleText = $('<span class="tm32p_class"></span><a href="#" id="sample_tsnatched">Sample Snatched Torrent Link</a><br>');
                sampleText.click(function() {
                    return false;
                });
                snatchedInput = $('<span class="tm32p_class">.tm32p_snatched</span><input class="tm32p_text" type="text" id="input_tsnatched" value="' + style_tsnatched + '">');
                applyLink = $('<span class="tm32p_sm_button">Test</span>');
                applyLink.click(function() {
                    ApplyStyle('sample_tsnatched', 'input_tsnatched');
                    ApplyStyle('sample_seeding', 'input_tsnatched', 'input_seeding');
                    return false;
                });
                defaultLink = $('<span class="tm32p_sm_button">Default</span>');
                defaultLink.click(function() {
                    SetStyle('sample_tsnatched', T_SNATCHED);
                    SetStyle('sample_seeding', T_SNATCHED + $("input[id='input_seeding']").val());
                    $("input[id='input_tsnatched']").val(T_SNATCHED);
                    return false;
                });
                full_div.append(sampleText);
                full_div.append(snatchedInput);
                full_div.append(applyLink);
                full_div.append(defaultLink);

                sampleText = $('<span class="tm32p_class"></span><a href="#" id="sample_uploaded">Sample Uploaded Torrent Link</a><br>');
                sampleText.click(function() {
                    return false;
                });
                snatchedInput = $('<span class="tm32p_class">.tm32p_uploaded</span><input class="tm32p_text" type="text" id="input_uploaded" value="' + style_uploaded + '">');
                applyLink = $('<span class="tm32p_sm_button">Test</span>');
                applyLink.click(function() {
                    ApplyStyle('sample_uploaded', 'input_uploaded');
                    ApplyStyle('sample_ul_seed', 'input_uploaded', 'input_seeding');
                    return false;
                });
                defaultLink = $('<span class="tm32p_sm_button">Default</span>');
                defaultLink.click(function() {
                    SetStyle('sample_uploaded', UPLOADED);
                    SetStyle('sample_ul_seed', UPLOADED + $("input[id='input_seeding']").val());
                    $("input[id='input_uploaded']").val(UPLOADED);
                    return false;
                });
                full_div.append(sampleText);
                full_div.append(snatchedInput);
                full_div.append(applyLink);
                full_div.append(defaultLink);

                //sampleText = $('<span class="tm32p_class"></span><a href="#" id="sample_seeding">Sample Seeding Snatched Torrent Link</a><span>&nbsp;&nbsp;(.tm32p_snatched style is also applied to this link)</span><br>');
                //sampleTxt2 = $('<span class="tm32p_class"></span><a href="#" id="sample_ul_seed">Sample Seeding Uploaded Torrent Link</a><span>&nbsp;&nbsp;(.tm32p_uploaded style is also applied to this link)</span><br>');
                sampleText = $('<span class="tm32p_class"></span>Seeding links will <i>always</i> have either the .tm32p_snatched style or the .tm32p_uploaded style applied<br><span class="tm32p_class"></span>to them, so .tm32p_seeding is commonly used to override those base styles.</br>');
                var sampleTxt2 = $('<span class="tm32p_class"></span><a href="#" id="sample_seeding">Sample Seeding Snatched Torrent Link</a>&nbsp;&nbsp;<a href="#" id="sample_ul_seed">Sample Seeding Uploaded Torrent Link</a><br>');
                //sampleText.click(function () { return false; });
                sampleTxt2.click(function() {
                    return false;
                });
                snatchedInput = $('<span class="tm32p_class">.tm32p_seeding</span><input class="tm32p_text" type="text" id="input_seeding" value="' + style_seeding + '">');
                applyLink = $('<span class="tm32p_sm_button">Test</span>');
                applyLink.click(function() {
                    ApplyStyle('sample_seeding', 'input_tsnatched', 'input_seeding');
                    ApplyStyle('sample_ul_seed', 'input_uploaded', 'input_seeding');
                    return false;
                });
                defaultLink = $('<span class="tm32p_sm_button">Default</span>');
                defaultLink.click(function() {
                    SetStyle('sample_seeding', $("input[id='input_tsnatched']").val() + SEEDING);
                    $("input[id='input_seeding']").val(SEEDING);
                    SetStyle('sample_ul_seed', $("input[id='input_uploaded']").val() + SEEDING);
                    return false;
                });
                full_div.append(sampleText);
                full_div.append(sampleTxt2);
                full_div.append(snatchedInput);
                full_div.append(applyLink);
                full_div.append(defaultLink);

                sampleText = $('<span class="tm32p_class"></span><a href="#" id="sample_leeching">Sample Leeching Torrent Link</a><br>');
                sampleText.click(function() {
                    return false;
                });
                snatchedInput = $('<span class="tm32p_class">.tm32p_leeching</span><input class="tm32p_text" type="text" id="input_leeching" value="' + style_leeching + '">');
                applyLink = $('<span class="tm32p_sm_button">Test</span>');
                applyLink.click(function() {
                    ApplyStyle('sample_leeching', 'input_leeching');
                    return false;
                });
                defaultLink = $('<span class="tm32p_sm_button">Default</span>');
                defaultLink.click(function() {
                    SetStyle('sample_leeching', LEECHING);
                    $("input[id='input_leeching']").val(LEECHING);
                    return false;
                });
                full_div.append(sampleText);
                full_div.append(snatchedInput);
                full_div.append(applyLink);
                full_div.append(defaultLink);

                sampleText = $('<span class="tm32p_class"></span><a href="#" id="sample_bookmarked">Sample Bookmarked Torrent Link</a><br>');
                sampleText.click(function() {
                    return false;
                });
                snatchedInput = $('<span class="tm32p_class">.tm32p_bookmark</span><input class="tm32p_text" type="text" id="input_bookmarked" value="' + style_bookmarked + '">');
                applyLink = $('<span class="tm32p_sm_button">Test</span>');
                applyLink.click(function() {
                    ApplyStyle('sample_bookmarked', 'input_bookmarked');
                    return false;
                });
                defaultLink = $('<span class="tm32p_sm_button">Default</span>');
                defaultLink.click(function() {
                    SetStyle('sample_bookmarked', BOOKMARKED);
                    $("input[id='input_bookmarked']").val(BOOKMARKED);
                    return false;
                });
                full_div.append(sampleText);
                full_div.append(snatchedInput);
                full_div.append(applyLink);
                full_div.append(defaultLink);
                css_div.append(full_div);

                var okay_button = $('<span id="js_ok_button" class="tm32p_button">Submit</span>');
                okay_button.click(function() {
                    CommitOptions();
                    DisplaySlideMenu(false);
                });
                var cancel_button = $('<span id="js_close_button" class="tm32p_button">Cancel</span>');
                cancel_button.click(function() {
                    DisplaySlideMenu(false);
                });
                var button_div = $('<div></div>').css({
                    'width': '95%',
                    'margin': '10px 15px 5px',
                    'overflow': 'hidden',
                    'background-color': '#444',
                    'border-radius': '0 0 6px 6px',
                    'padding': '0px 0px 10px'
                });

                options_menu.append(css_div);
                button_div.append(cancel_button);
                button_div.append(okay_button);
                options_menu.append(button_div);
                $('body').append(options_menu);
            } else {
                // we already created the div
                var boxPos = GM_getLSValue('box_position', 'top_right');
                $("input[name='location'][id='" + boxPos + "']").attr('checked', 'checked');
                if (global_hideStatusBox != 'true')
                    $("input[name='visibility']").attr('checked', 'checked');
                $("input[name='interval']").val(global_updateFreq);
                $("input[name='yOffset']").val(global_SB_YOffset);
                ApplyStyle('sample_gsnatched', 'input_gsnatched');
                ApplyStyle('sample_tsnatched', 'input_tsnatched');
                ApplyStyle('sample_uploaded', 'input_uploaded');
                ApplyStyle('sample_leeching', 'input_leeching');
                ApplyStyle('sample_seeding', 'input_tsnatched', 'input_seeding');
                ApplyStyle('sample_ul_seed', 'input_uploaded', 'input_seeding');
                ApplyStyle('sample_bookmarked', 'input_bookmarked');
            }
        }

        function ApplyStyle(textControl, styleControl, styleControl2) {
            var css_style = $("input[id='" + styleControl + "']").val();
            if (styleControl2)
                css_style += $("input[id='" + styleControl2 + "']").val();
            SetStyle(textControl, css_style);
        }

        function SetStyle(textControl, css_style) {
            $("a[id='" + textControl + "']").removeAttr('style');
            $("a[id='" + textControl + "']").attr('style', css_style);
        }

        function CommitOptions() {
            var locRadio = $("input[name='location']:checked").attr('id');
            if (locRadio.length !== 0)
                GM_setLSValue('box_position', locRadio);
            var boxHide = $("input[name='visibility']:checked");
            if (boxHide.length !== 0)
                GM_deleteLSValue('box_hidden');
            else {
                GM_setLSValue('box_hidden', 'true');
                global_hideStatusBox = true;
                status.hide();
            }
            var updateFreq = $("input[name='interval']").val();
            if (jQuery.isNumeric(updateFreq)) {
                if (updateFreq != AUTO_UPDATE_INTERVAL) {
                    if (updateFreq < 10) updateFreq = 10;
                    GM_setLSValue('update_freq', updateFreq);
                } else
                    GM_deleteLSValue('update_freq');
            }
            var offset = $("input[name='yOffset']").val();
            if (jQuery.isNumeric(offset) && offset >= 0) {
                if (offset != STATUS_BOX_YOFFSET)
                    GM_setLSValue('box_yoffset', offset);
                else
                    GM_deleteLSValue('box_yoffset');
            }
            AddOrDeleteCustomStyle('input_gsnatched', GROUP_SNATCHED, 'style_groupsnatched', '.group_snatched');
            AddOrDeleteCustomStyle('input_tsnatched', T_SNATCHED, 'style_tsnatched', '.tm32p_snatched');
            AddOrDeleteCustomStyle('input_uploaded', UPLOADED, 'style_uploaded', '.tm32p_uploaded');
            AddOrDeleteCustomStyle('input_leeching', LEECHING, 'style_leeching', '.tm32p_leeching');
            AddOrDeleteCustomStyle('input_seeding', SEEDING, 'style_seeding', '.tm32p_seeding');
            AddOrDeleteCustomStyle('input_bookmarked', BOOKMARKED, 'style_bookmarked', '.tm32p_bookmark');
        }

        function AddOrDeleteCustomStyle(inputName, def_css, storageVal, className) {
            var css = jQuery.trim($("input[id='" + inputName + "']").val());
            if (css == def_css) { // if the current css stripped of whitespace equals the default style, delete the custom style
                GM_deleteLSValue(storageVal);
                css = def_css;
            } else
                GM_setLSValue(storageVal, css);
            GM_addStyle(className + '{' + css + '}'); // updates the page without reloading (at least on chrome)
        }

        function DisplaySlideMenu(showMenu) {
            if (showMenu) {
                if (!slideMenuShowing) {
                    slideMenuShowing = 1;
                    $('#tm32p_options_menu').show().animate({
                        top: '0px'
                    });
                }
            } else {
                slideMenuShowing = 0;
                $('#tm32p_options_menu').animate({
                    top: '+=' + window.innerHeight + 'px'
                }, function() {
                    $('#tm32p_options_menu').hide();
                });
            }
        }
        /*****************************/
        /*** END OPTIONS PAGE CODE ***/
        /*****************************/

        /* Cache */
        function Cache(name, def_value) {
            var cache;
            return {
                serialize: function() {
                    GM_setLSValue(name, JSON.stringify(cache));
                },
                unserialize: function() {
                    cache = jQuery.parseJSON(GM_getLSValue(name, 'false'));
                    if (!cache) cache = jQuery.extend({}, def_value); /* clone */
                    return cache;
                },
                clear: function() {
                    cache = jQuery.extend({}, def_value); /* clone */
                    this.serialize();
                }
            };
        }

        function registerMenuCommand(oText, oFunc) {
            if (/firefox|\)\ Chrome/i.test(navigator.userAgent)) {
                GM_registerMenuCommand(oText, oFunc);
            }
            MenuCommandArray[MenuCommandArray.length] = [oText.replace("32pag.es Torrent Marker: ", ""), oFunc, oText.replace("32pag.es Torrent Marker: ", "").replace(" ", "_")];
        }

        /************************************/
        /*** SCRIPT EXECUTION STARTS HERE ***/
        /************************************/

        /* Get 32page.es base URL */
        var v32p_url_base = document.URL.match(/(^https:\/\/32pag\.es)/)[1];

        /* Create proxy */
        var v32p_proxy = Proxy(v32p_url_base, 500);

        /* Get user id of this user */
        var v32p_id = (function() {
            var m = $('#userinfo_username .username').eq(0).attr('href').match(/user\.php\?id=(\d+)/);
            if (m) return m[1];
            return null;
        })();

        if (!v32p_id) return; /* Exceptional condition: User ID not found */

        /* Create status box */
        var status = StatusBox('32pag.es Torrent Marker');
        var options = doOptionsMenu();
        var slideMenuShowing = 0;

        /* Cache of snatched torrents */
        var snatch_cache = Cache('snatch_cache', {
            groups: {},
            torrents: {}
        });
        var bookmark_cache = Cache('bookmark_cache', {
            groups: {}
        });

        var MenuCommandArray = [];
        var hasPageGMloaded = false;
        var tmpSnatched = GM_getLSValue('crit_snatched', '0');
        var tmpUploaded = GM_getLSValue('crit_uploaded', '0');
        var lastCrits = {
            snatched: tmpSnatched,
            uploaded: tmpUploaded,
            leeching: 0,
            seeding: 0,
            bookmark: 0
        };
        /* Reset command */
        registerMenuCommand('32pag.es Torrent Marker: Reset Snatched', function() {
            snatch_cache.clear();
            bookmark_cache.clear();
            GM_setLSValue('last_update', '0');
            GM_setLSValue('full_update', '1');
            GM_setLSValue('fullUpdateStarted', '1');
            location.reload();
        });
        /* Update w/o clear */
        registerMenuCommand('32pag.es Torrent Marker: Update', function() {
            GM_setLSValue('last_update', '0');
            GM_setLSValue('full_update', '1');
            GM_setLSValue('force_all', '1');
            GM_setLSValue('fullUpdateStarted', '1');
            location.reload();
        });
        registerMenuCommand('32pag.es Torrent Marker: Options', function() {
            DisplaySlideMenu(true);
        });

        doGMMenu();
        doOptionsMenu();

        /* Scan torrent table in doc and mark links as type in cache */
        function scan_torrent_page(doc, type) {
            //log(type);
            var torrent_table = $(doc).find('.linkbox:first ~ table').eq(0);
            if (torrent_table.length === 0) return 0;
            var found = 0;

            /* Old version: {"groups":{"2417":{"name":"pg.lost - Yes I Am"}}, "torrents":{941290:{type:"snatched", seeding:true}}} */
            /* New version: {"groups":{"2417":{"nm":"pg.lost - Yes I Am"}}, "torrents":{941290:{ty:"snatched", sd:1}}} // this was changed to save space */
            var d = snatch_cache.unserialize();
            torrent_table.find('tr:gt(0)').each(function(i) {
                /* Find group and torrent ID */
                var group_id;
                var torrent_id;
                var link = $(this).children('td:first').children('a:first').eq(0);
                var m = link.attr('href').match(/torrents\.php\?id=(\d+)&torrentid=(\d+)/);
                if (m) {
                    group_id = m[1];
                    torrent_id = m[2];
                } else {
                    /* I don't know if we can ever get here! */
                    log("Not sure how 32pag.es Torrent Marker got here. Please notify MordredKLB with what you were doing");
                    m = link.attr('href').match(/torrents\.php\?id=(\d+)/);
                    if (m) {
                        group_id = m[1];
                        //link = $(this).children('td').eq(1).children('span').eq(0).children('a').eq(0);
                        link = $(this).children('td').eq(1).find('span:first a:first').eq(0);
                        m = link.attr('href').match(/torrents\.php\?action=download&id=(\d+)/);
                        if (m) torrent_id = m[1];
                    }
                    if (!m) {
                        status.contents().append('<div><span style="color: red;">Failed:</span> ' + $(this).children('td').eq(1).text() + '</div>');
                        z(); //purposely error out
                    }
                }


                /* Save in cache */
                if (group_id && torrent_id) {
                    // we are saving a type of "snatched" but when applying that class we have to apply it as "tm32p_snatched" due to a 32pag.es having it's own .snatched style now
                    if (!d.torrents[torrent_id] ||
                        (type != 'seeding' && d.torrents[torrent_id].ty != type && !(type != 'uploaded' && d.torrents[torrent_id].ty == 'uploaded')) || // we have issues if you've snatched a torrent you uploaded, so uploaded takes precendence
                        (type == 'seeding' && !d.torrents[torrent_id].sd)) {
                        var reg = $(this).text().match(/(.*)(vol).*/);
                        //                  if (!reg)
                        //                      reg = $(this).text().match(\s+/.*\s]\s+(.+)\s-?/);
                        var nm = jQuery.trim(reg[1]);
                        //trying alternate method
                        //log($(this).clone().children('span, div, strong').remove().end().text());
                        //var nm = jQuery.trim($(this).clone().children('span, div, strong').remove().end().text().match(/(.+)\s(\[|-)/)[1]);
                        d.groups[group_id] = {
                            nm: nm.replace(/"/g, "'")
                        };
                        if (type == 'seeding') { /* Special case seeding */
                            if (d.torrents[torrent_id]) {
                                d.torrents[torrent_id].sd = 1;
                                if (d.torrents[torrent_id].ty == 'leeching') // Fix one off case where you snatched something you already had downloaded.  Which doesn't show up as a snatch in 32p, so gets stuck leeching.
                                    d.torrents[torrent_id].ty = 'snatched';
                            } else {
                                d.torrents[torrent_id] = {
                                    ty: 'seeding',
                                    sd: 1
                                };
                            }
                        } else {
                            if (d.torrents[torrent_id])
                                d.torrents[torrent_id].ty = type;
                            else
                                d.torrents[torrent_id] = {
                                    ty: type,
                                    sd: 0
                                };
                        }
                        //log ("adding:" + nm + " with group_id="+group_id+", torrent_id="+torrent_id);
                        found += 1;
                    }
                }
            });

            if (found === 0) return 0;

            snatch_cache.serialize();
            return found;
        }

        function scan_bookmark_page(doc) {
            //log ('scanning bookmark page');
            var torrent_table = $(doc).find('#torrent_table').eq(0);
            if (torrent_table.length === 0) return 0;
            var found = 0;

            bookmark_cache.clear(); // makes sense not to save bookmarks because they get added/removed a lot and it's just one page
            var b = bookmark_cache.unserialize();
            torrent_table.find('tr.group.discog').each(function(i) {
                /* Find group and torrent ID */
                var group_id;

                var link = $(this).find('strong a:last').eq(0);
                var m = link.attr('href').match(/torrents\.php\?id=(\d+)/);
                if (m) {
                    group_id = m[1];
                    b.groups[group_id] = 1;
                    found++;
                }
                //log (found + ". group_id:" + group_id + " - " + link.text());
            });
            torrent_table.find('tr.torrent').each(function(i) { // single, non-music torrents show up not in a group
                /* Find group and torrent ID */
                var group_id;

                var link = $(this).find('strong a:last').eq(0);
                var m = link.attr('href').match(/torrents\.php\?id=(\d+)/);
                if (m) {
                    group_id = m[1];
                    b.groups[group_id] = 1;
                    found++;
                }
                //log (found + ". group_id:" + group_id + " - " + link.text());
            });
            bookmark_cache.serialize();
            return found;
        }


        function parse_json_api(getType, page_cb, finish_cb, forced_full) {
            var type = getType;
            var lastCrit = 0;
            var found = 0;
            var page = 1;

            //            console.debug("Forced_full: " + forced_full)
            if (forced_full !== 0) {
                lastCrit = 0;
                lastCrits[getType] = lastCrit;
            } else {
                lastCrit = lastCrits[getType];
            }
            //            console.debug("For type: " + getType + " starting at: " + lastCrit);
            var tmpVarname = "crit_" + getType;
            GM_setLSValue(tmpVarname, lastCrit);

            function request_url() {
                if (type == 'bookmark')
                    return {
                        url: '/ajax.php',
                        data: {
                            action: "bookmarks",
                            type: 'torrents'
                        },
                        dataType: 'json',
                        success: scan_bookmark_data,
                        error: error_handler
                    };
                else
                    return {
                        url: '/ajax.php',
                        data: {
                            action: 'torrentstats',
                            type: getType,
                            crit: lastCrit
                        },
                        dataType: 'json',
                        success: scan_ajax_data,
                        error: error_handler
                    };
            }

            function error_handler(jqXHR, textStatus, errorThrown) {
                status.contents().append('<div><span style="color: red;">Error:</span> Unable to fetch ' + type + 's (' + textStatus + ')</div>');
                status.show();
                finish_cb(found);
            }

            function get_next_page() {
                var uo = request_url();
                var req = {
                    url: uo['url'],
                    data: uo['data'],
                    dataType: uo['dataType'],
                    method: 'GET',
                    success: uo['success'],
                    error: uo['error']
                };
                v32p_proxy.get(req);
            }

            function scan_bookmark_data(data) {
                bookmark_cache.clear(); // we don't need to save the old bookmarks
                var b = bookmark_cache.unserialize();
                jQuery.each(data.response.bookmarks, function(key, val) {
                    b.groups[val.id] = 1;
                    //log("id:"+ val.id + " - name:" + val.name);
                });
                finish_cb(type, data.response.bookmarks.length);
                bookmark_cache.serialize();
            }

            function scan_ajax_data(data) {
                var num = data.count;
                var i;
                var d = snatch_cache.unserialize();
                for (i = 0; i < num; ++i) {
                    var rec = data.results[i];
                    var torrentId = rec.torrentId;
                    var groupId = rec.groupId;
                    if ((!d.torrents[torrentId]) || (getType != 'seeding' && d.torrents[torrentId].ty != getType && !(getType != 'uploaded' && d.torrents[torrentId].ty == 'uploaded'))) {
                        d.groups[groupId] = {
                            nm: rec.groupName
                        };
                        if (getType == 'seeding') {
                            if (d.torrents[torrentId]) {
                                d.torrents[torrentId].sd = 1;
                                if (d.torrents[torrentId].ty == 'leeching') {
                                    d.torrents[torrentId].ty = 'snatched';
                                }
                            } else {

                                d.torrents[torrentId] = {
                                    ty: 'seeding',
                                    sd: 1
                                };
                            }
                        } else {
                            if (d.torrents[torrentId]) {
                                d.torrents[torrentId].ty = getType;
                            } else {
                                d.torrents[torrentId] = {
                                    ty: getType,
                                    sd: 0
                                };
                            }
                        }

                    }
                }
                snatch_cache.serialize();
                lastCrit = data.newcrit;
                lastCrits[getType] = lastCrit;
                tmpVarname = "crit_" + getType;
                GM_setLSValue(tmpVarname, lastCrit);
                found += num;
                page++;
                //        console.log(data);
                if (data.continue) {
                    page_cb(getType, page, get_next_page);
                } else {
                    //                    console.debug("Finished with " + getType);
                    finish_cb(getType, found);
                }
                return;
            }

            get_next_page();

        }
        /* Mark all links to torrents that are snatched/uploaded/leeching/seeding/bookmarked */
        function mark_snatched_links() {
            var d = snatch_cache.unserialize();
            var b = bookmark_cache.unserialize();

            if (/32pag\.es\/index\.php/.test(document.URL)) // No need to run on main page and this will keep poster list from being marked
                return true;

            /* Go through all links */
            $('#content a').each(function(i) {

                var href = $(this).attr('href');
                if (href) {
                    var title = $(this).attr('oldtitle');
                    if (title) {
                        if (!/View\ Torrent/.test(title)) // Skip anything that has a title, like ED, PL, etc, but still show with title View Torrent as seen on My Uploads, View Snatched, etc
                            return true;
                    }
                    var group_id = null;
                    var torrent_id = null;

                    /* Find and mark links to snatched torrents */
                    var m = href.match(/torrents\.php\?id=(\d+)&torrentid=(\d+)/);
                    if (m) {
                        group_id = m[1];
                        torrent_id = m[2];
                    } else {
                        m = href.match(/torrents\.php\?torrentid=(\d+)/);
                        if (m) {
                            torrent_id = m[1];
                        } else {
                            m = href.match(/torrents\.php\?id=(\d+)/);
                            if (m) group_id = m[1];
                        }
                    }

                    /* Add classes */
                    if (group_id && d.groups[group_id] &&
                        (!torrent_id || !$(this).parent().parent().is('.group_torrent')) && !$(this).is('.post_id')) {
                        $(this).addClass('group_snatched');
                    }
                    if (group_id && b.groups[group_id] && !(/32pag\.es\/bookmarks\.php/.test(document.URL)) &&
                        !(/32pag\.es\/user\.php/.test(document.URL)) &&
                        (!torrent_id || !$(this).parent().parent().is('.group_torrent')) && !$(this).is('.post_id')) {
                        $(this).addClass('tm32p_bookmark');
                    }
                    if (torrent_id && d.torrents[torrent_id]) {
                        if (d.torrents[torrent_id].ty == 'snatched')
                            $(this).addClass('tm32p_snatched'); // we can't use .snatched anymore because what has now added it's own .snatched class
                        else if (d.torrents[torrent_id].ty == 'uploaded')
                            $(this).addClass('tm32p_uploaded');
                        else if (d.torrents[torrent_id].ty == 'leeching')
                            $(this).addClass('tm32p_leeching');
                        if (d.torrents[torrent_id].sd) {
                            if (d.torrents[torrent_id].ty != 'uploaded')
                                $(this).addClass('tm32p_seeding tm32p_snatched'); // we're really just marking seeding here, but you can't seed if you haven't snatched so adding that class as well
                            else
                                $(this).addClass('tm32p_seeding');
                        }
                    }

                    /* Change text if text is url */
                    if (('/' + $(this).text()) == $(this).attr('href') && group_id && d.groups[group_id] && d.groups[group_id].nm) {
                        $(this).text(d.groups[group_id].nm);
                    }
                }
            });

            /* Mark links on album page in torrent table */
            if (/32pag\.es\/torrents\.php/.test(document.URL)) {
                /* Parse search */
                var search = {};
                var search_list = document.location.search.substring(1).split('&');
                for (var i = 0; i < search_list.length; i++) {
                    var pair = search_list[i].split('=');
                    search[pair[0]] = pair[1];
                }

                if (search.id) {
                    /* Album page */
                    $('#content .torrent_table:first tr.group_torrent').each(function(i) {
                        /* Find torrent id */
                        var torrent_id;
                        $(this).find('td:first span:first a').each(function(i) {
                            var href = $(this).attr('href');
                            if (href) {
                                var m = href.match(/torrents\.php\?torrentid=(\d+)/);
                                if (m) {
                                    // the permalink automatically gets the style applied to it, so we need to remove it here and then manually add it to the text below
                                    torrent_id = m[1];
                                    $(this).removeClass('group_snatched tm32p_snatched tm32p_uploaded tm32p_leeching tm32p_seeding');
                                    return false;
                                }
                            }
                        });

                        if (torrent_id && d.torrents[torrent_id]) {
                            var link = $(this).find('td:first a:last');
                            if (d.torrents[torrent_id].ty == 'snatched')
                                link.addClass('tm32p_snatched'); // we can't use .snatched anymore because what has now added it's own .snatched class
                            else if (d.torrents[torrent_id].ty == 'uploaded')
                                link.addClass('tm32p_uploaded');
                            else if (d.torrents[torrent_id].ty == 'leeching')
                                link.addClass('tm32p_leeching');
                            if (d.torrents[torrent_id].sd) {
                                if (d.torrents[torrent_id].ty != 'uploaded')
                                    link.addClass('tm32p_seeding tm32p_snatched'); // we're really just marking seeding here, but you can't seed if you haven't snatched so setting that class too
                                else
                                    link.addClass('tm32p_seeding');
                            }
                        }
                    });
                }
            }

            /* Show bookmark link on bookmarked album page */
            if (/32pag\.es\/torrents\.php\?id/.test(document.URL)) {
                var albumName = $('#content > .thin > .header > h2 > span').eq(0);
                if (albumName) {
                    var m = document.URL.match(/torrents\.php\?id=(\d+)/);
                    if (m) {
                        group_id = m[1];
                        if (b.groups[group_id])
                            albumName.addClass('tm32p_bookmark');
                    }
                }

                /* show mark/unmark snatched on album page */
                if ($("a.add_bookmark").length && !$("#mark_snatched").length) {
                    if (d.groups[group_id])
                        mark_snatched = $('<a href="#" id="mark_snatched" class="brackets">Unmark Snatched</a>');
                    else
                        mark_snatched = $('<a href="#" id="mark_snatched" class="brackets">Mark Snatched</a>');

                    mark_snatched.on("click", function() {
                        if (d.groups[group_id]) {
                            delete d.groups[group_id];
                            mark_snatched.text("Mark Snatched");
                        } else {
                            d.groups[group_id] = {
                                nm: albumName.text().replace(/\"/g, "'")
                            };
                            mark_snatched.text("Unmark Snatched");
                        }
                        snatch_cache.serialize();
                    });
                    mark_snatched.insertAfter(".add_bookmark");
                    spacing = $('<b> </b>'); // just used to add spacing
                    spacing.insertAfter(".add_bookmark");
                }

            }
        }

        /* Mark torrent as leeching when download link is clicked */
        function mark_download_links() {
            $('#content a[href*="torrents.php?action=download&id="]').each(function(i) {
                var href = $(this).attr('href');
                if (href) {
                    /* Find download links */
                    var m = href.match(/torrents\.php\?action=download&id=(\d+)/);
                    if (m) {
                        var torrent_id = m[1];
                        $(this).click(function(event) {
                            var d = snatch_cache.unserialize();
                            d.torrents[torrent_id] = {
                                ty: 'leeching',
                                sd: 0
                            };
                            snatch_cache.serialize();
                            mark_snatched_links();
                        });
                    }
                }
            });
        }

        function mark_bookmark_links() {
            $('#content').find('a').each(function(i) {
                var id = $(this).attr('id');
                if (id) {
                    /* Find download links */
                    var m = id.match(/bookmarklink_torrent_(\d+)/);
                    if (m) {
                        //log (m);
                        var group_id = m[1];
                        var b = null;
                        $(this).click(function(event) {
                            if (!/remove/i.test($(this).text()) && !/unbookmark/i.test($(this).text())) {
                                b = bookmark_cache.unserialize();
                                b.groups[group_id] = 1;
                                bookmark_cache.serialize();
                                mark_snatched_links();
                            } else {
                                b = bookmark_cache.unserialize();
                                delete b.groups[group_id];
                                bookmark_cache.serialize();
                                $('#content').find('a.tm32p_bookmark').each(function(i) {
                                    var href = $(this).attr('href');
                                    torrentString = 'torrents.php?id=' + group_id;
                                    if (href && href == 'torrents.php?id=' + group_id) {
                                        $(this).removeClass('tm32p_bookmark');
                                    }
                                });
                                $('#content > .thin > .header > h2 > span').eq(0).removeClass('tm32p_bookmark');
                            }
                        });
                    }
                }
            });
        }

        /* This function was hacked from a generic one and converted to jQuery to work better with 32pag.es Snatched.
       If you'd like to see that version it's here: http://userscripts.org/scripts/show/68559 */
        function doGMMenu() {
            // jQuery Version
            if (!MenuCommandArray.length) {
                return;
            }
            var mdiv = $('<div></div>');
            var mEntry = null;
            $.each(MenuCommandArray, function(i, value) {
                if (i + 1 < MenuCommandArray.length)
                    mEntry = $('<span><a href="#" id="' + MenuCommandArray[i][2] + '">' + MenuCommandArray[i][0] + '</a>\u00A0\u00A0|\u00A0\u00A0</span>');
                else
                    mEntry = $('<a href="#" id="' + MenuCommandArray[i][2] + '">' + MenuCommandArray[i][0] + '</a>');
                mEntry.click(function() {
                    MenuCommandArray[i][1](arguments[0]);
                    var e = arguments[0];
                    e.stopPropagation();
                    return false;
                });
                mdiv.append(mEntry);
            });
            status.contents().append(mdiv);
        }

        var full_update = 0;
        var scan_status = null;
        var found = null;

        /* Scan current page */
        if (/32pag\.es\/torrents\.php/.test(document.URL)) {
            /* Parse search */
            var search = {};
            var search_list = document.location.search.substring(1).split('&');
            for (var i = 0; i < search_list.length; i++) {
                var pair = search_list[i].split("=");
                search[pair[0]] = pair[1];
            }

            full_update = GM_getLSValue('full_update', '0');

            if ((search.type == 'snatched' || search.type == 'uploaded' || search.type == 'seeding' || search.type == 'leeching') && search.userid == v32p_id && full_update === 0) {
                scan_status = $('<div>Scanning current page... <span></span></div>');
                status.contents().append(scan_status);
                status.show();

                /* Scan current page */
                found = scan_torrent_page(document, search.type);
                scan_status.children('span').text('Done (' + ((found > 0) ? (found + ' updates found') : 'no updates found') + ')');
                status.show(5000);
            }
        }
        if (/32pag\.es\/bookmarks\.php(?!.action=edit)/i.test(document.URL)) {
            scan_status = $('<div>Scanning current page... <span></span></div>');
            status.contents().append(scan_status);
            status.show();

            bookmark_cache.clear();
            found = scan_bookmark_page(document);

            scan_status.children('span').text(((found > 0) ? (found + ' bookmarks found') : 'no bookmarks found'));
            status.show(5000);
        }

        /* Mark links */
        mark_download_links();
        mark_bookmark_links();
        mark_snatched_links();

        /*******************************/
        /*** AUTO-UPDATE STARTS HERE ***/
        /*******************************/
        var now = new Date();
        var just_updated = 0;
        var last_update = parseInt(GM_getLSValue('last_update', '0'));
        var next_update = last_update + global_updateFreq * 60 * 1000;
        var forced_full = GM_getLSValue('force_all', '0');
        full_update = GM_getLSValue('full_update', '0');

        var update_status = {
            snatched: $('<div>Updating snatched: <span>Initializing...</span></div>'),
            uploaded: $('<div>Updating uploaded: <span>Initializing...</span></div>'),
            leeching: $('<div>Updating leeching: <span>Initializing...</span></div>'),
            seeding: $('<div>Updating seeding: <span>Initializing...</span></div>'),
            bookmark: $('<div>Updating bookmarks: <span>Initializing...</span></div>'),
        };
        if (next_update < now.getTime() && just_updated != 1) {
            GM_setLSValue('last_update', now.getTime().toString());
            var fullUpdateFinished = GM_getLSValue('fullUpdateStarted', '0');
            var jobs = 5;
            var total_found = {};
            var type = null;

            /* Show auto update status */
            last_update = 0;
            if (last_update === 0) {
                update_status = {
                    snatched: $('<div>Updating snatched: <span>Initializing...</span></div>'),
                    uploaded: $('<div>Updating uploaded: <span>Initializing...</span></div>'),
                    leeching: $('<div>Updating leeching: <span>Initializing...</span></div>'),
                    seeding: $('<div>Updating seeding: <span>Initializing...</span></div>'),
                    bookmark: $('<div>Updating bookmarks: <span>Initializing...</span></div>'),
                };
                for (type in update_status) status.contents().append(update_status[type]);
                status.show();
            }

            function scan_page_handler(type, page, callback) {
                if (last_update === 0) {
                    update_status[type].children('span').text('Page ' + page + '...');
                    status.show();
                }
                callback();
            }

            function scan_finished_handler(type, found) {
                if (last_update === 0) {
                    if (type != 'bookmark')
                        update_status[type].children('span').text('Done (' + ((found > 0) ? (found + ' updates found') : 'no updates found') + ')');
                    else
                        update_status[type].children('span').text('Done (' + ((found > 0) ? (found + ' bookmarks found') : 'no bookmarks found') + ')');
                }

                jobs -= 1;
                total_found[type] = found;

                if (jobs === 0) {
                    mark_snatched_links();
                    if (last_update === 0) {
                        var total = [];
                        for (type in total_found)
                            if (total_found[type] > 0)
                                total.push(type + ': ' + total_found[type]);
                        status.contents().append('<div>Auto update done</div>');
                        GM_deleteLSValue('fullUpdateStarted');
                        status.show(5000);
                    }
                }
            }

            /* Rescan all types of torrent lists */
            if (fullUpdateFinished == 1)
                forced_full = 1;

            parse_json_api('snatched', scan_page_handler, scan_finished_handler, forced_full);
            parse_json_api('uploaded', scan_page_handler, scan_finished_handler, forced_full);
            parse_json_api('leeching', scan_page_handler, scan_finished_handler, 1);
            parse_json_api('seeding', scan_page_handler, scan_finished_handler, 1);
            parse_json_api('bookmark', scan_page_handler, scan_finished_handler, 1);

            if (forced_full !== 0) {
                forced_full = 0;
                GM_setLSValue('force_all', '0');
            }
        }
        /**********************************/
        /*** SCRIPT EXECUTION ENDS HERE ***/
        /**********************************/

        /*** Functions for Chrome ***/
        function quoteString(string) {
            if (string.match(_escapeable)) {
                return '"' + string.replace(_escapeable, function(a) {
                    var c = _meta[a];
                    //log(c + " - " + string);  // this was spitting out a bunch of logged stuff whenever there was a '\' in the torrent name
                    if (typeof c === 'string') return c;
                    c = a.charCodeAt();
                    return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
                }) + '"';
            }
            return '"' + string + '"';
        }
        var _escapeable = /["\\\x00-\x1f\x7f-\x9f]/g;
        var _meta = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        };
        function GM_deleteLSValue(key) {
            window.localStorage.removeItem(key);
        }
    } /* main() */

    function GM_main($) {
        main();
    }

    function add_jQuery(callbackFn, jqVersionStr) {
        var jqVersion = jqVersionStr || "1.8.2";
        var D = document;
        var targ = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
        var scriptNode = D.createElement('script');
        scriptNode.src = 'http://ajax.googleapis.com/ajax/libs/jquery/' + jqVersion + '/jquery.min.js';
        scriptNode.addEventListener("load", function() {
            var scriptNode = D.createElement("script");
            scriptNode.textContent =
                'var gm_jQuery  = jQuery.noConflict (true);\n' + '(' + callbackFn.toString() + ')(gm_jQuery);';
            targ.appendChild(scriptNode);
        }, false);
        targ.appendChild(scriptNode);
    }


    if (typeof jQuery === "function") {
        GM_main(jQuery);
    } else {
        add_jQuery(GM_main, "1.8.2");
    }
})();