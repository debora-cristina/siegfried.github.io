/*
 * Game controller
 * 
 * The controller is responsible for instantiating
 * the view and the model, initializing the game,
 * controlling the game state, and managing keyboard events
 */
function Controller(canvasId){
    this.imageSources = {
        levelBounds: "img/level_bounds.png",
        level: "img/level.png",
		level3: "img/level_3.png",
		level4: "img/level_4.png",
		levelBounds3: "img/level_bounds3.png",
		background3: "img/background_3.png",
		levelBounds4: "img/level_bounds4.png",
		background4: "img/background4.jpg",
        heroSprites: "img/hero_sprites.png",
        heroHitSprites: "img/hero_hit_sprites.png",
        badGuySprites: "img/bad_guy_sprites.png",
        badGuyHitSprites: "img/bad_guy_hit_sprites.png",
        background: "img/background.png",
        readyScreen: "img/readyScreen.png",
        gameoverScreen: "img/gameoverScreen.png",
        winScreen: "img/winScreen.jpg",
		mimeSprite: "img/mime_1.png",
		telaInicial: "img/menu-bg.png",
		mapa: "img/mapa-1.png",
		battle: "img/cenario_batalha.png",
		options: "img/options.png",
		credito: "img/cred.png",
		introFase1: "img/frame4.jpg",
		introFase2: "img/intro_fase2.jpg",
		introFase3: "img/intro_fase3.jpg",
		introFase4: "img/intro_fase4.jpg",
		encFase1: "img/frame4.jpg",
		encFase2: "img/conclusao_fase2.jpg",
		encFase3: "img/conclusao_fase3.jpg",
		encFase4: "img/conclusao_fase3.jpg",
		monstro1:"img/monstro_1.png",
		monstro2:"img/monstro_2.png",
		monstro3:"img/monstro_3.png",
		boss1:"img/bear.png",
		pause:"img/pause.png",
		heroAttack:"img/char_att.png",
		battleScreen:"img/battleScreen.jpg",
		puzzle:"img/gram.png",
		stage:"img/stage.png"
    };
	
	this.sounds= {
        abrirBau: "sound/abrir_bau.mp3",
        batalha: "sound/Batalha.mp3",
		batalhaBoss: "sound/Batalha_boss.mp3",
		botao: "sound/botao.mp3",
		conclusaoFase: "sound/conclusao_fase.mp3",
        espada: "sound/Espada.mp3",
        fase: "sound/Fase.mp3",
        fase4: "sound/Fase_noite.mp3",
        gameOver: "sound/game_over.mp3",
        introducao: "sound/introducao.mp3",
        introFase: "sound/introducao_fase.mp3",
        menu: "sound/menu.mp3",
        win: "sound/menu_fases.mp3",
		pause: "sound/Pause.mp3",
		pausePergaminho: "sound/Pause_pergaminho.mp3",
		pulo: "sound/Pulo.mp3",
		buraco: "sound/Queda_abismo.mp3",
		selecao:"sound/select.mp3",
		win:"sound/vitoria.mp3"
    };
	
    this.images = {};

    this.states = {
		MENU: "MENU",
		NAV: "NAV",
		MAPA: "MAPA",
		PAUSE: "PAUSE",
        INIT: "INIT",
        READY: "READY",
		PUZZLE: "PUZZLE",
		PHRASE: "PHRASE",
        PLAYING: "PLAYING",
		FIGHTING: "FIGHTING",
		ITEM: "ITEM",
		WON: "WON",
		STAGE: "STAGE",
        WONBATTLE: "WONBATTLE",
        GAMEOVER: "GAMEOVER"
    };
	
	this.keys = {
		ENTER: 13,
		ESC: 27,
		UP: 38,
		DOWN: 40,				
		LEFT: 37,
		RIGHT: 39,
		A: 65,
        P: 80		
	};
	
this.sounds= {
        abrirBau: "sound/abrir_bau.mp3",
        batalha: "sound/Batalha.mp3",
		batalhaBoss: "sound/Batalha_boss.mp3",
		botao: "sound/botao.mp3",
		conclusaoFase: "sound/conclusao_fase.mp3",
        espada: "sound/Espada.mp3",
        fase: "sound/Fase.mp3",
        fase4: "sound/Fase_noite.mp3",
        gameOver: "sound/game_over.mp3",
        introducao: "sound/introducao.mp3",
        introFase: "sound/introducao_fase.mp3",
        menu: "sound/menu.mp3",
        menuFases: "sound/menu_fases.mp3",
		pause: "sound/Pause.mp3",
		pausePergaminho: "sound/Pause_pergaminho.mp3",
		pulo: "sound/Pulo.mp3",
		buraco: "sound/Queda_abismo.mp3",
		selecao:"sound/select.mp3",
		vitoria:"sound/vitoria.mp3"
    };
	
		this.introducao = new AudioManager(10);
		this.introducao.init("introducao");
		this.pause = new AudioManager(10);
		this.pause.init("pause");
		this.selecionar = new AudioManager(10);
		this.selecionar.init("selecionar");
		this.buraco = new AudioManager(10);
		this.buraco.init("buraco");
		this.pulo = new AudioManager(10);
		this.pulo.init("pulo");
		this.bau = new AudioManager(10);
		this.bau.init("bau");
		this.menu = new Audio(this.sounds.menu);
		this.menu.loop = true;
		this.menu.volume = .25;
		this.menu.load();
		this.intro = new Audio(this.sounds.introducao);
		this.intro.loop = true;
		this.intro.volume = .25;
		this.intro.load();
		this.mapa = new Audio(this.sounds.menuFases);
		this.mapa.loop = true;
		this.mapa.volume = .25;
		this.mapa.load();
		this.batalhaSong = new Audio(this.sounds.batalha);
		this.batalhaSong.loop = true;
		this.batalhaSong.volume = .25;
		this.batalhaSong.load();
		this.batalhaBoss = new Audio(this.sounds.batalhaBoss);
		this.batalhaBoss.loop = true;
		this.batalhaBoss.volume = .25;
		this.batalhaBoss.load();
		this.conclusaoFase = new Audio(this.sounds.conclusaoFase);
		this.conclusaoFase.loop = true;
		this.conclusaoFase.volume = .25;
		this.conclusaoFase.load();
		this.fase = new Audio(this.sounds.fase);
		this.fase.currentTime = 0;
		this.fase.loop = true;
		this.fase.volume = .25;
		this.fase.load();
		this.fase4 = new Audio(this.sounds.fase4);
		this.fase4.loop = true;
		this.fase4.volume = .25;
		this.fase4.load();
		this.gameOver = new Audio(this.sounds.gameOver);
		this.gameOver.loop = true;
		this.gameOver.volume = .25;
		this.gameOver.load();
		this.introFase = new Audio(this.sounds.introFase);
		this.introFase.loop = true;
		this.introFase.volume = .25;
		this.introFase.load();
		this.pausePergaminho = new Audio(this.sounds.pausePergaminho);
		this.pausePergaminho.loop = true;
		this.pausePergaminho.volume = .25;
		this.pausePergaminho.load();
		this.vitoria = new Audio(this.sounds.vitoria);
		this.vitoria.loop = true;
		this.vitoria.volume = .25;
		this.vitoria.load();
		this.options = new AudioManager(10);
		this.options.init("options");
		
			
			//this.checkAudio = window.setInterval(function(){checkReadyState()},1000);
	
	this.anim = new Animation(canvasId);
    this.state = this.states.INIT;
    this.model = new Model(this);
    this.view = new View(this);
	this.skill = new Skill(this);
	this.leftKeyup = true;
	this.rightKeyup = true;
    this.addKeyboardListeners();
	this.addMouse();
    this.loadImages();
	this.avgFps = 0;
	this.cont =0;
	this.skill=0;
	this.num = 0; 
	this.idFase;
	this.cycle = 0;
	this.speedSiegfried =null;
	this.speedMonstro = null;
	this.mana = "YES";
	this.keyRight = 0;
	this.habilitarSkill = false;
		
	
}

