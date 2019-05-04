// ==UserScript==
// @name			DSA2018 Global
// @description		Adds global classes and Tampermonkey icon for COMDSPDSA scripts
// @namespace		COMDSPDSA
// @author			Dan Overlander
// @locale          English (EN)
// @license			none
// @version			6
// @include			*/tfs*
// @include			*/localhost*
// @include			*/gitlab*
// @include			*online-sales-ux-*
// @include         http://*/swagger/*
// @include         *preol*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require         https://greasyfork.org/scripts/23115-tampermonkey-support-library/code/Tampermonkey%20Support%20Library.js
// ==/UserScript==

// Since v05: Including Partner
// Since v04: Added Gitlab to inclusions. Added support for fontawesome.
// Since v03: Expanding to include Swagger pages; renamed to DSA2018 Global
// Since v02: Changed CSS on TamperIcon positioning
// Since v01: rename, to semantically include DSA
// Since v00: Initial

(function() {
    'use strict';

    const TIMEOUT = 500;
    var toggle = {
            areClassesAdded: false
        },
        global = {
            triggerElement: '.menu-icon',
            triggerElementDSA: '.icon-ui-dell',
            triggerElementSwagger: '.container',
            triggerElementGitLab: '.navbar',
            scriptName: 'DSA2018 Global',
            animationSpeed: (TIMEOUT/2)
        },
        page = {
            initialize: function () {
                setTimeout(function () {
                    page.addClasses();
                    page.setTamperIcon();
                }, TIMEOUT);
            },
            addClasses: function () {
                if (!toggle.areClassesAdded) {
                    toggle.areClassesAdded = true;

					// styles for modal popup
                    tm.addGlobalStyle('.fingery { cursor: pointer; }');
					tm.addGlobalStyle('.popupDetailWindow	{ position:absolute; z-index: 1008; top:50px; left:50px; width:75%; height:75%; background:white; border:1px solid black; border-radius: 10px; box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75); padding:10px; font-size:1.2em; overflow-y:scroll; }');
					tm.addGlobalStyle('.popupDetailTitle	{ float:left; margin-right:10px; width:15%; margin-bottom:5px; font-weight:bold; clear:both; margin-top:2px; }'); // width:6%; min-width:100px;
					tm.addGlobalStyle('.popupDetailContent	{ float:left; width:80%; line-height:0.9em; font-size:0.9em; margin-top:5px; }');
					tm.addGlobalStyle('.popupDetailContent .work-item-color	{ display:none; }');

                    // tamperlabel
                    tm.addGlobalStyle('.tamperlabel { position:fixed; z-index:999999999; bottom:0px; right:20px; left:unset; width:16px; height:16px; color:MediumTurquoise; }');

                }
            },
            setTamperIcon: function () {
                // Add Tampermonkey Icon with label to identify this script
                if($('.tamperlabel').length > 0) {
                    if ($('.tamperlabel').prop('title').indexOf(global.scriptName) === -1) {
                        $('.tamperlabel').prop('title', $('.tamperlabel').prop('title') + ' | ' + global.scriptName);
                    }
                } else {
                    $('body').append('<span class="icon icon-tfs-build-status-header icon-ui-dell tamperlabel" title="Tampermonkey scripts: ' + global.scriptName + '"><i class="fa fa-battery-three-quarters tamperNewIcon"></i></span>');
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
        tm.getContainer({
            'el': global.triggerElementSwagger,
            'max': 100,
            'spd': 1000
        }).then(function($container){
            page.initialize();
        });
        tm.getContainer({
            'el': global.triggerElementDSA,
            'max': 100,
            'spd': 1000
        }).then(function($container){
            page.initialize();
        });
        tm.getContainer({
            'el': global.triggerElementGitLab,
            'max': 100,
            'spd': 1000
        }).then(function($container){
            page.initialize();
        });
    }
    initScript();

    $(document).mouseup(function(e) {
        initScript();
    });

})();