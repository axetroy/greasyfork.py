// ==UserScript==
// @name         Diep.io Upgrade Shortcuts Macro
// @version      1.0.1
// @description  Add shortcut keys for upgrade to Diep.io!
// @author       Mixaz017
// @match        diep.io/
// @namespace https://greasyfork.org/users/158176
// ==/UserScript==
var index,
	isMousePressed,
	mouseX,
	mouseY,
	executeID,
	staticMousePressed;
canvas.addEventListener("mousedown", e => isMousePressed = true);
canvas.addEventListener("mouseup", e => isMousePressed = false);
canvas.addEventListener("mousemove", e => {
	mouseX = e.clientX;
	mouseY = e.clientY;
});
addEventListener("keydown", e => {
	if (!e.repeat && (index = ["r", "t", "f", "g", "v", "b"].indexOf(e.key)) + 1) {
		input.mouse(index % 2 ? 190 : 90, Math.floor(index / 2) * 100 + 110);
		staticMousePressed = isMousePressed;
		canvas.dispatchEvent(new MouseEvent("mouseup"));
		canvas.dispatchEvent(new MouseEvent("mousedown"));
		if (!staticMousePressed) canvas.dispatchEvent(new MouseEvent("mouseup"));
		clearTimeout(executeID);
		executeID = setTimeout(() => {
			canvas.dispatchEvent(new MouseEvent("mousemove", {
				clientX: mouseX,
				clientY: mouseY
			}));
		}, 20);
	}
});