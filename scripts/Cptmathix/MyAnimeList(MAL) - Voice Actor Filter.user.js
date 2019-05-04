// ==UserScript==
// @name         MyAnimeList(MAL) - Voice Actor Filter
// @version      1.3.4
// @description  This script can filter/sort Voice Acting roles, Anime Staff positions and Published Manga
// @author       Cpt_mathix
// @include      *://myanimelist.net/people/*
// @include      *://myanimelist.net/people.php?id=*
// @grant        GM_getValue
// @grant        GM_setValue
// @noframes
// @namespace    https://greasyfork.org/users/16080
// ==/UserScript==

var elementsVA,
	elementsAS,
	elementsPM,
	temp_deactivate_compressor = false;

init();

function init() {
	addCheckboxes();

	// preparing VA & AS tables for sorting and compressing
	$('table.VATable > tbody > tr:nth-child(n)').each(function(i) {
		var char = $(this).find('td:nth-child(3) > a')[0].textContent.trim();
		var main = $(this).find('td:nth-child(3) > div')[0].textContent.trim();
		var id = getAnimeId($(this));
		var reverse_id = 100000 - parseInt(id);
		$(this).attr("data-sort", '{"default":"' + i + '","character":"' + char + '","main":"' + main + '","recent":"' + id + '","main_char":"' + main + char + '","main_rec":"' + main + reverse_id + '"}');

		var spaceit = $(this).find('td:nth-child(2) > div');
		$(spaceit).replaceWith(function() {
			$(spaceit).find('a')[0].style.marginLeft = "5px";
			return $('a', this);
		});
	});

	$('table.ASTable > tbody > tr:nth-child(n)').each(function() {
		var spaceit = $(this).find('.spaceit_pad');
		var lightbox = $(spaceit).find('a');
		lightbox[0].style.marginLeft = "5px";
		$(lightbox).insertAfter($(this).find('td:nth-child(2)').find(':first-child')); //for some kind of reason, this lightbox is a clone
		$(lightbox).remove(); // remove original
		var spaceitText = $(spaceit).find('small');
		spaceitText[0].innerHTML = spaceitText[0].innerHTML;
	});

	compressASTable();

	initElements(true);
	startFilter('default');
}

// backup elements
function initElements(init) {
	if (init) {
		elementsVA = $('table.VATable > tbody > tr').not('.hidden-tr');
		elementsAS = $('table.ASTable > tbody > tr').not('.hidden-tr');
		elementsPM = $('table.PMTable > tbody > tr').not('.hidden-tr');
	} else { // refresh only VA because that's the only structure that might change
		elementsVA = $('table.VATable > tbody > tr').not('.hidden-tr');
	}
}

// core of the script, filtering
function startFilter(value) {
	switch (value) {
		case 'Sorter':
			if (temp_deactivate_compressor) {
				temp_deactivate_compressor = false;
				compressVATable(false);
				sortVATable(getSetting('Sorter'), getSetting('Sorter2'), getSetting('Sorter3'));
				startFilter("Compressor");
			} else {
				sortVATable(getSetting('Sorter'), getSetting('Sorter2'), getSetting('Sorter3'));
			}
			break;

		case 'Compressor':
			compressVATable(getSetting('Compressor'));

			if (!getSetting('Compressor') && getSetting('Sorter2')) {
				sortVATable(getSetting('Sorter'), getSetting('Sorter2'), getSetting('Sorter3'));
			}

			// initialize new backup (compress changes dom structure)
			initElements(false);
			// activate VAfilter with new backups
			activateVAFilter(getSetting('VA'), getSetting('VA2'));

			reinitAddButtons();
			break;

		case 'VA':
			activateVAFilter(getSetting('VA'), getSetting('VA2'));
			break;

		case 'AS':
			activateASFilter(getSetting('AS'), getSetting('AS2'));
			break;

		case 'PM':
			activatePMFilter(getSetting('PM'), getSetting('PM2'));
			break;

		default:
			sortVATable(getSetting('Sorter'), getSetting('Sorter2'), getSetting('Sorter3'));
			compressVATable(getSetting('Compressor'));
			initElements('false');
			activateAllFilters();
			reinitAddButtons();
			break;
	}
}

function activateAllFilters() {
	activateVAFilter(getSetting('VA'), getSetting('VA2'));
	activateASFilter(getSetting('AS'), getSetting('AS2'));
	activatePMFilter(getSetting('PM'), getSetting('PM2'));
}

