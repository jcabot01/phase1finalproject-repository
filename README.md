# Phase 1 Project:  Stock Watchlist

## Introduction

A thrifty investor always wants to buy stocks "on a discount"; meaning the stock price is well off of its recent high price.  After the investor does some homework using technical analysis and valuation models, they come up with a discount price they want to purchase the stock.  That's where this web-app comes in handy!

Using the form at the bottom of the page, enter the required info; company name, stock ticker, logo URL, current price, and desired buy price.  Upon "submit", this data is sent to a server and stored.  The logo is placed in a gallery of other logos at the top of the page.  Click on one of the logos and your stock's information will be displayed. If the current price is less than the alert price, you will receive a status alert that "Now is the time to buy".  If not, the status will say "Sit tight, no need to buy anything yet".  If you accumulate too many stocks, you can remove them at any time.

## Demo

![Imgur](https://imgur.com/5IqxBKM)


## Setup

* Open your terminal

* Run `git clone` and `git@github.com:jcabot01/phase1finalproject-repository.git`

* Run `cd` `phase1finalproject` to get into the correct folder.

* Run `explorer.exe index.html`. This should load the web-app.

* Run `json-server --watch db.json` to get server running.

Now the web-app is free to use.  It currently has some default stocks in there that you can play with and you can add your own as well.  If you want to remove a stock, click 'remove' and it is gone forever.  Don't forget to click a logo to have your infomation displayed in the center-large tile.


Jon Cabot
Flatiron School
 
Software Engineering Flex Student

