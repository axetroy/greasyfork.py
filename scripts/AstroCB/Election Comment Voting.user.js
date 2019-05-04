// ==UserScript==
// @name            Election Comment Voting
// @namespace   http://github.com/AstroCB
// @description  Adds the upvote button back to election pages, as the backend still supports them
// @author          AstroCB (Cameron Bernhardt)
// @version        2.0
// @include        http://stackoverflow.com/election*
// ==/UserScript==
var comments = document.getElementsByClassName("comment-score");

for (var i = 0; i < comments.length; i++) {
	if (comments[i].parentElement.children[1].children.length < 1) {
		var vote = document.createElement("a");
		vote.setAttribute("class", "comment-up comment-up-off");
		vote.setAttribute("onclick", "function(){ this.remove(); }");
    var flag = document.createElement("a");
    flag.setAttribute("class", "flag
		comments[i].parentElement.appendChild(vote);
	}
}