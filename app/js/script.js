const lettersPattern = /[a-z]/;
let currentGuessCount = 1;
let currentGuess = document.querySelector("#guess" + currentGuessCount);
let words = ["smart", "pizza", "aespa", "funny", "dance", "snack"];
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
    for (let i = 0; i < 5; i++) {
      revealTile(i, checkLetter(i));
    }
  }
});

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
  let currentTile = document.querySelector("#guessTile" + tileNumber);
  currentTile.innerText = letter;
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
  document.querySelector("#guessTile" + tileNumber).innerText = "";
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
  let tile = document.querySelector("#guessTile" + tileNum);
  if (status == "correct") {
    tile.classList.add("correct");
  } else if (status == "present") {
    tile.classList.add("present");
  } else if (status == "absent") {
    tile.classList.add("absent");
  }
};
