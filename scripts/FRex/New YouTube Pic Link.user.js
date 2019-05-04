// ==UserScript==
// @name        New YouTube Pic Link
// @description Adds buttons that link to YT thumbnail images next to the title
// @include     https://www.youtube.com/*
// @grant       none
// @version 0.0.2
// @namespace https://greasyfork.org/users/8233
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

function refreshPicLinks(objs, mutob)
{
  var url = new URL(document.location.href);
  var c = url.searchParams.get('v'); 
  var maxlink = document.getElementById('frex-maxlink');
  maxlink.href = 'https://i.ytimg.com/vi/' + c + '/maxresdefault.jpg';
  var hqlink = document.getElementById('frex-hqlink');
  hqlink.href = 'https://i.ytimg.com/vi/' + c + '/hqdefault.jpg';
}
function addPicLinks(x)
{
  if(document.getElementById('frex-maxlink') !== null)
    return;
  
  var ytfmtstr = x[0];
  var a = x[0].parentElement;
  var url = new URL(document.location.href);
  var c = url.searchParams.get('v');
  var maxlink = document.createElement('a');
  maxlink.href = 'https://i.ytimg.com/vi/' + c + '/maxresdefault.jpg';
  maxlink.id = 'frex-maxlink';
  a.insertBefore(maxlink, a.children[0]);
  var maxbut = document.createElement('button');
  maxbut.innerHTML = 'Max';
  maxlink.appendChild(maxbut);
  var hqlink = document.createElement('a');
  hqlink.href = 'https://i.ytimg.com/vi/' + c + '/hqdefault.jpg';
  hqlink.id = 'frex-hqlink';
  a.insertBefore(hqlink, maxlink);
  var hqbut = document.createElement('button');
  hqbut.innerHTML = 'HQ';
  hqlink.appendChild(hqbut);
  var mutob = new MutationObserver(refreshPicLinks);
  mutob.observe(ytfmtstr, {childList: true, attributes: true, characterData: true, subtree: true});
}
waitForKeyElements('h1.title > yt-formatted-string', addPicLinks);
/*--- waitForKeyElements():  A utility function, for Greasemonkey scripts,
    that detects and handles AJAXed content. From: https://git.io/vMmuf

    Usage example:

        waitForKeyElements (
            "div.comments"
            , commentCallbackFunction
        );

        //--- Page-specific function to do what we want when the node is found.
        function commentCallbackFunction (jNode) {
            jNode.text ("This comment changed by waitForKeyElements().");
        }

    IMPORTANT: This function requires your script to have loaded jQuery.
*/
function waitForKeyElements(selectorTxt, /* Required: The jQuery selector string that
                        specifies the desired element(s).
                    */
actionFunction, /* Required: The code to run when elements are
                        found. It is passed a jNode to the matched
                        element.
                    */
bWaitOnce, /* Optional: If false, will continue to scan for
                        new elements even after the first match is
                        found.
                    */
iframeSelector /* Optional: If set, identifies the iframe to
                        search.
                    */
) {
  var targetNodes,
  btargetsFound;
  if (typeof iframeSelector == 'undefined')
  targetNodes = $(selectorTxt);
   else
  targetNodes = $(iframeSelector).contents().find(selectorTxt);
  if (targetNodes && targetNodes.length > 0) {
    btargetsFound = true;
    /*--- Found target node(s).  Go through each and act if they
            are new.
        */
    targetNodes.each(function () {
      var jThis = $(this);
      var alreadyFound = jThis.data('alreadyFound') || false;
      if (!alreadyFound) {
        //--- Call the payload function.
        var cancelFound = actionFunction(jThis);
        if (cancelFound)
        btargetsFound = false;
         else
        jThis.data('alreadyFound', true);
      }
    });
  }
  else {
    btargetsFound = false;
  }  //--- Get the timer-control variable for this selector.

  var controlObj = waitForKeyElements.controlObj || {
  };
  var controlKey = selectorTxt.replace(/[^\w]/g, '_');
  var timeControl = controlObj[controlKey];
  //--- Now set or clear the timer as appropriate.
  if (btargetsFound && bWaitOnce && timeControl) {
    //--- The only condition where we need to clear the timer.
    clearInterval(timeControl);
    delete controlObj[controlKey]
  }
  else {
    //--- Set a timer, if needed.
    if (!timeControl) {
      timeControl = setInterval(function () {
        waitForKeyElements(selectorTxt, actionFunction, bWaitOnce, iframeSelector
        );
      }, 300
      );
      controlObj[controlKey] = timeControl;
    }
  }
  waitForKeyElements.controlObj = controlObj;
}
