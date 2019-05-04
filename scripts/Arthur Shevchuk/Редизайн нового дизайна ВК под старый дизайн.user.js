// ==UserScript==
// @name        Редизайн нового дизайна ВК под старый дизайн
// @author      artouiros
// @namespace   https://github.com/artouiros/vkRedesign
// @description Редизайн нового дизайна Вконтакте. Данный скрипт поможет вернуть старый "дух" в ВК и сделать интерфейс более привычным и удобным.
// @include     https://vk.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     3
// @grant       GM_addStyle
// @run-at   document-start
// @license  WTFPL – Do What the Fuck You Want to Public License

// ==/UserScript==

/* Метод решения проблемы  с fixed нав баром, реализованый ниже  - это самое ужасное, что можно было придумать. Но мне надо было убрать этот ненавистный nav bar. Вначале хотел просто сделать его релативный, но тогда это выливалось в проблему на странцие сообщений. */

GM_addStyle(".navHidden{visibility:hidden; position:fixed;}");

$(window).scroll(function() {
    if (window.location.pathname != "/im") {
        if ($(window).scrollTop() > 42) {
            hide(document.querySelector('#page_header_cont'));
        } else {
            show(document.querySelector('#page_header_cont'));
        }
    }
});

/* Общие css изменения для ВК */

