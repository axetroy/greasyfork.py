// ==UserScript==
// @name        VNDB Cover Preview
// @namespace   https://twitter.com/Kuroonehalf
// @include     https://vndb.org*
// @include     https://vndb.org/v*
// @include     https://vndb.org/g*
// @include     https://vndb.org/p*
// @include     https://vndb.org/u*
// @include     https://vndb.org/s*
// @include     https://vndb.org/r*
// @include     https://vndb.org/c*
// @include     https://vndb.org/t*
// @version     1.8.1
// @description Previews covers in vndb.org searches when hovering over the respective hyperlinks.
// @grant       GM_setValue
// @grant       GM_getValue
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js 
// @license     http://creativecommons.org/licenses/by-nc-sa/4.0/
// ==/UserScript==
var TagLinkTest = /^https:\/\/vndb.org\/g\/links/;
var UserLinkTest = /^https:\/\/vndb.org\/u[0-9]+/;
var VNLinkTest = /^https:\/\/vndb.org\/v[0-9]+/;
var pageURL = document.URL;

// Link title suppression
$('[title]').mouseover( function() {
    var $this = $(this);
    $this.data('title',$this.attr('title'));
    $this.removeAttr('title');
});
// Centering function
jQuery.fn.center = function () {
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
    if (pageURL.search(TagLinkTest) != -1 || pageURL.search(UserLinkTest) != -1 || pageURL.search(VNLinkTest) != -1){
      this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) * 0.4) + $(window).scrollLeft()) + "px");
    }
    else{
      this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) * 0.6) + $(window).scrollLeft()) + "px");
    }
    $('#popover img').css('display','block');
    return this;
};

$('body').append('<div ID="popover"></div>');
$('#popover').css('position', 'absolute');
$('#popover').css('z-index', '10');
$('#popover').css('box-shadow','0px 0px 5px black');

$('tr a').mouseover(function () {
  $(this).css('font-weight', 'bold'); // Bolds previously hovered links.
  var oldHref = $(this).attr('href');
  var newHref = 'https://vndb.org' + oldHref;
  
  if (GM_getValue(newHref)){
       var retrievedLink = GM_getValue(newHref);
       $('#popover').empty();
       $('#popover').append('<img src="' + retrievedLink + '"></img>');
       $('#popover img').load(function() {  
         $('#popover').center();  
       });  
       //console.log(newHref + " has been found and retrieved from the cache."); // for testing purposes
  }
  else{
  $.ajax({
     url: newHref,
     dataType: 'text',
     success: function (data) {
       var imagelink = $('<div>').html(data)[0].getElementsByClassName('vnimg')[0].getElementsByTagName('img')[0].src;
       // clear what's inside #popover and put the new image in there
       $('#popover').empty();
       $('#popover').append('<img src="' + imagelink + '"></img>');
       $('#popover img').load(function() {  
         $('#popover').center();  
       }); 
       // cache info
       GM_setValue(newHref, imagelink);
       //console.log("(" + newHref + ", "+ imagelink + ") successfully cached.") // for testing purposes
     }
   });
   }
});
 
$('tr a').mouseleave(function(){
  $('#popover').empty();  
});