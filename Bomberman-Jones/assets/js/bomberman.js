var bomberman, game, bomb, x = 4, walls;
function map(){
	return [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			 [0,20,20,2,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,0],
			 [0,20,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0],
			 [0,2,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,0],
			 [0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0],
			 [0,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,0],
			 [0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0],
			 [0,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,0],
			 [0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0],
			 [0,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,0],
			 [0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0],
			 [0,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,0],
			 [0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0,x,0],
			 [0,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,0],
			 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
			];
}
function Bomb(){
	this.bomb_interval;
	this.bombs = {count: [1,2,3,4], time: 3000, range: 1, bomb_walk: false};

	this.explode_range = function(location, hit = ""){
		(walls[location.y][location.x] !== 22 ? walls[location.y][location.x] = 3 : "");
		if(hit == 'box'){
			setTimeout(function(){
				walls[location.y][location.x] = game.box_contain();	
				game.generate_map(walls);
			},500);
		}else{
			setTimeout(function(){
				(walls[location.y][location.x] !== 22 ? walls[location.y][location.x] = 1 : "");	
				game.generate_map(walls);
			},500);
		}
	}
	this.explode = function(bomb_location){
		this.bombs.count.push(this.bombs.count.length+1);
		for(var index in bomb_location){
			for(var i = 0; i <= bomb.bombs.range; i ++)
			{	
				var location = {};
				if(index == 'x'){
					if(walls[bomb_location.y][bomb_location.x+i] == 2 && bomb_location.y % 2 !== 0 && bomb_location.x+i <= (walls[bomb_location.y].length -1)){
						location = {y: bomb_location.y, x: bomb_location.x+i};
						this.explode_range(location,'box');
					}
					else if(walls[bomb_location.y][bomb_location.x+i] !== 0 && bomb_location.y % 2 !== 0 && bomb_location.x+i <= (walls[bomb_location.y].length -1)){
						location = {y: bomb_location.y, x: bomb_location.x+i};
						this.explode_range(location);
					}
					if(walls[bomb_location.y][bomb_location.x-i] == 2 && bomb_location.y % 2 !== 0 && bomb_location.x-i >= 1){
						location = {y: bomb_location.y, x: bomb_location.x-i};
						this.explode_range(location,'box');
					}
					else if(walls[bomb_location.y][bomb_location.x-i] !== 0 && bomb_location.y % 2 !== 0 && bomb_location.x-i >= 1){
						location = {y: bomb_location.y, x: bomb_location.x-i};
						this.explode_range(location);
					}
				}else{
					if(walls[bomb_location.y+i] !== undefined && walls[bomb_location.y+i][bomb_location.x] == 2 && bomb_location.x % 2 !== 0){
						location = {y: bomb_location.y+i, x: bomb_location.x};
						this.explode_range(location,'box');
					}
					else if(walls[bomb_location.y+i] !== undefined && walls[bomb_location.y+i][bomb_location.x] !== 0 && bomb_location.x % 2 !== 0){
						location = {y: bomb_location.y+i, x: bomb_location.x};
						this.explode_range(location);
					}
					if(walls[bomb_location.y-i] !== undefined && walls[bomb_location.y-i][bomb_location.x] == 2 && bomb_location.x % 2 !== 0){
						location = {y: bomb_location.y-i, x: bomb_location.x};
						this.explode_range(location,'box');
					}
					else if(walls[bomb_location.y-i] !== undefined && walls[bomb_location.y-i][bomb_location.x] !== 0 && bomb_location.x % 2 !== 0){
						location = {y: bomb_location.y-i, x: bomb_location.x};
						this.explode_range(location);
					}
				}
			}
		}
		bomberman.update_life(bomb_location);	
		game.generate_map(walls);
	}
}

