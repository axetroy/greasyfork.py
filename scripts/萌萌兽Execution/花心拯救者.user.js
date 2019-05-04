// ==UserScript==
// @name         花心拯救者
// @namespace    Cutemon
// @version      1.3
// @description  白嫖没有错，花心也没有猜错，错的是这个破站直播！
// @author       Cutemon
// @include      /https?:\/\/live\.bilibili\.com\/\d+\??.*/
// @require      https://static.hdslb.com/live-static/libs/jquery/jquery-1.11.3.min.js
// @grant        none
// ==/UserScript==

(function () {
	'use strict';

	let roomID = window.location.pathname.slice(1),
		uid = '';
	var xx,
		yy;

	function getUid() {
		$.ajax({
			type: "get",
			url: "//api.live.bilibili.com/room/v1/Room/room_init",
			data: {
				id: roomID
			},
			success: function (response) {
				uid = response.data.uid;
				//				console.log(roomLongId);
				myMedal();
			}
		});
	}

	function myMedal() {
		$.ajax({
			type: "post",
			url: "//api.live.bilibili.com/i/ajaxGetMyMedalList",
			xhrFields: {
				withCredentials: true
			},
			success: function (response) {
				//				console.log(response.data[0]);
				for (let i = 0; i < response.data.length; i++) {
					if (uid == response.data[i].target_id) {
						let medalId = response.data[i].medal_id;
						console.log(medalId);
						$.ajax({
							type: "get",
							url: "//api.live.bilibili.com/i/ajaxWearFansMedal",
							xhrFields: {
								withCredentials: true
							},
							data: {
								medal_id: medalId
							},
							success: function (response) {
								let left = xx - 200 + "px",
									top = yy - 20 + "px";
								toast("勋章自动切换成功", "success", left, top);
								console.log(left, top, "勋章自动切换成功");
							}
						});
					}
				}
			}
		});
	}

	function toast(text, level, left, top) {
		text = text || "这是一个提示";
		level = level || "success"; // success,caution,info,error
		left = left || "50%";
		top = top || "5%";
		if (level != "success") {
			console.log(text);
		}
		var id = new Date().valueOf();

		$("body").append(
			'<div class="link-toast ' +
			level +
			'"data-id="' +
			id +
			'" style="position: fixed; left: ' +
			left +
			"; top: " +
			top +
			';"><span class="toast-text">' +
			text +
			"</span></div>"
		);
		$("div.link-toast[data-id='" + id + "']").slideDown(
			"normal",
			function () {
				setTimeout(function () {
					$("div.link-toast[data-id='" + id + "']").fadeOut(
						"normal",
						function () {
							$("div.link-toast[data-id='" + id + "']").remove();
						}
					);
				}, 1500);
			}
		);
	}

	window.onload = function () {
		$(".chat-input").focus(getUid);
		$('body').mousemove(function (e) {
			xx = e.originalEvent.x || e.originalEvent.layerX || 0;
			yy = e.originalEvent.y || e.originalEvent.layerY || 0;
			//var d = document.getElementById("div");获取某div在当前窗口的位置
			//var dx = xx - p.getBoundingClientRect().left;
			//var dy = yy - p.getBoundingClientRect().top;
			//$(this).text(dx + '---' + dy);鼠标在该div内位置
		});
	}


})();