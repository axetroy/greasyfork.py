// ==UserScript==
// @name         Amazon Extras
// @namespace    Amazon
// @version      1.2.1
// @description  Adds extra features to the Amazon sites.
// @author       superiorSilicon
// @include      http*://*.amazon.*/*
// @grant        none
// ==/UserScript==


// SETTINGS - START //
document.getElementById('nav-xshop').appendChild(document.createRange().createContextualFragment(`<a id="amExSettings" class="nav-a" href="#">Amazon Extras Settings</a>`));
var amExSettingsModal = document.createRange().createContextualFragment(`<div id="amWExModalContainer">
<div id="amWExModalBg" style="background: #111111aa; width: 100%; height: 100%; position: fixed; top: 0; left: 0; z-index: 200"></div>
<div id="amWExModal" style="background: #FFFFFF; width: 70vw; height: 80vh; position: fixed; top: 10%; left: 15%; padding: 10px; z-index: 210">
<h1>Loading...</h1>
</div>
</div>`);
document.getElementById('amExSettings').addEventListener('click', function() {
    document.body.appendChild(amExSettingsModal);
});
// SETTINGS - END //

var wishlistButtons = document.createRange().createContextualFragment(`<div id="amWExDiv">
<button id="amWEx" style="display: inline-block" class="a-button" type="button" title="Exports the information of the items in the wishlist into a JSON file">
<span class="a-button-inner">
<span class="a-button-text">Export</span>
</span>
</button>
<button id="amWTotal" style="display: inline-block" class="a-button" type="button" title="Outputs the total price of the wishlist">
<span class="a-button-inner">
<span class="a-button-text">Total</span>
</span>
</button>
</div>`);
document.getElementById('wfaAddTeaser').appendChild(wishlistButtons); //Adding the "Export" and "Total" button to the wishlist


