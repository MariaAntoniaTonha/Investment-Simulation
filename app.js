// script.js
let balance = 500;
const maxFunds = 500;
const stocks = [
  { name: "Stock A", price: 100 },
  { name: "Stock B", price: 150 },
  { name: "Stock C", price: 75 },
  { name: "Stock D", price: 200 },
  { name: "Stock E", price: 50 },
  { name: "Stock F", price: 120 },
];
let investments = {};

const balanceEl = document.getElementById('balance');
const stockListEl = document.getElementById('stocks');
const stockDetailsEl = document.getElementById('stock-details');

// Display available stocks
stocks.forEach((stock, index) => {
  const li = document.createElement('li');
  li.textContent = `${stock.name} - $${stock.price}`;
  li.onclick = () => showStockInfo(index);
  stockListEl.appendChild(li);
});

// Update the balance display
function updateBalance() {
  balanceEl.textContent = `Balance: $${balance}`;
}

// Show details about a stock when clicked
function showStockInfo(index) {
  const stock = stocks[index];
  stockDetailsEl.textContent = `${stock.name}: $${stock.price}. ${
    investments[stock.name] ? "You own shares." : "Click to buy."
  }`;
}

// Function to simulate stock price changes every minute
setInterval(() => {
  stocks.forEach(stock => {
    stock.price += (Math.random() - 0.5) * 5; // Simulate price change
  });
  renderStocks();
}, 60000);

// Render stocks with updated prices
function renderStocks() {
  stockListEl.innerHTML = '';
  stocks.forEach((stock, index) => {
    const li = document.createElement('li');
    li.textContent = `${stock.name} - $${stock.price.toFixed(2)}`;
    li.onclick = () => showStockInfo(index);
    stockListEl.appendChild(li);
  });
}

// Function to add money if balance is low
function addFunds(amount) {
  if (balance + amount <= maxFunds) {
    balance += amount;
    updateBalance();
  } else {
    alert(`Maximum balance of $${maxFunds} reached.`);
  }
}

// Function to give feedback on investment choices
function investmentFeedback(stock) {
  if (stock.price < 100) {
    return "Good choice! This stock is relatively low priced.";
  } else if (stock.price > 150) {
    return "Risky choice! This stock is expensive and might drop in value.";
  } else {
    return "Balanced choice. This stock has moderate value.";
  }
}

// Chart setup to display investment distribution
const ctx = document.getElementById('investmentChart').getContext('2d');
const investmentChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: stocks.map(stock => stock.name),
    datasets: [{
      label: 'Investment Distribution',
      data: stocks.map(stock => investments[stock.name] || 0),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
    }]
  },
  options: {
    responsive: true,
  }
});

// Update chart based on current investments
function updateChart() {
  investmentChart.data.datasets[0].data = stocks.map(stock => investments[stock.name] || 0);
  investmentChart.update();
}
