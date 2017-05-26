var game = new game_info();
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
	document.getElementById("play_with_player_2_dashboard_cancel").onclick = function(){
		this.parentElement.parentElement.style.display = "none";
		document.getElementById("selection_dashboard").style.display = "block";
	}
	document.getElementById("show_player_history_game").onclick = function(){
		this.parentElement.parentElement.style.display = "none";
		document.getElementById("show_game_score").style.display = "block";
	}
	document.getElementById("show_game_score_cancel").onclick = function(){
		this.parentElement.style.display = "none";
		document.getElementById("selection_dashboard").style.display = "block";
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

/*End of Login dashboard prototype*/

/* Game dashboard prototype*/
	var seconds = 0;
	var minutes = 0;
	var hours = 0;

	setInterval(function(){
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
	}, 1000)


game.displayMap();
function game_info(){
	var player_move_start = 1;
	var time_paused = false;
	var time = 0;
	// this.board = function (new_board = null){
	// 	var board = [];
	// 	for (var i = 0 ; i < 8; i++){
	// 		if(i % 2 == 0)
	// 			board[i] = [1,0,1,0,1,0,1,0];
	// 		else
	// 			board[i] = [0,1,0,1,0,1,0,1]
	// 	}

	// 	return (new_board == null) ? board : new_board;
	// }

	// this.board = [
	// 	[1,0,1,0,1,0,1,0],
	// 	[0,1,0,1,0,1,0,1],
	// 	[1,0,1,0,1,0,1,0],
	// 	[0,1,0,1,0,1,0,1],
	// 	[1,0,1,0,1,0,1,0],
	// 	[0,1,0,1,0,1,0,1],
	// 	[1,0,1,0,1,0,1,0],
	// 	[0,1,0,1,0,1,0,1],
	// ]
	this.board = [
		[1,9,1,0,1,8,1,8],
		[9,1,9,1,0,1,8,1],
		[1,9,1,0,1,8,1,8],
		[9,1,9,1,0,1,8,1],
		[1,9,1,0,1,8,1,8],
		[9,1,9,1,0,1,8,1],
		[1,9,1,0,1,8,1,8],
		[9,1,9,1,0,1,8,1],
	]
	// this.board = [
	// 	[1,9,1,9,1,9,1,9],
	// 	[9,1,9,1,9,1,9,1],
	// 	[1,9,1,9,1,9,1,9],
	// 	[0,1,0,1,0,1,0,1],
	// 	[1,0,1,0,1,0,1,0],
	// 	[8,1,8,1,8,1,8,1],
	// 	[1,8,1,8,1,8,1,8],
	// 	[8,1,8,1,8,1,8,1],
	// ]

	this.displayMap = function (moved_board = null){
		var mapOutput = "";
		var board = (moved_board == null) ? this.board : moved_board;
		console.log(board)

		for (var i = 0; i < board.length; i++) {
			mapOutput += "<div class='row'>";

			for (var k = 0; k < board[i].length; k++) {
				if(board[i][k] == 9){
					// mapOutput += '<div class="white not_available"></div>';
					mapOutput += '<div class="white not_available" data-x="'+i+'" data-y="'+k+'" id="white_'+i+'_'+k+'"><div class="player_1_piece" onClick="game.pieceClicked(\'red_' + i +"_"+ k + '\')"  id="red_'+i+'_'+k+'"></div></div>';
					board[i][k] = 9;
				}
				else if(board[i][k] == 8){
					// mapOutput += '<div class="white not_available" ></div>';
					mapOutput += '<div class="white not_available" data-x="'+i+'" data-y="'+k+'" id="white_'+i+'_'+k+'"><div class="player_2_piece" onClick="game.pieceClicked(\'blue_' + i +"_"+ k + '\')"  id="blue_'+i+'_'+k+'"></div></div>';
					board[i][k] = 8;
				}
				else if(board[i][k] == 0){
					// mapOutput += '<div class="white available" onclick="game.movePiece()"></div>';
					mapOutput += '<div class="white available" data-x="'+i+'" data-y="'+k+'" onclick="game.movePiece(\'white_' + i +"_"+ k + '\')" id="white_'+i+'_'+k+'"></div>';
				}

				if (board[i][k] == 1){
					mapOutput += "<div class='black not_available'></div>";
				}
			}

			mapOutput += "</div>";
		}

		document.getElementById("game").innerHTML = mapOutput;
	}

	this.pieceClicked = function(element_id){
		if(!game_paused){
			if(document.getElementsByClassName("piece_selected")[0] != undefined)
				document.getElementsByClassName("piece_selected")[0].classList.remove("piece_selected");

			if(player_move_start == 1 && element_id.includes("red"))
				document.getElementById(element_id).classList.add("piece_selected");
			else if(player_move_start == 2 && element_id.includes("blue"))
				document.getElementById(element_id).classList.add("piece_selected");
		}
	}

	this.movePiece = function (element_id){
		// game.board[4][3] = 9
		// game.displayMap()
		if(!game_paused){
			if(document.getElementsByClassName("piece_selected")[0] != undefined){
				var move_piece_place = document.getElementById(element_id);
				var piece_selected = document.getElementsByClassName("piece_selected")[0];
				var piece_selected_x = parseInt(piece_selected.parentNode.getAttribute("data-x")); 
				var piece_selected_y = parseInt(piece_selected.parentNode.getAttribute("data-y")); 
				var piece_moved_x = move_piece_place.getAttribute("data-x"); 
				var piece_moved_y = move_piece_place.getAttribute("data-y"); 
				var can_move_right = false;
				var can_move_left = false;

				if(player_move_start == 1){
					/* check if the player 1 can move forward*/
					// console.log(piece_selected_x)
					// console.log(piece_selected_y)
					// console.log(this.board[piece_selected_x - parseInt(1)][piece_selected_y + parseInt(1)])
					// console.log(this.board[piece_selected_x + parseInt(1)][piece_selected_y + parseInt(1)])
					this.board[piece_selected_x][piece_selected_y] = 0;
					console.log(piece_moved_x)
					console.log(piece_moved_y)
					if(this.board[piece_moved_x][piece_moved_y] == 0){
						this.board[piece_moved_x][piece_moved_y] = 9

					}
					else if(this.board[piece_moved_x][piece_moved_y] == 0){
						this.board[piece_moved_x][piece_moved_y] = 9
					}
						
					game.displayMap();
					
					// can_move_left  = piece_selected_x + parseInt(1) == piece_moved_x && piece_selected_y + parseInt(1) == piece_moved_y;
					// can_move_right = piece_selected_x - parseInt(1) == piece_moved_x && piece_selected_y + parseInt(1) == piece_moved_y;
					// /* end of check if the player 1 can move forward*/
					// /* check if the player 1 can eat the other and place in the back*/
					// can_eat_right = document.getElementById("blue_"+ (piece_selected_x - parseInt(1)) + "_" + (piece_selected_y + parseInt(1)));
					// can_eat_left  = document.getElementById("blue_"+ (piece_selected_x + parseInt(1)) + "_" + (piece_selected_y + parseInt(1))) ;
					// /* end of check if the player 1 can eat the other and place in the back*/
					// /* check if the player 1 can move in the back of removed piece*/
					// can_move_right_2 = piece_selected_x - parseInt(2) == piece_moved_x && piece_selected_y + parseInt(2) == piece_moved_y;
					// can_move_left_2  = piece_selected_x + parseInt(2) == piece_moved_x && piece_selected_y + parseInt(2) == piece_moved_y;
					// /* end of check if the player 1 can move in the back of removed piece*/
					// /* check if the player 2 have the place to eat him*/
					// can_eat_right_2 = document.getElementById("blue_"+ (piece_selected_x - parseInt(2)) + "_" + (piece_selected_y + parseInt(2)));
					// can_eat_left_2  = document.getElementById("blue_"+ (piece_selected_x + parseInt(2)) + "_" + (piece_selected_y + parseInt(2))) ;
					// /* end of check if the player 2 have the place to eat him*/

					// /* check if the checkings is all true and remove the blue piece*/
					// if(can_move_right_2 && can_eat_right != undefined && can_eat_right_2 == undefined){
					// 	can_move_right = piece_selected_x - parseInt(2) == piece_moved_x && piece_selected_y + parseInt(2) == piece_moved_y;
					// 	can_eat_right.parentNode.setAttribute("onclick", "game.movePiece('white_"+can_eat_right.parentNode.getAttribute("data-x")+"_"+can_eat_right.parentNode.getAttribute("data-y")+"')")
					// 	can_eat_right.parentNode.setAttribute("id", "white_"+can_eat_right.parentNode.getAttribute("data-x")+"_"+can_eat_right.parentNode.getAttribute("data-y"))
					// 	can_eat_right.remove();
					// }
					// else if(can_move_left_2 && can_eat_left != undefined && can_eat_left_2 == undefined){
					// 	can_move_left  = piece_selected_x + parseInt(2) == piece_moved_x && piece_selected_y + parseInt(2) == piece_moved_y;
					// 	can_eat_left.parentNode.setAttribute("onclick", "game.movePiece('white_"+can_eat_left.parentNode.getAttribute("data-x")+"_"+can_eat_left.parentNode.getAttribute("data-y")+"')")
					// 	can_eat_left.parentNode.setAttribute("id", "white_"+can_eat_left.parentNode.getAttribute("data-x")+"_"+can_eat_left.parentNode.getAttribute("data-y"))
					// 	can_eat_left.remove();
					// }

					/*end check if the checkings is all true and remove the blue piece*/
					// console.log(this.board[])
				}
				else if(player_move_start == 2){
					/* check if the player 2 can move forward*/
					can_move_right = piece_selected_x + parseInt(1) == piece_moved_x && piece_selected_y - parseInt(1) == piece_moved_y;
					can_move_left  = piece_selected_x - parseInt(1) == piece_moved_x && piece_selected_y - parseInt(1) == piece_moved_y;
					/* end of check if the player 2 can move forward*/
					/* check if the player 2 can eat the other and place in the back*/
					can_eat_right = document.getElementById("red_"+ (piece_selected_x + parseInt(1)) + "_" + (piece_selected_y - parseInt(1)));
					can_eat_left  = document.getElementById("red_"+ (piece_selected_x - parseInt(1)) + "_" + (piece_selected_y - parseInt(1))) ;
					/* end of check if the player 2 can eat the other and place in the back*/
					/* check if the player 2 can move in the back of removed piece*/
					can_move_right_2 = piece_selected_x + parseInt(2) == piece_moved_x && piece_selected_y - parseInt(2) == piece_moved_y;
					can_move_left_2  = piece_selected_x - parseInt(2) == piece_moved_x && piece_selected_y - parseInt(2) == piece_moved_y;
					/* end of check if the player 2 can move in the back of removed piece*/
					/* check if the player 1 have the place to eat him*/
					can_eat_right_2 = document.getElementById("red_"+ (piece_selected_x +parseInt(2)) + "_" + (piece_selected_y - parseInt(2)));
					can_eat_left_2  = document.getElementById("red_"+ (piece_selected_x - parseInt(2)) + "_" + (piece_selected_y - parseInt(2))) ;
					/* end of check if the player 1 have the place to eat him*/

					/* check if the checkings is all true and remove the red piece*/
					if(can_move_right_2 && can_eat_right != undefined && can_eat_right_2 == undefined){
						can_move_right = piece_selected_x + parseInt(2) == piece_moved_x && piece_selected_y - parseInt(2) == piece_moved_y;
						can_eat_right.parentNode.setAttribute("onclick", "game.movePiece('white_"+can_eat_right.parentNode.getAttribute("data-x")+"_"+can_eat_right.parentNode.getAttribute("data-y")+"')")
						can_eat_right.parentNode.setAttribute("id", "white_"+can_eat_right.parentNode.getAttribute("data-x")+"_"+can_eat_right.parentNode.getAttribute("data-y"))
						can_eat_right.remove();
					}
					else if(can_move_left_2 && can_eat_left != undefined && can_eat_left_2 == undefined){
						can_move_left  = piece_selected_x - parseInt(2) == piece_moved_x && piece_selected_y - parseInt(2) == piece_moved_y;
						can_eat_left.parentNode.setAttribute("onclick", "game.movePiece('white_"+can_eat_left.parentNode.getAttribute("data-x")+"_"+can_eat_left.parentNode.getAttribute("data-y")+"')")
						can_eat_left.parentNode.setAttribute("id", "white_"+can_eat_left.parentNode.getAttribute("data-x")+"_"+can_eat_left.parentNode.getAttribute("data-y"))
						can_eat_left.remove();
					}
					/*end check if the checkings is all true and remove the red piece*/
				}

				// var piece_selected_id = document.getElementById(piece_selected.id).id
				// var element_color = (piece_selected_id.includes("blue")) ? "blue" : "red";

				// if(can_move_right || can_move_left){
				// 	/* insert the new place */
				// 	var newDiv = document.createElement('div');
				// 	newDiv.setAttribute("id", element_id.replace("white", element_color));
				// 	newDiv.setAttribute("class", piece_selected.classList[0]);
				// 	newDiv.setAttribute("onclick", "game.pieceClicked('"+element_id.replace("white", element_color)+"')");
				// 	move_piece_place.appendChild(newDiv, move_piece_place); 
				// 	move_piece_place.classList.remove("available");
				// 	move_piece_place.classList.add("not_available");
				// 	move_piece_place.removeAttribute("onclick");

				// 	/* remove the last place and insert new data */ 
				// 	document.getElementById(piece_selected_id).parentNode.setAttribute("onclick", "game.movePiece('"+(document.getElementById(piece_selected.id).id.replace("red", "white").replace("blue", "white"))+"')");
				// 	document.getElementById(piece_selected_id).parentNode.setAttribute("id", document.getElementById(piece_selected.id).id.replace("red", "white").replace("blue", "white"));
				// 	document.getElementById(piece_selected_id).parentNode.classList.remove("not_available");
				// 	document.getElementById(piece_selected_id).parentNode.classList.add("available");


				// 	if(player_move_start == 1){
				// 		var new_position_of_piece_x = move_piece_place.getAttribute("data-x")
				// 		var new_position_of_piece_y = move_piece_place.getAttribute("data-y")

				// 		// console.log(parseInt(new_position_of_piece_x) - parseInt(2))
				// 		// console.log(parseInt(new_position_of_piece_y) + parseInt(2))
				// 		// console.log("=============================================")
				// 		// console.log(parseInt(new_position_of_piece_x) + parseInt(2))
				// 		// console.log(parseInt(new_position_of_piece_y) + parseInt(2))

				// 		// combo_eat_right  = document.getElementById("blue_"+ (parseInt(new_position_of_piece_x) - parseInt(1)) + "_" + (parseInt(new_position_of_piece_y) + parseInt(1)));
				// 		// combo_eat_left   = document.getElementById("blue_"+ (parseInt(new_position_of_piece_x) + parseInt(1)) + "_" + (parseInt(new_position_of_piece_y) + parseInt(1)));
				// 		// console.log(combo_eat_right)
				// 		// console.log(combo_eat_left)

				// 		// if(combo_eat_1)

				// 		/* check if there's can be eaten again*/
				// 		/* check if there's can be eaten again*/
				// 	}





				// 	document.getElementById(piece_selected_id).remove();

				// 	// if(piece_moved_y == 7){
				// 	// 	console.log(piece_moved_x)
				// 	// 	console.log(piece_moved_y)
				// 	// 	document.getElementById("red_"+piece_moved_x+"_"+piece_moved_y).setAttribute("is_king", "true")
				// 	// 	document.getElementById("red_"+piece_moved_x+"_"+piece_moved_y).innerHTML = "<p>King</p>";
				// 	// }

				// 	if(can_move_right || can_move_left){
				// 		if(player_move_start == 1)
				// 			player_move_start = 2;
				// 		else if(player_move_start == 2)
				// 			player_move_start = 1;
				// 	}
				// }
			}
		}
	}
}




/* End of Game dashboard prototype*/