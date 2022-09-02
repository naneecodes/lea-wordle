const lettersPattern = /[a-z]/;
let currentGuessCount = 1;
let currentGuess = document.querySelector("#guess" + currentGuessCount);
let words = ["smart"];
let solutionWord = "";

const chooseWord = () => {
  //choose random word from array
  let randomItem = Math.floor(Math.random() * words.length - 1) + 1;
  solutionWord = words[randomItem];
};

chooseWord();
//detect keypress (letter, backspace, other)
document.addEventListener("keydown", (e) => {
  //If a letter
  let keypress = e.key;
  if (
    keypress.length == 1 &&
    lettersPattern.test(e.key) &&
    currentGuess.dataset.letters.length < 5
  ) {
    updateLetters(keypress);
  }
  //If a backspace
  else if (e.key == "Backspace" && currentGuess.dataset.letters != "") {
    deleteFromLetters(keypress);
  }
  //If enter
  else if (e.key == "Enter" && currentGuess.dataset.letters.length == 5) {
    submitGuess();
  }
});

const submitGuess = () => {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      revealTile(i, checkLetter(i));
    }, i * 200);
  }
};

const checkIfGuessComplete = (i) => {
  if (i == 4) {
    checkWin();
  }
};
const jumpTiles = () => {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      let currentTile = document.querySelector(
        "#guess" + currentGuessCount + "Tile" + (i + 1)
      );
      currentTile.classList.add("jump");
    }, i * 200);
  }
};

const checkWin = () => {
  if (solutionWord == currentGuess.dataset.letters) {
    console.log("match!");
    setTimeout(() => {
      jumpTiles();
    }, 500);
  } else {
    currentGuessCount = currentGuessCount + 1;
    currentGuess = document.querySelector("#guess" + currentGuessCount);
    console.log("no match");
  }
};

//Update "letters" attribute
const updateLetters = (letter) => {
  let oldLetters = currentGuess.dataset.letters;
  let newLetters = oldLetters + letter;
  let currentTile = newLetters.length;
  currentGuess.dataset.letters = newLetters;
  updateTiles(currentTile, letter);
};

//Update tile markeup
const updateTiles = (tileNumber, letter) => {
  let currentTile = document.querySelector(
    "#guess" + currentGuessCount + "Tile" + tileNumber
  );
  currentTile.innerText = letter;
  currentTile.classList.add("has-letter");
};

//Backspace - Delete last letter
const deleteFromLetters = () => {
  //remove last letter from data-letters
  let oldLetters = currentGuess.dataset.letters;
  let newLetters = oldLetters.slice(0, -1);
  currentGuess.dataset.letters = newLetters;
  deleteFromTiles(oldLetters.length);
};

//Backspace - Delete tile markup
const deleteFromTiles = (tileNumber) => {
  //remove markup from last tile
  let currentTile = document.querySelector(
    "#guess" + currentGuessCount + "Tile" + tileNumber
  );
  currentTile.innerText = "";
  currentTile.classList.remove("has-letter");
};

//Check letter to solution
//parameter = letter position in word
const checkLetter = (position) => {
  let guessedLetter = currentGuess.dataset.letters.charAt(position);
  let solutionLetter = solutionWord.charAt(position);

  //if letters match, return "correct"
  if (guessedLetter == solutionLetter) {
    return "correct";
  }
  //if not a match and letter exists in solution word, return "present"
  //if not a match and letter does NOT exist in solution word, return "absent"
  else {
    return checkLetterExists(guessedLetter) ? "present" : "absent";
  }
};

const checkLetterExists = (letter) => {
  return solutionWord.includes(letter);
};

//Reveal tile
const revealTile = (i, status) => {
  let tileNum = i + 1;
  flipTile(tileNum, status);
  checkIfGuessComplete(i);
};

const flipTile = (tileNum, status) => {
  let tile = document.querySelector(
    "#guess" + currentGuessCount + "Tile" + tileNum
  );
  tile.classList.add("flip-in");
  setTimeout(() => {
    tile.classList.add(status);
  }, 250);
  setTimeout(() => {
    tile.classList.remove("flip-in");
    tile.classList.add("flip-out");
  }, 250);
  setTimeout(() => {
    tile.classList.remove("flip-out");
  }, 1500);
};
