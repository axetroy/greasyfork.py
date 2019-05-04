// ==UserScript==
// @name Group Management Header Script
// @namespace empiregroupmanagement
// @description Adds special links in header block for leaders of Archive. (Change GID for different groups)
// @include hackforums.net/*
// @include http://hackforums.net/*
// @version 1.4
// ==/UserScript==

var regex = "User CP</strong></a>";
var revised = "User CP</strong></a> &mdash; <a href='http://www.hackforums.net/managegroup.php?gid=44'><strong>Group CP</strong></a> &mdash; <a href='http://www.hackforums.net/managegroup.php?action=joinrequests&gid=44'><strong>Requests</strong></a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);