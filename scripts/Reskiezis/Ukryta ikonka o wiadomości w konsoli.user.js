// ==UserScript==
// @name         Ukryta ikonka o wiadomości w konsoli
// @author       Reskiezis
// @description  Dodatek do gry Margonem
// @version      1.1
// @match        http://*.margonem.pl/
// @match        http://*.margonem.com/
// @grant        none
// @namespace    https://greasyfork.org/users/233329
// ==/UserScript==

;(style =>
  document.head.appendChild(
    Object.assign(document.createElement('style'), {
      textContent: style
    })
  )
)(`
  #consoleNotif {
    display: none;
  }
`);