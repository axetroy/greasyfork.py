// ==UserScript==
// @name         Refresh alertes / Conversations Auto
// @namespace    http://crystalmodding.net/*
// @version      1.3
// @description  try to take over the world!
// @author       Marentdu93 & Wells 
// @match        http://crystalmodding.net/*
// @grant        none
// ==/UserScript==
$(document).ready(function() {
	
	function checkConversationUpdate(){
		$BRLastMessage = $('input[name="last_date"]').val();
		$BrLastReplyDate = $(".statsList .DateTime").attr("data-time");
		if($BrLastReplyDate>$BRLastMessage){
			$BRLastMessage = $BrLastReplyDate;
		}
		$BRConversationId = 0;
		
		XenForo.ajax(
				"index.php?conversations/", 
				{
					last_message: $BRLastMessage,
					conversation_id: $BRConversationId,
					xfToken: $('#ctrl_xfToken').val()
				}, 
				
				function(json){
					if(XenForo.hasResponseError(json) !== false){				
						return true;
					}
					var $messageList = $('#messageList');
					
					new XenForo.ExtLoader(json, function()
					{
						$(json.BR_conversation_view_new_messages).each(function()
						{
							if (this.tagName)
							{
								$id = $(this).attr('id');
								
								if(!$messageList.find('#'+$id).length){
									$(this).xfInsert('appendTo', $messageList);
								}
								
							}
						});
					});
                    try {
                        document.getElementById('AjaxProgress').remove();
                    }
                    catch(exe){
                    }
					
					$BRLastDate = $(".messageList li:last-child  .DateTime:last-child").attr("data-time");
					$('input[name="last_date"]').val($BRLastDate);
					XenForo.activate(document);
				},
				{cache: false}
			);
        
	}
	

    
    
	$brTimeUpdate = 1000;
	setInterval(checkConversationUpdate,$brTimeUpdate);
});