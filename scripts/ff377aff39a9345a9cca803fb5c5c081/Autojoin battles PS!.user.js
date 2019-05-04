// ==UserScript==
// @name        Autojoin battles PS!
// @namespace   autojoinbattlesps
// @description Custom client command to autojoin battles for specific users
// @include     http://play.pokemonshowdown.com/
// @include     https://play.pokemonshowdown.com/
// @include     http://play.pokemonshowdown.com/*
// @include     https://play.pokemonshowdown.com/*
// @include     http://*.psim.us/
// @include     https://*.psim.us/
// @include     http://*.psim.us/*
// @include     https://*.psim.us/*
// @version     2.0.1
// @grant       none
// ==/UserScript==

var countInit = 0;

var watchedUsers = {};
var joinedBattles = [];

var init = function() {
  if (!ConsoleRoom.prototype.customCommands) {
    if (countInit > 10) {
      return alert('Autojoin battles: helper script not detected\nPlease download it now from https://greasyfork.org/en/scripts/33834\nThen refresh this page');
    }
    countInit++;
    return setTimeout(init, 250);
  }
  
  ConsoleRoom.prototype.customCommands['autojoinbattles'] = function(self, user) {
    user = toId(user);
    if (user === '') {
      addHelp(self);
      return false;
    }
    if (watchedUsers[user]) {
      self.add('User \'' + user + '\' is already on your autojoin list.');
      return false;
    }
    watchedUsers[user] = setInterval(function() {
      app.send('/cmd userdetails ' + user);
    }, 5000);
    self.add('You are now automatically joining ' + user + '\'' + (user.charAt(user.length - 1) !== 's' ? 's' : '') + ' battles.');
    return false;
  };
  
  ConsoleRoom.prototype.customCommands['stopautojoinbattles'] = function(self, user) {
    user = toId(user);
    if (user === '') {
      addHelp(self);
      return false;
    }
    if (!watchedUsers[user]) {
      self.add('User \'' + user + '\' isn\'t on your autojoin list.');
      return false;
    }
    clearInterval(watchedUsers[user]);
    delete watchedUsers[user];
    self.add('You are no longer automatically joining ' + user + '\'' + (user.charAt(user.length - 1) !== 's' ? 's' : '') + ' battles.');
    return false;
  };
  
  ConsoleRoom.prototype.customCommands['autojoinbattleslist'] = function(self) {
    var users = '';
    for (var i in watchedUsers) {
      if (users !== '') users += ', ';
      users += i;
    }
    if (users === '') {
      self.add('Your autojoin list is empty.');
    } else {
      self.add('Users in your autojoin list: ' + users + '.');
    }
    return false;
  };
};

var addHelp = function(self) {
  self.add('/autojoinbattles [user] - Add the user [user] to the autojoin list.');
  self.add('/stopautojoinbattles [user] - Remove the user [user] from the autojoin list.');
  self.add('/autojoinbattleslist - List all the users in your autojoin list.');
}

var parseUserdetailsResponse = function(data) {
  if (watchedUsers[data.userid]) {
    var battleid;
    for (var i in data.rooms) {
      battleid = i.replace(/[^A-Za-z0-9-]/g, '');
      if (battleid.substr(0, 7) === 'battle-' && joinedBattles.indexOf(battleid) === -1 && (toId(data.rooms[i].p1) === data.userid || toId(data.rooms[i].p2) === data.userid)) {
        ConsoleRoom.prototype.send('/j ' + battleid);
        joinedBattles.push(battleid);
      }
    }
  }
};

window.addEventListener('load', function() {
  init();
  app.on('response:userdetails', parseUserdetailsResponse, this);
});