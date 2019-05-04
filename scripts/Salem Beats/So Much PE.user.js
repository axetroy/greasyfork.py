// ==UserScript==
// @name         So Much PE
// @namespace    salembeats
// @version      1
// @description  .
// @author       Cuyler Stuwe (salembeats)
// @include      https://worker.mturk.com/dashboard*
// @grant        none
// ==/UserScript==

document.querySelector("#dashboard-hits-overview div.row").insertAdjacentHTML("beforebegin", `
<div class="row m-b-sm">
    <div class="col-xs-7">
        <strong>Projected Earnings: </strong>
    </div>
    <div class="col-xs-5 text-xs-right">So much<br/><img width="100%" src="https://i.imgflip.com/21at18.jpg"></div>
</div>`);