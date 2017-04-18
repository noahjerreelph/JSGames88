var val = "", players = [], html = '', game, player;
	document.getElementById('play').addEventListener('click', function(){
		val = this.value;
	});
	document.getElementById("submit_name").addEventListener("submit", function(evt){
		evt.preventDefault();
		if(val == "Play Game"){
			var new_player = {
								name: document.getElementById("player_name").value,
								score: 0,
								snake_length: 5,
								size: 10
							};
			document.getElementById("player_name").value = "";
			players.push(new_player);
			game = new SnakeJS();
			player = new PlayerSnake();
			document.getElementById('wrapper-login').setAttribute('class','hidden');
			document.getElementById('wrapper-game').removeAttribute('class');
			document.getElementsByTagName('header')[0].removeAttribute('class');
			val = "";
		}else{
			document.getElementById('wrapper-login').setAttribute('class','hidden');
			document.getElementById('highscore').removeAttribute('class');
			html = '<thead>	\
						<td>Name</td>	\
						<td>Score</td>	\
					</thead>';
			if(players.length !== 0){
				for(var i=0;i<players.length;i++){
					html += '<tr>	\
								<td>'+(players[i].name == "" ? "Unnamed" : players[i].name)+'</td>	\
								<td>'+players[i].score+'</td>	\
							</tr>';
				}
			}			
			document.querySelector('#highscore table').innerHTML = html;
		}
	});
	document.getElementById("clear_score").addEventListener('click', function(){
		players = [];
		html = '<thead>	\
					<td>Name</td>	\
					<td>Score</td>	\
				</thead>';
		document.querySelector('#highscore table').innerHTML = html;
	});
	document.getElementById("close").addEventListener('click', function(){
		document.getElementById('highscore').setAttribute('class','hidden');
		document.getElementById('wrapper-login').removeAttribute('class');
	});
	document.getElementById("btn-pause").addEventListener('click', function(){
		var btn_val = this.innerText;
		if(btn_val == 'Pause'){
			this.innerText = 'Resume'
			game.pause();				
		}else{
			this.innerText = 'Pause';
			game.resume();				
		}
	});
	document.getElementById("btn-restart").addEventListener('click', function(){
		document.getElementById("btn-pause").disabled = true;
		document.getElementById("btn-restart").disabled = true;
		document.getElementById("btn-quit").disabled = true;
		html = '<div id="restart"> \
					<h3>Restart Game</h3>	\
					<p>Are you sure you want to restart game?</p>	\
					<div>	\
						<a id="restart-yes" href="#">Yes</a>	\
						<a id="restart-no" href="#" onclick="no_btn(restart)">No</a>	\
					</div>	\
				</div>';
		document.getElementById('wrapper-game').innerHTML += html;
		document.getElementById("restart-yes").addEventListener('click', function(){
			game.restart();
		});
	});
	document.getElementById("btn-quit").addEventListener('click', function(){
		document.getElementById("btn-pause").disabled = true;
		document.getElementById("btn-restart").disabled = true;
		document.getElementById("btn-quit").disabled = true;
		html = '<div id="quit"> \
					<h3>Quit Game</h3>	\
					<p>Are you sure you want to quit game?</p>	\
					<div>	\
						<a id="quit-yes" href="#">Yes</a>	\
						<a id="quit-no" href="#" onclick="no_btn(quit)">No</a>	\
					</div>	\
				</div>';
		document.getElementById('wrapper-game').innerHTML += html;
		document.getElementById("quit-yes").addEventListener('click', function(){
			game.quit();
		});
	});
	function no_btn(btn){
		document.getElementById('wrapper-game').removeChild(btn);	
		document.getElementById("btn-pause").disabled = false;
		document.getElementById("btn-restart").disabled = false;
		document.getElementById("btn-quit").disabled = false;
	}

	function PlayerSnake(){
		this.player = players[players.length-1]
		this.display_player = function(){
			console.log(this.player)
		}
		this.display_player();
	}

	function SnakeJS(){
		this.quit = function(){
			no_btn(quit);
			document.getElementById('wrapper-login').removeAttribute('class');
			document.getElementById('wrapper-game').setAttribute('class','hidden');
			document.getElementsByTagName('header')[0].setAttribute('class','hidden');
		}
		this.pause = function(){
			document.getElementById("btn-restart").disabled = true;
			document.getElementById("btn-quit").disabled = true;
			html = '<div id="pause"> \
						<h1>Game Paused</h1>	\
					</div>';
			document.getElementById('wrapper-game').innerHTML += html;
		}
		this.resume = function(){
			var el = document.getElementById('pause');
			document.getElementById('wrapper-game').removeChild(el);
			document.getElementById("btn-restart").disabled = false;
			document.getElementById("btn-quit").disabled = false;
		}
		this.restart = function(){
			alert('');				
		}		
	}