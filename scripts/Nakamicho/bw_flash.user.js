// ==UserScript==
// @name           bw_flash
// @description    http://www.bloodyworld.com
// @include http://www.bloodyworld.com/*
// @version 0.0.1.20150604001940
// @namespace https://greasyfork.org/users/12000
// ==/UserScript==
// @include http://www.bloodyworld.com/index.php?op=modload&file=/account/index.php



if (document.forms["flash_pass_form"])
  document.forms["flash_pass_form"].flashpass.type = "input";
