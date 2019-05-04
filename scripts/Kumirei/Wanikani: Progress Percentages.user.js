// ==UserScript==
// @name         Wanikani: Progress Percentages
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  Calculates the percentage of known kanji for each JLPT level, Joyo grade, Frequency bracket, and various other sources.
// @author       Kumirei
// @match        https://www.wanikani.com/
// @match        https://www.wanikani.com/dashboard
// @require      https://greasyfork.org/scripts/377613-wanikani-open-framework-jlpt-joyo-and-frequency-filters/code/Wanikani%20Open%20Framework%20JLPT,%20Joyo,%20and%20Frequency%20filters.user.js
// @require      https://greasyfork.org/scripts/377638-wanikani-open-framework-subject-ids-filter/code/Wanikani%20Open%20Framework%20Subject%20IDs%20filter.user.js
// @license      MIT; http://opensource.org/licenses/MIT
// @grant        none
// ==/UserScript==

(function() {
		// Make sure WKOF is installed
		var wkof = window.wkof;
		if (!wkof) {
				var response = confirm('Wanikani: JLPT Progress requires WaniKani Open Framework.\n Click "OK" to be forwarded to installation instructions.');
				if (response) window.location.href = 'https://community.wanikani.com/t/instructions-installing-wanikani-open-framework/28549';
				return;
		}
		else {
				// Install menu
				wkof.include('Menu,Settings');
				wkof.ready('Menu,Settings').then(load_settings).then(install_menu);

				// Fetch progress storage
				var progress = JSON.parse(localStorage.getItem('WKProgressPercentages'));
				if (progress == null) progress = {
						last_level: 0,
						unlearned_ids: {},
						jlpt: {1: {learned: 0, total: 1232}, 2: {learned: 0, total: 367}, 3: {learned: 0, total: 367}, 4: {learned: 0, total: 166}, 5: {learned: 0, total: 79}},
						joyo: {1: {learned: 0, total: 80}, 2: {learned: 0, total: 160}, 3: {learned: 0, total: 200}, 4: {learned: 0, total: 200}, 5: {learned: 0, total: 185}, 6: {learned: 0, total: 181}, 9: {learned: 0, total: 1130}},
						freq: {500: {learned: 0, total: 500}, 1000: {learned: 0, total: 500}, 1500: {learned: 0, total: 500}, 2000: {learned: 0, total: 500}, 2500: {learned: 0, total: 500}},
						other: {nhk: {learned: 0, total: 0}, news: {learned: 0, total: 0}, aozora: {learned: 0, total: 0}, twitter: {learned: 0, total: 0}, wikipedia: {learned: 0, total: 0}}
				}

				// Fetch lesson info then process it
				wkof.include('ItemData');
				wkof.ready('ItemData')
						.then(update_progress)
						.then(calculate_percentages)
						.then(display_data);
		}

		// Loads settings
		function load_settings() {
				var defaults = {cumulative: false};
				wkof.Settings.load('progress_percentages', defaults);
		}

		// Installs the options button in the menu
		function install_menu() {
				var config = {
						name: 'progress_percentages_settings',
						submenu: 'Settings',
						title: 'Progress Percentages',
						on_click: open_settings
				};
				wkof.Menu.insert_script_link(config);
		}

		// Creates the options
		function open_settings(items) {
				var config = {
						script_id: 'progress_percentages',
						title: 'Progress Percentages',
						content: {
								cumulative: {
										type: 'checkbox',
										label: 'Cumulative percentages',
										hover_tip: 'Eg. N3 = N3 + N4 + N4',
										default: false
								}
						}
				}
				var dialog = new wkof.Settings(config);
				dialog.open();
		}

		// Retreives lesson data
		function update_progress() {
				var resolve, promise = new Promise((res, rej)=>{resolve=res;});
				var config = {wk_items: {options: {assignments: true},
										 filters: {item_type: 'kan',
												   include_jlpt_data: true,
												   include_joyo_data: true,
												   include_frequency_data: true}
										}
							 };
				wkof.ItemData.get_items(config).then((data)=>{
						var highest_level = progress.last_level;
						var current_level = wkof.user.level;
						for (var key in data) {
								var id = data[key].id;
								var item_level = data[key].data.level;
								if (id in progress.unlearned_ids || (item_level > progress.last_level && item_level <= current_level)) {
										if (item_level > highest_level) highest_level = item_level;
										if (data[key].assignments && data[key].assignments.started_at != null) {
												var keys = [["jlpt_level", "jlpt"],
															["joyo_grade", "joyo"],
															["frequency", "freq"],
															["nhk_frequency", "nhk"],
															["news_frequency", "news"],
															["aozora_frequency", "aozora"],
															["twitter_frequency", "twitter"],
															["wikipedia_frequency", "wikipedia"]]
												keys.forEach((val, i)=>{
														var level = data[key][val[0]];
														if (level) {
																if (level < 1) {
																		progress.other[val[1]].learned++;
																		progress.other[val[1]].total += level;
																}
																else progress[val[1]][level].learned++;
														}
												});
												delete progress.unlearned_ids[id];
										}
										else progress.unlearned_ids[id] = 1;
								}
						}
						progress.last_level = highest_level;
						localStorage.setItem('WKProgressPercentages', JSON.stringify(progress));
						resolve();
				})
				return promise;
		}

		function calculate_percentages() {
				var show_cum = wkof.settings.progress_percentages.cumulative;
				var percentages = {jlpt: {1: {}, 2: {}, 3: {}, 4: {}, 5: {}},
								   joyo: {1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 9: {}},
								   freq: {500: {}, 1000: {}, 1500: {}, 2000: {}, 2500: {}},
								   other: {nhk: {}, news: {}, aozora: {}, twitter: {}, wikipedia: {}}};
				for (var key in percentages) {
						var cumulative = [0, 0];
						for (var level in percentages[key]) {
								var stage = (key == "jlpt" ? 6-level : level);
								var learned = progress[key][stage].learned;
								var total = progress[key][stage].total;
								cumulative[0] += learned;
								cumulative[1] += total;
								if (key != "other") var percent = (show_cum ? cumulative[0]/cumulative[1] : learned/total);
								else percent = total;
								percent = (percent < 0.1 ? Math.floor(percent*1000)/10 : Math.floor(percent*100));
								percentages[key][stage].percent = percent;
								percentages[key][stage].learned = (show_cum ? cumulative[0] : learned);
								percentages[key][stage].total = (show_cum ? cumulative[1] : total);
						}
				}
				return percentages;
		}

		function display_data(percentages) {
				// Add css
				$('head').append('<style id="progress_percentages">'+
								 '.progress_percentages {'+
								 '    margin: 15px 0 15px;'+
								 '    position: relative;'+
								 '}'+
								 '.progress_percentages > div {'+
								 '    border-radius: 3px;'+
								 '    background: #434343 !important;'+
								 '    padding: 5px 0;'+
								 '}'+
								 '.stage {'+
								 '    display: inline-block;'+
								 '    width: 20%;'+
								 '    text-align: center;'+
								 '    color: rgb(240,240,240);'+
								 '}'+
								 '.progress_percentages span {'+
								 '    display: inline;'+
								 '    font-size: 16px;'+
								 '    border-radius: 5px;'+
								 '}'+
								 '.progress_percentages .level {'+
								 '    font-weight: bold;'+
								 '}'+
								 '.joyo_percentages {'+
								 '    width: 14.25%;'+
								 '}'+
								 '.progress_percentages .hidden {'+
								 '    display: none;'+
								 '}'+
								 '.progress_percentages .btn {'+
								 '    height: 100%;'+
								 '    position: absolute;'+
								 '    box-shadow: none !important;'+
								 '    padding: 0 5px;'+
								 '    line-height: 30px;'+
								 '    width: 20px;'+
								 '    text-shadow: none;'+
								 '    color: rgb(240,240,240);'+
								 '    border: none;'+
								 '}'+
								 '.progress_percentages .next.btn {'+
								 '    right: 0;'+
								 '}'+
								 '</style>');
				if (is_dark_theme()) $('head').append('<style id="progress_percentages_dark">'+
													  '.progress_percentages {'+
													  '    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7), 2px 2px 2px rgba(0, 0, 0, 0.7);'+
													  '}'+
													  '.progress_percentages > div {'+
													  '    background: #232629 !important;'+
													  '}'+
													  '</style>');
				// Add elements
				var section = document.createElement('section');
				section.className = 'progress_percentages';

				var active_set = localStorage.getItem('WKProgressPercentagesActiveSet') || "jlpt";
				var [next, prev] = get_new_sets(active_set);

				var next_button = document.createElement('div');
				next_button.className = 'next btn';
				next_button.innerHTML = '<i class="link icon-chevron-right"></i>';
				next_button.onclick = toggle_percentages;
				next_button.current = active_set;
				next_button.next = next;
				section.appendChild(next_button);

				var prev_button = document.createElement('div');
				prev_button.className = 'prev btn';
				prev_button.innerHTML = '<i class="link icon-chevron-left"></i>';
				prev_button.onclick = toggle_percentages;
				prev_button.current = active_set;
				prev_button.next = prev;
				section.appendChild(prev_button);

				var list = document.createElement('div');
				for (var key in percentages) {
						for (var level in percentages[key]) {
								var stage = (key == "jlpt" ? 6-level : level);
								var prefix = (key == "jlpt" ? "N" : (key == "joyo" ? "G" : (key == "freq" ? "F" : "")));
								var label = (key == "other" ? (stage == "nhk" ? "NHK" : stage.charAt(0).toUpperCase()+stage.slice(1)) : (key == "freq" ? stage/500 : stage));
								$(list).append('<div class="'+key+'_percentages stage '+(key==active_set?"":"hidden")+'" title="'+percentages[key][stage].learned+(key!="other"?' of '+percentages[key][stage].total:"")+' learned"><span class="level">'+prefix+label+' </span><span class="percent">'+percentages[key][stage].percent+'%</span></div>');
						}
				}
				section.appendChild(list);
				$('.progression').before(section);
		}

		// Switches which percentages are showing
		function toggle_percentages(event) {
				var button = event.target;
				if (button.nodeName == "I") button = button.parentElement;
				var current_set = button.current;
				var next_set = button.next;
				$('.'+current_set+'_percentages').toggleClass('hidden');
				$('.'+next_set+'_percentages').toggleClass('hidden');
				var next_button = $('.progress_percentages .next')[0];
				var prev_button = $('.progress_percentages .prev')[0];
				var [next, prev] = get_new_sets(next_set);
				next_button.next = next;
				next_button.current = next_set;
				prev_button.next = prev;
				prev_button.current = next_set;
				localStorage.setItem('WKProgressPercentagesActiveSet', next_set)
		}

		// Returns the next and previous sets
		function get_new_sets(current_set) {
				var sets = ["jlpt", "joyo", "freq", "other"];
				var current_index = sets.indexOf(current_set);
				return [sets[(current_index+1)%4], sets[(current_index+3)%4]];
		}

		// Handy little function that rfindley wrote. Checks whether the theme is dark.
		function is_dark_theme() {
				// Grab the <html> background color, average the RGB.  If less than 50% bright, it's dark theme.
				return $('body').css('background-color').match(/\((.*)\)/)[1].split(',').slice(0,3).map(str => Number(str)).reduce((a, i) => a+i)/(255*3) < 0.5;
		}
})();