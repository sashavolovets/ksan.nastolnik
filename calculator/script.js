const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
let current = '0';
let previous = null;
let operator = null;
let overwrite = true;

function updateDisplay() {
  display.textContent = current;
}

function inputDigit(d) {
  if (overwrite) {
    current = d;
    overwrite = false;
  } else {
    if (current === '0' && d === '0') return;
    current = current + d;
  }
}

function inputDecimal() {
  if (overwrite) {
    current = '0.';
    overwrite = false;
    return;
  }
  if (!current.includes('.')) current += '.';
}

function clearAll() {
  current = '0';
  previous = null;
  operator = null;
  overwrite = true;
}

function deleteLast() {
  if (overwrite) {
    current = '0';
    overwrite = true;
    return;
  }
  if (current.length === 1) {
    current = '0';
    overwrite = true;
  } else {
    current = current.slice(0, -1);
  }
}

function chooseOperator(op) {
  if (operator && !overwrite) {
    compute();
  }
  previous = current;
  operator = op;
  overwrite = true;
}

function compute() {
  if (operator == null || previous == null) return;
  const a = parseFloat(previous);
  const b = parseFloat(current);
  let result = 0;
  switch (operator) {
    case '+': result = a + b; break;
    case '-': result = a - b; break;
    case '*': result = a * b; break;
    case '/': result = b === 0 ? 'Error' : a / b; break;
  }
  current = String(result);
  operator = null;
  previous = null;
  overwrite = true;
}

buttons.forEach(btn => {
  const action = btn.dataset.action;
  btn.addEventListener('click', () => {
    const val = btn.textContent;
    if (!action) {
      inputDigit(val);
      updateDisplay();
      return;
    }
    switch (action) {
      case 'decimal':
        inputDecimal();
        updateDisplay();
        break;
      case 'clear':
        clearAll();
        updateDisplay();
        break;
      case 'delete':
        deleteLast();
        updateDisplay();
        break;
      case 'operator':
        chooseOperator(val);
        updateDisplay();
        break;
      case 'equals':
        compute();
        updateDisplay();
        break;
    }
  });
});

updateDisplay();
