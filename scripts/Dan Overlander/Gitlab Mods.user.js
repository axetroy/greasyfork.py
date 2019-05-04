// ==UserScript==
// @name			Gitlab Mods
// @namespace		COMDSPDSA
// @version			3
// @description		Adds colored sections, extra functionality, and avatars to Gitlab. For avatars, detects locally-running image server to use for replacements of avatars. Use http-server (https://www.npmjs.com/package/http-server) for node.js for simple image hosting. Recommend image size of 100x100.
// @author			Dan Overlander
// @include			*/gitlab.dell.com*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require         https://greasyfork.org/scripts/23115-tampermonkey-support-library/code/Tampermonkey%20Support%20Library.js
// @require		    https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min.js
// @require         https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment-with-locales.min.js
// @grant           GM_setValue
// @grant           GM_getValue

// ==/UserScript==

// Since v02.20: Links TFS and PT values in title to their respective URLs. Adds Font+/- button for comparison text
// Since v02.10: Since Gitlab removed their Expand All button (?!), this adds it back in...
// Since v02.00: Altered the logic of colorizing discussions to search for a more universal pass-fail value. Changes Discussions buttons from icon to text (and is therefore larger)
// Since v01.81: Removed old coffee cup button code. Added Collapse All Button with diff-collapsing function. Bug tweaks.
// Since v01.80: Some conversations were not being colorized.
// Since v01.75: Removes coffee-cup as it is native functionality, now. Yay Gitlab! Fixes a name-finding method that sometimes forgot to add a comma after spaces, for avatar images.
// Since v01.7: Fixes the click functionality of the tamperlabel, also makes it look clickable
// Since v01.6: Adds ability to hide header messages. Adds ability to erase Gitlab Mods memory by clicking on Tampermonkey icon (on this page, a battery in the lower-right corner)
// Since v01.5: Added a conditional close-footer button, close broadcast message button.  Adds memory states for these buttons (only for messages already seen!) as well as the close-tree (coffee) button. Expands breadcrumb dropdown.
// Since v01.4: Linked the notifications to the TODO page. Removed a log statement. Resets TODO page title when timer runs out if reload is cancelled. Slows down reminder by 1 hour (up to 8 times) because coming back to your computer after an extended period and receiving TONS of notifications is annoying
// Since v01.3: Re-enables the Tampericon
// Since v01.2: Adds "hide tree" button (looks like a coffee cup)
// Since v01.1: Updates document title with countdown timer indication.  Adds hourly reminder of existing TODOs. Removes conversation button from non-conversation pages.
// Since v01.0: Added the countdown indicator to the page title for TODO indication; cancelling reverts the title to original
// Since v00.0: init, copying from GIT Avatars script

/*
 * tm is an object included via @require from DorkForce's Tampermonkey Assist script
 */

