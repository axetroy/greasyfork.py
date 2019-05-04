// ==UserScript==
// @id           hua5220@live.com	
// @name         豆瓣电影 资源直接搜索下载[搜狗专用维护版]
// @namespace    hua5220
// @version      2018.04.03.1
// @description  在豆瓣电影的影评界面的右上角加入多个自己常用的电影资源下载搜索站和字幕搜索！
// @author       hua5220
// @match        https://movie.douban.com/subject/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// ==/UserScript==

/**
 * Updated by c wt U r on 2016/12/28.
 * QQ 872673322
 *
 */

function getDoc(url, callback) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        headers: {
            'User-agent': window.navigator.userAgent,
            'Content-type': null
        },
        onload: function (responseDetail) {
            var doc = '';
            if (responseDetail.status == 200) {
                // For Firefox, Chrome 30+ Supported
                doc = new DOMParser().parseFromString(responseDetail.responseText, 'text/html');
                if (doc === undefined) {
                    doc = document.implementation.createHTMLDocument("");
                    doc.querySelector('html').innerHTML = responseText;
                }
            }
            callback(doc, responseDetail.finalUrl);
        }
    });
}
function postDoc(url, callback, data) {
    GM_xmlhttpRequest({
        anonymous: true,
        method: 'POST',
        url: url,
        headers: {
            'User-agent': window.navigator.userAgent,
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
        onload: function (responseDetail) {
            callback(responseDetail.responseText, responseDetail.finalUrl);
        }
    });
}

function ad() {
    var strCSS = "";
    strCSS += "#dale_movie_subject_top_right,";
    strCSS += "#dale_movie_subject_top_midle,";
    strCSS += "#content div.qrcode-app,";
    strCSS += "#content div.ticket";
    strCSS += "{display:none}";

    document.head.appendChild(document.createElement("style")).textContent = strCSS;
}
ad();

var movieTitle = $("#content > h1 > span")[0].textContent.split(" ")[0];

function imdb() {
    imdb = $("div#info a[href^='http://www.imdb.com/title/tt']");
    imdbS = imdb.text();
    if (imdbS && imdbS.startsWith('tt')) {
        imdbS = imdbS.slice(2);

        kickass();
    }
}
function kickass() {
    var noAdcancedSearch = true;
    var kickass = "https://kat.al/";

    if  (noAdcancedSearch){
        kickass = $("<a href=\"" + kickass +"\" target=\"_blank\" rel=\"nofollow\" style=\"margin-left: 6px;\">kickass</a>");
        imdb.after(kickass);
    }else{
        kickass = $("<a href=\"" + kickass + "usearch/imdb:" + imdbS + "/\" target=\"_blank\" rel=\"nofollow\" style=\"margin-left: 6px;\">kickass</a>");
        imdb.after(kickass);
    }

}
imdb();

function part_sites() {
    var str = "";
    str += ".sites {";
    str += "    margin-bottom:80px;";
    str += "    background: #F0F3F5;";
    str += "}";
    str += ".sites-body {";
    str += "    line-height:24px;";
    str += "    letter-spacing:-0.31em;";
    str += "    *letter-spacing:normal;";
    str += "}";
    str += ".sites-body a {";
    str += "    display:inline-block;";
    str += "    *display:inline;";
    str += "    letter-spacing:normal;";
    str += "    margin:0 8px 8px 0;";
    str += "    padding:0 8px;";
    str += "    background-color:#f5f5f5;";
    str += "    -webkit-border-radius:2px;";
    str += "       -moz-border-radius:2px;";
    str += "            border-radius:2px;";
    str += "}";
    str += "";
    str += ".sites-body a:link,";
    str += ".sites-body a:visited {";
    str += "    background-color:#f5f5f5;";
    str += "    color: #37A;";
    str += "}";
    str += "";
    str += ".sites-body a:hover,";
    str += ".sites-body a:active {";
    str += "    background-color: #e8e8e8;";
    str += "    color: #37A;";
    str += "}";
    str += ".sites-body a.sites_r0 {";
    str += "    text-decoration: line-through;";
    str += "}";

    document.head.appendChild(document.createElement("style")).textContent = str;


    // add the sites part
    str = "";
    str += "<div class=\"sites\">     ";
    str += "    <h2>";
    str += "        <i class=\"\">电影站点</i>";
    str += "              · · · · · ·";
    str += "    </h2>";
    str += "        <div class=\"sites-body\">";
    str += "        </div>";
    str += "    </div>";

    var sites = $(str);
    $("#content div.tags").before(sites);
}
part_sites();
var sites = [];
function add_sitelink(link, title, text) {
    if (!text){
        text = title;
    }
    if (title) {
        // title += " (*)";
    } else {
        return;
    }

    link = $("<a href=\"" + link + "\" class=\"\" target=\"_blank\" rel=\"nofollow\" title=\"" + title + "\">" + text + "</a>");
    link = $("#content div.sites-body").append(link);
    link = link.children();
    link = link[link.length -1];
    sites.push(link);

}
add_sitelink("http://www.dysfz.cc/key/" + movieTitle+"/", "电影首发站");
add_sitelink("http://www.gscq.me/search-" + movieTitle+".htm", "乐赏");
add_sitelink("http://www.yinfans.com/?s=" + movieTitle, "音范丝蓝光");
add_sitelink("http://gaoqing.la/?s=" + movieTitle, "中国高清网");
add_sitelink("http://www.gaoqingkong.com/?s=" + movieTitle, "高清联盟控");
add_sitelink("http://www.bttt.la/s.php?q=" + movieTitle+"&sitesearch=www.bttt.la&domains=bttt.la&hl=zh-CN&ie=UTF-8&oe=UTF-8", "BT天堂");
add_sitelink("http://www.btba.com.cn/search?keyword=" + movieTitle, "BT吧");
add_sitelink("http://www.52movieba.com/?s=" + movieTitle, "MP4ba伪");
add_sitelink("http://zhannei.baidu.com/cse/search?q=" + movieTitle+"&s=4523418779164925033", "电影天堂BT");
add_sitelink("http://www.languang.co/?s=" + movieTitle, "蓝光资源网");
add_sitelink("https://moviejie.net/search/q_" + movieTitle, "电影街");
add_sitelink("http://pianyuan.net/search?q=" + movieTitle, "片源网");
add_sitelink("http://www.lbldy.com/search/" + movieTitle, "龙部落");
add_sitelink("http://www.btdx8.com/?s=" + movieTitle, "比特大雄");
add_sitelink("http://www.rarbt.com/index.php/search/index.html?search=" + movieTitle, "RARBT");
add_sitelink("http://oabt004.com/index?topic_title3=" + movieTitle, "CILI001");
add_sitelink("http://www.gagays.xyz/movie/search?req%5Bkw%5D=" + movieTitle, "哇呱影视");
add_sitelink("http://ttmeiju.vip/index.php/search/index.html?keyword=" + movieTitle+"&range=0", "天天美剧");
add_sitelink("http://www.bd-film.co/search.jspx?q=" + movieTitle+"&ie=utf-8&channelId=", "BD影视");
add_sitelink("http://zhannei.baidu.com/cse/search?q=" + movieTitle+"&click=1&s=10886843873236087874&nsid=", "深影论坛");

function part_netdisk() {
    var str = "";
    str += ".netdiskLinks {";
    str += "    margin-bottom:30px;";
    str += "    background: #F0F3F5;";
    str += "}";
    str += ".netdiskLinks-body {";
    str += "    line-height:24px;";
    str += "    letter-spacing:-0.31em;";
    str += "    *letter-spacing:normal;";
    str += "}";
    str += ".netdiskLinks-body a {";
    str += "    display:inline-block;";
    str += "    *display:inline;";
    str += "    letter-spacing:normal;";
    str += "    margin:0 8px 8px 0;";
    str += "    padding:0 8px;";
    str += "    background-color:#f5f5f5;";
    str += "    -webkit-border-radius:2px;";
    str += "       -moz-border-radius:2px;";
    str += "            border-radius:2px;";
    str += "}";
    str += "";
    str += ".netdiskLinks-body a:link,";
    str += ".netdiskLinks-body a:visited {";
    str += "    background-color:#f5f5f5;";
    str += "    color: #37A;";
    str += "}";
    str += "";
    str += ".netdiskLinks-body a:hover,";
    str += ".netdiskLinks-body a:active {";
    str += "    background-color: #e8e8e8;";
    str += "    color: #37A;";
    str += "}";

    document.head.appendChild(document.createElement("style")).textContent = str;


    // add the netdiskLinks part
    str = "";
    str += "<div class=\"netdiskLinks\">     ";
    str += "    <h2>";
    str += "        <i class=\"\">字幕搜索</i>";
    str += "              · · · · · ·";
    str += "    </h2>";
    str += "        <div class=\"netdiskLinks-body\">";
    str += "        </div>";
    str += "    </div>";

    var netdiskLinks = $(str);
    $("#content div.tags").before(netdiskLinks);

}
part_netdisk();
function add_netdisklink(link, title, text) {
    if (!title) {
        title = "百度网盘";
    }
    if (!text) {
        text = "加密分享";
    }
    link = $("<a href=\" " + link + " \" class=\"\" target=\"_blank\" rel=\"nofollow\" title=\"" + title + "\">"+ text +"</a>");
    $("#content div.netdiskLinks-body").append(link);
}

add_netdisklink("http://www.zimuzu.tv/search/index?keyword=" + movieTitle, "zimuzu.tv", "字幕组");
add_netdisklink("http://www.zimuku.cn/search?q=" + movieTitle, "zimuku.net", "字幕库");
add_netdisklink("http://subhd.com/search/" + movieTitle, "subhd.com", "sub HD");
add_netdisklink("http://www.subom.net/search/" + movieTitle, "subom.net", "sub OM");
add_netdisklink("http://assrt.net/sub/?searchword=" + movieTitle, "assrt.net", "射手伪");
add_netdisklink("http://www.163sub.com/Search?id=" + movieTitle, "163sub.com", "163字幕网");
add_netdisklink("http://zhannei.baidu.com/cse/search?click=1&s=8073048380622477318&nsid=&q=" + movieTitle, "disanlou.org", "第三楼字幕网");
add_netdisklink("http://dbfansub.com/?s=" + movieTitle, "dbfansub.com", "电波字幕组");
add_netdisklink("https://fantopia.club/?s=" + movieTitle, "fantopia.club", "翻托邦字幕组");

function parse_netdisklink(sdoc) {
    var re = /(pan.baidu.com\/s\/[a-zA-Z0-9]+)\s*.+\s*([0-9a-zA-Z]{4})/g;
    var m;
    while ((m = re.exec(sdoc)) !== null) {
        if (m.index === re.lastIndex) {
            re.lastIndex++;
        }
        var u = "http://" + m[1] + "#" + m[2];

        add_netdisklink(u, "");
    }
}

function part_customizeSearch() {
    var str = "";
    str += ".customizeSearch {";
    str += "    margin-bottom:30px;";
    str += "    background: #F0F3F5;";
    str += "}";
    str += ".customizeSearch-body {";
    str += "    line-height:24px;";
    str += "    letter-spacing:-0.31em;";
    str += "    *letter-spacing:normal;";
    str += "}";
    str += ".customizeSearch-body a {";
    str += "    display:inline-block;";
    str += "    *display:inline;";
    str += "    letter-spacing:normal;";
    str += "    margin:0 8px 8px 0;";
    str += "    padding:0 8px;";
    str += "    background-color:#f5f5f5;";
    str += "    -webkit-border-radius:2px;";
    str += "       -moz-border-radius:2px;";
    str += "            border-radius:2px;";
    str += "}";
    str += "";
    str += ".customizeSearch-body a:link,";
    str += ".customizeSearch-body a:visited {";
    str += "    background-color:#f5f5f5;";
    str += "    color: #37A;";
    str += "}";
    str += "";
    str += ".customizeSearch-body a:hover,";
    str += ".customizeSearch-body a:active {";
    str += "    background-color: #e8e8e8;";
    str += "    color: #37A;";
    str += "}";

    document.head.appendChild(document.createElement("style")).textContent = str;


    // add the netdiskLinks part
    str = "";
    str += "<div class=\"customizeSearch\">     ";
    str += "    <h2>";
    str += "        <i class=\"\">自定义搜索</i>";
    str += "              · · · · · ·";
    str += "    </h2>";
    str += "        <div class=\"customizeSearch-body\">";
    str += "        </div>";
    str += "    </div>";

    var customizeSearch = $(str);
    $("#content div.tags").before(customizeSearch);

}
part_customizeSearch();
function add_customizeSearch(link, title, text) {
    if (!title) {
        title = "自定义搜索";
    }
    if (!text) {
        text = "自定义搜索";
    }
    link = $("<a href=\" " + link + " \" class=\"\" target=\"_blank\" rel=\"nofollow\" title=\"" + title + "\">"+ text +"</a>");
    $("#content div.customizeSearch-body").append(link);
}
add_customizeSearch("http://www.bing.com/search?q=site:pan.baidu.com " + movieTitle, "必应搜百度网盘 site:pan.baidu.com", "必应搜百度网盘");
add_customizeSearch("https://www.baidu.com/s?wd=" + movieTitle + " rip BD", "百度 rip BD", "百度 BD");