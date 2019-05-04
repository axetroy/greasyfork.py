// ==UserScript==
// @name        Wanikani Double-Check
// @namespace   wkdoublecheck
// @description Allows retyping typo'd answers, or marking wrong when WK's typo tolerance is too lax.
// @include     https://www.wanikani.com/review/session*
// @version     2.2.4
// @author      Robin Findley
// @copyright   2017+, Robin Findley
// @license     MIT; http://opensource.org/licenses/MIT
// @run-at      document-end
// @grant       none
// ==/UserScript==

// CREDITS: This is a replacement for an original script by Wanikani user @Ethan.
// Ethan's script stopped working due to some Wanikani changes.  The code below is
// 100% my own, but it closely replicates the functionality of Ethan's original script.

// HOTKEYS:
//   "+"      - Marks answer as 'correct'.
//   "-"      - Marks answer as 'incorrect'.
//   "Escape" or "Backspace" - Resets question, allowing you to retype.

// SEE SETTINGS BELOW.

window.doublecheck = {};

(function(gobj) {

    /* global $, wkof, additionalContent, answerChecker, lastItems, Srs */

    var settings;

    wkof.include('Menu,Settings');
    wkof.ready('document,Menu,Settings').then(setup);

    //------------------------------------------------------------------------
    // setup() - Set up the menu link and default settings.
    //------------------------------------------------------------------------
    function setup() {
        wkof.Menu.insert_script_link({name:'doublecheck',submenu:'Settings',title:'Double-Check',on_click:open_settings});

        var defaults = {
            allow_retyping: true,
            allow_change_correct: false,
            allow_change_incorrect: false,
            typo_action: 'ignore',
            delay_wrong: true,
            delay_multi_meaning: false,
            delay_slightly_off: false,
            delay_period: 1.5,
            show_lightning_button: true,
            lightning_enabled: false,
            srs_msg_period: 1.2,
            autoinfo_correct: false,
            autoinfo_incorrect: false,
            autoinfo_multi_meaning: false,
            autoinfo_slightly_off: false
        }
        return wkof.Settings.load('doublecheck', defaults)
            .then(init_ui.bind(null, true /* first_time */));
    }

    //------------------------------------------------------------------------
    // open_settings() - Open the Settings dialog.
    //------------------------------------------------------------------------
    function open_settings() {
        var dialog = new wkof.Settings({
            script_id: 'doublecheck',
            title: 'Double-Check Settings',
            on_save: init_ui,
            content: {
                tabAnswers: {type:'page',label:'Answers',content:{
                    grpChangeAnswers: {type:'group',label:'Change Answer',content:{
                        allow_retyping: {type:'checkbox',label:'Allow retyping answer',default:true,hover_tip:'When enabled, you can retype your answer by pressing Escape or Backspace.'},
                        allow_change_correct: {type:'checkbox',label:'Allow changing to "correct"',default:true,hover_tip:'When enabled, you can change your answer\nto "correct" by pressing the "+" key.'},
                        allow_change_incorrect: {type:'checkbox',label:'Allow changing to "incorrect"',default:true,hover_tip:'When enabled, you can change your answer\nto "incorrect" by pressing the "-" key.'},
                    }},
                    grpTypos: {type:'group',label:'Typos',content:{
                        typo_action: {type:'dropdown',label:'Action for typos',default:'ignore',content:{ignore:'Ignore',warn:'Warn/shake',wrong:'Mark wrong'},hover_tip:'Choose an action to take when answer contains typos.'},
                    }},
                }},
                tabMistakeDelay: {type:'page',label:'Mistake Delay',content:{
                    grpDelay: {type:'group',label:'Delay Next Question',content:{
                        delay_wrong: {type:'checkbox',label:'Delay when wrong',default:true,refresh_on_change:true,hover_tip:'If your answer is wrong, you cannot advance\nto the next question for at least N seconds.'},
                        delay_multi_meaning: {type:'checkbox',label:'Delay when multiple meanings',default:false,hover_tip:'If the item has multiple meanings, you cannot advance\nto the next question for at least N seconds.'},
                        delay_slightly_off: {type:'checkbox',label:'Delay when answer has typos',default:false,hover_tip:'If your answer contains typos, you cannot advance\nto the next question for at least N seconds.'},
                        delay_period: {type:'number',label:'Delay period (in seconds)',default:1.5,hover_tip:'Number of seconds to delay before allowing\nyou to advance to the next question.'},
                    }},
                }},
                tabLightning: {type:'page',label:'Lightning',content:{
                    grpLightning: {type:'group',label:'Lightning Mode',content:{
                        show_lightning_button: {type:'checkbox',label:'Show "Lightning Mode" button',default:true,hover_tip:'Show the "Lightning Mode" toggle\nbutton on the review screen.'},
                        lightning_enabled: {type:'checkbox',label:'Enable "Lightning Mode"',default:true,refresh_on_change:true,hover_tip:'Enable "Lightning Mode", which automatically advances to\nthe next question if you answer correctly.'},
                        srs_msg_period: {type:'number',label:'SRS popup time (in seconds)',default:1.2,min:0,hover_tip:'How long to show SRS up/down popup when in lightning mode.  (0 = don\'t show)'},
                    }},
                }},
                tabAutoInfo: {type:'page',label:'Item Info',content:{
                    grpAutoInfo: {type:'group',label:'Show Item Info',content:{
                        autoinfo_correct: {type:'checkbox',label:'After correct answer',default:false,hover_tip:'Automatically show the Item Info after correct answers.', validate:validate_autoinfo_correct},
                        autoinfo_incorrect: {type:'checkbox',label:'After incorrect answer',default:false,hover_tip:'Automatically show the Item Info after incorrect answers.', validate:validate_autoinfo_incorrect},
                        autoinfo_multi_meaning: {type:'checkbox',label:'When multiple meanings',default:false,hover_tip:'Automatically show the Item Info when an item has multiple meanings.', validate:validate_autoinfo_correct},
                        autoinfo_slightly_off: {type:'checkbox',label:'When answer has typos',default:false,hover_tip:'Automatically show the Item Info when your answer has typos.', validate:validate_autoinfo_correct},
                    }},
                }},
            }
        });
        dialog.open();
    }

    //------------------------------------------------------------------------
    // validate_autoinfo_correct() - Notify user if iteminfo and lightning are both enabled.
    //------------------------------------------------------------------------
    function validate_autoinfo_correct(enabled) {
        if (enabled && settings.lightning_enabled) {
            return 'Disable "Lightning Mode"!';
        }
    }

    //------------------------------------------------------------------------
    // validate_autoinfo_incorrect() - Notify user if iteminfo and lightning are both enabled, and wrong_delay disabled.
    //------------------------------------------------------------------------
    function validate_autoinfo_incorrect(enabled) {
        if (enabled && settings.lightning_enabled && !settings.delay_wrong) {
            return 'Disable "Lightning Mode", or<br>enable "Delay when wrong"!';
        }
    }

    //------------------------------------------------------------------------
    // init_ui() - Initialize the user interface.
    //------------------------------------------------------------------------
    var first_time = true;
    function init_ui() {
        settings = wkof.settings.doublecheck;

        if (first_time) {
            first_time = false;
            startup();
        }

        // Migrate 'lightning' setting from localStorage.
        var lightning = localStorage.getItem('lightning');
        if (lightning === 'false' || lightning === 'true') {
            localStorage.removeItem('lightning');
            settings.lightning_enabled = lightning;
            wkof.Settings.save('doublecheck');
        }

        // Initialize the Lightning Mode button.
        if (settings.lightning_enabled) {
            $('#lightning-mode').addClass('active');
        } else {
            $('#lightning-mode').removeClass('active');
        }
        $('#lightning-mode').prop('hidden', !settings.show_lightning_button);

        setClass('#option-double-check', 'hidden', !(settings.allow_change_correct || settings.allow_change_incorrect));
        setClass('#option-retype', 'hidden', !settings.allow_retyping);
        resize_buttons();

        if (state === 'second_submit') {
            setClass('#option-double-check', 'disabled', !(
                (new_answer.passed && settings.allow_change_incorrect) || (!new_answer.passed && settings.allow_change_correct)
            ));
            setClass('#option-retype', 'disabled', !settings.allow_retyping);
        }
    }

    var old_submit_handler, old_answer_checker, ignore_submit = false, state = 'first_submit', play_audio, show_srs, srs_load;
    var item, itype, item_id, item_status, qtype, valid_answers, wrong_cnt, question_cnt, completed_cnt, answer, new_answer;

    //------------------------------------------------------------------------
    // lightning_clicked() - Lightning button handler.
    //------------------------------------------------------------------------
    function lightning_clicked() {
        settings.lightning_enabled = !settings.lightning_enabled;
        wkof.Settings.save('doublecheck');
        $('#lightning-mode').toggleClass('active', settings.lightning_enabled);
        return false;
    }

    //------------------------------------------------------------------------
    // toggle_result() - Toggle an answer from right->wrong or wrong->right.
    //------------------------------------------------------------------------
    function toggle_result(new_state) {
        if (new_state === 'toggle') new_state = (new_answer.passed ? 'incorrect' : 'correct');
        if (state !== 'second_submit') return false;
        switch (new_state) {
            case 'correct':
                if (!settings.allow_change_correct || new_answer.passed) return false;
                new_answer = {passed:true, accurate:true, multipleAnswers:false, exception:false};
                set_answer_state(new_answer, false /* show_msgs */);
                break;
            case 'incorrect':
                if (!settings.allow_change_incorrect || !new_answer.passed) return false;
                new_answer = {passed:false, accurate:false, multipleAnswers:false, exception:false};
                set_answer_state(new_answer, false /* show_msgs */);
                break;
            case 'retype':
                if (!settings.allow_retyping) return false;
                set_answer_state({reset:true}, false /* show_msgs */);
                break;
        }
    }

    //------------------------------------------------------------------------
    // do_delay() - Disable the submit button briefly to prevent clicking past wrong answers.
    //------------------------------------------------------------------------
    function do_delay() {
        ignore_submit = true;
        setTimeout(function() {
            ignore_submit = false;
        }, settings.delay_period*1000);
    }

    //------------------------------------------------------------------------
    // return_new_answer() - Alternate answer checker that overrides our results.
    //------------------------------------------------------------------------
    function return_new_answer() {
        return new_answer;
    }

    //------------------------------------------------------------------------
    // set_answer_state() - Update the screen to show results of answer-check.
    //------------------------------------------------------------------------
    function set_answer_state(answer, show_msgs, no_redraw) {
        // If user requested to retype answer, reset the question.
        if (answer.reset) {
            $.jStorage.set('wrongCount', wrong_cnt);
            $.jStorage.set('questionCount', question_cnt);
            $.jStorage.set('completedCount', completed_cnt);
            $.jStorage.set('currentItem', item);
            $("#answer-exception").remove();
            $('#option-double-check').addClass('disabled').find('span').attr('title','Mark Right').find('i').attr('class','icon-thumbs-up');
            $('#option-retype').addClass('disabled');
            Srs.remove();
            state = 'first_submit';
            return;
        }

        // If answer is invalid for some reason, do the shake thing.
        if (answer.exception) {
            $("#answer-exception").remove();
            if (!$("#answer-form form").is(":animated")) {
                $("#reviews").css("overflow-x", "hidden");
                var xlat = {onyomi:"on'yomi", kunyomi:"kun'yomi", nanori:"nanori"};
                var emph = xlat[item.emph];
                $("#answer-form form").effect("shake", {}, 300, function() {
                    $("#reviews").css("overflow-x", "visible");
                    if (!answer.accurate && $('#user-response').val() !== '') {
                        if (!answer.bad_input && qtype === 'reading') {
                            $("#answer-form form").append($('<div id="answer-exception" class="answer-exception-form"><span>WaniKani is looking for the '+emph+" reading</span></div>").addClass("animated fadeInUp"));
                        } else if (settings.typo_action==='warn') {
                            $("#answer-form form").append($('<div id="answer-exception" class="answer-exception-form"><span>Your answer was a bit off. Check the meaning to make sure you are correct.</span></div>').addClass("animated fadeInUp"));
                        }
                    }
                }).find("input").focus();
            }
            return;
        }

        // Draw 'correct' or 'incorrect' results, enable Double-Check button, and calculate updated statistics.
        var new_wrong_cnt = wrong_cnt, new_completed_cnt = completed_cnt;
        $("#user-response").blur();
        if (settings.allow_retyping) $('#option-retype').removeClass('disabled');
        var new_status = Object.assign({},item_status);
        var dblchk = $('#option-double-check');
        var retype = $('#option-retype');
        setClass(retype, 'disabled', !settings.allow_retyping);
        if (answer.passed) {
            if (no_redraw !== true) {
                $("#answer-form fieldset").removeClass('incorrect').addClass("correct");
                dblchk.find('span').attr('title','Mark Wrong').find('i').attr('class','icon-thumbs-down');
            }
            setClass(dblchk, 'disabled', !settings.allow_change_incorrect);
            if (qtype === 'meaning') {
                new_status.mc = (new_status.mc || 0) + 1;
            } else {
                new_status.rc = (new_status.rc || 0) + 1;
            }
        } else {
            $("#answer-form fieldset").removeClass('correct').addClass("incorrect");
            dblchk.find('span').attr('title','Mark Right').find('i').attr('class','icon-thumbs-up');
            setClass(dblchk, 'disabled', !settings.allow_change_correct);
            new_wrong_cnt++;
        }
        if ((itype === 'r' || ((new_status.rc || 0) >= 1)) && ((new_status.mc || 0) >= 1)) {
            new_completed_cnt++;
            if (show_srs) {
                if (settings.lightning_enabled) {
                    if (settings.srs_msg_period > 0) {
                        var status = Object.assign({},new_status);
                        var srs = item.srs;
                        setTimeout(Srs.load.bind(Srs, status, srs), 100);
                        setTimeout(Srs.remove, settings.srs_msg_period * 1000);
                    }
                } else {
                    Srs.load(new_status,item.srs);
                }
            }
        }
        $.jStorage.set('wrongCount', new_wrong_cnt);
        $.jStorage.set('questionCount', question_cnt + 1);
        $.jStorage.set('completedCount', new_completed_cnt);
        if (no_redraw !== true) {
            $("#user-response").prop("disabled", !0);
        }

        // We've removed the audio play from enableButtons() so we can control playback.
        // Here, we are installing the audio, but telling it not to play yet.
        additionalContent.enableButtons();
        play_audio(false);

        // Now that the audio is installed, move it so WK doesn't delete it upon submitting an answer.
        $('body').prepend($('audio'));

        // And finally, play the audio (if autoplay is enabled).
        if (window.audioAutoplay && answer.passed) $('audio').trigger('play');

        lastItems.disableSessionStats();
        $("#answer-exception").remove();

        // Open item info, depending on settings.
        var showing_info = false;
        if (answer.passed && !settings.lightning_enabled &&
            (settings.autoinfo_correct ||
             (settings.autoinfo_slightly_off && !answer.accurate) ||
             (settings.autoinfo_multi_meaning && answer.multipleAnswers)
            )) {
            showing_info = true;
            $('#option-item-info').click();
        } else if (!answer.passed && !(settings.lightning_enabled && !settings.delay_wrong) && settings.autoinfo_incorrect) {
            showing_info = true;
            $('#option-item-info').click();
        }

        // When user is submitting an answer, display the on-screen message that Wanikani normally shows.
        if (show_msgs) {
            var msg;
            if (answer.passed) {
                if (!answer.accurate) {
                    msg = 'Your answer was a bit off. Check the '+qtype+' to make sure you are correct';
                } else if (answer.multipleAnswers) {
                    msg = 'Did you know this item has multiple possible '+qtype+'s?';
                }
            } else {
                msg = 'Need help? View the correct '+qtype+' and mnemonic';
            }
            if (msg) {
                if (showing_info) {
                    $("#information").prepend($('<div id="answer-exception" style="top:0;"><span>'+msg+'</span></div>').addClass("animated fadeInUp"));
                } else {
                    $("#additional-content").append($('<div id="answer-exception"><span>'+msg+'</span></div>').addClass("animated fadeInUp"));
                }
            }
        }
    }

    //------------------------------------------------------------------------
    // setClass() - Add or remove a class based on the 'enabled' state.
    //------------------------------------------------------------------------
    function setClass(elem, classname, enabled) {
        if (typeof elem === 'string') elem = $(elem);
        if (enabled) {
            elem.addClass(classname)
        } else {
            elem.removeClass(classname);
        }
    }

    //------------------------------------------------------------------------
    // new_submit_handler() - Intercept handler for 'submit' button.  Overrides default behavior as needed.
    //------------------------------------------------------------------------
    function new_submit_handler(e) {
        var fast_forward = false;

        // Don't process 'submit' if we are ignoring temporarily (to prevent double-tapping past important info)
        if (ignore_submit) {
            // If the user presses <enter> during delay period,
            // WK enables the user input field, which makes Item Info not work.
            // Let's make sure the input field is disabled.
            setTimeout(function(){
                $("#user-response").prop('disabled',!0);
            },1);
            return false;
        }

        // For more information about the state machine below,
        // see the "Theory of operation" info at the top of the script.
        switch(state) {
            case 'first_submit':
                // We intercept the first 'submit' click, and simulate normal Wanikani screen behavior.
                state = 'second_submit';

                // Capture the state of the system before submitting the answer.
                item = $.jStorage.get('currentItem');
                itype = (item.rad ? 'r' : (item.kan ? 'k' : 'v'));
                item_id = itype + item.id;
                item_status = $.jStorage.get(item_id) || {};
                qtype = $.jStorage.get('questionType');
                wrong_cnt = $.jStorage.get('wrongCount');
                question_cnt = $.jStorage.get('questionCount');
                completed_cnt = $.jStorage.get('completedCount');
                show_srs = $.jStorage.get('r/srsIndicator');

                // Ask Wanikani if the answer is right (but we don't actually submit the answer).
                answer = old_answer_checker(qtype, $("#user-response").val());

                // Update the screen to reflect the results of our checked answer.
                $("html, body").animate({scrollTop: 0}, 200);
                new_answer = Object.assign({},answer);

                var text = $('#user-response').val();
                if ((qtype === 'reading' && answerChecker.isNonKanaPresent(text)) ||
                    (qtype === 'meaning' && answerChecker.isKanaPresent(text)) ||
                    (text === '')) {
                    answer.exception = true;
                    answer.bad_input = true;
                }

                // Close but no cigar
                if (answer.passed && !answer.accurate) {
                    switch (settings.typo_action) {
                        case 'warn': answer.exception = true; break;
                        case 'wrong': answer.passed = false; break;
                    }
                }

                if (answer.exception) {
                    set_answer_state(answer, true /* show_msgs */);
                    state = 'first_submit';
                    return false;
                }

                // Optionally (according to settings), temporarily ignore any additional clicks on the
                // 'submit' button to prevent the user from clicking past important info about the answer.
                if ((!answer.passed && settings.delay_wrong) ||
                    (answer.passed &&
                     ((!answer.accurate && settings.delay_slightly_off) || (answer.multipleAnswers && settings.delay_multi_meaning))
                    )
                   )
                {
                    set_answer_state(answer, true /* show_msgs */);
                    do_delay();
                    return false;
                } else {
                    set_answer_state(answer, true /* show_msgs */, settings.lightning_enabled /* no_redraw */);
                    if (settings.lightning_enabled) fast_forward = true;
                }

                if (!fast_forward) return false;
                /* no break */
                // eslint-disable-line no-fallthrough

            case 'second_submit':
                // We intercepted the first submit, allowing the user to optionally modify their answer.
                // Now, either the user has clicked submit again, or lightning is enabled and we are automatically clicking submit again.
                // Since Wanikani didn't see the first submit (because we intercepted it), now we need to simulate two submits for Wanikani:
                //   1. One for Wanikani to check the (possibly corrected) result, and
                //   2. One for Wanikani to move on to the next question.

                // Reset the screen to pre-submitted state, so Wanikani won't get confused when it tries to process the answer.
                // Wanikani code will then update the screen according to our forced answer-check result.
                $('#option-double-check').addClass('disabled').find('span').attr('title','Double-Check').find('i').attr('class','icon-thumbs-up');
                $('#option-retype').addClass('disabled');
                $('#user-response').removeAttr('disabled');
                $('#option-audio audio').remove();
                $.jStorage.set('wrongCount', wrong_cnt);
                $.jStorage.set('questionCount', question_cnt);
                $.jStorage.set('completedCount', completed_cnt);

                // Prevent WK from posting a second SRS notice.
                srs_load = Srs.load;
                Srs.load = function(){};

                // This is the first submit actually forwarded to Wanikani.
                // It will check our (possibly corrected) answer.
                var result = old_submit_handler.apply(this, arguments);

                // This is hidden third click from above, which Wanikani thinks is the second click.
                // Wanikani will move to the next question.
                state = 'first_submit';

                // We need to disable the input field, so Wanikani will see this as the second click.
                $('#user-response').attr('disabled','disabled');

                // Restore the SRS message function, which we disabled in second_submit above.
                Srs.load = srs_load;

                // This is the second submit actually forwarded to Wanikani.
                // It will move on to the next question.
                return old_submit_handler.apply(this, arguments);

            default:
                return false;
        }

        return false;
    }

    //------------------------------------------------------------------------
    // Resize the buttons according to how many are visible.
    //------------------------------------------------------------------------
    function resize_buttons() {
        var buttons = $('#additional-content ul>li');
        var btn_count = buttons.length - buttons.filter('.hidden,[hidden]').length;
        $('#additional-content ul > li').css('width',Math.floor(9900/btn_count)/100 + '%');
    }

    //------------------------------------------------------------------------
    // External hook for @polv's script, "WaniKani Disable Default Answers"
    //------------------------------------------------------------------------
    gobj.set_state = function(_state) {
        state = _state;
    };

    //------------------------------------------------------------------------
    // startup() - Install our intercept handlers, and add our Double-Check button and hotkey
    //------------------------------------------------------------------------
    function startup() {
        // Disconnect the audio player so we can control it manually.
        if (additionalContent.audio) {
            play_audio = additionalContent.audio;
            additionalContent.audio = function(){};
        }

        // Check if we can intercept the submit button handler.
        try {
            old_submit_handler = $._data( $('#answer-form button')[0], 'events').click[0].handler;
            old_answer_checker = answerChecker.evaluate;
        } catch(err) {}
        if (typeof old_submit_handler !== 'function' || typeof old_answer_checker !== 'function') {
            alert('Wanikani Double-Check script is not working.');
            return;
        }

        // Replace the handler.
        $._data( $('#answer-form button')[0], 'events').click[0].handler = new_submit_handler;

        // Install the Lightning Mode button.
        $('head').append('<style>#lightning-mode.active {color:#ff0; opacity:1.0;}</style>');
        $('#summary-button').append('<a id="lightning-mode" href="#" hidden ><i class="icon-bolt" title="Lightning Mode - When enabled, auto-\nadvance after answering correctly."></i></a>');
        $('#lightning-mode').on('click', lightning_clicked);

        // Install the Double-Check features.
        $('#additional-content ul').css('text-align','center').append(
            '<li id="option-double-check" class="disabled"><span title="Double Check"><i class="icon-thumbs-up"></i></span></li>'+
            '<li id="option-retype" class="disabled"><span title="Retype"><i class="icon-undo"></i></span></li></ul>'
        );
        $('#option-double-check').on('click', toggle_result.bind(null,'toggle'));
        $('#option-retype').on('click', toggle_result.bind(null,'retype'));
        $('body').on('keypress', function(event){
            if (event.which === 43) toggle_result('correct');
            if (event.which === 45) toggle_result('incorrect');
            return true;
        });
        $('body').on('keydown', function(event){
            if ((event.which === 27 || event.which === 8) &&
                (state !== 'first_submit') &&
                (event.target.nodeName === 'BODY') &&
                (!document.querySelector('#wkofs_doublecheck')))
            {
                toggle_result('retype');
            } else if (event.ctrlKey && event.key === 'l') {
                lightning_clicked();
                return false;
            }
            return true;
        });
        $('head').append(
            '<style>'+
            '#additional-content>ul>li.hidden {display:none;}'+
            '</style>');
        answerChecker.evaluate = return_new_answer;
    }

})(window.doublecheck);