function Bomberman(){
	this.name = document.getElementById('name');
	this.life = 4;
	this.stage = 1;
	this.score = 0;
	this.y = 1 ;
	this.x = 1;
	this.displayBomberman = function(){
		document.getElementById('bomberman').style.left = (this.x * 40) + 100 +"px";
		document.getElementById('bomberman').style.top = this.y * 40 +"px";
	}	
	this.check_ups = function(location){
		switch(location){
			case 10:
				this.life ++;
				this.bomber_life(this.life);
				walls[this.y][this.x] = 1;
	        break;
	        case 11:
				bomb.bombs.count.push(bomb.bombs.count.length+1);
				walls[this.y][this.x] = 1;
	        break;
	        case 12:
	        	bomb.bombs.range ++;
				walls[this.y][this.x] = 1;
	        break;
	        case 13:
	        	bomb.bombs.bomb_walk = true;
				walls[this.y][this.x] = 1;
	        break;
	        case 22:
	        	this.score += 5000;
	        	game.next_Stage();
	        break;
		}
		game.generate_map(walls);
	}
	this.movement = function(){
		if(game.time == false){
			document.getElementsByTagName('body')[0].onkeydown = null;		
		}
		else{
			document.body.onkeydown = function(e){
				if(e.keyCode == 39 && (bomb.bombs.bomb_walk == false ? walls[bomberman.y][bomberman.x+1] != 0 && walls[bomberman.y][bomberman.x+1] != 2 && walls[bomberman.y][bomberman.x+1] !== 9 : walls[bomberman.y][bomberman.x+1] != 0 && walls[bomberman.y][bomberman.x+1] != 2)){		
					bomberman.x ++;
				}else if(e.keyCode == 37 && (bomb.bombs.bomb_walk == false ? walls[bomberman.y][bomberman.x-1] != 0 && walls[bomberman.y][bomberman.x-1] != 2 && walls[bomberman.y][bomberman.x-1] !== 9 : walls[bomberman.y][bomberman.x-1] != 0 && walls[bomberman.y][bomberman.x-1] != 2)){		
					bomberman.x --;
				}else if(e.keyCode == 38 && (bomb.bombs.bomb_walk == false ? walls[bomberman.y-1][bomberman.x] != 0 && walls[bomberman.y-1][bomberman.x] != 2 && walls[bomberman.y-1][bomberman.x] !== 9 : walls[bomberman.y-1][bomberman.x] != 0 && walls[bomberman.y-1][bomberman.x] != 2)){
					bomberman.y --;
				}else if(e.keyCode == 40 && (bomb.bombs.bomb_walk == false ? walls[bomberman.y+1][bomberman.x] != 0 && walls[bomberman.y+1][bomberman.x] != 2 && walls[bomberman.y+1][bomberman.x] !== 9 : walls[bomberman.y+1][bomberman.x] != 0 && walls[bomberman.y+1][bomberman.x] != 2)){
					bomberman.y ++;
				}else if(e.keyCode == 32 && bomb.bombs.count.length !== 0 && walls[bomberman.y][bomberman.x] != 9){
					var bomb_location = {y: bomberman.y, x: bomberman.x};
					walls[bomberman.y][bomberman.x] = 9;
					bomb_interval = setTimeout(function(){
						bomb.explode(bomb_location);
					},bomb.bombs.time);
					bomb.bombs.count.pop();
					game.generate_map(walls);
				}
				bomberman.check_ups(walls[bomberman.y][bomberman.x]);
				bomberman.displayBomberman();
				bomberman.update_life();
			}
		}
	}
	this.update_life = function(location = null){
		if(walls[bomberman.y][bomberman.x] == 3 || (location == null ? "" : walls[location.y][location.x] == walls[bomberman.y][bomberman.x])){
			bomberman.life --;
		}
		this.bomber_life(bomberman.life);
	}
	this.bomber_life = function(life){
		var html_life = "";
		for(var i = 0; i < life; i ++){
			html_life += '<span class="life">&#9786;</span>';
		}
		document.getElementById("life").innerHTML = html_life;
		if(life <= 0){
			game.game_over();
		}
	}
	this.bomber_life(this.life)
}