Controller.prototype.loadImages = function(){
	/*
	 * we need to load the loading image first
	 * so go ahead and insert it into the dom
	 * and them load the rest of the images
	 */
	//this.view.canvas.style.background = "url('img/loadingScreen.png')";
	
    var that = this;
    var loadedImages = 0;
    var numImages = 0;
    for (var src in this.imageSources) {
        numImages++;
    }
    for (var src in this.imageSources) {
        this.images[src] = new Image();
        this.images[src].onload = function(){
            if (++loadedImages >= numImages) {
				
					that.initGame();
				
                
            }
        };
        this.images[src].src = this.imageSources[src];
    }
	
		
	
};

Controller.prototype.addKeyboardListeners = function(){
    var that = this;
    document.onkeydown = function(evt){
        that.handleKeydown(evt);
    };
    document.onkeyup = function(evt){
        that.handleKeyup(evt);
    };
};

Controller.prototype.addMouse = function(){
 
	var that = this;
	
	document.onmousemove = function(event){
		that.handleOnMouseMove(event);
	};
	
	document.onmousedown = function(event){
		that.handleOnMouseDown(event);
	};

	
};

Controller.prototype.handleOnMouseDown = function(evt){
	
	var x = new Number();
	var y = new Number();
	var view = this.view;
	var model = this.model;
	
	//this.model.puzzle.evt = evt;


	if (evt.x != undefined && evt.y != undefined)
	{
	  x = evt.x;
	  y = evt.y;
	}
	else // Firefox method to get the position
	{
	  x = evt.clientX + document.body.scrollLeft +
		  document.documentElement.scrollLeft;
	  y = evt.clientY + document.body.scrollTop +
		  document.documentElement.scrollTop;
	}
	
	//console.log("X:" + x + "Y" + y);
	//model.puzzle.onPuzzleClick(evt);
	
	if(this.state == this.states.MENU){
		view.selecionarItensMenu(x,y);
	} else if (this.state == this.states.MAPA){
		this.idFase = view.selecionarFase(x,y);
		console.log("FASE" + this.idFase);
			switch(this.idFase){
				case 1:
				   this.state = this.states.READY;
				//view.drawScreen(this.images.readyScreen);
				
				if (this.state == this.states.READY) {
							// start animation
							view.drawScreen(this.images.introFase1);
							this.mapa.pause();
							this.introFase.play();
							view.desenharIntro();
				}
				break;
				case 2:
				console.log("FASE" + this.idFase);
				this.state = this.states.READY;
					if (this.state == this.states.READY) {
								view.drawScreen(this.images.introFase2);
								this.mapa.pause();
								this.introFase.play();
							    view.desenharIntro();
								this.state = this.states.PUZZLE;	
								
								
					}
				break;
				case 3:
				 this.state = this.states.READY;
					if (this.state == this.states.READY) {
						this.mapa.pause();
						this.introFase.play();
								// start animation
								view.drawScreen(this.images.introFase3);
								view.desenharIntro();
					}
				break;
				case 4:
				 this.state = this.states.READY;
				//=view.drawScreen(this.images.readyScreen);
				
					if (this.state == this.states.READY) {
								// start animation
								view.drawScreen(this.images.introFase4);
								this.mapa.pause();
								this.introFase.play();
								view.desenharIntro();
					}
				break;
			}
	} else if (this.state == this.states.PAUSE){
		view.selecionarItensPause(x,y);
	}
	
};

