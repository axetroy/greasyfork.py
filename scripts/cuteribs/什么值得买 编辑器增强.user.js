// ==UserScript==
// @name			什么值得买 编辑器增强
// @namespace		http://tampermonkey.net/
// @version			0.62
// @description		编辑器 拖拽图片上传 粘贴图片上传 WORD粘贴 HTML源代码编辑
// @author			cuteribs
// @match			https://post.smzdm.com/tougao*
// @match			https://post.smzdm.com/edit/*
// @match			https://test.smzdm.com/p/*/submit*
// @match			https://test.smzdm.com/p/*/edit/*
// @grant			GM.xmlHttpRequest
// @icon 			https://www.smzdm.com/favicon.ico
// ==/UserScript==

(function() {
	let applyStyle = $uDocument => {
		let globalCss = `
		.edui-header .edit_Tit .xilie_input {
			width: 100%;
		}
		`;
		let editorCss = `
		body.view h2 {
			font-size: 23px;
			padding-top: 34px;
			margin: -34px 0 16px;
			padding-bottom: 5px;
			border-bottom: solid 1px #aaa;
		}
		body.view h3 {
			font-size: 19px;
			text-shadow: 1px 2px #ccc;
			margin: 0 0 16px;
		}
		body.view p {
			color: #333;
			line-height: 24px;
			padding: 0;
			margin: 0 0 20px;
		}
		body.view p img {
			max-width: 600px;
			margin: 10px;
			background-color: #fff;
			box-shadow: 0px 0px 5px 1px rgba(0,0,0,.5);
			transition: all 0.3s cubic-bezier(.25,.8,.25,1);
		}
		body.view p img.face {
			padding: 0;
			margin: 0;
			background-color: unset;
			box-shadow: unset;
		}
		body.view blockquote {
			padding: 10px 15px;
		}
		body.view blockquote p {
			color: #999;
		}
		`;

		$('<style type="text/css"></style>')
			.html(globalCss)
			.appendTo($('head'));
		$('<style type="text/css"></style>')
			.html(editorCss)
			.appendTo($uDocument.find('head'));
	};

	let downloadImage = url => {
		let dfd = $.Deferred();
		let mimeType;

		switch (url.substr(url.lastIndexOf('.'))) {
			case '.jpg':
				mimeType = 'image/jpg';
				break;
			case '.gif':
				mimeType = 'image/gif';
				break;
			default:
				mimeType = 'image/png';
				break;
		}

		GM.xmlHttpRequest({
			url: url,
			method: 'GET',
			responseType: 'blob',
			onload: res =>
				dfd.resolve(
					new Blob([res.response], {
						type: mimeType
					})
				)
		});

		return dfd.promise();
	};

	let uploadImage = (blob, index, dfd) => {
		let uploadUrl;
		let id = $('#id').val();

		if (editorId == 'report_desc') {
			uploadUrl = `https://test.smzdm.com/public/ue_editor/pic_manage?act=uploadImg&type=probreport&uid=${''}&osid=${id}`;
		} else {
			uploadUrl = `https://post.smzdm.com/ajax_res?action=uploadImg&id=${id}&uid=&key=D7326DC2462053A1334080DA5490537C`;
		}

		if (!blob.name) {
			blob.name = 'image.png';
			blob.lastModifiedDate = new Date();
		}

		let data = new FormData();
		data.append('id', `WU_FILE_${index || 0}`);
		data.append('name', blob.name);
		data.append('type', blob.type);
		data.append('lastModifiedDate', blob.lastModifiedDate);
		data.append('size', blob.size);
		data.append('imgFile', blob, blob.name);

		$.ajax({
			url: uploadUrl,
			method: 'POST',
			data: data,
			processData: false,
			contentType: false,
			dataType: 'json'
		}).done(result => {
			if (result && result.error == 0) {
				let $img = $('<img>').attr('src', result.url.substr(result.url.indexOf(':') + 1));
				dfd.resolve($('<p>').append($img));
			}
		});
	};

	let uploadImages = (files, target) => {
		var dfds = [];

		for (var i = 0; i < files.length; i++) {
			var dfd = $.Deferred();
			uploadImage(files[i], i, dfd);
			dfds.push(dfd.promise());
		}

		insertContent(dfds, target);
	};

	let transferImage = (index, url) => {
		let dfd = $.Deferred();

		GM.xmlHttpRequest({
			method: 'GET',
			url: url,
			responseType: 'blob',
			onload: xhr => {
				let blob = new Blob([xhr.response], {
					type: 'image/png'
				});
				uploadImage(blob, index, dfd);
			}
		});

		return dfd.promise();
	};

	let insertContent = (dfds, target) => {
		$.when(...dfds).done((...$ps) => {
			switch (target.tagName) {
				case 'H2':
				case 'H3':
				case 'P':
					let $last = $(target);

					$.each($ps, (i, $p) => {
						$p.insertAfter($last);
						$last = $p;
					});

					break;
				default:
					let $target = $(target);

					$.each($ps, (i, $p) => {
						$target.append($p);
					});

					break;
			}
		});
	};

	let processYoudao = (html, target) => {
		let $html = $(html);
		let dfds = [];
		let $quote = null;

		$.each($html, (i, el) => {
			if (el.tagName != 'DIV') {
				return;
			}

			let $line = $(el);
			let type = $line.attr('yne-bulb-block');

			if(type != 'quote' && $quote) {
				dfds.push($.Deferred().resolve($('<blockquote>').append($quote)));
				$quote = null;
			}

			switch (type) {
				case 'image': {
					let url = $line.children('img').attr('src');
					dfds.push(transferImage(i, url));
					break;
				}
				case 'heading': {
					let fontSize = $line.children('span').css('font-size');
					let element = fontSize == '20px' ? '<h2>' : fontSize == '16px' ? '<h3>' : '<p>';
					dfds.push($.Deferred().resolve($(element).text($line.html())));
					break;
				}
				case 'paragraph': {
					let $p = $('<p>');

					$.each($line[0].childNodes, (i, node) => {
						if (node.nodeType == 3) {
							$p.append(node.textContent);
						} else if (node.nodeType == 1) {
							if (node.tagName == 'SPAN') {
								if (node.style['font-weight'] == 'bold') {
									$p.append($('<strong>').text(node.textContent));
								} else {
									$p.append(node.textContent);
								}
							} else if (node.tagName == 'A') {
								$p.append(
									$('<a>')
										.attr('href', node.href)
										.text(node.textContent)
								);
							}
						}
					});

					if ($p.text().trim()) {
						dfds.push($.Deferred().resolve($p));
					}

					break;
				}
				case 'quote': {
					if(!$quote) {
						$quote = $('<p>');
					}

					$quote.append($line.children(0).html());
					$quote.append('<br/>');
				}
			}
		});

		insertContent(dfds, target);
	};

	let processWord = (html, target) => {
		let $html = $(html);
		let dfds = [];

		let cleanElement = $el => {
			let fontSize = $el.css('font-size');
			let fontWeight = $el.css('font-weight');
			let fontFamily = $el.css('font-family');
			let color = $el.css('color');
			let backgroundColor = $el.css('background-color');
			let textAlign = $el.css('text-align');
			$el.removeAttr('style')
				.removeAttr('class')
				.removeAttr('lang')
				.removeAttr('align');
			$el.css('font-size', fontSize)
				.css('font-weight', fontWeight)
				.css('font-family', fontFamily)
				.css('color', color)
				.css('background-color', backgroundColor)
				.css('text-align', textAlign);
			return $el;
		};

		$.each($html, (i, el) => {
			switch (el.tagName) {
				case 'P':
				case 'H2':
				case 'H3':
					break;
				default:
					return;
			}

			let $el = cleanElement($(el));

			if ($el.text().length > 0) {
				$el.find('*').each((i, c) => {
					let $c = $(c);

					if (c.tagName == 'SPAN') {
						cleanElement($c);

						if ($c.text().length === 0) {
							$c.remove();
						} else if (!$c.attr('style')) {
							$c.contents().unwrap();
						}
					} else if (c.tagName == 'A') {
						cleanElement($c);
					} else {
						$c.remove();
					}
				});

				dfds.push($.Deferred().resolve($el));
			}
		});

		insertContent(dfds, target);
	};

	let transferData = (target, data) => {
		let files = data.files;

		if (data.files.length > 0) {
			uploadImages(data.files, target);
		} else {
			if (data.items.length == 1 && data.items[0].type == 'text/plain') {
				data.items[0].getAsString(s => $(target).append(s));
				return;
			}

			let dataItem = $.grep(data.items, i => i.type == 'text/uri-list')[0];

			if (dataItem) {
				dataItem.getAsString(s => downloadImage(s).done(blob => uploadImages(target, [blob])));
				return;
			}

			let htmlItem = $.grep(data.items, i => i.type == 'text/html')[0];

			if (htmlItem) {
				let textItem = $.grep(data.items, i => i.type == 'text/plain')[0];
				let isYoudao = false;
				let isWord = false;

				htmlItem.getAsString(s => {
					if (s.indexOf('yne-bulb-block') > -1) {
						processYoudao(s, target);
						isYoudao = true;
					} else if (s.indexOf('MsoNormal') > -1) {
						processWord(s, target);
						isWord = true;
					}
				});

				textItem.getAsString(s => {
					if (!isYoudao) {
						switch (target.tagName) {
							case 'H2':
							case 'H3':
							case 'P':
								$('<p>')
									.text(s)
									.insertAfter($(target));
								break;
							default:
								$(target).append($('<p>').text(s));
								break;
						}
					}
				});
			}
		}
	};

	let editorId = location.host == 'test.smzdm.com' ? 'report_desc' : 'yuanchuang';
	let editor = UE.getEditor(editorId);

	editor.ready(() => {
		let sourceButton = `
	<div class="edui-box edui-button edui-for-removeformat edui-default">
		<div class="edui-default">
			<div class="edui-button-wrap edui-default">
				<div  unselectable="on" title="" class="edui-button-body edui-default" onclick="UE.getEditor(location.host == 'test.smzdm.com' ? 'report_desc' : 'yuanchuang').execCommand('source');">
					<div class="edui-box edui-icon edui-default"></div>
					<div class="edui-box edui-label edui-default"></div>
					<div class="edui-tooltip edui-default" unselectable="on" onmousedown="return false" style="display: none;">
						<div class="edui-tooltip-arrow edui-default" unselectable="on" onmousedown="return false"></div>
						<div class="edui-tooltip-inner edui-default" unselectable="on" onmousedown="return false">切换源码</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	`;
		$('.edui-toolbar').prepend($(sourceButton));
		let $uEditor = $('#ueditor_0');
		let $uDocument = $($uEditor[0].contentWindow.document);
		applyStyle($uDocument);
		let target = $uDocument.find('body.view')[0];

		$uDocument.on('dragstart', e => e.preventDefault());
		$uDocument.on('dragover', e => e.preventDefault());

		$uDocument.on('drop', e => {
			e.preventDefault();

			switch (e.target.tagName) {
				case 'H2':
				case 'H3':
				case 'P':
					target = e.target;
					break;
			}

			transferData(target, e.originalEvent.dataTransfer);
		});

		$uDocument.on('paste', e => {
			e.preventDefault();

			switch (e.target.tagName) {
				case 'H2':
				case 'H3':
				case 'P':
					target = e.target;
					break;
			}

			transferData(target, e.originalEvent.clipboardData);
		});
	});
})();
