// ==UserScript==
// @name         VRChat LittleONE
// @namespace    https://greasyfork.org/zh-TW/scripts/372162-vrchat-littleone
// @version      0.81
// @description  VRChat
// @author       Tast
// @include      /.*?:\/\/.*?vrchat.*?\..*?(home|launch|api|friendlist).*?/
// @include      *://www.vrchat.net
// @include      *://www.vrchat.com
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_getResourceURL
// @require      https://code.jquery.com/jquery-2.2.4.min.js
// @require      https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js
// @require      https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js
// @resource     JqueryUIcss    https://code.jquery.com/ui/1.12.1/themes/ui-darkness/jquery-ui.css
// @resource     private_image  https://assets.vrchat.com/www/images/default_private_image.png
// @resource     JumpICON       https://image.flaticon.com/icons/svg/1215/1215194.svg
// @require      https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/locale/zh-tw.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/chroma-js/1.4.0/chroma.min.js
// @icon         https://assets.vrchat.com/www/images/favicon.png
// @compatible   Chrome
// @run-at       document-start
// ==/UserScript==

// Chroma.js
// https://github.com/gka/chroma.js/
// https://gka.github.io/chroma.js/#chroma-blend

// moment https://momentjs.com/
// https://cdnjs.com/libraries/moment.js/

// https://github.com/js-cookie/js-cookie
// https://developer.mozilla.org/zh-TW/docs/Web/API/Window.onpopstate
// https://www.oxxostudio.tw/articles/201706/javascript-promise-settimeout.html

//alert(unescape("%u541B%u306E%u540D%u524D%u306F"));

// https://www.vrchat.net/home/world/wrld_b51f016d-1073-4c75-930d-9f44222c7fc3
// https://www.vrchat.net/home/launch?worldId=wrld_b51f016d-1073-4c75-930d-9f44222c7fc3&instanceId=42~private(f347d08b-17b3-46d8-81e2-bc6b94d3b9d6)

//<span aria-hidden="true" class="fa fa-cog fa-2x fa-spin"></span>

var url = window.location.href;

var WorldTemp   = {};
var UserTemp    = {};
//var StatusColor = {  "join me":"#1FD1ED", "active":"#19A38F", "busy":"darkred" };
var StatusColor = {  "join me":"#1FD1ED", "active":"lightgreen", "busy":"darkred" };
var TrustedData = {//"admin_official_thumbnail" : ["#FFFFFF" , "Admin Thumbnailr" ] by Ex Excelsior (Ex) https://goo.gl/3qPscU
                     "admin_moderator"      : ["#8B0000" , "Admin"       ]  // 暗紅 by Ex Excelsior (Ex) https://goo.gl/3qPscU
                    ,"system_troll"         : ["#808080" , "Troll"       ]  // 灰色 by Ex Excelsior (Ex) https://goo.gl/3qPscU
                    ,"system_probable_troll": ["#808080" , "Troll??"     ]  // 灰色 by Ex Excelsior (Ex) https://goo.gl/3qPscU
                    ,"system_trust_legend"  : ["yellow"  , "Veteran"     ]  // 金色
                    ,"system_trust_veteran" : ["#8143E6" , "Trusted User"]  // 紫色
                    ,"system_trust_trusted" : ["#FF7B42" , "Known User"  ]  // 橘色
                    ,"system_trust_known"   : ["#2BCF5C" , "User"        ]  // 綠色
                    ,"system_trust_intermediate" : ["#000080" , "Intermediate" ] //New User+ (New User > User) by Ex Excelsior (Ex) https://goo.gl/3qPscU
                    ,"system_trust_basic"   : ["#1778FF" , "New User"    ]  // 藍色 
                    ,"system_legend"        : ["#FF0000" , "Legend"      ]};// 紅色 by Ex Excelsior (Ex) https://goo.gl/3qPscU
var RoomType    = {  "private"              : ["Private" , "#1fd1ed"]
                    ,"~hidden"              : ["Friends+", "#8143E6"]
                    ,"~friends"             : ["Friends" , "#FF7B42"]
                    ,"~canRequestInvite"    : ["Invite+" , "#2BCF5C"]
                    ,"~private"             : ["Invite"  , "#1778FF"]
                    ,"~pub"                 : ["Public"  , "yellow" ] };
//                    ,"~null"                : ["Public"  , "yellow" ] };
var WorldType   = {  "public"               : ["check"      , "lightgreen"]
                    ,"hidden"               : ["exclamation", "#ff4d4d"   ]
                    ,"private"              : ["exclamation", "lightpink" ] };
                    
// 延長Cookie登入狀態
function CookieExtend(){ //return;
    if(window.location.href.match("\/login")) return;
    
    var auth    = Cookies.get('auth');
    var apiKey  = Cookies.get('apiKey');
    if(auth)    Cookies.set('auth'  , auth  , { expires: 7 });
    if(apiKey)  Cookies.set('apiKey', apiKey, { expires: 7 });
}

MainStart();
function MainStart(){
    InsertCustomCSS();
    $(document).ready(JumpMainDomainCheck);
    
    if(url.match("\/launch\?")){
        if(url.match(regexUnityID("wld",url) + ":") || url.match(regexUnityID("wrld",url) + ":")){
            var url2 = url .replace(regexUnityID("wld" ,url) + ":",regexUnityID("wld" ,url) + "&instanceId=");
                url2 = url2.replace(regexUnityID("wrld",url) + ":",regexUnityID("wrld",url) + "&instanceId=");
            window.location.href = url2;
            return;
        }
        //$(document).ready(function(){ setTimeout(LaunchPage,1000 * 1); });
    }
    if(url.match("\/home.?")) HomePage();
    if(url.match("\/friendlist.?")) FriendList();
}

function JumpMainDomainCheck(){
    if(document.location.host == "www.vrchat.net" || document.location.host == "vrchat.net") return;
    
    // https://www.w3schools.com/cssref/tryit.asp?filename=trycss_cursor
    $("body").append(""
    + "<div class='noselect' style='display:inline-block;position:fixed;left:10px;bottom:5px;z-index:500;cursor:alias;'>"
        + '<img id="JumpMainDomain" width="17" title="Jump to www.vrchat.net" src="' + GetTMRes("JumpICON","data:image/svg+xml;") + '" />'
    + "</div>")
    
    $("#JumpMainDomain").click(function(){
        document.location.host = "www.vrchat.net";
    })
}

var LastHomePage = document.location.pathname;
function HomePage(){
    /*
    if(url.match("\/home\/launch\?")){
        window.location.href = url.replace("\/home\/launch\?","\/launch\?");
        return;
    }
    */
    
    setTimeout (CookieExtend,1000 *  5);
    setInterval(CookieExtend,1000 * 15);
    window.onbeforeunload = function(e) { CookieExtend(); };
    
    // https://stackoverflow.com/a/30680994
    $("head").append("<style>::-webkit-scrollbar {width: 0px;  /* remove scrollbar space */background: transparent;  /* optional: just make scrollbar invisible */}</style>");
    
    // https://stackoverflow.com/a/12471484
    //$("head").append("<style>img.steam {position: relative;margin: auto;top: 0;left: 0;right: 0;bottom: 0;}</style>");
    //$("head").append("<style>img.steam {align:middle;}</style>");
    //$("head").append("<style>.verticalcenter {display: table-cell;height: auto;vertical-align: middle;}</style>");
    
    setInterval(function(){
        HomePageFunc();
        
        RunOnce("img.img-thumbnail.rounded-circle.float-left.home-avatar:eq(0)"
                                                        ,"UserBaseData"         ,UserBaseData)
        RunOnce("div.home-content div.center-block.text-center > h2:contains('Hello there,'):eq(0)"
                                                        ,"MainHome"             ,MainHome)
        RunOnce("h3.subheader:contains('steam_'):eq(0)" ,"SteamIDLinkToPage"    ,SteamIDLinkToPage);
        RunOnce("div.animated.fadeIn.card > h3.card-header:contains('Password')"
                                                        ,"SetPublicAvatar"      ,SetPublicAvatar);
        RunOnce("div.card.card-body.bg-primary:hidden"  ,"UserStatus"           ,UserStatus);
        RunOnce("img.profile-thumbnail.img-rounded"     ,"ExpandWorldThumbnail" ,ExpandWorldThumbnail);
        RunOnce("button#login-form-submit"              ,"LoginGoBack"          ,LoginGoBack);
        RunOnce("div.home-content > div.row:eq(0)"      ,"WorldsWithFriends"    ,WorldsWithFriends);
        RunOnce("div.home-content div.col-md-12 small:contains('— by')","WorldToVRCList",WorldToVRCList);
        RunOnce("div.friend-group:eq(0)"                ,"HideOnline"           ,function(element){
            $(element).find("h4:contains('Online'):eq(0)").hide();
        })
        RunOnce("div.flex-shrink-1:eq(0) a.launch-btn:eq(0)"  ,"LaunchOptions"  ,LaunchPage);
        
        if(document.location.pathname != LastHomePage){
            if( document.location.pathname.match(/(\/login|\/register|\/password)/) ){
                //console.error(document.location.pathname);
            }
            else LastHomePage = document.location.pathname;
        }
    },1000 * 0.7);
}

function UserBaseData(element){
    var userID      = regexUnityID("usr" ,$(element).parent().attr("href"));
    var displayName = $(element).parent().parent().find("p.display-name").html();
    
    if(userID && displayName){
        GM_setValue("cur_userID"        ,userID)
        GM_setValue("cur_displayName"   ,displayName)
    }
}

