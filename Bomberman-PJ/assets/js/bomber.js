var player_name = "";
var can_be_walked = [0, 3, 100, 99, 98, 97, 96, 8];
var player = {
	character_info : 88,
	bomb_walk : false,
	bomb_length: 3,
	bomb_carried : 3,
	immune : true,
	score : 0,
	x : 8.6,
	y : 1
};

var bomb = {};

var boss = {
	health: 5,
	type: "boss",
	is_respawn : false,
	x : 1,
	y : 1
}
var monster = [];
var enemy_limit = 5;
for (var i = 0; i < player.bomb_carried; i++) {
	bomb[i] = {
		is_explode : false,
		explode_time : 3,
	}
}


var player_life = 100;
var is_game_start = false
var is_paused = false;
var stage = 1;
var minutes = 3;
var seconds = 59;
var game_progress = 0;
var boss_respawn_time = 0;

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

document.getElementById("life").children[1].innerHTML = player_life;
document.getElementById("score").children[1].innerHTML = player.score;

document.getElementById("congrats_yes").onclick = function(){
	if(stage == 3){
		document.getElementById("final").style.display = "block";
	}
	else{
		document.getElementById("congrats").style.display = "none";
		player.x = 8.6;
		player.y = 1;

		boss.respawn = false;
		game_progress = 0;
		boss_respawn_time = 0;

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

		if (container && firstChild) {
			var newDiv = document.createElement('div');
			newDiv.setAttribute("id", "boss");
			firstChild.parentNode.insertBefore(newDiv, firstChild.nextSibling);    
		}

		
		minutes = 3;
		seconds = 59;

		is_paused = false;
		displayMap(true);
		displayBomberman();
		setEnemy();
		displayEnemy();

		stage = stage + 1;
		enemy_limit = enemy_limit + 5;
		
		document.getElementById("life").children[1].innerHTML = player_life;
		document.getElementById("score").children[1].innerHTML = player.score;
		document.getElementById("stage").children[1].innerHTML = stage;
	}
}


function enemy_move(){
	setInterval(function(){ 
		if(is_paused === false){
			for (var i = 0; i < monster.length; i++) {
				enemy_movement = Math.floor((Math.random() * 4) + 1);
				if(monster[i] && enemy_movement == 1 && can_be_walked.indexOf(stage_map[Math.floor(monster[i].x - 8.69)][monster[i].y]) != -1){
					monster[i].x--;
				}
				if(monster[i] && enemy_movement == 2 && can_be_walked.indexOf(stage_map[Math.floor(monster[i].x - 7.69)][monster[i].y + -1]) != -1){
					monster[i].y--;
				}
				if(monster[i] && enemy_movement == 3 && can_be_walked.indexOf(stage_map[Math.floor(monster[i].x - 6.69)][monster[i].y]) != -1){
					monster[i].x++;				
				}
				if(monster[i] && enemy_movement == 4 && can_be_walked.indexOf(stage_map[Math.floor(monster[i].x - 7.69)][monster[i].y + 1]) != -1){
					monster[i].y++;
				}

				if(monster[i] && Math.floor(player.x - 7.6) == Math.floor(monster[i].x - 7.69) && player.y == monster[i].y){
					player_life = player_life - 1;
					document.getElementById("life").children[1].innerHTML = player_life;
				}
			
				if(player_life < 1){
					is_paused = true;
					document.getElementById("game_over").style.display = "block";
				}
			}

			if(boss.is_respawn === true && boss.health >  0){
				boss_movement = Math.floor((Math.random() * 4) + 1);
				if(boss.x && boss.y && boss_movement == 1 && can_be_walked.indexOf(stage_map[Math.floor(boss.x - 8.59)][boss.y]) != -1){
					boss.x--;
				}
				if(boss.x && boss.y && boss_movement == 2 && can_be_walked.indexOf(stage_map[Math.floor(boss.x - 7.59)][boss.y + -1]) != -1){
					boss.y--;
				}
				if(boss.x && boss.y && boss_movement == 3 && can_be_walked.indexOf(stage_map[Math.floor(boss.x - 6.59)][boss.y]) != -1){
					boss.x++;				
				}
				if(boss.x && boss.y && boss_movement == 4 && can_be_walked.indexOf(stage_map[Math.floor(boss.x - 7.59)][boss.y + 1]) != -1){
					boss.y++;
				}

				if(boss && Math.floor(player.x - 7.6) == Math.floor(boss.x - 7.59) && player.y == boss.y){
					player_life = player_life - 1;
					document.getElementById("life").children[1].innerHTML = player_life;
				}

				if(player_life < 1){
					is_paused = true;
					document.getElementById("game_over").style.display = "block";
				}

				displayBoss();
			}
			
			displayEnemy();
		}
	}, 1000)
}

