// ==UserScript==
// @name        mail_ustc_select_stu_domain
// @description select mail.ustc.edu.cn domain automatically
// @namespace   tz2012
// @include     http://mail.ustc.edu.cn/*
// @include     https://mail.ustc.edu.cn/*
// @version     1.1
// @grant       none
// ==/UserScript==

$(document).ready(function () {
    changeDomain('mail.ustc.edu.cn');
});
