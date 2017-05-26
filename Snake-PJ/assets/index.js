var player = new Player(false);
var game = new game();
var food = new food();

function start_new_game(){
	player.player_body();
	player.x = 3.5;
	player.y = 3;
	player.length = 3;
	player.direction = "right";

	game.stage = 1;
	player.score = 0;
	for (var i = 0; i < game.map.length; i++) {
		for (var k = 0; k < game.map[i].length; k++) {
           	if (game.map[i][k] != 1) game.map[i][k] = 0;
		}
	}

	player.next_game()

	game.paused = false;

	if(player.is_new_game == false){
		for (var i = document.getElementsByClassName("player").length; i--; ) {
			document.getElementsByClassName("player")[i].remove();
		}
		
		game.enemies = [];

		this.start_game = function(){
			var game = this;
			for(var x = 0; x < 1; x++){
				game.enemies.push(new Player(true, x));	
			}
		}

		food.food()
		game.start_game()
		game.create_map()
	}
}

/* Login Prototype Feature*/
	/* Start Game Feature */
		document.getElementById("start_game").onclick = function(){
			player.user_name = document.getElementById("user_name").value;
			if(player.user_name != ""){
				start_new_game();

				document.getElementById("login_dashboard").style.display = "none";
				document.getElementById("user_highscore").style.display = "none";
				document.getElementById("game_dashboard").style.display = "";
				document.getElementById("game_container_header").style.display = "";
				document.getElementById("game_score_container").style.display = "";
			}

			return false;
		}
	/* End of Start Game Feature */
	/* High Score Feature */
		document.getElementById("show_highscore").onclick = function(){
			var sort_player_score = game.users.slice(0);
			sort_player_score.sort(function(a,b) {return a.score - b.score;}); //magic

			if(sort_player_score.length > 10)
				sort_player_score.shift();

			document.getElementById("user_highscore").style.display = "block";
			document.getElementById("user_score").innerHTML = "";

			for(var key in sort_player_score){
				var table = document.getElementById("user_score");
				var row = table.insertRow(0);
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				cell1.innerHTML = sort_player_score[key].user_name;
				cell2.innerHTML = sort_player_score[key].score;
			}

			return false;
		}

		document.getElementById("score_close").onclick = function(){
			document.getElementById("user_highscore").style.display = "none";
		}

		document.getElementById("score_reset").onclick = function(){
			game.users = [];
			document.getElementById("user_highscore").style.display = "none";
		}
	/* End of High Score Feature */
/* End of Login Feature*/

