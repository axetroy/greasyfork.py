// ==UserScript==
// @name         [Fix] SteamWebTools & SteamEconomyEnhancer
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Fix sth
// @author       xz
// @include     *://steamcommunity.com/id/*/inventory*
// @include     *://steamcommunity.com/profiles/*/inventory*
// @include     *://steamcommunity.com/market*
// @include     *://steamcommunity.com/tradeoffer*
// @grant GM_addStyle

// ==/UserScript==

GM_addStyle (`
.itemcount {
/* Steam Web Tools */
bottom: 0!important;
left: 0!important;
top: unset!important;
right: unset!important;
}
.view_inventory_logo{
/* Steam Economy Enhancer */
display: block!important;
}
.scmpItemCheckbox{
/* steam 卡牌利润最大化 */
bottom: 0!important;
right: 0!important;
top: unset!important;
left: unset!important;
}
`);