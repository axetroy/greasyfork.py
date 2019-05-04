// ==UserScript==
// @name        New YouTube Obnoxious Bar Fix
// @description Works on mid 2017 new layout, prevents the search bar from following as you scroll down the page
// @include     https://www.youtube.com/*
// @grant       none
// @version 0.0.6
// @namespace https://greasyfork.org/users/8233
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==
function adjustBar(x)
{
  document.getElementById('masthead-container').style.position = 'static';
  document.getElementById('page-manager').style['margin-top'] = 0;
  if(document.getElementById('frex-downbut') !== null)
    return;

  var downbut = document.createElement('button');
  downbut.id = 'frex-downbut';
  downbut.innerHTML = '\u25BC';
  downbut.style.background = 'none';  
  downbut.style.color = 'red';
  downbut.style.border = 'none';
  document.getElementById('container').insertBefore(downbut, document.getElementById('end'));
  downbut.onclick = function () {
    var cont = document.getElementById('container');
    window.scrollTo(0, Math.max(0, cont.offsetHeight - 10));
  };

  //downbut.click();
}
waitForKeyElements('h1.title', adjustBar);//kinda a hack - this will only trigger first time a watch page is accessed
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