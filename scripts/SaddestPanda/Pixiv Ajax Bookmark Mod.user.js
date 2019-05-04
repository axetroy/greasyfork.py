// ==UserScript==
// @name             Pixiv Ajax Bookmark Mod
// @namespace        com.SaddestPanda.net.moe
// @version          2.2.1
// @description      DISCONTINUED. Use "XZ Pixiv Batch Downloader" You can bookmark without going to the related pages. ページ遷移なく非同期的にブックマークします。
// @include          http://www.pixiv.net/member_illust.php*illust_id=*
// @include          https://www.pixiv.net/member_illust.php*illust_id=*
// @exclude          http://www.pixiv.net/member*mode=manga*
// @exclude          https://www.pixiv.net/member*mode=manga*
// @homepage         https://greasyfork.org/en/scripts/22767-pixiv-ajax-bookmark-mod
// @supportURL       https://greasyfork.org/en/scripts/22767-pixiv-ajax-bookmark-mod/feedback
// @author           qa2 & SaddestPanda
// @require          https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @grant            none
// @run-at           document-idle
// @noframes
// ==/UserScript==

//When you add an illustration to bookmarks also give it a like.
//　1 でしたらブックマークした時、同時に「いいね！」もします。
var givelike = 1;

//R18 illustrations are added as private bookmarks.
//　1 でしたらイラストはＲ-１８であった場合プライベートブックマークにします。
var r18private = 1;

// If set to "1": Always add to private bookmarks list.
//ブックマークする作品をいつも非公開にするかどうか 0:公開 1:非公開
var bkm_restrict = 0;

//Add all tags to the bookmark.
//作品に登録されているすべてのタグをブックマークタグとして追加
var add_all_tags = 1;

var tags, useNewDesign = "", tagsInterval = "", TheInterval = "", resCheckerInterval = "", currLocation = "", restartInterval = "";

pageisNew();

function pageisNew() {
    //console.log("pageisnew");
    clearInterval(restartInterval);
    var TheInterval = setInterval(function () { //Check if the page is using the new design.
        try {
            if (globalInitData.token != null) {
                useNewDesign = 1;
                tagsInterval = setInterval(startingUp, 125);
                clearInterval(TheInterval);
            }
        } catch (e) {}
        try {
            if (pixiv.context.token != null) {
                useNewDesign = 0;
                oldstartingUp();
                clearInterval(TheInterval);
            }
        } catch (e) {}
    }, 125);
}

function startingUp() {
    tags = "";
    //console.log("startingup");
    clearInterval(resCheckerInterval);
    currLocation = document.location.href;
    resCheckerInterval = setInterval(restartChecker, 100);
    //get all tags
    $("footer >").children().each(function () {
        try {
            tags += decodeURIComponent($(this).find("a")[0].href).split("&word=")[1] + " ";
        } catch (e) {}
    });

    if (tags != "") {
        //cancel if already bookmarked
        if ($(".gtm-main-bookmark").length != 1) {
            clearInterval(tagsInterval);
            return;
        } else {
            //Set the button action
            $(".gtm-main-bookmark")[0].href = "javascript:void(0)";
            $(".gtm-main-bookmark").on("click", function () {
                bkm();
                return false;
            });
            //console.log(tags);
            clearInterval(tagsInterval);
        }
    }
}

function restartChecker() {
    if (document.location != currLocation) {
        clearInterval(resCheckerInterval);
        clearInterval(restartInterval);
        restartInterval = setInterval(restartingSoon, 100);
    }
}

function restartingSoon() {
    //console.log("restartingsoon");
    try {
        if ($(".gtm-main-bookmark")[0].disabled == false) {
            pageisNew();
        }
    } catch (e) {}
}


