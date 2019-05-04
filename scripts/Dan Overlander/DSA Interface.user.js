// ==UserScript==
// @name			DSA Interface
// @namespace		COMDSPDSA
// @version			19.2
// @description		Personal tweaks for localhost
// @author			Dan Overlander
// @include         http://sales.dell.com/*
// @include	        *preol.dell.com*
// @include	        *http://localhost:36865*
// @include			*http://localhost:36158*
// @include			*localhost.dell.com:5000*
// @include			*online-sales-ux-*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require         https://greasyfork.org/scripts/23115-tampermonkey-support-library/code/Tampermonkey%20Support%20Library.js
// @require		    https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min.js
// @grant           GM_setValue
// @grant           GM_getValue
// ==/UserScript==

// Since v19.1: Enhanced homepage link algorhythm
// Since v19: Bug Fixes. Colored favorites in partner favorites.
// Since v18: Renamed Import "Emailed Cart" to Import "eQuote" in main navigation. Added Partner UI homepage tweaks.
// Sinve v17: Tweaked app-controls to make them appear more centered.
// Since v16: Included the customer bar resizing css within the preferences-regulated gate. Tweaked it.
// Since v15: added hiding the walkme stuff to the options panel (apparently I did not know it was controlled via profile, first). Reduced timeout; feels more pleasant, but must test in case it kills performance. Adjusted config page title compressed Y value
// Since v14: bugfix: Adjusted customer-ribbon button y-position on orderReview and orderDetails. Created localStorage prefs
// Since v13: Fixed a smry-ctnr CSS bug
// Since v12: Modernized trigger elements. fixed the customer ribbon compression
// Since v11: Hid the walkme stuff
// Since v10: Re-added group alternating background colors
// Since v09: activates compression on scroll
// Since v08: Renamed
// Since v07: Includes G1, Prod
// Since v06: Tweaks to homepage
// Since v05: Fixes (again) the create-quote icon
//            Adds customer-dashboard icon
// Since v04: Added more of my own customers to the highlight-in-red list
// Since v03: Tweaking homepage column title area
// Since v02: updating tm support library. Changing the elements the script waits for on initialization
// Since v01: homepage search fields right-aligned in title rows
//          : doesn't swap col-4 for col-6 except on homepage
//          : COMMENTED OUT : customer ribbon compressed

/*
 * tm is an object included via @require from DorkForce's Tampermonkey Assist script
 */

