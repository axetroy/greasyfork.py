// ==UserScript==
// @name            Vulcun Inventory Helper
// @namespace       http://tampermonkey.net/
// @description     The best way to calculate profits and auto-disenchanting items.
// @match           https://vulcun.com/user/items*
// @require         https://greasyfork.org/scripts/16760-base64-image/code/base64-image.js
// @author          Den3er
// @version         2.1
// @encoding        utf-8
// @license         https://opensource.org/licenses/MIT
// @homepage        https://github.com/Den3er/vulcun-inventory-helper
// @supportURL      https://github.com/Den3er/vulcun-inventory-helper/issues
// @contributionURL https://github.com/Den3er/vulcun-inventory-helper#donate--support-author
// @grant           none
// ==/UserScript==

'use strict';

// BEE-mo
var bmo = {
  temp: {
    itemsRequested: 0,
    itemsPassed: 0,
    requestQueue: [],
    supportToggle: true,
    profile: {
      level: 'Bronze Tier 5',
      currentExp: 0, // total exp from (betting/jackpot/levels)
      extraExp: 0 // exp only from betting and jackpot
    },
    checkboxState: {
      selected: {
        exp: 0,
        gold: 0,
        quantity: 0,
        data: [] // items to disenchant
      },
      reward: {
        gold: 0,
        crate: 0,
        key: 0,
        rank: {
          name: 'Bronze Tier 5',
          image: '/img/level/250/1-5.png'
        }
      },
      counter: {
        legendary: 0,
        heroic: 0,
        epic: 0,
        rare: 0,
        common: 0
      }
    }
  },

  st: {
    stickers: {
      rarity: {
        legendary: {
          data: [],
          xp: 0,
          gold: 0,
          quantity: 0
        },
        heroic: {
          data: [],
          xp: 0,
          gold: 0,
          quantity: 0
        },
        epic: {
          data: [],
          xp: 0,
          gold: 0,
          quantity: 0
        },
        rare: {
          data: [],
          xp: 0,
          quantity: 0
        },
        common: {
          data: [],
          xp: 0,
          quantity: 0
        }
      },
      total: {
        xp: 0,
        gold: 0,
        quantity: 0
      }
    },
    partials: {
      rarity: {
        legendary: {
          data: [],
          xp: 0,
          gold: 0,
          quantity: 0
        },
        heroic: {
          data: [],
          xp: 0,
          gold: 0,
          quantity: 0
        },
        epic: {
          data: [],
          xp: 0,
          gold: 0,
          quantity: 0
        },
        rare: {
          data: [],
          xp: 0,
          quantity: 0
        },
        common: {
          data: [],
          xp: 0,
          quantity: 0
        }
      },
      total: {
        xp: 0,
        gold: 0,
        quantity: 0
      }
    }
  },

  initialize: function() {
    bmo.addStyles();
    bmo.parseAccountInfo();
    bmo.fetchCurrentPage();
    bmo.wowSuchSmartDoge();
  },

  // Creates a <style> tag with all styles.
  addStyles: function() {
    var css = '.bmo__DOMcontainer { margin-top: 15px; } .bmo__divider { margin-bottom: 22px; border-color: #dcdcdc; } .checkbox .bmo__lable { width: 100%; text-align: left; color: #576077; } .checkbox .bmo__lable--legendary { color: #a91cff; } .checkbox .bmo__lable--legendary { color: #a91cff; } .checkbox .bmo__lable--heroic { color: #f06927; } .checkbox .bmo__lable--epic { color: #e5b933; } .checkbox .bmo__lable--rare { color: #92b449; } .checkbox .bmo__lable--common { color: #737183; } .bmo__number { float: right; margin-top: 3px; padding-bottom: 0.1em; } .bmo__profitPanel { margin-top: -15px; } .bmo__profitPanel__body--enough { padding-bottom: 5px; } .bmo__profitPanel__row { float: left; width: 100%; margin-bottom: 10px; } .bmo__profitPanel__gold { padding-left: 7px; } .bmo__profitPanel__rankBadge { width: 2em; height: auto; margin-top: -5px; } .bmo__doge { position: fixed; right: 15px; bottom: -150px; -webkit-transition: all 0.2s ease; transition: all 0.2s ease; } .bmo__doge--shown { bottom: 0; } .bmo__doge-text { font-family: \'Comic Sans MS\', cursive; font-size: 24px; position: absolute; width: 180px; margin-top: 45px; margin-left: -180px; -webkit-transition: all 0.5s ease; transition: all 0.5s ease; text-align: center; opacity: 0; color: #c35ac3; } .bmo__doge--shown .bmo__doge-text { opacity: 1; }';

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
  },

  // Get current level and extra exp (from betting or jackpot).
  parseAccountInfo: function() {
    var getLinks = document.getElementsByTagName('a');
    for (var i = 0, len = getLinks.length; i < len; i++) {
      if (getLinks[i].href === 'https://vulcun.com/user/level') {
        var level = getLinks[i].getElementsByTagName('span')[0].innerHTML;
        bmo.temp.profile.level = level.replace('Current Rank: ', '');
        var extra = getLinks[i].getElementsByTagName('progress')[0].value;
        bmo.temp.profile.extraExp = extra;
        break;
      }
    }
  },

  /**
   * Makes a request to vulcun API server to get all items from current page,
   * then define total number of pages and pass items object to itemsResponse()
   * itemsHandler(), after restarts itself with the new parameter of next page.
   *
   * @param {number} currentPage The page number which will be fetched.
   */
  fetchCurrentPage: function(currentPage) {
    currentPage = currentPage || 1;

    var request = new XMLHttpRequest();
    // '&sort=5' in requestURL is sort from new to oldest,
    // so yes basically we fetch current page of sorted items
    var requestURL = '/api/myitems?page=' + currentPage + '&sort=5';
    request.open('POST', requestURL, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var response = JSON.parse(request.responseText);
        var totalPages = response.data.items.last_page;
        bmo.temp.itemsRequested = response.data.items.total;

        if (currentPage <= totalPages) {
          bmo.createFetchStatus(currentPage, totalPages);
          bmo.itemsHandler(response.data.items.data);
          bmo.fetchCurrentPage(currentPage + 1);
        }
      } else {
        var error = 'Vulcun API responded in an unfriendly way :/';
        bmo.createFetchStatus(undefined, undefined, error);
      }
    };

    request.onerror = function() {
      var error = 'There was a connection error of some sort.';
      bmo.createFetchStatus(undefined, undefined, error);
    };

    request.send();
  },

  /**
   * Creates the DOM status of fetching pages or request error.
   *
   * @param {number} current The number of current fetch page.
   * @param {string} total   The number of total pages.
   * @param {string} error   The text of request error.
   */
  createFetchStatus: function(current, total, error) {
    if (document.getElementById('bmo__FetchStatus') === null) {
      var sidebar = document.getElementById('vu-item-detail-container');

      var container = document.createElement('div');
      container.className = 'itemDetailWell bmo__DOMcontainer';
      container.id = 'bmo__FetchStatus';
      sidebar.appendChild(container);

      var counter = document.createElement('samp');
      counter.id = 'bmo__FetchStatus-counter';
      container.appendChild(counter);
    }

    if (current !== undefined && total !== undefined) {
      var counterMsg = document.getElementById('bmo__FetchStatus-counter');
      counterMsg.innerHTML = 'Fetched pages ' + current + ' of ' + total;
    }

    if (error !== undefined) {
      var errorMsg = document.getElementById('bmo__FetchStatus-counter');
      errorMsg.innerHTML = error;
    }
  },

  /**
   * Vulcun returns item rarity value as a number, so we just convert the
   * number to corresponding word.
   *
   * @param  {string} strNum The rarity number.
   * @return {string}        The rarity word.
   */
  createRarityName: function(strNum) {
    var names = ['legendary', 'heroic', 'epic', 'rare', 'common'];
    var toNum = parseInt(strNum, 10);
    return names[toNum];
  },

  /**
   * Returns true if object is empty:
   * http://stackoverflow.com/a/32108184
   */
  isEmptyObject: function(object) {
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        return false;
      }
    }

    return true;
  },

  /**
   * Receives object with items from fetchCurrentPage(), then passes through
   * each array to filter and leaves only those that can be disenchanted.
   *
   * @param {object} response The response object with arrays of items.
   */
  itemsHandler: function(response) {
    var temp = {};
    for (var i = 0, len = response.length; i < len; i++) {
      bmo.temp.itemsPassed += 1;

      temp.type = response[i].item_type;
      temp.quantity = response[i].quantity;
      temp.rarity = bmo.createRarityName(response[i].rarity);

      // add item to array, if it is sticker
      if (temp.type === 'sticker') {
        bmo.st.stickers.rarity[temp.rarity].data.push({
          id: response[i].item_id,
          name: response[i].name,
          quantity: response[i].quantity
        });
      }

      // do the same with partial, but if quantity is more then one
      if (temp.type === 'vulcun_partial' && temp.quantity > 1) {
        bmo.st.partials.rarity[temp.rarity].data.push({
          id: response[i].item_id,
          name: response[i].name,
          // vulcun requires to leave at least one piece of any puzzle part,
          // so we just subtract one from the total quantity
          quantity: response[i].quantity - 1
        });
      }
    }

    // callback when all items will be fetched and passed through the handler,
    // so now we can delete empty arrays
    if (bmo.temp.itemsRequested === bmo.temp.itemsPassed) {

      // iterates over items types
      var storage = bmo.st;
      for (var type in storage) {
        if (storage.hasOwnProperty(type)) {

          // iterates over items rarities
          var stRarity = storage[type].rarity;
          for (var rarity in stRarity) {
            if (stRarity.hasOwnProperty(rarity)) {

              // remove empty arrays in rarity type
              if (stRarity[rarity].data.length === 0) {
                delete stRarity[rarity];
              }

            }
          }

          // remove empty type object
          if (bmo.isEmptyObject(stRarity)) {
            delete storage[type];
          }

        }
      }

      // items object is ready to be calculated
      bmo.calculateProfit();
    }
  },

  /**
   * Iterates over the bmo.st object to calculate profit of each item by rarity,
   * then calculate total profit of item type.
   */
  calculateProfit: function() {
    var disenchant = {
      legendary: {
        xp: 100,
        gold: 100
      },
      heroic: {
        xp: 50,
        gold: 40
      },
      epic: {
        xp: 25,
        gold: 20
      },
      rare: {
        xp: 10,
        gold: 0
      },
      common: {
        xp: 5,
        gold: 0
      }
    };

    // iterates over items types
    var storage = bmo.st;
    for (var type in storage) {
      if (storage.hasOwnProperty(type)) {

        // iterates over items rarities
        var stRarity = storage[type].rarity;
        for (var rarity in stRarity) {
          if (stRarity.hasOwnProperty(rarity)) {

            // calculate profit
            var stRarityData = stRarity[rarity].data;
            for (var i = 0, len = stRarityData.length; i < len; i++) {
              var quantity = parseInt(stRarityData[i].quantity, 10);

              stRarity[rarity].xp += disenchant[rarity].xp * quantity;
              stRarity[rarity].quantity += quantity;

              if (rarity === 'legendary' || rarity === 'heroic' || rarity === 'epic') {
                stRarity[rarity].gold += disenchant[rarity].gold * quantity;
              }

              storage[type].total.xp += disenchant[rarity].xp * quantity;
              storage[type].total.quantity += quantity;

              if (rarity === 'legendary' || rarity === 'heroic' || rarity === 'epic') {
                storage[type].total.gold += disenchant[rarity].gold * quantity;
              }
            }
          }
        }
      }
    }

    bmo.createDOMControl();
  },

  /**
   * Capitalize first letter of each word:
   * http://stackoverflow.com/a/196991
   */
  capitalize: function(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  },

  /**
   * Creates a disenchant DOM control with full sets of checkboxes (items type
   * and rarity) instead of fetch status block.
   */
  createDOMControl: function() {
    var status = document.getElementById('bmo__FetchStatus');
    status.parentNode.removeChild(status);

    var sidebar = document.getElementById('vu-item-detail-container');

    var container = document.createElement('div');
    container.className = 'itemDetailWell bmo__DOMcontainer';
    container.id = 'bmo__DOMControl';
    sidebar.appendChild(container);

    var elements = [
      'stickers',
      'partials',
      'legendary',
      'heroic',
      'epic',
      'rare',
      'common'
    ];

    // create a set of filter checkboxes
    for (var i = 0, len = elements.length; i < len; i++) {
      var wrapper = document.createElement('div');
      wrapper.className = 'checkbox';
      container.appendChild(wrapper);

      // create divider at the end of type and rarity
      if (elements[i] === 'partials' || elements[i] === 'common') {
        var hr = document.createElement('hr');
        hr.className = 'bmo__divider';
        container.appendChild(hr);
      }

      var label = document.createElement('label');
      label.className = 'bmo__lable bmo__lable--' + elements[i];
      wrapper.appendChild(label);

      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'bmo__checkbox';
      checkbox.id = 'bmo__checkbox--' + elements[i];
      checkbox.checked = true;
      label.appendChild(checkbox);

      var description = document.createTextNode(bmo.capitalize(elements[i]));
      label.appendChild(description);

      var number = document.createElement('span');
      number.className = 'label label-default bmo__number';
      number.id = 'bmo__number--' + elements[i];
      number.innerHTML = 0;
      label.appendChild(number);
    }

    var panel = document.createElement('div');
    panel.className = 'panel panel-default bmo__profitPanel';
    container.appendChild(panel);

    var panelHeading = document.createElement('div');
    panelHeading.className = 'panel-heading';
    panel.appendChild(panelHeading);

    var panelTitle = document.createElement('h3');
    panelTitle.className = 'panel-title';
    panelTitle.innerHTML = 'You Profit';
    panelHeading.appendChild(panelTitle);

    var panelBody = document.createElement('div');
    panelBody.id = 'bmo__profitPanel__body';
    panelBody.className = 'panel-body';
    panelBody.innerHTML = 'Not Enough Items';
    panel.appendChild(panelBody);

    var btn = document.createElement('button');
    btn.className = 'btn btn-default';
    btn.id = 'bmo__startAutoDisenchant';
    btn.innerHTML = 'Auto-Disenchant Items';
    container.appendChild(btn);

    // callback for disenchant
    btn.onclick = function() {
      bmo.startAutoDisenchant();
      return false;
    };

    // DOM control is ready for init
    bmo.initializeCheckboxes();
    bmo.checkboxListener();
  },

  // Checks if bmo__checkbox is checked.
  checkboxIsChecked: function(name) {
    var checkbox = document.getElementById('bmo__checkbox--' + name);
    if (checkbox.checked) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * Iterates over the checked checkboxes and initializes them to get total
   * items profits in exp, gold and quantity.
   */
  initializeCheckboxes: function() {
    bmo.temp.checkboxState = {
      selected: {
        exp: 0,
        gold: 0,
        quantity: 0,
        data: [] // items to disenchant
      },
      reward: {
        gold: 0,
        crate: 0,
        key: 0,
        rank: {
          name: 'Bronze Tier 5',
          image: '/img/level/250/1-5.png'
        }
      },
      counters: {
        legendary: 0,
        heroic: 0,
        epic: 0,
        rare: 0,
        common: 0
      }
    };

    // short path to checkboxState
    var state = bmo.temp.checkboxState;

    // iterates over items types
    var storage = bmo.st;
    for (var type in storage) {
      if (storage.hasOwnProperty(type)) {

        // reset DOM checkboxes rarity counters
        var checkStickers = bmo.checkboxIsChecked('stickers');
        var checkPartials = bmo.checkboxIsChecked('partials');
        if (checkStickers === false && checkPartials === false) {
          var rarityNames = ['legendary', 'heroic', 'epic', 'rare', 'common'];
          for (var i = 0, len = rarityNames.length; i < len; i++) {
            var number = document.getElementById('bmo__number--' + rarityNames[i]);
            number.innerHTML = 0;
          }
        }

        // set items type counters
        var typeCounter = document.getElementById('bmo__number--' + type);
        typeCounter.innerHTML = storage[type].total.quantity;

        // iterates over items rarities
        var stRarity = storage[type].rarity;
        for (var rarity in stRarity) {
          if (stRarity.hasOwnProperty(rarity)) {

            if (bmo.checkboxIsChecked(type) && bmo.checkboxIsChecked(rarity)) {
              state.selected.exp += stRarity[rarity].xp;
              state.selected.quantity += stRarity[rarity].quantity;
              state.selected.data = state.selected.data.concat(stRarity[rarity].data);

              if (rarity === 'legendary' || rarity === 'heroic' || rarity === 'epic') {
                state.selected.gold += stRarity[rarity].gold;
              }
            }

            // set items rarity counters
            if (bmo.checkboxIsChecked(type)) {
              var rarityCounter = document.getElementById('bmo__number--' + rarity);
              state.counters[rarity] += stRarity[rarity].quantity;
              rarityCounter.innerHTML = state.counters[rarity];
            }
          }
        }
      }
    }

    // toggle the disenchant button
    var disenchantBtn = document.getElementById('bmo__startAutoDisenchant');
    if (state.selected.data.length === 0) {
      disenchantBtn.style.display = 'none';
    } else {
      disenchantBtn.style.display = '';
    }

    bmo.defineLevelRewards();
  },

  // Creates listener for each checkbox item.
  checkboxListener: function() {
    var deleteLink = document.querySelectorAll('.bmo__checkbox');
    for (var i = 0, len = deleteLink.length; i < len; i++) {
      deleteLink[i].addEventListener('click', function() {
        bmo.initializeCheckboxes();
      });
    }
  },

  /**
   * Iterates over the levels object to define the current user level and
   * collects all available rewards from the following levels up.
   */
  defineLevelRewards: function() {
    var levels = {
      bronze: [{
        requiredXP: 0,
        level: 'Bronze Tier 5',
        image: '/img/level/250/1-5.png'
      }, {
        requiredXP: 5,
        level: 'Bronze Tier 4',
        image: '/img/level/250/1-4.png',
        reward: {
          gold: 10
        }
      }, {
        requiredXP: 10,
        level: 'Bronze Tier 3',
        image: '/img/level/250/1-3.png',
        reward: {
          gold: 10
        }
      }, {
        requiredXP: 15,
        level: 'Bronze Tier 2',
        image: '/img/level/250/1-2.png',
        reward: {
          gold: 10
        }
      }, {
        requiredXP: 50,
        level: 'Bronze Tier 1',
        image: '/img/level/250/1-1.png',
        reward: {
          gold: 10
        }
      }],

      silver: [{
        requiredXP: 150,
        level: 'Silver Tier 5',
        image: '/img/level/250/2-5.png',
        reward: {
          crate: 1,
          key: 1
        }
      }, {
        requiredXP: 200,
        level: 'Silver Tier 4',
        image: '/img/level/250/2-4.png',
        reward: {
          gold: 20
        }
      }, {
        requiredXP: 250,
        level: 'Silver Tier 3',
        image: '/img/level/250/2-3.png',
        reward: {
          gold: 20
        }
      }, {
        requiredXP: 300,
        level: 'Silver Tier 2',
        image: '/img/level/250/2-2.png',
        reward: {
          gold: 20
        }
      }, {
        requiredXP: 400,
        level: 'Silver Tier 1',
        image: '/img/level/250/2-1.png',
        reward: {
          gold: 20
        }
      }],

      gold: [{
        requiredXP: 700,
        level: 'Gold Tier 5',
        image: '/img/level/250/3-5.png',
        reward: {
          crate: 1,
          key: 1
        }
      }, {
        requiredXP: 850,
        level: 'Gold Tier 4',
        image: '/img/level/250/3-4.png',
        reward: {
          gold: 30
        }
      }, {
        requiredXP: 1000,
        level: 'Gold Tier 3',
        image: '/img/level/250/3-3.png',
        reward: {
          gold: 30
        }
      }, {
        requiredXP: 1150,
        level: 'Gold Tier 2',
        image: '/img/level/250/3-2.png',
        reward: {
          gold: 30
        }
      }, {
        requiredXP: 1300,
        level: 'Gold Tier 1',
        image: '/img/level/250/3-1.png',
        reward: {
          gold: 30
        }
      }],

      platinum: [{
        requiredXP: 3000,
        level: 'Platinum Tier 5',
        image: '/img/level/250/4-5.png',
        reward: {
          crate: 2,
          key: 2
        }
      }, {
        requiredXP: 3500,
        level: 'Platinum Tier 4',
        image: '/img/level/250/4-4.png',
        reward: {
          gold: 40
        }
      }, {
        requiredXP: 4000,
        level: 'Platinum Tier 3',
        image: '/img/level/250/4-3.png',
        reward: {
          gold: 40
        }
      }, {
        requiredXP: 4500,
        level: 'Platinum Tier 2',
        image: '/img/level/250/4-2.png',
        reward: {
          gold: 40
        }
      }, {
        requiredXP: 5000,
        level: 'Platinum Tier 1',
        image: '/img/level/250/4-1.png',
        reward: {
          gold: 40
        }
      }],

      diamond: [{
        requiredXP: 9000,
        level: 'Diamond Tier 5',
        image: '/img/level/250/5-5.png',
        reward: {
          crate: 2,
          key: 2
        }
      }, {
        requiredXP: 10500,
        level: 'Diamond Tier 4',
        image: '/img/level/250/5-4.png',
        reward: {
          gold: 50
        }
      }, {
        requiredXP: 13000,
        level: 'Diamond Tier 3',
        image: '/img/level/250/5-3.png',
        reward: {
          gold: 50
        }
      }, {
        requiredXP: 14500,
        level: 'Diamond Tier 2',
        image: '/img/level/250/5-2.png',
        reward: {
          gold: 50
        }
      }, {
        requiredXP: 16000,
        level: 'Diamond Tier 1',
        image: '/img/level/250/5-1.png',
        reward: {
          gold: 50
        }
      }],

      master: [{
        requiredXP: 50000,
        level: 'Master Tier 5',
        image: '/img/level/250/6-5.png',
        reward: {
          crate: 3,
          key: 3
        }
      }, {
        requiredXP: 65000,
        level: 'Master Tier 4',
        image: '/img/level/250/6-5.png',
        reward: {
          gold: 250
        }
      }, {
        requiredXP: 80000,
        level: 'Master Tier 3',
        image: '/img/level/250/6-5.png',
        reward: {
          gold: 250
        }
      }, {
        requiredXP: 95000,
        level: 'Master Tier 2',
        image: '/img/level/250/6-5.png',
        reward: {
          gold: 250
        }
      }, {
        requiredXP: 500000,
        level: 'Master Tier 1',
        image: '/img/level/250/6-5.png',
        reward: {
          crate: 20,
          key: 20
        }
      }]
    };

    var counterToggle = false;
    var state = bmo.temp.checkboxState;

    // iterates over types of ranks
    for (var type in levels) {
      if (levels.hasOwnProperty(type)) {

        // iterates over ranks
        for (var rank in levels[type]) {
          if (levels[type].hasOwnProperty(rank)) {

            // define current exp number
            if (levels[type][rank].level === bmo.temp.profile.level) {
              var profile = bmo.temp.profile;
              profile.currentExp = levels[type][rank].requiredXP + profile.extraExp;
              counterToggle = true;
            }

            if (counterToggle) {
              // define current object from all levels
              var exp = state.selected.exp + bmo.temp.profile.currentExp;
              if (exp > levels[type][rank].requiredXP) {

                // skip iteration on current rank
                if (levels[type][rank].level === bmo.temp.profile.level) {
                  state.reward.rank.name = levels[type][rank].level;
                  continue;
                }

                state.reward.rank.name = levels[type][rank].level;
                state.reward.rank.image = levels[type][rank].image;

                // iterates over level reward
                var reward = levels[type][rank].reward;
                for (var typeReward in reward) {
                  if (reward.hasOwnProperty(typeReward)) {
                    if (typeReward === 'gold') {
                      state.reward.gold += reward[typeReward];
                    }

                    if (typeReward === 'crate') {
                      state.reward.crate += reward[typeReward];
                    }

                    if (typeReward === 'key') {
                      state.reward.key += reward[typeReward];
                    }
                  }
                }
              }
            }

          }
        }
      }
    }

    bmo.initializeProfitPanel();
  },

  // Displays total profits (gold, next level up and crate/key).
  initializeProfitPanel: function() {
    var state = bmo.temp.checkboxState;

    var wrapper = document.getElementById('bmo__profitPanel__body');
    wrapper.innerHTML = '';

    // checks if exp is enough
    if (state.selected.exp === 0) {
      wrapper.innerHTML = 'Not Enough Items';
      wrapper.classList.remove('bmo__profitPanel__body--enough');
      return false;
    } else {
      wrapper.classList.add('bmo__profitPanel__body--enough');
    }

    var expGold = document.createElement('span');
    expGold.className = 'bmo__profitPanel__row';
    wrapper.appendChild(expGold);

    var exp = document.createElement('span');
    exp.innerHTML = state.selected.exp + ' XP';
    expGold.appendChild(exp);

    if (state.selected.gold > 0 || state.reward.gold > 0) {
      var gold = document.createElement('span');
      gold.className = 'glyph-icon flaticon-coins35 bmo__profitPanel__gold';
      gold.innerHTML = ' ' + Number(state.selected.gold + state.reward.gold) + ' Gold';
      expGold.appendChild(gold);
    }

    if (state.reward.rank.name !== bmo.temp.profile.level) {
      var rank = document.createElement('span');
      rank.className = 'bmo__profitPanel__row';
      wrapper.appendChild(rank);

      var rankBadge = document.createElement('img');
      rankBadge.className = 'bmo__profitPanel__rankBadge';
      rankBadge.src = state.reward.rank.image;
      rank.appendChild(rankBadge);

      var rankText = document.createTextNode(' ' + state.reward.rank.name);
      rank.appendChild(rankText);
    }

    if (state.reward.crate !== 0 && state.reward.key !== 0) {
      var crateKey = document.createElement('span');
      crateKey.className = 'bmo__profitPanel__row';
      wrapper.appendChild(crateKey);

      var crateKeyIcon = document.createElement('span');
      crateKeyIcon.className = 'fa fa-star';
      crateKey.appendChild(crateKeyIcon);

      var crateKeyText = document.createTextNode(' ' + state.reward.crate + ' crates, ' + state.reward.key + ' keys');
      crateKey.appendChild(crateKeyText);
    }
  },

  /**
   * Creates the DOM wow.doge banner. Works like status.
   *
   * @param {number} queue The current iteration.
   */
  wowSuchSmartDoge: function(queue) {
    if (document.getElementById('bmo__doge') === null) {
      var wrapper = document.createElement('div');
      wrapper.className = 'bmo__doge';
      wrapper.id = 'bmo__doge';
      document.body.appendChild(wrapper);

      var suchText = document.createElement('div');
      suchText.className = 'bmo__doge-text';
      suchText.id = 'bmo__doge-text';
      suchText.innerHTML = 'WOW, Much Convenient';
      wrapper.appendChild(suchText);

      var suchImage = document.createElement('img');
      suchImage.src = bmoBase64.doge;
      suchImage.setAttribute('width', '150');
      suchImage.setAttribute('height', '150');
      wrapper.appendChild(suchImage);
    }

    var doge = document.getElementById('bmo__doge');
    var dogeText = document.getElementById('bmo__doge-text');

    if (queue === 1) {
      doge.className = 'bmo__doge bmo__doge--shown';
    }

    if (bmo.temp.supportToggle && queue > 300) {
      doge.className = 'bmo__doge';
      bmo.temp.supportToggle = false;

      setTimeout(function() {
        doge.className = 'bmo__doge bmo__doge--shown';
        dogeText.innerHTML = 'Very Support';

        var br = document.createElement('br');
        dogeText.appendChild(br);

        var supportLink = document.createElement('a');
        supportLink.href = 'https://steamcommunity.com/tradeoffer/new/?partner=62239945&token=JeENsh5N';
        supportLink.target = '_blank';
        supportLink.innerHTML = '(Donate Item)';
        dogeText.appendChild(supportLink);
      }, 500);
    }
  },

  /**
   * Iterates over the selected items (bmo.temp.checkboxState.selected.data) to
   * create the queue of items for next disenchant function.
   */
  startAutoDisenchant: function() {
    bmo.temp.requestQueue = [];

    // iterates over items
    var data = bmo.temp.checkboxState.selected.data;
    for (var item in data) {
      if (data.hasOwnProperty(item)) {

        // multiplies the instance of item in the queue
        for (var i = 0, len = data[item].quantity; i < len; i++) {
          bmo.temp.requestQueue.push({
            id: data[item].id,
            name: data[item].name
          });
        }

      }
    }

    if (data.length === 0) {
      return false;
    }

    bmo.disenchantRequest();
  },

  /**
   * Makes a request to vulcun API server for disenchant item from current
   * queue, then restarts itself with the new parameter of next queue.
   *
   * @param {number} queue The number of current queue.
   */
  disenchantRequest: function(queue) {
    queue = queue || 0;

    var request = new XMLHttpRequest();
    var itemID = bmo.temp.requestQueue[queue].id;
    var requestURL = '/api/disenchant?id=' + itemID;
    request.open('POST', requestURL, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var nextQueue = queue + 1;
        var name = bmo.temp.requestQueue[queue].name;
        var totalRequests = bmo.temp.requestQueue.length;

        if (queue <= totalRequests) {
          bmo.createDisenchantStatus(nextQueue, totalRequests, name);
          bmo.wowSuchSmartDoge(nextQueue);

          if (nextQueue !== totalRequests) {
            bmo.disenchantRequest(nextQueue);
          }
        }

        if (nextQueue === totalRequests) {
          bmo.createDisenchantStatus(undefined, undefined, undefined, 'reload');

          setTimeout(function() {
            location.reload();
          }, 2000);
        }
      } else {
        var error = 'Vulcun API responded in an unfriendly way :/';
        bmo.createDisenchantStatus(undefined, undefined, undefined, error);
      }
    };

    request.onerror = function() {
      var error = 'There was a connection error of some sort.';
      bmo.createDisenchantStatus(undefined, undefined, undefined, error);
    };

    request.send();
  },

  /**
   * Creates the DOM status of disenchant or request error.
   *
   * @param {number} current The number of current queue.
   * @param {string} total   The number of total queue.
   * @param {string} name   The name of current item in queue.
   * @param {string} error   The text of request error.
   */
  createDisenchantStatus: function(current, total, name, error) {
    if (document.getElementById('bmo__disenchantStatus') === null) {
      // remove DOM control container
      var DOMControl = document.getElementById('bmo__DOMControl');
      DOMControl.parentNode.removeChild(DOMControl);

      var sidebar = document.getElementById('vu-item-detail-container');

      var container = document.createElement('div');
      container.className = 'itemDetailWell bmo__DOMcontainer';
      container.id = 'bmo__disenchantStatus';
      sidebar.appendChild(container);

      var counter = document.createElement('samp');
      counter.id = 'bmo__disenchantStatus-counter';
      container.appendChild(counter);
    }

    if (current !== undefined && total !== undefined && name !== undefined) {
      var counterMsg = document.getElementById('bmo__disenchantStatus-counter');
      counterMsg.innerHTML = 'Disenchanted items ' + current + ' of ' + total + '<br>' + name;
    }

    if (error !== undefined) {
      var errorMsg = document.getElementById('bmo__disenchantStatus-counter');

      if (error === 'reload') {
        errorMsg.innerHTML = 'Done!' + '<br>' + 'Reload the page...';
      } else {
        errorMsg.innerHTML = error;
      }
    }
  }
};

bmo.initialize();
