// ==UserScript==
// @name         Tweakblog Tweakers integration
// @namespace    http://remyblok.tweakers.net/
// @version      0.15
// @description  Integrate Tweakblog within the Tweakers layout
// @author       Remy Blok
// @match        https://*.tweakers.net/*
// @match        https://*.tweakblogs.net/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @require      http://code.jquery.com/jquery-2.1.4.min.js
// @run-at       document-start
// @connect      tweakblogs.net
// ==/UserScript==
(function() {
    'use strict';

var debug = false;

// check if we are on a tweakblog page, in that case redirect immediately
// this is needed to handle posting of comments, because comments will be posted to the original url
if (window.location.href.match(/https:\/\/(?:(\S*)\.)?tweakblogs\.net(?:\/)?(?:blog)?(\/\S+)?/i) ) 
{
	if (!debug) 
	{
		// because of the delay between setting the location and the page being loaded the 'old' blog is still shown
		// so add a style to hide it first before redirection
		GM_addStyle("html, body{display:none;}");	
		window.location.replace(window.location.href.replace(/https:\/\/(?:(\S*)\.)?tweakblogs\.net(?:\/)?(?:blog)?(\/\S+)?/i, 'https://tweakers.net/tweakblogs/$1$2'));
	}
	return;
}

// hide the exception before the page loads so that you get a decent experience
GM_addStyle(".exception{display:none;}");
// get a deferred object to when the page is loaded, page needs to be loaded before any html editing can be done
var domContentLoaded = $.Deferred();
addEventListener('DOMContentLoaded', domContentLoaded.resolve, false);
//there are some thing we need to do always, so do them as soon as the dom is loaded
$.when(domContentLoaded).done(onDomContentLoaded);

// in the mean time we can already load the blog page too
// when both are finished we can manipulate the HTML
$.when(loadBlog(), domContentLoaded).done(onBlogPageLoaded);

function loadBlog()
{
	var blogLoaded = $.Deferred();

	// if we're not on a /tweakblogs page, we skip the rest of the script
	if (window.location.href.indexOf("https://tweakers.net/tweakblogs") !== 0)
	{
		// do not forget to reset the .exception style
		GM_addStyle(".exception{display:inherit;}");
		return blogLoaded.reject().promise();
	}

	// get back the original URL of the blogpost.
	var blogParts = window.location.href.replace("https://tweakers.net/tweakblogs", "").split("/");
	blogParts.shift();
	var lastPart = blogParts.pop();
	if (lastPart !== undefined && lastPart !== "") 
		blogParts.push(lastPart);

	var blogUrl = null;
	var isBlogArticle = null;
	if (blogParts.length === 0)
		blogUrl = "https://tweakblogs.net/feed/";
	else
	{
		var username = blogParts.shift();
		blogUrl = "https://"+username+".tweakblogs.net/blog/"+blogParts.join('/');

		isBlogArticle = blogUrl.indexOf("/cat/") === -1 && 
            blogUrl.indexOf("/archief/") === -1 && 
            blogUrl.indexOf("/page/") === -1 && 
            blogParts.length > 0;
	}

	GM_xmlhttpRequest({
		method: "GET",
		url: blogUrl,
		onload: function(response) 
		{
			if(response.status != 200) 
			{
				// show the 404 again
				GM_addStyle(".exception{display:inherit;}");
				blogLoaded.reject();
			}

			var contentAreaToInsert;
			// we are on a specific blog of someone
			if (isBlogArticle !== null) 
			{
				contentAreaToInsert = renderBlogPage(isBlogArticle, response.responseText);
			}
			// we are on the overview page
			else 
			{
				contentAreaToInsert = renderOverviewPage(response.responseText);
			}

			blogLoaded.resolve(contentAreaToInsert);
		}
	});

	// add default styles and scripts used for articles on tweakers.net and blogs
	//$('head').prepend('<link rel="stylesheet" type="text/css" href="//tweakimg.net/x/min/articles+reacties.css?1447768474">');
    $('head').prepend('<link rel="stylesheet" type="text/css" href="//tweakimg.net/x/min/reacties.css?1447768474">');
    $('head').prepend('<link rel="stylesheet" type="text/css" href="//tweakimg.net/x/min/articles.css?1447768474">');
    $('head').prepend('<link rel="stylesheet" type="text/css" href="//tweakimg.net/x/min/imageviewer.css?1447768474">');
	$('head').append('<script src="//tweakimg.net/x/min/weblogs.js?1444126320"></script>');
	$('head').append('<script src="//tweakimg.net/x/min/imageviewer.js?1445949082"></script>');
    $('head').append('<script src="//tweakimg.net/x/min/rml_toolbar.js?1445949082"></script>');
	// add copied styling from tweakblogs.net
	addGeneralStyles();

	return blogLoaded.promise();
}

function onDomContentLoaded()
{
	// add mouse down event handler, for redirecting links to tweakblogs
	if (!debug)
		addMousedownEventHandler();

	//Add a Tweakblog link to the main menu and remove it from the sub menu
	var navMenu = $("#navMenu > li:last-child").before($('<li><a href="https://tweakers.net/tweakblogs/">Tweakblogs</a></li>'));
	var a = $('a:contains("Tweakblogs")', navMenu).parent().remove();

	if (window.location.href == "https://tweakers.net/")
	{
		// if we are on the t.net home page we 'steal' the part about the popular bogs for later use
		var blogs = $(".communityBlogs");
		GM_setValue("communityBlogs", redirectTweakblogLinks(blogs[0].outerHTML));
	}
}

function onBlogPageLoaded(contentAreaToInsert)
{
	// apperantly the page is now displaying actual content and no longer a 404
	// so we skip the rest of the script
	// unfortunately it is not possible to check the status code of the page without doing an extra Ajax call
	if ($(".exception").length === 0)
		return;

	// get the main part of the blogs
	var contentArea = $(".wrap");
	contentArea.addClass("insertedBlog");
	contentArea[0].innerHTML = contentAreaToInsert.innerHTML;

	// this can only be done after the html has been rendered
	// enable the reaction form and Archive folder tree
	new WeblogReactionForm();
	weblogFolderTree('archiveList');

	var commentlink = $(".commentLink");
	commentlink.click(function() { 
		getQuote($(this).data("reactieId")); 
	});

	// fix scrolling anchor into view
	var hash = window.location.hash;
	window.location.hash = "";
	window.location.hash = hash;
    
    // enable the Lightbox for showing images
    compareStorage.init();
    BehaviourManager.exec();
}

function renderOverviewPage(responseText)
{
	var feed = $.parseXML(responseText);
	document.title = document.title + " - Tweakblog overzicht";

	var contentAreaToInsert = $('<div id="contentAreaToInsert"><div class="mainColumn frontpage"><div class="fpItem" id="groupedContent"><div class="fpItem" id="tweakblogs"></div></div></div><div class="secondColumn frontpage"></div></div>');
	var content = $("#tweakblogs", contentAreaToInsert);

	var weekDays = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
	var months = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
	var rowTemplate = '<tr><td class="publicationTime"><span>{0}</span></td><td class="title"><a href="{1}">{2} door <i>{3}</i></a></td><td class="replies"><a href="{1}#reacties" class="commentCount" rel="nofollow">?</a></td></tr>';

	var todayTicks = new Date().setHours(0,0,0,0);
	var currentDateTicks = 0;
	var currentTable;
	$.each($("item", feed), function (idx, item) {
		var itemDate = new Date($("pubDate", item).text());
		var itemDateTicks = new Date($("pubDate", item).text()).setHours(0,0,0,0);
		if (currentDateTicks != itemDateTicks)
		{
			currentDateTicks = itemDateTicks;
			if (todayTicks == currentDateTicks)
			{
				content.append("<h2>Tweakblogs van vandaag</h2>");
			}
			else
			{
				content.append("<h2>Tweakblogs van "+ weekDays[itemDate.getDay()] + " " + itemDate.getDate() + " " + months[itemDate.getMonth()] + "</h2>");
			}

			currentTable = $("<table class=\"highlights useVisitedState\" cellspacing=\"0\">");
			content.append(currentTable);
		}

		var time = (itemDate.getHours() < 10 ? "0" + itemDate.getHours() : itemDate.getHours()).toString();
		time += ":" + (itemDate.getMinutes() < 10 ? "0" + itemDate.getMinutes() : itemDate.getMinutes()).toString();
		var link = redirectTweakblogLinks($("link", item).text());
		var title = $("title", item).text();
		var indexOfTitleStart = title.indexOf(":") + 2;
		title = title.substring(indexOfTitleStart);
		var creator = $("dc\\:creator", item).text();

		var row = rowTemplate.replace(/\{0\}/g, time)
		.replace(/\{1\}/g, link)
		.replace(/\{2\}/g, title)
		.replace(/\{3\}/g, creator);

		currentTable.append($(row));
	});

	var cachedCommunityBlogs = GM_getValue("communityBlogs", "");
	if (cachedCommunityBlogs !== "")
	{
		var secondColumn = $(".secondColumn", contentAreaToInsert);
		secondColumn.append("<h2>Populaire Tweakblogs</h2>");
		var communityBlogs = $(cachedCommunityBlogs);
		secondColumn.append(communityBlogs);
		communityBlogs.wrap("<div id=\"community\"></div>");
		$(".readMore", communityBlogs).remove();
	}

	contentAreaToInsert.append($("<br class=\"clear\">"));
	return contentAreaToInsert[0];
}

function renderBlogPage(isBlogArticle, responseText)
{
	// parse the HTML and set the title
	var html = $.parseHTML(responseText, null, false);
	document.title = $("<div/>").html(responseText.match(/<title>(.*)<\/title>/i)[1]).text();

	// get the main part of the blogs
	var blogpost = $("#pagebody", html).wrap("<div id=\"contentAreaToInsert\"></div>");
	var contentAreaToInsert = $("#contentAreaToInsert", html);

	// make the header H1 in stead of H2
	$("h2", blogpost).changeElementType("h1").addClass("ellipsis");
	$("h4", blogpost).changeElementType("h2");

	// fix basic styling issue
	$(".columnwrapper", blogpost).addClass("articleColumn wide");
	$(".sidebar", blogpost).addClass("relevancyColumn responsiveHideColumn");
	$(".sidebar > div", blogpost).not(":first").addClass("greyTopBorderBlock");
	$(".recentPosts li", blogpost).addClass("ellipsis");

	//add the breadcrumbs
	var breadcrumbs = $("p.breadCrumb", html);
	contentAreaToInsert.prepend(breadcrumbs);

	//add the custom blog banner
	var banner = $("#banner", html);
	contentAreaToInsert.prepend(banner);

	$.each(html, function(i, el) {
		if (el.nodeName.match(/style/i))
		{
			var bannerCss = el.innerHTML.match(/(#banner.*\{(?:.|\s)*?\})/ig);
			if (bannerCss !== null)
			{
				$.each(bannerCss, function(idx, css) {
					GM_addStyle(css);
				});
			}
			var bgColorCss = el.innerHTML.match(/#container.*\{(?:[^\}])*background-color: (#.{6})*;(?:.|\s)*?\}/i);
			if (bgColorCss !== null)
				GM_addStyle("#banner{background-color:" + bgColorCss[1] + "}");
		}
	});

	// move the sitebar and comments to the correct position in DOM tree
	$(".columnwrapper", contentAreaToInsert).after($('.sidebar', contentAreaToInsert));
	$(".sidebar", contentAreaToInsert).after($('#commentColumn', contentAreaToInsert));

	if (isBlogArticle)
		renderBlogArticle(blogpost);
	else
		renderBlogListing(blogpost);

	return contentAreaToInsert[0];
}

function renderBlogArticle(blogpost)
{
	// make the first paragraph bold
	var article = $(".article", blogpost)[0];
	article.innerHTML = "<p><b>" + article.innerHTML.replace(/<br>/i ,"</b><br>") + "</p>";

	// fix next/previous links
	var nextPrev = $("p.nextPrevious", blogpost);
	if (nextPrev.length > 0)
	{
		nextPrev.changeElementType("div").addClass("nextPrevLinks");
		var img = $("img", nextPrev);
		var hasNext = img[0].src.indexOf("up") > 0;
		var hasPrev = img[img.length - 1].src.indexOf("down") > 0;
		img.remove();
		$("br", nextPrev).remove();
		nextPrev.contents().filter(function(){ return this.nodeType == 3;}).remove();
		var a = $("a", nextPrev).wrap("<li></li>");
		var li = $("li", nextPrev).wrapAll("<ul></ul>");
		if (hasNext) $(li[0]).addClass("next");
		if (hasPrev) $(li[img.length - 1]).addClass("previous");
	}
	// #commentcolumn has specfic styles so add the id
	var reacties = $("#reacties", blogpost);
	reacties.wrap("<div id='commentColumn'></div>");
	$("hr", reacties).remove();

	//fix comments
	var comments = $(".reactie", blogpost);
	$.each(comments, function (idx, el)
		   {
		el = $(el);

		$(".quoteImg", el).remove();
		var editLink = $(".editLink", el).remove();

		var author = $("p.author", el).changeElementType("div");
		author.addClass("reactieHeader");
		author.contents().filter(function() {
			return this.nodeType === 3;
		}).remove();

		var img = $("img:last", author).wrap("<span class=\"thumb usericonsmall empty\"></span>");

        $('a:has(> img[alt="edit"])', author).first().addClass("editLink");
		$('a', author).not(":has(> img[alt='edit'])").first().addClass("userLink").after("<br>");
		$('a:last', author).addClass("date");

		if(el.hasClass('ownreply'))
			author.prepend("<span class=\"authorReaction\">Auteur</span>");

		var footer = $('<div class="reactieFooter"><a href="javascript:void(0)" class="commentLink" data-reactie-id="' + el[0].id.substr(2) + '" rel="nofollow">Reageer</a></div>');
		el.append(footer);
		if (editLink[0])
			footer.append('<br><a href="' + editLink.href +'" class="editLink" rel="nofollow">Bewerk reactie</a>');
		el.wrapInner("<div class=\"reactieBody nochilds\"></div>");
	});

	// replace the submit button with a fancy button
	$(".submit > input", blogpost).replaceWith($('<input type="submit" value="Plaats reactie" class="fancyButton" id="reactionFormSubmit" accesskey="s" tabindex="5">'));
}

function renderBlogListing(blogpost)
{
	$("h1", blogpost).not(":first").css("margin-top", "20px");
}
function getQuote(reactionId)
{
	var quote = Ajax.sendRequest(
		getXmlHttpUrl('weblogs', 'reaction', 'quote', 'id=' + encodeURIComponent(reactionId)),
		{
			method: 'GET',
			type: 'json',
			async: false,
			nocache: true,
			handler: checkJsonResponse
		}
	);
	if (quote)
	{
		var reactieForm = $("#reactieFormContent");
		reactieForm.val(reactieForm.val() + quote);
		reactieForm.focus();
	}
}

function redirectTweakblogLinks(html)
{
	return html.replace(/https:\/\/(?:(\S*)\.)?tweakblogs\.net(?:\/)?(?:blog)?(\/\S+)?/ig, 'https://tweakers.net/tweakblogs/$1$2');
}

function addMousedownEventHandler()
{
	document.body.addEventListener('mousedown', function(e) {
		var targ = e.target || e.srcElement;
		if(e.button === 0 && targ)
		{
			while (targ && !(targ.href))
				targ = targ.parentElement;

			if (targ && targ.href && targ.href.match(/https:\/\/(?:(\S*)\.)?tweakblogs\.net(?:\/)?(?:blog)?(\/\S+)?/i) ) 
			{
				targ.href = targ.href.replace(/https:\/\/(?:(\S*)\.)?tweakblogs\.net(?:\/)?(?:blog)?(\/\S+)?/i, 'https://tweakers.net/tweakblogs/$1$2');
				targ.target="_self";
			}
		}
	});
}


function addGeneralStyles()
{
	GM_addStyle(
		".insertedBlog .sidebar{margin-top:-15px}"
		+ ".insertedBlog .sidebar h2{padding-top:5px}"
		+ ".insertedBlog .sidebar ul{padding:0;margin:0;line-height:20px}"
		+ ".insertedBlog .sidebar ul .ulChild{margin:0 0 0 -14px}"
		+ ".insertedBlog .sidebar li{list-style-type:none;background-position:0 1px;background-repeat:no-repeat;padding-left:20px}"
		+ ".insertedBlog .sidebar li a.current{font-weight:700}"
		+ ".insertedBlog .recentPosts li{background-image:url(../../g/if/icons/page.png)}"
		+ ".insertedBlog .categories li,.archives li{background-image:url(../../g/if/icons/folder.png)}"
		+ ".insertedBlog .about li.user,.friends li{background-image:url(../../g/if/icons/user.png)}"
		+ ".insertedBlog .about li.twitter{background-image:url(../../g/if/comments/twitter.png)}"
		+ ".insertedBlog .about li.admin{background-image:url(../../g/if/icons/article.png)}"
		+ ".insertedBlog #reactieForm div.submit a{font-weight:700;font-size:11px;float:right;margin-right:24px;color:#7b7b7b}"
		+ ".insertedBlog #reacties .reactie form{width:515px;padding-left:20px;background:url(../../g/if/comments/branch.gif) no-repeat 7px 5px}"
		+ ".insertedBlog #reacties .reactie form textarea{width:487px}"
		+ ".insertedBlog #reacties .reactie .thumb img {padding: 9px 9px 8px 8px;}"
		+ ".insertedBlog #reacties .reactie .thumb.empty {background:url(data:image/gif;base64,R0lGODdhAwADAKECAODj4+Hj4////////ywAAAAAAwADAAACBIxuBwUAOw==)}"
		+ ".insertedBlog #reacties .reactie .thumb.empty:before {content:none;}"
		+ ".insertedBlog div.clear hr{display:none}"
		+ ".insertedBlog img.left{float:left;margin:0 10px 10px 0}"
		+ ".insertedBlog img.right{float:right;margin:0 0 10px 10px}"
		+ ".insertedBlog img.border{border:1px solid #000}"
		+ ".insertedBlog img.padding{padding:2px}"
		+ ".insertedBlog table.phphighlight{margin:2px 0;table-layout:fixed;border-collapse:collapse;width:100%}"
		+ ".insertedBlog table.phphighlight td{vertical-align:top;border:1px solid #000}"
		+ ".insertedBlog table.phphighlight td,table.phphighlight td pre,table.phphighlight td code{margin:0;color:#000;font:12px/125% \"Liberation Mono\",Menlo,\"courier new\",Courier,monospace;white-space:nowrap}"
		+ ".insertedBlog table.phphighlight td pre{white-space:pre}"
		+ ".insertedBlog table.phphighlight td.phphighlightline{padding:4px;text-align:right;width:22px;background-color:#e6e4e1}"
		+ ".insertedBlog table.phphighlight td.phphighlightcode{padding:0;background-color:#fefefe}"
		+ ".insertedBlog table.phphighlight td.phphighlightcode div{overflow:auto;overflow-y:hidden}"
		+ ".insertedBlog table.phphighlight td.phphighlightcode pre,table.phphighlight td.phphighlightcode code{display:block;padding:4px}"
		+ ".insertedBlog table.phphighlight td.phphighlightcode pre span,table.phphighlight td.phphighlightcode code span{line-height:100%}"
		+ ".insertedBlog .code_hll{background-color:#ffc}"
		+ ".insertedBlog .code_c{color:#998;font-style:italic}"
		+ ".insertedBlog .code_err{color:#a61717;background-color:#e3d2d2}"
		+ ".insertedBlog .code_k{color:#000;font-weight:700}"
		+ ".insertedBlog .code_o{color:#000;font-weight:700}"
		+ ".insertedBlog .code_cm{color:#998;font-style:italic}"
		+ ".insertedBlog .code_cp{color:#999;font-weight:700;font-style:italic}"
		+ ".insertedBlog .code_c1{color:#998;font-style:italic}"
		+ ".insertedBlog .code_cs{color:#999;font-weight:700;font-style:italic}"
		+ ".insertedBlog .code_gd{color:#000;background-color:#fdd}"
		+ ".insertedBlog .code_ge{color:#000;font-style:italic}"
		+ ".insertedBlog .code_gr{color:#a00}"
		+ ".insertedBlog .code_gh{color:#999}"
		+ ".insertedBlog .code_gi{color:#000;background-color:#dfd}"
		+ ".insertedBlog .code_go{color:#888}"
		+ ".insertedBlog .code_gp{color:#555}"
		+ ".insertedBlog .code_gs{font-weight:700}"
		+ ".insertedBlog .code_gu{color:#aaa}"
		+ ".insertedBlog .code_gt{color:#a00}"
		+ ".insertedBlog .code_kc{color:#000;font-weight:700}"
		+ ".insertedBlog .code_kd{color:#000;font-weight:700}"
		+ ".insertedBlog .code_kn{color:#000;font-weight:700}"
		+ ".insertedBlog .code_kp{color:#000;font-weight:700}"
		+ ".insertedBlog .code_kr{color:#000;font-weight:700}"
		+ ".insertedBlog .code_kt{color:#458;font-weight:700}"
		+ ".insertedBlog .code_m{color:#099}"
		+ ".insertedBlog .code_s{color:#d01040}"
		+ ".insertedBlog .code_na{color:#008080}"
		+ ".insertedBlog .code_nb{color:#0086b3}"
		+ ".insertedBlog .code_nc{color:#458;font-weight:700}"
		+ ".insertedBlog .code_no{color:#008080}"
		+ ".insertedBlog .code_nd{color:#3c5d5d;font-weight:700}"
		+ ".insertedBlog .code_ni{color:#800080}"
		+ ".insertedBlog .code_ne{color:#900;font-weight:700}"
		+ ".insertedBlog .code_nf{color:#900;font-weight:700}"
		+ ".insertedBlog .code_nl{color:#900;font-weight:700}"
		+ ".insertedBlog .code_nn{color:#555}"
		+ ".insertedBlog .code_nt{color:#000080}"
		+ ".insertedBlog .code_nv{color:#008080}"
		+ ".insertedBlog .code_ow{color:#000;font-weight:700}"
		+ ".insertedBlog .code_w{color:#bbb}"
		+ ".insertedBlog .code_mf{color:#099}"
		+ ".insertedBlog .code_mh{color:#099}"
		+ ".insertedBlog .code_mi{color:#099}"
		+ ".insertedBlog .code_mo{color:#099}"
		+ ".insertedBlog .code_sb{color:#d01040}"
		+ ".insertedBlog .code_sc{color:#d01040}"
		+ ".insertedBlog .code_sd{color:#d01040}"
		+ ".insertedBlog .code_s2{color:#d01040}"
		+ ".insertedBlog .code_se{color:#d01040}"
		+ ".insertedBlog .code_sh{color:#d01040}"
		+ ".insertedBlog .code_si{color:#d01040}"
		+ ".insertedBlog .code_sx{color:#d01040}"
		+ ".insertedBlog .code_sr{color:#009926}"
		+ ".insertedBlog .code_s1{color:#d01040}"
		+ ".insertedBlog .code_ss{color:#990073}"
		+ ".insertedBlog .code_bp{color:#999}"
		+ ".insertedBlog .code_vc{color:#008080}"
		+ ".insertedBlog .code_vg{color:#008080}"
		+ ".insertedBlog .code_vi{color:#008080}"
		+ ".insertedBlog .code_il{color:#099}"
		+ ".insertedBlog .code_keyword{color:#080}"
		+ ".insertedBlog .code_special{color:#d0d}"
		+ ".insertedBlog .code_ident{color:#00b}"
		+ ".insertedBlog .code_ident_deprecated{color:#00b;font-style:italic}"
		+ ".insertedBlog .code_ident_unknown{color:#bbb}"
		+ ".insertedBlog .code_number{color:#00f}"
		+ ".insertedBlog .code_method{color:#008;font-weight:700;line-height:100%}"
		+ ".insertedBlog .code_method_deprecated{color:#008;font-weight:700;line-height:100%;font-style:italic}"
		+ ".insertedBlog .code_method_unknown{color:#888;line-height:100%}"
		+ ".insertedBlog .code_string{color:#d00}"
		+ ".insertedBlog .code_comment{color:#808}"
		+ ".insertedBlog .code_preproc{color:#008}"
		+ ".insertedBlog .code_error_line{color:#f00;text-decoration:underline}"
		+ ".insertedBlog .code_error{color:#000;text-decoration:none}"
		+ ".insertedBlog #banner{overflow:hidden;padding:5px 15px 10px;background-repeat:no-repeat}"
		+ ".insertedBlog #banner h1{padding:0;margin:10px 0 5px;font-size:25px;font-weight:700}"
		+ ".insertedBlog #banner h1 a,#banner .subtitle{color:#414141}"
		+ ".insertedBlog #banner .subtitle{font-style:italic}"
		+ ".insertedBlog .breadCrumb{margin:0 0 15px 0;padding:10px 0 8px;border-bottom:1px solid #bcbdbd;font-size:11px;overflow:hidden;}"
		+ ".insertedBlog .breadCrumb,.breadCrumb a{color:#646464}"
		+ ".insertedBlog .breadCrumb span{padding:0 3px}"
		+ ".insertedBlog .breadCrumb img{float:left;margin-right:5px}"
		+ "html.js .insertedBlog .archives ul>li{cursor:pointer;padding-left:28px;background-image:url(../../g/if/icons/folder_tree_min.png);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}"
		+ "html.js .insertedBlog .archives ul li li{cursor:default}"
		+ "html.js .insertedBlog .archives ul>li.closed{background-image:url(../../g/if/icons/folder_tree_plus.png)}"
		+ "html.js .insertedBlog .archives ul>li.closed ul{display:none}"
		+ ".insertedBlog .frontpage #community .communityItem {width: 300px;}"
		+ ".insertedBlog .frontpage #community .communityItem:nth-child(2n+1){margin-right: 0px;}"
		+ ".insertedBlog .frontpage #community .communityItem .communityDescription{min-width:260px;}"
		+ ".insertedBlog .article table{border:inherit;background:inherit;padding:inherit;border-spacing:0;margin:inherit}"
		+ ".insertedBlog .article table th,.article table td{padding:inherit;text-align:left}"
		+ ".insertedBlog .article table th{font-weight:inherit;text-align:left}"
		+ ".insertedBlog .article table tr:first-child td{border:0}"
		+ ".insertedBlog .article table{border:0 solid #000;border-collapse:collapse}"
		+ ".insertedBlog .article table td,.article table th{border: 0; font-size:100%;line-height:150%}"
		+ ".insertedBlog .article table th{text-align:center;font-weight:700}"
		+ ".insertedBlog .article table[border]{border-width:1px;margin-left:1px}"
		+ ".insertedBlog .article table[border] tbody,.article table[border] tr,.article table[border] td,.article table[border] th{border:inherit}"
        + ".insertedBlog .editLink{float:right;}"
        + ".insertedBlog .greyTopBorderBlock{border-width:1px;}"


		// scaling the header on smaller devices
		+ "@media (max-width: 767px), (max-device-width: 767px) and (orientation: portrait), (max-device-width: 499px) and (orientation: landscape) {"
		+ ".insertedBlog #banner h1, #banner .subtitle { display: inherit !important;}"
		+ ".insertedBlog #banner { background-image: none !important; height: inherit !important;}"
		+ "}"
	);
}

//helper function to change the html tag of a element
(function($) {
	$.fn.changeElementType = function(newType) 
	{
		var _this = this;
		$.each(this, function(i) {
			var attrs = {};

			$.each(this.attributes, function(idx, attr) {
				attrs[attr.nodeName] = attr.nodeValue;
			});

			var newItem;
			$(this).replaceWith(function() {
				newItem = $("<" + newType + "/>", attrs);
				return newItem.append($(this).contents());
			});
			_this[i] = newItem[0];
		});
		return this;
	};
})(jQuery);
})();