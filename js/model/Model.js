//1. Define the Model constructor:
/*
* Game model
*
* The model is responsible for initializing and
* updating the hero, level, bad guys, and health bar
*/
function Model(controller){
    this.controller = controller;
    this.healthBar = null;
	this.magicBar = null;
    this.hero = null;
    this.level = null;
	this.item = null;
    this.badGuys = []; // array of bad guys
	this.itensColetados = []; // array of bad guys
    this.heroCanvasPos = {};
	this.options = null;
	this.skills = null;
	this.siegfried = null;
	this.monstro = null;
	this.itens = null;
	this.itens1 = null;
	this.itens2 = null;
	this.itens3 = null;
	this.puzzle = null;
}
//2. Define the removeDefeatedBadGuys() method which loops through the bad guy
//array and then removes the ones that are no longer alive:
Model.prototype.removeDefeatedBadGuys = function(){
    for (var n = 0; n < this.badGuys.length; n++) {
    var badGuy = this.badGuys[n];
    if (!badGuy.alive && badGuy.opacity == 0) {
    this.badGuys.splice(n, 1);
    }
    }
};

//3. Define the updateBadGuys() method:
Model.prototype.updateBadGuys = function(){
    var that = this;
    for (var n = 0; n < this.badGuys.length; n++) {
    var badGuy = this.badGuys[n];
   
    this.updateActor(badGuy);
    }
};
//4. Define the updateStage() method which updates all of the game objects for each
//animation frame:
Model.prototype.updateStage = function(){
    var controller = this.controller;
    var canvas = controller.view.canvas;
	var view = controller.view;
    
    if (!this.hero.alive && controller.state == controller.
    states.PLAYING) {
    controller.state = controller.states.GAMEOVER;
    }

    this.updateLevel();
    var oldHeroX = this.hero.x;
    this.updateActor(this.hero);
    this.updateHeroCanvasPos(oldHeroX);
    // update health bar
    this.healthBar.setHealth(this.hero.health);
	this.magicBar.setMagic(this.hero.mp);
    // if hero falls into a hole set health to zero

	
	

	var view = controller.view;
	var itemAnterior = null;
	var cont = 0;
	if(controller.idFase == 1){
		this.itens = this.itens1;
	} else if(controller.idFase == 3){
		this.itens = this.itens2;
	} else if(controller.idFase == 4){
		this.itens = this.itens3;
	}
	
	
		for(var i=0; i< this.itens.length; i++){
		
			  
			if(this.hero.x >= this.itens[i].x1 && this.hero.x <= this.itens[i].x2){					
				
					if(this.hero.y >= this.itens[i].y1 && this.hero.y <= this.itens[i].y2){
						
						cont =0;
										
						this.item = new Item({
								
								controller: this.controller,
								x1 : this.itens[i].x1,
								x2 : this.itens[i].x2,
								x : this.hero.x,
								y : this.hero.y,
								y1 : this.itens[i].y1,
								y2 : this.itens[i].y2,
								tipoItem: this.itens[i].tipoItem,
								item : this.itens[i].item,
								pickItem: false,
								quantidade: this.itens[i].quantidade
							});
						
						if(this.itensColetados.length == 0){
							
							this.itensColetados.push(new Item({					
							controller: this.controller,
							x1 : this.itens[i].x1,
							x2 : this.itens[i].x2,
							x : this.hero.x,
							y : this.hero.y,
							y1 : this.itens[i].y1,
							y2 : this.itens[i].y2,
							tipoItem: this.itens[i].tipoItem,
							item : this.itens[i].item,
							pickItem: this.itens[i].id,
							quantidade: this.itens[i].quantidade
							}));
							
							
							
							view.desenharItem = true;
							view.item = this.item;
							
						} else {
							
							for (var n = 0; n < this.itensColetados.length; n++) {
						  
								var teste = this.itensColetados[n];
								if(this.item.item == teste.item){
									console.log("passou");
									cont++;
									break;
									
								} 			 
							}
							
							if(cont == 0){
								this.itensColetados.push(new Item({					
								 controller: this.controller,
								 x1 : this.itens[i].x1,
								 x2 : this.itens[i].x2,
								 x : this.hero.x,
									y : this.hero.y,
									y1 : this.itens[i].y1,
									y2 : this.itens[i].y2,
									tipoItem: this.itens[i].tipoItem,
									item : this.itens[i].item,
									pickItem: this.itens[i].id,
									quantidade: this.itens[i].quantidade
							}));
							
							this.item = new Item({							
								controller: this.controller,
								x1 : this.itens[i].x1,
								x2 : this.itens[i].x2,
								x : this.hero.x,
								y : this.hero.y,
								y1 : this.itens[i].y1,
								y2 : this.itens[i].y2,
								tipoItem: this.itens[i].tipoItem,
								item : this.itens[i].item,
								pickItem: "",
								quantidade: this.itens[i].quantidade
							});
							
							view.desenharItem = true;
							view.item = this.item;
							

						
						} else {
							this.item.pickItem = " adquirido";
							view.desenharItem = true;
							view.item = this.item;
						}				
										
							break;
					}
					
				}
				
				
			
		} else{
			view.desenharItem= false;
		}
		}
	
		
	
	

	
     

	
    if (this.hero.y > canvas.height - this.hero.spriteSize * 2
    / 3) {
	this.controller.buraco.get();
    this.hero.health = 0;
    }
    // update avg fps
    var anim = controller.anim;
    if (anim.getFrame() % 20 == 0) {
    this.controller.avgFps = Math.round(anim.getFps() *
    10) / 10;
    }
    
};
//5. Define the initHealthBar() method which initializes the health bar:
Model.prototype.initHealthBar = function(){
    this.healthBar = new HealthBar({
    controller: this.controller,
    maxHealth: this.hero.maxHealth,
    x: 10,
    y: 10,
    maxWidth: 150,
    height: 20
    });
};



