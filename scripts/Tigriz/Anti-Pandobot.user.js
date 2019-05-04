// ==UserScript==
// @name         Anti-Pandobot
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Fin du game
// @author       Lisa
// @match        https://2sucres.org/*
// @grant        none
// ==/UserScript==

const $ = window.$
const angular = window.angular
let $scope = null

async function sleep (delay) {
    return new Promise((resolve, reject) => setTimeout(resolve, delay))
}

async function loadScope () {
    const forumEl = document.getElementById('forum-container')
    return new Promise(async (resolve, reject) => {
        while (angular.element(forumEl).scope() === undefined) {
            await sleep(100)
        }
        $scope = angular.element(forumEl).scope()
        resolve($scope)
    })
}

async function bootstrap () {
    // run when $scope is ready
    await loadScope()
    window.innerScope = $scope
    $("#form-send-new-message .message-wrapper").append('<a id="antipando" class="no-mb md-raised md-accent pull-right mr-1 md-button ng-binding ng-scope md-ink-ripple">Anti-Pandobot</a>' );
    $("#antipando").on('click', function() {
        app.ajaxCall({
        do: "topic-create",
        forum: $scope.forum.id,
        name: $scope.newMessage.topicName,
		type: $scope.newMessage.topicType,
        content: $scope.newMessage.text,
		poll: $scope.stringifyPoll(),
        min_rank: 0
    }, function (err, res) {
        if (err) {
            app.notify(err, "error", 8, "bottom");
        } else {
            $scope.resetNewMessage();
            $scope.goToTopic($scope.forum.id, res.id, 1, res.slug);
            let xhr = new XMLHttpRequest();
            xhr.responseType = "json";
            xhr.open("POST", '/web-api/51', true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(`do=message-create&topic=${res.id}&content=Ah+non+certainement+pas&AJAX-CSRF=9f750803e878b07a76f3f2e8e156fd6395ef496e011ceed247fb8ac3a6576b27`);
        }
    });
    })
}

bootstrap().catch(console.error)
$(".message-wrapper .flex-100").append( `<a class="no-mb md-raised md-accent pull-right mr-1 md-button ng-binding ng-scope md-ink-ripple">Poster un nouveau sujet<div class="md-ripple-container" style=""></div></a>` );