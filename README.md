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
