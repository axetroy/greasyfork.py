// ==UserScript==
// @name           Extract DownloadURL
// @version        0.2.2.20190225
// @description    mp4もしくはm3u8の動画URLを取得します。
// @namespace      https://greasyfork.org/users/2671
// @include        *
// @grant          GM.xmlHttpRequest
// @noframes
// @run-at         document-idle
// ==/UserScript==
const rules = [
{
	"reg":/tver\.jp\/\w+\/f?\d+\/?$/
	,"css":"div.inner>h1, div.inner>p>span.summary, div.inner>p>span>span.tv"
	,"isBrightcove":true
}
,{
	"reg":/gyao\.yahoo\.co\.jp\/(episode|player|title|p)\/.+/
	,"css":"h1.video-title"
	,"isBrightcove":true
}
,{
	"reg":/cu\.ntv\.co\.jp\/.+?/
	,"isBrightcove":true
}
,{
	"reg":/tbs\.co\.jp\/muryou-douga\/.+?\/\d+\/.+/
	,"isBrightcove":true
}
,{
	"reg":/video\.tv-tokyo\.co\.jp\/.+?\/.+?\/\d+\.html$/
	,"isBrightcove":true
}
,{
	"reg":/dizm\.mbs\.jp\/title\/\?/
	,"isBrightcove":true
}
,{
	"reg":/ytv\.co\.jp\/mydo\/.+/
	,"isBrightcove":true
}
,{
	"reg":/ktv-smart\.jp\/.+?\/.+?\/index\.php\?key=\d+/
	,"isBrightcove":true
}
];

const userAgents = {
	"ipadSafari":"Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
};

const css = {};
css.panel = "div#download_panel";
css.container = css.panel + ">div";
css.topcontent = "div#download_panel_topcontent";
css.bottomcontent = "div#download_panel_bottomcontent";
css.btn = "div.download_panel_btn";
css.brd = "div.download_panel_border";
css.m3u8btn = css.topcontent + ">div.download_panel_color_m3u8";
css.mp4btn = css.topcontent + ">div.download_panel_color_mp4";
css.errorbtn = css.topcontent + ">div.download_panel_color_error";
css.list = "div.download_panel_list";
css.m3u8list = css.bottomcontent + ">div.download_panel_color_m3u8";
css.mp4list = css.bottomcontent + ">div.download_panel_color_mp4";
css.errorlist = css.bottomcontent + ">div.download_panel_color_error";

const createNode = (tag, html = "", attrObj = {}, node, type) => {
	tag = document.createElement(tag);
	tag.innerHTML = html;
	for (let i in attrObj) {
		tag.setAttribute(i, attrObj[i]);
	};
	if (!node) return tag;
	switch (type) {
		case undefined:
			return node.appendChild(tag);
		case "before":
			return node.parentNode.insertBefore(tag, node);
		case "after":
			return node.parentNode.insertBefore(tag, node.nextElementSibling);
	};
	return (node) ? node.appendChild(tag) : tag;
};

const addStyle = (ary) => {
	ary.forEach((css) => {createNode("style", css, {"type":"text/css"}, document.getElementsByTagName("head")[0])});
};

const expandM3u8 = () => {
};

const XmlHttpRequest = class {
	static get(url, headers = {}) {
		return new Promise((resolve, reject) => {
			GM.xmlHttpRequest({
				method:"GET"
				,url:url
				,headers:headers
				,onload:(response) => {
					if (response.status==200) {
						resolve(response.responseText);
					} else {
						reject(url + "からのURL取得に失敗しました。");
					}
				}
			});
		});
	}
	static redirect(url, headers = {}) {
		return new Promise((resolve, reject) => {
			GM.xmlHttpRequest({
				method:"GET"
				,url:url
				,headers:headers
				,onload:(response) => {
					if (!/40\d/.test(response.status)) {
						resolve(response.finalUrl);
					} else {
						reject(url + "からのURL取得に失敗しました。");
					}
				}
			});
		});
	}
	static check(url, headers = {}) {
		return new Promise((resolve, reject) => {
			GM.xmlHttpRequest({
				method:"HEAD"
				,url:url
				,headers:headers
				,onload:(response) => {resolve(response.status==200)}
			});
		});
	}
};

