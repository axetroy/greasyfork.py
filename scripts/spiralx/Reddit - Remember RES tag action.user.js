// ==UserScript==
// @name           Reddit - Remember RES tag action
// @description    Saves previously set tag and colour to use again.
// @author         James Skinner <spiralx@gmail.com> (http://github.com/spiralx)
// @namespace      http://spiralx.org/
// @version        0.8.0
// @icon           data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiAAABYgAWToQQYAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuNWWFMmUAAAF3SURBVDhP1ZI/SAJhGMZN3WpKOAgsKGiIoKWg0K2LXIJWj6DAhpAgKMiW7irBqziHbhYE12sLGtWGKHBx0kHcQrBJXNIz9e35vvsQoj841g9+fHy8z/PyHZzrXzANNbgKF2ASHsOhOYGTUIb3cBSq4hyKa3Ey2GsMeMRvvzALd+AVvIPbcAb+yAq8hBehUOgxnU5TtVol27ap3W5TpVKhVCpFsiw/IHMusstwgOHxeDZM07T7/T5Rr0vUfacBvR7uHWIzwzBayK+zDm8KktFo9FXEifaXiHbnxAXEZKKtqcHSSCTygs6nBYuWZfEhR1eIzjbFBdzsYcma8xKQyWQInXmn6jCeSCQ6fDoEqqqyzxhzqgK/368Xi0UeKJfLpGka5fN5yuVyrEClUonPCoUCSZLE/oMvjGBwqut6q16vU6PRoGw2yxc0m02q1WoUj8fffD5fjGWdyvdMeL3ew2AweKsoynM4HH4KBAKW2+0+wExyIn8Hl+sDt5ENCrpr91QAAAAASUVORK5CYII=
// @icon64         data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2029%2025%22%3E%3Cg%20transform=%22translate(1%201)%22%20stroke-width=%221.1%22%20fill-rule=%22evenodd%22%20fill=%22none%22%3E%3Ccircle%20stroke=%22#000%22%20cx=%222.7%22%20r=%222.7%22%20cy=%2210.7%22%20fill=%22#fff%22/%3E%3Ccircle%20stroke=%22#000%22%20cx=%2224.7%22%20r=%222.7%22%20cy=%2210.7%22%20fill=%22#fff%22/%3E%3Cpath%20stroke-linejoin=%22round%22%20stroke=%22#000%22%20stroke-linecap=%22round%22%20d=%22M21.23%201.35L15.83.08l-2%207.28%22/%3E%3Ccircle%20stroke=%22#000%22%20cx=%2223.13%22%20r=%222.13%22%20cy=%222.13%22%20fill=%22#fff%22/%3E%3Cellipse%20cy=%2214.99%22%20rx=%2212.24%22%20ry=%227.99%22%20stroke=%22#000%22%20cx=%2213.24%22%20fill=%22#fff%22/%3E%3Cg%20transform=%22translate(8%2012)%22%3E%3Ccircle%20stroke=%22#FF4500%22%20cx=%221%22%20r=%221.43%22%20cy=%221.43%22%20fill=%22#FF4500%22/%3E%3Ccircle%20stroke=%22#FF4500%22%20cx=%2210%22%20r=%221.43%22%20cy=%221.43%22%20fill=%22#FF4500%22/%3E%3Cpath%20stroke=%22#000%22%20d=%22M1.5%206.23C2.58%207.3%204.3%207.5%205.73%207.5m4.24-1.27C8.9%207.3%207.17%207.5%205.77%207.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E
// @match          *://*.reddit.com/r/*/comments/*
// @match          *://*.reddit.com/user/*
// @grant          unsafeWindow
// @run-at         document-end
// @require        https://unpkg.com/jquery@3/dist/jquery.min.js
// @require        https://greasyfork.org/scripts/370255-console-message/code/consolemessage.js?version=612436
// ==/UserScript==

