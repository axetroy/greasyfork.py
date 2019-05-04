// ==UserScript==
// @name        MTurk Research Project Help Us Improve
// @namespace   http://idlewords.net
// @include     https://www.mturkcontent.com/dynamic/hit*
// @version     2
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @grant       none
// @description Makes Research Project "Help us Improve..." HITs a little easier
// ==/UserScript==

$(document).ready(function() {
	if ($("h2:contains('Help us CORRECT the output')").length) {
		$("#countrySelect").val('US');
		$("select[name='nativeEnglish']").val('y');
		$("#introduction1, #instructions1, #examples1").hide();
		$("#hit1").show();
		$("#correctionText").focus();
	}
});