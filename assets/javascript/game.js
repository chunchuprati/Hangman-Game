var wordlist = {
	peppa: {
      picture: "PeppaThePig.png"
    },
    geico: {
      picture: "geico.jpg"
    },
    zuma: {
      picture: "Zuma_PNG.png"
    },
    owlette: {
      picture: "Owlette.png"
    },
    catboy: {
      picture: "catboy.jpg"
    }
};

var wordToGuess = null;
var guessesLeft = 0; 
var lettersInWord = [];
var lettersGuessed = [];
var lettersMatched = [];
var numberofWins = 0; 

function initializeGame() {
	var wordsToPick = Object.keys(wordlist);
	wordToGuess = wordsToPick[Math.floor(Math.random()*wordsToPick.length)];
	lettersInWord = wordToGuess.split("");
	//console.log(lettersInWord);
	displayCurrentWordView(wordToGuess);
	guessesRemaining(wordToGuess);
};

function guessesRemaining(word) {
	guessesLeft = word.length + 3; 
	document.getElementById("guesses-remaining").innerHTML = guessesLeft;
};

function displayCurrentWordView(word) {
	var display = "";
	for (var i = 0; i < word.length; i++) {
		if (lettersMatched.indexOf(lettersInWord[i]) !== -1) {
			display += lettersInWord[i]; 
		} 
		else {
			display += "&nbsp_&nbsp";
		}
	}
		
	document.getElementById("current-word").innerHTML = display;
};

function updateView(letter) {
	if (guessesLeft === 0) {
      restartGame();
    }
    else {
    	updateNumberOfGuesses(letter);
    	updateMatchedGuesses(letter);
    	displayCurrentWordView(wordToGuess);
    	if(hasWon() === true) {
    		restartGame();
    	}
    }
};

function updateNumberOfGuesses(letter) {
	if((lettersGuessed.indexOf(letter) === -1) && (lettersInWord.indexOf(letter) === -1)) {
		lettersGuessed.push(letter);
		guessesLeft--;

		document.getElementById("guesses-remaining").innerHTML = guessesLeft;
		document.getElementById("guessed-letters").innerHTML = lettersGuessed.join(", ");
	}
};

function updateMatchedGuesses(letter) {
	for (var i = 0; i < lettersInWord.length; i++) {
		if ((letter === lettersInWord[i]) && (lettersMatched.indexOf(letter) === -1)) {
			lettersMatched.push(letter);
		}
	}
};

function restartGame() {
	document.getElementById("guessed-letters").innerHTML = "";
	wordToGuess = null;
	guessesLeft = 0; 
	lettersInWord = [];
	lettersGuessed = [];
	lettersMatched = [];
	// numberofWins = 0;
	
	initializeGame();
};

function hasWon() {
	var win;
	if(lettersMatched === 0) {
		win = false; 
	}
	else {
		win = true;
	}
	for (var i = 0; i < lettersInWord.length; i++) {
		if (lettersMatched.indexOf(lettersInWord[i]) === -1) {
			win = false;
		}
	}
	if(win) {
		numberofWins++;
		document.getElementById("wins").innerHTML = numberofWins; 
		document.getElementById("cartoon").innerHTML =
        "<img id='image' src='assets/images/" +
        wordlist[wordToGuess].picture + "'>";

        return true;
	}
	return false;
}

initializeGame();
document.onkeyup = function (event) {
	var letterEntered = String.fromCharCode(event.keyCode).toLowerCase();
	updateView(letterEntered);
};
