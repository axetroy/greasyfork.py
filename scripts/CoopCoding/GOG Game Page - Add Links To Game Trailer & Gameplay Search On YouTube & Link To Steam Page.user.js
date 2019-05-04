// ==UserScript==
// @name         GOG Game Page - Add Links To Game Trailer & Gameplay Search On YouTube & Link To Steam Page
// @namespace    coop
// @version      0.1
// @description  This script adds links to a GOG game page so you can easily and quickly search youtube for a trailer for the game or for a gameplay video or go to the game's page on steam.
// @author       You
// @match        http://www.gog.com/game/*
// @match        https://www.gog.com/game/*
// @grant        none
// ==/UserScript==

const gameName = document.querySelector('.header__title').textContent.trim()

const headerInfoContainer = document.querySelector('.header__in')

const metaLinksContainer = document.createElement('div')
metaLinksContainer.setAttribute('style', `
display: flex;
justify-content: space-between;
width: 266px;
`)

const SteamSearchLink = document.createElement('a')
SteamSearchLink.href = 'https://store.steampowered.com/search/?term=' + encodeURIComponent(gameName)
SteamSearchLink.textContent = 'Find On Steam'
SteamSearchLink.setAttribute('target', '_blank')

const ytTrailerSearchLink = document.createElement('a')
ytTrailerSearchLink.href = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(gameName) + ' trailer'
ytTrailerSearchLink.textContent = 'Trailer'
ytTrailerSearchLink.setAttribute('target', '_blank')

const ytGameplaySearchLink = document.createElement('a')
ytGameplaySearchLink.href = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(gameName) + ' gameplay'
ytGameplaySearchLink.textContent = 'Gameplay'
ytGameplaySearchLink.setAttribute('target', '_blank')

metaLinksContainer.appendChild(SteamSearchLink)
metaLinksContainer.appendChild(ytTrailerSearchLink)
metaLinksContainer.appendChild(ytGameplaySearchLink)

headerInfoContainer.appendChild(metaLinksContainer)