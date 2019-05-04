// ==UserScript==
// @name         TV Time Simulcast Links
// @namespace    SaltPacket
// @version      0.1.3
// @description  Adds streaming links to TV Time.
// @author       SaltPacket
// @include      /^https://www\.tvtime\.com/[a-z]{2}/?$/
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/locale/ja.js
// ==/UserScript==

/**
 * Manipulates CSS selectors of a given string for specificity overriding.
 *
 * This function is meant to be used as a tagged template function.
 *
 * @param {string[]} css
 *   The CSS strings.
 *
 * @return {string}
 *   The processed CSS string.
 */
function cssSpecificityFix(css) {
  return css[0].replace(/\n\./g, "\n#to-watch .");
}

GM_addStyle(cssSpecificityFix`
.sp-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: initial;
}

.sp-nav::before,
.sp-nav::after {
  content: none;
}

.sp-button {
  border: 0;
  overflow: hidden;
  padding: 0;
  background-color: transparent;
  font-size: 12px;
  letter-spacing: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-appearance: none;
  appearance: none;
  transition: box-shadow 250ms;
}

.sp-button--amazon {
  color: #ff9900;
}
.sp-button--crunchyroll {
  color: #f37221;
}
.sp-button--hidive {
  color: #00aef0;
}
.sp-button--netflix {
  color: #e50914;
}

.sp-button:hover,
.sp-button:focus {
  box-shadow: 0 1px 0 0 currentColor;
}

.sp-button:focus {
  outline: 0;
}

.sp-fromnow {
  position: absolute;
  left: 0;
  bottom: 4px;
  padding: 0.2em 0;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  color: #fff;
  font-size: 18px;
  letter-spacing: 0;
  text-align: center;
}
`);

