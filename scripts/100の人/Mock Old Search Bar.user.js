// ==UserScript==
// @name        Mock Old Search Bar
// @name:ja     旧検索バーもどき
// @description Slightly customizes the search bar on the tool bar to the old one’s like behavior.
// @description:ja ツールバーの検索バーの挙動を、旧検索バー風に微調整します。
// @namespace   https://greasyfork.org/users/137
// @version     1.1.0
// @include     main
// @license     MPL-2.0
// @compatible  Firefox userChromeJS用スクリプト です (※GreasemonkeyスクリプトでもuserChromeES用スクリプトでもありません) / This script is for userChromeJS (* neither Greasemonkey nor userChromeES)
// @incompatible Opera
// @incompatible Chrome
// @charset     UTF-8
// @author      100の人
// @homepageURL https://greasyfork.org/scripts/35379
// ==/UserScript==

new (class {
	constructor()
	{
		/**
		 * @access private
		 * @type {Ci.nsIDOMXULPopupElement}
		 */
		this.popup = document.getElementById('PopupSearchAutoComplete');

		/**
		 * @access private
		 * @type {Ci.nsIDOMXULPopupElement}
		 */
		this.buttons = this.popup.oneOffButtons.buttons;

		this.buttons.addEventListener('click', this);
		this.integrateCurrentEngine();
	}

	/**
	 * ワンクリック検索ボタンクリック時に検索を実行せず、既定の検索エンジンを切り替えてポップアップを閉じます。
	 * @param {MouseEvent} event - clickイベント。
	 */
	handleEvent(event)
	{
		if (event.button === 0 && event.originalTarget.engine) {
			event.stopPropagation();
			this.popup.closePopup();
			Services.search.defaultEngine = event.originalTarget.engine;
		}
	}

	/**
	 * @access private
	 * @type {Object.<Function>} CustomCSSforFxのsearchbar_popup_engines_show_labels.css向けに、既定の検索エンジンを太字にします。
	 * @see {@link https://github.com/Aris-t2/CustomCSSforFx/blob/master/classic/css/generalui/searchbar_popup_engines_show_labels.css}
	 */
	get currentEngineButtonHighlightTrap()
	{
		return {apply: (target, thisArg, argumentsList) => {
			const returnValue = Reflect.apply(target, thisArg, argumentsList);

			for (const button of this.buttons.querySelectorAll(
				'.searchbar-engine-one-off-item:not(.dummy):not(.search-setting-button-compact)[style*="font-weight"]'
			)) {
				button.style.fontWeight = '';
			}
			this.buttons.querySelector(`[tooltiptext="${CSS.escape(Services.search.defaultEngine.name)}"]`)
				.style.fontWeight = 'bold';

			return returnValue;
		}};
	}

	/**
	 * 既定の検索エンジンを、他の検索エンジンのボタンリストに統合します。
	 * @access private
	 */
	integrateCurrentEngine()
	{
		document.getAnonymousElementByAttribute(this.popup, 'anonid', 'searchbar-engine').style.display = 'none';
		this.popup.oneOffButtons.header.style.display = 'none';
		this.popup.oneOffButtons.setAttribute('includecurrentengine', 'on');

		this.popup.oneOffButtons._rebuild
			= new Proxy(this.popup.oneOffButtons._rebuild, this.currentEngineButtonHighlightTrap);
		BrowserSearch.searchBar.selectEngine
			= new Proxy(BrowserSearch.searchBar.selectEngine, this.currentEngineButtonHighlightTrap);
	}
})();
