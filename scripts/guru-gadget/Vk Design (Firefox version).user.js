// ==UserScript==
// @name        Vk Design (Firefox version)
// @namespace   vk.com
// @include     https://vk.com/*
// @version     0.7.1
// @description возвращает старый дизайн вконтакте
// @grant       none
// ==/UserScript==


function addGlobalStyle(css) {
		try {
			var elmHead, elmStyle;
			elmHead = document.getElementsByTagName('head')[0];
			elmStyle = document.createElement('style');
			elmStyle.type = 'text/css';
			elmHead.appendChild(elmStyle);
			elmStyle.innerHTML = css;
		} catch (e) {
			if (!document.styleSheets.length) {
				document.createStyleSheet();
			}
			document.styleSheets[0].cssText += css;
		}
	}

var css = "  \
  body {background: #FFF; font-family: tahoma, arial, verdana, sans-serif;} \
  #page_body {font-size: 11px;} \
 \
 \
/************ Width ************/ \
  #page_layout {} \
  #page_body {border-left: 1px solid #D9E0E7;border-right: 1px solid #D9E0E7; box-sizing: border-box; \
  margin: 35px 15px 0 0;} \
  div#content { padding: 0 10px;} \
/************ HEADER ***********/ \
  #page_header_cont {height: 40px; left: auto; position: absolute;} \
  #page_header_cont .back {height: 40px; border: none; border-radius: 0 0 10px 10px;} \
  #page_header_wrap {height: 40px;} \
  #page_header {height: 40px; padding: 0;} \
  #page_header input.text.ts_input {width: 200px; background-color: #FFf;} \
  .top_home_link {padding-left: 15px; height: 40px; width: 142px;} \
  #top_nav>div {height: 40px;} \
  .top_nav_link:hover, .top_nav_link.active {border-bottom-right-radius: 10px; height: 40px;} \
  .top_nav_link {line-height: 40px;} \
  #page_header input.text.ts_input {border-radius: 0;} \
  .top_profile_img {display: none;} \
  .top_profile_name {padding: 0;} \
  .top_nav_btn {height: 40px;} \
  .ts_cont_wrap {left: 155px; width: 201px;} \
  a.ts_contact {padding: 8px;} \
  .ts_contact_name {width: 141px;} \
  #top_nav > div .fl_l {padding: 0;} \
/*** LOGO ***/ \
  #page_header_cont .top_home_link {padding: 0 0;} \
  #page_header_cont .top_home_link .top_home_logo { \
    background: url('data:image/gif;base64,R0lGODlhkQAqANUoAEdmipyvw/T2+Fd5nWSAn+fs8dng51Byls3W4HWSsFh6n7XD0U9wlFp8oFR2mm6KqYietrzI1ae5y01ukv///3+atnSQrcXQ3JCjuaGyxeHn7e7x9WqEo9Pb5GB7mo2ht8DL15eqwEpqjvb4+nuTruTp76S2yYSduHONqZ6xxnyVsWB/oLG/zvHz9mWDo8PP28nU3rrG1I2juoifuOrt8oObtN3k6qy7zAAAAAAAAAAAAAAAAAAAAAAAAAAAAMNIECwAAAAAkQAqAAAG/sCJcEgsGo/IpHLJbDqf0Kh0Sq1ar9isdsvter/gsHhMLpvP6HSSwW673/C4fE6v2+/4vH7P7/v/gIGCg4SFhod4Mh0UjI2Ojh0ziJOUlQuPmJkslZyddAegoaKgM5mmjzWjqqusra6vsLGys7GLp7cdtLq7vL2+sJkgwiAvCBqZAr/Ky8zNoZg0ItLTAB62jr0cNTUPzqEKDyQqKAreoAokECTlztCrDAeYozSMN6AuMCMUqQc1JY40ZIQywSgZqBuMaBxAcMrev0cXXNxrxM+CrRqnDOJ7dMNBM3egBFCIEeoYNlH0KNhzcC2VDFMpQGUoGAohBYUwGsbLpMGj/guKB1a0oJjxAIcNjEYgZbRAloOnUKM+hQZV5Iaqj6Sm7FiqkQoFIikY4MCBISMXDmZSEADVJg0HJDBgYNEogFwUDmwE4OABRQSvDn4yquHA5loOcjGk7CD3A0tGEUQAwNAIrdTLmC9TfRojAomnEjBprZeXqQgGLxlxgKegUYq0SS3I/nvTAQMhKhqtEMLAgYgJrFE0khGYoouwHwAcGGKD6RAOjRQ8nRCWeObrmDc7EHLAwYPmWaOmtAF+RPfCjc47eAgCtqm3UDGejeriBnhHxAVTQFCAkY0JUoG3AFSprSXAgY1kgN2CUWlnwQMreCQCbY2M9kh7T11CwVVQ/oEHg3uZwPeUfBRY5t1QjaREQX6ZhHCZgFCFcIuCDDKoXVgBPNWaIxZqcF8CTxkW1UMRuDcCCUiCkFBUJJqY04YkTCDCcMUx0kFKGzQQIFMENsKXB2CCKV2NC97ICAJQhQfVVgroQ4ENAzhQoApP6ZejWgYd4BaTlUH1UFNTMcIiIyqQ0MiAUcH4FHSMuBgVChyQWeYjIoqkwWfeqfnUVg4EUJcDCqBogwoqXCMdnm0tGV+fT4FXQgIoaLhilfsccEEjmLbKJVTXLHCCCjK8QMEJkmKn3TTnUciIhR0dYJIAaJH4iKOoBqnqiKyCiMmg+zhAQCNwdrjrUwQshQlh/sVmph19SmrqAKdwNXKBRySYlBAEvbnHlrW1rTrfUwdQqIFwgtKKrloUvKYrBYhCdcACYSX1gonYDWDxxRhbnEkHHHdsryMCZDwNAxb7Js0EJU9AAJIciHDAxQdMczEDMl9ssggOYDyBByRwACCycU6T8wAxS/OyxVL+lvF2InCAQs9CDJ3x1FRnfM0tmSBQ9dY2Q8X111t7DfbYVUdFNtnSYv0ICWe37fbbcMf9tgMEqf2ICVLLrffefPc99QEkIIDiLS3AQMLRfieu+OJkMz3N45D/ljfjlFfetgKYZ6755px37vnnoIcu+uikl2765y6crvrqrLfu+uuZN5AAaey012777aNbYALuvPfue+sZlNDA78QXb7zmzaXQwPLMN+/889BHL/301Fdv/fXYZ++8p4ycoP334Icv/vjjV/CI8uSnr/767FOfQiYlmJBA+/TXb3/1LiRgwsd29+///wAMoAAHaLcgAAA7'); \
    width: 134px; height: 40px; margin: 0;} \
  #page_header{margin: 0; padding:0;} \
  /*** SIDEBAR ***/ \
  #side_bar .more_div {margin: 3px 0 0; padding-top: 3px; border-top: 1px solid #E7EAED; width: 136px;} \
  #side_bar_inner {position:absolute !important} \
  #side_bar .left_fixer {padding-left: 6px;} \
  #side_bar .left_label.inl_bl {padding: 4px 0; height: 18px;} \
  #side_bar .left_label {font-size: 11px; line-height: inherit;} \
  #side_bar .left_icon, #side_bar .more_div, .left_menu_nav_wrap, \
  #side_bar .left_settings, #side_bar .ads_left  {display: none;} \
  #side_bar_inner ol {display:flex;flex-wrap:wrap} \
  #side_bar_inner ol li {order:100} \
  #side_bar_inner ol #l_pr {order:1} \
  #side_bar_inner ol #l_fr {order:2} \
  #side_bar_inner ol #l_ph {order:3} \
  #side_bar_inner ol #l_vid {order:4} \
  #side_bar_inner ol #l_aud {order:5} \
  #side_bar_inner ol #l_msg {order:6} \
  #side_bar_inner ol #l_gr {order:7} \
  #side_bar_inner ol #l_nwsf {order:8} \
  #side_bar_inner ol #l_ntf{order:9} \
  #side_bar_inner ol #l_fav {order:10} \
  #side_bar_inner ol #l_set {order:11} \
  #side_bar_inner ol .more_div.l_main {order:12} \
  #side_bar_inner ol #l_ap {order:13} \
  #side_bar_inner ol #l_doc {order:14} \
  #side_bar_inner ol #l_ads {order:15} \
  #side_bar_inner ol #l_apm {order:16} \
  #side_bar_inner ol .more_div {order:17} \
  #side_bar_inner ol .l_comm {order:18} \
  #l_nwsf span.left_label:before{content:\"Мои \" !important} \
  #l_msg span.left_label:before{content:\"Мои \" !important} \
  #l_fr span.left_label:before{content:\"Мои \" !important} \
  #l_gr span.left_label:before{content:\"Мои \" !important} \
  #l_ph span.left_label:before{content:\"Мои \" !important} \
  #l_aud span.left_label:before{content:\"Мои \" !important} \
  #l_vid span.left_label:before{content:\"Мои \" !important} \
  #l_ap span.left_label:before{content:\"Мои \" !important} \
  #l_fav span.left_label:before{content:\"Мои \" !important} \
  #l_doc span.left_label:before{content:\"Мои \" !important} \
  #side_bar ol li {width: 136px; padding:3px;margin:1px} \
  #side_bar .left_count_wrap {font-size:10px; padding:3px; margin:1px; height:auto;line-height:inherit;} \
  #side_bar .left_count:before{content:\"+ \" !important} \
  #side_bar .inl_bl{line-height:130%} \
/*** TOP MENU ***/ \
  #top_profile_menu .top_profile_mrow {} \
/*** ADBLOCKS ***/ \
  #left_ads, #ads_left, #group_recom_wrap, .ads_ads_news_wrap {display: none !important;} \
  #side_bar #left_ads *, #side_bar #ads_left * {display:none !important; \
  overflow: hidden !important; width: 0px !important;  height:   0px !important;} \
  #ads_left, #left_ads { overflow: hidden !important; width: 0px !important; \
  height: 0px !important;} \
/****** PROFILE *****/ \
  /***** LEFT COLUMN *****/ /*** OK ***/ \
  /*WIDTH*/ \
  #profile .wide_column_right .narrow_column_wrap {width: 200px;} \
  #profile #narrow_column {width: 200px;} \
  #profile .wide_column_wrap {margin-left: 220px} \
  /*AVA*/ \
  .page_photo {padding: 0;} \
  /*FRIENDS*/ \
  #profile_friends .module_header {background-color: #DEE5EB; height: 20px;} \
  #profile_friends .module_header .header_top {padding: 0px 10px;} \
  #profile_friends .module_header h3 {height: 20px; line-height: 16px; color: #45688E; font-weight: bold; font-size: 11px;} \
  #profile_friends .header_right_link {height: 20px; line-height: 18px; color: #99ADC2;} \
  #profile_friends .module_body {padding: 5px 0 5px 0;} \
  #profile_friends .module_body .people_row {width: 200px;} \
  #profile_friends .module_body .people_row .people_cell {width: 66px; padding: 5px 0;} \
  #profile_friends .module_body .people_cell_img {border-radius: 0px;} \
  #profile_friends .module_body .people_cell_ava {padding-bottom: 5px; margin: 0 9px;} \
  /*FRIENDS ONLINE*/ \
  #profile_friends_online .module_header {background-color: #DEE5EB; height: 20px;} \
  #profile_friends_online .module_header .header_top {padding: 0px 10px;} \
  #profile_friends_online .module_header h3 {height: 20px; line-height: 16px; color: #45688E; font-weight: bold; font-size: 11px;} \
  #profile_friends_online .header_right_link {height: 20px; line-height: 18px; color: #99ADC2;} \
  #profile_friends_online .module_body {padding: 5px 0 5px 0;} \
  #profile_friends_online .module_body .people_row {width: 200px;} \
  #profile_friends_online .module_body .people_row .people_cell {width: 66px; padding: 5px 0;} \
  #profile_friends_online .module_body .people_cell_img {border-radius: 0px;} \
  #profile_friends_online .module_body .people_cell_ava {padding-bottom: 5px; margin: 0 9px;} \
/* IDOLS */ \
  #profile_idols .module_header {height: 21px; background: #DEE5EB;} \
  #profile_idols .module_header .header_top {color: #45688E; height: 21px; line-height: 20px; padding: 0 0 0 8px; font-weight: bold; font-size: 11px;} \
  #profile_idols .module_header .header_count {padding: 0 0 0 5px; line-height: 20px;} \
  #profile_idols .module_body {padding: 8px; font-size: 11px;} \
  #profile_idols .module_body .group_desc {font-size: 0.9em;} \
  #profile_idols .module_body .thumb {border-radius: 0px;height: 32px; width: 32px; margin-right: 8px;} \
  #profile_idols .module_body .desc_info {width: 144px; padding: 0;} \
  #profile_idols .module_body .cell_img {height: 32px; width: 32px; border-radius: 0;} \
  /* PHOTO */ \
  #public_albums .module_header {height: 20px;  background: #DEE5EB;} \
  #public_albums .module_header .header_top {color: #45688E; height: 20px; line-height: 18px; \
 padding: 0 0 0 8px;  font-weight: bold; font-size: 11px;} \
  #public_albums .module_body {padding: 0 0 10px 0;}  \
  #public_albums .album_module .page_album_row {border-radius: 0;} \
  #pv_photo {width: 100% !important;} \
  .pv_cont .pv_narrow_column_wrap { width: 100%;} \
  #layer, .pv_light #layer {margin-top: 0px !important;margin-bottom: 20px !important;} \
  #pv_narrow { max-height: 450px;  height: 100% !important; width: 100% !important;} \
  .pv_no_commments_placeholder_wrap { margin-top: 20px !important;} \
  .pv_cont .pv_reply_form_wrap {width: 100%; } \
  .search_item_img {border-radius: 0;} \
  /* VIDEO */ \
  #profile_videos .module_header {height: 20px;  background: #DEE5EB;} \
  #profile_videos .module_header .header_top {color: #45688E; height: 20px; line-height: 18px; padding: 0 0 0 8px; font-weight: bold; font-size: 11px;} \
  #profile_videos .module_body {padding: 0 0 10px 0;} \
  #profile_videos .module_body .video_row .video {border-radius: 0;} \
  /* GIFTS */ \
  #profile_gifts .module_header {height: 20px;  background: #DEE5EB;} \
  #profile_gifts .module_header .header_top {color: #45688E; height: 20px; line-height: 18px; padding: 0 0 0 8px; font-weight: bold; font-size: 11px;} \
  #profile_gifts .header_right_link {display: none;} \
  #profile_gifts .module_body {padding: 10px 0 0;} \
  /* AUDIO */ \
  #profile_audios .module_header {height: 20px;  background: #DEE5EB;} \
  #profile_audios .module_header .header_top {color: #45688E; height: 20px; line-height: 18px; padding: 0 0 0 8px; font-weight: bold; font-size: 11px;} \
  #profile_audios .module_body {padding: 5px 0 10px;} \
  #profile_audios .audio_play {border-radius: 5px;} \
  .post_info .page_post_sized_thumbs.clear_fix, .page_gif_large { \
    -webkit-transform: scale(0.751); \
    -moz-transform: scale(0.751); \
    margin-left: -60px; \
} \
/***** R. COLUMN *****/ \
  #content .wide_column_left .wide_column_wrap {width: 100% !important; margin-left: 0px !important;} \
  #content .wide_column_left .narrow_column_wrap {display: none;} \
  #content #public .wide_column_left .wide_column_wrap {width: 65% !important;} \
  #content #public .wide_column_left .narrow_column_wrap {display: block;} \
  /*** INFO ***/ \
  #wide_column #page_info_wrap {padding: 0 0 5px; font-size: 11px;} \
  #wide_column #page_info_wrap .page_name {color: #45688E; font-weight: bold; font-size: 13px;} \
  #wide_column #page_info_wrap .page_top {padding: 0px 0 5px 5px;} \
  #wide_column #page_info_wrap .profile_info_short {padding-top: 5px;} \
  #wide_column #page_info_wrap .profile_info_short .profile_info_row {padding-top: 2px;} \
  #wide_column #page_info_wrap #profile_short .profile_info_row {padding-left: 5px;} \
  #wide_column #page_info_wrap #profile_short .profile_more_info_link:hover {background: #E9EDF1;} \
  #wide_column #page_info_wrap #profile_short .profile_more_info_link {padding-left: 170px;} \
  #wide_column #page_info_wrap #profile_full  .profile_info_block {padding: 0 0 29px 5px;} \
  #wide_column #page_info_wrap .profile_info_header {color: #45688E; font-weight: bold; font-size: 11px;} \
  /*** COUNTS ***/ \
  #wide_column .counts_module {display: none !important;} \
  /*** DEBUG MESSAGE ***/ \
  /*** #wide_column .page_block {display: block !important;} ***/ \
  /*** WHAT IS NEW ***/ \
  #wide_column .page_block .post_field_user_image {border-radius: 0px;} \
  /*** NEWS ***/ \
  #page_body .wide_column_left .post_img, .wide_column_left .reply_img {border-radius: 0px;} \
  #wide_column .page_block .page_post_sized_thumbs {max-width: 100%; vertical-align: middle;} \
  #wide_column .page_post_sized_thumbs {align-content: center;} \
  /*** MESSAGES ***/ \
  /* #page_body .im_grid {border-radius: 0%;} */ \
  /*** FRIENDS ***/ \
  #page_body .friends_photo_img {border-radius: 0%;} \
  /*** GROUPS ***/ \
  #page_body .group_row_img  {border-radius: 0%;} \
  /*** PHOTO R. ***/ \
  #page_body .photos_container {display: block;} \
  #page_body .photos_container .photos_row_wrap {overflow: visible;} \
  #page_body .photos_container .photos_row.photos_photo_old {width: 180px !important; height: 180px;} \
  #page_body .photos_container .photos_row_wrap {max-width: 540px; max-height: 180px;} \
  #page_body .photos_container .photos_period_delimiter {position: fixed;} \
.wide_column .header_right_link {display: none !important;} \
  #wide_column #profile_photos_module .module_header {height: 20px;  background: #DEE5EB;} \
  #wide_column #profile_photos_module .module_header .header_top {color: #45688E; height: 20px; line-height: 18px; padding: 0 0 0 8px; font-weight: bold; font-size: 11px;} \
  #wide_column #profile_photos_module #page_photos_module {padding: 5px 0 10px; display: flex; justify-content: center;} \
  #wide_column #profile_photos_module #page_photos_module .page_square_photo {width: 25%;} \
  /*** WALL ***/ \
  #profile_wall .post_header .post_img {border-radius: 0;} \
  #profile_wall #page_wall_posts .post_content .wall_text {overflow: hidden;} \
/**** GAMES ***/ \
  #apps_content .apps_featured_slider {width: 610px;} \
/*** VIDEOS ***/ \
  #video_content_catalog .videocat_row {width: 569px; margin-left: 0;} \
  #video_content_catalog .videocat_row_content {margin-left: 15px;} \
  #videocat_other_blocks .videocat_featured_playlists {width: 569px;} \
  .video_block_layout, .video_block_layout .videocat_row {width: 569px; overflow: auto;} \
    /***** PUBLIC *******/ \
  #public .wide_column_left .narrow_column_wrap {width: 200px !important;} \
  #public .wide_column_left .narrow_column_wrap #narrow_column {margin-left: 0px; width: 200px !important;} \
   \
  #wall_fixed .post_content .wall_text {overflow: hidden;} \
   \
   \
  /* FOLLOWERS */ \
  #public #public_followers .header_right_link {display: none;} \
  #public #public_followers .module_header {height: 20px;  background: #DEE5EB;} \
  #public #public_followers .module_header .header_top {color: #45688E; height: 20px; line-height: 18px; padding: 0 0 0 8px; font-weight: bold; font-size: 11px;} \
  #public #public_followers .module_body {padding: 5px 0 0 0;} \
  #public #public_followers .module_body .people_row {width: 200px;} \
  #public #public_followers .module_body .people_row .people_cell {width: 66px; padding: 5px 0;} \
  #public #public_followers .module_body .people_cell_img {border-radius: 0px;} \
  #public #public_followers .module_body .people_cell_ava {padding-bottom: 5px; margin: 0 9px;} \
  /* LINKS */ \
  #public #public_links .header_right_link {display: none;} \
  #public #public_links .module_header {height: 20px;  background: #DEE5EB;} \
  #public #public_links .module_header .header_top {color: #45688E; height: 20px; line-height: 18px; padding: 0 0 0 8px; font-weight: bold; font-size: 11px;} \
  #public #public_links .module_body {padding: 8px; font-size: 11px;} \
  #public #public_links .module_body .group_desc {font-size: 0.9em;} \
  #public #public_links .module_body .thumb {border-radius: 0px;height: 32px; width: 32px; margin-right: 8px;} \
  #public #public_links .module_body .desc_info {width: 132px; padding: 0;} \
  #public #public_links .module_body .cell_img {height: 32px; width: 32px; border-radius: 0;} \
  /* EVENTS */ \
  #public #public_events .header_right_link {display: none;} \
  #public #public_events .module_header {height: 20px;  background: #DEE5EB;} \
  #public #public_events .module_header .header_top {color: #45688E; height: 20px; line-height: 18px; padding: 0 0 0 8px; font-weight: bold; font-size: 11px;} \
  #public #public_events .module_body {padding: 8px; font-size: 11px;} \
  #public #public_events .module_body .group_desc {font-size: 0.9em;} \
  #public #public_events .module_body .thumb {border-radius: 0px;height: 32px; width: 32px; margin-right: 8px;} \
  #public #public_events .module_body .desc_info {width: 144px; padding: 0;} \
  #public #public_events .module_body .cell_img {height: 32px; width: 32px; border-radius: 0;} \
  /* PLACES */ \
  #public #public_places .header_right_link {display: none;} \
  #public #public_places .module_header {height: 20px;  background: #DEE5EB;} \
  #public #public_places .module_header .header_top {color: #45688E; height: 20px; line-height: 18px; padding: 0 0 0 8px; font-weight: bold; font-size: 11px;} \
  #public #public_places .module_body {padding: 8px; font-size: 11px;} \
  #public #public_places .module_body .group_desc {font-size: 0.9em;} \
  #public #public_places .module_body .thumb {border-radius: 0px;height: 32px; width: 32px; margin-right: 8px;} \
  #public #public_places .module_body .desc_info {width: 144px; padding: 0;} \
  #public #public_places .module_body .cell_img {height: 32px; width: 32px; border-radius: 0;} \
  /* CONTACTS */ \
  #public #public_contacts .header_right_link {display: none;} \
  #public #public_contacts .module_header {height: 20px;  background: #DEE5EB;} \
  #public #public_contacts .module_header .header_top {color: #45688E; height: 20px; line-height: 18px; padding: 0 0 0 8px; font-weight: bold; font-size: 11px;} \
  #public #public_contacts .module_body {padding: 8px; font-size: 11px;} \
  #public #public_contacts .module_body .group_desc {font-size: 0.9em;} \
  #public #public_contacts .module_body .thumb {border-radius: 0px;height: 32px; width: 32px; margin-right: 8px;} \
  #public #public_contacts .module_body .desc_info, #public #public_contacts .module_body .extra_info {width: 144px; padding: 0;} \
  #public #public_contacts .module_body .cell_img {height: 32px; width: 32px; border-radius: 0;} \
  /* PHOTO */ \
  #public_albums .module_header {height: 20px;  background: #DEE5EB;} \
  #public_albums .module_header .header_top {color: #45688E; height: 20px; line-height: 18px; padding: 0 0 0 8px; font-weight: bold; font-size: 11px;} \
  #public_albums .module_body {padding: 0 0 10px 0;} \
  #public_albums .album_module .page_album_row {border-radius: 0;} \
  /* VIDEO */ \
  #public_videos .module_header {height: 20px;  background: #DEE5EB;} \
  #public_videos .module_header .header_top {color: #45688E; height: 20px; line-height: 18px; padding: 0 0 0 8px; font-weight: bold; font-size: 11px;} \
  #public_videos .module_body {padding: 0 0 10px 0;} \
  #public_videos .module_body .video_row .video {border-radius: 0;} \
  /* AUDIO */ \
  #public_audios .module_header {height: 20px;  background: #DEE5EB;} \
  #public_audios .module_header .header_top {color: #45688E; height: 20px; line-height: 18px; padding: 0 0 0 8px; font-weight: bold; font-size: 11px;} \
  #public_audios .module_body {padding: 5px 0 10px;} \
  #public_audios .audio_play {border-radius: 5px;} \
  /* TOPICS */ \
  #public #public_topics .header_right_link {display: none;} \
  #public #public_topics .module_header {height: 20px;  background: #DEE5EB;} \
  #public #public_topics .module_header .header_top {color: #45688E; height: 20px; line-height: 18px; padding: 0 0 0 8px; font-weight: bold; font-size: 11px;} \
  #public #public_topics .module_body {font-size: 11px;} \
/* MESSAGE */ \
  .im-page.im-page_classic, .im-page.im-page_classic .im-page--header, .im-page.im-page_classic .im-page--dialogs-footer, .im-page.im-page_classic .im-page--header-chat, .im-page.im-page_classic .im-page--chat-input {width: 610px;} \
  .im-right-menu.ui_rmenu {margin-left: 620px;} \
  .im-chat-input .im-chat-input--text {font-size: 11px;} \
  .page_block {box-shadow: none; border-radius: 0px;} \
/* SEARCH */ \
  .im-page.im-page_classic .im-page--header {position: fixed; top: 60px;} \
  #page_body .ui_search_input_block {width: 550px; position: fixed; height: 60px; background: #FFFFFF;;} \
  #page_body .im-page .im-page--dialogs-search .ui_search_field {padding: 30px 44px 13px 48px;} \
/*GAMES*/ \
  #page_body .apps_recent_block {width: 60%;} \
  #page_body .apps_feed_block {width: 40%;} \
  #page_body .apps_recent_row {width: 80px; height: 80px; padding: 0 0 0 0;} \
  #page_body .apps_cat_row, .apps_cat_cont {width: 100px; height: 100px;} \
  #page_body .ads_ad_photo_box.ver.apps_only, .app_new_sticker.apps_sticker_ru, .app_cat_image, .apps_wide_img {width: 90px; height: 90px;} \
  #page_body .ui_tabs_header {width: 100%; height: 51px; padding: 0 0 55px;} \
  #page_body .apps_notifications_wrap .apps_notifications_wrap_inner {width: 270px;} "

