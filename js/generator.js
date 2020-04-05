// Nouns by theme
var nouns = {"Crime": ["Murderer", "Detective", "Footprint", "Road", "Knife", "Bandana", "Flag"],
				"Mystery": ["Spy", "Train", "Mansion", "Lightning", "Pencil", "Lantern"],
				"Adventure": ["Pirate", "Jungle", "Lion", "Ship", "Treasure", "Squid"],
				"Music": ["Melody", "Note", "Octave", "Symphony", "Orchestra", "Bassoon"],
				"Storytime": ["Tiger", "Princess", "Centaur", "Throne", "Ocean", "Tower"]};

// Verbs by style
var verbs = {"Cipher": ["Roaming", "Running", "Sorting", "Whispering", "Forming", "Rolling"],
				"Escape Room": ["Fighting", "Crawling", "Falling", "Searching", "Sailing", "Climbing"],
				"Math Game": ["Summing", "Adding", "Thinking", "Twirling", "Spiraling", "Calculating"],
				"Trivia Challenge": ["Singing", "Traveling", "Building", "Matching", "Writing", "Filing", "Drawing"]};

function GeneratePuzzle () {
	// Get param input values
	var theme_element = document.getElementById("theme");
	var theme = theme_element.options[theme_element.selectedIndex].value;
	var style_element = document.getElementById("style");
	var style = style_element.options[style_element.selectedIndex].value;
	var difficulty_element = document.getElementById("difficulty");
	var difficulty = difficulty_element.options[difficulty_element.selectedIndex].value;
	var duration_hr = document.getElementById("duration_hr").value;
	var duration_min = document.getElementById("duration_min").value;

	// Check if the solution
	if (theme == "Music" && style == "Cipher" && difficulty == "3" &&
		duration_hr == 11 && duration_min == 35) {
		$('#puzzle_title').text("CIRCULAR REASONING");
		$('#puzzle_description').text("Create circular melodies to find the award winning tune.  This escape room will rock your party!");
	}
	// Check if all params filled
	else if (theme == "empty" || style == "empty" || difficulty == "empty" ||
				duration_hr == "" || duration_min == "") {
		$('#puzzle_title').text("Please fill all parameters!");
		$('#puzzle_description').text("");
	}
	// Generate a title and description
	else {
		var noun_index = Math.floor(Math.random() * nouns[theme].length);
  		var noun = nouns[theme][noun_index];
  		var verbs_index = Math.floor(Math.random() * verbs[style].length)
  		var verb = verbs[style][verbs_index];
		var theme_descriptions = {"Crime": `Solve the famous case of the ${noun}. Catch the criminal in this ${style}.`,
									"Mystery": `Why did the ${noun} dissapear? This ${style} will have you and your detectives searching for evidence.`,
									"Adventure": `${noun}! Hold onto your hats for this adventurous ${style}.`,
									"Music": `Create ${noun} melodies to find the award winning tune. This ${style} will rock your party!`,
									"Storytime": `Everyone knows the classic tale of the ${noun}. It's storytime in this ${style}!`};

  		var title = noun + " " + verb;
  		$('#puzzle_title').text(title.toUpperCase());

  		var description = theme_descriptions[theme];
  		$('#puzzle_description').text(description);
	}
}