// ==UserScript==
// @name         YT View all replies
// @namespace    https://greasyfork.org/users/232914
// @version      0.42
// @description  For YouTube desktop without Polymer. Removes pagination from comment threads (all comments in a thread are automatically loaded when the "View xxx replies" button is clicked) and adds another "Hide replies" button at the bottom of expanded threads (so that you don't need to scroll back all the way up to collapse it).
// @author       Kami
// @match        https://www.youtube.com/watch?*
// @match        https://www.youtube.com/channel/*/discussion*
// @match        https://www.youtube.com/channel/*/community*
// @match        https://www.youtube.com/user/*/discussion*
// @match        https://www.youtube.com/user/*/community*
// @grant        none
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

(function($){
	'use strict';
	if(window.mdgViewAllReplies)
		return;
	window.mdgViewAllReplies = {};
	var mdgViewAllReplies = window.mdgViewAllReplies;
	
	// init routine
	mdgViewAllReplies.init = function(){
		mdgViewAllReplies.insertCss();
		mdgViewAllReplies.getYtConfig();
		mdgViewAllReplies.getNativeLoadCallback();
		$(document).on("click", ".comment-replies-renderer-view", mdgViewAllReplies.btnCb);
		$(document).on("click", ".mdg-hide-replies", mdgViewAllReplies.toThreadTop);
	};
	
	// disable routine
	mdgViewAllReplies.disable = function(){
		console.info("[mdgViewAllReplies] Disabling the script, as it cannot work properly.");
		$("#mdgViewAllReplies").remove();
		$(document).off("click", ".comment-replies-renderer-view", mdgViewAllReplies.btnCb);
		$(document).off("click", ".mdg-hide-replies", mdgViewAllReplies.toThreadTop);
	};
	
	// insert css
	mdgViewAllReplies.insertCss = function(){
		var docHead = $("head")[0],
			styleEl = document.createElement("style"),
			css =	".comment-replies-renderer-view.hid{display: inline-block !important;}" +
					".comment-replies-renderer-paginator{display: none !important;}" +
					".comment-replies-renderer-pages{position: relative;padding-bottom: 1.5em;}" +
					".mdg-hide-replies{position: absolute;bottom: 0;}";
		styleEl.type = "text/css";
		styleEl.id = "mdgViewAllReplies";
		$(styleEl).append(document.createTextNode(css));
		docHead.append(styleEl);
	};
	
	// get yt config
	mdgViewAllReplies.getYtConfig = function(){
		mdgViewAllReplies.ytConfig = window.yt && window.yt.config_ || window.ytcfg && window.ytcfg.data_ || {};
	};
	
	// get a value from yt config
	mdgViewAllReplies.getConfigVal = function(key, defaultVal) {
		return key in mdgViewAllReplies.ytConfig ? mdgViewAllReplies.ytConfig[key] : defaultVal;
	};
	
	/** Get youtube native load callback.
		On standard comments load/reload, a callback situated in common.js is executed by youtube.
		This callback is needed and used to complete comments loading.
		However, since common.js is minified, obfuscated and updated by youtube regularly, the function's path
		is likely to change on a regular basis, which would break the script every now and then if the call
		is hardcoded to a static function path.
		To mitigate that, the callback's path is retrieved dynamically during the init routine in the following fashion:
		1 - get the content of common.js
		2 - get the main wrapping function's opening and closure, so that the callback is executed in the correct scope during eval
		2 - search for the callback, using a keyword that is specific to that function, and retrieve the callback's name
		3 - since the callback's path is in fact an alias, search upward in common.js to find the actual path
			i.e. if the function is g.x.Sd, search upwards, from that line, for "g.x=" (the complete line will
			probably look something like "g.x=g.YZ.prototype")
		4 - store the full path so that it can be called when needed
		
		Here's the beautified function as it was on 2019/03/13:
		g.h = g.RJ.prototype;
		[...]
		g.h.ce = function(a) {
			(a = g.K("comment-renderer-text", a || this.ge)) && (0, g.y)(a, function(b) {
				var c = g.L("comment-renderer-text-content", b);
				if (c.scrollHeight > c.clientHeight + 5) {
					b = g.L("comment-text-toggle", b);
					g.P(b, "hid");
					if (c && b) {
						var d = parseFloat(g.eo(c, "lineHeight"));
						if (c.scrollHeight > c.clientHeight + d) d = !1;
						else {
							d = g.Zc("SPAN");
							c.appendChild(d);
							var e = d.offsetLeft - c.offsetLeft,
								f = g.fn("BUTTON", b)[0];
							c.removeChild(d);
							d = null != f && f.clientWidth > e
						}
					} else d = !1;
					d && (g.O(b, "hid"), g.O(c, "expanded"))
				}
			})
		};
		We basically want to be able to execute g.RJ.protoype.ee in common.js's topmost scope
	**/
	mdgViewAllReplies.getNativeLoadCallback = function(){
		var ytConfig = mdgViewAllReplies.ytConfig,
			req, processJS, jsUrl, onXhrError;
		if(!ytConfig || !(ytConfig && (jsUrl = ytConfig.JS_COMMON_MODULE))){
			console.info("[mdgViewAllReplies] Youtube config for JS_COMMON_MODULE couldn't be found.");
			mdgViewAllReplies.disable();
			return;
		}
		// error callback
		onXhrError = function(){
			console.info("[mdgViewAllReplies] Couldn't retrieve common.js");
			mdgViewAllReplies.disable();
		};
		// onload callback : search common.js to find the native load callback
		processJS = function(data){
			if(this.status !== 200){
				onXhrError();
				return;
			}
			var jsCode = this.responseText,
				open, closure, pos, proto, func, path;
			open = jsCode.substring(0,jsCode.indexOf("{")+1);
			closure = jsCode.substring(jsCode.lastIndexOf("}"));
			pos = jsCode.indexOf('.clientWidth>'); // find the callback's block
			pos = jsCode.lastIndexOf("=function(",pos); // go to the beginning of the block's definition
			func = jsCode.substring(jsCode.lastIndexOf(".",pos),pos); // get the function's name
			path = jsCode.substring(jsCode.lastIndexOf(";",pos)+1,jsCode.lastIndexOf(".",pos)).trim(); // get local path
			pos = jsCode.lastIndexOf(path+"=",pos); // find local definition
			proto = jsCode.substring(jsCode.indexOf("=",pos)+1,jsCode.indexOf(";",pos)); // extract prototype path
			path = String(proto+func); // rebuild full path
			if(path.indexOf("prototype") > -1){
				mdgViewAllReplies.nativeLoadCallbackData = {"open":open,"path":path,"closure":closure};
			}else{
				console.info("[mdgViewAllReplies] Couldn't find native load callback.");
				mdgViewAllReplies.disable();
			}
		};
		// build and send request
		req = new XMLHttpRequest();
		req.open("GET", jsUrl, true);
		req.onerror = onXhrError;
		req.onload = processJS;
		req.send();
	};
	
	// onclick callback
	mdgViewAllReplies.btnCb = function(e){
		mdgViewAllReplies.doViewReplies($(this).siblings(".comment-replies-renderer-paginator"));
	};
	
	// jump to top of thread if out of view
	mdgViewAllReplies.toThreadTop = function(e){
		var thread = $(this).closest(".comment-thread-renderer");
		// wait 50ms, so that the thread has time to get collapsed and scroll data updated accordingly
		window.setTimeout(function(){
			var targetPos = thread.offset().top - $("#masthead-positioner").height();
			if(window.scrollY >= targetPos + thread.height())
				$(window).scrollTop(targetPos);
		},50);
	};
	
	// recursively load all replies
	mdgViewAllReplies.doViewReplies = function(btn){
		// build request data
		var reqUrl = btn.data("uix-load-more-href"),
			postBody = btn.data("uix-load-more-post-body"),
			xsrfFieldName = mdgViewAllReplies.getConfigVal("XSRF_FIELD_NAME", void 0),
			xsrfToken = mdgViewAllReplies.getConfigVal("XSRF_TOKEN", void 0),
			postData = xsrfFieldName.toLowerCase() + "=" + xsrfToken + ";" + postBody,
			headerData = {},
			headerConfKeys = {
				//"X-Goog-Visitor-Id": "SANDBOXED_VISITOR_ID",
				"X-YouTube-Client-Name": "INNERTUBE_CONTEXT_CLIENT_NAME",
				"X-YouTube-Client-Version": "INNERTUBE_CONTEXT_CLIENT_VERSION",
				"X-Youtube-Identity-Token": "ID_TOKEN",
				"X-YouTube-Page-CL": "PAGE_CL",
				"X-YouTube-Page-Label": "PAGE_BUILD_LABEL",
				"X-YouTube-Variants-Checksum": "VARIANTS_CHECKSUM"
			};
		headerData["Content-Type"] = "application/x-www-form-urlencoded";
		for(var key in headerConfKeys){
			mdgViewAllReplies.getConfigVal(headerConfKeys[key]) && (headerData[key.toLowerCase()] = mdgViewAllReplies.getConfigVal(headerConfKeys[key]));
		}
		// send request
		$.ajax({
			url: reqUrl,
			type: "post",
			data: postData,
			headers: headerData,
			success: function(data){
				var thread, replies, newbtn, result = document.createElement("div"),
					repliesHeader = btn.parents(".comment-replies-renderer-header");
				result.innerHTML = data.content_html;
				replies = $(".comment-renderer",result);
				newbtn = $(".comment-replies-renderer-paginator",result);
				thread = $(".comment-replies-renderer-pages",repliesHeader);
				thread.append(replies);
				repliesHeader.removeClass("yt-uix-expander-collapsed");
				btn.remove();
				// For each reply, call the native yt load callback (from common.js) that,
				// among other things, unhides the "read more" links on longer comments.
				// See getNativeLoadCallbackData function for more info.
				if(mdgViewAllReplies.nativeLoadCallbackData){
					var cbData = mdgViewAllReplies.nativeLoadCallbackData;
					for(var i = 0, rpCount = replies.length; i < rpCount; i++){
						function getCurrReply(){return replies[i];}
						eval(cbData.open + cbData.path + "(getCurrReply());" + cbData.closure);
					}
				}
				// load next replies if there are any
				if(newbtn.length){
					$(".comment-replies-renderer-pages",repliesHeader).append(newbtn);
					mdgViewAllReplies.doViewReplies(newbtn);
				}else{
					var hideBtn = $(".comment-replies-renderer-hide",thread).clone(true).addClass("mdg-hide-replies");
					thread.append(hideBtn);
				}
			}
		});
	};
	// jumpstart
	mdgViewAllReplies.init();
})(jQuery);
