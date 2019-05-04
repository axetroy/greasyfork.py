// ==UserScript==
// @name         Diep.io Crosshair Pointer
// @version      1.4
// @description  Make the pointer crosshair and improve Aim.
// @author       Mixaz017
// @match        diep.io/
// @namespace https://greasyfork.org/users/158176
// ==/UserScript==
function setCursor() {
	if (
		(() => {
			try {
				return input;
			} catch (err) {
				return false;
			}
		})() && input.should_prevent_unload()) canvas.style.cursor = "crosshair";
}
document.addEventListener("mousemove", () => setCursor());
document.addEventListener("mousedown", () => setCursor());