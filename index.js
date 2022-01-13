//Global variables
const baseUrl = "http://localhost:3000/stocks";
let stockArray = [];


//fetches
//GET
function getStockObjs() {
  fetch(baseUrl)
    .then(res => res.json())
    .then(allStocks => {
      stockArray = allStocks; //assign allStocks json data to an empty array stockArray
      renderAllStocks(stockArray);
    });
}

//POST
function postNewStock(newStockObj) {
  const config = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(newStockObj)
  };
  fetch(baseUrl, config) 
    .then(res => res.json())
    .then(renderStockViewer);
}


//Renderers: we need individual tiles and big image viewer
//Render entire array of stocks into individual stock objects
function renderAllStocks(stockArray) {
  stockArray.forEach(renderStockViewer);
}

//Render gallery of tiles
function renderStockViewer(stockObj) {
  const tileLogoContainer = document.createElement('container');
  const img = document.createElement('img');
  img.src = stockObj.image;

  //create a delete button incase we change our minds about watching certain stocks
  const deleteBtn = document.createElement('button'); //create HTML element and define as an a variable in this scope
  deleteBtn.dataset.id = stockObj.id; //assign the HTML delete button to the stock Object id
  deleteBtn.innerText = 'Remove';
  deleteBtn.className = 'remove-btn';
  deleteBtn.style.cssText = 'display:flex;margin-left:33%';

  tileLogoContainer.append(img, deleteBtn); //append img and delete btn to imgContainer


  //define destination container for pictures
  const stockTiles = document.querySelector("#stock-tiles"); //assign variable to stock-tiles div so we can have a gallery of all stock items.
  stockTiles.append(tileLogoContainer); //append all stock images to stockTiles <div>





  deleteBtn.addEventListener('click', (e) => {
    const id = parseInt(e.target.dataset.id);
    // console.log(id)
    fetch(baseUrl + `/${id}`, { method: "DELETE" })
      // .then(res => res.json())
      .then(() => {
        stockArray = stockArray.filter((stock) => stock.id !== id);
        const stockTiles = document.querySelector("#stock-tiles");
        stockTiles.innerHTML = "";
        renderAllStocks(stockArray); //log deletion; we don't need the info to go anywhere
      });
  });

  //event listeners
  img.addEventListener('click', () => {
    const stockDetailsImage = document.querySelector('#detail-image');
    stockDetailsImage.src = stockObj.image;
    stockDetailsImage.alt = stockObj.companyName;

    // const companyName = document.querySelector(".companyName")
    // companyName.innerText = stockObj.companyName //assign HTML h2 to db.json companyName
    const ticker = document.querySelector(".ticker-symbol");
    ticker.innerText = stockObj.ticker; //assign HTML h3 class '.ticker' to db.json restaurant

    const currentPrice = document.querySelector(".current-price");
    currentPrice.innerText = stockObj.currentPrice; //assign HTML span id '#current-price' to db.json rating


    const alertPrice = document.querySelector(".alert-price");
    alertPrice.innerText = stockObj.alertPrice; //assign HTML <p> tag id '#alert-price' to db.json comment


    const priceAlert = document.querySelector("#buy-status-phrase");


    function currentAlertIf() {
      let current = stockObj.currentPrice;
      let alert = stockObj.alertPrice;
      let result;

      if (current > alert) {
        result = "No need to buy yet, be patient.";
      } else {
        result = "Time to buy! Alert price was hit.";
      }
      return result;
    }
    priceAlert.innerText = currentAlertIf();
  });

}


const createBtn = document.getElementById("form-div")  //assign a new variable to HTML new-stock input form


createBtn.addEventListener('submit', (e) => {   //assign eventListener on new-stock submit button
  e.preventDefault() //prevent page reload on submission

const newStockObj = {}
  newStockObj.companyName = document.querySelector("#new-company-name").value
  newStockObj.ticker = document.querySelector("#new-ticker").value
  newStockObj.image = document.querySelector("#new-image").value
  newStockObj.currentPrice = document.querySelector("#new-current-price").value
  newStockObj.alertPrice = document.querySelector("#new-alert-price").value

  postNewStock(newStockObj)   //send new stock object to POST request
  createBtn.reset() //reset the form to blank after submission
})
  
getStockObjs() //on page load run GET fetch to server