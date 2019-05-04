// ==UserScript==
// @name         Qualtrics MK2 DEV SNAPSHOT 10-19-17 646pm
// @namespace    salembeats
// @version      1
// @description  .
// @author       Cuyler Stuwe (salembeats)
// @include      /\.qualtrics\./
// @grant        none
// ==/UserScript==

// Keycodes.
const KEYCODE_TAB = 9,
    KEYCODE_ENTER = 13,
    KEYCODE_LEFTARROW = 37,
    KEYCODE_RIGHTARROW = 39,
    KEYCODE_UPARROW = 38,
    KEYCODE_DOWNARROW = 40,
    KEYCODE_ESCAPE = 27,
    KEYCODE_NUMBER_ROW_1 = 49,
    KEYCODE_NUMBER_ROW_2 = 50,
    KEYCODE_NUMBER_ROW_3 = 51,
    KEYCODE_NUMBER_ROW_4 = 52,
    KEYCODE_NUMBER_ROW_5 = 53,
    KEYCODE_NUMBER_ROW_6 = 54,
    KEYCODE_NUMBER_ROW_7 = 55,
    KEYCODE_NUMBER_ROW_8 = 56,
    KEYCODE_NUMBER_ROW_9 = 57,
    KEYCODE_NUMBER_ROW_0 = 58,
    KEYCODE_NUMPAD_1 = 97,
    KEYCODE_NUMPAD_2 = 98,
    KEYCODE_NUMPAD_3 = 99,
    KEYCODE_NUMPAD_4 = 100,
    KEYCODE_NUMPAD_5 = 101,
    KEYCODE_NUMPAD_6 = 102,
    KEYCODE_NUMPAD_7 = 103,
    KEYCODE_NUMPAD_8 = 104,
    KEYCODE_NUMPAD_9 = 105,
    KEYCODE_NUMPAD_0 = 96,
    KEYCODE_SPACEBAR = 32,
    KEYCODE_BACKSPACE = 8;

function isPrintableKey(keycode) {
    return (keycode > 47 && keycode < 58) || // number keys
        keycode == 32 || keycode == 13 || // spacebar & return key(s) (if you want to allow carriage returns)
        (keycode > 64 && keycode < 91) || // letter keys
        (keycode > 95 && keycode < 112) || // numpad keys
        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
        (keycode > 218 && keycode < 223); // [\]' (in order)
}

function isNumberRowKey(keycode) {
    switch (keycode) {
        case KEYCODE_NUMBER_ROW_1:
        case KEYCODE_NUMBER_ROW_2:
        case KEYCODE_NUMBER_ROW_3:
        case KEYCODE_NUMBER_ROW_4:
        case KEYCODE_NUMBER_ROW_5:
        case KEYCODE_NUMBER_ROW_6:
        case KEYCODE_NUMBER_ROW_7:
        case KEYCODE_NUMBER_ROW_8:
        case KEYCODE_NUMBER_ROW_9:
        case KEYCODE_NUMBER_ROW_0:
            return true;
        default:
            return false;
    }
}

function isNumberPadKey(keycode) {
    switch (keycode) {
        case KEYCODE_NUMPAD_1:
        case KEYCODE_NUMPAD_2:
        case KEYCODE_NUMPAD_3:
        case KEYCODE_NUMPAD_4:
        case KEYCODE_NUMPAD_5:
        case KEYCODE_NUMPAD_6:
        case KEYCODE_NUMPAD_7:
        case KEYCODE_NUMPAD_8:
        case KEYCODE_NUMPAD_9:
        case KEYCODE_NUMPAD_0:
            return true;
        default:
            return false;
    }
}

function isNumericKey(keycode) {
    return (isNumberPadKey(keycode) || isNumberRowKey(keycode));
}


function injectStyleSheets() {
    document.styleSheets[0].insertRule(
        `@keyframes highlightAnimation {` +
        `0% {}` +
        `25% {}` +
        `50% {}` +
        `75% {}` +
        `100% {}`, 0);

    document.styleSheets[0].insertRule(
        `.Skin .Matrix div table {` +
        `border-collapse: collapse !important;` +
        `}`, 0);

    document.styleSheets[0].insertRule(
        `.highlightedSurveyInput {` +
        `background: #fff2f2 !important;` +
        `color: black !important;` +
        `border: 5px solid red !important;` +
        `animation: highlightAnimation 1s infinite linear !important;` +
        `}`, 0);
}

/**
 * We'll use this to look through pages and find important information,
 * like expected completion times, completion codes, survey limitations (certain races, etc.).
 * May or may not be used to detect attention checks as well, or that might be part of the question/input objects.
 * Depends on what makes the most sense organization-wise as things develop.
 */
var SmartParser = (function createSmartParser() {

    const surveyCodePhrases = [
        "Your validation code is:"
    ];

    const endOfSurveyPhrases = [
        "We thank you for your time spent taking this survey. Your response has been recorded."
    ];

    return {

    };

})();

/**
 * 
 */
