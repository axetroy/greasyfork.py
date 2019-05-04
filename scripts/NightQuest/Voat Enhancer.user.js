// ==UserScript==
// @name        Voat Enhancer
// @author      NightQuest
// @namespace   recelate.net
// @description Various enhancements for Voat.co
// @include     http://voat.co/*
// @include     http://*.voat.co/*
// @include     https://voat.co/*
// @include     https://*.voat.co/*
// @version     1.0.5.8
// @supportURL  https://github.com/NightQuest/VoatEnhancer
// @grant       none
// ==/UserScript==

// Icons were created by Mark James (famfamfam.com) - http://www.famfamfam.com/lab/icons/silk/
// Used under the Creative Commons Attribution 2.5 License

// function definitions
unsafeWindow.createButton = function(text, clickfunc)
{
	var button = document.createElement('button');
	button.className = "btn-whoaverse-paging btn-xs btn-default";
	button.onclick = clickfunc;
	button.style = "margin-left: 10px; margin-right: 10px;";
	button.type = "button";
	button.appendChild(document.createTextNode(text));
	return button;
}

unsafeWindow.getSubverseName = function()
{
	if( $(".pagename > a").length != 1 || typeof $(".pagename > a")[0].firstChild == undefined )
		return undefined;

	return $(".pagename > a")[0].firstChild.nodeValue;
}

unsafeWindow.isOnSubverse = function()
{
	return getSubverseName() != undefined;
}

unsafeWindow.getSubverseStyle = function()
{
	var ss = document.styleSheets;
	for( var x = 0; x < ss.length; x++ )
	{
		if( ss[x].ownerNode.id == "custom_css" )
			return ss[x];
	}

	return undefined;
}

unsafeWindow.toggleTheme = function()
{
	$.post("/account/togglenightmode/", function()
	{
		var newStyle = $(document.documentElement).find("link[rel='stylesheet'][href*='Voat.css'],[href*='Voat-Dark.css']");

		var style = $(document.documentElement).find("link[rel='stylesheet'][href*='Light'],[href*='Dark']");
		
		if( newStyle.length )
		{
			if( newStyle[0].href.indexOf('Voat-Dark.css') != -1 )
			{
				newStyle[0].href = newStyle[0].href.replace("Voat-Dark.css", "Voat.css");
				document.body.className = "light";
			}
			else
			{
				newStyle[0].href = newStyle[0].href.replace("Voat.css", "Voat-Dark.css");
				document.body.className = "dark";
			}
		}
		else if( style.length )
		{
			if( style[0].href.indexOf('Dark') != -1 )
			{
				style[0].href = style[0].href.replace("Dark", "Light");
				document.body.className = "light";
			}
			else
			{
				style[0].href = style[0].href.replace("Light", "Dark");
				document.body.className = "dark";
			}
		}
		else
			window.location.reload();
	});
}

unsafeWindow.toggleFullWidth = function()
{
	if( $('#FullWidth_css').length )
	{
		$('#FullWidth_css').remove();

		localStorage.setItem("VE_FullWidth", 0);
		var ExpCal = $("#ExpandCollapseWidth");
		ExpCal.attr("class", "expandWidthlink");
		ExpCal.attr("title", "Expand Site Width");
	}
	else
	{
		var css = "\
		#header-account {\
			right: 2% !important;\
		}\
		\
		#header-banner, #container {\
			max-width: 100% !important;\
		}\
		.usertext {\
			max-width: 75% !important;\
		}\
		.commenttextarea {\
			max-width: 35% !important;\
		}";
		var style = document.createElement('style');
		style.type = 'text/css';
		style.id = 'FullWidth_css';
		if( style.styleSheet )
			style.styleSheet.cssText = css;
		else
			style.appendChild(document.createTextNode(css));
		document.body.appendChild(style);
		
		localStorage.setItem("VE_FullWidth", 1);
		var ExpCal = $("#ExpandCollapseWidth");
		ExpCal.attr("class", "collapseWidthlink");
		ExpCal.attr("title", "Collapse Site Width");
	}
}

