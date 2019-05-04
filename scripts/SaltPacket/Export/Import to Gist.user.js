// ==UserScript==
// @name         Export/Import to Gist
// @namespace    SaltPacket
// @version      1.0.0
// @description  Imports and exports all your minaraishi's LLSIF team builder profiles to and from a gist.
// @author       SaltPacket
// @match        https://designedfor.sakura.ne.jp/nikuma-n/*
// @include      https://designedfor.sakura.ne.jp/nikuma-n/
// @include      https://designedfor.sakura.ne.jp/nikuma-n/school-idol-festival/*
// @grant        GM_addStyle
// ==/UserScript==
GM_addStyle(`
dialog {
  margin: auto;
  border: 0;
}
::backdrop {
  background-color: rgba(0, 0, 0, 0.6);
}

.sp-nav-item {
  display: flex;
  flex-wrap: wrap;
}
.sp-nav-item > a {
  flex: 1 0 100px;
  max-width: 100%;
}

.sp-dialog {
  box-shadow: 0 1px 5px -2px;
  padding: 1rem;
}
.sp-dialog[open] {
  animation: sp-dialog-in 0.2s cubic-bezier(0.23, 1, 0.32, 1);
}
@keyframes sp-dialog-in {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
}

.sp-dialog__title {
  margin-bottom: 1rem;
  font-size: 1.5em;
  line-height: 1;
}

.sp-form-item + .sp-form-item {
  margin-top: 1rem;
}

.sp-form-item--actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.sp-form-description {
  font-size: 0.8em;
}

.sp-button {
  border-radius: 5px;
  padding: 3px 5px;
  height: auto;
  font: inherit;
}

.sp-button--primary {
  border: 1px solid #0b613a;
  background-color: #0b613a;
  color: #fff;
}

.sp-throbber {
  background-color: transparent;
  color: #fff;
  font-size: 20px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  text-indent: -9999em;
  animation: sp-throbber 1.3s infinite linear;
}
@keyframes sp-throbber {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
}

.sp-banner {
  position: fixed;
  bottom: 10%;
  left: 25%;
  z-index: 100;
  box-shadow: 0 1px 5px -2px;
  padding: 0.5rem;
  background-color: #fff;
  width: 50%;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  visibility: hidden;
  transition-property: transform, opacity, visibility;
  transition-duration: 500ms;
  transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform, opacity;
}

.sp-banner.is-visible {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
}
`);

