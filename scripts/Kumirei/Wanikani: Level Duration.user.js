// ==UserScript==
// @name         Wanikani: Level Duration
// @namespace    Wanikani: Level Duration
// @version      2.3.0.
// @description  Displays the number of days you have spent on the current level.
// @author       Kumirei
// @include      https://www.wanikani.com*
// @grant        none
// ==/UserScript==

(function() {
		//check that the Wanikani Framework is installed
		var script_name = 'Level Duration';
		if (!window.wkof) {
				if (confirm(script_name+' requires Wanikani Open Framework.\nDo you want to be forwarded to the installation instructions?'))
						window.location.href = 'https://community.wanikani.com/t/instructions-installing-wanikani-open-framework/28549';
				return;
		}
		//if it's installed then do the stuffs
		else {
				var date;

				// Include the Menu module, and wait for it to be ready.
				wkof.include('Menu,Settings');
				wkof.ready('Menu,Settings')
						.then(load_settings)
						.then(install_menu)
				wkof.include('Apiv2');
				wkof.ready('Apiv2').then(fetch_data);
		}

		//fetches and processes the level's unlock date
		function fetch_data(data) {
				wkof.Apiv2.fetch_endpoint('/level_progressions').then(function(data) {
						date = data.data[data.total_count-1].data.unlocked_at;
						var days_passed = (Date.now() - Date.parse(date))/(1000*60*60*24);
						$('head').append('<style>' +
										 '    .dropdown.levels > a, .nav li.reviews a {padding-bottom: 0 !important;}' +
										 '    .level-duration {' +
										 '        text-align: center;' +
										 '        color: #999 !important;' +
										 '        font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;' +
										 '        text-shadow: 0 1px 0 #ffffff;' +
										 '        margin-top: -2px;' +
										 '    }' +
										 '</style>');
						update_display();
				});
		}

		// This function is called when the Menu module is ready to use.
		function install_menu() {
				var config = {
						name: 'level_duration_settings',
						submenu: 'Settings',
						title: 'Level Duration',
						on_click: open_settings
				};
				wkof.Menu.insert_script_link(config);
		}

		function load_settings() {
				var defaults = {
						displayHours: false
				};
				wkof.Settings.load('level_duration', defaults);
		}

		function open_settings(items) {
				var config = {
						script_id: 'level_duration',
						title: 'Level Duration',
						on_save: update_display,
						content: {
								displayHours: {
										type: 'checkbox',
										label: 'Display Hours',
										default: false,
										hover_tip: 'Include hours in the level-duration display.',
								},
						}
				}
				var dialog = new wkof.Settings(config);
				dialog.open();
		}

		function update_display() {
				var displayHours = wkof.settings.level_duration.displayHours;
				var days_passed = (Date.now() - Date.parse(date))/(1000*60*60*24);
				var level_text = " days on level";
				if (displayHours && days_passed < 100) {
						level_text = " days " + Math.floor((days_passed-Math.floor(days_passed))*24) + " hours";
						days_passed = Math.floor(days_passed);
				}
				else {
						if (days_passed > 10) days_passed = Math.round(days_passed);
						days_passed = Math.round(days_passed*10)/10;
						if (days_passed == 1 && level_text == " days on level") level_text = " day on level";
				}
				if (!$('.level-duration').length) {
						var target = ".dropdown.levels";
						if (window.innerWidth <= 979) target = ".nav li.reviews a";
						$(target).closest('li').append('<div class="level-duration">' + days_passed + level_text + '</div>');
				}
				else {
						$('.level-duration')[0].innerText = days_passed + level_text;
				}
		}
})();