/* Game Prototype Feature */
	/* Game Header Feature*/
		document.getElementById("pause_game").onclick = function(){
			game.paused = true;
			document.getElementById("restart_game").disabled = true;
			document.getElementById("quit_game").disabled = true;
			document.getElementById("restart_game").style.color = "gray";
			document.getElementById("quit_game").style.color = "gray";
			document.getElementById("continue_game").style.display = "";
			document.getElementById("player_paused").style.display = "";
			this.style.display = "none"
		}	
		document.getElementById("continue_game").onclick = function(){
			game.paused = false;
			document.getElementById("restart_game").disabled = false;
			document.getElementById("quit_game").disabled = false;
			document.getElementById("restart_game").style.color = "black";
			document.getElementById("quit_game").style.color = "black";
			document.getElementById("pause_game").style.display = "";
			document.getElementById("player_paused").style.display = "none";
			this.style.display = "none"
		}
		document.getElementById("restart_game").onclick = function(){
			game.paused = true;
			document.getElementById("pause_game").disabled = false;
			document.getElementById("quit_game").disabled = false;
			document.getElementById("pause_game").style.color = "gray";
			document.getElementById("quit_game").style.color = "gray";
			document.getElementById("player_restart").style.display = "";
		}
		document.getElementById("player_restart_yes").onclick = function(){
			game.proceed_next_stage(true);
			document.getElementById("pause_game").style.color = "black";
			document.getElementById("quit_game").style.color = "black";
			document.getElementById("player_restart").style.display = "none";
		}
		document.getElementById("player_restart_no").onclick = function(){
			game.paused = false;
			document.getElementById("pause_game").style.color = "black";
			document.getElementById("quit_game").style.color = "black";
			document.getElementById("player_restart").style.display = "none";
		}
		document.getElementById("quit_game").onclick = function(){
			game.paused = true;
			document.getElementById("pause_game").disabled = false;
			document.getElementById("restart_game").disabled = false;
			document.getElementById("pause_game").style.color = "gray";
			document.getElementById("restart_game").style.color = "gray";
			document.getElementById("player_quit").style.display = "";
		}
		document.getElementById("player_quit_yes").onclick = function(){
			document.getElementById("pause_game").style.color = "black";
			document.getElementById("restart_game").style.color = "black";
			document.getElementById("player_quit").style.display = "none";
			document.getElementById("game_dashboard").style.display = "none";
			document.getElementById("login_dashboard").style.display = "";
			document.getElementById("game_score_container").style.display = "none";
			document.getElementById("game_container_header").style.display = "none";
			player.is_new_game = true;
			game.users.push({"user_name" : player.user_name, "score" : player.score});
		}
		document.getElementById("congrats_quit").onclick = function(){
			document.getElementById("congrats").style.display = "none";
			document.getElementById("game_container_header").style.display = "none";
			document.getElementById("game_dashboard").style.display = "none";
			document.getElementById("game_score_container").style.display = "none";
			document.getElementById("login_dashboard").style.display = "";
			player.is_new_game = true;
			game.users.push({"user_name" : player.user_name, "score" : player.score});
		}	
		document.getElementById("player_proceed_no").onclick = function(){
			document.getElementById("proceed_next_stage").style.display = "none";
			document.getElementById("game_dashboard").style.display = "none";
			document.getElementById("game_container_header").style.display = "none";
			document.getElementById("game_score_container").style.display = "none";
			document.getElementById("login_dashboard").style.display = "";
			player.is_new_game = true;
			game.users.push({"user_name" : player.user_name, "score" : player.score});
			player.remove_player();
		}
		document.getElementById("player_quit_no").onclick = function(){
			game.paused = false;
			document.getElementById("pause_game").style.color = "black";
			document.getElementById("restart_game").style.color = "black";
			document.getElementById("player_quit").style.display = "none";
		}

		document.getElementById("player_proceed_yes").onclick = function(){
			document.getElementById("game_stage").innerHTML = "Stage"+(parseInt(game.stage) + parseInt(1));
			game.proceed_next_stage();
		}
	/* End of Game Header Feature*/

	document.onkeydown = function(e){
			player.movement(e);
	}
