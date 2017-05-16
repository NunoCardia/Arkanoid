"use strict";

(function()
{	
	window.addEventListener("load", main);
}());

function main()
{
	var btn = document.getElementsByTagName("nav")[0];
	btn.addEventListener("click", btnHandler);
}

function btnHandler(ev)
{
	var btnClicado = ev.target.id;
	
	ev.target.removeEventListener("click", btnHandler);

	var mainWindow = window.parent;
	
	switch(btnClicado){
		case "play":
			mainWindow.postMessage("Play",'*');
			break;
		case "scores":
			mainWindow.postMessage("Ranking", '*');
			break;
		case "about":
			mainWindow.postMessage("About - Main Menu", '*');
			break;
	}
}