// Voice Actor roles filter
function activateVAFilter(conditionEdit, conditionAdd) {
	for (var i = 0; i < elementsVA.length; i++) {
		var tr = elementsVA[i];
		$(elementsVA[i]).find('a.Lightbox_AddEdit').each(function() {
			var content = $(this).parent()[0];
			var type = $(this).attr('class');
			if (content.children.length > 2) {
				compressedVAFilter(tr, this, conditionEdit, conditionAdd, type); // when compressed = true and tr has multiple lightboxes (for different anime)
			} else {
				if (conditionEdit && type.indexOf('button_edit') > -1) {
					$(tr).hide();
				} else if (conditionAdd && type.indexOf('button_add') > -1) {
					$(tr).hide();
				} else {
					$(tr).show();
				}
			}
		});
	}
}

function compressedVAFilter(tr, lightbox, conditionEdit, conditionAdd, type) {
	if (conditionEdit && type.indexOf('button_edit') > -1 || conditionAdd && type.indexOf('button_add') > -1) {
		$(lightbox).hide();
		$(lightbox).next().hide();
		$(lightbox).prev().hide();
		if (isHiddendiv(tr)) { $(tr).hide(); }
	} else {
		$(lightbox).show();
		$(lightbox).next().show();
		$(lightbox).prev().show();
		$(tr).show();
	}
}

// if div is completly hidden (content inside is all hidden) => return true
function isHiddendiv(div, type) {
	var lightboxes = $(div).find('a.Lightbox_AddEdit').not(':hidden');
	return lightboxes.length == 0;
}

// Anime Staff positions filter
function activateASFilter(conditionEdit, conditionAdd) {
	for (var i = 0; i < elementsAS.length; i++) {
		var tr = elementsAS[i];
		$(elementsAS[i]).find('a.Lightbox_AddEdit').each(function() {
			var type = $(this).attr('class');
			if (conditionEdit && type.indexOf('button_edit') > -1) {
				$(tr).hide();
			} else if (conditionAdd && type.indexOf('button_add') > -1) {
				$(tr).hide();
			} else {
				$(tr).show();
			}
		});
	}
}

// Published Manga filter
function activatePMFilter(conditionEdit, conditionAdd) {
	for (var i = 0; i < elementsPM.length; i++) {
		var tr = elementsPM[i];
		$(elementsPM[i]).find('a.Lightbox_AddEdit').each(function() {
			var type = $(this).attr('class');
			if (conditionEdit && type.indexOf('button_edit') > -1) {
				$(tr).hide();
			} else if (conditionAdd && type.indexOf('button_add') > -1) {
				$(tr).hide();
			} else {
				$(tr).show();
			}
		});
	}
}

function compressVATable(condition) {
	var content = $('table.VATable > tbody');
	var listitems = content.children('tr').get();

	if (condition) { // compress
		var listid = [];
		for (var i = 0; i < listitems.length; i++) {
			listid.push(getCharacterId(listitems[i]));
		}
		for (var j = 0; j < listid.length; j++) {
			var hit = $.inArray(listid[j], listid);
			if (hit != j) {
				mergeVAElement(listitems[j], listitems[hit]);
			}
		}
	} else { // decompress
		for (var i = 0; i < listitems.length; i++) {
			var listitem = listitems[i];
			content = $(listitem).find('td:nth-child(2)')[0];
			if ($(listitem)[0].className.indexOf("hidden-tr") > -1) {
				$(listitem).removeClass("hidden-tr");
			}
			if (content.children.length > 2) {
				$(content).find(':gt(1)').remove();
				$(content).find(':hidden').show();
				if ($(listitem).data("sort").main_orig === "Supporting") {
					$(listitem).find('td:nth-child(3) > div').text("Supporting");
					$(listitem).data("sort").main = "Supporting";
					$(listitem).data("sort").main_orig = "";
					$(listitem).data("sort").main_char = $(listitem).data("sort").main_char.replace("Main", "Supporting");
					$(listitem).data("sort").main_rec = $(listitem).data("sort").main_rec.replace("Main", "Supporting");
				}
			}
		}
	}
}

function mergeVAElement(duplicate, element) {
	var duplicateInfo = $(duplicate).find('td:nth-child(2)')[0].innerHTML;
	$(duplicate).addClass("hidden-tr");
	$(duplicate).hide();

	// add info to element
	$(element).find('td:nth-child(2)')[0].innerHTML += '<br>' + duplicateInfo;

	// if character has one main role, change supporting to main
	if ($(element).data("sort").main.length > $(duplicate).data("sort").main.length) {
		$(element).find('td:nth-child(3) > div').text("Main");
		$(element).data("sort").main = "Main";
		$(element).data("sort").main_orig = "Supporting";
		$(element).data("sort").main_char = $(element).data("sort").main_char.replace("Supporting", "Main");
		$(element).data("sort").main_rec = $(element).data("sort").main_rec.replace("Supporting", "Main");
	}
}

