// ==UserScript==
// @name         SubyShare timeout bypass
// @namespace    timeout.bypass
// @version      0.0.0.1
// @description  Shows Download button immediately
// @author       AHOHNMYC
// @match        https://subyshare.com/*
// @grant        none
// ==/UserScript==

const codeInput = document.querySelector('[name="code"]');
if (!codeInput) {
	document.querySelector('[name="method_free"]').click();
} else {
	document.getElementById('countdown').style.display = 'none';
	document.querySelector('.downloadbtn').removeAttribute('disabled');
	document.querySelector('.downloadbtn').style = 'display: block; margin-bottom: 20px;';
	codeInput.focus();
}
