// ==UserScript==
// @name         JS practice for S1
// @namespace    http://tampermonkey.net/
// @version      0.146
// @description  JS练习脚本
// @author       Lery
// @include      *://*.saraba1st.com/2b/*
// @include      *://*.stage1st.com/2b/*
// @include      *://*.stage1.cc/2b/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @require      https://cdn.bootcss.com/store.js/1.3.20/store.min.js
// ==/UserScript==

//自动对旧链接进行修改跳转
let pattern0 = new RegExp('^([^.]+\\.)?(saraba1st|stage1(st)?)\\.(com|cc)/2b/read');
if(pattern0.test(document.URL)){
	location.href="https://" + location.hostname + "/2b/thread-" + location.href.split("tid-")[1].split(".html")[0] + "-1-1.html";
}

//修改网页标题后缀
let pattern1 = new RegExp('^(?:论坛|.+?)(?=(?:论坛)?(?: - Stage1st)? - stage1\\/s1 游戏动漫论坛$)');
if(pattern1.test(document.title)){
   document.title = pattern1.exec(document.title) + " - STAGE1";
}

//自动签到
if(document.querySelector('a[href*="study_daily_attendance-daily_attendance.html"]')){//检测到签名链接
    ajaxget(document.querySelector('a[href*="study_daily_attendance-daily_attendance.html"]').href);//后台获取链接→进行签名
	document.querySelector('a[href*="study_daily_attendance-daily_attendance.html"] + .pipe').remove();//删除链接旁的分隔线
    document.querySelector('a[href*="study_daily_attendance-daily_attendance.html"]').remove();//删除链接
}

//点击更换漫区随机图
if(document.querySelector('img[src^="http://ac.stage3rd.com/S1_ACG_randpic.asp"]')){
    let changepic = document.querySelector('img[src^="http://ac.stage3rd.com/S1_ACG_randpic.asp"]');
    changepic.onclick = function(){
        document.querySelector('img[src^="http://ac.stage3rd.com/S1_ACG_randpic.asp"]').src="http://ac.stage3rd.com/S1_ACG_randpic.asp"+"?t=" + Math.random();
    };
}

//记录位置
var timer = null;
window.addEventListener('scroll', function () {
    if (typeof timer === 'number') {
        clearTimeout(timer);
    }
    timer = setTimeout(function () {
        //添加onscroll事件处理
    }, 500);
}, false);

//自定义快捷入口
function createLink(name, addr) {
    let node = document.createElement("li");
    if(window.location.pathname == "/2b/" + addr)
        node.className = "a";
    let link = document.createElement("a");
    link.setAttribute("href",addr);
    link.setAttribute("hidefocus","true");
    link.appendChild(document.createTextNode(name));
    node.appendChild(link);
    return node;
}

//找到导航栏位置
document.getElementsByTagName("h2")[0].childNodes[0].setAttribute("href", "./forum.php");
var linkList = document.getElementById("nv").getElementsByTagName("ul")[0];

//增加快捷入口
GM_xmlhttpRequest({
  method: "GET",
  url: "https://" + location.hostname + "/2b/forum.php?mod=ajax&action=forumjump",//获取快捷导航栏板块页面
  onload: function(data){
	  //识别获取收藏板块列表
      let pattern = new RegExp('<div id="flsrchdiv">[\\s\\S]+(?=<script type)');
      let xmldata = pattern.exec(data.response);
      let parser = new DOMParser();
      let doc = parser.parseFromString(xmldata, "application/xml");
      let forumItems = doc.querySelectorAll('.jump_bdl li:nth-child(3) p a');
      //删除原快捷入口
      while(linkList.firstChild) {
          linkList.removeChild(linkList.firstChild);
      }
      //生成新快捷入口
      if(forumItems.length >= 1){
          let pattern = new RegExp('.*?(?=论坛|$)');
          for(let i = 0; i < forumItems.length; i++){
              let item = forumItems[i];
              let itemText = pattern.exec(item.textContent);
              let href = item.getAttribute('href');
              linkList.appendChild(createLink(itemText,href));
          }
      }
	  /*在此处添加您的自定义快捷入口，格式为 linkList.appendChild(createLink("入口名称","主域名/2b/后面的地址")); ，参考下面提供的默认项*/
      linkList.appendChild(createLink("抹布","home.php?mod=space&do=friend&view=blacklist"));
      linkList.appendChild(createLink("客户端","thread-1486168-1-1.html"));
	  linkList.appendChild(createLink("我的回复","forum.php?mod=guide&view=my&type=reply"));
  }
});