function compressASTable() {
	var content = $('table.ASTable > tbody');
	var listitems = content.children('tr').get();

	var listid = [];
	for (var i = 0; i < listitems.length; i++) {
		listid.push(getAnimeId(listitems[i]));
	}
	for (var j = 0; j < listid.length; j++) {
		var hit = $.inArray(listid[j], listid);
		if (hit != j) {
			mergeASElement(listitems[j], listitems[hit]);
		}
	}
}

function mergeASElement(duplicate, element) {
	var duplicateInfo = $(duplicate).find('.spaceit_pad')[0].outerHTML;
	$(duplicate).addClass("hidden-tr");
	$(duplicate).hide();

	// add info to element
	$(element).find('td:nth-child(2)')[0].innerHTML += duplicateInfo;
}

// condition1 = sorter characters, condition2 = sorter main/supporting and condition 3 = most recent
function sortVATable(condition1, condition2, condition3) {
	var sortType;
	if (condition1 && condition2) {
		sortType = "main_char";
	} else if (condition2 && condition3) {
		sortType = "main_rec";
	} else if (condition1) {
		sortType = "char";
	} else if (condition2) {
		sortType = "main";
	} else if (condition3) {
		sortType = "recent";
	} else {
		sortType = "default";
	}

	var content = $('table.VATable > tbody');
	var listitems = content.children('tr').get();

	switch(sortType) {
		case 'main_char':
			listitems.sort(function(a, b) {
				var compA = $(a).data("sort").main_char;
				var compB = $(b).data("sort").main_char;
				if (compA == compB) {
					return (getAnimeId(a) < getAnimeId(b)) ? -1 : 1;
				}
				return (compA < compB) ? -1 : 1;
			});
			$.each(listitems, function(idx, itm) {
				$(content).append(itm);
			});
			break;

		case 'main_rec':
			listitems.sort(function(a, b) {
				var compA = $(a).data("sort").main_rec;
				var compB = $(b).data("sort").main_rec;
				if (compA == compB) {
					return (getAnimeId(a) < getAnimeId(b)) ? -1 : 1;
				}
				return (compA < compB) ? -1 : 1;
			});
			$.each(listitems, function(idx, itm) {
				$(content).append(itm);
			});
			break;

		case 'char':
			listitems.sort(function(a, b) {
				var compA = $(a).data("sort").character;
				var compB = $(b).data("sort").character;
				if (compA == compB) {
					return (getAnimeId(a) < getAnimeId(b)) ? -1 : 1;
				}
				return (compA < compB) ? -1 : 1;
			});
			$.each(listitems, function(idx, itm) {
				$(content).append(itm);
			});
			break;

		case 'main':
			listitems.sort(function(a, b) {
				var compA = $(a).data("sort").main;
				var compB = $(b).data("sort").main;
				if (compA == compB) {
					return (parseInt($(a).data("sort").default) < parseInt($(b).data("sort").default)) ? -1 : 1;
				}
				return (compA < compB) ? -1 : 1;
			});
			$.each(listitems, function(idx, itm) {
				$(content).append(itm);
			});
			break;

		case 'recent':
			listitems.sort(function(a, b) {
				var compA = $(a).data("sort").recent;
				var compB = $(b).data("sort").recent;
				if (compA == compB) {
					return (getAnimeId(a) < getAnimeId(b)) ? -1 : 1;
				}
				return (parseInt(compA) > parseInt(compB)) ? -1 : 1;
			});
			$.each(listitems, function(idx, itm) {
				$(content).append(itm);
			});
			break;

		default:
			listitems.sort(function(a, b) {
				var compA = parseInt($(a).data("sort").default);
				var compB = parseInt($(b).data("sort").default);
				if (compA == compB) {
					return (getAnimeId(a) < getAnimeId(b)) ? -1 : 1;
				}
				return (compA < compB) ? -1 : 1;
			});
			$.each(listitems, function(idx, itm) {
				$(content).append(itm);
			});
			break;
	}
}

function addCheckboxes() {
	var elements = document.getElementsByClassName('normal_header');
	if (elements[0].nextSibling.tagName == "TABLE") {
		elements[0].className += " VAHeader";
		elements[0].nextSibling.className = "VATable";
		createHrElement(elements[0]);
		createCompactViewCheckbox(elements[0]);
		createSortCheckboxes(elements[0]);
		createAddEdit("VA", elements[0]);
	}
	if (elements[1].nextSibling.tagName == "TABLE") {
		elements[1].className += " ASHeader";
		elements[1].nextSibling.className = "ASTable";
		createHrElement(elements[1]);
		createAddEdit("AS", elements[1]);
	}
	if (elements[2].nextSibling.tagName == "TABLE") {
		elements[2].className += " PMHeader";
		elements[2].nextSibling.className = "PMTable";
		createHrElement(elements[2]);
		createAddEdit("PM", elements[2]);
	}
	if (elements[3].textContent.trim() === "Comments") {
		elements[3].className += " CommentsHeader";
		createAllCommentsLink(elements[3]);
	}

	addStyle(elements[0]);
}

