// Initial variables
let balance = 1000;
const feedbackElement = document.getElementById('feedback');
const stockInfoElement = document.getElementById('stock-info');

// Define stocks with descriptions, initial prices, and quantity owned
const stocks = {
  "TechCorp": { price: 50, owned: 0, description: "Leading tech company" },
  "HealthInc": { price: 30, owned: 0, description: "Healthcare services" },
  "FinanceCo": { price: 20, owned: 0, description: "Financial services firm" },
  "EnergyPlus": { price: 40, owned: 0, description: "Renewable energy provider" },
  "GreenGrow": { price: 25, owned: 0, description: "Sustainable agriculture" },
  "AutoDrive": { price: 35, owned: 0, description: "Automated vehicle producer" }
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

  // Populate the stock list and dropdown with unique values
  for (const stock in stocks) {
    const { price, owned, description } = stocks[stock];
    
    // Update the portfolio display
    const li = document.createElement('li');
    li.textContent = `${stock}: $${price.toFixed(2)} (Owned: ${owned}) - ${description}`;
    stockList.appendChild(li);
    
    // Update the dropdown menu
    const option = document.createElement('option');
    option.value = stock;
    option.textContent = stock;
    stockSelect.appendChild(option);
  }
}

// Show selected stock information when changed
stockSelect.addEventListener("change", () => {
  const stock = stockSelect.value;
  const { price, description } = stocks[stock];
  stockInfoElement.textContent = `${stock} - ${description}, Current Price: $${price.toFixed(2)}`;
});

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
    displayFeedback(`Bought 1 share of ${stock} at $${stocks[stock].price.toFixed(2)}`, "success");
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
    displayFeedback(`Sold 1 share of ${stock} at $${stocks[stock].price.toFixed(2)}`, "success");
  } else {
    displayFeedback("You don't own any of this stock!", "error");
  }
}

// Display feedback messages to the user
function displayFeedback(message, type = "success") {
  feedbackElement.textContent = message;
  feedbackElement.className = type === "error" ? "error" : "feedback";

  // Clear the feedback message after 3 seconds
  setTimeout(() => {
    feedbackElement.textContent = "";
  }, 3000);
}


