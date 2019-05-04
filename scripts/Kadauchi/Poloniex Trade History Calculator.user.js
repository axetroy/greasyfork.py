// ==UserScript==
// @name         Poloniex Trade History Calculator
// @namespace    https://github.com/Kadauchi
// @version      1.0.3
// @description  Does things...
// @author       Kadauchi
// @icon         http://i.imgur.com/oGRQwPN.png
// @include      https://poloniex.com/tradeHistory*
// @require      http://code.jquery.com/jquery-3.2.1.min.js
// @grant        GM_xmlhttpRequest
// ==/UserScript==

function toggleChosen () {
 $(`.chosen`).prop(`checked`, this.checked ? true : false);
}

function chooseTrades () {
  $(`.allIndicator`).append(`<input id="chosen-toggle" type="checkbox" style="margin-right: 5px;" checked />`);

  for (let trades of $(`#tradeHistoryTableBody`).children()) {
	const $trade = $(trades);
	if ($trade.find(`.chosen`).length === 0) {
	  const $indicator = $(trades).find(`.indicator`);
	  $indicator.prepend(`<input class="chosen" type="checkbox" style="margin-right: 5px;" checked />`);
	}
  }
}

function analyzeTrades () {
  let profit = 0;

  for (let trades of $(`#tradeHistoryTableBody`).children()) {
	const $trade = $(trades);
	if ($trade.find(`.chosen`).is(`:checked`)) {
	  if ($trade.find(`.buyClass`).length) profit -= Number($trade.find(`.currency`).last().text().replace(/[^0-9.]/g, ``));
	  if ($trade.find(`.sellClass`).length) profit += Number($trade.find(`.currency`).last().text().replace(/[^0-9.]/g, ``));
	}
  }

  GM_xmlhttpRequest({
	method: `GET`,
	url: `https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=USD`,
	onload (response) {
	  if (response.status === 200) {
		const rate = Number(JSON.parse(response.responseText)[0].price_usd);
		const gains = profit * rate;

		if (profit > 0) $(`#profit-loss`).text(`+${profit.toFixed(8)} +$${gains.toFixed(2)}`).prop(`style`, `color: green;`);
		else if (profit < 0) $(`#profit-loss`).text(`-${-profit.toFixed(8)} -$${-gains.toFixed(2)}`).prop(`style`, `color: red;`);
		else $(`#profit-loss`).text(`No profit or loss.`).prop(`style`, ``);
	  }
	  else {
		if (profit > 0) $(`#profit-loss`).text(`+${profit.toFixed(8)} Error USD`).prop(`style`, `color: green;`);
		else if (profit < 0) $(`#profit-loss`).text(`-${-profit.toFixed(8)} Error USD`).prop(`style`, `color: red;`);
		else $(`#profit-loss`).text(`No profit or loss.`).prop(`style`, ``);
	  }
	}
  });
}

$(`#tableControls`).prepend(`
<div style="float: left;">
<button id="choose-trades" type="button">Choose</button>
<button id="analyze-trades" type="button">Analyze</button>
<span id="profit-loss"></span>
</div>
`);

$(document).on(`change`, `#chosen-toggle`, toggleChosen);
$(`#choose-trades`).click(chooseTrades);
$(`#analyze-trades`).click(analyzeTrades);
