const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainButton = document.querySelector(".play-again");
const statsButton = document.querySelector(".stats-button");
const statsModal = document.querySelector(".stats-modal");
const statsExitButton = document.querySelector(".salir-stats-modal");
const difficultyEasyButton = document.querySelector(".easy");
const difficultyMediumButton = document.querySelector(".medium");
const difficultyHardButton = document.querySelector(".hard");

const wordList = [
  {
    word: "guitarra",
    hint: "Instrumento musical de cuerdas.",
  },
  {
    word: "manzana",
    hint: "Fruta roja comestible.",
  },
  {
    word: "perro",
    hint: "Animal doméstico leal.",
  },
  {
    word: "libro",
    hint: "Objeto con páginas para leer.",
  },
  {
    word: "casa",
    hint: "Lugar de residencia.",
  },
  {
    word: "luna",
    hint: "Satélite natural de la Tierra.",
  },
  {
    word: "sol",
    hint: "Estrella central de nuestro sistema solar.",
  },
  {
    word: "agua",
    hint: "Sustancia líquida vital para la vida.",
  },
  {
    word: "futbol",
    hint: "Deporte jugado con una pelota.",
  },
  {
    word: "avion",
    hint: "Medio de transporte aéreo.",
  },
  {
    word: "computadora",
    hint: "Dispositivo electrónico para procesar información.",
  },
  {
    word: "telefono",
    hint: "Dispositivo para comunicarse a distancia.",
  },
  {
    word: "ciudad",
    hint: "Área urbana densamente poblada.",
  },
  {
    word: "camion",
    hint: "Vehículo de transporte de carga.",
  },
  {
    word: "playa",
    hint: "Franja de arena junto al mar.",
  },
  {
    word: "bosque",
    hint: "Área extensa con árboles y vegetación.",
  },
  {
    word: "piano",
    hint: "Instrumento musical de teclado.",
  },
  {
    word: "nube",
    hint: "Masa visible de gotas de agua en suspensión.",
  },
  {
    word: "reloj",
    hint: "Dispositivo para medir el tiempo.",
  },
];

let currentWord, correctLetters;

let wrongGuessCount = 0;

let victoryCounter = 0;

let victoryWords = [];

const difficultyEasy = 6;

const difficultyMedium = 4;

const difficultyHard = 2;

let maxGuesses = difficultyEasy;

// Audio
const winAudio = new Audio();

const loseAudio = new Audio();

const resetGame = () => {
  correctLetters = [];
  wrongGuessCount = 0;

  difficultyEasyButton.disabled = false;
  difficultyMediumButton.disabled = false;
  difficultyHardButton.disabled = false;

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

  winAudio.src = `${window.location.origin}/static/audio/win.mp3`;
  loseAudio.src = `${window.location.origin}/static/audio/lose.mp3`;

  isVictory ? victoryCounter++ : victoryCounter;
  isVictory ? victoryWords.push(currentWord) : null;
  isVictory ? winAudio.play() : loseAudio.play();
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

  checkAndDisableButtons();

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

statsButton.addEventListener("click", () => {
  statsModal.classList.add("show");
  stats();
});

statsExitButton.addEventListener("click", () => {
  statsModal.classList.remove("show");
});

function checkAndDisableButtons() {
  if (wrongGuessCount > 0) {
    difficultyEasyButton.disabled = true;
    difficultyMediumButton.disabled = true;
    difficultyHardButton.disabled = true;
  } else {
    difficultyEasyButton.disabled = false;
    difficultyMediumButton.disabled = false;
    difficultyHardButton.disabled = false;
  }
}

difficultyEasyButton.addEventListener("click", () => {
  checkAndDisableButtons();
  maxGuesses = difficultyEasy;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
});

difficultyMediumButton.addEventListener("click", () => {
  checkAndDisableButtons();
  maxGuesses = difficultyMedium;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
});

difficultyHardButton.addEventListener("click", () => {
  checkAndDisableButtons();
  maxGuesses = difficultyHard;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
});

const stats = () => {
  const victoriesCount = document.querySelector(".victory-count");
  const victoriesWords = document.querySelector(".victory-words");

  victoriesCount.innerHTML = `Cantidad de veces ganadas: <b>${victoryCounter}</b>`;
  victoriesWords.innerHTML = `<li>${victoryWords.map(
    (word) => String(word).charAt(0).toUpperCase() + String(word).slice(1)
  )}</li>`;
};
