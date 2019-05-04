// ==UserScript==
// @name         ASCII Control Codes Keyboard Input Helper for Firefox
// @namespace    ASCIIControlCodesKeyboardInputHelperForFirefox
// @version      1.0.1
// @description  This is a script to help inputting ASCII Control Codes such as TAB, CR, LF, etc. on Firefox web browsers using ALT+Numpad keys. Inputted control codes must begin with 0 (e.g. 09, 013, etc.), and only control code 1 to 31 are accepted. The control character will only be generated when the current focus is on a TEXTAREA element, or a text typed INPUT element.
// @author       jcunews
// @include      *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

var numpadKeyCodes = [45, 35, 40, 34, 37, 12, 39, 36, 38, 33]; //Insert, End, Down, PgDn, Left, Clear, Right, Home, Up, PgUp
var code = "";

function numFromKeyCode(keyCode) {
  if ((keyCode >= 96) && (keyCode <= 105)) { //Numpad0 - Numpad9
    return keyCode - 96;
  } else return numpadKeyCodes.indexOf(keyCode);
}

function keyUp(ev, ele, cc, i, s) {
  ele = document.activeElement;
  if ((ele.tagName === "TEXTAREA") || ((ele.tagName === "INPUT") && (ele.type === "text"))) {
    ev = ev || window.event;
    if (ev.altKey) {
      cc = numFromKeyCode(ev.keyCode);
      if (cc >= 0) code += cc;
    } else {
      if ((ev.keyCode === 18 /*ALT*/) && (code.charAt(0) === "0") && (code = parseInt(code, 10)) && (code < 32)) {
        i = ele.selectionStart;
        s = ele.value;
        ele.value = s.substring(0, i) + String.fromCharCode(code) + s.substring(ele.selectionEnd, s.length);
        ele.selectionEnd = i + 1;
      }
      code = "";
    }
  } else code = "";
}

if (window.InstallTrigger) document.addEventListener("keyup", keyUp);
