// ==UserScript==
// @name         MouseHunt - TEM Catch Stats
// @author       Tran Situ (tsitu)
// @namespace    https://greasyfork.org/en/users/232363-tsitu
// @version      1.4
// @description  Adds catch/crown statistics next to mouse names on the TEM
// @match        http://www.mousehuntgame.com/*
// @match        https://www.mousehuntgame.com/*
// ==/UserScript==

(function() {
  // Observers are attached to a *specific* element (will DC if removed from DOM)
  const observerTarget = document.getElementById("tabbarContent_page");
  if (observerTarget) {
    MutationObserver =
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver;

    const observer = new MutationObserver(function() {
      // Callback
      const labels = document.getElementsByClassName(
        "campPage-trap-trapEffectiveness-difficultyGroup-label"
      );

      // Render if difficulty labels are in DOM
      if (labels.length > 0) {
        // Disconnect and reconnect later to prevent infinite mutation loop
        observer.disconnect();

        // Clear out old spans
        // Uses static collection instead of live one from getElementsByClassName
        document.querySelectorAll(".temcatches").forEach(el => el.remove());

        render();

        observer.observe(observerTarget, {
          childList: true,
          subtree: true
        });
      }
    });

    observer.observe(observerTarget, {
      childList: true,
      subtree: true
    });
  }

  function postReq(form) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        `https://www.mousehuntgame.com/managers/ajax/users/profiletabs.php?action=badges&snuid=${
          user.sn_user_id
        }`,
        true
      );
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          resolve(this);
        }
      };
      xhr.onerror = function() {
        reject(this);
      };
      xhr.send(form);
    });
  }

  function render() {
    // Render crown image and catch number next to mouse name
    const rawStore = localStorage.getItem("mh-catch-stats");
    if (rawStore) {
      const stored = JSON.parse(rawStore);

      // Clean up ' Mouse' affixes
      const newStored = {};
      const storedKeys = Object.keys(stored);
      storedKeys.forEach(key => {
        if (key.indexOf(" Mouse") >= 0) {
          const newKey = key.split(" Mouse")[0];
          newStored[newKey] = stored[key];
        } else {
          newStored[key] = stored[key];
        }
      });

      const rows = document.querySelectorAll(
        ".campPage-trap-trapEffectiveness-mouse-name"
      );

      if (rows) {
        // Adjust container height
        document
          .querySelectorAll(".campPage-trap-trapEffectiveness-mouse")
          .forEach(el => {
            el.style.height = "auto";
          });

        rows.forEach(row => {
          const name = row.textContent;
          const catches = newStored[name];

          const span = document.createElement("span");
          span.className = "temcatches";

          const outer = document.createElement("span");
          outer.className = "mousebox";
          outer.style.verticalAlign = "bottom";
          outer.style.width = "auto";
          outer.style.height = "auto";
          outer.style.margin = "0px";

          const inner = document.createElement("span");
          if (catches >= 10 && catches < 100) {
            inner.className = "numcatches bronze";
          } else if (catches >= 100 && catches < 500) {
            inner.className = "numcatches silver";
          } else if (catches >= 500) {
            inner.className = "numcatches gold";
          }
          inner.style.backgroundSize = "contain";
          inner.style.paddingRight = "20px";
          inner.innerText = catches || 0;

          outer.appendChild(inner);
          span.appendChild(document.createElement("br"));
          span.appendChild(outer);
          row.appendChild(span);
        });
      }
    }

    const oldButton = document.getElementById("tem-catches-refresh-button");
    if (oldButton) oldButton.remove();

    // Render 'Refresh Data' button
    const refreshButton = document.createElement("button");
    refreshButton.id = "tem-catches-refresh-button";
    refreshButton.innerText = "Refresh Crown Data";
    refreshButton.addEventListener("click", function() {
      postReq("sn=Hitgrab&hg_is_ajax=1").then(res => {
        parseData(res);
      });
    });

    const container = document.getElementsByClassName(
      "campPage-trap-trapEffectiveness-content"
    )[0];
    if (container) container.appendChild(refreshButton);
  }

  /**
   * Parse badge endpoint response and write to localStorage
   * @param {string} res
   */
  function parseData(res) {
    let response = null;
    try {
      if (res) {
        response = JSON.parse(res.responseText);
        const badgeData = response["mouse_data"];
        const remainData = response["remaining_mice"];
        const catchData = {};

        for (let key of Object.keys(badgeData)) {
          catchData[badgeData[key]["name"]] = badgeData[key]["num_catches"];
        }

        for (let el of remainData) {
          const split = el["name"].split(" (");
          catchData[split[0]] = parseInt(split[1][0]);
        }

        localStorage.setItem("mh-catch-stats", JSON.stringify(catchData));

        // Close and reopen to update badges (prevents infinite render loop)
        app.pages.CampPage.closeBlueprintDrawer();
        app.pages.CampPage.toggleTrapEffectiveness(true);
      }
    } catch (error) {
      console.log("Error while processing POST response");
      console.error(error.stack);
    }
  }
})();
