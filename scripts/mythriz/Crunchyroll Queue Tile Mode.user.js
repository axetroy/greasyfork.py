// ==UserScript==
// @name         Crunchyroll Queue Tile Mode
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  Changes the Crunchyroll queue to be shown as tiles instead of a list.
// @author       /u/mythriz
// @match        https://www.crunchyroll.com/home/queue
// @grant        crqueue_style.append
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// @icon         https://www.crunchyroll.com/i/beta/ios_icon/cr_ios.png
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
// @run-at       document-start
// ==/UserScript==

// JQuery 1.11.1 seems to be the version loaded on Crunchyroll, so I put that in the @require meta key here too.

(function() {
    'use strict';

    // Apply styles right away, but wait until document is ready before modifying the page
    crqueue_apply_styles( false );
    $(document).ready( function() {
        crqueue_initialize_elements();
        crqueue_modify_elements( false );
        crqueue_create_options_box();
    } );

    // This function does the initial elements modifications and should only be run once
    function crqueue_initialize_elements() {
        // Replaces IMG element with a DIV element, setting the preview image as its background.
        // That way even with f.ex. square-shaped tiles, the image won't be stretched.
        $('#main_content .landscape-element img.landscape').each( function() {
            var image_url = $(this).attr('src');
            if (hide_premium_crown(false))
                image_url = image_url.replace(/wide(star)?/g,'full');
            else image_url = image_url.replace(/wide\.jpg?/g,'full.jpg');
            $(this).replaceWith( $('<div class="crqueue_image_div">').css('background-image',"url('"+image_url+"')" ) );
        });

        // If the episode description isn't empty, add it to the mouseover text
        $('.short-desc').each(function(){
            if ($(this).text().trim() != '') {
                var ep_link = $(this).parent().parent();
                ep_link.attr('title', ep_link.attr('title')+' - '+$(this).text().trim() );
            }
        });

        // Removes the useless "Next up:" label from the episode name
        $('.series-data').each( function(){
            $(this).html( $(this).html().split('Next up:').join('') );
        });

        // Moves the "Show information" link from the hidden block into the tile
        $('a:contains(Show Information)').each( function(){
            $(this).appendTo( $(this).parent().parent().parent().find('.series-info') );
        });
    }

    // This function also modifies the elements, but because it can be changed with options, this has to
    // run every time an option is changed
    function crqueue_modify_elements( preview )
    {
        if (!preview_filter_only( preview )) {
            $('.crqueue_image_div').addClass('crqueue_image_filter');
        } else {
            $('.crqueue_image_div').removeClass('crqueue_image_filter');
            $('.episode-progress').each( function() {
                var result = $(this).attr('style').match(/width\: ([0-9]+)\%/);
                if (parseInt(result[1]) < 90)
                    $(this).parent().prev().addClass('crqueue_image_filter');
            } );
        }
    }

    // This function applies all our custom styles. If styles were already set, remove them all first.
    // If "preview" is true, load the values from the options box
    function crqueue_apply_styles( preview ) {
        ///////////////// The actual work /////////////////
        // Remove the old style object if it exists
        $('#crqueue_style').remove();
        // Makes the list fill the entire width of the browser window instead of being resized into a fixed-width column
        var crqueue_style = $('<style id="crqueue_style"></style>');
        crqueue_style.append('#template_container.template-container { width: '+page_width(preview)+'; }');
        crqueue_style.append('#main_content { float: none; }');
        if (recently_watched_mode(preview) == 'normal') {
            crqueue_style.append('#main_content { width: calc(100% - 300px); }');
        } else {
            crqueue_style.append('#main_content { width: 100%; }');
            if (recently_watched_mode(preview) == 'hidden')
                crqueue_style.append('#sidebar { display: none; }');
            else if (recently_watched_mode(preview) == 'bottom' || recently_watched_mode(preview) == 'top') {
                crqueue_style.append('#sidebar { float: none; width: 100%; }');
                crqueue_style.append('#sidebar ul.videos { display: flex; flex-wrap: wrap; }');
                crqueue_style.append('#sidebar ul.videos li { margin-right: 10px; }');
            }
        }
        // The Recently Watched sidebar must be after the #main-content for "bottom" mode,
        // but it must be before #main-content in "normal", "hidden" and "top" mode.
        if (recently_watched_mode(preview) == 'bottom') {
            $('#main_content').after( $('#sidebar') );
        } else {
            $('#main_content').before( $('#sidebar') );
        }
        // Using flexboxes instead of floating all the tiles to make them line up and wrap to a new line
        crqueue_style.append('ul#sortable { display: flex; flex-wrap: wrap; }');

        // Sets the tile width, also removes padding to make sure the episode preview fills the entire tile
        crqueue_style.append('ul#sortable li { width: '+preview_width(preview)+'px; margin-right: 10px; }');
        crqueue_style.append('#source_home .landscape-grid li .queue-wrapper { width: 100% !important; height: auto; }');
        crqueue_style.append('ul#sortable a.episode { width: 100% !important; padding: 0; }');
        crqueue_style.append('.episode-progress-bar { position: absolute; top: '+(preview_height(preview)-4)+'px; width: 100%; }');

        // Hide the preview image to make sure it doesn't show up before the styles/page modifications are done loading
        crqueue_style.append('div.episode-img img { display: none !important; }');

        // Sets the style for the preview image DIV
        crqueue_style.append('.crqueue_image_div { width: '+preview_width(preview)+'px; height: '+preview_height(preview)+'px; background-size: cover; background-position: center center; background-repeat: no-repeat; }');
        crqueue_style.append('.crqueue_image_filter { filter: '+preview_filter(preview)+'; }');
        crqueue_style.append('#main_content .landscape-element .episode-img { width: '+preview_width(preview)+'px; height: '+preview_height(preview)+'px; overflow: hidden; }');

        // Move the "drag and drop" handle to the top left
        crqueue_style.append('#source_home .handle { position: absolute; top: 0; left: 0; z-index: 10; height: 30px; background-position-y: -193px; opacity: 0.5; }');
        crqueue_style.append('#source_home .handle:hover { background-position-y: -23px; }');

        // Move the "Move to top" button to the top right, and hides it unless you move the mouse over it
        crqueue_style.append('#source_home .queue-to-top { position: absolute; top: 0; right: 0; z-index: 10; margin: 0; opacity: 0; transition: opacity 0.3s ease-in-out; }');
        crqueue_style.append('#source_home .queue-to-top:hover { opacity: 1; }');

        // Move the episode information over the preview image
        crqueue_style.append('ul#sortable .series-info { width: 100% !important; padding: 0 5px 15px; box-sizing: border-box; background: '+info_bg_color(preview)+'; z-index: 15; }');
        if (series_information_mode(preview) == 'embed')
            crqueue_style.append('ul#sortable .series-info { position: absolute; bottom: 4px; left: 0; right: 0; opacity: '+info_start_opacity(preview)+'; transition: opacity 0.3s ease-in-out; }');
        if (series_information_mode(preview) == 'float') {
            crqueue_style.append('ul#sortable .series-info { position: absolute; top: '+preview_height(preview)+'px; left: 0; right: 0; display: none; }');
        }
        crqueue_style.append('ul#sortable li:hover .series-info { opacity: 1; display: block; }');
        crqueue_style.append('ul#sortable .episode-img, ul#sortable .series-info, ul#sortable .series-title { max-width: 100%; height: auto; }');
        if (show_full_title(preview))
            crqueue_style.append('ul#sortable .series-title { white-space: normal; }');
        if (show_full_episode_name(preview))
            crqueue_style.append('ul#sortable .series-data { white-space: normal; }');
        crqueue_style.append('ul#sortable .series-title, ul#sortable .series-data, ul#sortable .series-info a, ul#sortable .series-info a:hover { color: '+info_text_color(preview)+'; }');

        // Hide the episode description
        crqueue_style.append('ul#sortable .short-desc { display: none; }');

        // Fix the "Play" button that shows when you hold the mouse over a tile.
        // Made it orange with white outline and used a character instead of the image (because the image was too small and looked bad if I resized it)
        crqueue_style.append('#main_content .landscape-element.episode .play-icon-overlay { width: '+preview_width(preview)+'px; height: '+preview_height(preview)+'px; background: none; z-index: 5; }');
        var play_x = (preview_width(preview)-40)/2;
        var play_y = (preview_height(preview)-80)/2;
        crqueue_style.append('#main_content .landscape-element.episode .play-icon-overlay::before { content: "▶"; font-size: 50px; position: absolute; left: '+play_x+'px; top: '+play_y+'px; color: '+play_button_fill_color(preview)+'; -webkit-text-stroke-width: '+play_button_outline_thickness(preview)+'; -webkit-text-stroke-color: '+play_button_outline_color(preview)+';}');

        // Hides the dropdown arrow for the episode list since this doesn't work properly for the tile anyways and I haven't figured out how to make it work
        crqueue_style.append( 'a.dropdown-collection { display: none; }' );

        crqueue_style.append( '.series-info a.text-link { position: absolute; bottom: 0; right: 3px; z-index: 15; font-size: 0.8em; }' );
        crqueue_style.append( '.series-info a.text-link:hover { text-decoration: underline !important; }' );

        // Applies the styles
        $('head').append( crqueue_style );
    }

    function crqueue_create_options_box() {
        ///////////////// Options Page /////////////////
        // If it already exists, remove it first
        $('#crqueue_options_box').remove();

        // This adds a box for Options where the user can set options without needing to edit the script variables
        var options_box = $('<div id="crqueue_options_box" class="right" style="display: none; width: 300px; padding-left: 10px;"><h2>Crunchyroll Queue Tiles Options</h2></div>');

        options_box.append( '<h3>Page options</h3>' );
        var page_width_label = $('<label>Page width:</label>');
        var page_width_option = $('<input type="text" id="crqueue_page_width" value="'+page_width()+'" />');
        page_width_option.keyup(crqueue_preview_timeout);
        page_width_label.append(page_width_option);
        options_box.append( $('<p>').append(page_width_label) );
        options_box.append( '<p>Set this to "auto" to fill the entire page, or set it to for example 1300px or 80%.</p>' );

        // Recently Watched options
        options_box.append( '<h4>Recently watched</h4>' );
        var radio_sidebar_normal = $('<input type="radio" id="crqueue_sidebar_normal" name="crqueue_recently_watched_mode" value="normal" />');
        var radio_sidebar_hidden = $('<input type="radio" id="crqueue_sidebar_hidden" name="crqueue_recently_watched_mode" value="hidden" />');
        var radio_sidebar_bottom = $('<input type="radio" id="crqueue_sidebar_bottom" name="crqueue_recently_watched_mode" value="bottom" />');
        var radio_sidebar_top = $('<input type="radio" id="crqueue_sidebar_bottom" name="crqueue_recently_watched_mode" value="top" />');
        options_box.append( $('<p>').append( $('<label> Normal sidebar</label>').prepend(radio_sidebar_normal) ) );
        options_box.append( $('<p>').append( $('<label> Hidden</label>').prepend(radio_sidebar_hidden) ) );
        options_box.append( $('<p>').append( $('<label> Move to bottom</label>').prepend(radio_sidebar_bottom) ) );
        options_box.append( $('<p>').append( $('<label> Move to top</label>').prepend(radio_sidebar_top) ) );

        // Series information options
        options_box.append( '<h3>Series information</h3>' );
        var radio_mode_embed = $('<input type="radio" id="crqueue_mode_embed" name="crqueue_series_information_mode" value="embed" />');
        var radio_mode_below = $('<input type="radio" id="crqueue_mode_below" name="crqueue_series_information_mode" value="below" />');
        var radio_mode_float = $('<input type="radio" id="crqueue_mode_float" name="crqueue_series_information_mode" value="float" />');
        options_box.append( $('<p>').append( $('<label> Information inside the tile</label>').prepend(radio_mode_embed) ) );
        options_box.append( $('<p>').append( $('<label> Information below the tile</label>').prepend(radio_mode_below) ) );
        options_box.append( $('<p>').append( $('<label> Information hidden, but shown on mouseover</label>').prepend(radio_mode_float) ) );

        var checkbox_full_title = $('<input type="checkbox" id="crqueue_show_full_title" value="1" '+(show_full_title() ? 'checked' : '')+' />');
        var checkbox_full_episode_name = $('<input type="checkbox" id="crqueue_show_full_episode_name" value="1" '+(show_full_episode_name() ? 'checked' : '')+' />');
        options_box.append( $('<p>').append( $('<label> Show full series title</label>').prepend(checkbox_full_title) ) );
        options_box.append( $('<p>').append( $('<label> Show full episode name</label>').prepend(checkbox_full_episode_name) ) );

        var text_color = $('<label>Text color: <input type="text" id="crqueue_info_text_color" value="'+info_text_color()+'" /></label>');
        options_box.append( $('<p>').append(text_color) );
        var bg_color = $('<label title="Use rgba(red,green,blue,opacity) if you want a translucent color. (Red, blue and green can be 0-255, while opacity is 0.0 for invisible to 1.0 for fully opaque.)"> '+
                          'Background color: <input type="text" id="crqueue_info_bg_color" value="'+info_bg_color()+'" /></label>');
        options_box.append( $('<p>').append(bg_color) );
        var info_opacity = $('<label>Start opacity: <input type="text" id="crqueue_info_start_opacity" value="'+info_start_opacity()+'" '+(series_information_mode() == 'embed' ? '' : 'disabled')+' /></label>');
        options_box.append( $('<p>').append(info_opacity) );
        options_box.append( '<p>The opacity of the series information box before you mouseover the tile for the "Information inside the tile" mode. Set this to 0 to make it invisible until you mouseover the tile.</p>' );

        // Options for the preview image
        options_box.append( $('<h3>Preview image</h3>') );
        var width_option = $('<label>Width: <input type="text" id="crqueue_preview_width" value="'+preview_width()+'" /></label>');
        options_box.append( $('<p>').append(width_option) );
        // We want the actual value here instead of the calculated value, so we use GM_getValue here:
        var height_option = $('<label>Height: <input type="text" id="crqueue_preview_height" value="'+GM_getValue( 'crqueue_preview_height', 0 )+'" /></label>');
        options_box.append( $('<p>').append(height_option) );
        options_box.append( $('<p>If height is 0, the script will automatically calculate a 16:9 height.</p>') );
        var filter_option = $('<label>Filter: <input type="text" id="crqueue_preview_filter" value="'+preview_filter()+'" /></label>');
        var checkbox_hide_crown = $('<input type="checkbox" id="crqueue_hide_premium_crown" value="1" '+(hide_premium_crown() ? 'checked' : '')+' />');
        options_box.append( $('<p>').append( $('<label title="Note that the preview image with the premium crown on it is lower resolution than the full size preview image that we replace the preview with, so it will not look as good."> '+
                                               'Hide Premium crown*</label>').prepend(checkbox_hide_crown) ) );
        options_box.append( '<p>* This option will not be applied before you save the options and reload the page.</p>' );

        options_box.append( $('<p>').append(filter_option) );
        var filter_blur = $('<input type="button" class="submitbtn crqueue_filter_examples" value="blur(20px)" />');
        var filter_sepia = $('<input type="button" class="submitbtn crqueue_filter_examples" value="sepia(100%)" />');
        var filter_invert = $('<input type="button" class="submitbtn crqueue_filter_examples" value="invert(100%)" />');
        options_box.append( $('<p>Example filters:</p>') );
        options_box.append( $('<p>').append( filter_blur ).append( filter_sepia ).append( filter_invert ) );
        options_box.append( $('<p>You can type in more than one filter if you want multiple effects. <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/filter">More filter options...</a></p>') );
        var checkbox_filter_only = $('<input type="checkbox" id="crqueue_preview_filter_only" value="1" '+(preview_filter_only() ? 'checked' : '')+' />');
        options_box.append( $('<p>').append( $('<label> Only apply filter to shows where the progress is less than 90%.</label>').prepend(checkbox_filter_only) ) );


        // Options for the play button
        options_box.append( $('<h3>Play button</h3>') );
        var play_button_fill = $('<label title="Use rgba(red,green,blue,opacity) if you want a translucent color. (Red, blue and green can be 0-255, while opacity is 0.0 for invisible to 1.0 for fully opaque.)"> '+
                          'Fill color: <input type="text" id="crqueue_play_button_fill_color" value="'+play_button_fill_color()+'" /></label>');
        options_box.append( $('<p>').append(play_button_fill) );
        var play_button_outline = $('<label title="Use rgba(red,green,blue,opacity) if you want a translucent color. (Red, blue and green can be 0-255, while opacity is 0.0 for invisible to 1.0 for fully opaque.)"> '+
                          'Outline color: <input type="text" id="crqueue_play_button_outline_color" value="'+play_button_outline_color()+'" /></label>');
        options_box.append( $('<p>').append(play_button_outline) );
        var play_button_thickness = $('<label>Outline thickness: <input type="text" id="crqueue_play_button_outline_thickness" size="10" value="'+play_button_outline_thickness()+'" /></label>');
        options_box.append( $('<p>').append(play_button_thickness) );

        // Add the buttons for saving and cancelling
        options_box.append('<hr/>');
        var submit_button = $('<input type="button" value="Save options" class="submitbtn" />');
        submit_button.click( crqueue_save_options );
        var cancel_button = $('<input type="button" id="crqueue_cancel_button" value="Cancel" class="submitbtn" />');
        cancel_button.click( crqueue_cancel_options );
        options_box.append( $('<p>').append(submit_button).append(cancel_button) );
        options_box.append( $('<p id="crqueue_saved" style="color: green; display: none;">Options saved.</p>') );

        var reset_button = $('<input type="button" value="Reset options to defaults" class="submitbtn" />');
        reset_button.click( crqueue_reset_options );
        options_box.append('<br/>');
        options_box.append( $('<p>').append(reset_button) );
        $('#container').prepend(options_box);

        // Easier to do this after the elements have actually been added to the document
        $('#crqueue_sidebar_'+recently_watched_mode()).attr('checked','checked');
        $('#crqueue_mode_'+series_information_mode()).attr('checked','checked');
        $('#crqueue_options_box input[type="radio"]').click( crqueue_preview_styles );
        $('#crqueue_options_box input[type="checkbox"]').click( crqueue_preview_styles );
        $('#crqueue_options_box input[type="text"]').keyup(crqueue_preview_timeout);
        $('.crqueue_filter_examples').click( function(){
            $('#crqueue_preview_filter').val( $(this).val() );
            crqueue_preview_styles();
        });

        // Add the tab button for the options if it isn't already there:
        if (!$('#crqueue_options_tab').length) {
            var options_tab = $('<a id="crqueue_options_tab" href="#" class="left">Crunchyroll Queue Tiles Options</a>');
            options_tab.click( function(){
                $('#crqueue_options_tab').toggleClass('selected');
                $('#crqueue_options_box').toggle();
            });
            $('div.main-tabs').append( options_tab );
        }
    }

    function crqueue_preview_styles() {
        $('#crqueue_cancel_button').val('Cancel');
        if (series_information_mode(true) == 'embed')
            $('#crqueue_info_start_opacity').prop('disabled',false);
        else $('#crqueue_info_start_opacity').prop('disabled','disabled');
        crqueue_apply_styles( true );
        crqueue_modify_elements( true );
    }

    var crqueue_preview_timer;
    function crqueue_preview_timeout() {
        if (crqueue_preview_timer)
            window.clearTimeout(crqueue_preview_timer);
        crqueue_preview_timer = window.setTimeout( function() {
            crqueue_preview_styles();
        }, 500 );
    }

    function crqueue_save_options() {
        $('#crqueue_saved').hide();
        // We can easily get the user-set values using the Getters with preview=true
        GM_setValue( 'crqueue_page_width', page_width(true) );
        GM_setValue( 'crqueue_recently_watched_mode', recently_watched_mode(true) );
        GM_setValue( 'crqueue_series_information_mode', series_information_mode(true) );
        GM_setValue( 'crqueue_show_full_title', show_full_title(true) );
        GM_setValue( 'crqueue_show_full_episode_name', show_full_episode_name(true) );
        GM_setValue( 'crqueue_info_text_color', info_text_color(true) );
        GM_setValue( 'crqueue_info_bg_color', info_bg_color(true) );
        GM_setValue( 'crqueue_info_start_opacity', info_start_opacity(true) );
        GM_setValue( 'crqueue_preview_width', preview_width(true) );
        // This is the only value we want to pick from the textbox to make sure it isn't the "calculated" value
        GM_setValue( 'crqueue_preview_height', parseInt( $('#crqueue_preview_height').val()) );
        GM_setValue( 'crqueue_preview_filter', preview_filter(true) );
        GM_setValue( 'crqueue_preview_filter_only', preview_filter_only(true) );
        GM_setValue( 'crqueue_hide_premium_crown', hide_premium_crown(true) );
        GM_setValue( 'crqueue_play_button_fill_color', play_button_fill_color(true) );
        GM_setValue( 'crqueue_play_button_outline_color', play_button_outline_color(true) );
        GM_setValue( 'crqueue_play_button_outline_thickness', play_button_outline_thickness(true) );
        $('#crqueue_saved').fadeIn();
        $('#crqueue_cancel_button').val('Close');
    }

    function crqueue_cancel_options() {
        $('#crqueue_options_tab').removeClass('selected');
        crqueue_apply_styles( false );
        crqueue_modify_elements( false );
        crqueue_create_options_box();
    }

    function crqueue_reset_options() {
        if (confirm( "This will immediately delete all saved settings and set them to the default values. Are you sure you want to do this?" )) {
            var values = GM_listValues();
            for (var index = 0; index < values.length; index++)
                GM_deleteValue( values[index] );
            crqueue_cancel_options();
        }
    }

    ///////////////// Getters that fetches the preview value if preview is true /////////////////
    // Auto uses the entire browser width, or this can be a specific px or percentage width
    function page_width( preview ) {
        if (!preview)
            return GM_getValue( 'crqueue_page_width', '1300px' );
        return $('#crqueue_page_width').val();
    }

    // Different modes for the show and episode information:
    // embed - overlays information on top of the preview image
    // below - shows the information under the preview image
    // float - hides the information, but shows it when you hold the mouse over the tile
    function series_information_mode( preview ) {
        if (!preview)
            return GM_getValue( 'crqueue_series_information_mode', 'below' );
        else return $("input[name='crqueue_series_information_mode']:checked").val();
    }
    // Different modes for the recently watched box:
    // normal - shows on the side
    // hidden - hides it completey
    // bottom - moves the sidebar to the bottom
    function recently_watched_mode( preview ) {
        if (!preview)
            return GM_getValue( 'crqueue_recently_watched_mode', 'normal' );
        else return $("input[name='crqueue_recently_watched_mode']:checked").val();
    }

    // This option decides whether to show the entire title of the anime or to crop it if it's too long (longer than one line)
    function show_full_title( preview ) {
        if (!preview)
            return GM_getValue( 'crqueue_show_full_title', 0 );
        return $('#crqueue_show_full_title').prop('checked');
    }
    // Same as above but for the episode name
    function show_full_episode_name( preview ) {
        if (!preview)
            return GM_getValue( 'crqueue_show_full_episode_name', 0 );
        return $('#crqueue_show_full_episode_name').prop('checked');
    }
    // In "float" mode it should be fine to show the full title and episode name, but for the other two modes it's better to crop them.

    // Changes the size of the preview image (and also the size of the tile if you use embedded mode)
    function preview_width( preview ) {
        if (!preview)
            return GM_getValue( 'crqueue_preview_width', 240 );
        else return parseInt($('#crqueue_preview_width').val());
    }
    // Calculate a 16:9 size height:
    function preview_height( preview ) {
        var height;
        if (!preview)
            height = GM_getValue( 'crqueue_preview_height', 0 );
        else height = parseInt($('#crqueue_preview_height').val());
        if (!height)
            height = preview_width( preview )/16*9;
        return height;
    }
    function preview_filter( preview ) {
        if (!preview)
            return GM_getValue( 'crqueue_preview_filter', 'none' );
        else return $('#crqueue_preview_filter').val();
    }
    function preview_filter_only( preview ) {
        if (!preview)
            return GM_getValue( 'crqueue_preview_filter_only', 1 );
        return $('#crqueue_preview_filter_only').prop('checked');
    }

    // Replaces the "premium" preview image (with a crown in the corner) with the regular preview image
    function hide_premium_crown( preview ) {
        if (!preview)
            return GM_getValue( 'crqueue_hide_premium_crown', 1 );
        return $('#crqueue_hide_premium_crown').prop('checked');
    }
    // Note that the script replaces the preview images with a larger versions,
    // but I couldn't find a larger version of the preview with the crown on it,
    // so it'll stay 160x90 if you keep it.

    // The text and background color for the title and episode name box, set the last number inside "rgba" to 1 if you don't want it to be transparent
    // If you use float mode, setting the opacity to 1 is recommended.
    function info_bg_color( preview ) {
        if (!preview)
            return GM_getValue( 'crqueue_info_bg_color', 'rgba(255, 255, 255, 0.7)' );
        return $('#crqueue_info_bg_color').val();
    }
    function info_text_color( preview ) {
        if (!preview)
            return GM_getValue( 'crqueue_info_text_color', 'black' );
        return $('#crqueue_info_text_color').val();
    }

    // This value sets how opaque the info box is before you move the mouse over the tile.
    // You can set this to 0 to make the info box completely invisible until you move the mouse over the tile,
    // or set it to 1 to make it fully opaque (except for the BG color).
    function info_start_opacity( preview ) {
        if (!preview)
            return GM_getValue( 'crqueue_info_start_opacity', '0.3' );
        return $('#crqueue_info_start_opacity').val();
    }
    // This is ignored in "float" mode.

    // The color of the play button
    function play_button_fill_color( preview ) {
        if (!preview)
            return GM_getValue( 'crqueue_play_button_fill_color', 'orange' )
        return $('#crqueue_play_button_fill_color').val();
    }
    function play_button_outline_color( preview ) {
        if (!preview)
            return GM_getValue( 'crqueue_play_button_outline_color', 'white' );
        return $('#crqueue_play_button_outline_color').val();
    }
    function play_button_outline_thickness( preview ) {
        if (!preview)
            return GM_getValue( 'crqueue_play_button_outline_thickness', '3px' );
        return $('#crqueue_play_button_outline_thickness').val();
    }
})();
