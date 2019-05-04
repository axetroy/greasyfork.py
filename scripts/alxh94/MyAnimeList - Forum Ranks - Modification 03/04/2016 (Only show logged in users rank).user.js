// ==UserScript==
// @name        MyAnimeList - Forum Ranks - Modification 03/04/2016 (Only show logged in users rank)
// @namespace   (Original Author -->>) http://myanimelist.net/profile/Annuvin  (Modified By -->>) http://myanimelist.net/profile/alxh94
// @description Adds custom forum ranks based on post count and join date. Modified to only show currently logged in users rank and nobody else's. All credit goes to the original author (Annuvin) and none to me. I do not claim any rights to this and if the original author wishes me to take it down then I shall. Go here for the original post http://myanimelist.net/forum/?topicid=1471246
// @include     /^http:\/\/myanimelist\.net\/(profile\/.+|forum\/\?topicid=\d+)/
// @version     1.2.1.3
// @grant       none
// @license     WTFPL
// ==/UserScript==
function getRank(joinDate, postCount) {
    var posts = [0, 100, 1000, 5000, 10000];
    var months = [0, 6, 12, 24, 48];
    var ranks = [
        ['Newbie', 'Extrovert', 'Addict', 'Junkie', 'Fiend'],
        ['Rookie', 'Member', 'Zealot', 'Fanatic', 'Psycho'],
        ['Introvert', 'Thinker', 'Regular', 'Veteran', 'Expert'],
        ['Loner', 'Philosopher', 'Judge', 'Critic', 'Elitist'],
        ['Hermit', 'Sage', 'Otaku', 'Weeaboo', 'Magical Girl']
    ];

    var rank = ranks[0][0];
    var monthCount = Math.floor(($.now() - new Date(joinDate)) / 1000 / 60 / 60 / 24 / 30);

    for (var i = 0; i < months.length; i++)
        for (var j = 0; j < posts.length; j++)
            if (monthCount >= months[i])
                if (postCount >= posts[j])
                    rank = ranks[i][j];

    return rank;
}

$('.forum_boardrow2').each(function() {
    var hasRank = $(this).contents().filter(function() {
        return this.nodeType === 3 && this.nodeValue.trim() !== '' && $(this).prevAll('br').length === 0;
    }).text();

    if (!hasRank) {
        var data = $(this).contents().filter(function() {
            return this.nodeType === 3;
        }).text();
        
        //retrieve forum username from this row only
        var forumName = $(this).contents().filter(function() {
            return this.nodeType === 1;
        }).text();
        
        //retrieve currently logged in users username
        var yourName = document.getElementsByClassName("header-profile-link")[0].textContent;

        //Check if names match (forum name has an additional 'Online' string stuck on it so substring it off) and then apply the rank
        if((yourName) ===  forumName.substring(0, forumName.length - 6)) {
            $(this).children().first().after('<div>' + getRank('1 ' + data.match(/Joined: (.+)/)[1], data.match(/Posts: (.+)/)[1]) + '</div>');
       }
    }
});

var usersProfileName = document.getElementsByClassName("di-ib po-r")[0].textContent
var yourTipTopName = document.getElementsByClassName("header-profile-link")[0].textContent;

if(yourTipTopName === usersProfileName.trim().substring(0, usersProfileName.length - 13)) {
    if ($('.di-ib.po-r').length && $('.di-ib.po-r').children().length === 0) {
        var joinDate = '1 ' + $('.user-status.border-top.pb8.mb4').find('.user-status-data.di-ib.fl-r').last().text().replace(/\d+,/, '');
        var postCount = $('.user-status-data.di-ib.fl-r.fw-b').first().text().replace(',', '');

        $('.di-ib.po-r').append('<span class="profile-team-title"><a href="" class="icon-team-title" style="background: #4165BA">' + getRank(joinDate, postCount) + '</a></span>');
        $('.profile-team-title').css('right', -$('.profile-team-title').width() - 12);
    }
}