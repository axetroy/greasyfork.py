// ==UserScript==
// @name                WME Buttons and Validator Localization for New York
// @namespace           https://greasyfork.org/en/users/15052
// @version             1.6.2
// @author              New York Editors
// @credit              Credit to XanderB for the original Validator base template, and to joyriding, and those whose work preceded this one. (You must have the main Validator installed to use this, get it at https://greasyfork.org/en/scripts/1571-wme-validator )
// @description         This adds permalink buttons to various NYS resources, and localizes Validator for use in NYS with updated checks for the USA.
// @include             /^https:\/\/(www|beta)\.waze\.com\/(?!user\/)(.{2,6}\/)?editor.*$/
// @grant               none
// @run-at              document-start
// @require             https://greasyfork.org/scripts/13097-proj4js/code/Proj4js.js
// ^^^^^^^^         needed for the NYS FC Viewer PL to convert coordinated to proper projection
// @icon                data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAB9VBMVEUAAAD/gAD/nwD/lQD/nwD/mQD/lQD/kgD/mwD/lwD/nAD/mQD/lwD/mgD/mAD/mwD/mQD/lwD/mAD/mgD/mQD/mAD/mgD/mAD/mgD/mQD/mAD/mQD/mQD/mgD/mQD/////mAD/////mQD/////mQD/////mgD/mQD/////mAD/////mQD/mQD/mQD/////mgD//////Pj/mQD/////mAD/////mQD/mQD/////mgD/////mQD/mAD/////mQD/////mQD/////mgD/////mQD/mAD/////mQD/////mQD/mQD/////mQD/////mQD/////mQD/////mQD/////mQD/mQD/////mQD/////mQD/tkf/ulT/mQD/////mQD/mgD/mQD/////mgD/0Yz/mQD/////mQD///8AAAABAQECAgIDAwMJCQkRERESEhIWFhYZGRkaGhocHBwvLy8xMTFERERISEhXV1doaGhqamqBgYGEhISioqKjo6Ourq64uLi+vr7g4ODn5+fr6+v19fX4+Pj5+fn8/Pz9/f3+/v7/mQD/mwT/ngz/piD/qSj/rjT/s0D/uVD/u1T/w2j/xGz/xnD/x3T/zID/z4j/0Yz/05D/1pj/2aD/26T/3qz/5b//7M//79f/8dv/8t///Pf//fv////VAUOcAAAAaHRSTlMABAgMEBQYHBwgJCgsMDQ4PEBDR0tPU1dbX2Nna29zc3d3e3t/f4OHh4uLj5GTk5eXmZubn5+jp6erq6+zs7e3u7u/v8PHx8vLz9PT19fb29/f4+Pl5+fr6+3t7e/v8PLz8/T29/f7+1UbC/wAAAU+SURBVGje7drtf9NEHADwa7eWZRXWrKxrwAwfKlonghiRbt2YcQM2B4bCHChKFdpmPj/hs+KzLooPoKKITp3k7zRLcsk195iUvvHD71WbNPnud7mn3A0AUjxm24+AXoe9EU/c1VNjv+1Fe6KHSNsO4vEdvSEGi79e/vGH7y5e/MYKom44oet6TdN2l8tjilKQ85LUl+j+6eHKXMOKES3DOKTrrlyWhYh8NRYQjbIAIR+yugs+kqpYVq+RVLVrw1J5iNa9YSkcY6vVeyRdR3/87feXf/tj7a/19X/DNrnuxD9ra2t/Xrt29cqVn57SZvQ5wzgXB1HDej/9+982M94wTfMd2376fu/Pk6QhuaAoqtNONrMRAxpVaQ9TeM30YsX8wrYfjdXOC9CoAfAs5fYbt/7MROMVp5++h1FfI99h9V3O+J28vYohKyYeG/30FMXom+2s0ZmWj9zhjlbw7zZ5yop34tgOohFpN9thaQ3ARD7274Ik9CYxES+miEanMu0bM+Fohd3HNhkIZmQXo31AGtb2EgBN76oPgxut+k/oE9x4GxrHaQaibPEPnOvzS+stUygC5HaqYVnb/GPbwtI6ZpvC8S402gzDahW9g7CPrziJiBvhE5lgGIHycND1TK0mQZgGVGb9b7L7RF6NixzpMHJ1fBpQRDqunN9IvuoikdwSabJRDBHpJKtR0JQm17AsHQDYTNJoJ/KRKLKHb8w6bQN+Pkjod+nxKV5aDCNA8O79PD+Rg1xj0p1m0hGnQ6EZL2OJ5MlG1RtXWIgTr7MSORkaDZbBQ8h12j91r6DBR5x4ntJKRI0AST3UjN776qXr8OMLqPGSf/CAqAHgA5Ocz0c6DcsKFUYiFENL4fMhyf020UYNRCEY/mhVIBvjpEmXBA8cR4xQCScS70PkTvfnxRbfAEf9o7eEhw6ERqCYnUNyMFoJGUAPuno0zoa/jyodo5WYQUZU9ApPIXbyggYRUTuv6VDQ0YpiVLBJ0j585q9Gr3IVzziPJDLaEn3l0jBExa9zlRU0kSbxd7TXOgwhXguVFYg8GMfAkPSiRVNM873wsccx8EyyVOVF83NoHI5lgL2RGSVVefI6MtWPZxAePE2pPtD88gNvFnyWvNIyCsQRqpJy++mvL/xCNoogDsJQwP62/XNcg4ywFDAe26AgDCWBEczqS0BMuS+BQenq6QoxGgWQDImhNPIgKSKscA0WIqiEhlz2Qqat3gyChAqSR5m2UojNVmIqaFklRLjKEvo8kiIcZSmH/ha207G4CFPpNGi9hwDCUCJGNwhViRp0ZN4/McRoS9lTJOO5HBBFWI2RqTRyQBip+SdGQTzlVBaII5rYUntUIRl0BDagXSCOQjSCoh+OnijBlQNeT5p9hmfQn+9m+BzTPGXTGY4BYFXHVtSDhc4RIKrQDLBMbXMwxyoQVE7005a1Yab4qTG4nJoVU05Qd/5gydfxUwNxttc2naEb4NZwYRaLGZjKgICSYexgTtJeGTfeymAq88m2QIPdjNOMKpSCr/LW4pZukDy8DbFiKMhC23ByZCcsEHKe6GZpfe/WTLLSgmvCd1PqXuRd+WhtXC3KUn+iRKiDhkKb7xjGrK5Pa25UykGoilKSZQmpjn27g/Eyxd8FjBcNY17X91X1hRZjPSKIka62ydGXCFbHIU3eGKTC2ZGv3QBjgTtiSDsXujSWJKF/w1CrRnJjflC4xmeGSmWtNmfErQuny+kkrbhfkmRZHlHcuC1sJ7s0rarPGcuoUNveD3oTGWlIlouynM+Cm3Ez/rfxH6STRnmdq/GgAAAAAElFTkSuQmCC
// ==/UserScript==
//
//######################################################################################################
//?>>>>>>>>>>>>>>>>>> since validator has been deprecated, those parts of this script have been disabled
//######################################################################################################
/*
  Please translate all the lines marked with ""
  Please DO NOT change ".en" properties. To override english text use "titleEN",
  "problemEN" and "solutionEN" properties (see an example below).

  See Settings->About->Available checks for complete list of checks and their params.

  Examples:

  Enable #170 "Lowercase street name" but allow lowercase "exit" and "to":
    "170.enabled": true,
    "170.params": {
        "regexp": "/^((exit|to) )?[a-z]/",
    "},

  Enable #130 "Custom check" to find a dot in street names, but allow dots at Ramps:
    "130.enabled": true,
    "130.params": {
        "titleEN": "Street name with a dot",
        "problemEN": "There is a dot in the street name (excluding Ramps)",
        "solutionEN": "Expand the abbreviation or remove the dot",
        "template": "${type}:${street}",
        "regexp": "D/^[^4][0-9]?:.*\\./",
    },
    *Note: use D at the beginning of RegExp to enable debugging on JS console.
    *Note: do not forget to escape backslashes in strings, i.e. use "\\" instead of "\".
*/
window.WME_Validator_United_States = {
  ".country": "New York State, USA",
  ".codeISO": "US",
  ".author": "<a href=http://www.waze.com/forum/ucp.php?i=pm&mode=compose&username=tythesly>tythesly</a>, <a href=http://www.waze.com/forum/ucp.php?i=pm&mode=compose&username=dsfargeg>dsfargeg</a>, and <a href=http://www.waze.com/forum/ucp.php?i=pm&mode=compose&username=PesachZ>PesachZ</a>",
  ".updated": "2018-07-20",
  ".link": "https://greasyfork.org/en/scripts/12793-wme-validator-localization-for-new-york",
  ".lng": "EN-US",
  "city.consider.en": "consider this city name:",
  "city.consider": "consider this city name:",
  "city.1.en": "city name is too short",
  "city.1": "city name is too short",
  "city.2.en": "expand the abbreviation",
  "city.2": "expand the abbreviation",
  "city.3.en": "complete short name",
  "city.3": "complete short name",
  "city.4.en": "complete city name",
  "city.4": "complete city name",
  "city.5.en": "correct letter case",
  "city.5": "correct letter case",
  "city.6.en": "check word order",
  "city.6": "check word order",
  "city.7.en": "check abbreviations",
  "city.7": "check abbreviations",
  "city.8a.en": "add county name",
  "city.8a": "add county name",
  "city.8r.en": "remove county name",
  "city.8r": "remove county name",
  "city.9.en": "check county name",
  "city.9": "check county name",
  "city.10a.en": "add a word",
  "city.10a": "add a word",
  "city.10r.en": "remove a word",
  "city.10r": "remove a word",
  "city.11.en": "add county code",
  "city.11": "add county code",
  "city.12.en": "identical names, but different city IDs",
  "city.12": "identical names, but different city IDs",
  "city.13a.en": "add a space",
  "city.13a": "add a space",
  "city.13r.en": "remove a space",
  "city.13r": "remove a space",
  "city.14.en": "check the number",
  "city.14": "check the number",
  "props.skipped.title.en": "The segment is not checked",
  "props.skipped.title": "The segment is not checked",
  "props.skipped.problem.en": "The segment is modified after 2014-05-01 AND locked for you, so Validator did not check it",
  "props.skipped.problem": "The segment is modified after 2014-05-01 AND locked for you, so Validator did not check it",
  "err.regexp.en": "Error parsing option for check #${n}:",
  "err.regexp": "Error parsing option for check #${n}:",
  "props.disabled.en": "WME Validator is disabled",
  "props.disabled": "WME Validator is disabled",
  "props.limit.title.en": "Too many issues reported",
  "props.limit.title": "Too many issues reported",
  "props.limit.problem.en": "There are too many issues reported, so some of them might not be shown",
  "props.limit.problem": "There are too many issues reported, so some of them might not be shown",
  "props.limit.solution.en": "Deselect the segment and stop scanning process. Then click red '✘' (Clear report) button",
  "props.limit.solution": "Deselect the segment and stop scanning process. Then click red '✘' (Clear report) button",
  "props.reports.en": "reports",
  "props.reports": "reports",
  "props.noneditable.en": "You cannot edit this segment",
  "props.noneditable": "You cannot edit this segment",
  "report.save.en": "Save this report",
  "report.save": "Save this report",
  "report.list.andUp.en": "and up",
  "report.list.andUp": "and up",
  "report.list.severity.en": "Severity:",
  "report.list.severity": "Severity:",
  "report.list.reportOnly.en": "only in report",
  "report.list.reportOnly": "only in report",
  "report.list.forEditors.en": "For editors level:",
  "report.list.forEditors": "For editors level:",
  "report.list.forCountries.en": "For countries:",
  "report.list.forCountries": "For countries:",
  "report.list.forStates.en": "For states:",
  "report.list.forStates": "For states:",
  "report.list.forCities.en": "For cities:",
  "report.list.forCities": "For cities:",
  "report.list.params.en": "Params to configure in localization pack:",
  "report.list.params": "Params to configure in localization pack:",
  "report.list.params.set.en": "Current configuration for ${country}:",
  "report.list.params.set": "Current configuration for ${country}:",
  "report.list.enabled.en": "${n} checks are enabled for",
  "report.list.enabled": "${n} checks are enabled for",
  "report.list.disabled.en": "${n} checks are disabled for",
  "report.list.disabled": "${n} checks are disabled for",
  "report.list.total.en": "There are ${n} checks available",
  "report.list.total": "There are ${n} checks available",
  "report.list.title.en": "Complete List of Checks for",
  "report.list.title": "Complete List of Checks for",
  "report.list.see.en": "See",
  "report.list.see": "See",
  "report.list.checks.en": "Settings->About->Available checks",
  "report.list.checks": "Settings->About->Available checks",
  "report.list.fallback.en": "Localization Fallback Rules:",
  "report.list.fallback": "Localization Fallback Rules:",
  "report.and.en": "and",
  "report.and": "and",
  "report.segments.en": "Total number of segments checked:",
  "report.segments": "Total number of segments checked:",
  "report.customs.en": "Custom checks matched (green/blue):",
  "report.customs": "Custom checks matched (green/blue):",
  "report.reported.en": "Reported",
  "report.reported": "Reported",
  "report.errors.en": "errors",
  "report.errors": "errors",
  "report.warnings.en": "warnings",
  "report.warnings": "warnings",
  "report.notes.en": "notes",
  "report.notes": "notes",
  "report.link.wiki.en": "wiki",
  "report.link.wiki": "wiki",
  "report.link.forum.en": "forum",
  "report.link.forum": "forum",
  "report.link.other.en": "link",
  "report.link.other": "link",
  "report.contents.en": "Contents:",
  "report.contents": "Contents:",
  "report.summary.en": "Summary",
  "report.summary": "Summary",
  "report.title.en": "WME Validator Report",
  "report.title": "WME Validator Report",
  "report.share.en": "to Share",
  "report.share": "to Share",
  "report.generated.by.en": "generated by",
  "report.generated.by": "generated by",
  "report.generated.on.en": "on",
  "report.generated.on": "on",
  "report.source.en": "Report source:",
  "report.source": "Report source:",
  "report.filter.duplicate.en": "duplicate segments",
  "report.filter.duplicate": "duplicate segments",
  "report.filter.streets.en": "Streets and Service Roads",
  "report.filter.streets": "Streets and Service Roads",
  "report.filter.other.en": "Other drivable and Non-drivable",
  "report.filter.other": "Other drivable and Non-drivable",
  "report.filter.noneditable.en": "non-editable segments",
  "report.filter.noneditable": "non-editable segments",
  "report.filter.notes.en": "notes",
  "report.filter.notes": "notes",
  "report.filter.title.en": "Filter:",
  "report.filter.title": "Filter:",
  "report.filter.excluded.en": "are excluded from this report.",
  "report.filter.excluded": "are excluded from this report.",
  "report.search.updated.by.en": "updated by",
  "report.search.updated.by": "updated by",
  "report.search.updated.since.en": "updated since",
  "report.search.updated.since": "updated since",
  "report.search.city.en": "from",
  "report.search.city": "from",
  "report.search.reported.en": "reported as",
  "report.search.reported": "reported as",
  "report.search.title.en": "Search:",
  "report.search.title": "Search:",
  "report.search.only.en": "only segments",
  "report.search.only": "only segments",
  "report.search.included.en": "are included into the report.",
  "report.search.included": "are included into the report.",
  "report.beta.warning.en": "WME Beta Warning!",
  "report.beta.warning": "WME Beta Warning!",
  "report.beta.text.en": "This report is generated in beta WME with beta permalinks.",
  "report.beta.text": "This report is generated in beta WME with beta permalinks.",
  "report.beta.share.en": "Please do not share those permalinks!",
  "report.beta.share": "Please do not share those permalinks!",
  "report.size.warning.en": "<b>Warning!</b><br>The report is ${n} characters long so <b>it will not fit</b> into a single forum or private message.\n<br>Please add <b>more filters</b> to reduce the size of the report.",
  "report.size.warning": "<b>Warning!</b><br>The report is ${n} characters long so <b>it will not fit</b> into a single forum or private message.\n<br>Please add <b>more filters</b> to reduce the size of the report.",
  "report.note.limit.en": "* Note: there were too many issues reported, so some of them are not counted in the summary.",
  "report.note.limit": "* Note: there were too many issues reported, so some of them are not counted in the summary.",
  "report.forum.en": "To motivate further development please leave your comment on the",
  "report.forum": "To motivate further development please leave your comment on the",
  "report.forum.link.en": "Waze forum thread.",
  "report.forum.link": "Waze forum thread.",
  "report.thanks.en": "Thank you for using WME Validator!",
  "report.thanks": "Thank you for using WME Validator!",
  "msg.limit.segments.en": "There are too many segments.\n\nClick 'Show report' to review the report, then\n",
  "msg.limit.segments": "There are too many segments.\n\nClick 'Show report' to review the report, then\n",
  "msg.limit.segments.continue.en": "click '▶' (Play) to continue.",
  "msg.limit.segments.continue": "click '▶' (Play) to continue.",
  "msg.limit.segments.clear.en": "click '✘' (Clear) to clear the report.",
  "msg.limit.segments.clear": "click '✘' (Clear) to clear the report.",
  "msg.pan.text.en": "Pan around to validate the map",
  "msg.pan.text": "Pan around to validate the map",
  "msg.zoomout.text.en": "Zoom out to start WME Validator",
  "msg.zoomout.text": "Zoom out to start WME Validator",
  "msg.click.text.en": "Click '▶' (Play) to validate visible map area",
  "msg.click.text": "Click '▶' (Play) to validate visible map area",
  "msg.autopaused.en": "autopaused",
  "msg.autopaused": "autopaused",
  "msg.autopaused.text.en": "Auto paused! Click '▶' (Play) to continue.",
  "msg.autopaused.text": "Auto paused! Click '▶' (Play) to continue.",
  "msg.autopaused.tip.en": "WME Validator automatically paused on map drag or window size change",
  "msg.autopaused.tip": "WME Validator automatically paused on map drag or window size change",
  "msg.finished.text.en": "Click <b>'Show report'</b> to review map issues",
  "msg.finished.text": "Click <b>'Show report'</b> to review map issues",
  "msg.finished.tip.en": "Click '✉' (Share) button to post report on a\nforum or in a private message",
  "msg.finished.tip": "Click '✉' (Share) button to post report on a\nforum or in a private message",
  "msg.noissues.text.en": "Finished! No issues found!",
  "msg.noissues.text": "Finished! No issues found!",
  "msg.noissues.tip.en": "Try to uncheck some filter options or start WME Validator over another map area!",
  "msg.noissues.tip": "Try to uncheck some filter options or start WME Validator over another map area!",
  "msg.scanning.text.en": "Scanning! Finishing in ~ ${n} min",
  "msg.scanning.text": "Scanning! Finishing in ~ ${n} min",
  "msg.scanning.text.soon.en": "Scanning! Finishing in a minute!",
  "msg.scanning.text.soon": "Scanning! Finishing in a minute!",
  "msg.scanning.tip.en": "Click 'Pause' button to pause or '■' (Stop) to stop",
  "msg.scanning.tip": "Click 'Pause' button to pause or '■' (Stop) to stop",
  "msg.starting.text.en": "Starting! Layers are off to scan faster!",
  "msg.starting.text": "Starting! Layers are off to scan faster!",
  "msg.starting.tip.en": "Use 'Pause' button to pause or '■' button to stop",
  "msg.starting.tip": "Use 'Pause' button to pause or '■' button to stop",
  "msg.paused.text.en": "On pause! Click '▶' (Play) button to continue.",
  "msg.paused.text": "On pause! Click '▶' (Play) button to continue.",
  "msg.paused.tip.en": "To view the report click 'Show report' button (if available)",
  "msg.paused.tip": "To view the report click 'Show report' button (if available)",
  "msg.continuing.text.en": "Continuing!",
  "msg.continuing.text": "Continuing!",
  "msg.continuing.tip.en": "WME Validator will continue from the location it was paused",
  "msg.continuing.tip": "WME Validator will continue from the location it was paused",
  "msg.settings.text.en": "Click <b>'Back'</b> to return to main view",
  "msg.settings.text": "Click <b>'Back'</b> to return to main view",
  "msg.settings.tip.en": "Click 'Reset defaults' button to reset all settings in one click!",
  "msg.settings.tip": "Click 'Reset defaults' button to reset all settings in one click!",
  "msg.reset.text.en": "All filter options and settings have been reset to their defaults",
  "msg.reset.text": "All filter options and settings have been reset to their defaults",
  "msg.reset.tip.en": "Click 'Back' button to return to main view",
  "msg.reset.tip": "Click 'Back' button to return to main view",
  "msg.textarea.pack.en": "This is a Greasemonkey/Tampermonkey script. You can copy and paste the text below into a <b>new .user.js file</b><br>or <b>paste it directly</b> into the Greasemonkey/Tampermonkey",
  "msg.textarea.pack": "This is a Greasemonkey/Tampermonkey script. You can copy and paste the text below into a <b>new .user.js file</b><br>or <b>paste it directly</b> into the Greasemonkey/Tampermonkey",
  "msg.textarea.en": "Please copy the text below and then paste it into your forum post or private message",
  "msg.textarea": "Please copy the text below and then paste it into your forum post or private message",
  "noaccess.text.en": "<b>Sorry,</b><br>You cannot use WME Validator over here.<br>Please check <a target='_blank' href='https://www.waze.com/forum/viewtopic.php?t=76488'>the forum thread</a><br>for more information.",
  "noaccess.text": "<b>Sorry,</b><br>You cannot use WME Validator over here.<br>Please check <a target='_blank' href='https://www.waze.com/forum/viewtopic.php?t=76488'>the forum thread</a><br>for more information.",
  "noaccess.tip.en": "Please check the forum thread for more information!",
  "noaccess.tip": "Please check the forum thread for more information!",
  "tab.switch.tip.on.en": "Click to switch highlighting on (Alt+V)",
  "tab.switch.tip.on": "Click to switch highlighting on (Alt+V)",
  "tab.switch.tip.off.en": "Click to switch highlighting off (Alt+V)",
  "tab.switch.tip.off": "Click to switch highlighting off (Alt+V)",
  "tab.filter.text.en": "filter",
  "tab.filter.text": "filter",
  "tab.filter.tip.en": "Options to filter the report and highlighted segments",
  "tab.filter.tip": "Options to filter the report and highlighted segments",
  "tab.search.text.en": "search",
  "tab.search.text": "search",
  "tab.search.tip.en": "Advanced filter options to include only specific segments",
  "tab.search.tip": "Advanced filter options to include only specific segments",
  "tab.help.text.en": "help",
  "tab.help.text": "help",
  "tab.help.tip.en": "Need help?",
  "tab.help.tip": "Need help?",
  "filter.noneditables.text.en": "Exclude <b>non-editable</b> segments",
  "filter.noneditables.text": "Exclude <b>non-editable</b> segments",
  "filter.noneditables.tip.en": "Do not report locked segments or\nsegments outside of your editable areas",
  "filter.noneditables.tip": "Do not report locked segments or\nsegments outside of your editable areas",
  "filter.duplicates.text.en": "Exclude <b>duplicate</b> segments",
  "filter.duplicates.text": "Exclude <b>duplicate</b> segments",
  "filter.duplicates.tip.en": "Do not show the same segment in different\nparts of report\n* Note: this option DOES NOT affect highlighting",
  "filter.duplicates.tip": "Do not show the same segment in different\nparts of report\n* Note: this option DOES NOT affect highlighting",
  "filter.streets.text.en": "Exclude <b>Streets and Service Roads</b>",
  "filter.streets.text": "Exclude <b>Streets and Service Roads</b>",
  "filter.streets.tip.en": "Do not report Streets and Service Roads",
  "filter.streets.tip": "Do not report Streets and Service Roads",
  "filter.other.text.en": "Exclude <b>Other drivable and Non-drivable</b>",
  "filter.other.text": "Exclude <b>Other drivable and Non-drivable</b>",
  "filter.other.tip.en": "Do not report Dirt, Parking Lot, Private Roads\nand non-drivable segments",
  "filter.other.tip": "Do not report Dirt, Parking Lot, Private Roads\nand non-drivable segments",
  "filter.notes.text.en": "Exclude <b>notes</b>",
  "filter.notes.text": "Exclude <b>notes</b>",
  "filter.notes.tip.en": "Report only warnings and errors",
  "filter.notes.tip": "Report only warnings and errors",
  "search.youredits.text.en": "Include <b>only your edits</b>",
  "search.youredits.text": "Include <b>only your edits</b>",
  "search.youredits.tip.en": "Include only segments edited by you",
  "search.youredits.tip": "Include only segments edited by you",
  "search.updatedby.text.en": "<b>Updated by*:</b>",
  "search.updatedby.text": "<b>Updated by*:</b>",
  "search.updatedby.tip.en": "Include only segments updated by the specified editor\n* Note: this option is available for country managers only\nThis field supports:\n - lists: me, otherEditor\n - wildcards: world*\n - negation: !me, *\n* Note: you may use 'me' to match yourself",
  "search.updatedby.tip": "Include only segments updated by the specified editor\n* Note: this option is available for country managers only\nThis field supports:\n - lists: me, otherEditor\n - wildcards: world*\n - negation: !me, *\n* Note: you may use 'me' to match yourself",
  "search.updatedby.example.en": "Example: me",
  "search.updatedby.example": "Example: me",
  "search.updatedsince.text.en": "<b>Updated since:</b>",
  "search.updatedsince.text": "<b>Updated since:</b>",
  "search.updatedsince.tip.en": "Include only segments edited since the date specified\nFirefox date format: YYYY-MM-DD",
  "search.updatedsince.tip": "Include only segments edited since the date specified\nFirefox date format: YYYY-MM-DD",
  "search.updatedsince.example.en": "YYYY-MM-DD",
  "search.updatedsince.example": "YYYY-MM-DD",
  "search.city.text.en": "<b>City name:</b>",
  "search.city.text": "<b>City name:</b>",
  "search.city.tip.en": "Include only segments with specified city name\nThis field supports:\n - lists: Paris, Meudon\n - wildcards: Greater * Area\n - negation: !Paris, *",
  "search.city.tip": "Include only segments with specified city name\nThis field supports:\n - lists: Paris, Meudon\n - wildcards: Greater * Area\n - negation: !Paris, *",
  "search.city.example.en": "Example: !Paris, *",
  "search.city.example": "Example: !Paris, *",
  "search.checks.text.en": "<b>Reported as:</b>",
  "search.checks.text": "<b>Reported as:</b>",
  "search.checks.tip.en": "Include only segments reported as specified\nThis field matches:\n - severities: errors\n - check names: New road\n - check IDs: 200\nThis field supports:\n - lists: 36, 37\n - wildcards: *roundabout*\n - negation: !unconfirmed*, *",
  "search.checks.tip": "Include only segments reported as specified\nThis field matches:\n - severities: errors\n - check names: New road\n - check IDs: 200\nThis field supports:\n - lists: 36, 37\n - wildcards: *roundabout*\n - negation: !unconfirmed*, *",
  "search.checks.example.en": "Example: reverse*",
  "search.checks.example": "Example: reverse*",
  "help.text.en": "<b>Help Topics:</b><br><a target=\"_blank\" href=\"https://www.waze.com/forum/viewtopic.php?t=76488&p=666476#p666476\">F.A.Q.</a><br><a target=\"_blank\" href=\"https://www.waze.com/forum/viewtopic.php?t=76488\">Ask your question on the forum</a><br><a target=\"_blank\" href=\"https://www.waze.com/forum/viewtopic.php?t=76488&p=661300#p661185\">How to adjust Validator for your country</a><br><a target=\"_blank\" href=\"https://www.waze.com/forum/viewtopic.php?t=76488&p=663286#p663286\">About the \"Might be Incorrect City Name\"</a>",
  "help.text": "<b>Help Topics:</b><br><a target=\"_blank\" href=\"https://www.waze.com/forum/viewtopic.php?t=76488&p=666476#p666476\">F.A.Q.</a><br><a target=\"_blank\" href=\"https://www.waze.com/forum/viewtopic.php?t=76488\">Ask your question on the forum</a><br><a target=\"_blank\" href=\"https://www.waze.com/forum/viewtopic.php?t=76488&p=661300#p661185\">How to adjust Validator for your country</a><br><a target=\"_blank\" href=\"https://www.waze.com/forum/viewtopic.php?t=76488&p=663286#p663286\">About the \"Might be Incorrect City Name\"</a>",
  "help.tip.en": "Open in a new browser tab",
  "help.tip": "Open in a new browser tab",
  "button.scan.tip.en": "Start scanning current map area\n* Note: this might take few minutes",
  "button.scan.tip": "Start scanning current map area\n* Note: this might take few minutes",
  "button.scan.tip.NA.en": "Zoom out to start scanning current map area",
  "button.scan.tip.NA": "Zoom out to start scanning current map area",
  "button.pause.tip.en": "Pause scanning",
  "button.pause.tip": "Pause scanning",
  "button.continue.tip.en": "Continue scanning the map area",
  "button.continue.tip": "Continue scanning the map area",
  "button.stop.tip.en": "Stop scanning and return to the start position",
  "button.stop.tip": "Stop scanning and return to the start position",
  "button.clear.tip.en": "Clear report and segment cache",
  "button.clear.tip": "Clear report and segment cache",
  "button.clear.tip.red.en": "There are too many reported segments:\n 1. Click 'Show report' to generate the report.\n 2. Click this button to clear the report and start over.",
  "button.clear.tip.red": "There are too many reported segments:\n 1. Click 'Show report' to generate the report.\n 2. Click this button to clear the report and start over.",
  "button.report.text.en": "Show report",
  "button.report.text": "Show report",
  "button.report.tip.en": "Apply the filter and generate HTML report in a new tab",
  "button.report.tip": "Apply the filter and generate HTML report in a new tab",
  "button.BBreport.tip.en": "Share the report on Waze forum or in a private message",
  "button.BBreport.tip": "Share the report on Waze forum or in a private message",
  "button.settings.tip.en": "Configure settings",
  "button.settings.tip": "Configure settings",
  "tab.custom.text.en": "custom",
  "tab.custom.text": "custom",
  "tab.custom.tip.en": "User-defined custom checks settings",
  "tab.custom.tip": "User-defined custom checks settings",
  "tab.settings.text.en": "Settings",
  "tab.settings.text": "Settings",
  "tab.scanner.text.en": "scanner",
  "tab.scanner.text": "scanner",
  "tab.scanner.tip.en": "Map scanner settings",
  "tab.scanner.tip": "Map scanner settings",
  "tab.about.text.en": "about</span>",
  "tab.about.text": "about</span>",
  "tab.about.tip.en": "About WME Validator",
  "tab.about.tip": "About WME Validator",
  "scanner.sounds.text.en": "Enable sounds",
  "scanner.sounds.text": "Enable sounds",
  "scanner.sounds.tip.en": "Bleeps and the bloops while scanning",
  "scanner.sounds.tip": "Bleeps and the bloops while scanning",
  "scanner.sounds.NA.en": "Your browser does not support AudioContext",
  "scanner.sounds.NA": "Your browser does not support AudioContext",
  "scanner.highlight.text.en": "Highlight issues on the map",
  "scanner.highlight.text": "Highlight issues on the map",
  "scanner.highlight.tip.en": "Highlight reported issues on the map",
  "scanner.highlight.tip": "Highlight reported issues on the map",
  "scanner.slow.text.en": "Enable \"slow\" checks",
  "scanner.slow.text": "Enable \"slow\" checks",
  "scanner.slow.tip.en": "Enables deep map analysis\n* Note: this option might slow down the scanning process",
  "scanner.slow.tip": "Enables deep map analysis\n* Note: this option might slow down the scanning process",
  "scanner.ext.text.en": "Report external highlights",
  "scanner.ext.text": "Report external highlights",
  "scanner.ext.tip.en": "Report segments highlighted by WME Toolbox or WME Color Highlights",
  "scanner.ext.tip": "Report segments highlighted by WME Toolbox or WME Color Highlights",
  "custom.template.text.en": "<a target='_blank' href='https://www.waze.com/forum/viewtopic.php?t=76488&p=749456#p749456'>Custom template</a>",
  "custom.template.text": "<a target='_blank' href='https://www.waze.com/forum/viewtopic.php?t=76488&p=749456#p749456'>Custom template</a>",
  "custom.template.tip.en": "User-defined custom check expandable template.\n\nYou may use the following expandable variables:\nAddress:\n  ${country}, ${state}, ${city}, ${street},\n  ${altCity[index or delimeter]}, ${altStreet[index or delimeter]}\nSegment properties:\n  ${type}, ${typeRank}, ${toll}, ${direction}, ${elevation}, ${lock},\n  ${length}, ${ID}\nHelpers:\n  ${drivable}, ${roundabout}, ${hasHNs},\n  ${Uturn}, ${deadEnd}, ${softTurns},\n  ${deadEndA}, ${partialA},\n  ${deadEndB}, ${partialB}\nConnectivity:\n  ${segmentsA}, ${inA}, ${outA}, ${UturnA},\n  ${segmentsB}, ${inB}, ${outB}, ${UturnB}",
  "custom.template.tip": "User-defined custom check expandable template.\n\nYou may use the following expandable variables:\nAddress:\n  ${country}, ${state}, ${city}, ${street},\n  ${altCity[index or delimeter]}, ${altStreet[index or delimeter]}\nSegment properties:\n  ${type}, ${typeRank}, ${toll}, ${direction}, ${elevation}, ${lock},\n  ${length}, ${ID}\nHelpers:\n  ${drivable}, ${roundabout}, ${hasHNs},\n  ${Uturn}, ${deadEnd}, ${softTurns},\n  ${deadEndA}, ${partialA},\n  ${deadEndB}, ${partialB}\nConnectivity:\n  ${segmentsA}, ${inA}, ${outA}, ${UturnA},\n  ${segmentsB}, ${inB}, ${outB}, ${UturnB}",
  "custom.template.example.en": "Example: ${street}",
  "custom.template.example": "Example: ${street}",
  "custom.regexp.text.en": "Custom <a target='_blank' href='https://www.waze.com/forum/viewtopic.php?t=76488&p=749456#p749456'>RegExp</a>",
  "custom.regexp.text": "Custom <a target='_blank' href='https://www.waze.com/forum/viewtopic.php?t=76488&p=749456#p749456'>RegExp</a>",
  "custom.regexp.tip.en": "User-defined custom check regular expression to match the template.\n\nCase-insensitive match: /regexp/i\nNegation (do not match): !/regexp/\nLog debug information on console: D/regexp/",
  "custom.regexp.tip": "User-defined custom check regular expression to match the template.\n\nCase-insensitive match: /regexp/i\nNegation (do not match): !/regexp/\nLog debug information on console: D/regexp/",
  "custom.regexp.example.en": "Example: !/.+/",
  "custom.regexp.example": "Example: !/.+/",
  "about.tip.en": "Open link in a new tab",
  "about.tip": "Open link in a new tab",
  "button.reset.text.en": "Reset defaults",
  "button.reset.text": "Reset defaults",
  "button.reset.tip.en": "Revert filter options and settings to their defaults",
  "button.reset.tip": "Revert filter options and settings to their defaults",
  "button.list.text.en": "Available checks...",
  "button.list.text": "Available checks...",
  "button.list.tip.en": "Show a list of checks available in WME Validator",
  "button.list.tip": "Show a list of checks available in WME Validator",
  "button.wizard.tip.en": "Create localization package",
  "button.wizard.tip": "Create localization package",
  "button.back.text.en": "Back",
  "button.back.text": "Back",
  "button.back.tip.en": "Close settings and return to main view",
  "button.back.tip": "Close settings and return to main view",
  "1.title.en": "WME Toolbox: Roundabout which may cause issues",
  "1.title": "WME Toolbox: Roundabout which may cause issues",
  "1.problem.en": "Junction IDs of the roundabout segments are not consecutive",
  "1.problem": "Junction IDs of the roundabout segments are not consecutive",
  "1.solution.en": "Redo the roundabout",
  "1.solution": "Redo the roundabout",
  "2.title.en": "WME Toolbox: Simple segment",
  "2.title": "WME Toolbox: Simple segment",
  "2.problem.en": "The segment has unneeded geometry nodes",
  "2.problem": "The segment has unneeded geometry nodes",
  "2.solution.en": "Simplify segment geometry by hovering mouse pointer and pressing \"d\" key",
  "2.solution": "Simplify segment geometry by hovering mouse pointer and pressing \"d\" key",
  "3.title.en": "WME Toolbox: Lvl 2 lock",
  "3.title": "WME Toolbox: Lvl 2 lock",
  "3.problem.en": "The segment is highlighted by WME Toolbox. It is not a problem",
  "3.problem": "The segment is highlighted by WME Toolbox. It is not a problem",
  "4.title.en": "WME Toolbox: Lvl 3 lock",
  "4.title": "WME Toolbox: Lvl 3 lock",
  "4.problem.en": "The segment is highlighted by WME Toolbox. It is not a problem",
  "4.problem": "The segment is highlighted by WME Toolbox. It is not a problem",
  "5.title.en": "WME Toolbox: Lvl 4 lock",
  "5.title": "WME Toolbox: Lvl 4 lock",
  "5.problem.en": "The segment is highlighted by WME Toolbox. It is not a problem",
  "5.problem": "The segment is highlighted by WME Toolbox. It is not a problem",
  "6.title.en": "WME Toolbox: Lvl 5 lock",
  "6.title": "WME Toolbox: Lvl 5 lock",
  "6.problem.en": "The segment is highlighted by WME Toolbox. It is not a problem",
  "6.problem": "The segment is highlighted by WME Toolbox. It is not a problem",
  "7.title.en": "WME Toolbox: Lvl 6 lock",
  "7.title": "WME Toolbox: Lvl 6 lock",
  "7.problem.en": "The segment is highlighted by WME Toolbox. It is not a problem",
  "7.problem": "The segment is highlighted by WME Toolbox. It is not a problem",
  "8.title.en": "WME Toolbox: House numbers",
  "8.title": "WME Toolbox: House numbers",
  "8.problem.en": "The segment is highlighted by WME Toolbox. It is not a problem",
  "8.problem": "The segment is highlighted by WME Toolbox. It is not a problem",
  "9.title.en": "WME Toolbox: Segment with time restrictions",
  "9.title": "WME Toolbox: Segment with time restrictions",
  "9.problem.en": "The segment is highlighted by WME Toolbox. It is not a problem",
  "9.problem": "The segment is highlighted by WME Toolbox. It is not a problem",
  "13.title.en": "WME Color Highlights: Editor lock",
  "13.title": "WME Color Highlights: Editor lock",
  "13.problem.en": "The segment is highlighted by WME Color Highlights. It is not a problem",
  "13.problem": "The segment is highlighted by WME Color Highlights. It is not a problem",
  "14.title.en": "WME Color Highlights: Toll road / One way road",
  "14.title": "WME Color Highlights: Toll road / One way road",
  "14.problem.en": "The segment is highlighted by WME Color Highlights. It is not a problem",
  "14.problem": "The segment is highlighted by WME Color Highlights. It is not a problem",
  "15.title.en": "WME Color Highlights: Recently edited",
  "15.title": "WME Color Highlights: Recently edited",
  "15.problem.en": "The segment is highlighted by WME Color Highlights. It is not a problem",
  "15.problem": "The segment is highlighted by WME Color Highlights. It is not a problem",
  "16.title.en": "WME Color Highlights: Road rank",
  "16.title": "WME Color Highlights: Road rank",
  "16.problem.en": "The segment is highlighted by WME Color Highlights. It is not a problem",
  "16.problem": "The segment is highlighted by WME Color Highlights. It is not a problem",
  "17.title.en": "WME Color Highlights: No city",
  "17.title": "WME Color Highlights: No city",
  "17.problem.en": "The segment is highlighted by WME Color Highlights. It is not a problem",
  "17.problem": "The segment is highlighted by WME Color Highlights. It is not a problem",
  "18.title.en": "WME Color Highlights: Time restriction / Highlighted road type",
  "18.title": "WME Color Highlights: Time restriction / Highlighted road type",
  "18.problem.en": "The segment is highlighted by WME Color Highlights. It is not a problem",
  "18.problem": "The segment is highlighted by WME Color Highlights. It is not a problem",
  "19.title.en": "WME Color Highlights: No name",
  "19.title": "WME Color Highlights: No name",
  "19.problem.en": "The segment is highlighted by WME Color Highlights. It is not a problem",
  "19.problem": "The segment is highlighted by WME Color Highlights. It is not a problem",
  "20.title.en": "WME Color Highlights: Filter by city",
  "20.title": "WME Color Highlights: Filter by city",
  "20.problem.en": "The segment is highlighted by WME Color Highlights. It is not a problem",
  "20.problem": "The segment is highlighted by WME Color Highlights. It is not a problem",
  "21.title.en": "WME Color Highlights: Filter by city (alt. city)",
  "21.title": "WME Color Highlights: Filter by city (alt. city)",
  "21.problem.en": "The segment is highlighted by WME Color Highlights. It is not a problem",
  "21.problem": "The segment is highlighted by WME Color Highlights. It is not a problem",
  "22.title.en": "WME Color Highlights: Filter by editor",
  "22.title": "WME Color Highlights: Filter by editor",
  "22.problem.en": "The segment is highlighted by WME Color Highlights. It is not a problem",
  "22.problem": "The segment is highlighted by WME Color Highlights. It is not a problem",
  "23.title.en": "Unconfirmed road",
  "23.title": "Unconfirmed road",
  "23.problem.en": "Each segment must minimally have the Country and State information",
  "23.problem": "Each segment must minimally have the Country and State information",
  "23.solution.en": "Confirm the road by updating its details",
  "23.solution": "Confirm the road by updating its details",
  "24.title.en": "Might be incorrect city name (only available in the report)",
  "24.title": "Might be incorrect city name (only available in the report)",
  "24.problem.en": "The segment might have incorrect city name",
  "24.problem": "The segment might have incorrect city name",
  "24.solution.en": "Consider suggested city name and use this form to rename the city",
  "24.solution": "Consider suggested city name and use this form to rename the city",
  "25.title.en": "Unknown direction of drivable road",
  "25.title": "Unknown direction of drivable road",
  "25.problem.en": "'Unknown' road direction will not prevent routing on the road",
  "25.problem": "'Unknown' road direction will not prevent routing on the road",
  "25.solution.en": "Set the road direction",
  "25.solution": "Set the road direction",
  "27.enabled": true,
  "27.title.en": "City name on Railroad",
  "27.title": "City name on Railroad",
  "27.problem.en": "City name on the Railroad may cause a city smudge",
  "27.problem": "City name on the Railroad may cause a city smudge",
  "27.solution.en": "In the address properties check the 'None' box next to the city name and then click 'Apply'",
  "27.solution": "In the address properties check the 'None' box next to the city name and then click 'Apply'",
  "28.title.en": "Street name on two-way Ramp",
  "28.title": "Street name on two-way Ramp",
  "28.problem.en": "If Ramp is unnamed, the name of a subsequent road will propagate backwards",
  "28.problem": "If Ramp is unnamed, the name of a subsequent road will propagate backwards",
  "28.solution.en": "In the address properties check the 'None' box next to the street name and then click 'Apply'",
  "28.solution": "In the address properties check the 'None' box next to the street name and then click 'Apply'",
  "29.title.en": "Street name on roundabout",
  "29.title": "Street name on roundabout",
  "29.problem.en": "In Waze, we do not name roundabout segments",
  "29.problem": "In Waze, we do not name roundabout segments",
  "29.solution.en": "In the address properties check the 'None' box next to the street name, click 'Apply' and then add 'Junction' landmark to name the roundabout",
  "29.solution": "In the address properties check the 'None' box next to the street name, click 'Apply' and then add 'Junction' landmark to name the roundabout",
  "34.title.en": "Empty alternate street",
  "34.title": "Empty alternate street",
  "34.problem.en": "Alternate street name is empty",
  "34.problem": "Alternate street name is empty",
  "34.solution.en": "Remove empty alternate street name",
  "34.solution": "Remove empty alternate street name",
  "35.title.en": "Unterminated drivable road",
  "35.title": "Unterminated drivable road",
  "35.problem.en": "Waze will not route from the unterminated segment",
  "35.problem": "Waze will not route from the unterminated segment",
  "35.solution.en": "Move the segment a bit so the terminating node will be added automatically",
  "35.solution": "Move the segment a bit so the terminating node will be added automatically",
  "38.title.en": "Expired segment restriction (slow)",
  "38.title": "Expired segment restriction (slow)",
  "38.problem.en": "The segment has an expired restriction",
  "38.problem": "The segment has an expired restriction",
  "38.solution.en": "Click 'Edit restrictions' and delete the expired restriction",
  "38.solution": "Click 'Edit restrictions' and delete the expired restriction",
  "39.title.en": "Expired turn restriction (slow)",
  "39.title": "Expired turn restriction (slow)",
  "39.problem.en": "The segment has a turn with an expired restriction",
  "39.problem": "The segment has a turn with an expired restriction",
  "39.solution.en": "Click clock icon next to the yellow arrow and delete the expired restriction",
  "39.solution": "Click clock icon next to the yellow arrow and delete the expired restriction",
  "41.title.en": "Node A: Reverse connectivity of drivable road",
  "41.title": "Node A: Reverse connectivity of drivable road",
  "41.problem.en": "There is a turn which goes against the directionality of the segment at node A",
  "41.problem": "There is a turn which goes against the directionality of the segment at node A",
  "41.solution.en": "Make the segment 'Two-way', restrict all the turns at node A and then make the segment 'One way (A→B)' again",
  "41.solution": "Make the segment 'Two-way', restrict all the turns at node A and then make the segment 'One way (A→B)' again",
  "42.title.en": "Node B: Reverse connectivity of drivable road",
  "42.title": "Node B: Reverse connectivity of drivable road",
  "42.problem.en": "There is a turn which goes against the directionality of the segment at node B",
  "42.problem": "There is a turn which goes against the directionality of the segment at node B",
  "42.solution.en": "Make the segment 'Two-way', restrict all the turns at node B and then make the segment 'One way (B→A)' again",
  "42.solution": "Make the segment 'Two-way', restrict all the turns at node B and then make the segment 'One way (B→A)' again",
  "43.title.en": "Self connectivity",
  "43.title": "Self connectivity",
  "43.problem.en": "The segment is connected back to itself",
  "43.problem": "The segment is connected back to itself",
  "43.solution.en": "Split the segment into THREE pieces",
  "43.solution": "Split the segment into THREE pieces",
  "46.title.en": "Node A: No inward connectivity of drivable road (slow)",
  "46.title": "Node A: No inward connectivity of drivable road (slow)",
  "46.problem.en": "The drivable non-private segment has no single inward turn enabled at node A",
  "46.problem": "The drivable non-private segment has no single inward turn enabled at node A",
  "46.solution.en": "Select an adjacent segment and enable at least one turn to the segment at node A",
  "46.solution": "Select an adjacent segment and enable at least one turn to the segment at node A",
  "47.title.en": "Node B: No inward connectivity of drivable road (slow)",
  "47.title": "Node B: No inward connectivity of drivable road (slow)",
  "47.problem.en": "The drivable non-private segment has no single inward turn enabled at node B",
  "47.problem": "The drivable non-private segment has no single inward turn enabled at node B",
  "47.solution.en": "Select an adjacent segment and enable at least one turn to the segment at node B",
  "47.solution": "Select an adjacent segment and enable at least one turn to the segment at node B",
  "48.title.en": "Two-way drivable roundabout segment",
  "48.title": "Two-way drivable roundabout segment",
  "48.problem.en": "The drivable roundabout segment is bidirectional",
  "48.problem": "The drivable roundabout segment is bidirectional",
  "48.solution.en": "Redo the roundabout",
  "48.solution": "Redo the roundabout",
  "78.title.en": "Same endpoints drivable segments (slow)",
  "78.title": "Same endpoints drivable segments (slow)",
  "78.problem.en": "Two drivable segments share the same two endpoints",
  "78.problem": "Two drivable segments share the same two endpoints",
  "78.solution.en": "Split the segment. You might also remove one of the segments if they are identical",
  "78.solution": "Split the segment. You might also remove one of the segments if they are identical",
  "87.title.en": "Node A: Multiple outgoing segments at roundabout",
  "87.title": "Node A: Multiple outgoing segments at roundabout",
  "87.problem.en": "The drivable roundabout node A has more than one outgoing segment connected",
  "87.problem": "The drivable roundabout node A has more than one outgoing segment connected",
  "87.solution.en": "Redo the roundabout",
  "87.solution": "Redo the roundabout",
  "90.enabled": true,
  "90.title.en": "Two-way Freeway segment",
  "90.title": "Two-way Freeway segment",
  "90.problem.en": "Most of the Freeways are split into two one-way roads, so this two-way segment might be a mistake",
  "90.problem": "Most of the Freeways are split into two one-way roads, so this two-way segment might be a mistake",
  "90.solution.en": "Check Freeway direction",
  "90.solution": "Check Freeway direction",
  "99.title.en": "U-turn at roundabout entrance (slow)",
  "99.title": "U-turn at roundabout entrance (slow)",
  "99.problem.en": "The roundabout entrance segment has a U-turn enabled",
  "99.problem": "The roundabout entrance segment has a U-turn enabled",
  "99.solution.en": "Disable U-turn",
  "99.solution": "Disable U-turn",
  "101.title.en": "Closed road (only available in the report)",
  "101.title": "Closed road (only available in the report)",
  "101.problem.en": "The segment is marked as closed",
  "101.problem": "The segment is marked as closed",
  "101.solution.en": "If the construction is done, restore the segment connectivity and remove the suffix",
  "101.solution": "If the construction is done, restore the segment connectivity and remove the suffix",
  "102.title.en": "Node A: No outward connectivity of drivable road (slow)",
  "102.title": "Node A: No outward connectivity of drivable road (slow)",
  "102.problem.en": "The drivable segment has no single outward turn enabled at node A",
  "102.problem": "The drivable segment has no single outward turn enabled at node A",
  "102.solution.en": "Enable at least one outward turn from the segment at node A",
  "102.solution": "Enable at least one outward turn from the segment at node A",
  "103.title.en": "Node B: No outward connectivity of drivable road (slow)",
  "103.title": "Node B: No outward connectivity of drivable road (slow)",
  "103.problem.en": "The drivable segment has no single outward turn enabled at node B",
  "103.problem": "The drivable segment has no single outward turn enabled at node B",
  "103.solution.en": "Enable at least one outward turn from the segment at node B",
  "103.solution": "Enable at least one outward turn from the segment at node B",
  "104.title.en": "Railroad used for comments",
  "104.title": "Railroad used for comments",
  "104.problem.en": "The Railroad segment is probably used as a map comment",
  "104.problem": "The Railroad segment is probably used as a map comment",
  "104.solution.en": "Remove the comment as Railroads will be added to the client display",
  "104.solution": "Remove the comment as Railroads will be added to the client display",
  "106.enabled": true,
  "106.title.en": "No state name selected",
  "106.title": "No state name selected",
  "106.problem.en": "The segment has no state name selected",
  "106.problem": "The segment has no state name selected",
  "106.solution.en": "Select a state for the segment and apply the changes",
  "106.solution": "Select a state for the segment and apply the changes",
  "107.title.en": "Node A: No connection (slow)",
  "107.title": "Node A: No connection (slow)",
  "107.problem.en": "The node A of the drivable segment is within 5m from another drivable segment but not connected by a junction",
  "107.problem": "The node A of the drivable segment is within 5m from another drivable segment but not connected by a junction",
  "107.solution.en": "Drag the node A to the nearby segment so that it touches or move it a bit further away",
  "107.solution": "Drag the node A to the nearby segment so that it touches or move it a bit further away",
  "108.title.en": "Node B: No connection (slow)",
  "108.title": "Node B: No connection (slow)",
  "108.problem.en": "The node B of the drivable segment is within 5m from another drivable segment but not connected by a junction",
  "108.problem": "The node B of the drivable segment is within 5m from another drivable segment but not connected by a junction",
  "108.solution.en": "Drag the node B to the nearby segment so that it touches or move it a bit further away",
  "108.solution": "Drag the node B to the nearby segment so that it touches or move it a bit further away",
  "109.title.en": "Too short segment",
  "109.title": "Too short segment",
  "109.problem.en": "The drivable non-terminal segment is less than ${n}m long so it is hard to see it on the map and it can cause routing problems",
  "109.problem": "The drivable non-terminal segment is less than ${n}m long so it is hard to see it on the map and it can cause routing problems",
  "109.solution.en": "Increase the length, or remove the segment, or join it with one of the adjacent segments",
  "109.solution": "Increase the length, or remove the segment, or join it with one of the adjacent segments",
  "112.enabled": false,
  "112.title.en": "Too long Ramp name",
  "112.title": "Too long Ramp name",
  "112.problem.en": "The Ramp name is more than ${n} letters long",
  "112.problem": "The Ramp name is more than ${n} letters long",
  "112.solution.en": "Shorten the Ramp name",
  "112.solution": "Shorten the Ramp name",
  "114.title.en": "Node A: Non-drivable connected to drivable (slow)",
  "114.title": "Node A: Non-drivable connected to drivable (slow)",
  "114.problem.en": "The non-drivable segment makes a junction with a drivable at node A",
  "114.problem": "The non-drivable segment makes a junction with a drivable at node A",
  "114.solution.en": "Disconnect node A from all of the drivable segments",
  "114.solution": "Disconnect node A from all of the drivable segments",
  "115.title.en": "Node B: Non-drivable connected to drivable (slow)",
  "115.title": "Node B: Non-drivable connected to drivable (slow)",
  "115.problem.en": "The non-drivable segment makes a junction with a drivable at node B",
  "115.problem": "The non-drivable segment makes a junction with a drivable at node B",
  "115.solution.en": "Disconnect node B from all of the drivable segments",
  "115.solution": "Disconnect node B from all of the drivable segments",
  "116.title.en": "Out of range elevation",
  "116.title": "Out of range elevation",
  "116.problem.en": "The segment elevation is out of range",
  "116.problem": "The segment elevation is out of range",
  "116.solution.en": "Correct the elevation",
  "116.solution": "Correct the elevation",
  "117.title.en": "Obsolete CONST ZN marker",
  "117.title": "Obsolete CONST ZN marker",
  "117.problem.en": "The segment is marked with obsolete CONST ZN suffix",
  "117.problem": "The segment is marked with obsolete CONST ZN suffix",
  "117.solution.en": "Change CONST ZN to (closed)",
  "117.solution": "Change CONST ZN to (closed)",
  "118.title.en": "Node A: Overlapping segments (slow)",
  "118.title": "Node A: Overlapping segments (slow)",
  "118.problem.en": "The segment is overlapping with the adjacent segment at node A",
  "118.problem": "The segment is overlapping with the adjacent segment at node A",
  "118.solution.en": "Spread the segments at 2° or delete unneeded geometry point or delete the duplicate segment at node A",
  "118.solution": "Spread the segments at 2° or delete unneeded geometry point or delete the duplicate segment at node A",
  "119.title.en": "Node B: Overlapping segments (slow)",
  "119.title": "Node B: Overlapping segments (slow)",
  "119.problem.en": "The segment is overlapping with the adjacent segment at node B",
  "119.problem": "The segment is overlapping with the adjacent segment at node B",
  "119.solution.en": "Spread the segments at 2° or delete unneeded geometry point or delete the duplicate segment at node B",
  "119.solution": "Spread the segments at 2° or delete unneeded geometry point or delete the duplicate segment at node B",
  "120.title.en": "Node A: Too sharp turn (slow)",
  "120.title": "Node A: Too sharp turn (slow)",
  "120.problem.en": "The drivable segment has a very acute turn at node A",
  "120.problem": "The drivable segment has a very acute turn at node A",
  "120.solution.en": "Disable the sharp turn at node A or spread the segments at 30°",
  "120.solution": "Disable the sharp turn at node A or spread the segments at 30°",
  "121.title.en": "Node B: Too sharp turn (slow)",
  "121.title": "Node B: Too sharp turn (slow)",
  "121.problem.en": "The drivable segment has a very acute turn at node B",
  "121.problem": "The drivable segment has a very acute turn at node B",
  "121.solution.en": "Disable the sharp turn at node B or spread the segments at 30°",
  "121.solution": "Disable the sharp turn at node B or spread the segments at 30°",
  "128.title.en": "User-defined custom check (green)",
  "128.title": "User-defined custom check (green)",
  "128.problem.en": "Some of the segment properties matched against the user-defined regular expression (see Settings→Custom)",
  "128.problem": "Some of the segment properties matched against the user-defined regular expression (see Settings→Custom)",
  "128.solution.en": "Solve the issue",
  "128.solution": "Solve the issue",
  "129.title.en": "User-defined custom check (blue)",
  "129.title": "User-defined custom check (blue)",
  "129.problem.en": "Some of the segment properties matched against the user-defined regular expression (see Settings→Custom)",
  "129.problem": "Some of the segment properties matched against the user-defined regular expression (see Settings→Custom)",
  "129.solution.en": "Solve the issue",
  "129.solution": "Solve the issue",
  /* #130  ## Disabled check for PLR <30m
  "130.enabled": true,
  "130.params": {
    "titleEN": "Short Parking Lot",
    "problemEN": "Dead End Parking Lot is less that 30 meters",
    "solutionEN": "Does it really need to be there?",
    "template": "${deadEnd}:${typeRank}:${length}",
    "regexp": "/1:7:([0-2]?[0-9])$/"
  },
  "130.solutionLink": "W:Best_map_editing_practice#Parking_Lots",
*/
  "131.enabled": true,
  "131.params": {
    "titleEN": "Not New York",
    "problemEN": "The segment is assigned to another state",
    "solutionEN": "Make sure you are editing in NY and change it. If you are editing outside NY you can disable this check by entering \"!131, *\" (without the quotes) in the Reported As: field of Validators search settings (magnifying glass)",
    "template": "${state}",
    "regexp": "!/^New York/"
  },
  "131.solutionLink": "W:Creating_and_editing_road_segments#Address_Properties",
  "131.title.en": "Custom check",
  "131.title": "Not New York",
  "131.problem.en": "The segment matched custom conditions",
  "131.problem": "The segment is assigned to another state",
  "131.solution.en": "Solve the issue",
  "131.solution": "Make sure you are editing in NY and change it. If you are editing outside NY you can disable this check by entering \"!131, *\" (without the quotes) in the Reported As: field of Validators search settings (magnifying glass)",
  "132.enabled": true,
  "132.params": {
    "titleEN": "Improper Exit Naming",
    "problemEN": "This segment has an entrance / exit name which does not follow the USA standards for exit naming, or is a ramp with non entrance / exit name",
    "solutionEN": "For numbered exits use \"Exit(s) ##: Name / Other Name\". For entrances & unnumbered exits use \"to Name / Other Name\". Separate all shields and names with slashes (/) and spaces. Verify if this is supposed to be a ramp",
    "template": "${type}#${street}",
    "regexp": "//4#((?!(Exit|to|$))|( |\\b)(To|[Ee](?!xits? [\\d A-Z-]+:)[Xx][Ii][Tt][Ss]?( [Tt][Oo])?:?|to:|TO|Exits? \\d+[\\w\\- ]*( \\/ | \\- |:[ \\w]*:))( |\\b|$))//"
  },
  "132.solutionLink": "W:Road_names/USA#Exit_ramps_and_entrance_ramps_.28on-ramps.29",
  "132.title.en": "Custom check",
  "132.title": "Improper Exit Naming",
  "132.problem.en": "The segment matched custom conditions",
  "132.problem": "This segment has an entrance / exit name which does not follow the USA standards for exit naming, or is a ramp with non entrance / exit name",
  "132.solution.en": "Solve the issue",
  "132.solution": "For numbered exits use \"Exit(s) ##: Name / Other Name\". For entrances & unnumbered exits use \"to Name / Other Name\". Separate all shields and names with slashes (/) and spaces. Verify if this is supposed to be a ramp",
  "133.enabled": true,
  "133.params": {
    "titleEN": "Improper City Naming",
    "problemEN": "This segment has a generated city name which is not its' proper name",
    "solutionEN": "Fill out the form to have the city renamed, and contact your SM or RC to finalize the process",
    "template": "${city}#${altCity[#]}",
    "regexp": "/(^|#)Greater [\\w -]+ Area|[\\w -]+\\(\\d+\\)(#|$)/"
  },
  "133.solutionLink": "W:Duplicate_cities#Changing_or_Merging_an_Entire_City_Name",
  "133.title.en": "Custom check",
  "133.title": "Improper City Naming",
  "133.problem.en": "The segment matched custom conditions",
  "133.problem": "This segment has a generated city name which is not its' proper name",
  "133.solution.en": "Solve the issue",
  "133.solution": "Fill out the form to have the city renamed, and contact your SM or RC to finalize the process",
  "134.enabled": true,
  "134.params": {
    "titleEN": "Potential Incorrect BANNER Abbreviation",
    "problemEN": "Name abbreviation may be incorrect. Alternative routes should be labeled ALT and abbreviations ALT, BUS, BYP, CONN, LOOP, SCN, SPUR, or TRUCK should be in ALL CAPS",
    "solutionEN": "Change abbreviation to ALT, BUS, BYP, CONN, LOOP, SCN, SPUR, or TRUCK in ALL CAPS",
    "template": "${street}#{altStreet[#]}",
    "regexp": "/!?[0-9].+(Alt|Bus(iness)?|Byp|Conn?|L(oo)?p|Scn|Spu?r|Truck)\\b/"
  },
  "134.title.en": "Custom check",
  "134.title": "Potential Incorrect BANNER Abbreviation",
  "134.problem.en": "The segment matched custom conditions",
  "134.problem": "Name abbreviation may be incorrect. Alternative routes should be labeled ALT and abbreviations ALT, BUS, BYP, CONN, LOOP, SCN, SPUR, or TRUCK should be in ALL CAPS",
  "134.solution.en": "Solve the issue",
  "134.solution": "Change abbreviation to ALT, BUS, BYP, CONN, LOOP, SCN, SPUR, or TRUCK in ALL CAPS",
  "136.enabled": true,
  "136.params": {
    "titleEN": "NYS Minimum Lock Levels",
    "problemEN": "NYC has higher locking levels than the rest of NYS. Ferries and RR should be locked as well",
    "solutionEN": "Lock the segment to at least; PS>=3, mH>=4, MH>=5, FW>=5, Ramp>=highest connection, Ferry>=5, RR>=2",
    "template": "${state}:${city}#${type}:${lock}",
    "regexp": "/^New York:((New York|Manhattan|Queens|Brooklyn|Bronx|Staten Island)#(6:[1-4]|7:[1-3]|2:[12])|.*#(15:[1-4]|18:1))/"
  },
  "136.solutionLink": "W:NY#Locking_standard",
  "136.title.en": "Custom check",
  "136.title": "NYS Minimum Lock Levels",
  "136.problem.en": "The segment matched custom conditions",
  "136.problem": "NYC has higher locking levels than the rest of NYS. Ferries and RR should be locked as well",
  "136.solution.en": "Solve the issue",
  "136.solution": "Lock the segment to at least; PS>=3, mH>=4, MH>=5, FW>=5, Ramp>=highest connection, Ferry>=5, RR>=2",
  "137.enabled": true,
  "137.params": {
    "titleEN": "Improper Cardinal Usage",
    "problemEN": "This name contains a cardinal direction (NEWS) which does not match wiki guidelines",
    "solutionEN": "If this cardinal should be spoken as a direction by TTS, make sure it has space on either side of it. If this cardinal should be spoken by TTS as a letter, follow it with a period. All cardinals should be capitalized",
    "template": "${street} ${altStreet[#]}",
    "regexp": "/(^| )([NEWS]?[news][NEWS]?|[\"']?(([ns]|N(?!-\\d{1,3}\\b)|S(?!-\\d{1,2}[A-Z]\\b))[EeWw]?|[EeWw])['\":;-]|[\"']([NnSs][EeWw]?|[EeWw])['\":-]?)(\\b|\\d| |$)/"
  },
  "137.solutionLink": "W:Abbreviations_and_acronyms/USA#Standard_suffix_abbreviations",
  "137.title.en": "Custom check",
  "137.title": "Improper Cardinal Usage",
  "137.problem.en": "The segment matched custom conditions",
  "137.problem": "This name contains a cardinal direction (NEWS) which does not match wiki guidelines",
  "137.solution.en": "Solve the issue",
  "137.solution": "If this cardinal should be spoken as a direction by TTS, make sure it has space on either side of it. If this cardinal should be spoken by TTS as a letter, follow it with a period. All cardinals should be capitalized",
  "138.enabled": true,
  "138.params": {
    "titleEN": "Incorrect Hwy Name Prefix",
    "problemEN": "NY follows national guidelines for hwy naming prefixes (I-##, US-##, CR-##, FS-##), and uses NY-## for state routes",
    "solutionEN": "Rename the Street or Alt Street",
    "template": "${state}:${street}#${altStreet[#]}",
    "regexp": "/^New York:.*\\b((([Uu]\\.? ?( S|S(?!-\\d)[- ]|S\\.|s\\.?)|[Nn](?! \\d)(ew )?(y|Y- |[Yy]ork)? ?|[Ss]tate |[Ss] ?[RrHh]|[Cc]o(unty)? ?|[Rr]o?u?[Tt]e?|[Ff](s|S(?!-\\d)|[Rr]))([Ss][Pp][Uu][Rr]|[Rr]((ou)?(te)?|(oa)?d)|[Hh]((igh)?[Ww]a?[Yy])?)?|Ny|NY=|I- |[Cc]([HhrSs]|R(?!-\\d))|([Ii]|[NnCcUu][YyRrSs])[ =])[- ]{0,2}\\d+|([Uu] ?[Ss][- ]?)?([Hh](igh)?[Ww]a?[Yy] )?[Ff] ?([Ss] ?|[Ss]? ?[Rr])(oa)?d? )/"
  },
  "138.solutionLink": "W:NY#Major_roads",
  "138.title.en": "Custom check",
  "138.title": "Incorrect Hwy Name Prefix",
  "138.problem.en": "The segment matched custom conditions",
  "138.problem": "NY follows national guidelines for hwy naming prefixes (I-##, US-##, CR-##, FS-##), and uses NY-## for state routes",
  "138.solution.en": "Solve the issue",
  "138.solution": "Rename the Street or Alt Street",
  "139.enabled": true,
  "139.params": {
    "titleEN": "Bad TTS Street name",
    "problemEN": "Streets that start with St and Dr result in TTS reading Street or Drive",
    "solutionEN": "Add a period after St or Dr at the beginning of the street name if you want TTS to say Saint, or Doctor",
    "template": "${street}#${altStreet[#]}",
    "regexp": "/((^| |#)(St|Dr)(?! ((Ext|[NEWS][EW]?)\\b|\\/|\\(|Br(idge)?))|Rev) |(St|Dr)\\.($| ((Ext|[NEWS][EW]?)\\b|\\/|\\(|Br(idge)?))/"
  },
  "139.solutionLink": "W:Abbreviations_and_acronyms/USA#Recommended_abbreviations",
  "139.title.en": "Custom check",
  "139.title": "Bad TTS Street name",
  "139.problem.en": "The segment matched custom conditions",
  "139.problem": "Streets that start with St and Dr result in TTS reading Street or Drive",
  "139.solution.en": "Solve the issue",
  "139.solution": "Add a period after St or Dr at the beginning of the street name if you want TTS to say Saint, or Doctor",
  "150.enabled": true,
  "150.params": {
    // {number} minimum lock level
    "n": 5,
  },
  "150.title.en": "No lock on Freeway",
  "150.title": "No lock on Freeway",
  "150.problem.en": "The Freeway segment should be locked at least to Lvl ${n}",
  "150.problem": "The Freeway segment should be locked at least to Lvl ${n}",
  "150.solution.en": "Lock the segment",
  "150.solution": "Lock the segment",
  "151.enabled": true,
  "151.params": {
    "n": 3
  },
  "151.title.en": "No lock on Major Highway",
  "151.title": "No lock on Major Highway",
  "151.problem.en": "The Major Highway segment should be locked at least to Lvl ${n}",
  "151.problem": "The Major Highway segment should be locked at least to Lvl ${n}",
  "151.solution.en": "Lock the segment",
  "151.solution": "Lock the segment",
  "152.enabled": true,
  "152.params": {
    // {number} minimum lock level
    "n": 3,
  },
  "152.title.en": "No lock on Minor Highway",
  "152.title": "No lock on Minor Highway",
  "152.problem.en": "The Minor Highway segment should be locked at least to Lvl ${n}",
  "152.problem": "The Minor Highway segment should be locked at least to Lvl ${n}",
  "152.solution.en": "Lock the segment",
  "152.solution": "Lock the segment",
  "153.enabled": true,
  "153.params": {
    "n": 5,
    "problemEN": "Ramps generally connect to Freeways, so they should be locked to Lvl ${n}. If not connected to a freeway, verify that this meets the criteria to be a ramp",
    "solutionEN": "Lock the segment, change it to a non-ramp type, or just verify it should be a ramp"
  },
  "153.solutionLink": "W:Road_types/USA#Ramps",
  "153.title.en": "No lock on Ramp",
  "153.title": "No lock on Ramp",
  "153.problem.en": "The Ramp segment should be locked at least to Lvl ${n}",
  "153.problem": "Ramps generally connect to Freeways, so they should be locked to Lvl ${n}. If not connected to a freeway, verify that this meets the criteria to be a ramp",
  "153.solution.en": "Lock the segment",
  "153.solution": "Lock the segment, change it to a non-ramp type, or just verify it should be a ramp",
  "154.enabled": false,
  "170.enabled": true,
  "170.params": {
    "regexp": "/^(?!to [^a-z])((S|N|W|E)(E|W)? )?[a-z]/"
  },
  "170.title.en": "Lowercase street name",
  "170.title": "Lowercase street name",
  "170.problem.en": "The street name starts with a lowercase word",
  "170.problem": "The street name starts with a lowercase word",
  "170.solution.en": "Correct lettercase in the street name",
  "170.solution": "Correct lettercase in the street name",
  "171.enabled": true,
  "171.params": {
    "regexp": "/((?!(\\bPhila|\\bPenna|.(\\bWash|\\bCmdr|\\bProf|\\bPres)|..(\\bAdm|\\bSte|\\bCpl|\\bMaj|\\bSgt|\\bRe[vc]|\\bR\\.R|\\bGov|\\bGen|\\bHon|\\bCpl)|...(\\bSt|\\b[JSD]r|\\bLt|\\bFt)|...(#| )[NEWSR])).{5}\\.|((?!(hila|enna|(\\bWash|\\bCmdr|\\bProf|\\bPres)|.(\\bAdm|\\bSte|\\bCpl|\\bMaj|\\bSgt|\\bRe[vc]|\\bR\\.R|\\bGov|\\bGen|\\bHon|\\bCpl)|..(\\bSt|\\b[JSD]r|\\bLt|\\bFt)|..(#| )[NEWSR])).{4}|(\\bhila|\\benna))\\.|((?!(ila|nna|(ash|mdr|rof|res)|(\\bAdm|\\bSte|\\bCpl|\\bMaj|\\bSgt|\\bRe[vc]|\\bR\\.R|\\bGov|\\bGen|\\bHon|\\bCpl)|.(\\bSt|\\b[JSD]r|\\bLt|\\bFt)|.(#| )[NEWSR])).{3}|\\b(ila|nna|ash|mdr|rof|res))\\.|((?!(la|na|(sh|dr|of|es)|(dm|te|pl|aj|gt|e[vc]|\\.R|ov|en|on|pl)|(\\bSt|\\b[JSD]r|\\bLt|\\bFt)|(#| )[NEWSR])).{2}|\\b(la|na|sh|dr|of|es|dm|te|pl|aj|gt|e[vc]|\\.R|ov|en|on|pl))\\.|(#|^)[^NEWSR]?\\.)|(((?!\\b(D|O|L)).|#|^)'(?![sl]\\b)|(#|^)'s|(?!\\b(In|Na)t).{3}'l|(#|^).{0,2}'l)|(Dr|St)\\.(#|$)|,|;|\\\\|((?!\\.( |#|$|R))\\..|(?!\\.( .|#.|$|R\\.))\\..{2}|\\.R(#|$|\\.R))|[Ee]x(p|w)y\\b|\\b[Ee]x[dn]\\b|Tunl\\b|Long Is\\b|Brg\\b/",
    "problemEN": "The street name has an incorrect abbreviation, or character",
    "solutionEN": "Check upper/lower case, a space before/after the abbreviation and the accordance with the abbreviation table. Remove any comma (,), backslash (\\), or semicolon (;)"
  },
  "171.solutionLink": "W:Abbreviations_and_acronyms/USA#Standard_suffix_abbreviations",
  "171.title.en": "Incorrectly abbreviated street name",
  "171.title": "Incorrectly abbreviated street name",
  "171.problem.en": "The street name has incorrect abbreviation",
  "171.problem": "The street name has an incorrect abbreviation, or character",
  "171.solution.en": "Check upper/lower case, a space before/after the abbreviation and the accordance with the abbreviation table",
  "171.solution": "Check upper/lower case, a space before/after the abbreviation and the accordance with the abbreviation table. Remove any comma (,), backslash (\\), or semicolon (;)",
  "172.title.en": "Unneeded spaces in street name",
  "172.title": "Unneeded spaces in street name",
  "172.problem.en": "Leading/trailing/double space in the street name",
  "172.problem": "Leading/trailing/double space in the street name",
  "172.solution.en": "Remove unneeded spaces from the street name",
  "172.solution": "Remove unneeded spaces from the street name",
  "173.title.en": "No space before/after street abbreviation",
  "173.title": "No space before/after street abbreviation",
  "173.problem.en": "No space before ('1943r.') or after ('st.Jan') an abbreviation in the street name",
  "173.problem": "No space before ('1943r.') or after ('st.Jan') an abbreviation in the street name",
  "173.solution.en": "Add a space before/after the abbreviation",
  "173.solution": "Add a space before/after the abbreviation",
  "175.title.en": "Empty street name",
  "175.title": "Empty street name",
  "175.problem.en": "The street name has only space characters or a dot",
  "175.problem": "The street name has only space characters or a dot",
  "175.solution.en": "In the address properties check the 'None' box next to the street name, click 'Apply' OR set a proper street name",
  "175.solution": "In the address properties check the 'None' box next to the street name, click 'Apply' OR set a proper street name",
  "190.title.en": "Lowercase city name",
  "190.title": "Lowercase city name",
  "190.problem.en": "The city name starts with a lowercase letter",
  "190.problem": "The city name starts with a lowercase letter",
  "190.solution.en": "Use this form to rename the city",
  "190.solution": "Use this form to rename the city",
  "192.title.en": "Unneeded spaces in city name",
  "192.title": "Unneeded spaces in city name",
  "192.problem.en": "Leading/trailing/double space in the city name",
  "192.problem": "Leading/trailing/double space in the city name",
  "192.solution.en": "Use this form to rename the city",
  "192.solution": "Use this form to rename the city",
  "193.title.en": "No space before/after city abbreviation",
  "193.title": "No space before/after city abbreviation",
  "193.problem.en": "No space before ('1943r.') or after ('st.Jan') an abbreviation in the city name",
  "193.problem": "No space before ('1943r.') or after ('st.Jan') an abbreviation in the city name",
  "193.solution.en": "Use this form to rename the city",
  "193.solution": "Use this form to rename the city",
  "200.title.en": "Node A: Unconfirmed turn on minor road",
  "200.title": "Node A: Unconfirmed turn on minor road",
  "200.problem.en": "The minor drivable segment has an unconfirmed (soft) turn at node A",
  "200.problem": "The minor drivable segment has an unconfirmed (soft) turn at node A",
  "200.solution.en": "Click the turn indicated with a purple question mark to confirm it. Note: you may need to make the segment 'Two-way' in order to see those turns",
  "200.solution": "Click the turn indicated with a purple question mark to confirm it. Note: you may need to make the segment 'Two-way' in order to see those turns",
  "201.title.en": "Node A: Unconfirmed turn on primary road",
  "201.title": "Node A: Unconfirmed turn on primary road",
  "201.problem.en": "The primary segment has an unconfirmed (soft) turn at node A",
  "201.problem": "The primary segment has an unconfirmed (soft) turn at node A",
  "201.solution.en": "Click the turn indicated with a purple question mark to confirm it. Note: you may need to make the segment 'Two-way' in order to see those turns",
  "201.solution": "Click the turn indicated with a purple question mark to confirm it. Note: you may need to make the segment 'Two-way' in order to see those turns"
};
// --------------------------- Modifications for permalink buttons to NYS Orthos, and FC Viewer below this point -------------------------------------------------

