// ==UserScript==
// @name		Jira Deployment Helper
// @namespace		http://www.mapyourshow.com/
// @description		Adds Jira Code Review button to Subversion Commits tab, highlights database changes in the comments or description that have "dbo." in them or say "ERRORFIXED", "ERRORIGNORED" or "STILLOCCURRING", highlights tasks in list view and dashboard gadgets based on original time estimate and due date.
// @include		*/secure/dashboard*
// @include		*/secure/myjirahome*
// @include		*/browse/*
// @include		*/issues/*
// @version		2.0.1
// @require		https://code.jquery.com/jquery-3.4.0.min.js
// ==/UserScript==

function scriptLoader(callback) {
	var script = document.createElement("script");
	script.textContent = "(" + callback.toString() + ")(window.AJS.$);";
	document.body.appendChild(script);
}

mainCode = function($) {
	var version = 0,
		task = '',
		project = '';

	function waitForAddedNode(params) {
		new MutationObserver(function(mutations) {
			var el = document.querySelector(params.id);
			if (el) {
				//this.disconnect();
				params.done(el);
			}
		}).observe(params.parent || document, {
			subtree: !!params.recursive,
			childList: true,
		});
	}

	waitForAddedNode({
		id: 'div.gadget',
		parent: document.body,
		recursive: true,
		done: function(el) {
			console.log('here!');
			console.log(el);

			if (document.querySelector('div.gadget') !== null) {
				initJiraPlugin(jQuery('div.gadget-inline').contents().find('table'));
			} else {
				initJiraPlugin(jQuery('iframe').contents().find('table'));
			}
		}
	});

	// These are for the Issues page
	JIRA.bind(JIRA.Events.NEW_CONTENT_ADDED, function(e, context, reason) {
		initJiraPlugin(jQuery('table#issuetable'));
	});

	if (typeof JIRA.ViewIssueTabs !== 'undefined') {
		JIRA.ViewIssueTabs.onTabReady(function() {
			initJiraPlugin(jQuery('table#issuetable'));
		});
	}

	function initJiraPlugin(issueTable) {
		version = parseFloat(jQuery('meta[name=ajs-version-number]').attr('content'));
		if (jQuery('meta[name=ajs-issue-key]').length) {
			task = jQuery('meta[name=ajs-issue-key]').attr('content');
			project = task.split('-')[0];
		}

		// This colorizes the tasks in list view based on Original Estimate and Due Date
		colorTasks(issueTable, version);

		// This highlights all instances of database names with "dbo." in them
		highlightDB(version);

		// This highlights all instances of "ERRORFIXED"
		highlightErrorNotes(version);

		// Clears duplicated highlight tags when editing a comment/description with a highlighted term in it
		clearInvalidHighlightTags(version);

		// This adds the Code Review button in the Subversion tab
		addCodeReviewButton(version);

		// Defaults the issues page to "All Issues" instead of "Open Issues"
		allIssuesDefault(version);
	}

	function Change(label, url) {
		this.label = label;
		var s = url.split(url.indexOf('#') > 0 ? '#' : '?r=');
		this.ref = s[0];
		this.revision = s[1];
		this.commits = 1;
		this.pref = new RegExp('/[a-zA-Z-_]+/', '');

		this.asA = function() {
			return this.label;
		};

		this.setMaxRevision = function(revision) {
			if (revision > this.revision) {
				this.revision = revision;
			}
			this.commits++;
		};

		this.samePrefix = function(prefix) {
			return getPrefix() == prefix;
		};

		this.getPrefix = function() {
			return this.label.match(this.pref)[0];
		};
	}

	function createReviewView() {
		var index = 0;
		var changes = [];
		var mapChanges = [];
		//select dev with id issueContent
		//select div with id issue_actions_container in it
		//select tables in it
		//find rows with text 'Files Changed'
		//select next sibling tr (in terminology of jquery it is 'next adjacent selector'
		//select td in it
		//select a in it
		jQuery('div#issue_actions_container table tr:contains("Files Changed") + tr td').each(function() {
			var lines = jQuery(this).text().split('\n');
			jQuery.each(lines, function() {
				if (this.trim().substr(0, 7) == '/trunk/' || this.trim().substr(0, 10) == '/branches/') {
					var change = new Change(this, this);
					if (mapChanges[change.label]) {
						mapChanges[change.label].setMaxRevision(change.revision);
					} else {
						changes[index++] = change;
						mapChanges[change.label] = change;
					}
				}
			});
		});
		changes.sort(function(a, b) {
			return (b.label.toLowerCase() < a.label.toLowerCase()) - (a.label.toLowerCase() < b.label.toLowerCase());
		});
		var res = '<div class="issuePanelContainer" id="issue_actions_container"><table cellpadding="2" cellspacing="0" border="0" width="100%">';
		res += '<tbody><tr><td bgcolor="#f0f0f0"><b>Commits</b></td><td bgcolor="#f0f0f0"><b>Changed File</b></td></tr>';
		var prefix;
		var sep = false;
		for (var i = 0; i < index; i++) {
			sep = (prefix && (prefix != changes[i].getPrefix()));
			res = res + '<tr><td' + style(sep) + '>' + changes[i].commits + '</td><td' + style(sep) + '>' + changes[i].asA() + '</td></tr>';
			prefix = changes[i].getPrefix();
		}
		return res + '</tbody></table></div>';
	}

	function style(sep) {
		return sep ? ' style="border-top: solid #BBB 1px;"' : '';
	}

	function highlightDB(version) {
		if (jQuery('#description-val').length) {
			var $descriptionDiv = jQuery('#description-val');
		} else if (jQuery('#issue-description').length) {
			var $descriptionDiv = jQuery('#issue-description');
		}
		if ($descriptionDiv) {
			var result = $descriptionDiv.html();
			var regex = new RegExp('[\\w.*_]*dbo\\.[\\w]*','ig');
			$descriptionDiv.html(result.replace(regex, '<span style="background-color:yellow;">$&</span>'));
		}

		jQuery('.action-body').each(function() {
			result = jQuery(this).html();
			regex = new RegExp('[\\w.*_]*dbo\\.[\\w]*','ig');
			jQuery(this).html(result.replace(regex, '<span style="background-color:yellow;">$&</span>'));
		});
	}

	function highlightErrorNotes(version) {
		if (jQuery('#description-val').length) {
			var $descriptionDiv = jQuery('#description-val');
		} else if (jQuery('#issue-description').length) {
			var $descriptionDiv = jQuery('#issue-description');
		}
		if ($descriptionDiv) {
			var result = $descriptionDiv.html();
			var regex = new RegExp('ERRORFIXED','g');
			$descriptionDiv.html(result.replace(regex, '<span style="background-color:#ffff00;">$&</span>'));

			result = $descriptionDiv.html();
			regex = new RegExp('ERRORIGNORED','g');
			$descriptionDiv.html(result.replace(regex, '<span style="background-color:#90ee90;">$&</span>'));

			result = $descriptionDiv.html();
			regex = new RegExp('STILLOCCURRING','g');
			$descriptionDiv.html(result.replace(regex, '<span style="background-color:#ffa500;">$&</span>'));
		}

		jQuery('.action-body').each(function() {
			if (project == 'ERRORS') {
				result = jQuery(this).html();
				regex = new RegExp('boothsales','gi');
				jQuery(this).html(result.replace(regex, '<span style="background-color:#ff0000;">$&</span>'));

				result = jQuery(this).html();
				regex = new RegExp('/checkout/checkout.cfm','gi');
				jQuery(this).html(result.replace(regex, '<span style="background-color:#ff0000;">$&</span>'));
			}

			result = jQuery(this).html();
			regex = new RegExp('ERRORFIXED','g');
			jQuery(this).html(result.replace(regex, '<span style="background-color:#ffff00;">$&</span>'));

			result = jQuery(this).html();
			regex = new RegExp('ERRORIGNORED','g');
			jQuery(this).html(result.replace(regex, '<span style="background-color:#90ee90;">$&</span>'));

			result = jQuery(this).html();
			regex = new RegExp('STILLOCCURRING','g');
			jQuery(this).html(result.replace(regex, '<span style="background-color:#ffa500;">$&</span>'));
		});
	}

	function clearInvalidHighlightTags(version) {
		 if (jQuery('#description-val').length) {
			 var $descriptionDiv = jQuery('#description-val');
		 } else if (jQuery('#issue-description').length) {
			 var $descriptionDiv = jQuery('#issue-description');
		 }
		if ($descriptionDiv) {
			$descriptionDiv.html($descriptionDiv.html().replace(/&lt;span style="background-color:(.*);"&gt;/gi, ''));
			$descriptionDiv.html($descriptionDiv.html().replace(/&lt;\/span&gt;/gi, ''));
		}

		jQuery('.action-body').each(function() {
			jQuery(this).html(jQuery(this).html().replace(/&lt;span style="background-color:(.*);"&gt;/gi, ''));
			jQuery(this).html(jQuery(this).html().replace(/&lt;\/span&gt;/gi, ''));
		});
	}

	function addCodeReviewButton(version) {
		console.log(version);
		if (!jQuery('#review_button_div').length) {
			if (version >= 7) {
				if (jQuery('li#svnplus-subversion-commits-tabpanel').hasClass('active') == 1) { //where the Subversion Commits is but not inside a tag
					jQuery('div#issue_actions_container:first').prepend('<div id="review_button_div" style="width: 100%;margin-bottom:10px;"><button id="review_button">Code Review</button></div>');
					var view = createReviewView();
					var revView = false;
					jQuery('#review_button').click(function() {
						var oldView = jQuery('table', 'div#issue_actions_container').detach();
						jQuery('div#review_button_div').after(view);
						jQuery('#review_button').text(revView ? 'Code Review' : 'All Commits');
						view = oldView;
						revView = !revView;
					});
				}
			} else if (version >= 6) {
				if (jQuery('li#subversion-commits-tabpanel').hasClass('active') == 1) { //where the Subversion Commits is but not inside a tag
					jQuery('div#issue_actions_container:first').prepend('<div id="review_button_div" style="width: 100%;margin-bottom:10px;"><button id="review_button">Code Review</button></div>');
					var view = createReviewView();
					var revView = false;
					jQuery('#review_button').click(function() {
						var oldView = jQuery('table', 'div#issue_actions_container').detach();
						jQuery('div#review_button_div').after(view);
						jQuery('#review_button').text(revView ? 'Code Review' : 'All Commits');
						view = oldView;
						revView = !revView;
					});
				}
			} else {
				if (jQuery('li#subversion-commits-tabpanel').hasClass('active') == 1) { //where the Subversion Commits is but not inside a tag
					jQuery('ul#issue-tabs').closest('div').after('<div id="review_button_div" style="width: 100%;margin-bottom:10px;"><button id="review_button">Code Review</button></div>');
					var view = createReviewView();
					var revView = false;
					jQuery('#review_button').click(function() {
						var oldView = jQuery('div#issue_actions_container').detach();
						jQuery('div#review_button_div').after(view);
						jQuery('#review_button').text(revView ? 'Code Review' : 'All Commits');
						view = oldView;
						revView = !revView;
					});
				}
			}
		}
	}

	function allIssuesDefault(version) {
		if (jQuery('*[data-item-id="allissues"]').length) {
			 jQuery('*[data-item-id="allissues"]').trigger('click');
		 }
	}

	function colorTasks(issueTable, version) {
		if (issueTable.length && (issueTable.find('td.timeoriginalestimate').length || issueTable.find('td.aggregatetimeoriginalestimate').length) && issueTable.find('td.duedate').length) {
			var $issueTable = issueTable,
				$issueTableRows = issueTable.find('tr:gt(0)');	// skip the header row

			$issueTableRows.each(function(index) {
				var $originalEstimate = (jQuery.trim(jQuery('td.timeoriginalestimate', this).html()) == '' ? jQuery.trim(jQuery('td.aggregatetimeoriginalestimate', this).html()) : jQuery.trim(jQuery('td.timeoriginalestimate', this).html())),
					$dueDate = (typeof(jQuery('td.duedate', this).html()) == 'string' ? jQuery('td.duedate', this).html() : ''),
					$originalEstimateDays,
					$originalEstimateMinutes,
					$numberDays,
					thisdate,
					today;

				// Get total estimated minutes
				$originalEstimateMinutes = ($originalEstimate.match(/\d+(?= week)/ig) == null ? 0 : parseInt($originalEstimate.match(/\d+(?= week)/ig)) * 2400)
											+ ($originalEstimate.match(/\d+(?= day)/ig) == null ? 0 : parseInt($originalEstimate.match(/\d+(?= day)/ig)) * 480)
											+ ($originalEstimate.match(/\d+(?= hour)/ig) == null ? 0 : parseInt($originalEstimate.match(/\d+(?= hour)/ig)) * 60)
											+ ($originalEstimate.match(/\d+(?= minute)/ig) == null ? 0 : parseInt($originalEstimate.match(/\d+(?= minute)/ig)));

				// Now let's account for weekends
				$numberDays = Math.ceil($originalEstimateMinutes / 480);

				thisdate = new Date();
				today = thisdate.getDay();

				switch (true) {
					case ($numberDays == 0):
						if (today == 6) {
							$originalEstimateMinutes += 480;
						} else if (today == 5) {
							$originalEstimateMinutes += 960;
						}
						break;
					case ($numberDays == 1):
						if (today == 6) {
							$originalEstimateMinutes += 480;
						} else if (today == 5) {
							$originalEstimateMinutes += 960;
						}
						break;
					case ($numberDays == 2):
						if (today == 6) {
							$originalEstimateMinutes += 480;
						} else if (today >= 4) {
							$originalEstimateMinutes += 960;
						}
						break;
					case ($numberDays == 3):
						if (today == 6) {
							$originalEstimateMinutes += 480;
						} else if (today >= 3) {
							$originalEstimateMinutes += 960;
						}
						break;
					case ($numberDays == 4):
						if (today == 6) {
							$originalEstimateMinutes += 480;
						} else if (today >= 2) {
							$originalEstimateMinutes += 960;
						}
						break;
					case ($numberDays == 5):
						if (today == 6) {
							$originalEstimateMinutes += 480;
						} else if (today >= 1) {
							$originalEstimateMinutes += 960;
						}
						break;
					case ($numberDays >= 6 && $numberDays < 11):
						if (today == 6) {
							$originalEstimateMinutes += 1440;
						} else if (today >= 5) {
							$originalEstimateMinutes += 1920;
						} else if (today == 0) {
							$originalEstimateMinutes += 960;
						}
						break;
					case ($numberDays >= 11 && $numberDays < 16):
						if (today == 6) {
							$originalEstimateMinutes += 2400;
						} else if (today >= 5) {
							$originalEstimateMinutes += 2880;
						} else if (today == 0) {
							$originalEstimateMinutes += 1920;
						}
						break;
					case ($numberDays >= 16 && $numberDays < 21):
						if (today == 6) {
							$originalEstimateMinutes += 3360;
						} else if (today >= 5) {
							$originalEstimateMinutes += 3840;
						} else if (today == 0) {
							$originalEstimateMinutes += 2880;
						}
						break;
					case ($numberDays >= 21 && $numberDays < 26):
						if (today == 6) {
							$originalEstimateMinutes += 4350;
						} else if (today >= 5) {
							$originalEstimateMinutes += 4800;
						} else if (today == 0) {
							$originalEstimateMinutes += 3840;
						}
						break;
					default:
						break;
				}

				// The number of total days estimated, including weekends
				$originalEstimateDays = Math.ceil($originalEstimateMinutes / 480);
				$daysTilDueDate = Math.ceil(dateDiff($dueDate));

				if ($originalEstimate.trim() != '') {	// If an Original Estimate was given
					if (($daysTilDueDate - $originalEstimateDays) < 1) {
						jQuery(this).css('background-color','#ff9999');	// Red
					} else if (($daysTilDueDate - $originalEstimateDays) <= 2) {
						jQuery(this).css('background-color','#fed080');	// Orange
					} else if (($daysTilDueDate - $originalEstimateDays) <= 4) {
						jQuery(this).css('background-color','#fffeab');	// Yellow
					}
				} else {
					if (($daysTilDueDate - $originalEstimateDays) < 1) {
						jQuery(this).css('background-color','#ff9999');	// Red
					} else if (($daysTilDueDate - $originalEstimateDays) == 1) {
						jQuery(this).css('background-color','#fed080');	// Orange
					} else if (($daysTilDueDate - $originalEstimateDays) == 2) {
						jQuery(this).css('background-color','#fffeab');	// Yellow
					}
				}
			});
		} else if (jQuery('.issue-list').length) {
			// Do nothing for now
		}
	}

	function dateDiff(dueDate) {
		var dueDate = dueDate.replace('Jan', '0')
								.replace('Feb', '1')
								.replace('Mar', '2')
								.replace('Apr', '3')
								.replace('May', '4')
								.replace('Jun', '5')
								.replace('Jul', '6')
								.replace('Aug', '7')
								.replace('Sep', '8')
								.replace('Oct', '9')
								.replace('Nov', '10')
								.replace('Dec', '11');
		var arrDueDate = dueDate.split('/');
		var dt1 = new Date();
		var dt2 = new Date('20' + arrDueDate[2], arrDueDate[1], arrDueDate[0]);
		var one_day = 1000 * 60 * 60 * 24;

		return (parseInt(dt2.getTime() - dt1.getTime()) / (one_day));
	}
}

scriptLoader(mainCode);