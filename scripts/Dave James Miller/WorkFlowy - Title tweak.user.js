// ==UserScript==
// @name         WorkFlowy - Title tweak
// @namespace    http://davejamesmiller.com/
// @version      0.2
// @description  Remove " - WorkFlowy" from the end of the tab title on WorkFlowy. Makes it cleaner and easier to bookmark.
// @match        https://workflowy.com/
// @copyright    Dave James Miller 2014 (MIT License)
// ==/UserScript==

setInterval(function() {
    if (document.title == 'WorkFlowy - Organize your brain.')
        document.title = 'WorkFlowy';
    else
        document.title = document.title.replace(/ - WorkFlowy$/, '');
}, 100);