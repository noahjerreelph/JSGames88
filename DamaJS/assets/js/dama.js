var game;
var makeObj = function(tag,attrs = null){
			var el = document.createElement(tag)			
			for(var attr in attrs){
				el.setAttribute(attr, attrs[attr])
			}
			return el;
		}
function Dama_js(){
	var html = "",mili=0,s=0,m=0;
	this.setting = {
		game_type: '',
		continue_btn: 'disabled',
		continue: {},
		record: [],
		game_no: 0,
		timer: false,
		time: "00:00",
		move: "",
	};
	this.player = {
		name: "",
	};
	this.enemy = {
		name: "",
	};
	this.login = function(){
		html ='<div id="login">		\
					<h1>Dama Game</h1>	\
					<div>	\
						<button id="player1-btn">1 Player</button>	\
						<button id="player2-btn">2 Player</button>	\
					</div>	\
					<button id="record-btn">Game Records</button>	\
					<button '+game.setting.continue_btn+' id="continue-btn">Continue</button>	\
				</div>';
		document.getElementById('wrapper').innerHTML = html;
		document.getElementById('player1-btn').addEventListener('click', game.player1);
		document.getElementById('player2-btn').addEventListener('click', game.player2);
		document.getElementById('record-btn').addEventListener('click', game.record);
		document.getElementById('continue-btn').addEventListener('click', game.continue);
	}
	this.player1 = function(){
		html ='<div id="player1">		\
					<h1>Dama Game</h1>	\
					<div class="insertdata">	\
						<p>Play with AI</p>		\
						<input id="name" type="text" placeholder="Enter player name" />	\
						<select id="diffculty">	\
							<option value="">Diffculty Level</option>		\
							<option value="Easy">Easy</option>		\
							<option value="Medium">Medium</option>		\
							<option value="Hard">Hard</option>		\
						</select>	\
						<div>		\
							<button id="player1-start">Start</button>	\
							<button id="player1-cancel">Cancel</button>	\
						</div>		\
					</div>	\
				</div>';
		document.getElementById('wrapper').innerHTML = html;
		document.getElementById('player1-start').addEventListener('click', function(){
			var name = document.getElementById('name').value,
				dif = document.getElementById('diffculty').value;
				if(name !== "" && dif !== ""){					
					game.setting.game_type = 'AI';
					game.setting.game_no ++;
					game.player.name = name;
					game.setting.move = name;
					game.setting.timer = true;
					game.enemy.name = 'AI';
					document.getElementById('name').value = "";
					document.getElementById('diffculty').value = "";
					game.play();
				}
		});
		document.getElementById('player1-cancel').addEventListener('click', game.login);
	}
	this.player2 = function(){
		html ='<div id="player1">		\
					<h1>Dama Game</h1>	\
					<div class="insertdata">	\
						<p>Play with friend</p>		\
						<input id="name" type="text" placeholder="Enter first player name" />	\
						<input id="friend" type="text" placeholder="Enter second player name" />	\
						<div>		\
							<button id="player2-start">Start</button>	\
							<button id="player2-cancel">Cancel</button>	\
						</div>		\
					</div>	\
				</div>';
		document.getElementById('wrapper').innerHTML = html;
		document.getElementById('player2-start').addEventListener('click', function(){
			var name = document.getElementById('name').value,
				name2 = document.getElementById('friend').value;
				if(name !== "" && name2 !== ""){					
					game.setting.game_type = 'Friend';
					game.setting.game_no ++;
					game.player.name = name;
					game.setting.move = name;
					game.setting.timer = true;
					game.enemy.name = name2;
					document.getElementById('name').value = "";
					document.getElementById('friend').value = "";
					game.play();
				}
		});
		document.getElementById('player2-cancel').addEventListener('click', game.login);
	}	
	this.record = function(){
		html ='<div id="record">		\
					<h1>Dama Game Records</h1>	\
						<table>		\
							<thead>		\
								<td>Game No.</td>	\
								<td>Game Type</td>	\
								<td>Duration</td>	\
								<td>Winner</td>	\
							</thead>	\
							<tr>	\
								<td>1</td>	\
								<td>Play with Friend</td>	\
								<td>1 hr 3 min</td>	\
								<td>Forfieted</td>	\
							</tr>	\
							<tr>	\
								<td>2</td>	\
								<td>Play with AI</td>	\
								<td>3 hrs</td>	\
								<td>AI</td>	\
							</tr>	\
							<tr>	\
								<td>3</td>	\
								<td>Play with AI</td>	\
								<td>5 mins</td>	\
								<td>Jones</td>	\
							</tr>	\
						</table>	\
					<div>	\
						<button id="record-clear">Clear</button>	\
						<button id="record-close">Close</button>	\
					</div>	\
				</div>';
		document.getElementById('wrapper').innerHTML = html;
		document.getElementById('record-clear').addEventListener('click', function(){
			console.log(game.setting.record.length);
		});
		document.getElementById('record-close').addEventListener('click', game.login);
	}
	this.continue = function(){
		console.log('continue');
	}
	this.play = function(){
		html ='<div id="wrapper-game">		\
					<h1>Dama Game</h1>	\
					<div id="controls">	\
						<div id="game_no">		\
							<span>Game No.</span>	\
							<span>'+game.setting.game_no+'</span>	\
						</div>	\
						<div id="timer">		\
							<span>Time</span>	\
							<span id="time"></span>	\
						</div>	\
						<div id="player">		\
							<span>Player</span>	\
							<span>'+game.player.name+'</span>	\
						</div>	\
					</div>	\
					<button id="undo-btn">Undo</button>	\
					<button id="pause-btn">Pause</button>	\
					<button id="quit-btn">Quit</button>	\
				</div>';
		document.getElementById('wrapper').innerHTML = html;
	}
	this.timer = function(){
		if(game.setting.timer == true){
			mili ++;
			if(mili>9){
				mili = 0;
				s ++;
				if(s>59){
					s=0;
					m ++;
				}
			}
			var t = document.getElementById('time');
			t.textContent = (m?(m>9?m:"0"+m):"00")+":"+(s>9?s:"0"+s);
		}
	}
	setInterval(this.timer,100);	
}
game = new Dama_js();
game.login();