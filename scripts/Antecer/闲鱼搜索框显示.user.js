// ==UserScript==
// @name                 闲鱼搜索框显示
// @author               Antecer
// @namespace            https://greasyfork.org/zh-CN/scripts/38910
// @version              2.2
// @description          在闲鱼网页上显示搜索框
// @icon64               https://antecer.gitlab.io/amusingdevice/icon/antecer.ico
// @icon                 https://antecer.gitlab.io/amusingdevice/icon/antecer.ico
// @include              http*://*2.taobao.com/*
// @run-at               document-end
// @grant                none
// @compatible           chrome 测试通过
// ==/UserScript==

const SearchAPI = `https://s.2.taobao.com/list/?search_type=item&_input_charset=gbk&q=`;
// 搜索框Html
const SearchBar = `
	<input class="searchBox" type="text" value="" placeholder="搜闲鱼">
	<button class="searchBtn">搜索</button>
`;
// 搜索框样式CSS
const SearchCSS = `
	.searchBar {
		display: block;
		position: absolute;
		width: 222px;
		height: 36px;
		top: 62px;
		background-color: #333;
	}

	.searchIndex {
		left: calc(50% - 440px);
	}

    .searchList{
		left: calc(50% + 240px);
	}

	.searchBox {
		width: 164px;
		height: 32px;
		padding: 0 10px;
		margin: 0;
		border: 0;
		outline: 0;
		position: absolute;
		left: 2px;
		top: 2px;
		font-size: 13px;
	}

	.searchBtn {
		display: block;
		width: 36px;
		height: 36px;
		position: absolute;
		top: 0;
		right: 0;
		color: #fff;
		background-color: #333;
		border: 0;
		margin: 0;
		padding: 0;
		cursor: pointer;
		outline: 0;
	}
`;
// 广告隐藏CSS
const BlockAdCSS = `
	.pop-wrap, .download-layer{
		display: none !important;
	}
`;

// 验证网址是否包含某字符串
function UrlExp(textStr) {
    return RegExp(textStr).test(window.location.href);
}
// 创建选择器的简化写法
function dQuery(selector) {
    return document.querySelector(selector);
}
function dQueryAll(selector) {
    return document.querySelectorAll(selector);
}
// 设置搜索框样式
let searchStyle = document.createElement('style');
searchStyle.innerHTML = SearchCSS + BlockAdCSS;
dQuery('body').appendChild(searchStyle);
// 显示搜索框
let searchBar = document.createElement('div');
if (UrlExp('2.taobao.com')) { searchBar.className = "searchBar searchIndex"; } // 咸鱼网主页
if (UrlExp('(list|item)')) { searchBar.className = "searchBar searchList"; } // 咸鱼网列表页
searchBar.innerHTML = SearchBar;
dQuery('body').appendChild(searchBar);
// 处理搜索按钮点击事件
dQuery('.searchBar .searchBtn').addEventListener('click', () => {
    window.location.href = `${SearchAPI}${dQuery('.searchBar .searchBox').value}`;
});
// 处理搜索框回车事件
dQuery('.searchBar .searchBox').addEventListener('keyup', (event) => {
    if(event.keyCode === 13){
        window.location.href = `${SearchAPI}${dQuery('.searchBar .searchBox').value}`;
    }
});