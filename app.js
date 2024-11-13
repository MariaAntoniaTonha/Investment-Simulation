let balance = 1000;
const feedbackElement = document.getElementById('feedback');
const stockInfoElement = document.getElementById('stock-info');
const stockChartElement = document.getElementById('stockChart').getContext('2d');
const modal = document.getElementById('stockModal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalPrice = document.getElementById('modal-price');
const modalOwned = document.getElementById('modal-owned');
const modalChartElement = document.getElementById('modalChart').getContext('2d');

const stocks = {
  "TechCorp": { price: 50, owned: 0, description: "Leading tech company", history: [50] },
  "HealthInc": { price: 30, owned: 0, description: "Healthcare services", history: [30] },
  "FinanceCo": { price: 20, owned: 0, description: "Financial services firm", history: [20] },
  "EnergyPlus": { price: 40, owned: 0, description: "Renewable energy provider", history: [40] },
  "GreenGrow": { price: 25, owned: 0, description: "Sustainable agriculture", history: [25] },
  "AutoDrive": { price: 35, owned: 0, description: "Automated vehicle producer", history: [35] }
};

// Primary chart for portfolio
let stockChart = new Chart(stockChartElement, { /* ... same chart setup ... */ });

// Modal chart for detailed stock view
let modalChart = new Chart(modalChartElement, {
  type: 'line',
  data: { labels: [0], datasets: [{ label: 'Stock Price', data: [], borderColor: 'rgba(54, 162, 235, 1)', fill: false }] },
  options: { responsive: true, scales: { x: { title: { text: 'Transactions' } }, y: { title: { text: 'Price ($)' } } } }
});

function openModal(stock) {
  const selectedStock = stocks[stock];
  modalTitle.textContent = stock;
  modalDescription.textContent = selectedStock.description;
  modalPrice.textContent = selectedStock.price.toFixed(2);
  modalOwned.textContent = selectedStock.owned;

  // Update modal chart data with stock price history
  modalChart.data.labels = Array.from({ length: selectedStock.history.length }, (_, i) => i);
  modalChart.data.datasets[0].data = selectedStock.history;
  modalChart.update();

  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

// Event listener to close modal when clicking outside of it
window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
}

function updateDisplay() {
  document.getElementById('balance').textContent = balance.toFixed(2);
  stockList.innerHTML = '';
  stockSelect.innerHTML = '';

  for (const stock in stocks) {
    const { price, owned, description } = stocks[stock];
    
    const li = document.createElement('li');
    li.textContent = `${stock}: $${price.toFixed(2)} (Owned: ${owned})`;
    li.onclick = () => openModal(stock); // Add click event to open modal
    stockList.appendChild(li);
    
    const option = document.createElement('option');
    option.value = stock;
    option.textContent = stock;
    stockSelect.appendChild(option);
  }
}

// Buy, sell, feedback functions (as previously set up)

// Initial display
updateDisplay();
