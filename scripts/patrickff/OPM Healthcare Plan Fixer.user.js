// ==UserScript==
// @name        OPM Healthcare Plan Fixer
// @namespace   local
// @description Table will fill the whole page width, specific rows are highlighted, and yearly premium is calculated
// @include     https://www.opm.gov/healthcare-insurance/healthcare/plan-information/compare-plans/fehb/PlanDetails?*
// @version     0.7
// ==/UserScript==

// Adjust to look whatever you're interested in
const TITLES_TO_HIGHLIGHT = [
    'Self & Family',
    'Primary Care Office Visit',
    'Preventive Dental for Adults',
    'Preventive for Children',
    'Routine Eye Exams'
];

// # of payments per year
const PREMIUM_RATE_FACTORS = {
        'Biweekly': 27,
        'Semi-Monthly': 24,
        'Monthly': 12

//
const HEADER_BG_COLOR = "#FF5555";
const ROW_BG_COLOR = "#FFAAAA";

function appendStyle(el, prop, value) {
    var aval = el.getAttribute('style');
    el.setAttribute('style',
        (aval ? aval + ';' : '') + prop + ':' + value);
}

// Get container - and basically verify the document type
var mcContainer = document.getElementById('MainContent_Container');
if (mcContainer) {
    appendStyle(mcContainer, 'width', '100%');
    
    var mcDiv = document.getElementById('MainContentDiv');
    appendStyle(mcDiv, 'width', '100%');

    // Should only contain 1 single data table (duplicate? use first)
    var dtables = mcDiv.getElementsByClassName('DataTable');
    if (dtables.length >= 1) {
        var rowHeaderList = dtables[0].querySelectorAll("th[scope='row']"),
            rowHeaderArr = Array.prototype.slice.call(rowHeaderList);

        TITLES_TO_HIGHLIGHT.forEach(function(title) {
            var matchingHeader = rowHeaderArr.find(function(header) {
                return (header.textContent.indexOf(title) >= 0);
            });

            if (matchingHeader) {
                appendStyle(matchingHeader,
                            'background-color', HEADER_BG_COLOR);
                appendStyle(matchingHeader.parentNode,
                            'background-color', ROW_BG_COLOR);
            }
        });

        rowHeaderArr.forEach(function(header) {
            // Potential rate/premium row
            if (header.textContent.indexOf('Premium') >= 0) {
                var rateFactor = PREMIUM_RATE_FACTORS[header.textContent.split(' ')[0]];
                if (!rateFactor) {
                    return;
                }

                var children = header.parentNode.getElementsByTagName('td');
                for (var idx = 0; idx < children.length; idx++) {
                    var rateEl = children[idx];

                    // Dollar amount found
                    if (rateEl.textContent && rateEl.textContent.indexOf('$') >= 0) {
                        var rate = parseFloat(rateEl.textContent.trim().substr(1));
                        if (!isNaN(rate)) {
                            rateEl.innerHTML = rateEl.textContent +
                                " <i>($" +
                                (rateFactor * rate).toFixed(2) +
                                ")</i>";
                        }
                    }
                }
            }
        });
    }
}

// Jump to the content
window.location.href = '#content';