// @require        https://greasyfork.org/scripts/10443-datacache-simple-storage-wrapper/code/DataCache%20-%20Simple%20storage%20wrapper.js?version=56961

/* jshint asi: true, esnext: true, laxbreak: true */
/* global jQuery, MutationSummary */

/**
==== 0.8.0 (2018.07.13) ====
* Changed console.message require to use GreasyFork

==== 0.7.0 (2018.02.13) ====
* Changed the rendering of the tag preview to match how RES does it
* Moved output to all use console.message

==== 0.6.0 (2018.02.11) ====
* Use unpkg.com for jQuery
* Add console.message for logging
* Use localstorage to save tags
* Use new Tag class to store tag info
* Updated ID for text field in tag popup

==== 0.5.1 (2018.02.11) ====
* Update icons to match other Reddit script

==== 0.5.0 (26.08.2017) ====
* Change to simple use of GM_getValue and GM_setValue for storage

==== 0.4.0 (21.08.2017) ====
* Update all other tags correctly when changing a user's tag
* Handle removing all other tags when clearing a user's tag

==== 0.3.0 (13.07.2017) ====

* Checks tag link to see if tag set, always overwrites if not
* Updates other tags for same user on current page

==== 0.2.1 (27.06.2017) ====
* Changed timeout of field set function to 250ms

==== 0.2.0 (31.05.2017) ====
* Updated jQuery to v3.2.1
* Added timeout before overriding tag/colour fields
* Update preview when setting tag/colour

*/

