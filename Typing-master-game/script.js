const word = document.getElementById("word");
const textInputEl = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endGameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of words for game
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

let randomWord;

let score = 0;

let time = 10;

let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

textInputEl.focus();

const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add Words to Dom

function addWordToDom() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time == 0) {
    clearInterval(timeInterval);

    gameOver();
  }
}

function gameOver() {
  endGameEl.innerHTML = `
    <h1>Time's Up</h1>
    <p>Your Final Scroe is: ${score}</p>
    <button onclick='location.reload()'>Reload</button>
    `;
  endGameEl.style.display = "flex";
}

addWordToDom();

// Event listener for typing
textInputEl.addEventListener("input", (e) => {
  const inputText = e.target.value;

  if (inputText === randomWord) {
    addWordToDom();
    updateScore();

    e.target.value = "";

    if (difficulty === 'hard') {
        time += 1.5;
    } else if (difficulty === 'medium') {
        time += 3;
    } else {
        time += 5;
    }

    updateTime();
  }
});

// for seetting button toggle

settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

// Setting select form event

settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;

  localStorage.setItem("difficulty", difficulty);
});
