/*
 * Game view
 * 
 * The view has access to the canvas context
 * and is responsible for the drawing logic
 */
function View(controller){
    this.controller = controller;
    this.canvas = controller.anim.getCanvas();
    this.context = controller.anim.getContext();
	this.item = null;
	this.desenharItem = false;
	this.largura;
    this.altura;
	this.larguraMenu = 900;
	this.alturaMenu = 600;
	this.cloud = new Image();
	this.cloud_x = 0;
    this.menu = [{
		id: 1,
		x1: 122,
		x2: 238,
		y1: 260,
		y2: 300
	}, {
		id: 2,
		x1: 122,
		x2: 314,
		y1: 330,
		y2: 360
	}, {
		id: 3,
		x1: 122,
		x2: 373,
		y1: 390,
		y2: 420
	}, {
		id: 4,
		x1: 122,
		x2: 278,
		y1: 450,
		y2: 480
	}];
	
	this.pause = [{
		id: 1,
		x1: 392,
		x2: 498,
		y1: 196,
		y2: 223
	}, {
		id: 2,
		x1: 379,
		x2: 510,
		y1: 242,
		y2: 265
	}, {
		id: 3,
		x1: 320,
		x2: 588,
		y1: 285,
		y2: 310
	}, {
		id: 4,
		x1: 345,
		x2: 563,
		y1: 331,
		y2: 353
	}, {
		id: 5,
		x1: 350,
		x2: 560,
		y1: 388,
		y2: 412
	}];
	
	this.fases = [{
		id: 1,
		x1: 290,
		x2: 300,
		px1: 263,
		px2: 302,
		py1: 203,
		py2: 243,
		y1: 232,
		y2: 242,
		nome:'Ato I - Em busca da verdade',
		cor: '#8B4513'
    }, {
		id: 2,
		x1: 340,
		x2: 350,
		px1: 310,
		px2: 368,
		py1: 373,
		py2: 416,
		y1: 389,
		y2: 411,
		nome:'Ato II - Gram, precisamos de você!',
		cor: '#B8860B'
    }, {
		id: 3,
		x1: 534,
		x2: 544,
		px1: 504,
		px2: 561,
		py1: 396,
		py2: 457,
		y1: 422,
		y2: 441,
		nome:'Ato III - Fogo, ferro e revelação',
		cor:'#FF4500'
    }, {
		id: 4,
		x1: 655,
		x2: 665,
		px1: 609,
		px2: 676,
		py1: 224,
		py2: 286,
		y1: 260,
		y2: 280,
		nome:'Ato Final: Medo',
		cor: 'black'
	}];

}

View.prototype.drawScreen = function(screenImg){
    this.context.drawImage(screenImg, 0, 0, this.canvas.width, this.canvas.height);
};

 

 
View.prototype.drawBadGuys = function() {
    var controller = this.controller;
    var model = controller.model;
	for (var n = 0; n < model.badGuys.length; n++) {
	    var badGuy = model.badGuys[n];
		var offsetPos = {
			x: badGuy.x + model.level.x,
			y: badGuy.y + model.level.y
		};
	    badGuy.drawMime(offsetPos);
	}
};

//3. Define the draw() method which draws the magic bar:
View.prototype.drawItem = function(){
    var context = this.context;

	  context.fillStyle = "white";
      context.fillRect(300,450, 400, 100);
      // draw font in red
      context.fillStyle = "red";
      context.font = "10pt sans-serif";
      context.fillText("Siegfried obteve o item: " + this.item.item + this.item.pickItem, 350, 500 );

};

View.prototype.drawSave = function(){
    var context = this.context;

	  context.fillStyle = "white";
      context.fillRect(300,450, 400, 100);
      // draw font in red
      context.fillStyle = "red";
      context.font = "10pt sans-serif";
      context.fillText("Jogo Salvo com sucesso", 350, 500 );

};

//3. Define the draw() method which draws the magic bar:
View.prototype.lowMana = function(){
    var context = this.context;
	
	  context.fillStyle = "white";
      context.fillRect(300,350, 400, 100);
      // draw font in red
      context.fillStyle = "red";
      context.font = "10pt sans-serif";
      context.fillText("Mana insuficiente!",350,400);

};

