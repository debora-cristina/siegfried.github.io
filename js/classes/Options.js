//1. Define the HealthBar constructor:
/*
* HealthBar class should have no knowledge
* of the Actor or Level classes to
* keep it decoupled
*/
function Options(config){
    this.controller = config.controller;
	this.opcao = config.opcao;
	this.speedPlayer = config.speedPlayer;
	this.speedBoss = config.speedBoss;
	this.skill = config.skill;
	this.monstro = config.monstro;
	this.barraAcao = false;
	this.turno = true;
	this.quantidade = 0;

}

Options.prototype.setBarraAcao = function(barraAcao){
	this.barraAcao = barraAcao;
};

//3. Define the draw() method which draws the health bar:
Options.prototype.draw = function(cont){
    var context = this.controller.view.context;
	var model = this.controller.model;
	var personagem = new Image();
	var boss = new Image();
	personagem.src = "img/char.png";
	boss.src = "img/bear.png"
	this.controller.view.drawFps();

	if(this.barraAcao){
		this.controller.mana = "YES";
		context.font      = "16px Verdana";
		context.fillStyle = "#000000";

		context.textAlign = "left";
		context.fillText("Atacar", 30, 500);

		context.textAlign = "left";
		context.fillText("For Odin!", 30, 530);
		
		context.textAlign = "left";
		context.fillText("Frenezi", 30, 560);
		
		context.textAlign = "left";
		context.fillText("Usar Item", 250 , 500);
		this.opcao = cont;
		
		
			switch(cont){
				case 1:
				context.textAlign = "left";
				context.fillStyle = 'blue';
				context.fillText("Atacar", 30, 500);
									
				break;
				case 2:
				
				context.textAlign = "left";
				context.fillStyle = 'blue';
				context.fillText("For Odin!", 30, 530);

				break;
				case 3:
				
				context.textAlign = "left";
				context.fillStyle = 'blue';
				context.fillText("Frenezi", 30, 560);
				break;
				
				case 4:
				context.textAlign = "left";
				context.fillStyle = 'blue';
				context.fillText("Usar Item", 250 , 500);
				this.drawItens(0);
				
					case 5:
				this.drawItens(0);
				break;
				
					case 6:
				this.drawItens(0);
				break;
				
					case 7:
				this.drawItens(0);
				break;
				
					case 8:
				this.drawItens(0);
				break;
				
					case 9:
				this.drawItens(0);
				
				break;
			}
	
	
		
	} else {

		context.font      = "16px Verdana";
		context.fillStyle = "#000000";
		context.textAlign = "left";
		context.fillText("Aguarde.. turno do monstro", 30, 500);
	}
	var monstro = new Image();
		if(this.monstro ==1){
				monstro.src = "img/monstro_1.png";
		} else if(this.monstro==2){
				monstro.src = "img/monstro_2.png";
		} else if(this.monstro==3){
				monstro.src = "img/monstro_3.png";
		} else if(this.monstro==4){
			    monstro.src = "img/bear.png";
		} else if(this.monstro ==5){
			monstro.src = "img/dragao.png";
		} else if(this.monstro == 6){
			monstro.src = "img/odin.png";
		}
		if(this.controller.state == this.controller.states.FIGHTING){
			if(this.speedPlayer == 0 && this.speedBoss == 0){
				context.drawImage(personagem,200,250);
				context.drawImage(monstro,400,200);
			}
			
			if(this.speedPlayer == 1 && this.speedBoss == 0){
				context.drawImage(this.controller.images.heroAttack,220,250);
				context.drawImage(monstro,500,200);
			}
			
			if(this.speedPlayer == 0 && this.speedBoss == 1){
				context.drawImage(personagem,200,250);
				context.drawImage(monstro,420,200);
			}
		}

	
};

Options.prototype.drawItens = function(cont){
    var context = this.controller.view.context;
	var model = this.controller.model;
    var itens = model.itensColetados;
	var cont = 0;
	
	//console.log("itens");

		context.font      = "16px Verdana";
		context.fillStyle = "#000000";

		function contarItens(nome){
				for(var i =0; i< itens.length; i++){
					if(itens[i].tipoItem == nome){
						cont++;
					}
				}
				
				return cont;
		}
		
		cont = contarItens("life1");
		context.textAlign = "left";
		context.fillText("Poção de vida: " + cont, 450, 500);

		var cont = 0;
		cont = contarItens("life2");
		context.textAlign = "left";
		context.fillText("Super Poção de Vida: " + cont, 450, 530);
		
		
		var cont = 0;
		cont = contarItens("mana1");
		context.textAlign = "left";
		context.fillText("Poção de Mana: " + cont, 450, 560);
		
		var cont = 0;
		cont = contarItens("life2");
		context.textAlign = "left";
		context.fillText("Super Poção de Mana: " + cont , 670 , 500);
		
		var cont = 0;
		cont = contarItens("geral");
		context.textAlign = "left";
		context.fillText("Hiper poção: " + cont , 670 , 530);
		
		
			switch(this.opcao){
				case 5:
				//cont = contarItens("life1");
				context.fillStyle = 'blue';
				context.textAlign = "left";
				context.fillText("Poção de vida: ", 450, 500);
									
				break;
				case 6:
				
				context.textAlign = "left";
				context.fillStyle = 'blue';
				context.fillText("Super Poção de Vida: ", 450, 530);

				break;
				case 7:
				
				context.textAlign = "left";
				context.fillStyle = 'blue';
				context.fillText("Poção de Mana: ", 450, 560);
				break;
				
				case 8:
				context.textAlign = "left";
				context.fillStyle = 'blue';
				context.fillText("Super Poção de Mana: ", 670 , 500);
				
				break;
				
				case 9:
				context.textAlign = "left";
				context.fillStyle = 'blue';
				context.fillText("Hiper poção: ", 670 , 530);
				break;
			
		}


	
};