function BombermanGame(){
	this.final_stage = false;
	this.starting_minutes = 10;
	this.minutes;
	this.seconds = 1;
	this.t;
	this.time = true;
	this.time_left = document.getElementsByTagName('h2')[0];
	this.enemy_interval;
	this.boss_interval;
	this.enemies = document.getElementsByClassName('enemy');
	this.enemylimit = 15;
	this.boss = {life: 4, show: false};

	this.generate_map = function(walls){
		var html_wall = "";
		for(var count_row = 0; count_row < walls.length; count_row++){
			html_wall += '\n<div class="wall">\n';
			for(var count = 0; count < walls[count_row].length; count++){
				if(walls[count_row][count] == 4){
					walls[count_row][count] = Math.floor((Math.random() * 2) + 1);		
				}

				if(walls[count_row][count] == 0){
					html_wall += '<div class="unbreakable"></div>';
				}
				else if(walls[count_row][count] == 1 || (walls[count_row][count] >= 14 && walls[count_row][count] <= 20 )){
					html_wall += '<div class="nobox"></div>';
				}
				else if(walls[count_row][count] == 2){
					html_wall += '<div class="breakable"></div>';
				}
				else if(walls[count_row][count] == 3){
					html_wall += '<div class="explosion"></div>';
				}
				else if(walls[count_row][count] == 9){
					html_wall += '<div class="bombs"></div>';
				}
				else if(walls[count_row][count] == 10){
					html_wall += '<div class="life_ups"></div>';
				}
				else if(walls[count_row][count] == 11){
					html_wall += '<div class="add_bomb"></div>';
				}
				else if(walls[count_row][count] == 12){
					html_wall += '<div class="range_bomb"></div>';
				}
				else if(walls[count_row][count] == 13){
					html_wall += '<div class="bomb_walk"></div>';
				}
				else if(walls[count_row][count] == 22){
					html_wall += '<div id="flag"></div>';
				}
				else if(walls[count_row][count] == 21 && this.boss.show !== true){
					html_wall += '<div class="nobox"></div>';
					walls[count_row][count] = 1;
					this.boss.show = true;
					html_boss = '<div id="boss" x="'+count+'" y="'+count_row+'"></div>';
					document.querySelector('#game').innerHTML += html_boss;
					this.boss.name = document.getElementById('boss');
					game.boss_move();
				}
			}	
			html_wall += '\n</div>';
		}
		document.querySelector('#game-map').innerHTML = html_wall;
		this.update_score();
	}
	this.box_contain = function(){
		var breakable = document.getElementsByClassName('breakable').length,
			contain_boss = Math.floor(Math.random() * (21 - 10 + 1)) + 10,
			no_boss = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
			bomberman.score += 100;
		return (this.boss.show == false && breakable < 50 ? contain_boss : no_boss);
	}	
	this.respawn_enemy = function(walls){
		clearInterval(this.enemy_interval);
		if(this.boss.show == false){
			var enemy_html = "",
			counter = this.enemies.length;
			for(var count_row = 0; count_row < walls.length; count_row++){
				for(var count = 0; count < walls[count_row].length; count++){
					if(walls[count_row][count] == 1){
						var nums = (counter <= this.enemylimit ? [1,5,1,1,1,1,1,1,1] : [1]),
						num =  nums[Math.floor(Math.random()*nums.length)]
						if(num == 5){
							enemy_html += '<div id='+ counter +' class="enemy" x="'+count+'" y="'+ count_row +'"></div>';
							num = 1;
							counter ++;
						}
						walls[count_row][count] = num;
					}
				}
			}
			document.querySelector('#game').innerHTML += enemy_html;
			game.generate_map(walls);
			game.enemy_interval = setInterval(function(){ game.random_move(); }, 500);
		}
	}
	this.count_down = function(){
		if(game.minutes == 0 && game.seconds == 0){
			game.game_over()
		}
	    else{
		    if(game.minutes % 2 == 0 && game.seconds == 0){
		    	game.respawn_enemy(walls);
		    }
	    	if (game.seconds == 0) {
		        game.seconds = 60;
		        game.minutes--;
		    }

	    	game.seconds--;		    
			document.getElementById("game").style.backgroundColor = "";
	    }
	    game.time_left.textContent = (game.minutes ? (game.minutes > 9 ? game.minutes : "0" + game.minutes) : "00") + ":" + (game.seconds > 9 ? game.seconds : "0" + game.seconds);
		game.timer();
	}
	this.timer = function() {
	    this.time = true;
		bomberman.movement();
	    this.t = setTimeout(game.count_down, 1000);
	}
	this.stop_time = function() {
	    clearTimeout(this.t);
		clearInterval(this.enemy_interval);
		clearInterval(this.boss_interval);
	    this.time = false;    
		bomberman.movement();
	}
	this.clear_time = function() {
	    this.time_left.textContent = "";
	    this.seconds = 1; this.minutes = this.starting_minutes;
	}
	this.next_Stage = function(){
		game.stop_time();
		this.boss.show = false;
		if(game.final_stage == true){
			document.querySelector('#control-pause').setAttribute('disabled',"");
			document.querySelector('#control-restart').setAttribute('disabled',"");
			document.getElementById("game-final").removeAttribute("class");
			document.getElementById("game-map").style.opacity = .5;	
		}else{
			document.querySelector('#control-pause').setAttribute('disabled',"");
			document.querySelector('#control-restart').setAttribute('disabled',"");
			document.querySelector('#control-quit').setAttribute('disabled',"");
			document.getElementById("game-clear").removeAttribute("class");
			document.getElementById("game-map").style.opacity = .5;
		}	
	}
	this.game_over = function(){
		if(bomberman.life <= 0 || (this.minutes == 0 && this.seconds == 0)){		
			game.stop_time();
			bomberman.score = 0;
			document.querySelector("#game-over h3").textContent = "Game Over";
			document.getElementById("game").style.backgroundColor = "grey";
			document.getElementById("game-over").removeAttribute("class");
			document.querySelector('#control-quit').setAttribute('disabled',"");
			document.querySelector('#control-pause').setAttribute('disabled',"");
			document.querySelector('#control-restart').setAttribute('disabled',"");
		}
	}
	this.remove_boss = function(){
		clearInterval(this.enemy_interval);
		(this.boss.show !== false ? document.getElementById('game').removeChild(this.boss.name) : "");
		this.boss.name = document.getElementById('boss');
		this.boss.show = false;
	}
	this.boss_move = function(){
		var rand_xy = ['left','right','up','down'];
		boss_interval = setInterval(function(){
			var move = rand_xy[Math.floor(Math.random()*rand_xy.length)],
				x = parseInt(game.boss.name.getAttribute('x')),
				y = parseInt(game.boss.name.getAttribute('y'));
			if(move == 'up' && walls[y-1][x] !== 0 && walls[y-1][x] !== 2 && walls[y-1][x] !== 9){
				y -= 1;
				game.boss.name.setAttribute('y',y);
			}else if(move == 'down' && walls[y+1][x] !== 0 && walls[y+1][x] !== 2 && walls[y+1][x] !== 9){
				y += 1;
				game.boss.name.setAttribute('y',y);
			}else if(move == 'left' && walls[y][x-1] !== 0 && walls[y][x-1] !== 2 && walls[y][x-1] !== 9){
				x -= 1;
				game.boss.name.setAttribute('x',x);
			}else if(move == 'right' && walls[y][x+1] !== 0 && walls[y][x+1] !== 2 && walls[y][x+1] !== 9){
				x += 1;
				game.boss.name.setAttribute('x',x);
			}

			if(y == bomberman.y && x == bomberman.x)
			{
				bomberman.life--;
				bomberman.bomber_life(bomberman.life);
			}
			if(walls[y][x] == 3){
				game.boss.life --;
				bomberman.score += 500;			
				if(game.boss.life <= 0){
					walls[y][x] = 22;
					bomberman.score += 1500;
					game.generate_map(walls);
					document.getElementById('game').removeChild(game.boss.name);
					clearInterval(boss_interval);
				}
			}
			game.boss.name.style.left = (x * 40) + 105 + 'px';
			game.boss.name.style.top = (y * 40) + 'px';
		},300);
	}
	this.random_move = function(){
		var rand_xy = ['left','right','up','down'];
		if(this.time !== false){
			for(var i = 0; i < this.enemies.length; i ++){
				var move = rand_xy[Math.floor(Math.random()*rand_xy.length)],
				x = parseInt(this.enemies[i].getAttribute('x')),
				y = parseInt(this.enemies[i].getAttribute('y'));

				if(move == 'up' && walls[y-1][x] !== 0 && walls[y-1][x] !== 2 && walls[y-1][x] !== 9){
					y -= 1;
					this.enemies[i].setAttribute('y',y);
				}else if(move == 'down' && walls[y+1][x] !== 0 && walls[y+1][x] !== 2 && walls[y+1][x] !== 9){
					y += 1;
					this.enemies[i].setAttribute('y',y);
				}else if(move == 'left' && walls[y][x-1] !== 0 && walls[y][x-1] !== 2 && walls[y][x-1] !== 9){
					x -= 1;
					this.enemies[i].setAttribute('x',x);
				}else if(move == 'right' && walls[y][x+1] !== 0 && walls[y][x+1] !== 2 && walls[y][x+1] !== 9){
					x += 1;
					this.enemies[i].setAttribute('x',x);
				}

				if(y == bomberman.y && x == bomberman.x)
				{
					bomberman.life--;
					bomberman.bomber_life(bomberman.life);
				}
				if(walls[y][x] == 3){
					document.getElementById('game').removeChild(this.enemies[i]);
					bomberman.score += 200;
				}
				this.enemies[i].style.left = (x * 40) + 105 + 'px';
				this.enemies[i].style.top = (y * 40) + 'px';
			}
		}else{
		clearInterval(this.enemy_interval);
		}
	}
	this.update_score = function(){
		document.querySelector(".score").textContent = bomberman.score;
		document.querySelector(".stage").textContent = bomberman.stage;
	}	
}

