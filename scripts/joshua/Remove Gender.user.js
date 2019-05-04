// ==UserScript==
// @name         Remove Gender
// @namespace    https://epicmafia.com/user/478384#/
// @version      0.1
// @description  Adds a 'None' option to gender, select it and select 'change profile' to null out gender. 
// @author       joshua
// @match        https://epicmafia.com/user/edit
// @grant        unsafeWindow
// ==/UserScript==

var $ = unsafeWindow.jQuery;
$('input[name^="gender"][value^="2"]').after('<label class="inner">None</label><input class="profilegender" name="gender" type="radio" value="11">');
