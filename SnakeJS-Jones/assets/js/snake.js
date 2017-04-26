var val = "", players = [], html = '', game,new_player;
	function login_page(){
		document.getElementById('play').addEventListener('click', function(){
			val = this.value;
		});
		document.getElementById("submit_name").addEventListener("submit", function(evt){
			evt.preventDefault();
			if(val == "Play Game"){
				new_player = (document.getElementById("player_name").value === "" ? "Unnamed" : document.getElementById("player_name").value);
				document.getElementById("player_name").value = "";
				game = new GameBoard(new_player);
				document.getElementById('wrapper-login').setAttribute('class','hidden');
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
	}
	login_page();
	function no_btn(btn = null){
		if(btn !== null)
			document.getElementById('wrapper-game').removeChild(btn);

		document.getElementById("btn-pause").disabled = false;
		document.getElementById("btn-restart").disabled = false;
		document.getElementById("btn-quit").disabled = false;
		game.interval = setInterval(game.loop,game.settings.movement_speed);
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
						shield_ups: false,
						speed_ups: 0,
						body: [0,1,2,3,4],
						type: 'player'
			};
		this.direction = 'left';	// direction where the snake will go
		this.val = 10;	
		this.temp = {};
		//	this will make the snake body
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
												background-color: "+this.info.color+";"
									});
					document.getElementById('wrapper-game').appendChild(this.info.body[i]);
				}else{
					this.info.body[i] = makeSnake('div',
									{
										id: this.info.id+'-'+this.info.body[i],
										class: 'player snake',
										style: "top: "+this.info.y+"px;	\
												left: "+(this.info.x-x)+"px;	\
												background-color: "+this.info.color+";"
									});
					document.getElementById('wrapper-game').appendChild(this.info.body[i]);
				}
					x += 10;
			}
			var el = document.getElementById(this.info.id).attributes;
		}
		this.eatFood = function (head){
			var food = document.getElementsByClassName('food');		// gett all food in the
			for(var i=0;i<food.length;i++){
				var x = parseInt(food[i].style.left), y = parseInt(food[i].style.top);
				if(head.x == x && head.y == y){
					var id = food[i].id = 'id',
						get = document.getElementById(id);
					document.getElementById('wrapper-game').removeChild(get);
					this.addBody();		//calls the function to increase snakes length
					this.info.score += 10;
					document.querySelector('#score_board table').remove();
					game.updateScore();
					game.randFood();
				}
			}
		}
		// activate power ups
		this.get_ups = function(head){
			var el = document.getElementsByClassName('ups'),	// get ups info
			ups = '';
			for(var i=0;i<el.length;i++){
				var ups_style =	{x: parseInt(el[i].style.left), y: parseInt(el[i].style.top)}
				if(ups_style.x == head.x && ups_style.y == head.y){
					ups = el[i].className
					ups = ups.split(' ').shift();
					game.settings.ups_count --;
					el[i].remove();
					game.showUps(game.settings.ups_count);
				}
			}

			switch(ups){
				case "freeze_ups":
					game.freeze(this.info)
				break;
			    case "speed_ups":
					if(this.val < 0)
						this.val -= 10;
					else
						this.val += 10;
			    break;
			    case "shield_ups":
			    	game.activateShield(this.info);
			    break;
		        case "reverse":
		        	game.reverse();
		        break;
			}
		}
		// add body after eating food
		this.addBody = function(){
			var tail = {x: parseInt(this.info.body[this.info.body.length-1].style.left), y: parseInt(this.info.body[this.info.body.length-1].style.top)};
			this.info.body.push(this.info.body.length);
			this.info.body[this.info.body.length-1] = makeSnake('div',
									{
										id: this.info.id+'-'+this.info.body[this.info.body.length-1],
										class: 'player snake',
										style: "top: "+tail.y+"px;	\
												left: "+(tail.x)+"px;	\
												background-color: "+this.info.color+";"
									});
			document.getElementById('wrapper-game').appendChild(this.info.body[this.info.body.length-1]);
		}
		this.moveSnake = function(){
			var head = {},body = [];
			for(var i in this.info.body){
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
			this.eatFood(head);
			this.get_ups(head);
			game.collisions(head,this.info);
		}
		this.initialize();
	}

	function GameBoard(player){
		var snakes = [];
		this.player = player;
		this.temp = snakes;
		this.settings = {
							enemy_count: 5,
							enemy_to_kill: 5,
							movement_speed: 100,
							stage: 1,
							ups_count: 0,
							freeze_ups: false,
							reverse: false,
						}
		this.generate_map = function(){
			document.body.innerHTML +='<div id="wrapper-game">	\
											<div id="score_board"></div>	\
										</div>';

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
				clearInterval(game.interval);
				document.getElementById("btn-pause").disabled = true;
				document.getElementById("btn-restart").disabled = true;
				document.getElementById("btn-quit").disabled = true;
				html = makeObj('div',{id:'restart'})
				html_restart =	'<h3>Restart Game</h3>	\
								<p>Are you sure you want to restart game?</p>	\
								<div>	\
									<a id="restart-yes" href="#">Yes</a>	\
									<a id="restart-no" href="#" onclick="no_btn(restart)">No</a>	\
								</div>';
				html.innerHTML = html_restart;
				document.getElementById('wrapper-game').appendChild(html);
				document.getElementById("restart-yes").addEventListener('click', function(){
					game.restart();
				});
			});
			document.getElementById("btn-quit").addEventListener('click', function(){
				clearInterval(game.interval);
				document.getElementById("btn-pause").disabled = true;
				document.getElementById("btn-restart").disabled = true;
				document.getElementById("btn-quit").disabled = true;
				html = makeObj('div',{id: 'quit'});					
				html_quit =	'<h3>Quit Game</h3>	\
							<p>Are you sure you want to quit game?</p>	\
							<div>	\
								<a id="quit-yes" href="#">Yes</a>	\
								<a id="quit-no" href="#" onclick="no_btn(quit)">No</a>	\
							</div>';
				html.innerHTML = html_quit;
				document.getElementById('wrapper-game').appendChild(html);
				document.getElementById("quit-yes").addEventListener('click', function(){
					game.quit();
				});
			});
		}
		this.generate_map();
		this.quit = function(){
			var elem = document.getElementById("wrapper-game");
				elem.remove();
			this.removeSnake();
			document.getElementById('wrapper-login').removeAttribute('class');
			document.getElementsByTagName('header')[0].setAttribute('class','hidden');
			login_page();
		}
		this.pause = function(){
			clearInterval(this.interval)
			document.getElementById("btn-restart").disabled = true;
			document.getElementById("btn-quit").disabled = true;
			html = makeObj('div',{id: 'pause'});
			h1 = "<h1>Game Paused</h1>";
			html.innerHTML = h1;
			document.getElementById('wrapper-game').appendChild(html) ;
		}
		this.resume = function(){
			this.interval = setInterval(this.loop,this.settings.movement_speed);
			var el = document.getElementById('pause');
			document.getElementById('wrapper-game').removeChild(el);
			document.getElementById("btn-restart").disabled = false;
			document.getElementById("btn-quit").disabled = false;
		}
		this.restart = function(){
			clearInterval(this.interval)
			var elem = document.getElementById("wrapper-game");
				elem.remove();
			this.removeSnake();
			game = new GameBoard(new_player)
		}
		this.removeSnake = function(){
			// this will remove Snake
			clearInterval(this.interval)
			var snake_keys = Object.keys(snakes);
			for(var i=0; i < snake_keys.length; i++){
				for(var j=0; j<snakes[snake_keys[i]].info.body.length; j++){
					snakes[snake_keys[i]].info.body[j].remove();
				}
			}
			snakes = [];
			no_btn();
		}			
		this.keyControl = function(directions){
			var val = snakes[this.player].val;
			switch(directions) {
			    case "ArrowDown":
					(snakes[this.player].direction == 'top' ? snakes[this.player].val = val : snakes[this.player].val = 10);
					snakes[this.player].direction = 'top'
		        break;
			    case "ArrowRight":
					(snakes[this.player].direction == 'left' ? snakes[this.player].val = val : snakes[this.player].val = 10);			    
					snakes[this.player].direction = 'left'
			    break;
			    case "ArrowUp":
					(snakes[this.player].direction == 'top' ? snakes[this.player].val = val : snakes[this.player].val = -10);
					snakes[this.player].direction = 'top'
			    break;
		        case "ArrowLeft":
					(snakes[this.player].direction == 'left' ? snakes[this.player].val = val : snakes[this.player].val = -10);
					snakes[this.player].direction = 'left'
		        break;
			}
		}
		this.loop = function(){
			for(var snake in snakes){
				if(snakes[snake] !== undefined){
					snakes[snake].moveSnake();
				}
			}
		}
		this.nextStage = function(){
			if(this.settings.stage < 5){
				this.settings.stage += 1;
				this.settings.enemy_count += 3;
				this.settings.enemy_to_kill += 3;
				this.settings.movement_speed -= 10;	
				document.querySelector('header span').innerText = 'Stage '+this.settings.stage;			
				this.createrEnemySnake();
			}
		}
		this.collisions = function(head,snake){
			var wall = document.getElementById('wrapper-game'),
				collision = false;
			var snake_keys = Object.keys(snakes);
			var temp_snakes = [];
			console.log(snake.shield_ups)
			// if snake hit the wall
			if(collision == false){
				if(head.x > (wall.clientWidth - 10) || head.x < 0){
					game.changeToFood(snake.body);
					collision = true;
				}if(head.y > (wall.clientHeight - 10)|| head.y < 0){
					game.changeToFood(snake.body);
					collision = true;
				}
			}
			// // if snake hit its self
			// if(collision == false){
			// 	for(var i=1;i<snake.body.length;i++){
			// 	var x = parseInt(snake.body[i].style.left), y = parseInt(snake.body[i].style.top);
			// 		if(x == head.x && y == head.y && this.settings.reverse == false){
			// 			console.log(snake.body[i],{x,y},head)
			// 		// 	game.changeToFood(snake.body);
			// 		// 	collision = true;
			// 		}
			// 	}
			// }
			// // if snake hit other snake
			if(collision == false){
				for(var i=0; i < snake_keys.length; i++){
					if(snakes[snake_keys[i]].info.id != snake.id){
						for(var j=0; j<snakes[snake_keys[i]].info.body.length; j++){
							var body_x = parseInt(snakes[snake_keys[i]].info.body[j].style.left),
								body_y = parseInt(snakes[snake_keys[i]].info.body[j].style.top);
							if(head.x == body_x && head.y == body_y && snake.shield_ups == false){
								snakes[snake_keys[i]].info.enemy_killed ++;
								snakes[snake_keys[i]].info.score += 500;
								game.changeToFood(snake.body);
								collision = true
							}
							if(snakes[snake_keys[i]].info.enemy_killed == this.settings.enemy_to_kill && snakes[snake_keys[i]].info.type == 'player'){
								this.nextStage();
							}
						}
					}
				}
			}
			// // update high score and respawn enemy or players
			if(collision == true && snake.type == 'player'){
				players.push({name: snake.id, score: snake.score})
				players.sort(function (a, b) {		
				  return b.score - a.score;
				});
				players.splice(10, 1);
				this.createrPlayerSnake(rand_x(),rand_y(),this.player)
			}else if(collision == true){
				this.createrEnemySnake(snake.id)
			}
		}
		this.updateScore = function(){
			var snake_keys = Object.keys(snakes),
			table = document.createElement('table');
			var game_snakes = [];	// this will get all snake an pit into the array game_snakes
			for(var i=0; i<snake_keys.length; i++){
				game_snakes[i] = snakes[snake_keys[i]].info;
			}
			game_snakes.sort(function (a, b) {		
			  return b.score - a.score;
			});
			for(var i=0; i<game_snakes.length; i++){
			// need to create element node before it will append
		        var tr = document.createElement("tr"),		// create table row
		         	td_name = document.createElement("td");
		         	td_name.innerHTML = game_snakes[i].id;
		         	tr.appendChild(td_name);
		         	tr.style.color = game_snakes[i].color;		// add color
		        var	td_score = document.createElement("td");	// create table data
		        	td_score.innerHTML = game_snakes[i].score;
		         	tr.appendChild(td_score);
		         	table.appendChild(tr);
			}
			document.getElementById('score_board').appendChild(table);
		}
		this.randFood = function(){
			var el = document.getElementsByClassName('food');
			if(el.length < 30){
				var food = makeObj('div',{
											class: 'food',
											style: "top: "+rand_y()+"px;	\
											left: "+rand_x()+"px;"
										});
				document.getElementById('wrapper-game').appendChild(food);
			}
		}
		this.changeToFood = function(snake){
			var info = '', food = '';
				snake[0].remove();
				snake.shift();
			for(var i=0;i<snake.length;i++){
				var info = {y: snake[i].style.top,x: snake[i].style.left};
				snake[i].remove();
				food = makeObj('div',{
										class: 'food',
										style: "top: "+info.y+";	\
										left: "+info.x+";"
									});
				document.getElementById('wrapper-game').appendChild(food);
			}
		}		
		this.createrEnemySnake = function(id = null){
			var	new_enemy_snake;
			if(id == null && this.settings.stage == 1){
				for(var i=0;i<this.settings.enemy_count;i++){
						new_enemy_snake = new EnemySnake(rand_x(),rand_y(),i);
						snakes[i] = new_enemy_snake;
				}			
			}else if(id !== null){
				var id = id.split('_').pop();	
				new_enemy_snake = new EnemySnake(rand_x(),rand_y(),id);
				snakes[id] = new_enemy_snake;
			}
			else{
				for(var i=snakes.length;i<this.settings.enemy_count;i++){
					new_enemy_snake = new EnemySnake(rand_x(),rand_y(),i);
					snakes[i] = new_enemy_snake;
				}
			}
		}
		this.createrPlayerSnake = function(x,y,name){
			var new_snake = new PlayerSnake(x,y,name);
			snakes[name] = new_snake;
		}
		this.showUps = function(ups_count){
			if(ups_count < 5){
				var ups_arr = ['speed_ups','freeze_ups','reverse','shield_ups'],
					selected = ups_arr[Math.floor(Math.random()*4)];
				var ups = makeObj('div',{
										class: selected+' ups',
										style: "top: "+rand_y()+"px;	\
												left: "+rand_x()+"px;"									
									});
				document.getElementById('wrapper-game').appendChild(ups);
				this.settings.ups_count += 1;

				this.ups_timeout = setInterval(this.showUps(this.settings.ups_count),1000);
			}
		}		
		this.freeze = function(snake){
			if(this.settings.freeze_ups == false){
				this.settings.freeze_ups = true;
				clearInterval(this.interval)
				var running = '';
				var keys = Object.keys(snakes),
				temp = snakes;
				for(var i=0;i<keys.length;i++){
					if(snakes[keys[i]].info.id == snake.id){
						snakes = [];
						snakes[keys[i]] = temp[keys[i]];
							break;	// end the loop and proceed to intervals
					}
				}

				this.interval = setInterval(this.loop,this.settings.movement_speed);
				setTimeout(function(){
					clearInterval(this.interval)
					snakes = temp;
					this.interval = setInterval(this.loop,game.settings.movement_speed);
					game.settings.freeze_ups = false;
				},5000);
			}
		}
		this.reverse = function(){
			var keys = Object.keys(snakes);
			for(var i=0;i<keys.length;i++){
				snakes[keys[i]].info.body.reverse();
				(snakes[keys[i]].val > 0 ? snakes[keys[i]].val = -10 : snakes[keys[i]].val = 10)
				this.settings.reverse = true;
				setTimeout(function(){
					game.settings.reverse = false;
				},300)		
			}
		}
		this.activateShield = function(snake){
			snake.shield_ups = true;
			console.log(snake.shield_ups)
			setTimeout(function(){
				snake.shield_ups = false;
			},5000)
		}
		var rand_x = function(){
			return (Math.floor(Math.random()*10)* 110)+200;
		}
		var rand_y = function(){
			var val = ((Math.floor(Math.random()*5)* 10)*15)+ 20;
			return (val <= 0 ? val+30 : (val >= 600 ? val-30 : val)) 
		}
		var makeObj = function(tag,attrs = null){
			var el = document.createElement(tag)			
			for(var attr in attrs){
				el.setAttribute(attr, attrs[attr])
			}
			return el;
		}
		this.randFood();
		this.updateScore();
		this.showUps(this.settings.ups_count);
		this.createrEnemySnake();
		this.createrPlayerSnake(70,10,this.player);
		this.interval = setInterval(this.loop,this.settings.movement_speed);
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
						body: [0,1,2,3,4],
						type: 'enemy'
			};
		this.last_direction = 'left';
		this.temp = {};
		this.val = 10;
		//	this will make the snake body
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
												background-color: "+this.info.color+";"
									});
					document.getElementById('wrapper-game').appendChild(this.info.body[i]);
				}else{
					this.info.body[i] = makeEnemySnake('div',
									{
										id: this.info.id+'-'+this.info.body[i],
										class: 'enemy snake',
										style: "top: "+this.info.y+"px;	\
												left: "+(this.info.x-x)+"px;	\
												background-color: "+this.info.color+";"
									});
					document.getElementById('wrapper-game').appendChild(this.info.body[i]);
				}
					x += 10;
			}
			var el = document.getElementById(this.info.id).attributes;
		}
		this.eatFood = function (head){
			var food = document.getElementsByClassName('food');		// get all food
			for(var i=0;i<food.length;i++){
				var x = parseInt(food[i].style.left), y = parseInt(food[i].style.top);
				if(head.x == x && head.y == y){
					var id = food[i].id = 'id',
						get = document.getElementById(id);
					document.getElementById('wrapper-game').removeChild(get);
					this.addBody();		//calls the function to increase snakes length
					this.info.score += 10;
					game.randFood();
					document.querySelector('#score_board table').remove();
					game.updateScore();
				}
			}
		}
		// add body to the snake if it eat food
		this.addBody = function(){
			var tail = {x: parseInt(this.info.body[this.info.body.length-1].style.left), y: parseInt(this.info.body[this.info.body.length-1].style.top)};
			this.info.body.push(this.info.body.length); // add snake length
			this.info.body[this.info.body.length-1] = makeEnemySnake('div',
									{
										id: this.info.id+'-'+this.info.body[this.info.body.length-1],
										class: 'player snake',
										style: "top: "+tail.y+"px;	\
												left: "+(tail.x)+"px;	\
												background-color: "+this.info.color+";"
									});
			document.getElementById('wrapper-game').appendChild(this.info.body[this.info.body.length-1]);
		}
		this.get_ups = function(head){
			var el = document.getElementsByClassName('ups'),	// get ups info
			ups = '';
			for(var i=0;i<el.length;i++){
				var ups_style =	{x: parseInt(el[i].style.left), y: parseInt(el[i].style.top)}
				if(ups_style.x == head.x && ups_style.y == head.y){
					ups = el[i].className
					ups = ups.split(' ').shift();
					game.settings.ups_count --;
					el[i].remove();
					game.showUps(game.settings.ups_count);
				}
			}

			switch(ups){
				case "freeze_ups":
					game.freeze(this.info)
				break;
			    case "speed_ups":
					if(this.val < 0)
						this.val -= 10;
					else
						this.val += 10;
			    break;
			    case "shield_ups":
			    	game.activateShield(this.info);
			    break;
		        case "reverse":
		        	game.reverse();
		        break;
			}
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
						(this.last_direction == 'down' ? this.val = 10 : this.val = -10)	
						this.info.body[i].style.top = this.temp.y+this.val+'px'					
					}else if(move == 'down'){
						(this.last_direction == 'up' ? this.val = -10 : this.val = 10)
						this.info.body[i].style.top = this.temp.y+this.val+'px'
					}else if(move == 'left'){
						(this.last_direction == 'right' ? this.val = 10 : this.val = -10)
						this.info.body[i].style.left = this.temp.x+this.val+'px'
					}else if(move == 'right'){
						(this.last_direction == 'left' ? this.val = -10 : this.val = 10)
						this.info.body[i].style.left = this.temp.x+this.val+'px'
					}
				}else{
					temp = {x: parseInt(this.info.body[i].style.left),
							y: parseInt(this.info.body[i].style.top)};
					this.info.body[i].style.top = this.temp.y+'px';
					this.info.body[i].style.left = this.temp.x+'px';
					this.temp = temp;
					body.push(this.temp);
				}
			}
				this.eatFood(head)
				this.get_ups(head)
				game.collisions(head,this.info);
				this.last_direction = move;
		}
		this.initialize();
	}
	document.body.onkeydown = function(e){
		game.keyControl(e.key)
	}