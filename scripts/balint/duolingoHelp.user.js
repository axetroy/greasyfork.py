// ==UserScript==
// @name        duolingoHelp
// @namespace   http://wifi.com
// @include     http*://www.duolingo.com*
// @version     2.3
// @description Duolingo helper
// @grant    GM_getValue
// @grant    GM_setValue
// @grant    GM_xmlhttpRequest
// @grant    GM_openInTab
// ==/UserScript==

var script_link = 'https://greasyfork.org/scripts/10836-duolingoHelp/code/duolingoHelp.user.js';
setTimeout(CallHideElements, 2000);
setTimeout(CallHideWords, 5000);

function CallHideWords()
{
    if(window.location.href == "https://www.duolingo.com/words"){
        HideWords("strength-4",false);
        HideWords("strength-3", false);
        HideWords("strength-2", false);
        HideWords("strength-1", true);
    }
}
function CallHideElements()
{
  ScrollTo("pie", "end");
  if(!ScrollTo("strength-1", ""))
  {
     if(!ScrollTo("strength-2", ""))
     {
          if(!ScrollTo("strength-3", ""))
          {
             var ret = ScrollTo("strength-4", "end");
             if(!ret){
                 //jump to random
                 var elArray = document.getElementsByClassName("gold");
                 if(elArray.length > 0)
                 {
                     var pos = Math.floor(Math.random() * (elArray.length-1));
                     window.scroll(0,elArray[pos].parentElement.offsetTop);
                 }
             }
          }
          else
          {
             HideElements("strength-4");
             HideElements("strength-5");
          }
     }
     else
     {
         HideElements("strength-3");
         HideElements("strength-4");
         HideElements("strength-5");
     }
  }
  else
  {
     HideElements("strength-2");
     HideElements("strength-3");
     HideElements("strength-4");
     HideElements("strength-5");
  }
}

function HideElements(className)
{
  var elArray = document.getElementsByClassName(className);
  for(i = 0; i< elArray.length; i++){
      elArray[i].parentElement.parentElement.parentElement.style.visibility = "hidden";
  }
}

function HideWords(className, show)
{
    var elArray = document.getElementsByClassName(className);
    if(show === false) {
         for(i = elArray.length-1; i>-1; i--){
             var child = elArray[i].parentElement.parentElement;
             var parent = elArray[i].parentElement.parentElement.parentElement;
             parent.removeChild(child);
        }
    }
    else {
        var words = document.getElementsByClassName("vocab-word-count");
        words[0].innerHTML = words[0].innerHTML + " (" + elArray.length + ")";
    }
}

function ScrollTo(className, order)
{
  var elArray = document.getElementsByClassName(className);
  if(elArray.length > 0)
  {
      var pos = 0;
      if(order == "end")
      {
          pos = elArray.length - 1;
          if (elArray[pos].parentElement.nextSibling === null) pos-= 1;
      }
      window.scroll(0,elArray[pos].parentElement.offsetTop);
      elArray[pos].parentElement.nextSibling.innerHTML = elArray[pos].parentElement.nextSibling.innerHTML+ "<br/> noch: "+  elArray.length;
      return true;
    }
    else return false;
}

function updateCheck(forced)
{
    if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
    {
        try
        {
            GM_xmlhttpRequest(
                {
                    method: 'GET',
                    url: script_link,
                    headers: {'Cache-Control': 'no-cache'},
                    onload: function(resp)
                    {
                        var local_version, remote_version, rt, script_name;

                        rt=resp.responseText;
                        GM_setValue('SUC_last_update', new Date().getTime()+'');
                        var re = /@version\s*(.*?)\s/m;
                        remote_version=parseFloat(re.exec(rt)[1]);
                        local_version=parseFloat(GM_getValue('SUC_current_version', '-1'));
                        if(local_version!=-1)
                        {
                            script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
                            GM_setValue('SUC_target_script_name', script_name);
                            if (remote_version > local_version)
                            {
                                if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))
                                {
                                    GM_openInTab(script_link);
                                    GM_setValue('SUC_current_version', remote_version);
                                }
                            }
                        }
                        else
                            GM_setValue('SUC_current_version', remote_version+'');
                    }
                });
        }
        catch (err)
        {
            if (true)
                alert('An error occurred while checking for updates:\n'+err);
        }
    }
}

updateCheck();