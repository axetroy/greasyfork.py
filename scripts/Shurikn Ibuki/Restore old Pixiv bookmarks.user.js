// ==UserScript==
// @name        Restore old Pixiv bookmarks
// @namespace   shurikn
// @description This script restores the old bookmark behavior on Pixiv.
// @include     https://www.pixiv.net/member_illust.php?*
// @version     2.01
// @require     https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js?version=19641
// @require http://code.jquery.com/jquery-latest.js
// @grant       none
// ==/UserScript==


function changeFavButton(elements)
{
  var $button=elements.find(".gtm-main-bookmark");
  if($button.length>0)
  {
    var illustId=new URLSearchParams(window.location.search).get('illust_id');
    $button.on('click',function(event){
      window.location="/bookmark_add.php?type=illust&illust_id="+illustId;
      event.stopImmediatePropagation();
    });
  }
}

// this id seems to change once in a while, this is the class of the 
// section holding the bookmark button
waitForKeyElements ("._2g7Dix7", changeFavButton);