GM_addStyle("#page_header_cont{width:991px!important; left:initial !important;} #page_header_wrap{width:990px!important;} body{background:#fff !important; font-size:11px !important;} #page_body{font-size:11px !important;} .module_header .header_top{font-size:11px !important;} .module_body{font-size:11px !important; padding:0 !important;} .narrow_column{position:relative !important; width:200px !important;} .narrow_column_wrap{width:200px !important;} .side_bar_inner{position:relative !important;} .profile_gifts_cont{height:64px !important;} .profile_gifts_cont .profile_gift_img{width:54px !important; height:54px !important;} .people_module .module_body{padding:0 !important;} .narrow_column .people_module .people_row{width:200px !important} .module_body .people_cell{width:66.6px !important; height:auto !important;} .module_body .people_cell_ava{width:50px !important; height:50px !important;} .page_photo{padding:0 !important;} .profile_rate_warning{box-shadow:0 1px 0 0 #d7d8db, 0 0 0 1px #e3e4e8 !important;} .module_header{background:#DEE5EB !important; margin-bottom:5px !important;} .module_header .header_top{height:25px !important; line-height:25px !important; color:#45688E !important; font-weight:bold !important;} .header_right_link{height:25px !important; line-height:25px !important; font-size:12px !important; font-weight:bold !important;} .wide_column .header_right_link{padding:0 !important} .wide_column .module_header .header_top{padding:0 15px !important;} .submit_post_box{background:#F1F1F1 !important;} #post_field{background:#F1F1F1 !important;} .page_block{box-shadow:none !important;} .counts_module{background:#e7e8ec !important;} .page_counter:hover{background:#f7f7f7 !important;} .profile_info_header{ color:#45688E !important; font-weight:bold !important; font-size:12px !important;} .profile_info .label{color:#777 !important;} h4.profile_online{color:#AAB7C5 !important; font-weight:bold !important;} .wall_module .post{border-bottom:1px solid #DAE1E8 !important} .wall_module .reply_img{border-radius:0px !important;} h5.post_author{font-size:11px !important;} .wall_module div.page_media_link_desc_wrap{line-height:15px !important; font-size:11px !important;} .wall_module div.page_media_link_title{color:#446790 !important; font-size:15px !important;} .module_body .people_cell_img{border-radius:0 !important;} .module_body .people_cell_ava{margin:0 7px !important;} .page_list_module .thumb{border-radius:0px !important;} .page_list_module .cell_img{border-radius:0px !important;} .page_list_module .line_cell{line-height:inherit !important;} .page_photos_module{padding:0 !important; height:auto !important;} .page_square_photo{height:90px !important; width:130px !important;} .audio_play{width:16px !important; height:16px !important; border-radius:0px !important; background:#577ca1 url(/images/icons/audio_playpause.png) no-repeat 4px 3px !important;} .audio_play.playing, .audio_row_playing .audio_play{background-position:4px -19px !important;} .audio_row .audio_info{font-size:11.5px !important; line-height:11.5px !important; padding-top:3px !important;} .audio_row .audio_title_wrap:hover{white-space:normal !important;} .module{border:0 !important; padding-top:5px !important;} .page_list_module .line_cell{margin-left:7px !important;} .page_list_module .line_cell .desc_info, .page_list_module .line_cell .extra_info, .page_list_module .line_cell .info{width:140px !important;} #side_bar .left_label{font-size:11px !important;} .wide_column_right .wide_column_wrap{margin-left:215px !important;} .feed_new_posts{background:#EEF2F6 !important; border-bottom:none !important;} .like_tt_header, .poll_tt_header{font-size:11px !important;} .im-page.im-page_classic .im-page--top-date-bar-wrap{width:825px !important;} .im-page .im-page--top-date-bar-inner{transform:translateY(0px) !important;} .ui_scroll_overflow{width:308px !important;} .ui_scroll_container{width:308px !important;} .page_actions_wrap{font-size:11px !important;} .button_blue button, .button_gray button, .button_light_gray button, .flat_button{font-size:11px !important;} .top_home_link .top_home_logo{background:url('data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAJEAAAAqCAYAAACz1bmVAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AgTEy4Nw5pqKgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAH8klEQVR42u2cfVST1x3Hv0RijBQWGMG4B4MhsRMJ0gDaIEGsSh3QpiKtzpathxbc3MuxR3vO/ph129HunLaTvhxO17X2uKG1G3PDgyLzhYEjAmopqAGlQEF2csyaNubwYohg2B+Ry/PwAPIkQdm4n3NyTp63m9+993t/v9+994GAjTv/MAwKxQdEtAkoVEQUKiIKFRGFQkVEoSKiUBFRqIgoFACB3j6YqlPhSf0yaDWMV8+b2y0oN5lRf/UG7YXZKKKCbD0yDct9+mGthoFWw6CsuhEHj1+iPTGbwpk+LspnAbExrtEhMYahPTGbRJRl0PrdiI1rHqM9MZvC2WQ50LnPrnOO5wQGYr5EjPDQYCgVYRM+p2LCaU/MxsR6LDZ7L9759F+T3rN3e9a4IgySSvxeMYVMCmahR7i2W/3otjoeWiMrFTIES8UIEM2Bc2AAHRbHQ+30WJUcwUHz0Ns/gOZO28wR0VR47fflKN2/bcr3f/jLrZCHBQMA/na2AYcrGgAA4kARXv3hOsRpIiGViLHvQDkarlkAAIkxDPKMKWAiZDyRHzpZj5rGTnLu2fWP4YWMlQCAfqcLubv/RK7lZiQiZ30ieXbb65/itfwNSIiJuq/dI7YW/WIzz44Rai934J0jVRgccpM6lbyRT66z66RRhuPFrMfJANx3oBy787Puawe7TiNttjJWNaG9M05Eh/e9iCCpBGfqmvH+0fPkfLfVPmlomwp7CjLG9WipOhV25qaP+4w8LBg7c9MRGlKHsnNXAQB3h4YE/e6Q2y3o/okEBACr4tWIXBCKHW8dvf/gezkDIY9IffLKv92Rg9CQ+QAAp2sQA65BcpyzPhHSeWJ8VFo/Mz1RUqwKYIno298K8qk8fVwUT0CuO3cBAD/KWU3OfXHDireLz3iWJJ5dTTxInjEZFeebiQcQQllVE+oa2zx5XKQcxjU6cu3jYyb09d0GAPz7K0+4+tJiQ9WlVnx2tRNWhxNqRoaMFC3WPb7sXpgLg1atgLnDOuFv5mYkcgTU73TBctOOdw+fJueez0wmHtvcbkFlfbNnkNwT/U+3riWCqbzQgqISE9xuN9YmRmNH7pMAgEzDcvzx+EWv2mXaRFTb1A6RKABVl1rJuS0bEnzOf55LTyDfT5qukNGTqlNxyn67+AysDqcnFztwihNGM1JiiTci01SRCBrlaIIvC+aPfE/+4Mkhvu4Z4IjoRE0L7/5dhaWc4w6LAxXnzUREABAaMrGHEQeK8L2U0dlwYfE/UHO5GwBgbewi559+Qgc5gu95+m9QzbqmkEk5g66oxETqW93YhfwcF2k3fVwUJ9w/dBGxQ9hIcrkyNsrr8nQxSuhilIhm5MQls91v1JgQOSKgESxfOUh4if5OKK98qUSMt3ZsmrI9krlzeB0+dhSLA0XYkq7j2D1VMlO0yM9OJR38pcVGBCSEJSoFL82YaFIT7mWUmDYRaZThuHNniMyKuq0O7Cosxc82GzgjcaqM7YSLVzu4IpgnJt9v9dzmPe8aHBy9dxpmg+PNyPZuf5qXy9jsvST0TMbYBP50bYtXdsyXzJ32mfC0iejX27KIwR8fMxF3X1Ri8kpE3VY7hu7eJWJKS1qK8rpWtHX9x+OZBgZZIWI+33OIR0XW2+fkXXe6BvH6RyfIcbo+BmlJS72u/wuZK4iAbvXcxv7iU2Q6PZUZqrndggVhIURwWzaswKn6VsF23Hbd4Rxv33uI56V95YHs4uu+u8jnMi6ZO7GrsBRO16hYfrxpFfl+w2rnLoqqFZywwp4pdd2088p3u91o7rSRz9eOfp/sZeSjIbPuSrvg9Zi/nG7Au0fOcgZGQbZesB1tndykPX6pctz71IwMCpl0Zoqo22rH3ys/57h5XzhScYET4p5K9Xi1msZO9LA8TN4zydCqFdCqFdhTkMEpY7wk2N+ww2f8o0osWbwAakY2ZSFI5s5Bc6cNtZdHw3amYTliVcJyK6vDCXO7ZXTgPZeGgmw9kmKjoFUrkKpTYdcP1uJ3OzcjkomYWeGMvXDHxrjat723EzUtSNcvI2tN39+wAqfqrmNwyI33/vxPsggXzcix9ydG3vMf/PXcA1lYNX3eRkIvEyHDmz9/xqty9h+qxKp4NTl+KdvAm/Xdj199UI4De3JJmM80LB93E33YPTQzPRGbV7au9iofGsuHR89xEsVXnn8CANBwzYLdRaXotvLDlc3eizcOVniVV3hDabUZlRdaeF751cISQeW4h4Hi47Uc72tMixNcxku/OYyTpivod7rGzQdNTe240nbTq7oGCP0L2MmSQrbbZBPyiHTSVeqxWw5+SfYCgJjFHk/wza0+vyeTQohVyR+6DWwUMimCgiSYN1fsF7sEhzNzu2XCnXxv33Js7bL6vaHcw/DL5qI/mCl2cNbQ/ChoweHsWHWT3yvFTrwp/3sIFlHDNQs+qbjoNwM+qbg440Yq5QHMzo6ebcK1Dgs2rUuAZlGE4B3mnj4nrt+woqyqiQro/4AA+q9lKA88nFEoPBGJA6mOKD6KaHGknLYCxWs0ynCI4jULaUtQvCYuWgHRmsRHaUtQvMaQsAQiJkImeC+GQgGAp1KXIZqRe2ZnecZkJPnw6ipl9hG/dBFe3mgAAAQMDw+TdaKDZXW8F9gplLEY0+KQZ0wmxxwRAZ4X2qsbvsDl9pvk1VPK7EYcKMLiSDniNQuRqtPw3sjgiYhCEcp/AfugwlytNqYMAAAAAElFTkSuQmCC') !important; background-repeat:no-repeat !important; height:42px !important; width:134px !important; background-position-x:-6px !important; background-position-y:2px !important; margin:0 !important;} .wide_column_right .wide_column{float:left !important;} .wide_column{width:610px !important; box-shadow: rgb(215, 216, 219) 0px 1px 0px 0px, rgb(227, 228, 232) 0px 0px 0px 1px !important;} .page_post_sized_thumbs{width: 580px !important; height:auto !important;}  #public{width: 824px !important;} .audio_layout{width:825px !important;} #group{width:825px !important;} " );

