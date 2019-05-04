// ==UserScript==
// @name         Bitbucket Pull Request filter
// @namespace    https://greasyfork.org/es/scripts/27753-bitbucket-pull-request-filter
// @version      0.5
// @description  Highlight bitbucket pull request
// @author       Santiago
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @match        https://descinet.bbva.es/stash/projects/*/pull-requests
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
    /* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */
    window.addEventListener('load', function() {

        // TODO: Migrar todo a ES6

        const CHANNEL_REVIEWERS_NEEDED = 2;
        const HTML_USER_IDS = [
            'xe21500', /* Alberto Matías Vega*/
            'e043895', /* Beatriz de Miguel Pérez */
            'e043699', /* Adrian González Rus */
            'e043697', /* Juan Antonio Gomez Benito */
            'xe61724', /* Santiago Bandiera */
            'e046959', /* Jose Luis Represa */
            'e030441'  /* FÉLIX SÁNCHEZ FERNÁNDEZ */
        ];
        const UPDATE_INTERVAL = 2500;

        let rowAmountCache;
        let myUser;

        window.setInterval(checkUpdate, UPDATE_INTERVAL);

        function checkUpdate(){
            //$PRRows: Cada una de las filas con el PR y los reviewers
            var $PRRows = document.querySelectorAll('tr.pull-request-row');

            if (rowAmountCache !== $PRRows.length ){
                rowAmountCache = $PRRows.length;
                update($PRRows);
            }
        }

        function update($PRRows){
            myUser = myUser || document.querySelector('#current-user').getAttribute('data-username');
            $PRRows.forEach(function($row){
                var $reviewersCell = $row.getElementsByClassName('reviewers')[0];
                var reviewers = _.reduce($reviewersCell.children, function(acc, element){
                    //Compruebo si el elemento es de los reviewer visibles
                    if (element.classList.contains('user-avatar')){
                        acc.push(getReviewerInfo(element));
                    }
                    //Compruebo si el elemento es de los reviewer que parecen al hacer click en el botón con el número
                    if (element.classList.contains('avatar-dropdown')){
                        var hiddenReviewers = _.map(element.getElementsByClassName('user-avatar'), function(menuElement){
                            return getReviewerInfo(menuElement);
                        });
                        acc.push(...hiddenReviewers);
                    }
                    return acc;
                }, []);

                var reviewersInfo = _.reduce(reviewers, function(acc, reviewer) {
                    //Check if I'm a reviewer
                    acc.amIaReviewer = acc.amIaReviewer || (reviewer.username === myUser);

                    //Check that I already aproved the PR
                    acc.IAlreadyApproved = acc.IAlreadyApproved || ((reviewer.username === myUser) && reviewer.hasApproved);

                    //Check that I mark it as need rework
                    acc.needRework = acc.needRework || ((reviewer.username === myUser) && reviewer.hasNeedsWork);

                    //Check that is approved by two or more people from channel
                    if (reviewer.isFromChannel && reviewer.hasApproved) acc.channelsApproves++;
                    return acc;
                }, { channelsApproves: 0 });

                // Cambio el background de la fila de acuerdo a 4 criterios
                if(reviewersInfo.amIaReviewer
                    && !reviewersInfo.IAlreadyApproved
                    && reviewersInfo.channelsApproves < CHANNEL_REVIEWERS_NEEDED
                    || reviewersInfo.needRework ){
                        $row.style.backgroundColor = 'bisque';
                }
            });
        }

        //  Extraigo:
        //  * username
        //  * hasApproved
        //  * hasNeedsWork
        //  * isFromChannel
        function getReviewerInfo(spanElement){
            var username = spanElement.getAttribute('data-username');
            return {
                username,
                hasApproved: !!findChildByClass(spanElement, 'approved'),
                hasNeedsWork: !!findChildByClass(spanElement, 'needs-work'),
                isFromChannel: HTML_USER_IDS.includes(username),
            };
        }

        function findChildByClass(node, className) {
            for (var i = 0; i < node.childNodes.length; i++) {
                if (node.childNodes[i].classList.contains(className)) {
                    return node.childNodes[i];
                }
            }
        }
    }, false);


    /* jshint ignore:start */
]]></>).toString();
                  var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */
