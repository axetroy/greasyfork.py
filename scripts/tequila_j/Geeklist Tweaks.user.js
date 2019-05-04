// ==UserScript==
// @name       Geeklist Tweaks
// @namespace  tequila_j-script
// @version    0.7.2
// @description  Various tweaks to improve BGG (boardgamegeek.com). 
// 
// @match      https://boardgamegeek.com/geeklist/*
// @match      https://www.boardgamegeek.com/geeklist/*
// @match      http://boardgamegeek.com/geeklist/*
// @match      http://www.boardgamegeek.com/geeklist/*
// @require	https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.7.1/clipboard.min.js
// @grant    GM_addStyle
// ==/UserScript==


GM_addStyle(`
div.t-nav-container {
	position: absolute;
	//top: 0px;
	//right: -35px;
	top: -2px;
	right: 0px;
    background-color: rgba(120,120,180,0.4);
    border-radius: 5px;
    //opacity: 0.5;
	//height: 50px;
	text-align: center;
	padding: 3px 3px;
	opacity: 0.4;
}
div.t-nav-container:hover {
    opacity: 0.95;
}
div.t-nav-container span.fa {
	font-size: 16px;
	padding: 0px 3px;
	cursor: pointer;
}

div.box-new-items:hover {
	opacity: 1;
}
div.box-new-items {
    position: fixed;
    bottom: 0px;
    /* height: 20px; */
    background-color: lightgray;
    right: 7px;
    font-size: x-small;
    padding: 2px 5px;
    border-radius: 3px;
    opacity: 0.7;
}

a.tj_geeklist-number {
  position: relative;
}

div.tj_url-copy-helper {
  position: absolute;
  display:none;
  background-color: rgba(120,120,180,0.4);
  color: black;
  border-radius: 3px;
  padding: 3px;
  right: -18px;
  top: -14px;
}

a.tj_geeklist-number:hover div.tj_url-copy-helper {
  display:block;
}

div.geekitem_flash_info {
  position: fixed;
  top:0px;
  left: 0;
  right:0;
  opacity: 0.9;
  background: #d0cece;
}

`);

var __tj = {
  'gap' : -35,
  show_gotosubbed: false
}

function urlParam(param) {
  var vars = {};
  window.location.href.replace(location.hash, '').replace(
    /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
    function (m, key, value) { // callback
      vars[key] = value !== undefined ? value : '';
    }
  );

  if (param) {
    return vars[param] ? vars[param] : null;
  }
  return vars;
}

function insertParam(key, value, url) {
  key = escape(key); value = escape(value);
  var hash = url.substring(url.indexOf("#"));
  var localurl = url.substring(0, url.indexOf("#"));
  var urlparts = localurl.split('?');
  var resultquerystring = "";

  if (urlparts.length <= 1) { //there isn't a query string
    resultquerystring += '?' + key + '=' + value;
  }
  else { //there is query strings
    var pairs = urlparts[1].split("&");
    for (var i = 0; i < pairs.length; i++) {
      var t = pairs[i].split('=');
      if (t[0] == key) {
        if (value) {
          t[1] = value;
          pairs[i] = t.join('=');
        }
        else
          pairs[i] = t[0];
        break;
      }
    }
    //this will reload the page, it's likely better to store this until finished
    resultquerystring = pairs.join('&');
  }
  return urlparts + resultquerystring + hash;
}


