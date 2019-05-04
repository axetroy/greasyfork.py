// ==UserScript==
// @name         Wanikani Open Framework Subject IDs filter
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  Adds a filter for get_items() that filters by a list of subject IDs
// @author       Kumirei
// @include      https://www.wanikani.com/*
// @grant        none
// ==/UserScript==

(function() {
		// Make sure WKOF is installed
		var wkof = window.wkof;
		if (!wkof) {
				var response = confirm('Wanikani Open Framework Subject IDs filter requires WaniKani Open Framework.\n Click OK to be forwarded to installation instructions.');
				if (response) window.location.href = 'https://community.wanikani.com/t/instructions-installing-wanikani-open-framework/28549';
				return;
		}
		else {
				wkof.wait_state('wkof.ItemData.registry', 'ready')
						.then(register_filter);
		}

		// Adds the filter to wkof
		function register_filter() {
				wkof.ItemData.registry.sources.wk_items.filters.subject_ids = {
						filter_func: function(filter_value, item){for (var key in filter_value) {if (filter_value[key] == item.id) return true;} return false;}
				};
		}
})();