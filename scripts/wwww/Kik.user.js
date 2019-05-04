// ==UserScript==
// @name         Kik
// @namespace    https://realitygaming.fr/
// @version      1.0
// @description  Salut 
// @author       Rivals
// @match        https://realitygaming.fr/
// @grant        none
// ==/UserScript==$$(document).ready(function(){
	String.prototype.uppercase = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	}
	var user = {
		fondateur: {
			56393: "Veenox GTP",
			115344: "Snizah GTP"
		},
		admin: {
			0: "Il n'y a aucun administrateur GTP",

		},
		modo: {
			0: "Il n'y a aucun modérateur GTP",

		},
		recruteur: {
			0: "Il n'y a aucun recruteur GTP",

		},
		graphiste: {
	    227608: "BEZOO3 GTP",
            151442: "AlphaDesign GTP",
            250024: "U.Y.N GTP",
            382544: "Swaye GTP"
		},
		redacteur: {
	    434997: "Romain GTP",
            390325: "Ange GTP",
            157748: "Dynkaa GTP",
            424544: "Hualyrä GTP",
            423698: "Shazam GTP",
            480825: "Dino GTP",
            160871: "Zizou GTP",
            263723: "ToziKz GTP",
            146051: "Loucasse GTP",
            205553: "Roway GTP",
            536203: "Djeny GTP"

		},
		tlm: {
            56393: "Veenox GTP",
            115344: "Snizah GTP",
            227608: "BEZOO3 GTP",
            151442: "AlphaDesign GTP",
            382544: "Swaye GTP",
            250024: "U.Y.N GTP",
            434997: "Romain GTP",
            414999: "LZD GTP",
            390325: "Ange GTP",
            157748: "Dynkaa GTP",
            424544: "Hualyrä GTP",
            423698: "Shazam GTP",
            480825: "Dino GTP",
            160871: "Zizou GTP",
            263723: "ToziKz GTP",
            146051: "Loucasse GTP",
            205553: "Roway GTP",
            536203: "Djeny GTP"
        }
	};

	var grade = ["fondateur", "admin", "modo", "recruteur", "graphiste", "redacteur", "tlm"];
	function btfy_grade(_grade){
		if (_grade == "fondateur") {
			return "Fondateurs";
		} else if (_grade == "admin") {
			return "Administrateurs";
		} else if (_grade == "modo") {
			return "Modérateurs";
		} else if (_grade == "recruteur") {
			return "Recruteurs";
		} else if (_grade == "redacteur") {
			return "Rédacteurs";
		} else if (_grade == "graphiste") {
			return "Graphiste";
		} else if (_grade == "tlm") {
			return "GTP";
		}
	}
	function evron(_grade){
		var users = "";
		for(var i in user[_grade]){
			users += '[USER='+ i + ']@' + user[_grade][i].replace(/\'/g, "\\'") + '[/USER] ';
		}
		return users;
	}
	if(location.pathname.indexOf('threads') != -1){
		$('#QuickReply').find('.submitUnit').after('<ul id="tag_usr" class="messageInfo primaryContent" style="margin:10px;display:inline-flex;width:99%;"></ul>');
	}
	else if(location.pathname.indexOf('create-thread') != -1){
		$('dl.submitUnit').eq(0).after('<ul id="tag_usr" class="messageInfo primaryContent" style="margin:10px;display:inline-flex;width:99%;"></ul>');
	}
	$('#tag_usr').hide();
	for(var i in grade){
		var _grade = grade[i];
		$('#tag_usr').append('<ul id="' + _grade + '" style="display:inline-block;margin:10px;"><h1 onclick="var actual_txt=$(\'iframe.redactor_textCtrl\').contents().find(\'body\').html();var rl=\'<br/>\';$(\'iframe.redactor_textCtrl\').contents().find(\'body\').html(actual_txt + rl + \'' + evron(_grade) + '\');$(\'iframe.redactor_textCtrl\').contents().find(\'body\').select();$(\'iframe.redactor_textCtrl\').contents().find(\'body\').focus();" style="cursor:pointer;font-size: 13pt;font-family: \'Open sans condensed\',\'Arial\',sans-serif;color: rgb(51,51,51);">' + btfy_grade(_grade) +'</h1></ul>');
		for(var g in user[_grade]){
			$('#' + _grade).append('<li style="margin:5px;cursor:pointer;" id="user_single" onclick="var actual_txt=$(\'iframe.redactor_textCtrl\').contents().find(\'body\').html();var rl=\'<br/>\';$(\'iframe.redactor_textCtrl\').contents().find(\'body\').html(actual_txt + \'[USER=' + g + ']@' + user[_grade][g] + '[/USER]\');$(\'iframe.redactor_textCtrl\').contents().find(\'body\').select();$(\'iframe.redactor_textCtrl\').contents().find(\'body\').focus();">' + user[_grade][g] + '</li>');
		}
	}
	$('#tagjs').on('click', function(){
		$('#tag_usr').slideToggle();
	});
});