var SurveyOverlay = (function createSurveyOverlay() {

    var _customOverlays = [];

    function _getOverlayById(id) {
        for (let customOverlay of _customOverlays) {
            if (id === customOverlay.id) {
                return customOverlay;
            }
        }

        return undefined;
    }

    function _isOverlayDisplaying(id) {
        return (_getOverlayById(id).element.style.display !== "none");
    }

    function _displaySavedOverlay(id) {
        _getOverlayById(id).element.style.display = "block";
    }

    function _hideSavedOverlay(id) {
        _getOverlayById(id).element.style.display = "none";
    }

    function _updateSavedOverlay(id, htmlContents, left, top) {
        let overlay = _getOverlayById(id);
        overlay.element.innerHTML = htmlContents;
        overlay.element.left = left;
        overlay.element.top = top;
    }

    function _createNewOverlay(id, htmlContents, left, top) {

        let newOverlayElement = document.createElement("DIV");
        newOverlayElement.innerHTML = htmlContents;
        newOverlayElement.style.left = left;
        newOverlayElement.style.top = top;
        newOverlayElement.style.width = "400px";
        newOverlayElement.style.marginLeft = "-200px";
        newOverlayElement.style.position = "fixed";
        newOverlayElement.style.zIndex = Number.MAX_SAFE_INTEGER;
        newOverlayElement.style.display = "none";

        document.body.insertAdjacentElement('beforebegin', newOverlayElement);

        let newOverlayObject = {
            element: newOverlayElement,
            id: id
        };

        _customOverlays.push(newOverlayObject);
    }

    function showCustomOverlay(id, htmlContents, left, top) {
        let overlay = _getOverlayById(id);
        if (!overlay) {
            overlay = _createNewOverlay(id, htmlContents, left, top);
        } else {
            _updateSavedOverlay(id, htmlContents, left, top);
        }

        _displaySavedOverlay(id);
    }

    function hideCustomOverlay(id) {
        let overlay = _getOverlayById(id);
        if (overlay) {
            _hideSavedOverlay(id);
        }
    }

    var _numberRowHintsDiv = document.createElement("DIV");
    _numberRowHintsDiv.display = "none";
    _numberRowHintsDiv.style.position = "fixed";
    _numberRowHintsDiv.style.left = "0px";
    _numberRowHintsDiv.style.top = "85%";
    _numberRowHintsDiv.style.width = "100%";
    _numberRowHintsDiv.style.background = "#000000";
    _numberRowHintsDiv.style.color = "#FFFFFF";
    _numberRowHintsDiv.style.textAlign = "center";
    _numberRowHintsDiv.style.fontFamily = "" +
        "Times New Roman," +
        "Ubunto Mono," +
        "Monospace," +
        "Arial Black";
    _numberRowHintsDiv.style.zIndex = Number.MAX_SAFE_INTEGER;
    _numberRowHintsDiv.style.opacity = "0.9";
    _numberRowHintsDiv.innerHTML = "";
    document.body.insertAdjacentElement('beforebegin', _numberRowHintsDiv);

    function showHint(htmlString) {
        _numberRowHintsDiv.innerHTML = htmlString;
        _numberRowHintsDiv.style.display = "block";
    }

    function hideHint() {
        _numberRowHintsDiv.style.display = "none";
    }

    return {
        showHint,
        hideHint,
        showCustomOverlay,
        hideCustomOverlay
    };
})();

// TODO: Implement this on a question by question basis.
// That way, it doesn't trigger on Rank Orders and stuff.
// Copied straight from from my other standalone Qualtrics script.
function createCharacterCountersForAllTextFields() {
    document.querySelectorAll("fieldset input[type='TEXT'],fieldset textarea").forEach((el) => {
        let newElement = document.createElement("DIV");
        newElement.classList.add("characterCounterClass");
        newElement.innerText = "Characters Entered: [ ], Word Estimate: [ ]";
        el.insertAdjacentElement('afterend', newElement);
        el.addEventListener('keyup', () => {
            let numberOfSpaces = (el.value.match(/ /g) || "").length;
            newElement.innerText = `Characters Entered: [${el.value.length}], Word Estimate: [${numberOfSpaces}]`;
        });
    });
}

function removeCharacterCountersFromAllTextFields() {
    let allCharacterCounters = document.querySelectorAll(".characterCounterClass");
    if (allCharacterCounters) {
        allCharacterCounters.forEach(el => el.remove());
    }
}

/**
 * An individual input for a survey question.
 */
