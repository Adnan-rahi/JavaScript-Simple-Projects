const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");
const rate = document.getElementById("rate");
const swap = document.getElementById("swap");

const calculate = () => {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(`https://open.exchangerate-api.com/v6/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      const getrate = data.rates[currency_two];

      rate.innerText = `1 ${currency_one} = ${getrate} ${currency_two}`;

      amountEl_two.value = (amountEl_one.value * getrate).toFixed(2);
    });
  // console.log(currency_one, currency_two);
};

currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();
