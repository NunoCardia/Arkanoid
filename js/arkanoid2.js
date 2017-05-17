window.addEventListener("load", init, false);

var tiempoIntervalo = 10;
var newLevelTime = 10000;

var screenWidth = screen.width;
var screenHeight = screen.height;
var canvas;
var gameWidth = screenWidth/2;
var gameHeight = screenHeight/100 *80;
var minX = 0;
var maxX = 0;
var totalWidth = 0;
var scoreSize = gameHeight/100*10;

var speedDownDebuff;
var blocks;
var initialRows = 4;
var nBlocks = 9;
var blockWidth = gameWidth / nBlocks;
var blockHeight = (gameHeight/100)*3;
var currentPlayer1;
var bar;
var bar2;
var k=0;
var balls = new Array();
var ballSpeed = 7;

var lifes = 3;
var points = 0;
var gameover = false;
var gameoverWidth = gameWidth/100*80;
var gameoverHeight = gameHeight/100*10;

var rewards = new Array();

var rewardTime = 7;
var extraBalls = 1;
var barBuffTime = 0;
var speedUpBuffTime = 0;
var barDebuffTime = 0;


var barImage = new Image();
var gameoverImage = new Image();
var blocksImage = new Array();
var buffsImage = new Array();
var ballImage = new Image();
var extraBallImagem = new Image();

var maxRewards = 50;


var mainSound = new Audio("../aux_files/Sounds/wind.mp3");
var otherSounds = [new Audio("../aux_files/Sounds/lose.wav"), new Audio("../aux_files/Sounds/choque.wav"), new Audio("../aux_files/Sounds/rompe1.wav"), new Audio("../aux_files/Sounds/rompe2.wav"), new Audio("../aux_files/Sounds/rompe3.wav"),
				new Audio("../aux_files/Sounds/rompe4.wav"), new Audio("../aux_files/Sounds/barra.wav"), new Audio("../aux_files/Sounds/laser.wav"), new Audio("../aux_files/Sounds/premio.wav"), new Audio("../aux_files/Sounds/gameover.wav") ];

function loadBlocks(){
    blocksImage[0] = new Image();
    blocksImage[0].src = "./../aux_files/Pictures/Block_1.png";
    blocksImage[1] = new Image();
    blocksImage[1].src = "./../aux_files/Pictures/Block_2.png";
    blocksImage[2] = new Image();
    blocksImage[2].src = "./../aux_files/Pictures/Block_3.png";
    blocksImage[3] = new Image();
    blocksImage[3].src = "./../aux_files/Pictures/Block_4.png";
    
}

function loadRewards(){
    buffsImage[0] = new Image();
    buffsImage[0].src = "./../aux_files/Pictures/power_up_Bola_Extra.png";
    buffsImage[1] = new Image();
    buffsImage[1].src = "./../aux_files/Pictures/power_up_Aumento.png";
    buffsImage[2] = new Image();
    buffsImage[2].src = "./../aux_files/Pictures/power_up_Fast.png";
    buffsImage[3] = new Image();
    buffsImage[3].src = "./../aux_files/Pictures/power_up_Life.png";
    buffsImage[4] = new Image();
    buffsImage[4].src = "./../aux_files/Pictures/power_up_Reduzir.png";
    buffsImage[5] = new Image();
    buffsImage[5].src = "./../aux_files/Pictures/power_up_Slow.png";
}


function init() {
	barImage.src="./../aux_files/Pictures/Paddle_B.png";
	gameoverImage.src = "./../aux_files/Pictures/GameOver.png";
    ballImage.src = "./../aux_files/Pictures/Ball_W.png";
    extraBallImagem.src = "./../aux_files/Pictures/Bola_Extra_Clara.png";
    loadBlocks();
    loadRewards();
	canvas = document.getElementById("game").getContext("2d");
	document.getElementById("game").width = gameWidth;
	document.getElementById("game").height = gameHeight;
    localStorage.setItem("gamemode","multiplayer");
	minX = $("#game").offset().left;
	maxX = minX + gameWidth;
    bar=new Bar();
    bar2 = new Bar();
	createBlocks();
	newBall();

	mainSound.play();

	window.requestAnimationFrame(drawCanvas);


    setInterval(function(){
		newLineBlocks();
	},5000);
    
	setInterval(function(){
		if(barBuffTime>0){
			barBuffTime--;
		}
	},1000);
    
    setInterval(function(){
		if(barDebuffTime>0){
			barDebuffTime--;
		}
	},1000);
    
    setInterval(function(){
        if(speedUpBuffTime>0){
            speedUpBuffTime--;
        }
    },1000);
    
    setInterval(function(){
        if(speedDownDebuff>0){
            speedDownDebuff--;
        }
    },1000);
}

