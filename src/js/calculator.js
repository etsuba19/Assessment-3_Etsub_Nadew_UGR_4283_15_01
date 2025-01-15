document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const clearsign = document.getElementById("clear");
  const equalsign = document.getElementById("equals");
  const numbuttons = Array.from(document.getElementsByClassName("btn"));

  let previousInput = "";
  let currentInput = "";
  let operator = "";
  let resetOnNextInput = false;

  function updateDisplay() {
    // display.value = currentInput || previousInput || "0";
    display.value = previousInput + (operator ? ` ${operator} ` : "") + currentInput;
    if (!display.value.trim()) display.value = "0";
  }

  numbuttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const value = e.target.dataset.value;

      if (["+", "-", "/", "*"].includes(value)) {
        if (currentInput === "") return;
        if (resetOnNextInput) resetOnNextInput = false;
        if (previousInput !== "") {
          calculate();
        }

        operator = value;
        previousInput = currentInput;
        currentInput = "";

      } else {
        if (resetOnNextInput) {
          currentInput = "";
          resetOnNextInput = false;
        }
        currentInput += value;
      }
      updateDisplay();
    });
  });
  
  function resetCalculator(){
    previousInput = "";
    currentInput = "";
    operator = "";
  }

  function calculate() {
    let result = 0;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    // exception handling
    if (isNaN(prev) || isNaN(curr)) return;

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
        if (curr === 0){
          currentInput = "Undefined";
          updateDisplay();
          resetCalculator()
          return;
        }
        result = prev / curr;
        break;
      default:
        return;
    }
    currentInput = parseFloat(result.toFixed(2)).toString();
    previousInput = "";
    operator = "";
    resetOnNextInput = true;
    updateDisplay();
  }

  equalsign.addEventListener("click", (e) => {
    calculate();
  });

  clearsign.addEventListener("click", (e) => {
    resetCalculator();
    resetOnNextInput = false;
    updateDisplay();
  });
});