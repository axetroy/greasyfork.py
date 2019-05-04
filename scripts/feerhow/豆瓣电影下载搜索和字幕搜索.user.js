// ==UserScript==
// @name        豆瓣电影下载搜索和字幕搜索
// @namespace   https://greasyfork.org/zh-CN
// @version     2016.09.21
// @author      feerhow
// @description 在豆瓣电影的影评界面加入多个自己常用的影视下载搜索和字幕搜索链接！
// @include     http://movie.douban.com/subject/*
// @include     https://movie.douban.com/subject/*
// @grant       none
// ==/UserScript==

function
run ()

{
	var movieTitle = $('h1 span:eq(0)').text();
	var title = $('html head title').text();
	var keyword1 = title.replace( '(豆瓣)', '' ).trim();
	var keyword2 = encodeURIComponent( keyword1 );
	var movieSimpleTitle = movieTitle.replace(/第\S+季.*/, "");


	var link = $("<div>").append($("<span>").attr("class", "pl").html("影视下载:"));


	var Movie_links =
	[
		{ html: "BT之家", href: "http://www.btbtt.la/search-index-keyword-" + keyword1 + ".htm" },
		{ html: "片源网", href: "http://pianyuan.net/search?q=" + keyword1 },
		{ html: "高清Mp4吧", href: "http://www.mp4ba.com/search.php?keyword=" + keyword1 },
        { html: "电影FM", href: "http://dianying.fm/search/?text=" + keyword1 },
        { html: "电影小二网", href: "http://s.yfsoso.com/sm.php?q=" + keyword1 },
        { html: "影粉搜搜", href: "http://s.yfsoso.com/s.php?q=" + keyword1 },
        { html: "RARBT", href: "http://www.rarbt.com/index.php/search/index.html?search=" + keyword1 },
        { html: "720P.im", href: "http://720p.im/search.php?q=" + keyword1 },
        { html: "豆瓣皮", href: "http://movie.doubanpi.com/?key=" + keyword1 },
        { html: "飘花资源网", href: " http://so.piaohua.com:8909/plus/search.php?kwtype=0&keyword=" + keyword1 },
        { html: "ED2000", href: "http://www.ed2000.com/FileList.asp?SearchWord=" + keyword1 },
        { html: "很BT电影联盟", href: "http://henbt.com/search.php?keyword=" + keyword1 },
        { html: "我飞网", href: "http://www.9kkz.com/search.php?keyword=" + keyword1 },
        { html: "97电影网", href: "http://www.id97.com/search/name/" + keyword1 },
        { html: "龙部落", href: "http://www.lbldy.com/search/" + keyword1 },
        { html: "小兵播放", href: "http://www.xbplay.com/query/" + keyword1 },
        { html: "电影之家", href: "http://hd.ccav1.com/?s=" + keyword1 },
        { html: "BT天堂吧", href: "http://www.bttt8.com/?s=" + keyword1 },
        { html: "电影天堂", href: "http://zhannei.baidu.com/cse/search?&s=4523418779164925033&q=" + keyword1 },
        { html: "嘎嘎影视", href: "http://www.gagays.com/movie/search?req%5Bkw%5D=" + keyword1 },
        { html: "高清控联盟", href: "http://www.gaoqingkong.com/?s=" + keyword1 },


	];

	switch(location.host)
	{
		case "movie.douban.com":
			appendLinks(Movie_links, link);

			link.append('<br>')
				.append('<span class="pl">字幕下载:</span>')
				.append($("<a>").attr({href: "http://www.zimuku.net/search?q=" + keyword1,target: "_blank"}).html("字幕库"))
				.append('<span class="pl"> / </span>')
				.append($("<a>").attr({href: "http://subhd.com/search/" + keyword1,target: "_blank"}).html("Sub HD字幕站"))
				.append('<span class="pl"> / </span>')
				.append($("<a>").attr({href: "http://assrt.net/sub/?searchword=" + keyword1,target: "_blank"}).html("射手网(伪)"))
				.append('<span class="pl"> / </span>')
                .append($("<a>").attr({href: "http://zhannei.baidu.com/cse/search?click=1&s=8073048380622477318&nsid=&q=" + keyword1,target: "_blank"}).html("第三楼字幕网"))
				.append('<span class="pl"> / </span>')
                .append($("<a>").attr({href: "http://www.zimuzu.tv/search/index?search_type=&keyword=" + keyword1,target: "_blank"}).html("人人影视"))
				.append('<span class="pl"> / </span>')
				.append($("<a>").attr({href: "http://www.163sub.com/Search?id=" + keyword1,target: "_blank"}).html("163字幕网"));
		break;

	}

	$('#info').append(link);


	function appendLinks(items, appendTo)
	{items.forEach
		(function(item, i)
		    {$("<a>")
				.html(item.html)
				.attr({href: item.href,target: "_blank"})
				.appendTo(appendTo);
			 if(i != items.length -1)
			 {appendTo.append(" / ");}
		    }
		);
	}
}

run();