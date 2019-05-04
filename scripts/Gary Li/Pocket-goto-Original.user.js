// ==UserScript==
// @name        Pocket-goto-Original
// @namespace   garyli.rocks
// @description Opens the original link instead of the pocket View! (please use Ctrl+click)
// @include     http://getpocket.com/*
// @include     https://getpocket.com/*
// @version     1.1
// ==/UserScript==

(function() {
    'use strict';

    $(document).ready(function(){
        // add a new style
        var style = $('<style> .original_new { font-weight: bold; color: green !important; } .original_new:hover {font-size: 1.2em !important; } </style>');
        $('html > head').append(style);
        
        $(document).on('mouseover', '.item_content', function() {
            var $this = $(this);
            
            // check whether already done
            if ($this.hasClass('original_converted')) {return;}
            
            // get the original url
            var $originalLink = $this.find('.original_url');
            var url = $originalLink.attr('href');
            var originalUrl = decodeURIComponent(url.replace("https://getpocket.com/redirect?url=", ""));
            originalUrl = originalUrl.replace(/&formCheck=.*$/, '');
            console.log(originalUrl);
            
            // update link href and styles
            $originalLink.attr('href', originalUrl).addClass('original_new');
            $this.find('a.item_link').attr('href', originalUrl);
            $this.find('a.title').attr('href', originalUrl).addClass('original_new');

            // mark this one as done
            $this.addClass('original_converted');
        });
    });
})();
