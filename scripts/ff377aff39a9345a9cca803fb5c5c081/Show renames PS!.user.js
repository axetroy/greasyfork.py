// ==UserScript==
// @name        Show renames PS!
// @namespace   showrenameps
// @description Show renames in Pokémon Showdown!
// @include     http://play.pokemonshowdown.com/
// @include     https://play.pokemonshowdown.com/
// @include     http://play.pokemonshowdown.com/*
// @include     https://play.pokemonshowdown.com/*
// @include     http://*.psim.us/
// @include     https://*.psim.us/
// @include     http://*.psim.us/*
// @include     https://*.psim.us/*
// @version     2.1.1
// @grant       none
// ==/UserScript==

var oldNames = {};

window.addEventListener('load', function() {
	ChatRoom.prototype.addJoinLeave = function(action, name, oldid, silent) {
		var userid = toUserid(name);
		if (!this.joinLeave['rename']) {
			this.joinLeave['rename'] = [];
		}
		if (!action) {
			this.$joinLeave = null;
			this.joinLeave = {
				'join': [],
				'leave': [],
				'rename': []
			};
			return;
		} else if (action === 'join') {
			if (oldid) delete this.users[toUserid(oldid)];
			if (!this.users[userid]) this.userCount.users++;
			this.users[userid] = name;
			this.userList.add(userid);
			this.userList.updateUserCount();
			this.userList.updateNoUsersOnline();
		} else if (action === 'leave') {
			if (this.users[userid]) this.userCount.users--;
			delete this.users[userid];
			this.userList.remove(userid);
			this.userList.updateUserCount();
			this.userList.updateNoUsersOnline();
		} else if (action === 'rename') {
			if (oldid) delete this.users[toUserid(oldid)];
			this.users[userid] = name;
			this.userList.remove(oldid);
			this.userList.add(userid);

			if (!oldNames[toUserid(oldid)]) oldNames[toUserid(oldid)] = [];
			if (oldNames[toUserid(oldid)].indexOf(toUserid(userid)) === -1) oldNames[toUserid(oldid)].push(toUserid(userid));
			if (!oldNames[toUserid(userid)]) oldNames[toUserid(userid)] = [];
			if (oldNames[toUserid(userid)].indexOf(toUserid(oldid)) === -1) oldNames[toUserid(userid)].push(toUserid(oldid));
		}
		if (!Tools.prefs('showjoins')) return;
		if (action === 'rename') {
			if (toId(name) === oldid) return;
			this.joinLeave[action].push({oldid:oldid,name:name});
		} else {
			this.joinLeave[action].push(name);
		}
		if (!this.$joinLeave) {
			this.$chat.append('<div class="message"><small>Loading...</small></div>');
			this.$joinLeave = this.$chat.children().last();
		}
		var message = '';
		if (this.joinLeave['join'].length) {
			var preList = this.joinLeave['join'];
			var list = [];
			var named = {};
			for (var j = 0; j < preList.length; j++) {
				if (!named[preList[j]]) list.push(preList[j]);
				named[preList[j]] = true;
			}
			for (var j = 0; j < list.length; j++) {
				if (j > 0) {
					if (j == 1 && list.length == 2) {
						message += ' and ';
					} else if (j == list.length - 1) {
						message += ', and ';
					} else {
						message += ', ';
					}
				}
				message += Tools.escapeHTML(list[j]);
			}
			message += ' joined';
		}
		if (this.joinLeave['leave'].length) {
			if (this.joinLeave['join'].length) {
				message += '; ';
			}
			var preList = this.joinLeave['leave'];
			var list = [];
			var named = {};
			for (var j = 0; j < preList.length; j++) {
				if (!named[preList[j]]) list.push(preList[j]);
				named[preList[j]] = true;
			}
			for (var j = 0; j < list.length; j++) {
				if (j > 0) {
					if (j == 1 && list.length == 2) {
						message += ' and ';
					} else if (j == list.length - 1) {
						message += ', and ';
					} else {
						message += ', ';
					}
				}
				message += Tools.escapeHTML(list[j]);
			}
			message += ' left';
		}
		if (this.joinLeave['rename'].length) {
			if (this.joinLeave['join'].length || this.joinLeave['leave'].length) {
				message += '; ';
			}
			var list = this.joinLeave['rename'];
			for (var j = 0; j < list.length; j++) {
				if (j > 0) {
					message += ', ';
				}
				message += Tools.escapeHTML(list[j].oldid + " -> " + list[j].name);
			}
		} 
		this.$joinLeave.html('<small style="color: #555555">' + message + '<br />' + '</small>');
	};

	UserPopup.prototype.updateOrig = UserPopup.prototype.update;
	UserPopup.prototype.update = function(data) {
		var ret = this.updateOrig(data);

		if (data && data.userid === this.data.userid) {
			data = _.extend(this.data, data);
		} else {
			data = this.data;
		}
		var names = [];
		var addOldNames = function(userid, first) {
			if ((!first && userid === data.userid) || names.indexOf(userid) !== -1) return;
			if (userid !== data.userid) names.push(userid);
			for (var i in oldNames[userid]) {
				addOldNames(oldNames[userid][i], false);
			}
		};
		addOldNames(data.userid, true);
		if (names.length !== 0) $('.ps-popup > .userdetails > .rooms').append('<br><em>Previous names:</em> ' + names.sort().join(', '));

		return ret;
	};
}, false);