function MainHome(){
    $("div.home-content > div")
    .append(`
    <div class="row">
        <div class="col-12">
            <h3>Blocked/Muted/Hided&Showed Avatar by <font color="yellow">someone</font>.<div id="Lone_BlockLoad_Data_Count" style="display:inline;"></div></h3>
            <div class="row">
                <div class="col-md-4">
                    <button type="button" class="btn btn-primary" id="Lone_BlockLoad">Who against you</button>
                    <div id="Lone_BlockLoad_Data"  style="display:-webkit-inline-box;font-family:Segoe UI;"></div>
                    <div id="Lone_BlockLoad_Data2" style="display:-webkit-inline-box;font-family:Segoe UI;"></div>
                </div>
            </div>
        </div>
    </div>`)
    .append(`
    <div class="row">
        <div class="col-12">
            <h3>Block/mute/hide&showAvatar someone by <font color="yellow">you</font>.<div id="Lone_BlockLoad_DataYou_Count" style="display:inline;"></div></h3>
            <div class="row">
                <div class="col-md-4">
                    <button type="button" class="btn btn-primary" id="Lone_BlockLoadYou">Load your moderation</button>
                    <div id="Lone_BlockLoad_DataYou"  style="display:-webkit-inline-box;font-family:Segoe UI;"></div>
                    <div id="Lone_BlockLoad_DataYou2" style="display:-webkit-inline-box;font-family:Segoe UI;"></div>
                </div>
            </div>
        </div>
    </div>`);
    
    $("#Lone_BlockLoad").click(function(){
        $("#Lone_BlockLoad").prop('disabled', true);
        $("#Lone_BlockLoad_Data").html("");
        
        $.get( "/api/1/auth/user/playermoderated").done(function( json ){ //console.error(json);
            GM_setValue("playermoderated",json || []);
            $("#Lone_BlockLoad_Data_Count").html("(" + json.length + ")");
            var block = "", blockCount = 0;
            var mute  = "", muteCount  = 0;
            var hide  = "", hideCount  = 0;
            var show  = "", showCount  = 0;
            $("#Lone_BlockLoad").prop('disabled', false);
            $(json).each(function(index, value){ //console.error( index + ": " + value );
                GM_setValue(value.sourceUserId + "_pastName",value.sourceDisplayName);
                value.created = TimeLocalizerUTC(value.created);
                if(value.type == "block"){ //console.error("block: " + value.sourceDisplayName);
                    blockCount = blockCount + 1;
                    block   = block
                        + "<font color='blue'>"   + value.created.split("T")[0] + "</font>&nbsp;"
                        + "<font color='green'>"  + value.created.split("T")[1].split(/:\d+\..+Z/)[0] + "</font>&nbsp;"
                        + "<a target='_blank' style='color:black;' href='/home/user/" + value.sourceUserId + "'>"
                        + value.sourceDisplayName + "</a>" + "<br>";
                }
                else if(value.type == "mute"){ //console.error("mute: " + value.sourceDisplayName);
                    muteCount = muteCount + 1;
                    mute   = mute
                        + "<font color='blue'>"   + value.created.split("T")[0] + "</font>&nbsp;"
                        + "<font color='green'>"  + value.created.split("T")[1].split(/:\d+\..+Z/)[0] + "</font>&nbsp;"
                        + "<a target='_blank' style='color:#99003d;' href='/home/user/" + value.sourceUserId + "'>"
                        + value.sourceDisplayName + "</a>" + "<br>";
                }
                else if(value.type == "hideAvatar"){ //console.error("mute: " + value.sourceDisplayName);
                    hideCount = hideCount + 1;
                    hide   = hide
                        + "<font color='blue'>"   + value.created.split("T")[0] + "</font>&nbsp;"
                        + "<font color='green'>"  + value.created.split("T")[1].split(/:\d+\..+Z/)[0] + "</font>&nbsp;"
                        + "<a target='_blank' style='color:#99003d;' href='/home/user/" + value.sourceUserId + "'>"
                        + value.sourceDisplayName + "</a>" + "<br>";
                }
                else if(value.type == "showAvatar"){ //console.error("mute: " + value.sourceDisplayName);
                    showCount = showCount + 1;
                    show   = show
                        + "<font color='blue'>"   + value.created.split("T")[0] + "</font>&nbsp;"
                        + "<font color='green'>"  + value.created.split("T")[1].split(/:\d+\..+Z/)[0] + "</font>&nbsp;"
                        + "<a target='_blank' style='color:#99003d;' href='/home/user/" + value.sourceUserId + "'>"
                        + value.sourceDisplayName + "</a>" + "<br>";
                }
            })
            $("#Lone_BlockLoad_Data").append('<br>'
                + '<div class="card card-body bg-primary lone_ignore"><b>'
                + 'Block you:  ' + blockCount + '<br>'
                +  block 
                + '</b></div>');
                
            $("#Lone_BlockLoad_Data").append('<br>'
                + '<div class="card card-body bg-primary lone_ignore"><b>' 
                + 'Mute you:  ' + muteCount + '<br>'
                +  mute 
                + '</b></div>');
            
            $("#Lone_BlockLoad_Data2").append('<br>'
                + '<div class="card card-body bg-primary lone_ignore"><b>' 
                + 'Hide your Avatar:  ' + hideCount + '<br>'
                +  hide 
                + '</b></div>');
            
            $("#Lone_BlockLoad_Data2").append('<br>'
                + '<div class="card card-body bg-primary lone_ignore"><b>' 
                + 'Show your Avatar:  ' + showCount + '<br>'
                +  show 
                + '</b></div>');
            
        }).fail(function( xhr, status, error ) { console.error(error);
            $("#Lone_BlockLoad_Data").html("fetch error");
            $("#Lone_BlockLoad").prop('disabled', false);
        });
    })
    
    $("#Lone_BlockLoadYou").click(function(){
        $("#Lone_BlockLoadYou").prop('disabled', true);
        $("#Lone_BlockLoad_DataYou").html("");
        
        $.get( "/api/1/auth/user/playermoderations").done(function( json ){ //console.error(json);
            GM_setValue("playermoderations",json || []);
            $("#Lone_BlockLoad_DataYou_Count").html("(" + json.length + ")");
            var block = "", blockCount = 0;
            var mute  = "", muteCount  = 0;
            var hide  = "", hideCount  = 0;
            var show  = "", showCount  = 0;
            $("#Lone_BlockLoadYou").prop('disabled', false);
            $(json).each(function(index, value){ //console.error( index + ": " + value );
                GM_setValue(value.targetUserId + "_pastName",value.targetDisplayName);
                value.created = TimeLocalizerUTC(value.created);
                if(value.type == "block"){ //console.error("block: " + value.sourceDisplayName);
                    blockCount = blockCount + 1;
                    block   = block
                        + "<font color='blue'>"   + value.created.split("T")[0] + "</font>&nbsp;"
                        + "<font color='green'>"  + value.created.split("T")[1].split(/:\d+\..+Z/)[0] + "</font>&nbsp;"
                        + "<a target='_blank' style='color:black;' href='/home/user/" + value.targetUserId + "'>"
                        + value.targetDisplayName + "</a>" + "<br>";
                }
                else if(value.type == "mute"){ //console.error("mute: " + value.sourceDisplayName);
                    muteCount = muteCount + 1;
                    mute   = mute
                        + "<font color='blue'>"   + value.created.split("T")[0] + "</font>&nbsp;"
                        + "<font color='green'>"  + value.created.split("T")[1].split(/:\d+\..+Z/)[0] + "</font>&nbsp;"
                        + "<a target='_blank' style='color:#99003d;' href='/home/user/" + value.targetUserId + "'>"
                        + value.targetDisplayName + "</a>" + "<br>";
                }
                else if(value.type == "hideAvatar"){ //console.error("mute: " + value.sourceDisplayName);
                    hideCount = hideCount + 1;
                    hide   = hide
                        + "<font color='blue'>"   + value.created.split("T")[0] + "</font>&nbsp;"
                        + "<font color='green'>"  + value.created.split("T")[1].split(/:\d+\..+Z/)[0] + "</font>&nbsp;"
                        + "<a target='_blank' style='color:#99003d;' href='/home/user/" + value.targetUserId + "'>"
                        + value.targetDisplayName + "</a>" + "<br>";
                }
                else if(value.type == "showAvatar"){ //console.error("mute: " + value.sourceDisplayName);
                    showCount = showCount + 1;
                    show   = show
                        + "<font color='blue'>"   + value.created.split("T")[0] + "</font>&nbsp;"
                        + "<font color='green'>"  + value.created.split("T")[1].split(/:\d+\..+Z/)[0] + "</font>&nbsp;"
                        + "<a target='_blank' style='color:#99003d;' href='/home/user/" + value.targetUserId + "'>"
                        + value.targetDisplayName + "</a>" + "<br>";
                }
            })
            $("#Lone_BlockLoad_DataYou").append('<br>'
                + '<div class="card card-body bg-primary lone_ignore"><b>'
                + 'You block:  ' + blockCount + '<br>'
                +  block 
                + '</b></div>');
                
            $("#Lone_BlockLoad_DataYou").append('<br>'
                + '<div class="card card-body bg-primary lone_ignore"><b>' 
                + 'You mute:  ' + muteCount + '<br>'
                +  mute 
                + '</b></div>');
            
            $("#Lone_BlockLoad_DataYou2").append('<br>'
                + '<div class="card card-body bg-primary lone_ignore"><b>' 
                + 'You hideAvatar:  ' + hideCount + '<br>'
                +  hide 
                + '</b></div>');
                
            $("#Lone_BlockLoad_DataYou2").append('<br>'
                + '<div class="card card-body bg-primary lone_ignore"><b>' 
                + 'You ShowAvatar:  ' + showCount + '<br>'
                +  show 
                + '</b></div>');            
        }).fail(function( xhr, status, error ) { console.error(error);
            $("#Lone_BlockLoad_DataYou").html("fetch error");
            $("#Lone_BlockLoadYou").prop('disabled', false);
        });
    })
    
    // ===========================================================================
    // CREDIT
    $("div.home-content > div")
    .append(''
        + '<br><div class="row"><div class="col-12"><h3><h3 style="float:right;"><font color="yellow">Credit</font></h3></h3><div class="row"><div class="col-md-4"><img width="20" src="' + GetTMRes("JumpICON","data:image/svg+xml;") + '" /> Icons made by <a href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry">Kiranshastry</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div></div></div></div>'
    )
}

