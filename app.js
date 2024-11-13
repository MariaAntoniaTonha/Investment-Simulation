// Initial variables
let balance = 1000;
const stocks = {
  "TechCorp": { price: 50, owned: 0 },
  "HealthInc": { price: 30, owned: 0 },
  "FinanceCo": { price: 20, owned: 0 }
};

// Populate stock list and dropdown
const stockSelect = document.getElementById('stock-select');
const stockList = document.getElementById('stock-list');
updateDisplay();

function updateDisplay() {
  document.getElementById('balance').textContent = balance.toFixed(2);
  stockList.innerHTML = '';
  
  for (const stock in stocks) {
    stockSelect.innerHTML += `<option value="${stock}">${stock}</option>`;
    const li = document.createElement('li');
    li.textContent = `${stock}: $${stocks[stock].price} (Owned: ${stocks[stock].owned})`;
    stockList.appendChild(li);
  }
}

// Simulate stock price changes
function simulatePriceChange(stock) {
  const randomChange = (Math.random() - 0.5) * 10;
  stocks[stock].price = Math.max(1, stocks[stock].price + randomChange);
}

// Buy stock function
function buyStock() {
  const stock = stockSelect.value;
  if (balance >= stocks[stock].price) {
    stocks[stock].owned += 1;
    balance -= stocks[stock].price;
    simulatePriceChange(stock);
    updateDisplay();
  } else {
    alert("Not enough balance!");
  }
}

// Sell stock function
function sellStock() {
  const stock = stockSelect.value;
  if (stocks[stock].owned > 0) {
    stocks[stock].owned -= 1;
    balance += stocks[stock].price;
    simulatePriceChange(stock);
    updateDisplay();
  } else {
    alert("You don't own any of this stock!");
  }
}
