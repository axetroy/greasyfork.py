// ==UserScript==
// @name        Fix Salesforce Emails
// @namespace   jamie-thompson.co.uk
// @description Fix wrapping for emails in Salesforce.
// @include     https://eu1.salesforce.com/*
// @version     1
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle((<><![CDATA[
	.sfdc_richtext pre { max-width: 70em; /*white-space: normal;*/ }
	.sfdc_richtext, .inlineEditModified { overflow: auto; max-width: 70em; }
]]></>).toString());