//  add NY Orthos PL button (credit: based on bookmarlet posted in NYS Waze wiki
function  open_map(server) {
  var center_lonlat=new OL.LonLat(W.map.center.lon,W.map.center.lat);
     center_lonlat.transform(new OL.Projection('EPSG:900913'),new OL.Projection('EPSG:4326'));
  var NYS_Orthos_PL = 'https://orthos.dhses.ny.gov/?lat='+center_lonlat.lat+'&long='+center_lonlat.lon+'&zoom='+((W.map.zoom)+12);
  
  window.open(NYS_Orthos_PL,'NYSOrthos');
}
 
var WazePermalink;
setTimeout(function() {
 
    WazePermalink = document.getElementsByClassName('WazeControlPermalink')[0];
    var map_links = document.createElement('span');
 
 
    map_links.innerHTML = '<img src="http://static-assets.ny.gov/sites/all/themes/ny_gov/images/nygov\-logo.png" alt="NYS Orthos" width="18" height="18" id="NYS_Orthos_PL" title="NYS Orthos Permalink" style="cursor: pointer; float: left; display: inline-block; margin: 2px 5px 0 3px;"> ';
    map_links.innerHTML += '<style>.olControlAttribution {display: none;}</style>';
 
 
    WazePermalink.appendChild(map_links);
 
    document.getElementById("NYS_Orthos_PL")
        .addEventListener("click", open_map, false);
 
}, 5000);
// End pl button

