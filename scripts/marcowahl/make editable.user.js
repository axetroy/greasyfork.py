// ==UserScript==
// @name           make editable
// @version        0.0.2
// @description    Edit any section of any page
// @author         Marco Wahl
// @license        GPL v3 or later version
// @namespace      https://github.com/marcowahl
// @include        *
// @note           201612081427
// ==/UserScript==

(function () {
    var button = document.createElement("input")
    button.type = "button"
    var buttonText1 = "make editable"
    button.value = buttonText1
    button.style.left = "0px"
    button.style.top = "0px"
    button.style.position = "fixed"
    button.style.background = "orange"
    button.style.zIndex = 99999
    button.onclick = function () {
        document.body.contentEditable = true
        document.body.removeChild(button)
    }
    document.body.appendChild(button)
})()