function drawCanvas() {
		if (gameover == false){
			clear();

			for(e=0; e<blocks.length;e++){
				for(j=0;j<blocks[e].length;j++){
					blocks[e][j].drawBlock();
				}

			}
            totalWidth = barBuff();
            
            bar.drawBar(totalWidth);
            bar2.drawBar(totalWidth);

			for (p=0;p<balls.length;p++){
				balls[p].drawBall();
				balls[p].collision();
                
			}
            barDebuff();
			spliceBall();
			printStats();
            speedUpBuff();
            extraBall();
            speedDown();

			for(a=0;a<rewards.length;a++){
				rewards[a].drawReward();
				rewards[a].rewardMovement();
				rewards[a].collision();
			}
			checkRewards();
		}
		window.requestAnimationFrame(drawCanvas);
}

function Block(constructor_bloque) {
	this.posX = constructor_bloque.posX;
	this.posY = constructor_bloque.posY;
	this.life = constructor_bloque.life;
	this.prize = constructor_bloque.prize;
	this.blockWidth = blockWidth;
	this.blockHeight = blockHeight;

	this.drawBlock = function(){
		if(this.life == 1){
			canvas.drawImage(blocksImage[0],this.posX, this.posY, this.blockWidth, this.blockHeight);
		}else if(this.life == 2){
			canvas.drawImage(blocksImage[1],this.posX, this.posY, this.blockWidth, this.blockHeight);
		}else if(this.life == 3){
			canvas.drawImage(blocksImage[2],this.posX, this.posY, this.blockWidth, this.blockHeight);
		}else if(this.life == 4){
			canvas.drawImage(blocksImage[3],this.posX, this.posY, this.blockWidth, this.blockHeight);
		}
	}
}

function createBlocks(){
	blocks = new Array(initialRows);
	for(i=0;i<initialRows;i++){
		blocks[i]=new Array(nBlocks);
	}
	for(e=0; e<blocks.length;e++){
		for(j=0;j<blocks[e].length;j++){
			blocks[e][j] =  new Block({
			posX : j*blockWidth,
			posY : scoreSize+(e*blockHeight),
			life : 4-e,
			prize : Math.floor((Math.random() * maxRewards) + 1),
			blockWidth : blockWidth,
			blockHeight : blockHeight});
		}
	}
}

