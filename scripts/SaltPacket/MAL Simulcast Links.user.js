// ==UserScript==
// @name         MAL Simulcast Links
// @namespace    SaltPacket
// @version      1.4.2
// @description  Adds simulcast links and schedule indicator to MAL anime lists.
// @author       SaltPacket
// @match        https://myanimelist.net/animelist/*
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.7.7/dayjs.min.js#sha384=krws1LdI%2Blja1WZrNLL0PC3uTO9YhAYUxVh6Z85ux2cVs8Mv28Tuy0FCrfmrQ9jA
// ==/UserScript==
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/**
 * Main entry.
 */



(async () => {
    // Limit to own anime list.
    const bodyClasses = document.body.classList;
    if (!(bodyClasses.contains('ownlist') && bodyClasses.contains('anime'))) {
        return;
    }
    try {
        const remoteData = Object(_data__WEBPACK_IMPORTED_MODULE_2__["getSimulcastData"])();
        const domHandler = new _dom__WEBPACK_IMPORTED_MODULE_1__["DOMHandler"]();
        domHandler.injectSimulcastData((await remoteData).data);
        domHandler.decorateDom();
        GM_addStyle(_css__WEBPACK_IMPORTED_MODULE_0__["default"]);
    }
    catch (e) {
        // No op.
    }
})();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/**
 * CSS for markup generated.
 */

/**
 * Generates CSS for a service.
 *
 * @param service
 *   The service to generate CSS for.
 *
 * @return
 *   The CSS as a string.
 */