// // ------------------------ TIMER!! ------------------------

// // --------------- END of Timer -----------	Submit Name ---------
document.getElementById("wrapper-game").setAttribute("hidden",'');
document.getElementById("game-pause").setAttribute("hidden",'');

document.getElementById("submit_name").addEventListener("submit", function(evt){
	name = document.getElementById("name").value;
	if(name !== ""){
		document.getElementById("wrapper-play").setAttribute("hidden",'');
		document.getElementById("wrapper-game").removeAttribute("hidden");
		walls = map();
		game = new BombermanGame();
		bomberman = new Bomberman();
		bomb = new Bomb();
		game.minutes = game.starting_minutes;
		game.generate_map(walls);
		bomberman.displayBomberman();
		game.update_score();
		game.timer();
		evt.preventDefault();
	}
});
//-------------	/*Start of Game*/ ----------------
var control_name = "";
document.getElementById("control-pause").addEventListener("click", function(evt){
	control_name = document.querySelector("#control-pause").value;
	if(control_name == 'Pause'){
		document.getElementById("game-pause").removeAttribute("hidden");
		document.getElementById("game-map").style.opacity = .5;
		document.querySelector("#control-pause").textContent = 'Resume';
		document.querySelector("#control-pause").value = 'Resume';
		document.querySelector('#control-restart').setAttribute('disabled',"");
		document.querySelector('#control-quit').setAttribute('disabled',"");
		game.stop_time();
	}
	else{
		document.getElementById("game-map").style.opacity = 1;
		document.getElementById("game-pause").setAttribute("hidden",'');
		document.querySelector("#control-pause").textContent = 'Pause';
		document.querySelector("#control-pause").value = 'Pause';
		document.querySelector('#control-restart').removeAttribute('disabled');
		document.querySelector('#control-quit').removeAttribute('disabled');
		game.enemy_interval = setInterval(function(){ game.random_move(); }, 500);
		game.timer();

	}
});

