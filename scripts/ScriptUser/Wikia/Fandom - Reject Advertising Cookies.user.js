// ==UserScript==
// @name         Wikia/Fandom - Reject Advertising Cookies
// @namespace    https://greasyfork.org/en/users/227-scriptuser
// @version      1.1
// @description  Automatically reject the advertising cookies and get rid of the annoying popup.
// @author       ScriptUser
// @include      *.fandom.com/*
// @include      *.wikia.com/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA25JREFUWAntlllsDlEUx38tqqQSVNFaIqpqqa3W2mupePEg8eKFEIJYg9hbitq3ICEeLLE8eJEgtgaJfWm1aqlSW4LEFqKiQnCO+43O932d+b7hwUvvw8zcueee/2/uOffciaBd6k/+Y4v8j9q/pasAqlYg/BWIawDrVsCAvu55278PbN8ITRPc7Xyj1YiLXxrSsmEcZC+GJuK0R1d4/QaePQ+e1q83TJsEdWKgZ3fIuwWfyoLtbG9CAzRuBMsWQYNY2HsAateG4RnBEH16wfTJ8OMHvHsP9etBWg+4mQdln22S/o/uAPGNjXhsfdi2E86chcvXIKWdP0RvEZ85xUAtkTAdOizC+aDhGNAPbgjE58ohIhwrYUK8Ea9XF3btgVO5FejR0bBkHrRuBcUlkJxkxLNWmq+3LNVHtqzet++QKWBv3lojf+7OSbhgNqh4+Vd/cZ1aXg7L10DJI2ibbPqB4mr38pUIC1SM5MTs6fomqDkD6PJri65p4ml6FVcL4sFDkxfdUivG7E8tW0DNKLD82cfk2RnAbjhnhoDIsgc2O8SEsTBsiL9F3zSTmJHOMs4j6uphKZy/YGKdOd8bhCWeXwh37/uD2XruAKWPTfYfPxkexIuXoCsxa6r58oLbsGGLf2LaxPXRGUCTr2MK1KoFu/fD0ROhIXLPGfdaEwrvwNrNEn8JnZWoAeLuAFp0dBtlynbT4qP9I8fcIRJ85bewSMQ3mQTOktBpHdl3sBJ5cC5Ej5/Ah4+QMRg6tIcrUoC0tFavDhpfLUaXrsJ32ePa9N3oUVB0F1bLWRBVA7IWQovmsHUHXLxi7AKuzgBqWKoQH2DoIOjUwQdRIIGTyGndtyB6dTcxv1cMqzZADRHXQqVbUMUvXA6Qrei6A6idBTEk3QdxHfIFIiLClFr98vT+piLmrDdwGrbEliHF1X1ogECIzh1lJXwQKqwnZfEDyFkn4gKlX94qMSzx8AHsEIMHQmonSSw5Hbt18X25iGtbNFeSNClscZ0iGeWhnT5rjCeOg+bN4MlTWLEWfsqfvYont/Ykrs68AegMO4QeMnoijhwBbbyLqzvn41hH3VqG7AxdCW36ExIi241h8NX7Clg+rJUYP8aUa5etZk2p7P73K2B501L95YvV83yP9DwjcMI/iKurfwcIBPLYrwL4BU8CHfg3DJK1AAAAAElFTkSuQmCC
// @run-at       document-end
// @grant        none
// ==/UserScript==

// Extended console output
var scriptName = "Wikia/Fandom - Reject Advertising Cookies";
var scriptMessage = "Advertising cookie has been rejected!";
var logCSS1 = "background: #000; color: #00FF00; padding: 3px 0px 3px 3px";
var logCSS2 = "background: #000; color: #2adaff; padding: 3px 0px";
var logCSS3 = "background: #000; color: #FFFF00; padding: 3px 3px 3px 0px";

window.onload = function findPopup() {
	var popup = document.getElementsByTagName("div");
	var findText = "REJECT ADVERTISING COOKIES";
	var found;
	for (var i = 0; i < popup.length; i++) {
		if (popup[i].textContent == findText) {
			found = popup[i];
			popup[i].click();
			console.log ("%c[Userscript] %c[" + scriptName + "]%c " + scriptMessage, logCSS1, logCSS2, logCSS3);
			break;
		}
	}
}
