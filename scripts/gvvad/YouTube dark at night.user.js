// ==UserScript==
// @name           YouTube dark at night
// @version        0.1
// @description    Auto turn on YouTube dark theme at night.
// @description:ru Автоматически включает тёмную тему YouTube ночью.
// @author         gvvad
// @run-at         document-end
// @include        http*://www.youtube.com/*
// @include        http*://youtube.com/*
// @grant          none
// @license        GPL-3.0+; http://www.gnu.org/licenses/gpl-3.0.txt
// @namespace https://greasyfork.org/users/100160
// ==/UserScript==

(function() {
    'use strict';
    //******************************************/
    //* You can customize settings as you like */
    //* night time (22:00 - 6:59 default)      */
    //* check interval (5 minutes default)     */
    //******************************************/
    const STORAGE_NAME = "yt_dark_night";

    let scope = {
        nightHour: 22,
        dayHour: 7,
        interval: 5,
        turnDarkTheme: function(v) {
            try {
                let ytd_app = document.querySelector("ytd-app");
                if (ytd_app.isAppDarkTheme_() != v) {
                    let ytd_thr = document.createElement('ytd-toggle-theme-compact-link-renderer');
                    //  prefs_ & setLabel_ - not present in ytd-app
                    //  just copy it from ytd-theme-renderer
                    ytd_app.prefs_ = ytd_thr.prefs_;
                    ytd_app.setLabel_ = ytd_thr.setLabel_;

                    if (v) {
                        ytd_thr.handleSignalActionToggleDarkThemeOn_.call(ytd_app);
                    } else {
                        ytd_thr.handleSignalActionToggleDarkThemeOff_.call(ytd_app);
                    }
                }
            } catch(e) {}
        }
    };

    //  Local storage for synchronize all opened tabs
    //  [STORAGE_NAME] - ('1' - dark theme on | '0' - dark theme off)
    window.addEventListener("storage", function(ev) {
        if (ev.key == STORAGE_NAME) {
            this.turnDarkTheme(!!parseInt(ev.newValue));
        }
    }.bind(scope));

    let dispatcher = function() {
        let hrs = (new Date()).getHours();
        let isDark = (hrs >= this.nightHour || hrs < this.dayHour);
        this.turnDarkTheme(isDark);

        localStorage[STORAGE_NAME] = (isDark)? "1" : "0";
    }.bind(scope);

    dispatcher();
    setInterval(dispatcher, scope.interval * 60 * 1000);
})();