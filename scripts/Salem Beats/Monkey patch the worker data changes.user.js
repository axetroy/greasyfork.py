// ==UserScript==
// @name         Monkey patch the worker data changes
// @namespace    salembeats
// @version      1
// @description  Make sure this code is run first. And if you inspect the code: Don't try this at home, kids. (plz seriously don't look at this code and think its OK to fuck with Object prototypes lol)
// @author       Cuyler Stuwe (salembeats)
// @include      https://worker.mturk.com/*
// @grant        none
// ==/UserScript==

Object.defineProperty(Object.prototype, "hit_requirements", {
	get: function() {return this.project_requirements;},
	set: function(val) {this.project_requirements = val;}
});