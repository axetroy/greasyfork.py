// ==UserScript==
// @name            douban_shenzhenLib
// @name:zh-CN      深圳图书馆图书信息豆瓣脚本
// @namespace       http://www.douban.com/note/180166013/
// @description     Show book available info in douban book page, show book's douban score in Shenzhen Library book page
// @description:zh-cn  为豆瓣书籍页面(book.douban.com)添加书籍在深圳图书馆的信息，预借链接，为深圳图书馆书籍信息页面添加书籍在豆瓣的评分，链接
// @license         MIT License
// @supportURL      http://www.douban.com/note/180166013/
// @version         1.24.10
// @require         http://code.jquery.com/jquery-1.4.4.min.js
// @include         http://book.douban.com/*
// @include         https://book.douban.com/*
// @include         https://www.douban.com/doulist/*
// @include         https://www.szlib.org.cn/Search/searchdetail.jsp*
// @include         https://www.szlib.org.cn/Search/searchshow.jsp*
// @include         http://opac.nslib.cn/Search/searchdetail.jsp*
// @include         http://opac.nslib.cn/Search/searchshow.jsp*
// @include         https://www.szln.gov.cn/Search/searchdetail.jsp*
// @include         https://www.szln.gov.cn/Search/searchshow.jsp*
// @include         http://218.17.147.50/Search/searchdetail.jsp*
// @include         http://218.17.147.50/Search/searchshow.jsp*
// @grant           GM_addStyle
// @grant           GM_xmlhttpRequest
// @grant           GM_registerMenuCommand
// @grant           GM_getValue
// @grant           GM_setValue
// @author          morningSky
// @refer           books_recommend_THU, bean vine (49911) and others...
// @updateDate      2019-03-25
/* @reason
1. 深圳图书馆查询url变更, sortfield=ptitle
2. 减少加载时间：缓存图书的索书号，是否有多本，可预借，可快递。在馆信息还是需要查询图书馆网站
3. 豆瓣api只对企业开放，个人用户不提供key，修改为在html中解析isbn10

Firefox Greasemonkey v4.0及之后版本修改了API，这个脚本失效了；请用tampermonkey插件，需要再次安装这个脚本。
争取找时间修改脚本，使其适用于新版的Greasemonkey插件————可能tampermonkey插件后续也会修改API，导致脚本失效。
@end*/
//
// ==/UserScript==

/*
 * opac.nslib.cn 南山，szln.gov.cn 盐田，218.17.147.50 龙岗
 */

var fDebug = false;
var title, isbn, isbn10;

var SZLIB_HOST = 'https://www.szlib.org.cn/';
var LIBOPAC_URL = SZLIB_HOST + 'Search/searchshow.jsp?v_tablearray=bibliosm,serbibm,apabibibm,mmbibm,&v_book=on&sortfield=ptitle&sorttype=desc&pageNum=10';

// 查询索书号
var LIBOPAC_URL_CALLNO = SZLIB_HOST + 'Search/getpreholding.jsp?v_curtable=bibliosm&v_recno=';
var LIBBOOK_URL = SZLIB_HOST + 'Search/searchdetail.jsp?v_tablearray=bibliosm&v_curtable=bibliosm&site=null&v_recno=';
var LIBQRYRESERVABLE_URL = SZLIB_HOST + 'Search/getpreLoan.jsp?';
var LIBRESERVE_URL = SZLIB_HOST + 'MyLibrary/Reader-Access.jsp?destPage=ReserveSubmit.jsp&v_tablearray=bibliosm&v_TableName=80000002&v_recno=';
var LIB_EXPRESS_URL = SZLIB_HOST + 'MyLibrary/Reader-Access.jsp?destPage=/Search/searchshow.jsp?v_index=isbn&v_tablearray=bibliosm,&sorttype=desc&sortfield=ptitle&v_value=';

var HTML_LOADING = '<font color="grey">正在查询图书馆馆藏情况&nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;· </font>';
var LIBSEARCH_LINK_PRE = '<a title="点击前往图书馆搜索" target="_blank" ';
var LIBSEARCH_LINK_SUF = '在深圳图书馆搜索</a>';