{
  /**
   * Iterates through all localStorage items.
   * 
   * @param {function} callback
   *   The callback to run on each storage item. Called with the storage data
   *   and the key as parameters.
   */
  function localStorageForEach(fn) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      fn(localStorage.getItem(key), key);
    }
  }

  /**
   * Throbber element manager object.
   */
  const Throbber = new (class {
    constructor() {
      this._element = document.createElement('dialog');
      this._element.classList.add('sp-throbber');
      document.body.appendChild(this._element);
    }

    /**
     * Shows the throbber.
     */
    show() {
      this._element.showModal();
    }

    /**
     * Hides the throbber.
     */
    hide() {
      this._element.close();
    }
  })();

  /**
   * Message element manager object.
   */
  const Message = new (class {
    constructor() {
      this._element = document.createElement('div');
      this._element.classList.add('sp-banner');
      document.body.appendChild(this._element);
    }

    /**
     * Shows a message before hiding automatically.
     * 
     * @param {string} message
     *   The message to show.
     */
    show(message) {
      this._element.innerHTML = message;
      this._element.classList.add('is-visible');

      setTimeout(() => {
        this._element.classList.remove('is-visible');
      }, 3000);
    }
  })();

  /**
   * Modal form manager.
   * 
   * @param {Map} inputs
   *   The list of form value elements, keyed by their 'name' property.
   */
  const Modal = new (class {
    constructor() {
      this._dialog = document.createElement('dialog');
      this._dialog.classList.add('sp-dialog');
      this._dialog.innerHTML = `
        <h2 class="sp-dialog__title"></h2>
        <form method="dialog" id="sp-gist-form">
          <p class="sp-form-item">
            <label for="sp-gist">Gist ID</label>
            <input id="sp-gist" type="text" required="true" name="gist" autocomplete="off"/>
          </p>
          <p class="sp-form-item">
            <label for="sp-token">Access Token</label>
            <input id="sp-token" type="text" required="true" name="token" autocomplete="off"/>
          </p>
          <p class="sp-form-item sp-form-item--actions">
            <button type="submit" class="sp-button" value="cancel">Cancel</button>
            <button type="submit" class="sp-button sp-button--primary" value="submit">Submit</button>
          </p>
        </form>
      `;

      document.body.appendChild(this._dialog);
      this._form = document.getElementById('sp-gist-form');
      this._dialogTitle = this._dialog.querySelector('.sp-dialog__title');
      this.inputs = new Map(
        Array.from(this._form.elements)
          .filter(element => element.nodeName === 'INPUT')
          .map(element => [element.name, element])
      );
    }

    /**
     * Sets the title of the modal.
     * 
     * @param {string} title
     *   The title of the modal.
     */
    set title(title) {
      this._dialogTitle.innerText = title;
    }

    /**
     * Shows the modal.
     * 
     * @param {function} onClose
     *   The callback to call when the modal is closed. Accepts a parameter that
     *   is true of the modal was closed from form submit, otherwise false.
     */
    showModal(onClose) {
      this._dialog.showModal();
      this._dialog.addEventListener(
        'close',
        () => {
          onClose(this._dialog.returnValue === 'submit');
        },
        { once: true },
      );
    }

    /**
     * Sets the form values.
     * 
     * @param {object} values
     *   Object of values keyed by respective form element name.
     */
    set values(values) {
      Object.entries(values).forEach(([name, value]) => {
        if (this.inputs.has(name)) {
          this.inputs.get(name).value = value;
        }
      });
    }

    /**
     * Gets the form values.
     * 
     * @return {object} values
     *   Object of values keyed by respective form element name.
     */
    get values() {
      const values = {};
      this.inputs.forEach((input, name) => {
        values[name] = input.value;
      });
      return values;
    }
  })();

  /**
   * Base class for Gist operations.
   */
  class GistBase {
    constructor() {
      this._action = this._action.bind(this);
      this._onClose = this._onClose.bind(this);
    }

    /**
     * Creates a UI button to intiate a Gist operation.
     * 
     * @return {HTMLAnchorElement}
     *   The UI button element.
     */
    createButton() {
      const link = document.createElement('a');
      link.innerText = this._buttonText;
      link.addEventListener('click', this._action);
      return link;
    }

    /**
     * Runs on button click.
     */
    _action() {
      const gistData = localStorage.getItem('gistdata');
      if (gistData) {
        Modal.values = JSON.parse(gistData);
      }
      
      Modal.title = this._buttonText;
      Modal.showModal(this._onClose);
    }

    /**
     * Runs on modal close.
     * 
     * @param {bool} submitted
     *   True if the form in the modal was submitted, otherwise false.
     */
    _onClose(submitted) {
      if (submitted) {
        this._updateGistData(Modal.values);
        this._onSubmit(Modal.values);
      }
    }

    /**
     * Runs on form submission.
     * 
     * @param {object} gistData
     *   The Github API gist data.
     * @param {string} gistData.gist
     *   The Gist ID.
     * @param {string} gistData.token
     *   The personal access token.
     */
    _onSubmit({ gist, token }) { }

    /**
     * Updates locally stored Github API parameters for reuse.
     */
    _updateGistData(gistData) {
      localStorage.setItem('gistdata', JSON.stringify(gistData));
    }
  }

  /**
   * Gist exporting runtime.
   */
  const GistExport = new (class extends GistBase {
    constructor() {
      super();
      this._buttonText = 'Export to gist';

      // Description text for Gist ID.
      this._gistHelp = document.createElement('span');
      this._gistHelp.innerText = 'Leave blank to create a gist';
      this._gistHelp.classList.add('sp-form-description');

      this._gistIdInput = Modal.inputs.get('gist');
    }
    _action() {
      this.profiles = new Map();

      try {
        // Gather list of profiles.
        localStorageForEach((data, key) => {
          if ('members' in JSON.parse(data)) {
            this.profiles.set(key, data);
          }
        });
      }
      catch (e) { }

      if (this.profiles.size === 0) {
        alert('No profiles to export.');
        return;
      }

      // Allow optional Gist ID (to create a new Gist).
      this._gistIdInput.required = false;
      this._gistHelp = this._gistIdInput.insertAdjacentElement('afterend', this._gistHelp);

      super._action();
    }
    async _onSubmit({ gist, token }) {
      // Format profiles into files.
      const files = {};
      this.profiles.forEach((data, key) => {
        files[`${key}.json`] = {
          // Re-stringify data to be prettry-printed for better diffs.
          content: JSON.stringify(JSON.parse(data), null, 2),
        };
      });

      try {
        Throbber.show();
        
        const response = await fetch(
          `https://api.github.com/gists${gist ? `/${gist}` : ''}`,
          {
            method: gist ? 'PATCH' : 'POST',
            headers: {
              Authorization: `token ${token}`,
            },
            body: JSON.stringify(
              Object.assign(
                { files },
                gist
                  ? {}
                  : { description: `minaraishi's LLSIF team builder export`},
              ),
            ),
          },
        );

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const { html_url, id } = await response.json();
        Message.show(`✔ ${gist ? 'Update' : 'Export'} successful. <a href="${html_url}" target="_blank" rel="nofollow noopener">View Gist</a>`);

        // If no gist was specified beforehand, save with the new Gist ID.
        if (!gist) {
          this.updateGistData({ gist: id, token });
        }
      }
      catch (error) {
        Message.show(`✖ ${error.toString()}`);
      }

      Throbber.hide();
    }

    _onClose(submitted) {
      super._onClose(submitted);

      // Restore default element state of the Gist ID input element.
      this._gistIdInput.required = true;
      this._gistHelp.remove();
    }
  })();

  /**
   * Gist importing runtime.
   */
  const GistImport = new (class extends GistBase {
    constructor() {
      super();
      this._buttonText = 'Import gist';
    }
    async _onSubmit({ gist, token }) {
      try {
        Throbber.show();
        const response = await fetch(
          `https://api.github.com/gists/${gist}`,
          {
            method: 'GET',
            headers: {
              Authorization: `token ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const { files } = await response.json();

        // List of strings indicating which files failed parsing.
        const failures = [];
        // List of strings indicating which files succeeded.
        const succeeded = [];
        // List of Promises whereby another fetch needed to be made (for
        // truncated files).
        const waiting = [];

        Object.values(files)
          .filter(({ type }) => type === 'application/json')
          .forEach(({ filename, raw_url, truncated, content }) => {
            try {
              const [,name] = filename.match(/(.+)\.json/);

              if (truncated) {
                waiting.push((async () => {
                  const response = await fetch(raw_url, { headers: { Authorization: `token ${token}` } });

                  if (!response.ok) {
                    throw new Error(response.statusText);
                  }

                  const profile = await response.json();
                  localStorage.setItem(name, JSON.stringify(profile));
                  succeeded.push(name);
                })());
              }
              else {
                localStorage.setItem(name, JSON.stringify(JSON.parse(content)));
                succeeded.push(name);
              }
            }
            catch(error) {
              failures.push(`${filename} - ${error.toString()}`);
            }
          });

        // Wait for everything to be done.
        await Promise.all(waiting);

        if (failures.length === 0 && succeeded.length === 0) {
          Message.show('⚠ No profiles found on the given gist.');
        }
        else {
          let message = '';
          if (succeeded.length > 0) {
            message += `Import succeeded for profiles: ${succeeded.join(', ')}. `;
          }
          if (failures.length > 0) {
            message += `Import failed for files: ${failures.join(', ')}.`;
          }
          Message.show(`✔ ${message}`);
        }
      }
      catch (error) {
        Message.show(`✖ ${error.toString()}`);
      }

      Throbber.hide();
    }
  })();

  const mainNav = document.querySelector('nav li.category');
  const exportLink = mainNav.querySelector('a[href$="export.html"]');
  const importLink = mainNav.querySelector('a[href$="import.html"]');

  exportLink.parentElement.classList.add('sp-nav-item');
  exportLink.parentElement.appendChild(GistExport.createButton());

  importLink.parentElement.classList.add('sp-nav-item');
  importLink.parentElement.appendChild(GistImport.createButton());
}