; ($ => {
  'use strict'
  
  const NORMAL = 'font-weight: normal; text-decoration: none; color: black'
  const ERROR = 'font-weight: bold; color: #f4f'
  const LINK = 'color: #05f; text-decoration: underline'
  const BOLD = 'font-weight: bold'
  const BLUE = [ 'color: #05f', 'color: #000' ]
  const GREEN = [ 'color: #c1007f', 'color: #000' ]

  const qval = (v, n) => `${n}=%c${JSON.stringify(v)}%c`

  const _BOLD = { fontWeight: 'bold' }
  const _GREEN = { color: '#c1007f' }
  const _BLUE = { color: '#05f' }

  // --------------------------------------------------------------------

  const bgToTextColorMap = {
	none: 'inherit',
	aqua: 'black',
	black: 'white',
	blue: 'white',
	cornflowerblue: 'white',
	fuchsia: 'white',
	gray: 'white',
	green: 'white',
	lime: 'black',
	maroon: 'white',
	navy: 'white',
	olive: 'white',
	orange: 'white',
	orangered: 'white',
	pink: 'black',
	purple: 'white',
	red: 'white',
	silver: 'black',
	teal: 'white',
	white: 'black',
	yellow: 'black'
  }


  // --------------------------------------------------------------------------

  $.fn.outer = function() {
    const elem = this[0] || {}
    return elem.nodeType === Document.ELEMENT_NODE
      ? elem.outerHTML
      : null
  }

  console.message.prototype.dump = function(obj) {
    if (obj && typeof obj.dump === 'function') {
      obj.dump.call(obj, this)
    } else if (typeof obj === 'function') {
      obj(this)
    }
    return this
  }

  // --------------------------------------------------------------------------

  class Tag {
    constructor(text = '', colour = 'none') {
      this.text = text
      this.colour = colour
    }

    get css() {
      const color = bgToTextColorMap[ this.colour ] // + ` !important`

      const backgroundColor = this.colour === 'none'
        ? 'transparent'
        : this.colour

      return { color, backgroundColor }
    }

    buildPreviewTag() {
      const $a = $(`<a>`, { href: '#', title: this.text })
        .addClass(`userTagLink hasTag truncateTag`)
        .css(this.css)
        .text(this.text)

      return $(`<span>`)
        .addClass('RESUserTag')
        .append($a)
    }

    apply($elem) {
      return $elem.text(this.text).css(this.css)
    }

    equals(other) {
      return this.text === other.text && this.colour === other.colour
    }

    json() {
      return JSON.stringify(this)
    }

    dump(msg) {
      /* jshint ignore:start */
      msg.text(this.text, {
        ...this.css,
        fontSize: '0.9em',
        padding: '0 4px',
        border: 'solid 1px rgb(199, 199, 199)',
        borderRadius: 3,
      })
      /* jshint ignore:end */
    }
  }

  Tag.parse = str => {
    const { text, colour } = JSON.parse(str)
    return new Tag(text, colour)
  }

  Tag.default = () => new Tag($('.pagename a').text(), 'olive')

  // --------------------------------------------------------------------------

  const tags = JSON.parse(localStorage.getItem('resrem') || '[]').map(v => new Tag(v.text, v.colour))

  function getLastTag() {
    return tags.length > 0 ? tags[0] : Tag.default()
  }

  function saveTag(tag) {
    const idx = tags.findIndex(t => t.equals(tag))

    if (idx !== -1) {
      tags.splice(idx, 1)
    }

    tags.unshift(tag)

    localStorage.setItem('resrem', JSON.stringify(tags))

    return tag
  }

  const msg = console.message().text('onScriptInit:', _BOLD)
  tags.forEach(tag => { msg.text(' ').dump(tag) })
  msg.print()

  // --------------------------------------------------------------------------

  function onTagModalOpened() {
    const $tagField = $('#userTaggerText')
    const $colourField = $('#userTaggerColor')
    const $previewField = $('#userTaggerPreview')

    const previousTag = getLastTag()

    if (previousTag) {
      $tagField.val(previousTag.text)
      $colourField.val(previousTag.colour)

      const $previewTag = previousTag.buildPreviewTag()
      console.info($previewTag.outer())

      $previewField
        .empty()
        .append($previewTag)
    }
  }  


  // --------------------------------------------------------------------------

  function onSaveTag() {
    const text = $('#userTaggerText').val()
    const colour = $('#userTaggerColor').val()
    const user = $('#userTaggerName').val()

    if (text) {
      const newTag = saveTag(new Tag(text, colour))

      const msg = console.message()
        .text('onSaveTag:', _BOLD)
        .text(' ')
        .dump(newTag)
        .text('* ')
      tags.slice(1).forEach(tag => { msg.text(' ').dump(tag) })
      msg.print()

      $(`a.userTagLink[username=${user}]`)
        .text(newTag.text)
        .css(newTag.css)
        .addClass('hasTag')
        .removeClass('RESUserTagImage')
    } else {
      $(`a.userTagLink[username=${user}]`)
        .text('')
        .removeAttr('style')
        .removeClass('hasTag')
        .addClass('RESUserTagImage')
    }
  }
  

  // --------------------------------------------------------------------------

  $('body')
    .on('click.resrem', 'a.userTagLink:not(.hasTag)', () => {
      setTimeout(onTagModalOpened, 250)
    })
    .on('click.resrem', '#userTaggerSave', onSaveTag)

  /*
    <div class="RESHover RESHoverInfoCard RESDialogSmall" style="top: 387.918px; left: 215.767px; width: 350px; display: block; opacity: 1;">
      <h3 class="RESHoverTitle" data-hover-element="0">
        <div>
          <span class="res-icon"></span>&nbsp;<span>Plan-Six</span>
        </div>
      </h3>

      <div class="RESCloseButton">x</div>

      <div class="RESHoverBody RESDialogContents" data-hover-element="1">
        <form id="userTaggerToolTip">
          <div class="fieldPair">
            <label class="fieldPair-label" for="userTaggerText">Text</label>

            <input class="fieldPair-text" type="text" id="userTaggerText">
          </div>

          <div class="fieldPair">
            <label class="fieldPair-label" for="userTaggerColor">Color</label>

            <select id="userTaggerColor">
              <option style="color: inherit; background-color: none" value="none">none</option>
              <option style="color: black; background-color: aqua" value="aqua">aqua</option>
              <option style="color: white; background-color: black" value="black">black</option>
              <option style="color: white; background-color: blue" value="blue">blue</option>
              <option style="color: white; background-color: cornflowerblue" value="cornflowerblue">cornflowerblue</option>
              <option style="color: white; background-color: fuchsia" value="fuchsia">fuchsia</option>
              <option style="color: white; background-color: gray" value="gray">gray</option>
              <option style="color: white; background-color: green" value="green">green</option>
              <option style="color: black; background-color: lime" value="lime">lime</option>
              <option style="color: white; background-color: maroon" value="maroon">maroon</option>
              <option style="color: white; background-color: navy" value="navy">navy</option>
              <option style="color: white; background-color: olive" value="olive">olive</option>
              <option style="color: white; background-color: orange" value="orange">orange</option>
              <option style="color: white; background-color: orangered" value="orangered">orangered</option>
              <option style="color: black; background-color: pink" value="pink">pink</option>
              <option style="color: white; background-color: purple" value="purple">purple</option>
              <option style="color: white; background-color: red" value="red">red</option>
              <option style="color: black; background-color: silver" value="silver">silver</option>
              <option style="color: white; background-color: teal" value="teal">teal</option>
              <option style="color: black; background-color: white" value="white">white</option>
              <option style="color: black; background-color: yellow" value="yellow">yellow</option>
            </select>
          </div>

          <div class="fieldPair">
            <label class="fieldPair-label" for="userTaggerPreview">Preview</label>

            <span id="userTaggerPreview" style="color: white; background-color: olive;">
              <span class="RESUserTag">
                <a class="userTagLink hasTag truncateTag" style="background-color: olive; color: white !important;" title="Sexist" href="javascript:void 0">Sexist</a>
              </span>
            </span>
          </div>
          <a class="userTagLink hasTag truncateTag" style="background-color: olive; color: white !important;" title="Feminist" href="javascript:void 0">Feminist</a>

          <div class="fieldPair res-usertag-ignore">
            <label class="fieldPair-label" for="userTaggerIgnore">Ignore</label>

            <div id="userTaggerIgnoreContainer" class="toggleButton ">
              <span class="toggleThumb"></span>
              <div class="toggleLabel res-icon" data-enabled-text="" data-disabled-text=""></div>
              <input id="userTaggerIgnore" name="userTaggerIgnore" type="checkbox">
            </div>

            <a class="gearIcon" href="#res:settings/userTagger/hardIgnore" title="RES Settings > User Tagger > hardIgnore"> configure </a>
          </div>

          <div class="fieldPair">
            <label class="fieldPair-label" for="userTaggerLink">
              <span class="userTaggerOpenLink">
                <a title="open link" href="javascript:void 0">Source URL</a>
              </span>
            </label>

            <input class="fieldPair-text" type="text" id="userTaggerLink" value="https://www.reddit.com/r/giantbomb/comments/7x251d/all_systems_goku_02/du5fpwr/">
          </div>

          <div class="fieldPair">
            <label class="fieldPair-label" for="userTaggerVotesUp" title="Upvotes you have given this redditor">Upvotes</label>

            <input type="number" style="width: 50px;" id="userTaggerVotesUp" value="0">
          </div>

          <div class="fieldPair">
            <label class="fieldPair-label" for="userTaggerVotesDown" title="Downvotes you have given this redditor">Downvotes</label>

            <input type="number" style="width: 50px;" id="userTaggerVotesDown" value="0">
          </div>

          <div class="res-usertagger-footer">
            <a href="/r/dashboard#userTaggerContents" target="_blank" rel="noopener noreferer">View tagged users</a>

            <input type="submit" id="userTaggerSave" value="✓ save tag">
          </div>
        </form>
      </div>
    </div>

  */

})(jQuery)

jQuery.noConflict(true)
