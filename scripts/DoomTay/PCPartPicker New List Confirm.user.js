// ==UserScript==
// @name         PCPartPicker New List Confirm
// @namespace    DoomTay
// @version      1.0
// @description  Adds a confirmation dialog when starting a new part list
// @author       DoomTay
// @match        https://pcpartpicker.com/list/
// @grant        none
// ==/UserScript==

window.pp_partlist_delete_all = function()
{
	if(confirm("Are you sure you want to clear the current part list?")) pp_common_ajax_redirect('/qapi/partlist/delete/all/redirect/', { });
};