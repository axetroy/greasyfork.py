// ==UserScript==
// @name         zaif chat blocker
// @namespace    jp.sceneq.zaifchatblocker
// @version      0.1
// @description  try to take over the world!
// @author       sceneq
// @match        https://zaif.jp/*
// @grant        none
// ==/UserScript==

// !! 注意 このスクリプトの自動更新は無効にして下さい !!

// ここを適当に正規表現でいじる。決め打ちならバーティカルバー(|)区切りで指定
const regNgNickName = /ユーザA|ユーザB|ユーザZ/;
const regNgContent = /めちゃ上がる|ノアコイン|クソ上がる/;

const nickNameSelector = "span.nickname";
const contentSelector = "span.content";
const commentsWrapper = document.getElementById("cc_area");

const blockByNickName = (commentNode) => {
	commentsWrapper.removeChild(commentNode);
	//commentNode.style = "color:#fff";
};

const blockByContent = (commentNode) => {
	commentsWrapper.removeChild(commentNode);
	//commentNode.querySelector(contentSelector).innerText = "うんこって書きました。また書きます。";
};

const observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		for(const commentNode of mutation.addedNodes){
			// 名前でブロック
			const nickname = commentNode.querySelector(nickNameSelector).innerText;
			if(regNgNickName.test(nickname)){
				blockByNickName(commentNode);
				//console.log(nickname, "blcoked");
				break;
			}

			// コンテンツでブロック
			const content = commentNode.querySelector(contentSelector).innerText;
			if(regNgContent.test(content)){
				blockByContent(commentNode);
				break;
			}
		}
	});
});

if(commentsWrapper){
	observer.observe(commentsWrapper, {childList: true});
}

