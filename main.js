const cardFrom = document.getElementById("card-form");
const inputElements = Array.from(document.querySelectorAll('div[class^="input"] input'));
const numberInput = document.getElementById("number");

const completeSection = document.querySelector(".complete");
const continueButton = document.getElementById("continue");

const card = {
  cvc: { element: document.getElementById("cvc-card"), maxLength: 3, default: "000", leadingZero: true },
  number: { element: document.getElementById("number-card"), maxLength: 19, default: "0000 0000 0000 0000" },
  name: { element: document.getElementById("name-card"), maxLength: 30, default: "Jane Appleseed" },
  month: { element: document.getElementById("month-card"), maxLength: 2, default: "00", leadingZero: true },
  year: { element: document.getElementById("year-card"), maxLength: 2, default: "00", leadingZero: true }
};

function changeInputChandler(e){
  e.target.value = e.target.value.slice(0, card[e.target.name].maxLength);
  const name = e.target.name;
  if(e.target.value){
    card[name].element.innerText = card[name].leadingZero ? e.target.value.padStart(card[name].maxLength, "0") : e.target.value;
  }else card[name].element.innerText = card[name].default;
}

function clearCard(){
  for(const key in card) card[key].element.innerText = card[key].default;
  inputElements.forEach(inputElement => {
    inputElement.value = "";
    inputElement.classList.remove("error");
    document.querySelector(`.${inputElement.name}__error`).innerText = "";
  });
}

numberInput.addEventListener("keypress", e => e.target.value = e.target.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 '));

inputElements.forEach(inputElement => inputElement.addEventListener("input", changeInputChandler));

cardFrom.addEventListener("submit", e => {
  e.preventDefault();
  let flag = true;

  inputElements.forEach(inputElement => {
    //remove error
    const errorMessage = document.querySelector(`.${inputElement.name}__error`);
    errorMessage.innerText = "";
    inputElement.classList.remove("error");

    if(!inputElement.value){
      flag = false;
      inputElement.classList.add("error");
      errorMessage.innerText = "Can't be blank";
    }else if(inputElement.name === "number"){
      if(inputElement.value.length < card.number.maxLength || !/^(?=.*\d)[\d ]+$/.test(inputElement.value)){
        flag = false;
        inputElement.classList.add("error");
        errorMessage.innerText = "Wrong format, must be only 16 digits";
      }
    }
  });

  if(flag){
    cardFrom.classList.remove("visible");
    completeSection.classList.add("visible");
  }
});

continueButton.addEventListener("click", e => {
  clearCard();
  cardFrom.classList.add("visible");
  completeSection.classList.remove("visible");
});