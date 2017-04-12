var player_name = ""; 
var bomb = {};
var can_be_walked = [0, 3, 100, 99, 98, 97, 96, 8];
var monster = []; 
var is_game_start = false; 
var is_paused = false;

var stage_map = [
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,3,3,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,3,1,0,1,0,1,0,1,0,1,0,1,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	];

document.onkeydown = function(e){
	if(is_paused === false && is_game_start == true)
		player.movement(e);
}
document.getElementById("form").onsubmit = function(e){
	is_game_start = true;
	player_name = e.target[0].value;

	player = new player_info(player_name);
	boss = new boss_info(boss_info);
	bomb = new bomb_info();
	enemy_info = new enemy_info();
	game_info = new game_info();

	x = setInterval(game_info.timeLeft, 1000);

	enemy_info.enemy_move();
	player.displayBomberman()
	game_info.displayMap(true);
	enemy_info.setEnemy();
	enemy_info.displayEnemy();

	document.getElementById("life").children[1].innerHTML = player.life;
	document.getElementById("score").children[1].innerHTML = player.score;
	document.getElementById("index").style.display = "none";
	document.getElementById("game").style.display = "block";

	return false;
}
document.getElementById("pause").onclick = function(){
	is_paused = true;
	document.getElementById("pause").style.display = "none";
	document.getElementById("continue_paused_button").style.display = "block";
	document.getElementById("paused_game_message").style.display = "block";
};
document.getElementById("continue_paused_button").onclick = function(){
	is_paused = false;
	document.getElementById("continue_paused_button").style.display = "none";
	document.getElementById("pause").style.display = "block";
	document.getElementById("paused_game_message").style.display = "none";
};
document.getElementById("restart").onclick = function(){
	is_paused = true;
	document.getElementById("restart_level").style.display = "block";
};
document.getElementById("is_not_restart").onclick = function(){
	is_paused = false;
	document.getElementById("restart_level").style.display = "none";
	document.getElementById("paused_game_message").style.display = "none";
};
document.getElementById("quit").onclick = function(){
	is_paused = true;
	document.getElementById("game_over").style.display = "block";
};
document.getElementById("is_not_game_over").onclick = function(){
	document.getElementById("game_over").style.display = "none";
};
document.getElementById("is_restart").onclick = function(){
	game_info.new_stage(true);
}
document.getElementById("is_not_zero_time").onclick = function(){
	document.getElementById("zero_time").style.display = "none";
	game_info.new_stage(true);
}
document.getElementById("congrats_yes").onclick = function(){
	if(game_info.stage == 3)
		document.getElementById("final").style.display = "block";
	else{
		document.getElementById("congrats").style.display = "none";
		game_info.new_stage();
	}
}
document.getElementById("is_game_over").onclick = function(){
	location.reload();
}
document.getElementById("congrats_quit").onclick = function(){
	location.reload();
}
document.getElementById("final_quit").onclick = function(){
	location.reload();
}
document.getElementById("is_zero_time").onclick = function(){
	location.reload();
}

