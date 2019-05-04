﻿// ==UserScript==
// @name           Dev_Multi_Open
// @description    Open all selected deviations at once!
// @namespace	   dev_multi_open_but
// @match			*://*.deviantart.com/notifications/*
// @version        1.30
// @contributor    Dediggefedde
// @grant			none
// ==/UserScript==


function Multi_Open_injecter() {

	// var $=unsafeWindow.jQuery,holder,query,offset,fPage,pPage,lPage;
	var akturls = [];
	var container;
	var selected = $();

	setInterval(start, 500);
	setInterval(pruf, 500);
	function start() {
		if($("div.mcbox").length==0)return;
		container = $(".f.td-sr").filter(function () {
				if ($(this).find(".dev_multiopen_but").length == 0)
					return true;
			});
		// console.log(container.length);
		if (container.length > 0) {
			container.css("width", "auto").append("<a href=''  class='gmbutton disabledbutton dev_multiopen_but' onclick='return false;'>Open 0</a>");
			container.find(".dev_multiopen_but").click(function () {
				selected.each(function () {
					open($(this).attr("href"));
					$(".mcbox-sel a[href='']:not(.u,.journal)").parents(".mcbox-sel").removeClass("mcbox-sel");
				});
			});
		}

	}
	function pruf() {
		if ($(".mcbox:not([multi_open])").length > 0) {
			$(".mcbox:not([multi_open])").click(pruf);
			$(".mcbox:not([multi_open])").attr("multi_open", "true");
		}

		var altsel = selected.length;
		selected = $(".mcbox-sel a:not([href=''],.journal)").filter(function () {
				if (akturls.indexOf($(this).attr("href")) != -1)
					return false;
				if ($(this).parents(".mczone").find(".mczone-title:contains('Activity')").length == 1) {
					if (!$(this).hasClass("u"))
						return false;
				} else {
					if ($(this).attr("href").search(/deviantart\.com.*\d+\/?$/i) == -1)
						return false;
				}
				akturls.push($(this).attr("href"));
				return true;
			});
		akturls = [];
		if (selected.length == altsel)
			return true;
		if (selected.length > 0) {
			$(".dev_multiopen_but").removeClass("disabledbutton");
		} else {
			$(".dev_multiopen_but").addClass("disabledbutton");
		}
		$(".dev_multiopen_but").html("Open " + selected.length);
	}
}

var el=document.createElement("script");
el.innerHTML="("+Multi_Open_injecter.toString()+")()";
document.body.appendChild(el);
document.body.removeChild(el);
// Multi_Open_injecter();