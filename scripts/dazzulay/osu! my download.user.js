// ==UserScript==
// @name           osu! my download
// @description    ous beatmap download from mirror.osu beatmap镜像站下载。支持的镜像站点：bloodcat.com、inso.link、osu.sayobot.cn。
// @author         dazzulay
// @copyright      2019, dazzulay
// @version        2.2.8
// @icon           http://osu.ppy.sh/favicon.ico
// @include        http*://osu.ppy.sh/*
// @grant          none
// @namespace      https://greasyfork.org/scripts/3916
// @homepageURL    https://greasyfork.org/scripts/3916
// ==/UserScript==

(function () {
	var domain = document.domain;
	var drive = domain.replace(/\./g, '_');

	function myJQueryCode() {
		function osu_my_downoad() {
			var self = this;
			this.mirros = {
				bloodcat: {
					url: 'http://bloodcat.com/osu/m/{bmid}',
					class: 'my_orange',
					text: 'DOWNLOAD BLOODCAT',
					target: '_blank'
				},
				/*
				 2017-07-16 挂了
				 mengsky: {
				 url: 'http://osu.mengsky.net/?bmid={bmid}',
				 url2: 'http://osu.mengsky.net/api/download/{bmid}', // 无法直接跳转，限制了
				 class: 'my_green',
				 text: 'DOWNLOAD MENGSKY',
				 target: '_blank'
				 },
				 */
				insolink: {
					url: 'http://inso.link/?source=osu_my_download&m={bmid}',
					class: 'my_pink',
					text: 'DOWNLOAD INSO.LINK',
					target: '_blank'
				},
				/*
				 2018-10-09 挂了
				 osu_uu_gl: {
				 url: 'http://osu.uu.gl/s/{bmid}',
				 class: 'my_purpule',
				 text: 'DOWNLOAD OSU.UU.GL',
				 target: '_blank'
				 },
				 */
				sayobot: {
					//url: 'https://osu.sayobot.cn/osu.php?s={bmid}',
					url: 'https://sayobot.cn/?search={bmid}',
					class: 'my_green',
					text: 'DOWNLOAD SAYOBOT',
					target: '_blank'
				}
			};
			/*
			渲染mirro模板，返回渲染的字符串。暂时只渲染url的bmid
			 */
			this.mirros_parse = function (bmid) {
                var return_mirros = $.extend(true,{},self.mirros);
				var _param = 'url';
				$.each(return_mirros, function (k, v) {
					return_mirros[k][_param] = str_render(v[_param], {bmid: bmid});
				});
				return return_mirros;
			};
			this.drives = {
				osu_ppy_sh: function () {
					var is_new = $('.osu-layout').length;

					if (is_new) {
						// css样式 设置
						$('head').append(`
<style>
.my_container .btn-osu-big__text-top {
white-space: normal;
}

.my_container a:before {
content: " ";
position: absolute;
left: 0;
right: 0;
top: 0;
bottom: 0;
border-radius: 4px;
}

.my_orange:before {
background-color: rgba(255,141,0,.5)
}

.my_green:before {
background-color: rgba(0,101,0,.5)
}

.my_pink:before {
background-color: rgba(255, 102, 170,.5)
}

.my_purpule:before {
background-color: rgba(169, 10, 165,0.5);
}
</style>
`);

						var beatmapset_page = '.js-react--beatmapset-page';


						var ready = function (event) {
							var _timer = setInterval(function () {
								var $bp = $(beatmapset_page);
								if ($bp.length == 0) {
									clearInterval(_timer);
									return;
								}
								if ($bp.attr('data-react-turbolinks-loaded') == 1) {
									loaded();
									clearInterval(_timer);
								}
							}, 200);

							function loaded() {
								if ($('.my_container').length > 0) {
									return;
								}
								// 获取beatmapid
								var bmsrc = $('.js-audio--play').attr('data-audio-url');
								if (!bmsrc) {
									return false;
								}
								var bmid = bmsrc.substring(bmsrc.lastIndexOf("/") + 1, bmsrc.lastIndexOf("."));

								// 设置url
								var parsed_mirros =  self.mirros_parse(bmid);

								// 添加按钮
								var $container = $('<div class="beatmapset-header__buttons my_container"></div>');
								var btn_tpl = '<a href="{url}" class="btn-osu-big btn-osu-big--beatmapset-header {class}"  target="{target}"><div class="btn-osu-big__content"><div class="btn-osu-big__left"><span class="btn-osu-big__text-top">{text}</span></div><div class="btn-osu-big__icon"><span class="fa fa-download"></span></div></div></a>';
								$.each(parsed_mirros, function (k, v) {
									$container.append(str_render(btn_tpl, parsed_mirros[k]));
								});
								$('.beatmapset-header__box--main').append($container);
							}
						};


						document.addEventListener('turbolinks:load', ready);

						ready();

					} else {
						// 获取beatmapid
						var bmsrc = $('.bmt').attr('src');
						if (!bmsrc) {
							return false;
						}
						var bmid = bmsrc.substring(bmsrc.indexOf("thumb/") + 6, bmsrc.lastIndexOf("l"));

						// css样式 设置
						$('head').append(`
<style>
.my_container {
position: fixed;
top: 20px;
right: 0px;
}

.my_btn {
text-align: center;
width: 150px;
height: 111px;
display: table-cell;
vertical-align: middle;
margin: 0 0 10px 0;
padding: 10px;
font-family: Haettenschweiler,Impact,"Arial Grande",Tahoma,Helvetica,Arial,sans-serif;
font-size: 32px;
font-weight: normal;
color: #fff;
border: 4px solid #fff;
border-radius: 6px;
}

.my_btn:hover {
text-shadow: 0 0 20px floralwhite;
color: #fff;
}

.my_btn span {
display: inline-block;
vertical-align: middle;
text-align: center
}

.my_orange {
background: linear-gradient(to bottom,darkorange,wheat,darkorange);
}

.my_blue {
background: linear-gradient(to bottom,darkblue,lightblue,darkblue);
}

.my_green {
background: linear-gradient(to bottom,darkgreen,lightgreen,darkgreen);
}

.my_pink {
background: linear-gradient(to bottom,HotPink,pink,HotPink);
}
.my_purpule {
background: linear-gradient(to bottom,#261326,#E064E0,#261326);
}
</style>
`);


						// 设置url
						var parsed_mirros =  self.mirros_parse(bmid);

						// 添加按钮
						var $container = $('<div class="my_container"></div>');
						var btn_tpl = '<a class="my_btn {class}" href="{url}" target="{target}"><span>{text}</span></a><br/>';
						$.each(parsed_mirros, function (k, v) {
							$container.append(str_render(btn_tpl, parsed_mirros[k]));
						});
						$('body').append($container);
					}
				}
			};
			this.init = function () {
				var domain = document.domain;
				var drive = domain.replace(/\./g, '_');
				self.drives[drive]();
			};
			self.init();
		}

		osu_my_downoad();
	}

	if (typeof jQuery == 'undefined') {
		var headTag = document.getElementsByTagName("head")[0];
		var jqTag = document.createElement('script');
		jqTag.type = 'text/javascript';
		jqTag.src = '//code.jquery.com/jquery-1.8.3.min.js';
		jqTag.onload = myJQueryCode;
		headTag.appendChild(jqTag);
	} else {
		myJQueryCode();
	}

	function str_render(template, context) {

		var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;

		return template.replace(tokenReg, function (word, slash1, token, slash2) {
			if (slash1 || slash2) {
				return word.replace('\\', '');
			}

			var variables = token.replace(/\s/g, '').split('.');
			var currentObject = context;
			var i, length, variable;

			for (i = 0, length = variables.length; i < length; ++i) {
				variable = variables[i];
				currentObject = currentObject[variable];
				if (currentObject === undefined || currentObject === null) return '';
			}
			return currentObject;
		});
	}

	function getUrlParameter(sParam) {
		var sPageURL = decodeURIComponent(window.location.search.substring(1)),
			sURLVariables = sPageURL.split('&'),
			sParameterName,
			i;

		for (i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split('=');

			if (sParameterName[0] === sParam) {
				return sParameterName[1] === undefined ? true : sParameterName[1];
			}
		}
	}
})();