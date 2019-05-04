// ==UserScript==
// @author 				hunlongyu
// @version 			0.0.2
// @lilcense 			WTFPL
// @grant 				none
// @encoding 			utf-8
// @namespace 			https://github.com/Hunlongyu
// @icon		 		http://7xo0rb.com1.z0.glb.clouddn.com/public/16-12-5/39527384.jpg
// @require 	 		http://cdn.bootcss.com/jquery/2.2.4/jquery.js

// @name 				下载脚本文件
// @name:en 			Download script file
// @name:zh 			下载脚本文件
// @name:zh-CN 			下载脚本文件

// @description 		批量下载所有的脚本文件
// @description:en 		Batch download script file
// @description:zh 		批量下载所有的脚本文件
// @description:zh-CN 	批量下载所有的脚本文件

// @homepageURL 		https://github.com/Hunlongyu
// @match 				*://*/*
// @match 				*://*/*
// @run-at 				document-end
// @date 				6/12/2016
// ==/UserScript==

$(function () {
	function adddiv(){												//添加一个div框
		$('body').append('<div id="downloadjs"></div>');
		$('#downloadjs').css({
			position: 'fixed',
			top: '0',
			left: '0',
			width: 'auto',
			height: 'auto',
			background: 'white',
			color: '#000',
			padding: '20px',
		});
		$('#downloadjs').css('max-width', '600px');
		$('#downloadjs').css('max-height', '740px');
		$('#downloadjs').css('box-shadow', '2px 2px 1px #aaa');
		$('#downloadjs').css('z-index', '10000');
		$('#downloadjs').css('text-align', 'left');
		$('#downloadjs').css('overflow-y', 'scroll');
	}
	adddiv();

	function addlist(link,name,i){									//添加链接地址和js文件名
		$('#downloadjs').append('<span class="downloadspan">' + i + '</span>  <a class="downloadACss" href="' + link +'" download >' + name + '</a><br />');
		$('.downloadspan').css('text-align', 'left');
		$('.downloadACss').css('text-align', 'left');
		$('.downloadACss').css('word-break', 'break-all');
		$('.downloadACss').css('word-wrap', 'break-word');
		$('.downloadACss').css({
			width: '560px',
			overflow: 'hidden',
			margin: '8px 0 0',
			height: '20px',
		});
		$('.downloadspan').css({
			color: 'red'
		});
	}

	function hidediv(){												// 添加一个按钮，点击按钮隐藏整个界面。
		$('#downloadjs').append('<button id="downloadbtn">点击隐藏该界面</button>');
		$('#downloadbtn').css('margin-top', '16px');
		$('#downloadbtn').click(function(){
			$('#downloadjs').hide();
		});
	}

	var i = 0;														// 获取所有有效的 js 文件路径
	$('script').each(function() {
		if(this.src === ''){
		}else{
			var jsName = this.src.split('/').pop();
			if(jsName.length > 60){
				i++;
				addlist(this.src,jsName.substr(0,60),i);
			}else{
				i++;
				addlist(this.src,jsName,i);
			}
		}
	});

	hidediv();

});