function WorldToVRCList(element){
    // "— by "
    $(element).contents().filter(function(){ return this.nodeType === 3; }).eq(0).remove();
    var world_id    = regexUnityID("(wrld|wld)",window.location.href);
    var world_name  = $("small.WorldToVRCList:eq(0)").parent().find("a:eq(0)").html();
    var user_name   = $("small.WorldToVRCList:eq(0) a[href*='usr_']").html();
    //$(element).parents("div.col-md-12:eq(0)").find("")
    var template_VRCWorldList = `
        <a target="_blank" href="%world-by-id%">—</a>&nbsp;
        <a target="_blank" href="%world-by-author%">by&nbsp;`
    
    $("small.WorldToVRCList:eq(0)").prepend(LoadFormatText(template_VRCWorldList,{  
         "%world-by-id%" : encodeURI(
            "https://www.google.com/search?q=site:vrcworldlist.net \"" + world_id + "\" | " +
            "\"" + world_name + "\"")
        ,"%world-by-author%" : encodeURI("http://www.vrcworldlist.net/search?utf8=%E2%9C%93&keyword=" + user_name)
    }).out)
}

var FriendsLimit = 300;
function GetOnlineFriends(callback, max, offset, userArray){ if(!callback) return;
    max         = max       || 100;
    offset      = offset    || 0;
    userArray   = userArray || [];
    //console.error("init-");
    //console.error([max, offset, userArray]);
    $.get( "/api/1/auth/user/friends/?n=" + max + "&offset=" + offset ).done(function( array ){ //console.error(array);
        userArray = userArray.concat(array);
        console.info("VRChatLittleONE GetOnlineFriends: " + userArray.length + " <-" + array.length);
        callback.apply(this, [userArray, "keepGoing"]);
        if(array.length < max || userArray.length >= FriendsLimit){
            callback.apply(this, [userArray, "success"]); return;
        }
        GetOnlineFriends(callback, max, userArray.length, userArray );
    }).error(function(){
        callback.apply(this, [userArray, "error"]);
    })
}

