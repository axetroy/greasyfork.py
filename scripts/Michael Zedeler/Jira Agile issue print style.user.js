// ==UserScript==
// @name        Jira Agile issue print style
// @namespace   http://github.com/mzedeler/gm-jira-agile-css
// @version     0.3
// @description Add css styles to make printing issues from Jira
// @match       https://notalib.atlassian.net/secure/RapidBoard.jspa?*view=planning*
// @copyright   2014, Michael Zedeler <michael@zedeler.dk>
// @resource css https://raw.githubusercontent.com/mzedeler/gm-jira-agile-css/master/gm-jira-agile-css.css
// ==/UserScript==

GM_addStyle(GM_getResourceText('css'));

