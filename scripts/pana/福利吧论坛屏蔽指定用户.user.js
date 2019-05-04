// ==UserScript==
// @name         福利吧论坛屏蔽指定用户
// @namespace    https://greasyfork.org/zh-CN/users/193133-pana
// @version      2.1.1
// @description  屏蔽指定用户
// @author       pana
// @include      http*://www.wnflb2019.com/*
// @include      http*://www.wnflb19.com/*
// @run-at       document-idle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @noframes
// ==/UserScript==

(function() {
	'use strict';
	const old_url = location.href;
	const headTitle = '屏蔽指定用户设置 v2.1.1';
	const checkboxValue = {
		startArray: ['startInput', '启用屏蔽功能'],
		replyArray: ['replyInput', '同时其屏蔽回复'],
		reply_hide_Array: ['hideInput', '同时屏蔽已经被屏蔽的回复'],
		saveCloseArray: ['saveCloseInput', '保存的同时关闭设置框'],
		showHideBtnArray: ['showHideBtnInput', '显示屏蔽按钮']
	};
	var CLConfig = {};
	var defaultConfig = {
		functionEnable: true,
		replyEnable: true,
		reply_hide_Enable: true,
		save_close_Enable: true,
		show_hide_Enable: true,
		userNameArray: []
	};

	function string2array(textString) {
		let tempArray = textString.split(',');
		let returnArray = [];
		for (let i = 0, l = tempArray.length; i < l; i++) {
			for (let j = i + 1; j < l; j++) {
				if (tempArray[i] === tempArray[j]) {
					++i;
					j = i
				}
			}
			returnArray.push(tempArray[i])
		}
		return returnArray
	}
	function array2string(textArray) {
		return textArray.join(',')
	}
	function expandWrap(idValue) {
		if (document.getElementById(idValue).style.display === 'block') {
			document.getElementById(idValue).style.display = 'none'
		} else {
			document.getElementById(idValue).style.display = 'block'
		}
	}
	function insertCheckbox(ulNode, liArray, checkEnableValue) {
		let tempLi = document.createElement('li');
		tempLi.innerHTML = '<label style="vertical-align: middle;"><input id="' + liArray[0] + '" type="checkbox" style="margin-right: 5px;"' + (checkEnableValue === true ? 'checked' : '') + '>' + liArray[1] + '</label>';
		ulNode.appendChild(tempLi)
	}
	function insertHideBtn(spanNode, nameText) {
		let aBtn = document.createElement('a');
		aBtn.className = 'hideBtn';
		aBtn.innerText = '屏蔽';
		aBtn.title = '屏蔽该用户';
		aBtn.setAttribute('style', 'cursor: pointer; text-decoration: none; color: #0090e0; margin-left: 5px;');
		aBtn.addEventListener('click', function() {
			CLConfig.userNameArray.push(nameText);
			document.getElementById('userNameText').value = array2string(CLConfig.userNameArray);
			GM_setValue('Config', CLConfig);
			HideFunction()
		});
		spanNode.appendChild(aBtn)
	}
	function decideHideBtn(spanNode) {
		return spanNode.getElementsByClassName('hideBtn').length === 0
	}
	function insertCardHideBtn(liNode, nameText) {
		let liBtn = document.createElement('li');
		let aBtn = document.createElement('a');
		aBtn.className = 'hideBtn';
		aBtn.innerText = '屏蔽';
		aBtn.title = '屏蔽该用户';
		aBtn.setAttribute('style', 'color: #0090e0; cursor: pointer;');
		aBtn.addEventListener('click', function() {
			CLConfig.userNameArray.push(nameText);
			document.getElementById('userNameText').value = array2string(CLConfig.userNameArray);
			GM_setValue('Config', CLConfig);
			HideFunction()
		});
		liBtn.appendChild(aBtn);
		liNode.appendChild(liBtn)
	}
	function blockHideBtn() {
		let hideObj = document.getElementsByClassName('hideBtn');
		for (let i = 0; i < hideObj.length; i++) {
			hideObj[i].style.display = 'none'
		}
	}
	function showHideBtn() {
		let hideObj = document.getElementsByClassName('hideBtn');
		for (let i = 0; i < hideObj.length; i++) {
			hideObj[i].style.display = ''
		}
	}
	function HideFunction() {
		if (old_url.indexOf('mod=forumdisplay') !== -1) {
			let tbodyObj = document.getElementsByTagName('tbody');
			for (let i = 0; i < tbodyObj.length; i++) {
				if (tbodyObj[i].getElementsByClassName('by')[0] !== undefined) {
					let byObj = tbodyObj[i].getElementsByClassName('by')[0];
					let citeObj = byObj.getElementsByTagName('cite')[0];
					let emObj = byObj.getElementsByTagName('em')[0];
					if (citeObj !== undefined) {
						let spanObj = emObj.getElementsByTagName('span')[0];
						let userName = citeObj.getElementsByTagName('a')[0].innerText;
						if (decideHideBtn(spanObj)) {
							insertHideBtn(spanObj, userName)
						}
						if ((CLConfig.functionEnable === true) && (CLConfig.userNameArray.indexOf(userName) !== -1)) {
							citeObj.parentNode.parentNode.parentNode.style.display = 'none'
						} else {
							citeObj.parentNode.parentNode.parentNode.style.display = ''
						}
					}
				}
			}
			if ((CLConfig.functionEnable !== true) || (CLConfig.show_hide_Enable !== true)) {
				blockHideBtn()
			} else {
				showHideBtn()
			}
		}
		if (old_url.indexOf('mod=viewthread') !== -1) {
			let favatarObj = document.getElementsByClassName('favatar');
			let pctObj = document.getElementsByClassName('pct');
			let pmObj = document.getElementsByClassName('pm2');
			for (let i = 0; i < favatarObj.length; i++) {
				let xwTag = favatarObj[i].getElementsByClassName('xw1')[0];
				if (decideHideBtn(pmObj[i].parentNode)) {
					insertCardHideBtn(pmObj[i].parentNode, xwTag.innerText)
				}
				if ((CLConfig.functionEnable === true) && (CLConfig.replyEnable === true) && (CLConfig.userNameArray.indexOf(xwTag.innerText) !== -1)) {
					xwTag.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none'
				} else if ((CLConfig.functionEnable === true) && (CLConfig.reply_hide_Enable === true) && (pctObj[i].getElementsByClassName('locked').length > 0)) {
					pctObj[i].parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none'
				} else {
					pctObj[i].parentNode.parentNode.parentNode.parentNode.parentNode.style.display = ''
				}
			}
			if ((CLConfig.functionEnable !== true) || (CLConfig.replyEnable !== true) || (CLConfig.show_hide_Enable !== true)) {
				blockHideBtn()
			} else {
				showHideBtn()
			}
		}
	}
	function initCL() {
		let expandDiv = document.createElement('div');
		expandDiv.id = 'expandDiv';
		expandDiv.title = '屏蔽指定用户设置';
		expandDiv.setAttribute('style', 'display: block; position: fixed; top: 20px; right: 60px; float: right; border: 1px solid #fff; border-radius: 3px; padding: 6px; background-color: #2866bd; color: #fff; font-size: 13px; cursor: pointer;');
		expandDiv.innerText = '屏蔽设置';
		let wrapDiv = document.createElement('div');
		wrapDiv.id = 'wrapDiv';
		wrapDiv.setAttribute('style', 'position: fixed; top: 4vw; right: 2vw; z-index: 9999; background-color: #fff; text-align: left; display: block; padding: 0; margin: 0; border: 1px solid #a0a0a0; border-radius: 3px; color: #000; font-size: 13px; display: none;');
		let mainTag = document.createElement('fieldset');
		mainTag.id = 'mainTan';
		mainTag.setAttribute('style', 'border: 3px solid #ccc; border-radius: 3px; padding: 4px 9px 6px 9px; margin: 8px; min-width: 300px; width: auto; height: auto;');
		wrapDiv.appendChild(mainTag);
		let legendTag = document.createElement('legend');
		legendTag.innerText = headTitle;
		mainTag.appendChild(legendTag);
		let ulTag = document.createElement('ul');
		ulTag.setAttribute('style', 'list-style: none; padding-left: 0;');
		mainTag.appendChild(ulTag);
		insertCheckbox(ulTag, checkboxValue.startArray, CLConfig.functionEnable);
		insertCheckbox(ulTag, checkboxValue.replyArray, CLConfig.replyEnable);
		insertCheckbox(ulTag, checkboxValue.reply_hide_Array, CLConfig.reply_hide_Enable);
		insertCheckbox(ulTag, checkboxValue.saveCloseArray, CLConfig.save_close_Enable);
		insertCheckbox(ulTag, checkboxValue.showHideBtnArray, CLConfig.show_hide_Enable);
		let textLi = document.createElement('li');
		textLi.innerHTML = '<br />用户名列表:(以 , 分隔)<br /><textarea id="userNameText" style="width: 94%; height: 80px; margin-left: 5px;">' + array2string(CLConfig.userNameArray) + '</textarea>';
		ulTag.appendChild(textLi);
		let saveButton = document.createElement('button');
		saveButton.id = 'saveButton';
		saveButton.type = 'button';
		saveButton.setAttribute('style', 'position: relative; float: right; margin-right: 5px; margin-top: 5px;');
		saveButton.innerText = '保存';
		ulTag.appendChild(saveButton);
		let cancelButton = document.createElement('button');
		cancelButton.id = 'cancelButton';
		cancelButton.type = 'button';
		cancelButton.setAttribute('style', 'position: relative; float: left; margin-left: 5px; margin-top:5px;');
		cancelButton.innerText = '取消';
		ulTag.appendChild(cancelButton);
		let header = document.getElementById('hd');
		header.appendChild(expandDiv);
		header.appendChild(wrapDiv);
		document.getElementById('expandDiv').addEventListener('click', function() {
			expandWrap('wrapDiv')
		}, false);
		document.getElementById('saveButton').addEventListener('click', function() {
			CLConfig.functionEnable = document.getElementById(checkboxValue.startArray[0]).checked;
			CLConfig.replyEnable = document.getElementById(checkboxValue.replyArray[0]).checked;
			CLConfig.reply_hide_Enable = document.getElementById(checkboxValue.reply_hide_Array[0]).checked;
			CLConfig.save_close_Enable = document.getElementById(checkboxValue.saveCloseArray[0]).checked;
			CLConfig.show_hide_Enable = document.getElementById(checkboxValue.showHideBtnArray[0]).checked;
			CLConfig.userNameArray = string2array(document.getElementById('userNameText').value);
			GM_setValue('Config', CLConfig);
			HideFunction();
			if (CLConfig.save_close_Enable === true) {
				document.getElementById('wrapDiv').style.display = 'none'
			}
		}, false);
		document.getElementById('cancelButton').addEventListener('click', function(e) {
			document.getElementById('wrapDiv').style.display = 'none';
			e.stopPropagation()
		}, false)
	}
	Promise.all([GM_getValue('Config')]).then(function(data) {
		if (data[0] !== undefined) {
			CLConfig = data[0]
		} else {
			CLConfig = defaultConfig
		}
		initCL();
		HideFunction();
		try {
			GM_registerMenuCommand('屏蔽指定用户设置', function() {
				document.getElementById('wrapDiv').style.display = 'block'
			})
		} catch (e) {
			console.log(e)
		}
		try {
			let observer = new MutationObserver(function() {
				HideFunction()
			});
			let listenerContainer = document.querySelector("body");
			let option = {
				'childList': true,
				'subtree': true
			};
			observer.observe(listenerContainer, option)
		} catch (e) {
			console.log(e)
		}
	}).
	catch (function(except) {
		console.log(except)
	})
})();