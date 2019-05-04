// ==UserScript==
// @name WME URComments Brazilian Portuguese List
// @description    Este é o script da lista de comentários em português do brasil que será usado em outro script: URComments.
// @namespace      RickZabel@gmail.com
// @grant          none
// @grant          GM_info
// @version        0.0.31
// @match          https://editor-beta.waze.com/*editor*
// @match          https://beta.waze.com/*editor*
// @match          https://www.waze.com/*editor*
// @match          https://editor-beta.waze.com/*editor/*
// @match          https://beta.waze.com/*editor/*
// @match          https://www.waze.com/*editor/*
// @author         Rick Zabel '2014
// @license        MIT/BSD/X11
// @icon			data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAwCAYAAACFUvPfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQyQjZDNjdEODYzODExRTRBRDY0Q0I2QjA1MjU4N0EyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQyQjZDNjdFODYzODExRTRBRDY0Q0I2QjA1MjU4N0EyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDJCNkM2N0I4NjM4MTFFNEFENjRDQjZCMDUyNTg3QTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDJCNkM2N0M4NjM4MTFFNEFENjRDQjZCMDUyNTg3QTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6++Bk8AAANOElEQVR42tRZ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
// ==/UserScript==

/* Changelog
 * Atualização da tradução
 * 0.0.1 - initial version
 */
//I will try not to update this file but please keep a external backup of your comments as the main script changes this file might have to be updated. When the custom comments file is auto updated you will loose your custom comments. By making this a separate script I can try to limit how often this would happen but be warned it will eventually happen.
//if you are using quotes in your titles or comments they must be properly escaped. example "Comment \"Comment\" Comment",
//if you wish to have blank lines in your messages use \n\n. example "Line1\n\nLine2",
//if you wish to have text on the next line with no spaces in your message use \n. example "Line1\nLine2",
//Custom Configuration: this allows your "reminder", and close as "not identified" messages to be named what ever you would like.
//the position in the list that the reminder message is at. (starting at 0 counting titles, comments, and ur status). in my list this is "4 day Follow-Up"
window.UrcommentsBrazilianPortugueseReminderPosistion = 3;

//this is the note that is added to the the reminder link  option
window.UrcommentsBrazilianPortugueseReplyInstructions = 'Para responder, por favor use o aplicativo do Waze ou vá para '; //'To reply, please either use the Waze app or go to ' - followed by the URL - superdave, rickzabel, t0cableguy 3/6/2015

//the position of the close as Not Identified message (starting at 0 counting titles, comments, and ur status). in my list this is "7th day With No Response"
window.UrcommentsBrazilianPortugueseCloseNotIdentifiedPosistion = 38;

//Isto é a lista padrão dos tipos de UR's do Waze. Edite esta lista para cruzar com os títulos usados em sua área!
//Você deve ter estes títulos em sua lista para a inserção do texto automático funcionar!
window.UrcommentsBrazilianPortuguesedef_names = [];
window.UrcommentsBrazilianPortuguesedef_names[6] = "Curva incorreta"; //"Incorrect turn";
window.UrcommentsBrazilianPortuguesedef_names[7] = "Endereço incorreto"; //"Incorrect address";
window.UrcommentsBrazilianPortuguesedef_names[8] = "Rota incorreta"; //"Incorrect route";
window.UrcommentsBrazilianPortuguesedef_names[9] = "Faltando rotatória"; //"Missing roundabout";
window.UrcommentsBrazilianPortuguesedef_names[10] = "Erro geral"; //"General error";
window.UrcommentsBrazilianPortuguesedef_names[11] = "Curva não permitida"; //"Turn not allowed";
window.UrcommentsBrazilianPortuguesedef_names[12] = "Junção incorreta"; //"Incorrect junction";
window.UrcommentsBrazilianPortuguesedef_names[13] = "Faltando ponte"; //"Missing bridge overpass";
window.UrcommentsBrazilianPortuguesedef_names[14] = "Sentido incorreto"; //"Wrong driving direction";
window.UrcommentsBrazilianPortuguesedef_names[15] = "Faltando saída"; //"Missing Exit";
window.UrcommentsBrazilianPortuguesedef_names[16] = "Faltando rua"; //"Missing Road";
window.UrcommentsBrazilianPortuguesedef_names[18] = "Faltando marcação"; //"Missing Landmark";
window.UrcommentsBrazilianPortuguesedef_names[19] = "Rua bloqueada"; //"Blocked Road";
window.UrcommentsBrazilianPortuguesedef_names[21] = "Faltando nome da rua"; //"Missing Street Name";
window.UrcommentsBrazilianPortuguesedef_names[22] = "Prefixo ou sufixo incorreto da rua"; //"Incorrect Street Prefix or Suffix";
window.UrcommentsBrazilianPortuguesedef_names[23] = "Velocidade máxima incorreta"; //"Missing or invalid speed limit";