var SurveyInput = (function createSurveyInput() {

    var _inputHandler = (function (event) {});
    var _subElement;
    var _questionType;
    var _parentQuestion;
    var _this;
    var _implementedKeycodes = [];
    var _implementsAllKeycodes = false;
    var _implementsPrintableKeycodes = false;
    var _title;
    var _lostFocusCallback = function () {};
    var _gainedFocusCallback = function () {};
    var _validationCallback = function () {
        return true;
    };
    var _isUsingRegularEncoding = true;
    var _allMultipleChoiceAnswers;
    var _userSearchString;

    function hasAcceptableInput() {
        return _validationCallback();
    }

    function setEncodingToRegular(isRegular) {
        _isUsingRegularEncoding = isRegular;
    }

    function highlight() {
        _subElement.classList.add("highlightedSurveyInput");
    }

    function unHighlight() {
        _subElement.classList.remove("highlightedSurveyInput");
    }

    function onGainFocus() {
        _gainedFocusCallback();
    }

    function onLostFocus() {
        _lostFocusCallback();
    }

    function _implementNumberRowKeycodes() {
        _implementedKeycodes.push(KEYCODE_NUMBER_ROW_1);
        _implementedKeycodes.push(KEYCODE_NUMBER_ROW_2);
        _implementedKeycodes.push(KEYCODE_NUMBER_ROW_3);
        _implementedKeycodes.push(KEYCODE_NUMBER_ROW_4);
        _implementedKeycodes.push(KEYCODE_NUMBER_ROW_5);
        _implementedKeycodes.push(KEYCODE_NUMBER_ROW_6);
        _implementedKeycodes.push(KEYCODE_NUMBER_ROW_7);
        _implementedKeycodes.push(KEYCODE_NUMBER_ROW_8);
        _implementedKeycodes.push(KEYCODE_NUMBER_ROW_9);
        _implementedKeycodes.push(KEYCODE_NUMBER_ROW_0);
    }

    function _implementNumpadKeycodes() {
        _implementedKeycodes.push(KEYCODE_NUMPAD_1);
        _implementedKeycodes.push(KEYCODE_NUMPAD_2);
        _implementedKeycodes.push(KEYCODE_NUMPAD_3);
        _implementedKeycodes.push(KEYCODE_NUMPAD_4);
        _implementedKeycodes.push(KEYCODE_NUMPAD_5);
        _implementedKeycodes.push(KEYCODE_NUMPAD_6);
        _implementedKeycodes.push(KEYCODE_NUMPAD_7);
        _implementedKeycodes.push(KEYCODE_NUMPAD_8);
        _implementedKeycodes.push(KEYCODE_NUMPAD_9);
        _implementedKeycodes.push(KEYCODE_NUMPAD_0);
    }

    function _implementArrowKeys() {
        _implementedKeycodes.push(KEYCODE_LEFTARROW);
        _implementedKeycodes.push(KEYCODE_RIGHTARROW);
        _implementedKeycodes.push(KEYCODE_UPARROW);
        _implementedKeycodes.push(KEYCODE_DOWNARROW);
    }

    function _pressIndexedButton(index) {
        if (!Number.isInteger(index)) {
            return;
        }
        let radios = _subElement.querySelectorAll("input");
        if (index < radios.length) {
            radios[index].click();
        }
    }

    function _invertProportion(oneBasedProportion) {
        return Math.abs(1 - oneBasedProportion);
    }

    function _proportionToIndex(oneBasedProportion, length) {
        return Math.round((length - 1) * oneBasedProportion);
    }

    function _pressProportionateButton(oneBasedProportion) {
        let length = _subElement.querySelectorAll("input").length;
        _pressIndexedButton(_proportionToIndex(oneBasedProportion, length));
    }

    function _keycodeToProportion(keycode) {
        switch (keycode) {
            case KEYCODE_NUMPAD_1:
                return 0;
            case KEYCODE_NUMPAD_2:
                return 0.125;
            case KEYCODE_NUMPAD_3:
                return 0.25;
            case KEYCODE_NUMPAD_4:
                return 0.375;
            case KEYCODE_NUMPAD_5:
                return 0.5;
            case KEYCODE_NUMPAD_6:
                return 0.625;
            case KEYCODE_NUMPAD_7:
                return 0.75;
            case KEYCODE_NUMPAD_8:
                return 0.875;
            case KEYCODE_NUMPAD_9:
                return 1;
            case KEYCODE_NUMPAD_0:
                return 0;
            default:
                break;
        }
    }

    function _defaultEventHandler(event) {
        console.log(`Default event handler for input with _subElement HTML of ${_subElement.innerHTML}`);
    }

    function _textInputEventHandler(event) {

    }

    function _labelInputEventHandler(event) {

    }

    function _clickMultipleChoiceAnswerByString(matchString) {
        if (_userSearchString !== undefined) {
            for (let multipleChoiceAnswer of _allMultipleChoiceAnswers) {
                if (multipleChoiceAnswer.innerText.toLowerCase().includes(matchString)) {
                    (multipleChoiceAnswer.querySelector("input") ||
                        multipleChoiceAnswer.querySelector("label")).click();
                    break;
                }
            }
        }
    }

    function _clearUserSearchString() {
        _userSearchString = undefined;
    }

    function addKeycodeToSearchString(keycode) {
        if (_userSearchString !== undefined) {
            _userSearchString += String.fromCharCode(event.keyCode).toLowerCase();
        } else {
            _userSearchString = String.fromCharCode(event.keyCode).toLowerCase();
        }
    }

    function _removeLastKeycodeFromSearchString() {
        if (_userSearchString !== undefined) {
            _userSearchString = _userSearchString.substr(0, _userSearchString.length - 1);

            if (_userSearchString.length === 0) {
                _clearUserSearchString();
            }
        }
    }

    function _multipleChoiceEventHandler(event) {

        if (event.type === 'keydown' && isNumericKey(event.keyCode)) {
            if(isNumberRowKey(event.keyCode)) {
                _pressIndexedButton(Number(event.key) - 1);
            }
            else {
                _pressProportionateButton(_keycodeToProportion(event.keyCode));
            }
            _clearUserSearchString();
            SurveyPage.gotoNextQuestion();
        } else if (event.type === 'keyup') {
            if (event.keyCode === KEYCODE_ESCAPE) {
                _clearUserSearchString();
            } else if (event.keyCode == KEYCODE_ENTER) {
                _clickMultipleChoiceAnswerByString(_userSearchString);
                _clearUserSearchString();
            } else if (event.keyCode == KEYCODE_BACKSPACE) {
                _removeLastKeycodeFromSearchString();
            }
            if (isPrintableKey(event.keyCode) && (!isNumericKey(event.keyCode))) {
                addKeycodeToSearchString(event.keyCode);
                let searchMatches = [];
                for (let i = 0, iFinal = _allMultipleChoiceAnswers.length; i < iFinal; i++) {
                    let multipleChoiceAnswer = _allMultipleChoiceAnswers[i];
                    if (multipleChoiceAnswer.innerText.toLowerCase().includes(_userSearchString)) {
                        searchMatches.push(multipleChoiceAnswer);
                    }
                }
                if (searchMatches.length === 1) {
                    _clickMultipleChoiceAnswerByString(_userSearchString);
                    _clearUserSearchString();
                    SurveyPage.gotoNextQuestion();
                }
                if (searchMatches.length === 0) {
                    _clearUserSearchString();
                }
            }
        }

        // Show the search query, if it exists.
        // Otherwise, if our keypress killed it, hide it.
        if (event.type === "keyup" && _userSearchString !== undefined) {
            SurveyOverlay.showCustomOverlay("multipleChoiceSearchOverlay",
                `<div style="margin: auto; text-align:center; background: yellow;">` +
                `<div>Trying to click multiple choice answer with text:</div>` +
                `<div style="background: black; color: white; font-size: 1.5em;">${_userSearchString}</div>` +
                `Press <strong>Enter</strong> to select the 1st Match, <strong>Esc</strong> to clear to search, or <strong>Backspace</strong> to delete the last letter.` +
                `</div>`,
                "50%",
                "50%");
        } else if (_userSearchString === undefined) {
            SurveyOverlay.hideCustomOverlay("multipleChoiceSearchOverlay");
        }
    }

    function _autoNextInputOrQuestion() {
        if (_parentQuestion.isOnLastInput()) {
            SurveyPage.gotoNextQuestion();
        } else {
            _parentQuestion.gotoNextInput();
        }
    }

    function _normalMatrixEventHandler(event) {
        if (event.type === 'keydown') {

            if (isNumberRowKey(event.keyCode)) {
                _pressIndexedButton(Number(event.key) - 1);
            } else if (isNumberPadKey(event.keyCode)) {
                if (_isUsingRegularEncoding) {
                    _pressProportionateButton(_keycodeToProportion(event.keyCode));
                } else {
                    _pressProportionateButton(
                        _invertProportion(
                            _keycodeToProportion(event.keyCode)));
                }
            }

            _autoNextInputOrQuestion();
        }
    }

    function _init() {
        switch (_questionType) {
            case "textInput":
                _inputHandler = _textInputEventHandler;
                _implementsPrintableKeycodes = true;
                _gainedFocusCallback = function () {
                    _subElement.querySelector("input[type='TEXT']").focus();
                };
                _lostFocusCallback = function () {
                    _subElement.querySelector("input[type='TEXT']").blur();
                };
                break;
            case "label":
                _inputHandler = _labelInputEventHandler;
                break;
            case "multipleChoice":
                _inputHandler = _multipleChoiceEventHandler;
                _allMultipleChoiceAnswers = _subElement.querySelectorAll("li, td");
                _gainedFocusCallback = function () {
                    SurveyOverlay.showHint(`<br/><div style="width: 50%; margin: auto; color: black; background: white; font-size: 1.5em;">` +
                        `"${_parentQuestion.getTitle().substr(0,155)}"</div><br/>` +
                        `This is a multiple choice question.<br/>Use the number row to select an answer by index.<br/>&nbsp;`);
                };
                _lostFocusCallback = function () {
                    SurveyOverlay.hideCustomOverlay("multipleChoiceSearchOverlay");
                    SurveyOverlay.hideHint();
                    _clearUserSearchString();
                };
                _implementNumpadKeycodes();
                _implementNumberRowKeycodes();
                _implementedKeycodes.push(KEYCODE_ESCAPE);
                _implementedKeycodes.push(KEYCODE_ENTER);
                _implementedKeycodes.push(KEYCODE_BACKSPACE);
                _implementsPrintableKeycodes = true;
                break;
            case "multipleChoiceDropdown":
                _gainedFocusCallback = function () {
                    _subElement.querySelector("select").focus();
                };
                _lostFocusCallback = function () {
                    _subElement.querySelector("select").blur();
                };
                break;
            case "normalMatrix":
                _inputHandler = _normalMatrixEventHandler;
                _title = _subElement.querySelector("th").innerText.trim();
                _gainedFocusCallback = function () {
                    SurveyOverlay.showHint(`<br/><div style="width: 50%; margin: auto; color: black; background: white; font-size: 1.5em;">` +
                        `"${_title}"</div><br/>` +
                        `This is a matrix input.<br/>Use number row to select an answer by index.<br/>&nbsp;`);
                };
                _lostFocusCallback = function () {
                    SurveyOverlay.hideHint();
                };
                _implementNumpadKeycodes();
                _implementNumberRowKeycodes();
                break;
            case "rankOrderRadioButtons":
            case "rankOrderVertical":
            case "sideBySideSingleColumn":
            case "sideBySideMultiColumn":
            case "multipleChoiceMultipleAnswer":
            case "sliderStars":
            case "sliderGroupStars":
            case "maxDiffMatrix":
            case "profileMatrix":
            case "bipolarMatrix":
            case "slider":
            case "sliderGroup":
            case "rankOrderDragAndDrop":
            case "image":
                break;
            default:
                _inputHandler = _defaultEventHandler;
                _implementedKeycodes.push(KEYCODE_ESCAPE); // TODO: Remove this test.
                break;
        }
    }

    function handleInputEvent(event) {
        _inputHandler(event);
    }

    function createFromSubElementAndType(subElement, questionType, parentQuestion) {
        _this = this;
        _subElement = subElement;
        _questionType = questionType;
        _parentQuestion = parentQuestion;
        _init();
    }

    function hasImplementedKeycode(keycode) {
        if (_implementsAllKeycodes) {
            return true;
        } else if (_implementsPrintableKeycodes) {
            if (isPrintableKey(keycode)) {
                return true;
            }
        }
        return _implementedKeycodes.includes(keycode);
    }

    function getSubElement() {
        return _subElement;
    }

    return {
        handleInputEvent,

        /**
         * 
         */
        createFromSubElementAndType,

        /**
         * 
         */
        hasImplementedKeycode,
        /**
         * 
         */
        highlight,
        /**
         * 
         */
        unHighlight,
        /**
         * 
         */
        getSubElement,
        /**
         * 
         */
        onGainFocus,
        /**
         * 
         */
        onLostFocus,
        /**
         * 
         */
        setEncodingToRegular
    };

});

