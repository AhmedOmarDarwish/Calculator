let display = document.getElementById("display");
let currentInput = "";

function appendDigit(digit) {
  if (currentInput === "0" && digit !== ".") {
    currentInput = "";
  }
  currentInput += digit;
  updateDisplay();
}

function appendOperator(operator) {
  if (currentInput === "" || /[+\-*/%]$/.test(currentInput)) {
    return;
  }
  currentInput += operator;
  updateDisplay();
}

function clearDisplay() {
  currentInput = "0";
  updateDisplay();
}

function deleteDigit() {
  currentInput = currentInput.slice(0, -1) || "0";
  updateDisplay();
}

function calculate() {
  try {
    //Claer if last char have [+\-*/%]
    if (/[+\-*/%]$/.test(currentInput.slice(-1))) {
      deleteDigit();
    }
    currentInput = eval(currentInput.replace(/÷/g, "/").replace(/×/g, "*"))
      .toFixed(5)
      .toString();
    updateDisplay();
  } catch {
    currentInput = "Error";
    updateDisplay();
    setTimeout(clearDisplay, 1000);
  }
}

function updateDisplay() {
  display.textContent = currentInput || "0";
}

//Keyboard Press
document.body.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    calculate();
  } else if (/^[0-9.]$/i.test(event.key)) {
    appendDigit(event.key);
  } else if (/[+\-*/%]$/.test(event.key)) {
    appendOperator(event.key);
  } else if (event.key === "Backspace" || event.key === "Delete") {
    deleteDigit();
  } else if (event.key === "Escape") {
    clearDisplay();
  }
  //Test Keydown
  console.log(event);
});
