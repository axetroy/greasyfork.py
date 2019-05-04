// ==UserScript==
// @name        WeiboPhotoUrlBatchGet
// @name:zh-CN  微博相册图片地址批量获取工具
// @namespace   http://www.mapaler.com/
// @description BatchGetWeiboPhotoURL
// @description:zh-CN 批量获取微博相册图片地址
// @include     *://weibo.com/*home*
// @include     *://weibo.com/*friends*
// @include     *://weibo.com/*mygroups*
// @include     *://photo.weibo.com/*albums/detail/album_id/*
// @include     *://photo.weibo.com/*talbum/index*
// @include     *://photo.weibo.com/*photos*
// @version     2.0.2
// @grant       none
// @copyright   2016+, Mapaler <mapaler@163.com>
// @icon        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAuCAYAAAC1ZTBOAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK6wAACusBgosNWgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAASASURBVFiFzZk/bNtGFIc/Cl4KFKjTQSDQIQyaSYvpJWMjg0Az1u7ELrU8tUCH0gjQTYgDrSlMD2lHy5umRGsLCJELdMliGig4tSgzFFA1BCrgwiM73NE6Ho/6W1n5AYTFdxTv07v37t6dLdag1AuOgCeauQ+cAV2rF47UhsrtYBX00GCrA6fAReoFu2rDuiDPgFFJmwO8TL2gkRmsWwCaqNQLNgEX2AcaWvOB1Qvba4OUcIG8HQFthBdPEdCZfXudkEfkk2cEHAAJ8ArYlPb2umISRDarcbkJvJR/TxR7412JyYCxV/vAHsKbrrx/N5R6wWnqBWnqBcd628o9WesMHERCZFmsaxT7dgiQeoFj9cJEf2BpyFpnkHWewdyVf13GwT9NT2PfPiprnBmy1hlkIO6CIJM0in37TlmjEbLWGexKgC0FZtXai327a2rY0A21zuCY8SR7m9oHjJCmeXJVgJG8ylQvaygMd60zSOfoOFGuN4jJOQOJYt82FhG1zqDOeOJWZRzywnDLDh0DSAT8g1wpYt+e5JWJin27X+sMDhHrtKqHGIbc5EkXkShJ7Nv9aR3K2k/N+HOER7umOU/r60/yDoli396eCjmLlKXsWyZPQX3g0OqFRq+XJOkdPUzmLjBSL3CBC8RaKwDffw+27osrrzqi0j4qed2ZwVbXDXN5UgKOy6it+/DlozzcD114cW76etvqhQe60ZCoYezbh6phoxkNXcZeiYCTlltNDIBqKQXffQGfPiii/Htt/oXQSL3g3OqFbc3eJ++9wsKxQb7ArCMCec/QyROyIFcBr67h59fw62/w91sYvC2DBDhOvUDfDUYaZB1NFYqBX0gE6cUGAI8ejAH/+Au+fiaG+PL3aYDZuxua7VJ/SM4wOchZtEsG//knwnJ1DY+fzwKma1+7TwzPTIV0DLatm08Z1I9dATq/9JhLJvaHgOxrDzilL7Y/hBe/CA/+9HoRQOBmlgAg9m0TZMGThfW1GQ3NE/T334jr448WBpTS368zOOpNBUPgUhwS8ZLFhtckfQXS7x31pmJ4AIq/VPyQx8/hq2dlk/WsGukHUibJvRFQDql7UlQmV9di2llOpsLWBO1kHypyddEfymWXLBD6y7HdyLRem0LuRtkUpAM4hmefzs9TUNfqhXpfUJyGIrVMzCD1X+LqGS5fvgxohDjrKSj27TZwD9gBdvSa0gJoRsM6Yg1Xtddyq4X4kScM8+6DImBnloQxqQLQcqt9Q5vpNBarFx4iCpBkxj5ClgAEpZ5sRsNX5CuQpOVW7036sjyN/Ux+Tw2PLNFOpm0h5oUMAP2w6KDlVtvLdqL0oZ6CqAcPo5ZbnX6CIV9wobUnwHbLrc48VDK+QXj3A/LnRJO0UxJ2+e1DMxrqu7cMNDuIH2ntd5X7OsupFFLfd/cpFqUOxf+5rEJJWYNeT5pWg1UqQZ7smvZVmQq7xZIh/z9gEkTWvwGisqE1yXTMcsbiwxtJmMsMbB6YMpkgQ8TcZzqTjBgn0A2IhEmWhVlIzWjorKVjTf8BGAN+rkqYYl0AAAAASUVORK5CYII=
// ==/UserScript==

