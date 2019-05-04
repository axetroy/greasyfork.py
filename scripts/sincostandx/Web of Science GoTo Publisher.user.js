// ==UserScript==
// @name        Web of Science GoTo Publisher
// @version     0.1.0
// @author      sincostandx
// @description Automatically redirect to publisher website for full text when you click on the title in the Web of Science search result list
// @namespace   https://greasyfork.org/users/171198
// @include     https://apps.webofknowledge.com/full_record*
// @include     http://apps.webofknowledge.com/full_record*
// ==/UserScript==

var fields = document.getElementsByClassName('FR_field');
for (var i = 0; i < fields.length; ++i){
  var l=fields[i].getElementsByClassName('FR_label');
  if (l.length > 0 && l[0].innerHTML === 'DOI:'){
    var doi = fields[i].getElementsByTagName('value')[0].innerHTML;
    window.location.replace('https://doi.org/' + doi);
    break;
  }
}