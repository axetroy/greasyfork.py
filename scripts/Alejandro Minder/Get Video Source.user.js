// ==UserScript==
// @name          	Get Video Source
// @description     Opens the video source in a new tab. Works only on some pages with embeded hosters like openload, streamcherry and streamango (doesn't support Facebook and YouTube)
// @icon            
//
// @author			ale8min4
// @namespace       https://greasyfork.org/de/users/222470-ale8min4
//
// @license         GPLv3 - http://www.gnu.org/licenses/gpl-3.0.txt
// @copyright       Copyright (C) 2018, by ale8min4
//
// @include         *://*
// @exclude         
// @match			
//
// @require         https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
//
// @version         0.0.1
//
// @resource		
// @unwrap
// ==/UserScript==

/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * SCRIPT DESCRIPTION.
 *
 * @see http://wiki.greasespot.net/API_reference
 * @see http://wiki.greasespot.net/Metadata_Block
 */         
            
            
  
      //wait till video source gets loaded
      $('video').on('loadstart', function () {
        
        //set variables
        var videoSrc = $(this).attr('src');
        var hasProt = videoSrc.startsWith("http");
        var isBlob = videoSrc.startsWith("blob");
        var hasDomain = videoSrc.startsWith("//");
        
        //add protocol and domain or just protocol
        function addProtDomain(){
          if (hasDomain){          
            return location.protocol;            
          }
          else if (hasProt){
            return '';            
          }
          else{
            return location.protocol + '//' + location.host;            
          }
        }
         
        var preString = addProtDomain();
        var compURL = preString + videoSrc;
        var fileName = compURL.replace(/^.*[\\\/]/, '');
        
        //output the video source if it's not blob
        function ouputAlert(){
          if (isBlob){
            alert('BLOB - Failed to retrieve source!\nPossibly it\'s hidden (JS) or it\'s HLS (M3U8).\nIf you got a solution, please let me know.');        
          }
          else{ 
            window.open(compURL); 
            /*
            return false;
            console.log(fileName);
            alert(compURL);     
            console.log(compURL);
            */
          }
        }
           
        //run
        ouputAlert();
      
      });