View.prototype.atualizarPlanoDeFundo = function() {
	var context = this.context;
	var canvas = this.canvas;

	this.largura = window.innerWidth;
    this.altura = window.innerHeight;

	
	var img = new Image();
    img.src = "img/menu-bg.png";
    context.drawImage(img, 0, 0);
	
};


View.prototype.desenharItensMenu = function(x,y) {
    var context = this.context;
	var canvas = this.canvas;
	var idfase =0;
	
	var xMouse = 122;
    var yMouse = 0;
	 var img;
	 img = new Image();
	
  //console.log("X: " + x + "Y:" + y);
		for(var i = 0; i < this.menu.length; i++){
			
			if( x > this.menu[i].x1 && x < this.menu[i].x2){
			   if(y > this.menu[i].y1 && y < this.menu[i].y2){
				   
				if(this.menu[i].id == 1){
				//console.log("X: " + x + "Y:" + y);
				        idFase=1;
						img.src = "img/iniciar_1.png";	
						context.drawImage(img, xMouse, yMouse+ 250);
						img = new Image();
						img.src = "img/continuar_2.png";
						context.drawImage(img, xMouse, yMouse + 305);
						img = new Image();
						img.src = "img/opcoes_2.png";
						context.drawImage(img, xMouse, yMouse + 370);
						img = new Image();
						img.src = "img/creditos_2.png";
						context.drawImage(img, xMouse, yMouse + 430);
						
						
				} else if (this.menu[i].id == 2){
						idFase = 2;
						img = new Image();
						img.src = "img/iniciar_2.png";	
						context.drawImage(img, xMouse, yMouse+ 250);
						img = new Image();
						img.src = "img/continuar_1.png";
						context.drawImage(img, xMouse, yMouse + 305);
						img = new Image();
						img.src = "img/opcoes_2.png";
						context.drawImage(img, xMouse, yMouse + 370);
						img = new Image();
						img.src = "img/creditos_2.png";
						context.drawImage(img, xMouse, yMouse + 430);						
						
				} else if (this.menu[i].id ==3){
				        idFase= 3;
						img = new Image();
						img.src = "img/iniciar_2.png";	
						context.drawImage(img, xMouse, yMouse+ 250);
						img = new Image();
						img.src = "img/continuar_2.png";
						context.drawImage(img, xMouse, yMouse + 305);
						img = new Image();
						img.src = "img/opcoes_1.png";
						context.drawImage(img, xMouse, yMouse + 370);
						img = new Image();
						img.src = "img/creditos_2.png";
						context.drawImage(img, xMouse, yMouse + 430);
						
						
				} else if (this.menu[i].id ==4){
				        idFase= 4;
						img = new Image();
						img.src = "img/iniciar_2.png";	
						context.drawImage(img, xMouse, yMouse+ 250);
						img = new Image();
						img.src = "img/continuar_2.png";
						context.drawImage(img, xMouse, yMouse + 305);
						img = new Image();
						img.src = "img/opcoes_2.png";
						context.drawImage(img, xMouse, yMouse + 370);
						img = new Image();
						img.src = "img/creditos_1.png";
						context.drawImage(img, xMouse, yMouse + 430);
						
						
				} else {
				 //tipoMenu=0;
				}
			}
			
		  }
		}
};