//BATALHA


Model.prototype.initMonstro = function(){
    
	this.monstro = new Monstro({
    controller : this.controller,
    tipoMonstro :0,
	hpMonstro : 20*(this.hero.level/2),
	danoMonstro : 2.25*this.hero.level,
	attack: 2.25*this.hero.level
    });
};


Model.prototype.initSiegfried = function(){
    this.siegfried = new Siegfried({
    controller : this.controller,
    hp : 20,
    maxMp : 10,
    level : 1,
    attack : 5,
	exp: 0
    });
};




//6. Define the initMagicBar() method which initializes the health bar:
Model.prototype.initMagicBar = function(){
    this.magicBar = new MagicBar({
    controller: this.controller,
    mp: this.hero.mp,
    x: 10,
    y: 40,
    maxWidth: 150,
    height: 20
    });
};


//7. Define the initLevel() method which initializes the level:
Model.prototype.initLevel = function(){
    this.level = new Level({
    controller: this.controller,
    x: 0,
    y: 0,
    leftBounds: 100,
    rightBounds: 500
    });
};
//8. Define the initHero() method which initializes the hero:
Model.prototype.initHero = function(){
// initialize Hero
    var heroMotions = {
    STANDING: {
    index: 0,
    numSprites: 5,
    loop: true
    },
    AIRBORNE: {
    index: 1,
    numSprites: 5,
    loop: false
    },
    RUNNING: {
    index: 2,
    numSprites: 6,
    loop: true
    },
    ATTACKING: {
    index: 3,
    numSprites: 5,
    loop: false
    }
    };
    this.hero = new Actor({
    controller: this.controller,
    normalSpriteSheet: this.controller.images.heroSprites,
    hitSpriteSheet: this.controller.images.heroHitSprites,
    x: 170,
    y: 330,
    playerSpeed: 300,
    motions: heroMotions,
    startMotion: heroMotions.STANDING,
    facingRight: true,
    moving: false,
    spriteInterval: 90,
    maxHealth: 20,
    attackRange: 100,
    minAttackInterval: 200,
	maxMp: 20,
	mp : 20,
	level: 1,
	exp:0
    });
    this.heroCanvasPos = {
        x: this.hero.x,
    y: this.hero.y
    };
};
//8. Define the initBadGuys() method which initializes an array of bad guys:
Model.prototype.initBadGuys = function(){
// notice that AIRBORNE and RUNNING
// both use the same sprite animation
    var badGuyMotions = {
    RUNNING: {
    index: 0,
    numSprites: 5,
    loop: true
    },
    AIRBORNE: {
    index: 0,
    numSprites: 4,
    loop: false
    },
    ATTACKING: {
    index: 1,
    numSprites: 4,
    loop: false
    }
    };
    var badGuyStartConfig = [{
    x: 0,
    facingRight: true
    }];
    for (var n = 0; n < badGuyStartConfig.length; n++) {
		this.badGuys.push(new Actor({
		controller: this.controller,
		normalSpriteSheet: this.controller.images.
		badGuySprites,
		hitSpriteSheet: this.controller.images.
		badGuyHitSprites,
		x: badGuyStartConfig[n].x,
		y: 330,
		playerSpeed: 100,
		motions: badGuyMotions,
		startMotion: badGuyMotions.RUNNING,
		facingRight: badGuyStartConfig[n].facingRight,
		moving: true,
		spriteInterval: 160,
		maxHealth: 3,
		attackRange: 100,
		minAttackInterval: 2000
		}));
    }
};
//9. Define the moveBadGuys() method which serves as a simple AI engine:
Model.prototype.moveBadGuys = function(){
    var level = this.level;
    for (var n = 0; n < this.badGuys.length; n++) {
    var badGuy = this.badGuys[n];
    if (badGuy.alive) {
    if (badGuy.isFacingRight()) {
    badGuy.x += 5;
    if (!level.getZoneInfo(badGuy.getCenter()).
    inBounds) {
    badGuy.facingRight = false;
    }
    badGuy.x -= 5;
    }
    else {
    badGuy.x -= 5;
    if (!level.getZoneInfo(badGuy.getCenter()).
    inBounds) {
        badGuy.facingRight = true;
    }
    badGuy.x += 5;
    }
    }
    }
};
//10. Define the updateLevel() method:
Model.prototype.updateLevel = function(){
    var hero = this.hero;
    var level = this.level;
    level.x = -hero.x + this.heroCanvasPos.x;
};

