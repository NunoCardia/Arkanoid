"use strict";

(function()
{	
	window.addEventListener("load", main);
}());

function main()
{
	var btn = document.getElementById("back");
	btn.addEventListener("click", btnHandler);
}

function btnHandler(ev)
{
	var btnClicado = ev.target.id;
	
	ev.target.removeEventListener("click", btnHandler);

	var mainWindow = window.parent;
	
	mainWindow.postMessage("From about to main",'*');
}