function WorldsWithFriends(){
    $("div.home-content div.col-12:eq(0)")
    .prepend(`
        <div>
            <h3><a id='WorldsWithFriends' href='#' style='color:#67d781;'>Worlds with Friends</a></h3>
        </div>
    `);
    
    $("#WorldsWithFriends").click(function(){
        var col12 = $(this).parents("div.col-12:eq(0)").html("Fetching Data....<br>LoadingPage.... 1");
        //$.get( "/api/1/auth/user/friends/" ).done(function( json ){ //console.error(json);
        GetOnlineFriends(function(json, status){ //console.error(json);
            if(status == "keepGoing"){
                $(col12).html($(col12).html()
                    + "  ( " + json.length + " )"
                    + "<br>LoadingPage.... " + (Math.ceil(json.length / 100) + 1));
                return;
            }
            $(col12).html($(col12).html() + "Processing...");
            
            var WorldsJson = {};
            for (var i = 0; i < json.length; i++) { //console.error(json[i])
                var location = /(wrld|wld)_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}:\d+/gmi.exec(json[i].location);
                    location = location ?  location[0] : json[i].location;
                json[i]   .locationBase =  location;
                WorldsJson[location]    =  WorldsJson[location] || { "counter":0 };
                WorldsJson[location]["counter"] = WorldsJson[location]["counter"] + 1;
                WorldsJson[location]["room"]    = json[i].location;
                WorldsJson[location]["created"] = regexUnityID("usr",json[i].location) || "NoOwner";
                
                // 玩家暫存資料
                UserTemp[json[i].id] = json[i];
                GM_setValue(json[i].id,json[i]);
            }
            WorldsJson = sortObject(WorldsJson);
            var privateData = WorldsJson["private"];
            delete            WorldsJson["private"];
            delete            WorldsJson["offline"];
                              WorldsJson["private"] = privateData || { "counter":0 };
            
            /*
            for (var i = 0; i < json.length; i++) { //console.error(json[i])
                WorldsJson[regexUnityID("wrld",json[i].location) 
                         ||regexUnityID("wld" ,json[i].location) 
                         ||                    json[i].location] = 1;
            }
            */
            Append({ "json":json, "WorldsJson":WorldsJson });
            //console.error(WorldsJson);
            //console.error(UserTemp);
            console.info("VRChatLittleONE Loaded:World(" + Object.keys(WorldsJson).length + "), Online(" + json.length + ")");
        })
    })
    //<span aria-hidden="true" class="fa fa-crosshairs fa-1x">
    // ▼▲▽△
    var template_top = `
        <h3 id='Lone_WWF_top_desc'>
            Total Online: <font style='color:yellow;'>%online-count%</font>
            (Private: <font style='color:yellow;'>%private-count%</font>)
            (Rooms: <font style='color:yellow;'>%rooms-count%</font>)
        </h3>`
    var template_world = `
        <!--
        <div class="row %private-type%" style="border-left:%world-color% 5px outset;border-right:%world-color% 5px outset;">
        -->
        <div class="row %private-type%">
            <div class="col-12 template_world">
                <h3><a class="Lone_wrld" wrld_id="%world-id%" style="color:white;" target="%world-window%" href="%world-page%">%world-name%</a>
                    <a class="btn btn-primary float-right Lone_World_locationJoin" style="width:80px;font-family:Segoe UI;padding:.2rem .75rem;background:%room-color% linear-gradient(180deg, %room-color%, %room-color%) repeat-x;border-color:%room-color%" href="%locationJoin%">%room-type%</a>
                    
                    <font class="float-right Lone_world_tags" style="color:white;">▼</font>
                    
                    <a class="btn btn-primary float-right pointer Lone_world_room_people" 
                       room="%room-location%" 
                       world="%world-ido%"
                       href="javascript:void();"
                       style="min-width:70px;padding:.2rem .75rem;background:#67d781 linear-gradient(180deg, #67d781, #67d781) repeat-x;border-color:#67d781;color:blue;">%world-room%</a>
                    
                    <a class="float-right" style="color:white;" target="_blank" href="%world-launch-link%">◄</a>
                    
                    <span class="badge badge-secondary float-right" style="display:none;text-transform:capitalize;padding:.14em .4em;">
                        <span aria-hidden="true" class="fa"></span>&nbsp;
                    </span>
                    
                    <a class="float-right Lone_wrld_author_link_vrclist" style="color:white;"  target="_blank">&nbsp;►</a>
                    <a class="float-right Lone_wrld_author_link" style="color:LightCoral;font-size:22px;" target="_blank"></a>
                </h3>
                <h3 style="float:right;z-index:5;border-bottom:unset;">
                    <!--<a style="vertical-align:top;font-size:15px;">Room Created by-->
                    <a class="Lone_room_createdBy" CreatedBy="%CreatedBy%">Room Created by
                        <a class="btn btn-primary pointer Lone_room_createdBy_btn" CreatedBy="%CreatedBy%" target="_blank">
                            <span class="fa fa-database"></span>
                        </a>
                    </a>
                    <a class="Lone_room_people_counter %private-room-counter%">%room-counter%</a>
                    <img class="Lone_wrld_img %blur%" src="%default_private_image%" />
                </h3>
                <div class="col-md-4" id="%world-ido%" style="%background-color%;position:unset;"></div>
            </div>
        </div>`
    var template_user   = `
    <div class="row text-left friend-row" user_id="%user_id%">
      <!--<a class="col-12">-->
        <img class="img-thumbnail rounded float-left friend-img Lone_world_friend" src="%img-thumbnail%" title="%display-title%" style="width:160px;height:120px;border-right-width:6px;border-right-color:%trust-color%;border-left:%world-color% 6px outset;">
        <div class="friend-caption text-success">
          <ul><li><a target="_blank" href="%user_page%">
                  <font color="%StatusColor%"><b>%display-name%</b></font></a></li>
              <li>%status-des%<font style="opacity:0.0;">-</font></li>
              <!--
              <li><font style="display:%rank-hide%;color:white !important;">Appearing as <font style="color:#67d781;">User</font> Rank</font></li>
              -->
          </ul>
        </div>
      <!--</a>-->
    </div>`
    function Append(jsons){
        var json        = jsons["json"]
        var WorldsJson  = jsons["WorldsJson"]
        var col12 = $("div.home-content div.row div.col-12:eq(0)").html("" +
            LoadFormatText(template_top,{  
                 "%online-count%"   : json.length + (json.length >= FriendsLimit ? "<a style='color:#90ee90;'>↑</a>":"")
                ,"%private-count%"  : WorldsJson["private"]["counter"] || 0
                ,"%rooms-count%"    : Object.keys(WorldsJson).length - 1
            }).out)
            
        $.each(WorldsJson, function(key, value) {
            $(col12).append('' + 
                LoadFormatText(template_world,{
                   //"%world-color%"    : ColorChroma(key)
                     "%private-type%"   : value.room == "private" ? "Lone_private_room" : ""
                    ,"%blur%"           : value.room == "private" ? "" : "blur"
                    ,"%world-id%"       : key.split(":")[0] || key
                    ,"%world-ido%"      : key
                    ,"%world-name%"     : value.room == "private" ? key : "🚧Under Construction🚧" /* key.split(":")[0] || key */
                    ,"%world-room%"     : key.split(":")[1] || "-"
                    ,"%world-page%"     : key.match("private") ? "#" : "/home/world/" + key.split(":")[0] || key
                    ,"%room-type%"      : GetRoomType(value.room)[0]
                    ,"%room-counter%"   : value.counter > 1 ? value.counter : ""
                    ,"%locationJoin%"   : value.room == "private" ? "#" : "vrchat://launch?ref=" + document.location.host + "&id=" + value.room
                    ,"%world-window%"   : value.room == "private" ? ""  : "_blank"
                    ,"%room-color%"     : GetRoomType(value.room)[1]
                    ,"%background-color%": value.room == "private" ? "background-color:#313131;" : ""
                    //,"%world-launch-link%": value.room == "private" ? "" : "https://www.vrchat.net/launch?worldId=" + key.split(":")[0]
                    ,"%world-launch-link%": value.room == "private" ? "" : "https://www.vrchat.net/home/launch?worldId=" + key.split(":")[0]
                    ,"%private-room-counter%": value.room == "private" ? "Lone_room_private_counter" : ""
                    ,"%CreatedBy%"      : value.created || "NoOwner"
                    ,"%default_private_image%": GM_getResourceURL("private_image")
                    ,"%room-location%"  : value.room
                }).out
            )
            
            setTimeout(function(){ 
                $("a.Lone_room_createdBy_btn[CreatedBy*='usr_']").each(function(){
                    var usr_id      = $(this).attr("CreatedBy");
                    //console.error([usr_id, UserTemp[usr_id]]);
                    if(UserTemp[usr_id]){
                        CreatedByAuto(this, UserTemp[usr_id]["displayName"]);
                    }
                    else {
                        var UserSaved   = GM_getValue(usr_id, null);
                        if(UserSaved){
                            CreatedByAuto(this, UserSaved["displayName"]);
                        }
                    }
                })
            },1)
        });
        
        AppendUserList(json);
        function AppendUserList(userJson, locationBase, exclude = {}){
        $.each(userJson, function(index, value) { //console.error(value.location);
            var  pastName = GM_getValue(value.id + "_pastName",null);
            if( !pastName || value.displayName === pastName)
                 pastName = "";
            //else pastName = " ( " + pastName + " ) ";
            else pastName = pastName + "&nbsp;&nbsp;&nbsp;";
            value.location = value.location || locationBase;
            $("div.col-md-4[id='" + ( value.locationBase || locationBase ) + "']").append('' +
                LoadFormatText(template_user,{
                     "%user_id%"        : value.id
                    ,"%display-name%"   : "<font style='color:white;'>"
                        + value.username    +"</font><br>"
                        + "<font style='color:white;'>" + pastName + "</font>"
                        + value.displayName
                    ,"%world-color%"    : ColorChroma(value.location)
                    ,"%img-thumbnail%"  : value.currentAvatarThumbnailImageUrl
                    ,"%user_page%"      : "/home/user/" + value.id
                    ,"%status-des%"     : value.statusDescription || ""
                    ,"%StatusColor%"    : StatusColor[value.status]
                    ,"%trust-color%"    : GetTrusted(value.tags)[0]
                    ,"%rank-hide%"      : value.tags.toString().match("show_social_rank") ? "none" : "unset"
                    
                    ,"%display-title%"  : "<font style='font-size:28px;'>"
                        +           value.displayName
                        + "<br><a style='color:" + StatusColor[value.status] + ";'>"
                        +   value.status
                        + "</a>"
                        + "<br><a style='color:" + GetTrusted(value.tags)[0] + ";'>"
                        +   (GetTrusted(value.tags)[1] || "Visiter")
                        + "</a>"
                        //+ "<br><img src='" + value.currentAvatarImageUrl + "' />"
                        + "<br><img src='" + value.currentAvatarThumbnailImageUrl + "' />"
                        //+ "-"
                + "</font>"}).out
            )
        })
            // https://api.jqueryui.com/tooltip/#option-position
            $(".Lone_world_friend").tooltip({
                position: { at: "right+15 center"}
            });
        }
        
        $("#private").parent().find("img:eq(0)").css("opacity","1.0")
            .css("width","250px").css("height","187.5px");
        
        $(col12).append("<h3>-</h3>");
        
        // ================================================================================================
        //return;
        var worldsREQ = {};
        $.each(WorldsJson, function(key, value) {
            if(key == "private" || worldsREQ[key]) return true; // continue
            worldsREQ[key] = true;
            
            if(WorldTemp[key.split(":")[0]]){
                WorldDataAppend(WorldTemp[key.split(":")[0]], key);
                //console.error([WorldTemp[key.split(":")[0]], key.split(":")[0]]);
                return true; // continue
            }
            
            var e_template_world = $("div.col-md-4[id='" + key + "']").parents("div.template_world:eq(0)");
            jQuery.ajax({
                //,async:false // https://stackoverflow.com/a/2592780
                url: "/api/1/worlds/" + key.split(":")[0],
                success: function(json) { //console.error(json);
                    if(!json.id){
                        $(e_template_world).find("a.Lone_wrld").html("Fetch error...");
                        return false;
                    }
                    WorldTemp[json.id] = json;
                    setTimeout(function(){
                        WorldDataAppend(json, key);
                    },1000)
                },error: (function( xhr, status, error ) { console.error([xhr, status, error]);
                    $("div.col-md-4[id='" + key + "']").parents("div.template_world:eq(0)")
                        .find("a.Lone_wrld")
                        .html("Failed? " + xhr.status);
                })
            });
            //return false;
        })
        console.info("VRChatLittleONE Worlds Request: " + Object.keys(worldsREQ).length);
        
        function WorldDataAppend(json, key){
            var e_template_world = $("div.col-md-4[id='" + key + "']").parents("div.template_world:eq(0)");
            //$("div.col-md-4[id='" + key + "']").prepend(json.description);
            
            $(e_template_world).find("a.Lone_wrld")
                .html(json.name /*+ " by " + json.authorName*/);
            
            $(e_template_world).find("img.Lone_wrld_img:eq(0)")
                .removeClass("blur")
                .attr("src",json.thumbnailImageUrl)
                .css("opacity","1.0")
            
            $(e_template_world).find("span.badge:eq(0)").show()
                .append(json.releaseStatus + "&nbsp;V." + json.version)
                .css("color",WorldType[json.releaseStatus][1])
                .attr("title","Occupants: "         + "<font class='Lone_wrld_badge'>" + json.occupants         + "</font>"
                         +"<br>PublicOccupants: "   + "<font class='Lone_wrld_badge'>" + json.publicOccupants   + "</font>"
                         +"<br>PrivateOccupants: "  + "<font class='Lone_wrld_badge'>" + json.privateOccupants  + "</font>"
                         +"<br>Capacity: "          + "<font class='Lone_wrld_badge'>" + json.capacity          + "</font>"
                         +"<br>Author: "            + "<font class='Lone_wrld_badge'>" + json.authorName        + "</font>"
                         +"<br>Description: <br>&nbsp;&nbsp;&nbsp;&nbsp;"
                            + "<font style='color:#1fd1ed;'><b>" + json.description + "</b></font>"
                ).tooltip()
                .find("span.fa:eq(0)")
                .addClass("fa-" + WorldType[json.releaseStatus][0])
            
            $(e_template_world).find(".Lone_world_tags:eq(0)").tooltip()
                .attr("title","World Tags:" + JSON.stringify(json.tags, null, "<br>").slice(1,-1))
                
            $(e_template_world).find(".Lone_wrld_author_link:eq(0)")
                .html(json.authorName)
                .attr("href","/home/user/" + json.authorId)
            
            $(e_template_world).find(".Lone_wrld_author_link_vrclist:eq(0)")
                .attr("href","http://www.vrcworldlist.net/search?utf8=%E2%9C%93&keyword=" + encodeURI(json.authorName))
        }
        
        $(".Lone_room_createdBy_btn").click(function(){ CreatedByAuto(this); });
        
        function CreatedByAuto(btn, displayName){ $(btn).unbind("click");
            if(displayName){ StyleLaunch(displayName); return; }
            
            var CreatedByUrl = "/api/1/users/" + $(btn).attr("CreatedBy");
            $.get( CreatedByUrl ).done(function( json ){ //console.error(json);
                StyleLaunch(json.displayName);
                UserTemp[json.id] = json;
            })
            
            function StyleLaunch(displayName){
                $(btn)
                    .html("<br>" + displayName)
                    .css("font-size","20px")
                    .removeClass('btn-primary')
                    .attr("href","/home/user/" + $(btn).attr("CreatedBy"))
            }
        }
        
        $(".Lone_world_room_people").click(function(){
            var roomElement = this;
            var userElement = $(this).parents("div.template_world:eq(0)").find("div.col-md-4:eq(0)");
            var room = $(this).attr("room").replace(":","/");
            if(room == "private") return;
            
            $(userElement).html("");//.css("background-color","#798897")
            
            $.get( "/api/1/worlds/" + room ).done(function( json ){ console.error(json);
                AppendUserList(json.users, $(roomElement).attr("world"));
                
                $(userElement).css("background-color","#1f262e");
                var RoomCounter = $(userElement).find("div.friend-row").length;
                $(roomElement)
                    .parents("div.template_world:eq(0)")
                    .find("a.Lone_room_people_counter:eq(0)")
                    .html(RoomCounter);
                    
                /*
                $(userElement).find("div.friend-row").each(function(){
                    var user_id = $(this).attr("user_id");
                    
                })
                */
            }).fail(function( xhr, status, error ) { console.error(error);
                
            })
        })
    }
}

function LoginGoBack(element){
    if(document.location.pathname == LastHomePage || LastHomePage == "") return;
    /*
    $(element).clone().appendTo($(element).parent())
        .removeAttr("id").removeAttr("name").removeAttr("value")
        .html("Login & goBack")
    */
    
    $(element).parent()
        //.append("&nbsp;&nbsp;&nbsp;<a href='#' id='LoginGoBack' class='btn btn-primary LoginGoBack'>Login & GoBack</a>")
        .append("<a href='#' id='LoginGoBack' class='btn btn-primary LoginGoBack'>Login & GoBack</a>")
        .append("<br>" + LastHomePage)
        
    $("#LoginGoBack").click(function(){
        //console.error(document.location);
        //console.error(LastHomePage);
        
        // https://wp.me/p7qfLb-6E
        // https://stackoverflow.com/a/11960692
        // https://stackoverflow.com/questions/12840410/how-to-get-a-cookie-from-an-ajax-response
        $.ajax({ //async: false, //data: '{ "comment" }',
            type: "GET",
            url: "/api/1/auth/user?apiKey=JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26",
            dataType: 'json',
            headers: {
                "Authorization": "Basic " + btoa($("#username_email").val() + ":" + $("#password").val())
            },
            success: function (data, textStatus, request){ //console.error(data);
                CookieExtend();
                window.location.href = document.location.origin + LastHomePage;
                //window.location.href = window.location.href;
                //history.go(-2);
            },
            error: function( jqXHR, textStatus, errorThrown ){
                console.error(jqXHR);
                console.error(textStatus);
                console.error(errorThrown);
                alert("login Failed");
            }
        });
    });
}

