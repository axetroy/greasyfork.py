// ==UserScript==
// @name           tu_sso_portal_2_tiss
// @namespace      https://greasyfork.org/de/users/157797-lual
// @include        https://iu.zid.tuwien.ac.at/AuthServ.portal*
// @include        https://iu.zid.tuwien.ac.at/AuthServ.reminder*
// @require        https://code.jquery.com/jquery-3.3.1.min.js
// @version        0.5
// @author         lual
// @description	   a bigger link to tiss from single sign on
// @author         fg (csd)
// @grant          GM_addStyle
// @require        http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==
// changes:        2017-11-07 publish on greasyfork
//                 2018-03-23 move the tiss link to the top
//                 2018-11-29 reactivate redirect
////////////////////////////////////////////////////////////////////////////////
// make the tiss link really big (and add a fency red icon)
GM_addStyle(`
  /*hilghlight tiss*/
  a[href*='app=76'] {
    font-size: 5em;
    line-height: 150%;
    padding: 20px !important;
    background: url(data:image/x-icon;base64,AAABAAIAEBAAAAEAIABoBAAAJgAAABAQAAABAAgAaAUAAI4EAAAoAAAAEAAAACAAAAABACAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAACzX//w5C//8OQv//DkL//w5C//8OQv//DkL//w4///8PO///EDj//xE0//8SMf//Ey3//xMp//8VJv//Ex7//w5C//8UXv//FF7//xRe//8UXv//FVn//xZU//8XT///GUr//xpF//8bQP//HDv//x42//8fMf//ICz//xcb//8OQv//FF7//xRe//8VWf//FlT//xdP//8ZSv//GkX//xtA//8cO///Hjb//x8x//8gLP//ISf//yMi//8ZFP//DkL//xVZ//8WVP//F0///xlK//8aRf//G0D//xw7//8eNv//HzH//yAs//8hJ///IyL//yQd//8lGP//Gw7//w87//8XT/////////////+Blf///////4OQ///N0f///////83P//8jIv//zsz////////Pyv//JRj//xkU//8RNP//GkX////////M0///g5D///////+Eiv///////yMi////////TkT///////8lGP///////01M//8XG///Ey3//xw7////////HzH//yAs////////hYX//yQd//8lGP///////05E//8kHf//IyL///////9QWv//FiP//xUm//8fMf///////yEn//8jIv///////4Z///+Iff///////87M//8jIv//hIj////////N0f//Hjb//xMp//8WH///ISf///////8kHf//JRj///////+Gf////////yMi//8hJ///ICz///////8eNv//HDv//xtA//8SMf//GBj//yQd////////z8r//4Z/////////hYX///////8gLP///////0lc////////G0D///////9Lcf//EDj//xoR//8nFP////////////+Fhf///////yAs///N0f///////8zT//8bQP//zNX////////L2P//FlT//w4///8aEf//JB3///////8hJ///ICz//x8x//8eNv//HDv//xtA//8aRf//GUr//xdP//8WVP//FVn//xRe//8OQv//GBj//yEn//8gLP//HzH//x42//8cO///G0D//xpF//8ZSv//F0///xZU//8VWf//FF7//xRe//8UXv//DkL//xYf//8fMf//Hjb//xw7//8bQP//GkX//xlK//8XT///FlT//xVZ//8UXv//FF7//xRe//8UXv//FF7//w5C//8VJv//HDv//xtA//8aRf//GUr//xdP//8WVP//FVn//xRe//8UXv//FF7//xRe//8UXv//FF7//xRe//8OQv//ECf//xIx//8RNP//EDj//w87//8OP///DkL//w5C//8OQv//DkL//w5C//8OQv//DkL//w5C//8OQv//DDn//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAAAAEAAAACAAAAABAAgAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAGw7//xoR//8ZFP//Fxv//xMe//8WH///GBj//ycU//8lGP//JB3//xYj//8QJ///FSb//xMp//8TLf//CzX//ww5//8PO///Dj///xIx//8RNP//HzH//x42//8QOP//HDv//yMi//8hJ///ICz//w5C//8bQP//GkX//xdP//8ZSv//FlT//xVZ//8UXv//TkT//01M//9JXP//UFr//0tx//+Gf///iH3//4WF//+EiP//hIr//4OQ//+Blf//z8r//87M///Nz///zdH//8zT///M1f//y9j///////8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAAA8cHBwcHBwSERcUEw4NDAQcIyMjIyIhHyAeHRgWFRsDHCMjIiEfIB4dGBYVGxoZAhwiIR8gHh0YFhUbGhkJCAARHzc3LzcuMzcyGTE3MAgCFB43NC43LTcZNyQ3CDclAw4YNxUbNysJCDckCRk3JwoMFTcaGTcpKjcxGSw3MxYNBRo3CQg3KTcZGhs3FhgdEwYJNzApNys3GzcmNx03KBcBBzc3KzcbMzc0HTU3NiESAQk3GhsVFhgdHiAfISIjHAYaGxUWGB0eIB8hIiMjIxwFFRYYHR4gHyEiIyMjIyMcDBgdHiAfISIjIyMjIyMjHAsTFBcREhwcHBwcHBwcHBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA) no-repeat center left !important;
  }
`);
////////////////////////////////////////////////////////////////////////////////
// move the tiss link to the top
$("a[href*='app=76']").closest('tr').prependTo('tbody');
////////////////////////////////////////////////////////////////////////////////
//automatic redirect to tiss - deactivated (because not really ok in case of logout)
function redir() {
  //alert('Redirect NOW');
  var newurl = document.URL.replace('https://iu.zid.tuwien.ac.at/AuthServ.reminder?app=76','https://iu.zid.tuwien.ac.at/AuthServ.authenticate?app=76');
  if (newurl != document.URL) location.replace(newurl);
}
setTimeout(redir, 200);
