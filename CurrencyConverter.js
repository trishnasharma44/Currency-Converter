const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// for (code in countryList) {
//   console.log(code, countryList[code]);   //countryList IS IN codes.js...code->currency code...countryList[code]->country code
// }

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name == "from" && currCode == "USD") {
      newOption.selected = "selected";
    } else if (select.name == "to" && currCode == "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  // evt.preventDefault(); //it will prevent default change in url while clicking on "Get Exchange Rate"
  let amount = document.querySelector(".amount input");
  let amountValue = amount.value;
  // console.log(amountValue);
  if (amountValue == "" || amountValue < 1) {
    amountValue = 1;
    amount.value = "1";
  }

  //console.log(fromCurr.value, toCurr.value);
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`; //toLowerCase because API doesn't recognise country name in capital letter
  let response = await fetch(URL);
  // console.log(response);
  let data = await response.json();
  // console.log(data);

  let rate = data[toCurr.value.toLowerCase()];
  // console.log(rate);

  let finalAmount = amountValue * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
  // console.log(element);           //will display after you click on the dropdown options
  let currCode = element.value;
  // console.log(currCode);
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