function ExpandWorldThumbnail(element){
    $(element).wrap("<a target='_blank' href='" + $(element).attr("src") + "'></a>");
    Expandhumbnail(element);
}

// https://vrchatapi.github.io/#/UserAPI/GetByID
function UserStatus(element){
    var UserID = regexUnityID("usr",window.location.href);
    if(!UserID) return;
    
    var Status = `&nbsp;
        <span id="LO_status" aria-hidden="true" class="fa fa-circle"></span>&nbsp;
        <a id="LO_pastName"></a>`
    //var StatusColor = { "join me":"aqua", "active":"lime", "busy":"red" };
    
    $("div.col-md-12 > h2:eq(0)").append(Status);
    element = $(element).removeAttr("hidden").html("retrieving status data...");
    
    $.get( "/api/1/users/" + UserID).done(function( json ){ //console.error(json);
        var  pastName = GM_getValue(UserID + "_pastName","");
        if(  json.displayName === pastName || json.username === pastName) pastName = "";
        $("#LO_status").css("color",StatusColor[json.status]);
        $("#LO_pastName").html(pastName);
        
        $(element).html(json.statusDescription == "" ? 
            "<a style='color:blue;'><b>No Description</b></a>" : "<b>" + json.statusDescription + "</b>");
        
        // https://github.com/VRChatAPI/vrchatapi.github.io/blob/master/UserAPI/Tags.md
        var TagsJson = "<br>" + JSON.stringify(json.tags, null, 2).toString().slice(1,-1);
        var Tags     = LoadFormatText(TagsJson,{ "ignoreSymbol":true
            ,"\",":"<br>"
            ,"\"" :""
            // https://www.vrchat.net/home/user/8JoV9XEdpo
            //,"admin_official_thumbnail" :"<font color='#FFFFFF'>%RepSrc%</font> [thumbnail]" 
            
            ,"admin_moderator"          : "<font color='#8B0000'>%RepSrc%</font> [Admin]"
            ,"system_legend"            : "(7/7) <font color='#FF0000'>%RepSrc%</font> [Legend]"
            ,"system_trust_legend"      : "(6/7) <font color='yellow' >%RepSrc%</font> [Veteran]"
            ,"system_trust_veteran"     : "(5/7) <font color='#8143E6'>%RepSrc%</font> [Trusted User]"
            ,"system_trust_trusted"     : "(4/7) <font color='#FF7B42'>%RepSrc%</font> [Known User]"
            ,"system_trust_known"       : "(3/7) <font color='#2BCF5C'>%RepSrc%</font> [User]"
            ,"system_trust_intermediate": "(1/7) <font color='#000080'>%RepSrc%</font> [Intermediate] New User+" // (New User > User)
            ,"system_trust_basic"       : "(1/7) <font color='#1778FF'>%RepSrc%</font> [New User]"
            ,"system_troll"             : "(0/7) <font color='#808080'>%RepSrc%</font> [Troll]"
            // https://www.vrchat.net/home/user/usr_837524d7-e1a6-4744-afe5-b23ef1fd4103
            ,"system_probable_troll"    : "(0/7) <font color='#808080'>%RepSrc%</font> [Troll??]" 
            
            ,"show_social_rank"         : "%RepSrc% [ShowLevel]"
        }).out;
        
        $("div.home-content div.col-md-12 > h3.subheader:eq(0)").append(LoadFormatText(
            `<span id="Lone_AvatarCloneStatus" aria-hidden="true" class="fa fa-clone" title="Allow Avatar Clone : %cloneType%" style="color:%cloneColor%;"></span>`
            ,{
                 "%cloneColor%" : json.allowAvatarCopying == true ? "green" : "red"
                ,"%cloneType%"  : json.allowAvatarCopying == true ? "Yes"   : "No"
            }).out).append(`<a id='trustedData' style='color:` + GetTrusted(json.tags)[0] + `;' 
                   title='` + "Tags" + `'>&nbsp;`
                    + (json.tags.toString().match("show_social_rank") ? "":"<s>")
                    + GetTrusted(json.tags)[1]
                    + (json.tags.toString().match("show_social_rank") ? "":"</s>")
                    +
               `</a>`);
               
        $("#Lone_AvatarCloneStatus").tooltip();
        
        $("div.col-md-4").find("img.offline, img.online").eq(0)
            .wrap("<a target='_blank' href='" + json.currentAvatarImageUrl + "'></a>")
            //.attr("src",json.currentAvatarImageUrl)
            .parent().parent().append(`<h3> 
                <a id="CheckAvatarOwner" style="color:white;" href="javascript:void();" title="Check avatar's owner of current user.">
                    Owner?
                </a>
                <!--
                <a id='trustedData' style='float:right;color:` + GetTrusted(json.tags)[0] + `;' 
                   title='` + "Tags" + `'>`
                    + (json.tags.toString().match("show_social_rank") ? "":"<s>")
                    + GetTrusted(json.tags)[1]
                    + (json.tags.toString().match("show_social_rank") ? "":"</s>")
                    +
               `</a>-->
            </h3><h3 id="ShowAvatarOwner" style="display:none;"></h3>`);
            
        $("#CheckAvatarOwner").tooltip().click(function(){
            $("#ShowAvatarOwner").css("display","block").html("Checking...");
            var path = document.location.origin + "/api/1/file/" + regexUnityID("file",json.currentAvatarImageUrl); 
            $.get( path ).done(function( json ){ // console.error(json);
                var isOwner = regexUnityID("usr",window.location.href) == json.ownerId ?
                              "<font style='color:#67d781;'>is</font>" : "is <font style='color:yellow;'>not</font>"
                $("#ShowAvatarOwner")
                    .attr("title",json.name).tooltip()
                    .html("user " + isOwner + " avatar's <a target='_blank' href='/home/user/" + json.ownerId + "'>owner</a>.");
            })
        });
        $("#trustedData").tooltip({ content: function () { return Tags; } });
        
        Expandhumbnail($("img.online, img.offline"));
        Expandhumbnail($("div.card.bg-primary > div.card-body:eq(0) img[src*='file']:eq(0)"));
        
        if(json.last_login.length > 0){
            var last_login = moment(json.last_login).format("YYYY-MM-DD HH:mm:ss");
            var last_login_fromNow = moment(json.last_login).fromNow(true);
            if(json.location != "offline")
                    last_login_fromNow = "上線 " + last_login_fromNow
            else    last_login_fromNow = last_login_fromNow + "前 上線"
            $("#LO_status").parent().append("<div style='float:right;'>" + last_login + "</div>");
            $("div.home-content div.mb-4.row div.col-md-12 h3.subheader:eq(0)").append("<div style='float:right;'>" + last_login_fromNow + "</div>");
        }
        
        // https://stackoverflow.com/a/1986850
        // $("div.world-join")
        if(json.location == "offline"){
            $("img[src*='default_offline_image.png']:eq(0)").parents("div.card.bg-primary:eq(0)")
                .css("cssText", "background-color: #404c58 !important;");
        }
        else if(json.location == "private"){
            $("img[src*='default_private_image.png']:eq(0)").parents("div.card.bg-primary:eq(0)")
                .css("cssText", "background-color: #6b7886 !important;")
                .html("<div class='card-body'><img src='https://assets.vrchat.com/www/images/default_private_image.png' /></div>")
        }
    }).fail(function( xhr, status, error ) { console.error(error);
        $(element).html("<a style='color:darkred;'><b>ERROR</b></a>");
        $("#LO_status").css("color","black");
    });
}

// http://www.wibibi.com/info.php?tid=79
// http://www.wibibi.com/info.php?tid=CSS3_background-size_%E5%B1%AC%E6%80%A7
// http://www.wibibi.com/info.php?tid=75
// https://goo.gl/BlGwtZ
function Expandhumbnail(e, url){
    $(e).hover(function() {
        $("div.home-content:eq(0) > div:eq(0)")
            .css("background-repeat","no-repeat")
            .css("background-size","contain") // 100%
            .css("background-image","url(" + (url || $(e).attr("src")) + ")")
            .css("background-position","center top") // 100%
            .find("div").css("opacity","0.3") //.fadeTo( "fast" , 0.1)
    }, function(){
        $("div.home-content:eq(0) > div:eq(0)")
            .css("background-image","")
            .find("div").css("opacity","1.0")
    });
}

