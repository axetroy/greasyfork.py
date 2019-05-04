// ==UserScript==
// @name         EMB Auto Login
// @namespace    http://www2.hci.edu.sg/t0111066c
// @version      0.1
// @description  auto login script for EMB HCI
// @author       Yeo Xing Yee
// @match        http://messages.hci.edu.sg/smb/hs_student
// @grant        none
// ==/UserScript==
    document.getElementsByName("userid")[0].value= ""; // Enter your username here
    document.getElementsByName("password")[0].value= ""; // Enter your password here
    document.getElementsByName("login")[0].click();