if (/.*wishlist.*/.test(window.location.href)) {
    // Amazon Wishlist Exporter - START //
    document.getElementById('amWEx').addEventListener('click', function(e) {
        var wishlist_items = document.querySelectorAll('.g-item-sortable'); //Gets all the items in the wishlist
        if (wishlist_items.length >= 10) { //Runs if there are more than 10 items in the wishlist
            window.scrollTo(0, document.body.scrollHeight); //Scrolls to the bottom of the page to load all the items in the wishlist
            var amWExModal = document.createRange().createContextualFragment(`<div id="amWExModalContainer">
<div id="amWExModalBg" style="background: #111111aa; width: 100%; height: 100%; position: fixed; top: 0; left: 0; z-index: 200"></div>
<div id="amWExModal" style="text-align: center; background: #FFFFFF; width: 50vw; position: fixed; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%); padding: 10px; z-index: 210;">
<h1>Loading...</h1>
</div>
</div>`); //Adds a modal containing text "Loading..."
            document.body.appendChild(amWExModal); //Adds a modal containing text "Loading..."
            setTimeout(Callback, 3000); //Runs the main callback function after 2.5 seconds
        } else { //Runs if there are less than 10 items in the wishlist
            Callback(); // Directly runs the callback function without waiting.
        }
    });

    var wishlistJSON = []; //Defining an empty array to generate our JSON in

    function Callback() { //The main callback function
        if (document.getElementById('amWExModalContainer')) {
            document.getElementById('amWExModalContainer').remove(); //Removes the "Loading..." modal
        }
        var wishlist_name = document.getElementById('profile-list-name').innerHTML.replace(/(\'|\.)/ig, ''); //Gets the name of the wishlist
        wishlist_name = wishlist_name.replace(/\s/ig, '-'); //Replaces spaces in the wishlist name with '-'
        var wishlist_items = document.querySelectorAll('.g-item-sortable'); //Gets all the items in the wishlist
        wishlistJSON = []; //Defining an empty array to generate our JSON in
        for (var item of wishlist_items) { //Looping through all the items
            var item_details = item.querySelector('.g-item-details > .a-row > .a-column'); //Gets the node containing the details of the item
            var item_name = item_details.querySelector('*[id*="itemName"]').innerHTML.toString(); //Gets the name of the item
            var item_asin = JSON.parse(item.getAttribute('data-reposition-action-params')).itemExternalId.replace('ASIN:', '').replace(/\|.*/ig, ''); //Gets the ASIN of the item
            var item_price = item_details.querySelector('.a-price'); //Gets the price of the item
            var item_dateAdded = item.querySelector('.dateAddedText').children[0].childNodes[0].wholeText.split('Item added ')[1]; //Gets the date when the item was added to the lsit
            var item_price_int, item_price_float, item_prime; //Initializing the various price variables
            if (item_price != null) { // Runs if a price is defined on Amazon
                item_price_int = parseInt(item.getAttribute('data-price')); //Gets an integer value of the price
                item_price_float = parseFloat(item.getAttribute('data-price')); //Gets a floating point value of the price
                item_prime = Boolean(item_price.getElementsByClassName('.a-icon-prime') != null || item_price.getElementsByClassName('.a-icon-prime') != undefined); //Gets a boolean whether the prime service is available for the item
                item_price = item.getAttribute('data-price').toString(); //Gets a string value of the price
            } else { //Runs if no price is defined on Amazon
                item_price_int = null;
                item_price_float = null;
                item_price = 'N/A';
                item_prime = false;
            }
            var itemJSON = {
                name: item_name,
                priceString: item_price,
                priceInt: item_price_int,
                priceFloat: item_price_float,
                hasPrime: item_prime,
                ASIN: item_asin,
                dateAdded: item_dateAdded,
                dateAddedISO: (new Date(item_dateAdded)).toJSON()
            }; //Generating a JSON Object for the item
            wishlistJSON.push(itemJSON); //Adding the item's JSON object to the wishlist's JSON
        }
        wishlistJSON = JSON.stringify(wishlistJSON, null, ' '); //Stringifying the wishlist's JSON
        var amWExModal = document.createRange().createContextualFragment(`<div id="amWExModalContainer">
<div id="amWExModalBg" style="background: #111111aa; width: 100%; height: 100%; position: fixed; top: 0; left: 0; z-index: 200"></div>
<div id="amWExModal" style="background: #FFFFFF; width: 70vw; height: 80vh; position: fixed; top: 10%; left: 15%; padding: 10px; z-index: 210">
<h1 style="display: inline">${wishlist_name.replace('-', ' ')}</h1>
<a href="" id="amWExModalClose" style="font-family: sans-serif; font-weight: 600; font-size: 2.2rem; text-decoration: none; float: right; margin: 10px;">&times;</a>
<textarea id="amWExJSONText" style="height: 85%; font-size: 1rem; font-family: 'Inconsolata', 'Monaco', monospace, sans-serif"></textarea>
<div id="amWExSaveDialog" style="margin: 5px">
<span>Save As:</span>
<input type="text" id="amWExSaveFileName" value="${wishlist_name}.json">
<a id="amWExSave" class="a-button"><span class="a-button-inner"><span class="a-button-text">Save</span></span></a>
</div>
</div>
</div>`); //Defining the final output modal
        document.body.appendChild(amWExModal); //Adding the output modal to the screen
        document.getElementById('amWExJSONText').innerHTML = wishlistJSON; //Setting the text of the textarea to the wishlist's JSON
        document.getElementById('amWExSave').href = window.URL.createObjectURL(new Blob([wishlistJSON], {
            'type': 'application/json'
        })); //Setting the href of the save button to the wishlist's JSON for downloading capabilities
        document.getElementById('amWExSave').download = wishlist_name + '.json'; //Sets the filename for the download
        document.getElementById('amWExSaveFileName').addEventListener('change', function() {
            document.getElementById('amWExSave').download = document.getElementById('amWExSaveFileName').value; //Sets the filename for the download
        });
    }
    // Amazon Wishlist Exporter - END //

    // Amazon Wishlist Total - START //
    document.getElementById('amWTotal').addEventListener('click', function(e) {
        var symbol = document.querySelector('.a-price-symbol').innerHTML; //Gets the price symbol
        var wishlist_items = document.querySelectorAll('.g-item-sortable'); //Gets all the items in the wishlist
        if (wishlist_items.length >= 10) { //Runs if there are more than 10 items in the wishlist
            window.scrollTo(0, document.body.scrollHeight); //Scrolls to the bottom of the page to load all the items in the wishlist
            var amWExModal = document.createRange().createContextualFragment(`<div id="amWExModalContainer">
<div id="amWExModalBg" style="background: #111111aa; width: 100%; height: 100%; position: fixed; top: 0; left: 0; z-index: 200"></div>
<div id="amWExModal" style="text-align: center; background: #FFFFFF; width: 50vw; position: fixed; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%); padding: 10px; z-index: 210;">
<h1 id="amWExModalH1">Calculating...</h1>
</div>
</div>`); //Adds a modal containing text "Loading..."
            document.body.appendChild(amWExModal); //Adds a modal containing text "Loading..."
            var totalPrice = 0;
            setTimeout(function() {
                Callback();
                for (var item of JSON.parse(wishlistJSON)) {
                    totalPrice += item.priceFloat;
                }
                if (document.getElementById('amWExModalContainer')) {
                    document.getElementById('amWExModalContainer').remove(); //Removes the "Loading..." modal
                }
                document.body.appendChild(document.createRange().createContextualFragment(`<div id="amWExModalContainer">
<div id="amWExModalBg" style="background: #111111aa; width: 100%; height: 100%; position: fixed; top: 0; left: 0; z-index: 200"></div>
<div id="amWExModal" style="text-align: center; background: #FFFFFF; width: 50vw; position: fixed; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%); padding: 10px; z-index: 210;">
<h1 id="amWExModalH1">Calculating...</h1>
</div>
</div>`));
                document.getElementById('amWExModalH1').innerHTML = `Total: ${symbol + totalPrice}`;
            }, 3000); //Runs the main callback function after 3 seconds
        } else { //Runs if there are less than 10 items in the wishlist
            Callback(); // Directly runs the callback function without waiting.
            var totalPrice = 0;
            setTimeout(function() {
                for (var item of JSON.parse(wishlistJSON)) {
                    totalPrice += item.priceFloat;
                }
                if (document.getElementById('amWExModalContainer')) {
                    document.getElementById('amWExModalContainer').remove();
                }
                document.body.appendChild(document.createRange().createContextualFragment(`<div id="amWExModalContainer">
<div id="amWExModalBg" style="background: #111111aa; width: 100%; height: 100%; position: fixed; top: 0; left: 0; z-index: 200"></div>
<div id="amWExModal" style="text-align: center; background: #FFFFFF; width: 50vw; position: fixed; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%); padding: 10px; z-index: 210;">
<h1 id="amWExModalH1">Calculating...</h1>
</div>
</div>`));
                document.getElementById('amWExModalH1').innerHTML = `Total: ${symbol + totalPrice}`;
            }, 100);
        }
    });
    // Amazon Wishlist Total - END //
}

document.body.addEventListener('click', function(e) {
    if (e.target.id == "amWExModalBg") {
        document.getElementById('amWExModalContainer').remove(); //Removes the modal
    } else if (e.target.id == "amWExModalClose") {
        e.preventDefault();
        document.getElementById('amWExModalContainer').remove(); //Removes the modal
    }
});