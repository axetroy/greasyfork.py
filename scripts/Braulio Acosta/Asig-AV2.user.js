// ==UserScript==
// @name        Asig-AV2
// @namespace   sga-matr
// @include     http://virtual.amag.edu.pe/
// @version     1
// @grant       none
// @require     https://code.jquery.com/jquery-3.2.1.min.js
// @require     https://code.jquery.com/ui/1.12.1/jquery-ui.js
// @description jejejejejeje
// ==/UserScript==

function _opc(id_curso) {
	var caja = "<nav class='opciones-curso'>";

	caja += "<a href='http://virtual.amag.edu.pe/course/edit.php?id=" + id_curso + "'><img src='https://i.imgur.com/09STGb4.png' title = 'Editar ajustes'></a>"; //editar ajustes
	caja += "<a href='http://virtual.amag.edu.pe/enrol/users.php?id=" + id_curso + "'><img src='https://i.imgur.com/i0yv9tk.png' title = 'Usuarios matriculados'></a>"; //Usuarios matriculados
	caja += "<a href='http://virtual.amag.edu.pe/group/index.php?id=" + id_curso + "'><img src='https://i.imgur.com/OxB4vQ2.png' title = 'Grupos'></a>"; //Grupos
	caja += "<a href='http://virtual.amag.edu.pe/group/overview.php?id=" + id_curso + "'><img src='https://i.imgur.com/GPtITfE.png' title = 'Visión general de grupos'></a>"; //Visión general
	caja += "<a href='http://virtual.amag.edu.pe/report/log/index.php?id=" + id_curso + "'><img src='https://i.imgur.com/ljILNM1.png' title = 'Logs'></a>"; //Logs
	caja += "<a href='http://virtual.amag.edu.pe/grade/report/index.php?id=" + id_curso + "'><img src='https://i.imgur.com/SBtAxYG.png' title = 'Calificaciones'></a>"; //Calificaciones
	caja += "<a href='http://virtual.amag.edu.pe/grade/edit/tree/index.php?id=" + id_curso + "'><img src='https://i.imgur.com/LEyvX3V.png' title = 'Configuración de calificaciones'></a>"; //Configuración de calificaciones
	caja += "<a href='http://virtual.amag.edu.pe/question/edit.php?courseid=" + id_curso + "'><img src='https://i.imgur.com/fyEThrm.png' title = 'Preguntas'></a>"; //Preguntas
	caja += "<a href='http://virtual.amag.edu.pe/question/category.php?courseid=" + id_curso + "'><img src='https://i.imgur.com/7SwOcug.png' title = 'Categorías de preguntas'></a>"; //Categorías
	caja += "<a href='http://virtual.amag.edu.pe/question/import.php?courseid=" + id_curso + "'><img src='https://i.imgur.com/AertZ4z.png' title = 'Importar preguntas'></a>"; //Importar

	caja += "</nav>";

	return caja;
}

$(document).ready(function() {


	$(".coursebox").each(function() {
		var id_curso = $(this).attr("data-courseid");

		//$(this).append("<h1>" + id_curso + "</h1>");
		$(this).append(_opc(id_curso));
	});

	$(".opciones-curso").css({
		outline: "1px solid rgba(0,0,0,0.2)",
		"background-color": "white",
		width: "100%",
		position: "absolute",
		height: "25px",
		bottom: "-25px",
		clear: "both",
		display: "block"
	});
});


@namespace url(http://www.w3.org/1999/xhtml);

@-moz-document domain("amag.edu.pe") {
  input {
    min-height: 40px;
    max-width: 100%;
  }
  select, option {
    max-width: 100%;
  }
  .coursebox.even,.coursebox.odd {
    width: 40%;
  }
  .category-name {
    display: none;
  }
  .questionbankwindow {
    width: 100%;
  }
  .questiontext {
    white-space: normal !important;;
    overflow: visible !important;;
  }
  img.iconsmall {
    width: 10px !important;
  }
  .opciones-curso a img {
    width: 24px;
    margin: 4px;
    transition: 0.5s;
  }
  .opciones-curso a img:hover {
    width: 27px;
    transition: 0.5s;
  }
}