Controller.prototype.handleOnMouseMove = function(evt){
	var x = new Number();
	var y = new Number();
	var view = this.view;

    //this.model.puzzle.evt = evt;
	if (evt.x != undefined && evt.y != undefined)
	{
	  x = evt.x;
	  y = evt.y;
	}
	else // Firefox method to get the position
	{
	  x = evt.clientX + document.body.scrollLeft +
		  document.documentElement.scrollLeft;
	  y = evt.clientY + document.body.scrollTop +
		  document.documentElement.scrollTop;
	}
	
	
	//console.log("X:" + x + "Y" + y);
	
	if(this.state == this.states.MENU){
		view.desenharItensMenu(x,y);
	} else if (this.state == this.states.MAPA){
		view.drawFasesMapa(x,y);
	} 

	//x -= this.view.canvas.offsetLeft;
	//y -= this.view.canvas.offsetTop;
};

Controller.prototype.handleKeyup = function(evt){
    keycode = ((evt.which) || (evt.keyCode));
    
    switch (keycode) {
        case this.keys.LEFT: 
            this.leftKeyup = true;
            if (this.leftKeyup && this.rightKeyup) {
                this.model.hero.stop();
            }
            break;
            
        case this.keys.UP: 
            break;
            
        case this.keys.RIGHT: 
            this.rightKeyup = true;
            if (this.leftKeyup && this.rightKeyup) {
                this.model.hero.stop();
            }
            break;
    }
};


