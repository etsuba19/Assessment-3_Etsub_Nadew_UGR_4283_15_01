document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const clearButton = document.getElementById("clear");
  const equalsButton = document.getElementById("equals");
  const numButtons = Array.from(document.getElementsByClassName("btn"));

  let previousInput = "";
  let currentInput = "";
  let operator = "";

  function updateDisplay() {
    display.value =
      previousInput + (operator ? ` ${operator} ` : "") + currentInput || 0;
  }

  numButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const value = e.target.dataset.value;
      if (["*", "-", "+", "/"].includes(value)) {
        if (currentInput === "") return;
        if (previousInput !== "") {
          calculate();
        }
        operator = value;
        previousInput = currentInput;
        currentInput = "";
      } else {
        currentInput += value;
      }
      updateDisplay();
    });
  });

  function calculate() {
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(curr)) {
      return;
    }

    let result;
    switch (operator) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "*":
        result = prev * curr;
        break;
      case "/":
        if (curr === 0) {
          alert("Cannot divide by zero");
          clearCalculator();
          return;
        }
        result = prev / curr;
        result = result.toFixed(2);
        break;
      default:
        return;
    }

    currentInput = result;
    operator = "";
    previousInput = "";
  }

  equalsButton.addEventListener("click", (e) => {
    calculate();
    updateDisplay();
  });

  clearButton.addEventListener("click", (e) => {
    currentInput = "";
    previousInput = "";
    operator = "";
    updateDisplay();
  });
});