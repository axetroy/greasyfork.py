// ==UserScript==
// @name			DSA Debug Tools
// @namespace		COMDSPDSA
// @version			4
// @description		Tools for debugging DSA
// @author			Dan Overlander
// @include         http://sales.dell.com/*
// @include	        *olqa.preol.dell.com*
// @include	        *http://localhost:36865*
// @include			*http://localhost:36158*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require         https://greasyfork.org/scripts/23115-tampermonkey-support-library/code/Tampermonkey%20Support%20Library.js
// @require		    https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min.js
// @require         https://greasyfork.org/scripts/40055-libraryjquerygrowl/code/libraryJQueryGrowl.js
// ==/UserScript==

// Since v03: Modernized trigger elements
// Since v02: Tweaks
// Since v01: unversioned tm library requirement.
// Since v00: init

/*
 * tm is an object included via @require from DorkForce's Tampermonkey Assist script
 */

(function() {
    'use strict';

    var TIMEOUT = 750,
		global = {
            scriptName: 'DSA Debug Tools',
            triggerElement: '.icon-ui-dell',
            areClassesAdded: false,
            areAlertsAdded: false,
            isResetting: undefined
		},
		page = {
			initialize: function () {
				setTimeout(function () {
					page.addClasses();
                    page.setTamperIcon();
                    page.addErrorAlerts();
				}, TIMEOUT);
			},
			addClasses: function () {
				if (!global.areClassesAdded) {
					global.areClassesAdded = true;

                    //*-jQuery-Growl-*-Copyright-2015-Kevin-Sylvestre-*-1.3.5-*/-
                    tm.addGlobalStyle('.ontop, #growls-default, #growls-tl, #growls-tr, #growls-bl, #growls-br, #growls-tc, #growls-bc, #growls-cc, #growls-cl, #growls-cr {z-index: 9999999999; position: fixed; }');
                    tm.addGlobalStyle('#growls-default {top: 10px;right: 10px; }');
                    tm.addGlobalStyle('#growls-tl {top: 10px;left: 10px; }');
                    tm.addGlobalStyle('#growls-tr {top: 10px;right: 10px; }');
                    tm.addGlobalStyle('#growls-bl {bottom: 10px;left: 10px; }');
                    tm.addGlobalStyle('#growls-br {bottom: 10px;right: 10px; }');
                    tm.addGlobalStyle('#growls-tc {top: 10px;right: 10px;left: 10px; }');
                    tm.addGlobalStyle('#growls-bc {bottom: 10px;right: 10px;left: 10px; }');
                    tm.addGlobalStyle('#growls-cc {top: 50%;left: 50%;margin-left: -125px; }');
                    tm.addGlobalStyle('#growls-cl {top: 50%;left: 10px; }');
                    tm.addGlobalStyle('#growls-cr {top: 50%;right: 10px; }');
                    tm.addGlobalStyle('#growls-tc .growl, #growls-bc .growl {margin-left: auto;margin-right: auto; }');
                    tm.addGlobalStyle('.growl {opacity: 0.8;filter: alpha(opacity=80);position: relative;border-radius: 4px;-webkit-transition: all 0.4s ease-in-out;-moz-transition: all 0.4s ease-in-out;transition: all 0.4s ease-in-out; }');
                    tm.addGlobalStyle('.growl.growl-incoming {opacity: 0;filter: alpha(opacity=0); }');
                    tm.addGlobalStyle('.growl.growl-outgoing {opacity: 0;filter: alpha(opacity=0); }');
                    tm.addGlobalStyle('.growl.growl-small {width: 200px;padding: 5px;margin: 5px; }');
                    tm.addGlobalStyle('.growl.growl-medium {width: 250px;padding: 10px;margin: 10px; }');
                    tm.addGlobalStyle('.growl.growl-large {width: 300px;padding: 15px;margin: 15px; }');
                    tm.addGlobalStyle('.growl.growl-default {color: #FFF;background: #7f8c8d; }');
                    tm.addGlobalStyle('.growl.growl-error {color: #FFF;background: #C0392B; }');
                    tm.addGlobalStyle('.growl.growl-notice {color: #FFF;background: #2ECC71; }');
                    tm.addGlobalStyle('.growl.growl-warning {color: #FFF;background: #F39C12; }');
                    tm.addGlobalStyle('.growl .growl-close {cursor: pointer;float: right;font-size: 14px;line-height: 18px;font-weight: normal;font-family: helvetica, verdana, sans-serif; }');
                    tm.addGlobalStyle('.growl .growl-title {font-size: 18px;line-height: 24px; }');
                    tm.addGlobalStyle('.growl .growl-message {font-size: 12px;line-height: 16px; }');
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
            addErrorAlerts: function() {
                if (!global.areAlertsAdded) {
                    global.areAlertsAdded = true;

                    window.onerror=function(errr){
                        var copyThis = 'Error Occurred:\n\n' + errr.message + '\n\n In File:\n' + errr.filename + '\nLine:' + errr.lineno + '\nCol:' + errr.colno;
                        $.growl.error({
                            message: errr.message,
                            size: 'medium'
                        });
                        return true;
                    };
                }
            }
		};

    /*
     * Global functions
     */

    function initScript () {
        tm.getContainer({
            'el': global.triggerElement,
            'max': 100,
            'spd': 1000
        }).then(function($container){
            page.initialize();
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

})();