// ==UserScript==
// @name         WaniKani Lesson Ordering III
// @namespace    https://www.wanikani.com/
// @version      1.0
// @description  This allows you to sort the items in your WaniKani lessons, either putting the Radicals and Kanji first, or the Vocabulary first. By RhosVeedcy, based on scripts originally by Alucardeck.
// @author       You
// @include      http://www.wanikani.com/lesson/session
// @include      https://www.wanikani.com/lesson/session
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
    /* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */

    GM_addStyle(`
        #lessons #stats ul li#radical-count:hover { opacity: 0.95; }
        #lessons #stats ul li#kanji-count:hover { opacity: 0.95; }
        #lessons #stats ul li#vocabulary-count:hover { opacity: 0.95; }
        #lessons #stats > ul > li {
            cursor: pointer;
            transition: opacity 0.1s linear, color 0.15s linear;
        }
    `);

    // Add click handlers
    $('#radical-count').on('click', function() { countClickHandler.call(this, 'radical'); });
    $('#kanji-count').on('click', function() { countClickHandler.call(this, 'kanji'); });
    $('#vocabulary-count').on('click', function() { countClickHandler.call(this, 'vocabulary'); });

    function countClickHandler(type) {
        // Reset opacity of every count
        $('#radical-count, #kanji-count, #vocabulary-count').css('opacity', '');
        // Increase opacity of selected type
        $(this).css('opacity', 0.95);
        reorder(type);
    }

    function reorder(type) {
        // Extract the first three letters of the type, which we will use
        // to select the specified Queue item (rad, kan, or voc).
        var type_code = type.substring(0, 3);
        var activeQueue = $.jStorage.get("l/activeQueue");
        var lessonQueue = $.jStorage.get("l/lessonQueue");

        // Move all items in the activeQueue to the lessonQueque
        lessonQueue = lessonQueue.concat(activeQueue);

        // Position the selected type first in the lessonQueue
        lessonQueue.sort(function(itemOne, itemTwo) {
            let itemOneMatches = !!itemOne[type_code];
            let itemTwoMatches = !!itemTwo[type_code];

            if (itemOneMatches === itemTwoMatches) {
                return 0;  // Same type (do nothing)
            } else if (itemOneMatches && !itemTwoMatches) {
                return -1; // itemOne comes first
            } else if (!itemOneMatches && itemTwoMatches) {
                return 1;  // itemTwo comes first
            }
        });

        // Move the first five items back onto the activeQueue
        activeQueue = lessonQueue.splice(0, 5);

        // Store both queues (activeQueue must be set first)
        $.jStorage.set("l/activeQueue", activeQueue);
        $.jStorage.set("l/lessonQueue", lessonQueue);

        // Refresh the display by cycling through the active items
        [1,2,3,4,5].forEach(() => $(document).trigger({type: 'keyup', which: 65, keyCode: 65}));
    }
    function reorderKanji() { }
    function reorderVocabulary() { }

    /* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */