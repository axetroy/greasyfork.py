// ==UserScript==
// @name           Re-enable mouse select of text
// @description    Allows to select text with a mouse on crippled pages. Attention: May have negative effects on pages which legitimately change this behavior.
// @namespace      https://greasyfork.org/de/scripts/21684

// @exclude        *.google.*
// @run-at         document-end

// @author         lukie80
// @copyright      Creative Commons Attribution-ShareAlike 3.0 Unported (CC-BY-SA 3.0)
// @license        http://creativecommons.org/licenses/by-sa/3.0/
// @version        1.0
// @lastupdated    2016.07.25
// 
// ==/UserScript==
//-------------------------------------------------------------------------------------------------------------------

document.onselectstart=null;
document.body.style.MozUserSelect = null;


//-------------------------------------------------------------------------------------------------------------------