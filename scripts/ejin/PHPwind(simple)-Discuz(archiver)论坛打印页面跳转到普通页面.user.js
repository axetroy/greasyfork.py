// ==UserScript==
// @name         PHPwind(simple)-Discuz(archiver)论坛打印页面跳转到普通页面
// @namespace    mpc1qddf58oo5nymjyhgn38hk10pye1u
// @version      2015.11.12
// @description  搜索引擎搜索到的PHPwind常常都是archiver模式的页面，而PHPwind也不甘寂寞，出现的却是simple模式，虽然简洁但是不方看图，所以还是切换到普通模式吧
// @author       Ejin
// @match        */simple/?t*.html*
// @match        */archiver/tid-*.html*
// @match        */archiver/?tid-*.html*
// @grant        none
// ==/UserScript==

if (document.getElementsByTagName("a")[0].href.indexOf("read.php?tid=") != -1 ) {
	location.href=document.getElementsByTagName("a")[0].href
}
if (document.body.innerHTML.indexOf("id=\"end\"") != -1 && document.getElementById("end").innerHTML.indexOf("thread") != -1 ) {
	location.href=document.getElementById("end").getElementsByTagName("a")[0].href
}

if (document.body.innerHTML.indexOf("id=\"footer\"") != -1 && document.getElementById("footer").innerHTML.indexOf("thread") != -1 ) {
	location.href=document.getElementById("footer").getElementsByTagName("a")[0].href
}