// ==UserScript==
// @name           DuoLessonsFix
// @include        https://www.duolingo.com/*
// @version        0.1
// @grant          none
// @description    This script pauses the timer between exercises in the timed practice.
// @author         FieryCat aka liuch, Editied by: Ryan Okushi
// @icon         http://arkadiuszolek.student.tcs.uj.edu.pl/greasemonkey/duolingo.png
// @license        MIT License
// @namespace https://github.com/liuch/duolingo-scripts
// ==/UserScript==


function inject(f) { //Inject the script into the document
    var script;
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.setAttribute('name', 'duolessonsfix');
    script.textContent = '(' + f.toString() + ')(jQuery)';
    document.head.appendChild(script);
}
inject(f);

function f($) {

    var orig_bind = null;
    var sess_obj  = null;
    var sess_used = false;

    var trs = {
        "Discuss sentence" : {
            "ru" : "Обсудить"
        }
    };
    function tr(t) {
        if (duo.user && duo.user.attributes.ui_language && trs[t] !== undefined && trs[t][duo.user.attributes.ui_language] != undefined)
            return trs[t][duo.user.attributes.ui_language];
        return t;
    }

    var next_f = function() {
        if (sess_obj && sess_obj.next_original) {
            if (sess_obj.timer_view && sess_obj.timer_view.paused)
                sess_obj.timer_view.resume();
            sess_obj.next_original.apply(sess_obj, arguments);
        }
    };

    var curr_discussion_index = -1;

    var show_discussion = function(v) {
        if (sess_obj && sess_obj.displayDiscussion && v.data.model.has("position")) {
            var model = v.data.model;
            model.set({position: v.data.idx});
            if (model.get("session_elements").length == 0) {
                var ta = model.get("session_elements");
                var es = model.get("session_element_solutions");
                for (var i = 0; i < es.length; i++)
                    ta.add(es[i][0]);
                model.set("session_elements", ta);
            }
            if (curr_discussion_index != v.data.idx) {
                $("#discussion-modal").remove();
                curr_discussion_index = v.data.idx;
            }
            sess_obj.displayDiscussion();
        }
    };

    var review_f = function() {
        var res;
        if (this.review_original) {
            sess_obj.loading_comments = false; // <-- It fixes the bug in the code of duolingo
            res = this.review_original(arguments);
            var inner = $("#review-page > div > .slide-in > ul > li > .popover > .inner");
            if (inner.length) {
                var es = this.model.get("session_element_solutions");
                var t, num, ds;
                for (var i = 0; i < inner.length; i++) {
                    t = es[i][0].get("type");
                    if (t && (t == "translate" || t == "listen" || t == "judge" || t == "form"))
                        if (inner.eq(i).find(".icon-link").length == 0) {
                            ds = tr("Discuss sentence");
                            num = es[i][0].get("num_comments");
                            if (num)
                                ds = ds + " (" + num + ")";
                            var o = $('<div><a href="javascript:;"><span class="icon icon-link" style="margin-right:5px;"/>' + ds + '</a></div>');
                            o.click({model: this.model, idx: i}, show_discussion);
                            inner.eq(i).append(o);
                        }
                }
            }
        }
        return res;
    };

    var hook = function() {
        var obj = arguments[1];
        if (typeof obj == "object") {
            var i = 0;
            if (typeof obj.quitSession == "function") {
                if (!obj.next_original && obj.next) {
                    obj.next_original = obj.next;
                    obj.next = next_f;
                    i++;
                }
            } else if (sess_obj && obj.className == "slide-session-end") {
                if (!obj.review_original && obj.showReviewModal) {
                    obj.review_original = obj.showReviewModal;
                    obj.showReviewModal = review_f;
                }
            }
            if (i) {
                sess_obj = obj;
            }
        }
        return orig_bind.apply(this, arguments);
    };

    var free_res = function() {
        sess_obj  = null;
        sess_used = false;
    };


    if (!orig_bind && _.bind) {
        orig_bind = _.bind;
        _.bind = hook;
    }

    var sol_url_reg = new RegExp("^/session_element_solutions/(skill_)?practice/.*");

    function start(e, r, o) {
        if (!duo)
            return;
        if (o.url == "/diagnostics/js_error")
            return;

        if (document.location.pathname == "/practice" || document.location.pathname.startsWith("/skill/")) {
            if (sess_obj)
                sess_used = true;

            if (sol_url_reg.exec(o.url)) {
                if (sess_obj && sess_obj.timer_view && !sess_obj.timer_view.paused) {
                    sess_obj.timer_view.pause();
                }
            }
        } else if (sess_used)
            free_res();

    }

    $(document).ajaxComplete(function(e, r, o) {
        start(e, r, o);
    });
}
