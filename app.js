// Initial portfolio balance
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

// Example stocks with price history
const stocks = {
  "TechCorp": { price: 50, owned: 0, description: "Leading tech company", history: [50] },
  "HealthInc": { price: 30, owned: 0, description: "Healthcare services", history: [30] },
  "FinanceCo": { price: 20, owned: 0, description: "Financial services firm", history: [20] },
  "EnergyPlus": { price: 40, owned: 0, description: "Renewable energy provider", history: [40] },
  "GreenGrow": { price: 25, owned: 0, description: "Sustainable agriculture", history: [25] },
  "AutoDrive": { price: 35, owned: 0, description: "Automated vehicle producer", history: [35] }
};

// Function to open the stock modal
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

// Function to close the modal
function closeModal() {
  modal.style.display = "none";
}

// Update the stock list dynamically
function updateDisplay() {
  document.getElementById('balance').textContent = balance.toFixed(2);
  const stockList = document.getElementById('stock-list');
  const stockSelect = document.getElementById('stock-select');
  
  stockList.innerHTML = '';
  stockSelect.innerHTML = '';
  
  for (const stock in stocks) {
    const { price, owned, description } = stocks[stock];
    
    const li = document.createElement('li');
    li.textContent = `${stock}: $${price.toFixed(2)} (Owned: ${owned})`;
    li.onclick = () => openModal(stock);
    stockList.appendChild(li);
    
    const option = document.createElement('option');
    option.value = stock;
    option.textContent = stock;
    stockSelect.appendChild(option);
  }
}

updateDisplay(); // Call this on page load