//abaixo está todo o texto que é mostrado ao usuário enquanto ele utiliza o script
window.UrcommentsBrazilianPortugueseURC_Text = [];
window.UrcommentsBrazilianPortugueseURC_Text_tooltip = [];
window.UrcommentsBrazilianPortugueseURC_USER_PROMPT = [];
window.UrcommentsBrazilianPortugueseURC_URL = [];

//Links de aproximar o zoom
window.UrcommentsBrazilianPortugueseURC_Text[0] = "Aproximar 0 e fechar a UR";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[0] = "Aproximar tudo e fechar as janelas de UR";

window.UrcommentsBrazilianPortugueseURC_Text[1] = "Aproximar 2 e fechar UR";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[1] = "Aproximar ao nível 2 e fechar as janelas de UR";

window.UrcommentsBrazilianPortugueseURC_Text[2] = "Aproximar 3 e fechar UR";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[2] = "Aproximar ao nível 3 e fechar as janelas de UR";

window.UrcommentsBrazilianPortugueseURC_Text_tooltip[3] = "Recarregar a janela";

window.UrcommentsBrazilianPortugueseURC_Text_tooltip[4] = "Quantidade de UR's sendo mostradas";

//Nome das abas
window.UrcommentsBrazilianPortugueseURC_Text[5] = "Lista dos Comentários";
window.UrcommentsBrazilianPortugueseURC_Text[6] = "Filtros";
window.UrcommentsBrazilianPortugueseURC_Text[7] = "Configurações";

//Aba da filtragem de UR
window.UrcommentsBrazilianPortugueseURC_Text[8] = "Clique aqui para instruções";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[8] = "Instruções para filtragem de UR";
window.UrcommentsBrazilianPortugueseURC_URL[8] = "https://docs.google.com/presentation/d/1zwdKAejRbnkUll5YBfFNrlI2I3Owmb5XDIbRAf47TVU/edit#slide=id.p";


window.UrcommentsBrazilianPortugueseURC_Text[9] = "Habilitar filtragem de UR";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[9] = "Habilite ou desabilite filtragem de UR's";

window.UrcommentsBrazilianPortugueseURC_Text[10] = "Habilitar contagem de UR";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[10] = "Habilite ou desabilite contagem de UR's";

window.UrcommentsBrazilianPortugueseURC_Text[12] = "Habilitar UR que estiver aguardando resposta";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[12] = "Habilite ou desabilite UR's que estiverem aguardando resposta de usuário/repórter";

window.UrcommentsBrazilianPortugueseURC_Text[13] = "Habilitar apenas minhas UR's";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[13] = "Habilite ou desabilite suas UR's que você não comentou";

window.UrcommentsBrazilianPortugueseURC_Text[14] = "Habilitar UR's dos outros necessários lembrete + fechar";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[14] = "Habilite ou desabilite UR's que foram comentadas pelo lembrete automático e configurar a data para fechar";

window.UrcommentsBrazilianPortugueseURC_Text[15] = "Habilitar lembretes necessários de UR's";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[15] = "Habilite ou desabilite UR's onde os lembretes são necessários";

window.UrcommentsBrazilianPortugueseURC_Text[16] = "Habilitar UR's respondidas pelo usuário";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[16] = "Habilite ou desabilite UR's com respostas do usuários/repórter";

window.UrcommentsBrazilianPortugueseURC_Text[17] = "Habilitar UR's que precisam ser fechadas";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[17] = "Habilite ou desabilite UR's que precisam ser fechadas";

