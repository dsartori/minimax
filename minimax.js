
// board object
function Board(){
	this.size = 3;
	this.positions =   [[0,0,0],
					   [0,0,0],
					   [0,0,0]];
	this.turn = 1;

	// method to return all possible moves for current board
	this.possibleMoves = function(){
		var moves = [];
		for (var y=0; y < this.size; y++){
			for (var x=0; x < this.size; x++){
				if (this.positions[y][x] === 0){
					var m = [x,y];
					moves.push(m);
				}
			}
		}
		return moves;
	};

	// method to advance the turn on this board
	this.nextTurn = function(){
		this.turn++;
		if (this.turn > 2){
			this.turn = 1;
		}
	};

	/* check for game state and return 
		0 = tie or no decision
		1 = player 1 win
		2 = player 2 win
		3 = board full
	*/
	this.gameOver = function(){
		for (var p=1; p<=2; p++){
			// check columns
			for (var y=0;y<this.size;y++){
				for (var x=0;x<this.size;x++){
					if (this.positions[y][x] != p){
						break;
					}
					if (x == (this.size-1)){
						return p;
					}
				}
			}
			// check rows
			for (var x=0;x<this.size;x++){
				for (var y=0;y<this.size;y++){
					if (this.positions[y][x] !=p){
						break;
					}
					if (y == (this.size-1)){
						return p;
					}
				}
			}
			// check diagonal
			for (var z=0;z<this.size;z++){
				if (this.positions[z][z] !=p){
					break;
				}
				if (z == (this.size-1)){
					return p;
				}
			}
			// check anti-diag
			for (var z=0;z<this.size;z++){
				if(this.positions[z][(this.size-1)-z] !=p){
					break;
				}
				if (z == (this.size-1)){
					return p;
				}
			}
		}
		// check for full board
		var f = 1;
		outerLoop:
		for (var y=0;y<this.size;y++){
			for (var x=0;x<this.size;x++){
				if (!this.positions[y][x]){
					f = 0;
					break outerLoop;
				}
			}
		}
		if (f){
			return 3;
		}
		return 0;
	};

	// method to take a move
	this.move = function(x,y){
		this.positions[y][x] = this.turn;
		this.nextTurn();

	}

	// display current board state
	this.show = function(){

		console.log(' -----');
		console.log('Player ' +this.turn + '\'s turn');
		console.log(' ----- ')
		console.log('|' + this.positions[0] + '|');
		console.log('|' + this.positions[1]+ '|');
		console.log('|' +this.positions[2]+ '|');
		console.log(' ----- ')
	}

}

// Negamax implementation
function max(board,depth){

	// check board state
	// function returns integer game result value if game is over
	var result = board.gameOver();
	if (result == 3){
		return 0;
	}
	if (result > 0){
		if (result == board.turn){
			return 1;
		}else{
			return -1;
		}
	}else{ // if the game isn't over, keep searching for a finished game

		// initialize variables
		var outcome;
		var bestScore = -1000;
		var bestMoves = [];

		// get list of possible moves
		var moves = copy(board.possibleMoves());

		// loop through list of moves
		for (var i=0; i < moves.length; i++ ){

			// apply this move to a new board and evaluate
			var x = moves[i][0];
			var y = moves[i][1];

			var b = clone(board);
			b.move(x,y);
			// look ahead to final outcome of this move
			outcome = -max(b,depth+1);

			// evaluate outcome vs. existing best outcome
			if (outcome == bestScore){
				bestMoves.push(copy(moves[i]));
			}
			if(outcome > bestScore){ 
				bestMoves = [];
				bestMoves.push(copy(moves[i]));
				bestScore = outcome;
			}
		}

		if (depth === 0){
			return bestMoves;
		}else{
			return bestScore;
		}
	}
}

// utility functions
function copy(arr){
	var new_arr = arr.slice(0);
	for(var i = new_arr.length; i--;)
		if(new_arr[i] instanceof Array)
			new_arr[i] = copy(new_arr[i]);
	return new_arr;
}

function clone(obj){
	if(obj == null || typeof(obj) != 'object')
		return obj;

	var temp = new obj.constructor(); 
	for(var key in obj)
		temp[key] = clone(obj[key]);

	return temp;
}


// display possible moves
function showMoves(arr){
var str = '';
	for (var i = 0; i < arr.length ; i++){
		if (i > 0){ 
			str += ',';
		}
		str += '{' + arr[i] + '}';
	}
//console.log(str);
}
/*


// test code
var b = new Board();


b.positions = [[0,1,2],
				[2,2,1],
				[1,2,1]];
b.turn = 1;

b.show();
showMoves(max(b,0));


b.positions = [[0,1,0],
				[0,0,0],
				[0,2,0]];
b.turn = 1;

b.show();
showMoves(max(b,0));

b.positions = [[0,1,0],
				[0,0,0],
				[0,0,0]];
b.turn = 2;

b.show();
showMoves(max(b,0));
*/

