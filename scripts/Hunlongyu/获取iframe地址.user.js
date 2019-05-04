// ==UserScript==
// @author 				hunlongyu
// @version 			0.0.1
// @lilcense 			WTFPL
// @grant 				none
// @encoding 			utf-8
// @namespace 			https://github.com/Hunlongyu
// @icon		 		http://7xo0rb.com1.z0.glb.clouddn.com/public/16-12-5/39527384.jpg
// @require 	 		http://cdn.bootcss.com/jquery/2.2.4/jquery.js

// @name 				获取iframe地址
// @name:zh-CN 			获取iframe地址

// @description 		便捷获取iframe地址
// @description:zh-CN 	便捷获取iframe地址

// @match 				*://*/*
// @run-at 				document-end
// @date 				16/12/2016
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

	function hidediv(){												// 添加一个按钮，点击按钮隐藏整个界面。
		$('#downloadjs').append('<button id="downloadbtn">点击隐藏该界面</button>');
		$('#downloadbtn').css('margin-top', '16px');
		$('#downloadbtn').click(function(){
			$('#downloadjs').hide();
		});
	}

	function addlist(link,i){									//添加链接地址
		$('#downloadjs').append('<span class="downloadspan">' + i + '</span>  <span>' + link + '</span><br />');
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
	var i = 0;
	$('iframe').each(function() {
		i++;
		addlist(this.src,i);
	});
	hidediv();
});