// ==UserScript==
// @name                Text Captcha Alert
// @namespace           No-one
// @author              DCI
// @version             0.1
// @description         Alerts when a captcha is encountered.
// @include             https://www.mturk.com/mturk/accept*
// @include             https://www.mturk.com/mturk/continue*
// @include             https://www.mturk.com/mturk/preview*
// @include             https://www.mturk.com/mturk/return*
// @require             http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==


if ($('input[name="userCaptchaResponse"]').length > 0) {
alert("Captcha");}