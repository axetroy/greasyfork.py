/* eslint-disable */
// ==UserScript==
// @name         The Noun Project - Download Icon
// @description  Bypasses registration and downloads the SVG when clicking the download button
// @version      0.8.6
// @namespace    https://greasyfork.org/users/40601
// @homepage     https://greasyfork.org/scripts/39196
// @supportURL   https://greasyfork.org/scripts/39196/feedback
// @author       Leeroy
// @icon         https://greasyfork.org/system/screenshots/screenshots/000/012/566/original/the-noun-project.png
// @match        *://thenounproject.com/*
// @grant        none
// @license      GPL-3.0
// ==/UserScript==
/* eslint-enable */

/* eslint-env browser, greasemonkey */

'use strict';

const Util = {
  getBackgroundImageContents(el) {
    return el.style.backgroundImage ? el.style.backgroundImage.slice(5, -2) : '';
  },
  getFilename(el) {
    return el.getAttribute('data-icon-id') || 'unknown.svg';
  },
  elFactory(type, attributes) {
    const el = document.createElement(type);
    for (let key in attributes) {
      el.setAttribute(key, attributes[key]);
    }
    return el;
  }
};

const SaveHelper = {
  selectors: {
    icon: '.iconPreview',
    iconParent: '.nounproject-icon-hero',
    button: '.download-flow-start-button',
    filename: '.download-actions .kit.button'
  },
  save(
    data = Util.getBackgroundImageContents(document.querySelector(this.selectors.icon)),
    filename = Util.getFilename(document.querySelector(this.selectors.filename))
  ) {
    const markup = Util.elFactory('a', {
      href: data,
      download: filename
    });
    document.body.appendChild(markup);
    markup.click();
    document.body.removeChild(markup);
  },
  handleClick(event) {
    // Block the button's usual functionality (login modal)
    event.stopPropagation();
    SaveHelper.save();
  },
  override(buttonElement = document.querySelector(this.selectors.button)) {
    if (!buttonElement) return;
    // Anonymous functions would get attached multiple times
    buttonElement.addEventListener('click', SaveHelper.handleClick);
    buttonElement.textContent = 'Get this icon now';
  },
  // TODO: Brittle. You have to know what Mutation is made,
  // if the addedNode is a parent of your icon node then the check fails
  watch(sel = this.selectors.iconParent, cb = this.override) {
    const checkRecord = record => {
      // TODO ryanmcdermott/clean-code-javascript#avoid-negative-conditionals
      // Restrict the search space a bit
      if (!record.addedNodes.length) return;
      Array.from(record.addedNodes).forEach(node => {
        // TODO ryanmcdermott/clean-code-javascript#encapsulate-conditionals
        if (node.nodeType === 1 && node.matches(sel)) {
          cb.apply(this);
        }
      });
    };

    const checkMutations = mutations => {
      mutations.forEach(checkRecord);
    };

    const observer = new MutationObserver(checkMutations);

    // Need to observe a node that's gonna be there
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
};

SaveHelper.watch();