// https://fontawesome.com/icons?d=gallery
function SetPublicAvatar(element){
    var e_AvatarThumbnail = $("img.img-thumbnail.rounded-circle.float-left.home-avatar:eq(0)").attr("src");
    
    var styleElement = `<hr>
    <div class="animated fadeIn card">
      <h3 class="card-header">CHANGE AVATAR (PUBLIC ONLY)</h3>
      <div class="card-body"><div><div class="center-panel"><form>
        <div class="row">
          <div class="col-1" style="text-align: right;">
            <span aria-hidden="true" class="fa fa-portrait fa-2x" id="SetAvatarPortrait" style="color:#FA5882;"></span>
          </div>
          <div class="col-10"><div class="row">
              <!--<textarea class="form-control" name="avatar-bluPrintID" id="avatar-bluPrintID"></textarea>-->
              <input type="text" class="form-control" id="avatar-bluPrintID" name="avatar-bluPrintID"></input>
          </div></div>
        </div>
      </div>
      <div class="row"><div class="col-1"></div>
        <div class="col-10"><div class="row">
          <div id="SetAvatarStatusDiv" style="display:none">
            <div id="SetAvatarStatus" style=""></div>
          </div>
        </div></div>
      </div>
      <div class="row">
        <div class="col-4 offset-4">
          <button class="btn btn-primary w-100" value="Use Default"   id="SetDefaultAvatar">Use Default</button>
        </div>
        <div class="col-4">
          <button class="btn btn-primary w-100" value="Change Avatar" id="SetPublicAvatar">Change Avatar</button>
        </div>
      </div>
    </form></div></div>
    </div>
    </div><hr>`
    
    $(styleElement).insertAfter( $(element).parent() );
    
    /*
    var styleElement = $(''
        + '<div class="card row"><h3>Change Avatar (Public only)</h3>'
        + '<div><div class="center-panel">'
        + '<form class="form-horizontal" name="update-status" action="#">'
        + '<div class="form-group"><div class="row"></div>'
        + '<div class="row">'
        + '<div class="col-1">'
            // https://fontawesome.com/icons?d=gallery&c=images
            // https://fontawesome.com/icons/portrait?style=solid
        + '<span aria-hidden="true" class="fa fa-portrait fa-4x">'
        + '</span>'
        + '</div>'
        + '<textarea class="col-md-10" name="avatar-bluPrintID" id="avatar-bluPrintID"></textarea>'
        //+ '<div class="col-1 d-none" id="SetPublicAvatarChecked"><span aria-hidden="true" class="fa fa-check fa-2x text-success"></span></div>'
        + '</div></div><div class="form-group">'
        + '<div class="row"><div class="offset-8">' //<div class="col-4 offset-8">'
        //+ '<input class="btn btn-primary w-100" value="Change Avatar" type="button" id="SetPublicAvatar">'
        + '<input class="btn btn-primary" value="Change Avatar" type="button" id="SetPublicAvatar">&nbsp;'
        + '<input class="btn btn-primary" value="Use Default" type="button" id="SetDefaultAvatar">'
        + '</div></div></div>'
        + '</form>'
        //+ '<div class="form-group" id="SetAvatarStatusDiv" style="display:none;"><div class="row"><div class="col-4"><div><span color="success" aria-hidden="true" class="fa fa-check"></span>&nbsp;<a id="SetAvatarStatus"></a></div></div><div class="col-4 offset-4"></div></div></div>'
        + '<div class="form-group" id="SetAvatarStatusDiv" style="display:none;"><div class="row"><div class="col-4"><div><span color="success" aria-hidden="true" class="fa fa-asterisk"></span>&nbsp;<a id="SetAvatarStatus"></a></div></div><div class="col-4 offset-4"></div></div></div>'
        + '</div></div></div>').insertAfter( $(element).parent() );
    */
    $("#avatar-bluPrintID").change(bluPrintIDchanged).keyup(bluPrintIDchanged);
    function bluPrintIDchanged(){
        if(regexUnityID("avtr",$("#avatar-bluPrintID").val())){
                //$("#SetPublicAvatarChecked").removeClass("d-none");
                $("#SetAvatarPortrait").css("color","lightgreen");
        }
        else {
                //$("#SetPublicAvatarChecked").addClass("d-none");
                $("#SetAvatarPortrait").css("color","#FA5882");
        }
    }
    
    $("#SetDefaultAvatar").click(function(){ 
        $("#avatar-bluPrintID").val("avtr_53856003-8ff2-4002-b78f-da5d028b22bd").trigger("keyup");
        $("#SetPublicAvatar").click();
    })
    
    $("#SetPublicAvatar").click(function(){ 
        var AvatarID = regexUnityID("avtr",$("#avatar-bluPrintID").val());
        if(!AvatarID || !confirm("Change Avatar?")) return;
        
        $("#SetPublicAvatar").prop('disabled', true);
        $("#SetAvatarStatus").html("");
        
        $.ajax({
            url: "/api/1/avatars/" + AvatarID + "/select",
            type: "PUT"
        }).done(function( json ) { //console.error(html);
            if(json.currentAvatar == AvatarID){
                $("img.img-thumbnail.rounded-circle.float-left.home-avatar:eq(0)")
                    .removeAttr("src").attr("src",json.currentAvatarThumbnailImageUrl)
                $("#SetAvatarStatus").html("Avatar Changed.");
            }
            else {
                $("#SetAvatarStatus").html("error?");
            }
            
            //$("#SetAvatarStatus").html($("#SetAvatarStatus").html() + "<img src='" + json.currentAvatarThumbnailImageUrl + "' />");
            $("#SetAvatarStatus").html($("#SetAvatarStatus").html() 
                + "<a target='_blank' href='" + json.currentAvatarImageUrl + "'><br>"
                + "<img style='width:200px;height:150px;' src='" + json.currentAvatarThumbnailImageUrl + "' /></a>");
            
            $("#SetAvatarStatusDiv").show();
            $("#SetPublicAvatar").prop('disabled', false);
            $(styleElement).find("span.fa-portrait").css("color","#F4FA58");
        }).fail(function( xhr, status, error ) {  console.error(status); console.error(error);
            $("#SetAvatarStatusDiv").show();
            $("#SetPublicAvatar").prop('disabled', false);
            //alert(" Failed to Change Avatar. Private avatar is not available. \n Or maybe you type a wrong Avatar ID");
            $("#SetAvatarStatus").html(" Failed to Change Avatar. <br> Wrong Avatar ID? <br> Private avatar is not available.");
            $(styleElement).find("span.fa-portrait").css("color","black");
        })
    });
}



var PageStates = {};
function HomePageFunc(){
    var MenuNode = $("a.btn-secondary.text-left[title='worlds']:eq(0)");
    if(!$(MenuNode).length || $(MenuNode).hasClass("LittleONE_done")) return;
    
    $("div.friend-container:eq(0)")
        .css("height","calc(100% - 145px)")
        .parent().find("h3:eq(0)").css("white-space","nowrap")//.hide();
    
    $('head').append('<link rel="stylesheet" href="' + GM_getResourceURL("JqueryUIcss") + '" type="text/css" />');
    
    $(MenuNode).addClass("LittleONE_done");
    
    $("span.copyright:eq(0)").html( ""
        + "<a target='_blank' style='color:#BDBDBD;' href='https://greasyfork.org/zh-TW/scripts?set=327266'>" 
        +   $("span.copyright:eq(0)").html() 
        + "</a>&nbsp;&nbsp;"
        + "<a target='_blank' style='color:white;' href='https://greasyfork.org/zh-TW/scripts/372162-vrchat-littleone'>" 
        +   "<font color='#67d781'>VRChat LittleONE</font>&nbsp;v<font color='#0040FF'>" + GM_info.script.version + "</font>"
        + "</a>");
        
    //$("div.w-100.btn-group-lg.btn-group-vertical > a[title='home']:eq(0)").append('&nbsp;<span aria-hidden="true" class="fa fa-angle-right fa-1.5x"></span>');
    
    // HomePage Home button Yellow
    $("a.btn.btn-secondary.text-left[title='home']:eq(0)").css("color","yellow");
    // HomePage World button green 
    $("a.btn.btn-secondary.text-left[title='worlds']:eq(0)").css("color","#67d781");
    
    // 左側邊欄縮排
    var leftBar = $("div.container-fluid div.bg-gradient-secondary.leftbar:eq(0)")
    $(leftBar)
        //.width("3.7%")/*.width("55px")*/
        .find("a.btn.btn-secondary.text-left").each(function(){
            $(this).contents().filter(function(){ return this.nodeType === 3; }).eq(0).remove();
        })
    /*
    $( leftBar ).animate({
        width: "fit-content",
        height: "toggle"
        }, {
        duration: 5000,
        specialEasing: {
          width: "linear",
          height: "easeOutBounce"
        },
        complete: function() {
          $( this ).after( "<div>Animation complete.</div>" );
        }
    });
    */
    // 中間資訊區域靠左並延展
    var widthPercentage = GetWidthPercentage($(leftBar)) * 1.8;
    var flexPercentage  = (100 - GetWidthPercentage($("div.bg-gradient-secondary.rightbar:eq(0)")) * 1.35) + "%";
    $("div.container-fluid div.offset-lg-2.col-lg-7.col-xs-12:eq(0)")
        .css("margin-left",widthPercentage + "%").css("flex","0 0 " + flexPercentage).css("max-width",flexPercentage)
    
    return;
    
    
    
    /*
    window.onpopstate = function(event) {
        //alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
        console.error("location: " + document.location + ", state: " + JSON.stringify(event.state));
    };
    */
    
    // https://www.vrchat.com/api/1/auth/user/playermoderated
    $(MenuNode).clone().html("<span aria-hidden='true' class='fa fa-user'></span>&nbsp;&nbsp;Friends History")
    .attr("title","FriendsHistory").insertAfter($(MenuNode)).attr("href","#").removeAttr("href")
    .click(function(){
        if(PageStates.Last != "FriendsHistory"){
            PageStates.Last2 = PageStates.Last;
            PageStates.Last  = "FriendsHistory";
        }
        
        $("a.btn.btn-secondary.text-left[title='download']:eq(0)").click();
        return;
        
        //$("div.home-content:eq(0)").append('<div id="dialog" title="Friends History"><p>Working Progress....</p></div>');
        /*
        $( "#dialog" ).dialog({
             position: { my: "left top", at: "left top", of: $("div.home-content:eq(0)") }
            ,width: $("div.home-content:eq(0)").width()
        });
        */
        //$("div.home-content:eq(0) > div:eq(0) > div:eq(0)").html("ccc");
        //$("div.home-content:eq(0) > div:eq(0)").html(""
        
        $("div.home-content:eq(0) > div:eq(0)").html(""
            + '<div class="center-block text-center justify-content-center mb-4 row">'
            +   '<div class="col-6">'
            +       '<h3> Working Progress....</h2>'
            +   '</div>'
            + '</div>').attr("class","");
        
        //history.pushState({"key":"FriendsHistory"}, "FriendsHistory", "/home#FriendsHistory");
        history.pushState({"key":"FriendsHistory"}, "FriendsHistory", "/home/FriendsHistory");
        //history.replaceState({"key":"FriendsHistory"}, "DownloadPage", "/home/FriendsHistory");
        
        var currentState = history.state;
        console.error("location: " + document.location + ", state: " + JSON.stringify(history));
        
        /*
        var currentState = history.state;
        console.error("location: " + document.location + ", state: " + JSON.stringify(currentState));
        
        
        
        //location.hash = "ccc";
        history.replaceState({"key":"FriendsHistory"}, "FriendsHistory", "/home/FriendsHistory");
        */
    })
    
    $("a.btn.btn-secondary.text-left:not(.LittleONE_done)").click(function(){
        var CurrentTitle = $(this).attr("title");
        
        if(history.state == null || history.state.key == null) return;
        
        if(CurrentTitle == "home" && PageStates.Last == "FriendsHistory"){
            history.replaceState({"key":PageStates["download"]}, "download", "/home");
            //$("a.btn.btn-secondary.text-left[title='download']:eq(0)").click();
            //$("a.btn.btn-secondary.text-left[title='home']:eq(0)").click();
        }
        
        PageStates.Last2                        = PageStates.Last;
        PageStates.Last                         = CurrentTitle;
        PageStates[PageStates.Last]             = history.state.key;
        PageStates["Location_" + CurrentTitle]  = document.location;
        
        console.error("location: " + document.location + ", state: " + JSON.stringify(history.state.key));
        console.error(PageStates);
        
    });
}
    