(function() {
var scriptName = typeof(GM_info)!="undefined" ? (GM_info.script.localizedName ? GM_info.script.localizedName : GM_info.script.name) : "WeiboPhotoUrlBatchGet"; //本程序的名称
var scriptVersion = typeof(GM_info)!="undefined" ? GM_info.script.version : "LocalDebug"; //本程序的版本
var imgs = { img: [] , count:0};
function imgObj()
{
	var obj = {
		addFormUrl: function (url)
		{
			var regSrc = /(https?:\/\/[^\/]+)\/.+\/([\d\w]+)\.([\d\w]+)/ig;
			var result = regSrc.exec(url);
			if (result == null) return this;
			this.host = result[1];
			this.pid = result[2];
			this.extention = result[3];
			return this;
		},
		add: function (host, pid, extention)
		{
			if (extention == undefined) extention = "jpg";
			this.host = host;
			this.pid = pid;
			this.extention = extention;
			return this;
		},
		get: function (size)
		{
			if (size == undefined) size = "large";
			var src = [
				this.host,
				"/",
				size,
				"/",
				this.pid,
				".",
				this.extention
			];
			return src.join("");
		},
		host: "",
		pid: "",
		extention: "",
		//width: 0,
		//height: 0,
		//large: "",	mw690: "",	mw600: "",	bmiddle: "",	small: "",	square: "",	sq612: "",	orj480: "",	smsq612all: "",	thumb300: "",	thumb180: "",	thumb150: "",	
	}
	return obj;
}

//访GM_xmlhttpRequest函数v1.2
if(typeof(GM_xmlhttpRequest) == "undefined")
{
	var GM_xmlhttpRequest = function(GM_param){

		var xhr = new XMLHttpRequest();	//创建XMLHttpRequest对象
		if(GM_param.responseType) xhr.responseType = GM_param.responseType;
		xhr.onreadystatechange = function()  //设置回调函数
		{
			if (xhr.readyState == 4 && xhr.status == 200 && GM_param.onload)
				GM_param.onload(xhr);
			if (xhr.readyState == 4 && xhr.status != 200 && GM_param.onerror)
				GM_param.onerror(xhr);
		}
		xhr.open(GM_param.method, GM_param.url, true);

		for (var header in GM_param.headers){
			xhr.setRequestHeader(header, GM_param.headers[header]);
		}

		xhr.send(GM_param.data ? GM_param.data : null);
	}
}

var win = document.createElement('div');
win.id = "WeiboPhotoUrlBatchGet"
win.className = "WPUBG_win"

var style = document.createElement("style");
win.appendChild(style);
style.type = "text/css";
style.innerHTML +=
	[
		".WPUBG_win" + "{\r\n" + [
            'box-shadow:0 0 10px #333',
            'position:fixed',
            'top:0',
            'right:0',
            'z-index:1000000',
            'font-family:arial,sans-serif',
            'padding:5px',
            'margin:0',
            'border-radius: 0 0 0 5px',
            'background:#F5F8FA',
		].join(';\r\n') + "\r\n}",
		".WPUBG_box" + "{\r\n" + [
            'width:180px',
		].join(';\r\n') + "\r\n}",
		".WPUBG_tra" + "{\r\n" + [
            'width:180px',
            'height:180px',
		].join(';\r\n') + "\r\n}",
		".WPUBG_cls" + "{\r\n" + [
			'width:40px',
			'box-shadow:0 0 2px #333',
			'position:absolute',
			'top:0',
			'left:-40px',
			'line-height:25px',
			'padding:0',
			'margin:0',
			'border-radius:0',
			'border:none',
			'background:#515151',
			'z-index:99999',
			'text-align:center',
			'color:#aaa',
			'cursor:pointer',
		].join(';\r\n') + "\r\n}",
		".WPUBG_ipt" + "{\r\n" + [
            'width:100px',
		].join(';\r\n') + "\r\n}",
		".WPUBG_rate" + "{\r\n" + [
            'float:right',
		].join(';\r\n') + "\r\n}",
	].join('\r\n');

var box = document.createElement('div');
box.className = "WPUBG_box";
win.appendChild(box);

var title = document.createElement('div');
title.className = "WPUBG_title";
title.innerHTML = scriptName + " v" + scriptVersion;
box.appendChild(title);

var tra = document.createElement('textarea');
tra.className = "WPUBG_tra";
tra.wrap = "off";
tra.placeholder = "获取数据中...";
box.appendChild(tra);

var lbl = document.createElement('label');
lbl.className = "WPUBG_lbl";
lbl.innerHTML = "Size:";
lbl.title = "常见尺寸：\r\nlarge\r\nmw690\r\nmw600\r\nbmiddle\r\nsmall\r\nsquare\r\nsq612\r\norj480\r\nsmsq612all\r\nthumb300\r\nthumb180\r\nthumb150";
box.appendChild(lbl);

var ipt = document.createElement('input');
ipt.className = "WPUBG_ipt";
ipt.type = "text";
ipt.placeholder = "large";
ipt.name = "WPUBG_size";
ipt.title = "常见尺寸：\r\nlarge\r\nmw690\r\nmw600\r\nbmiddle\r\nsmall\r\nsquare\r\nsq612\r\norj480\r\nsmsq612all\r\nthumb300\r\nthumb180\r\nthumb150";
ipt.value = getConfig("WPUBG_size");
ipt.onblur = function ()
{
	setConfig("WPUBG_size", this.value);
	reCreatList();
}
lbl.appendChild(ipt);

var rate = document.createElement('span');
rate.className = "WPUBG_rate";
box.appendChild(rate);

var cls = document.createElement('div');
cls.className = "WPUBG_cls";
win.appendChild(cls);
cls.innerHTML = '关闭';//关闭
cls.onclick = function (){	win.parentNode.removeChild(win);}


	
if (document.location.host == "photo.weibo.com")
{
	var album = !(typeof($GLOBAL_DETAIL) == "undefined");
	if(!album)console.error("未发现 $GLOBAL_DETAIL ，不是专辑");
	var btnGetAll = document.createElement('button');
	btnGetAll.className = "M_btn_h";
	btnGetAll.innerHTML = "获取本专辑全部图片地址";
	btnGetAll.onclick = function () { getAll(album); }
	if (album)
		var insertPlace = document.getElementsByClassName("m_share_like")[0];
	else
		var insertPlace = document.getElementsByClassName("m_user_album")[0];
	insertPlace.insertBefore(btnGetAll, insertPlace.firstChild);
} else
{
	var insertPlace = document.getElementById("plc_top");
	var btnGetUp = document.createElement('button');
	btnGetUp.className = "W_btn_a";
	btnGetUp.innerHTML = "获得上传的图地址";
	btnGetUp.style.cssFloat = "left";
	btnGetUp.onclick = function () { getUp(); }
	insertPlace.appendChild(btnGetUp);
}

function getUp()
{
	if (win.parentNode || win.parentNode != document.body) document.body.appendChild(win);
	var drag_pic_list = document.getElementsByClassName("drag_pic_list")[0];
	var pics = drag_pic_list.getElementsByClassName("pic");
	for (var pi = 0, len=pics.length; pi < len; pi++)
	{
		var pdiv = pics[pi].getElementsByTagName("div")[0];
		var img = new imgObj;
		imgs.img.push(img.addFormUrl(pdiv.style.backgroundImage))
		tra.value += img.get() + "\r\n";
	}
}
function getAll(isAlbum)
{
	if (win.parentNode || win.parentNode != document.body) document.body.appendChild(win);
	if (imgs.img.length > 0)
		reCreatList();  //重新生成列表，不重复获取
	else
	{
		var type = (isAlbum && $GLOBAL_DETAIL.type == 3) ? 3 : 1 ; //当type为3时（访问他人相册），无法一次性获取所有图像，只能每次30个。

		GM_xmlhttpRequest({
			method: "GET",
			url: "http://photo.weibo.com/photos/get_all?uid=" + $CONFIG.owner_uid + (isAlbum?"&album_id=" + $GLOBAL_DETAIL.album_info.album_id:"") + "&count=1&type=" + type + "&__rnd=" + new Date().getTime(),
			onload: function(response) {
				dellFirstJSON(response, $CONFIG.owner_uid, (isAlbum?$GLOBAL_DETAIL.album_info.album_id:isAlbum), type)
			}
		});
	}
}

function dellFirstJSON(response, uid, aid, type)
{
	var info = JSON.parse(response.response);
	imgs.count = info.data.total; //添加图片总数
	
	//当前进度
	rate.innerHTML = imgs.img.length + "/" + imgs.count;
	if (imgs.count<1){alert("图片总数为0，可能没有图片。");return;}

	if(type == 3)
	{
		var imgCountInPage = 30;
		for(var pi=1, len=Math.ceil(imgs.count/imgCountInPage); pi<=len; pi++)
		{
			var thePi = pi;
			GM_xmlhttpRequest({
				method: "GET",
				url: "http://photo.weibo.com/photos/get_all?uid=" + uid + (aid?"&album_id=" + aid:"") + "&count=" + imgCountInPage + "&page=" + thePi + "&type=" + type + "&__rnd=" + new Date().getTime(),
				onload: function(response) {
					dellAllJSON(response, thePi);
				}
			});
		}
	}else
	{
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://photo.weibo.com/photos/get_all?uid=" + uid + (aid?"&album_id=" + aid:"") + "&count=" + info.data.total + "&type=" + type + "&__rnd=" + new Date().getTime(),
			onload: function(response) {
				dellAllJSON(response);
			}
		});
	}
}