/* End of Prototype Feature */
/* player function */
	function Player(is_enemy = false, index = null){
		var snake_parts = [{ x: 3.5, y: 3, last_loc: undefined}];
		this.is_enemy = is_enemy;
		this.user_name;
		this.score = 0;
		this.length = 3;
		this.multiplier = 1;
		this.x = is_enemy == false ? 3.5 	: (Math.floor((Math.random() * 55) + 3) +".5");
		this.y = is_enemy == false ? 3 		: (Math.floor((Math.random() * 20) + 3));
		this.head = is_enemy == false ? "player_head_0" 	: ("enemy_head_" + index);
		this.enemy_index = index;
		this.is_new_game = false;
		this.direction = "right";
		this.enemy_direction = "right";


		/* Initialize the first body of snake */
		var _init_snake = function(player){
			for (var i = 1; i < 3; i++) {
				snake_parts.push({
					x: snake_parts[i-1].x - 1,
					y: snake_parts[i-1].y
				});
			}

			var container_id = (player.is_enemy == false) ? 'player_data' : 'enemy_'+player.enemy_index;

			if(document.getElementById(container_id) == undefined)
				document.getElementById("game_dashboard").innerHTML += "<div id='" + container_id + "'></div>";
		}
		/* end of Initialize the first body of snake */

		/* player turning points*/
		this.player_body = function(x = null, y = null, index = null){
			if(index !== null){
				snake_parts[index].last_loc = {
					x: snake_parts[index].x,
					y: snake_parts[index].y
				}

				snake_parts[index].x = x;
				snake_parts[index].y = y;

				for(var x = index + 1; x < snake_parts.length; x++){
					snake_parts[x].last_loc = {
						x: snake_parts[x].x,
						y: snake_parts[x].y
					};

					snake_parts[x].x = snake_parts[x-1].last_loc.x;
					snake_parts[x].y = snake_parts[x-1].last_loc.y;
				}
			}

			return snake_parts;
		}

		/* end of player turning points*/

		/* collisions */
		this.collided = function (snakes){
			var player_body_init = player.player_body();
			/* enemy collide to player*/
			/* Count how many snakes in the game */
			for (var i = 0; i < snakes.length; i++) {
				var enemy_head = snakes[i].player_body();

				/* Count the body of the user snake */
				for (var k = 0; k < player_body_init.length; k++) {
					/* Check if the enemy collide to the user snake */
					if(this.is_enemy == true && player_body_init[k].x == enemy_head[0].x && player_body_init[k].y == enemy_head[0].y)
						snakes[i].remove_player();
				}

				/* collide same enemy */
				for (var index = 0; index < enemy_head.length; index++) {
					/* enemy to user */
					if (player_body_init[0].x == enemy_head[index].x &&  player_body_init[0].y == enemy_head[index].y){
						player.remove_player();
					}
					/* end of enemy to user */
					/* Enemy to enemy */
					if(this.is_enemy == true){
						for (var index = 0; index < enemy_head.length; index++) {
							if(this.enemy_index != snakes[i].enemy_index){
								if(this.x == enemy_head[index].x && this.y == enemy_head[index].y)
									snakes[i].remove_player(i);
							}
						}
					}	
					/* End of Enemy to enemy */
				}
			}
		}
		/* end of collisions */

		/* show where location of player/enemy */
		this.show_player = function(){
			var container = (this.is_enemy == false) ?  document.getElementById('player_data') : document.getElementById('enemy_'+this.enemy_index);
			/* Create the html structure in the front end */
			for (var i = 0; i < snake_parts.length; i++) {
				if(i == 0){
					var snakeDom 		 = document.getElementById(this.head);
					var snake_head_class = this.is_enemy == false ? "player" : "enemy";
					if(snakeDom == undefined){
						var newDiv = document.createElement('div');
						newDiv.setAttribute("id", this.head);
						newDiv.setAttribute("player_head_id", i);
						newDiv.setAttribute("class", snake_head_class);
						container.appendChild(newDiv, container);  
					}
				}
				else{	
					var tail_id 	 	 = this.is_enemy == false ? "player_tail_"+i : "enemy_tail_"+ this.enemy_index + "_" + i;
					var snake_tail_class = this.is_enemy == false ? "player" : "enemy_tail";
					var snakeDom = document.getElementById(tail_id);
					if(snakeDom == undefined){
						var newDiv = document.createElement('div');
						newDiv.setAttribute("id", tail_id);
						newDiv.setAttribute("player_tail_id",i);
						newDiv.setAttribute("class", snake_tail_class);
						container.appendChild(newDiv, container);   
					}
				}
			}
			/*End of Create the html structure in the front end */


			/* check if the game will proceed to the next game or the game is already fnished*/
			if(this.is_enemy === false && snake_parts.length > 20){
				game.paused = true;

				if(game.stage >= 3)
					document.getElementById("congrats").style.display = "";
				else
					document.getElementById("proceed_next_stage").style.display = "";
			}
			/*End of check if the game will proceed to the next game or the game is already fnished*/


			/* Show the head */
			document.getElementById(this.head).style.left = this.x * 30+"px";
			document.getElementById(this.head).style.top  = this.y * 30+"px";
			/* End of Show the head */

			/* Show the body */
			for (var i = 1; i <  snake_parts.length; i++) {
				if(snake_parts[i]){
					var tail_id = this.is_enemy == false ? "player_tail_"+i : "enemy_tail_"+ this.enemy_index + "_" + i;
					document.getElementById(tail_id).style.left = snake_parts[i].x * 30+"px";
					document.getElementById(tail_id).style.top  = snake_parts[i].y * 30+"px";
				}
			}
			/* End Show the body */


			/*collision of own body*/
				for (var i = 1; i < snake_parts.length; i++) {
					if(this.is_enemy == false && snake_parts[0].x == snake_parts[i].x && snake_parts[0].y == snake_parts[i].y )
						this.remove_player()
					else if(this.is_enemy == true && snake_parts[0].x == snake_parts[i].x && snake_parts[0].y == snake_parts[i].y )
						this.remove_player()
				}
			/*end of collision of body*/
		};
		/*end of show where location of player/enemy */

		/* When the player eat foods */
		this.add_body = function(){
			snake_parts.push({
				x : snake_parts[snake_parts.length - 1].x,
				y : snake_parts[snake_parts.length - 1].y,
			});
		}
		/* end of When the player eat foods */

		/* reset the snake parts when proceed to next game */
		this.next_game = function(){
			snake_parts = [{ x: 3.5, y: 3, last_loc: undefined}];
			_init_snake(this);
		}
		/* end of reset the snake parts when proceed to next game */

		/* Player movement */
		this.movement = function(e){
	        var key = e.keyCode;

	        if(key == 49 )
	    		game.paused = true;
	        if(key == 50)
	    		game.paused = false;

	     	if(game.paused == false){
				if (key == "37" && this.direction != "right")
					this.direction = "left";
				else if (key == "38" && this.direction != "down")
					this.direction = "up";
				else if (key == "39" && this.direction != "left")
					this.direction = "right";
				else if (key == "40" && this.direction != "up")
					this.direction = "down";

				if (key == "65" && this.enemy_direction != "right")
					this.enemy_direction = "left";
				else if (key == "87" && this.enemy_direction != "down")
					this.enemy_direction = "up";
				else if (key == "68" && this.enemy_direction != "left")
					this.enemy_direction = "right";
				else if (key == "83" && this.enemy_direction != "up")
					this.enemy_direction = "down";
	     	}
		}
		/* end of Player movement */

		/* function that will remove or respawn again a player */
		this.remove_player = function(index = null, is_next_stage = false){
			if(this.is_enemy === false){
				for (var i = 0; i < snake_parts.length; i++) {
					game.map[snake_parts[i].x - 0.5][snake_parts[i].y - 2] = 5;

					if(snake_parts.length - 1 == i)
						document.getElementById("player_data").remove();
				}

				snake_parts = [{ x: 3.5, y: 3, last_loc: undefined}];
				this.x  = 3.5;
				this.y  = 3;	
				this.score = is_next_stage == false ? 0 : this.score;
				this.direction = "right";

				_init_snake(this);
			}
			else{
				for (var i = 0; i < snake_parts.length; i++) {
					try{
						game.map[snake_parts[i].x - 0.5][snake_parts[i].y - 2] = 5;
					}
					catch(err){
						console.log("nice")
					}

					if(snake_parts.length - 1 == i)
						document.getElementById("enemy_"+this.enemy_index).remove();
				}

				snake_parts = [{ x: 30, y: 25, last_loc: undefined}];

				this.score = 0;
				this.x = (Math.floor((Math.random() * 55) + 3) +".5");
				this.y = (Math.floor((Math.random() * 20) + 3));
				
				enemy_movement = Math.floor((Math.random() * 4) + 1);
				
				if (enemy_movement == 1)
					this.direction =  "left";
				else if (enemy_movement == 2)
					this.direction =  "up";
				else if (enemy_movement == 3)
					this.direction =  "right";
				else if (enemy_movement == 4)
					this.direction =  "down";

				_init_snake(this);
			}
		}
		/* end of function that will remove or respawn again a player */

		_init_snake(this);
	}

