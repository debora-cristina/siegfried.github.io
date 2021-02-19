//1. Define the Level constructor:
/*
* Level class should have no knowledge
* of the Actor or HealthBar classes to
* keep it decoupled
*/
function Level(config){
    this.controller = config.controller;
    this.x = config.x;
    this.y = config.y;
    this.leftBounds = config.leftBounds;
    this.rightBounds = config.rightBounds;
    this.boundsData = null;
    this.GRAVITY = 3; // px / second^2
    this.MID_RGB_COMPONENT_VALUE = 128;
    this.LEVEL_WIDTH = 7288;
    this.setBoundsData();
}
//2. Define the setBoundsData() method which extracts the zone data from the
//boundary map image:
Level.prototype.setBoundsData = function(){
    var controller = this.controller;
    var canvas = controller.view.canvas;
    var context = controller.view.context;
    canvas.width = 7288;
    var img = new Image();
	if(this.controller.idFase == 1){
		img.src = "img/level_bounds.png";		
	} else if(this.controller.idFase == 3){
		img.src = "img/level_bounds4.png";	
	} else if(this.controller.idFase == 4){
		img.src = "img/level_bounds3.png";
	}
	canvas.getContext('2d').drawImage(img, 0, 0);
	var imageData = canvas.getContext('2d').getImageData(0, 0, 7288, 600);		
		this.boundsData = imageData.data;
		canvas.width = 900;
 };
    //3. Define the draw() method which draws the background image and the level image:

	Level.prototype.draw = function(){
    var context = this.controller.view.context;
	
    if(this.controller.idFase == 1){
		context.drawImage(this.controller.images.background, 0, 0);
		context.drawImage(this.controller.images.level, this.x,
		this.y); 
	} else if (this.controller.idFase == 3){
		context.drawImage(this.controller.images.background4, 0, 0);
		context.drawImage(this.controller.images.level4, this.x,
    this.y); 
	} else if (this.controller.idFase == 4){
		context.drawImage(this.controller.images.background3, 0, 0);
		context.drawImage(this.controller.images.level3, this.x,
    this.y); 
	}
};
//4. Define the getZoneInfo() method which returns zone information about a point in
//the boundary map:
Level.prototype.getZoneInfo = function(pos){
    var x = pos.x;
    var y = pos.y;
    var red = this.boundsData[((this.LEVEL_WIDTH * y) + x) * 4];
    var green = this.boundsData[((this.LEVEL_WIDTH * y) + x) * 4 +
    1];
    var blue = this.boundsData[((this.LEVEL_WIDTH * y) + x) * 4 +
    2];
	var inSpike = false;
    var inBounds = false;
    var levitating = false;
    /*
    * COLOR KEY
    *
    * PINK: 255 0 255
    * CYAN: 0 255 255
    *
    * COLOR NOTATION
    *
    * PINK: player is in bounds and can jump
    * CYAN: player is in bounds and is levitating
    */
    var mid = this.MID_RGB_COMPONENT_VALUE;
    if ((red > mid && green < mid && blue > mid) || (red < mid &&
    green > mid && blue > mid)) {
    inBounds = true;
    }
    if (red < mid && green > mid && blue > mid) {
    levitating = true;
    }
    return {
    inBounds: inBounds,
    levitating: levitating
    };
};