/* Для страницы сообщений */

GM_addStyle(".im-page.im-page_classic .im-page--dialogs{margin-top:84px !important; margin-left:0 !important;} .im-right-menu.ui_rmenu{background: #edeef0 !important; top:84px !important; width:825px !important; margin-left:0 !important; z-index:3 !important;} //*#ui_rmenu_all{display:table-cell !important;}**/ #ui_rmenu_unread{display:table-cell !important;} #ui_rmenu_fav{display:table-cell;} .ui_rmenu_item, .ui_rmenu_subitem{display:table-cell !important;} .im-page.im-page_classic{width:825px !important;} .im-page.im-page_classic .im-page--header{width:825px !important;} .nim-dialog .nim-dialog--name .nim-dialog--name-w{color:#2B587A !important;} .nim-dialog.nim-dialog_classic .nim-dialog--name, .nim-dialog.nim-dialog_classic .nim-dialog--preview, .nim-dialog.nim-dialog_classic .nim-dialog--text-preview{font-size:11.5px !important;} .im-create.im-create_classic{width:825px !important; z-index:4 !important;} .im-create .im-create--dcontent{width:825px !important;} .im-page.im-page_classic .im-page--header-chat{width:827px !important; z-index:4 !important;} .im-page.im-page_classic .im-page--chat-input{width:825px !important;} .im-chat-input.im-chat-input_classic .im-chat-input--textarea{width:652px !important;} ._im_peer_tab{font-weight:bold !important;} .im-page.im-page_classic .im-mess-stack{max-width:825px !important;} .im-page .im-page--top-date-bar-wrap{top:5px !important;} .im-page-wrapper, .im-page{width:825px !important; box-shadow:rgb(215, 216, 219) 0px 1px 0px 0px, rgb(227, 228, 232) 0px 0px 0px 1px !important;} .im-page.im-page_classic .im-mess:not(.im-mess_fwd){max-width:825px !important;} ._im_ui_peers_list{border-spacing: 10px 0 !important;} ._im_peer_tab{background:#6285af !important; color:#fff !important; padding: 0 5px !important; border-radius:5% !important;}");