/**
 * An individual survey question, which may contain multiple inputs
 * (i.e., in the case of a Matrix).
 */
var SurveyQuestion = (function createSurveyQuestion() {

    var _fieldset;
    var _questionType;
    var _title;
    var _titleElement;
    var _childInputs = [];
    var _selectedInput;
    var _selectedInputIndex;
    var _this;
    var _lostFocusCallback = function () {};
    var _gainedFocusCallback = function () {};
    var _isUsingRegularEncoding;

    function _determineEncodingDirection() {
        if (_questionType === "normalMatrix") {
            let allHeadingElements = _fieldset.querySelectorAll("th[scope='col']");
            let firstHeadingElement = allHeadingElements[0];
            let lastHeadingElement = allHeadingElements[allHeadingElements.length - 1];
            let firstHeadingValue = Number((firstHeadingElement.innerText.match(/\b\d+\b/)||"")[0]);
            let lastHeadingValue = Number((lastHeadingElement.innerText.match(/\b\d+\b/)||"")[0]);
            if (!Number.isNaN(firstHeadingValue) && !Number.isNaN(lastHeadingValue)) {
                _isUsingRegularEncoding = (firstHeadingValue <= lastHeadingValue);
            } else if (lastHeadingElement.innerText.toLowerCase().includes("disagree")) {
                _isUsingRegularEncoding = false;
            }
            else {
                _isUsingRegularEncoding = true;
            }
        } else {
            _isUsingRegularEncoding = true;
        }
    }

    function onGainFocus() {
        _gainedFocusCallback();
        _selectedInput.onGainFocus();
    }

    function onLostFocus() {
        _selectedInput.onLostFocus();
        _lostFocusCallback();
    }

    /**
     * 
     */
    function _init() {
        _determineQuestionType();
        _determineEncodingDirection();
        _initTitle();
        _initInputsAndCallbacks();
    }

    function _initTitle() {
        switch (_questionType) {
            case "rankOrderRadioButtons":
            case "rankOrderVertical":
            case "sideBySideSingleColumn":
            case "sideBySideMultiColumn":
            case "textInput":
            case "label":
            case "multipleChoiceMultipleAnswer":
            case "multipleChoiceDropdown":
            case "sliderStars":
            case "sliderGroupStars":
            case "multipleChoice":
            case "normalMatrix":
            case "maxDiffMatrix":
            case "profileMatrix":
            case "bipolarMatrix":
            case "slider":
            case "sliderGroup":
            case "rankOrderDragAndDrop":
                _title = _fieldset.querySelector(".QuestionText").innerText.trim();
                _titleElement = _fieldset.querySelector(".QuestionText");
                break;
            case "image":
                _title = _fieldset.querySelector("img").alt;
                _titleElement = _fieldset.querySelector("img");
                break;
            default:
                break;
        }

        if (_title) {
            console.log(`%cTitle detected as [${_title}] (Without square brackets.)`,
                "color: gray; background: green;");
        }
    }

    function _initInputsAndCallbacks() {
        //TODO: Actually set up the child inputs right here, depending on the type of question.
        switch (_questionType) {
            case "normalMatrix":
                let choiceRows = _fieldset.querySelectorAll("tr.ChoiceRow");
                for (let i = 0, iFinal = choiceRows.length; i < iFinal; i++) {
                    let choiceRow = choiceRows[i];
                    let matrixInput = new SurveyInput();
                    matrixInput.createFromSubElementAndType(choiceRow, _questionType, _this);
                    matrixInput.setEncodingToRegular(_isUsingRegularEncoding);
                    _childInputs.push(matrixInput);
                    console.log("Added matrix input", matrixInput.getSubElement());
                }
                break;
            case "multipleChoice":
            case "label":
            case "rankOrderRadioButtons":
            case "rankOrderVertical":
            case "sideBySideSingleColumn":
            case "sideBySideMultiColumn":
            case "textInput":
            case "multipleChoiceMultipleAnswer":
            case "multipleChoiceDropdown":
            case "sliderStars":
            case "sliderGroupStars":
            case "maxDiffMatrix":
            case "profileMatrix":
            case "bipolarMatrix":
            case "slider":
            case "sliderGroup":
            case "rankOrderDragAndDrop":
            case "image":
            default:
                let undefinedInput = new SurveyInput();
                undefinedInput.createFromSubElementAndType(_fieldset, _questionType, _this);
                _childInputs.push(undefinedInput);
                break;
        }

        if (_childInputs) {
            _selectedInput = _childInputs[0];
            _selectedInputIndex = 0;
        }
    }

    /**
     * Assumes that we've already filled the SurveyQuestion with a fieldset.
     */
    function _determineQuestionType() {
        //TODO: Finish all determinations.

        if (_fieldset.querySelector("th[id*='header~choice']")) {
            _questionType = "rankOrderRadioButtons";
        }

        if (_fieldset.querySelector(".RankInput")) {
            _questionType = "rankOrderVertical";
        }

        if (_fieldset.querySelector("fieldset")) {
            if (_fieldset.querySelectorAll("tr.Headings th").length === 1) {
                _questionType = "sideBySideSingleColumn";
            } else {
                _questionType = "sideBySideMultiColumn";
            }
        }

        if (_fieldset.querySelector(".QuestionBody") &&
            _fieldset.querySelector(".QuestionBody").innerText.trim() === "" &&
            !_fieldset.querySelector("select")) {

            if (_fieldset.querySelector("img")) {
                _questionType = "image";
            } else if (_fieldset.querySelector("input[type='TEXT']")) {
                _questionType = "textInput";
            } else {
                _questionType = "label";
            }
        }

        if (_fieldset.querySelector("select")) {
            if (_fieldset.querySelectorAll("select").length === 1) {

                if (_fieldset.querySelector("select[size]")) {
                    _questionType = "multipleChoiceMultipleAnswer";
                } else {
                    _questionType = "multipleChoiceDropdown";
                }
            }
        }

        if (_fieldset.querySelector("div.StarsContainer")) {
            if (_fieldset.querySelectorAll("div.StarsContainer").length === 1) {
                _questionType = "sliderStars";
            } else {
                _questionType = "sliderGroupStars";
            }
        }

        if (_fieldset.querySelector("div.QuestionText") &&
            _fieldset.querySelector("input.radio")) {
            _questionType = "multipleChoice";
        }

        if (_fieldset.querySelector("label.QuestionText") &&
            _fieldset.querySelector("div.QuestionBody.q-matrix") &&
            _fieldset.querySelector("tr.Answers") &&
            !_fieldset.querySelector("fieldset")) {
            _questionType = "normalMatrix";
        }

        if (_fieldset.querySelector("th[width='37.5%']")) {
            if (_fieldset.querySelectorAll("th[width='37.5%']").length === 2) {
                _questionType = "maxDiffMatrix";
            }
        }

        if (_fieldset.querySelector("label.QuestionText") &&
            _fieldset.querySelector("div.QuestionBody.q-matrix") &&
            !_fieldset.querySelector("tr.Answers") &&
            !_fieldset.querySelector("fieldset")) {
            _questionType = "profileMatrix";
        }

        if (_fieldset.querySelector(".AnswerRight") ||
            _fieldset.querySelector(".AnswerLeft")) {
            _questionType = "bipolarMatrix";
        }

        if (_fieldset.querySelector(".slider-container")) {
            if (_fieldset.querySelectorAll(".slider-container").length === 1) {
                _questionType = "slider";
            } else {
                _questionType = "sliderGroup";
            }
        }

        if (_fieldset.querySelector(".BarContainer")) {
            if (_fieldset.querySelectorAll(".BarContainer").length === 1) {
                _questionType = "slider";
            } else {
                _questionType = "sliderGroup";
            }
        }

        if (_fieldset.querySelector(".ui-sortable-handle")) {
            _questionType = "rankOrderDragAndDrop";
        }

        if (_questionType) {
            console.log(`%cQuestion Type detected as ${_questionType}`,
                "color: white; background: green;");
        }
    }

    /**
     * 
     */
    function isOnFirstInput() {
        return _selectedInputIndex === 0;
    }

    /**
     * 
     */
    function isOnLastInput() {
        return _selectedInputIndex === _childInputs.length - 1;
    }

    function gotoNextInput() {
        if (!isOnLastInput()) {
            _selectedInput.onLostFocus();
            _selectedInputIndex++;
            _selectedInput = _childInputs[_selectedInputIndex];
            _selectedInput.onGainFocus();
        }
    }

    function gotoPreviousInput() {
        if (!isOnFirstInput()) {
            _selectedInput.onLostFocus();
            _selectedInputIndex--;
            _selectedInput = _childInputs[_selectedInputIndex];
            _selectedInput.onGainFocus();
        }
    }

    /**
     * 
     * @param {*} fieldset 
     */
    function createFromFieldset(fieldset) {
        console.log("Creating SurveyQuestion with question field", fieldset);
        _this = this;
        _fieldset = fieldset;
        _init();
    }

    /**
     * 
     * @param {*} event 
     */
    function handleInputEvent(event) {
        // TODO: Be more precise about delegating user input.
        if (_selectedInput.hasImplementedKeycode(event.keyCode)) {
            _selectedInput.handleInputEvent(event);
        } else {
            if (event.type === "keyup") {
                if (isKeyForwardKey(event.keyCode)) {
                    gotoNextInput();
                } else if (isKeyReverseKey(event.keyCode)) {
                    gotoPreviousInput();
                }
            }
        }
    }

    function hasImplementedKeycode(keycode) {
        if (_selectedInput.hasImplementedKeycode(keycode)) {
            return true;
        }
        if (isKeyForwardKey(keycode) && !isOnLastInput()) {
            return true;
        }
        if (isKeyReverseKey(keycode) && !isOnFirstInput()) {
            return true;
        }
        return false;
    }

    function getType() {
        return _questionType;
    }

    function getTitle() {
        return _title;
    }

    function getTitleElement() {
        return _titleElement;
    }

    function getSelectedInput() {
        return _selectedInput;
    }

    return {
        getTitle,
        /**
         * 
         */
        getType,
        /**
         * 
         */
        isOnLastInput,
        /**
         * 
         */
        createFromFieldset,
        /**
         * 
         */
        handleInputEvent,
        /**
         * 
         */
        getTitleElement,
        /**
         * 
         */
        isOnFirstInput,
        /**
         * 
         */
        isOnLastInput,
        /**
         * 
         */
        getSelectedInput,
        /**
         * 
         */
        hasImplementedKeycode,
        /**
         * 
         */
        onGainFocus,
        /**
         * 
         */
        onLostFocus,
        /**
         * 
         */
        gotoNextInput,
        /**
         * 
         */
        gotoPreviousInput
    };
});