window.UrcommentsBrazilianPortugueseURC_Text[18] = "Habilitar UR's sem comentários";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[18] = "Habilite ou desabilite UR's que não contém comentários";

window.UrcommentsBrazilianPortugueseURC_Text[19] = "Habilitar UR's com nenhum comentário na descrição";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[19] = "Habilite ou desabilite UR's que não contém descrição ou comentário";

window.UrcommentsBrazilianPortugueseURC_Text[20] = "Habilitar UR's com nenhum comentário, porém, com descrição";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[20] = "Habilite ou desabilite UR's que tem descrição, mas sem comentários";

window.UrcommentsBrazilianPortugueseURC_Text[21] = "Habilitar UR's fechadas";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[21] = "Habilite ou desabilite UR's fechadas";

window.UrcommentsBrazilianPortugueseURC_Text[22] = "Habilitar UR's marcadas";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[22] = "Habilite ou desabilite UR's que foram marcadas por marcação do URO+ ex. [NOTE]";

window.UrcommentsBrazilianPortugueseURC_Text[23] = "Dias para lembrete: ";

window.UrcommentsBrazilianPortugueseURC_Text[24] = "Dias para encerrar: ";

//settings tab
window.UrcommentsBrazilianPortugueseURC_Text[25] = "Auto completar novas UR's";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[25] = "Auto completar com comentário novas UR's que não contenham comentários";

window.UrcommentsBrazilianPortugueseURC_Text[26] = "Auto lembrar comentários de UR's";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[26] = "Auto lembrar a UR que contenham apenas um comentário pelo prazo configurado";

window.UrcommentsBrazilianPortugueseURC_Text[27] = "Auto aproximar em uma nova UR";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[27] = "Auto aproximar quando abrir UR's sem comentários e quando enviar mensagens de aviso";

window.UrcommentsBrazilianPortugueseURC_Text[28] = "Auto centralizar UR";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[28] = "Auto centralizar o mapa com a mesma aproximação e com a aproximação menos de 3";

window.UrcommentsBrazilianPortugueseURC_Text[29] = "Auto clicar em abrir, resolvido e não identificado";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[29] = "Suprimir a mensagem sobre recentes questões para os repórteres e então depender da opção configurada para aquele comentário clicando Abrir, Resolvido, Não Identificado";

window.UrcommentsBrazilianPortugueseURC_Text[30] = "Auto salvar depois de resolver ou não identificar com comentário";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[30] = "Se auto click Abrir, Resolvido e Não Identificado está também marcado, está opção irá clicar o botão de salvador depois de clicar em uma UR e então o botão de salvar";

window.UrcommentsBrazilianPortugueseURC_Text[31] = "Auto fechar janela da UR";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[31] = "Para UR's que não são necessárias salvar isto irá fechar depois de clicar no UR-Comment, e então o botão de salvar";

window.UrcommentsBrazilianPortugueseURC_Text[32] = "Auto atualizar o mapa depois de comentar";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[32] = "Atualizar o mapa depois de clicar com UR-Comment, e então botão de salvar. Isto não se aplicar a nenhuma mensagem que precisa ser salva, enquando salva be saved, já que salvar automaticamente carrega o mapa. Geralmente isto não é necessário mas eu estou deixando isto em caso do Waze faça mudanças";

window.UrcommentsBrazilianPortugueseURC_Text[33] = "Auto distanciar depois do comentário";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[33] = "After clicking on a UR-Comment in the list and clicking send on the UR the map zoom will be set back to your previous zoom";

window.UrcommentsBrazilianPortugueseURC_Text[34] = "Auto switch to the UrComments tab";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[34] = "Auto switch to the URComments tab when opening a UR, when the UR window is closed you will be switched to your previous tab";

window.UrcommentsBrazilianPortugueseURC_Text[35] = "Close message - double click link (auto send)";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[35] = "Add an extra link to the close comment when double clicked will auto send the comment to the UR windows and click send, and then will launch all of the other options that are enabled";

window.UrcommentsBrazilianPortugueseURC_Text[36] = "All comments - double click link (auto send)";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[36] = "Add an extra link to each comment in the list that when double clicked will auto send the comment to the UR windows and click send, and then will launch all of the other options that are enabled";

