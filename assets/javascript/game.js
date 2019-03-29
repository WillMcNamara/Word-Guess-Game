var words = ["one", "two", "three"];
var validGuesses = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];
var userGuesses = [];
var hiddenWord;
var gameStarted = false;
var wordUI = []
var newWord;

document.onkeyup = function(event) {

    //get variable for adjusting text, updates after every keystroke
    var score = document.getElementById("wins").textContent; 
    var guessedLetters = document.getElementById("guessedLetters").textContent;
    var remaining = document.getElementById("remaining").textContent;
    var word = document.getElementById("currentword").textContent;
        console.log(score)

    //select a random word after initial keypress and start game
    if (gameStarted === false) {
        hiddenWord = words[Math.floor(Math.random()*words.length)];
        document.getElementById("remaining").textContent = 7;
        gameStarted = true;
        console.log(hiddenWord) 
    
        //add "_ "s for the length of the hidden word
        for(i = 0; i < hiddenWord.length; i++) {
            wordUI.push("_ ");
            document.getElementById("currentword").textContent = word + wordUI[i];
            word = document.getElementById("currentword").textContent;
        }
    }

    //record guess if valid and add it to current guesses
    else {
    var userGuess = event.key;
        if (validGuesses.indexOf(userGuess) > -1 && userGuesses.indexOf(userGuess) === -1) {
            userGuesses.push(userGuess);
            document.getElementById("guessedLetters").textContent = guessedLetters + userGuess + " ";
            
            //check if guess is in the word and reveal letters
            if (hiddenWord.includes(userGuess) === true) {
                //reveal userguess letters
                for(i = 0; i < hiddenWord.length; i++) {
                    if (hiddenWord.charAt(i) === userGuess) {
                        wordUI.splice(i, 1, userGuess);
                        console.log(wordUI)
                    }
                document.getElementById("currentword").textContent = newWord + wordUI[i];
                newWord = document.getElementById("currentword").textContent;
                }
            }
            //subtract a guess for wrong letter
            else {
                document.getElementById("remaining").textContent = parseInt(remaining) - 1;
            }
        }
    }

        // reset game on win, add 1 to score
        if (word === hiddenWord) {
            document.getElementById("wins") = score++;
            guessedLetters = "";
            document.getElementById("remaining").textContent = 7;
            hiddenWord = words[Math.floor(Math.random()*words.length)];
            userGuesses = [];
        }

        //reset game on loss
        if (parseInt(remaining) === 0) {
            document.getElementById("guessedLetters").textContent = "";
            document.getElementById("remaining").textContent = 7;
            hiddenWord = words[Math.floor(Math.random()*words.length)];
            userGuesses = [];
        }
}