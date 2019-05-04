// ==UserScript==
// @name         Qualtrics
// @namespace    CuylerStuwe
// @version      2.12
// @description  A Qualtrics script. Use at your own risk - I won't provide support for this. This is a V1 copy of a script that eventually went to V2 as a separate script, and became abandonware when I stopped working on surveys on mTurk.
// @author       Cuyler Stuwe
// @include      *qualtrics*
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @grant        GM_getValue
// @grant        GM_setValue
// @icon         http://ez-link.us/sb-png
// ==/UserScript==

/*

 LATEST ADDITIONS:

Make sure answer set matches are checked against uniform case (either upper/lower),
with whitespace trimmed,
and with ending and start punctuation trimmed (possibly all punctuation trimmed?).s
Might also be cool to replace all contractions with the expanded form (or vice versa),
and use that replaced version for comparison (regex time?!).

Adds authorization skeleton.

 Save current question with F. Save hint of current question with h. Prompt user and save response with P.

 -------------------Answer inversion locally and globally using I and R.

 NOTES:

 Let's add a HELPER UI that shows people the keybinds in their current context, and maybe the current question they have selected, or that type of thing.

 We need to fix the ability to multiple-add event listeners. (And fix any memory leaks this might be causing)

 We still want a word counter for text boxes.

 We want a timer for individual Qualtrics pages.

 ----------------- DONE! --------------------- Have "forced auto answer" questions set an internal data attribute that the question skipper can use to skip over auto-answered questions. (maybe Tab can skip auto-answered questions, but arrows will be precise?)

 --------------------- DONE (partially)! -------------------------- Change attenton checks to purple. Maybe have these handled in a special way by the skipper.

 Let's integrate the user ID and global server timer scripts into this script.

 Let's add demographic autofill.

 Let's add Mturk ID autofill. Do a smart check and say "this looks like an ID slot. fill your ID here?"

 Let's identify the number of minutes the survey is supposed to take, and show this on the screen compared against the amount of time you've already taken.

 Discover whether the current "clearing" method is actually clearing things out, and if it isn't, see whether it's possible to actually do it.

 We need a UI for settings instead of constants, and have these stored to and read from a database.

 Give people a way to easily flag an entire question as "saved" (forced or not forced) in the future, without going through a UI menu. Maybe with "s" and "f" keys prior or post setting or something like that (modifiers like ctrl?). And then indicate that this was done and give a chance to undo ("z" or an icon, maybe?)

 Related to the above: Delete a saved question with the "delete" key?

 Try to see whether we can use HTML5 messaging and a helper script to send the time left for the HIT (and the HIT name?) from the HIT window to the Qualtrics window.

 Can we find a way to save the Qualtrics codes if we get to the end of the screen and accidentally skip it or whatever. Like a completion code database or something? Tell the user "this looks like a completion code. is it? we will copy to clipboard/save to db".

 ------------- DONE! ---------- PRESS "R" to swap the coding for all answered questions (reverse coding).

 */

// WE'RE Refactoring this to be the parent of the selectable and saveable answers, so that we can implement all of the different types with the same behavior.
var OnscreenQAGrouping = function(questionNode, answerNodes, questionText) {
    var _questionNode = questionNode || undefined;
    var _answerNodes = answerNodes || undefined;
    var _questionText = questionText || undefined;
}
var RadioBoxQAGrouping = new OnscreenQAGrouping();

var SliderQAGrouping = new OnscreenQAGrouping();
var TextQAGrouping = new OnscreenQAGrouping();
var NumberQAGrouping = new OnscreenQAGrouping();
var OptionQAGrouping = new OnscreenQAGrouping();

var QaultricsScriptSurveyPage = (function () {

    var versionNumber = 1.0;

    return {
        version : function() {return versionNumber;}
    }

})();

var QualtricsScriptAuthorization = (function() {

    var _versionNumber = 1.0;

    var _storedKey = GM_getValue('authKey');

    var _hasBeenChecked = false;

    return {
        version : function(){return _versionNumber;},
        validateKey : function(keyString) {_hasBeenChecked = true; return (keyString.toUpperCase() === "BETA");},
        generateKey : function(userName) {return "";},
        getStoredKey : function() {return _storedKey;},
        saveKeyToFile : function(keyString) {_storedKey = keyString; GM_setValue('authKey', keyString);},
        hasBeenChecked : function () {return _hasBeenChecked;}
    }

})();

