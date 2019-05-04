// ==UserScript==
// @name         Lynda.com Downloads
// @description  Add download links for videos on Lynda.com
// @version      0.1
// @author       mica
// @namespace    greasyfork.org/users/12559
// @match        *://www.lynda.com/*.html*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    $('<li>').append($('<a>')
        .one('click', downloads)
        .css('cursor', 'pointer')
        .html('Downloads'))
        .appendTo('#sidebar-nav');   
    function downloads() {
        $('<style>').html(`
        a.dl {
            transition: .3s ease all;
            color: #7bc3e3;
            font-size: x-large;
            text-decoration: underline;
            position: absolute;
            top: -9px;
        }
        a.dl:hover {
            color: #008cc9;
        }
        .current a.dl:hover {
            color: #fff;
        }
        .video-actions-cont {
            right: 20px;
        }`).appendTo('head');
        $.each($('a.video-name'), function(i) {
            var link = this;
            setTimeout(function() {
                $('<div>')
                    .attr('id', 'temp'+i)
                    .css('display', 'none')
                    .appendTo('body')
                    .load($(link).attr('href')+' video:first', function(r, status) {
                        if (status == 'success') {
                            $('<a>')
                                .on('click', function(e) {e.stopPropagation();})
                                .attr('href', $('#temp'+i+' video').attr('data-src'))
                                .attr('class', 'dl')
                                .attr('download','')
                                .html('&darr;')
                                .appendTo($(link).parent().parent().children('.video-actions-cont'));
                            $('#temp'+i).remove();
                        }
                    });
            }, 100 * i);
        });
    }
})();