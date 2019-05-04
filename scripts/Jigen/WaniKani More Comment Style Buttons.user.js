// ==UserScript==
// @name         WaniKani More Comment Style Buttons
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  try to take over the world!
// @author       You
// @match        https://community.wanikani.com/t/*
// @require      https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js?version=115012
// @icon          https://discourse-cdn-sjc1.com/business5/user_avatar/community.wanikani.com/daisukejigen/32/5701_2.png
// @grant        none
// ==/UserScript==

    var popoutOptions = true;
(function() {
    'use strict';
    var selectedText;
    waitForKeyElements (".d-editor-container", setupEditBar);
    // Your code here...
})();


clickOption = function(option){
    $('.d-editor-container [title="Options"]').click();
        //waitForKeyElements('.d-editor-button-bar .select-kit-body',function(){
    $('.d-editor-button-bar .select-kit-body').find('[data-value="' + option + '"]').click();
        //});
};
function setupEditBar(){
    var newButtons = [
        { title: 'Superscript', tag: "<sup>¥</sup>", class: "fa d-icon d-icon-chevron-up svg-icon svg-node", icon: 'chevron-up' },
      { title: 'Subscript', tag: "<sub>¥</sub>", class: "fa d-icon d-icon-chevron-down svg-icon svg-node", icon: 'chevron-down'  },
      { title: 'Strike', tag: "<s>¥</s>", class: "fa d-icon d-icon-minus svg-icon svg-node", icon: 'minus'  },
      { title: 'Underline', tag: "<i>¥</i>", class: "fa d-icon d-icon-bars svg-icon svg-node", icon: 'bars'  },
      { title: 'Keyboard', tag: "<kbd>¥</kbd>", class: "fa d-icon d-icon-key svg-icon svg-node", icon: 'key'  }
    ];
    //alert('hello');
    var lastButton = $('.d-editor-button-bar .d-editor-spacer:eq(0)').prev();
    $.each(newButtons,function(item,value){
        lastButton.after('<button title="' + value.title + '" class="btn no-text btn-icon ember-view customButton" data-tag="' + value.tag + '"><svg class="' + value.class + '" xmlns="http://www.w3.org/2000/svg"><use xlink:href="#' + value.icon + '"></use></svg>');
    });
    if(popoutOptions){
        var optionsButton = $('.d-editor-container [title="Options"]').parent();
        optionsButton.find('button').click();
        waitForKeyElements('.d-editor-button-bar .select-kit-body',function(){
            $.each(optionsButton.find('li'),function(item,value){
                debugger;
        optionsButton.after('<button title="' + $(value).data('name') + '" class="btn no-text btn-icon ember-view" onclick="clickOption(\'' + $(value).data('value') + '\')"><svg class="' + $(value).find('svg').attr('class') + '">' + $(value).find('svg').html() + '</svg></button>');
            });
        optionsButton.after('<div class="d-editor-spacer"></div>');
        });
        $('.d-editor-button-bar .select-kit-body').css('display','none');
        optionsButton.css('display','none');
    }
    $('.d-editor-button-bar button').click(function (e){
        $('.d-editor-container textarea').focus();
    });
    $('.customButton').click(function(){
        var activeEl = document.activeElement;
        var tags = $(this).data('tag').split('¥');
        $('.d-editor-container textarea').val([$('.d-editor-container textarea').val().slice(0, activeEl.selectionStart),
                                             tags[0], $('.d-editor-container textarea').val().slice(activeEl.selectionStart, activeEl.selectionEnd),
                                              tags[1],$('.d-editor-container textarea').val().slice(activeEl.selectionEnd)].join('')).trigger('change');
    });
}
