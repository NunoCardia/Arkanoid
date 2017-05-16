"use strict";

(function()
{	
	window.addEventListener("load", main);
}());

function main()
{
	var comecar = document.getElementById("start");
	comecar.addEventListener("click", comecarEvento);
}

function comecarEvento(ev){
	ev.target.removeEventListener("click", comecarEvento);

	var mainWindow = window.parent;
	
	mainWindow.postMessage("Menu", '*');
}