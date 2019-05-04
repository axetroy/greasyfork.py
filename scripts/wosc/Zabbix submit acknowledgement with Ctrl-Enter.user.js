// ==UserScript==
// @name         Zabbix submit acknowledgement with Ctrl-Enter
// @namespace    http://wosc.de/
// @version      1.0
// @description  Adds the standard "save and go" keyboard shortcut
// @author       Wolfgang Schnerring
// @match        http://*/zabbix/zabbix.php?*action=acknowledge*
// @grant        none
// ==/UserScript==

(function() {
'use strict';

var $ = window.jQuery;

$('textarea').on('keydown', function(event) {
  if (! (event.which == 13 && event.ctrlKey)) return;

  event.preventDefault();
  $(event.target).closest('form').find('button[value="acknowledge.create"]').click();
});

})();