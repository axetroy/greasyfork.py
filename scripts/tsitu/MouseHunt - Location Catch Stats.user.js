// ==UserScript==
// @name         MouseHunt - Location Catch Stats
// @author       Tran Situ (tsitu)
// @namespace    https://greasyfork.org/en/users/232363-tsitu
// @version      1.1
// @description  Shows caught and uncaught mouse breeds for every location
// @match        http://www.mousehuntgame.com/*
// @match        https://www.mousehuntgame.com/*
// ==/UserScript==

(function() {
  // Inject link into UI
  const target = document.querySelector(".mousehuntHud-gameInfo");
  if (target) {
    const link = document.createElement("a");
    link.innerText = "[Location Info]";
    link.addEventListener("click", function() {
      render();
      return false; // Prevent default link clicked behavior
    });
    target.prepend(link);
  }

  /**
   * Logic to generate the popup
   */
  function render() {
    const existing = document.querySelector("#tsitu-location-stats");
    if (existing) existing.remove();

    const detailDiv = document.createElement("div");
    detailDiv.style.textAlign = "left";

    // Get cached overall data
    const overallRaw = localStorage.getItem("tsitu-location-overall-stats");
    if (overallRaw) {
      const overall = JSON.parse(overallRaw);
      let selfTotal = 0;
      let sumTotal = 0;

      // Cached detailed stats
      const statsObj =
        JSON.parse(localStorage.getItem("tsitu-location-detailed-stats")) || {};

      // Previously opened details
      const prevOpen =
        JSON.parse(localStorage.getItem("tsitu-location-opened")) || {};

      const completeArr = [];
      const incompleteArr = [];
      for (let loc of Object.keys(overall)) {
        const data = overall[loc];
        if (data.caught === data.total) {
          completeArr.push(loc);
        } else {
          incompleteArr.push(loc);
        }
      }

      // Create 'Incomplete' <details> element (open by default)
      const incompleteDetail = document.createElement("details");
      incompleteDetail.style.fontSize = "16px";
      incompleteDetail.open = true;

      const incompleteSummary = document.createElement("summary");
      incompleteSummary.innerText = "Incomplete";
      incompleteDetail.appendChild(incompleteSummary);

      // Create 'Expand/Collapse All' checkbox for 'Incomplete'
      const incompleteLabel = document.createElement("label");
      incompleteLabel.className = "tsitu-incomplete-box-label";
      incompleteLabel.htmlFor = "tsitu-incomplete-box";
      incompleteLabel.innerText = "Expand/Collapse All";
      incompleteLabel.style.fontSize = "12px";

      const incompleteBox = document.createElement("input");
      incompleteBox.id = "tsitu-incomplete-box";
      incompleteBox.name = "tsitu-incomplete-box";
      incompleteBox.type = "checkbox";
      incompleteBox.checked =
        localStorage.getItem("tsitu-location-expand-incomplete") == "1";

      incompleteBox.addEventListener("click", function() {
        if (document.querySelector("#tsitu-incomplete-box").checked) {
          document.querySelectorAll(".tsitu-incomplete-detail").forEach(el => {
            el.open = true;
          });
          localStorage.setItem("tsitu-location-expand-incomplete", 1);
        } else {
          document.querySelectorAll(".tsitu-incomplete-detail").forEach(el => {
            el.open = false;
          });
          localStorage.setItem("tsitu-location-expand-incomplete", 0);
        }
        cacheOpenedDetails();
      });

      // Insert 'Incomplete' checkbox
      incompleteSummary.insertAdjacentElement(
        "afterend",
        document.createElement("br")
      );
      incompleteSummary.insertAdjacentElement(
        "afterend",
        document.createElement("br")
      );
      incompleteSummary.insertAdjacentElement("afterend", incompleteLabel);
      incompleteSummary.insertAdjacentElement("afterend", incompleteBox);
      incompleteSummary.insertAdjacentElement(
        "afterend",
        document.createElement("br")
      );

      // Generate incomplete location details
      for (let loc of incompleteArr.sort()) {
        generateDetail(loc, "incomplete");
      }

      // Create 'Complete' <details> element (closed by default)
      const completeDetail = document.createElement("details");
      completeDetail.style.fontSize = "16px";

      const completeSummary = document.createElement("summary");
      completeSummary.innerText = "Complete";
      completeDetail.appendChild(completeSummary);

      // Create 'Expand/Collapse All' checkbox for 'Complete'
      const completeLabel = document.createElement("label");
      completeLabel.className = "tsitu-complete-box-label";
      completeLabel.htmlFor = "tsitu-complete-box";
      completeLabel.innerText = "Expand/Collapse All";
      completeLabel.style.fontSize = "12px";

      const completeBox = document.createElement("input");
      completeBox.id = "tsitu-complete-box";
      completeBox.type = "checkbox";
      completeBox.checked =
        localStorage.getItem("tsitu-location-expand-complete") == "1";

      completeBox.addEventListener("click", function() {
        if (document.querySelector("#tsitu-complete-box").checked) {
          document.querySelectorAll(".tsitu-complete-detail").forEach(el => {
            el.open = true;
          });
          localStorage.setItem("tsitu-location-expand-complete", 1);
        } else {
          document.querySelectorAll(".tsitu-complete-detail").forEach(el => {
            el.open = false;
          });
          localStorage.setItem("tsitu-location-expand-complete", 0);
        }
        cacheOpenedDetails();
      });

      // Insert 'Complete' checkbox
      completeSummary.insertAdjacentElement(
        "afterend",
        document.createElement("br")
      );
      completeSummary.insertAdjacentElement(
        "afterend",
        document.createElement("br")
      );
      completeSummary.insertAdjacentElement("afterend", completeLabel);
      completeSummary.insertAdjacentElement("afterend", completeBox);
      completeSummary.insertAdjacentElement(
        "afterend",
        document.createElement("br")
      );

      // Generate completed location details
      for (let loc of completeArr.sort()) {
        generateDetail(loc, "complete");
      }

      /**
       * Generate inner <details> elements for main "Incomplete" and "Complete"
       * @param {string} loc Location name
       * @param {string} type "incomplete" or "complete"
       */
      function generateDetail(loc, type) {
        const data = overall[loc];
        selfTotal += data.caught;
        sumTotal += data.total;

        const detail = document.createElement("details");
        detail.className =
          type === "complete"
            ? "tsitu-complete-detail"
            : "tsitu-incomplete-detail";
        detail.style.fontSize = "14px";
        detail.style.marginBottom = "5px";

        // Check if previously opened
        if (prevOpen["open"] && prevOpen["open"].indexOf(loc) >= 0) {
          detail.open = true;
        }

        const summary = document.createElement("summary");
        summary.innerText = `${loc} (${data.caught} of ${data.total})`;

        const refreshButton = document.createElement("button");
        refreshButton.innerText = "Update";
        refreshButton.addEventListener("click", function() {
          const index = data.type || 0;
          if (index > 0) requestLocation(index, loc);
        });

        const updateSpan = document.createElement("span");
        updateSpan.style.fontStyle = "italic";
        updateSpan.style.fontSize = "12px";
        updateSpan.innerText = `Updated: ${
          statsObj[loc]
            ? new Date(parseInt(statsObj[loc]["date"])).toLocaleString()
            : "N/A"
        }`;

        // Build body text
        const innerSpan = document.createElement("span");
        let statsText = "\n\n";
        if (statsObj[loc]) {
          let missText = "Not yet caught here: \n";
          const missArr = statsObj[loc]["missing"];

          if (missArr.length === 0) {
            missText =
              "All breeds available in this location\nhave been caught here.\n";
          } else {
            missArr.forEach(el => {
              missText += `- ${el}\n`;
            });
          }

          let caughtText = "";
          const hideCaught =
            localStorage.getItem("tsitu-location-hideCaught") == "1";

          if (!hideCaught) {
            const caughtArr = statsObj[loc]["caught"];
            if (caughtArr.length > 0) {
              caughtText = "Breeds caught here: \n";
              caughtArr.forEach(el => {
                caughtText += `- ${el[0]} (${el[1]})\n`;
              });
              caughtText += "\n";
            }
          }

          statsText += `${missText}\n${caughtText}`;
        }

        innerSpan.innerText += statsText;
        innerSpan.appendChild(refreshButton);
        innerSpan.appendChild(document.createElement("br"));
        innerSpan.appendChild(document.createElement("br"));

        detail.appendChild(summary);
        detail.appendChild(document.createElement("br"));
        detail.appendChild(updateSpan);
        detail.appendChild(innerSpan);

        // Append to the appropriate main <details>
        type === "complete"
          ? completeDetail.appendChild(detail)
          : incompleteDetail.appendChild(detail);
      }

      // TODO: sumTotal only includes locations unlocked for user
      const totalSpan = document.createElement("span");
      totalSpan.style.fontSize = "16px";
      totalSpan.innerText = `Total: ${selfTotal} / ${sumTotal}`;

      // Append elements to detailDiv
      detailDiv.appendChild(incompleteDetail);
      detailDiv.appendChild(document.createElement("br"));
      detailDiv.appendChild(completeDetail);
      detailDiv.appendChild(document.createElement("br"));
      detailDiv.appendChild(totalSpan);
    }

    // Create and style the main <div>
    const mainDiv = document.createElement("div");
    mainDiv.id = "tsitu-location-stats";
    mainDiv.style.backgroundColor = "#F5F5F5";
    mainDiv.style.position = "absolute";
    mainDiv.style.zIndex = "9999";
    mainDiv.style.left = "35%";
    mainDiv.style.top = "25px";
    mainDiv.style.border = "solid 3px #696969";
    mainDiv.style.borderRadius = "20px";
    mainDiv.style.padding = "10px";
    mainDiv.style.textAlign = "center";

    const closeButton = document.createElement("button");
    closeButton.innerText = "x";
    closeButton.addEventListener("click", function() {
      document.body.removeChild(mainDiv);
    });

    const titleSpan = document.createElement("span");
    titleSpan.innerText = "Location Catch Stats";
    titleSpan.style.fontWeight = "bold";
    titleSpan.style.fontSize = "22px";

    const overallUpdateSpan = document.createElement("span");
    const cachedDate = localStorage.getItem("tsitu-location-overall-updated");
    overallUpdateSpan.innerText = `Last updated (overall data): ${
      cachedDate ? new Date(parseInt(cachedDate)).toLocaleString() : "N/A"
    }`;

    const updateOverallButton = document.createElement("button");
    updateOverallButton.innerText = "Update overall completion data";
    updateOverallButton.addEventListener("click", function() {
      updateOverallData();
    });

    // Checkbox to hide text for caught mice
    const hideCaughtLabel = document.createElement("label");
    hideCaughtLabel.className = "tsitu-hideCaught-box-label";
    hideCaughtLabel.htmlFor = "tsitu-hideCaught-box";
    hideCaughtLabel.innerText = "Hide caught mice";
    hideCaughtLabel.style.fontSize = "12px";

    const hideCaughtBox = document.createElement("input");
    hideCaughtBox.id = "tsitu-hideCaught-box";
    hideCaughtBox.name = "tsitu-hideCaught-box";
    hideCaughtBox.type = "checkbox";
    hideCaughtBox.checked =
      localStorage.getItem("tsitu-location-hideCaught") == "1";

    hideCaughtBox.addEventListener("click", function() {
      if (document.querySelector("#tsitu-hideCaught-box").checked) {
        localStorage.setItem("tsitu-location-hideCaught", 1);
      } else {
        localStorage.setItem("tsitu-location-hideCaught", 0);
      }
      cacheOpenedDetails();
      render();
    });

    // Append everything to mainDiv and document
    mainDiv.appendChild(closeButton);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(titleSpan);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(overallUpdateSpan);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(updateOverallButton);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(hideCaughtBox);
    mainDiv.appendChild(hideCaughtLabel);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(detailDiv);
    document.body.appendChild(mainDiv);

    // Reposition current location <details> to the top
    let currentDetail;
    let currentLoc = user.location || "N/A";
    if (currentLoc === "Twisted Garden") {
      currentLoc = "Living Garden";
    } else if (currentLoc === "Cursed City") {
      currentLoc = "Lost City";
    } else if (currentLoc === "Sand Crypts") {
      currentLoc = "Sand Dunes";
    }

    document.querySelectorAll("#tsitu-location-stats summary").forEach(el => {
      if (el.textContent.indexOf(currentLoc) >= 0) {
        currentDetail = el.parentElement;
        el.parentElement.remove();
      }
    });

    if (currentDetail) {
      currentDetail.className = "tsitu-current-detail";
      currentDetail.style.textAlign = "left";
      currentDetail.open = true;
      detailDiv.insertAdjacentElement("beforebegin", currentDetail);
      detailDiv.insertAdjacentElement(
        "beforebegin",
        document.createElement("br")
      );
    }
  }

  /**
   * Cache location names for <details> with open = true
   */
  function cacheOpenedDetails() {
    const obj = {};
    const arr = [];

    document
      .querySelectorAll(
        "#tsitu-location-stats details:not(.tsitu-current-detail)"
      )
      .forEach(el => {
        if (el.open) {
          const summary = el.querySelector("summary").textContent;
          if (summary !== "Complete" && summary !== "Incomplete") {
            const loc = summary.split(" (")[0];
            arr.push(loc);
          }
        }
      });

    obj["open"] = arr;
    localStorage.setItem("tsitu-location-opened", JSON.stringify(obj));
  }

  /**
   * Fetch overall/total completion data from getstat.php
   */
  function updateOverallData() {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      "https://www.mousehuntgame.com/managers/ajax/mice/getstat.php?action=getMiceByEnv&fetch_categories=1"
    );

    xhr.onload = function() {
      const response = JSON.parse(xhr.responseText);
      const locations = response.categories.location;
      if (locations) {
        const masterObj = {};

        for (let key of Object.keys(locations)) {
          const loc = locations[key];
          const obj = {};
          obj["caught"] = loc.caught;
          obj["total"] = loc.total;
          obj["type"] = loc.type;
          masterObj[loc.name] = obj;
        }

        localStorage.setItem(
          "tsitu-location-overall-stats",
          JSON.stringify(masterObj)
        );
        localStorage.setItem("tsitu-location-overall-updated", Date.now());
        render();
      }
    };

    xhr.onerror = function() {
      console.error(xhr.statusText);
    };

    xhr.send();
  }

  /**
   * Fetch individual location data from getstat.php
   * @param {number} index Location index for category param
   * @param {string} locationName
   */
  function requestLocation(index, locationName) {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `https://www.mousehuntgame.com/managers/ajax/mice/getstat.php?action=getMiceByEnv&fetch_categories=0&category=${index}`,
      true
    );

    xhr.onload = function() {
      const response = JSON.parse(xhr.responseText);
      const stats = response.miceStat;
      if (stats) {
        const missedArr = [];
        const caughtArr = [];

        for (let key in stats) {
          const el = stats[key];
          if (el.caught === 0) {
            missedArr.push(el.name);
          } else if (el.caught > 0) {
            caughtArr.push([el.name, el.caught]);
          }
        }

        const obj = {};
        obj["missing"] = missedArr;
        obj["caught"] = caughtArr;
        obj["date"] = Date.now();

        const cacheRaw = localStorage.getItem("tsitu-location-detailed-stats");
        if (cacheRaw) {
          const cache = JSON.parse(cacheRaw);
          cache[locationName] = obj;
          localStorage.setItem(
            "tsitu-location-detailed-stats",
            JSON.stringify(cache)
          );
        } else {
          const cache = {};
          cache[locationName] = obj;
          localStorage.setItem(
            "tsitu-location-detailed-stats",
            JSON.stringify(cache)
          );
        }

        cacheOpenedDetails();
        render();
      }
    };

    xhr.onerror = function() {
      console.error(xhr.statusText);
    };

    xhr.send();
  }
})();
