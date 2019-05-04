// ==UserScript==
// @name           Douban Download Search（支持https）
// @namespace      https://github.com/ywzhaiqi
// @description    增加豆瓣电影、图书的下载搜索链接 (2017/10/03更新，添加人人影视字幕组、字幕库、灵极客、library genesis等站点支持)
// @author         peter(原作者ywzhaiqi）
// @version        1.3.9
// @include        *//movie.douban.com/subject/*
// @include        *//book.douban.com/subject/*
// @grunt          none
// ==/UserScript==

function run () {
	var movieTitle = $('h1 span:eq(0)').text();
	var title = $('html head title').text();
	var keyword1 = title.replace( '(豆瓣)', '' ).trim();
	var keyword2 = encodeURIComponent( keyword1 );
	var movieSimpleTitle = movieTitle.replace(/第\S+季.*/, "");

	var Movie_links = [
		// { html: "百度盘", href: "http://www.baidu.com/s?wd=" + encodeURIComponent(keyword1 + " site:pan.baidu.com")},
		{ html: "百度盘", href: "http://pansou.com/?q=" + keyword1},
		{ html: "bt", href: "https://duckduckgo.com/?q=" + keyword1 + " torrent"},
		{ html: "ed2k", href: "https://duckduckgo.com/?q="+keyword1+" ed2k"},
		{ html: "zimuzu", href: "http://www.zimuzu.tv/search/index?keyword=" + movieSimpleTitle },
		{ html: "Lingjike", href: "https://www.google.com/search?q=site%3Alingjike.com#q=" + keyword1 + " site:lingjike.com" },
		{ html: "天天美剧", href: "http://www.ttmeiju.com/index.php/search/index.html?keyword=" + keyword1 },
		{ html: "Torrent Project", href: "http://torrentproject.com/?&btnG=Torrent+Search&num=20&start=0&s=" + keyword2 },
		{ html: "MiniMP4", href: "http://www.minimp4.com/search?q=" + movieTitle }
	];

	var Book_links = [
		{ html: "百度盘", href: "http://pansou.com/?q=" + keyword1},
		{ html: "微盘", href: "https://duckduckgo.com/?q=" + keyword1 + " site%3Avdisk.weibo.com&ia=web"},
		{ html: "mLook", href: "http://www.mlook.mobi/search?q=" + keyword2 },
		{ html: "VeryCD", href: "http://www.verycd.com/search/folders/" + keyword2 },
		{ html: "library genesis", href: "http://gen.lib.rus.ec/search.php?req=" + keyword1 + "&lg_topic=libgen&open=0&view=simple&res=25&phrase=1&column=def"},
		{ html: "Torrent Project", href: "http://torrentproject.com/?&btnG=Torrent+Search&num=20&start=0&s=" + keyword2 },
		{ html: "Duckduckgo", href: "https://duckduckgo.com/?q=" + movieTitle+" filetype:pdf" },
	];

	var link = $("<div>").append(
		$("<span>").attr("class", "pl").html("下载链接:")
	);

	switch(location.host){
		case "movie.douban.com":
			appendLinks(Movie_links, link)

			link.append('<br>')
				.append('<span class="pl">字幕链接:</span>')
				.append(
					$("<a>").attr({
						href: "http://www.zimuku.net/search?ad=1&q=" + movieTitle,
						target: "_blank"
					}).html("字幕库")
				);

			break;
		case "book.douban.com":
			appendLinks(Book_links, link)
			break;
	}

	$('#info').append(link);


	function appendLinks(items, appendTo){
		items.forEach(function(item, i){
			$("<a>")
				.html(item.html)
				.attr({
					href: item.href,
					target: "_blank"
				})
				.appendTo(appendTo);

			if(i != items.length -1){
				appendTo.append(" / ");
			}
		});
	}
}

run()