View.prototype.selecionarItensMenu = function(x,y) {
    var context = this.context;
	var canvas = this.canvas;
	var model = this.controller.model;
	var view = this.controller.view;
	var idfase =0;
	
	var xMouse = parseInt((this.largura / 2) - (this.larguraMenu / 2));
    var yMouse = parseInt((this.altura / 2) - (this.alturaMenu / 2));
	 var img;
	 img = new Image();
	
  //console.log("X: " + x + "Y:" + y);
		for(var i = 0; i < this.menu.length; i++){
			if( x > this.menu[i].x1 && x < this.menu[i].x2){
			   if(y > this.menu[i].y1 && y < this.menu[i].y2){
				
				if(this.menu[i].id == 1){
					this.controller.menu.pause();
					this.controller.mapa.play();
					console.log("MAPA");
				        this.controller.state = this.controller.states.MAPA;
						this.context.drawImage(this.controller.images.mapa, 0, 0, 900, 600);						
						
				} else if(this.menu[i].id == 2){
					this.controller.menu.pause();
					console.log("idFase" + this.controller.idFase );
					if(this.controller.model.hero == null){
							this.controller.idFase = localStorage.getItem('idFase');
							model.initLevel();	
							model.initHero();
							model.initHealthBar();
							model.initMagicBar();
							//model.initBadGuys();
							model.initSkills();
							model.initItens();
							model.initOptions();
							model.initSiegfried(); 
							model.initMonstro();
							model.initItem();
						    model.itens = [];
							model.itensColetados = [];		
							
					}
				       
					   this.controller.model.hero.health = localStorage.getItem('heroHealth');
					   this.controller.model.hero.maxHealth = localStorage.getItem('heroMaxHealth');
					   this.controller.model.hero.maxMp = localStorage.getItem('heroMaxMp');
					   this.controller.model.hero.mp = localStorage.getItem('heroMp');
					   this.controller.model.hero.x = localStorage.getItem('heroX');
					   this.controller.model.hero.y = localStorage.getItem('heroY');
					   this.controller.model.hero.exp = localStorage.getItem('heroExp');
					   this.controller.model.hero.level = localStorage.getItem('heroLevel');
					   this.controller.model.itens = localStorage.getItem('itens');
					   var itensColetados = localStorage.getItem('itensColetados');
					   if(itensColetados.lenght==0){
						   console.log(localStorage.getItem('itensColetados'))
					   this.controller.model.itensColetados = localStorage.getItem('itensColetados');
					   }
					   
					   
					   
					   
					   console.log("idFase" + this.controller.model.itensColetados );
					   
					   this.controller.anim.setStage(function(){
							model.updateStage();
							view.drawStage();
						});
						this.controller.anim.start();
						this.controller.state = this.controller.states.PLAYING;
						
						if(this.controller.idFase == 1){
					this.controller.fase.play();
				} else if(this.controller.idFase == 3){
					this.controller.fase.play();
				} 
				else if(this.controller.idFase == 4){
					this.controller.fase4.play();
				}
				
				
					   
						//console.log('retrievedObject: ',hero.health);			
				}else if (this.menu[i].id == 3){
						this.controller.state = this.controller.states.NAV;
						this.context.drawImage(this.controller.images.options, 0, 0, 900, 600);
					
						
				} else if (this.menu[i].id ==4){
				        this.controller.state = this.controller.states.NAV;
						this.context.drawImage(this.controller.images.credito, 0, 0, 900, 600);
						this.desenharCreditos();
						
						
				} else {
				 //tipoMenu=0;
				}
			}
			
		  }
		}
};

View.prototype.selecionarItensPause = function(x,y) {
    var context = this.context;
	var canvas = this.canvas;

		for(var i = 0; i < this.pause.length; i++){
			if( x > this.pause[i].x1 && x < this.pause[i].x2){
			   if(y > this.pause[i].y1 && y < this.pause[i].y2){
				if(this.pause[i].id == 1){
				        this.controller.state = this.controller.states.PLAYING;						
				} else if (this.pause[i].id == 2){
					this.drawScreen(this.controller.images.battleScreen);
					this.controller.state = this.controller.states.ITEM;
				}else if (this.pause[i].id == 3){
						
						localStorage.setItem('heroMaxHealth', this.controller.model.hero.maxHealth);
						localStorage.setItem('heroHealth', this.controller.model.hero.health);
						localStorage.setItem('heroMaxMp', this.controller.model.hero.maxMp);
						localStorage.setItem('heroMp', this.controller.model.hero.mp);
						localStorage.setItem('heroX', this.controller.model.hero.x);
						localStorage.setItem('heroY', this.controller.model.hero.y);
						localStorage.setItem('heroExp', this.controller.model.hero.exp);
						localStorage.setItem('heroLevel', this.controller.model.hero.level);
						localStorage.setItem('idFase', this.controller.idFase);
						localStorage.setItem('itensColetados', this.controller.model.itensColetados);
						localStorage.setItem('itens', this.controller.model.itens);
						this.drawSave();
												
						this.controller.state = this.controller.states.PLAYING;
				} else if (this.pause[i].id ==4){
					this.controller.anim.stop();
						this.controller.state = this.controller.states.MAPA;
						this.drawScreen(this.controller.images.mapa);
						
				} else if(this.pause[i].id == 5) {
					this.controller.anim.stop();
					this.controller.state = this.controller.states.MENU;
					this.drawScreen(this.controller.images.telaInicial);
				}
			}
			
		  }
		}
};