$(document).ready(function () {
  'use strict';
  /*jshint multistr: true */

  $("head").append(
    '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" type="text/css">'
  );

  //Crete a container to display geekitem
  var $geekintemflash = $('<div class="geekitem_flash_info"></div>');
  $('body').append($geekintemflash);
  /*$(window).on('scrollstart',function() {
    $geekintemflash.stop();
    $geekintemflash.hide();
  });*/

  function displayGeekItemHeader(event, element) {
    $geekintemflash.finish().hide();
    event.preventDefault();
    //geeklists has class mb5, so, we ignore then
    console.log($(element).attr('class'));
    if ($(element).parent().hasClass('mb5')) return true; //this is a geekitem list, we do not need to show anything
    //display geekitem title
    var $element = $(element);
    var gl = $element.parents('div.mb5').find('div.geeklist_item_title:first');
    if (typeof gl === undefined) return true;
    
    $geekintemflash.html($(gl).clone());
    $geekintemflash.show().delay(3000).fadeOut('fast');
	}

  $(document).on( "scrollFinished",displayGeekItemHeader);



  //add a parameter to geeklist items so you can have no auto scroll between people that uises the script
  // also, put a small icon to copy url
  $(".geeklist_item_title > .fl").each(function () {
    var $this = $(this);
    if ($this.children('a').length < 2) return true; //this is not a geeklist item in a geeklist , it is just a direct item (only shows this item in page)
    var $listNumber = $this.children('a:first');
    $listNumber.addClass("tj_geeklist-number");
    var url = $listNumber.attr('href');
    var newurl = insertParam('__ns', 't', url);
    $listNumber.attr('href', newurl);
    var copyLink = $('<div class="tj_url-copy-helper"><i class="fa fa-files-o" aria-hidden="true"></i></div>');
    copyLink.attr('data-clipboard-text', $listNumber[0].href);
    copyLink.click(function (event) { event.preventDefault() });
    $listNumber.append(copyLink);
    new Clipboard(copyLink[0]);//convert jquery to htmlelemnt
  });


  //lets find items, excluding multiple comments
  var firstItems = [];
  var nonFirstItems = [];

  var geekItems = $('div.mb5');
  var geekSubbedPosition = -1;

  for (var i = 0; i < geekItems.length; i++) {
    var thisGI = $(geekItems[i]);
    var newSI = thisGI.find('div.subbed_selected,div.subbed');
    var firstIsGeekItem = false;
    if (newSI.length > 0) {
      var el = newSI[0];
      firstItems.push(newSI[0]);
      firstIsGeekItem = $(el).attr('data-objecttype') == "listitem";
      geekSubbedPosition = firstItems.length - 1
    }
    if (newSI.length > 1 && firstIsGeekItem) {
      firstItems.push(newSI[1])
      geekSubbedPosition = firstItems.length - 1;
    }
  }

  //  console.log('New items in geeklists:' + firstItems.length);

  //we will try to find comments at the end of the page also
  var pageComments = $('div.mb5:first').parent().children('div:not(.mb5)').find('div.comment_ctrl').find('div.subbed_selected,div.subbed');
  console.log(pageComments);
  if (pageComments.length > 0) {
    firstItems.push(pageComments[0]);
    geekSubbedPosition = firstItems.length - 1;
    //    console.log("New page comments also ");
  }

  //  console.log("Size: " + firstItems.length);

  var iconUp = $('<span class="fa fa-caret-square-o-up" aria-hidden="true"></span>');
  var iconDown = $('<span class="fa fa-caret-square-o-down" aria-hidden="true"></span>');
  var iconNew = $('<span class="fa fa-ellipsis-h" aria-hidden="true"></span>');
  var iconBox = $('<div class="t-nav-container"></div>');

  $(firstItems).each(function (index) {

    var thisItem = $(this);

    thisItem.css('position', 'relative');

    var iconContainer = iconBox.clone();
    thisItem.append(iconContainer);

    thisItem.find("dl.commentbody > dd.right").css("padding-right", "40px");
    //go new
    if (__tj.show_gotosubbed) {
      if (!$(firstItems[index]).hasClass('subbed_selected')) {
        var upI = iconNew.clone();
        upI.click(function () {
          $( document ).trigger( "scrollFinished", [ firstItems[geekSubbedPosition ] ]);
          $("html, body").animate({ scrollTop: $(firstItems[geekSubbedPosition]).offset().top + __tj.gap }, "fast");
          return false;
        });
        iconContainer.append(upI);
      } else {
        iconContainer.append(iconNew.clone().css('visibility', 'hidden'));
      }
    }

    //go up
    if (index != 0) {
      var upI = iconUp.clone();
      upI.click(function () {
        $( document ).trigger( "scrollFinished", [ firstItems[index - 1] ] );        
        $("html, body").animate({ scrollTop: $(firstItems[index - 1]).offset().top + __tj.gap}, "fast");
        return false;
      });
      iconContainer.append(upI);

    } else {
      iconContainer.append(iconDown.clone().css('visibility', 'hidden'));
    }

    //go down
    if (index != firstItems.length - 1) {
      var downI = iconDown.clone();
      downI.click(function () {
        $( document ).trigger( "scrollFinished", [ firstItems[index + 1] ] );
        $("html, body").animate({ scrollTop: $(firstItems[index + 1]).offset().top + __tj.gap}, "fast");
        return false;
      });
      iconContainer.append(downI);
    } else {
      iconContainer.append(iconUp.clone().css('visibility', 'hidden'));
    }

  });

  //lets see if this is a selected article (user clicked to see a subjetc, not new items). 
  //If not, We can scroll to the top of the list
  if ($("div.article.selected").length == 0 && urlParam("__ns") == null) {
    $("html, body").scrollTop($(firstItems[0]).offset().top + __tj.gap);
    $( document ).trigger( "scrollFinished", [ $(firstItems[0]) ] );
  } else {
    $( document ).trigger( "scrollFinished", [ $(selectedUrlItem) ] );
  }

    

  //puts a small box saying how many new items are here:
  var news = $(document.createElement("div")).addClass("box-new-items");
  $("body").append(news);
  news.html("New items in this page: " + $('div.subbed_selected,div.subbed').length);

});

