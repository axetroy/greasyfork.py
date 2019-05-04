// ==UserScript==
// @name         R1 - be a salti boi (ramen edition)
// @description  delete limit's messages immediately if he's being a bad boi
// @version      1.2
// @author       Limit
// @match        http://www.rewards1.com/*
// @grant        none
// @namespace    https://greasyfork.org/users/141657
// ==/UserScript==
var badBoiWords = [
	'ramen',
	'mccurry'
];
var delay = window.userObj.userName === 'LiMiTx' ? 1000 : 0;
var badBoiWordsRegex = new RegExp(badBoiWords.join('|'));
var s = $('#r1_shoutbox');
var o = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if ($('.username:last').text() === 'LiMiTx' && badBoiWordsRegex.test($('.msg_content:last').text().toLowerCase())) {
			setTimeout(() => { $.ajax({ url: 'http://www.rewards1.com/ajax/shoutbox_action.php?function=delete&shout_id=' + $('.shoutbox_msg:last').attr('id').substr(4) }); }, delay);
        }
    });
});
var c = { childList: true };
o.observe(s[0], c);