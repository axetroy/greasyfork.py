// ==UserScript==
// @name         FlipText
// @version      0.6
// @namespace    http://userscripts.org/users/zackton
// @description  Click button to flip text
// @include      *
// @grant        none
// ==/UserScript==

function formYes() {
if($('textarea').length > 0) {
    addGlobalStyle('.flipLink {position:relative;z-index:100;background-color:transparent;font-size:75%;}');
    }
}

function addGlobalStyle(css) {
  var head = document.getElementsByTagName('head')[0];
  if (head) { 
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
  }
}
addGlobalStyle('.flipLink {position:relative;z-index:100;background-color:transparent;font-size:75%;}');

function flipText(text) {
  var revText = '';
  for (var i = 0; i < text.length; i++) {
    var orgChar = text.charAt(text.length - 1 - i);
    var revChar = flipTable[orgChar];
    revText += (revChar != undefined) ? revChar : orgChar;
  }
  return revText;
}

function flipClick(event) {
  //console.log('flipClick: event.target=' + event.target);
  
  if (event.target.hasAttribute("textfieldId")) {
    textfieldId = event.target.getAttribute("textfieldId");
    //console.log('flipClick: textfieldId=' + textfieldId);
    document.getElementById(textfieldId).value = flipText(document.getElementById(textfieldId).value);
  }
}

function addInputfield(fieldObj) {
  if (fieldObj.id != '') {
    //console.log('addInputfield: fieldObj.id=' + fieldObj.id);
    var flipLink = document.createElement("a");
    //flipLink.href = "#";
    flipLink.innerHTML = "Flipit!";
    flipLink.className = "flipObj";
    flipLink.setAttribute("textfieldId", fieldObj.id);
    flipLink.addEventListener('click',	flipClick, true);
    fieldObj.parentNode.appendChild(flipLink);
  } else {
    //console.log('addInputfield: fieldObj without id: ' + fieldObj.name + ', ' + fieldObj.className);
  }
}

function addAllInputfields() {
  inputObjs = document.getElementsByTagName("input");
  for (var i = 0; i < inputObjs.length; i++) {
    if (inputObjs[i].type == "text") {
      addInputfield(inputObjs[i]);
    }
  }
  textareaObjs = document.getElementsByTagName("textarea");
  for (var i = 0; i < textareaObjs.length; i++) {
    addInputfield(textareaObjs[i]);
  }
}

addAllInputfields();


// the character conversion table
var flipTable = {
'a' : '\u0250',
'b' : 'q',
'c' : '\u0254',
'd' : 'p',
'e' : '\u01DD',
'f' : '\u025F',
'g' : '\u0183',
'h' : '\u0265',
'i' : '!',
'j' : '\u027E',
'k' : '\u029E',
'l' : '\u05DF',
'm' : '\u026F',
'n' : 'u',
'p' : 'b',
'r' : '\u0279',
't' : '\u0287',
'v' : '\u028C',
'w' : '\u028D',
'y' : '\u028E',
'ä' : '\u1EA1',
'ö' : '\u1ECD',
'ö' : '\u1EE5',
'[' : ']',
'(' : ')',
'{' : '}',
'<' : '>',
'?' : '\u00BF',
'!' : '\u00A1',
'.' : '\u02D9',
';' : '\u061B',
"'" : ',',
'"' : '\u201e',
'_' : '\u203E',
'^' : '\u203f',
'&' : '\u214b',
'\u203F' : '\u2040',
'\u2045' : '\u2046',
'\u2234' : '\u2235',
'A' : '\u2200',
'C' : '\u0186',
'D' : '\u15E1',
'E' : '\u018e',
'F' : '\u2132',
'G' : '\u2141',
'J' : '\u017f',
'L' : '\u2142',
'N' : '\u0418',
'P' : '\u0500',
'R' : '\u1D1A',
'T' : '\u22a5',
'U' : '\u144e',
'V' : '\u039b',
'W' : 'M',
'Y' : '\u2144',
'Ä' : '\u1EA0',
'Ü' : '\u1EE4',
'Ö' : '\u1ECC',
'1' : '\u21C2',
'2' : '\u1105',
'3' : '\u0190',
'4' : '\u3123',
'5' : '\u03DA',
'6' : '9',
'7' : '\u3125',
'9' : '6',
}

for (i in flipTable) {
  flipTable[flipTable[i]] = i
}