/**
 * The state of the current survey page.
 */
var SurveyPage = (function createSurveyPage() {

    var _fieldsetList = [];
    var _questionList = [];
    var _selectedQuestion;
    var _selectedQuestionIndex;
    var _this;

    function _init() {
        // TODO: Initialize the survey page with the page's fieldset list.
        _questionList = [];
        for (let i = 0, iFinal = _fieldsetList.length; i < iFinal; i++) {
            let fieldset = _fieldsetList[i];
            let newQuestion = new SurveyQuestion();
            newQuestion.createFromFieldset(fieldset);
            _questionList.push(newQuestion);
        }

        _selectedQuestion = _questionList[0];
        _selectedQuestionIndex = 0;
        _selectedQuestion.onGainFocus();
    }

    function createFromQuestionFields(fieldsetList) {
        console.log("Creating SurveyPage with question fields", fieldsetList);
        _fieldsetList = fieldsetList;
        _init();
    }

    function isOnFirstQuestion() {
        return _selectedQuestionIndex === 0;
    }

    function isOnLastQuestion() {
        return _selectedQuestionIndex === _questionList.length - 1;
    }

    function gotoNextQuestion() {
        if (!isOnLastQuestion()) {
            _selectedQuestion.onLostFocus();
            _selectedQuestionIndex++;
            _selectedQuestion = _questionList[_selectedQuestionIndex];
            _selectedQuestion.onGainFocus();
        }
    }

    function gotoPreviousQuestion() {
        if (!isOnFirstQuestion()) {
            _selectedQuestion.onLostFocus();
            _selectedQuestionIndex--;
            _selectedQuestion = _questionList[_selectedQuestionIndex];
            _selectedQuestion.onGainFocus();
        }
    }

    function gotoNextSurveyPage() {
        // This code was put elsewhere, on the thing that reacts to DOM mutations of the page actually changing.
        // _selectedQuestion.getSelectedInput().onLostFocus();
        // _selectedQuestion.onLostFocus();
        document.querySelector("#NextButton").click();
    }

    function _processNavigationKeys(event) {
        if (event.type === "keyup") {
            if (isKeyForwardKey(event.keyCode)) {
                gotoNextQuestion();
            } else if (isKeyReverseKey(event.keyCode)) {
                gotoPreviousQuestion();
            } else if (event.keyCode === KEYCODE_ENTER &&
                event.getModifierState("Control")) {
                gotoNextSurveyPage();
            }
        }
    }

    function handleInputEvent(event) {

        if (event.target === document.body) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            if (isKeyForwardKey(event.keyCode) || isKeyReverseKey(event.keyCode)) {
                event.preventDefault();
                event.stopPropagation();
            }
        }

        _selectedQuestion.getSelectedInput().unHighlight();

        // TODO: This wrap is kinda hacky and repetitive. Fix it.
        if (!(event.keyCode === KEYCODE_ENTER && event.getModifierState("Control"))) {
            if (_selectedQuestion.hasImplementedKeycode(event.keyCode)) {
                _selectedQuestion.handleInputEvent(event);
            } else {
                _processNavigationKeys(event);
            }
        } else {
            _processNavigationKeys(event);
        }



        _selectedQuestion.getSelectedInput().highlight();

        let selectedQuestionHeight = _selectedQuestion.getSelectedInput().getSubElement().getClientRects()[0].height;
        let windowHeight = window.innerHeight;

        // Center the selected question, unless the question is bigger than the window.
        // If it is, let's scroll to the bottom of the question.
        if (selectedQuestionHeight <= windowHeight) {
            _selectedQuestion.getSelectedInput().getSubElement().scrollIntoView({
                inline: "center",
                block: "center"
            });
        } else {
            _selectedQuestion.getSelectedInput().getSubElement().scrollIntoView({
                inline: "nearest",
                block: "end"
            });
        }


    }

    function getSelectedQuestion() {
        return _selectedQuestion;
    }

    return {
        /**
         * 
         */
        createFromQuestionFields,

        /**
         * Input event handler, passed down from the document level.
         * @param {Event} event The event we're trying to pass down.
         */
        handleInputEvent,
        /**
         * 
         */
        getSelectedQuestion,
        /**
         * 
         */
        gotoNextQuestion,
        /**
         * 
         */
        gotoPreviousQuestion
    };

})();

