// ==UserScript==
// @name         Chatbox Temporary Fix
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        http://www.veneficium.org/chatbox/index.forum*
// @grant        none
// ==/UserScript==

Chatbox.prototype.listen = function() {
	var self = this;
	if (this.connected && !this.nolisten) {
		if (!this.listenParams.url || !this.listenParams.lastModified) {
			if (console) {
				console.log('[INFO] url or lastModified : KO ');
			}
			Chatbox.initTries++;
			return;
		}
		this.listenParams.tag = Math.floor(Math.random() * 100000);
		$.ajax({
			url: this.listenParams.url,
			timeout: 35000,
			type: 'get',
			data: "tag=" + window.escape(this.listenParams.tag) + "&time=" + window.escape(this.listenParams.lastModified),
			dataType: 'text',
			crossDomain: true,
			cache: false,
			success: function(response, txt, xhr) {
				if (console) {
					console.log("[SUCCESS] Status : " + xhr.status);
				}
				switch (xhr.status) {
					case 403:
					case 404:
					case 0:
						self.initListening();
						break;
					case 500:
						self.disconnect();
						break;
					default:
						self.listenParams.lastModified = xhr.getResponseHeader('Last-Modified');
						if (response) {
							self.get();
						}
						self.listen();
						break;
				}
			},
			error: function(xhr, status, error) {
				if (console) {
					console.log("[ERROR] Status : " + xhr.status);
				}
				if (xhr.status == 403 || xhr.status == 404 || xhr.status == 0) {
					self.initListening();
				} else {
					self.disconnect();
				}
			}
		})
	}
};

Chatbox.prototype.send = function(params) {
	var self = this;
    if (!this.listenParams.url || !this.listenParams.lastModified) {
        Chatbox.initTries = 0;
        this.initListening();
    }
	if (!params) {
		params = $("form[name='post']").serialize();
	}
	var data = params + "&method=send&archives=" + this.archives;
	$("#message").val('').focus();
	$.ajax({
		url: this.actionsUrl,
		type: 'post',
		data: data,
		dataType: 'json',
		cache: false,
		success: function(response) {
			self.refresh(response);
		}
	});
};

setInterval(function(){
    chatbox.get();
}, 2000);