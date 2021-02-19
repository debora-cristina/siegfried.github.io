/**
 * A sound pool to use for the sound effects
 */
function AudioManager(maxSize) {
	var size = maxSize; // Max sounds allowed in the pool
	var pool = [];
	this.pool = pool;
	var currSound = 0;
	/*
	 * Populates the pool array with the given sound
	 */
	this.init = function(object) {
		if (object == "introducao") {
			for (var i = 0; i < size; i++) {
				// Initalize the sound
				introducao = new Audio("sound/introducao.mp3");
				introducao.volume = .12;
				introducao.load();
				pool[i] = introducao;
			}
		}
		else if (object == "menu") {
			for (var i = 0; i < size; i++) {
				var menu = new Audio("sound/menu.mp3");
				menu.volume = .1;
				menu.load();
				pool[i] = menu;
			}
		} else if ( object == "selecionar"){
			for (var i = 0; i < size; i++) {
			var selecionar = new Audio("sound/select.mp3");
				selecionar.volume = .25;
				selecionar.load();
				pool[i] = selecionar;
		}
		} else if ( object == "pulo"){
			for (var i = 0; i < size; i++) {
			var pulo = new Audio("sound/Pulo.mp3");
				pulo.volume = .25;
				pulo.load();
				pool[i] = pulo;
			}
		} else if ( object == "buraco"){
			for (var i = 0; i < size; i++) {
			var buraco = new Audio("sound/Queda_abismo.mp3");
				buraco.volume = .25;
				buraco.load();
				pool[i] = buraco;
		}
		} else if ( object == "bau"){
			for (var i = 0; i < size; i++) {
			var bau = new Audio("sound/abrir_bau.mp3");
				bau.volume = .25;
				bau.load();
				pool[i] = bau;
		}
		} else if ( object == "options"){
			for (var i = 0; i < size; i++) {
			var options = new Audio("sound/select_options.mp3");
				options.volume = .25;
				options.load();
				pool[i] = options;
		}
		}
		else if ( object == "pause"){
			for (var i = 0; i < size; i++) {
			var pause = new Audio("sound/Pause.mp3");
				pause.volume = .25;
				pause.load();
				pool[i] = pause;
		}
		}
	};
	

	/*
	 * Plays a sound
	 */
	this.get = function() {
		if(pool[currSound].currentTime == 0 || pool[currSound].ended) {
			pool[currSound].play();
		}
		currSound = (currSound + 1) % size;
	};
}