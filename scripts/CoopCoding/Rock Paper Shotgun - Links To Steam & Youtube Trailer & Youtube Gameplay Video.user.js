// ==UserScript==
// @name         Rock Paper Shotgun - Links To Steam & Youtube Trailer & Youtube Gameplay Video
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  This script adds links on a RPS article to a the game on steam and a link to search youtube trailer for the game's trailer and link to search youtube for gameplay videos of the game.
// @author       You
// @match        https://www.rockpapershotgun.com/*
// @grant        none
// ==/UserScript==

const gameName = document.querySelector('ul.breadcrumbs li:last-child').textContent.trim()

const metaLinksContainer = document.createElement('div')
metaLinksContainer.setAttribute('style', `
font-size: 14px;
margin-left: 390px;
display: flex;
justify-content: space-between;
`)

const steamSearchLink = document.createElement('a')
steamSearchLink.href = 'http://store.steampowered.com/search/?term=' + encodeURIComponent(gameName)
steamSearchLink.textContent = 'Find On Steam'
steamSearchLink.setAttribute('target', '_blank')

const ytTrailerSearchLink = document.createElement('a')
ytTrailerSearchLink.href = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(gameName) + ' trailer'
ytTrailerSearchLink.textContent = 'Trailer'
ytTrailerSearchLink.setAttribute('target', '_blank')

const ytGameplaySearchLink = document.createElement('a')
ytGameplaySearchLink.href = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(gameName) + ' gameplay'
ytGameplaySearchLink.textContent = 'Gameplay'
ytGameplaySearchLink.setAttribute('target', '_blank')


metaLinksContainer.appendChild(steamSearchLink)
metaLinksContainer.appendChild(ytTrailerSearchLink)
metaLinksContainer.appendChild(ytGameplaySearchLink)

document.querySelector('#content article header').appendChild(metaLinksContainer)