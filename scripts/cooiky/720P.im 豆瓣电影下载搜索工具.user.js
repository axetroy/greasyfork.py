// ==UserScript==
// @name           720P.im 豆瓣电影下载搜索工具
// @namespace      http://720p.im
// @description    增加豆瓣电影的下载搜索链接
// @author         720p.im
// @version        1.0
// @include        http://movie.douban.com/subject/*
// @grunt          none
// ==/UserScript==

function run () {
    var title = $('html head title').text();
    title = title.replace( '(豆瓣)', '' ).trim();
    title = encodeURIComponent(title);

    var Movie_links = [
        {html: "720P.im", href: "http://720p.im/search.php?q=" + title},
        {html: "人人影视", href: "http://www.yayaxz.com/search/" + title}
    ];

    var link = $("<div>").attr("class", "gray_ad");
    link.append('<h2>下载链接:· · · · · ·</h2>');
    
    appendLinks(Movie_links, link);

    $('.aside').prepend(link);
    
    function appendLinks(items, appendTo) {
        items.forEach(function(item, i) {
            $("<a>")
            .html(item.html)
            .attr({
                href: item.href,
		target: "_blank"
	    })
	    .appendTo(appendTo);

	    if (i != items.length - 1) {
	        appendTo.append("<br />");
	    }
	});
    }
}

run()