
/*
* Char class should have no knowledge
* of the Level or HealthBar classes to
* keep it decoupled
*/

function Char(config){
    this.controller = config.controller;
    this.normalSpriteSheet = config.normalSpriteSheet;
    this.hitSpriteSheet = config.hitSpriteSheet;
    this.x = config.x; // absolute x
    this.y = config.y; // absolute y
    this.playerSpeed = config.playerSpeed; // px / s
    this.motions = config.motions;
    this.startMotion = config.startMotion;
    this.facingRight = config.facingRight;
    this.moving = config.moving;
    this.spriteInterval = config.spriteInterval; // ms
    this.maxHealth = config.maxHealth;
	this.magicMp = config.maxMp;
    this.attackRange = config.attackRange;
    this.minAttackInterval = config.minAttackInterval;
    this.SPRITE_SIZE = 96;
    this.FADE_RATE = 1; // full fade in 1s
    this.spriteSheet = this.normalSpriteSheet;
    this.vx = 0;
    this.vy = 0;
    this.spriteSeq = 0;
    this.motion = this.startMotion;
    this.lastMotion = this.motion;
    this.airborne = false;
    this.attacking = false;
    this.canAttack = true;
    this.health = this.maxHealth;
	this.mp = this.maxMp;
    this.alive = true;
    this.opacity = 1;
    this.timeSinceLastSpriteFrame = 0;
}

//3. Define the stop() method which stops the Char from moving:
Char.prototype.stop = function(){
this.moving = false;
};

//8. Define the draw() method:
Char.prototype.draw = function(pos){
    var context = this.controller.view.context;
    var sourceX = this.spriteSeq * this.SPRITE_SIZE;
    var sourceY = this.motion.index * this.SPRITE_SIZE;
    context.save();
    context.translate(pos.x, pos.y);
    context.globalAlpha = this.opacity;
    context.drawImage(this.spriteSheet, sourceX, sourceY, this.
    SPRITE_SIZE, this.SPRITE_SIZE, 0, 0, this.SPRITE_SIZE, this.
    SPRITE_SIZE);
    context.restore();
};

//11. Define the updateSpriteSeqNum() method which increments or resets the sprite
//sequence number for each sprite interval:
    Char.prototype.updateSpriteSeqNum = function() {
    var anim = this.controller.anim;
    this.timeSinceLastSpriteFrame += anim.getTimeInterval();
    if (this.timeSinceLastSpriteFrame > this.spriteInterval) {
    if (this.spriteSeq < this.motion.numSprites - 1) {
    this.spriteSeq++;
    }
    else {
    if (this.motion.loop) {
    this.spriteSeq = 0;
    }
    }
    this.timeSinceLastSpriteFrame = 0;
    }
    if (this.motion != this.lastMotion) {
    this.spriteSeq = 0;
    this.lastMotion = this.motion;
    }
};

//13. Define the getCenter() method which returns the position of the center of
//the Char:
Char.prototype.getCenter = function(){
    return {
    x: Math.round(this.x) + this.SPRITE_SIZE/2,
    y: Math.round(this.y) + this.SPRITE_SIZE
    };
};
