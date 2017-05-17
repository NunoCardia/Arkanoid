"use strict";

(function()
{	
	window.addEventListener("load", main);
}());

function main()
{
	var btn = document.getElementsByTagName("nav")[0];
	btn.addEventListener("click", btnHandler);
    var btn2 = document.getElementById("soundLogo");
    btn2.addEventListener("click",handleSound);
    var btn3 = document.getElementById("exit");
    btn3.addEventListener("click",handleExit);
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

function handleSound(ev){
    
    var btnClicado = ev.target.id;
    var sound = document.getElementById("vol-control");
    if(sound.style.visibility == "hidden" || sound.style.visibility == ''){
        sound.style.visibility = "visible";   
    }
    else{
        sound.style.visibility = "hidden";
    }
}

function handleExit(ev){
    var btnClicado = ev.target.id;
    ev.target.removeEventListener("click", handleExit);
	var mainWindow = window.parent;
    
    if(btnClicado == "exit"){
        mainWindow.postMessage("Leave",'*');
    }
}