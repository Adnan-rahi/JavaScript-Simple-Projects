const balance = document.getElementById("balance"),
  money_plus = document.getElementById("money-plus"),
  money_minus = document.getElementById("money-minus"),
  list = document.getElementById("list"),
  form = document.getElementById("form"),
  text_input = document.getElementById("text"),
  amount_input = document.getElementById("amount");

const saveLocally = JSON.parse(localStorage.getItem("transaction"));

let transactions =
  localStorage.getItem("transaction") !== null ? saveLocally : [];

// add New value to the list
function addTransactions(e) {
  e.preventDefault();

  if (text_input.value.trim() === "" || amount_input.value.trim() === "") {
    alert("Please fill the Inputs corectly");
  } else {
    const transaction = {
      id: getRandom(),
      text: text_input.value,
      amount: +amount_input.value,
    };

    console.log(transaction);

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();

    updateLocalStorage();
    text_input.value = "";
    amount_input.value = "";
  }
}

function getRandom() {
  return Math.floor(Math.random() * 100000000);
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";

  const listItem = document.createElement("li");

  listItem.classList.add(transaction.amount < 0 ? "minus" : "plus");

  listItem.innerHTML = `${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class='delete-btn' onClick='removeEntry(${
    transaction.id
  })'>x</button>`;

  list.appendChild(listItem);
}

function updateValues() {
  const amount = transactions.map((transaction) => transaction.amount);

  const total = amount.reduce((acc, item) => (item += acc), 0).toFixed(2);

  const income = amount
    .filter((item) => item > 0)
    .reduce((acc, item) => (item += acc), 0)
    .toFixed(2);

  const expense = (
    amount.filter((item) => item < 0).reduce((acc, item) => (item += acc), 0) *
    -1
  ).toFixed(2);

  balance.innerHTML = `$${total}`;
  money_plus.innerHTML = `$${income}`;
  money_minus.innerHTML = `$${expense}`;
}

function removeEntry(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();
  init();
}

function updateLocalStorage() {
  localStorage.setItem("transaction", JSON.stringify(transactions));
}

function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener("submit", addTransactions);
