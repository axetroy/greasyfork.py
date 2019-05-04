// ==UserScript==
// @name        GRO Index Search Helper
// @description Adds additional functionality to the UK General Register Office (GRO) BMD index search
// @namespace   cuffie81.scripts
// @include     https://www.gro.gov.uk/gro/content/certificates/indexes_search.asp
// @version     1.15
// @grant       GM_listValues
// @grant       GM_getValue
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.10/handlebars.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js
// ==/UserScript==


this.$ = this.jQuery = jQuery.noConflict(true);

$(function() {
	var resources, recordType, results;
	
	var main = function() {
		
		buildResources();
		recordType = getRecordType();
		//console.log("resources:\r\n%s", JSON.stringify(resources));
		
		// Load the general css
		$("body").append($(resources.baseStyle));

		
		initialiseSearchForm();
		initialiseResultViews();
		
		// Scroll down to the form. Do this last as we may add/remove/change elements in the previous calls.
		$("h1:contains('Search the GRO Online Index')")[0].scrollIntoView();
		
	
		// Wire up accesskeys to clicks, to avoid having to use the full accesskey combo (eg ALT+SHFT+#)
		$(document).on("keypress", function(e) {
			if (!document.activeElement || document.activeElement.tagName.toLowerCase() !== "input")
			{
				var char = String.fromCharCode(e.which);
				//console.log("keypress: %s", char);
				if ($("*[id^='groish'][accesskey='" + char + "']").length)
					$("*[id^='groish'][accesskey='" + char + "']").click();
				else if (char == "{")
					adjustSearchYear(-10);
				else if (char == "}")
					adjustSearchYear(10);
				else if (char == "?")
					$("form[name='SearchIndexes'] input[type='submit']").click();
				else if (char == '@')
					switchRecordType();
			}
		});
	}
	
	var initialiseSearchForm = function() {
	
		// Hide superfluous spacing, text and buttons
		$("body > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2)").hide();
		$("h1:contains('Search the GRO Online Index')").closest("tr").next().hide();
		$("strong:contains('Which index would you like to search?')").closest("tr").hide();
		
		$("table[summary*='contains the search form fields'] > tbody > tr:nth-of-type(2)").hide(); 
		$("table[summary*='contains the search form fields'] > tbody > tr:nth-of-type(3) td.main_text[colspan='5']").parent().hide(); 
		
		$("form[name='SearchIndexes'] input[type='submit'][value='Reset']").hide();
		$("form[name='SearchIndexes'] a.tooltip").hide();
		
		$("form[name='SearchIndexes'] span.main_text").has("i > a[href^='most_customers_want_to_know.asp']").hide();
		
		// Change text
		$("form[name='SearchIndexes'] td span.main_text:contains('year(s)')").text("yrs");
		
		$("form[name='SearchIndexes'] td.main_text:contains('Surname at Death:')").html("Surname:<span class='redStar'>*</span>");
		$("form[name='SearchIndexes'] td.main_text:contains('First Forename at Death:')").text("Forename 1:");
		$("form[name='SearchIndexes'] td.main_text:contains('Second Forename at Death:')").text("Forename 2:");
		$("form[name='SearchIndexes'] td.main_text:contains('District of Death:')").text("District:");
		$("form[name='SearchIndexes'] td.main_text:contains('Age at'):contains('Death'):contains('in years')").text("Age:");
		
		$("form[name='SearchIndexes'] td.main_text:contains('Surname at Birth:')").html("Surname:<span class='redStar'>*</span>");
		$("form[name='SearchIndexes'] td.main_text:contains('First Forename:')").text("Forename 1:");
		$("form[name='SearchIndexes'] td.main_text:contains('Second Forename:')").text("Forename 2:");
		$("form[name='SearchIndexes'] td.main_text:contains('Maiden Surname:')").text("Mother:");
		$("form[name='SearchIndexes'] td.main_text:contains('District of Birth:')").text("District:");

		
		// Add gender and year navigation buttons, and style them
		var searchButton = $("form[name='SearchIndexes'] input[type='submit'][value='Search']");
		$(searchButton).attr("accesskey", "?");
		$(searchButton).parent().find("br").remove();

		$("<input type='button' class='formButton' accesskey='#' id='groish_BtnToggleGender' value='Gender' />").insertBefore($(searchButton));
		$("<input type='button' class='formButton' accesskey='[' id='groish_BtnYearsPrev' value='&lt; Years' />").insertBefore($(searchButton));
		$("<input type='button' class='formButton' accesskey=']' id='groish_BtnYearsNext' value='Years &gt;' />").insertBefore($(searchButton));
		
		var buttonContainer = $("form[name='SearchIndexes'] input[type='submit'][value='Search']").closest("td").addClass("groish_ButtonContainer");
		
		// Add button event handlers
		$("input#groish_BtnYearsPrev").click(function() { navigateYears(false); });
		$("input#groish_BtnYearsNext").click(function() { navigateYears(true); });
		$("input#groish_BtnToggleGender").click(function() { toggleGender(); });

		// Set encoding
		if (typeof $("form[name='SearchIndexes']").attr("accept-charset") === typeof undefined) {
			$("form[name='SearchIndexes']").attr("accept-charset", "UTF-8");
		}

		
	}
	
	var initialiseResultViews = function() {
		
		// Move default results table into a view container
		var defaultTable = $("form[name='SearchIndexes'] h3:contains('Results:')").closest("table").css("width", "100%").addClass("groish_ResultsTable");
		$(defaultTable).before($("<div results-view='default' />"));
		var defaultView = $("div[results-view='default']");
		$(defaultView).append($("table.groish_ResultsTable"));

		// Move header row to before default view
		$(defaultView).before($("<div class='groish_ResultsHeader' style='margin: 10px 0px; position: relative' />"));
		$(".groish_ResultsHeader").append($("table.groish_ResultsTable h3:contains('Results:')"));

		// Move pager row contents to after default view
		$(defaultView).after($("table.groish_ResultsTable > tbody > tr:last table:first"));
		$("div[results-view='default'] + table").css("width", "100%").addClass("groish_ResultsInfo");

		// Get results, sort them and populate views
		results = getResults(recordType);
		sortResults();
		populateAlternateViews();
		
	}
	
	var sortResults = function(reverse, sortFieldsCsv) {
		//console.log("sorting results, sort fields: %s", sortFieldsCsv);
		
		if (!results || !results.items)
			return;
		
		var defaultSortFields = "year,quarter";
		
		// Get the last sort fields and order for the record type
		var sortFieldsKey 	= recordType + "-sort-fields";
		var sortOrderKey	= recordType + "-sort-order";
		var lastSortFields 	= sessionStorage.getItem(sortFieldsKey);
		var lastSortOrder 	= sessionStorage.getItem(sortOrderKey);
		
		// Cleanup values
		sortFieldsCsv = (sortFieldsCsv || "").replace(/\s\s+/g, ' ');
		lastSortFields = (lastSortFields || "").replace(/\s\s+/g, ' ');
		
		//console.log("last sort fields: %s; last sort order: %s", lastSortFields, lastSortOrder);
		
		var sortOrder = "asc";
		if (!sortFieldsCsv) {
			sortFieldsCsv = lastSortFields || defaultSortFields;
			sortOrder = lastSortOrder || "asc";
		}
		else if (sortFieldsCsv.localeCompare(lastSortFields) == 0 && sortOrder.localeCompare(lastSortOrder) == 0 && reverse) {
			sortOrder = "desc";
		}
	
		// Build sort fields and order arrays
		var sortFields = sortFieldsCsv.split(",");
		var sortOrders = Array.apply(null, Array(sortFields.length)).map(String.prototype.valueOf, sortOrder);
		
		// Append defaults if needed
		if (sortFieldsCsv.localeCompare(defaultSortFields) != 0) {
			sortFields.push("year");
			sortFields.push("quarter");
			
			sortOrders.push("asc");
			sortOrders.push("asc");
		}
		
		//console.log("sorting results by: %s (%s)", sortFields, sortOrders);
		results.items = _.orderBy(results.items, sortFields, sortOrders);
		
		sessionStorage.setItem(sortFieldsKey, sortFieldsCsv);
		sessionStorage.setItem(sortOrderKey, sortOrder);
	}

	
	var populateAlternateViews = function() {
	
		// Add alternate view(s)
		if (recordType && resources && results && results.items && results.items.length > 0) {
			// Remove any existing views
			$("div[results-view][results-view!='default']").remove();
			
			// Add alternate views
			//console.log("Adding alternate views...");
			var viewPrefix = "view_" + recordType; // record type = EW_Birth, EW_Death
			for (var resourceName in resources) {
				var resourceNamePrefix = resourceName.substring(0, viewPrefix.length);
			
				if (resources.hasOwnProperty(resourceName) && viewPrefix.localeCompare(resourceNamePrefix) == 0) {
					var template =  resources[resourceName].toString();
					var compiledTemplate = Handlebars.compile(template);
					var html = compiledTemplate(results);
					
					if (html) {
						$("div[results-view]").filter(":last").after($(html));
						//console.log("Added alternate view");
					}
					
					
				}
			}
			
			// Add view helpers and event handlers, if not already added
			if ($("div[results-view]").length > 1) {
				// Add event handler to hide/show actions row
				// TODO: Make adding view event handlers more dynamic, so they can be specific to the view
				$("div[results-view][results-view!='default'] tbody tr.rec")
					.off("click.groish")
					.on("click.groish", function(event) {

						event.preventDefault();
						$(this).next("tr.rec-actions:not(:empty)").toggle();
					}
				);

				// Add event handler for column sorting
				$("div[results-view][results-view!='default'] thead td[sort-fields]")
					.off("click.groish")
					.on("click.groish", function(event) {

						event.preventDefault();
						//var defaultSortFields = ($(this).closet("div[results-view]").attr("default-sort-fields");
						var sortFields = ($(this).attr("sort-fields") ? $(this).attr("sort-fields") : $(this).text());
						sortResults(true, sortFields);
						populateAlternateViews();
					}
				);

				// Add view switcher, if it doesn't already exist
				if ($("#groish_ViewSwitcher").length == 0) {
					$(".groish_ResultsHeader").append($("<a href='#' id='groish_ViewSwitcher' class='main_text' accesskey='~'>Switch view</a>"));
					$("#groish_ViewSwitcher").off("click.groish").on("click.groish", function() { switchResultsView(); return false; });


					// Add results copier (if supported)
					if (window.getSelection && document.createRange) {
						$(".groish_ResultsHeader").append($("<a href='#' id='groish_ResultsCopier' class='main_text' accesskey='|'>Copy results</a>"));
						$("#groish_ResultsCopier")
							.off("click.groish")
							.on("click.groish", function(event) {

								event.preventDefault();

								// Get most specific element containing results, typically a table body
								var resultsContent = $("div[results-view]:visible tbody");

								if (resultsContent.length == 0)
									resultsContent = $("div[results-view]:visible");
								
								if (resultsContent.length > 0) {
									resultsContent = resultsContent[0];
									var selection = window.getSelection();
									var range = document.createRange();
									range.selectNodeContents(resultsContent);
									selection.removeAllRanges();
									selection.addRange(range);

									try {
										if (document.execCommand("copy")) {
											selection.removeAllRanges();
											$(".groish_Message").text("Results copied to clipboard").show();
											setTimeout(function() { $(".groish_Message").fadeOut(); }, 3000);
										}
									}
									catch(e) { }
								}

								return false;
						});
					}
				}
			}

			
			// Show the last used view
			var viewName = sessionStorage.getItem("groish_view." + recordType);
			//console.log("initialising view: %s", viewName);
			if (viewName && $("div[results-view='" + viewName + "']:hidden").length == 1) {
				//console.log("setting active view: %s", viewName);
				$("div[results-view][results-view!='" + viewName + "']").hide();
				$("div[results-view][results-view='" + viewName + "']").show();
			}
		}
		
	}

	
	var switchResultsView = function() {
		var views = $("div[results-view]");
		if (views.length > 1) {
			var curIndex = -1;
			$(views).each(function(index) {
				if ($(this).css("display") != "none")
					curIndex = index;
			});

			//console.log("current view index: %s", curIndex);
			if (curIndex !== -1) {
				var newIndex = ((curIndex == (views.length-1)) ? 0 : curIndex+1);
				$(views).hide();
				$("div[results-view]:eq(" + newIndex + ")").show();

				$(".groish_Message").hide();

				// Get the name and save it
				var viewName = $("div[results-view]:eq(" + newIndex + ")").attr("results-view")
				sessionStorage.setItem("groish_view." + recordType, viewName); //save it
				//console.log("new view: %s", viewName);
			}
		}
	}
	
	var getResults = function(recordType) {
		var results = { "ageWarningThreshold": 24, "items": [], "failures": [] };
		
		// Lookup record type - birth or death
		if (recordType !== null && (recordType === "EW_Birth" || recordType === "EW_Death")) {
			var gender = $("form[name='SearchIndexes'] select#Gender").val();
			
			$("div[results-view='default'] > table > tbody > tr")
				.has("input[type='radio'][name='SearchResult']")
				.each(function(index) {
						try
						{
							//console.log("Parsing record (%d)...", index);
							
							// Get result id, contains year and record id
							var recordId = null;
							var resultId = $(this).find("input[type='radio'][name='SearchResult']:first").val();
													
							if (resultId && resultId.length > 5 && resultId.indexOf('.') == 4)
								recordId = resultId.substring(5);
				
							// Get names and reference
							var names 	= $(this).find("td:eq(1)").text().replace(/\u00a0/g, " ").replace(/\s\s+/g, ' ').trim();
							var ref 	= $(this).next().find("td:eq(0)").text();

							// Clean up reference
							ref = ref.replace(/\u00a0/g, " ");
							ref = ref.replace(/\s\s+/g, ' ');
							ref = ref.replace(/GRO Reference: /g, "");
							ref = ref.replace(/M Quarter in/g, "Q1");
							ref = ref.replace(/J Quarter in/g, "Q2");
							ref = ref.replace(/S Quarter in/g, "Q3");
							ref = ref.replace(/D Quarter in/g, "Q4");

							var age = 0;
							if (recordType === "EW_Death") {
								var ageArr = /^([0-9]{1,3})$/.exec($(this).find("td:eq(2)").text().replace(/\u00a0/g, " ").replace(/\s\s+/g, ' ').trim());
								if (ageArr)
									age = parseInt(ageArr[1], 10);
							}

							var mother = null;
							if (recordType === "EW_Birth")
								mother = toTitleCase($(this).find("td:eq(2)").text().replace(/\u00a0/g, " ").replace(/\s\s+/g, ' ')).trim();


							// Parse forenames, surname, year, quarter, district, vol, page
							var namesArr 	= /([a-z' -]+),([a-z' -]*)/gi.exec(names);
							var refArr 		= /([0-9]{4}) Q([1-4]) ([a-z\.\-,\(\)0-9\&'/ ]*)Volume ([a-z0-9]+)( Page ([0-9a-z]+)|)( Occasional Copy: ([0-9a-z]+)|)/gi.exec(ref); // NB: the district may not be set in some cases

							//console.log("index: %d, namesArr: %s, refArr: %s", index, namesArr, refArr);

							var quarterNames = [ "Mar", "Jun", "Sep", "Dec" ];

							var record =
								{
									"recordId":		recordId,
									"gender":		gender,
									"forenames": 	toTitleCase(namesArr[2]).trim(),
									"surname": 		toTitleCase(namesArr[1]).trim(),
									"age": 			age,
									"mother": 		mother,
									"year": 		parseInt(refArr[1], 10),
									"quarter": 		parseInt(refArr[2], 10),
									"district": 	toTitleCase(refArr[3]).trim(),
									"volume": 		refArr[4].toLowerCase(),
									"page": 		refArr[6],
									"copy":			(refArr[8] ? refArr[8].trim() : ""),
									"actions": 		[]
								};
								
							
							//console.log("resultId: %s, record.recordId: %s, record.year: %s, recordType: %s", resultId, record.recordId, record.year, recordType);
							
							// Determine what actions are supported for the record and add them
							if (record.recordId && record.year && recordType) {
								
								// Define possible actions
								var actions = [
									{ "text": "Order Certificate", 		"url": null, "itemType": "Certificate", "pdfStatus": 0, "selector": "img[src$='order_certificate_button.gif']" },
									{ "text": "Order PDF", 				"url": null, "itemType": "PDF", 		"pdfStatus": 5, "selector": "img[src$='order_pdf_button.gif']" }
									//{ "text": "Order MSF + Bundle", 	"url": null, "itemType": "MSFBundle", 	"pdfStatus": 0, "selector": "img[src$='order_certificate_button.gif']" }
								];
							
								for (var i = 0; i < actions.length; i++) {
									
									if ($(this).next().find(actions[i].selector).length) {
										
										// Build order url
										var orderUrl = "https://www.gro.gov.uk/gro/content/certificates/indexes_order.asp?";
										
										orderUrl += "Index=" + recordType;
										orderUrl += "&Year=" + record.year;
										orderUrl += "&EntryID=" + record.recordId;
										orderUrl += "&ItemType=" + actions[i].itemType;
										
										if (actions[i].pdfStatus && actions[i].pdfStatus > 0)
											orderUrl += "&PDF=" + actions[i].pdfStatus;
										
										actions[i].url = orderUrl;
										record.actions.push(actions[i]);
									}
									
									//console.log("action '%s' (%s), url: %s", actions[i].itemType, actions[i].selector, actions[i].url);
								}
							}
							

							
							record.noForenames	= (!record.forenames || record.forenames == "-");
							record.ageWarning	= (age != null && age > 0 && age <= results.ageWarningThreshold);
							record.birth 		= (age != null ? record.year - age : null);
							record.quarterName	= ((record.quarter >=1 && record.quarter <= 4) ? quarterNames[record.quarter-1] : null);
							//console.log(record);
							results.items.push(record);
						}
						catch (e)
						{
							//console.log("Failed to parse record (%d): %s", index, e.message);
							results.failures.push({ "index": index, "ex": e });
						}
					});
		}
		
		return results;
	}


	var toTitleCase = function(str) {
		return str.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}
	
	var switchRecordType = function() {
		var recordTypes = $("form[name='SearchIndexes'] input[type='Radio'][name='index']");

		var curIndex = -1;
		for (var i = 0; i < recordTypes.length; i++) {
			if ($(recordTypes).eq(i).prop("checked")) {
				curIndex = i;
				break;
			}
		}
		
		//console.log("current record type: %d", curIndex);

		if (curIndex >= 0) {
			var nextIndex = (curIndex == (recordTypes.length-1)) ? 0 : curIndex + 1;

			if (nextIndex != curIndex)
				$(recordTypes).eq(nextIndex).prop("checked", true).click();
			
			//console.log("next record type: %d", nextIndex);
		}			
	}

	var toggleGender = function() {
		var curGender = $("form[name='SearchIndexes'] select#Gender").val();
		$("form[name='SearchIndexes'] select#Gender").val((curGender === "F" ? "M" : "F"));
		$("form[name='SearchIndexes'] input[type='submit'][value='Search']").click();
	}
	
	var adjustSearchYear = function(step) {
		var adjusted = false;
		
		// Get min and max years
		var minYear = parseInt($("form[name='SearchIndexes'] select#Year option:eq(2)").val(), 10);
		var maxYear = parseInt($("form[name='SearchIndexes'] select#Year option:last").val(), 10);

		//console.log("Year range: %s - %s", minYear, maxYear);

		if (!isNaN(step) && !isNaN(minYear) && !isNaN(maxYear)) {
			// Read current year and range
			var curYear = parseInt($("form[name='SearchIndexes'] select#Year").val(), 10);
			var curRange = parseInt($("form[name='SearchIndexes'] select#Range").val(), 10);

			if (!isNaN(curRange)) {
				// Calculate the new year
				var newYear = (isNaN(curYear) ? minYear : curYear+step);
				newYear = Math.min(Math.max(newYear, minYear), maxYear);
				
				if (newYear != curYear) {
					$("form[name='SearchIndexes'] select#Year").val(newYear);
					adjusted = true;
				}
			}

			//console.log("Current year: %d +-%d (%d-%d), New year: %d (%d-%d)", curYear, curRange, curYear-curRange, curYear+curRange, newYear, newYear-curRange, newYear+curRange);
		}

		return adjusted;
	}

	var navigateYears = function(forward) {
		var curRange = parseInt($("form[name='SearchIndexes'] select#Range").val(), 10);
		
		if (!isNaN(curRange)) {
			// Calculate the new year
			var step = (curRange * 2) + 1;
			if (!forward) step = -step;
		
			if (adjustSearchYear(step)) {
				$("form[name='SearchIndexes'] input[type='submit'][value='Search']").click();
			}
		}
	}
	
	var getRecordType = function() {
		return $("form[name='SearchIndexes'] input[type='radio'][name='index']:checked").val();
	}


	var buildResources = function() {
		resources = {

			baseStyle: `
<style type="text/css">
	body
	{
		min-height: 1200px;
	}

	form[name="SearchIndexes"]
	{
		position: relative !important;
	}
	
	.groish_ButtonContainer
	{
		padding-bottom: 10px;
	}
	
	.groish_ButtonContainer input[type='submit'],
	.groish_ButtonContainer input[type='button']
	{
		margin-right: 20px;
		min-width: 100px;
		font-size: 13px;
		padding: 4px 10px;
	}
	
	.groish_ButtonContainer input[type='submit']
	{
		margin-right: 0px;
	}
	
	#groish_ResultsCopier,
	#groish_ViewSwitcher
	{
		display:inline-block;
		position: absolute;
		bottom: 0px;
		color: #993333;
		font-weight: bold;
		cursor: pointer;
	}
	
	#groish_ResultsCopier
	{
		right: 120px;
	}
	
	#groish_ViewSwitcher
	{
		right: 10px;
	}
	
	div[results-view] td[sort-fields]:hover
	{
		cursor: pointer;
	}

	.groish_Message
	{
		position: absolute;
		bottom: -30px;
		left: 5px;
	}

</style>
`,

			view_EW_Birth_Table: `
<style type="text/css">
	div[results-view='EW_Birth-Table'] td
	{
		padding: 5px 3px;
		font-size: 75%;
		color: #663333;
		vertical-align: top;
	}
	
	div[results-view='EW_Birth-Table'] thead td
	{
		font-weight: bold;
	}
	
	div[results-view='EW_Birth-Table'] tbody tr:nth-child(4n+1),
	div[results-view='EW_Birth-Table'] tbody tr:nth-child(4n+2)
	{
		background-color: #F9E8A5;
	}
	
	div[results-view='EW_Birth-Table'] tr.rec-actions a
	{
		padding: 0px 5px;
		font-size: 90%;
		color: #663333;
		text-decoration: none;
	}
</style>
<div results-view='EW_Birth-Table' style='display: none; margin-bottom: 25px' default-sort-fields='year,quarter'>
	<table style='width: 100%; border-collapse: collapse'>
		<thead>
			<tr>
				<td style='width: 12%' sort-fields='year,quarter'>Date</td>
				<td style='width: 30%' sort-fields='forenames,surname'>Name</td>
				<td style='width: 15%' sort-fields='mother'>Mother</td>
				<td style='width: 25%' sort-fields='district'>District</td>
				<td style='width: 6%'  sort-fields='volume,district'>Vol</td>
				<td style='width: 6%'  sort-fields='page,volume'>Page</td>
				<td style='width: 6%'  sort-fields='copy,volume'>Copy</td>
			</tr>
		</thead>
		<tbody>
		{{#each items}}
			<tr class='rec'>
				<td>{{year}} Q{{quarter}}</td>
				<td><span class='forenames'>{{forenames}}</span> <span class='surname'>{{surname}}</span>{{#if noForenames}} ({{gender}}){{/if}}</td>
				<td>{{mother}}</td>
				<td>{{district}}</td>
				<td>{{volume}}</td>
				<td>{{page}}</td>
				<td>{{copy}}</td>
			</tr>
			<tr class='rec-actions' style='display: none'>
				<td colspan='7' style='text-align: right'>
				{{#actions}}
					<a href='{{url}}' {{#if title}}title='{{title}}'{{/if}}>{{text}}</a>
				{{/actions}}
				</td>
			</tr>
		{{/each}}
		</tbody>
	</table>
	{{#if failures}}
		<p class='main_text' style='color: Red'>WARNING: Failed to parse {{failures.length}} records. See default view for full list.</p>
		<!--
			{{#each failures}}record parse exception ({{index}}): exception: {{ex.message}}{{/each}}
		-->
	{{/if}}
	<p class='main_text groish_Message'></p>
</div>`,
		
			view_EW_Birth_Delimited: `
<style type="text/css">
	div[results-view='EW_Birth-Delimited'] td
	{
		padding: 5px 3px;
		font-size: 75%;
		color: #663333;
		vertical-align: top;
	}
	
	div[results-view='EW_Birth-Delimited'] thead td
	{
		font-weight: bold;
	}
	
	div[results-view='EW_Birth-Delimited'] tbody tr:nth-child(odd)
	{
		background-color: #F9E8A5;
	}

</style>
<div results-view='EW_Birth-Delimited' style='display: none; margin-bottom: 25px' default-sort-fields='year,quarter'>
	<table style='width: 100%; border-collapse: collapse'>
		<thead>
			<tr>
				<td style='width: 100%' sort-fields='year,quarter'>Births</td>
			</tr>
		</thead>
		<tbody>
		{{#each items}}
			<tr class='rec'>
				<td>
				{{year}} Q{{quarter}} Birth -
				{{forenames}} {{surname}}{{#if noForenames}} ({{gender}}){{/if}} 
				(mmn: {{mother}}); 
				{{district}}; {{volume}}; {{page}}; {{copy}}
			</tr>
		{{/each}}
		</tbody>
	</table>
	{{#if failures}}
		<p class='main_text' style='color: Red'>WARNING: Failed to parse {{failures.length}} records. See default view for full list.</p>
		<!--
			{{#each failures}}record parse exception ({{index}}): exception: {{ex.message}}{{/each}}
		-->
	{{/if}}
	<p class='main_text groish_Message'></p>
</div>`,

			view_EW_Death_Table: `
<style type="text/css">
	div[results-view='EW_Death-Table'] td
	{
		padding: 5px 3px;
		font-size: 75%;
		color: #663333;
		vertical-align: top;
	}
	
	div[results-view='EW_Death-Table'] thead td
	{
		font-weight: bold;
	}
	
	div[results-view='EW_Death-Table'] tbody tr:nth-child(4n+1),
	div[results-view='EW_Death-Table'] tbody tr:nth-child(4n+2)
	{
		background-color: #F9E8A5;
	}
	
	div[results-view='EW_Death-Table'] tr.rec-actions a
	{
		padding: 0px 5px;
		font-size: 90%;
		color: #663333;
		text-decoration: none;
	}
</style>
<div results-view='EW_Death-Table' style='display: none; margin-bottom: 25px' default-sort-fields='year,quarter'>
	<table style='width: 100%; border-collapse: collapse'>
		<thead>
			<tr>
				<td style='width: 12%' sort-fields='year,quarter'>Date</td>
				<td style='width: 26%' sort-fields='forenames,surname'>Name</td>
				<td style='width: 8%'  sort-fields='age'>Age{{#if ageCautionThreshold}}*{{/if}}</td>
				<td style='width: 8%'  sort-fields='birth'>Birth</td>
				<td style='width: 28%' sort-fields='district'>District</td>
				<td style='width: 6%'  sort-fields='volume,district'>Vol</td>
				<td style='width: 6%'  sort-fields='page,volume'>Page</td>
				<td style='width: 6%'  sort-fields='copy,volume'>Copy</td>
			</tr>
		</thead>
		<tbody>
		{{#each items}}
			<tr class='rec'>
				<td>{{year}} Q{{quarter}}</td>
				<td><span class='forenames'>{{forenames}}</span> <span class='surname'>{{surname}}</span>{{#if noForenames}} ({{gender}}){{/if}}</td>
				<td>{{age}}{{#if ageWarning}}*{{/if}}</td>
				<td>{{birth}}
				<td>{{district}}</td>
				<td>{{volume}}</td>
				<td>{{page}}</td>
				<td>{{copy}}</td>
			</tr>
			<tr class='rec-actions' style='display: none'>
				<td colspan='8' style='text-align: right'>
				{{#actions}}
					<a href='{{url}}' {{#if title}}title='{{title}}'{{/if}}>{{text}}</a>
				{{/actions}}
				</td>
			</tr>
		{{/each}}
		</tbody>
	</table>
	{{#if failures}}
		<p class='main_text' style='color: Red'>WARNING: Failed to parse {{failures.length}} records. See default view for full list.</p>
		<!--
			{{#each failures}}record parse exception ({{index}}): exception: {{ex.message}}{{/each}}
		-->
	{{/if}}
	<p class='main_text'>
		* Age is presumed to be years but <i>may</i> be months.
		{{#if ageWarningThreshold}}An age below {{ageWarningThreshold}} <i>may</i> be a child, treat with caution.{{/if}}
		An age of zero <i>may</i> have be used when a child was aged less than 12 months.
	</p>
	<p class='main_text groish_Message'></p>
</div>`,

			view_EW_Death_Delimited: `
<style type="text/css">
	div[results-view='EW_Death-Delimited'] td
	{
		padding: 5px 3px;
		font-size: 75%;
		color: #663333;
		vertical-align: top;
	}
	
	div[results-view='EW_Death-Delimited'] thead td
	{
		font-weight: bold;
	}
	
	div[results-view='EW_Death-Delimited'] tbody tr:nth-child(odd)
	{
		background-color: #F9E8A5;
	}
	
</style>
<div results-view='EW_Death-Delimited' style='display: none; margin-bottom: 25px' default-sort-fields='year,quarter'>
	<table style='width: 100%; border-collapse: collapse'>
		<thead>
			<tr>
				<td style='width: 100%' sort-fields='year,quarter'>Deaths</td>
			</tr>
		</thead>
		<tbody>
		{{#each items}}
			<tr class='rec'>
				<td>
					{{year}} Q{{quarter}} Death - 
					{{forenames}} {{surname}}{{#if noForenames}} ({{gender}}){{/if}};
					age {{age}}{{#if ageWarning}}*{{/if}} (b{{birth}});
					{{district}}; {{volume}}; {{page}}; {{copy}}
				</td>
			</tr>
		{{/each}}
		</tbody>
	</table>
	{{#if failures}}
		<p class='main_text' style='color: Red'>WARNING: Failed to parse {{failures.length}} records. See default view for full list.</p>
		<!--
			{{#each failures}}record parse exception ({{index}}): exception: {{ex.message}}{{/each}}
		-->
	{{/if}}
	<p class='main_text'>
		* Age is presumed to be years but <i>may</i> be months.
		{{#if ageWarningThreshold}}An age below {{ageWarningThreshold}} <i>may</i> be a child, treat with caution.{{/if}}
		An age of zero <i>may</i> have be used when a child was aged less than 12 months.
	</p>
	<p class='main_text groish_Message'></p>
</div>`

		};

		// Add custom views
		// NB: Although GreaseMonkey has replaced the GM_* functions with functions on the GM object
		// both ViolentMonkey and TamperMonkey still support the GM_* functions so that's being used.

		// Custom views are defined as GM values (one value per view). The value name must begin with
		// either view_EW_Birth or view_EW_Death. The view may contain CSS and HTML and the views are
		// Handlebars.js templates (see default views above for examples).
	
		//console.log("adding custom views");
		if (typeof GM_listValues === "function" && typeof GM_getValue === "function") {
			var valueKeys = GM_listValues();
			for(var i = 0; i < valueKeys.length; i++) {
				var valueKey = valueKeys[i];
				//console.log("value key: %", valueKey);
				if (valueKey && valueKey.length > 13 && (valueKey.startsWith("view_EW_Birth") || valueKey.startsWith("view_EW_Death"))) {
					// Check the key isn't already in use
					if (!resources.hasOwnProperty(valueKey)) {
						var viewContent = GM_getValue(valueKey, null);
						if (viewContent) {
							//console.log("adding view: %s", valueKey);
							resources[valueKey] = viewContent;
						}
					}
				}
			}
		}
		
	}

	
	//Get the ball rolling...
	main();
});