//if(typeof isChromeExtension == 'undefined'){
//	init();
//}else{
//	function onReadyGM(){
//		init();
//	};
//};



// main body of the script

function isEmptyStr(vStr) {
	return vStr == null || vStr.length == 0 || /^\s*$/.test(vStr);
}

function getLibIsbnUrl(vIsbn) {
    return LIBOPAC_URL + '&v_index=isbn&v_value=' + vIsbn;
}

function getLibTitleUrl(vTitle) {
    return LIBOPAC_URL + '&v_index=title&v_value=' + encodeURIComponent(vTitle);
}

function getDoubanSearchUrl(keyword) {
    return 'http://book.douban.com/subject_search?cat=1001&cat=&search_text=' + encodeURIComponent(keyword);
}

function getDoubanSearchLink(keyword) {
    return '<a target="_blank" href="' + getDoubanSearchUrl(keyword) + '" title="点击前往豆瓣查询这本书">在豆瓣搜索</a>';
}

function getLibHeadHtml() {
    var htmlStr = '<ul>';
    // http://www.szln.gov.cn/lib/library.do  
    /*htmlStr += '<li><a style="float:right" target="_blank"  href="http://www.szlib.gov.cn">深圳图书馆</a></li>';*/
    //<span class="membArrow">&nbsp;</span>
    htmlStr += '<li><div class="libMem">';
    htmlStr += '<a class="libMemLink" href="#more" >成员馆</a>';
    htmlStr += '<ul class="libMemMenu">';
    htmlStr += '<li><a href="http://www.szlib.org.cn" target="_blank" title="深圳图书馆">深圳图书馆</a></li>';
    htmlStr += '<li><a href="http://www.szclib.org.cn/" target="_blank" title="深圳少年儿童图书馆">少年儿童图书馆</a></li>';
    htmlStr += '<li><a href="http://lib.utsz.edu.cn/" target="_blank" title="深圳市科技图书馆">科技图书馆</a></li>';
    htmlStr += '<li><a href="http://www.szlhlib.com.cn/" target="_blank" title="深圳市罗湖区图书馆">罗湖区图书馆</a></li>';
    htmlStr += '<li><a href="http://www.szftlib.com.cn/" target="_blank" title="深圳市福田区图书馆">福田区图书馆</a></li>';
    htmlStr += '<li><a href="http://www.sznslib.com.cn" target="_blank" title="深圳市南山区图书馆">南山区图书馆</a></li>';
    htmlStr += '<li><a href="http://www.szytlib.cn/" target="_blank" title="深圳市盐田区图书馆">盐田区图书馆</a></li>';
    htmlStr += '<li><a href="http://www.balib.com.cn" target="_blank" title="深圳市宝安区图书馆">宝安区图书馆</a></li>';
    htmlStr += '<li><a href="http://www.szlglib.com.cn/" target="_blank" title="深圳市龙岗图书馆">龙岗图书馆</a></li>';
    htmlStr += '</ul></div></li>'; 
    htmlStr += '<li><h2>在深圳图书馆借阅  ·  ·  ·  ·  ·  · </h2></li>';
    htmlStr += '</ul>';
    
    return htmlStr;
}

function setLibMemberStyle() {
    GM_addStyle('\
        #libInfo {\
            overflow: visible;\
        }\
        .libMem {\
            z-index: 97;\
            position: relative;\
            float: right;\
        }\
        .libMemMenu {\
            position: absolute;\
            top: -5px;\
            left: 0px;\
            visibility: hidden;\
        }\
        .libMem a {\
            -moz-border-radius: 7px;\
            -webkit-border-radius: 7px;\
            border-radius: 7px;\
            display: block;\
            background: #f6f6f1;\
            padding: 5px;\
            width: 90px;\
            line-height: 160%;\
            border: 1px solid #fff;\
        }\
        .libMem a:hover {\
            background: #FFF;\
            border: 1px solid #aaa;\
            color: #000;\
        }\
        .libMem:hover .libMemMenu {\
            visibility: visible;\
        }\
        .libMem .libMemLink {\
            border: 1px solid #aaa;\
            line-height: 100%;\
            width: 90px;\
        }\
    ');
}

