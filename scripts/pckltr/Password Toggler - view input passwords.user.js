// ==UserScript==
// @name         Password Toggler - view input passwords
// @namespace    https://github.com/pckltr/password-toggler
// @version      1.2
// @description  Adds buttons to each input to show/hide passwords
// @author       pckltr
// @match        *://*/*
// ==/UserScript==

(function() {
    "use strict";

    // get all page inputs
    var pageInputs = document.getElementsByTagName("input"),
        passwordInputs = [],
        buttonStyle = ".password-toggler-button-parent {position: relative; overflow: visible;} .password-toggler-button {top: 50%; right: 8px; position: absolute; cursor: pointer; transform: translateY(-50%); background-size: cover; z-index: 9999999; background: #dcdcdc; border-radius: 100%; background-repeat: no-repeat; background-position: center center; box-sizing: border-box;} .password-toggler-show {background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0ZWQgYnkgSWNvTW9vbi5pbyAtLT4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE0IDE0Ij4KPHBhdGggZmlsbD0iIzc1NzU3NSIgZD0iTTcgMi42MjVjLTMuMDUzIDAtNS43IDEuNzc4LTcgNC4zNzUgMS4zIDIuNTk3IDMuOTQ3IDQuMzc1IDcgNC4zNzVzNS42OTktMS43NzggNy00LjM3NWMtMS4zLTIuNTk3LTMuOTQ3LTQuMzc1LTctNC4zNzV6TTEwLjQ1MSA0Ljk0NWMwLjgyMyAwLjUyNSAxLjUyIDEuMjI3IDIuMDQzIDIuMDU1LTAuNTI0IDAuODI3LTEuMjIxIDEuNTMtMi4wNDMgMi4wNTUtMS4wMzQgMC42NTktMi4yMjcgMS4wMDgtMy40NTEgMS4wMDhzLTIuNDE4LTAuMzQ4LTMuNDUxLTEuMDA4Yy0wLjgyMi0wLjUyNS0xLjUxOS0xLjIyNy0yLjA0My0yLjA1NSAwLjUyNC0wLjgyNyAxLjIyMS0xLjUzIDIuMDQzLTIuMDU1IDAuMDU0LTAuMDM0IDAuMTA4LTAuMDY3IDAuMTYyLTAuMS0wLjEzNiAwLjM3NC0wLjIxMSAwLjc3Ny0wLjIxMSAxLjE5OCAwIDEuOTMzIDEuNTY3IDMuNSAzLjUgMy41czMuNS0xLjU2NyAzLjUtMy41YzAtMC40MjEtMC4wNzUtMC44MjQtMC4yMTEtMS4xOTggMC4wNTQgMC4wMzMgMC4xMDkgMC4wNjYgMC4xNjIgMC4xdjB6TTcgNS42ODhjMCAwLjcyNS0wLjU4OCAxLjMxMy0xLjMxMyAxLjMxM3MtMS4zMTMtMC41ODgtMS4zMTMtMS4zMTMgMC41ODgtMS4zMTMgMS4zMTMtMS4zMTMgMS4zMTMgMC41ODggMS4zMTMgMS4zMTN6Ij48L3BhdGg+Cjwvc3ZnPgo=);} .password-toggler-hide {background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0ZWQgYnkgSWNvTW9vbi5pbyAtLT4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE0IDE0Ij4KPHBhdGggZmlsbD0iIzc1NzU3NSIgZD0iTTEyLjkzMyAwLjE5MmMtMC4yNTYtMC4yNTYtMC42NzItMC4yNTYtMC45MjggMGwtMi43NjQgMi43NjRjLTAuNzEtMC4yMTUtMS40NjItMC4zMzEtMi4yNDEtMC4zMzEtMy4wNTMgMC01LjcgMS43NzgtNyA0LjM3NSAwLjU2MiAxLjEyMyAxLjM3NiAyLjA5MiAyLjM2NiAyLjgzMWwtMi4xNzMgMi4xNzNjLTAuMjU2IDAuMjU2LTAuMjU2IDAuNjcyIDAgMC45MjggMC4xMjggMC4xMjggMC4yOTYgMC4xOTIgMC40NjQgMC4xOTJzMC4zMzYtMC4wNjQgMC40NjQtMC4xOTJsMTEuODEzLTExLjgxM2MwLjI1Ni0wLjI1NiAwLjI1Ni0wLjY3MiAwLTAuOTI4ek01LjY4OCA0LjM3NWMwLjU3OCAwIDEuMDY4IDAuMzczIDEuMjQzIDAuODkxbC0xLjY2NCAxLjY2NGMtMC41MTgtMC4xNzYtMC44OTEtMC42NjYtMC44OTEtMS4yNDMgMC0wLjcyNSAwLjU4OC0xLjMxMyAxLjMxMy0xLjMxM3pNMS41MDUgN2MwLjUyNC0wLjgyNyAxLjIyMS0xLjUzIDIuMDQzLTIuMDU1IDAuMDU0LTAuMDM0IDAuMTA4LTAuMDY3IDAuMTYyLTAuMS0wLjEzNiAwLjM3NC0wLjIxMSAwLjc3Ny0wLjIxMSAxLjE5OCAwIDAuNzUgMC4yMzYgMS40NDYgMC42MzggMi4wMTVsLTAuODMzIDAuODMzYy0wLjcxNy0wLjUwNC0xLjMyOS0xLjE0Ny0xLjgtMS44OTF6Ij48L3BhdGg+CjxwYXRoIGZpbGw9IiM3NTc1NzUiIGQ9Ik0xMC41IDYuMDQzYzAtMC4zNzEtMC4wNTgtMC43MjktMC4xNjUtMS4wNjVsLTQuNCA0LjRjMC4zMzYgMC4xMDcgMC42OTQgMC4xNjUgMS4wNjUgMC4xNjUgMS45MzMgMCAzLjUtMS41NjcgMy41LTMuNXoiPjwvcGF0aD4KPHBhdGggZmlsbD0iIzc1NzU3NSIgZD0iTTExLjM0OCAzLjk2NGwtMC45NDggMC45NDhjMC4wMTcgMC4wMTEgMC4wMzUgMC4wMjEgMC4wNTIgMC4wMzIgMC44MjMgMC41MjUgMS41MiAxLjIyNyAyLjA0MyAyLjA1NS0wLjUyNCAwLjgyNy0xLjIyMSAxLjUzLTIuMDQzIDIuMDU1LTEuMDM0IDAuNjU5LTIuMjI3IDEuMDA4LTMuNDUxIDEuMDA4LTAuNTI5IDAtMS4wNTEtMC4wNjUtMS41NTgtMC4xOTJsLTEuMDUxIDEuMDUxYzAuODE2IDAuMjkzIDEuNjk1IDAuNDUzIDIuNjA5IDAuNDUzIDMuMDUzIDAgNS42OTktMS43NzggNy00LjM3NS0wLjYxNi0xLjIyOS0xLjUzMy0yLjI3NS0yLjY1Mi0zLjAzNnoiPjwvcGF0aD4KPC9zdmc+Cg==);}";

    // add style element in DOM
    var style = document.createElement("style");
    style.innerHTML = buttonStyle;
    document.head.appendChild(style);

    var addButtons = function() {

        // add password inputs into an array
        for (var a = 0; a < pageInputs.length; a++) {
            if (pageInputs[a].hasAttribute("type") && pageInputs[a].getAttribute("type") === "password") {
                passwordInputs.push(pageInputs[a]);
            }
        }

        // add buttons to each password input
        for (var b = 0; b < passwordInputs.length; b++) {
            var button = document.createElement("div");
            passwordInputs[b].parentElement.className += " password-toggler-button-parent";
            passwordInputs[b].parentElement.appendChild(button);
            button.setAttribute("style", "height: " + (passwordInputs[b].offsetHeight-8) + "px; width: " + (passwordInputs[b].offsetHeight-8) + "px;");
            button.className += "password-toggler-button password-toggler-show";
            button.setAttribute("title", "Show password");
        }

        // get all buttons
        var passwordTogglers = document.getElementsByClassName("password-toggler-button");

        // toggle password inputs title, type and change button style
        function togglePasswords() {
            for (var i = 0; i < passwordInputs.length; i++) {
                if (passwordInputs[i].type === "password") {
                    passwordInputs[i].type = "text";
                    for (var j = 0; j < passwordTogglers.length; j++) {
                        passwordTogglers[j].title = "Hide password";
                        passwordTogglers[j].className = "password-toggler-button password-toggler-hide";
                    }
                } else {
                    passwordInputs[i].type = "password";
                    for (var k = 0; k < passwordTogglers.length; k++) {
                        passwordTogglers[k].title = "Show password";
                        passwordTogglers[k].className = "password-toggler-button password-toggler-show";
                    }
                }
            }
        }

        // add click event to buttons
        for (var i = 0; i < passwordTogglers.length; i++) {
            passwordTogglers[i].addEventListener("click", togglePasswords, false);
        }

        // clear inverval
        if (pageInputs.length !== 0) {
            clearInterval(buttonRepeat);
        }
    };

    // add inverval if inputs don't exist
    var buttonRepeat;
    if (pageInputs.length === 0) {
        buttonRepeat = setInterval(addButtons, 100);
    } else {
        addButtons();
    }

})();