function setEnemy(){
	monster = [];
	boss.health = 1;
	boss.is_respawn = false;

	for (var i = 0; i < 100; i++) {
		random_x = Math.floor((Math.random() * 16) + 0);
		random_y = Math.floor((Math.random() * 14) + 0);

		if(Object.keys(monster).length < 20 && stage_map[Math.floor(random_x)][Math.floor(random_y)] == 0){
			monster[Object.keys(monster).length] = {
				id : Object.keys(monster).length,
				health : 1,
				type : "small_monster",
				x : random_x + 7.69, 
				y : random_y,
			}
		}
		if(Object.keys(boss).length == 5 && stage_map[Math.floor(random_x)][Math.floor(random_y)] == 0){
			boss.x = random_x + 7.59;
			boss.y = random_y;
			// boss.x = 2 + 7.59;
			// boss.y = 1;
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

function reduce_health_by_hit(){
	for (var i = 0; i < monster.length; i++) {
		if(monster[i] && Math.floor(player.x - 7.6) == Math.floor(monster[i].x - 7.69) && player.y == monster[i].y){
			player_life = player_life - 1;
			document.getElementById("life").children[1].innerHTML = player_life;
		}
	
		if(player_life < 1){
			is_paused = true;
			document.getElementById("game_over").style.display = "block";
		}
	}

	if(boss.is_respawn && Math.floor(player.x - 7.6) == Math.floor(boss.x - 7.59) && player.y == boss.y){
		player_life = player_life - 1;
		document.getElementById("life").children[1].innerHTML = player_life;
	}
}


document.onkeydown = function(e){
	if(is_paused === false){
		// console.log(stage_map[player.x - (7.6 + 1)][player.y + 1] + " left");
		// console.log(stage_map[player.x - 7.6][player.y + -1] + " top") ;
		// console.log(stage_map[player.x - (7.6 - 1)][player.y] + " right");
		// console.log(stage_map[player.x - 7.6][player.y +  1] + " down");

		if(e.keyCode == 37){
			if(can_be_walked.indexOf(stage_map[Math.floor(player.x - 8.6)][player.y]) != -1){
				bomberman_powerUp(Math.floor(player.x - 8.6), player.y);
				player.x--;
			}

			reduce_health_by_hit();
		}

		if(e.keyCode == 38){
			if(can_be_walked.indexOf(stage_map[Math.floor(player.x - 7.6)][player.y + -1]) != -1){
				bomberman_powerUp(Math.floor(player.x - 7.6), player.y - 1);
				player.y--;
			}

			reduce_health_by_hit();
		}

		if(e.keyCode == 39){
			if(can_be_walked.indexOf(stage_map[Math.floor(player.x - 6.6)][player.y]) != -1){
				bomberman_powerUp(Math.floor(player.x - 6.6), player.y);
				player.x++;
			}

			reduce_health_by_hit();
		}

		if(e.keyCode == 40 ){
			if(can_be_walked.indexOf(stage_map[Math.floor(player.x - 7.6)][player.y +  1]) != -1){ 
				bomberman_powerUp(Math.floor(player.x - 7.6), player.y  + 1);
				player.y++;
			}

			reduce_health_by_hit();
		}

		if(e.keyCode == 49){
			if(stage_map[Math.floor(player.x - 7.6)][player.y] != 7){
			 	if(player.bomb_carried > 0){
			 		drop_bomb(Math.floor(player.x - 7.6), player.y, player.bomb_carried - 1);
			 		player.bomb_carried--;
			 	}

			 	reduce_health_by_hit();
			}
		}

		displayMap();
		displayBomberman();
	}
}


function displayMap(is_new = false){
	var mapOutput = "";

	for (var i = 0; i < stage_map.length; i++) {
		mapOutput += "<div class='row'>";

		for (var k = 0; k < stage_map[i].length; k++) {
			if(is_new){
				if(stage_map[i][k] == 0){
					if(Math.floor((Math.random() * 2) + 1) == 1){
						mapOutput += "<div class='walkable'></div>";
	                }
	                else{
						stage_map[i][k] = 2;
						mapOutput += "<div class='destroyable'></div>";
					}
	            }
            }
            else{
            	if(stage_map[i][k] == 0){
					mapOutput += "<div class='walkable'></div>";
	            }
	           	else if (stage_map[i][k] == 2){
					mapOutput += "<div class='destroyable'></div>";
				}
            }

            if(stage_map[i][k] == 1){
                mapOutput += "<div class='undestroyable'></div>";
            }
            else if(stage_map[i][k] == 3){
                mapOutput += "<div class='walkable_2'></div>";
            }

			if(stage_map[i][k] == 7){
				mapOutput += "<div class='bomb'></div>";
			}
			if(stage_map[i][k] == 8){
				mapOutput += "<div class='flame'></div>";
			}
			if(stage_map[i][k] == 100){
				mapOutput += "<div class='flag'></div>";
			}
			if(stage_map[i][k] == 99){
				mapOutput += "<div class='health'></div>";
			}
			if(stage_map[i][k] == 98){
				mapOutput += "<div class='speed'></div>";
			}
			if(stage_map[i][k] == 97){
				mapOutput += "<div class='bomb_length'></div>";
			}
			if(stage_map[i][k] == 96){
				mapOutput += "<div class='carried_bomb'></div>";
			}
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


displayBomberman()
displayMap(true);
setEnemy();
displayEnemy();



function displayEnemy(){
	for (var i = 0; i < monster.length; i++) {
		if(monster[i] != undefined){
			document.getElementById("enemy_"+monster[i].id).style.top =  (monster[monster[i].id].y) * 50 +'px'
			document.getElementById("enemy_"+monster[i].id).style.left = (monster[monster[i].id].x) * 50 +'px'
		}
	}
}

function displayBoss(){
	if(boss.health >  0){
		document.getElementById("boss").style.top = boss.y * 50 + "px";
		document.getElementById("boss").style.left = boss.x * 50 + "px";
	}
}

function displayBomberman(){
	document.getElementById("player").style.top = player.y * 50 + "px";
	document.getElementById("player").style.left = player.x * 50 + "px";
}

function timeLeft(){
	if(!is_paused) {
		seconds = seconds - 1;
		boss_respawn_time = boss_respawn_time + 1;
	}

	if(seconds == 0){
		if(minutes > 0){
			minutes--;
			seconds = 59;
		}
		
		if(minutes == 0 && seconds == 0){
			is_paused = true;
			document.getElementById("zero_time").style.display = "block";
			clearInterval(x);
		}

	}
	if(boss.is_respawn === false && (minutes == 0 && (boss_respawn_time == 59) || game_progress > 2 )){
		boss.is_respawn = true;	
		document.getElementById("boss").style.display = "block";
		displayBoss();
	}

	document.getElementById("time_left").children[1].innerHTML = minutes+":"+ ((seconds < 10) ? "0"+ seconds : seconds);
}

function drop_bomb(x, y, number_of_bomb){
	var cant_be_destroyed = [1];
	stage_map[x][y] = 7;
	stage_map = stage_map;

	bomb_countdown(3, function(is_explode){
		if(is_explode === true){
			var percentage_of_up = Math.floor((Math.random() * 10) + 1);
			var up_type = 0;

			for (var length = 1; length <= player.bomb_length; length++) {
				reduce_player_life(player.x - 7.6 == x, player.y == y + length);
				reduce_player_life(player.x - 7.6 == x, player.y == y - length);
				reduce_player_life(player.x - 7.6 == x + length, player.y == y);
				reduce_player_life(player.x - 7.6 == x - length,  player.y == y);
			}

			reduce_player_life(player.x - 7.6 == x, player.y == y);

			for (var boss_bomb = 1; boss_bomb <= player.bomb_length; boss_bomb++) {
				reduce_enemy_life(Math.floor(boss.x - 7.59) == x, boss.y == y + boss_bomb, boss);
				reduce_enemy_life(Math.floor(boss.x - 7.59) == x, boss.y == y - boss_bomb, boss);
				reduce_enemy_life(Math.floor(boss.x - 7.59) == x + boss_bomb, boss.y == y, boss);
				reduce_enemy_life(Math.floor(boss.x - 7.59) == x - boss_bomb,  boss.y == y, boss);
			}

			for (var test = 1; test <= player.bomb_length; test++) {
				for (var enemy = 0; enemy < monster.length; enemy++) {
					(monster[enemy]) ? reduce_enemy_life(Math.floor(monster[enemy].x - 7.69) == x, monster[enemy].y == y + test, monster[enemy]) : "";
					(monster[enemy]) ? reduce_enemy_life(Math.floor(monster[enemy].x - 7.69) == x, monster[enemy].y == y - test, monster[enemy]) : "";
					(monster[enemy]) ? reduce_enemy_life(Math.floor(monster[enemy].x - 7.69) == x + test, monster[enemy].y == y, monster[enemy]) : "";
					(monster[enemy]) ? reduce_enemy_life(Math.floor(monster[enemy].x - 7.69) == x - test,  monster[enemy].y == y, monster[enemy]) : "";
				}
			}

			// console.log(stage_map[x][y+length] +" down")
			// console.log(stage_map[x][y-length] +" top")
			// console.log(stage_map[x+length][y] +" right")
			// console.log(stage_map[x-length][y] +" left")
			// console.log("-----------------"+length+"-----------------")


			//left
			for (var length = 1; length <= player.bomb_length; length++) {
				if(percentage_of_up < 3){
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
					if(stage_map[x-length][y] == 2){
						stage_map[x-length][y] = up_type;
						player.score = player.score + 50;
						game_progress = game_progress + 1;
					}
					else if (stage_map[x-length][y] == 1){
						break;
					}
					else if (stage_map[x-length][y] == 100){
						break;
					}
					else if([0,3].indexOf(stage_map[x-length][y] > 0)){
						stage_map[x-length][y] = 8;
					}
				}catch (e) {
					stage_map[x][y] = 8;
				}
			}
			
			// top
			for (var length = 1; length <= player.bomb_length; length++) {
				if(percentage_of_up < 3){
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
				if(stage_map[x][y-length] == 2){
					stage_map[x][y-length] = up_type;
					player.score = player.score + 50;
					game_progress = game_progress + 1;
				}
				else if(stage_map[x][y-length] == 1){
					break;
				}
				else if(stage_map[x][y-length] == 100){
					break;
				}
				else if([0,3].indexOf(stage_map[x][y-length] > 0)){
					stage_map[x][y-length] = 8;
				}
			}

			//right
			for (var length = 1; length <= player.bomb_length; length++) {
				if(percentage_of_up < 3){
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
				if(stage_map[x+length][y] == 2){
					stage_map[x+length][y] = up_type;
					player.score = player.score + 50;
					game_progress = game_progress + 1;

				}
				else if(stage_map[x+length][y] == 1){
					break;
				}
				else if(stage_map[x+length][y] == 100){
					break;
				}
				else if([0,3].indexOf(stage_map[x+length][y] > 0)){
					stage_map[x+length][y] = 8;
				}
			}
			
			//down
			for (var length = 1; length <= player.bomb_length; length++) {
				if(percentage_of_up < 3){
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
					if(stage_map[x][y+length] == 2){
						stage_map[x][y+length] = up_type;
						player.score = player.score + 50;
						game_progress = game_progress + 1;
					}
					else if(stage_map[x][y+length] == 1){
						break;
					}
					else if(stage_map[x][y+length] == 100){
						break;
					}
					else if([0,3].indexOf(stage_map[x][y+length] > 0)){
						stage_map[x][y+length] = 8;
					}
				}catch (e) {
					stage_map[x][y] = 8;
				}
			}

			if(boss.health < 1 && boss.is_respawn == true){
				document.getElementById("boss").style.display = "none";
				stage_map[Math.floor(boss.x - 7.59)][boss.y] = 100;
				player.score = player.score + 1000;
				document.getElementById("score").children[1].innerHTML = player.score;
			}

			stage_map[x][y] = 8;

			document.getElementById("score").children[1].innerHTML = player.score;
			displayMap();

			bomb_countdown(1, function(is_explode){
				player.bomb_carried++;
				stage_map[x][y] = 0;

				for (var length = 1; length <= player.bomb_length; length++) {
					switch(stage_map[x][y+length]){
						case 1: 
						break;
						case 8:
							if(stage_map[x][y+length] == 8 && stage_map[x][y+length] != 1){
								stage_map[x][y+length] = 0;
							}
						break;

					}

					switch(stage_map[x][y-length]){
						case 1: 
						break;
						case 8:
							if(stage_map[x][y-length] == 8 && stage_map[x][y-length] != 1){
								stage_map[x][y-length] = 0;
							}
						break;
					}

					try {
						switch(stage_map[x+length][y]){
							case 1: 
							break;
							case 8:
								if(stage_map[x+length][y] == 8 && stage_map[x+length][y] != 1){
									stage_map[x+length][y] = 0;
								}
							break;
						}
					}catch (e) {
						stage_map[x][y] = 0;
					}

					try {
						switch(stage_map[x-length][y] ){
							case 1: 
							break;
							case 8:
								if(stage_map[x-length][y] == 8 && stage_map[x-length][y] != 1){
									stage_map[x-length][y] = 0;
								}
							break;
						}
					}catch (e) {
						stage_map[x][y] = 0;
					}
				}

				displayMap();
			});

		}

	});

	displayMap();
}

function bomb_countdown(explode_time, callback) {
	var i = 0;
	var count = setInterval(function () {

		if (i === explode_time - 1) {
			clearInterval(count);
			callback(true);
		}

		if(!is_paused) {
			i++;
		}
	}, 1000);
}

function bomberman_powerUp(x ,y){
	if(stage_map[x][y] == 99){
		stage_map[x][y] = 0;
		player_life = player_life + 1;
		document.getElementById("life").children[1].innerHTML = player_life;
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
		player_life = player_life - 1;
		document.getElementById("life").children[1].innerHTML = player_life;
	}
	if(stage_map[x][y] == 100){
		is_paused = true;
		document.getElementById("congrats").style.display = "block";
	}
}

function reduce_enemy_life(x,y,monster_hit){
	if(x === true && y === true){
		if(monster_hit){
			if(monster_hit.health == 1 && monster_hit.type == "small_monster"){
				player.score = player.score + 100;
				document.getElementById("score").children[1].innerHTML = player.score;
				delete monster[monster_hit.id];
				document.getElementById("enemy_"+monster_hit.id).remove();
				displayEnemy();
			}
			else if (monster_hit.type == "boss" && monster_hit.is_respawn == true){
				boss.health = boss.health - 1;
			}
		}
	}
}

function reduce_player_life(is_x, is_y){
	if(is_x && is_y){
		player_life = player_life - 1;
		document.getElementById("life").children[1].innerHTML = player_life;
	}
}


document.getElementById("form").onsubmit = function(e){
	is_game_start = true;
	player_name = e.target[0].value;
	stage_map[2][1]
	x = setInterval(timeLeft, 1000);
	
	enemy_move();

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

document.getElementById("is_restart").onclick = function(){
	player.x = 8.6;
	player.y = 1;

	boss.respawn = false;
	game_progress = 0;
	boss_respawn_time = 0;
	player_life = 4;

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

	if (container && firstChild) {
		var newDiv = document.createElement('div');
		newDiv.setAttribute("id", "boss");
		firstChild.parentNode.insertBefore(newDiv, firstChild.nextSibling);    
	}

	
	minutes = 3;
	seconds = 59;


	is_paused = false;
	displayMap(true);
	displayBomberman();
	setEnemy();
	displayEnemy();

	stage = stage;
	
	document.getElementById("life").children[1].innerHTML = player_life;
	document.getElementById("score").children[1].innerHTML = player.score;
	document.getElementById("stage").children[1].innerHTML = stage;
	document.getElementById("restart_level").style.display = "none";

}

document.getElementById("quit").onclick = function(){
	is_paused = true;
	document.getElementById("game_over").style.display = "block";
};

document.getElementById("is_not_game_over").onclick = function(){
	document.getElementById("game_over").style.display = "none";
	player.x = 8.6;
	player.y = 1;

	boss.respawn = false;
	game_progress = 0;
	boss_respawn_time = 0;
	player_life = 4;

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

	if (container && firstChild) {
		var newDiv = document.createElement('div');
		newDiv.setAttribute("id", "boss");
		firstChild.parentNode.insertBefore(newDiv, firstChild.nextSibling);    
	}

	
	minutes = 3;
	seconds = 59;


	is_paused = false;
	displayMap(true);
	displayBomberman();
	setEnemy();
	displayEnemy();

	stage = stage;
	
	document.getElementById("life").children[1].innerHTML = player_life;
	document.getElementById("score").children[1].innerHTML = player.score;
	document.getElementById("stage").children[1].innerHTML = stage;
	document.getElementById("restart_level").style.display = "none";
};

document.getElementById("is_game_over").onclick = function(){
	location.reload();
}
document.getElementById("congrats_quit").onclick = function(){
	location.reload();
}
document.getElementById("final_quit").onclick = function(){
	location.reload();
}

document.getElementById("is_not_zero_time").onclick = function(){
	player.x = 8.6;
	player.y = 1;

	boss.respawn = false;
	game_progress = 0;
	boss_respawn_time = 0;
	player_life = 4;

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

	if (container && firstChild) {
		var newDiv = document.createElement('div');
		newDiv.setAttribute("id", "boss");
		firstChild.parentNode.insertBefore(newDiv, firstChild.nextSibling);    
	}

	
	minutes = 3;
	seconds = 59;


	is_paused = false;
	displayMap(true);
	displayBomberman();
	setEnemy();
	displayEnemy();

	stage = stage;
	
	document.getElementById("life").children[1].innerHTML = player_life;
	document.getElementById("score").children[1].innerHTML = player.score;
	document.getElementById("stage").children[1].innerHTML = stage;
	document.getElementById("restart_level").style.display = "none";
}


document.getElementById("is_zero_time").onclick = function(){
	location.reload();
}
