
	

function Puzzle(config){
this.PUZZLE_DIFFICULTY = 4;
this.PUZZLE_HOVER_TINT = '#009900';
this.controller = config.controller;
this.canvas = config.canvas;
this.context = config.context; 
this.img = new Image();
this.puzzleWidth;
this.puzzleHeight;
this.pieceWidth;
this.pieceHeight;
this.pieces = [];
this.options = 0;
    this.mouse = {x:0,y:0};
    this.currentPiece = null;
    this.currentDropPiece = null;
this.img.src = "img/gram.png";
	console.log(this.img.width);
    this.pieceWidth = Math.floor(900 / this.PUZZLE_DIFFICULTY);
    this.pieceHeight = Math.floor(600 / this.PUZZLE_DIFFICULTY);
    this.puzzleWidth = this.pieceWidth * this.PUZZLE_DIFFICULTY;
    this.puzzleHeight = this.pieceHeight * this.PUZZLE_DIFFICULTY;
	console.log(this.puzzleWidth + " " +this.puzzleHeight);
	this.context.drawImage(this.img, 0, 0, this.puzzleWidth, this.puzzleHeight, 0, 0, this.puzzleWidth, this.puzzleHeight);

}

Puzzle.prototype.init = function(){
	
    this.img.addEventListener('load',this.onImage(),false);
    
};
Puzzle.prototype.onImage= function(e){

    this.initPuzzle();
};
Puzzle.prototype.initPuzzle = function(){
	this.addMouse();
	 var context = this.context;
	 console.log(this.puzzleWidth + " " +this.puzzleHeight);
	 //context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    context.drawImage(this.img, 0, 0, this.puzzleWidth, this.puzzleHeight, 0, 0, this.puzzleWidth, this.puzzleHeight);
    this.createTitle("Clique para começar");
    this.buildPieces();
};

Puzzle.prototype.createTitle = function(msg){
    this.context.fillStyle = "#000000";
    this.context.globalAlpha = .4;
    this.context.fillRect(100,this.puzzleHeight - 40,this.puzzleWidth - 200,40);
    this.context.fillStyle = "#FFFFFF";
    this.context.globalAlpha = 1;
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.font = "20px Arial";
    this.context.fillText(msg,this.puzzleWidth / 2,this.puzzleHeight - 20);
};

Puzzle.prototype.buildPieces= function(){
    var i;
    var piece;
    var xPos = 0;
    var yPos = 0;
    for(i = 0;i < this.PUZZLE_DIFFICULTY * this.PUZZLE_DIFFICULTY;i++){
        piece = {};
        piece.sx = xPos;
        piece.sy = yPos;
        this.pieces.push(piece);
        xPos += this.pieceWidth;
        if(xPos >= this.puzzleWidth){
            xPos = 0;
            yPos += this.pieceHeight;
        }
    }
    //document.onmousedown = this.shufflePuzzle();
};

Puzzle.prototype.addMouse = function(){
 
	var that = this;
		
	document.onmousedown = function(event){
		that.controlador(event);
	};
	document.onmouseup = function(event){
		that.controladorUp(event);
	};
	document.onmousemove = function(event){
		that.controladorMouse(event);
	};


	
};

Puzzle.prototype.resetMouse = function(){
 
	var that = this;
		
	document.onmouseup = function(event){
		that.controladorUp(null);
	};
	document.onmousemove = function(event){
		that.controladorMouse(null);
	};


	
};

Puzzle.prototype.controlador = function(evt){
	
	
	if(this.options == 0){
		this.shufflePuzzle();
	} else if (this.options ==1){
		this.onPuzzleClick(evt);
		this.addMouse();
		//this.options = 1;
	}
};

Puzzle.prototype.controladorUp = function(evt){

		if(this.options==2){
		this.pieceDropped();
		
		}
};

Puzzle.prototype.controladorMouse = function(evt){

		 if(this.options==2){
		 this.updatePuzzle(evt);
		 }
};

Puzzle.prototype.shufflePuzzle= function(){
	
	console.log("shuffle");

    this.pieces = this.shuffleArray(this.pieces);
    //this.context.clearRect(0,0,this.puzzleWidth,this.puzzleHeight);
    var i;
    var piece;
    var xPos = 0;
    var yPos = 0;
    for(i = 0;i < this.pieces.length;i++){
        piece = this.pieces[i];
        piece.xPos = xPos;
        piece.yPos = yPos;
        this.context.drawImage(this.img, piece.sx, piece.sy, this.pieceWidth, this.pieceHeight, xPos, yPos, this.pieceWidth, this.pieceHeight);
        this.context.strokeRect(xPos, yPos, this.pieceWidth,this.pieceHeight);
        xPos += this.pieceWidth;
        if(xPos >= this.puzzleWidth){
            xPos = 0;
            yPos += this.pieceHeight;
        }
	}
	
	this.options=1;
    
    
};