Controller.prototype.handleKeydown = function(evt){
    var that = this;
    keycode = ((evt.which) || (evt.keyCode));
	var model = this.model;
	var view = this.view;
	var dano = this.skill.dano;
	var skill = this.skill;
	var attack = this.skill.attack;
	var efeito = this.skill.efeito;
    switch (keycode) {
		case this.keys.ENTER: // enter
			if(this.state == this.states.INIT){
				this.intro.pause();
				this.gameOver.pause();
				this.menu.play();
				
				document.getElementById("slideshow").style.display="none";
				myDiv1 = document.getElementById("slideshow");
				myDiv2 = document.getElementById("canvasMenu");
				myDiv2.style.display = "block";
				var model = this.model;
				model.initHero();
				this.view.drawMenu();
				this.state = this.states.MENU;
			} else if (this.state == this.states.READY) {
				this.introFase.pause();
				
				var model = this.model;
				var view = this.view;
				
				
				
				model.initLevel();
				model.initItens();
				model.initPuzzle();				
				model.initHealthBar();
				model.initMagicBar();
				model.initSkills();
				model.initOptions();
				model.initSiegfried(); 
				model.initMonstro();
				model.initPuzzle();
				this.anim.setStage(function(){
					model.updateStage();
					view.drawStage();
				});
                this.state = this.states.PLAYING;
				if(this.idFase == 1){
					this.fase.play();
				} else if(this.idFase == 3){
					this.fase.play();
				} 
				else if(this.idFase == 4){
					this.fase4.play();
				}
				
				
                // start animation
                this.anim.start();
            } else if(this.state == this.states.PUZZLE){
				view.drawScreen(this.images.puzzle);
				model.initPuzzle();
				model.puzzle.initPuzzle();
			}else if (this.state == this.states.FIGHTING) {	
			
			
				this.skill= this.cont;				
				console.log("Siegfried" + this.speedSiegfried + "SpeedMonstro" + this.speedMonstro);
				
				
				if(model.healthBar.health > 0 && model.monstro.hpMonstro > 0 && this.habilitarSkill){
					
							
				switch(this.skill){
					
					case 1:													
							model.monstro.hpMonstro = model.monstro.hpMonstro - model.skills.attack;
							model.monstro.setHp(model.monstro.hpMonstro);															
							this.batalha();
							break;
					case 2:
					       function getRandomArbitrary(min, max) {
							 return Math.random() * (max - min) + min;
						   }
				
							function getRandomInt(min, max) {
								return Math.floor(Math.random() * (max - min + 1)) + min;
							}
				
				
				
							this.num = getRandomArbitrary(1,10);
							 
							//console.log(this.num);
							if(this.num >0 && this.num<4){
										 model.skills.efeito=model.skills.attack;
							} else if(this.num>4 && this.num<7){
										 model.skills.efeito=2*model.skills.attack;
							} else if(this.num>7 && this.num<8.5){
										 model.skills.efeito=3*model.skills.attack;						 
							} else if(this.num>8.5 && this.num<9.5){						  
										 model.skills.efeito=4*model.skills.attack;
							} else if(this.num>9.5 && this.num<10){ 
										 model.skills.efeito=10*model.skills.attack;
							} 

														   var mp = 10;
							if(mp <= model.hero.mp){						  
							  model.skills.dano = model.skills.efeito+2.25;
							   this.mana = "YES";
							   model.monstro.hpMonstro = model.monstro.hpMonstro - model.skills.dano;
							   model.monstro.setHp(model.monstro.hpMonstro);

										model.hero.mp = model.hero.mp - mp;
							   }else{
								this.mana = "NO";
							}
							model.magicBar.setMagic(model.hero.mp);	
							
							if(model.monstro.hpMonstro >=0){
								this.batalha();
				            }
							
					this.verificarBatalha();
					break;
					case 3:
					break;
					case 4:
					model.options.drawItens(0);
					break;
					case 5:
					var flag = false;
					for(var i=0;i < model.itensColetados.length; i++){
							if(model.itensColetados[i].tipoItem == 'life1'){
								flag = true;
								break;
							}
					}
						model.options.drawItens(0);
						var hp = model.hero.maxHealth/2;
						//console.log("case 5 : quantidade:" + model.options.quantidade);
						
						if(flag){
							if(model.hero.health < hp){
								model.hero.health = model.hero.health + hp;
							} else {
								hp = model.hero.maxHealth - model.hero.health;
								model.hero.health = model.hero.health + hp;
							}
						}
						
						model.healthBar.setHealth(model.hero.health);
						
						for(var i=0;i < model.itensColetados.length; i++){
							if(model.itensColetados[i].tipoItem == 'life1'){
								model.itensColetados.splice(i,1);
								break;
							}
						}
					
					break;
					case 6:
					
					var flag = false;
					for(var i=0;i < model.itensColetados.length; i++){
							if(model.itensColetados[i].tipoItem == 'life2'){
								flag = true;
								break;
							}
					}
						model.options.drawItens(0);
						var hp = model.hero.maxHealth;
						//console.log("case 5 : quantidade:" + model.options.quantidade);
						
						if(flag){
								model.hero.health = hp;
						}
						
						model.healthBar.setHealth(model.hero.health);
						
						for(var i=0;i < model.itensColetados.length; i++){
							if(model.itensColetados[i].tipoItem == 'life2'){
								model.itensColetados.splice(i,1);
								break;
							}
						}
					
					break;
					case 7:
					var flag = false;
					for(var i=0;i < model.itensColetados.length; i++){
							if(model.itensColetados[i].tipoItem == 'mana1'){
								flag = true;
								break;
							}
					}
						model.options.drawItens(0);
						var mp = model.hero.maxMp/2;
						//console.log("case 5 : quantidade:" + model.options.quantidade);
						
						if(flag){
							if(model.hero.mp < mp){
								console.log("entrou");
								model.hero.mp = model.hero.mp+ mp;
							} else {
								console.log("entrou 2");
								mp = model.hero.maxMp - model.hero.mp;
								model.hero.mp = model.hero.mp + mp;
							}
						}
						
						model.magicBar.setMagic(model.hero.mp);
						
						for(var i=0;i < model.itensColetados.length; i++){
							if(model.itensColetados[i].tipoItem == 'mana1'){
								model.itensColetados.splice(i,1);
								break;
							}
						}
					
					break;
					case 8:
					var flag = false;
					for(var i=0;i < model.itensColetados.length; i++){
							if(model.itensColetados[i].tipoItem == 'mana2'){
								flag = true;
								break;
							}
					}
						model.options.drawItens(0);
						var mp = model.hero.maxMp;
						
						
						if(flag){
								model.hero.mp = mp;
						}
						
						model.magicBar.setMagic(model.hero.mp);
						
						for(var i=0;i < model.itensColetados.length; i++){
							if(model.itensColetados[i].tipoItem == 'mana2'){
								model.itensColetados.splice(i,1);
								break;
							}
						}
					
					break;
					case 9:
					var flag = false;
					for(var i=0;i < model.itensColetados.length; i++){
							if(model.itensColetados[i].tipoItem == 'geral'){
								flag = true;
								break;
							}
					}
						model.options.drawItens(0);
						var mp = model.hero.maxMp;
						var hp = model.hero.maxHealth;
						//console.log("case 5 : quantidade:" + model.options.quantidade);
						
						if(flag){
								model.hero.mp = mp;
								model.hero.health = hp;
						}
						
						model.magicBar.setMagic(model.hero.mp);
						model.healthBar.setHealth(model.hero.health);
						
						for(var i=0;i < model.itensColetados.length; i++){
							if(model.itensColetados[i].tipoItem == 'geral'){
								model.itensColetados.splice(i,1);
								break;
							}
						}
					break;
				 }
				}		   
				
            } else if (this.state == this.states.GAMEOVER){
			this.gameOver.pause();
			this.menu.play();
			
				    this.addKeyboardListeners();
					this.addMouse();
				this.resetGame();
				 this.anim.stop();
				this.view.drawMenu();
				this.state = this.states.MENU;			
				
			} else if(this.state == this.states.NAV){
				this.anim.stop();
				this.anim.clear();
				this.view.drawMenu();
				this.state =this.states.MENU;	
			} else if(this.state == this.states.WON){
				this.anim.stop();
				if(this.idFase == 1){
					this.view.drawScreen(this.images.encFase1);
					this.fase.pause();
					this.view.desenharEncerramento();
				} else if(this.idFase == 2){
						this.view.drawScreen(this.images.encFase2);
						this.fase.pause();
						this.view.desenharEncerramento();
				}else if(this.idFase == 3){
						this.view.drawScreen(this.images.encFase3);
						this.fase.pause();
						this.view.desenharEncerramento();
				} else if(this.idFase == 4){
						this.view.drawScreen(this.images.encFase4);
						this.fase4.pause();
						this.view.desenharEncerramento();
				}
				this.state = this.states.MAPA;
				this.conclusaoFase.pause();
			} else if(this.state == this.states.WONBATTLE){
				this.vitoria.pause();
				this.fase.play();
				this.state = this.states.PLAYING;
			} else if(this.state == this.states.ITEM){
				this.state = this.states.PLAYING;
			} else if(this.state == this.states.MAPA){
				this.addMouse();
				this.view.drawScreen(this.images.mapa);
			}else if(this.state == this.states.STAGE){
				this.anim.stop();
				if(this.idFase == 1){
					this.view.drawScreen(this.images.encFase1);
					this.fase.pause();
					this.view.desenharEncerramento();
				} else if(this.idFase == 2){
						this.view.drawScreen(this.images.encFase2);
						this.fase.pause();
						this.view.desenharEncerramento();
				}else if(this.idFase == 3){
						this.view.drawScreen(this.images.encFase3);
						this.fase.pause();
						this.view.desenharEncerramento();
				} else if(this.idFase == 4){
						this.view.drawScreen(this.images.encFase4);
						this.fase4.pause();
						this.view.desenharEncerramento();
				}
				this.state = this.states.MAPA;
				this.conclusaoFase.pause();
			}
            break;
		
		case this.keys.P: // enter
		//controller.states.GAMEOVER;this.pause.get();
		if(this.state == this.states.PLAYING){
			
			
			
			this.state = this.states.PAUSE;
		} else if (this.state == this.states.PAUSE){
			
			if(this.idFase == 1){
					this.fase.play();
					} else if(this.idFase == 2){
						this.fase.play();
					}else if(this.idFase == 3){
						this.fase.play();
					} else if(this.idFase == 4){
						this.fase4.play()
					}
			this.state = this.states.PLAYING;
		}
            break;
		
      
        case this.keys.LEFT:
            this.leftKeyup = false;
            this.model.hero.moveLeft();
            break;
            
        case this.keys.UP:
		this.model.hero.jump();
		
		     if (this.state == this.states.FIGHTING) {
                if(this.cont>=2){
					//alert("cima"+this.cont)
					this.cont--;
					this.options.get();
				}
            } if(this.state == this.states.PLAYING) {
				this.pulo.get();
			}
            
            break;
			
		case this.keys.DOWN:
		     if (this.state == this.states.FIGHTING) {
			 if(this.cont < 9){
				 //alert("baixo"+this.cont);
				 this.cont++;
				 this.options.get();
				}
			
                
            }
		break;
            
        case this.keys.RIGHT: 
		var model = this.model;
		this.keyRight++;
		this.rightKeyup = false;
		if(model.hero.x > 6600 && model.hero.x < 7280 && this.state == this.states.PLAYING){
					    if(this.idFase == 1){
							model.options.monstro = 4;
							model.monstro.attack = 2* model.monstro.attack;
							model.monstro.hpMonstro = 1.25* model.monstro.hpMonstro;
					    } else if (this.idFase == 3){
							model.options.monstro = 5;
							model.monstro.attack = 2* model.monstro.attack;
							model.monstro.hpMonstro = 1.25* model.monstro.hpMonstro;
						
					    } else if(this.idFase == 4){
							 model.monstro.attack = 2* model.monstro.attack;
							 model.monstro.hpMonstro = 1.25* model.monstro.hpMonstro;
							 model.options.monstro = 6;
					     }
						 that.state = that.states.FIGHTING;
						 that.batalha();
		} else if (this.state == this.states.PLAYING && this.keyRight==1){
				function getRandomInt(min, max) {
					return Math.floor(Math.random() * (max - min + 1)) + min;
				}
			
					   model.options.monstro = 0;
					   
					setTimeout(function() {
						if(that.state == that.states.PLAYING){
							if(this.idFase == 1){
								that.fase.pause();
								that.batalhaSong.play();
							} else if(idFase == 2){
							  that.fase.pause();
							  that.batalhaSong.play();
							}else if(idFase ==3){
							 that.fase.pause();
							 that.batalhaSong.pause();
							}else if (idFase2 == 4){
								that.fase4.pause();
								that.batalhaSong.play();
							}
							
							that.state = that.states.FIGHTING;
							model.options.monstro =  getRandomInt(1,3);
							console.log("monstro" + that.num + "speed player" + model.options.speedPlayer);	
							//model.options.draw(0);
						that.batalha();
						}
					
					}, getRandomInt(10, 20)*1000);  
				   }
				
			

            this.model.hero.moveRight();
            break;
            
        case this.keys.A: // attack
			var model = this.model;
			this.model.hero.attack();
            break;
    }
};

