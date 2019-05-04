// ==UserScript==
// @name          WebUntis Auto Login
// @namespace     openbyte/wual
// @author        OpenByte
// @icon          https://image.ibb.co/nfdp5m/logo.png
// @description   This script automatically performs a login on WebUntis pages.
// @license       MIT License
// @encoding      utf-8
// @require       https://greasyfork.org/scripts/34555-greasemonkey-4-polyfills/code/Greasemonkey%204%20Polyfills.js?version=227108
// @require       https://greasyfork.org/scripts/28366-userscript-config-page-api/code/Userscript%20Config%20Page%20API.js?version=227297
// @include       http*://*.webuntis.com/WebUntis/*
// @include       http*://*.greasyfork.org/*/scripts/33597-webuntis-auto-login
// @include       http*://greasyfork.org/*/scripts/33597-webuntis-auto-login
// @include       http*://*.greasyfork.org/*/scripts/33597-webuntis-auto-login/*
// @include       http*://greasyfork.org/*/scripts/33597-webuntis-auto-login/*
// @version       0.4.0
// @run-at        document-idle
// @grant         GM_setValue
// @grant         GM_getValue
// @grant         GM_addStyle
// @grant         GM.setValue
// @grant         GM.getValue
// @grant         GM.addStyle
// ==/UserScript==
/* jshint esversion: 6 */


(async () => {
    await CONFIG.GREASYFORK.init(33597, [
        await CONFIG.generateTextOption("SCHOOL", "School: ", "", 1, "text"),
        await CONFIG.generateTextOption("USER", "Username: ", "", 2, "text"),
        await CONFIG.generateTextOption("PASS", "Password: ", "", 3, "password"),
        await CONFIG.generateCheckboxOption("WAIT_FOR_BROWSER_TO_SET_DATA", "WAIT_FOR_BROWSER_TO_SET_DATA: ", true, 4)
    ]);
    

    async function run() {
        function isEmpty(ar) {
            return isNull(ar) || isNull(ar.length) || ar.length <= 0;
        }
        function isNull(e) {
            return typeof e === "undefined" || e === null;
        }

        function submitForm(form) {
            form.submit();
            let submit = form.querySelector("button[type=submit], input[type=submit]");
            if (!isNull(submit))
                submit.click();
        }

        function repeatUntil(f, timeout=1000, max=20) {
            const iid = setInterval(function () {
                let ret = --max >= 0;
                if (ret)
                    ret = !f();
                if (!ret)
                    clearInterval(iid);
            }, timeout);
        }

        function findLoginForm() {
            let forms;
            let popover = document.getElementById("un-login-popover");
            if (!isNull(popover)) {
                forms = popover.getElementsByTagName("form");
                if (!isEmpty(forms))
                    return forms[0];
            } else {
                forms = document.forms;
                if (!isEmpty(forms))
                    return forms[0];
            }
            return false;
        }


        const WAIT_FOR_BROWSER_TO_SET_DATA = await CONFIG.getValue("WAIT_FOR_BROWSER_TO_SET_DATA");

        const school_value = await CONFIG.getValue("SCHOOL");
        const user_value = await CONFIG.getValue("USER");
        const pass_value = await CONFIG.getValue("PASS");


        let fireEvent = function (element, eventName) {
            if (element.fireEvent)
                element.fireEvent( 'on' + eventName );
            else {
                var evObj = document.createEvent( 'Events' );
                evObj.initEvent(eventName, true, false);
                element.dispatchEvent(evObj);
            }
        };

        let setInputValue = function (input, value) {
            fireEvent(input, "hover");
            fireEvent(input, "mouseover");
            fireEvent(input, "mouseenter");
            fireEvent(input, "click");
            //input.focus();
            fireEvent(input, "focus");
            input.setAttribute("value", value);
            input.value = value;
            fireEvent(input, "keydown");
            fireEvent(input, "keypress");
            fireEvent(input, "input");
            fireEvent(input, "keyup");
            fireEvent(input, "mouseleave");
            //input.blur();
            fireEvent(input, "change");
            fireEvent(input, "blur");
        };

        function execute() {
            let form = findLoginForm();
            if (!form) {
                let login = document.getElementsByClassName("btn-login");
                if (!isEmpty(login)) {
                    login[0].click();
                }
                return execute();
            }

            let container = form.getElementsByClassName("form-group");
            if (isEmpty(container)) {
                container = [form];
            }

            let inputs = [];
            for (let c of container) {
                let input = c.getElementsByTagName("input");
                if (!isEmpty(input))
                    inputs.push.apply(inputs, input);
            }

            let text = [];
            let password = [];
            for (let e of inputs) {
                let type = e.getAttribute("type");
                if (type === "text")
                    text.push(e);
                else if (type === "password")
                    password.push(e);
            }
            if (text.length < 2 || password.length < 1)
                return false;
            let school = text[0];
            let user = text[1];
            if (WAIT_FOR_BROWSER_TO_SET_DATA) {
                repeatUntil(function() {
                    if (school.value.trim() !== "" && user.value.trim() !== "") {
                        submitForm(form);
                        return true;
                    }
                }, 100, 20);
            } else {
                setInputValue(school, school_value);
                setInputValue(user, user_value);
                for (let pass of password)
                    setInputValue(pass, pass_value);
                setTimeout(function() {
                    submitForm(form);
                    return true;
                }, 200);
            }
            return false;
        }

        repeatUntil(function () {
            try { execute(); } catch(e) {}
        }, 500, 1);

    }

    if (!CONFIG.GREASYFORK.isConfigPage) {
        await run();
    }
})();