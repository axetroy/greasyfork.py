// ==UserScript==
// @name         [MTurk Worker] Auto Accept Unchecker
// @namespace    https://github.com/Kadauchi
// @version      1.0.0
// @description  Keeps the auto accept next hit checkbox always unchecked.
// @author       Kadauchi
// @icon         http://i.imgur.com/oGRQwPN.png
// @include      https://worker.mturk.com/projects/*/tasks/*?assignment_id=*
// ==/UserScript==

(function() {
  const checkbox = document.querySelector(`[data-react-class="require('reactComponents/workPipeline/AutoAcceptCheckbox')['default']"]`).getElementsByTagName(`input`)[0];
  if (checkbox.checked ) checkbox.click();
})();