// ajaxでブックマークする関数
function bkm() {
    //console.log("bkm");
    //var illustid = $("input[name=illust_id").val();
    //var tt = $("input[name=tt]").val();
    //var type = $("input[name=type]:eq(1)").val();
    //var illustid = pixiv.context.queries.id;
    var illustid = document.location.href.split("illust_id=")[1];
    var url = "https://www.pixiv.net/bookmark_add.php?id=" + illustid;    //https://www.pixiv.net/bookmark_add.php?rest=show&type=illust&p=1&illust_id=70318176
    var tt = globalInitData.token;
    if (!add_all_tags) {
        tags = "";
    }
    //var illusttype = "illust";

    try {
        if ($("footer >")[0].firstChild.innerText == "R-18" && r18private) {
            bkm_restrict = 1;
        }
    } catch (e) {}

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: {
            mode: "add",
            tt: tt,
            id: illustid,
            from_sid: "",
            type: "illust",
            comment: "",
            tag: tags,
            restrict: bkm_restrict,
            success: function () {
                if (bkm_restrict) {
                    //INSERT THE LOCKED HEART (PRIVATE BOOKMARK) SVG        https://yoksel.github.io/url-encoder/
                    $(".gtm-main-bookmark svg")[0].outerHTML = decodeURIComponent("%3Csvg class='_20nOYr7 _2HKYK4a _2IvLx-T' viewBox='0 0 32 32' width='32' height='32'%3E%3Cpath class='_3raf_E-' d='%0AM21,5.5 C24.8659932,5.5 28,8.63400675 28,12.5 C28,18.2694439 24.2975093,23.1517313 17.2206059,27.1100183%0AC16.4622493,27.5342993 15.5379984,27.5343235 14.779626,"
                                                                     + "27.110148 C7.70250208,23.1517462 4,18.2694529 4,12.5%0AC4,8.63400691 7.13400681,5.5 11,5.5 C12.829814,5.5 14.6210123,6.4144028 16,7.8282366%0AC17.3789877,6.4144028 19.170186,5.5 21,5.5 Z'%3E%3C/path%3E"
                                                                     + "%3Cpath d='M16,11.3317089 C15.0857201,9.28334665 13.0491506,7.5 11,7.5%0AC8.23857625,7.5 6,9.73857647 6,12.5 C6,17.4386065 9.2519779,21.7268174 15.7559337,25.3646328%0AC15.9076021,25.4494645 16.092439,25.4494644 16.2441073,25.3646326 C22.7480325,21.7268037 26,17.4385986 26,12.5%0AC26,9.73857625 23.7614237,7.5 21,7.5 C18.9508494,7.5 16.9142799,9.28334665 16,11.3317089 Z'%3E%3C/path%3E"
                                                                     + "%3Cpath class='_3Do9roK' d='M29.9796 20.5234C31.1865 21.2121 32 22.511 32 24V28C32 30.2091 30.2091 32 28 32H21%0AC18.7909 32 17 30.2091 17 28V24C17 22.511 17.8135 21.2121 19.0204 20.5234C19.2619 17.709 21.623 15.5 24.5 15.5%0AC27.377 15.5 29.7381 17.709 29.9796 20.5234Z'%3E%3C/path%3E"
                                                                     + "%3Cpath class='_3_qjwsT' d='M28 22C29.1046 22 30 22.8954 30 24V28C30 29.1046 29.1046 30 28 30H21%0AC19.8954 30 19 29.1046 19 28V24C19 22.8954 19.8954 22 21 22V21C21 19.067 22.567 17.5 24.5 17.5%0AC26.433 17.5 28 19.067 28 21V22ZM23 21C23 20.1716 23.6716 19.5 24.5 19.5C25.3284 19.5 26 20.1716 26 21V22H23V21Z'%3E%3C/path%3E%3C/svg%3E");
                } else {
                    $(".gtm-main-bookmark svg")[0].style.fill = "#ff4060";
                    $(".gtm-main-bookmark svg path")[0].style.fill = "#ff4060";
                }
                $(".gtm-main-bookmark")[0].href = "https://www.pixiv.net/bookmark_add.php?type=illust&illust_id=" + illustid;
                $(".gtm-main-bookmark").unbind("click");
                $(".gtm-main-bookmark").on("click", function (e) {
                    e.preventDefault();
                    window.location = "https://www.pixiv.net/bookmark_add.php?type=illust&illust_id=" + illustid;
                    return false;
                });
            }
        },
    });

    if (givelike) {
        $(".gtm-main-bookmark").parent()[0].nextSibling.children[0].click();
    }
}


/////// BELOW FUNCTIONS ARE ///////
/////// FOR THE OLD DESIGN ///////
function oldstartingUp() {
    tags = "";
    $(".tag > .text").contents().not($('span')).each(function () {
        tags += $(this).text() + " ";
    });

    $(".add-bookmark").on("click", function () {
        //e.preventDefault();
        oldbkm();
        return false;
    });

}

function oldbkm() {
    //var illustid = $("input[name=illust_id").val();
    //var tt = $("input[name=tt]").val();
    //var type = $("input[name=type]:eq(1)").val();
    var illustid = pixiv.context.illustId;
    var url = "https://www.pixiv.net/bookmark_add.php?id=" + illustid;
    var tt = pixiv.context.token;
    var type = pixiv.context.type;

    if ($(".r-18")[0] != null && r18private) {
        bkm_restrict = 1;
    }

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: {
            mode: "add",
            tt: tt,
            id: illustid,
            type: type,
            //from_sid: "",
            comment: "",
            tag: tags,
            restrict: bkm_restrict,
            success: function () {
                if ($(".add-bookmark").text() == "ブックマークに追加") {
                    $(".add-bookmark").html($('<span>', {
                        class: 'description',
                        html: "ブックマークを編集"
                    }));
                } else if ($(".add-bookmark").text() == "添加收藏") {
                    $(".add-bookmark").html($('<span>', {
                        class: 'description',
                        html: "编辑收藏"
                    }));
                } else {
                    $(".add-bookmark").html($('<span>', {
                        class: 'description',
                        html: "Edit Bookmark"
                    }));
                }
                $(".add-bookmark")[0].classList.add("edit-bookmark");
                $(".add-bookmark")[0].classList.add("bookmarked");
                $(".edit-bookmark")[0].classList.remove("add-bookmark");
            }
        },
    });

    if (givelike) {
        $("._nice-button").trigger("click");
    }
}