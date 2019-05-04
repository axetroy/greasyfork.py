// ==UserScript==
// @name         Starve.io Quick Messages
// @namespace    http://starve.io/
// @version      0.1
// @description  Quick Messages for Starve.io (in the game, say /help for help)
// @author       CX
// @run-at       document-ready
// @match        *://starve.io/*
// ==/UserScript==

(function(exe) {
  var lop = 3000, loop = function() {
    if (typeof user !== "undefined") { return exe(); }
    setTimeout(loop, Math.max(100, lop *= 0.6));
  };
  setTimeout(loop, lop);
})(function() {
  "use strict";
  
  var ls = typeof localStorage === "undefined" ? {} : localStorage;

  // Main commands
  var main = ls.quick_messages ? JSON.parse(ls.quick_messages) : {
    o: "Get out, or I'll kill you.",
    t: "Team please?",
    s: "I'm starving!!!",
    f: "I'm freezing!!!",
    w: "NO weapon at base!",
    h: "Uh, I'm low on health.",
    r: "Secret: I'm using an auto message mod.",
    b: "I was killed by $0!"
  };
  
  // Core commands
  var core = {
    set: function set(s, data) {
      data[s.shift()] = s.join(" ");
    },
    del: function del(s, data) {
      delete data[s[0]];
    },
    save: function save(s, data) {
      ls.quick_messages = JSON.stringify(main);
    },
    list: function list() {
      return alert("List of commands:\n/" + Object.keys(main).join(" \n/"));
    },
    help: function help() {
      return alert('Hi, welcome to Starve.io Quick Messages!\nTo use a command, do "/commandname" (without the quotes)\nThere are 13 default commands, including the 5 core commands:\n/set /del /save /list /help\nTo add a custom command, do "/set n Hello there!"\nThen you can do "/n" and it will automatically turn into "Hello there!"\n/del delete a command\n/save must be used after adding a command to save it\n/list list all commands.\nNote: In text commands, you can use $0 to $9 to accept arguments:\n/set kb I was killed by $0!\n/kb an idiot\nAnd that would return:\nI was killed by an idiot!\nGood luck!');
    }
  };
  
  // Override
  for (var i in core) {
    main[i] = core[i];
  }
  
  // Attach
  user.chat.input.onkeydown = function (e) {
    if (e.keyCode != 13) return;
    var cur = user.chat.input.value;
    if (!cur || cur[0] != "/") return;
    var q = cur && cur.slice(1).split(" ");
    var to = main[q.shift()];
    if (!to) {
      return;
    }
    user.chat.input.value = typeof to == "function" ? to(q, main) || "" : to.replace(/\$[0-9]+/g, function (r) {
      return q[+r.slice(1)] || "";
    });
  };
});