(function() {
    'use strict';

    if(QualtricsScriptAuthorization.getStoredKey())
    {
        if( ! QualtricsScriptAuthorization.validateKey( QualtricsScriptAuthorization.getStoredKey() ) )
        {
            QualtricsScriptAuthorization.saveKeyToFile( prompt("Your entered key for the Qualtrics Helper Script is invalid.\n" +
                                                               "Please enter a valid key.") );
        }
    }
    else
    {
        QualtricsScriptAuthorization.saveKeyToFile( prompt( "Please enter your key for the Qualtrics Helper Script." ) );
    }


    if( ! QualtricsScriptAuthorization.validateKey( QualtricsScriptAuthorization.getStoredKey() ) ) {return;}

    if( ! QualtricsScriptAuthorization.hasBeenChecked() ) {return;} // Double-checking the auth to make sure we haven't been duped by skipping the check.

    // Get a no-conflict instance of jQuery so we don't create errors.
    var $qh = jQuery.noConflict();

    function autoNextEnabled()
    {
        return true;
    }

    // The amount of time it takes before the script starts.
    const SCRIPT_DELAY_TIME_MS = 3 * 1000;

    const SINGLE_ANSWER_CSS_SELECTOR = ".SingleAnswer";

    // Definitions for our colors.
    const PALE_RED = "#FFE6E6";
    const PALE_YELLOW = "#FFFFE6";
    const PALE_GREEN = "#E6FFE6";
    const PALE_RED_DARKER = "#FFCCCC";
    const PALE_YELLOW_DARKER = "#FFFFCC";
    const PALE_GREEN_DARKER = "#CCFFCC";
    const DEEP_PURPLE = "#A020F0";
    const LIGHT_GRAY = "#EEEEEE";

    const SAVED_ANSWER_DATABASE_LOCATION = 'saved-answer-queries';
    const SAVED_QUESTION_COLOR_DATABASE_LOCATION = 'saved-question-color-queries';

    // Define constants using our constants. Lol.
    // These will be settable in an options dialog later.
    const SELECTED_ROW_HIGHLIGHT_COLOR = LIGHT_GRAY;
    const ANSWERED_ROW_HIGHLIGHT_COLOR = PALE_GREEN;

    // The amount of steps we'll jump on the right or left arrow.
    // This will eventually be exposed by a GUI and saved in a DB.
    const SEVERAL_QUESTIONS_JUMP_SIZE = 4;

    // Our default text color.
    const DEFAULT_TEXT_COLOR = "black";

    // Definitions for keycodes so that keycode scans are easier to read later on.
    const KEYCODE_ENTER = 13; // Will be used to submit the current page.
    const KEYCODE_UPARROW = 38;
    const KEYCODE_DOWNARROW = 40;
    const KEYCODE_LEFTARROW = 37;
    const KEYCODE_RIGHTARROW = 39;
    const KEYCODE_TAB = 9;
    const KEYCODE_ESCAPE = 27;
    const KEYCODE_DELETE = 46;
    const KEYCODE_1 = 49;
    const KEYCODE_2 = 50;
    const KEYCODE_3 = 51;
    const KEYCODE_4 = 52;
    const KEYCODE_5 = 53;
    const KEYCODE_6 = 54;
    const KEYCODE_7 = 55;
    const KEYCODE_8 = 56;
    const KEYCODE_9 = 57;
    const KEYCODE_0 = 48;
    const KEYCODE_I = 73;
    const KEYCODE_R = 82;
    const KEYCODE_F = 70;
    const KEYCODE_H = 72;
    const KEYCODE_P = 80;

    const KEYCODE_NUMPAD_1 = 97;
    const KEYCODE_NUMPAD_2 = 98;
    const KEYCODE_NUMPAD_3 = 99;
    const KEYCODE_NUMPAD_4 = 100;
    const KEYCODE_NUMPAD_5 = 101;
    const KEYCODE_NUMPAD_6 = 102;
    const KEYCODE_NUMPAD_7 = 103;
    const KEYCODE_NUMPAD_8 = 104;
    const KEYCODE_NUMPAD_9 = 105;

    const KEY_INVERT = KEYCODE_I;
    const KEY_REVERSE = KEYCODE_R;
    const KEY_SUBMIT = KEYCODE_ENTER;
    const KEY_ACTIVATE = KEYCODE_ESCAPE;
    const KEY_BUBBLE_1 = KEYCODE_1;
    const KEY_BUBBLE_2 = KEYCODE_2;
    const KEY_BUBBLE_3 = KEYCODE_3;
    const KEY_BUBBLE_4 = KEYCODE_4;
    const KEY_BUBBLE_5 = KEYCODE_5;
    const KEY_BUBBLE_6 = KEYCODE_6;
    const KEY_BUBBLE_7 = KEYCODE_7;
    const KEY_BUBBLE_8 = KEYCODE_8;
    const KEY_BUBBLE_9 = KEYCODE_9;
    const KEY_BUBBLE_10 = KEYCODE_0;
    const KEY_NEXT_QUESTION = KEYCODE_DOWNARROW;
    const KEY_PREV_QUESTION = KEYCODE_UPARROW;
    const KEY_FORWARD_SEVERAL_QUESTIONS = KEYCODE_RIGHTARROW;
    const KEY_BACkWARD_SEVERAL_QUESTIONS = KEYCODE_LEFTARROW;
    const KEY_NEXT_UNSKIPPABLE_QUESTION = KEYCODE_TAB;
    const KEY_SAVE_QUESTION_FORCED = KEYCODE_F;
    const KEY_SAVE_QUESTION_HINT = KEYCODE_H;
    const KEY_SAVE_QUESTION_ANSWER_PROMPT = KEYCODE_P;

    const HEADER_CSS_SELECTOR = "th.c1";

    const CHOICE_STRUCTURE_CSS_SELECTOR = ".ChoiceStructure";
    // const CHOICE_STRUCTURE_CSS_SELECTOR = ".ChoiceStructure[role='presentation']";

    function getReverseKey() {return KEY_REVERSE;}
    function getInvertKey() {return KEY_INVERT;}
    function getSubmitKey() {return KEY_SUBMIT;}
    function getActivateKey() {return KEY_ACTIVATE;}
    function getBubbleKeys() {return [ KEY_BUBBLE_1, KEY_BUBBLE_2, KEY_BUBBLE_3, KEY_BUBBLE_4, KEY_BUBBLE_5, KEY_BUBBLE_6, KEY_BUBBLE_7, KEY_BUBBLE_8, KEY_BUBBLE_9, KEY_BUBBLE_10 ];}

    // In the main thread, this will be our first main holder that contains a list of all of the question headings on the current Qualtrics page.

    var listOfHeaders;

    // We use these globally in the script to tell a header's index or to move to a header at a given index.
    var headersIndexMap = {};
    var headersIndexArray = [];

    // We'll use this to remove event listeners we no longer need when we trigger the script for a new set of answers.
    var addedEventListenersArray = [];

    // Intended for overloaded infinite arguments (keycode, kc1, kc2, ...)
    function codeMatchesAny(keycode)
    {
        var anyMatchFound = false;

        for(let i = 1, length = arguments.length; i < length; i++)
        {
            let currentCodeCheck = arguments[i];

            if(keycode === currentCodeCheck)
            {
                anyMatchFound = true;
                i = length; // We found a match. We don't need to check for one anymore.
            }
        }

        return anyMatchFound;
    }

    function codeMatchesBubbleEntry(keycode)
    {
        var bubbleKeys = getBubbleKeys();

        return codeMatchesAny(keycode,bubbleKeys[0],bubbleKeys[1],bubbleKeys[2],bubbleKeys[3],bubbleKeys[4],bubbleKeys[5],bubbleKeys[6],bubbleKeys[7],bubbleKeys[8],bubbleKeys[9]);
    }

    // Constructor for color pairs.
    function QueryColorPair(text,color,textcolor)
    {
        this.textToHighlight = text;
        this.highlightColor = color;
        this.textColor = textcolor || DEFAULT_TEXT_COLOR; // Text color is an optional definition. It'll default to black if left undefined.
    }

    function QueryAnswerSet(text,answer,forced)
    {
        this.textToAnswer = text;
        this.answerAsOneBasedPercentage = answer;

        if(forced === undefined) {
            this.isForced = true; // Whether the answer is forced or not is an optional parameter. Default to forced.
        } else {
            this.isForced = forced;
        }
    }

    function createIndexFromOneBasedPercent(numberOfRadios, oneBasedPercent)
    {
        return Math.round( ( numberOfRadios - 1 ) * oneBasedPercent );
    }

    function isNumpadKey(keycode)
    {
        switch(keycode)
        {
            case KEYCODE_NUMPAD_1:
            case KEYCODE_NUMPAD_2:
            case KEYCODE_NUMPAD_3:
            case KEYCODE_NUMPAD_4:
            case KEYCODE_NUMPAD_5:
            case KEYCODE_NUMPAD_6:
            case KEYCODE_NUMPAD_7:
            case KEYCODE_NUMPAD_8:
            case KEYCODE_NUMPAD_9:
                return true;
                break;
        }

        return false;
    }

    function numpadKeycodeToOneBasedPercent(keycode)
    {
        const NUMPAD_1_PERCENT = 0;
        const NUMPAD_2_PERCENT = 0.125;
        const NUMPAD_3_PERCENT = 0.25;
        const NUMPAD_4_PERCENT = 0.375;
        const NUMPAD_5_PERCENT = 0.5;
        const NUMPAD_6_PERCENT = 0.625;
        const NUMPAD_7_PERCENT = 0.75;
        const NUMPAD_8_PERCENT = 0.875;
        const NUMPAD_9_PERCENT = 1;

        var percentToClick = undefined;

        switch(keycode) {
            case KEYCODE_NUMPAD_1:
                percentToClick = NUMPAD_1_PERCENT;
                break;
            case KEYCODE_NUMPAD_2:
                percentToClick = NUMPAD_2_PERCENT;
                break;
            case KEYCODE_NUMPAD_3:
                percentToClick = NUMPAD_3_PERCENT;
                break;
            case KEYCODE_NUMPAD_4:
                percentToClick = NUMPAD_4_PERCENT;
                break;
            case KEYCODE_NUMPAD_5:
                percentToClick = NUMPAD_5_PERCENT;
                break;
            case KEYCODE_NUMPAD_6:
                percentToClick = NUMPAD_6_PERCENT;
                break;
            case KEYCODE_NUMPAD_7:
                percentToClick = NUMPAD_7_PERCENT;
                break;
            case KEYCODE_NUMPAD_8:
                percentToClick = NUMPAD_8_PERCENT;
                break;
            case KEYCODE_NUMPAD_9:
                percentToClick = NUMPAD_9_PERCENT;
                break;
        }

        return percentToClick;
    }

    function handleNumpadKeys(header,keycode)
    {
        clickAnswerAtOneBasedPercent(header, numpadKeycodeToOneBasedPercent(keycode) );

        focusNextQuestion();
    }


    function clickAnswerAtOneBasedPercent(header,percent)
    {
        var radioIndexToPick = createIndexFromOneBasedPercent( countRadiosForQuestion(header) , percent );
        clickIndexedAnswer(header,radioIndexToPick);
    }

    function setPredefinedAnswerAsOneBasedPercent(header,answerSet)
    {
        // debugger;

        var radioIndexToPick =  createIndexFromOneBasedPercent(countRadiosForQuestion(header), answerSet.answerAsOneBasedPercentage);

        if(answerSet.isForced) {
            clickAnswerAtOneBasedPercent(header,answerSet.answerAsOneBasedPercentage);
        } else {

            if( answerSet.answerAsOneBasedPercentage < 0.5 ) {
                highlightIndexedAnswer(header,radioIndexToPick,PALE_RED_DARKER);
            }
            else if( answerSet.answerAsOneBasedPercentage > 0.5) {
                highlightIndexedAnswer(header,radioIndexToPick,PALE_GREEN_DARKER);
            }
            else {
                highlightIndexedAnswer(header,radioIndexToPick,PALE_YELLOW_DARKER);
            }
        }
    }

    function convertToOneBasedPercent(index,rangeLength)
    {
        if(index >= 0)
        {
            return ( index / ( rangeLength - 1 ) );
        }
        else {
            return index;
        }
    }

    function invertOneBasedPercent(value)
    {
        return Math.abs( 1 - value );
    }

    function getAnswerAsOneBasedPercent(header)
    {
        var radiosForCurrentHeader = radiosForHeader(header);

        var answerIndex = -1;

        for( let i = 0, length = radiosForCurrentHeader.length; i < length; i++) {
            if(radiosForCurrentHeader[i].checked) {
                answerIndex = convertToOneBasedPercent(i,length);
                i = length;
            }
        }

        return answerIndex;
    }

    // For a given question header, this will pivot the answer around the middle.
    // header: A DOM Node that acts as the question heading for the choice row.
    function invertAnswerForHeader(header)
    {
        var currentAnswer = getAnswerAsOneBasedPercent(header);

        if(currentAnswer >= 0)
        {
            clickAnswerAtOneBasedPercent(header,invertOneBasedPercent(currentAnswer));
        }
    }

    // Inverts all headers found on the page, using the predefined CSS selector global.
    function invertAnswersForAllHeaders()
    {
        // For each of our Qualtrics question headers...

        $qh(HEADER_CSS_SELECTOR).each( function(index) {

            // If the current question has an answer...
            if(getAnswerAsOneBasedPercent(this) >= 0) {

                // invert it and focus it
                invertAnswerForHeader(this);
            }
        });
    }

    // For a given question header, click the button in the choice row specified by an index value.
    // header: A DOM Node that acts as the question heading for the choice row.
    // index: The answer to click, as a zero-based index
    function clickIndexedAnswer(header,index)
    {
        console.log("clicking header ", header, " with index ", index);
        radiosForHeader(header)[index].click();
        header.setAttribute("data-skippable-forced", true); // Set an attribute that will be used in navigation scripts to skip this with certain buttons.
    }

    function highlightIndexedAnswer(header,index,color)
    {

        radiosForHeader(header)[index].parentElement.style.backgroundColor = color;
    }

    function doAllPredefinedAnswers()
    {
        // For each of our Qualtrics question headers...

        console.log("doing predefined answers");

        $qh(HEADER_CSS_SELECTOR).each( function(index) {

            console.log("doing header ", this);

            // ... check against each of our answer queries.
            for (let i = 0, length = allAnswerQueries.length; i < length; i++) {

                var currentQuery = allAnswerQueries[i]; // Grabbing the current query to make it faster.

                // If we found at least a partial match in our Qualtrics text against our current query...
                if(this.textContent.includes(currentQuery.textToAnswer)) {

                    setPredefinedAnswerAsOneBasedPercent(this,currentQuery);
                    this.focus();
                }
            }
        });

        // If there are any question headers, scroll to the first one.
        if($qh(HEADER_CSS_SELECTOR).length) {$qh(HEADER_CSS_SELECTOR)[0].focus();}
    }

    // Highlight all of the question-color sets that have been predefined in the script's global array.
    function highlightAllPairs()
    {
        // For each of our Qualtrics question cells...
        $qh(".table-cell").each( function(index) {

            // ... check against each of our color pair queries.
            for (let i = 0, length = allQueries.length; i < length; i++) {

                var currentQuery = allQueries[i]; // Grabbing the current query to make it faster.

                // If we found at least a partial match in our Qualtrics text against our current query...
                if(this.textContent.includes(currentQuery.textToHighlight)) {

                    // ... set the current Qualtrics question's colors to the current query's settings.
                    this.style.backgroundColor = currentQuery.highlightColor;
                    this.style.color = currentQuery.textColor;
                }
            }
        });
    }

    // Just press the next button towards the buttom of the Qualtrics page.
    function pressNextButton()
    {
        var nextButton = document.querySelector("#NextButton");
        nextButton.click();
    }

    // Either go to the previous question, or stay at the current question if we're on the first question.
    function focusPreviousQuestion()
    {
        var currentElement = document.activeElement;

        if( headersIndexMap[currentElement.id] === undefined ) {return undefined;} // If the selected item doesn't exist in our model of the questions, we'll just leave without doing anything.

        var currentElementIndex = headersIndexMap[currentElement.id];

        // Make sure we don't try to go to a question that's less than zero. As long as our current data and reverse target are valid, we'll go to it.
        if(currentElementIndex !== undefined && ( currentElementIndex > 0 ) )
        {
            headersIndexArray[currentElementIndex-1].focus();
        }
    }

    function focusNextUnskippableQuestion()
    {
        var isOnUnskippableQuestion = false;

        // Skip to the next question, and keep doing so until we reach the end (or if we find an unskippable question, which we break manually below).
        while(focusNextQuestion())
        {
            // If our current element doesn't have the unskippable tag, it meaans we'e arrived on something ok.
            if( !document.activeElement.getAttribute("data-skippable-forced") ) {
                return;
            }
        }
    }

    function focusNextQuestion()
    {
        var currentElement = document.activeElement;

        if( headersIndexMap[currentElement.id] === undefined ) {return undefined;} // If the selected item doesn't exist in our model of the questions, we'll just leave without doing anything.

        var currentElementIndex = headersIndexMap[currentElement.id];

        // Only move to the next question if we actually have
        if( (currentElementIndex !== undefined) && (currentElementIndex < (headersIndexArray.length - 1) ) )
        {
            headersIndexArray[currentElementIndex+1].focus();
        }

        return (currentElementIndex < (headersIndexArray.length - 1) ); // Returns whether there is another item to skip to after this iteration operation is over.
    }

    function focusSeveralQuestionsBack()
    {
        focusSeveralQuestions(false);
    }

    function focusSeveralQuestionsAhead()
    {
        focusSeveralQuestions(true);
    }

    function focusSeveralQuestions(forward)
    {
        var currentElement = document.activeElement;
        var currentElementIndex = headersIndexMap[currentElement.id];

        var highestPossibleIndexToJumpTo = headersIndexArray.length - 1;

        var nextElementIndexToJumpTo;

        if(forward) {
            nextElementIndexToJumpTo = currentElementIndex + SEVERAL_QUESTIONS_JUMP_SIZE;

            if( nextElementIndexToJumpTo > highestPossibleIndexToJumpTo ) {
                nextElementIndexToJumpTo = highestPossibleIndexToJumpTo;
            }
        }
        else
        {
            nextElementIndexToJumpTo = currentElementIndex - SEVERAL_QUESTIONS_JUMP_SIZE;

            if( nextElementIndexToJumpTo < 0 ) {
                nextElementIndexToJumpTo = 0;
            }
        }



        if( currentElementIndex !== undefined )
        {
            headersIndexArray[nextElementIndexToJumpTo].focus();
        }
    }

    function clearCurrentQuestion(header)
    {
        var radiosForCurrentHeader = radiosForHeader(header);

        for( let i = 0, length = radiosForCurrentHeader.length; i < length; i++)
        {
            radiosForCurrentHeader[i].checked = false;

            let labelForRadioQuery = "label[for='" + radiosForCurrentHeader[i].id + "']";
            let labelForCurrentRadio = document.querySelector(labelForRadioQuery);

            labelForCurrentRadio.classList.remove("q-checked");
            labelForCurrentRadio.classList.remove("q-focused");

            console.log(radiosForCurrentHeader[i].id + " nulled");
        }
    }

    function countRadiosForQuestion(header)
    {
        return radiosForHeader(header).length;
    }

    function questionIsAnswered(header)
    {
        return (getAnswerAsOneBasedPercent(header) !== -1);
    }


    function radiosForHeader(header)
    {
        return header.parentElement.querySelectorAll("[type='radio']");
    }

    function autoNextRespectsUnskippable()
    {
        return false;
    }

    function clickRadioForSelectedHeader(header,keycode)
    {
        clickIndexedAnswer( header,keycodeToRadioIndex(keycode) );

        // radiosForHeader(header)[keycodeToRadioIndex(keycode)].click();

        if( autoNextEnabled() ) {
            if( autoNextRespectsUnskippable() ) {
                focusNextUnskippableQuestion();
            }
            else {
                focusNextQuestion();
            }
        }
    }

    function keycodeToRadioIndex(keycode)
    {
        var radioIndex = -1;

        switch(keycode) {
            case KEYCODE_1:
                radioIndex = 0;
                break;
            case KEYCODE_2:
                radioIndex = 1;
                break;
            case KEYCODE_3:
                radioIndex = 2;
                break;
            case KEYCODE_4:
                radioIndex = 3;
                break;
            case KEYCODE_5:
                radioIndex = 4;
                break;
            case KEYCODE_6:
                radioIndex = 5;
                break;
            case KEYCODE_7:
                radioIndex = 6;
                break;
            case KEYCODE_8:
                radioIndex = 7;
                break;
            case KEYCODE_9:
                radioIndex = 8;
                break;
            case KEYCODE_0:
                radioIndex = 9;
                break;
        }

        return radioIndex;
    }

    function handleEnter(e)
    {
        var keycode = e.keyCode; // Find the pressed key.

        if(keycode === KEYCODE_ENTER)
        {
            e.preventDefault();
            pressNextButton();
        }
    }

    function handleEscape(e)
    {
        var keycode = e.keyCode;

        if(keycode === KEYCODE_ESCAPE)
        {
            e.preventDefault();
            mainPageModifier();
        }
    }

    function handleHeaderBlur(e)
    {
        var currentParentBGColor = e.target.parentElement.style.backgroundColor;

        if( questionIsAnswered(e.target) )
        {
            e.target.parentElement.style.backgroundColor = ANSWERED_ROW_HIGHLIGHT_COLOR;
        }
        else
        {
            e.target.parentElement.style.backgroundColor = "white";
        }
    }

    function handleHeaderFocus(e)
    {
        e.target.parentElement.style.backgroundColor = SELECTED_ROW_HIGHLIGHT_COLOR;
    }

    function createAndAttachHelperDialog()
    {
        // Create a node

        // Set up the node's characteristics

        // Attach it to the DOM
    }

    function displayHelperDialog()
    {
        // Set the display settings for the helper dialog and make it visible.
    }

    function hideHelperDialog()
    {
        // Make the helper dialog invisible.
    }

    function switchHelperDialog(params)
    {
        // Identify which helper dialog we'll be showing.

        // Change the inner HTML of the helper dialog according to the dialog we'll be showing.
    }

    // When we have a control highlight for a second in response to pressing a certain key on our helper dialog,
    // this will return it back to its original color after some amount of time.
    function revertAnimatedControlCallback(node, time)
    {
        // Ceeate an anonymous function that will be called with a setTimeout, that will influence the
        // node's characteristics.

        // Figure out how to animate the node based on what it is.
    }

    function handleKeypresses(e)
    {
        var keycode = e.keyCode; // Find the pressed key.

        //debugger;

        // If we pressed a key that we're interested in checking...
        if( codeMatchesAny(keycode, KEYCODE_ENTER, KEYCODE_UPARROW, KEYCODE_DOWNARROW, KEYCODE_LEFTARROW, KEYCODE_RIGHTARROW,
                           KEY_NEXT_UNSKIPPABLE_QUESTION, KEYCODE_ESCAPE, KEYCODE_DELETE, KEY_INVERT, KEY_REVERSE, KEY_SAVE_QUESTION_FORCED, KEY_SAVE_QUESTION_HINT, KEY_SAVE_QUESTION_ANSWER_PROMPT) ) {

            // ...prevent that key's default behavior.
            e.preventDefault();

            switch(keycode) {
                    // Enter key will hit the "submit" or "next" button.
                case KEYCODE_ENTER:
                    // pressNextButton();
                    break;
                case KEYCODE_UPARROW:
                    focusPreviousQuestion();
                    break;
                case KEYCODE_LEFTARROW:
                    focusSeveralQuestionsBack();
                    break;
                case KEYCODE_DOWNARROW:
                    focusNextQuestion();
                    break;
                case KEYCODE_RIGHTARROW:
                    focusSeveralQuestionsAhead();
                    break;
                case KEY_NEXT_UNSKIPPABLE_QUESTION:
                    focusNextUnskippableQuestion();
                    break;
                    // Delete will clear the selection from the currently focused question.
                    //case KEYCODE_ESCAPE:
                case KEYCODE_DELETE:
                    //deleteSavedQuestionSets();
                    askMasterSurvey();
                    // clearCurrentQuestion(document.activeElement);
                    break;
                case KEY_INVERT:
                    console.log("inverting current answer");
                    invertAnswerForHeader(document.activeElement);
                    break;
                case KEY_REVERSE:
                    console.log("inverting all answers");
                    invertAnswersForAllHeaders();
                    break;
                case KEY_SAVE_QUESTION_FORCED:
                    saveAnswerOnHeaderToFile(this,true);
                    break;
                case KEY_SAVE_QUESTION_HINT:
                    saveAnswerOnHeaderToFile(this,false);
                    break;
                case KEY_SAVE_QUESTION_ANSWER_PROMPT:
                    savePromptedQueryAnswerSet();
                    break;
            }
        }
        else if( codeMatchesBubbleEntry(keycode) )
        {
            e.preventDefault();

            clickRadioForSelectedHeader(document.activeElement,keycode);
        }
        else if ( isNumpadKey(keycode) )
        {
            e.preventDefault();

            handleNumpadKeys(document.activeElement,keycode);
        }
    }

    function askMasterSurvey()
    {
        const QUESTION_INSTRUCTIONS = "Respond to the question with a number between 0 (Strongly Disagree) and 10 (Strongly Agree).\nUse numbers between 20 and 30 instead to provide a non-forced answer.\n\n";

        var allQuestions = [

            /*

            "I prefer to live with honor, even it it means I will earn less money.",
            "To maintain my honor, I should not allow myself to be humiliated by others.",
            "Even if I lose social status, if I still have my honor, I can respect myself.",
            "I would not disregard my honor even under tough life circumstances.",
            "My honor will likely be negatively affected if I do not attend to my family obligations.",
            "I would jeopordize the honor of my family if I behaved disgracefully.",
            "It is my duty to defend the honor of my family.",
            "It is important for me to keep face in front of others",
            "I would lose face if others saw me misbehave.",
            "If I am embarrassed, I must not let it show or I will lose face.",
            "\"My word is my bond\" is how I feel; it would be dishonorable to behave otherwise.",
            "Honorable people do not cheap people who trust them.",
            "Loyalty is a core part of having honor.",
            "Acting right is necessary to maintain my honor.",
            "Reputation matters and should be vigorously defended.",
            "My honor depends to a high degree on the appreciation and respect of others.",
            "Disrespect damages honor.",
            "I would show I had no honor if I didn't care \"what others would say\".",
            "Most environmental claims on package labels or in advertising are intended to mislead rather than inform customers",
            "I do not believe most environmental claims made on package labels or in advertising",
            "Most environmental claims made on package labels or in advertising are true",
            "Because environmental claims are exaggerated, consumers would be better off if such claims on package labels or in advertising were eliminated",
            "Resources devoted to social causes come at the expense of improved product performance",
            "Companies that engage in socially responsible behavior often produce produts that are inferior in performance",
            "Socially responsible behavior by firms is often accompanied by inferior product offerings",
            "Products that are made in a socially responsible manner are often worse on important functional features such as performance than those that are not socially repsonsible",
            "When companies focus on social responsibility, the quality and performance of their product suffer",
            "I consider the potential environmental impact of my actions when making many of my decisions",
            "It is important to me that the products I use do not harm the environment",
            "My purchase habits are affected by my concern for our environment.",
            "I would describe myself as environmentally responsible",
            "I am willing to be inconvenienced in order to take ations that are more environmentally friendly",
            "I am concerned about wasting the resources of our planet",
            "All in all, I am inclined to feel that I am a failure",
            "I certainly feel useless at times",
            "I take a positive attitude toward myself",
            "I feel that I have a number of good qualities.",
            "On the whole, I am satisfied with myself.",
            "I feel that I'm a person of worth, at least on an equal plane with others",
            "I feel I do not have much to be proud of",
            "I wish I could have more respect for myself.",
            "At times I think I am no good at all.",
            "I am able to do things as well as most other people",
            "I enjoy doing work that requires the use of words",
            "I don't believe that anyone can think in terms of mental pictures.",
            "I enjoy learning new words.",
            "I find illustrations or diagrams helpful when I'm reading.",
            "I can easily think of synonyms for words.",
            "I have a hard time making a \"mental photo\" of a place that I've only been a few times.",
            "I read rather slowly",
            "I seldom use diagrams to explain things.",
            "I prefer to read instructions about how to do something rather than have someone show me.",
            "I like newspaper articles that have graphs.",
            "I have a better than average fluency in using words.",
            "I don't like maps or diagrams in books.",
            "I spend little time attempting to increase my vocabulary.",
            "When I read books with maps in them, I refer to the maps a lot.",
            "I dislike word games like crossword puzzles.",
            "The old saying \"A photo is worth a thousand words\" is certainly true for me.",
            "I dislike looking up words in dictionaries.",
            "I have always disliked jigsaw puzzles.",
            "I have a hard time remembering the words to songs.",
            "I find maps helpful when I am finding my way around a new city.",
            "Some groups of people must be kept in their place.",
            "It's probably a good thing that certain groups are at the top and other groups are at the bottom.",
            "An ideal society requires some groups to be on top and others on the bottom.",
            "Some groups of people are simply inferior to other groups.",
            "Groups at the bottom are just as deserving as groups at the top.",
            "No one group should dominate in society.",
            "Groups at the bottom should not have to stay in their place.",
            "Group dominance is a poor principle.",
            "We should not push for group equality.",
            "We shouldn't try to guarantee that every group has the same quality of life.",
            "It is unjust to try to make groups equal.",
            "Group equality should not be our primary goal.",
            "We should work to give all groups an equal chance to succeed.",
            "We should do what we can to equalize conditions for different groups",
            "No matter how much effort it takes, we ought to strive to ensure that all groups have the same chance in life.",
            "Group equality should be our ideal.",
            "I feel displeased with myself.",
            "I feel confident that I understand things.",
            "I feel frustrated or rattled about my performance.",
            "I feel good about myself.",
            "I am worried about whether I am regarded as a success or failure.",
            "I feel satisfied with the way my body looks right now.",
            "I feel as smart as others.",
            "I feel that I am having trouble understanding things that I read.",
            "I am worried about looking foolish.",
            "I am pleased with my appearance right now.",
            "I am dissatisfied with my weight.",
            "I feel that I have less scholastic ability right now than others.",
            "I am worried about what other people think of me.",
            "I feel self-conscious.",
            "I feel confident in my abilities.",
            "I feel inferior to others at this moment.",
            "I feel unattractive",
            "I feel that others respect and admire me.",
            "I feel concerned about the impression I am making.",
            "I feel like I'm not doing well.",
            "I prefer not to show a partner how I feel deep down.",
            "I often worry that my partner will not want to stay with me",
            "I find it difficult to allow myself to depend on romantic partners",
            "I worry that romantic partners won't care about me as much as I care about them.",
            "I don't feel comfortable opening up to romantic partners.",
            "I worry a lot about my relationships.",
            "I get uncomfortable when a romantic partner wants to be very close.",
            "When I show my feelings for romantic partners, I'm afraid they will not feel the same about me.",
            "It's not difficult for me to get close to my partner.",
            "My romantic partner makes me doubt myself.",
            "It helps to turn to my rommantic partner in times of need.",
            "I find that my partner(s) don't want to get as close as I would like.",
            "I talk things over with my partner.",
            "My desire to be very close sometimes scares people away.",
            "I feel comfortable depending on romantic partners.",
            "It makes me mad that I don't get the affection and support I need from my partner.",
            "It's easy for me to be affectionate with my partner.",
            "My partner only seems to notice me when I'm angry.",
            "I'm afraid that I will lose my partner's love.",
            "I feel comfortable sharing my private thoughts and feelings with my partner.",
            "I am very comfortable being close to my romantic partners.",
            "I often worry that my partner doesn't really love me.",
            "I often wish that my partner's feelings for me were as strong as my feelings for him or her.",
            "I prefer not to be too close to romantic partners.",
            "When my partner is out of sight, I worry that he or she might become interested in someone else.",
            "I find it relatively easy to get close to my partner.",
            "I rarely worry about my partner leaving me.",
            "I usually discuss my problems and concerns with my partner.",
            "I do not often worry about being abandoned",
            "I tell my partner just about everything.",
            "Sometimes romantic partners change their feelings about me for no apparent reason.",
            "I am nervous when partners get too close to me.",
            "I'm afraid that once a romantic partner gets to know me, he or she won't like who I really am.",
            "I find it easy to depend on romantic partners.",
            "I worry that I won't measure up to other people.",
            "My partner really understands me and my needs."
            "The kinds of books and magazines that I read identify me as having these characteristics",
            "The fact that I have these characteristics is communicated to others by my membership in certain organizations.",
            "Being someone who has these characteristics is an important part of who I am.",
            "I strongly desire to have these characteristics.",
            "I am actively involved in activities that communicate to others that I have these characteristics.",
            "The types of things I do in my spare time (e.g., hobbies) clearly identify me as having these characteristics.",
            "Having these characteristics is not really important to me.",
            "It would make me feel good to be a person who has these characteristics.",
            "I would be ashamed to be a person who had these characteristics.",
            "I often wear clothes that identify me as having these characteristics.",
            "If someone opposes me, I can find the means and ways to get what I want",
            "It is easy for me to stick to my aims and accomplish my goals.",
            "I am confident that I could deal efficiently with unexpected events.",
            "Thanks to my resourcefulness, I know how to handle unforeseen situations.",
            "I can solve most problems if I invest the necessary effort",
            "I can remain calm when facing difficulties because I can rely on my coping abilities",
            "When I am confronted with a problem, I can usually find several solutions",
            "If I am in trouble, I can usually think of a solution",
            "I can usually handle whatever comes my way.",
            "I can always manage to solve difficult problems if I try hard enough",
            "I seldom feel blue",
            "I am not interested in other people's problems",
            "I carry out my plans",
            "I make friends easily",
            "I am quick to understand things",
            "I get angry easily",
            "I respect authority",
            "I leave my belongings around",
            "I take charge",
            "I enjoy the beauty of nature",
            "I am filled with doubt about things",
            "I feel others' emotions",
            "I waste my time",
            "I am hard to get to know",
            "I have difficulty understanding abstract ideas",
            "I rarely get irritated",
            "I believe that I am better than others",
            "I like order",
            "I have a strong personality",
            "I believe in the importance of art",
            "I feel comfortable with myself",
            "I inquire about others' well-being",
            "I find it difficult to get down to work",
            "I keep others at a distance",
            "I can handle a lot of information",
            "I get upset easily",
            "I hate to seem pushy",
            "I keep things tidy",
            "I lack the talent for influencing people",
            "I love to reflect on things",
            "I feel threatened easily",
            "I can't be bothered with other's needs",
            "I mess things up",
            "I reveal little about myself",
            "I like to solve complex problems",
            "I keep my emotions under control",
            "I take advantage of others",
            "I follow a schedule",
            "I know how to captivate people",
            "I get deeply immersed in music",
            "I rarely feel depressed",
            "I sympathize with others' feelings",
            "I finish what I start",
            "I warm up quickly to others",
            "I avoid philosophical discussions",
            "I change my mood a lot",
            "I avoid imposing my will on others",
            "I am not bothered by messy people",
            "I wait for others to lead the way",
            "I do not like poetry",
            "I worry about things",
            "I am indifferent to the feelings of others",
            "I don't put my mind on the task at hand",
            "I rarely get caught up in the excitement",
            "I avoid difficult reading material",
            "I rarely lose my composure",
            "I rarely put people under pressure",
            "I want everything to be \"just right\"",
            "I see myself as a good leader",
            "I seldom notice the emotional aspects of paintings and pictures",
            "I am easily discouraged",
            "I take no time for others",
            "I get things done quickly",
            "I am not a very enthusiastic person",
            "I have a rich vocabulary",
            "I am a person whose moods go up and down easily",
            "I insult people",
            "I am not bothered by disorder",
            "I can talk others into doing things",
            "I need a creative outlet",
            "I am not embarassed easily",
            "I take an interest in other people's lives",
            "I always know what I am doing",
            "I show my feelingse when I'm happy",
            "I think quickly",
            "I am not easily annoyed",
            "I seek conflict",
            "I dislike routine",
            "I hold back my opinions",
            "I seldom get lost in thought",
            "I become overwhelmed by events",
            "I don't have a soft side",
            "I postpone decisions",
            "I have a lot of fun",
            "I learn things slowly",
            "I get easily agitated",
            "I love a good fight",
            "I see that rules are observed",
            "I am the first to act",
            "I seldom daydream",
            "I am afraid of many things",
            "I like to do things for others",
            "I am easily distracted",
            "I laugh a lot",
            "I formulate ideas clearly",
            "I can be stirred up easily",
            "I am out for my own personal gain",
            "I want every detail taken care of",
            "I do not have an assertive personality",
            "I see beauty in things that others might not notice",
            "It's hard for me to feel good about myself unless I know other people like me.",
            "It's hard to feel good about myself unless I know other people admire me.",
            "When others don't notice me, I start to feel worthless.",
            "When people don't notice me, I start to feel bad about myself.",
            "I am disappointed when people don't notice me.",
            "I need others to acknowledge me.",
            "When others don't respond to me the way that I would like them to, it is hard for me to still feel ok with myself.",
            "I am preoccupied with thoughts and concerns that most people are not interested in me.",
            "I sometimes need important others in my life to reassure me of my self-worth.",
            "I often find myself envying others' accomplishments.",
            "It's hard to feel good about myself when I'm alone.",
            "My self-esteem fluctuates a lot.",
            "I can make anyone believe anything I want them to.",
            "I find it easy to manipulate people.",
            "I can usually talk my way out of anything.",
            "I can read people like a book.",
            "Everybody likes to hear my stories.",
            "I try to show what a good person I am through my sacrifices.",
            "I help others in order to prove I'm a good person.",
            "I like to have friends who rely on me because it makes me feel important.",
            "I feel important when others rely on me.",
            "Sacrificing for others makes me the better person.",
            "I can make myself feel good by caring for others.",
            "When others get a glimpse of my needs, I feel anxious and ashamed.",
            "I often hide my needs for fear that others will see me as needy and dependent.",
            "It's hard to show others the weaknesses I feel inside.",
            "I can't stand relying on other people because it makes me feel weak.",
            "It's important to show people I can do it on my own, even if I have some doubts inside.",
            "I hate asking for help.",
            "I wouldn't disclose all my intimate thoughts and feelings to someone I didn't admire.",
            "I often fantasize about being recognized for my accomplishments.",
            "I often fantasize about being rewarded for my efforts.",
            "I often fantasize about performing heroic deeds.",
            "I often fantasize about being admired and respected.",
            "I often fantasize about having a huge impact on the world around me.",
            "I often fantasize about accomplishing things that are probably beyond my means.",
            "I want to amount to something in the eyes of the world.",
            "When others don't meet my expectations, I often feel ashamed about what I wanted.",
            "Sometimes I avoid people because I'm concerned they won't acknowledge what I do for them.",
            "When others disappoint me, I often get angry at myself.",
            "Sometimes I avoid people because I'm concerned that they'll disappoint me.",
            "Sometimes I avoid people because I'm afraid they won't do what I want them to.",
            "I sometimes feel ashamed about my expectations of others when they disappoint me.",
            "Sometimes it's easier to be alone than to face not getting everything I want from other people.",
            "It irritates me when people don't notice how good a person I am.",
            "I get mad when people don't notice all that I do for them.",
            "I get annoyed by people who are not interested in what I say or do.",
            "I typically get very angry when I'm unable to get what I want from others.",
            "I will never be satisfied until I get all that I deserve.",
            "When I do things for other people, I expect them to do things for me.",
            "I get angry when criticized.",
            "I can get pretty angry when others disagree with me.",
            "I am extremely ambitious.",
            "Others say I brag too much, but everything I say is true.",
            "Leadership comes easy for me.",
            "When someone does something nice for me, I wonder what they want from me.",
            "I deserve to receive special treatment.",
            "I get lots of enjoyment from entertaining others.",
            "It’s fine to take advantage of persons to get ahead.",
            "I often fantasize about someday being famous.",
            "When people judge me, I just don’t care.",
            "I don’t worry about others’ needs.",
            "I’m pretty good at manipulating people.",
            "I often feel as if I need compliments from others in order to be sure of myself.",
            "I hate being criticized so much that I can’t control my temper when it happens.",
            "When I realize I have failed at something, I feel humiliated.",
            "I will try almost anything to get my “thrills”.",
            "I have a tremendous drive to succeed.",
            "I only associate with people of my caliber.",
            "I am comfortable taking on positions of authority.",
            "I trust that other people will be honest with me.",
            "I don’t think the rules apply to me as much as they apply to others.",
            "I like being noticed by others.",
            "I will use persons as tools to advance myself.",
            "I often fantasize about having lots of success and power.",
            "I don’t really care what others think of me.",
            "I don’t generally pay much attention to the woes of others.",
            "I can maneuver people into doing things.",
            "I am stable in my sense of self.",
            "I have at times gone into a rage when not treated rightly.",
            "I feel awful when I get put down in front of others.",
            "I am a bit of a daredevil.",
            "I aspire for greatness.",
            "I do not waste my time hanging out with people who are beneath me.",
            "Persons generally follow my lead and authority.",
            "I’m slow to trust people.",
            "It may seem unfair, but I deserve extra (i.e., attention, privileges, rewards).",
            "I like being the most popular person at a party.",
            "Sometimes to succeed you need to use other people.",
            "I rarely fantasize about becoming famously successful.",
            "I’m pretty indifferent to the criticism of others.",
            "I’m not big on feelings of sympathy.",
            "I can talk my way into and out of anything.",
            "I feel very insecure about whether I will achieve much in life.",
            "It really makes me angry when I don’t get what I deserve.",
            "I feel ashamed when people judge me.",
            "I would risk injury to do something exciting.",
            "I am driven to succeed.",
            "I am a superior person.",
            "I tend to take charge of most situations.",
            "I often think that others aren’t telling me the whole truth.",
            "I believe I am entitled to special accommodations.",
            "I love to entertain people.",
            "I’m willing to exploit others to further my own goals.",
            "Someday I believe that most people will know my name.",
            "Others’ opinions of me are of little concern to me.",
            "I don’t get upset by the suffering of others.",
            "It is easy to get people to do what I want.",
            "I wish I didn’t care so much about what others think of me.",
            "I feel enraged when people disrespect me.",
            "I feel foolish when I make a mistake in front of others.",
            "I like doing things that are risky or dangerous.",
            "My painful experiences and memories make it difficult for me to live a life that I would value.",
            "I'm afraid of my feelings.",
            "I worry about not being able to control my worries and feelings.",
            "My painful memories prevent me from having a fulfilling life.",
            "Emotions cause problems in my life.",
            "It seems like most people are handling their lives better than I am.",
            "Worries get in the way of my success.",
            "When I am working on something, I cannot relax until it is perfect.",
            "I am not likely to criticize someone for giving up too easily.",
            "It is not important that the people I am close to are successful.",
            "I seldom criticize my friends for accepting second best.",
            "I find it difficult to meet others’ expectations of me.",
            "One of my goals is to be perfect in everything I do.",
            "Everything that others do must be of top-notch quality.",
            "I never aim for perfection in my work.",
            "Those around me readily accept that I can make mistakes too.",
            "It doesn’t matter when someone close to me does not do their absolute best.",
            "The better I do, the better I am expected to do.",
            "I seldom feel the need to be perfect.",
            "Anything I do that is less than excellent will be seen as poor work by those around me.",
            "I strive to be as perfect as I can be.",
            "It is very important that I am perfect in everything I attempt.",
            "I have high expectations for the people who are important to me.",
            "I strive to be the best at everything I do.",
            "The people around me expect me to succeed at everything I do.",
            "I do not have very high expectations for those around me.",
            "I demand nothing less than perfection from myself.",
            "Others will like me even if I don’t excel at everything.",
            "I can’t be bothered with people who won’t strive to better themselves.",
            "It makes me uneasy to see an error in my work.",
            "I do not expect a lot from my friends.",
            "Success means that I work even harder to please others.",
            "If I ask someone to do something, I expect it to be done flawlessly.",
            "I cannot stand to see people close to me make mistakes.",
            "I am perfectionistic in setting my goals.",
            "The people who matter to me should never let me down.",
            "Others think I am okay, even when I do not succeed.",
            "I feel that people are too demanding of me.",
            "I must work to my full potential at all times.",
            "Although they may not show it, other people get very upset with me when I slip up.",
            "I do not have to be the best at whatever I am doing.",
            "My family expects me to be perfect.",
            "I do not have very high goals for myself.",
            "My parents rarely expected me to excel in all aspects of my life.",
            "I respect people who are average.",
            "People expect nothing less than perfection from me.",
            "I set very high standards for myself.",
            "People expect more from me than I am capable of giving.",
            "I must always be successful at school or work.",
            "It does not matter to me when a close friend does not try their hardest.",
            "People around me think I am still competent even if I make a mistake.",
            "I seldom expect others to excel at whatever they do.",
            "Sometimes I am afraid I will be discovered for who I really am.",
            "I tend to feel like a phony.",
            "I'm afraid people important to me may find out that I'm not as capable as they think I am.",
            "In some situations I feel like an imposter.",
            "Sometimes I’m afraid others will discover how much knowledge or ability I really lack",
            "In some situations I feel like a \"great pretender\"; that is, I'm not as genuine as others think I am.",
            "In some situations I act like an \"imposter.\"",
            "I feel whole.",
            "I feel empty.",
            "All parts of myself are in harmony with each other.",
            "I often feel like I’m fighting a war with myself.",
            "I have accepted all sides of myself, even my darker sides.",
            "I feel fully human.",
            "I often don’t feel real.",
            "I feel as though I am wearing a mask most of the time.",
            "I am scared of some aspects of my self.",
            "I feel dead inside.",
            "My self feels fragmented.",
            "I embrace being multifaceted, even when I contradict myself.",
            "I wish I were more consistent in my feelings.",
            "It’s hard for me to figure out my own personality, interests, and opinions.",
            "I often think how fragile my existence is.",
            "I have a pretty good sense of what my long-term goals are in life.",
            "I sometimes wonder if people can actually see me.",
            "Other people’s thoughts and feelings seem to carry greater weight than my own.",
            "I have a clear and definite sense of who I am and what I’m all about.",
            "It bothers me that my personality doesn’t seem to be well-defined.",
            "I’m not sure that I can understand or put much trust in my thoughts and feelings.",
            "Who am I? is a question that I ask myself a lot.",
            "I need other people to help me understand what I think or how I feel.",
            "I tend to be very sure of myself and stick to my own preferences even when the group I am with expresses different preferences.",
            "I feel as if I don’t know myself very well.",
            "I feel out of touch with the \"real me.\"",
            "I feel alienated from myself.",
            "I don’t know how I really feel inside.",
            "I always stand by what I believe in.",
            "I am true to myself in most situations.",
            "I think it is better to be yourself, than to be popular.",
            "I live in accordance with my values and beliefs.",
            "I usually do what other people tell me to do.",
            "Other people influence me greatly.",
            "I am strongly influenced by the opinions of others.",
            "I always feel I need to do what others expect me to do.",
            "I tend to treat others as valuable.",
            "I don’t feel comfortable overtly manipulating people to do something I want.",
            "I prefer honesty over charm.",
            "When I talk to people, I am rarely thinking about what I want from them.",
            "I would like to be authentic even if it may damage my reputation.",
            "I’m quick to forgive people who have hurt me.",
            "I tend to admire others.",
            "I tend to applaud the successes of other people.",
            "I tend to trust that other people will deal fairly with me.",
            "I enjoy listening to people from all walks of life.",
            "I tend to see the best in people.",
            "I think people are mostly good.",
            "In most ways my life is close to my ideal.",
            "The conditions of my life are excellent.",
            "I am satisfied with my life.",
            "So far I have gotten the important things I want in life.",
            "If I could live my life over, I would change almost nothing.",
            "I am not afraid to voice my opinions, even when they are in opposition to the opinions of most people.",
            "In general, I feel I am in charge of the situation in which I live.",
            "I am not interested in activities that will expand my horizons.",
            "Most people see me as loving and affectionate.",
            "I live life one day at a time and don't really think about the future.",
            "When I look at the story of my life, I am pleased with how things have turned out.",
            "My decisions are not usually influenced by what everyone else is doing.",
            "The demands of everyday life often get me down.",
            "I think it is important to have new experiences that challenge how you think about yourself and the world.",
            "Maintaining close relationships has been difficult and frustrating for me.",
            "I have a sense of direction and purpose in life.",
            "In general, I feel confident and positive about myself.",
            "I tend to worry about what other people think of me.",
            "I do not fit very well with the people and the community around me.",
            "When I think about it, I haven't really improved much as a person over the years.",
            "I often feel lonely because I have few close friends with whom to share my concerns.",
            "My daily activities often seem trivial and unimportant to me.",
            "I feel like many of the people I know have gotten more out of life than I have.",
            "I tend to be influenced by people with strong opinions.",
            "I am quite good at managing the many responsibilities of my daily life.",
            "I have the sense that I have developed a lot as a person over time.",
            "I enjoy personal and mutual conversations with family members or friends.",
            "I don't have a good sense of what it is I'm trying to accomplish in life.",
            "I like most aspects of my personality.",
            "I have confidence in my opinions, even if they are contrary to the general consensus.",
            "I often feel overwhelmed by my responsibilities.",
            "I do not enjoy being in new situations that require me to change my old familiar ways of doing things.",
            "People would describe me as a giving person, willing to share my time with others.",
            "I enjoy making plans for the future and working to make them a reality.",
            "In many ways, I feel disappointed about my achievements in life.",
            "It's difficult for me to voice my own opinions on controversial matters.",
            "I have difficulty arranging my life in a way that is satisfying to me.",
            "For me, life has been a continuous process of learning, changing, and growth.",
            "I have not experienced many warm and trusting relationships with others.",
            "Some people wander aimlessly through life, but I am not one of them.",
            "My attitude about myself is probably not as positive as most people feel about themselves.",
            "I judge myself by what I think is important, not by the values of what others think is important.",
            "I have been able to build a home and a lifestyle for myself that is much to my liking.",
            "I gave up trying to make big improvements or changes in my life a long time ago.",
            "I know that I can trust my friends, and they know they can trust me.",
            "I sometimes feel as if I've done all there is to do in life.",
            "When I compare myself to friends and acquaintances, it makes me feel good about who I am.",
            "In general, to what extent do you lead a purposeful and meaningful life?",
            "How much of the time do you feel you are making progress towards accomplishing your goals?",
            "How often do you become absorbed in what you are doing?",
            "In general, how would you say your health is?",
            "In general, how often do you feel joyful?",
            "To what extent do you receive help and support from others when you need it?",
            "In general, how often do you feel anxious?",
            "How often do you achieve the important goals you have set for yourself?",
            "In general, to what extent do you feel that what you do in your life is valuable and worthwhile?",
            "In general, how often do you feel positive?",
            "In general, to what extent do you feel excited and interested in things?",
            "How lonely do you feel in your daily life?",
            "How satisfied are you with your current physical health?",
            "In general, how often do you feel angry?",
            "To what extent have you been feeling loved?",
            "How often are you able to handle your responsibilities?",
            "To what extent do you feel you have a sense of direction in your life?",
            "Compared to others of your same age and sex, how is your health?",
            "How satisfied are you with your personal relationships?",
            "In general, how often do you feel sad?",
            "How often do you lose track of time while doing something you enjoy?",
            "In general, to what extent do you feel contented?",
            "Taking all things together, howe happy would you say you are?",
            "I often seek out gurus for spiritual guidance.",
            "I read a lot of self-help books about personal development.",
            "Watching motivational videos on the Internet is a guilty pleasure of mine.",
            "I am so inspired by stories of people overcoming great odds.",
            "I have some favorite public figures whom I enjoy listening to for advice on how to live my life.",

            */

        ];

        var questionAnswerArray = [];
        var questionAnswerMapping = {};

        for(let i = 0, length = allQuestions.length; i < length; i++)
        {
            var currentQuestion = allQuestions[i];
            var currentAnswer = Number( prompt( QUESTION_INSTRUCTIONS + currentQuestion ) );

            var filteredAnswer = (currentAnswer < 30 ? currentAnswer : currentAnswer - 30);

            questionAnswerArray.push({
                textToAnswer : currentQuestion,
                answerAsOneBasedPercentage : ( filteredAnswer / 10 ),
                isForced : (currentAnswer < 30)
            });

            allAnswerQueries.push(questionAnswerArray[questionAnswerArray.length - 1]);

            questionAnswerMapping[currentQuestion] = currentAnswer;
        }

        console.log(questionAnswerArray);
        console.log(questionAnswerMapping);

        GM_setValue(SAVED_ANSWER_DATABASE_LOCATION,JSON.stringify(allAnswerQueries));

    }

    var allSingleAnswers = [];

    var allChoiceStructures = [];

    function choiceStructureHandleKeypresses(e)
    {
        var target = e.target;

        if(target.nodeName == "INPUT" && target.type.toUpperCase() == "TEXT") {return;} // If this is a text box, return.

        var keycode = e.keyCode;

        var currentRowAnswers = this.querySelectorAll(SINGLE_ANSWER_CSS_SELECTOR);

        var targetIndex = -1;

        if( codeMatchesBubbleEntry(keycode) )
        {
            e.preventDefault();
            targetIndex = keycodeToRadioIndex( keycode );
        }
        else if ( isNumpadKey(keycode) )
        {
            // debugger;
            e.preventDefault();
            targetIndex = createIndexFromOneBasedPercent( currentRowAnswers.length , numpadKeycodeToOneBasedPercent( keycode ) );
        }
        else // We're not interested otherwise and won't continue with any of this function.
        {
            return;
        }

        currentRowAnswers[targetIndex].click();
    }

    function singleAnswerHandleKeypresses(e)
    {
        var keycode = e.keyCode;

        var currentRowAnswers = allSingleAnswersOnSameRowAs(document.activeElement);

        var targetIndex = -1;

        if( codeMatchesBubbleEntry(keycode) )
        {
            e.preventDefault();
            targetIndex = keycodeToRadioIndex( keycode );
        }
        else if ( isNumpadKey(keycode) )
        {
            e.preventDefault();
            targetIndex = createIndexFromOneBasedPercent( numpadKeycodeToOneBasedPercent( keycode ) , currentRowAnswers.length );
        }
        else // We're not interested otherwise and won't continue with any of this function.
        {
            return;
        }

        currentRowAnswers[targetIndex].click();
    }

    function allSingleAnswersOnSameRowAs(singleAnswer)
    {
        var parentRow = singleAnswer.parentElement.parentElement.parentElement;

        return parentRow.querySelectorAll(SINGLE_ANSWER_CSS_SELECTOR);
    }

    // All of our color codes for headers are set up here until we get a database solution going in a later version of the script.
    // THIS NEEDS TO BE REFACTORED (its not the only query anymore, we have header color queries (this), and answer query sets).
    var allQueries = [
        new QueryColorPair("attention",DEEP_PURPLE),
        new QueryColorPair("click", DEEP_PURPLE),
        new QueryColorPair("check", DEEP_PURPLE),
        new QueryColorPair("mark", DEEP_PURPLE),
        new QueryColorPair("select", DEEP_PURPLE),
        new QueryColorPair("answer", DEEP_PURPLE),
        new QueryColorPair("blank", DEEP_PURPLE),
        new QueryColorPair("leave", DEEP_PURPLE),
        new QueryColorPair("do not answer, DEEP_PURPLE")
    ];

    var allSavedColorPairQueriesRaw = GM_getValue(SAVED_QUESTION_COLOR_DATABASE_LOCATION);

    if(allSavedColorPairQueriesRaw)
    {
        allQueries = JSON.parse( GM_getValue(SAVED_QUESTION_COLOR_DATABASE_LOCATION) );
    }

    function saveAnswerSetToFile(answerSet) {
        allAnswerQueries.push(answerSet);
        GM_setValue(SAVED_ANSWER_DATABASE_LOCATION, JSON.stringify(allAnswerQueries));
    }

    function saveAnswerOnHeaderToFile(header,forced) {
        var percentage = getAnswerAsOneBasedPercent(header);
        var questionText = header.querySelector("span").textContent.trim();
        var pair = new QueryAnswerSet(questionText, percentage, forced);

        saveAnswerSetToFile(pair);
    }

    function deleteSavedQuestionSets()
    {
        GM_setValue(SAVED_ANSWER_DATABASE_LOCATION, null);
    }

    function savePromptedQueryAnswerSet()
    {
        var userDefinedSnippet = prompt("Type the snippet you're looking for");
        var userDefinedPercent = Number(prompt("Enter your percentage as a scaler between 0-1 (i.e., 0.5 is 50%)."));
        var userDefinedIsForced = prompt("If you want to force the answer, type T.\nOtherwise, your answer will be hinted with a color code instead.");

        var isForced = (userDefinedIsForced.toLowerCase() === "y");

        if(userDefinedSnippet && (userDefinedPercent >= 0 && userDefinedPercent <= 1) ) {

            var createdAnswerSet = new QueryAnswerSet(userDefinedSnippet, userDefinedPercent, isForced);

            saveAnswerSetToFile(createdAnswerSet);
        }
    }

    console.log("All question queries: ", allQueries);

    var allAnswerQueries = [
        new QueryAnswerSet("Example of an answer forced to full right.",1,true),
        new QueryAnswerSet("Example of a suggested answer at full left.",0,false),
        new QueryAnswerSet("help themselves",0.5,true)
    ];

    var allAnswerQueryMappings = {};

    var allSavedAnswerQueriesRaw = GM_getValue(SAVED_ANSWER_DATABASE_LOCATION);

    if(allSavedAnswerQueriesRaw)
    {
        allAnswerQueries = JSON.parse( GM_getValue(SAVED_ANSWER_DATABASE_LOCATION) );

        for(let i = 0, length = allAnswerQueries.length; i < length; i++)
        {
            var currentQuestion = allAnswerQueries[i].textToAnswer;
            var currentAnswer = allAnswerQueries[i].answerAsOneBasedPercentage;

            if(allAnswerQueryMappings[i] == undefined) {allAnswerQueryMappings[ currentQuestion ] = currentAnswer;}
        }
    }

    console.log("All answer sets: ", allAnswerQueries);

    // We'll run with escape instead of automatically. This is currently our most major entry point into the entire script.
    document.addEventListener('keydown', handleEscape);

    // The main core of the script, which runs either after a certain amount of time, or after some other indicator tells it that we're good to go.
    function mainPageModifier() {

        //temporary
        // debugger;


        var allHeadersSelector = HEADER_CSS_SELECTOR; // The CSS selector we'll use in a minute to find all of our headers.

        listOfHeaders = document.querySelectorAll(allHeadersSelector);

        // If there are headers already, it means we added event listeners that need to be cleared. We need to clear their event listeners.
        for(let i = 0, length = headersIndexArray.length; i < length; i++)
        {
            headersIndexArray[i].removeEventListener('focus',handleHeaderFocus);
            headersIndexArray[i].removeEventListener('blur',handleHeaderBlur);
        }

        /*
         allSingleAnswers = document.querySelectorAll(SINGLE_ANSWER_CSS_SELECTOR);
         console.log("All Single Answers: ", allSingleAnswers);

         for( let i = 0, length = allSingleAnswers.length; i < length; i++)
         {
         console.log("attaching to single answer ", allSingleAnswers[i], " at index ", i);
         allSingleAnswers[i].addEventListener('keydown',singleAnswerHandleKeypresses);
         }
         */

        allChoiceStructures = document.querySelectorAll(CHOICE_STRUCTURE_CSS_SELECTOR);

        for (let i = 0, length = allChoiceStructures.length; i < length; i++)
        {
            allChoiceStructures[i].addEventListener('keydown',choiceStructureHandleKeypresses);
        }

        // Keep clearing predefined event handlers. Makes sure we don't double things or whatever. Ideally it shouldn't, but we're making sure.
        document.removeEventListener('keydown', handleEnter);
        if($qh(allHeadersSelector).length) {$qh(allHeadersSelector).off("keydown",handleKeypresses);}

        headersIndexMap = {};
        headersIndexArray = [];

        for (let i = 0, length = listOfHeaders.length; i < length; i++)
        {
            let currentHeader = listOfHeaders[i];

            headersIndexMap[currentHeader.id] = i;
            headersIndexArray[i] = currentHeader;

            currentHeader.addEventListener('focus', handleHeaderFocus);
            currentHeader.addEventListener('blur', handleHeaderBlur);
        }

        console.log("Headers Map ", headersIndexMap);
        console.log("Headers Array ", headersIndexArray);

        console.log("All headers ", listOfHeaders);

        highlightAllPairs();

        doAllPredefinedAnswers();

        // Handle keydown events.
        $qh(allHeadersSelector).on("keydown",handleKeypresses);

        document.addEventListener('keydown', handleEnter);
    }

    // deleteSavedQuestionSets(); // temporary workaround to delete the questions on next load. commented out by default.

})();