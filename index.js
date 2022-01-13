
const baseUrl = "http://localhost:3000/stocks";

//define variables
const stockDetails = document.getElementById('stock-details')

//fetches
//GET
const getStockObjs = () => {    //fetch stock data using GET request
  fetch(baseUrl) //server request
  .then(res => res.json()) //promise
  .then(renderAllStocks) //send all retrieved data to a render helper function
}

//POST
//send input data here via callback
const postNewStock = newStockObj => { //POST new Buy Price from input form
  const config = {    //new stock items are submitted via input form then posted to server via POST request
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      body: JSON.stringify(newStockObj) //new Buy Price input data is to be stringified
  }
  fetch(baseUrl, config) //perform a fetch request then post new object
  .then(res => res.json()) //promise
  .then(renderStockViewer) //output is sent to helper function that renders stock objects onto the page.
}


//Rendering
const renderAllStocks = stockArr => { //after GET request, we have an array of stock objects.  We need to do a forEach to render each object onto page
  stockArr.forEach(renderStockViewer) //take every object in stockArr, and for each one, we will render them in the stocks rendering
}

const renderStockViewer = stockObj => { //take in each stockObj, and let's assign all of the HTML parts to db.json parts and get them communicating
  //example // "id": 2,
          //   "companyName": "Microsoft",
          //   "ticker": "MSFT",
          //   "image": "./assets/stocks/msft.jpg",
          //   "currentPrice": "$343.23",
          //   "alertPrice": "$310.00"

  //create containers for images
  const imgContainer = document.createElement('container')
  const img = document.createElement('img') //create an HTML img tag to display each item's picture
  img.src = stockObj.image //connect HTML element with db.json data

  //create a delete button incase we change our minds about watching certain stocks
  const deleteBtn = document.createElement('button') //create HTML element and define as an a variable in this scope
      deleteBtn.dataset.id = stockObj.id //assign the HTML delete button to the stock Object id
      deleteBtn.innerText = 'Remove'
      deleteBtn.className = 'remove-btn'
      deleteBtn.style.cssText = 'display:flex;margin-left:33%'   

  imgContainer.append(img, deleteBtn) //append img and delete btn to imgContainer

//define destination container for pictures
  const stockTiles = document.querySelector("#stock-tiles") //assign variable to stock-tiles div so we can have a gallery of all stock items.
  stockTiles.append(imgContainer)   //append all stock images to stockTiles <div>

  deleteBtn.addEventListener('click', (e) => { //pass in click event...
      const id = e.target.dataset.id
      // console.log(id)
      fetch(baseUrl + `/${id}`, {method: "DELETE"})
      .then(res => res.json())
      .then(console.log) //log deletion; we don't need the info to go anywhere

      window.location.reload();
  })

  //event listeners
  img.addEventListener('click', () => { //pass in click event...    
      const stockDetailsImage = document.querySelector('#detail-image')
          stockDetailsImage.src = stockObj.image
          stockDetailsImage.alt = stockObj.companyName

          // const companyName = document.querySelector(".companyName")
          // companyName.innerText = stockObj.companyName //assign HTML h2 to db.json companyName

          const ticker = document.querySelector(".ticker-symbol")
          ticker.innerText = stockObj.ticker //assign HTML h3 class '.ticker' to db.json restaurant

          const currentPrice = document.querySelector(".current-price")
          currentPrice.innerText = stockObj.currentPrice //assign HTML span id '#current-price' to db.json rating

          
          const alertPrice = document.querySelector(".alert-price")
          alertPrice.innerText = stockObj.alertPrice //assign HTML <p> tag id '#alert-price' to db.json comment
          

          const priceAlert = document.querySelector("#buy-status-phrase")
      

          function currentAlertIf(){
            let current = stockObj.currentPrice;
            let alert = stockObj.alertPrice;
            let result;

            if (current > alert) {  
                result = "No need to buy yet, be patient.";
              } else {
                result = "Time to buy! Alert price was hit."
              }
              return result;
          }
          priceAlert.innerText = currentAlertIf()


  })
}

//PATCH
//update an existing object
const patchStock = (currentPrice, alertPrice) => { //use companyName and ticker to call up the stock object needing an update
  const updateBody = {
      "op": "replace", "path": "currentPrice", "value": "currentPrice",
      "op": "replace", "path": "alertPrice", "value": "alertPrice",
  }
  const config = {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
      },
      body: JSON.stringify(updateBody)
  }
  fetch(baseUrl + `/${newStockObj.id}`, config)
  .then(res => res.json())
  .then(renderStockViewer)
////probably need to run a GET after
}
const createBtn = document.getElementById("new-stock")  //assign a new variable to HTML new-stock input form
createBtn.addEventListener('submit', (e) => {   //assign eventListener on new-stock submit button
  e.preventDefault() //prevent page reload on submission

  //create new stock object
  const newStockObj = {}
  newStockObj.companyName = document.querySelector("#new-company-name").value
  newStockObj.ticker = document.querySelector("#new-ticker").value
  newStockObj.image = document.querySelector("#new-image").value
  newStockObj.currentPrice = document.querySelector("#new-current-price").value
  newStockObj.alertPrice = document.querySelector("#new-alert-price").value

  postNewStock(newStockObj)   //send new stock object to POST request
  createBtn.reset() //reset the form to blank after submission

  patchStock(newStockObj)
})
  
getStockObjs() //on page load run GET fetch to server