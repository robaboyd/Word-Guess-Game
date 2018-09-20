//global variables
var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
var guessedLetters = []; // the letters that the user has used
var correctGuesses = [];
var animals = [
    {
        name: 'elephant',
        hint1: 'Big with grey coloring.',
        hint2: 'Big ears.'
    },
    {
        name: 'wolf',
        hint1: 'Four legs, hunt in packs',
        hint2: 'Lives in a social hierarchy.'
    },
    {
        name: 'aardvark',
        hint1: 'Big ears, nocturnal.',
        hint2: 'Kind of looks like an Anteater.'
    },
    {
        name: 'lion',
        hint1: 'King.',
        hint2: 'Species: cat'
    },
    {
        name: 'porcupine',
        hint1: 'Pointy',
        hint2: 'Small'
    }
];


//objects
//base game
game = {
    startGame: function (animal) {
        //reset variables
        game.answer = undefined;
        game.lives = 6;
        guessedLetters = [];
        correctGuesses = [];
        game.hint1 = "";
        game.hint2 = "";
        html.innerHTML('guessedLetters', guessedLetters);
        html.innerHTML('hint1', "");
        html.innerHTML('hint2', "");
        html.innerHTML('wins', game.wins);
        html.innerHTML('losses', game.losses);
        var index = Math.floor((Math.random() * animal.length));

        //split the random word and put into array 
        game.answer = animal[index].name.split('');
        game.hint1 = animal[index].hint1;
        game.hint2 = animal[index].hint2;

        //push _ into correctGuesses array for answer length
        for (let i = 0; i < game.answer.length; i++) {
            correctGuesses.push("_");
        }
        //display the correctGuesses array on screen
        html.innerHTML('answerDisplay', null, correctGuesses);

        //display lives
        html.innerHTML('lives', game.lives + " lives");

        //display hidden html
        html.displayFlex('game');
    },
    checkWin: function (answer, guess) {
        for (var i = 0; i < game.answer.length; i++) {
            if (game.answer[i] !== guess[i]) {
                return false;
            }
        }
        game.wins++
        alert("You win!");
        game.startGame(animals);
    },
    checkLose: function () {
        //show hints
        if (game.lives === 4) {
            html.innerHTML('hint1', "You might lose. Have a hint: " + game.hint1);
        }

        if (game.lives === 2) {
            html.innerHTML('hint2', "You're really not going to get it. Last Hint: " + game.hint2);
        }

        //check if user lost
        if (game.lives === 0) {
            game.losses++;
            alert("You Lose");
            game.startGame(animals);
        }
    },
    usedList: function (letter) {
        guessedLetters.push(letter);
        html.innerHTML('guessedLetters', guessedLetters);
    },
    showCorrect: function (key) {
        answerLowercase = array.arrayLowerCase(game.answer);
        answerLowercase.forEach(function (letter, i) {
            if (letter === key) {

                correctGuesses[i] = key;
            }
        })
        html.innerHTML('answerDisplay', null, correctGuesses);

    },
    lives: "",
    hint1: "",
    hint2: "",
    answer: undefined,
    wins: 0,
    losses: 0
}

//methods that effect html
html = {
    displayFlex: function (id) {
        document.getElementById(id).style.display = 'flex';
    },
    innerHTML: function (id, text, array) {
        if (array) {
            return document.getElementById(id).innerHTML = array.join('');;
        }
        return document.getElementById(id).innerHTML = text;
    },

}

//methods that handle arrays
array = {
    letterExists: function (array, letter) {
        if (array.indexOf(letter) === -1) {
            return true
        }
        return false
    },
    checkAlphabet: function (letter) {
        for (let i = 0; i < alphabet.length; i++) {
            if (alphabet[i] === letter) {
                return true;
            }
        }
        return false;
    },
    arrayLowerCase: function (array) {
        array.forEach(function (letter, i) {
            lowercase = letter.toLowerCase();
            game.answer[i] = lowercase;
        })
        return array;
    }

}

//game start onclick
document.getElementById('startBtn').addEventListener('click', function () {
    game.startGame(animals);
    this.style.display = "none";
});

//key event
document.onkeyup = function (event) {

    if (game.answer === undefined) {
        document.getElementById('startBtn').style.display = "none";
        game.startGame(animals);
    }

    var keyPress = event.key
    var answerLowercase = array.arrayLowerCase(game.answer);

    // make sure the key was a letter 
    if (array.checkAlphabet(keyPress)) {
        //check if the letter has been used
        if (array.letterExists(guessedLetters, keyPress)) {

            if (array.letterExists(answerLowercase, keyPress)) {

                //if it doesnt exist
                game.lives--;
                //push into used letters
                game.usedList(keyPress);
                html.innerHTML('lives', game.lives + " lives");
                game.checkLose();
            }
            else {
                //if letter exists in word
                game.showCorrect(keyPress);
                //check if user won
                game.checkWin(answerLowercase, correctGuesses);
            }
        }

    }
} 