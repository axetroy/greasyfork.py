// ==UserScript==
// @name        GitPaste
// @name:zh-CN  GitPaste
// @author      Hakurouken
// @description copy github && gist code quickly
// @description:zh-cn  快速的复制 github 和 gist 的代码
// @namespace   GitPaste/Hakurouken
// @icon        https://github.com/favicon.ico
// @encoding    utf-8
// @date        12/04/2015
// @include     /^https?:\/\/github.com\/[\w-]+\/[\w_-]+\/blob\/.*/
// @include     /^https?:\/\/gist.github.com\/[\w-]+\/.*/
// @grant       GM_getResourceText
// @grant       GM_addStyle
// @grant       GM_setClipboard
// @grant       GM_xmlhttpRequest
// @require     http://code.jquery.com/jquery-2.1.3.min.js
// @run-at      document-end
// @version     1.0
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

// jquery.eatost
GM_addStyle(".toast-container{position:fixed;list-style:none;top:0;left:50%;z-index:999999;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px}.toast{line-height:20px;padding:5px 10px 5px 10px;border:1px solid transparent;border-radius:5px;-webkit-box-shadow:3px 3px 3px rgba(0,0,0,0.4);-moz-box-shadow:3px 3px 3px rgba(0,0,0,0.4);-o-box-shadow:3px 3px 3px rgba(0,0,0,0.4);box-shadow:3px 3px 3px rgba(0,0,0,0.4)}.toast .message{font-weight:bold;font-size:14px;line-height:20px}.toast button.close{position:relative;top:-1px;line-height:20px;float:right;padding:0;margin:0 -5px 0 5px;background:0;border:0;font-size:14px;color:rgba(0,0,0,.25);cursor:pointer;-webkit-transition:text-shadow .2s;-moz-transition:text-shadow .2s;-o-transition:text-shadow .2s;transition:text-shadow .2s}.toast button.close:hover{-webkit-text-shadow:0 0 2px rgba(0,0,0,.25);-moz-text-shadow:0 0 2px rgba(0,0,0,.25);-o-text-shadow:0 0 2px rgba(0,0,0,.25);text-shadow:0 0 2px rgba(0,0,0,.25)}.toast.default{color:#333;background-color:#fff;border-color:#ccc}.toast.success{background-color:#e0ebdb;border-color:#c9d7be;color:#4c914e}.toast.info{background-color:#d4e2ea;border-color:#bce8f1;color:#307fa3}.toast.warn{background-color:#eeefe2;border-color:#eadccd;color:#de9246}.toast.danger{background-color:#f2dede;border-color:#d0b9bc;color:#be4843}");
(function ($) {
    var toast = {},
    tmpl = '<div class="toast"><button class="close">&times;</button><span class="message">{{text}}</span></div>';

    // format the configuration
    function formatConf(config) {
        var _config = {
            duration: 3000,
            text: '',
            container: document.body,
            color: '#333',
            background: '#F5F5F5',
            border: 'none',
            style: '',
            autoclose: true,
            closeBtn: false,
            width: 'auto',
            animate: 'fade',
            align: 'top',
            speed: 'fast',
            opacity: 0.9,
            position: '20%'
        };

        if ($.isPlainObject(config)) {
            config = $.extend(_config, config);
        } else if ($.type(config) === 'string') {
            config = $.extend(_config, {
                text: config
            });
        } else {
            config = _config;
        }

        config.animate = config.animate.toLowerCase();
        config.width = typeof config.width === 'number' ? config.width + 'px' : config.width;
        config.align = config.align.toLowerCase() === 'top' ? 'top' : 'bottom';

        var totalHeight = config.container === document.body ? $(window).height : $(config.container).height();
        if ($.type(config.position) === 'string') {
            if (config.position.indexOf('%') === -1) {
                config.position = (parseInt(config.position) / totalHeight * 100) >> 0;
            }
            config.position = isNaN(config.position) ? '20%' : config.position.toString();
        } else if ($.isNumber(config.position)) {
            config.position = (config.position / totalHeight * 100) >> 0;
        }
        return config;
    }

    function toastAnimation($wrapper, config) {
        var closeAnimation = function () {};
        switch (config.animate) {
            case 'slide':
                var start = {
                    opacity: 0,
                    top: config.align === 'top' ? 0 : "100%"
                };
                var end = {
                    opacity: config.opacity,
                    top: config.align === 'top' ? config.position : (100 - parseInt(config.position) + "%")
                };

                $wrapper.css(start).show().css({
                    'margin-left': -$wrapper.width() / 2 + 'px'
                }).animate(end, config.speed);

                closeAnimation = function () {
                    $wrapper.animate(start, config.speed, function () {
                        $wrapper.remove();
                    });
                };
                break;

            case 'fade':
            default:
                $wrapper.css({
                	opacity: 0,
                	top: config.align === 'top' ? config.position : (100 - parseInt(config.position) + "%")
                })
                    .show()
                    .css({
                    'margin-left': -$wrapper.width() / 2 + 'px'
                })
                    .animate({
                    opacity: config.opacity
                });
                closeAnimation = function () {
                    $wrapper.fadeOut(config.speed,function(){
                        $wrapper.remove();
                    });
                };
                break;
        }

        // deal with close && autoclose
        $wrapper.find('.close').click(function () {
            closeAnimation();
        });
        config.autoclose && setTimeout(function () {
            closeAnimation();
        }, config.duration);
    }

    toast.show = function (config) {
        config = formatConf(config);

        var html = tmpl.replace('{{text}}', config.text.toString()),
            $toast = $(html).appendTo($(config.container)).hide(),
            $wrapper = $toast.wrap('<div class="toast-container"></div>').parent().hide();

        if (!config.style) {
            $toast.css({
                color: config.color,
                background: config.background,
                border: config.border,
                width: config.width
            });
        } else {
            $toast.addClass(config.style);
        }

        !config.closeBtn && $toast.find('.close').hide();
        $toast.show();
        $wrapper.css(config.align, config.position);
        toastAnimation($wrapper, config);
        return $wrapper;
    };

    $.each(['default', 'success', 'info', 'warn', 'danger'], function (i, prop) {
        toast[prop] = function (config) {
            var opt;
            if ($.isPlainObject(config)) {
                opt = config;
                opt.style = prop;
            } else if ($.type(config) === 'string') {
                opt = {
                    style: prop,
                    text: config
                };
            }

            return toast.show(opt);
        };
    });

    $.extend({
        toast: toast
    });
})(jQuery);