Model.prototype.initItens = function(){
		
	this.itens1 = [{
    id:1,
	x1: -44,
	x2: 10,
    y1: 12,
	y2: 13,
	tipoItem: 'life1',
	item:'Poção de Vida',
	pickItem: false,
	quantidade: this.hero.health/2
    }, {
	id: 2,
    x1: 1865,
	x2: 1905,
    y1: -38,
	y2: -37,
	tipoItem: 'life2',
	item:'Super Poção de Vida',
	pickItem: false,
	quantidade: this.hero.health
    }, {
	id: 3,
    x1: 2003,
	x2: 2038,
    y1: 11,
	y2: 12,
	tipoItem: 'mana1',
	item:'Poção de Mana',
	pickItem: false,
	quantidade: this.hero.mp/2
    }, {
	id: 4,
	x1: 2806,
	x2: 2852,
    y1: -24,
	y2: -23,
	tipoItem: 'mana2',
	item:'Super Poção de Mana',
	pickItem: false,
	quantidade: this.hero.mp
	},{
	id: 5,
	x1: 4250,
	x2: 4320,
    y1: 1,
	y2: 2,
	tipoItem: 'geral',
	item:'Hiper poção',	
	pickItem: false,
	quantidade: 'ALL'
	}];
	
	this.itens2 = [{
    id:1,
	x1: -70,
	x2: -21,
    y1: 84,
	y2: 85,
	tipoItem: 'life1',
	item:'Poção de Vida',
	pickItem: false,
	quantidade: this.hero.health/2
    }, {
	id: 2,
    x1: 1333,
	x2: 1438,
    y1: 42,
	y2: 44,
	tipoItem: 'life2',
	item:'Super Poção de Vida',
	pickItem: false,
	quantidade: this.hero.health
    }, {
	id: 3,
    x1: 2443,
	x2: 2528,
    y1: 51,
	y2: 52,
	tipoItem: 'mana1',
	item:'Poção de Mana',
	pickItem: false,
	quantidade: this.hero.mp/2
    }, {
	id: 4,
	x1: 3937,
	x2: 4021,
    y1: 73,
	y2: 74,
	tipoItem: 'mana2',
	item:'Super Poção de Mana',
	pickItem: false,
	quantidade: this.hero.mp
	},{
	id: 5,
	x1: 4697,
	x2: 4787,
    y1: -2,
	y2: -1,
	tipoItem: 'geral',
	item:'Hiper poção',	
	pickItem: false,
	quantidade: 'ALL'
	},{
	id: 6,
	x1: 6218,
	x2: 6298,
    y1: 64,
	y2: 65,
	tipoItem: 'geral',
	item:'Hiper poção',	
	pickItem: false,
	quantidade: 'ALL'
	}];
	
	this.itens3 = [{
    id:1,
	x1: 87,
	x2: 172,
    y1: 50,
	y2: 51,
	tipoItem: 'life1',
	item:'Poção de Vida',
	pickItem: false,
	quantidade: this.hero.health/2
    }, {
	id: 2,
    x1: 1366,
	x2: 1451,
    y1: 28,
	y2: 29,
	tipoItem: 'life2',
	item:'Super Poção de Vida',
	pickItem: false,
	quantidade: this.hero.health
    }, {
	id: 3,
    x1: 2703,
	x2: 2778,
    y1: 19,
	y2: 20,
	tipoItem: 'mana1',
	item:'Poção de Mana',
	pickItem: false,
	quantidade: this.hero.mp/2
    }, {
	id: 4,
	x1: 3332,
	x2: 3407,
    y1: -31,
	y2: -30,
	tipoItem: 'mana2',
	item:'Super Poção de Mana',
	pickItem: false,
	quantidade: this.hero.mp
	},{
	id: 5,
	x1: 5137,
	x2: 5203,
    y1: -10,
	y2: -9,
	tipoItem: 'geral',
	item:'Hiper poção',	
	pickItem: false,
	quantidade: 'ALL'
	}];
};

