// ==UserScript==
// @name         MouseHunt - Marketplace UI Tweaks
// @author       Tran Situ (tsitu)
// @namespace    https://greasyfork.org/en/users/232363-tsitu
// @version      1.2
// @description  Adds useful features and tweaks to the Marketplace rework
// @match        http://www.mousehuntgame.com/*
// @match        https://www.mousehuntgame.com/*
// ==/UserScript==

(function() {
  /**
   * [ Notes ]
   * innerText has poor retrieval perf, use textContent
   *   http://perfectionkills.com/the-poor-misunderstood-innerText/
   * Is there a better way to center scrollRow vertically within table?
   *   https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
   */

  MutationObserver =
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver;

  // Initialize 'Browse' tab item caching
  if (localStorage.getItem("marketplace-browse-cache-tsitu") === null) {
    const cacheObj = {
      Cheese: 0,
      "Baskets & Kits": 0,
      Charms: 0,
      Crafting: 0,
      Special: 0,
      Collectibles: 0,
      Weapons: 0,
      Skins: 0
    };
    localStorage.setItem(
      "marketplace-browse-cache-tsitu",
      JSON.stringify(cacheObj)
    );
  }

  // Only observe changes to the #overlayPopup element
  const observerTarget = document.querySelector("#overlayPopup");

  const observer = new MutationObserver(function() {
    // TODO: Change some of the document.qS calls to a more specific element in case of collision
    // TODO: More tariff calcs in 'History' tab ('My Listings' doesn't seem to have exact values)

    // Check if the Marketplace interface is open
    if (document.querySelector(".marketplaceView")) {
      // Disconnect and reconnect later to prevent mutation loop
      observer.disconnect();

      // Feature: Move close button to top right and clean up visuals
      const oldClose = document.querySelector(".jsDialogClose.button");
      if (oldClose) {
        const newClose = oldClose.cloneNode();
        oldClose.remove();
        const suffix = document.querySelector(".suffix");
        if (suffix) suffix.remove();

        newClose.style.position = "absolute";
        newClose.style.right = "0px";
        newClose.style.top = "5px";
        document.querySelector(".marketplaceView").prepend(newClose);

        const searchContainer = document.querySelector(
          ".marketplaceView-header-searchContainer"
        );
        if (searchContainer) {
          searchContainer.style.right = "65px";
          searchContainer.style.width = "220px";
        }

        const searchBar = document.querySelector(
          ".marketplaceView-header-search"
        );
        if (searchBar) {
          searchBar.style.width = "184px";
        }
      }

      const browseTab = document.querySelector("[data-tab=browse].active");
      const backButton = document.querySelector("a.marketplaceView-breadcrumb");

      if (browseTab && !backButton) {
        /* Browse tab logic (active Browse tab + inactive 'Back' button) */

        // Align trend icon divs to the right
        const trendIcons = document.querySelectorAll(
          ".marketplaceView-trendIcon"
        );
        trendIcons.forEach(el => {
          const td = el.parentElement;
          if (td) {
            td.style.textAlign = "right";
          }
        });

        const sidebar = document.querySelector(
          ".marketplaceView-browse-sidebar"
        );
        const itemType = sidebar.querySelector(
          ".marketplaceView-browse-sidebar-link.active"
        );

        // Feature: Make item images 40x40 px
        document.querySelectorAll(".marketplaceView-itemImage").forEach(el => {
          el.style.width = "40px";
          el.style.height = "40px";
          el.style.backgroundSize = "100%";
        });

        let totalValueSum = 0;
        /**
         * Abbreviates large number values up to 1 decimal point
         * k = 1,000 and m = 1,000,000
         * @param {number} num Integer to abbreviate
         * @return {string}
         */
        function abbrev(num) {
          if (num <= 999) {
            return "" + num;
          } else if (num >= 1000 && num <= 999999) {
            let pre = Math.floor(num / 1000);
            let post = Math.round((num % 1000) / 100);
            if (post === 10) {
              post = 0;
              pre += 1;
            }
            return `${pre}.${post}k`;
          } else if (num >= 1000000) {
            let pre = Math.floor(num / 1000000);
            let post = Math.round((num % 1000000) / 100000);
            if (post === 10) {
              post = 0;
              pre += 1;
            }
            return `${pre}.${post}m`;
          }
        }

        const rows = document.querySelectorAll("tr[data-item-id]");
        if (rows.length > 0) {
          const avgPriceHeader = document.querySelector(
            "th.marketplaceView-table-averagePrice"
          );

          // TODO: Possibly implement Value sort and fix Avg. Price sort (esp with -, k, m)
          //  Seems to touch many hg.* functions though
          const valueHeader = document.createElement("th");
          valueHeader.innerText = "Value";
          valueHeader.className =
            "marketplaceView-table-estvalue marketplaceView-table-numeric";

          // "marketplaceView-table-estvalue marketplaceView-table-numeric sortable";
          // valueHeader.setAttribute("data-property", "value");
          // valueHeader.onclick = function() {
          //   hg.views.MarketplaceView.setSortOrder(this);
          //   return false;
          // };

          if (
            avgPriceHeader &&
            !document.querySelector(".marketplaceView-table-estvalue")
          ) {
            // Add 'Value' column header
            avgPriceHeader.insertAdjacentElement("afterend", valueHeader);

            rows.forEach(row => {
              // Add click handlers to the <a>'s that open up an item page
              row.querySelectorAll("a").forEach(el => {
                const aText = el.onclick;
                if (aText) {
                  if (aText.toString().indexOf("showItem") >= 0) {
                    el.addEventListener("click", function() {
                      // Parse current item name and type for caching
                      const name = row.querySelector(
                        ".marketplaceView-table-name"
                      );

                      if (name && itemType) {
                        // Retrieve and overwrite localStorage
                        const lsText = localStorage.getItem(
                          "marketplace-browse-cache-tsitu"
                        );
                        if (lsText) {
                          const lsObj = JSON.parse(lsText);
                          lsObj[itemType.textContent] = name.textContent;
                          localStorage.setItem(
                            "marketplace-browse-cache-tsitu",
                            JSON.stringify(lsObj)
                          );
                        }
                      }
                    });
                  }
                }
              });

              // Parse owned quantity
              let ownedNum = 0;
              const ownedText = row.querySelector(
                ".marketplaceView-table-quantity"
              ).textContent;
              if (ownedText !== "-") {
                ownedNum = parseInt(ownedText.split(",").join(""));
              }

              // Parse average prices
              let priceNum = 0;
              const priceText = row.querySelector(".marketplaceView-goldValue");
              if (priceText.children.length > 0) {
                priceNum = parseInt(
                  priceText.children[0].title
                    .split(" ")[0]
                    .split(",")
                    .join("")
                );
              }

              const multValue = ownedNum * priceNum;
              if (multValue > 0) {
                totalValueSum += multValue;
                row.title = `${multValue.toLocaleString()} Gold`;
              }

              let outputText = abbrev(multValue);
              if (priceNum === 0) {
                // Avg. Price currently unavailable, but value isn't necessarily 0
                outputText = "N/A";
              }

              const valueColumn = document.createElement("td");
              valueColumn.innerText = outputText;
              valueColumn.className =
                "marketplaceView-table-numeric value-column-tsitu";

              // Feature: Insert 'Own' x 'Avg. Price' = 'Value' column data
              row
                .querySelector(".marketplaceView-table-averagePrice")
                .insertAdjacentElement("afterend", valueColumn);
            });
          }
        }

        // Add info to the sidebar
        if (sidebar && !document.querySelector(".marketplace-sidebar-tsitu")) {
          // Container div
          const div = document.createElement("div");
          div.className = "marketplace-sidebar-tsitu";
          div.style.margin = "20px";

          // Highlighted text
          const span1 = document.createElement("span");
          span1.style.backgroundColor = "#D6EBA1";
          span1.innerText = "Highlighted row";

          // Other text
          const span2 = document.createElement("span");
          span2.innerText = " indicates the most recently viewed item";

          // Inject into DOM
          div.appendChild(span1);
          div.appendChild(span2);
          sidebar.appendChild(div);
        }

        // Feature: Add <span> with sum of values on current tab
        const filterDiv = document.querySelector(
          ".marketplaceView-browse-filterContainer"
        );
        if (
          filterDiv &&
          !document.querySelector(".marketplace-total-value-tsitu")
        ) {
          const span = document.createElement("span");
          span.className = "marketplace-total-value-tsitu";
          span.innerText = `(Total estimated value on this tab: ${abbrev(
            totalValueSum
          )} or ${totalValueSum.toLocaleString()} Gold)`;
          span.style.fontSize = "12px";
          span.style.fontWeight = "normal";

          const emptySpace = document.createElement("span");
          emptySpace.innerHTML = "\u00A0\u00A0\u00A0";

          // Inject into DOM
          filterDiv.insertAdjacentElement("beforebegin", emptySpace);
          filterDiv.insertAdjacentElement("beforebegin", span);
        }

        // Feature: Check cache for most recently clicked item and scroll to it
        const lsText = localStorage.getItem("marketplace-browse-cache-tsitu");
        if (lsText) {
          const lsObj = JSON.parse(lsText);
          const itemType = sidebar.querySelector(
            ".marketplaceView-browse-sidebar-link.active"
          );
          if (itemType) {
            const name = lsObj[itemType.textContent];
            if (name && name !== 0) {
              /**
               * Return row element that matches existing cached item name
               * @param {string} name Cached item name
               * @return {HTMLElement|false} <tr> that should be highlighted and scrolled to
               */
              function findElement(name) {
                for (let el of document.querySelectorAll("tr[data-item-id]")) {
                  const aTags = el.querySelectorAll("a");
                  if (aTags.length === 5) {
                    if (name === aTags[2].textContent) {
                      return el;
                    }
                  }
                }

                return false;
              }

              // Calculate index for nth-child
              const targetEl = findElement(name);
              let nthChildValue = 0;
              for (let i = 0; i < rows.length; i++) {
                const el = rows[i];
                if (el === targetEl) {
                  nthChildValue = i + 2;
                  break;
                }
              }

              // tr:nth-child value (min = 2)
              const recentRow = document.querySelector(
                `.marketplaceView-table tr:nth-child(${nthChildValue})`
              );
              if (recentRow) {
                recentRow.style.backgroundColor = "#D6EBA1";

                // Try scrolling up to 4 rows down
                let scrollRow = recentRow;
                for (let i = 4; i > 0; i--) {
                  const row = document.querySelector(
                    `.marketplaceView-table tr:nth-child(${nthChildValue + i})`
                  );
                  if (row) {
                    scrollRow = row;
                    break;
                  }
                }

                scrollRow.scrollIntoView({
                  // Seems to wait for XHR & render - slow initially but gets moderately faster
                  behavior: "auto",
                  block: "nearest",
                  inline: "nearest"
                });
              }
            }
          }
        }
      } else if (backButton) {
        /* Listing logic (active 'Back' button) */

        // Feature: Inject tariff info into Quick Purchase/Sell rows
        // Works on Buy/Sell screens, but not 'View More' b/c NodeList.length = 2

        const quickPurchase = document.querySelectorAll(
          ".marketplaceView-roundedTable"
        )[2];

        if (quickPurchase) {
          const goldValues = quickPurchase.querySelectorAll(
            "td .marketplaceView-goldValue"
          );

          if (goldValues.length > 0) {
            goldValues.forEach(el => {
              const rawVal = el.textContent;
              if (typeof rawVal === "string") {
                const value = parseInt(rawVal.split(",").join(""));
                const tax = Math.ceil(value / 11);
                const preTax = value - tax;
                const titleString = `\nPre-Tax: ${preTax.toLocaleString()} Gold\nTariff: ${tax.toLocaleString()} Gold`;

                // Check for repeated appends
                if (el.title.indexOf("Tariff") < 0) el.title += titleString;

                // Add a reversible onclick with same info as title
                if (!el.onclick) {
                  function initHandler() {
                    el.className = "tsitu-null";
                    el.innerText = el.title;
                    el.onclick = revertHandler;
                  }

                  function revertHandler() {
                    el.className = "marketplaceView-goldValue";
                    el.innerText = el.title.split("Gold")[0].trim();
                    el.onclick = initHandler;
                  }

                  el.onclick = initHandler;
                }
              }
            });
          }
        }

        const quickSell = document.querySelectorAll(
          ".marketplaceView-roundedTable"
        )[3];

        if (quickSell) {
          const goldValues = quickSell.querySelectorAll(
            "td .marketplaceView-goldValue"
          );

          if (goldValues.length > 0) {
            goldValues.forEach(el => {
              const rawVal = el.textContent;
              if (typeof rawVal === "string") {
                const value = parseInt(rawVal.split(",").join(""));
                const tax = Math.ceil(value / 10);
                const postTax = value + tax;
                const titleString = `\nPost-Tax: ${postTax.toLocaleString()} Gold\nTariff: ${tax.toLocaleString()} Gold`;

                // Check for repeated appends
                if (el.title.indexOf("Tariff") < 0) el.title += titleString;

                // Add a reversible onclick with same info as title
                if (!el.onclick) {
                  function initHandler() {
                    el.className = "tsitu-null";
                    el.innerText = el.title;
                    el.onclick = revertHandler;
                  }

                  function revertHandler() {
                    el.className = "marketplaceView-goldValue";
                    el.innerText = el.title.split("Gold")[0].trim();
                    el.onclick = initHandler;
                  }

                  el.onclick = initHandler;
                }
              }
            });
          }
        }

        // Feature: More Quick Links
        const orderButton = document.querySelector(
          ".mousehuntActionButton.marketplaceView-item-submitButton"
        );
        if (orderButton) {
          // Price suggestion parent divs
          const qtySuggest = document.querySelector(
            ".marketplaceView-item-input.quantity .marketplaceView-item-input-suggested"
          );
          const priceSuggest = document.querySelector(
            ".marketplaceView-item-input.unitPrice .marketplaceView-item-input-suggested"
          );
          const txType = orderButton.getAttribute("data-action");

          // Check existence of qtySuggest b/c directly clicking 'Sell' results in separate mutations
          if (txType === "sell" && qtySuggest) {
            // Existing 'Sell All' link to clone
            const sellAll = qtySuggest.children[0];

            // Check custom class name to prevent multiple appends
            if (sellAll && !document.querySelector(".tsitu-link-sabo")) {
              const saQty = parseInt(sellAll.getAttribute("data-quantity"));
              if (saQty > 1) {
                const sellAllButOne = sellAll.cloneNode();
                sellAllButOne.className = "tsitu-link-sabo";
                sellAllButOne.setAttribute("data-quantity", saQty - 1);
                sellAllButOne.innerText = `[ Sell All But One: ${saQty - 1} ]`;
                qtySuggest.appendChild(sellAllButOne);
              }
            }

            const firstRow = quickPurchase.querySelector(
              "td .marketplaceView-goldValue"
            );
            if (firstRow) {
              const rawVal = firstRow.textContent;
              if (typeof rawVal === "string") {
                const value = parseInt(rawVal.split(",").join(""));
                const tax = Math.ceil(value / 11);
                const preTax = value - tax;
                const diff = Math.max(1, Math.round(preTax * 0.0001));

                let offerValue = preTax;
                if (offerValue - diff > 11) {
                  offerValue = offerValue - diff;
                }

                // Generate <a> manually, not guaranteed an existing link
                const boMinusLink = document.createElement("a");
                boMinusLink.href = "#";
                boMinusLink.onclick = function() {
                  hg.views.MarketplaceView.setOrderPrice(this);
                  return false;
                };
                boMinusLink.className =
                  "marketplaceView-goldValue tsitu-link-bo-minus";
                boMinusLink.setAttribute("data-price", offerValue);
                boMinusLink.innerText = `[ Best Offer - 0.01%: ${offerValue.toLocaleString()} ]`;
                if (!document.querySelector(".tsitu-link-bo-minus")) {
                  priceSuggest.appendChild(boMinusLink);
                }
              }
            }
          } else if (txType === "buy") {
            const firstRow = quickSell.querySelector(
              "td .marketplaceView-goldValue"
            );
            if (firstRow) {
              const rawVal = firstRow.textContent;
              if (typeof rawVal === "string") {
                const value = parseInt(rawVal.split(",").join(""));
                const tax = Math.ceil(value / 10);
                const postTax = value + tax;
                const diff = Math.max(1, Math.round(postTax * 0.0001));

                let offerValue = postTax;
                if (offerValue + diff < 999999999) {
                  offerValue = offerValue + diff;
                }

                // Generate <a> manually, not guaranteed an existing link
                const boPlusLink = document.createElement("a");
                boPlusLink.href = "#";
                boPlusLink.onclick = function() {
                  hg.views.MarketplaceView.setOrderPrice(this);
                  return false;
                };
                boPlusLink.className =
                  "marketplaceView-goldValue tsitu-link-bo-plus";
                boPlusLink.setAttribute("data-price", offerValue);
                boPlusLink.innerText = `[ Best Offer + 0.01%: ${offerValue.toLocaleString()} ]`;
                if (!document.querySelector(".tsitu-link-bo-plus")) {
                  priceSuggest.appendChild(boPlusLink);
                }
              }
            }
          }
        }
      }

      // Re-observe after mutation-inducing logic
      observer.observe(observerTarget, {
        childList: true,
        subtree: true
      });
    }
  });

  // Initial observe
  observer.observe(observerTarget, {
    childList: true,
    subtree: true
  });
})();
