// ==UserScript==
// @name           Сокрытие старых предприятий на рынке
// @namespace      virtonomica
// @version        1.02
// @description    сокрытие старых предприятий на рынке
// @include        *virtonomic*.ru/*/main/unit_market/list
// ==/UserScript==
var run = function() {

	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
	$ = win.$;

	// сортировка по убыванию дисконта
	//var discDescAnchor = $('a[href$="setordering/unitmarket/unitList/discount/desc"]');
	//if ($(discDescAnchor).children().eq(0).attr('src') === '/img/desc.gif') {
	//	discDescAnchor[0].click();
	//}

	if (typeof(localStorage) === "undefined") {
		return;
	}
	var curDate = $("#server-time").next().text().trim();
	if (localStorage.getItem("curDate") !== curDate) { // first time entering unit market for today
		localStorage.setItem(checkBoxKey, "+");
	}
	localStorage.setItem("curDate", curDate);

	var hideLongOnSale = false;
	var formTBody = $("fieldset.filters > table.form > tbody");
	// allow select to hold only one row
	formTBody.children().eq(0).children().eq(0).attr("rowspan", "1");
	// insert empty td in 2rd row
	formTBody.children().eq(1).children().eq(0).before($("<td align=\"center\" width=\"45%\" ></td>"));

	// create td for 3nd row
	var insertedTD = "<td align=\"left\" width=\"45%\" ><input id=\"hideLongOnSale\" type=\"checkbox\" ";
	var checkBoxKey = "hideLongOnSaleCheckBox";
	var checkBoxChecked = localStorage.getItem(checkBoxKey);
	if (checkBoxChecked === null || checkBoxChecked === "+") {
		hideLongOnSale = true;
		insertedTD += "checked=\"checked\"";
	}
	insertedTD += "></input><label for=\"hideLongOnSale\">Скрыть давно продающиеся предприятия</label></td>";
	// insert it
	formTBody.children().eq(2).children().eq(0).before(insertedTD);

	// checkbox click handler
	$("#hideLongOnSale").click(function() {
		if ($(this).is(":checked")) {
			console.log("checked");
			localStorage.setItem(checkBoxKey, "+");
			hideLongOnSale = true;
		} else {
			console.log("unchecked");
			localStorage.setItem(checkBoxKey, "-");
			hideLongOnSale = false;
		}
		updateData();
	});
	updateData();

	function updateData() {
		$("tr.even, tr.odd").each(function() {
			var unitAnchor = $("a[href*='main/unit/view/']", $(this));
			var dbKey = "unit market first date " + unitAnchor.attr("href").trim();
			var firstDate = localStorage.getItem(dbKey);
			if (firstDate === null) {
				localStorage.setItem(dbKey, curDate);
			}
			if (firstDate !== null && firstDate !== curDate && hideLongOnSale) {
				$(this).hide();
			} else {
				$(this).show();
			}
		});
	}

}

if (window.top == window) {
	var script = document.createElement("script");
	script.textContent = '(' + run.toString() + ')();';
	document.documentElement.appendChild(script);
}
