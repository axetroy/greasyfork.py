// ==UserScript==
// @name        Fanfiction.net dark theme
// @namespace   Danielv123
// @description A dark theme for fanfiction.net. Works well for night reading.
// @include     https://www.fanfiction.net/s/*
// @version     1
// @grant       none
// ==/UserScript==
// Settings:
// Display comment section
var commentSection = false;
// End of settings
//
// Get all elements that have a style attribute
var elms = document.querySelectorAll('*[style]');
// Loop through them
Array.prototype.forEach.call(elms, function (elm) {
  // Get the color value
  var clr = elm.style.backgroundColor || '';
  // Remove all whitespace, make it all lower case
  clr = clr.replace(/\s/g, '').toLowerCase();
  // Switch on the possible values we know of
  console.log(clr)
  switch (clr) {
    case 'white':
      elm.style.backgroundColor = '#000000';
      console.log('Color set')
      break;
  }
});
document.body.style.backgroundColor = '#222'
var lightGreyStuff = document.getElementsByClassName('zmenu')
for (i = 0; i < lightGreyStuff.length; i++) {
  lightGreyStuff[i].style.backgroundColor = '#333'
}
document.body.style.color = 'white';
if (commentSection === false) {
  document.getElementById('review').style.display = 'none';
}
