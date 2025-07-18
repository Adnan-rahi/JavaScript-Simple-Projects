const cardsContainer = document.getElementById("cards-container"),
  prevBtn = document.getElementById("prev"),
  nextBtn = document.getElementById("next"),
  currentEl = document.getElementById("current"),
  showBtn = document.getElementById("show"),
  hideBtn = document.getElementById("hide"),
  questionEl = document.getElementById("question"),
  answerEl = document.getElementById("answer"),
  addCardBtn = document.getElementById("add-card"),
  clearBtn = document.getElementById("clear"),
  addContainer = document.getElementById("add-container");

let currentActiveCards = 0;

let cardsEl = [];

const cardsData = getCardsData();

// const cardsData = [
//   {
//     question: "What must a variable begin with?",
//     answer: "A letter, $ or _",
//   },
//   {
//     question: "What is a variable?",
//     answer: "Container for a piece of data",
//   },
//   {
//     question: "Example of Case Sensitive Variable",
//     answer: "thisIsAVariable",
//   },
// ];

function createCards() {
  cardsData.forEach((data, index) => createcard(data, index));
}

function createcard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  if (index === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `
 <div class="inner-card">
          <div class="inner-card-front">
            <p>
              ${data.question}
            </p>
          </div>
          <div class="inner-card-back">
            <p>
              ${data.answer}
            </p>
          </div>
`;

  card.addEventListener("click", () => {
    card.classList.toggle("show-answer");
  });

  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

function updateCurrentText() {
  currentEl.innerText = `${currentActiveCards + 1}/${cardsEl.length}`;
}

function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));

  return cards === null ? [] : cards;
}

function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

createCards();

nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCards].className = "card left";

  currentActiveCards = currentActiveCards + 1;

  if (currentActiveCards > cardsEl.length - 1) {
    currentActiveCards = cardsEl.length - 1;
  }

  cardsEl[currentActiveCards].className = "card active";

  updateCurrentText();
});

prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCards].className = "card right";

  currentActiveCards = currentActiveCards - 1;

  if (currentActiveCards < 0) {
    currentActiveCards = 0;
  }

  cardsEl[currentActiveCards].className = "card active";

  updateCurrentText();
});

showBtn.addEventListener("click", () => addContainer.classList.add("show"));

hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));

addCardBtn.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };

    createcard(newCard);

    question.value = "";
    answer.value = "";

    addContainer.classList.remove("show");
    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});


clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload()
})