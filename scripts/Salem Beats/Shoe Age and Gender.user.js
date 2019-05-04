// ==UserScript==
// @name         Shoe Age and Gender
// @namespace    salembaets
// @version      1.1
// @description  .
// @author       Cuyler Stuwe (salembeats)
// @include      *
// @grant        none
// ==/UserScript==

const KEYCODE_SPACE = 32;

(function main() {
	if(window === window.top) {return;}

	let ageSelector = document.querySelector("#age");
	let genderSelector = document.querySelector("#gender");

	if(!ageSelector || !genderSelector) {return;}

	let ageEntered = false;
	let genderEntered = false;

	document.body.addEventListener('keydown', function handleKeydown(event) {
		console.log("asdf");
		switch(event.key.toLowerCase()) {
			case "a":
				ageSelector.value = "Baby";
				ageEntered = true;
				break;
			case "s":
				ageSelector.value = "Child";
				ageEntered = true;
				break;
			case "d":
				ageSelector.value = "TeenAdult";
				ageEntered = true;
				break;
			case "f":
				ageSelector.value = "MoreThanOne";
				ageEntered = true;
				break;
			case "j":
				genderSelector.value = "Unisex";
				genderEntered = true;
				break;
			case "k":
				genderSelector.value = "Male";
				genderEntered = true;
				break;
			case "l":
				genderSelector.value = "Female";
				genderEntered = true;
				break;
			case ";":
				genderSelector.value = "MoreThanOne";
				genderEntered = true;
				break;
            case "g":
                genderSelector.value = "Male";
                ageSelector.value = "TeenAdult";
                ageEntered = true;
                genderEntered = true;
                break;
            case "u":
                genderSelector.value = "Unisex";
                ageSelector.value = "TeenAdult";
                ageEntered = true;
                genderEntered = true;
                break;
            case "h":
                genderSelector.value = "Female";
                ageSelector.value = "TeenAdult";
                ageEntered = true;
                genderEntered = true;
                break;
            case "h":
                break;
			default:
				break;
		}

		if(event.keyCode === KEYCODE_SPACE) {
			event.preventDefault();
			ageSelector.value = "NotAShoe";
			genderSelector.value = "NotAShoe";
			ageEntered = true;
			genderEntered = true;
		}

		if(ageEntered && genderEntered) {
			document.querySelector("#submitButton").click();
		}
	});
})();