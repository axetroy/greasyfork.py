// ==UserScript==
// @name         Cleanreads
// @namespace    http://hermanfassett.me
// @version      1.1
// @description  Cleanreads userscript for Goodreads.com
// @author       Herman Fassett
// @match        https://www.goodreads.com/*
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle( `
    .contentComment { padding: 10px 5px 10px 5px; }
    .contentClean { color: green; }
    .contentNotClean { color: red; }
    .contentUnknown { color: blue; }
    #crSettingsDialog {
        width: 500px;
        height: 500px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border: 1px solid rgba(0,0,0,0.15);
        display: none;
    }
    #crSettingsHeader {
        height: 50px;
        width: 100%;
        background: #F4F1EA;
        text-align: center;
        box-shadow: 0 1px 2px rgba(0,0,0,0.15);
    }
    #crSettingsHeader h1 {
        line-height: 50px;
        color: #382110;
    }
    #crSettingsHeader h1, .crSettingsHeader {
        font-family: "Lato", "Helvetica Neue", "Helvetica", sans-serif;
    }
    .crSettingsHeader, #crSettingsTermButtons { padding-top: 20px; }
    #crSettingsTermButtons button { margin-right: 5px; }
    #crSettingsBody { height: 400px; overflow: auto; }
    #crSettingsFooter {
        height: 50px;
        width: 100%;
        box-shadow: 1px 0 2px rgba(0,0,0,0.15);
    }
    #crSettingsFooter button {
        float: right;
        margin: 10px 10px 0 0;
    }
    #crSettingsFooter button.saveButton {
        color: white;
        background-color: #409D69;
    }
    .crTermsContainer { display: inline-block; }
    #crSnippetHeader {
        float: left;
        padding-right: 10px;
    }
`);

