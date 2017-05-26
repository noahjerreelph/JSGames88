var game = new game_info();
var player = new player_info();
var game_paused = false;


/*Login dashboard prototype*/
	document.getElementById("player_1").onclick = function(){
		this.parentElement.parentElement.style.display = "none";
		document.getElementById("play_with_AI_dashboard").style.display = "block";
	}	
	document.getElementById("player_2").onclick = function(){
		this.parentElement.parentElement.style.display = "none";
		document.getElementById("play_with_player_2_dashboard").style.display = "block";
	}

	document.getElementById("AI_start_game_cancel").onclick = function(){
		this.parentElement.parentElement.style.display = "none";
		document.getElementById("selection_dashboard").style.display = "block";
	}

	document.getElementById("AI_start_game_start").onclick = function(){
		player.first_player_name = document.getElementById("AI_first_player_name").value;
		player.second_player_name ="AI";
		player.ai_diffulty = document.getElementById("ai_diffulty").value;

		game.game_type = "AI";
		game_paused = false;

		if(player.first_player_name != ""){
			document.getElementById("login_dashboard").style.display = "none";
			document.getElementById("game_dashboard").style.display = "block";
			document.getElementById("ingame_player_name").innerHTML = player.first_player_name;
			document.getElementById("game_stage").innerHTML = game.game_number;
			x = setInterval(game.timeLeft, 1000);
		}
	}

	document.getElementById("play_with_player_2_dashboard_cancel").onclick = function(){
		this.parentElement.parentElement.style.display = "none";
		document.getElementById("selection_dashboard").style.display = "block";
	}
	document.getElementById("show_player_history_game").onclick = function(){
		game.updateGameRecord();
		this.parentElement.parentElement.style.display = "none";
		document.getElementById("show_game_score").style.display = "block";

	}
	document.getElementById("show_game_score_cancel").onclick = function(){
		this.parentElement.style.display = "none";
		document.getElementById("selection_dashboard").style.display = "block";
	}
	document.getElementById("show_game_score_clear").onclick = function(){
		this.user = [];
		document.getElementById("user_show_score_body").innerHTML = "";
	}
	document.getElementById("player_paused_game").onclick = function(){
		document.getElementById("player_continue_game").style.display = "block";
		this.style.display = "none";
		game_paused = true;
	}
	document.getElementById("player_continue_game").onclick = function(){
		document.getElementById("player_paused_game").style.display = "block";
		this.style.display = "none";
		game_paused = false;
	}
	document.getElementById("player_quit_game").onclick = function(){
		game_paused = true;
		console.log(game.game_type)
		if(game.game_type == "friend"){
			document.getElementById("player_quit_modal").style.display = "block";
		}
		else{
			console.log("AI MODAL")			
		}
	}
	
	document.getElementById("player_quit_yes").onclick = function(){
		game.updateUsers();
		game.gameRestart();

		document.getElementById("player_quit_modal").style.display = "none";
		document.getElementById("player_complete").style.display = "none";
		document.getElementById("game_dashboard").style.display = "none";
		document.getElementById("play_with_player_2_dashboard").style.display = "none";
		document.getElementById("login_dashboard").style.display = "block";
		document.getElementById("selection_dashboard").style.display = "block";
		clearInterval(x)
	}

	document.getElementById("player_quit_no").onclick = function(){
		game_paused = false;
		document.getElementById("player_quit_modal").style.display = "none";
	}

	document.getElementById("player_complete_yes").onclick = function(){
		game.gameRestart();
		document.getElementById("player_quit_modal").style.display = "none";
		document.getElementById("player_complete").style.display = "none";
		document.getElementById("game_dashboard").style.display = "none";
		document.getElementById("play_with_player_2_dashboard").style.display = "none";
		document.getElementById("login_dashboard").style.display = "block";
		document.getElementById("selection_dashboard").style.display = "block";
		clearInterval(x)
	}

	document.getElementById("player_2_start_game_button").onclick = function(){
		player.first_player_name = document.getElementById("first_player_name").value;
		player.second_player_name = document.getElementById("second_player_name").value;
		player.ai_diffulty = "";
		game.game_type = "friend";
		game_paused = false;

		if(player.first_player_name != "" && player.second_player_name != ""){
			document.getElementById("login_dashboard").style.display = "none";
			document.getElementById("game_dashboard").style.display = "block";
			document.getElementById("ingame_player_name").innerHTML = player.first_player_name;
			document.getElementById("game_stage").innerHTML = game.game_number;
			x = setInterval(game.timeLeft, 1000);
		}
	}