Model.prototype.initOptions = function(){
	this.options = new Options({
		controller: this.controller, 
		opcao: 0,
	    speedPlayer: 0,
	    speedBoss: 0,
	    skill: 0,
		monstro: 0
	});
};

Model.prototype.initSkills = function(){
	this.skills = new Skill({
		controller : this.controller,
		speedPlayer : 0,
		skill : this.controller.skill,
		hpMonstro : 10,
		level : 1,
		mp : 5,
		efeito : 0,
		attack : 1,
		dano : 0
	});
};

Model.prototype.initPuzzle = function(){
	this.puzzle = new Puzzle({
		controller: this.controller,
		canvas : this.controller.view.canvas,
		context : this.controller.view.context
	});
};

Model.prototype.initItem = function(){
	this.item = new Item({
							
							controller: this.controller,
							x1 : 0,
							x2 : 0,
							x : 0,
							y : 0,
							y1 : 0,
							y2 : 0,
							tipoItem: 0,
							item : 0,
							pickItem: 0,
							quantidade: 0
					    });
	
};

//11. Define the updateHeroCanvasPos() method which updates the position of the
//hero relative to the canvas:
Model.prototype.updateHeroCanvasPos = function(oldHeroX){
    this.heroCanvasPos.y = this.hero.y;
    var heroDiffX = this.hero.x - oldHeroX;
    var newHeroCanvasPosX = this.heroCanvasPos.x + heroDiffX;
    // if moving right and not past right bounds
    if (heroDiffX > 0 && newHeroCanvasPosX < this.level.
    rightBounds) {
    this.heroCanvasPos.x += heroDiffX;
    }
    // if moving left and not past left bounds
    if (heroDiffX < 0 && newHeroCanvasPosX > this.level.
    leftBounds) {
    this.heroCanvasPos.x += heroDiffX;
    }
    if (this.hero.x < this.level.leftBounds) {
    this.heroCanvasPos.x = this.hero.x;
    }
};
//12. Define the updateActor() method:
Model.prototype.updateActor = function(actor){
    if (actor.alive) {
    if (actor.health <= 0 || actor.y + actor.SPRITE_SIZE >
    this.controller.view.canvas.height) {
    actor.alive = false;
    }
    else {
        this.updateActorVY(actor);
    this.updateActorY(actor);
    this.updateActorX(actor);
    actor.updateSpriteMotion();
    actor.updateSpriteSeqNum();
    }
    }
    else {
    if (actor.opacity > 0) {
    actor.fade();
    }
    }
};


