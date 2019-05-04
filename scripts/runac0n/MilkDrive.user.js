// ==UserScript==
// @name         MilkDrive
// @description  Improving CHUNITHM-NET
// @author       runac0n
// @match        https://chunithm-net.com/*
// @grant        none
// @version 0.0.1.20170322051255
// @namespace https://greasyfork.org/users/111679
// ==/UserScript==

// 汎用
function getCookie() {
  var cookies = [];

  if(document.cookie != "") {
    var pairs = document.cookie.split(";");
    for(var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split("=");
      cookies[pair[0].trim()] = decodeURIComponent(pair[1]);
    }
  }

  return cookies;
}

function loadLocalFriends() {
  return localStorage.getItem("friends") ? JSON.parse(localStorage.getItem("friends")) : [];
}

function addLocalFriend(friendCode) {
  localStorage.setItem("friends", JSON.stringify(loadLocalFriends().concat([parseInt(friendCode, 10)])));
}

function getAllFriendCodes(callback) {
  getFriendList(function(list){
    var friendCodes = list.map(function(friend) { return friend.friendCode });
    friendCodes = friendCodes.concat(loadLocalFriends());

    callback(friendCodes);
  });
}

// APIラッパー(sendJsonで置き換えたほうがラク?)
function getUserInfo(friendCode, callback) {
  $.post("/ChuniNet/GetUserInfoApi", JSON.stringify({
    userId: cookie["userId"],
    friendCode: friendCode,
    fileLevel: 3
  }), function(d){
    callback(d.userInfo);
  });
}

// フレンドリスト
function getUserFriendInfo(friendCode, callback) {
  $.post("/ChuniNet/GetUserFriendInfoApi", JSON.stringify({
    userId: cookie["userId"],
    friendCode: friendCode,
    isSearch: false
  }), function(d){
    callback(d);
  });
}

function displayFriend(friendCode) {
  userFriendlistList.push({
    friendCode: friendCode,
    isFavorite: false,
    orderId: -10
  });

  getUserFriendInfo(friendCode, function(data){
    getUserFriendInfoResult(data);

    var friendElm = $("#userFriendlist_result .player_name a[onclick*="+ friendCode +"]").parent().parent().parent();
    friendElm.find(".player_rating").append("<span style='font-size: 0.8rem'>MD</span>");
    friendElm.find(".friend_favorite").remove();
  });
}

// フレンド追加
function addFriend(friendCode, needConfirm) {
  getUserFriendInfo(friendCode, function(data){
    if (loadLocalFriends().indexOf(friendCode) !== -1) {
      alert(data.userName + "さんはすでに追加されています");
      return;
    }

    if (!needConfirm || confirm(data.userName + "さんをフレンド(MD)に追加しますか？")) {
      addLocalFriend(friendCode);

      alert(data.userName + "さんを追加しました");
    }
  });
}

function setupFriendSearch() {
  var inputElm = $("<input>")
    .attr("id", "MD_friendcode")
    .attr("type", "text")
  var buttonElm = $("<button>").html("MDフレンド登録")
    .bind("click", function(){
      addFriend(parseInt(inputElm.val(), 10), true);
    });

  var divElm = $("<div>");
  divElm.append(inputElm);
  divElm.append(buttonElm);
  $(".narrow_block").append(divElm);
}

// フレンドVS
function getFriendList(callback) {
  $.post("/ChuniNet/GetUserFriendlistApi", JSON.stringify({
    userId: cookie["userId"],
    state: 3
  }), function(d){
    callback(d.userFriendlistList);
  });
}

function getFriendName(friendCode, callback) {
  $.post("/ChuniNet/GetUserFriendNameApi", JSON.stringify({
    userId: cookie["userId"],
    friendCode: friendCode,
  }), function(d){
    callback(d.friendName);
  });
}

function displayFriendsName(friendCodes, from, callback) { // レスポンスが来てから次のNameを取得する(順番保証)
  if (friendCodes.length <= from) { return; }

  getFriendName(friendCodes[from], function(name){
    let optElm = $("<option>")
      .attr("value", friendCodes[from])
      .html(name);
    $("#friend_select").append(optElm);

    displayFriendsName(friendCodes, from + 1);
  });
}

function setupFriendVs() {
  getAllFriendCodes(function(friendCodes){
    $("#friend_select").empty();

    // 順番が保証されない
    // for(let friendCode of friendCodes) {
    //   getFriendName(friendCode, function(name) {
    //     let optElm = $("<option>")
    //       .attr("value", friendCode)
    //       .html(name);
    //     $("#friend_select").append(optElm);
    //   });
    // }

    // callbackで次のリクエストを飛ばして順番を保証
    displayFriendsName(friendCodes, 0);
  })
}