//记录并显示上次阅读的界面
let pattern5 = new RegExp('forum\\.php\\?mod=(forumdisplay|viewthread)|(forum|thread)(-[0-9]+)+\\.html');
if(pattern5.test(document.URL)){
	if (!store.enabled) {
		alert('浏览器不支持本地缓存或开启了私隐模式，功能将失效。');
	}else{
		let lasttime = store.get('lasttime') ? store.get('lasttime') : {};
		let lastread = store.get('lastread') ? store.get('lastread') : {};
		let lastrc = store.get('lastrc') ? store.get('lastrc') : {};
		//若检测为帖内
		if(unsafeWindow.tid){
			//记录储存浏览日期（获取毫秒数后转化为小时数，加上时区差值）
			let tiddate = new Date();
			let date = tiddate.getTime() / 3600000 + (tiddate.getTimezoneOffset() / 60);
			date = date ? date : 1;
			lasttime[unsafeWindow.tid] = date;
			store.set('lasttime', lasttime);
			//记录储存回复数（获取api数据后json格式化并提取回复数）
			GM_xmlhttpRequest({
			  method: "GET",
			  url: "https://" + location.hostname + "/2b/api/mobile/index.php?module=viewthread&tid=" + unsafeWindow.tid,
			  onload: function(data){
				  let json = JSON.parse(data.responseText);
				  var replies = json.Variables.thread.replies;
				  replies = replies ? replies : 1;
				  lastrc[unsafeWindow.tid] = replies;
				  store.set('lastrc', lastrc);
			  }
			});
			//记录储存页数（独处高亮页码按钮）
			let page = document.querySelector('#pgt > div > div > strong');
			page = page ? page.textContent : 1;
			lastread[unsafeWindow.tid] = page;
			store.set('lastread', lastread);
		}else{
			let table = document.getElementsByName('moderate')[0].children[2];
			//若检测为板块主题列表
			if(table) {
				let tbodys = table.getElementsByTagName('tbody');
				for(i = 0;i < tbodys.length;i++) {
					let tbody = tbodys[i];
					let [ordertype, tid] = tbody.id.split('_');
					if(tid){
						let page = lastread[tid];
						if(page){
							//根据记录时间和当前时间差值生成对应RGB色值
							let currentdate = new Date();
							let cdate = currentdate.getTime() / 3600000 + (currentdate.getTimezoneOffset() / 60);
							let hours = cdate - lasttime[tid];
							if(hours <= 1) {
								var fcolor = 'rgb(192,51,34)';
							}else if(hours > 1 && hours <= 24){
								var fcolor = 'rgb(' + Math.floor(192-hours) + ',' + Math.floor(51+(hours/4)) + ',' + Math.floor(34+(hours/2)) + ')';
							}else if(hours > 24 && hours <= 168){
								var fcolor = 'rgb(' + Math.floor(168-((hours-24)*5/9)) + ',' + Math.floor(57+((hours-24)/6)) + ',' + Math.floor(46+((hours-24)/4)) + ')';
							}else{
								var fcolor = 'rgb(85,83,83)';
							}
							//设定返回最后阅读页标记
							let oldrc = lastrc[tid];
							let ele = document.createElement('a');
							ele.style.color = fcolor;
							ele.style.fontWeight = 'bold';
							ele.style.padding = '1px 3px';
							ele.style.border = '1px solid ' + fcolor;
							ele.text = '回第' + page + '页';
							let prevpage = document.querySelector('#pgt > div > strong');
							prevpage = prevpage ? prevpage.textContent : 1;
							if(document.querySelector('#' + tbody.id + ' a').href.indexOf("forum.php")!=-1){
								ele.href = 'forum.php?mod=viewthread&tid=' + tid + '&extra=page%3D' + prevpage + '&page=' + page;
							}else{
								ele.href = 'thread-' + tid + '-' + page + '-' + prevpage + '.html';
							}
							let currentrc = parseInt(document.querySelector('#' + tbody.id + ' > tr > .num > .xi2').innerHTML);//读取当前回复数
							//根据回复数差决定是否显示新增值
							if(currentrc > oldrc) {
								let rc = document.createElement('div');
								let node=document.createTextNode('+' + String(currentrc - oldrc));
								rc.appendChild(node);
								rc.style.display = 'inline';
								rc.style.color = '#F6F7EB';
								rc.style.backgroundColor = fcolor;
								rc.style.fontWeight = 'bold';
								rc.style.padding = '1px 3px 1px 1px';
								rc.style.border = '1px solid ' + fcolor;
								rc.style.borderRadius = '0 4px 4px 0';
								ele.style.borderRadius = '4px 0 0 4px';
								document.querySelector('#' + tbody.id + ' > tr > th').appendChild(ele);
								document.querySelector('#' + tbody.id + ' > tr > th').appendChild(rc);
							}else{
								ele.style.borderRadius = '4px';
								document.querySelector('#' + tbody.id + ' > tr > th').appendChild(ele);
							}
						}
					}
				}
			}
		}
	}
}