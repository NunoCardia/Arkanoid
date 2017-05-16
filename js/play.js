"use strict";

(function()
{	
	window.addEventListener("load", main);
}());

var modoEscolhido;
var nome;

function main()
{
	var btn = document.getElementById("back");
	btn.addEventListener("click", btnHandler);

	var modo = document.getElementById("mode");
	modo.addEventListener("change",funcBlur);
}

function btnHandler(ev)
{
	var btnClicado = ev.target.id;

	ev.target.removeEventListener("click", btnHandler);

	var mainWindow = window.parent;

	switch(btnClicado){
		case "back":
			mainWindow.postMessage("From play to main", '*');
			break;
		case "jogar":
			mainWindow.postMessage("Play to game", '*');
			break;
	}
}	

function funcBlur(el) {
	modoEscolhido = document.getElementById("mode").value;
	nome = document.getElementById("user").value;
	if(nome != "USERNAME" && modoEscolhido != ''){
		var jogar = document.getElementById("jogar");
		jogar.disabled = false;
		jogar.style.cursor = "pointer";
		
		document.styleSheets[0].addRule('button:hover', 'opacity: 0.6', 0);

		var btn = document.getElementsByTagName("nav")[0];
		btn.addEventListener("click", btnHandler);
	}
}

function voltou () {
	document.getElementById("user").style.color = "black";
	var jogar = document.getElementById("bt1");
	jogar.disabled = false;
	jogar.style.cursor = "pointer";
	
	document.styleSheets[0].addRule('button:hover', 'opacity: 0.6', 0);

	var btn = document.getElementsByTagName("back");
	btn.addEventListener("click", btnHandler);
}

//TODO: ADD PLAYERS TO FILE