function addStyle(element) {
	var css = '<style>input[type="checkbox"] {margin: -1px 0 0 0;vertical-align: middle;}' +
		' a.vafilter_add, a.vafilter_edit {border: solid #000;border-width: 0.1em;padding: 1px 4px 1px 4px;background-color: #f6f6f6;font-size: 9px;}' +
		' span.vrline {border-left: solid #000;border-width: 0.1em;margin-left: 0.5em;margin-right: 0.5em;}</style>';

	element.insertAdjacentHTML('beforebegin', css);
}

function createHrElement(element) {
	var html = '<hr>';
	element.insertAdjacentHTML('afterend', html);
}

function createAddEdit(type, element) {
	var html = '<span>Hide: </span>' +
        '<label>On MyList </label>' +
        '<input type="checkbox" class="checkbox" name="' + type + '" id="' + type + '" title="Hide entries on your list">' +
        '<span> - </span>' +
        '<label>Not on MyList </label>' +
        '<input type="checkbox" class="checkbox" name="' + type + '" id="' + type + '2" title="Hide entries not on your list">';

    element.insertAdjacentHTML('afterend', html);

	$("#"+ type + "").prop("checked", getSetting(type));
	$("#"+ type + "2").prop("checked", getSetting(type + "2"));
}

function createSortCheckboxes(element) {
	var html = '<span class="vrline"></span><span>Sort by: </span>' +
		'<label>Character </label>' +
		'<input type="checkbox" class="checkbox" name="Sorter" id="Sorter" title="Sort by Character name">' +
		'<span> - </span>' +
		'<label>Main/Supporting </label>' +
		'<input type="checkbox" class="checkbox" name="Sorter2" id="Sorter2" title="Sort by Main/Supporting">' +
		'<span> - </span>' +
		'<label>Most Recent </label>' +
		'<input type="checkbox" class="checkbox" name="Sorter3" id="Sorter3" title="Sort by Added to DB">';

	element.insertAdjacentHTML('afterend', html);

	$("#Sorter").prop("checked", getSetting("Sorter"));
	$("#Sorter2").prop("checked", getSetting("Sorter2"));
	$("#Sorter3").prop("checked", getSetting("Sorter3"));
}

function createCompactViewCheckbox(element) {
	var html = '<span class="vrline"></span><span>Compressed view: </span>' +
		'<input type="checkbox" class="checkbox" name="Compressor" id="Compressor" title="Activate compressed view">';

	element.insertAdjacentHTML('afterend', html);

	$("#Compressor").prop("checked", getSetting("Compressor"));
}

function createAllCommentsLink(element) {
	var html = '<span class="floatRightHeader"><a href="' + document.location.href + "/comments" + '">All Comments</a></span>';
	element.insertAdjacentHTML('afterbegin', html);
}

function reinitAddButtons() {
	$('.Lightbox_AddEdit').fancybox({
		'width'			: 700,
		'height'		: '85%',
		'overlayShow'	: false,
		'titleShow'     : false,
		'type'          : 'iframe'
	});
}

// Save a setting of type = value (true or false)
function saveSetting(type, value) {
	GM_setValue('MALVA_' + type, value);
}

// Get a setting of type
function getSetting(type) {
	var value = GM_getValue('MALVA_' + type);
	if (value)
		return value;
	else
		return false;
}

function getAnimeId(element) {
	return parseInt($(element).find('td:nth-child(2) > a:nth-child(1)')[0].href.match(/\d+/g)[0]);
}

function getCharacterId(element) {
	return parseInt($(element).find('td:nth-child(3) > a')[0].href.match(/\d+/g)[0]);
}

$("input:checkbox").on('click', function() {
	var $box = $(this);
	if ($box.is(":checked")) {
		var group = "input:checkbox[name='" + $box.attr("name") + "']";
		$(group).each( function() {
			$(this).prop("checked", false);
			saveSetting($(this).attr('id'), false);
		});
		$box.prop("checked", true);
		saveSetting($box.attr('id'), true);
	} else {
		$box.prop("checked", false);
		saveSetting($box.attr('id'), false);
	}

	if ($box.attr("name") === "Sorter") {
		temp_deactivate_compressor = getSetting("Compressor") && $("#Sorter3").is(":checked");

		$("#Sorter3").prop("checked", false);
		saveSetting("Sorter3", false);
	}

	if ($box.attr("name") === "Sorter3") {
		temp_deactivate_compressor = getSetting("Compressor");

		$("#Sorter").prop("checked", false);
		saveSetting("Sorter", false);
	}

	startFilter($box.attr('id').replace(/\d/g,''));
});