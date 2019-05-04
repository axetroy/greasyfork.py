// ==UserScript==
// @name          Digg Highlighter
// @description   Highlight new stories on Digg
// @author        chocolateboy
// @copyright     chocolateboy
// @version       0.13.1
// @namespace     https://github.com/chocolateboy/userscripts
// @license       GPL: http://www.gnu.org/copyleft/gpl.html
// @include       http://digg.com/
// @include       https://digg.com/
// @require       https://code.jquery.com/jquery-3.4.0.min.js
// @require       https://cdn.jsdelivr.net/gh/chocolateboy/jquery-highlighter@478971a2a6e279f73cc65680e1e25ae0b62a3820/dist/highlighter.min.js
// @grant         GM_deleteValue
// @grant         GM_getValue
// @grant         GM_registerMenuCommand
// @grant         GM_setValue
// @inject-into   content
// ==/UserScript==

$.highlight({
    ttl: { days: 4 },
    item () {
        return $('article[data-content-id][data-primary-tag-slug]')
            .not('[data-content-id="2bcqtJ7"]') // [1]
            .not('[data-primary-tag-display="Gem"]')
            .not('[data-primary-tag-display="Promotion"]')
            .not('[data-primary-tag-display="Promotional"]')
            .not('[data-primary-tag-slug="apps-we-digg"]')
            .not('[data-primary-tag-slug="digg-giveaways"]')
            .not('[data-primary-tag-slug="digg-pick"]')
            .not('[data-primary-tag-slug="digg-picks"]')
            .not('[data-primary-tag-slug="digg-picks-deprecated"]')
            .not('[data-primary-tag-slug="digg-store"]')
    },
    target: 'a.digg-story__title-link',
    id: 'data-content-id'
})

// [1] The "Donald Trump News" channel is the only remaining
// non-news article with a data-primary-tag-slug attribute,
// so we need something else to exclude it from highlighting.
// we can't use the slug ("donaldtrump") as that's also used
// for Trump-related news articles, so we use its unique ID
