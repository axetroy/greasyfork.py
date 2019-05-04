// ==UserScript==
// @name         Poloniex Lending Calculator
// @namespace    https://github.com/Kadauchi
// @version      1.0.0
// @description  Does things...
// @author       Kadauchi
// @icon         http://i.imgur.com/oGRQwPN.png
// @include      https://poloniex.com/lending*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

let USD = 0;
const observer = new MutationObserver(displayUSD);

function getUSD () {
  GM_xmlhttpRequest({
	method: `GET`,
	url: `https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=USD`,
	onload () {
	  if (this.status !== 200) return setTimeout(getUSD, 1000);

	  USD = Number(JSON.parse(this.responseText)[0].price_usd);
	  displayUSD();
	  setTimeout(getUSD, 600000);
	}
  });
}

function displayUSD () {
  for (let fee of document.getElementById(`activeLoansTable`).getElementsByClassName(`valuePositive`)) {
	const feeBTC = Number(fee.textContent.replace(/[^0-9.]/g, ``));
	const feeUSD = feeBTC * USD;

	if (feeUSD !== 0) {
	  fee.parentElement.style = `white-space: nowrap;`;
	  fee.insertAdjacentHTML(`afterend`, ` | <span class="usd buy" style="white-space: nowrap;">${feeUSD.toFixed(4)} USD</span>`);
	}
  }
}

function displayCalulator () {
  const html = `
<div class="cols">

<div class="col" id="lendingOfferCol">

<div class="head">
<div class="name">Calulator</div>
<div class="info loginRequired">
<div class="details"><b>Daily:</b> <span id="calcResultsDaily">+0 BTC | +0 USD</span> <b>Total: </b><span id="calcResultsTotal">+0 BTC | +0 USD</span></div>
</div>

<div class="linkContainer"><a href="#" class="standard">Use values from above</a></div>

</div>

<div class="data">
<div class="top">
<div class="row loginRequired">

<div class="cell">
<table>
<tbody><tr>
<td>
<div class="desc">Rate:</div>
</td>
<td>
<div class="details">
<div class="currency">%</div>
<div class="num">
<input type="text" class="lendingOfferInput" id="calcOfferRate" value="">
</div>
</div>
</td>
</tr>
</tbody></table>
</div>

<div class="cell">
<table>
<tbody><tr>
<td>
<div class="desc">Amount:</div>
</td>
<td>
<div class="details">
<div class="currency lendingCurrency">BTC</div>
<div class="num">
<input type="text" class="lendingOfferInput" id="calcOfferAmount" value="">
</div>
</div>
</td>
</tr>
</tbody></table>
</div>

<div class="cell">
<table>
<tbody><tr>
<td>
<div class="desc">Duration:</div>
</td>
<td>
<div class="details">
<div class="currency">Days</div>
<div class="num">
<input type="text" id="calcOfferRange" value="2">
</div>
</div>
</td>
</tr>
</tbody></table>
</div>

<div class="cell">
</div>

<div class="cell">
<div class="cta">
<button id="calc" class="theButton" type="button">Calculate</button>
</div>
</div>

</div>


</div>
<!-- end data -->
</div>
<!-- end buy col -->

</div>


`;

  document.getElementById(`content`).querySelector(`.cols`).insertAdjacentHTML(`afterend`, html);
}

function calculate () {
  const rate = Number(document.getElementById(`calcOfferRate`).value);
  const amount = Number(document.getElementById(`calcOfferAmount`).value);
  const days = Number(document.getElementById(`calcOfferRange`).value);

  const daily = rate / 100 * amount;
  const total = rate / 100 * amount * days;

  document.getElementById(`calcResultsDaily`).innerHTML =
	`<span class="buy">+${daily.toFixed(8)} BTC</span> | <span class="buy">+${(daily * USD).toFixed(4)} USD</span>`;
  document.getElementById(`calcResultsTotal`).innerHTML =
	`<span class="buy">+${(daily * days).toFixed(8)} BTC</span> | <span class="buy">+${(daily * days * USD).toFixed(4)} USD</span>`;
}

function load () {
  getUSD();
  displayCalulator();
  document.getElementById(`calc`).addEventListener(`click`, calculate);
  observer.observe(document.querySelector(`.activeLoans.mainBox.loginRequired > .data`), {childList: true});
}

load();