window.UrcommentsBrazilianPortugueseURC_Text[37] = "Comment List";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[37] = "This shows the selected comment list. There is support for a custom list. If you would like your comment list built into this script or have suggestions on the Comments team’s list, please contact me at rickzabel @waze or @gmail";

window.UrcommentsBrazilianPortugueseURC_Text[38] = "Disable done / next buttons";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[38] = "Disable the done / next buttons at the bottom of the new UR window";

window.UrcommentsBrazilianPortugueseURC_Text[39] = "Unfollow UR after send";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[39] = "Unfollow UR after sending comment";

window.UrcommentsBrazilianPortugueseURC_Text[40] = "Auto send reminders";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[40] = "Auto send reminders to my UR as they are on screen";

window.UrcommentsBrazilianPortugueseURC_Text[41] = "Replace tag name with editor name";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[41] = "When a UR has the logged in editors name in the description or any of the comments of the UR (not the name Waze automatically add when commenting) replace the tag type with the editors name";

window.UrcommentsBrazilianPortugueseURC_Text[42] = "(Double Click)"; //double click to close links
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[42] = "Double click here to auto send - ";

window.UrcommentsBrazilianPortugueseURC_Text[43] = "Dont show tag name on pill";
window.UrcommentsBrazilianPortugueseURC_Text_tooltip[43] = "Dont show tag name on pill where there is a URO tag";


window.UrcommentsBrazilianPortugueseURC_USER_PROMPT[0] = "UR Comments - You either have a older version of the custom comments file or a syntax error either will keep the custom list from loading. Missing: ";

window.UrcommentsBrazilianPortugueseURC_USER_PROMPT[1] = "UR Comments - You are missing the following items from your custom comment list: ";

window.UrcommentsBrazilianPortugueseURC_USER_PROMPT[2] = "List can not be found you can find the list and instructions at https://wiki.waze.com/wiki/User:Rickzabel/UrComments/";

window.UrcommentsBrazilianPortugueseURC_USER_PROMPT[3] = "URComments - You can not set close days to zero";

window.UrcommentsBrazilianPortugueseURC_USER_PROMPT[4] = "URComments - To use the double click links you must have the Auto click open, solved, not identified option enabled";

window.UrcommentsBrazilianPortugueseURC_USER_PROMPT[5] = "URComments - Aborting FilterURs2 because both filtering, counts, and auto reminders are disabled";

window.UrcommentsBrazilianPortugueseURC_USER_PROMPT[6] = "URComments: Loading UR data has timed out, retrying."; //this message is shown across the top of the map in a orange box, length must be kept short

window.UrcommentsBrazilianPortugueseURC_USER_PROMPT[7] = "URComments: Adding reminder message to UR: "; //this message is shown across the top of the map in a orange box, length must be kept short

window.UrcommentsBrazilianPortugueseURC_USER_PROMPT[8] = "URComment's UR Filtering has been disabled because URO+\'s UR filters are active."; //this message is shown across the top of the map in a orange box, length must be kept short

window.UrcommentsBrazilianPortugueseURC_USER_PROMPT[9] = "UrComments has detected that you have unsaved edits!\n\nWith the Auto Save option enabled and with unsaved edits you cannot send comments that would require the script to save. Please save your edits and then re-click the comment you wish to send.";

window.UrcommentsBrazilianPortugueseURC_USER_PROMPT[10] = "URComments: Can not find the comment box! In order for this script to work you need to have a UR open."; //this message is shown across the top of the map in a orange box, length must be kept short

window.UrcommentsBrazilianPortugueseURC_USER_PROMPT[11] = "URComments - This will send reminders at the reminder days setting. This only happens when they are in your visible area. NOTE: when using this feature you should not leave any UR open unless you had a question that needed an answer from the wazer as this script will send those reminders."; //conformation message/ question


//The comment array should follow the following format,
// "Title",     * is what will show up in the URComment tab
// "comment",   * is the comment that will be sent to the user currently
// "URStatus"   * this is action to take when the option "Auto Click Open, Solved, Not Identified" is on. after clicking send it will click one of those choices. usage is. "Open", or "Solved",or "NotIdentified",
// to have a blank line in between comments on the list add the following without the comment marks // there is an example below after "Thanks for the reply"
// "<br>",
// "",
// "",