//  add NY FC PL button (credit: Joyriding)
// TODO: 1) Move away from external library. 2) Fix zoom issue or wait until NY FC Viewer is upgraded. 3) Fix centering issue.
function  open_FC(server) {
    var e=W.map.getExtent();
    var geoNW=new OL.Geometry.Point(e.left,e.top);
    var geoSE=new OL.Geometry.Point(e.right,e.bottom);
    
    // Currently using Proj4js library (http://proj4js.org/) to handle the projection transformation to EPSG:26918. 
    // The Proj4hs library is referenced in the header.  If we continue to use it we should host it somewhere stable other than its source repository.
    // Transformation is also not perfect, the center is off by a small amount. I have not looked into why that is yet. May just be diffences in initial zoom vs scale.
    //
    // ** To move away from an external library we must understand and implement the conversion forumlas.
    // An example for creating a custom projection: http://openlayers.org/en/master/examples/wms-custom-proj.html?mode=raw
    // We would need to implement all of the functions they define there, customized for EPSG:26918.
    
    Proj4js.defs["EPSG:26918"] = "+proj=utm +zone=18 +ellps=GRS80 +datum=NAD83 +units=m +no_defs";

    var source = new Proj4js.Proj('EPSG:900913');    
    var dest = new Proj4js.Proj('EPSG:26918');

    var geoNW = new Proj4js.Point(geoNW.x,geoNW.y);
    var geoSE = new Proj4js.Point(geoSE.x,geoSE.y);

    Proj4js.transform(source, dest, geoNW);
    Proj4js.transform(source, dest, geoSE);
    
    // Zoom/scale in the NY FC Viewer does not currently work and defaults to 400ft if a location is specified.
    // I don't yet know exactly how zoom/scale levels are represented, but the values below work as expected if a location (&extents=) is not given.
    // If the NY FC Viewer is ever upgraded the zoom should then work correctly.
    
    // FC Viewer supports displaying FC layer at 400 ft - 4 mile scale
    // 4 mile: 288895.277144
    // 2 mile: 144447.638572
    // 1 mile: 72223.819286 
    // 0.4 mile: 36111.909643 
    // 0.2 mile: 18055.954822
    // 600 ft: 9027.977411
    // 300 ft: 4513.988705
    // 200 ft: 2256.994353
    // 60 ft: 1128.497176
    
    // WME zoom levels to FC Viewer scale:
    // zoom 0 / 1 mile : 72223.819286
    // zoom 1 / 5000 ft : 72223.819286
    // zoom 2 / 2000 ft : 36111.909643
    // zoom 3 / 1000 ft : 18055.954822
    // zoom 4 / 500 ft : 9027.977411
    
    var mapScale = 36111.909643
    
    switch (W.map.zoom) {
    case 0:
    case 1:
        mapScale = 72223.819286;
        break;
    case 2:
        mapScale = 36111.909643;
        break;
    case 3:
        mapScale = 18055.954822;
        break;
    default:
        mapScale = 9027.977411;
        break;
    }
        
    var URL='http://gis3.dot.ny.gov/html5viewer/?viewer=FC&scale='+mapScale+'&extent='+geoNW.x+'%2C'+geoNW.y+'%2C'+geoSE.x+'%2C'+geoSE.y;
    
    window.open(URL,"_blank");
}
 