(() => {
  moment.locale('ja');

  // Modal form HTML
  const inputCol = 8;
  const labeCol = 12 - inputCol;
  const MODAL_ID = 'sp-form-modal';
  document.body.insertAdjacentHTML('beforeend', `
  <div class="modal fade" tabindex="-1" role="dialog" id="${MODAL_ID}">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">Add Streaming Service</h4>
        </div>
        <div class="modal-body" style="padding:15px 30px">
          <form class="form-horizontal" id="sp-form">
            <input type="hidden" name="showId"/>
            <div class="form-group">
              <label class="col-xs-${labeCol} control-label" for="url">URL</label>
              <div class="col-xs-${inputCol}">
                <input type="text" class="form-control" name="url" id="url" required autocomplete="off"/>
              </div>
            </div>
            <div class="form-group">
              <label class="col-xs-${labeCol} control-label">Schedule</label>
              <div class="col-xs-${inputCol / 2}">
                <label class="sr-only">曜日</label>
                <select class="form-control" name="曜日">
                  <option selected value disabled>曜日</option>
                  ${
                    moment.weekdaysShort()
                      .reduce((output, 曜日, i) => `${output}<option value="${i}">${曜日}</option>`, '')
                  }
                </select>
              </div>
              <div class="col-xs-${inputCol / 2}">
                <label class="sr-only">時</label>
                <input type="time" class="form-control" name="時"/>
              </div>
            </div>
            <div class="form-group">
              <div class="col-xs-offset-${labeCol} col-xs-${inputCol}">
                <button type="submit" class="btn btn-primary btn-block">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  `);

  /**
   * Reference to the modal form for editing or adding.
   *
   * @var {HTMLFormElement}
   */
  const FORM = document.getElementById('sp-form');

  // Process data submission
  FORM.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    if (!formData.has('url')) {
      return;
    }

    event.target.reset();
    $('#sp-form-modal').modal('hide');

    const 情報 = Array.from(formData.entries())
      .reduce((entry, [key, value]) => Object.assign(entry, { [key]: value }), {});
    mappings.update(情報);
  });

  // Adds show ID to the modal form for submission.
  $(`#${MODAL_ID}`).on('show.bs.modal', ({ target, relatedTarget: button }) => {
    if (button) {
      $(target).find('input[name=showId]').val(button.dataset.showId);
    }
  });

  /**
   * Capitalizes the first letter of a string.
   *
   * @param {string} string
   *   The string to capitalize.
   *
   * @return {string}
   *   The capitalized string.
   */
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
   * Match common services for styling.
   *
   * @var {RegExp}
   */
  const SERVICE_REGEX = /(amazon|hidive|crunchyroll|netflix)\./;

  const mappings = {
    /**
     * Mappings of <li> elements to their data.
     *
     * @var {weakMap}
     */
    _mapping: new WeakMap(),

    /**
     * Initializes functionality for an episode.
     *
     * @param {HTMLLIElement} episodeLi
     *   The episode list item DOM element.
     */
    init(episodeLi) {
      const nav = episodeLi.querySelector('.nav');
      const showId = episodeLi.querySelector('a[href*="/show/"]').pathname.split('/')[3];

      // Get any saved data for this show.
      const 情報 = JSON.parse(localStorage.getItem(showId)) || {};

      const elements = {
        nav,
        fromNow: this._createFromNow(情報),
        button: 情報.url ? this._createStreamingLink(情報) : this._createFormModalLink(showId),
      };

      // Set cache.
      this._mapping.set(episodeLi, Object.assign({}, { 情報 }, elements));

      // DOM operations.
      nav.classList.add('sp-nav');
      nav.insertAdjacentElement('afterbegin', elements.button);
      if (elements.fromNow) {
        episodeLi.querySelector('.image-crop').appendChild(elements.fromNow);
      }
    },

    /**
     * Updates a show's information.
     *
     * @param {object} 情報
     *   The new data to update an object with.
     */
    update(情報) {
      const li = document.querySelector(`#to-watch a[href*="/show/${情報.showId}/"]`).closest('li[id]');
      const mapping = this._mapping.get(li);

      if (mapping.情報.url) {
        const 古いServiceRegMatch = SERVICE_REGEX.exec(mapping.情報.url);
        if (古いServiceRegMatch) {
          mapping.button.classList.remove(`sp-button--${古いServiceRegMatch[1]}`);
        }

        mapping.button.href = 情報.url;
        this._stylizeStreamingLink(mapping.button, 情報);
      }
      else {
        const リンク = this._createStreamingLink(情報);
        mapping.button.replaceWith(リンク);
        mapping.button = リンク;
      }

      const fromNow = this._createFromNow(情報);
      if (fromNow && mapping.fromNow) {
        mapping.fromNow.replaceWith(fromNow);
      }
      else if (!fromNow && mapping.fromNow) {
        mapping.fromNow.remove();
      }
      else if (fromNow && !mapping.fromNow) {
        li.querySelector('.image-crop').appendChild(fromNow);
      }
      mapping.fromNow = fromNow;

      // Update data in localStorage and cache.
      localStorage.setItem(情報.showId, JSON.stringify(情報));
      mapping.情報 = 情報;
      this._mapping.set(li, mapping);
    },

    /**
     * Sets up the edit form.
     *
     * @param {Event} event
     *   The event object.
     */
    _edit(event) {
      event.preventDefault();

      const 情報 = this._mapping.get(event.target.closest('li[id]'));
      for (const [key, value] of Object.entries(情報.情報)) {
        const input = FORM.querySelector(`[name="${key}"]`);
        if (!input) {
          continue;
        }

        input.value = value;
      }

      $(`#${MODAL_ID}`).modal('show');
    },

    /**
     * Creates a link to the streaming service.
     *
     * @param {object} 情報
     *   The data for the streaming service.
     * @param {string} 情報.url
     *   Full URL to the streaming service's page for the show.
     * @param {number|boolean} [情報.曜日=false]
     *   Optional. Weekday it is simulcasted as index from 0–6. The weekday that
     *   The index represented is based on the locale. Default false.
     * @param {string} 情報.時
     *   Optional. The time the simulcast is released, in the 24-hour format
     *   HH:MM.
     *
     * @return {HTMLAnchorElement}
     *   The link element.
     */
    _createStreamingLink({ showId, url, 曜日 = false, 時 }) {
      const リンク = document.createElement('a');
      リンク.classList.add('sp-button');
      リンク.target = '_blank';
      リンク.href = url;
      リンク.dataset.showId = showId;

      this._stylizeStreamingLink(リンク, { 曜日, 時 });

      リンク.addEventListener('contextmenu', this._edit.bind(this));

      return リンク;
    },

    /**
     * Renders appropriate content into a streaming link.
     *
     * @param {HTMLAnchorElement} リンク
     *   The link element.
     * @param {object} 情報
     *   The data to render with.
     * @param {number|boolean} [情報.曜日=false]
     *   Optional. Weekday it is simulcasted as index from 0–6. The weekday that
     *   The index represented is based on the locale. Default false.
     * @param {string} 情報.時
     *   Optional. The time the simulcast is released, in the 24-hour format
     *   HH:MM.
     */
    _stylizeStreamingLink(リンク, { 曜日 = false, 時 }) {
      const serviceRegMatch = SERVICE_REGEX.exec(リンク.href);

      if (serviceRegMatch) {
        リンク.classList.add(`sp-button--${serviceRegMatch[1]}`);
        リンク.innerText = capitalizeFirstLetter(serviceRegMatch[1]);
      }
      else {
        リンク.innerText = (new URL(リンク.href)).hostname;
      }

      if (曜日 !== false || 時) {
        リンク.innerText += ` | ${moment.weekdaysShort(Number(曜日))} ${時}`;
      }

      リンク.title = リンク.innerText;
    },

    /**
     * Creates a button to open the form modal.
     *
     * @param {string} showId
     *   The ID of the show to add simulcast information for.
     *
     * @return {HTMLButtonElement}
     *   The button element.
     */
    _createFormModalLink(showId) {
      const button = document.createElement('button');
      button.classList.add('sp-button');
      button.dataset.toggle = 'modal';
      button.dataset.target = `#${MODAL_ID}`;
      button.dataset.showId = showId;
      button.innerText = '+ Add streaming';

      return button;
    },

    /**
     * Creates 'from now' message for a simulcast release.
     *
     * @param {object} 情報
     *   The data for the streaming service.
     * @param {number|boolean} 情報.曜日
     *   Weekday it is simulcasted as index from 0–6. The weekday that
     *   The index represented is based on the locale. Default false.
     * @param {string} 情報.時
     *   Optional. The time the simulcast is released, in the 24-hour format
     *   HH:MM.
     *
     * @return {HTMLSpanElement|void}
     *   The span element with the 'from now' message.
     */
    _createFromNow({ 曜日 = false, 時 }) {
      if (!曜日) {
        return;
      }

      曜日 = Number(曜日);
      const nextRelease = (new moment()).day(曜日).hour('23');

      // If entered weekday has passed, get next one.
      if ((new moment()).day() > 曜日) {
        nextRelease.add(1, 'weeks');
      }

      // Add time if entered.
      if (時) {
        const [時の時, 時の分] = 時.split(':');
        nextRelease.set({ hour: 時の時, minute: 時の分 });
      }

      // Create a from-now element if the stream date is in two days. This assumes
      // that the maximum delays of the simulcasts is two days.
      const diff = nextRelease.diff(new moment(), 'days', true);
      if (diff <= 2 && diff > 0) {
        const 今から = document.createElement('span');
        今から.innerText = nextRelease.fromNow();
        今から.classList.add('sp-fromnow');
        return 今から;
      }
    },
  };

  // Add buttons/links for each episode
  for (const episodeLi of document.querySelectorAll('#to-watch li[id]')) {
    mappings.init(episodeLi);
  }
})();