//BrazilianPortuguese list
window.UrcommentsBrazilianPortugueseArray2 = [
//Cor sugerida para as respostas automáticas na categoria "Solved", verde.
//Cor sugerida para as respostas automáticas na categoria "NotIdentified", preto.
//Cor sugerida para as respostas automáticas na categoria "Open", amarelo.
               "Primeiro contato",
               "Olá Wazer, qual foi o erro no mapa?",
               "Open",

               "Buscar participação (24 horas sem resposta)",
               "Aguardo seu detalhamento para o problema reportado. Caso contrário, em até 24 h, este pedido de atualização será encerrado, em razão da ausência de informação pelo usuário e inatividade de tempo, impossibilitando a correção do erro, conforme solicitado.",
               "Open",

               "Procurar detalhamento do erro",
               "Olá Wazer, poderia me dar mais detalhes sobre o erro relatado? Quanto mais informações, mais chance de corrigir o possível erro.",
               "Open",

               "Pedido de ponto de origem e destino",
               "Olá Wazer, poderia me informar o destino digitado por você no aplicativo? Qual seria o ponto de origem? Para eu realizar alguns testes e verificar possíveis erros nas rotas.",
               "Open",

               "Nome de rua errado",
               "Olá Wazer, qual o nome que está incorreto no mapa e qual seria o nome correto? Sabe nos informar o CEP? Respondendo todas perguntas você facilitará a resolução do possível erro.",
               "Open",

               "Erro de numeração na via",
               "Olá Wazer, qual via está com a numeração incorreta? Qual era o número que você procurava? Onde você alertou é o local exato da numeração correta sugerida por você? Respondendo todas perguntas você facilitará a resolução do possível erro.",
               "Open",

               "Buscar informação de via bloqueada",
               "Olá Wazer, qual o nome da via que está bloqueada? Qual trecho exato do bloqueio? O bloqueio impede totalmente a circulação do tráfego? O bloqueio dura todo o dia ou são apenas alguns períodos diários ou depende da necessidade gerenciada pela prefeitura? Por quanto tempo irá durar o bloqueio? Respondendo todas perguntas você facilitará a resolução do possível erro.",
               "Open",

               "Buscar informação de radar",
               "Olá Wazer, sabe informar qual tipo de radar é este, velocidade ou semafórico ou falso? Qual a velocidade permitida na via? Se a via ser mão dupla, há também radar no lado oposto? O radar está exatamente onde alertou? Respondendo todas perguntas você facilitará a resolução do possível erro.",
               "Open",

               "Correção iniciada",
               "Olá Wazer, começamos o processo para corrigir o problema. Desde já agradeço pelo seu alerta de erro no mapa! Deixarei aberto o alerta para avisar de novidade ou até a resolução do erro.",
               "Open",

                "Conversão incorreta",
		"Olá Wazer, poderia especificar em qual conversão foi o problema? Foi uma mudança recente e/ou permanente? Respondendo todas perguntas você facilitará a resolução do possível erro.",
                "Open",

                "Sentido de condução incorreto",
                "Olá Wazer, por favor me informa qual sentido é o correto da via? Houve alteração recente? Será permanente? Qual o nome da via? É toda a via ou apenas um trecho dela? Respondendo todas perguntas você facilitará a resolução do possível erro.",
                "Open",

                "Erro na melhor rota",
                "Olá Wazer, o algoritmo utilizado pelo aplicativo irá sugerir por padrão, a rota mais rápida, podendo sugerir outras duas rotas alternativas mais. Depois de uma análise, verifiquei que não há erros no mapa. Existe algum fato relevante, como rua não pavimentada, a ser levantada para uma consideração final?",
                "Open",

                "<br>",
                "",
                "",

                "Análise não identificou erros",
                "Olá Wazer, realizei uma análise na área onde criou o alerta e não identifiquei nenhum erro que seja passível de correção. Irei encerrar como não identificado. Caso tiver mais erros não hesite em alertar, existem editores que acompanham o mapa e o fórum. Sabia que você também pode ajudar a comunidade editando os mapas e deixando sua região atualizada? Mais informações em: http://bit.ly/NovatoWaze",
                "NotIdentified",

                "Sem participação do Wazer",
                "Olá Wazer, não conseguiremos resolver o problema sem sua colaboração. Este alerta será encerrado por ter ficado um grande período inativo. Caso tenha alguma dúvida pode nos contatar através do fórum de editores. Sabia que você também pode ajudar nossa comunidade editando os mapas e deixando sua região atualizada? Mais informações em: http://bit.ly/NovatoWaze",
                "NotIdentified",

                "Atualização manual do mapa",
                "Olá Wazer, o erro me parece que já foi corrigido. Agora é necessário esperar cerca de uma semana para o servidor atualizar, caso queira acompanhar, a sigla é INTL. O site é este: https://status.waze.com/ Caso tiver mais erros não hesite em alertar, existem editores que acompanham o mapa e o fórum. Caso o erro persistir mais de uma semana após esta mensagem, entre em contato novamente. Para forçar a atualização do mapa vá em Menu > Configurações > Geral > Atualizar mapa da minha área. Você também pode tentar limpar o cache do aplicativo no gerenciador do seu smartphone.",
                "NotIdentified",

                "Locais errados no Google Maps",
                "Olá Wazer, pela minha análise este local já está correto no Waze. O problema está no Google Maps, o qual o Waze também usa para sugerir resultados. Prefira sempre os resultados do próprio Waze. Quando o resultado errado vem de alguma fonte externa (em geral, Google), a correção deverá ser feita diretamente no editor dessa fonte da informação. Conheça o nosso fórum e participe dele: http://forum.wazebrasil.com",
                "NotIdentified",

                "Erros de localização (aplicativos de corrida)",
                "Olá Wazer, pela minha análise este local já está correto no Waze. O problema está no Google Maps, o qual aplicativos de motoristas, como o app Uber, utiliza coordenadas para rotear no Waze. Este erro é comum para locais de grande áreas ou vias muito próximas. Você pode confirmar o que eu falo digitando o endereço ou nome do local no Waze e verá que a localização cairá no local correto. Quando o resultado errado vem de alguma fonte externa (em geral, Google), a correção deverá ser feita diretamente no editor dessa fonte da informação. Sabia que você também pode ajudar a comunidade editando os mapas e deixando sua região atualizada? Mais informações em: http://bit.ly/NovatoWaze",
                "NotIdentified",

                "Barricada permanente do crime organizado",
                "Olá Wazer, infelizmente neste caso os editores voluntários nada podem fazer, pois, em regra, apenas podemos realizar mudanças que sejam oficiais, ou seja, uma interdição programada pela prefeitura. Portanto, não será recomendável adicionar uma barricada no mapa. Agradeço sua compreensão. O alerta será encerrado como não identificado. Caso tiver mais erros não hesite em alertar, existem editores que acompanham o mapa e o fórum. Sabia que você também pode ajudar a comunidade editando os mapas e deixando sua região atualizada? Mais informações em: http://bit.ly/NovatoWaze",
                "NotIdentified",

                "Feriado",
                "Olá Wazer, o Waze não trabalha com o esquema de feriados. Nós, editores voluntários, temos como identificar e programar mudanças em fins de semana, mas, para feriado não conseguimos por não existir uma programação local de feriados no banco de dados. Esta programação irá exigir um grande consumo de tempo já que existem vários feriados diferentes para os mais de 5500 municípios brasileiros, fora os estaduais e federais, falando apenas de Brasil sem considerar os feriados pelo mundo a fora. OSabia que você também pode ajudar a comunidade editando os mapas e deixando sua região atualizada? Mais informações em: http://bit.ly/NovatoWaze",
                "NotIdentified",

                "Bloqueio temporário",
                "Olá Wazer, agradeço o alerta mas não há erro no mapa, neste caso é necessário alertar interdição no próprio app. Para mais informações: http://bit.ly/AlertarInterdicoes",
                "NotIdentified",

                "Erro GPS (proximidade de vias)",
                "Olá Wazer, pela proximidade das vias o Waze pode ter confundido a rota, porém, ele irá recalcular automaticamente se você seguir a sua rota ou alterar a rota sugerida pelo app. Felizmente não há erro no mapa neste caso, apenas uma pequena confusão do GPS. Sabia que você também pode ajudar nossa comunidade editando os mapas e deixando sua região atualizada? Mais informações em: http://bit.ly/NovatoWaze",
                "NotIdentified",

                "Desvios mínimos",
                "Olá Wazer, o Waze utiliza a região com base na sua origem e destino para calcular a cada minuto rotas que permitem chegar mais rápido ao seu destino. Às vezes o próprio app, utilizando seu algoritmo, entende que desvios mínimos terão vantagem para chegar no seu destino final. Felizmente, isso não é um erro no mapa e muito menos no aplicativo. Você pode também pode escolher em respeitar ou não as rotas pré determinadas pelo Waze, caso achar desnecessário, utilize a sua. Exemplo: um acidente aconteceu, porém a via já está fluindo, e o app ainda entende que há trânsito, casos desses acontecem, infelizmente. Agradeço seu alerta. Sabia que você também pode ajudar nossa comunidade editando os mapas e deixando sua região atualizada? Mais informações em: http://bit.ly/NovatoWaze",
                "NotIdentified",

                "Mapa não carrega",
                "Olá Wazer, felizmente o que alertou não é um erro do mapa. Para seu caso em específico a dica que dou nestes casos é forçar a atualização do mapa limpando o cache no seu aparelho. Depois de realizar a limpeza e garantir que existe espaço suficiente (imagens e vídeos consomem muito espaço). Para forçar a atualização do mapa, acesse: Menu > Configurações > Geral > Atualizar mapa da minha área. Recomenda-se usar uma conexão Wi-Fi neste processo, já que ele pode consumir uma grande quantidade de dados. Se você faz uso de aplicativos cleaners em seu celular, ele pode ser a causa, pois pode estar apagando os arquivos do mapa. Você pode procurar no próprio app uma maneira de não apagar os arquivos do Waze para que ele possa funcionar corretamente. Para outras questões sobre o funcionamento do aplicativo, por favor procure a página de suporte: http://support.google.com/waze Sabia que você também pode ajudar nossa comunidade editando os mapas e deixando sua região atualizada? Mais informações em: http://bit.ly/NovatoWaze",
                "NotIdentified",

                "Erro sinal do GPS",
                "Olá Wazer, infelizmente, nesta situação, não há nada de errado com o mapa que possa estar provocando esses defeitos no aplicativo. O suporte do Google tem um artigo sobre este erro, quem sabe resolverá este problema? Acesse: https://support.google.com/waze/answer/6083679?hl=pt-BR Caso não resolver, há relatos na internet que o erro pode ocorrer com a oscilação da internet com a rede 3G, funcionando corretamente apenas nas redes 2G,4G ou superiores, portanto se alterando na configuração do seu celular para 2G, o erro irá solucionar. Lembre-se de retornar as configurações, pois, os dados móveis podem ficar comprometidos parcialmente. Sabia que você também pode ajudar nossa comunidade editando os mapas e deixando sua região atualizada? Mais informações em: http://bit.ly/NovatoWaze",
                "NotIdentified",

                "Lado da rua incorreto (numeração)",
                "Olá Wazer, o aplicativo ainda não tem essa funcionalidade. Ele te direciona para o local exato, mas não te diz o lado correto. Caso tenha alguma dúvida pode nos contatar através do fórum de editores. Sabia que você também pode ajudar nossa comunidade editando os mapas e deixando sua região atualizada? Mais informações em: http://bit.ly/NovatoWaze",
                "NotIdentified",

                "<br>",
                "",
                "",

               "Resolvido",
               "Olá Wazer, gostaria de agradecer a ajuda que realizou na comunidade Waze. Você acaba de ajudar outros motoristas, como você! Agora é necessário esperar cerca de uma semana para o servidor atualizar, caso queira acompanhar, a sigla é INTL. O site é este: https://status.waze.com/ Caso tiver mais erros não hesite em alertar, existem editores que acompanham o mapa e o fórum. Sabia que você também pode ajudar a comunidade editando os mapas e deixando sua região atualizada? Mais informações em: http://bit.ly/NovatoWaze",
               "Solved"

//End of Default URs
];
//end BrazilianPortuguese list