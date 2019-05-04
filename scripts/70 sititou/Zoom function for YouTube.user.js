// ==UserScript==
// @name           Zoom function for YouTube
// @name:ja        YouTubeで動画をズーム
// @description    Add zoom function to YouTube video player.
// @description:ja YouTubeの動画プレイヤーにズーム機能を追加します。
// @namespace      https://twitter.com/sititou70
// @include        /https?:\/\/www\.youtube\.com.*/
// @require        https://code.jquery.com/jquery-3.2.1.min.js
// @version        1.5.1
// @grant          none
// ==/UserScript==

jQuery.noConflict();
(function($){
	//function
	var video_scaleup = function(select_rect){
		var player_aspect_ratio = $("#movie_player").width() / $("#movie_player").height();
		var select_aspect_ratio = select_rect.width / select_rect.height;
		
		var centering_offset = {
			x: 0,
			y: 0
		};
		
		var scale_up_ratio = null;
		if(player_aspect_ratio < select_aspect_ratio){
			//fit width
			scale_up_ratio = $("#movie_player").width() / select_rect.width;
			centering_offset.y = ($("#movie_player").height() - select_rect.height * scale_up_ratio) / 2;
		}else{
			//fit height
			scale_up_ratio = $("#movie_player").height() / select_rect.height;
			centering_offset.x = ($("#movie_player").width() - select_rect.width * scale_up_ratio) / 2;
		}
		
		$("video").stop().animate({
			top: select_rect.y * scale_up_ratio * -1 + centering_offset.y + "px",
			left: select_rect.x * scale_up_ratio * -1 + centering_offset.x + "px",
			width: $("video").width() * scale_up_ratio,
			height: $("video").height() * scale_up_ratio
		}, 500);
		
		now_scale_up = true;
	};
	
	var video_scaledown = function(){
		$("video").stop().animate({
			top: save_css.top,
			left: save_css.left,
			width: save_css.width,
			height: save_css.height
		}, 500);
		
		now_scale_up = false;
	};
	
	//set event handler
	var now_scale_up = false;
	var mousedown_offset = null;
	var save_css = null;
	
	var timer_id = 0;
	var set_player_event = function(){
		$("#player-api").mousemove(function(){
			$(".ytp-gradient-top").css("opacity", "1");
			$(".ytp-chrome-top").css("opacity", "1");
			$(".ytp-gradient-bottom").css("opacity", "1");
			$(".ytp-chrome-bottom").css("opacity", "1");
			
			clearTimeout(timer_id);
			
			timer_id = setTimeout(function(){
				$(".ytp-gradient-top").css("opacity", "0");
				$(".ytp-chrome-top").css("opacity", "0");
				$(".ytp-gradient-bottom").css("opacity", "0");
				$(".ytp-chrome-bottom").css("opacity", "0");
			}, 2000);
		}).mouseleave(function(){
			$(".ytp-gradient-top").css("opacity", "0");
			$(".ytp-chrome-top").css("opacity", "0");
			$(".ytp-gradient-bottom").css("opacity", "0");
			$(".ytp-chrome-bottom").css("opacity", "0");
		});
		$("video").mousedown(function(e){
			mousedown_offset = {offsetX: e.offsetX, offsetY: e.offsetY};
			
			if(!now_scale_up){
				save_css = {
					top: $("video").css("top"),
					left: $("video").css("left"),
					width: $("video").css("width"),
					height: $("video").css("height")
				};
			}
		});
		
		$("video").mouseup(function(e){
			var select_rect = {
				width: Math.abs(e.offsetX - mousedown_offset.offsetX),
				height: Math.abs(e.offsetY - mousedown_offset.offsetY),
				x: Math.min(mousedown_offset.offsetX, e.offsetX),
				y: Math.min(mousedown_offset.offsetY, e.offsetY)
			};
			
			if(!(select_rect.width <= 10 || select_rect.height <= 10)){
				video_scaleup(select_rect);
				return false;
			}
			
			return true;
		});
	};
	
	$(document).keydown(function(key){
		switch(key.keyCode){
			case 82:
				video_scaledown();
			break;
		}
	});
	
	var observer = new MutationObserver(function(){
		if($("#player-api").length === 1)set_player_event();
	});
	observer.observe($("#page")[0], {
		attributes: true
	});
	set_player_event();
})(jQuery);