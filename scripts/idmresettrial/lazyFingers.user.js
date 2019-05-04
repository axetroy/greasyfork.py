// ==UserScript==
// @name         lazyFingers
// @version      0.3.4
// @description  Tính năng: hiện 1 số button khi bôi đen text
// @namespace    idmresettrial
// @author       idmresettrial
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
// @include      *
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_setClipboard
// @run-at       document-start
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);
// Do not run on frames or iframes
if (window.top !== window.self) {
    return;
}
document.addEventListener('DOMContentLoaded', function () {
    $('body').append('<div id="lazyFingers"></div>');
    $('head').append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
    $('head').append('<style>#lazyFingers{line-height:20px;z-index:999999;cursor:pointer;display:none;position:fixed;top:0;left:0;padding:0px 3px;border-radius:3px;background:#fdfefe;font-size:13px;color:#000;border:1px solid #ccc}#lazyFingers .lfbtn{display:table-cell;border-left:1px solid #ccc;padding:0px 5px;height:20px}#lazyFingers .lfbtn:hover{background:#f1f1f1}#lazyFingers .lfbtn.first-btn{border-left:none;margin-left:0px}#lazyFingers .lficon{line-height:13px;color:#333;position:relative;top:50%;transform:translateY(-50%)}#lazyFingers .lficon i{font-family:FontAwesome !important}#divLookup{visibility:hidden;}</style>');
    //
    var copyMe = '';
    var textarea = '';
    var body_mouseup = true;
    var buttons_selector = [
    ];
    var lazyFingers_html = '';
    var buttons = {
        copy: {
            css: 'fa fa-files-o',
            txt: '',
            do : function () {
                clearTextSelection();
                GM_setValue('copyMe', copyMe);
                GM_setClipboard(copyMe);
            },
            check2show: function (t, e) {
                return t.length > 0;
            }
        },
        paste: {
            css: 'fa fa-clipboard',
            txt: '',
            do : function () {
                insertAtCursor(textarea, GM_getValue('copyMe', ''));
            },
            check2show: function (t, e) {
                return e;
            }
        },
        openlink: {
            css: 'fa fa-link',
            txt: '',
            do : function () {
                var url = copyMe.match(/([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?\S*/gi);
                for (i = 0; i < url.length; i++) {
                    var http = (url[i].indexOf('http') !== 0) ? 'http://' : '';
                    window.open(http + url[i]);
                }
            },
            check2show: function (t, e) {
                return (/([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?\S*/gi).test(t);
            }
        },
        searchGG: {
            css: 'fa fa-search',
            txt: '',
            do : function () {
                window.open('https://www.google.com/?gws_rd=ssl#q=' + copyMe);
            },
            check2show: function (t, e) {
                return t.length > 0;
            }
        },
        searchYT: {
            css: 'fa fa-youtube-play',
            txt: '',
            do : function () {
                window.open('https://www.youtube.com/results?search_query=' + copyMe);
            },
            check2show: function (t, e) {
                return t.length > 0;
            }
        },
        searchZING: {
            css: 'fa fa-music',
            txt: '',
            do : function () {
                window.open('http://mp3.zing.vn/tim-kiem/bai-hat.html?q=' + copyMe);
            },
            check2show: function (t, e) {
                return t.length > 0;
            }
        },
        linksvip: {
            css: '',
            txt: 'Linksvip',
            do : function () {
                window.open('http://linksvip.net/?link=' + copyMe + '&ref=idmresettrial');
            },
            check2show: function (t, e) {
                return (/fshare.vn\/file/i).test(t);
            }
        },
        divLookup: {
            css: '',
            txt: 'Dịch nhanh',
            do : function () {
                var e = document.createEvent('MouseEvents');
                e.initEvent('mouseover', true, true);
                $('#divLookup') [0].dispatchEvent(e);
            },
            check2show: function (t, e) {
                var head = document.head.innerHTML;
                return t.length && /a.gootranslink/.test(head) && /Left.png/.test(head);
            },
            do_more: function () {
                var e = document.createEvent('MouseEvents');
                e.initEvent('mouseover', true, true);
                $('#divLookup') [0].dispatchEvent(e);
            }
        },
    };
    /**/
    $('html').on('mouseup', 'body', function (e) {
        if (body_mouseup) mu(e);
    });
    $('html').on('mouseup', 'textarea,input', function (e) {
        body_mouseup = false;
        mu(e, this);
        setTimeout(function () {
            body_mouseup = true;
        }, 500);
    });
    //
    $('html').on('keydown', 'textarea,input', function () {
        $('#lazyFingers').hide();
    });
    for (i = 0; i < Object.keys(buttons).length; i++) {
        lazyFingers_html += '<div id="' + Object.keys(buttons) [i] + '-btn" class="lfbtn" ><div class="lficon"><i class="' + buttons[Object.keys(buttons) [i]].css + '"></i><span>' + buttons[Object.keys(buttons) [i]].txt + '</span></div></div>';
        buttons_selector[buttons_selector.length] = '#' + Object.keys(buttons) [i] + '-btn';
    }
    buttons_selector = buttons_selector.join(',');
    $('#lazyFingers').append(lazyFingers_html);
    $('html').on('mouseup', buttons_selector, function (e) {
        var button = e.target.parentElement.parentElement.id.replace('-btn', '');
        body_mouseup = false;
        buttons[button].do ();
        disappear();
        setTimeout(function () {
            body_mouseup = true;
        }, 500);
    });
    //
    $('html').on('mouseover', '#divLookup-btn', function () {
        disappear();
        buttons.divLookup.do_more();
    });
    //
    function display(e, show_what) {
        clearDisplay();
        $('#lazyFingers').css({
            'left': e.clientX + 5,
            'top': e.clientY + 5
        });
        show_what.sort(function (a, b) {
            return Object.keys(buttons).indexOf(a) - Object.keys(buttons).indexOf(b);
        });
        $(show_what.map(function (val) {
            return '#' + val + '-btn';
        }).join(',')).css('display', 'table-cell');
        $('.first-btn').removeClass('first-btn');
        $('#lazyFingers .lfbtn[style*="display: table-cell"]').first().addClass('first-btn');
        $('#lazyFingers').fadeIn(200);
    }
    function disappear() {
        $('#lazyFingers').hide();
    }
    function clearDisplay() {
        $('#lazyFingers, #lazyFingers .lfbtn').hide();
    }
    function mu(e, el) {
        setTimeout(function() {
            
            var show_what = [
            ];
            var txt = '';
            var editable = (typeof el !== 'undefined');
            var displayBtn = false;
            if (editable) {
                txt = getSelectedText2(el);
                textarea = el;
            } else {
                txt = getSelectedText1();
            }
            for (i = 0; i < Object.keys(buttons).length; i++) {
                if (buttons[Object.keys(buttons) [i]].check2show(txt, editable)) {
                    show_what[show_what.length] = Object.keys(buttons) [i];
                    displayBtn = true;
                }
            }
            copyMe = txt;
            if (displayBtn) {
                display(e, show_what);
            } 
            else $('#lazyFingers').hide();
            
        }, 100);
    }
    function getSelectedText1() {
        if (window.getSelection) {
            return window.getSelection().toString();
        } else if (document.selection) {
            return document.selection.createRange().text;
        }
        return '';
    }
    function getSelectedText2(textComponent)
    {
        var selectedText;
        // IE version
        if (document.selection !== undefined)
        {
            textComponent.focus();
            var sel = document.selection.createRange();
            selectedText = sel.text;
        }
        // Mozilla version
        else if (textComponent.selectionStart !== undefined)
        {
            var startPos = textComponent.selectionStart;
            var endPos = textComponent.selectionEnd;
            selectedText = textComponent.value.substring(startPos, endPos);
        }
        return selectedText;
    }
    function clearTextSelection() {
        if (window.getSelection) {
            if (window.getSelection().empty) { // Chrome
                window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges) { // Firefox
                window.getSelection().removeAllRanges();
            }
        } else if (document.selection) { // IE?
            document.selection.empty();
        }
    }
    function insertAtCursor(myField, myValue) {
        //IE support
        if (document.selection) {
            myField.focus();
            sel = document.selection.createRange();
            sel.text = myValue;
        }
        //MOZILLA and others
        else if (myField.selectionStart || myField.selectionStart == '0') {
            var startPos = myField.selectionStart;
            var endPos = myField.selectionEnd;
            myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
        } else {
            myField.value += myValue;
        }
    }
});