const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainButton = document.querySelector(".play-again");

const wordList = [
  {
    word: "guitar",
    hint: "A musical instrument with strings.",
  },
];

let currentWord, correctLetters, wrongGuessCount;

const maxGuesses = 6;

const resetGame = () => {
  correctLetters = [];
  wrongGuessCount = 0;

  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  keyboardDiv
    .querySelectorAll("button")
    .forEach((button) => (button.disabled = false));

  hangmanImage.src = `${window.location.origin}/static/images/hangman-${wrongGuessCount}.svg`;

  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");

  gameModal.classList.remove("show");
};

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;

  document.querySelector(".hint-text b").innerText = hint;

  resetGame();
};

const gameOver = (isVictory) => {
  setTimeout(() => {
    const modalText = isVictory
      ? `Excelente encontraste: `
      : `La palabra correcta era: `;
    gameModal.querySelector("h4").innerText = `${
      isVictory ? "Adivinaste la palabra!" : "Fin del juego."
    }`;
    gameModal.querySelector(
      ".victory-game"
    ).innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
  }, 300);
};

const initGame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerHTML = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    wrongGuessCount++;
    hangmanImage.src = `${window.location.origin}/static/images/hangman-${wrongGuessCount}.svg`;
  }

  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};

for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");

  button.innerText = String.fromCharCode(i);

  keyboardDiv.appendChild(button);

  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}

getRandomWord();

playAgainButton.addEventListener("click", getRandomWord);