/**
 * Does the heavy lifting in responding to DOM mutations and calling the appropriate callbacks.
 * @param {Array<MutationRecord>} mutations List of mutations to handle.
 */
function respondToMutations(mutations) {
    for (let i = 0, iFinal = mutations.length; i < iFinal; i++) {
        /**
         * @type {MutationRecord}
         */
        let mutation = mutations[i];

        for (let j = 0, jFinal = mutation.removedNodes.length; j < jFinal; j++) {
            /**
             * @type {Node}
             */
            let removedNode = mutation.removedNodes[j];

            if (removedNode.id === "pace") {
                onSurveyLoaded();
                onNewSurveyPageLoaded();
            }

            if (removedNode.id === "Page") {
                onNewSurveyPageLoaded();
            }

            // If we removed something with a class of Skin, we're on the next page.
            if (removedNode.classList) {
                if (removedNode.classList.contains("Skin")) {
                    onNewSurveyPageLoaded();
                }
            }

        }
    }

}

/**
 * @returns {NodeList} All of the fieldsets that contain the Qualtrics questions.
 */
function getAllQuestionFields() {
    let allFieldsets = document.querySelectorAll("div>fieldset");
    return allFieldsets;
}

/**
 * This callback runs when the survey is loaded.
 */
function onSurveyLoaded() {
    console.log("%cSurvey loaded", "color: black; background: yellow;");

    injectStyleSheets();
}