document.getElementById("control-restart").addEventListener("click", function(evt){
	document.querySelector("#game-over h3").textContent = "";
	document.getElementById("game-over").removeAttribute("class");
	document.getElementById("game-map").style.opacity = .5;
	document.querySelector('#control-pause').setAttribute('disabled',"");
	document.querySelector('#control-quit').setAttribute('disabled',"");
	game.stop_time();
});

document.getElementById("restart-yes").addEventListener("click", function(evt){
	document.getElementById("game-over").setAttribute("class",'hidden');
	document.querySelector('#control-pause').removeAttribute('disabled');
	document.querySelector('#control-quit').removeAttribute('disabled');
	document.getElementById("game-map").style.opacity = 1;
	clearInterval(game.enemy_interval);
	bomberman.life = 4;
	bomberman.score = 0;
	bomberman.y = 1 ;
	bomberman.x = 1;
	game.minutes = game.starting_minutes;
	bomb.bombs = {count: [1,2,3,4], time: 2500, range: 1, bomb_walk: false}
	walls = map();
    game.clear_time();
    game.update_score();
	game.remove_boss();
	bomberman.displayBomberman();
	game.generate_map(walls);
	game.timer();
	(bomberman.life > 0 ? document.querySelector('#control-restart').removeAttribute('disabled') : "");
});

