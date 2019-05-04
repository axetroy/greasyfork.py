// ==UserScript==
// @name         Esperanto characters
// @namespace    EsperantoType
// @version      0.1
// @description  Use ctrl+alt key combination to accentuate esperanto characters in webforms ĈĉĜĝĤĥĴĵŜŝŬŭ
// @author       codingjoe
// @match        *
// @include      *
// @grant        none
// @run-at       document-end
// ==/UserScript==

window.onkeydown = function (e) {
    // if ctrl+alt key combination is invoked
    if (e.ctrlKey && e.altKey) {
        e.preventDefault();

        // if element with focus is a webform
        if (e.target.tagName.toUpperCase() === "TEXTAREA" || e.target.tagName.toUpperCase() === "INPUT") {
            var startPos = e.target.selectionStart;
            var endPos = e.target.selectionEnd;
            var myValue = "";

            // determine which character to accentuate
            // ĈĉĜĝĤĥĴĵŜŝŬŭ
            switch (e.key) {
                case "C":
                    myValue = "Ĉ";
                    break;

                case "c":
                    myValue = "ĉ";
                    break;

                case "G":
                    myValue = "Ĝ";
                    break;

                case "g":
                    myValue = "ĝ";
                    break;

                case "H":
                    myValue = "Ĥ";
                    break;

                case "h":
                    myValue = "ĥ";
                    break;

                case "J":
                    myValue = "Ĵ";
                    break;

                case "j":
                    myValue = "ĵ";
                    break;

                case "S":
                    myValue = "Ŝ";
                    break;

                case "s":
                    myValue = "ŝ";
                    break;

                case "U":
                    myValue = "Ŭ";
                    break;

                case "u":
                    myValue = "ŭ";
                    break;

                default:
                    break;
            }

            if (myValue.length > 0) {
                // insert accentuated character into the form element
                e.target.value = e.target.value.substring(0, startPos) + myValue + e.target.value.substring(endPos, e.target.value.length);

                // display the cursor after the character
                e.target.selectionStart = startPos + myValue.length;
                e.target.selectionEnd = startPos + myValue.length;
            }
        }

        return false;
    }
};