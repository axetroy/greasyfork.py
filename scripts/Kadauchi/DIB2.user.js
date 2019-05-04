// ==UserScript==
// @name         DIB2
// @namespace    https://gist.github.com/Kadauchi
// @version      1.0.0
// @description  Preselects "no change" for the DIB2 HITs
// @author       Kadauchi
// @icon         http://i.imgur.com/oGRQwPN.png
// @include      /^https://(www|s3)\.(mturkcontent|amazonaws)\.com/
// @grant        GM_log
// @require      https://code.jquery.com/jquery-3.1.1.min.js
// @hitname      Correct body types in images 
// @hitsave      https://www.mturkcontent.com/dynamic/hit?hitId=3H6W48L9F4D4NZU4EBRA6XYL5YPWP0
// ==/UserScript==

$('.page:visible').find('input:radio[value="0"]').prop('checked', true);

$('.nextLink').click( () => {
  setTimeout( () => {
    $('.page:visible').find('input:radio[value="0"]').prop('checked', true);
  }, 100);
});