unsafeWindow.toggleSubverseStyle = function()
{
	if( $("#custom_css").length && isOnSubverse() )
	{
		var subverseName = getSubverseName();
		var subverses = JSON.parse(localStorage.getItem("VE_disabledStyles"));
		if( subverses == null )
			subverses = {};

		if( subverses.hasOwnProperty(subverseName) )
			delete subverses[subverseName];
		else
			subverses[subverseName] = true;

		var style = getSubverseStyle();
		if( typeof style != undefined )
		{
			style.disabled = subverses.hasOwnProperty(subverseName);
			$("#VE_disable_style").css("margin", "" + $("#l").css("margin-top") + " " +  $("#l").css("margin-right") + " " + $("#l").css("margin-bottom") + " " + $("#l").css("margin-left") + "");
		}
		
		if( jQuery.isEmptyObject(subverses) )
			localStorage.removeItem("VE_disabledStyles");
		else
			localStorage.setItem("VE_disabledStyles", JSON.stringify(subverses));
	}
}

unsafeWindow.VE_dropFunction = function(event)
{
    event.stopPropagation();
    event.preventDefault();

	try {
		var data = event.dataTransfer.getData("text/html");
		if( typeof $(data).attr("href") != undefined || typeof $(data).attr("src").length != undefined )
			dropFunction(event);
		else
			$("#share-a-link-overlay").hide();
	} catch (e) {
		console.log(e);
		$("#share-a-link-overlay").hide();
	}
}

// Only continue if we're logged in
if( !($(".logged-in").length == 1 && $(".logged-out").length == 0) )
{
	var err = "Not logged in, VoatEnhancer has exited.";
	console.log(err);
	throw new Error(err);
}

// Remove duplicate "custom_css" nodes
{
	var treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT,
	{
		acceptNode: function(node)
		{
			if( node.nodeName === "STYLE" && node.id === "custom_css" )
				return NodeFilter.FILTER_ACCEPT;
		}
	}, false);

	var node, nodes = [];
	while((node = treeWalker.nextNode()))
		nodes.push(node);

	while( nodes.length > 1 )
		$(nodes.pop()).remove();
}

// Apply our custom CSS
{
	var css = "\
	#ExpandCollapseWidth {\
		display: inline-block;\
		outline: 0;\
		cursor: pointer;\
		height: 16px;\
		width: 16px;\
		position: relative;\
		top: 4px;\
		right: 4px;\
	}\
	\
	.expandWidthlink {\
		background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHkSURBVDjL3ZNvT1JhGMafb3G+TQqKECNFRIEDcvgXmB5IPNJmTdbC1SQ0S1xzZKXyT41TdpCOMyYtiXS9aW2uD8EbPsHV87RRmyLrdc92vbt/1/U8930/ZLYxASbpSwgz9SCin2+CHtJJwYoLgbITvvcOeN7a4S6NgTB45+cmCucvu8JMFOZCZQHpr0tYO12Ga9cKwpJz5xvIfH+GR2dxRGp+uSOs8Jxv39GKV+/gYS2OlXoSfNECMnMSRKw+hdS3BLI/Mlho3MPUR88lE+++ozlfjWG1kYJUCcNRsMCWM4NM02vf/hTgwsf+1uLpfTw4mcOtQ0G9aCDINiWmRiAdiAz+HTC6Nfi3QKx6uckjT3Pi0K1c1QPnzojahtsi3Zr2L/rfDGin5fE3o+pVxeYXRmVw3dA0Pddzfwz8Co82LFVERMuTbEyXJjGUMaqBgoBQ0Qfjmq5lWO3n9E/76IK8s4PCYHCytoDZgwhsWXPzosGNdYPszY1jTonBnxVgSuuhe6KhyfRDJGsJ3P0gQSqLDG7RBeE6PeF6Wie7X/MI5N2YLonoX+oFce1ZsXicQOJoHs68FdbNznBbAytaREthSHIE2lQPCF8cgT0/jLHtIQbD8sqEbrBuWYM+mqx93ANN8hp+AQOPtI0tirA3AAAAAElFTkSuQmCC) repeat scroll 0% 0%;\
	}\
	\
	.collapseWidthlink {\
		background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHqSURBVDjL3ZHbThpRFIZ5i3kcLRYPqIgUGcDhNKBAqyKCobTR2NhiKmCstcWmBmtLPaCO4CQ6SBWVKInx0N70KbjhCf7O3ia0ZS686F0vVrL3Xvv7VvIvFQBVuOITQxfe6tj5IEPu9xW/ZxGcu2aJnAksxW9eYP42hmB5oBY48zAjJ240QoP7HH3j8xYhWgwiUgiAyxpFlTxZmL2ewvrPNBJX0wid+TF0zCsEHtEKGcbT4igWK0k8OwzBumGo0uZoeUCYuZzE0vUcVn6k8OSbUyFwyfDbSgKvShOIFsZgWTfU2K96pv5huOSm8KfvS/AXHAqBQ2CxcJFAsjwDe5YFgWkGdzCPoSMXHhed8BXs8B7YFALbVh/6Nx+RyWAzevR91qEu+Jf6XwRuecdkTSRp27YcVtaoCLE33Qn9sha6D+3oSrVB+07zO0RXzsx4chxmT18ifhqjSTcKej5qMbkfRVQM12EqILA8uRaRgnguhRE7mqJrahR0y5MjYgi+TTfsq1a0vVELVODYMVUJ/Lo0jZG8768d/1md71uhS2nBZxwYzwXRn2bxMNksqLgtoxgQ/RjOe2HK9FCrYaVLIehY1KB9oYVpnVfXnKscrMsmqBNNEm2a13ol05c7+L7SzD1gWpLNVXW8SST3X7gvtJUuvnAlAAAAAElFTkSuQmCC) repeat scroll 0% 0%;\
	}\
	#VE_disable_style_div {\
		position: relative;\
	}";
	var style = document.createElement('style');
	style.type = 'text/css';
	if( style.styleSheet )
		style.styleSheet.cssText = css;
	else
		style.appendChild(document.createTextNode(css));
	document.head.appendChild(style);
}