function generateServiceCss({ key, colors }) {
    return `
.simul-link--${key}{
  background-color: ${colors.primary};
  color: ${colors.secondary};
}
`;
}
/* harmony default export */ __webpack_exports__["default"] = (`
.simul-link {
  display: block;
  margin-top: 0.25em;
  border-radius: 4px;
  padding: 0.1em 0.25em;
  width: max-content;
}
${_services__WEBPACK_IMPORTED_MODULE_0__["services"].map(generateServiceCss).join('')}`);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "services", function() { return services; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getServiceFromURL", function() { return getServiceFromURL; });
/**
 * Information about known streaming services.
 */
const services = [
    {
        key: 'amazon',
        name: 'Amazon',
        colors: {
            primary: '#faa300',
            secondary: '#000',
        },
    },
    {
        key: 'crunchyroll',
        name: 'Crunchyroll',
        colors: {
            primary: '#f07e0f',
            secondary: '#fff',
        },
    },
    {
        key: 'hidive',
        name: 'HIDIVE',
        colors: {
            primary: '#33b3f4',
            secondary: '#fff',
        },
    },
    {
        key: 'netflix',
        name: 'NetFlix',
        colors: {
            primary: '#e20012',
            secondary: '#141414',
        },
    },
    {
        key: 'youtube',
        name: 'YouTube',
        colors: {
            primary: '#f90000',
            secondary: '#fff',
        },
    },
    {
        key: 'funimation',
        name: 'Funimation',
        colors: {
            primary: '#410099',
            secondary: '#fff',
        },
    },
];
/**
 * Attempts to get the service from a simulcast URL.
 *
 * @param URL
 *   The URL to match against.
 * @return
 *   The service, or null if not known.
 */
function getServiceFromURL({ hostname }) {
    const domainName = hostname.replace(/^(www|smile)\./, '').split('.')[0];
    return services.find(({ key }) => domainName === key);
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOMHandler", function() { return DOMHandler; });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/**
 * DOM operations.
 */

const ONE_HOUR = 60 * 60;
const ONE_DAY = ONE_HOUR * 24;
/**
 * Generates an element informing the next simulcast.
 *
 * @param next
 *   The next simulcast time.
 *
 * @return
 *   The created element.
 */
function createInfoElement(next) {
    const now = dayjs();
    // The element base.
    const element = document.createElement('span');
    element.classList.add('simul-release');
    const diff = next.diff(now, 'second');
    // The show is available.
    if (diff < 0) {
        element.classList.add('simul-release--available');
        element.innerText = 'Available';
    }
    // Display next episode using the largest sensible unit.
    else {
        const unit = diff > ONE_DAY
            ? 'day'
            : diff > ONE_HOUR
                ? 'hour'
                : 'minute';
        const unitDiff = Math.round(next.diff(now, unit, true));
        element.innerText = `In ${unitDiff} ${unit}${unitDiff === 1 ? '' : 's'}`;
    }
    return element;
}
/**
 * Generates a link from a simulcast entry item.
 *
 * @param item
 *   The item.
 *
 * @return
 *   The created link.
 */
function createLink(url, start) {
    const link = document.createElement('a');
    link.target = '_blank';
    link.href = url;
    const service = Object(_services__WEBPACK_IMPORTED_MODULE_0__["getServiceFromURL"])(new URL(link.href));
    // Service name.
    const name = service ? service.name : link.hostname;
    link.innerHTML = `<span class="simul-link__title">${name}</span>`;
    if (start) {
        link.innerHTML += `<span class="simul-link__time"> | ${start.format('dddd[s] H:mm')}</span>`;
    }
    const classes = [
        'simul-link',
        (service ? `simul-link--${service.key}` : ''),
    ];
    link.classList.add(...classes.filter(Boolean));
    return link;
}
/**
 * A bridging entry to an entry in the DOM.
 */
class DOMEntry {
    /**
     * Constructs a new DOMEntry.
     *
     * @param rowElement
     *   The row wrapper element.
     */
    constructor(rowElement) {
        this.rowElement = rowElement;
        // Whether the link has been added for this entry.
        this.addedLink = false;
        // Parse the MAL ID from more-link element wrapper HTML ID.
        const infoContainer = rowElement.querySelector('.more-info');
        this.malID = parseInt(/more-(\d+)/.exec(infoContainer.id)[1], 10);
        // Wrapper for the main data elements.
        this.wrapper = rowElement.querySelector('.list-table-data');
        // Title data cell.
        this.titleCell = this.wrapper.querySelector('.title');
        // Create info cell where simulcast information will go.
        this.infoCell = document.createElement('td');
        this.infoCell.className = 'data simulcast';
        this.wrapper.appendChild(this.infoCell);
    }
    /**
     * Gets the time of the next simulcast.
     *
     * @return
     *   The next simulcast time if one exists.
     */
    nextSimulcastTime() {
        let progress = 0;
        let max = Infinity;
        const progressElement = this.wrapper.querySelector('.progress .link');
        if (!progressElement) {
            return;
        }
        // Read progress.
        if (progressElement.textContent !== '-') {
            progress = Number.parseInt(progressElement.textContent, 10);
        }
        // Read maximum episodes.
        const maximumElement = progressElement.parentElement.nextElementSibling;
        if (maximumElement && maximumElement.textContent !== '-') {
            max = Number.parseInt(maximumElement.textContent, 10);
        }
        // If there is a start time, use info above to calculate the next simulcast.
        if (this.startTime && progress < max) {
            const delays = this.simulcastData.adjust
                ? this.simulcastData.adjust.filter(point => point <= progress).length
                : 0;
            const boosts = this.simulcastData.boost
                ? this.simulcastData.boost.filter(point => point <= progress).length
                : 0;
            return dayjs(this.startTime).add(progress + (delays - boosts), 'week');
        }
    }
    /**
     * Associate a simulcast entry with this DOM bridge.
     *
     * @param entry
     *   The remote data entry.
     */
    setSimulcastData(entry) {
        this.simulcastData = entry;
        // Parse start date if one exists.
        this.startTime = entry.start
            ? dayjs(entry.start).subtract(DOMEntry.timezoneOffset, 'minute')
            : undefined;
        // Add link if not already done so.
        if (!this.addedLink) {
            this.addedLink = true;
            this.titleCell.appendChild(createLink(entry.url, this.startTime));
        }
    }
    /**
     * Get the simulcast entry associated with this DOM bridge.
     *
     * @return entry
     *   The remote data entry.
     */
    getSimulcastData() {
        return this.simulcastData;
    }
    /**
     * Initialize this item fully.
     *
     * @param moveTo
     *   Append this DOM element after this element given.
     */
    init(moveTo) {
        if (moveTo) {
            moveTo.after(this.rowElement);
        }
        // Watch for changes on the progress element to update next simulcast time.
        const observer = new MutationObserver(() => this.update());
        observer.observe(this.wrapper.querySelector('.progress'), { characterData: true, childList: true, subtree: true });
        // Initial update call.
        this.update();
    }
    /**
     * Updates info cell with the next simulcast text.
     */
    update() {
        this.infoCell.innerHTML = '';
        if (!this.simulcastData) {
            return;
        }
        const next = this.nextSimulcastTime();
        if (!next) {
            return;
        }
        const nextInfoElement = createInfoElement(next);
        if (!nextInfoElement) {
            return;
        }
        this.infoCell.innerHTML = nextInfoElement.outerHTML;
    }
}
// The timezone offset of the client in minutes.
DOMEntry.timezoneOffset = new Date().getTimezoneOffset();
/**
 * Handler for the DOM elements.
 */
class DOMHandler {
    /**
     * Constructs a new DOMHandler.
     */
    constructor() {
        const header = document.querySelector('.list-table .list-table-header');
        if (header) {
            // Add table header for simulcast column.
            header.insertAdjacentHTML('beforeend', `
<th class="header-title simulcast">
  <a class="link hover_info">Simulcast</a>
</th>`);
            this.header = header.parentElement;
        }
        // Build bridges for rows.
        this.rows = Array.from(document.querySelectorAll('.list-table .list-item'))
            .map(row => new DOMEntry(row));
    }
    /**
     * Associates simulcast remote data entries with the DOM elements.
     *
     * @param simulcastData
     *   The entries.
     */
    injectSimulcastData(simulcastData) {
        simulcastData.forEach(entry => {
            const row = this.rows.find(row => row.malID === entry.mal);
            if (row) {
                row.setSimulcastData(entry);
            }
        });
        // Filter out rows with no simulcast data.
        this.rows = this.rows.filter(row => row.getSimulcastData());
    }
    /**
     * Initialize full DOM decoration.
     */
    decorateDom() {
        // Sort rows by next simulcast.
        this.rows.sort((a, b) => {
            const aNext = a.nextSimulcastTime();
            const bNext = b.nextSimulcastTime();
            const aValue = aNext ? aNext.unix() : 0;
            const bValue = bNext ? bNext.unix() : 0;
            return bValue - aValue;
        });
        // Initialize the rows.
        this.rows.forEach(row => row.init(this.header));
    }
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSimulcastData", function() { return getSimulcastData; });
/**
 * Data definitions.
 */
/**
 * Gets the data from the remote data source.
 */
async function getSimulcastData() {
    const response = await fetch('https://gist.githubusercontent.com/wongjn/67067071f4f97f097c83a511a23ecf00/raw/db.json', { cache: 'no-store' });
    return response.json();
}


/***/ })
/******/ ]);