(function($) {
	var addBtn = (function($){
		function addGithubBtn() {
			var $btns = $('.file-actions .btn-group'),
				link = $btns.find('#raw-url').attr('href');

			$btns.prepend('<a id="git-paste-addons" class="btn btn-sm" data-link="' + link + '" href="javascript:void(0);">Copy</a>');

			return $btns.find('#git-paste-addons');
		}

		function addGistBtn(){
			var $btns = $('.files .actions .button-group');

			$btns.each(function(i,elem){
				var $self = $(elem),
					link = $self.find('.raw-url').attr('href');
				
				$self.prepend('<a class="minibutton git-paste-addons" data-link="' + link + '" href="javascript:void(0);">Copy</a>');
			});

			return $btns.find('.git-paste-addons');
		}

		return function(){
			if( location.host.indexOf('gist.github.com') > -1 ){
				return addGistBtn();
			} else {
				return addGithubBtn();
			}
		};
	})($);

	var copy = (function($){
		var _source = [];

		function copyRemote(link,callback){
			GM_xmlhttpRequest({
				method: 'GET',
				url: link,
				onload: function(response) {
					$.toast.success("Copy Successfully.");
					GM_setClipboard(response.responseText);
					callback(response.responseText);
					_source.push({
						link: link,
						content: response.responseText
					});
				},
				onerror: function(response) {
					$.toast.error("Error occured, copy failed!");
				}
			});
		}

		return function(link,callback){
			callback = callback || function(){};
			var content = null;
			$.each(_source,function(i,src){
				if( link === src.link ){
					content = src.content;
				}
			});

			if( content ){
				$.toast.success("Copy Successfully.");
				GM_setClipboard(content);
				callback(content);
			} else {
				copyRemote(link,callback);
			}
		};
	})($);

	var $copy = addBtn();
	$copy.click(function(e) {
		e.preventDefault();
		var $self = $(this),
			link = $self.data('link');

		copy(link);
	});

})(jQuery);