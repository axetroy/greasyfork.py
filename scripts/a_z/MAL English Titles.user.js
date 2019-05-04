// ==UserScript==
// @name     MAL English Titles
// @description Uses the Kitsu API to convert series titles on MAL to their English aliases
// @locale en
// @license MIT
// @version  1.3
// @require  https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @grant    GM.getValue
// @grant    GM_getValue
// @grant    GM.setValue
// @grant    GM_setValue
// @match http://*.myanimelist.net/anime/*
// @match https://*.myanimelist.net/anime/*
// @match http://*.myanimelist.net/animelist/*
// @match https://*.myanimelist.net/animelist/*
// @match http://*.myanimelist.net/manga/*
// @match https://*.myanimelist.net/manga/*
// @match http://*.myanimelist.net/mangalist/*
// @match https://*.myanimelist.net/mangalist/*
// @run-at document-end
// @namespace https://greasyfork.org/users/203863
// ==/UserScript==

class TitleManager {
    getCache(listType) {
        return GM.getValue(listType, {})
    }

    updateCache(listType, cache) {
        console.log('updating cache', listType, cache)
        return GM.setValue(listType, cache)
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    async remoteFetch(listType, items, op) {
        const stride = 20 // max that kitsu allows per page
        const itemIds = Object.keys(items)
        const cache = await this.getCache(listType)
        let dirty = false
        for (let i = 0; i < itemIds.length; i += stride) {
            const ids = itemIds.slice(i, i + stride).join(',')
            let result
            console.log(`fetching for ids`, ids)
            try {
                result = await fetch(`https://kitsu.io/api/edge/mappings?filter[externalSite]=myanimelist%2F${listType}&filter[externalId]=${ids}&include=item&page[limit]=20`)
                result = await result.json()
            } catch (e) {
                console.log('got error query kitsu:', e)
                await this.delay(150)
                continue
            }

            if (result.included) {
                // The Kitsu api is just retarded
                const kitsuMalMappings = {}
                for (const elem of result.data) {
                    if (elem.attributes.externalId && elem.relationships.item && elem.relationships.item.data && elem.relationships.item.data.id) {
                        kitsuMalMappings[elem.relationships.item.data.id] = elem.attributes.externalId
                    }
                }
                for (const elem of result.included) {
                    const malId = kitsuMalMappings[elem.id]
                    const item = items[malId]
                    if (malId && item) {
                        let cachedEntry = cache[malId]
                        if (!cachedEntry) {
                            cache[malId] = cachedEntry = {}
                        }
                        dirty = true
                        cachedEntry.updated = Date.now()
                        if (elem.attributes.titles.en) {
                            cachedEntry.engTitle = elem.attributes.titles.en
                            try {
                                op(item, elem.attributes.titles.en)
                            } catch (e) {
                                console.error('Got exception trying to perform operation on entry:', malId, cachedEntry)
                            }
                        }
                    }
                }
            }
        }
        if (dirty) {
            await this.updateCache(listType, cache)
        }
    }

    async fetch(listType, items, op) {
        const cache = await this.getCache(listType)
        const missed = {}
        const now = Date.now()
        console.log('got cache', cache)
        for (const [id, item] of Object.entries(items)) {
            const cachedEntry = cache[id]
            let stale = true
            if (cachedEntry) {
                // Stale if no title and last updated 1 day ago, or last updated 2 weeks ago
                stale = (!cachedEntry.updated ||
                    (!cachedEntry.engTitle && (now - cachedEntry.updated) > 86400000) ||
                    (now - cachedEntry.updated) > 1209600000)
                if (cachedEntry.engTitle) {
                    op(item, cachedEntry.engTitle)
                }
            }
            if (stale) {
                missed[id] = item
            }
        }

        if (missed) {
            await this.remoteFetch(listType, missed, op)
        }
    }

    async updateLinks(nodes, re) {
        const items = { anime: {}, manga: {} }
        for (const node of nodes) {
            const m = node.href.match(re)
            if (m) {
                items[m[1]][m[2]] = node
            }
        }

        for (const type of ['anime', 'manga']) {
            if (Object.keys(items[type]).length > 0) {
                await this.fetch(type, items[type], (item, title) => {
                    item.textContent = title
                })
            }
        }
    }
}

// Anime/Manga info pages
const show = window.location.pathname.match(/^\/(anime|manga)\/(\d+)/)
const title = document.querySelector('#myanimelist h1')
const manager = new TitleManager()

if (show && title) {
    const items = {}
    items[show[2]] = title
    manager.fetch(show[1], items, (item, title) => {
        item.textContent = title
        document.title = title + ' - MyAnimeList.net'
    })
}

// Anime/Manga lists
const list = window.location.pathname.match(/^\/(anime|manga)list\//)
if (list) {
    // Classic lists
    const titles = document.querySelectorAll('a.animetitle')
    if (titles) {
        manager.updateLinks(titles, /\/(anime|manga)\/(\d+)/)
    }

    // Modern lists...
    const parent = document.querySelector('div.list-unit')
    if (parent) {
        const observer = new MutationObserver(mutations => {
            let nodes = []
            mutations.forEach(m => {
                if (m.addedNodes) {
                    m.addedNodes.forEach(node => {
                        if (node.nodeName === 'TABLE') {
                            observer.disconnect()
                            observer.observe(node, { childList: true })
                            nodes = node.querySelectorAll('.data.title a.link')
                        } else {
                            const link = node.querySelector('.data.title a.link')
                            if (link) {
                                nodes.push(link)
                            }
                        }
                    })
                }
            })
            if (nodes.length > 0) {
                manager.updateLinks(nodes, /\/(anime|manga)\/(\d+)/)
            }
        })
        observer.observe(parent, { childList: true })
    }
}