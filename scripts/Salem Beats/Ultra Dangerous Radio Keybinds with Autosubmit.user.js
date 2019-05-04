// ==UserScript==
// @name         Ultra Dangerous Radio Keybinds with Autosubmit
// @namespace    salembeats
// @version      5
// @description  Super-lean autosubmit script using number keys. Latest update: Updated for worker.
// @author       Cuyler Stuwe (salembeats)
// @include      *
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

var nullClick = {
	click: function() {}
};

(function main() {

	if(window !== window.top && document.referrer.includes("worker.mturk.com/projects")) {

		const gmActive = GM_getValue("active");
		let isActive = (gmActive === undefined ? true : Boolean(gmActive));

		const onOffElement = document.createElement("DIV");
		onOffElement.id = "onOffDiv";
		onOffElement.innerHTML = `<input id="onOff" type="checkbox"` +
			`${(isActive ? 'checked' : '')}/>` +
			`On/Off Switch For Ultra Dangerous Radio Keybinds by Cuyler Stuwe (salembeats)`;
		document.body.insertAdjacentElement('beforebegin', onOffElement);

		const onOffCheckBox = document.getElementById("onOff");
		onOffCheckBox.addEventListener('change', function handleOnOff() {
			isActive = onOffCheckBox.checked;
			GM_setValue("active", isActive);
		});

		document.addEventListener('keydown', function handleKeydown(event) {
			const radios = document.querySelectorAll("input[type='radio']");
			const keyValue = Number(event.key);
			if(isActive && Number.isInteger(keyValue) && keyValue <= radios.length) {
				(radios[keyValue-1] || nullClick).click();
				document.querySelector("input[type='submit']").click();
			}
		});

		window.focus();
	}
	else {
		return;
	}
})();