var val = "", players = [], html = '', game,new_player;
	document.getElementById('play').addEventListener('click', function(){
		val = this.value;
	});
	document.getElementById("submit_name").addEventListener("submit", function(evt){
		evt.preventDefault();
		if(val == "Play Game"){
			new_player = {
								name: (document.getElementById("player_name").value === "" ? "Unnamed" : document.getElementById("player_name").value),
								score: 0
							};
			document.getElementById("player_name").value = "";
			players.push(new_player);
			game = new GameBoard(new_player);
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
	function random_color(){
		var rgb = ['a','b','c','d','e','f','0','1','2','3','4','5','6','7','8','9'];
		color = '#'  //this is what we'll return!
		for(var i = 0; i < 6; i++) 
		{
			x = Math.floor((Math.random()*16))
			color += rgb[x];
		}
		return color;
	}
	function PlayerSnake(x,y,id){
		this.info = {	x: x,
						y: y,
						id: id,
						color: random_color(),
						score: 0,
						enemy_killed: 0,
						shield_ups: 0,
						speed_ups: 0,
						freeze_ups: 0,
						body: [0,1,2,3,4]
			};
		this.direction = null;
		this.val = 10;
		this.temp = {};
		var makeSnake = function(tag,attrs){
			var el = document.createElement(tag)			
			for(var attr in attrs){
				el.setAttribute(attr, attrs[attr])
			}
			return el;
		}
		this.initialize = function(){
			var x = 0;
			for(var i in this.info.body){
				if(i == 0){
					this.info.body[i] = makeSnake('div',
									{
										id: this.info.id,
										class: 'player snake',
										style: "top: "+this.info.y+"px;	\
												left: "+this.info.x+"px;	\
												background-color: "+this.info.color+";	\
												width: 10px;	\
												height: 10px;	\
												position: absolute;	\
												border-radius: 5px;"
									});
					document.getElementById('wrapper-game').appendChild(this.info.body[i]);
				}else{
					this.info.body[i] = makeSnake('div',
									{
										id: this.info.id+'-'+this.info.body[i],
										class: 'player snake',
										style: "top: "+this.info.y+"px;	\
												left: "+(this.info.x-x)+"px;	\
												background-color: "+this.info.color+";	\
												width: 10px;	\
												height: 10px;	\
												position: absolute;	\
												border-radius: 5px;"
									});
					document.getElementById('wrapper-game').appendChild(this.info.body[i]);
				}
					x += 10;
			}
			var el = document.getElementById(this.info.id).attributes;
		}
		this.moveSnake = function(){
			var head = {},body = [];
			for(var i in this.info.body){
				if(this.direction == null){
					this.temp = {x: parseInt(this.info.body[i].style.left),
								y: parseInt(this.info.body[i].style.top)};
					this.info.body[i].style.left = this.temp.x+this.val+'px';
					game.collisions({x: parseInt(this.info.body[0].style.left)+this.val,
								y: parseInt(this.info.body[0].style.top)},'player');
				}else{
					if(this.direction == 'left'){
						if(i == 0){
							this.temp = {x: parseInt(this.info.body[i].style.left),
										y: parseInt(this.info.body[i].style.top)};
							this.info.body[i].style.left = this.temp.x+this.val+'px';
							head = {x: this.temp.x+this.val, y: this.temp.y};
						}else{
							temp = {x: parseInt(this.info.body[i].style.left),
									y: parseInt(this.info.body[i].style.top)};
							this.info.body[i].style.left = this.temp.x+'px';
							this.info.body[i].style.top = this.temp.y+'px';
							body.push(this.temp)
							this.temp = temp;
						}
					}else{
						if(i == 0){
							this.temp = {x: parseInt(this.info.body[i].style.left),
										y: parseInt(this.info.body[i].style.top)};
							this.info.body[i].style.top = this.temp.y+this.val+'px';
							head = {x: this.temp.x, y: this.temp.y+this.val};
						}else{
							temp = {x: parseInt(this.info.body[i].style.left),
										y: parseInt(this.info.body[i].style.top)};
							this.info.body[i].style.top = this.temp.y+'px';
							this.info.body[i].style.left = this.temp.x+'px';
							body.push(this.temp)
							this.temp = temp;
						}
					}
				}
			}
			game.collisions(head,'player',body);
		}
		this.initialize();
	}

	function GameBoard(player){
		var snakes = [];
		this.player = player
		this.settings = {
			enemy_count: 10,
			enemy_to_kill: 10,
			movement_speed: 100,
			stage: 1
		}
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

			game = new GameBoard(new_player);	
		}				
		this.keyControl = function(directions){
			var val = snakes[0].val;
			switch(directions) {
			    case "ArrowDown":
					(snakes[0].direction == 'top' ? snakes[0].val = val : snakes[0].val = 10);
					snakes[0].direction = 'top'
		        break;
			    case "ArrowRight":
					(snakes[0].direction == 'left' ? snakes[0].val = val : snakes[0].val = 10);			    
					snakes[0].direction = 'left'
			    break;
			    case "ArrowUp":
					(snakes[0].direction == 'top' ? snakes[0].val = val : snakes[0].val = -10);
					snakes[0].direction = 'top'
			    break;
		        case "ArrowLeft":
					(snakes[0].direction == 'left' ? snakes[0].val = val : snakes[0].val = -10);
					snakes[0].direction = 'left'
		        break;
			}
		}
		this.createrPlayerSnake = function(x,y,length,name){
			var new_snake = new PlayerSnake(x,y,length,name);
			snakes.push(new_snake);
		}
		this.loop = function(){
			for(var snake in snakes){
				snakes[snake].moveSnake();
			}
		}
		this.collisions = function(head,type,body = []){
			var wall = document.getElementById('wrapper-game'),
				enemy_snake = {}
				enemy = document.getElementsByClassName('enemy');	// get all snake
			if(type == 'player' ){
				// if player snake hit the wall
				if(head.x > (wall.clientWidth - 10) || head.x < 0){
					clearInterval(this.interval);
				}if(head.y > (wall.clientHeight - 10)|| head.y < 0){
					clearInterval(this.interval);
				}
				// if player snake hit its self
				for(var i in body){
					if(body[i].x == head.x && body[i].y == head.y){
						clearInterval(this.interval);
					}
				}
				// if player snake hit enemy snake
				for(var i=0;i<enemy.length;i++){
					var e = {x: parseInt(enemy[i].style.left),
							y: parseInt(enemy[i].style.top)}
					if(e.x == head.x && e.y == head.y){
						clearInterval(this.interval);
					}
				}
			}else{

			}
		}
		this.reverse = function(){			
			// reverse_ups
		}
		this.createrEnemySnake = function(count){
			var rand_x = function(){
				return (Math.floor(Math.random()*10)* 100)+200;
			}
			var rand_y = function(){
				return (Math.floor(Math.random()*5)* 10)*15;
			}
			for(var i=0;i<count;i++){
				var x = rand_x(), y = rand_y();
				var new_enemy_snake = new EnemySnake(x,y,i)
				snakes.push(new_enemy_snake);
			}
		}
		this.interval = setInterval(this.loop,this.settings.movement_speed);
		this.createrPlayerSnake(40,0,this.player);
		this.createrEnemySnake(this.settings.enemy_count);
	}
	function EnemySnake(x,y,id){
		this.info = {	x: x,
						y: y,
						id: 'enemy_'+id,
						color: random_color(),
						score: 0,
						enemy_killed: 0,
						shield_ups: 0,
						speed_ups: 0,
						freeze_ups: 0,
						body: [0,1,2,3,4]
			};
		this.direction = 'left';
		this.last_location = 'left';
		this.temp = {};
		var makeEnemySnake = function(tag,attrs){
			var el = document.createElement(tag)			
			for(var attr in attrs){
				el.setAttribute(attr, attrs[attr])
			}
			return el;
		}
		this.initialize = function(){
			var x = 0;
			for(var i in this.info.body){
				if(i == 0){
					this.info.body[i] = makeEnemySnake('div',
									{
										id: this.info.id,
										class: 'enemy snake',
										style: "top: "+this.info.y+"px;	\
												left: "+this.info.x+"px;	\
												background-color: "+this.info.color+";	\
												width: 10px;	\
												height: 10px;	\
												position: absolute;	\
												border-radius: 5px;"
									});
					document.getElementById('wrapper-game').appendChild(this.info.body[i]);
				}else{
					this.info.body[i] = makeEnemySnake('div',
									{
										id: this.info.id+'-'+this.info.body[i],
										class: 'enemy snake',
										style: "top: "+this.info.y+"px;	\
												left: "+(this.info.x-x)+"px;	\
												background-color: "+this.info.color+";	\
												width: 10px;	\
												height: 10px;	\
												position: absolute;	\
												border-radius: 5px;"
									});
					document.getElementById('wrapper-game').appendChild(this.info.body[i]);
				}
					x += 10;
			}
			var el = document.getElementById(this.info.id).attributes;
		}
		this.moveSnake = function(){
			var rand = ['left','right','up','down'],
				move = rand[Math.floor(Math.random()*rand.length)];
			var head = {},body = [];
			for(var i in this.info.body){
				if(i == 0){					
					head = this.temp = {x: parseInt(this.info.body[i].style.left),
								y: parseInt(this.info.body[i].style.top)};
					if(move == 'up'){
						if(this.last_location == 'down'){
							this.info.body[i].style.top = this.temp.y+10+'px';
						}
						this.info.body[i].style.top = this.temp.y-10+'px';
					}else if(move == 'down'){
						if(this.last_location == 'up'){
							this.info.body[i].style.top = this.temp.y-10+'px';
						}
						this.info.body[i].style.top = this.temp.y+10+'px';
					}else if(move == 'left'){
						if(this.last_location == 'right'){
							this.info.body[i].style.left = this.temp.x+10+'px';
						}
						this.info.body[i].style.left = this.temp.x-10+'px';
					}else if(move == 'right'){
						if(this.last_location == 'right'){
							this.info.body[i].style.left = this.temp.x-10+'px';
						}
						this.info.body[i].style.left = this.temp.x+10+'px';
					}
					this.last_location = move;
				}else{
					temp = {x: parseInt(this.info.body[i].style.left),
								y: parseInt(this.info.body[i].style.top)};
					this.info.body[i].style.top = this.temp.y+'px';
					this.info.body[i].style.left = this.temp.x+'px';
					this.temp = temp;
					body.push(temp);
				}
			}
		}
		this.initialize();
	}
	document.body.onkeydown = function(e){
		game.keyControl(e.key)
	}