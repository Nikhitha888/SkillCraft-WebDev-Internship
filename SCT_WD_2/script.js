const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";

// Button Click Events
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.innerText;

    if (value === "C") {
      currentInput = "";
      display.value = "";
    }
    else if (value === "=") {
      calculateResult();
    }
    else {
      currentInput += value;
      display.value = currentInput;
    }
  });
});

// Function to Calculate Result
function calculateResult() {
  try {
    currentInput = eval(currentInput).toString();
    display.value = currentInput;
  } catch (error) {
    display.value = "Error";
    currentInput = "";
  }
}

// Keyboard Support
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (
    "0123456789+-*/.".includes(key)
  ) {
    currentInput += key;
    display.value = currentInput;
  }

  else if (key === "Enter") {
    calculateResult();
  }

  else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
  }

  else if (key.toLowerCase() === "c") {
    currentInput = "";
    display.value = "";
  }
});