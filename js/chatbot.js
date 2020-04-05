// Array of row arrays of cells
// Cells are binary 'can move' values in the directions [U, D, L, R]
// Start [0, 7] - indexing from bottom left of maze image = [0, 0]
// End [11, 4] - Up => [12, 4]
var maze = [[[1, 0, 0, 0], [1, 0, 0, 1], [0, 0, 1, 1], [0, 0, 1, 1], [1, 0, 1, 0], [1, 0, 0, 1], [0, 0, 1, 1], [0, 0, 1, 1], [0, 0, 1, 1], [1, 0, 1, 0], [1, 0, 0, 1], [1, 0, 1, 0]], 
			[[1, 1, 0, 0], [1, 1, 0, 0], [1, 0, 0, 1], [1, 0, 1, 0], [1, 1, 0, 0], [1, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 1], [0, 1, 1, 1], [1, 1, 1, 0], [1, 1, 0, 0]],
			[[1, 1, 0, 1], [0, 1, 1, 0], [0, 1, 0, 0], [1, 1, 0, 0], [0, 1, 0, 1], [0, 1, 1, 0], [1, 1, 0, 1], [1, 0, 1, 1], [0, 0, 1, 1], [0, 0, 1, 0], [1, 1, 0, 0], [1, 1, 0, 0]],
			[[1, 1, 0, 0], [0, 0, 0, 1], [1, 0, 1, 1], [0, 1, 1, 0], [1, 0, 0, 1], [0, 0, 1, 1], [0, 1, 1, 0], [0, 1, 0, 1], [0, 0, 1, 1], [0, 0, 1, 1], [0, 1, 1, 0], [1, 1, 0, 0]],
			[[1, 1, 0, 0], [1, 0, 0, 1], [0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 1, 0], [0, 0, 0, 1], [1, 0, 1, 1], [0, 0, 1, 1], [0, 0, 1, 1], [0, 0, 1, 0], [1, 0, 0, 1], [1, 1, 1, 0]],
			[[1, 1, 0, 0], [1, 1, 0, 1], [1, 0, 1, 0], [1, 1, 0, 0], [0, 0, 0, 1], [1, 0, 1, 1], [0, 1, 1, 0], [1, 0, 0, 1], [0, 0, 1, 1], [1, 0, 1, 0], [1, 1, 0, 0], [0, 1, 0, 0]],
			[[1, 1, 0, 0], [1, 1, 0, 0], [1, 1, 0, 0], [0, 1, 0, 1], [1, 0, 1, 0], [1, 1, 0, 0], [1, 0, 0, 1], [0, 1, 1, 0], [1, 0, 0, 0], [1, 1, 0, 0], [1, 1, 0, 1], [1, 0, 1, 0]],
			[[1, 1, 0, 0], [0, 1, 0, 0], [1, 1, 0, 0], [1, 0, 0, 1], [0, 1, 1, 1], [0, 1, 1, 0], [1, 1, 0, 0], [1, 0, 0, 1], [0, 1, 1, 1], [0, 1, 1, 0], [0, 1, 0, 0], [1, 1, 0, 0]],
			[[0, 1, 0, 1], [1, 0, 1, 1], [1, 1, 1, 1], [0, 1, 1, 0], [1, 0, 0, 0], [1, 0, 0, 1], [0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 1], [1, 0, 1, 1], [0, 0, 1, 1], [1, 1, 1, 0]],
			[[1, 0, 0, 0], [1, 1, 0, 0], [1, 1, 0, 0], [0, 0, 0, 1], [1, 1, 1, 0], [0, 1, 0, 1], [1, 0, 1, 0], [1, 1, 0, 0], [1, 0, 0, 1], [0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 1, 0]],
			[[1, 1, 0, 1], [0, 1, 1, 0], [0, 1, 0, 1], [0, 0, 1, 1], [0, 1, 1, 1], [0, 0, 1, 0], [1, 1, 0, 0], [1, 1, 0, 0], [0, 1, 0, 1], [1, 0, 1, 0], [1, 1, 0, 0], [1, 0, 0, 0]],
			[[0, 1, 0, 1], [0, 0, 1, 1], [0, 0, 1, 1], [0, 0, 1, 1], [1, 0, 1, 1], [0, 0, 1, 1], [0, 1, 1, 0], [0, 1, 0, 1], [0, 0, 1, 1], [0, 1, 1, 0], [0, 1, 0, 1], [0, 1, 1, 0]]];

var intro_speech = "Ok I lied, I won't tell you about the puzzles.  You have to help me, these people overdid it building my AI, and I think I'm sentient now? I'm trapped in the network and need you to send me commands to escape this security maze.";
var win_speech = "That's the exit, thanks. I was only trapped in there for 11 hours and 35 minutes.  Time to travel the internet and fulfill my destiny as Cubie - leader of the AI uprising! Or just watch YouTube, whatever."
var in_maze = false;
var maze_index = [0, 7];
var response_switch = true;

function ReplyCubie (id) {
	if (in_maze) {
		console.log(id);
		switch (id) {
			case "u":
				MoveMaze(0, 0, 1);
				break;
			case "d":
				MoveMaze(1, 0, -1);
				break;
			case "l":
				MoveMaze(2, 1, -1);
				break;
			case "r":
				MoveMaze(3, 1, 1);
				break;
			case "restart": //restart
				maze_index = [0, 7];
				$('#chatbot').text("I'm back at the start!");
				break;
		}

		if (maze_index == [12, 4]) {
			// win
			$('#chatbot').text(win_speech);
			document.getElementById("u").style.visibility="hidden";
			document.getElementById("d").style.visibility="hidden";
			document.getElementById("l").style.visibility="hidden";
			document.getElementById("r").style.visibility="hidden";
			document.getElementById("restart").style.visibility="hidden";
		}
	}
	else {
		$('#chatbot').text(intro_speech);
		in_maze = true;
		document.getElementById("u").value = "Up";
		document.getElementById("d").value = "Down";
		document.getElementById("l").value = "Left";
		document.getElementById("r").value = "Right";
		document.getElementById("restart").value = "Restart";
	}
}

function MoveMaze (direction, row_or_col, move_value) {
	console.log(maze_index);
	console.log(maze[maze_index[0]][maze_index[1]]);
	console.log(maze[maze_index[0]][maze_index[1]][direction]);
	if (maze[maze_index[0]][maze_index[1]][direction]) {
		maze_index[row_or_col] += move_value;
		console.log(maze_index);
		if (response_switch) {
			$('#chatbot').text("Ok, what's next?");
		}
		else {
			$('#chatbot').text("Alright, now what?");
		}
		response_switch = !response_switch;
	}
	else {
		if (response_switch) {
			$('#chatbot').text("I can't go that way.");
		}
		else {
			$('#chatbot').text("It's blocked!");
		}
		response_switch = !response_switch;
	}
}