// ==UserScript==
// @name         DictVoice
// @namespace    http://www.fireawayh.info/about/
// @version      0.8
// @description  选择单词 按下 ALT + S 稍等几秒即可朗读
// @run-at       document-end
// @author       FireAwayH
// ==/UserScript==

// 如果在中国 就把false改成true
var china = false;

var init = function(){
	var hideIframe = document.createElement("iframe");
	hideIframe.style.display = "none";
	hideIframe.id = "spellIt";
	document.body.appendChild(hideIframe);
	handeler();
}


var spellIt = function(){
	var word = window.getSelection().toString().trim();
	var hideIframe = document.getElementById('spellIt');
	if(!china){
		if(word.match(/^[\u2E80-\u9FFF]+$/)){
			hideIframe.src = "https://translate.google.co.uk/translate_tts?ie=UTF-8&q=" + word + "&tl=zh-CN&total=1&idx=0&textlen=17&tk=459378|74429&client=t&prev=input&ttsspeed=0.24"
		}else{
			hideIframe.src = "https://translate.google.co.uk/translate_tts?ie=UTF-8&q=" + word + "&tl=en&total=1&idx=0&textlen=5&tk=861232|722175&client=t&prev=input";
		}
	}else if(!word.match(/ /)){
		hideIframe.src = "https://dict.youdao.com/dictvoice?audio=" + word + "&type=1";
	}
}

var handeler = function(){
	document.addEventListener("keydown", function(event){
		if(event.altKey && event.keyCode == 83){
			spellIt();
		}
	}, false);
}

// window.onload = function(){
	init();
// }