function game_info(){
	this.minutes = 3;
	this.seconds = 59;
	this.stage = 1;
	this.timeLeft = function (){
		if(!is_paused) {
			game_info.seconds = game_info.seconds - 1;
			boss.boss_respawn_time = boss.boss_respawn_time + 1;
		}

		if(game_info.seconds == 0){
			if(game_info.minutes > 0){
				game_info.minutes--;
				game_info.seconds = 59;
			}

			if(game_info.minutes == 0 && game_info.seconds == 0){
				is_paused = true;
				document.getElementById("zero_time").style.display = "block";
			}

		}
		if(boss.is_respawn === false && ((boss.boss_respawn_time == 59) || boss.game_progress > 15)){
			boss.is_respawn = true;	
			document.getElementById("boss").style.display = "block";
			boss.displayBoss();
		}

		document.getElementById("time_left").children[1].innerHTML = game_info.minutes+":"+ ((game_info.seconds < 10) ? "0"+ game_info.seconds : game_info.seconds);
	}
	this.new_stage = function (is_next_stage = false){
		player.life = (!is_next_stage) ? player.life : 4;
		player.score = (!is_next_stage) ? player.score : 0;
		player.x = 8.6;
		player.y = 1;
		this.minutes = 3;
		this.seconds = 59;

		boss.respawn = false;
		boss.game_progress = 0;
		boss.boss_respawn_time = 0;

		stage_map = [
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,3,3,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,3,1,0,1,0,1,0,1,0,1,0,1,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		];


		document.getElementsByClassName("enemy").length;

		for (var i = document.getElementsByClassName("enemy").length; i--; ) {
		   document.getElementsByClassName("enemy")[i].remove();
		}

		var container = document.getElementById('game_container');
		var firstChild = container.childNodes[2];

		document.getElementById("boss").remove();


		if (container && firstChild) {
			var newDiv = document.createElement('div');
			newDiv.setAttribute("id", "boss");
			firstChild.parentNode.insertBefore(newDiv, firstChild.nextSibling);    
		}

		is_paused = false;
		game_info.displayMap(true);
		player.displayBomberman();
		enemy_info.setEnemy();
		enemy_info.displayEnemy();

		game_info.stage = game_info.stage;
		
		document.getElementById("life").children[1].innerHTML = player.life;
		document.getElementById("score").children[1].innerHTML = player.score;
		document.getElementById("stage").children[1].innerHTML = game_info.stage;
		document.getElementById("restart_level").style.display = "none";
	}
	this.displayMap = function (is_new = false){
		var mapOutput = "";

		for (var i = 0; i < stage_map.length; i++) {
			mapOutput += "<div class='row'>";

			for (var k = 0; k < stage_map[i].length; k++) {
				if(is_new){
					if(stage_map[i][k] == 0){
						if(Math.floor((Math.random() * 2) + 1) == 1)
							mapOutput += "<div class='walkable'></div>";
		                else{
							stage_map[i][k] = 2;
							mapOutput += "<div class='destroyable'></div>";
						}
		            }
	            }
	            else{
	            	if(stage_map[i][k] == 0)
						mapOutput += "<div class='walkable'></div>";
		           	else if (stage_map[i][k] == 2)
						mapOutput += "<div class='destroyable'></div>";
	            }

	            if(stage_map[i][k] == 1)
	                mapOutput += "<div class='undestroyable'></div>";
	            else if(stage_map[i][k] == 3)
	                mapOutput += "<div class='walkable_2'></div>";

				if(stage_map[i][k] == 7)
					mapOutput += "<div class='bomb'></div>";
				if(stage_map[i][k] == 8)
					mapOutput += "<div class='flame'></div>";
				if(stage_map[i][k] == 100)
					mapOutput += "<div class='flag'></div>";
				if(stage_map[i][k] == 99)
					mapOutput += "<div class='health'></div>";
				if(stage_map[i][k] == 98)
					mapOutput += "<div class='speed'></div>";
				if(stage_map[i][k] == 97)
					mapOutput += "<div class='bomb_length'></div>";
				if(stage_map[i][k] == 96)
					mapOutput += "<div class='carried_bomb'></div>";
			}

			mapOutput += "</div>";
		}

		if(is_new){
			// var test = document.getElementById("main_game_content")
			// test.innerHTML =  test.innerHTML + mapOutput;
			// while (document.getElementById("main_game_content").firstChild) document.getElementById("main_game_content").removeChild(document.getElementById("main_game_content").firstChild);
			// document.getElementById("main_game_content").innerHTML = mapOutput;
			document.getElementById("main_game_content").innerHTML = mapOutput;
		}
		else{
			document.getElementById("main_game_content").innerHTML = mapOutput;
		}
	}
}

function bomb_info(){
	this.bomb_explode = function(direction, location_x, location_y){
		for (var length = 1; length <= player.bomb_length; length++) {
			var percentage_of_up = Math.floor((Math.random() * 10) + 1);
			var up_type = 0;

			switch (direction){
				case "right":
					bomb_direction_x = location_x+length;
					bomb_direction_y = location_y
				break;
				case "top":
					bomb_direction_x = location_x;
					bomb_direction_y = location_y-length;
				break;
				case "left":
					bomb_direction_x = location_x-length;
					bomb_direction_y = location_y;
				break;
				case "down":
					bomb_direction_x = location_x;
					bomb_direction_y = location_y+length;
				break; 
			}

			if(Math.floor((Math.random() * 10) + 1) < 3){
				switch (Math.floor((Math.random() * 4) + 1)){
					case 1:
						up_type = 99;
					break;
					case 2:
						up_type = 98;
					break;
					case 3:
						up_type = 97;
					break;
					case 4:
						up_type = 96;
					break;
				}
			}

			try {
				if(stage_map[bomb_direction_x][bomb_direction_y] == 2){
					stage_map[bomb_direction_x][bomb_direction_y] = up_type;
					player.score = player.score + 50;
					boss.game_progress = boss.game_progress + 1;

				}
				else if(stage_map[bomb_direction_x][bomb_direction_y] == 1)
					break;
				else if(stage_map[bomb_direction_x][bomb_direction_y]== 100)
					break;
				else if([0,3].indexOf(stage_map[bomb_direction_x][bomb_direction_y] > 0))
					stage_map[bomb_direction_x][bomb_direction_y] = 8;
			}
			catch (e) {
				stage_map[location_x][location_y] = 8;
			}
		}
	}
	this.bomb_countdown = function (explode_time, callback) {
		var i = 0;
		var count = setInterval(function () {

			if (i === explode_time - 1) {
				clearInterval(count);
				callback(true);
			}

			if(!is_paused)
				i++;
		}, 1000);
	}
}