/*End of Login dashboard prototype*/

/* Game dashboard prototype*/
function player_info(){
	this.first_player_name;
	this.second_player_name;
	this.first_player_piece = 12;
	this.second_player_piece = 12;
	this.ai_diffulty;
}

game.displayMap();

function game_info(){
	var seconds = 0;
	var minutes = 0;
	var hours = 0;
	var time_paused = false;
	this.game_number = 1;
	this.game_type;
	this.users = [];
	this.player_move_start = 1;

	// this.board = [
	// 	[1,0,1,0,1,0,1,0],
	// 	[0,1,0,1,0,1,0,1],
	// 	[1,0,1,0,1,0,1,0],
	// 	[0,1,9,1,0,1,0,1],
	// 	[1,0,1,0,1,8,1,0],
	// 	[0,1,0,1,0,1,0,1],
	// 	[1,0,1,0,1,8,1,0],
	// 	[0,1,0,1,0,1,0,1],
	// ];
	
	this.board = [
		[1,9,1,0,1,8,1,8],
		[9,1,9,1,0,1,8,1],
		[1,9,1,0,1,8,1,8],
		[9,1,9,1,0,1,8,1],
		[1,9,1,0,1,8,1,8],
		[9,1,9,1,0,1,8,1],
		[1,9,1,0,1,8,1,8],
		[9,1,9,1,0,1,8,1],
	];
	
	/* Generate Map */
	this.displayMap = function (){
		var mapOutput = "";
		var board = this.board ;
		var player_first_piece;
		

		for (var i = 0; i < board.length; i++) {
			mapOutput += "<div class='row'>";

			for (var k = 0; k < board[i].length; k++) {
				if(board[i][k] == 9)
					mapOutput += '<div class="white not_available" data-king="false"  data-x="'+i+'" data-y="'+k+'" id="white_'+i+'_'+k+'"><div class="player_1_piece" onClick="game.pieceClicked(\'red_' + i +"_"+ k + '\')"  id="red_'+i+'_'+k+'"></div></div>';
				else if(board[i][k] == 8)
					mapOutput += '<div class="white not_available" data-king="false" data-x="'+i+'" data-y="'+k+'" id="white_'+i+'_'+k+'"><div class="player_2_piece" onClick="game.pieceClicked(\'blue_' + i +"_"+ k + '\')"  id="blue_'+i+'_'+k+'"></div></div>';
				else if(board[i][k] == 99)
					mapOutput += '<div class="white not_available" data-king="true" data-x="'+i+'" data-y="'+k+'" id="white_'+i+'_'+k+'"><div class="player_1_piece" onClick="game.pieceClicked(\'red_' + i +"_"+ k + '\')"  id="red_'+i+'_'+k+'">King</div></div>';
				else if(board[i][k] == 88)
					mapOutput += '<div class="white not_available" data-king="true" data-x="'+i+'" data-y="'+k+'" id="white_'+i+'_'+k+'"><div class="player_2_piece" onClick="game.pieceClicked(\'blue_' + i +"_"+ k + '\')"  id="blue_'+i+'_'+k+'">King</div></div>';
				else if(board[i][k] == 0)
					mapOutput += '<div class="white available" data-x="'+i+'" data-y="'+k+'" onclick="game.movePiece(\'white_' + i +"_"+ k + '\')" id="white_'+i+'_'+k+'"></div>';
				else if(board[i][k] == 1)
					mapOutput += "<div class='black not_available'></div>";
			}

			mapOutput += "</div>";
		}

		document.getElementById("game").innerHTML = mapOutput;
	}
	/*end of Generate Map */
	/* Show border when the piece is clicked */
	this.pieceClicked = function(element_id){
		if(!game_paused){
			if(this.player_move_start == 1 && element_id.includes("red")){
				if(document.getElementsByClassName("piece_selected")[0] != undefined)
					document.getElementsByClassName("piece_selected")[0].classList.remove("piece_selected");

				document.getElementById(element_id).classList.add("piece_selected");
			}
			else if(this.player_move_start == 2 && element_id.includes("blue") && game.game_type == "friend"){
				if(document.getElementsByClassName("piece_selected")[0] != undefined)
					document.getElementsByClassName("piece_selected")[0].classList.remove("piece_selected");

				document.getElementById(element_id).classList.add("piece_selected");
			}
		}
	}
	/* End of Show border when the piece is clicked */
	/* Move and eat the piece */
	this.movePiece = function (element_id){
		if(!game_paused){
			if(document.getElementsByClassName("piece_selected")[0] != undefined || game.game_type == "AI") {
				var move_piece_place = document.getElementById(element_id);
				// var piece_selected_x = parseInt(document.getElementsByClassName("piece_selected")[0].parentNode.getAttribute("data-x")); 
				// var piece_selected_y = parseInt(document.getElementsByClassName("piece_selected")[0].parentNode.getAttribute("data-y")); 
				var piece_selected_x = (game.game_type == "AI" && this.player_move_start == 2) ? Math.floor((Math.random() * 8) + 0) : parseInt(document.getElementsByClassName("piece_selected")[0].parentNode.getAttribute("data-x")); 
				var piece_selected_y = (game.game_type == "AI" && this.player_move_start == 2) ? Math.floor((Math.random() * 8) + 0) : parseInt(document.getElementsByClassName("piece_selected")[0].parentNode.getAttribute("data-y")); 
				var is_king = (document.getElementsByClassName("piece_selected")[0]) ? document.getElementsByClassName("piece_selected")[0].parentNode.getAttribute("data-king") == "true" : ""; 
				var piece_moved_x = move_piece_place.getAttribute("data-x"); 
				var piece_moved_y = move_piece_place.getAttribute("data-y"); 

				if(this.player_move_start == 1){
					var is_combo = false;
					/* player 1 move */
					if(piece_selected_x - parseInt(1) == piece_moved_x && piece_selected_y + parseInt(1) == piece_moved_y){
						this.board[piece_moved_x][piece_moved_y] = (is_king) ? 99 : 9;
						this.board[piece_selected_x][piece_selected_y] = 0;
						document.getElementById("ingame_player_name").innerHTML = player.second_player_name;
						this.player_move_start = 2;
					}
					else if(piece_selected_x + parseInt(1) == piece_moved_x && piece_selected_y + parseInt(1) == piece_moved_y){
						this.board[piece_moved_x][piece_moved_y] = (is_king) ? 99 : 9;
						this.board[piece_selected_x][piece_selected_y] = 0;
						document.getElementById("ingame_player_name").innerHTML = player.second_player_name;
						this.player_move_start = 2;
					}
					else if(piece_selected_x + parseInt(1) == piece_moved_x && piece_selected_y - parseInt(1) == piece_moved_y && is_king){
						this.board[piece_moved_x][piece_moved_y] = 99;
						this.board[piece_selected_x][piece_selected_y] = 0;
						document.getElementById("ingame_player_name").innerHTML = player.second_player_name;
						this.player_move_start = 2;
					}
					else if(piece_selected_x - parseInt(1) == piece_moved_x && piece_selected_y - parseInt(1) == piece_moved_y && is_king){
						this.board[piece_moved_x][piece_moved_y] = 99;
						this.board[piece_selected_x][piece_selected_y] = 0;
						document.getElementById("ingame_player_name").innerHTML = player.second_player_name;
						this.player_move_start = 2;
					}
					/* player end of 1 move */
					/* player 1 eat or combo */

					/*  move can eat forward left and right*/
					try{
						if(game.board[piece_selected_x + parseInt(1)][piece_selected_y + parseInt(1)] == 8 && game.board[piece_moved_x][piece_moved_y] == 0
						&& piece_selected_x + parseInt(2) == piece_moved_x && piece_selected_y + parseInt(2) == piece_moved_y){
							this.board[piece_selected_x + parseInt(1)][piece_selected_y + parseInt(1)] = 0;
							this.board[piece_selected_x][piece_selected_y] = 0;
							game.board[piece_moved_x][piece_moved_y] = 9;
							player.second_player_piece--;

							if(piece_moved_y == 7)
								game.board[piece_moved_x][piece_moved_y] = 99;

							try{
								if(game.board[parseInt(piece_moved_x) - parseInt(1)][parseInt(piece_moved_y) + parseInt(1)] == 8 
								&& game.board[parseInt(piece_moved_x) - parseInt(2)][parseInt(piece_moved_y) + parseInt(2)] == 0)
									is_combo = true;
							}
							catch(e){
								"success"
							}
							try{
								if(game.board[parseInt(piece_moved_x) + parseInt(1)][parseInt(piece_moved_y) + parseInt(1)] == 8 
								&& game.board[parseInt(piece_moved_x) + parseInt(2)][parseInt(piece_moved_y) + parseInt(2)] == 0)
									is_combo = true;
							}
							catch(e){
								"success"
							}

							if(is_combo == false){
								this.player_move_start = 2;
								is_combo = false;
								document.getElementById("ingame_player_name").innerHTML = player.second_player_name;
							}
						}
					}
					catch(e){
						"success"
					}
					try{
						if(game.board[piece_selected_x - parseInt(1)][piece_selected_y + parseInt(1)] == 8 && game.board[piece_moved_x][piece_moved_y] == 0
						&& piece_selected_x - parseInt(2) == piece_moved_x && piece_selected_y + parseInt(2) == piece_moved_y){
							this.board[piece_selected_x - parseInt(1)][piece_selected_y + parseInt(1)] = 0;
							this.board[piece_selected_x][piece_selected_y] = 0;
							game.board[piece_moved_x][piece_moved_y] = 9;
							player.second_player_piece--;

							if(piece_moved_y == 7)
								game.board[piece_moved_x][piece_moved_y] = 99;

							try{
								if(game.board[parseInt(piece_moved_x) - parseInt(1)][parseInt(piece_moved_y) + parseInt(1)] == 8 
								&& game.board[parseInt(piece_moved_x) - parseInt(2)][parseInt(piece_moved_y) + parseInt(2)] == 0)
									is_combo = true;
							}
							catch(e){
								"success"
							}
							try{
								if(game.board[parseInt(piece_moved_x) + parseInt(1)][parseInt(piece_moved_y) + parseInt(1)] == 8 
								&& game.board[parseInt(piece_moved_x) + parseInt(2)][parseInt(piece_moved_y) + parseInt(2)] == 0)
									is_combo = true;
							}
							catch(e){
								"success"
							}

							if(is_combo == false){
								this.player_move_start = 2;
								is_combo = false;
								document.getElementById("ingame_player_name").innerHTML = player.second_player_name;
							}
						}
					}
					catch(e){
						"success"
					}
					
					/*  end of move can eat forward left and right*/

					/* kings move can eat backward left and right*/
					try{
						if(game.board[piece_selected_x + parseInt(1)][piece_selected_y - parseInt(1)] == 8 && game.board[piece_moved_x][piece_moved_y] == 0
						&& piece_selected_x + parseInt(2) == piece_moved_x && piece_selected_y - parseInt(2) == piece_moved_y && is_king){
							this.board[piece_selected_x + parseInt(1)][piece_selected_y - parseInt(1)] = 0;
							this.board[piece_selected_x][piece_selected_y] = 0;
							game.board[piece_moved_x][piece_moved_y] = 9;
							player.second_player_piece--;
							try{
								if(game.board[parseInt(piece_moved_x) + parseInt(1)][parseInt(piece_moved_y) - parseInt(1)] == 8 
								&& game.board[parseInt(piece_moved_x) + parseInt(2)][parseInt(piece_moved_y) -parseInt(2)] == 0)
									is_combo = true;
							}
							catch(e){
								"success"
							}

							try{
								if(game.board[parseInt(piece_moved_x) - parseInt(1)][parseInt(piece_moved_y) - parseInt(1)] == 8 
								&& game.board[parseInt(piece_moved_x) - parseInt(2)][parseInt(piece_moved_y) - parseInt(2)] == 0)
									is_combo = true;
							}
							catch(e){
								"success"
							}
	

							if(is_combo == false){
								this.player_move_start = 2;
								is_combo = false;
								document.getElementById("ingame_player_name").innerHTML = player.second_player_name;
							}
						}
					}
					catch(e){
						"success"
					}

					try{
						if(game.board[piece_selected_x - parseInt(1)][piece_selected_y - parseInt(1)] == 8 && game.board[piece_moved_x][piece_moved_y] == 0
						&& piece_selected_x - parseInt(2) == piece_moved_x && piece_selected_y - parseInt(2) == piece_moved_y && is_king){
							this.board[piece_selected_x - parseInt(1)][piece_selected_y - parseInt(1)] = 0;
							this.board[piece_selected_x][piece_selected_y] = 0;
							game.board[piece_moved_x][piece_moved_y] = 9;
							player.second_player_piece--;
							
							try{
								if(game.board[parseInt(piece_moved_x) + parseInt(1)][parseInt(piece_moved_y) - parseInt(1)] == 8 
								&& game.board[parseInt(piece_moved_x) + parseInt(2)][parseInt(piece_moved_y) -parseInt(2)] == 0)
								is_combo = true;
							}
							catch(e){
								"success"
							}

							try{
								if(game.board[parseInt(piece_moved_x) - parseInt(1)][parseInt(piece_moved_y) - parseInt(1)] == 8 
								&& game.board[parseInt(piece_moved_x) - parseInt(2)][parseInt(piece_moved_y) - parseInt(2)] == 0)
								is_combo = true;
							}
							catch(e){
								"success"
							}

							if(is_combo == false){
								this.player_move_start = 2;
								is_combo = false;
								document.getElementById("ingame_player_name").innerHTML = player.second_player_name;
							}
						}
					}
					catch(e){
						console.log("here4")
					}
					/* end of kings move can eat backward left and right*/
					if(player.second_player_piece == 0){
						if(this.users >= 20){
							this.users.shift();
						}

						this.users.push({
							game_number : this.game_number,
							game_type : "Play with " + this.game_type,
							game_time_hour : (hours != undefined)  ? hours : 0,
							game_time_mins : (minutes != undefined)  ? minutes : 0,
							game_winner : player.first_player_name
						});

						this.game_number++;

						document.getElementById("player_complete").style.display = "block";
						document.getElementById("player_name_won").innerHTML = player.first_player_name;
					}

					/*end of player 1 eat or combo */
				}
				else if(this.player_move_start == 2){
					var is_combo = false;
					console.log(piece_selected_x)
					console.log(piece_selected_y)
					if(game.game_type == "AI"){
						document.getElementById("blue_"+piece_selected_x+"_"+piece_selected_y).classList.add("piece_selected");
					}

					/* player 2 move */
					if(piece_selected_x + parseInt(1) == piece_moved_x && piece_selected_y - parseInt(1) == piece_moved_y){
						this.board[piece_moved_x][piece_moved_y] = (is_king) ? 88 : 8;
						this.board[piece_selected_x][piece_selected_y] = 0;
						this.player_move_start = 1;
						document.getElementById("ingame_player_name").innerHTML = player.first_player_name;
					}
					else if(piece_selected_x - parseInt(1) == piece_moved_x && piece_selected_y - parseInt(1) == piece_moved_y){
						this.board[piece_moved_x][piece_moved_y] = (is_king) ? 88 : 8;
						this.board[piece_selected_x][piece_selected_y] = 0;
						this.player_move_start = 1;
						document.getElementById("ingame_player_name").innerHTML = player.first_player_name;
					}
					else if(piece_selected_x - parseInt(1) == piece_moved_x && piece_selected_y + parseInt(1) == piece_moved_y && is_king){
						this.board[piece_moved_x][piece_moved_y] = 88;
						this.board[piece_selected_x][piece_selected_y] = 0;
						this.player_move_start = 1;
						document.getElementById("ingame_player_name").innerHTML = player.first_player_name;
					}
					else if(piece_selected_x + parseInt(1) == piece_moved_x && piece_selected_y + parseInt(1) == piece_moved_y && is_king){
						this.board[piece_moved_x][piece_moved_y] = 88;
						this.board[piece_selected_x][piece_selected_y] = 0;
						this.player_move_start = 1;
						document.getElementById("ingame_player_name").innerHTML = player.first_player_name;
					}


					try{
						if(game.board[piece_selected_x + parseInt(1)][piece_selected_y - parseInt(1)] == 9 && game.board[piece_moved_x][piece_moved_y] == 0
						&& piece_selected_x + parseInt(2) == piece_moved_x && piece_selected_y - parseInt(2) == piece_moved_y){
							this.board[piece_selected_x + parseInt(1)][piece_selected_y - parseInt(1)] = 0;
							this.board[piece_selected_x][piece_selected_y] = 0;
							game.board[piece_moved_x][piece_moved_y] = 8;
							player.first_player_piece--;

							if(piece_moved_y == 0)
								game.board[piece_moved_x][piece_moved_y] = 88

							try{
								if(game.board[parseInt(piece_moved_x) + parseInt(1)][parseInt(piece_moved_y) - parseInt(1)] == 9 
								&& game.board[parseInt(piece_moved_x) + parseInt(2)][parseInt(piece_moved_y) -parseInt(2)] == 0)
									is_combo = true;
							}
							catch(e){
								"success"
							}

							try{
								if(game.board[parseInt(piece_moved_x) - parseInt(1)][parseInt(piece_moved_y) - parseInt(1)] == 9 
								&& game.board[parseInt(piece_moved_x) - parseInt(2)][parseInt(piece_moved_y) - parseInt(2)] == 0)
								is_combo = true;
							}
							catch(e){
								"success"
							}

							if(is_combo == false){
								this.player_move_start = 1;
								is_combo = false;
								document.getElementById("ingame_player_name").innerHTML =  player.first_player_name;
							}
						}
					}
					catch(e){
					}

					try{
						if(game.board[piece_selected_x - parseInt(1)][piece_selected_y - parseInt(1)] == 9 && game.board[piece_moved_x][piece_moved_y] == 0
						&& piece_selected_x - parseInt(2) == piece_moved_x && piece_selected_y - parseInt(2) == piece_moved_y){
							this.board[piece_selected_x - parseInt(1)][piece_selected_y - parseInt(1)] = 0;
							this.board[piece_selected_x][piece_selected_y] = 0;
							game.board[piece_moved_x][piece_moved_y] = 8;
							player.first_player_piece--;

							if(piece_moved_y == 0)
								game.board[piece_moved_x][piece_moved_y] = 88;

							try{
								if(game.board[parseInt(piece_moved_x) + parseInt(1)][parseInt(piece_moved_y) - parseInt(1)] == 9 
								&& game.board[parseInt(piece_moved_x) + parseInt(2)][parseInt(piece_moved_y) -parseInt(2)] == 0)
									is_combo = true;
							}
							catch(e){
								"success"
							}

							try{
								if(game.board[parseInt(piece_moved_x) - parseInt(1)][parseInt(piece_moved_y) - parseInt(1)] == 9 
								&& game.board[parseInt(piece_moved_x) - parseInt(2)][parseInt(piece_moved_y) - parseInt(2)] == 0)
								is_combo = true;
							}
							catch(e){
								"success"
							}

							if(is_combo == false){
								this.player_move_start = 1;
								is_combo = false;
								document.getElementById("ingame_player_name").innerHTML =  player.first_player_name;
							}
						}
					}
					catch(e){
					}

					/*   king move can eat forward left and right*/
					try{
						if(game.board[piece_selected_x + parseInt(1)][piece_selected_y + parseInt(1)] == 9 && game.board[piece_moved_x][piece_moved_y] == 0
						&& piece_selected_x + parseInt(2) == piece_moved_x && piece_selected_y + parseInt(2) == piece_moved_y && is_king){
							this.board[piece_selected_x + parseInt(1)][piece_selected_y + parseInt(1)] = 0;
							this.board[piece_selected_x][piece_selected_y] = 0;
							game.board[piece_moved_x][piece_moved_y] = 8;
							player.first_player_piece--;
							
							try{
								if(game.board[parseInt(piece_moved_x) - parseInt(1)][parseInt(piece_moved_y) + parseInt(1)] == 9 
								&& game.board[parseInt(piece_moved_x) - parseInt(2)][parseInt(piece_moved_y) + parseInt(2)] == 0)
									is_combo = true;
							}
							catch(e){
								"success"
							}

							try{
								if(game.board[parseInt(piece_moved_x) + parseInt(1)][parseInt(piece_moved_y) + parseInt(1)] == 9 
								&& game.board[parseInt(piece_moved_x) + parseInt(2)][parseInt(piece_moved_y) + parseInt(2)] == 0)
									is_combo = true;
							}
							catch(e){
								"success"
							}

							if(is_combo == false){
								this.player_move_start = 1;
								is_combo = false;
								document.getElementById("ingame_player_name").innerHTML =  player.first_player_name;
							}
						}
					}
					catch(e){
					}

					try{
						if(game.board[piece_selected_x - parseInt(1)][piece_selected_y + parseInt(1)] == 9 && game.board[piece_moved_x][piece_moved_y] == 0
						&& piece_selected_x - parseInt(2) == piece_moved_x && piece_selected_y + parseInt(2) == piece_moved_y && is_king){
							this.board[piece_selected_x - parseInt(1)][piece_selected_y + parseInt(1)] = 0;
							this.board[piece_selected_x][piece_selected_y] = 0;
							game.board[piece_moved_x][piece_moved_y] = 8;
							player.first_player_piece--;

							if(is_combo == false){
								this.player_move_start = 1;
								is_combo = false;
								document.getElementById("ingame_player_name").innerHTML = player.first_player_name;
							}

							try{
								if(game.board[parseInt(piece_moved_x) - parseInt(1)][parseInt(piece_moved_y) + parseInt(1)] == 9 
								&& game.board[parseInt(piece_moved_x) - parseInt(2)][parseInt(piece_moved_y) + parseInt(2)] == 0)
									is_combo = true;
							}
							catch(e){
								"success"
							}

							try{
								if(game.board[parseInt(piece_moved_x) + parseInt(1)][parseInt(piece_moved_y) + parseInt(1)] == 9 
								&& game.board[parseInt(piece_moved_x) + parseInt(2)][parseInt(piece_moved_y) + parseInt(2)] == 0)
									is_combo = true;
							}
							catch(e){
								"success"
							}

							if(is_combo == false){
								this.player_move_start = 1;
								is_combo = false;
								document.getElementById("ingame_player_name").innerHTML =  player.first_player_name;
							}
						}
					}
					catch(e){
						"success"
					}
					/*  end of king move can eat forward left and right*/
					if(player.first_player_piece == 0){
						if(this.users >= 20){
							this.users.shift();
						}
						
						this.users.push({
							game_number : this.game_number,
							game_type : "Play with " + this.game_type,
							game_time_hour : (hours != undefined)  ? hours : 0,
							game_time_mins : (minutes != undefined)  ? minutes : 0,
							game_winner : player.second_player_name
						});

						this.game_number++;

						document.getElementById("player_complete").style.display = "block";
						document.getElementById("player_name_won").innerHTML = player.second_player_name;
					}

					/* player end of 2 move */
				}


				game.displayMap();
			}
		}
	}
	/*end of Move and eat the piece */


	/* Show the game lenght */
	this.timeLeft = function(){
		if(game_paused === false)
			seconds++;

		if(seconds == 60){
			seconds = 0;
			minutes++;
		}

		if(minutes == 60){
			minutes = 0;
			hours++;
		}
		
		document.getElementById("time_left").innerHTML = ((hours < 10) ? "0"+ hours : hours)+":"+((minutes < 10) ? "0" + minutes : minutes)+":"+((seconds < 10) ? "0" + seconds : seconds);
	}
	/*end of Show the game lenght */
	this.gameRestart = function(){
		this.player_move_start = 1;
		this.board = [
			[1,9,1,0,1,8,1,8],
			[9,1,9,1,0,1,8,1],
			[1,9,1,0,1,8,1,8],
			[9,1,9,1,0,1,8,1],
			[1,9,1,0,1,8,1,8],
			[9,1,9,1,0,1,8,1],
			[1,9,1,0,1,8,1,8],
			[9,1,9,1,0,1,8,1],
		];
		seconds = 0;
		minutes = 0;
		hours = 0;
		this.game_number = this.game_number;
		this.first_player_piece = 12;
		this.second_player_piece = 12;
	
		this.displayMap();
	}
	/* Sort the game record and create a table row it */
	this.updateGameRecord = function(){
		document.getElementById("user_show_score_body").innerHTML = "";
		sorted_user = this.users.sort(function (a, b)
		{
		    // compare hours first
		    if (a.game_time_hour < b.game_time_hour) return -1;
		    if (a.game_time_hour > b.game_time_hour) return 1;

		    // else a.hour === b.hour, so compare minutes to break the tie
		    if (a.game_time_mins < b.game_time_mins) return -1;
		    if (a.game_time_mins > b.game_time_mins) return 1;

		    // couldn't break the tie
		    return 0;
		});

		for (var i = sorted_user.length - 1; i >= 0; i--) {
			var table = document.getElementById("user_show_score_body");
			var row = table.insertRow(0);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(1);
			var cell4 = row.insertCell(1);
			cell1.innerHTML = sorted_user[i].game_number;
			cell2.innerHTML = sorted_user[i].game_winner;
			cell3.innerHTML = ((sorted_user[i].game_time_hour != 0) ? sorted_user[i].game_time_hour+" hr" : "")+" "+((sorted_user[i].game_time_mins != 0) ? sorted_user[i].game_time_mins+" mins" : " 0 min");
			cell4.innerHTML = sorted_user[i].game_type;
		}
	}
	/*end of Sort the game record and create a table row it */
	/* insert new record */
	this.updateUsers = function (){
		if(this.users >= 20){
			this.users.shift();
		}
		this.users.push({
			game_number : this.game_number,
			game_type : "Play with " + this.game_type,
			game_time_hour : (hours != undefined)  ? hours : 0,
			game_time_mins : (minutes != undefined)  ? minutes : 0,
			game_winner : "Forfited"
		});

		this.game_number++;
	}
	/* end of insert new record */
}

/* End of Game dashboard prototype*/