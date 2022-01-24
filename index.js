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
    .then(stockObj => renderStockViewer(stockObj));
}

function renderAllStocks(stockArray) { //take entire database array 
  stockArray.forEach(renderStockViewer); //each one is rendered into an object
}

function deleteHandler(e) {
  fetch(baseUrl + `/${e.target.parentElement.id}`, { method: "DELETE" }) //take in id of object
    .then(() => {
      let stockElement = document.getElementById(`${e.target.parentElement.id}`) //assign variable to container id
      stockElement.remove();
    });
}

function currentAlertIf(stockObj) {
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
  
function addInfoToBigImage(stockObj) {
  const stockDetailsImage = document.querySelector('#detail-image');
  const ticker = document.querySelector(".ticker-symbol");
  const currentPrice = document.querySelector(".current-price");
  const alertPrice = document.querySelector(".alert-price");
  const statusPhrase = document.querySelector("#buy-status-phrase");

  ticker.innerText = stockObj.ticker;
  currentPrice.innerText = stockObj.currentPrice; 
  stockDetailsImage.src = stockObj.image; 
  stockDetailsImage.alt = stockObj.companyName;
  alertPrice.innerText = stockObj.alertPrice;
  statusPhrase.innerText = currentAlertIf(stockObj)
}

function renderStockViewer(stockObj) { //take in object, render gallery of images
  const stockTilesDiv = document.querySelector("#stock-tiles"); //the div of tiles
  const tileLogoContainer = document.createElement('container'); //each tile; contains logo and remove btn
  tileLogoContainer.id = stockObj.id;
  const stockImg = document.createElement('img');
  const deleteBtn = document.createElement('button');

  //render gallery
  stockImg.src = stockObj.image; 
  tileLogoContainer.append(stockImg) 
  stockTilesDiv.append(tileLogoContainer) 
  
  
  //gallery tile click event
  stockImg.addEventListener('click', () => addInfoToBigImage(stockObj))

  //render delete button
  deleteBtn.dataset.id = stockObj.id;
  deleteBtn.innerText = 'Remove';
  deleteBtn.className = 'remove-btn';
  deleteBtn.style.cssText = 'display:flex;margin-left:33%';
  tileLogoContainer.append(deleteBtn)

  //addEventListener Handler //delete button click event
  deleteBtn.addEventListener('click', (e) => deleteHandler(e))
}


const createBtn = document.getElementById("form-div")

// addEventListener Handler//form submit
createBtn.addEventListener('submit', (e) => newStockHandler(e))

function newStockHandler (e) {
  e.preventDefault(); 
  formNewStockObject()
}

function formNewStockObject () {
let newStockObj = {}
  newStockObj.companyName = document.querySelector("#new-company-name").value
  newStockObj.ticker = document.querySelector("#new-ticker").value
  newStockObj.image = document.querySelector("#new-image").value
  newStockObj.currentPrice = document.querySelector("#new-current-price").value
  newStockObj.alertPrice = document.querySelector("#new-alert-price").value

  postNewStock(newStockObj)  
  createBtn.reset()
}

  
getStockObjs() 