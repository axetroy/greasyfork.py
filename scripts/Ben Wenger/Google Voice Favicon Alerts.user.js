// ==UserScript==
// @name           Google Voice Favicon Alerts
// @description    Alerts you to the number of unread items in Google Voice.
// @version        1.0.12
// @date           2018-26-08
// @author         Peter Wooley, Ben999_
// @namespace      http://peterwooley.com
// @include        htt*://voice.google.*
// @grant          none
// ==/UserScript==

// Wait for the window to load to try and initialize
window.addEventListener('load', function() {
			window.instance = new GVoiceFaviconAlerts;
}, true);
	
function GVoiceFaviconAlerts() {
	var self = this;
	
	this.construct = function() {
		this.head = document.getElementsByTagName("head")[0];
		this.pixelMaps = {
			icons: {
				'unread':
					[["rgba(0,0,0,0.00000)","rgba(0,85,85,0.01176)","rgba(0,0,0,0.00000)","rgba(46,154,146,0.12941)","rgba(29,155,143,0.50196)","rgba(25,150,136,0.75294)","rgba(16,146,132,0.83529)","rgba(19,147,134,0.78824)","rgba(18,150,136,0.53333)","rgba(23,146,131,0.12941)","rgba(0,0,0,0.00000)","rgba(0,127,127,0.00784)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)"],["rgba(0,170,170,0.01176)","rgba(0,0,0,0.00000)","rgba(33,150,137,0.39216)","rgba(26,153,140,0.92941)","rgba(23,155,141,1.00000)","rgba(20,152,138,1.00000)","rgba(17,149,135,1.00000)","rgba(15,148,135,1.00000)","rgba(14,151,137,1.00000)","rgba(12,148,133,0.92549)","rgba(10,140,127,0.39216)","rgba(0,0,0,0.00000)","rgba(0,85,85,0.01176)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)"],["rgba(0,0,0,0.00000)","rgba(31,151,138,0.37647)","rgba(27,160,146,1.00000)","rgba(19,148,135,1.00000)","rgba(17,143,130,0.98824)","rgba(15,144,131,0.99216)","rgba(17,145,131,0.99608)","rgba(15,144,131,0.99216)","rgba(13,142,129,0.98824)","rgba(11,144,131,1.00000)","rgba(10,152,137,1.00000)","rgba(7,138,126,0.39608)","rgba(0,0,0,0.00000)","rgba(0,85,85,0.01176)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)"],["rgba(31,151,135,0.12549)","rgba(26,149,136,0.94902)","rgba(13,146,133,0.99216)","rgba(134,195,189,0.99216)","rgba(207,232,230,1.00000)","rgba(119,183,177,1.00000)","rgba(5,137,124,1.00000)","rgba(17,146,133,1.00000)","rgba(13,143,129,1.00000)","rgba(10,142,128,0.99216)","rgba(8,144,130,0.99216)","rgba(7,142,127,0.96471)","rgba(8,136,127,0.11765)","rgba(0,0,0,0.00000)","rgba(0,127,127,0.00784)","rgba(0,0,0,0.00000)"],["rgba(22,147,134,0.54118)","rgba(25,156,143,1.00000)","rgba(5,138,124,0.98824)","rgba(152,203,198,1.00000)","rgba(255,255,255,1.00000)","rgba(196,215,214,1.00000)","rgba(10,124,114,1.00000)","rgba(16,145,132,1.00000)","rgba(12,142,129,1.00000)","rgba(10,142,128,1.00000)","rgba(8,140,126,0.98431)","rgba(7,150,135,1.00000)","rgba(5,139,125,0.50196)","rgba(0,0,0,0.00000)","rgba(0,127,127,0.01569)","rgba(0,0,0,0.00000)"],["rgba(17,145,132,0.79216)","rgba(23,152,139,0.99608)","rgba(5,140,125,0.99216)","rgba(87,174,165,1.00000)","rgba(251,250,251,1.00000)","rgba(99,163,158,1.00000)","rgba(13,122,112,1.00000)","rgba(21,136,125,1.00000)","rgba(15,144,131,1.00000)","rgba(13,143,130,1.00000)","rgba(8,140,126,0.98824)","rgba(6,147,132,0.99608)","rgba(4,138,125,0.74118)","rgba(0,0,0,0.00000)","rgba(0,127,127,0.00784)","rgba(0,0,0,0.00000)"],["rgba(16,143,130,0.86275)","rgba(18,148,135,1.00000)","rgba(16,144,131,0.99608)","rgba(17,144,131,1.00000)","rgba(205,219,218,1.00000)","rgba(115,168,164,1.00000)","rgba(0,119,107,1.00000)","rgba(13,128,117,1.00000)","rgba(0,126,113,1.00000)","rgba(0,134,119,1.00000)","rgba(6,140,126,0.98824)","rgba(5,145,131,1.00000)","rgba(3,138,125,0.80000)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)"],["rgba(15,142,130,0.78431)","rgba(15,149,135,0.99608)","rgba(17,145,132,0.99216)","rgba(5,140,126,1.00000)","rgba(57,157,147,1.00000)","rgba(233,228,229,1.00000)","rgba(105,168,162,1.00000)","rgba(42,144,134,1.00000)","rgba(151,198,194,1.00000)","rgba(100,177,169,1.00000)","rgba(8,139,126,0.98824)","rgba(3,146,131,0.99608)","rgba(2,137,123,0.72941)","rgba(0,0,0,0.00000)","rgba(0,85,85,0.01176)","rgba(0,0,0,0.00000)"],["rgba(12,143,128,0.47451)","rgba(14,151,137,1.00000)","rgba(13,141,128,0.98824)","rgba(16,144,131,1.00000)","rgba(0,138,123,1.00000)","rgba(62,156,147,1.00000)","rgba(210,218,217,1.00000)","rgba(248,246,246,1.00000)","rgba(255,255,255,1.00000)","rgba(254,248,249,1.00000)","rgba(24,137,125,0.98431)","rgba(0,147,131,1.00000)","rgba(4,138,124,0.49804)","rgba(0,0,0,0.00000)","rgba(0,127,127,0.01569)","rgba(0,0,0,0.00000)"],["rgba(15,135,120,0.06667)","rgba(10,140,128,0.87451)","rgba(11,150,135,1.00000)","rgba(10,140,127,0.98039)","rgba(13,143,130,1.00000)","rgba(0,137,123,1.00000)","rgba(21,140,129,1.00000)","rgba(115,177,171,1.00000)","rgba(177,208,205,1.00000)","rgba(180,208,206,0.99608)","rgba(17,134,122,0.99216)","rgba(1,134,121,0.97255)","rgba(7,131,123,0.13725)","rgba(0,0,0,0.00000)","rgba(0,127,127,0.00784)","rgba(0,0,0,0.00000)"],["rgba(0,0,0,0.00000)","rgba(9,136,122,0.21176)","rgba(9,145,131,0.92941)","rgba(9,150,136,1.00000)","rgba(8,140,127,0.99608)","rgba(10,142,128,0.98431)","rgba(3,139,124,0.99216)","rgba(0,128,114,1.00000)","rgba(0,124,112,1.00000)","rgba(2,125,113,0.98039)","rgba(3,143,129,1.00000)","rgba(1,130,118,0.52157)","rgba(0,0,0,0.00000)","rgba(0,170,85,0.01176)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)"],["rgba(0,127,127,0.00784)","rgba(0,0,0,0.00000)","rgba(6,133,121,0.16471)","rgba(7,142,128,0.70980)","rgba(6,141,127,0.99608)","rgba(6,149,134,1.00000)","rgba(6,145,131,1.00000)","rgba(7,140,127,1.00000)","rgba(5,137,124,0.98039)","rgba(4,145,131,1.00000)","rgba(2,132,119,0.75294)","rgba(0,127,85,0.02353)","rgba(0,170,85,0.01176)","rgba(0,0,0,0.00392)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)"],["rgba(0,0,0,0.00000)","rgba(0,127,127,0.00784)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)","rgba(5,132,122,0.19608)","rgba(4,139,127,0.42353)","rgba(2,139,126,0.73725)","rgba(2,143,129,0.99216)","rgba(1,148,133,1.00000)","rgba(1,136,123,0.74510)","rgba(0,120,105,0.06667)","rgba(0,0,0,0.00392)","rgba(0,255,255,0.00392)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)"],["rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)","rgba(0,127,127,0.00784)","rgba(0,127,127,0.00784)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)","rgba(0,138,124,0.49804)","rgba(0,154,138,1.00000)","rgba(0,133,121,0.55294)","rgba(0,109,72,0.02745)","rgba(0,0,0,0.00000)","rgba(0,127,127,0.00784)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)"],["rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)","rgba(0,102,102,0.01961)","rgba(0,127,127,0.01569)","rgba(0,134,120,0.34902)","rgba(0,130,117,0.30588)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)","rgba(0,255,255,0.00392)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)"],["rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)","rgba(0,170,85,0.01176)","rgba(0,0,0,0.00392)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)","rgba(0,0,0,0.00000)"]]
				},
			numbers: {
				0: [
					[1,1,1],
					[1,0,1],
					[1,0,1],
					[1,0,1],
					[1,1,1]
				],
				1: [
					[0,1,0],
					[1,1,0],
					[0,1,0],
					[0,1,0],
					[1,1,1]
				],
				2: [
					[1,1,1],
					[0,0,1],
					[1,1,1],
					[1,0,0],
					[1,1,1]
				],
				3: [
					[1,1,1],
					[0,0,1],
					[0,1,1],
					[0,0,1],
					[1,1,1]
				],
				4: [
					[0,0,1],
					[0,1,1],
					[1,0,1],
					[1,1,1],
					[0,0,1]
				],
				5: [
					[1,1,1],
					[1,0,0],
					[1,1,1],
					[0,0,1],
					[1,1,1]
				],
				6: [
					[0,1,1],
					[1,0,0],
					[1,1,1],
					[1,0,1],
					[1,1,1]
				],
				7: [
					[1,1,1],
					[0,0,1],
					[0,0,1],
					[0,1,0],
					[0,1,0]
				],
				8: [
					[1,1,1],
					[1,0,1],
					[1,1,1],
					[1,0,1],
					[1,1,1]
				],
				9: [
					[1,1,1],
					[1,0,1],
					[1,1,1],
					[0,0,1],
					[1,1,0]
				],
				'+': [
					[0,0,0],
					[0,1,0],
					[1,1,1],
					[0,1,0],
					[0,0,0],
				],
				'k': [
					[1,0,1],
					[1,1,0],
					[1,1,0],
					[1,0,1],
					[1,0,1],
				]
			}
		};
		
		this.timer = setInterval(this.poll, 500);
		this.poll();
		
		return true;
	}
	
	this.drawUnreadCount = function(unread) {
		if(!self.textedCanvas) {
			self.textedCanvas = [];
		}
		
		if(!self.textedCanvas[unread]) {
			var iconCanvas = self.getUnreadCanvas();
			var textedCanvas = document.createElement('canvas');
			textedCanvas.height = textedCanvas.width = iconCanvas.width;
			var ctx = textedCanvas.getContext('2d');
			ctx.drawImage(iconCanvas, 0, 0);
			
			ctx.fillStyle = "#fef4ac";
			ctx.strokeStyle = "#dabc5c";
			ctx.strokeWidth = 1;
			
			var count = unread.length;
			
			if(count > 4) {
				unread = "1k+";
				count = unread.length;
			}
			
			var bgHeight = self.pixelMaps.numbers[0].length;
			var bgWidth = 0;
			var padding = count < 4 ? 1 : 0;
			var topMargin = 7;
			
			for(var index = 0; index < count; index++) {
				bgWidth += self.pixelMaps.numbers[unread[index]][0].length;
				if(index < count-1) {
					bgWidth += padding;
				}
			}
			bgWidth = bgWidth > textedCanvas.width-4 ? textedCanvas.width-4 : bgWidth;
			
			ctx.fillRect(textedCanvas.width-bgWidth-4,topMargin,bgWidth+4,bgHeight+4);
			
			var digit;
			var digitsWidth = bgWidth;
			for(index = 0; index < count; index++) {
				digit = unread[index];
				
				if (self.pixelMaps.numbers[digit]) {
					var map = self.pixelMaps.numbers[digit];
					var height = map.length;
					var width = map[0].length;
					
					ctx.fillStyle = "#2c3323";
					
					for (var y = 0; y < height; y++) {
						for (var x = 0; x < width; x++) {
							if(map[y][x]) {
								ctx.fillRect(14- digitsWidth + x, y+topMargin+2, 1, 1);
							}
						}
					}
					
					digitsWidth -= width + padding;
				}
			}	
			
			ctx.strokeRect(textedCanvas.width-bgWidth-3.5,topMargin+.5,bgWidth+3,bgHeight+3);
			
			self.textedCanvas[unread] = textedCanvas;
		}
		
		return self.textedCanvas[unread];
	}
	this.getIcon = function() {
		return self.getUnreadCanvas().toDataURL('image/png');
	}	
	this.getUnreadCanvas = function() {
		if(!self.unreadCanvas) {
			self.unreadCanvas = document.createElement('canvas');
			self.unreadCanvas.height = self.unreadCanvas.width = 16;
			
			var ctx = self.unreadCanvas.getContext('2d');
			
			for (var y = 0; y < self.unreadCanvas.width; y++) {
				for (var x = 0; x < self.unreadCanvas.height; x++) {
					if (self.pixelMaps.icons.unread[y][x]) {
						ctx.fillStyle = self.pixelMaps.icons.unread[y][x];
						ctx.fillRect(x, y, 1, 1);
					}
				}
			}
		}
		
		return self.unreadCanvas;
	}
	this.getUnreadCountMessages = function() {
		var matches = self.getSearchTextMessages().match(/\d+/g); //parse numerics
		//console.log(matches + ' unread messages found');
    return matches ? matches[0] : false;
	}
  this.getUnreadCountCalls = function() {
		var matches = self.getSearchTextCalls().match(/\d+/g); //parse numerics
    //console.log(matches + ' unread calls found');
    return matches ? matches[0] : false;
	}
	this.getUnreadCountVoicemail = function() {
		var matches = self.getSearchTextVoicemail().match(/\d+/g); //parse numerics
		//console.log(matches + ' unread voicemails found');
    return matches ? matches[0] : false;
	}
	this.getUnreadCountArchived = function() {
		var matches = self.getSearchTextArchived().match(/\d+/g); //parse numerics
		//console.log(matches + ' unread archived items found');
    return matches ? matches[0] : false;
	}
	this.getUnreadCountIcon = function() {
		var unreadMessages = self.getUnreadCountMessages();
		var unreadCalls = self.getUnreadCountCalls();	
		var unreadVoicemail = self.getUnreadCountVoicemail();
		var unreadArchived = self.getUnreadCountArchived();
		var totalUnread = 0;
    
    if (unreadMessages) {
      totalUnread += parseInt(unreadMessages);
    }
    if (unreadCalls) {
      totalUnread += parseInt(unreadCalls);
    }
    if (unreadVoicemail) {
      totalUnread += parseInt(unreadVoicemail);
    }
	if (unreadArchived) {
      totalUnread += parseInt(unreadArchived);
    }
    // 7/6/17 recent update seems to show twice as many unread in no particular order
    totalUnread = totalUnread / 2;
	if ((totalUnread < 1) && (totalUnread > 0)) {
		totalUnread = 1;
	}
    //console.log(totalUnread + ' unread items detected');
	return self.drawUnreadCount(totalUnread.toString()).toDataURL('image/png');
	}
	this.getSearchTextMessages = function() {
		var text = "";
		// messages = element 0
		if (document.getElementsByClassName('md-caption IhMtsf-ho7Xm-NnAfwf')[0]) {
			text = top.document.getElementsByClassName('md-caption IhMtsf-ho7Xm-NnAfwf')[0].textContent;
		}
		return text;
	}
	this.getSearchTextCalls = function() {
		var text = "";
		// calls = element 1
		if (document.getElementsByClassName('md-caption IhMtsf-ho7Xm-NnAfwf')[1]) {
			text = top.document.getElementsByClassName('md-caption IhMtsf-ho7Xm-NnAfwf')[1].textContent;
		}
		return text;
	}
  this.getSearchTextVoicemail = function() {
		var text = "";
		// voicemail = element 2
		if (document.getElementsByClassName('md-caption IhMtsf-ho7Xm-NnAfwf')[2]) {
			text = top.document.getElementsByClassName('md-caption IhMtsf-ho7Xm-NnAfwf')[2].textContent;
		}
		return text;
	}
  this.getSearchTextArchived = function() {
		var text = "";
		// archived = element 3
		if (document.getElementsByClassName('md-caption IhMtsf-ho7Xm-NnAfwf')[3]) {
			text = top.document.getElementsByClassName('md-caption IhMtsf-ho7Xm-NnAfwf')[3].textContent;
		}
		return text;
	}
	this.poll = function() {
    if (self.getUnreadCountMessages() || self.getUnreadCountCalls() || self.getUnreadCountVoicemail() || self.getUnreadCountArchived()) {
      self.setIcon(self.getUnreadCountIcon());
		} else {
			self.setIcon(self.getIcon());
		}
	}
	
	this.setIcon = function(icon) {
		var links = self.head.getElementsByTagName("link");
		for (var i = 0; i < links.length; i++)
			if (links[i].type == "image/x-icon" && 
			   (links[i].rel.toLowerCase() == "shortcut icon" || links[i].rel.toLowerCase() == "icon") &&
			   links[i].href != icon)
				self.head.removeChild(links[i]);
			else if(links[i].href == icon)
				return;

		var newIcon = document.createElement("link");
		newIcon.type = "image/x-icon";
		newIcon.rel = "shortcut icon";
		newIcon.href = icon;
		self.head.appendChild(newIcon);

    setTimeout(function() {
      var shim = document.createElement('iframe');
      shim.width = shim.height = 0;
      document.body.appendChild(shim);
      shim.src = "icon";
      document.body.removeChild(shim);
    }, 499);

	}
	
	this.toString = function() { return '[object GVoiceFaviconAlerts]'; }
	
	return this.construct();
}