/* end of player function*/
/* food function*/
function food(){
	/* random food and random respawn in map */
	this.food = function(){
		var food_timer = setInterval(function(){
			if(!game.paused){
				random_x = Math.floor((Math.random() * 48) + 10);
				random_y = Math.floor((Math.random() * 16) + 5);

				if(game.map[random_x][random_y] == 0){
					var percentage_of_up = Math.floor((Math.random() * 10) + 1);
					var up_type = 5;

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
						}
					}

					game.map[random_x][random_y] = up_type;
				}
			}
		}, 1000)
	}
	/*end of random food and random respawn in map */
}
/*end of food function*/
/* game function*/
function game(){
	this.enemies = [];
	this.users = [];
	this.paused = false;
	this.stage = 1; 
	this.start_game = function(){
		/* Create enemy */
		var game = this;
		for(var x = 0; x < 10; x++){
			game.enemies.push(new Player(true, x));	
		}

		/* game start using interval time */
		var game_timer = setInterval(function(){

			if(!game.paused){
				var players_score = [];
				/* auto adding of direction of player*/
				if(player.direction == "left")
					(game.map[player.x - 1.5][player.y - 2] != 1) ? player.x-- : player.remove_player();
				if(player.direction == "up")
					(game.map[player.x - 0.5][player.y - 3] != 1) ? player.y-- : player.remove_player();
				if(player.direction == "right")
					(game.map[player.x + 0.5][player.y - 2] != 1) ? player.x++ : player.remove_player();
				if(player.direction == "down")
					(game.map[player.x - 0.5][player.y - 1] != 1) ? player.y++ : player.remove_player();
				/*end of  auto adding of direction of player*/
				/* send the first move of the head*/
				player.player_body(player.x, player.y, 0);
				/* end of the first move of the head*/
				/* Player Movements and getting food*/

					/*player get food, big food, multiplier, big score*/
					if(game.map[player.x - 0.5][player.y - 2] == 5){
						game.map[player.x - 0.5][player.y - 2] = 0;
						player.score = player.score + (10 * player.multiplier);
						player.length = player.length + 1;
						player.add_body();
					}
					else if(game.map[player.x - 0.5][player.y - 2] == 99){
						game.map[player.x - 0.5][player.y - 2] = 0;
						player.score = player.score + 10;
						player.length = player.length + 5;
						for (var i = 0; i < 5; i++) {
							player.add_body();
						}
					}
					else if(game.map[player.x - 0.5][player.y - 2] == 98){
						game.map[player.x - 0.5][player.y - 2] = 0;
						player.score = player.score + 10;
						player.multiplier = player.multiplier + 1;
					}
					else if(game.map[player.x - 0.5][player.y - 2] == 97){
						game.map[player.x - 0.5][player.y - 2] = 0;
						player.score = player.score + 100;
					}
					/*end of player get food, big food, multiplier, big score*/

					players_score.push({player_name : player.user_name, player_score : player.score});
					/* end of diplay of score in the right side of the game dashboard */
				/* End of Player Movements and getting food*/
				

				/* enemy movement*/
					var snakes = game.enemies;
					for (var i = 0; i < snakes.length; i++) {
						enemy_movement = Math.floor((Math.random() * 4) + 1);

						if (enemy_movement == 1 && snakes[i].direction != "right")
							snakes[i].direction = "left";
						else if (enemy_movement == 2 && snakes[i].direction != "down")
							snakes[i].direction = "up";
						else if (enemy_movement == 3 && snakes[i].direction != "left")
							snakes[i].direction = "right";
						else if (enemy_movement == 4 && snakes[i].direction != "up")
							snakes[i].direction = "down";

						if (snakes[i].direction == "left")
							if(game.map[(snakes[i].x - 0.5) - 1][(snakes[i].y - 2)] != 1){ 
								snakes[i].x--;
								if(document.getElementsByClassName("enemy")[i] != undefined)
									document.getElementsByClassName("enemy")[i].style.transform = "rotate(90deg)"
							}
							else{
								snakes[i].remove_player(i);
							}
						if (snakes[i].direction == "up")
							if(game.map[(snakes[i].x - 0.5)][(snakes[i].y - 2 ) - 1] != 1){
								snakes[i].y--
								if(document.getElementsByClassName("enemy")[i] != undefined)
									document.getElementsByClassName("enemy")[i].style.transform = "rotate(180deg)"
							} 
							else
								snakes[i].remove_player(i);
						if (snakes[i].direction == "right")
							if(game.map[(snakes[i].x - 0.5) + 1][(snakes[i].y - 2)] != 1)
							{
								snakes[i].x++
								if(document.getElementsByClassName("enemy")[i] != undefined)
									document.getElementsByClassName("enemy")[i].style.transform = "rotate(270deg)"
							}
							else
								snakes[i].remove_player(i);
						if (snakes[i].direction == "down")
							if(game.map[(snakes[i].x - 0.5)][(snakes[i].y - 2) + 1] != 1){
								snakes[i].y++
								if(document.getElementsByClassName("enemy")[i] != undefined)
									document.getElementsByClassName("enemy")[i].style.transform = "rotate(360deg)"
							}
							 else
							 	snakes[i].remove_player(i);

						if(game.map[snakes[i].x - 0.5][snakes[i].y - 2] == 5){
							game.map[snakes[i].x - 0.5][snakes[i].y - 2] = 0;
							snakes[i].score = snakes[i].score + (10 * snakes[i].multiplier);
							snakes[i].length = snakes[i].length + 1;
							snakes[i].add_body();
						}
						else if(game.map[snakes[i].x - 0.5][snakes[i].y - 2]  == 99){
							game.map[snakes[i].x - 0.5][snakes[i].y - 2] = 0;
							snakes[i].score = snakes[i].score + 10;
							snakes[i].length = snakes[i].length + 5;
							for (var k = 0; k < 5; k++) {
								snakes[i].add_body();
							}
						}
						else if(game.map[snakes[i].x - 0.5][snakes[i].y - 2]  == 98){
							game.map[snakes[i].x - 0.5][snakes[i].y - 2]  = 0;
							snakes[i].score = snakes[i].score + 10;
							snakes[i].multiplier = snakes[i].multiplier + 1;
						}
						else if(game.map[snakes[i].x - 0.5][snakes[i].y - 2]  == 97){
							game.map[snakes[i].x - 0.5][snakes[i].y - 2] = 0;
							snakes[i].score = snakes[i].score + 100;
						}

						players_score.push({player_name : "user_AI_"+ i, player_score : snakes[i].score});
						snakes[i].player_body(snakes[i].x, snakes[i].y, 0);
						snakes[i].show_player();
						snakes[i].collided(snakes);
					}


				/* end of enemy movement*/

				/* End of Player Movements and getting food*/
				/* update the score in game dashboard */
					var sort_player_score = players_score.slice(0);
					sort_player_score.sort(function(a,b) {return a.player_score - b.player_score;}); //magic

					document.getElementById("in_game_score").innerHTML = "";

					for(var key in sort_player_score){
						var table = document.getElementById("in_game_score");
						var row = table.insertRow(0);
						var cell1 = row.insertCell(0);
						var cell2 = row.insertCell(1);
						cell1.innerHTML = sort_player_score[key].player_name;
						cell2.innerHTML = sort_player_score[key].player_score;
					}

					player.show_player();
					player.collided(snakes);
				/* end update the score in game dashboard */

				for(var x = 1; x <= 3; x++){
					game.map[x][1] = 0;
				}
			
				game.create_map();
			}
		}, 80);
	}
	/* Proceed to the next game */
	this.proceed_next_stage = function(same_stage = false){
		game.paused = false;
		document.getElementById("proceed_next_stage").style.display = "none";
		game.stage = (same_stage == false) ? game.stage + 1 : game.stage;
		player.remove_player(1, true)
		game.enemies = [];

		for(var x = 0; x < 10; x++){
			game.enemies.push(new Player(true, x));	
		}

		for (var i = 0; i < game.map.length; i++) {
			for (var k = 0; k < game.map[i].length; k++) {
	           	if (game.map[i][k] == 5) game.map[i][k] = 0;
	           	else if (game.map[i][k] == 99) game.map[i][k] = 0;
	           	else if (game.map[i][k] == 98) game.map[i][k] = 0;
	           	else if (game.map[i][k] == 97) game.map[i][k] = 0;
			}
		}

		game.create_map()
		player.show_player()
	}
	/* End of Proceed to the next game */

	
	this.map =[
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	];

	/* Generate of map */
	this.create_map = function(){
		var mapOutput = "";

		for (var i = 0; i < this.map.length; i++) {
			mapOutput += "<div class='row'>";

			for (var k = 0; k < this.map[i].length; k++) {
            	if(this.map[i][k] == 0)
					mapOutput += "<div class='walkable'></div>";
	           	else if (this.map[i][k] == 1)
					mapOutput += "<div class='undestroyable'></div>";
	           	else if (this.map[i][k] == 5)
					mapOutput += "<div class='food'><span></span></div>";
	           	else if (this.map[i][k] == 99)
					mapOutput += "<div class='big_food'><span></span></div>";
	           	else if (this.map[i][k] == 98)
					mapOutput += "<div class='multiplier'><span></span></div>";
	           	else if (this.map[i][k] == 97)
					mapOutput += "<div class='big_score'><span></span></div>";
			}

			mapOutput += "</div>";
		}

		document.getElementById("game_container_main").innerHTML = mapOutput;
	}
	/* end of +Generate of map */
}