/* Для остальных страниц. */

GM_addStyle("#apps_wrap{width: 825px !important;} #apps_featured_slider{width:825px !important;} .apps_cat_wrap{text-align:center !important;} .apps_cat_row{margin-left:auto !important; margin-right:auto !important; display:inline-block !important; padding:10px !important; float: initial !important;} .audio_rows_header {top:0 !important; position:relative !important;} .audio_friend_name, .audio_friend_name_now{padding:10px 0 3px 10px !important;} .audio_friend{padding:5px 0px !important; font-size:11.5px !important; } .ow_ava.ow_ava_small{border-radius:0px !important;} .verticalMenu{display:block !important;} ._825widthFix{width:825px !important;} #photos_albums_block{width:825px !important;} #photos_albums_block .photos_albums{text-align:center !important;} #photos_all_block{width:825px !important;} #photos_all_block .photos_container_pretty_grid{text-align:center !important;} .photos_period_delimiter_fixed{position:relative !important;} .friends_lists .friends_lists_group{font-size:11px !important;} .friends_field_title{font-size:12px !important;} .ui_search_fltr_control{font-size:11px !important;} .ui_tabs_header, .ui_tabs_sub_header{font-size:12px !important;} .ui_tabs_box .ui_tab, .ui_tabs_box .ui_tab_sel, .ui_tabs_header .ui_tab, .ui_tabs_header .ui_tab_plain, .ui_tabs_header .ui_tab_sel, .ui_tabs_sub_header .ui_tab, .ui_tabs_sub_header .ui_tab_plain, .ui_tabs_sub_header .ui_tab_sel{line-height:14px !important; height:14px !important;} .ui_search_fltr{font-size:11px !important;} .page_block_header{font-size: 14px !important;} .page_block_header .header_side_link, .page_block_sub_header .header_side_link, .ui_tabs_header .header_side_link, .ui_tabs_sub_header .header_side_link{font-size:12px !important;} .adsPageFixHeader{width: 1220px !important;} #rmTopMesBar{top:42px !important;} .ui_filters_block{padding:0 !important;} #addTopMesBar{top:84px !important;}");

