// ==UserScript==
// @name         Wanikani Forums: Easy Furigana
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  Adds a button to generate ruby code for furigana from <kanji>[furigana]
// @author       Kumirei
// @include      https://community.wanikani.com/*
// @require      https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js?version=115012
// @grant        none
// ==/UserScript==

(function() {
    waitForKeyElements('#reply-control .d-editor-input', (elem)=>{
			var btn = document.createElement('button');
			btn.className = "rubyfy btn no-text btn-icon ember-view";
			btn.title = "Click to generate ruby code from <kanji>[furigana]";
			btn.innerText = "R";
			btn.onclick = ()=>{
					var text = elem[0].value;
					var matches = text.match(/<[^>]*>\[[^\]]*\]/g);
					for (var i=0; i<matches.length; i++) {
							var str = matches[i];
							var [kanji, furigana] = str.slice(1,-1).split('>[');
							var rb = '<ruby>'+kanji+'<rt>'+furigana+'</rt></ruby>';
							str = str.replace('[', '\\[');
							str = str.replace(']', '\\]');
							var rgx = RegExp(str);
							text = text.replace(rgx, rb)
					}
					elem.val(text);
					elem.blur();
					elem.blur();
					elem.blur();
					elem.focus();
			};
			$('button.italic').after(btn);
	});
})();