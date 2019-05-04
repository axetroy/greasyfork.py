// ==UserScript==
// @name              Hargreaves Lansdown ETF info
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  This script automatically calculates the Total Expense Ratios (TER) of index funds on Hargreaves Lansdown (www.hl.co.uk) to help you work out the actual cost of investing in ETFs and other funds.
//               To use it, simply go to http://www.hl.co.uk/funds/ and search for the fund you want to calculate the TER of. Then click on "Charts & Performance" tab. Under the "Add to Chart" section select "Index" (or something else) and select the index you want to use as the benchmark. You can keep adding indices or funds to compare TERs.
//               The second row will always be treated as the reference index to calculate TERs against. Additional tables will be generated with the reference row/index highlighted.
//               Note: Sometimes you need to click the 'Add to chart' button twice to trigger this script.
// @author       BB3
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser.min.js
// @require      https://code.jquery.com/jquery-3.1.1.slim.min.js
// @match        http://*.financialexpress.net/clients/Hargreaves/*
// @match        http://www.hl.co.uk/funds/fund-discounts,-prices--and--factsheets/*
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
/* jshint esnext: true */

    // increase the height of the iframe
    $('#charting-frame').attr("height", "4000");

    // Calculate the difference between all the rows of a table against a reference row
    // and return a new table
    function calculateDifference(tableElem, newTitle) {
        // get the table body containing the data
        let dataTable = tableElem.children("tbody").eq(1);

        if (dataTable != null) {
            let rows = dataTable.children();

            let highlightColour = 'rgba(251, 255, 0, 0.25)';

            if (rows.length >= 2) {
                // we're in business. The second row is expected to be the reference
                // row that we'll subtract all the other values against
                let referenceRowCells = rows.eq(1).children('td');

                // let's highlight the reference row so it's obvious
                referenceRowCells.css('background-color', highlightColour);

                var table = $('<tbody></tbody>');

                // now iterate over all other rows calculating the difference
                rows.each(function(rowIdx) {
                    var newRow = $('<tr></tr>');
                    var rowCells = rows.eq(rowIdx).children('td');

                    var highlightRow = false;

                    console.log("Trying to highlight the index row");
                    if (rows.eq(rowIdx).find('td').first().text() === referenceRowCells.get(0).textContent) {
                        highlightRow = true;
                    }

                    rowCells.each(function(cellIdx){
                        let refValue = parseFloat(referenceRowCells.eq(cellIdx).text());
                        var cellValue = parseFloat(rowCells.eq(cellIdx).text());

                        let newCell = $('<td></td>');

                        if (highlightRow) {
                          newCell.css('background-color', highlightColour);
                        }

                        if (isNaN(refValue) || isNaN(cellValue)) {
                            // append the row title
                            newRow.append(newCell.append(rowCells.eq(cellIdx).text()));
                            return;
                        }

                        console.log("Will calculate " + refValue + " - " + cellValue);
                        let ter = (refValue - cellValue).toFixed(2);
                        newRow.append(newCell.append(ter + '%'));
                    });
                    table.append(newRow);
                });

                var containerId = tableElem.attr('id') + "Ter";
                var container = $('<div class="performance" id=' + containerId + '><h1>' + newTitle + "</h1></div>");

                var terTable = $('<table></table>').append(tableElem.children("tbody").eq(0).clone());
                terTable.append(table);

                container.append(terTable);

                return container;
            }
            else {
                console.log("Too few rows detected");
            }
        }
    }

    let submitButtonsIds = ['#SelectFundBoxButton', '#SelectEquityBoxButton', '#SelectSectorBoxButton', '#SelectIndexBoxButton'];

    submitButtonsIds.forEach(function(id) {
        $(id).find("input").first().click(function() {
            // our code needs to run after the data has been loaded.
            return setTimeout(update, 1000);
        });
    });

    function update() {
      let discreteTable = $("#tblDiscretePerformance");
      let discreteTer = calculateDifference(discreteTable, discreteTable.prev().text() + " TER");
      replaceOrInsert(discreteTer, discreteTable);

      let cumulativeTable = $("#tblCumulativePerformance");
      let cumulativeTer = calculateDifference(cumulativeTable, cumulativeTable.prev().text() + " TER");
      replaceOrInsert(cumulativeTer, cumulativeTable);
    }

    // if the table is already on the page, replace it, otherwise add it
    function replaceOrInsert(newTable, target) {
      let tableId = newTable.attr('id');

      console.log("Deciding whether to insert or replace #" + tableId);

      if ($('#' + tableId).length !== 0) {
        $('#' + tableId).replaceWith(newTable);
      } else {
        newTable.insertAfter(target.parent());
      }
    }

/* jshint ignore:start */
]]></>).toString();
var c = babel.transform(inline_src);
eval(c.code);
/* jshint ignore:end */