var WazePermalinkFC;
setTimeout(function() {
 
    WazePermalinkFC = document.getElementsByClassName('WazeControlPermalink')[0];
    var map_links = document.createElement('span');
 
 
    map_links.innerHTML = '<img src="https://www.dot.ny.gov/favicon.ico" alt="NYS FC" width="18" height="18" id="NYS_FC_PL" title="NYS FC Permalink" style="cursor: pointer; float: left; display: inline-block; margin: 2px 5px 0 3px;"> ';
    map_links.innerHTML += '<style>.olControlAttribution {display: none;}</style>';
 
 
    WazePermalinkFC.appendChild(map_links);
 
    document.getElementById("NYS_FC_PL")
        .addEventListener("click", open_FC, false);
 
}, 5000);
// End pl button

//  add NYCityMap PL button
// TODO: 1) Move away from external library. 2) Fix zoom issue or wait until NY FC Viewer is upgraded. 3) Fix centering issue.
function  open_NYC(server) {
    
   var geoPoint=new OL.Geometry.Point(W.map.center.lon,W.map.center.lat);

   Proj4js.defs["ESRI:102718"] = "+proj=lcc +lat_1=40.66666666666666 +lat_2=41.03333333333333 +lat_0=40.16666666666666 +lon_0=-74 +x_0=300000 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 no_defs";

   var source = new Proj4js.Proj('EPSG:900913');    
   var dest = new Proj4js.Proj('ESRI:102718');

   Proj4js.transform(source, dest, geoPoint);

    
    // Currently using Proj4js library (http://proj4js.org/) to handle the projection transformation to EPSG:26918. 
    // The Proj4hs library is referenced in the header.  If we continue to use it we should host it somewhere stable other than its source repository.
    // Transformation is also not perfect, the center is off by a small amount. I have not looked into why that is yet. May just be diffences in initial zoom vs scale.
    //
    // ** To move away from an external library we must understand and implement the conversion forumlas.
    // An example for creating a custom projection: http://openlayers.org/en/master/examples/wms-custom-proj.html?mode=raw
    // We would need to implement all of the functions they define there, customized for EPSG:26918.
    
    var zoom = (W.map.zoom)+3;
    
    var URL='http://maps.nyc.gov/doitt/nycitymap/?z='+zoom+'&p='+Math.round(geoPoint.x)+','+Math.round(geoPoint.y)+'&c=GISBasic&f=DDC_PROJECTS';
    
    window.open(URL,"_blank");
}
 
