// ==UserScript==
// @name      Kohi's Custom HF Header
// @namespace  http://use.i.E.your.homepage/
// @version    1.0
// @description  Adds various forums to the HF heading.
// @match      http://*/*
// @copyright  2015+, You
// ==/UserScript==
var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=25'>Lounge</a> | </a> | <a href='forumdisplay.php?fid=4'>Beginner Hacking</a> | <a href='forumdisplay.php?fid=52'>Groups</a> | <a href='forumdisplay.php?fid=232'>SST</a> | <a href='forumdisplay.php?fid=44'>Buyers Bay</a> |";