Controller.prototype.batalha = function(){
	    var model = this.model;
		var view = this.view;
	    this.cycle++;
		var that = this;
		if(model.hero.health > 0 && model.monstro.hpMonstro > 0 ){

			function getRandomArbitrary(min, max) {
				return Math.random() * (max - min) + min;
			}
			
			function getRandomInt(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}		
		
			if(this.speedSiegfried == null){
			this.speedSiegfried = getRandomInt(0, 1);
				if(this.speedSiegfried == 0){
					this.speedMonstro = 1;
				} else {
					this.speedMonstro = 0;
				}
			}
		
		
		model.options.speedPlayer = this.speedSiegfried;
		model.options.speedBoss = this.speedMonstro;
		
				 if(this.speedSiegfried > this.speedMonstro){
					 this.habilitarSkill = true;
					 model.options.setBarraAcao(true);
					 console.log("Barra acao" + model.options.barraAcao);
					 model.options.draw(0);
					 model.options.speedSiegfried = this.speedSiegfried--;
					 model.options.speedBoss = this.speedMonstro++;
				 } else {
					 this.habilitarSkill = false;
					 
					  model.options.setBarraAcao(false);
					  model.hero.health = model.hero.health - model.monstro.attack;
					  model.options.speedSiegfried = this.speedSiegfried++;
					  model.options.speedBoss = this.speedMonstro--;				
					  setTimeout(function() {model.healthBar.setHealth(model.hero.health); that.batalha();  },3000);
				 }
		}
		

		
	   
		
		this.verificarBatalha();
        
	
};

