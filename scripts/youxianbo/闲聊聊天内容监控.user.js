// ==UserScript==
// @name         闲聊聊天内容监控
// @namespace    http://tampermonkey.net/
// @version      0.13
// @description  try to take over the world!
// @author       You
// @match        https://web.xianliao.updrips.com/
// @require      https://cdn.bootcss.com/jquery/2.2.4/jquery.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    let tt = true;
    function looks(){
        let mlist = jQuery(".message-list");
        if (mlist.length<1) {
            jQuery(".list-type-nav .list-type-option").eq(1).trigger('click');
            jQuery(".scroll-list.contact .contact-options").eq(0).trigger('click');
            jQuery(".btn.btn-middle.btn-success").trigger('click');
            return;
        }

        let msg = jQuery(".message-list .j-msg");
        if (msg.length<1) return;
        for(let i=0,l=msg.length;i<l;i++){
        	let _msg = msg.eq(i);
        	if (_msg.data('read') == 1) {
        		continue;
        	}
        	_msg.data('read', 1);
	        let nick = _msg.find(".message-speaker-name").text();
	        let s = _msg.find(".message-info-text");
	        let content = s.text();
	        if (!content) continue;
	        let idx = content.indexOf('龙');
	        let idx2 = content.indexOf('江苏快三');
	        let idx3 = content.indexOf('连开');
	        let idx4 = content.indexOf('上期1111');
	        let idx5 = content.indexOf('收米');

	        if (idx > -1 || idx2 > -1 || idx3 > -1 || idx4 > -1 || idx5 > -1) {
	            if (!!window.Notification) {
	                new Notification("消息监控", {
	                    body: '@'+nick+':'+content,
	                    icon: 'http://pic.qiantucdn.com/58pic/16/47/70/71458PICB6P.jpg!/fw/290/compress/true/clip/290x386a0a0/format/webp',
	                    tag:1
	                });
	            } else {
	                alert('消息监控:@'+nick+':'+content);
	            }
	        }
	    }

        if (jQuery(".message-list .j-msg").length > 40) {
            jQuery(".message-list .j-msg:lt(40)").remove()
        }
        /**
        let d = new Date();
        let s = d.getMinutes();
        let tm = [3,13,23,33,43,53];
        if (tm.indexOf(s) > -1 && tt) {
            new Notification("时间提醒", {
                body: '间隔时间到',
                icon: 'http://pic.qiantucdn.com/58pic/16/47/70/71458PICB6P.jpg!/fw/290/compress/true/clip/290x386a0a0/format/webp',
                tag:1000
            });
            tt = false;
        } else if(tm.indexOf(s) == -1) {
            tt = true;
        }
        */
    }
    setInterval(looks, 1000);
})();