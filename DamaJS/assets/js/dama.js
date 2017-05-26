var game, save, game_no;
var makeObj = function(tag,attrs = null){
			var el = document.createElement(tag)			
			for(var attr in attrs){
				el.setAttribute(attr, attrs[attr])
			}
			return el;
		}
function Dama_js(){
	var html = "",mili=0,s=0,m=0;
	var board = [[4,2,4,2,4,2,4,2],
				[2,4,2,4,2,4,2,4],
				[4,2,4,2,4,2,4,2],
				[2,3,2,3,2,3,2,3],
				[3,2,3,2,3,2,3,2],
				[2,1,2,1,2,1,2,1],
				[1,2,1,2,1,2,1,2],
				[2,1,2,1,2,1,2,1]];
	this.setting = {
		game_type: '',
		continue_btn: 'disabled',
		continue: {},
		record: [],
		game_no: game_no,
		timer: false,
		time: "00:00",
		move: "",
		undo: [],
		difficulty: "",
	};	
	this.generateBoard = function(){
		html = "", x = 0;
		for(var i=0;i<board.length;i++){
			for(var j=0;j<board[i].length;j++){
				if(board[i][j] == 1){
					html = makeObj('div',{class: 'player-piece',
											pos: x,
											style: 'top: '+i*60+'px;	\
													left: '+j*60+'px;'})					
				}if(board[i][j] == 2){
					html = makeObj('div',{class: 'black',
											pos: x,
											style: 'top: '+i*60+'px;	\
													left: '+j*60+'px;'})
				}if(board[i][j] == 3){
					html = makeObj('div',{class: 'white',
											pos: x,
											style: 'top: '+i*60+'px;	\
													left: '+j*60+'px;'})
				}if(board[i][j] == 4){
					html = makeObj('div',{class: 'enemy-piece',
											pos: x,
											style: 'top: '+i*60+'px;	\
													left: '+j*60+'px;'})			
				}
				document.getElementById('board').appendChild(html);
				x ++;
			}			
		}
	}
	this.player = {
		name: "",
		piece: document.getElementsByClassName('player-piece'),
		selected: '',
		move: [],
		remove: '',
	};
	this.enemy = {
		name: "",
		piece: document.getElementsByClassName('enemy-piece'),
		selected: [],
		move: [],
		remove: '',
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
						<select id="difficulty">	\
							<option value="">difficulty Level</option>		\
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
				dif = document.getElementById('difficulty').value;
				game.setting.difficulty = dif;
				if(name !== "" && dif !== ""){
					game.player.name = name;
					game.setting.move = game.player.name;		
					game.setting.game_type = 'AI';
					game.enemy.name = 'AI';
					document.getElementById('name').value = "";
					document.getElementById('difficulty').value = "";
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
					game.player.name = name;
					game.setting.move = game.player.name;				
					game.setting.game_type = 'Friend';
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
		game.setting = save;
		game.setting.timer = true;
		game.play();
	}
	this.play = function(){
		game_no ++;
		game.setting.timer = true;
		html ='<div id="wrapper-game">		\
					<h1>Dama Game</h1>	\
					<div id="controls">	\
						<div id="game_no">		\
							<h3>Game No.</h3>	\
							<h2>'+game.setting.game_no+'</h2>	\
						</div>	\
						<div id="timer">		\
							<span>Time</span>	\
							<span id="time"></span>	\
						</div>	\
						<div id="player">		\
							<span>Player</span>	\
							<span id="player-name">'+game.player.name+'</span>	\
						</div>	\
						<button id="undo-btn">Undo</button>	\
						<button id="pause-btn">Pause</button>	\
						<button id="quit-btn">Quit</button>	\
					</div>	\
					<div id="board"></div>		\
				</div>';
		document.getElementById('wrapper').innerHTML = html;
		game.generateBoard();
		document.getElementById('undo-btn').addEventListener('click', game.undo)
		document.getElementById('pause-btn').addEventListener('click',function(){
			var text = this.textContent;
			if(text == 'Pause'){
				document.getElementById('undo-btn').setAttribute('disabled','');
				document.getElementById('quit-btn').setAttribute('disabled','');
				this.textContent = 'Resume'
				game.pause();
			}else{
				var el = document.getElementById('pause');
				el.parentNode.removeChild(el);
				document.getElementById('undo-btn').removeAttribute('disabled');
				document.getElementById('quit-btn').removeAttribute('disabled');
				this.textContent = 'Pause'
				game.resume();
			}
		})
		document.getElementById('quit-btn').addEventListener('click', game.quit)
		game.player1Move();
	}	
	this.undo = function(){
		console.log('undo')
	}
	this.pause = function(){
		this.setting.timer = false;
		html ='<div id="pause">		\
					<h1>Paused</h1>		\
				</div>';
		document.getElementById('board').innerHTML += html;
	}
	this.resume = function(){
		this.setting.timer = true;		
		if(this.setting.move == this.player.name){
			this.player1Move()
		}else{
			this.player2Move()			
		}
	}
	this.quit = function(){
		document.getElementById('undo-btn').setAttribute('disabled','');
		document.getElementById('pause-btn').setAttribute('disabled','');
		document.getElementById('quit-btn').setAttribute('disabled','');
		game.setting.timer = false;
		if(game.setting.game_type == 'AI'){
			html ='<div id="quit">		\
						<h3>Do you want to save the game?</h3>	\
						<div>	\
							<button id="quit-yes">Yes</button>	\
							<button id="quit-restart">Restart</button>	\
							<button id="quit-quit">Quit</button>	\
						</div>	\
					</div>';
			document.getElementById('board').innerHTML += html;
			document.getElementById('quit-yes').addEventListener('click', function(){
				game.setting.continue_btn = ''
				save = game.setting;
				game.login();
			})
			document.getElementById('quit-restart').addEventListener('click', function(){
				
			})
		}else{
			html ='<div id="quit">		\
						<h3>Are you sure you want to quit the game?</h3>	\
						<div>	\
							<button id="quit-quit">Yes</button>	\
							<button id="quit-no">No</button>	\
						</div>	\
					</div>';
			document.getElementById('wrapper-game').innerHTML += html;
			document.getElementById('quit-no').addEventListener('click', function(){
				document.getElementById('undo-btn').removeAttribute('disabled');
				document.getElementById('pause-btn').removeAttribute('disabled');
				document.getElementById('quit-btn').removeAttribute('disabled');
				var el = document.getElementById('quit');
				el.parentNode.removeChild(el)
				game.setting.timer = true;
			})
		}
		document.getElementById('quit-quit').addEventListener('click', function(){
			mili=0,s=0,m=0;
			game.login()
		})
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
	this.player1Move = function(){
		if(this.setting.timer == true && this.setting.move == this.player.name){
			document.getElementById('board').addEventListener('click',function(e){
				if(e.target.className == 'player-piece'){
					game.player.selected = e.target;
					game.remove_mark();
				}else if(game.player.selected.className == e.target.className){
					game.player.selected = e.target;
					game.remove_mark();
				}else if(e.target.className == 'white'){
					game.setting.undo.push({piece: game.player.selected, move: e.target});
					for(var i in game.player.move){
						if(e.target == game.player.move[i]){
							if(e.target.id == 'eat'){
								game.player.remove.className = 'white'
							}
							e.target.className = 'player-piece';
							game.makeDama(e.target)
							game.player.selected.className = 'white';
							game.setting.move = game.enemy.name
							if(game.setting.game_type == 'Friend'){
								game.player2Move();								
							}else{
								game.AiSelectPiece();
							}
							document.getElementById('player-name').textContent = game.enemy.name
						}
					}
				}
				if(game.player.selected.className !== 'dama'){
					var pos = parseInt(game.player.selected.getAttribute('pos'))-8;
					game.player.move = {previousSibling: e.target.parentNode.children[pos].previousSibling,
										nextSibling: e.target.parentNode.children[pos].nextSibling};
					game.posible_move(game.player.move,game.player.name);
				}
			});
		}
	}
	this.player2Move = function(){
		if(this.setting.game_type == 'Friend' && this.setting.timer == true && this.setting.move == this.enemy.name){
			document.getElementById('board').addEventListener('click',function(e){
				if(e.target.className == 'enemy-piece'){
					game.enemy.selected = e.target;
					game.remove_mark();
				}else if(game.enemy.selected.className == e.target.className){
					game.enemy.selected = e.target;
					game.remove_mark();
				}else if(e.target.className == 'white'){
					game.setting.undo.push({piece: game.enemy.selected, move: e.target});
					for(var i in game.enemy.move){
						if(e.target == game.enemy.move[i]){
							if(e.target.id == 'eat'){
								game.enemy.remove.className = 'white'
							}
							e.target.className = 'enemy-piece';
							game.makeDama(e.target)
							game.enemy.selected.className = 'white';
							game.setting.move = game.player.name;
							document.getElementById('player-name').textContent = game.player.name
							game.player1Move();
						}
					}
				}
				if(game.enemy.selected.className !== 'dama'){
					var pos = parseInt(game.enemy.selected.getAttribute('pos'))+8;
					game.enemy.move = {previousSibling: e.target.parentNode.children[pos].previousSibling,
										nextSibling: e.target.parentNode.children[pos].nextSibling};
					game.posible_move(game.enemy.move,game.enemy.name);
				}
			});
		}
	}
	this.AiSelectPiece = function(){
		if(this.setting.timer == true){
			var el = document.getElementsByClassName('enemy-piece');
			var temp_select = [], temp_move = [];
			this.enemy.selected = [], this.enemy.move = [];
			// find AI piece that can move forward
			for(var i=0;i<el.length;i++){
				var move = el[i].parentNode.children[parseInt(el[i].getAttribute('pos'))+8],
					next = move.nextSibling.className, prev = move.previousSibling.className;
				if(next !== undefined || prev !== undefined && (next == 'white' || prev == 'white' || next == 'player-piece' || prev == 'player-piece' || next == 'player-piece dama' || prev == 'player-piece dama')){
					this.enemy.selected.push(el[i])
					this.enemy.move.push({nextSibling: move.nextSibling, previousSibling: move.previousSibling})
				}
			}
			// eat player piece if it is near
			this.posible_move(this.enemy.move,this.enemy.name);
			// selected will move forward if no pieces can eat
			this.enemy.move.reverse();
			this.enemy.selected.reverse();
			this.AIMoveForward(this.enemy.move)
		}
	}
	this.AIMoveForward = function(pieces){
		if(this.setting.timer == true && this.setting.move == this.enemy.name){
			var moved = false;
			for(var i=0;i<pieces.length;i++){
				for(var move in pieces[i]){
					var pos = parseInt(pieces[i][move].getAttribute('pos'))+8;
					if(pieces[i][move].parentNode.children[pos][move] !== undefined && pieces[i][move].parentNode.children[pos][move].className == 'white' && moved == false){
						console.log(pieces[i][move])
						console.log(this.enemy.selected)
						moved = true;
						pieces[i][move].className = 'enemy-piece'
						this.makeDama(pieces[i][move])
						this.enemy.selected[i].className = 'white';
						this.setting.move = this.player.name;
						document.getElementById('player-name').textContent = this.player.name;					
						this.player1Move();
						break;
					}
				}
			}
		}
	}
	this.makeDama = function(piece){
		if(this.setting.move == this.player.name){
			if(piece.style.top == '0px'){
				piece.className = 'player-piece dama'
			}
		}else if(this.setting.move == this.enemy.name){
			if(piece.style.top == '420px'){
				piece.className = 'enemy-piece dama'
			}
		}
	}
	this.remove_mark = function(){
		//this will remove the eat id mark
		var el = document.getElementsByClassName('white')
		for(var i=0;i<el.length;i++){
			el[i].id = '';
		}
	}
	this.posible_move = function(pieces,move = null){
		var temp = '';		
		for(var i in pieces){
			if(move == this.player.name){
				if(pieces[i].className == 'enemy-piece' || pieces[i].className == 'enemy-piece dama'){
					temp = pieces[i];
					this.player.move[i] = pieces[i].parentNode.children[parseInt(pieces[i].getAttribute('pos'))-8][i];
					if(this.player.move[i].className == 'white'){
						this.player.move[i].id = 'eat'
						this.player.remove = temp;
					}
				}
			}
			if(this.setting.game_type == 'Friend' && move == this.enemy.name){
				if(pieces[i].className == 'player-piece' || pieces[i].className == 'player-piece dama'){
					temp = pieces[i];
					this.enemy.move[i] = pieces[i].parentNode.children[parseInt(pieces[i].getAttribute('pos'))+8][i];
					if(this.enemy.move[i].className == 'white'){
						this.enemy.move[i].id = 'eat'
						this.enemy.remove = temp;
					}
				}
			}
			// posible move for AI here will eat nearest player pieces
			else if(this.setting.game_type == 'AI' && move == this.enemy.name){
				for(var index in pieces[i]){		
					if(pieces[i][index].className == 'player-piece' || pieces[i][index].className == 'player-piece dama'){
						temp = pieces[i][index];
						this.enemy.move[i][index] = pieces[i][index].parentNode.children[parseInt(pieces[i][index].getAttribute('pos'))+8][index];
						if(this.enemy.move[i][index].className == 'white'){
							this.enemy.move[i][index].className = 'enemy-piece'
							temp.className = 'white'
							this.enemy.selected[i].className = 'white'
							document.getElementById('player-name').textContent = game.player.name;
							game.setting.move = game.player.name;
							this.player1Move();
							break;
						}
					}
				}
			}		
		}	
	}
	setInterval(this.timer,100);
}
game = new Dama_js();
game.player1();

