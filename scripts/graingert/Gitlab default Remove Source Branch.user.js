// ==UserScript==
// @name         Gitlab default Remove Source Branch
// @version      0.0.3
// @description  check the gitlab remove source branch inputs by default
// @author       Thomas Grainger
// @include      /^https?:\/\/.*\/.*\/.*\/merge_requests\/(new|\d+)/
// @grant        none
// @namespace https://greasyfork.org/users/32146
// ==/UserScript==
Array.prototype.map.call(document.querySelectorAll('input[type="checkbox"][id="merge_request_force_remove_source_branch"], input[type="checkbox"][id="remove-source-branch-input"]'), function (node) {
    node.checked = true;
    Object.defineProperty(node, 'checked', {
      set: function () { },
      get: function () { return true; },
    });
});