// getpreLoan.jsp?tableList=bibliosm,bibliosm,bibliosm,&metaidList=934991,1209378,698561,
function getReservableQryUrl(bookRecNos) {
    var qryParam = 'tableList=';
    for (var i = 0; i < bookRecNos.length; i++) {
        qryParam += 'bibliosm,';
    }
    // array.toString: arr[0],arr[1],...
    qryParam += '&metaidList=' + bookRecNos + ',';
    if (fDebug)  console.log('Reservable qryUrl: ' + LIBQRYRESERVABLE_URL + qryParam);
    return LIBQRYRESERVABLE_URL + qryParam;
}

/*
 * Append the book link, search link, preserve link, call no with location info
 *
 * @param bookRecNos is an Array
 * The reservable query return a xml: 
 * <root><preloan no='0'>true</preloan><preloan no='1'>false</preloan></root>
 */
function appendLibBookInfo(bookRecNos) {
    if (bookRecNos == null || bookRecNos.length == 0)
        return ;
    
    var fMore = (bookRecNos.length > 1);
    var bookRecNo = bookRecNos[0];// set the first book as default
    var reservableQry_url = getReservableQryUrl(bookRecNos);
    
    GM_xmlhttpRequest({
        method: 'GET',
        url: reservableQry_url,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            "Accept": "text/xml" 
        },
        onload: function(res) {
            // the reservable query return is a xml document
            var fHasReservable = false;
            
            if (fDebug)  console.log('preloan xml: ' + res.responseText);
            var xmldata = new DOMParser().parseFromString(res.responseText, "text/xml");
            
            if (fDebug)  console.log('preloan xml: ' + xmldata);
            var preloans = xmldata.getElementsByTagName('preloan');
            for (var i = 0; i < preloans.length;i++) {
                if (fDebug)  console.log('preloan : ' + i + ',  ' + preloans[i].childNodes[0].nodeValue);
                if (preloans[i].childNodes[0].nodeValue == 'true') {
                    bookRecNo = bookRecNos[i];
                    fHasReservable  = true;
                    break;
                }
            }

            var fHasExpress = false;
            var exps = xmldata.getElementsByTagName('express');
            for (var j = 0; j < exps.length; j++) {
                if (exps[j].childNodes[0].nodeValue == 'true') {
                    fHasExpress = true;
                    break;
                }
            }

            var cacheInfo = '{"bookRecNo":"' + bookRecNo + '", "hasMore":"'+ fMore + '", "reservable":"' + fHasReservable + '", "expressable":"' + fHasExpress + '"}';
            GM_setValue(isbn, cacheInfo);
            appendLibBookHtml(bookRecNo, fMore, fHasReservable, fHasExpress);

        } // end function(res)
    }
    );  
    
} // end appendLibBookInfo

function appendLibBookHtml(bookRecNo, fMore, fHasReservable, fHasExpress) {
    if (fDebug)  console.log('book recNo: ' + bookRecNo + ', fHasReservable: ' + fHasReservable + ', fHasExpress:' + fHasExpress);
    
    var book_url = LIBBOOK_URL + bookRecNo;
    var htmlStr = '';
    htmlStr += '<ul id="libLinks" class="bs" >';//<div class="indent">
    htmlStr += '<li style="border:none"><a id=libBookLink href="' + book_url;
    //title="点击前往图书馆查看"
    htmlStr += '" target="_blank" >到深圳图书馆查看本书</a>';
    if (fMore) {
        htmlStr += '<a class="rr" href="' + getLibIsbnUrl(isbn);
        htmlStr += '" target="_blank" title="查看所有搜索结果">更多. . .</a>';
    }
    htmlStr += '</li>';
    if (fHasReservable || fHasExpress) {
        htmlStr += '<li style="border:none">';
        if (fHasReservable) {
            htmlStr += '<a class="collect_btn colbutt ll" href="';
            htmlStr += LIBRESERVE_URL + bookRecNo;
            htmlStr += '" target="_blank" title="登陆我的图书馆办理预借登记"><span >预借登记</span></a>';
        }
        if (fHasExpress) {
            htmlStr += (fHasReservable ? '&nbsp;&nbsp;' : '');
            htmlStr += '<a class="collect_btn colbutt ll" href="';
            htmlStr += LIB_EXPRESS_URL + isbn;
            htmlStr += '" target="_blank" title="登陆我的图书馆办理快递到家"><span >快递到家</span></a>';
        }
        htmlStr += '</li>';
    }
    
    htmlStr += '</ul>'; //</div></div>
    $("#libInfo").html(htmlStr);
    
    appendBookCallNumbers(bookRecNo);
}


