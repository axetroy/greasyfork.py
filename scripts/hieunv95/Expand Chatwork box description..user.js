// ==UserScript==
// @name Expand Chatwork box description.
// @namespace Chatwork
// @description Expand Chatwork box description
// @icon https://appdata.chatwork.com/avatar/1311/1311129.png
// @run-at document-start
// @match *://www.chatwork.com/*
// @grant none
// @version 0.0.1.20190120093019
// ==/UserScript==

document.addEventListener("DOMContentLoaded", function(event) {
    setTimeout(function () {
        $(function () {
          $('.roomDescription__body').click(function () {
            $('#_subRoomDescriptionWrapper').height('100%');
          });
      
          $('.roomInformationContent').css('padding-right', '0 !important')
             .css('width', '100% !important');

          $('#_subRoomDescriptionWrapper').on('mouseout mousemove', function () {
            $('_subContentArea').css('overflow-y', 'scroll');
            $('#_subContentArea').css('overflow-y', 'scroll');
            $('.roomDescription__description').css('padding-right', '0 !important');
            $('#_subContentArea').css('padding-right', '0 !important').css('width', '100% !important');
          });
          
          $('#_subRoomDescriptionWrapper').on('hover', function () {
            $('#_subContentArea').css('padding-right', '0 !important');
            $(this).css('padding-right', '0 !important');
          });
       });
    }, 5000);
});