function Ball(constructor) {
	this.ballWidth = gameWidth/100*2;
	this.posX = constructor.posX;
	this.posY = constructor.posY;
	this.color ='rgb(54, 168, 225)';
	this.dx = ballSpeed;
	this.dy = -ballSpeed;
	this.inPlay = true;

	this.drawBall = function(){
		canvas.beginPath();
		canvas.fillStyle = this.color;
		canvas.strokeStyle="white";
		canvas.arc(this.posX,this.posY,this.ballWidth,0,Math.PI*2,true);
		canvas.fill();
		canvas.stroke();
		canvas.closePath();
	}

	this.collision = function(){
		if ((this.posX + this.ballWidth) > gameWidth || (this.posX - this.ballWidth) < 0){
			this.dx = -this.dx;
			otherSounds[1].play();
		}
		if ((this.posY + this.ballWidth) > gameHeight || (this.posY - this.ballWidth) < scoreSize){
			this.dy = -this.dy;
			otherSounds[1].play();
		}
        
        this.posX += this.dx;
        this.posY += this.dy;

        if ((this.posY+this.ballWidth) > bar.posY && (this.posY+this.ballWidth)<bar.posY+bar.barHeight){
            if ((this.posX+this.ballWidth) > bar.posX && (this.posX-this.ballWidth) < (bar.posX+totalWidth)){
                otherSounds[6].play();
                this.dx = 8 * ((this.posX-(bar.posX+totalWidth/2))/totalWidth);		
                this.posY = this.posY-5;
                this.dy = -this.dy;
            }
        }   

        if ((this.posY+this.ballWidth) > bar2.posY && (this.posY+this.ballWidth)<bar2.posY+bar2.barHeight){
            if ((this.posX+this.ballWidth) > bar2.posX && (this.posX-this.ballWidth) < (bar2.posX+totalWidth)){
                otherSounds[6].play();
                this.dx = 8 * ((this.posX-(bar2.posX+totalWidth/2))/totalWidth);		
                this.posY = this.posY-5;
                this.dy = -this.dy;
            }
        } 
        
		for (j=0;j<blocks.length;j++){
			for (i=0;i<blocks[j].length;i++){
				if(blocks[j][i].life > 0){
					if(this.posY - this.ballWidth < blocks[j][i].posY + blocks[j][i].blockHeight && this.posY - this.ballWidth > (blocks[j][i].posY)){
						if(this.posX + this.ballWidth > blocks[j][i].posX && this.posX - this.ballWidth < blocks[j][i].posX + blocks[j][i].blockWidth){
							if(blocks[j][i].life == 4){
								otherSounds[2].play();
							}else if(blocks[j][i].life == 3){
								otherSounds[3].play();
							}else if(blocks[j][i].life == 2){
								otherSounds[4].play();
							}else if(blocks[j][i].life == 1){
								otherSounds[5].play();
							}
							this.posY = this.posY + 5;
							this.dy = -this.dy;
							blocks[j][i].life = blocks[j][i].life-1;
							points = points + 10;
							if(blocks[j][i].life == 0 && blocks[j][i].prize == 1){
								rewards.splice(rewards.length,0,new Reward({
									posX: blocks[j][i].posX,
									posY: blocks[j][i].posY,
									kind: 1}));
							}else if(blocks[j][i].life == 0 && blocks[j][i].prize == 2){
									rewards.splice(rewards.length,0,new Reward({
									posX: blocks[j][i].posX,
									posY: blocks[j][i].posY,
									kind: 2}));
							}else if(blocks[j][i].life == 0 && blocks[j][i].prize == 3){
									rewards.splice(rewards.length,0,new Reward({
									posX: blocks[j][i].posX,
									posY: blocks[j][i].posY,
									kind: 3}));
							}else if(blocks[j][i].life == 0 && blocks[j][i].prize == 4){
									rewards.splice(rewards.length,0,new Reward({
									posX: blocks[j][i].posX,
									posY: blocks[j][i].posY,
									kind: 4}));
							}else if(blocks[j][i].life == 0 && blocks[j][i].prize == 5){
									rewards.splice(rewards.length,0,new Reward({
									posX: blocks[j][i].posX,
									posY: blocks[j][i].posY,
									kind: 5}));
							}else if(blocks[j][i].life == 0 && blocks[j][i].prize == 6){
									rewards.splice(rewards.length,0,new Reward({
									posX: blocks[j][i].posX,
									posY: blocks[j][i].posY,
									kind: 6}));
							}
						}
					}
				}
			}
		}

		if (this.posY+this.ballWidth>gameHeight && balls.length>1){
			this.inPlay = false;
			otherSounds[0].play();
		}else if(this.posY+this.ballWidth>gameHeight && balls.length==1){
			otherSounds[0].play();
			lifes = lifes -1;
			extraBalls = 0;
			barBuffTime = 0;
            barDebuffTime = 0;
            speedUpBuffTime = 0;
			resetCanvas();
		}

		if (lifes == 0){
			var mainWindow = window.parent;
            var name = localStorage.getItem("currentPlayer").split(" ");
            currentPlayer1 = new Player(name[1],name[3],points);
            localStorage.setItem("currentPlayer",currentPlayer1.toString());
            addPlayer();
	        mainWindow.postMessage("Multiplayer to gameover",'*');
            
		}
	}
}

