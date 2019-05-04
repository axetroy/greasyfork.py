// ==UserScript==
// @name        AO3: Kudosed and seen history
// @description Highlight or hide works you kudosed/marked as seen.
// @namespace	https://greasyfork.org/scripts/5835-ao3-kudosed-and-seen-history
// @author	Min
// @version	1.5.4
// @history	1.5 - import/export seen list
// @history	1.4 - thinner stripes, remembers bookmarks you left
// @history	1.3 - option to collapse blurbs of seen works
// @history	1.2.1 - double click on date marks work as seen
// @history	1.2 - check for bookmarks you left, changes to the menu
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @include     http://*archiveofourown.org/*
// @include     https://*archiveofourown.org/*
// ==/UserScript==


(function($) {

    if (typeof(Storage) !== 'undefined') {

        var debug = false;

        // newest more-or-less major version, for the update notice
        var current_version = 1.5;

        var username_saved = localStorage.getItem('kudoshistory_username');
        var userlink = $('#greeting li.dropdown > a[href^="/users/"]');

        if (!username_saved) { localStorage.setItem('kudoshistory_lastver', current_version); }

        // if logged in
        if (userlink.length) {
            var username = userlink.attr('href').split('/')[2];
            debug && console.log('found username: ' + username + ', saved username: ' + username_saved);

            if (!username_saved || username_saved !== username) {
                debug && console.log('saving username: ' + username);
                localStorage.setItem('kudoshistory_username', username);
            }
        }
        // if not logged in, but remembers username
        else if (!!username_saved) {
            debug && console.log("didn't find username on page, saved username: " + username_saved);
            var username = username_saved;
        }
        else {
            var username = prompt('AO3: Kudosed and seen history\n\nYour AO3 username:');
            localStorage.setItem('kudoshistory_username', username);
        }

        // check the 'hide seen works' setting
        var hide_seen = 0;
        switch (localStorage.getItem('kudoshistory_hide')) {
            case 'yes':
                hide_seen = 1;
                break;
            case 'collapse':
                hide_seen = 2;
        }

        // check the 'mark as seen on open' setting
        var auto_seen = false;
        if (localStorage.getItem('kudoshistory_autoseen') == 'yes') { auto_seen = true; }

        // check the 'highlight bookmarked' setting
        var highlight_bookmarked = true;
        if (localStorage.getItem('kudoshistory_highlight_bookmarked') == 'no') { highlight_bookmarked = false; }

        // uncomment the next four lines if you need to clear your local lists (then comment them again after refreshing the page once)
        // localStorage.removeItem('kudoshistory_kudosed');
        // localStorage.removeItem('kudoshistory_checked');
        // localStorage.removeItem('kudoshistory_seen');
        // localStorage.removeItem('kudoshistory_bookmarked');

        var list_kudosed = localStorage.getItem('kudoshistory_kudosed');
        var list_checked = localStorage.getItem('kudoshistory_checked');
        var list_seen = localStorage.getItem('kudoshistory_seen');
        var list_bookmarked = localStorage.getItem('kudoshistory_bookmarked');

        if (!list_kudosed) { var list_kudosed = ','; }
        if (!list_checked) { var list_checked = ','; }
        if (!list_seen) { var list_seen = ','; }
        if (!list_bookmarked) { var list_bookmarked = ','; }

        $(document).ajaxStop(function() {
            localStorage.setItem('kudoshistory_kudosed', list_kudosed);
            localStorage.setItem('kudoshistory_checked', list_checked);
            localStorage.setItem('kudoshistory_seen', list_seen);
            localStorage.setItem('kudoshistory_bookmarked', list_bookmarked);
        });

        var style = $('<style type="text/css"></style>').appendTo($('head'));

        // add css rules for kudosed works
        addCss(0);

        // if there's a list of works or bookmarks, add menu
        var found_blurbs = $('li.work.blurb').add('li.bookmark.blurb');

        if (found_blurbs.length) {
            addSeenMenu();
        }

        // if it's the first time after an update
        addNotice();

        // for each work blurb
        $('li.work.blurb').not('.deleted').each(function() {

            // get work id
            var work_id = $(this).attr('id').replace('work_', '');
            debug && console.log('works loop ' + work_id);

            blurbCheck(work_id, 'work_' + work_id, $(this), true);

            // double click on date marks work as seen
            var work_date = $(this).not('.marked-seen').not('.has-kudos').find('p.datetime');
            if (work_date.length) {
                debug && console.log('set date click ' + work_id);
                work_date.one('dblclick', function() {
                    list_seen = localStorage.getItem('kudoshistory_seen');
                    list_seen = ',' + work_id + list_seen;
                    localStorage.setItem('kudoshistory_seen', list_seen);
                    $('#work_' + work_id).addClass('marked-seen');
                });
            }
        });

        // for each bookmark blurb
        $('li.bookmark.blurb').not('.deleted').each(function() {

            // get bookmark and work ids
            var bookmark_id = $(this).attr('id');
            var work_link = $(this).find('h4 a:first').attr('href');

            // if it's not a deleted work and not a series bookmark
            if (!!work_link && work_link.indexOf('series') == -1) {
                var work_id = work_link.split('/').pop();
                debug && console.log('bookmarks loop ' + work_id + ' ' + bookmark_id);

                // if it's your own bookmark
                var own_bookmark = $(this).find('div.own.user.module.group');
                if (own_bookmark.length) {
                    list_bookmarked = ',' + work_id + list_bookmarked.replace(',' + work_id + ',', ',');
                    $(this).addClass('is-bookmarked');
                    blurbCheck(work_id, bookmark_id, $(this), false);

                    own_bookmark.find('a[href$="/confirm_delete"]').click(function() {
                        list_bookmarked = localStorage.getItem('kudoshistory_bookmarked');
                        list_bookmarked = list_bookmarked.replace(',' + work_id + ',', ',');
                        $('#' + bookmark_id).removeClass('is-bookmarked');
                        localStorage.setItem('kudoshistory_bookmarked', list_bookmarked);
                    });
                }
                else {
                    blurbCheck(work_id, bookmark_id, $(this), true);
                }
            }
        });

        // if it's a work page
        if ($('#workskin').length) {

            // get work id
            var work_id = $('#kudo_commentable_id').val();
            debug && console.log('work_id ' + work_id);

            // check if work id is on the seen list
            var is_seen = list_seen.indexOf(',' + work_id + ',');

            if (auto_seen) {
                if (is_seen == -1) {
                    list_seen = ',' + work_id + list_seen;
                    is_seen = 1;
                }
                $('dl.work.meta.group').addClass('marked-seen');
            }
            else if (is_seen > -1) {
                $('dl.work.meta.group').addClass('marked-seen');
            }

            addSeenButtons();

            // if work id is on the kudosed list
            if (list_kudosed.indexOf(',' + work_id + ',') > -1) {
                $('dl.work.meta.group').addClass('has-kudos');
                debug && console.log('on kudosed list');
            }
            else {
                var found_kudos = false;

                // check if there are kudos from the user
                var user_kudos = $('#kudos').find('[href="/users/' + username + '"]');

                if (user_kudos.length) {
                    // highlight blurb and add work id to kudosed list
                    list_kudosed = ',' + work_id + list_kudosed;
                    list_checked = list_checked.replace(',' + work_id + ',', ',');
                    $('dl.work.meta.group').addClass('has-kudos');
                    found_kudos = true;
                }
                else if (list_checked.indexOf(',' + work_id + ',') == -1) {
                    // add work id to checked list
                    list_checked = ',' + work_id + list_checked;
                }

                if (!found_kudos) {
                    $('#new_kudo').click(function() {
                        list_kudosed = localStorage.getItem('kudoshistory_kudosed');
                        list_checked = localStorage.getItem('kudoshistory_checked');
                        list_kudosed = ',' + work_id + list_kudosed;
                        list_checked = list_checked.replace(',' + work_id + ',', ',');
                        $('dl.work.meta.group').addClass('has-kudos');
                        localStorage.setItem('kudoshistory_kudosed', list_kudosed);
                        localStorage.setItem('kudoshistory_checked', list_checked);
                    });
                }
            }

            // check if it's bookmarked
            var bookmark_button_text = $('a.bookmark_form_placement_open').filter(':first').text();

            if (bookmark_button_text.indexOf('Edit') > -1) {
                // highlight blurb
                list_bookmarked = ',' + work_id + list_bookmarked.replace(',' + work_id + ',', ',');
                $('dl.work.meta.group').addClass('is-bookmarked');
            }
            else {
                list_bookmarked = list_bookmarked.replace(',' + work_id + ',', ',');
            }
        }

        // keep the kudos, checked and bookmarked lists under 200k characters (~25k works)
        if (list_kudosed.length > 200000) {
            list_kudosed = list_kudosed.slice(0,180000);
        }
        if (list_checked.length > 200000) {
            list_checked = list_checked.slice(0,180000);
        }
        if (list_bookmarked.length > 200000) {
            list_bookmarked = list_bookmarked.slice(0,180000);
        }

        // keep the seen list under 2mil characters (~250k works)
        if (list_seen.length > 2000000) {
            list_seen = list_seen.slice(0,1900000);
        }

        // save all lists
        try {
            debug && console.log('god do i try (to save the lists)');
            localStorage.setItem('kudoshistory_kudosed', list_kudosed);
            localStorage.setItem('kudoshistory_checked', list_checked);
            localStorage.setItem('kudoshistory_seen', list_seen);
            localStorage.setItem('kudoshistory_bookmarked', list_bookmarked);
        }
        catch(e) {
            debug && console.log('error while saving lists');
            list_seen = list_seen.slice(0,list_seen.length*0.9);
            localStorage.setItem('kudoshistory_kudosed', list_kudosed);
            localStorage.setItem('kudoshistory_checked', list_checked);
            localStorage.setItem('kudoshistory_seen', list_seen);
            localStorage.setItem('kudoshistory_bookmarked', list_bookmarked);
        }
    }

    // check if work is on lists
    function blurbCheck(work_id, blurb_id, blurb, check_bookmark) {

        // if work id is on the kudosed list
        if (list_kudosed.indexOf(',' + work_id + ',') > -1) {
            debug && console.log('is kudosed');
            blurb.addClass('has-kudos');
            list_kudosed = ',' + work_id + list_kudosed.replace(',' + work_id + ',', ',');
        }
        // if work id is on the seen list
        else if (list_seen.indexOf(',' + work_id + ',') > -1) {
            debug && console.log('is seen');
            blurb.addClass('marked-seen');
            list_seen = ',' + work_id + list_seen.replace(',' + work_id + ',', ',');
        }
        // if work id is on the checked list
        else if (list_checked.indexOf(',' + work_id + ',') > -1) {
            debug && console.log('is checked');
            list_checked = ',' + work_id + list_checked.replace(',' + work_id + ',', ',');
        }
        else {
            debug && console.log('loading kudos for ' + blurb_id);

            // add a div to the blurb that will house the kudos
            blurb.append('<div id="kudos_' + blurb_id + '" style="display: none;"></div>');

            // retrieve a list of kudos from the work
            var work_url = window.location.protocol + '//' + window.location.hostname + '/works/' + work_id + '/kudos #kudos';
            $('#kudos_' + blurb_id).load(work_url, function() {
                // check if there are kudos from the user
                var user_kudos = $('#kudos_' + blurb_id).find('[href="/users/' + username + '"]');

                if (user_kudos.length) {
                    // highlight blurb and add work id to kudosed list
                    $('#' + blurb_id).addClass('has-kudos');
                    list_kudosed = ',' + work_id + list_kudosed;
                }
                else {
                    // add work id to checked list
                    list_checked = ',' + work_id + list_checked;
                }
            });
        }

        // if work id is on the bookmarked list
        if (check_bookmark) {
            if (list_bookmarked.indexOf(',' + work_id + ',') > -1) {
                debug && console.log('is bookmarked');
                blurb.addClass('is-bookmarked');
                list_bookmarked = ',' + work_id + list_bookmarked.replace(',' + work_id + ',', ',');
            }
        }
    }

    // mark all works on the page as seen
    function markPageSeen() {

        list_seen = localStorage.getItem('kudoshistory_seen');

        // for each work blurb
        $('li.work.blurb').not('.marked-seen').not('.has-kudos').not('.deleted').each(function() {

            var work_id = $(this).attr('id').replace('work_', '');
            debug && console.log('marking as seen ' + work_id);

            $(this).addClass('marked-seen');
            list_seen = ',' + work_id + list_seen;
        });

        // for each bookmark blurb
        $('li.bookmark.blurb').not('.marked-seen').not('.has-kudos').not('.deleted').each(function() {

            var work_link = $(this).find('h4 a:first').attr('href');

            // if it's not a series bookmark
            if (!!work_link && work_link.indexOf('series') == -1) {
                var work_id = work_link.split('/').pop();
                debug && console.log('marking as seen ' + work_id);
                $(this).addClass('marked-seen');
                list_seen = ',' + work_id + list_seen;
            }
        });

        localStorage.setItem('kudoshistory_seen', list_seen);
    }

    // mark all works on the page as unseen
    function markPageUnseen() {

        list_seen = localStorage.getItem('kudoshistory_seen');

        // for each work blurb
        $('li.work.blurb').not('.deleted').each(function() {

            var work_id = $(this).attr('id').replace('work_', '');
            debug && console.log('marking as unseen ' + work_id);

            $(this).removeClass('marked-seen');
            list_seen = list_seen.replace(',' + work_id + ',', ',');
        });

        // for each bookmark blurb
        $('li.bookmark.blurb').not('.deleted').each(function() {

            var work_link = $(this).find('h4 a:first').attr('href');

            // if it's not a series bookmark
            if (!!work_link && work_link.indexOf('series') == -1) {
                var work_id = work_link.split('/').pop();
                debug && console.log('marking as unseen ' + work_id);
                $(this).removeClass('marked-seen');
                list_seen = list_seen.replace(',' + work_id + ',', ',');
            }
        });

        localStorage.setItem('kudoshistory_seen', list_seen);
    }

    // re-check the page for kudos
    function recheckKudos() {

        list_kudosed = localStorage.getItem('kudoshistory_kudosed');
        list_checked = localStorage.getItem('kudoshistory_checked');

        // for each non-kudosed work blurb
        $('li.work.blurb').not('.has-kudos').not('.deleted').each(function() {

            // get work id
            var work_id = $(this).attr('id').replace('work_', '');
            debug && console.log('works loop ' + work_id);

            loadKudos(work_id, 'work_' + work_id, $(this));
        });

        // for each non-kudosed bookmark blurb
        $('li.bookmark.blurb').not('.has-kudos').not('.deleted').each(function() {

            // get bookmark and work ids
            var bookmark_id = $(this).attr('id');
            var work_link = $(this).find('h4 a:first').attr('href');

            // if it's not a series bookmark
            if (!!work_link && work_link.indexOf('series') == -1) {
                var work_id = work_link.split('/').pop();
                debug && console.log('bookmarks loop ' + work_id + ' ' + bookmark_id);
                loadKudos(work_id, bookmark_id, $(this));
            }
        });

        function loadKudos(work_id, blurb_id, blurb) {
            // add a div to the blurb that will house the kudos
            blurb.append('<div id="kudos_' + blurb_id + '" style="display: none;"></div>');

            // retrieve a list of kudos from the work
            var work_url = window.location.protocol + '//' + window.location.hostname + '/works/' + work_id + '/kudos #kudos';
            $('#kudos_' + blurb_id).load(work_url, function() {
                // check if there are kudos from the user
                var user_kudos = $('#kudos_' + blurb_id).find('[href="/users/' + username + '"]');

                if (user_kudos.length) {
                    // highlight blurb and add work id to kudosed list
                    $('#' + blurb_id).addClass('has-kudos');
                    list_kudosed = ',' + work_id + list_kudosed;
                    list_checked = list_checked.replace(',' + work_id + ',', ',');
                }
            });
        }

        localStorage.setItem('kudoshistory_kudosed', list_kudosed);
        localStorage.setItem('kudoshistory_checked', list_checked);
    }

    // check the page for bookmarks
    function checkForBookmarks() {

        list_bookmarked = localStorage.getItem('kudoshistory_bookmarked');

        // for each work and bookmark blurb
        $('li.work.blurb').add('li.bookmark.blurb').not('.deleted').each(function() {

            // get work link
            var blurb_id = $(this).attr('id');
            var work_link = $(this).find('h4 a:first').attr('href');
            debug && console.log('checking for bookmark ' + blurb_id);

            // if it's not deleted and not a series
            if (!!work_link && work_link.indexOf('series') == -1) {

                var work_id = work_link.split('/').pop();

                // add a div to the blurb that will house the bookmark button
                $(this).append('<div id="bookmarked_' + blurb_id + '" style="display: none;"></div>');

                // retrieve the bookmark button from the work
                var work_url = window.location.protocol + '//' + window.location.hostname + work_link + ' a.bookmark_form_placement_open:first';
                $('#bookmarked_' + blurb_id).load(work_url, function() {
                    // check if there is a bookmark from the user
                    var bookmark_button_text = $('#bookmarked_' + blurb_id).find('a').text();

                    if (bookmark_button_text.indexOf('Edit') > -1) {
                        // highlight blurb
                        $('#' + blurb_id).addClass('is-bookmarked');
                        list_bookmarked = ',' + work_id + list_bookmarked.replace(',' + work_id + ',', ',');
                    }
                    else {
                        $('#' + blurb_id).removeClass('is-bookmarked');
                        list_bookmarked = list_bookmarked.replace(',' + work_id + ',', ',');
                    }
                });
            }
        });

        localStorage.setItem('kudoshistory_bookmarked', list_bookmarked);
    }

    // show the box with import/export options
    function importExport() {

        var importexport_bg = $('<div id="importexport-bg"></div>');

        var importexport_box = $('<div id="importexport-box"></div>');

        var box_button_save = $('<input type="button" id="importexport-button-save" value="Import seen list"></input>');
        box_button_save.click(function() {

            var confirmed = confirm('Sure you want to replace your seen list?');

            if (confirmed) {
                var new_seen_list = $('#import-seen-list').val();
                if (new_seen_list.length > 2000000) {
                    new_seen_list = new_seen_list.slice(0,1900000);
                }
                else if (new_seen_list == '') {
                    new_seen_list = ',';
                }
                list_seen = new_seen_list;
                localStorage.setItem('kudoshistory_seen', new_seen_list);

                $('#importexport-save').prepend('Seen list imported! ');
            }
        });

        var box_button_close = $('<input type="button" id="importexport-button-close" value="Close"></input>');
        box_button_close.click(function() {
            importexport_box.detach();
            importexport_bg.detach();
        });

        importexport_box.append(
            $('<p class="actions"></p>').append(box_button_close),
            $('<h3></h3>').text('Export your seen list'),
            $('<p></p>').text('Copy your current seen list from the field below and save it wherever you want as a backup.'),
            $('<input type="text" id="export-seen-list" />').val(localStorage.getItem('kudoshistory_seen')),
            $('<h3 style="margin-top: 1.5em;"></h3>').text('Import your seen list'),
            $('<p></p>').html('Put your saved seen list in the field below and select the "Import seen list" button. <strong>Warning:</strong> it will <u>replace</u> your current seen list.'),
            $('<input type="text" id="import-seen-list" />'),
            $('<p class="actions" id="importexport-save"></p>').append(box_button_save)
        );

        $('body').append(importexport_bg, importexport_box);
    }

    // add the seen/unseen buttons
    function addSeenButtons() {

        var seen_button1 = $('<li class="mark-seen"></li>').html('<a>Seen &check;</a>');
        var seen_button2 = seen_button1.clone();
        $('ul.actions').on('click', 'li.mark-seen', function() {
            debug && console.log('seen_button clicked');
            list_seen = localStorage.getItem('kudoshistory_seen');
            list_seen = ',' + work_id + list_seen;
            localStorage.setItem('kudoshistory_seen', list_seen);
            $('dl.work.meta.group').addClass('marked-seen');
            seen_button1.replaceWith(unseen_button1);
            seen_button2.replaceWith(unseen_button2);
        });

        var unseen_button1 = $('<li class="mark-unseen"></li>').html('<a>Unseen &cross;</a>');
        var unseen_button2 = unseen_button1.clone();
        $('ul.actions').on('click', 'li.mark-unseen', function() {
            debug && console.log('unseen_button clicked');
            list_seen = localStorage.getItem('kudoshistory_seen');
            list_seen = list_seen.replace(',' + work_id + ',', ',');
            localStorage.setItem('kudoshistory_seen', list_seen);
            $('dl.work.meta.group').removeClass('marked-seen');
            unseen_button1.replaceWith(seen_button1);
            unseen_button2.replaceWith(seen_button2);
        });

        if (is_seen == -1) {
            $('li.bookmark').after(seen_button1);
            $('#new_kudo').parent().after(seen_button2);
        }
        else {
            $('li.bookmark').after(unseen_button1);
            $('#new_kudo').parent().after(unseen_button2);
        }
    }

    // attach the menu
    function addSeenMenu() {

        // get the header menu
        var header_menu = $('ul.primary.navigation.actions');

        // create and insert menu button
        var seen_menu = $('<li class="dropdown"></li>').html('<a>Seen works</a>');
        header_menu.find('li.search').before(seen_menu);

        // create and append dropdown menu
        var drop_menu = $('<ul class="menu dropdown-menu"></li>');
        seen_menu.append(drop_menu);

        // create button - import/export seen list
        var button_importexport_seen = $('<li></li>').html('<a>Import/export your seen list</a>');
        button_importexport_seen.click(function() {importExport();});

        // create button - all works
        var button_all_works = $('<li></li>').html('<a style="padding: 0.5em 0.5em 0.25em; text-align: center; font-weight: bold;">&mdash; For all works on this page: &mdash;</a>');

        // create button - mark page as seen
        var button_page_seen = $('<li></li>').html('<a>Mark as seen</a>');
        button_page_seen.click(function() {markPageSeen();});

        // create button - mark page as unseen
        var button_page_unseen = $('<li></li>').html('<a>Unmark as seen</a>');
        button_page_unseen.click(function() {markPageUnseen();});

        // create button - re-check page for kudos
        var button_recheck_kudos = $('<li></li>').html('<a>Re-check for kudos</a>');
        button_recheck_kudos.click(function() {recheckKudos();});

        // create button - check page for bookmarks
        var button_check_bookmarks = $('<li></li>').html('<a>Check for bookmarks</a>');
        button_check_bookmarks.click(function() {checkForBookmarks();});

        // create button - settings
        var button_settings = $('<li></li>').html('<a style="padding: 0.5em 0.5em 0.25em; text-align: center; font-weight: bold;">&mdash; Settings (click to change): &mdash;</a>');

        // create button - don't hide seen works
        var button_hide_no = $('<li class="hide-no"></li>').html('<a>Hide seen works: NO</a>');
        drop_menu.on('click', 'li.hide-no', function() {
            localStorage.setItem('kudoshistory_hide', 'yes');
            hide_seen = 1;
            addCss(1);
            button_hide_no.replaceWith(button_hide_yes);
        });

        // create button - hide seen works
        var button_hide_yes = $('<li class="hide-yes"></li>').html('<a>Hide seen works: YES</a>');
        drop_menu.on('click', 'li.hide-yes', function() {
            localStorage.setItem('kudoshistory_hide', 'collapse');
            hide_seen = 2;
            addCss(1);
            button_hide_yes.replaceWith(button_hide_collapse);
        });

        // create button - collapse seen works
        var button_hide_collapse = $('<li class="hide-collapse"></li>').html('<a>Hide seen works: COLLAPSE</a>');
        drop_menu.on('click', 'li.hide-collapse', function() {
            localStorage.setItem('kudoshistory_hide', 'no');
            hide_seen = 0;
            addCss(1);
            button_hide_collapse.replaceWith(button_hide_no);
        });

        // create button - hightlight bookmarked
        var button_bmarked_yes = $('<li class="bmarked-yes"></li>').html('<a>Highlight bookmarked: YES</a>');
        drop_menu.on('click', 'li.bmarked-yes', function() {
            localStorage.setItem('kudoshistory_highlight_bookmarked', 'no');
            highlight_bookmarked = false;
            addCss(2);
            button_bmarked_yes.replaceWith(button_bmarked_no);
        });

        // create button - don't hightlight bookmarked
        var button_bmarked_no = $('<li class="bmarked-no"></li>').html('<a>Highlight bookmarked: NO</a>');
        drop_menu.on('click', 'li.bmarked-no', function() {
            localStorage.setItem('kudoshistory_highlight_bookmarked', 'yes');
            highlight_bookmarked = true;
            addCss(2);
            button_bmarked_no.replaceWith(button_bmarked_yes);
        });

        // create button - mark as seen on open
        var button_auto_yes = $('<li class="auto-yes"></li>').html('<a>Mark as seen on open: YES</a>');
        drop_menu.on('click', 'li.auto-yes', function() {
            localStorage.setItem('kudoshistory_autoseen', 'no');
            auto_seen = false;
            button_auto_yes.replaceWith(button_auto_no);
        });

        // create button - don't mark as seen on open
        var button_auto_no = $('<li class="auto-no"></li>').html('<a>Mark as seen on open: NO</a>');
        drop_menu.on('click', 'li.auto-no', function() {
            localStorage.setItem('kudoshistory_autoseen', 'yes');
            auto_seen = true;
            button_auto_no.replaceWith(button_auto_yes);
        });

        // append buttons to the dropdown menu
        drop_menu.append(button_importexport_seen, button_all_works, button_page_seen, button_page_unseen, button_recheck_kudos, button_check_bookmarks, button_settings);

        switch (hide_seen) {
            case 1:
                drop_menu.append(button_hide_yes);
                break;
            case 2:
                drop_menu.append(button_hide_collapse);
                break;
            default:
                drop_menu.append(button_hide_no);
        }

        if (highlight_bookmarked) {
            drop_menu.append(button_bmarked_yes);
        }
        else {
            drop_menu.append(button_bmarked_no);
        }

        if (auto_seen) {
            drop_menu.append(button_auto_yes);
        }
        else {
            drop_menu.append(button_auto_no);
        }
    }

    // add a notice about an update
    function addNotice() {

        var update_1_5 = "<h3>version 1.5</h3>\
			<p><b>&bull; Import/export your seen list.</b> A whole new world of possibilities available from the menu! Save your list just in case your browser derps. Or take it with you to a different browser. Or just cuddle it gently at night.</p>";

        var update_1_4 = "<h3>version 1.4</h3>\
			<p><b>&bull; Thinner stripes on the highlighted blurbs.</b> You're not crazy, they changed a bit.</p>\
			<p><b>&bull; Remembers when you bookmark a work.</b> Page through your bookmarks list once to make it remember the works you bookmarked previously (shhh just do it). You can turn off the highlighting in the menu.</p>";

        var last_version = parseFloat(localStorage.getItem('kudoshistory_lastver'));
        if (isNaN(last_version)) {last_version = 0;}

        if (last_version < current_version) {

            var update_notice = $('<div id="kudoshistory-update" class="notice"></div>');

            update_notice.append("<h3><b>Kudosed and seen history updated!</b></h3>");
            update_notice.append(update_1_5);
            if (last_version < 1.4) {update_notice.append(update_1_4);}
            update_notice.append("<p><a id='kudoshistory-hide-update'>Don't show this again</a></p>");

            $('#main').prepend(update_notice);

            $('#kudoshistory-hide-update').click(function() {
                localStorage.setItem('kudoshistory_lastver', current_version);
                $('#kudoshistory-update').detach();
            });
        }
    }

    // add css rules to page head
    function addCss(option) {
        var css_highlight = '.has-kudos,\
			.has-kudos.marked-seen {background: url("https://i.imgur.com/jK7d4jh.png") left no-repeat, url("https://i.imgur.com/ESdBCSX.png") left repeat-y !important; padding-left: 50px !important;}\
			.marked-seen {background: url("https://i.imgur.com/ESdBCSX.png") left repeat-y !important; padding-left: 50px !important;}\
			dl.is-bookmarked {background: url("https://i.imgur.com/qol1mWZ.png") right repeat-y !important; padding-right: 50px !important;}\
			dl.has-kudos.is-bookmarked,\
			dl.has-kudos.marked-seen.is-bookmarked {background: url("https://i.imgur.com/jK7d4jh.png") left no-repeat, url("https://i.imgur.com/ESdBCSX.png") left repeat-y, url("https://i.imgur.com/qol1mWZ.png") right repeat-y !important;}\
			dl.marked-seen.is-bookmarked {background: url("https://i.imgur.com/ESdBCSX.png") left repeat-y, url("https://i.imgur.com/qol1mWZ.png") right repeat-y !important;}\
			#kudoshistory-update {padding: 0.5em 1em 1em 1em;}\
			#importexport-box {position: fixed; top: 0px; bottom: 0px; left: 0px; right: 0px; width: 60%; height: 80%; max-width: 800px; margin: auto; overflow-y: auto; border: 10px solid #eee; box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2); padding: 0 20px; background-color: #ffffff; z-index: 999;}\
			#importexport-bg {position: fixed; width: 100%; height: 100%; background-color: #000000; opacity: 0.7; z-index: 998;}\
			#importexport-box input[type="button"] {height: auto;}\
			#importexport-box p.actions {float: none; text-align: right;}';
        var css_bookmarked = '.is-bookmarked {background: url("https://i.imgur.com/qol1mWZ.png") right repeat-y !important; padding-right: 50px !important;}\
			.has-kudos.is-bookmarked,\
			.has-kudos.marked-seen.is-bookmarked {background: url("https://i.imgur.com/jK7d4jh.png") left no-repeat, url("https://i.imgur.com/ESdBCSX.png") left repeat-y, url("https://i.imgur.com/qol1mWZ.png") right repeat-y !important;}\
			.marked-seen.is-bookmarked {background: url("https://i.imgur.com/ESdBCSX.png") left repeat-y, url("https://i.imgur.com/qol1mWZ.png") right repeat-y !important;}\
			.bookmark.is-bookmarked p.status {padding-right: 37px;}';
        var css_hide = '#main:not(.bookmarks-show) li.has-kudos,\
			#main:not(.bookmarks-show) li.marked-seen {display: none !important;}';
        var css_collapse = 'li.has-kudos h6.landmark.heading,\
			li.has-kudos > ul,\
			li.has-kudos blockquote.userstuff.summary,\
			li.has-kudos dl.stats,\
			li.has-kudos .header .fandoms.heading,\
			li.marked-seen h6.landmark.heading,\
			li.marked-seen > ul,\
			li.marked-seen blockquote.userstuff.summary,\
			li.marked-seen dl.stats,\
			li.marked-seen .header .fandoms.heading {display: none !important;}\
			li.has-kudos ul.required-tags,\
			li.marked-seen ul.required-tags {opacity: 0.6;}\
			li.has-kudos ul.required-tags li + li,\
			li.marked-seen ul.required-tags li + li {position: absolute; left: 56px; top: 0px;}\
			li.has-kudos ul.required-tags li + li + li,\
			li.marked-seen ul.required-tags li + li + li {left: 28px;}\
			li.has-kudos ul.required-tags li + li + li + li,\
			li.marked-seen ul.required-tags li + li + li + li {left: 84px; top: 0px;}\
			li.has-kudos .header,\
			li.marked-seen .header {min-height: 27px;}\
			li.has-kudos .header .heading,\
			li.marked-seen .header .heading {margin: 0.375em 5.25em 0px 121px;}';


        // add initial rules
        if (option == 0) {
            style.append(css_highlight);

            switch (hide_seen) {
                case 1:
                    style.append(css_hide);
                    break;
                case 2:
                    style.append(css_collapse);
            }

            if (highlight_bookmarked) {
                style.append(css_bookmarked);
            }
        }
        // change "hide_seen" setting
        else if (option == 1) {
            switch (hide_seen) {
                case 1:
                    style.append(css_hide);
                    break;
                case 2:
                    style.html(style.html().replace(css_hide, ''));
                    style.append(css_collapse);
                    break;
                default:
                    style.html(style.html().replace(css_collapse, ''));
            }
        }
        // change "highlight_bookmarked" setting
        else if (option == 2) {
            if (highlight_bookmarked) {
                style.append(css_bookmarked);
            }
            else {
                style.html(style.html().replace(css_bookmarked, ''));
            }
        }
    }
})(jQuery);
