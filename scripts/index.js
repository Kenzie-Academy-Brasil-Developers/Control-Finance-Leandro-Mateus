import { insertedValues, valuesCategory } from "./valuesData.js";

const btnInsertValue = document.querySelector(".btnAddValue");
const inputNewValue = document.querySelector(".inputNewValue");
const sectionValues = document.querySelector("section");
const inputSaida = document.querySelector("#saida");
const inputEntrada = document.querySelector("#entrada");
const modalWrapper = document.querySelector(".modalWrapper");
let totalValue = document.querySelector(".totalValue");
const btnOpenModal = document.querySelectorAll(".btnOpenModal");

function insertNewValue() {
  btnOpenModal.forEach((elem) =>
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      btnInsertValue.addEventListener("click", (e) => {
        e.preventDefault();

        if (inputNewValue.value > 0) {
          btnInsertValue.disabled = true;
          if (inputEntrada.checked === true || inputSaida.checked === true) {
            btnInsertValue.disabled = false;
          }

          let data = {
            id: insertedValues.length + 1,
            value: Number(inputNewValue.value),
            categoryID: 0,
          };

          if (inputEntrada.checked === true) {
            data.categoryID = 1;
          } else if (inputSaida.checked === true) {
            data.categoryID = 2;
          }

          insertedValues.push(data);

          modalWrapper.classList.add("hidden");
          renderElements(insertedValues);

          removeValue();
        }
      });
    })
  );
}

function renderElements(values) {
  sectionValues.innerHTML = "";
  
  if (insertedValues.length === 0) {
    const DivOpnModal = document.createElement("div");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");

    DivOpnModal.classList.add("noValuesRegistered");
    p1.classList.add("p1");
    p2.classList.add("p2");

    p1.innerText = "Nenhum valor cadastrado";
    p2.innerText = "Registre um novo valor";

    DivOpnModal.append(p1, p2);
    sectionValues.append(DivOpnModal);
  }

  values.forEach((elem) => {
    const li = document.createElement("li");

    const divMoney1 = document.createElement("div")
    const realSimbol = document.createElement("p")
    const money = document.createElement("p");

    const divMoney2 = document.createElement("div")
    const moneyType = document.createElement("p");
    const trashIcon = document.createElement("img");

    divMoney1.classList.add("divMoney");
    divMoney2.classList.add("divMoney2");
    realSimbol.classList.add("value");
    money.classList.add("value");
    moneyType.classList.add("valueType");
    trashIcon.classList.add("trash");

    realSimbol.innerText = "R$"
    money.innerText = Number(elem.value).toFixed(2);
    trashIcon.src = "./assets/trash.svg";

    if (elem.categoryID === 1) {
      moneyType.innerText = valuesCategory[0];
    } else {
      moneyType.innerText = valuesCategory[1];
    }

    li.setAttribute("id", elem.id);
    divMoney1.append(realSimbol, money);
    divMoney2.append(moneyType, trashIcon);
    li.append(divMoney1, divMoney2);
    sectionValues.append(li);

    inputNewValue.value = "";
    inputSaida.checked = false;
    inputEntrada.checked = false;

    totalPrice(insertedValues);
  });
}

function totalPrice(array) {
  let baseValue = 0;

  array.forEach((elem) => {
    if (elem.categoryID === 2) {
      baseValue -= elem.value;
    } else {
      baseValue += elem.value;
    }
  });

  totalValue.innerText = Number(baseValue).toFixed(2);
}

function removeValue() {
  const removeItem = document.querySelectorAll(".trash");

  removeItem.forEach((elem) => {
    elem.addEventListener("click", () => {
      let liToRemove = elem.parentElement.parentElement;
      let elementIndex = liToRemove.id - 1;
      
console.log(liToRemove.childNodes[0].childNodes[1].innerText)
      if (liToRemove.childNodes[1].childNodes[0].innerText === "Entrada") {
        totalValue.innerText =
          parseFloat(totalValue.innerText) -
          parseFloat(liToRemove.childNodes[0].childNodes[1].innerText);
      } else if (liToRemove.childNodes[1].childNodes[0].innerText === "Saída") {
        totalValue.innerText =
          parseFloat(totalValue.innerText) +
          parseFloat(liToRemove.childNodes[0].childNodes[1].innerText);
      }

      insertedValues.splice(elementIndex, 1);
      liToRemove.remove();
    });
  });
}

function FilterbyCategory() {
  const btnTodos = document.querySelector("#todos");
  const btnEntradas = document.querySelector("#entradas");
  const btnSaidas = document.querySelector("#saidas");

  btnEntradas.addEventListener("click", () => {
    let entradasFiltered = insertedValues.filter(
      (elem) => elem.categoryID === 1
    );
    renderElements(entradasFiltered);
    totalPrice(entradasFiltered);
    removeValue();
  });

  btnSaidas.addEventListener("click", () => {
    let saidasFiltered = insertedValues.filter((elem) => elem.categoryID === 2);
    renderElements(saidasFiltered);
    totalPrice(saidasFiltered);
    removeValue();
  });

  btnTodos.addEventListener("click", () => {
    renderElements(insertedValues);
    totalPrice(insertedValues);
    removeValue();
  });
}

insertNewValue();
totalPrice(insertedValues);
renderElements(insertedValues);
removeValue();
FilterbyCategory();