function addPlayer(){
	arraysPlayer = JSON.parse(localStorage.getItem("playersArray"));
	var found = 0;

	if(arraysPlayer == null){
		arraysPlayer = new Array();
	}
	else{
		for (var i = 0; i < arraysPlayer.length; i++) {
			if(arraysPlayer[i].name == currentPlayer1.name){
				found = 1;
				if(arraysPlayer[i].score < currentPlayer1.score){
					arraysPlayer[i] = currentPlayer1;
				}
			}
		}
        if(found == 0){
        arraysPlayer.push(currentPlayer1);
        }
	}
    localStorage.setItem("currentPlayer", currentPlayer1.toString());
	localStorage.setItem("playersArray", JSON.stringify(arraysPlayer));
}



function newBall(){
	if(extraBalls>=1){
		extraBalls--;
		balls.splice(balls.length,0,new Ball({
		posX: gameWidth/2,
		posY: gameHeight/100*80}));
	}
}

function spliceBall(){
	for(p=0;p<balls.length;p++){
		if(balls[p].inPlay == false){
			balls.splice(p,1);
		}
	}
}

function Bar(){	
	this.barWidth = gameWidth/100*20;
	this.barHeight = (gameHeight/100*1.5)+15;
	this.posX = (gameWidth/2) - (this.barWidth/2);
	this.posY = gameHeight - (this.barHeight)-5;

	this.drawBar = function(new_width){
        
        if(new_width != bar.barWidth){
            canvas.drawImage(barImage, this.posX, this.posY,new_width, bar.barHeight);    
        }
        else{
            canvas.drawImage(barImage, this.posX, this.posY,bar.barWidth, bar.barHeight);    
        }
        
	}
}



function Reward(constructor_Reward){
	this.posX = constructor_Reward.posX;
	this.posY = constructor_Reward.posY;
	this.rewardWidth = blockWidth/2.5;
	this.rewardHeight = blockHeight;
	this.kind = constructor_Reward.kind;
	this.posImag = 0;
	this.visible = true;

	this.drawReward = function() {

		if(this.kind == 1){
			canvas.drawImage(buffsImage[0],this.posX, this.posY, this.rewardWidth, this.rewardHeight);

			if (this.posImag >= 56){
				this.posImag =0;
			}
		}else if(this.kind == 2){
			canvas.drawImage(buffsImage[1],this.posX, this.posY, this.rewardWidth, this.rewardHeight);

			if (this.posImag >= 56){
				this.posImag =0;
			}
		}else if(this.kind == 3){
			canvas.drawImage(buffsImage[2],this.posX, this.posY, this.rewardWidth, this.rewardHeight);
			if (this.posImag >= 56){
				this.posImag =0;
			}
		}else if(this.kind == 4){
			canvas.drawImage(buffsImage[3],this.posX, this.posY, this.rewardWidth, this.rewardHeight);
			if (this.posImag >= 56){
				this.posImag =0;
			}
		}else if(this.kind == 5){
			canvas.drawImage(buffsImage[4],this.posX, this.posY, this.rewardWidth, this.rewardHeight);
			if (this.posImag >= 56){
				this.posImag =0;
			}
		}else if(this.kind == 6){
			canvas.drawImage(buffsImage[5],this.posX, this.posY, this.rewardWidth, this.rewardHeight);
			if (this.posImag >= 56){
				this.posImag =0;
			}
		}
	}

	this.collision = function(){
		if((this.posY + this.rewardHeight) > bar.posY && (this.posY + this.rewardHeight) < (bar.posY + bar.barHeight)){
			if((this.posX + this.rewardWidth) > bar.posX && this.posX < (bar.posX + totalWidth)){
				if (this.kind == 1){
					otherSounds[8].play();
					extraBalls++;
					this.visible = false;
				}else if (this.kind == 2){
					if (barBuffTime <= rewardTime){
						otherSounds[8].play();
						barBuffTime = rewardTime;
                        barDebuffTime = 0;
					}
					this.visible = false;
				}else if (this.kind == 3){
					if (speedUpBuffTime <= rewardTime){
						otherSounds[8].play();
						speedUpBuffTime = rewardTime;
					}
					this.visible = false;
				}else if (this.kind == 4){
					lifes++;
					this.visible = false;
				}else if (this.kind == 5){
					if (barDebuffTime <= rewardTime){
						otherSounds[8].play();
						barDebuffTime = rewardTime;
                        barBuffTime = 0;
					}
					this.visible = false;
				}else if (this.kind == 6){
					if (speedDownDebuff <= rewardTime){
						otherSounds[8].play();
						speedDownDebuff = 1;
					}
					this.visible = false;
				}
			}
		}
        
        if((this.posY + this.rewardHeight) > bar2.posY && (this.posY + this.rewardHeight) < (bar2.posY + bar2.barHeight)){
			if((this.posX + this.rewardWidth) > bar2.posX && this.posX < (bar2.posX + totalWidth)){
				if (this.kind == 1){
					otherSounds[8].play();
					extraBalls++;
					this.visible = false;
				}else if (this.kind == 2){
					if (barBuffTime <= rewardTime){
						otherSounds[8].play();
						barBuffTime = rewardTime;
                        barDebuffTime = 0;
					}
					this.visible = false;
				}else if (this.kind == 3){
					if (speedUpBuffTime <= rewardTime){
						otherSounds[8].play();
						speedUpBuffTime = rewardTime;
					}
					this.visible = false;
				}else if (this.kind == 4){
					lifes++;
					this.visible = false;
				}else if (this.kind == 5){
					if (barDebuffTime <= rewardTime){
						otherSounds[8].play();
						barDebuffTime = rewardTime;
                        barBuffTime = 0;
					}
					this.visible = false;
				}else if (this.kind == 6){
					if (speedDownDebuff <= rewardTime){
						otherSounds[8].play();
						speedDownDebuff = 1;
					}
					this.visible = false;
				}
			}
		}
	}

	this.rewardMovement = function(){
		this.posY++;
	}
}