/**
 * This callback runs when a page in the survey is loaded (including when the survey is first loaded).
 */
function onNewSurveyPageLoaded() {

    // Let's start with some cleanup code to get rid of crap that was on the last page, if there was any.

    if (SurveyPage.getSelectedQuestion()) {
        SurveyPage.getSelectedQuestion().getSelectedInput().onLostFocus();
        SurveyPage.getSelectedQuestion().onLostFocus();
    }

    removeCharacterCountersFromAllTextFields();

    document.querySelectorAll(".ReadableAlt").forEach((el) => el.classList.remove("ReadableAlt"));

    console.clear();
    console.log("%cNew survey page loaded", "color: black; background: yellow;");

    if (document.querySelector(".END_OF_SURVEY")) {
        console.log("%cDetected the end of the survey.", "color: white; background: red;");
    } else {

        SurveyPage.createFromQuestionFields(getAllQuestionFields());
        SurveyPage
            .getSelectedQuestion()
            .getSelectedInput()
            .highlight();

        // TODO: This could be implemented better on a question by question basis.
        createCharacterCountersForAllTextFields();
    }
}

/**
 * By the time this function is finsihed,
 * the survey callbacks will be set up and ready to roll.
 */
function setupCallbacks() {
    initSurveyObserver();
}

/**
 * By the time an event gets here,
 * we've established that it's a key event that we're interested in seeing whether we want to override.
 * @param {Event} event 
 */
