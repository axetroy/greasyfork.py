// ==UserScript==
// @name MAL Anime/Manga Page Enhancements
// @description Formats the default html on MAL anime/manga entries pages.
// @author svaax@MAL
// @version 2.7
// @license GPL v3
// @namespace https://greasyfork.org/users/4672
// @include https://myanimelist.net/manga/*
// @include https://myanimelist.net/manga.php*
// @include https://myanimelist.net/anime/*
// @include https://myanimelist.net/anime.php*
// @include https://myanimelist.net/panel.php?go=add
// @exclude https://myanimelist.net/anime/*/*/episode/*
// @grant none
// @run-at document-end
// ==/UserScript==


//==start/SETTINGS==
/**
*	settings variable values, unless stated otherwise, are: "true" or "false" 
*
* 	formatSynonyms
*			format synonyms list; not recommended, but could be used
*
*	formatRelatedItems
*			format "related items" on manga or anime page
*
*	formatDate
*			format publishing/airing dates to one of the formats below
*
*	dateFormat
*			new date format in which date should appear:
*				available formats:
*				0 = yyyy/mm/dd 
*				1 = dd/mm/yyyy 
*				2 = mm/dd/yyyy
*				3 = yyyy-mm-dd
*				4 = dd-mm-yyyy
*				5 = mm-dd-yyyy
*
*	highlightFutureDate
*			highlight date if it's in the future;
*			! could only be used if "formatDate" value is more than 0
*
*	removeEndYear
*			remove year from end date if it's the same as in start date 
*
*	addDateDay
*
*	formatMangaAuthors
*			change manga authors to appear like list - each author in one line
*				values:
*				0 - no
*				1 - yes (complex)
*				2 - yes (simple - just adds break line after each author)
*
*	sortMangaAuthors
*			sort manga authors desc by name;
*			! could only be used if "formatMangaAuthors"  is set to true
*
*	removeComma
*			remove a comma from people names (manga authors)
*
*	hideReviews
*			hide reviews and recommendations.
*
*	hideEpisodes
*			hide episodes descriptions
*
*	removeStream
*			remove obnoxious watch stream banner
*
*	hideFeatured
*			hide featured articles element
*
*	autoPager (for dates)
*			if the dates for some reason are not formatted properly with this, change the value to 'true'
* 			preferable XPath for AutoPager use:
*				//div[@id='content']/div/table 
*
*/
(function () {

var opt = {

	/* formatSynonyms: false, */
	formatRelatedItems: true, 
	
	formatDate: true, 
	dateFormat: 0,
	highlightFutureDate: true,
	removeEndYear: true,
	addDateDay : false,
		autoPager : false,
	
	formatMangaAuthors: 1,
	sortMangaAuthors: true,
	removeComma : true,
	hideEpisodes : true,
	removeStream : true,
	hideFeatured : true,
	moveAddToMyListButton : false,
	
	/* external links */
	searchoptions : true,
	
	/* load more info tab under synopsis */
	loadMoreinfoTab : true,
		hideMoreinfo : true, // hide loaded more info | default = true
		
	loadGalleryPicturesCount : true,
	
	hideReviews : true,
	
	newElementsPad : '0 7px' // | default: 0 7px
	
},


// ==end/SETTINGS==
url = document.URL,
matchcode, newreplace, mh, htmlcodecache,
mainPage = $('.horiznav_active').html() === "Details" ? true : false;

$.fn.removeContentBetween = function (n) {
	m = 0;
	n = n.toUpperCase();
	this.each(function () {
		if (m == 0) { if (this.nodeName == n) m = 1; }
		else if (m == 1) {
			if (this.nodeName == n) return false;
			$(this).remove();
		}
	});
};

if (url.match("panel.php") == null) {
	
/* hide featured */
	if (opt.hideFeatured === true)
	{
		node = $('.detail-page-featured-article');
		if (node.length && node.html().indexOf("No recent Featured Articles were found.") == -1)
		{
			node.hide();
			node.prev().html('<a style="cursor: pointer;" onclick="var t=$(\'.detail-page-featured-article\'); if(t.css(\'display\')===\'none\') {t.show(200)} else {t.hide(200)};">Recent Featured Articles</a>')
		}
	}
	
/* remove stream from the main page 
	if (opt.removeStream === true && url.indexOf("/anime") != -1)
	{
		node = $('#banner-anime-streaming-block-detail');
		if (node.length)
		{
			node.prev().remove();
			node.remove();
		}
	}*/

/* format manga authors list on entries*/
	node = $('#content td:eq("0") div:contains(Authors)').eq(1);
	if (node.length && opt.formatMangaAuthors > 0 && !/None/.test(node.html()))
	{
		matchcode = node.html();
		node.contents().removeContentBetween("span");
		if (opt.formatMangaAuthors === 1)
		{
			var authors = ['','',''],
				authorsnew = [],
				regexp = /<a [^>]+>([\u0000-\uFFFF]+?)<\/a> \((?:Story &amp; Art|Story|Art)\)/g,
				match,
				matchauthors = [],
				i = 0;
			
			while (match = regexp.exec(matchcode)) {
				matchauthors[i] = {"author" : match[1], "html" : match[0]};
				i++;
			}
			var matchauthorslenght = matchauthors.length;
			
			/* sort authors function */
			if (opt.sortMangaAuthors == 1) matchauthors.sort(function (a,b) {
				var field = "author", reverse = 1, first = function (a) {return a.toUpperCase()}, key = function(x) {return first(x[field])};
				return a = key(a), b = key(b), [-1, 1][+!!reverse] * ((a > b) - (b > a)); });
			
			if (matchauthorslenght > 1)
			{
				var insertbreakline,
					authorRegex = /<a [^>]+>[\u0000-\uFFFF]+?<\/a>/;
					
				for (i = 0; i < matchauthorslenght; i++)
				{
					if (opt.removeComma === true) matchauthors[i]['html'] = matchauthors[i]['html'].replace(', ', ' ');
					insertbreakline = (i != matchauthorslenght-1) ? '<br>' : '';

					switch (matchauthors[i]['html'].match(/\((Story &amp; Art|Story|Art)\)/)[1])
					{
						case "Story &amp; Art":
							authors[0] += '&nbsp;&nbsp;' + matchauthors[i]['html'].match(authorRegex) + '<br>';
							break;
							
						case "Story":
							authors[1] += '&nbsp;&nbsp;' + matchauthors[i]['html'].match(authorRegex) + '<br>';
							break;
							
						case "Art":
							authors[2] += '&nbsp;&nbsp;' + matchauthors[i]['html'].match(authorRegex) + '<br>';
							break;
					}
				}
				
				if (authors[0].length > 0) authorsnew[0] = "<br>&nbsp;<u>Story &amp; Art</u>:<br>" + authors[0];
				if (authors[1].length > 0) authorsnew[1] = "<br>&nbsp;<u>Story</u>:<br>" + authors[1];
				if (authors[2].length > 0) authorsnew[2] = "<br>&nbsp;<u>Art</u>:<br>" + authors[2];
			
				node.append(authorsnew.join(''));
				
				if (url.indexOf("\moreinfo") > 0)
				{
					var node2 = $('#horiznav_nav').next('div[style="padding: 0 7px;"], div[style="padding: 5px 8px;"]');
					node2.html( authorMoreInfo(node2.html()) )
				}
			}
			else
			{
				node.children().html("Author:")
				authors[0] = matchauthors[0]['html'].replace(" (Story &amp; Art)",'');
				if (opt.removeComma === true) authors[0] = authors[0].replace(', ', ' ');
				node.append(' ', authors[0]);
			}
		}
		else if (opt.formatMangaAuthors === 2)
		{
			matchcode = matchcode.replace(/(<a [^>]+>[\u0000-\uFFFF]+?<\/a> \((?:Story|Art|Story &amp; Art)\)),/g,'$1<br>');
			if (opt.removeComma === true) matchcode = matchcode.replace(/, /g, ' ');
			node.html(matchcode);
			node.children().eq(0).after("<br>");
		}
	}
	
/* move edit status box */
	if (opt.moveAddToMyListButton === true && $('#addtolist').length)
	{
		var s = $('#showAddtolist').length
			? $("<h2/>").append($('#showAddtolist').css('display', 'block').removeAttr('class'))
			: $('#addtolist').prev();
		
		$('#profileRows').parent().append('<br />',
			$('<h2 class="mt8">Edit Status</h2>'),
			$('#addtolist'));
		$('div.profileRows.pb0').remove();
	}
	
/* related manga | anime items */
	if (opt.formatRelatedItems === true && mainPage === true)
	{
		node = $('table.anime_detail_related_anime');
		if (node.length)
		{
			mh = $('h2:contains(Related Manga), h2:contains(Related Anime)').html()
				.match(/Related (Manga|Anime)/im);
			var adaptation = (mh[1] == "Manga" ? "Anime" : "Manga") + " adaptation";

			if (mh != null) {
				node[0].innerHTML = node[0].innerHTML
					.replace(/a>, <a/g, "a><br><a")
					.replace(/><\/a>/g, ">(empty relation)</a>")
					.replace("Adaptation", adaptation);
			}
		}
	}

/* format dates */
	if (opt.formatDate === true) 
	{
		node = $('#content td:eq("0") span:contains(Published), #content td:eq("0") span:contains(Aired)').parent();
		var months = {'Jan':1,'Feb':2,'Mar':3,'Apr':4,'May':5,'Jun':6,'Jul':7,'Aug':8,'Sep':9,'Oct':10,'Nov':11,'Dec':12};
		
		if (node.length && !/Not available/.test(node.html()))
		{
			if (url.indexOf("/anime") != -1) node.contents().eq(0).remove();
			
			mh = node.html().replace(/<span[^]+\/span>/, '').trim()
				.replace('to', '-')
				.replace(/([\w]{3})[\s]+([0-9]{1,2}), ([0-9]{4})/g, '$3/$1/$2')
				.replace(/([\w]{3}),? ([0-9]{4})/g, '$2/$1/ ')
				.replace(/([0-9]{1,2}), ([0-9]{4})/g, '$2/ /$1');

			var matchmonths = mh.match(/\/[\w]{3}\//g);

			if (matchmonths != null) {
				for (var n in matchmonths) {
					var matchedmonth = matchmonths[n].replace(/\//g,'');
					mh = mh.replace(matchedmonth, months[matchedmonth]);
			}}
			
			// do other things
			var match_dates = mh.match(/\d{4}\/\d{1,2}\/\d{1,2}|\d{4}\/\d{1,2}\/|\d{4}/g);
			
			if (match_dates != null)
			{
				var split_date, year, month, day, current_year, current_month, current_day, new_date,
					weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
				
				for (var n in match_dates)
				{
					split_date = match_dates[n].split('/');
					if (split_date[1] == undefined) split_date[1] = 0;
					if (split_date[2] == undefined) split_date[2] = 0;

					// add week day to dates
					if (opt.addDateDay === true && split_date[2] > 0)
					{
						var dayday = new Date(split_date[0], split_date[1]-1, split_date[2]);

						mh = mh.replace(
								new RegExp((match_dates.length === 1 || n == 0 ) 
									? "^.*?" + match_dates[n] 
									: match_dates[n] + ".*?$"),
									
								function ($0) {
									if (n == 1 || (n == 0 && match_dates.length === 1) )
										return match_dates[n] + ' <small>(' + weekday[dayday.getDay()] + ')</small>';
									else if (n == 0)
										return '<small>(' + weekday[dayday.getDay()] + ')</small> ' + match_dates[n];
						});
						
						// add break line 
						if (n == 0 && match_dates.length === 2)
							mh = "<br>&nbsp;" + mh;
					}
					
					// check if date is in the future
					if (opt.highlightFutureDate === true)
					{
						// get current GMT date
						var d = new Date().getTime();
						// japan date GMT+9
						var c = new Date(d+9*60*60*1000);
						
						current_year = c.getUTCFullYear();
						current_month = c.getUTCMonth()+1;
						current_month = new String(current_month).length === 1 ? '0' + current_month : current_month;
						current_day = c.getUTCDate();
						current_day = new String(current_day).length === 1 ? '0' + current_day : current_day;
						current_date = new String(current_year) + current_month + current_day;

						// matched date
						year = split_date[0];
						month = split_date[1].length === 1 ? '0' + split_date[1] : split_date[1];
						day = split_date[2].length === 1 ? '0' + split_date[2] : split_date[2];
						date_to_compare = year + month + day;

						// if date is in the future add styling to that date
						if (date_to_compare > current_date)
						{
							new_date = '<span style="color:red;">' + match_dates[n] + '</span>';
							mh = mh.replace(match_dates[n], new_date);
						}
						else if (date_to_compare == current_date)
						{
							new_date = '<span style="font-style: italic;">' + match_dates[n] + '</span>';
							mh = mh.replace(match_dates[n], new_date);
						}
					}

					// change date format
					if (opt.dateFormat > 0)
					{
						var delimiter = (opt.dateFormat > 2) ? '-' : '/';
						var dateFormats = {
								1 : [split_date[2], split_date[1], split_date[0]],	// mm/dd/yyyy
								2 : [split_date[1], split_date[2], split_date[0]],	// dd/mm/yyyy
								3 : [split_date[0], split_date[1], split_date[2]]	// yyyy/mm/dd
							};

						mh = mh.replace(
							match_dates[n],
							dateFormats[([0,1,2,3,1,2,3][opt.dateFormat])]
								.join(delimiter));
					}
				}
				
				// remove end date year if it matches start date year
				if (match_dates.length === 2 && opt.removeEndYear === true)
				{
					var matchyears = mh.match(/[0-9]{4}/g);
					if (matchyears != null
						&& mh.replace(/<small>\([\w]+\)<\/small>/g, "").trim().match(/[0-9]{4}.[0-9]{1,2}.[0-9]{1,2}$/) != null
						&& (matchyears[0] == matchyears[1]))
					{
						var n = mh.lastIndexOf(matchyears[0]);
						mh = mh.substring(0, n) + mh.substring(n+4, mh.length);
					}
				}
			}
			
			node.html(
				node.html().replace(
					node.contents().eq(1).text() , ' ' + mh) );
		}
		
		// other dates: "just added" page
		else if (url.match(/[oacsd%5BqD]+=[09\w]/g) != null)
		{
			// start date column index
			
			changeDates($('#content table td a:contains(Start Date)').parent().index());
			changeDates($('#content table td a:contains(End Date)').parent().index());

			if (opt.autoPager === true)
				$('#content').on('DOMNodeInserted', function (event) {
					if (event.target.nodeName == "TR" || event.target.nodeName == "TABLE")
						changeDates(startDate, event.target);
						
				});
				
/* 			var getUrlVars = getUrlVars();
			if (getUrlVars["q"] !== undefined || getUrlVars["mid"] !== undefined)
			{
				$('#horiznav_nav li a').each(function () {
					if (this.href.indexOf("letter=") !== -1)
					{
						this.href = url.replace(/.letter=[A-Z]/g, "") + "&" + this.href.match("letter=[A-Z]");
					}
				});				
			} */
		}
	}

/* external links */
	if (opt.searchoptions === true)
	{
		var search = {},
			htmlcodecache = document.getElementById('content').getElementsByClassName("borderClass")[0].innerHTML;
			// get and format japanese title
			title = (htmlcodecache.indexOf("Alternative Titles") != -1 && htmlcodecache.indexOf("Japanese") != -1)
				? htmlcodecache.match("Alternative Titles[\u0000-\uFFFF]+Information</h2>")[0]
					.match('Japanese:</span> ([\u0000-\uFFFF]+?)</div>')[1]
						.trim()
						.replace(/[\s]/g, "+")
						.replace(/〈[\u0000-\uFFFF]+?〉/g, "")
				: null,
			// get romanized title
			titleEn = document.title
				.replace(" - MyAnimeList.net", "")
				.replace(/ \| [\w\s-]+$/, "")
				.replace(/ \([\u0000-\uFFFF]+\)$/g, "")
				.replace(/[-:\s]+/g, "+");

		// external links specific to a page - english title
		if (url.match("/anime") !== null) {
			search['anidb'] = $('<a target="_blank" href="https://anidb.net/perl-bin/animedb.pl?adb.search=' + titleEn + '&show=animelist&do.search=search"><i>AniDB</i></a>')[0].outerHTML;
			if (title !== null) {
				search['amazonjp'] = $('<a target="_blank" href="http://www.amazon.co.jp/s/ref=nb_sb_noss?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Ddvd&field-keywords=' + title + '"><i>Amazon.jp</i></a>')[0].outerHTML;
			}
		}
		else if (url.match("/manga") !== null) {
			search['mu'] = $('<a target="_blank" href="https://www.mangaupdates.com/series.html?stype=utf8title&search='+ titleEn + '"><i>MU</i></a>')[0].outerHTML;
			if (title != null) {
				search['amazonjp'] = $('<a target="_blank" href="http://www.amazon.co.jp/s/ref=nb_sb_noss?url=search-alias%3Dstripbooks&field-keywords=' + title + '"><i>Amazon.jp</i></a>')[0].outerHTML;
			}
		}

		// 'japanese' title
		if (title !== null) {
			search['wikijp'] = $('<a target="_blank" href="https://ja.wikipedia.org/w/index.php?search=' + title + '&title=%E7%89%B9%E5%88%A5%3A%E6%A4%9C%E7%B4%A2&go=%E8%A1%A8%E7%A4%BA"><i>Wikipedia.ja</i></a>')[0].outerHTML;
		}
		search['wikien'] = $('<a target="_blank" href="https://en.wikipedia.org/w/index.php?search=' + titleEn + '&title=Special%3ASearch&go=Go"><i>Wikipedia.en</i></a>')[0].outerHTML;

		var node = $('div.js-scrollfix-bottom h2:contains(External Links)').next();
		if (node.length !== 0)
		{
			if (node.find("a[href*='mangaupdates.com']").length) delete search['mu'];
			if (node.find("a[href*='ja.wikipedia']").length) delete search['wikijp'];
			if (node.find("a[href*='en.wikipedia']").length) delete search['wikien'];
			if (node.find("a[href*='animedb']").length) delete search['anidb'];
			
			if (node.find("a[href*='wikipedia']").length) {
				var $wiki = node.find("a[href*='wikipedia']");
				$wiki.html("Wikipedia." + $wiki[0].host.match(/([a-z]{2}(?:\.m)*)\.wikipedia\.org/)[1]);
			}
			
			if (search.toSource() !== "({})")
				node.append("<br/><br/>Additional search: ", Object.keys(search).sort().map(function (key) { return search[key]; }).join(", "));
		}
		else
		{
			if (url.match("/manga") === null) delete search['mu'];
			if (url.match("/anime") === null) delete search['anidb'];
			
			if (search.toSource() !== "({})") {
				node = $('div.js-scrollfix-bottom');
				node.append($("<tr><td id='externalLinks'><br/><h2>External Links</h2>Additional search: </td></tr>"));
				node = $('#externalLinks');

				node.append("" , Object.keys(search).sort().map(function (key) { return search[key]; }).join(", "));
			}
		}
	}
	
/* hide reviews/recs */
	if (opt.hideReviews === true && mainPage === true)
	{
		// reviews
		var reviewsNode = $('#content h2:contains(Reviews)');
		if (reviewsNode.length)
		{
			var review = reviewsNode.next();
			var j = 0, func;
			for (r = 0; r < 4; r++)
			{
				if (review.css("margin-top") === "4px") review.remove();
				if (review.prop("className").match("borderDark") === null) break;
				
				review.addClass("reviews");
				review.css("display", "none");
				review = review.next();
				j++;
				
				if (review.prop("nodeName") === "BR") break;
			}
			
			reviewsNode.contents().eq(1).remove();
			func = '<a style="cursor: pointer; display: block;" onclick="var t=$(\'.reviews\'); if(t.eq(' + (j > 1 ? "0" : "0") + ').css(\'display\')===\'none\') {t.show(200)} else {t.hide(200)};">Reviews (' + (j == 4 ? "4+" : j) + ')</a>'
			reviewsNode.append( (j > 0 ? func : "Reviews (0)"));
			
			// recommendations
/* 			var recNode = $('#content h2:contains(Recommendations)');
			var rec = recNode.next();
			if (rec.prop("nodeName") != "BR")
			{
				i = 0;
				for (r = 0; r < 6; r++)
				{
					if (rec.prop("className") == "spaceit"
						|| rec.prop("nodeName") == "A"
						|| rec.prop("nodeName") == "BR") break;
					
					rec.addClass('recommendations');
					if (r > 0) rec.css("display", "none");
					rec = rec.next();
					i++;
				}
				recNode.contents().eq(2).remove();
				
				if (rec.prop("className") == "spaceit" || rec.prop("nodeName") == "A")
				{
					recNode.contents().eq(1).remove();
					recNode.append('<span class="floatRightHeader">'
						+ '<a href="' + ( rec.children().attr('href') || rec.attr('href') ) + '">Make a recommendation</a>'
						+ ' | '
						+ '<a href="' + reviewsNode.children().children(":eq(1)").attr('href').replace("reviews", "userrecs") + '">More recommendations</a>'
						+ '</span>');
					
					rec.remove();
					if (rec.prop("nodeName") == "A")
					{
						var u = 0;
						recNode.parent().contents().each(function () {
							// remove text node
							if (this.nodeType == 3 && /have been made yet/.test(this.nodeValue)) {
								$(this).remove(); u++;
							}
							// remove text node "!" and the following break line
							else if (u == 1) { $(this).next().remove(); $(this).remove(); u++; }
							// exit
							else if (u > 1) { return false; }
						});
					}
				}
				func = '<a style="cursor: pointer; display: block;" onclick="var t=$(\'.recommendations\'); if(t.eq(' + (i > 1 ? "1" : "0") + ').css(\'display\')===\'none\') {t.show(200)} else {t.hide(200)};">Recommendations (' + (i == 6 ? "6+" : i) + ')</a>'
				recNode.append( (i > 0 ? func : "Recommendations (0)"));
			}
			else
			{
				recNode.contents().eq(2).remove();
				recNode.append("Recommendations (0)");
			}
			// remove more links if there is less than four items
			if (j < 4) reviewsNode.contents(":eq(0)").contents(":eq(2), :eq(1)").remove();
			if (i < 4) recNode.children("div").contents(":eq(2), :eq(1)").remove(); */
		}
	}

/* load more tabs in the background */
	var excludeURLs = RegExp([
		'reviews', 'userrecs', 'stats', 'characters', 'news', 'forum', 'pics', 'pictures', 'favorites', 'moreinfo', 'episode',
		'video',
		'lastusers', 'pic&pid', '\w\=9&', 'sd\=[0-9]'
	].join("|"));

	if (!excludeURLs.test(url))
	{
		/* hide episodes descriptions on anime pages */
		if (opt.hideEpisodes === true)
			$(".episode_list").hide().parent().parent().parent().parent(".boderDark").removeClass(".boderDark");

		var tabs = $("#horiznav_nav");
		
		// load more info tab
		if (opt.loadMoreinfoTab === true)
		{
			var moreinfo = tabs.find("li:contains(More Info)"),
				newRow = $('<div><br><h2>More Info <img width="10" height="10" src="/images/xmlhttp-loader.gif"></h2><div id="moreinfo" style="font-size: 90%; display: '+ (opt.hideMoreinfo===true?'none':'block') +'"></div></div>');
			
			if (moreinfo.length && moreinfo.html().indexOf("moreinfo") !== -1)
			{
				tabs.next().next().find("tr:eq(0)").children().append(newRow);
				
				$.get(moreinfo.children().attr("href"), function (data)
				{
					var matchCode = data.match(/(<td valign="top" style="padding-left: 5px;"[\u0000-\uFFFF]+<\/td>)\s<\/tr>\s<\/table>/im);
					
					if (matchCode != null)
					{
						var moreinfo = $(matchCode[1]);
						moreinfo = removeThemAds(moreinfo);

						//if (matchauthorslenght > 0) moreinfo = authorMoreInfo(moreinfo);
						tabs.after('<div id="more_info" style="padding: ' + opt.newElementsPad + '; display: none;"><tr><td>' + moreinfo.html() + '</div>');
						
						moreinfo.find(".mb8").remove();
						
						newRow.children("div#moreinfo").html(moreinfo.html());
						newRow.children("h2").html('More Info <small style="font-">(<a style="cursor: pointer; vertical-align: initial !important;" onclick="var $this=$(\'#moreinfo\');var _this=$(this);if($this.css(\'display\')==\'none\'){$this.show();_this.html(\'hide\');}else{_this.html(\'show\');$this.hide();}">' + (opt.hideMoreinfo === true ? 'show' : 'hide') +'</a>)</small>');
						
					} else
						alert("Something went wrong.");
				});
			}
		}

		// read number of pictures in a gallery
		if (opt.loadGalleryPicturesCount === true)
		{
			var pictures = tabs.find("li:contains(Pictures)");
			if (pictures.length && pictures.html().indexOf("Pictures") !== -1)
			{
				$.get(pictures.children().attr('href'), function (data)
				{
					var matchCode = data.match(/(<td valign="top" style="padding-left: 5px;">[\u0000-\uFFFF]+?<\/td>)\s<\/tr>\s<\/table>/im);
					
					var totalPics = matchCode[1].match(/images\/(manga|anime)\/[0-9]+\/[0-9]+l/g);
					pictures.children().append(" (" + (totalPics !== null ? totalPics.length : "0") + ")");
					
					matchCode[1] = matchCode[1].replace(/cdn\./g, "");
					var pics = removeThemAds( $(matchCode[1]) ).html();
					
					tabs.after('<div id="pictures" style="padding: '+ opt.newElementsPad +'; display: none;">' + pics + '</div>');
					
					reloadFancybox();
				});
			}
		}
	}
}

// add form validation on add anime page to prevent it from adding ghost entries on the list
else if (url === "https://myanimelist.net/panel.php?go=add")
{
	$('input[value="Add Anime to My List"]').removeAttr("onclick").on("click", function () {return formValidate();});
}

function getUrlVars()
{
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function( m,key,value) {
		vars[key] = value;
	});
	return vars;
}

function changeDates(index, node)
{
	node = node === undefined ? $('#content table').eq(2) : $(node);
	
 	if (index > 0)
	{
 		node.find('td.borderClass:nth-child('+ (index + 1)+')').each(function ()
		{
			// if dates are the same 'merge' cells
			if (this.nextSibling.nodeName === "TD" && this.nextSibling.innerHTML === this.innerHTML) {
				this.nextSibling.style.display = "none";
				this.setAttribute('colspan', '2');
			}
			if (opt.dateFormat === 0) {
				this.innerHTML = this.innerHTML.replace(/(\?|[\d]{2})\-(\?|[\d]{2})\-(\?|[\d]{2})/,  '$3/$1/$2')
				this.nextSibling.innerHTML = this.nextSibling.innerHTML.replace(/(\?|[\d]{2})\-(\?|[\d]{2})\-(\?|[\d]{2})/,  '$3/$1/$2');
			}
		});
	}
}

function authorMoreInfo(node)
{
	if (node.match(/<em>[\u0000-\uFFFF]+?<\/em>/) != null)
	{
		var authors = node.match(/<em>[\u0000-\uFFFF]+?<\/em>/ig);
		var author = [];
		// get authors from more info
		for (i = 0; i < authors.length; i++)
			author.push(authors[i].match(/<em>([\u0000-\uFFFF]+?)(?: \([\u0000-\uFFFF]+\))?<\/em>/i)[1]);
		
		// remove dupes
		author = author
			.sort(function (a, b) {
				return a.length-b.length;
			})
			.filter(function (item, pos, ary) {
				return !pos || item != ary[pos - 1];
		});
		
		// match with left side and replace html
		for (i = 0, L = author.length; i < L; i++)
		{
			matchauthors.some(function (obj) {
				if (obj.author.replace(', ', ' ') === author[i] || obj.author === author[i]) {
					node = node.replace(new RegExp(author[i] + "(?!(?=[\d\w]))", "gi"), function ($0) {

							//if (obj.author == author[i])
					
						return obj.html.match(authorRegex)[0]
					});
					return true;
				}
			});
		}
	}
	return node;
}

function formValidate() {
	var errors = [];

	if (document.getElementById("aSelectedField").innerHTML === "" || document.getElementById("animeid").value === 0)
		errors.push("no anime was selected");
	
	// print msg on screen
	if (errors.length) {
		alert("Encountered error(s):\n\n- " + errors.join(',\n- '));
		return false;
	} else checkValidSubmit(1);
}

function reloadFancybox()
{
	var _path = window.location.pathname.split("/")[1].replace(".php", "");
	$('.'+ _path.charAt(0).toUpperCase() + _path.substr(1) + '_Gallery, .js-picture-gallery').fancybox({'titlePosition' : 'over'});
}

function removeThemAds(_this) {
/* 	_this.find('.border_top, div[style="padding:16px 0px 0px 0px;"], div[style="overflow: hidden; padding: 10px 0; border-bottom: solid #cdcdcd 1px"], .border_bottom[style="padding:8px 0px 8px 0px;margin:0px 0px 8px 0px;"]').remove();
	_this.find('tr>td[colspan="4"]').parent().remove();
	_this.find('div[style="width:728px; height:90px; margin:0 auto"]').parent().remove();
	_this.find('div[style="float: left; padding: 20px 25px 20px 35px;"]').parent().remove(); */
	
	_this.find('div[style="width:728px; margin:0 auto"]').parent().parent().parent().remove();
	_this.find('div[id^="div-gpt-ad-"], ._unit').remove();
	_this.find('.breadcrumb').remove();
	_this.find('#horiznav_nav').remove();
	return _this;
};

})(jQuery);