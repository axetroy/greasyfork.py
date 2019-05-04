// ==UserScript==
// @name         MAL manga default search
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Make MyAnimelist search work faster for adding manga.
// @copyright    2018, Santeri Hetekivi (https://github.com/SanteriHetekivi)
// @license      Apache-2.0
// @author       Santeri Hetekivi
// @match        https://myanimelist.net/*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    class Element
    {
        constructor(_id, _defaultValue = null) {
            this.id = _id;
            this.defaultValue = _defaultValue;
            this.setDefault();
        }
        getElement()
        {
            var elem = document.getElementById(this.id);
            return Element.IsElement(elem) ? elem : null;

        }
        static IsElement(_obj)
        {
            return (
                typeof HTMLElement === "object" ? _obj instanceof HTMLElement : _obj
                && typeof _obj === "object"
                && _obj !== null
                && _obj.nodeType === 1
                && typeof _obj.nodeName==="string"
            );
        }
        setDefault()
        {
            var elem = this.getElement();
            if(elem === null)
                return false;
            elem.value = this.defaultValue;
            return true;
        }
        focus()
        {
            var elem = this.getElement();
            if(elem === null)
                return false;
            elem.focus();
            return true;
        }
    }

    new Element("topSearchValue", "manga").setDefault();
    new Element("topSearchText").focus();
})();