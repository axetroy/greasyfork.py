// ==UserScript==
// @name Discuz论坛头像上传助手
// @author greasepig & 枫谷剑仙
// @description 突破图片尺寸、GIF帧数限制，无损上传
// @version 1.2.3
// @namespace http://www.mapaler.com/
// @include */home.php?mod=spacecp&ac=avatar*
// @include */admin.php?m=user&a=login*
// @icon	data:image/gif;base64,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
// @run-at document-end
// @grant GM_xmlhttpRequest
// ==/UserScript==

(function(){
	var scriptVersion = typeof(GM_info)!="undefined" ? GM_info.script.version : "无扩展支持版"; //本程序的版本

	var mycamera, action, query, ucpage;
	var CamRequestName = "camsrc"; //传递url参数用参数名
	var img_Background = "data:image/gif;base64,R0lGODlhEAAQAIAAAN/f3////yH5BAAHAP8ALAAAAAAQABAAAAIfhG+hq4jM3IFLJhoswNly/XkcBpIiVaInlLJr9FZWAQA7";
	var img_AddImg = "data:image/gif;base64,R0lGODlhIAAgAJEAAFNTYr/P/////wAAACH5BAEHAAIALAAAAAAgACAAAAJhlI8Sy5sPX2uxwskAsFzhoHXWB25iRIbn9alrkpovEs9wK9se5qLkD3TsgkTKsFjUIJclJlLpJEKjwCm1JtBot7GtV/XVdsNaDlZ3zORsZ12bjUMb3jP6y77Cv8jyA99SAAA7";
	var img_Loading = "data:image/gif;base64,R0lGODlhKAAoAIAAAGNjc////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJBwABACwJAAUAFgAIAAACGIyPAMidupw0ME6pbsj6bdhRFRhWX3hkBQAh+QQJBwABACwNAAYAFQALAAACGwwQqXm71xxEzsA6K6OY6w+G4kiWm6lkqLoiBQAh+QQJBwABACwSAAUAEQARAAACHQwQqbt3DJNDEb6KLc3S8X594UeW5omWYzaRrYsUACH5BAkHAAEALBcABgALABUAAAIbDBCpebfa0GNy2ouzdbt1PoHaSJZmd0Vf9TgFACH5BAkHAAEALBsACQAIABYAAAIaDBCZd2rsXpy02hubY0jx3GHiuIUL5KFpVAAAIfkECQcAAQAsFwANAAsAFQAAAhyMbwCIqpwcjLPai7Nmb7oFfVW3lQ0YSinJoUwBACH5BAkHAAEALBIAEgARABEAAAIcjI8IkH27XINMpmiz3rx7jW0UN5KVcoKQGapdAQAh+QQJBwABACwNABcAFQALAAACG4yPeQDqydibsc0nr968o6yAUBSSpWhUmFU+BQAh+QQJBwABACwJABsAFgAIAAACFwwQqcuGd5p0EM5W3ZVx981ZICaOzCcVACH5BAkHAAEALAYAFwAVAAsAAAIcDBCpy3rX4npIWmiz3rz7WTWY+JAjeCaUlDpIAQAh+QQJBwABACwFABIAEQARAAACHQwQqbt3DJNDEb6Ks968e31tEzeS1GedoGOGa1AAACH5BAkHAAEALAYADQALABUAAAIcDBCpebfa0GNy2ouz3tnZ+DWXx5XmQ6LiBIZBAQAh+QQJBwABACwFAAkACAAWAAACGIwNcJh67V5ctNqLE4WL94mF4vhtzaeVBQAh+QQJBwABACwGAAYACwAVAAACHIxvAIiqnByMs9ob3nQL8qph4kiWYOdJaciwSAEAIfkECQcAAQAsBQAFABEAEQAAAh6MjwiQfbtcg0ymeKt9cHPsBWBIluaJTppHka27bgUAIfkECQcAAQAsBgAGABUACwAAAhuMbwCIyqcci+tRG1+qWPsPhqInjVBmbmW6mgUAOw==";
	var img_Success = "data:image/gif;base64,R0lGODlhKAAoAIAAAAD/AP///yH5BAEHAAEALAAAAAAoACgAAAJtjI+py+0Po5y0gltzuFxPDnoQGIoO2ZkMiqkL27oJLCt0PbM4cu9bvwO+YhKhrRSBAU6ooo7ZfBiPz8aUGh1mR9Vcl7s9XK3CMTSr9KR/YYvyq3m343Kiqr6s1X1vn2HtBxeE5CdmV4iYqKhQAAA7";
	var img_error = "data:image/gif;base64,R0lGODlhKAAoAIAAAP8AAP///yH5BAEHAAEALAAAAAAoACgAAAJ8jI+py+0Po5wJWLoscPri021ZKGJkiZxopI7npK5gC8Uc3diP7pISn8KxhAHgD2eEtZKUGPFTdHagPSY1ar1ifdoqtzuTgg3Sabcc0tqyO+SzRmQrmPLwd/6u5O3p3D744qWhFKh3N3RIlohohjdI1cfweDU5ZnmJmYlZAAA7"
	mycamera = document.getElementsByName('mycamera')[0];
	
	var out = document.createElement('div');
	out.id = "discuz-avatar";
	var domHTML = '';
	var domHTML = [];
	domHTML.push(
		'<style type="text/css">',
		'#discuz-avatar {width:448px; padding:20px 0px; border:1px solid #CCC; background-color: white; text-align:center;}',
		'#discuz-avatar td {padding:10px; vertical-align: top; text-align: center;}',
		'#discuz-avatar td span {display:block; padding:10px 0;}',
		'.img_div {display:table-cell; vertical-align: middle; border: 1px solid #CCC; cursor: pointer; background: url("'+img_Background+'");}',
		'#big {width:200px; height:250px;}',
		'#middle {width:120px; height:160px;}',
		'#small {width:48px; height:48px;}',
		'#img_b {max-width: 200px; max-height: 250px;}',
		'#img_m {max-width: 120px; max-height: 160px;}',
		'#img_s {max-width: 48px; max-height: 48px;}',
		'#submit {width:60px;}',
		'#status {display:none; width:40px; height:40px; margin:0px auto;}',
		'#status.loading {background: url('+img_Loading+') no-repeat center;}',
		'#status.success {background: url('+img_Success+') no-repeat center;}',
		'#status.error {background: url('+img_error+') no-repeat center;}',
		'#progress {padding: 5px;}',
		'</style>',
		'<h3>Discuz论坛头像上传助手 v' + scriptVersion + '</h3><table><tr><td><div id="big" class="img_div"><img id="img_b" src=""></div><span>大头像<br />200×250</span></td><td><div id="middle" class="img_div"><img id="img_m" src=""></div><span>中头像<br />120×120</span></td><td><div id="small" class="img_div"><img id="img_s" src=""></div><span>小头像<br />48×48</span></td></tr></table><div id="status"></div><div id="progress"></div><input id="submit" type="button" value="提交" disabled="disabled"><hr/><h3>常见问题</h3><div class="quote">新版UCenter服务端限制了头像尺寸（本脚本无法破解），上传100%后显示<div class="blockcode">&lt;?xml version="1.0" ?&gt;&lt;root&gt;&lt;face success="0"/&gt;&lt;/root&gt;</div>则可能是该原因，默认的尺寸限制我已经标注在头像名称下面了。</div><div class="quote">上传显示<div class="blockcode">Access denied for agent changed</div>可能是Discuz和UCenter通信没配好，请直接联系网站管理员。</div>'
	);
	out.innerHTML = domHTML.join("\r\n");
		
	if (mycamera)
	{
		ucpage = false;
		host = mycamera.src.match(/^https?:\/\/([^\/]+)\/.*/);
		if (document.domain == host[1] || typeof(GM_xmlhttpRequest) == "function")
		{
			query = mycamera.src.match(/^(.*)images\/camera\.swf.*(&appid=\d+).*(&input=.+&agent=[^&]+)/);
			action = query[1] + 'index.php?m=user&inajax=1&a=rectavatar' + query[2] + query[3] + '&avatartype=virtual';
			mycamera.parentNode.appendChild(out);
		}
		else
		{
			var out = document.createElement('div');
			var outuclink = document.createElement('a');
			outuclink.href = "http://"+host[1]+"/admin.php?m=user&a=login&iframe=&sid=&"+CamRequestName+"=" + escape(mycamera.src);
			outuclink.innerHTML = "UCenter页面链接";
			outuclink.target = "_blank"
			
			var outcamerasrc = document.createElement('input');
			outcamerasrc.id = "camera-src";
			outcamerasrc.type = "text";
			outcamerasrc.className = "px";
			outcamerasrc.value = mycamera.src;
			
			var outcamerasrclabel = document.createElement('label');
			outcamerasrclabel.innerHTML = "上传头像Flash链接";
			outcamerasrclabel.appendChild(outcamerasrc);
			
			out.innerHTML = "本站UC域名与论坛不一致，因为跨域安全问题请到UCenter页面输入"
			out.appendChild(document.createElement('br'));
			out.appendChild(outuclink);
			out.appendChild(document.createElement('br'));
			out.appendChild(outcamerasrclabel);
			mycamera.parentNode.appendChild(out);
		}
	}
	else
	{
		ucpage = true;
		var Request = new Object(); //获取网页参数
		Request = GetRequest();
		mycamera = document.getElementById("loginform");
		if (mycamera == null) mycamera = document.body.lastChild;
		mycamera.parentNode.appendChild(out);
		
		var outcamerasrc = document.createElement('input');
		outcamerasrc.id = "camera-src";
		outcamerasrc.type = "text";
		outcamerasrc.className = "px";
		outcamerasrc.value = unescape(Request[CamRequestName]); //获取传递的参数
		
		var outcamerasrclabel = document.createElement('label');
		outcamerasrclabel.innerHTML = "填写上传Flash链接";
		outcamerasrclabel.appendChild(outcamerasrc);
		
		var outcameradiv = document.createElement('div');
		outcameradiv.appendChild(outcamerasrclabel);
		
		var discuz_avatar = document.getElementById("discuz-avatar");
		discuz_avatar.insertBefore(outcameradiv,discuz_avatar.getElementsByTagName("input")[0]);
	}

	var btnSubmit = document.getElementById("submit");
	var statusIcon = document.getElementById("status");
	var uploadProgress = document.getElementById("progress");
	var avatars = {
		big: {img: document.getElementById("img_b"), hex: null},
		middle: {img: document.getElementById("img_m"), hex: null},
		small: {img: document.getElementById("img_s"), hex: null}
	};
	avatars.big.img.src = img_AddImg;
	avatars.middle.img.src = img_AddImg;
	avatars.small.img.src = img_AddImg;
	function GetRequest() {
		var url = location.search; //获取url中"?"符后的字串
		var theRequest = new Object();
		if (url.indexOf("?") != -1)
		{
			var str = url.substr(1);
			strs = str.split("&");
			for(var i = 0; i < strs.length; i ++) 
			{
				theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	}
	
	function readFile (onloadFunc) {
		var reader = new FileReader();
		reader.onload = onloadFunc;
		return reader;
	}

	function showImage(target, file){
		readFile(function(e){
			avatars[target].img.src = e.target.result;
		}).readAsDataURL(file);
	}

	function byte2hex(bytes) {
		var uint8Array = new Uint8Array(bytes);
		if (typeof(GM_xmlhttpRequest) == "function")
		{ //使用了GM_xmlhttpRequest后将无法获得Uint8Array的值，但是可以通过Join获取字符串
			var sliceChar = "\n";
			var arrstr = uint8Array.join(sliceChar);
			var uint8Array = arrstr.split(sliceChar);
		}
		var hex = [];
		for (var i = 0; i < uint8Array.length; i++) {
			uint8Array[i] = parseInt(uint8Array[i]); //将每个由字符串转换回数字
			hex.push(uint8Array[i] < 16 ? '0' + uint8Array[i].toString(16) : uint8Array[i].toString(16));
		}
		var outStr = hex.join("").toUpperCase();
		return outStr;
	}

	function getImageHexString(target, file){
		readFile(function(e){
			avatars[target].hex = byte2hex(e.target.result);
			if (avatars.big.hex && avatars.middle.hex && avatars.small.hex) {
				btnSubmit.removeAttribute("disabled");
			}
		}).readAsArrayBuffer(file);
	}

	function handleFile(target, file){
		var imageType = /image\/.*/;
		if (!file.type.match(imageType)) {
			alert("不是有效的图像文件！");
			return;
		}
		if (file.size > 2097152) {
			alert("文件大小必须在2M以内!");
			return;
		}
		avatars[target].img.src = "http://bcs.duapp.com/user-img/discuz-avatar/loading.gif";
		setTimeout(function(){
			getImageHexString(target, file);
			showImage(target, file);
		}, 100);
	}

	function bindOpenFile(id) {
		var handleBox = document.getElementById(id);
		handleBox.addEventListener("click", function(e){
			var file = document.createElement("input");
			file.type = "file";
			file.addEventListener("change", function(e){
				handleFile(id, e.target.files[0]);
			});
			file.click();
		}, false);
	}

	function gm_post(url, post) {
		GM_xmlhttpRequest({
			method: "POST",
			url: url,
			data: post,
			headers: {"Content-Type": "application/x-www-form-urlencoded"},
			onload: onloadHandler,
			onerror: onerrorHandler,
			upload: {onprogress: uploadOnprogressHandler}
		});
	}

	function ajaxPost(url, post) {
		var xhr = new XMLHttpRequest();
		// xhr.onload = onloadHandler;
		xhr.onload = function(e) {onloadHandler(e.target)};
		xhr.onerror = onerrorHandler;
		// xhr.onloadend = onloadendHandler;
		xhr.upload.onprogress = uploadOnprogressHandler;
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(post);
	}

	function onloadHandler(response) {
		uploadProgress.textContent = "100%";
		var xml = (new DOMParser()).parseFromString(response.responseText, "text/xml");
		// unsafeWindow.console.log(xml);
		if (xml) {
			var success = xml.querySelector('face');
			if (success != null && success.getAttribute("success") == 1) {
				statusIcon.className = "success";
			} else {
				statusIcon.className = "error";
				var message = xml.querySelector('message');
				if (message)
					uploadProgress.textContent = message.getAttribute('type') + ': ' + message.getAttribute('value');
				else uploadProgress.textContent = response.responseText;
			}
		} else {
			statusIcon.className = "error";
			uploadProgress.textContent = 'error: no responseXML';
		}
		onloadendHandler();
	}

	function onerrorHandler(e) {
		statusIcon.className = "error";
		onloadendHandler();
	}

	function onloadendHandler(e) {
		btnSubmit.removeAttribute("disabled");
	}

	function uploadOnprogressHandler(e) {
		if (e.lengthComputable) {
			uploadProgress.textContent = Math.round(100 * e.loaded / e.total) + "%";
		}
	}

	function upload() {
		if (ucpage)
		{
			mycamera.src = document.getElementById("camera-src").value;
			query = mycamera.src.match(/^(.*)images\/camera\.swf.*(&appid=\d+).*(&input=.+&agent=[^&]+)/);
			action = query[1] + 'index.php?m=user&inajax=1&a=rectavatar' + query[2] + query[3] + '&avatartype=virtual';
		}
		else
		{
			query = mycamera.src.match(/^(.*)images\/camera\.swf.*(&appid=\d+).*(&input=.+&agent=[^&]+)/);
			action = query[1] + 'index.php?m=user&inajax=1&a=rectavatar' + query[2] + query[3] + '&avatartype=virtual';
		}
		var post = "avatar1=" + avatars.big.hex + "&avatar2=" + avatars.middle.hex + "&avatar3=" + avatars.small.hex + "&urlReaderTS=" + Date.now();
		btnSubmit.setAttribute("disabled", "disabled");
		statusIcon.style.display = "block";
		statusIcon.className = "loading";
		if(typeof(GM_xmlhttpRequest) == "function")
			gm_post(action, post);
		else
			ajaxPost(action, post);
	}

	bindOpenFile("big");
	bindOpenFile("middle");
	bindOpenFile("small");
	btnSubmit.addEventListener("click", upload);
})();