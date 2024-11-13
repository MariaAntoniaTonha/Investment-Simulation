<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Investment Simulation</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Investment Simulation</h1>
  <div id="portfolio">
    <h2>Your Portfolio</h2>
    <p>Balance: $<span id="balance">1000</span></p>
    <ul id="stock-list"></ul>
  </div>
  <div id="trade">
    <h2>Trade Stocks</h2>
    <label for="stock-select">Choose a stock:</label>
    <select id="stock-select"></select>
    <button onclick="buyStock()">Buy</button>
    <button onclick="sellStock()">Sell</button>
  </div>
  <script src="app.js"></script>
</body>
</html>

body {
  font-family: Arial, sans-serif;
  text-align: center;
}

h1 {
  color: #333;
}

#portfolio, #trade {
  border: 1px solid #ddd;
  margin: 20px;
  padding: 20px;
  display: inline-block;
  width: 300px;
}

button {
  margin: 5px;
}

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