Puzzle.prototype.shuffleArray= function(o){
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

Puzzle.prototype.onPuzzleClick= function(e){

    if(e.layerX || e.layerX == 0){
		console.log(this.mouse.x);
        this.mouse.x = e.layerX - this.canvas.offsetLeft;
        this.mouse.y = e.layerY - this.canvas.offsetTop;
    }
    else if(e.offsetX || e.offsetX == 0){
        this.mouse.x = e.offsetX - this.canvas.offsetLeft;
        this.mouse.y = e.offsetY - this.canvas.offsetTop;
    }
    this.currentPiece = this.checkPieceClicked();
    if(this.currentPiece != null){
        this.context.clearRect(this.currentPiece.xPos,this.currentPiece.yPos,this.pieceWidth,this.pieceHeight);
        this.context.save();
        this.context.globalAlpha = .9;
        this.context.drawImage(this.img, this.currentPiece.sx, this.currentPiece.sy, this.pieceWidth, this.pieceHeight, this.mouse.x - (this.pieceWidth / 2), this.mouse.y - (this.pieceHeight / 2), this.pieceWidth, this.pieceHeight);
        this.context.restore();
		this.options=2;
        //document.onmousemove = this.updatePuzzle();
        //document.onmouseup = this.pieceDropped();
    }
};

Puzzle.prototype.checkPieceClicked= function(){
    var i;
    var piece;
	
    for(i = 0;i < this.pieces.length;i++){
        piece = this.pieces[i];
		console.log(this.mouse.x + "y" + this.mouse.y + "Y" + piece.yPos);
        if(this.mouse.x < piece.xPos || this.mouse.x > (piece.xPos + this.pieceWidth) || this.mouse.y < piece.yPos || this.mouse.y > (piece.yPos + this.pieceHeight)){
            //PIECE NOT HIT
        }
        else{
            return piece;
        }
    }
    return null;
};

Puzzle.prototype.updatePuzzle= function(e){
    this.currentDropPiece = null;
    if(e.layerX || e.layerX == 0){
        this.mouse.x = e.layerX - this.canvas.offsetLeft;
        this.mouse.y = e.layerY - this.canvas.offsetTop;
    }
    else if(e.offsetX || e.offsetX == 0){
        this.mouse.x = e.offsetX - this.canvas.offsetLeft;
        this.mouse.y = e.offsetY - this.canvas.offsetTop;
    }
    this.context.clearRect(0,0,this.puzzleWidth,this.puzzleHeight);
    var i;
    var piece;
    for(i = 0;i < this.pieces.length;i++){
        piece = this.pieces[i];
        if(piece == this.currentPiece){
            continue;
        }
        this.context.drawImage(this.img, piece.sx, piece.sy, this.pieceWidth, this.pieceHeight, piece.xPos, piece.yPos, this.pieceWidth, this.pieceHeight);
        this.context.strokeRect(piece.xPos, piece.yPos, this.pieceWidth,this.pieceHeight);
        if(this.currentDropPiece == null){
            if(this.mouse.x < piece.xPos || this.mouse.x > (piece.xPos + this.pieceWidth) || this.mouse.y < piece.yPos || this.mouse.y > (piece.yPos + this.pieceHeight)){
                //NOT OVER
            }
            else{
                this.currentDropPiece = piece;
                this.context.save();
                this.context.globalAlpha = .4;
                this.context.fillStyle = this.PUZZLE_HOVER_TINT;
                this.context.fillRect(this.currentDropPiece.xPos,this.currentDropPiece.yPos,this.pieceWidth, this.pieceHeight);
                this.context.restore();
            }
        }
    }
    this.context.save();
    this.context.globalAlpha = .6;
    this.context.drawImage(this.img, this.currentPiece.sx, this.currentPiece.sy, this.pieceWidth, this.pieceHeight, this.mouse.x - (this.pieceWidth / 2), this.mouse.y - (this.pieceHeight / 2), this.pieceWidth, this.pieceHeight);
    this.context.restore();
    this.context.strokeRect( this.mouse.x - (this.pieceWidth / 2), this.mouse.y - (this.pieceHeight / 2), this.pieceWidth,this.pieceHeight);
};

Puzzle.prototype.pieceDropped= function(){
    this.resetMouse();
    if(this.currentDropPiece != null){
        var tmp = {xPos:this.currentPiece.xPos,yPos:this.currentPiece.yPos};
        this.currentPiece.xPos = this.currentDropPiece.xPos;
        this.currentPiece.yPos = this.currentDropPiece.yPos;
        this.currentDropPiece.xPos = tmp.xPos;
        this.currentDropPiece.yPos = tmp.yPos;
    }
    this.resetPuzzleAndCheckWin();
};

Puzzle.prototype.resetPuzzleAndCheckWin= function(){
    this.context.clearRect(0,0,this.puzzleWidth,this.puzzleHeight);
    var gameWin = true;
    var i;
    var piece;
    for(i = 0;i < this.pieces.length;i++){
        piece = this.pieces[i];
        this.context.drawImage(this.img, piece.sx, piece.sy, this.pieceWidth, this.pieceHeight, piece.xPos, piece.yPos, this.pieceWidth, this.pieceHeight);
        this.context.strokeRect(piece.xPos, piece.yPos, this.pieceWidth,this.pieceHeight);
        if(piece.xPos != piece.sx || piece.yPos != piece.sy){
            gameWin = false;
			this.options=1;
        }
    }
    if(gameWin){
		this.options = 5;
		this.addMouse();
		this.controller.state = "STAGE";
		this.createTitle("Pressione enter para voltar para o mapa");
    }
};

 
   