View.prototype.drawFasesMapa = function(x,y){
	
	var context = this.context;
	var canvas = this.canvas;
	var id = 0;
	var cont =0;
	
	 for(var i=0; i < this.fases.length; i++){
			  if( x > this.fases[i].px1 && x < this.fases[i].px2){
				   if(y > this.fases[i].py1 && y < this.fases[i].py2){
	        
					context.save();
					context.strokeStyle = this.fases[i].cor;
					context.stroke();
					context.fillStyle = "white";
					context.fillRect(307,66, 250, 50);
					context.lineWidth = 4;
					context.strokeRect(307,66,250, 50);
					context.strokeStyle = "black";
					 // draw font in red
					context.fillStyle = "black";
					context.shadowBlur=0;
					context.shadowColor="black";
					context.font = "10pt sans-serif";
					context.fillText(this.fases[i].nome , 318, 88 );
					 this.context.idFase = this.fases[i].id;
					 context.restore();
					 

				    }
			  }
	}
	

	
};

View.prototype.selecionarFase = function(x,y){
	
	var context = this.context;
	var canvas = this.canvas;
	
	
	 for(var i=0; i < this.fases.length; i++){
			  if( x > this.fases[i].px1 && x < this.fases[i].px2){
				   if(y > this.fases[i].py1 && y < this.fases[i].py2){
					    this.controller.selecionar.get();
											
						this.context.idFase= this.fases[i].id;
						//console.log(context.idFase);
				    }
			  }
	}
	
	
	return this.context.idFase;
};



View.prototype.drawMenu = function(){
    this.atualizarPlanoDeFundo();
};



View.prototype.drawFps = function() {
    var context = this.context;
    context.fillStyle = "black";
    context.fillRect(this.canvas.width - 100, 0, 100, 30);
    
    context.font = "18pt Calibri";
    context.fillStyle = "white"; 
    context.fillText("fps: " + this.controller.avgFps.toFixed(1), this.canvas.width - 93, 22);
};

//3. Define the draw() method which draws the health bar:
View.prototype.drawItens = function(){
    var context = this.context;
	var controller = this.controller;
	var model = controller.model;
      context.fillStyle = "white";
      context.fillRect(750,80, 100, 50);
	  context.lineWidth = 4;
      context.strokeRect(750,80, 100, 50);
	  context.strokeStyle = "black";
      // draw font in red
      context.fillStyle = "red";
      context.font = "10pt sans-serif";
      context.fillText("Level: " + model.hero.level, 775, 100 );
	  context.fillText("Exp: " + model.hero.exp, 775, 120 );
	
};

