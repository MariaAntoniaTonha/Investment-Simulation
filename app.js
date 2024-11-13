// Initial variables
let balance = 1000;
const feedbackElement = document.getElementById('feedback');
const stockInfoElement = document.getElementById('stock-info');
const stockChartElement = document.getElementById('stockChart').getContext('2d');

// Define stocks with descriptions, initial prices, quantity owned, and price history
const stocks = {
  "TechCorp": { price: 50, owned: 0, description: "Leading tech company", history: [50] },
  "HealthInc": { price: 30, owned: 0, description: "Healthcare services", history: [30] },
  "FinanceCo": { price: 20, owned: 0, description: "Financial services firm", history: [20] },
  "EnergyPlus": { price: 40, owned: 0, description: "Renewable energy provider", history: [40] },
  "GreenGrow": { price: 25, owned: 0, description: "Sustainable agriculture", history: [25] },
  "AutoDrive": { price: 35, owned: 0, description: "Automated vehicle producer", history: [35] }
};

// Initialize the chart
let stockChart = new Chart(stockChartElement, {
  type: 'line',
  data: {
    labels: [0], // Initial time label
    datasets: [
      {
        label: 'Stock Price',
        data: stocks["TechCorp"].history, // Start with TechCorp's price history
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Transaction Count'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Price ($)'
        }
      }
    }
  }
});

// Function to update the chart with a new stock's history
function updateChart(stock) {
  const stockData = stocks[stock].history;
  stockChart.data.labels = Array.from({ length: stockData.length }, (_, i) => i);
  stockChart.data.datasets[0].data = stockData;
  stockChart.update();
}

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

// Show selected stock information and update the chart
stockSelect.addEventListener("change", () => {
  const stock = stockSelect.value;
  const { price, description } = stocks[stock];
  stockInfoElement.textContent = `${stock} - ${description}, Current Price: $${price.toFixed(2)}`;
  updateChart(stock);
});

// Simulate stock price changes
function simulatePriceChange(stock) {
  const randomChange = (Math.random() - 0.5) * 10; // Random change between -5 and +5
  stocks[stock].price = Math.max(1, stocks[stock].price + randomChange);
  stocks[stock].history.push(stocks[stock].price); // Update history with the new price
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
    updateChart(stock); // Update the chart after buying
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
    updateChart(stock); // Update the chart after selling
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

