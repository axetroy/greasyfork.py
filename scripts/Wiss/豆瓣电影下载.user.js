// ==UserScript==
// name            Douban Download Search
// @namespace      https://github.com/ywzhaiqi
// @description    增加豆瓣电影、图书的下载搜索链接
// author          ywzhaiqi
// version         1.1
// @include        http*://movie.douban.com/subject/*
// @include        http*://book.douban.com/subject/*
// @grunt          none

// @name           豆瓣电影下载
// @author         Wiss
// @version        1.7
// @icon           https://img3.doubanio.com/f/movie/d59b2715fdea4968a450ee5f6c95c7d7a2030065/pics/movie/apple-touch-icon.png
// @note           2019.1.24 v1.2 更新电影下载来源
// @note           2019.1.25 v1.3 增加在线看剧
// @note           2019.1.27 v1.4 修改图书下载，应该不会再增加来源
// @note           2019.1.27 v1.5 错漏修正
// @note           2019.2.19 v1.6 更新资源
// @note           2019.3.5 v1.7 更新资源

// 我不会代码，只是代码搬动工，别问我XX是什么意思
// ==/UserScript==


function run () {
    var movieTitle = $('h1 span:eq(0)').text();
    var title = $('html head title').text();
    var keyword1 = title.replace( '(豆瓣)', '' ).trim();
    var keyword2 = encodeURIComponent( keyword1 );
    var movieSimpleTitle = movieTitle.replace(/第\S+季.*/, "");

    var Movie_links = [
        { html: "MAG磁力站", href: "http://oabt004.com/index?k=" + movieSimpleTitle },
        { html: "天天看美剧", href: "http://www.msj1.com/?s=" + keyword1 },
        { html: "天天美剧", href: "http://www.ttmeiju.vip/index.php/search/index.html?keyword=" + keyword1 + "&range=0" },
        { html: "蓝光网", href: "http://www.languang.co/?s=" + keyword1 },
        { html: "音范丝", href: "http://www.yinfans.com/?s=" + keyword1 },
        { html: "ACG狗狗", href: "http://bt.acg.gg/search.php?keyword=" + keyword1 },
        { html: "高清电台", href: "https://gaoqing.fm/s.php?q=" + keyword1 },
        { html: "电影工厂", href: "https://www.dygc.org/?s=" + keyword1 },
        { html: "迅雷电影天堂", href: "https://www.xl720.com/?s=" + keyword1 },
        { html: "Google", href: "https://www.google.com/search?ie=UTF-8&q=" + keyword1 + " 1080p" },
    ];

    var Subtitle_links = [
        { html: "字幕库", href: "https://www.zimuku.cn/search?q=" + keyword1 },
        { html: "SubHD", href: "http://subhd.com/search0/" + movieSimpleTitle },
        { html: "字幕组", href: "http://www.zimuzu.io/search?keyword=" + movieSimpleTitle },
        { html: "伪·射手网", href: "https://secure.assrt.net/sub/?searchword=" + movieSimpleTitle },
    ];

    var Online_links = [
        { html: "Neets追剧管家", href: "https://neets.cc/search?key=" + keyword1 },
        { html: "AGMJ阿哥美剧", href: "http://www.btzx2017.com/search/kw/" + keyword1 },
        { html: "楓林網", href: "http://8maple.ru/搜尋結果/?q=" + keyword1 },
    ];

    var Book_links = [
        { html: "Google", href: "https://www.google.com/search?ie=UTF-8&q=" + movieTitle + " 电子书下载" },
        { html: "周读", href: "http://www.ireadweek.com/index.php/Index/bookList.html?keyword=" + movieTitle },
    ];

    var link = $("<div>").append(
        $("<span>").attr("class", "pl").html("下载链接: ")
    );

    var Sublink = $("<div>").append(
        $("<span>").attr("class", "pl").html("字幕链接: ")
    );

    var Online = $("<div>").append(
        $("<span>").attr("class", "pl").html("在线观看: ")
    );

    var Blink = $("<div>").append(
        $("<span>").attr("class", "pl").html("下载链接: ")
    );

    switch(location.host){
        case "movie.douban.com":
            appendLinks(Movie_links, link)
            appendLinks(Subtitle_links, Sublink)
            appendLinks(Online_links, Online)


            $('#info').append(link);
            $('#info').append(Sublink);
            $('#info').append(Online);
            break;
        case "book.douban.com":
            appendLinks(Book_links, Blink)

            $('#info').append(Blink);
            break;
    }



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