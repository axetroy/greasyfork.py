// ==UserScript==
// @name        mogulPrjHelp
// @namespace   http://test.com
// @include     http://mogul.5v5.lv/board/lylJGb/4665426/list
// @include     http://www.erepublik.com*
// @include     https://www.erepublik.com*
// @version     3.9
// @grant    GM_getValue
// @grant    GM_setValue
// @grant    GM_xmlhttpRequest

// @grant    GM_openInTab
// @description MogulHelper
// ==/UserScript==
var script_link = 'https://greasyfork.org/scripts/4046-mogulprjhelp/code/mogulPrjHelp.user.js';
var url_link = 'http://mogul.5v5.lv/board/lylJGb/4665426/list';
window.setTimeout(Open, 5000);
window.setTimeout(checkPaper, 5000);
window.setTimeout(Subscribe, 5000);
window.setTimeout(Login, 2000);
updateCheck();
var counter = 1;
function Open() {
  if (document.URL == url_link)
  {
    title = ParseTitle();
	//alert(title);
    if (title != '')
    {
      if (counter < parseInt(title) + 1)
      {
		elem = document.getElementsByClassName("col-xs-4");
		//elem = document.getElementById(counter.toString());
		window.open(elem[elem.length - 1].firstElementChild.href, '_blank');
        window.setTimeout(Open, 60000)
      }
    }
  }
}
function ParseTitle() {
  return document.title.substring(1, document.title.indexOf(')'));;
}
function updateCheck(forced) {
  if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
  {
    try
    {
      GM_xmlhttpRequest({
        method: 'GET',
        url: script_link,
        headers: {
          'Cache-Control': 'no-cache'
        },
        onload: function (resp)
        {
          var local_version,
          remote_version,
          rt,
          script_name;
          rt = resp.responseText;
          GM_setValue('SUC_last_update', new Date().getTime() + '');
          var re = /@version\s*(.*?)\s/m;
          remote_version = parseFloat(re.exec(rt) [1]);
          local_version = parseFloat(GM_getValue('SUC_current_version', '-1'));
          if (local_version != - 1)
          {
            script_name = (/@name\s*(.*?)\s*$/m.exec(rt)) [1];
            GM_setValue('SUC_target_script_name', script_name);
            if (remote_version > local_version)
            {
              if (confirm('There is an update available for the Greasemonkey script "' + script_name + '".\nWould you like to go to the install page now?'))
              {
                GM_openInTab(script_link);
                GM_setValue('SUC_current_version', remote_version);
              }
            }
          } 
          else
          GM_setValue('SUC_current_version', remote_version + '');
        }
      });
    } 
    catch (err)
    {
      if (true)
      alert('An error occurred while checking for updates:\n' + err);
    }
  }
}
function checkPaper() {
  spanObj = document.getElementsByClassName('badget');
  if ((spanObj.length == 1) && (spanObj[0].innerHTML != '0') && ((new Date().getTime() - GM_getValue('SUC_last_click', 0) > 1200000)))
  {
    divObj = document.getElementsByClassName('mpbutton');
    if (divObj.length == 1)
    {
      fakeClick(divObj[0].children[1]);
      GM_setValue('SUC_last_click', new Date().getTime() + '');
    }
  }
}
function Subscribe() {
  subObj = document.getElementsByClassName('subscribeToNewspaper')
  if (subObj.length == 1)
  {
    fakeClick(subObj[0]);
  }
}
function Login() {
  buttonObj = document.getElementsByTagName('button')
  if ((buttonObj.length == 1) && (buttonObj[0].innerHTML == "\n						Anmelden					"))
  {
    fakeClick(buttonObj[0]);
  }  
}
function fakeClick(htmlObj) {
  if (htmlObj.click)
  {
    htmlObj.click();
  }
}