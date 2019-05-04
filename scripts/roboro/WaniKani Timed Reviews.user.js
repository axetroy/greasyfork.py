// ==UserScript==
// @name         WaniKani Timed Reviews
// @namespace    roboro
// @version      0.1.1
// @description  Set a time limit to automatically wrap-up your reviews
// @author       You
// @match        https://wanikani.com/review/session
// @match        https://www.wanikani.com/review/session
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const msToMins = ms => Math.ceil(ms / 60000);
    const minsToMs = mins => mins * 60000;

    const STORAGE_KEY = 'reviewTimerSettings';
    const DEFAULT_SETTINGS = {
        enabled: true,
        timer: minsToMs(25)
    };

    const setUpConfigMenu = () => {
        const footer = document.querySelector('footer');

        const menu = document.createElement('div');
        menu.id = 'reviewTimerArea';
        menu.style = 'position: relative; display: inline-block; padding: 10px; font-size: 90%;';

        menu.innerHTML = `
            <style>
                #reviewTimerMenu {
                    display: none; position: absolute; bottom: 100%;
                    right: 0; padding: 10px;
                    border: 1px solid #ccc;
                    background-color: #fff;
                    min-width: 200px;
                    border-radius: 4px;
                }

                #reviewTimerMenu ul {
                    margin: 0;
                    padding: 0;
                }

                #reviewTimerMenu li {
                    display: flex;
                    justify-content: space-between;
                    margin: 10px 0;
                }

                #reviewTimerMenu button {
                    width: 100%;
                    background-color: #444;
                    color: #fff;
                    border: 0;
                    border-radius: 4px;
                    padding: 5px;
                }

                #reviewTimerMenu button#timerRestart {
                    background-color: #aaa;
                }

                #reviewTimerDuration {
                    max-width: 50px;
                    text-align: center;
                }

                #reviewTimerMenu li#remainingTime {
                    justify-content: center;
                    color: #777;
                }

                #reviewTimerMenuToggle {
                    cursor: pointer;
                }
            </style>
            <span id="reviewTimerMenuToggle">Timer Options</span>
            <div id="reviewTimerMenu"></div>
        `;

        menu.querySelector('#reviewTimerMenuToggle').addEventListener('click', toggleMenu);

        footer.prepend(menu);
    }

    const getSettings = () => {
        let storedSettings = {};

        try {
            storedSettings = JSON.parse(localStorage.getItem(STORAGE_KEY));
        } catch (e) {}

        return Object.assign({}, DEFAULT_SETTINGS, storedSettings);
    }

    const saveSettings = newSettings => {
        const currentSettings = getSettings();
        const settingsToSave = Object.assign({}, currentSettings, newSettings);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settingsToSave));

        const forceTimerRestart = currentSettings.timer !== newSettings.timer;
        updateTimerSettings(forceTimerRestart);
    }

    let timeoutId;
    const updateTimerSettings = forceRestart => {
        const settings = getSettings();

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        if (forceRestart) {
            sessionStorage.removeItem('timeoutTarget');
        }

        if (settings.enabled) {
            // Page has just loaded
            const remaining = getRemainingTime();
            const timeout = remaining > 0 ? remaining : settings.timer;

            timeoutId = setTimeout(onTimeComplete, timeout);
            sessionStorage.timeoutTarget = Date.now() + timeout;
        } else {
            sessionStorage.removeItem('timeoutTarget');
        }
    }

    const onTimeComplete = () => {
        const wrapUpBtn = document.querySelector('#option-wrap-up:not(.wrap-up-selected)');

        if (wrapUpBtn) {
            wrapUpBtn.click();
        }
    }

    const openMenu = () => {
        const settings = getSettings();
        const remainingMins = msToMins(getRemainingTime());

        const reviewTimerMenu = document.querySelector('#reviewTimerMenu');
        reviewTimerMenu.style.display = 'block';
        reviewTimerMenu.innerHTML = `
            <ul>
                <li id="remainingTime" style="${ settings.enabled ? '' : 'display: none'}">
                    ${remainingMins} minute${remainingMins === '1' ? '' : 's'} remaining
                </li>
                <li>Enabled <input id="reviewTimerEnabled" type="checkbox" ${settings.enabled ? 'checked' : ''} /></li>
                <li>Timer Duration (Minutes) <input id="reviewTimerDuration" type="number" min="1" step="1" required value="${msToMins(settings.timer)}" /></li>
                <li><button id="saveTimerOptions">Save</button></li>
                <li><button id="timerRestart">Restart Timer</button></li>
            </ul>
        `;

        reviewTimerMenu.querySelector('#timerRestart').addEventListener('click', ev => {
            ev.preventDefault();
            updateTimerSettings(true);
            closeMenu();
        });

        reviewTimerMenu.querySelector('#saveTimerOptions').addEventListener('click', () => {
            saveSettings({
                enabled: document.querySelector('#reviewTimerEnabled').checked,
                timer: minsToMs(document.querySelector('#reviewTimerDuration').value)
            });
            closeMenu();
        });

        // WaniKani disables the backspace button when the answer field isn't focused.
        // This stops the backspace event from being handled by WaniKani when the timer
        // input field is focused.
        reviewTimerMenu.querySelector('#reviewTimerDuration').addEventListener('keydown', ev => {
           if (ev.keyCode === 8) {
               ev.stopPropagation();
           }
        });
    }

    const closeMenu = () => {
        document.querySelector('#reviewTimerMenu').style.display = 'none';
    }

    const toggleMenu = () => {
        const menu = document.querySelector('#reviewTimerMenu');
        if (menu.style.display === 'block') {
            closeMenu();
        } else {
            openMenu();
        }
    }

    const getRemainingTime = () => {
        const settings = getSettings();
        const now = Date.now();

        if(sessionStorage.timeoutTarget && sessionStorage.timeoutTarget > now) {
            return parseInt(sessionStorage.timeoutTarget, 10) - Date.now();
        } else {
            return 0;
        }
    }

    setUpConfigMenu();
    updateTimerSettings();
})();
