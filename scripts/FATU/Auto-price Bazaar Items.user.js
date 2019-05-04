// ==UserScript==
// @name            Auto-price Bazaar Items
// @author          FATU [1482556]
// @description     Grabs prices from Torn API and auto adds price
// @version	    1.1
// @include         https://www.torn.com/bazaar.php*
// @require         https://code.jquery.com/jquery-1.8.2.min.js
// @namespace       https://fatu.uk/
// ==/UserScript==

$(document).ready(function() {

  var apiKey = "";
  var itemImage = $(".title-wrap img");
  var itemList = [];
  var i = 0;

  // Call the API request function and start gathering all bazaar prices.
  function getPricing() {

    $.each(itemList, function(key, value) {

      // Set three second timer per API request.
      setTimeout(function() {

        // Actual API request.
        $.ajax({
          dataType: "json",
          url: "https://api.torn.com/market/" + value,
          data: {
            selections: "bazaar",
            key: apiKey
          },

          // When data is received, run this.
          success: function(data) {

            console.log(value + " request was successful");

            var cheapest = null;

            // Run through all results and return the cheapest.
            $.each(data["bazaar"], function(key, val) {
              var cost = val["cost"];

              if (cheapest == null || cost < cheapest) {
                cheapest = cost;
              }
            });

            var inputMoney = $(".item-" + value).closest("li.clearfix").find(".input-money:text");

            inputMoney.val(cheapest - 1).focus();

          },

          // When data is not received, run this.
          error: function() {
            console.log(value + " request was NOT successful");
          }
        });

      }, key * 3000);

    });
  }

  // Run through all images and grab all item ID's.
  function scrapeItems() {
    itemImage.each(function() {
      var grabItemID = $(this).attr("src").match(/\d+/)[0];
      var disabled = $(this).closest("li.clearfix").hasClass("disabled");

      // Add item number as class for easy reference later.
      $(this).addClass("item-" + grabItemID);

      // If the item's row has "disabled" class, skip this item.
      if (disabled) {
        return true;
      }

      // Add item to array.
      itemList.push(grabItemID);
    });
  }

  // Check if user is on the add page
  function checkPage() {
    var url = window.location.href;

    setTimeout(function() {
      if (url.indexOf("bazaar.php#/p=add") > 0) {
        addButton();
        scrapeItems();
      } else {
        checkPage();
      }
    }, 1000);

  }

  checkPage();

  function addButton() {
    $("#inventory-container").prepend('<button id="start-button" style="margin-bottom:10px;margin-right:10px;">Run Auto-pricing script</button><p id="s-desc" style="display:inline-block;font-weight:bold;text-transform:uppercase;color:red;letter-spacing:1px;">Make sure to refresh page before use!</p>');
  }

  $(document).on("click", "#start-button", function() {
    getPricing();
  });

});