function player_info(name) {
	this.name = name;
	this.bomb_walk  = false;
	this.bomb_length = 1;
	this.bomb_carried = 1;
	this.life  = 4;
	this.immune = true;
	this.score = 0;
	this.x = 8.6;
	this.y =  1;
	this.reduce_player_life = function(is_x, is_y){
		if(is_x && is_y){
			this.life = this.life - 1;
			document.getElementById("life").children[1].innerHTML = this.life;
		}
	}
	this.drop_bomb = function(x, y, number_of_bomb){
		var self = this;
		var cant_be_destroyed = [1];
		stage_map[x][y] = 7;
		stage_map = stage_map;

		bomb.bomb_countdown(3, function(is_explode){
			if(is_explode === true){
				for (var length = 1; length <= self.bomb_length; length++) {
					self.reduce_player_life(self.x - 7.6 == x, self.y == y + length);
					self.reduce_player_life(self.x - 7.6 == x, self.y == y - length);
					self.reduce_player_life(self.x - 7.6 == x + length, self.y == y);
					self.reduce_player_life(self.x - 7.6 == x - length,  self.y == y);
				}
				self.reduce_player_life(self.x - 7.6 == x, self.y == y);

				for (var boss_bomb = 1; boss_bomb <= self.bomb_length; boss_bomb++) {
					enemy_info.reduce_enemy_life(Math.floor(boss.x - 7.59) == x, boss.y == y + boss_bomb, boss);
					enemy_info.reduce_enemy_life(Math.floor(boss.x - 7.59) == x, boss.y == y - boss_bomb, boss);
					enemy_info.reduce_enemy_life(Math.floor(boss.x - 7.59) == x + boss_bomb, boss.y == y, boss);
					enemy_info.reduce_enemy_life(Math.floor(boss.x - 7.59) == x - boss_bomb,  boss.y == y, boss);
				}

				for (var test = 1; test <= self.bomb_length; test++) {
					for (var enemy = 0; enemy < monster.length; enemy++) {
						(monster[enemy]) ? enemy_info.reduce_enemy_life(Math.floor(monster[enemy].x - 7.69) == x, monster[enemy].y == y + test, monster[enemy]) : "";
						(monster[enemy]) ? enemy_info.reduce_enemy_life(Math.floor(monster[enemy].x - 7.69) == x, monster[enemy].y == y - test, monster[enemy]) : "";
						(monster[enemy]) ? enemy_info.reduce_enemy_life(Math.floor(monster[enemy].x - 7.69) == x + test, monster[enemy].y == y, monster[enemy]) : "";
						(monster[enemy]) ? enemy_info.reduce_enemy_life(Math.floor(monster[enemy].x - 7.69) == x - test,  monster[enemy].y == y, monster[enemy]) : "";
					}
				}

				bomb.bomb_explode("right", x, y)
				bomb.bomb_explode("down", x, y)
				bomb.bomb_explode("top", x, y)
				bomb.bomb_explode("left", x, y)

				if(boss.health < 1 && boss.is_respawn == true){
					document.getElementById("boss").style.display = "none";
					stage_map[Math.floor(boss.x - 7.59)][boss.y] = 100;
					self.score = self.score + 1000;
					document.getElementById("score").children[1].innerHTML = self.score;
				}

				stage_map[x][y] = 8;
				document.getElementById("score").children[1].innerHTML = self.score;
				game_info.displayMap();

				bomb.bomb_countdown(1, function(is_explode){
					self.bomb_carried++;
					stage_map[x][y] = 0;

					for (var i = 0; i < stage_map.length; i++) {
						for (var k = 0; k < stage_map[i].length; k++) {
							if(stage_map[i][k] == 8)
								stage_map[i][k] = 0;
						}
					}

					game_info.displayMap();
				});

			}

		});

		game_info.displayMap();
	}
	this.displayBomberman = function(){
		document.getElementById("player").style.top = player.y * 50 + "px";
		document.getElementById("player").style.left = player.x * 50 + "px";
	}
	this.bomberman_powerUp = function(x ,y){
		if(stage_map[x][y] == 99){
			stage_map[x][y] = 0;
			player.life = player.life + 1;
			document.getElementById("life").children[1].innerHTML = player.life;
		}

		if(stage_map[x][y] == 96){
			stage_map[x][y] = 0;
			player.bomb_carried = player.bomb_carried + 1;
		}
		if(stage_map[x][y] == 97){
			stage_map[x][y] = 0;
			player.bomb_length = player.bomb_length + 1;
		}
		if(stage_map[x][y] == 98){
			stage_map[x][y] = 0;
			can_be_walked.push(7);
		}
		if(stage_map[x][y] == 8){
			player.life = player.life - 1;
			document.getElementById("life").children[1].innerHTML = player.life;
		}
		if(stage_map[x][y] == 100){
			is_paused = true;
			game_info.stage = game_info.stage + 1
			enemy_info.limit = enemy_info.limit + 5;
			document.getElementById("congrats").style.display = "block";
			document.getElementById("stage").children[1].innerHTML = game_info.stage;
		}
	}
	this.reduce_health_by_hit = function(){
		for (var i = 0; i < monster.length; i++) {
			if(monster[i] && Math.floor(player.x - 7.6) == Math.floor(monster[i].x - 7.69) && player.y == monster[i].y){
				player.life = player.life - 1;
				document.getElementById("life").children[1].innerHTML = player.life;
			}
		
			if(player.life < 1){
				is_paused = true;
				document.getElementById("game_over").style.display = "block";
			}
		}

		if(boss.is_respawn && Math.floor(player.x - 7.6) == Math.floor(boss.x - 7.59) && player.y == boss.y){
			player.life = player.life - 1;
			document.getElementById("life").children[1].innerHTML = player.life;
		}
	}
	this.movement = function(e){
		if(e.keyCode == 37){
			if(can_be_walked.indexOf(stage_map[Math.floor(player.x - 8.6)][player.y]) != -1){
				player.bomberman_powerUp(Math.floor(player.x - 8.6), player.y);
				player.x--;
			}

			player.reduce_health_by_hit();
		}

		if(e.keyCode == 38){
			if(can_be_walked.indexOf(stage_map[Math.floor(player.x - 7.6)][player.y + -1]) != -1){
				player.bomberman_powerUp(Math.floor(player.x - 7.6), player.y - 1);
				player.y--;
			}

			player.reduce_health_by_hit();
		}

		if(e.keyCode == 39){
			if(can_be_walked.indexOf(stage_map[Math.floor(player.x - 6.6)][player.y]) != -1){
				player.bomberman_powerUp(Math.floor(player.x - 6.6), player.y);
				player.x++;
			}

			player.reduce_health_by_hit();
		}

		if(e.keyCode == 40){
			if(can_be_walked.indexOf(stage_map[Math.floor(player.x - 7.6)][player.y +  1]) != -1){ 
				player.bomberman_powerUp(Math.floor(player.x - 7.6), player.y  + 1);
				player.y++;
			}

			player.reduce_health_by_hit();
		}

		if(e.keyCode == 49){
			if(stage_map[Math.floor(player.x - 7.6)][player.y] != 7){
			 	if(player.bomb_carried > 0){
			 		player.drop_bomb(Math.floor(player.x - 7.6), player.y, player.bomb_carried - 1);
			 		player.bomb_carried--;
			 	}

				player.reduce_health_by_hit();
			}
		}

		game_info.displayMap();
		player.displayBomberman();
	}

	for (var i = 0; i < this.bomb_carried ; i++) {
		bomb[i] = {
			is_explode : false,
			explode_time : 3,
		}
	}
} 

