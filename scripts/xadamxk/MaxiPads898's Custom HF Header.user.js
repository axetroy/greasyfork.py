// ==UserScript==
// @name      MaxiPads898's Custom HF Header
// @namespace  http://use.i.E.your.homepage/
// @version    1.0
// @description  Adds various forums to the HF heading.
// @match      http://*/*
// @copyright  2015+, You
// ==/UserScript==
var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=107'>Premium Seller</a> | </a> | <a href='forumdisplay.php?fid=176'>Secondary Seller</a> | <a href='forumdisplay.php?fid=206'>Member Auctions</a> |;
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);