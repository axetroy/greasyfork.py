// ==UserScript==
// @name         EMB Auto Logout
// @namespace    http://www2.hci.edu.sg/t0111066c
// @version      0.1
// @description  auto login script for EMB HCI
// @author       Yeo Xing Yee
// @match        http://messages.hci.edu.sg/smb/hs_student
// @grant        none
// ==/UserScript==

var str = document.getElementsByTagName('font')[1].innerHTML;
var n = str.indexOf("without");
if((n)!=-1){
    window.location="http://messages.hci.edu.sg/cgi-bin/smb/logoutxyz.pl";
}