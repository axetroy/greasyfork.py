// SkyscraperCity new threads opener
// version 1.0.4
// 2018-08-30
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "SkyscraperCity new threads opener", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          skyscrapercity unread threads opener
// @description   open unread threads in separates tab
// @include       https://www.skyscrapercity.com/tags.php*
// @include       https://www.skyscrapercity.com/subscription.php*
// @version       1.0.4
// @namespace     http://broman.pl/gmscripts/skyscraper-opener
// @grant         GM.openInTab
// ==/UserScript==

console.log('Start of GM script');

(function() {

	console.log ('script start');
	var threadTable = getTable();

    if (getAllUnread() > 0) {
       var openAllLinks = document.createElement('a');
       openAllLinks.href = '#';
       openAllLinks.id = 'link-opener';
       openAllLinks.addEventListener('click', openAllUnread, false);
       openAllLinks.appendChild(document.createTextNode(' Open All unread threads'));
       threadTable.rows[0].cells[0].appendChild(openAllLinks);
    }

})();

function getAllUnread() {
    return openAllUnread(1)
}
function openAllUnread(callType) {
    var toOpen = 0;
    var threadTable = getTable();
    var url = window.location.href;
    var expectedColumnNumber = -1
    if (url.indexOf('subscription.php') > 0) {
       expectedColumnNumber = 6;
    } else if(url.indexOf('tags.php') > 0) {
       expectedColumnNumber = 7;
    }
    if (threadTable !== null) {
       console.log ('threadTable exist');
       var rowsCount = threadTable.rows.length;
       for(var i=0; i<threadTable.rows.length;i++){
          var row = threadTable.rows[i];
          cellCount = row.cells.length;
           if(cellCount == expectedColumnNumber) {
              var fCell = row.cells[0];
              var img = fCell.querySelector('IMG');
               if(img.src.substr(-8) == '_new.gif') {
                   links = row.cells[2].querySelectorAll('A');
                   if(callType != 1) {
                      //console.log ('[open start');
                      //console.log ("link " + links[links.length-1]);
                      try {
                      	GM.openInTab(links[links.length-1].href, true);
                      } catch(err) {
                        console.log(err.message);
                      }
                      //console.log ('open end]');
                      links[links.length-1].style.color="";
                      img.src = img.src.replace("_new","");
                      var titles = row.cells[2].querySelectorAll('A[style="font-weight:bold"]');
                      for(var j=0; j<titles.length;j++){
                      	titles[j].removeAttribute("style");
                      }
                   } else {
	                   links[links.length-1].style.color="magenta";
                   }
                   toOpen++;
               }

           }

       }
    }

    if (callType == 1) {
      console.log ('links to open');
			return toOpen;
    } else {
			document.getElementById('link-opener').outerHTML = "";
			return false;
	}
}

function getTable() {
	var threadTable = document.getElementById('threadslist');
    if (threadTable === null) {
        threadTable = document.querySelector('form[action*="dostuff"] table');
    }
    return threadTable;
}

console.log('End of GM script');