// ==UserScript==
// @name         Stalk y like
// @namespace    Stalk y like
// @version      0.1
// @description  Stalkea a un user
// @author       @trollacio_gary
// @match        http://www.taringa.net/
// @grant        none
// ==/UserScript==
(function($){
if ($(".perfil-info")[0]){
    var up='<a id="stalk" class="btn g"><div class="btn-text">Stalk</div></a>';
	$('.perfil-info').append(up);
						}
$('#stalk').click(function(e) {  
    $('div[title^="Me gusta"]').trigger('click');
});
})(jQuery);