const CreateURL = class {
	constructor() {
		this.url = location.href;

		let rule = rules.find((obj) => {return obj.reg.test(this.url)}) || {};
		this.isBrightcove = rule.isBrightcove || false;

		let title = document.querySelector("head>title");
		this.title = (title) ? title.textContent : "title";
		if (rule.css) {
			let nodes = Array.from(document.querySelectorAll(rule.css));
			if (nodes.length!=0) this.title = nodes.map((node) => {return node.textContent}).join(" ");
		};
	}
	createBrightcoveObj() {
		let video = document.querySelector("video");
		if (!video) return null;

		return [video, video.parentNode].map((node) => {
			let pubId = node.getAttribute("data-account") || "";
			let videoId = node.getAttribute("data-video-id") || "";
			let playerId = node.getAttribute("data-player") || "";
			return (/^\d+$/.test(pubId) && /^\d+$/.test(videoId) && /^\w+$/.test(playerId)) ? {"pubId":pubId, "videoId":videoId, "playerId":playerId} : null;
		}).find((obj) => {return obj!=null});
	}
	searchBrightcoveNode() {
		let obj = this.createBrightcoveObj();
		if (obj) return Promise.resolve(obj);
		return new Promise((resolve, reject) => {
			console.log("Extract DownloadURL:MutationObserver開始");
			new MutationObserver((mutations, ins) => {
				let obj = this.createBrightcoveObj();
				if (!obj) return null;
				console.log("Extract DownloadURL:MutationObserver切断");
				ins.disconnect();
				resolve(obj);
			}).observe(document.getElementsByTagName("body")[0], {childList:true, subtree:true, attributes:true});
		});
	}
	getKey(obj) {
		const url = "https://players.brightcove.net/" + obj.pubId + "/" + obj.playerId + "_default/index.min.js";
		return XmlHttpRequest.get(url)
		.then((html) => {
			return /policyKey:"(.+?)"/.test(html) ? RegExp.$1 : null;
		}).catch((mes) => {
			return null;
		})
	}
	getURLByBrightcove(obj, policykey) {
		if (policykey) {
			return XmlHttpRequest.get("https://edge.api.brightcove.com/playback/v1/accounts/" + obj.pubId + "/videos/" + obj.videoId, {"Accept":"application/json;pk=" + policykey, "Origin":this.url.replace(/^(https?:\/\/[^\/]+).*$/, "$1")})
			.then((html) => {
				let json = JSON.parse(html);
				return {"url":json.sources.map((obj) => {return obj.src}), "title":this.title, "drm":json.tags.some((tag) => {return /^dd-.+?-drm$/.test(tag)})}
			});
		} else {
			return Promise.resolve();
		}
	}
	brightcove(obj) {
		return this.getKey(obj).then((policykey) => {
			let url = "http://c.brightcove.com/services/mobile/streaming/index/master.m3u8?videoId=" + obj.videoId + "&pubId=" + obj.pubId;
			return (policykey) ? this.getURLByBrightcove(obj, policykey) : XmlHttpRequest.check(url).then((bool) => {return bool ? Promise.resolve({"url":url, "title":this.title}) : Promise.resolve()});
		})
	}
	fujitv() {
		return (() =>{
			if (this.url.indexOf("tver.jp")>-1) {
				let url = document.documentElement.innerHTML.match(/http:\/\/fod-sp\.fujitv\.co\.jp\/[^']+/);
				if (url==null) return Promise.reject();
				return XmlHttpRequest.redirect(url[0]);
			} else {
				return Promise.resolve(this.url);
			}
		})()
		.then((url) => {
			return XmlHttpRequest.get(url, {"User-Agent":userAgents.ipadSafari})
		})
		.then((html) => {
			let doc = new DOMParser().parseFromString(html, "text/html");
			let urls = Array.from(doc.querySelectorAll("a.beacon")).map((node) => {return node.href.replace(/^.+?url=(https:\/\/.+?m3u8)&.+$/, "$1")});
			return {"url":urls, "title":this.title};
		})
		.catch(() => {
			return Promise.resolve();
		})
	}
	execute() {
		if (document.documentElement.innerHTML.indexOf("i.fod.fujitv.co.jp")>-1) {
			console.log("Extract DownloadURL:fujitv");
			return this.fujitv();
		} else if (this.isBrightcove) {
			console.log("Extract DownloadURL:brightcove");
			return this.searchBrightcoveNode()
			.then((obj) => {return this.brightcove(obj)});
		} else {
			console.log("Extract DownloadURL:該当無し");
			return Promise.resolve();
		};
	}
};

const Panel = class {
	static create() {
		let panel = createNode("div", null, {"id":"download_panel"}, document.querySelector("body"));
		let container = createNode("div", null, null, panel);
		let topcontent = createNode("div", null, {"id":"download_panel_topcontent"}, container);
		createNode("div", null, {"class":"download_panel_btn download_panel_border download_panel_color_m3u8"}, topcontent);
		createNode("div", null, {"class":"download_panel_btn download_panel_border download_panel_color_mp4"}, topcontent);
		createNode("div", null, {"class":"download_panel_btn download_panel_border download_panel_color_error"}, topcontent);
		let bottomcontent = createNode("div", null, {"id":"download_panel_bottomcontent"}, container);
		createNode("div", null, {"class":"download_panel_list download_panel_border download_panel_color_m3u8"}, bottomcontent);
		createNode("div", null, {"class":"download_panel_list download_panel_border download_panel_color_mp4"}, bottomcontent);
		createNode("div", null, {"class":"download_panel_list download_panel_border download_panel_color_error"}, bottomcontent);
	}
	static update(title, urls, isDrm) {
		if (!Array.isArray(urls)) urls = [urls];
		urls = urls.filter((url) => {
			if (!url) return false;
			if (/^https/.test(url)) return true;
			return !urls.includes(url.replace(/^http:/, "https:"));
		});
		let m3u8Ary = [];
		let mp4Ary = [];
		if (!document.getElementById("download_panel")) this.create();
		let m3u8list = document.querySelector(css.m3u8list);
		let mp4list = document.querySelector(css.mp4list);
		urls.forEach((url) => {
			let ext = url.replace(/^.+\.(\w+)(\?.+)?$/, "$1");
			ext = (/^\w+$/.test(ext)) ? ext.toLowerCase() : "etc";
			let ism3u8 = ext=="m3u8";
			let ismpd = ext=="mpd";
			let list = (ism3u8 || ismpd) ? m3u8list : mp4list;
			let extContainer = list.querySelector("div.download_panel_container_" + ext);
			if (!extContainer) {
				extContainer = createNode("div", null, {"class":"download_panel_container_" + ext}, list);
				createNode("div", (ext=="etc") ? null : ext, {"class":"download_panel_container_ext"}, extContainer);
				createNode("div", null, {"class":"download_panel_container_list"}, extContainer);
			};
			let div = createNode("div", null, null, list.querySelector("div.download_panel_container_" + ext + ">div.download_panel_container_list"));
			if (!ism3u8 && !ismpd) {
				mp4Ary.push(url);
				createNode("a", title, {"href":url}, div);
			} else {
				m3u8Ary.push(url);
				if (isDrm) {
					createNode("a", "SAMPLE-AES:" + title, {"href":url, "class":"sampleaes"}, div);
				} else {
					createNode("a", title, {"href":url}, div);
				}
				if (ismpd) return null;
				if (isDrm) return null;
				div.addEventListener("mouseover", ((str) => {
					let callback = (ev) => {
						ev.currentTarget.removeEventListener("mouseover", callback);
						XmlHttpRequest.get(str).then((m3u8) => {
							let list = [];
							let streamInf = m3u8.match(/^#EXT-X-STREAM-INF:.+[\r\n]+.+$/gm) || [];
							let media = m3u8.match(/^#EXT-X-MEDIA:.+$/gm) || [];
							let iFrameStreamInf = m3u8.match(/^#EXT-X-I-FRAME-STREAM-INF:.+$/gm) || [];
							let urls = Array.from(document.querySelectorAll("div.download_panel_addm3u8>a")).map((node) => {return node.href.replace(/^https/, "http")});
							streamInf.forEach((str) => {
								str = str.replace(/^#.+?:/, "").split(/[\r\n]+/);
								let [inf, m3u8] = str;
								inf = inf.split(",").filter((str) => {return /^(bandwidth|resolution|audio)/i.test(str)}).join(" ");
								if (/audio=/i.test(inf)) inf = "Video Only " + inf;
								list.push({"inf":inf, "m3u8":m3u8});
							});
							media.forEach((str) => {
								str = str.replace(/^#.+?:/, "").split(",").filter((str) => {return /^(group-id|uri)/i.test(str)});
								let [inf, m3u8] = str;
								m3u8 = m3u8.replace(/^uri="(.+)"$/i, "$1");
								list.push({"inf":"Audio Only " + inf, "m3u8":m3u8});
							});
							iFrameStreamInf.forEach((str) => {
								str = str.replace(/^#.+?:/, "").split(",").filter((str) => {return /^(bandwidth|resolution|uri)/i.test(str)});
								let m3u8 = str.pop();
								let inf = "I-FRAME " + str.join(" ")
								m3u8 = m3u8.replace(/^uri="(.+)"$/i, "$1");
								list.push({"inf":inf, "m3u8":m3u8});
							});
							list.forEach((obj) => {
								if (!/^http/.test(obj.m3u8)) obj.m3u8 = (/^\//.test(obj.m3u8)) ? (url.replace(/^(https?:\/\/[^\/]+).+$/, "$1") + obj.m3u8) : url.replace(/[^\/]*m3u8.*/, obj.m3u8);
								let isContain = urls.includes(obj.m3u8.replace(/^https/, "http"));
								let addURL = createNode("div", null, {"class":"download_panel_addm3u8"}, div, "after");
								if (isContain) {
									createNode("span", obj.inf, null , addURL);
								} else {
									XmlHttpRequest.get(obj.m3u8)
									.then((m3u8) => {
										createNode("a", obj.inf, {"href":obj.m3u8}, addURL);
									});
								};
							});
						});
					};
					return callback;
				})(url));
			};
		});
		let m3u8btn = document.querySelector(css.m3u8btn);
		let mp4btn = document.querySelector(css.mp4btn);
		if (m3u8Ary.length!=0) m3u8btn.textContent = m3u8Ary.length;
		if (mp4Ary.length!=0) mp4btn.textContent = mp4Ary.length;
		return (m3u8Ary.length==0 && mp4Ary.length==0);
	}
	static error(message) {
		if (!message) message = "URL取得に失敗しました。";
		if (!document.getElementById("download_panel")) this.create();
		let list = document.querySelector(css.errorlist);
		let btn = document.querySelector(css.errorbtn);
		btn.textContent = 1;
		createNode("div", message, null, list);
		return false;
	}
};

(() => {
	addStyle([
//表示位置
	css.panel + " {position:fixed; top:10px; right:10px; z-index:1000000;}"
//レイアウト
	, css.panel + " {display:flex; flex-direction:column;}"
	, css.topcontent + " {display:flex; flex-direction:row; justify-content:flex-end}"
	, css.list + ">div {display:flex; flex-direction:row;}"
//文字列センタリング
	, css.btn + "," + css.list + " div.download_panel_container_ext {display:flex; justify-content:center; align-items: center;}"
//表示制御
	, css.panel + ":hover " + css.list + ":not(:empty) {display:block;}"
//色
	, "div.download_panel_color_m3u8 {background-color:rgba(224, 255, 255, 0.5); color:black;}"
	, "div.download_panel_color_mp4 {background-color:rgba(255, 192, 203, 0.5); color:black;}"
	, "div.download_panel_color_error {background-color:rgba(255, 0, 0, 0.5); color:white;}"
	, "div.download_panel_color_m3u8 a.sampleaes {color:red!important;}"
	, "div.download_panel_addm3u8>a {color:orange;}"
	, "div.download_panel_container_list>div:not(.download_panel_addm3u8)>* {color:black;}"
//文字列
	, css.list + " a {text-decoration:none;}"
	, css.bottomcontent + " * {font-size:small;}"
	, css.btn + " {font-size:large;}"
//ボーダー
	, css.brd + " {border-style:solid; border-width:1px; border-color:rgb(191, 191, 191); border-radius:10px;}"
//非表示
	, css.btn + ":empty {display:none;}"
	, css.list + " {display:none;}"
//その他
	, css.btn + " {position:relative; width:50px; height:50px; cursor:pointer;}"
	, css.list + " {padding:10px 30px; white-space:nowrap; overflow-x:auto; overflow-y:auto; max-width:" + window.innerWidth*0.7 + "px; min-height:50px; max-height:" + window.innerHeight*0.4 + "px;}"
	, css.list + " div.download_panel_container_ext {width:70px;}"
	, css.list + " div.download_panel_container_list {overflow-x:hidden; text-align:left; padding:10px;}"
	]);
	new CreateURL().execute()
	.then((obj) => {
		if (!obj) return Promise.resolve();
		Panel.update(obj.title, obj.url, obj.drm)
	})
	.catch((message) => {return Panel.error(message)})
})();