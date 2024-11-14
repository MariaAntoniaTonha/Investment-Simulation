// Initial variables
let balance = 1000;
const feedbackElement = document.getElementById('feedback');

// Define more stocks with initial prices and quantity owned
const stocks = {
  "TechCorp": { price: 50, owned: 0 },
  "HealthInc": { price: 30, owned: 0 },
  "FinanceCo": { price: 20, owned: 0 },
  "EnergyPlus": { price: 40, owned: 0 },
  "GreenGrow": { price: 25, owned: 0 },
  "AutoDrive": { price: 35, owned: 0 }
};

// Populate stock list and dropdown
const stockSelect = document.getElementById('stock-select');
const stockList = document.getElementById('stock-list');
updateDisplay();

function updateDisplay() {
  // Update balance
  document.getElementById('balance').textContent = balance.toFixed(2);
  stockList.innerHTML = '';
  stockSelect.innerHTML = '';

  // Populate the stock list and dropdown with updated values
  for (const stock in stocks) {
    stockSelect.innerHTML += `<option value="${stock}">${stock}</option>`;
    const li = document.createElement('li');
    li.textContent = `${stock}: $${stocks[stock].price.toFixed(2)} (Owned: ${stocks[stock].owned})`;
    stockList.appendChild(li);
  }
}

// Simulate stock price changes
function simulatePriceChange(stock) {
  const randomChange = (Math.random() - 0.5) * 10; // Random change between -5 and +5
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
    displayFeedback(`Bought 1 share of ${stock} at $${stocks[stock].price.toFixed(2)}`);
  } else {
    displayFeedback("Not enough balance to buy!", "error");
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
    displayFeedback(`Sold 1 share of ${stock} at $${stocks[stock].price.toFixed(2)}`);
  } else {
    displayFeedback("You don't own any of this stock!", "error");
  }
}

// Display feedback messages to the user
function displayFeedback(message, type = "success") {
  feedbackElement.textContent = message;
  feedbackElement.style.color = type === "error" ? "red" : "green";

  // Clear the feedback message after 3 seconds
  setTimeout(() => {
    feedbackElement.textContent = "";
  }, 3000);
}
