var game = new game_info();
console.log(game.displayMap())

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
/*End of Login dashboard prototype*/







document.getElementById("game_dashboard").innerHTML = game.displayMap();
function game_info(){
	this.board = function (){
		var board = [];
		for (var i = 0 ; i < 8; i++){
			if(i % 2 == 0)
				board[i] = [1,0,1,0,1,0,1,0];
			else
				board[i] = [0,1,0,1,0,1,0,1]
		}

		return board;
	}
	this.displayMap = function (){
		var mapOutput = "";

		for (var i = 0; i < this.board().length; i++) {
			mapOutput += "<div class='row'>";

			for (var k = 0; k < this.board()[i].length; k++) {
            	if(this.board()[i][k] == 0)
					mapOutput += "<div class='white'></div>";
	           	else if (this.board()[i][k] == 1)
					mapOutput += "<div class='black'></div>";
	        }

			mapOutput += "</div>";
		}

		return mapOutput;
	}
}