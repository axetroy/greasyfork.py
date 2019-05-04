// ==UserScript==
// @name         Better Movie-blog
// @namespace    hoehleg.userscripts.com
// @version      0.1.8
// @description  Browse trough the articles with left and right cursor keys
// @author       Gerrit Höhle
// @match        http://www.movie-blog.org/
// @match        http://www.movie-blog.org/page/*
// @match        http://movie-blog.to/
// @match        http://movie-blog.to/page/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';
    const CONST = Object.freeze({
        HTML_CLASSES: {
            BEITRAG: "beitrag4",
        },
        HTML_IDS: {
            CONTENT: "content",
            SHOW_CONTAINER: "showcontainer",
            BEITRAG_INFO: "beitraginfo",
            PAGE_NUMBER: "pagenumber",
            BEITRAG_NUMBER: "beitragnumber",
            BEITRAG_COUNT: "beitragcount",
            IMDB_RATING: "imdbrating",
            PAGE_PREV: "pageprev",
            PAGE_NEXT: "pagenext",
            BEITRAG_PREV: "beitragprev",
            BEITRAG_NEXT: "beitragnext"
       }
    });

    class Util {
        static getPageAsync(url, onSuccess, onError) {
            if (typeof onSuccess !== 'function') { onSuccess = () => {}; }
            if (typeof onError !== 'function') { onError = () => {}; }

            return GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                onload: function(resp) {
                    switch (resp.status) {
                        case 200:
                        case 304:
                            resp.html = new DOMParser().parseFromString(resp.responseText, 'text/html');
                            onSuccess(resp);
                            return;
                        default:
                            onError(resp);
                            return;
                    }
                },
                onerror: onError
            });
        }

        static createInputElement(id, type, width, maxLength, textAlign = "left") {
            const inputElement = document.createElement("INPUT");
            inputElement.id = id;
            inputElement.type = type;
            inputElement.maxLength = 3;
            inputElement.style = `text-align:${textAlign};width:${width}`
            return inputElement;
        }

        static createShowContainer() {
            const oldContainer = document.getElementById(CONST.HTML_IDS.SHOW_CONTAINER);
            if (!oldContainer) {
                const divContent = document.getElementById(CONST.HTML_IDS.CONTENT);

                const newContainer = divContent.insertBefore(document.createElement("DIV"), divContent.firstChild);
                newContainer.id = CONST.HTML_IDS.SHOW_CONTAINER;

                const divBeitragInfo = newContainer.appendChild(document.createElement("DIV"));
                divBeitragInfo.id = CONST.HTML_IDS.BEITRAG_INFO;

                divBeitragInfo.appendChild(document.createTextNode("Seite "));
                divBeitragInfo.appendChild(Util.createInputElement(CONST.HTML_IDS.PAGE_NUMBER, "number", "4em", 3, "center"));

                divBeitragInfo.appendChild(document.createTextNode(", Beitrag "));
                divBeitragInfo.appendChild(Util.createInputElement(CONST.HTML_IDS.BEITRAG_NUMBER, "number", "3em", 2, "center"));

                divBeitragInfo.appendChild(document.createTextNode(" / "));
                divBeitragInfo.appendChild(Util.createInputElement(CONST.HTML_IDS.BEITRAG_COUNT, "text", "3em", 2, "center")).disabled = true;

                divBeitragInfo.appendChild(document.createTextNode(",  IMDb: "));
                divBeitragInfo.appendChild(Util.createInputElement(CONST.HTML_IDS.IMDB_RATING, "text", "3em", "center")).disabled = true;
                return true;
            } else {
                for (let divBeitragOld of oldContainer.querySelectorAll(`DIV.${CONST.HTML_CLASSES.BEITRAG}`)) {
                    oldContainer.removeChild(divBeitragOld);
                }
                return false;
            }
        }

        static getImdbRating(beitragElement) {
            for (var link of beitragElement.getElementsByTagName("A")) {
                const innerLinkUCase = String(link.innerHTML).toUpperCase()
                if (link.href.toUpperCase().includes("IMDB.COM") || innerLinkUCase.includes("IMDB:")) {
                    let match = (/(\d\d?[,\.]?\d?)/g).exec(innerLinkUCase);
                    if (match && match.length >= 2) {
                        return parseFloat(match[1].replace(",","."));
                    }
                }
            }
            return 0;
        }
    };

    class View {
        constructor(numOfPage = 0, numOfBeitrag = 0) {
            this.numOfPage = numOfPage;
            this.numOfBeitrag = numOfBeitrag;

            this.onChangePageNum = () => {};
            this.onChangeBeitragNum = () => {};
            this.divsBeitraege = [];

            this.gotoPage();
        }

        get beitragCount() {
            return this.divsBeitraege.length;
        }

        gotoPage(numOfPage = this.numOfPage, numOfBeitrag = -1) {
            this.isPageLoading = true;
            const inputsDisabled = [
                document.getElementById(CONST.HTML_IDS.PAGE_NUMBER) || {},
                document.getElementById(CONST.HTML_IDS.BEITRAG_NUMBER) || {}
            ];
            inputsDisabled.forEach(element => { element.disabled = true; });

            const onSuccess = resp => {
                this.html = resp.html;
                if (0 <= numOfBeitrag && numOfBeitrag < this.beitragCount) {
                    this.numOfBeitrag = numOfBeitrag;
                } else {
                    this.numOfBeitrag = (numOfPage < this.numOfPage) ? this.beitragCount - 1 : 0;
                }
                this.numOfPage = numOfPage;

                inputsDisabled.forEach(element => { element.disabled = false; });

                // sort Beitraege by IMDb rating
                this.divsBeitraege = Array.from(this.html.querySelectorAll(`DIV.${CONST.HTML_CLASSES.BEITRAG}`)).sort((a, b) => {
                    return Util.getImdbRating(b) - Util.getImdbRating(a);
                });

                this.isPageLoading = false;
                this.showBeitrag();
            }, onError = resp => {
                inputsDisabled.forEach(element => { element.disabled = false; });
                this.isPageLoading = false;
            };

            Util.getPageAsync(`http://movie-blog.to/page/${numOfPage + 1}/`, onSuccess, onError);
        }

        gotoBeitrag(numOfBeitrag = this.numOfBeitrag) {
            this.numOfBeitrag = numOfBeitrag;
            this.showBeitrag();
        }

        showBeitrag() {
            // get a clean show container
            const isNewShowContainer = Util.createShowContainer();

            // clone Beitrag into show container
            const divBeitrag = this.divsBeitraege[this.numOfBeitrag];
            if (divBeitrag) {
                const beitragContent = document.getElementById(CONST.HTML_IDS.SHOW_CONTAINER);
                const beitragInfo = document.getElementById(CONST.HTML_IDS.BEITRAG_INFO);

                const inputPageNum = document.getElementById(CONST.HTML_IDS.PAGE_NUMBER);
                inputPageNum.value = this.numOfPage + 1;
                inputPageNum.min = 1;
                inputPageNum.max = 9999;

                const inputBeitragNum = document.getElementById(CONST.HTML_IDS.BEITRAG_NUMBER);
                inputBeitragNum.value = this.numOfBeitrag + 1
                inputBeitragNum.min = 1;
                inputBeitragNum.max = this.beitragCount;

                if (isNewShowContainer) {
                    inputPageNum.addEventListener("change", () => {
                        if (!this.isPageLoading) {
                            let pageNum = parseInt(inputPageNum.value) - 1;
                            pageNum = Math.max(0, pageNum);
                            this.gotoPage(pageNum, 0);
                        }
                    });

                    inputBeitragNum.addEventListener("change", () => {
                        if (!this.isPageLoading) {
                            let beitragNum = parseInt(inputBeitragNum.value) - 1;
                            beitragNum = Math.max(beitragNum, 0);
                            beitragNum = Math.min(beitragNum, this.beitragCount - 1);
                            this.gotoBeitrag(beitragNum);
                        }
                    });
                }

                document.getElementById(CONST.HTML_IDS.BEITRAG_COUNT).value = this.beitragCount;
                document.getElementById(CONST.HTML_IDS.IMDB_RATING).value = Util.getImdbRating(divBeitrag);

                return beitragContent.appendChild(divBeitrag.cloneNode(true)) ? true : false;
            }
            return false;
        }
    }

    let view = new View();

    const browseBeitrag = function(distance) {
        if (view.isPageLoading) {
            return;
        }
        const numOfNextBeitrag = view.numOfBeitrag + distance;

        if (numOfNextBeitrag < 0) {
            if (view.numOfPage > 0) {
                view.gotoPage(view.numOfPage - 1);
            }
        } else if (numOfNextBeitrag >= view.beitragCount) {
            view.gotoPage(view.numOfPage + 1);
        } else {
            view.gotoBeitrag(numOfNextBeitrag);
        }
    };

    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 37: // key left
                browseBeitrag(-1);
                return false;
            case 39: // key right
                browseBeitrag(1);
                return false;
            case 33: // page up
                view.gotoPage(Math.max(0, view.numOfPage - 1), 0);
                return false;
            case 34: // page down
                view.gotoPage(view.numOfPage + 1, 0);
                return false;
        }
    };
})();