(function(Cleanreads) {
    'use strict';

    /** The positive search terms when determining verdict */
    Cleanreads.POSITIVE_SEARCH_TERMS = [
        { term: 'clean', exclude: { before: ['not', 'isn\'t'], after: ['ing'] }},
        { term: 'no sex', exclude: { before: [], after: [] }}
    ];

    /** The negative search terms when determining verdict */
    Cleanreads.NEGATIVE_SEARCH_TERMS = [
        { term: 'sex', exclude: { before: ['no'], after: ['ist'] }},
        { term: 'adult', exclude: { before: ['young', 'new'], after: []}}
    ];

    Cleanreads.SNIPPET_HALF_LENGTH = 65;
    Cleanreads.ATTEMPTS = 10;

    /**
     * Load the settings from local storage if existant
     */
    Cleanreads.loadSettings = function() {
        try {
            Cleanreads.POSITIVE_SEARCH_TERMS = JSON.parse(localStorage.getItem("Cleanreads.POSITIVE_SEARCH_TERMS")) || Cleanreads.POSITIVE_SEARCH_TERMS;
            Cleanreads.NEGATIVE_SEARCH_TERMS = JSON.parse(localStorage.getItem("Cleanreads.NEGATIVE_SEARCH_TERMS")) || Cleanreads.NEGATIVE_SEARCH_TERMS;
            Cleanreads.SNIPPET_HALF_LENGTH = JSON.parse(localStorage.getItem("Cleanreads.SNIPPET_HALF_LENGTH")) || Cleanreads.SNIPPET_HALF_LENGTH;
            Cleanreads.ATTEMPTS = JSON.parse(localStorage.getItem("Cleanreads.ATTEMPTS")) || Cleanreads.ATTEMPTS;

            let settingsBody = document.getElementById("crSettingsBody");
            if (settingsBody) {
                settingsBody.innerHTML = `
                <div class="userInfoBoxContent">
                    <div id="crSettingsTermButtons">
                    </div>
                    <h1 class="crSettingsHeader">Positive Search Terms:</h1>
                    <div id="crPositiveSearchTerms">
                    </div>
                    <h1 class="crSettingsHeader">Negative Search Terms:</h1>
                    <div id="crNegativeSearchTerms">
                    </div>
                    <h1 class="crSettingsHeader">Other Settings:</h1>
                    <h4 id="crSnippetHeader">Snippet length:</h4> <input id="crSnippetHalfLength" type="number" value="${Cleanreads.SNIPPET_HALF_LENGTH}" min="0" />
                    <h4 id="crAttemptsHeader">Max Verdict Load Attempts (tries every second):</h4> <input id="crAttempts" type="number" value="${Cleanreads.ATTEMPTS}" min="1" />
                </div>
                `;

                // Add buttons
                let addPositiveButton = document.createElement("button");
                addPositiveButton.innerText = "Add Positive";
                addPositiveButton.className = "gr-button";
                addPositiveButton.onclick = Cleanreads.addSearchTerm.bind(null, true, null, null, null);
                document.getElementById("crSettingsTermButtons").appendChild(addPositiveButton);
                let addNegativeButton = document.createElement("button");
                addNegativeButton.innerText = "Add Negative";
                addNegativeButton.className = "gr-button";
                addNegativeButton.onclick = Cleanreads.addSearchTerm.bind(null, false, null, null, null);
                document.getElementById("crSettingsTermButtons").appendChild(addNegativeButton);
                let resetButton = document.createElement("button");
                resetButton.innerText = "Reset";
                resetButton.className = "gr-button";
                resetButton.onclick = function() {
                    if (confirm("Are you sure you want to remove? You will have to refresh the page to see default values loaded.")) {
                        localStorage.removeItem("Cleanreads.POSITIVE_SEARCH_TERMS");
                        localStorage.removeItem("Cleanreads.NEGATIVE_SEARCH_TERMS");
                        localStorage.removeItem("Cleanreads.SNIPPET_HALF_LENGTH");
                        localStorage.removeItem("Cleanreads.ATTEMPTS");
                        Cleanreads.loadSettings();
                    }
                }
                document.getElementById("crSettingsTermButtons").appendChild(resetButton);

                // Add existing terms
                Cleanreads.POSITIVE_SEARCH_TERMS.forEach((search) => Cleanreads.addSearchTerm(true, search.term, search.exclude.before, search.exclude.after));
                Cleanreads.NEGATIVE_SEARCH_TERMS.forEach((search) => Cleanreads.addSearchTerm(false, search.term, search.exclude.before, search.exclude.after));
            }
        } catch (ex) {
            console.error("Cleanreads: Failed to load settings!", ex);
        }
    };

    /**
     * Save the positive and negative search terms to local storage
     */
    Cleanreads.saveSettings = function() {
        let positiveTerms = document.querySelectorAll("#crPositiveSearchTerms > .crTermsContainer");
        let negativeTerms = document.querySelectorAll("#crNegativeSearchTerms > .crTermsContainer");

        Cleanreads.POSITIVE_SEARCH_TERMS = [...positiveTerms].map((search) => {
            return {
                term: search.querySelector("[name=term]").value,
                exclude: {
                    before: search.querySelector("[name=excludeBefore]").value.split(",").map(x => x.trim()),
                    after: search.querySelector("[name=excludeAfter]").value.split(",").map(x => x.trim())
                }
            }
        }).filter(x => x.term);

        Cleanreads.NEGATIVE_SEARCH_TERMS = [...negativeTerms].map((search) => {
            return {
                term: search.querySelector("[name=term]").value,
                exclude: {
                    before: search.querySelector("[name=excludeBefore]").value.split(",").map(x => x.trim()),
                    after: search.querySelector("[name=excludeAfter]").value.split(",").map(x => x.trim())
                }
            }
        }).filter(x => x.term);

        Cleanreads.SNIPPET_HALF_LENGTH = parseInt(document.getElementById("crSnippetHalfLength").value) || Cleanreads.SNIPPET_HALF_LENGTH;
        Cleanreads.ATTEMPTS = parseInt(document.getElementById("crAttempts").value) || Cleanreads.ATTEMPTS;

        localStorage.setItem("Cleanreads.POSITIVE_SEARCH_TERMS", JSON.stringify(Cleanreads.POSITIVE_SEARCH_TERMS));
        localStorage.setItem("Cleanreads.NEGATIVE_SEARCH_TERMS", JSON.stringify(Cleanreads.NEGATIVE_SEARCH_TERMS));
        localStorage.setItem("Cleanreads.SNIPPET_HALF_LENGTH", JSON.stringify(Cleanreads.SNIPPET_HALF_LENGTH));
        localStorage.setItem("Cleanreads.ATTEMPTS", JSON.stringify(Cleanreads.ATTEMPTS));
        Cleanreads.loadSettings();
    }

    /**
     * Setup the settings modal for Cleanreads
     */
    Cleanreads.setupSettings = function() {
        // Add link to menu dropdown
        let links = Array.from(document.getElementsByClassName('menuLink')).filter(x => x.innerText == 'Account settings');
        if (links && links.length) {
            let li = document.createElement('li');
            li.className = 'menuLink';
            li.onclick = Cleanreads.showSettings;
            li.innerHTML = `<a href='#' class='siteHeader__subNavLink'>Cleanreads settings</a>`;
            links[0].parentNode.insertBefore(li, links[0].nextSibling);
        }
        // Add dialog
        document.body.innerHTML += `
            <div id="crSettingsDialog">
                <div id="crSettingsHeader"><h1>Cleanreads Settings</h1></div>
                <div id="crSettingsBody">
                </div>
                <div id="crSettingsFooter"></div>
            </div>
            `;
        // Add link to profile page
        let settingsLink = document.createElement('a');
        settingsLink.href = '#';
        settingsLink.innerText = 'Cleanreads settings';
        settingsLink.onclick = Cleanreads.showSettings;
        document.getElementsByClassName('userInfoBoxContent')[0].appendChild(settingsLink);
        // Add close button to dialog
        let closeButton = document.createElement('button');
        closeButton.innerText = 'Close';
        closeButton.className = 'gr-button';
        closeButton.onclick = Cleanreads.hideSettings;
        document.getElementById('crSettingsFooter').appendChild(closeButton);
        // Add save button to dialog
        let saveButton = document.createElement('button');
        saveButton.innerText = 'Save';
        saveButton.className = 'gr-button saveButton';
        saveButton.onclick = Cleanreads.saveSettings;
        document.getElementById('crSettingsFooter').appendChild(saveButton);
        Cleanreads.loadSettings();
    };

    /**
     * Add a search term to the settings UI
     */
    Cleanreads.addSearchTerm = function(positive, term, before, after) {
        console.log(positive, term, before, after);
        document.getElementById(`cr${positive ? 'Positive' : 'Negative'}SearchTerms`).insertAdjacentHTML("beforeend",
            `<div class="crTermsContainer">
             <input name="excludeBefore" value="${before ? before.join(", ") : ''}" type="text" />
             <input name="term" value="${term || ''}" type="text" />
             <input name="excludeAfter" value="${after ? after.join(", ") : ''}" type="text" />
             </div>`);
    };

    /**
     * Setup the rating (verdict) container on a book page
     */
    Cleanreads.setupRating = function() {
        let match = window.location.pathname.match(/book\/show\/(\d+)/);
        if (match && match.length > 1) {
            Cleanreads.loadSettings();
            Cleanreads.reviews = [];
            Cleanreads.positives = 0;
            Cleanreads.negatives = 0;

            // Create container for rating
            let container = document.getElementById('descriptionContainer');
            let contentDescription = document.createElement('div');
            contentDescription.id = 'contentDescription';
            contentDescription.className = 'readable stacked u-bottomGrayBorder u-marginTopXSmall u-paddingBottomXSmall';
            contentDescription.innerHTML = `
                <h2 class="buyButtonContainer__title u-inlineBlock">Cleanreads Rating</h2>
                <h2 class="buyButtonContainer__title">
                Verdict: <span id="crVerdict">Loading...</span>
                (<span id="crPositives" class="contentClean">0</span>/<span id="crNegatives" class="contentNotClean">0</span>)
                </h2>
                <a id='expandCrDetails' href="#">(Details)</a>
                <div id="crDetails" style="display:none"></div>
                `;
            container.parentNode.insertBefore(contentDescription, container.nextSibling);
            Cleanreads.crDetails = document.getElementById('crDetails');
            document.getElementById('expandCrDetails').onclick = Cleanreads.expandDetails;
            Cleanreads.startReviews();
        }
    };

    /**
     * Start attempting to get the available reviews on the page and read their content
     */
    Cleanreads.startReviews = function() {
        Cleanreads.getReviews();
        // Reviews are delayed content so keep looking for a bit if nothing
        debugger;
        if (!Cleanreads.reviews.length && Cleanreads.ATTEMPTS--) {
            setTimeout(Cleanreads.startReviews, 1000);
        } else {
            Cleanreads.calculateContent();
        }
    };

    /**
     * Get reviews from page (only gets the first page of reviews, not easy to access others without API)
     */
    Cleanreads.getReviews = function() {
        let reviewElements = document.querySelectorAll('#reviews .reviewText');
        Cleanreads.reviews = Array.from(reviewElements).map(x => (x.querySelector('[style]') || x).innerText.trim());
    };

    /**
     * Get title as text with series appended
     */
    Cleanreads.getTitle = function() {
        return document.getElementById('bookTitle').innerText.trim() + document.getElementById('bookSeries').innerText.trim();
    };

    /**
     * Get book description text
     */
    Cleanreads.getDescription = function() {
        let description = document.getElementById('description');
        return (description.querySelector('[style]') || description).innerText.trim();
    };

    /**
     * Calculate the cleanliness
     */
    Cleanreads.calculateContent = function() {
        let count = 0, containing = [];
        // Insert containers for bases
        Cleanreads.crDetails.innerHTML += `<h2 class="buyButtonContainer__title u-marginTopXSmall">Description Content Basis: </h2><div id="descriptionBasis"></div>`;
        Cleanreads.crDetails.innerHTML += `<h2 class="buyButtonContainer__title u-marginTopXSmall">Clean Basis: </h2><div id="cleanBasis"></div>`;
        Cleanreads.crDetails.innerHTML += `<h2 class="buyButtonContainer__title u-marginTopXSmall">Not Clean Basis: </h2><div id="notCleanBasis"></div>`;
        // Get containers
        let descriptionBasis = document.getElementById('descriptionBasis'),
            cleanBasis = document.getElementById('cleanBasis'),
            notCleanBasis = document.getElementById('notCleanBasis');
        // Search description
        let description = `Title: ${Cleanreads.getTitle()}\nDescription: ${Cleanreads.getDescription()}`;
        Cleanreads.POSITIVE_SEARCH_TERMS.forEach(term => Cleanreads.searchContent(term, description, descriptionBasis, true));
        Cleanreads.NEGATIVE_SEARCH_TERMS.forEach(term => Cleanreads.searchContent(term, description, descriptionBasis, false));
        // Search reviews
        Cleanreads.reviews.forEach(review => {
            Cleanreads.POSITIVE_SEARCH_TERMS.forEach(term => Cleanreads.searchContent(term, review, cleanBasis, true));
            Cleanreads.NEGATIVE_SEARCH_TERMS.forEach(term => Cleanreads.searchContent(term, review, notCleanBasis, false));
        });
        // Fill bases if nothing
        if (!descriptionBasis.innerHTML) {
            descriptionBasis.innerHTML = '<i class="contentComment">None</i>';
        }
        if (!cleanBasis.innerHTML) {
            cleanBasis.innerHTML = '<i class="contentComment">None</i>';
        }
        if (!notCleanBasis.innerHTML) {
            notCleanBasis.innerHTML = '<i class="contentComment">None</i>';
        }
        // Update Clean Reads verdict
        Cleanreads.updateVerdict();
    };

    /**
     * Search text for a given term, add found position to given container and increment positive/negative verdict
     * @param {string} term - The search term
     * @param {string} content - The content to search
     * @param {element} container - The dom element to append result to
     * @param {boolean} positive - Flag if positive or negative search term to determine result
     */
    Cleanreads.searchContent = function(term, content, container, positive) {
        let regex = new RegExp(`(^|[^(${term.exclude.before.join`|`}|\\s*)])(\\W*)(${term.term})(\\W*)($|[^(${term.exclude.after.join`|`}|\\s*)])`);
        let contentMatch = content.toLowerCase().match(regex);
        if (contentMatch) {
            positive ? Cleanreads.positives++ : Cleanreads.negatives++;
            let index = contentMatch.index + contentMatch[1].length + contentMatch[2].length;
            console.log(index, Cleanreads.SNIPPET_HALF_LENGTH);
            container.innerHTML += `
                <div class="contentComment">
                    ...${content.slice(index - Cleanreads.SNIPPET_HALF_LENGTH, index)}<b class="content${positive ? '' : 'Not'}Clean">${
                        content.substr(index, contentMatch[3].length)
                    }</b>${content.slice(index + contentMatch[3].length, index + Cleanreads.SNIPPET_HALF_LENGTH)}...
                </div>`;
        }
    };

    /**
     * Update the verdict shown in UI on the book
     */
    Cleanreads.updateVerdict = function() {
        let verdict = document.getElementById('crVerdict');
        if (Cleanreads.positives && Cleanreads.positives > Cleanreads.negatives) {
            verdict.innerText = `${Cleanreads.negatives ? 'Probably' : 'Most likely'} clean`;
            verdict.className += 'contentClean';
        } else if (Cleanreads.negatives && Cleanreads.negatives > Cleanreads.positives) {
            verdict.innerText = `${Cleanreads.positives ? 'Probably' : 'Most likely'} not clean`;
            verdict.className += 'contentNotClean';
        } else {
            verdict.innerText = Cleanreads.positives && Cleanreads.negatives ? 'Could be clean or not clean' : 'Unknown';
            verdict.className += 'contentUnknown';
        }
        document.getElementById('crPositives').innerText = Cleanreads.positives;
        document.getElementById('crNegatives').innerText = Cleanreads.negatives;
    };

    /**
     * Expand the details section of Cleanreads verdict
     */
    Cleanreads.expandDetails = function() {
        let collapsedText = '(Details)',
            expandedText = '(Hide)';
        if (this.innerText == collapsedText) {
            Cleanreads.crDetails.style.display = 'block';
            this.innerText = expandedText;
        } else if (this.innerText == expandedText) {
            Cleanreads.crDetails.style.display = 'none';
            this.innerText = collapsedText;
        }
    };

    /**
     * Show the settings modal for Cleanreads
     */
    Cleanreads.showSettings = function() {
        document.getElementById("crSettingsDialog").style.display = 'block';
        return false;
    };

    /**
     * Hide the settings modal for Cleanreads
     */
    Cleanreads.hideSettings = function() {
        document.getElementById("crSettingsDialog").style.display = 'none';
        return false;
    };

    // Loading. If on a book load the verdict, else if on a user page load settings
    if (window.location.href.match("/book/")) {
        Cleanreads.setupRating();
    } else if (window.location.href.match("/user/")) {
        Cleanreads.setupSettings()
    }
})(window.Cleanreads = window.Cleanreads || {});