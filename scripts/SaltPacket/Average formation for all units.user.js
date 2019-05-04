// ==UserScript==
// @name         Average formation for all units
// @namespace    SaltPacket
// @version      1.1.0
// @description  Adds average song length and notes per attribute for both µ's and Aqours.
// @author       SaltPacket
// @match        https://designedfor.sakura.ne.jp/nikuma-n/school-idol-festival/formation.html
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/js-cookie@2.2.0/src/js.cookie.min.js
// ==/UserScript==

/**
 * Thirty days in milliseconds.
 */
const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30;

/**
 * Gets song data.
 *
 * Saves data to localStorage which is automatically invalidated every thirty
 * days.
 *
 * @return {object}
 *   The average expert song data, keyed by attribute, each containing time
 *   and notes count average. Also timestamp key for when the song data was last
 *   checked.
 */
async function getData() {
  const savedData = JSON.parse(localStorage.getItem('songData'));
  // Check saved data exists and is fresh.
  if (savedData && ((Date.now() - savedData.timestamp) < THIRTY_DAYS)) {
    return savedData;
  }

  const fetchedData = await (await fetch('songs.json')).json();

  // Set timestamp for freshness checks in the future.
  const averages = {
    timestamp: Date.now(),
  };

  // Cycle through attributes.
  ['smile', 'pure', 'cool'].forEach(attribute => {
    const aqours = fetchedData.average.Aqours.expert[attribute];
    const μs = fetchedData.average[`μ's`].expert[attribute];

    averages[attribute] = {
      time: (aqours.times + μs.times) / 2,
      notes: (aqours.notes + μs.notes) / 2,
    };
  });

  // Save data.
  localStorage.setItem('songData', JSON.stringify(averages));

  return averages;
}

/**
 * Set average values into input elements.
 *
 * @param {'smile'|'pure'|'cool'} attribute
 *   The attribute to get the expert song average for.
 * @param {object} params
 *   Additional parameters of the data to apply.
 * @param {object} params.data
 *   The data of averages as returned by getData().
 * @param {HTMLInputElement} params.lengthInput
 *   The song length input element.
 * @param {HTMLInputElement} params.notesInput
 *   The notes count input element.
 */
function setAverages(attribute, { data, lengthInput, notesInput }) {
  lengthInput.value = data[attribute].time;
  notesInput.value = data[attribute].notes;
}

/**
 * Adds a clear button to the DOM.
 *
 * @param {object} inputElements
 *   The input elements to clear.
 * @param {HTMLInputElement} inputElements.lengthInput
 *   The song length input.
 * @param {HTMLInputElement} inputElements.notesInput
 *   The song note count input.
 */
function createClearButton({ lengthInput, notesInput }) {
  const button = document.createElement('li');
  button.id = 'do-clear';
  button.innerText = 'Clear';

  button.addEventListener('click', event => {
    event.preventDefault();
    lengthInput.value = '';
    notesInput.value = '';
  });

  document.getElementById('do-toggle-option').insertAdjacentElement('afterend', button);
}

(async () => {
  const data = getData();

  const setParameters = {
    data: await data,
    lengthInput: document.getElementById('dat-time'),
    notesInput: document.getElementById('dat-notes'),
  };
  const attributeSelector = document.getElementById('dat-attribute');

  attributeSelector.addEventListener('click', async event => {
    setAverages(event.target.dataset.value, setParameters);
  });

  setAverages(Cookies.get('attribute') || 'smile', setParameters);

  createClearButton(setParameters);
})();
