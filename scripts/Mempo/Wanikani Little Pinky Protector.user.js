// ==UserScript==
// @name        Wanikani Little Pinky Protector
// @namespace   Mempo
// @description Add another shortcut to enter an answer, so your pinky doesn't get too tired!
// @include     https://www.wanikani.com/review/session
// @include     http://www.wanikani.com/review/session
// @include     https://www.wanikani.com/lesson/session
// @include     http://www.wanikani.com/lesson/session
// @version     1
// @grant       none
// ==/UserScript==

jQuery(document).on('keydown', function (event)
  {
    if ($('#reviews').is(':visible'))
    {
      
      switch (event.keyCode) {
          
        case 165: // EDIT THIS CODE FOR CUSTOM SHORTCUT
          $("#answer-form form button").click();
          
          break;
      }
    }
  });