var WazePermalinkNYC;
setTimeout(function() {
 
    WazePermalinkNYC = document.getElementsByClassName('WazeControlPermalink')[0];
    var map_links = document.createElement('span');
 
 
    map_links.innerHTML = '<img src="http://i.imgur.com/GnnrKxc.png" alt="NYCityMap" width="18" height="18" id="NYC_PL" title="NYCityMap Permalink" style="cursor: pointer; float: left; display: inline-block; margin: 2px 5px 0 3px;"> ';
    map_links.innerHTML += '<style>.olControlAttribution {display: none;}</style>';
 
 
    WazePermalinkNYC.appendChild(map_links);
 
    document.getElementById("NYC_PL")
        .addEventListener("click", open_NYC, false);
 
}, 5000);
// End pl button

//  add NY SL PL button
// TODO: 1) Move away from external library. 2) Fix zoom issue or wait until NY SL Viewer is upgraded. 3) Fix centering issue.
function  open_SL(server) {
    var e=W.map.getExtent();
    var geoNW=new OL.Geometry.Point(e.left,e.top);
    var geoSE=new OL.Geometry.Point(e.right,e.bottom);
    
    // Currently using Proj4js library (http://proj4js.org/) to handle the projection transformation to EPSG:26918. 
    // The Proj4hs library is referenced in the header.  If we continue to use it we should host it somewhere stable other than its source repository.
    // Transformation is also not perfect, the center is off by a small amount. I have not looked into why that is yet. May just be diffences in initial zoom vs scale.
    //
    // ** To move away from an external library we must understand and implement the conversion forumlas.
    // An example for creating a custom projection: http://openlayers.org/en/master/examples/wms-custom-proj.html?mode=raw
    // We would need to implement all of the functions they define there, customized for EPSG:26918.
    
    Proj4js.defs["EPSG:26918"] = "+proj=utm +zone=18 +ellps=GRS80 +datum=NAD83 +units=m +no_defs";

    var source = new Proj4js.Proj('EPSG:900913');    
    var dest = new Proj4js.Proj('EPSG:26918');

    var geoNW = new Proj4js.Point(geoNW.x,geoNW.y);
    var geoSE = new Proj4js.Point(geoSE.x,geoSE.y);

    Proj4js.transform(source, dest, geoNW);
    Proj4js.transform(source, dest, geoSE);
    
    // Zoom/scale in the NY SL Viewer does not currently work and defaults to 400ft if a location is specified.
    // I don't yet know exactly how zoom/scale levels are represented, but the values below work as expected if a location (&extents=) is not given.
    // If the NY SL Viewer is ever upgraded the zoom should then work correctly.
    
    // SL Viewer supports displaying SL layer at 400 ft - 4 mile scale
    // 4 mile: 288895.277144
    // 2 mile: 144447.638572
    // 1 mile: 72223.819286 
    // 0.4 mile: 36111.909643 
    // 0.2 mile: 18055.954822
    // 600 ft: 9027.977411
    // 300 ft: 4513.988705
    // 200 ft: 2256.994353
    // 60 ft: 1128.497176
    
    // WME zoom levels to SL Viewer scale:
    // zoom 0 / 1 mile : 72223.819286
    // zoom 1 / 5000 ft : 72223.819286
    // zoom 2 / 2000 ft : 36111.909643
    // zoom 3 / 1000 ft : 18055.954822
    // zoom 4 / 500 ft : 9027.977411
    
    var mapScale = 36111.909643
    
    switch (W.map.zoom) {
    case 0:
    case 1:
        mapScale = 72223.819286;
        break;
    case 2:
        mapScale = 36111.909643;
        break;
    case 3:
        mapScale = 18055.954822;
        break;
    default:
        mapScale = 9027.977411;
        break;
    }
        
    var URL='http://gis3.dot.ny.gov/html5viewer/?viewer=risvexternal&scale='+mapScale+'&extent='+geoNW.x+'%2C'+geoNW.y+'%2C'+geoSE.x+'%2C'+geoSE.y;
    
    window.open(URL,"_blank");
}
 