function checkRewards(){
	for(a=0;a<rewards.length;a++){
		if(rewards[a].posY > gameHeight){
			rewards.splice(a,1);
		}
	}
	for(a=0;a<rewards.length;a++){
		if(rewards[a].visible == false){
			rewards.splice(a,1);
		}
	}
}

function clear() {
	canvas.clearRect(0, 0, gameWidth, gameHeight);
	canvas.fillStyle = "#FFFFFF";
    canvas.fillRect(0,0,gameWidth,gameHeight);
	
}

function rewardMovementBarra(evt){
	if (evt.pageX > minX && evt.pageX < maxX) {
		bar.posX = Math.max(evt.pageX - minX - (totalWidth/2), 0);
		bar.posX = Math.min(gameWidth - totalWidth, bar.posX);
	}
}
$(document).mousemove(rewardMovementBarra);

$(document).keydown(function(e) {
    switch(e.which) {
        case 37:
            bar2.posX-=30;
        break;
        case 39:
            bar2.posX+=30;
            break;
        default: return;
    }
    e.preventDefault();
});

function printStats(){
    var space = 0;
    if(gameover == false){
        for(i=0;i<lifes;i++ ){
		canvas.drawImage(barImage, (gameWidth/100*2)+ i*(gameWidth/100*12), scoreSize/100*20 , gameWidth/100*10, scoreSize/100*25);
	    }
        canvas.drawImage(extraBallImagem, (gameWidth/100*2)+ (lifes)*(gameWidth/100*12), scoreSize/100*16 ,blockWidth/4, blockHeight);
        canvas.font = "20px sans-serif";
        canvas.fillStyle = 'rgb(54, 168, 225)';
        canvas.fillText ("x"+extraBalls, (gameWidth/100*2)+ (lifes+0.28)*(gameWidth/100*12), scoreSize/100*42 );
        canvas.beginPath();
        canvas.moveTo(0,scoreSize/100*90);
        canvas.lineTo(gameWidth,scoreSize/100*90);
        canvas.lineWidth = 3;
        canvas.strokeStyle = 'rgb(54, 168, 225)';
        canvas.stroke();

        canvas.font = "bold 22px sans-serif";
        canvas.fillStyle = 'rgb(54, 168, 225)';
        canvas.fillText ("POINTS: "+points, gameWidth - 180, scoreSize/100*42);

        if(barBuffTime>0 ){
            canvas.drawImage(buffsImage[1],gameWidth/100*50+space, (scoreSize/100*65)+(bar.barHeight/2)-20, blockWidth/4, blockHeight);
        }
        space+=30;
        if(speedUpBuffTime>0){
            canvas.drawImage(buffsImage[2],(gameWidth/100*50)+space, (scoreSize/100*65)+(bar.barHeight/2)-20, blockWidth/4, blockHeight);
        }
        space+=30;
        if(speedDownDebuff>0){
            canvas.drawImage(buffsImage[5],(gameWidth/100*50)+space, (scoreSize/100*65)+(bar.barHeight/2)-20, blockWidth/4, blockHeight);
        }
        space+=30;
        if(barDebuffTime>0){
            canvas.drawImage(buffsImage[4],(gameWidth/100*50)+space, (scoreSize/100*65)+(bar.barHeight/2)-20, blockWidth/4, blockHeight);
        }
    }
}