View.prototype.desenharCreditos = function(){

	
	var context = this.context;
	var img;
	img = new Image();
	img.src = "img/cred.jpg";	
	context.drawImage(img, 0, 0);
	
	function creditos(text,comprimento, altura, fonte, cor){
		//var alturaTexto = altura;
		//var text = texto;

        var animationStartTime =0;
		context.fillStyle = 'rgb(215,204,0)';
        context.font = fonte;
		context.shadowBlur=5;
		context.shadowColor="black";
		
        var i=1;

		
		//time - next repaint time - HRT
		function draw(time){
			context.fillText(text.substr(0,i),comprimento,altura);
			if(time - animationStartTime > 100){
				animationStartTime = time;
				i++;
			}
			if( i <= text.length){
			 requestId = requestAnimationFrame(draw);   // 17ms
			}
		}
				
		function start(){
			//animationStartTime = window.performance.now();
			requestId = requestAnimationFrame(draw);
		}
	
		start();
    }

	
	//invoke function init once document is fully loaded
	creditos('Créditos',440,30,"25px bold Georgia",'orange');	
    creditos('Roteiro',120,100,"25px bold Georgia",'orange');
	creditos('Débora C. Ferreira',70,150,"25px Georgia",'gray');
	creditos('Rafael C.C. Mateus',70,190,"25px  Georgia",'gray');	
	creditos('Programação',100,250,"25px bold Georgia",'orange');
	creditos('Débora C. Ferreira',70,300,"25px bold Georgia",'orange');
	creditos('Designer',120,400,"25px bold Georgia",'orange');
	creditos('Rafael C.C. Mateus',70,440,"25px bold Georgia",'orange');	
	creditos('Animação',120,500,"25px bold Georgia",'orange');
	creditos('Rafael C.C. Mateus',70,550,"25px bold Georgia",'orange');
	creditos('Vinnícius H.M. Soares',50,580,"25px bold Georgia",'orange');	
	creditos('Música',450,100,"25px bold Georgia",'orange');
	creditos('André de S. Freitas',390,150,"25px bold Georgia",'orange');	
	creditos('Fotografia',430,210,"25px bold Georgia",'orange');	
	creditos('Débora C. Ferreira',390,260,"25px bold Georgia",'orange');
	creditos('Rafael C.C. Mateus',390,300,"25px bold Georgia",'orange');
	creditos('Vinnícius H.M. Soares',380,340,"25px bold Georgia",'orange');		
	creditos('Colaboradores',680,100,"25px bold Georgia",'orange');
	creditos('Austin Johns',690,150,"25px bold Georgia",'orange');
	creditos('"EvilEagles"',690,190,"25px bold Georgia",'orange');
	creditos('Julien Jorge',690,230,"25px bold Georgia",'orange');
	
	
};

View.prototype.desenharEncerramento = function(){

	var context = this.context;
	var img;
	img = new Image();
	
	if(this.controller.idFase == 1){
		img.src = "img/frame1.jpg";	
	} else if(this.controller.idFase ==2){
		img.src = "img/conclusao_fase2.jpg";	
	} else if(this.controller.idFase == 3){
		img.src = "img/conclusao_fase3.jpg";
	} else if(this.controller.idFase == 4){
		
	}
	context.drawImage(img, 0, 0);
	context.fillStyle = 'rgb(215,204,0)';
	context.shadowBlur=5;
	context.shadowColor="black";
		
	
	function init(text, altura){
		
        var animationStartTime =0;

        //context.fillStyle = 'rgb(215,204,0)';
        context.font = "20px Georgia";		
        var i=1;
		
		
		//time - next repaint time - HRT
		function draw(time){
			context.fillText(text.substr(0,i),200,altura);
			if(time - animationStartTime > 100){
				animationStartTime = time;
				i++;
			}
			if( i <= text.length){
			requestAnimationFrame(draw);   // 17ms
			} 
			
		}
				
		function start(){
			animationStartTime = window.performance.now();
			id = requestAnimationFrame(draw);
		}
		
		
		start();	
		
	}


	
	//invoke function init once document is fully loaded
    if(this.controller.idFase ==1){
		init('Durante o caminho na floresta,',100);
	 init('Siegfried notara a semelhança dos animais e seus filhotes.',120);
	 init('Intrigado com isto,',140);
	 init('Siegfried questiona seu pai a razão da enorme diferença entre os dois.',160);
	 init('Mime então, percebeu que estava na hora de contar-lhe a verdade.',180);
	// init('',200) ;
	 init('-Deixe-me lhe contar uma história pequeno Siegfried.',220);
	 init('No passado existiu um casal: Sigmund e Hiordis.',240);
	 init('Sigmund um grande guerreiro e Hiordis uma bela dama.',260);
	 init('Mas a vontade dos deuses é maior que a do homem.',280);
	 init('O casal planejava resgatar um condenado pelo próprio Pai de Todos.',300);
	 init('A calamidade caiu sobre eles.',320);
	 init('Um guerreiro desconhecido quebrou a lendária espada de Sigmund e o matou.',340);
	 init('Hiordis, que estava grávida, recolheu os fragmentos da espada e fugiu.',360);
	 init('Quando já não aguentava mais correr,',380);
	 init('adentrou em uma caverna aonde deu a luz a seu filho.',400);
	 init('',420);
	 init('Não sabia que esta caverna era a residência de um velho anão.',440);
	 init('Ela lhe entregou o filho e os resquícios da temível Espada Gram.',460);
	 init('Suas últimas palavras antes de continuar a fugir foi:',480);
	 init('"Por favor guarde meu filho, não posso deixar que o encontre.',500);
	 init('Diga a ele que é filho de Sigmund e Hiordis.',520);
	 init('Diga, ao meu pequeno Siegfried."',540);
	} else if (this.controller.idFase == 2){
		init('Siegfried conseguira forjar Gram,',200);
	 init('feito nunca conseguido por Mime.',220);
	 init('Mime incentiva Siegfried a mais um desafio,',240);
	 init('derrotar o temível dragão Fafnir',260);
	 init('e obter o tesouro que o mesmo guarda.',280);
		
	} else if (this.controller.idFase == 3){
		  init('Logo após derrotar Fafnir, ',100);
			 init('Siegfried bebe o sangue do mesmo.',120);
			 init('Com isso, adquire uma nova habilidade:',140);
			 init('a Clarevidência.',160) ;
			 init('Com ela Siegfried é capaz de se comunicar com as aves.',180) ;
			 init('De repente, um corvo adentra a caverna.',220);
			 init('- Anão! Veneno! Cobiça! Falsidade!',240);
			 init('Mime vai ao encontro de Siegfried ',280);
			 init('com uma bebida para o mesmo.',300);
			 init('Percebendo as verdadeiras intenções do anão,',320) ;
			 init('que o mesmo havia o usado por anos ',340);
			 init('apenas para obter o tesouro do dragão,',360);
			 init('e que agora o envenenaria.',380);
			 init('Siegfried então mata aquele que um dia chamou de pai.',420);
		
	}else if (this.controller.idFase == 4){
		 init('Após a batalha inesperada ',150);
		 init('contra o próprio Odin,',170);
		 init('Siegfried por meio de uma trompa,',190);
		 init('abre espaço entre o fogo',210);
		 init('e consegue chegar até Brunhilde.',230);
		 init('Ao perceber a beleza da valquíria,',270);
		 init('Siegfried não se conteve e beijou-a,',290);
		 init('o que fez com que a mesma acordasse',310);
		 init('do sono mágico ao qual estava condenada.',330);
		 init('Siegfried e Brunhilde viveram felizes,',370);
		 init('ainda que sob os olhos desgostosos',390);
		 init('dos deuses.',410);
	}
	
	
	
};

