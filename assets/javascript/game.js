var word;					//current word
var losses = 0;				//loss counter
var wins = 0;				//win counter
var userGuess;				//user guess
var correctLetters = [];	//correctly guessed letters
var wrongLetters = [];		//incorrectly guessed letters
var counter;				//counts correct letters
		
var winTracker = document.getElementById("wins");
    
	document.getElementById("losses").innerHTML = losses;
	winTracker.innerHTML = wins;

var wordList = ["debian", "arch", "ubuntu", "slackware", "mint"]; 	

//Choose a random word from wordList and replace it with "__"
	function start() {
	    word = wordList[Math.floor(Math.random() * wordList.length)];
	    counter = 7;
	    document.getElementById("counter").innerHTML = counter;
	    for (i = 0; i < word.length; i++) {
	        correctLetters[i] = "__";
	    }
	    document.getElementById("answer").innerHTML = correctLetters.join(" ");
	    console.log(word);
	}

    function show_image(src, width, height, alt) {
        var img = document.createElement("img");
        img.src = src;
        img.width = width;
        img.height = height;
        img.alt = alt;
        document.body.appendChild(img);
    }


	//Is the letter a word?
	function checkLetter() {
		document.onkeyup = function(event) {
			if (!(event.which <= 90 && event.which >= 65)) return
			userGuess = event.key.toLowerCase();
			var found = false;
			for (i = 0; i < word.length; i++) {
				if (userGuess === word[i]) {
					correctLetters[i] = userGuess;
					document.getElementById("answer").innerHTML = correctLetters.join(" ");
					found = true;
				} 
			}

			//Incorrect letters are placed into the wrongLetters array and are displayed on screen
			if (found && correctLetters.join("") !== word) return;
			if (counter > 0 && correctLetters.join("") == word) {
				console.log(wins);
				setTimeout(function () {
					wins += 1;
					winTracker.innerHTML = wins;
					correctLetters = [];
					//Upon winning ...
					if (word === "debian") {
					document.getElementById("logos").src="assets/images/debian.png";
					document.getElementById("logoTitle").innerHTML = "Debian";
					}
					if (word === "arch") {
					document.getElementById("logos").src="assets/images/arch.png";
					document.getElementById("logoTitle").innerHTML = "Arch Linux";
					}
					if (word === "ubuntu") {
					document.getElementById("logos").src="assets/images/ubuntu.png";
					document.getElementById("logoTitle").innerHTML = "Ubuntu";
					}
					if (word === "slackware") {
					document.getElementById("logos").src="assets/images/slackware.png";
					document.getElementById("logoTitle").innerHTML = "Slackware";
					}
					if (word === "mint") {
					document.getElementById("logos").src="assets/images/mint.png";
					document.getElementById("logoTitle").innerHTML = "Mint";
					}
					setTimeout(function () { 
					start(); }, 50);
					}, 50);
					return;
				}
			if (wrongLetters.indexOf(userGuess) < 0) {
				wrongLetters.push(userGuess);
				document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");
				//Each wrong guess subtracts one from the counter
				counter--;
				console.log(counter);
				document.getElementById("counter").innerHTML = counter;
				//Game Over when counter reaches 0
				//Add +1 to losses if 7 words are missed
				if (counter === 0) {
					document.getElementById("losses").innerHTML = losses + 1;
					console.log(losses);
					confirm("YOU LOST... play again?"); {
					losses++;
					counter = 7;
					correctLetters = [];
					wrongLetters = [];
					start();
					}
				}
			}
		}
	}

	start();
	checkLetter();