function resetCanvas(){
	mainSound.pause();
	if (balls.length>1){
		for(i=0; i<balls.length-1;i++){
			balls.splice(i,1);
		}
	}
    balls[0].posX = gameWidth/2;
	balls[0].posY = gameHeight-(bar.barHeight*1.8);
	balls[0].dx = 0;
	balls[0].dy = 0;
    document.getElementById("game").onclick = function(){
    balls[0].dx = ballSpeed;
    balls[0].dy = -ballSpeed;
    }   

	delete rewards;
	rewards = new Array;
	mainSound.play();
}


function newLineBlocks(){
    initialRows ++;
    var tempBlocks = new Array(initialRows);

    for(i=0;i<initialRows;i++){
        tempBlocks[i]=new Array(nBlocks);
    }
    for(e=1; e<blocks.length+1;e++){
        for(j=0;j<blocks[e-1].length;j++){
            tempBlocks[e][j] = blocks[e-1][j];
        }
    }

    for(e=1; e<tempBlocks.length;e++){
        for(j=0;j<tempBlocks[e].length;j++){
            tempBlocks[e][j].posY = tempBlocks[e][j].posY + blockHeight;

        }
    }

    for (i=0;i<nBlocks;i++){
        tempBlocks[0][i] =  new Block({
        posX : i*blockWidth,
        posY : scoreSize,
        life : Math.floor((Math.random() * 4) + 1),
        prize : Math.floor((Math.random() * maxRewards) + 1),
        blockWidth : blockWidth,
        blockHeight : blockHeight});
    }

    for (j=0;j<initialRows-1;j++){
        delete blocks[j];
    }
    blocks = new Array(initialRows);

    for(i=0;i<initialRows;i++){
        blocks[i]=new Array(nBlocks);
    }
    for (j=0;j<initialRows;j++){
        for (i=0;i<blocks[j].length;i++){
            blocks[j][i]= tempBlocks[j][i];
        }
    }
}

function barBuff(){
	if (barBuffTime>0){
        bar.barWidth=(gameWidth/100*20)*2;
        return bar.barWidth;
	}else{
		if(barDebuffTime>0){
        bar.barWidth = (gameWidth/100*20)/2;
        return bar.barWidth;
        }else{
            bar.barWidth = gameWidth/100*20;
            return bar.barWidth;
        }
	}
}

function speedUpBuff(){
    if(speedUpBuffTime > 0){
        for(i=0;i<balls.length;i++){
            balls[i].dx =10;
            balls[i].dy =-10;
        } 
    }
    speedUpBuffTime=0;
}

function speedDown(){
    if(speedDownDebuff > 0){
        for(i=0;i<balls.length;i++){
            //balls[i].dx =2;
            balls[i].dy =-2;
        } 
    }
    speedDownDebuff = 0;
}

function extraBall(){
    document.body.onkeyup = function(e){
        if(e.keyCode == 32){
            newBall();
        }
    }
}

function barDebuff(){
    if(barDebuffTime>0){
        bar.barWidth = (gameWidth/100*20)/2;
    }else{
        bar.barWidth = gameWidth/100*20;
    }
}