View.prototype.desenharIntro = function(){
	
	var context = this.context;
	var img;
	img = new Image();
	if(this.controller.idFase == 1){
		img.src = "img/frame4.jpg";	
	} else if(this.controller.idFase ==2){
		img.src = "img/intro_fase2.jpg";	
	} else if(this.controller.idFase == 3){
		img.src = "img/intro_fase3.jpg";
	} else if(this.controller.idFase == 4){
		
	}
	
	context.drawImage(img, 0, 0);
	context.fillStyle = 'rgb(215,204,0)';
	context.shadowBlur=5;
	context.shadowColor="black";
		
	
	function init(text, altura){
		
        var animationStartTime =0;

        //context.fillStyle = 'rgb(215,204,0)';
        context.font = "20px Georgia";		
        var i=1;
		
		
		//time - next repaint time - HRT
		function draw(time){
			context.fillText(text.substr(0,i),200,altura);
			if(time - animationStartTime > 100){
				animationStartTime = time;
				i++;
			}
			if( i <= text.length){
			requestAnimationFrame(draw);   // 17ms
			} 
			
		}
				
		function start(){
			animationStartTime = window.performance.now();
			id = requestAnimationFrame(draw);
		}
		
		
		start();	
		
	}

	
	if(this.controller.idFase == 1){
		init('Além das florestas',100);
		init('Um enorme dragão repousa em sua caverna',120);
		init('Seu nome... ',140);
		init('é Fafnir!',160);
		init('Dizem que o mesmo guarda um enorme tesouro',180);
		init('Mas quem que iria se arriscar',200);
		init('aonde só encontraria fogo e morte?',220);
		init('Apenas uma arma é capaz de derrotá-lo',240);
		init('A lendária espada Gram!',260);
		init('Agora, onde a encontrar? ',280);
		init('...',300);
		init('Isto já é uma história pra outro momento...',320);
		init('Na entrada de uma caverna em frente a mata ',400);
		init('Siegfried tenta provar a seu pai o quão forte se tornou. ',420);
	} else if (this.controller.idFase == 2){
		 init('Ainda atordoado com a história de seus pais,',100) ;
	 init('Siegfried, pede a Mime que conserte a espada de seu pai.',120) ;
	 init('Mime refuta dizendo que já tentara, ',140) ;
	 init('mas só aquele que for isento de medo é capaz de tal feito.',160) ;
	 init('Siegfried, então, coleta os restos da lendária espada Gram',200) ;
	 init('e tenta reforjá-la.',220);
	} else if (this.controller.idFase == 3){
	
		init('Em frente a caverna do dragão,',100);
		 init('um indivíduo encapuzado adentra a mesma.',120);
		 init('Diante ao enorme dragão Fafnir,',140);
		 init('o senhor o informa que a espada Gram fora reforjada.',160);
		 init('Além disso, propões a Fafnir que guardasse o maior dos seus tesouros,',180);
		 init('O anel do Nibelungo.',200);
		 init('Fafnir não deu importância ao aviso e recusou a oferta. ',240);
		 init('Enquanto isso, Siegfried segue pela floresta a encontro de Fafnir.',300);
	}else if (this.controller.idFase == 4){
	  init('Sentado sobre uma rocha, ',200);
	  init('Siegfried lamenta sua solidão,',220);
	  init('até que ouve o canto de um pássaro pássaro:',240);
	  init('-Envolta por chamas a dama está,',280);
	  init('se aos deuses quiser irritar,',300);
	  init('basta a ela tentar resgatar.',320);
	  init('Siegfried ficara intrigado com este canto,',360);
	  init('e ordena ao pássaro que o guie até',380);
	  init('o local aonde tal moça estaria.',400);
	}
	
	
};

