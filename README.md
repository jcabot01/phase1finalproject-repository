# Phase 1 Project:  Stock Watchlist

## Introduction

A thrifty investor always wants to buy stocks "on a discount"; meaning the stock price is well off of its recent high price.  After the investor does some homework using technical analysis and valuation models, they come up with a discount price they want to purchase the stock.  That's where this web-app comes in handy!

Using the form at the bottom of the page, enter the required info; company name, stock ticker, logo URL, current price, and desired buy price.  Upon "submit", this data is sent to a server and stored.  The logo is placed in a gallery of other logos at the top of the page.  Click on one of the logos and your stock's information will be displayed. If the current price is less than the alert price, you will receive a status alert that "Now is the time to buy".  If not, the status will say "Sit tight, no need to buy anything yet".  If you accumulate too many stocks, you can remove them at any time.

## Demo

![YAP](https://i.imgur.com/xZOJbyl.gif)

## Setup

* Open your terminal

* Run `git clone` and `git@github.com:jcabot01/phase1finalproject-repository.git`

* Run `cd` `phase1finalproject` to get into the correct folder.

* Run `explorer.exe index.html` This should load the web-app.

* Run `json-server --watch db.json` to get server running.

Now the web-app is free to use.  It currently has some default stocks in there that you can play with and you can add your own as well.  If you want to remove a stock, click 'remove' and it is gone forever.  Don't forget to click a logo to have your infomation displayed in the center-large tile.

## Code Highlights

This project features alot of orchestrations between JavaScript, HTML, CSS, and JSON.  Throughout the project you will see various inner activity between the interface and the supporting JSON server.  This activity is achieved using fetches to the server using GET, POST, and DELETE methods. One interesting bit of code found in the JavaScript file contains an "if" statement where the output message is dependent upon the comparison of the "current price" and the "alert price"; both of which have to be pulled from db.json file.  If the "current price" is greater than the "alert price", the investor doesn't need to invest because the price is too high.  Likewise, if the "current price" is less than the "alert price", then it would be a good time to buy because the stock is on a discount.

```javascript
function currentAlertIf(){
            let current = stockObj.currentPrice; //create "current" variable, assign it to json-object "current price"
            let alert = stockObj.alertPrice;  //do the same for "alert"
            let result;

            if (current > alert) {  
                result = "No need to buy yet, be patient.";
              } else {
                result = "Time to buy! Alert price was hit."
              }
              return result;
          }
          priceAlert.innerText = currentAlertIf()  //priceAlert is the alert box on the webpage containing BUY Status & BUY Price.  InnerText of that <div> to the function above.
  })
}
```

## Further Development

I think some ways to improve this app would be to add a PATCH method to it, allowing the user to update the current price.  This would help the user to keep track of their alert price and they would only have to modify the current price with each use.  Also, I think having the tiles display a colored border in reference to their "buy status" would be helpful.  If the stock is at a discount, the border would alert the user.  The user could click on the stock right away from the gallery of tiles at the top and not have to bother with the other stocks.


Jon Cabot

Flatiron School
 
Software Engineering Flex Student

