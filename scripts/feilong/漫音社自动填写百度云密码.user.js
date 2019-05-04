// ==UserScript==
// @name         漫音社自动填写百度云密码
// @version      0.1
// @author       FeiLong
// @match        http://www.acgjc.com/storage-download/*
// @grant        none
// @description  在漫音社自动填写百度云密码
// @require      http://code.jquery.com/jquery-latest.js
// @namespace https://greasyfork.org/users/28687
// ==/UserScript==

$("a.btn-success")[0].href = $("a.btn-success")[0].href + "#" + $("input.pwd")[0].value

