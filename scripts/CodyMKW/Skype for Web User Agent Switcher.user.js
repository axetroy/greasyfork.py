// ==UserScript==
// @name         Skype for Web User Agent Switcher
// @namespace    http://www.codysnintendoroom.co.vu
// @version      1.1
// @description  Change the User Agent on Skype for Web to enable Video/Voice Calling on Linux or any other OS that doesn't support it! :)
// @icon         https://az663213.vo.msecnd.net/0-210-0/images/favicon.ico
// @author       CodyMKW
// @match        https://web.skype.com/en/
// @grant        none
// ==/UserScript==

navigator.__defineGetter__('userAgent', function(){

return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

});