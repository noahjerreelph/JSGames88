var bomb = {count: [1,2,3,4], time: 2500, range: 1, bomb_walk: false}, final_stage = false,
	time_left = document.getElementsByTagName('h2')[0], time = true, bomb_interval,
    seconds = 1, starting_minutes = 10, minutes, t, bomb_timer, enemy_interval, boss_interval, enemies = document.getElementsByClassName('enemy'),
	x = 4, enemylimit = 15, walls,
	boss = {life: 4, show: false};
var	bomberman = {name: document.getElementById('name'), life: 4, stage: 1, score: 0, y: 1, x: 1};
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

function generate_map(){
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
			else if(walls[count_row][count] == 21 && boss.show !== true){
				html_wall += '<div class="nobox"></div>';
				walls[count_row][count] = 1;
				boss.show = true;
				html_boss = '<div id="boss" x="'+count+'" y="'+count_row+'"></div>';
				document.querySelector('#game').innerHTML += html_boss;
				boss.name = document.getElementById('boss');
				boss_move();
			}
		}	
		html_wall += '\n</div>';
	}
	document.querySelector('#game-map').innerHTML = html_wall;
	bomber_stats();
}
function next_Stage(){
	stop_time();
	boss.show = false;
	if(final_stage == true){
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

function displayBomberman(){
	document.getElementById('bomberman').style.left = (bomberman.x * 40) + 100 +"px";
	document.getElementById('bomberman').style.top = bomberman.y * 40 +"px";
}

function check_ups(location){
	switch(location){
		case 10:
			bomberman.life ++;
			bomber_life(bomberman.life);
			walls[bomberman.y][bomberman.x] = 1;
        break;
        case 11:
			bomb.count.push(bomb.count.length+1);
			walls[bomberman.y][bomberman.x] = 1;
        break;
        case 12:
        	bomb.range ++;
			walls[bomberman.y][bomberman.x] = 1;
        break;
        case 13:
        	bomb.bomb_walk = true;
			walls[bomberman.y][bomberman.x] = 1;
        break;
        case 22:
        	bomberman.score += 5000;
        	next_Stage();
        break;
	}
	generate_map();
}

function update_life(location = null){
	if(walls[bomberman.y][bomberman.x] == 3 || (boss.x == bomberman.x && boss.y == bomberman.y) || (location == null ? "" : walls[location.y][location.x] == walls[bomberman.y][bomberman.x])){
		bomberman.life --;
	}
	bomber_life(bomberman.life);
}

function game_over(){
	if(bomberman.life <= 0 || (minutes == 0 && seconds == 0)){		
		stop_time();
		bomberman.score = 0;
		document.querySelector("#game-over h3").textContent = "Game Over";
		document.getElementById("game").style.backgroundColor = "grey";
		document.getElementById("game-over").removeAttribute("class");
		document.querySelector('#control-quit').setAttribute('disabled',"");
		document.querySelector('#control-pause').setAttribute('disabled',"");
		document.querySelector('#control-restart').setAttribute('disabled',"");
	}
}

function box_contain(){
	var breakable = document.getElementsByClassName('breakable').length,
		contain_boss = Math.floor(Math.random() * (21 - 10 + 1)) + 10,
		no_boss = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
		bomberman.score += 100;
	return (boss.show == false && breakable < 50 ? contain_boss : no_boss);
}

function explode_range(location, hit = ""){
	(walls[location.y][location.x] !== 22 ? walls[location.y][location.x] = 3 : "");
	if(hit == 'box'){
		setTimeout(function(){
			walls[location.y][location.x] = box_contain();	
			generate_map();
		},500);
	}else{
		setTimeout(function(){
			(walls[location.y][location.x] !== 22 ? walls[location.y][location.x] = 1 : "");	
			generate_map();
		},500);
	}
}

function boss_move(){
	var rand_xy = ['left','right','up','down'];
	boss_interval = setInterval(function(){
		var move = rand_xy[Math.floor(Math.random()*rand_xy.length)],
			x = parseInt(boss.name.getAttribute('x')),
			y = parseInt(boss.name.getAttribute('y'));
		if(move == 'up' && walls[y-1][x] !== 0 && walls[y-1][x] !== 2 && walls[y-1][x] !== 9){
			y -= 1;
			boss.name.setAttribute('y',y);
		}else if(move == 'down' && walls[y+1][x] !== 0 && walls[y+1][x] !== 2 && walls[y+1][x] !== 9){
			y += 1;
			boss.name.setAttribute('y',y);
		}else if(move == 'left' && walls[y][x-1] !== 0 && walls[y][x-1] !== 2 && walls[y][x-1] !== 9){
			x -= 1;
			boss.name.setAttribute('x',x);
		}else if(move == 'right' && walls[y][x+1] !== 0 && walls[y][x+1] !== 2 && walls[y][x+1] !== 9){
			x += 1;
			boss.name.setAttribute('x',x);
		}

		if(y == bomberman.y && x == bomberman.x)
		{
			bomberman.life--;
			bomber_life(bomberman.life);
		}
		if(walls[y][x] == 3){
			boss.life --;
			bomberman.score += 500;			
			if(boss.life <= 0){
				walls[y][x] = 22;
				bomberman.score += 1500;
				generate_map();
				document.getElementById('game').removeChild(boss.name);
				clearInterval(boss_interval);
			}
		}
		boss.name.style.left = (x * 40) + 105 + 'px';
		boss.name.style.top = (y * 40) + 'px';
	},300);
}

function random_move(){
	var rand_xy = ['left','right','up','down'];
	if(time !== false){
		for(var i = 0; i < enemies.length; i ++){
			var move = rand_xy[Math.floor(Math.random()*rand_xy.length)],
			x = parseInt(enemies[i].getAttribute('x')),
			y = parseInt(enemies[i].getAttribute('y'));

			if(move == 'up' && walls[y-1][x] !== 0 && walls[y-1][x] !== 2 && walls[y-1][x] !== 9){
				y -= 1;
				enemies[i].setAttribute('y',y);
			}else if(move == 'down' && walls[y+1][x] !== 0 && walls[y+1][x] !== 2 && walls[y+1][x] !== 9){
				y += 1;
				enemies[i].setAttribute('y',y);
			}else if(move == 'left' && walls[y][x-1] !== 0 && walls[y][x-1] !== 2 && walls[y][x-1] !== 9){
				x -= 1;
				enemies[i].setAttribute('x',x);
			}else if(move == 'right' && walls[y][x+1] !== 0 && walls[y][x+1] !== 2 && walls[y][x+1] !== 9){
				x += 1;
				enemies[i].setAttribute('x',x);
			}
			console.log(x,y);
			if(y == bomberman.y && x == bomberman.x)
			{
				bomberman.life--;
				bomber_life(bomberman.life);
			}
			if(walls[y][x] == 3){
				document.getElementById('game').removeChild(enemies[i]);
				bomberman.score += 200;	
				console.log(x,y);
			}
			enemies[i].style.left = (x * 40) + 105 + 'px';
			enemies[i].style.top = (y * 40) + 'px';
		}
	}else{
		clearInterval(enemy_interval);
	}
}

function remove_boss(){
	clearInterval(enemy_interval);
	(boss.show !== false ? document.getElementById('game').removeChild(boss.name) : "");
	boss.name = document.getElementById('boss');
	boss.show = false;
}

function respawn_enemy(walls){
	clearInterval(enemy_interval);
	if(boss.show == false){
		var enemy_html = "",
		counter = enemies.length;
		for(var count_row = 0; count_row < walls.length; count_row++){
			for(var count = 0; count < walls[count_row].length; count++){
				if(walls[count_row][count] == 1){
					var nums = (counter <= enemylimit ? [1,5,1,1,1,1,1,1,1] : [1]),
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
		generate_map();
		enemy_interval = setInterval(function(){ random_move(); }, 500);
	}
}

function explode(bomb_location){
	for(var index in bomb_location){
		for(var i = 0; i <= bomb.range; i ++)
		{	
			var location = {};
			if(index == 'x'){

				if(walls[bomb_location.y][bomb_location.x+i] == 2 && bomb_location.y % 2 !== 0 && bomb_location.x+i <= (walls[bomb_location.y].length -1)){
					location = {y: bomb_location.y, x: bomb_location.x+i};
					explode_range(location,'box');
				}
				else if(walls[bomb_location.y][bomb_location.x+i] !== 0 && bomb_location.y % 2 !== 0 && bomb_location.x+i <= (walls[bomb_location.y].length -1)){
					location = {y: bomb_location.y, x: bomb_location.x+i};
					explode_range(location);
				}
				if(walls[bomb_location.y][bomb_location.x-i] == 2 && bomb_location.y % 2 !== 0 && bomb_location.x-i >= 1){
					location = {y: bomb_location.y, x: bomb_location.x-i};
					explode_range(location,'box');
				}
				else if(walls[bomb_location.y][bomb_location.x-i] !== 0 && bomb_location.y % 2 !== 0 && bomb_location.x-i >= 1){
					location = {y: bomb_location.y, x: bomb_location.x-i};
					explode_range(location);
				}
			}else{
				if(walls[bomb_location.y+i] !== undefined && walls[bomb_location.y+i][bomb_location.x] == 2 && bomb_location.x % 2 !== 0){
					location = {y: bomb_location.y+i, x: bomb_location.x};
					explode_range(location,'box');
				}
				else if(walls[bomb_location.y+i] !== undefined && walls[bomb_location.y+i][bomb_location.x] !== 0 && bomb_location.x % 2 !== 0){
					location = {y: bomb_location.y+i, x: bomb_location.x};
					explode_range(location);
				}
				if(walls[bomb_location.y-i] !== undefined && walls[bomb_location.y-i][bomb_location.x] == 2 && bomb_location.x % 2 !== 0){
					location = {y: bomb_location.y-i, x: bomb_location.x};
					explode_range(location,'box');
				}
				else if(walls[bomb_location.y-i] !== undefined && walls[bomb_location.y-i][bomb_location.x] !== 0 && bomb_location.x % 2 !== 0){
					location = {y: bomb_location.y-i, x: bomb_location.x};
					explode_range(location);
				}
			}
		}
	}
	update_life(bomb_location);	
	generate_map();
	bomb.count.push(bomb.count.length+1);
}

function movement(){
	if(time == false){
		document.getElementsByTagName('body')[0].onkeydown = null;		
	}
	else{
		document.body.onkeydown = function(e){
			if(e.keyCode == 39 && (bomb.bomb_walk == false ? walls[bomberman.y][bomberman.x+1] != 0 && walls[bomberman.y][bomberman.x+1] != 2 && walls[bomberman.y][bomberman.x+1] !== 9 : walls[bomberman.y][bomberman.x+1] != 0 && walls[bomberman.y][bomberman.x+1] != 2)){		
				bomberman.x ++;
			}else if(e.keyCode == 37 && (bomb.bomb_walk == false ? walls[bomberman.y][bomberman.x-1] != 0 && walls[bomberman.y][bomberman.x-1] != 2 && walls[bomberman.y][bomberman.x-1] !== 9 : walls[bomberman.y][bomberman.x-1] != 0 && walls[bomberman.y][bomberman.x-1] != 2)){		
				bomberman.x --;
			}else if(e.keyCode == 38 && (bomb.bomb_walk == false ? walls[bomberman.y-1][bomberman.x] != 0 && walls[bomberman.y-1][bomberman.x] != 2 && walls[bomberman.y-1][bomberman.x] !== 9 : walls[bomberman.y-1][bomberman.x] != 0 && walls[bomberman.y-1][bomberman.x] != 2)){
				bomberman.y --;
			}else if(e.keyCode == 40 && (bomb.bomb_walk == false ? walls[bomberman.y+1][bomberman.x] != 0 && walls[bomberman.y+1][bomberman.x] != 2 && walls[bomberman.y+1][bomberman.x] !== 9 : walls[bomberman.y+1][bomberman.x] != 0 && walls[bomberman.y+1][bomberman.x] != 2)){
				bomberman.y ++;
			}else if(e.keyCode == 32 && bomb.count.length !== 0 && walls[bomberman.y][bomberman.x] != 9){
				var bomb_location = {y: bomberman.y, x: bomberman.x};
				walls[bomberman.y][bomberman.x] = 9;
				bomb_interval = setTimeout(function(){
					explode(bomb_location);
				},bomb.time);
				bomb.count.pop();
				generate_map();
			}
			check_ups(walls[bomberman.y][bomberman.x]);
			displayBomberman();
			update_life();
		};
	}
}



// // ------------------------ TIMER!! ------------------------
function count_down() {
	if(minutes == 0 && seconds == 0){
		game_over()
	}
    else{
	    if(minutes % 1 == 0 && seconds == 0){
	    	respawn_enemy(walls);
	    }
    	if (seconds == 0) {
	        seconds = 60;
	        minutes--;
	    }

    	seconds--;		    
		document.getElementById("game").style.backgroundColor = "";
    }
    time_left.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
	timer();
}
function timer() {
    time = true;
	movement();
    t = setTimeout(count_down, 1000);
}
/* Stop button */
function stop_time() {
    clearTimeout(t);
	clearInterval(enemy_interval);
	clearInterval(boss_interval);
    time = false;    
	movement();
}
/* Clear button */
function clear_time() {
    time_left.textContent = "";
    seconds = 1; minutes = starting_minutes;
}
// // --------------- END of Timer -----------	Submit Name ---------
document.getElementById("wrapper-game").setAttribute("hidden",'');
document.getElementById("game-pause").setAttribute("hidden",'');

document.getElementById("submit_name").addEventListener("submit", function(evt){
	name = document.getElementById("name").value;

	if(name !== ""){
		document.getElementById("wrapper-play").setAttribute("hidden",'');
		document.getElementById("wrapper-game").removeAttribute("hidden");
		minutes = starting_minutes;
		walls = map();
		generate_map();
		displayBomberman();
		bomber_stats();
		timer();
		evt.preventDefault();
	}
});
// // life ***********************
function bomber_life(life){
	var html_life = "";
	for(var i = 0; i < life; i ++){
		html_life += '<span class="life">&#9786;</span>';
	}
	document.getElementById("life").innerHTML = html_life;
	if(life <= 0){
		game_over();
	}

}
// // Stats ***********************
function bomber_stats(){
	bomber_life(bomberman.life)
	document.querySelector(".score").textContent = bomberman.score;
	document.querySelector(".stage").textContent = bomberman.stage;
}
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
		stop_time();
	}
	else{
		document.getElementById("game-map").style.opacity = 1;
		document.getElementById("game-pause").setAttribute("hidden",'');
		document.querySelector("#control-pause").textContent = 'Pause';
		document.querySelector("#control-pause").value = 'Pause';
		document.querySelector('#control-restart').removeAttribute('disabled');
		document.querySelector('#control-quit').removeAttribute('disabled');
		enemy_interval = setInterval(function(){ random_move(); }, 500);
		timer();

	}
});

document.getElementById("control-restart").addEventListener("click", function(evt){
	document.querySelector("#game-over h3").textContent = "";
	document.getElementById("game-over").removeAttribute("class");
	document.getElementById("game-map").style.opacity = .5;
	document.querySelector('#control-pause').setAttribute('disabled',"");
	document.querySelector('#control-quit').setAttribute('disabled',"");
	stop_time();
});

document.getElementById("restart-yes").addEventListener("click", function(evt){
	document.getElementById("game-over").setAttribute("class",'hidden');
	document.querySelector('#control-pause').removeAttribute('disabled');
	document.querySelector('#control-quit').removeAttribute('disabled');
	document.getElementById("game-map").style.opacity = 1;
	clearInterval(enemy_interval);
	minutes = starting_minutes;
	bomb = {count: [1,2,3,4], time: 2500, range: 1, bomb_walk: false}
	bomberman = {name: document.getElementById('name'), life: 4, stage: 1, score: 0, y: 1, x: 1}
	walls = map();
    clear_time();
    bomber_stats();
	remove_boss();
	displayBomberman();
	generate_map();
	timer();
	(bomberman.life > 0 ? document.querySelector('#control-restart').removeAttribute('disabled') : "");
});

document.getElementById("restart-no").addEventListener("click", function(evt){	
	document.getElementById("game-over").setAttribute("class",'hidden');
	document.querySelector('#control-pause').removeAttribute('disabled');
	document.querySelector('#control-quit').removeAttribute('disabled');
	document.getElementById("game-map").style.opacity = 1;
	bomber_life(bomberman.life);
	timer();
	if(bomberman.life <= 0){
		location.reload();
	}
});

document.getElementById("control-quit").addEventListener("click", function(evt){	
	document.querySelector('#control-pause').setAttribute('disabled',"");
	document.querySelector('#control-restart').setAttribute('disabled',"");
	document.getElementById("game-quit").removeAttribute("class");
	document.getElementById("game-map").style.opacity = .5;
	stop_time();
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
	timer();
});

document.getElementById('next-level').addEventListener("click", function(evt){
	starting_minutes -= 2;
	walls = map();
	bomb = {count: [1,2,3,4], time: 3000, range: 1, bomb_walk: false};
	boss = {life: 4, show: false};
	bomberman.stage ++;
	bomberman.x = 1;
	bomberman.y = 1;
	enemylimit += 5;
	clear_time();
	generate_map();
	displayBomberman();
	if(bomberman.stage == 3){
		final_stage = true;
	}
	timer();
	document.getElementById("game-clear").setAttribute("class",'hidden');
	document.querySelector('#control-restart').removeAttribute('disabled');
	document.querySelector('#control-pause').removeAttribute('disabled');
	document.querySelector('#control-quit').removeAttribute('disabled');
	document.getElementById("game-map").style.opacity = 1;
});