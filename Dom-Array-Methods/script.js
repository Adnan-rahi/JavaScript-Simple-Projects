const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleMoneyBtn = document.getElementById("double");
const millionaireBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

const getRandomUser = async () => {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
};

// Doble the user money function
const doubleMoney = () => {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
};

// Sort the Richest person above on the table

const sortRichest = () => {
  data.sort((a, b) => {
    return b.money - a.money;
  });

  updateDOM();
};

// array Fillter() method

const showMillionaire = () => {
  data = data.filter((user) => user.money > 1000000);

  updateDOM();
};

// Cauculate the total wealth of all user using reduce array method()

const totalWealth = () => {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total wealth: <strong>${moneyFormat(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl)
};

const addData = (obj) => {
  data.push(obj);

  updateDOM();
};

const updateDOM = (providedData = data) => {
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${moneyFormat(
      item.money
    )}`;
    main.appendChild(element);
  });
};

// set simple money as a money format

const moneyFormat = (number) =>
  "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");

getRandomUser();
getRandomUser();
getRandomUser();

addUserBtn.addEventListener("click", getRandomUser);
doubleMoneyBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortRichest);
millionaireBtn.addEventListener("click", showMillionaire);
calculateWealthBtn.addEventListener("click", totalWealth);