(function() {
    'use strict';

    var TIMEOUT = 250,
        global = {
            scriptName: 'DSA Interface',
            triggerElements: ['.icon-ui-dell', '.dds__container'],
            isMouseMoved: false,
            areClassesAdded: false,
            partnerClassesAdded: false,
            areAlertsAdded: false,
            isResetting: undefined,
            hpCompressed: false,
            prefs: GM_getValue('uiPrefs') != null ? JSON.parse(GM_getValue('uiPrefs')) : {
                partnerFavorites: '3001013344819, 3001013337136, 3001013340007',
                hiliteInYourCustomers: '[04], [08], RETAIL',
                hiliteColor: 'red',
                compressUi: 'false',
                hideWalkme: 'false'
            }
        },
		page = {
			initialize: function () {
				setTimeout(function () {
					page.addClasses();
                    page.setTamperIcon();
					page.addHighlights();
                    page.addMenuLinks();
                    page.compression();
                    page.alternatingColors();
                    page.adjustPartnerUI();
				}, TIMEOUT);
			},
			addClasses: function () {
				if (!global.areClassesAdded) {
					global.areClassesAdded = true;

                    tm.addGlobalStyle('.cust-list-blk:hover {background-color: cornsilk}');
                    tm.addGlobalStyle('.home-sections .dotted {margin-top:3px; margin-bottom:3px;');
                    tm.addGlobalStyle('.home-sections .actv-block {padding-bottom:0;');
                    tm.addGlobalStyle('.singleActivity:hover {background-color: cornsilk;}');

                    tm.addGlobalStyle('.usertag {background-color: greenyellow;}');

                    // homepage column headers
                    tm.addGlobalStyle('.home-col-hdr h3 { font-size:1.3em; font-weight:bold; padding-top:3px; }');

                    // homepage search section
                    tm.addGlobalStyle('#home_search_container { margin-bottom: 0px; }');
                    tm.addGlobalStyle('#home_search_value { height: 30px; }');
                    tm.addGlobalStyle('#duplicate-po h3 { float: left; width: 200px; }');
                    tm.addGlobalStyle('#search_type_label { float: left; width: 110px; position: relative; top: 5px !important; }');
                    tm.addGlobalStyle('#search { float: left; width: 480px; padding: 0px !important; margin: 0px !important; }');
                    tm.addGlobalStyle('#search .input-search { position: initial !important; width: 100% !important; }');

                    // customer ribbon
                    if (global.prefs.compressUi === 'true') {
                        tm.addGlobalStyle('.app-nav {margin-top: 0;}');
                        tm.addGlobalStyle('.app-nav .app-title { padding-top:0; font-size:16px; line-height:1.1; }');
                        tm.addGlobalStyle('.current-business-unit { position:relative; top:-7px; }');
                    }

                    // hide Walk Me Through crap
                    if (global.prefs.hideWalkme === 'true') {
                        tm.addGlobalStyle('#walkme-player, .walkme-custom-icon-outer-div { display: none !important; }');
                    }
                }
			},
			setTamperIcon: function () {
                // Add Tampermonkey Icon with label to identify this script
                if($('.tamperlabel').length > 0) {
                    if ($('.tamperlabel').prop('title').indexOf(global.scriptName) === -1) {
                        $('.tamperlabel').prop('title', $('.tamperlabel').prop('title') + ' | ' + global.scriptName);
                    }
                } else {
                    $('body').append('<span class="icon icon-tfs-build-status-header icon-ui-dell tamperlabel" title="Tampermonkey scripts: ' + global.scriptName + '"></span>');
                }
            },
            adjustPartnerUI: function () {
                if ($('.channel-header').length > 0 && !global.partnerClassesAdded) {
                    global.partnerClassesAdded = true;
                    tm.addGlobalStyle('.popupDetailWindow { position:fixed !important; }');
                }

                // hide the default popup Close because for some weird reason it's not working
                $('.popupDetailContent.fingery').hide();

                // localize vars
                var faves = global.prefs.partnerFavorites != null ? global.prefs.partnerFavorites.replace(/ */g, '').split(',') : [];

                // modify logo
                var getUrl = window.location;
                var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
                console.log(baseUrl);
                if (baseUrl.indexOf('online-sales') < 0) {
                    baseUrl = 'https://localhost.dell.com:5000/';
                }
                $('.dds__msthd-dell-icon').prop('href', baseUrl).css('color', 'yellow');

                // add favorites
                if ($('#myQuotes').length === 0) {
                    $('#DSAHomePage').append('<H4 id="myQuotes">My Favorite Quotes</H4>');
                    _.each(faves, function(fave) {
                        $('#DSAHomePage').append('<div class="aFavoriteQuote">' +
                                                 '    <a href="http://g4vmoscux01.olqa.preol.dell.com/solutions/Configurator/api/QuoteCheckout/v1/amer/CheckUserHasQuoteCheckoutAccess/' + fave + '/1/oscpartner1%40fourkites.com" target="blank">Verify</a>' +
                                                 '     - ' +
                                                 '    <a href="http://g4vmcomux01.olqa.preol.dell.com/#/quote/details/QuoteNumber/' + fave + '" target="blank">SIT</a>' +
                                                 '     - ' +
                                                 '    <a href="/quotes/' + fave + '/1">' + fave + '.1</a>' +
                                                 '</div>');
                    });
                }
            },
            addHighlights: function () {
                var hiArray = global.prefs.hiliteInYourCustomers != null ? global.prefs.hiliteInYourCustomers.replace(/ */g, '').split(','): [];
                _.each(hiArray, function(hilite) {
                    $('.cust-list-blk a:contains("' + hilite + '")').css('color', global.prefs.hiliteColor);
                    $('.aFavoriteQuote a:contains("' + hilite + '")').css('color', global.prefs.hiliteColor);
                });
            },
            compression: function () {
                if (!global.hpCompressed && global.prefs.compressUi === 'true') {
                    //global.hpCompressed = true;

                    // config page floating title
                    $('.fixed-position-container').css({'top': '106px'});

                    // Column: Your Customers
                    $('.cust-list-blk').css({'height': '22px', 'font-size': '.8em', 'overflow': 'hidden'});
                    $('.icon-small-favorite-100').css({'height': '9px', 'width': '9px', 'background-position': '-287px -46px'});
                    $('.icon-small-favorite-0').css({'height': '9px', 'width': '9px', 'background-position': '-286px -137px'});
                    $('.remove-record').css({'top': '-3px', 'position': 'relative', 'height': '20px'});
                    $('.cust-list-blk a:contains(Create Quote)').css({'position': 'relative', 'float': 'right', 'top': '-13px'}).html('<span class="remove-record leQuote" style="background-position:-46px -144px;">&nbsp;</span>');
                    $('.cust-list-blk a:contains(View Dashboard)').css({'position': 'relative', 'float': 'right', 'top': '-13px'}).html('<span class="remove-record leDashboard" style="background-position:-47px -288px;">&nbsp;</span>');
                    $('.input-search').prev().hide();
                    $('.input-search').css({'position': 'absolute', 'top': '0', 'left': '56%', 'width': '40%'});
                    $('#yourCustomersSection a').eq(0).prop('innerText', 'All');

                    // recent activity
                    $('#homepageController_recentActivity_h').prop('innerText', 'Recent Activity');
                    $('#homepageController_recentActivity_h').parent().find('a').eq(0).prop('innerText', 'All');
                    $('.actv-type span:first-child').css('display', 'none');
                    $('.actv-type span:nth-child(2)').css('float', 'right');
                    $('#recentActivity_sortBy').parent().css({'position': 'absolute', 'top': '0', 'left': '57%', 'width': '40%'});

                    // hide last col
                    if($('.remove-record').length > 0) {
                        if ($('#main .col-md-4:nth-child(5)').length > 0) {
                            $('#main .col-md-4:nth-child(5)').remove();
                            $('#main .col-md-4').toggleClass("col-md-4").toggleClass("col-md-6");
                        }
                    }

                    // hide title
                    $('#home_recentActivity').parent().parent().hide();

                    // compress title bar
                    $('.top-nav').css({'padding': '3px 0 0 0'});
                    $('#dellBrandLogo_goHomePage').css({'font-size': '35px', 'height': '35px'});
                    $('.main-nav').css({'min-height': '40px', 'margin-bottom': '10px', 'height': '40px'});
                    $('.view-nav-withoutribbon').css({'margin-top': '30px'});
                    $('.brand-title').css({'line-height': '35px'});
                    $('.content-shell .view-nav').css({'top': '40px'});
                    $('.brand').next().next().css({'position': 'relative', 'top': '-8px'});
                    if($('.remove-record').length === 0) {
                        if($('.view-nav-withoutribbon').length > 0) {
                            $('.content-area').css({'margin-top': '10px'});
                        } else {
                            $('.content-area').css({'margin-top': '80px'}); // customer ribbon = 60px
                        }
                    }

                    // customer ribbon
                    $('.top-nav .container').css({'height': '37px'});
                    $('.content-shell .view-nav').css({'height': '40px', 'min-height': '40px'});
                    if ($('#orderReview_createOrder').length === 0 && $('#orderDetails_moreActions').length === 0) {
                        $('.app-controls').parent().css({'top': '-5px'});
                    } else {
                        $('.app-controls').parent().css({'top': '5px'});
                    }
                    if ($('h2:contains("Service Tag")').length > 0) {
                        $('.app-controls').css({'padding-top': '5px'});
                        if ($('h2:contains("Service Tag Groups")').length > 0) { //whyyyyy
                            $('.app-controls').css({'padding-top': '10px'});
                        }
                    }

                }
            },
            alternatingColors: function () {
                $('.line-group:odd').css('background-color', 'rgba(0, 0, 0, 0.1)');
            },
            addMenuLinks: function() {
                if ($('.uiMenu').length === 0) {
                    $('#menu_importLegacyCart_link').text('eQuote');
                    var pluginLink = '<a class="uiMenu fingery" title="Preferences">DSA Plugin</a>';
                    if ($('#menu_versionToggle').length > 0) {
                        $('#menu_versionToggle').parent().find('ul').eq(3).append('<li>' + pluginLink + '</li>');
                    } else {
                        $('body').prepend('<div style="position:fixed; right:20px; z-index:10;">' + pluginLink + '</div>');
                    }
                    $('.uiMenu').mouseup(function clickIdLink (e) {
                        var modalId = 'myUiPrefs',
                            modalBody = '';
                        _.each(global.prefs, function (value, key) {
                            if (Array.isArray(value) || typeof value === 'string') {
                                modalBody += '    <div class="popupDetailTitle">' + key + '</div><div class="popupDetailContent"><input style="width:100%" id="' + key + '" type="text" value="' + value + '"></input></div>';
                            } else {
                                _.each(value, function (value2, key2) {
                                    modalBody += '    <div class="popupDetailTitle">' + key2 + '</div><div class="popupDetailContent"><input style="width:100%" id="' + key2 + '" type="text" value="' + value2 + '"></input></div>';
                                });
                            }
                        });
                        modalBody += '<div class="popupDetailTitle">&nbsp;</div><div class="popupDetailContent" style="text-align:right;">' +
                            '    <button class="uiSavery">Save</button>' +
                            '</div>';
                        modalBody += '<div class="popupDetailTitle">&nbsp;</div><div class="popupDetailContent" style="text-align:right;">' +
                            '    <button class="uiResetery">Reset</button>' +
                            '</div>';
                        modalBody += '<div class="popupDetailTitle">&nbsp;</div><div class="popupDetailContent" style="text-align:right;">' +
                            '    <button class="uiClosify">Close</button>' +
                            '</div>';
                        tm.showModal(modalId, modalBody);

                        $('.uiSavery').on('click', function() {
                            global.prefs = {
                                partnerFavorites: $('#partnerFavorites').val(),
                                hiliteInYourCustomers: $('#hiliteInYourCustomers').val(),
                                hiliteColor: $('#hiliteColor').val(),
                                compressUi: $('#compressUi').val(),
                                hideWalkme: $('#hideWalkme').val()
                            };
                            GM_setValue('uiPrefs', JSON.stringify(global.prefs));
                            alert('Refresh to see new values.');
                        });
                        $('.uiResetery').on('click', function() {
                            GM_setValue('uiPrefs', null);
                            alert('Refresh to see default values.');
                        });
                        $('.uiClosify').on('click', function() {
                            $('#' + modalId).remove();
                        });
                    });
                }
            }
		};

    /*
     * Global functions
     */

    function initScript () {
        _.each(global.triggerElements, function (trigger) {
            tm.getContainer({
                'el': trigger,
                'max': 100,
                'spd': 1000
            }).then(function($container){
                page.initialize();
            });
        });
    }

    initScript();

    $(document).mousemove(function(e) {
        if (!global.isMouseMoved) {
            global.isMouseMoved = true;
            setTimeout(function() {
                global.isMouseMoved = false;
            }, TIMEOUT * 2);
            initScript();
        }
    });

    window.onresize = function(event) {
        initScript();
    };

    // TODO: verify that this isn't doubling efforts
    $(document).scroll(function() {
        page.compression();
        page.alternatingColors();
    });

})();