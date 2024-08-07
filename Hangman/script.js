const defaultWords = [
  "flexbox",
  "juni",
  "bootcamp",
  "javascript",
  "computer",
  "keyboard",
  "internet",
];

// let words;

// if (JSON.parse(localStorage.getItem("words")) === null) {
//   words = defaultWords;
// } else {
//   words = JSON.parse(localStorage.getItem("words"));
// }

const words = JSON.parse(localStorage.getItem("words")) || defaultWords;

let currentWord = "";
const guess = [];

const btnNewGame = document.querySelector("#btn-new-game");
const outputGuess = document.querySelector("#output");
const allButtons = document.querySelectorAll("#letters button");
const btnAdd = document.querySelector("#btn-add-word");

initGame();
btnNewGame.addEventListener("click", initGame);
btnAdd.addEventListener("click", addNewWord);

function initGame() {
  chooseRandomWord();
  initGuess();
  initEventListeners();
  enableAllButtons();
}

function chooseRandomWord() {
  // Einen random Eintrag aus dem Array words auswählen:

  // Random Zahl generieren und zur Ganzzahl machen
  // Niedrigste Zahl: 0
  // Höchste Zahl: Länge des Arrays - 1 (also letzter Index)
  // Math.floor rundet IMMER ab
  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words[randomIndex];
}

function initGuess() {
  // Guess-Array leeren, um Platz zu machen für nächsten Guess
  guess.length = 0;

  for (const letter of currentWord) {
    guess.push("_");
  }

  renderGuess();
}

function renderGuess() {
  const guessStr = guess.join("");

  outputGuess.innerText = guessStr;
}

function initEventListeners() {
  allButtons.forEach(function (button) {
    button.addEventListener("click", handleLetterClick);
  });
}

function enableAllButtons() {
  allButtons.forEach(function (button) {
    button.disabled = false;
  });
}

function handleLetterClick(event) {
  const clickedBtn = event.target;
  const letter = clickedBtn.innerText;

  // Geklickter Button: deaktivieren
  clickedBtn.disabled = true;

  // Kommt letter in currentWord vor?
  // Wenn nein: Funktion beenden
  if (currentWord.includes(letter) === false) {
    return;
  }

  // Wenn ja: Buchstabe soll an richtiger Stelle in #output ausgegeben werden
  checkGuess(letter);
}

function checkGuess(guessedLetter) {
  // jeden Buchstaben von currentWord angucken und mit letter vergleichen
  for (let i = 0; i < currentWord.length; i++) {
    const currentLetter = currentWord[i];

    // ist currentLetter gleich guessedLetter?
    if (currentLetter === guessedLetter) {
      // An der gleichen Stelle im guess Array, den Unterstrich austauschen gegen den geratenen Buchstaben
      guess[i] = guessedLetter;
    }

    renderGuess();
  }
}

function addNewWord(event) {
  event.preventDefault();

  const newWordField = document.querySelector("#new-word");
  const newWord = newWordField.value.toLowerCase();

  // Keine Worte mit
  // - Leerzeichen (bzw. Sonderzeichen) ✅
  // - Großbuchstaben ✅
  // - Umlaute (äöü) ✅
  // - Nummern ✅
  const notAcceptedCharacters = /[^a-z]/;
  if (newWord.match(notAcceptedCharacters)) return;

  // Neues Word zu word Array hinzufügen
  words.push(newWord);

  // Neues word Array im local storage speichern
  localStorage.setItem("words", JSON.stringify(words));

  newWordField.value = "";
}