function enemy_info(){
	this.limit = 10;
	this.reduce_enemy_life = function (x,y,monster_hit){
		if(x === true && y === true){
			if(monster_hit){
				if(monster_hit.health == 1 && monster_hit.type == "small_monster"){
					player.score = player.score + 100;
					document.getElementById("score").children[1].innerHTML = player.score;
					delete monster[monster_hit.id];
					document.getElementById("enemy_"+monster_hit.id).remove();
					enemy_info.displayEnemy();
				}
				else if (monster_hit.type == "boss" && monster_hit.is_respawn == true)
					boss.health = boss.health - 1;
			}
		}
	}
	this.displayEnemy = function(){
		for (var i = 0; i < monster.length; i++) {
			if(monster[i] != undefined){
				document.getElementById("enemy_"+monster[i].id).style.top =  (monster[monster[i].id].y) * 50 +'px'
				document.getElementById("enemy_"+monster[i].id).style.left = (monster[monster[i].id].x) * 50 +'px'
			}
		}
	}
	this.setEnemy = function (){
		monster = [];
		boss.health = 5;
		boss.is_respawn = false;

		for (var i = 0; i < 100; i++) {
			random_x = Math.floor((Math.random() * 16) + 0);
			random_y = Math.floor((Math.random() * 14) + 0);
			if(Object.keys(monster).length < this.limit && stage_map[Math.floor(random_x)][Math.floor(random_y)] == 0){
				monster[Object.keys(monster).length] = {
					id : Object.keys(monster).length,
					health : 1,
					type : "small_monster",
					x : random_x + 7.69, 
					y : random_y,
				}
			}
			if(Object.keys(boss).length == 8 && stage_map[Math.floor(random_x)][Math.floor(random_y)] == 0){
				boss.x = random_x + 7.59;
				boss.y = random_y;
			}
		}

		var container = document.getElementById('game_container');
		var firstChild = container.childNodes[3];
		
		for (var k = monster.length - 1;k >= 0;k--){
			if (container && firstChild) {
				var newDiv = document.createElement('div');
				newDiv.setAttribute("id", "enemy_"+k);
				newDiv.setAttribute("enemy_id", k);
				newDiv.setAttribute("class", "enemy");
				firstChild.parentNode.insertBefore(newDiv, firstChild.nextSibling);    
			}
		}
	}
	this.enemy_move = function (){
		setInterval(function(){ 
			if(is_paused === false){
				for (var i = 0; i < monster.length; i++) {
					enemy_movement = Math.floor((Math.random() * 4) + 1);
					if(monster[i] && enemy_movement == 1 && can_be_walked.indexOf(stage_map[Math.floor(monster[i].x - 8.69)][monster[i].y]) != -1)
						monster[i].x--;
					if(monster[i] && enemy_movement == 2 && can_be_walked.indexOf(stage_map[Math.floor(monster[i].x - 7.69)][monster[i].y + -1]) != -1)
						monster[i].y--;
					if(monster[i] && enemy_movement == 3 && can_be_walked.indexOf(stage_map[Math.floor(monster[i].x - 6.69)][monster[i].y]) != -1)
						monster[i].x++;				
					if(monster[i] && enemy_movement == 4 && can_be_walked.indexOf(stage_map[Math.floor(monster[i].x - 7.69)][monster[i].y + 1]) != -1)
						monster[i].y++;

					if(monster[i] && Math.floor(player.x - 7.6) == Math.floor(monster[i].x - 7.69) && player.y == monster[i].y){
						player.life = player.life - 1;
						document.getElementById("life").children[1].innerHTML = player.life;
					}
				
					if(player.life < 1){
						is_paused = true;
						document.getElementById("game_over").style.display = "block";
					}
				}

				if(boss.is_respawn === true && boss.health >  0){
					boss_movement = Math.floor((Math.random() * 4) + 1);
					if(boss.x && boss.y && boss_movement == 1 && can_be_walked.indexOf(stage_map[Math.floor(boss.x - 8.59)][boss.y]) != -1)
						boss.x--;
					if(boss.x && boss.y && boss_movement == 2 && can_be_walked.indexOf(stage_map[Math.floor(boss.x - 7.59)][boss.y + -1]) != -1)
						boss.y--;
					if(boss.x && boss.y && boss_movement == 3 && can_be_walked.indexOf(stage_map[Math.floor(boss.x - 6.59)][boss.y]) != -1)
						boss.x++;				
					if(boss.x && boss.y && boss_movement == 4 && can_be_walked.indexOf(stage_map[Math.floor(boss.x - 7.59)][boss.y + 1]) != -1)
						boss.y++;

					if(boss && Math.floor(player.x - 7.6) == Math.floor(boss.x - 7.59) && player.y == boss.y){
						player.life = player.life - 1;
						document.getElementById("life").children[1].innerHTML = player.life;
					}

					if(player.life < 1){
						is_paused = true;
						document.getElementById("game_over").style.display = "block";
					}

					boss.displayBoss();
				}
				
				enemy_info.displayEnemy();
			}
		}, 1000)
	}
}

function boss_info(){
	this.game_progress = 0; 
	this.boss_respawn_time = 0;
	this.health = 5;
	this.type = "boss";
	this.is_respawn = false;
	this.x = 1;
	this.y = 1;
	this.displayBoss = function(){
		if(boss.health >  0){
			document.getElementById("boss").style.top = boss.y * 50 + "px";
			document.getElementById("boss").style.left = boss.x * 50 + "px";
		}
	}
}