(function() {
    'use strict';

    var TIMEOUT = 750,
        avatarHost = 'localhost:8080/', // for setPhoto
        pingPhoto = '!none', // pinging for setPhoto
        imageExt = '.png',
        global = {
            scriptName: 'Gitlab Mods',
            areClassesAdded: false,
            arePrButtonsAdded: false,
            areInterfaceButtonsAdded: false,
            todoMonitorInitialized: false,
            titlesLinked: false,
            todoTimer: undefined,
            isMouseMoved: false,
            prefs: GM_getValue('gitlabPrefs') != null ? JSON.parse(GM_getValue('gitlabPrefs')) : {},
            reload: {
                lapsed: 0,
                timespan: 10000,
                title: document.title
            },
            defaultLineSize: '1em'
        },
        properName = function(thisName) {
            var firstName = '',
                lastName = '',
                midName = '';

            thisName = thisName
                .replace('https://gitlab.dell.com/', '')
                .replace(' - Dell Team', '')
                .replace('\'s avatar', '')
                .replace('@', '')
                .replace(/@/g, '')
                .replace(/\//g, '')
                .replace(/_/g, '-');
            firstName = thisName.substring(0, thisName.indexOf('-'));
            lastName = thisName.substring(thisName.indexOf('-')+1, thisName.length);
            if ((firstName.length === 0 || lastName.length === 0) && thisName.indexOf(',') < 0) {
                return;
            }
            if (thisName.indexOf(',') < 0) {
                thisName = lastName + ', ' + firstName;
            }
            if (thisName.indexOf('-') > 0) {
                midName = thisName.substring(0, thisName.indexOf('-'));
                thisName = thisName.substring(thisName.indexOf('-')+1, thisName.length);
                thisName = thisName + ' ' + midName;
            }
            thisName = thisName
                .replace(/(\r\n\t|\n|\r\t)/gm,'') // no line breaks or tabs
                .replace(/\s\s/, '') // no double spaces
                .replace(/ ,/, ',') // no spaces before commas
                .replace(/\%20/, '') // no %20 characters
                .trim(); // seriously, no extra spaces
            thisName = thisName.replace(',', ', ').replace('  ', ' '); // there's probably a less-stupid way of REALLY making sure it's always "COMMA SPACE"
            return thisName;
        },
        updateImg = function(img, thisName) {
            if (thisName != null) {
                if (thisName !== ', ') {
                    $(img).prop('src', 'http://' + avatarHost + thisName + imageExt);
                } else {
                    tm.log('updateImg: invalid user name for ' + img.src + ': ' + thisName + '(' + thisName.length + ' chars)');
                }
            }
        },
        page = {
            initialize: function () {
                setTimeout(function () {
                    page.setPrefs();
                    page.addClasses();
                    page.adjustStyles();
                    page.setTamperIcon();
                    page.addButtons();
                    page.expandBreadcrumb();
                    page.setAvatars();
                    page.monitorTodos();
                    page.linkWorkItems();
                }, TIMEOUT);
            },
            setPrefs: function() {
                if (global.prefs.todosCount == null) global.prefs.todosCount = '0';
                if (global.prefs.todosTimestamp == null) global.prefs.todosTimestamp = moment();
                if (global.prefs.reloadTimesReminded == null) global.prefs.reloadTimesReminded = '0';
                if (global.prefs.reloadReminderCount == null) global.prefs.reloadReminderCount = '0';
                if (global.prefs.archivedMessages == null) global.prefs.archivedMessages = [];
                if (global.prefs.archivedBroadcasts == null) global.prefs.archivedBroadcasts = [];
                if (global.prefs.comparisonSize == null) global.prefs.comparisonSize = global.defaultLineSize;
                $('.line span').css('font-size', global.prefs.comparisonSize);
            },
            addClasses: function () {
                if (!global.areClassesAdded) {
                    global.areClassesAdded = true;

                    // generic
                    tm.addGlobalStyle('.fingery { margin:13px; cursor:pointer; }');
                    tm.addGlobalStyle('.tamperlabel { cursor: pointer; }');
                    tm.addGlobalStyle('.btn-headerly { padding:3px 10px; height:30px; margin-top:5px; background:#414187; border-color:darkslategray; }');
                    tm.addGlobalStyle('.btn-headerly:hover { background-color:steelblue; border-color:black; }');

                    // colored backgrounds
                    tm.addGlobalStyle('.merge-request-tabs-container {background:bisque; }');
                    tm.addGlobalStyle('.merge-request-tabs {background:burlywood; }');
                    tm.addGlobalStyle('.mr-widget-content {background:cornflowerblue; }');

                    // UI-sizing
                    tm.addGlobalStyle('.approvals-required-text .avatar {width:24px; height:24px; }');
                    tm.addGlobalStyle('.note-text ul {margin:0px !important; }');
                    tm.addGlobalStyle('.system-note {font-size:0.7em; padding:0; margin:10px 0px 0px 0px; }');
                    tm.addGlobalStyle('.timeline-entry:hover {background:aliceblue; }');
                    tm.addGlobalStyle('.note-text .gfm-merge_request {background:aliceblue; padding:10px; float:right; position:relative; top:-23px; margin-bottom:-28px; }');

                    tm.addGlobalStyle('.tamperNewIcon {position:relative; top:-10px; }');
                }
            },
            adjustStyles: function() {
                var lePass = 'palegreen',
                    leFail = 'orange';

                $('.discussion-notes .timeline-content:contains("Gitbot")').each(function(discussion) {
                    if ($(this).closest('.card').find('button:contains("Resolve discussion")').length > 0) {
                        $(this).css('background-color', leFail);
                    } else {
                        if ($(this).text().indexOf('Resolved') > 0) {
                            $(this).css('background-color', lePass);
                        }
                    }
                });

                $('.timeline-entry .discussion-header').each(function(discussion) {
                    //
                    $(this).closest('.timeline-entry :contains("Resolve discussion")').find('.discussion-header').css('background-color', leFail);
                    $(this).closest('.timeline-entry :contains("Resolved")').css('background-color', lePass);
                });
            },
            setTamperIcon: function () {
                // Add Tampermonkey Icon with label to identify this script
                if($('.tamperlabel').length > 0) {
                    if ($('.tamperlabel').prop('title').indexOf(global.scriptName) === -1) {
                        $('.tamperlabel').prop('title', $('.tamperlabel').prop('title') + ' | ' + global.scriptName);
                    }
                } else {
                    $('body').append('<span class="tamperlabel" title="Tampermonkey scripts: ' + global.scriptName + '"><i class="fa fa-battery-three-quarters tamperNewIcon"></i></span>');
                }
                var tamperAction = function () {
                    page.erasePreferences();
                    alert('All Gitlab Mods memory has been reset.');
                    return false;
                };
                $('.tamperlabel').unbind('click').click(tamperAction);
            },
            addButtons: function() {
                var idConversations = 'idConversations',
                    conversationsClass = '.header-new',
                    addConversationsButton = function () {
                        var buttonAnchor = $(conversationsClass),
                            conversationsAction = function () {
                                $('html, body').animate({ scrollTop: $('.approvals-components').offset().top -100 }, 500);
                                return false;
                            };
                        buttonAnchor.before('<a id="' + idConversations + '" class="btn btn-default btn-headerly">Discussions</a>');
                        $('#' + idConversations).click(conversationsAction);
                    },
                    addCollapseExpandButtonToDom = function(bId, bAnchor, bAction, bText) {
                        bAnchor.after('<a id="' + bId + '" class="btn btn-default append-right-8">' + bText + '</a>');
                        $('#' + bId).unbind('click').click(bAction);
                    },

                    idCollapse = 'idCollapse',
                    collapseClass = '.is-compare-versions-header',
                    addCollapseButton = function() {
                        var addCollapseButtonToDom = function () {
                            addCollapseExpandButtonToDom(idCollapse, buttonAnchor, collapseAction, 'Collapse All');
                        },
                            buttonAnchor = $(collapseClass),
                            collapseAction = function () {
                                _.each($('.diff-content'), (diff) => {
                                    if ($(diff).height() > 0) {
                                        $(diff).prev().click();
                                    }
                                });
                                $(this).remove();
                                addExpandButton();
                            };
                        addCollapseButtonToDom();
                        $('a:contains("Expand all")').hide();
                    },

                    idExpand = 'idExpand',
                    expandClass = '.is-compare-versions-header',
                    addExpandButton = function() {
                        var addExpandButtonToDom = function () {
                            addCollapseExpandButtonToDom(idExpand, buttonAnchor, expandAction, 'Expand All');
                        },
                            buttonAnchor = $(expandClass),
                            expandAction = function () {
                                _.each($('.diff-collapsed'), (diff) => {
                                    $(diff).prev().click();
                                });
                                $(this).remove();
                                addCollapseButton();
                            };
                        addExpandButtonToDom();
                    },

                    idComparisonFont = 'idComparisonFont',
                    comparisonFontClass = '.is-compare-versions-header',
                    addComparisonFontButton = function() {
                        var buttonAnchor = $(comparisonFontClass),
                            comparisonFontAction = function () {
                                var buttonText = $('#' + idComparisonFont).text();
                                if (global.prefs.comparisonSize === global.defaultLineSize) {
                                    global.prefs.comparisonSize = '.8em';
                                    $('#' + idComparisonFont).text(buttonText.replace('-', '+'));
                                } else {
                                    global.prefs.comparisonSize = global.defaultLineSize;
                                    $('#' + idComparisonFont).text(buttonText.replace('+', '-'));
                                    // actual setting of font size done during monitoring of page, so mouse movement can trigger it
                                }
                                page.savePreferences();
                            };
                        buttonAnchor.after('<a id="' + idComparisonFont + '" class="btn btn-default append-right-8">Font -</a>');
                        $('#' + idComparisonFont).unbind('click').click( comparisonFontAction);
                        if (global.prefs.comparisonSize !== global.defaultLineSize) { // to fix UI if button was previously saved in alternate setting
                            global.prefs.comparisonSize = global.defaultLineSize;
                            comparisonFontAction();
                        }
                    },

                    idHeader = 'idHeader',
                    headerClass = '.header-message',
                    addHeaderButton = function() {
                        var buttonAnchor = $(headerClass),
                            headerAction = function () {
                                var msg = $(headerClass + ' p').text();
                                if (!_.contains(global.prefs.archivedMessages, msg)) {
                                    global.prefs.archivedMessages.push(msg);
                                    page.savePreferences();
                                }
                                buttonAnchor.hide();
                                // special for header
                                $('.navbar').css('top', '0px');
                                $('.nav-sidebar').css('top', '40px');
                                $('.content-wrapper').css('margin-top', '40px');
                                return false;
                            };
                        buttonAnchor.prepend('<i id="' + idHeader + '" class="fa fa-times outlined fingery"></i>');
                        $('#' + idHeader).click(headerAction);
                        // if a previously-hidden header message is showing again
                        if ($(headerClass).css('display') !== 'none') {
                            _.each(global.prefs.archivedMessages, function(msg) {
                                if ($(headerClass + ' p').text() == msg) {
                                    headerAction();
                                }
                            });
                        }
                    },

                    idFooter = 'idFooter',
                    footerClass = '.footer-message',
                    addFooterButton = function() {
                        var buttonAnchor = $(footerClass),
                            footerAction = function () {
                                var msg = $(footerClass + ' p').text();
                                if (!_.contains(global.prefs.archivedMessages, msg)) {
                                    global.prefs.archivedMessages.push(msg);
                                    page.savePreferences();
                                }
                                buttonAnchor.hide();
                                return false;
                            };
                        buttonAnchor.prepend('<i id="' + idFooter + '" class="fa fa-times outlined fingery"></i>');
                        $('#' + idFooter).click(footerAction);
                        // if a previously-hidden footer message is showing again
                        if ($(footerClass).css('display') !== 'none') {
                            _.each(global.prefs.archivedMessages, function(msg) {
                                if ($(footerClass + ' p').text() == msg) {
                                    footerAction();
                                }
                            });
                        }
                    },

                    idBroadcast = 'idBroadcast',
                    broadcastClass = '.broadcast-message',
                    addBroadcastButton = function() {
                        var buttonAnchor = $(broadcastClass),
                             broadcastAction = function () {
                                var msg = $(broadcastClass + ' p').text();
                                if (!_.contains(global.prefs.archivedBroadcasts, msg)) {
                                    global.prefs.archivedBroadcasts.push(msg);
                                    page.savePreferences();
                                }
                                buttonAnchor.hide();
                                return false;
                            };
                        buttonAnchor.prepend('<i id="' + idBroadcast + '" class="fa fa-times outlined fingery"></i>');
                        $('#' + idBroadcast).click( broadcastAction);
                        // if a previously-hidden  broadcast message is showing again
                        if ($( broadcastClass).css('display') !== 'none') {
                            _.each(global.prefs.archivedBroadcasts, function(msg) {
                                if ($( broadcastClass + ' p').text() == msg) {
                                     broadcastAction();
                                }
                            });
                        }
                    };

                if (document.URL.indexOf('merge_requests') < 0) {
                    $('#' + idConversations).remove();
                    $('#' + idCollapse).remove();
                    $('#' + idExpand).remove();
                    global.arePrButtonsAdded = false;
                } else {
                    if (!global.arePrButtonsAdded) {
                        global.arePrButtonsAdded = true;

                        tm.getContainer({
                            'el': conversationsClass,
                            'max': 100,
                            'spd': 1000
                        }).then(function($container){
                            addConversationsButton();
                        });

                        tm.getContainer({
                            'el': collapseClass,
                            'max': 100,
                            'spd': 1000
                        }).then(function($container){
                            addComparisonFontButton();
                            addCollapseButton();
                        });

//                         tm.getContainer({ // shares same container as collapse button; dont need
//                             'el': comparisonFontClass,
//                             'max': 100,
//                             'spd': 1000
//                         }).then(function($container){
//                             addComparisonFontButton();
//                         });

                    }
                }

                if (!global.areInterfaceButtonsAdded) {
                    global.areInterfaceButtonsAdded = true;

                    tm.getContainer({
                        'el': headerClass,
                        'max': 100,
                        'spd': 1000
                    }).then(function($container){
                        addHeaderButton();
                    });

                    tm.getContainer({
                        'el': footerClass,
                        'max': 100,
                        'spd': 1000
                    }).then(function($container){
                        addFooterButton();
                    });

                    tm.getContainer({
                        'el': broadcastClass,
                        'max': 100,
                        'spd': 1000
                    }).then(function($container){
                        addBroadcastButton();
                    });
                }

            },
            expandBreadcrumb: function() {
                $('.breadcrumbs .dropdown li').prependTo('.breadcrumbs-list .dropdown');
                $('.breadcrumbs-list .dropdown button').hide();
            },
            setAvatars: function () {
                tm.ping(avatarHost + pingPhoto + imageExt, function callback (response) {
                    if (response === 'responded') {
                        var avatarArray = [],
                            thisName = 'none';

                        tm.getContainer({
                            'el': '.participants-author'
                        }).then(function($container){
                            _.each($('.participants-author img'), function (img) {
                                thisName = properName( $(img).next().find('div').text() );
                                updateImg(img, thisName);
                            });
                        });

                        tm.getContainer({
                            'el': '.issuable-meta .author-link'
                        }).then(function($container){
                            _.each($('.issuable-meta .author-link img'), function (img) {
                                thisName = properName( $(img).next().text() );
                                updateImg(img, thisName);
                            });
                        });

                        tm.getContainer({
                            'el': '.author-link.inline'
                        }).then(function($container){
                            _.each($('.author-link.inline img'), function (img) {
                                thisName = properName( $(img).parent().prop('title') );
                                updateImg(img, thisName);
                            });
                        });

                        tm.getContainer({
                            'el': '.user-avatar-link'
                        }).then(function($container){
                            _.each($('.user-avatar-link img'), function (img) {
                                thisName = properName( $(img).prop('alt') );
                                updateImg(img, thisName);
                            });
                        });

                        tm.getContainer({
                            'el': '.header-user-dropdown-global'
                        }).then(function($container){
                            _.each($('.header-user-dropdown-global img'), function (img) {
                                thisName = properName( $(img).parent().prop('href') );
                                updateImg(img, thisName);
                            });
                        });

                        tm.getContainer({
                            'el': '.avatar-cell'
                        }).then(function($container){
                            _.each($('.avatar-cell img'), function (img) {
                                thisName = properName( $(img).prop('title') );
                                updateImg(img, thisName);
                            });
                        });

                        tm.getContainer({
                            'el': '.avatar-holder'
                        }).then(function($container){
                            _.each($('.avatar-holder img'), function (img) {
                                thisName = properName( $(img).parent().parent().next().find('.cover-title').text() );
                                updateImg(img, thisName);
                            });
                        });

                        tm.getContainer({
                            'el': '.list-item-name'
                        }).then(function($container){
                            _.each($('.list-item-name img'), function (img) {
                                thisName = properName( $(img).next().find('.member').text() );
                                updateImg(img, thisName);
                            });
                        });

                        tm.getContainer({
                            'el': '.user-popover'
                        }).then(function($container){
                            _.each($('.user-popover img'), function (img) {
                                thisName = properName( $(img).parent().parent().next().find('h5').text() );
                                updateImg(img, thisName);
                            });
                        });

                        tm.getContainer({
                            'el': '.system-note-image'
                        }).then(function($container){
                            _.each($('.system-note-image img'), function (img) {
                                thisName = properName( $(img).parent().prop('href') );
                                updateImg(img, thisName);
                            });
                        });

                    }
                });
            },
            savePreferences: function () {
                GM_setValue('gitlabPrefs', JSON.stringify(global.prefs));
            },
            erasePreferences: function() {
                GM_setValue('gitlabPrefs', JSON.stringify({}));
            },
            monitorTodos: function () {
                if (document.URL.indexOf('todos') < 0) return; // leave if not on the TODO page

                var indicateSecondsTimer,
                    todosCount =  $('.todos-count').text().replace(/(\r\n\t|\n|\r\t)/gm,''),
                    notificationIcon = 'https://gitlab.dell.com/assets/favicon-7901bd695fb93edb07975966062049829afb56cf11511236e61bcf425070e36e.png',
                    indicateSeconds = function() {
                        var secondsRemaining = (Math.floor(global.reload.timespan/1000) - global.reload.lapsed);
                        document.title = todosCount + ' : (' + secondsRemaining + ')';
                        global.reload.lapsed++;
                        if (secondsRemaining > 0) {
                            indicateSecondsTimer = setTimeout(indicateSeconds, 1000);
                        } else {
                            document.title = global.reload.title;
                        }
                    },
                    triggerNotification = function(notifyMessage) {
                        var notification = new Notification(notifyMessage, {
                            icon: notificationIcon,
                            body: todosCount
                        });
                        notification.onclick = function () {
                            window.open('https://gitlab.dell.com/dashboard/todos');
                        };
                    }

                if (!global.todoMonitorInitialized) {
                    global.todoMonitorInitialized = true;
                    global.reload.lapsed = 0;

                    var duration = moment.duration(moment().diff(global.prefs.todosTimestamp)),
                        hours = duration.asHours();

                    if (Number(todosCount) > 0 && hours > 1) {
                        global.prefs.reloadTimesReminded = Number(global.prefs.reloadTimesReminded) + 1;
                        page.savePreferences();
                    }

                    if (Notification.permission === 'granted' && todosCount !== global.prefs.todosCount) {
                        // trigger notification on TODO count change
                        triggerNotification('TODOs on GitLab:');
                    } else if (Number(todosCount) > 0 && hours > 1 && Number(global.prefs.reloadTimesReminded) > Number(global.prefs.reloadReminderCount)) {
                        // trigger notification on hourly timeout if there ARE any
                        global.prefs.reloadTimesReminded = 0;
                        global.prefs.reloadReminderCount = Number(global.prefs.reloadReminderCount) + 1;
                        triggerNotification('Reminder- GitLab TODOs:');
                        global.prefs.todosTimestamp = moment();
                        if (Number(global.prefs.reloadReminderCount) > 8) {
                            global.prefs.reloadReminderCount = 0;
                            global.prefs.reloadTimesReminded = 0;
                        }
                        page.savePreferences();
                    }

                    // update stored count
                    if(todosCount !== global.prefs.todosCount) {
                        global.prefs.todosCount = todosCount;
                        global.prefs.reloadReminderCount = 0;
                        global.prefs.reloadTimesReminded = 0;
                        page.savePreferences();
                    }

                    // Reload in X seconds
                    global.todoTimer = setTimeout(function() {window.location.reload(false);}, global.reload.timespan);

                    var buttonAnchor = $('.page-title');
                    var buttonCancelReload = 'Cancel-Reload';
                    var timeoutElement = function () {
                        clearTimeout(global.todoTimer);
                        clearTimeout(indicateSecondsTimer);
                        $('#' + buttonCancelReload).css('display', 'none');
                        document.title = global.reload.title;
                        return false;
                    };
                    buttonAnchor.after('<button id="' + buttonCancelReload + '" style="margin-left:50px; border-radius:15px; border:0px; background:lightgoldenrodyellow; padding:5px 15px; ">' + buttonCancelReload + '</button>');
                    $('#' + buttonCancelReload).click(timeoutElement);

                    var buttonNotifyMe = 'Notify-Me';
                    var notifyMe = function() {
                        if (Notification.permission !== "granted")
                            Notification.requestPermission();
                        else {
                            var notification = new Notification('Permission Granted', {
                                icon: notificationIcon,
                                body: "Notifications have been allowed.",
                            });

                            //                             notification.onclick = function () {
                            //                                 window.open("http://stackoverflow.com/a/13328397/1269037");
                            //                             };
                        }
                        $('#' + buttonNotifyMe).css('display', 'none');
                        return false;
                    }

                    if (Notification.permission !== 'granted') {
                        buttonAnchor.after('<button id="' + buttonNotifyMe + '" style="margin-left:50px; border-radius:15px; border:0px; background:lightgrey; padding:5px 15px; ">' + buttonNotifyMe + '</button>');
                        $('#' + buttonNotifyMe).click(notifyMe);
                    }

                    setTimeout(indicateSeconds, 1000);

                }
            },
            linkWorkItems: function () {
                if (!global.titlesLinked) {
                    global.titlesLinked = true;
                    var linkText, linkHref,
                        titleText = $('h2.title').text();
                    if (titleText.indexOf('PT#') > -1) {
                        linkText = titleText.match(/PT#[0-9]*/g).toString().split(',');
                        linkText.forEach(thisLink => {
                            linkHref = '<a href="https://www.pivotaltracker.com/n/projects/2210391/stories/' + thisLink.replace(/PT\#/g, '') + '" target="blank">' + thisLink + '</a>';
                            titleText = titleText.replace(thisLink, linkHref);
                        });
                    }
                    if (titleText.indexOf('TFS#') > -1) {
                        linkText = titleText.match(/TFS#[0-9]*/g).toString().split(',');
                        linkText.forEach(thisLink => {
                            linkHref = '<a href="http://tfs2.dell.com:8080/tfs/eDell/eDellPrograms/_workitems?id=' + thisLink.replace(/TFS\#/g, '') + '" target="blank">' + thisLink + '</a>';
                            titleText = titleText.replace(thisLink, linkHref);
                        });
                    }
                    $('h2.title').html(titleText);
                }
            }
        };

    /*
     * Global functions
     */

    function initScript () {
        tm.getContainer({
            'el': '.content',
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