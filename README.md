#Wealthpal Currency exchange

This is single-page application, which can help you with rating of currency.
You can get rating of currencies as at, or you can calculate sum in other currencies (was implemented algorithm which compare your currency with EUR). 

##Getting Started
- You can use [click](https://github.com/Natanagar/Weathpal.git "git clone") in you terminal, after that
- change your directory 
*cd [wealthpal](https://github.com/Natanagar/Weathpal.git "path of the drectory")*

- next step will be:
*yarn install* (or *npm install* )

- when dependencies will be installed, write command line yarn start (or npm run)
and you'll see project in *http://localhost:3000* (you can choose another port if your port 300 is busy)

after you can choose currency from two inputs and choose of the sum (currency was confirmed after click of list, the same option work with amount (only list with option from autocomplete you can use) ) 
After reload page you data will be saved in local-storage and actual data you can see in the page.

##Dependencies:
React, Redux-thunk, Axios, Date-fns, Downshift, Match-sorter, Redux-persist,

##API
free endpoints: 
- http://data.fixer.io/api/
- https://api.exchangeratesapi.io/

##Contribution
Test task



    