function createLeftMenu(){
  try {
      var settingsMenu = document.createElement('li');
      settingsMenu.id = 'l_set';
      var settingsLink = document.createElement('a');
      settingsLink.className = "left_row";
      settingsLink.href = 'https://vk.com/settings';
      settingsLink.appendChild(document.createTextNode('Мои Настройки'));
      settingsMenu.appendChild(settingsLink);
      settingsMenu.setAttribute("style", "padding-left: 5px; font-size: 11px; height: 20px; margin: 6px;");
      var leftMenu = document.getElementById('l_ap');
      leftMenu.parentNode.insertBefore(settingsMenu,leftMenu);
 }
 catch(e){
 }
}

function createTopMenu(){
  try {
      var topMenu = document.getElementById('top_audio');
      var peopleLink = document.createElement('a');
      peopleLink.className = "";
      peopleLink.href = 'https://vk.com/search?c[section]=people';
      peopleLink.appendChild(document.createTextNode('люди'));
      peopleLink.setAttribute("style", "font-size: 11px; color: white; font-weight: bold; \
                              padding: 11px; width: 60px; display: inline-block;");
      topMenu.parentNode.insertBefore(peopleLink, topMenu);
      var groupsLink = document.createElement('a');
      groupsLink.className = "";
      groupsLink.href = 'https://vk.com/groups';
      groupsLink.appendChild(document.createTextNode('сообщества'));
      groupsLink.setAttribute("style", "font-size: 11px; color: white; font-weight: bold; \
                              padding: 11px 0; width: 100px; display: inline-block;");
      topMenu.parentNode.insertBefore(groupsLink, topMenu);
      var gamesLink = document.createElement('a');
      gamesLink.className = "";
      gamesLink.href = 'https://vk.com/apps';
      gamesLink.appendChild(document.createTextNode('игры'));
      gamesLink.setAttribute("style", "font-size: 11px; color: white; font-weight: bold; \
                              padding: 11px 0; width: 50px; display: inline-block;");
      topMenu.parentNode.insertBefore(gamesLink, topMenu);
      var musicLink = document.createElement('a');
      musicLink.className = "";
      musicLink.href = 'https://vk.com/search?c[section]=audio';
      musicLink.appendChild(document.createTextNode('музыка'));
      musicLink.setAttribute("style", "font-size: 11px; color: white; font-weight: bold; \
                              padding: 11px 0; width: 70px; display: inline-block;");
      topMenu.parentNode.insertBefore(musicLink, topMenu);
      var helpLink = document.createElement('a');
      helpLink.className = "";
      helpLink.href = 'https://vk.com/support?act=home';
      helpLink.appendChild(document.createTextNode('помощь'));
      helpLink.setAttribute("style", "font-size: 11px; color: white; font-weight: bold; \
                              padding: 11px 0; width: 70px; display: inline-block;");
      topMenu.parentNode.insertBefore(helpLink, topMenu);
      var quitLink = document.createElement('a');
      quitLink.className = "";
      quitLink.href = 'https://login.vk.com/?act=logout';
      quitLink.appendChild(document.createTextNode('выйти'));
      quitLink.setAttribute("style", "font-size: 11px; color: white; font-weight: bold; \
                              padding: 11px 0; width: 50px; display: inline-block;");
      topMenu.parentNode.insertBefore(quitLink, topMenu);
      topMenu.style.display = 'none';
      var topNotify = document.getElementById('top_notify_btn');
      topNotify.style.display = 'none';
      var topProfile = document.getElementById('top_profile_link');
      topProfile.style.display = 'none';
 }
 catch(e){
 }
}

addGlobalStyle(css);
createLeftMenu();
createTopMenu();