/**
 * 解析索书号没有使用xml解析，使用正则表达式解析
 * 
 * 添加索书号，位置信息，查询url返回html字符串，每个馆藏一个div，结构如下
 * <div class='tab_2_title'><a title='深圳图书馆 (1)'>深圳图书馆 (1)</a>...</div>
 * <div class="tab_2_show">
 * <div class="tab_2_text"> 
 *   <h3 class='title'>可外借馆藏</h3>
 *   <table >
 *     <thead><tr><td>条码号</td><td>索书号</td><td>所在地点</td></tr></thead>
 *     <tbody>
 *       <tr><td>04400511016054</td><td>K825.4/1023</td><td>深图中文图书借阅区(3楼)</td></tr>
 *       ...
 *     </tbody>
 *   </table>
 *   <h3 class='title'>可阅览馆藏</h3>
 *   <table >...</table>
 * </div>
 * ...
 * </div>
 * 
 * 条码号可能是字母开头
 * <tr><td>F4401001057643</td><td>K825.1=72/6</td><td>大学城中文图书</td></tr>
 */
function appendBookCallNumbers(bookRecNo) {
    if (bookRecNo == -1) 
        return ;
    
    var qryCallNoUrl = LIBOPAC_URL_CALLNO + bookRecNo;
    if (fDebug)  console.log('qryCallNoUrl: ' + qryCallNoUrl);
    
    GM_xmlhttpRequest({
        method: 'GET',
        url: qryCallNoUrl,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'
        },
        onload: function(res) {
            if (fDebug)  console.log('res: ' + res.responseText);
            var respTxt = res.responseText;
            // extract the 图书馆分馆名称
            var locs    = null;
            var libLocs = null;
            try
            {
                locs = respTxt.match(/\s+title=["']?.*?["']/igm);
                if (fDebug)  console.log('locs: ' + locs + ', len: ' + locs.length);
                libLocs = respTxt.match(/<div\sclass=["']?tab_2_text["']?.*?<\/div>/igm);
                if (fDebug)  console.log('libLocs: ' + libLocs + ', len: ' + libLocs.length);
            } catch (ex) {
                console.log('book callNo parse has exception, ' + ex.message);
            }
            
            var htmlStr = getBookCallNumberHtml(locs, libLocs);
            if (fDebug)  console.log('call No html: ' + htmlStr);
            
            if (!isEmptyStr(htmlStr))
                $("#libInfo").append(htmlStr);
        } // end function(res)
    });
    
} // end appendBookCallNumber

function getBookCallNumberHtml(locs, libLocs) {
    if (locs == null || libLocs == null) 
        return '<div class="indent"></div>';
    
    var htmlStr = '';
    htmlStr += '<div class="indent"><table width="100%" title="部分在馆书籍">';
    htmlStr += '<thead><tr style="border-bottom:1px solid #CCC;">'
      + '<td width=30%>&nbsp;索 书 号</td><td width=70%>馆藏地点</td>'
      + '</tr></thead><tbody>';
    for (var i = 0; i < libLocs.length; i++) {
        // extract Name, remove the first '
        var subLibName = locs[i].match(/["'].*?\s/ig)[0].substr(1).trim();
        if (fDebug)  console.log('subLib: ' + subLibName); 
        // extract the 索书号信息行
        var shelfLocs = libLocs[i].match(/<tr><td>.*?<\/td><\/tr>/igm);
        //libLocs[i].match(/<tr><td>[0-9]+.*?<\/td><\/tr>/igm);
        
        if (fDebug)  console.log('shelfLocs: ' + shelfLocs + ', len: ' + shelfLocs.length);
        var callNoArr = new Array();
        for (var j = 0; j < shelfLocs.length; j++) {
            // extract the 索书号, 馆内位置
            try{
                var shelfLocArr = shelfLocs[j].match(/<td>.*?<\/td>/igm);
                var callNoStr = shelfLocArr[1];
                var shelfLocStr = shelfLocArr[2];
                // 4 = "<td>".length, 5 = "</td>".length
                callNoStr = callNoStr.substring(4, callNoStr.length-5);
                shelfLocStr = shelfLocStr.substring(4, shelfLocStr.length-5).trim();
                if (fDebug)  console.log('callNo : ' + callNoStr + ', loc: ' + shelfLocStr);
                
                // 索 书 号+馆藏地点 相同的不重复显示
                if (callNoArr.indexOf(callNoStr + shelfLocStr) == -1) {
                    callNoArr.push(callNoStr + shelfLocStr);

                    htmlStr += '<tr style="border-bottom:1px dashed #DDDDDD;"><td>' + callNoStr + '</td><td>';
                    htmlStr += shelfLocStr + '</td></tr>';
                }
            } catch(ex) {
                console.log('failed to parse callNo, shelfLoc, subLibName, ' + ex.message);
            }
        }
    } // end libLocs
    
    htmlStr += '</tbody></table></div>';
    
    return htmlStr;
}

function getDoubanBookTitle() {
    // get book title
    title = $('h1 span').text();
}

function getDoubanBookIsbn() {
    // get book isbn  
    try
    {
        var liTxt = null;
        $("#info span.pl").each(function(){
            liTxt = $(this).text();
            if (fDebug)  console.log('lib book attr txt:' + liTxt);
            if (liTxt == 'ISBN:' && $(this)[0].nextSibling != null){
                isbn = $(this)[0].nextSibling.nodeValue.trim();
                if (fDebug)  console.log('book isbn txt: [' + isbn + ']');
            }
        });
    } catch(ex) {
        console.log('In getDoubanBookIsbn, exception: ' + ex.message);
    }
    isbn10 = getIsbn10();
    if (fDebug)  console.log("book isbn10: \'" + isbn10 + "\'");
}

function appendTitleLink_Loading(){
    var htmlStr = '';
    htmlStr += '<div id="libArea">' + getLibHeadHtml();
    htmlStr += '<div id="libInfo"><div class="indent">' 
      + LIBSEARCH_LINK_PRE + ' href="' + getLibTitleUrl(title) 
      + '" >' + LIBSEARCH_LINK_SUF;
    
    if (!isEmptyStr(isbn)) {
        htmlStr += '<ul id="libLoading">' + HTML_LOADING + '</ul>';
    }
    htmlStr += '</div></div></div>';
    $('.aside').prepend(htmlStr);
    setLibMemberStyle();
}

function queryLibByIsbn(vIsbn){
    if (fDebug)  console.log("url : " + getLibIsbnUrl(vIsbn));

    var cacheInfo = GM_getValue(vIsbn);
    if (!cacheInfo && isbn10) {
        if (fDebug)  console.log("check cache for isbn10 also ");
        cacheInfo = GM_getValue(isbn10);
    }
    if (cacheInfo) {
        var bookInfo = JSON.parse(cacheInfo);
        // '{"bookRecNo":' + bookRecNo + ', "hasMore":'+ fMore + ', "reservable":' + fHasReservable + ', "expressable":' + fHasExpress + '}';
        var bookRecNo = bookInfo['bookRecNo'];
        var fMore = bookInfo['hasMore'];
        var fReservable = bookInfo['reservable'];
        var fHasExpress = bookInfo['expressable'];
        if (fDebug)  console.log(vIsbn + " cached, bookRecNo:" + bookRecNo + ", hasMore:" + fMore + ", reservable:" + fReservable + ", expressable:" + fHasExpress);
        appendLibBookHtml(bookRecNo, fMore, fReservable, fHasExpress);
        return ;
    }
    
    GM_xmlhttpRequest({
        method: 'GET',
        url: getLibIsbnUrl(vIsbn),
            headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        },
        //onload: loadLibInfo
        onload: function(res) {
            var respTxt = res.responseText;
            if (fDebug)  console.log("respTxt : " + respTxt);
            
            // shenzhenLib search result page will contains below string 
            // if the isbn search find any books
            // parse string: &metaidList=1086672,962940,400742,70483,1184921,'
            var idstr = respTxt.match(/\&metaidList=.*?,\'/igm);
            if (fDebug)  console.log("found metaids : " + idstr);
            var found = (idstr != null );
            if (found ) {
                // parse bookRecNos
                var bookRecNos = idstr[0].match(/\d+/g);
                isbn = vIsbn; // the value might be isbn10
                appendLibBookInfo(bookRecNos);
            } else {
                if (vIsbn.length == 13) {
                    if (fDebug)  console.log('try another value again');
                    //setTimeout(function(){
                    //    appendLibInfoByIsbn10(vIsbn);
                    //}, 20);
                    if (isbn10) {
                        queryLibByIsbn(isbn10);
                    } else {
                        $('#libLoading').remove();
                    }
                } else {
                    $('#libLoading').remove();
                }
            }
        }
    });
}

function appendLibInfoByIsbn10(isbn13){
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://api.douban.com/book/subject/isbn/' + isbn13 + '?alt=json',
        headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        },
        onload: function(res) {
            var isbn10 = null;
            var jsonObj = JSON.parse(res.responseText);
            
            var propArr = jsonObj['db:attribute'];
            for (var i = 0; i < propArr.length; i++) {
                if (fDebug)  console.log("name: " + propArr[i]['@name']);
                if (fDebug)  console.log("val : " + propArr[i]['$t']);
                if (propArr[i]['@name'] == 'isbn10') {
                    isbn10 = propArr[i]['$t'];
                    break;
                }
            }
            
            if (isbn10 != null && isbn10.length == 10) {
                queryLibByIsbn(isbn10);
            } else {
                $('#libLoading').remove();
            }
        }
    });
}

function getIsbn10() {
    var isbn10 = null;
    var borrowDiv = document.getElementById("borrowinfo");
    // div -> ul -> li -> a
    if (borrowDiv ) {
        if (borrowDiv.children[1] && borrowDiv.children[1].children[0]
            && borrowDiv.children[1].children[0].children[0]) {
            var libLink = borrowDiv.children[1].children[0].children[0].href;
            if (fDebug)  console.log('libLink: ' + libLink);
            var m = libLink.match(/&subject=.*&type=/igm);
            if (m) {
                isbn10 = m[0];
                isbn10 = isbn10.substring("&subject=".length, isbn10.length - "&type=".length);
                if (fDebug)  console.log('isbn10: ' + isbn10);
                return isbn10;
            }
        }
    }
}

/**
 * append the library link to douban book page
 * a) if the lib isbn query return books, the link is the first book page;
 * b) if the query results has more than one book, add query result link
 * c) if the first ten books has preservable book, set it as the book link
 * d) otherwise append title query link of Shenzhen Library
 */
function appendLibraryLink() {
    
    title = null;
    isbn  = null;
    
    getDoubanBookTitle();
    if (fDebug)  console.log("book title: \'" + title + "\'");
    getDoubanBookIsbn();
    if (fDebug)  console.log("book isbn: \'" + isbn + "\'");
    // it might not be book page, or douban changed the page structure
    if (isEmptyStr(title) && isEmptyStr(isbn) )
        return ; 
    
    appendTitleLink_Loading();
    
    if (!isEmptyStr(isbn)) {
        // query library, append link to library
        setTimeout(function(){
            queryLibByIsbn(isbn);
        }, 200); // end of setTimeout
    }
} // end of appendLibraryLink()


function getLibBookTitle() {
    title = $('h3 a').text();
}

function getLibBookIsbn() {
    // get book isbn  
    try
    {
        var liTxt = null;
        $("div.righttop ul li").each(function(){
            liTxt = $(this).text();
            if (fDebug)  console.log('lib book attr txt:' + liTxt);
            //if ($(this).text() == 'ISBN' && $(this)[0].nextSibling != null)
            if (liTxt.indexOf('ISBN') == 0 && liTxt.length > 5) { // 5='ISBN：'.length
                //isbn = $(this)[0].nextSibling.nodeValue.trim();
                isbn = liTxt.substring(5).trim();
                if (fDebug)  console.log('lib book isbn txt:' + isbn);
                isbn = isbn.replace(/-/g, '').substr(0,13);
                if (fDebug)  console.log('lib book isbn:' + isbn);
            }
        });
    } catch(ex) {
        console.log('In getLibBookIsbn, exception: ' + ex.message);
    }
}

function appendDoubanTitleSearchLink() {
    if (isEmptyStr(title))
        return ;
    
    var htmlStr = '<li>在豆瓣：';
    htmlStr += getDoubanSearchLink(title) + '</li>';
    if (fDebug)  console.log("book query url: " + htmlStr);
    $("div.righttop ul").append(htmlStr);
}

function appendDoubanBookLink(score, bookLink, pageCt) {
    var htmlStr = '<li>在豆瓣：'; 
    htmlStr += '<a href="' + bookLink + '" target="_blank" title="点击前往豆瓣查看评论">到豆瓣查看评论';
    if (score != null && !isNaN(score) && score > 0) {
        htmlStr += '&nbsp;(评分:&nbsp;' + score + ')';
    }
    htmlStr += '</a></li>';
    if (pageCt != null && !isNaN(pageCt) && pageCt > 0) {
            htmlStr += '<li>页数：'+ pageCt + '</li>';
    }
    
    if (fDebug)  console.log("book query url: " + htmlStr);
    
    $("div.righttop ul").append(htmlStr);
}

// append link to douban book
function appendDoubanLink() {
    
    title = null;
    isbn  = null;
    
    if (fDebug)  console.log('lib bookpage append link to douban book: ');
    getLibBookTitle();
    if (fDebug)  console.log("book title: \'" + title + "\'");
    getLibBookIsbn();
    if (fDebug)  console.log("book isbn: \'" + isbn + "\'");
    // it might not be lib book page, or shenzhen Lib changed the page structure
    if (isEmptyStr(title) && isEmptyStr(isbn) )
        return ; 
    
    if (!isEmptyStr(isbn)) {
        //var doubanUrl = 'http://book.douban.com/isbn/' + isbn + '/';
        var doubanUrl = 'http://api.douban.com/book/subject/isbn/' + isbn + '?alt=json';
        setTimeout(function(){GM_xmlhttpRequest({
            method: 'GET',
            url: doubanUrl ,
            headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            },
            onload: function(res) {
                try {
                    var jsonObj = JSON.parse(res.responseText);
                    
                    var score = jsonObj['gd:rating']['@average'];
                    var bookLink = jsonObj['link'][1]['@href'];
                    var dbAttrs = jsonObj['db:attribute'];
                    var pageCt = 0;
                    for (var i = 0; i < dbAttrs.length; i++)
                    {
                    	if (fDebug)  console.log("attr: " + dbAttrs[i]['$t']);
                    	if (dbAttrs[i]['@name'] == 'pages') {
                    		pageCt = dbAttrs[i]['$t'];
                    		if (fDebug)  console.log("pages: " + pageCt);
                    	}
                    }
                    if (fDebug)  console.log("score: " + score);
                    
                    appendDoubanBookLink(score, bookLink, pageCt);
                } catch(ex) {//SyntaxError
                    if (fDebug)  console.log("respTxt: " + res.responseText);
                    // no such book, responseText is not a valid json str
                    appendDoubanTitleSearchLink();
                }
            }
        })}, 20); // end of setTimeout
    } else {
        appendDoubanTitleSearchLink();
    }
    
} // end of appendDoubanLink()


function appendLibraryInSearchPage() {
    var keyword = $(":text").val();
    keyword = keyword.replace(/-/g, '');
    if (fDebug)  console.log('keyword: [' + keyword + ']');
    if (isEmptyStr(keyword))
        return ;
    
    var htmlStr = 
      '<h2><span class="">图书馆搜索</span>        · · · · · ·    </h2>'
      + '<p class="p1">' + LIBSEARCH_LINK_PRE
      + ' href="' + getLibTitleUrl(keyword) 
      + '" >&gt;&nbsp;'+ LIBSEARCH_LINK_SUF + '</p>';

    $(".aside h2:last").before(htmlStr);
}

function appendDoubanInSearchPage() {
    
    try
    {
        var keyword = $("span.fbold").text();
        if (isEmptyStr(keyword))
            return ;
        if (fDebug)  console.log('keyword: [' + keyword + ']');
        
        var rsltSearchBtn = $("div.books_sel input:last");
        if (fDebug)  console.log('find search in result button');
        var dbSearchBtn = rsltSearchBtn.clone();
        var dbSearchUrl = getDoubanSearchUrl(keyword);
        if (fDebug)  console.log('copy it, new dbSearchBtn, dbSearchUrl: ' + dbSearchUrl);
        dbSearchBtn.attr('value','在豆瓣搜索');
        dbSearchBtn.attr('onclick', null);
        dbSearchBtn.click(function() {window.open(dbSearchUrl);});

        if (fDebug)  console.log('created douban search button');
        $("div.books_sel").append(dbSearchBtn);
    } catch(ex) {
        console.log('In Library search page, exception: ' + ex.message);
        console.log('In Library search page, cannot find keyword, page struct may changed');
    }
}

function appendListBooksLibLink() {
    // eg, book.douban.com/doulist/232705/ (div.pl2 a), 
    // book.douban.com/doulist/531890/ (div.title a), 
    
    var fChecked = false;
    $('div.article table').each(function(){
        var keyword = '';
        if (!fChecked) {
            fChecked = true;
            GM_addStyle(".libSearch{\
                float:left;display: inline-block;\
                background: #eef9eb;border: 1px solid #2F7B4B;\
                padding: 1px 10px;border-radius:3px;margin-right: 8px;}\
            ");
            if (fDebug)  console.log(' tag/doulist 1: fChecked[' + fChecked + '] ');
        }
        
        keyword = $('div.pl2 a', this).text();
        if (isEmptyStr(keyword))
            return ;
        keyword = keyword.trim();
        if (fDebug)  console.log(' tag/doulist page: [' + keyword + ']');
        
        var htmlStr = LIBSEARCH_LINK_PRE + 
          ' class="libSearch" href="' + getLibTitleUrl(keyword) 
          + '" >' + LIBSEARCH_LINK_SUF;
        $('td > span.rr', this).append(htmlStr);
    });
}

function appendTagBooksLibLink() {
    // eg, book.douban.com/tag/web , book.douban.com/people/qibadao/collect
    // book.douban.com/chart
    
    $('div.article ul li').each(function(){
        var keyword = '';
        keyword = $('h2 a', this).text();
        
        if (isEmptyStr(keyword))
            return ;
        keyword = keyword.trim();
        if (fDebug)  console.log(' tag page: [' + keyword + ']');
        
        var htmlStr = LIBSEARCH_LINK_PRE 
          + ' class="j a_add2cart add2cart" href="'
          + getLibTitleUrl(keyword) + '">' + LIBSEARCH_LINK_SUF;
        $('span.cart-info span', this).first().append(htmlStr);
    });
}


(function() {

    var thisScript = {
    name: "douban_shenzhenLib", 
    id: "116332", 
    version:"1.24.10"
    };

    if (typeof(Updater)!='undefined') {
        var updater = new Updater(thisScript);
        updater.check(24);
    }
    
    if (fDebug)  console.log('url host:' + document.URL);
    
    var vUrl = document.URL;
    if (vUrl.indexOf("douban.com/subject/") > 0) {
        if (fDebug)  console.log('in douban page');
        appendLibraryLink();
    } else if (vUrl.indexOf("douban.com/subject_search") > 0) {
        appendLibraryInSearchPage();
    } else if (vUrl.indexOf("/Search/searchdetail.jsp") > 0) {
        if (fDebug)  console.log('in shenzhen library page');
        appendDoubanLink();
    } else if (vUrl.indexOf("/Search/searchshow.jsp") > 0) {
        appendDoubanInSearchPage();
    } else if(vUrl.indexOf('/top250') > 0
        || vUrl.indexOf('/doulist/') > 0) {
        appendListBooksLibLink();
    } else if (vUrl.indexOf('/tag/') > 0
        || /\/people\/.+\/collect/.test(vUrl) || /\/chart(.*)$/.test(vUrl)) {
        appendTagBooksLibLink();
    }
})();