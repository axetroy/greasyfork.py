// ==UserScript==
// @name         Greasy Fork - Add Unlisted Script Section
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  Moves your unlisted scripts into a separate section on your user page
// @author       Valacar
// @match        https://greasyfork.org/*/users/*
// @grant        none
// ==/UserScript==

(function() {
  "use strict";

  const user_script_list = document.querySelector("#user-script-list");
  if (!user_script_list) return;

  const section_parent = user_script_list.parentNode.parentNode;
  if (!section_parent) return;

  const fragment = document.createDocumentFragment();
  let has_unlisted_scripts = false;

  // get all unlisted script LI tags and combine into one doc fragment
  const scripts = user_script_list.querySelectorAll("li");
  for (let script of scripts) {
    if (script.dataset.scriptType === "unlisted") {
      fragment.appendChild(script);
      has_unlisted_scripts = true;
    }
  }

  if (!has_unlisted_scripts) return;

  // add a new section after Scripts
  section_parent.insertAdjacentHTML("beforeend", `
<section>
  <div class="list-option-groups"></div>
  <header>
    <h3>Unlisted Scripts</h3>
  </header>
  <ol id="unlisted-script-list" class="script-list"></ol>
</section>`
  );

  // append unlisted script LI tags into OL tag
  const unlisted_script_list = document.querySelector("#unlisted-script-list");
  if (unlisted_script_list && fragment) {
    unlisted_script_list.appendChild(fragment);
  }

})();