var WazePermalinkSL;
setTimeout(function() {
 
    WazePermalinkSL = document.getElementsByClassName('WazeControlPermalink')[0];
    var map_links = document.createElement('span');
 
 
    map_links.innerHTML = '<img src="data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABILAAASCwAAAAAAAAAAAAAAAAAAq6urPJOTk/inp6f9p6en/aenp/2np6f9p6en/aenp/2np6f9p6en/aenp/2np6f9k5OT+KurqzwAAAAAAAAAAIiIiFvR0dH//////////////////////////////////////////////////////9HR0f+IiIhbAAAAAAAAAACIiIhb0dHR/7Ozs/8rKyv/ExMT/0xMTP/q6ur/tbW1/ywsLP8TExP/SkpK/+np6f/R0dH/iIiIWwAAAAAAAAAAiIiIW9HR0f/f39//0tLS//Ly8v91dXX/dHR0/+Hh4f/R0dH/8vLy/3h4eP9xcXH/0dHR/4iIiFsAAAAAAAAAAIiIiFvR0dH/8/Pz/8rKyv/n5+f/b29v/3d3d//z8/P/ysrK/+fn5/9xcXH/dHR0/9HR0f+IiIhbAAAAAAAAAACIiIhb0dHR/4+Pj/8WFhb/HR0d/1NTU//s7Oz/kpKS/xYWFv8dHR3/UVFR/+zs7P/R0dH/iIiIWwAAAAAAAAAAiIiIW9HR0f+fn5//Ozs7/4eHh/+Hh4f/5ubm/6Kiov85OTn/h4eH/4eHh//l5eX/0dHR/4iIiFsAAAAAAAAAAIiIiFvR0dH/2NjY/4iIiP+IiIj/iIiI/+Xl5f/a2tr/iIiI/4iIiP+IiIj/5OTk/9HR0f+IiIhbAAAAAAAAAACIiIhb0dHR//////+pqan/w8PD/8/Pz//Hx8f/yMjI/8/Pz//y8vL/4ODg///////R0dH/iIiIWwAAAAAAAAAAiIiIW9HR0f//////np6e//////+YmJj/SUlJ/0hISP+ZmZn/4+Pj/729vf//////0dHR/4iIiFsAAAAAAAAAAIiIiFvR0dH//////7+/v///////u7u7/6mpqf+oqKj/u7u7/7Kysv+ZmZn//////9HR0f+IiIhbAAAAAAAAAACIiIhb0dHR/8rKyv/k5OT/5OTk///////Jycn/xcXF/8zMzP/BwcH/0NDQ/9vb2//R0dH/iIiIWwAAAAAAAAAAiIiIW9DQ0P+bm5v/i4uL/2xsbP+8vLz/cXFx/9PT0/93d3f/zc3N/5KSkv+NjY3/yMjI/4iIiFsAAAAAAAAAAIiIiFvR0dH/eXl5/8zMzP95eXn/jo6O/3t7e/+rq6v/gYGB/6Wlpf+NjY3/jo6O/8/Pz/+IiIhbAAAAAAAAAACIiIhb0dHR///////////////////////////////////////////////////////R0dH/iIiIWwAAAAAAAAAAq6urPJSUlPinp6f9p6en/aenp/2np6f9p6en/aenp/2np6f9p6en/aenp/2np6f9lJSU+KurqzwAAAAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAA==" alt="NYS SL" width="18" height="18" id="NYS_SL_PL" title="NYS SL Permalink" style="cursor: pointer; float: left; display: inline-block; margin: 2px 5px 0 3px;"> ';
    map_links.innerHTML += '<style>.olControlAttribution {display: none;}</style>';
 
 
    WazePermalinkFC.appendChild(map_links);
 
    document.getElementById("NYS_SL_PL")
        .addEventListener("click", open_SL, false);
 
}, 5000);
// End pl button