function SteamIDLinkToPage(element){
    // https://zh.wikipedia.org/zh-tw/File:Steam_icon_logo.svg
    //<img class='steam' width='30.4' height='30.4' src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/240px-Steam_icon_logo.svg.png'/>
    $(element).html("<a target='_blank' style='color:white;' href='https://steamcommunity.com/profiles/" + $(element).html().substring(6) + "'>" + $(element).html() + "</a>");
    
    var avatarIMG = $("img.online[src*='steam'],img.offline[src*='steam']").eq(0);
    $(avatarIMG).attr("src", $(avatarIMG).attr("src").replace("_medium.","_full."));
}

function LaunchPage(element){ // Beta
    var WorldID     = getQueryString("worldId");
    var InstancesID = getRndInteger(100, 99999);
    var usr_empty   = "usr_30ae0fcd-ed69-4f55-b4f3-34f5272f7344";
    var htmlSrc     = `<a href="vrchat://launch?id=` + WorldID + `:%room-id%~%launch-link%" class="btn btn-primary launch-btn" style="color:black;background-color:%Launch-bcolor%;min-width:230px;text-align:left;">%launch-text%</a>`
    
    var btns        = [
         LoadFormatText(htmlSrc,{ "%room-id%"        : "1"
            ,"%launch-link%"    : "pub"
            ,"%Launch-bcolor%"  : "yellow"
            ,"%launch-text%"    : "Public:1"}).out
        ,LoadFormatText(htmlSrc,{ "%room-id%"        : InstancesID
            ,"%launch-link%"    : "pub"
            ,"%Launch-bcolor%"  : "yellow"
            ,"%launch-text%"    : "Public:" + InstancesID}).out
        ,LoadFormatText(htmlSrc,{ "%room-id%"        : InstancesID
            ,"%launch-link%"    : "hidden(%usr_empty%)"
            ,"%usr_empty%"      : usr_empty
            ,"%Launch-bcolor%"  : "#8143E6"
            ,"%launch-text%"    : "Friends+"}).out
        ,LoadFormatText(htmlSrc,{ "%room-id%"        : InstancesID
            ,"%launch-link%"    : "canRequestInvite(%usr_empty%)"
            ,"%usr_empty%"      : usr_empty
            ,"%Launch-bcolor%"  : "#2BCF5C"
            ,"%launch-text%"    : "Invite+"}).out
    ]
    
    var userID      = GM_getValue("cur_userID"      ,null);
    var displayName = GM_getValue("cur_displayName" ,null);
    //userID = null;
    
    if(userID && displayName){
        btns.push(
             LoadFormatText(htmlSrc,{ "%room-id%"        : InstancesID
                ,"%launch-link%"    : ""
                ,"%Launch-bcolor%"  : "#f5b501"
                ,"%launch-text%"    : displayName}).out
            ,LoadFormatText(htmlSrc,{ "%room-id%"        : InstancesID
                ,"%launch-link%"    : "friends(" + userID + ")"
                ,"%Launch-bcolor%"  : "#FF7B42"
                ,"%launch-text%"    : "Friends"}).out
            ,LoadFormatText(htmlSrc,{ "%room-id%"        : InstancesID
                ,"%launch-link%"    : "private(" + userID + ")"
                ,"%Launch-bcolor%"  : "#1778FF"
                ,"%launch-text%"    : "Invite"}).out)
    } else {
        btns.push(LoadFormatText(htmlSrc,{
             "%room-id%"        : ""
            ,"%launch-link%"    : ""
            ,"%usr_empty%"      : ""
            ,"%Launch-bcolor%"  : "red"
            ,"%launch-text%"    : "LoadData..."}).out)
    }
    
    $(element).parent().append("<br>");
    $.each(btns, function(i, value) { //console.error(key + " - " + value);
        $(element).parent().append(value).append("<br>");
    })
    
    if(userID && displayName) return;
    $.get( "/api/1/auth/user").done(function( json ){ //console.error(json);
        json = JSON.parse(json);
        if(!json.id){
            $("a.launch-btn:contains('LoadData...'):eq(0)").html("Not login");
            return;
        }
        
        GM_setValue("cur_userID"      ,json.id);
        GM_setValue("cur_displayName" ,json.displayName);
        
        var btns2       = [
             LoadFormatText(htmlSrc,{ "%room-id%"        : InstancesID
                ,"%launch-link%"    : ""
                ,"%Launch-bcolor%"  : "#f5b501"
                ,"%launch-text%"    : json.displayName}).out
            ,LoadFormatText(htmlSrc,{ "%room-id%"        : InstancesID
                ,"%launch-link%"    : "friends(" + json.id + ")"
                ,"%Launch-bcolor%"  : "#FF7B42"
                ,"%launch-text%"    : "Friends"}).out
            ,LoadFormatText(htmlSrc,{ "%room-id%"        : InstancesID
                ,"%launch-link%"    : "private(" + json.id + ")"
                ,"%Launch-bcolor%"  : "#1778FF"
                ,"%launch-text%"    : "Invite"}).out
        ]
        
        $("a.launch-btn:contains('LoadData...'):eq(0)").remove();
        $.each(btns2, function(i, value) { //console.error(key + " - " + value);
            $(element).parent().append(value);
        })
    }).fail(function( xhr, status, error ) { 
        $("a.launch-btn:contains('LoadData...'):eq(0)").html("Not login");
        console.error(xhr);
        console.error(JSON.stringify(xhr.responseJSON, null, 4));
        alert(JSON.stringify(xhr.responseJSON.error, null, 4));
    })
    
    
    
    // -----------------------------------------------------------------------------------------------------------------
    return;
    // https://stackoverflow.com/a/30680994
    $("head").append("<style>::-webkit-scrollbar {width: 0px;  /* remove scrollbar space */background: transparent;  /* optional: just make scrollbar invisible */}");
    
    var WorldID = getQueryString("worldId");
    $("span.world:eq(0)").html("<a href='/home/world/" + WorldID + "' target='_blank'>" + $("span.world:eq(0)").html() + "</a>");
    
    var InstancesID = getRndInteger(100, 99999)
    var prevText    = "<a class='btn btn-primary btn-lg' href='vrchat://launch?ref=" + document.location.host + "&id=" + WorldID + ":";
    var nextText    = "</a>";
    
    $("#launch").parent()
        .after(LoadFormatText("<p>"
            +       "%prevText%1            '>Public:1"                                           + "%nextText%"
            + "&nbsp;%prevText%%InstancesID%'>Public"                                             + "%nextText%"
            + "&nbsp;%prevText%%InstancesID%" + "~hidden(%usr_empty%)'>Friends+"                  + "%nextText%"
            + "&nbsp;%prevText%%InstancesID%" + "~friends(%usr_empty%)'>Friends"                  + "%nextText%"
            + "&nbsp;%prevText%%InstancesID%" + "~private~canRequestInvite(%usr_empty%)'>Invite+" + "%nextText%"
            + "&nbsp;%prevText%%InstancesID%" + "~private(%usr_empty%)'>Invite"                   + "%nextText%"
            + "</p>"
        ,{
             "%prevText%"   : prevText
            ,"%InstancesID%": InstancesID
            ,"%nextText%"   : nextText
            // usr_id from https://forum.gamer.com.tw/Co.php?bsn=60076&sn=48167935
            ,"%usr_empty%"  : "usr_30ae0fcd-ed69-4f55-b4f3-34f5272f7344"
        }).out);
    
        /*
        //.after("<p>"   + prevText + "~public'>Public"   + nextText
        .after("<p>"   + prevText + "'>Public"          + nextText
            + "&nbsp;" + prevText + "~hidden'>Friends+" + nextText
            + "&nbsp;" + prevText + "~friends'>Friends" + nextText
            + "&nbsp;" + prevText + "~private~canRequestInvite()'>Invite+" + nextText
            + "&nbsp;" + prevText + "~private'>Invite"  + nextText
            + "</p>");
        */
            
    $("div.row > div:eq(0)").css("opacity","0.75");
    $("body").css("background-color","black");
    //$("div.bg").css("position","relative");
}

function FriendList(){
    //$("body").html("ccc");
    
}

// 取得網址標記
function getQueryString( paramName,paramURL){
	if(paramURL     == undefined) paramURL = window.location.href;
	
	paramName       = paramName.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]").toLowerCase();
	var reg         = "[\\?&]"+paramName +"=([^&#]*)";
	var regex       = new RegExp( reg );
	var regResults  = regex.exec( paramURL.toLowerCase());
	if( regResults  == null )
            return "";
	else    return regResults [1];
}

// 取得好友紀錄並列表展示
function FriendsHistoryListing(){
    //$.get()
    
}

// 確認資料是不是json  https://stackoverflow.com/a/25416299
function isJSON(MyTestStr){
    try {
        var MyJSON = JSON.stringify(MyTestStr);
        var json = JSON.parse(MyJSON);
        if(typeof(MyTestStr) == 'string')
            if(MyTestStr.length == 0)
                return false;
    }
    catch(e){ return false; }
    return true;
}

