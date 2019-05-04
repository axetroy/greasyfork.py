// ==UserScript==
// @name			Forum Actionum: Noveau SuperSkrypt yojca™
// @description		Dodaje takie tam fajerwerki do forume.
// @author			yojc
// @version			0.02
// @include			http://forum.cdaction.pl/*
// @include			https://forum.cdaction.pl/*
// @run-at			document-end
// @grant			none
// @icon			http://yojc.is-best.net/favicon.ico
// @resource		http://media.gtanet.com/gtaforums/images/medal.png
// @namespace https://greasyfork.org/users/6689
// ==/UserScript==

/*jshint multistr: true, noarg: false, -W082 */
/*global $:false, jQuery:false, ipb:false */

(function () {
	var showGender = true;
	var showAwards = true;
	var colorGroup = true;

	// true === hide at start
	var toggleRep = false;
	var toggleSig = false;

	if (window.location.href.search("/topic/") != -1) {
		var authorPanelArray = jQuery(".ipsComment_author.cAuthorPane").each(function() {
			var $authorPanelNick = jQuery(this).find(".cAuthorPane_author");
			var $smugglerAward = jQuery(this).find(".wyroznienieSmugglerkowe");
			var $sexField = jQuery(this).find(".fc");
			var $groupField = jQuery(this).find(".cAuthorPane_photo + li > span");
			
			// showGender
			if (showGender && $sexField.length > 0) {
				var $genderSign = jQuery("<img/>", {
					style: "margin-right: 2px;"
				});
				
				if ($sexField.text().match("mężczyzna")) {
					$genderSign.attr("src", "https://x.forum.cdaction.pl/public/style_images/infinite_dark/profile/male.png");
					$authorPanelNick.append($genderSign);
				}
				else if ($sexField.text().search("kobieta") != -1) {
					$genderSign.attr("src", "https://x.forum.cdaction.pl/public/style_images/infinite_dark/profile/female.png");
					$authorPanelNick.append($genderSign);
				}
			}
			
			// showAwards
			if (showAwards && $smugglerAward.length > 0) {
				var awardTitle = $smugglerAward.attr("title").replace(/<(?:.|\n)*?>/gm, '')
				$smugglerAward.attr("title", awardTitle);
				$smugglerAward.attr("src", "http://media.gtanet.com/gtaforums/images/medal.png");
				$smugglerAward.appendTo($authorPanelNick);
			}
			
			// colorGroup
			if (colorGroup && $groupField.length > 0 && $authorPanelNick.find("a").length > 0) {
				$authorPanelNick.find("a").attr("style", $groupField.attr("style"));
			}
		});
	}


	var $ignoredLink = jQuery("[data-menuitem=ignoredUsers] + li");
	var $spacer = jQuery("<li class=\"ipsMenu_sep\"><hr></li>");

	var $hideSig = jQuery("<li class=\"ipsMenu_item\" data-menuitem=\"hideSig\" style=\"cursor: pointer;\"><a>Pokaż/ukryj sygnatury</a></li>");
	var $hideRep = jQuery("<li class=\"ipsMenu_item\" data-menuitem=\"hideRep\" style=\"cursor: pointer;\"><a>Pokaż/ukryj reputację</a></li>");

	$ignoredLink.after($spacer);
	$ignoredLink.after($hideRep);
	$ignoredLink.after($hideSig);

	$("[data-role=memberSignature]").attr("style", "display: " + (toggleSig ? "none" : "block") + " !important");
	$hideSig.click(function() {
		var $e = $("[data-role=memberSignature]");
		if ($e.attr("style") === "display: block !important") {
			$e.attr("style", "display: none !important")
		}
		else {
			$e.attr("style", "display: block !important")
		}
	});

	$("[data-controller='core.front.core.reputation']").attr("style", "display: " + (toggleRep ? "none" : "block") + " !important");
	$hideRep.click(function() {
		var $e = $("[data-controller='core.front.core.reputation']");
		if ($e.attr("style") === "display: block !important") {
			$e.attr("style", "display: none !important")
		}
		else {
			$e.attr("style", "display: block !important")
		}
	});

	$('<style>#elUserLink_menu li[data-menuItem="hideRep"] a::before { content: "\\f0fe" !important;}</style>').appendTo("head");
})();