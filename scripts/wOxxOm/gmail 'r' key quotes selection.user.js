// ==UserScript==
// @name         gmail 'r' key quotes selection
// @description  Pressing 'r' will quote selection (only when selection is within an email)
// @version      1.0.2
// @author       wOxxOm
// @namespace    wOxxOm.scripts
// @match        https://mail.google.com/*
// @license      MIT License
// ==/UserScript==

window.addEventListener('keydown', e => {
  if (e.ctrlKey || e.altKey || e.metaKey || e.key != 'r')
    return;

  const sel = getSelection();
  const selText = sel.toString().trim().replace(/[\r\n]/g, '<br>');
  if (!selText)
    return;

  const item = sel.anchorNode.parentElement.closest('[role="listitem"]');
  if (!item)
    return;

  const emailNode = item.querySelector('[email]');
  const email = emailNode && emailNode.getAttribute('email');
  const name = emailNode && emailNode.getAttribute('name');
  const date = (item.querySelector('span[title]') || {}).title || '';

  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();

  const getEditor = () => item.querySelector('.editable') || item.parentElement.querySelector('.editable');
  Promise.resolve(getEditor() || new Promise(resolve => {
    const replyMenu = item.parentElement.querySelector('[role="button"] + [aria-haspopup="true"]');
    if (!replyMenu)
      return;
    replyMenu.previousElementSibling.dispatchEvent(new MouseEvent('click'));
    const t0 = performance.now();
    const interval = setInterval(() => {
      const editor = getEditor();
      if (editor || performance.now() - t0 > 1000) {
        if (editor) {
          editor.closest('table').parentNode.closest('table').querySelector('[role="button"]').click();
          editor.textContent = '';
        }
        clearInterval(interval);
        resolve(editor);
      }
    }, 100);
  })).then(editor => {
    if (!editor)
      return;
    editor.focus();
    document.execCommand('insertHTML', false, '<div class="gmail_quote">' +
      `${date} ${name == email ? '' : name + ' '}&lt;<a href="${email}" target="_blank">${email}</a>&gt;<br>` +
      `<blockquote class="gmail_quote" style="margin:0 0 0 .8ex;border-left:1px #ccc solid;padding-left:1ex">${selText}</blockquote>` +
      '</div><br><br><br>');
    let isLastEmpty = true, lastNode = getSelection().focusNode.parentElement;
    while ((lastNode = lastNode.nextElementSibling) && isLastEmpty)
      isLastEmpty = !lastNode.textContent.trim();
    getSelection().modify('move', 'backward', 'character');
    if (!isLastEmpty)
      getSelection().modify('move', 'backward', 'character');
  });
}, true);