//13. Define the updateActorVY() method which uses the downward force of gravity and
//the upward force of the levitation pods to update the vertical velocity of an actor:
Model.prototype.updateActorVY = function(actor) {
    var anim = this.controller.anim;
    var level = this.level;
    // apply gravity (+y)
    var gravity = this.controller.model.level.GRAVITY;
    var speedIncrementEachFrame = gravity * anim.getTimeInterval()
    / 1000; // pixels / second
    actor.vy += speedIncrementEachFrame;
    // apply levitation (-y)
    if (level.getZoneInfo(actor.getCenter()).levitating) {
    this.hero.health = this.hero.health - 1;
	actor.vy = (65 + actor.y) / 200;
    }
};
//14. Define the updateActorY() method which updates the y position of the actor
//based on his vertical velocity:
    Model.prototype.updateActorY = function(actor) {
    var anim = this.controller.anim;
    var level = this.level;
    var oldY = actor.y;
    actor.y += actor.vy * anim.getTimeInterval();
    if (level.getZoneInfo(actor.getCenter()).inBounds) {
    actor.airborne = true;
    }
    else {
    actor.y = oldY;
    // handle case where player has fallen to the ground
    // if vy is less than zero, this means the player has just
    // hit the ceiling, in which case we can simply leave
    // this.y as oldY to prevent the player from going
    // past the ceiling
    if (actor.vy > 0) {
    while (level.getZoneInfo(actor.getCenter()).inBounds)
    {
    actor.y++;
    }
    actor.y--;
    actor.vy = 0;
    actor.airborne = false;
    }
    }
};
//15. Define the updateActorX() method which updates the actor's x position:
Model.prototype.updateActorX = function(actor) {
    var anim = this.controller.anim;
    var level = this.level;
    var oldX = actor.x;
    var changeX = actor.playerSpeed * (anim.getTimeInterval() /
    1000);
    if (actor.moving) {
    actor.facingRight ? actor.x += changeX : actor.x -=
    changeX;
    }
    if (!level.getZoneInfo(actor.getCenter()).inBounds) {
    actor.x = oldX;
    while (level.getZoneInfo(actor.getCenter()).inBounds) {
    actor.facingRight ? actor.x++ : actor.x--;
    }
    // reposition to nearest placement in bounds
    actor.facingRight ? actor.x-- : actor.x++;
    }
    };
//16. Define the nearby() method which determines whether or not two actors are near
//each other:
Model.prototype.nearby = function(actor1, actor2){
    return (Math.abs(actor1.x - actor2.x) < actor1.attackRange)
    && Math.abs(actor1.y - actor2.y) < 30;
};
