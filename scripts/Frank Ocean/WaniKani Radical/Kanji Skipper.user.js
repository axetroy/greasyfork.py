// ==UserScript==
// @name         WaniKani Radical/Kanji Skipper
// @namespace    https://www.wanikani.com/
// @version      0.1
// @description  Prevents any Radicals or Kanji that you've guru'd from showing up in your review.
// @author       You
// @include      https://www.wanikani.com/review/session
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @grant        unsafeWindow
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */

    // Your code here...
    const SKIPPABLE_SRS_LEVEL = 5;
    var $character = $('#character');
    var $userResponse = $('#user-response');
    var $answerFormButton = $('#answer-form button');

    console.log('WaniKani Radical/Kanji Skipper');
    $.jStorage.listenKeyChange("currentItem", function(key, action){
        if (action === 'updated') {
            var currentItem = $.jStorage.get('currentItem');
            var questionType = $.jStorage.get('questionType');
            var currentItemType = itemType();
            var answer;

            if (equalsAny(currentItemType, ['radical', 'kanji'])) {
                if (currentItem.srs >= SKIPPABLE_SRS_LEVEL) {
                    if (questionType === 'meaning') {
                        answer = currentItem.en[0];
                    } else {
                        if (currentItem.emph === 'onyomi') {
                            answer = currentItem.on[0];
                        } else {
                            answer = currentItem.kun[0];
                        }
                    }
                    $userResponse[0].value = answer;
                    moveForward();
                }
            }
        }
    });

    function equalsAny(thing, things) {
        return things.indexOf(thing) > -1;
    }

    function moveForward() {
      $answerFormButton.click();
      var correct = $('#answer-form fieldset').hasClass('correct');
      if (correct) {
        $answerFormButton.click();
      }
    }

    function itemType() {
        if ($character.hasClass('kanji')) {
            return 'kanji';
        } else if ($character.hasClass('radical')) {
            return 'radical';
        } else if ($character.hasClass('vocabulary')) {
            return 'vocabulary';
        }
    }

/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */