var player = new player();
var game = new game();
var enemy = new enemy();
var food = new food();



/* Login Prototype Feature*/
	/* Start Game Feature */
		document.getElementById("start_game").onclick = function(){
			player.user_name = document.getElementById("user_name").value;
			if(player.user_name != ""){
				player.player_body();
				player.x = 3.5;
				player.y = 3;
				player.length = 3;
				player.direction = "right";
				game.stage = 1;
				player.score = 0;
				for (var i = 0; i < game.map.length; i++) {
					for (var k = 0; k < game.map[i].length; k++) {
			           	if (game.map[i][k] == 5) game.map[i][k] = 0;
			           	else if (game.map[i][k] == 99) game.map[i][k] = 0;
			           	else if (game.map[i][k] == 98) game.map[i][k] = 0;
			           	else if (game.map[i][k] == 97) game.map[i][k] = 0;
					}
				}

				game.paused = false;
				game.create_map()
				food.food()

				if(player.is_new_game == false){
					game.start_game()
					player.display_player();
				}

				document.getElementById("login_dashboard").style.display = "none";
				document.getElementById("user_highscore").style.display = "none";
				document.getElementById("game_dashboard").style.display = "";
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
			player.is_new_game = true;
			game.users.push({"user_name" : player.user_name, "score" : player.score});
		}
		document.getElementById("congrats_quit").onclick = function(){
			document.getElementById("congrats").style.display = "none";
			document.getElementById("game_dashboard").style.display = "none";
			document.getElementById("login_dashboard").style.display = "";
			player.is_new_game = true;
			game.users.push({"user_name" : player.user_name, "score" : player.score});
		}
	

		document.getElementById("player_proceed_no").onclick = function(){
			document.getElementById("proceed_next_stage").style.display = "none";
			document.getElementById("game_dashboard").style.display = "none";
			document.getElementById("login_dashboard").style.display = "";
			player.is_new_game = true;
			game.users.push({"user_name" : player.user_name, "score" : player.score});
		}

		document.getElementById("player_quit_no").onclick = function(){
			game.paused = false;
			document.getElementById("pause_game").style.color = "black";
			document.getElementById("restart_game").style.color = "black";
			document.getElementById("player_quit").style.display = "none";

			player.x = 3.5;
			player.y = 3;
			player.length = 3;
			player.direction = "right";
			game.stage = game.stage;
			player.score = 0;
			for (var i = 0; i < game.map.length; i++) {
				for (var k = 0; k < game.map[i].length; k++) {
		           	if (game.map[i][k] != 1) game.map[i][k] = 0;
		           	// else if (game.map[i][k] == 99) game.map[i][k] = 0;
		           	// else if (game.map[i][k] == 98) game.map[i][k] = 0;
		           	// else if (game.map[i][k] == 97) game.map[i][k] = 0;
				}
			}

			game.create_map()
			player.show_player()
		}
		document.getElementById("player_proceed_yes").onclick = function(){
			document.getElementById("game_stage").innerHTML = "Stage"+(parseInt(game.stage) + parseInt(1));
			game.proceed_next_stage();
		}
	/* End of Game Header Feature*/

	document.onkeydown = function(e){
		// if(is_paused === false && is_game_start == true)
			player.movement(e);
	}
/* End of Prototype Feature */
/* player function */
	function player(){
		this.user_name;
		this.score = 0;
		this.length = 3;
		this.multiplier = 1;
		this.x = 3.5;
		this.y = 3;
		this.old_x;
		this.old_y;
		this.is_new_game = false;
		this.direction = "right";
		this.player_body = function(x = null,y = null, index = null){
			var test = [];
			for (var i = 0; i < player.length; i++) {
				test[((index == null) ? i : index) ] = {
					x : ((x == null) ? 0 : x) ,
					y : ((y == null) ? 0 : y) 
				}
			}

			return test;
		}

		/* display player in front end*/
		this.display_player = function(){
			// var container = document.getElementById('player_data');
			// var firstChild = container.childNodes[0];

	  //       for (var i = this.length - 1; i >= 0; i--) {
			// 	if (container && firstChild && i != 0) {
			// 		var newDiv = document.createElement('div');
			// 		newDiv.setAttribute("id", "player_tail_"+i);
			// 		newDiv.setAttribute("player_tail_id",i);
			// 		newDiv.setAttribute("class", "player");
			// 		container.appendChild(newDiv, container);    
			// 	}
			// 	else{
			// 		var newDiv = document.createElement('div');
			// 		newDiv.setAttribute("id", "player_head_"+i);
			// 		newDiv.setAttribute("player_head_id", i);
			// 		newDiv.setAttribute("class", "player");
			// 		container.appendChild(newDiv, container);    
			// 	}
			// }
		}

		/* end of display player in front end*/

		/* show where location of player */
		this.show_player = function(){
			player_body_temp = player.player_body();
			var last_loc = { x:player.player_body(x,null,0)[0].x, y: player.player_body(null,y,0)[0].y };
			var container = document.getElementById('player_data');
			var firstChild = container.childNodes[0];

			console.log(last_loc.x);

			for (var i = 0; i < player.length; i++) {
				if(i == 0){
					var newDiv = document.createElement('div');
					newDiv.setAttribute("id", "player_head_"+i);
					newDiv.setAttribute("player_head_id", i);
					newDiv.setAttribute("class", "player");
					container.appendChild(newDiv, container);  
				}
				else{	
					var temp_loc = player_body_temp[i];
					// console.log(temp_loc)

					player_body_temp[i] = {
						x : last_loc.x,
						y : last_loc.y
					}

					last_loc = temp_loc;

					var newDiv = document.createElement('div');
					newDiv.setAttribute("id", "player_tail_"+i);
					newDiv.setAttribute("player_tail_id",i);
					newDiv.setAttribute("class", "player");
					container.appendChild(newDiv, container);   
				}
			}
			
			document.getElementById("player_head_0").style.left = this.x * 30+"px";
			document.getElementById("player_head_0").style.top  = this.y * 30+"px";

			for (var i = 1; i < player_body_temp.length; i++) {
				console.log(player_body_temp)
				if( player_body_temp[i]){
					document.getElementById("player_tail_" + i).style.left = player_body_temp[i].x * 30+"px";
					document.getElementById("player_tail_" + i).style.top  = player_body_temp[i].y * 30+"px";
				}
			}
		};
		/*end of show where location of player */

		/* show player body */
		// this.show_player_body = function(){
		// 	var last_loc = { x: player.player_body[0].x, y: player.player_body[0].y };
		// 	/* length of */
		// 	for (var i = 1; i < player.length; i++) {
		// 		var temp_loc = player.player_body[i];

		// 		player.player_body[i] = {
		// 			x : last_loc.x,
		// 			y : last_loc.y,
		// 		}

		// 		last_loc = temp_loc;
		// 	}

		// 	for (var i = 1; i < player.player_body.length; i++) {
		// 		document.getElementById("player_tail_" + i).style.left = (player.player_body[i].x) * 30+"px";
		// 		document.getElementById("player_tail_" + i).style.top  = (player.player_body[i].y) * 30+"px";
		// 	}
		// };
		/* end of show player body */


		/* Player movement */
		this.movement = function(e){
	        var key = e.keyCode;

	        if(key == 49 )
	    		game.paused = true;
	        if(key == 50)
	    		game.paused = false;

	     	if(game.paused == false){
				if (key == "37" && this.direction != "right"){
					this.direction = "left";
				}
				else if (key == "38" && this.direction != "down"){
					this.direction = "up";
				}
				else if (key == "39" && this.direction != "left"){
					this.direction = "right";
				}
				else if (key == "40" && this.direction != "up"){
					this.direction = "down";
				}
	     	}
		}
		/* end of Player movement */


	}
/* end of player function*/
/* food function*/
function food(){
	/* random food and random respawn in map */
	this.food = function(){
		var food_timer = setInterval(function(){
			if(!game.paused){
				random_x = Math.floor((Math.random() * 60) + 0);
				random_y = Math.floor((Math.random() * 20) + 0);
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
	this.users = [];
	this.paused = false;
	this.stage = 1; 
	this.start_game = function(){
		/* game start using interval time */
		var game_timer = setInterval(function(){
			if(!game.paused){
				player_body_temp = player.player_body();
				player_body_temp[0].x = player.x;
				player_body_temp[0].y = player.y;
				console.log(player_body_temp)
				

				/* auto adding of direction of player*/
				if(player.direction == "left")
					player.x--;
				if(player.direction == "up")
					player.y--;
				if(player.direction == "right")
					player.x++;
				if(player.direction == "down")
					player.y++;	
				/*end of  auto adding of direction of player*/


				var snakes = enemy.snake_data;
				for (var i = 0; i < snakes.length; i++) {
					enemy_movement = Math.floor((Math.random() * 4) + 1);
					if (enemy_movement == 1 && snakes[i].direction != "right"){
						snakes[i].direction = "left";
					}
					else if (enemy_movement == 2 && snakes[i].direction != "down"){
						snakes[i].direction = "up";
					}
					else if (enemy_movement == 3 && snakes[i].direction != "left"){
						snakes[i].direction = "right";
					}
					else if (enemy_movement == 4 && snakes[i].direction != "up"){
						snakes[i].direction = "down";
					}

					if (snakes[i].direction == "left"){
						snakes[i].x--;
					}
					if (snakes[i].direction == "up"){
						snakes[i].y--;
					}
					if (snakes[i].direction == "right"){
						snakes[i].x++;
					}
					if (snakes[i].direction == "down"){
						snakes[i].y++;
					}
				}

				for (var i = 0; i < snakes.length; i++) {
					if(game.map[snakes[i].x - 0.5][snakes[i].y - 2] == 1){
						if (enemy_movement == 1 && snakes[i].direction != "right"){
							snakes[i].direction = "left";
						}
						else if (enemy_movement == 2 && snakes[i].direction != "down"){
							snakes[i].direction = "up";
						}
						else if (enemy_movement == 3 && snakes[i].direction != "left"){
							snakes[i].direction = "right";
						}
						else if (enemy_movement == 4 && snakes[i].direction != "up"){
							snakes[i].direction = "down";
						}

						if (snakes[i].direction == "left"){
							snakes[i].x--;
						}
						if (snakes[i].direction == "up"){
							snakes[i].y--;
						}
						if (snakes[i].direction == "right"){
							snakes[i].x++;
						}
						if (snakes[i].direction == "down"){
							snakes[i].y++;
						}
					}


					/*enemy get food, big food, multiplier, big score*/
					if(game.map[snakes[i].x - 0.5][snakes[i].y - 2] == 5){
						game.map[snakes[i].x - 0.5][snakes[i].y - 2] = 0;
						snakes[i].score = snakes[i].score + (10 * snakes[i].multiplier);
						snakes[i].length = snakes[i].length + 1;
					}
					else if(game.map[snakes[i].x - 0.5][snakes[i].y - 2] == 99){
						game.map[snakes[i].x - 0.5][snakes[i].y - 2] = 0;
						snakes[i].score = snakes[i].score + 10;
						snakes[i].length = snakes[i].length + 5;
					}
					else if(game.map[snakes[i].x - 0.5][snakes[i].y - 2] == 98){
						game.map[snakes[i].x - 0.5][snakes[i].y - 2] = 0;
						snakes[i].score = snakes[i].score + 10;
						snakes[i].multiplier = snakes[i].multiplier + 1;
					}
					else if(game.map[snakes[i].x - 0.5][snakes[i].y - 2] == 97){
						game.map[snakes[i].x - 0.5][snakes[i].y - 2] = 0;
						snakes[i].score = snakes[i].score + 100;
					}
					/*end of enemy get food, big food, multiplier, big score*/
				}

				enemy.show_enemy();

				/* player hit wall , show modal of quit*/
				if(game.map[player.x - 0.5][player.y - 2] == 1){
					game.paused = true;
					document.getElementById("player_quit").style.display = "";
				}
				/*end of player hit wall , show modal of quit*/

				/*player get food, big food, multiplier, big score*/
				if(game.map[player.x - 0.5][player.y - 2] == 5){
					game.map[player.x - 0.5][player.y - 2] = 0;
					player.score = player.score + (10 * player.multiplier);
					player.length = player.length + 1;
				}
				else if(game.map[player.x - 0.5][player.y - 2] == 99){
					game.map[player.x - 0.5][player.y - 2] = 0;
					player.score = player.score + 10;
					player.length = player.length + 5;
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


				/* check if the game will proceed to the next game or the game is already fnished*/
				if(player.length > 4){
					game.paused = true;

					if(game.stage >= 3)
						document.getElementById("congrats").style.display = "";
					else
						document.getElementById("proceed_next_stage").style.display = "";
				}
				/* end of check if the game will proceed to the next game or the game is already fnished*/

				/* diplay of score in the right side of the game dashboard */
				document.getElementById("in_game_score").innerHTML = "";
				var table = document.getElementById("in_game_score");
				var row = table.insertRow(0);
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				cell1.innerHTML = player.user_name;
				cell2.innerHTML = player.score;
				/* end of diplay of score in the right side of the game dashboard */

				player.show_player();
				game.create_map();
			}
		}, 300);
	}
	this.proceed_next_stage = function(){
		game.paused = false;
		document.getElementById("proceed_next_stage").style.display = "none";
		player.x = 3.5;
		player.y = 3;
		player.length = 3;
		player.direction = "right";
		game.stage = game.stage + 1;
		player.score = player.score;

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
					mapOutput += "<div class='food'></div>";
	           	else if (this.map[i][k] == 99)
					mapOutput += "<div class='big_food'></div>";
	           	else if (this.map[i][k] == 98)
					mapOutput += "<div class='multiplier'></div>";
	           	else if (this.map[i][k] == 97)
					mapOutput += "<div class='big_score'></div>";
			}

			mapOutput += "</div>";
		}

		document.getElementById("game_container_main").innerHTML = mapOutput;
	}
}

function enemy(){
	this.enemy_limit = 1;
	this.snake_data = []
	this.snakes = function(){
		for(var index = 0; index < this.enemy_limit; index++){
			this.snake_data.push({
				enemy_id : index,
				length : 3,
				x : 20.5,
				y : 11,
				multiplier : 1,
				direction : ((Math.floor((Math.random() * 10) + 1) > 5) ? "left" : "right")
			})
		}
	}
	this.display_enemy = function(){
		var container = document.getElementById('enemy_data');
		var firstChild = container.childNodes[0];
		var snakes = this.snake_data;
        for (var i = snakes.length - 1; i >= 0; i--) {
        	var test = document.createElement('div')
			test.setAttribute("id", "enemy_data_"+i);
			container.appendChild(test, container);    

			var haha = document.getElementById("enemy_data_"+i);

			var newDiv = document.createElement('div');
			newDiv.setAttribute("id", "enemy_head_"+i);
			newDiv.setAttribute("enemy_head_id", i);
			newDiv.setAttribute("class", "enemy");
			haha.appendChild(newDiv, haha);   

  	     	for (var k = snakes[i].length - 1; k >= 1; k--) {
     			var newDiv = document.createElement('div');
				newDiv.setAttribute("id", "enemy_tail_"+i+"_"+k);
				newDiv.setAttribute("enemy_tail_id", k);
				newDiv.setAttribute("class", "enemy_tail");
				haha.appendChild(newDiv, haha);   
			}
		}
	}
	this.show_enemy = function(){
		var snakes = this.snake_data;
		for (var i = 0; i < snakes.length; i++) {
			document.getElementById("enemy_head_"+i).style.left = snakes[i].x * 30+"px";
			document.getElementById("enemy_head_"+i).style.top  = snakes[i].y * 30+"px";
		}
	};

	this.movement = function(){
		var snakes = this.snake_data;
		
	}
}

console.log(enemy.movement());
console.log(enemy.snakes());
console.log(enemy.display_enemy());