/* Проверка на смены Url. Проблема с кнопкой назад/вперёд решена, пока, что костыль в 500 миллисекунд. Проблема заключается в том, что url меняется ДО загрузки страницы, как итог стили присваиваются совсем другой странице.
Как костыль, убрал проверку пр hashchanged и просто каждые 20мс вызываю функцию changeCssRules Overkill, но если даль интервал больше - видно, как меняются стили. Видел, как люди делают и 1мс - значит можно. Правда о их адекватности тоже сложно судить.*/

setInterval(changeCssRules,20);

/*
var fireOnHashChangesToo = true;
var pageURLCheckTimer = setInterval(
    function() {
        if (this.lastPathStr !== location.pathname ||
            this.lastQueryStr !== location.search ||
            (fireOnHashChangesToo && this.lastHashStr !== location.hash)
        ) {
            this.lastPathStr = location.pathname;
            this.lastQueryStr = location.search;
            this.lastHashStr = location.hash;
            changeCssRules(location.pathname);
        }
    }, 111
);
*/

/* При различных Url добавляем или удаляем класс. Можно было сделать по-нормальному, без этого скрипта, но было как-то лениво.  Существует правда одна проблема - так и не смог понять почему при перехода на страницу путём кнпоки назад/вперёд класс не добавляется. OnHashChanges работает, проблема именно в скрипте ниже. */

function changeCssRules() {
var href = window.location.href; 
var a = location.pathname;
    if (a.startsWith('/audios')) {
        a = "/audios"
    }
    switch (a) {
        case "/audios":
            $(".ui_rmenu_item, .ui_rmenu_subitem").addClass("verticalMenu");
            break;       
        case "/docs":
            $(".ui_rmenu_item, .ui_rmenu_subitem").addClass("verticalMenu");
            $(".wide_column_left").addClass("_825widthFix");
            break;        
         case "notifier.php":          
            break;
        case "/feed":
            $(".ui_rmenu_item, .ui_rmenu_subitem").addClass("verticalMenu");
            $(".wide_column_left").addClass("_825widthFix");
            break;
        case "/groups":
            $(".ui_rmenu_item, .ui_rmenu_subitem").addClass("verticalMenu");
            $(".wide_column_left").addClass("_825widthFix");
            break;
        case "/friends":
            $(".ui_rmenu_item, .ui_rmenu_subitem").addClass("verticalMenu");
            $(".wide_column_left").addClass("_825widthFix");
            break;
        case "/ads":
            $(".ui_rmenu_item, .ui_rmenu_subitem").addClass("verticalMenu");
            $("#page_header_cont .back").addClass("adsPageFixHeader");
            break;
         case "/im":         
          if(href.search("sel=") > 0){
             $(".im-right-menu.ui_rmenu").attr("id","rmTopMesBar");
			 }else{
              $(".im-right-menu.ui_rmenu").attr("id","addTopMesBar");
             }
            break;
        case "/search":
            $(".ui_rmenu_item, .ui_rmenu_subitem").addClass("verticalMenu");
            $(".wide_column_left").addClass("_825widthFix");
            break;
        case "/edit":
            $(".ui_rmenu_item, .ui_rmenu_subitem").addClass("verticalMenu");
            $(".wide_column_left").addClass("_825widthFix");
            break;
        case "/settings":
            $(".ui_rmenu_item, .ui_rmenu_subitem").addClass("verticalMenu");
            $(".wide_column_left").addClass("_825widthFix");
            break;
        default:
            $(".ui_rmenu_item, .ui_rmenu_subitem").removeClass("verticalMenu");
            $(".wide_column_left").removeClass("_825widthFix");
            $("#page_header_cont .back").removeClass("adsPageFixHeader");
      

    }
    
}