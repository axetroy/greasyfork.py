// ==UserScript==
// @name         Unfix Fixed Elements
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Reverses ill-conceived element fixing on sites like Medium.com
// @author       alienfucker
// @match        *://*/*
// @grant        none
// @run-at       document_start
// ==/UserScript==

(function () {
    'use strict';
    const className = "anti-fixing"; // Odds of colliding with another class must be low

    class FixedWatcher {
        constructor() {
            this.watcher = new MutationObserver(this.onMutation.bind(this));
            this.elementTypes = ["div", "header", "footer", "nav"]
            this.changes = [];
        }

        start() {
            this.watcher.observe(document, {
                childList: true,
                attributes: true,
                subtree: true,
                attributeFilter: ["class", "style"],
                attributeOldValue: true
            });
        }

        onMutation(mutations) {
            for (let mutation of mutations) {
                if (mutation.type === "childList") {
                    for (let node of mutation.addedNodes) {
                        if (node.nodeType !== Node.ELEMENT_NODE) continue;

                        if (this.elementTypes.indexOf(node.localName) !== -1) {
                            this.unFix(node);
                        }
                    }
                } else if (mutation.type === "attributes") {
                    if (this.friendlyMutation(mutation)) continue;

                    if (this.elementTypes.indexOf(mutation.target.localName) !== -1) {
                        this.unFix(mutation.target);
                    }
                }
            }

        }

        friendlyMutation(mutation){ // Mutation came from us
            if(mutation.attributeName === "class"){
                let i = this.changes.indexOf(mutation.oldValue);

                if(i !== -1){
                    this.changes.splice(i, 1);
                    return true;
                }
            }
            return false;
        }

        unFix(el) {
            let style = getComputedStyle(el);

            if (style.display === "block" && style.position === "fixed") {
                if (el.classList.contains(className)) {
                    el.classList.remove(className)
                }
                this.changes.push(el.className);
                el.classList.add(className);
            }
        }

        stop() {
            this.watcher.disconnect();
        }

        restore() {
            let els = document.querySelectorAll("." + className);
            for (let el of els) {
                el.classList.remove(className);
            }
        }

    }

    document.documentElement.appendChild((() => {
        let el = document.createElement("style");
        el.setAttribute("type", "text/css");
        el.appendChild(document.createTextNode(`.${className}{ position: static !important }`));
        return el;
    })())

    const fixer = new FixedWatcher();
    fixer.start();

    // Make globally accessible, for debugging purposes
    window.fixer = fixer;
})()