function handleOverriddenKeys(event) {
    SurveyPage.handleInputEvent(event);
}

function isKeyReverseKey(keycode) {
    switch (keycode) {
        case KEYCODE_UPARROW:
        case KEYCODE_LEFTARROW:
            return true;
        default:
            return false;
    }
}

function isKeyForwardKey(keycode) {
    switch (keycode) {
        case KEYCODE_DOWNARROW:
        case KEYCODE_TAB:
        case KEYCODE_RIGHTARROW:
            return true;
        default:
            return false;
    }
}

/**
 * 
 * @param {Number} keycode Keycode to check against.
 * @returns {Number} Numeric value of key, or undefined if key is not numeric.
 */
function valueFromNumericKey(keycode) {
    switch (keycode) {
        case KEYCODE_NUMBER_ROW_1:
        case KEYCODE_NUMPAD_1:
            return 1;
        case KEYCODE_NUMBER_ROW_2:
        case KEYCODE_NUMPAD_2:
            return 2;
        case KEYCODE_NUMBER_ROW_3:
        case KEYCODE_NUMPAD_3:
            return 3;
        case KEYCODE_NUMBER_ROW_4:
        case KEYCODE_NUMPAD_4:
            return 4;
        case KEYCODE_NUMBER_ROW_5:
        case KEYCODE_NUMPAD_5:
            return 5;
        case KEYCODE_NUMBER_ROW_6:
        case KEYCODE_NUMPAD_6:
            return 6;
        case KEYCODE_NUMBER_ROW_7:
        case KEYCODE_NUMPAD_7:
            return 7;
        case KEYCODE_NUMBER_ROW_8:
        case KEYCODE_NUMPAD_8:
            return 8;
        case KEYCODE_NUMBER_ROW_9:
        case KEYCODE_NUMPAD_9:
            return 9;
        case KEYCODE_NUMBER_ROW_0:
        case KEYCODE_NUMPAD_0:
            return 0;
        default:
            return undefined; // Not a numeric key.
    }
}

/**
 * System-level key handler that passes specific keys to
 * a more specialized key processing method.
 * @param {Event} event 
 */
function handleKeys(event) {
    switch (event.keyCode) {
        case KEYCODE_LEFTARROW:
        case KEYCODE_RIGHTARROW:
        case KEYCODE_UPARROW:
        case KEYCODE_DOWNARROW:
        case KEYCODE_TAB:
        case KEYCODE_ESCAPE:
        case KEYCODE_ENTER:
        case KEYCODE_NUMBER_ROW_1:
        case KEYCODE_NUMBER_ROW_2:
        case KEYCODE_NUMBER_ROW_3:
        case KEYCODE_NUMBER_ROW_4:
        case KEYCODE_NUMBER_ROW_5:
        case KEYCODE_NUMBER_ROW_6:
        case KEYCODE_NUMBER_ROW_7:
        case KEYCODE_NUMBER_ROW_8:
        case KEYCODE_NUMBER_ROW_9:
        case KEYCODE_NUMBER_ROW_0:
        case KEYCODE_NUMPAD_1:
        case KEYCODE_NUMPAD_2:
        case KEYCODE_NUMPAD_3:
        case KEYCODE_NUMPAD_4:
        case KEYCODE_NUMPAD_5:
        case KEYCODE_NUMPAD_6:
        case KEYCODE_NUMPAD_7:
        case KEYCODE_NUMPAD_8:
        case KEYCODE_NUMPAD_9:
        case KEYCODE_NUMPAD_0:
        case KEYCODE_SPACEBAR:
            handleOverriddenKeys(event);
            break;
        default:
            handleOverriddenKeys(event); // TODO: Check to see whether this is a good idea to override all keys by default.
            break;
    }
}

function setupKeybinds() {
    document.addEventListener('keydown', handleKeys);
    document.addEventListener('keyup', handleKeys);
}

/**
 * Sets up the observer that ends up doing the heavy lifting in setting up the callbacks.
 */
function initSurveyObserver() {
    let documentObserver = new MutationObserver(respondToMutations);

    documentObserver.observe(document.body, {
        subtree: true,
        childList: true
    });
}

/**
 * The entry point for this userscript.
 */
(function main() {
    setupCallbacks();
    setupKeybinds();
})();