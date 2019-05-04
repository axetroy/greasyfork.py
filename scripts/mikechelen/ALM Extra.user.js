// ==UserScript== //

// @name ALM Extra

// @namespace http://www.plosone.org

// @description Test

// @include http://www.plosone.org

// @version 0.0.1.20140626100939
// ==/UserScript==


<script src="http://code.jquery.com/jquery-2.1.1.min.js">

$(document).ready(function () {  
    $('#article-metrics').append(
        $('<div>').html('Hello World'),
    );
}

