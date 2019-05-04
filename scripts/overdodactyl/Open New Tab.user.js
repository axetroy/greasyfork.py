// ==UserScript==
// @name          Open New Tab
// @description   Opens a new blank tab.  New tab stays in same container as previous tab.
// @author        overdodactyl
// @namespace     Violentmonkey Scripts
// @version       0.0.1
// DISCLAIMER:    Please use at your own rist.  Functionality is not guaranteed now or in perpetuity.    
// ==/UserScript==
if (!document.body.hasAttribute("contextmenu") && "contextMenu" in document.documentElement){
  var menu = document.body.appendChild(document.createElement('menu'));
  menu.id = 'new-tab-context-menu';
  menu.type = 'context';
  menu.innerHTML = '<menuitem label="Open New Tab"></menuitem>';
  menu.firstElementChild.addEventListener('click', function() {
    window.open();
  });
}

document.body.setAttribute('contextmenu', menu.id);