Controller.prototype.initGame = function(){
	this.intro.play();
	
	
	// function slideSwitch() {
    // var $active = $('#slideshow IMG.active');

    // if ( $active.length == 0 ) $active = $('#slideshow IMG:last');

    // // use this to pull the images in the order they appear in the markup
    // var $next =  $active.next().length ? $active.next()
    //     : $('#slideshow IMG:first');

    // // uncomment the 3 lines below to pull the images in random order
    
    // // var $sibs  = $active.siblings();
    // // var rndNum = Math.floor(Math.random() * $sibs.length );
    // // var $next  = $( $sibs[ rndNum ] );


    // $active.addClass('last-active');

    // $next.css({opacity: 0.0})
    //     .addClass('active')
    //     .animate({opacity: 1.0}, 2000, function() {
    //         $active.removeClass('active last-active');
    //     });
	// }
	
	// setInterval( slideSwitch, 2000 );
	// myDiv1 = document.getElementById("slideshow");
	myDiv2 = document.getElementById("canvasMenu");
	myDiv1.style.display = "block";
	document.getElementById("canvasMenu").style.display="none";
	

	
    

};

Controller.prototype.verificarBatalha = function(){
	
	var model = this.model;
	
	if(model.healthBar.health <= 0){
				    this.keyRight=0;
					this.speedSiegfried = null;
					model.options.speedPlayer = this.speedSiegfried;
					
					this.state = this.states.GAMEOVER;					
					model.hero.alive = false;

				}else if( model.monstro.hpMonstro <= 0){
					this.batalhaSong.pause();
					this.fase.play();
								
					this.keyRight=0;
					this.speedSiegfried = null;
					model.options.speedPlayer = this.speedSiegfried;
					model.hero.exp = model.hero.exp + 50;
					if( model.hero.exp == 100 ){
						this.mana = "YES";
						model.hero.level  = model.hero.level + 1;
						model.hero.attack = model.hero.attack + 2.25* model.hero.level;
						model.hero.exp = 0;
						model.hero.maxMp = model.hero.mp * model.hero.level;
						model.hero.mp = model.hero.mp * model.hero.level;
						model.hero.maxHealth = model.hero.maxHealth * model.hero.level;
						model.hero.health = model.hero.maxHealth;
						model.initHealthBar();
						model.initMagicBar();
					}
					model.initMonstro();
					
					if(model.options.monstro == 4){
						img = new Image();
						img.src = "img/frame1.jpg";	
						
						this.state = this.states.STAGE;
					} 
					else if(model.options.monstro == 5){
						img = new Image();
						img.src = "img/frame1.jpg";	
						
						this.state = this.states.STAGE;
					} 
					else if(model.options.monstro == 6){
						img = new Image();
						img.src = "img/frame1.jpg";	
						
						this.state = this.states.WON;
					}  else{
						this.speedSiefried = null;
						this.state = this.states.WONBATTLE;		
					
					}	
					
				}
};

Controller.prototype.resetGame = function(){
    var model = this.model;
	model.level = null;
    model.hero = null;
    model.healthBar = null;
	model.magicBar = null;
    model.badGuys = [];
	model.skills = null;
	model.siegfried = null;
	model.monstro = null;
    
    model.initLevel();	
    model.initHero();
    model.initHealthBar();
	model.initMagicBar();
	//model.initBadGuys();
	model.initSkills();
	model.initOptions();
	model.initSiegfried(); 
	model.initMonstro();
};



