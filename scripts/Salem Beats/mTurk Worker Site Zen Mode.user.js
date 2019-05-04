// ==UserScript==
// @name         mTurk Worker Site Zen Mode
// @namespace    salembeats
// @version      2.1
// @description  salembeats
// @author       Cuyler Stuwe (salembeats)
// @include      https://worker.mturk.com/projects/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

var zenModeEnabled = false;

var SB_LOGO = "/9j/4AAQSkZJRgABAQIANgA2AAD/2wBDABoSExcTEBoXFRcdGxofJ0AqJyMjJ084PC9AXVJiYVxSWllndJR+Z22Mb1laga+CjJmepqemZHy2w7ShwZSjpp//2wBDARsdHSciJ0wqKkyfalpqn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5//wgARCAAgACADAREAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAwQAAQIF/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIDAP/aAAwDAQACEAMQAAABNeVjDYVsQGbLggUtVQKMhGnQvLZwUOQWqJ//xAAbEAACAwEBAQAAAAAAAAAAAAABEQACAxIxEP/aAAgBAQABBQLljiefGExL6ADD1zUqszrzUt3FrwZQef/EABsRAAIDAAMAAAAAAAAAAAAAAAABAhAREiAh/9oACAEDAQE/AcM6eCTJVGm6WI5V/8QAGhEAAgMBAQAAAAAAAAAAAAAAAAECEBESIf/aAAgBAgEBPwHo6NrGejawgqm/KisQxpsUBH//xAAZEAACAwEAAAAAAAAAAAAAAAAAAREgMSH/2gAIAQEABj8CphgxusoyBydP/8QAHhABAQEAAQQDAAAAAAAAAAAAAREAIRBBUWExcZH/2gAIAQEAAT8hJEdXkyU34NSzviYehBFqkhvwpkE955nfp9w84Ca8SaMTHlznIcnE1g4X1v/aAAwDAQACAAMAAAAQD/iBGlDS/8QAGhEAAwADAQAAAAAAAAAAAAAAAAERECFBMf/aAAgBAwEBPxBWsZuEqKpCiioeKEoleLMTUjG6DTg/dH//xAAZEQEBAQEBAQAAAAAAAAAAAAABEQAhURD/2gAIAQIBAT8QYY6fNEusZc0UdPWJDiWuUMhx9wNpuXJl7dU7v//EACIQAQEAAgIBAwUAAAAAAAAAAAERACExQWFRcZEQscHh8f/aAAgBAQABPxBthIrSf3G2pWF95hUCFXxi41GUDs7zY4nLPfCIVwV77/WHg0fdqN9MKAZ9l3+DGQ28ALghYuXx9I99d48YYEyiZ31gMyrRb8YcOKUdPxgK0CPTP//Z";

function setTrimmingsVisibility(visibilitySetting) {
    document.querySelector('footer').style.display = visibilitySetting;
    document.querySelector('hr').style.display = visibilitySetting;
    document.querySelector('.work-pipeline-bottom-bar').style.display = visibilitySetting;
    document.querySelector('.masthead').parentElement.parentElement.style.display = visibilitySetting;
    document.querySelector(".me-bar").style.display = visibilitySetting;
}

function enableZenMode() {
    setTrimmingsVisibility("none");
    zenEnabledStyling(true);
    GM_setValue("zenModeEnabled", true);
}

function disableZenMode() {
    setTrimmingsVisibility("block");
    zenEnabledStyling(false);
    GM_setValue("zenModeEnabled", false);
}

function zenEnabledStyling(enabledOrNah) {

    let zenModeToggler = document.querySelector("#zenModeToggler");
    let zenModeTogglerText = document.querySelector("#zenModeTogglerText");

    if(zenModeToggler) {

        if(enabledOrNah) {

            zenModeToggler.style.backgroundColor = "black";
            zenModeToggler.style.border = "1px solid white";
            zenModeTogglerText.style.color = "white";
        }
        else {
            zenModeToggler.style.backgroundColor = "white";
            zenModeToggler.style.border = "1px solid black";
            zenModeTogglerText.style.color = "black";
        }
    }


}

function recallZenModeConfig() {
    let zenModeSetting = GM_getValue("zenModeEnabled");

    if(zenModeSetting !== undefined) {
        if(zenModeSetting === false) {
            disableZenMode();
        }
        else {
            enableZenMode();
        }
    }
    else {
        enableZenMode();
    }
}

function toggleZenMode() {
    zenModeEnabled = !zenModeEnabled;

    if(zenModeEnabled) {
        enableZenMode();
    }
    else {
        disableZenMode();
    }
}

(function main() {

    let captcha = document.querySelector(`img.captcha-image`);

    if(!captcha) {
        let workspace = document.querySelector(".task-question-iframe-container");
        workspace.style.height = "100vh";
        workspace.focus();

        recallZenModeConfig();

        document.body.insertAdjacentHTML(`afterend`,
                                         `<div id="zenModeToggler" style="` +
                                         `position: fixed;` +
                                         `border: 1px solid white;` +
                                         `z-index: ${Number.MAX_SAFE_INTEGER - 1};` +
                                         `left: 0px;` +
                                         `opacity: 0.5;` +
                                         `top: 0px;` +
                                         `width: 1%;` +
                                         `min-width: 10px;` +
                                         `height: 100%;` +
                                         `background-color: black;` +
                                         `text-align: center;` +
                                         `">` +
                                         `</div>` +
                                         `<div id="zenModeTogglerText" style="` +
                                         `pointer-events: none;` +
                                         `color: white;` +
                                         `position: fixed;` +
                                         `z-index: ${Number.MAX_SAFE_INTEGER};` +
                                         `left: 0px;` +
                                         `top: 0px;` +
                                         `width: 1%;` +
                                         `min-width: 10px;` +
                                         `height: 50%;` +
                                         `text-align: center;` +
                                         `">` +
                                         `<img src="data: image/jpeg; base64, ${SB_LOGO}" style="margin-bottom: 50px; width:100%;"/>` +
                                         `<br/>` +
                                         `Z<br/>` +
                                         `E<br/>` +
                                         `N<br/>` +
                                         ` <br/>` +
                                         `M<br/>` +
                                         `O<br/>` +
                                         `D<br/>` +
                                         `E<br/>` +
                                         ` <br/>` +
                                         `T<br/>` +
                                         `O<br/>` +
                                         `G<br/>` +
                                         `G<br/>` +
                                         `L<br/>` +
                                         `E<br/>` +
                                         `</div>`
                                        );

        document.querySelector("#zenModeToggler").addEventListener('click', toggleZenMode);
    }
    else {
        alert("CAPTCHA encountered. Press Enter to dismiss this message.\nThe CAPTCHA input will be automatically focused for you to type.");
        let captchaInput = document.querySelector("#captchaInput");
        captchaInput.focus();
    }
})();