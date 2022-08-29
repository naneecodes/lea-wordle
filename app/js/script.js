const lettersPattern = /[a-z]/;
let currentGuessCount = 1;
let currentGuess = document.querySelector("#guess" + currentGuessCount);
// let currentLetters = currentGuess.dataset.letters;
//detect keypress (letter, backspace, other)
document.addEventListener("keydown", (e) => {
  //If a letter
  let keypress = e.key;
  if (keypress.length == 1 && lettersPattern.test(e.key)) {
    console.log("current guess count: " + currentGuessCount);
    updateLetters(keypress);
  }

  //If a backspace
});

//Update "letters" attribute
const updateLetters = (letter) => {
  currentGuess.dataset.letters = currentGuess.dataset.letters + letter;
};

//Update tile markeup
const updateTiles = () => {};

//Delete last letter
