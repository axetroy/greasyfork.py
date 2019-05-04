// ==UserScript==
// @name			TFS2018 Query
// @description		Enhances Query pages for TFS
// @namespace		COMDSPDSA
// @author			Dan Overlander
// @license			none
// @version			2
// @include			*/tfs/*
// @include			*/tfs2/*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require         https://greasyfork.org/scripts/23115-tampermonkey-support-library/code/Tampermonkey%20Support%20Library.js
// @require		    https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js
// @grant           GM_setValue
// @grant           GM_getValue
// ==/UserScript==

// Sinve v01: Renamed helpery class to script-specific name, to differentiate from other scripts
// Since v00: Initial

(function() {
    'use strict';

    const TIMEOUT = 500;
    var toggle = {
            isMouseMoved: false,
            areClassesAdded: false
        },
        global = {
            triggerElement: '.menu-icon',
            scriptName: 'TFS2018 Query',
            prefs: GM_getValue('queryPrefs') != null ? JSON.parse(GM_getValue('queryPrefs')) : {
                blocking: 'rgba(255,0,0,.1)',
                fontSize: '.8em',
                grid: {
                    sev1: 'red',
                    sev2: '#b26b00',
                    sev3: '#000000',
                    sev4: '#999999'
                },
                dim: 'true',
                dimmables: ['Close', 'Complete', 'Testing', 'Need More Information', 'Rejected']
            }
        },
        page = {
            initialize: function() {
                setTimeout(function () {
                    page.addClasses();
                    page.setTamperIcon();
                    page.enhanceGrid();
                    page.addMenuLinks();
                    page.dimRows();
                }, TIMEOUT);
            },
            addClasses: function() {
                if (!toggle.areClassesAdded) {
                    toggle.areClassesAdded = true;

                    tm.addGlobalStyle('.grid-cell { font-size: ' + global.prefs.fontSize + '; }');

                    tm.addGlobalStyle('.tfs-icon-arrow-help { background-position:-6609px -16px !important; margin-left:2px; }');
                }
            },
            setTamperIcon: function() {
                // Add Tampermonkey Icon with label to identify this script
                if($('.tamperlabel').length > 0) {
                    if ($('.tamperlabel').prop('title').indexOf(global.scriptName) === -1) {
                        $('.tamperlabel').prop('title', $('.tamperlabel').prop('title') + ' | ' + global.scriptName);
                    }
                } else {
                    $('body').append('<span class="icon icon-tfs-build-status-header icon-ui-dell tamperlabel" title="Tampermonkey scripts: ' + global.scriptName + '"></span>');
                }
            },
            enhanceGrid: function() {
                $(".grid-row:contains('Sev 1')").css('color', global.prefs.grid.sev1); $(".grid-row:contains('Sev 1') a").css('color', global.prefs.grid.sev1);
                $(".grid-row:contains('Sev 2')").css('color', global.prefs.grid.sev2); $(".grid-row:contains('Sev 2') a").css('color', global.prefs.grid.sev2);
                $(".grid-row:contains('Sev 3')").css('color', global.prefs.grid.sev3); $(".grid-row:contains('Sev 3') a").css('color', global.prefs.grid.sev3);
                $(".grid-row:contains('Sev 4')").css('color', global.prefs.grid.sev4); $(".grid-row:contains('Sev 4') a").css('color', global.prefs.grid.sev4);

                $(".grid-row > .grid-cell:contains('Yes')").css({'font-weight': 'bold', 'background': 'linear-gradient(rgba(255,255,255,0), ' + global.prefs.blocking});

            },
            addMenuLinks: function() {
                var scrName = global.scriptName.replace(/\s/g, '');
                if ($('.helpFor' + scrName).length === 0) {
                    $('.query-result-grid-toolbar ul').append('<span class="icon icon-tfs-build-status-header tfs-icon-arrow-help fingery helpFor' + scrName + '" title="Preferences" style="float:right;margin-top:10px;"></span>');
                    $('.helpFor' + scrName).mouseup(function clickIdLink (e) {
                        var modalId = 'keyboardKeys',
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
                            '    <button class="savery">Save</button>' +
                            '</div>';
                        modalBody += '<div class="popupDetailTitle">&nbsp;</div><div class="popupDetailContent" style="text-align:right;">' +
                            '    <button class="resetery">Reset</button>' +
                            '</div>';
                        tm.showModal(modalId, modalBody);

                        $('.savery').on('click', function() {
                            global.prefs = {
                                blocking: $('#blocking').val(),
                                fontSize: $('#fontSize').val(),
                                grid: {
                                    sev1: $('#sev1').val(),
                                    sev2: $('#sev2').val(),
                                    sev3: $('#sev3').val(),
                                    sev4: $('#sev4').val()
                                },
                                dim: $('#dim').val(),
                                dimmables: $('#dimmables').val().split(',')
                            };
                            GM_setValue('queryPrefs', JSON.stringify(global.prefs));
                            alert('Refresh to see new values.');
                        });
                        $('.resetery').on('click', function() {
                            GM_setValue('queryPrefs', null);
                            alert('Refresh to see default values.');
                        });
                    });
                }
            },
            dimRows: function() {
                if (global.prefs.dim === 'true') {
                    utils.toggleDims();
                }
            }
        },
        utils = {
            toggleDims: function () {
                var dimmables = global.prefs.dimmables,
                    indexReason = _.findIndex($('.grid-header-column'), function(headerItem) { return headerItem.innerText === 'Reason'; }),
                    indexState = _.findIndex($('.grid-header-column'), function(headerItem) { return headerItem.innerText === 'State'; }),
                    myOpacity = global.prefs.dim ? '.2' : '1',
                    myWeight = global.prefs.dim ? 'bold' : 'inherit';

                if (indexReason === -1 || indexState === -1) {
                    return;
                }

                $('.grid-row').each(function (row) {
                    if (indexReason > 0) {
                        $(this).find('.grid-cell').eq(indexReason).addClass('cellReason');
                    }
                    if (indexState > 0) {
                        $(this).find('.grid-cell').eq(indexReason).addClass('cellState');
                    }
                });

                $('.work-items-tabs a[title="Set focus on work items that still need development work"]').css('font-weight', myWeight);
                _.each(dimmables, function(dimmable) {
                    $('.cellState:contains(' + dimmable + ')').closest('.grid-row').css('opacity', myOpacity);
                    $('.workitem-state-value:contains(' + dimmable + ')').closest('.grid-row').css('opacity', myOpacity);
                });
            }
        };


    /*
     * Global functions
     */


    function initScript() {
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

})();