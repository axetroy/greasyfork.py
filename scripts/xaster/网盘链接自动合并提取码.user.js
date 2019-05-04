// ==UserScript==
// @name         网盘链接自动合并提取码
// @namespace    netdisk link
// @version      1.0
// @description  自动将网盘链接和提取码合并为整合链接
// @include      *
// @run-at       document-end
// ==/UserScript==
(function(){
	//runningman-fan 免点击显示下载地址
    if (/^http:\/\/www\.runningman-fan\.com\/.+\.html/.test(location.href) && document.querySelector('.content-main #down')) document.querySelector('.content-main #down').outerHTML=document.querySelector('#button_box .buttons').outerHTML;
    var common_reg = /\s*([百度云盘提取密码码访问码]+|360yun|yun|\d{3,4}[pP])[:：]?\s*(<[^>]+>)?\s*([0-9a-zA-Z]{4,})\s*/;
	var pw_reg = /#[0-9a-zA-Z]{4,}/;
	var standBy = false,standByList = [/http:\/\/weibo\.com\/.*/i];//将需要等待js运行之后再运行本代码的，将href正则写入数组
	var prefs = {
		    tieba:['http://jump.bdimg.com/safecheck'],//这个有大量的误操作，因为这只是新浪的短网址，而不一定是网盘，自选使用
        	tpan:['http://t.cn/'],//这个有大量的误操作，因为这只是新浪的短网址，而不一定是网盘，自选使用
		    pan:['http://pan.baidu.com/s/'],//第一个参数定义链接类型，第二个可选参数：后续紧跟着的提取码之类的前缀提示符
	        pans:['https://pan.baidu.com/s/'],
            pan2:['http://pan.baidu.com/share/'],
            pan2s:['https://pan.baidu.com/share/'],
            pan3:['http://pan.baidu.com/disk/'],
            pan3s:['https://pan.baidu.com/disk/'],
            pan4:['http://yun.baidu.com/disk/'],
            pan4s:['https://yun.baidu.com/disk/'],
            pan5:['http://yun.baidu.com/s/'],
            pan5s:['https://yun.baidu.com/s/'],
            pan6:['http://yun.baidu.com/share/'],
            pan6s:['https://yun.baidu.com/share/'],
            pan7:['http://eyun.baidu.com/s/'],
            pan7s:['https://eyun.baidu.com/s/'],
            pan8:['http://eyun.baidu.com/enterprise/'],
            pan8s:['https://eyun.baidu.com/enterprise/'],
	        yun:['http://yunpan.cn/'],
            yuns:['https://yunpan.cn/'],
            yun2:['http://yunpan.360.cn/'],
            yun2s:['https://yunpan.360.cn/'],
	        wpan:['http://vdisk.weibo.com/lc/'],
            wpans:['http://vdisk.weibo.com/lc/'],
            wpan2:['http://vdisk.weibo.com/s/'],
            wpan2s:['http://vdisk.weibo.com/s/'],
            weiyun:['http://share.weiyun.com/'],
            weiyuns:['https://share.weiyun.com/'],
	};
	function panlinkWithPw(){
		var href = window.location.href,site = null,i = 0;
		while (standByList[i]) if(standByList[i++].test(href)) {standBy = true; break;}
		var panlinks,r = null,reg,i,nC,nN,pN,pos,subS;
		for (var key in prefs) {
			reg = prefs[key][1] || common_reg;
		//添加支持文本状态的网盘地址
        var textPanLink = new RegExp(prefs[key][0].replace(/\./g,'\\.')+'\\w+(?=\\s|[^\\x00-\\xff])','g');
        if (textPanLink.test(document.body.innerHTML)) document.body.innerHTML = document.body.innerHTML.replace(textPanLink, '$&'.link('$&'));
			panlinks = document.querySelectorAll('a[href^="'+prefs[key][0]+'"]'),i=0;
			while(panlinks[i]){
				if(pw_reg.test(panlinks[i].href)) {i++;continue;}
				nN = panlinks[i].nextSibling;
				if(nN!=null) {
					if(nN.nodeType===1)nC=nN.innerHTML;
					else if(nN.nodeType===3) nC=document.all?nN.innerText:nN.textContent;
					r = nC.match(reg);
					if(r!=null) panlinks[i].href += '#'+r[3];
				}
				if(nN==null||r==null) {
					//处理盘密码就在链接的文本本身上
					r = panlinks[i].innerHTML.match(reg);
					if(r!=null) panlinks[i].href += '#'+r[3];
					else {
						pN = panlinks[i].parentNode.parentNode.textContent;
						pos = pN.indexOf(panlinks[i].href);
						subS = pN.substr(pN.indexOf(panlinks[i].href)+1);
						var pos_end = subS.length,temp;
						for (var key1 in prefs) {
							temp = pN.indexOf(prefs[key1][0]);
							if(temp==-1) continue;
							if(temp!=pos&&temp<pos_end) pos_end = temp;
						}
						subS = subS.substr(0,pos_end-1);
						r = subS.match(reg) || panlinks[i].parentNode.textContent.match(reg) || pN.match(reg);
						if(r!=null) panlinks[i].href += '#'+r[3];
					}
				}
				i++;
			}
		}	
	}
	function addMutationObserver(selector, callback) {
		var watch = document.querySelector(selector);
		if (!watch) return;
		var observer = new MutationObserver(function(mutations){
			var nodeAdded = mutations.some(function(x){ return x.addedNodes.length > 0; });
			if (nodeAdded) {
			callback();
			}
		});
		observer.observe(watch, {childList: true, subtree: true });
	}
	// 添加下一页和不刷新页面的支持
	if (location.host.indexOf('.ys168.com') > 0) addMutationObserver('#mainMenu', function(){panlinkWithPw();});
	addMutationObserver('#ct', function(){
		panlinkWithPw();
	});
	if(standBy) {document.onreadystatechange = function () { if(document.readyState == "complete") panlinkWithPw(); }}
	else panlinkWithPw();
})();