// フレンドランキング(曲別)
function getMyUserInfo(callback) {
  getUserInfo(0, callback);
}

function getUserHighScore(friendCode, callback) {
  let rankingId = cookie["gameRankingId"];

  $.post("/ChuniNet/GetUserHighScoreApi", JSON.stringify({
    userId: cookie["userId"],
    friendCode: friendCode,
    type: 0,
    id: rankingId % 0x100000000,
    param: parseInt(rankingId / 0x100000000) - 0x10000,
  }), function(d){
    callback(d.gameRanking);
  });
}

function buildRateRankingElement(rank, data, elm) {
  let arrangedPoint = (data.point.toString() + "00").slice(0, 5);
  elm.find("span").html(arrangedPoint);
  return elm;
}

function buildCustomizedElement(rank, data, filterFunc) {
  let elm = buildElement(rank, data);
  return filterFunc(rank, data, elm);
}

function buildElement(rank, data) {
  let scoreElm = $("<span>")
    .css("position", "absolute")
    .css("right", "0")
    .html(data.point.toLocaleString());

  let elm = $("<div>")
    .addClass("md_rank_block")
    .html(""+ rank +". <strong>"+ data.userName +"</strong>")
    .append(scoreElm)
    .css("position", "relative")
    .css("text-align", "left")
    .css("padding", "5px");

  if (data.updateDate.length == 0) {
    elm.css("color", "#aaa");
  }

  if (data.myself) {
    elm.css("color", "#FF5E5C");
  }

  return elm;
}

function buildCustomizedRanking(scores, filterFunc) {
  $(".md_ranking_box").remove();

  let sortedScores = scores.sort(function(a, b){
    return b.point - a.point;
  });

  let boxElm = $("<div>")
    .addClass("md_ranking_box")
    .css("padding", "10px")
    .appendTo(".box01");
  for(var i = 0; i < sortedScores.length; i++) {
    boxElm.append(buildCustomizedElement(i + 1, sortedScores[i], filterFunc));
  };
}

function buildRanking(friendScores) {
  $(".md_ranking_box").remove();

  let sortedScores = friendScores.sort(function(a, b){
    return b.point - a.point;
  });

  let boxElm = $("<div>")
    .addClass("md_ranking_box")
    .css("padding", "10px")
    .appendTo(".box01");
  for(var i = 0; i < sortedScores.length; i++) {
    boxElm.append(buildElement(i + 1, sortedScores[i]));
  };
}

function setupFriendMusicRanking() {
  getAllFriendCodes(function(friendCodes) {
    var friendScores = [];

    friendCodes.push(0);
    for (let code of friendCodes) {
      // setTimeout(function(){
        getUserHighScore(code, function(data){
          friendScores.push(data);
          $(".rank_block").remove();

          if (friendScores.length == friendCodes.length) { // 読み込みが終わったら
            getMyUserInfo(function(info) {
              for (let score of friendScores) {
                if (info.userName == score.userName) {
                  score.myself = true;
                }
              }
              buildRanking(friendScores);
            });
          }
        });
      // }, 50);
    }
  });
}

// フレンドランキング(レーティング, MAXレーティング)
function getUserHighScoreSimple(friendCode, type, callback) {
  $.post("/ChuniNet/GetUserHighScoreApi", JSON.stringify({
    userId: cookie["userId"],
    friendCode: friendCode,
    type: type,
    id: 0,
    param: 0,
  }), function(d){
    callback(d.gameRanking);
  });
}

function displayFriendMaxRateRanking() {
  getAllFriendCodes(function(friendCodes) {
    var friendRatings = [];

    for (let code of friendCodes) {
      getUserInfo(code, function(data) {
        friendRatings.push({
          point: data.highestRating / 100.0,
          updateDate: "dummy",
          userName: data.userName
        });

        if (friendRatings.length == friendCodes.length) { // 読み込みが終わったら
          $(".rank_block").remove();
          $(".md_rank_block").remove();
          $(".musicdata_detail_friend_on")
            .on("click", function(){ location.href = './RateRankingFriend.html'; })
            .removeClass("musicdata_detail_friend_on")
            .addClass("musicdata_detail_friend");
          $(".musicdata_detail_zenkoku_on")
            .on("click", function(){ location.href = './RateRanking.html'; })
            .removeClass("musicdata_detail_zenkoku_on")
            .addClass("musicdata_detail_zenkoku");

          getMyUserInfo(function(info) {
            friendRatings.push({
              point: info.highestRating / 100.0,
              userName: info.userName,
              updateDate: "dummy",
              myself: true
            });
            buildCustomizedRanking(friendRatings, buildRateRankingElement);
          });
        }
      });
    }
  });
}