document.getElementById("restart-no").addEventListener("click", function(evt){	
	document.getElementById("game-over").setAttribute("class",'hidden');
	document.querySelector('#control-pause').removeAttribute('disabled');
	document.querySelector('#control-quit').removeAttribute('disabled');
	document.getElementById("game-map").style.opacity = 1;
	bomberman.bomber_life(bomberman.life);
	game.timer();
	if(bomberman.life <= 0){
		location.reload();
	}
});

document.getElementById("control-quit").addEventListener("click", function(evt){	
	document.querySelector('#control-pause').setAttribute('disabled',"");
	document.querySelector('#control-restart').setAttribute('disabled',"");
	document.getElementById("game-quit").removeAttribute("class");
	document.getElementById("game-map").style.opacity = .5;
	game.stop_time();
});

document.getElementById("quit-yes").addEventListener("click", function(evt){
	location.reload();
});
document.getElementById("end").addEventListener("click", function(evt){
	location.reload();
});

document.getElementById("quit-no").addEventListener("click", function(evt){
	document.getElementById("game-quit").setAttribute("class",'hidden');
	document.querySelector('#control-pause').removeAttribute('disabled');
	document.querySelector('#control-restart').removeAttribute('disabled');
	document.getElementById("game-map").style.opacity = 1;
	game.timer();
});

document.getElementById('next-level').addEventListener("click", function(evt){
	game.starting_minutes -= 2;
	walls = map();
	bomb.bombs = {count: [1,2,3,4], time: 3000, range: 1, bomb_walk: false};
	game.boss = {life: 4, show: false};
	bomberman.stage ++;
	bomberman.x = 1;
	bomberman.y = 1;
	game.enemylimit += 5;
	game.clear_time();
	game.generate_map(walls);
	bomberman.displayBomberman();
	if(bomberman.stage == 3){
		game.final_stage = true;
	}
	game.timer();
	document.getElementById("game-clear").setAttribute("class",'hidden');
	document.querySelector('#control-restart').removeAttribute('disabled');
	document.querySelector('#control-pause').removeAttribute('disabled');
	document.querySelector('#control-quit').removeAttribute('disabled');
	document.getElementById("game-map").style.opacity = 1;
});