function RunOnce(element, className, callback){
    if(!$(element).length || $(element).hasClass(className) || $(element).hasClass("lone_ignore")) return;
        $(element).addClass(className);
    callback.apply(this, [element, className]);
}

// https://www.w3schools.com/js/js_random.asp
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function regexUnityID(typeID,text){
    if(typeID == null || typeID == "" ) return null;
    var regexUID = new RegExp("(" + typeID + "_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})");
    var result   = regexUID.exec(text,"gm");
    if(result) return result[1];
    return null;
}

//GetApiKey();
function GetApiKey(callback){
    var apiKey = Cookies.get('apiKey');
    if( apiKey && apiKey.length > 10 && callback) callback.apply(this, [apiKey]);
    
    $.get( "/api/1/config/" ).done(function( json ){ //console.error(json);
        console.error(json.apiKey);
    })
}

//TimeLocalizerUTC("2018-10-14T05:28:29.527Z"); // same as 2018-10-14T13:28:29.527Z
//TimeLocalizerUTC("2018-10-14T22:28:29.527Z"); // same as 2018-10-15T06:28:29.527Z
function TimeLocalizerUTC(DateTime){
    // https://stackoverflow.com/a/1091399
    // https://stackoverflow.com/a/32252686
    var current = new Date(DateTime);
    var utcDate = new Date(current.getTime() - current.getTimezoneOffset() * 60000);
    //alert(utcDate + "\n" + utcDate.toISOString());
    //alert(current + "\n" + current.toISOString());
    //console.error(DateTime + " to " + utcDate.toISOString())
    return utcDate.toISOString();
}

// https://stackoverflow.com/a/18786024
function GetWidthPercentage(e){ return $(e).width() / $(e).parent().width() * 100; }


/*
LoadFormatText("textfor%1 to %2 + ?=%3",{
	"%1":"ccc",
	"%2":"ccc2",
	"%3":"ccc3",
	"file":"local/readme.js"
},function(data){
	//console.error(JSON.stringify(data))
})

var sun = LoadFormatText("%posg + %1 + 5421",{
	"%1":"ccc",
	"%2":"ccc2",
	"%3":"ccc3",
	"%posg":"fuckyou"
})
console.error(JSON.stringify(sun.out))
*/
function LoadFormatText(Source,data,callback){
	if(data.file && !data.queried){
		LoadLocalTextFile2(data.file,function(fText){ 		//取得本地檔案內容
			data.queried = true								//設定已取得檔案內容
			LoadFormatText(fText,data,function(fTextNew){ 	//執行一次字串格式化
				callback.apply(this, [fTextNew]);			//異步回傳資料
			})
		})
	}
	else {
		data.src	= Source								//備份原始字串
		var object 	= Object.keys(data)						//取得每個元素標題
		for(var i = 0;i < object.length;i++){
			var RepTXT = data[object[i]]
			if(!data.ignoreSymbol && !object[i].match("%")) continue;   //跳過非替代內容
			else if(RepTXT == undefined) RepTXT = "undefined"
			else if(typeof(RepTXT) == "number" && isNaN(RepTXT)) RepTXT = "NaN"
            RepTXT = ("" + RepTXT).replace(new RegExp("%RepSrc%","gm"),object[i]);
			Source = Source.replace(new RegExp(object[i],"gm"),RepTXT);
			//console.error(object[i] + " : " + data[object[i]]);
		}
		//console.error(Source);
		data.out = Source;
		if(callback) callback.apply(this, [data]);
		return data;
	}
}

// https://stackoverflow.com/a/6116502
function GetTrusted(levels){
    var ret = [null,null];
    $.each(TrustedData, function(key, value) {
        if ( $.inArray(key, levels) > -1 ){
            ret = value;
            return false;
        }
    })
    return ret;
}

function GetRoomType(location){
    var ret = RoomType["~pub"];
    $.each(RoomType, function(key, value) {
        if(location.match(key)){
            ret = value;
            return false;
        }
    })
    return ret;
}

// https://stackoverflow.com/a/15734408
$.widget("ui.tooltip", $.ui.tooltip, {
    options: {
        content: function () {
            return $(this).prop('title');
        }
    }
});

// https://stackoverflow.com/a/29622653
function sortObject(o) {
    return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}

function GetTMRes(name, replace){
    return GM_getResourceURL(name)
            .replace("data:application;",replace || "data:application;");
}

function ColorChroma(unity_id){
    var code = /_([0-9a-f]){8}-([0-9a-f]){4}-([0-9a-f]){4}-([0-9a-f]){4}-([0-9a-f])([0-9a-f]){11}/g.exec(unity_id)
        code = code || ["","efe2dc"]
        code.shift();
        code = "#" + code.toString().replace(/,/gm,"");
    return chroma(code).brighten(1);
}

function ajaxFail( xhr, status, error ){
    console.error([xhr, status, error]);
    console.error(JSON.stringify(xhr.responseJSON, null, 4));
    alert(JSON.stringify(xhr.responseJSON.error, null, 4));
}

function InsertCustomCSS(){
    // https://www.cnblogs.com/pigtail/archive/2013/03/11/2953848.html
    document.head.insertAdjacentHTML('beforeend', `<style>
    /* https://stackoverflow.com/a/4407335 */
    .noselect {
      -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
         -khtml-user-select: none; /* Konqueror HTML */
           -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; /* Non-prefixed version, currently
                                      supported by Chrome and Opera */
    }
    
    .pointer {cursor: pointer;}
    
    div.WorldsWithFriends .friend-row li {
        list-style-type: none !important;
    }
    
    div.WorldsWithFriends .friend-row a {
        display: unset;
    }
    
    div.WorldsWithFriends h3 {
        text-transform: unset;
    }
    
    h2, h3 {
        text-transform: unset !important;
    }
    
    div.WorldsWithFriends div.template_world div.col-md-4 {
        flex: unset !important;
        max-width: unset !important;
    }
    
    div.WorldsWithFriends div.template_world div.friend-caption.text-success {
        /* margin-left: 125px !important; */
        min-width: max-content;padding:.5rem !important;
        font-size: 20px !important;
    }
    
    .Lone_wrld_badge {
        float       :right;
        color       :lightgreen;
        font-weight :bold;
    }
    
    a.Lone_room_people_counter {
        /* vertical-align:middle; */
        position:absolute;
        right   :170px;
        top     :126px;
    }
    
    a.Lone_room_private_counter {
        right   :268px;
        top     :198px;
    }
    
    a.Lone_room_createdBy {
        vertical-align:top;
        font-size: 15px;
        top: 44px;
        position: absolute;
        right: 208px;
    }
    
    a.Lone_room_createdBy_btn {
        vertical-align:top;
        font-size:10px;
        background:#1a2026 linear-gradient(180deg, #1a2026, #1a2026) repeat-x;
    }
    
    div.Lone_private_room a.Lone_room_createdBy, 
    div.Lone_private_room a.Lone_room_createdBy_btn,
    a.Lone_room_createdBy[CreatedBy='NoOwner'], 
    a.Lone_room_createdBy_btn[CreatedBy='NoOwner']
    {
        display:none;
    }
    
    /* https://www.w3schools.com/howto/howto_css_image_effects.asp */
    img.blur {
        -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
        filter: blur(5px);
    }
    
    img.Lone_wrld_img {
        width:150px;
        height:115px;
        opacity:0.3;
    }
    
    .Lone_world_room_people:hover {
        color:white !important;
        -webkit-filter: blur(1px); /* Safari 6.0 - 9.0 */
        filter: blur(1px);
    }
    
    /* https://stackoverflow.com/questions/12956586/width-of-jquery-ui-tooltip-widget */
    .ui-tooltip {
        max-width: 500px !important;
    }
    
    /* 左邊欄縮略 */
    /* https://stackoverflow.com/questions/7839164/is-there-a-css-cross-browser-value-for-width-moz-fit-content */
    div.container-fluid div.bg-gradient-secondary.leftbar:first-child {
        width: fit-content;      /* chrome  */
        width: -moz-fit-content; /* firefox */
    }
    
    /* 去除瀏覽器垂直捲動條 */
    /* https://www.reddit.com/r/FirefoxCSS/comments/8ka8jd/hide_scrollbar_firefox_60/ */
    browser {
        margin-bottom: -17px !important;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    </style>`);
}
//=================
// %appdata%/../locallow/VRChat

// https://stackoverflow.com/questions/3680429/click-through-a-div-to-underlying-elements

/*
            // https://stackoverflow.com/a/8054797
            // https://stackoverflow.com/a/1553727
            // http://api.jquery.com/category/events/event-object/
            $('*').click(function(event) {
                if (this === event.currentTarget) { // only fire this handler on the original element
                    event.stopImmediatePropagation();
                    console.error($(event.target).attr("href"));
                }
            });
            */
            
// https://gist.github.com/roselan/3176700
(function( $ ){
  $.fn.observe = function( callback, options ) {  

    var settings = $.extend( {
            attributes   : true, 
            childList    : true, 
            characterData: true
        }, 
        options );

    return this.each(function() {        
        var self = this,
            observer,
            MutationObserver = window.MutationObserver       || 
                               window.WebKitMutationObserver || 
                               window.MozMutationObserver; 
        
        if (MutationObserver && callback) {
            observer = new MutationObserver(function(mutations) { 
                callback.call(self, mutations);
            });              
            observer.observe(this, settings);
        }         
    });
  };
})( jQuery );

// ES
// https://juejin.im/post/5b2a186cf265da596d04a648
// https://medium.com/@peterchang_82818/es6-10-features-javascript-developer-must-know-98b9782bef44
// https://zi.media/@yidianzixun/post/pW8JXi
// https://blog.camel2243.com/2016/06/18/javascript-sleep%E5%87%BD%E6%95%B8%E5%AF%A6%E4%BD%9C/
// http://es6.ruanyifeng.com/#docs/async

// Day 05: ES6篇 - let與const
// https://ithelp.ithome.com.tw/articles/10185142
// http://es6.ruanyifeng.com/#docs/let