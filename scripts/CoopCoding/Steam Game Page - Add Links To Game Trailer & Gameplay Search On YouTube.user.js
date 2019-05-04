// ==UserScript==
// @name         Steam Game Page - Add Links To Game Trailer & Gameplay Search On YouTube
// @namespace    coop
// @version      0.3
// @description  This script adds links to the right of the breadcrumbs on a Steam game page so you can easily and quickly search youtube for a trailer for the game or for a gameplay video.
// @author       You
// @match        http://store.steampowered.com/app/*
// @match        https://store.steampowered.com/app/*
// @grant        none
// ==/UserScript==

const gameName = document.querySelector('.apphub_AppName').textContent.trim()

const breadcrumbsContainer = document.querySelector('.breadcrumbs')

breadcrumbsContainer.setAttribute('style', `
display: flex;
justify-content: space-between;
margin-right: 320px;
`)

const metaLinksContainer = document.createElement('div')
metaLinksContainer.setAttribute('style', `
display: flex;
justify-content: space-between;
width: 126px;
`)

const ytTrailerSearchLink = document.createElement('a')
ytTrailerSearchLink.href = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(gameName) + ' trailer'
ytTrailerSearchLink.textContent = 'Trailer'
ytTrailerSearchLink.setAttribute('target', '_blank')

const ytGameplaySearchLink = document.createElement('a')
ytGameplaySearchLink.href = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(gameName) + ' gameplay'
ytGameplaySearchLink.textContent = 'Gameplay'
ytGameplaySearchLink.setAttribute('target', '_blank')

metaLinksContainer.appendChild(ytTrailerSearchLink)
metaLinksContainer.appendChild(ytGameplaySearchLink)

breadcrumbsContainer.appendChild(metaLinksContainer)