function setupFriendMaxRateRanking() {
  var elm = $("<button>")
    .html("MAXレーティングランキング")
    .on("click", displayFriendMaxRateRanking);
  $(".box05.w400.mt_7").append(elm);
}

function setupFriendRateRanking() {
  setupFriendMaxRateRanking();

  getAllFriendCodes(function(friendCodes) {
    var friendRatings = [];

    for (let code of friendCodes) {
      // setTimeout(function(){
        getUserHighScoreSimple(code, 3, function(data){
          friendRatings.push({
            point: data.point / 100.0,
            updateDate: data.updateDate,
            userName: data.userName
          });
          $(".rank_block").remove();
          $(".md_rank_block").remove();

          if (friendRatings.length == friendCodes.length) { // 読み込みが終わったら
            getMyUserInfo(function(info) {
              friendRatings.push({
                point: info.playerRating / 100.0,
                updateDate: "dummy",
                userName: info.userName,
                myself: true
              });
              buildCustomizedRanking(friendRatings, buildRateRankingElement);
            });
          }
        });
      // }, 50);
    }
  });
}

// フレンドランキング(THS)
function displayFriendScoreRanking(difficulty) {
  getAllFriendCodes(function(friendCodes) {
    var friendScores = [];

    friendCodes.push(0);
    for (let code of friendCodes) {
      // setTimeout(function(){
        getUserHighScoreSimple(code, difficulty, function(data){
          friendScores.push(data);

          if (friendScores.length == friendCodes.length) { // 読み込みが終わったら
            $(".rank_block").remove();
            $(".md_rank_block").remove();
            getMyUserInfo(function(info) {
              for (let score of friendScores) {
                if (info.userName == score.userName) {
                  score.myself = true;
                }
              }
              buildRanking(friendScores);
            });
          }
        });
      // }, 50);
    }
  });
}

function prepareFriendScoreRanking(difficulty) {
  var timer = setInterval(function() {
    if (userFavoriteList.length <= userFavoritePos) { // 別のRankingの読み込みがおわるまで待つ
      clearInterval(timer);
      displayFriendScoreRanking(difficulty);
    }
  }, 100);
}

function setupFriendScoreRanking() {
  $("#allButton")    .on("click", function(){ prepareFriendScoreRanking(5); });
  $("#basicButton")  .on("click", function(){ prepareFriendScoreRanking(6); });
  $("#advanceButton").on("click", function(){ prepareFriendScoreRanking(7); });
  $("#expertButton") .on("click", function(){ prepareFriendScoreRanking(8); });
  $("#masterButton") .on("click", function(){ prepareFriendScoreRanking(9); });
  prepareFriendScoreRanking(5);
}

// 2080175666701
// 3061091017186

// ロード後
var cookie = getCookie();

$("body").css("backgroundColor", "#2C8CD1");
switch (location.pathname) {
  case "/mobile/Friendlist.html":
    var timer = setInterval(function(){
      if (userFriendlistList.length == userFriendlistPos) { // 一般のフレンドの読み込みが終わるま100msごとにチェックしながら待つ
        clearInterval(timer);

        for (let friendCode of loadLocalFriends()) {
          displayFriend(parseInt(friendCode, 10));
        }

        $("#userFriendCount_result").append("(+"+ loadLocalFriends().length +")");
      }
    }, 100);
    break;
  case "/mobile/FriendSearch.html":
    setupFriendSearch();
    break;
  case "/mobile/FriendGenreVs.html":
  case "/mobile/FriendLevelVs.html":
    var timer = setInterval(function(){
      var favorites = userFriendlistList.filter(function(f){ return f["isFavorite"] });
      if (favorites.length <= userFriendlistPos) { // お気に入りの読み込みが終わってから
        clearInterval(timer);
        setupFriendVs();
      }
    }, 100);
    break;
  case "/mobile/MusicRankingDetailFriend.html":
    var timer = setInterval(function() {
      if (userFavoriteList.length <= userFavoritePos) { // 読み込みがおわるまで待つ
        clearInterval(timer);
        setupFriendMusicRanking();
      }
    }, 100);
    break;
  case "/mobile/RateRanking.html":
    setTimeout(setupFriendMaxRateRanking, 500); // クソ実装ゆるして
    break;
  case "/mobile/RateRankingFriend.html":
    var timer = setInterval(function() {
      if (userFavoriteList.length <= userFavoritePos) { // 読み込みがおわるまで待つ
        clearInterval(timer);
        setupFriendRateRanking();
      }
    }, 100);
    break;
  case "/mobile/ScoreRankingFriend.html":
    setupFriendScoreRanking();
    break;
  case "/mobile/PointRanking.html":
    break;
}
