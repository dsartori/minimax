var gBoard = ["","","","","","","","",""];
var board;

function init() {

	document.getElementById('X').className = 'current-player';
	document.getElementById('O').removeAttribute('class');

	for(var i=0; i<9; i++) {
		document.getElementById(i).innerHTML = '<div></div>';
	}

	var squares = document.getElementsByTagName('td');
	for(var i=0; i<squares.length; i++) {
		squares[i].setAttribute('onclick','squareClicked(this)');
	}

	var button = document.getElementById('reset');
	button.setAttribute('onclick','newGame()');

	board = new Board();
}


function newGame() {

	// reset board
	for(var i=0; i<9; i++) {
		document.getElementById(i).firstChild.removeAttribute('class');
		gBoard = ["","","","","","","","",""];
		board.positions = [[0,0,0],[0,0,0],[0,0,0]];
		board.turn = 1;


	}
}


function squareClicked(sqr) {
	// determine who's turn it is, X or O
	var player = 'X'; // document.querySelector(".current-player").id;	

	// verify that the square is empty
	if(!sqr.firstChild.className) {
		// fill the square with the current player's mark
		sqr.firstChild.className = player + '-marker';
		
		//get the clicked board position
		var o = parseInt(sqr.id.charAt(0));

		// set value in game array
		gBoard[o] = player;

		// translate clicked board position into x,y coordinates
		var coords = translateOrdinals(o);

		// take move
		board.move(coords[0],coords[1]);
		result = max(board,0);

		// display the board and possible moves for player 2
		showMoves(result);
		board.show();


		if (Array.isArray(result)){


			var m = Math.floor((Math.random() * result.length));
			console.log(result[m]);
			coords = result[m];
			var gPosition = translateCoords(coords[0],coords[1]);
			document.getElementById(gPosition).firstChild.className = 'O-marker';
			board.move(coords[0],coords[1]);

			//board.show();
		}
		else{
			console.log ("Game over: " + result);
		}

		// Two-player game code

		/*
		// update the current player value
		if(player === 'X') {
			document.getElementById('X').removeAttribute('class');
			document.getElementById('O').className = 'current-player';


		} else {
			document.getElementById('O').removeAttribute('class');
			document.getElementById('X').className = 'current-player';
		}*/

	}
}

// utility functions to translate between boards

// translate coordinates to ordinal system
function translateCoords(x,y){

	if (y == 0){
		switch (x){
			case 0:
				return 0;
			case 1:
				return 1;
			case 2:
				return 2;
		}
	}
	if (y ==1){
		switch (x){
			case 0:
				return 3;
			case 1:
				return 4;
			case 2:
				return 5;
		}
	}
	if (y ==2){
		switch (x){
			case 0:
				return 6;
			case 1:
				return 7;
			case 2:
				return 8;
		}
	}
}

// translate ordinal to coordinate system
function translateOrdinals(z){
	// board positions are y,x
	switch(parseInt(z)){
		case 0:
			return [0,0];
		case 1:
			return [1,0];
		case 2:
			return [2,0];
		case 3:
			return [0,1];
		case 4:
			return [1,1];
		case 5:
			return [2,1];
		case 6:
			return [0,2];
		case 7:
			return [1,2];
		case 8:
			return [2,2];
	}
}

function restoreBoard(arr) {
	for(var i=0; i<arr.length; i++) {
		switch(arr[i]) {
			case 'X':
				document.getElementById('c'+i).firstChild.className = 'X-marker';
				break;
			case 'O':
				document.getElementById('c'+i).firstChild.className = 'O-marker';
				break;
			default:
				document.getElementById('c'+i).firstChild.removeAttribute('class');
				break;
		}
	}
}














