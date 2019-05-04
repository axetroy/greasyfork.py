// ==UserScript==
// @name         Credit Mutuel: ByPass Carte de clés
// @namespace    http://your.homepage/
// @version      1
// @description  Evite de chercher les clés Credit Mutuel
// @author       Kirniax
// @include      @include https://www.creditmutuel.fr/* 
// ==/UserScript==  

    if (document.getElementsByClassName("bloctxt ei_false_bloctxt")[0] &&
        document.getElementsByClassName("bloctxt ei_false_bloctxt")[0].innerText.indexOf("CLÉ PERSONNELLE") != -1) {

        var populate  = function () {
            const key_card = {
                "a": {
                    1: "YOUR_CODE", 2:"YOUR_CODE", 3:"YOUR_CODE", 4:"YOUR_CODE", 5:"YOUR_CODE", 6:"YOUR_CODE", 7:"YOUR_CODE", :"YOUR_CODE"
                },
                "b": {
                    1: "YOUR_CODE", 2:"YOUR_CODE", 3:"YOUR_CODE", 4:"YOUR_CODE",5: "YOUR_CODE", 6:"YOUR_CODE", 7:"YOUR_CODE", 8:"YOUR_CODE"
                },
                "c": {
                    1: "YOUR_CODE", 2:"YOUR_CODE", 3:"YOUR_CODE", 4:"YOUR_CODE", 5:"YOUR_CODE", 6:"YOUR_CODE", 7:"YOUR_CODE", 8:"YOUR_CODE"
                },
                "d": {
                    1: "YOUR_CODE", 2:"YOUR_CODE", 3:"YOUR_CODE", 4:"YOUR_CODE",5: "YOUR_CODE", 6:"YOUR_CODE", 7:"YOUR_CODE", 8:"YOUR_CODE"
                },
                "e": {
                    1: "YOUR_CODE", 2:"YOUR_CODE", 3:"YOUR_CODE", 4:"YOUR_CODE",5: "YOUR_CODE", 6:"YOUR_CODE", 7:"YOUR_CODE", 8:"YOUR_CODE"
                },
                "f": {
                    1: "YOUR_CODE", 2:"YOUR_CODE", 3:"YOUR_CODE", 4:"YOUR_CODE",5: "YOUR_CODE", 6:"YOUR_CODE", 7:"YOUR_CODE", 8:"YOUR_CODE"
                },
                "g": {
                    1: "YOUR_CODE", 2:"YOUR_CODE", 3:"YOUR_CODE", 4:"YOUR_CODE",5: "YOUR_CODE", 6:"YOUR_CODE", 7:"YOUR_CODE", 8:"YOUR_CODE"
                },
                "h": {
                    1: "YOUR_CODE", 2:"YOUR_CODE", 3:"YOUR_CODE", 4:"YOUR_CODE",5: "YOUR_CODE", 6:"YOUR_CODE", 7:"YOUR_CODE", 8:"YOUR_CODE"
                }
            }

            let caze = document.getElementById('greaseMonkeyInput').value
            if (caze) {
                let lettre = caze[0].toLowerCase()
                let nb = caze[1]
                if (key_card[lettre][nb]) document.getElementById('sessionCode').value = key_card[lettre][nb]
            }
        }

        var div = document.createElement("div")
        div.innerHTML = '<p>Saisir le code demandé : </p>'
        document.getElementsByClassName("bloctxt ei_false_bloctxt")[0].appendChild(div)

        var input = document.createElement("input")
        input.id = "greaseMonkeyInput"
        input.type = "text"
        input.onkeyup = populate
        input.onchange = populate
        div.appendChild(input)
    }