View.prototype.drawStage = function(){
    var controller = this.controller;
	var context = this.context;
    var model = controller.model;
	
    if (controller.state == controller.states.PLAYING || controller.state == controller.states.GAMEOVER || controller.state == controller.states.WON 
	|| 	controller.state == controller.states.FIGHTING || controller.state == controller.states.PAUSE || controller.state == controller.states.WONBATTLE ||
	controller.state == controller.states.STAGE) {
        
	
			//imathis.init();
		model.level.draw();
		if(this.context.idFase == 1){
			this.drawBadGuys();
		}
        model.hero.draw(model.heroCanvasPos);
        model.healthBar.draw();
		model.magicBar.draw();
		this.drawItens();
		
        
        // draw screen overlay
		
		function pausar (){
			if(controller.idFase == 1){
				controller.fase.pause();
			} else if (controller.idFase == 2){
				
				controller.fase.pause();
			} else if (controller.idFase == 3){
				controller.fase.pause();
			} else if(controller.idFase == 4){
				controller.fase4.pause();
			}
		}
		
        if (controller.state == controller.states.GAMEOVER) {
			
			pausar();
			
			this.controller.gameOver.play();
            this.drawScreen(controller.images.gameoverScreen);
			
        } else if(controller.state == controller.states.PAUSE){
			pausar();
			this.drawScreen(controller.images.pause);
		}   else if (controller.state == controller.states.WON) {
			
			pausar();
			
			this.controller.conclusaoFase.play();
			this.drawScreen(controller.images.winScreen);
           
        } else if (controller.state == controller.states.WONBATTLE) {
			pausar();
			
			this.controller.vitoria.play();
			this.drawScreen(controller.images.battleScreen);
        } else if (controller.state == controller.states.STAGE) {
			pausar();
			
			this.controller.conclusaoFase.play();
			this.drawScreen(controller.images.stage);
        }else if ( controller.state == controller.states.FIGHTING){
			pausar();
			
			this.drawScreen(controller.images.battle);
			model.healthBar.draw();
			model.magicBar.draw();
			model.options.draw(controller.cont);
			if(controller.mana == "NO" && controller.skill == 2 && !controller.habilitarSkill){
				this.lowMana();
		    }
			//this.drawFps();
			//qqmodel.skills.draw(controller.skill);
			//this.canvas.addEventListener( "keypress", doKeyDown, false )
			
		} else if(this.desenharItem){
			this.drawItem();
		}    
		
		this.drawFps();
    
    }
};
