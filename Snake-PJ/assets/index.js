var player = new player();

/* Login Feature*/
	/* Start Game Feature */
		document.getElementById("start_game").onclick = function(){
			player.user_name = document.getElementById("user_name").value;
			
			// if(player.user_name != "")
				document.getElementById("login_dashboard").style.display = "none";

			return false;
		}
	/* End of Start Game Feature */
	/* High Score Feature */
		document.getElementById("show_highscore").onclick = function(){
			var sort_player_score = player.users.slice(0);
			sort_player_score.sort(function(a,b) {return a.score - b.score;}); //magic

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
			player.users = [];
			document.getElementById("user_highscore").style.display = "none";
		}
	/* End of High Score Feature */
/* End of Login Feature*/

function player(){
	this.users = [{user_name : "PJ", score : 300}, {user_name : "Noah", score : 900}, {user_name : "Jones", score : 800}];
	this.user_name;
}