// ==UserScript==
// @name Discuz论坛头像上传助手
// @author greasepig
// @description 突破图片尺寸、GIF帧数限制，无损上传
// @version 1.0.6
// @namespace http://userscripts.org/users/greasepig
// @include http://*/home.php?mod=spacecp&ac=avatar*
// @run-at document-end
// @grant GM_xmlhttpRequest
// ==/UserScript==

(function(){
	var mycamera, action, query;
	mycamera = document.getElementsByName('mycamera')[0];
	if (mycamera == null) return;
	query = mycamera.src.match(/^(.*)images\/camera\.swf.*(&appid=\d+).*(&input=.+&agent=[^&]+)/);
	action = query[1] + 'index.php?m=user&inajax=1&a=rectavatar' + query[2] + query[3] + '&avatartype=virtual';

	var out = document.createElement('div');
	out.innerHTML = '<style>#discuz-avatar {width:448px; padding:20px 0px; border:1px solid #CCC; background-color: white; text-align:center;}#discuz-avatar td {padding:10px; vertical-align: top; text-align: center;}#discuz-avatar td span {display:block; padding:10px 0;}.img_div {display:table-cell; vertical-align: middle; border: 1px solid #CCC; cursor: pointer; background: url("http://bcs.duapp.com/user-img/discuz-avatar/bg.png");}#big {width:200px; height:250px;}#middle {width:120px; height:160px;}#small {width:48px; height:48px;}#img_b {max-width: 200px; max-height: 250px;}#img_m {max-width: 120px; max-height: 160px;}#img_s {max-width: 48px; max-height: 48px;}#submit {width:60px;}#status {display:none; width:40px; height:40px; margin:0px auto;}#status.loading {background: url(http://bcs.duapp.com/user-img/discuz-avatar/loading.gif) no-repeat center;}#status.success {background: url(http://bcs.duapp.com/user-img/discuz-avatar/success.png) no-repeat center;}#status.error {background: url(http://bcs.duapp.com/user-img/discuz-avatar/error.png) no-repeat center;}#progress {padding: 5px;}</style><div id="discuz-avatar"><h3>Discuz论坛头像上传助手</h3><table><tr><td><div id="big" class="img_div"><img id="img_b" src="http://bcs.duapp.com/user-img/discuz-avatar/add_image.png"></div><span>大头像</span></td><td><div id="middle" class="img_div"><img id="img_m" src="http://bcs.duapp.com/user-img/discuz-avatar/add_image_80x80.png"></div><span>中头像</span></td><td><div id="small" class="img_div"><img id="img_s" src="http://bcs.duapp.com/user-img/discuz-avatar/add_image_32x32.png"></div><span>小头像</span></td></tr></table><div id="status"></div><div id="progress"></div><input id="submit" type="button" value="提交" disabled="disabled"></div>';
	mycamera.parentNode.appendChild(out);

	var btnSubmit = document.getElementById("submit");
	var statusIcon = document.getElementById("status");
	var uploadProgress = document.getElementById("progress");
	var avatars = {
		big: {img: document.getElementById("img_b"), hex: null},
		middle: {img: document.getElementById("img_m"), hex: null},
		small: {img: document.getElementById("img_s"), hex: null}
	};

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
		var hex = '';
		for (var i = 0; i < uint8Array.length; i++) {
			hex += uint8Array[i] < 16 ? '0' + uint8Array[i].toString(16) : uint8Array[i].toString(16);
		}
		return hex.toUpperCase();
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
		var post = "avatar1=" + avatars.big.hex + "&avatar2=" + avatars.middle.hex + "&avatar3=" + avatars.small.hex + "&urlReaderTS=" + Date.now();
		btnSubmit.setAttribute("disabled", "disabled");
		statusIcon.style.display = "block";
		statusIcon.className = "loading";
		if (navigator.userAgent.indexOf('Firefox') > 0) 
			gm_post(action, post);
		else
			ajaxPost(action, post);
	}

	bindOpenFile("big");
	bindOpenFile("middle");
	bindOpenFile("small");
	btnSubmit.addEventListener("click", upload);
})();