function dellAllJSON(response, pageIndex)
{
	var info = JSON.parse(response.response);
	plist = info.data.photo_list;
	if (plist.length<1){
		alert((pageIndex?pageIndex + "页" :"") + "没有获取到图片数据，可能是有些图被渣浪和谐了，也可能不支持本页面或API有变化需要更新脚本。");
		console.log(response)
		return;
	}
	for (pi = plist.length - 1; pi >= 0; pi--)
	{
		var img = new imgObj;
		var regFn = /([\d\w]+)\.([\d\w]+)/ig;
		var resultFn = regFn.exec(plist[pi].pic_name);
		img.add(plist[pi].pic_host, plist[pi].pic_pid, resultFn[2]);
		imgs.img.push(img);
	}
	reCreatList();
}

function reCreatList(size) //重新生成列表
{
	if (size == undefined) size = getConfig("WPUBG_size").length > 0 ? getConfig("WPUBG_size") : "large";

	//用了ES5的map，将当前所有图像生成链接写入
	var links = imgs.img.map(function (img) {return img.get(size);});
	tra.value = links.join("\r\n");

	//当前进度
	rate.innerHTML = imgs.img.length + "/" + imgs.count;
}

function getConfig(key) {
	if (window.localStorage) {
		return window.localStorage.getItem(key) || "";
	} else {
		return getCookie(key);
	}
};
function setConfig(key, value) {
	if (window.localStorage) {
		window.localStorage.setItem(key, value);
	} else {
		setGdCookie(key, value, 86400 * 365);
	}
};

})();