// Replace "Toggle Night Mode" with our Ajax one
$("#nightmodetoggle").attr("onclick", "toggleTheme()");

// Replace the Drag & Drop function with ours
$("body").attr("ondrop", "VE_dropFunction(event)");

// Add our expand/collapse button
var ExpCal = document.createElement('a');
ExpCal.href = "javascript:void(0);";
ExpCal.id = "ExpandCollapseWidth";
$("#nightmodetoggle").before(ExpCal);
$("#ExpandCollapseWidth").attr("onclick", "toggleFullWidth();");
$("#nightmodetoggle").before( $("<span class=\"separator\">|</span>") );

if( Number(localStorage.getItem("VE_FullWidth")) == 1 )
{
	ExpCal.click();
}
else
{
	ExpCal.className = "expandWidthlink";
	ExpCal.title = "Expand Site Width";
}

// Add our "Disable subverse stylesheet" checkbox
if( $("#sub").length )
{
	var DS = document.createElement('input');
	DS.type = "checkbox";
	DS.id = "VE_disable_style";
	if( $("#custom_css").html().trim().length == 0 )
		DS.disabled = true;

	var DSL = document.createElement('label');
	DSL.setAttribute("for", "VE_disable_style");
	DSL.appendChild(document.createTextNode("Disable Subverse style"));

	var DSD = document.createElement('div');
	DSD.id = "VE_disable_style_div";
	DSD.appendChild(DS);
	DSD.appendChild(DSL);

	var parent = $("#l").parent().parent();
	parent.append(DSD);
	$("#VE_disable_style").attr("onclick", "toggleSubverseStyle();");
	$("#VE_disable_style").css("margin", "" + $("#l").css("margin-top") + " " +  $("#l").css("margin-right") + " " + $("#l").css("margin-bottom") + " " + $("#l").css("margin-left") + "");
}
if( isOnSubverse() )
{
	var subverses = JSON.parse(localStorage.getItem("VE_disabledStyles"));
	if( subverses != null && subverses.hasOwnProperty(getSubverseName()) )
	{
		var style = getSubverseStyle();
		if( typeof style != undefined )
			style.disabled = true;
		$("#VE_disable_style").attr("checked", true);
	}
}

// Open submissions in a new window
$(".submission .title a").each(function()
{
	this.target = "_blank";
});

// Add our "Archive.is" link
var tmp = $("div .submission,.link").find("span.domain > a");
if( tmp.length == 1 && tmp[0].href.substr(0,3) != "/v/" )
{
	var link = $("span.domain > a").parent().parent().find("a .title,.may-blank");
	if( link.length == 1 && link[0].href.indexOf("://archive.is/") == -1 )
	{
		$("#siteTable > div:not(.self .stickied) > div.entry > p.title").append(createButton("Archive", function()
		{
			open('https://archive.is/?run=1&url='+encodeURIComponent(link[0].href));
		}));
	}
}
